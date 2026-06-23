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

const chsSections = [
  [26.9,2.6],[33.7,2.0],[33.7,2.6],[33.7,3.2],[33.7,4.0],
  [42.4,2.0],[42.4,2.6],[42.4,3.2],[42.4,4.0],
  [48.3,2.3],[48.3,2.9],[48.3,3.2],[48.3,4.0],
  [60.3,2.3],[60.3,2.9],[60.3,3.5],[60.3,3.6],[60.3,4.5],
  [76.1,2.3],[76.1,3.2],[76.1,3.6],[76.1,4.5],
  [88.9,2.6],[88.9,3.2],[88.9,4.0],[88.9,5.0],
  [101.6,2.6],[101.6,3.2],[101.6,4.0],[101.6,5.0],
  [114.3,3.2],[114.3,3.6],[114.3,4.5],[114.3,5.4],
  [139.7,3.0],[139.7,3.5],[139.7,5.0],[139.7,5.4],
  [165.1,3.0],[165.1,3.5],[165.1,5.0],[165.1,5.4]
].map(([D,t]) => ({ designation: `${D.toFixed(1)} x ${t.toFixed(1)} CHS`, D, t }));

const eaSections = [
  [150,12,3480,46.3,300,1.000,340,1.000],
  [125,10,2300,38.6,320,1.000,360,1.000],
  [100,10,1810,30.6,320,1.000,360,1.000],
  [100,8,1500,30.8,320,1.000,360,1.000],
  [100,6,1170,31.0,320,0.906,360,0.856],
  [90,8,1350,27.6,320,1.000,360,1.000],
  [75,8,1110,22.7,320,1.000,360,1.000],
  [75,6,867,22.9,320,1.000,360,1.000],
  [65,6,748,19.9,320,1.000,360,1.000],
  [65,5,581,20.1,320,1.000,360,1.000],
  [50,6,568,15.1,320,1.000,360,1.000],
  [50,5,443,15.2,320,1.000,360,1.000],
  [50,3,295,15.3,320,0.907,360,0.858]
].map(([b,t,area,r,fy300,kf300,fy350,kf350]) => ({
  designation: `${b} x ${b} x ${t} EA`, area, r,
  grades: { "300PLUS": { fy: fy300, fu: 440, kf: kf300 }, "Grade 350": { fy: fy350, fu: 480, kf: kf350 } }
}));

const chsGrades = {
  C250L0: { fy: 250, fu: 320, kf: 1 },
  C350L0: { fy: 350, fu: 430, kf: 1 }
};

const $ = id => document.getElementById(id);
const boltInputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "plateThickness", "plateStrength", "edgeDistance", "interfaces", "slipFactor", "holeFactor", "shearDemand", "tensionDemand"];
let memberType = "chs";

function value(id) { return Math.max(0, Number($(id).value) || 0); }
function fixed(number) { return Number(number).toFixed(1); }
function formatArea(number) { return `${Math.round(number).toLocaleString("en-AU")} mm²`; }

