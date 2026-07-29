"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");

[
  "boltModeUBolt",
  "boltModeBlindBolt",
  "uBoltMemberGeometry",
  "uBoltSelectionPrompt",
  "uBoltSelectedSummary",
  "uBoltPublishedGeometry",
  "uBoltPublishedSection",
  "blindBoltSize",
  "blindBoltGrip",
  "blindBoltManufacturer",
  "blindBoltProduct",
  "blindBoltSelectionPrompt",
  "blindBoltSelectedSummary",
  "blindBoltPublishedSection",
  "blindBoltValueBasis",
  "blindBoltNoPublishedValues",
  "blindBoltSourceStatus"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing product lookup element: ${id}`));

assert.match(script, /const blindBoltProducts = \[/);
assert.match(script, /Source_Checked/);
assert.match(script, /Source_Online_Checked/);
assert.match(script, /function sortMetricSizes\(values\)/);
assert.match(script, /AS 4100:1998; no current design value is adopted/);
assert.match(script, /if \(params\.get\("boltmode"\) === "blind"/);
assert.doesNotMatch(html, /id="uBoltApplication"/);
assert.doesNotMatch(html, /Selected catalogue entry/);
assert.doesNotMatch(html, /id="blindBoltTensionBasis"/);
assert.doesNotMatch(html, /id="blindBoltShearBasis"/);
assert.match(outline, /Manufacturer product lookup branches:/);
assert.match(outline, /Structural blind-bolt product lookup branch:/);
assert.match(outline, /Catalogue entry` is the selection control/);

console.log("Product lookup DOM contract tests passed.");
