"use strict";

const assert = require("node:assert/strict");
const data = require("../geo-parameters/geo-parameters-data.js");

assert.deepEqual(data.cohesive.map((row) => [row.term, row.su]), [
  ["Very soft", "≤ 12 kPa"], ["Soft", "> 12 to ≤ 25 kPa"], ["Firm", "> 25 to ≤ 50 kPa"],
  ["Stiff", "> 50 to ≤ 100 kPa"], ["Very stiff", "> 100 to ≤ 200 kPa"], ["Hard", "> 200 kPa"]
]);
assert.deepEqual(data.granular.map((row) => row.densityIndex), ["≤ 15%", "> 15 to ≤ 35%", "> 35 to ≤ 65%", "> 65 to ≤ 85%", "> 85%"]);
assert.deepEqual(data.cohesive.map((row) => row.spt), ["≤ 2 blows/300 mm", "2–5 blows/300 mm", "5–10 blows/300 mm", "10–20 blows/300 mm", "20–40 blows/300 mm", "> 40 blows/300 mm"]);
assert.deepEqual(data.granular.map((row) => row.sptField), ["≤ 4", "4–10", "10–30", "30–50", "> 50"]);
assert.deepEqual(data.granular.map((row) => row.sptCorrected), ["≤ 3", "3–8", "8–25", "25–43", "> 43"]);
assert.deepEqual(data.rockStrength.map((row) => row.ucs), ["0.6–2 MPa", "2–6 MPa", "6–20 MPa", "20–60 MPa", "60–200 MPa", "> 200 MPa"]);
assert.deepEqual(data.rockStrength.map((row) => row.allowableBearing), ["0.5–2.5 MPa", "0.5–2.5 MPa", "2–12 MPa", "2–12 MPa", "> 10 MPa", "> 10 MPa"]);
assert.deepEqual(data.rockBearingRqd.map((row) => row.allowableBearing), ["1–3 MPa", "3–6 MPa", "6–12 MPa", "12–20 MPa", "20–30 MPa"]);
assert.deepEqual(data.weathering.map((row) => row.symbol), ["RS", "XW", "HW", "MW", "DW", "SW", "FR"]);
assert.match(data.weathering.find((row) => row.symbol === "HW").note, /strength is significantly changed/i);
assert.match(data.weathering.find((row) => row.symbol === "MW").note, /little or no change of strength/i);
assert.doesNotMatch(data.weathering.find((row) => row.symbol === "HW").note, /more than half/i);
assert.doesNotMatch(data.weathering.find((row) => row.symbol === "MW").note, /up to half/i);
assert.equal(data.sources.internal.status, "Reference only");
assert.equal(data.cohesive.find((row) => row.id === "stiff").unitWeight, "16 / 18 kN/m³");
assert.equal(data.cohesive.find((row) => row.id === "stiff").presumedBearing, "100–200 kPa");
assert.equal(data.cohesive.find((row) => row.id === "stiff").undrainedUltimate, "> 257 to ≤ 514 kPa");
assert.equal(data.granular.find((row) => row.id === "dense").presumedBearing, "275–450 kPa");
assert.equal(data.cohesive.find((row) => row.id === "stiff").effectiveStrength, "c′ 20–50 kPa; φ′ 20–30°");
assert.equal(data.granular.find((row) => row.id === "dense").unitWeight, "19 / 21 kN/m³");
assert.equal(data.granular.find((row) => row.id === "dense").gravelE, "100–200 MPa");
assert.equal(data.granular.find((row) => row.id === "very-loose").gravelE, undefined);
assert.equal(data.permeability.CH.value, "10⁻¹⁰–10⁻⁸ m/s");
assert.equal(data.rockUnitWeight.sandstone.FR, "24–26");
assert.deepEqual(data.interfaceReferences[0].rows, [
  ["Bored", "Non-fissured", "0.45"], ["Bored", "Fissured", "0.30"],
  ["Driven", "Soft to firm", "1.00"], ["Driven", "Stiff to very stiff", "0.75"], ["Driven", "Very stiff to hard", "0.25"]
]);
assert.deepEqual(data.interfaceReferences[1].rows, [["Loose", "Not recommended", "0.30"], ["Medium dense", "0.10", "0.50"], ["Dense", "0.20", "0.80"], ["Very dense", "0.30", "1.20"]]);
assert.deepEqual(data.interfaceReferences[2].rows, [["Sandstone", "825–1725"], ["Soft shale", "200–825"], ["Slate / hard shale", "825–1375"], ["Soft limestone", "1000–1500"], ["Hard limestone", "1375–2000"], ["Granite / basalt", "1725–3000"]]);
assert.deepEqual(data.baseInterfaceReference.rows, [
  ["Clean sound rock", "0.70", "35"],
  ["Clean gravel, gravel–sand mixtures, coarse sand", "0.55–0.60", "29–31"],
  ["Clean fine–medium sand; silty medium–coarse sand; silty or clayey gravel", "0.45–0.55", "24–29"],
  ["Clean fine sand; silty or clayey fine–medium sand", "0.35–0.45", "19–24"],
  ["Fine sandy silt; nonplastic silt", "0.30–0.35", "17–19"],
  ["Very stiff / hard residual or preconsolidated clay", "0.40–0.50", "22–26"],
  ["Medium stiff / stiff clay and silty clay (source terms)", "0.30–0.35", "17–19"]
]);
assert.match(data.baseInterfaceReference.note, /Ultimate friction factors/);
console.log("Geo parameter source rows passed.");
