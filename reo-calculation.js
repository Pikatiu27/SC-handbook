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
    { designation: "N50", diameter: 50, area: 1960, standardMass: 15.4, supplierMass: 16.02, metresPerTonne: 64, availability: "2021 guide only; current page omits" }
  ]);

  function clamp(number, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, number));
  }

  function barByDesignation(designation) {
    return reoBars.find(bar => bar.designation === designation) || null;
  }

  function arrangementK(arrangement, nf, nbs) {
    if (arrangement === "circular" || arrangement === "slab-fitments") return 0.10;
    if (arrangement === "beam") return 0.075;
    if (arrangement === "slab-no-fitments") return 0.05;
    if (arrangement === "rectangular" || arrangement === "custom") {
      return Math.min(0.05 * (1 + Math.max(0, nf) / Math.max(1, nbs)), 0.10);
    }
    return 0;
  }

  function calculateLap(bar, options) {
    if (!bar || !Number.isFinite(bar.diameter) || !Number.isFinite(bar.area)) {
      return { eligible: false, issues: ["Select a supported 500N reinforcing bar designation."], bar: bar || null };
    }
    const fsy = 500;
    const db = bar.diameter;
    const issues = [];
    if (options.memberRole === "tension-tie") issues.push("Tension-tie splices must be welded or mechanical under AS 3600 Cl. 13.2.1.");
    if (db > 40) issues.push("Lapped splices are not permitted for bars larger than 40 mm under AS 3600 Cl. 13.2.1.");
    if (!Number.isFinite(options.fc) || options.fc < 20) issues.push("Enter a concrete strength of at least 20 MPa for this quick check.");
    if (!Number.isFinite(options.cover) || options.cover <= 0) issues.push("Concrete cover c must be greater than zero.");
    if (!Number.isFinite(options.clearSpacing) || options.clearSpacing <= 0) issues.push("Clear bar spacing a must be greater than zero.");
    if (options.memberType === "narrow" && options.lapType === "noncontact" && (!Number.isFinite(options.barGap) || options.barGap < 0)) issues.push("Non-contact gap sb cannot be negative.");
    if (options.method === "refined" && (!Number.isFinite(options.nf) || options.nf < 0)) issues.push("Refined-method input nf must be zero or greater.");
    if (options.method === "refined" && (!Number.isFinite(options.nbs) || options.nbs < 1)) issues.push("Refined-method input nbs must be at least one.");
    if (options.method === "refined" && (!Number.isFinite(options.atrTotal) || options.atrTotal < 0)) issues.push("Refined-method transverse reinforcement area must be zero or greater.");
    if (options.method === "refined" && (!Number.isFinite(options.pressure) || options.pressure < 0)) issues.push("Refined-method transverse pressure must be zero or greater.");
    if (issues.length) return { eligible: false, issues, bar };

    const fcUsed = Math.min(options.fc, 65);
    const k1 = options.castingPosition === "top" ? 1.3 : 1.0;
    const k2 = (132 - db) / 100;
    const cd = Math.min(options.clearSpacing / 2, options.cover);
    const k3Unbounded = 1 - 0.15 * (cd - db) / db;
    const k3 = clamp(k3Unbounded, 0.7, 1.0);
    const conditionFactors = { standard: 1, epoxy: 1.5, lightweight: 1.3, both: 1.95 };
    const conditionFactor = conditionFactors[options.materialCondition] || 1;
    const basicFormula = 0.5 * k1 * k3 * fsy * db / (k2 * Math.sqrt(fcUsed));
    const basicModified = basicFormula * conditionFactor;

    const K = arrangementK(options.refinedArrangement, options.nf, options.nbs);
    const atrMin = options.atrMinBasis === "beam-column" ? 0.25 * bar.area : 0;
    const lambda = Math.max((Math.max(0, options.atrTotal) - atrMin) / bar.area, 0);
    const k4Raw = 1 - K * lambda;
    const k4 = clamp(k4Raw, 0.7, 1.0);
    const k5Raw = 1 - 0.04 * Math.max(0, options.pressure);
    const k5 = clamp(k5Raw, 0.7, 1.0);
    const requestedRefinedFactor = options.method === "refined" ? k4 * k5 : 1;
    const combinedMinimumFactor = options.method === "refined" ? 0.7 / k3 : 1;
    const refinedFactor = options.method === "refined" ? Math.max(requestedRefinedFactor, combinedMinimumFactor) : 1;
    const combinedFactorLimited = options.method === "refined" && refinedFactor > requestedRefinedFactor + 1e-9;
    const developmentLength = basicModified * refinedFactor;

    const qualifiedK7 = options.k7Basis === "qualified" && options.doubleArea && options.halfSpliced;
    const k7 = qualifiedK7 ? 1.0 : 1.25;
    const lapLowerLimit = 0.058 * fsy * k1 * db;
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
    const staggerGuideRaw = 0.3 * rawLength;
    const staggerGuideAdopted = Math.ceil(staggerGuideRaw / 10) * 10;
    const staggerApplicable = options.k7Basis === "qualified" && options.halfSpliced;
    const notices = [];
    if (options.fc > 65) notices.push("f'c exceeds 65 MPa; 65 MPa is used in the development-length expression.");
    if (options.k7Basis === "qualified" && !qualifiedK7) notices.push("Both reduced-k7 confirmations are required; k7 = 1.25 has been applied.");
    if (options.memberType === "narrow" && gapEntered <= 3 * db) notices.push(`sb = ${gapEntered.toFixed(1)} mm <= 3db = ${(3 * db).toFixed(1)} mm; sb is taken as zero in the narrow-member candidate.`);
    if (combinedFactorLimited) notices.push("The requested refined reduction was limited to maintain k3 k4 k5 >= 0.7.");
    if (options.refinedArrangement === "none" && options.method === "refined") notices.push("No effective transverse reinforcement is credited; K = 0.");
    return {
      eligible: true, bar, fsy, fcUsed, k1, k2, cd, k3Unbounded, k3, conditionFactor,
      basicFormula, basicModified, K, atrMin, lambda, k4Raw, k4, k5Raw, k5,
      requestedRefinedFactor, refinedFactor, combinedFactorLimited, developmentLength,
      qualifiedK7, k7, lapLowerLimit, k7Candidate, gapEntered, gapUsed, narrowCandidate,
      candidates, governing, rawLength, adoptedLength, ratio: adoptedLength / db,
      staggerGuideRaw, staggerGuideAdopted, staggerApplicable, notices
    };
  }

  function compareProvided(result, providedLength) {
    if (!result?.eligible) return { available: false, status: "NOT AVAILABLE", ratio: null, meets: false, shortfall: null };
    if (!Number.isFinite(providedLength) || providedLength <= 0) return { available: true, status: "NO LENGTH ENTERED", ratio: null, meets: false, shortfall: null };
    const ratio = providedLength / result.adoptedLength;
    const meets = providedLength >= result.adoptedLength;
    return {
      available: true,
      status: meets ? "MEETS LENGTH" : "SHORT",
      ratio,
      meets,
      shortfall: meets ? 0 : result.adoptedLength - providedLength
    };
  }

  globalScope.reoLapping = Object.freeze({
    bars: reoBars,
    barByDesignation,
    arrangementK,
    calculateLap,
    compareProvided
  });
})(typeof globalThis !== "undefined" ? globalThis : window);
