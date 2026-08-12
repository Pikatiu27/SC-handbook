"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "rock-anchor-selector", "app.js"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");

[
  "rockPanel",
  "supplierFilter",
  "productFilter",
  "selectedName",
  "dataStatus",
  "sourceStatus",
  "supplyStatus",
  "factYieldLoad",
  "factUltimateLoad",
  "factConfiguration",
  "factStandard",
  "factPublishedGeometry",
  "factAustraliaPathway",
  "factAustraliaLink",
  "factSourceLink",
  "selectionConstraint"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing Rock Anchor element: ${id}`));

assert.match(script, /Manufacturer tendon value; not anchor resistance\./);
assert.match(script, /Published values conflict/);
assert.match(script, /No manufacturer value is embedded\./);
assert.match(script, /Australian provider pathway/);
assert.doesNotMatch(script, /Confirmed Australian provider pathway/);
assert.match(script, /\[25, 324, 404, 51, "B16", "R7S08B16"\]/);
assert.match(script, /\[48, 1286, 1608, 89, "C28", "R7S15C28"\]/);
assert.match(script, /\[22, 5412, 6138\]/);
assert.match(script, /https:\/\/www\.williamsform\.com\/rock\/spin-lock-anchors\/r7s-spin-lock-rock-bolt\//);
assert.match(script, /BBR_VT_CONA_CMG_EN_Rev3_0621\.pdf/);
assert.match(script, /url: product\.sourceUrl \?\? providerRecord\.url/);
assert.match(script, /Not published/);
assert.match(script, /Published products/);
assert.match(script, /System families/);
assert.match(script, /Australian pathways/);
assert.match(script, /Project schedule/);
assert.match(script, /Characteristic 0\.1% proof force/);
assert.match(script, /function selectorName/);
assert.match(script, /function australiaRecord/);
assert.match(html, /Product basis and limitations/);
assert.match(html, /For Review &middot; product data &middot; source status/);
assert.match(html, /<h3>Key product data<\/h3>/);
assert.match(html, /class="rock-selected-header" aria-live="polite"/);
assert.doesNotMatch(html, /id="selectedProductCard" aria-live=/);
assert.match(html, /Austroads ATS 5140-26/);
assert.match(html, /rock-anchor-selector\/app\.js\?v=20260812rockrelease1/);
assert.doesNotMatch(html + script, /dev\.bbrnetwork\.com/);
assert.match(script, /mm²/);
assert.match(script, /× 15\.7 mm strands/);
assert.match(script, /Manufacturer row · Jan 2014 · archived/);

assert.match(outline, /product-selection aid/);
assert.match(outline, /must not report anchor resistance, project demand, utilisation or pass\/fail status/);
assert.match(outline, /Validation must include supplier\/product selection/);

console.log("Rock Anchor DOM contract tests passed.");
