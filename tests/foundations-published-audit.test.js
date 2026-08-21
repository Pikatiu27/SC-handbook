"use strict";

const assert = require("node:assert/strict");
require("../reo-calculation.js");

const { barByDesignation, calculateLap, calculateDevelopment } = globalThis.reoLapping;

const baseOptions = Object.freeze({
  memberRole: "standard",
  memberType: "wide",
  lapType: "contact",
  method: "basic",
  fc: 32,
  castingPosition: "other",
  materialCondition: "standard",
  cover: 40,
  clearSpacing: 1000,
  barGap: 0,
  doubleArea: false,
  halfSpliced: false,
  staggeredArrangement: false,
  refinedArrangement: "none",
  atrMinBasis: "beam-column",
  nf: 0,
  nbs: 1,
  atrTotal: 0,
  pressure: 0,
  pressureBasisConfirmed: false,
  pressureReference: "",
  transverseEffective: false,
  atrCountConfirmed: false,
  terminationType: "straight",
  barOrigin: "cast-in"
});

const barDesignations = ["N10", "N12", "N16", "N20", "N24", "N28", "N32", "N36", "N40"];
const publishedTable1 = Object.freeze({
  20: [0.82, 0.78, 0.73, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70],
  25: [0.90, 0.84, 0.76, 0.73, 0.70, 0.70, 0.70, 0.70, 0.70],
  30: [1.00, 0.90, 0.81, 0.76, 0.73, 0.71, 0.70, 0.70, 0.70],
  35: [1.00, 0.98, 0.85, 0.79, 0.75, 0.73, 0.71, 0.70, 0.70],
  40: [1.00, 1.00, 0.90, 0.82, 0.78, 0.75, 0.73, 0.71, 0.70],
  45: [1.00, 1.00, 0.96, 0.86, 0.81, 0.77, 0.75, 0.73, 0.71],
  50: [1.00, 1.00, 1.00, 0.90, 0.84, 0.79, 0.76, 0.74, 0.73],
  55: [1.00, 1.00, 1.00, 0.95, 0.87, 0.82, 0.78, 0.76, 0.74],
  60: [1.00, 1.00, 1.00, 1.00, 0.90, 0.84, 0.81, 0.78, 0.76],
  65: [1.00, 1.00, 1.00, 1.00, 0.94, 0.87, 0.83, 0.80, 0.77],
  70: [1.00, 1.00, 1.00, 1.00, 0.98, 0.90, 0.85, 0.82, 0.79],
  75: [1.00, 1.00, 1.00, 1.00, 1.00, 0.94, 0.88, 0.84, 0.81],
  80: [1.00, 1.00, 1.00, 1.00, 1.00, 0.97, 0.90, 0.86, 0.82],
  85: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.93, 0.88, 0.84],
  90: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.96, 0.90, 0.86],
  95: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.99, 0.93, 0.88],
  100: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.95, 0.90]
});

let table1Cells = 0;
for (const [cdText, expectedRow] of Object.entries(publishedTable1)) {
  const cd = Number(cdText);
  expectedRow.forEach((expected, index) => {
    const designation = barDesignations[index];
    const result = calculateLap(barByDesignation(designation), {
      ...baseOptions,
      cover: cd,
      clearSpacing: 2 * cd
    });
    const displayedMinimum = Number((0.7 / result.k3).toFixed(2));
    assert.equal(displayedMinimum, expected, `SRIA 2011 Table 1 ${designation}, cd=${cd} mm`);
    table1Cells += 1;
  });
}
assert.equal(table1Cells, 153, "The complete SRIA Table 1 grid must remain covered");

const publishedTable5 = [
  { label: "A1 fc20 c20", fc: 20, cover: 20, development: [41.9, 46.4, 53.2], lap: [52.4, 58.0, 66.5] },
  { label: "A1 fc25 c20", fc: 25, cover: 20, development: [37.5, 41.5, 47.6], lap: [46.9, 51.9, 59.5] },
  { label: "B1 fc32 c40", fc: 32, cover: 40, development: [29.0, 29.5, 39.8], lap: [32.2, 36.9, 49.7] },
  { label: "fc25 c60", fc: 25, cover: 60, development: [29.2, 30.2, 39.8], lap: [36.5, 37.7, 49.8] }
];
const table5Bars = ["N12", "N16", "N28"];
let table5Values = 0;
for (const publishedCase of publishedTable5) {
  table5Bars.forEach((designation, index) => {
    const bar = barByDesignation(designation);
    const adoptedCover = Math.max(publishedCase.cover, Math.ceil(bar.diameter / 5) * 5);
    const options = { ...baseOptions, fc: publishedCase.fc, cover: adoptedCover, clearSpacing: 1000 };
    const developmentRatio = calculateDevelopment(bar, options).rawLength / bar.diameter;
    const lapRatio = calculateLap(bar, options).rawLength / bar.diameter;
    assert.ok(Math.abs(developmentRatio - publishedCase.development[index]) <= 0.05, `${publishedCase.label} ${designation} development`);
    assert.ok(Math.abs(lapRatio - publishedCase.lap[index]) <= 0.05, `${publishedCase.label} ${designation} lap`);
    table5Values += 2;
  });
}
assert.equal(table5Values, 24, "All published SRIA Table 5 development/lap values must remain covered");

console.log("Foundations published audit tests passed (153 Table 1 cells + 24 Table 5 values)");
