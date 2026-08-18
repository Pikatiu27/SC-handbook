"use strict";

(function initBoltCapacity(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BoltCapacity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createBoltCapacity() {
  const positive = (value, name) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new RangeError(`${name} must be positive.`);
    return number;
  };

  const nonNegativeInteger = (value, name) => {
    const number = Number(value);
    if (!Number.isInteger(number) || number < 0) throw new RangeError(`${name} must be a non-negative integer.`);
    return number;
  };

  const bounded = (value, name, minimum, maximum) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number < minimum || number > maximum) {
      throw new RangeError(`${name} must be between ${minimum} and ${maximum}.`);
    }
    return number;
  };

  function ultimateStrength({ grade, diameter, tableStrength }) {
    const d = positive(diameter, "diameter");
    const sourceStrength = positive(tableStrength, "tableStrength");
    return String(grade) === "8.8" && d < 16 ? 800 : sourceStrength;
  }

  function reducedDuctilityFactor({ grade, threadPlanes }) {
    const nThread = nonNegativeInteger(threadPlanes, "threadPlanes");
    return String(grade) === "10.9" && nThread > 0 ? 0.83 : 1;
  }

  function designTension({ As, fuf, phi = 0.8 }) {
    return bounded(phi, "phi", 0.01, 1) * positive(As, "As") * positive(fuf, "fuf") / 1000;
  }

  function designShear({
    grade,
    fuf,
    kr = 1,
    threadPlanes = 0,
    shankPlanes = 0,
    Ac,
    Ao,
    phi = 0.8
  }) {
    const nThread = nonNegativeInteger(threadPlanes, "threadPlanes");
    const nShank = nonNegativeInteger(shankPlanes, "shankPlanes");
    if (nThread + nShank === 0) return Object.freeze({ design: 0, krd: 1 });
    const krd = reducedDuctilityFactor({ grade, threadPlanes: nThread });
    const area = nThread * positive(Ac, "Ac") + nShank * positive(Ao, "Ao");
    const design = bounded(phi, "phi", 0.01, 1) * 0.62 * positive(fuf, "fuf")
      * krd * bounded(kr, "kr", 0.75, 1) * area / 1000;
    return Object.freeze({ design, krd });
  }

  function designPlyBearing({ diameter, thickness, tensileStrength, effectiveEdge, phi = 0.9 }) {
    const factor = bounded(phi, "phi", 0.01, 1);
    const d = positive(diameter, "diameter");
    const t = positive(thickness, "thickness");
    const fu = positive(tensileStrength, "tensileStrength");
    const ae = positive(effectiveEdge, "effectiveEdge");
    const full = factor * 3.2 * d * t * fu / 1000;
    const edge = factor * ae * t * fu / 1000;
    return Object.freeze({ full, edge, local: Math.min(full, edge) });
  }

  function pitchLimits({ diameter, thinnerPlyThickness }) {
    const d = positive(diameter, "diameter");
    const t = positive(thinnerPlyThickness, "thinnerPlyThickness");
    return Object.freeze({ minimum: 2.5 * d, maximum: Math.min(15 * t, 200) });
  }

  function minimumEdgeDistance({ diameter, edgeFactor }) {
    const d = positive(diameter, "diameter");
    const factor = Number(edgeFactor);
    if (![1.75, 1.5, 1.25].includes(factor)) {
      throw new RangeError("edgeFactor must be an AS 4100 Table 9.5.2 value.");
    }
    return Object.freeze({ factor, minimum: factor * d });
  }

  function designSlipResistance({ slipFactor, interfaces, preload, holeFactor, phi = 0.7 }) {
    const nei = nonNegativeInteger(interfaces, "interfaces");
    if (nei < 1) throw new RangeError("interfaces must be at least 1.");
    const mu = positive(slipFactor, "slipFactor");
    if (mu > 1) throw new RangeError("slipFactor must not exceed 1.");
    return bounded(phi, "phi", 0.01, 1)
      * mu
      * nei
      * positive(preload, "preload")
      * bounded(holeFactor, "holeFactor", 0.7, 1);
  }

  function slipInteraction({ shearAction, shearCapacity, tensionAction, tensionCapacity }) {
    const shear = Math.max(0, Number(shearAction) || 0);
    const tension = Math.max(0, Number(tensionAction) || 0);
    return shear / positive(shearCapacity, "shearCapacity")
      + tension / positive(tensionCapacity, "tensionCapacity");
  }

  function formatDrawingCallout({ size, grade, connectionCategory, plane }) {
    const boltSize = String(size).trim();
    const propertyClass = String(grade).trim();
    const category = String(connectionCategory).trim();
    const shearPlane = String(plane).toUpperCase();
    if (!boltSize || !propertyClass || !category) throw new RangeError("Drawing callout fields are required.");
    if (shearPlane !== "N" && shearPlane !== "X") throw new RangeError("plane must be N or X.");
    return shearPlane === "X"
      ? `${boltSize} ${propertyClass} X/${category}`
      : `${boltSize} ${propertyClass}/${category}`;
  }

  return Object.freeze({
    ultimateStrength,
    reducedDuctilityFactor,
    designTension,
    designShear,
    designPlyBearing,
    pitchLimits,
    minimumEdgeDistance,
    designSlipResistance,
    slipInteraction,
    formatDrawingCallout
  });
});
