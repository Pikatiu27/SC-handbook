"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");

const start = script.indexOf("const screwPileCatalogues = {");
const end = script.indexOf("\nconst screwSoilRules = {", start);
assert.ok(start >= 0 && end > start, "Screw-pile catalogue block not found");

const context = {};
vm.createContext(context);
vm.runInContext(`${script.slice(start, end)}\nthis.catalogues = screwPileCatalogues;`, context);
const catalogues = context.catalogues;

const solidityRows = [
  ["solidity-s76002", "S76002", "76.1 mm OD", "300 mm dia x 10 mm plate", 70, 3.5, "8,719 N·m maximum table torque"],
  ["solidity-s89015", "S89015", "88.9 mm OD", "350 mm dia x 10 mm plate each", 190, 4.9, "12,319 N·m maximum table torque"],
  ["solidity-s114018", "S114018", "114.3 mm OD", "500 mm dia x 16 mm plate", 195, 9.2, "21,317 N·m maximum table torque"],
  ["solidity-s168028", "S168028", "168.3 mm OD", "800 mm dia x 20 mm plate", 500, 18.2, "81,472 N·m maximum table torque"],
  ["solidity-s219018", "S219018", "219.1 mm OD", "800 mm dia x 20 mm plate", 500, 16.9, "89,581 N·m maximum table torque"]
];

for (const [id, code, diameter, helix, maximumLoad, lateralLimit, torqueLimit] of solidityRows) {
  const row = catalogues.solidity.series[id];
  assert.ok(row, `Missing Solidity row ${id}`);
  assert.equal(row.productCode, code);
  assert.equal(row.diameter, diameter);
  assert.equal(row.helix, helix);
  assert.equal(row.rating, maximumLoad);
  assert.equal(row.lateral, lateralLimit);
  assert.equal(row.torqueLimit, torqueLimit);
  assert.equal(row.capacityType, "published-ultimate-table");
  assert.equal(row.compression, 0, `${id} maximum load must not be relabelled as compression resistance`);
  assert.equal(row.uplift, 0, `${id} tension resistance must remain unpublished`);
  assert.match(row.capacityBasis, /ultimate U\.N\.O\./);
}

const madewell100 = catalogues.madewell.series["madewell-100-g"];
assert.equal(madewell100.productCode, "SP-SBH*-G");
assert.equal(madewell100.shaft, "76.1 x 4.0 CHS");
assert.equal(madewell100.helix, "275 x 8 mm; 300 x 8 mm option at 2.5 m");
assert.equal(madewell100.length, "1.5-4.0 m stocked lengths");
assert.equal(madewell100.rating, 100);

const madewell150 = catalogues.madewell.series["madewell-150-g"];
assert.equal(madewell150.productCode, "SP-150KN-*-G");
assert.equal(madewell150.shaft, "88.9 x 5.5 CHS");
assert.equal(madewell150.helix, "350 mm dia x 10 mm plate");
assert.equal(madewell150.length, "2.0-4.0 m stocked lengths");
assert.equal(madewell150.rating, 150);

for (const row of [madewell100, madewell150]) {
  assert.equal(row.capacityType, "supplier-rating-up-to");
  assert.equal(row.compression, 0);
  assert.equal(row.uplift, 0);
  assert.equal(row.lateral, 0);
  assert.match(row.capacityBasis, /load direction, safety basis/);
}

assert.equal(catalogues.surefoot.series["surefoot-s250-8p"].productCode, "S250 8P");
assert.equal(catalogues.stopdigging.series["sd-sgp-1200"].productCode, "SGP 1200");
assert.equal(catalogues.stopdigging.series["sd-sgn-89-2500"].productCode, "SGN 89 × 2500");

assert.match(catalogues.solidity.sourceUrl, /solidity\.com\.au/);
assert.match(catalogues.madewell.sourceUrl, /shopify\.com/);
for (const catalogue of Object.values(catalogues)) {
  for (const row of Object.values(catalogue.series)) {
    assert.ok(row.source, `${catalogue.label} row requires a source label`);
    assert.ok(row.capacityBasis, `${catalogue.label} row requires a capacity basis`);
  }
}

[
  "screwFactProductClass",
  "screwFactProductCode",
  "screwFactSystemType",
  "screwReferenceLoadRow",
  "screwFactFoundingRow",
  "screwFactTorqueRow",
  "screwAdoptionRow",
  "screwFactAdoption"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing selected-product field ${id}`));

assert.match(html, /<option value="solidity">Solidity<\/option>/);
assert.match(html, /<option value="madewell">Madewell Products<\/option>/);
assert.doesNotMatch(html, />Product options</i);
assert.doesNotMatch(html, />Product class</i);
assert.doesNotMatch(html, />Supplier data required</i);
assert.doesNotMatch(html, />Key limitation</i);
assert.match(html, />Data level</i);
assert.match(html, />Required before adoption</i);
assert.match(outline, /Do not relabel a published ultimate maximum load as `SWL` or compression resistance\./);
assert.match(outline, /one separate `Published reference load` row/);
assert.match(outline, /one `Required before adoption` row/);
assert.match(script, /compression: enteredValues\.compression/);
assert.doesNotMatch(script, /compression: ratingTypes\.includes\(type\)/);

console.log("Screw-pile product data and selector contract tests passed.");
