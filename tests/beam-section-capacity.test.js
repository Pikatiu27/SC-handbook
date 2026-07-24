"use strict";

const assert = require("node:assert/strict");
const capacity = require("../beam-section-capacity.js");
const hollowRows = require("../beam-section-data.js");
const hotRolled = require("../beam-hot-rolled-data.js");

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};

close(capacity.sectionMoment(320, 633e3), 182.304);
close(capacity.rolledWebShear(320, 283.6 * 6.1), 298.937088);
close(capacity.sectionMoment(300, 494e3), 133.38);
close(capacity.rolledWebShear(300, 181.4 * 7.3), 214.52364);
close(capacity.circularHollowShear(250, 1550), 125.55);

const pfc150 = hotRolled.pfc.find(section => section.designation === "150PFC");
const pfc150Grade = pfc150.grades["300PLUS"];
close(capacity.sectionMoment(pfc150Grade.fy, pfc150Grade.directions.x.Ze * 1000), 37.152);
close(capacity.rolledWebShear(pfc150Grade.fyw, pfc150.d1 * pfc150.tw), 135.8208);

const representativeHollowMoments = [
  ["114.3 x 4.5 CHS", "C250L0", "Ze", 12.2175],
  ["75 x 25 x 2.5 RHS", "C350L0", "Zex", 3.1815],
  ["200 x 200 x 6 SHS", "C450L0", "Ze", 110.16]
];
representativeHollowMoments.forEach(([designation, grade, modulusKey, expected]) => {
  const row = hollowRows.find(item => item.designation === designation && item.grade === grade);
  close(capacity.sectionMoment(row.fy, row[modulusKey] * 1000), expected);
});

const angle100Grade = hotRolled.equalAngle["100 x 100 x 10 EA"]["300PLUS"];
close(capacity.sectionMoment(angle100Grade.fy, angle100Grade.directions.b.Ze * 1000), 7.2576);

const rhsMajorShear = capacity.rectangularHollowShear(450, 200, 100, 5, "x");
close(rhsMajorShear.clearWebDepth, 190);
close(rhsMajorShear.webArea, 1900);
close(rhsMajorShear.slenderness, 190 / 5 * Math.sqrt(450 / 250));
close(rhsMajorShear.alphaV, 1);
close(rhsMajorShear.stressRatio, 1.2);
close(rhsMajorShear.shearYieldCapacity, 513);
close(rhsMajorShear.nonUniformCapacity, 488.57142857142856);
close(rhsMajorShear.designCapacity, 439.7142857142857);
assert.equal(rhsMajorShear.nonUniformGoverns, true);

const rhsMinorShear = capacity.rectangularHollowShear(450, 200, 100, 5, "y");
close(rhsMinorShear.clearWebDepth, 90);
close(rhsMinorShear.webArea, 900);
close(rhsMinorShear.stressRatio, 15 / 14);
close(rhsMinorShear.designCapacity, 218.7);
assert.equal(rhsMinorShear.nonUniformGoverns, false);

const squareShear = capacity.rectangularHollowShear(350, 100, 100, 6, "x");
close(squareShear.webArea, 1056);
close(squareShear.stressRatio, 9 / 8);
assert.equal(squareShear.nonUniformGoverns, true);

const stockyWeb = capacity.unstiffenedWebShearReduction(283.6, 6.1, 320);
close(stockyWeb.slenderness, 283.6 / 6.1 * Math.sqrt(320 / 250));
close(stockyWeb.alphaV, 1);

const slenderWeb = capacity.unstiffenedWebShearReduction(1000, 5, 360);
close(slenderWeb.alphaV, (82 / slenderWeb.slenderness) ** 2);
assert.ok(slenderWeb.alphaV < 1);

const rod = capacity.solidCircle(24);
close(rod.Z, Math.PI * 24 ** 3 / 32);
close(rod.S, 24 ** 3 / 6);
close(rod.Ze, Math.min(rod.S, 1.5 * rod.Z));
close(capacity.sectionMoment(300, rod.Ze), 0.9 * 300 * rod.Ze / 1e6);
close(capacity.sectionMoment(300, rod.Ze), 0.5496530506720702);

const lowMoment = capacity.momentShearInteraction(75, 100, 200);
close(lowMoment.factor, 1);
close(lowMoment.designShearCapacity, 200);

const highMoment = capacity.momentShearInteraction(90, 100, 200);
close(highMoment.factor, 0.76);
close(highMoment.designShearCapacity, 152);

const exceededMoment = capacity.momentShearInteraction(101, 100, 200);
assert.equal(exceededMoment.withinMomentRange, false);
close(exceededMoment.factor, 0);
close(exceededMoment.designShearCapacity, 0);

const combinedPass = capacity.momentShearDemandCheck(90, 100, 100, 200);
close(combinedPass.momentRatio, 0.9);
close(combinedPass.shearRatio, 100 / 152);
close(combinedPass.utilisation, 0.9);
assert.equal(combinedPass.failed, false);

const combinedShearFail = capacity.momentShearDemandCheck(90, 100, 160, 200);
close(combinedShearFail.shearRatio, 160 / 152);
close(combinedShearFail.utilisation, 160 / 152);
assert.equal(combinedShearFail.failed, true);
assert.equal(combinedShearFail.failureMode, "shear");

const combinedMomentFail = capacity.momentShearDemandCheck(101, 100, 10, 200);
close(combinedMomentFail.momentRatio, 1.01);
close(combinedMomentFail.utilisation, 1.01);
assert.equal(Number.isNaN(combinedMomentFail.shearRatio), true);
assert.equal(combinedMomentFail.failed, true);
assert.equal(combinedMomentFail.failureMode, "moment");

assert.throws(() => capacity.sectionMoment(0, 1000), /greater than zero/);
assert.throws(() => capacity.solidCircle(-1), /greater than zero/);
assert.throws(() => capacity.circularHollowShear(250, 0), /greater than zero/);
assert.throws(() => capacity.rectangularHollowShear(350, 100, 100, 50), /less than half/);
assert.throws(() => capacity.rectangularHollowShear(350, 100, 100, 6, "axis"), /x-axis or y-axis/);
assert.throws(() => capacity.unstiffenedWebShearReduction(0, 6, 320), /greater than zero/);

console.log("beam-section-capacity tests passed");
