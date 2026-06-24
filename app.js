"use strict";

const boltData = {
  M10: { d: 10, Ao: 78.5, As: 58.0, Ac: 52.3 },
  M12: { d: 12, Ao: 113, As: 84.3, Ac: 76.2 },
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

const weldSizes = [3, 4, 5, 6, 8, 10, 12, 16];
const weldTypeData = {
  fillet: {
    label: "Fillet",
    note: "AS 4100 direct weld capacity for effective throat area",
    throatNote: "equal-leg fillet: 0.707s",
    scope: "direct fillet-weld throat check"
  },
  cpbw: {
    label: "CPBW",
    note: "weld-metal throat capacity only; connected part and inspection may govern",
    throatNote: "complete penetration: use joint thickness entered as a_w",
    scope: "capacity view for complete-penetration butt weld"
  },
  ipbw: {
    label: "IPBW",
    note: "weld-metal throat capacity only; effective throat must be specified",
    throatNote: "incomplete penetration: use specified effective throat a_w",
    scope: "capacity view for incomplete-penetration butt weld"
  },
  compound: {
    label: "Compound",
    note: "combined throat capacity only; project detail governs",
    throatNote: "compound throat: a_w + 0.707s",
    scope: "capacity view for butt weld with superimposed fillet"
  }
};
const weldInputIds = ["weldType", "weldSize", "weldCategory", "weldStrength", "weldLength", "weldRuns", "weldEffectiveThroat", "weldKr", "weldDemand"];

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

const rodSections = [
  [10, 0.616], [12, 0.887], [13, 1.04], [14, 1.21], [15, 1.39], [16, 1.58],
  [17, 1.78], [18, 1.99], [19, 2.23], [20, 2.46], [22, 2.98], [24, 3.55],
  [27, 4.49], [30, 5.55], [33, 6.71], [36, 7.99], [39, 9.38], [42, 10.9],
  [45, 12.5], [48, 14.2], [50, 15.4], [56, 19.3], [60, 22.2], [65, 26.0],
  [75, 34.7], [90, 49.9]
].map(([diameter, mass]) => ({
  designation: `Ø${diameter} Rod`,
  diameter,
  mass,
  area: Math.PI * diameter ** 2 / 4,
  r: diameter / 4,
  grades: {
    "300PLUS": { fy: 300, fu: 440, kf: 1 },
    "Grade 350": { fy: 350, fu: 480, kf: 1 }
  }
}));

const chsGrades = {
  C250L0: { fy: 250, fu: 320, kf: 1 },
  C350L0: { fy: 350, fu: 430, kf: 1 }
};

const $ = id => document.getElementById(id);
const boltInputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "plateThickness", "plateStrength", "edgeCondition", "edgeDistance", "holeDiameter", "interfaces", "slipFactor", "holeFactor", "shearDemand", "tensionDemand"];
const toolNames = ["bolt", "member", "weld"];
let memberType = "chs";

