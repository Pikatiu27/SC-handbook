"use strict";

const assert = require("node:assert/strict");
const geo = require("../geo-parameters/geo-parameters.js");

const base = { family: "cohesive", material: "silty-clay", condition: "stiff", weathering: "unknown", plasticity: "medium", uscs: "CL" };
let result = geo.evaluate(base);
assert.equal(result.ground.heading, "Silty CLAY · stiff");
assert.equal(result.ground.parameters.find((row) => row.label.includes("s_u basis")).value, "> 50 to ≤ 100 kPa");
assert.equal(result.ground.parameters.find((row) => row.label.includes("unit weight")).value, "16 / 18 kN/m³");
assert.equal(result.ground.parameters.find((row) => row.label.includes("peak effective strength")).value, "c′ 20–50 kPa; φ′ 20–30°");
assert.equal(result.ground.parameters.find((row) => row.label === "SPT N indication").value, "10–20 blows/300 mm");
assert.equal(result.ground.parameters.find((row) => row.label.includes("permeability")).value, "10⁻⁹–10⁻⁷ m/s");
assert.match(result.ground.logic, /Undrained/i);
assert.equal(result.ground.quickRanges.length, 6);
assert.equal(result.ground.quickRanges.find((row) => row.label === "Unit weight").value, "γ_d / γ_sat 16 / 18 kN/m³");
assert.equal(result.ground.quickRanges.find((row) => row.label === "Undrained strength").use, "Classification range");
assert.equal(result.ground.quickRanges.find((row) => row.label === "Foundation modulus").use, "Immediate / long-term");
assert.equal(result.ground.quickRanges.find((row) => row.label === "Groundwater flow").value, "k 10⁻⁹–10⁻⁷ m/s");
assert.equal(result.ground.quickRanges.find((row) => row.label === "Bearing range").value, "q_a 100–200 kPa");
assert.equal(result.ground.parameters.find((row) => row.label === "Surface-strip undrained ultimate screen, q_ult").value, "Approx. > 257 to ≤ 514 kPa");
assert.ok(result.ground.parameters.some((row) => row.value === "Project report value required" && row.role === "project"));
assert.ok(result.ground.parameters.some((row) => row.label.includes("Stratum levels / thicknesses")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("Characteristic / moderately conservative / design parameter set")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("collapsibility")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("N_60 / (N_1)_60")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("Sensitivity S_t")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("k_h / k_v")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("G_0 / G_max")));
assert.equal(result.ground.parameters.find((row) => row.label === "Project-adopted allowable bearing pressure, q_a").value, "Project report value required");
assert.ok(result.ground.parameters.some((row) => row.label === "Vertical subgrade reaction modulus, k_v (kN/m³)"));
assert.ok(result.ground.parameters.some((row) => row.label === "Horizontal / vertical permeability, k_h / k_v (m/s)"));
assert.ok(result.projectInputs.some((row) => row.label.includes("Anchor grout–ground bond")));
assert.ok(!result.ground.parameters.some((row) => /Select (?:Shallow|Pile) foundation/.test(row.value)));
assert.equal(result.application, undefined);
const clayBearingBasis = result.ground.parameters.find(row => row.label === "Presumed shallow bearing pressure, q_a").basis;
assert.match(clayBearingBasis, /Gross\/net basis is not stated/);
assert.doesNotMatch(clayBearingBasis, /halve for saturated/);

result = geo.evaluate({ ...base, plasticity: "unknown", uscs: "unknown" });
assert.equal(result.ground.parameters.find((row) => row.label.includes("Poisson ratio")).value, "0.35–0.45 / 0.25–0.40");
assert.equal(result.ground.parameters.find((row) => row.label.includes("permeability")).value, "10⁻¹⁰–10⁻⁷ m/s");
assert.match(result.ground.parameters.find((row) => row.label.includes("permeability")).basis, /envelope/i);

for (const mode of ["shallow", "pile", "anchor", "invalid"]) {
  const unsupported = geo.evaluate({ ...base, mode });
  assert.equal(unsupported.status, "Input required");
  assert.equal(unsupported.ground, undefined);
}
result = geo.evaluate({ ...base, family: "granular", material: "sand", condition: "loose" });
assert.equal(result.ground.parameters.find((row) => row.label.includes("SPT N indication")).value, "4–10 / 3–8 blows/300 mm");

