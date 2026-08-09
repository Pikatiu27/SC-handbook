"use strict";

const assert = require("node:assert/strict");
const monopole = require("../monopole-capacity.js");

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `${actual} != ${expected}`
  );
};

const nonDecreasing = (values, label) => {
  values.slice(1).forEach((value, index) => {
    assert.ok(value + 1e-9 >= values[index], `${label} decreased at sample ${index + 1}.`);
  });
};

const circle = monopole.circularProperties(1000, 10);
close(circle.insideAcrossFlats, 980);
close(circle.area, Math.PI / 4 * (1000 ** 2 - 980 ** 2));
close(circle.inertia, Math.PI / 64 * (1000 ** 4 - 980 ** 4));
close(circle.elasticModulus, circle.inertia / 500);
close(circle.plasticModulus, (1000 ** 3 - 980 ** 3) / 6);

const compactCircle = monopole.circularMomentCapacity(500, 10, 250, "CF");
assert.equal(compactCircle.sectionClass, "Compact");
close(compactCircle.slenderness, 50);
close(compactCircle.effectiveModulus, Math.min(compactCircle.properties.plasticModulus, 1.5 * compactCircle.properties.elasticModulus));
assert.equal(monopole.circularMomentCapacity(420, 10, 250, "LW").sectionClass, "Compact");
assert.equal(monopole.circularMomentCapacity(420.001, 10, 250, "LW").sectionClass, "Non-compact");

const nonCompactCircle = monopole.circularMomentCapacity(800, 8, 250, "CF");
assert.equal(nonCompactCircle.sectionClass, "Non-compact");
close(nonCompactCircle.slenderness, 100);

const slenderCircle = monopole.circularMomentCapacity(1300, 10, 250, "CF");
assert.equal(slenderCircle.sectionClass, "Slender");
close(
  slenderCircle.effectiveModulus,
  Math.min(
    slenderCircle.properties.elasticModulus * Math.sqrt(120 / 130),
    slenderCircle.properties.elasticModulus * (240 / 130) ** 2
  )
);
close(
  slenderCircle.designMomentCapacity,
  0.9 * 250 * slenderCircle.effectiveModulus / 1e6
);

const compactCompression = monopole.circularCompressionSectionCapacity(500, 10, 250);
close(compactCompression.slenderness, 50);
close(compactCompression.effectiveDiameter, 500);
close(compactCompression.formFactor, 1);
close(compactCompression.designSectionCapacity, 0.9 * compactCompression.properties.area * 250 / 1000);

const austubeCompression = monopole.circularCompressionSectionCapacity(508, 6.4, 350);
const austubeLambdaE = 508 / 6.4 * 350 / 250;
const austubeEffectiveDiameter = 508 * Math.sqrt(82 / austubeLambdaE);
const austubeEffectiveArea = austubeCompression.properties.area - Math.PI * (508 - austubeEffectiveDiameter) * 6.4;
close(austubeCompression.slenderness, austubeLambdaE);
close(austubeCompression.effectiveDiameter, austubeEffectiveDiameter);
close(austubeCompression.formFactor, austubeEffectiveArea / austubeCompression.properties.area);
close(austubeCompression.formFactor, 0.857, 0.001);

const capacityProfileSections = monopole.overallProfileSections({
  height: 12,
  bottomDimension: 500,
  topDimension: 250
}, [
  { id: "T1", topElevation: 6, form: "circular", dimensionBasis: "diameter", nominalThickness: 10, thickness: 10, yieldStress: 350, fabricationCategory: "LW" },
  { id: "T2", topElevation: 12, form: "circular", dimensionBasis: "diameter", nominalThickness: 8, thickness: 8, yieldStress: 350, fabricationCategory: "LW" }
]);
const capacityProfileStations = monopole.buildStations(monopole.assembleSections(capacityProfileSections), 0.5);
assert.equal(capacityProfileStations.length, 25);
assert.equal(capacityProfileStations[0].elevation, 12);
assert.equal(capacityProfileStations.at(-1).elevation, 0);
assert.equal(capacityProfileStations.find(station => station.elevation === 6).active.length, 2);
capacityProfileStations.forEach(station => station.active.forEach(state => {
  const compression = monopole.circularCompressionSectionCapacity(state.outsideDimension, state.thickness, state.yieldStress);
  assert.ok(Number.isFinite(compression.designSectionCapacity));
  assert.ok(Number.isFinite(state.designResistance));
}));

