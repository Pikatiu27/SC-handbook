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
const weldInputIds = ["weldType", "weldSize", "weldCategory", "weldStrength", "weldLength", "weldRuns", "weldEffectiveThroat", "weldLapConnection", "weldDemand", "weldParentThickness", "weldParentGrade"];
const concreteInputIds = [
  "concreteDirection", "concreteWidth", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc", "concretePhi",
  "concreteAlpha2", "concreteGamma", "concreteEcu", "concreteComposite",
  "layer1Active", "layer1Auto", "layer1Y", "layer1Bar", "layer1Spacing", "layer1Fsy", "layer1Es",
  "layer2Active", "layer2Auto", "layer2Y", "layer2Bar", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Active", "layer3Auto", "layer3Y", "layer3Bar", "layer3Spacing", "layer3Fsy", "layer3Es",
  "layer4Active", "layer4Auto", "layer4Y", "layer4Bar", "layer4Spacing", "layer4Fsy", "layer4Es"
];
const concreteBarDiameters = [12, 16, 20, 24, 28, 32, 36];
const concreteBarProducts = Object.fromEntries(
  ["N", "Y"].flatMap(prefix => concreteBarDiameters.map(diameter => {
    const legacy = prefix === "Y";
    return [`${prefix}${diameter}`, {
      designation: `${prefix}${diameter}`,
      diameter,
      fsy: legacy ? 410 : 500,
      legacy
    }];
  }))
);

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

