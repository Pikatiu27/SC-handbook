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
const parentMetalGrades = {
  "Grade 250 plate": { fup: 410, standard: "AS/NZS 3678" },
  "Grade 300 flat bar": { fup: 430, standard: "AS/NZS 3679.1" },
  "Grade 350 plate": { fup: 450, standard: "AS/NZS 3678" }
};
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
const weldInputIds = ["weldType", "weldSize", "weldCategory", "weldStrength", "weldLength", "weldRuns", "weldEffectiveThroat", "weldKr", "weldDemand", "weldParentThickness", "weldParentGrade"];
const concreteInputIds = [
  "concreteDirection", "concreteWidth", "concreteDepth", "concreteCover", "concreteFc", "concretePhi",
  "concreteAlpha2", "concreteGamma", "concreteEcu", "concreteComposite",
  "layer1Active", "layer1Y", "layer1Bar", "layer1Spacing", "layer1Fsy", "layer1Es",
  "layer2Active", "layer2Y", "layer2Bar", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Active", "layer3Y", "layer3Bar", "layer3Spacing", "layer3Fsy", "layer3Es",
  "layer4Active", "layer4Y", "layer4Bar", "layer4Spacing", "layer4Fsy", "layer4Es"
];

const ubSections = [
  ["610UB125",125,16000,3680,3230,{ "300PLUS": { fy: 280, Ze: 3680, compactness: "C", kf: 0.950 }, "Grade 350": { fy: 340, Ze: 3680, compactness: "C", kf: 0.916 } }],
  ["610UB113",113,14500,3290,2880,{ "300PLUS": { fy: 280, Ze: 3290, compactness: "C", kf: 0.926 }, "Grade 350": { fy: 340, Ze: 3290, compactness: "C", kf: 0.891 } }],
  ["610UB101",101,13000,2900,2530,{ "300PLUS": { fy: 300, Ze: 2900, compactness: "C", kf: 0.888 }, "Grade 350": { fy: 340, Ze: 2900, compactness: "C", kf: 0.867 } }],
  ["530UB92.4",92.4,11800,2370,2080,{ "300PLUS": { fy: 300, Ze: 2370, compactness: "C", kf: 0.928 }, "Grade 350": { fy: 340, Ze: 2370, compactness: "C", kf: 0.907 } }],
  ["530UB82.0",82.0,10500,2070,1810,{ "300PLUS": { fy: 300, Ze: 2070, compactness: "C", kf: 0.902 }, "Grade 350": { fy: 340, Ze: 2070, compactness: "C", kf: 0.880 } }],
  ["460UB82.1",82.1,10500,1840,1610,{ "300PLUS": { fy: 300, Ze: 1840, compactness: "C", kf: 0.979 }, "Grade 350": { fy: 340, Ze: 1840, compactness: "C", kf: 0.956 } }],
  ["460UB74.6",74.6,9520,1660,1460,{ "300PLUS": { fy: 300, Ze: 1660, compactness: "C", kf: 0.948 }, "Grade 350": { fy: 340, Ze: 1660, compactness: "C", kf: 0.926 } }],
  ["460UB67.1",67.1,8580,1480,1300,{ "300PLUS": { fy: 300, Ze: 1480, compactness: "C", kf: 0.922 }, "Grade 350": { fy: 340, Ze: 1480, compactness: "C", kf: 0.901 } }],
  ["410UB59.7",59.7,7640,1200,1060,{ "300PLUS": { fy: 300, Ze: 1200, compactness: "C", kf: 0.938 }, "Grade 350": { fy: 340, Ze: 1200, compactness: "C", kf: 0.918 } }],
  ["410UB53.7",53.7,6890,1060,933,{ "300PLUS": { fy: 320, Ze: 1060, compactness: "C", kf: 0.913 }, "Grade 350": { fy: 360, Ze: 1050, compactness: "N", kf: 0.894 } }],
  ["360UB56.7",56.7,7240,1010,899,{ "300PLUS": { fy: 300, Ze: 1010, compactness: "C", kf: 0.996 }, "Grade 350": { fy: 340, Ze: 1010, compactness: "C", kf: 0.974 } }],
  ["360UB50.7",50.7,6470,897,798,{ "300PLUS": { fy: 300, Ze: 897, compactness: "C", kf: 0.963 }, "Grade 350": { fy: 340, Ze: 897, compactness: "C", kf: 0.943 } }],
  ["360UB44.7",44.7,5720,777,689,{ "300PLUS": { fy: 320, Ze: 770, compactness: "N", kf: 0.930 }, "Grade 350": { fy: 360, Ze: 762, compactness: "N", kf: 0.911 } }],
  ["310UB46.2",46.2,5930,729,654,{ "300PLUS": { fy: 300, Ze: 729, compactness: "C", kf: 0.991 }, "Grade 350": { fy: 340, Ze: 729, compactness: "C", kf: 0.972 } }],
  ["310UB40.4",40.4,5210,633,569,{ "300PLUS": { fy: 320, Ze: 633, compactness: "C", kf: 0.952 }, "Grade 350": { fy: 360, Ze: 629, compactness: "N", kf: 0.936 } }],
  ["310UB32.0",32.0,4080,475,424,{ "300PLUS": { fy: 320, Ze: 467, compactness: "N", kf: 0.915 }, "Grade 350": { fy: 360, Ze: 462, compactness: "N", kf: 0.898 } }],
  ["250UB37.3",37.3,4750,486,435,{ "300PLUS": { fy: 320, Ze: 486, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 486, compactness: "C", kf: 1.000 } }],
  ["250UB31.4",31.4,4010,397,354,{ "300PLUS": { fy: 320, Ze: 395, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 392, compactness: "N", kf: 0.991 } }],
  ["250UB25.7",25.7,3270,319,285,{ "300PLUS": { fy: 320, Ze: 319, compactness: "C", kf: 0.949 }, "Grade 350": { fy: 360, Ze: 319, compactness: "C", kf: 0.932 } }],
  ["200UB29.8",29.8,3820,316,281,{ "300PLUS": { fy: 320, Ze: 316, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 316, compactness: "C", kf: 1.000 } }],
  ["200UB25.4",25.4,3230,260,232,{ "300PLUS": { fy: 320, Ze: 259, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 257, compactness: "N", kf: 1.000 } }],
  ["200UB22.3",22.3,2870,231,208,{ "300PLUS": { fy: 320, Ze: 227, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 225, compactness: "N", kf: 1.000 } }],
  ["200UB18.2",18.2,2320,180,160,{ "300PLUS": { fy: 320, Ze: 180, compactness: "C", kf: 0.990 }, "Grade 350": { fy: 360, Ze: 180, compactness: "C", kf: 0.970 } }],
  ["180UB22.2",22.2,2820,195,171,{ "300PLUS": { fy: 320, Ze: 195, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 195, compactness: "C", kf: 1.000 } }],
  ["180UB18.1",18.1,2300,157,139,{ "300PLUS": { fy: 320, Ze: 157, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 157, compactness: "C", kf: 1.000 } }],
  ["180UB16.1",16.1,2040,138,123,{ "300PLUS": { fy: 320, Ze: 138, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 138, compactness: "C", kf: 1.000 } }],
  ["150UB18.0",18.0,2300,135,117,{ "300PLUS": { fy: 320, Ze: 135, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 135, compactness: "C", kf: 1.000 } }],
  ["150UB14.0",14.0,1780,102,88.8,{ "300PLUS": { fy: 320, Ze: 102, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 102, compactness: "C", kf: 1.000 } }]
].map(([designation, mass, area, Sx, Zx, grades]) => ({ designation, mass, area, Sx, Zx, grades }));

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

