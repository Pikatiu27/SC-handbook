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
close(rectangle.zxTop, rectangle.zxBottom);
close(rectangle.zyRight, rectangle.zyLeft);
close(rectangle.cTop, 150);
close(rectangle.cRight, 100);
close(rectangle.sx, 200 * 300 ** 2 / 4);
close(rectangle.sy, 300 * 200 ** 2 / 4);
close(rectangle.rx, 300 / Math.sqrt(12));
close(rectangle.ry, 200 / Math.sqrt(12));
close(rectangle.jp, rectangle.ix + rectangle.iy);
close(rectangle.ixy, 0);
close(rectangle.iu, rectangle.ix);
close(rectangle.iv, rectangle.iy);
close(rectangle.thetaU, 0);

const circle = geometry.circle(100);
close(circle.area, Math.PI * 100 ** 2 / 4);
close(circle.ix, Math.PI * 100 ** 4 / 64);
close(circle.rx, 25);
close(circle.zx, Math.PI * 100 ** 3 / 32);
close(circle.sx, 100 ** 3 / 6);
close(circle.j, 2 * circle.ix);
close(circle.iw, 0);
assert.equal(circle.thetaU, null);

const chs = geometry.circularHollow(100, 5);
close(chs.area, Math.PI * (100 ** 2 - 90 ** 2) / 4);
close(chs.ix, Math.PI * (100 ** 4 - 90 ** 4) / 64);
close(chs.rx, chs.ry);
close(chs.sx, (100 ** 3 - 90 ** 3) / 6);
close(chs.j, 2 * chs.ix);

const rhs = geometry.rectangularHollow(200, 300, 10);
close(rhs.area, 200 * 300 - 180 * 280);
close(rhs.ix, (200 * 300 ** 3 - 180 * 280 ** 3) / 12);
close(rhs.iy, (300 * 200 ** 3 - 280 * 180 ** 3) / 12);
close(rhs.sx, (200 * 300 ** 2 - 180 * 280 ** 2) / 4);
close(rhs.sy, (300 * 200 ** 2 - 280 * 180 ** 2) / 4);
close(rhs.awy, 2 * 10 * 280);
close(rhs.awx, 2 * 10 * 180);
close(rhs.aw, rhs.awy);

const iSection = geometry.symmetricI(300, 150, 8, 12);
close(iSection.area, 2 * 150 * 12 + 8 * 276);
close(iSection.cx, 75);
close(iSection.cy, 150);
close(iSection.sx, 150 * 12 * 288 + 8 * 276 ** 2 / 4);
close(iSection.sy, 12 * 150 ** 2 / 2 + 276 * 8 ** 2 / 4);
close(iSection.aw, 8 * 276);

const angle = geometry.equalAngle(100, 10);
close(angle.area, 1900);
close(angle.cx, angle.cy);
close(angle.ix, angle.iy);
assert.ok(angle.ixy < 0);
assert.notEqual(angle.zxTop, angle.zxBottom);
assert.notEqual(angle.zyRight, angle.zyLeft);
close(angle.zxTop, angle.zyRight);
close(angle.zxBottom, angle.zyLeft);
close(angle.iu, angle.ix + Math.abs(angle.ixy));
close(angle.iv, angle.ix - Math.abs(angle.ixy));
close(angle.thetaU, 45);
close(angle.plasticCx, 9.5);
close(angle.plasticCy, 9.5);
close(angle.sx, 45475);
close(angle.sy, angle.sx);

const channel = geometry.channel(200, 75, 6, 10);
close(channel.area, 6 * 180 + 2 * 75 * 10);
close(channel.cy, 100);
close(channel.ixy, 0);
close(channel.aw, 6 * 180);
close(channel.zxTop, channel.zxBottom);
assert.notEqual(channel.zyRight, channel.zyLeft);
close(channel.plasticCx, 10.5);
close(channel.plasticCy, 100);
close(channel.sx, 191100);
close(channel.sy, 50805);

assert.throws(() => geometry.circularHollow(100, 50), /less than half/);
assert.throws(() => geometry.rectangularHollow(100, 80, 40), /less than half/);
assert.throws(() => geometry.symmetricI(200, 100, 8, 100), /less than/);

console.log("section-geometry tests passed");
