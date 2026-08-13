"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

assert.match(html, /aria-label="Weld geometry inputs"[\s\S]*?class="input-group-fields four"/);
assert.match(html, /id="weldCallout"[^>]*>[\s\S]*?f<sub>uw<\/sub>/);
assert.match(app, /\$\("weldCallout"\)\.innerHTML = callouts\[type\] \|\| callouts\.fillet/);

assert.match(html, /Design capacity per unit effective length/);
assert.match(html, /Indicative parent-metal screen/);
assert.match(html, /Weld-throat resistance only/);
assert.match(html, /RHS \/ SHS connection plate/);
assert.match(app, /No design action entered/);
assert.match(app, /Total design weld capacity/);

assert.doesNotMatch(html, /Usual detail:/);
assert.doesNotMatch(html, /Tube \/ SSHS plate/);
assert.doesNotMatch(html, /fails closed/);
assert.doesNotMatch(html, />warning only</i);

console.log("Weld language tests passed.");
