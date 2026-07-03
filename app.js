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

let edgeBoltCountManual = false;

const weldSizes = [3, 4, 5, 6, 8, 10, 12, 16];
const parentMetalGrades = {
  "Grade 250 plate": { fup: 410, standard: "AS/NZS 3678" },
  "Grade 300 flat bar": { fup: 440, standard: "AS/NZS 3679.1" },
  "Grade 350 plate": { fup: 450, standard: "AS/NZS 3678" }
};
const weldTypeData = {
  fillet: {
    label: "Fillet",
    note: "AS 4100 direct weld capacity for effective throat area",
    throatNote: "equal-leg fillet: 0.707s",
    scope: "ordinary fillet-weld throat check"
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
  "concreteDirection", "concreteWidth", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc",
  "concreteComposite", "concreteSeparatePad", "concreteShearReo", "concreteShearBar", "concreteNsv", "concreteSv", "concreteFsyf",
  "layer1Active", "layer1Auto", "layer1Y", "layer1Bar", "layer1Spacing", "layer1Fsy", "layer1Es",
  "layer2Active", "layer2Auto", "layer2Y", "layer2Bar", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Active", "layer3Auto", "layer3Y", "layer3Bar", "layer3Spacing", "layer3Fsy", "layer3Es",
  "layer4Active", "layer4Auto", "layer4Y", "layer4Bar", "layer4Spacing", "layer4Fsy", "layer4Es"
];
const concreteBarDiameters = [12, 16, 20, 24, 28, 32, 36];
const concreteBarAreas = {
  12: 110,
  16: 200,
  20: 310,
  24: 450,
  28: 620,
  32: 800,
  36: 1020
};
const concreteBarProducts = Object.fromEntries(
  ["N", "Y"].flatMap(prefix => concreteBarDiameters.map(diameter => {
    const legacy = prefix === "Y";
    return [`${prefix}${diameter}`, {
      designation: `${prefix}${diameter}`,
      diameter,
      area: concreteBarAreas[diameter],
      fsy: legacy ? 410 : 500,
      legacy
    }];
  }))
);

const customBeamGradeYields = {
  "Grade 250": 250,
  "Grade 300": 300,
  "Grade 350": 350
};

const beamShearDimensions = {
  "610UB125": { d: 611.6, bf: 229.0, tf: 19.6, d1: 572.4, tw: 11.9 },
  "610UB113": { d: 607.0, bf: 228.0, tf: 17.3, d1: 572.4, tw: 11.2 },
  "610UB101": { d: 602.6, bf: 227.6, tf: 14.8, d1: 572.4, tw: 10.6 },
  "530UB92.4": { d: 533.0, bf: 209.0, tf: 16.5, d1: 501.8, tw: 10.2 },
  "530UB82.0": { d: 528.2, bf: 209.0, tf: 13.2, d1: 501.8, tw: 9.6 },
  "460UB82.1": { d: 460.4, bf: 191.0, tf: 16.0, d1: 422.4, tw: 9.9 },
  "460UB74.6": { d: 457.4, bf: 190.0, tf: 14.5, d1: 428.4, tw: 9.1 },
  "460UB67.1": { d: 453.8, bf: 190.0, tf: 12.7, d1: 428.4, tw: 8.5 },
  "410UB59.7": { d: 406.4, bf: 178.0, tf: 12.8, d1: 380.8, tw: 7.8 },
  "410UB53.7": { d: 402.6, bf: 178.0, tf: 10.9, d1: 380.8, tw: 7.6 },
  "360UB56.7": { d: 358.6, bf: 172.0, tf: 13.0, d1: 332.6, tw: 8.0 },
  "360UB50.7": { d: 355.6, bf: 171.0, tf: 11.5, d1: 332.6, tw: 7.3 },
  "360UB44.7": { d: 352.6, bf: 171.0, tf: 9.7, d1: 332.6, tw: 6.9 },
  "310UB46.2": { d: 307.2, bf: 166.0, tf: 11.8, d1: 283.6, tw: 6.7 },
  "310UB40.4": { d: 304.0, bf: 165.0, tf: 10.2, d1: 283.6, tw: 6.1 },
  "310UB32.0": { d: 298.0, bf: 149.0, tf: 8.0, d1: 282.0, tw: 5.5 },
  "250UB37.3": { d: 256.2, bf: 146.0, tf: 10.9, d1: 234.4, tw: 6.4 },
  "250UB31.4": { d: 251.6, bf: 146.0, tf: 8.6, d1: 234.4, tw: 6.1 },
  "250UB25.7": { d: 248.0, bf: 124.0, tf: 8.0, d1: 220.4, tw: 5.0 },
  "200UB29.8": { d: 207.0, bf: 134.0, tf: 9.6, d1: 187.8, tw: 6.3 },
  "200UB25.4": { d: 203.2, bf: 133.0, tf: 7.8, d1: 187.6, tw: 5.8 },
  "200UB22.3": { d: 201.6, bf: 133.0, tf: 7.0, d1: 187.6, tw: 5.0 },
  "200UB18.2": { d: 198.0, bf: 99.0, tf: 7.0, d1: 184.0, tw: 4.5 },
  "180UB22.2": { d: 179.0, bf: 90.0, tf: 10.0, d1: 159.0, tw: 5.0 },
  "180UB18.1": { d: 175.0, bf: 90.0, tf: 8.0, d1: 159.0, tw: 5.0 },
  "180UB16.1": { d: 173.0, bf: 90.0, tf: 7.0, d1: 159.0, tw: 4.5 },
  "150UB18.0": { d: 155.0, bf: 75.0, tf: 9.5, d1: 136.6, tw: 6.0 },
  "150UB14.0": { d: 150.0, bf: 75.0, tf: 7.0, d1: 136.0, tw: 5.0 },
  "310UC158": { d: 327.2, bf: 311.0, tf: 25.0, d1: 277.2, tw: 15.7 },
  "310UC137": { d: 320.6, bf: 309.0, tf: 21.7, d1: 277.2, tw: 13.8 },
  "310UC118": { d: 314.6, bf: 307.0, tf: 18.7, d1: 277.2, tw: 11.9 },
  "310UC96.8": { d: 308.0, bf: 305.0, tf: 15.4, d1: 277.2, tw: 9.9 },
  "250UC89.5": { d: 260.0, bf: 256.0, tf: 17.3, d1: 225.4, tw: 10.5 },
  "250UC72.9": { d: 253.8, bf: 254.0, tf: 14.2, d1: 225.4, tw: 8.6 },
  "200UC59.5": { d: 209.8, bf: 205.0, tf: 14.2, d1: 181.4, tw: 9.3 },
  "200UC52.2": { d: 206.4, bf: 204.0, tf: 12.5, d1: 181.4, tw: 8.0 },
  "200UC46.2": { d: 203.4, bf: 203.0, tf: 11.0, d1: 181.4, tw: 7.3 },
  "150UC37.2": { d: 161.8, bf: 154.0, tf: 11.5, d1: 138.8, tw: 8.1 },
  "150UC30.0": { d: 157.6, bf: 153.0, tf: 9.4, d1: 138.8, tw: 6.6 },
  "150UC23.4": { d: 152.4, bf: 152.0, tf: 6.8, d1: 138.8, tw: 6.1 },
  "100UC14.8": { d: 97.0, bf: 99.0, tf: 7.0, d1: 83.0, tw: 5.0 }
};

function beamSectionRecord([designation, mass, area, Sx, Zx, grades]) {
  const shear = beamShearDimensions[designation] || {};
  const d = shear.d || 0;
  const bf = shear.bf || 0;
  const d1 = shear.d1 || 0;
  const tw = shear.tw || 0;
  const tf = shear.tf || 0;
  return { designation, mass, area, Sx, Zx, d, bf, d1, tw, tf, Aw: d1 * tw, grades };
}

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
].map(beamSectionRecord);

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
].map(beamSectionRecord);

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
  designation: `${b} x ${b} x ${t} EA`, area, r, rx: r, ry: r, ix: area * r ** 2, iy: area * r ** 2, b, t,
  grades: { "300PLUS": { fy: fy300, fu: 440, kf: kf300 }, "Grade 350": { fy: fy350, fu: 480, kf: kf350 } }
}));

const pfcSections = [
  [380, 55.2, 7030, 147, 30.4, 152, 6.48, 280, 100, 10.0, 17.5],
  [300, 40.1, 5110, 119, 28.1, 72.4, 4.04, 300, 90, 8.0, 16.0],
  [250, 35.5, 4520, 99.9, 28.4, 45.1, 3.64, 300, 90, 8.0, 15.0],
  [230, 25.1, 3200, 91.4, 23.5, 26.8, 1.76, 300, 75, 6.5, 12.0],
  [200, 22.9, 2920, 80.9, 23.8, 19.1, 1.65, 300, 75, 6.0, 12.0],
  [180, 20.9, 2660, 72.9, 23.8, 14.1, 1.51, 300, 75, 6.0, 11.0],
  [150, 17.7, 2250, 60.8, 23.9, 8.34, 1.29, 320, 75, 6.0, 9.5],
  [125, 11.9, 1520, 51.1, 20.8, 3.97, 0.658, 320, 65, 4.7, 7.5],
  [100, 8.33, 1060, 40.4, 15.9, 1.74, 0.267, 320, 50, 4.2, 6.7],
  [75, 5.92, 754, 30.1, 12.6, 0.683, 0.120, 320, 40, 3.8, 6.1]
].map(([depth, mass, area, rx, ry, ix, iy, fy, bf, tw, tf]) => ({
  designation: `${depth}PFC`,
  mass,
  area,
  r: Math.min(rx, ry),
  rx,
  ry,
  ix: ix * 1e6,
  iy: iy * 1e6,
  d: depth,
  bf,
  tw,
  tf,
  grades: { "300PLUS": { fy, fu: 440, kf: 1 } }
}));

function rodGrades(diameter) {
  return {
    "300PLUS": { fy: diameter <= 50 ? 300 : diameter < 100 ? 290 : 280, fu: 440, kf: 1 },
    "Grade 350": { fy: diameter <= 50 ? 340 : diameter < 100 ? 330 : 320, fu: 480, kf: 1 }
  };
}

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
  rx: diameter / 4,
  ry: diameter / 4,
  ix: Math.PI * diameter ** 4 / 64,
  iy: Math.PI * diameter ** 4 / 64,
  grades: rodGrades(diameter)
}));

const customSections = [{
  designation: "Custom / Built-up",
  grades: { "User input": { fy: 350, fu: 450, kf: 1 } }
}];

const chsGrades = {
  C250L0: { fy: 250, fu: 320, kf: 1 },
  C350L0: { fy: 350, fu: 430, kf: 1 }
};

const $ = id => document.getElementById(id);
const boltInputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "plateThickness", "plateStrength", "edgeCondition", "edgeDistance", "edgeForceAngle", "holeDiameter", "edgeBoltCount", "interfaces", "slipFactor", "holeFactor", "shearDemand", "tensionDemand"];
const beamCustomInputIds = ["beamCustomDepth", "beamCustomFlangeWidth", "beamCustomWebThickness", "beamCustomFlangeThickness"];
const toolNames = ["bolt", "member", "beam", "weld", "concrete"];
let beamSectionType = "ub";
let memberType = "chs";
const manualInputIds = [
  "boltCount", "threadPlanes", "shankPlanes", "plateThickness", "plateStrength", "edgeDistance", "edgeForceAngle", "holeDiameter", "edgeBoltCount", "interfaces", "slipFactor", "shearDemand", "tensionDemand",
  "weldLength", "weldRuns", "weldEffectiveThroat", "weldParentThickness", "weldDemand",
  "concreteWidth", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc", "concreteNsv", "concreteSv", "concreteFsyf",
  "layer1Y", "layer1Spacing", "layer1Fsy", "layer1Es", "layer2Y", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Y", "layer3Spacing", "layer3Fsy", "layer3Es", "layer4Y", "layer4Spacing", "layer4Fsy", "layer4Es",
  "beamMomentDemand", "beamShearDemand", "beamCustomDepth", "beamCustomFlangeWidth", "beamCustomWebThickness", "beamCustomFlangeThickness",
  "memberLength", "memberAxialDemand", "memberHoleCount", "memberHoleDiameter", "memberHoleThickness", "memberNetArea",
  "memberDimChsD", "memberDimChsT", "memberDimEaB", "memberDimEaT", "memberDimPfcD", "memberDimPfcBf", "memberDimPfcTw", "memberDimPfcTf", "memberDimRodD",
  "memberCustomName", "memberCustomArea", "memberCustomRx", "memberCustomRy", "memberCustomKf", "memberCustomAlphaBx", "memberCustomAlphaBy", "memberCustomLex", "memberCustomLey"
];
const referenceInputIds = [
  "boltSize", "category", "shearPlane", "kr", "edgeCondition", "holeFactor",
  "weldType", "weldSize", "weldCategory", "weldStrength", "weldLapConnection", "weldParentGrade",
  "concreteDirection", "concreteComposite", "concreteSeparatePad", "concreteShearReo", "concreteShearBar",
  "layer1Active", "layer1Auto", "layer1Bar", "layer2Active", "layer2Auto", "layer2Bar", "layer3Active", "layer3Auto", "layer3Bar", "layer4Active", "layer4Auto", "layer4Bar",
  "beamSection", "beamGrade",
  "memberSection", "memberGrade", "memberFyInput", "memberFuInput", "memberRadiusInput", "memberAlphaB", "memberActionType", "memberNetAreaMode", "memberKt", "memberDimensionOverride"
];

function numericValue(raw) {
  const text = String(raw ?? "").trim().replace(/\s/g, "");
  if (!text || ["+", "-", ".", ",", "+.", "-.", "+,", "-,"].includes(text)) return NaN;
  const normalised = text.includes(".") ? text.replace(/,/g, "") : text.replace(",", ".");
  const number = Number(normalised);
  return Number.isFinite(number) ? number : NaN;
}

function value(id) {
  const number = numericValue($(id).value);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}
