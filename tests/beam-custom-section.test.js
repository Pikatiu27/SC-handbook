"use strict";

const assert = require("node:assert/strict");
const custom = require("../beam-custom-section.js");
const reconciliation = require("../beam-section-reconciliation.js");
const capacity = require("../beam-section-capacity.js");

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};

const compactZe = (Z, S) => Math.min(S, 1.5 * Z);
const designMoment = (fy, Ze) => 0.9 * fy * Ze / 1e6;

function independentISection({ d, bf, tw, tf }) {
  const clear = d - 2 * tf;
  const area = 2 * bf * tf + tw * clear;
  const ix = 2 * (bf * tf ** 3 / 12 + bf * tf * (d / 2 - tf / 2) ** 2) + tw * clear ** 3 / 12;
  const iy = 2 * tf * bf ** 3 / 12 + clear * tw ** 3 / 12;
  const sx = bf * tf * (d - tf) + tw * clear ** 2 / 4;
  const sy = tf * bf ** 2 / 2 + clear * tw ** 2 / 4;
  return { area, ix, iy, zx: ix / (d / 2), zy: iy / (bf / 2), sx, sy, clear };
}

function independentHollow({ d, b, t }) {
  const di = d - 2 * t;
  const bi = b - 2 * t;
  const area = b * d - bi * di;
  const ix = (b * d ** 3 - bi * di ** 3) / 12;
  const iy = (d * b ** 3 - di * bi ** 3) / 12;
  const sx = (b * d ** 2 - bi * di ** 2) / 4;
  const sy = (d * b ** 2 - di * bi ** 2) / 4;
  return { area, ix, iy, zx: ix / (d / 2), zy: iy / (b / 2), sx, sy };
}

function independentRhsShear(fy, d, b, t, direction) {
  const xDirection = direction !== "y";
  const clear = (xDirection ? d : b) - 2 * t;
  const orthogonal = xDirection ? b : d;
  const area = 2 * t * clear;
  const slenderness = clear / t * Math.sqrt(fy / 250);
  const alphaV = Math.min(1, (82 / slenderness) ** 2);
  const uniform = alphaV * 0.6 * fy * area / 1000;
  const rho = 3 * (2 * orthogonal + (xDirection ? d : b)) / (2 * (3 * orthogonal + (xDirection ? d : b)));
  const nonUniform = 2 * uniform / (0.9 + rho);
  return 0.9 * Math.min(uniform, nonUniform);
}

const ubDims = { d: 300, bf: 150, tw: 10, tf: 15 };
const ub = custom.build("ub", ubDims);
const ubIndependent = independentISection(ubDims);
close(ub.area, ubIndependent.area);
close(ub.axes.x.I, ubIndependent.ix);
close(ub.axes.y.I, ubIndependent.iy);
close(ub.axes.x.Z * 1000, ubIndependent.zx);
close(ub.axes.y.S * 1000, ubIndependent.sy);
const ubMaterial = custom.resolveMaterial({ family: "ub", productForm: "hot-rolled-section", grade: "300PLUS", dimensions: ubDims });
assert.deepEqual({ fy: ubMaterial.fy, fyw: ubMaterial.fyw, fu: ubMaterial.fu }, { fy: 300, fyw: 320, fu: 440 });
const ubX = reconciliation.deriveProject(ub, ubMaterial, "x");
assert.equal(ubX.expectedClass, "C");
close(ubX.expectedZe * 1000, compactZe(ubIndependent.zx, ubIndependent.sx));
close(capacity.sectionMoment(ubMaterial.fy, ubX.expectedZe * 1000), designMoment(ubMaterial.fy, compactZe(ubIndependent.zx, ubIndependent.sx)));
close(capacity.rolledWebShear(ubMaterial.fyw, ub.Aw), 0.9 * 0.6 * ubMaterial.fyw * ubIndependent.clear * ubDims.tw / 1000);

const ucDims = { d: 250, bf: 250, tw: 12, tf: 18 };
const uc = custom.build("uc", ucDims);
const ucIndependent = independentISection(ucDims);
const ucMaterial = custom.resolveMaterial({ family: "uc", productForm: "hot-rolled-section", grade: "Grade 350", dimensions: ucDims });
const ucY = reconciliation.deriveProject(uc, ucMaterial, "y");
assert.equal(ucY.expectedClass, "C");
close(ucY.expectedZe * 1000, compactZe(ucIndependent.zy, ucIndependent.sy));
close(capacity.sectionMoment(ucMaterial.fy, ucY.expectedZe * 1000), designMoment(ucMaterial.fy, compactZe(ucIndependent.zy, ucIndependent.sy)));

const pfcDims = { d: 200, bf: 75, tw: 8, tf: 12 };
const pfc = custom.build("pfc", pfcDims);
const pfcIndependent = independentISection(pfcDims);
const pfcMaterial = custom.resolveMaterial({ family: "pfc", productForm: "hot-rolled-section", grade: "300PLUS", dimensions: pfcDims });
assert.deepEqual({ fy: pfcMaterial.fy, fyw: pfcMaterial.fyw }, { fy: 300, fyw: 320 });
close(pfc.area, pfcIndependent.area);
close(pfc.axes.x.I, pfcIndependent.ix);
close(pfc.axes.x.Z * 1000, pfcIndependent.zx);
assert.deepEqual(custom.directions("pfc"), ["x"]);
const pfcX = reconciliation.deriveProject(pfc, pfcMaterial, "x");
assert.equal(pfcX.expectedClass, "C");
close(capacity.sectionMoment(pfcMaterial.fy, pfcX.expectedZe * 1000), designMoment(pfcMaterial.fy, compactZe(pfcIndependent.zx, pfcIndependent.sx)));