const ucSections = [
  ["310UC158",158,20100,2680,2370,{ "300PLUS": { fy: 280, Ze: 2680, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 2680, compactness: "C", kf: 1.000 } }],
  ["310UC137",137,17500,2300,2050,{ "300PLUS": { fy: 280, Ze: 2300, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 2300, compactness: "C", kf: 1.000 } }],
  ["310UC118",118,15000,1960,1760,{ "300PLUS": { fy: 280, Ze: 1960, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 1950, compactness: "N", kf: 1.000 } }],
  ["310UC96.8",96.8,12400,1600,1450,{ "300PLUS": { fy: 300, Ze: 1560, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 1550, compactness: "N", kf: 1.000 } }],
  ["250UC89.5",89.5,11400,1230,1100,{ "300PLUS": { fy: 280, Ze: 1230, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 1230, compactness: "C", kf: 1.000 } }],
  ["250UC72.9",72.9,9320,992,897,{ "300PLUS": { fy: 300, Ze: 986, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 977, compactness: "N", kf: 1.000 } }],
  ["200UC59.5",59.5,7620,656,584,{ "300PLUS": { fy: 300, Ze: 656, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 656, compactness: "C", kf: 1.000 } }],
  ["200UC52.2",52.2,6660,570,512,{ "300PLUS": { fy: 300, Ze: 570, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 569, compactness: "N", kf: 1.000 } }],
  ["200UC46.2",46.2,5900,500,451,{ "300PLUS": { fy: 300, Ze: 494, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 490, compactness: "N", kf: 1.000 } }],
  ["150UC37.2",37.2,4730,310,274,{ "300PLUS": { fy: 300, Ze: 310, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 340, Ze: 310, compactness: "C", kf: 1.000 } }],
  ["150UC30.0",30.0,3860,250,223,{ "300PLUS": { fy: 320, Ze: 250, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 248, compactness: "N", kf: 1.000 } }],
  ["150UC23.4",23.4,2980,184,166,{ "300PLUS": { fy: 320, Ze: 176, compactness: "N", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 174, compactness: "N", kf: 1.000 } }],
  ["100UC14.8",14.8,1890,74.4,65.6,{ "300PLUS": { fy: 320, Ze: 74.4, compactness: "C", kf: 1.000 }, "Grade 350": { fy: 360, Ze: 74.4, compactness: "C", kf: 1.000 } }]
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
const beamCustomInputIds = ["beamCustomName", "beamCustomMass", "beamCustomArea", "beamCustomFy", "beamCustomZex", "beamCustomSx", "beamCustomZx", "beamCustomCompactness", "beamCustomKf"];
const toolNames = ["bolt", "member", "beam", "weld", "concrete"];
let beamSectionType = "ub";
let memberType = "chs";

function value(id) { return Math.max(0, Number($(id).value) || 0); }
function fixed(number) { return Number(number).toFixed(1); }
function fixed2(number) { return Number(number).toFixed(2); }
function weldLapReduction(lengthMm) {
  const lengthM = lengthMm / 1000;
  if (lengthM <= 1.7) return 1;
  if (lengthM <= 8) return 1.10 - 0.06 * lengthM;
  return 0.62;
}
function weldCapacityFactor(type, category) {
  if (category === "GP") return 0.6;
  return type === "cpbw" ? 0.9 : 0.8;
}
function formatArea(number) { return `${Math.round(number).toLocaleString("en-AU")} mm²`; }
function standardHoleDiameter(diameter) { return diameter <= 24 ? diameter + 2 : diameter + 3; }
function signedFixed(number, digits = 1) { return `${number >= 0 ? "+" : ""}${Number(number).toFixed(digits)}`; }

function calculateBolt() {
  const size = $("boltSize").value;
  const categoryKey = $("category").value;
  const plane = $("shearPlane").value;
  const bolt = boltData[size];
  const category = categories[categoryKey];
  const threadKrd = category.grade === "10.9" ? 0.83 : 1;
  const shankKrd = 1;
  const tension = 0.8 * bolt.As * category.fuf / 1000;
  const threadShear = 0.8 * 0.62 * category.fuf * threadKrd * bolt.Ac / 1000;
  const shankShear = 0.8 * 0.62 * category.fuf * shankKrd * bolt.Ao / 1000;
  const selectedShear = plane === "N" ? threadShear : shankShear;
  const alternateShear = plane === "N" ? shankShear : threadShear;
  const count = Math.max(1, Math.round(value("boltCount")));
  const nThread = Math.round(value("threadPlanes"));
  const nShank = Math.round(value("shankPlanes"));
  const kr = Math.min(1, Math.max(0.75, value("kr")));
  const groupShear = count * 0.8 * 0.62 * category.fuf * kr * (nThread * threadKrd * bolt.Ac + nShank * shankKrd * bolt.Ao) / 1000;
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
  const slipGroupCapacity = slip === null ? null : count * slip;
  const slipTensionCapacity = preload > 0 ? 0.7 * count * preload : null;
  const strengthRatio = groupShear > 0 && count * tension > 0
    ? (value("shearDemand") / groupShear) ** 2 + (value("tensionDemand") / (count * tension)) ** 2
    : Infinity;
  const slipRatio = slipGroupCapacity && slipTensionCapacity
    ? value("shearDemand") / slipGroupCapacity + value("tensionDemand") / slipTensionCapacity
    : Infinity;
  const hasDemand = value("shearDemand") > 0 || value("tensionDemand") > 0;

  const drawingCallout = `${size} ${categoryKey} - ${plane} plane`;
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
  $("boltResultNote").innerHTML = `One shear plane; k<sub>rd</sub> = ${(plane === "N" ? threadKrd : shankKrd).toFixed(2)}; k<sub>r</sub> = ${kr.toFixed(2)}. Keep k<sub>r</sub> = 1.0 unless the actual detail is a bolted lap connection requiring Table 9.2.2.1 reduction.`;
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
  $("interactionRatio").textContent = Number.isFinite(strengthRatio) ? strengthRatio.toFixed(2) : "-";
  $("interactionStatus").textContent = !hasDemand
    ? "Enter design actions"
    : strengthRatio <= 1
        ? "PASS"
        : "FAIL";
  $("interactionStatus").className = !hasDemand ? "" : strengthRatio <= 1 ? "pass" : "fail";

  const slipFormula = slip === null ? "<code>Not applicable - TF categories only</code>" : `<code>0.70 x ${value("slipFactor")} x ${value("interfaces")} x ${preload} x ${value("holeFactor")} = ${fixed(slip)} kN per bolt</code>`;
  const strengthInteractionFormula = `<code>(V<sub>f</sub><sup>*</sup> / &phi;V<sub>f</sub>)<sup>2</sup> + (N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub>)<sup>2</sup> = (${fixed(value("shearDemand"))} / ${fixed(groupShear)})<sup>2</sup> + (${fixed(value("tensionDemand"))} / ${fixed(count * tension)})<sup>2</sup> = ${Number.isFinite(strengthRatio) ? strengthRatio.toFixed(2) : "-"}; limit &le; 1.0</code>`;
  const slipInteractionFormula = slip === null
    ? "<code>Not applicable - AS 4100 Cl. 9.2.3.3 applies to friction-type categories where serviceability slip is limited</code>"
    : `<code>V<sub>sf</sub><sup>*</sup> / &phi;V<sub>sf</sub> + N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub> = ${fixed(value("shearDemand"))} / ${fixed(slipGroupCapacity)} + ${fixed(value("tensionDemand"))} / ${fixed(slipTensionCapacity)} = ${Number.isFinite(slipRatio) ? slipRatio.toFixed(2) : "-"}; &phi;N<sub>tf</sub> = 0.70N<sub>ti</sub> for this serviceability slip check</code>`;
  $("formulaSteps").innerHTML = `
    <div><b>Tension - 9.2.2.2</b><code>0.80 x A<sub>s</sub> x f<sub>uf</sub> = ${fixed(tension)} kN</code></div>
    <div><b>Shear N - 9.2.2.1</b><code>0.80 x 0.62 x ${category.fuf} x ${threadKrd.toFixed(2)} x ${bolt.Ac} / 1000 = ${fixed(threadShear)} kN; k<sub>rd</sub> applies where threads intercept the shear plane</code></div>
    <div><b>Shear X - 9.2.2.1</b><code>0.80 x 0.62 x ${category.fuf} x ${shankKrd.toFixed(2)} x ${bolt.Ao} / 1000 = ${fixed(shankShear)} kN; k<sub>rd</sub> = 1.00 where threads do not intercept the shear plane</code></div>
    <div><b>Bolt group shear - 9.2.2.1</b><code>&phi;V<sub>f</sub> = 0.80 x 0.62 x f<sub>uf</sub> x k<sub>r</sub> x (n<sub>n</sub>k<sub>rd,N</sub>A<sub>c</sub> + n<sub>x</sub>k<sub>rd,X</sub>A<sub>o</sub>) x bolt count = ${fixed(groupShear)} kN; k<sub>rd,N</sub> = ${threadKrd.toFixed(2)}, k<sub>rd,X</sub> = ${shankKrd.toFixed(2)}; default k<sub>r</sub> = 1.0 unless a bolted lap connection reduction applies</code></div>
    <div><b>Ply bearing - 9.2.2.4(1)</b><code>0.90 x 3.2 x d<sub>f</sub> x t<sub>p</sub> x f<sub>up</sub> = ${fixed(bearingFull)} kN</code></div>
    <div><b>Edge limit - 9.2.2.4(2)</b><code>e is hole-centre edge distance; clear edge = e - d<sub>h</sub>/2; a<sub>e</sub> = e - d<sub>h</sub>/2 + d<sub>f</sub>/2 = ${fixed(effectiveEdge)} mm; capacity = ${fixed(bearingEdge)} kN</code></div>
    <div><b>Minimum edge - 9.5.2</b><code>e<sub>min</sub> = ${value("edgeCondition").toFixed(2)}d<sub>f</sub> = ${fixed(minimumEdge)} mm; provided e = ${fixed(actualEdge)} mm - ${edgeDistancePass ? "PASS" : "FAIL"}</code></div>
    <div><b>Governing ply capacity</b><code>min[${fixed(bearingFull)}, ${fixed(bearingEdge)}] = ${fixed(bearing)} kN</code></div>
    <div><b>Combined shear and tension - 9.2.2.3</b>${strengthInteractionFormula}</div>
    <div><b>TF slip - 9.2.3.1</b>${slipFormula}</div>
    <div><b>TF combined slip - 9.2.3.3</b>${slipInteractionFormula}</div>
    <div><b>Strength boundary</b><code>Include prying action in bolt tension where applicable under AS 4100 Cl. 9.1.8. TF categories also require the separate serviceability slip checks above.</code></div>`;
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
  const lapReductionActive = $("weldLapConnection").value === "yes" && type === "fillet";
  const kr = lapReductionActive ? weldLapReduction(length) : 1;
  const parentThickness = value("weldParentThickness");
  const parentGrade = parentMetalGrades[$("weldParentGrade").value] || parentMetalGrades["Grade 250 plate"];
  const phi = weldCapacityFactor(type, category);
  const parentPhi = 0.9;
  const filletThroat = 0.707 * size;
  const throat = type === "fillet" ? filletThroat : type === "compound" ? effectiveThroat + filletThroat : effectiveThroat;
  const capacityPerMm = phi * 0.6 * fuw * throat * kr / 1000;
  const capacity = capacityPerMm * length * runs;
  const parentPerMm = parentPhi * 0.6 * parentGrade.fup * parentThickness / 1000;
  const parentCheckActive = parentThickness > 0;
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
  $("weldCapacityLabel").innerHTML = type === "fillet" ? "Design weld capacity &phi;V<sub>w</sub>" : "Capacity view only";
  $("weldCapacityBasis").textContent = `capacity view only; not a full weld or joint design check; ${typeData.scope}; ${typeData.note}; category ${category}, phi ${phi.toFixed(2)} from AS 4100 Table 3.4`;
  $("weldCapacity").textContent = fixed(capacity);
  $("weldCapacityPerMm").textContent = capacityPerMm.toFixed(2);
  $("parentGoverningPerMm").textContent = parentCheckActive ? fixed2(parentPerMm) : "-";
  $("parentGoverningNote").textContent = !parentCheckActive
    ? "enter ply thickness to check"
    : parentGoverns
      ? `warning only; parent screen below weld, fup ${parentGrade.fup} MPa`
      : "warning only; weld throat lower";
  $("parentGoverningNote").className = parentGoverns ? "fail" : "pass";
  $("weldUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("weldStatus").textContent = !hasDemand ? "Enter design action" : utilisation <= 1 ? "PASS" : "FAIL";
  $("weldStatus").className = !hasDemand ? "" : utilisation <= 1 ? "pass" : "fail";
  $("weldFormulaSteps").innerHTML = `
    <div><b>Selected weld</b><code>${typeData.label} - ${typeData.scope}</code></div>
    <div><b>Design throat</b><code>t<sub>t</sub> = ${type === "fillet" ? `0.707 x ${size.toFixed(0)}` : type === "compound" ? `${effectiveThroat.toFixed(1)} + 0.707 x ${size.toFixed(0)}` : effectiveThroat.toFixed(1)} = ${fixed2(throat)} mm</code></div>
    <div><b>Weld-metal capacity</b><code>&phi;R = ${phi.toFixed(2)} x 0.6 x ${fuw.toFixed(0)} x ${fixed2(throat)} x ${fixed(length)} / 1000 x k<sub>r</sub> ${kr.toFixed(2)} = ${fixed(capacity / runs)} kN per run</code></div>
    <div><b>Lap reduction</b><code>${lapReductionActive ? `AS 4100 Table 9.6.3.10(B); l<sub>w</sub> = ${(length / 1000).toFixed(2)} m, k<sub>r</sub> = ${kr.toFixed(2)}` : "Not applied - welded lap connection option is No or weld type is not fillet"}</code></div>
    <div><b>Effective weld lines</b><code>${runs} identical effective weld line${runs === 1 ? "" : "s"} x ${fixed(capacity / runs)} = ${fixed(capacity)} kN; not welding passes</code></div>
    <div><b>Parent metal screen</b><code>${parentCheckActive ? `0.90 x 0.6 x ${parentGrade.fup} x ${fixed2(parentThickness)} / 1000 = ${fixed2(parentPerMm)} kN/mm; warning only, not used in PASS/FAIL` : "Not checked - enter ply thickness"}</code></div>
    <div><b>Design boundary</b><code>${callouts[type] || callouts.fillet}; capacity view only, not a full weld or joint design check; check parent metal, joint preparation, WPS, inspection, fatigue and effective length separately</code></div>`;
}

function beamCatalogueSections() {
  return beamSectionType === "uc" ? ucSections : ubSections;
}

function formatBeamNumber(number, digits = 1) {
  return Number(number).toLocaleString("en-AU", { maximumFractionDigits: digits });
}

function formatBeamOptional(number, unit, digits = 1) {
  return number > 0 ? `${formatBeamNumber(number, digits)} ${unit}` : "-";
}

function formatBeamModulus(number) {
  return number > 0 ? `${formatBeamNumber(number, 1)} x 10^3 mm3` : "-";
}

function compactnessText(compactness) {
  return compactness === "C" ? "Compact" : compactness === "N" ? "Non-compact" : "Slender";
}

function customBeamSection() {
  const designation = $("beamCustomName").value.trim() || "Custom section";
  const kf = value("beamCustomKf") || 1;
  return {
    designation,
    mass: value("beamCustomMass"),
    area: value("beamCustomArea"),
    Sx: value("beamCustomSx"),
    Zx: value("beamCustomZx"),
    custom: true,
    grades: {
      "User entered": {
        fy: value("beamCustomFy"),
        Ze: value("beamCustomZex"),
        compactness: $("beamCustomCompactness").value || "C",
        kf
      }
    }
  };
}

function selectedBeamSection() {
  if (beamSectionType === "custom") return customBeamSection();
  const sections = beamCatalogueSections();
  return sections.find(section => section.designation === $("beamSection").value) || sections[0];
}

function populateBeamOptions() {
  if (beamSectionType === "custom") {
    calculateBeam();
    return;
  }
  const sections = beamCatalogueSections();
  const previous = $("beamSection").value;
  const fallback = beamSectionType === "uc" ? "200UC46.2" : "310UB40.4";
  const selected = sections.some(section => section.designation === previous) ? previous : fallback;
  $("beamSection").innerHTML = sections.map(section => `<option value="${section.designation}">${section.designation}</option>`).join("");
  $("beamSection").value = selected;
  populateBeamGrades();
}

function populateBeamGrades() {
  const section = selectedBeamSection();
  const previousGrade = $("beamGrade").value || "300PLUS";
  const grades = Object.keys(section.grades);
  $("beamGrade").innerHTML = grades.map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("beamGrade").value = grades.includes(previousGrade) ? previousGrade : grades[0];
  calculateBeam();
}

function setBeamType(type) {
  beamSectionType = type;
  document.querySelectorAll(".beam-type").forEach(button => button.classList.toggle("active", button.dataset.beamType === type));
  const custom = type === "custom";
  $("beamSectionField").hidden = custom;
  $("beamGradeField").hidden = custom;
  $("beamCustomInputs").hidden = !custom;
  populateBeamOptions();
}

function calculateBeam() {
  const section = selectedBeamSection();
  if (!section) return;
  const gradeName = beamSectionType === "custom" ? "User entered" : $("beamGrade").value;
  const grade = section.grades[gradeName];
  if (!grade) return;
  const isCustom = beamSectionType === "custom";
  const phi = 0.9;
  const valid = grade.fy > 0 && grade.Ze > 0;
  const sectionCapacity = valid ? phi * grade.fy * grade.Ze / 1000 : NaN;
  const elasticYield = valid && section.Zx > 0 ? phi * grade.fy * section.Zx / 1000 : NaN;
  const plasticLimit = valid && section.Sx > 0 ? phi * grade.fy * section.Sx / 1000 : NaN;
  const demand = value("beamMomentDemand");
  const utilisation = valid && sectionCapacity > 0 ? demand / sectionCapacity : Infinity;
  const hasDemand = demand > 0;
  const compactnessLabel = compactnessText(grade.compactness);
  const sourceBasis = isCustom ? "User-entered section properties" : `OneSteel / InfraBuild ${beamSectionType.toUpperCase()} catalogue data`;

  $("beamDesignation").textContent = `${section.designation} - ${gradeName}`;
  $("beamAssumption").textContent = isCustom
    ? "selected-axis section capacity only; user-entered properties are not catalogue-checked"
    : "x-axis section capacity only; member capacity and lateral restraint are not checked";
  $("beamMass").textContent = formatBeamOptional(section.mass, "kg/m", 1);
  $("beamArea").textContent = formatBeamOptional(section.area, "mm2", 0);
  $("beamFy").textContent = grade.fy > 0 ? `${formatBeamNumber(grade.fy, 0)} MPa` : "-";
  $("beamZex").textContent = formatBeamModulus(grade.Ze);
  $("beamCompactness").textContent = compactnessLabel;
  $("beamSectionCapacity").textContent = Number.isFinite(sectionCapacity) ? fixed(sectionCapacity) : "-";
  $("beamElasticYield").textContent = Number.isFinite(elasticYield) ? fixed(elasticYield) : "-";
  $("beamPlasticLimit").textContent = Number.isFinite(plasticLimit) ? fixed(plasticLimit) : "-";
  $("beamSxValue").textContent = formatBeamModulus(section.Sx);
  $("beamZxValue").textContent = formatBeamModulus(section.Zx);
  $("beamKfValue").textContent = grade.kf > 0 ? grade.kf.toFixed(3) : "-";
  $("beamClassification").textContent = compactnessLabel;
  $("beamGoverning").textContent = isCustom
    ? "User-entered Zex controls"
    : grade.compactness === "C"
      ? "Effective section modulus equals Sx"
      : "Effective section modulus reduced from Sx";
  $("beamUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("beamStatus").textContent = !valid ? "Invalid input" : !hasDemand ? "Enter design moment" : utilisation <= 1 ? "PASS" : "FAIL";
  $("beamStatus").className = !valid ? "fail" : !hasDemand ? "" : utilisation <= 1 ? "pass" : "fail";
  $("beamWarning").textContent = "Section capacity only. Check member moment capacity, lateral restraint, shear, web bearing, web buckling, deflection, openings, concentrated loads and combined actions separately.";

  if (!valid) {
    $("beamFormulaSteps").innerHTML = `
      <div><b>Required input</b><code>Enter positive f<sub>y</sub> and Z<sub>ex</sub> values before using Custom Section capacity.</code></div>
      <div><b>Design boundary</b><code>Section capacity only; M<sub>b</sub>, lateral restraint, shear, web bearing, deflection and combined actions are not checked.</code></div>`;
    return;
  }

  $("beamFormulaSteps").innerHTML = `
    <div><b>Section data</b><code>${section.designation}; A<sub>g</sub> = ${formatBeamOptional(section.area, "mm&sup2;", 0)}; mass = ${formatBeamOptional(section.mass, "kg/m", 1)}; source = ${sourceBasis}</code></div>
    <div><b>Section moduli</b><code>S<sub>x</sub> = ${formatBeamModulus(section.Sx)}; Z<sub>x</sub> = ${formatBeamModulus(section.Zx)}; Z<sub>ex</sub> = ${formatBeamModulus(grade.Ze)}</code></div>
    <div><b>Compactness</b><code>${compactnessLabel}; k<sub>f</sub> = ${grade.kf.toFixed(3)}${isCustom ? "; user-entered reference value" : " from OneSteel / InfraBuild section-capacity table"}</code></div>
    <div><b>Elastic yield reference</b><code>${Number.isFinite(elasticYield) ? `&phi;f<sub>y</sub>Z<sub>x</sub> = 0.90 x ${formatBeamNumber(grade.fy, 0)} x ${formatBeamNumber(section.Zx, 1)} x 10&sup3; / 10&sup6; = ${fixed(elasticYield)} kNm` : "Not shown - enter Zx for custom reference value"}</code></div>
    <div><b>Plastic limit reference</b><code>${Number.isFinite(plasticLimit) ? `&phi;f<sub>y</sub>S<sub>x</sub> = 0.90 x ${formatBeamNumber(grade.fy, 0)} x ${formatBeamNumber(section.Sx, 1)} x 10&sup3; / 10&sup6; = ${fixed(plasticLimit)} kNm` : "Not shown - enter Sx for custom reference value"}</code></div>
    <div><b>Section capacity</b><code>&phi;M<sub>s</sub> = &phi;f<sub>y</sub>Z<sub>ex</sub> = 0.90 x ${formatBeamNumber(grade.fy, 0)} x ${formatBeamNumber(grade.Ze, 1)} x 10&sup3; / 10&sup6; = ${fixed(sectionCapacity)} kNm</code></div>`;
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
  $("memberKt").value = memberType === "ea" ? "0.85" : "1";
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
  let eta = 0;
  let xi = 1;
  if (lambdaN > 0) {
    alphaA = 2100 * (lambdaN - 13.5) / (lambdaN ** 2 - 15.3 * lambdaN + 2050);
    modifiedLambda = Math.max(0.001, lambdaN + alphaA * alphaB);
    eta = Math.max(0, 0.00326 * (modifiedLambda - 13.5));
    const ratio = modifiedLambda / 90;
    xi = (ratio ** 2 + 1 + eta) / (2 * ratio ** 2);
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
    ? "&alpha;<sub>b</sub> = -0.5 - assumes cold-formed non-stress-relieved CHS"
    : memberType === "ea"
      ? `user-selected &alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - equal-angle principal-axis screen`
      : memberType === "pfc"
        ? `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - hot-rolled channel default for PFC r<sub>min</sub> axial screen`
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
    ? `Centroidal axial load only. Default &alpha;<sub>b</sub> assumes cold-formed non-stress-relieved CHS; confirm hot-formed or stress-relieved sections separately. Confirm A<sub>n</sub>, k<sub>t</sub>, effective length, grade certificate and the actual connection.${netAreaWarning}`
    : memberType === "ea"
      ? `Confirm &alpha;<sub>b</sub> to AS 4100 Table 6.3.3 and A<sub>n</sub> / k<sub>t</sub> to Clauses 7.2 and 7.3. k<sub>t</sub> defaults to 0.85 for a typical eccentrically connected equal-angle input; unequal angles connected by the short leg may require 0.75, and uniform force distribution may justify 1.0. Flexural-torsional buckling is not checked.${netAreaWarning}`
      : memberType === "pfc"
        ? `PFC quick check uses catalogue A<sub>g</sub> and r<sub>min</sub> for centroidal axial load only, with hot-rolled channel &alpha;<sub>b</sub> = 0.5 by default. Check axis-specific buckling, torsional/flexural-torsional buckling and connection eccentricity separately.${netAreaWarning}`
        : `Confirm rod product grade, &alpha;<sub>b</sub> to AS 4100 Table 6.3.3, effective length and connection net area.${netAreaWarning}`;
  $("memberFormulaSteps").innerHTML = `
    <div><b>Design input status</b><code>&alpha;<sub>b</sub>, A<sub>n</sub> and k<sub>t</sub> are connection- and axis-dependent design inputs; confirm them from AS 4100 and project details before issue</code></div>
    <div><b>Section data</b><code>A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; r<sub>min</sub> = ${properties.r.toFixed(1)} mm; f<sub>y</sub> = ${grade.fy} MPa; f<sub>u</sub> = ${grade.fu} MPa; k<sub>f</sub> = ${grade.kf.toFixed(3)}</code></div>
    <div><b>Gross-section yielding - 7.2</b><code>&phi;A<sub>g</sub>f<sub>y</sub> = 0.90 x ${properties.area.toFixed(0)} x ${grade.fy} / 1000 = ${fixed(grossYield)} kN</code></div>
    <div><b>Net-section fracture - 7.2</b><code>&phi;0.85k<sub>t</sub>A<sub>n</sub>f<sub>u</sub> = 0.90 x 0.85 x ${kt.toFixed(2)} x ${netArea.toFixed(0)} x ${grade.fu} / 1000 = ${fixed(netFracture)} kN</code></div>
    <div><b>Design tension capacity - 7.1</b><code>&phi;N<sub>t</sub> = min[${fixed(grossYield)}, ${fixed(netFracture)}] = ${fixed(tensionCapacity)} kN</code></div>
    <div><b>Nominal slenderness</b><code>&lambda;<sub>n</sub> = (L<sub>e</sub>/r) &radic;k<sub>f</sub> &radic;(f<sub>y</sub>/250) = ${lambdaN.toFixed(1)}</code></div>
    <div><b>Modified slenderness</b><code>&lambda; = &lambda;<sub>n</sub> + &alpha;<sub>a</sub>&alpha;<sub>b</sub> = ${modifiedLambda.toFixed(1)}; &alpha;<sub>a</sub> = ${alphaA.toFixed(2)}</code></div>
    <div><b>Member reduction - 6.3.3</b><code>&eta; = 0.00326(&lambda; - 13.5) = ${eta.toFixed(3)}; &xi; = ${xi.toFixed(3)}; &alpha;<sub>c</sub> = ${alphaC.toFixed(3)}</code></div>
    <div><b>Section capacity - 6.2</b><code>&phi;N<sub>s</sub> = 0.90 k<sub>f</sub>A<sub>n</sub>f<sub>y</sub>; quick check assumes no penetrations or unfilled holes, so A<sub>n</sub> = A<sub>g</sub> = ${properties.area.toFixed(0)} mm2; capacity = ${fixed(sectionCompression)} kN</code></div>
    <div><b>Member capacity - 6.3</b><code>&phi;N<sub>c</sub> = &alpha;<sub>c</sub>&phi;N<sub>s</sub> = ${alphaC.toFixed(3)} x ${fixed(sectionCompression)} = ${fixed(memberCompression)} kN</code></div>`;
}

function concreteLayer(index, depth, direction, width) {
  const active = $(`layer${index}Active`).checked;
  const yTop = value(`layer${index}Y`);
  const product = concreteBarProduct(index);
  const bar = product.diameter;
  const spacing = value(`layer${index}Spacing`);
  const fsyInput = value(`layer${index}Fsy`) || product.fsy;
  const fsy = Math.min(600, fsyInput);
  const es = value(`layer${index}Es`);
  const barArea = Math.PI * bar ** 2 / 4;
  const areaPerMetre = spacing > 0 ? barArea * 1000 / spacing : 0;
  const area = spacing > 0 ? barArea * width / spacing : 0;
  return {
    index,
    name: index === 1 ? "Pad / upper pad top mat" : index === 2 ? "Pad / upper pad bottom mat" : index === 3 ? "Lower pad top mat" : "Lower pad bottom mat",
    active,
    yTop,
    d: direction === "top" ? yTop : depth - yTop,
    bar,
    designation: product.designation,
    legacy: product.legacy,
    spacing,
    barArea,
    areaPerMetre,
    fsyInput,
    fsy,
    es,
    area
  };
}

function concreteBarProduct(index) {
  return concreteBarProducts[$(`layer${index}Bar`).value] || concreteBarProducts.N16;
}

function setConcreteBarDefaults(index) {
  $(`layer${index}Fsy`).value = concreteBarProduct(index).fsy;
}

function populateConcreteBarOptions() {
  const groups = ["N", "Y"].map(prefix => {
    const label = prefix === "N" ? "N bars - current notation" : "Y bars - legacy notation";
    const options = concreteBarDiameters.map(diameter => `<option value="${prefix}${diameter}">${prefix}${diameter}</option>`).join("");
    return `<optgroup label="${label}">${options}</optgroup>`;
  }).join("");
  [1, 2, 3, 4].forEach(index => {
    const select = $(`layer${index}Bar`);
    const defaultBar = select.dataset.defaultBar || "N16";
    select.innerHTML = groups;
    select.value = defaultBar;
    setConcreteBarDefaults(index);
  });
}

function concreteAutoDepth(index, topDepth, bottomDepth, cover, bar) {
  const radius = bar / 2;
  const totalDepth = topDepth + bottomDepth;
  if (index === 1) return cover + radius;
  if (index === 2) return Math.max(0, topDepth - cover - radius);
  if (bottomDepth <= 0) return totalDepth + cover + radius;
  if (index === 3) return topDepth + cover + radius;
  return Math.max(0, totalDepth - cover - radius);
}

function updateConcreteMatDepths(topDepth, bottomDepth, cover) {
  [1, 2, 3, 4].forEach(index => {
    const auto = $(`layer${index}Auto`).checked;
    const yInput = $(`layer${index}Y`);
    yInput.readOnly = auto;
    if (!auto) return;
    const bar = concreteBarProduct(index).diameter;
    const y = concreteAutoDepth(index, topDepth, bottomDepth, cover, bar);
    yInput.value = fixed(Math.max(0, y));
  });
}

function concreteStressBlockFactors(fc) {
  const fcLimited = Math.min(120, Math.max(20, fc));
  return {
    alpha2: Math.max(0.67, 0.85 - 0.0015 * fcLimited),
    gamma: Math.max(0.67, 0.97 - 0.0025 * fcLimited)
  };
}

function concreteForcesAtX(x, data) {
  const blockDepth = Math.min(data.depth, data.gamma * x);
  const cc = data.alpha2 * data.fc * data.width * blockDepth;
  const yCc = data.direction === "top" ? blockDepth / 2 : data.depth - blockDepth / 2;
  const layers = data.layers.map(layer => {
    const strain = data.ecu * (x - layer.d) / x;
    const stress = Math.max(-layer.fsy, Math.min(layer.fsy, layer.es * strain));
    const displacedConcreteStress = layer.d <= blockDepth ? data.alpha2 * data.fc : 0;
    const netStress = stress - displacedConcreteStress;
    const force = layer.area * netStress;
    return { ...layer, strain, stress, netStress, displacedConcreteStress, force };
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
  const extremeTensionLayer = state.layers
    .filter(layer => layer.strain < -0.00005)
    .reduce((current, layer) => !current || layer.d > current.d ? layer : current, null);
  const d0 = extremeTensionLayer ? extremeTensionLayer.d : Math.max(...state.layers.map(layer => layer.d));
  const kuo = d0 > 0 ? x / d0 : 0;
  const hasLegacyReinforcement = state.layers.some(layer => layer.legacy);
  const phi = hasLegacyReinforcement ? 0.65 : Math.max(0.65, Math.min(0.85, 1.24 - 13 * kuo / 12));
  return { ok: true, x, d0, kuo, phi, muo, phiMuo: phi * muo, ...state };
}

function drawDashedLine(ctx, x1, y1, x2, y2, dash = [7, 6]) {
  ctx.save();
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawText(ctx, text, x, y, options = {}) {
  ctx.save();
  ctx.fillStyle = options.fill || "#203029";
  ctx.font = `${options.weight || 700} ${options.size || 12}px Aptos, Calibri, Arial, sans-serif`;
  ctx.textAlign = options.align || "left";
  ctx.textBaseline = options.baseline || "alphabetic";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function renderConcreteSectionLayout(data) {
  const canvas = $("concreteLayoutCanvas");
  const legend = $("concreteLayoutLegend");
  const legendSummary = $("concreteLayoutLegendSummary");
  const legendBody = $("concreteLayoutLegendBody");
  if (!canvas || !legend) return;

  const wrap = canvas.parentElement;
  const cssW = Math.max(320, Math.round(wrap.clientWidth || 520));
  const cssH = cssW < 420 ? 170 : 180;
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = "100%";
  canvas.style.height = `${cssH}px`;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cssW, cssH);

  if (data.depth <= 0) {
    drawText(ctx, "Enter a positive pad depth to show the section layout", 28, cssH / 2, { size: 13, weight: 800 });
    if (legendSummary) legendSummary.textContent = "enter pad depth";
    if (legendBody) legendBody.innerHTML = "";
    return;
  }

  const compact = cssW < 480;
  const x0 = compact ? 82 : 118;
  const y0 = 26;
  const secW = compact ? Math.max(115, cssW - 172) : Math.min(270, cssW - 210);
  const secH = cssH - 58;
  const yScale = y => y0 + y / data.depth * secH;
  const barXs = [x0 + secW * 0.25, x0 + secW * 0.50, x0 + secW * 0.75];
  const coverYs = [
    data.topDepth > 0 ? data.cover : null,
    data.topDepth > 0 ? data.topDepth - data.cover : null,
    data.bottomDepth > 0 ? data.topDepth + data.cover : null,
    data.bottomDepth > 0 ? data.depth - data.cover : null
  ].filter(y => y !== null && y >= 0 && y <= data.depth);
  const topPadH = data.topDepth > 0 ? data.topDepth / data.depth * secH : 0;
  const bottomPadH = data.bottomDepth > 0 ? data.bottomDepth / data.depth * secH : 0;
  const interfaceY = data.bottomDepth > 0 ? yScale(data.topDepth) : null;

  ctx.fillStyle = "#f8fbfb";
  ctx.fillRect(x0, y0, secW, secH);
  if (data.topDepth > 0) {
    ctx.fillStyle = "rgba(111, 183, 176, 0.16)";
    ctx.fillRect(x0, y0, secW, topPadH);
  }
  if (data.bottomDepth > 0) {
    ctx.fillStyle = "rgba(228, 160, 100, 0.14)";
    ctx.fillRect(x0, interfaceY, secW, bottomPadH);
  }

  ctx.strokeStyle = "#34423b";
  ctx.lineWidth = 2;
  ctx.strokeRect(x0, y0, secW, secH);

  ctx.strokeStyle = "#8b9892";
  ctx.lineWidth = 1.2;
  coverYs.forEach(y => drawDashedLine(ctx, x0, yScale(y), x0 + secW, yScale(y), [4, 6]));

  if (data.bottomDepth > 0) {
    ctx.strokeStyle = "#d49250";
    ctx.lineWidth = 2;
    drawDashedLine(ctx, x0, interfaceY, x0 + secW, interfaceY, [8, 5]);
    drawText(ctx, "pad interface", x0 + secW + 12, interfaceY + 4, { size: 10, weight: 800, fill: "#6f6256" });
  }

  data.layers.forEach(layer => {
    const y = yScale(layer.yTop);
    ctx.strokeStyle = "#a18a84";
    ctx.lineWidth = 1.4;
    drawDashedLine(ctx, x0 + 26, y, x0 + secW - 26, y, [8, 7]);
    ctx.fillStyle = "#d87873";
    ctx.strokeStyle = "#8b3630";
    ctx.lineWidth = 2;
    barXs.forEach(x => {
      ctx.beginPath();
      ctx.arc(x, y, compact ? 5 : 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    drawText(ctx, `Mat ${layer.index}`, x0 - 10, y + 3, { size: 10, weight: 800, align: "right" });
  });

  ctx.strokeStyle = "#51645b";
  ctx.lineWidth = 1.5;
  drawDashedLine(ctx, x0 - 34, y0, x0 - 34, y0 + secH, [3, 5]);
  drawText(ctx, `D = ${fixed(data.depth)} mm`, x0 - 44, y0 + secH / 2, { size: 10, weight: 800, align: "right", baseline: "middle" });
  drawText(ctx, "top face", x0, y0 - 9, { size: 11, weight: 900 });
  drawText(ctx, "bottom face", x0, y0 + secH + 18, { size: 11, weight: 900 });

  if (!data.layers.length) {
    drawText(ctx, "No active reinforcement mat", x0 + secW + 14, y0 + 24, { size: 10, weight: 800, fill: "#67756f" });
  }

  const rows = data.layers.map(layer => `
    <tr><td>Mat ${layer.index}</td><td>${layer.name}</td><td>${fixed(layer.yTop)} mm</td><td>${layer.designation}</td><td>${fixed(layer.spacing)} mm</td></tr>`).join("");
  if (legendSummary) legendSummary.textContent = `${data.layers.length || "no"} active mat${data.layers.length === 1 ? "" : "s"}; b ${fixed(data.width)} mm, D ${fixed(data.depth)} mm`;
  if (legendBody) legendBody.innerHTML = `
    <div class="layout-meta"><span><b>b</b> ${fixed(data.width)} mm</span><span><b>D<sub>top</sub></b> ${fixed(data.topDepth)} mm</span><span><b>D<sub>bot</sub></b> ${fixed(data.bottomDepth)} mm</span><span><b>c<sub>nom</sub></b> ${fixed(data.cover)} mm</span></div>
    <table><thead><tr><th>Mat</th><th>Location</th><th>y<sub>i</sub></th><th>Bar</th><th>Spacing</th></tr></thead><tbody>${rows || `<tr><td colspan="5">No active reinforcement mat</td></tr>`}</tbody></table>`;
}

function calculateConcrete() {
  const topDepth = value("concreteTopDepth");
  const bottomDepth = value("concreteBottomDepth");
  const depth = topDepth + bottomDepth;
  const direction = $("concreteDirection").value;
  const cover = value("concreteCover");
  const width = value("concreteWidth");
  const fcInput = value("concreteFc");
  const fc = Math.min(120, Math.max(20, fcInput));
  if (fc !== fcInput) $("concreteFc").value = fixed(fc);
  const stressBlock = concreteStressBlockFactors(fc);
  $("concreteAlpha2").value = stressBlock.alpha2.toFixed(3);
  $("concreteGamma").value = stressBlock.gamma.toFixed(3);
  const ecu = 0.003;
  $("concreteEcu").value = ecu.toFixed(4);
  updateConcreteMatDepths(topDepth, bottomDepth, cover);
  const data = {
    direction,
    width,
    depth,
    topDepth,
    bottomDepth,
    cover,
    fc,
    alpha2: stressBlock.alpha2,
    gamma: stressBlock.gamma,
    ecu,
    composite: $("concreteComposite").value,
    layers: [1, 2, 3, 4].map(index => concreteLayer(index, depth, direction, width)).filter(layer => layer.active && layer.area > 0 && layer.yTop >= 0 && layer.yTop <= depth)
  };
  const bottomMatWithoutDepth = bottomDepth <= 0 && ($("layer3Active").checked || $("layer4Active").checked);

  let result = { ok: false, message: "Plain concrete section: no RC ultimate flexural capacity is calculated without active reinforcement mats" };
  if (data.width > 0 && data.depth > 0 && data.fc > 0 && data.ecu > 0 && data.layers.length) {
    result = solveConcreteSection(data);
  }

  renderConcreteSectionLayout(data);
  $("concreteDirectionLabel").textContent = "relative positions";
  $("concreteSummaryTitle").textContent = `${fixed(data.width)} mm strip; D_top ${fixed(data.topDepth)} + D_bot ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm`;
  $("concreteSummaryNote").textContent = data.composite === "yes" ? "Composite action marked as separately confirmed." : "Pad-on-pad composite action not confirmed; do not rely on combined depth without interface design.";
  const legacyLayers = data.layers.filter(layer => layer.legacy);
  const fsyCappedLayers = data.layers.filter(layer => layer.fsyInput > 600);
  $("concretePhiNote").textContent = legacyLayers.length
    ? "Legacy Y bar selected: conservative capacity factor phi = 0.65 is used unless N-class equivalence is verified."
    : "Capacity factor calculated from AS 3600-style pure bending k_uo for N-class reinforcement.";

  if (!result.ok) {
    ["concreteNaValue", "concreteCcValue", "concreteMuoValue", "concretePhiMuoValue", "concreteNa", "concreteMuo", "concretePhiMuo"].forEach(id => $(id).textContent = "-");
    $("concretePhi").value = "";
    $("concreteStatusValue").textContent = "No solution";
    $("concreteEquilibrium").textContent = result.message;
    $("concreteWarningStatus").textContent = "CHECK";
    $("concreteWarningStatus").className = "fail";
    $("concreteLayerResults").innerHTML = "";
    $("concreteFormulaSteps").innerHTML = `<div><b>Status</b><code>${result.message}</code></div><div><b>Plain concrete note</b><code>For an unreinforced pad footing, use a separate AS 3600 Section 20 plain-concrete footing check. Do not report this as ductile reinforced-concrete phiMuo; Section 20 uses a linear stress-strain bending model and takes footing strength depth as nominal depth minus 50 mm.</code></div>`;
    return;
  }

  const residual = result.axial / 1000;
  $("concretePhi").value = result.phi.toFixed(2);
  const residualOk = Math.abs(residual) < 0.01;
  const coverWarnings = result.layers.filter(layer => layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2);
  const coverNote = coverWarnings.length
    ? ` Cover warning: ${coverWarnings.map(layer => `mat ${layer.index}`).join(", ")} centroid is inside c_nom + db/2.`
    : "";
  const bottomPadNote = bottomMatWithoutDepth ? " Bottom pad reinforcement is active but D_bot is zero; enter a bottom pad depth or turn those mats off." : "";
  const legacyNote = legacyLayers.length ? ` Legacy Y bar selected in ${legacyLayers.map(layer => `mat ${layer.index}`).join(", ")}; verify actual yield strength, ductility and condition from project records.` : "";
  const fsyCapNote = fsyCappedLayers.length ? ` AS 3600 reinforcement strength cap: f_sy above 600 MPa is capped for ${fsyCappedLayers.map(layer => `mat ${layer.index}`).join(", ")}.` : "";
  const kuoNote = result.kuo > 0.36 ? ` AS 3600 Cl. 8.1.5 warning: k_uo = ${result.kuo.toFixed(3)} > 0.36; use only where the clause conditions for analysis, compression reinforcement and restraint are satisfied.` : "";
  const warningText = (data.composite === "yes"
    ? "Moment section capacity only. Composite action is user-confirmed outside this calculator; still check punching shear, one-way shear, bearing, development length and crack control separately."
    : "Moment section capacity only. Pad-on-pad composite action is not confirmed; check interface shear before using combined depth. Punching shear, one-way shear, bearing, development length and crack control are excluded.") + coverNote + bottomPadNote + legacyNote + fsyCapNote + kuoNote;

  $("concreteNaValue").textContent = `${fixed(result.x)} mm`;
  $("concreteCcValue").textContent = `${fixed(result.cc / 1000)} kN`;
  $("concreteMuoValue").textContent = `${fixed(result.muo)} kNm`;
  $("concretePhiMuoValue").textContent = `${fixed(result.phiMuo)} kNm`;
  $("concreteStatusValue").textContent = residualOk ? "Solved" : "Check residual";
  $("concreteNa").textContent = fixed(result.x);
  $("concreteMuo").textContent = fixed(result.muo);
  $("concretePhiMuo").textContent = fixed(result.phiMuo);
  $("concreteEquilibrium").textContent = `Residual ${residual.toFixed(3)} kN`;
  $("concreteWarningStatus").textContent = data.composite === "yes" && residualOk && !coverWarnings.length && !bottomMatWithoutDepth && !legacyLayers.length && !fsyCappedLayers.length && result.kuo <= 0.36 ? "SOLVED" : "CHECK";
  $("concreteWarningStatus").className = data.composite === "yes" && residualOk && !coverWarnings.length && !bottomMatWithoutDepth && !legacyLayers.length && !fsyCappedLayers.length && result.kuo <= 0.36 ? "pass" : "fail";
  $("concreteWarningText").textContent = warningText;

  $("concreteLayerResults").innerHTML = result.layers.map(layer => {
    const status = Math.abs(layer.strain) < 0.00005 ? "Near neutral axis" : layer.force > 0 ? "Compression" : "Tension";
    const coverStatus = layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2 ? "cover check required" : "cover reference OK";
    const displacementNote = layer.displacedConcreteStress > 0 ? `; net stress = ${signedFixed(layer.netStress, 1)} MPa after displaced concrete` : "";
    return `<article><b>Mat ${layer.index} - ${layer.name}</b><span>${layer.designation} @ ${fixed(layer.spacing)}; ${status}; y<sub>${layer.index}</sub> = ${fixed(layer.yTop)} mm; A<sub>s${layer.index}</sub> = ${fixed(layer.area)} mm2 per strip (${fixed(layer.areaPerMetre)} mm2/m); ${coverStatus}</span><small>&epsilon;<sub>s${layer.index}</sub> = ${signedFixed(layer.strain, 5)}; f<sub>s${layer.index}</sub> = ${signedFixed(layer.stress, 1)} MPa${displacementNote}; F<sub>s${layer.index}</sub> = ${signedFixed(layer.force / 1000, 1)} kN</small></article>`;
  }).join("");

  $("concreteFormulaSteps").innerHTML = `
    <div><b>Compression face</b><code>${direction === "top" ? "top face" : "bottom face"}; each reinforcement mat is transformed to distance d_i from that face</code></div>
    <div><b>Pad geometry</b><code>D = D_top + D_bot = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm; bottom pad mats require D_bot > 0</code></div>
    <div><b>Cover reference</b><code>c_nom = ${fixed(data.cover)} mm is shown for each pad face; auto y_i uses c_nom + d_b/2 from the relevant pad surface</code></div>
    <div><b>Reinforcement area</b><code>A<sub>si</sub> = A<sub>bar</sub> x b / spacing, using nominal bar diameter; for b = 1000 mm this is the usual mm2/m table value. N bars default to f<sub>sy</sub> = 500 MPa; legacy Y bars default to f<sub>sy</sub> = 410 MPa unless manually overwritten; design-model f<sub>sy</sub> is capped at 600 MPa</code></div>
    <div><b>Stress block</b><code>&alpha;<sub>2</sub> = max(0.85 - 0.0015f'<sub>c</sub>, 0.67) = ${data.alpha2.toFixed(3)}; &gamma; = max(0.97 - 0.0025f'<sub>c</sub>, 0.67) = ${data.gamma.toFixed(3)}</code></div>
    <div><b>Concrete block</b><code>a = min(D, &gamma;x) = min(${fixed(data.depth)}, ${data.gamma.toFixed(3)} x ${fixed(result.x)}) = ${fixed(result.blockDepth)} mm; C<sub>c</sub> = &alpha;<sub>2</sub> f'<sub>c</sub>ba = ${fixed(result.cc / 1000)} kN</code></div>
    <div><b>Steel strain</b><code>&epsilon;<sub>si</sub> = &epsilon;<sub>cu</sub>(x - d<sub>i</sub>) / x; compression positive, tension negative</code></div>
    <div><b>Steel stress</b><code>f<sub>si</sub> = E<sub>s</sub>&epsilon;<sub>si</sub>, capped at +/- f<sub>sy</sub>; for a bar inside the rectangular concrete block, F<sub>si</sub> = A<sub>si</sub>(f<sub>si</sub> - &alpha;<sub>2</sub>f'<sub>c</sub>) to avoid double-counting displaced concrete</code></div>
    <div><b>Force equilibrium</b><code>C<sub>c</sub> + &Sigma;F<sub>s</sub> = ${residual.toFixed(3)} kN residual</code></div>
    <div><b>Nominal moment</b><code>M<sub>uo</sub> = internal force couple = ${fixed(result.muo)} kNm for the selected strip width b</code></div>
    <div><b>Capacity factor</b><code>${legacyLayers.length ? `Legacy Y bar selected: &phi; = 0.65 unless N-class equivalence is verified` : `k<sub>uo</sub> = x / d<sub>o</sub> = ${fixed(result.x)} / ${fixed(result.d0)} = ${result.kuo.toFixed(3)}; &phi; = clamp(1.24 - 13k<sub>uo</sub>/12, 0.65, 0.85)`} = ${result.phi.toFixed(2)}</code></div>
    <div><b>Ductility limit</b><code>${result.kuo > 0.36 ? `k<sub>uo</sub> = ${result.kuo.toFixed(3)} > 0.36; AS 3600 Cl. 8.1.5 conditions must be satisfied before using this as a design section` : `k<sub>uo</sub> = ${result.kuo.toFixed(3)} <= 0.36`}</code></div>
    <div><b>Design capacity</b><code>&phi;M<sub>uo</sub> = ${result.phi.toFixed(2)} x ${fixed(result.muo)} = ${fixed(result.phiMuo)} kNm; verify AS 3600 Table 2.2.2 and ductility class before issue for design</code></div>`;
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
  if (selectedTool === "concrete") calculateConcrete();
}

function setMemberType(type) {
  memberType = type;
  document.querySelectorAll(".member-type").forEach(button => button.classList.toggle("active", button.dataset.memberType === type));
  document.querySelectorAll("[data-member-guide]").forEach(card => {
    card.hidden = card.dataset.memberGuide !== type;
  });
  $("alphaBField").hidden = type === "chs";
  $("memberAlphaBAssumption").innerHTML = type === "chs"
    ? "&alpha;<sub>b</sub> = -0.5 assumed cold-formed non-stress-relieved CHS."
    : type === "pfc"
      ? "&alpha;<sub>b</sub> = 0.5 hot-rolled channel default."
      : "User-selected &alpha;<sub>b</sub>; confirm AS 4100 Table 6.3.3 for the actual member axis.";
  if (type === "ea") $("memberAlphaB").value = "0.5";
  if (type === "pfc") $("memberAlphaB").value = "0.5";
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
  populateConcreteBarOptions();
  boltInputIds.forEach(id => $(id).addEventListener("input", calculateBolt));
  weldInputIds.forEach(id => $(id).addEventListener("input", calculateWeld));
  concreteInputIds.forEach(id => $(id).addEventListener("input", calculateConcrete));
  [1, 2, 3, 4].forEach(index => {
    $(`layer${index}Bar`).addEventListener("change", () => {
      setConcreteBarDefaults(index);
      calculateConcrete();
    });
  });
  $("boltSize").addEventListener("change", setBoltSize);
  $("shearPlane").addEventListener("input", setPrimaryPlane);
  document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => setTool(button.dataset.tool)));
  window.addEventListener("hashchange", () => setTool(location.hash.slice(1), false));
  window.addEventListener("resize", () => {
    if (!$("concretePanel").hidden) calculateConcrete();
  });
  document.querySelector(".concrete-layout-details").addEventListener("toggle", event => {
    if (event.target.open) calculateConcrete();
  });
  document.querySelectorAll(".beam-type").forEach(button => button.addEventListener("click", () => setBeamType(button.dataset.beamType)));
  $("beamSection").addEventListener("change", populateBeamGrades);
  $("beamGrade").addEventListener("change", calculateBeam);
  $("beamMomentDemand").addEventListener("input", calculateBeam);
  beamCustomInputIds.forEach(id => $(id).addEventListener("input", calculateBeam));
  $("beamCustomCompactness").addEventListener("change", calculateBeam);
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
