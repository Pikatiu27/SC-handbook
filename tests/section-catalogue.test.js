"use strict";

const assert = require("node:assert/strict");
const geometry = require("../section-geometry.js");
const catalogue = require("../section-catalogue.js");

const families = catalogue.create({
  pfc: [{ designation: "150PFC", mass: 17.7, area: 2250, rx: 60.8, ry: 23.9, ix: 8.34e6, iy: 1.29e6, d: 150, bf: 75, tw: 6, tf: 9.5, xl: 24.9, xo: 51, zx: 111e3, sx: 129e3, zyR: 25.7e3, zyL: 51.6e3, sy: 46e3, j: 56.6e3, iw: 4.59e9 }],
  ub: [{ designation: "200UB18.2", mass: 18.2, area: 2320, Sx: 180, Zx: 160, ix: 15.8e6, iy: 1.14e6, zy: 23e3, sy: 35.7e3, rx: 82.6, ry: 22.1, j: 38.6e3, iw: 10.4e9, d: 200, bf: 100, tw: 5, tf: 8, d1: 184, Aw: 920 }],
  uc: [],
  chs: [{ designation: "114.3 x 4.5 CHS", D: 114.3, t: 4.5, mass: 12.19 }],
  ea: [{ designation: "100 x 100 x 10 EA", mass: 14.2, area: 1810, b: 100, t: 10, actualT: 9.5, rootRadius: 8, toeRadius: 5, legRatio: 9.53, centroidNear: 28.2, centroidFar: 71.8, in: 1.70e6, ip: 1.70e6, znB: 60.1e3, znT: 23.6e3, zpL: 60.1e3, zpR: 23.6e3, sn: 42.9e3, sp: 42.9e3, rn: 30.6, rp: 30.6, inp: -1.00e6, principalIx: 2.70e6, principalIy: 0.695e6, principalZx: 38.2e3, principalZy3: 19.6e3, principalZy5: 17.4e3, principalSx: 60.4e3, principalSy: 30.7e3, principalRx: 38.6, principalRy: 19.6, j: 56.2e3 }],
  rod: [{ designation: "Ø24 Rod", diameter: 24, mass: 3.55, area: Math.PI * 24 ** 2 / 4, ix: Math.PI * 24 ** 4 / 64, iy: Math.PI * 24 ** 4 / 64, rx: 6, ry: 6 }]
}, geometry);

assert.deepEqual(families.map(item => item.key), ["pfc", "ub", "uc", "chs", "ea", "rod"]);
families.flatMap(family => family.sections).forEach(section => {
  assert.deepEqual(Object.keys(section.properties), ["area", "cx", "cy", "ix", "iy", "zx", "zxAlt", "zy", "zyAlt", "sx", "sy", "rx", "ry", "j", "iw", "xo", "aw", "awx", "awy", "jp", "ixy", "iu", "iv", "ru", "rv", "thetaU"]);
  assert.ok(Object.hasOwn(section, "mass"));
  assert.ok(section.drawing && section.drawing.shape);
});

const pfc = families[0].sections[0];
assert.equal(pfc.drawing.shape, "channel");
assert.equal(pfc.properties.ix.basis, "catalogue");
assert.equal(pfc.properties.zx.basis, "catalogue");
assert.equal(pfc.properties.zy.value, 25.7e3);
assert.equal(pfc.properties.zyAlt.value, 51.6e3);
assert.equal(pfc.properties.zx.value, 111e3);
assert.equal(pfc.properties.cx.value, 24.9);
assert.equal(pfc.properties.cy.value, 75);
assert.equal(pfc.properties.xo.value, 51);
assert.equal(pfc.properties.aw.value, 6 * (150 - 2 * 9.5));
assert.equal(pfc.properties.ixy.value, 0);
assert.equal(pfc.properties.iu.value, pfc.properties.ix.value);
assert.equal(pfc.properties.thetaU.value, 0);

const ub = families[1].sections[0];
assert.equal(ub.drawing.shape, "i");
assert.equal(ub.properties.zx.value, 160e3);
assert.equal(ub.properties.ix.value, 15.8e6);
assert.equal(ub.properties.ry.value, 22.1);
assert.equal(ub.properties.sx.value, 180e3);
assert.equal(ub.properties.cx.value, 50);
assert.equal(ub.properties.cy.value, 100);
assert.equal(ub.properties.aw.value, 920);
assert.equal(ub.properties.jp.value, ub.properties.ix.value + ub.properties.iy.value);
assert.equal(ub.ratios[1].label, "(bf−tw)/2tf");
assert.equal(ub.ratios[1].value, (100 - 5) / (2 * 8));

const chs = families[3].sections[0];
assert.equal(chs.mass, 12.19);
assert.equal(chs.properties.area.basis, "derived");
assert.ok(chs.properties.area.value > 0);
assert.equal(chs.properties.ix.value, chs.properties.iy.value);
assert.equal(chs.properties.sx.value, chs.properties.sy.value);
assert.equal(chs.properties.j.value, 2 * chs.properties.ix.value);
assert.equal(chs.properties.jp.value, chs.properties.j.value);
assert.equal(chs.properties.thetaU.value, null);
assert.equal(chs.properties.cx.value, 114.3 / 2);
assert.equal(chs.properties.cy.value, 114.3 / 2);

const angle = families[4].sections[0];
assert.equal(angle.properties.area.basis, "catalogue");
assert.equal(angle.mass, 14.2);
assert.equal(angle.properties.ix.value, 1.70e6);
assert.equal(angle.properties.iy.value, 1.70e6);
assert.equal(angle.properties.zx.value, 23.6e3);
assert.equal(angle.properties.zxAlt.value, 60.1e3);
assert.equal(angle.properties.zy.value, 23.6e3);
assert.equal(angle.properties.zyAlt.value, 60.1e3);
assert.equal(angle.properties.ixy.value, -1.00e6);
assert.equal(angle.properties.iu.value, 2.70e6);
assert.equal(angle.properties.iv.value, 0.695e6);
assert.equal(angle.properties.thetaU.value, 45);
assert.equal(angle.properties.j.value, 56.2e3);
assert.equal(angle.auxiliary.principalZx.value, 38.2e3);
assert.equal(angle.ratios[0].label, "(b1-t)/t");

const rod = families[5].sections[0];
assert.equal(rod.properties.area.basis, "derived");
assert.equal(rod.properties.zx.value, rod.properties.zy.value);
assert.equal(rod.properties.iw.value, 0);
assert.equal(rod.properties.jp.value, rod.properties.j.value);

assert.throws(() => catalogue.create({}, null), /required/);

console.log("section-catalogue tests passed");
