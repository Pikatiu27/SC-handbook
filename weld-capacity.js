"use strict";

(function initWeldCapacity(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.WeldCapacity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createWeldCapacity() {
  function positive(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new RangeError(`${name} must be positive.`);
    return number;
  }

  function nonNegative(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) throw new RangeError(`${name} must be non-negative.`);
    return number;
  }

  function positiveInteger(value, name) {
    const number = positive(value, name);
    if (!Number.isInteger(number)) throw new RangeError(`${name} must be a positive integer.`);
    return number;
  }

  function lapReduction(lengthMm) {
    const lengthM = nonNegative(lengthMm, "lengthMm") / 1000;
    if (lengthM <= 1.7) return 1;
    if (lengthM <= 8) return 1.10 - 0.06 * lengthM;
    return 0.62;
  }

  function capacityFactor(type, category) {
    if (category === "GP") return 0.6;
    return type === "cpbw" ? 0.9 : 0.8;
  }

  function designThroat(type, size, effectiveThroat) {
    if (type === "fillet") return 0.707 * positive(size, "size");
    if (type === "ipbw") return positive(effectiveThroat, "effectiveThroat");
    return NaN;
  }

  function parentMetalScreen({ fup, thickness, phi = 0.9 }) {
    return positive(phi, "phi") * 0.6 * positive(fup, "fup") * positive(thickness, "thickness") / 1000;
  }

  function calculate({
    type = "fillet",
    category = "SP",
    size,
    effectiveThroat,
    fuw,
    length,
    runs = 1,
    weldedLap = false
  }) {
    const calculationAvailable = type === "fillet" || type === "ipbw";
    if (!calculationAvailable) {
      return Object.freeze({
        calculationAvailable: false,
        throat: NaN,
        phi: capacityFactor(type, category),
        kr: 1,
        capacityPerMm: NaN,
        capacity: NaN
      });
    }

    const effectiveLength = positive(length, "length");
    const lineCount = positiveInteger(runs, "runs");
    if (type === "fillet" && effectiveLength < 4 * positive(size, "size")) {
      throw new RangeError("fillet weld effective length must be at least 4 times the weld size.");
    }
    const throat = designThroat(type, size, effectiveThroat);
    const phi = capacityFactor(type, category);
    const kr = weldedLap && type === "fillet" ? lapReduction(effectiveLength) : 1;
    const capacityPerMm = phi * 0.6 * positive(fuw, "fuw") * throat * kr / 1000;

    return Object.freeze({
      calculationAvailable: true,
      throat,
      phi,
      kr,
      capacityPerMm,
      capacity: capacityPerMm * effectiveLength * lineCount
    });
  }

  return Object.freeze({
    lapReduction,
    capacityFactor,
    designThroat,
    parentMetalScreen,
    calculate
  });
});
