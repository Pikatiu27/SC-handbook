"use strict";
// Independent source fixtures transcribed during Geo46 visual PDF review, 2026-09-05.
// These protect numeric source records; query tests separately verify material applicability.
const assert=require("node:assert/strict");
const d=require("../geo-parameters/geo-parameters-data.js");
const q=require("../geo-parameters/geo-parameters.js");
// Look 2e Table 11.7, PDF174 / printed149.
assert.deepEqual(d.cohesive.map(r=>[r.eShort,r.eLong]),[
  ["< 3 MPa","< 2 MPa"],["2–7 MPa","1–5 MPa"],["5–12 MPa","4–8 MPa"],
  ["10–25 MPa","7–20 MPa"],["20–50 MPa","15–35 MPa"],["40–80 MPa","30–60 MPa"]]);
assert.deepEqual(d.granular.map(r=>r.sandE),["< 5 MPa","3–10 MPa","8–30 MPa","25–50 MPa","40–100 MPa"]);
assert.deepEqual(d.granular.map(r=>r.gravelE),[undefined,"25–50 MPa","50–100 MPa","100–200 MPa",undefined]);
// Tables 7.3 / 7.8 / 7.9, PDF112 / 115. Soft-clay weight/peak strength use non-organic rows.
assert.deepEqual(d.cohesive.map(r=>r.unitWeight),[undefined,"12 / 16 kN/m³",undefined,"16 / 18 kN/m³",undefined,"18 / 20 kN/m³"]);
assert.deepEqual(d.granular.map(r=>r.unitWeight),["14 / 17 kN/m³","15 / 18 kN/m³","17 / 20 kN/m³","19 / 21 kN/m³","21 / 22 kN/m³"]);
assert.deepEqual(d.cohesive.map(r=>r.effectiveStrength),[undefined,"c′ 10–20 kPa; φ′ 15–25°",undefined,"c′ 20–50 kPa; φ′ 20–30°",undefined,"c′ 50–100 kPa; φ′ 25–30°"]);
assert.deepEqual(d.granular.map(r=>r.sandPhi),["27–32°","27–32°","32–37°","37–42°","42–47°"]);
assert.deepEqual(d.granular.map(r=>r.gravelPhi),["30–34°","30–34°","34–39°","39–44°","44–49°"]);
// Table 5.11, PDF89. Gravel does not use these density-based sand indications.
assert.deepEqual(d.cohesive.map(r=>r.dcp),["0–1 blows/100 mm","0–1 blows/100 mm","1–2 blows/100 mm","2–5 blows/100 mm","6–9 blows/100 mm","> 10 blows/100 mm"]);
assert.deepEqual(d.granular.map(r=>r.dcp),["0–1 blows/100 mm","1–3 blows/100 mm","3–8 blows/100 mm","8–15 blows/100 mm","> 15 blows/100 mm"]);
// Table 8.5, PDF128 / printed103; well-compacted basis, excludes stratification.
const permeability={GW:"10⁻³–10⁻¹ m/s",GP:"10⁻²–10 m/s",GM:"10⁻⁷–10⁻⁵ m/s",GC:"10⁻⁸–10⁻⁶ m/s",SW:"10⁻⁵–10⁻³ m/s",SP:"10⁻⁴–10⁻² m/s",SM:"10⁻⁷–10⁻⁵ m/s",SC:"10⁻⁸–10⁻⁶ m/s",ML:"10⁻⁹–10⁻⁷ m/s",MH:"10⁻⁹–10⁻⁷ m/s",CL:"10⁻⁹–10⁻⁷ m/s",CH:"10⁻¹⁰–10⁻⁸ m/s",OL:"10⁻⁸–10⁻⁶ m/s",OH:"10⁻⁷–10⁻⁵ m/s",Pt:"10⁻⁶–10⁻⁴ m/s"};
for(const [id,value] of Object.entries(permeability))assert.equal(d.permeability[id].value,value,id);
// Table 11.17, PDF179 / printed154; endpoints left open as printed, not rounded into AS classes.
assert.deepEqual(["low","medium","high","extreme"].map(id=>d.plasticity[id].poisson),["0.35 / 0.25","0.40 / 0.30","0.45 / 0.35","0.45 / 0.40"]);
// Table 9.2, PDF140 / printed115: representative DRY intact unit weights.
assert.deepEqual(d.rockUnitWeight,{
  shale:{XW:"20–22",DW:"21–23",SW:"22–24",FR:"23–25"},sandstone:{XW:"18–21",DW:"20–23",SW:"22–25",FR:"24–26"},
  limestone:{XW:"19–21",DW:"21–23",SW:"23–25",FR:"25–27"},granite:{XW:"25–27",DW:"26–27",SW:"27–28",FR:"28–29"},basalt:{XW:"20–23",DW:"23–26",SW:"25–28",FR:"27–30"}});
// AS1726 Table19, PDF46 / printed43; only an indication, no UCS conversion.
assert.deepEqual(d.rockStrength.map(r=>r.is50),["0.03–0.1 MPa","0.1–0.3 MPa","0.3–1 MPa","1–3 MPa","3–10 MPa","> 10 MPa"]);
// Exercise all visible selector combinations without deriving project values.
let cases=0;
for(const material of ["clay","silty-clay","sandy-clay"])for(const s of d.cohesive)for(const plasticity of Object.keys(d.plasticity))for(const uscs of ["unknown","CL","CH"]){
  const input={family:"cohesive",material,condition:s.id,plasticity,uscs};
  const ground=q.evaluate(input).ground;
  if(s.id==="soft"){
    for(const phrase of ["Representative dry / saturated unit weight", "Typical peak effective strength"]){
      assert.match(ground.parameters.find(r=>r.label.includes(phrase)).basis,/Non-organic soft clay source row/);
    }
    for(const r of q.guideRows(input,ground).filter(r=>/Unit weight|Effective cohesion/.test(r.name))){
      assert.match(r.condition,/Non-organic soft clay source row/);
      assert.match(r.basis,/Non-organic soft clay source row/);
    }
  }
  assert.equal(q.guideRows(input,ground)[0].value,s.presumedBearing); cases++;
}
for(const material of ["sand","gravel"])for(const s of d.granular)for(const uscs of material==="sand"?["unknown","SW","SP","SM","SC"]:["unknown","GW","GP","GM","GC"]){
  const ground=q.evaluate({family:"granular",material,condition:s.id,uscs}).ground;
  if(material==="gravel")assert.equal(ground.parameters.find(r=>r.label==="DCP indication").role,"project"); cases++;
}
for(const material of ["rock",...Object.keys(d.rockUnitWeight)])for(const s of d.rockStrength)for(const weathering of ["unknown",...d.weathering.map(w=>w.id)]){
  const input={family:"rock",material,condition:s.id,weathering},ground=q.evaluate(input).ground;
  const guide=q.guideRows(input,ground);
  if(["residual-soil","extremely-weathered"].includes(weathering))assert.ok(!guide.some(r=>/UCS/.test(r.name)));
  assert.equal(guide.find(r=>/Poisson/.test(r.name)).value,"Project report value required"); cases++;
}
assert.equal(cases,608);
assert.match(d.interfaceReferences[1].note,/K_s is the pile-interface lateral earth-pressure coefficient, not subgrade reaction modulus/);
assert.match(d.interfaceReferences[1].note,/δ is the pile–soil interface friction angle/);
console.log(`Geo46 source fixtures and ${cases} controlled selector combinations passed.`);
