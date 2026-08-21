"use strict";

const assert = require("assert");
const ConcreteSectionCalculation = require("../concrete-section-calculation.js");

function close(actual, expected, tolerance = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
}

function independentOneWayShear(input) {
  const tensionLayers = input.layers.filter(layer =>
    layer.d >= input.depth / 2 && layer.strain < -0.00005 && layer.area > 0
  );
  const area = tensionLayers.reduce((sum, layer) => sum + layer.area, 0);
  const d = area > 0
    ? tensionLayers.reduce((sum, layer) => sum + layer.area * layer.d, 0) / area
    : input.d0;
  const dv = Math.max(0.72 * input.depth, 0.9 * d);
  const reo = input.shearReinforcement;
  const asv = reo.legs * reo.barArea;
  const hasReo = reo.mode === "vertical" && asv > 0 && reo.spacing > 0;
  const asvPerS = hasReo ? asv / reo.spacing : 0;
  const asvMinPerS = 0.08 * Math.sqrt(input.fc) * input.width / reo.yieldStress;
  const minimumProvided = hasReo && asvPerS >= asvMinPerS;
  const cotTheta = 1 / Math.tan(36 * Math.PI / 180);
  const kvNoMinimum = Math.min(0.15, 200 / (1000 + 1.3 * dv));
  const kv = minimumProvided ? 0.15 : kvNoMinimum;
  const vuc = kv * input.width * dv * Math.min(Math.sqrt(input.fc), 8) / 1000;
  const vus = hasReo ? asvPerS * reo.yieldStress * dv * cotTheta / 1000 : 0;
  const vuRaw = vuc + vus;
  const vuMax = 0.55 * 0.9 * input.fc * input.width * dv * (cotTheta / (1 + cotTheta ** 2)) / 1000;
  const crushing = vuRaw > vuMax;
  const phi = minimumProvided && !crushing ? 0.75 : 0.70;
  const withinScope = input.fc <= 65
    && (!hasReo || reo.yieldStress <= 500)
    && input.layers.every(layer => layer.fsy <= 500);
  return { d, dv, kv, vuc, vus, vuRaw, vuMax, vu: Math.min(vuRaw, vuMax), phi, withinScope };
}

function caseData(overrides = {}) {
  return {
    depth: 500,
    width: 1000,
    fc: 32,
    d0: 395,
    layers: [{ index: 1, d: 395, area: 1000, strain: -0.001, fsy: 500 }],
    shearReinforcement: {
      mode: "none",
      designation: "none",
      barArea: 0,
      legs: 0,
      spacing: 200,
      yieldStress: 500
    },
    ...overrides
  };
}

function verifyCase(input) {
  const expected = independentOneWayShear(input);
  const actual = ConcreteSectionCalculation.oneWayShear(input);
  ["d", "dv", "kv", "vuc", "vus", "vuRaw", "vuMax", "vu", "phi"].forEach(key => {
    close(actual[key], expected[key]);
  });
  assert.strictEqual(actual.withinSimplifiedScope, expected.withinScope);
  if (expected.withinScope) close(actual.phiVu, expected.phi * expected.vu);
  else assert.ok(Number.isNaN(actual.phiVu));
  return actual;
}

const shallow = verifyCase(caseData({
  depth: 300,
  d0: 250,
  layers: [{ index: 1, d: 250, area: 1000, strain: -0.001, fsy: 500 }]
}));
close(shallow.dv, 225);
close(shallow.kv, 0.15);
close(shallow.phi, 0.70);

const noReo = verifyCase(caseData());
close(noReo.dv, 360);
close(noReo.kv, 200 / 1468);
close(noReo.phiVu, 194.21352464197275, 1e-9);

const minimumReoInput = caseData({
  shearReinforcement: {
    mode: "vertical",
    designation: "N12",
    barArea: 113,
    legs: 2,
    spacing: 200,
    yieldStress: 500
  }
});
const minimumReo = verifyCase(minimumReoInput);
assert.strictEqual(minimumReo.minShearReoProvided, true);
close(minimumReo.kv, 0.15);
close(minimumReo.phi, 0.75);

const crushing = verifyCase(caseData({
  shearReinforcement: {
    mode: "vertical",
    designation: "heavy test cage",
    barArea: 500,
    legs: 10,
    spacing: 50,
    yieldStress: 500
  }
}));
assert.strictEqual(crushing.webCrushingLimited, true);
close(crushing.vu, crushing.vuMax);
close(crushing.phi, 0.70);

const fallback = verifyCase(caseData({
  d0: 380,
  layers: [{ index: 1, d: 100, area: 1000, strain: 0.001, fsy: 500 }]
}));
close(fallback.d, 380);

const outsideScope = verifyCase(caseData({
  fc: 66,
  layers: [{ index: 1, d: 395, area: 1000, strain: -0.001, fsy: 600 }],
  shearReinforcement: {
    mode: "vertical",
    designation: "scope test",
    barArea: 113,
    legs: 2,
    spacing: 200,
    yieldStress: 600
  }
}));
assert.strictEqual(outsideScope.withinSimplifiedScope, false);
assert.strictEqual(outsideScope.scopeFailures.length, 3);
assert.ok(Number.isNaN(outsideScope.phiVu));

assert.throws(() => ConcreteSectionCalculation.oneWayShear(caseData({ depth: 0 })), RangeError);
assert.throws(() => ConcreteSectionCalculation.oneWayShear(caseData({ layers: null })), TypeError);

const validVerticalReinforcement = minimumReoInput.shearReinforcement;
for (const spacing of [undefined, null, "", 0, -10, Number.NaN]) {
  assert.throws(() => ConcreteSectionCalculation.oneWayShear(caseData({
    shearReinforcement: { ...validVerticalReinforcement, spacing }
  })), /spacing must be a positive finite value/);
}
for (const legs of [undefined, null, "", 0, -1, 1.5, Number.NaN]) {
  assert.throws(() => ConcreteSectionCalculation.oneWayShear(caseData({
    shearReinforcement: { ...validVerticalReinforcement, legs }
  })), /leg count must be a positive whole number/);
}
for (const yieldStress of [undefined, null, "", 0, -1, 601, Number.NaN]) {
  assert.throws(() => ConcreteSectionCalculation.oneWayShear(caseData({
    shearReinforcement: { ...validVerticalReinforcement, yieldStress }
  })), /yield stress must be greater than zero and no more than 600 MPa/);
}
for (const barArea of [undefined, null, "", 0, -1, Number.NaN]) {
  assert.throws(() => ConcreteSectionCalculation.oneWayShear(caseData({
    shearReinforcement: { ...validVerticalReinforcement, barArea }
  })), /bar area must be a positive finite value/);
}

assert.doesNotThrow(() => ConcreteSectionCalculation.oneWayShear(caseData({
  shearReinforcement: {
    mode: "none",
    barArea: Number.NaN,
    legs: Number.NaN,
    spacing: Number.NaN,
    yieldStress: Number.NaN
  }
})));

console.log("Concrete simplified-shear independent cases passed");