["LW", "HW", "CF", "HR", "SR"].forEach(category => {
  [250, 350, 450].forEach(yieldStress => {
    const values = [];
    for (let diameter = 100; diameter <= 3000; diameter += 10) {
      values.push(monopole.circularMomentCapacity(diameter, 10, yieldStress, category).designMomentCapacity);
    }
    nonDecreasing(values, `Circular ${category}, fy = ${yieldStress} MPa`);
  });
});

[
  ["200", 8, 200],
  ["250", 8, 280],
  ["250", 8.0001, 260],
  ["300", 12, 310],
  ["300", 12.0001, 300],
  ["350", 20, 350],
  ["350", 20.0001, 340],
  ["350", 80, 340],
  ["350", 80.0001, 330],
  ["350", 150.0001, 320],
  ["400", 50, 360],
  ["450", 50, 400],
  ["WR350", 80, 340]
].forEach(([grade, thickness, expected]) => {
  assert.equal(monopole.plateYieldStress(grade, thickness), expected);
});
assert.throws(() => monopole.plateYieldStress("350", 4.499), /4\.5 mm/);
assert.equal(monopole.plateYieldStress("250", 200), 220);
assert.throws(() => monopole.plateYieldStress("250", 200.001), /200 mm/);
assert.throws(() => monopole.plateYieldStress("450", 50.001), /does not specify/);
assert.throws(() => monopole.plateYieldStress("500", 10), /outside AS\/NZS 3678/);

const square = monopole.polygonProperties(4, 1000, 10, "across-flats");
const outerSquareSide = 1000;
const innerSquareSide = 980;
close(square.area, outerSquareSide ** 2 - innerSquareSide ** 2);
close(square.inertia, (outerSquareSide ** 4 - innerSquareSide ** 4) / 12);
close(square.outsideAcrossCorners, 1000 * Math.sqrt(2));
close(square.insideAcrossFlats, 980);

const octagonAf = monopole.polygonProperties(8, 1000, 10, "across-flats");
const octagonAc = monopole.polygonProperties(8, octagonAf.outsideAcrossCorners, 10, "across-corners");
close(octagonAf.area, octagonAc.area);
close(octagonAf.inertia, octagonAc.inertia);

[
  [4, 0.666],
  [6, 0.481],
  [8, 0.438],
  [12, 0.411],
  [16, 0.403]
].forEach(([sideCount, inertiaCoefficient]) => {
  const exact = monopole.polygonProperties(sideCount, 1000, 10, "across-flats");
  const appendixApproximation = inertiaCoefficient * (1000 - 10) ** 3 * 10;
  close(exact.inertia, appendixApproximation, 0.002);
});

const octagonFlat = monopole.polygonFlatWidth(8, 1000, 10, 30);
close(octagonFlat.clearFlatWidth, Math.tan(Math.PI / 8) * (1000 - 10 - 2 * 30));
assert.equal(octagonFlat.effectiveRadius, 30);
assert.equal(octagonFlat.radiusCappedAtFourThicknesses, false);
const cappedOctagonFlat = monopole.polygonFlatWidth(8, 1000, 10, 60);
close(cappedOctagonFlat.clearFlatWidth, Math.tan(Math.PI / 8) * (1000 - 10 - 2 * 40));
assert.equal(cappedOctagonFlat.effectiveRadius, 40);
assert.equal(cappedOctagonFlat.radiusCappedAtFourThicknesses, true);

[
  [4, 1.53, 350],
  [6, 2.06, 1.42 * 350 * (1 - 0.194 * 2.06)],
  [8, 1.53, 350],
  [8, 2.06, 1.42 * 350 * (1 - 0.194 * 2.06)],
  [12, 1.41, 350],
  [12, 2.20, 1.45 * 350 * (1 - 0.220 * 2.20)],
  [16, 1.26, 350],
  [16, 2.42, 1.42 * 350 * (1 - 0.233 * 2.42)]
].forEach(([n, lambda, expectedStress]) => {
  const result = monopole.polygonStressLimit(n, lambda, 350);
  assert.equal(result.checked, true);
  close(result.permittedStress, expectedStress);
});
assert.equal(monopole.polygonStressLimit(8, 2.060001, 350).checked, false);
assert.equal(monopole.polygonStressLimit(12, 2.200001, 350).checked, false);
assert.equal(monopole.polygonStressLimit(16, 2.420001, 350).checked, false);
assert.throws(() => monopole.polygonStressLimit(17, 1, 350), /no greater than 16/);

