"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "app.js"), "utf8");
const start = source.indexOf("const uBoltProducts = [");
const end = source.indexOf("function setProductFigureBasis");
assert.ok(start >= 0 && end > start, "Product lookup data block not found");

const context = {};
vm.runInNewContext(`${source.slice(start, end)}
this.auditData = {
  uBoltProducts,
  blindBoltProducts,
  productSourceCheckedDates,
  productSourceCheckedDate
};`, context);

const data = JSON.parse(JSON.stringify(context.auditData));
const { uBoltProducts, blindBoltProducts, productSourceCheckedDates } = data;

assert.equal(uBoltProducts.length, 41);
assert.equal(blindBoltProducts.length, 90);

assert.deepEqual(productSourceCheckedDates, {
  Hilti: "11 Aug 2026",
  EzyStrut: "11 Aug 2026",
  "Hobson Engineering": "11 Aug 2026",
  Lindapter: "11 Aug 2026",
  ICCONS: "11 Aug 2026",
  "Kee Safety": "11 Aug 2026",
  "Blind Bolt Company": "11 Aug 2026",
  Allfasteners: "11 Aug 2026"
});

const ezystrut = uBoltProducts.filter(product => product.manufacturer === "EzyStrut");
assert.deepEqual(ezystrut.map(product => [
  product.code,
  product.thread,
  product.drawing.fitDiameter,
  product.drawing.overallLength,
  product.drawing.threadLength,
  product.drawing.rodDiameter,
  product.publishedCapacity
]), [
  ["E14-060H", "M10", 60, 110, 50, 10, "752 kg working load"],
  ["E14-076H", "M12", 76, 127, 50, 12, "1,206 kg working load"],
  ["E14-089H", "M12", 89, 140, 50, 12, "1,206 kg working load"],
  ["E14-102H", "M12", 102, 152, 50, 12, "1,206 kg working load"],
  ["E14-114H", "M12", 114, 165, 50, 12, "1,206 kg working load"],
  ["E14-140H", "M12", 140, 190, 50, 12, "1,206 kg working load"],
  ["E14-165H", "M12", 165, 215, 50, 12, "1,206 kg working load"],
  ["E14-219H", "M16", 219, 295, 75, 16, "2,069 kg working load"],
  ["E14-273H", "M20", 273, 370, 100, 20, "3,252 kg working load"]
]);
assert.ok(ezystrut.every(product => product.sourceName === "EzyStrut Heavy Duty U Bolt datasheet"));
assert.ok(ezystrut.every(product => product.sourceUrl.endsWith("/Heavy-Duty-U-Bolt-DataSheet.pdf")));
assert.ok(ezystrut.every(product => product.capacityBasis.includes("3:1 safety factor")));

const hobsonUBolts = uBoltProducts.filter(product => product.series === "Metric Round U Bolt Kit");
assert.deepEqual(hobsonUBolts.map(product => [
  product.code,
  product.thread,
  product.drawing.insideWidth,
  product.drawing.overallLength,
  product.drawing.threadLength
]), [
  ["KURMSGCM100060", "M10", 60, 110, 50],
  ["KURMSGCM120076", "M12", 76, 127, 50],
  ["KURMSGCM120089", "M12", 89, 140, 50],
  ["KURMSGCM120102", "M12", 102, 152, 50],
  ["KURMSGCM120114", "M12", 114, 165, 50],
  ["KURMSGCM120140", "M12", 140, 190, 50],
  ["KURMSGCM120165", "M12", 165, 215, 50],
  ["KURMSGCM120168", "M12", 168, 220, 50],
  ["KURMSGCM160219", "M16", 219, 295, 75],
  ["KURMSGCM200273", "M20", 273, 370, 100],
  ["KURMSGCM200324", "M20", 324, 420, 100]
]);
assert.ok(hobsonUBolts.every(product => product.publishedCapacity === "Not published"));

