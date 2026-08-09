"use strict";

const assert = require("node:assert/strict");
const BoltCapacity = require("../bolt-capacity.js");

const closeTo = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
};

{
  assert.equal(BoltCapacity.ultimateStrength({ grade: "8.8", diameter: 10, tableStrength: 830 }), 800);
  assert.equal(BoltCapacity.ultimateStrength({ grade: "8.8", diameter: 12, tableStrength: 830 }), 800);
  assert.equal(BoltCapacity.ultimateStrength({ grade: "8.8", diameter: 16, tableStrength: 830 }), 830);

  closeTo(BoltCapacity.designTension({ As: 58.0, fuf: 800 }), 37.12);
  closeTo(BoltCapacity.designTension({ As: 84.3, fuf: 800 }), 53.952);
}

{
  const result = BoltCapacity.designShear({
    grade: "10.9",
    fuf: 1040,
    kr: 1,
    threadPlanes: 1,
    shankPlanes: 1,
    Ac: 324,
    Ao: 452
  });

  assert.equal(result.krd, 0.83);
  closeTo(result.design, 0.8 * 0.62 * 1040 * 0.83 * (324 + 452) / 1000);
  closeTo(result.design, 332.2422272);
}

{
  const result = BoltCapacity.designShear({
    grade: "10.9",
    fuf: 1040,
    threadPlanes: 0,
    shankPlanes: 1,
    Ac: 324,
    Ao: 452
  });

  assert.equal(result.krd, 1);
  closeTo(result.design, 0.8 * 0.62 * 1040 * 452 / 1000);
}

{
  const shear = BoltCapacity.designShear({
    grade: "8.8",
    fuf: 830,
    threadPlanes: 2,
    shankPlanes: 0,
    Ac: 324,
    Ao: 452
  });
  const bearing = BoltCapacity.designPlyBearing({
    diameter: 24,
    thickness: 10,
    tensileStrength: 410,
    effectiveEdge: 41
  });

  closeTo(shear.design, 266.76864);
  closeTo(bearing.full, 283.392);
  closeTo(bearing.edge, 151.29);
  closeTo(bearing.local, 151.29);
  assert.deepEqual(BoltCapacity.pitchLimits({ diameter: 24, thinnerPlyThickness: 10 }), {
    minimum: 60,
    maximum: 150
  });
}

{
  const perBolt = BoltCapacity.designSlipResistance({
    slipFactor: 0.35,
    interfaces: 1,
    preload: 210,
    holeFactor: 1
  });
  closeTo(perBolt, 51.45);
  closeTo(BoltCapacity.slipInteraction({
    shearAction: 100,
    shearCapacity: 2 * perBolt,
    tensionAction: 0,
    tensionCapacity: 0.7 * 2 * 210
  }), 100 / 102.9);
}

{
  const count = 4;
  const groupShear = BoltCapacity.designShear({
    grade: "10.9",
    fuf: 1040,
    kr: 0.9,
    threadPlanes: count,
    shankPlanes: 0,
    Ac: 324,
    Ao: 452
  });
  const primary = BoltCapacity.designPlyBearing({
    diameter: 24,
    thickness: 10,
    tensileStrength: 410,
    effectiveEdge: 41
  });
  const secondary = BoltCapacity.designPlyBearing({
    diameter: 24,
    thickness: 8,
    tensileStrength: 440,
    effectiveEdge: 35
  });
  const groupSlip = count * BoltCapacity.designSlipResistance({
    slipFactor: 0.35,
    interfaces: 2,
    preload: 295,
    holeFactor: 0.85
  });
  const slipInteraction = BoltCapacity.slipInteraction({
    shearAction: 250,
    shearCapacity: groupSlip,
    tensionAction: 300,
    tensionCapacity: 0.7 * count * 295
  });

  assert.equal(groupShear.krd, 0.83);
  closeTo(groupShear.design, 499.39089408);
  closeTo(count * Math.min(primary.full, secondary.full), 973.2096);
  closeTo(count * Math.min(primary.edge, secondary.edge), 443.52);
  assert.deepEqual(BoltCapacity.pitchLimits({ diameter: 24, thinnerPlyThickness: 8 }), {
    minimum: 60,
    maximum: 120
  });
  closeTo(groupSlip, 491.47);
  closeTo(slipInteraction, 0.871874173398173);
}

{
  assert.throws(() => BoltCapacity.designShear({
    grade: "8.8",
    fuf: 830,
    threadPlanes: 0.5,
    shankPlanes: 0,
    Ac: 324,
    Ao: 452
  }), /non-negative integer/);
  assert.throws(() => BoltCapacity.designSlipResistance({
    slipFactor: 0.35,
    interfaces: 0,
    preload: 210,
    holeFactor: 1
  }), /at least 1/);
  assert.throws(() => BoltCapacity.designSlipResistance({
    slipFactor: 0,
    interfaces: 1,
    preload: 210,
    holeFactor: 1
  }), /positive/);
}

{
  assert.equal(BoltCapacity.formatDrawingCallout({
    size: "M24",
    grade: "8.8",
    connectionCategory: "S",
    plane: "N"
  }), "M24 8.8/S");
  assert.equal(BoltCapacity.formatDrawingCallout({
    size: "M24",
    grade: "8.8",
    connectionCategory: "S",
    plane: "X"
  }), "M24 8.8 X/S");
}

console.log("Bolt capacity tests passed.");
