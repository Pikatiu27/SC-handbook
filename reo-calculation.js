(function initialiseReoCalculation(globalScope) {
  "use strict";

  const reoBars = Object.freeze([
    { designation: "N10", diameter: 10, area: 78.5, standardMass: 0.617, supplierMass: 0.64, metresPerTonne: 1552, availability: "Current Class N range" },
    { designation: "N12", diameter: 12, area: 113, standardMass: 0.888, supplierMass: 0.93, metresPerTonne: 1077, availability: "Current Class N range" },
    { designation: "N16", diameter: 16, area: 201, standardMass: 1.58, supplierMass: 1.65, metresPerTonne: 605, availability: "Current Class N range" },
    { designation: "N20", diameter: 20, area: 314, standardMass: 2.47, supplierMass: 2.58, metresPerTonne: 387, availability: "Current Class N range" },
    { designation: "N24", diameter: 24, area: 452, standardMass: 3.55, supplierMass: 3.71, metresPerTonne: 269, availability: "Current Class N range" },
    { designation: "N28", diameter: 28, area: 616, standardMass: 4.83, supplierMass: 5.05, metresPerTonne: 198, availability: "Current Class N range" },
    { designation: "N32", diameter: 32, area: 804, standardMass: 6.31, supplierMass: 6.59, metresPerTonne: 151, availability: "Current Class N range" },
    { designation: "N36", diameter: 36, area: 1020, standardMass: 7.99, supplierMass: 8.35, metresPerTonne: 119, availability: "Current Class N range" },
    { designation: "N40", diameter: 40, area: 1260, standardMass: 9.86, supplierMass: 10.30, metresPerTonne: 97, availability: "Current page: on request" },
    { designation: "N50", diameter: 50, area: 1960, standardMass: 15.4, supplierMass: 16.02, metresPerTonne: 64, availability: "2022 product guide: on request; current page omits" }
  ]);

  function clamp(number, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, number));
  }

  function barByDesignation(designation) {
    return reoBars.find(bar => bar.designation === designation) || null;
  }

  function arrangementK(nf, nbs, effectiveLocationConfirmed) {
    if (!effectiveLocationConfirmed) return 0;
    if (!Number.isInteger(nf) || nf < 0 || !Number.isInteger(nbs) || nbs < 1) return 0;
    return Math.min(0.05 * (1 + nf / nbs), 0.10);
  }

  function conditionFactor(materialCondition) {
    const factors = { standard: 1, epoxy: 1.5, lightweight: 1.3, both: 1.95 };
    return factors[materialCondition] || 1;
  }

  function validateCommonInputs(bar, options, issues) {
    if (!bar || !Number.isFinite(bar.diameter) || !Number.isFinite(bar.area)) {
      issues.push("Select a supported 500N reinforcing bar designation.");
      return;
    }
    if (!Number.isFinite(options.fc) || options.fc < 20) issues.push("Enter a concrete strength of at least 20 MPa for this quick check.");
    if (!Number.isFinite(options.cover) || options.cover <= 0) issues.push("Concrete cover c must be greater than zero.");
    if (!Number.isFinite(options.clearSpacing) || options.clearSpacing <= 0) issues.push("Clear bar spacing a must be greater than zero.");
    const customRefinedArrangement = options.method === "refined" && options.refinedArrangement === "custom";
    const atrMin = bar && options.atrMinBasis === "beam-column" ? 0.25 * bar.area : 0;
    const confinementCreditPossible = customRefinedArrangement
      && Number.isFinite(options.atrTotal)
      && options.atrTotal > atrMin;
    if (customRefinedArrangement && (!Number.isInteger(options.nf) || options.nf < 0)) issues.push("Enter a whole-number fitment-bar count nf of zero or greater.");
    if (customRefinedArrangement && (!Number.isInteger(options.nbs) || options.nbs < 1)) issues.push("Enter a whole-number nbs count of at least one.");
    if (customRefinedArrangement && (!Number.isFinite(options.atrTotal) || options.atrTotal < 0)) issues.push("Enter a verified qualifying transverse-reinforcement area of zero or greater.");
    if (confinementCreditPossible && options.transverseEffective !== true) issues.push("Confirm that the qualifying transverse reinforcement crosses and restrains the governing splitting plane.");
    if (options.method === "refined" && (!Number.isFinite(options.pressure) || options.pressure < 0)) issues.push("Refined-method transverse pressure must be zero or greater.");
    if (customRefinedArrangement && options.memberType === "narrow" && options.atrMinBasis !== "beam-column") {
      issues.push("Narrow-member Refined development requires the beam/column Sigma Atr,min basis of 0.25As.");
    }
  }

  function developmentFactors(bar, options, cd, applyBasicLowerLimit) {
    const fsy = 500;
    const db = bar.diameter;
    const fcUsed = Math.min(options.fc, 65);
    const k1 = options.castingPosition === "top" ? 1.3 : 1.0;
    const k2 = (132 - db) / 100;
    const k3Unbounded = 1 - 0.15 * (cd - db) / db;
    const k3 = clamp(k3Unbounded, 0.7, 1.0);
    const materialFactor = conditionFactor(options.materialCondition);
    const basicFormula = 0.5 * k1 * k3 * fsy * db / (k2 * Math.sqrt(fcUsed));
    const basicLowerLimit = 0.058 * fsy * k1 * db;
    const basicBeforeMaterial = applyBasicLowerLimit ? Math.max(basicFormula, basicLowerLimit) : basicFormula;
    const basicLowerLimitApplied = applyBasicLowerLimit && basicLowerLimit > basicFormula;
    const basicModified = basicBeforeMaterial * materialFactor;

    const refined = options.method === "refined";
    const transverseArrangementConfirmed = refined && options.refinedArrangement === "custom";
    const transverseEffective = transverseArrangementConfirmed && options.transverseEffective === true;
    const K = refined ? arrangementK(options.nf, options.nbs, transverseEffective) : 0;
    const atrMin = options.atrMinBasis === "beam-column" ? 0.25 * bar.area : 0;
    const lambda = refined ? Math.max((Math.max(0, options.atrTotal) - atrMin) / bar.area, 0) : 0;
    const k4Raw = refined ? 1 - K * lambda : 1;
    const k4Candidate = refined ? clamp(k4Raw, 0.7, 1.0) : 1;
    const confinementCreditRequested = refined && transverseEffective && lambda > 0 && k4Candidate < 1;
    const atrCountConfirmed = options.atrCountConfirmed === true;
    const confinementCreditApplied = confinementCreditRequested && atrCountConfirmed;
    const k4 = confinementCreditApplied ? k4Candidate : 1;
    const enteredPressure = Number(options.pressure);
    const k5Raw = refined ? 1 - 0.04 * Math.max(0, enteredPressure) : 1;
    const k5Candidate = refined ? clamp(k5Raw, 0.7, 1.0) : 1;
    const pressureCreditRequested = refined && enteredPressure > 0 && k5Candidate < 1;
    const pressureBasisConfirmed = options.pressureBasisConfirmed === true;
    const pressureReference = String(options.pressureReference || "").trim();
    const pressureEvidenceComplete = pressureBasisConfirmed && Boolean(pressureReference);
    const pressureCreditApplied = pressureCreditRequested && pressureEvidenceComplete;
    const k5 = pressureCreditApplied ? k5Candidate : 1;
    const candidateK4 = confinementCreditRequested ? k4Candidate : 1;
    const candidateK5 = pressureCreditRequested ? k5Candidate : 1;
    const requestedCandidateFactor = refined ? candidateK4 * candidateK5 : 1;
    const requestedRefinedFactor = refined ? k4 * k5 : 1;
    const combinedMinimumFactor = refined ? 0.7 / k3 : 1;
    const candidateRefinedFactor = refined ? Math.max(requestedCandidateFactor, combinedMinimumFactor) : 1;
    const refinedFactor = refined ? Math.max(requestedRefinedFactor, combinedMinimumFactor) : 1;
    const candidateCombinedFactorLimited = refined && candidateRefinedFactor > requestedCandidateFactor + 1e-9;
    const combinedFactorLimited = refined && refinedFactor > requestedRefinedFactor + 1e-9;
    const candidateDevelopmentLength = basicModified * candidateRefinedFactor;
    const developmentLength = basicModified * refinedFactor;
    const refinedCreditRequested = confinementCreditRequested || pressureCreditRequested;
    const refinedEvidenceComplete = (!confinementCreditRequested || atrCountConfirmed)
      && (!pressureCreditRequested || pressureEvidenceComplete);
    const refinedReconciliationRequired = refined && refinedCreditRequested && !refinedEvidenceComplete;

    return {
      method: refined ? "refined" : "basic",
      materialCondition: options.materialCondition,
      fsy, fcUsed, k1, k2, cd, k3Unbounded, k3, conditionFactor: materialFactor,
      basicFormula, basicLowerLimit, basicBeforeMaterial, basicLowerLimitApplied,
      basicModified, transverseArrangementConfirmed, transverseEffective, K, atrMin, lambda, k4Raw, k4Candidate, k4,
      atrCountConfirmed, confinementCreditRequested, confinementCreditApplied,
      k5Raw, k5Candidate, k5, pressureBasisConfirmed, pressureReference, pressureEvidenceComplete,
      pressureCreditRequested, pressureCreditApplied,
      candidateK4, candidateK5, requestedCandidateFactor, candidateRefinedFactor, candidateCombinedFactorLimited,
      requestedRefinedFactor, refinedFactor, combinedFactorLimited, candidateDevelopmentLength, developmentLength,
      refinedCreditRequested, refinedEvidenceComplete, refinedReconciliationRequired
    };
  }

  function calculateLap(bar, options = {}) {
    const issues = [];
    validateCommonInputs(bar, options, issues);
    if (bar && options.memberRole === "tension-tie") issues.push("Tension-tie splices must be welded or mechanical under AS 3600 Cl. 13.2.1.");
    if (bar && bar.diameter > 40) issues.push("Lapped splices are not permitted for bars larger than 40 mm under AS 3600 Cl. 13.2.1.");
    if (options.memberType === "narrow" && options.lapType === "noncontact" && (!Number.isFinite(options.barGap) || options.barGap < 0)) issues.push("Non-contact gap sb cannot be negative.");
    if (issues.length) return { eligible: false, issues, bar: bar || null };

    const db = bar.diameter;
    const cd = Math.min(options.clearSpacing / 2, options.cover);
    // AS 3600 Cl. 13.2.2 expressly excludes the Cl. 13.1.2.2 basic lower
    // limit when determining Lsy.t for the lap equation. The final lap still
    // compares the separate 0.058 fsy k1 db candidate below.
    const factors = developmentFactors(bar, options, cd, false);
    const { fsy, k1, developmentLength, candidateDevelopmentLength } = factors;

    const qualifiedK7 = options.doubleArea === true && options.halfSpliced === true;
    const k7 = qualifiedK7 ? 1.0 : 1.25;
    const lapLowerLimit = factors.basicLowerLimit;
    const k7Candidate = k7 * developmentLength;
    const gapEntered = options.lapType === "contact" ? 0 : Math.max(0, options.barGap);
    const gapUsed = gapEntered <= 3 * db ? 0 : gapEntered;
    const narrowCandidate = developmentLength + 1.5 * gapUsed;
    const candidates = [
      { key: "lower", value: lapLowerLimit, label: "Cl. 13.2.2 lap lower limit" },
      { key: "k7", value: k7Candidate, label: `k7 Lsy.t (${k7.toFixed(2)} × Lsy.t)` }
    ];
    if (options.memberType === "narrow") candidates.push({ key: "narrow", value: narrowCandidate, label: "Narrow-member Lsy.t + 1.5sb" });
    const governing = candidates.reduce((maximum, candidate) => candidate.value > maximum.value ? candidate : maximum, candidates[0]);
    const rawLength = governing.value;
    const adoptedLength = Math.ceil(rawLength / 10) * 10;
    const candidateK7Value = k7 * candidateDevelopmentLength;
    const candidateNarrowValue = candidateDevelopmentLength + 1.5 * gapUsed;
    const refinedCandidates = [
      { key: "lower", value: lapLowerLimit, label: "Cl. 13.2.2 lap lower limit" },
      { key: "k7", value: candidateK7Value, label: `k7 Lsy.t (${k7.toFixed(2)} × Lsy.t)` }
    ];
    if (options.memberType === "narrow") refinedCandidates.push({ key: "narrow", value: candidateNarrowValue, label: "Narrow-member Lsy.t + 1.5sb" });
    const refinedCandidateGoverning = refinedCandidates.reduce((maximum, candidate) => candidate.value > maximum.value ? candidate : maximum, refinedCandidates[0]);
    const refinedCandidateRawLength = refinedCandidateGoverning.value;
    const refinedCandidateAdoptedLength = Math.ceil(refinedCandidateRawLength / 10) * 10;
    const staggerGuideRaw = 0.3 * rawLength;
    const staggerGuideAdopted = Math.ceil(staggerGuideRaw / 10) * 10;
    const staggerApplicable = options.staggeredArrangement === true;
    const notices = [];
    if (options.fc > 65) notices.push("f'c exceeds 65 MPa; 65 MPa is used in the development-length expression.");
    if ((options.doubleArea === true || options.halfSpliced === true) && !qualifiedK7) notices.push("Both reduced-k7 confirmations are required; k7 = 1.25 has been applied.");
    if (options.memberType === "narrow" && gapEntered <= 3 * db) notices.push(`sb = ${gapEntered.toFixed(1)} mm <= 3db = ${(3 * db).toFixed(1)} mm; sb is taken as zero in the narrow-member candidate.`);
    if (factors.combinedFactorLimited) notices.push("The requested refined reduction was limited to maintain k3 k4 k5 >= 0.7.");
    if (options.method === "refined" && !factors.transverseArrangementConfirmed) notices.push("No verified custom transverse-reinforcement arrangement is selected; K = 0 and no k4 confinement credit is taken.");
    else if (options.method === "refined" && factors.lambda > 0 && !factors.transverseEffective) notices.push("Effective transverse-reinforcement location is not confirmed; K = 0 and no k4 confinement credit is taken.");
    if (factors.confinementCreditRequested && !factors.atrCountConfirmed) notices.push("k4 confinement credit is not applied until Sigma Atr is confirmed throughout the displayed candidate lap length.");
    else if (factors.confinementCreditApplied) notices.push("Sigma Atr is confirmed throughout the candidate lap length; recalculate if the candidate length or qualifying reinforcement changes.");
    if (factors.pressureCreditRequested && !factors.pressureEvidenceComplete) {
      if (!factors.pressureBasisConfirmed && !factors.pressureReference) notices.push("k5 pressure credit is not applied: confirm the transverse-pressure basis and enter its calculation or source reference for the candidate lap length.");
      else if (!factors.pressureBasisConfirmed) notices.push("k5 pressure credit is not applied: confirm that the referenced transverse-pressure basis applies throughout the candidate lap length.");
      else notices.push("k5 pressure credit is not applied: enter the calculation or source reference for the confirmed transverse pressure.");
    }
    else if (factors.pressureCreditApplied) notices.push("The transverse-pressure basis is confirmed throughout the candidate lap length; recalculate if the candidate length or pressure field changes.");
    return {
      eligible: true, bar, ...factors,
      qualifiedK7, k7, lapLowerLimit, k7Candidate, gapEntered, gapUsed, narrowCandidate,
      candidates, governing, rawLength, adoptedLength, ratio: adoptedLength / db,
      refinedCandidates, refinedCandidateGoverning, refinedCandidateRawLength, refinedCandidateAdoptedLength,
      staggerGuideRaw, staggerGuideAdopted, staggerApplicable, notices
    };
  }

  function calculateDevelopment(bar, options = {}) {
    const issues = [];
    validateCommonInputs(bar, options, issues);
    if (bar && bar.diameter > 40) issues.push("Bars larger than 40 mm are outside the current development-reference scope; complete a project-specific check.");
    const memberType = options.memberType === "narrow" ? "narrow" : "wide";
    if (memberType === "narrow" && (!Number.isFinite(options.c1) || options.c1 <= 0)) {
      issues.push("Narrow-member end or side distance c1 must be greater than zero.");
    }
    if (issues.length) return { eligible: false, issues, bar: bar || null, calculationType: "development" };

    const requestedTerminationType = normaliseSelection(options.terminationType);
    const terminationType = options.barOrigin !== "pir" && ["hook", "cog"].includes(requestedTerminationType)
      ? requestedTerminationType
      : "straight";
    const hookedOrCogged = terminationType !== "straight";
    const cdCandidates = [options.clearSpacing / 2];
    if (memberType === "narrow") cdCandidates.push(options.c1);
    if (!hookedOrCogged) cdCandidates.push(options.cover);
    const cd = Math.min(...cdCandidates);
    const factors = developmentFactors(bar, options, cd, true);
    const rawLength = factors.developmentLength;
    const adoptedLength = Math.ceil(rawLength / 10) * 10;
    const refinedCandidateRawLength = factors.candidateDevelopmentLength;
    const refinedCandidateAdoptedLength = Math.ceil(refinedCandidateRawLength / 10) * 10;
    const notices = [];
    if (options.fc > 65) notices.push("f'c exceeds 65 MPa; 65 MPa is used in the development-length expression.");
    if (factors.basicLowerLimitApplied) notices.push("The Cl. 13.1.2.2 basic lower limit governs before the material-condition multiplier and refined factor are applied.");
    if (factors.combinedFactorLimited) notices.push("The requested refined reduction was limited to maintain k3 k4 k5 >= 0.7.");
    if (options.method === "refined" && !factors.transverseArrangementConfirmed) notices.push("No verified custom transverse-reinforcement arrangement is selected; K = 0 and no k4 confinement credit is taken.");
    else if (options.method === "refined" && factors.lambda > 0 && !factors.transverseEffective) notices.push("Effective transverse-reinforcement location is not confirmed; K = 0 and no k4 confinement credit is taken.");
    if (factors.confinementCreditRequested && !factors.atrCountConfirmed) notices.push("k4 confinement credit is not applied until Sigma Atr is confirmed throughout the displayed candidate development length.");
    else if (factors.confinementCreditApplied) notices.push("Sigma Atr is confirmed throughout the candidate development length; recalculate if the candidate length or qualifying reinforcement changes.");
    if (factors.pressureCreditRequested && !factors.pressureEvidenceComplete) {
      if (!factors.pressureBasisConfirmed && !factors.pressureReference) notices.push("k5 pressure credit is not applied: confirm the transverse-pressure basis and enter its calculation or source reference for the candidate development length.");
      else if (!factors.pressureBasisConfirmed) notices.push("k5 pressure credit is not applied: confirm that the referenced transverse-pressure basis applies throughout the candidate development length.");
      else notices.push("k5 pressure credit is not applied: enter the calculation or source reference for the confirmed transverse pressure.");
    }
    else if (factors.pressureCreditApplied) notices.push("The transverse-pressure basis is confirmed throughout the candidate development length; recalculate if the candidate length or pressure field changes.");
    return {
      eligible: true,
      calculationType: "development",
      bar,
      memberType,
      terminationType,
      hookedOrCogged,
      c1: memberType === "narrow" ? options.c1 : null,
      cdCandidates,
      ...factors,
      rawLength,
      adoptedLength,
      refinedCandidateRawLength,
      refinedCandidateAdoptedLength,
      ratio: adoptedLength / bar.diameter,
      notices
    };
  }

  function unavailableAnchorage(issues, barOrigin = "cast-in") {
    return {
      available: false,
      status: "NOT AVAILABLE",
      barOrigin,
      developmentBasisValid: false,
      benchmarkAvailable: false,
      terminationType: "straight",
      terminationFactor: 1,
      terminationDetailingConfirmed: true,
      terminationDetailingConfirmationMissing: false,
      fullDevelopmentRaw: null,
      fullDevelopmentAdopted: null,
      asBenchmarkRaw: null,
      asBenchmarkAdopted: null,
      issues
    };
  }

  function normaliseSelection(value) {
    return String(value || "").trim().toLowerCase();
  }

  function calculateAnchorageComparison(bar, developmentResult, options = {}) {
    const barOrigin = options.barOrigin === "pir" ? "pir" : "cast-in";
    if (!bar || !Number.isFinite(bar.diameter) || !Number.isFinite(bar.area)) {
      return unavailableAnchorage(["A supported reinforcing bar is required for the anchorage reference."], barOrigin);
    }

    const developmentResultEligible = developmentResult?.eligible === true
      && developmentResult.calculationType === "development";
    const developmentBarMatches = developmentResultEligible
      && developmentResult.bar
      && developmentResult.bar.diameter === bar.diameter;
    const fullDevelopmentRaw = developmentBarMatches ? Number(developmentResult.rawLength) : null;
    const fullDevelopmentAdopted = developmentBarMatches ? Number(developmentResult.adoptedLength) : null;
    const developmentBasisValid = developmentResultEligible
      && developmentBarMatches
      && Number.isFinite(fullDevelopmentRaw)
      && fullDevelopmentRaw > 0
      && Number.isFinite(fullDevelopmentAdopted)
      && fullDevelopmentAdopted > 0;

    if (!developmentBasisValid) {
      const reason = !developmentResultEligible
        ? "A valid independent development-length result is required; a lap result cannot be used as the anchorage basis."
        : !developmentBarMatches
          ? "The selected bar does not match the development-length result."
          : "The independent development-length result does not contain usable lengths.";
      return unavailableAnchorage([reason], barOrigin);
    }

    const issues = [];
    const fsy = developmentResult.fsy || 500;
    const actualStressRequested = options.basis === "actual";
    const enteredStress = Number(options.actualStress);
    const stressEntered = Number.isFinite(enteredStress) && enteredStress > 0;
    const stressInputMissing = actualStressRequested && !stressEntered;
    const stressOverYield = actualStressRequested && stressEntered && enteredStress > fsy;
    const reducedDevelopmentSourceRaw = developmentResult.method === "refined"
      && developmentResult.refinedCreditRequested
      ? developmentResult.refinedCandidateRawLength
      : fullDevelopmentRaw;
    const minimumReduced = 12 * bar.diameter;
    const reducedDevelopmentCandidateRaw = actualStressRequested && stressEntered && !stressOverYield
      ? Math.max(reducedDevelopmentSourceRaw * enteredStress / fsy, minimumReduced)
      : null;
    const reducedDevelopmentCandidateAdopted = reducedDevelopmentCandidateRaw === null
      ? null
      : Math.ceil(reducedDevelopmentCandidateRaw / 10) * 10;
    const refinedReducedLengthConfirmationMissing = actualStressRequested
      && stressEntered
      && !stressOverYield
      && developmentResult.method === "refined"
      && developmentResult.refinedCreditRequested
      && options.refinedReducedLengthConfirmed !== true;
    const actualStressApplied = actualStressRequested
      && stressEntered
      && !stressOverYield
      && !refinedReducedLengthConfirmationMissing;
    const reducedDevelopmentRaw = actualStressApplied ? reducedDevelopmentCandidateRaw : null;
    const reducedDevelopmentAdopted = reducedDevelopmentRaw === null
      ? null
      : Math.ceil(reducedDevelopmentRaw / 10) * 10;

    const requestedTerminationType = normaliseSelection(options.terminationType);
    const terminationType = barOrigin === "cast-in" && ["hook", "cog"].includes(requestedTerminationType)
      ? requestedTerminationType
      : "straight";
    const developmentTerminationType = developmentResult.terminationType || "straight";
    const terminationBasisMismatch = developmentTerminationType !== terminationType;
    const terminationFactor = terminationType === "straight" ? 1 : 0.5;
    const terminationDetailingConfirmed = terminationType === "straight"
      || options.terminationDetailingConfirmed === true;
    const terminationDetailingConfirmationMissing = terminationType !== "straight"
      && !terminationDetailingConfirmed;

    const hookStraightExtension = Math.max(4 * bar.diameter, 70);
    const coatedBar = ["epoxy", "both"].includes(developmentResult.materialCondition);
    const minimumBendDiameterFactor = coatedBar && bar.diameter >= 20 ? 8 : 5;
    const minimumBendDiameter = minimumBendDiameterFactor * bar.diameter;
    const maximumCogBendDiameter = 8 * bar.diameter;
    const governingStressForRestraint = actualStressRequested && stressEntered && !stressOverYield
      ? enteredStress
      : fsy;
    const transverseRestraintRequired = terminationType !== "straight" && governingStressForRestraint > 400;
    const transverseBarMinimumDiameter = transverseRestraintRequired ? bar.diameter : null;
    const transverseBarExtensionEachSide = transverseRestraintRequired ? 4 * bar.diameter : null;

    if (stressInputMissing) {
      issues.push("Enter a positive design tensile stress sigma_st; the selected stress-based reference remains unavailable.");
    }
    if (stressOverYield) {
      issues.push(`Entered sigma_st = ${enteredStress.toFixed(1)} MPa exceeds fsy = ${fsy.toFixed(0)} MPa; review the bar design.`);
    }
    if (refinedReducedLengthConfirmationMissing) {
      issues.push("Confirm that the Refined confinement and pressure evidence remains valid throughout the candidate Lst length before combining reductions.");
    }
    if (terminationDetailingConfirmationMissing) {
      issues.push(`Confirm the displayed standard ${terminationType} bend, extension, cover and confinement requirements before applying the 0.5 anchorage factor.`);
    }
    if (terminationBasisMismatch) {
      issues.push("Recalculate the development basis for the selected straight, hook or cog geometry before reporting the anchorage reference.");
    }

    const benchmarkAvailable = !stressInputMissing
      && !stressOverYield
      && !refinedReducedLengthConfirmationMissing
      && !terminationDetailingConfirmationMissing
      && !terminationBasisMismatch;
    const straightBenchmarkRaw = benchmarkAvailable
      ? (actualStressApplied ? reducedDevelopmentRaw : fullDevelopmentRaw)
      : null;
    const asBenchmarkRaw = straightBenchmarkRaw === null ? null : straightBenchmarkRaw * terminationFactor;
    const asBenchmarkAdopted = asBenchmarkRaw === null ? null : Math.ceil(asBenchmarkRaw / 10) * 10;

    return {
      available: true,
      status: benchmarkAvailable ? "REFERENCE AVAILABLE" : "REVIEW REQUIRED",
      barOrigin,
      developmentBasisValid,
      benchmarkAvailable,
      fsy,
      fullDevelopmentRaw,
      fullDevelopmentAdopted,
      actualStressRequested,
      actualStress: actualStressRequested && stressEntered ? enteredStress : null,
      stressInputMissing,
      stressOverYield,
      refinedReducedLengthConfirmationMissing,
      actualStressApplied,
      minimumReduced,
      reducedDevelopmentSourceRaw,
      reducedDevelopmentCandidateRaw,
      reducedDevelopmentCandidateAdopted,
      reducedDevelopmentRaw,
      reducedDevelopmentAdopted,
      terminationType,
      developmentTerminationType,
      terminationBasisMismatch,
      terminationFactor,
      terminationDetailingConfirmed,
      terminationDetailingConfirmationMissing,
      hookStraightExtension,
      minimumBendDiameterFactor,
      minimumBendDiameter,
      maximumCogBendDiameter,
      transverseRestraintRequired,
      transverseBarMinimumDiameter,
      transverseBarExtensionEachSide,
      basisApplied: benchmarkAvailable ? (actualStressApplied ? "actual-stress" : "full-yield") : null,
      asBenchmarkRaw,
      asBenchmarkAdopted,
      issues
    };
  }

  globalScope.reoLapping = Object.freeze({
    bars: reoBars,
    barByDesignation,
    arrangementK,
    calculateLap,
    calculateDevelopment,
    calculateAnchorageComparison
  });
})(typeof globalThis !== "undefined" ? globalThis : window);