function signedValue(id, fallback = 0) {
  const number = numericValue($(id).value);
  return Number.isFinite(number) ? number : fallback;
}
function alphaBInput(id) { return Math.max(-1, Math.min(1, signedValue(id))); }
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
function formatDimension(number, digits = 1) {
  const value = Number(number);
  return Number.isFinite(value) ? value.toFixed(digits).replace(/\.0$/, "") : "—";
}
function formatInertia(number) {
  const value = Number(number);
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)} × 10<sup>6</sup> mm<sup>4</sup>`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)} × 10<sup>3</sup> mm<sup>4</sup>`;
  return `${value.toFixed(0)} mm<sup>4</sup>`;
}
function standardHoleDiameter(diameter) { return diameter <= 24 ? diameter + 2 : diameter + 3; }
function signedFixed(number, digits = 1) { return `${number >= 0 ? "+" : ""}${Number(number).toFixed(digits)}`; }
function safeText(text) {
  return String(text ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}
function clampNumericInput(input) {
  if (!String(input.value ?? "").trim()) return;
  const current = numericValue(input.value);
  if (!Number.isFinite(current)) return;
  const min = input.getAttribute("min") ?? input.dataset.min;
  const max = input.getAttribute("max") ?? input.dataset.max;
  let next = current;
  const minimum = numericValue(min);
  const maximum = numericValue(max);
  if (Number.isFinite(minimum)) next = Math.max(next, minimum);
  if (Number.isFinite(maximum)) next = Math.min(next, maximum);
  input.value = String(next);
}

function enhanceNumberInputs() {
  document.querySelectorAll('input[type="number"], input.numeric-input').forEach(input => {
    input.enterKeyHint = "done";
    if (input.readOnly) return;
    input.type = "text";
    input.inputMode = "decimal";
    input.setAttribute("inputmode", "decimal");
    input.classList.add("numeric-input");
    input.autocomplete = "off";
    if (input.dataset.numericEnhanced !== "true") {
      input.addEventListener("blur", () => clampNumericInput(input));
      input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
          event.preventDefault();
          input.blur();
        }
      });
      input.dataset.numericEnhanced = "true";
    }
  });
}

function markInputSources() {
  manualInputIds.forEach(id => $(id)?.closest("label")?.classList.add("input-manual"));
  referenceInputIds.forEach(id => $(id)?.closest("label")?.classList.add("input-reference"));
}

