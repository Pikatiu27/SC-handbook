"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const weldTypeSelector = html.match(/<select id="weldType"[\s\S]*?<\/select>/)?.[0] || "";
const weldPanel = html.match(/<section id="weldPanel"[\s\S]*?<section id="concretePanel"/)?.[0] || "";

assert.match(html, /aria-label="Weld geometry inputs"[\s\S]*?class="input-group-fields four"/);
assert.match(html, /id="weldCallout"[^>]*>[\s\S]*?f<sub>uw<\/sub>/);
assert.match(app, /\$\("weldCallout"\)\.innerHTML = callouts\[type\] \|\| callouts\.fillet/);

assert.match(html, /Design capacity per unit effective length/);
assert.match(html, /Indicative parent-metal screen/);
assert.match(html, /Weld-throat resistance only/);
assert.match(html, /Longitudinal fillet welds in RHS with wall thickness below 3 mm are not evaluated/);
assert.match(html, /RHS \/ SHS connection plate/);
assert.deepEqual([...weldTypeSelector.matchAll(/<option value="([^"]+)"/g)].map(match => match[1]), ["fillet", "cpbw", "ipbw"]);
assert.doesNotMatch(weldTypeSelector, /compound|plug|slot/i);
assert.match(html, /Other AS 4100 weld types/);
assert.match(html, /Compound weld[\s\S]*?Reference only \/ Not evaluated/);
assert.match(html, /Plug weld[\s\S]*?Reference only \/ Not evaluated/);
assert.match(html, /Slot weld[\s\S]*?Reference only \/ Not evaluated/);
assert.doesNotMatch(app, /compound:\s*\{/);
assert.match(html, /AS 1101\.3:2026/);
assert.match(html, /cranked arrow for bevel/);
assert.equal((weldPanel.match(/class="weld-figure-card"/g) || []).length, 12);
assert.match(weldPanel, /12 common structural-steel drawing symbols/);
assert.doesNotMatch(weldPanel, /Single-U butt weld|Single-J butt weld|Plug or slot weld|Spot or projection weld|Seam weld|Surfacing weld/);
assert.match(html, /Complete penetration from one side/);
assert.match(html, /class="svg-penetration-mark"/);
assert.match(html, /class="svg-groove-mark svg-square-mark" d="M105 50 L105 76 M117 50 L117 76"/);
assert.match(html, /class="svg-site-flag"/);
assert.match(html, /class="svg-penetration-mark" d="M96 56 A15 10 0 0 1 126 56 Z"/);
assert.match(html, /class="svg-groove-mark svg-backing-mark" d="M96 56 C101 38 121 38 126 56"/);
assert.match(app, /No design action entered/);
assert.match(app, /Invalid design action/);
assert.match(app, /Total design weld capacity/);
assert.match(html, /Optional design checks/);
assert.doesNotMatch(html, /Optional factors and screening inputs/);
assert.doesNotMatch(weldPanel, /Design action check/);
assert.match(html, /id="weldParentCheckEnabled" type="checkbox"/);
assert.match(html, /id="weldParentThickness"[^>]*placeholder="Enter thickness"/);
assert.doesNotMatch(html, /id="weldParentThickness"[^>]*value="10"/);
assert.match(html, /id="weldKrValue"/);
assert.match(html, /id="weldActionCapacity"/);
assert.match(app, /const parentCheckActive = parentCheckEnabled && parentThickness > 0/);
assert.match(app, /"weldParentThickness"\)\.disabled = !parentCheckEnabled/);

assert.doesNotMatch(html, /Usual detail:/);
assert.doesNotMatch(html, /\bCFW\b/);
assert.doesNotMatch(html, /a<sub>w<\/sub>/);
assert.doesNotMatch(html, /id="weldRuns"[^>]*max=/);
assert.match(html, /minimum and maximum fillet-weld size requirements are not evaluated/);
assert.match(html, /Schematic only, not to scale/);
assert.doesNotMatch(html, /Tube \/ SSHS plate/);
assert.doesNotMatch(html, /fails closed/);
assert.doesNotMatch(html, />warning only</i);

console.log("Weld language tests passed.");
