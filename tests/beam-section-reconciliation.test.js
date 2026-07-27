"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const reconciliation = require("../beam-section-reconciliation.js");
const hollowRows = require("../beam-section-data.js");
const hotRolled = require("../beam-hot-rolled-data.js");

function hollowChecks() {
  const checks = [];
  hollowRows.forEach(row => {
    let axes;
    let directions;
    if (row.family === "chs") {
      axes = { axis: { Z: row.Z, S: row.S } };
      directions = { axis: { Ze: row.Ze, compactness: row.compactness } };
    } else if (row.family === "shs") {
      axes = { xy: { Z: row.Z, S: row.S } };
      directions = { xy: { Ze: row.Ze, compactness: row.compactness } };
    } else {
      axes = { x: { Z: row.Zx, S: row.Sx }, y: { Z: row.Zy, S: row.Sy } };
      directions = {
        x: { Ze: row.Zex, compactness: row.compactnessX },
        y: { Ze: row.Zey, compactness: row.compactnessY }
      };
    }
    const section = {
      family: row.family,
      D: row.D,
      d: row.d,
      b: row.b,
      t: row.t,
      area: row.area,
      axes
    };
    const grade = { fy: row.fy, kf: row.kf, directions };
    Object.keys(directions).forEach(direction => {
      checks.push({
        key: `${row.family}|${row.designation}|${row.grade}|${direction}`,
        result: reconciliation.reconcile(section, grade, direction)
      });
    });
  });
  return checks;
}

function pfcAndAngleChecks() {
  const checks = [];
  hotRolled.pfc.forEach(section => {
    Object.entries(section.grades).forEach(([gradeName, grade]) => {
      Object.keys(grade.directions).forEach(direction => {
        checks.push({
          key: `pfc|${section.designation}|${gradeName}|${direction}`,
          result: reconciliation.reconcile({ ...section, family: "pfc" }, grade, direction)
        });
      });
    });
  });
  Object.entries(hotRolled.equalAngle).forEach(([designation, grades]) => {
    const properties = hotRolled.equalAngleProperties[designation];
    const section = {
      family: "ea",
      b: properties.b,
      t: properties.t,
      area: properties.area,
      axes: properties.axes
    };
    Object.entries(grades).forEach(([gradeName, grade]) => {
      Object.keys(grade.directions).forEach(direction => {
        checks.push({
          key: `ea|${designation}|${gradeName}|${direction}`,
          result: reconciliation.reconcile(section, grade, direction)
        });
      });
    });
  });
  return checks;
}

function universalChecks() {
  const appPath = path.join(__dirname, "..", "app.js");
  const source = fs.readFileSync(appPath, "utf8");
  const start = source.indexOf("const beamShearDimensions =");
  const end = source.indexOf("const chsSections =");
  assert.ok(start >= 0 && end > start, "Beam universal catalogue block must remain discoverable.");
  const context = {};
  vm.runInNewContext(`${source.slice(start, end)}\nthis.sections = { ubSections, ucSections };`, context);

  const checks = [];
  Object.entries({ ub: context.sections.ubSections, uc: context.sections.ucSections }).forEach(([family, sections]) => {
    sections.forEach(base => {
      const supplementary = hotRolled.universal[base.designation];
      const section = {
        ...base,
        family,
        axes: {
          x: { Z: base.Zx, S: base.Sx },
          y: supplementary.y
        }
      };
      Object.entries(base.grades).forEach(([gradeName, baseGrade]) => {
        const grade = {
          ...baseGrade,
          directions: {
            x: { Ze: baseGrade.Ze, compactness: baseGrade.compactness },
            y: supplementary.grades[gradeName]
          }
        };
        ["x", "y"].forEach(direction => {
          checks.push({
            key: `${family}|${base.designation}|${gradeName}|${direction}`,
            result: reconciliation.reconcile(section, grade, direction)
          });
        });
      });
    });
  });
  return checks;
}