function calculateBolt() {
  const size = $("boltSize").value;
  const categoryKey = $("category").value;
  const plane = $("shearPlane").value;
  const bolt = boltData[size];
  const category = categories[categoryKey];
  const threadKrd = category.grade === "10.9" ? 0.83 : 1;
  const shankKrd = 1;
  const kr = Math.min(1, Math.max(0.75, value("kr")));
  const tension = 0.8 * bolt.As * category.fuf / 1000;
  const threadShear = 0.8 * 0.62 * category.fuf * threadKrd * kr * bolt.Ac / 1000;
  const shankShear = 0.8 * 0.62 * category.fuf * shankKrd * kr * bolt.Ao / 1000;
  const selectedShear = plane === "N" ? threadShear : shankShear;
  const alternateShear = plane === "N" ? shankShear : threadShear;
  const count = Math.max(1, Math.round(value("boltCount")));
  const nThread = Math.round(value("threadPlanes"));
  const nShank = Math.round(value("shankPlanes"));
  const totalThreadPlanes = count * nThread;
  const totalShankPlanes = count * nShank;
  const totalShearPlanes = totalThreadPlanes + totalShankPlanes;
  const groupShear = 0.8 * 0.62 * category.fuf * kr * (totalThreadPlanes * threadKrd * bolt.Ac + totalShankPlanes * shankKrd * bolt.Ao) / 1000;
  const actualEdge = value("edgeDistance");
  const holeDiameter = value("holeDiameter");
  const edgeForceAngle = Math.min(85, Math.max(0, value("edgeForceAngle")));
  const edgeAngleCos = Math.max(0.0872, Math.cos(edgeForceAngle * Math.PI / 180));
  const edgeDistanceAlongForce = actualEdge / edgeAngleCos;
  const effectiveEdge = Math.max(0, edgeDistanceAlongForce - holeDiameter / 2 + bolt.d / 2);
  const minimumEdge = value("edgeCondition") * bolt.d;
  const edgeDistancePass = actualEdge >= minimumEdge;
  $("edgeBoltCount").max = String(count);
  const edgeBoltCount = Math.max(1, Math.min(count, Math.round(value("edgeBoltCount"))));
  if (String(edgeBoltCount) !== $("edgeBoltCount").value.trim()) $("edgeBoltCount").value = String(edgeBoltCount);
  const plateStrength = value("plateStrength");
  const bearingFull = 0.9 * 3.2 * bolt.d * value("plateThickness") * plateStrength / 1000;
  const bearingEdge = 0.9 * effectiveEdge * value("plateThickness") * plateStrength / 1000;
  const groupBearingFull = count * bearingFull;
  const groupBearingEdge = edgeBoltCount * bearingEdge;
  const preload = category.preload ? bolt[category.preload] : 0;
  const slip = category.type === "friction" ? 0.7 * value("slipFactor") * value("interfaces") * preload * value("holeFactor") : null;
  const slipGroupCapacity = slip === null ? null : count * slip;
  const slipTensionCapacity = preload > 0 ? 0.7 * count * preload : null;
  const designShear = value("shearDemand");
  const designTension = value("tensionDemand");
  const groupPlyCapacity = Math.min(groupBearingFull, groupBearingEdge);
  const boltShearRatio = groupShear > 0 ? designShear / groupShear : Infinity;
  const plyBearingRatio = groupPlyCapacity > 0 ? designShear / groupPlyCapacity : Infinity;
  const boltTensionRatio = count * tension > 0 ? designTension / (count * tension) : Infinity;
  const strengthRatio = groupShear > 0 && count * tension > 0
    ? boltShearRatio ** 2 + boltTensionRatio ** 2
    : Infinity;
  const slipRatio = slipGroupCapacity && slipTensionCapacity
    ? designShear / slipGroupCapacity + designTension / slipTensionCapacity
    : Infinity;
  const hasShearDemand = designShear > 0;
  const hasTensionDemand = designTension > 0;
  const hasDemand = hasShearDemand || hasTensionDemand;
  let governingRatio = NaN;
  let governingNote = "Enter design actions to identify whether bolt shear, bolt tension, combined bolt interaction or connected ply governs.";
  if (hasShearDemand && !hasTensionDemand) {
    governingRatio = Math.max(boltShearRatio, plyBearingRatio);
    governingNote = plyBearingRatio > boltShearRatio
      ? `Shear only: connected ply governs. Check V<sub>b</sub><sup>*</sup> / &phi;V<sub>b</sub> = ${plyBearingRatio.toFixed(2)} under AS 4100 Cl. 9.2.2.4; bolt shear ratio under AS 4100 Cl. 9.2.2.1 = ${boltShearRatio.toFixed(2)}.`
      : `Shear only: bolt shear governs. Check V<sub>f</sub><sup>*</sup> / &phi;V<sub>f</sub> = ${boltShearRatio.toFixed(2)} under AS 4100 Cl. 9.2.2.1; connected ply ratio under AS 4100 Cl. 9.2.2.4 = ${plyBearingRatio.toFixed(2)}.`;
  } else if (!hasShearDemand && hasTensionDemand) {
    governingRatio = boltTensionRatio;
    governingNote = `Tension only: bolt tension governs under AS 4100 Cl. 9.2.2.2. Check N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub> = ${boltTensionRatio.toFixed(2)}.`;
  } else if (hasShearDemand && hasTensionDemand) {
    governingRatio = Math.max(strengthRatio, plyBearingRatio);
    governingNote = plyBearingRatio > strengthRatio
      ? `Shear and tension: connected ply governs in shear under AS 4100 Cl. 9.2.2.4 with ratio ${plyBearingRatio.toFixed(2)}. Bolt combined shear-tension ratio under AS 4100 Cl. 9.2.2.3 = ${strengthRatio.toFixed(2)}.`
      : `Shear and tension: bolt combined shear-tension interaction governs under AS 4100 Cl. 9.2.2.3 with ratio ${strengthRatio.toFixed(2)}. Connected ply ratio under AS 4100 Cl. 9.2.2.4 = ${plyBearingRatio.toFixed(2)}.`;
  }

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
  $("selectedShearNote").innerHTML = plane === "N"
    ? `&phi;V<sub>f</sub> - threads intercept plane - AS 4100 Cl. 9.2.2.1; includes k<sub>r</sub> = ${kr.toFixed(2)}`
    : `&phi;V<sub>f</sub> - threads clear of plane - AS 4100 Cl. 9.2.2.1; includes k<sub>r</sub> = ${kr.toFixed(2)}`;
  $("alternateShearLabel").textContent = `Shear capacity - ${plane === "N" ? "X" : "N"}`;
  $("alternateShearCapacity").textContent = fixed(alternateShear);
  $("alternateShearNote").innerHTML = plane === "N"
    ? `threads clear of plane; includes k<sub>r</sub> = ${kr.toFixed(2)}`
    : `threads intercept plane; includes k<sub>r</sub> = ${kr.toFixed(2)}`;
  $("tensionCapacity").textContent = fixed(tension);
  $("boltResultNote").innerHTML = `One shear-plane &phi;V<sub>f</sub> includes k<sub>rd</sub> = ${(plane === "N" ? threadKrd : shankKrd).toFixed(2)} and k<sub>r</sub> = ${kr.toFixed(2)}. Keep k<sub>r</sub> = 1.0 unless the actual detail is a bolted lap connection requiring AS 4100 Cl. 9.2.2.1 reduction.`;
  $("groupShearCapacity").textContent = `${fixed(groupShear)} kN`;
  $("groupShearBasis").innerHTML = `${count} bolt${count === 1 ? "" : "s"} × (${nThread} N + ${nShank} X) plane${nThread + nShank === 1 ? "" : "s"} per bolt = ${totalThreadPlanes} N + ${totalShankPlanes} X = ${totalShearPlanes} total shear plane${totalShearPlanes === 1 ? "" : "s"}. Change k<sub>r</sub> only for bolted lap connection reduction.`;
  $("plyBearingLimit").textContent = `${fixed(groupBearingFull)} kN`;
  $("edgeTearoutLimit").textContent = `${fixed(groupBearingEdge)} kN`;
  $("bearingCapacity").textContent = `${fixed(groupPlyCapacity)} kN`;
  $("plyBearingBasis").innerHTML = `${count} &times; ${fixed(bearingFull)} kN per bolt`;
  $("edgeTearoutBasis").innerHTML = `${edgeBoltCount} &times; ${fixed(bearingEdge)} kN per edge-line bolt`;
  $("bearingGoverning").textContent = groupBearingEdge <= groupBearingFull ? `edge limit controls; edge-line bolts = ${edgeBoltCount}` : `bearing limit controls; ${count} bolt${count === 1 ? "" : "s"}`;
  $("actualEdgeDistance").textContent = fixed(actualEdge);
  $("minimumEdgeDistance").textContent = fixed(minimumEdge);
  $("effectiveEdgeDistance").textContent = fixed(effectiveEdge);
  $("edgeDistanceStatus").textContent = edgeDistancePass ? "PASS" : "FAIL";
  $("edgeDistanceStatus").className = edgeDistancePass ? "pass" : "fail";
  $("slipCapacity").textContent = slip === null ? "Not applicable" : `${fixed(slip)} kN`;
  $("strengthGoverningRatio").textContent = Number.isFinite(governingRatio) ? governingRatio.toFixed(2) : "—";
  $("strengthGoverningStatus").textContent = !hasDemand
    ? "Enter design actions"
    : governingRatio <= 1
        ? "PASS"
        : "FAIL";
  $("strengthGoverningStatus").className = !hasDemand ? "" : governingRatio <= 1 ? "pass" : "fail";
  $("strengthGoverningNote").innerHTML = governingNote;

  const slipFormula = slip === null ? "<code>Not applicable - TF categories only</code>" : `<code>0.70 x ${value("slipFactor")} x ${value("interfaces")} x ${preload} x ${value("holeFactor")} = ${fixed(slip)} kN per bolt</code>`;
  const strengthInteractionFormula = hasShearDemand && hasTensionDemand
    ? `<code>(V<sub>f</sub><sup>*</sup> / &phi;V<sub>f</sub>)<sup>2</sup> + (N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub>)<sup>2</sup> = (${fixed(designShear)} / ${fixed(groupShear)})<sup>2</sup> + (${fixed(designTension)} / ${fixed(count * tension)})<sup>2</sup> = ${Number.isFinite(strengthRatio) ? strengthRatio.toFixed(2) : "-"}; limit &le; 1.0</code>`
    : "<code>Not applicable unless both shear and tension design actions are entered. Use the separate bolt shear, bolt tension and connected-ply ratios for single-action checks.</code>";
  const slipInteractionFormula = slip === null
    ? "<code>Not applicable - AS 4100 Cl. 9.2.3.3 applies to friction-type categories where serviceability slip is limited</code>"
    : `<code>V<sub>sf</sub><sup>*</sup> / &phi;V<sub>sf</sub> + N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub> = ${fixed(designShear)} / ${fixed(slipGroupCapacity)} + ${fixed(designTension)} / ${fixed(slipTensionCapacity)} = ${Number.isFinite(slipRatio) ? slipRatio.toFixed(2) : "-"}; N<sub>tf</sub> = N<sub>ti</sub> and &phi; = 0.70 for this serviceability slip check</code>`;
  $("formulaSteps").innerHTML = `
    <div><b>Tension - AS 4100 Cl. 9.2.2.2</b><code>0.80 x A<sub>s</sub> x f<sub>uf</sub> = ${fixed(tension)} kN</code></div>
    <div><b>Shear N - AS 4100 Cl. 9.2.2.1</b><code>0.80 x 0.62 x ${category.fuf} x ${threadKrd.toFixed(2)} x k<sub>r</sub> (${kr.toFixed(2)}) x ${bolt.Ac} / 1000 = ${fixed(threadShear)} kN; k<sub>rd</sub> applies where threads intercept the shear plane</code></div>
    <div><b>Shear X - AS 4100 Cl. 9.2.2.1</b><code>0.80 x 0.62 x ${category.fuf} x ${shankKrd.toFixed(2)} x k<sub>r</sub> (${kr.toFixed(2)}) x ${bolt.Ao} / 1000 = ${fixed(shankShear)} kN; k<sub>rd</sub> = 1.00 where threads do not intercept the shear plane</code></div>
    <div><b>Bolt group shear - AS 4100 Cl. 9.2.2.1</b><code>n<sub>n,total</sub> = ${count} x ${nThread} = ${totalThreadPlanes}; n<sub>x,total</sub> = ${count} x ${nShank} = ${totalShankPlanes}; &phi;V<sub>f</sub> = 0.80 x 0.62 x f<sub>uf</sub> x k<sub>r</sub> x (n<sub>n,total</sub>k<sub>rd,N</sub>A<sub>c</sub> + n<sub>x,total</sub>k<sub>rd,X</sub>A<sub>o</sub>) = ${fixed(groupShear)} kN; k<sub>rd,N</sub> = ${threadKrd.toFixed(2)}, k<sub>rd,X</sub> = ${shankKrd.toFixed(2)}; default k<sub>r</sub> = 1.0 unless a bolted lap connection reduction applies</code></div>
    <div><b>Bolt shear ratio - AS 4100 Cl. 9.2.2.1</b><code>V<sub>f</sub><sup>*</sup> / &phi;V<sub>f</sub> = ${fixed(designShear)} / ${fixed(groupShear)} = ${Number.isFinite(boltShearRatio) ? boltShearRatio.toFixed(2) : "-"}</code></div>
    <div><b>Bolt tension ratio - AS 4100 Cl. 9.2.2.2</b><code>N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub> = ${fixed(designTension)} / ${fixed(count * tension)} = ${Number.isFinite(boltTensionRatio) ? boltTensionRatio.toFixed(2) : "-"}</code></div>
    <div><b>Ply material input</b><code>f<sub>up</sub> = ${plateStrength.toFixed(0)} MPa. Default 410 MPa corresponds to AS/NZS 3678 Grade 250 plate; use 440 MPa only where the actual connected ply is AS/NZS 3679.1 Grade 300 flat bar/section or otherwise verified.</code></div>
    <div><b>Ply bearing - AS 4100 Cl. 9.2.2.4(1)</b><code>per bolt = 0.90 x 3.2 x d<sub>f</sub> x t<sub>p</sub> x f<sub>up</sub> = ${fixed(bearingFull)} kN; group = ${count} x ${fixed(bearingFull)} = ${fixed(groupBearingFull)} kN</code></div>
    <div><b>Edge limit - AS 4100 Cl. 9.2.2.4(2)</b><code>θ = ${fixed(edgeForceAngle)}° from edge normal; centre-to-edge distance in force direction = e/cosθ = ${fixed(edgeDistanceAlongForce)} mm; a<sub>e</sub> = e/cosθ - d<sub>h</sub>/2 + d<sub>f</sub>/2 = ${fixed(effectiveEdge)} mm; per edge-line bolt = ${fixed(bearingEdge)} kN; group = edge-line bolts x ${fixed(bearingEdge)} = ${edgeBoltCount} x ${fixed(bearingEdge)} = ${fixed(groupBearingEdge)} kN</code></div>
    <div><b>Minimum edge - AS 4100 Cl. 9.5.2</b><code>e<sub>min</sub> = ${value("edgeCondition").toFixed(2)}d<sub>f</sub> = ${fixed(minimumEdge)} mm; provided e = ${fixed(actualEdge)} mm - ${edgeDistancePass ? "PASS" : "FAIL"}</code></div>
    <div><b>Ply bearing ratio - AS 4100 Cl. 9.2.2.4</b><code>V<sub>b</sub><sup>*</sup> / &phi;V<sub>b</sub> = ${fixed(designShear)} / ${fixed(groupPlyCapacity)} = ${Number.isFinite(plyBearingRatio) ? plyBearingRatio.toFixed(2) : "-"}; governing ply capacity is the lesser of ${fixed(groupBearingFull)} kN bearing and ${fixed(groupBearingEdge)} kN edge limit</code></div>
    <div><b>Governing capacity check</b><code>${governingNote}</code></div>
    <div><b>Combined shear and tension - AS 4100 Cl. 9.2.2.3</b>${strengthInteractionFormula}</div>
    <div><b>TF slip - AS 4100 Cl. 9.2.3.1</b>${slipFormula}</div>
    <div><b>TF combined slip - AS 4100 Cl. 9.2.3.3</b>${slipInteractionFormula}</div>
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
  $("weldPhiValue").textContent = phi.toFixed(2);
  $("weldCapacityLabel").textContent = "Capacity per mm per weld line";
  $("weldCapacityBasis").innerHTML = `${typeData.scope}; category ${category}, &phi; = ${phi.toFixed(2)} from AS 4100 Table 3.4`;
  $("weldCapacity").textContent = fixed(capacity);
  $("weldCapacityPerMm").textContent = capacityPerMm.toFixed(2);
  $("parentGoverningPerMm").textContent = parentCheckActive ? fixed2(parentPerMm) : "-";
  $("parentGoverningNote").textContent = !parentCheckActive
    ? "enter ply thickness to check"
    : parentGoverns
      ? `warning only; parent screen below weld, fup ${parentGrade.fup} MPa`
      : "warning only; weld throat lower";
  $("parentGoverningNote").className = !parentCheckActive ? "" : parentGoverns ? "fail" : "pass";
  $("weldUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("weldStatus").textContent = !hasDemand ? "Enter design action" : utilisation <= 1 ? "PASS" : "FAIL";
  $("weldStatus").className = !hasDemand ? "" : utilisation <= 1 ? "pass" : "fail";
  $("weldFormulaSteps").innerHTML = `
    <div><b>Selected weld</b><code>${typeData.label} - ${typeData.scope}</code></div>
    <div><b>Design throat</b><code>t<sub>t</sub> = ${type === "fillet" ? `0.707 x ${size.toFixed(0)}` : type === "compound" ? `${effectiveThroat.toFixed(1)} + 0.707 x ${size.toFixed(0)}` : effectiveThroat.toFixed(1)} = ${fixed2(throat)} mm</code></div>
    <div><b>Per-mm capacity</b><code>&phi;R / l<sub>w</sub> = ${phi.toFixed(2)} x 0.6 x ${fuw.toFixed(0)} x ${fixed2(throat)} x k<sub>r</sub> (${kr.toFixed(2)}) / 1000 = ${capacityPerMm.toFixed(2)} kN/mm per weld line</code></div>
    <div><b>Lap reduction</b><code>${lapReductionActive ? `AS 4100 Table 9.6.3.10(B); input l<sub>w</sub> = ${fixed(length)} mm = ${(length / 1000).toFixed(2)} m for the table, k<sub>r</sub> = ${kr.toFixed(2)}` : "Not applied - welded lap connection option is No or weld type is not fillet"}</code></div>
    <div><b>Total weld capacity</b><code>${capacityPerMm.toFixed(2)} kN/mm x ${fixed(length)} mm x ${runs} identical effective weld line${runs === 1 ? "" : "s"} = ${fixed(capacity)} kN; lines are not welding passes</code></div>
    <div><b>Parent metal screen</b><code>${parentCheckActive ? `0.90 x 0.6 x f<sub>up</sub> (${parentGrade.fup} MPa, ${parentGrade.standard}) x ${fixed2(parentThickness)} / 1000 = ${fixed2(parentPerMm)} kN/mm; warning only, not used in PASS/FAIL` : "Not checked - enter ply thickness"}</code></div>
    <div><b>Design boundary</b><code>${callouts[type] || callouts.fillet}; capacity view only, not a full weld or joint design check. Excludes longitudinal fillet welds in RHS where t &lt; 3 mm, plug / slot welds, weld groups, parent-metal rupture, HAZ, joint preparation, WPS, inspection, fatigue and effective length checks.</code></div>`;
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
  return number > 0 ? `${formatBeamNumber(number, 1)} × 10³ mm³` : "-";
}

function formatBeamArea(number) {
  return number > 0 ? `${formatBeamNumber(number, 0)} mm²` : "-";
}

function formatBeamDimension(number) {
  return number > 0 ? `${formatBeamNumber(number, 1)} mm` : "-";
}

function beamDimensionsHtml(section) {
  const parts = [
    section.d > 0 ? `d = ${formatBeamDimension(section.d)}` : "",
    section.bf > 0 ? `b<sub>f</sub> = ${formatBeamDimension(section.bf)}` : "",
    section.tw > 0 ? `t<sub>w</sub> = ${formatBeamDimension(section.tw)}` : "",
    section.tf > 0 ? `t<sub>f</sub> = ${formatBeamDimension(section.tf)}` : "",
    section.d1 > 0 ? `d<sub>1</sub> = ${formatBeamDimension(section.d1)}` : ""
  ].filter(Boolean);
  return parts.length ? parts.join("; ") : "-";
}

function beamWebScreenHtml(webShear) {
  if (!Number.isFinite(webShear.slenderness)) return "-";
  return `&lambda;<sub>w</sub> = ${formatBeamNumber(webShear.slenderness, 1)}; &alpha;<sub>v</sub> = ${webShear.alphaV.toFixed(3)}`;
}

function compactnessText(compactness) {
  if (compactness === "C") return "Compact";
  if (compactness === "N") return "Non-compact";
  if (compactness === "E") return "Elastic basis";
  return "Slender";
}

function beamWebShearReduction(section, grade, isCustom) {
  if (!(section.d1 > 0) || !(section.tw > 0) || !(grade.fy > 0)) {
    return {
      alphaV: 1,
      slenderness: NaN,
      threshold: 82,
      basis: "Web slenderness is not available for this quick lookup."
    };
  }
  const slenderness = section.d1 / section.tw * Math.sqrt(grade.fy / 250);
  const threshold = 82;
  const alphaV = slenderness <= threshold ? 1 : Math.min(1, (threshold / slenderness) ** 2);
  return {
    alphaV,
    slenderness,
    threshold,
    basis: slenderness <= threshold
      ? `${isCustom ? "Ideal custom" : "Catalogue"} web shear yield governs for this quick screen.`
      : `Unstiffened web shear-buckling reduction applied for this ${isCustom ? "ideal custom" : "catalogue"} quick screen.`
  };
}

function customBeamGeometry() {
  const d = value("beamCustomDepth");
  const bf = value("beamCustomFlangeWidth");
  const tw = value("beamCustomWebThickness");
  const tf = value("beamCustomFlangeThickness");
  const d1 = Math.max(0, d - 2 * tf);
  const valid = d > 0 && bf > 0 && tw > 0 && tf > 0 && d1 > 0 && bf >= tw;

  if (!valid) {
    return { d, bf, tw, tf, d1, area: 0, Aw: 0, mass: 0, Sx: 0, Zx: 0 };
  }

  const area = 2 * bf * tf + d1 * tw;
  const mass = area * 0.00785;
  const ix = (bf * d ** 3 - (bf - tw) * d1 ** 3) / 12;
  const zx = ix / (d / 2) / 1000;
  const sx = (bf * tf * (d - tf) + tw * d1 ** 2 / 4) / 1000;

  return { d, bf, tw, tf, d1, area, Aw: d1 * tw, mass, Sx: sx, Zx: zx };
}

function customBeamSection() {
  const geometry = customBeamGeometry();
  const designation = geometry.d > 0 && geometry.bf > 0
    ? `Custom I d=${formatBeamNumber(geometry.d, 0)} bf=${formatBeamNumber(geometry.bf, 0)} tw=${formatBeamNumber(geometry.tw, 1)} tf=${formatBeamNumber(geometry.tf, 1)}`
    : "Custom I-section";
  const grades = Object.fromEntries(Object.entries(customBeamGradeYields).map(([name, fy]) => [name, {
    fy,
    Ze: geometry.Zx,
    compactness: "E",
    kf: 0
  }]));
  return {
    designation,
    mass: geometry.mass,
    area: geometry.area,
    Aw: geometry.Aw,
    d1: geometry.d1,
    tw: geometry.tw,
    d: geometry.d,
    bf: geometry.bf,
    tf: geometry.tf,
    Sx: geometry.Sx,
    Zx: geometry.Zx,
    custom: true,
    grades
  };
}

function selectedBeamSection() {
  if (beamSectionType === "custom") return customBeamSection();
  const sections = beamCatalogueSections();
  return sections.find(section => section.designation === $("beamSection").value) || sections[0];
}

function populateBeamOptions() {
  if (beamSectionType === "custom") {
    populateBeamGrades();
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
  const previousGrade = $("beamGrade").value || (beamSectionType === "custom" ? "Grade 300" : "300PLUS");
  const grades = Object.keys(section.grades);
  $("beamGrade").innerHTML = grades.map(grade => `<option value="${grade}">${grade}</option>`).join("");
  const defaultGrade = beamSectionType === "custom" && grades.includes("Grade 300") ? "Grade 300" : grades[0];
  $("beamGrade").value = grades.includes(previousGrade) ? previousGrade : defaultGrade;
  calculateBeam();
}

function setBeamType(type) {
  beamSectionType = type;
  document.querySelectorAll(".beam-type").forEach(button => button.classList.toggle("active", button.dataset.beamType === type));
  document.querySelectorAll("[data-beam-guide]").forEach(card => {
    card.hidden = card.dataset.beamGuide !== type;
  });
  const custom = type === "custom";
  $("beamSectionField").hidden = custom;
  $("beamGradeField").hidden = false;
  $("beamCustomInputs").hidden = !custom;
  $("beamSectionGuide").hidden = custom;
  populateBeamOptions();
}

function calculateBeam() {
  const section = selectedBeamSection();
  if (!section) return;
  const gradeName = $("beamGrade").value;
  const grade = section.grades[gradeName];
  if (!grade) return;
  const isCustom = beamSectionType === "custom";
  const phi = 0.9;
  const validMoment = grade.fy > 0 && grade.Ze > 0;
  const validShear = grade.fy > 0 && section.Aw > 0;
  const valid = validMoment && validShear;
  const sectionCapacity = validMoment ? phi * grade.fy * grade.Ze / 1000 : NaN;
  const webShear = beamWebShearReduction(section, grade, isCustom);
  const shearYieldCapacity = validShear ? phi * 0.6 * grade.fy * section.Aw / 1000 : NaN;
  const shearCapacity = validShear ? shearYieldCapacity * webShear.alphaV : NaN;
  const elasticYield = validMoment && section.Zx > 0 ? phi * grade.fy * section.Zx / 1000 : NaN;
  const plasticLimit = validMoment && section.Sx > 0 ? phi * grade.fy * section.Sx / 1000 : NaN;
  const momentDemand = value("beamMomentDemand");
  const shearDemand = value("beamShearDemand");
  const momentRatio = validMoment && sectionCapacity > 0 ? momentDemand / sectionCapacity : Infinity;
  const shearRatio = validShear && shearCapacity > 0 ? shearDemand / shearCapacity : Infinity;
  const utilisation = valid ? Math.max(momentDemand > 0 ? momentRatio : 0, shearDemand > 0 ? shearRatio : 0) : Infinity;
  const hasDemand = momentDemand > 0 || shearDemand > 0;
  const highShear = validShear && shearDemand > 0.6 * shearCapacity;
  const interactionReview = highShear && momentDemand > 0;
  const shearReductionApplied = validShear && webShear.alphaV < 0.9995;
  const compactnessLabel = compactnessText(grade.compactness);
  const sourceBasis = isCustom ? "Dimension-generated symmetric I-section geometry" : `OneSteel / InfraBuild ${beamSectionType.toUpperCase()} catalogue data`;
  const shearAreaBasis = isCustom
    ? `A<sub>w</sub> = d<sub>1</sub>t<sub>w</sub> = ${formatBeamNumber(section.d1, 1)} x ${formatBeamNumber(section.tw, 1)} = ${formatBeamArea(section.Aw)} from custom dimensions`
    : `A<sub>w</sub> = d<sub>1</sub>t<sub>w</sub> = ${formatBeamNumber(section.d1, 1)} x ${formatBeamNumber(section.tw, 1)} = ${formatBeamArea(section.Aw)}`;
  const webShearBasis = isCustom
    ? `d<sub>1</sub>/t<sub>w</sub> &radic;(f<sub>y</sub>/250) = ${formatBeamNumber(webShear.slenderness, 1)}; AS 4100 Cl. 5.11.5 screen limit = ${webShear.threshold}; &alpha;<sub>v</sub> = ${webShear.alphaV.toFixed(3)}. ${webShear.basis}`
    : `d<sub>1</sub>/t<sub>w</sub> &radic;(f<sub>y</sub>/250) = ${formatBeamNumber(webShear.slenderness, 1)}; AS 4100 Cl. 5.11.5 screen limit = ${webShear.threshold}; &alpha;<sub>v</sub> = ${webShear.alphaV.toFixed(3)}. ${webShear.basis}`;

  $("beamDesignation").textContent = `${section.designation} - ${gradeName}`;
  $("beamAssumption").textContent = isCustom
    ? "dimension-generated symmetric I-section; elastic Zx used as Zex for moment"
    : "x-axis section moment and web shear only; member capacity and lateral restraint are not checked";
  $("beamMass").textContent = formatBeamOptional(section.mass, "kg/m", 1);
  $("beamArea").textContent = formatBeamArea(section.area);
  $("beamAw").textContent = formatBeamArea(section.Aw);
  $("beamDimensions").innerHTML = beamDimensionsHtml(section);
  $("beamSummarySx").innerHTML = formatBeamModulus(section.Sx);
  $("beamSummaryZx").innerHTML = formatBeamModulus(section.Zx);
  $("beamFy").textContent = grade.fy > 0 ? `${formatBeamNumber(grade.fy, 0)} MPa` : "-";
  $("beamZex").innerHTML = formatBeamModulus(grade.Ze);
  $("beamSummaryKf").textContent = grade.kf > 0 ? grade.kf.toFixed(3) : "-";
  $("beamCompactness").textContent = compactnessLabel;
  $("beamWebScreen").innerHTML = beamWebScreenHtml(webShear);
  $("beamSectionCapacity").textContent = Number.isFinite(sectionCapacity) ? fixed(sectionCapacity) : "-";
  $("beamShearCapacity").textContent = Number.isFinite(shearCapacity) ? fixed(shearCapacity) : "-";
  $("beamPlasticLimit").textContent = Number.isFinite(plasticLimit) ? fixed(plasticLimit) : "-";
  $("beamSxValue").innerHTML = formatBeamModulus(section.Sx);
  $("beamZxValue").innerHTML = formatBeamModulus(section.Zx);
  $("beamAwValue").textContent = formatBeamArea(section.Aw);
  $("beamKfValue").textContent = grade.kf > 0 ? grade.kf.toFixed(3) : "-";
  $("beamClassification").textContent = compactnessLabel;
  $("beamGoverning").innerHTML = isCustom
    ? (shearReductionApplied ? "Auto geometry, reduced shear" : "Auto geometry, Z<sub>ex</sub> = Z<sub>x</sub>")
    : shearReductionApplied
      ? "Catalogue Z<sub>ex</sub> and reduced shear"
      : grade.compactness === "C"
        ? "Catalogue Z<sub>ex</sub> and A<sub>w</sub>"
        : "Catalogue reduced Z<sub>ex</sub> and A<sub>w</sub>";
  $("beamUtilisation").textContent = Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("beamStatus").textContent = !valid
    ? "Invalid input"
    : !hasDemand
      ? "Enter design actions"
      : utilisation > 1
        ? "FAIL"
        : highShear
          ? "CHECK"
          : "PASS";
  $("beamStatus").className = !valid
    ? "fail"
    : !hasDemand
      ? ""
      : utilisation > 1
        ? "fail"
        : highShear
          ? "check"
          : "pass";
  if (!valid) {
    $("beamWarning").textContent = "Enter valid custom I-section dimensions and select a steel grade before using the Beam Section capacity check.";
  } else {
    const beamWarnings = [];
    if (utilisation > 1) {
      beamWarnings.push("Design action exceeds the reported AS 4100 section design capacity.");
    }
    if (interactionReview) {
      beamWarnings.push("High shear with bending: V* exceeds 0.60 phi Vv. Complete AS 4100 Cl. 5.12 shear-bending interaction review; the unreduced phi Ms is not a final pass value.");
    } else if (highShear) {
      beamWarnings.push("High shear: V* exceeds 0.60 phi Vv. Treat the result as CHECK unless concurrent bending is confirmed absent; otherwise complete AS 4100 Cl. 5.12.");
    }
    if (shearReductionApplied) {
      beamWarnings.push(`AS 4100 Cl. 5.11.5 web shear-buckling reduction applied with alpha_v = ${webShear.alphaV.toFixed(3)}.`);
    }
    if (isCustom) {
      beamWarnings.push("Custom mode uses ideal symmetric I-section geometry with Zex = Zx. Verify plate slenderness classification, fillets, weld details, holes, tolerances and member design separately.");
    }
    if (!beamWarnings.length) {
      beamWarnings.push("Section capacity only. Check member moment capacity, lateral restraint, web bearing, web buckling, deflection, openings, concentrated loads and combined actions separately.");
    }
    $("beamWarning").textContent = beamWarnings.join(" ");
  }

  if (!valid) {
    $("beamFormulaSteps").innerHTML = `
      <div><b>Required input</b><code>Enter positive d, b<sub>f</sub>, t<sub>w</sub> and t<sub>f</sub> values with d &gt; 2t<sub>f</sub> and b<sub>f</sub> &ge; t<sub>w</sub>.</code></div>
      <div><b>Design boundary</b><code>Section capacity only; M<sub>b</sub>, lateral restraint, web bearing, web buckling, deflection and concentrated-load checks are not included.</code></div>`;
    return;
  }

  $("beamFormulaSteps").innerHTML = `
    <div><b>Section data</b><code>${section.designation}; A<sub>g</sub> = ${formatBeamArea(section.area)}; mass = ${formatBeamOptional(section.mass, "kg/m", 1)}; source = ${sourceBasis}</code></div>
    <div><b>Section moduli</b><code>S<sub>x</sub> = ${formatBeamModulus(section.Sx)}; Z<sub>x</sub> = ${formatBeamModulus(section.Zx)}; Z<sub>ex</sub> = ${formatBeamModulus(grade.Ze)}</code></div>
    <div><b>Compactness</b><code>${isCustom ? `${compactnessLabel}; custom moment check uses elastic Z<sub>x</sub> as Z<sub>ex</sub>, so plastic compactness is not claimed` : `${compactnessLabel}; k<sub>f</sub> = ${grade.kf.toFixed(3)} from OneSteel / InfraBuild section-capacity table`}</code></div>
    <div><b>Elastic yield reference</b><code>${Number.isFinite(elasticYield) ? `&phi;f<sub>y</sub>Z<sub>x</sub> = 0.90 × ${formatBeamNumber(grade.fy, 0)} × ${formatBeamNumber(section.Zx, 1)} × 10³ / 10⁶ = ${fixed(elasticYield)} kNm` : "Not shown - enter Zx for custom reference value"}</code></div>
    <div><b>Plastic limit reference</b><code>${Number.isFinite(plasticLimit) ? `&phi;f<sub>y</sub>S<sub>x</sub> = 0.90 × ${formatBeamNumber(grade.fy, 0)} × ${formatBeamNumber(section.Sx, 1)} × 10³ / 10⁶ = ${fixed(plasticLimit)} kNm` : "Not shown - enter Sx for custom reference value"}</code></div>
    <div><b>Moment capacity - AS 4100 Cl. 5.2</b><code>&phi;M<sub>s</sub> = &phi;f<sub>y</sub>Z<sub>ex</sub> = 0.90 × ${formatBeamNumber(grade.fy, 0)} × ${formatBeamNumber(grade.Ze, 1)} × 10³ / 10⁶ = ${fixed(sectionCapacity)} kNm</code></div>
    <div><b>Web shear area</b><code>${shearAreaBasis}</code></div>
    <div><b>Web shear yield - AS 4100 Cl. 5.11.4</b><code>&phi;V<sub>w</sub> = 0.90 × 0.6 × ${formatBeamNumber(grade.fy, 0)} × ${formatBeamArea(section.Aw)} / 1000 = ${fixed(shearYieldCapacity)} kN</code></div>
    <div><b>Web shear buckling screen - AS 4100 Cl. 5.11.5</b><code>${webShearBasis}</code></div>
    <div><b>Design web shear capacity - AS 4100 Cl. 5.11</b><code>&phi;V<sub>v</sub> = &alpha;<sub>v</sub>&phi;V<sub>w</sub> = ${webShear.alphaV.toFixed(3)} × ${fixed(shearYieldCapacity)} = ${fixed(shearCapacity)} kN</code></div>
    <div><b>Design action check</b><code>M* / &phi;M<sub>s</sub> = ${fixed(momentDemand)} / ${fixed(sectionCapacity)} = ${momentRatio.toFixed(2)}; V* / &phi;V<sub>v</sub> = ${fixed(shearDemand)} / ${fixed(shearCapacity)} = ${shearRatio.toFixed(2)}; governing ratio = ${utilisation.toFixed(2)}</code></div>
    <div><b>High shear threshold - AS 4100 Cl. 5.12</b><code>0.60&phi;V<sub>v</sub> = ${fixed(0.6 * shearCapacity)} kN; provided V* = ${fixed(shearDemand)} kN - ${highShear ? "CHECK: shear-bending interaction review required unless bending is confirmed absent" : "below high-shear threshold"}</code></div>
    <div><b>Design boundary</b><code>Section capacity only; member capacity M<sub>b</sub>, lateral restraint, web bearing, web buckling, stiffeners, concentrated loads, openings, torsion, serviceability and composite action are not checked.</code></div>`;
}

function chsProperties(section) {
  const inner = section.D - 2 * section.t;
  const area = Math.PI / 4 * (section.D ** 2 - inner ** 2);
  const inertia = Math.PI / 64 * (section.D ** 4 - inner ** 4);
  return { area, r: Math.sqrt(inertia / area), ix: inertia, iy: inertia };
}

function memberDimensionOverrideActive() {
  return memberType !== "custom" && Boolean($("memberDimensionOverride")?.checked);
}

function memberDimensionLabel(properties) {
  if (memberType === "chs") return `D = ${formatDimension(properties.D)} mm; t = ${formatDimension(properties.t)} mm`;
  if (memberType === "rod") return `d = ${formatDimension(properties.diameter)} mm`;
  if (memberType === "ea") return `b = ${formatDimension(properties.b, 0)} mm; t = ${formatDimension(properties.t)} mm`;
  if (memberType === "pfc") return `d = ${formatDimension(properties.d, 0)} mm; b<sub>f</sub> = ${formatDimension(properties.bf, 0)} mm; t<sub>w</sub> = ${formatDimension(properties.tw)} mm; t<sub>f</sub> = ${formatDimension(properties.tf)} mm`;
  return "User-entered effective properties";
}

function chsGeometry(D, t) {
  const outsideDiameter = Math.max(0.1, D);
  const wallThickness = Math.max(0.1, Math.min(t, outsideDiameter / 2 - 0.05));
  const inner = outsideDiameter - 2 * wallThickness;
  const area = Math.PI / 4 * (outsideDiameter ** 2 - inner ** 2);
  const inertia = Math.PI / 64 * (outsideDiameter ** 4 - inner ** 4);
  const radius = Math.sqrt(inertia / area);
  return { designation: `${outsideDiameter.toFixed(1)} x ${wallThickness.toFixed(1)} CHS`, area, r: radius, rx: radius, ry: radius, ix: inertia, iy: inertia, D: outsideDiameter, t: wallThickness, customGeometry: true };
}

function rodGeometry(diameter) {
  const d = Math.max(0.1, diameter);
  const radius = d / 4;
  const inertia = Math.PI * d ** 4 / 64;
  return { designation: `Round ${d.toFixed(1)}`, area: Math.PI * d ** 2 / 4, r: radius, rx: radius, ry: radius, ix: inertia, iy: inertia, diameter: d, customGeometry: true };
}

function compositeSectionProperties(parts) {
  const area = parts.reduce((sum, part) => sum + part.sign * part.area, 0);
  const xBar = parts.reduce((sum, part) => sum + part.sign * part.area * part.x, 0) / area;
  const yBar = parts.reduce((sum, part) => sum + part.sign * part.area * part.y, 0) / area;
  const ix = parts.reduce((sum, part) => sum + part.sign * (part.ix + part.area * (part.y - yBar) ** 2), 0);
  const iy = parts.reduce((sum, part) => sum + part.sign * (part.iy + part.area * (part.x - xBar) ** 2), 0);
  return { area, xBar, yBar, ix, iy, rx: Math.sqrt(ix / area), ry: Math.sqrt(iy / area) };
}

function rectanglePart(width, height, x, y, sign = 1) {
  return {
    sign,
    area: width * height,
    x,
    y,
    ix: width * height ** 3 / 12,
    iy: height * width ** 3 / 12
  };
}

function eaGeometry(b, t) {
  const leg = Math.max(0.1, b);
  const thickness = Math.max(0.1, Math.min(t, leg));
  const section = compositeSectionProperties([
    rectanglePart(leg, thickness, leg / 2, thickness / 2),
    rectanglePart(thickness, leg, thickness / 2, leg / 2),
    rectanglePart(thickness, thickness, thickness / 2, thickness / 2, -1)
  ]);
  return { designation: `${leg.toFixed(0)} x ${leg.toFixed(0)} x ${thickness.toFixed(1)} EA`, area: section.area, r: Math.min(section.rx, section.ry), rx: section.rx, ry: section.ry, ix: section.ix, iy: section.iy, b: leg, t: thickness, customGeometry: true };
}

function pfcGeometry(d, bf, tw, tf) {
  const depth = Math.max(0.1, d);
  const flangeWidth = Math.max(0.1, bf);
  const webThickness = Math.max(0.1, Math.min(tw, flangeWidth));
  const flangeThickness = Math.max(0.1, Math.min(tf, depth / 2));
  const flangeProjection = Math.max(0, flangeWidth - webThickness);
  const section = compositeSectionProperties([
    rectanglePart(webThickness, depth, webThickness / 2, depth / 2),
    rectanglePart(flangeProjection, flangeThickness, webThickness + flangeProjection / 2, flangeThickness / 2),
    rectanglePart(flangeProjection, flangeThickness, webThickness + flangeProjection / 2, depth - flangeThickness / 2)
  ]);
  return {
    designation: `${depth.toFixed(0)}PFC custom`,
    area: section.area,
    r: Math.min(section.rx, section.ry),
    rx: section.rx,
    ry: section.ry,
    ix: section.ix,
    iy: section.iy,
    d: depth,
    bf: flangeWidth,
    tw: webThickness,
    tf: flangeThickness,
    customGeometry: true
  };
}

function memberDimensionProperties(section) {
  if (!memberDimensionOverrideActive()) return null;
  if (memberType === "chs") return chsGeometry(value("memberDimChsD"), value("memberDimChsT"));
  if (memberType === "ea") return eaGeometry(value("memberDimEaB"), value("memberDimEaT"));
  if (memberType === "pfc") return pfcGeometry(value("memberDimPfcD"), value("memberDimPfcBf"), value("memberDimPfcTw"), value("memberDimPfcTf"));
  if (memberType === "rod") return rodGeometry(value("memberDimRodD"));
  return null;
}

function memberSections() {
  if (memberType === "chs") return chsSections;
  if (memberType === "ea") return eaSections;
  if (memberType === "pfc") return pfcSections;
  if (memberType === "custom") return customSections;
  return rodSections;
}

function memberProperties(section) {
  if (memberType === "custom") {
    const area = value("memberCustomArea") || 1;
    const rx = value("memberCustomRx") || 0.1;
    const ry = value("memberCustomRy") || 0.1;
    return { area, r: Math.min(rx, ry), rx, ry, ix: area * rx ** 2, iy: area * ry ** 2 };
  }
  const override = memberDimensionProperties(section);
  if (override) return override;
  if (memberType === "chs") {
    const chs = chsProperties(section);
    return { ...chs, rx: chs.r, ry: chs.r, D: section.D, t: section.t };
  }
  return {
    area: section.area,
    r: section.r,
    rx: section.rx || section.r,
    ry: section.ry || section.r,
    ix: section.ix,
    iy: section.iy,
    b: section.b,
    d: section.d,
    diameter: section.diameter,
    bf: section.bf,
    t: section.t,
    tw: section.tw,
    tf: section.tf
  };
}

function memberAlphaBDefault(kf) {
  if (memberType === "custom") return alphaBInput("memberCustomAlphaBx");
  if (memberType === "chs") return -0.5;
  if (kf < 1) return 1.0;
  return 0.5;
}

function memberAlphaBBasis(kf) {
  if (memberType === "custom") {
    return "user-entered by axis";
  }
  if (memberType === "chs") {
    return `AS 4100 Table 6.3.3(${kf < 1 ? "B" : "A"}), cold-formed non-stress-relieved CHS`;
  }
  if (kf < 1) {
    return "AS 4100 Table 6.3.3(B), other sections not listed";
  }
  if (memberType === "ea") {
    return "AS 4100 Table 6.3.3(A), angles";
  }
  if (memberType === "pfc") {
    return "AS 4100 Table 6.3.3(A), hot-rolled channels";
  }
  return "AS 4100 Table 6.3.3(A), other sections not listed in the table";
}

function memberKfValue(grade) {
  return memberType === "custom" ? Math.max(0.001, value("memberCustomKf") || grade.kf) : grade.kf;
}

function memberKfBasisText(kf) {
  if (memberType === "custom") return "user-entered custom/built-up input";
  if (memberDimensionOverrideActive()) {
    if (memberType === "chs" || memberType === "rod" || memberType === "pfc") {
      return `selected ${memberType.toUpperCase()} quick basis; current value ${kf.toFixed(3)}`;
    }
    if (memberType === "ea") {
      return `selected Equal Angle lookup basis; not recalculated from custom b/t`;
    }
  }
  return "selected section / grade lookup basis";
}

function memberRadiusBasis(defaultR) {
  if (memberType === "chs") return `CHS geometry r = ${defaultR.toFixed(1)} mm; circular section uses the same r about any centroidal axis.`;
  if (memberType === "rod") return `Solid round geometry r = d/4 = ${defaultR.toFixed(1)} mm; same r about any centroidal axis.`;
  if (memberType === "pfc") return `PFC catalogue r<sub>min</sub> = ${defaultR.toFixed(1)} mm used as the governing quick-check radius.`;
  if (memberType === "ea") return `Equal Angle catalogue r = ${defaultR.toFixed(1)} mm used by this quick lookup; confirm actual buckling axis for project design.`;
  return `Default r = ${defaultR.toFixed(1)} mm.`;
}

function setMemberDimensionDefaults(section) {
  if (memberType === "custom" || !section) return;
  if (memberType === "chs") {
    $("memberDimChsD").value = (section.D || 0).toFixed(1);
    $("memberDimChsT").value = (section.t || 0).toFixed(1);
  }
  if (memberType === "ea") {
    $("memberDimEaB").value = section.t ? String(parseInt(section.designation, 10) || 100) : "100";
    $("memberDimEaT").value = (section.t || 0).toFixed(1);
  }
  if (memberType === "pfc") {
    $("memberDimPfcD").value = String(parseInt(section.designation, 10) || 150);
    $("memberDimPfcBf").value = String(section.bf || Math.round((parseInt(section.designation, 10) || 150) / 2));
    $("memberDimPfcTw").value = (section.tw || 0).toFixed(1);
    $("memberDimPfcTf").value = (section.tf || 0).toFixed(1);
  }
  if (memberType === "rod") {
    $("memberDimRodD").value = (section.diameter || 0).toFixed(1);
  }
}

function updateMemberDimensionUi(properties = null) {
  const active = memberDimensionOverrideActive();
  if ($("memberDimensionCard")) $("memberDimensionCard").hidden = memberType === "custom";
  if ($("memberDimensionFields")) $("memberDimensionFields").hidden = !active || memberType === "custom";
  document.querySelectorAll("[data-member-dim]").forEach(field => {
    field.hidden = field.dataset.memberDim !== memberType;
  });
  document.querySelectorAll("#memberDimensionFields input").forEach(input => {
    input.disabled = !active || memberType === "custom";
  });
  if ($("memberDimensionOverride")) $("memberDimensionOverride").disabled = memberType === "custom";
  if ($("memberRadiusField")) $("memberRadiusField").hidden = memberType === "custom" || active;
  const props = properties || (selectedMemberGrade() ? memberProperties(selectedMemberGrade().section) : null);
  if ($("memberDimensionStatus")) {
    $("memberDimensionStatus").hidden = !active || memberType === "custom";
    const sourceText = `${memberType.toUpperCase()} dimensions are used for A<sub>g</sub>, r<sub>x</sub>, r<sub>y</sub> and r used${memberType === "ea" || memberType === "pfc" ? " from simplified rectangular geometry" : " from circular geometry"}.`;
    $("memberDimensionStatus").innerHTML = props ? `${sourceText} Current A<sub>g</sub> = ${formatArea(props.area)}; r<sub>x</sub> = ${props.rx.toFixed(1)} mm; r<sub>y</sub> = ${props.ry.toFixed(1)} mm.` : sourceText;
  }
}

function setMemberRadiusDefault(properties = null) {
  if (memberType === "custom") return;
  const selected = selectedMemberGrade();
  const props = properties || (selected ? memberProperties(selected.section) : null);
  if (!props) return;
  $("memberRadiusInput").value = props.r.toFixed(1);
}

function memberDesignRadius(defaultR) {
  if (memberType === "custom") return defaultR;
  if (memberDimensionOverrideActive()) return defaultR;
  return Math.max(0.1, value("memberRadiusInput") || defaultR);
}

function compressionReduction(lambdaN, alphaB) {
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
  return { alphaC, alphaA, modifiedLambda, eta, xi };
}

function memberNetAreaInput(properties) {
  const autoAvailable = memberType === "ea" || memberType === "pfc";
  const mode = autoAvailable ? $("memberNetAreaMode").value : "manual";
  const grossArea = properties.area;
  const holeCount = Math.max(0, Math.round(value("memberHoleCount")));
  const holeDiameter = value("memberHoleDiameter");
  const deductionThickness = memberType === "ea"
    ? properties.t || 0
    : memberType === "pfc"
      ? value("memberHoleThickness")
      : 0;
  const holeDeduction = holeCount * holeDiameter * deductionThickness;
  const automaticNetArea = Math.max(0, Math.min(grossArea, grossArea - holeDeduction));
  const manualNetArea = Math.min(grossArea, value("memberNetArea"));
  if (mode === "auto") {
    $("memberNetArea").value = automaticNetArea.toFixed(0);
  }
  $("memberNetArea").readOnly = mode === "auto";
  $("memberHoleCount").disabled = !autoAvailable || mode !== "auto";
  $("memberHoleDiameter").disabled = !autoAvailable || mode !== "auto";
  $("memberHoleThickness").disabled = memberType !== "pfc" || mode !== "auto";
  $("memberNetAreaMode").disabled = !autoAvailable;
  document.querySelectorAll(".member-net-method, .member-hole-field").forEach(field => {
    field.hidden = !autoAvailable;
  });
  document.querySelectorAll(".member-thickness-field").forEach(field => {
    field.hidden = memberType !== "pfc";
  });
  return {
    mode,
    holeCount,
    holeDiameter,
    deductionThickness,
    holeDeduction,
    automaticNetArea,
    netArea: mode === "auto" ? automaticNetArea : manualNetArea
  };
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
        : memberType === "rod"
          ? String(rodSections.findIndex(s => s.diameter === 24))
          : "0";
  populateMemberGrades();
}

function populateMemberGrades() {
  const section = memberSections()[Number($("memberSection").value) || 0];
  const grades = memberType === "chs" ? chsGrades : section.grades;
  $("memberGrade").innerHTML = Object.keys(grades).map(grade => `<option value="${grade}">${grade}</option>`).join("");
  $("memberGrade").value = memberType === "chs" ? "C350L0" : memberType === "custom" ? "User input" : "300PLUS";
  setMemberDimensionDefaults(section);
  const properties = memberProperties(section);
  setMemberStrengthDefaults();
  setMemberRadiusDefault(properties);
  $("memberNetAreaMode").value = memberType === "ea" || memberType === "pfc" ? "auto" : "manual";
  $("memberHoleCount").value = "0";
  $("memberHoleDiameter").value = "0";
  $("memberHoleThickness").value = memberType === "pfc" ? (properties.tw || section.tw || 0).toFixed(1) : "0";
  $("memberNetArea").value = properties.area.toFixed(0);
  $("memberNetArea").max = properties.area.toFixed(0);
  $("memberKt").value = memberType === "ea" || memberType === "pfc" ? "0.85" : "1";
  calculateMember();
}

function selectedMemberGrade() {
  const section = memberSections()[Number($("memberSection").value) || 0];
  if (!section) return null;
  const gradeName = $("memberGrade").value;
  const grade = memberType === "chs" ? chsGrades[gradeName] : section.grades[gradeName];
  return grade ? { section, gradeName, grade } : null;
}

function setMemberStrengthDefaults() {
  const selected = selectedMemberGrade();
  if (!selected) return;
  $("memberFyInput").value = selected.grade.fy;
  $("memberFuInput").value = selected.grade.fu;
}

function calculateMember() {
  const selected = selectedMemberGrade();
  if (!selected) return;
  const { section, gradeName, grade } = selected;
  const properties = memberProperties(section);
  updateMemberDimensionUi(properties);
  const kf = memberKfValue(grade);
  const kfBasis = memberKfBasisText(kf);
  const alphaB = memberAlphaBDefault(kf);
  const alphaBBasis = memberAlphaBBasis(kf);
  if (memberType !== "custom") {
    $("memberAlphaB").value = String(alphaB);
  }
  const designR = memberDesignRadius(properties.r);
  const radiusOverridden = memberType !== "custom" && Math.abs(designR - properties.r) > 0.05;
  const radiusBasis = memberType === "custom"
    ? "r entered separately by axis"
    : properties.customGeometry
      ? `${memberType.toUpperCase()} custom geometry r = ${properties.r.toFixed(1)} mm used for the checked axis`
    : radiusOverridden
      ? `r manually overridden to ${designR.toFixed(1)} mm from default ${properties.r.toFixed(1)} mm`
      : memberRadiusBasis(properties.r);
  if (memberType !== "custom") {
    $("memberRadiusSource").innerHTML = `${properties.customGeometry ? radiusBasis : memberRadiusBasis(properties.r)} Current r is used for L<sub>e</sub>/r, &lambda;<sub>n</sub>, &alpha;<sub>c</sub> and &phi;N<sub>c</sub>.`;
  } else {
    $("memberRadiusSource").innerHTML = `Custom / Built-up uses entered r<sub>x</sub> and r<sub>y</sub>. Edit f<sub>y</sub> / f<sub>u</sub> to match certificate or project-specific values.`;
  }
  $("memberNetArea").max = properties.area.toFixed(0);
  const netInput = memberNetAreaInput(properties);
  const netArea = netInput.netArea;
  const kt = Math.min(1, value("memberKt"));
  const fy = value("memberFyInput") || grade.fy;
  const fu = value("memberFuInput") || grade.fu;
  const strengthBasis = fy === grade.fy && fu === grade.fu
    ? `f<sub>y</sub> / f<sub>u</sub> from selected grade ${gradeName}`
    : `f<sub>y</sub> / f<sub>u</sub> manually overridden from ${gradeName} defaults ${grade.fy} / ${grade.fu} MPa`;
  const ktGuidance = kt >= 0.999
    ? "AS 4100 Cl. 7.3.1 uniform force distribution"
    : "AS 4100 Table 7.3.2 eccentric connection case";
  const compressionArea = netArea;
  const sectionCompression = 0.9 * kf * compressionArea * fy / 1000;
  const axes = memberType === "custom"
    ? [
        { label: "x", title: "x-axis", r: properties.rx, effectiveLength: value("memberCustomLex") * 1000, alphaB: alphaBInput("memberCustomAlphaBx") },
        { label: "y", title: "y-axis", r: properties.ry, effectiveLength: value("memberCustomLey") * 1000, alphaB: alphaBInput("memberCustomAlphaBy") }
      ]
    : [{ label: "", title: "selected axis", r: designR, effectiveLength: value("memberLength") * 1000, alphaB }];
  const axisResults = axes.map(axis => {
    const leOverR = axis.r > 0 ? axis.effectiveLength / axis.r : 0;
    const lambdaN = leOverR * Math.sqrt(kf) * Math.sqrt(fy / 250);
    const reduction = compressionReduction(lambdaN, axis.alphaB);
    return {
      ...axis,
      leOverR,
      lambdaN,
      ...reduction,
      memberCompression: reduction.alphaC * sectionCompression
    };
  });
  const governingAxis = axisResults.reduce((lowest, axis) => axis.memberCompression < lowest.memberCompression ? axis : lowest, axisResults[0]);
  const memberCompression = governingAxis.memberCompression;
  const grossYield = 0.9 * properties.area * fy / 1000;
  const netFracture = 0.9 * 0.85 * kt * netArea * fu / 1000;
  const tensionCapacity = Math.min(grossYield, netFracture);
  const tensionGoverning = grossYield <= netFracture ? "Gross-section yielding" : "Net-section fracture";
  const actionType = $("memberActionType").value;
  const axialDemand = value("memberAxialDemand");
  const demandCapacity = actionType === "tension" ? tensionCapacity : memberCompression;
  const demandRatio = demandCapacity > 0 ? axialDemand / demandCapacity : Infinity;
  const demandLabel = actionType === "tension" ? "Tension" : "Compression";
  const demandReference = actionType === "tension" ? "&phi;N<sub>t</sub>" : "&phi;N<sub>c</sub>";
  const demandStep = axialDemand <= 0
    ? "No N* entered; capacity only."
    : Number.isFinite(demandRatio)
      ? `${demandLabel} N<sup>*</sup> / ${demandReference} = ${fixed(axialDemand)} / ${fixed(demandCapacity)} = ${demandRatio.toFixed(2)}`
      : `${demandLabel} N<sup>*</sup> entered, but the selected design capacity is not positive.`;

  $("memberDesignation").textContent = memberType === "custom"
    ? $("memberCustomName").value || section.designation
    : `${properties.customGeometry ? properties.designation : section.designation} - ${gradeName}`;
  $("memberAssumption").innerHTML = memberType === "chs"
    ? `&alpha;<sub>b</sub> = -0.5 - ${alphaBBasis}; ${radiusBasis}`
    : memberType === "ea"
      ? `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - ${alphaBBasis}; ${radiusBasis}`
      : memberType === "pfc"
        ? `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - ${alphaBBasis}; ${radiusBasis}`
        : memberType === "custom"
          ? `User-entered A<sub>g</sub>, r<sub>x</sub>, r<sub>y</sub>, k<sub>f</sub>, &alpha;<sub>b,x</sub>, &alpha;<sub>b,y</sub>, L<sub>ex</sub> and L<sub>ey</sub>`
          : `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)} - ${alphaBBasis}; ${radiusBasis}`;
  $("memberArea").textContent = formatArea(properties.area);
  $("memberDimensions").innerHTML = memberDimensionLabel(properties);
  $("memberRx").textContent = `${properties.rx.toFixed(1)} mm`;
  $("memberRy").textContent = `${properties.ry.toFixed(1)} mm`;
  $("memberIx").innerHTML = formatInertia(properties.ix);
  $("memberIy").innerHTML = formatInertia(properties.iy);
  $("memberRadius").textContent = memberType === "custom" ? `${properties.r.toFixed(1)} mm` : `${designR.toFixed(1)} mm${radiusOverridden ? ` (default ${properties.r.toFixed(1)})` : ""}`;
  $("memberFy").textContent = `${fy} MPa`;
  $("memberFu").textContent = `${fu} MPa`;
  $("memberKf").textContent = kf.toFixed(3);
  $("memberCompression").textContent = fixed(memberCompression);
  $("sectionCompression").textContent = fixed(sectionCompression);
  $("memberTension").textContent = fixed(tensionCapacity);
  $("grossYieldCapacity").textContent = `${fixed(grossYield)} kN`;
  $("netFractureCapacity").textContent = `${fixed(netFracture)} kN`;
  $("tensionGoverning").textContent = tensionGoverning;
  $("memberSlenderness").textContent = memberType === "custom" ? axisResults.map(axis => `${axis.label} ${axis.leOverR.toFixed(1)}`).join(" / ") : axisResults[0].leOverR.toFixed(1);
  $("memberLambdaN").textContent = memberType === "custom" ? axisResults.map(axis => `${axis.label} ${axis.lambdaN.toFixed(1)}`).join(" / ") : axisResults[0].lambdaN.toFixed(1);
  $("memberAlphaC").textContent = memberType === "custom" ? axisResults.map(axis => `${axis.label} ${axis.alphaC.toFixed(3)}`).join(" / ") : axisResults[0].alphaC.toFixed(3);
  $("memberGoverning").textContent = governingAxis.alphaC < 0.999 ? (memberType === "custom" ? `${governingAxis.title} buckling` : "Member buckling") : "Section capacity";
  $("memberUtilisation").textContent = axialDemand > 0 && Number.isFinite(demandRatio) ? demandRatio.toFixed(2) : "—";
  const memberUtilisationStatus = $("memberUtilisationStatus");
  memberUtilisationStatus.textContent = axialDemand > 0 ? (demandRatio <= 1 ? "PASS" : "FAIL") : "Optional N*";
  memberUtilisationStatus.className = axialDemand > 0 ? (demandRatio <= 1 ? "pass" : "fail") : "check";
  const netAreaWarning = value("memberNetArea") > properties.area ? " Net area has been limited to gross area." : "";
  const customGeometryKfWarning = properties.customGeometry && memberType === "ea"
    ? " Custom EA geometry auto-calculates A_g and r_x/r_y, but k_f is still the selected lookup value; verify k_f for slender custom angle geometry."
    : "";
  const autoNetAreaText = netInput.mode === "auto"
    ? `Auto straight-line A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t = ${properties.area.toFixed(0)} - ${netInput.holeCount} x ${fixed(netInput.holeDiameter)} x ${fixed(netInput.deductionThickness)} = ${netArea.toFixed(0)} mm².`
    : memberType === "chs" || memberType === "rod"
      ? `Default A<sub>n</sub> = A<sub>g</sub> = ${netArea.toFixed(0)} mm² for this quick lookup.`
      : `Manual A<sub>n</sub> = ${netArea.toFixed(0)} mm².`;
  const manualReason = memberType === "pfc"
    ? ` PFC default t = t_w = ${fixed(properties.tw || section.tw || 0)} mm${properties.customGeometry ? " from custom geometry" : " from InfraBuild Table 15/16"}; change t to t_f = ${fixed(properties.tf || section.tf || 0)} mm or another verified thickness if the net path is through the flange or connected element.`
    : "";
  $("memberNetAreaSource").innerHTML = `${autoNetAreaText}${manualReason} Auto mode is only a straight-line bolt-hole deduction; use manual A<sub>n</sub> for staggered holes, slots, cope cuts or any project-specific net path. A<sub>n</sub> is used for AS 4100 Cl. 6.2 compression section capacity and AS 4100 Cl. 7.2 net-section fracture.`;
  $("memberWarning").innerHTML = memberType === "chs"
    ? `Centroidal axial load only. r = ${designR.toFixed(1)} mm, k<sub>f</sub> = ${kf.toFixed(3)} and &alpha;<sub>b</sub> = -0.5 are the current quick-screen assumptions for cold-formed non-stress-relieved CHS. Confirm hot-formed or stress-relieved sections separately.${netAreaWarning}`
    : memberType === "ea"
      ? `Equal Angle quick check uses r = ${designR.toFixed(1)} mm, k<sub>f</sub> = ${kf.toFixed(3)} and &alpha;<sub>b</sub> = ${alphaB.toFixed(1)}. Weak-axis buckling, flexural-torsional buckling and connection eccentricity are not checked.${netAreaWarning}${customGeometryKfWarning}`
      : memberType === "pfc"
        ? `PFC quick check uses catalogue A<sub>g</sub>, current A<sub>n</sub>, r = ${designR.toFixed(1)} mm, k<sub>f</sub> = ${kf.toFixed(3)} and &alpha;<sub>b</sub> = ${alphaB.toFixed(1)} for centroidal axial load only. Default r is r<sub>min</sub> unless overridden. Torsional/flexural-torsional buckling and connection eccentricity are not checked.${netAreaWarning}`
        : memberType === "custom"
          ? `Custom / Built-up quick check uses user-entered effective properties only. Verify built-up member detailing, connector spacing, individual component slenderness, shear deformation, torsional/flexural-torsional buckling, connection eccentricity and local buckling separately.${netAreaWarning}`
          : `Rod quick check uses r = ${designR.toFixed(1)} mm from solid circular geometry, k<sub>f</sub> = ${kf.toFixed(3)} and &alpha;<sub>b</sub> = ${alphaB.toFixed(1)}. Confirm product grade, effective length, straightness and connection net area.${netAreaWarning}`;
  const sectionDataText = memberType === "custom"
    ? `A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; A<sub>n</sub> = ${compressionArea.toFixed(0)} mm²; r<sub>x</sub> = ${properties.rx.toFixed(1)} mm; r<sub>y</sub> = ${properties.ry.toFixed(1)} mm; I<sub>x</sub> = ${formatInertia(properties.ix)}; I<sub>y</sub> = ${formatInertia(properties.iy)}; f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa`
    : `${properties.customGeometry ? "Custom geometry" : "Catalogue data"}; dimensions: ${memberDimensionLabel(properties)}; A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; A<sub>n</sub> = ${compressionArea.toFixed(0)} mm²; r<sub>x</sub> = ${properties.rx.toFixed(1)} mm; r<sub>y</sub> = ${properties.ry.toFixed(1)} mm; I<sub>x</sub> = ${formatInertia(properties.ix)}; I<sub>y</sub> = ${formatInertia(properties.iy)}; r used = ${designR.toFixed(1)} mm${radiusOverridden ? ` (default ${properties.r.toFixed(1)} mm)` : ""}; f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa`;
  const compressionSteps = memberType === "custom"
    ? `<div><b>Compression axes - AS 4100 Cl. 6.3</b><code>${axisResults.map(axis => `${axis.label}: L<sub>e</sub>/r = ${axis.leOverR.toFixed(1)}, &lambda;<sub>n</sub> = ${axis.lambdaN.toFixed(1)}, &alpha;<sub>b</sub> = ${axis.alphaB.toFixed(1)}, &alpha;<sub>c</sub> = ${axis.alphaC.toFixed(3)}, &phi;N<sub>c,${axis.label}</sub> = ${fixed(axis.memberCompression)} kN`).join("; ")}; governing = ${governingAxis.title}</code></div>`
    : `<div><b>Nominal slenderness</b><code>L<sub>e</sub>/r = ${fixed(axisResults[0].effectiveLength / 1000)} m / ${axisResults[0].r.toFixed(1)} mm = ${axisResults[0].leOverR.toFixed(1)}; &lambda;<sub>n</sub> = (L<sub>e</sub>/r) &radic;k<sub>f</sub> &radic;(f<sub>y</sub>/250) = ${axisResults[0].lambdaN.toFixed(1)}</code></div>
    <div><b>Modified slenderness</b><code>&lambda; = &lambda;<sub>n</sub> + &alpha;<sub>a</sub>&alpha;<sub>b</sub> = ${axisResults[0].modifiedLambda.toFixed(1)}; &alpha;<sub>a</sub> = ${axisResults[0].alphaA.toFixed(2)}</code></div>
    <div><b>Member reduction - AS 4100 Cl. 6.3.3</b><code>&eta; = 0.00326(&lambda; - 13.5) = ${axisResults[0].eta.toFixed(3)}; &xi; = ${axisResults[0].xi.toFixed(3)}; &alpha;<sub>c</sub> = ${axisResults[0].alphaC.toFixed(3)}</code></div>`;
  $("memberFormulaSteps").innerHTML = `
    <div><b>Design input status</b><code>${strengthBasis}; ${radiusBasis}; k<sub>f</sub> = ${kf.toFixed(3)} from ${kfBasis}; &alpha;<sub>b</sub> = ${memberType === "custom" ? `${axisResults.map(axis => `${axis.label} ${axis.alphaB.toFixed(1)}`).join(" / ")}` : alphaB.toFixed(1)} from ${alphaBBasis}; k<sub>t</sub> = ${kt.toFixed(2)} - ${ktGuidance}</code></div>
    <div><b>Section data</b><code>${sectionDataText}</code></div>
    <div><b>Net area input - AS 4100 Cl. 6.2 and AS 4100 Cl. 7.2</b><code>${netInput.mode === "auto" ? `Straight-line A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t = ${properties.area.toFixed(0)} - ${netInput.holeCount} x ${fixed(netInput.holeDiameter)} x ${fixed(netInput.deductionThickness)} = ${netArea.toFixed(0)} mm²; not a staggered-hole, slot, cope or multiple-path check` : memberType === "chs" || memberType === "rod" ? `Default A<sub>n</sub> = A<sub>g</sub> = ${netArea.toFixed(0)} mm²` : `Manual A<sub>n</sub> = ${netArea.toFixed(0)} mm²`}; A<sub>n</sub> is used for compression section capacity and net-section fracture</code></div>
    <div><b>Gross-section yielding - AS 4100 Cl. 7.2</b><code>&phi;A<sub>g</sub>f<sub>y</sub> = 0.90 x ${properties.area.toFixed(0)} x ${fy} / 1000 = ${fixed(grossYield)} kN</code></div>
    <div><b>Net-section fracture - AS 4100 Cl. 7.2</b><code>&phi;0.85k<sub>t</sub>A<sub>n</sub>f<sub>u</sub> = 0.90 x 0.85 x ${kt.toFixed(2)} x ${netArea.toFixed(0)} x ${fu} / 1000 = ${fixed(netFracture)} kN</code></div>
    <div><b>Design tension capacity - AS 4100 Cl. 7.1</b><code>&phi;N<sub>t</sub> = min[${fixed(grossYield)}, ${fixed(netFracture)}] = ${fixed(tensionCapacity)} kN</code></div>
    ${compressionSteps}
    <div><b>Section capacity - AS 4100 Cl. 6.2</b><code>&phi;N<sub>s</sub> = 0.90 k<sub>f</sub>A<sub>n</sub>f<sub>y</sub> = 0.90 x ${kf.toFixed(3)} x ${compressionArea.toFixed(0)} x ${fy} / 1000 = ${fixed(sectionCompression)} kN</code></div>
    <div><b>Member capacity - AS 4100 Cl. 6.3</b><code>&phi;N<sub>c</sub> = ${memberType === "custom" ? `min(&phi;N<sub>c,x</sub>, &phi;N<sub>c,y</sub>) = ${fixed(memberCompression)} kN` : `&alpha;<sub>c</sub>&phi;N<sub>s</sub> = ${governingAxis.alphaC.toFixed(3)} x ${fixed(sectionCompression)} = ${fixed(memberCompression)} kN`}</code></div>
    <div><b>Optional axial demand</b><code>${demandStep}</code></div>`;
}

function concreteLayer(index, depth, direction, width, yOffset = 0) {
  const active = $(`layer${index}Active`).checked;
  const yGlobal = value(`layer${index}Y`);
  const yTop = yGlobal - yOffset;
  const product = concreteBarProduct(index);
  const bar = product.diameter;
  const spacing = value(`layer${index}Spacing`);
  const fsyInput = value(`layer${index}Fsy`) || product.fsy;
  const fsy = Math.min(600, fsyInput);
  const es = value(`layer${index}Es`);
  const barArea = product.area || Math.PI * bar ** 2 / 4;
  const areaPerMetre = spacing > 0 ? barArea * 1000 / spacing : 0;
  const area = spacing > 0 ? barArea * width / spacing : 0;
  return {
    index,
    name: index === 1 ? "Pad / upper pad top mat" : index === 2 ? "Pad / upper pad bottom mat" : index === 3 ? "Lower pad top mat" : "Lower pad bottom mat",
    active,
    yTop,
    yGlobal,
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

function concreteShearBarProduct() {
  return concreteBarProducts[$("concreteShearBar").value] || concreteBarProducts.N12;
}

function setConcreteBarDefaults(index) {
  $(`layer${index}Fsy`).value = concreteBarProduct(index).fsy;
}

function setConcreteShearBarDefaults() {
  $("concreteFsyf").value = concreteShearBarProduct().fsy;
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
  const shearSelect = $("concreteShearBar");
  shearSelect.innerHTML = groups;
  shearSelect.value = shearSelect.dataset.defaultBar || "N12";
  setConcreteShearBarDefaults();
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
    if (!auto) return;
    const bar = concreteBarProduct(index).diameter;
    const y = concreteAutoDepth(index, topDepth, bottomDepth, cover, bar);
    yInput.value = fixed(Math.max(0, y));
  });
}

function setConcreteLayerDepthManual(index) {
  $(`layer${index}Auto`).checked = false;
  calculateConcrete();
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

function concreteOneWayShear(data, result) {
  const tensionLayers = result.layers.filter(layer => layer.d >= data.depth / 2 && layer.strain < -0.00005 && layer.area > 0);
  const centroidArea = tensionLayers.reduce((sum, layer) => sum + layer.area, 0);
  const d = centroidArea > 0
    ? tensionLayers.reduce((sum, layer) => sum + layer.area * layer.d, 0) / centroidArea
    : result.d0;
  const dBasis = centroidArea > 0
    ? tensionLayers.map(layer => `Mat ${layer.index}: A_s = ${fixed(layer.area)} mm2, d = ${fixed(layer.d)} mm`).join("; ")
    : `No reinforcement mat in the tensile half-depth; fallback d = d_o = ${fixed(result.d0)} mm`;
  const dNumerator = tensionLayers.reduce((sum, layer) => sum + layer.area * layer.d, 0);
  const dv = Math.max(0.72 * data.depth, 0.9 * d);
  const bv = data.width;
  const shearReoMode = $("concreteShearReo").value;
  const shearProduct = concreteShearBarProduct();
  const fsyf = Math.max(1, Math.min(600, value("concreteFsyf")));
  const sv = Math.max(1, value("concreteSv"));
  const nsv = Math.max(0, value("concreteNsv"));
  const shearBarArea = shearProduct.area || Math.PI * shearProduct.diameter ** 2 / 4;
  const asv = nsv * shearBarArea;
  const asvPerS = shearReoMode === "vertical" ? asv / sv : 0;
  const asvMinPerS = 0.08 * Math.sqrt(data.fc) * bv / fsyf;
  const hasShearReo = shearReoMode === "vertical" && asv > 0 && sv > 0;
  const minShearReoProvided = hasShearReo && asvPerS >= asvMinPerS;
  const theta = 36;
  const thetaRad = theta * Math.PI / 180;
  const cotTheta = 1 / Math.tan(thetaRad);
  const kvNoMinimum = Math.min(0.15, 200 / (1000 + 1.3 * dv));
  const kv = minShearReoProvided ? 0.15 : kvNoMinimum;
  const rootFc = Math.min(Math.sqrt(data.fc), 8.0);
  const vuc = kv * bv * dv * rootFc / 1000;
  const vus = hasShearReo ? asvPerS * fsyf * dv * cotTheta / 1000 : 0;
  const vuRaw = vuc + vus;
  const vuMax = 0.55 * 0.9 * data.fc * bv * dv * (cotTheta / (1 + cotTheta ** 2)) / 1000;
  const vu = Math.min(vuRaw, vuMax);
  const phi = minShearReoProvided ? 0.75 : 0.70;
  return {
    d,
    dBasis,
    dNumerator,
    centroidArea,
    dv,
    bv,
    kv,
    kvNoMinimum,
    rootFc,
    vuc,
    shearReoMode,
    shearDesignation: shearProduct.designation,
    shearBarArea,
    nsv,
    asv,
    sv,
    fsyf,
    asvPerS,
    asvMinPerS,
    hasShearReo,
    minShearReoProvided,
    theta,
    cotTheta,
    vus,
    vuRaw,
    vuMax,
    vu,
    webCrushingLimited: vu < vuRaw,
    phi,
    phiVu: phi * vu
  };
}

function calculateConcrete() {
  const topDepth = value("concreteTopDepth");
  const bottomDepth = value("concreteBottomDepth");
  const totalDepth = topDepth + bottomDepth;
  const direction = $("concreteDirection").value;
  const analysisMode = $("concreteComposite").value;
  const separatePad = $("concreteSeparatePad").value;
  const combinedSection = analysisMode === "combined";
  const checkedPad = combinedSection ? "combined" : separatePad;
  const depth = combinedSection ? totalDepth : separatePad === "bottom" ? bottomDepth : topDepth;
  const yOffset = combinedSection || separatePad === "top" ? 0 : topDepth;
  const layerIndices = combinedSection ? [1, 2, 3, 4] : separatePad === "bottom" ? [3, 4] : [1, 2];
  const cover = value("concreteCover");
  const width = value("concreteWidth");
  const fcInput = value("concreteFc");
  const fc = Math.min(120, Math.max(20, fcInput));
  const stressBlock = concreteStressBlockFactors(fc);
  const ecu = 0.003;
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
    analysisMode,
    combinedSection,
    checkedPad,
    yOffset,
    layers: layerIndices.map(index => concreteLayer(index, depth, direction, width, yOffset)).filter(layer => layer.active && layer.area > 0 && layer.yTop >= 0 && layer.yTop <= depth)
  };
  const bottomMatWithoutDepth = bottomDepth <= 0 && (combinedSection || separatePad === "bottom") && ($("layer3Active").checked || $("layer4Active").checked);

  let result = { ok: false, message: "Plain concrete section: no RC ultimate flexural capacity is calculated without active reinforcement mats" };
  if (data.width > 0 && data.depth > 0 && data.fc > 0 && data.ecu > 0 && data.layers.length) {
    result = solveConcreteSection(data);
  }

  $("concreteSummaryTitle").textContent = combinedSection
    ? `${fixed(data.width)} mm strip; combined D = D_top + D_bot = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm`
    : `${fixed(data.width)} mm strip; ${separatePad === "bottom" ? "bottom pad" : "top pad"} D = ${fixed(data.depth)} mm`;
  $("concreteSummaryNote").textContent = combinedSection
    ? "Combined section selected: use only where composite action and interface shear transfer are designed separately."
    : `Separate pads selected: calculating the ${separatePad === "bottom" ? "bottom" : "top"} pad only; the other pad is not included in section capacity.`;
  const legacyLayers = data.layers.filter(layer => layer.legacy);
  const fsyCappedLayers = data.layers.filter(layer => layer.fsyInput > 600);
  $("concretePhiNote").textContent = legacyLayers.length
    ? "Legacy Y bar selected: conservative capacity factor phi = 0.65 is used pending bar-grade verification."
    : "Capacity factor from AS 3600 Table 2.2.2 pure-bending k_uo expression for N-class reinforcement.";

  if (!result.ok) {
    ["concreteNaValue", "concreteCcValue", "concreteMuoValue", "concretePhiMuoValue", "concreteNa", "concreteMuo", "concretePhiMuo", "concretePhiVu"].forEach(id => $(id).textContent = "-");
    $("concreteShearNote").innerHTML = "RC one-way shear not calculated without active reinforcement";
    $("concreteStatusValue").textContent = "No solution";
    $("concreteEquilibrium").textContent = result.message;
    $("concreteWarningStatus").textContent = "CHECK";
    $("concreteWarningStatus").className = "fail";
    $("concreteLayerResults").innerHTML = "";
    $("concreteFormulaSteps").innerHTML = `<div><b>Status</b><code>${result.message}</code></div><div><b>Plain concrete note</b><code>For an unreinforced pad footing, use a separate AS 3600 Section 20 plain-concrete footing check. Do not report this as ductile reinforced-concrete phiMuo; AS 3600 Section 20 uses a linear stress-strain bending model and takes footing strength depth as nominal depth minus 50 mm.</code></div>`;
    return;
  }

  const residual = result.axial / 1000;
  const shear = concreteOneWayShear(data, result);
  const residualOk = Math.abs(residual) < 0.01;
  const coverWarnings = result.layers.filter(layer => layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2);
  const reviewFlags = [`one-way shear uses AS 3600 Cl. 8.2.4.3 simplified k_v`];
  if (shear.hasShearReo && !shear.minShearReoProvided) reviewFlags.push(`A_sv/s below AS 3600 Cl. 8.2.1.7 minimum (${shear.asvPerS.toFixed(3)} < ${shear.asvMinPerS.toFixed(3)} mm2/mm)`);
  if (shear.webCrushingLimited) reviewFlags.push(`V_u limited by AS 3600 Cl. 8.2.3.3 web crushing`);
  if (!shear.hasShearReo) reviewFlags.push("no shear reinforcement credited; check AS 3600 Cl. 8.2.1.6 for actual V*");
  if (combinedSection) reviewFlags.push("combined section requires separate interface shear and composite-action verification");
  if (!combinedSection && totalDepth > depth) reviewFlags.push(`${separatePad === "bottom" ? "top" : "bottom"} pad not included in separate-pad calculation`);
  if (coverWarnings.length) reviewFlags.push(`${coverWarnings.map(layer => `mat ${layer.index}`).join(", ")} cover check`);
  if (bottomMatWithoutDepth) reviewFlags.push("bottom pad mats active with D_bot = 0");
  if (legacyLayers.length) reviewFlags.push(`legacy Y bar in ${legacyLayers.map(layer => `mat ${layer.index}`).join(", ")}`);
  if (fsyCappedLayers.length) reviewFlags.push(`f_sy capped at 600 MPa for ${fsyCappedLayers.map(layer => `mat ${layer.index}`).join(", ")}`);
  if (result.kuo > 0.36) reviewFlags.push(`k_uo = ${result.kuo.toFixed(3)} > 0.36, check AS 3600 Cl. 8.1.5`);
  const warningText = `Moment capacity and one-way shear screen only; verify punching, bearing, anchorage, crack control and interface shear separately. Review: ${reviewFlags.join("; ")}.`;

  $("concreteNaValue").textContent = `${fixed(result.x)} mm`;
  $("concreteCcValue").textContent = `${fixed(result.cc / 1000)} kN`;
  $("concreteMuoValue").textContent = `${fixed(result.muo)} kNm`;
  $("concretePhiMuoValue").textContent = `${fixed(result.phiMuo)} kNm`;
  $("concreteStatusValue").textContent = residualOk ? "Solved" : "Check residual";
  $("concreteNa").textContent = fixed(result.x);
  $("concreteMuo").textContent = fixed(result.muo);
  $("concretePhiMuo").textContent = fixed(result.phiMuo);
  $("concretePhiVu").textContent = fixed(shear.phiVu);
  $("concreteShearNote").innerHTML = `V<sub>uc</sub> = ${fixed(shear.vuc)} kN; V<sub>us</sub> = ${fixed(shear.vus)} kN; d<sub>v</sub> = ${fixed(shear.dv)} mm`;
  $("concreteEquilibrium").textContent = `Residual ${residual.toFixed(3)} kN`;
  const shearWarning = (shear.hasShearReo && !shear.minShearReoProvided) || shear.webCrushingLimited;
  const sectionSolved = residualOk && !coverWarnings.length && !bottomMatWithoutDepth && !legacyLayers.length && !fsyCappedLayers.length && !shearWarning && result.kuo <= 0.36;
  $("concreteWarningStatus").textContent = sectionSolved ? "SOLVED" : "CHECK";
  $("concreteWarningStatus").className = sectionSolved ? "pass" : "fail";
  $("concreteWarningText").textContent = warningText;

  $("concreteLayerResults").innerHTML = result.layers.map(layer => {
    const status = Math.abs(layer.strain) < 0.00005 ? "Near neutral axis" : layer.force > 0 ? "Compression" : "Tension";
    const coverStatus = layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2 ? "cover check required" : "cover reference OK";
    const displacementNote = layer.displacedConcreteStress > 0 ? `; net stress = ${signedFixed(layer.netStress, 1)} MPa after displaced concrete` : "";
    return `<article><b>Mat ${layer.index} - ${layer.name}</b><span>${layer.designation} @ ${fixed(layer.spacing)}; ${status}; y<sub>${layer.index}</sub> = ${fixed(layer.yTop)} mm; A<sub>s${layer.index}</sub> = ${fixed(layer.area)} mm2 per strip (${fixed(layer.areaPerMetre)} mm2/m); ${coverStatus}</span><small>&epsilon;<sub>s${layer.index}</sub> = ${signedFixed(layer.strain, 5)}; f<sub>s${layer.index}</sub> = ${signedFixed(layer.stress, 1)} MPa${displacementNote}; F<sub>s${layer.index}</sub> = ${signedFixed(layer.force / 1000, 1)} kN</small></article>`;
  }).join("");

  $("concreteFormulaSteps").innerHTML = `
    <div><b>Compression face</b><code>${direction === "top" ? "top face" : "bottom face"}; each reinforcement mat is transformed to distance d_i from that face</code></div>
    <div><b>Pad analysis mode</b><code>${data.combinedSection ? `Combined section: D = D_top + D_bot = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm; active top and bottom pad mats may participate` : `Separate pads: calculating the ${data.checkedPad === "bottom" ? "bottom" : "top"} pad only; D = ${fixed(data.depth)} mm; only that pad's active mats participate`}</code></div>
    <div><b>Cover reference</b><code>c_nom = ${fixed(data.cover)} mm is shown for each pad face; auto y_i uses c_nom + d_b/2 from the relevant pad surface; editing a y_i value turns off auto fill for that mat</code></div>
    <div><b>Reinforcement area</b><code>A<sub>si</sub> = A<sub>bar,table</sub> x b / spacing. A<sub>bar,table</sub> uses standard nominal Australian bar areas N/Y12-36 rather than &pi;d<sup>2</sup>/4; for b = 1000 mm this is the usual mm2/m table value. N bars default to f<sub>sy</sub> = 500 MPa; legacy Y bars default to f<sub>sy</sub> = 410 MPa unless manually overwritten; design-model f<sub>sy</sub> is capped at 600 MPa</code></div>
    <div><b>Stress block</b><code>&alpha;<sub>2</sub> = max(0.85 - 0.0015f'<sub>c</sub>, 0.67) = ${data.alpha2.toFixed(3)}; &gamma; = max(0.97 - 0.0025f'<sub>c</sub>, 0.67) = ${data.gamma.toFixed(3)}</code></div>
    <div><b>Concrete block</b><code>a = min(D, &gamma;x) = min(${fixed(data.depth)}, ${data.gamma.toFixed(3)} x ${fixed(result.x)}) = ${fixed(result.blockDepth)} mm; C<sub>c</sub> = &alpha;<sub>2</sub> f'<sub>c</sub>ba = ${fixed(result.cc / 1000)} kN</code></div>
    <div><b>Steel strain</b><code>&epsilon;<sub>si</sub> = &epsilon;<sub>cu</sub>(x - d<sub>i</sub>) / x; compression positive, tension negative</code></div>
    <div><b>Steel stress</b><code>f<sub>si</sub> = E<sub>s</sub>&epsilon;<sub>si</sub>, capped at +/- f<sub>sy</sub>; for a bar inside the rectangular concrete block, F<sub>si</sub> = A<sub>si</sub>(f<sub>si</sub> - &alpha;<sub>2</sub>f'<sub>c</sub>) to avoid double-counting displaced concrete</code></div>
    <div><b>Force equilibrium</b><code>C<sub>c</sub> + &Sigma;F<sub>s</sub> = ${residual.toFixed(3)} kN residual</code></div>
    <div><b>Nominal moment</b><code>M<sub>uo</sub> = internal force couple = ${fixed(result.muo)} kNm for the selected strip width b</code></div>
    <div><b>Capacity factor - AS 3600 Table 2.2.2</b><code>${legacyLayers.length ? `Legacy Y bar selected: conservative quick-screen &phi; = 0.65 unless actual bar grade and N-class equivalence are verified` : `Pure-bending N-class reinforcement assumption: k<sub>uo</sub> = x / d<sub>o</sub> = ${fixed(result.x)} / ${fixed(result.d0)} = ${result.kuo.toFixed(3)}; &phi; = clamp(1.24 - 13k<sub>uo</sub>/12, 0.65, 0.85)`} = ${result.phi.toFixed(2)}</code></div>
    <div><b>Ductility limit</b><code>${result.kuo > 0.36 ? `k<sub>uo</sub> = ${result.kuo.toFixed(3)} > 0.36; AS 3600 Cl. 8.1.5 conditions must be satisfied before using this as a design section` : `k<sub>uo</sub> = ${result.kuo.toFixed(3)} <= 0.36`}</code></div>
    <div><b>Design capacity</b><code>&phi;M<sub>uo</sub> = ${result.phi.toFixed(2)} x ${fixed(result.muo)} = ${fixed(result.phiMuo)} kNm; verify AS 3600 Table 2.2.2 and ductility class before issue for design</code></div>
    <div><b>Shear effective depth basis - AS 3600 Cl. 8.2.1.9</b><code>d is the distance from the compression face to the centroid of longitudinal tension reinforcement in the tensile half-depth. ${shear.dBasis}; ${shear.centroidArea > 0 ? `d = &Sigma;(A<sub>s</sub>d) / &Sigma;A<sub>s</sub> = ${fixed(shear.dNumerator)} / ${fixed(shear.centroidArea)} = ${fixed(shear.d)} mm` : `d = ${fixed(shear.d)} mm`}</code></div>
    <div><b>Shear geometry - AS 3600 Cl. 8.2.1.5 and 8.2.1.9</b><code>b<sub>v</sub> = b = ${fixed(shear.bv)} mm for this rectangular strip without ducts or voids; d<sub>v</sub> = max(0.72D, 0.9d) = max(0.72 x ${fixed(data.depth)}, 0.9 x ${fixed(shear.d)}) = max(${fixed(0.72 * data.depth)}, ${fixed(0.9 * shear.d)}) = ${fixed(shear.dv)} mm</code></div>
    <div><b>Shear reinforcement area</b><code>${shear.hasShearReo ? `A<sub>sv</sub> = n<sub>sv</sub>A<sub>bar,table</sub> = ${shear.nsv.toFixed(0)} x ${fixed(shear.shearBarArea)} = ${fixed(shear.asv)} mm2 per spacing using ${shear.shearDesignation}; A<sub>sv</sub>/s = ${fixed(shear.asv)} / ${fixed(shear.sv)} = ${shear.asvPerS.toFixed(3)} mm2/mm` : `No vertical shear reinforcement selected; A<sub>sv</sub>/s = 0 mm2/mm`}</code></div>
    <div><b>Simplified shear factor - AS 3600 Cl. 8.2.4.3</b><code>&theta;<sub>v</sub> = ${shear.theta.toFixed(0)} deg; A<sub>sv,min</sub>/s = 0.08&radic;f'<sub>c</sub>b<sub>v</sub>/f<sub>sy.f</sub> = ${shear.asvMinPerS.toFixed(3)} mm2/mm; ${shear.minShearReoProvided ? `provided A<sub>sv</sub>/s = ${shear.asvPerS.toFixed(3)} mm2/mm >= minimum, so k<sub>v</sub> = 0.15` : `provided A<sub>sv</sub>/s = ${shear.asvPerS.toFixed(3)} mm2/mm < minimum, so k<sub>v</sub> = min(200/(1000 + 1.3d<sub>v</sub>), 0.15) = ${shear.kv.toFixed(3)}`}</code></div>
    <div><b>Concrete shear contribution - AS 3600 Cl. 8.2.4.1</b><code>V<sub>uc</sub> = k<sub>v</sub>b<sub>v</sub>d<sub>v</sub>&radic;f'<sub>c</sub> = ${shear.kv.toFixed(3)} x ${fixed(shear.bv)} x ${fixed(shear.dv)} x ${shear.rootFc.toFixed(2)} / 1000 = ${fixed(shear.vuc)} kN; &radic;f'<sub>c</sub> is limited to 8.0 MPa</code></div>
    <div><b>Shear reinforcement contribution - AS 3600 Cl. 8.2.5.2</b><code>${shear.hasShearReo ? `V<sub>us</sub> = (A<sub>sv</sub>f<sub>sy.f</sub>d<sub>v</sub>/s)cot&theta;<sub>v</sub> = (${fixed(shear.asv)} x ${fixed(shear.fsyf)} x ${fixed(shear.dv)} / ${fixed(shear.sv)}) x ${shear.cotTheta.toFixed(3)} / 1000 = ${fixed(shear.vus)} kN` : `No vertical shear reinforcement selected; V<sub>us</sub> = 0 kN`}${shear.hasShearReo && !shear.minShearReoProvided ? `; CHECK: provided A<sub>sv</sub>/s is below the AS 3600 Cl. 8.2.1.7 minimum` : ``}</code></div>
    <div><b>One-way shear design capacity - AS 3600 Cl. 8.2.3.1 and Table 2.2.2</b><code>V<sub>u,raw</sub> = V<sub>uc</sub> + V<sub>us</sub> = ${fixed(shear.vuc)} + ${fixed(shear.vus)} = ${fixed(shear.vuRaw)} kN; V<sub>u,max</sub> web-crushing limit = ${fixed(shear.vuMax)} kN; V<sub>u</sub> = ${shear.webCrushingLimited ? `min(V<sub>u,raw</sub>, V<sub>u,max</sub>) = ` : ``}${fixed(shear.vu)} kN; &phi; = ${shear.phi.toFixed(2)} ${shear.minShearReoProvided ? `for verified minimum Class N fitments` : `without verified minimum Class N fitments`}; &phi;V<sub>u</sub> = ${shear.phi.toFixed(2)} x ${fixed(shear.vu)} = ${fixed(shear.phiVu)} kN</code></div>`;
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
  const validTool = toolNames.includes(tool);
  const selectedTool = validTool ? tool : "bolt";
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
  if ((updateHash || !validTool) && location.hash !== `#${selectedTool}`) {
    history.replaceState(null, "", `#${selectedTool}`);
  }
  if (selectedTool === "concrete") calculateConcrete();
}