const chsDims = { D: 114.3, t: 6 };
const chs = custom.build("chs", chsDims);
const chsInner = chsDims.D - 2 * chsDims.t;
const chsArea = Math.PI * (chsDims.D ** 2 - chsInner ** 2) / 4;
const chsI = Math.PI * (chsDims.D ** 4 - chsInner ** 4) / 64;
const chsS = (chsDims.D ** 3 - chsInner ** 3) / 6;
close(chs.area, chsArea);
close(chs.axes.axis.I, chsI);
const chsMaterial = custom.resolveMaterial({ family: "chs", productForm: "hollow-section", grade: "C350L0", dimensions: chsDims });
const chsResult = reconciliation.deriveProject(chs, chsMaterial, "axis");
assert.equal(chsResult.expectedClass, "C");
close(chsResult.expectedZe * 1000, compactZe(chsI / (chsDims.D / 2), chsS));
close(capacity.circularHollowShear(chsMaterial.fy, chs.area), 0.9 * 0.36 * 350 * chsArea / 1000);

const rhsDims = { d: 150, b: 100, t: 8 };
const rhs = custom.build("rhs", rhsDims);
const rhsIndependent = independentHollow(rhsDims);
close(rhs.area, rhsIndependent.area);
close(rhs.axes.x.I, rhsIndependent.ix);
close(rhs.axes.y.Z * 1000, rhsIndependent.zy);
const rhsMaterial = custom.resolveMaterial({ family: "rhs", productForm: "hollow-section", grade: "C350L0", dimensions: rhsDims });
const rhsX = reconciliation.deriveProject(rhs, rhsMaterial, "x");
assert.equal(rhsX.expectedClass, "C");
close(rhsX.expectedZe * 1000, compactZe(rhsIndependent.zx, rhsIndependent.sx));
close(capacity.rectangularHollowShear(rhsMaterial.fy, rhsDims.d, rhsDims.b, rhsDims.t, "x").designCapacity, independentRhsShear(350, rhsDims.d, rhsDims.b, rhsDims.t, "x"));

const shsDims = { b: 100, t: 8 };
const shs = custom.build("shs", shsDims);
const shsIndependent = independentHollow({ d: shsDims.b, b: shsDims.b, t: shsDims.t });
const shsMaterial = custom.resolveMaterial({ family: "shs", productForm: "hollow-section", grade: "C450L0", dimensions: shsDims });
const shsResult = reconciliation.deriveProject(shs, shsMaterial, "xy");
assert.equal(shsResult.expectedClass, "C");
close(shsResult.expectedZe * 1000, compactZe(shsIndependent.zx, shsIndependent.sx));
close(capacity.rectangularHollowShear(shsMaterial.fy, shsDims.b, shsDims.b, shsDims.t, "x").designCapacity, independentRhsShear(450, shsDims.b, shsDims.b, shsDims.t, "x"));

const rodDims = { D: 24 };
const rod = custom.build("rod", rodDims);
const rodZ = Math.PI * rodDims.D ** 3 / 32;
const rodS = rodDims.D ** 3 / 6;
const rodMaterial = custom.resolveMaterial({ family: "rod", productForm: "round-bar", grade: "300PLUS", dimensions: rodDims });
const rodResult = reconciliation.deriveProject(rod, rodMaterial, "axis");
close(rodResult.expectedZe * 1000, compactZe(rodZ, rodS));
close(capacity.sectionMoment(rodMaterial.fy, rodResult.expectedZe * 1000), designMoment(rodMaterial.fy, compactZe(rodZ, rodS)));

assert.equal(custom.productForms("ea").length, 0);
assert.equal(custom.directions("ea").length, 0);
assert.equal(custom.build("ea", { b: 75, t: 6 }).capacityStatus, "unavailable");
assert.equal(custom.resolveMaterial({ family: "rhs", productForm: "hot-rolled-section", grade: "300PLUS", dimensions: rhsDims }).status, "not-verified");
assert.equal(custom.resolveMaterial({ family: "ub", productForm: "project", fy: 300, fyw: 0, fu: 440, dimensions: ubDims }).status, "not-verified");
assert.equal(custom.resolveMaterial({ family: "ub", productForm: "project", fy: 300, fyw: 320, fu: 300, dimensions: ubDims }).status, "not-verified");
assert.deepEqual(
  custom.resolveMaterial({ family: "ub", productForm: "project", fy: 300, fyw: 280, fu: 440, dimensions: ubDims }),
  { status: "resolved", grade: "User input", fy: 300, fyw: 280, fu: 440, source: "Project / legacy material values" }
);

console.log("beam custom-section independent tests passed (7 capacity families)");