function calculateBolt() {
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
  const groupShear = count * kr * (nThread * threadShear + nShank * shankShear);
  const bearingFull = 0.9 * 3.2 * bolt.d * value("plateThickness") * value("plateStrength") / 1000;
  const bearingEdge = 0.9 * value("edgeDistance") * value("plateThickness") * value("plateStrength") / 1000;
  const bearing = Math.min(bearingFull, bearingEdge);
  const preload = category.preload ? bolt[category.preload] : 0;
  const slip = category.type === "friction" ? 0.7 * value("slipFactor") * value("interfaces") * preload * value("holeFactor") : null;
  const groupTension = count * tension;
  const ratio = groupShear > 0 && groupTension > 0 ? (value("shearDemand") / groupShear) ** 2 + (value("tensionDemand") / groupTension) ** 2 : Infinity;
  const hasDemand = value("shearDemand") > 0 || value("tensionDemand") > 0;

  $("selectionTitle").textContent = `${size} ${categoryKey}`;
  $("drawingNote").textContent = plane === "X" ? "X condition - threads clear of the shear plane" : "N condition - threads intercept the shear plane";
  $("diameterValue").textContent = `${bolt.d} mm`;
  $("stressAreaValue").textContent = `${bolt.As} mm²`;
  $("strengthValue").textContent = `${category.fuf} MPa`;
  $("selectedShearLabel").textContent = `Shear capacity - ${plane}`;
  $("selectedShearCapacity").textContent = fixed(selectedShear);
  $("selectedShearNote").innerHTML = plane === "N" ? "&phi;V<sub>f</sub> - threads intercept plane - Cl. 9.2.2.1" : "&phi;V<sub>f</sub> - threads clear of plane - Cl. 9.2.2.1";
  $("alternateShearLabel").textContent = `Shear capacity - ${plane === "N" ? "X" : "N"}`;
  $("alternateShearCapacity").textContent = fixed(alternateShear);
  $("alternateShearNote").textContent = plane === "N" ? "threads clear of plane" : "threads intercept plane";
  $("tensionCapacity").textContent = fixed(tension);
  $("groupShearCapacity").textContent = `${fixed(groupShear)} kN`;
  $("bearingCapacity").textContent = `${fixed(bearing)} kN`;
  $("bearingGoverning").textContent = bearingEdge <= bearingFull ? "edge limit controls" : "bearing limit controls";
  $("slipCapacity").textContent = slip === null ? "Not applicable" : `${fixed(slip)} kN`;
  $("interactionRatio").textContent = Number.isFinite(ratio) ? ratio.toFixed(2) : "-";
  $("interactionStatus").textContent = !hasDemand ? "Enter design actions" : ratio <= 1 ? "PASS" : "FAIL";
  $("interactionStatus").className = !hasDemand ? "" : ratio <= 1 ? "pass" : "fail";

  const slipFormula = slip === null ? "<code>Not applicable - TF categories only</code>" : `<code>0.70 x ${value("slipFactor")} x ${value("interfaces")} x ${preload} x ${value("holeFactor")} = ${fixed(slip)} kN</code>`;
  $("formulaSteps").innerHTML = `
    <div><b>Tension - 9.2.2.2</b><code>0.80 x A<sub>s</sub> x f<sub>uf</sub> = ${fixed(tension)} kN</code></div>
    <div><b>Shear N - 9.2.2.1</b><code>0.80 x 0.62 x f<sub>uf</sub> x k<sub>rd</sub> x A<sub>c</sub> = ${fixed(threadShear)} kN</code></div>
    <div><b>Shear X - 9.2.2.1</b><code>0.80 x 0.62 x f<sub>uf</sub> x k<sub>rd</sub> x A<sub>o</sub> = ${fixed(shankShear)} kN</code></div>
    <div><b>Ply bearing - 9.2.2.4</b><code>min[${fixed(bearingFull)}, ${fixed(bearingEdge)}] = ${fixed(bearing)} kN</code></div>
    <div><b>TF slip - 9.2.3.1</b>${slipFormula}</div>`;
}

function chsProperties(section) {
  const inner = section.D - 2 * section.t;
  const area = Math.PI / 4 * (section.D ** 2 - inner ** 2);
  const inertia = Math.PI / 64 * (section.D ** 4 - inner ** 4);
  return { area, r: Math.sqrt(inertia / area) };
}

function populateMemberOptions() {
  const sections = memberType === "chs" ? chsSections : eaSections;
  $("memberSection").innerHTML = sections.map((section, index) => `<option value="${index}">${section.designation}</option>`).join("");
  $("memberSection").value = memberType === "chs" ? String(chsSections.findIndex(s => s.D === 114.3 && s.t === 3.2)) : String(eaSections.findIndex(s => s.designation === "100 x 100 x 10 EA"));
  populateMemberGrades();
}

function populateMemberGrades() {
  const section = (memberType === "chs" ? chsSections : eaSections)[Number($("memberSection").value) || 0];
  const grades = memberType === "chs" ? chsGrades : section.grades;
  $("memberGrade").innerHTML = Object.keys(grades).map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("memberGrade").value = memberType === "chs" ? "C350L0" : "300PLUS";
  calculateMember();
}

