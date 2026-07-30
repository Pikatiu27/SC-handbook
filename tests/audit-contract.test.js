"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");
const traceability = fs.readFileSync(path.join(root, "REFERENCE_TRACEABILITY.md"), "utf8");

assert.match(html, /Concrete Pad Section<\/h2><\/div><span class="tool-status">For Review · section resistance only<\/span>/);
assert.match(html, /round-bar strengths follow AS\/NZS 3679\.1 Table 15 using diameter/);
assert.match(html, /AS 4100 Table 6\.3\.3\(B\) when k<sub>f<\/sub> &lt; 1\.0/);
assert.match(html, /OneSteel \/ InfraBuild Table 38 for diameter-dependent/);
assert.doesNotMatch(html, /round-bar strengths follow Table 15/);
assert.doesNotMatch(html, /and Table 6\.3\.3\(B\) when/);
assert.doesNotMatch(html, /; Table 38 for diameter-dependent/);

assert.match(script, /Design &phi;M<sub>uo<\/sub> = &phi; &times; M<sub>uo<\/sub>/);
assert.match(script, /design capacity = &phi; &times; V<sub>u<\/sub>/);
assert.match(script, /mm<sup>2<\/sup> per strip/);
assert.match(script, /reference: "Derived rigid-cap equilibrium model"/);
assert.match(script, /comparisonBasis === "project-source-missing"/);
assert.match(script, /comparisonBasis === "project-basis-mismatch"/);
assert.match(script, /Manufacturer values are not compared automatically/);
assert.match(script, /type === "cpbw"[\s\S]*?"Not evaluated"/);
assert.match(script, /function catalogueDerivedTraceRows\(/);
assert.match(script, /title: "Circular hollow-section area"/);
assert.match(script, /title: "Clear web reference area"/);
assert.doesNotMatch(script, /mm2 per strip/);
assert.doesNotMatch(script, /mm2\/mm/);

[
  "BOLT-SHEAR-01",
  "WELD-FILLET-01",
  "SECTION-GEOMETRY-01",
  "AXIAL-MEMBER-COMP-01",
  "BEAM-MOMENT-01",
  "CONCRETE-FLEXURE-01",
  "REO-LAP-01",
  "SCREW-GROUP-ACTIONS-01",
  "ROCK-PRODUCT-LOOKUP-01"
].forEach(id => assert.match(traceability, new RegExp("`" + id + "`"), `Missing active register ID ${id}`));

assert.match(traceability, /\| `6` \| Reinforcement \|/);
assert.match(traceability, /tests\/independent-reproductions\.test\.js/);
assert.match(traceability, /`BEAM-EX-INT-01`/);
assert.match(traceability, /`BEAM-REP-INT-01`/);
assert.match(traceability, /`AUD-BEAM-INTERACTION-01`/);
assert.match(outline, /independent hand calculation or separate script calculation must not call or copy the production calculation function/);

console.log("Professional audit contract tests passed.");