const commonByFamilyAndSize = {
  "Hollo-Bolt": {
    M8: [14, "35 mm", "23 Nm", 16.8, 14.3],
    M10: [18, "40 mm", "45 Nm", 27.4, 24.4],
    M12: [20, "50 mm", "80 Nm", 38.0, 33.3],
    M16: [26, "55 mm", "190 Nm", 61.8, 51.6],
    M20: [33, "70 mm", "300 Nm", 89.0, 81.8]
  },
  "HBS-Bolt": {
    M8: [14, "35 mm", "25 Nm", 6, 7],
    M10: [18, "40 mm", "45 Nm", 10, 12],
    M12: [20, "50 mm", "80 Nm", 13, 15],
    M16: [26, "55 mm", "190 Nm", 23, 28],
    M20: [33, "70 mm", "300 Nm", 34, 43]
  },
  "UNI-BOLT": {
    M8: [14, "35 mm", "23 Nm", 23.1, 29.1],
    M10: [18, "40 mm", "45 Nm", 35.8, 47.4],
    M12: [20, "50 mm", "80 Nm", 41.1, 64.2],
    M16: [26, "55 mm", "190 Nm", 81.2, 116.5],
    M20: [33, "70 mm", "300 Nm", 106.2, 183.3]
  },
  BoxBolt: {
    M8: [14, "35 mm", "25 Nm", 23.6, 33.3],
    M10: [18, "40 mm", "45 Nm", 41.8, 58.5],
    M12: [20, "50 mm", "80 Nm", 53.7, 76.3],
    M16: [26, "55 mm", "190 Nm", 96.0, 139.3],
    M20: [33, "70 mm", "300 Nm", 168.0, 229.9]
  },
  "Blind Bolt": {
    M8: [9, "20 mm", "15 Nm", 9.8, 14.6],
    M10: [11, "20 mm", "24 Nm", 14.1, 23.2],
    M12: [13, "25 mm", "30 Nm", 22.4, 33.7],
    M14: [15, "32 mm", "Source conflict: 34 Nm in the March 2026 PDF; 40 Nm on the current product page. Confirm with the manufacturer.", 34.8, 46.7],
    M16: [17, "35 mm", "50 Nm", 38.8, 62.7],
    M20: [22, "48 mm", "65 Nm", 71.4, 97.9],
    M24: [26, "60 mm", "75 Nm", 116.7, 141.0],
    M30: [32, "75 mm", "85 Nm", 174.5, 224.0]
  },
  NexGen2: {
    M20: [30, "Per ESR-3975 and connection design", "Tension-control spline", 189.5, 224.6]
  }
};

for (const [family, sizes] of Object.entries(commonByFamilyAndSize)) {
  for (const [size, expected] of Object.entries(sizes)) {
    const rows = blindBoltProducts.filter(product => product.family === family && product.size === size);
    assert.ok(rows.length > 0, `${family} ${size} source rows missing`);
    for (const row of rows) {
      assert.deepEqual([row.hole, row.centres, row.torque, row.tension, row.shear], expected, `${family} ${size} source values changed`);
    }
  }
}

