(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MemberCapacity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const PHI = 0.9;

  function finite(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number)) throw new RangeError(`${name} must be finite.`);
    return number;
  }

  function positive(value, name) {
    const number = finite(value, name);
    if (number <= 0) throw new RangeError(`${name} must be greater than zero.`);
    return number;
  }

  function bounded(value, name, minimum, maximum) {
    const number = finite(value, name);
    if (number < minimum || number > maximum) {
      throw new RangeError(`${name} must be between ${minimum} and ${maximum}.`);
    }
    return number;
  }

  function nonNegative(value, name) {
    const number = finite(value, name);
    if (number < 0) throw new RangeError(`${name} must not be negative.`);
    return number;
  }

  function catalogueCompressionDefaults({
    family,
    catalogueKf,
    flangeThickness,
    dimensionOverride = false
  }) {
    const sectionFamily = String(family || "").toLowerCase();
    const supported = ["ub", "uc", "chs", "rhs", "shs", "ea", "pfc", "rod"];
    if (!supported.includes(sectionFamily)) throw new RangeError("A supported catalogue member family is required.");

    const idealCircularOverride = dimensionOverride && (sectionFamily === "chs" || sectionFamily === "rod");
    const kf = idealCircularOverride
      ? 1
      : bounded(catalogueKf, "Catalogue form factor k_f", Number.EPSILON, 1);

    let alphaB;
    if (["chs", "rhs", "shs"].includes(sectionFamily)) {
      alphaB = -0.5;
    } else if (sectionFamily === "ub" || sectionFamily === "uc") {
      const tf = positive(flangeThickness, "Universal-section flange thickness");
      alphaB = tf > 40 ? 1 : 0;
    } else {
      alphaB = kf < 1 ? 1 : 0.5;
    }

    return Object.freeze({ kf, alphaB });
  }

  function straightLineNetArea({ grossArea, holeCount, holeDiameter, thickness, maximumHoleCount = 20 }) {
    const Ag = positive(grossArea, "Gross area A_g");
    const holes = nonNegative(holeCount, "Hole count n_h");
    if (!Number.isInteger(holes)) throw new RangeError("Hole count n_h must be a whole number.");
    const maximum = positive(maximumHoleCount, "Maximum hole count");
    if (!Number.isInteger(maximum)) throw new RangeError("Maximum hole count must be a whole number.");
    if (holes > maximum) throw new RangeError(`Hole count n_h must not exceed ${maximum}.`);

    const diameter = nonNegative(holeDiameter, "Hole diameter d_h");
    if (holes > 0 && diameter <= 0) throw new RangeError("Hole diameter d_h must be greater than zero when holes are present.");
    const netPathThickness = positive(thickness, "Net-path thickness t");
    const holeDeduction = holes * diameter * netPathThickness;
    const netArea = Ag - holeDeduction;
    if (netArea <= 0) throw new RangeError("Straight-line hole deduction must leave a positive net area A_n.");

    return Object.freeze({
      grossArea: Ag,
      holeCount: holes,
      holeDiameter: diameter,
      thickness: netPathThickness,
      holeDeduction,
      netArea
    });
  }

  function compressionReduction(lambdaN, alphaB) {
    const slenderness = nonNegative(lambdaN, "Modified section slenderness");
    const sectionConstant = bounded(alphaB, "Section constant alpha_b", -1, 1);
    if (slenderness === 0) {
      return Object.freeze({ alphaC: 1, alphaA: 0, modifiedLambda: 0, eta: 0, xi: 1 });
    }

    const alphaA = 2100 * (slenderness - 13.5) / (slenderness ** 2 - 15.3 * slenderness + 2050);
    const modifiedLambda = slenderness + alphaA * sectionConstant;
    if (modifiedLambda <= 0) {
      throw new RangeError("Modified member slenderness lambda must be greater than zero for the adopted compression curve.");
    }
    const eta = Math.max(0, 0.00326 * (modifiedLambda - 13.5));
    const ratio = modifiedLambda / 90;
    const xi = (ratio ** 2 + 1 + eta) / (2 * ratio ** 2);
    const rootTerm = Math.max(0, 1 - (90 / (xi * modifiedLambda)) ** 2);
    const alphaC = Math.min(1, Math.max(0, xi * (1 - Math.sqrt(rootTerm))));
    return Object.freeze({ alphaC, alphaA, modifiedLambda, eta, xi });
  }

  function calculate({
    grossArea,
    netArea,
    fy,
    fu,
    kf,
    kt,
    axes,
    compressionDemand = 0,
    tensionDemand = 0,
    phi = PHI
  }) {
    const Ag = positive(grossArea, "Gross area A_g");
    const An = positive(netArea, "Net area A_n");
    if (An > Ag) throw new RangeError("Net area A_n must not exceed gross area A_g.");
    const yieldStress = positive(fy, "Yield stress f_y");
    const tensileStrength = positive(fu, "Tensile strength f_u");
    if (tensileStrength < yieldStress) throw new RangeError("Tensile strength f_u must not be less than yield stress f_y.");
    const formFactor = bounded(kf, "Form factor k_f", Number.EPSILON, 1);
    const tensionFactor = bounded(kt, "Tension correction factor k_t", 0.75, 1);
    const capacityFactor = bounded(phi, "Capacity factor phi", Number.EPSILON, 1);
    const NcDemand = nonNegative(compressionDemand, "Compression design action");
    const NtDemand = nonNegative(tensionDemand, "Tension design action");
    if (!Array.isArray(axes) || axes.length === 0) throw new RangeError("At least one compression axis is required.");

    const sectionCompression = capacityFactor * formFactor * An * yieldStress / 1000;
    const axisResults = axes.map((axis, index) => {
      const radius = positive(axis.radius ?? axis.r, `Axis ${index + 1} radius`);
      const effectiveLength = positive(axis.effectiveLength, `Axis ${index + 1} effective length`);
      const alphaB = bounded(axis.alphaB, `Axis ${index + 1} alpha_b`, -1, 1);
      const leOverR = effectiveLength / radius;
      const lambdaN = leOverR * Math.sqrt(formFactor) * Math.sqrt(yieldStress / 250);
      const reduction = compressionReduction(lambdaN, alphaB);
      return Object.freeze({
        ...axis,
        r: radius,
        radius,
        effectiveLength,
        alphaB,
        leOverR,
        lambdaN,
        ...reduction,
        memberCompression: reduction.alphaC * sectionCompression
      });
    });
    const governingAxis = axisResults.reduce((lowest, axis) => (
      axis.memberCompression < lowest.memberCompression ? axis : lowest
    ), axisResults[0]);

    const grossYield = capacityFactor * Ag * yieldStress / 1000;
    const netFracture = capacityFactor * 0.85 * tensionFactor * An * tensileStrength / 1000;
    const tensionCapacity = Math.min(grossYield, netFracture);
    const tensionGoverning = grossYield <= netFracture ? "Gross-section yielding" : "Net-section fracture";
    const hasCompressionDemand = NcDemand > 0;
    const hasTensionDemand = NtDemand > 0;
    const compressionDemandRatio = hasCompressionDemand ? NcDemand / governingAxis.memberCompression : 0;
    const tensionDemandRatio = hasTensionDemand ? NtDemand / tensionCapacity : 0;
    const governingDemandRatio = Math.max(compressionDemandRatio, tensionDemandRatio);

    return Object.freeze({
      sectionCompression,
      axisResults: Object.freeze(axisResults),
      governingAxis,
      memberCompression: governingAxis.memberCompression,
      grossYield,
      netFracture,
      tensionCapacity,
      tensionGoverning,
      demand: Object.freeze({
        compression: NcDemand,
        tension: NtDemand,
        hasCompression: hasCompressionDemand,
        hasTension: hasTensionDemand,
        hasAny: hasCompressionDemand || hasTensionDemand,
        compressionRatio: compressionDemandRatio,
        tensionRatio: tensionDemandRatio,
        governingRatio: governingDemandRatio
      })
    });
  }

  return Object.freeze({ PHI, catalogueCompressionDefaults, straightLineNetArea, compressionReduction, calculate });
});
