"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const SectionCatalogue = require("../section-catalogue.js");
const SectionGeometry = require("../section-geometry.js");
const SteelMaterials = require("../steel-materials.js");
const BeamHotRolledData = require("../beam-hot-rolled-data.js");
const BeamSectionData = require("../beam-section-data.js");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const start = source.indexOf("const beamShearDimensions =");
const end = source.indexOf("let sectionPropertiesMode =");
assert.ok(start >= 0 && end > start, "Section source-data block must remain discoverable.");

const context = { SectionCatalogue, SectionGeometry, SteelMaterials, BeamHotRolledData, BeamSectionData };
vm.runInNewContext(
  `${source.slice(start, end)}
   this.auditData = { beamShearDimensions, sectionCatalogueFamilies };`,
  context
);

const family = key => context.auditData.sectionCatalogueFamilies.find(item => item.key === key);
const section = (key, designation) => family(key).sections.find(item => item.designation === designation);
const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `${actual} != ${expected}`
  );
};

// InfraBuild, Hot Rolled Steel Products Catalogue 2019, Table 9, PDF page 12.
assert.deepEqual(
  JSON.parse(JSON.stringify(context.auditData.beamShearDimensions["530UB92.4"])),
  { d: 533, bf: 209, tf: 15.6, d1: 501.8, tw: 10.2 }
);
const ub = section("ub", "310UB40.4");
assert.equal(ub.mass, 40.4);
assert.equal(ub.properties.area.value, 5210);
assert.equal(ub.properties.ix.value, 86.4e6);
assert.equal(ub.properties.zx.value, 569e3);
assert.equal(ub.properties.rx.value, 129);

// InfraBuild 2019, Table 11, PDF page 14.
const uc = section("uc", "200UC46.2");
assert.equal(uc.mass, 46.2);
assert.equal(uc.properties.area.value, 5900);
assert.equal(uc.properties.ix.value, 45.9e6);
assert.equal(uc.properties.zy.value, 151e3);
assert.equal(uc.properties.ry.value, 51);

// InfraBuild 2019, Table 15, PDF page 17.
const pfc = section("pfc", "150PFC");
assert.equal(pfc.mass, 17.7);
assert.equal(pfc.properties.area.value, 2250);
assert.equal(pfc.properties.cx.value, 24.9);
assert.equal(pfc.properties.zy.value, 25.7e3);
assert.equal(pfc.properties.zyAlt.value, 51.6e3);
assert.equal(pfc.properties.xo.value, 51);

// Orrcon, National Product Catalogue 2024, CHS table, PDF page 10.
const chs = section("chs", "114.3 x 4.5 CHS");
assert.equal(chs.mass, 12.19);
close(chs.properties.area.value, Math.PI * (114.3 ** 2 - 105.3 ** 2) / 4);
close(chs.properties.ix.value, Math.PI * (114.3 ** 4 - 105.3 ** 4) / 64);
assert.equal(chs.properties.area.basis, "derived");

// Austube 2013, Table 3.1-3, PDF page 31.
const rhs = section("rhs", "75 x 25 x 2.5 RHS");
assert.equal(rhs.mass, 3.6);
assert.equal(rhs.properties.area.value, 459);
assert.equal(rhs.properties.ix.value, 0.285e6);
assert.equal(rhs.properties.iy.value, 0.0487e6);
assert.equal(rhs.properties.zx.value, 7.6e3);
assert.equal(rhs.properties.zy.value, 3.89e3);
assert.equal(rhs.properties.rx.value, 24.9);
assert.equal(rhs.properties.ry.value, 10.3);

// Austube 2013, Table 3.1-6, PDF page 36.
const shs = section("shs", "200 x 200 x 6 SHS");
assert.equal(shs.mass, 35.6);
assert.equal(shs.properties.area.value, 4530);
assert.equal(shs.properties.ix.value, 28e6);
assert.equal(shs.properties.iy.value, 28e6);
assert.equal(shs.properties.zx.value, 280e3);
assert.equal(shs.properties.sy.value, 327e3);
assert.equal(shs.properties.rx.value, 78.6);
assert.equal(shs.properties.ry.value, 78.6);

// InfraBuild 2019, Tables 19 and 21, PDF pages 19 and 21.
const angle = section("ea", "100 x 100 x 10 EA");
assert.equal(angle.mass, 14.2);
assert.equal(angle.properties.area.value, 1810);
assert.equal(angle.properties.ixy.value, -1e6);
assert.equal(angle.properties.iu.value, 2.7e6);
assert.equal(angle.properties.iv.value, 0.695e6);
assert.equal(angle.properties.thetaU.value, 45);

// InfraBuild 2019 round-bar diameter and mass table; geometry is independently derived.
const rod = section("rod", "Ø24 Rod");
assert.equal(rod.mass, 3.55);
close(rod.properties.area.value, Math.PI * 24 ** 2 / 4);
close(rod.properties.ix.value, Math.PI * 24 ** 4 / 64);
close(rod.properties.rx.value, 6);

console.log("section source reproduction tests passed");