const pfcSections = [
  [380, 55.2, 7030, 30.4, 280],
  [300, 40.1, 5110, 28.1, 300],
  [250, 35.5, 4520, 28.4, 300],
  [230, 25.1, 3200, 23.5, 300],
  [200, 22.9, 2920, 23.8, 300],
  [180, 20.9, 2660, 23.8, 300],
  [150, 17.7, 2250, 23.9, 320],
  [125, 11.9, 1520, 20.8, 320],
  [100, 8.33, 1060, 15.9, 320],
  [75, 5.92, 754, 12.6, 320]
].map(([depth, mass, area, r, fy]) => ({
  designation: `${depth}PFC`,
  mass,
  area,
  r,
  grades: { "300PLUS": { fy, fu: 440, kf: 1 } }
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
const toolNames = ["bolt", "member", "beam", "weld", "concrete"];
let memberType = "chs";

function value(id) { return Math.max(0, Number($(id).value) || 0); }
function fixed(number) { return Number(number).toFixed(1); }
function fixed2(number) { return Number(number).toFixed(2); }
function formatArea(number) { return `${Math.round(number).toLocaleString("en-AU")} mm²`; }
function standardHoleDiameter(diameter) { return diameter <= 24 ? diameter + 2 : diameter + 3; }
function signedFixed(number, digits = 1) { return `${number >= 0 ? "+" : ""}${Number(number).toFixed(digits)}`; }

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
    <div><b>Edge limit - 9.2.2.4(2)</b><code>e is hole-centre edge distance; clear edge = e - d<sub>h</sub>/2; a<sub>e</sub> = e - d<sub>h</sub>/2 + d<sub>f</sub>/2 = ${fixed(effectiveEdge)} mm; capacity = ${fixed(bearingEdge)} kN</code></div>
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
  const parentThickness = value("weldParentThickness");
  const parentGrade = parentMetalGrades[$("weldParentGrade").value] || parentMetalGrades["Grade 250 plate"];
  const phi = 0.8;
  const parentPhi = 0.9;
  const filletThroat = 0.707 * size;
  const throat = type === "fillet" ? filletThroat : type === "compound" ? effectiveThroat + filletThroat : effectiveThroat;
  const capacityPerMm = phi * 0.6 * fuw * throat * kr / 1000;
  const capacity = capacityPerMm * length * runs;
  const parentPerMm = parentPhi * 0.6 * parentGrade.fup * parentThickness / 1000;
  const parentCheckActive = parentThickness > 0;
  const governingPerMm = parentCheckActive ? Math.min(capacityPerMm, parentPerMm) : capacityPerMm;
  const parentGoverns = parentCheckActive && parentPerMm < capacityPerMm;
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
  $("weldThroatValue").textContent = `${fixed2(throat)} mm`;
  $("weldLengthValue").textContent = `${fixed(length)} mm`;
  $("weldRunsValue").textContent = String(runs);
  $("weldCapacityLabel").innerHTML = type === "fillet" ? "Design weld capacity &phi;V<sub>w</sub>" : "Weld-metal throat capacity";
  $("weldCapacityBasis").textContent = `${typeData.scope}; ${typeData.note}`;
  $("weldCapacity").textContent = fixed(capacity);
  $("weldCapacityPerMm").textContent = capacityPerMm.toFixed(2);
  $("parentGoverningPerMm").textContent = fixed2(governingPerMm);
  $("parentGoverningNote").textContent = !parentCheckActive
    ? "enter ply thickness to check"
    : parentGoverns
      ? `parent metal governs; fup ${parentGrade.fup} MPa`
      : "weld throat governs";
  $("parentGoverningNote").className = parentGoverns ? "fail" : "pass";
  $("weldUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("weldStatus").textContent = !hasDemand ? "Enter design action" : utilisation <= 1 ? "PASS" : "FAIL";
  $("weldStatus").className = !hasDemand ? "" : utilisation <= 1 ? "pass" : "fail";
  $("weldFormulaSteps").innerHTML = `
    <div><b>Selected weld</b><code>${typeData.label} - ${typeData.scope}</code></div>
    <div><b>Design throat</b><code>t<sub>t</sub> = ${type === "fillet" ? `0.707 x ${size.toFixed(0)}` : type === "compound" ? `${effectiveThroat.toFixed(1)} + 0.707 x ${size.toFixed(0)}` : effectiveThroat.toFixed(1)} = ${fixed2(throat)} mm</code></div>
    <div><b>Weld-metal capacity</b><code>&phi;R = 0.80 x 0.6 x ${fuw.toFixed(0)} x ${fixed2(throat)} x ${kr.toFixed(2)} x ${fixed(length)} / 1000 = ${fixed(capacity / runs)} kN per run</code></div>
    <div><b>Weld group</b><code>${runs} effective run${runs === 1 ? "" : "s"} x ${fixed(capacity / runs)} = ${fixed(capacity)} kN</code></div>
    <div><b>Parent metal screen</b><code>${parentCheckActive ? `0.90 x 0.6 x ${parentGrade.fup} x ${fixed2(parentThickness)} / 1000 = ${fixed2(parentPerMm)} kN/mm; governing = ${fixed2(governingPerMm)} kN/mm` : "Not checked - enter ply thickness"}</code></div>
    <div><b>Design boundary</b><code>${callouts[type] || callouts.fillet}; check parent metal, joint preparation, WPS, inspection, fatigue and effective length separately</code></div>`;
}

function populateBeamOptions() {
  $("beamSection").innerHTML = ubSections.map((section, index) => `<option value="${index}">${section.designation}</option>`).join("");
  $("beamSection").value = String(ubSections.findIndex(section => section.designation === "310UB40.4"));
  populateBeamGrades();
}

function populateBeamGrades() {
  const section = ubSections[Number($("beamSection").value) || 0];
  $("beamGrade").innerHTML = Object.keys(section.grades).map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("beamGrade").value = "300PLUS";
  calculateBeam();
}

function calculateBeam() {
  const section = ubSections[Number($("beamSection").value) || 0];
  if (!section) return;
  const gradeName = $("beamGrade").value;
  const grade = section.grades[gradeName];
  if (!grade) return;
  const phi = 0.9;
  const sectionCapacity = phi * grade.fy * grade.Ze / 1000;
  const elasticYield = phi * grade.fy * section.Zx / 1000;
  const plasticLimit = phi * grade.fy * section.Sx / 1000;
  const demand = value("beamMomentDemand");
  const utilisation = sectionCapacity > 0 ? demand / sectionCapacity : Infinity;
  const hasDemand = demand > 0;
  const compactnessLabel = grade.compactness === "C" ? "Compact" : grade.compactness === "N" ? "Non-compact" : "Slender";

  $("beamDesignation").textContent = `${section.designation} - ${gradeName}`;
  $("beamAssumption").textContent = "x-axis section capacity only; full lateral restraint assumed for this quick check";
  $("beamMass").textContent = `${section.mass} kg/m`;
  $("beamArea").textContent = `${section.area.toLocaleString("en-AU")} mm2`;
  $("beamFy").textContent = `${grade.fy} MPa`;
  $("beamZex").textContent = `${grade.Ze.toLocaleString("en-AU")} x 10^3 mm3`;
  $("beamCompactness").textContent = compactnessLabel;
  $("beamSectionCapacity").textContent = fixed(sectionCapacity);
  $("beamElasticYield").textContent = fixed(elasticYield);
  $("beamPlasticLimit").textContent = fixed(plasticLimit);
  $("beamSxValue").textContent = `${section.Sx.toLocaleString("en-AU")} x 10^3 mm3`;
  $("beamZxValue").textContent = `${section.Zx.toLocaleString("en-AU")} x 10^3 mm3`;
  $("beamKfValue").textContent = grade.kf.toFixed(3);
  $("beamClassification").textContent = compactnessLabel;
  $("beamGoverning").textContent = grade.compactness === "C" ? "Effective section modulus equals Sx" : "Effective section modulus reduced from Sx";
  $("beamUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("beamStatus").textContent = !hasDemand ? "Enter design moment" : utilisation <= 1 ? "PASS" : "FAIL";
  $("beamStatus").className = !hasDemand ? "" : utilisation <= 1 ? "pass" : "fail";
  $("beamWarning").textContent = "Section capacity only. Check member moment capacity, lateral restraint, shear, web bearing, web buckling, deflection, openings, concentrated loads and combined actions separately.";
  $("beamFormulaSteps").innerHTML = `
    <div><b>Section data</b><code>${section.designation}; A<sub>g</sub> = ${section.area.toLocaleString("en-AU")} mm&sup2;; mass = ${section.mass} kg/m</code></div>
    <div><b>Catalogue moduli</b><code>S<sub>x</sub> = ${section.Sx.toLocaleString("en-AU")} x 10&sup3; mm&sup3;; Z<sub>x</sub> = ${section.Zx.toLocaleString("en-AU")} x 10&sup3; mm&sup3;; Z<sub>ex</sub> = ${grade.Ze.toLocaleString("en-AU")} x 10&sup3; mm&sup3;</code></div>
    <div><b>Compactness</b><code>${compactnessLabel}; k<sub>f</sub> = ${grade.kf.toFixed(3)} from InfraBuild section-capacity table</code></div>
    <div><b>Elastic yield reference</b><code>&phi;f<sub>y</sub>Z<sub>x</sub> = 0.90 x ${grade.fy} x ${section.Zx.toLocaleString("en-AU")} x 10&sup3; / 10&sup6; = ${fixed(elasticYield)} kNm</code></div>
    <div><b>Plastic limit reference</b><code>&phi;f<sub>y</sub>S<sub>x</sub> = 0.90 x ${grade.fy} x ${section.Sx.toLocaleString("en-AU")} x 10&sup3; / 10&sup6; = ${fixed(plasticLimit)} kNm</code></div>
    <div><b>Section capacity</b><code>&phi;M<sub>s</sub> = &phi;f<sub>y</sub>Z<sub>ex</sub> = 0.90 x ${grade.fy} x ${grade.Ze.toLocaleString("en-AU")} x 10&sup3; / 10&sup6; = ${fixed(sectionCapacity)} kNm</code></div>`;
}

function chsProperties(section) {
  const inner = section.D - 2 * section.t;
  const area = Math.PI / 4 * (section.D ** 2 - inner ** 2);
  const inertia = Math.PI / 64 * (section.D ** 4 - inner ** 4);
  return { area, r: Math.sqrt(inertia / area) };
}

function memberSections() {
  if (memberType === "chs") return chsSections;
  if (memberType === "ea") return eaSections;
  if (memberType === "pfc") return pfcSections;
  return rodSections;
}

function memberProperties(section) {
  return memberType === "chs" ? chsProperties(section) : { area: section.area, r: section.r };
}

function populateMemberOptions() {
  const sections = memberSections();
  $("memberSection").innerHTML = sections.map((section, index) => `<option value="${index}">${section.designation}</option>`).join("");
  $("memberSection").value = memberType === "chs"
    ? String(chsSections.findIndex(s => s.D === 114.3 && s.t === 3.2))
    : memberType === "ea"
      ? String(eaSections.findIndex(s => s.designation === "100 x 100 x 10 EA"))
      : memberType === "pfc"
        ? String(pfcSections.findIndex(s => s.designation === "150PFC"))
        : String(rodSections.findIndex(s => s.diameter === 24));
  populateMemberGrades();
}

function populateMemberGrades() {
  const section = memberSections()[Number($("memberSection").value) || 0];
  const grades = memberType === "chs" ? chsGrades : section.grades;
  $("memberGrade").innerHTML = Object.keys(grades).map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("memberGrade").value = memberType === "chs" ? "C350L0" : "300PLUS";
  const properties = memberProperties(section);
  $("memberNetArea").value = properties.area.toFixed(0);
  $("memberNetArea").max = properties.area.toFixed(0);
  $("memberKt").value = "1";
  calculateMember();
}

function calculateMember() {
  const sections = memberSections();
  const section = sections[Number($("memberSection").value) || 0];
  if (!section) return;
  const gradeName = $("memberGrade").value;
  const grade = memberType === "chs" ? chsGrades[gradeName] : section.grades[gradeName];
  if (!grade) return;
  const properties = memberProperties(section);
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
  $("memberAssumption").innerHTML = memberType === "chs"
    ? "&alpha;<sub>b</sub> = -0.5 - buckling about any axis"
    : memberType === "ea"
      ? `user-selected &alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - minor principal axis properties`
      : memberType === "pfc"
        ? `user-selected &alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - PFC r<sub>min</sub> from catalogue`
        : `user-selected &alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - solid circular rod geometry`;
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
  $("memberWarning").innerHTML = memberType === "chs"
    ? `Centroidal axial load only. Confirm A<sub>n</sub>, k<sub>t</sub>, effective length and the actual connection.${netAreaWarning}`
    : memberType === "ea"
      ? `Confirm &alpha;<sub>b</sub> to AS 4100 Table 6.3.3 and A<sub>n</sub> / k<sub>t</sub> to Clauses 7.2 and 7.3. Flexural-torsional buckling is not checked.${netAreaWarning}`
      : memberType === "pfc"
        ? `PFC quick check uses catalogue A<sub>g</sub> and r<sub>min</sub> for centroidal axial load only. Check axis-specific buckling, torsional/flexural-torsional buckling and connection eccentricity separately.${netAreaWarning}`
        : `Confirm rod product grade, &alpha;<sub>b</sub> to AS 4100 Table 6.3.3, effective length and connection net area.${netAreaWarning}`;
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

function concreteLayer(index, depth, direction) {
  const active = $(`layer${index}Active`).checked;
  const yTop = value(`layer${index}Y`);
  const bar = value(`layer${index}Bar`);
  const spacing = value(`layer${index}Spacing`);
  const fsy = value(`layer${index}Fsy`);
  const es = value(`layer${index}Es`);
  const area = spacing > 0 ? Math.PI * bar ** 2 / 4 * 1000 / spacing : 0;
  return {
    index,
    name: index === 1 ? "Pad / upper pad top mat" : index === 2 ? "Pad / upper pad bottom mat" : index === 3 ? "Lower pad top mat" : "Lower pad bottom mat",
    active,
    yTop,
    d: direction === "top" ? yTop : depth - yTop,
    bar,
    spacing,
    fsy,
    es,
    area
  };
}

function concreteForcesAtX(x, data) {
  const blockDepth = Math.min(data.depth, data.gamma * x);
  const cc = data.alpha2 * data.fc * data.width * blockDepth;
  const yCc = data.direction === "top" ? blockDepth / 2 : data.depth - blockDepth / 2;
  const layers = data.layers.map(layer => {
    const strain = data.ecu * (x - layer.d) / x;
    const stress = Math.max(-layer.fsy, Math.min(layer.fsy, layer.es * strain));
    const force = layer.area * stress;
    return { ...layer, strain, stress, force };
  });
  const axial = cc + layers.reduce((sum, layer) => sum + layer.force, 0);
  return { cc, yCc, blockDepth, layers, axial };
}

function solveConcreteSection(data) {
  const forceAt = x => concreteForcesAtX(x, data).axial;
  let low = 0.5;
  let high = data.depth * 4;
  let fLow = forceAt(low);
  let fHigh = forceAt(high);
  let expanded = 0;
  while (fLow * fHigh > 0 && expanded < 10) {
    high *= 1.8;
    fHigh = forceAt(high);
    expanded += 1;
  }
  if (fLow * fHigh > 0) {
    return { ok: false, message: "No neutral axis solution found for active layers" };
  }
  for (let i = 0; i < 90; i += 1) {
    const mid = (low + high) / 2;
    const fMid = forceAt(mid);
    if (Math.abs(fMid) < 0.5) {
      low = mid;
      high = mid;
      break;
    }
    if (fLow * fMid <= 0) {
      high = mid;
      fHigh = fMid;
    } else {
      low = mid;
      fLow = fMid;
    }
  }
  const x = (low + high) / 2;
  const state = concreteForcesAtX(x, data);
  const momentNmm = state.cc * state.yCc + state.layers.reduce((sum, layer) => sum + layer.force * layer.yTop, 0);
  const muo = Math.abs(momentNmm) / 1e6;
  return { ok: true, x, muo, phiMuo: data.phi * muo, ...state };
}

function renderConcreteSectionSvg(data, result) {
  if (!result.ok) {
    $("concreteSectionSvg").innerHTML = `<svg class="concrete-svg" viewBox="0 0 520 340" role="img" aria-label="Concrete section diagram unavailable"><text x="36" y="170" class="strong-label">${result.message}</text></svg>`;
    $("concreteStrainSvg").innerHTML = `<svg class="concrete-svg" viewBox="0 0 360 340" role="img" aria-label="Strain diagram unavailable"><text x="28" y="170" class="strong-label">No strain diagram available</text></svg>`;
    return;
  }

  const sx = 210;
  const sy = 270;
  const x0 = 78;
  const y0 = 34;
  const secW = sx;
  const secH = sy;
  const yScale = y => y0 + y / data.depth * secH;
  const blockTop = data.direction === "top" ? y0 : yScale(data.depth - result.blockDepth);
  const blockY = blockTop;
  const blockH = Math.max(1, result.blockDepth / data.depth * secH);
  const naY = data.direction === "top" ? yScale(result.x) : yScale(data.depth - result.x);
  const topCoverY = yScale(Math.min(data.depth, data.cover));
  const bottomCoverY = yScale(Math.max(0, data.depth - data.cover));
  const interfaceY = yScale(data.depth * 0.45);
  const interfaceLine = data.composite === "no"
    ? `<line class="warn-line" x1="${x0}" y1="${interfaceY}" x2="${x0 + secW}" y2="${interfaceY}"></line><text x="${x0 + secW + 12}" y="${interfaceY + 4}" class="small-label">interface not verified</text>`
    : "";
  const layerSvg = result.layers.map(layer => {
    const y = yScale(layer.yTop);
    const status = Math.abs(layer.strain) < 0.00005 ? "neutral" : layer.force > 0 ? "compression" : "tension";
    const css = status === "compression" ? "bar-compression" : status === "tension" ? "bar-tension" : "bar-neutral";
    const arrowX1 = status === "compression" ? x0 + secW + 72 : x0 - 38;
    const arrowX2 = status === "compression" ? x0 + secW + 14 : x0 + 44;
    const labelX = status === "compression" ? x0 + secW + 82 : x0 - 62;
    const labelAnchor = status === "compression" ? "start" : "end";
    return `
      <circle class="${css}" cx="${x0 + secW * 0.30}" cy="${y}" r="8"></circle>
      <circle class="${css}" cx="${x0 + secW * 0.50}" cy="${y}" r="8"></circle>
      <circle class="${css}" cx="${x0 + secW * 0.70}" cy="${y}" r="8"></circle>
      <line class="force-arrow" x1="${arrowX1}" y1="${y}" x2="${arrowX2}" y2="${y}"></line>
      <text x="${labelX}" y="${y - 6}" text-anchor="${labelAnchor}" class="strong-label">Fs${layer.index} ${status === "compression" ? "C" : status === "tension" ? "T" : "NA"}</text>
      <text x="${labelX}" y="${y + 9}" text-anchor="${labelAnchor}" class="small-label">${fixed(layer.force / 1000)} kN/m</text>
      <text x="${labelX}" y="${y + 23}" text-anchor="${labelAnchor}" class="small-label">eps_s${layer.index} = ${signedFixed(layer.strain, 5)}</text>`;
  }).join("");

  $("concreteSectionSvg").innerHTML = `
    <svg class="concrete-svg" viewBox="0 0 520 340" role="img" aria-label="Concrete section force diagram">
      <defs><marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#34423b"></path></marker></defs>
      <rect class="section-outline" x="${x0}" y="${y0}" width="${secW}" height="${secH}" rx="2"></rect>
      <rect class="compression-zone" x="${x0}" y="${blockY}" width="${secW}" height="${blockH}"></rect>
      <line class="cover-line" x1="${x0}" y1="${topCoverY}" x2="${x0 + secW}" y2="${topCoverY}"></line>
      <line class="cover-line" x1="${x0}" y1="${bottomCoverY}" x2="${x0 + secW}" y2="${bottomCoverY}"></line>
      <line class="neutral-axis" x1="${x0 - 22}" y1="${naY}" x2="${x0 + secW + 22}" y2="${naY}"></line>
      ${interfaceLine}
      <line class="force-arrow" x1="${x0 + secW + 92}" y1="${data.direction === "top" ? blockY + blockH / 2 : blockY + blockH / 2}" x2="${x0 + secW + 22}" y2="${blockY + blockH / 2}"></line>
      <text x="${x0 + secW + 102}" y="${blockY + blockH / 2 - 4}" class="strong-label">Cc</text>
      <text x="${x0 + secW + 102}" y="${blockY + blockH / 2 + 11}" class="small-label">${fixed(result.cc / 1000)} kN</text>
      ${layerSvg}
      <text x="${x0}" y="${y0 - 12}" class="strong-label">${data.direction === "top" ? "compression face" : "tension face"}</text>
      <text x="${x0}" y="${y0 + secH + 22}" class="strong-label">${data.direction === "top" ? "tension face" : "compression face"}</text>
      <text x="${x0 + secW + 12}" y="${topCoverY - 5}" class="small-label">c_nom = ${fixed(data.cover)} mm</text>
      <text x="${x0 + secW + 12}" y="${naY - 6}" class="strong-label">neutral axis</text>
      <text x="${x0 + secW + 12}" y="${naY + 10}" class="small-label">x = ${fixed(result.x)} mm</text>
    </svg>`;

  const strainTop = data.direction === "top" ? data.ecu : data.ecu * (result.x - data.depth) / result.x;
  const strainBottom = data.direction === "top" ? data.ecu * (result.x - data.depth) / result.x : data.ecu;
  const maxAbs = Math.max(Math.abs(strainTop), Math.abs(strainBottom), data.ecu);
  const cx = 170;
  const px = strain => cx + strain / maxAbs * 95;
  const strainLayerSvg = result.layers.map(layer => {
    const y = yScale(layer.yTop);
    const x = px(layer.strain);
    const status = Math.abs(layer.strain) < 0.00005 ? "neutral" : layer.strain > 0 ? "compression" : "tension";
    return `<circle class="${status === "compression" ? "bar-compression" : status === "tension" ? "bar-tension" : "bar-neutral"}" cx="${x}" cy="${y}" r="5"></circle><text x="${x + 8}" y="${y + 4}" class="small-label">eps_s${layer.index} ${signedFixed(layer.strain, 5)}</text>`;
  }).join("");
  $("concreteStrainSvg").innerHTML = `
    <svg class="concrete-svg" viewBox="0 0 360 340" role="img" aria-label="Linear strain diagram">
      <line class="strain-axis" x1="${cx}" y1="${y0 - 10}" x2="${cx}" y2="${y0 + secH + 10}"></line>
      <line class="strain-axis" x1="${cx - 115}" y1="${naY}" x2="${cx + 115}" y2="${naY}"></line>
      <polyline class="strain-line" points="${px(strainTop)},${y0} ${px(0)},${naY} ${px(strainBottom)},${y0 + secH}"></polyline>
      ${strainLayerSvg}
      <text x="${cx + 104}" y="${y0 + 4}" class="small-label">compression +</text>
      <text x="${cx - 114}" y="${y0 + secH + 15}" class="small-label">tension -</text>
      <text x="${cx + 8}" y="${naY - 7}" class="strong-label">eps = 0</text>
      <text x="${px(strainTop) + 8}" y="${y0 + 13}" class="strong-label">${signedFixed(strainTop, 5)}</text>
      <text x="${px(strainBottom) + 8}" y="${y0 + secH - 6}" class="strong-label">${signedFixed(strainBottom, 5)}</text>
    </svg>`;
}

function calculateConcrete() {
  const depth = value("concreteDepth");
  const direction = $("concreteDirection").value;
  const data = {
    direction,
    width: value("concreteWidth"),
    depth,
    cover: value("concreteCover"),
    fc: value("concreteFc"),
    phi: Math.min(1, Math.max(0.1, value("concretePhi"))),
    alpha2: Math.min(1, Math.max(0.1, value("concreteAlpha2"))),
    gamma: Math.min(1, Math.max(0.1, value("concreteGamma"))),
    ecu: value("concreteEcu"),
    composite: $("concreteComposite").value,
    layers: [1, 2, 3, 4].map(index => concreteLayer(index, depth, direction)).filter(layer => layer.active && layer.area > 0 && layer.yTop >= 0 && layer.yTop <= depth)
  };

  let result = { ok: false, message: "Plain concrete section: no RC ultimate flexural capacity is calculated without active reinforcement mats" };
  if (data.width > 0 && data.depth > 0 && data.fc > 0 && data.ecu > 0 && data.layers.length) {
    result = solveConcreteSection(data);
  }

  renderConcreteSectionSvg(data, result);
  $("concreteDirectionLabel").textContent = direction === "top" ? "top face in compression" : "bottom face in compression";
  $("concreteSummaryTitle").textContent = `${fixed(data.width)} x ${fixed(data.depth)} mm strip - ${direction === "top" ? "top" : "bottom"} face in compression`;
  $("concreteSummaryNote").textContent = data.composite === "yes" ? "Composite action marked as separately confirmed." : "Pad-on-pad composite action not confirmed; do not rely on combined depth without interface design.";
  $("concretePhiNote").textContent = `phi = ${data.phi.toFixed(2)} entered by user; verify ductility and capacity factor to AS 3600.`;

  if (!result.ok) {
    ["concreteNaValue", "concreteCcValue", "concreteMuoValue", "concretePhiMuoValue", "concreteNa", "concreteMuo", "concretePhiMuo"].forEach(id => $(id).textContent = "-");
    $("concreteStatusValue").textContent = "No solution";
    $("concreteEquilibrium").textContent = result.message;
    $("concreteWarningStatus").textContent = "CHECK";
    $("concreteWarningStatus").className = "fail";
    $("concreteLayerResults").innerHTML = "";
    $("concreteFormulaSteps").innerHTML = `<div><b>Status</b><code>${result.message}</code></div><div><b>Plain concrete note</b><code>For an unreinforced pad, use a separate cracking or plain-concrete check to AS 3600. Do not report this as ductile reinforced-concrete phiMuo.</code></div>`;
    return;
  }

  const residual = result.axial / 1000;
  const residualOk = Math.abs(residual) < 0.01;
  const coverWarnings = result.layers.filter(layer => layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2);
  const coverNote = coverWarnings.length
    ? ` Cover warning: ${coverWarnings.map(layer => `mat ${layer.index}`).join(", ")} centroid is inside c_nom + db/2.`
    : "";
  const warningText = (data.composite === "yes"
    ? "Moment section capacity only. Composite action is user-confirmed outside this calculator; still check punching shear, one-way shear, bearing, development length and crack control separately."
    : "Moment section capacity only. Pad-on-pad composite action is not confirmed; check interface shear before using combined depth. Punching shear, one-way shear, bearing, development length and crack control are excluded.") + coverNote;

  $("concreteNaValue").textContent = `${fixed(result.x)} mm`;
  $("concreteCcValue").textContent = `${fixed(result.cc / 1000)} kN`;
  $("concreteMuoValue").textContent = `${fixed(result.muo)} kNm/m`;
  $("concretePhiMuoValue").textContent = `${fixed(result.phiMuo)} kNm/m`;
  $("concreteStatusValue").textContent = residualOk ? "Solved" : "Check residual";
  $("concreteNa").textContent = fixed(result.x);
  $("concreteMuo").textContent = fixed(result.muo);
  $("concretePhiMuo").textContent = fixed(result.phiMuo);
  $("concreteEquilibrium").textContent = `Residual ${residual.toFixed(3)} kN`;
  $("concreteWarningStatus").textContent = data.composite === "yes" && residualOk && !coverWarnings.length ? "SOLVED" : "CHECK";
  $("concreteWarningStatus").className = data.composite === "yes" && residualOk && !coverWarnings.length ? "pass" : "fail";
  $("concreteWarningText").textContent = warningText;

  $("concreteLayerResults").innerHTML = result.layers.map(layer => {
    const status = Math.abs(layer.strain) < 0.00005 ? "Near neutral axis" : layer.force > 0 ? "Compression" : "Tension";
    const coverStatus = layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2 ? "cover check required" : "cover reference OK";
    return `<article><b>Mat ${layer.index} - ${layer.name}</b><span>${status}; y<sub>${layer.index}</sub> = ${fixed(layer.yTop)} mm; A<sub>s${layer.index}</sub> = ${fixed(layer.area)} mm2/m; ${coverStatus}</span><small>&epsilon;<sub>s${layer.index}</sub> = ${signedFixed(layer.strain, 5)}; f<sub>s${layer.index}</sub> = ${signedFixed(layer.stress, 1)} MPa; F<sub>s${layer.index}</sub> = ${signedFixed(layer.force / 1000, 1)} kN/m</small></article>`;
  }).join("");

  $("concreteFormulaSteps").innerHTML = `
    <div><b>Compression face</b><code>${direction === "top" ? "top face" : "bottom face"}; each reinforcement mat is transformed to distance d_i from that face</code></div>
    <div><b>Cover reference</b><code>c_nom = ${fixed(data.cover)} mm is shown on the diagram; bar centroids should normally sit outside c_nom + d_b/2 from the relevant concrete surface</code></div>
    <div><b>Concrete block</b><code>C<sub>c</sub> = &alpha;<sub>2</sub> f'<sub>c</sub> b &gamma;x = ${data.alpha2.toFixed(2)} x ${fixed(data.fc)} x ${fixed(data.width)} x ${data.gamma.toFixed(2)} x ${fixed(result.x)} = ${fixed(result.cc / 1000)} kN</code></div>
    <div><b>Steel strain</b><code>&epsilon;<sub>si</sub> = &epsilon;<sub>cu</sub>(x - d<sub>i</sub>) / x; compression positive, tension negative</code></div>
    <div><b>Steel stress</b><code>f<sub>si</sub> = E<sub>s</sub>&epsilon;<sub>si</sub>, capped at +/- f<sub>sy</sub> for each active layer</code></div>
    <div><b>Force equilibrium</b><code>C<sub>c</sub> + &Sigma;F<sub>s</sub> = ${residual.toFixed(3)} kN residual</code></div>
    <div><b>Nominal moment</b><code>M<sub>uo</sub> = internal force couple = ${fixed(result.muo)} kNm/m</code></div>
    <div><b>Design capacity</b><code>&phi;M<sub>uo</sub> = ${data.phi.toFixed(2)} x ${fixed(result.muo)} = ${fixed(result.phiMuo)} kNm/m; verify &phi; to AS 3600 before issue for design</code></div>`;
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
  if (type === "pfc") $("memberAlphaB").value = "0";
  if (type === "rod") $("memberAlphaB").value = "0";
  populateMemberOptions();
}

function initialise() {
  $("boltSize").innerHTML = Object.keys(boltData).map(size => `<option value="${size}">${size}</option>`).join("");
  $("boltSize").value = "M24";
  populateBoltCategories();
  $("category").value = "8.8/S";
  $("weldSize").innerHTML = weldSizes.map(size => `<option value="${size}">${size} mm</option>`).join("");
  $("weldParentGrade").innerHTML = Object.keys(parentMetalGrades).map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("weldType").value = "fillet";
  $("weldSize").value = "6";
  $("weldParentGrade").value = "Grade 250 plate";
  $("shearPlane").value = "N";
  boltInputIds.forEach(id => $(id).addEventListener("input", calculateBolt));
  weldInputIds.forEach(id => $(id).addEventListener("input", calculateWeld));
  concreteInputIds.forEach(id => $(id).addEventListener("input", calculateConcrete));
  $("boltSize").addEventListener("change", setBoltSize);
  $("shearPlane").addEventListener("input", setPrimaryPlane);
  document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => setTool(button.dataset.tool)));
  window.addEventListener("hashchange", () => setTool(location.hash.slice(1), false));
  $("beamSection").addEventListener("change", populateBeamGrades);
  $("beamGrade").addEventListener("change", calculateBeam);
  $("beamMomentDemand").addEventListener("input", calculateBeam);
  document.querySelectorAll(".member-type").forEach(button => button.addEventListener("click", () => setMemberType(button.dataset.memberType)));
  $("memberSection").addEventListener("change", populateMemberGrades);
  $("memberGrade").addEventListener("change", calculateMember);
  $("memberLength").addEventListener("input", calculateMember);
  $("memberAlphaB").addEventListener("change", calculateMember);
  $("memberNetArea").addEventListener("input", calculateMember);
  $("memberKt").addEventListener("input", calculateMember);
  populateBeamOptions();
  populateMemberOptions();
  calculateBolt();
  calculateWeld();
  calculateConcrete();
  setTool(location.hash.slice(1) || "bolt", false);
}

initialise();
