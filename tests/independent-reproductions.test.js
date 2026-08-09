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

// BOLT-DETAILED-01: independent four-bolt connection and TF slip example.
// This arithmetic intentionally imports no production module.
const detailedBolt = {
  count: 4,
  diameter: 24,
  fuf: 1040,
  coreArea: 324,
  krd: 0.83,
  kr: 0.9,
  preload: 295
};
const detailedBoltGroupShear = detailedBolt.count * 0.8 * 0.62 * detailedBolt.fuf
  * detailedBolt.krd * detailedBolt.kr * detailedBolt.coreArea / 1000;
const detailedBoltPrimaryFull = detailedBolt.count * 0.9 * 3.2 * detailedBolt.diameter * 10 * 410 / 1000;
const detailedBoltPrimaryEdge = detailedBolt.count * 0.9 * 41 * 10 * 410 / 1000;
const detailedBoltSecondaryFull = detailedBolt.count * 0.9 * 3.2 * detailedBolt.diameter * 8 * 440 / 1000;
const detailedBoltSecondaryEdge = detailedBolt.count * 0.9 * 35 * 8 * 440 / 1000;
const detailedBoltSlip = detailedBolt.count * 0.7 * 0.35 * 2 * detailedBolt.preload * 0.85;
const detailedBoltSlipTension = 0.7 * detailedBolt.count * detailedBolt.preload;
const detailedBoltSlipInteraction = 250 / detailedBoltSlip + 300 / detailedBoltSlipTension;
approximately(detailedBoltGroupShear, 499.39089408, 1e-9, "four-bolt N-plane group shear");
approximately(Math.min(detailedBoltPrimaryFull, detailedBoltSecondaryFull), 973.2096, 1e-9, "governing full bearing");
approximately(Math.min(detailedBoltPrimaryEdge, detailedBoltSecondaryEdge), 443.52, 1e-9, "governing edge bearing");
assert.deepEqual({ minimumPitch: 2.5 * 24, maximumPitch: Math.min(15 * 8, 200) }, { minimumPitch: 60, maximumPitch: 120 });
approximately(detailedBoltSlip, 491.47, 1e-9, "four-bolt TF slip resistance");
approximately(detailedBoltSlipInteraction, 0.871874173398173, 1e-12, "TF slip shear-tension interaction");
assert.equal(detailedBoltSlipInteraction <= 1, true);

// AXIAL-MEMBER-COMP-01 using the visible default CHS source values.
function independentCompressionReduction(lambdaN, alphaB) {
  const alphaA = 2100 * (lambdaN - 13.5) / (lambdaN ** 2 - 15.3 * lambdaN + 2050);
  const modifiedLambda = lambdaN + alphaA * alphaB;
  const eta = Math.max(0, 0.00326 * (modifiedLambda - 13.5));
  const ratio = modifiedLambda / 90;
  const xi = (ratio ** 2 + 1 + eta) / (2 * ratio ** 2);
  const alphaC = xi * (1 - Math.sqrt(1 - (90 / (xi * modifiedLambda)) ** 2));
  return { alphaA, modifiedLambda, eta, xi, alphaC };
}

const axialAg = 1120;
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
assert.equal(displayed(axialPhiNc), "237.2");
assert.equal(Math.max(0, 0.00326 * (13.49 - 13.5)), 0);
assert.equal(Math.max(0, 0.00326 * (13.5 - 13.5)), 0);
approximately(Math.max(0, 0.00326 * (13.51 - 13.5)), 0.0000326, 1e-12, "axial eta boundary above lambda 13.5");

// AS 4100 Table 6.3.3(C) check point and Design Manual Example 6.4.2.
const axialTablePoint = independentCompressionReduction(150, -0.5);
assert.equal(axialTablePoint.alphaC.toFixed(3), "0.316");
[-1, -0.5, 0, 0.5, 1].forEach(alphaB => {
  const result = independentCompressionReduction(150, alphaB);
  assert.ok(Number.isFinite(result.alphaC) && result.alphaC > 0 && result.alphaC <= 1, `Invalid alpha_c for alpha_b = ${alphaB}`);
});