function value(id) { return Math.max(0, Number($(id).value) || 0); }
function fixed(number) { return Number(number).toFixed(1); }
function formatArea(number) { return `${Math.round(number).toLocaleString("en-AU")} mm²`; }
function standardHoleDiameter(diameter) { return diameter <= 24 ? diameter + 2 : diameter + 3; }

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
  const actualEdge = value("edgeDistance");
  const holeDiameter = value("holeDiameter");
  const effectiveEdge = Math.max(0, actualEdge - holeDiameter / 2 + bolt.d / 2);
  const minimumEdge = value("edgeCondition") * bolt.d;
  const edgeDistancePass = actualEdge >= minimumEdge;
  const bearingFull = 0.9 * 3.2 * bolt.d * value("plateThickness") * value("plateStrength") / 1000;
  const bearingEdge = 0.9 * effectiveEdge * value("plateThickness") * value("plateStrength") / 1000;
  const bearing = Math.min(bearingFull, bearingEdge);
  const preload = category.preload ? bolt[category.preload] : 0;
  const slip = category.type === "friction" ? 0.7 * value("slipFactor") * value("interfaces") * preload * value("holeFactor") : null;
  const groupTension = count * tension;
  const ratio = groupShear > 0 && groupTension > 0 ? (value("shearDemand") / groupShear) ** 2 + (value("tensionDemand") / groupTension) ** 2 : Infinity;
  const hasDemand = value("shearDemand") > 0 || value("tensionDemand") > 0;

  const drawingCallout = plane === "X" && categoryKey.endsWith("/S") ? `${size} ${category.grade} X/S` : `${size} ${categoryKey}`;
  $("selectionTitle").textContent = drawingCallout;
  $("drawingNote").textContent = "N: threads intercept shear plane · X: threads clear of shear plane";
  $("diameterValue").textContent = `${bolt.d} mm`;
  $("stressAreaValue").textContent = `${bolt.As} mm²`;
  $("coreAreaValue").textContent = `${bolt.Ac} mm²`;
  $("shankAreaValue").textContent = `${bolt.Ao} mm²`;
  $("strengthValue").textContent = `${category.fuf} MPa`;
  $("selectedShearLabel").textContent = `Shear capacity - ${plane}`;
  $("selectedShearCapacity").textContent = fixed(selectedShear);
  $("selectedShearNote").innerHTML = plane === "N" ? "&phi;V<sub>f</sub> - threads intercept plane - Cl. 9.2.2.1" : "&phi;V<sub>f</sub> - threads clear of plane - Cl. 9.2.2.1";
  $("alternateShearLabel").textContent = `Shear capacity - ${plane === "N" ? "X" : "N"}`;
  $("alternateShearCapacity").textContent = fixed(alternateShear);
  $("alternateShearNote").textContent = plane === "N" ? "threads clear of plane" : "threads intercept plane";
  $("tensionCapacity").textContent = fixed(tension);
  $("groupShearCapacity").textContent = `${fixed(groupShear)} kN`;
  $("plyBearingLimit").textContent = `${fixed(bearingFull)} kN`;
  $("edgeTearoutLimit").textContent = `${fixed(bearingEdge)} kN`;
  $("bearingCapacity").textContent = `${fixed(bearing)} kN`;
  $("bearingGoverning").textContent = bearingEdge <= bearingFull ? "edge limit controls" : "bearing limit controls";
  $("actualEdgeDistance").textContent = fixed(actualEdge);
  $("minimumEdgeDistance").textContent = fixed(minimumEdge);
  $("effectiveEdgeDistance").textContent = fixed(effectiveEdge);
  $("edgeDistanceStatus").textContent = edgeDistancePass ? "PASS" : "FAIL";
  $("edgeDistanceStatus").className = edgeDistancePass ? "pass" : "fail";
  $("slipCapacity").textContent = slip === null ? "Not applicable" : `${fixed(slip)} kN`;
  $("interactionRatio").textContent = Number.isFinite(ratio) ? ratio.toFixed(2) : "-";
  $("interactionStatus").textContent = !hasDemand ? "Enter design actions" : ratio <= 1 ? "PASS" : "FAIL";
  $("interactionStatus").className = !hasDemand ? "" : ratio <= 1 ? "pass" : "fail";

  const slipFormula = slip === null ? "<code>Not applicable - TF categories only</code>" : `<code>0.70 x ${value("slipFactor")} x ${value("interfaces")} x ${preload} x ${value("holeFactor")} = ${fixed(slip)} kN</code>`;
  $("formulaSteps").innerHTML = `
    <div><b>Tension - 9.2.2.2</b><code>0.80 x A<sub>s</sub> x f<sub>uf</sub> = ${fixed(tension)} kN</code></div>
    <div><b>Shear N - 9.2.2.1</b><code>0.80 x 0.62 x f<sub>uf</sub> x k<sub>rd</sub> x A<sub>c</sub> = ${fixed(threadShear)} kN</code></div>
    <div><b>Shear X - 9.2.2.1</b><code>0.80 x 0.62 x f<sub>uf</sub> x k<sub>rd</sub> x A<sub>o</sub> = ${fixed(shankShear)} kN</code></div>
    <div><b>Ply bearing - 9.2.2.4(1)</b><code>0.90 x 3.2 x d<sub>f</sub> x t<sub>p</sub> x f<sub>up</sub> = ${fixed(bearingFull)} kN</code></div>
    <div><b>Edge limit - 9.2.2.4(2)</b><code>a<sub>e</sub> = e - d<sub>h</sub>/2 + d<sub>f</sub>/2 = ${fixed(effectiveEdge)} mm; capacity = ${fixed(bearingEdge)} kN</code></div>
    <div><b>Minimum edge - 9.5.2</b><code>e<sub>min</sub> = ${value("edgeCondition").toFixed(2)}d<sub>f</sub> = ${fixed(minimumEdge)} mm; provided e = ${fixed(actualEdge)} mm - ${edgeDistancePass ? "PASS" : "FAIL"}</code></div>
    <div><b>Governing ply capacity</b><code>min[${fixed(bearingFull)}, ${fixed(bearingEdge)}] = ${fixed(bearing)} kN</code></div>
    <div><b>TF slip - 9.2.3.1</b>${slipFormula}</div>`;
}

