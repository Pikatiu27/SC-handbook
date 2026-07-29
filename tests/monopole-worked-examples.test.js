"use strict";

const assert = require("node:assert/strict");
const monopole = require("../monopole-capacity.js");

const relativeError = (actual, expected) => Math.abs(actual - expected) / Math.abs(expected);

// Austube Mills, Design Capacity Tables for Structural Steel Hollow Sections
// (August 2013), Table 8-2: published C350L0 CHS design section capacities.
[
  {
    designation: "165.1 x 3.5 CHS",
    diameter: 165.1,
    thickness: 3.5,
    publishedMass: 13.9,
    publishedDesignMoment: 27.3,
    sectionClass: "Non-compact"
  },
  {
    designation: "406.4 x 12.7 CHS",
    diameter: 406.4,
    thickness: 12.7,
    publishedMass: 123,
    publishedDesignMoment: 620,
    sectionClass: "Compact"
  },
  {
    designation: "508.0 x 6.4 CHS",
    diameter: 508,
    thickness: 6.4,
    publishedMass: 79.2,
    publishedDesignMoment: 408,
    sectionClass: "Non-compact"
  }
].forEach(example => {
  const result = monopole.circularMomentCapacity(
    example.diameter,
    example.thickness,
    350,
    "CF"
  );
  const massPerMetre = result.properties.area * 7850 / 1e6;

  assert.equal(result.sectionClass, example.sectionClass, example.designation);
  assert.ok(
    relativeError(result.designMomentCapacity, example.publishedDesignMoment) <= 0.005,
    `${example.designation}: ${result.designMomentCapacity} kN.m differs from published ${example.publishedDesignMoment} kN.m`
  );
  assert.ok(
    relativeError(massPerMetre, example.publishedMass) <= 0.005,
    `${example.designation}: ${massPerMetre} kg/m differs from published ${example.publishedMass} kg/m`
  );
});

// ASCE/SEI 48-19 Appendix B approximate equations provide an independent
// check on the exact sharp-corner geometry used by the calculator.
const asce12AppendixExample = outsideDimension => {
  const thickness = 10;
  const yieldStress = 350;
  const elasticModulus = 200000;
  const meanDiameter = outsideDimension - thickness;
  const effectiveBendRadius = 30;
  const flatWidth = 0.268 * (meanDiameter - 2 * effectiveBendRadius);
  const slenderness = flatWidth / thickness * Math.sqrt(yieldStress / elasticModulus);
  const permittedStress = slenderness <= 1.41
    ? yieldStress
    : slenderness <= 2.20
      ? 1.45 * yieldStress * (1 - 0.220 * slenderness)
      : null;
  const inertia = 0.411 * meanDiameter ** 3 * thickness;
  const extremeDistance = 0.518 * outsideDimension;
  return {
    slenderness,
    permittedStress,
    moment: permittedStress === null ? null : permittedStress * inertia / extremeDistance / 1e6
  };
};

[
  { outsideDimension: 1000, state: "Full yield stress" },
  { outsideDimension: 1600, state: "Reduced stress" }
].forEach(example => {
  const appendix = asce12AppendixExample(example.outsideDimension);
  const result = monopole.polygonMomentCapacity({
    sideCount: 12,
    outsideDimension: example.outsideDimension,
    thickness: 10,
    yieldStress: 350,
    insideBendRadius: 30
  });

  assert.equal(result.stress.checked, true);
  assert.equal(result.stress.localBucklingState, example.state);
  assert.ok(relativeError(result.slenderness, appendix.slenderness) <= 0.001);
  assert.ok(relativeError(result.stress.permittedStress, appendix.permittedStress) <= 0.001);
  assert.ok(relativeError(result.permittedMomentCapacity, appendix.moment) <= 0.003);
});

const outsideRange = monopole.polygonMomentCapacity({
  sideCount: 12,
  outsideDimension: 2100,
  thickness: 10,
  yieldStress: 350,
  insideBendRadius: 30
});
assert.equal(outsideRange.stress.checked, false);
assert.equal(outsideRange.permittedMomentCapacity, null);
assert.ok(outsideRange.slenderness > 2.20);
