"use strict";

(function initConcreteSectionCalculation(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ConcreteSectionCalculation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createConcreteSectionCalculation() {
  function stressBlockFactors(fc) {
    const fcLimited = Math.min(120, Math.max(20, Number(fc)));
    return Object.freeze({
      alpha2: Math.max(0.67, 0.85 - 0.0015 * fcLimited),
      gamma: Math.max(0.67, 0.97 - 0.0025 * fcLimited)
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

  return Object.freeze({
    stressBlockFactors,
    forcesAtNeutralAxis,
    solveSection
  });
});
