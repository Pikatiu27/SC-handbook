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
assert.match(script, /ICC-ES ESR-3330 available strength; the LRFD resistance factor is already included/);
assert.match(script, /loads: \[38\.0, 33\.3\]/);
assert.match(script, /Number\(product\.tension\)\.toFixed\(1\)/);
assert.match(script, /Blind Bolt Company Metric Technical Data, March 2026/);
assert.match(script, /gamma M2 = 1\.25 is already applied/);
assert.match(script, /ETA 20\/1174 characteristic resistance/);
assert.match(script, /family: "NexGen2"/);
assert.doesNotMatch(script, /Blind Bolt Australia Metric Technical Data, July 2018/);
assert.match(script, /if \(params\.get\("boltmode"\) === "blind"/);
assert.doesNotMatch(html, /id="uBoltApplication"/);
assert.doesNotMatch(html, /id="uBoltSpecification"/);
assert.doesNotMatch(html, /id="blindBoltSpecification"/);
assert.match(html, /class="ubolt-summary-wide"/);
assert.match(html, /Total grip, W \(optional\)/);
assert.doesNotMatch(html, /id="blindBoltGrip"[^>]*value="20"/);
assert.doesNotMatch(html, /Selected catalogue entry/);
assert.doesNotMatch(html, /id="blindBoltTensionBasis"/);
assert.doesNotMatch(html, /id="blindBoltShearBasis"/);
assert.match(outline, /Manufacturer product lookup branches:/);
assert.match(outline, /Structural blind-bolt product lookup branch:/);
assert.match(outline, /Catalogue entry` is the selection control/);

console.log("Product lookup DOM contract tests passed.");
