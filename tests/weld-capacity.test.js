"use strict";

const assert = require("node:assert/strict");
const WeldCapacity = require("../weld-capacity.js");

function closeTo(actual, expected, tolerance = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
}

{
  const result = WeldCapacity.calculate({
    type: "fillet",
    category: "SP",
    size: 6,
    fuw: 490,
    length: 200,
    runs: 1
  });
  closeTo(result.throat, 4.242);
  closeTo(result.capacityPerMm, 0.9977184);
  closeTo(result.capacity, 199.54368);
}

{
  const sp = WeldCapacity.calculate({
    type: "ipbw",
    category: "SP",
    effectiveThroat: 7.5,
    fuw: 490,
    length: 320,
    runs: 2
  });
  const gp = WeldCapacity.calculate({
    type: "ipbw",
    category: "GP",
    effectiveThroat: 7.5,
    fuw: 490,
    length: 320,
    runs: 2
  });
  closeTo(sp.capacityPerMm, 1.764);
  closeTo(sp.capacity, 1128.96);
  closeTo(gp.capacityPerMm, 1.323);
  closeTo(gp.capacity, 846.72);
}

{
  closeTo(WeldCapacity.lapReduction(1699), 1);
  closeTo(WeldCapacity.lapReduction(1700), 1);
  closeTo(WeldCapacity.lapReduction(1701), 0.99794);
  closeTo(WeldCapacity.lapReduction(8000), 0.62);
  closeTo(WeldCapacity.lapReduction(8001), 0.62);
  closeTo(WeldCapacity.parentMetalScreen({ fup: 410, thickness: 10 }), 2.214);
}

{
  assert.throws(() => WeldCapacity.calculate({
    type: "fillet",
    category: "SP",
    size: 6,
    fuw: 490,
    length: 23.99,
    runs: 1
  }), /at least 4 times/);
  assert.throws(() => WeldCapacity.calculate({
    type: "fillet",
    category: "SP",
    size: 6,
    fuw: 490,
    length: 200,
    runs: 1.5
  }), /positive integer/);
  assert.throws(() => WeldCapacity.calculate({
    type: "ipbw",
    category: "SP",
    effectiveThroat: 0,
    fuw: 490,
    length: 200,
    runs: 1
  }), /positive/);
  assert.equal(WeldCapacity.calculate({ type: "cpbw", category: "SP" }).calculationAvailable, false);
}

console.log("Weld capacity tests passed.");