function calculateMember() {
  const sections = memberType === "chs" ? chsSections : eaSections;
  const section = sections[Number($("memberSection").value) || 0];
  if (!section) return;
  const gradeName = $("memberGrade").value;
  const grade = memberType === "chs" ? chsGrades[gradeName] : section.grades[gradeName];
  if (!grade) return;
  const properties = memberType === "chs" ? chsProperties(section) : { area: section.area, r: section.r };
  const alphaB = memberType === "chs" ? -0.5 : Number($("memberAlphaB").value);
  const effectiveLength = value("memberLength") * 1000;
  const leOverR = effectiveLength / properties.r;
  const lambdaN = leOverR * Math.sqrt(grade.kf) * Math.sqrt(grade.fy / 250);
  let alphaC = 1;
  let alphaA = 0;
  let modifiedLambda = 0;
  if (lambdaN > 0) {
    alphaA = 2100 * (lambdaN - 13.5) / (lambdaN ** 2 - 15.3 * lambdaN + 2050);
    modifiedLambda = Math.max(0.001, lambdaN + alphaA * alphaB);
    const eta = Math.max(0, 0.00326 * (modifiedLambda - 13.5));
    const ratio = modifiedLambda / 90;
    const xi = (ratio ** 2 + 1 + eta) / (2 * ratio ** 2);
    const rootTerm = Math.max(0, 1 - (90 / (xi * modifiedLambda)) ** 2);
    alphaC = Math.min(1, Math.max(0, xi * (1 - Math.sqrt(rootTerm))));
  }
  const sectionCompression = 0.9 * grade.kf * properties.area * grade.fy / 1000;
  const memberCompression = alphaC * sectionCompression;
  const grossYield = 0.9 * properties.area * grade.fy / 1000;

  $("memberDesignation").textContent = `${section.designation} - ${gradeName}`;
  $("memberAssumption").textContent = memberType === "chs" ? "alpha_b = -0.5 - buckling about any axis" : `user-selected alpha_b = ${alphaB.toFixed(1)} - minor principal axis properties`;
  $("memberArea").textContent = formatArea(properties.area);
  $("memberRadius").textContent = `${properties.r.toFixed(1)} mm`;
  $("memberFy").textContent = `${grade.fy} MPa`;
  $("memberKf").textContent = grade.kf.toFixed(3);
  $("memberCompression").textContent = fixed(memberCompression);
  $("sectionCompression").textContent = fixed(sectionCompression);
  $("grossTension").textContent = fixed(grossYield);
  $("memberSlenderness").textContent = leOverR.toFixed(1);
  $("memberLambdaN").textContent = lambdaN.toFixed(1);
  $("memberAlphaC").textContent = alphaC.toFixed(3);
  $("memberGoverning").textContent = alphaC < 0.999 ? "Member buckling" : "Section capacity";
  $("memberWarning").textContent = memberType === "chs"
    ? "Centroidal axial load only. Verify effective length, section availability and all connection effects."
    : "Confirm alpha_b to AS 4100 Table 6.3.3. Connection eccentricity, flexural-torsional buckling and net section are not checked.";
  $("memberFormulaSteps").innerHTML = `
    <div><b>Section data</b><code>A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; r<sub>min</sub> = ${properties.r.toFixed(1)} mm; f<sub>y</sub> = ${grade.fy} MPa; k<sub>f</sub> = ${grade.kf.toFixed(3)}</code></div>
    <div><b>Nominal slenderness</b><code>&lambda;<sub>n</sub> = (L<sub>e</sub>/r) &radic;k<sub>f</sub> &radic;(f<sub>y</sub>/250) = ${lambdaN.toFixed(1)}</code></div>
    <div><b>Modified slenderness</b><code>&lambda; = &lambda;<sub>n</sub> + &alpha;<sub>a</sub>&alpha;<sub>b</sub> = ${modifiedLambda.toFixed(1)}; &alpha;<sub>a</sub> = ${alphaA.toFixed(2)}</code></div>
    <div><b>Section capacity - 6.2</b><code>&phi;N<sub>s</sub> = 0.90 k<sub>f</sub>A<sub>g</sub>f<sub>y</sub> = ${fixed(sectionCompression)} kN</code></div>
    <div><b>Member capacity - 6.3</b><code>&phi;N<sub>c</sub> = &alpha;<sub>c</sub>&phi;N<sub>s</sub> = ${alphaC.toFixed(3)} x ${fixed(sectionCompression)} = ${fixed(memberCompression)} kN</code></div>`;
}

function setPrimaryPlane() {
  const isN = $("shearPlane").value === "N";
  $("threadPlanes").value = isN ? 1 : 0;
  $("shankPlanes").value = isN ? 0 : 1;
  calculateBolt();
}

function setTool(tool) {
  document.querySelectorAll(".tool-tab").forEach(button => {
    const active = button.dataset.tool === tool;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  ["bolt", "member"].forEach(name => {
    const panel = $(`${name}Panel`);
    const active = name === tool;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}

function setMemberType(type) {
  memberType = type;
  document.querySelectorAll(".member-type").forEach(button => button.classList.toggle("active", button.dataset.memberType === type));
  $("alphaBField").hidden = type !== "ea";
  populateMemberOptions();
}

function initialise() {
  $("boltSize").innerHTML = Object.keys(boltData).map(size => `<option value="${size}">${size}</option>`).join("");
  $("category").innerHTML = Object.entries(categories).map(([key, item]) => `<option value="${key}">${key} - ${item.description}</option>`).join("");
  $("boltSize").value = "M24";
  $("category").value = "8.8/S";
  $("shearPlane").value = "N";
  boltInputIds.forEach(id => $(id).addEventListener("input", calculateBolt));
  $("shearPlane").addEventListener("input", setPrimaryPlane);
  document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => setTool(button.dataset.tool)));
  document.querySelectorAll(".member-type").forEach(button => button.addEventListener("click", () => setMemberType(button.dataset.memberType)));
  $("memberSection").addEventListener("change", populateMemberGrades);
  $("memberGrade").addEventListener("change", calculateMember);
  $("memberLength").addEventListener("input", calculateMember);
  $("memberAlphaB").addEventListener("change", calculateMember);
  populateMemberOptions();
  calculateBolt();
}

initialise();