function calculateWeld() {
  const type = $("weldType").value;
  const typeData = weldTypeData[type] || weldTypeData.fillet;
  const size = value("weldSize");
  const category = $("weldCategory").value;
  const fuw = value("weldStrength");
  const length = value("weldLength");
  const runs = Math.max(1, Math.round(value("weldRuns")));
  const effectiveThroat = value("weldEffectiveThroat");
  const kr = Math.min(1, Math.max(0.1, value("weldKr")));
  const phi = 0.8;
  const filletThroat = 0.707 * size;
  const throat = type === "fillet" ? filletThroat : type === "compound" ? effectiveThroat + filletThroat : effectiveThroat;
  const capacityPerMm = phi * 0.6 * fuw * throat * kr / 1000;
  const capacity = capacityPerMm * length * runs;
  const demand = value("weldDemand");
  const utilisation = capacity > 0 ? demand / capacity : Infinity;
  const hasDemand = demand > 0;
  const callouts = {
    fillet: `${size} mm CFW, category ${category}, fuw ${fuw} MPa`,
    cpbw: `CPBW, a_w ${effectiveThroat.toFixed(1)} mm, category ${category}, fuw ${fuw} MPa`,
    ipbw: `IPBW, a_w ${effectiveThroat.toFixed(1)} mm, category ${category}, fuw ${fuw} MPa`,
    compound: `CPBW a_w ${effectiveThroat.toFixed(1)} mm + ${size} mm fillet, category ${category}, fuw ${fuw} MPa`
  };

  $("weldCallout").textContent = callouts[type] || callouts.fillet;
  $("weldTypeValue").textContent = typeData.label;
  $("weldThroatValue").textContent = `${throat.toFixed(1)} mm`;
  $("weldLengthValue").textContent = `${fixed(length)} mm`;
  $("weldRunsValue").textContent = String(runs);
  $("weldCapacityLabel").innerHTML = type === "fillet" ? "Design weld capacity &phi;V<sub>w</sub>" : "Weld-metal throat capacity";
  $("weldCapacityBasis").textContent = `${typeData.scope}; ${typeData.note}`;
  $("weldCapacity").textContent = fixed(capacity);
  $("weldCapacityPerMm").textContent = capacityPerMm.toFixed(2);
  $("weldThroat").textContent = throat.toFixed(1);
  $("weldThroatNote").textContent = typeData.throatNote;
  $("weldUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("weldStatus").textContent = !hasDemand ? "Enter design action" : utilisation <= 1 ? "PASS" : "FAIL";
  $("weldStatus").className = !hasDemand ? "" : utilisation <= 1 ? "pass" : "fail";
  $("weldFormulaSteps").innerHTML = `
    <div><b>Selected weld</b><code>${typeData.label} - ${typeData.scope}</code></div>
    <div><b>Design throat</b><code>t<sub>t</sub> = ${type === "fillet" ? `0.707 x ${size.toFixed(0)}` : type === "compound" ? `${effectiveThroat.toFixed(1)} + 0.707 x ${size.toFixed(0)}` : effectiveThroat.toFixed(1)} = ${throat.toFixed(1)} mm</code></div>
    <div><b>Weld-metal capacity</b><code>&phi;R = 0.80 x 0.6 x ${fuw.toFixed(0)} x ${throat.toFixed(1)} x ${kr.toFixed(2)} x ${fixed(length)} / 1000 = ${fixed(capacity / runs)} kN per run</code></div>
    <div><b>Weld group</b><code>${runs} effective run${runs === 1 ? "" : "s"} x ${fixed(capacity / runs)} = ${fixed(capacity)} kN</code></div>
    <div><b>Design boundary</b><code>${callouts[type] || callouts.fillet}; check parent metal, joint preparation, WPS, inspection, fatigue and effective length separately</code></div>`;
}

function chsProperties(section) {
  const inner = section.D - 2 * section.t;
  const area = Math.PI / 4 * (section.D ** 2 - inner ** 2);
  const inertia = Math.PI / 64 * (section.D ** 4 - inner ** 4);
  return { area, r: Math.sqrt(inertia / area) };
}

function populateMemberOptions() {
  const sections = memberType === "chs" ? chsSections : memberType === "ea" ? eaSections : rodSections;
  $("memberSection").innerHTML = sections.map((section, index) => `<option value="${index}">${section.designation}</option>`).join("");
  $("memberSection").value = memberType === "chs"
    ? String(chsSections.findIndex(s => s.D === 114.3 && s.t === 3.2))
    : memberType === "ea"
      ? String(eaSections.findIndex(s => s.designation === "100 x 100 x 10 EA"))
      : String(rodSections.findIndex(s => s.diameter === 24));
  populateMemberGrades();
}

function populateMemberGrades() {
  const section = (memberType === "chs" ? chsSections : memberType === "ea" ? eaSections : rodSections)[Number($("memberSection").value) || 0];
  const grades = memberType === "chs" ? chsGrades : section.grades;
  $("memberGrade").innerHTML = Object.keys(grades).map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("memberGrade").value = memberType === "chs" ? "C350L0" : "300PLUS";
  const properties = memberType === "chs" ? chsProperties(section) : { area: section.area, r: section.r };
  $("memberNetArea").value = properties.area.toFixed(0);
  $("memberNetArea").max = properties.area.toFixed(0);
  $("memberKt").value = "1";
  calculateMember();
}

function calculateMember() {
  const sections = memberType === "chs" ? chsSections : memberType === "ea" ? eaSections : rodSections;
  const section = sections[Number($("memberSection").value) || 0];
  if (!section) return;
  const gradeName = $("memberGrade").value;
  const grade = memberType === "chs" ? chsGrades[gradeName] : section.grades[gradeName];
  if (!grade) return;
  const properties = memberType === "chs" ? chsProperties(section) : { area: section.area, r: section.r };
  const alphaB = memberType === "chs" ? -0.5 : Number($("memberAlphaB").value);
  const enteredNetArea = value("memberNetArea");
  const netArea = Math.min(properties.area, enteredNetArea);
  const kt = Math.min(1, value("memberKt"));
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
  const netFracture = 0.9 * 0.85 * kt * netArea * grade.fu / 1000;
  const tensionCapacity = Math.min(grossYield, netFracture);
  const tensionGoverning = grossYield <= netFracture ? "Gross-section yielding" : "Net-section fracture";

  $("memberDesignation").textContent = `${section.designation} - ${gradeName}`;
  $("memberAssumption").textContent = memberType === "chs"
    ? "αb = -0.5 - buckling about any axis"
    : memberType === "ea"
      ? `user-selected αb = ${alphaB.toFixed(1)} - minor principal axis properties`
      : `user-selected αb = ${alphaB.toFixed(1)} - solid circular rod geometry`;
  $("memberArea").textContent = formatArea(properties.area);
  $("memberRadius").textContent = `${properties.r.toFixed(1)} mm`;
  $("memberFy").textContent = `${grade.fy} MPa`;
  $("memberFu").textContent = `${grade.fu} MPa`;
  $("memberKf").textContent = grade.kf.toFixed(3);
  $("memberCompression").textContent = fixed(memberCompression);
  $("sectionCompression").textContent = fixed(sectionCompression);
  $("memberTension").textContent = fixed(tensionCapacity);
  $("grossYieldCapacity").textContent = `${fixed(grossYield)} kN`;
  $("netFractureCapacity").textContent = `${fixed(netFracture)} kN`;
  $("tensionGoverning").textContent = tensionGoverning;
  $("memberSlenderness").textContent = leOverR.toFixed(1);
  $("memberLambdaN").textContent = lambdaN.toFixed(1);
  $("memberAlphaC").textContent = alphaC.toFixed(3);
  $("memberGoverning").textContent = alphaC < 0.999 ? "Member buckling" : "Section capacity";
  const netAreaWarning = enteredNetArea > properties.area ? " Net area has been limited to gross area." : "";
  $("memberWarning").textContent = memberType === "chs"
    ? `Centroidal axial load only. Confirm A_n, k_t, effective length and the actual connection.${netAreaWarning}`
    : memberType === "ea"
      ? `Confirm αb to AS 4100 Table 6.3.3 and A_n / k_t to Clauses 7.2 and 7.3. Flexural-torsional buckling is not checked.${netAreaWarning}`
      : `Confirm rod product grade, αb to AS 4100 Table 6.3.3, effective length and connection net area.${netAreaWarning}`;
  $("memberFormulaSteps").innerHTML = `
    <div><b>Section data</b><code>A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; r<sub>min</sub> = ${properties.r.toFixed(1)} mm; f<sub>y</sub> = ${grade.fy} MPa; f<sub>u</sub> = ${grade.fu} MPa; k<sub>f</sub> = ${grade.kf.toFixed(3)}</code></div>
    <div><b>Gross-section yielding - 7.2</b><code>&phi;A<sub>g</sub>f<sub>y</sub> = ${fixed(grossYield)} kN</code></div>
    <div><b>Net-section fracture - 7.2</b><code>&phi;0.85k<sub>t</sub>A<sub>n</sub>f<sub>u</sub> = 0.90 x 0.85 x ${kt.toFixed(2)} x ${netArea.toFixed(0)} x ${grade.fu} / 1000 = ${fixed(netFracture)} kN</code></div>
    <div><b>Design tension capacity - 7.1</b><code>&phi;N<sub>t</sub> = min[${fixed(grossYield)}, ${fixed(netFracture)}] = ${fixed(tensionCapacity)} kN</code></div>
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

function setStandardHole() {
  $("holeDiameter").value = standardHoleDiameter(boltData[$("boltSize").value].d);
  calculateBolt();
}

function populateBoltCategories() {
  const size = $("boltSize").value;
  const previous = $("category").value;
  const entries = Object.entries(categories).filter(([key]) => boltData[size].d >= 16 || key.endsWith("/S"));
  $("category").innerHTML = entries.map(([key, item]) => `<option value="${key}">${key} - ${item.description}</option>`).join("");
  $("category").value = entries.some(([key]) => key === previous) ? previous : "8.8/S";
}

function setBoltSize() {
  populateBoltCategories();
  setStandardHole();
}

function setTool(tool, updateHash = true) {
  const selectedTool = toolNames.includes(tool) ? tool : "bolt";
  document.querySelectorAll(".tool-tab").forEach(button => {
    const active = button.dataset.tool === selectedTool;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  toolNames.forEach(name => {
    const panel = $(`${name}Panel`);
    const active = name === selectedTool;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  if (updateHash && location.hash !== `#${selectedTool}`) {
    history.replaceState(null, "", `#${selectedTool}`);
  }
}

