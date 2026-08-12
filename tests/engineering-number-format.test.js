"use strict";

const assert = require("node:assert/strict");
const { decimalHalfUp, decimalHalfUpSignificant } = require("../engineering-number-format.js");

assert.equal(decimalHalfUp(0.575, 2), "0.58");
assert.equal(decimalHalfUp(1.005, 2), "1.01");
assert.equal(decimalHalfUp(9.995, 2), "10.00");
assert.equal(decimalHalfUp(-0.575, 2), "-0.58");
assert.equal(decimalHalfUp(0.0049, 2), "0.00");
assert.equal(decimalHalfUp(1.234e-7, 6), "0.000000");
assert.equal(decimalHalfUp(1250, 0), "1250");
assert.equal(decimalHalfUp(-0.0001, 2), "0.00");
assert.equal(decimalHalfUp(NaN, 2), "—");

assert.equal(decimalHalfUpSignificant(569.5, 3), "570");
assert.equal(decimalHalfUpSignificant(56.95, 3), "57");
assert.equal(decimalHalfUpSignificant(5.695, 3), "5.7");
assert.equal(decimalHalfUpSignificant(0.005695, 3), "0.0057");
assert.equal(decimalHalfUpSignificant(-569.5, 3), "-570");
assert.equal(decimalHalfUpSignificant(9995, 3), "10000");
assert.equal(decimalHalfUpSignificant(0, 3), "0");
assert.equal(decimalHalfUpSignificant(NaN, 3), "—");

console.log("Engineering decimal half-up formatting tests passed.");
