"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");

[
  "boltModeUBolt",
  "boltModeBlindBolt",
  "uBoltMemberGeometry",
  "uBoltProductSelectionTitle",
  "uBoltProductSelectionNote",
  "uBoltSelectionPrompt",
  "uBoltSelectedSummary",
  "uBoltPublishedGeometry",
  "uBoltReferenceName",
  "uBoltSourceLink",
  "uBoltPublishedSection",
  "blindBoltSize",
  "blindBoltGrip",
  "blindBoltManufacturer",
  "blindBoltProduct",
  "blindBoltProductSelectionTitle",
  "blindBoltProductSelectionNote",
  "blindBoltSelectionPrompt",
  "blindBoltSelectedSummary",
  "blindBoltReferenceName",
  "blindBoltSourceLink",
  "blindBoltPublishedSection",
  "blindBoltValueBasis",
  "blindBoltNoPublishedValues",
  "blindBoltSourceStatus"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing product lookup element: ${id}`));

assert.match(script, /const blindBoltProducts = \[/);
assert.match(script, /"HB20-1", 80/);
assert.match(script, /catalogueLength: `B max \$\{lengthB\} mm`/);
assert.match(script, /function uBoltGeometrySummary\(product\)/);
assert.match(script, /product\.family\} \$\{product\.size\} .*product\.code/);
assert.match(script, /product\.product\.includes\(product\.thread\)/);
assert.doesNotMatch(script, /replace\("HB-", ""\)/);
assert.match(script, /Source_Checked/);
assert.match(script, /Source_Online_Checked/);
assert.match(script, /function sortMetricSizes\(values\)/);
assert.match(script, /ICC-ES ESR-3330 available strength; the LRFD resistance factor is already included/);
assert.match(script, /loads: \[38\.0, 33\.3\]/);
assert.match(script, /Number\(product\.tension\)\.toFixed\(1\)/);
assert.match(script, /Blind Bolt Company Metric Technical Data, March 2026/);
assert.match(script, /gamma M2 = 1\.25 is already applied/);
assert.match(script, /ETA 20\/1174 characteristic resistance/);
assert.match(script, /family: "NexGen2"/);
assert.doesNotMatch(script, /Blind Bolt Australia Metric Technical Data, July 2018/);
assert.match(script, /if \(params\.get\("boltmode"\) === "blind"/);

assert.doesNotMatch(html, /id="uBoltApplication"/);
assert.doesNotMatch(html, /id="uBoltSpecification"/);
assert.doesNotMatch(html, /id="blindBoltSpecification"/);
assert.doesNotMatch(html, /id="uBoltProductFigure"/);
assert.doesNotMatch(html, /id="blindBoltProductFigure"/);
assert.doesNotMatch(html, /data-representation-class="PRODUCT_REFERENCE_DRAWING"/);
assert.doesNotMatch(html, /id="productMetalFill"/);
assert.match(html, /class="product-reference-row"/);
assert.match(html, /class="product-detail-disclosure"/);
assert.equal((html.match(/<b>Catalogue filters<\/b>/g) || []).length, 1);
assert.match(html, /id="uBoltProductGroupTitle">Catalogue filters/);
assert.match(html, /id="uBoltProductSelectionTitle">Product selection/);
assert.match(html, /id="blindBoltProductSelectionTitle">Product selection/);
assert.match(html, /aria-label="U-bolt product selection"/);
assert.match(html, /aria-label="Structural blind-bolt product selection"/);
assert.match(html, /Manufacturer reference/);
assert.match(html, /Open product data/);
assert.match(html, /Open technical data/);
assert.match(html, /Installation requirements/);
assert.match(html, /Total grip, W \(optional\)/);
assert.match(html, /<span>Thread designation<\/span><select id="uBoltRodSize" aria-label="U-bolt thread designation">/);
assert.match(html, /<dt>Thread designation<\/dt><dd id="uBoltThread">/);
assert.match(html, /<dt>Member fit<\/dt><dd id="uBoltPublishedGeometry">/);
assert.doesNotMatch(html, /id="uBoltSupplier"/);
assert.doesNotMatch(html, /id="blindBoltSupplier"/);
assert.doesNotMatch(html, /id="blindBoltGrip"[^>]*value="20"/);
assert.doesNotMatch(html, /Selected catalogue entry/);
assert.doesNotMatch(html, /id="blindBoltTensionBasis"/);
assert.doesNotMatch(html, /id="blindBoltShearBasis"/);

assert.match(script, /uBoltReferenceName/);
assert.match(script, /blindBoltReferenceName/);
assert.match(script, /uBoltSelectionPrompt"\)\.hidden = true/);
assert.match(script, /blindBoltSelectionPrompt"\)\.hidden = true/);
assert.match(script, /Open \$\{\/\\\.pdf/);
assert.match(script, /"technical data" : "product page"/);
assert.doesNotMatch(script, /renderUBoltProductFigure\(product\);/);
assert.doesNotMatch(script, /renderBlindBoltProductFigure\(product\);/);

assert.match(outline, /Manufacturer product lookup branches:/);
assert.match(outline, /Structural blind-bolt product lookup branch:/);
assert.match(outline, /Catalogue entry` belongs to a separate `Product selection` group/);
assert.match(outline, /`Catalogue filters` contains only optional manufacturer or brand and finish filters/);
assert.match(outline, /belongs to a separate `Product selection` group/);
assert.match(outline, /direct `Manufacturer reference` link in `Selected product`/);
assert.match(outline, /Do not redraw or embed manufacturer product figures/);
assert.match(outline, /Keep U-bolt `Selected product` to product code, thread designation, member fit and material \/ finish/);
assert.match(outline, /Keep primary blind-bolt selection data visible/);
assert.match(outline, /collapsed `Installation requirements` disclosure/);

assert.match(styles, /\.product-reference-row\s*\{/);
assert.match(styles, /\.input-group-fields\.one\s*\{/);
assert.match(styles, /\.product-selection-group\s*\{/);
assert.match(styles, /\.product-reference-link\s*\{/);
assert.match(styles, /\.product-detail-disclosure\s*\{/);
assert.match(styles, /@media \(max-width: 760px\)[\s\S]*\.product-reference-row/);

console.log("Product lookup DOM contract tests passed.");
