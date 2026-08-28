"use strict";

const assert = require("node:assert/strict");
const ConcreteSectionCalculation = require("../concrete-section-calculation.js");

const below = ConcreteSectionCalculation.footingProjectionScreen({ projection: 700, depth: 500 });
assert.equal(below.ratio, 1.4);
assert.equal(below.nonFlexuralProportion, true);

const boundary = ConcreteSectionCalculation.footingProjectionScreen({ projection: 750, depth: 500 });
assert.equal(boundary.ratio, 1.5);
assert.equal(boundary.nonFlexuralProportion, false);

const above = ConcreteSectionCalculation.footingProjectionScreen({ projection: 1000, depth: 500 });
assert.equal(above.ratio, 2);
assert.equal(above.nonFlexuralProportion, false);

for (const input of [
  { projection: 0, depth: 500 },
  { projection: -1, depth: 500 },
  { projection: 700, depth: 0 },
  { projection: Number.NaN, depth: 500 }
]) {
  assert.throws(() => ConcreteSectionCalculation.footingProjectionScreen(input), RangeError);
}

console.log("Concrete non-flexural region screening tests passed.");
