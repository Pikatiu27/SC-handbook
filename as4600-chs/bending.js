"use strict";

// AS/NZS 4600:2018 Cl. 3.6.1 and 3.6.2; Table 1.6.3 and Table 1.4.
// The licensed Standard is held in the private Reference library, not bundled here.
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.As4600ChsBending = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const E_MPA = 200000;
  const PHI_B = 0.95;
  const MAX_BASE_THICKNESS_MM = 25;

  function validNumber(value) {
    if (value === null || value === undefined || String(value).trim() === "") return NaN;
    return Number(value);
  }

  // Compare the entered decimal-number products directly. Computing D/t and
  // E/fy separately can cross an exact clause boundary through binary rounding
  // (e.g. D352.8, t1.4, fy350 at the 0.441E limit). No epsilon expands scope.
  function decimalProduct(values) {
    return values.reduce((product, value) => {
      const [mantissa, power = "0"] = String(value).toLowerCase().split("e");
      const [whole, fraction = ""] = mantissa.split(".");
      return {
        integer: product.integer * BigInt(whole + fraction),
        exponent: product.exponent + Number(power) - fraction.length
      };
    }, { integer: 1n, exponent: 0 });
  }

  function withinRatioLimit(D, t, fy, coefficient) {
    const left = decimalProduct([D, fy]);
    const right = decimalProduct([coefficient, E_MPA, t]);
    const exponent = Math.min(left.exponent, right.exponent);
    return left.integer * 10n ** BigInt(left.exponent - exponent)
      <= right.integer * 10n ** BigInt(right.exponent - exponent);
  }

  function calculate(input) {
    const D = validNumber(input?.diameterMm);
    const t = validNumber(input?.thicknessMm);
    const fy = validNumber(input?.yieldStressMpa);
    const issues = [];
    if (!Number.isFinite(D) || D <= 0) issues.push("Enter a positive outside diameter D.");
    if (!Number.isFinite(t) || t <= 0) issues.push("Enter a positive base steel wall thickness t.");
    if (!Number.isFinite(fy) || fy <= 0) issues.push("Enter a positive, product-confirmed yield stress fy.");
    if (issues.length) return { status: "Invalid input", issues };
    if (t > MAX_BASE_THICKNESS_MM) {
      return { status: "Not evaluated", issues: ["AS/NZS 4600:2018 Cl. 1.1 is limited to base steel thickness not more than 25 mm."] };
    }
    if (D <= 2 * t) {
      return { status: "Invalid input", issues: ["For an ideal circular hollow section, D must exceed 2t."] };
    }

    const ratio = D / t;
    const eFy = E_MPA / fy;
    if (!Number.isFinite(eFy)) {
      return { status: "Invalid input", issues: ["The entered yield stress is outside a calculable numeric range."] };
    }
    const limits = { compact: 0.0714 * eFy, intermediate: 0.318 * eFy, applicability: 0.441 * eFy };
    if (!withinRatioLimit(D, t, fy, 0.441)) {
      return {
        status: "Not evaluated",
        issues: ["D/t exceeds the AS/NZS 4600:2018 Cl. 3.6.1 cylindrical-tube limit."],
        ratio,
        limits
      };
    }

    const insideDiameterMm = D - 2 * t;
    // Algebraically equivalent to π(D⁴ − d⁴)/64, with less cancellation for thin walls.
    const momentOfInertiaMm4 = Math.PI * (4 * t * (D - t)) * (D ** 2 + insideDiameterMm ** 2) / 64;
    const sectionModulusMm3 = 2 * momentOfInertiaMm4 / D;
    let branch;
    let nominalStressMpa;
    if (withinRatioLimit(D, t, fy, 0.0714)) {
      branch = "3.6.2(1)";
      nominalStressMpa = 1.25 * fy;
    } else if (withinRatioLimit(D, t, fy, 0.318)) {
      branch = "3.6.2(2)";
      nominalStressMpa = (0.970 + 0.020 * eFy / ratio) * fy;
    } else {
      branch = "3.6.2(3)";
      nominalStressMpa = 0.328 * E_MPA / ratio;
    }
    const nominalMomentKNm = nominalStressMpa * sectionModulusMm3 / 1e6;
    const designMomentKNm = PHI_B * nominalMomentKNm;
    if (![sectionModulusMm3, nominalMomentKNm, designMomentKNm].every(Number.isFinite)) {
      return { status: "Invalid input", issues: ["The entered values produce a non-finite result. Check the inputs."] };
    }
    return {
      status: "Calculated",
      diameterMm: D,
      thicknessMm: t,
      yieldStressMpa: fy,
      elasticModulusMpa: E_MPA,
      phiB: PHI_B,
      insideDiameterMm,
      momentOfInertiaMm4,
      sectionModulusMm3,
      ratio,
      limits,
      branch,
      nominalStressMpa,
      nominalMomentKNm,
      designMomentKNm,
      sourceStatus: "For Review"
    };
  }

  return Object.freeze({ calculate, E_MPA, PHI_B, MAX_BASE_THICKNESS_MM });
});
