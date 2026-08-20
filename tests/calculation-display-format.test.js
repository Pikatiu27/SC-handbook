"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const reo = fs.readFileSync(path.join(root, "reo-calculation.js"), "utf8");
const monopole = fs.readFileSync(path.join(root, "monopole-app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

function block(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.ok(start >= 0 && end > start, `Display block ${startMarker} must remain discoverable.`);
  return source.slice(start, end);
}

[
  ["function connectedPlyFormulaRows", "function calculateConnectedPlyIntegrity"],
  ["function calculateBolt", "function uniqueSorted"],
  ["function calculateWeld", "function beamUniversalWebYield"],
  ["function formatBeamNumber", "function formatBeamOptional"],
  ["function calculateBeam", "function chsGeometry"],
  ["function memberKfBasisText", "function setMemberDimensionDefaults"],
  ["function updateMemberDimensionUi", "function setMemberRadiusDefault"],
  ["function updateMemberNetSectionPresentation", "function populateMemberGrades"],
  ["function calculateMember", "function concreteLayer"],
].forEach(([start, end]) => {
  const displayBlock = block(app, start, end);
  assert.doesNotMatch(displayBlock, /\.toFixed\(/, `${start} must use decimal half-up display helpers.`);
  assert.doesNotMatch(displayBlock, /\.toLocaleString\(/, `${start} must not delegate engineering rounding to Intl.`);
});

assert.doesNotMatch(reo, /\.toFixed\(|\.toLocaleString\(/);
assert.match(reo, /EngineeringNumberFormat/);

const monopoleFixed = block(monopole, "function fixed", "function plateLookupActive");
assert.doesNotMatch(monopoleFixed, /\.toFixed\(|\.toLocaleString\(/);
assert.match(monopoleFixed, /decimalHalfUp/);

assert.match(html, /reo-calculation\.js\?v=20260812displaycontract1/);
assert.match(html, /app\.js\?v=20260820boltflow5/);
assert.match(html, /monopole-app\.js\?v=20260814polygonflat1/);

console.log("Calculation display-format contract tests passed.");
