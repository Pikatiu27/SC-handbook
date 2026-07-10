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

const uBoltProducts = [
  {
    id: "hilti-mp-ub-oc-m10",
    application: "Mounting pipe / round member",
    manufacturer: "Hilti",
    series: "MP-UB OC metric",
    product: "MP-UB OC M10 family",
    code: "r12293804 family",
    thread: "M10",
    fitKey: "D 60-89 mm",
    fit: "MP-UB 60-89 range",
    finish: "Outdoor HDG",
    material: "Q235 or better steel - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The Australian product page publishes geometry, finish and application data, but no rated structural capacity.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Hilti Australia MP-UB OC metric product page",
    sourceUrl: "https://www.hilti.com.au/c/CLS_MODULAR_SUPPORT_SYSTEM/CLS_PIPE_SUPPORTS/r12293804"
  },
  {
    id: "hilti-mp-ub-oc-m12",
    application: "Mounting pipe / round member",
    manufacturer: "Hilti",
    series: "MP-UB OC metric",
    product: "MP-UB OC M12 family",
    code: "r12293804 family",
    thread: "M12",
    fitKey: "D 102-324 mm",
    fit: "MP-UB 102-324 range",
    finish: "Outdoor HDG",
    material: "Q235 or better steel - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The Australian product page publishes geometry, finish and application data, but no rated structural capacity.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Hilti Australia MP-UB OC metric product page",
    sourceUrl: "https://www.hilti.com.au/c/CLS_MODULAR_SUPPORT_SYSTEM/CLS_PIPE_SUPPORTS/r12293804"
  },
  {
    id: "hilti-mp-ub-oc-m20",
    application: "Mounting pipe / round member",
    manufacturer: "Hilti",
    series: "MP-UB OC metric",
    product: "MP-UB OC M20 option",
    code: "r12293804 family",
    thread: "M20",
    fitKey: "350 mm nominal",
    fit: "350 mm nominal - verify configured item",
    finish: "Outdoor HDG",
    material: "Q235 or better steel - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The Australian configurator lists an M20 option; confirm the selected item geometry before specification.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Hilti Australia MP-UB OC metric product page",
    sourceUrl: "https://www.hilti.com.au/c/CLS_MODULAR_SUPPORT_SYSTEM/CLS_PIPE_SUPPORTS/r12293804"
  },
  {
    id: "hilti-mqt-f-m12",
    application: "Beam / channel clamp assembly",
    manufacturer: "Hilti",
    series: "MQT-F beam clamp",
    product: "MQT-F M12 beam clamp family",
    code: "r2937 family",
    thread: "M12",
    fitKey: "MQ strut / steel beam",
    fit: "MQ strut to steel beam",
    finish: "Outdoor HDG",
    material: "S235-series steel U-bolt - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Assembly-specific",
    capacityBasis: "This is a beam-clamp assembly. Use the configured Hilti item and assembly data; do not treat it as a free U-bolt capacity.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Hilti Australia MQT-F beam clamp product page",
    sourceUrl: "https://www.hilti.com.au/c/CLS_MODULAR_SUPPORT_SYSTEM/CLS_SYS_CONNECTORS_INT/r2937"
  },
  ...[
    { d: 60, code: "E14-060H", thread: "M10", workingLoad: "752 kg" },
    { d: 76, code: "E14-076H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 89, code: "E14-089H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 102, code: "E14-102H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 114, code: "E14-114H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 140, code: "E14-140H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 165, code: "E14-165H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 219, code: "E14-219H", thread: "M16", workingLoad: "2,069 kg" },
    { d: 273, code: "E14-273H", thread: "M20", workingLoad: "3,252 kg" }
  ].map(row => ({
    id: `ezystrut-${row.code.toLowerCase()}`,
    application: "Mounting pipe / round member",
    manufacturer: "EzyStrut",
    series: "E14 Heavy Duty U Bolt HDG",
    product: `E14 Heavy Duty U Bolt - D ${row.d} mm`,
    code: row.code,
    thread: row.thread,
    fitKey: `D ${row.d} mm`,
    fit: `Pipe / round member D ${row.d} mm`,
    finish: "Outdoor HDG",
    material: "AS/NZS 1594 steel - HDG to AS/NZS 4680",
    publishedCapacity: `${row.workingLoad} working load`,
    capacityDirection: "Load direction not stated",
    capacityBasis: "Manufacturer working load with a stated 3:1 safety factor. Verify load direction and complete assembly applicability before project use.",
    sourceStatus: "Source_Checked",
    sourceName: "EzyStrut E14 Heavy Duty U Bolt HDG product table",
    sourceUrl: "https://www.ezystrut.com.au/products/pipe-support-systems/u-bolts/e14h/"
  })),
  ...[
    { nb: 50, d: 60, l: 110, t: 50, code: "KURMSGCM100060", thread: "M10" },
    { nb: 65, d: 76, l: 127, t: 50, code: "KURMSGCM120076", thread: "M12" },
    { nb: 80, d: 89, l: 140, t: 50, code: "KURMSGCM120089", thread: "M12" },
    { nb: 90, d: 102, l: 152, t: 50, code: "KURMSGCM120102", thread: "M12" },
    { nb: 100, d: 114, l: 165, t: 50, code: "KURMSGCM120114", thread: "M12" },
    { nb: 125, d: 140, l: 190, t: 50, code: "KURMSGCM120140", thread: "M12" },
    { nb: 150, d: 165, l: 215, t: 50, code: "KURMSGCM120165", thread: "M12" },
    { nb: 150, d: 168, l: 220, t: 50, code: "KURMSGCM120168", thread: "M12" },
    { nb: 200, d: 219, l: 295, t: 75, code: "KURMSGCM160219", thread: "M16" },
    { nb: 250, d: 273, l: 370, t: 100, code: "KURMSGCM200273", thread: "M20" },
    { nb: 300, d: 324, l: 420, t: 100, code: "KURMSGCM200324", thread: "M20" }
  ].map(row => ({
    id: `hobson-${row.code.toLowerCase()}`,
    application: "Mounting pipe / round member",
    manufacturer: "Hobson Engineering",
    supplier: "Hobson Engineering",
    series: "Metric Round U Bolt Kit",
    product: `HDG round U-bolt - ${row.nb}NB / D ${row.d} mm`,
    code: row.code,
    thread: row.thread,
    fitKey: `D ${row.d} mm`,
    fit: `${row.nb}NB pipe / D ${row.d} mm - L ${row.l} mm`,
    finish: "Outdoor HDG",
    material: `Mild steel - HDG - two nuts - thread length ${row.t} mm`,
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The official technical sheet publishes product geometry and pack data, but no rated structural capacity.",
    sourceStatus: "Source_Checked",
    sourceName: "Hobson Engineering U Bolts technical sheet",
    sourceUrl: "https://cdn.hobson.com.au/documents/tech-ubolts-230426.pdf"
  })),
  ...[
    { nb: 65, d: 76, l: 153, t: 89, code: "CSWUBNB06", thread: "M12" },
    { nb: 80, d: 89, l: 180, t: 100, code: "CSWUBNB07", thread: "M12" },
    { nb: 90, d: 102, l: 200, t: 100, code: "CSWUBRTMS45G", thread: "M12" },
    { nb: 100, d: 114, l: 165, t: 100, code: "CSWUBNB08", thread: "M12" },
    { nb: 125, d: 141, l: 200, t: 100, code: "CSWUBRTMS55G", thread: "M12" },
    { nb: 150, d: 165, l: 220, t: 100, code: "CSWUBNB09", thread: "M12" }
  ].map(row => ({
    id: `csw-${row.code.toLowerCase()}`,
    application: "Mounting pipe / round member",
    manufacturer: "CSW Products",
    supplier: "CSW Products",
    series: "U Bolts Nominal Bore Pipe",
    product: `Galvanised pipe U-bolt - ${row.nb}NB / D ${row.d} mm`,
    code: row.code,
    thread: row.thread,
    fitKey: `D ${row.d} mm`,
    fit: `${row.nb}NB pipe / D ${row.d} mm - L ${row.l} mm`,
    finish: "Galvanised - verify coating",
    material: `Mild steel - thread rolled - thread length ${row.t} mm`,
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The reviewed catalogue publishes geometry and a galvanised finish, but no rated capacity or coating standard. Confirm current availability and finish before use.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "CSW Products catalogue - U Bolts Nominal Bore Pipe",
    sourceUrl: "https://www.cswproducts.com.au/content/products/CSWCatalogue11.pdf"
  })),
  ...[
    { w: 40, l: 110, t: 50, code: "CSWUBST21" },
    { w: 50, l: 100, t: 50, code: "CSWUBST22" },
    { w: 50, l: 170, t: 50, code: "CSWUBST23" },
    { w: 75, l: 150, t: 50, code: "CSWUBST26" }
  ].map(row => ({
    id: `csw-${row.code.toLowerCase()}`,
    application: "Beam / channel clamp assembly",
    manufacturer: "CSW Products",
    supplier: "CSW Products",
    series: "U Bolts Square Top Galvanised",
    product: `Galvanised square-top M12 - W ${row.w} x L ${row.l} mm`,
    code: row.code,
    thread: "M12",
    fitKey: `Square W ${row.w} x L ${row.l} mm`,
    fit: `Square member / W ${row.w} x L ${row.l} mm`,
    finish: "Galvanised - verify coating",
    material: `Mild steel - thread rolled - thread length ${row.t} mm`,
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The reviewed catalogue publishes geometry and a galvanised finish, but no rated capacity or coating standard. Confirm current availability and finish before use.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "CSW Products catalogue - U Bolts Square Top Galvanised",
    sourceUrl: "https://www.cswproducts.com.au/content/products/CSWCatalogue11.pdf"
  })),
  {
    id: "allthread-custom-ubolt",
    application: "Custom / project-manufactured",
    manufacturer: "Allthread Industries",
    supplier: "Allthread Industries",
    series: "Custom thread-rolled bolt manufacture",
    product: "Custom traceable U-bolt",
    code: "Project-specific",
    thread: "Project-specific",
    fitKey: "Custom geometry",
    fit: "Project-specific geometry",
    finish: "Project-specified",
    material: "Project-specified material, thread and coating",
    publishedCapacity: "Project-specific",
    capacityDirection: "Project-specific",
    capacityBasis: "Manufacturer capability and traceability are published. Obtain the certified drawing, material certificate, testing, coating and rated capacity for the ordered product.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Allthread Industries manufacturing capability",
    sourceUrl: "https://allthread.com.au/"
  },
  ...[
    { code: "F21050", beamWidth: "64-102 mm" },
    { code: "F21100", beamWidth: "127-190 mm" },
    { code: "F21150", beamWidth: "210-270 mm" }
  ].map(row => ({
    id: `unistrut-${row.code.toLowerCase()}`,
    application: "Beam / channel clamp assembly",
    manufacturer: "Unistrut",
    series: "F21000 Heavy Duty Beam Clamp",
    product: `F21000 beam clamp - ${row.beamWidth} beam width`,
    code: row.code,
    thread: "M12",
    fitKey: `Beam ${row.beamWidth}`,
    fit: `Beam width ${row.beamWidth}`,
    finish: "Outdoor HDG",
    material: "50 x 5 steel strip - M12 U-bolt - HDG",
    publishedCapacity: "Not published",
    capacityDirection: "Assembly-specific",
    capacityBasis: "The catalogue identifies the M12 U-bolt beam-clamp assembly and geometry, but no rated capacity is published in the reviewed table.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Unistrut Australia electrical and mechanical catalogue",
    sourceUrl: "https://unistrut.com.au/wp-content/uploads/2021/06/2018-08-unistrut-australia-catalogue-web.pdf"
  })),
  {
    id: "anzor-pipe-ubp6051m10",
    application: "General pipe support",
    manufacturer: "Anzor",
    series: "Pipe U Bolts",
    product: "2 Pipe x M10 316 U Bolt",
    code: "UBP6051M10",
    thread: "M10",
    fitKey: "2 in pipe",
    fit: "2 in pipe",
    finish: "Stainless steel",
    material: "316 stainless steel",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "No manufacturer-rated capacity in the reviewed product listing.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Anzor Pipe U Bolts product listing",
    sourceUrl: "https://www.anzor.com.au/tube-pipe-fittings/u-bolts/pipe-u-bolts"
  },
  {
    id: "anzor-tube-ubm612nb90",
    application: "General pipe support",
    manufacturer: "Anzor",
    series: "Tube U Bolts",
    product: "M12 x 90 NB 316 U-Bolt Kit",
    code: "UBM612NB90",
    thread: "M12",
    fitKey: "90 NB",
    fit: "90 NB",
    finish: "Stainless steel",
    material: "316 stainless steel",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "No manufacturer-rated capacity in the reviewed product listing.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Anzor Tube U Bolts product listing",
    sourceUrl: "https://www.anzor.com.au/tube-pipe-fittings/u-bolts/tube-u-bolts"
  },
  {
    id: "anzor-marine-mfubsm408115",
    application: "General pipe support",
    manufacturer: "Anzor",
    series: "Marine Shouldered U Bolts",
    product: "S547 M8 x 115 304 Shouldered U Bolt",
    code: "MFUBSM408115",
    thread: "M8",
    fitKey: "115 mm shouldered",
    fit: "115 mm shouldered",
    finish: "Stainless steel",
    material: "304 stainless steel",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "No manufacturer-rated capacity in the reviewed product listing.",
    sourceStatus: "Source_Not_Verified",
    sourceName: "Anzor Shouldered U Bolts product listing",
    sourceUrl: "https://www.anzor.com.au/marine-deck-hardware/u-bolts/shouldered-u-bolts"
  }
];

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
    note: "AS 4100 throat-capacity check",
    throatNote: "equal-leg fillet: t_t = 0.707s",
    scope: "fillet-weld throat capacity"
  },
  cpbw: {
    label: "CPBW",
    note: "weld-metal throat capacity only",
    throatNote: "complete penetration: use entered a_w",
    scope: "complete-penetration butt-weld capacity view"
  },
  ipbw: {
    label: "IPBW",
    note: "specified throat capacity only",
    throatNote: "incomplete penetration: use specified a_w",
    scope: "incomplete-penetration butt-weld capacity view"
  },
  compound: {
    label: "Compound",
    note: "combined throat capacity only",
    throatNote: "compound throat: a_w + 0.707s",
    scope: "butt weld plus superimposed fillet capacity view"
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
  designation: "Custom / Built-up properties",
  grades: { "User input": { fy: 350, fu: 450, kf: 1 } }
}];

const chsGrades = {
  C250L0: { fy: 250, fu: 320, kf: 1 },
  C350L0: { fy: 350, fu: 430, kf: 1 }
};

