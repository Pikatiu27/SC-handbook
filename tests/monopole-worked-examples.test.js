"use strict";

const assert = require("node:assert/strict");
const monopole = require("../monopole-capacity.js");

const relativeError = (actual, expected) => Math.abs(actual - expected) / Math.abs(expected);
const closeTo = (actual, expected, tolerance, label) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: ${actual} differs from ${expected}`
  );
};

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

// Independent exact regular-polygon reconstruction. This uses the closed-form
// centroidal inertia of a solid regular polygon, not the production vertex
// integration functions.
const independentPolygonExample = ({ sideCount, outsideAcrossFlats, thickness, yieldStress, insideBendRadius }) => {
  const halfAngle = Math.PI / sideCount;
  const outsideCircumradius = outsideAcrossFlats / (2 * Math.cos(halfAngle));
  const insideCircumradius = (outsideAcrossFlats / 2 - thickness) / Math.cos(halfAngle);
  const centralAngle = 2 * Math.PI / sideCount;
  const solidInertiaFactor = sideCount / 24
    * Math.sin(centralAngle)
    * (2 + Math.cos(centralAngle));
  const inertia = solidInertiaFactor
    * (outsideCircumradius ** 4 - insideCircumradius ** 4);
  const elasticModulus = inertia / outsideCircumradius;
  const effectiveBendRadius = Math.min(insideBendRadius, 4 * thickness);
  const clearFlatWidth = Math.tan(halfAngle)
    * (outsideAcrossFlats - thickness - 2 * effectiveBendRadius);
  const slenderness = clearFlatWidth / thickness * Math.sqrt(yieldStress / 200000);
  const beta = 360 / sideCount;
  const branch = beta >= 45
    ? { compactLimit: 1.53, coefficient: 1.42, slope: 0.194 }
    : beta >= 30
      ? { compactLimit: 1.41, coefficient: 1.45, slope: 0.220 }
      : { compactLimit: 1.26, coefficient: 1.42, slope: 0.233 };
  const permittedStress = slenderness <= branch.compactLimit
    ? yieldStress
    : branch.coefficient * yieldStress * (1 - branch.slope * slenderness);
  return {
    clearFlatWidth,
    inertia,
    elasticModulus,
    slenderness,
    permittedStress,
    moment: permittedStress * elasticModulus / 1e6
  };
};

[
  {
    label: "8-sided reduced-stress example",
    input: { sideCount: 8, outsideAcrossFlats: 900, thickness: 8, yieldStress: 350, insideBendRadius: 24 },
    expected: {
      clearFlatWidth: 349.596246643,
      elasticModulus: 5105050.806228,
      slenderness: 1.828082531,
      permittedStress: 320.739938506,
      moment: 1637.393681662
    },
    state: "Reduced stress"
  },
  {
    label: "16-sided full-yield example",
    input: { sideCount: 16, outsideAcrossFlats: 1200, thickness: 10, yieldStress: 350, insideBendRadius: 30 },
    expected: {
      clearFlatWidth: 224.770975139,
      elasticModulus: 11103921.019959,
      slenderness: 0.940284450,
      permittedStress: 350,
      moment: 3886.372356986
    },
    state: "Full yield stress"
  }
].forEach(example => {
  const independent = independentPolygonExample(example.input);
  const result = monopole.polygonMomentCapacity({
    sideCount: example.input.sideCount,
    outsideDimension: example.input.outsideAcrossFlats,
    thickness: example.input.thickness,
    yieldStress: example.input.yieldStress,
    insideBendRadius: example.input.insideBendRadius
  });

  closeTo(independent.clearFlatWidth, example.expected.clearFlatWidth, 1e-9, `${example.label} independent w`);
  closeTo(independent.elasticModulus, example.expected.elasticModulus, 1e-6, `${example.label} independent Zmin`);
  closeTo(independent.slenderness, example.expected.slenderness, 1e-9, `${example.label} independent lambda`);
  closeTo(independent.permittedStress, example.expected.permittedStress, 1e-9, `${example.label} independent Fa`);
  closeTo(independent.moment, example.expected.moment, 1e-9, `${example.label} independent M`);

  assert.equal(result.stress.localBucklingState, example.state, example.label);
  closeTo(result.clearFlatWidth, independent.clearFlatWidth, 1e-9, `${example.label} production w`);
  closeTo(result.properties.elasticModulus, independent.elasticModulus, 1e-6, `${example.label} production Zmin`);
  closeTo(result.slenderness, independent.slenderness, 1e-12, `${example.label} production lambda`);
  closeTo(result.stress.permittedStress, independent.permittedStress, 1e-9, `${example.label} production Fa`);
  closeTo(result.permittedMomentCapacity, independent.moment, 1e-9, `${example.label} production M`);
});

console.log("monopole worked-example tests passed");
