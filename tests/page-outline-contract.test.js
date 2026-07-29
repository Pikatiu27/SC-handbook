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

assert.match(html, /<b>Reinforcement geometry<\/b><small>Cover, stacking and crossing-bar geometry\.<\/small>/);
assert.match(html, /class="concrete-input-row concrete-row-reinforcement"/);
assert.match(styles, /\.concrete-row-reinforcement \{[^}]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
assert.match(html, /<b>Material properties<\/b><small>One f'<sub>c<\/sub> for the checked section\.<\/small>[\s\S]*?id="concreteFc"/);
assert.doesNotMatch(
  html,
  /<b>Material properties<\/b><small>One f'<sub>c<\/sub> for the checked section\.<\/small>[\s\S]*?id="concreteCover"[\s\S]*?<\/section>/
);

const productDataTags = html.match(/<span class="section-tag">PRODUCT DATA<\/span>/g) || [];
assert.ok(productDataTags.length >= 4, "Expected PRODUCT DATA tags for bolt lookups and both foundation selectors.");
assert.doesNotMatch(html, /<span class="section-tag">SELECTED PRODUCT<\/span>/);

const incompleteReference = /AS(?:\/NZS)? \d+[^\r\n"]*(?:;|,|and|to) Cl\./;
assert.doesNotMatch(html, incompleteReference);
assert.doesNotMatch(script, incompleteReference);

console.log("Page and outline contract tests passed.");