[4, 6, 8, 12, 16].forEach(sideCount => {
  [250, 350, 450].forEach(yieldStress => {
    const values = [];
    for (let outsideDimension = 100; outsideDimension <= 3000; outsideDimension += 10) {
      const result = monopole.polygonMomentCapacity({
        sideCount,
        outsideDimension,
        thickness: 10,
        yieldStress,
        insideBendRadius: 30
      });
      if (Number.isFinite(result.permittedMomentCapacity)) values.push(result.permittedMomentCapacity);
    }
    assert.ok(values.length > 1, `Polygon ${sideCount}, fy = ${yieldStress} MPa requires multiple valid samples.`);
    nonDecreasing(values, `Polygon ${sideCount}, fy = ${yieldStress} MPa`);
  });
});

const polygonCapacity = monopole.polygonMomentCapacity({
  sideCount: 12,
  outsideDimension: 1000,
  thickness: 10,
  yieldStress: 350,
  insideBendRadius: 30
});
close(
  polygonCapacity.permittedMomentCapacity,
  polygonCapacity.stress.permittedStress * polygonCapacity.properties.elasticModulus / 1e6
);
assert.equal(polygonCapacity.method, "ASCE/SEI 48-19 Cl. 5.2.3.2.1; ASCE/SEI 48-19 Cl. 5.2.5");
assert.throws(() => monopole.polygonMomentCapacity({
  sideCount: 12,
  outsideDimension: 1000,
  thickness: 10,
  yieldStress: 350
}), /Actual inside bend radius/);

const assembly = monopole.assembleSections([
  {
    id: "S1",
    form: "circular",
    length: 12,
    bottomDimension: 1200,
    topDimension: 900,
    thickness: 12,
    yieldStress: 350,
    fabricationCategory: "LW"
  },
  {
    id: "S2",
    form: "circular",
    length: 10,
    overlap: 1.5,
    bottomDimension: 880,
    topDimension: 600,
    thickness: 8,
    yieldStress: 350,
    fabricationCategory: "LW"
  },
  {
    id: "S3",
    form: "polygon",
    sideCount: 12,
    dimensionBasis: "across-flats",
    length: 9,
    overlap: 1,
    bottomDimension: 580,
    topDimension: 350,
    thickness: 6,
    yieldStress: 350,
    insideBendRadius: 18
  }
]);
close(assembly.sections[0].start, 0);
close(assembly.sections[0].end, 12);
close(assembly.sections[1].start, 10.5);
close(assembly.sections[1].end, 20.5);
close(assembly.sections[2].start, 19.5);
close(assembly.height, 28.5);
close(monopole.localDimension(assembly.sections[1].section, 1.5), 838);

const overallBands = monopole.overallProfileSections({
  height: 30,
  bottomDimension: 1200,
  topDimension: 300
}, [
  { topElevation: 10, nominalThickness: 12, thickness: 12, yieldStress: 350 },
  { topElevation: 20, nominalThickness: 10, thickness: 10, yieldStress: 350 },
  { topElevation: 30, nominalThickness: 8, thickness: 8, yieldStress: 350 }
]);
assert.deepEqual(overallBands.map(band => band.id), ["T1", "T2", "T3"]);
assert.deepEqual(overallBands.map(band => band.length), [10, 10, 10]);
assert.deepEqual(overallBands.map(band => band.bottomDimension), [1200, 900, 600]);
assert.deepEqual(overallBands.map(band => band.topDimension), [900, 600, 300]);
const overallAssembly = monopole.assembleSections(overallBands);
close(overallAssembly.height, 30);
assert.equal(monopole.sectionStatesAtElevation(overallAssembly, 10).length, 2);
assert.equal(monopole.sectionStatesAtElevation(overallAssembly, 20).length, 2);
assert.equal(monopole.sectionStatesAtElevation(overallAssembly, 10.25).length, 1);
assert.throws(() => monopole.sectionStatesAtElevation(overallAssembly, 30.001), /must not exceed/);
assert.equal(monopole.buildStations(overallAssembly, 0.5).find(station => station.elevation === 10).active.length, 2);
assert.equal(monopole.buildStations(overallAssembly, 0.5).find(station => station.elevation === 20).active.length, 2);
assert.throws(() => monopole.overallProfileSections(
  { height: 30, bottomDimension: 1200, topDimension: 300 },
  [{ topElevation: 20 }, { topElevation: 10 }, { topElevation: 30 }]
), /must increase/);
assert.throws(() => monopole.overallProfileSections(
  { height: 30, bottomDimension: 1200, topDimension: 300 },
  [{ topElevation: 20 }]
), /must terminate/);