function setMemberType(type) {
  memberType = type;
  document.querySelectorAll(".member-type").forEach(button => button.classList.toggle("active", button.dataset.memberType === type));
  $("alphaBField").hidden = type === "chs";
  if (type === "ea") $("memberAlphaB").value = "0.5";
  if (type === "rod") $("memberAlphaB").value = "0";
  populateMemberOptions();
}

function initialise() {
  $("boltSize").innerHTML = Object.keys(boltData).map(size => `<option value="${size}">${size}</option>`).join("");
  $("boltSize").value = "M24";
  populateBoltCategories();
  $("category").value = "8.8/S";
  $("weldSize").innerHTML = weldSizes.map(size => `<option value="${size}">${size} mm</option>`).join("");
  $("weldType").value = "fillet";
  $("weldSize").value = "6";
  $("shearPlane").value = "N";
  boltInputIds.forEach(id => $(id).addEventListener("input", calculateBolt));
  weldInputIds.forEach(id => $(id).addEventListener("input", calculateWeld));
  $("boltSize").addEventListener("change", setBoltSize);
  $("shearPlane").addEventListener("input", setPrimaryPlane);
  document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => setTool(button.dataset.tool)));
  window.addEventListener("hashchange", () => setTool(location.hash.slice(1), false));
  document.querySelectorAll(".member-type").forEach(button => button.addEventListener("click", () => setMemberType(button.dataset.memberType)));
  $("memberSection").addEventListener("change", populateMemberGrades);
  $("memberGrade").addEventListener("change", calculateMember);
  $("memberLength").addEventListener("input", calculateMember);
  $("memberAlphaB").addEventListener("change", calculateMember);
  $("memberNetArea").addEventListener("input", calculateMember);
  $("memberKt").addEventListener("input", calculateMember);
  populateMemberOptions();
  calculateBolt();
  calculateWeld();
  setTool(location.hash.slice(1) || "bolt", false);
}

initialise();
