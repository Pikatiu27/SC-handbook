"use strict";

const assert = require("node:assert/strict");
const BoltCapacity = require("../bolt-capacity.js");
const WeldCapacity = require("../weld-capacity.js");
const ConcreteSectionCalculation = require("../concrete-section-calculation.js");
require("../reo-calculation.js");

const { barByDesignation, calculateDevelopment, calculateAnchorageComparison } = globalThis.reoLapping;

function closeTo(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual} is not within ${tolerance} of ${expected}`);
}

// Steel Structures Design Manual to AS 4100, Table 9.2.3.
const publishedBoltShear = BoltCapacity.designShear({
  grade: "8.8",
  fuf: 830,
  threadPlanes: 1,
  shankPlanes: 0,
  Ac: 225,
  Ao: 314
});
closeTo(publishedBoltShear.design, 92.6, 0.05, "M20 8.8/S single-shear capacity");
closeTo(BoltCapacity.designTension({ As: 245, fuf: 830 }), 163, 0.5, "M20 8.8/S tension capacity");

// Steel Structures Design Manual to AS 4100, Example 9.4.1.3.
const publishedWeld = WeldCapacity.calculate({
  type: "fillet",
  category: "SP",
  size: 8,
  fuw: 480,
  length: 280,
  runs: 1,
  weldedLap: false
});
closeTo(publishedWeld.capacityPerMm, 1.3, 0.01, "8 mm E48XX SP fillet weld capacity");
assert.ok(publishedWeld.capacityPerMm > 0.84, "published weld demand must pass");

// Loo and Chowdhury AS 3600:2018 reworked Example 3.4.6, case (a).
const concreteStressBlock = ConcreteSectionCalculation.stressBlockFactors(50);
const publishedConcrete = ConcreteSectionCalculation.solveSection({
  width: 250,
  depth: 550,
  fc: 50,
  ...concreteStressBlock,
  ecu: 0.003,
  direction: "top",
  layers: [{
    index: 1,
    yTop: 500,
    d: 500,
    area: 1500,
    fsy: 500,
    es: 200000,
    legacy: false
  }]
});
assert.equal(publishedConcrete.ok, true);
closeTo(publishedConcrete.muo, 346.0, 0.1, "published nominal concrete moment");
closeTo(publishedConcrete.phi, 0.85, 1e-12, "published concrete capacity factor");
closeTo(publishedConcrete.phiMuo, 294.1, 0.1, "published design concrete moment");
closeTo(publishedConcrete.axial / 1000, 0, 0.001, "published concrete force equilibrium");

const reoBase = Object.freeze({
  memberRole: "standard",
  memberType: "wide",
  lapType: "contact",
  method: "refined",
  fc: 32,
  castingPosition: "other",
  materialCondition: "standard",
  cover: 40,
  clearSpacing: 60,
  barGap: 0,
  doubleArea: false,
  halfSpliced: false,
  staggeredArrangement: false,
  refinedArrangement: "custom",
  atrMinBasis: "beam-column",
  nf: 0,
  nbs: 1,
  atrTotal: 770,
  pressure: 0,
  pressureBasisConfirmed: false,
  pressureReference: "",
  transverseEffective: true,
  atrCountConfirmed: true,
  barOrigin: "cast-in",
  terminationType: "straight"
});

// Published AS 3600 hand example: N28, fc' 32 MPa, c 40 mm, a 60 mm, refined K = 0.05.
const publishedDevelopment = calculateDevelopment(barByDesignation("N28"), reoBase);
assert.equal(publishedDevelopment.eligible, true);
closeTo(publishedDevelopment.basicFormula, 1178, 2, "published N28 basic development");
closeTo(publishedDevelopment.k4, 0.95, 0.002, "published N28 confinement factor");
assert.equal(publishedDevelopment.adoptedLength, 1120);

// AS 3600 Cl. 13.1.2.6 reconstruction from the verified straight-development path.
const hookDevelopment = calculateDevelopment(barByDesignation("N28"), {
  ...reoBase,
  terminationType: "hook"
});
const hookAnchorage = calculateAnchorageComparison(barByDesignation("N28"), hookDevelopment, {
  barOrigin: "cast-in",
  basis: "full",
  terminationType: "hook",
  terminationDetailingConfirmed: true
});
assert.equal(hookAnchorage.benchmarkAvailable, true);
closeTo(hookAnchorage.asBenchmarkRaw, 0.5 * hookDevelopment.rawLength, 1e-9, "hook half-development reference");
assert.equal(hookAnchorage.asBenchmarkAdopted, 560);

console.log("Published worked-example tests passed.");
