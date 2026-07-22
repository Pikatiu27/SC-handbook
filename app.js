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
    note: "capacity follows the weaker joined part",
    throatNote: "no automatic weld-metal throat calculation",
    scope: "complete-penetration butt-weld reference"
  },
  ipbw: {
    label: "IPBW",
    note: "specified throat capacity only",
    throatNote: "incomplete penetration: use specified a_w",
    scope: "incomplete-penetration butt-weld capacity view"
  },
  compound: {
    label: "Compound",
    note: "project-defined total design throat required",
    throatNote: "do not add a_w and 0.707s automatically",
    scope: "compound-weld reference"
  }
};
const weldInputIds = ["weldType", "weldSize", "weldCategory", "weldStrength", "weldLength", "weldRuns", "weldEffectiveThroat", "weldLapConnection", "weldDemand", "weldParentThickness", "weldParentGrade"];
const concreteInputIds = [
  "concreteDirection", "concreteWidth", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc",
  "concreteReoDirection", "concreteDepthBasis", "concreteCrossingBar",
  "concreteShearReo", "concreteShearBar", "concreteNsv", "concreteSv", "concreteFsyf",
  "layer1Active", "layer1Auto", "layer1Y", "layer1Bar", "layer1Spacing", "layer1Fsy", "layer1Es",
  "layer2Active", "layer2Auto", "layer2Y", "layer2Bar", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Active", "layer3Auto", "layer3Y", "layer3Bar", "layer3Spacing", "layer3Fsy", "layer3Es",
  "layer4Active", "layer4Auto", "layer4Y", "layer4Bar", "layer4Spacing", "layer4Fsy", "layer4Es"
];
const concreteNBarDiameters = [10, 12, 16, 20, 24, 28, 32, 36, 40];
const concreteLegacyYBarDiameters = [12, 16, 20, 24, 28, 32, 36];
const concreteBarAreas = {
  10: 79,
  12: 113,
  16: 201,
  20: 314,
  24: 452,
  28: 616,
  32: 804,
  36: 1018,
  40: 1257
};
const concreteBarProducts = Object.fromEntries(
  [
    ["N", concreteNBarDiameters],
    ["Y", concreteLegacyYBarDiameters]
  ].flatMap(([prefix, diameters]) => diameters.map(diameter => {
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

const hotRolledSectionProperties = Object.freeze({
  "610UB125": Object.freeze({ ix: 986e6, iy: 39.3e6, zy: 343e3, sy: 536e3, rx: 249, ry: 49.6, j: 1560e3, iw: 3450e9 }),
  "610UB113": Object.freeze({ ix: 875e6, iy: 34.3e6, zy: 300e3, sy: 469e3, rx: 246, ry: 48.7, j: 1140e3, iw: 2980e9 }),
  "610UB101": Object.freeze({ ix: 761e6, iy: 29.3e6, zy: 257e3, sy: 402e3, rx: 242, ry: 47.5, j: 790e3, iw: 2530e9 }),
  "530UB92.4": Object.freeze({ ix: 554e6, iy: 23.8e6, zy: 228e3, sy: 355e3, rx: 217, ry: 44.9, j: 775e3, iw: 1590e9 }),
  "530UB82.0": Object.freeze({ ix: 477e6, iy: 20.1e6, zy: 193e3, sy: 301e3, rx: 213, ry: 43.8, j: 526e3, iw: 1330e9 }),
  "460UB82.1": Object.freeze({ ix: 372e6, iy: 18.6e6, zy: 195e3, sy: 303e3, rx: 188, ry: 42.2, j: 701e3, iw: 919e9 }),
  "460UB74.6": Object.freeze({ ix: 335e6, iy: 16.6e6, zy: 175e3, sy: 271e3, rx: 188, ry: 41.8, j: 530e3, iw: 815e9 }),
  "460UB67.1": Object.freeze({ ix: 296e6, iy: 14.5e6, zy: 153e3, sy: 238e3, rx: 186, ry: 41.2, j: 378e3, iw: 708e9 }),
  "410UB59.7": Object.freeze({ ix: 216e6, iy: 12.1e6, zy: 135e3, sy: 209e3, rx: 168, ry: 39.7, j: 337e3, iw: 467e9 }),
  "410UB53.7": Object.freeze({ ix: 188e6, iy: 10.3e6, zy: 115e3, sy: 179e3, rx: 165, ry: 38.6, j: 234e3, iw: 394e9 }),
  "360UB56.7": Object.freeze({ ix: 161e6, iy: 11e6, zy: 128e3, sy: 198e3, rx: 149, ry: 39, j: 338e3, iw: 330e9 }),
  "360UB50.7": Object.freeze({ ix: 142e6, iy: 9.6e6, zy: 112e3, sy: 173e3, rx: 148, ry: 38.5, j: 241e3, iw: 284e9 }),
  "360UB44.7": Object.freeze({ ix: 121e6, iy: 8.1e6, zy: 94.7e3, sy: 146e3, rx: 146, ry: 37.6, j: 161e3, iw: 237e9 }),
  "310UB46.2": Object.freeze({ ix: 100e6, iy: 9.01e6, zy: 109e3, sy: 166e3, rx: 130, ry: 39, j: 233e3, iw: 197e9 }),
  "310UB40.4": Object.freeze({ ix: 86.4e6, iy: 7.65e6, zy: 92.7e3, sy: 142e3, rx: 129, ry: 38.3, j: 157e3, iw: 165e9 }),
  "310UB32.0": Object.freeze({ ix: 63.2e6, iy: 4.42e6, zy: 59.3e3, sy: 91.8e3, rx: 124, ry: 32.9, j: 86.5e3, iw: 92.9e9 }),
  "250UB37.3": Object.freeze({ ix: 55.7e6, iy: 5.66e6, zy: 77.5e3, sy: 119e3, rx: 108, ry: 34.5, j: 158e3, iw: 85.2e9 }),
  "250UB31.4": Object.freeze({ ix: 44.5e6, iy: 4.47e6, zy: 61.2e3, sy: 94.2e3, rx: 105, ry: 33.4, j: 89.3e3, iw: 65.9e9 }),
  "250UB25.7": Object.freeze({ ix: 35.4e6, iy: 2.55e6, zy: 41.1e3, sy: 63.6e3, rx: 104, ry: 27.9, j: 67.4e3, iw: 36.7e9 }),
  "200UB29.8": Object.freeze({ ix: 29.1e6, iy: 3.86e6, zy: 57.5e3, sy: 88.4e3, rx: 87.3, ry: 31.8, j: 105e3, iw: 37.6e9 }),
  "200UB25.4": Object.freeze({ ix: 23.6e6, iy: 3.06e6, zy: 46.1e3, sy: 70.9e3, rx: 85.4, ry: 30.8, j: 62.7e3, iw: 29.2e9 }),
  "200UB22.3": Object.freeze({ ix: 21e6, iy: 2.75e6, zy: 41.3e3, sy: 63.4e3, rx: 85.5, ry: 31, j: 45e3, iw: 26e9 }),
  "200UB18.2": Object.freeze({ ix: 15.8e6, iy: 1.14e6, zy: 23e3, sy: 35.7e3, rx: 82.6, ry: 22.1, j: 38.6e3, iw: 10.4e9 }),
  "180UB22.2": Object.freeze({ ix: 15.3e6, iy: 1.22e6, zy: 27.1e3, sy: 42.3e3, rx: 73.6, ry: 20.8, j: 81.6e3, iw: 8.71e9 }),
  "180UB18.1": Object.freeze({ ix: 12.1e6, iy: 0.975e6, zy: 21.7e3, sy: 33.7e3, rx: 72.6, ry: 20.6, j: 44.8e3, iw: 6.8e9 }),
  "180UB16.1": Object.freeze({ ix: 10.6e6, iy: 0.853e6, zy: 19e3, sy: 29.4e3, rx: 72, ry: 20.4, j: 31.5e3, iw: 5.88e9 }),
  "150UB18.0": Object.freeze({ ix: 9.05e6, iy: 0.672e6, zy: 17.9e3, sy: 28.2e3, rx: 62.8, ry: 17.1, j: 60.5e3, iw: 3.56e9 }),
  "150UB14.0": Object.freeze({ ix: 6.66e6, iy: 0.495e6, zy: 13.2e3, sy: 20.8e3, rx: 61.1, ry: 16.6, j: 28.1e3, iw: 2.53e9 }),
  "310UC158": Object.freeze({ ix: 388e6, iy: 125e6, zy: 807e3, sy: 1230e3, rx: 139, ry: 78.9, j: 3810e3, iw: 2860e9 }),
  "310UC137": Object.freeze({ ix: 329e6, iy: 107e6, zy: 691e3, sy: 1050e3, rx: 137, ry: 78.2, j: 2520e3, iw: 2390e9 }),
  "310UC118": Object.freeze({ ix: 277e6, iy: 90.2e6, zy: 588e3, sy: 893e3, rx: 136, ry: 77.5, j: 1630e3, iw: 1980e9 }),
  "310UC96.8": Object.freeze({ ix: 223e6, iy: 72.9e6, zy: 478e3, sy: 725e3, rx: 134, ry: 76.7, j: 928e3, iw: 1560e9 }),
  "250UC89.5": Object.freeze({ ix: 143e6, iy: 48.4e6, zy: 378e3, sy: 575e3, rx: 112, ry: 65.2, j: 1040e3, iw: 713e9 }),
  "250UC72.9": Object.freeze({ ix: 114e6, iy: 38.8e6, zy: 306e3, sy: 463e3, rx: 111, ry: 64.5, j: 586e3, iw: 557e9 }),
  "200UC59.5": Object.freeze({ ix: 61.3e6, iy: 20.4e6, zy: 199e3, sy: 303e3, rx: 89.7, ry: 51.7, j: 477e3, iw: 195e9 }),
  "200UC52.2": Object.freeze({ ix: 52.8e6, iy: 17.7e6, zy: 174e3, sy: 264e3, rx: 89.1, ry: 51.5, j: 325e3, iw: 166e9 }),
  "200UC46.2": Object.freeze({ ix: 45.9e6, iy: 15.3e6, zy: 151e3, sy: 230e3, rx: 88.2, ry: 51, j: 228e3, iw: 142e9 }),
  "150UC37.2": Object.freeze({ ix: 22.2e6, iy: 7.01e6, zy: 91e3, sy: 139e3, rx: 68.4, ry: 38.5, j: 197e3, iw: 39.6e9 }),
  "150UC30.0": Object.freeze({ ix: 17.6e6, iy: 5.62e6, zy: 73.4e3, sy: 112e3, rx: 67.5, ry: 38.1, j: 109e3, iw: 30.8e9 }),
  "150UC23.4": Object.freeze({ ix: 12.6e6, iy: 3.98e6, zy: 52.4e3, sy: 80.2e3, rx: 65.1, ry: 36.6, j: 50.2e3, iw: 21.1e9 }),
  "100UC14.8": Object.freeze({ ix: 3.18e6, iy: 1.14e6, zy: 22.9e3, sy: 35.2e3, rx: 41.1, ry: 24.5, j: 34.9e3, iw: 2.3e9 })
});

function beamSectionRecord([designation, mass, area, Sx, Zx, grades]) {
  const shear = beamShearDimensions[designation] || {};
  const d = shear.d || 0;
  const bf = shear.bf || 0;
  const d1 = shear.d1 || 0;
  const tw = shear.tw || 0;
  const tf = shear.tf || 0;
  return { designation, mass, area, Sx, Zx, d, bf, d1, tw, tf, Aw: d1 * tw, grades, ...(hotRolledSectionProperties[designation] || {}) };
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
  [26.9,2.6,1.56],[33.7,2.0,1.56],[33.7,2.6,1.99],[33.7,3.2,2.41],[33.7,4.0,2.93],
  [42.4,2.0,1.99],[42.4,2.6,2.55],[42.4,3.2,3.09],[42.4,4.0,3.79],
  [48.3,2.3,2.61],[48.3,2.9,3.25],[48.3,3.2,3.56],[48.3,4.0,4.37],
  [60.3,2.3,3.29],[60.3,2.9,4.11],[60.3,3.5,4.90],[60.3,3.6,5.03],[60.3,4.5,6.19],
  [76.1,2.3,4.19],[76.1,3.2,5.75],[76.1,3.6,6.44],[76.1,4.5,7.95],
  [88.9,2.6,5.53],[88.9,3.2,6.76],[88.9,4.0,8.38],[88.9,5.0,10.35],
  [101.6,2.6,6.35],[101.6,3.2,7.77],[101.6,4.0,9.63],[101.6,5.0,11.91],
  [114.3,3.2,8.77],[114.3,3.6,9.83],[114.3,4.5,12.19],[114.3,5.4,14.50],
  [139.7,3.0,10.11],[139.7,3.5,11.76],[139.7,5.0,16.61],[139.7,5.4,17.89],
  [165.1,3.0,11.99],[165.1,3.5,13.95],[165.1,5.0,19.74],[165.1,5.4,21.27]
].map(([D,t,mass]) => ({ designation: `${D.toFixed(1)} x ${t.toFixed(1)} CHS`, D, t, mass }));

// InfraBuild 2019 Tables 19 and 21. Source units: I in 10^6 mm4; Z, S and J in 10^3 mm3/mm4.
const eaCatalogueSections = [
  [200,26,76.8,26.0,18,5,6.69,9780,59.3,141,35.8,605,255,460,60.5,-20.9,56.8,14.9,402,202,178,643,329,76.2,39.0,2250],
  [200,20,60.1,20.0,18,5,9.00,7660,57.0,143,28.8,505,201,363,61.3,-16.9,45.7,11.8,323,162,147,511,260,77.2,39.3,1060],
  [200,18,54.4,18.0,18,5,10.1,6930,56.2,144,26.3,467,183,330,61.5,-15.5,41.7,10.8,295,149,136,464,236,77.6,39.4,778],
  [200,16,48.7,16.0,18,5,11.5,6200,55.4,145,23.7,427,164,296,61.8,-14.0,37.6,9.72,266,135,124,417,212,77.9,39.6,554],
  [200,13,40.0,13.0,18,5,14.4,5090,54.2,146,19.7,363,135,243,62.2,-11.6,31.2,8.08,221,112,105,344,176,78.3,39.8,304],
  [150,19,42.1,19.0,13,5,6.89,5360,44.2,106,11.1,250,105,189,45.4,-6.48,17.6,4.60,166,83.8,73.5,265,135,57.2,29.3,657],
  [150,16,35.4,15.8,13,5,8.49,4520,43.0,107,9.48,220,88.7,160,45.8,-5.58,15.1,3.91,142,71.9,64.2,225,115,57.8,29.4,386],
  [150,12,27.3,12.0,13,5,11.5,3480,41.5,108,7.46,180,68.8,124,46.3,-4.40,11.9,3.06,112,56.9,52.1,175,89.3,58.4,29.6,174],
  [150,10,21.9,9.5,13,5,14.8,2790,40.5,109,6.04,149,55.2,99.9,46.6,-3.56,9.61,2.48,90.6,46.4,43.3,141,72.0,58.7,29.8,88.9],
  [125,16,29.1,15.8,10,5,6.91,3710,36.8,88.2,5.32,144,60.3,109,37.9,-3.11,8.43,2.20,95.4,48.5,42.3,153,77.8,47.7,24.4,313],
  [125,12,22.5,12.0,10,5,9.42,2870,35.4,89.6,4.21,119,47.0,85.0,38.3,-2.48,6.69,1.73,75.7,38.6,34.5,120,60.8,48.3,24.5,141],
  [125,10,18.0,9.5,10,5,12.2,2300,34.4,90.6,3.42,99.4,37.8,68.4,38.6,-2.02,5.44,1.40,61.6,31.5,28.8,96.5,49.0,48.7,24.7,71.9],
  [125,8,14.9,7.8,10,5,15.0,1900,33.7,91.3,2.86,84.9,31.3,56.8,38.8,-1.69,4.55,1.17,51.5,26.5,24.5,80.2,40.8,48.9,24.8,40.6],
  [100,12,17.7,12.0,8,5,7.33,2260,29.2,70.8,2.08,71.1,29.3,53.2,30.3,-1.22,3.29,0.857,46.6,23.9,20.8,74.5,37.9,38.2,19.5,110],
  [100,10,14.2,9.5,8,5,9.53,1810,28.2,71.8,1.70,60.1,23.6,42.9,30.6,-1.00,2.70,0.695,38.2,19.6,17.4,60.4,30.7,38.6,19.6,56.2],
  [100,8,11.8,7.8,8,5,11.8,1500,27.5,72.5,1.42,51.7,19.6,35.7,30.8,-0.842,2.27,0.582,32.0,16.5,14.9,50.3,25.6,38.8,19.7,31.7],
  [100,6,9.16,6.0,8,5,15.7,1170,26.8,73.2,1.12,41.8,15.3,27.8,31.0,-0.661,1.78,0.458,25.2,13.1,12.1,39.3,20.0,39.1,19.8,14.8],
  [90,10,12.7,9.5,8,5,8.47,1620,25.7,64.3,1.22,47.3,18.9,34.4,27.4,-0.716,1.93,0.500,30.4,15.7,13.8,48.3,24.6,34.5,17.6,50.5],
  [90,8,10.6,7.8,8,5,10.5,1350,25.0,65.0,1.02,40.9,15.7,28.7,27.6,-0.604,1.63,0.419,25.6,13.2,11.8,40.4,20.5,34.8,17.6,28.6],
  [90,6,8.22,6.0,8,5,14.0,1050,24.3,65.7,0.805,33.2,12.3,22.4,27.7,-0.475,1.28,0.330,20.1,10.5,9.62,31.6,16.1,35.0,17.8,13.4],
  [75,10,10.5,9.5,8,5,6.89,1340,22.0,53.0,0.681,31.0,12.8,23.4,22.6,-0.399,1.08,0.282,20.4,10.6,9.09,32.8,16.8,28.4,14.5,41.9],
  [75,8,8.73,7.8,8,5,8.62,1110,21.3,53.7,0.575,27.0,10.7,19.6,22.7,-0.338,0.913,0.237,17.2,8.99,7.87,27.5,14.0,28.7,14.6,23.8],
  [75,6,6.81,6.0,8,5,11.5,867,20.5,54.5,0.455,22.1,8.35,15.3,22.9,-0.268,0.722,0.187,13.6,7.15,6.44,21.6,11.0,28.9,14.7,11.2],
  [75,5,5.27,4.6,8,5,15.3,672,19.9,55.1,0.355,17.9,6.44,11.8,23.0,-0.208,0.563,0.147,10.6,5.62,5.22,16.7,8.61,29.0,14.8,5.28],
  [65,10,9.02,9.5,6,3,5.84,1150,19.6,45.4,0.437,22.3,9.62,17.4,19.5,-0.254,0.691,0.183,15.0,7.71,6.60,24.3,12.5,24.5,12.6,35.1],
  [65,8,7.51,7.8,6,3,7.33,957,19.0,46.0,0.371,19.6,8.07,14.6,19.7,-0.218,0.589,0.154,12.8,6.56,5.73,20.5,10.5,24.8,12.7,20.0],
  [65,6,5.87,6.0,6,3,9.83,748,18.3,46.7,0.296,16.2,6.34,11.5,19.9,-0.175,0.471,0.122,10.2,5.26,4.71,16.2,8.25,25.1,12.8,9.37],
  [65,5,4.56,4.6,6,3,13.1,581,17.7,47.3,0.234,13.2,4.94,8.97,20.1,-0.138,0.371,0.0959,8.08,4.18,3.83,12.7,6.46,25.3,12.9,4.36],
  [55,6,4.93,6.0,6,3,8.17,628,15.8,39.2,0.175,11.1,4.46,8.11,16.7,-0.103,0.278,0.0723,7.14,3.69,3.24,11.4,5.82,21.0,10.7,7.93],
  [55,5,3.84,4.6,6,3,11.0,489,15.2,39.8,0.139,9.12,3.48,6.34,16.8,-0.0814,0.220,0.0571,5.66,2.94,2.66,8.93,4.57,21.2,10.8,3.71],
  [50,8,5.68,7.8,6,3,5.41,723,15.2,34.8,0.160,10.5,4.61,8.38,14.9,-0.0928,0.253,0.0675,7.16,3.73,3.14,11.7,6.00,18.7,9.66,15.2],
  [50,6,4.46,6.0,6,3,7.33,568,14.5,35.5,0.129,8.90,3.64,6.63,15.1,-0.0756,0.205,0.0536,5.79,3.01,2.61,9.30,4.76,19.0,9.71,7.21],
  [50,5,3.48,4.6,6,3,9.87,443,13.9,36.1,0.103,7.36,2.85,5.19,15.2,-0.0602,0.163,0.0424,4.61,2.40,2.15,7.32,3.75,19.2,9.78,3.38],
  [50,3,2.31,3.0,6,3,15.7,295,13.2,36.8,0.0694,5.25,1.89,3.46,15.3,-0.0405,0.110,0.0289,3.11,1.65,1.55,4.90,2.53,19.3,9.90,1.01],
  [45,6,3.97,6.0,5,3,6.50,506,13.3,31.7,0.0922,6.93,2.91,5.30,13.5,-0.0538,0.146,0.0383,4.59,2.39,2.04,7.41,3.79,17.0,8.71,6.32],
  [45,5,3.10,4.6,5,3,8.78,394,12.7,32.3,0.0734,5.76,2.28,4.16,13.6,-0.0432,0.117,0.0303,3.66,1.91,1.68,5.84,2.99,17.2,8.76,2.96],
  [45,3,2.06,3.0,5,3,14.0,263,12.0,33.0,0.0498,4.14,1.51,2.77,13.8,-0.0292,0.0790,0.0206,2.48,1.31,1.21,3.92,2.02,17.3,8.85,0.875],
  [40,6,3.50,6.0,5,3,5.67,446,12.0,28.0,0.0631,5.24,2.26,4.12,11.9,-0.0366,0.0997,0.0265,3.53,1.86,1.55,5.75,2.95,15.0,7.71,5.60],
  [40,5,2.73,4.6,5,3,7.70,348,11.5,28.5,0.0505,4.39,1.77,3.24,12.0,-0.0296,0.0801,0.0209,2.83,1.49,1.29,4.55,2.33,15.2,7.75,2.63],
  [40,3,1.83,3.0,5,3,12.3,233,10.8,29.2,0.0344,3.19,1.18,2.17,12.2,-0.0201,0.0545,0.0142,1.93,1.02,0.933,3.06,1.58,15.3,7.82,0.785],
  [30,6,2.56,6.0,5,3,4.00,326,9.53,20.5,0.0247,2.59,1.21,2.22,8.71,-0.0140,0.0387,0.0107,1.83,0.993,0.790,3.06,1.59,10.9,5.72,4.16],
  [30,5,2.01,4.6,5,3,5.52,256,8.99,21.0,0.0200,2.22,0.951,1.76,8.83,-0.0116,0.0316,0.00839,1.49,0.799,0.660,2.45,1.26,11.1,5.72,1.98],
  [30,3,1.35,3.0,5,3,9.00,173,8.30,21.7,0.0138,1.66,0.635,1.18,8.93,-0.00804,0.0218,0.00573,1.03,0.554,0.488,1.67,0.862,11.2,5.76,0.605],
  [25,6,2.08,6.0,5,3,3.17,266,8.28,16.7,0.0135,1.63,0.807,1.49,7.13,-0.00750,0.0210,0.00600,1.19,0.669,0.513,2.03,1.07,8.89,4.75,3.44],
  [25,5,1.65,4.6,5,3,4.43,210,7.75,17.3,0.0110,1.42,0.638,1.19,7.23,-0.00632,0.0173,0.00469,0.980,0.537,0.428,1.65,0.849,9.07,4.72,1.66],
  [25,3,1.12,3.0,5,3,7.33,143,7.07,17.9,0.00765,1.08,0.426,0.802,7.33,-0.00446,0.0121,0.00319,0.685,0.373,0.319,1.13,0.583,9.22,4.73,0.515]
].map(([b,t,mass,actualT,rootRadius,toeRadius,legRatio,area,centroidNear,centroidFar,inNp,zFar,zNear,sNp,rNp,inp,ixP,iyP,zxP,zy3,zy5,sxP,syP,rxP,ryP,j]) => ({
  designation: `${b} x ${b} x ${t} EA`, b, t, mass, actualT, rootRadius, toeRadius, legRatio, area, centroidNear, centroidFar,
  r: rNp, rx: rNp, ry: rNp, ix: inNp * 1e6, iy: inNp * 1e6, in: inNp * 1e6, ip: inNp * 1e6,
  znB: zFar * 1e3, zpL: zFar * 1e3, znT: zNear * 1e3, zpR: zNear * 1e3, sn: sNp * 1e3, sp: sNp * 1e3,
  rn: rNp, rp: rNp, inp: inp * 1e6, principalIx: ixP * 1e6, principalIy: iyP * 1e6,
  principalZx: zxP * 1e3, principalZy3: zy3 * 1e3, principalZy5: zy5 * 1e3,
  principalSx: sxP * 1e3, principalSy: syP * 1e3, principalRx: rxP, principalRy: ryP, j: j * 1e3
}));

const eaAxialGrades = Object.freeze({
  "150 x 150 x 12 EA": [300,1.000,340,1.000], "125 x 125 x 10 EA": [320,1.000,360,1.000],
  "100 x 100 x 10 EA": [320,1.000,360,1.000], "100 x 100 x 8 EA": [320,1.000,360,1.000],
  "100 x 100 x 6 EA": [320,0.906,360,0.856], "90 x 90 x 8 EA": [320,1.000,360,1.000],
  "75 x 75 x 8 EA": [320,1.000,360,1.000], "75 x 75 x 6 EA": [320,1.000,360,1.000],
  "65 x 65 x 6 EA": [320,1.000,360,1.000], "65 x 65 x 5 EA": [320,1.000,360,1.000],
  "50 x 50 x 6 EA": [320,1.000,360,1.000], "50 x 50 x 5 EA": [320,1.000,360,1.000],
  "50 x 50 x 3 EA": [320,0.907,360,0.858]
});

const eaSections = eaCatalogueSections.filter(section => eaAxialGrades[section.designation]).map(section => {
  const [fy300,kf300,fy350,kf350] = eaAxialGrades[section.designation];
  return { ...section, grades: { "300PLUS": { fy: fy300, fu: 440, kf: kf300 }, "Grade 350": { fy: fy350, fu: 480, kf: kf350 } } };
});

const pfcSections = [
  [380, 55.2, 7030, 147, 30.4, 152, 6.48, 280, 100, 10.0, 17.5, 27.5, 56.7, 798, 946, 89.4, 236, 161, 491, 151],
  [300, 40.1, 5110, 119, 28.1, 72.4, 4.04, 300, 90, 8.0, 16.0, 27.2, 56.1, 483, 564, 64.4, 148, 117, 304, 58.2],
  [250, 35.5, 4520, 99.9, 28.4, 45.1, 3.64, 300, 90, 8.0, 15.0, 28.6, 58.5, 361, 421, 59.3, 127, 107, 248, 35.9],
  [230, 25.1, 3200, 91.4, 23.5, 26.8, 1.76, 300, 75, 6.5, 12.0, 22.6, 46.7, 233, 271, 33.6, 77.8, 61.0, 112, 15.0],
  [200, 22.9, 2920, 80.9, 23.8, 19.1, 1.65, 300, 75, 6.0, 12.0, 24.4, 50.5, 191, 221, 32.7, 67.8, 58.9, 105, 10.6],
  [180, 20.9, 2660, 72.9, 23.8, 14.1, 1.51, 300, 75, 6.0, 11.0, 24.5, 50.3, 157, 182, 29.9, 61.5, 53.8, 84.5, 7.82],
  [150, 17.7, 2250, 60.8, 23.9, 8.34, 1.29, 320, 75, 6.0, 9.5, 24.9, 51.0, 111, 129, 25.7, 51.6, 46.0, 56.6, 4.59],
  [125, 11.9, 1520, 51.1, 20.8, 3.97, 0.658, 320, 65, 4.7, 7.5, 21.8, 45.0, 63.5, 73.0, 15.2, 30.2, 27.2, 23.8, 1.64],
  [100, 8.33, 1060, 40.4, 15.9, 1.74, 0.267, 320, 50, 4.2, 6.7, 16.7, 33.9, 34.7, 40.3, 8.01, 16.0, 14.4, 13.6, 0.424],
  [75, 5.92, 754, 30.1, 12.6, 0.683, 0.120, 320, 40, 3.8, 6.1, 13.7, 27.2, 18.2, 21.4, 4.56, 8.71, 8.2, 8.42, 0.106]
].map(([depth, mass, area, rx, ry, ix, iy, fy, bf, tw, tf, xl, xo, zx, sx, zyR, zyL, sy, j, iw]) => ({
  designation: `${depth}PFC`,
  mass,
  area,
  r: Math.min(rx, ry),
  rx,
  ry,
  ix: ix * 1e6,
  iy: iy * 1e6,
  xl,
  xo,
  zx: zx * 1e3,
  sx: sx * 1e3,
  zyR: zyR * 1e3,
  zyL: zyL * 1e3,
  sy: sy * 1e3,
  j: j * 1e3,
  iw: iw * 1e9,
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

const sectionCatalogueFamilies = SectionCatalogue.create({
  pfc: pfcSections,
  ub: ubSections,
  uc: ucSections,
  chs: chsSections,
  ea: eaCatalogueSections,
  rod: rodSections
}, SectionGeometry);
let sectionPropertiesMode = "catalogue";

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
    sourceUrl: "https://katanafoundations.com.au/wp-content/uploads/2024/12/241001-Katana-Screw-Pile-_-Performance-Guide.pdf",
    defaultSeries: "katana-80",
    series: {
      "katana-40": {
        label: "Katana 40 kN series",
        system: "Conventional steel screw pile",
        axialClass: 40,
        compression: 40,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "60.3 x 4.5 CHS",
        diameter: "60.3 mm OD",
        wall: "4.5 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "200 mm dia x 8 mm plate",
        length: "1.0 m lead; extensions by design",
        extension: "Available on request",
        soilRequirement: "Geotechnical strength controls; guide basis is stiff/dense founding soil",
        installControl: "Use project torque/test acceptance",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13",
        defaultSource: "manufacturer",
        capacityBasis: "Compression SWL up to 40 kN in the stated guide conditions; available on request and outside current CodeMark scope.",
        note: "Smaller upon-request series. Confirm availability, certificate scope and installation torque before selection."
      },
      "katana-80": {
        label: "Katana 80 kN series",
        system: "Conventional steel screw pile",
        axialClass: 80,
        compression: 80,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "76.1 x 4.0 CHS",
        diameter: "76.1 mm OD",
        wall: "4.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "250 mm dia x 8 mm plate",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; extension sections available",
        soilRequirement: "Stiff clay / dense sand indicator; soft or loose material needs test confirmation",
        installControl: "Example guide correlation: 4000 Nm for 80 kN in stiff/dense soils",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13; CodeMark CM30096 Rev 6",
        defaultSource: "series",
        capacityBasis: "Compression SWL up to 80 kN in stiff clay/dense sand; within the current CodeMark series scope.",
        note: "Common CodeMark-compliant series. Lateral graph is available for 80 kN clay/sand cases; do not select by axial class alone."
      },
      "katana-100": {
        label: "Katana 100 kN series",
        system: "Conventional steel screw pile",
        axialClass: 100,
        compression: 100,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "76.1 x 4.0 CHS",
        diameter: "76.1 mm OD",
        wall: "4.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "300 mm dia x 8 mm plate",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; helix extension option noted",
        soilRequirement: "Geotechnical strength controls; confirm final torque and founding layer",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13; CodeMark CM30096 Rev 6",
        defaultSource: "series",
        capacityBasis: "Compression SWL up to 100 kN in stiff clay/dense sand; within the current CodeMark series scope.",
        note: "Same shaft as 80 kN with larger helix. Check helix size, torque and pile spacing before adopting."
      },
      "katana-150": {
        label: "Katana 150 kN series",
        system: "Conventional steel screw pile",
        axialClass: 150,
        compression: 150,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "350 mm dia x 10 mm plate",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; helix extension option noted",
        soilRequirement: "Geotechnical strength controls; confirm final torque and founding layer",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13; CodeMark CM30096 Rev 6",
        defaultSource: "series",
        capacityBasis: "Compression SWL up to 150 kN in stiff clay/dense sand; within the current CodeMark series scope.",
        note: "Larger shaft and helix. Lateral graph is available for 150 kN clay/sand cases; head fixity remains project-specific."
      },
      "katana-200": {
        label: "Katana 200 kN series",
        system: "Conventional steel screw pile",
        axialClass: 200,
        compression: 200,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "2 helices",
        helix: "350 mm dia x 10 mm plate each",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; extension sections available",
        soilRequirement: "Geotechnical strength controls; pile group and helix spacing need review",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13; CodeMark CM30096 Rev 6",
        defaultSource: "series",
        capacityBasis: "Compression SWL up to 200 kN in stiff clay/dense sand; within the current CodeMark series scope.",
        note: "Two-helix option. Check inter-helix behaviour, pile spacing and installation torque before adopting."
      },
      "katana-250": {
        label: "Katana 250 kN series",
        system: "Conventional steel screw pile",
        axialClass: 250,
        compression: 250,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "114.3 x 6.0 CHS",
        diameter: "114.3 mm OD",
        wall: "6.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "1 helix",
        helix: "450 mm dia x 12 mm plate",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; project-specific",
        soilRequirement: "Commercial-load option; confirm founding layer and installation equipment capacity",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13",
        defaultSource: "manufacturer",
        capacityBasis: "Compression SWL up to 250 kN; available on request and outside current CodeMark scope.",
        note: "Higher-capacity commercial option. Check product availability, equipment torque and project certificate."
      },
      "katana-300": {
        label: "Katana 300 kN series",
        system: "Conventional steel screw pile",
        axialClass: 300,
        compression: 300,
        uplift: 0,
        lateral: 0,
        capacityType: "compression-swl-up-to",
        comparisonBasis: "reference",
        shaft: "114.3 x 6.0 CHS",
        diameter: "114.3 mm OD",
        wall: "6.0 mm",
        steel: "AS/NZS 1163 CHS, guide table",
        helixCount: "2 helices",
        helix: "450 mm dia x 12 mm plate each",
        length: "1.0-4.0 m series range noted",
        extension: "0.5 m increments; project-specific",
        soilRequirement: "Commercial-load option; confirm founding layer and installation equipment capacity",
        installControl: "Use SWL vs torque table and project acceptance",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13",
        defaultSource: "manufacturer",
        capacityBasis: "Compression SWL up to 300 kN; available on request and outside current CodeMark scope.",
        note: "Largest Katana guide option captured here. Treat as manufacturer/project-confirmed selection, not simple residential default."
      }
    }
  },
  ideal: {
    label: "Ideal Foundations",
    sourceUrl: "https://www.idealfoundations.com.au/wp-content/uploads/sites/2/Screw_Pier_Specifiers_Technical_Guide-Ideal_Foundations.pdf",
    series: {
      "ideal-85": {
        label: "Ideal modular 85 kN",
        system: "Modular screw pier",
        axialClass: 85,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 85,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
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
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 85 kN for the guide row; confirm the selected option and load direction.",
        note: "Off-the-shelf modular system. Use uplift/lateral values only from Ideal/project design."
      },
      "ideal-120": {
        label: "Ideal 120 kN system",
        system: "Manufactured screw pier",
        axialClass: 120,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 120,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
        shaft: "76 x 5.0 CHS",
        diameter: "76 mm OD",
        wall: "5.0 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "1 helix",
        helix: "280 mm cast helix",
        length: "1.0-4.0 m shafts; max depth up to 9 m",
        extension: "Extensions by system design",
        soilRequirement: "Min 300 kPa unfactored; DCP 12 blows/100 mm min",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 120 kN for the guide row; confirm the selected option and load direction.",
        note: "Residential/commercial transition option. Select the helix form to match soil and project demand."
      },
      "ideal-200": {
        label: "Ideal 200 kN system",
        system: "Manufactured screw pier",
        axialClass: 200,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 200,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Helix or plate option",
        helix: "280/350 mm helix or 400 mm plate",
        length: "2.0-4.0 m shafts; max depth up to 12 m",
        extension: "Extensions by system design",
        soilRequirement: "Min 450 kPa unfactored; DCP 18 blows/100 mm min",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 200 kN for the guide row; confirm the selected option and load direction.",
        note: "Higher capacity manufactured range. Helix choice and soil class drive the selection."
      },
      "ideal-300": {
        label: "Ideal 300 kN system",
        system: "Manufactured screw pier",
        axialClass: 300,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 300,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
        shaft: "114 x 6.0 CHS",
        diameter: "114 mm OD",
        wall: "6.0 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Helix or plate option",
        helix: "350/450 mm helix or 400/500 mm plate",
        length: "2.0-6.0 m shafts; max depth up to 16 m",
        extension: "Extensions by system design",
        soilRequirement: "Min 600 kPa or rock 750 kPa; DCP 24+ to rock",
        installControl: "Install to specified pressure/torque; record Nm for every pier",
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 300 kN for the guide row; confirm the selected option and load direction.",
        note: "Heavy manufactured range. Confirm equipment, founding stratum and pier head details."
      },
      "ideal-500-168": {
        label: "Ideal 500 kN system - 168 mm",
        system: "Manufactured screw pier",
        axialClass: 500,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 500,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
        shaft: "168 x 6.4 CHS",
        diameter: "168 mm OD",
        wall: "6.4 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Helix or plate option",
        helix: "350/450 mm helix or 500 mm plate",
        length: "2.0-6.0 m shafts; max depth up to 20 m",
        extension: "Welded/manufactured extensions",
        soilRequirement: "Rock founding, 1250 kPa+ guide basis",
        installControl: "Project installation pressure/torque and certification required",
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 500 kN for the 168 mm guide row; project design required.",
        note: "Heavy project-specific screw pier. Not a simple catalogue pick without geotechnical and supplier design."
      },
      "ideal-500-219-64": {
        label: "Ideal 500 kN system - 219 x 6.4 mm",
        system: "Manufactured screw pier",
        axialClass: 500,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 500,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
        shaft: "219 x 6.4 CHS",
        diameter: "219 mm OD",
        wall: "6.4 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Helix or plate option",
        helix: "450 mm helix or 600/750 mm plate",
        length: "2.0-6.0 m shafts; max depth up to 30 m",
        extension: "Welded/manufactured extensions",
        soilRequirement: "Rock founding, 1250 kPa+ guide basis",
        installControl: "Project installation pressure/torque and certification required",
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 500 kN for the 219 x 6.4 mm guide row; project design required.",
        note: "Deep heavy-pier option. Confirm the selected plate, shaft length and project resistance."
      },
      "ideal-500-219-82": {
        label: "Ideal 500 kN system - 219 x 8.2 mm",
        system: "Manufactured screw pier",
        axialClass: 500,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 500,
        capacityType: "system-swl-up-to",
        comparisonBasis: "reference",
        shaft: "219 x 8.2 CHS",
        diameter: "219 mm OD",
        wall: "8.2 mm",
        steel: "C350L0 / API 5L / AS 1163 basis",
        helixCount: "Plate option",
        helix: "600 mm plate",
        length: "2.0-6.0 m shafts; max depth up to 30 m",
        extension: "Welded/manufactured extensions",
        soilRequirement: "Rock founding, 1250 kPa+ guide basis",
        installControl: "Project installation pressure/torque and certification required",
        source: "Specifiers Technical Guide v1.2, selection table p. 8",
        defaultSource: "manufacturer",
        capacityBasis: "System SWL up to 500 kN for the 219 x 8.2 mm guide row; project design required.",
        note: "Heavy-wall deep-pier option. Confirm plate geometry, torsional capacity and project resistance."
      }
    }
  },
  blade: {
    label: "Blade Pile",
    sourceUrl: "https://bladepile.com.au/screw-piles/",
    defaultSeries: "blade-76",
    series: {
      "blade-76": {
        label: "Blade Pile 76 mm residential",
        system: "Round-shaft or twin-blade screw pile",
        axialClass: 100,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 100,
        capacityType: "typical-benchmark",
        comparisonBasis: "reference",
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
        capacityBasis: "Commercial range is project-dependent; obtain project compression, tension and horizontal values.",
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
    sourceUrl: "https://www.piletech.com.au/screw-piling",
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
        capacityBasis: "Public range notes high axial-load capability, but no row-specific compression, tension or horizontal resistance is embedded.",
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
    sourceUrl: "https://drivenengineering.com.au/product-category/screw-piles/",
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
    sourceUrl: "https://www.keller.com/expertise/techniques/helical-screw-piles",
    defaultSeries: "keller-typical",
    series: {
      "keller-typical": {
        label: "Keller typical SWL range",
        system: "Engineered helical screw pile",
        axialClass: 300,
        compression: 300,
        uplift: 200,
        lateral: 25,
        capacityType: "typical-benchmark",
        comparisonBasis: "none",
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
    sourceUrl: "https://surefootwa.com.au/wp-content/uploads/2025/03/Indicative-Capacity-table-V8.5-002.pdf",
    series: {
      "surefoot-s150": {
        label: "Surefoot S150 4W - rating 25 kN",
        system: "Steel micro-pile footing",
        axialClass: 25,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 25,
        capacityType: "indicative-rating",
        comparisonBasis: "none",
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
        source: "Indicative Capacity Table V8.5, pp. 1-3",
        defaultSource: "manufacturer",
        capacityBasis: "Maximum recommended system rating; actual gravity and uplift capacities depend on soil and embedment.",
        note: "Alternative steel footing system, not a single screw pile. Use Surefoot/project certificate for uplift, shear and moment."
      },
      "surefoot-t150": {
        label: "Surefoot T150 - rating 35 kN",
        system: "Steel micro-pile footing",
        axialClass: 35,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 35,
        capacityType: "indicative-rating",
        comparisonBasis: "none",
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
        source: "Indicative Capacity Table V8.5, pp. 1-3",
        defaultSource: "manufacturer",
        capacityBasis: "Maximum recommended system rating; actual gravity and uplift capacities depend on soil and embedment.",
        note: "Solar/fencing/decking footing option. Confirm uplift/shear/moment with Surefoot certification."
      },
      "surefoot-s250-8p": {
        label: "Surefoot S250 8P - rating 100 kN",
        system: "Steel micro-pile footing",
        axialClass: 100,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 100,
        capacityType: "indicative-rating",
        comparisonBasis: "none",
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
        source: "Indicative Capacity Table V8.5, pp. 1-3",
        defaultSource: "manufacturer",
        capacityBasis: "Maximum recommended system rating; actual gravity and uplift capacities depend on soil and embedment.",
        note: "Common light pole / camera pole footing option. Bending moment resistance depends on cap, micro-pile layout and soil."
      },
      "surefoot-s400": {
        label: "Surefoot S400 12P - rating 200 kN",
        system: "Steel micro-pile footing",
        axialClass: 200,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 200,
        capacityType: "indicative-rating",
        comparisonBasis: "none",
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
        source: "Indicative Capacity Table V8.5, pp. 1-3",
        defaultSource: "manufacturer",
        capacityBasis: "Maximum recommended system rating; actual gravity and uplift capacities depend on soil and embedment.",
        note: "Higher-load micro-pile footing used for solar, signs, shade and taller poles. Do not treat it as a single screw pile."
      },
      "surefoot-s600": {
        label: "Surefoot S600 16P - rating 300 kN",
        system: "Steel micro-pile footing",
        axialClass: 300,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 300,
        capacityType: "indicative-rating",
        comparisonBasis: "none",
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
        source: "Indicative Capacity Table V8.5, pp. 1-3",
        defaultSource: "manufacturer",
        capacityBasis: "Maximum recommended system rating; actual gravity and uplift capacities depend on soil and embedment.",
        note: "Largest Surefoot option captured here. Use only with supplier design for high bending moment or lateral demand."
      }
    }
  },
  stopdigging: {
    label: "StopDigging AU",
    sourceUrl: "https://stopdigging.com.au/products/product-sheets/",
    series: {
      "sd-sgp-1200": {
        label: "SGP adapter screw 1200",
        system: "Light-duty ground screw",
        axialClass: 12.5,
        compression: 12.5,
        uplift: 6.5,
        lateral: 4.5,
        capacityType: "directional-product",
        comparisonBasis: "reference",
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
        capacityType: "directional-product",
        comparisonBasis: "reference",
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
        capacityType: "directional-product",
        comparisonBasis: "reference",
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
        capacityType: "directional-product",
        comparisonBasis: "reference",
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
    sourceUrl: "https://groundscrews.com.au/products/",
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
    sourceUrl: "https://helicalpilesaustralia.com.au/technical/",
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
        capacityType: "project",
        comparisonBasis: "none",
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
  "screwDemandBasis", "screwProjectCompression", "screwProjectTension", "screwProjectHorizontal", "screwProjectBasis", "screwProjectSource",
  "screwDemandN", "screwDemandVx", "screwDemandVy", "screwDemandMx", "screwDemandMy", "screwDemandTz",
  "screwLayout", "screwPileColumns", "screwPileRows", "screwGroupLengthX", "screwGroupLengthY"
];

const $ = id => document.getElementById(id);
const boltInputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "plateThickness", "plateStrength", "edgeCondition", "edgeDistance", "holeDiameter", "boltPitch", "edgeDistanceBasis", "effectiveEdgeInput", "interfaces", "slipFactor", "holeFactor", "shearDemand", "tensionDemand"];
const beamCustomInputIds = ["beamCustomDepth", "beamCustomFlangeWidth", "beamCustomWebThickness", "beamCustomFlangeThickness"];
const sectionPropertyInputIds = ["sectionWidth", "sectionHeight", "sectionThickness", "sectionDiameter", "sectionDepth", "sectionFlangeWidth", "sectionWebThickness", "sectionFlangeThickness", "sectionLeg", "sectionAngleThickness"];
const toolNames = ["bolt", "member", "beam", "properties", "weld", "concrete", "screw", "rock"];
const toolAliases = { pad: "concrete", axial: "member" };
const publicToolHashes = { concrete: "pad" };
let boltMode = "standard";
let beamSectionType = "ub";
let memberType = "chs";
const manualInputIds = [
  "boltCount", "threadPlanes", "shankPlanes", "plateThickness", "plateStrength", "edgeDistance", "holeDiameter", "boltPitch", "effectiveEdgeInput", "interfaces", "slipFactor", "shearDemand", "tensionDemand",
  "weldLength", "weldRuns", "weldEffectiveThroat", "weldParentThickness", "weldDemand",
  "concreteWidth", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc", "concreteNsv", "concreteSv", "concreteFsyf",
  "layer1Y", "layer1Spacing", "layer1Fsy", "layer1Es", "layer2Y", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Y", "layer3Spacing", "layer3Fsy", "layer3Es", "layer4Y", "layer4Spacing", "layer4Fsy", "layer4Es",
  "beamMomentDemand", "beamShearDemand", "beamCustomDepth", "beamCustomFlangeWidth", "beamCustomWebThickness", "beamCustomFlangeThickness",
  ...sectionPropertyInputIds,
  "screwFilterCompression", "screwFilterTension", "screwCompressionCap", "screwUpliftCap", "screwLateralCap", "screwProjectCompression", "screwProjectTension", "screwProjectHorizontal", "screwDemandN", "screwDemandVx", "screwDemandVy", "screwDemandMx", "screwDemandMy", "screwDemandTz", "screwPileColumns", "screwPileRows", "screwGroupLengthX", "screwGroupLengthY",
  "memberLength", "memberCompressionDemand", "memberTensionDemand", "memberHoleCount", "memberHoleDiameter", "memberHoleThickness", "memberNetArea",
  "memberDimChsD", "memberDimChsT", "memberDimEaB", "memberDimEaT", "memberDimPfcD", "memberDimPfcBf", "memberDimPfcTw", "memberDimPfcTf", "memberDimRodD",
  "memberCustomName", "memberCustomArea", "memberCustomRx", "memberCustomRy", "memberCustomKf", "memberCustomAlphaBx", "memberCustomAlphaBy", "memberCustomLex", "memberCustomLey"
];
const referenceInputIds = [
  "boltSize", "category", "shearPlane", "kr", "edgeCondition", "edgeDistanceBasis", "holeFactor",
  "uBoltApplication", "uBoltRodSize", "uBoltFitFilter", "uBoltFinish", "uBoltManufacturer", "uBoltProduct",
  "weldType", "weldSize", "weldCategory", "weldStrength", "weldLapConnection", "weldParentGrade",
  "concreteDirection", "concreteReoDirection", "concreteDepthBasis", "concreteCrossingBar", "concreteShearReo", "concreteShearBar",
  "layer1Active", "layer1Auto", "layer1Bar", "layer2Active", "layer2Auto", "layer2Bar", "layer3Active", "layer3Auto", "layer3Bar", "layer4Active", "layer4Auto", "layer4Bar",
  "beamSection", "beamGrade", "sectionCatalogueFamily", "sectionCatalogueDesignation", "sectionShape",
  "screwManufacturer", "screwSeries", "screwApplication", "screwCapacitySource", "screwSoil", "screwExposure", "screwInstallEvidence", "screwLateralSensitivity", "screwDemandBasis", "screwProjectBasis", "screwProjectSource", "screwLayout",
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
  const boltPitch = Math.max(0, value("boltPitch"));
  const edgeDistanceBasis = $("edgeDistanceBasis").value;
  const endEffectiveEdge = Math.max(0, actualEdge - holeDiameter / 2 + bolt.d / 2);
  const hasAdjacentHole = count > 1 && boltPitch > 0;
  const pitchEffectiveEdge = hasAdjacentHole ? Math.max(0, boltPitch - holeDiameter + bolt.d / 2) : Infinity;
  const automaticEffectiveEdge = Math.min(endEffectiveEdge, pitchEffectiveEdge);
  const automaticEdgeControl = pitchEffectiveEdge < endEffectiveEdge ? "adjacent hole" : "end edge";
  const boltPitchInput = $("boltPitch");
  const effectiveEdgeInput = $("effectiveEdgeInput");
  boltPitchInput.disabled = count <= 1 || edgeDistanceBasis === "manual";
  effectiveEdgeInput.readOnly = edgeDistanceBasis !== "manual";
  if (edgeDistanceBasis !== "manual") effectiveEdgeInput.value = automaticEffectiveEdge.toFixed(1);
  const effectiveEdge = edgeDistanceBasis === "manual" ? Math.max(0, value("effectiveEdgeInput")) : automaticEffectiveEdge;
  const minimumEdge = value("edgeCondition") * bolt.d;
  const edgeDistancePass = actualEdge >= minimumEdge;
  const plateStrength = value("plateStrength");
  const bearingFull = 0.9 * 3.2 * bolt.d * value("plateThickness") * plateStrength / 1000;
  const bearingEdge = 0.9 * effectiveEdge * value("plateThickness") * plateStrength / 1000;
  const localPlyCapacity = Math.min(bearingFull, bearingEdge);
  const equalShareGroupPlyCapacity = count * localPlyCapacity;
  const preload = category.preload ? bolt[category.preload] : 0;
  const slip = category.type === "friction" ? 0.7 * value("slipFactor") * value("interfaces") * preload * value("holeFactor") : null;
  const slipGroupCapacity = slip === null ? null : count * slip;
  const slipTensionCapacity = preload > 0 ? 0.7 * count * preload : null;
  const designShear = value("shearDemand");
  const designTension = value("tensionDemand");
  const criticalBoltShear = designShear / count;
  const boltShearRatio = groupShear > 0 ? designShear / groupShear : Infinity;
  const plyBearingRatio = localPlyCapacity > 0 ? criticalBoltShear / localPlyCapacity : Infinity;
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
  $("boltResultNote").innerHTML = `One shear-plane &phi;V<sub>f</sub> includes k<sub>rd</sub> = ${(plane === "N" ? threadKrd : shankKrd).toFixed(2)} and k<sub>r</sub> = ${kr.toFixed(2)}. Keep k<sub>r</sub> = 1.0 unless the actual detail is a bolted lap connection requiring the AS 4100 Table 9.2.2.1 reduction referenced by AS 4100 Cl. 9.2.2.1.`;
  $("groupShearCapacity").textContent = `${fixed(groupShear)} kN`;
  $("groupShearBasis").innerHTML = `${count} bolt${count === 1 ? "" : "s"} × (${nThread} N + ${nShank} X) plane${nThread + nShank === 1 ? "" : "s"} per bolt = ${totalThreadPlanes} N + ${totalShankPlanes} X = ${totalShearPlanes} total shear plane${totalShearPlanes === 1 ? "" : "s"}. Equal action per identical bolt is assumed. Change k<sub>r</sub> only for bolted lap connection reduction.`;
  $("bearingGroupCapacity").textContent = `${fixed(equalShareGroupPlyCapacity)} kN`;
  $("bearingGroupBasis").textContent = `Equal-share group · ${fixed(localPlyCapacity)} kN at critical bolt hole × ${count} · ${bearingEdge <= bearingFull ? `${edgeDistanceBasis === "manual" ? "manual a_e" : automaticEdgeControl} governs` : "full bearing governs"}`;
  $("actualEdgeDistance").textContent = fixed(actualEdge);
  $("minimumEdgeDistance").textContent = fixed(minimumEdge);
  $("effectiveEdgeDistance").textContent = fixed(effectiveEdge);
  $("edgeDistanceBasisNote").innerHTML = edgeDistanceBasis === "manual"
    ? `Manual drawing basis: a<sub>e</sub> = <output id="effectiveEdgeDistance">${fixed(effectiveEdge)}</output> mm. Minimum edge-distance compliance still uses e.`
    : hasAdjacentHole
      ? `Automatic: a<sub>e,end</sub> = ${fixed(endEffectiveEdge)} mm; a<sub>e,pitch</sub> = ${fixed(pitchEffectiveEdge)} mm; governing a<sub>e</sub> = <output id="effectiveEdgeDistance">${fixed(effectiveEdge)}</output> mm (${automaticEdgeControl}).`
      : `Automatic: a<sub>e</sub> = e - d<sub>h</sub>/2 + d<sub>f</sub>/2 = <output id="effectiveEdgeDistance">${fixed(effectiveEdge)}</output> mm. Adjacent-hole pitch is not applicable to one bolt.`;
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
    <div><b>Bolt group shear - AS 4100 Cl. 9.2.2.1</b><code>Equal action per identical bolt is assumed. n<sub>n,total</sub> = ${count} x ${nThread} = ${totalThreadPlanes}; n<sub>x,total</sub> = ${count} x ${nShank} = ${totalShankPlanes}; &phi;V<sub>f</sub> = 0.80 x 0.62 x f<sub>uf</sub> x k<sub>r</sub> x (n<sub>n,total</sub>k<sub>rd,N</sub>A<sub>c</sub> + n<sub>x,total</sub>k<sub>rd,X</sub>A<sub>o</sub>) = ${fixed(groupShear)} kN; k<sub>rd,N</sub> = ${threadKrd.toFixed(2)}, k<sub>rd,X</sub> = ${shankKrd.toFixed(2)}; default k<sub>r</sub> = 1.0 unless a bolted lap connection reduction applies</code></div>
    <div><b>Bolt shear ratio - AS 4100 Cl. 9.2.2.1</b><code>V<sub>f</sub><sup>*</sup> / &phi;V<sub>f</sub> = ${fixed(designShear)} / ${fixed(groupShear)} = ${Number.isFinite(boltShearRatio) ? boltShearRatio.toFixed(2) : "-"}</code></div>
    <div><b>Bolt tension ratio - AS 4100 Cl. 9.2.2.2</b><code>N<sub>tf</sub><sup>*</sup> / &phi;N<sub>tf</sub> = ${fixed(designTension)} / ${fixed(count * tension)} = ${Number.isFinite(boltTensionRatio) ? boltTensionRatio.toFixed(2) : "-"}</code></div>
    <div><b>Ply material input</b><code>f<sub>up</sub> = ${plateStrength.toFixed(0)} MPa. Default 410 MPa corresponds to AS/NZS 3678 Grade 250 plate; use 440 MPa only where the actual connected ply is AS/NZS 3679.1 Grade 300 flat bar/section or otherwise verified.</code></div>
    <div><b>Full ply bearing - AS 4100 Cl. 9.2.2.4(1)</b><code>per bolt = 0.90 x 3.2 x d<sub>f</sub> x t<sub>p</sub> x f<sub>up</sub> = ${fixed(bearingFull)} kN</code></div>
    <div><b>Edge-limited ply bearing - AS 4100 Cl. 9.2.2.4(2)</b><code>${edgeDistanceBasis === "manual" ? `manual drawing value a<sub>e</sub> = ${fixed(effectiveEdge)} mm` : hasAdjacentHole ? `a<sub>e,end</sub> = ${fixed(actualEdge)} - ${fixed(holeDiameter)}/2 + ${fixed(bolt.d)}/2 = ${fixed(endEffectiveEdge)} mm; a<sub>e,pitch</sub> = ${fixed(boltPitch)} - ${fixed(holeDiameter)} + ${fixed(bolt.d)}/2 = ${fixed(pitchEffectiveEdge)} mm; ${automaticEdgeControl} governs with a<sub>e</sub> = ${fixed(effectiveEdge)} mm` : `a<sub>e,end</sub> = ${fixed(actualEdge)} - ${fixed(holeDiameter)}/2 + ${fixed(bolt.d)}/2 = ${fixed(effectiveEdge)} mm`}; per critical bolt hole = 0.90 x a<sub>e</sub> x t<sub>p</sub> x f<sub>up</sub> = ${fixed(bearingEdge)} kN</code></div>
    <div><b>Minimum edge - AS 4100 Cl. 9.5.2</b><code>e<sub>min</sub> = ${value("edgeCondition").toFixed(2)}d<sub>f</sub> = ${fixed(minimumEdge)} mm; provided e = ${fixed(actualEdge)} mm - ${edgeDistancePass ? "PASS" : "FAIL"}</code></div>
    <div><b>Connected-ply bearing ratio - AS 4100 Cl. 9.2.2.4</b><code>equal sharing: V<sub>b,bolt</sub><sup>*</sup> = V<sup>*</sup>/n = ${fixed(designShear)}/${count} = ${fixed(criticalBoltShear)} kN; critical-hole capacity = min(${fixed(bearingFull)}, ${fixed(bearingEdge)}) = ${fixed(localPlyCapacity)} kN; equal-share group capacity = ${count} x ${fixed(localPlyCapacity)} = ${fixed(equalShareGroupPlyCapacity)} kN; ratio = ${fixed(designShear)}/${fixed(equalShareGroupPlyCapacity)} = ${Number.isFinite(plyBearingRatio) ? plyBearingRatio.toFixed(2) : "-"}</code></div>
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
  if (!product.publishedCapacity || product.publishedCapacity === "Not published") return "No rated load published";
  return product.publishedCapacity;
}

function publishedLoadLabel(product) {
  if (/working load/i.test(product.publishedCapacity || "")) return "Manufacturer working load";
  if (product.publishedCapacity === "Project-specific") return "Rated load";
  return "Manufacturer-rated load";
}

function calculateUBolt() {
  const product = selectedUBoltProduct();
  if (!product) return;
  const sourceLink = $("uBoltSourceLink");
  const customEntry = product.application === "Custom / project-manufactured";
  const assemblyEntry = product.application === "Beam / channel clamp assembly";
  const familyEntry = /family/i.test(`${product.product} ${product.code}`);

  $("uBoltProductGroupTitle").textContent = customEntry ? "Manufacturing source" : "Product source";
  $("uBoltProductGroupNote").textContent = customEntry
    ? "Select the proposed manufacturer and project-specific entry."
    : "Select the finish, brand or manufacturer, and catalogue entry.";
  $("uBoltProductFieldLabel").textContent = customEntry ? "Manufacturing entry" : "Catalogue entry";
  $("uBoltSelectionTypeLabel").textContent = customEntry
    ? "Selected manufacturing entry"
    : assemblyEntry
      ? "Selected assembly"
      : familyEntry
        ? "Selected product family"
        : "Selected catalogue entry";
  $("uBoltSelectionTitle").textContent = product.product;
  $("uBoltSelectionNote").textContent = `${product.manufacturer} · ${product.series}`;
  $("uBoltCode").textContent = product.code;
  $("uBoltThread").textContent = product.thread;
  $("uBoltFit").textContent = product.fitKey || product.fit;
  $("uBoltMaterial").textContent = product.finish;
  $("uBoltSupplier").textContent = product.supplier || "Not specified";
  $("uBoltPublishedGeometry").textContent = product.fit || product.fitKey || "Not stated";
  $("uBoltPublishedMaterial").textContent = product.material || "Not stated";
  $("uBoltPublishedLoadLabel").textContent = publishedLoadLabel(product);
  $("uBoltPublishedCapacity").textContent = publishedCapacityText(product);
  const directionNote = product.capacityDirection && product.capacityDirection !== "Not published"
    ? `${product.capacityDirection}. `
    : "";
  $("uBoltCapacityBasis").textContent = `${directionNote}${product.capacityBasis}`;
  const sourceStatus = $("uBoltSourceStatus");
  const sourceChecked = product.sourceStatus === "Source_Checked";
  sourceStatus.textContent = sourceChecked ? "Local reference checked" : "Online source only";
  sourceStatus.classList.toggle("is-checked", sourceChecked);
  sourceStatus.href = product.sourceUrl || "#";
  sourceStatus.title = product.sourceName;
  sourceLink.textContent = product.sourceName;
  sourceLink.href = product.sourceUrl || "#";
}

function setBoltMode(mode) {
  boltMode = mode === "ubolt" ? "ubolt" : "standard";
  const uBoltActive = boltMode === "ubolt";
  $("boltToolKicker").textContent = uBoltActive ? "U-bolt products · manufacturer data" : "Bolted connections · AS 4100 Cl. 9.2";
  $("boltToolTitle").textContent = uBoltActive ? "U-bolt Product Lookup" : "Bolt Capacity";
  $("boltToolStatus").textContent = uBoltActive ? "Manufacturer data · no design capacity" : "For Review · AS 4100:2020";
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
  const calculationAvailable = type === "fillet" || type === "ipbw";
  const throat = type === "fillet" ? filletThroat : type === "ipbw" ? effectiveThroat : NaN;
  const capacityPerMm = calculationAvailable ? phi * 0.6 * fuw * throat * kr / 1000 : NaN;
  const capacity = calculationAvailable ? capacityPerMm * length * runs : NaN;
  const parentPerMm = parentPhi * 0.6 * parentGrade.fup * parentThickness / 1000;
  const parentCheckActive = parentThickness > 0;
  const parentGoverns = calculationAvailable && parentCheckActive && parentPerMm < capacityPerMm;
  const demand = value("weldDemand");
  const utilisation = calculationAvailable && capacity > 0 ? demand / capacity : Infinity;
  const hasDemand = demand > 0;
  const callouts = {
    fillet: `${size} mm CFW, category ${category}, f_uw ${fuw} MPa`,
    cpbw: `CPBW, category ${category}; design to weaker joined part`,
    ipbw: `IPBW, a_w ${effectiveThroat.toFixed(1)} mm, category ${category}, f_uw ${fuw} MPa`,
    compound: `Compound weld; total design throat to be project-defined`
  };

  $("weldSizeField").hidden = type !== "fillet";
  $("weldThroatField").hidden = type !== "ipbw";

  $("weldCallout").textContent = callouts[type] || callouts.fillet;
  $("weldTypeValue").textContent = typeData.label;
  $("weldThroatValue").textContent = calculationAvailable ? `${fixed2(throat)} mm` : "Project-defined";
  $("weldLengthValue").textContent = `${fixed(length)} mm`;
  $("weldRunsValue").textContent = String(runs);
  $("weldPhiValue").textContent = type === "compound" ? "-" : phi.toFixed(2);
  $("weldCapacityLabel").textContent = calculationAvailable
    ? "Capacity per mm per weld line"
    : type === "cpbw"
      ? "Capacity governed by weaker joined part"
      : "Project-specific capacity required";
  $("weldCapacityBasis").innerHTML = calculationAvailable
    ? `${typeData.scope}; ${category}; &phi; = ${phi.toFixed(2)} from AS 4100 Table 3.4`
    : type === "cpbw"
      ? "AS 4100 Cl. 9.6.2.7; joined-part capacity is not defined by this weld-metal input set"
      : "AS 4100 Cl. 9.6.5.2; total design throat requires the actual compound-weld geometry";
  $("weldCapacity").textContent = calculationAvailable ? fixed(capacity) : "Not evaluated";
  $("weldCapacityPerMm").textContent = calculationAvailable ? capacityPerMm.toFixed(2) : "Not evaluated";
  $("weldCapacityUnit").hidden = !calculationAvailable;
  $("weldTotalCapacityUnit").hidden = !calculationAvailable;
  $("parentGoverningPerMm").textContent = parentCheckActive ? fixed2(parentPerMm) : "-";
  $("parentGoverningNote").textContent = !parentCheckActive
    ? "enter ply thickness"
    : !calculationAvailable
      ? "warning only; not the required joined-part capacity check"
    : parentGoverns
      ? `warning only; parent screen lower, f_up ${parentGrade.fup} MPa`
      : "warning only; weld capacity governs";
  $("parentGoverningNote").className = !parentCheckActive || !calculationAvailable ? "" : parentGoverns ? "fail" : "pass";
  $("weldUtilisation").textContent = !calculationAvailable || !hasDemand ? "\u2014" : utilisation.toFixed(2);
  $("weldStatus").textContent = !calculationAvailable ? "Not evaluated" : !hasDemand ? "No design action" : utilisation <= 1 ? "PASS" : "FAIL";
  $("weldStatus").className = !calculationAvailable || !hasDemand ? "check" : utilisation <= 1 ? "pass" : "fail";

  if (calculationAvailable) {
    $("weldFormulaSteps").innerHTML = `
      <div><b>Selected weld</b><code>${typeData.label}: ${typeData.scope}</code></div>
      <div><b>Design throat thickness</b><code>t<sub>t</sub> = ${type === "fillet" ? `0.707 x ${size.toFixed(0)}` : effectiveThroat.toFixed(1)} = ${fixed2(throat)} mm</code></div>
      <div><b>Per-mm design capacity</b><code>&phi;R / l<sub>w</sub> = ${phi.toFixed(2)} x 0.6 x ${fuw.toFixed(0)} x ${fixed2(throat)} x k<sub>r</sub> (${kr.toFixed(2)}) / 1000 = ${capacityPerMm.toFixed(2)} kN/mm per weld line</code></div>
      <div><b>Welded-lap reduction</b><code>${lapReductionActive ? `AS 4100 Table 9.6.3.10(B); l<sub>w</sub> = ${fixed(length)} mm = ${(length / 1000).toFixed(2)} m, k<sub>r</sub> = ${kr.toFixed(2)}` : "Not applied. The welded-lap option is No or the weld type is not a fillet weld."}</code></div>
      <div><b>Total weld capacity</b><code>${capacityPerMm.toFixed(2)} kN/mm x ${fixed(length)} mm x ${runs} effective weld line${runs === 1 ? "" : "s"} = ${fixed(capacity)} kN. Effective weld lines are not welding passes.</code></div>
      <div><b>Parent metal screen</b><code>${parentCheckActive ? `0.90 x 0.6 x f<sub>up</sub> (${parentGrade.fup} MPa, ${parentGrade.standard}) x ${fixed2(parentThickness)} / 1000 = ${fixed2(parentPerMm)} kN/mm. Warning only.` : "Not checked. Enter ply thickness if required."}</code></div>
      <div><b>Design boundary</b><code>${callouts[type] || callouts.fillet}. Capacity view only; not a full welded-joint design check. Excludes weld groups, connected-part rupture, HAZ, joint preparation, WPS, inspection, fatigue and effective-length rules beyond the entered l<sub>w</sub>.</code></div>`;
  } else {
    const capacityRule = type === "cpbw"
      ? `AS 4100 Cl. 9.6.2.7 takes CPBW design capacity as the nominal capacity of the weaker joined part multiplied by the appropriate capacity factor. The weaker-part resistance is not defined by weld-metal strength and throat alone.`
      : `AS 4100 Cl. 9.6.5.2 defines compound-weld throat from the actual total weld cross-section. It is not a<sub>w</sub> + 0.707s; the present inputs cannot establish that geometry.`;
    $("weldFormulaSteps").innerHTML = `
      <div><b>Selected weld</b><code>${typeData.label}: ${typeData.scope}</code></div>
      <div><b>Normative capacity basis</b><code>${capacityRule}</code></div>
      <div><b>Result</b><code>Not evaluated. No capacity or PASS/FAIL is reported for this weld type.</code></div>
      <div><b>Required project information</b><code>${type === "cpbw" ? "Define the weaker joined part, applicable limit state, material strength, net/gross section and appropriate AS 4100 capacity factor." : "Define the prepared joint and total weld cross-section, then determine the design throat in accordance with AS 4100 Cl. 9.6.5.2."}</code></div>
      <div><b>Design boundary</b><code>WPS, preparation, backing or gouging, inspection, acceptance criteria, fatigue, HAZ and connected-part limit states remain project-specific.</code></div>`;
  }
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

const sectionShapeNames = {
  rectangle: "Rectangle",
  rhs: "RHS / SHS",
  circle: "Solid circle",
  chs: "CHS",
  i: "Symmetric I-section",
  angle: "Equal angle",
  channel: "Channel"
};

const sectionCatalogueFamilyNames = {
  pfc: "PFC",
  ub: "UB",
  uc: "UC",
  chs: "CHS",
  ea: "Equal angle",
  rod: "Round bar"
};

function sectionPowerValue(number) {
  const amount = Number(number);
  if (!Number.isFinite(amount) || amount < 0) return "—";
  const exponent = amount >= 1e9 ? 9 : amount >= 1e6 ? 6 : amount >= 1e3 ? 3 : 0;
  if (!exponent) return amount.toLocaleString("en-AU", { maximumFractionDigits: 1 });
  const coefficient = amount / 10 ** exponent;
  const maximumFractionDigits = coefficient >= 100 ? 1 : coefficient >= 10 ? 2 : 3;
  return `${coefficient.toLocaleString("en-AU", { maximumFractionDigits })} × 10<sup>${exponent}</sup>`;
}

function sectionSignedPowerValue(number) {
  const amount = Number(number);
  if (!Number.isFinite(amount)) return "—";
  if (amount === 0) return "0";
  return `${amount < 0 ? "−" : ""}${sectionPowerValue(Math.abs(amount))}`;
}

function currentSectionGeometry() {
  const shape = $("sectionShape").value;
  if (shape === "rectangle") return SectionGeometry.rectangle(value("sectionWidth"), value("sectionHeight"));
  if (shape === "rhs") return SectionGeometry.rectangularHollow(value("sectionWidth"), value("sectionHeight"), value("sectionThickness"));
  if (shape === "circle") return SectionGeometry.circle(value("sectionDiameter"));
  if (shape === "chs") return SectionGeometry.circularHollow(value("sectionDiameter"), value("sectionThickness"));
  if (shape === "i") return SectionGeometry.symmetricI(value("sectionDepth"), value("sectionFlangeWidth"), value("sectionWebThickness"), value("sectionFlangeThickness"));
  if (shape === "angle") return SectionGeometry.equalAngle(value("sectionLeg"), value("sectionAngleThickness"));
  return SectionGeometry.channel(value("sectionDepth"), value("sectionFlangeWidth"), value("sectionWebThickness"), value("sectionFlangeThickness"));
}

function sectionDimensionText(shape) {
  if (shape === "rectangle") return `b = ${formatDimension(value("sectionWidth"))} mm; h = ${formatDimension(value("sectionHeight"))} mm`;
  if (shape === "rhs") return `b = ${formatDimension(value("sectionWidth"))} mm; h = ${formatDimension(value("sectionHeight"))} mm; t = ${formatDimension(value("sectionThickness"))} mm`;
  if (shape === "circle") return `D = ${formatDimension(value("sectionDiameter"))} mm`;
  if (shape === "chs") return `D = ${formatDimension(value("sectionDiameter"))} mm; t = ${formatDimension(value("sectionThickness"))} mm`;
  if (shape === "angle") return `b = ${formatDimension(value("sectionLeg"))} mm; t = ${formatDimension(value("sectionAngleThickness"))} mm`;
  return `d = ${formatDimension(value("sectionDepth"))} mm; b<sub>f</sub> = ${formatDimension(value("sectionFlangeWidth"))} mm; t<sub>w</sub> = ${formatDimension(value("sectionWebThickness"))} mm; t<sub>f</sub> = ${formatDimension(value("sectionFlangeThickness"))} mm`;
}

function sectionCompositionText(shape) {
  if (shape === "rectangle") return "Single solid rectangle.";
  if (shape === "rhs") return "Outside rectangle minus the concentric inside rectangle.";
  if (shape === "circle") return "Single solid circle.";
  if (shape === "chs") return "Outside circle minus the concentric inside circle.";
  if (shape === "i") return "Two flange rectangles plus the clear web rectangle.";
  if (shape === "angle") return "Two leg rectangles minus their overlapping corner square.";
  return "Two flange rectangles plus the clear web rectangle.";
}

function customSectionRatios(shape) {
  if (shape === "rectangle") return [{ label: "b/h", value: value("sectionWidth") / value("sectionHeight") }];
  if (shape === "rhs") return [
    { label: "h/t", value: value("sectionHeight") / value("sectionThickness") },
    { label: "b/t", value: value("sectionWidth") / value("sectionThickness") }
  ];
  if (shape === "chs") return [{ label: "D/t", value: value("sectionDiameter") / value("sectionThickness") }];
  if (shape === "i") return [
    { label: "(d−2tf)/tw", value: (value("sectionDepth") - 2 * value("sectionFlangeThickness")) / value("sectionWebThickness") },
    { label: "(bf−tw)/2tf", value: (value("sectionFlangeWidth") - value("sectionWebThickness")) / (2 * value("sectionFlangeThickness")) }
  ];
  if (shape === "channel") return [
    { label: "(d−2tf)/tw", value: (value("sectionDepth") - 2 * value("sectionFlangeThickness")) / value("sectionWebThickness") },
    { label: "(bf−tw)/tf", value: (value("sectionFlangeWidth") - value("sectionWebThickness")) / value("sectionFlangeThickness") }
  ];
  if (shape === "angle") return [{ label: "b/t", value: value("sectionLeg") / value("sectionAngleThickness") }];
  return [];
}

function renderSectionRatios(ratios) {
  const valid = (ratios || []).filter(item => Number.isFinite(item.value) && item.value > 0);
  const values = valid.length
    ? valid.map(item => `${safeText(item.label)} = ${item.value.toLocaleString("en-AU", { maximumFractionDigits: 2 })}`).join("; ")
    : "Not applicable to the selected geometry";
  $("sectionGeometricRatios").innerHTML = `<b>Geometric ratios</b> &mdash; ${values}. No section classification is assigned.`;
}

function sectionDrawingFromInputs(shape) {
  if (shape === "rectangle") return { shape, b: value("sectionWidth"), h: value("sectionHeight") };
  if (shape === "rhs") return { shape, b: value("sectionWidth"), h: value("sectionHeight"), t: value("sectionThickness") };
  if (shape === "circle") return { shape, D: value("sectionDiameter") };
  if (shape === "chs") return { shape, D: value("sectionDiameter"), t: value("sectionThickness") };
  if (shape === "angle") return { shape, b: value("sectionLeg"), t: value("sectionAngleThickness") };
  return {
    shape,
    d: value("sectionDepth"),
    bf: value("sectionFlangeWidth"),
    tw: value("sectionWebThickness"),
    tf: value("sectionFlangeThickness")
  };
}

function idealDrawingProperties(drawing) {
  if (drawing.shape === "rectangle") return SectionGeometry.rectangle(drawing.b, drawing.h);
  if (drawing.shape === "rhs") return SectionGeometry.rectangularHollow(drawing.b, drawing.h, drawing.t);
  if (drawing.shape === "circle") return SectionGeometry.circle(drawing.D);
  if (drawing.shape === "chs") return SectionGeometry.circularHollow(drawing.D, drawing.t);
  if (drawing.shape === "i") return SectionGeometry.symmetricI(drawing.d, drawing.bf, drawing.tw, drawing.tf);
  if (drawing.shape === "angle") return SectionGeometry.equalAngle(drawing.b, drawing.t);
  return SectionGeometry.channel(drawing.d, drawing.bf, drawing.tw, drawing.tf);
}

function renderSectionPropertiesDiagram(drawing, properties, title, catalogueMode = false) {
  const svg = $("sectionPropertiesDiagram");
  const shape = drawing.shape;
  const width = shape === "rectangle" || shape === "rhs" ? drawing.b
    : shape === "circle" || shape === "chs" ? drawing.D
      : shape === "angle" ? drawing.b : drawing.bf;
  const height = shape === "rectangle" || shape === "rhs" ? drawing.h
    : shape === "circle" || shape === "chs" ? drawing.D
      : shape === "angle" ? drawing.b : drawing.d;
  if (!(width > 0) || !(height > 0)) return;

  const scale = Math.min(108 / width, 112 / height);
  const drawnWidth = width * scale;
  const drawnHeight = height * scale;
  const x0 = 120 - drawnWidth / 2;
  const y0 = 82 - drawnHeight / 2;
  const limitThickness = number => {
    const maximum = Math.min(drawnWidth, drawnHeight) * 0.24;
    return Math.max(Math.min(4, maximum), Math.min(number * scale, maximum));
  };
  const line = number => Number(number).toFixed(2);
  let geometryMarkup = "";

  if (shape === "rectangle") {
    geometryMarkup = `<rect class="section-properties-shape" x="${line(x0)}" y="${line(y0)}" width="${line(drawnWidth)}" height="${line(drawnHeight)}" rx="1" />`;
  } else if (shape === "rhs") {
    const t = limitThickness(drawing.t);
    geometryMarkup = `<path class="section-properties-shape" fill-rule="evenodd" d="M ${line(x0)} ${line(y0)} H ${line(x0 + drawnWidth)} V ${line(y0 + drawnHeight)} H ${line(x0)} Z M ${line(x0 + t)} ${line(y0 + t)} V ${line(y0 + drawnHeight - t)} H ${line(x0 + drawnWidth - t)} V ${line(y0 + t)} Z" />`;
  } else if (shape === "circle" || shape === "chs") {
    const radius = drawnWidth / 2;
    geometryMarkup = `<circle class="section-properties-shape" cx="120" cy="82" r="${line(radius)}" />`;
    if (shape === "chs") {
      const innerRadius = Math.max(1, radius - limitThickness(drawing.t));
      geometryMarkup += `<circle class="section-properties-void" cx="120" cy="82" r="${line(innerRadius)}" />`;
    }
  } else if (shape === "i") {
    const tw = limitThickness(drawing.tw);
    const tf = limitThickness(drawing.tf);
    const webLeft = x0 + (drawnWidth - tw) / 2;
    const webRight = webLeft + tw;
    geometryMarkup = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + drawnWidth)} V ${line(y0 + tf)} H ${line(webRight)} V ${line(y0 + drawnHeight - tf)} H ${line(x0 + drawnWidth)} V ${line(y0 + drawnHeight)} H ${line(x0)} V ${line(y0 + drawnHeight - tf)} H ${line(webLeft)} V ${line(y0 + tf)} H ${line(x0)} Z" />`;
  } else if (shape === "angle") {
    const t = limitThickness(drawing.t);
    geometryMarkup = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + drawnWidth)} V ${line(y0 + t)} H ${line(x0 + t)} V ${line(y0 + drawnHeight)} H ${line(x0)} Z" />`;
  } else {
    const tw = limitThickness(drawing.tw);
    const tf = limitThickness(drawing.tf);
    geometryMarkup = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + drawnWidth)} V ${line(y0 + tf)} H ${line(x0 + tw)} V ${line(y0 + drawnHeight - tf)} H ${line(x0 + drawnWidth)} V ${line(y0 + drawnHeight)} H ${line(x0)} Z" />`;
  }

  const coordinateValue = property => {
    const raw = property && typeof property === "object" ? property.value : property;
    return raw === null || raw === undefined || raw === "" ? NaN : Number(raw);
  };
  const suppliedCx = coordinateValue(properties?.cx);
  const suppliedCy = coordinateValue(properties?.cy);
  const missingCx = !Number.isFinite(suppliedCx);
  const missingCy = !Number.isFinite(suppliedCy);
  const indicative = missingCx || missingCy;
  const idealProperties = indicative ? idealDrawingProperties(drawing) : null;
  const cx = missingCx ? coordinateValue(idealProperties?.cx) : suppliedCx;
  const cy = missingCy ? coordinateValue(idealProperties?.cy) : suppliedCy;
  const axisX = x0 + cx * scale;
  const axisY = y0 + drawnHeight - cy * scale;
  const xStart = Math.max(12, x0 - 18);
  const xEnd = Math.min(226, x0 + drawnWidth + 21);
  const yStart = Math.min(154, y0 + drawnHeight + 17);
  const yEnd = Math.max(10, y0 - 18);
  const angleAxes = shape === "angle";
  const horizontalAxis = angleAxes ? "n" : "x";
  const verticalAxis = angleAxes ? "p" : "y";
  const axisDescription = missingCx && missingCy
    ? "indicative x-x and y-y axis positions"
    : missingCx
      ? "a centroidal x-x axis and indicative y-y axis position"
      : missingCy
        ? "an indicative x-x axis position and centroidal y-y axis"
        : "centroidal x-x and y-y axes";
  const indicativeCaption = missingCx && missingCy
    ? "x-x / y-y positions indicative"
    : missingCx
      ? "y-y position indicative"
      : "x-x position indicative";
  const description = angleAxes
    ? `${title} schematic showing horizontal n-n and vertical p-p centroidal axes, with principal x-x and y-y axes at 45 degrees. ${indicative ? "The centroid position is indicative." : ""}`
    : `${title} schematic showing ${axisDescription}.`;
  const principalHalfLength = 34;
  const anglePrincipalMarkup = angleAxes ? `
    <line class="section-properties-principal-axis" x1="${line(axisX - principalHalfLength)}" y1="${line(axisY + principalHalfLength)}" x2="${line(axisX + principalHalfLength)}" y2="${line(axisY - principalHalfLength)}" />
    <line class="section-properties-principal-axis" x1="${line(axisX - principalHalfLength)}" y1="${line(axisY - principalHalfLength)}" x2="${line(axisX + principalHalfLength)}" y2="${line(axisY + principalHalfLength)}" />
    <text class="section-properties-principal-axis-label" x="${line(axisX + principalHalfLength + 3)}" y="${line(axisY - principalHalfLength + 3)}">x</text>
    <text class="section-properties-principal-axis-label" x="${line(axisX + principalHalfLength + 3)}" y="${line(axisY + principalHalfLength + 3)}">y</text>` : "";

  svg.innerHTML = `
    <title id="sectionPropertiesDiagramTitle">${safeText(title)} section and axis convention</title>
    <desc id="sectionPropertiesDiagramDescription">${safeText(description)}</desc>
    ${geometryMarkup}
    <line class="section-properties-axis" x1="${line(xStart)}" y1="${line(axisY)}" x2="${line(xEnd)}" y2="${line(axisY)}" />
    <line class="section-properties-axis" x1="${line(axisX)}" y1="${line(yStart)}" x2="${line(axisX)}" y2="${line(yEnd)}" />
    ${anglePrincipalMarkup}
    <circle class="section-properties-centroid" cx="${line(axisX)}" cy="${line(axisY)}" r="3.4" />
    <text class="section-properties-axis-label" x="${line(xStart)}" y="${line(axisY - 7)}">${horizontalAxis}</text>
    <text class="section-properties-axis-label" x="${line(xEnd)}" y="${line(axisY - 7)}" text-anchor="end">${horizontalAxis}</text>
    <text class="section-properties-axis-label" x="${line(axisX + 7)}" y="${line(yEnd + 10)}">${verticalAxis}</text>
    <text class="section-properties-axis-label" x="${line(axisX + 7)}" y="${line(yStart)}">${verticalAxis}</text>
    <text class="section-properties-centroid-label" x="${line(axisX + 7)}" y="${line(axisY + 13)}">C</text>`;
  $("sectionPropertiesDiagramCaption").textContent = angleAxes
    ? `${catalogueMode ? "Selected" : "Entered"} dimensions · p/n centroidal · x/y principal${indicative ? " · C indicative" : ""}`
    : indicative
    ? `Schematic only · ${indicativeCaption}`
    : catalogueMode
      ? "Selected dimensions · centroidal x-x / y-y axes"
      : "Entered dimensions · centroidal x-x / y-y axes";
}

function selectedSectionCatalogueFamily() {
  return sectionCatalogueFamilies.find(family => family.key === $("sectionCatalogueFamily").value) || sectionCatalogueFamilies[0];
}

function selectedSectionCatalogueRecord() {
  const family = selectedSectionCatalogueFamily();
  return family.sections.find(section => section.id === $("sectionCatalogueDesignation").value) || family.sections[0];
}

function populateSectionCatalogueFamilies() {
  $("sectionCatalogueFamily").innerHTML = sectionCatalogueFamilies
    .map(family => `<option value="${family.key}">${safeText(family.label)}</option>`)
    .join("");
  $("sectionCatalogueFamily").value = "pfc";
  populateSectionCatalogueDesignations(false);
}

function populateSectionCatalogueDesignations(recalculate = true) {
  const family = selectedSectionCatalogueFamily();
  $("sectionCatalogueDesignation").innerHTML = family.sections
    .map(section => `<option value="${safeText(section.id)}">${safeText(section.designation)}</option>`)
    .join("");
  if (family.sections.length) $("sectionCatalogueDesignation").value = family.sections[0].id;
  if (recalculate) calculateSectionProperties();
}

function setSectionPropertyMode(mode) {
  sectionPropertiesMode = mode === "custom" ? "custom" : "catalogue";
  document.querySelectorAll(".section-properties-mode").forEach(button => {
    const active = button.dataset.sectionPropertiesMode === sectionPropertiesMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $("sectionCatalogueGroup").hidden = sectionPropertiesMode !== "catalogue";
  $("sectionCustomGroup").hidden = sectionPropertiesMode !== "custom";
  calculateSectionProperties();
}

function setSectionSummary(label, name, dimensions, metrics) {
  $("sectionSelectionLabel").textContent = label;
  $("sectionGeometryName").textContent = name;
  $("sectionGeometryDimensions").innerHTML = dimensions;
  metrics.forEach((metric, index) => {
    const key = ["One", "Two", "Three", "Four"][index];
    $(`sectionMetric${key}Label`).innerHTML = metric.label;
    $(`sectionMetric${key}`).innerHTML = metric.value;
  });
}

function sectionBasisLabel(property, plural = false) {
  if (!property || property.value === null) return SectionCatalogue.BASIS.unavailable;
  const label = SectionCatalogue.BASIS[property.basis] || property.basis;
  return plural && label.endsWith("value") ? `${label}s` : label;
}

function setSectionPropertyOutput(outputId, basisId, property, kind) {
  const output = $(outputId);
  const basis = $(basisId);
  if (!property || property.value === null || !Number.isFinite(property.value)) {
    output.innerHTML = "&mdash;";
    basis.textContent = SectionCatalogue.BASIS.unavailable;
    basis.classList.add("unavailable");
    return;
  }
  if (kind === "area") output.textContent = property.value.toLocaleString("en-AU", { maximumFractionDigits: 1 });
  else if (kind === "decimal") output.textContent = property.value.toLocaleString("en-AU", { maximumFractionDigits: 2 });
  else if (kind === "signed-power") output.innerHTML = sectionSignedPowerValue(property.value);
  else output.innerHTML = sectionPowerValue(property.value);
  basis.textContent = sectionBasisLabel(property);
  basis.classList.remove("unavailable");
}

function setSectionPropertyPair(primaryId, secondaryId, basisId, primary, secondary, kind) {
  setSectionPropertyOutput(primaryId, basisId, primary, kind);
  const output = $(secondaryId);
  if (!secondary || secondary.value === null || !Number.isFinite(secondary.value)) {
    output.innerHTML = "—";
    return;
  }
  output.innerHTML = kind === "decimal"
    ? secondary.value.toLocaleString("en-AU", { maximumFractionDigits: 2 })
    : sectionPowerValue(secondary.value);
}

function setSectionDirectionalProperty(axis, primary, alternate, primaryLabel, alternateLabel) {
  const primaryId = axis === "x" ? "sectionZx" : "sectionZy";
  const basisId = axis === "x" ? "sectionZxBasis" : "sectionZyBasis";
  const directionId = axis === "x" ? "sectionZxDirection" : "sectionZyDirection";
  const alternateWrapId = axis === "x" ? "sectionZxAltWrap" : "sectionZyAltWrap";
  const alternateDirectionId = axis === "x" ? "sectionZxAltDirection" : "sectionZyAltDirection";
  const alternateOutputId = axis === "x" ? "sectionZxAlt" : "sectionZyAlt";
  setSectionPropertyOutput(primaryId, basisId, primary, "power");
  const distinctAlternate = Number.isFinite(alternate?.value)
    && (!Number.isFinite(primary?.value) || Math.abs(alternate.value - primary.value) > Math.max(1, Math.abs(primary.value)) * 1e-9);
  $(directionId).textContent = primaryLabel;
  $(alternateDirectionId).textContent = alternateLabel;
  $(directionId).hidden = !distinctAlternate;
  $(alternateWrapId).hidden = !distinctAlternate;
  $(alternateOutputId).innerHTML = distinctAlternate ? sectionPowerValue(alternate.value) : "—";
}

function setSectionDirectionalZx(primary, alternate) {
  setSectionDirectionalProperty("x", primary, alternate, "T", "B");
}

function setSectionDirectionalZy(primary, alternate) {
  setSectionDirectionalProperty("y", primary, alternate, "R", "L");
}

function setSectionDirectionalAw(primary, alternate, directional) {
  setSectionPropertyOutput("sectionAw", "sectionAwBasis", primary, "area");
  const hasAlternate = directional && Number.isFinite(alternate?.value);
  $("sectionAwDirection").hidden = !hasAlternate;
  $("sectionAwAltWrap").hidden = !hasAlternate;
  $("sectionAwAlt").textContent = hasAlternate
    ? alternate.value.toLocaleString("en-AU", { maximumFractionDigits: 1 })
    : "—";
}

function sectionPropertyStep(label, property, unit, signed = false) {
  if (!property || property.value === null) {
    return `<div><b>${label}</b><code>${SectionCatalogue.BASIS.unavailable}.</code></div>`;
  }
  const valueText = ["mm²", "mm", "kg/m"].includes(unit)
    ? property.value.toLocaleString("en-AU", { maximumFractionDigits: 1 })
    : signed ? sectionSignedPowerValue(property.value) : sectionPowerValue(property.value);
  return `<div><b>${label}</b><code>${sectionBasisLabel(property)}: ${valueText} ${unit}.</code></div>`;
}

function configureSectionPropertyPresentation(shape, catalogueMode) {
  const angleAxes = shape === "angle";
  $("sectionAreaLabel").innerHTML = catalogueMode ? "Gross area <i>A<sub>g</sub></i>" : "Gross area <i>A</i>";
  $("sectionAxisOneHeader").textContent = angleAxes ? "n-n axis" : "x-x axis";
  $("sectionAxisTwoHeader").textContent = angleAxes ? "p-p axis" : "y-y axis";
  $("sectionIxyLabel").innerHTML = angleAxes ? "Product of inertia <i>I<sub>np</sub></i>" : "Product of inertia <i>I<sub>xy</sub></i>";
  ["sectionPrincipalAxisOne", "sectionPrincipalRadiusOne"].forEach(id => { $(id).textContent = angleAxes ? "x" : "u"; });
  ["sectionPrincipalAxisTwo", "sectionPrincipalRadiusTwo"].forEach(id => { $(id).textContent = angleAxes ? "y" : "v"; });
  $("sectionThetaLabel").innerHTML = angleAxes ? "Principal-axis angle <i>&theta;<sub>x</sub></i>" : "Principal-axis angle <i>&theta;<sub>u</sub></i>";
  $("sectionAwLabel").innerHTML = shape === "rhs"
    ? "Wall reference areas <i>A<sub>wy</sub></i> / <i>A<sub>wx</sub></i>"
    : shape === "i" || shape === "channel"
      ? "Clear web area <i>A<sub>w</sub></i>"
      : "Shear reference area";
}

function sectionPropertyNumber(property) {
  const raw = property && typeof property === "object" ? property.value : property;
  return raw === null || raw === undefined || raw === "" ? NaN : Number(raw);
}

function configureSectionPropertyHierarchy(shape, catalogueMode, familyKey = "custom") {
  const angle = shape === "angle";
  const isotropic = shape === "circle" || shape === "chs";
  const openSection = shape === "channel";
  $("sectionPropertyResults").dataset.sectionLayout = angle ? "angle" : isotropic ? "isotropic" : openSection ? "open" : "orthogonal";

  $("sectionResultContext").textContent = angle
    ? "Centroidal n-p and principal x-y · mm units"
    : isotropic
      ? "Rotationally symmetric · mm units"
      : openSection
        ? "Open section · mm units"
        : "Centroidal x-y · mm units";

  $("sectionCoreHeading").textContent = angle
    ? catalogueMode ? "Product geometry and centroid" : "Gross angle and centroid"
    : isotropic
      ? "Gross circular section"
      : familyKey === "pfc"
        ? "Gross section and reference locations"
        : "Gross section and centroid";
  $("sectionCoreDescription").textContent = angle && catalogueMode
    ? "Catalogue mass, gross area, actual product geometry and centroid distances."
    : isotropic
      ? "Mass, gross area and centre coordinates from the lower-left geometry datum."
      : familyKey === "pfc"
        ? "Catalogue mass and area, with XL locating the centroid from the back of the web."
        : "Mass, gross area and centroid coordinates from the geometry datum.";

  $("sectionAxisHeading").textContent = angle
    ? "Centroidal n-n / p-p properties"
    : isotropic
      ? "Any centroidal diameter"
      : "Centroidal x-x / y-y properties";
  $("sectionAxisDescription").textContent = angle
    ? "Leg-parallel centroidal axes; these are not the principal x-x / y-y axes."
    : isotropic
      ? "Rotational symmetry gives the same I, Z, S and r about every centroidal diameter."
      : openSection
        ? "Properties about the displayed centroidal axes; directional Z retains the applicable edge."
        : "Second moments, section moduli and radii about the displayed centroidal axes.";
  if (isotropic) {
    $("sectionAxisOneHeader").textContent = "Any centroidal axis";
    $("sectionAxisTwoHeader").textContent = "Equivalent axis";
  }

  $("sectionSupplementaryTitle").textContent = angle
    ? "Torsion and geometric references"
    : openSection
      ? "Torsion, warping, shear centre and web reference"
      : isotropic
        ? "Circular-section constants"
        : "Torsion, warping and shear references";
  $("sectionSupplementaryDescription").textContent = "Only properties applicable to the selected section family are shown.";

  $("sectionPrincipalTitle").textContent = angle ? "Principal x-x / y-y properties" : "Displayed-axis relationship";
  $("sectionPrincipalDescription").textContent = angle
    ? "Catalogue principal properties at 45° to the n-p axes, including the non-zero product of inertia."
    : isotropic
      ? "Rotational symmetry makes every centroidal diameter a principal axis."
      : "Symmetry establishes whether the displayed centroidal axes are principal.";
  ["sectionPrincipalInertiaCard", "sectionPrincipalRadiusCard", "sectionPrincipalAngleCard"].forEach(id => {
    $(id).hidden = !angle;
  });
  $("sectionPrincipalProperties").dataset.mode = angle ? "principal" : "relationship";
}

function configureSectionSpecificProperties(properties, shape) {
  const isotropic = shape === "circle" || shape === "chs";
  const j = sectionPropertyNumber(properties?.j);
  const jp = sectionPropertyNumber(properties?.jp);
  const cardVisibility = {
    sectionJCard: Number.isFinite(j),
    sectionIwCard: Number.isFinite(sectionPropertyNumber(properties?.iw)),
    sectionXoCard: Number.isFinite(sectionPropertyNumber(properties?.xo)),
    sectionAwCard: Number.isFinite(sectionPropertyNumber(shape === "rhs" ? properties?.awy : properties?.aw))
      || Number.isFinite(sectionPropertyNumber(properties?.awx)),
    sectionJpCard: Number.isFinite(jp) && !(isotropic && Number.isFinite(j) && Math.abs(jp - j) <= Math.max(1, Math.abs(j)) * 1e-9)
  };
  Object.entries(cardVisibility).forEach(([id, visible]) => { $(id).hidden = !visible; });
  const hasSupplementary = Object.values(cardVisibility).some(Boolean);
  $("sectionSupplementaryHeading").hidden = !hasSupplementary;
  $("sectionSupplementaryProperties").hidden = !hasSupplementary;

  const hasIxy = Number.isFinite(sectionPropertyNumber(properties?.ixy));
  $("sectionPrincipalHeading").hidden = !hasIxy;
  $("sectionPrincipalProperties").hidden = !hasIxy;
}

function setSectionIxyInterpretation(property, shape) {
  const interpretation = $("sectionIxyInterpretation");
  if (!property || property.value === null || !Number.isFinite(property.value)) {
    interpretation.textContent = "Not available for this catalogue row";
    interpretation.dataset.state = "unavailable";
    return;
  }
  if (Math.abs(property.value) <= 1e-9) {
    interpretation.textContent = shape === "circle" || shape === "chs"
      ? "Zero by rotational symmetry · every centroidal diameter is principal"
      : "Zero by symmetry · displayed axes are principal; principal values equal the x-y table";
    interpretation.dataset.state = "zero";
    return;
  }
  interpretation.textContent = shape === "angle"
    ? "Non-zero · n-p axes are not principal"
    : "Non-zero · use the reported principal axes";
  interpretation.dataset.state = "nonzero";
}

function clearSectionPropertyOutputs(message) {
  ["sectionMass", "sectionArea", "sectionCx", "sectionCy", "sectionIx", "sectionIy", "sectionZx", "sectionZxAlt", "sectionZy", "sectionZyAlt", "sectionSx", "sectionSy", "sectionRx", "sectionRy", "sectionJ", "sectionIw", "sectionXo", "sectionAw", "sectionAwAlt", "sectionJp", "sectionIxy", "sectionIu", "sectionIv", "sectionRu", "sectionRv", "sectionThetaU"].forEach(id => {
    $(id).innerHTML = "—";
  });
  ["sectionMassBasis", "sectionAreaBasis", "sectionCxBasis", "sectionCyBasis", "sectionIxBasis", "sectionIyBasis", "sectionZxBasis", "sectionZyBasis", "sectionSxBasis", "sectionSyBasis", "sectionRxBasis", "sectionRyBasis", "sectionJBasis", "sectionIwBasis", "sectionXoBasis", "sectionAwBasis", "sectionJpBasis", "sectionIxyBasis", "sectionIuBasis", "sectionRuBasis", "sectionThetaUBasis"].forEach(id => {
    $(id).textContent = SectionCatalogue.BASIS.unavailable;
    $(id).classList.add("unavailable");
  });
  $("sectionZxDirection").hidden = true;
  $("sectionZxAltWrap").hidden = true;
  $("sectionZyDirection").hidden = true;
  $("sectionZyAltWrap").hidden = true;
  $("sectionAwDirection").hidden = true;
  $("sectionAwAltWrap").hidden = true;
  $("sectionProductGeometry").hidden = true;
  $("sectionPrincipalModuli").hidden = true;
  configureSectionSpecificProperties(null, "");
  setSectionIxyInterpretation(null, "");
  renderSectionRatios([]);
  $("sectionFormulaSteps").innerHTML = `<div><b>Invalid geometry</b><code>${safeText(message)}</code></div>`;
  $("sectionPropertiesWarning").textContent = message;
}

function calculateCustomSectionProperties() {
  const shape = $("sectionShape").value;
  configureSectionPropertyPresentation(shape, false);
  configureSectionPropertyHierarchy(shape, false);
  document.querySelectorAll("[data-section-shapes]").forEach(field => {
    field.hidden = !field.dataset.sectionShapes.split(" ").includes(shape);
  });
  setSectionSummary("Custom ideal geometry", sectionShapeNames[shape], sectionDimensionText(shape), [
    { label: "Section type", value: "Custom" },
    { label: "Reference axes", value: shape === "angle" ? "Centroidal n-n / p-p · principal x-x / y-y" : "Centroidal x-x / y-y" },
    { label: "Geometry", value: "Entered dimensions" },
    { label: "Status", value: "Draft" }
  ]);
  $("sectionCxLabel").innerHTML = "Centroid <i>x&#772;</i>";
  $("sectionMassLabel").textContent = "Steel mass per metre";

  try {
    const properties = currentSectionGeometry();
    const angleAxes = shape === "angle";
    const axisOne = angleAxes ? "n" : "x";
    const axisTwo = angleAxes ? "p" : "y";
    const principalOne = angleAxes ? "x" : "u";
    const principalTwo = angleAxes ? "y" : "v";
    const shearReferenceText = shape === "rhs"
      ? "A<sub>wy</sub> and A<sub>wx</sub> are the combined areas of the two ideal vertical and horizontal walls"
      : shape === "i" || shape === "channel"
        ? "A<sub>w</sub> is the ideal clear web area"
        : "No shear reference area is reported for this shape";
    renderSectionPropertiesDiagram(sectionDrawingFromInputs(shape), properties, sectionShapeNames[shape]);
    const customValue = value => Number.isFinite(value) ? { value, basis: "custom" } : null;
    setSectionPropertyOutput("sectionMass", "sectionMassBasis", customValue(properties.area * 0.00785), "decimal");
    setSectionPropertyOutput("sectionArea", "sectionAreaBasis", customValue(properties.area), "area");
    setSectionPropertyOutput("sectionCx", "sectionCxBasis", customValue(properties.cx), "decimal");
    setSectionPropertyOutput("sectionCy", "sectionCyBasis", customValue(properties.cy), "decimal");
    setSectionPropertyOutput("sectionIx", "sectionIxBasis", customValue(properties.ix), "power");
    setSectionPropertyOutput("sectionIy", "sectionIyBasis", customValue(properties.iy), "power");
    setSectionDirectionalZx(customValue(properties.zxTop), customValue(properties.zxBottom));
    setSectionDirectionalZy(customValue(properties.zyRight), customValue(properties.zyLeft));
    setSectionPropertyOutput("sectionSx", "sectionSxBasis", customValue(properties.sx), "power");
    setSectionPropertyOutput("sectionSy", "sectionSyBasis", customValue(properties.sy), "power");
    setSectionPropertyOutput("sectionRx", "sectionRxBasis", customValue(properties.rx), "decimal");
    setSectionPropertyOutput("sectionRy", "sectionRyBasis", customValue(properties.ry), "decimal");
    setSectionPropertyOutput("sectionJ", "sectionJBasis", customValue(properties.j), "power");
    setSectionPropertyOutput("sectionIw", "sectionIwBasis", customValue(properties.iw), "power");
    setSectionPropertyOutput("sectionXo", "sectionXoBasis", null, "decimal");
    setSectionDirectionalAw(customValue(shape === "rhs" ? properties.awy : properties.aw), customValue(properties.awx), shape === "rhs");
    setSectionPropertyOutput("sectionJp", "sectionJpBasis", customValue(properties.jp), "power");
    setSectionPropertyOutput("sectionIxy", "sectionIxyBasis", customValue(properties.ixy), "signed-power");
    setSectionIxyInterpretation(customValue(properties.ixy), shape);
    setSectionPropertyPair("sectionIu", "sectionIv", "sectionIuBasis", customValue(properties.iu), customValue(properties.iv), "power");
    setSectionPropertyPair("sectionRu", "sectionRv", "sectionRuBasis", customValue(properties.ru), customValue(properties.rv), "decimal");
    setSectionPropertyOutput("sectionThetaU", "sectionThetaUBasis", customValue(properties.thetaU), "decimal");
    configureSectionSpecificProperties(properties, shape);
    renderSectionRatios(customSectionRatios(shape));
    $("sectionProductGeometry").hidden = true;
    $("sectionPrincipalModuli").hidden = true;
    $("sectionPropertiesWarning").textContent = "Geometric properties only. Section classification, strength, stability and effective-section checks require material and design inputs.";
    $("sectionCalculationSummary").textContent = "Standard geometric relationships for the entered dimensions";
    $("sectionSourceSummary").textContent = "Ideal geometry · no product-table values";
    $("sectionSourceDetails").innerHTML = `<p><b>Status</b> &mdash; Draft. Values are derived from the entered dimensions and do not represent a verified manufacturer section.</p><p><b>Basis</b> &mdash; standard area, centroid, product-of-inertia and parallel-axis relationships; Z = I/c, r = &radic;(I/A), and steel mass = 0.00785A kg/m. For implemented plastic moduli, each plastic neutral axis divides the gross area equally and S is the first absolute area moment about that axis.</p><p><b>Geometry</b> &mdash; ideal sharp-corner rectangular components or ideal circular geometry. ${shearReferenceText}; it is not a design-standard effective shear area.</p>`;
    $("sectionFormulaSteps").innerHTML = `
      <div><b>Geometry model</b><code>${sectionCompositionText(shape)} ${sectionDimensionText(shape)}</code></div>
      <div><b>Gross area</b><code>A = ${formatArea(properties.area)}</code></div>
      <div><b>Centroid</b><code>x&#772; = ${properties.cx.toFixed(2)} mm; y&#772; = ${properties.cy.toFixed(2)} mm</code></div>
      <div><b>Second moments of area</b><code>I<sub>${axisOne}</sub> = ${formatInertia(properties.ix)}; I<sub>${axisTwo}</sub> = ${formatInertia(properties.iy)}</code></div>
      <div><b>Elastic section moduli</b><code>Z<sub>${axisOne},T</sub> = ${sectionPowerValue(properties.zxTop)} mm<sup>3</sup>; Z<sub>${axisOne},B</sub> = ${sectionPowerValue(properties.zxBottom)} mm<sup>3</sup>; Z<sub>${axisTwo},R</sub> = ${sectionPowerValue(properties.zyRight)} mm<sup>3</sup>; Z<sub>${axisTwo},L</sub> = ${sectionPowerValue(properties.zyLeft)} mm<sup>3</sup></code></div>
      <div><b>Plastic section moduli</b><code>S<sub>${axisOne}</sub> = ${sectionPowerValue(properties.sx)} mm<sup>3</sup>; S<sub>${axisTwo}</sub> = ${sectionPowerValue(properties.sy)} mm<sup>3</sup></code></div>
      ${Number.isFinite(properties.plasticCx) && Number.isFinite(properties.plasticCy) ? `<div><b>Plastic neutral axes</b><code>From the lower-left geometry datum: x<sub>PNA</sub> = ${properties.plasticCx.toFixed(2)} mm; y<sub>PNA</sub> = ${properties.plasticCy.toFixed(2)} mm. Each axis divides A into equal areas.</code></div>` : ""}
      <div><b>Radii of gyration</b><code>r<sub>${axisOne}</sub> = &radic;(I<sub>${axisOne}</sub> / A) = ${properties.rx.toFixed(2)} mm; r<sub>${axisTwo}</sub> = &radic;(I<sub>${axisTwo}</sub> / A) = ${properties.ry.toFixed(2)} mm</code></div>
      <div><b>Principal properties</b><code>I<sub>${angleAxes ? "np" : "xy"}</sub> = ${sectionSignedPowerValue(properties.ixy)} mm<sup>4</sup>; I<sub>${principalOne}</sub> = ${sectionPowerValue(properties.iu)} mm<sup>4</sup>; I<sub>${principalTwo}</sub> = ${sectionPowerValue(properties.iv)} mm<sup>4</sup>; &theta;<sub>${principalOne}</sub> = ${Number.isFinite(properties.thetaU) ? properties.thetaU.toFixed(2) + "&deg;" : "indeterminate"}${angleAxes ? " counter-clockwise from +n" : ""}.</code></div>
      ${shape === "rhs" ? `<div><b>Wall reference areas</b><code>A<sub>wy</sub> = ${sectionPowerValue(properties.awy)} mm<sup>2</sup> (two vertical walls); A<sub>wx</sub> = ${sectionPowerValue(properties.awx)} mm<sup>2</sup> (two horizontal walls). These are not effective shear areas.</code></div>` : ""}
      <div><b>Polar second moment</b><code>I<sub>${axisOne}</sub> + I<sub>${axisTwo}</sub> = ${sectionPowerValue(properties.jp)} mm<sup>4</sup>. This quantity is not the St Venant torsion constant J except for circular sections.</code></div>
      <div><b>Torsion</b><code>J and I<sub>w</sub> are reported only where the selected ideal geometry has a reviewed closed-form relationship.</code></div>
      <div><b>Scope</b><code>Principal properties are geometric only. Effective properties, section classification, material strength and design capacity are excluded.</code></div>`;
  } catch (error) {
    clearSectionPropertyOutputs(error instanceof Error ? error.message : "Invalid section geometry.");
  }
}

function calculateCatalogueSectionProperties() {
  const family = selectedSectionCatalogueFamily();
  const section = selectedSectionCatalogueRecord();
  if (!section) {
    clearSectionPropertyOutputs("No checked catalogue rows are available for this product family.");
    return;
  }
  const properties = section.properties;
  const source = section.source;
  configureSectionPropertyPresentation(section.drawing.shape, true);
  configureSectionPropertyHierarchy(section.drawing.shape, true, family.key);
  const angleAxes = family.key === "ea";
  const axisOne = angleAxes ? "n" : "x";
  const axisTwo = angleAxes ? "p" : "y";
  const principalOne = angleAxes ? "x" : "u";
  const principalTwo = angleAxes ? "y" : "v";
  const shearReferenceLabel = section.drawing.shape === "i" || section.drawing.shape === "channel"
    ? "Clear web area Aw"
    : "Shear reference area";
  $("sectionCxLabel").innerHTML = family.key === "pfc" ? "Centroid <i>X<sub>L</sub></i>" : "Centroid <i>x&#772;</i>";
  $("sectionMassLabel").textContent = "Mass per metre";
  const hasCx = Number.isFinite(properties.cx?.value);
  const hasCy = Number.isFinite(properties.cy?.value);
  const axisDisplay = family.key === "ea"
    ? `${hasCx && hasCy ? "Centroidal" : "Indicative"} n-n / p-p · principal x-x / y-y convention`
    : hasCx && hasCy
    ? "Centroidal x-x / y-y"
    : hasCx
      ? "x-x indicative · y-y centroidal"
      : hasCy
        ? "x-x centroidal · y-y indicative"
        : "Indicative x-x / y-y";
  setSectionSummary("Selected catalogue section", section.designation, section.dimensions || "Dimensions not available in the current checked row", [
    { label: "Section family", value: sectionCatalogueFamilyNames[family.key] || family.label },
    { label: "Reference axes", value: axisDisplay },
    { label: "Data basis", value: "Stated by property" },
    { label: "Catalogue", value: `${safeText(source.publisher)} ${safeText(source.document.match(/\b\d{4}\b/)?.[0] || "catalogue")}` }
  ]);
  renderSectionPropertiesDiagram(section.drawing, properties, section.designation, true);

  const massProperty = Number.isFinite(section.mass) ? { value: section.mass, basis: "catalogue" } : null;
  setSectionPropertyOutput("sectionMass", "sectionMassBasis", massProperty, "decimal");
  setSectionPropertyOutput("sectionArea", "sectionAreaBasis", properties.area, "area");
  setSectionPropertyOutput("sectionCx", "sectionCxBasis", properties.cx, "decimal");
  setSectionPropertyOutput("sectionCy", "sectionCyBasis", properties.cy, "decimal");
  setSectionPropertyOutput("sectionIx", "sectionIxBasis", properties.ix, "power");
  setSectionPropertyOutput("sectionIy", "sectionIyBasis", properties.iy, "power");
  setSectionDirectionalZx(properties.zx, properties.zxAlt);
  setSectionDirectionalZy(properties.zy, properties.zyAlt);
  setSectionPropertyOutput("sectionSx", "sectionSxBasis", properties.sx, "power");
  setSectionPropertyOutput("sectionSy", "sectionSyBasis", properties.sy, "power");
  setSectionPropertyOutput("sectionRx", "sectionRxBasis", properties.rx, "decimal");
  setSectionPropertyOutput("sectionRy", "sectionRyBasis", properties.ry, "decimal");
  setSectionPropertyOutput("sectionJ", "sectionJBasis", properties.j, "power");
  setSectionPropertyOutput("sectionIw", "sectionIwBasis", properties.iw, "power");
  setSectionPropertyOutput("sectionXo", "sectionXoBasis", properties.xo, "decimal");
  setSectionDirectionalAw(section.drawing.shape === "rhs" ? properties.awy : properties.aw, properties.awx, section.drawing.shape === "rhs");
  setSectionPropertyOutput("sectionJp", "sectionJpBasis", properties.jp, "power");
  setSectionPropertyOutput("sectionIxy", "sectionIxyBasis", properties.ixy, "signed-power");
  setSectionIxyInterpretation(properties.ixy, section.drawing.shape);
  setSectionPropertyPair("sectionIu", "sectionIv", "sectionIuBasis", properties.iu, properties.iv, "power");
  setSectionPropertyPair("sectionRu", "sectionRv", "sectionRuBasis", properties.ru, properties.rv, "decimal");
  setSectionPropertyOutput("sectionThetaU", "sectionThetaUBasis", properties.thetaU, "decimal");
  configureSectionSpecificProperties(properties, section.drawing.shape);
  renderSectionRatios(section.ratios);
  const productGeometry = $("sectionProductGeometry");
  const principalModuli = $("sectionPrincipalModuli");
  const aux = section.auxiliary;
  if (family.key === "ea" && aux) {
    productGeometry.innerHTML = `
      <section><div class="section-angle-catalogue-heading"><h4>Rolled product geometry</h4><span>Catalogue</span></div><dl>
        <div><dt>Actual t</dt><dd>${aux.actualT.value.toFixed(1)} <small>mm</small></dd></div>
        <div><dt>Root radius r<sub>1</sub></dt><dd>${aux.rootRadius.value.toFixed(1)} <small>mm</small></dd></div>
        <div><dt>Toe radius r<sub>2</sub></dt><dd>${aux.toeRadius.value.toFixed(1)} <small>mm</small></dd></div>
        <div><dt>Far-edge distance</dt><dd>n<sub>R</sub> = p<sub>T</sub> = ${aux.centroidFar.value.toFixed(1)} <small>mm</small></dd></div>
      </dl></section>`;
    principalModuli.innerHTML = `
      <section><div class="section-angle-catalogue-heading"><h4>Principal x-x / y-y moduli</h4><span>Catalogue</span></div><dl>
        <div><dt>Z<sub>x</sub></dt><dd>${sectionPowerValue(aux.principalZx.value)} <small>mm<sup>3</sup></small></dd></div>
        <div><dt>Z<sub>y,3</sub></dt><dd>${sectionPowerValue(aux.principalZy3.value)} <small>mm<sup>3</sup></small></dd></div>
        <div><dt>Z<sub>y,5</sub></dt><dd>${sectionPowerValue(aux.principalZy5.value)} <small>mm<sup>3</sup></small></dd></div>
        <div><dt>S<sub>x</sub></dt><dd>${sectionPowerValue(aux.principalSx.value)} <small>mm<sup>3</sup></small></dd></div>
        <div><dt>S<sub>y</sub></dt><dd>${sectionPowerValue(aux.principalSy.value)} <small>mm<sup>3</sup></small></dd></div>
      </dl></section>`;
    productGeometry.hidden = false;
    principalModuli.hidden = false;
  } else {
    productGeometry.hidden = true;
    principalModuli.hidden = true;
  }

  $("sectionPropertiesWarning").textContent = family.key === "chs" || family.key === "rod"
    ? "Catalogue dimensions and derived geometric properties are identified separately. Section classification and design checks remain outside this lookup."
    : "The basis of each value is stated. Missing catalogue properties are not replaced by idealised rolled-section geometry.";
  $("sectionCalculationSummary").textContent = "Catalogue values and stated derivations";
  $("sectionSourceSummary").textContent = `${source.publisher} · ${source.status}`;
  $("sectionSourceDetails").innerHTML = `<p><b>Source</b> &mdash; ${safeText(source.publisher)}, <i>${safeText(source.document)}</i>.</p><p><b>Verification</b> &mdash; ${safeText(source.status)}. The combined catalogue workflow remains Draft.</p><p><b>Derivation</b> &mdash; ${safeText(section.derivation)}</p>`;
  $("sectionFormulaSteps").innerHTML = [
    sectionPropertyStep("Mass per metre", massProperty, "kg/m"),
    sectionPropertyStep("Gross area Ag", properties.area, "mm²"),
    sectionPropertyStep("Centroid x̄", properties.cx, "mm"),
    sectionPropertyStep("Centroid ȳ", properties.cy, "mm"),
    sectionPropertyStep(`Second moment I${axisOne}`, properties.ix, "mm⁴"),
    sectionPropertyStep(`Second moment I${axisTwo}`, properties.iy, "mm⁴"),
    properties.zxAlt?.value !== null
      ? sectionPropertyStep(`Elastic modulus Z${axisOne},T`, properties.zx, "mm³")
      : sectionPropertyStep(`Elastic modulus Z${axisOne}`, properties.zx, "mm³"),
    properties.zxAlt?.value !== null ? sectionPropertyStep(`Elastic modulus Z${axisOne},B`, properties.zxAlt, "mm³") : "",
    properties.zyAlt?.value !== null
      ? sectionPropertyStep(`Elastic modulus Z${axisTwo},R`, properties.zy, "mm³")
      : sectionPropertyStep(`Elastic modulus Z${axisTwo}`, properties.zy, "mm³"),
    properties.zyAlt?.value !== null ? sectionPropertyStep(`Elastic modulus Z${axisTwo},L`, properties.zyAlt, "mm³") : "",
    sectionPropertyStep(`Plastic modulus S${axisOne}`, properties.sx, "mm³"),
    sectionPropertyStep(`Plastic modulus S${axisTwo}`, properties.sy, "mm³"),
    sectionPropertyStep(`Radius r${axisOne}`, properties.rx, "mm"),
    sectionPropertyStep(`Radius r${axisTwo}`, properties.ry, "mm"),
    sectionPropertyStep("St Venant torsion J", properties.j, "mm⁴"),
    sectionPropertyStep("Warping constant Iw", properties.iw, "mm⁶"),
    sectionPropertyStep("Shear-centre offset XO", properties.xo, "mm"),
    sectionPropertyStep(shearReferenceLabel, properties.aw, "mm²"),
    sectionPropertyStep(`Polar second moment I${axisOne} + I${axisTwo}`, properties.jp, "mm⁴"),
    sectionPropertyStep(`Product of inertia I${angleAxes ? "np" : "xy"}`, properties.ixy, "mm⁴", true),
    sectionPropertyStep(`Principal second moment I${principalOne}`, properties.iu, "mm⁴"),
    sectionPropertyStep(`Principal second moment I${principalTwo}`, properties.iv, "mm⁴"),
    sectionPropertyStep(`Principal radius r${principalOne}`, properties.ru, "mm"),
    sectionPropertyStep(`Principal radius r${principalTwo}`, properties.rv, "mm"),
    sectionPropertyStep(`Principal-axis angle θ${principalOne}`, properties.thetaU, "°"),
    `<div><b>Scope</b><code>Section properties only. Section classification is material-grade dependent; strength, stability, effective-section and capacity checks are excluded.</code></div>`
  ].join("");
}

function calculateSectionProperties() {
  if (sectionPropertiesMode === "custom") calculateCustomSectionProperties();
  else calculateCatalogueSectionProperties();
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

  const properties = SectionGeometry.symmetricI(d, bf, tw, tf);
  const area = properties.area;
  const mass = area * 0.00785;
  const zx = properties.zx / 1000;
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
  const cl512Factor = momentRatio <= 0.75 ? 1 : momentRatio <= 1 ? 2.2 - 1.6 * momentRatio : 1;
  const shearWithBendingCapacity = validShear ? shearCapacity * cl512Factor : NaN;
  const shearRatio = validShear && shearWithBendingCapacity > 0 ? shearDemand / shearWithBendingCapacity : Infinity;
  const utilisation = valid ? Math.max(momentDemand > 0 ? momentRatio : 0, shearDemand > 0 ? shearRatio : 0) : Infinity;
  const hasDemand = momentDemand > 0 || shearDemand > 0;
  const interactionReductionApplied = valid && momentDemand > 0.75 * sectionCapacity && momentDemand <= sectionCapacity && shearDemand > 0;
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
        : "PASS";
  $("beamStatus").className = !valid
    ? "fail"
      : !hasDemand
        ? ""
        : utilisation > 1
          ? "fail"
          : "pass";
  if (!valid) {
    $("beamWarning").textContent = "Enter valid custom I-section dimensions and select a steel grade before using the Beam Section capacity check.";
  } else {
    const beamWarnings = [];
    if (utilisation > 1) {
      beamWarnings.push("Design action exceeds the reported AS 4100 section design capacity.");
    }
    if (interactionReductionApplied) {
      beamWarnings.push(`AS 4100 Cl. 5.12.3 shear-bending reduction applied: phi Vvm = ${fixed(shearWithBendingCapacity)} kN.`);
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
    <div><b>Shear-bending interaction - AS 4100 Cl. 5.12.3</b><code>${momentRatio <= 0.75 ? `M* = ${fixed(momentDemand)} kNm &le; 0.75&phi;M<sub>s</sub> = ${fixed(0.75 * sectionCapacity)} kNm, so V<sub>vm</sub> = V<sub>v</sub>; &phi;V<sub>vm</sub> = ${fixed(shearWithBendingCapacity)} kN` : momentRatio <= 1 ? `0.75&phi;M<sub>s</sub> &lt; M* &le; &phi;M<sub>s</sub>; V<sub>vm</sub> = V<sub>v</sub>[2.2 - 1.6M*/(&phi;M<sub>s</sub>)]; reduction factor = 2.2 - 1.6 x ${momentRatio.toFixed(3)} = ${cl512Factor.toFixed(3)}; &phi;V<sub>vm</sub> = ${fixed(shearWithBendingCapacity)} kN` : `M* &gt; &phi;M<sub>s</sub>; section moment capacity fails and the AS 4100 Cl. 5.12.3 interaction equation is not evaluated outside its stated moment range`}</code></div>
    <div><b>Design action check</b><code>${momentRatio > 1 ? `M* / &phi;M<sub>s</sub> = ${momentRatio.toFixed(2)} &gt; 1.00; section moment capacity fails` : `M* / &phi;M<sub>s</sub> = ${fixed(momentDemand)} / ${fixed(sectionCapacity)} = ${momentRatio.toFixed(2)}; V* / &phi;V<sub>vm</sub> = ${fixed(shearDemand)} / ${fixed(shearWithBendingCapacity)} = ${shearRatio.toFixed(2)}; governing ratio = ${utilisation.toFixed(2)}`}</code></div>
    <div><b>Design boundary</b><code>Section capacity only; member capacity M<sub>b</sub>, lateral restraint, web bearing, web buckling, stiffeners, concentrated loads, openings, torsion, serviceability and composite action are not checked.</code></div>`;
}

function chsProperties(section) {
  const properties = SectionGeometry.circularHollow(section.D, section.t);
  return { area: properties.area, r: properties.rx, ix: properties.ix, iy: properties.iy };
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
  const outsideDiameter = Math.max(0.2, D);
  const wallThickness = Math.max(0.05, Math.min(t, outsideDiameter / 2 - 0.05));
  const properties = SectionGeometry.circularHollow(outsideDiameter, wallThickness);
  return { designation: `${outsideDiameter.toFixed(1)} x ${wallThickness.toFixed(1)} CHS`, area: properties.area, r: properties.rx, rx: properties.rx, ry: properties.ry, ix: properties.ix, iy: properties.iy, D: outsideDiameter, t: wallThickness, customGeometry: true };
}

function rodGeometry(diameter) {
  const d = Math.max(0.1, diameter);
  const properties = SectionGeometry.circle(d);
  return { designation: `Round ${d.toFixed(1)}`, area: properties.area, r: properties.rx, rx: properties.rx, ry: properties.ry, ix: properties.ix, iy: properties.iy, diameter: d, customGeometry: true };
}

function eaGeometry(b, t) {
  const leg = Math.max(0.1, b);
  const thickness = Math.max(0.05, Math.min(t, leg - 0.05));
  const section = SectionGeometry.equalAngle(leg, thickness);
  return { designation: `${leg.toFixed(0)} x ${leg.toFixed(0)} x ${thickness.toFixed(1)} EA`, area: section.area, r: Math.min(section.rx, section.ry), rx: section.rx, ry: section.ry, ix: section.ix, iy: section.iy, b: leg, t: thickness, customGeometry: true };
}

function pfcGeometry(d, bf, tw, tf) {
  const depth = Math.max(0.2, d);
  const flangeWidth = Math.max(0.1, bf);
  const webThickness = Math.max(0.1, Math.min(tw, flangeWidth));
  const flangeThickness = Math.max(0.05, Math.min(tf, depth / 2 - 0.05));
  const section = SectionGeometry.channel(depth, flangeWidth, webThickness, flangeThickness);
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

function concreteLayer(index, depth, direction, width) {
  const active = $(`layer${index}Active`).checked;
  const yTop = value(`layer${index}Y`);
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
    name: index === 1 ? "Top pad top mat" : index === 2 ? "Top pad bottom mat" : index === 3 ? "Bottom pad top mat" : "Bottom pad bottom mat",
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
  return concreteBarProducts[$(`layer${index}Bar`).value] || concreteBarProducts.N20;
}

function concreteShearBarProduct() {
  return concreteBarProducts[$("concreteShearBar").value] || concreteBarProducts.N12;
}

function concreteCrossingBarProduct() {
  return concreteBarProducts[$("concreteCrossingBar").value] || concreteBarProducts.N20;
}

function setConcreteBarDefaults(index) {
  $(`layer${index}Fsy`).value = concreteBarProduct(index).fsy;
}

function setConcreteShearBarDefaults() {
  $("concreteFsyf").value = concreteShearBarProduct().fsy;
}

function updateConcreteShearInputVisibility() {
  const hasShearReinforcement = $("concreteShearReo").value === "vertical";
  const dependentFields = [
    ["concreteShearBarField", "concreteShearBar"],
    ["concreteNsvField", "concreteNsv"],
    ["concreteSvField", "concreteSv"],
    ["concreteFsyfField", "concreteFsyf"]
  ];
  dependentFields.forEach(([fieldId, controlId]) => {
    $(fieldId).hidden = !hasShearReinforcement;
    $(controlId).disabled = !hasShearReinforcement;
  });
  $("concreteShearInputs").classList.toggle("is-none", !hasShearReinforcement);
}

function populateConcreteBarOptions() {
  const groups = [
    ["N", concreteNBarDiameters],
    ["Y", concreteLegacyYBarDiameters]
  ].map(([prefix, diameters]) => {
    const label = prefix === "N" ? "N bars - InfraBuild 500PLUS" : "Y bars - legacy drawings";
    const options = diameters.map(diameter => `<option value="${prefix}${diameter}">${prefix}${diameter}${prefix === "N" && diameter === 40 ? " - on request" : ""}</option>`).join("");
    return `<optgroup label="${label}">${options}</optgroup>`;
  }).join("");
  [1, 2, 3, 4].forEach(index => {
    const select = $(`layer${index}Bar`);
    const defaultBar = select.dataset.defaultBar || "N20";
    select.innerHTML = groups;
    select.value = defaultBar;
    setConcreteBarDefaults(index);
  });
  const shearSelect = $("concreteShearBar");
  shearSelect.innerHTML = groups;
  shearSelect.value = shearSelect.dataset.defaultBar || "N12";
  setConcreteShearBarDefaults();
  const crossingSelect = $("concreteCrossingBar");
  crossingSelect.innerHTML = groups;
  crossingSelect.value = crossingSelect.dataset.defaultBar || "N20";
}

function concreteAutoDepth(index, topDepth, bottomDepth, cover, bar, crossingOffset = 0) {
  const faceOffset = cover + crossingOffset + bar / 2;
  const totalDepth = topDepth + bottomDepth;
  if (index <= 2 && topDepth <= 0) return NaN;
  if (index >= 3 && bottomDepth <= 0) return NaN;
  if (index === 1) return faceOffset;
  if (index === 2) return Math.max(0, topDepth - faceOffset);
  if (index === 3) return topDepth + faceOffset;
  return Math.max(0, totalDepth - faceOffset);
}

function updateConcreteMatAvailability(topDepth, bottomDepth) {
  [1, 2, 3, 4].forEach(index => {
    const available = index <= 2 ? topDepth > 0 : bottomDepth > 0;
    const activeInput = $(`layer${index}Active`);
    const autoInput = $(`layer${index}Auto`);
    const yInput = $(`layer${index}Y`);
    const row = activeInput.closest(".layer-row");
    const wasUnavailable = row.dataset.unavailable === "true";
    row.classList.toggle("is-unavailable", !available);
    row.setAttribute("aria-disabled", String(!available));
    ["Active", "Auto", "Y", "Bar", "Spacing", "Fsy", "Es"].forEach(suffix => {
      $(`layer${index}${suffix}`).disabled = !available;
    });
    if (!available) {
      if (!wasUnavailable) {
        row.dataset.storedY = yInput.value;
        row.dataset.storedAuto = String(autoInput.checked);
      }
      row.dataset.unavailable = "true";
      yInput.value = "";
      yInput.placeholder = "N/A";
    } else {
      if (wasUnavailable) {
        autoInput.checked = row.dataset.storedAuto !== "false";
        if (!autoInput.checked) yInput.value = row.dataset.storedY || "";
        delete row.dataset.unavailable;
        delete row.dataset.storedY;
        delete row.dataset.storedAuto;
      }
      yInput.placeholder = "";
    }
  });
}

function updateConcreteMatDepths(topDepth, bottomDepth, cover) {
  const insideCrossingBars = $("concreteDepthBasis").value === "inside";
  const crossingBar = concreteCrossingBarProduct();
  const crossingOffset = insideCrossingBars ? crossingBar.diameter : 0;
  $("concreteCrossingBar").disabled = !insideCrossingBars;
  [1, 2, 3, 4].forEach(index => {
    const auto = $(`layer${index}Auto`).checked;
    const yInput = $(`layer${index}Y`);
    if (!auto) return;
    const bar = concreteBarProduct(index).diameter;
    const y = concreteAutoDepth(index, topDepth, bottomDepth, cover, bar, crossingOffset);
    yInput.value = Number.isFinite(y) ? fixed(Math.max(0, y)) : "";
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
  const webCrushingLimited = vuRaw > vuMax;
  const highStrengthLongitudinalLayers = data.layers.filter(layer => layer.fsy > 500);
  const scopeFailures = [];
  if (data.fc > 65) scopeFailures.push(`f'c = ${fixed(data.fc)} MPa exceeds 65 MPa`);
  if (hasShearReo && fsyf > 500) scopeFailures.push(`shear reinforcement f_sy.f = ${fixed(fsyf)} MPa exceeds 500 MPa`);
  if (highStrengthLongitudinalLayers.length) scopeFailures.push(`${highStrengthLongitudinalLayers.map(layer => `mat ${layer.index}`).join(", ")} f_sy exceeds 500 MPa`);
  const withinSimplifiedScope = scopeFailures.length === 0;
  const phi = minShearReoProvided && !webCrushingLimited ? 0.75 : 0.70;
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
    webCrushingLimited,
    withinSimplifiedScope,
    scopeFailures,
    phi,
    phiVu: withinSimplifiedScope ? phi * vu : NaN
  };
}

function calculateConcrete() {
  updateConcreteShearInputVisibility();
  const topDepth = value("concreteTopDepth");
  const bottomDepth = value("concreteBottomDepth");
  const bottomMatsActive = $("layer3Active").checked || $("layer4Active").checked;
  const hideInactiveBottomMats = bottomDepth <= 0 && !bottomMatsActive;
  [$("layer3Row"), $("layer4Row")].forEach(row => { row.hidden = hideInactiveBottomMats; });
  $("bottomPadLayerNote").hidden = !hideInactiveBottomMats;
  const totalDepth = topDepth + bottomDepth;
  const direction = $("concreteDirection").value;
  const checkedDirection = $("concreteReoDirection").value;
  const checkedDirectionLabel = checkedDirection === "y" ? "Y direction" : "X direction";
  const depthBasis = $("concreteDepthBasis").value;
  const crossingBar = concreteCrossingBarProduct();
  const hasTopPad = topDepth > 0;
  const hasBottomPad = bottomDepth > 0;
  const compositeSection = hasTopPad && hasBottomPad;
  const sectionKind = compositeSection ? "composite" : hasTopPad ? "top" : hasBottomPad ? "bottom" : "none";
  const depth = totalDepth;
  const layerIndices = compositeSection ? [1, 2, 3, 4] : hasTopPad ? [1, 2] : hasBottomPad ? [3, 4] : [];
  const cover = value("concreteCover");
  const width = value("concreteWidth");
  const fcInput = value("concreteFc");
  const fc = Math.min(120, Math.max(20, fcInput));
  const stressBlock = concreteStressBlockFactors(fc);
  const ecu = 0.003;
  updateConcreteMatAvailability(topDepth, bottomDepth);
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
    checkedDirection,
    checkedDirectionLabel,
    depthBasis,
    crossingBar,
    compositeSection,
    sectionKind,
    layers: layerIndices.map(index => concreteLayer(index, depth, direction, width)).filter(layer => layer.active && layer.area > 0 && layer.yTop >= 0 && layer.yTop <= depth)
  };

  let result = {
    ok: false,
    message: depth <= 0
      ? "No concrete pad depth is defined"
      : "Plain concrete section: no RC ultimate flexural capacity is calculated without active reinforcement mats"
  };
  if (data.width > 0 && data.depth > 0 && data.fc > 0 && data.ecu > 0 && data.layers.length) {
    result = solveConcreteSection(data);
  }

  const compressionFaceLabel = direction === "top" ? "top compression" : "bottom compression";
  const checkedSectionLabel = sectionKind === "composite"
    ? "Composite pad-on-pad section"
    : sectionKind === "bottom"
      ? "Single bottom-pad section"
      : sectionKind === "top"
        ? "Single top-pad section"
        : "No pad section defined";
  $("concreteSummaryTitle").textContent = `${checkedSectionLabel} · ${checkedDirectionLabel} · ${compressionFaceLabel}`;
  $("concreteSummaryNote").textContent = compositeSection
    ? "Full-depth strip; verify interface transfer, anchorage and composite action."
    : sectionKind === "none"
      ? "Enter a positive top or bottom pad depth to define the checked section."
      : `Directional strip capacity; repeat for ${checkedDirection === "x" ? "Y" : "X"} direction.`;
  const depthBasisLabel = depthBasis === "inside" ? `Inside ${crossingBar.designation}` : "Closest face";
  $("concreteModeValue").textContent = sectionKind === "none" ? "Not defined" : depthBasisLabel;
  $("concreteWidthValue").textContent = `${fixed(data.width)} mm`;
  $("concreteDepthValue").textContent = `${fixed(data.depth)} mm`;
  const legacyLayers = data.layers.filter(layer => layer.legacy);
  const fsyCappedLayers = data.layers.filter(layer => layer.fsyInput > 600);
  $("concretePhiNote").innerHTML = legacyLayers.length
    ? "Legacy Y bar: conservative &phi; = 0.65 pending grade verification."
    : "&phi; from AS 3600 Table 2.2.2.";

  if (!result.ok) {
    ["concretePhiMuo", "concretePhiVu"].forEach(id => $(id).textContent = "-");
    $("concreteResultScope").textContent = `${checkedDirection.toUpperCase()}-direction strip`;
    $("concreteShearNote").innerHTML = depth <= 0
      ? "RC one-way shear not calculated without a defined section depth"
      : "RC one-way shear not calculated without active reinforcement";
    $("concreteStatusValue").textContent = "Review required";
    $("concreteWarningText").textContent = "Section capacity is unavailable for the current depth and active reinforcement.";
    $("concreteSectionState").innerHTML = "";
    $("concreteLayerResults").innerHTML = "";
    $("concreteFormulaSteps").innerHTML = depth <= 0
      ? `<div><b>Section definition</b><code>${result.message}. Enter D<sub>top</sub> or D<sub>bot</sub> greater than zero.</code></div>`
      : `<div><b>Section state</b><code>${result.message}</code></div><div><b>Plain concrete note</b><code>For an unreinforced pad footing, use a separate AS 3600 Section 20 plain-concrete footing check. Do not report this as ductile reinforced-concrete &phi;M<sub>uo</sub>; AS 3600 Section 20 uses a linear stress-strain bending model and takes footing strength depth as nominal depth minus 50 mm.</code></div>`;
    return;
  }

  const residual = result.axial / 1000;
  const shear = concreteOneWayShear(data, result);
  const residualOk = Math.abs(residual) < 0.01;
  const coverWarnings = result.layers.filter(layer => layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2);
  const reviewFlags = [];
  if (!shear.withinSimplifiedScope) reviewFlags.push(`one-way shear not evaluated outside AS 3600 Cl. 8.2.4 simplified-method scope (${shear.scopeFailures.join("; ")})`);
  if (shear.shearReoMode === "vertical" && !shear.hasShearReo) reviewFlags.push("selected shear reinforcement requires at least one fitment leg and positive spacing");
  if (shear.hasShearReo && !shear.minShearReoProvided) reviewFlags.push(`A<sub>sv</sub>/s below the AS 3600 Cl. 8.2.1.7 minimum (${shear.asvPerS.toFixed(3)} < ${shear.asvMinPerS.toFixed(3)} mm2/mm)`);
  if (shear.webCrushingLimited) reviewFlags.push(`V<sub>u</sub> limited by AS 3600 Cl. 8.2.3.3 web crushing`);
  if (coverWarnings.length) reviewFlags.push(`${coverWarnings.map(layer => `mat ${layer.index}`).join(", ")} cover check`);
  if (legacyLayers.length) reviewFlags.push(`legacy Y bar in ${legacyLayers.map(layer => `mat ${layer.index}`).join(", ")}`);
  if (fsyCappedLayers.length) reviewFlags.push(`f<sub>sy</sub> capped at 600 MPa for ${fsyCappedLayers.map(layer => `mat ${layer.index}`).join(", ")}`);
  if (result.kuo > 0.36) reviewFlags.push(`k<sub>uo</sub> = ${result.kuo.toFixed(3)} > 0.36; check AS 3600 Cl. 8.1.5`);
  const compositeBoundary = compositeSection
    ? " Verify interface transfer, anchorage and composite action."
    : "";
  const warningText = `Section capacities only. Design actions, minimum reinforcement, punching shear and detailing are excluded.${compositeBoundary}${reviewFlags.length ? ` Review: ${reviewFlags.join("; ")}.` : ""}`;

  $("concreteResultScope").textContent = `${checkedDirection.toUpperCase()}-direction strip`;
  $("concretePhiMuo").textContent = fixed(result.phiMuo);
  $("concretePhiVu").textContent = shear.withinSimplifiedScope ? fixed(shear.phiVu) : "-";
  $("concreteShearNote").innerHTML = shear.withinSimplifiedScope
    ? `V<sub>uc</sub> = ${fixed(shear.vuc)} kN; V<sub>us</sub> = ${fixed(shear.vus)} kN; d<sub>v</sub> = ${fixed(shear.dv)} mm`
    : `Not evaluated - outside simplified-method scope: ${shear.scopeFailures.join("; ")}`;
  const shearWarning = !shear.withinSimplifiedScope || (shear.shearReoMode === "vertical" && !shear.hasShearReo) || (shear.hasShearReo && !shear.minShearReoProvided) || shear.webCrushingLimited;
  const calculationClear = residualOk && !coverWarnings.length && !legacyLayers.length && !fsyCappedLayers.length && !shearWarning && result.kuo <= 0.36;
  $("concreteStatusValue").textContent = calculationClear ? "Calculated" : "Review required";
  $("concreteWarningText").innerHTML = warningText;

  const shearState = shear.withinSimplifiedScope
    ? `<article><b>One-way shear capacity</b><span>&phi;V<sub>u</sub> = ${fixed(shear.phiVu)} kN; &phi; = ${shear.phi.toFixed(2)}</span><small>V<sub>u</sub> = min(V<sub>uc</sub> + V<sub>us</sub>, V<sub>u.max</sub>) = ${fixed(shear.vu)} kN${shear.webCrushingLimited ? "; web crushing governs" : ""}</small></article>`
    : `<article><b>One-way shear state</b><span>Not evaluated - outside AS 3600 Cl. 8.2.4 simplified-method scope.</span><small>${shear.scopeFailures.join("; ")}. Use the applicable general shear method for the project.</small></article>`;
  $("concreteSectionState").innerHTML = `
    <article><b>Flexural section state</b><span>Neutral axis depth x = ${fixed(result.x)} mm from the selected compression face; d<sub>o</sub> = ${fixed(result.d0)} mm; k<sub>uo</sub> = ${result.kuo.toFixed(3)}; M<sub>uo</sub> = ${fixed(result.muo)} kNm</span><small>C<sub>c</sub> = ${fixed(result.cc / 1000)} kN; &phi; = ${result.phi.toFixed(2)}; &phi;M<sub>uo</sub> = ${fixed(result.phiMuo)} kNm</small></article>
    ${shearState}`;

  $("concreteLayerResults").innerHTML = result.layers.map(layer => {
    const status = Math.abs(layer.strain) < 0.00005 ? "near neutral axis" : layer.force > 0 ? "compression" : "tension";
    const coverStatus = layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2 ? "nominal cover review required" : "within nominal cover reference";
    const displacementNote = layer.displacedConcreteStress > 0 ? `; net stress = ${signedFixed(layer.netStress, 1)} MPa after displaced concrete` : "";
    return `<article><b>Mat ${layer.index} - ${layer.name}</b><span>${checkedDirectionLabel} bars: ${layer.designation} @ ${fixed(layer.spacing)} mm; ${status}; y<sub>${layer.index}</sub> = ${fixed(layer.yTop)} mm; A<sub>s${layer.index}</sub> = ${fixed(layer.area)} mm2 per strip (${fixed(layer.areaPerMetre)} mm2/m); ${coverStatus}</span><small>&epsilon;<sub>s${layer.index}</sub> = ${signedFixed(layer.strain, 5)}; f<sub>s${layer.index}</sub> = ${signedFixed(layer.stress, 1)} MPa${displacementNote}; F<sub>s${layer.index}</sub> = ${signedFixed(layer.force / 1000, 1)} kN</small></article>`;
  }).join("");

  const shearFormulaSteps = shear.withinSimplifiedScope ? `
    <div><b>Longitudinal effective depth, d - AS 3600 Cl. 8.2.1.9</b><code>d is measured from the compression face to the centroid of the checked-direction longitudinal tension reinforcement in the tensile half-depth. ${shear.dBasis}; ${shear.centroidArea > 0 ? `d = &Sigma;(A<sub>s</sub>d<sub>i</sub>) / &Sigma;A<sub>s</sub> = ${fixed(shear.dNumerator)} / ${fixed(shear.centroidArea)} = ${fixed(shear.d)} mm` : `d = ${fixed(shear.d)} mm`}</code></div>
    <div><b>Effective web width and shear depth, b<sub>v</sub> and d<sub>v</sub> - AS 3600 Cl. 8.2.1.5 and Cl. 8.2.1.9</b><code>b<sub>v</sub> = b = ${fixed(shear.bv)} mm for this rectangular strip without ducts or voids; 0.72D = 0.72 x ${fixed(data.depth)} = ${fixed(0.72 * data.depth)} mm; 0.9d = 0.9 x ${fixed(shear.d)} = ${fixed(0.9 * shear.d)} mm; d<sub>v</sub> = max(0.72D, 0.9d) = ${fixed(shear.dv)} mm</code></div>
    <div><b>Simplified-method scope - AS 3600 Cl. 8.2.4.1</b><code>Normal-weight, non-prestressed concrete; no axial tension or torsion; f'<sub>c</sub> &le; 65 MPa; reinforcement f<sub>sy</sub> &le; 500 MPa; maximum aggregate size &ge; 10 mm. These fixed quick-check assumptions must match the project.</code></div>
    <div><b>Shear reinforcement area</b><code>${shear.hasShearReo ? `A<sub>sv</sub> = n<sub>sv</sub>A<sub>bar,table</sub> = ${shear.nsv.toFixed(0)} x ${fixed(shear.shearBarArea)} = ${fixed(shear.asv)} mm2 per spacing using ${shear.shearDesignation}; A<sub>sv</sub>/s = ${fixed(shear.asv)} / ${fixed(shear.sv)} = ${shear.asvPerS.toFixed(3)} mm2/mm` : `No vertical shear reinforcement selected; A<sub>sv</sub>/s = 0 mm2/mm`}</code></div>
    <div><b>Simplified shear factor - AS 3600 Cl. 8.2.4.3</b><code>&theta;<sub>v</sub> = ${shear.theta.toFixed(0)} deg; A<sub>sv,min</sub>/s = 0.08&radic;f'<sub>c</sub>b<sub>v</sub>/f<sub>sy.f</sub> = ${shear.asvMinPerS.toFixed(3)} mm2/mm; ${shear.minShearReoProvided ? `provided A<sub>sv</sub>/s = ${shear.asvPerS.toFixed(3)} mm2/mm >= minimum, so k<sub>v</sub> = 0.15` : `provided A<sub>sv</sub>/s = ${shear.asvPerS.toFixed(3)} mm2/mm < minimum, so k<sub>v</sub> = min(200/(1000 + 1.3d<sub>v</sub>), 0.15) = ${shear.kv.toFixed(3)}`}</code></div>
    <div><b>Concrete shear contribution - AS 3600 Cl. 8.2.4.1</b><code>V<sub>uc</sub> = k<sub>v</sub>b<sub>v</sub>d<sub>v</sub>&radic;f'<sub>c</sub> = ${shear.kv.toFixed(3)} x ${fixed(shear.bv)} x ${fixed(shear.dv)} x ${shear.rootFc.toFixed(2)} / 1000 = ${fixed(shear.vuc)} kN; &radic;f'<sub>c</sub> is limited to 8.0 MPa</code></div>
    <div><b>Shear reinforcement contribution - AS 3600 Cl. 8.2.5.2</b><code>${shear.hasShearReo ? `V<sub>us</sub> = (A<sub>sv</sub>f<sub>sy.f</sub>d<sub>v</sub>/s)cot&theta;<sub>v</sub> = (${fixed(shear.asv)} x ${fixed(shear.fsyf)} x ${fixed(shear.dv)} / ${fixed(shear.sv)}) x ${shear.cotTheta.toFixed(3)} / 1000 = ${fixed(shear.vus)} kN` : `No vertical shear reinforcement selected; V<sub>us</sub> = 0 kN`}${shear.hasShearReo && !shear.minShearReoProvided ? `; CHECK: provided A<sub>sv</sub>/s is below the AS 3600 Cl. 8.2.1.7 minimum` : ``}</code></div>
    <div><b>One-way shear design capacity - AS 3600 Cl. 8.2.3.1 and AS 3600 Table 2.2.2</b><code>V<sub>u,raw</sub> = V<sub>uc</sub> + V<sub>us</sub> = ${fixed(shear.vuc)} + ${fixed(shear.vus)} = ${fixed(shear.vuRaw)} kN; V<sub>u,max</sub> = ${fixed(shear.vuMax)} kN; V<sub>u</sub> = ${fixed(shear.vu)} kN; &phi; = ${shear.phi.toFixed(2)} ${shear.webCrushingLimited ? `because web crushing limits the strength` : shear.minShearReoProvided ? `with verified minimum Class N fitments and no web-crushing limit` : `without verified minimum Class N fitments`}; &phi;V<sub>u</sub> = ${fixed(shear.phiVu)} kN</code></div>`
    : `<div><b>One-way shear scope - AS 3600 Cl. 8.2.4.1</b><code>Not evaluated - outside simplified-method scope: ${shear.scopeFailures.join("; ")}. Use the applicable general shear method. This page does not expand into a complete shear-design engine.</code></div>`;

  $("concreteFormulaSteps").innerHTML = `
    <div><b>Analysis basis</b><code>${checkedDirectionLabel} strip; only reinforcement parallel to this checked direction is entered. ${direction === "top" ? "Top face" : "Bottom face"} is the compression face and each reinforcement mat is transformed to d<sub>i</sub> from that face. ${compositeSection ? `Composite pad-on-pad section: D = D<sub>top</sub> + D<sub>bot</sub> = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm; all active mats may participate. Interface shear transfer, anchorage and composite action are outside this section solution.` : `${sectionKind === "bottom" ? "Single bottom-pad" : "Single top-pad"} section: D = ${fixed(data.depth)} mm; only that pad's active mats participate.`}</code></div>
    <div><b>Automatic reinforcement depth</b><code>${depthBasis === "inside" ? `Checked-direction bars are placed immediately inside contacting ${crossingBar.designation} orthogonal bars: face offset = c<sub>nom</sub> + d<sub>b,&perp;</sub> + d<sub>b</sub>/2. Crossing-bar diameter d<sub>b,&perp;</sub> = ${fixed(crossingBar.diameter)} mm; clear layer gap = 0 mm. Use manual y<sub>i</sub> for drawing-derived gaps or different stacking.` : `Checked-direction bars are closest to the concrete face: face offset = c<sub>nom</sub> + d<sub>b</sub>/2. Crossing-bar size is not used.`}</code></div>
    <div><b>Reinforcement area</b><code>A<sub>si</sub> = A<sub>bar,table</sub> x b / spacing. Current N-bar values use the InfraBuild Reinforcing 500PLUS nominal table: N10/N12/N16/N20/N24/N28/N32/N36/N40 = 79/113/201/314/452/616/804/1018/1257 mm2 per bar. N bars default to f<sub>sy</sub> = 500 MPa. Legacy Y bars use the matching nominal diameter area and default f<sub>sy</sub> = 410 MPa pending project verification; design-model f<sub>sy</sub> is capped at 600 MPa.</code></div>
    <div><b>Stress block</b><code>&alpha;<sub>2</sub> = max(0.85 - 0.0015f'<sub>c</sub>, 0.67) = ${data.alpha2.toFixed(3)}; &gamma; = max(0.97 - 0.0025f'<sub>c</sub>, 0.67) = ${data.gamma.toFixed(3)}</code></div>
    <div><b>Equivalent concrete stress block</b><code>a = min(D, &gamma;x) = min(${fixed(data.depth)}, ${data.gamma.toFixed(3)} x ${fixed(result.x)}) = ${fixed(result.blockDepth)} mm; C<sub>c</sub> = &alpha;<sub>2</sub> f'<sub>c</sub>ba = ${fixed(result.cc / 1000)} kN</code></div>
    <div><b>Steel strain</b><code>&epsilon;<sub>si</sub> = &epsilon;<sub>cu</sub>(x - d<sub>i</sub>) / x; compression positive, tension negative</code></div>
    <div><b>Steel stress</b><code>f<sub>si</sub> = E<sub>s</sub>&epsilon;<sub>si</sub>, capped at +/- f<sub>sy</sub>; for a bar inside the rectangular concrete block, F<sub>si</sub> = A<sub>si</sub>(f<sub>si</sub> - &alpha;<sub>2</sub>f'<sub>c</sub>) to avoid double-counting displaced concrete</code></div>
    <div><b>Neutral-axis equilibrium</b><code>C<sub>c</sub> + &Sigma;F<sub>s</sub> = ${residual.toFixed(3)} kN residual for N<sup>*</sup> = 0</code></div>
    <div><b>Nominal flexural capacity</b><code>M<sub>uo</sub> = internal force couple = ${fixed(result.muo)} kNm for the selected strip width b</code></div>
    <div><b>Capacity factor - AS 3600 Table 2.2.2</b><code>${legacyLayers.length ? `Legacy Y bar selected: conservative quick-screen &phi; = 0.65 unless actual bar grade and N-class equivalence are verified` : `Pure-bending N-class reinforcement assumption: k<sub>uo</sub> = x / d<sub>o</sub> = ${fixed(result.x)} / ${fixed(result.d0)} = ${result.kuo.toFixed(3)}; &phi; = clamp(1.24 - 13k<sub>uo</sub>/12, 0.65, 0.85)`} = ${result.phi.toFixed(2)}</code></div>
    <div><b>Ductility limit</b><code>${result.kuo > 0.36 ? `k<sub>uo</sub> = ${result.kuo.toFixed(3)} > 0.36; AS 3600 Cl. 8.1.5 conditions must be satisfied before using this as a design section` : `k<sub>uo</sub> = ${result.kuo.toFixed(3)} <= 0.36`}</code></div>
    <div><b>Design flexural capacity</b><code>&phi;M<sub>uo</sub> = ${result.phi.toFixed(2)} x ${fixed(result.muo)} = ${fixed(result.phiMuo)} kNm; verify AS 3600 Table 2.2.2 and ductility class before issue for design</code></div>
    ${shearFormulaSteps}`;
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
    return { level: "Project input", detail: "Source reference required", className: "source-user" };
  }
  if (manufacturerKey === "katana") {
    return { level: "Published + local certificate", detail: "Rev Z guide; CodeMark scope checked separately", className: "source-official" };
  }
  if (manufacturerKey === "stopdigging") {
    return { level: "Manufacturer published", detail: "Directional values captured; project basis not verified", className: "source-official" };
  }
  if (manufacturerKey === "surefoot") {
    return { level: "Manufacturer published", detail: "Indicative system rating only; project design controls", className: "source-official" };
  }
  if (manufacturerKey === "ideal") {
    return { level: "Manufacturer published", detail: "System SWL only; project direction values required", className: "source-official" };
  }
  if (manufacturerKey === "blade") {
    return { level: "Manufacturer published", detail: "Public range; project resistance required", className: "source-official" };
  }
  if (manufacturerKey === "piletech") {
    return { level: "Supplier range", detail: "Public range; resistance by design", className: "source-prompt" };
  }
  if (manufacturerKey === "driven") {
    return { level: "Manufacturer dimensions", detail: "Geometry only; capacity not stated", className: "source-prompt" };
  }
  if (manufacturerKey === "keller") {
    return { level: "Published benchmark", detail: "Typical SWL; ground conditions govern", className: "source-prompt" };
  }
  if (manufacturerKey === "minmetals") {
    return { level: "Supplier component", detail: "Supplier design required", className: "source-prompt" };
  }
  return { level: "Supplier confirmation", detail: "Capacity row not embedded", className: "source-prompt" };
}

function screwDataStatus(manufacturerKey, pile) {
  const type = screwCapacityType(pile);
  if (manufacturerKey === "custom" || type === "project") {
    return { label: "Project input", detail: "Project traceability required", className: "data-project" };
  }
  if (type === "directional-product") {
    return { label: "Published directional values", detail: "Reference only; design basis not verified", className: "data-directional" };
  }
  if (type === "compression-swl-up-to") {
    return { label: "Compression SWL up to", detail: "Reference limit in stated guide conditions", className: "data-compression" };
  }
  if (type === "system-swl-up-to") {
    return { label: "System SWL up to", detail: "Not a direction-specific resistance", className: "data-reference" };
  }
  if (type === "indicative-rating") {
    return { label: "Indicative system rating", detail: "Not a pile resistance", className: "data-rating" };
  }
  if (type === "typical-benchmark") {
    return { label: "Typical SWL benchmark", detail: "Not a project capacity row", className: "data-typical" };
  }
  return { label: "Geometry only", detail: "Project capacity values required", className: "data-geometry" };
}

function screwCapacityType(pile) {
  if (pile.capacityType) return pile.capacityType;
  const directionCount = [pile.compression, pile.uplift, pile.lateral].filter(valueNumber => (valueNumber || 0) > 0).length;
  return directionCount === 3 ? "directional-product" : directionCount > 0 ? "partial-directional" : "geometry";
}

function screwCapacityLabels(pile) {
  const type = screwCapacityType(pile);
  if (type === "compression-swl-up-to") return { compression: "Compression SWL up to", uplift: "Published uplift load", lateral: "Published lateral load" };
  if (type === "system-swl-up-to") return { compression: "System SWL up to", uplift: "Published uplift load", lateral: "Published lateral load" };
  if (type === "indicative-rating") return { compression: "Maximum recommended rating", uplift: "Published uplift load", lateral: "Published lateral load" };
  if (type === "typical-benchmark") return { compression: "Typical axial SWL up to", uplift: "Typical uplift SWL up to", lateral: "Typical lateral SWL up to" };
  if (type === "project") return { compression: "Project compression", uplift: "Project tension", lateral: "Project lateral load" };
  return { compression: "Published compression", uplift: "Published tension / uplift load", lateral: "Published lateral load" };
}

function screwDisplayCapacities(pile, enteredValues) {
  const type = screwCapacityType(pile);
  const ratingTypes = ["system-swl-up-to", "indicative-rating", "typical-benchmark"];
  return {
    compression: ratingTypes.includes(type) && (pile.rating || 0) > 0 ? pile.rating : enteredValues.compression,
    uplift: enteredValues.uplift,
    lateral: enteredValues.lateral
  };
}

function screwComparisonCapacities(pile, displayValues) {
  const actionBasis = $("screwDemandBasis").value;
  const projectValues = {
    compression: value("screwProjectCompression"),
    uplift: value("screwProjectTension"),
    lateral: value("screwProjectHorizontal")
  };
  const hasProjectValues = Object.values(projectValues).some(valueNumber => valueNumber > 0);
  if (hasProjectValues) {
    const valueBasis = $("screwProjectBasis").value;
    const source = $("screwProjectSource").value.trim();
    const basis = !source ? "project-source-missing" : valueBasis !== actionBasis ? "project-basis-mismatch" : "project";
    return { ...projectValues, basis, actionBasis, valueBasis, source };
  }
  return { compression: 0, uplift: 0, lateral: 0, basis: "none", actionBasis, valueBasis: "none", source: "" };
}

function screwValueBasisText(pile) {
  const type = screwCapacityType(pile);
  if (type === "compression-swl-up-to") return "Guide SWL up to; stated ground and installation conditions apply.";
  if (type === "system-swl-up-to") return "Guide system SWL up to; project direction values are required.";
  if (type === "indicative-rating") return "Maximum recommended system rating; not a pile resistance.";
  if (type === "typical-benchmark") return "Typical benchmark; project resistance is required.";
  if (type === "directional-product") return "Published directional value; reference only, with design basis unverified.";
  if (type === "project") return "Project value; source and design basis required.";
  return "No published resistance value.";
}

function screwHasMultipleHelices(pile) {
  return /2 helices|multiple|multi[- ]helix|single or multi|project-selected helices/i.test(`${pile.helixCount || ""} ${pile.helix || ""}`);
}

function screwTorqueLimit(pile) {
  const type = screwSystemType(pile);
  if (type === "Micro-pile footing") return "Not applicable; driven installation.";
  return "Not published; verify shaft torsional limit.";
}

function screwInstallationCriterion(pile) {
  return screwCompactFact(pile.installControl || "Supplier termination and refusal criteria required.", 92);
}

function screwPitchText(pile) {
  const helix = String(pile.helix || "");
  return /pitch|spacing/i.test(helix) ? screwCompactFact(helix, 72) : "Not published";
}

function screwSourceReviewText(manufacturerKey) {
  if (manufacturerKey === "custom") return "Not reviewed";
  if (manufacturerKey === "katana") return "Local source reviewed · 10 Jul 2026";
  return "Public source accessed · 10 Jul 2026";
}

function screwHeadConnectionLimit(pile) {
  const type = screwSystemType(pile);
  if (type === "Micro-pile footing") return "Supplier-designed pile-cap connection.";
  if (type === "Ground screw") return "Proprietary head; verify tension and shear transfer.";
  return "Project tension and shear-transfer detail required.";
}

function screwDurabilityLimit() {
  return "Design life and corrosion allowance not stated.";
}

function screwPrimaryLimitation(pile) {
  const type = screwSystemType(pile);
  const capacityType = screwCapacityType(pile);
  const application = $("screwApplication").value;
  const overturningUse = ["monopole", "tower", "sign"].includes(application);
  if (capacityType === "indicative-rating") {
    return "Indicative rating only; supplier footing design required.";
  }
  if (capacityType === "typical-benchmark") {
    return "Benchmark only; obtain project pile resistances.";
  }
  if (capacityType === "system-swl-up-to") {
    return "System SWL only; obtain direction-specific project values.";
  }
  if (type === "Micro-pile footing") {
    return "Supplier-designed cap and pile arrangement required.";
  }
  if (type === "Ground screw") {
    return overturningUse
      ? "Not a default pole/tower pile; require project certification."
      : "Confirm structural class, embedment and head movement.";
  }
  if (type === "Engineered pathway") {
    return "Project compression, tension and horizontal resistance values required.";
  }
  if ((pile.compression || 0) <= 0 && (pile.uplift || 0) <= 0) {
    return "Obtain project compression and tension resistance values.";
  }
  if ((pile.uplift || 0) <= 0) {
    return overturningUse
      ? "Obtain project tension resistance; complete the horizontal-response and rotation assessment."
      : "Obtain project tension resistance for uplift loading.";
  }
  if ((pile.compression || 0) <= 0) {
    return "Obtain project compression resistance.";
  }
  if ((pile.lateral || 0) <= 0) {
    return overturningUse
      ? "Axial reference values are available; horizontal response and rotation remain project checks."
      : "Obtain project horizontal resistance.";
  }
  return overturningUse
    ? "Check group uplift, cap connection and pile-head movement."
    : "Confirm site and installation acceptance.";
}

function screwResistanceFieldsText(pile) {
  const type = screwCapacityType(pile);
  if ((pile.rating || 0) > 0) {
    const label = type === "indicative-rating" ? "Rating" : type === "typical-benchmark" ? "Typical SWL" : "System SWL";
    return `${label} ${screwCapacityText(pile.rating)} kN; direction-specific values by project`;
  }
  const axial = pile.axialClass > 0 ? `Class ${screwCapacityText(pile.axialClass)} kN` : "Class -";
  const compression = pile.compression > 0 ? `Compression ${screwCapacityText(pile.compression)} kN` : "Compression -";
  const uplift = pile.uplift > 0 ? `Tension ${screwCapacityText(pile.uplift)} kN` : "Tension -";
  const lateral = pile.lateral > 0 ? `Horizontal ${screwCapacityText(pile.lateral)} kN` : "Horizontal -";
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

function screwSystemFilterKey(pile) {
  const type = screwSystemType(pile);
  if (type === "Helical screw pile" || type === "Manufactured screw pier") return "helical";
  if (type === "Ground screw") return "ground";
  if (type === "Micro-pile footing") return "micro";
  return "engineered";
}

function screwDataFilterKey(pile) {
  const type = screwCapacityType(pile);
  if (type === "directional-product") return "directional";
  if (["compression-swl-up-to", "system-swl-up-to", "partial-directional"].includes(type)) return "axial";
  if (["indicative-rating", "typical-benchmark"].includes(type)) return "rating";
  return "geometry";
}

function screwShaftFilterKey(pile) {
  const numbers = screwMetricNumbers(`${pile.diameter || ""} ${pile.shaft || ""}`);
  if (!numbers.length) return "unknown";
  if (numbers[0] <= 90) return "small";
  if (numbers[0] <= 150) return "medium";
  return "large";
}

function screwHelixFilterKey(pile) {
  const dimensions = screwSketchDimensions(pile);
  if (dimensions.microPile || dimensions.continuousThread || dimensions.noHelix) return "other";
  return dimensions.helixCount > 1 ? "multiple" : "single";
}

function screwProductCapacityValues(pile) {
  const type = screwCapacityType(pile);
  const rating = ["system-swl-up-to", "indicative-rating", "typical-benchmark"].includes(type) ? (pile.rating || 0) : 0;
  return {
    primaryLabel: type === "system-swl-up-to" ? "System SWL" : type === "indicative-rating" ? "Rating" : type === "typical-benchmark" ? "Typical SWL" : "Compression",
    compression: rating || pile.compression || 0,
    publishedCompression: pile.compression || 0,
    tension: pile.uplift || 0,
    lateral: pile.lateral || 0,
    unitBasis: ["system-swl-up-to", "indicative-rating"].includes(type) ? "Complete system" : type === "typical-benchmark" ? "Technique benchmark" : "Per pile / product",
    loadBasis: ["compression-swl-up-to", "system-swl-up-to", "typical-benchmark"].includes(type) ? "SWL / working reference" : type === "indicative-rating" ? "Indicative rating" : type === "directional-product" ? "Published load; basis not verified" : "Basis not stated"
  };
}

function screwSelectionAdvice(pile, manufacturerKey = $("screwManufacturer")?.value || "custom") {
  const soilKey = $("screwSoil")?.value || "unknown";
  const soil = screwSoilRules[soilKey] || screwSoilRules.unknown;
  const application = $("screwApplication")?.value || "generic";
  const overturning = ["monopole", "tower", "sign"].includes(application);
  const type = screwSystemType(pile);
  const dataStatus = screwDataStatus(manufacturerKey, pile);
  const missing = [];
  if ((pile.compression || 0) <= 0) missing.push("compression");
  if (overturning && (pile.uplift || 0) <= 0) missing.push("tension");
  if (overturning && (pile.lateral || 0) <= 0) missing.push("lateral");

  if (soilKey === "unknown") {
    return { label: "Ground data required", note: "Confirm founding layer, groundwater and installation conditions.", className: "fit-check" };
  }
  if (soil.severity >= 3) {
    return { label: "Geotechnical review", note: soil.note, className: "fit-alert" };
  }
  if (type === "Ground screw" && overturning) {
    return { label: "Project certification", note: "Not a default pole or tower selection; confirm structural class and head movement.", className: "fit-alert" };
  }
  if (missing.length) {
    return { label: "Project design values required", note: `Obtain ${missing.join(", ")} values for the selected ground and load basis.`, className: "fit-check" };
  }
  if (screwCapacityType(pile) === "directional-product") {
    return { label: "Published data available", note: "Confirm source load basis, embedment and installation criteria.", className: "fit-data" };
  }
  return { label: "Project confirmation", note: `${dataStatus.label}; confirm applicability with the supplier and geotechnical design.`, className: "fit-neutral" };
}

function screwFilteredCatalogueRows() {
  const supplier = $("screwFilterSupplier")?.value || "all";
  const system = $("screwFilterSystem")?.value || "all";
  const data = $("screwFilterData")?.value || "all";
  const minimumCompression = value("screwFilterCompression");
  const minimumTension = value("screwFilterTension");
  const lateral = $("screwFilterLateral")?.value || "all";
  const shaft = $("screwFilterShaft")?.value || "all";
  const helix = $("screwFilterHelix")?.value || "all";
  const sort = $("screwFilterSort")?.value || "supplier";
  const rows = screwCatalogueRows().filter(row => {
    const capacities = screwProductCapacityValues(row.pile);
    return (
    (supplier === "all" || row.manufacturerKey === supplier)
    && (system === "all" || screwSystemFilterKey(row.pile) === system)
    && (data === "all" || screwDataFilterKey(row.pile) === data)
    && (minimumCompression <= 0 || capacities.publishedCompression >= minimumCompression)
    && (minimumTension <= 0 || capacities.tension >= minimumTension)
    && (lateral === "all" || capacities.lateral > 0)
    && (shaft === "all" || screwShaftFilterKey(row.pile) === shaft)
    && (helix === "all" || screwHelixFilterKey(row.pile) === helix)
    );
  });
  const dataOrder = { directional: 0, axial: 1, rating: 2, geometry: 3 };
  return rows.sort((left, right) => {
    if (sort === "compression-desc") return screwProductCapacityValues(right.pile).publishedCompression - screwProductCapacityValues(left.pile).publishedCompression;
    if (sort === "shaft-asc") {
      const leftNumbers = screwMetricNumbers(`${left.pile.diameter || ""} ${left.pile.shaft || ""}`);
      const rightNumbers = screwMetricNumbers(`${right.pile.diameter || ""} ${right.pile.shaft || ""}`);
      return (leftNumbers[0] ?? Infinity) - (rightNumbers[0] ?? Infinity);
    }
    if (sort === "data") return dataOrder[screwDataFilterKey(left.pile)] - dataOrder[screwDataFilterKey(right.pile)];
    return `${left.manufacturer} ${left.pile.label}`.localeCompare(`${right.manufacturer} ${right.pile.label}`);
  });
}

function screwCapacityCell(pile, direction) {
  const values = screwProductCapacityValues(pile);
  const value = direction === "compression" ? values.compression : direction === "tension" ? values.tension : values.lateral;
  const label = direction === "compression" ? values.primaryLabel : direction === "tension" ? "Tension" : "Lateral load";
  const basis = direction === "compression" ? `${values.unitBasis} · ${values.loadBasis}` : value > 0 ? values.unitBasis : "No published value";
  return `<div class="screw-table-capacity ${value > 0 ? "has-value" : "not-published"}">
    <b>${safeText(value > 0 ? `${screwCapacityText(value)} kN` : "Not published")}</b>
    <small>${safeText(value > 0 ? `${label} · ${basis}` : basis)}</small>
  </div>`;
}

function updateScrewCatalogueMatrix() {
  const body = $("screwCatalogueRows");
  if (!body) return;
  const selectedManufacturer = $("screwManufacturer").value;
  const selectedSeries = $("screwSeries").value;
  const allRows = screwCatalogueRows();
  const rows = screwFilteredCatalogueRows();
  const withDirectional = rows.filter(row => row.pile.compression > 0 && row.pile.uplift > 0 && row.pile.lateral > 0).length;
  const supplierCount = new Set(rows.map(row => row.manufacturerKey)).size;
  $("screwMarketSummary").innerHTML = [
    `${rows.length} of ${allRows.length} products`,
    `${supplierCount} suppliers`,
    `${withDirectional} with directional data`
  ].map(item => `<span>${safeText(item)}</span>`).join("");
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="9" class="screw-no-results"><b>No matching products</b><small>Adjust one or more selection filters.</small></td></tr>`;
    return;
  }
  body.innerHTML = rows.map(row => {
    const pile = row.pile;
    const confidence = screwSourceConfidence(row.manufacturerKey, pile);
    const dataStatus = screwDataStatus(row.manufacturerKey, pile);
    const advice = screwSelectionAdvice(pile, row.manufacturerKey);
    const active = row.manufacturerKey === selectedManufacturer && row.seriesKey === selectedSeries;
    const shaftPrimary = screwSelectedText(pile.diameter || pile.shaft);
    const shaftSecondary = pile.wall ? `Wall ${pile.wall}` : screwSelectedText(pile.shaft);
    return `
      <tr class="${active ? "is-selected" : ""}">
        <td><b>${safeText(pile.label)}</b><small>${safeText(row.manufacturer)} · ${safeText(screwSystemType(pile))}</small><span class="screw-source-pill ${confidence.className}">${safeText(confidence.level)}</span></td>
        <td data-label="Compression / rating">${screwCapacityCell(pile, "compression")}</td>
        <td data-label="Tension">${screwCapacityCell(pile, "tension")}</td>
        <td data-label="Lateral">${screwCapacityCell(pile, "lateral")}</td>
        <td data-label="Shaft"><b>${safeText(shaftPrimary)}</b><small>${safeText(shaftSecondary)}</small></td>
        <td data-label="Helix / bearing"><b>${safeText(screwSelectedText(pile.helixCount))}</b><small>${safeText(screwSelectedText(pile.helix))}</small></td>
        <td data-label="Length"><b>${safeText(screwCompactFact(pile.length || "Project-specific", 42))}</b><small>${safeText(screwCompactFact(pile.extension || "Confirm extension detail", 46))}</small></td>
        <td data-label="Data / limitation"><span class="screw-data-pill ${dataStatus.className}">${safeText(dataStatus.label)}</span><small><b class="${advice.className}">${safeText(advice.label)}</b>${safeText(screwPrimaryLimitation(pile))}</small></td>
        <td><button type="button" class="mini-action" data-screw-select data-manufacturer="${safeText(row.manufacturerKey)}" data-series="${safeText(row.seriesKey)}">${active ? "Selected" : "View"}</button></td>
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
  $("screwProjectCompression").value = "0";
  $("screwProjectTension").value = "0";
  $("screwProjectHorizontal").value = "0";
  $("screwProjectSource").value = "";
  $("screwProjectBasis").value = $("screwDemandBasis").value || "uls";
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

function setScrewSourceLink(id, text, url) {
  const element = $(id);
  if (!element) return;
  element.textContent = screwSelectedText(text);
  if (url) {
    element.href = url;
    element.removeAttribute("aria-disabled");
  } else {
    element.removeAttribute("href");
    element.setAttribute("aria-disabled", "true");
  }
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
    { key: "compression", value: compressionCap },
    { key: "tension", value: upliftCap }
  ];
  const adopted = directions.filter(item => item.value > 0).map(item => item.key);
  const missing = directions.filter(item => item.value <= 0).map(item => item.key);
  const lateralMissing = lateralCap <= 0;
  return {
    adopted,
    missing,
    lateralMissing,
    title: `Axial values ${adopted.length} of 2`,
    note: missing.length
      ? `Missing ${missing.join(", ")}. Request certified compression/tension values.`
      : lateralMissing
        ? "Axial values available; project horizontal resistance is still required for horizontal action or overturning."
        : "Compression, tension and horizontal values are available from the selected source."
  };
}

function screwNextEvidence(pile, compressionCap, upliftCap, lateralCap) {
  const capacitySource = $("screwCapacitySource").value;
  const coverage = screwCapacityCoverage(compressionCap, upliftCap, lateralCap);
  const install = $("screwInstallEvidence").value;
  const lateralSensitive = $("screwLateralSensitivity").value !== "undefined" || ["monopole", "tower", "sign", "anchor"].includes($("screwApplication").value);
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
      title: lateralCap > 0 ? "Movement check" : "Request horizontal value",
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
    output.textContent = "Not published";
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
  const helixText = screwSelectedText(pile.helix || "Project-specific bearing element");
  const shaftFact = `${screwSelectedText(pile.diameter || shaftText)} / wall ${screwSelectedText(pile.wall)}`;
  setOptionalText("screwFactSystem", system);
  setOptionalText("screwFactShaft", shaftFact);
  setOptionalText("screwFactHelixCount", screwSelectedText(pile.helixCount));
  setOptionalText("screwFactHelix", helixText);
  setOptionalText("screwFactPitch", screwPitchText(pile));
  setOptionalText("screwFactLength", screwCompactFact(pile.length || "Project-specific", 72));
  setOptionalText("screwFactExtension", screwCompactFact(pile.extension || "Project-specific connection", 80));
  setOptionalText("screwFactSteel", screwCompactFact(pile.steel || "Supplier/project specification", 92));
  setScrewSourceLink("screwFactSource", pile.source || "Project source", selectedScrewCatalogue().sourceUrl);
  setOptionalText("screwFactSourceStatus", confidence.level);
  setOptionalText("screwFactCapacityBasis", screwCompactFact(pile.capacityBasis || "Adopt certified resistance before action checks.", 110));
  setOptionalText("screwFactSourceReview", screwSourceReviewText($("screwManufacturer").value));
  setOptionalText("screwFactInstallCriterion", screwInstallationCriterion(pile));
  setOptionalText("screwFactTorqueLimit", screwTorqueLimit(pile));
  setOptionalText("screwFactHeadConnection", screwHeadConnectionLimit(pile));
  setOptionalText("screwFactDurability", screwDurabilityLimit(pile));
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
  const { columns, rows, lengthX, lengthY } = updateScrewLayoutControls();
  const xValues = Array.from({ length: columns }, (_, index) => -lengthX / 2 + index * lengthX / (columns - 1));
  const yValues = Array.from({ length: rows }, (_, index) => -lengthY / 2 + index * lengthY / (rows - 1));
  let coordinates;
  if (layout === "rect-grid") {
    coordinates = yValues.slice().reverse().flatMap(y => xValues.map(x => ({ x, y })));
  } else {
    const top = xValues.map(x => ({ x, y: lengthY / 2 }));
    const right = yValues.slice(1, -1).reverse().map(y => ({ x: lengthX / 2, y }));
    const bottom = xValues.slice().reverse().map(x => ({ x, y: -lengthY / 2 }));
    const left = yValues.slice(1, -1).map(y => ({ x: -lengthX / 2, y }));
    coordinates = [...top, ...right, ...bottom, ...left];
  }
  return coordinates.map((point, index) => ({ id: index + 1, ...point }));
}

function updateScrewLayoutControls() {
  const perimeter = $("screwLayout").value === "rect-perimeter";
  const columns = Math.max(2, Math.min(8, Math.round(value("screwPileColumns") || 3)));
  const rows = Math.max(2, Math.min(8, Math.round(value("screwPileRows") || 3)));
  const enteredLengthX = value("screwGroupLengthX");
  const enteredLengthY = value("screwGroupLengthY");
  const lengthX = Math.max(0.1, enteredLengthX || 0.1);
  const lengthY = Math.max(0.1, enteredLengthY || 0.1);
  $("screwPileColumns").value = columns;
  $("screwPileRows").value = rows;
  $("screwPileColumnsLabel").innerHTML = perimeter ? "Piles per X edge, n<sub>x</sub>" : "Pile columns, n<sub>x</sub>";
  $("screwPileRowsLabel").innerHTML = perimeter ? "Piles per Y edge, n<sub>y</sub>" : "Pile rows, n<sub>y</sub>";
  $("screwLayoutNote").innerHTML = perimeter
    ? "Counts include corner piles. L<sub>x</sub> and L<sub>y</sub> are centre-to-centre spans between outer piles."
    : "All grid intersections contain a pile. L<sub>x</sub> and L<sub>y</sub> are centre-to-centre spans between outer piles.";
  if (enteredLengthX < 0.1) $("screwGroupLengthX").value = lengthX;
  if (enteredLengthY < 0.1) $("screwGroupLengthY").value = lengthY;
  return { columns, rows, lengthX, lengthY };
}

function screwRiskNotes(pile, compressionCap, upliftCap, lateralCap) {
  const notes = [];
  let severity = 0;
  const soilKey = $("screwSoil").value;
  const soil = screwSoilRules[soilKey] || screwSoilRules.unknown;
  const dimensions = screwSketchDimensions(pile);
  const multipleHelices = screwHasMultipleHelices(pile);
  const largeHelix = !dimensions.noHelix && Number.isFinite(dimensions.helixDiameter) && dimensions.helixDiameter >= 400;
  severity += soil.severity;

  const exposure = $("screwExposure").value;
  let groundText = `${soil.label}. ${soil.note}`;
  if (soilKey === "rock-refusal") {
    groundText = multipleHelices || largeHelix
      ? "Rock/refusal. Large or multiple helices increase installation risk; confirm rig torque and pre-drill/refusal criteria."
      : "Rock/refusal. Confirm pre-drill/refusal criteria and founding detail.";
  } else if (soilKey === "reactive-clay") {
    groundText = "Reactive clay. Terminate the helix below the active movement zone and check shaft/head restraint.";
  } else if (["soft-clay", "loose-sand"].includes(soilKey)) {
    groundText = `${soil.label}. Depth, movement and load testing are likely to govern.`;
  } else if (soilKey === "saturated-sand") {
    groundText = "Saturated sand. Specialist liquefaction and cyclic uplift review required.";
  } else if (soilKey === "sensitive-clay") {
    groundText = "Sensitive clay. Specialist geotechnical design and installation review required.";
  }
  const exposureNotes = {
    "not-assessed": { severity: 1, text: " Steel exposure classification has not been assessed." },
    "non-aggressive": { severity: 0, text: " Confirm the non-aggressive classification from project soil and groundwater data." },
    mild: { severity: 1, text: " Complete durability design for the AS 2159 mild exposure classification." },
    moderate: { severity: 2, text: " Complete durability design for the AS 2159 moderate exposure classification." },
    severe: { severity: 3, text: " Severe exposure requires project durability design and installation-compatible protection." },
    "very-severe": { severity: 4, text: " Very severe exposure requires a site-specific durability assessment." }
  };
  const exposureNote = exposureNotes[exposure] || exposureNotes["not-assessed"];
  severity += exposureNote.severity;
  groundText += exposureNote.text;
  if (exposure === "very-severe" && $("screwManufacturer").value === "katana") {
    groundText += " The selected CodeMark scope excludes very severe exposure.";
  }
  notes.push({ title: "Ground / durability", text: groundText });

  const install = $("screwInstallEvidence").value;
  const installationNotes = [];
  if (install === "none") {
    severity += 1;
    installationNotes.push("Require torque, depth, termination and as-built installation records.");
  } else if (install === "torque") {
    severity += 1;
    installationNotes.push("Verify final torque, depth and founding layer against acceptance criteria.");
  } else if (install === "test") {
    installationNotes.push("Retain the static load-test method, load level, acceptance criteria and movement records.");
  } else {
    installationNotes.push("Verify the installation record and static load-test evidence.");
  }
  if (multipleHelices) {
    installationNotes.push("Check helix spacing, interaction and installation torque.");
  } else if (largeHelix) {
    installationNotes.push("Confirm equipment torque and refusal risk for the selected helix.");
  } else if (/No screw helix/i.test(pile.helixCount || "")) {
    installationNotes.push("Supplier system certificate governs.");
  }
  notes.push({ title: "Installation", text: installationNotes.join(" ") });

  const application = $("screwApplication").value;
  const movementCriterion = $("screwLateralSensitivity").value;
  const lateralImportant = ["monopole", "tower", "sign", "anchor"].includes(application) || movementCriterion !== "undefined";
  const missing = [];
  if (compressionCap <= 0) missing.push("compression resistance");
  if (upliftCap <= 0) missing.push("tension resistance");
  if (missing.length) {
    severity += 1;
  }
  if (lateralImportant && lateralCap <= 0) {
    severity += 2;
  }
  if (movementCriterion === "critical") {
    severity += 2;
  } else if (movementCriterion === "undefined" && lateralImportant) {
    severity += 1;
  }
  const applicationNotes = {
    monopole: "Overturning makes tension, cap connection and pile-head rotation key.",
    tower: "Check biaxial overturning, group uplift and cap connection.",
    sign: "Check overturning, cyclic response and pile-head rotation.",
    anchor: "Confirm load direction, cyclic demand and connection detailing.",
    platform: "Confirm axial distribution, bracing reactions and head connection.",
    generic: "Confirm load direction, group behaviour and head connection."
  };
  const applicationText = applicationNotes[application] || applicationNotes.generic;
  const type = screwSystemType(pile);
  const typeNote = /Micro-pile footing|Ground screw|Engineered pathway/i.test(type)
    ? ` ${type} requires supplier/project certification.`
    : "";
  const movementNotes = {
    undefined: " Define pile-head translation and rotation limits.",
    defined: " Apply the project movement limits.",
    critical: " Movement governs screening."
  };
  notes.push({
    title: "Application",
    text: `${applicationText}${typeNote}${movementNotes[movementCriterion] || movementNotes.undefined}`
  });
  if (/Micro-pile footing|Ground screw|Engineered pathway/i.test(type)) {
    severity += 1;
  }
  return { severity, notes };
}

function updateScrewRisk(pile, compressionCap, upliftCap, lateralCap) {
  const advice = screwSelectionAdvice(pile);
  const status = $("screwSelectionStatus");
  if (!status) return;
  status.textContent = advice.label;
  setStatusClass(status, advice.className === "fit-data" ? "pass" : advice.className === "fit-alert" ? "fail" : "check");
  setOptionalText("screwSelectionGuidance", advice.note);
}

function calculateScrewDemand(comparison) {
  const compressionCap = comparison.compression || 0;
  const upliftCap = comparison.uplift || 0;
  const lateralCap = comparison.lateral || 0;
  const comparisonBasis = comparison.basis || "none";
  const actionBasis = comparison.actionBasis || $("screwDemandBasis").value;
  const actionBasisLabels = {
    uls: "ULS design action effects",
    sls: "SLS design action effects",
    service: "unfactored / service reference actions"
  };
  const actionBasisLabel = actionBasisLabels[actionBasis] || "action basis not stated";
  const coords = screwLayoutCoordinates();
  const n = coords.length;
  const baseN = signedValue("screwDemandN");
  const vx = signedValue("screwDemandVx");
  const vy = signedValue("screwDemandVy");
  const mx = signedValue("screwDemandMx");
  const my = signedValue("screwDemandMy");
  const tz = signedValue("screwDemandTz");
  const directShearX = n > 0 ? vx / n : 0;
  const directShearY = n > 0 ? vy / n : 0;
  const sumX2 = coords.reduce((sum, point) => sum + point.x ** 2, 0);
  const sumY2 = coords.reduce((sum, point) => sum + point.y ** 2, 0);
  const sumXY = coords.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumR2 = coords.reduce((sum, point) => sum + point.x ** 2 + point.y ** 2, 0);
  const reactions = coords.map(point => {
    const axial = baseN / n
      + (sumY2 > 0 ? mx * point.y / sumY2 : 0)
      + (sumX2 > 0 ? my * point.x / sumX2 : 0);
    const torsionShearX = sumR2 > 0 ? -tz * point.y / sumR2 : 0;
    const torsionShearY = sumR2 > 0 ? tz * point.x / sumR2 : 0;
    const lateralX = directShearX + torsionShearX;
    const lateralY = directShearY + torsionShearY;
    const lateral = Math.hypot(lateralX, lateralY);
    return { ...point, axial, lateral, lateralX, lateralY };
  });
  const maxCompression = Math.max(0, ...reactions.map(item => item.axial));
  const maxUplift = Math.max(0, ...reactions.map(item => -item.axial));
  const maxLateral = Math.max(0, ...reactions.map(item => item.lateral));
  const maxCompressionPile = maxCompression > 0
    ? reactions.reduce((current, item) => item.axial > current.axial ? item : current)
    : null;
  const maxUpliftPile = maxUplift > 0
    ? reactions.reduce((current, item) => -item.axial > -current.axial ? item : current)
    : null;
  const maxLateralPile = maxLateral > 0
    ? reactions.reduce((current, item) => item.lateral > current.lateral ? item : current)
    : null;
  $("screwDemandPileCount").textContent = String(n);
  $("screwDemandCompression").textContent = `${fixed(maxCompression)} kN`;
  $("screwDemandUplift").textContent = `${fixed(maxUplift)} kN`;
  $("screwDemandLateral").textContent = `${fixed(maxLateral)} kN`;
  $("screwDemandCompressionPile").textContent = maxCompressionPile ? `Pile ${maxCompressionPile.id}` : "Pile -";
  $("screwDemandUpliftPile").textContent = maxUpliftPile ? `Pile ${maxUpliftPile.id}` : "Pile -";
  $("screwDemandLateralPile").textContent = maxLateralPile ? `Pile ${maxLateralPile.id}` : "Pile -";
  $("screwReactionRows").innerHTML = reactions.map(item => {
    const state = item.axial > 0.05 ? "Compression" : item.axial < -0.05 ? "Tension" : "Neutral";
    return `<tr><td>${item.id}</td><td>${fixed2(item.x)} m</td><td>${fixed2(item.y)} m</td><td>${fixed(item.axial)} kN</td><td>${state}</td><td>${fixed(item.lateral)} kN</td></tr>`;
  }).join("");

  const hasDemand = maxCompression > 0 || maxUplift > 0 || maxLateral > 0;
  const comparisonEnabled = comparisonBasis === "project";
  const missingDirections = [];
  if (comparisonEnabled && maxCompression > 0 && compressionCap <= 0) missingDirections.push("compression");
  if (comparisonEnabled && maxUplift > 0 && upliftCap <= 0) missingDirections.push("tension");
  if (comparisonEnabled && maxLateral > 0 && lateralCap <= 0) missingDirections.push("horizontal");
  const comparisons = reactions.flatMap(item => {
    const items = [];
    if (item.axial > 0 && compressionCap > 0) items.push({ pile: item, direction: "compression", ratio: item.axial / compressionCap });
    if (item.axial < 0 && upliftCap > 0) items.push({ pile: item, direction: "tension", ratio: -item.axial / upliftCap });
    if (item.lateral > 0 && lateralCap > 0) items.push({ pile: item, direction: "horizontal", ratio: item.lateral / lateralCap });
    return items;
  });
  const governing = comparisons.reduce((current, item) => !current || item.ratio > current.ratio ? item : current, null);
  const missingCapacity = missingDirections.length > 0;
  const utilisation = governing?.ratio || 0;
  const comparisonNames = {
    project: "Project directional comparison",
    "project-source-missing": "Project comparison unavailable",
    "project-basis-mismatch": "Project comparison unavailable",
    none: "Action distribution only"
  };
  setOptionalText("screwDemandComparisonLabel", comparisonNames[comparisonBasis] || comparisonNames.none);
  const ratioSymbol = "&eta;<sub>proj</sub>";
  $("screwDemandRatio").innerHTML = !hasDemand || !comparisonEnabled ? "Not assessed" : missingCapacity ? `${ratioSymbol} = incomplete` : `${ratioSymbol} = ${utilisation.toFixed(2)}`;
  if (!hasDemand) {
    $("screwDemandStatus").textContent = "No demand entered";
    setStatusClass($("screwDemandStatus"), "");
  } else if (comparisonBasis === "project-source-missing") {
    $("screwDemandStatus").textContent = "Project design-value source required";
    setStatusClass($("screwDemandStatus"), "check");
  } else if (comparisonBasis === "project-basis-mismatch") {
    $("screwDemandStatus").textContent = "Action and project value bases do not match";
    setStatusClass($("screwDemandStatus"), "check");
  } else if (!comparisonEnabled) {
    $("screwDemandStatus").textContent = "Pile actions only";
    setStatusClass($("screwDemandStatus"), "");
  } else if (missingCapacity) {
    $("screwDemandStatus").textContent = `Project design value required for ${missingDirections.join(" / ")}`;
    setStatusClass($("screwDemandStatus"), "check");
  } else if (utilisation <= 1) {
    $("screwDemandStatus").textContent = `Does not exceed entered project value · Pile ${governing.pile.id} / ${governing.direction}`;
    setStatusClass($("screwDemandStatus"), "check");
  } else {
    $("screwDemandStatus").textContent = `Exceeds entered project value · Pile ${governing.pile.id} / ${governing.direction}`;
    setStatusClass($("screwDemandStatus"), "fail");
  }

  const denominatorSymbols = { compression: "R<sub>c,proj</sub>", tension: "R<sub>t,proj</sub>", horizontal: "R<sub>h,proj</sub>" };
  const capacityComparisons = [
    maxCompression > 0 ? `N<sub>c,max</sub><sup>*</sup> / ${denominatorSymbols.compression} = ${fixed(maxCompression)} / ${compressionCap > 0 ? fixed(compressionCap) : "not stated"}` : "",
    maxUplift > 0 ? `N<sub>t,max</sub><sup>*</sup> / ${denominatorSymbols.tension} = ${fixed(maxUplift)} / ${upliftCap > 0 ? fixed(upliftCap) : "not stated"}` : "",
    maxLateral > 0 ? `V<sub>h,max</sub><sup>*</sup> / ${denominatorSymbols.horizontal} = ${fixed(maxLateral)} / ${lateralCap > 0 ? fixed(lateralCap) : "not stated"}` : ""
  ].filter(Boolean).join("; ") || "no non-zero design action effect";

  let comparisonFormula;
  if (comparisonBasis === "project") {
    comparisonFormula = `<div><b>Project directional comparison</b><code>&eta;<sub>proj</sub> is the maximum applicable non-zero action-to-project-value term. Current terms: ${capacityComparisons}. Entered source: ${safeText(comparison.source)}. Action and value basis: ${actionBasisLabel}. Combined axial-horizontal interaction is not assessed.</code></div>`;
  } else if (comparisonBasis === "project-source-missing") {
    comparisonFormula = `<div><b>Project comparison unavailable</b><code>Enter a source reference for the project design values. No ratio is reported.</code></div>`;
  } else if (comparisonBasis === "project-basis-mismatch") {
    comparisonFormula = `<div><b>Project comparison unavailable</b><code>The project value basis does not match ${actionBasisLabel}. No ratio is reported.</code></div>`;
  } else {
    comparisonFormula = `<div><b>Action distribution only</b><code>No project design values are entered. Manufacturer values are not compared automatically. The page reports pile action effects only.</code></div>`;
  }

  $("screwDemandFormulaSteps").innerHTML = `
    <div><b>Action-distribution model</b><code>Symmetric rectangular layout; rigid pad; vertical identical piles; equal axial stiffness in compression and tension; equal horizontal stiffness; no pad-soil resistance. Coordinates are measured from the group centroid. n = ${n}; &Sigma;x<sub>j</sub>y<sub>j</sub> = ${fixed2(sumXY)} m<sup>2</sup>; &Sigma;x<sub>j</sub><sup>2</sup> = ${fixed2(sumX2)} m<sup>2</sup>; &Sigma;y<sub>j</sub><sup>2</sup> = ${fixed2(sumY2)} m<sup>2</sup>; &Sigma;r<sub>j</sub><sup>2</sup> = ${fixed2(sumR2)} m<sup>2</sup>. Action set: ${actionBasisLabel}.</code></div>
    <div><b>Axial pile action</b><code>N<sub>i</sub><sup>*</sup> = N<sup>*</sup>/n + M<sub>x</sub><sup>*</sup>y<sub>i</sub>/&Sigma;y<sub>j</sub><sup>2</sup> + M<sub>y</sub><sup>*</sup>x<sub>i</sub>/&Sigma;x<sub>j</sub><sup>2</sup>. Positive N<sub>i</sub><sup>*</sup> denotes compression. N<sub>c,max</sub><sup>*</sup> = max<sub>i</sub>[max(N<sub>i</sub><sup>*</sup>, 0)]; N<sub>t,max</sub><sup>*</sup> = max<sub>i</sub>[max(-N<sub>i</sub><sup>*</sup>, 0)].</code></div>
    <div><b>Horizontal pile action</b><code>V<sub>x,i</sub><sup>*</sup> = V<sub>x</sub><sup>*</sup>/n - T<sub>z</sub><sup>*</sup>y<sub>i</sub>/&Sigma;r<sub>j</sub><sup>2</sup>; V<sub>y,i</sub><sup>*</sup> = V<sub>y</sub><sup>*</sup>/n + T<sub>z</sub><sup>*</sup>x<sub>i</sub>/&Sigma;r<sub>j</sub><sup>2</sup>; V<sub>i</sub><sup>*</sup> = &radic;[(V<sub>x,i</sub><sup>*</sup>)<sup>2</sup> + (V<sub>y,i</sub><sup>*</sup>)<sup>2</sup>]. This equal-stiffness model excludes pile-head fixity, soil-pile interaction and horizontal displacement.</code></div>
    ${comparisonFormula}
  `;
}

function calculateScrew() {
  const pile = selectedScrewPile();
  const manufacturerKey = $("screwManufacturer").value;
  const catalogue = selectedScrewCatalogue();
  const confidence = screwSourceConfidence(manufacturerKey, pile);
  const dataStatus = screwDataStatus(manufacturerKey, pile);
  const valueBasis = screwValueBasisText(pile);
  const capacityLabels = screwCapacityLabels(pile);
  const enteredValues = {
    compression: value("screwCompressionCap"),
    uplift: value("screwUpliftCap"),
    lateral: value("screwLateralCap")
  };
  const displayValues = screwDisplayCapacities(pile, enteredValues);
  const comparisonValues = screwComparisonCapacities(pile, displayValues);
  $("screwDesignation").textContent = pile.label;
  $("screwAssumption").textContent = `${catalogue.label} · ${screwSystemType(pile)}.`;
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
  setOptionalText("screwCompressionLabel", capacityLabels.compression);
  setOptionalText("screwUpliftLabel", capacityLabels.uplift);
  setOptionalText("screwLateralLabel", capacityLabels.lateral);
  setScrewResistanceOutput(
    "screwCompressionResult",
    "screwCompressionUnit",
    "screwCompressionBasis",
    displayValues.compression,
    valueBasis,
    "No direction-specific value published."
  );
  setScrewResistanceOutput(
    "screwUpliftResult",
    "screwUpliftUnit",
    "screwUpliftBasis",
    displayValues.uplift,
    valueBasis,
    "No direction-specific value published."
  );
  setScrewResistanceOutput(
    "screwLateralResult",
    "screwLateralUnit",
    "screwLateralBasis",
    displayValues.lateral,
    valueBasis,
    "No direction-specific value published."
  );
  $("screwAxialBasis").textContent = pile.axialClass > 0 ? "System class shown." : "No class entered.";
  updateScrewSketch(pile, enteredValues.compression, enteredValues.uplift, enteredValues.lateral);
  $("screwCapacityStatus").textContent = dataStatus.label;
  $("screwCapacityStatus").className = dataStatus.className;
  $("screwCapacityStatus").title = dataStatus.detail;
  updateScrewCatalogueMatrix();
  updateScrewDrivers(pile, enteredValues.compression, enteredValues.uplift, enteredValues.lateral);
  updateScrewRisk(pile, enteredValues.compression, enteredValues.uplift, enteredValues.lateral);
  calculateScrewDemand(comparisonValues);
}

function setTool(tool, updateHash = true) {
  const resolvedTool = toolAliases[tool] || tool;
  const validTool = toolNames.includes(resolvedTool);
  const selectedTool = validTool ? resolvedTool : "bolt";
  let activeButton = null;
  document.querySelectorAll(".tool-tab").forEach(button => {
    const active = button.dataset.tool === selectedTool;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
    if (active) activeButton = button;
  });
  toolNames.forEach(name => {
    const panel = $(`${name}Panel`);
    const active = name === selectedTool;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  const publicHash = publicToolHashes[selectedTool] || selectedTool;
  if ((updateHash || !validTool || tool !== publicHash) && location.hash !== `#${publicHash}`) {
    history.replaceState(null, "", `#${publicHash}`);
  }
  window.requestAnimationFrame(() => {
    const tabs = activeButton?.parentElement;
    if (!tabs || tabs.scrollWidth <= tabs.clientWidth) return;
    const left = activeButton.offsetLeft - (tabs.clientWidth - activeButton.offsetWidth) / 2;
    tabs.scrollTo({ left: Math.max(0, left), behavior: "auto" });
  });
  if (selectedTool === "concrete") calculateConcrete();
  if (selectedTool === "properties") calculateSectionProperties();
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
  boltInputIds.forEach(id => $(id).addEventListener("input", calculateBolt));
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
  document.querySelectorAll(".section-properties-mode").forEach(button => button.addEventListener("click", () => setSectionPropertyMode(button.dataset.sectionPropertiesMode)));
  $("sectionCatalogueFamily").addEventListener("change", populateSectionCatalogueDesignations);
  $("sectionCatalogueDesignation").addEventListener("change", calculateSectionProperties);
  $("sectionShape").addEventListener("change", calculateSectionProperties);
  sectionPropertyInputIds.forEach(id => $(id).addEventListener("input", calculateSectionProperties));
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
  populateSectionCatalogueFamilies();
  setBeamType(beamSectionType);
  setMemberType(memberType);
  calculateBolt();
  calculateUBolt();
  calculateWeld();
  calculateConcrete();
  setSectionPropertyMode(sectionPropertiesMode);
  calculateScrew();
  setBoltMode(initialBoltMode());
  setTool(location.hash.slice(1) || "bolt", false);
}

initialise();
