"use strict";

const assert = require("node:assert/strict");
const {
  products,
  sourceMeta,
  dataMeta,
  supplyMeta,
  sourceRecord,
  loadDisplay,
  productConstraint
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
  ["williams-spinlock-38", 750, 937]
];

assert.equal(expectedRows.length, 36, "The independent product-row matrix must remain complete");
for (const [id, yieldLoad, ultimateLoad] of expectedRows) {
  const product = products.find(item => item.id === id);
  assert.ok(product, `Missing source row ${id}`);
  assert.equal(product.yieldLoad, yieldLoad, `${id} yield/proof load`);
  assert.equal(product.ultimateLoad, ultimateLoad, `${id} ultimate load`);
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
  "williams-mcp-i", "williams-mcp-ii", "williams-mcp-iii", "williams-strand",
  "vsl-strand", "vsl-bar", "bbr-cona", "keller-bar", "keller-strand",
  "srg-strand", "srg-bar", "custom"
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

const custom = products.find(product => product.id === "custom");
assert.equal(sourceRecord(custom).url, "");
assert.equal(dataMeta(custom).label, "Project-defined system");
assert.equal(productConstraint(custom), "Provide the certified product, resistance and execution schedule.");

for (const product of products) {
  ["resistance", "capacity", "utilisation", "demand", "pass", "status"].forEach(field => {
    assert.equal(Object.hasOwn(product, field), false, `${product.id} must not embed ${field}`);
  });
}

console.log("Rock Anchor source-row and selector-state tests passed (36 published rows).");
