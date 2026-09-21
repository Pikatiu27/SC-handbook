"use strict";
const assert=require("node:assert/strict");
const data=require("../geo-parameters/geo-parameters-data.js");
const query=require("../geo-parameters/geo-parameters.js");
// Manually transcribed from the original pages reviewed 2026-09-05.
// Look 2014 Table 21.4, PDF 337 / printed 312; Tables 22.1/22.2, PDF 356 / printed 331.
assert.deepEqual(data.cohesive.map(r=>r.presumedBearing),["< 25 kPa","25–50 kPa","50–100 kPa","100–200 kPa","200–400 kPa","> 400 kPa"]);
assert.deepEqual(data.granular.map(r=>r.presumedBearing),["< 40 kPa","40–100 kPa","100–275 kPa","275–450 kPa","> 450 kPa"]);
assert.deepEqual(data.rockStrength.map(r=>r.allowableBearing),["0.5–2.5 MPa","0.5–2.5 MPa","2–12 MPa","2–12 MPa","> 10 MPa","> 10 MPa"]);
assert.deepEqual(data.rockBearingRqd.map(r=>r.allowableBearing),["1–3 MPa","3–6 MPa","6–12 MPa","12–20 MPa","20–30 MPa"]);
// AS 1726 Table 11 PDF 33 / printed 30; FHWA GEC6 Eq.(5-4), Table5-1 PDF58/60.
// Independent rational arithmetic: Nc=514/100, not parsed from production range strings.
const suBounds=[12,25,50,100,200];
const hundredths=suBounds.map(su=>514*su);
assert.deepEqual(hundredths,[6168,12850,25700,51400,102800]);
const rounded=hundredths.map(v=>Math.floor((v+50)/100));
assert.deepEqual(rounded,[62,129,257,514,1028]);
const expected=[`≤ ${rounded[0]} kPa`,...rounded.slice(1).map((v,i)=>`> ${rounded[i]} to ≤ ${v} kPa`),`> ${rounded.at(-1)} kPa`];
assert.deepEqual(data.cohesive.map(r=>r.undrainedUltimate),expected);
assert.ok(Math.abs((Math.PI+2)-5.14)/(Math.PI+2)<0.00032,"Rounded coefficient differs by less than 0.032 percent");
for(const state of data.cohesive){
 const result=query.evaluate({family:"cohesive",material:"clay",condition:state.id});
 const screen=result.ground.parameters.find(r=>r.label.startsWith("Surface-strip"));
 assert.match(screen.value,/^Approx\./);
 assert.match(screen.basis,/Eq\. \(5-4\).*Table 5-1/);
 assert.match(screen.basis,/centred vertical load/);
 assert.match(screen.basis,/gross = net/);
}
console.log("Geo bearing source fixtures and independently calculated rounding boundaries passed.");
