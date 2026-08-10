"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.match(app, /"TF slip PASS"[\s\S]*"TF slip FAIL"/);
assert.match(app, /"Weld throat PASS"\s*:\s*"Weld throat FAIL"/);
assert.match(app, /"Section check FAIL"\s*:\s*"Section check PASS"/);
assert.match(app, /"Axial check PASS"\s*:\s*"Axial check FAIL"/);

assert.doesNotMatch(app, /weldStatus"\)\.textContent[\s\S]{0,240}\?\s*"PASS"\s*:\s*"FAIL"/);
assert.doesNotMatch(app, /beamStatus"\)\.textContent[\s\S]{0,320}\?\s*"FAIL"\s*:\s*"PASS"/);
assert.doesNotMatch(app, /memberUtilisationStatus\.textContent[\s\S]{0,180}\?\s*"PASS"\s*:\s*"FAIL"/);

assert.match(app, /parentGoverningNote"\)\.className = parentCheckActive \? "check" : ""/);
assert.match(app, /function updateScrewRisk[\s\S]*setStatusClass\(status, "check"\)/);
assert.match(app, /title: "Optional weld throat utilisation"/);

assert.match(html, /id="beamResultStatus">Calculated[^<]*section resistance only/);
assert.match(html, /id="beamStatus" class="check">No design action/);
assert.match(html, /id="memberUtilisationStatus" class="check">No design action/);
assert.match(html, /id="weldStatus" class="check">No design action/);
assert.doesNotMatch(html, /tool-status[^>]*>Checked/);

console.log("Result-status semantics tests passed.");
