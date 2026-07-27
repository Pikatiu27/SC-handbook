"use strict";

const assert = require("node:assert/strict");
const integrity = require("../bolt-integrity.js");

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};

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
