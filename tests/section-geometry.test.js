"use strict";

const assert = require("node:assert/strict");
const geometry = require("../section-geometry.js");

const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};

const rectangle = geometry.rectangle(200, 300);
close(rectangle.area, 60000);
close(rectangle.ix, 200 * 300 ** 3 / 12);
close(rectangle.iy, 300 * 200 ** 3 / 12);
close(rectangle.zx, rectangle.ix / 150);
close(rectangle.zy, rectangle.iy / 100);
close(rectangle.rx, 300 / Math.sqrt(12));
close(rectangle.ry, 200 / Math.sqrt(12));

const circle = geometry.circle(100);
close(circle.area, Math.PI * 100 ** 2 / 4);
close(circle.ix, Math.PI * 100 ** 4 / 64);
close(circle.rx, 25);
close(circle.zx, Math.PI * 100 ** 3 / 32);

const chs = geometry.circularHollow(100, 5);
close(chs.area, Math.PI * (100 ** 2 - 90 ** 2) / 4);
close(chs.ix, Math.PI * (100 ** 4 - 90 ** 4) / 64);
close(chs.rx, chs.ry);

const rhs = geometry.rectangularHollow(200, 300, 10);
close(rhs.area, 200 * 300 - 180 * 280);
close(rhs.ix, (200 * 300 ** 3 - 180 * 280 ** 3) / 12);
close(rhs.iy, (300 * 200 ** 3 - 280 * 180 ** 3) / 12);

const iSection = geometry.symmetricI(300, 150, 8, 12);
close(iSection.area, 2 * 150 * 12 + 8 * 276);
close(iSection.cx, 75);
close(iSection.cy, 150);

const angle = geometry.equalAngle(100, 10);
close(angle.area, 1900);
close(angle.cx, angle.cy);
close(angle.ix, angle.iy);

const channel = geometry.channel(200, 75, 6, 10);
close(channel.area, 6 * 180 + 2 * 75 * 10);
close(channel.cy, 100);

assert.throws(() => geometry.circularHollow(100, 50), /less than half/);
assert.throws(() => geometry.rectangularHollow(100, 80, 40), /less than half/);
assert.throws(() => geometry.symmetricI(200, 100, 8, 100), /less than/);

console.log("section-geometry tests passed");
