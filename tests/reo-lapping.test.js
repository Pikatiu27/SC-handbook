"use strict";

const assert = require("node:assert/strict");
require("../reo-calculation.js");

const {
  bars,
  barByDesignation,
  arrangementK,
  calculateLap,
  calculateDevelopment,
  calculateAnchorageComparison
} = globalThis.reoLapping;

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
  staggeredArrangement: false,
  refinedArrangement: "none",
  atrMinBasis: "beam-column",
  nf: 2,
  nbs: 4,
  atrTotal: 200,
  pressure: 0,
  pressureBasisConfirmed: false,
  pressureReference: "",
  transverseEffective: false,
  atrCountConfirmed: false
});

function calculate(designation, changes = {}) {
  return calculateLap(barByDesignation(designation), { ...baseOptions, ...changes });
}

function develop(designation, changes = {}) {
  return calculateDevelopment(barByDesignation(designation), { ...baseOptions, ...changes });
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

const defaultLapOracle = Object.freeze({
  N10: 320,
  N12: 390,
  N16: 600,
  N20: 840,
  N24: 1110,
  N28: 1400,
  N32: 1710,
  N36: 2040,
  N40: 2410
});
Object.entries(defaultLapOracle).forEach(([designation, expectedLength]) => {
  const result = calculate(designation);
  assert.equal(result.eligible, true, `${designation} default lap should be eligible`);
  assert.equal(result.adoptedLength, expectedLength, `${designation} default adopted lap`);
  assert.equal(result.governing.key, "k7", `${designation} default governing candidate`);
});

// k7 is derived from the two clause qualifications; the legacy UI mode value
// must not be needed to obtain, or be able to prevent, the qualified value.
const qualified = calculate("N20", { doubleArea: true, halfSpliced: true, staggeredArrangement: true });
assert.equal(qualified.k7, 1.0);
assert.equal(qualified.qualifiedK7, true);
assert.equal(qualified.adoptedLength, 680);
assert.equal(baseline.adoptedLength - qualified.adoptedLength, 160);
assert.equal(qualified.staggerApplicable, true);

const staggerWithDefaultK7 = calculate("N20", { staggeredArrangement: true });
assert.equal(staggerWithDefaultK7.k7, 1.25);
assert.equal(staggerWithDefaultK7.staggerApplicable, true);

const unconfirmedReduction = calculate("N20", { doubleArea: true, halfSpliced: false });
assert.equal(unconfirmedReduction.k7, 1.25);
assert.match(unconfirmedReduction.notices.join(" "), /Both reduced-k7 confirmations/);

const narrowGap = calculate("N20", { memberType: "narrow", lapType: "noncontact", barGap: 80, doubleArea: true, halfSpliced: true });
assert.equal(narrowGap.governing.key, "narrow");
assert.equal(narrowGap.adoptedLength, 800);
const narrowGapDefault = calculate("N20", { memberType: "narrow", lapType: "noncontact", barGap: 80 });
assert.equal(narrowGapDefault.adoptedLength, 840);
assert.equal(narrowGapDefault.adoptedLength - narrowGap.adoptedLength, 40);

const narrowSmallGap = calculate("N20", { memberType: "narrow", lapType: "noncontact", barGap: 60, doubleArea: true, halfSpliced: true });
assert.equal(narrowSmallGap.gapUsed, 0);
assert.equal(narrowSmallGap.adoptedLength, 680);

const lowerLimit = calculate("N10", { fc: 65, cover: 200, clearSpacing: 400 });
assert.equal(lowerLimit.governing.key, "lower");
assert.equal(lowerLimit.adoptedLength, 290);
const qualifiedLowerLimit = calculate("N10", { fc: 65, cover: 200, clearSpacing: 400, doubleArea: true, halfSpliced: true });
assert.equal(qualifiedLowerLimit.governing.key, "lower");
assert.equal(lowerLimit.adoptedLength - qualifiedLowerLimit.adoptedLength, 0);

const highStrengthConcrete = calculate("N20", { fc: 80 });
assert.equal(highStrengthConcrete.fcUsed, 65);
assert.match(highStrengthConcrete.notices.join(" "), /65 MPa/);

const epoxy = calculate("N20", { materialCondition: "epoxy" });
approximately(epoxy.basicModified / baseline.basicFormula, 1.5, 0.001);

const lightweight = calculate("N20", { materialCondition: "lightweight" });
approximately(lightweight.basicModified / baseline.basicFormula, 1.3, 0.001);

const combinedMaterial = calculate("N20", { materialCondition: "both" });
approximately(combinedMaterial.basicModified / baseline.basicFormula, 1.95, 0.001);

// Cl. 13.2.2 expressly removes the Cl. 13.1.2.2 basic lower limit from
// Lsy.t used by the lap equation. The material multiplier therefore applies
// to the formula value, while the final lap separately retains its own floor.
const epoxyLapLowerLimitException = calculate("N10", {
  fc: 65,
  cover: 200,
  clearSpacing: 400,
  materialCondition: "epoxy"
});
assert.equal(epoxyLapLowerLimitException.basicLowerLimit, 290);
assert.equal(epoxyLapLowerLimitException.basicLowerLimitApplied, false);
approximately(epoxyLapLowerLimitException.basicBeforeMaterial, epoxyLapLowerLimitException.basicFormula, 0.001);
approximately(epoxyLapLowerLimitException.developmentLength, epoxyLapLowerLimitException.basicFormula * 1.5, 0.001);
approximately(epoxyLapLowerLimitException.k7Candidate, epoxyLapLowerLimitException.developmentLength * 1.25, 0.001);
assert.equal(epoxyLapLowerLimitException.governing.key, "k7");
assert.equal(epoxyLapLowerLimitException.adoptedLength, 340);

const topBar = calculate("N20", { castingPosition: "top" });
assert.equal(topBar.k1, 1.3);
assert.equal(topBar.adoptedLength, 1100);

const k3Upper = calculate("N20", { cover: 10, clearSpacing: 20 });
assert.equal(k3Upper.k3, 1.0);

const k3Lower = calculate("N20", { cover: 200, clearSpacing: 400 });
assert.equal(k3Lower.k3, 0.7);

assert.equal(calculate("N20", { cover: 0 }).eligible, false);
assert.equal(calculate("N20", { clearSpacing: 0 }).eligible, false);

const refined = calculate("N20", { method: "refined", refinedArrangement: "custom", transverseEffective: true, atrTotal: 1000, pressure: 10, pressureBasisConfirmed: true, pressureReference: "CALC-P-01", atrCountConfirmed: true });
approximately(refined.k3 * refined.refinedFactor, 0.7, 0.001);
assert.equal(refined.combinedFactorLimited, true);
assert.equal(refined.adoptedLength, 700);
assert.equal(refined.pressureCreditRequested, true);
assert.equal(refined.pressureCreditApplied, true);
assert.equal(refined.pressureReference, "CALC-P-01");
assert.equal(refined.pressureEvidenceComplete, true);
assert.match(refined.notices.join(" "), /Sigma Atr is confirmed throughout the candidate lap length/);

const unconfirmedPressureCredit = calculate("N20", {
  method: "refined",
  refinedArrangement: "none",
  pressure: 10,
  pressureBasisConfirmed: false,
  pressureReference: "Structural analysis · governing ULS load combination"
});
assert.equal(unconfirmedPressureCredit.pressureCreditRequested, true);
assert.equal(unconfirmedPressureCredit.pressureCreditApplied, false);
assert.equal(unconfirmedPressureCredit.pressureEvidenceComplete, false);
assert.equal(unconfirmedPressureCredit.k5Candidate, 0.7);
assert.equal(unconfirmedPressureCredit.k5, 1);
assert.equal(unconfirmedPressureCredit.adoptedLength, baseline.adoptedLength);
assert.ok(unconfirmedPressureCredit.refinedCandidateAdoptedLength < unconfirmedPressureCredit.adoptedLength);
assert.equal(unconfirmedPressureCredit.refinedReconciliationRequired, true);
assert.match(unconfirmedPressureCredit.notices.join(" "), /confirm that the referenced transverse-pressure basis applies throughout the candidate lap length/);

const pressureCheckboxWithoutReference = calculate("N20", {
  method: "refined",
  refinedArrangement: "none",
  pressure: 10,
  pressureBasisConfirmed: true,
  pressureReference: ""
});
assert.equal(pressureCheckboxWithoutReference.pressureEvidenceComplete, false);
assert.equal(pressureCheckboxWithoutReference.pressureCreditApplied, false);
assert.equal(pressureCheckboxWithoutReference.k5, 1);
assert.match(pressureCheckboxWithoutReference.notices.join(" "), /enter the calculation or source reference/);

const unconfirmedCandidateLapCount = calculate("N20", {
  method: "refined",
  refinedArrangement: "custom",
  transverseEffective: true,
  atrTotal: 1000,
  pressure: 0,
  atrCountConfirmed: false
});
assert.equal(unconfirmedCandidateLapCount.eligible, true);
assert.equal(unconfirmedCandidateLapCount.adoptedLength, baseline.adoptedLength);
assert.ok(unconfirmedCandidateLapCount.refinedCandidateAdoptedLength < unconfirmedCandidateLapCount.adoptedLength);
assert.equal(unconfirmedCandidateLapCount.refinedReconciliationRequired, true);
assert.match(unconfirmedCandidateLapCount.notices.join(" "), /candidate lap length/);

approximately(arrangementK(2, 4, true), 0.075, 0.0001);
assert.equal(arrangementK(2, 3, true).toFixed(3), "0.083");
assert.equal(arrangementK(10, 1, true), 0.10);
assert.equal(arrangementK(2, 4, false), 0);
assert.equal(arrangementK(2, 0, true), 0);
assert.equal(arrangementK(1.5, 4, true), 0);

const noEffectiveLocationCredit = calculate("N20", { method: "refined", refinedArrangement: "custom", atrTotal: 1000, pressure: 0, transverseEffective: false });
assert.equal(noEffectiveLocationCredit.eligible, false);
assert.match(noEffectiveLocationCredit.issues.join(" "), /governing splitting plane/);

const contradictoryRefinedSelection = calculate("N20", {
  method: "refined",
  refinedArrangement: "none",
  transverseEffective: true,
  nf: 2,
  nbs: 4,
  atrTotal: 1000,
  pressure: 0
});
assert.equal(contradictoryRefinedSelection.eligible, true);
assert.equal(contradictoryRefinedSelection.transverseArrangementConfirmed, false);
assert.equal(contradictoryRefinedSelection.transverseEffective, false);
assert.equal(contradictoryRefinedSelection.K, 0);
assert.equal(contradictoryRefinedSelection.k4, 1);
assert.equal(contradictoryRefinedSelection.adoptedLength, baseline.adoptedLength);
assert.match(contradictoryRefinedSelection.notices.join(" "), /No verified custom transverse-reinforcement arrangement/);

assert.equal(calculate("N20", { method: "refined", refinedArrangement: "custom", nf: 1.5 }).eligible, false);
assert.equal(calculate("N20", { method: "refined", refinedArrangement: "custom", nbs: 2.5 }).eligible, false);
assert.equal(calculate("N20", { method: "refined", refinedArrangement: "custom", nf: -1 }).eligible, false);
const zeroNfArrangement = calculate("N20", {
  method: "refined",
  refinedArrangement: "custom",
  nf: 0,
  nbs: 1,
  atrTotal: 400,
  transverseEffective: true,
  atrCountConfirmed: true
});
assert.equal(zeroNfArrangement.eligible, true);
assert.equal(zeroNfArrangement.K, 0.05);
assert.ok(zeroNfArrangement.k4 < 1);
const zeroAtrArrangement = calculate("N20", {
  method: "refined",
  refinedArrangement: "custom",
  atrTotal: 0,
  transverseEffective: false,
  atrCountConfirmed: false
});
assert.equal(zeroAtrArrangement.eligible, true);
assert.equal(zeroAtrArrangement.lambda, 0);
assert.equal(zeroAtrArrangement.k4, 1);
assert.equal(zeroAtrArrangement.adoptedLength, baseline.adoptedLength);
const belowMinimumAtr = calculate("N20", {
  method: "refined",
  refinedArrangement: "custom",
  atrMinBasis: "beam-column",
  atrTotal: 50,
  transverseEffective: false
});
assert.equal(belowMinimumAtr.eligible, true);
assert.equal(belowMinimumAtr.lambda, 0);
assert.equal(belowMinimumAtr.k4, 1);
assert.equal(calculate("N20", { method: "refined", refinedArrangement: "custom", atrTotal: -1 }).eligible, false);
assert.equal(calculate("N20", { method: "refined", refinedArrangement: "custom", memberType: "narrow", atrMinBasis: "slab-wall", transverseEffective: true, atrCountConfirmed: true }).eligible, false);

assert.equal(calculate("N40").eligible, true);
assert.equal(calculate("N50").eligible, false);
assert.equal(calculate("N20", { memberRole: "tension-tie" }).eligible, false);
assert.equal(bars.length, 10);
assert.equal(barByDesignation("NX"), null);
assert.equal(calculateLap(null, baseOptions).eligible, false);

// Independent Cl. 13.1.2.2 development applies the basic lower bound before
// material and Cl. 13.1.2.3 refined factors. It must not reuse the lap result.
const epoxyLowerBoundDevelopment = develop("N10", {
  fc: 65,
  cover: 200,
  clearSpacing: 400,
  materialCondition: "epoxy"
});
assert.equal(epoxyLowerBoundDevelopment.eligible, true);
assert.equal(epoxyLowerBoundDevelopment.basicLowerLimitApplied, true);
assert.equal(epoxyLowerBoundDevelopment.basicBeforeMaterial, 290);
assert.equal(epoxyLowerBoundDevelopment.basicModified, 435);
assert.equal(epoxyLowerBoundDevelopment.rawLength, 435);
assert.equal(epoxyLowerBoundDevelopment.adoptedLength, 440);

const refinedOrder = develop("N10", {
  fc: 65,
  cover: 20,
  clearSpacing: 40,
  materialCondition: "epoxy",
  method: "refined",
  refinedArrangement: "custom",
  transverseEffective: true,
  nf: 2,
  nbs: 4,
  atrTotal: 200,
  pressure: 0,
  atrCountConfirmed: true
});
assert.equal(refinedOrder.basicBeforeMaterial, 290);
assert.equal(refinedOrder.basicModified, 435);
approximately(refinedOrder.K, 0.075, 0.0001);
approximately(refinedOrder.rawLength, refinedOrder.basicModified * refinedOrder.refinedFactor, 0.001);
assert.ok(refinedOrder.rawLength > 350, "lower limit must be applied before the refined reduction");
assert.match(refinedOrder.notices.join(" "), /Sigma Atr is confirmed throughout the candidate development length/);

const zeroAtrDevelopment = develop("N20", {
  method: "refined",
  refinedArrangement: "custom",
  atrTotal: 0,
  transverseEffective: false,
  atrCountConfirmed: false
});
assert.equal(zeroAtrDevelopment.eligible, true);
assert.equal(zeroAtrDevelopment.lambda, 0);
assert.equal(zeroAtrDevelopment.k4, 1);

const developmentPressureEvidence = develop("N20", {
  method: "refined",
  refinedArrangement: "none",
  pressure: 10,
  pressureBasisConfirmed: true,
  pressureReference: "FOUNDATION-CALC-12"
});
assert.equal(developmentPressureEvidence.pressureReference, "FOUNDATION-CALC-12");
assert.equal(developmentPressureEvidence.pressureEvidenceComplete, true);
assert.equal(developmentPressureEvidence.pressureCreditApplied, true);
assert.equal(developmentPressureEvidence.k5, 0.7);

const developmentPressureWithoutReference = develop("N20", {
  method: "refined",
  refinedArrangement: "none",
  pressure: 10,
  pressureBasisConfirmed: true,
  pressureReference: "   "
});
assert.equal(developmentPressureWithoutReference.pressureReference, "");
assert.equal(developmentPressureWithoutReference.pressureEvidenceComplete, false);
assert.equal(developmentPressureWithoutReference.pressureCreditApplied, false);
assert.equal(developmentPressureWithoutReference.k5, 1);
assert.match(developmentPressureWithoutReference.notices.join(" "), /calculation or source reference for the confirmed transverse pressure/);

const wideDevelopment = develop("N20", { cover: 75, clearSpacing: 120 });
const narrowC1Development = develop("N20", { memberType: "narrow", c1: 25, cover: 75, clearSpacing: 120 });
const coverControlledStraightDevelopment = develop("N20", {
  barOrigin: "cast-in",
  terminationType: "straight",
  cover: 40,
  clearSpacing: 100
});
const wideHookDevelopment = develop("N20", {
  barOrigin: "cast-in",
  terminationType: "hook",
  cover: 40,
  clearSpacing: 100
});
const wideCogDevelopment = develop("N20", {
  barOrigin: "cast-in",
  terminationType: "cog",
  cover: 40,
  clearSpacing: 100
});
const narrowHookDevelopment = develop("N20", {
  barOrigin: "cast-in",
  terminationType: "hook",
  memberType: "narrow",
  c1: 35,
  cover: 20,
  clearSpacing: 100
});
const narrowStraightDevelopment = develop("N20", {
  barOrigin: "cast-in",
  terminationType: "straight",
  memberType: "narrow",
  c1: 35,
  cover: 20,
  clearSpacing: 100
});
const pirHookSelectionDevelopment = develop("N20", {
  barOrigin: "pir",
  terminationType: "hook",
  cover: 40,
  clearSpacing: 100
});
assert.equal(wideDevelopment.cd, 60);
assert.equal(narrowC1Development.cd, 25);
assert.ok(narrowC1Development.rawLength > wideDevelopment.rawLength);
assert.equal(coverControlledStraightDevelopment.cd, 40);
assert.equal(wideHookDevelopment.terminationType, "hook");
assert.equal(wideHookDevelopment.cd, 50);
assert.equal(wideHookDevelopment.adoptedLength, 620);
assert.ok(wideHookDevelopment.rawLength < coverControlledStraightDevelopment.rawLength);
assert.equal(wideCogDevelopment.terminationType, "cog");
assert.equal(wideCogDevelopment.cd, 50);
assert.equal(narrowHookDevelopment.cd, 35);
assert.equal(narrowStraightDevelopment.cd, 20);
assert.equal(pirHookSelectionDevelopment.terminationType, "straight");
assert.equal(pirHookSelectionDevelopment.cd, 40);
assert.equal(develop("N20", { memberType: "narrow", c1: 0 }).eligible, false);

// N50 remains reference data only and is outside both calculation scopes.
assert.equal(calculate("N50").eligible, false);
assert.equal(develop("N50").eligible, false);

const anchorageFull = calculateAnchorageComparison(barByDesignation("N20"), wideDevelopment, { basis: "full" });
assert.equal(anchorageFull.fullDevelopmentAdopted, wideDevelopment.adoptedLength);
assert.equal(anchorageFull.asBenchmarkAdopted, wideDevelopment.adoptedLength);
assert.equal(anchorageFull.basisApplied, "full-yield");

const anchorageHook = calculateAnchorageComparison(barByDesignation("N20"), wideHookDevelopment, {
  basis: "full",
  terminationType: "hook",
  terminationDetailingConfirmed: true
});
assert.equal(anchorageHook.terminationType, "hook");
assert.equal(anchorageHook.terminationFactor, 0.5);
assert.equal(anchorageHook.terminationBasisMismatch, false);
assert.equal(anchorageHook.terminationDetailingConfirmed, true);
assert.equal(anchorageHook.terminationDetailingConfirmationMissing, false);
assert.equal(anchorageHook.hookStraightExtension, 80);
assert.equal(anchorageHook.minimumBendDiameterFactor, 5);
assert.equal(anchorageHook.minimumBendDiameter, 100);
assert.equal(anchorageHook.transverseRestraintRequired, true);
assert.equal(anchorageHook.transverseBarMinimumDiameter, 20);
assert.equal(anchorageHook.transverseBarExtensionEachSide, 80);
approximately(anchorageHook.asBenchmarkRaw, 0.5 * wideHookDevelopment.rawLength, 0.001);
assert.equal(anchorageHook.asBenchmarkAdopted, 310);

const lowStressHook = calculateAnchorageComparison(barByDesignation("N20"), wideHookDevelopment, {
  basis: "actual",
  actualStress: 350,
  terminationType: "hook",
  terminationDetailingConfirmed: true
});
assert.equal(lowStressHook.transverseRestraintRequired, false);

const epoxyHookDevelopment = develop("N20", { terminationType: "hook", materialCondition: "epoxy" });
const epoxyHook = calculateAnchorageComparison(barByDesignation("N20"), epoxyHookDevelopment, {
  basis: "full",
  terminationType: "hook",
  terminationDetailingConfirmed: true
});
assert.equal(epoxyHook.minimumBendDiameterFactor, 8);
assert.equal(epoxyHook.minimumBendDiameter, 160);

const anchorageCog = calculateAnchorageComparison(barByDesignation("N20"), wideCogDevelopment, {
  basis: "full",
  terminationType: "cog",
  terminationDetailingConfirmed: true
});
assert.equal(anchorageCog.terminationType, "cog");
assert.equal(anchorageCog.terminationFactor, 0.5);
assert.equal(anchorageCog.asBenchmarkAdopted, anchorageHook.asBenchmarkAdopted);
assert.equal(anchorageCog.maximumCogBendDiameter, 160);

const unconfirmedHookDetailing = calculateAnchorageComparison(barByDesignation("N20"), wideHookDevelopment, {
  basis: "full",
  terminationType: "hook",
  terminationDetailingConfirmed: false
});
assert.equal(unconfirmedHookDetailing.fullDevelopmentAdopted, wideHookDevelopment.adoptedLength);
assert.equal(unconfirmedHookDetailing.terminationType, "hook");
assert.equal(unconfirmedHookDetailing.terminationFactor, 0.5);
assert.equal(unconfirmedHookDetailing.terminationDetailingConfirmed, false);
assert.equal(unconfirmedHookDetailing.terminationDetailingConfirmationMissing, true);
assert.equal(unconfirmedHookDetailing.benchmarkAvailable, false);
assert.equal(unconfirmedHookDetailing.asBenchmarkRaw, null);
assert.equal(unconfirmedHookDetailing.asBenchmarkAdopted, null);
assert.equal(unconfirmedHookDetailing.basisApplied, null);
assert.equal(unconfirmedHookDetailing.status, "REVIEW REQUIRED");
assert.match(unconfirmedHookDetailing.issues.join(" "), /displayed standard hook bend, extension, cover and confinement requirements/);

const mismatchedHookBasis = calculateAnchorageComparison(barByDesignation("N20"), coverControlledStraightDevelopment, {
  basis: "full",
  terminationType: "hook",
  terminationDetailingConfirmed: true
});
assert.equal(mismatchedHookBasis.benchmarkAvailable, false);
assert.equal(mismatchedHookBasis.terminationBasisMismatch, true);
assert.match(mismatchedHookBasis.issues.join(" "), /Recalculate the development basis/);

const pirIgnoresTermination = calculateAnchorageComparison(barByDesignation("N20"), wideDevelopment, {
  barOrigin: "pir",
  terminationType: "hook"
});
assert.equal(pirIgnoresTermination.terminationType, "straight");
assert.equal(pirIgnoresTermination.terminationFactor, 1);
assert.equal(pirIgnoresTermination.terminationDetailingConfirmationMissing, false);

const pirStressBasedReference = calculateAnchorageComparison(barByDesignation("N20"), wideDevelopment, {
  barOrigin: "pir",
  basis: "actual",
  actualStress: 250
});
assert.equal(pirStressBasedReference.actualStressApplied, true);
assert.equal(pirStressBasedReference.basisApplied, "actual-stress");
assert.equal(pirStressBasedReference.asBenchmarkAdopted, Math.ceil(Math.max(wideDevelopment.rawLength * 0.5, 240) / 10) * 10);

const anchorageActual = calculateAnchorageComparison(barByDesignation("N20"), wideDevelopment, { basis: "actual", actualStress: 250 });
assert.equal(anchorageActual.actualStress, 250);
assert.equal(anchorageActual.actualStressApplied, true);
approximately(anchorageActual.reducedDevelopmentRaw, Math.max(wideDevelopment.rawLength * 0.5, 240), 0.001);
assert.equal(anchorageActual.asBenchmarkAdopted, Math.ceil(anchorageActual.reducedDevelopmentRaw / 10) * 10);

const refinedDevelopmentForStress = develop("N20", {
  method: "refined",
  refinedArrangement: "custom",
  transverseEffective: true,
  atrTotal: 1000,
  atrCountConfirmed: true
});
const unconfirmedCombinedReduction = calculateAnchorageComparison(barByDesignation("N20"), refinedDevelopmentForStress, {
  basis: "actual",
  actualStress: 250
});
assert.equal(unconfirmedCombinedReduction.benchmarkAvailable, false);
assert.equal(unconfirmedCombinedReduction.refinedReducedLengthConfirmationMissing, true);
assert.ok(unconfirmedCombinedReduction.reducedDevelopmentCandidateAdopted > 0);
assert.match(unconfirmedCombinedReduction.issues.join(" "), /Refined confinement and pressure evidence remains valid throughout the candidate/);
const confirmedCombinedReduction = calculateAnchorageComparison(barByDesignation("N20"), refinedDevelopmentForStress, {
  basis: "actual",
  actualStress: 250,
  refinedReducedLengthConfirmed: true
});
assert.equal(confirmedCombinedReduction.benchmarkAvailable, true);
assert.equal(confirmedCombinedReduction.actualStressApplied, true);

const noCreditRefinedDevelopment = develop("N20", {
  method: "refined",
  refinedArrangement: "none"
});
const noCreditActualStress = calculateAnchorageComparison(barByDesignation("N20"), noCreditRefinedDevelopment, {
  basis: "actual",
  actualStress: 250
});
assert.equal(noCreditActualStress.refinedReducedLengthConfirmationMissing, false);
assert.equal(noCreditActualStress.actualStressApplied, true);

const anchorageFloor = calculateAnchorageComparison(barByDesignation("N20"), wideDevelopment, { basis: "actual", actualStress: 25 });
assert.equal(anchorageFloor.asBenchmarkRaw, 240);
assert.equal(anchorageFloor.asBenchmarkAdopted, 240);

assert.equal(calculateAnchorageComparison(barByDesignation("N20"), baseline).available, false);
assert.equal(calculateAnchorageComparison(null, wideDevelopment).available, false);

console.log("Reo lapping calculation tests passed.");
