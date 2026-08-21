"use strict";

const assert = require("node:assert/strict");
const {
  products,
  sourceMeta,
  dataMeta,
  supplyMeta,
  sourceRecord,
  loadLabels,
  loadDisplay,
  productConstraint,
  productGroup,
  selectorName,
  australiaPathway,
  australiaRecord
} = require("../rock-anchor-selector/app.js");

const expectedRows = [
  ["frey-bar-26-5", 461, 568], ["frey-bar-32", 672, 828], ["frey-bar-36", 850, 1048],
  ["frey-bar-40", 1049, 1295], ["frey-bar-50", 1640, 2022],
  ["frey-strand-2", 492, 558], ["frey-strand-3", 738, 837], ["frey-strand-4", 984, 1116],
  ["frey-strand-5", 1230, 1395], ["frey-strand-6", 1476, 1674], ["frey-strand-7", 1722, 1953],
  ["frey-strand-8", 1968, 2232], ["frey-strand-9", 2214, 2511], ["frey-strand-10", 2460, 2790],
  ["frey-strand-11", 2706, 3069], ["frey-strand-12", 2952, 3348], ["frey-strand-13", 3198, 3627],
  ["dywidag-26", null, 567], ["dywidag-32", null, 834], ["dywidag-36", null, 1054],
  ["dywidag-46", null, 1721], ["dywidag-57", null, 2722], ["dywidag-65", null, 3443],
  ["dywidag-75", null, 4571],
  ["sas-18", 230, 255], ["sas-26-5", 525, 580], ["sas-32", 760, 845],
  ["sas-36", 960, 1070], ["sas-40", 1190, 1320], ["sas-47", 1650, 1820],
  ["sas-57", 2155, 2671], ["sas-65", null, 3447], ["sas-75", 3690, 4572],
  ["williams-spinlock-25", 324, 404], ["williams-spinlock-32", 517, 647],
  ["williams-spinlock-38", 750, 937], ["williams-spinlock-48", 1286, 1608],
  ["bbr-cona-0206", 492, 558], ["bbr-cona-0306", 738, 837],
  ["bbr-cona-0406", 984, 1116], ["bbr-cona-0506", 1230, 1395],
  ["bbr-cona-0606", 1476, 1674], ["bbr-cona-0706", 1722, 1953],
  ["bbr-cona-0806", 1968, 2232], ["bbr-cona-0906", 2214, 2511],
  ["bbr-cona-1206", 2952, 3348], ["bbr-cona-1306", 3198, 3627],
  ["bbr-cona-1506", 3690, 4185], ["bbr-cona-1606", 3936, 4464],
  ["bbr-cona-1906", 4674, 5301], ["bbr-cona-2206", 5412, 6138]
];

assert.equal(expectedRows.length, 51, "The independent product-row matrix must remain complete");
for (const [id, yieldLoad, ultimateLoad] of expectedRows) {
  const product = products.find(item => item.id === id);
  assert.ok(product, `Missing source row ${id}`);
  assert.equal(product.yieldLoad, yieldLoad, `${id} yield/proof load`);
  assert.equal(product.ultimateLoad, ultimateLoad, `${id} ultimate load`);
}

const freyssibarAudit = [
  ["frey-bar-26-5", 552], ["frey-bar-32", 804], ["frey-bar-36", 1018],
  ["frey-bar-40", 1257], ["frey-bar-50", 1964]
];
for (const [id, area] of freyssibarAudit) {
  const product = products.find(item => item.id === id);
  assert.ok(Math.abs(product.yieldLoad * 1000 / area - 835) < 1.5, `${id} implied yield strength`);
  assert.ok(Math.abs(product.ultimateLoad * 1000 / area - 1030) < 1.5, `${id} implied ultimate strength`);
}
for (let count = 2; count <= 13; count += 1) {
  const product = products.find(item => item.id === `frey-strand-${count}`);
  assert.equal(product.yieldLoad / count, 246, `${count}T15.7 proof load per strand`);
  assert.equal(product.ultimateLoad / count, 279, `${count}T15.7 ultimate load per strand`);
}

const sas65 = products.find(product => product.id === "sas-65");
assert.deepEqual(sas65.yieldConflict, [2780, 2790]);
assert.deepEqual(loadDisplay(sas65, "yield"), {
  value: "Source conflict",
  unit: "",
  note: "Published values conflict (2,780 / 2,790 kN); manufacturer confirmation required."
});
assert.deepEqual(loadDisplay(sas65, "ultimate"), {
  value: "3,447",
  unit: " kN",
  note: "Manufacturer tendon value; not anchor resistance."
});