const stations = monopole.buildStations(assembly, 0.5);
assert.equal(stations[0].elevation, 28.5);
assert.equal(stations.at(-1).elevation, 0);
assert.equal(stations.find(station => station.elevation === 11).active.length, 2);
assert.equal(stations.find(station => station.elevation === 20).active.length, 2);
assert.ok(stations.every((station, index) => index === 0 || station.elevation < stations[index - 1].elevation));

const floatingBoundaryAssembly = monopole.assembleSections([
  {
    id: "F1",
    form: "circular",
    length: 0.1 + 0.2,
    bottomDimension: 500,
    topDimension: 490,
    thickness: 5,
    yieldStress: 350
  },
  {
    id: "F2",
    form: "circular",
    length: 1,
    overlap: 0.1,
    bottomDimension: 480,
    topDimension: 400,
    thickness: 5,
    yieldStress: 350
  }
]);
const floatingBoundaryStations = monopole.buildStations(floatingBoundaryAssembly, 0.2);
assert.equal(
  floatingBoundaryStations.filter(station => Math.abs(station.elevation - 0.2) < 1e-8).length,
  1
);

const constantAssembly = monopole.assembleSections([{
  id: "C1",
  form: "circular",
  length: 10,
  bottomDimension: 1000,
  topDimension: 1000,
  thickness: 10,
  yieldStress: 350
}]);
const constantMass = monopole.assemblyMassProperties(constantAssembly);
close(constantMass.mass, monopole.STEEL_DENSITY * circle.area * 10000 / 1e9);
close(constantMass.centreOfGravity, 5);
close(constantMass.selfWeight, constantMass.mass * monopole.GRAVITY / 1000);

const taperedAssembly = monopole.assembleSections([{
  id: "T1",
  form: "circular",
  length: 10,
  bottomDimension: 1000,
  topDimension: 600,
  thickness: 10,
  yieldStress: 350
}]);
const taperedMass = monopole.assemblyMassProperties(taperedAssembly);
const taperedAreaStart = monopole.circularProperties(1000, 10).area;
const taperedAreaEnd = monopole.circularProperties(600, 10).area;
close(taperedMass.mass, monopole.STEEL_DENSITY * 10000 * (taperedAreaStart + taperedAreaEnd) / 2 / 1e9);
close(taperedMass.centreOfGravity, 10 * (taperedAreaStart + 2 * taperedAreaEnd) / (3 * (taperedAreaStart + taperedAreaEnd)));

const reducedDesignThicknessAssembly = monopole.assembleSections([{
  id: "TD",
  form: "circular",
  length: 10,
  bottomDimension: 1000,
  topDimension: 1000,
  nominalThickness: 10,
  thickness: 8,
  yieldStress: 350
}]);
const reducedDesignMass = monopole.assemblyMassProperties(reducedDesignThicknessAssembly);
close(reducedDesignMass.mass, constantMass.mass);
close(
  monopole.sectionCapacityAt(reducedDesignThicknessAssembly.sections[0].section, 0).properties.area,
  monopole.circularProperties(1000, 8).area
);

const overlappedAssembly = monopole.assembleSections([
  {
    id: "L",
    form: "circular",
    length: 10,
    bottomDimension: 1000,
    topDimension: 1000,
    thickness: 10,
    yieldStress: 350
  },
  {
    id: "U",
    form: "circular",
    length: 10,
    overlap: 2,
    bottomDimension: 950,
    topDimension: 950,
    thickness: 10,
    yieldStress: 350
  }
]);
const overlapMass = monopole.assemblyMassProperties(overlappedAssembly);
const expectedUpperArea = monopole.circularProperties(950, 10).area;
close(overlapMass.mass, monopole.STEEL_DENSITY * (circle.area + expectedUpperArea) * 10000 / 1e9);

