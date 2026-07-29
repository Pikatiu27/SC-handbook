"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");

const beamFamilyButtons = [...html.matchAll(/class="beam-family(?: active)?"[^>]+data-beam-family="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(beamFamilyButtons, ["ub", "uc", "pfc", "chs", "rhs", "shs", "ea", "rod"]);
assert.match(html, /<select id="beamFamily"[^>]+hidden[^>]+tabindex="-1"/);
assert.match(script, /document\.querySelectorAll\("\.beam-family"\).*beamSource = "catalogue";.*setBeamFamily\(button\.dataset\.beamFamily\)/s);
assert.match(script, /document\.querySelectorAll\("\.beam-custom-mode"\).*setBeamSource\("custom"\)/s);
assert.match(html, />Custom Rod<\/button>/);
assert.doesNotMatch(html, /id="beamCustomFamily"/);
assert.doesNotMatch(html, /id="beamCustomDepth"/);
assert.match(html, /id="beamCustomRodDiameter"/);
assert.doesNotMatch(html, /class="beam-material-state"/);
assert.match(html, /id="beamMaterialStatus" class="input-source-status"/);
assert.doesNotMatch(html, /beam-type-switch/);
assert.match(script, /button\.setAttribute\("aria-pressed", String\(active\)\)/);
assert.match(styles, /\.beam-family-switch \{[^}]*grid-template-columns: repeat\(9, minmax\(0, 1fr\)\)/);
assert.match(outline, /one horizontal segmented row on the desktop Beam page/);
assert.doesNotMatch(html, /AS 4100:2020 Cl\./);
assert.doesNotMatch(script, /AS 4100:2020 Cl\./);
assert.match(script, /&lambda;<sub>v<\/sub> = \(d<sub>p<\/sub>\/t<sub>w<\/sub>\)&radic;\(f<sub>y,w<\/sub>\/250\)/);
assert.match(script, /&alpha;<sub>v<\/sub> = min\[1, \(82\/&lambda;<sub>v<\/sub>\)<sup>2<\/sup>\]/);
assert.match(script, /V<sub>v<\/sub> = min\[V<sub>u<\/sub>, 2V<sub>u<\/sub>\/\(0\.9 \+ &rho;\)\]/);
assert.match(script, /&phi;V<sub>v<\/sub> = 0\.90V<sub>v<\/sub>/);
assert.match(script, /&lambda;<sub>v<\/sub> = \(\$\{formatBeamNumber\(section\.d1, 1\)\}\/\$\{formatBeamNumber\(section\.tw, 1\)\}\)/);
assert.match(script, /V<sub>v<\/sub> = min\(\$\{fixed\(hollowWeb\.shearYieldCapacity\)\}, \$\{fixed\(hollowWeb\.nonUniformCapacity\)\}\) = \$\{fixed\(hollowWeb\.nominalCapacity\)\} kN/);
assert.match(script, /reference: "AS 4100 Cl\. 5\.2\.1"/);
assert.match(script, /reference: "AS 4100 Cl\. 5\.2\.2 to AS 4100 Cl\. 5\.2\.5"/);
assert.match(script, /reference: interactionAvailable \? "AS 4100 Cl\. 5\.12\.3" : ""/);
assert.match(html, /id="beamUtilisation">&mdash;<\/strong><small id="beamStatus" class="check">No design action/);
assert.match(script, /\$\("beamUtilisation"\)\.textContent = !hasDemand \? "—"/);
assert.match(script, /!momentAvailable \|\| !allDemandPathsAvailable \|\| !hasDemand \? "check"/);
assert.match(outline, /For every evaluated shear path, the trace must show the governing formula before substitution/);
assert.match(outline, /Do not skip from geometry directly to the final `phi Vv`/);

console.log("Beam calculation-trace contract tests passed.");