const unpublishedIds = [
  "frey-permanent-bar", "frey-strand-a2", "frey-strand-b2",
  "dywidag-threadbar-system", "dywidag-strand-system", "dywidag-twin-corr",
  "dywidag-multi-stage", "dywidag-el-iso",
  "williams-mcp-i", "williams-mcp-ii", "williams-mcp-iii", "williams-strand",
  "vsl-strand", "vsl-bar", "bbr-cona", "keller-bar", "keller-strand",
  "srg-strand", "srg-bar", "srg-bbr-h-bar", "custom"
];
for (const id of unpublishedIds) {
  const product = products.find(item => item.id === id);
  assert.ok(product, `Missing selector state ${id}`);
  assert.equal(loadDisplay(product, "yield").value, "Not published", `${id} yield state`);
  assert.equal(loadDisplay(product, "ultimate").value, "Not published", `${id} ultimate state`);
}

const mcp = products.find(product => product.id === "williams-mcp-iii");
const strand = products.find(product => product.id === "williams-strand");
assert.equal(sourceRecord(mcp).url, "https://www.williamsform.com/rock/grout-bonded-anchors/");
assert.equal(sourceRecord(strand).url, "https://www.williamsform.com/rock/strand-anchors/");
assert.equal(sourceRecord(mcp).checked, "11 Aug 2026");
assert.equal(sourceMeta(mcp).label, "System family page · external");
assert.equal(dataMeta(mcp).label, "Ground-anchor system family");
assert.equal(supplyMeta(mcp).label, "Australian supply confirmation required");
assert.equal(productConstraint(mcp), "Obtain a row-level tendon and complete anchor schedule.");

const williams48 = products.find(product => product.id === "williams-spinlock-48");
assert.equal(williams48.publishedGeometry, "89 mm drill hole · C28 head · R7S15C28");
assert.equal(loadLabels(williams48).yield, "Published yield force · fy");
assert.equal(productGroup(williams48).label, "Published products");
assert.equal(selectorName(williams48), "R7S Spin-Lock 48 mm");

const bbr22 = products.find(product => product.id === "bbr-cona-2206");
assert.equal(sourceMeta(bbr22).label, "Manufacturer row · Jun 2021 · ETA system");
assert.equal(sourceRecord(bbr22).url, "https://www.bbrnetwork.com/fileadmin/userdaten/Broschueren/GT/BBR_VT_CONA_CMG_EN_Rev3_0621.pdf");
assert.equal(loadLabels(bbr22).yield, "Characteristic 0.1% proof force · Fp0.1k");
assert.equal(loadLabels(bbr22).ultimate, "Characteristic maximum force · Fpk");
assert.equal(dataMeta(bbr22).label, "Published product row");
assert.equal(selectorName(bbr22), "CONA CMG 2206 · 22T15.7");
assert.equal(australiaRecord(bbr22).label, "Open Australian capability");

const dywidagFamily = products.find(product => product.id === "dywidag-twin-corr");
assert.equal(productGroup(dywidagFamily).label, "System families");
assert.match(australiaPathway(dywidagFamily), /Australian contact and project-delivery pathway identified/);

const srgHBar = products.find(product => product.id === "srg-bbr-h-bar");
assert.equal(productGroup(srgHBar).label, "Australian pathways");
assert.match(australiaPathway(srgHBar), /current BBR specialist certification/);
assert.equal(australiaRecord(srgHBar).url, "https://www.srgglobal.com.au/wp-content/uploads/2020/07/srgg_products_capability_2020-07_e.pdf");

const freyssinet7 = products.find(product => product.id === "frey-strand-7");
assert.equal(selectorName(freyssinet7), "7T15.7 strand anchor");
assert.equal(australiaRecord(freyssinet7).label, "Open Australian reference");

const custom = products.find(product => product.id === "custom");
assert.equal(sourceRecord(custom).url, "");
assert.equal(dataMeta(custom).label, "Project-defined system");
assert.equal(productConstraint(custom), "Provide the certified product, resistance and execution schedule.");

for (const product of products) {
  ["resistance", "capacity", "utilisation", "demand", "pass", "status"].forEach(field => {
    assert.equal(Object.hasOwn(product, field), false, `${product.id} must not embed ${field}`);
  });
}

console.log("Rock Anchor source-row and selector-state tests passed (51 published rows).");