const expectedGripRows = {
  "Hollo-Bolt": [
    ["HB08-1", 3, 22], ["HB08-2", 22, 41], ["HB08-3", 41, 60],
    ["HB10-1", 3, 22], ["HB10-2", 22, 41], ["HB10-3", 41, 60],
    ["HB12-1", 3, 25], ["HB12-2", 25, 47], ["HB12-3", 47, 69],
    ["HB16-1", 12, 29], ["HB16-2", 29, 50], ["HB16-3", 50, 71],
    ["HB20-1", 12, 34], ["HB20-2", 34, 60], ["HB20-3", 60, 86]
  ],
  "HBS-Bolt": [
    ["KBB88GHM080050", 3, 22], ["KBB88GHM080070", 22, 41], ["KBB88GHM080090", 41, 60],
    ["KBB88GHM100055", 3, 22], ["KBB88GHM100070", 22, 41], ["KBB88GHM100090", 41, 60],
    ["KBB88GHM120060", 3, 25], ["KBB88GHM120080", 25, 47], ["KBB88GHM120110", 47, 69],
    ["KBB88GHM160080", 12, 29], ["KBB88GHM160100", 29, 50], ["KBB88GHM160120", 50, 71],
    ["KBB88GHM200090", 12, 34], ["KBB88GHM200120", 34, 60], ["KBB88GHM200140", 60, 86]
  ],
  "UNI-BOLT": [
    ["UNIBH-M08050G", 5, 26], ["UNIBH-M08070G", 26, 46], ["UNIBH-M08090G", 46, 66],
    ["UNIBH-M10050G", 5, 22], ["UNIBH-M10070G", 22, 42], ["UNIBH-M10090G", 42, 62],
    ["UNIBH-M12055G", 5, 25], ["UNIBH-M12080G", 23, 50], ["UNIBH-M12100G", 48, 70],
    ["UNIBH-M16075G", 8, 35], ["UNIBH-M16100G", 35, 60], ["UNIBH-M16120G", 60, 80],
    ["UNIBH-M20100G", 12, 43], ["UNIBH-M20120G", 43, 63], ["UNIBH-M20150G", 63, 93]
  ],
  BoxBolt: [
    ["BQ1G08", 5, 26], ["BQ2G08", 18, 46], ["BQ3G08", 30, 66],
    ["BQ1G10", 5, 23], ["BQ2G10", 18, 43], ["BQ3G10", 35, 63],
    ["BQ1G12", 5, 25], ["BQ2G12", 20, 50], ["BQ3G12", 40, 70],
    ["BQ1G16", 5, 35], ["BQ2G16", 30, 60], ["BQ3G16", 55, 80],
    ["BQ1G20", 8, 42], ["BQ2G20", 35, 72], ["BQ3G20", 65, 102]
  ],
  "Blind Bolt": [
    ["BB0850ZF", 9, 24], ["BB1060ZF", 10, 29], ["BB1095ZF", 25, 64], ["BB10130ZF", 55, 100],
    ["BB1270ZF", 12, 35], ["BB1270HDG", 12, 33], ["BB12120HDG", 30, 84], ["BB12180HDG", 80, 143],
    ["GBB1475HDG", 14, 35], ["GBB14125HDG", 28, 82], ["GBB14185HDG", 75, 142],
    ["GBB1690HDG", 16, 43], ["GBB16130HDG", 40, 75], ["GBB16180HDG", 55, 132],
    ["GBB20110HDG", 21, 52], ["GBB20140HDG", 21, 82], ["GBB20180HDG", 80, 120], ["GBB20250HDG", 130, 190],
    ["GBB24130HDG", 21, 62], ["GBB24160HDG", 21, 92], ["GBB30140HDG", 27, 56]
  ],
  NexGen2: [
    ["2NG2060", 15.9, 22.2], ["2NG2032", 15.9, 34.9], ["2NG2036", 23.8, 36.5],
    ["2NG2048", 36.5, 47.6], ["2NG2057", 47.6, 54.0], ["2NG2068", 54.0, 68.3],
    ["2NG2096", 68.3, 95.3], ["2NG2127", 95.3, 131.8], ["2NG2212", 127.0, 211.1]
  ]
};

for (const [family, expected] of Object.entries(expectedGripRows)) {
  const actual = blindBoltProducts
    .filter(product => product.family === family)
    .map(product => [product.code, product.gripMin, product.gripMax]);
  assert.deepEqual(actual, expected, `${family} product-code or grip table changed`);
}

assert.ok(blindBoltProducts.filter(product => product.family === "Hollo-Bolt").every(product => product.valueBasis.includes("LRFD resistance factor is already included")));
assert.ok(blindBoltProducts.filter(product => product.family === "HBS-Bolt").every(product => product.valueLabel === "Manufacturer working load"));
assert.ok(blindBoltProducts.filter(product => product.family === "UNI-BOLT").every(product => product.valueBasis.includes("phi = 0.8 is already included")));
assert.ok(blindBoltProducts.filter(product => product.family === "BoxBolt").every(product => product.valueBasis.includes("no design partial factor is applied")));
assert.ok(blindBoltProducts.filter(product => product.family === "Blind Bolt").every(product => product.valueBasis.includes("gamma M2 = 1.25 is already applied")));
const blindBoltM8 = blindBoltProducts.find(product => product.code === "BB0850ZF");
assert.deepEqual([blindBoltM8.tension, blindBoltM8.shear], [9.8, 14.6], "Blind Bolt values must use Ft,Rd and Fv,Rd over thread, not the two shear columns");
const blindBoltM14 = blindBoltProducts.find(product => product.code === "GBB1475HDG");
assert.deepEqual(blindBoltM14.torqueSourceConflict, [34, 40]);
const blindBoltM16Short = blindBoltProducts.find(product => product.code === "GBB1690HDG");
assert.equal(blindBoltM16Short.gripMin, 16);
assert.match(blindBoltM16Short.gripSourceConflict, /PDF states 13 mm minimum/);
assert.ok(blindBoltProducts.filter(product => product.family === "NexGen2").every(product => product.valueBasis.includes("not an AS 4100 design capacity")));
assert.ok(blindBoltProducts.every(product => ["Source_Checked", "Source_Online_Checked"].includes(product.sourceStatus)));

console.log("Product lookup source-reproduction tests passed.");