function setMemberType(type) {
  memberType = type;
  const isCustom = type === "custom";
  document.querySelectorAll(".member-type").forEach(button => button.classList.toggle("active", button.dataset.memberType === type));
  document.querySelectorAll("[data-member-guide]").forEach(card => {
    card.hidden = card.dataset.memberGuide !== type;
  });
  $("memberSectionGroup").hidden = false;
  $("memberMaterialGroup").hidden = false;
  $("memberFactorGroup").hidden = false;
  $("memberActionGroup").hidden = false;
  $("memberCatalogueSectionFields").hidden = isCustom;
  $("memberCustomSectionFields").hidden = !isCustom;
  $("memberCatalogueFactorFields").hidden = isCustom;
  $("memberCustomFactorFields").hidden = !isCustom;
  $("alphaBField").hidden = isCustom;
  $("memberSectionField").hidden = isCustom;
  $("memberGradeField").hidden = isCustom;
  $("memberLengthField").hidden = isCustom;
  $("memberRadiusField").hidden = isCustom;
  $("memberAlphaBAssumption").hidden = isCustom;
  $("memberAlphaBAssumption").innerHTML = type === "chs"
    ? "k<sub>f</sub> and &alpha;<sub>b</sub> are applied from the selected CHS quick-screen basis."
    : type === "ea"
      ? "k<sub>f</sub> is catalogue-derived; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A/B) from the selected k<sub>f</sub>."
    : type === "pfc"
      ? "k<sub>f</sub> is catalogue-derived; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A/B) from the selected k<sub>f</sub>."
      : type === "custom"
        ? "Custom / Built-up uses user-entered effective properties for axial capacity only."
        : "k<sub>f</sub> = 1.0 for solid round geometry; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A).";
  $("memberAlphaB").disabled = type !== "custom";
  if (type === "chs") $("memberAlphaB").value = "-0.5";
  if (type === "ea") $("memberAlphaB").value = "0.5";
  if (type === "pfc") $("memberAlphaB").value = "0.5";
  if (type === "rod") $("memberAlphaB").value = "0.5";
  if (type === "custom") $("memberAlphaB").value = "0.5";
  populateMemberOptions();
}

