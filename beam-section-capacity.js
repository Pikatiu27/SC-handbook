(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BeamSectionCapacity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const PHI = 0.9;
  const positive = (value, name) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new RangeError(`${name} must be greater than zero.`);
    return number;
  };

  function solidCircle(diameter) {
    const D = positive(diameter, "Diameter");
    const Z = Math.PI * D ** 3 / 32;
    const S = D ** 3 / 6;
    return Object.freeze({ Z, S, Ze: Math.min(S, 1.5 * Z) });
  }

  function sectionMoment(fy, Ze, phi = PHI) {
    return positive(phi, "Capacity factor") * positive(fy, "Yield stress") * positive(Ze, "Effective section modulus") / 1e6;
  }

  function rolledWebShear(fy, Aw, alphaV = 1, phi = PHI) {
    return positive(phi, "Capacity factor") * positive(alphaV, "Web shear reduction") * 0.6 * positive(fy, "Web yield stress") * positive(Aw, "Web area") / 1000;
  }

  function unstiffenedWebShearReduction(clearWebDepth, webThickness, webYieldStress, threshold = 82) {
    const dp = positive(clearWebDepth, "Clear web depth");
    const tw = positive(webThickness, "Web thickness");
    const fyw = positive(webYieldStress, "Web yield stress");
    const limit = positive(threshold, "Web slenderness limit");
    const slenderness = dp / tw * Math.sqrt(fyw / 250);
    const alphaV = slenderness <= limit ? 1 : Math.min(1, (limit / slenderness) ** 2);
    return Object.freeze({ slenderness, threshold: limit, alphaV });
  }

  function circularHollowShear(fy, Ae, phi = PHI) {
    return positive(phi, "Capacity factor") * 0.36 * positive(fy, "Yield stress") * positive(Ae, "Effective shear area") / 1000;
  }

  function rectangularHollowShear(fy, depth, width, thickness, direction = "x", phi = PHI) {
    const yieldStress = positive(fy, "Yield stress");
    const d = positive(depth, "Outside depth");
    const b = positive(width, "Outside width");
    const t = positive(thickness, "Wall thickness");
    if (2 * t >= Math.min(d, b)) throw new RangeError("Wall thickness must be less than half the smaller outside dimension.");
    if (direction !== "x" && direction !== "y") throw new RangeError("Shear direction must match x-axis or y-axis bending.");

    const orientedDepth = direction === "x" ? d : b;
    const orientedWidth = direction === "x" ? b : d;
    const clearWebDepth = orientedDepth - 2 * t;
    const webArea = 2 * clearWebDepth * t;
    const reduction = unstiffenedWebShearReduction(clearWebDepth, t, yieldStress);
    const shearYieldCapacity = reduction.alphaV * 0.6 * yieldStress * webArea;
    const stressRatio = 3 * (2 * orientedWidth + orientedDepth) / (2 * (3 * orientedWidth + orientedDepth));
    const nonUniformCapacity = 2 * shearYieldCapacity / (0.9 + stressRatio);
    const nominalCapacity = Math.min(shearYieldCapacity, nonUniformCapacity);

    return Object.freeze({
      direction,
      clearWebDepth,
      webArea,
      slenderness: reduction.slenderness,
      threshold: reduction.threshold,
      alphaV: reduction.alphaV,
      stressRatio,
      shearYieldCapacity: shearYieldCapacity / 1000,
      nonUniformCapacity: nonUniformCapacity / 1000,
      nominalCapacity: nominalCapacity / 1000,
      designCapacity: positive(phi, "Capacity factor") * nominalCapacity / 1000,
      nonUniformGoverns: nonUniformCapacity < shearYieldCapacity
    });
  }

  function momentShearInteraction(momentDemand, designMomentCapacity, designShearCapacity) {
    const M = Math.max(0, Number(momentDemand) || 0);
    const phiMs = positive(designMomentCapacity, "Design moment capacity");
    const phiVv = positive(designShearCapacity, "Design shear capacity");
    const momentRatio = M / phiMs;
    const factor = momentRatio <= 0.75 ? 1 : momentRatio <= 1 ? 2.2 - 1.6 * momentRatio : 0;
    return Object.freeze({ momentRatio, factor, designShearCapacity: phiVv * factor, withinMomentRange: momentRatio <= 1 });
  }

  function momentShearDemandCheck(momentDemand, designMomentCapacity, shearDemand, designShearCapacity) {
    const M = Math.max(0, Number(momentDemand) || 0);
    const V = Math.max(0, Number(shearDemand) || 0);
    const interaction = momentShearInteraction(M, designMomentCapacity, designShearCapacity);
    if (!interaction.withinMomentRange) {
      return Object.freeze({
        interaction,
        momentRatio: interaction.momentRatio,
        shearRatio: NaN,
        utilisation: interaction.momentRatio,
        failed: true,
        failureMode: "moment"
      });
    }
    const shearRatio = interaction.designShearCapacity > 0 ? V / interaction.designShearCapacity : V > 0 ? Infinity : 0;
    const utilisation = Math.max(interaction.momentRatio, shearRatio);
    return Object.freeze({
      interaction,
      momentRatio: interaction.momentRatio,
      shearRatio,
      utilisation,
      failed: utilisation > 1,
      failureMode: utilisation > 1 ? (shearRatio > interaction.momentRatio ? "shear" : "moment") : ""
    });
  }

  return Object.freeze({
    PHI,
    solidCircle,
    sectionMoment,
    rolledWebShear,
    unstiffenedWebShearReduction,
    circularHollowShear,
    rectangularHollowShear,
    momentShearInteraction,
    momentShearDemandCheck
  });
});
