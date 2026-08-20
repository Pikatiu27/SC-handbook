"use strict";

const assert = require("node:assert/strict");
const integrity = require("../bolt-integrity.js");

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};

const straightAreas = integrity.straightLineNetArea({
  width: 100,
  thickness: 10,
  holeCount: 1,
  holeDiameter: 26
});
assert.deepEqual(straightAreas, { grossArea: 1000, holeDeduction: 260, netArea: 740 });
assert.deepEqual(integrity.straightLineNetArea({
  width: 100,
  thickness: 10,
  holeCount: 0,
  holeDiameter: 0
}), { grossArea: 1000, holeDeduction: 0, netArea: 1000 });
assert.throws(() => integrity.straightLineNetArea({ width: 100, thickness: 10, holeCount: 1.5, holeDiameter: 26 }), /whole number/);
assert.throws(() => integrity.straightLineNetArea({ width: 20, thickness: 10, holeCount: 1, holeDiameter: 26 }), /greater than zero/);

const tn013 = integrity.blockShear({
  Agv: 1050,
  Anv: 720,
  Ant: 1200,
  fy: 320,
  fu: 440,
  kbs: 1
});
close(tn013.ruptureLimit, 718.08);
close(tn013.yieldLimit, 729.6);
close(tn013.design, 538.56);
assert.equal(tn013.control, "Net-shear rupture limit");

const tension = integrity.netSectionTension({
  Ag: 2100,
  An: 1660,
  fy: 320,
  fu: 440,
  kt: 1
});
close(tension.grossYield, 672);
close(tension.netFracture, 620.84);
close(tension.design, 558.756);
assert.equal(tension.control, "Net-section fracture");

assert.throws(() => integrity.netSectionTension({ Ag: 100, An: 120, fy: 320, fu: 440, kt: 1 }), /An must not exceed Ag/);
assert.throws(() => integrity.blockShear({ Agv: 100, Anv: 120, Ant: 50, fy: 320, fu: 440, kbs: 1 }), /Anv must not exceed Agv/);
assert.throws(() => integrity.blockShear({ Agv: 100, Anv: 80, Ant: 50, fy: 320, fu: 440, kbs: 0.75 }), /0.5 or 1.0/);

console.log("bolt-integrity tests passed");