const screwPileCatalogues = {
  katana: {
    label: "Katana",
    defaultSeries: "katana-80",
    series: {
      "katana-40": {
        label: "Katana 40 kN series",
        system: "Conventional steel screw pile",
        axialClass: 40,
        compression: 40,
        uplift: 40,
        lateral: 0,
        shaft: "60.3 x 4.5 CHS",
        diameter: "60.3 mm OD",
        wall: "4.5 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "200 x 8 mm",
        length: "1.0 m lead; extensions by design",
        extension: "Available on request",
        soilRequirement: "Geotechnical strength controls; guide basis is stiff/dense founding soil",
        installControl: "Use project torque/test acceptance",
        source: "Katana Performance Guide Rev Z",
        defaultSource: "manufacturer",
        capacityBasis: "Published load capacity / compression SWL; available on request.",
        note: "Smaller upon-request series. Confirm availability, certificate scope and installation torque before selection."
      },
      "katana-80": {
        label: "Katana 80 kN series",
        system: "Conventional steel screw pile",
        axialClass: 80,
        compression: 80,
        uplift: 80,
        lateral: 0,
        shaft: "76.1 x 4.0 CHS",
        diameter: "76.1 mm OD",
        wall: "4.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "250 x 8 mm",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; extension sections available",
        soilRequirement: "Stiff clay / dense sand indicator; soft or loose material needs test confirmation",
        installControl: "Example guide correlation: 4000 Nm for 80 kN in stiff/dense soils",
        source: "Katana Performance Guide Rev Z / CodeMark",
        defaultSource: "series",
        capacityBasis: "Series class and published compression SWL; uplift and lateral need project confirmation.",
        note: "Common CodeMark-compliant series. Lateral graph is available for 80 kN clay/sand cases; do not select by axial class alone."
      },
      "katana-100": {
        label: "Katana 100 kN series",
        system: "Conventional steel screw pile",
        axialClass: 100,
        compression: 100,
        uplift: 100,
        lateral: 0,
        shaft: "76.1 x 4.0 CHS",
        diameter: "76.1 mm OD",
        wall: "4.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "300 x 8 mm",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; helix extension option noted",
        soilRequirement: "Geotechnical strength controls; confirm final torque and founding layer",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Katana Performance Guide Rev Z / CodeMark",
        defaultSource: "series",
        capacityBasis: "Series class and published load table; uplift and lateral need project confirmation.",
        note: "Same shaft as 80 kN with larger helix. Check helix size, torque and pile spacing before adopting."
      },
      "katana-150": {
        label: "Katana 150 kN series",
        system: "Conventional steel screw pile",
        axialClass: 150,
        compression: 150,
        uplift: 150,
        lateral: 0,
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "350 x 10 mm",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; helix extension option noted",
        soilRequirement: "Geotechnical strength controls; confirm final torque and founding layer",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Katana Performance Guide Rev Z / CodeMark",
        defaultSource: "series",
        capacityBasis: "Series class and published compression SWL; lateral graph available for selected soil cases.",
        note: "Larger shaft and helix. Lateral graph is available for 150 kN clay/sand cases; head fixity remains project-specific."
      },
      "katana-200": {
        label: "Katana 200 kN series",
        system: "Conventional steel screw pile",
        axialClass: 200,
        compression: 200,
        uplift: 200,
        lateral: 0,
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "2 helices",
        helix: "2 No. 350 x 10 mm",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; extension sections available",
        soilRequirement: "Geotechnical strength controls; pile group and helix spacing need review",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Katana Performance Guide Rev Z / CodeMark",
        defaultSource: "series",
        capacityBasis: "Series class and published load table; verify uplift/lateral separately.",
        note: "Two-helix option. Check inter-helix behaviour, pile spacing and installation torque before adopting."
      },
      "katana-250": {
        label: "Katana 250 kN series",
        system: "Conventional steel screw pile",
        axialClass: 250,
        compression: 250,
        uplift: 250,
        lateral: 0,
        shaft: "114.3 x 6.0 CHS",
        diameter: "114.3 mm OD",
        wall: "6.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "450 x 12 mm",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; project-specific",
        soilRequirement: "Commercial-load option; confirm founding layer and installation equipment capacity",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Katana Performance Guide Rev Z",
        defaultSource: "manufacturer",
        capacityBasis: "Published load table; available upon request in the guide.",
        note: "Higher-capacity commercial option. Check product availability, equipment torque and project certificate."
      },
      "katana-300": {
        label: "Katana 300 kN series",
        system: "Conventional steel screw pile",
        axialClass: 300,
        compression: 300,
        uplift: 300,
        lateral: 0,
        shaft: "114.3 x 6.0 CHS",
        diameter: "114.3 mm OD",
        wall: "6.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "2 helices",
        helix: "2 No. 450 x 12 mm",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; project-specific",
        soilRequirement: "Commercial-load option; confirm founding layer and installation equipment capacity",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Katana Performance Guide Rev Z",
        defaultSource: "manufacturer",
        capacityBasis: "Published load table; available upon request in the guide.",
        note: "Largest Katana guide option captured here. Treat as manufacturer/project-confirmed selection, not simple residential default."
      }
    }
  },
  ideal: {
    label: "Ideal Foundations",
    series: {
      "ideal-85": {
        label: "Ideal modular 85 kN",
        system: "Modular screw pier",
        axialClass: 85,
        compression: 85,
        uplift: 0,
        lateral: 0,
        shaft: "76 x 4.0 CHS",
        diameter: "76 mm OD",
        wall: "4.0 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "1 helix",
        helix: "300 mm cast helix",
        length: "1.0-3.0 m shafts; max depth up to 6 m",
        extension: "Bolted modular extensions",
        soilRequirement: "Min 200 kPa unfactored; DCP 8 blows/100 mm min",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Ideal Foundations Specifiers Technical Guide v1.2",
        defaultSource: "manufacturer",
        capacityBasis: "System selection table SWL up to 85 kN; load direction must be project-confirmed.",
        note: "Off-the-shelf modular system. Use uplift/lateral values only from Ideal/project design."
      },
      "ideal-120": {
        label: "Ideal 120 kN system",
        system: "Manufactured screw pier",
        axialClass: 120,
        compression: 120,
        uplift: 0,
        lateral: 0,
        shaft: "76 x 5.0 CHS",
        diameter: "76 mm OD",
        wall: "5.0 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "1 helix or plate helix",
        helix: "280 mm helix or 400 mm plate",
        length: "1.0-4.0 m shafts; max depth up to 9 m",
        extension: "Extensions by system design",
        soilRequirement: "Min 300 kPa unfactored; DCP 12 blows/100 mm min",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Ideal Foundations Specifiers Technical Guide v1.2",
        defaultSource: "manufacturer",
        capacityBasis: "System selection table SWL up to 120 kN; load direction must be project-confirmed.",
        note: "Residential/commercial transition option. Select the helix form to match soil and project demand."
      },
      "ideal-200": {
        label: "Ideal 200 kN system",
        system: "Manufactured screw pier",
        axialClass: 200,
        compression: 200,
        uplift: 0,
        lateral: 0,
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Single or multi-fin/plate option",
        helix: "280+350 mm helix, 400/500 mm plate options",
        length: "2.0-4.0 m shafts; max depth up to 12 m",
        extension: "Extensions by system design",
        soilRequirement: "Min 450 kPa unfactored; DCP 18 blows/100 mm min",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Ideal Foundations Specifiers Technical Guide v1.2",
        defaultSource: "manufacturer",
        capacityBasis: "System selection table SWL up to 200 kN; load direction must be project-confirmed.",
        note: "Higher capacity manufactured range. Helix choice and soil class drive the selection."
      },
      "ideal-300": {
        label: "Ideal 300 kN system",
        system: "Manufactured screw pier",
        axialClass: 300,
        compression: 300,
        uplift: 0,
        lateral: 0,
        shaft: "114 x 6.0 CHS",
        diameter: "114 mm OD",
        wall: "6.0 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Single or multi-fin/plate option",
        helix: "350+450 mm helix, 500 mm plate option",
        length: "2.0-6.0 m shafts; max depth up to 16 m",
        extension: "Extensions by system design",
        soilRequirement: "Min 600 kPa or rock 750 kPa; DCP 24+ to rock",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Ideal Foundations Specifiers Technical Guide v1.2",
        defaultSource: "manufacturer",
        capacityBasis: "System selection table SWL up to 300 kN; load direction must be project-confirmed.",
        note: "Heavy manufactured range. Confirm equipment, founding stratum and pier head details."
      },
      "ideal-500": {
        label: "Ideal 500 kN system",
        system: "Manufactured screw pier",
        axialClass: 500,
        compression: 500,
        uplift: 0,
        lateral: 0,
        shaft: "168 to 219 x 6.4/8.2 CHS",
        diameter: "168-219 mm OD",
        wall: "6.4-8.2 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Project-selected helix/plate",
        helix: "350+450 mm helix, 600/750 mm plate options",
        length: "2.0-6.0 m shafts; max depth up to 20-30 m",
        extension: "Welded/manufactured extensions",
        soilRequirement: "Rock founding, 1250 kPa+ guide basis",
        installControl: "Project installation pressure/torque and certification required",
        source: "Ideal Foundations Specifiers Technical Guide v1.2",
        defaultSource: "manufacturer",
        capacityBasis: "System selection table SWL up to 500 kN; project-specific design required.",
        note: "Heavy project-specific screw pier. Not a simple catalogue pick without geotechnical and supplier design."
      }
    }
  },
  blade: {
    label: "Blade Pile",
    defaultSeries: "blade-76",
    series: {
      "blade-76": {
        label: "Blade Pile 76 mm residential",
        system: "Round-shaft or twin-blade screw pile",
        axialClass: 100,
        compression: 100,
        uplift: 0,
        lateral: 0,
        shaft: "76.1 x 4.0 CHS",
        diameter: "76.1 mm OD",
        wall: "4.0 mm",
        steel: "450 MPa minimum yield stated for 76 mm shafts",
        helixCount: "Single blade or twin-blade option",
        helix: "250-300 mm blade; 8/10 mm plate",
        length: "Project-selected lead and extensions",
        extension: "Bolt connection noted",
        soilRequirement: "AS 2159 project design; geotechnical report controls",
        installControl: "Record final torque, depth and founding stratum",
        source: "Blade Pile screw-pile product page",
        defaultSource: "manufacturer",
        capacityBasis: "Public page indicates 76 mm residential piles up to 100 kN SWL; direction and soil case must be confirmed.",
        note: "Use as a residential/light-commercial prompt. Uplift, lateral resistance, settlement and durability remain project design items."
      },
      "blade-88": {
        label: "Blade Pile 88.9 mm range",
        system: "Round-shaft or twin-blade screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "350 MPa minimum yield stated for larger shafts",
        helixCount: "Single blade or twin-blade option",
        helix: "250-400 mm blade; 10-16 mm plate",
        length: "Project-selected lead and extensions",
        extension: "Bolt connection noted",
        soilRequirement: "AS 2159 project design; geotechnical report controls",
        installControl: "Record final torque, depth and founding stratum",
        source: "Blade Pile screw-pile product page",
        defaultSource: "user",
        capacityBasis: "Geometry range only in the selector; enter certified resistance before checking actions.",
        note: "Intermediate shaft range. Confirm blade configuration and resistance from the supplier/project design."
      },
      "blade-114": {
        label: "Blade Pile 114 mm commercial",
        system: "Round-shaft or twin-blade screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "114 x 6.0 CHS",
        diameter: "114 mm OD",
        wall: "6.0 mm",
        steel: "350 MPa minimum yield stated for larger shafts",
        helixCount: "Single blade or twin-blade option",
        helix: "250-500 mm blade; 10-20 mm plate",
        length: "Project-selected lead and extensions",
        extension: "Bolt connection noted",
        soilRequirement: "AS 2159 project design; geotechnical report controls",
        installControl: "Record final torque, depth and founding stratum",
        source: "Blade Pile screw-pile product page",
        defaultSource: "user",
        capacityBasis: "Commercial range is stated by source as project-dependent; enter certified Rc, Rt and Rv.",
        note: "Commercial candidate. Do not infer resistance from shaft diameter alone."
      },
      "blade-heavy": {
        label: "Blade Pile heavy range",
        system: "Heavy round-shaft screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "141 / 168 / 219 / 273 mm CHS",
        diameter: "141-273 mm OD",
        wall: "6.0 / 7.1 / 8.2 / 12.7 mm",
        steel: "350 MPa minimum yield stated for larger shafts",
        helixCount: "Project-selected blades",
        helix: "200-700 mm blade; project dependent",
        length: "Project-specific depth and extensions",
        extension: "Bolt or engineered connection by design",
        soilRequirement: "Project geotechnical design and installation method statement required",
        installControl: "High-torque installation and load-test regime by project",
        source: "Blade Pile screw-pile product page",
        defaultSource: "user",
        capacityBasis: "Source identifies heavy project range; this row is dimensions-only until certified resistance is entered.",
        note: "Heavy civil/commercial prompt. Capacity, settlement, buckling and durability are not catalogue defaults."
      },
      "blade-multi": {
        label: "Blade Pile multi-helix range",
        system: "Multi-helix screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "88.9-323 mm CHS",
        diameter: "88.9-323 mm OD",
        wall: "Supplier/project selected",
        steel: "350 MPa minimum yield stated for larger shafts",
        helixCount: "Multiple helices",
        helix: "Project-selected blade stack",
        length: "Project-specific depth and extensions",
        extension: "Engineered splice or coupler by design",
        soilRequirement: "Inter-helix spacing and founding layers require geotechnical design",
        installControl: "Torque, depth and refusal criteria by project",
        source: "Blade Pile screw-pile product page",
        defaultSource: "user",
        capacityBasis: "Source identifies a multi-helix product family; enter certified direction-specific resistance.",
        note: "Use where a larger bearing zone or uplift resistance is needed. Verify helix spacing and group interaction."
      }
    }
  },
  piletech: {
    label: "Piletech",
    defaultSeries: "piletech-range",
    series: {
      "piletech-range": {
        label: "Piletech 76-323.9 mm range",
        system: "Project-designed screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "76-323.9 mm CHS",
        diameter: "76-323.9 mm OD",
        wall: "Project-selected",
        steel: "Supplier/project specification",
        helixCount: "Single or multiple flights",
        helix: "300-850 mm helix range",
        length: "Single lengths up to 9 m; deeper projects noted",
        extension: "Shop or site-welded extensions by design",
        soilRequirement: "Site-specific geotechnical report and project design required",
        installControl: "Rig torque, final depth and welding QA records required",
        source: "Piletech screw-piling product page",
        defaultSource: "user",
        capacityBasis: "Public range notes high axial-load capability, but no row-specific Rc/Rt/Rv is embedded.",
        note: "Project-designed contractor range. Use the row to frame an enquiry, then enter certified resistance values."
      },
      "piletech-heavy": {
        label: "Piletech heavy/deep range",
        system: "Heavy project-designed screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "219-323.9 mm CHS",
        diameter: "219-323.9 mm OD",
        wall: "Project-selected",
        steel: "Supplier/project specification",
        helixCount: "Multiple flights possible",
        helix: "Large helix up to 850 mm",
        length: "Deep installation by project method statement",
        extension: "Engineered splice/weld by design",
        soilRequirement: "High-capacity foundations need geotechnical design, settlement check and load testing",
        installControl: "High-capacity torque equipment and QA hold points required",
        source: "Piletech screw-piling product page",
        defaultSource: "user",
        capacityBasis: "Dimensions and installation capability prompt only; resistance must be project-certified.",
        note: "Use for heavy civil enquiries. Check torsional capacity, weld QA, installation tolerance and testing scope."
      }
    }
  },
  driven: {
    label: "Driven Engineering",
    defaultSeries: "driven-76",
    series: {
      "driven-76": {
        label: "Driven 76.1 mm product row",
        system: "Conventional steel screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "76.1 x 4.8 CHS",
        diameter: "76.1 mm OD",
        wall: "4.8 mm",
        steel: "Supplier product specification required",
        helixCount: "1 helix",
        helix: "275 x 12 mm",
        length: "3000 mm product row",
        extension: "Coupler/flange details by product row",
        soilRequirement: "Geotechnical resistance required before adoption",
        installControl: "Use supplier installation torque and acceptance criteria",
        source: "Driven Engineering screw-pile product category",
        defaultSource: "user",
        capacityBasis: "Public product row gives dimensions only; enter certified resistance before checking actions.",
        note: "Procurement-size row. It helps shortlist geometry, not capacity."
      },
      "driven-88": {
        label: "Driven 88.9 mm product row",
        system: "Conventional steel screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "88.9 mm CHS",
        diameter: "88.9 mm OD",
        wall: "Supplier row to confirm",
        steel: "Supplier product specification required",
        helixCount: "1 helix",
        helix: "275 x 12 mm",
        length: "3000 mm product row",
        extension: "Coupler/flange details by product row",
        soilRequirement: "Geotechnical resistance required before adoption",
        installControl: "Use supplier installation torque and acceptance criteria",
        source: "Driven Engineering screw-pile product category",
        defaultSource: "user",
        capacityBasis: "Public product row gives dimensions only; enter certified resistance before checking actions.",
        note: "Geometry option between common 76 mm and 114 mm ranges."
      },
      "driven-114": {
        label: "Driven 114 mm product row",
        system: "Conventional steel screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "114 mm CHS",
        diameter: "114 mm OD",
        wall: "Supplier row to confirm",
        steel: "Supplier product specification required",
        helixCount: "1 helix",
        helix: "350 x 16 mm",
        length: "3000 or 6000 mm product row",
        extension: "Coupler/flange details by product row",
        soilRequirement: "Geotechnical resistance required before adoption",
        installControl: "Use supplier installation torque and acceptance criteria",
        source: "Driven Engineering screw-pile product category",
        defaultSource: "user",
        capacityBasis: "Public product row gives dimensions only; enter certified resistance before checking actions.",
        note: "Common medium commercial geometry. Confirm wall thickness and structural checks from supplier data."
      },
      "driven-168": {
        label: "Driven 168 mm product row",
        system: "Conventional steel screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "168 x 7.1 CHS",
        diameter: "168 mm OD",
        wall: "7.1 mm",
        steel: "Supplier product specification required",
        helixCount: "1 helix",
        helix: "500 x 25 mm",
        length: "3000 or 6000 mm product row",
        extension: "Coupler/flange details by product row",
        soilRequirement: "Geotechnical resistance required before adoption",
        installControl: "Use supplier installation torque and acceptance criteria",
        source: "Driven Engineering screw-pile product category",
        defaultSource: "user",
        capacityBasis: "Public product row gives dimensions only; enter certified resistance before checking actions.",
        note: "Large product geometry. Check installability, torsional capacity and head connection before adoption."
      },
      "driven-219": {
        label: "Driven 219 mm product row",
        system: "Conventional steel screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "219 x 8.2 CHS",
        diameter: "219 mm OD",
        wall: "8.2 mm",
        steel: "Supplier product specification required",
        helixCount: "1 helix",
        helix: "700 x 28 mm",
        length: "3000 or 6000 mm product row",
        extension: "Coupler/flange details by product row",
        soilRequirement: "Geotechnical resistance required before adoption",
        installControl: "Use supplier installation torque and acceptance criteria",
        source: "Driven Engineering screw-pile product category",
        defaultSource: "user",
        capacityBasis: "Public product row gives dimensions only; enter certified resistance before checking actions.",
        note: "Heavy product geometry. Treat as procurement information until supplier/geotechnical resistance is issued."
      }
    }
  },
  keller: {
    label: "Keller",
    defaultSeries: "keller-typical",
    series: {
      "keller-typical": {
        label: "Keller typical SWL range",
        system: "Engineered helical screw pile",
        axialClass: 300,
        compression: 300,
        uplift: 200,
        lateral: 25,
        shaft: "Steel shaft; size by project",
        diameter: "Project-selected",
        wall: "Project-selected",
        steel: "Supplier/project specification",
        helixCount: "Helical flights by ground condition",
        helix: "Various flight sizes",
        length: "Advanced in sections to design depth",
        extension: "Threaded, welded or bolted connection by system",
        soilRequirement: "Subsurface ground conditions govern size, depth and resistance",
        installControl: "Final torque reading over the last metre plus project acceptance criteria",
        source: "Keller helical/screw piles technique page",
        defaultSource: "manufacturer",
        capacityBasis: "Public technique page gives typical SWL limits; verify project-specific resistance and settlement.",
        note: "Useful benchmark for enquiry and preliminary comparison. Capacity remains ground-condition dependent."
      }
    }
  },
  minmetals: {
    label: "Minmetals Helicast",
    defaultSeries: "minmetals-helicast",
    series: {
      "minmetals-helicast": {
        label: "Helicast cast-helix prompt",
        system: "Cast-helix screw pile component",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "CHS selected to suit torque and resistance",
        diameter: "Project-selected",
        wall: "Project-selected",
        steel: "Cast steel helix / supplier shaft specification",
        helixCount: "Multi-turn cast helix option",
        helix: "One-piece cast helix component",
        length: "Project-specific pile length",
        extension: "Supplier/project connection",
        soilRequirement: "Hard-ground and high-torque use requires supplier design confirmation",
        installControl: "Torque capacity, coupler and shaft wall thickness must be checked",
        source: "Minmetals Helicast product note / supplier data required",
        defaultSource: "user",
        capacityBasis: "Product-family prompt only; no row-specific resistance embedded.",
        note: "Use as a component enquiry prompt where cast helices may suit hard soils or higher installation torque."
      }
    }
  },
  surefoot: {
    label: "Surefoot",
    series: {
      "surefoot-s150": {
        label: "Surefoot S150 4W - 25 kN",
        system: "Steel micro-pile footing",
        axialClass: 25,
        compression: 25,
        uplift: 0,
        lateral: 0,
        shaft: "25 NB mini micro piles",
        diameter: "33.7 mm OD",
        wall: "2.6 mm",
        steel: "Galvanised mini pile",
        helixCount: "No screw helix",
        helix: "Micro piles through pile cap",
        length: "Site-specific driven micro piles",
        extension: "Not a conventional screw-pile extension system",
        soilRequirement: "Site-specific soil and footing design required",
        installControl: "Driven micro piles; not torque-selected screw pile",
        source: "Surefoot S150 product page",
        defaultSource: "manufacturer",
        capacityBasis: "Published up-to product load capacity; load direction not separated in this selector.",
        note: "Alternative steel footing system, not a single screw pile. Use Surefoot/project certificate for uplift, shear and moment."
      },
      "surefoot-t150": {
        label: "Surefoot T150 - 35 kN",
        system: "Steel micro-pile footing",
        axialClass: 35,
        compression: 35,
        uplift: 0,
        lateral: 0,
        shaft: "3 x 32 NB micro piles",
        diameter: "42.4 mm OD",
        wall: "Light/medium/heavy pipe by design",
        steel: "Galvanised pipe",
        helixCount: "No screw helix",
        helix: "3 driven micro piles",
        length: "Site-specific driven micro piles",
        extension: "Not a conventional screw-pile extension system",
        soilRequirement: "Penetrable soils; site-specific soil type controls",
        installControl: "Driven micro piles; typical install time about 10 min",
        source: "Surefoot T150 product page",
        defaultSource: "manufacturer",
        capacityBasis: "Published up-to product load capacity; load direction not separated in this selector.",
        note: "Solar/fencing/decking footing option. Confirm uplift/shear/moment with Surefoot certification."
      },
      "surefoot-s250-8p": {
        label: "Surefoot S250 8P - 100 kN",
        system: "Steel micro-pile footing",
        axialClass: 100,
        compression: 100,
        uplift: 0,
        lateral: 0,
        shaft: "4, 6 or 8 x 32 NB micro piles",
        diameter: "42.4 mm OD",
        wall: "Light/medium/heavy pipe by design",
        steel: "Galvanised pipe",
        helixCount: "No screw helix",
        helix: "2/3/4-way driven micro pile directions",
        length: "Site-specific driven micro piles",
        extension: "Multiple sleeve directions in cap",
        soilRequirement: "Soil parameters set micro pile count and direction",
        installControl: "Driven micro piles; use supplier/project certificate",
        source: "Surefoot S250 8P product page",
        defaultSource: "manufacturer",
        capacityBasis: "Published up-to product load capacity; load direction not separated in this selector.",
        note: "Common light pole / camera pole footing option. Bending moment resistance depends on cap, micro-pile layout and soil."
      },
      "surefoot-s400": {
        label: "Surefoot S400 12P - 200 kN",
        system: "Steel micro-pile footing",
        axialClass: 200,
        compression: 200,
        uplift: 0,
        lateral: 0,
        shaft: "8, 10 or 12 micro piles possible",
        diameter: "42.4 mm OD",
        wall: "Light/medium/heavy pipe by design",
        steel: "Galvanised pipe",
        helixCount: "No screw helix",
        helix: "Driven micro pile group",
        length: "Site-specific driven micro piles",
        extension: "Pile count set by engineering team",
        soilRequirement: "Site-specific foundation and soil types",
        installControl: "Driven micro piles; supplier/project certification required",
        source: "Surefoot S400 12P product page",
        defaultSource: "manufacturer",
        capacityBasis: "Published gravity/load capacity; uplift/shear/moment by supplier/project design.",
        note: "Higher-load micro-pile footing used for solar, signs, shade and taller poles. Do not treat it as a single screw pile."
      },
      "surefoot-s600": {
        label: "Surefoot S600 16P - 300 kN",
        system: "Steel micro-pile footing",
        axialClass: 300,
        compression: 300,
        uplift: 0,
        lateral: 0,
        shaft: "16 x 32 NB micro piles",
        diameter: "42.4 mm OD",
        wall: "Light/medium/heavy pipe by design",
        steel: "Galvanised pipe",
        helixCount: "No screw helix",
        helix: "16 driven micro piles",
        length: "Site-specific driven micro piles",
        extension: "Pile cap system; can be combined for higher moments",
        soilRequirement: "Commercial/renewable projects; soil assessment by supplier engineer",
        installControl: "Driven micro piles; typical install time about 40 min",
        source: "Surefoot S600 16P product page",
        defaultSource: "manufacturer",
        capacityBasis: "Published maximum/recommended load capacity; moment cases require supplier design.",
        note: "Largest Surefoot option captured here. Use only with supplier design for high bending moment or lateral demand."
      }
    }
  },
  stopdigging: {
    label: "StopDigging AU",
    series: {
      "sd-sgp-1200": {
        label: "SGP adapter screw 1200",
        system: "Light-duty ground screw",
        axialClass: 12.5,
        compression: 12.5,
        uplift: 6.5,
        lateral: 4.5,
        shaft: "SGP adapter screw",
        diameter: "67 mm OD",
        wall: "Product sheet not stated",
        steel: "Galvanised steel, StopDigging sheet",
        helixCount: "Continuous screw thread",
        helix: "Integral ground-screw body",
        length: "1200 mm",
        extension: "No extension in selected sheet",
        soilRequirement: "Ground conditions and quantity are calculated by installer/supplier",
        installControl: "Installer selection and project confirmation",
        source: "StopDigging SGP product sheet",
        defaultSource: "manufacturer",
        capacityBasis: "Product sheet provides compression, tensile and lateral capacities.",
        note: "Lightweight adapter screw for small structures and solar racks. Not suitable for heavy pole/tower work without supplier design."
      },
      "sd-sgc-1600": {
        label: "SGC adapter screw 1600",
        system: "Ground screw",
        axialClass: 35,
        compression: 35,
        uplift: 21.5,
        lateral: 8.5,
        shaft: "SGC adapter screw",
        diameter: "76 mm OD",
        wall: "Product sheet not stated",
        steel: "Galvanised steel, StopDigging sheet",
        helixCount: "Continuous screw thread",
        helix: "Integral ground-screw body",
        length: "1600 mm",
        extension: "No extension in selected sheet",
        soilRequirement: "Ground conditions and quantity are calculated by installer/supplier",
        installControl: "Installer selection and project confirmation",
        source: "StopDigging SGC product sheet",
        defaultSource: "manufacturer",
        capacityBasis: "Product sheet provides compression, tensile and lateral capacities.",
        note: "Useful for small prefabricated, solar or platform supports where published lateral value is needed."
      },
      "sd-sgc-2500": {
        label: "SGC adapter screw 2500",
        system: "Ground screw",
        axialClass: 55,
        compression: 55,
        uplift: 41.5,
        lateral: 14.5,
        shaft: "SGC adapter screw",
        diameter: "76 mm OD",
        wall: "Product sheet not stated",
        steel: "Galvanised steel, StopDigging sheet",
        helixCount: "Continuous screw thread",
        helix: "Integral ground-screw body",
        length: "2500 mm",
        extension: "No extension in selected sheet",
        soilRequirement: "Ground conditions and quantity are calculated by installer/supplier",
        installControl: "Installer selection and project confirmation",
        source: "StopDigging SGC product sheet",
        defaultSource: "manufacturer",
        capacityBasis: "Product sheet provides compression, tensile and lateral capacities.",
        note: "Highest SGC option captured here. Still a ground screw, not a heavy helical pile."
      },
      "sd-sgn-89-2500": {
        label: "SGN pipe screw 89 x 2500",
        system: "Pipe ground screw",
        axialClass: 55,
        compression: 55,
        uplift: 41.5,
        lateral: 14.5,
        shaft: "SGN pipe screw",
        diameter: "89 mm OD",
        wall: "Product sheet not stated",
        steel: "Galvanised steel, StopDigging sheet",
        helixCount: "Continuous screw thread",
        helix: "Integral ground-screw body",
        length: "2500 mm",
        extension: "No extension in selected sheet",
        soilRequirement: "Ground conditions and quantity are calculated by installer/supplier",
        installControl: "Installer selection and project confirmation",
        source: "StopDigging SGN product sheet",
        defaultSource: "manufacturer",
        capacityBasis: "Product sheet provides compression, tensile and lateral capacities.",
        note: "Pipe screw option for traffic signs, temporary fences and small pipe-supported items."
      }
    }
  },
  groundscrews: {
    label: "Ground Screws Australia",
    series: {
      "gsa-os": {
        label: "OS-Series - poles/signage",
        system: "Australian ground screw family",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "Open section ground screw",
        diameter: "Supplier selection",
        wall: "Supplier selection",
        steel: "C350 steel stated by supplier",
        helixCount: "Ground screw profile",
        helix: "Open section screw",
        length: "Supplier selection",
        extension: "Supplier selection",
        soilRequirement: "Supplier design/certification required",
        installControl: "Supplier/project installation method",
        source: "Ground Screws Australia product range",
        defaultSource: "user",
        capacityBasis: "No public capacity table captured in this selector.",
        note: "Listed as a product-family prompt for poles, masts, signage and fencing. Enter supplier design capacities before comparison."
      },
      "gsa-fca": {
        label: "FCA-Series - solar",
        system: "Australian ground screw family",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "Solar ground screw",
        diameter: "Supplier selection",
        wall: "Supplier selection",
        steel: "C350 steel stated by supplier",
        helixCount: "Ground screw profile",
        helix: "Solar screw product",
        length: "Supplier selection",
        extension: "Supplier selection",
        soilRequirement: "Supplier design/certification required",
        installControl: "Supplier/project installation method",
        source: "Ground Screws Australia product range",
        defaultSource: "user",
        capacityBasis: "No public capacity table captured in this selector.",
        note: "Solar-focused product family. Use supplier resistance and project geotechnical confirmation."
      }
    }
  },
  hpa: {
    label: "Helical Piles Australia",
    series: {
      "hpa-project": {
        label: "HAI helical pile - project design",
        system: "Engineered helical pile system",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "2-3/8 to 7 in shaft families",
        diameter: "Supplier-selected",
        wall: "Supplier-selected",
        steel: "HAI manual / supplier specification",
        helixCount: "Single or multiple helices",
        helix: "8-16 in helical plates in manual families",
        length: "Leads and extensions by design",
        extension: "Supplier-selected extensions",
        soilRequirement: "Geotechnical design and installation torque/load test verification",
        installControl: "Torque correlation plus load testing for critical work",
        source: "Helical Piles Australia / HAI Engineering Manual",
        defaultSource: "geotech",
        capacityBasis: "Manual gives design method and product strength data, not a direct Australian capacity pick.",
        note: "Use as an engineered helical-pile pathway. Enter project-specific compression, uplift and lateral capacities."
      }
    }
  },
  custom: {
    label: "Custom / other",
    series: {
      custom: {
        label: "Custom screw pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 0,
        shaft: "User-entered",
        system: "User-defined system",
        diameter: "User-entered",
        wall: "User-entered",
        steel: "User-entered",
        helixCount: "User-entered",
        helix: "User-entered",
        length: "User-entered",
        extension: "User-entered",
        soilRequirement: "User-entered / project geotechnical report",
        installControl: "User-entered / project specification",
        source: "User-entered source",
        defaultSource: "user",
        capacityBasis: "User-entered resistance values.",
        note: "Use this row for another manufacturer or a project-specific value."
      }
    }
  }
};

