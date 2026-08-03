"use strict";

const assert = require("node:assert/strict");
const MemberCapacity = require("../member-capacity.js");

function approximately(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

const chs = MemberCapacity.calculate({
  grossArea: 1117,
  netArea: 1117,
  fy: 350,
  fu: 430,
  kf: 1,
  kt: 1,
  axes: [{ label: "", title: "selected axis", r: 39.3, effectiveLength: 3000, alphaB: -0.5 }],
  compressionDemand: 120,
  tensionDemand: 90
});

approximately(chs.axisResults[0].leOverR, 3000 / 39.3, 1e-12, "3 m to 3000 mm slenderness conversion");
approximately(chs.sectionCompression, 0.9 * 1117 * 350 / 1000, 1e-12, "MPa mm2 to kN section capacity");
approximately(chs.memberCompression, 236.6, 0.05, "default CHS member compression reproduction");
approximately(chs.grossYield, 0.9 * 1117 * 350 / 1000, 1e-12, "gross yielding");
approximately(chs.netFracture, 0.9 * 0.85 * 1117 * 430 / 1000, 1e-12, "net fracture");
assert.equal(chs.tensionGoverning, "Gross-section yielding");
approximately(chs.demand.compressionRatio, 120 / chs.memberCompression, 1e-12, "compression utilisation");
approximately(chs.demand.tensionRatio, 90 / chs.tensionCapacity, 1e-12, "tension utilisation");

const doubledArea = MemberCapacity.calculate({
  grossArea: 2234,
  netArea: 2234,
  fy: 350,
  fu: 430,
  kf: 1,
  kt: 1,
  axes: [{ label: "", title: "selected axis", r: 39.3, effectiveLength: 3000, alphaB: -0.5 }]
});
approximately(doubledArea.memberCompression, 2 * chs.memberCompression, 1e-9, "compression area scaling");
approximately(doubledArea.tensionCapacity, 2 * chs.tensionCapacity, 1e-9, "tension area scaling");

const custom = MemberCapacity.calculate({
  grossArea: 2000,
  netArea: 1800,
  fy: 350,
  fu: 450,
  kf: 1,
  kt: 0.85,
  axes: [
    { label: "x", title: "x-axis", r: 30, effectiveLength: 3000, alphaB: 0.5 },
    { label: "y", title: "y-axis", r: 20, effectiveLength: 3000, alphaB: 0.5 }
  ]
});
assert.equal(custom.governingAxis.label, "y");
assert.equal(custom.tensionGoverning, "Net-section fracture");

assert.throws(() => MemberCapacity.calculate({ grossArea: 1000, netArea: 1100, fy: 300, fu: 440, kf: 1, kt: 1, axes: [{ r: 30, effectiveLength: 3000, alphaB: 0 }] }), /Net area A_n must not exceed gross area A_g/);
assert.throws(() => MemberCapacity.calculate({ grossArea: 1000, netArea: 1000, fy: 300, fu: 440, kf: 1, kt: 1, compressionDemand: -1, axes: [{ r: 30, effectiveLength: 3000, alphaB: 0 }] }), /Compression design action must not be negative/);
assert.throws(() => MemberCapacity.calculate({ grossArea: 1000, netArea: 1000, fy: 300, fu: 440, kf: 1, kt: 1, axes: [{ r: 30, effectiveLength: 0, alphaB: 0 }] }), /effective length must be greater than zero/);
assert.throws(() => MemberCapacity.calculate({ grossArea: 1000, netArea: 1000, fy: 300, fu: 440, kf: 1, kt: 1, axes: [{ r: 30, effectiveLength: 3000, alphaB: 1.1 }] }), /alpha_b must be between -1 and 1/);

console.log("Member capacity production-path tests passed.");
