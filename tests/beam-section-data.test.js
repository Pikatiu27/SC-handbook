"use strict";

const assert = require("node:assert/strict");
const hollowRows = require("../beam-section-data.js");
const hotRolled = require("../beam-hot-rolled-data.js");

assert.equal(hollowRows.length, 288);
assert.equal(new Set(hollowRows.map(row => `${row.family}|${row.designation}|${row.grade}`)).size, hollowRows.length);
assert.deepEqual(
  Object.fromEntries(["chs", "rhs", "shs"].map(family => [family, hollowRows.filter(row => row.family === family).length])),
  { chs: 73, rhs: 101, shs: 114 }
);

const chs = hollowRows.find(row => row.designation === "114.3 x 4.5 CHS" && row.grade === "C250L0");
assert.deepEqual(
  { area: chs.area, Ze: chs.Ze, compactness: chs.compactness, sourceTable: chs.sourceTable },
  { area: 1550, Ze: 54.3, compactness: "C", sourceTable: "3.1-1" }
);

const rhs = hollowRows.find(row => row.designation === "75 x 25 x 2.5 RHS" && row.grade === "C350L0");
assert.deepEqual({ Zex: rhs.Zex, Zey: rhs.Zey }, { Zex: 10.1, Zey: 4.33 });

assert.equal(Object.keys(hotRolled.universal).length, 41);
assert.equal(hotRolled.pfc.length, 10);
assert.equal(Object.keys(hotRolled.equalAngle).length, 13);
assert.ok(hollowRows.every(row => row.sourceTable && row.pdfPage > 0 && row.area > 0));
assert.ok(hollowRows.filter(row => row.family === "chs").every(row => row.I > 0 && row.Z > 0 && row.S > 0 && row.Ze > 0));
assert.ok(hollowRows.filter(row => row.family === "rhs").every(row =>
  row.Ix > 0 && row.Iy > 0 && row.Zx > 0 && row.Zy > 0 && row.Sx > 0 && row.Sy > 0
  && row.Zex > 0 && row.Zey > 0
));
assert.ok(hollowRows.filter(row => row.family === "shs").every(row =>
  row.I > 0 && row.Z > 0 && row.S > 0 && row.Ze > 0
));
assert.ok(Object.values(hotRolled.universal).every(section =>
  section.x.I > 0 && section.y.I > 0 && section.y.Z > 0 && section.y.S > 0
  && Object.values(section.grades).every(grade => grade.Ze > 0 && ["C", "N"].includes(grade.compactness))
));
assert.ok(hotRolled.pfc.every(section =>
  ["x", "y-a", "y-b"].every(direction => section.axes[direction]?.I > 0)
  && Object.values(section.grades).every(grade =>
    ["x", "y-a", "y-b"].every(direction => grade.directions[direction]?.Ze > 0)
  )
));
assert.ok(Object.entries(hotRolled.equalAngle).every(([designation, grades]) =>
  hotRolled.equalAngleProperties[designation]
  && Object.values(grades).every(grade => ["a", "b", "c", "d"].every(direction => grade.directions[direction]?.Ze > 0))
));
assert.equal(hotRolled.universal["310UB40.4"].grades["300PLUS"].Ze, 139);
assert.equal(hotRolled.universal["310UB40.4"].x.I, 86.4e6);
assert.equal(hotRolled.universal["200UC46.2"].x.I, 45.9e6);
assert.equal(hotRolled.pfc.find(section => section.designation === "150PFC").grades["300PLUS"].directions["y-a"].Ze, 38.5);
assert.equal(hotRolled.equalAngle["100 x 100 x 10 EA"]["300PLUS"].directions.b.Ze, 25.2);

const pfc = hotRolled.pfc.find(section => section.designation === "150PFC");
assert.deepEqual({ xL: pfc.xL, xO: pfc.xO, Ix: pfc.axes.x.I, Iy: pfc.axes["y-a"].I }, {
  xL: 24.9,
  xO: 51.0,
  Ix: 8.34e6,
  Iy: 1.29e6
});

const angle = hotRolled.equalAngleProperties["150 x 150 x 12 EA"];
assert.deepEqual({ mass: angle.mass, t: angle.t, area: angle.area, pB: angle.pB, pT: angle.pT }, {
  mass: 27.3,
  t: 12.0,
  area: 3480,
  pB: 41.5,
  pT: 108
});
assert.deepEqual(angle.axes, {
  a: { I: 11.9e6, Z: 112, S: 175 },
  c: { I: 11.9e6, Z: 112, S: 175 },
  b: { I: 3.06e6, Z: 56.9, S: 89.3 },
  d: { I: 3.06e6, Z: 52.1, S: 89.3 }
});

assert.deepEqual(Object.keys(hotRolled.equalAngleProperties).sort(), Object.keys(hotRolled.equalAngle).sort());
assert.ok(hotRolled.pfc.every(section => section.xL > 0 && section.xO > section.xL));

console.log("beam-section-data tests passed");