const checks = [...universalChecks(), ...pfcAndAngleChecks(), ...hollowChecks()];
assert.equal(checks.length, 717);
assert.deepEqual(
  checks.filter(check => check.result.status !== "reconciled").map(check => check.key),
  []
);

const independentUb = checks.find(check => check.key === "ub|310UB40.4|300PLUS|x").result;
assert.equal(independentUb.classMethod, "independent-geometry");
assert.equal(independentUb.expectedClass, "C");
assert.equal(independentUb.kfMethod, "published-effective-area");

const slenderRhs = checks.find(check => check.key === "rhs|400 x 300 x 8 RHS|C450L0|y").result;
assert.equal(slenderRhs.expectedClass, "S");
assert.equal(slenderRhs.zeMethod, "published-effective-section");

const asymmetricPfc = checks.find(check => check.key === "pfc|380PFC|300PLUS|y-a").result;
assert.equal(asymmetricPfc.classMethod, "published-ze-interval");

const angleLoadCase = checks.find(check => check.key === "ea|100 x 100 x 6 EA|300PLUS|b").result;
assert.equal(angleLoadCase.classMethod, "published-ze-interval");
assert.ok(Math.abs(angleLoadCase.expectedKf - 0.906) < 0.004);

assert.equal(reconciliation.compactZe(569, 633), 633);
assert.equal(reconciliation.sectionClass(9, reconciliation.LIMITS.outstandUniformHR), "C");
assert.equal(reconciliation.sectionClass(9.01, reconciliation.LIMITS.outstandUniformHR), "N");

const projectUb = reconciliation.deriveProject({
  family: "ub",
  bf: 165,
  tw: 6.1,
  tf: 10.2,
  d1: 283.6,
  area: 5210,
  axes: { x: { Z: 569, S: 633 } }
}, { fy: 360 }, "x");
assert.equal(projectUb.status, "derived");
assert.equal(projectUb.expectedClass, "N");
assert.ok(Math.abs(projectUb.expectedZe - 629.83) < 0.02);

const pfc380 = { ...hotRolled.pfc.find(section => section.designation === "380PFC"), family: "pfc" };
const projectPfcMajor = reconciliation.deriveProject(pfc380, { ...pfc380.grades["300PLUS"], fy: 300 }, "x");
assert.equal(projectPfcMajor.status, "derived");
assert.equal(projectPfcMajor.expectedClass, "C");
assert.equal(projectPfcMajor.expectedZe, 946);
assert.equal(
  reconciliation.deriveProject(pfc380, { ...pfc380.grades["300PLUS"], fy: 300 }, "y-a").status,
  "unresolved"
);

const rhsRow = hollowRows.find(row => row.designation === "400 x 300 x 8 RHS" && row.grade === "C450L0");
const projectRhs = reconciliation.deriveProject({
  family: "rhs",
  d: rhsRow.d,
  b: rhsRow.b,
  t: rhsRow.t,
  area: rhsRow.area,
  axes: { x: { Z: rhsRow.Zx, S: rhsRow.Sx }, y: { Z: rhsRow.Zy, S: rhsRow.Sy } }
}, { fy: 450 }, "y");
assert.equal(projectRhs.status, "derived");
assert.equal(projectRhs.expectedClass, "S");
assert.equal(projectRhs.zeMethod, "independent-simplified-slender");
assert.ok(projectRhs.expectedZe > 0 && projectRhs.expectedZe < rhsRow.Zy);

const projectRod = reconciliation.deriveProject({
  family: "rod",
  axes: { axis: { Z: 1357.17, S: 2304 } }
}, { fy: 250 }, "axis");
assert.equal(projectRod.status, "derived");
assert.equal(projectRod.expectedClass, "C");
assert.equal(projectRod.expectedZe, Math.min(2304, 1.5 * 1357.17));

assert.equal(
  reconciliation.deriveProject({ family: "ea" }, { fy: 300 }, "a").status,
  "unresolved"
);

console.log(`beam-section-reconciliation tests passed (${checks.length} catalogue direction rows)`);
