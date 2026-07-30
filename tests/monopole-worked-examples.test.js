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

// KISMAT ENGITECH KOP-1230 manufacturer product table:
// 12 m, 8-sided, 240/90 mm outside A/F, 3 mm, E355BR designation.
// The source does not separately publish numerical yield stress, bend radius
// or capacity. fy = 355 MPa and ri/tnom = 3.0 are explicit editable calculation
// inputs, and every derived value below is independently reconstructed before
// comparison with the production code.
const productExample = {
  id: "KOP-1230",
  sideCount: 8,
  length: 12,
  bottomAcrossFlats: 240,
  topAcrossFlats: 90,
  thickness: 3,
  yieldStress: 355,
  insideBendRadius: 9
};

const independentProductStation = outsideAcrossFlats => {
  const halfAngle = Math.PI / productExample.sideCount;
  const centralAngle = 2 * Math.PI / productExample.sideCount;
  const outsideCircumradius = outsideAcrossFlats / (2 * Math.cos(halfAngle));
  const insideCircumradius = (outsideAcrossFlats / 2 - productExample.thickness) / Math.cos(halfAngle);
  const solidAreaFactor = productExample.sideCount / 2 * Math.sin(centralAngle);
  const solidInertiaFactor = productExample.sideCount / 24
    * Math.sin(centralAngle)
    * (2 + Math.cos(centralAngle));
  const area = solidAreaFactor * (outsideCircumradius ** 2 - insideCircumradius ** 2);
  const inertia = solidInertiaFactor * (outsideCircumradius ** 4 - insideCircumradius ** 4);
  const elasticModulus = inertia / outsideCircumradius;
  const clearFlatWidth = Math.tan(halfAngle) * (
    outsideAcrossFlats
    - productExample.thickness
    - 2 * Math.min(productExample.insideBendRadius, 4 * productExample.thickness)
  );
  const slenderness = clearFlatWidth / productExample.thickness
    * Math.sqrt(productExample.yieldStress / 200000);
  const permittedStress = slenderness <= 1.53
    ? productExample.yieldStress
    : 1.42 * productExample.yieldStress * (1 - 0.194 * slenderness);
  return {
    area,
    inertia,
    elasticModulus,
    clearFlatWidth,
    slenderness,
    permittedStress,
    moment: permittedStress * elasticModulus / 1e6
  };
};

const productBottom = independentProductStation(productExample.bottomAcrossFlats);
const productTop = independentProductStation(productExample.topAcrossFlats);
const independentMass = 7850
  * productExample.length
  * 1000
  * (productBottom.area + productTop.area)
  / 2
  / 1e9;
const independentSelfWeight = independentMass * 9.80665 / 1000;
const independentCentreOfGravity = productExample.length
  * (productBottom.area + 2 * productTop.area)
  / (3 * (productBottom.area + productTop.area));

closeTo(productBottom.area, 2356.0467427781814, 1e-9, "KOP-1230 independent base A");
closeTo(productBottom.inertia, 17490959.305263974, 1e-6, "KOP-1230 independent base I");
closeTo(productBottom.elasticModulus, 134662.82755101015, 1e-9, "KOP-1230 independent base Zmin");
closeTo(productBottom.slenderness, 1.2739323128423685, 1e-12, "KOP-1230 independent base lambda");
closeTo(productBottom.moment, 47.805303780608604, 1e-12, "KOP-1230 independent base M");
closeTo(productTop.area, 864.8779182350222, 1e-9, "KOP-1230 independent top A");
closeTo(productTop.inertia, 866109.6214616665, 1e-6, "KOP-1230 independent top I");
closeTo(productTop.elasticModulus, 17781.798937322936, 1e-9, "KOP-1230 independent top Zmin");
closeTo(productTop.slenderness, 0.401375934183212, 1e-12, "KOP-1230 independent top lambda");
closeTo(productTop.moment, 6.312538622749642, 1e-12, "KOP-1230 independent top M");
closeTo(independentMass, 151.7055515337219, 1e-9, "KOP-1230 independent mass");
closeTo(independentSelfWeight, 1.4877232469481738, 1e-12, "KOP-1230 independent self-weight");
closeTo(independentCentreOfGravity, 5.074074074074067, 1e-12, "KOP-1230 independent centre of gravity");

const productAssembly = monopole.assembleSections([{
  id: productExample.id,
  form: "polygon",
  sideCount: productExample.sideCount,
  length: productExample.length,
  bottomDimension: productExample.bottomAcrossFlats,
  topDimension: productExample.topAcrossFlats,
  nominalThickness: productExample.thickness,
  thickness: productExample.thickness,
  yieldStress: productExample.yieldStress,
  insideBendRadius: productExample.insideBendRadius,
  dimensionBasis: "across-flats",
  overlap: 0
}]);
const productStations = monopole.buildStations(productAssembly, 0.5);
const productBaseResult = productStations.find(station => station.elevation === 0).active[0].capacity;
const productTopResult = productStations.find(station => station.elevation === 12).active[0].capacity;
const productMass = monopole.assemblyMassProperties(productAssembly);

closeTo(productBaseResult.properties.area, productBottom.area, 1e-9, "KOP-1230 production base A");
closeTo(productBaseResult.properties.inertia, productBottom.inertia, 1e-6, "KOP-1230 production base I");
closeTo(productBaseResult.properties.elasticModulus, productBottom.elasticModulus, 1e-9, "KOP-1230 production base Zmin");
closeTo(productBaseResult.slenderness, productBottom.slenderness, 1e-12, "KOP-1230 production base lambda");
closeTo(productBaseResult.permittedMomentCapacity, productBottom.moment, 1e-12, "KOP-1230 production base M");
closeTo(productTopResult.properties.area, productTop.area, 1e-9, "KOP-1230 production top A");
closeTo(productTopResult.properties.inertia, productTop.inertia, 1e-6, "KOP-1230 production top I");
closeTo(productTopResult.properties.elasticModulus, productTop.elasticModulus, 1e-9, "KOP-1230 production top Zmin");
closeTo(productTopResult.slenderness, productTop.slenderness, 1e-12, "KOP-1230 production top lambda");
closeTo(productTopResult.permittedMomentCapacity, productTop.moment, 1e-12, "KOP-1230 production top M");
closeTo(productMass.mass, independentMass, 1e-9, "KOP-1230 production mass");
closeTo(productMass.selfWeight, independentSelfWeight, 1e-12, "KOP-1230 production self-weight");
closeTo(productMass.centreOfGravity, independentCentreOfGravity, 1e-12, "KOP-1230 production centre of gravity");

console.log("monopole worked-example tests passed");
