"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const start = app.indexOf("function sectionPowerValue");
const end = app.indexOf("function beamWebShearReduction");
assert.ok(start >= 0 && end > start, "Section Properties display block must remain discoverable.");

const sectionDisplay = app.slice(start, end);
assert.doesNotMatch(sectionDisplay, /\.toFixed\(/, "Section Properties must use decimal half-up display helpers.");
assert.doesNotMatch(sectionDisplay, /\.toLocaleString\(/, "Section Properties must not delegate engineering rounding to Intl.");
assert.match(sectionDisplay, /displayGroupedFixed/);
assert.match(sectionDisplay, /displayGroupedSignificant/);

console.log("Section Properties display-format tests passed.");
