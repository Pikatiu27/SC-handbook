(function initialiseReoState(globalScope) {
  "use strict";

  const lapLengthChangingIds = Object.freeze([
    "reoRebarPath", "reoBar", "reoMemberRole", "reoMemberType", "reoLapType", "reoMethod", "reoConcreteStrength",
    "reoCastingPosition", "reoMaterialCondition", "reoCover", "reoClearSpacing", "reoBarGap", "reoDoubleArea", "reoHalfSpliced",
    "reoRefinedArrangement", "reoAtrMinBasis", "reoNf", "reoNbs", "reoAtrTotal", "reoPressure", "reoPressureReference", "reoTransverseLocationConfirmed"
  ]);

  const developmentLengthChangingIds = Object.freeze([
    "reoRebarPath", "reoBar", "reoExistingBarOrigin", "reoAnchorageBasis", "reoSteelStress", "reoCastInTermination",
    "reoExistingMemberType", "reoExistingConcreteStrength", "reoExistingCastingPosition", "reoExistingMaterialCondition", "reoExistingCover", "reoExistingClearSpacing", "reoExistingC1", "reoExistingMethod",
    "reoExistingRefinedArrangement", "reoExistingAtrMinBasis", "reoExistingNf", "reoExistingNbs", "reoExistingAtrTotal", "reoExistingPressure", "reoExistingPressureReference", "reoExistingTransverseLocationConfirmed"
  ]);

  const lapQualificationBasisIds = Object.freeze([
    "reoRebarPath", "reoBar", "reoMemberRole", "reoMemberType", "reoLapType", "reoMethod", "reoConcreteStrength",
    "reoCastingPosition", "reoMaterialCondition", "reoCover", "reoClearSpacing", "reoBarGap",
    "reoRefinedArrangement", "reoAtrMinBasis", "reoNf", "reoNbs", "reoAtrTotal", "reoPressure"
  ]);

  const lapLengthChanging = new Set(lapLengthChangingIds);
  const developmentLengthChanging = new Set(developmentLengthChangingIds);
  const lapQualificationBasis = new Set(lapQualificationBasisIds);
  const developmentReducedLengthChanging = new Set([
    ...developmentLengthChangingIds,
    "reoExistingAtrCountConfirmed",
    "reoExistingPressureBasisConfirmed"
  ]);

  function confirmationResetsForInput(id) {
    return Object.freeze({
      lapCandidateCount: lapLengthChanging.has(id),
      developmentCandidateCount: developmentLengthChanging.has(id),
      reducedDevelopmentBasis: developmentReducedLengthChanging.has(id),
      lapQualification: lapQualificationBasis.has(id),
      lapPressureBasis: lapLengthChanging.has(id) && id !== "reoPressureBasisConfirmed",
      developmentPressureBasis: developmentLengthChanging.has(id) && id !== "reoExistingPressureBasisConfirmed",
      lapTransverseLocation: lapLengthChanging.has(id) && id !== "reoTransverseLocationConfirmed",
      developmentTransverseLocation: developmentLengthChanging.has(id) && id !== "reoExistingTransverseLocationConfirmed",
      terminationDetailing: developmentLengthChanging.has(id)
    });
  }

  const api = Object.freeze({
    lapLengthChangingIds,
    developmentLengthChangingIds,
    lapQualificationBasisIds,
    confirmationResetsForInput
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.reoState = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
