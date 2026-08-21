const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const MemberFormFactor = require(path.join(root, "member-form-factor.js"));
const BeamSectionData = require(path.join(root, "beam-section-data.js"));
const BeamHotRolledData = require(path.join(root, "beam-hot-rolled-data.js"));
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");

function literal(pattern, name) {
  const match = appSource.match(pattern);
  assert.ok(match, `${name} source literal was not found.`);
  return vm.runInNewContext(`(${match[1]})`);
}

const shearDimensions = literal(/const beamShearDimensions = (\{[\s\S]*?\n\});/, "beam shear dimensions");
const ubRows = literal(/const ubSections = (\[[\s\S]*?\n\])\.map\(beamSectionRecord\);/, "UB rows");
const ucRows = literal(/const ucSections = (\[[\s\S]*?\n\])\.map\(beamSectionRecord\);/, "UC rows");

function close(actual, expected, tolerance = 0.0011, label = "value") {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

function verifyUniversal(rows, family) {
  rows.forEach(([designation, , area, , , grades]) => {
    const dimensions = shearDimensions[designation];
    Object.entries(grades).forEach(([gradeName, grade]) => {
      const result = MemberFormFactor.calculate({
        family,
        section: { area, ...dimensions },
        yieldStress: grade.fy
      });
      close(result.formFactor, grade.kf, 0.0011, `${designation} ${gradeName} kf`);
    });
  });
}

verifyUniversal(ubRows, "ub");
verifyUniversal(ucRows, "uc");

BeamHotRolledData.pfc.forEach(section => {
  Object.entries(section.grades).forEach(([gradeName, grade]) => {
    const result = MemberFormFactor.calculate({ family: "pfc", section, yieldStress: grade.fy });
    close(result.formFactor, grade.kf, 0.0011, `${section.designation} ${gradeName} kf`);
  });
});

Object.entries(BeamHotRolledData.equalAngle).forEach(([designation, grades]) => {
  const section = BeamHotRolledData.equalAngleProperties[designation];
  Object.entries(grades).forEach(([gradeName, grade]) => {
    const result = MemberFormFactor.calculate({ family: "ea", section, yieldStress: grade.fy });
    close(result.formFactor, grade.kf, 0.0011, `${designation} ${gradeName} kf`);
  });
});

BeamSectionData.forEach(section => {
  const result = MemberFormFactor.calculate({
    family: section.family,
    section,
    yieldStress: section.fy
  });
  close(result.formFactor, section.kf, 0.0011, `${section.designation} ${section.grade} kf`);
});

const chsOverride = MemberFormFactor.calculate({
  family: "chs",
  section: { D: 508, t: 6.4, area: 10100 },
  yieldStress: 350
});
close(chsOverride.formFactor, 0.857, 0.001, "508 x 6.4 CHS C350L0 override");

const pfc = BeamHotRolledData.pfc.find(section => section.designation === "150PFC");
const lowerStrength = MemberFormFactor.calculate({ family: "pfc", section: pfc, yieldStress: 250 });
const higherStrength = MemberFormFactor.calculate({ family: "pfc", section: pfc, yieldStress: 450 });
assert.ok(higherStrength.formFactor <= lowerStrength.formFactor, "Increasing fy must not increase kf for fixed geometry.");

const solid = MemberFormFactor.calculate({ family: "rod", section: { area: 452.389 }, yieldStress: 350 });
assert.equal(solid.formFactor, 1);
assert.equal(solid.effectiveArea, solid.grossArea);

assert.throws(
  () => MemberFormFactor.calculate({ family: "rhs", section: { area: 1000, b: 100, d: 50, t: 0 }, yieldStress: 350 }),
  /Wall thickness must be greater than zero/
);
assert.throws(
  () => MemberFormFactor.calculate({ family: "custom", section: { area: 1000 }, yieldStress: 350 }),
  /supported catalogue member family/
);

console.log("Member form-factor reconciliation tests passed.");
