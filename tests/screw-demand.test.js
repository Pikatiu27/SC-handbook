"use strict";

const assert = require("node:assert/strict");
const ScrewDemand = require("../screw-demand.js");

function approximately(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

const coordinates = [
  [-1.5, -1.5], [0, -1.5], [1.5, -1.5], [1.5, 0],
  [1.5, 1.5], [0, 1.5], [-1.5, 1.5], [-1.5, 0]
].map(([x, y], index) => ({ id: index + 1, x, y }));
const actions = { axial: 800, momentX: 90, momentY: -45, shearX: 80, shearY: 40, torsion: 30 };
const result = ScrewDemand.distribute({ coordinates, ...actions });

approximately(result.reactions.reduce((sum, pile) => sum + pile.axial, 0), actions.axial, 1e-9, "axial equilibrium");
approximately(result.reactions.reduce((sum, pile) => sum + pile.axial * pile.y, 0), actions.momentX, 1e-9, "Mx equilibrium");
approximately(result.reactions.reduce((sum, pile) => sum + pile.axial * pile.x, 0), actions.momentY, 1e-9, "My equilibrium");
approximately(result.reactions.reduce((sum, pile) => sum + pile.lateralX, 0), actions.shearX, 1e-9, "Vx equilibrium");
approximately(result.reactions.reduce((sum, pile) => sum + pile.lateralY, 0), actions.shearY, 1e-9, "Vy equilibrium");
approximately(result.reactions.reduce((sum, pile) => sum + pile.x * pile.lateralY - pile.y * pile.lateralX, 0), actions.torsion, 1e-9, "torsional equilibrium");
approximately(result.maxCompression, 115, 1e-9, "maximum compression reproduction");
approximately(result.maxUplift, 0, 1e-9, "maximum uplift reproduction");
approximately(result.maxLateral, 13.437096247164249, 1e-12, "maximum horizontal reaction reproduction");

assert.throws(() => ScrewDemand.distribute({ coordinates: [{ x: 0, y: 0 }, { x: 2, y: 0 }], axial: 10 }), /group centroid/);
assert.throws(() => ScrewDemand.distribute({ coordinates: [{ x: -1, y: -1 }, { x: 1, y: 1 }], momentX: 10 }), /axes must be uncoupled/);
assert.throws(() => ScrewDemand.distribute({ coordinates: [{ x: 0, y: 0 }], momentX: 10 }), /cannot resist the entered X moment/);

assert.deepEqual(
  ScrewDemand.validateLayout({ columns: 3, rows: 3, lengthX: 3, lengthY: 3 }),
  { columns: 3, rows: 3, lengthX: 3, lengthY: 3 }
);
assert.throws(() => ScrewDemand.validateLayout({ columns: 2.5, rows: 3, lengthX: 3, lengthY: 3 }), /whole number/);
assert.throws(() => ScrewDemand.validateLayout({ columns: 3, rows: 3, lengthX: -1, lengthY: 3 }), /at least 0\.1 m/);
assert.throws(() => ScrewDemand.validateLayout({ columns: NaN, rows: 3, lengthX: 3, lengthY: 3 }), /must be finite/);

for (let columns = 2; columns <= 8; columns += 1) {
  for (let rows = 2; rows <= 8; rows += 1) {
    for (const layout of ["rect-perimeter", "rect-grid"]) {
      const layoutCoordinates = ScrewDemand.rectangularCoordinates({ layout, columns, rows, lengthX: 4.2, lengthY: 3.6 });
      const expectedCount = layout === "rect-grid" ? columns * rows : 2 * columns + 2 * rows - 4;
      assert.equal(layoutCoordinates.length, expectedCount, `${layout} ${columns} x ${rows} pile count`);
      approximately(layoutCoordinates.reduce((sum, point) => sum + point.x, 0), 0, 1e-9, `${layout} centroid x`);
      approximately(layoutCoordinates.reduce((sum, point) => sum + point.y, 0), 0, 1e-9, `${layout} centroid y`);
      approximately(layoutCoordinates.reduce((sum, point) => sum + point.x * point.y, 0), 0, 1e-9, `${layout} uncoupled axes`);
    }
  }
}
assert.throws(
  () => ScrewDemand.rectangularCoordinates({ layout: "custom", columns: 3, rows: 3, lengthX: 3, lengthY: 3 }),
  /perimeter rows or a full grid/
);

console.log("Screw demand production-path tests passed.");
