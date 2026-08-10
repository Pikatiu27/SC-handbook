"use strict";

const assert = require("node:assert/strict");
const { decimalHalfUp } = require("../engineering-number-format.js");

assert.equal(decimalHalfUp(0.575, 2), "0.58");
assert.equal(decimalHalfUp(1.005, 2), "1.01");
assert.equal(decimalHalfUp(9.995, 2), "10.00");
assert.equal(decimalHalfUp(-0.575, 2), "-0.58");
assert.equal(decimalHalfUp(0.0049, 2), "0.00");
assert.equal(decimalHalfUp(1.234e-7, 6), "0.000000");
assert.equal(decimalHalfUp(1250, 0), "1250");
assert.equal(decimalHalfUp(-0.0001, 2), "0.00");
assert.equal(decimalHalfUp(NaN, 2), "—");

console.log("Engineering decimal half-up formatting tests passed.");
