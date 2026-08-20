"use strict";

(function initConcreteSectionCalculation(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ConcreteSectionCalculation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createConcreteSectionCalculation() {
  function stressBlockFactors(fc) {
    const fcValue = Number(fc);
    if (!Number.isFinite(fcValue) || fcValue < 20 || fcValue > 120) {
      throw new RangeError("Concrete strength must be between 20 MPa and 120 MPa");
    }
    return Object.freeze({
      alpha2: Math.max(0.67, 0.85 - 0.0015 * fcValue),
      gamma: Math.max(0.67, 0.97 - 0.0025 * fcValue)
    });
  }

  function forcesAtNeutralAxis(x, data) {
    const blockDepth = Math.min(data.depth, data.gamma * x);
    const cc = data.alpha2 * data.fc * data.width * blockDepth;
    const yCc = data.direction === "top" ? blockDepth / 2 : data.depth - blockDepth / 2;
    const layers = data.layers.map(layer => {
      const strain = data.ecu * (x - layer.d) / x;
      const stress = Math.max(-layer.fsy, Math.min(layer.fsy, layer.es * strain));
      const displacedConcreteStress = layer.d <= blockDepth ? data.alpha2 * data.fc : 0;
      const netStress = stress - displacedConcreteStress;
      const force = layer.area * netStress;
      return { ...layer, strain, stress, netStress, displacedConcreteStress, force };
    });
    const axial = cc + layers.reduce((sum, layer) => sum + layer.force, 0);
    return { cc, yCc, blockDepth, layers, axial };
  }

  function solveSection(data) {
    const forceAt = x => forcesAtNeutralAxis(x, data).axial;
    let low = 0.5;
    let high = data.depth * 4;
    let fLow = forceAt(low);
    let fHigh = forceAt(high);
    let expanded = 0;
    while (fLow * fHigh > 0 && expanded < 10) {
      high *= 1.8;
      fHigh = forceAt(high);
      expanded += 1;
    }
    if (fLow * fHigh > 0) {
      return { ok: false, message: "No neutral axis solution found for active layers" };
    }
    for (let index = 0; index < 90; index += 1) {
      const mid = (low + high) / 2;
      const fMid = forceAt(mid);
      if (Math.abs(fMid) < 0.5) {
        low = mid;
        high = mid;
        break;
      }
      if (fLow * fMid <= 0) {
        high = mid;
        fHigh = fMid;
      } else {
        low = mid;
        fLow = fMid;
      }
    }
    const x = (low + high) / 2;
    const state = forcesAtNeutralAxis(x, data);
    const momentNmm = state.cc * state.yCc + state.layers.reduce((sum, layer) => sum + layer.force * layer.yTop, 0);
    const muo = Math.abs(momentNmm) / 1e6;
    const extremeTensionLayer = state.layers
      .filter(layer => layer.strain < -0.00005)
      .reduce((current, layer) => !current || layer.d > current.d ? layer : current, null);
    const d0 = extremeTensionLayer ? extremeTensionLayer.d : Math.max(...state.layers.map(layer => layer.d));
    const kuo = d0 > 0 ? x / d0 : 0;
    const hasLegacyReinforcement = state.layers.some(layer => layer.legacy);
    const phi = hasLegacyReinforcement ? 0.65 : Math.max(0.65, Math.min(0.85, 1.24 - 13 * kuo / 12));
    return { ok: true, x, d0, kuo, phi, muo, phiMuo: phi * muo, ...state };
  }

  function oneWayShear(data) {
    const depth = Number(data.depth);
    const width = Number(data.width);
    const fc = Number(data.fc);
    const d0 = Number(data.d0);
    if (![depth, width, fc, d0].every(Number.isFinite) || depth <= 0 || width <= 0 || fc <= 0 || d0 <= 0) {
      throw new RangeError("Concrete shear dimensions and strengths must be positive finite values");
    }
    if (!Array.isArray(data.layers)) throw new TypeError("Concrete shear layers must be an array");

    const reinforcement = data.shearReinforcement || {};
    const shearReoMode = reinforcement.mode === "vertical" ? "vertical" : "none";
    const shearBarArea = Math.max(0, Number(reinforcement.barArea) || 0);
    const nsv = Math.max(0, Number(reinforcement.legs) || 0);
    const sv = Math.max(1, Number(reinforcement.spacing) || 1);
    const fsyf = Math.max(1, Math.min(600, Number(reinforcement.yieldStress) || 1));
    const tensionLayers = data.layers.filter(layer =>
      Number(layer.d) >= depth / 2 && Number(layer.strain) < -0.00005 && Number(layer.area) > 0
    );
    const centroidArea = tensionLayers.reduce((sum, layer) => sum + Number(layer.area), 0);
    const dNumerator = tensionLayers.reduce((sum, layer) => sum + Number(layer.area) * Number(layer.d), 0);
    const d = centroidArea > 0 ? dNumerator / centroidArea : d0;
    const dv = Math.max(0.72 * depth, 0.9 * d);
    const bv = width;
    const asv = nsv * shearBarArea;
    const asvPerS = shearReoMode === "vertical" ? asv / sv : 0;
    const asvMinPerS = 0.08 * Math.sqrt(fc) * bv / fsyf;
    const hasShearReo = shearReoMode === "vertical" && asv > 0 && sv > 0;
    const minShearReoProvided = hasShearReo && asvPerS >= asvMinPerS;
    const theta = 36;
    const cotTheta = 1 / Math.tan(theta * Math.PI / 180);
    const kvNoMinimum = Math.min(0.15, 200 / (1000 + 1.3 * dv));
    const kv = minShearReoProvided ? 0.15 : kvNoMinimum;
    const rootFc = Math.min(Math.sqrt(fc), 8.0);
    const vuc = kv * bv * dv * rootFc / 1000;
    const vus = hasShearReo ? asvPerS * fsyf * dv * cotTheta / 1000 : 0;
    const vuRaw = vuc + vus;
    const vuMax = 0.55 * 0.9 * fc * bv * dv * (cotTheta / (1 + cotTheta ** 2)) / 1000;
    const vu = Math.min(vuRaw, vuMax);
    const webCrushingLimited = vuRaw > vuMax;
    const highStrengthLongitudinalLayers = data.layers.filter(layer => Number(layer.fsy) > 500);
    const scopeFailures = [];
    if (fc > 65) scopeFailures.push(`f'c = ${fc} MPa exceeds 65 MPa`);
    if (hasShearReo && fsyf > 500) scopeFailures.push(`shear reinforcement f_sy.f = ${fsyf} MPa exceeds 500 MPa`);
    if (highStrengthLongitudinalLayers.length) {
      scopeFailures.push(`${highStrengthLongitudinalLayers.map(layer => `mat ${layer.index}`).join(", ")} f_sy exceeds 500 MPa`);
    }
    const withinSimplifiedScope = scopeFailures.length === 0;
    const phi = minShearReoProvided && !webCrushingLimited ? 0.75 : 0.70;

    return Object.freeze({
      tensionLayers: Object.freeze(tensionLayers.slice()),
      d,
      dNumerator,
      centroidArea,
      dv,
      bv,
      kv,
      kvNoMinimum,
      rootFc,
      vuc,
      shearReoMode,
      shearDesignation: reinforcement.designation || "",
      shearBarArea,
      nsv,
      asv,
      sv,
      fsyf,
      asvPerS,
      asvMinPerS,
      hasShearReo,
      minShearReoProvided,
      theta,
      cotTheta,
      vus,
      vuRaw,
      vuMax,
      vu,
      webCrushingLimited,
      withinSimplifiedScope,
      scopeFailures: Object.freeze(scopeFailures),
      phi,
      phiVu: withinSimplifiedScope ? phi * vu : NaN
    });
  }

  return Object.freeze({
    stressBlockFactors,
    forcesAtNeutralAxis,
    solveSection,
    oneWayShear
  });
});