const screwSoilRules = {
  unknown: { label: "Unknown / no geotechnical report", severity: 2, note: "Require geotechnical report or proof load test." },
  "controlled-fill": { label: "Controlled fill", severity: 1, note: "Check compaction, founding layer and torque record." },
  "uncontrolled-fill": { label: "Uncontrolled fill", severity: 3, note: "Require geotechnical review or proof load test." },
  "dense-sand": { label: "Dense sand / gravel", severity: 1, note: "Verify refusal and embedment." },
  "loose-sand": { label: "Loose sand", severity: 2, note: "Review settlement, uplift and lateral movement." },
  "stiff-clay": { label: "Stiff clay", severity: 1, note: "Check undrained strength and seasonal movement." },
  "soft-clay": { label: "Soft clay", severity: 3, note: "Resistance and movement may govern. Require geotechnical review." },
  "reactive-clay": { label: "Reactive clay", severity: 2, note: "Check shrink/swell movement and head restraint." },
  "rock-refusal": { label: "Rock / refusal likely", severity: 3, note: "Check installability; consider pre-drill, socket or alternative footing." },
  "saturated-sand": { label: "Saturated sand / liquefaction", severity: 4, note: "Geotechnical review required." },
  "sensitive-clay": { label: "Sensitive clay", severity: 4, note: "Specialist geotechnical review required." }
};

const screwInputIds = [
  "screwManufacturer", "screwSeries", "screwApplication", "screwCompressionCap", "screwUpliftCap", "screwLateralCap",
  "screwCapacitySource", "screwSoil", "screwExposure", "screwInstallEvidence", "screwLateralSensitivity",
  "screwDemandN", "screwDemandVx", "screwDemandVy", "screwDemandMx", "screwDemandMy", "screwDemandTz",
  "screwLayout", "screwPileCount", "screwGroupDimension"
];

