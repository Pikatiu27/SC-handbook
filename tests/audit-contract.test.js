"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");
const traceability = fs.readFileSync(path.join(root, "REFERENCE_TRACEABILITY.md"), "utf8");
const drawingAdoptionPath = path.join(root, "engineering", "drawing-standard-adoption.json");
const drawingAdoption = JSON.parse(fs.readFileSync(drawingAdoptionPath, "utf8"));
const calculateWeldSource = script.slice(
  script.indexOf("function calculateWeld()"),
  script.indexOf("const beamFamilyDefinitions")
);
const calculateBoltSource = script.slice(
  script.indexOf("function calculateBolt()"),
  script.indexOf("function updateBoltMode()")
);
const calculateConcreteSource = script.slice(
  script.indexOf("function calculateConcrete()"),
  script.indexOf("const screwPileData")
);

assert.match(html, /Concrete Pad Section<\/h2><\/div><span class="tool-status">For Review · section capacity only<\/span>/);
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
assert.match(html, /<script src="member-capacity\.js\?v=[^"]+"><\/script>/);
assert.match(html, /<script src="screw-demand\.js\?v=[^"]+"><\/script>/);
assert.match(script, /MemberCapacity\.calculate\(/);
assert.match(script, /ScrewDemand\.distribute\(/);
assert.doesNotMatch(script, /function compressionReduction\(/);
assert.match(script, /comparisonBasis === "project-source-missing"/);
assert.match(script, /comparisonBasis === "project-basis-mismatch"/);
assert.match(script, /Manufacturer values are not compared automatically/);
assert.match(script, /type === "cpbw"[\s\S]*?"Not evaluated"/);
assert.match(calculateWeldSource, /effective weld length l_w must be greater than zero/);
assert.match(calculateWeldSource, /effective weld lines must be a positive whole number/);
assert.match(calculateWeldSource, /IPBW design throat a_w must be greater than zero/);
assert.match(calculateWeldSource, /title: "Input validation"[\s\S]*?result: "Not evaluated"/);
assert.match(calculateBoltSource, /Number\.isInteger\(countInput\) && countInput >= 1 && countInput <= 100/);
assert.match(calculateBoltSource, /groupShearCapacity"\)\.textContent = countValid \?[\s\S]*?"Not evaluated"/);
assert.match(calculateBoltSource, /title: "Bolt group shear capacity"[\s\S]*?result: countValid \?[\s\S]*?"Not evaluated"/);
assert.match(calculateConcreteSource, /fcInput >= 20 && fcInput <= 120/);
assert.match(calculateConcreteSource, /concreteStatusValue"\)\.textContent = fcValid \? "Review required" : "Invalid input"/);
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
  "AUD-AXIAL-COMP-02",
  "AUD-AXIAL-TENSION-02",
  "AUD-AXIAL-INPUT-01",
  "AUD-AXIAL-DISPLAY-01",
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
assert.match(traceability, /`AXIAL-EX-COMP-01`/);
assert.match(traceability, /`AXIAL-REP-COMP-01`/);
assert.match(traceability, /`AXIAL-EX-TENSION-01`/);
assert.match(traceability, /`AXIAL-REP-TENSION-01`/);
assert.match(outline, /independent hand calculation or separate script calculation must not call or copy the production calculation function/);
assert.match(outline, /member-capacity\.js/);
assert.match(outline, /screw-demand\.js/);
assert.match(outline, /Drawing Package Adoption and Reference Rule/);
assert.match(outline, /engineering\/drawing-standard-adoption\.json/);
assert.match(outline, /Do not copy the Drawing package Markdown into this repository/);
assert.equal(drawingAdoption.adoption_id, "SC-HANDBOOK-UWEDS-001");
assert.equal(drawingAdoption.package.version, "1.10.0");
assert.equal(drawingAdoption.package.adoption_mode, "GOVERNED_SUBSET");
assert.match(drawingAdoption.package.pin_value, /SHA256-7d71cfa493defd5504966d6e20cc271f34485a5fc8e6b80f7a1340bf8611c7f1$/);
[
  "00_UNIFIED_WEB_ENGINEERING_DRAWING_STANDARD_V1.md",
  "PROJECT_ADOPTION_GUIDE.md",
  "PACKAGE_MANIFEST.md",
  "profiles/AU_STRUCTURAL_WEB_DEFAULT.yaml",
  "rules/web_release_rules.yaml",
  "tests/PROJECT_ADOPTION_CHECKLIST.md"
].forEach(module => assert.ok(drawingAdoption.adopted_modules.includes(module), `Missing adopted drawing module ${module}`));
assert.equal(drawingAdoption.pre_drawing_case_review.required, true);
assert.equal(drawingAdoption.release_boundary, "PRIVATE_REVIEW_ONLY");

console.log("Professional audit contract tests passed.");