result = geo.evaluate({ ...base, family: "granular", material: "gravel", condition: "dense" });
assert.equal(result.ground.parameters.find((row) => row.label === "Foundation secant modulus E_s").value, "100–200 MPa");
assert.equal(result.ground.quickRanges.find((row) => row.label === "Foundation modulus").value, "E_s 100–200 MPa");
assert.equal(result.ground.quickRanges.find((row) => row.label === "Bearing range").value, "No exact source row");
result = geo.evaluate({ ...base, family: "granular", material: "gravel", condition: "very-loose" });
assert.equal(result.ground.parameters.find((row) => row.label === "Foundation secant modulus E_s").role, "project");

result = geo.evaluate({ ...base, family: "rock", material: "sandstone", condition: "medium", weathering: "highly-weathered" });
assert.equal(result.ground.quickRanges.length, 5);
assert.equal(result.ground.quickRanges.find((row) => row.label === "Bearing range").value, "q_a 2–12 MPa");
assert.match(result.ground.logic, /first approximation/i);
assert.match(result.ground.parameters.find((row) => row.label.includes("RQD-based allowable")).value, /0–25% Very poor: 1–3 MPa/);
assert.ok(result.ground.parameters.some((row) => row.label.includes("TCR / RQD")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("GSI, RMR, Q")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("c′_j / φ′_j")));
assert.ok(result.ground.parameters.some((row) => row.label.includes("E_rm")));
result = geo.evaluate({ ...base, family: "rock", material: "sandstone", condition: "medium", weathering: "unknown" });
assert.equal(result.ground.parameters.find((row) => row.label === "AS 1726 weathering").value, "Not selected");
assert.equal(result.ground.heading, "SANDSTONE · medium strength · weathering not selected");
result = geo.evaluate({ ...base, family: "rock", material: "granite", condition: "medium", weathering: "fresh" });
assert.ok(result.projectInputs.some((row) => row.label.includes("Anchor grout–ground bond")));
result = geo.evaluate({ ...base, family: "rock", material: "shale", condition: "medium", weathering: "fresh" });
assert.doesNotMatch(JSON.stringify(result), /PASS|FAIL|utilisation|design resistance/i);
const emptySettlement = geo.settlementReference();
assert.equal(emptySettlement.rows.length, 3);
assert.match(emptySettlement.note, /selected ground details/);
const claySettlement = geo.settlementReference(geo.evaluate(base).ground);
assert.deepEqual(claySettlement, emptySettlement, "Settlement questions do not repeat selected ranges");
const rockSettlement = geo.settlementReference(geo.evaluate({ ...base, family: "rock", material: "sandstone", condition: "medium" }).ground);
assert.deepEqual(rockSettlement, emptySettlement);
assert.match(claySettlement.rows[2][0], /k_v \(kN\/m³\)/);
const rockDetails = geo.guideRows({family:"rock"}, geo.evaluate({ ...base, family:"rock", material:"sandstone", condition:"medium" }).ground);
assert.ok(rockDetails.some(row => row.name === "Poisson ratio, ν" && row.value === "Project report value required"));
assert.match(geo.guideRows(base, geo.evaluate(base).ground).find(row => row.name.startsWith("Unit weight")).condition, /γ′ = γ_sat − γ_w/);
console.log("Geo parameter query and fail-closed states passed.");

