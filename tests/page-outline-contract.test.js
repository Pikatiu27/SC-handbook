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

const productDataTags = html.match(/<span class="section-tag">PRODUCT DATA<\/span>/g) || [];
assert.ok(productDataTags.length >= 4, "Expected PRODUCT DATA tags for bolt lookups and both foundation selectors.");
assert.doesNotMatch(html, /<span class="section-tag">SELECTED PRODUCT<\/span>/);

const incompleteReference = /AS(?:\/NZS)? \d+[^\r\n"]*(?:;|,|and|to) Cl\./;
assert.doesNotMatch(html, incompleteReference);
assert.doesNotMatch(script, incompleteReference);

console.log("Page and outline contract tests passed.");
