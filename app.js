"use strict";

const boltData = {
  M16: { d: 16, Ao: 201, As: 157, Ac: 144, preload88: 95, preload109: 130 },
  M20: { d: 20, Ao: 314, As: 245, Ac: 225, preload88: 145, preload109: 205 },
  M24: { d: 24, Ao: 452, As: 353, Ac: 324, preload88: 210, preload109: 295 },
  M30: { d: 30, Ao: 707, As: 561, Ac: 519, preload88: 335, preload109: 465 },
  M36: { d: 36, Ao: 1018, As: 817, Ac: 759, preload88: 490, preload109: 680 }
};

const categories = {
  "4.6/S": { grade: "4.6", fuf: 400, type: "bearing", preload: null, description: "snug-tight" },
  "8.8/S": { grade: "8.8", fuf: 830, type: "bearing", preload: null, description: "snug-tight" },
  "8.8/TB": { grade: "8.8", fuf: 830, type: "bearing", preload: "preload88", description: "fully tensioned, bearing" },
  "8.8/TF": { grade: "8.8", fuf: 830, type: "friction", preload: "preload88", description: "fully tensioned, friction" },
  "10.9/S": { grade: "10.9", fuf: 1040, type: "bearing", preload: null, description: "snug-tight" },
  "10.9/TB": { grade: "10.9", fuf: 1040, type: "bearing", preload: "preload109", description: "fully tensioned, bearing" },
  "10.9/TF": { grade: "10.9", fuf: 1040, type: "friction", preload: "preload109", description: "fully tensioned, friction" }
};

const $ = id => document.getElementById(id);
const inputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "plateThickness", "plateStrength", "edgeDistance", "interfaces", "slipFactor", "holeFactor", "shearDemand", "tensionDemand"];

function value(id) { return Math.max(0, Number($(id).value) || 0); }
function fixed(number) { return Number(number).toFixed(1); }

function calculate() {
  const size = $("boltSize").value;
  const categoryKey = $("category").value;
  const plane = $("shearPlane").value;
  const bolt = boltData[size];
  const category = categories[categoryKey];
  const krd = category.grade === "10.9" ? 0.83 : 1;
  const tension = 0.8 * bolt.As * category.fuf / 1000;
  const threadShear = 0.8 * 0.62 * category.fuf * krd * bolt.Ac / 1000;
  const shankShear = 0.8 * 0.62 * category.fuf * krd * bolt.Ao / 1000;
  const selectedShear = plane === "N" ? threadShear : shankShear;
  const alternateShear = plane === "N" ? shankShear : threadShear;
  const count = Math.max(1, Math.round(value("boltCount")));
  const nThread = Math.round(value("threadPlanes"));
  const nShank = Math.round(value("shankPlanes"));
  const kr = Math.min(1, Math.max(0.5, value("kr")));
  const shearPerBolt = kr * (nThread * threadShear + nShank * shankShear);
  const groupShear = count * shearPerBolt;
  const bearingFull = 0.9 * 3.2 * bolt.d * value("plateThickness") * value("plateStrength") / 1000;
  const bearingEdge = 0.9 * value("edgeDistance") * value("plateThickness") * value("plateStrength") / 1000;
  const bearing = Math.min(bearingFull, bearingEdge);
  const preload = category.preload ? bolt[category.preload] : 0;
  const slip = category.type === "friction" ? 0.7 * value("slipFactor") * value("interfaces") * preload * value("holeFactor") : null;
  const groupTension = count * tension;
  const ratio = groupShear > 0 && groupTension > 0 ? Math.pow(value("shearDemand") / groupShear, 2) + Math.pow(value("tensionDemand") / groupTension, 2) : Infinity;
  const hasDemand = value("shearDemand") > 0 || value("tensionDemand") > 0;

  $("selectionTitle").textContent = `${size} ${categoryKey}`;
  $("drawingNote").textContent = plane === "X"
    ? "X condition — threads clear of the shear plane"
    : "N condition — threads intercept the shear plane";
  $("diameterValue").textContent = `${bolt.d} mm`;
  $("stressAreaValue").textContent = `${bolt.As} mm²`;
  $("strengthValue").textContent = `${category.fuf} MPa`;
  $("selectedShearLabel").textContent = `Shear capacity — ${plane}`;
  $("selectedShearCapacity").textContent = fixed(selectedShear);
  $("selectedShearNote").innerHTML = plane === "N" ? "φV<sub>f</sub> · threads intercept plane · Cl. 9.2.2.1" : "φV<sub>f</sub> · threads clear of plane · Cl. 9.2.2.1";
  $("alternateShearLabel").textContent = `Shear capacity — ${plane === "N" ? "X" : "N"}`;
  $("alternateShearCapacity").textContent = fixed(alternateShear);
  $("alternateShearNote").textContent = plane === "N" ? "threads clear of plane" : "threads intercept plane";
  $("tensionCapacity").textContent = fixed(tension);
  $("groupShearCapacity").textContent = `${fixed(groupShear)} kN`;
  $("bearingCapacity").textContent = `${fixed(bearing)} kN`;
  $("bearingGoverning").textContent = bearingEdge <= bearingFull ? "edge limit controls" : "bearing limit controls";
  $("slipCapacity").textContent = slip === null ? "Not applicable" : `${fixed(slip)} kN`;
  $("interactionRatio").textContent = Number.isFinite(ratio) ? ratio.toFixed(2) : "—";
  $("interactionStatus").textContent = !hasDemand ? "Enter design actions" : ratio <= 1 ? "PASS" : "FAIL";
  $("interactionStatus").className = !hasDemand ? "" : ratio <= 1 ? "pass" : "fail";
  updateFormulas({ bolt, category, tension, threadShear, shankShear, bearingFull, bearingEdge, bearing, slip, preload });
}