const data = require("../geo-parameters/geo-parameters-data.js");
for (const [family, material, states] of [["cohesive","clay",data.cohesive],["granular","sand",data.granular],["granular","gravel",data.granular],["rock","rock",data.rockStrength]]) {
  for (const state of states) {
    const input = {family,material,condition:state.id,weathering:"unknown",plasticity:"unknown",uscs:"unknown"};
    const ground=geo.evaluate(input).ground;
    const guide=geo.guideRows(input,ground);
    assert.equal(guide[0].value,ground.parameters.find(row=>/Presumed shallow bearing|Preliminary allowable rock bearing/.test(row.label)).value);
    assert.ok(guide.every(row=>row.use && row.condition && row.basis));
    const modulus=guide.find(row=>/modulus/.test(row.name));
    if(family==="cohesive"){
      assert.deepEqual(modulus.parts.map(part=>part.value),[state.eShort,state.eLong]);
      const weight=guide.find(row=>/Unit weight/.test(row.name));
      if(state.unitWeight)assert.deepEqual(weight.parts.map(part=>part.value),state.unitWeight.split(" / ").map(value=>value.includes("kN/m³")?value:value+" kN/m³"));
    }
    if(family==="rock")assert.equal(modulus.value,"Project report value required");
    assert.doesNotMatch(JSON.stringify(guide),/NaN|Infinity/);
  }
}
for(const weathering of ["residual-soil","extremely-weathered"]){
  const ground=geo.evaluate({family:"rock",material:"sandstone",condition:"medium",weathering}).ground;
  assert.equal(ground.parameters.find(row=>row.label==="Preliminary allowable rock bearing pressure, q_a").value,"Not applicable to this weathering class");
  assert.doesNotMatch(ground.quickRanges.find(row=>row.label==="Bearing range").value,/2–12/);
  assert.equal(ground.soilLike,true);
  assert.match(ground.heading,/soil-like material/);
  assert.doesNotMatch(ground.heading,/medium strength/);
  assert.doesNotMatch(JSON.stringify(ground),/6–20 MPa|0.3–1 MPa/);
  const guide=geo.guideRows({family:"rock"},ground);
  assert.ok(guide.some(row=>row.name==="Soil strength, s_u or c′ / φ′"));
  assert.ok(guide.some(row=>row.name==="Deformation modulus, E_s"));
  assert.ok(!guide.some(row=>/UCS|Intact-rock/.test(row.name)));
  assert.doesNotMatch(JSON.stringify(geo.settlementReference(ground)),/rock-mass model/);
  assert.ok(ground.parameters.some(row=>row.label==="Soil permeability / groundwater inflow"));
}
const sandInput={family:"granular",material:"sand",condition:"dense"};
assert.doesNotMatch(geo.guideRows(sandInput,geo.evaluate(sandInput).ground).find(row=>/Poisson/.test(row.name)).condition,/clay|plasticity/);
const rockInput={family:"rock",material:"sandstone",condition:"medium",weathering:"fresh"};
const rockGround=geo.evaluate(rockInput).ground;
assert.match(rockGround.heading,/fresh/);
assert.doesNotMatch(geo.guideRows(rockInput,rockGround).find(row=>/modulus/.test(row.name)).condition,/short|long|duration/);
assert.equal(geo.evaluate({family:"invalid"}).ground,undefined);
assert.equal(geo.evaluate(null).ground,undefined);
assert.deepEqual(geo.guideRows({},null),[]);
assert.deepEqual(geo.labelledPair("24–26 kN/m³","Dry","Saturated","kN/m³"),[{label:"",value:"24–26 kN/m³"}]);
console.log("Geo42 guide preserves all source ranges and blocks soil-like rock bearing.");

// Geo46 source-applicability regression: same numbers must not migrate to another material.
for (const state of data.granular) {
  const gravel = geo.evaluate({family:"granular",material:"gravel",condition:state.id}).ground;
  const dcp = gravel.parameters.find(row=>row.label === "DCP indication");
  assert.equal(dcp.value,"Project report value required");
  assert.equal(dcp.role,"project");
  assert.match(dcp.basis,/Do not transfer sand/);
  const sand = {family:"granular",material:"sand",condition:state.id};
  const ground = geo.evaluate(sand).ground;
  assert.equal(ground.parameters.find(row=>row.label === "DCP indication").value,state.dcp);
  assert.match(geo.guideRows(sand,ground).find(row=>/modulus/.test(row.name)).condition,/Medium to coarse sand/);
  assert.match(geo.guideRows(sand,ground).find(row=>/Permeability/.test(row.name)).condition,/Well-compacted/);
}
assert.match(geo.guideRows(rockInput,rockGround).find(row=>/unit weight/.test(row.name)).name,/γ_d \(dry\)/);
const softInput={family:"cohesive",material:"clay",condition:"soft"};
assert.ok(geo.guideRows(softInput,geo.evaluate(softInput).ground).filter(row=>/Unit weight|Effective cohesion/.test(row.name)).every(row=>row.condition.includes("Non-organic")));
// Geo48c: a USCS refinement must not imply a fines-calibrated strength range.
const finesInput={family:"granular",material:"sand",condition:"dense",uscs:"SC"};
const finesGround=geo.evaluate(finesInput).ground;
assert.equal(finesGround.parameters.find(r=>r.label==="Effective friction angle, φ′").value,"37–42°");
assert.match(finesGround.parameters.find(r=>r.label==="Effective friction angle, φ′").basis,/fines-governed strength above 30%/);
assert.match(geo.guideRows(finesInput,finesGround).find(r=>r.name==="Effective friction angle, φ′").condition,/material-specific strength evidence/);
assert.match(finesGround.parameters.find(r=>r.label==="AS 1726 relative density").basis,/not visual\/tactile assessment alone/);
assert.match(rockGround.parameters.find(r=>r.label==="RQD-based allowable bearing-pressure reference").basis,/As RQD approaches zero.*does not apply/);