const $ = id => document.getElementById(id);
const boltInputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "plateThickness", "plateStrength", "edgeCondition", "edgeDistance", "edgeForceAngle", "holeDiameter", "edgeBoltCount", "interfaces", "slipFactor", "holeFactor", "shearDemand", "tensionDemand"];
const beamCustomInputIds = ["beamCustomDepth", "beamCustomFlangeWidth", "beamCustomWebThickness", "beamCustomFlangeThickness"];
const toolNames = ["bolt", "member", "beam", "weld", "concrete", "screw"];
let boltMode = "standard";
let beamSectionType = "ub";
let memberType = "chs";
const manualInputIds = [
  "boltCount", "threadPlanes", "shankPlanes", "plateThickness", "plateStrength", "edgeDistance", "edgeForceAngle", "holeDiameter", "edgeBoltCount", "interfaces", "slipFactor", "shearDemand", "tensionDemand",
  "weldLength", "weldRuns", "weldEffectiveThroat", "weldParentThickness", "weldDemand",
  "concreteWidth", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc", "concreteNsv", "concreteSv", "concreteFsyf",
  "layer1Y", "layer1Spacing", "layer1Fsy", "layer1Es", "layer2Y", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Y", "layer3Spacing", "layer3Fsy", "layer3Es", "layer4Y", "layer4Spacing", "layer4Fsy", "layer4Es",
  "beamMomentDemand", "beamShearDemand", "beamCustomDepth", "beamCustomFlangeWidth", "beamCustomWebThickness", "beamCustomFlangeThickness",
  "screwCompressionCap", "screwUpliftCap", "screwLateralCap", "screwDemandN", "screwDemandVx", "screwDemandVy", "screwDemandMx", "screwDemandMy", "screwDemandTz", "screwPileCount", "screwGroupDimension",
  "memberLength", "memberCompressionDemand", "memberTensionDemand", "memberHoleCount", "memberHoleDiameter", "memberHoleThickness", "memberNetArea",
  "memberDimChsD", "memberDimChsT", "memberDimEaB", "memberDimEaT", "memberDimPfcD", "memberDimPfcBf", "memberDimPfcTw", "memberDimPfcTf", "memberDimRodD",
  "memberCustomName", "memberCustomArea", "memberCustomRx", "memberCustomRy", "memberCustomKf", "memberCustomAlphaBx", "memberCustomAlphaBy", "memberCustomLex", "memberCustomLey"
];
const referenceInputIds = [
  "boltSize", "category", "shearPlane", "kr", "edgeCondition", "holeFactor",
  "uBoltApplication", "uBoltRodSize", "uBoltFitFilter", "uBoltFinish", "uBoltManufacturer", "uBoltProduct",
  "weldType", "weldSize", "weldCategory", "weldStrength", "weldLapConnection", "weldParentGrade",
  "concreteDirection", "concreteComposite", "concreteSeparatePad", "concreteShearReo", "concreteShearBar",
  "layer1Active", "layer1Auto", "layer1Bar", "layer2Active", "layer2Auto", "layer2Bar", "layer3Active", "layer3Auto", "layer3Bar", "layer4Active", "layer4Auto", "layer4Bar",
  "beamSection", "beamGrade",
  "screwManufacturer", "screwSeries", "screwApplication", "screwCapacitySource", "screwSoil", "screwExposure", "screwInstallEvidence", "screwLateralSensitivity", "screwLayout",
  "memberSection", "memberGrade", "memberFyInput", "memberFuInput", "memberRadiusInput", "memberAlphaB", "memberNetAreaMode", "memberKt", "memberDimensionOverride"
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

function uniqueSorted(list, key) {
  return [...new Set(list.map(item => item[key]))].sort((a, b) => String(a).localeCompare(String(b)));
}

function setUBoltOptions(selectId, values, options = {}) {
  const select = $(selectId);
  const previous = select.value;
  const hadOptions = select.options.length > 0;
  const entries = options.allLabel
    ? [{ value: "", label: options.allLabel }, ...values.map(value => ({ value, label: value }))]
    : values.map(value => ({ value, label: value }));
  select.innerHTML = entries.map(entry => `<option value="${safeText(entry.value)}">${safeText(entry.label)}</option>`).join("");
  if (hadOptions && entries.some(entry => entry.value === previous)) select.value = previous;
  else if (options.preferred && entries.some(entry => entry.value === options.preferred)) select.value = options.preferred;
  else if (entries.length) select.value = entries[0].value;
}

function filteredUBoltProducts(includeManufacturer = true) {
  const application = $("uBoltApplication")?.value;
  const rodSize = $("uBoltRodSize")?.value;
  const fit = $("uBoltFitFilter")?.value;
  const finish = $("uBoltFinish")?.value;
  const manufacturer = $("uBoltManufacturer")?.value;
  return uBoltProducts.filter(product =>
    (!application || product.application === application) &&
    (!rodSize || product.thread === rodSize) &&
    (!fit || product.fitKey === fit) &&
    (!finish || product.finish === finish) &&
    (!includeManufacturer || !manufacturer || product.manufacturer === manufacturer)
  );
}

function selectedUBoltProduct() {
  const selectedId = $("uBoltProduct")?.value;
  const products = filteredUBoltProducts();
  return products.find(product => product.id === selectedId) || products[0] || null;
}

function populateUBoltFilters(initial = false) {
  setUBoltOptions("uBoltApplication", uniqueSorted(uBoltProducts, "application"), {
    preferred: initial ? "Mounting pipe / round member" : ""
  });
  const application = $("uBoltApplication").value;
  const applicationProducts = uBoltProducts.filter(product => product.application === application);
  setUBoltOptions("uBoltRodSize", uniqueSorted(applicationProducts, "thread"), {
    allLabel: "Any rod size",
    preferred: initial ? "M12" : ""
  });
  const rodSize = $("uBoltRodSize").value;
  const rodProducts = applicationProducts.filter(product => !rodSize || product.thread === rodSize);
  setUBoltOptions("uBoltFinish", uniqueSorted(rodProducts, "finish"), {
    allLabel: "Any finish",
    preferred: initial ? "Outdoor HDG" : ""
  });
  const finish = $("uBoltFinish").value;
  const finishProducts = rodProducts.filter(product => !finish || product.finish === finish);
  setUBoltOptions("uBoltFitFilter", uniqueSorted(finishProducts, "fitKey"), { allLabel: "Any fit" });
  const manufacturerProducts = filteredUBoltProducts(false);
  setUBoltOptions("uBoltManufacturer", uniqueSorted(manufacturerProducts, "manufacturer"), {
    allLabel: "All brands / manufacturers",
    preferred: initial ? "Hilti" : ""
  });
  populateUBoltProducts();
}

function populateUBoltProducts() {
  const products = filteredUBoltProducts();
  const select = $("uBoltProduct");
  const previous = select.value;
  const showManufacturer = !$("uBoltManufacturer").value;
  select.innerHTML = products.map(product => {
    const label = showManufacturer ? `${product.manufacturer} - ${product.product}` : product.product;
    return `<option value="${safeText(product.id)}">${safeText(label)}</option>`;
  }).join("");
  if (products.some(product => product.id === previous)) select.value = previous;
}

function publishedCapacityText(product) {
  return product.publishedCapacity || "Not published";
}

function calculateUBolt() {
  const product = selectedUBoltProduct();
  if (!product) return;
  const sourceLink = $("uBoltSourceLink");

  $("uBoltSelectionTitle").textContent = product.product;
  $("uBoltSelectionNote").textContent = `${product.manufacturer} - ${product.series} - ${product.material}`;
  $("uBoltCode").textContent = product.code;
  $("uBoltThread").textContent = product.thread;
  $("uBoltFit").textContent = product.fit;
  $("uBoltMaterial").textContent = product.finish;
  $("uBoltSupplier").textContent = product.supplier || product.manufacturer;
  $("uBoltPublishedCapacity").textContent = publishedCapacityText(product);
  const directionNote = product.capacityDirection && product.capacityDirection !== "Not published"
    ? `${product.capacityDirection}. `
    : "";
  $("uBoltCapacityBasis").textContent = `${directionNote}${product.capacityBasis}`;
  const sourceStatus = $("uBoltSourceStatus");
  sourceStatus.textContent = product.sourceStatus;
  sourceStatus.classList.toggle("is-checked", product.sourceStatus === "Source_Checked");
  sourceLink.textContent = product.sourceName;
  sourceLink.href = product.sourceUrl || "#";
}

function setBoltMode(mode) {
  boltMode = mode === "ubolt" ? "ubolt" : "standard";
  document.querySelectorAll("[data-bolt-mode]").forEach(button => {
    const active = button.dataset.boltMode === boltMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("#boltPanel [data-bolt-mode-panel]").forEach(panel => {
    panel.hidden = panel.dataset.boltModePanel !== boltMode;
  });
  const standardDetails = $("connectionDetails");
  const standardSource = document.querySelector("#boltPanel > details.source-card:not([data-bolt-mode-panel])");
  if (standardDetails) standardDetails.hidden = boltMode !== "standard";
  if (standardSource) standardSource.hidden = boltMode !== "standard";
  if (boltMode === "ubolt") calculateUBolt();
  if (boltMode === "standard") calculateBolt();
}

function initialBoltMode() {
  const params = new URLSearchParams(location.search);
  return params.get("boltmode") === "ubolt" || params.has("ubolt") ? "ubolt" : "standard";
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
    fillet: `${size} mm CFW, category ${category}, f_uw ${fuw} MPa`,
    cpbw: `CPBW, a_w ${effectiveThroat.toFixed(1)} mm, category ${category}, f_uw ${fuw} MPa`,
    ipbw: `IPBW, a_w ${effectiveThroat.toFixed(1)} mm, category ${category}, f_uw ${fuw} MPa`,
    compound: `CPBW a_w ${effectiveThroat.toFixed(1)} mm + ${size} mm fillet, category ${category}, f_uw ${fuw} MPa`
  };

  $("weldCallout").textContent = callouts[type] || callouts.fillet;
  $("weldTypeValue").textContent = typeData.label;
  $("weldThroatValue").textContent = `${fixed2(throat)} mm`;
  $("weldLengthValue").textContent = `${fixed(length)} mm`;
  $("weldRunsValue").textContent = String(runs);
  $("weldPhiValue").textContent = phi.toFixed(2);
  $("weldCapacityLabel").textContent = "Capacity per mm per weld line";
  $("weldCapacityBasis").innerHTML = `${typeData.scope}; ${category}; &phi; = ${phi.toFixed(2)} from AS 4100 Table 3.4`;
  $("weldCapacity").textContent = fixed(capacity);
  $("weldCapacityPerMm").textContent = capacityPerMm.toFixed(2);
  $("parentGoverningPerMm").textContent = parentCheckActive ? fixed2(parentPerMm) : "-";
  $("parentGoverningNote").textContent = !parentCheckActive
    ? "enter ply thickness"
    : parentGoverns
      ? `warning only; parent screen lower, f_up ${parentGrade.fup} MPa`
      : "warning only; weld capacity governs";
  $("parentGoverningNote").className = !parentCheckActive ? "" : parentGoverns ? "fail" : "pass";
  $("weldUtilisation").textContent = !hasDemand ? "\u2014" : Number.isFinite(utilisation) ? utilisation.toFixed(2) : "-";
  $("weldStatus").textContent = !hasDemand ? "No design action" : utilisation <= 1 ? "PASS" : "FAIL";
  $("weldStatus").className = !hasDemand ? "check" : utilisation <= 1 ? "pass" : "fail";
  $("weldFormulaSteps").innerHTML = `
    <div><b>Selected weld</b><code>${typeData.label}: ${typeData.scope}</code></div>
    <div><b>Design throat thickness</b><code>t<sub>t</sub> = ${type === "fillet" ? `0.707 x ${size.toFixed(0)}` : type === "compound" ? `${effectiveThroat.toFixed(1)} + 0.707 x ${size.toFixed(0)}` : effectiveThroat.toFixed(1)} = ${fixed2(throat)} mm</code></div>
    <div><b>Per-mm design capacity</b><code>&phi;R / l<sub>w</sub> = ${phi.toFixed(2)} x 0.6 x ${fuw.toFixed(0)} x ${fixed2(throat)} x k<sub>r</sub> (${kr.toFixed(2)}) / 1000 = ${capacityPerMm.toFixed(2)} kN/mm per weld line</code></div>
    <div><b>Welded-lap reduction</b><code>${lapReductionActive ? `AS 4100 Table 9.6.3.10(B); l<sub>w</sub> = ${fixed(length)} mm = ${(length / 1000).toFixed(2)} m, k<sub>r</sub> = ${kr.toFixed(2)}` : "Not applied. The welded-lap option is No or the weld type is not a fillet weld."}</code></div>
    <div><b>Total weld capacity</b><code>${capacityPerMm.toFixed(2)} kN/mm x ${fixed(length)} mm x ${runs} effective weld line${runs === 1 ? "" : "s"} = ${fixed(capacity)} kN. Effective weld lines are not welding passes.</code></div>
    <div><b>Parent metal screen</b><code>${parentCheckActive ? `0.90 x 0.6 x f<sub>up</sub> (${parentGrade.fup} MPa, ${parentGrade.standard}) x ${fixed2(parentThickness)} / 1000 = ${fixed2(parentPerMm)} kN/mm. Warning only.` : "Not checked. Enter ply thickness if required."}</code></div>
    <div><b>Design boundary</b><code>${callouts[type] || callouts.fillet}. Capacity view only; not a full welded-joint design check. Excludes weld groups, connected-part rupture, HAZ, joint preparation, WPS, inspection, fatigue and effective-length rules beyond the entered l<sub>w</sub>.</code></div>`;
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

function setBeamSummaryCell(id, html, hidden = false) {
  const element = $(id);
  if (!element) return;
  element.innerHTML = html;
  const cell = element.closest("[data-beam-summary-cell]");
  if (cell) cell.hidden = hidden;
}

function updateBeamSummaryDimensions(section) {
  setBeamSummaryCell("beamDimDepth", formatBeamDimension(section.d), !(section.d > 0));
  setBeamSummaryCell("beamDimBf", formatBeamDimension(section.bf), !(section.bf > 0));
  setBeamSummaryCell("beamDimTw", formatBeamDimension(section.tw), !(section.tw > 0));
  setBeamSummaryCell("beamDimTf", formatBeamDimension(section.tf), !(section.tf > 0));
  setBeamSummaryCell("beamDimD1", formatBeamDimension(section.d1), !(section.d1 > 0));
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
  document.querySelectorAll(".beam-type").forEach(button => {
    const active = button.dataset.beamType === type;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  document.querySelectorAll("[data-beam-guide]").forEach(card => {
    card.hidden = card.dataset.beamGuide !== type;
  });
  const custom = type === "custom";
  $("beamSectionField").hidden = custom;
  $("beamCatalogueSectionFields").hidden = custom;
  $("beamCustomFields").hidden = !custom;
  $("beamGradeField").hidden = false;
  $("beamSectionSource").innerHTML = custom
    ? "Symmetric I-section dimensions; properties are generated automatically."
    : "Catalogue section properties from the selected UB/UC row.";
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
    ? "Custom symmetric I-section; derived properties for section check only."
    : "Section moment and web shear only; member checks excluded.";
  $("beamMass").textContent = formatBeamOptional(section.mass, "kg/m", 1);
  $("beamArea").textContent = formatBeamArea(section.area);
  $("beamAw").textContent = formatBeamArea(section.Aw);
  updateBeamSummaryDimensions(section);
  $("beamSummarySx").innerHTML = formatBeamModulus(section.Sx);
  $("beamSummaryZx").innerHTML = formatBeamModulus(section.Zx);
  $("beamFy").textContent = grade.fy > 0 ? `${formatBeamNumber(grade.fy, 0)} MPa` : "-";
  $("beamZex").innerHTML = formatBeamModulus(grade.Ze);
  $("beamSummaryKf").textContent = grade.kf > 0 ? grade.kf.toFixed(3) : "-";
  $("beamCompactness").textContent = compactnessLabel;
  $("beamSectionCapacity").textContent = Number.isFinite(sectionCapacity) ? fixed(sectionCapacity) : "-";
  $("beamShearCapacity").textContent = Number.isFinite(shearCapacity) ? fixed(shearCapacity) : "-";
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

function setMemberSummaryCell(id, html, hidden = false) {
  const element = $(id);
  if (!element) return;
  element.innerHTML = html;
  const cell = element.closest("[data-member-summary-cell]");
  if (cell) cell.hidden = hidden;
}

function hideMemberSummaryDimensions() {
  ["memberDimD", "memberDimDepth", "memberDimB", "memberDimBf", "memberDimT", "memberDimTw", "memberDimTf"].forEach(id => {
    setMemberSummaryCell(id, "—", true);
  });
}

function updateMemberSummaryDimensions(properties) {
  hideMemberSummaryDimensions();
  if (memberType === "chs") {
    setMemberSummaryCell("memberDimD", formatDimension(properties.D));
    setMemberSummaryCell("memberDimT", formatDimension(properties.t));
  }
  if (memberType === "rod") {
    setMemberSummaryCell("memberDimDepth", formatDimension(properties.diameter));
  }
  if (memberType === "ea") {
    setMemberSummaryCell("memberDimB", formatDimension(properties.b, 0));
    setMemberSummaryCell("memberDimT", formatDimension(properties.t));
  }
  if (memberType === "pfc") {
    setMemberSummaryCell("memberDimDepth", formatDimension(properties.d, 0));
    setMemberSummaryCell("memberDimBf", formatDimension(properties.bf, 0));
    setMemberSummaryCell("memberDimTw", formatDimension(properties.tw));
    setMemberSummaryCell("memberDimTf", formatDimension(properties.tf));
  }
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
  if (memberType === "custom") return "custom member input";
  if (memberDimensionOverrideActive()) {
    if (memberType === "chs" || memberType === "rod" || memberType === "pfc") {
      return `selected ${memberType.toUpperCase()} basis`;
    }
    if (memberType === "ea") {
      return `selected Equal Angle basis`;
    }
  }
  return "selected section basis";
}

function memberRadiusBasis(defaultR) {
  if (memberType === "chs") return `r = ${defaultR.toFixed(1)} mm from CHS geometry`;
  if (memberType === "rod") return `r = d/4 = ${defaultR.toFixed(1)} mm`;
  if (memberType === "pfc") return `r = r<sub>min</sub> = ${defaultR.toFixed(1)} mm`;
  if (memberType === "ea") return `r = ${defaultR.toFixed(1)} mm from the Equal Angle table`;
  return `r = ${defaultR.toFixed(1)} mm`;
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
    const sourceText = `${memberType.toUpperCase()} override defines A<sub>g</sub>, r<sub>x</sub> and r<sub>y</sub>${memberType === "ea" || memberType === "pfc" ? " by simplified rectangular geometry" : " by circular geometry"}.`;
    $("memberDimensionStatus").innerHTML = props ? `${sourceText} A<sub>g</sub> = ${formatArea(props.area)}; r<sub>x</sub> = ${props.rx.toFixed(1)} mm; r<sub>y</sub> = ${props.ry.toFixed(1)} mm.` : sourceText;
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
    ? "r entered by axis"
    : properties.customGeometry
      ? `r = ${properties.r.toFixed(1)} mm from ${memberType.toUpperCase()} override`
    : radiusOverridden
      ? `r = ${designR.toFixed(1)} mm; default r = ${properties.r.toFixed(1)} mm`
      : memberRadiusBasis(properties.r);
  if (memberType !== "custom") {
    $("memberRadiusSource").innerHTML = `${properties.customGeometry ? radiusBasis : memberRadiusBasis(properties.r)} Used for slenderness L<sub>e</sub>/r and design member capacity &phi;N<sub>c</sub>.`;
  } else {
    $("memberRadiusSource").innerHTML = `User-defined effective section properties from a verified section-property calculation.`;
  }
  $("memberNetArea").max = properties.area.toFixed(0);
  const netInput = memberNetAreaInput(properties);
  const netArea = netInput.netArea;
  const kt = Math.min(1, value("memberKt"));
  const fy = value("memberFyInput") || grade.fy;
  const fu = value("memberFuInput") || grade.fu;
  const strengthBasis = fy === grade.fy && fu === grade.fu
    ? `f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa; grade ${gradeName}`
    : `f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa; ${gradeName} default ${grade.fy}/${grade.fu} MPa`;
  const ktGuidance = kt >= 0.999
    ? "AS 4100 Cl. 7.3.1"
    : "AS 4100 Table 7.3.2";
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
  const compressionDemand = value("memberCompressionDemand");
  const tensionDemand = value("memberTensionDemand");
  const hasCompressionDemand = compressionDemand > 0;
  const hasTensionDemand = tensionDemand > 0;
  const hasMemberDemand = hasCompressionDemand || hasTensionDemand;
  const compressionDemandRatio = memberCompression > 0 ? compressionDemand / memberCompression : Infinity;
  const tensionDemandRatio = tensionCapacity > 0 ? tensionDemand / tensionCapacity : Infinity;
  const governingDemandRatio = Math.max(hasCompressionDemand ? compressionDemandRatio : 0, hasTensionDemand ? tensionDemandRatio : 0);
  const demandChecks = [];
  if (hasCompressionDemand) {
    demandChecks.push(Number.isFinite(compressionDemandRatio)
      ? `Compression action check: N<sub>c</sub><sup>*</sup> / &phi;N<sub>c</sub> = ${fixed(compressionDemand)} / ${fixed(memberCompression)} = ${compressionDemandRatio.toFixed(2)}`
      : "Compression design capacity is not positive");
  }
  if (hasTensionDemand) {
    demandChecks.push(Number.isFinite(tensionDemandRatio)
      ? `Tension action check: N<sub>t</sub><sup>*</sup> / &phi;N<sub>t</sub> = ${fixed(tensionDemand)} / ${fixed(tensionCapacity)} = ${tensionDemandRatio.toFixed(2)}`
      : "Tension design capacity is not positive");
  }
  const demandStep = hasMemberDemand
    ? `${demandChecks.join("; ")}; governing utilisation ratio = ${Number.isFinite(governingDemandRatio) ? governingDemandRatio.toFixed(2) : "not applicable"}`
    : "No compression or tension design action specified.";

  $("memberDesignation").textContent = memberType === "custom"
    ? $("memberCustomName").value || section.designation
    : `${properties.customGeometry ? properties.designation : section.designation} - ${gradeName}`;
  $("memberAssumption").innerHTML = memberType === "chs"
    ? `&alpha;<sub>b</sub> = -0.5; ${radiusBasis}`
    : memberType === "ea"
      ? `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)}; ${radiusBasis}`
      : memberType === "pfc"
        ? `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)}; ${radiusBasis}`
        : memberType === "custom"
          ? `A<sub>g</sub>, r<sub>x</sub>, r<sub>y</sub>, k<sub>f</sub>, &alpha;<sub>b</sub> and L<sub>e</sub> entered by axis.`
          : `&alpha;<sub>b</sub> = ${alphaB.toFixed(1)}; ${radiusBasis}`;
  $("memberArea").textContent = formatArea(properties.area);
  updateMemberSummaryDimensions(properties);
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
  $("memberGoverning").textContent = governingAxis.alphaC < 0.999 ? (memberType === "custom" ? `${governingAxis.title} buckling controls` : "Member buckling controls") : "Section capacity controls";
  $("memberUtilisation").textContent = hasMemberDemand && Number.isFinite(governingDemandRatio) ? governingDemandRatio.toFixed(2) : "\u2014";
  const memberUtilisationStatus = $("memberUtilisationStatus");
  memberUtilisationStatus.textContent = hasMemberDemand ? (governingDemandRatio <= 1 ? "PASS" : "FAIL") : "No design action";
  memberUtilisationStatus.className = hasMemberDemand ? (governingDemandRatio <= 1 ? "pass" : "fail") : "check";
  const netAreaWarning = value("memberNetArea") > properties.area + 0.5 ? " Net area has been limited to gross area." : "";
  const customGeometryKfWarning = properties.customGeometry && memberType === "ea"
    ? " Verify k<sub>f</sub> for slender custom angle geometry."
    : "";
  const autoNetAreaText = netInput.mode === "auto"
    ? `A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t = ${properties.area.toFixed(0)} - ${netInput.holeCount} &times; ${fixed(netInput.holeDiameter)} &times; ${fixed(netInput.deductionThickness)} = ${netArea.toFixed(0)} mm².`
    : memberType === "chs" || memberType === "rod"
      ? `A<sub>n</sub> = A<sub>g</sub> = ${netArea.toFixed(0)} mm².`
      : `Manual A<sub>n</sub> = ${netArea.toFixed(0)} mm².`;
  const manualReason = memberType === "pfc"
    ? ` PFC default t = t<sub>w</sub> = ${fixed(properties.tw || section.tw || 0)} mm; use verified t for the net path.`
    : "";
  $("memberNetAreaSource").innerHTML = `${autoNetAreaText}${manualReason} Use manual A<sub>n</sub> for non-straight net paths.`;
  $("memberWarning").innerHTML = memberType === "chs"
    ? `Scope: centroidal axial compression and axial tension only. CHS basis: k<sub>f</sub> = ${kf.toFixed(3)}, &alpha;<sub>b</sub> = -0.5.${netAreaWarning}`
    : memberType === "ea"
      ? `Scope: centroidal axial compression and axial tension only. Angle basis: k<sub>f</sub> = ${kf.toFixed(3)}, &alpha;<sub>b</sub> = ${alphaB.toFixed(1)}.${netAreaWarning}${customGeometryKfWarning}`
      : memberType === "pfc"
        ? `Scope: centroidal axial compression and axial tension only. PFC basis: r = r<sub>min</sub>, k<sub>f</sub> = ${kf.toFixed(3)}, &alpha;<sub>b</sub> = ${alphaB.toFixed(1)}.${netAreaWarning}`
        : memberType === "custom"
          ? `Scope: centroidal axial compression and axial tension using entered effective properties.${netAreaWarning}`
          : `Scope: centroidal axial compression and axial tension only. Rod basis: k<sub>f</sub> = ${kf.toFixed(3)}, &alpha;<sub>b</sub> = ${alphaB.toFixed(1)}.${netAreaWarning}`;
  const sectionDataText = memberType === "custom"
    ? `A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; A<sub>n</sub> = ${compressionArea.toFixed(0)} mm²; r<sub>x</sub> = ${properties.rx.toFixed(1)} mm; r<sub>y</sub> = ${properties.ry.toFixed(1)} mm; I<sub>x</sub> = ${formatInertia(properties.ix)}; I<sub>y</sub> = ${formatInertia(properties.iy)}; f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa`
    : `${properties.customGeometry ? "Geometry override" : "Catalogue basis"}; ${memberDimensionLabel(properties)}; A<sub>g</sub> = ${properties.area.toFixed(0)} mm²; A<sub>n</sub> = ${compressionArea.toFixed(0)} mm²; r<sub>x</sub> = ${properties.rx.toFixed(1)} mm; r<sub>y</sub> = ${properties.ry.toFixed(1)} mm; I<sub>x</sub> = ${formatInertia(properties.ix)}; I<sub>y</sub> = ${formatInertia(properties.iy)}; r = ${designR.toFixed(1)} mm${radiusOverridden ? `; default r = ${properties.r.toFixed(1)} mm` : ""}; f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa`;
  const compressionSteps = memberType === "custom"
    ? `<div><b>Compression axes - AS 4100 Cl. 6.3</b><code>${axisResults.map(axis => `${axis.label}: L<sub>e</sub>/r = ${axis.leOverR.toFixed(1)}; &lambda;<sub>n</sub> = ${axis.lambdaN.toFixed(1)}; &alpha;<sub>b</sub> = ${axis.alphaB.toFixed(1)}; &alpha;<sub>c</sub> = ${axis.alphaC.toFixed(3)}; &phi;N<sub>c,${axis.label}</sub> = ${fixed(axis.memberCompression)} kN`).join("; ")}; governing axis = ${governingAxis.title}</code></div>`
    : `<div><b>Slenderness - AS 4100 Cl. 6.3.3</b><code>L<sub>e</sub>/r = ${fixed(axisResults[0].effectiveLength / 1000)} m / ${axisResults[0].r.toFixed(1)} mm = ${axisResults[0].leOverR.toFixed(1)}; &lambda;<sub>n</sub> = (L<sub>e</sub>/r)&radic;k<sub>f</sub>&radic;(f<sub>y</sub>/250) = ${axisResults[0].lambdaN.toFixed(1)}</code></div>
    <div><b>Modified slenderness - AS 4100 Cl. 6.3.3</b><code>&lambda; = &lambda;<sub>n</sub> + &alpha;<sub>a</sub>&alpha;<sub>b</sub> = ${axisResults[0].modifiedLambda.toFixed(1)}; &alpha;<sub>a</sub> = ${axisResults[0].alphaA.toFixed(2)}</code></div>
    <div><b>Compression reduction factor - AS 4100 Cl. 6.3.3</b><code>&eta; = 0.00326(&lambda; - 13.5) = ${axisResults[0].eta.toFixed(3)}; &xi; = ${axisResults[0].xi.toFixed(3)}; &alpha;<sub>c</sub> = ${axisResults[0].alphaC.toFixed(3)}</code></div>`;
  $("memberFormulaSteps").innerHTML = `
    <div><b>Design basis</b><code>${strengthBasis}; ${radiusBasis}; k<sub>f</sub> = ${kf.toFixed(3)} (${kfBasis}); &alpha;<sub>b</sub> = ${memberType === "custom" ? `${axisResults.map(axis => `${axis.label} ${axis.alphaB.toFixed(1)}`).join(" / ")}` : alphaB.toFixed(1)} (${alphaBBasis}); k<sub>t</sub> = ${kt.toFixed(2)} (${ktGuidance})</code></div>
    <div><b>Section properties</b><code>${sectionDataText}</code></div>
    <div><b>Net area - AS 4100 Cl. 6.2 and AS 4100 Cl. 7.2</b><code>${netInput.mode === "auto" ? `A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t = ${properties.area.toFixed(0)} - ${netInput.holeCount} &times; ${fixed(netInput.holeDiameter)} &times; ${fixed(netInput.deductionThickness)} = ${netArea.toFixed(0)} mm²` : memberType === "chs" || memberType === "rod" ? `A<sub>n</sub> = A<sub>g</sub> = ${netArea.toFixed(0)} mm²` : `A<sub>n</sub> = ${netArea.toFixed(0)} mm²`}</code></div>
    <div><b>Gross-section yielding - AS 4100 Cl. 7.2</b><code>&phi;A<sub>g</sub>f<sub>y</sub> = 0.90 &times; ${properties.area.toFixed(0)} &times; ${fy} / 1000 = ${fixed(grossYield)} kN</code></div>
    <div><b>Net-section fracture - AS 4100 Cl. 7.2</b><code>&phi;(0.85k<sub>t</sub>A<sub>n</sub>f<sub>u</sub>) = 0.90 &times; 0.85 &times; ${kt.toFixed(2)} &times; ${netArea.toFixed(0)} &times; ${fu} / 1000 = ${fixed(netFracture)} kN</code></div>
    <div><b>Design tension capacity - AS 4100 Cl. 7.1</b><code>&phi;N<sub>t</sub> = min(${fixed(grossYield)}, ${fixed(netFracture)}) = ${fixed(tensionCapacity)} kN</code></div>
    ${compressionSteps}
    <div><b>Design section compression capacity - AS 4100 Cl. 6.2</b><code>&phi;N<sub>s</sub> = 0.90k<sub>f</sub>A<sub>n</sub>f<sub>y</sub> = 0.90 &times; ${kf.toFixed(3)} &times; ${compressionArea.toFixed(0)} &times; ${fy} / 1000 = ${fixed(sectionCompression)} kN</code></div>
    <div><b>Design member compression capacity - AS 4100 Cl. 6.3</b><code>&phi;N<sub>c</sub> = ${memberType === "custom" ? `min(&phi;N<sub>c,x</sub>, &phi;N<sub>c,y</sub>) = ${fixed(memberCompression)} kN` : `&alpha;<sub>c</sub>&phi;N<sub>s</sub> = ${governingAxis.alphaC.toFixed(3)} &times; ${fixed(sectionCompression)} = ${fixed(memberCompression)} kN`}</code></div>
    <div><b>Design action utilisation</b><code>${demandStep}</code></div>`;
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

  const compressionFaceLabel = direction === "top" ? "top face in compression" : "bottom face in compression";
  const checkedSectionLabel = combinedSection ? "Combined section" : separatePad === "bottom" ? "Bottom pad only" : "Top pad only";
  $("concreteSummaryTitle").textContent = combinedSection
    ? `${checkedSectionLabel}; b = ${fixed(data.width)} mm; D = D_top + D_bot = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm; ${compressionFaceLabel}`
    : `${checkedSectionLabel}; b = ${fixed(data.width)} mm; D = ${fixed(data.depth)} mm; ${compressionFaceLabel}`;
  $("concreteSummaryNote").textContent = combinedSection
    ? "Capacity applies to the combined strip only; use only where composite action and interface shear transfer are separately verified."
    : `Capacity applies to the ${separatePad === "bottom" ? "bottom" : "top"} pad strip only; the other pad is excluded from this section-capacity calculation.`;
  $("concreteModeValue").textContent = combinedSection ? "Combined" : separatePad === "bottom" ? "Separate bottom" : "Separate top";
  $("concreteWidthValue").textContent = `${fixed(data.width)} mm`;
  $("concreteDepthValue").textContent = `${fixed(data.depth)} mm`;
  const legacyLayers = data.layers.filter(layer => layer.legacy);
  const fsyCappedLayers = data.layers.filter(layer => layer.fsyInput > 600);
  $("concretePhiNote").textContent = legacyLayers.length
    ? "Legacy Y bar selected: conservative capacity factor phi = 0.65 is used pending bar-grade verification."
    : "Capacity factor from the AS 3600 Table 2.2.2 pure-bending k_uo expression for N-class reinforcement.";

  if (!result.ok) {
    ["concreteDvValue", "concretePhiMuo", "concretePhiVu"].forEach(id => $(id).textContent = "-");
    $("concreteResultScope").textContent = "selected strip";
    $("concreteShearNote").innerHTML = "RC one-way shear not calculated without active reinforcement";
    $("concreteStatusValue").textContent = "Review";
    $("concreteSectionState").innerHTML = "";
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
  const warningText = `Section-capacity check only; verify punching shear, bearing, anchorage, crack control, interface shear and design actions separately. Review: ${reviewFlags.join("; ")}.`;

  $("concreteResultScope").textContent = combinedSection ? "combined section" : `${separatePad === "bottom" ? "bottom" : "top"} pad only`;
  $("concreteDvValue").textContent = `${fixed(shear.dv)} mm`;
  $("concretePhiMuo").textContent = fixed(result.phiMuo);
  $("concretePhiVu").textContent = fixed(shear.phiVu);
  $("concreteShearNote").innerHTML = `V<sub>uc</sub> = ${fixed(shear.vuc)} kN; V<sub>us</sub> = ${fixed(shear.vus)} kN; d<sub>v</sub> = ${fixed(shear.dv)} mm`;
  const shearWarning = (shear.hasShearReo && !shear.minShearReoProvided) || shear.webCrushingLimited;
  const sectionSolved = residualOk && !coverWarnings.length && !bottomMatWithoutDepth && !legacyLayers.length && !fsyCappedLayers.length && !shearWarning && result.kuo <= 0.36;
  $("concreteStatusValue").textContent = sectionSolved ? "OK" : "Review";
  $("concreteWarningText").textContent = warningText;

  $("concreteSectionState").innerHTML = `
    <article><b>Flexural section state</b><span>Neutral axis depth x = ${fixed(result.x)} mm from the selected compression face; d<sub>o</sub> = ${fixed(result.d0)} mm; k<sub>uo</sub> = ${result.kuo.toFixed(3)}; M<sub>uo</sub> = ${fixed(result.muo)} kNm</span><small>C<sub>c</sub> = ${fixed(result.cc / 1000)} kN; &phi; = ${result.phi.toFixed(2)}; &phi;M<sub>uo</sub> = ${fixed(result.phiMuo)} kNm; axial-force equilibrium residual = ${residual.toFixed(3)} kN</small></article>
    <article><b>One-way shear state</b><span>d<sub>v</sub> = ${fixed(shear.dv)} mm; b<sub>v</sub> = ${fixed(shear.bv)} mm; k<sub>v</sub> = ${shear.kv.toFixed(3)}; V<sub>uc</sub> = ${fixed(shear.vuc)} kN; V<sub>us</sub> = ${fixed(shear.vus)} kN</span><small>V<sub>u</sub> = ${fixed(shear.vu)} kN; V<sub>u.max</sub> = ${fixed(shear.vuMax)} kN; &phi; = ${shear.phi.toFixed(2)}; &phi;V<sub>u</sub> = ${fixed(shear.phiVu)} kN</small></article>`;

  $("concreteLayerResults").innerHTML = result.layers.map(layer => {
    const status = Math.abs(layer.strain) < 0.00005 ? "near neutral axis" : layer.force > 0 ? "compression" : "tension";
    const coverStatus = layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2 ? "nominal cover review required" : "within nominal cover reference";
    const displacementNote = layer.displacedConcreteStress > 0 ? `; net stress = ${signedFixed(layer.netStress, 1)} MPa after displaced concrete` : "";
    return `<article><b>Mat ${layer.index} - ${layer.name}</b><span>${layer.designation} @ ${fixed(layer.spacing)} mm; ${status}; y<sub>${layer.index}</sub> = ${fixed(layer.yTop)} mm; A<sub>s${layer.index}</sub> = ${fixed(layer.area)} mm2 per strip (${fixed(layer.areaPerMetre)} mm2/m); ${coverStatus}</span><small>&epsilon;<sub>s${layer.index}</sub> = ${signedFixed(layer.strain, 5)}; f<sub>s${layer.index}</sub> = ${signedFixed(layer.stress, 1)} MPa${displacementNote}; F<sub>s${layer.index}</sub> = ${signedFixed(layer.force / 1000, 1)} kN</small></article>`;
  }).join("");

  $("concreteFormulaSteps").innerHTML = `
    <div><b>Analysis basis</b><code>${direction === "top" ? "top face" : "bottom face"} selected as the compression face; each reinforcement mat is transformed to distance d<sub>i</sub> from that face. ${data.combinedSection ? `Combined section: D = D<sub>top</sub> + D<sub>bot</sub> = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm; active top and bottom pad mats may participate` : `Separate pads: calculating the ${data.checkedPad === "bottom" ? "bottom" : "top"} pad only; D = ${fixed(data.depth)} mm; only that pad's active mats participate`}</code></div>
    <div><b>Reinforcement area</b><code>A<sub>si</sub> = A<sub>bar,table</sub> x b / spacing. A<sub>bar,table</sub> uses standard nominal Australian bar areas N/Y12-36 rather than &pi;d<sup>2</sup>/4; for b = 1000 mm this is the usual mm2/m table value. N bars default to f<sub>sy</sub> = 500 MPa; legacy Y bars default to f<sub>sy</sub> = 410 MPa unless manually overwritten; design-model f<sub>sy</sub> is capped at 600 MPa</code></div>
    <div><b>Stress block</b><code>&alpha;<sub>2</sub> = max(0.85 - 0.0015f'<sub>c</sub>, 0.67) = ${data.alpha2.toFixed(3)}; &gamma; = max(0.97 - 0.0025f'<sub>c</sub>, 0.67) = ${data.gamma.toFixed(3)}</code></div>
    <div><b>Equivalent concrete stress block</b><code>a = min(D, &gamma;x) = min(${fixed(data.depth)}, ${data.gamma.toFixed(3)} x ${fixed(result.x)}) = ${fixed(result.blockDepth)} mm; C<sub>c</sub> = &alpha;<sub>2</sub> f'<sub>c</sub>ba = ${fixed(result.cc / 1000)} kN</code></div>
    <div><b>Steel strain</b><code>&epsilon;<sub>si</sub> = &epsilon;<sub>cu</sub>(x - d<sub>i</sub>) / x; compression positive, tension negative</code></div>
    <div><b>Steel stress</b><code>f<sub>si</sub> = E<sub>s</sub>&epsilon;<sub>si</sub>, capped at +/- f<sub>sy</sub>; for a bar inside the rectangular concrete block, F<sub>si</sub> = A<sub>si</sub>(f<sub>si</sub> - &alpha;<sub>2</sub>f'<sub>c</sub>) to avoid double-counting displaced concrete</code></div>
    <div><b>Neutral-axis equilibrium</b><code>C<sub>c</sub> + &Sigma;F<sub>s</sub> = ${residual.toFixed(3)} kN residual for N<sup>*</sup> = 0</code></div>
    <div><b>Nominal flexural capacity</b><code>M<sub>uo</sub> = internal force couple = ${fixed(result.muo)} kNm for the selected strip width b</code></div>
    <div><b>Capacity factor - AS 3600 Table 2.2.2</b><code>${legacyLayers.length ? `Legacy Y bar selected: conservative quick-screen &phi; = 0.65 unless actual bar grade and N-class equivalence are verified` : `Pure-bending N-class reinforcement assumption: k<sub>uo</sub> = x / d<sub>o</sub> = ${fixed(result.x)} / ${fixed(result.d0)} = ${result.kuo.toFixed(3)}; &phi; = clamp(1.24 - 13k<sub>uo</sub>/12, 0.65, 0.85)`} = ${result.phi.toFixed(2)}</code></div>
    <div><b>Ductility limit</b><code>${result.kuo > 0.36 ? `k<sub>uo</sub> = ${result.kuo.toFixed(3)} > 0.36; AS 3600 Cl. 8.1.5 conditions must be satisfied before using this as a design section` : `k<sub>uo</sub> = ${result.kuo.toFixed(3)} <= 0.36`}</code></div>
    <div><b>Design flexural capacity</b><code>&phi;M<sub>uo</sub> = ${result.phi.toFixed(2)} x ${fixed(result.muo)} = ${fixed(result.phiMuo)} kNm; verify AS 3600 Table 2.2.2 and ductility class before issue for design</code></div>
    <div><b>Shear effective depth - AS 3600 Cl. 8.2.1.9</b><code>d is the distance from the compression face to the centroid of longitudinal tension reinforcement in the tensile half-depth. ${shear.dBasis}; ${shear.centroidArea > 0 ? `d = &Sigma;(A<sub>s</sub>d) / &Sigma;A<sub>s</sub> = ${fixed(shear.dNumerator)} / ${fixed(shear.centroidArea)} = ${fixed(shear.d)} mm` : `d = ${fixed(shear.d)} mm`}</code></div>
    <div><b>Effective web width and shear depth - AS 3600 Cl. 8.2.1.5 and 8.2.1.9</b><code>b<sub>v</sub> = b = ${fixed(shear.bv)} mm for this rectangular strip without ducts or voids; d<sub>v</sub> = max(0.72D, 0.9d) = max(0.72 x ${fixed(data.depth)}, 0.9 x ${fixed(shear.d)}) = max(${fixed(0.72 * data.depth)}, ${fixed(0.9 * shear.d)}) = ${fixed(shear.dv)} mm</code></div>
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

function selectedScrewCatalogue() {
  return screwPileCatalogues[$("screwManufacturer").value] || screwPileCatalogues.katana;
}

function selectedScrewPile() {
  const catalogue = selectedScrewCatalogue();
  return catalogue.series[$("screwSeries").value] || Object.values(catalogue.series)[0];
}

function screwCatalogueRows() {
  return Object.entries(screwPileCatalogues).flatMap(([manufacturerKey, catalogue]) =>
    Object.entries(catalogue.series).map(([seriesKey, pile]) => ({
      manufacturerKey,
      seriesKey,
      manufacturer: catalogue.label,
      pile
    }))
  );
}

function screwSystemType(pile) {
  const system = `${pile.system || ""} ${pile.helixCount || ""} ${pile.helix || ""}`;
  if (/micro[- ]pile|driven micro/i.test(system)) return "Micro-pile footing";
  if (/ground screw|continuous screw thread|open section screw|solar screw/i.test(system)) return "Ground screw";
  if (/engineered|project[- ]design|project design|HAI/i.test(system)) return "Engineered pathway";
  if (/modular|manufactured screw pier/i.test(system)) return "Manufactured screw pier";
  if (/conventional|helical|screw pile/i.test(system)) return "Helical screw pile";
  return "Supplier system";
}

function screwSourceConfidence(manufacturerKey, pile) {
  if (manufacturerKey === "custom") {
    return { level: "User-entered", detail: "No traceability until supplied", className: "source-user" };
  }
  if (manufacturerKey === "katana") {
    return { level: "Certificate context", detail: "Local CodeMark source", className: "source-local" };
  }
  if (manufacturerKey === "stopdigging") {
    return { level: "Product sheet", detail: "Directional values captured", className: "source-official" };
  }
  if (manufacturerKey === "surefoot") {
    return { level: "Product page", detail: "Project certificate controls", className: "source-official" };
  }
  if (manufacturerKey === "ideal") {
    return { level: "Guide row", detail: "Direction values by project design", className: "source-prompt" };
  }
  if (manufacturerKey === "blade") {
    return { level: "Official web prompt", detail: "Public range; local pack not present", className: "source-prompt" };
  }
  if (manufacturerKey === "piletech") {
    return { level: "Project-design prompt", detail: "Public range; resistance by design", className: "source-prompt" };
  }
  if (manufacturerKey === "driven") {
    return { level: "Product dimension row", detail: "Geometry only; capacity not stated", className: "source-prompt" };
  }
  if (manufacturerKey === "keller") {
    return { level: "Technique benchmark", detail: "Typical SWL; ground conditions govern", className: "source-prompt" };
  }
  if (manufacturerKey === "minmetals") {
    return { level: "Component prompt", detail: "Supplier design required", className: "source-prompt" };
  }
  return { level: "Supplier prompt", detail: "Capacity row not embedded", className: "source-prompt" };
}

function screwPrimaryLimitation(pile) {
  const type = screwSystemType(pile);
  if (type === "Micro-pile footing") {
    return "Cap, pile count and certificate govern.";
  }
  if (type === "Ground screw") {
    return "Confirm structural class, embedment and head movement.";
  }
  if (type === "Engineered pathway") {
    return "Enter project design resistances.";
  }
  if ((pile.compression || 0) <= 0 && (pile.uplift || 0) <= 0) {
    return "Certified Rc/Rt required.";
  }
  if ((pile.uplift || 0) <= 0) {
    return "Certified Rt required.";
  }
  if ((pile.compression || 0) <= 0) {
    return "Certified Rc required.";
  }
  if ((pile.lateral || 0) <= 0) {
    return "Rv required for lateral/moment use.";
  }
  return "Confirm site and installation acceptance.";
}

function screwSiteAdvice(pile, lateralCap) {
  const soilKey = $("screwSoil").value;
  const soil = screwSoilRules[soilKey] || screwSoilRules.unknown;
  const exposure = $("screwExposure").value;
  const install = $("screwInstallEvidence").value;
  const application = $("screwApplication").value;
  const lateralSensitivity = $("screwLateralSensitivity").value;
  const type = screwSystemType(pile);
  const lateralImportant = ["monopole", "tower", "sign", "anchor"].includes(application) || lateralSensitivity !== "normal";

  if (["saturated-sand", "sensitive-clay"].includes(soilKey)) {
    return `${soil.label}: geotechnical design required.`;
  }
  if (exposure === "very-severe") {
    return "Very severe exposure: durability design required.";
  }
  if (soilKey === "rock-refusal") {
    return "Refusal risk: verify installability.";
  }
  if (["uncontrolled-fill", "soft-clay"].includes(soilKey)) {
    return `${soil.label}: geotechnical review or proof load test.`;
  }
  if (lateralImportant && lateralCap <= 0) {
    return "Lateral action: provide graph, design or test value.";
  }
  if (type === "Ground screw") {
    return "Ground screw: verify class, embedment and movement.";
  }
  if (type === "Micro-pile footing") {
    return "Micro-pile footing: supplier certificate governs.";
  }
  if (install === "none") {
    return `${soil.label}: require torque/depth record or proof load test.`;
  }
  return `${soil.label}: verify resistance and installation record.`;
}

function screwResistanceFieldsText(pile) {
  const axial = pile.axialClass > 0 ? `Class ${screwCapacityText(pile.axialClass)} kN` : "Class -";
  const compression = pile.compression > 0 ? `Rc ${screwCapacityText(pile.compression)} kN` : "Rc -";
  const uplift = pile.uplift > 0 ? `Rt ${screwCapacityText(pile.uplift)} kN` : "Rt -";
  const lateral = pile.lateral > 0 ? `Rv ${screwCapacityText(pile.lateral)} kN` : "Rv -";
  return `${axial}; ${compression}; ${uplift}; ${lateral}`;
}

function screwGeometryText(pile) {
  const helix = screwSelectedText(pile.helixCount) === "-" ? screwSelectedText(pile.helix) : `${screwSelectedText(pile.helixCount)}; ${screwSelectedText(pile.helix)}`;
  return `${screwSelectedText(pile.shaft)}; ${helix}; ${screwSelectedText(pile.length)}`;
}

function selectScrewCatalogueRow(manufacturerKey, seriesKey) {
  if (!screwPileCatalogues[manufacturerKey]?.series?.[seriesKey]) return;
  $("screwManufacturer").value = manufacturerKey;
  populateScrewSeries();
  $("screwSeries").value = seriesKey;
  setScrewCapacityDefaults();
}

function updateScrewCatalogueMatrix() {
  const body = $("screwCatalogueRows");
  if (!body) return;
  const selectedManufacturer = $("screwManufacturer").value;
  const selectedSeries = $("screwSeries").value;
  const rows = screwCatalogueRows();
  const withDirectional = rows.filter(row => row.pile.compression > 0 && row.pile.uplift > 0 && row.pile.lateral > 0).length;
  const supplierCount = new Set(rows.map(row => row.manufacturerKey)).size;
  $("screwMarketSummary").innerHTML = [
    `${rows.length} catalogue rows`,
    `${withDirectional} with Rc/Rt/Rv fields`,
    `${supplierCount} suppliers / systems`,
    "Select a row to update the card"
  ].map(item => `<span>${safeText(item)}</span>`).join("");
  body.innerHTML = rows.map(row => {
    const pile = row.pile;
    const confidence = screwSourceConfidence(row.manufacturerKey, pile);
    const active = row.manufacturerKey === selectedManufacturer && row.seriesKey === selectedSeries;
    return `
      <tr class="${active ? "is-selected" : ""}">
        <td><b>${safeText(pile.label)}</b><small>${safeText(row.manufacturer)}</small><span class="screw-source-pill ${confidence.className}">${safeText(confidence.level)}</span></td>
        <td>${safeText(screwSystemType(pile))}</td>
        <td>${safeText(screwGeometryText(pile))}</td>
        <td>${safeText(screwResistanceFieldsText(pile))}</td>
        <td>${safeText(screwPrimaryLimitation(pile))}</td>
        <td><button type="button" class="mini-action" data-screw-select data-manufacturer="${safeText(row.manufacturerKey)}" data-series="${safeText(row.seriesKey)}">${active ? "Selected" : "Select"}</button></td>
      </tr>
    `;
  }).join("");
}

function populateScrewSeries() {
  const catalogue = selectedScrewCatalogue();
  const previous = $("screwSeries").value;
  const entries = Object.entries(catalogue.series);
  $("screwSeries").innerHTML = entries.map(([key, item]) => `<option value="${key}">${item.label}</option>`).join("");
  const fallback = catalogue.defaultSeries && entries.some(([key]) => key === catalogue.defaultSeries) ? catalogue.defaultSeries : entries[0][0];
  $("screwSeries").value = entries.some(([key]) => key === previous) ? previous : fallback;
  setScrewCapacityDefaults();
}

function setScrewCapacityDefaults() {
  const pile = selectedScrewPile();
  $("screwCompressionCap").value = pile.compression || "";
  $("screwUpliftCap").value = pile.uplift || "";
  $("screwLateralCap").value = pile.lateral || "";
  $("screwCapacitySource").value = pile.defaultSource || (pile.axialClass ? "series" : "user");
  calculateScrew();
}

function screwCapacityText(number) {
  return Number.isFinite(number) && number > 0 ? fixed(number) : "-";
}

function screwSelectedText(text) {
  const value = String(text ?? "").trim();
  return value || "-";
}

function screwCapacityDriverText(value, missingLabel) {
  return value > 0 ? `${screwCapacityText(value)} kN stated` : missingLabel;
}

function setOptionalText(id, text) {
  const element = $(id);
  if (element) element.textContent = screwSelectedText(text);
}

function screwSketchText(text, maxLength = 34) {
  const value = screwSelectedText(text);
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}...` : value;
}

function screwMetricNumbers(text) {
  const raw = String(text ?? "");
  const fractionValues = [];
  const withoutFractions = raw.replace(/(\d+)-(\d+)\/(\d+)/g, (_, whole, numerator, denominator) => {
    const value = Number(whole) + Number(numerator) / Number(denominator);
    if (Number.isFinite(value)) fractionValues.push(value);
    return " ";
  });
  const decimalValues = [...withoutFractions.matchAll(/\d+(?:\.\d+)?/g)].map(match => Number(match[0])).filter(Number.isFinite);
  const inchBased = /\bin\b|inch|["]/i.test(raw) && !/mm/i.test(raw);
  return fractionValues.concat(decimalValues).map(number => inchBased ? number * 25.4 : number);
}

function screwFirstMetric(text, fallback) {
  const numbers = screwMetricNumbers(text);
  return numbers.length ? numbers[0] : fallback;
}

function screwLargestMetric(text, fallback, minimum = 0) {
  const numbers = screwMetricNumbers(text).filter(number => number >= minimum);
  return numbers.length ? Math.max(...numbers) : fallback;
}

function screwSketchDimensions(pile) {
  const systemText = `${pile.system || ""} ${pile.helixCount || ""} ${pile.helix || ""}`;
  const microPile = /micro[- ]pile|driven micro/i.test(systemText);
  const continuousThread = /ground screw|continuous screw thread|integral ground-screw|open section screw|solar screw/i.test(systemText);
  const noHelix = /no screw helix/i.test(systemText);
  const countMatch = String(pile.helixCount || pile.helix || "").match(/(\d+)\s*(?:helices|helix|no\.|No\.)/i);
  const variableMulti = /multiple|multi|project-selected|single or multi|single or multiple/i.test(systemText);
  const helixCount = noHelix || microPile || continuousThread ? 0 : countMatch ? Math.max(1, Math.min(4, Number(countMatch[1]))) : variableMulti ? 2 : 1;
  const shaftOd = screwFirstMetric(`${pile.diameter || ""} ${pile.shaft || ""}`, 76);
  const wall = screwFirstMetric(pile.wall || "", NaN);
  const helixDiameter = screwLargestMetric(pile.helix || "", continuousThread ? Math.max(shaftOd * 1.6, 140) : 250, 80);
  const helixThickness = screwLargestMetric((String(pile.helix || "").match(/x\s*(\d+(?:\.\d+)?)\s*mm/i) || [])[1], NaN);
  return { microPile, continuousThread, noHelix, helixCount, shaftOd, wall, helixDiameter, helixThickness };
}

function screwSvgText(x, y, text, className = "screw-sketch-value", anchor = "start") {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${safeText(text)}</text>`;
}

function screwSvgTextBlock(x, y, text, maxChars = 36, className = "screw-sketch-value") {
  const words = String(text ?? "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach(word => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return `<text x="${x}" y="${y}" class="${className}">${lines.slice(0, 3).map((item, index) => `<tspan x="${x}" dy="${index ? 14 : 0}">${safeText(item)}</tspan>`).join("")}</text>`;
}

function screwSvgDefs() {
  return `
    <defs>
      <pattern id="screwSoilHatch" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(28)">
        <line x1="0" y1="0" x2="0" y2="14" />
      </pattern>
      <marker id="screwArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 Z" />
      </marker>
      <marker id="screwDimArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,4 L8,0 L8,8 Z" fill="#6b8278" />
      </marker>
      <marker id="screwLeaderArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L8,4 L0,8 Z" fill="#6b8278" />
      </marker>
    </defs>
  `;
}

function screwHelixSvg(cx, cy, halfWidth, index) {
  const ry = Math.max(9, Math.min(16, halfWidth * 0.19));
  const left = cx - halfWidth;
  const right = cx + halfWidth;
  return `
    <g class="screw-helix-group" data-helix="${index}">
      <path class="screw-helix-plate" d="M${left} ${cy} C${left + halfWidth * 0.28} ${cy - ry} ${right - halfWidth * 0.28} ${cy - ry} ${right} ${cy} C${right - halfWidth * 0.28} ${cy + ry} ${left + halfWidth * 0.28} ${cy + ry} ${left} ${cy} Z" />
      <path class="screw-helix-hidden" d="M${left} ${cy} C${left + halfWidth * 0.28} ${cy - ry} ${right - halfWidth * 0.28} ${cy - ry} ${right} ${cy}" />
      <path class="screw-helix-rib" d="M${left} ${cy} C${left + halfWidth * 0.28} ${cy + ry} ${right - halfWidth * 0.28} ${cy + ry} ${right} ${cy}" />
    </g>
  `;
}

function screwManualHelixSvg(cx, cy, halfWidth, index) {
  const ry = Math.max(8, Math.min(15, halfWidth * 0.17));
  const left = cx - halfWidth;
  const right = cx + halfWidth;
  return `
    <g class="screw-helix-group" data-helix="${index}">
      <path class="screw-helix-hidden" d="M${left} ${cy} C${left + halfWidth * 0.32} ${cy - ry} ${right - halfWidth * 0.32} ${cy - ry} ${right} ${cy}" />
      <path class="screw-helix-plate" d="M${left} ${cy} C${left + halfWidth * 0.30} ${cy + ry} ${right - halfWidth * 0.30} ${cy + ry} ${right} ${cy} C${right - halfWidth * 0.30} ${cy - ry} ${left + halfWidth * 0.30} ${cy - ry} ${left} ${cy} Z" />
      <line class="screw-helix-rib" x1="${left + 8}" y1="${cy + ry * 0.2}" x2="${right - 8}" y2="${cy - ry * 0.2}" />
    </g>
  `;
}

function screwCompactFact(text, maxLength = 96) {
  let valueText = screwSelectedText(text)
    .replace(/series range noted/gi, "series")
    .replace(/Example guide correlation:/gi, "Guide torque:")
    .replace(/ for \d+ kN in stiff\/dense soils/gi, "")
    .replace(/Use SWL vs torque table and project acceptance/gi, "Use torque table + acceptance")
    .replace(/Install to specified pressure\/torque; record Nm for every pier/gi, "Record pressure/torque per pier")
    .replace(/Project installation pressure\/torque and certification required/gi, "Project torque + certificate")
    .replace(/Driven micro piles; supplier\/project certification required/gi, "Supplier/project certificate")
    .replace(/Driven micro piles; not torque-selected screw pile/gi, "Driven piles; no torque selection")
    .replace(/Installer selection and project confirmation/gi, "Installer/project confirmation")
    .replace(/Geotechnical strength controls/gi, "Geotech strength controls")
    .replace(/project-specific/gi, "project-specific")
    .replace(/\s+/g, " ")
    .trim();
  if (valueText.length <= maxLength) return valueText;
  const shortened = valueText.slice(0, maxLength - 3).replace(/[ ,;:.]+[^ ,;:.]*$/, "");
  return `${shortened}...`;
}

function screwCapacityCoverage(compressionCap, upliftCap, lateralCap) {
  const directions = [
    { key: "Rc", value: compressionCap },
    { key: "Rt", value: upliftCap }
  ];
  const adopted = directions.filter(item => item.value > 0).map(item => item.key);
  const missing = directions.filter(item => item.value <= 0).map(item => item.key);
  const lateralMissing = lateralCap <= 0;
  return {
    adopted,
    missing,
    lateralMissing,
    title: `Rc/Rt ${adopted.length} of 2`,
    note: missing.length
      ? `Missing ${missing.join(", ")}. Request certified compression/tension values.`
      : lateralMissing
        ? "Axial values available; lateral Rv still required for lateral or moment use."
        : "Rc, Rt and Rv are available from the selected source."
  };
}

function screwNextEvidence(pile, compressionCap, upliftCap, lateralCap) {
  const capacitySource = $("screwCapacitySource").value;
  const coverage = screwCapacityCoverage(compressionCap, upliftCap, lateralCap);
  const install = $("screwInstallEvidence").value;
  const lateralSensitive = $("screwLateralSensitivity").value !== "normal" || ["monopole", "tower", "sign", "anchor"].includes($("screwApplication").value);
  if (coverage.missing.length) {
    return {
      title: `Request ${coverage.missing.join("/")}`,
      note: "Ask supplier for certified compression/tension resistance and design basis."
    };
  }
  if (capacitySource === "user") {
    return {
      title: "Provide source values",
      note: "Use supplier, geotechnical or load-test values before issuing a selection."
    };
  }
  if (install === "none") {
    return {
      title: "Installation record",
      note: "Require torque, depth, termination and as-built evidence."
    };
  }
  if (lateralSensitive) {
    return {
      title: lateralCap > 0 ? "Movement check" : "Request Rv",
      note: lateralCap > 0 ? "Confirm head fixity, displacement limit and lateral model." : "Ask supplier for lateral resistance, head fixity and movement limits."
    };
  }
  if (/project|supplier|user/i.test(`${pile.diameter} ${pile.wall} ${pile.helix}`)) {
    return {
      title: "Supplier detail",
      note: "Confirm exact shaft, helix, connection and certificate."
    };
  }
  return {
    title: "Project certificate",
    note: "Confirm AS 2159 design, durability and installation acceptance."
  };
}

function setScrewResistanceOutput(outputId, unitId, basisId, valueNumber, adoptedText, missingText) {
  const output = $(outputId);
  const unit = $(unitId);
  const basis = $(basisId);
  if (valueNumber > 0) {
    output.textContent = screwCapacityText(valueNumber);
    if (unit) unit.textContent = " kN";
    if (basis) basis.textContent = adoptedText;
  } else {
    output.textContent = "Not stated";
    if (unit) unit.textContent = "";
    if (basis) basis.textContent = missingText;
  }
}

function updateScrewSketch(pile, compressionCap, upliftCap, lateralCap) {
  const sketch = $("screwPileSketch");
  const dims = screwSketchDimensions(pile);
  const confidence = screwSourceConfidence($("screwManufacturer").value, pile);
  const system = screwSelectedText(pile.system || "Screw pile");
  const shaftText = screwSelectedText(pile.shaft);
  const helixText = dims.noHelix ? screwSelectedText(pile.helix || "No screw helix") : `${screwSelectedText(pile.helixCount)}; ${screwSelectedText(pile.helix)}`;
  const shaftFact = `${screwSelectedText(pile.diameter || shaftText)} / wall ${screwSelectedText(pile.wall)}`;
  setOptionalText("screwFactSystem", system);
  setOptionalText("screwFactShaft", shaftFact);
  setOptionalText("screwFactHelix", helixText);
  setOptionalText("screwFactLength", screwCompactFact(pile.length || "Project-specific", 72));
  setOptionalText("screwFactExtension", screwCompactFact(pile.extension || "Project-specific connection", 80));
  setOptionalText("screwFactSteel", screwCompactFact(pile.steel || "Supplier/project specification", 92));
  setOptionalText("screwFactInstall", screwCompactFact(pile.installControl || "Project-specific", 92));
  setOptionalText("screwFactSource", pile.source || "Project source");
  setOptionalText("screwFactSourceStatus", confidence.level);
  setOptionalText("screwFactCapacityBasis", screwCompactFact(pile.capacityBasis || "Adopt certified resistance before action checks.", 110));
  setOptionalText("screwFactSiteAdvice", screwSiteAdvice(pile, lateralCap));
  setOptionalText("screwFactLimitation", screwPrimaryLimitation(pile));
  const coverage = screwCapacityCoverage(compressionCap, upliftCap, lateralCap);
  const nextEvidence = screwNextEvidence(pile, compressionCap, upliftCap, lateralCap);
  setOptionalText("screwReadinessType", screwSystemType(pile));
  setOptionalText("screwReadinessTypeNote", system);
  setOptionalText("screwReadinessData", confidence.level);
  setOptionalText("screwReadinessDataNote", confidence.detail);
  setOptionalText("screwReadinessCoverage", coverage.title);
  setOptionalText("screwReadinessCoverageNote", coverage.note);
  setOptionalText("screwReadinessEvidence", nextEvidence.title);
  setOptionalText("screwReadinessEvidenceNote", nextEvidence.note);
  if (!sketch) return;

  const compactSketch = (sketch.clientWidth > 0 && sketch.clientWidth < 360) || window.innerWidth < 540;

  const viewWidth = compactSketch ? 360 : 600;
  const cx = compactSketch ? 168 : 230;
  const headY = 60;
  const shaftTopY = 105;
  const bottomY = 286;
  const lengthDimX = compactSketch ? 324 : 430;
  const shaftWidth = Math.max(16, Math.min(34, dims.shaftOd / 76.1 * 22));
  const shaftHalf = shaftWidth / 2;
  const helixHalf = Math.max(34, Math.min(compactSketch ? 78 : 104, shaftWidth * dims.helixDiameter / Math.max(dims.shaftOd, 1) / 2));
  const shaftLeft = cx - shaftHalf;
  const shaftRight = cx + shaftHalf;
  const helixLabel = Number.isFinite(dims.helixDiameter) ? `helix dia ${Math.round(dims.helixDiameter)} mm` : "helix dia by supplier";
  const shaftCallout = screwSketchText(`shaft ${shaftText}`, compactSketch ? 28 : 42);
  const helixCallout = dims.noHelix
    ? screwSketchText(pile.helix || "no screw helix", compactSketch ? 28 : 42)
    : compactSketch
      ? screwSketchText(`${screwSelectedText(pile.helix)}`, 26)
      : screwSketchText(`${helixText}`, 46);
  const lengthLabel = screwSketchText(
    String(pile.length || "project-specific")
      .replace(/\s*series range noted/i, "")
      .replace(/;\s*.*$/, ""),
    compactSketch ? 22 : 28
  );
  const helixYs = dims.helixCount <= 1 ? [238] : Array.from({ length: dims.helixCount }, (_, index) => 198 + index * Math.min(36, 74 / Math.max(dims.helixCount - 1, 1)));
  const helixDimY = 318;
  const helixDimRy = Math.max(9, Math.min(16, helixHalf * 0.19));
  const helixDimStartY = helixYs[helixYs.length - 1] + helixDimRy;
  const shaftCalloutX = compactSketch ? 224 : 350;
  const shaftCalloutY = shaftTopY + 30;
  const helixCalloutX = compactSketch ? 28 : 46;
  const helixCalloutY = helixYs[0] - 18;
  const helixSvg = helixYs.map((y, index) => screwManualHelixSvg(cx, y, helixHalf, index + 1)).join("");
  const continuousThreadSvg = Array.from({ length: 9 }, (_, index) => {
    const y = 126 + index * 16;
    return `
      <line class="screw-thread-line" x1="${cx - shaftHalf - 18}" y1="${y + 16}" x2="${cx + shaftHalf + 18}" y2="${y - 8}" />
      <line class="screw-thread-line" x1="${cx - shaftHalf - 13}" y1="${y + 20}" x2="${cx + shaftHalf + 13}" y2="${y - 4}" />
    `;
  }).join("");
  const microPileSvg = `
    <rect class="screw-head-plate" x="${cx - 56}" y="${shaftTopY - 6}" width="112" height="26" rx="2" />
    <circle class="screw-bolt-hole" cx="${cx - 34}" cy="${shaftTopY + 7}" r="3" />
    <circle class="screw-bolt-hole" cx="${cx}" cy="${shaftTopY + 7}" r="3" />
    <circle class="screw-bolt-hole" cx="${cx + 34}" cy="${shaftTopY + 7}" r="3" />
    <line class="screw-shaft-line" x1="${cx - 44}" y1="${shaftTopY + 22}" x2="${cx - 84}" y2="${bottomY}" />
    <line class="screw-shaft-line" x1="${cx - 16}" y1="${shaftTopY + 22}" x2="${cx - 30}" y2="${bottomY}" />
    <line class="screw-shaft-line" x1="${cx + 16}" y1="${shaftTopY + 22}" x2="${cx + 30}" y2="${bottomY}" />
    <line class="screw-shaft-line" x1="${cx + 44}" y1="${shaftTopY + 22}" x2="${cx + 84}" y2="${bottomY}" />
    <line class="screw-shaft-centre" x1="${cx}" y1="${shaftTopY - 16}" x2="${cx}" y2="${bottomY + 8}" />
    <line class="screw-leader" x1="${compactSketch ? 222 : 350}" y1="${shaftTopY + 5}" x2="${cx + 56}" y2="${shaftTopY + 7}" />
    ${screwSvgText(compactSketch ? 226 : 358, shaftTopY + 8, "pile cap / sleeve", "screw-sketch-label")}
    <line class="screw-leader" x1="${compactSketch ? 30 : 54}" y1="${bottomY - 18}" x2="${cx - 30}" y2="${bottomY - 2}" />
    ${screwSvgTextBlock(compactSketch ? 30 : 54, bottomY - 22, "driven micro-piles; no screw helix", compactSketch ? 24 : 34, "screw-sketch-label")}
  `;
  const conventionalSvg = `
    <rect class="screw-head-plate" x="${cx - 46}" y="${headY}" width="92" height="12" rx="2" />
    <rect class="screw-drive-head" x="${cx - 28}" y="${headY + 17}" width="56" height="28" rx="2" />
    <circle class="screw-bolt-hole" cx="${cx - 15}" cy="${headY + 31}" r="3" />
    <circle class="screw-bolt-hole" cx="${cx + 15}" cy="${headY + 31}" r="3" />
    <rect class="screw-drive-head" x="${cx - shaftHalf - 8}" y="${shaftTopY - 2}" width="${shaftWidth + 16}" height="34" rx="2" />
    <circle class="screw-bolt-hole" cx="${cx - shaftHalf - 1}" cy="${shaftTopY + 15}" r="2.7" />
    <circle class="screw-bolt-hole" cx="${cx + shaftHalf + 1}" cy="${shaftTopY + 15}" r="2.7" />
    <rect class="screw-shaft" x="${shaftLeft}" y="${shaftTopY + 28}" width="${shaftWidth}" height="${bottomY - shaftTopY - 28}" rx="4" />
    <line class="screw-shaft-centre" x1="${cx}" y1="${headY}" x2="${cx}" y2="${bottomY + 8}" />
    <path class="screw-shaft-break" d="M${shaftLeft - 7} 158 L${shaftLeft + 7} 146 M${shaftRight - 7} 158 L${shaftRight + 7} 146" />
    ${dims.continuousThread ? continuousThreadSvg : helixSvg}
    <line class="screw-leader" x1="${shaftCalloutX - 8}" y1="${shaftCalloutY - 4}" x2="${shaftRight}" y2="${shaftTopY + 18}" />
    ${screwSvgText(shaftCalloutX, shaftCalloutY, shaftCallout, "screw-sketch-label")}
    <line class="screw-leader" x1="${helixCalloutX + (compactSketch ? 90 : 150)}" y1="${helixCalloutY - 2}" x2="${dims.continuousThread ? cx - shaftHalf - 13 : cx - helixHalf}" y2="${dims.continuousThread ? 180 : helixYs[0]}" />
    ${screwSvgTextBlock(helixCalloutX, helixCalloutY, helixCallout, compactSketch ? 24 : 34, "screw-sketch-label")}
    ${!dims.continuousThread ? `
      <line class="screw-leader" x1="${compactSketch ? 226 : 360}" y1="${headY + 32}" x2="${cx + 28}" y2="${headY + 31}" />
      ${screwSvgText(compactSketch ? 230 : 368, headY + 35, "head / coupler by series", "screw-sketch-label")}
    ` : ""}
    ${dims.continuousThread ? "" : `
      <line class="screw-extension-line" x1="${cx - helixHalf}" y1="${helixDimStartY}" x2="${cx - helixHalf}" y2="${helixDimY - 6}" />
      <line class="screw-extension-line" x1="${cx + helixHalf}" y1="${helixDimStartY}" x2="${cx + helixHalf}" y2="${helixDimY - 6}" />
      <line class="screw-dim-line" x1="${cx - helixHalf}" y1="${helixDimY}" x2="${cx + helixHalf}" y2="${helixDimY}" />
      ${screwSvgText(cx, helixDimY + 17, helixLabel, "screw-sketch-label", "middle")}
    `}
  `;
  const embedmentLabelSvg = compactSketch
    ? screwSvgText(lengthDimX - 7, 190, dims.microPile ? "pile length" : "lead length", "screw-sketch-label", "end")
    : screwSvgTextBlock(lengthDimX + 11, 174, `${dims.microPile ? "pile length" : "lead length"} ${lengthLabel}`, 24, "screw-sketch-label");

  sketch.setAttribute("viewBox", compactSketch ? "0 0 360 360" : "0 0 600 360");
  sketch.innerHTML = `
    <title id="screwSketchTitle">Selected screw pile schematic</title>
    <desc id="screwSketchDesc">Product-manual style schematic showing the selected system head, shaft, coupler, helix or ground-screw body and key dimensions.</desc>
    ${screwSvgDefs()}
    <rect class="screw-sketch-bg" x="0" y="0" width="${viewWidth}" height="360" rx="12" />
    <rect class="screw-cad-frame" x="14" y="14" width="${viewWidth - 28}" height="322" rx="4" />
    ${screwSvgText(28, 38, dims.microPile ? "Product system detail" : dims.continuousThread ? "Ground screw product detail" : "Screw pile product detail", "screw-sketch-title")}
    ${screwSvgText(viewWidth - 28, 38, "manual-style schematic; NTS", "screw-sketch-note", "end")}
    ${dims.microPile ? microPileSvg : conventionalSvg}
    <line class="screw-extension-line" x1="${shaftRight + 5}" y1="${shaftTopY}" x2="${lengthDimX - 7}" y2="${shaftTopY}" />
    <line class="screw-extension-line" x1="${shaftRight + 5}" y1="${bottomY}" x2="${lengthDimX - 7}" y2="${bottomY}" />
    <line class="screw-depth-line" x1="${lengthDimX}" y1="${shaftTopY}" x2="${lengthDimX}" y2="${bottomY}" />
    ${embedmentLabelSvg}
  `;
  sketch.classList.toggle("no-helix", dims.noHelix || dims.microPile);
}

function screwTorsionDriver(pile) {
  const shaft = pile.shaft || "";
  const system = pile.system || "";
  if (/76\.1 x 4\.0/i.test(shaft)) {
    return "Local Katana torsion paper covers the 76.1 x 4.0 CHS family. Check final installation torque against supplier limit and shaft torsional strength before relying on torque correlation.";
  }
  if (/88\.9 x 5\.5/i.test(shaft)) {
    return "Local Katana torsion paper covers the 88.9 x 5.5 CHS family. Check final installation torque against supplier limit and shaft torsional strength before relying on torque correlation.";
  }
  if (/micro-pile/i.test(system)) {
    return "This system is driven rather than torque-selected. Use the supplier certificate, driven pile record and pile-cap layout for acceptance.";
  }
  if (/ground screw/i.test(system)) {
    return "Use installer/supplier torque, refusal and ground-condition verification. Published small ground-screw values still need project acceptance criteria.";
  }
  return "No local torsion test row is captured for this shaft. Use the supplier structural torsion check and project installation specification.";
}

function screwLateralDriver(pile, lateralCap) {
  const label = pile.label || "";
  const source = pile.source || "";
  if (/Katana/i.test(source) && /(80|150) kN/i.test(label)) {
    return "Local lateral graphs cover selected Katana 80 kN / 150 kN clay and sand cases. Key inputs are shaft OD/wall, base diameter, clay cu or sand phi, fixed/free head, minimum embedment and accepted displacement.";
  }
  if (/micro-pile/i.test(pile.system || "")) {
    return "Lateral and moment resistance comes from the cap, micro-pile count/direction, pile stiffness and soil reaction. Use the supplier/project certificate rather than a single-pile axial class.";
  }
  if (/ground screw/i.test(pile.system || "")) {
    return lateralCap > 0
      ? "A product-sheet lateral value is entered, but head movement, embedment, soil condition and connection rigidity still control suitability."
      : "Add a supplier lateral value or test. Ground-screw axial values do not define lateral or moment acceptance.";
  }
  return "Needs a lateral graph, geotechnical model or test. Important inputs are head fixity, pile-head height/eccentricity, shaft stiffness, soil stiffness/strength, embedment and acceptable deflection.";
}

function updateScrewDrivers(pile, compressionCap, upliftCap, lateralCap) {
  const driverNotes = $("screwDriverNotes");
  if (!driverNotes) return;
  const soil = screwSoilRules[$("screwSoil").value] || screwSoilRules.unknown;
  const capacitySource = $("screwCapacitySource").selectedOptions?.[0]?.textContent || "Capacity basis";
  const exposure = $("screwExposure").selectedOptions?.[0]?.textContent || "Exposure";
  const installation = $("screwInstallEvidence").selectedOptions?.[0]?.textContent || "Installation evidence";
  const helixDescription = `${screwSelectedText(pile.helixCount)}; ${screwSelectedText(pile.helix)}`;
  const shaftDescription = `${screwSelectedText(pile.shaft)}; wall ${screwSelectedText(pile.wall)}`;
  const cards = [
    {
      title: "Design actions / SLS limits",
      value: "N*, V*, M*, Tz* + movement limits",
      text: "Use ULS and SLS action effects from the supported-structure analysis. Include construction tolerance eccentricity, pile-head fixity and relevant ground-movement actions such as negative friction, swelling/heave or lateral ground movement."
    },
    {
      title: "Axial compression",
      value: screwCapacityDriverText(compressionCap, "resistance missing"),
      text: `Driven by shaft, base and/or helix resistance, effective overburden, groundwater, soil strength and settlement. Selected geometry: ${shaftDescription}; ${helixDescription}; depth ${screwSelectedText(pile.length)}.`
    },
    {
      title: "Uplift / tension",
      value: screwCapacityDriverText(upliftCap, "tension resistance missing"),
      text: `Check shaft friction and helix uplift below the active movement zone. Cyclic/repeated loading, sand disturbance and tubular shaft effects can reduce tensile resistance. Basis: ${capacitySource}.`
    },
    {
      title: "Lateral / moment",
      value: screwCapacityDriverText(lateralCap, "graph/test value missing"),
      text: screwLateralDriver(pile, lateralCap)
    },
    {
      title: "Installation proof",
      value: installation,
      text: `${screwSelectedText(pile.installControl)} ${screwTorsionDriver(pile)} If required torque or resistance is not achieved, use static proof/load testing, deeper installation or redesign. High-strain dynamic testing of screw piles should not be the sole basis unless correlated with static load testing for the site and pile geometry.`
    },
    {
      title: "Soil model",
      value: soil.label,
      text: `The AS 1726 geotechnical model should identify soil and rock units, founding layer, fill status, cu for clays, phi/density for sands, unit weight, groundwater level/chemistry, rock/refusal risk and problematic soils such as liquefiable, sensitive, expansive, organic or acid sulfate materials.`
    },
    {
      title: "Durability / group SLS",
      value: exposure,
      text: `AS 2159 durability checks depend on pH, chlorides, sulfates, resistivity, groundwater, coating/galvanizing, wall loss and design life. Group spacing, cap stiffness, settlement, lateral displacement, rotation and differential movement remain project SLS checks.`
    }
  ];
  driverNotes.innerHTML = cards.map(card => `
    <article>
      <b>${safeText(card.title)}</b>
      <strong>${safeText(card.value)}</strong>
      <span>${safeText(card.text)}</span>
    </article>
  `).join("");
}

function setStatusClass(element, className) {
  element.classList.remove("pass", "check", "fail");
  if (className) element.classList.add(className);
}

function screwLayoutCoordinates() {
  const layout = $("screwLayout").value;
  const dimension = Math.max(value("screwGroupDimension"), 0.1);
  let coordinates = [];
  if (layout === "two-x") {
    coordinates = [{ x: -dimension / 2, y: 0 }, { x: dimension / 2, y: 0 }];
  } else if (layout === "two-y") {
    coordinates = [{ x: 0, y: -dimension / 2 }, { x: 0, y: dimension / 2 }];
  } else if (layout === "three") {
    const radius = dimension / Math.sqrt(3);
    coordinates = [90, 210, 330].map(angle => {
      const radians = angle * Math.PI / 180;
      return { x: radius * Math.cos(radians), y: radius * Math.sin(radians) };
    });
  } else if (layout === "four") {
    const half = dimension / 2;
    coordinates = [
      { x: -half, y: -half },
      { x: half, y: -half },
      { x: half, y: half },
      { x: -half, y: half }
    ];
  } else {
    const count = Math.max(2, Math.min(24, Math.round(value("screwPileCount") || 4)));
    const radius = dimension / 2;
    coordinates = Array.from({ length: count }, (_, index) => {
      const radians = (90 + index * 360 / count) * Math.PI / 180;
      return { x: radius * Math.cos(radians), y: radius * Math.sin(radians) };
    });
  }
  return coordinates.map((point, index) => ({ id: index + 1, ...point }));
}

function updateScrewLayoutControls() {
  const layout = $("screwLayout").value;
  const fixedCounts = { "two-x": 2, "two-y": 2, three: 3, four: 4 };
  if (fixedCounts[layout]) {
    $("screwPileCount").value = fixedCounts[layout];
    $("screwPileCount").disabled = true;
  } else {
    $("screwPileCount").disabled = false;
    if (value("screwPileCount") < 2) $("screwPileCount").value = 4;
  }
}

function screwRiskNotes(pile, compressionCap, upliftCap, lateralCap) {
  const notes = [];
  let severity = 0;
  const soilKey = $("screwSoil").value;
  const soil = screwSoilRules[soilKey] || screwSoilRules.unknown;
  severity += soil.severity;

  const exposure = $("screwExposure").value;
  const groundNotes = [`${soil.label}: ${soil.note}`];
  if (exposure === "aggressive") {
    severity += 2;
    groundNotes.push("Aggressive soil: verify AS 2159 durability design.");
  } else if (exposure === "coastal") {
    severity += 2;
    groundNotes.push("Coastal exposure: check protection and sacrificial thickness.");
  } else if (exposure === "very-severe") {
    severity += 4;
    groundNotes.push("Very severe exposure: catalogue selection is not sufficient.");
  } else {
    groundNotes.push("Normal exposure selected; confirm project durability class.");
  }
  notes.push({ title: "Ground / durability", text: groundNotes.join(" ") });

  const systemType = screwSystemType(pile);
  const capacitySource = $("screwCapacitySource").value;
  const missingResistance = [];
  if (compressionCap <= 0) missingResistance.push("Rc");
  if (upliftCap <= 0) missingResistance.push("Rt");
  if (lateralCap <= 0) missingResistance.push("Rv");
  const resistanceNotes = [];
  if (capacitySource === "series") {
    severity += 1;
    resistanceNotes.push("Series or class value only; confirm direction-specific Rc, Rt and Rv.");
  } else if (capacitySource === "user") {
    severity += 2;
    resistanceNotes.push("No published row value; use supplier, geotechnical or test value before issue.");
  } else if (capacitySource === "manufacturer") {
    resistanceNotes.push("Manufacturer value; use only within stated soil, installation and certificate limits.");
  } else if (capacitySource === "geotech") {
    resistanceNotes.push("Project geotechnical value; keep calculation basis and design assumptions.");
  } else if (capacitySource === "test") {
    resistanceNotes.push("Load-test value; keep test method, load level, criteria and settlement record.");
  }
  if (missingResistance.length) {
    severity += 1;
    resistanceNotes.push(`Missing ${missingResistance.join(", ")}; action check is incomplete.`);
  }
  if (/Micro-pile footing|Ground screw|Engineered pathway/i.test(systemType) || pile.axialClass <= 0) {
    severity += 1;
    resistanceNotes.push(`${systemType}: supplier/project certificate governs.`);
  }
  notes.push({ title: "Capacity evidence", text: resistanceNotes.join(" ") || "Rc, Rt and Rv are available for preliminary comparison." });

  const install = $("screwInstallEvidence").value;
  const installationNotes = [];
  if (install === "none") {
    severity += 1;
    installationNotes.push("No record: require torque/depth/as-built record or proof load test.");
  } else if (install === "torque") {
    severity += 1;
    installationNotes.push("Torque record: check final torque, depth, termination layer and acceptance criteria.");
  } else if (install === "test") {
    installationNotes.push("Load test: keep test load, criteria, hold period and movement record.");
  } else {
    installationNotes.push("Complete record selected; retain torque/depth, as-built location and test evidence.");
  }
  if (/2 helices|multiple|multi/i.test(pile.helixCount || "")) {
    installationNotes.push("Multiple helices: check spacing, torque and interaction.");
  } else if (/No screw helix/i.test(pile.helixCount || "")) {
    installationNotes.push("No screw helix: supplier system certificate governs.");
  }
  installationNotes.push(screwCompactFact(pile.installControl || "Use project installation acceptance criteria.", 90));
  notes.push({ title: "Installation", text: installationNotes.join(" ") });

  const application = $("screwApplication").value;
  const lateralSensitivity = $("screwLateralSensitivity").value;
  const lateralImportant = ["monopole", "tower", "sign", "anchor"].includes(application) || lateralSensitivity !== "normal";
  const lateralNotes = [];
  if (lateralImportant && lateralCap <= 0) {
    severity += 2;
    lateralNotes.push("Lateral or moment use selected; provide Rv and movement/head-fixity check.");
  } else if (lateralSensitivity === "critical") {
    severity += 2;
    lateralNotes.push("Displacement critical: check movement limit and head fixity.");
  } else if (lateralSensitivity === "significant") {
    severity += 1;
    lateralNotes.push("Lateral review: confirm load path, head fixity and movement criterion.");
  } else {
    lateralNotes.push("No special lateral flag selected; still check head connection if shear or moment is present.");
  }
  if (/pole|tower|sign|anchor/i.test($("screwApplication").selectedOptions?.[0]?.textContent || "")) {
    lateralNotes.push("Application usually requires lateral and rotation checks beyond axial screening.");
  }
  notes.push({ title: "Lateral / movement", text: lateralNotes.join(" ") });
  return { severity, notes };
}

function updateScrewRisk(pile, compressionCap, upliftCap, lateralCap) {
  const { severity, notes } = screwRiskNotes(pile, compressionCap, upliftCap, lateralCap);
  let level = "Low review";
  let status = "Preliminary candidate";
  let className = "pass";
  if (severity > 6) {
    level = "High risk";
    status = "Project design required";
    className = "fail";
  } else if (severity > 4) {
    level = "High review";
    status = "Geotechnical / supplier review";
    className = "fail";
  } else if (severity > 2) {
    level = "Review required";
    status = "Preliminary candidate";
    className = "check";
  }
  $("screwRiskLevel").textContent = level;
  $("screwRiskStatus").textContent = status;
  setStatusClass($("screwRiskStatus"), className);
  $("screwRiskNotes").innerHTML = notes.slice(0, 4).map(note => `<article><b>${note.title}</b><span>${note.text}</span></article>`).join("");
}

function calculateScrewDemand(compressionCap, upliftCap, lateralCap) {
  updateScrewLayoutControls();
  const coords = screwLayoutCoordinates();
  const n = coords.length;
  const baseN = signedValue("screwDemandN");
  const vx = signedValue("screwDemandVx");
  const vy = signedValue("screwDemandVy");
  const mx = signedValue("screwDemandMx");
  const my = signedValue("screwDemandMy");
  const tz = signedValue("screwDemandTz");
  const directShear = n > 0 ? Math.hypot(vx, vy) / n : 0;
  const sumX2 = coords.reduce((sum, point) => sum + point.x ** 2, 0);
  const sumY2 = coords.reduce((sum, point) => sum + point.y ** 2, 0);
  const sumR2 = coords.reduce((sum, point) => sum + point.x ** 2 + point.y ** 2, 0);
  const reactions = coords.map(point => {
    const axial = baseN / n
      + (sumY2 > 0 ? mx * point.y / sumY2 : 0)
      + (sumX2 > 0 ? my * point.x / sumX2 : 0);
    const radius = Math.hypot(point.x, point.y);
    const torsionShear = sumR2 > 0 ? Math.abs(tz) * radius / sumR2 : 0;
    const lateral = directShear + torsionShear;
    return { ...point, axial, lateral };
  });
  const maxCompression = Math.max(0, ...reactions.map(item => item.axial));
  const maxUplift = Math.max(0, ...reactions.map(item => -item.axial));
  const maxLateral = Math.max(0, ...reactions.map(item => item.lateral));
  const critical = reactions.reduce((current, item) => {
    const itemScore = Math.max(Math.abs(item.axial), item.lateral);
    const currentScore = current ? Math.max(Math.abs(current.axial), current.lateral) : -1;
    return itemScore > currentScore ? item : current;
  }, null);

  $("screwDemandCompression").textContent = `${fixed(maxCompression)} kN`;
  $("screwDemandUplift").textContent = `${fixed(maxUplift)} kN`;
  $("screwDemandLateral").textContent = `${fixed(maxLateral)} kN`;
  $("screwCriticalPile").textContent = critical ? `Pile ${critical.id}` : "-";
  $("screwReactionRows").innerHTML = reactions.map(item => {
    const state = item.axial > 0.05 ? "Compression" : item.axial < -0.05 ? "Tension" : "Neutral";
    return `<tr><td>${item.id}</td><td>${fixed2(item.x)} m</td><td>${fixed2(item.y)} m</td><td>${fixed(item.axial)} kN</td><td>${state}</td><td>${fixed(item.lateral)} kN</td></tr>`;
  }).join("");

  const ratios = [];
  let missingCapacity = false;
  if (maxCompression > 0) compressionCap > 0 ? ratios.push(maxCompression / compressionCap) : missingCapacity = true;
  if (maxUplift > 0) upliftCap > 0 ? ratios.push(maxUplift / upliftCap) : missingCapacity = true;
  if (maxLateral > 0) lateralCap > 0 ? ratios.push(maxLateral / lateralCap) : missingCapacity = true;
  const hasDemand = maxCompression > 0 || maxUplift > 0 || maxLateral > 0;
  const utilisation = ratios.length ? Math.max(...ratios) : 0;
  $("screwDemandRatio").textContent = !hasDemand ? "0.00" : missingCapacity ? "Incomplete" : ratios.length ? utilisation.toFixed(2) : "0.00";
  if (!hasDemand) {
    $("screwDemandStatus").textContent = "No demand entered";
    setStatusClass($("screwDemandStatus"), "");
  } else if (missingCapacity) {
    $("screwDemandStatus").textContent = "Selected value missing";
    setStatusClass($("screwDemandStatus"), "check");
  } else if (utilisation <= 1) {
    $("screwDemandStatus").textContent = "Below selected values";
    setStatusClass($("screwDemandStatus"), "pass");
  } else {
    $("screwDemandStatus").textContent = "Exceeds selected values";
    setStatusClass($("screwDemandStatus"), "fail");
  }

  const capacityComparisons = [
    maxCompression > 0 ? `N<sub>c,max</sub><sup>*</sup> / R<sub>c</sub> = ${fixed(maxCompression)} / ${compressionCap > 0 ? fixed(compressionCap) : "not stated"}` : "",
    maxUplift > 0 ? `N<sub>t,max</sub><sup>*</sup> / R<sub>t</sub> = ${fixed(maxUplift)} / ${upliftCap > 0 ? fixed(upliftCap) : "not stated"}` : "",
    maxLateral > 0 ? `V<sub>max</sub><sup>*</sup> / R<sub>v</sub> = ${fixed(maxLateral)} / ${lateralCap > 0 ? fixed(lateralCap) : "not stated"}` : ""
  ].filter(Boolean).join("; ") || "no non-zero design action effect";

  $("screwDemandFormulaSteps").innerHTML = `
    <div><b>Purpose</b><code>Converts base actions into per-pile action effects for preliminary comparison. It does not determine AS 2159 design geotechnical strength R<sub>d,g</sub>, design structural strength R<sub>d,s</sub> or serviceability movement.</code></div>
    <div><b>Rigid-cap model</b><code>Coordinates are referred to the pile-group centroid. Identical pile axial stiffness and a rigid pile cap are assumed. n = ${n}; &Sigma;x<sub>j</sub><sup>2</sup> = ${fixed2(sumX2)} m<sup>2</sup>; &Sigma;y<sub>j</sub><sup>2</sup> = ${fixed2(sumY2)} m<sup>2</sup>; &Sigma;r<sub>j</sub><sup>2</sup> = ${fixed2(sumR2)} m<sup>2</sup>.</code></div>
    <div><b>Axial action effect</b><code>N<sub>i</sub><sup>*</sup> = N<sup>*</sup>/n + M<sub>x</sub><sup>*</sup>y<sub>i</sub>/&Sigma;y<sub>j</sub><sup>2</sup> + M<sub>y</sub><sup>*</sup>x<sub>i</sub>/&Sigma;x<sub>j</sub><sup>2</sup>. Positive N<sub>i</sub><sup>*</sup> is compression. N<sub>c,max</sub><sup>*</sup> = ${fixed(maxCompression)} kN; N<sub>t,max</sub><sup>*</sup> = ${fixed(maxUplift)} kN.</code></div>
    <div><b>Lateral action screen</b><code>V<sub>d</sub><sup>*</sup> = sqrt[(V<sub>x</sub><sup>*</sup>)<sup>2</sup> + (V<sub>y</sub><sup>*</sup>)<sup>2</sup>]/n = ${fixed(directShear)} kN. V<sub>T,i</sub><sup>*</sup> = |T<sub>z</sub><sup>*</sup>|r<sub>i</sub>/&Sigma;r<sub>j</sub><sup>2</sup>; V<sub>i</sub><sup>*</sup> = V<sub>d</sub><sup>*</sup> + V<sub>T,i</sub><sup>*</sup>. Direct shear and torsional shear are added as a scalar screening value, not a full lateral pile analysis. V<sub>max</sub><sup>*</sup> = ${fixed(maxLateral)} kN.</code></div>
    <div><b>Selected-value comparison</b><code>&eta; = max(N<sub>c,max</sub><sup>*</sup>/R<sub>c</sub>, N<sub>t,max</sub><sup>*</sup>/R<sub>t</sub>, V<sub>max</sub><sup>*</sup>/R<sub>v</sub>). R<sub>c</sub>, R<sub>t</sub> and R<sub>v</sub> are the values stated for the selected system/source, not calculated AS 2159 design strengths. Current terms: ${capacityComparisons}.</code></div>
  `;
}

function calculateScrew() {
  const pile = selectedScrewPile();
  const confidence = screwSourceConfidence($("screwManufacturer").value, pile);
  const compressionCap = value("screwCompressionCap");
  const upliftCap = value("screwUpliftCap");
  const lateralCap = value("screwLateralCap");
  $("screwDesignation").textContent = pile.label;
  $("screwAssumption").textContent = `${screwSystemType(pile)}. ${confidence.level}. Verify source and site evidence.`;
  $("screwSystem").textContent = pile.system || "Screw pile";
  $("screwShaft").textContent = pile.shaft;
  $("screwDiameter").textContent = pile.diameter || "-";
  $("screwWall").textContent = pile.wall || "-";
  $("screwHelixCount").textContent = pile.helixCount || "-";
  $("screwHelix").textContent = pile.helix || "-";
  $("screwSteel").textContent = pile.steel;
  $("screwLength").textContent = screwCompactFact(pile.length, 110);
  $("screwExtension").textContent = pile.extension || "-";
  $("screwSoilRequirement").textContent = screwCompactFact(pile.soilRequirement || "-", 120);
  $("screwInstallControl").textContent = screwCompactFact(pile.installControl || "-", 120);
  $("screwCapacityBasis").textContent = screwCompactFact(pile.capacityBasis || "Basis not stated.", 120);
  $("screwSource").textContent = pile.source;
  $("screwAxialClass").textContent = screwCapacityText(pile.axialClass);
  setScrewResistanceOutput(
    "screwCompressionResult",
    "screwCompressionUnit",
    "screwCompressionBasis",
    compressionCap,
    "Selected source value.",
    "Request certified Rc from supplier/geotechnical design."
  );
  setScrewResistanceOutput(
    "screwUpliftResult",
    "screwUpliftUnit",
    "screwUpliftBasis",
    upliftCap,
    "Selected source value.",
    "Request certified Rt from supplier/geotechnical design."
  );
  setScrewResistanceOutput(
    "screwLateralResult",
    "screwLateralUnit",
    "screwLateralBasis",
    lateralCap,
    "Selected source value.",
    "Required for lateral or moment use."
  );
  $("screwAxialBasis").textContent = pile.axialClass > 0 ? "System class shown." : "No class entered.";
  updateScrewSketch(pile, compressionCap, upliftCap, lateralCap);
  const sourceLabels = {
    series: "source: series/cert.",
    manufacturer: "source: manufacturer",
    geotech: "source: geotech",
    test: "source: load test",
    user: "source required"
  };
  const resistanceSource = sourceLabels[$("screwCapacitySource").value] || "selected value";
  $("screwCapacityStatus").textContent = resistanceSource;
  updateScrewCatalogueMatrix();
  updateScrewDrivers(pile, compressionCap, upliftCap, lateralCap);
  updateScrewRisk(pile, compressionCap, upliftCap, lateralCap);
  calculateScrewDemand(compressionCap, upliftCap, lateralCap);
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
  if (selectedTool === "screw") {
    calculateScrew();
    window.requestAnimationFrame(calculateScrew);
  }
}

function setMemberType(type) {
  memberType = type;
  const isCustom = type === "custom";
  document.querySelectorAll(".member-type").forEach(button => button.classList.toggle("active", button.dataset.memberType === type));
  const selectedMember = document.querySelector(".member-selected-section");
  if (selectedMember) selectedMember.classList.toggle("member-selected-custom", isCustom);
  document.querySelectorAll("[data-member-guide]").forEach(card => {
    card.hidden = card.dataset.memberGuide !== type;
  });
  $("memberSectionGroup").hidden = false;
  $("memberMaterialGroup").hidden = false;
  $("memberFactorGroup").hidden = !isCustom;
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
  $("memberAlphaBAssumption").hidden = !isCustom;
  $("memberAlphaBAssumption").innerHTML = type === "chs"
    ? "CHS basis: k<sub>f</sub> = 1.000; &alpha;<sub>b</sub> from AS 4100 Table 6.3.3."
    : type === "ea"
      ? "k<sub>f</sub> is catalogue-derived; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A/B) from the selected k<sub>f</sub>."
    : type === "pfc"
      ? "k<sub>f</sub> is catalogue-derived; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A/B) from the selected k<sub>f</sub>."
      : type === "custom"
        ? "Custom / Built-up properties: entered effective section properties; k<sub>f</sub> and &alpha;<sub>b</sub> are adopted AS 4100 compression factors."
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
  populateUBoltFilters(true);
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
  $("boltModeStandard").addEventListener("click", () => setBoltMode("standard"));
  $("boltModeUBolt").addEventListener("click", () => setBoltMode("ubolt"));
  ["uBoltApplication", "uBoltRodSize", "uBoltFitFilter", "uBoltFinish"].forEach(id => $(id).addEventListener("change", () => {
    populateUBoltFilters();
    calculateUBolt();
  }));
  $("uBoltManufacturer").addEventListener("change", () => {
    populateUBoltProducts();
    calculateUBolt();
  });
  $("uBoltProduct").addEventListener("change", calculateUBolt);
  document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => setTool(button.dataset.tool)));
  window.addEventListener("hashchange", () => setTool(location.hash.slice(1), false));
  window.addEventListener("resize", () => {
    if (!$("concretePanel").hidden) calculateConcrete();
    if (!$("screwPanel").hidden) calculateScrew();
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
  $("screwManufacturer").addEventListener("change", populateScrewSeries);
  $("screwSeries").addEventListener("change", setScrewCapacityDefaults);
  if ($("screwCatalogueRows")) {
    $("screwCatalogueRows").addEventListener("click", event => {
      const button = event.target.closest("[data-screw-select]");
      if (!button) return;
      selectScrewCatalogueRow(button.dataset.manufacturer, button.dataset.series);
    });
  }
  $("screwLayout").addEventListener("change", calculateScrew);
  screwInputIds
    .filter(id => !["screwManufacturer", "screwSeries", "screwLayout"].includes(id))
    .forEach(id => {
      const element = $(id);
      element.addEventListener("input", calculateScrew);
      if (element.tagName === "SELECT") element.addEventListener("change", calculateScrew);
    });
  $("screwDemandDetails").addEventListener("toggle", event => {
    if (event.target.open) calculateScrew();
  });
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
  $("memberCompressionDemand").addEventListener("input", calculateMember);
  $("memberTensionDemand").addEventListener("input", calculateMember);
  $("memberNetAreaMode").addEventListener("change", calculateMember);
  $("memberHoleCount").addEventListener("input", calculateMember);
  $("memberHoleDiameter").addEventListener("input", calculateMember);
  $("memberHoleThickness").addEventListener("input", calculateMember);
  $("memberNetArea").addEventListener("input", calculateMember);
  $("memberKt").addEventListener("input", calculateMember);
  populateScrewSeries();
  setBeamType(beamSectionType);
  setMemberType(memberType);
  calculateBolt();
  calculateUBolt();
  calculateWeld();
  calculateConcrete();
  calculateScrew();
  setBoltMode(initialBoltMode());
  setTool(location.hash.slice(1) || "bolt", false);
}

initialise();
