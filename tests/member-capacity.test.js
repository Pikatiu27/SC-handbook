"use strict";

const assert = require("node:assert/strict");
const MemberCapacity = require("../member-capacity.js");
const BeamSectionData = require("../beam-section-data.js");

function approximately(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

const defaultChs = BeamSectionData.find(row => row.family === "chs" && row.designation === "114.3 x 3.2 CHS" && row.grade === "C350L0");
assert.ok(defaultChs, "Default Austube CHS row must remain available.");
assert.deepEqual(
  { area: defaultChs.area, r: defaultChs.r, fy: defaultChs.fy, kf: defaultChs.kf, table: defaultChs.sourceTable },
  { area: 1120, r: 39.3, fy: 350, kf: 1, table: "3.1-2" }
);

const chs = MemberCapacity.calculate({
  grossArea: defaultChs.area,
  netArea: defaultChs.area,
  fy: defaultChs.fy,
  fu: 430,
  kf: defaultChs.kf,
  kt: 1,
  axes: [{ label: "", title: "selected axis", r: defaultChs.r, effectiveLength: 3000, alphaB: -0.5 }],
  compressionDemand: 120,
  tensionDemand: 90
});

approximately(chs.axisResults[0].leOverR, 3000 / defaultChs.r, 1e-12, "3 m to 3000 mm slenderness conversion");
approximately(chs.sectionCompression, 0.9 * defaultChs.area * defaultChs.fy / 1000, 1e-12, "MPa mm2 to kN section capacity");
approximately(chs.memberCompression, 237.22523449307215, 1e-9, "default CHS member compression reproduction");
approximately(chs.grossYield, 0.9 * 1120 * 350 / 1000, 1e-12, "gross yielding");
approximately(chs.netFracture, 0.9 * 0.85 * 1120 * 430 / 1000, 1e-12, "net fracture");
assert.equal(chs.tensionGoverning, "Gross-section yielding");
approximately(chs.demand.compressionRatio, 120 / chs.memberCompression, 1e-12, "compression utilisation");
approximately(chs.demand.tensionRatio, 90 / chs.tensionCapacity, 1e-12, "tension utilisation");

const doubledArea = MemberCapacity.calculate({
  grossArea: 2240,
  netArea: 2240,
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
assert.throws(() => MemberCapacity.calculate({ grossArea: 1000, netArea: 1000, fy: 300, fu: 440, kf: 1, kt: 1, axes: [{ r: 1000, effectiveLength: 1, alphaB: 1 }] }), /Modified member slenderness lambda must be greater than zero/);

console.log("Member capacity production-path tests passed.");
