"use strict";

const assert = require("node:assert/strict");
const ConcreteSectionCalculation = require("../concrete-section-calculation.js");

function close(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual} != ${expected}`);
}

function independentState(input, x) {
  const blockDepth = Math.min(input.depth, input.gamma * x);
  const concreteForce = input.alpha2 * input.fc * input.width * blockDepth;
  const concreteY = input.direction === "top" ? blockDepth / 2 : input.depth - blockDepth / 2;
  const layers = input.layers.map(layer => {
    const strain = input.ecu * (x - layer.d) / x;
    const stress = Math.max(-layer.fsy, Math.min(layer.fsy, layer.es * strain));
    const displacedConcrete = layer.d <= blockDepth ? input.alpha2 * input.fc : 0;
    const force = layer.area * (stress - displacedConcrete);
    return { ...layer, strain, stress, force };
  });
  const axial = concreteForce + layers.reduce((sum, layer) => sum + layer.force, 0);
  const moment = Math.abs(
    concreteForce * concreteY + layers.reduce((sum, layer) => sum + layer.force * layer.yTop, 0)
  ) / 1e6;
  return { axial, blockDepth, concreteForce, concreteY, layers, moment };
}

function independentSolve(input) {
  let low = 0.01;
  let high = input.depth;
  let lowForce = independentState(input, low).axial;
  let highForce = independentState(input, high).axial;
  while (lowForce * highForce > 0 && high < input.depth * 100) {
    high *= 1.5;
    highForce = independentState(input, high).axial;
  }
  assert.ok(lowForce * highForce <= 0, "independent equilibrium root must be bracketed");
  for (let iteration = 0; iteration < 160; iteration += 1) {
    const mid = (low + high) / 2;
    const midForce = independentState(input, mid).axial;
    if (lowForce * midForce <= 0) {
      high = mid;
      highForce = midForce;
    } else {
      low = mid;
      lowForce = midForce;
    }
  }
  const x = (low + high) / 2;
  const state = independentState(input, x);
  const tensionLayers = state.layers.filter(layer => layer.strain < -0.00005);
  const d0 = tensionLayers.length
    ? Math.max(...tensionLayers.map(layer => layer.d))
    : Math.max(...state.layers.map(layer => layer.d));
  const kuo = x / d0;
  const phi = input.layers.some(layer => layer.legacy)
    ? 0.65
    : Math.max(0.65, Math.min(0.85, 1.24 - 13 * kuo / 12));
  return { ...state, x, d0, kuo, phi, muo: state.moment, phiMuo: phi * state.moment };
}

function layer(index, yTop, d, area, legacy = false) {
  return { index, yTop, d, area, fsy: 500, es: 200000, legacy };
}

function concreteCase({ width, depth, fc, direction, layers }) {
  return {
    width,
    depth,
    fc,
    alpha2: Math.max(0.67, 0.85 - 0.0015 * fc),
    gamma: Math.max(0.67, 0.97 - 0.0025 * fc),
    ecu: 0.003,
    direction,
    layers
  };
}

function verify(input, expected, label) {
  const independent = independentSolve(input);
  const production = ConcreteSectionCalculation.solveSection(input);
  assert.equal(production.ok, true, `${label}: production solution`);
  close(independent.axial, 0, 1e-6, `${label}: independent force equilibrium`);
  close(production.axial, 0, 0.5, `${label}: production force equilibrium`);
  ["x", "d0", "kuo", "phi", "muo", "phiMuo"].forEach(key => {
    close(production[key], independent[key], key === "d0" || key === "phi" ? 1e-12 : 5e-4, `${label}: ${key}`);
  });
  close(independent.x, expected.x, 5e-4, `${label}: fixed x`);
  close(independent.muo, expected.muo, 5e-4, `${label}: fixed Muo`);
  close(independent.phiMuo, expected.phiMuo, 5e-4, `${label}: fixed phiMuo`);
  close(independent.phi, expected.phi, 1e-12, `${label}: fixed phi`);
  return { independent, production };
}

const asymmetricTop = concreteCase({
  width: 1000,
  depth: 500,
  fc: 32,
  direction: "top",
  layers: [layer(1, 80, 80, 750), layer(2, 420, 420, 2000)]
});
verify(asymmetricTop, {
  x: 53.52558,
  muo: 408.68567,
  phi: 0.85,
  phiMuo: 347.38282
}, "asymmetric top compression");

const asymmetricBottom = concreteCase({
  width: 1000,
  depth: 500,
  fc: 32,
  direction: "bottom",
  layers: [layer(1, 80, 420, 750), layer(2, 420, 80, 2000)]
});
const bottomResult = verify(asymmetricBottom, {
  x: 49.23913,
  muo: 192.83025,
  phi: 0.85,
  phiMuo: 163.90572
}, "asymmetric bottom compression");

const mirroredTop = concreteCase({
  width: 1000,
  depth: 500,
  fc: 32,
  direction: "top",
  layers: [layer(1, 80, 80, 2000), layer(2, 420, 420, 750)]
});
const mirroredResult = independentSolve(mirroredTop);
close(bottomResult.independent.x, mirroredResult.x, 1e-9, "mirrored neutral axis invariant");
close(bottomResult.independent.muo, mirroredResult.muo, 1e-9, "mirrored moment invariant");

const composite = concreteCase({
  width: 1000,
  depth: 700,
  fc: 40,
  direction: "top",
  layers: [
    layer(1, 70, 70, 700),
    layer(2, 280, 280, 1000),
    layer(3, 420, 420, 1250),
    layer(4, 630, 630, 1500)
  ]
});
verify(composite, {
  x: 68.52948,
  muo: 819.46785,
  phi: 0.85,
  phiMuo: 696.54767
}, "four-layer composite strip");

const lowerPhi = concreteCase({
  width: 300,
  depth: 600,
  fc: 32,
  direction: "top",
  layers: [layer(1, 550, 550, 8000)]
});
const lowerPhiResult = verify(lowerPhi, {
  x: 362.45564,
  muo: 965.41275,
  phi: 0.65,
  phiMuo: 627.51829
}, "lower phi bound");
assert.ok(lowerPhiResult.independent.kuo > 0.36, "lower-bound case must trigger the page ductility warning");

const legacy = concreteCase({
  width: 250,
  depth: 550,
  fc: 32,
  direction: "top",
  layers: [layer(1, 500, 500, 1500, true)]
});
const legacyIndependent = independentSolve(legacy);
const legacyProduction = ConcreteSectionCalculation.solveSection(legacy);
close(legacyIndependent.phi, 0.65, 1e-12, "legacy independent conservative phi");
close(legacyProduction.phi, 0.65, 1e-12, "legacy production conservative phi");
close(legacyProduction.phiMuo, legacyIndependent.phiMuo, 5e-4, "legacy design capacity");

console.log("Concrete flexure independent branch cases passed");
