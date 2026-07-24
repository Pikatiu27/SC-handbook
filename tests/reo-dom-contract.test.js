"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const completeApp = fs.readFileSync(path.join(root, "app.js"), "utf8");
const app = completeApp.slice(
  completeApp.indexOf("function readReoOptions("),
  completeApp.indexOf("function setMemberType(")
);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
assert.deepEqual(duplicateIds, [], "HTML ids must be unique");

const referencedIds = [...new Set([...app.matchAll(/\$\("([^"]+)"\)/g)].map(match => match[1]))];
const missingIds = referencedIds.filter(id => !ids.includes(id));
assert.deepEqual(missingIds, [], "Every live $(id) reference must exist in index.html");

assert.match(html, /id="reoRefinedCandidateLength"/);
assert.match(html, /id="reoExistingRefinedCandidateLength"/);
assert.match(html, /id="reoPressureReference"[^>]*value="Structural analysis · governing ULS load combination"/);
assert.match(html, /id="reoExistingPressureReference"[^>]*value="Structural analysis · governing ULS load combination"/);
assert.match(html, /id="reoTerminationRequirements"/);
assert.doesNotMatch(html, /id="reoApplicationField"|id="reoApplicationNote"|Connection context/);
assert.doesNotMatch(html, /id="reoProfisDetails"/);
assert.doesNotMatch(html, /id="reoAvailableDepth"/);
assert.doesNotMatch(html, /id="reoExtensionRecord"|Extension design paths|REFERENCE SUMMARY/);
assert.doesNotMatch(app, /Project context|updateReoConnectionStatus/);

console.log("Reo DOM contract tests passed.");