function initialise() {
  enhanceNumberInputs();
  markInputSources();
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
  boltInputIds
    .filter(id => id !== "boltCount" && id !== "edgeBoltCount")
    .forEach(id => $(id).addEventListener("input", calculateBolt));
  $("boltCount").addEventListener("input", () => {
    if (!edgeBoltCountManual) $("edgeBoltCount").value = $("boltCount").value;
    calculateBolt();
  });
  $("edgeBoltCount").addEventListener("input", () => {
    edgeBoltCountManual = true;
    calculateBolt();
  });
  weldInputIds.forEach(id => $(id).addEventListener("input", calculateWeld));
  concreteInputIds.forEach(id => {
    const depthMatch = id.match(/^layer([1-4])Y$/);
    if (depthMatch) {
      $(id).addEventListener("input", () => setConcreteLayerDepthManual(Number(depthMatch[1])));
      return;
    }
    $(id).addEventListener("input", calculateConcrete);
  });
  [1, 2, 3, 4].forEach(index => {
    $(`layer${index}Bar`).addEventListener("change", () => {
      setConcreteBarDefaults(index);
      calculateConcrete();
    });
  });
  $("concreteShearBar").addEventListener("change", () => {
    setConcreteShearBarDefaults();
    calculateConcrete();
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
  $("beamShearDemand").addEventListener("input", calculateBeam);
  beamCustomInputIds.forEach(id => $(id).addEventListener("input", calculateBeam));
  document.querySelectorAll(".member-type").forEach(button => button.addEventListener("click", () => setMemberType(button.dataset.memberType)));
  $("memberSection").addEventListener("change", populateMemberGrades);
  $("memberGrade").addEventListener("change", () => {
    setMemberStrengthDefaults();
    calculateMember();
  });
  $("memberFyInput").addEventListener("input", calculateMember);
  $("memberFuInput").addEventListener("input", calculateMember);
  $("memberRadiusInput").addEventListener("input", calculateMember);
  $("memberDimensionOverride").addEventListener("change", calculateMember);
  ["memberDimChsD", "memberDimChsT", "memberDimEaB", "memberDimEaT", "memberDimPfcD", "memberDimPfcBf", "memberDimPfcTw", "memberDimPfcTf", "memberDimRodD"].forEach(id => $(id).addEventListener("input", calculateMember));
  ["memberCustomName", "memberCustomArea", "memberCustomRx", "memberCustomRy", "memberCustomKf", "memberCustomAlphaBx", "memberCustomAlphaBy", "memberCustomLex", "memberCustomLey"].forEach(id => $(id).addEventListener("input", calculateMember));
  $("memberLength").addEventListener("input", calculateMember);
  $("memberAlphaB").addEventListener("change", calculateMember);
  $("memberActionType").addEventListener("change", calculateMember);
  $("memberAxialDemand").addEventListener("input", calculateMember);
  $("memberNetAreaMode").addEventListener("change", calculateMember);
  $("memberHoleCount").addEventListener("input", calculateMember);
  $("memberHoleDiameter").addEventListener("input", calculateMember);
  $("memberHoleThickness").addEventListener("input", calculateMember);
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