// Geo57: direct lookup must distinguish shaft factors from stresses and missing classes.
const shaftInput={family:"granular",material:"sand",condition:"very-dense",uscs:"unknown",weathering:"unknown",plasticity:"unknown"};
const guideFor=input=>geo.guideRows(input,geo.evaluate(input).ground);
const shaftFor=input=>guideFor(input).find(r=>r.name==="Pile shaft resistance, f_s");
assert.deepEqual(shaftFor(shaftInput).parts.map(p=>p.value),["0.30","1.20"]);
assert.match(shaftFor(shaftInput).value,/dimensionless/);
assert.match(shaftFor(shaftInput).condition,/Not allowable stress or total pile capacity/);
for(const input of [{...shaftInput,material:"gravel"},{...shaftInput,condition:"very-loose"}]) {
 assert.equal(shaftFor(input).role,"project");
 assert.doesNotMatch(shaftFor(input).value,/0.30|1.20/);
}
assert.equal(guideFor(shaftInput).find(r=>r.name==="Permeability, k").value,"Select USCS for a range");
assert.equal(guideFor({...shaftInput,uscs:"SP"}).find(r=>r.name==="Permeability, k").value,"10⁻⁴–10⁻² m/s");
assert.match(geo.evaluate(shaftInput).ground.parameters.find(r=>r.label==="Coefficient of permeability, k").basis,/envelope/);
assert.match(guideFor({...shaftInput,material:"gravel"}).find(r=>/modulus/.test(r.name)).condition,/No verified modulus/);
assert.doesNotMatch(guideFor({...shaftInput,material:"gravel",condition:"dense"}).find(r=>/modulus/.test(r.name)).condition,/time|duration/);

// Geo58: every source parameter appears exactly once in the unified model.
for (const [family,material,condition,weathering] of [["cohesive","clay","soft","unknown"],["granular","sand","very-dense","unknown"],["granular","gravel","very-loose","unknown"],["rock","sandstone","medium","fresh"],["rock","rock","medium","extremely-weathered"]]) {
 const input={family,material,condition,weathering,uscs:"unknown",plasticity:"unknown"};
 const ground=geo.evaluate(input).ground, rows=geo.unifiedRows(input,ground);
 for(const source of ground.parameters) assert.equal(rows.filter(row=>row.sourceLabels.includes(source.label)).length,1,source.label);
 assert.equal(rows.filter(row=>row.name==="Pile shaft resistance, f_s").length,1);
 assert.ok(rows.every(row=>row.basis));
}

// Exact source rows: grading narrows only the classes tabulated in Look 7.8.
for(const [state,grade,expected] of [["loose","uniform","27–30°"],["loose","well","30–32°"],["dense","uniform","37–40°"],["dense","well","40–42°"],["very-dense","well","42–47°"],["medium-dense","uniform","32–37°"]]) {
 const v=geo.evaluate({family:"granular",material:"sand",condition:state,grading:grade}).ground;
 assert.equal(v.parameters.find(r=>r.label==="Effective friction angle, φ′").value,expected);
}
assert.equal(geo.evaluate({family:"granular",material:"gravel",condition:"dense",grading:"well"}).ground.parameters.find(r=>r.label==="Effective friction angle, φ′").value,"39–44°");
