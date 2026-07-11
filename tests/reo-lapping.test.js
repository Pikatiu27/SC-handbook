"use strict";

const assert = require("node:assert/strict");
require("../reo-calculation.js");

const { bars, barByDesignation, arrangementK, calculateLap, compareProvided } = globalThis.reoLapping;

const baseOptions = Object.freeze({
  memberRole: "standard",
  memberType: "wide",
  lapType: "contact",
  method: "basic",
  fc: 32,
  castingPosition: "other",
  materialCondition: "standard",
  cover: 40,
  clearSpacing: 100,
  barGap: 80,
  k7Basis: "default",
  doubleArea: false,
  halfSpliced: false,
  refinedArrangement: "none",
  atrMinBasis: "beam-column",
  nf: 2,
  nbs: 4,
  atrTotal: 200,
  pressure: 0
});

function calculate(designation, changes = {}) {
  return calculateLap(barByDesignation(designation), { ...baseOptions, ...changes });
}

function approximately(actual, expected, tolerance = 0.05) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
}

const baseline = calculate("N20");
assert.equal(baseline.eligible, true);
approximately(baseline.rawLength, 838.5, 0.1);
assert.equal(baseline.adoptedLength, 840);
assert.equal(baseline.k7, 1.25);
assert.equal(baseline.governing.key, "k7");
assert.equal(baseline.staggerGuideAdopted, 260);
assert.equal(baseline.staggerApplicable, false);

const qualified = calculate("N20", { k7Basis: "qualified", doubleArea: true, halfSpliced: true });
assert.equal(qualified.k7, 1.0);
assert.equal(qualified.adoptedLength, 680);
assert.equal(qualified.staggerApplicable, true);

const unconfirmedReduction = calculate("N20", { k7Basis: "qualified", doubleArea: true, halfSpliced: false });
assert.equal(unconfirmedReduction.k7, 1.25);
assert.match(unconfirmedReduction.notices.join(" "), /Both reduced-k7 confirmations/);

const narrowGap = calculate("N20", { memberType: "narrow", lapType: "noncontact", barGap: 80, k7Basis: "qualified", doubleArea: true, halfSpliced: true });
assert.equal(narrowGap.governing.key, "narrow");
assert.equal(narrowGap.adoptedLength, 800);

const narrowSmallGap = calculate("N20", { memberType: "narrow", lapType: "noncontact", barGap: 60, k7Basis: "qualified", doubleArea: true, halfSpliced: true });
assert.equal(narrowSmallGap.gapUsed, 0);
assert.equal(narrowSmallGap.adoptedLength, 680);

const lowerLimit = calculate("N10", { fc: 65, cover: 200, clearSpacing: 400 });
assert.equal(lowerLimit.governing.key, "lower");
assert.equal(lowerLimit.adoptedLength, 290);

const highStrengthConcrete = calculate("N20", { fc: 80 });
assert.equal(highStrengthConcrete.fcUsed, 65);
assert.match(highStrengthConcrete.notices.join(" "), /65 MPa/);

const epoxy = calculate("N20", { materialCondition: "epoxy" });
approximately(epoxy.basicModified / baseline.basicFormula, 1.5, 0.001);

const lightweight = calculate("N20", { materialCondition: "lightweight" });
approximately(lightweight.basicModified / baseline.basicFormula, 1.3, 0.001);

const combinedMaterial = calculate("N20", { materialCondition: "both" });
approximately(combinedMaterial.basicModified / baseline.basicFormula, 1.95, 0.001);

const topBar = calculate("N20", { castingPosition: "top" });
assert.equal(topBar.k1, 1.3);
assert.equal(topBar.adoptedLength, 1100);

const k3Upper = calculate("N20", { cover: 10, clearSpacing: 20 });
assert.equal(k3Upper.k3, 1.0);

const k3Lower = calculate("N20", { cover: 200, clearSpacing: 400 });
assert.equal(k3Lower.k3, 0.7);

assert.equal(calculate("N20", { cover: 0 }).eligible, false);
assert.equal(calculate("N20", { clearSpacing: 0 }).eligible, false);

const refined = calculate("N20", { method: "refined", refinedArrangement: "circular", atrTotal: 1000, pressure: 10 });
approximately(refined.k3 * refined.refinedFactor, 0.7, 0.001);
assert.equal(refined.combinedFactorLimited, true);
assert.equal(refined.adoptedLength, 700);

assert.equal(arrangementK("circular", 0, 1), 0.10);
assert.equal(arrangementK("beam", 2, 4), 0.075);
assert.equal(arrangementK("slab-no-fitments", 0, 1), 0.05);
assert.equal(arrangementK("rectangular", 2, 3).toFixed(3), "0.083");
assert.equal(arrangementK("custom", 10, 1), 0.10);

assert.equal(calculate("N40").eligible, true);
assert.equal(calculate("N50").eligible, false);
assert.equal(calculate("N20", { memberRole: "tension-tie" }).eligible, false);
assert.equal(bars.length, 10);
assert.equal(barByDesignation("NX"), null);
assert.equal(calculateLap(null, baseOptions).eligible, false);

const shortComparison = compareProvided(baseline, 800);
assert.equal(shortComparison.status, "SHORT");
assert.equal(shortComparison.shortfall, 40);
const meetsComparison = compareProvided(baseline, 900);
assert.equal(meetsComparison.status, "MEETS LENGTH");
assert.equal(meetsComparison.ratio > 1, true);
assert.equal(compareProvided(baseline, 0).status, "NO LENGTH ENTERED");
assert.equal(compareProvided({ eligible: false }, 900).status, "NOT AVAILABLE");

console.log("Reo lapping calculation tests passed.");