const slip = monopole.slipOverlapScreen(overlappedAssembly.sections[0], overlappedAssembly.sections[1]);
close(slip.inscribedDiameter, 1000);
close(slip.lowerOverlapStartInscribedDiameter, 1000);
close(slip.upperOverlapStartInscribedDiameter, 950);
close(slip.requiredDesignOverlap, 1.5);
close(slip.minimumConstructedOverlap, 1.35);
assert.equal(slip.designState, "Meets prescribed design overlap");
assert.equal(slip.constructedState, "Drawing value - installation not verified");
assert.equal(slip.jointCapacityState, "Not evaluated");

const taperedSlipAssembly = monopole.assembleSections([
  {
    id: "TL",
    form: "circular",
    length: 10,
    bottomDimension: 1200,
    topDimension: 900,
    thickness: 10,
    yieldStress: 350
  },
  {
    id: "TU",
    form: "circular",
    length: 8,
    overlap: 2,
    bottomDimension: 850,
    topDimension: 600,
    thickness: 10,
    yieldStress: 350
  }
]);
const taperedSlip = monopole.slipOverlapScreen(
  taperedSlipAssembly.sections[0],
  taperedSlipAssembly.sections[1]
);
close(taperedSlip.lowerOverlapStartInscribedDiameter, 960);
close(taperedSlip.upperOverlapStartInscribedDiameter, 850);
close(taperedSlip.inscribedDiameter, 960);
close(taperedSlip.requiredDesignOverlap, 1.44);

const polygonSlipAssembly = monopole.assembleSections([
  {
    id: "P1",
    form: "polygon",
    sideCount: 12,
    dimensionBasis: "across-flats",
    length: 10,
    bottomDimension: 1100,
    topDimension: 900,
    thickness: 10,
    yieldStress: 350,
    insideBendRadius: 30
  },
  {
    id: "P2",
    form: "polygon",
    sideCount: 12,
    dimensionBasis: "across-flats",
    length: 10,
    overlap: 2,
    bottomDimension: 950,
    topDimension: 700,
    thickness: 10,
    yieldStress: 350,
    insideBendRadius: 30,
    actualOverlap: 1.35 * 950 / 1000
  }
]);
const polygonSlipBoundary = monopole.slipOverlapScreen(
  polygonSlipAssembly.sections[0],
  polygonSlipAssembly.sections[1]
);
close(polygonSlipBoundary.inscribedDiameter, 950);
assert.equal(polygonSlipBoundary.constructedState, "Meets minimum constructed overlap");
assert.equal(
  monopole.slipOverlapScreen(polygonSlipAssembly.sections[0], polygonSlipAssembly.sections[1], 1.35 * 950 / 1000 - 1e-5).constructedState,
  "Below minimum constructed overlap"
);

assert.throws(() => monopole.circularProperties(100, 50), /less than half/);
assert.throws(() => monopole.polygonProperties(8, 100, 50, "across-flats"), /less than the outside apothem/);
assert.throws(() => monopole.assembleSections([]), /At least one/);
assert.throws(() => monopole.assembleSections([
  { length: 2, bottomDimension: 500, topDimension: 500, thickness: 5, yieldStress: 350 },
  { length: 2, overlap: 2, bottomDimension: 450, topDimension: 450, thickness: 5, yieldStress: 350 }
]), /shorter than both/);
assert.throws(() => monopole.assembleSections([
  { length: 10, bottomDimension: 500, topDimension: 600, thickness: 5, yieldStress: 350 }
]), /top dimension must not exceed/);
assert.throws(() => monopole.assembleSections([
  { id: "S1", length: 10, bottomDimension: 500, topDimension: 400, thickness: 5, yieldStress: 350 },
  { id: "S1", length: 10, overlap: 1, bottomDimension: 450, topDimension: 300, thickness: 5, yieldStress: 350 }
]), /identifiers must be unique/);
assert.throws(() => monopole.assembleSections([
  { length: 10, bottomDimension: 500, topDimension: 400, thickness: 5, yieldStress: 350 },
  { length: 10, bottomDimension: 450, topDimension: 300, thickness: 5, yieldStress: 350 }
]), /Section 2 overlap/);
assert.throws(() => monopole.assembleSections([
  { form: "triangle", length: 10, bottomDimension: 500, topDimension: 400, thickness: 5, yieldStress: 350 }
]), /form must be circular or polygon/);
assert.throws(() => monopole.assembleSections([
  { length: 10, bottomDimension: 500, topDimension: 400, nominalThickness: 5, thickness: 6, yieldStress: 350 }
]), /design wall thickness must not exceed/);

console.log("monopole-capacity tests passed");
