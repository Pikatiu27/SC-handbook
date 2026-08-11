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
  "factSourceLink",
  "selectionConstraint"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing Rock Anchor element: ${id}`));

assert.match(script, /Manufacturer tendon value; not anchor resistance\./);
assert.match(script, /Published values conflict/);
assert.match(script, /No manufacturer value is embedded\./);
assert.match(script, /Australian provider pathway/);
assert.doesNotMatch(script, /Confirmed Australian provider pathway/);
assert.match(script, /\[25, 324, 404\], \[32, 517, 647\], \[38, 750, 937\]/);
assert.match(script, /https:\/\/www\.williamsform\.com\/rock\/spin-lock-anchors\/r7s-spin-lock-rock-bolt\//);
assert.match(script, /url: product\.sourceUrl \?\? providerRecord\.url/);
assert.match(script, /Not published/);
assert.match(html, /Product basis and limitations/);
assert.match(html, /Austroads ATS 5140-26/);
assert.match(html, /rock-anchor-selector\/app\.js\?v=20260811rockaudit2/);
assert.match(script, /mm²/);
assert.match(script, /× 15\.7 mm strands/);
assert.match(script, /Manufacturer row · Jan 2014 · archived/);

assert.match(outline, /product-selection aid/);
assert.match(outline, /must not report anchor resistance, project demand, utilisation or pass\/fail status/);
assert.match(outline, /Validation must include supplier\/product selection/);

console.log("Rock Anchor DOM contract tests passed.");
