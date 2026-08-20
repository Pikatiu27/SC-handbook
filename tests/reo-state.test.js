"use strict";

const assert = require("node:assert/strict");
const { confirmationResetsForInput } = require("../reo-state.js");

const routeChange = confirmationResetsForInput("reoRebarPath");
assert.equal(routeChange.lapQualification, true);
assert.equal(routeChange.lapCandidateCount, true);
assert.equal(routeChange.developmentCandidateCount, true);
assert.equal(routeChange.reducedDevelopmentBasis, true);
assert.equal(routeChange.terminationDetailing, true);

const lapMethodChange = confirmationResetsForInput("reoMethod");
assert.equal(lapMethodChange.lapQualification, true, "Basic / Refined changes must clear both k7 qualifications");
assert.equal(lapMethodChange.lapCandidateCount, true);
assert.equal(lapMethodChange.lapPressureBasis, true);
assert.equal(lapMethodChange.lapTransverseLocation, true);
assert.equal(lapMethodChange.developmentCandidateCount, false);

for (const id of ["reoRefinedArrangement", "reoAtrMinBasis", "reoNf", "reoNbs", "reoAtrTotal", "reoPressure"]) {
  const resets = confirmationResetsForInput(id);
  assert.equal(resets.lapQualification, true, `${id} must clear stale k7 qualification`);
  assert.equal(resets.lapCandidateCount, true, `${id} must clear the candidate-length reinforcement count`);
}

for (const id of ["reoDoubleArea", "reoHalfSpliced"]) {
  assert.equal(confirmationResetsForInput(id).lapQualification, false, `${id} must not clear the other k7 condition`);
}

const lapLocationConfirmation = confirmationResetsForInput("reoTransverseLocationConfirmed");
assert.equal(lapLocationConfirmation.lapTransverseLocation, false);
assert.equal(lapLocationConfirmation.lapCandidateCount, true);
assert.equal(lapLocationConfirmation.lapQualification, false);

const developmentMethodChange = confirmationResetsForInput("reoExistingMethod");
assert.equal(developmentMethodChange.developmentCandidateCount, true);
assert.equal(developmentMethodChange.developmentPressureBasis, true);
assert.equal(developmentMethodChange.developmentTransverseLocation, true);
assert.equal(developmentMethodChange.reducedDevelopmentBasis, true);
assert.equal(developmentMethodChange.terminationDetailing, true);
assert.equal(developmentMethodChange.lapCandidateCount, false);

const developmentPressureConfirmation = confirmationResetsForInput("reoExistingPressureBasisConfirmed");
assert.equal(developmentPressureConfirmation.developmentPressureBasis, false);
assert.equal(developmentPressureConfirmation.reducedDevelopmentBasis, true);

const finalReducedLengthConfirmation = confirmationResetsForInput("reoReducedLengthRefinedConfirmed");
assert.deepEqual(finalReducedLengthConfirmation, {
  lapCandidateCount: false,
  developmentCandidateCount: false,
  reducedDevelopmentBasis: false,
  lapQualification: false,
  lapPressureBasis: false,
  developmentPressureBasis: false,
  lapTransverseLocation: false,
  developmentTransverseLocation: false,
  terminationDetailing: false
}, "the final confirmation must not invalidate the evidence it confirms");

console.log("Reinforcement state invalidation tests passed.");
