"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const concreteRegion = source.slice(
  source.indexOf("function calculateConcrete()"),
  source.indexOf("function setPrimaryPlane()")
);
const reoRegion = source.slice(
  source.indexOf("function populateReoData()"),
  source.indexOf("function centreNavigationButton(")
);

assert.match(concreteRegion, /reference: "AS 3600 Cl\. 8\.1\.3"/);
assert.match(concreteRegion, /const layerStateSubstitution/);
assert.match(concreteRegion, /substitution: `\|\$\{momentTerms\}\| \/ 1000`/);
assert.match(concreteRegion, /displayFixed\(shear\.kv, 6\)/);
assert.match(concreteRegion, /displayFixed\(shear\.rootFc, 5\)/);
assert.doesNotMatch(concreteRegion, /\.toFixed\(/);

assert.match(reoRegion, /function reoBasicFormulaSubstitution/);
assert.match(reoRegion, /displayFixed\(result\.k3, 4\)/);
assert.match(reoRegion, /L<sub>lap,min<\/sub> = 0\.058/);
assert.match(reoRegion, /L<sub>min<\/sub> = 0\.058/);
assert.doesNotMatch(reoRegion, /\.toFixed\(/);

console.log("Concrete and reinforcement trace contract tests passed.");