const manualChs = {
  ag: 2283,
  r: 47.6,
  le: 7200,
  fy: 250,
  kf: 1,
  alphaB: -0.5
};
const manualChsLambdaN = manualChs.le / manualChs.r * Math.sqrt(manualChs.kf) * Math.sqrt(manualChs.fy / 250);
const manualChsReduction = independentCompressionReduction(manualChsLambdaN, manualChs.alphaB);
const manualChsPhiNc = 0.9 * manualChsReduction.alphaC * manualChs.kf * manualChs.ag * manualChs.fy / 1000;
approximately(manualChsPhiNc, 160.7, 1.0, "Design Manual Example 6.4.2 rounded-input reproduction");

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

// Design Manual Example 5.3.1: 50 x 50 x 5 EA.
const manualAngleTension = independentAxialTension(443, 443, 260, 410, 0.85);
assert.equal(manualAngleTension.governing, "gross yielding");
assert.equal(displayed(manualAngleTension.phiNt), "103.7");
assert.equal(displayed(0.9 * 0.85 * 0.85 * 443 * 410 / 1000), "118.1");

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
function independentReoDevelopment({
  db,
  fc,
  cd,
  k1 = 1,
  materialFactor = 1,
  applyBasicLowerLimit = true,
  K = 0,
  lambda = 0,
  pressure = 0,
  refined = false
}) {
  const k2 = (132 - db) / 100;
  const k3 = Math.max(0.7, Math.min(1, 1 - 0.15 * (cd - db) / db));
  const formula = 0.5 * k1 * k3 * 500 * db / (k2 * Math.sqrt(Math.min(fc, 65)));
  const lowerLimit = 0.058 * 500 * k1 * db;
  const basic = (applyBasicLowerLimit ? Math.max(formula, lowerLimit) : formula) * materialFactor;
  const k4 = Math.max(0.7, Math.min(1, 1 - K * lambda));
  const k5 = Math.max(0.7, Math.min(1, 1 - 0.04 * pressure));
  const refinedFactor = refined ? Math.max(k4 * k5, 0.7 / k3) : 1;
  return { k2, k3, formula, lowerLimit, k4, k5, raw: basic * refinedFactor };
}

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

// REO-DEVELOPMENT-01: Basic, Refined, partial-stress and minimum-length branches.
const reoBasicN20 = independentReoDevelopment({ db: 20, fc: 32, cd: 40 });
approximately(reoBasicN20.raw, 670.8044, 0.0001, "N20 Basic development");
assert.equal(Math.ceil(reoBasicN20.raw / 10) * 10, 680);

const reoRefinedN28 = independentReoDevelopment({
  db: 28,
  fc: 32,
  cd: 30,
  K: 0.05,
  lambda: 1,
  refined: true
});
approximately(reoRefinedN28.formula, 1177.0948, 0.0001, "N28 basic formula before Refined factors");
assert.equal(reoRefinedN28.k4, 0.95);
approximately(reoRefinedN28.raw, 1118.2401, 0.0001, "N28 Refined development");
assert.equal(Math.ceil(reoRefinedN28.raw / 10) * 10, 1120);

const reoN20At250 = Math.max(reoBasicN20.raw * 250 / 500, 12 * 20);
approximately(reoN20At250, 335.4022, 0.0001, "N20 development at 250 MPa");
assert.equal(Math.ceil(reoN20At250 / 10) * 10, 340);
assert.equal(Math.max(reoBasicN20.raw * 25 / 500, 12 * 20), 240);

// REO-ANCHORAGE-01: qualified standard hook/cog uses half of the verified development path.
const reoN28Hook = 0.5 * reoRefinedN28.raw;
approximately(reoN28Hook, 559.1200, 0.0001, "N28 standard hook reference");
assert.equal(Math.ceil(reoN28Hook / 10) * 10, 560);

// Cl. 13.2.2 k7 and narrow non-contact branches.
const reoQualifiedLap = Math.max(0.058 * 500 * reoDb, reoLsyT);
const reoNarrowGap80 = Math.max(0.058 * 500 * reoDb, reoLsyT, reoLsyT + 1.5 * 80);
assert.equal(Math.ceil(reoQualifiedLap / 10) * 10, 680);
assert.equal(Math.ceil(reoNarrowGap80 / 10) * 10, 800);

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