function updateFormulas(v) {
  const slipFormula = v.slip === null ? "<code>Not applicable — TF categories only</code>" : `<code>0.70 × ${value("slipFactor")} × ${value("interfaces")} × ${v.preload} × ${value("holeFactor")} = ${fixed(v.slip)} kN</code>`;
  $("formulaSteps").innerHTML = `
    <div><b>Tension · 9.2.2.2</b><code>0.80 × A<sub>s</sub> × f<sub>uf</sub> = 0.80 × ${v.bolt.As} × ${v.category.fuf} / 1000 = ${fixed(v.tension)} kN</code></div>
    <div><b>Shear N · 9.2.2.1</b><code>0.80 × 0.62 × f<sub>uf</sub> × k<sub>rd</sub> × A<sub>c</sub> = ${fixed(v.threadShear)} kN</code></div>
    <div><b>Shear X · 9.2.2.1</b><code>0.80 × 0.62 × f<sub>uf</sub> × k<sub>rd</sub> × A<sub>o</sub> = ${fixed(v.shankShear)} kN</code></div>
    <div><b>Ply bearing · 9.2.2.4</b><code>min[${fixed(v.bearingFull)}, ${fixed(v.bearingEdge)}] = ${fixed(v.bearing)} kN</code></div>
    <div><b>TF slip · 9.2.3.1</b>${slipFormula}</div>`;
}

function setPrimaryPlane() {
  const isN = $("shearPlane").value === "N";
  $("threadPlanes").value = isN ? 1 : 0;
  $("shankPlanes").value = isN ? 0 : 1;
  calculate();
}

function initialise() {
  $("boltSize").innerHTML = Object.keys(boltData).map(size => `<option value="${size}">${size}</option>`).join("");
  $("category").innerHTML = Object.entries(categories).map(([key, item]) => `<option value="${key}">${key} — ${item.description}</option>`).join("");
  $("boltSize").value = "M24";
  $("category").value = "8.8/S";
  $("shearPlane").value = "N";
  inputIds.forEach(id => $(id).addEventListener("input", calculate));
  $("shearPlane").addEventListener("input", setPrimaryPlane);
  calculate();
}

initialise();
