"use strict";

const assert = require("node:assert/strict");

function approximately(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual} is not within ${tolerance} of ${expected}`);
}

function displayed(value, decimals = 1) {
  return Number(value).toFixed(decimals);
}

// WELD-FILLET-01 and WELD-LAP-KR-01.
// Standalone arithmetic only: no production modules or page functions are imported.
function independentWeldLapKr(lengthMm) {
  const lengthM = lengthMm / 1000;
  if (lengthM <= 1.7) return 1;
  if (lengthM <= 8) return 1.10 - 0.06 * lengthM;
  return 0.62;
}

const weldThroat = 0.707 * 6;
const weldCapacity = 0.8 * 0.6 * 490 * weldThroat * 200 / 1000;
assert.equal(displayed(weldCapacity), "199.5");
assert.equal(independentWeldLapKr(1699), 1);
assert.equal(independentWeldLapKr(1700), 1);
approximately(independentWeldLapKr(1701), 0.99794, 1e-12, "welded-lap branch above 1.7 m");
approximately(independentWeldLapKr(8000), 0.62, 1e-12, "welded-lap 8.0 m boundary");
assert.equal(independentWeldLapKr(8001), 0.62);

// AXIAL-MEMBER-COMP-01 using the visible default CHS source values.
const axialAg = 1117;
const axialR = 39.3;
const axialFy = 350;
const axialLe = 3000;
const axialKf = 1;
const axialAlphaB = -0.5;
const axialLambdaN = axialLe / axialR * Math.sqrt(axialKf) * Math.sqrt(axialFy / 250);
const axialAlphaA = 2100 * (axialLambdaN - 13.5) / (axialLambdaN ** 2 - 15.3 * axialLambdaN + 2050);
const axialLambda = axialLambdaN + axialAlphaA * axialAlphaB;
const axialEta = Math.max(0, 0.00326 * (axialLambda - 13.5));
const axialXi = ((axialLambda / 90) ** 2 + 1 + axialEta) / (2 * (axialLambda / 90) ** 2);
const axialAlphaC = axialXi * (1 - Math.sqrt(1 - (90 / (axialXi * axialLambda)) ** 2));
const axialPhiNc = 0.9 * axialAlphaC * axialKf * axialAg * axialFy / 1000;
assert.equal(displayed(axialPhiNc), "236.6");
assert.equal(Math.max(0, 0.00326 * (13.49 - 13.5)), 0);
assert.equal(Math.max(0, 0.00326 * (13.5 - 13.5)), 0);
approximately(Math.max(0, 0.00326 * (13.51 - 13.5)), 0.0000326, 1e-12, "axial eta boundary above lambda 13.5");

// AXIAL-TENSION-01: exercise gross-yielding and net-fracture governing branches.
function independentAxialTension(ag, an, fy, fu, kt) {
  const grossYielding = ag * fy;
  const netFracture = 0.85 * kt * an * fu;
  return {
    governing: grossYielding <= netFracture ? "gross yielding" : "net fracture",
    phiNt: 0.9 * Math.min(grossYielding, netFracture) / 1000
  };
}
const tensionGrossGoverns = independentAxialTension(1810, 1810, 320, 440, 1);
assert.equal(tensionGrossGoverns.governing, "gross yielding");
assert.equal(displayed(tensionGrossGoverns.phiNt), "521.3");
const tensionFractureGoverns = independentAxialTension(1810, 1810, 320, 440, 0.85);
assert.equal(tensionFractureGoverns.governing, "net fracture");
assert.equal(displayed(tensionFractureGoverns.phiNt), "517.9");

// BEAM-MOMENT-01 and BEAM-SHEAR-01 using the visible default 310UB40.4 values.
const beamPhiMs = 0.9 * 320 * 633000 / 1e6;
const beamPhiVv = 0.9 * 0.6 * 320 * (283.6 * 6.1) / 1000;
assert.equal(displayed(beamPhiMs), "182.3");
assert.equal(displayed(beamPhiVv), "298.9");

// BEAM-SHEAR-MOMENT-01: AS 4100 Cl. 5.12.3 and the design-manual example.
function independentBeamInteraction(momentDemand, designMomentCapacity, nominalShearCapacity, phi = 0.9) {
  const momentRatio = momentDemand / designMomentCapacity;
  if (momentRatio > 1) return { momentRatio, factor: 0, designShearCapacity: 0, status: "moment exceeds capacity" };
  const factor = momentRatio <= 0.75 ? 1 : 2.2 - 1.6 * momentRatio;
  return {
    momentRatio,
    factor,
    designShearCapacity: phi * nominalShearCapacity * factor,
    status: "evaluated"
  };
}

const beamManualInteraction = independentBeamInteraction(232, 242, 498.97);
approximately(beamManualInteraction.factor, 0.6661157024793389, 1e-12, "beam manual interaction factor");
assert.equal(displayed(beamManualInteraction.designShearCapacity), "299.1");
assert.equal(72 <= beamManualInteraction.designShearCapacity, true);

const beamInteractionBelow075 = independentBeamInteraction(0.749999 * 200, 200, 300);
const beamInteractionAt075 = independentBeamInteraction(0.75 * 200, 200, 300);
const beamInteractionAbove075 = independentBeamInteraction(0.750001 * 200, 200, 300);
assert.equal(beamInteractionBelow075.factor, 1);
assert.equal(beamInteractionAt075.factor, 1);
approximately(beamInteractionAbove075.factor, 0.9999984, 1e-12, "beam interaction immediately above 0.75");

const beamInteractionAt100 = independentBeamInteraction(200, 200, 300);
const beamInteractionAbove100 = independentBeamInteraction(200.0002, 200, 300);
approximately(beamInteractionAt100.factor, 0.6, 1e-12, "beam interaction at moment-capacity boundary");
assert.equal(beamInteractionAbove100.status, "moment exceeds capacity");
assert.equal(beamInteractionAbove100.designShearCapacity, 0);

// SECTION-GEOMETRY-01: independent CHS identities.
const sectionD = 114.3;
const sectionT = 4.5;
const sectionDi = sectionD - 2 * sectionT;
const sectionArea = Math.PI * (sectionD ** 2 - sectionDi ** 2) / 4;
const sectionI = Math.PI * (sectionD ** 4 - sectionDi ** 4) / 64;
const sectionZ = 2 * sectionI / sectionD;
const sectionR = Math.sqrt(sectionI / sectionArea);
approximately(sectionArea, 1552.26, 0.01, "CHS gross area");
approximately(sectionI, 2343194.14, 0.1, "CHS second moment");
approximately(sectionZ, 41000.77, 0.1, "CHS elastic modulus");
approximately(sectionR, 38.853, 0.001, "CHS radius of gyration");

// CONCRETE-FLEXURE-01 and CONCRETE-SHEAR-SIMPLIFIED-01.
// Independent strain compatibility and bisection reconstruction for the default strip.
const concrete = {
  width: 1000,
  depth: 500,
  fc: 32,
  alpha2: 0.85 - 0.0015 * 32,
  gamma: 0.97 - 0.0025 * 32,
  ecu: 0.003,
  layers: [
    { y: 105, d: 105, area: 314 * 1000 / 200, fsy: 500, es: 200000 },
    { y: 395, d: 395, area: 314 * 1000 / 200, fsy: 500, es: 200000 }
  ]
};

function independentConcreteState(x) {
  const blockDepth = Math.min(concrete.depth, concrete.gamma * x);
  const cc = concrete.alpha2 * concrete.fc * concrete.width * blockDepth;
  const yCc = blockDepth / 2;
  const layers = concrete.layers.map(layer => {
    const strain = concrete.ecu * (x - layer.d) / x;
    const stress = Math.max(-layer.fsy, Math.min(layer.fsy, layer.es * strain));
    const displacedConcrete = layer.d <= blockDepth ? concrete.alpha2 * concrete.fc : 0;
    const force = layer.area * (stress - displacedConcrete);
    return { ...layer, strain, force };
  });
  return { cc, yCc, layers, axial: cc + layers.reduce((sum, layer) => sum + layer.force, 0) };
}

let concreteLow = 0.5;
let concreteHigh = 2000;
for (let index = 0; index < 100; index += 1) {
  const mid = (concreteLow + concreteHigh) / 2;
  if (independentConcreteState(concreteLow).axial * independentConcreteState(mid).axial <= 0) concreteHigh = mid;
  else concreteLow = mid;
}
const concreteX = (concreteLow + concreteHigh) / 2;
const concreteState = independentConcreteState(concreteX);
const concreteMuo = Math.abs(
  concreteState.cc * concreteState.yCc
  + concreteState.layers.reduce((sum, layer) => sum + layer.force * layer.y, 0)
) / 1e6;
const concreteKuo = concreteX / 395;
const concretePhi = Math.max(0.65, Math.min(0.85, 1.24 - 13 * concreteKuo / 12));
const concretePhiMuo = concretePhi * concreteMuo;
const concreteDv = Math.max(0.72 * concrete.depth, 0.9 * 395);
const concreteKv = Math.min(0.15, 200 / (1000 + 1.3 * concreteDv));
const concreteVuc = concreteKv * concrete.width * concreteDv * Math.sqrt(concrete.fc) / 1000;
const concretePhiVu = 0.70 * concreteVuc;
approximately(concreteState.axial / 1000, 0, 0.001, "concrete force equilibrium");
assert.equal(displayed(concreteX), "62.5");
assert.equal(displayed(concretePhiMuo), "287.1");
assert.equal(displayed(concretePhiVu), "194.2");

// REO-LAP-01: default Basic N20 contact lap, independently reconstructed.
const reoDb = 20;
const reoFc = 32;
const reoK1 = 1;
const reoK2 = (132 - reoDb) / 100;
const reoCd = Math.min(40, 100 / 2);
const reoK3 = Math.max(0.7, Math.min(1, 1 - 0.15 * (reoCd - reoDb) / reoDb));
const reoLsyT = 0.5 * reoK1 * reoK3 * 500 * reoDb / (reoK2 * Math.sqrt(reoFc));
const reoRawLap = Math.max(0.058 * 500 * reoK1 * reoDb, 1.25 * reoLsyT);
const reoAdoptedLap = Math.ceil(reoRawLap / 10) * 10;
approximately(reoRawLap, 838.5, 0.1, "N20 default raw lap");
assert.equal(reoAdoptedLap, 840);

// SCREW-GROUP-ACTIONS-01: independent symmetric perimeter-group equilibrium.
const screwCoordinates = [
  [-1.5, -1.5], [0, -1.5], [1.5, -1.5], [1.5, 0],
  [1.5, 1.5], [0, 1.5], [-1.5, 1.5], [-1.5, 0]
].map(([x, y], index) => ({ id: index + 1, x, y }));
const screwActions = { n: 800, mx: 90, my: -45, vx: 80, vy: 40, tz: 30 };
const screwSumX2 = screwCoordinates.reduce((sum, point) => sum + point.x ** 2, 0);
const screwSumY2 = screwCoordinates.reduce((sum, point) => sum + point.y ** 2, 0);
const screwSumR2 = screwSumX2 + screwSumY2;
const screwReactions = screwCoordinates.map(point => ({
  ...point,
  axial: screwActions.n / screwCoordinates.length
    + screwActions.mx * point.y / screwSumY2
    + screwActions.my * point.x / screwSumX2,
  vx: screwActions.vx / screwCoordinates.length - screwActions.tz * point.y / screwSumR2,
  vy: screwActions.vy / screwCoordinates.length + screwActions.tz * point.x / screwSumR2
}));
approximately(screwReactions.reduce((sum, pile) => sum + pile.axial, 0), screwActions.n, 1e-9, "screw axial equilibrium");
approximately(screwReactions.reduce((sum, pile) => sum + pile.axial * pile.y, 0), screwActions.mx, 1e-9, "screw Mx equilibrium");
approximately(screwReactions.reduce((sum, pile) => sum + pile.axial * pile.x, 0), screwActions.my, 1e-9, "screw My equilibrium");
approximately(screwReactions.reduce((sum, pile) => sum + pile.vx, 0), screwActions.vx, 1e-9, "screw Vx equilibrium");
approximately(screwReactions.reduce((sum, pile) => sum + pile.vy, 0), screwActions.vy, 1e-9, "screw Vy equilibrium");
const screwMaxCompression = Math.max(...screwReactions.map(pile => pile.axial));
const screwMaxTension = Math.max(0, ...screwReactions.map(pile => -pile.axial));
const screwMaxHorizontal = Math.max(...screwReactions.map(pile => Math.hypot(pile.vx, pile.vy)));
assert.equal(displayed(screwMaxCompression), "115.0");
assert.equal(displayed(screwMaxTension), "0.0");
assert.equal(displayed(screwMaxHorizontal), "13.4");

console.log("Independent calculation reproductions passed.");
