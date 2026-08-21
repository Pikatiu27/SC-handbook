"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");

assert.match(outline, /### 15\.18 Web Local Update and Deployment Workflow/);
assert.match(outline, /### 15\.19 Professional Web Audit Protocol/);
assert.match(outline, /#### 15\.19\.0 Audit Control Flow/);
assert.match(outline, /#### 15\.19\.17 Audit Completion Gate/);
assert.doesNotMatch(outline, /#### 15\.18\.\d+ Audit/);
assert.doesNotMatch(outline, /audit protocol in Section 15\.18\b/);

assert.match(html, /<b>Reinforcement layout<\/b><small>Two-way assumes the same bar size in both directions\./);
assert.match(html, /<span>Reinforcement arrangement<\/span><select id="concreteReinforcementLayout"><option value="two-way">Two-way reinforcement<\/option>/);
assert.match(html, /class="concrete-input-row concrete-row-reinforcement"/);
assert.match(styles, /\.concrete-row-reinforcement \{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
assert.doesNotMatch(html, /id="concreteCrossingBar"|Perpendicular bar size/);
assert.match(html, /aria-label="Reinforcement mats parallel to bending"/);
assert.match(script, /<option value="none">None \/ plain concrete<\/option>/);
assert.match(script, /twoWayReinforcement \? bar : 0/);
assert.match(html, /id="layer1AutoReset" class="layer-depth-reset"[^>]*hidden>Auto<\/button>/);
assert.match(script, /function restoreConcreteLayerAutoDepth\(index\)/);
assert.match(script, /function initializeConcreteLayerState\(\)/);
assert.match(script, /const width = 1000/);
assert.doesNotMatch(html, /id="concreteReoDirection"|id="concreteWidth"/);
assert.doesNotMatch(script, /concreteDirectionalReinforcement|switchConcreteDirection/);
assert.match(html, /<b>Material properties<\/b>[\s\S]*?id="concreteFc"/);
assert.doesNotMatch(html, /One f'<sub>c<\/sub> for the checked section/);
assert.doesNotMatch(html, /id="concreteModeValue"|id="concreteWidthValue"|id="concreteDepthValue"|id="concreteStatusValue"/);
assert.doesNotMatch(html, /id="concretePhiNote"|id="concreteShearNote"|concrete-reo-source/);

assert.match(styles, /\.beam-section-figure \{[^}]*width: 180px;[^}]*min-width: 180px;[^}]*grid-template-rows: minmax\(108px, 1fr\) auto;/);
assert.match(styles, /\.beam-summary\.beam-selected-section \{[^}]*grid-template-columns: minmax\(0, 1fr\) 180px;/);
assert.match(script, /Entered geometry · active direction/);
assert.match(script, /Principal axes · active load case/);
assert.match(outline, /desktop section-guide column secondary at approximately `180 px`/);

assert.doesNotMatch(html, /class="section-tag"/);
assert.doesNotMatch(styles, /\.section-tag\b/);
assert.doesNotMatch(html, /id="reoAnchoragePathTag"|id="reoAnchorageResultTag"/);
assert.doesNotMatch(script, /reoAnchoragePathTag|reoAnchorageResultTag/);

assert.match(outline, /#### 15\.6\.5 Heading Hierarchy Without Locator Codes/);
assert.match(html, /id="connectionDetails">/);
assert.match(html, /id="monopoleMomentSection"[^>]*>/);
assert.match(html, /id="reoAssumptionsDetails">/);
assert.match(html, /id="screwDemandDetails">/);
assert.match(html, /class="section-heading"><div><h2>Bolt capacities<\/h2>/);
assert.match(html, /class="section-heading"><div><h2>Section properties<\/h2>/);
assert.match(html, /class="section-heading section-material-category-heading">\s*<div><h2>Material properties<\/h2>/);
assert.doesNotMatch(html, /data-locator=|data-section-code=/);
assert.doesNotMatch(styles, /data-locator|data-section-code/);
const reoCalculationDisclosure = html.match(/<details[^>]*id="reoCalculationDetails"[^>]*>/)?.[0] || "";
const sectionDerivationDisclosure = html.match(/<details[^>]*id="sectionDerivationsCard"[^>]*>/)?.[0] || "";
assert.doesNotMatch(reoCalculationDisclosure, /data-locator=/);
assert.doesNotMatch(sectionDerivationDisclosure, /data-locator=/);

const incompleteReference = /AS(?:\/NZS)? \d+[^\r\n"]*(?:;|,|and|to) Cl\./;
assert.doesNotMatch(html, incompleteReference);
assert.doesNotMatch(script, incompleteReference);

console.log("Page and outline contract tests passed.");
