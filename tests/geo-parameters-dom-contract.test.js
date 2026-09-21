"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname,"..");
const read = file => fs.readFileSync(path.join(root,file),"utf8");
const html=read("geo-parameters/index.html"), shell=read("index.html"), app=read("geo-parameters/app.js"), css=read("geo-parameters/guide.css");
const manifest=JSON.parse(read("public-build-manifest.json"));
for(const document of [html,shell]){
  for(const text of ["Ground Parameters","Ground ranges","Parameter guide","Refine selected ground","Optional classification","Conditions","Bearing basis and reference tables","Deformation parameters and movement criteria","Concrete–ground interface: μ and δ","Pile shaft resistance — source factors","presumed allowable bearing pressure","based on B &gt; 1 m and 25 mm settlement","25 mm basis is not a differential-settlement limit","Source","Look (2014)","AS 1726:2017","Application standards","Internal borehole-log table","Government borehole portals","QLD GeoResGlobe","Public report spot checks"])assert.ok(document.includes(text),text);
  for(const id of ["rangeOverview","selectedGround","selectedRangeRows","selectionStatus","groundRefinement","family","material","condition","weathering","plasticity","uscs","optionalRefinement","bearingReference","settlementReference","baseInterfaceReference","interfaceReferences","ultimateBearingTable","rockBearingTable","projectChecklist"])assert.equal(document.split('id="'+id+'"').length-1,1,id+" unique");
  assert.match(document,/<div id="parameterReferenceParking" hidden/);
  assert.doesNotMatch(document,/Foundation questions|id="foundationReferences"/);
  for(const id of ["bearingReference","settlementReference","baseInterfaceReference","interfaceReferences","groundRefinement","anchorReference"])assert.doesNotMatch(document,new RegExp('id="'+id+'"[^>]*\\bopen\\b'));
  assert.match(document,/<section id="selectedGround"[^>]*hidden/);
  assert.doesNotMatch(document,/id="parameterDetails"|id="inventoryTable"|id="parameterRows"/);
  assert.match(document,/<div id="selectionParking">/);
  assert.ok(document.indexOf('id="resultHeading"')<document.indexOf('id="groundRefinement"'));
  assert.match(document,/role="status" aria-live="polite"/);
  assert.match(document,/guide.css\?v=20260921geo75/);
  assert.match(document,/FHWA GEC 6 \(2002\)/);
  assert.match(document,/Historical US guidance, not Australian design values\./);
  assert.match(document,/PI band \(Look\)/);
  assert.match(document,/Source bands, not AS plasticity classes/);
  assert.match(document,/project drawing, p\. 24 F3: 150 kPa safe working pressure/);
  assert.doesNotMatch(document,/App%207A%20ARMS|source recheck pending/,"Unverified WA example is omitted");
  assert.match(document,/Table 8 \(PDF p\. 23\).*excavation inspection and settlement confirmation required/);
  assert.doesNotMatch(document,/id="quickRangeGrid"|id="pileType"|id="anchorRock"|data-mode=/);
}
assert.match(app,/append\(selection\)/,"One shared result belongs to the active material panel");
assert.match(app,/aria-controls="selectedGround"/);
assert.match(app,/event.preventDefault\(\)/,"Local links must not route away from Geo");
assert.match(app,/heading.focus/);
assert.match(app,/No value is adopted by default/);
assert.match(app,/\["rock", "Rock · type not specified"\]/);
assert.match(app,/\["clay", "Clay · subtype not specified"\]/);
assert.match(app,/syncUsCs/);
assert.match(app,/data\.rockBearingRqd/);
assert.match(app,/data\.cohesive.map\(row=>\[row.term,row.su/,"All six ultimate rows remain available");
assert.match(app,/data\.interfaceReferences.filter/);
assert.match(app,/const symbolMap/);
assert.match(app,/Corrected N \(source\)/);
assert.doesNotMatch(app,/"Field N","Corrected \(N_1\)_60"/);
assert.match(css,/@media\(max-width:760px\)/);
assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css,/:focus-visible/);
assert.match(css,/prefers-reduced-motion/);
assert.match(css,/thead\{display:table-header-group;position:absolute/,"Mobile retains semantic table headers");
assert.doesNotMatch(css,/thead\{display:none\}/);
assert.match(css,/font-size:var\(--fs-sm\)/,"Shared typography tokens");
assert.ok(!manifest.files.some(file=>file.startsWith("geo-parameters/")));
assert.ok(shell.includes("UNRELEASED:geo:START"));
console.log("Geo42 reading-flow, DOM and public-boundary contracts passed.");

for(const document of [html,shell]) {
  assert.match(document, /id="family" type="hidden"/);
  assert.doesNotMatch(document, /<span>Ground family<\/span>/);
  assert.match(document,/Silt is not assigned a generic range/);
  assert.doesNotMatch(document,/Non-cohesive soil/);
}
assert.match(app,/title:"Gravel"/);
assert.match(app,/query\.unifiedRows/);
assert.match(app,/button\.dataset\.material} ·/);
assert.doesNotMatch(app,/button\.dataset\.family} ·/);

for(const document of [html,shell]) assert.match(document,/role="tablist" aria-label="Ground material"/);
assert.match(app,/role="tabpanel"/);
assert.match(app,/ArrowLeft.*ArrowRight.*Home.*End/);
