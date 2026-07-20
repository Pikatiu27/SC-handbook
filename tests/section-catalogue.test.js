"use strict";

const assert = require("node:assert/strict");
const geometry = require("../section-geometry.js");
const catalogue = require("../section-catalogue.js");

const families = catalogue.create({
  pfc: [{ designation: "150PFC", mass: 17.7, area: 2250, rx: 60.8, ry: 23.9, ix: 8.34e6, iy: 1.29e6, d: 150, bf: 75, tw: 6, tf: 9.5 }],
  ub: [{ designation: "200UB18.2", mass: 18.2, area: 2320, Zx: 160, d: 200, bf: 100, tw: 5, tf: 8, d1: 184 }],
  uc: [],
  chs: [{ designation: "114.3 x 4.5 CHS", D: 114.3, t: 4.5 }],
  ea: [{ designation: "100 x 100 x 10 EA", area: 1810, r: 30.6, b: 100, t: 10 }],
  rod: [{ designation: "Ø24 Rod", diameter: 24, mass: 3.55, area: Math.PI * 24 ** 2 / 4, ix: Math.PI * 24 ** 4 / 64, iy: Math.PI * 24 ** 4 / 64, rx: 6, ry: 6 }]
}, geometry);

assert.deepEqual(families.map(item => item.key), ["pfc", "ub", "uc", "chs", "ea", "rod"]);
families.flatMap(family => family.sections).forEach(section => {
  assert.deepEqual(Object.keys(section.properties), ["area", "cx", "cy", "ix", "iy", "zx", "zy", "rx", "ry"]);
  assert.ok(Object.hasOwn(section, "mass"));
  assert.ok(section.drawing && section.drawing.shape);
});

const pfc = families[0].sections[0];
assert.equal(pfc.drawing.shape, "channel");
assert.equal(pfc.properties.ix.basis, "catalogue");
assert.equal(pfc.properties.zx.basis, "derived");
assert.equal(pfc.properties.zy.value, null);
assert.equal(pfc.properties.zx.value, 8.34e6 / 75);
assert.equal(pfc.properties.cx.value, null);
assert.equal(pfc.properties.cy.value, 75);

const ub = families[1].sections[0];
assert.equal(ub.drawing.shape, "i");
assert.equal(ub.properties.zx.value, 160e3);
assert.equal(ub.properties.ix.value, 16e6);
assert.equal(ub.properties.ry.basis, "unavailable");
assert.equal(ub.properties.cx.value, 50);
assert.equal(ub.properties.cy.value, 100);

const chs = families[3].sections[0];
assert.equal(chs.properties.area.basis, "derived");
assert.ok(chs.properties.area.value > 0);
assert.equal(chs.properties.ix.value, chs.properties.iy.value);
assert.equal(chs.properties.cx.value, 114.3 / 2);
assert.equal(chs.properties.cy.value, 114.3 / 2);

const angle = families[4].sections[0];
assert.equal(angle.properties.area.basis, "catalogue");
assert.equal(angle.properties.ix.value, null);
assert.equal(angle.auxiliary.rMin.value, 30.6);

const rod = families[5].sections[0];
assert.equal(rod.properties.area.basis, "derived");
assert.equal(rod.properties.zx.value, rod.properties.zy.value);

assert.throws(() => catalogue.create({}, null), /required/);

console.log("section-catalogue tests passed");
