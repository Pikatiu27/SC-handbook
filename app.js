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
    fitKey: "Configured round / pipe diameter",
    fit: "Discrete catalogue diameters; verify the configured item",
    finish: "Outdoor HDG",
    material: "Q235 or better steel - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The Australian product page publishes geometry, finish and application data, but no rated structural capacity.",
    sourceStatus: "Source_Online_Checked",
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
    fitKey: "Configured round / pipe diameter",
    fit: "Discrete catalogue diameters; verify the configured item",
    finish: "Outdoor HDG",
    material: "Q235 or better steel - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The Australian product page publishes geometry, finish and application data, but no rated structural capacity.",
    sourceStatus: "Source_Online_Checked",
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
    fitKey: "Configured round / pipe diameter",
    fit: "350 mm nominal pipe option; verify the configured diameter",
    finish: "Outdoor HDG",
    material: "Q235 or better steel - outdoor HDG - C3/C4-low",
    publishedCapacity: "Not published",
    capacityDirection: "Not published",
    capacityBasis: "The Australian configurator lists an M20 option; confirm the selected item geometry before specification.",
    sourceStatus: "Source_Online_Checked",
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
    { d: 60, c: 10, l: 110, t: 50, code: "E14-060H", thread: "M10", workingLoad: "752 kg" },
    { d: 76, c: 12, l: 127, t: 50, code: "E14-076H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 89, c: 12, l: 140, t: 50, code: "E14-089H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 102, c: 12, l: 152, t: 50, code: "E14-102H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 114, c: 12, l: 165, t: 50, code: "E14-114H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 140, c: 12, l: 190, t: 50, code: "E14-140H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 165, c: 12, l: 215, t: 50, code: "E14-165H", thread: "M12", workingLoad: "1,206 kg" },
    { d: 219, c: 16, l: 295, t: 75, code: "E14-219H", thread: "M16", workingLoad: "2,069 kg" },
    { d: 273, c: 20, l: 370, t: 100, code: "E14-273H", thread: "M20", workingLoad: "3,252 kg" }
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
    drawing: { shape: "round", convention: "ezystrut", fitDiameter: row.d, overallLength: row.l, threadLength: row.t, rodDiameter: row.c },
    publishedCapacity: `${row.workingLoad} working load`,
    capacityDirection: "Load direction not stated",
    capacityBasis: "Manufacturer working load with a stated 3:1 safety factor. Verify load direction and complete assembly applicability before project use.",
    sourceStatus: "Source_Checked",
    sourceName: "EzyStrut Heavy Duty U Bolt datasheet",
    sourceUrl: "https://www.ezystrut.com.au/assets/Datasheets/Heavy-Duty-U-Bolt-DataSheet.pdf"
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
    drawing: { shape: "round", convention: "hobson", insideWidth: row.d, overallLength: row.l, threadLength: row.t },
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
    drawing: { shape: "round", convention: "catalogue", insideWidth: row.d, overallLength: row.l, threadLength: row.t },
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
    drawing: { shape: "square", convention: "catalogue", insideWidth: row.w, overallLength: row.l, threadLength: row.t, rodDiameter: 12 },
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

const blindBoltProducts = [
  ...[
    { size: "M8", hole: 14, centres: 35, edge: "B + C >= 17.5 mm", outer: "6.0 mm for tabulated shear", torque: 23, loads: [16.8, 14.3], grips: [[3, 22, "HB08-1", 45], [22, 41, "HB08-2", 65], [41, 60, "HB08-3", 85]] },
    { size: "M10", hole: 18, centres: 40, edge: "B + C >= 22.5 mm", outer: "8.0 mm for tabulated shear", torque: 45, loads: [27.4, 24.4], grips: [[3, 22, "HB10-1", 49], [22, 41, "HB10-2", 64], [41, 60, "HB10-3", 84]] },
    { size: "M12", hole: 20, centres: 50, edge: "B + C >= 25 mm", outer: "8.0 mm for tabulated shear", torque: 80, loads: [38.0, 33.3], grips: [[3, 25, "HB12-1", 53], [25, 47, "HB12-2", 73], [47, 69, "HB12-3", 93]] },
    { size: "M16", hole: 26, centres: 55, edge: "B + C >= 32.5 mm", outer: "10.0 mm for tabulated shear", torque: 190, loads: [61.8, 51.6], grips: [[12, 29, "HB16-1", 67], [29, 50, "HB16-2", 92], [50, 71, "HB16-3", 112]] },
    { size: "M20", hole: 33, centres: 70, edge: "B + C >= 33 mm", outer: "12.0 mm for tabulated shear", torque: 300, loads: [89.0, 81.8], grips: [[12, 34, "HB20-1", 80], [34, 60, "HB20-2", 110], [60, 86, "HB20-3", 140]] }
  ].flatMap(row => row.grips.map(([gripMin, gripMax, code, lengthB]) => ({
    id: `lindapter-${code.toLowerCase()}`,
    manufacturer: "Lindapter",
    supplier: "Not specified",
    family: "Hollo-Bolt",
    code,
    size: row.size,
    variant: `Size ${code.slice(-1)}`,
    catalogueLength: `B max ${lengthB} mm`,
    mechanism: ["M16", "M20"].includes(row.size) ? "HCF" : "",
    drawing: { kind: "expansion", lengthB },
    gripMin,
    gripMax,
    head: "Hexagonal",
    finish: "Outdoor HDG",
    hole: row.hole,
    centres: `${row.centres} mm`,
    edge: row.edge,
    outerPly: row.outer,
    torque: `${row.torque} Nm`,
    tools: "Spanner and torque wrench",
    tension: row.loads[0],
    shear: row.loads[1],
    valueLabel: "LRFD design strength (static / wind)",
    valueBasis: "ICC-ES ESR-3330 available strength; the LRFD resistance factor is already included. Do not apply a further factor. Connected steel is outside the report scope.",
    sourceStatus: "Source_Online_Checked",
    sourceName: "Lindapter Hollo-Bolt ICC-ES ESR-3330, reissued March 2026",
    sourceUrl: "https://www.lindapter.com/assets/media/lindapter-esr-3330-and-sid-combined.pdf"
  }))),
  ...[
    { size: "M8", hole: 14, centres: 35, edge: "C > 17.5 mm", outer: "1 mm fixture", torque: 25, loads: [6, 7], grips: [[3, 22, "KBB88GHM080050", 50], [22, 41, "KBB88GHM080070", 70], [41, 60, "KBB88GHM080090", 90]] },
    { size: "M10", hole: 18, centres: 40, edge: "C > 22.5 mm", outer: "1 mm fixture", torque: 45, loads: [10, 12], grips: [[3, 22, "KBB88GHM100055", 55], [22, 41, "KBB88GHM100070", 70], [41, 60, "KBB88GHM100090", 90]] },
    { size: "M12", hole: 20, centres: 50, edge: "C > 25 mm", outer: "1 mm fixture", torque: 80, loads: [13, 15], grips: [[3, 25, "KBB88GHM120060", 60], [25, 47, "KBB88GHM120080", 80], [47, 69, "KBB88GHM120110", 110]] },
    { size: "M16", hole: 26, centres: 55, edge: "C > 32.5 mm", outer: "8 mm fixture", torque: 190, loads: [23, 28], grips: [[12, 29, "KBB88GHM160080", 80], [29, 50, "KBB88GHM160100", 100], [50, 71, "KBB88GHM160120", 120]] },
    { size: "M20", hole: 33, centres: 70, edge: "C > 33 mm", outer: "8 mm fixture", torque: 300, loads: [34, 43], grips: [[12, 34, "KBB88GHM200090", 90], [34, 60, "KBB88GHM200120", 120], [60, 86, "KBB88GHM200140", 140]] }
  ].flatMap(row => row.grips.map(([gripMin, gripMax, code, length]) => ({
    id: `hobson-${code.toLowerCase()}`,
    manufacturer: "Hobson Engineering",
    supplier: "Hobson Engineering",
    family: "HBS-Bolt",
    code,
    size: row.size,
    gripMin,
    gripMax,
    head: "Hexagonal",
    drawing: { kind: "hbs-expansion", length },
    finish: "Outdoor HDG",
    hole: row.hole,
    centres: `${row.centres} mm`,
    edge: row.edge,
    outerPly: row.outer,
    torque: `${row.torque} Nm`,
    tools: "Spanner and torque wrench",
    tension: row.loads[0],
    shear: row.loads[1],
    valueLabel: "Manufacturer working load",
    valueBasis: "Manufacturer working load. Characteristic resistance is a separate published value and is not used here.",
    sourceStatus: "Source_Online_Checked",
    sourceName: "Hobson HBS Bolt Product Data, 200806DS",
    sourceUrl: "https://content.hobson.com.au/category/high-tensile/hsd-hbs-bolt-data-sheet.pdf"
  }))),
  ...[
    { size: "M8", hole: 14, centres: 35, edge: "B + wall thickness", outer: "Not stated", torque: 23, loads: [23.1, 29.1], grips: [[5, 26, "UNIBH-M08050G", 50], [26, 46, "UNIBH-M08070G", 70], [46, 66, "UNIBH-M08090G", 90]] },
    { size: "M10", hole: 18, centres: 40, edge: "B + wall thickness", outer: "Not stated", torque: 45, loads: [35.8, 47.4], grips: [[5, 22, "UNIBH-M10050G", 50], [22, 42, "UNIBH-M10070G", 70], [42, 62, "UNIBH-M10090G", 90]] },
    { size: "M12", hole: 20, centres: 50, edge: "B + wall thickness", outer: "Not stated", torque: 80, loads: [41.1, 64.2], grips: [[5, 25, "UNIBH-M12055G", 55], [23, 50, "UNIBH-M12080G", 80], [48, 70, "UNIBH-M12100G", 100]] },
    { size: "M16", hole: 26, centres: 55, edge: "B + wall thickness", outer: "Not stated", torque: 190, loads: [81.2, 116.5], grips: [[8, 35, "UNIBH-M16075G", 75], [35, 60, "UNIBH-M16100G", 100], [60, 80, "UNIBH-M16120G", 120]] },
    { size: "M20", hole: 33, centres: 70, edge: "B + wall thickness", outer: "Not stated", torque: 300, loads: [106.2, 183.3], grips: [[12, 43, "UNIBH-M20100G", 100], [43, 63, "UNIBH-M20120G", 120], [63, 93, "UNIBH-M20150G", 150]] }
  ].flatMap(row => row.grips.map(([gripMin, gripMax, code, length]) => ({
    id: `iccons-${code.toLowerCase()}`,
    manufacturer: "ICCONS",
    supplier: "ICCONS",
    family: "UNI-BOLT",
    code,
    size: row.size,
    gripMin,
    gripMax,
    head: "Hexagonal",
    drawing: { kind: "uni-expansion", length },
    finish: "Outdoor HDG",
    hole: row.hole,
    centres: `${row.centres} mm`,
    edge: row.edge,
    outerPly: row.outer,
    torque: `${row.torque} Nm`,
    tools: "Spanner and torque wrench",
    tension: row.loads[0],
    shear: row.loads[1],
    valueLabel: "Manufacturer design capacity",
    valueBasis: "AS 4100 design capacity; phi = 0.8 is already included. Verify TDS 1053.1 and ETA 25/0374 applicability.",
    sourceStatus: "Source_Online_Checked",
    sourceName: "ICCONS UNI-BOLT TDS 1053.1, 2025",
    sourceUrl: "https://www.iccons.com.au/storage/products/1057200020001/ICCONS_TDS_Uni-Bolt_1053.1.pdf"
  }))),
  ...[
    { size: "M8", hole: 14, centres: 35, torque: 25, loads: [23.6, 33.3], grips: [[5, 26, "BQ1G08", 50], [18, 46, "BQ2G08", 70], [30, 66, "BQ3G08", 90]] },
    { size: "M10", hole: 18, centres: 40, torque: 45, loads: [41.8, 58.5], grips: [[5, 23, "BQ1G10", 50], [18, 43, "BQ2G10", 70], [35, 63, "BQ3G10", 90]] },
    { size: "M12", hole: 20, centres: 50, torque: 80, loads: [53.7, 76.3], grips: [[5, 25, "BQ1G12", 55], [20, 50, "BQ2G12", 80], [40, 70, "BQ3G12", 100]] },
    { size: "M16", hole: 26, centres: 55, torque: 190, loads: [96.0, 139.3], grips: [[5, 35, "BQ1G16", 75], [30, 60, "BQ2G16", 100], [55, 80, "BQ3G16", 120]] },
    { size: "M20", hole: 33, centres: 70, torque: 300, loads: [168.0, 229.9], grips: [[8, 42, "BQ1G20", 100], [35, 72, "BQ2G20", 120], [65, 102, "BQ3G20", 150]] }
  ].flatMap(row => row.grips.map(([gripMin, gripMax, code, length]) => ({
    id: `keesafety-${code.toLowerCase()}`,
    manufacturer: "Kee Safety",
    supplier: "ICCONS",
    family: "BoxBolt",
    code,
    size: row.size,
    gripMin,
    gripMax,
    head: "Hexagonal",
    drawing: { kind: "box-expansion", length },
    finish: "Outdoor HDG",
    hole: row.hole,
    centres: `${row.centres} mm`,
    edge: "B + wall thickness",
    outerPly: "Not stated",
    torque: `${row.torque} Nm`,
    tools: "BoxSok installation tool and torque wrench",
    tension: row.loads[0],
    shear: row.loads[1],
    valueLabel: "ETA characteristic resistance",
    valueBasis: "ETA 20/1174 characteristic resistance, Ft,Rk / Fv,Rk; no design partial factor is applied. Connected material must be checked separately.",
    sourceStatus: "Source_Online_Checked",
    sourceName: "Kee Safety BoxBolt ETA 20/1174, December 2020",
    sourceUrl: "https://www.keesafety.com/media/w0tnpucl/boxbolt-eta-20-1174-v1-151220-1.pdf"
  }))),
  ...[
    { size: "M8", hole: 9, centres: 20, clearance: 19, depth: 25, torque: 15, loads: [9.8, 14.6], finish: "Zinc flake 1000 hr SSP", grips: [[9, 24, "BB0850ZF", 50]] },
    { size: "M10", hole: 11, centres: 20, clearance: 23, depth: 30, torque: 24, loads: [14.1, 23.2], finish: "Zinc flake 1000 hr SSP", grips: [[10, 29, "BB1060ZF", 60], [25, 64, "BB1095ZF", 95], [55, 100, "BB10130ZF", 130]] },
    { size: "M12", hole: 13, centres: 25, clearance: 26, depth: 35, torque: 30, loads: [22.4, 33.7], finish: "Zinc flake 1000 hr SSP", grips: [[12, 35, "BB1270ZF", 70]] },
    { size: "M12", hole: 13, centres: 25, clearance: 26, depth: 35, torque: 30, loads: [22.4, 33.7], finish: "Hot-dip galvanised", grips: [[12, 33, "BB1270HDG", 70], [30, 84, "BB12120HDG", 120], [80, 143, "BB12180HDG", 180]] },
    { size: "M14", hole: 15, centres: 32, clearance: 32, depth: 38, torque: 34, torqueConflict: [34, 40], loads: [34.8, 46.7], finish: "Hot-dip galvanised", grips: [[14, 35, "GBB1475HDG", 75], [28, 82, "GBB14125HDG", 125], [75, 142, "GBB14185HDG", 185]] },
    { size: "M16", hole: 17, centres: 35, clearance: 36, depth: 43, torque: 50, loads: [38.8, 62.7], finish: "Hot-dip galvanised", grips: [[13, 43, "GBB1690HDG", 90], [40, 75, "GBB16130HDG", 130], [55, 132, "GBB16180HDG", 180]] },
    { size: "M20", hole: 22, centres: 48, clearance: 44, depth: 56, torque: 65, loads: [71.4, 97.9], finish: "Hot-dip galvanised", grips: [[21, 52, "GBB20110HDG", 110], [21, 82, "GBB20140HDG", 140], [80, 120, "GBB20180HDG", 180], [130, 190, "GBB20250HDG", 250]] },
    { size: "M24", hole: 26, centres: 60, clearance: 53, depth: 64, torque: 75, loads: [116.7, 141.0], finish: "Hot-dip galvanised", grips: [[21, 62, "GBB24130HDG", 130], [21, 92, "GBB24160HDG", 160]] },
    { size: "M30", hole: 32, centres: 75, clearance: 65, depth: 72, torque: 85, loads: [174.5, 224.0], finish: "Hot-dip galvanised", grips: [[27, 56, "GBB30140HDG", 140]] }
  ].flatMap(row => row.grips.map(([gripMin, gripMax, code, length]) => ({
    id: `blindbolt-${code.toLowerCase()}`,
    manufacturer: "Blind Bolt Company",
    supplier: "Not specified",
    family: "Blind Bolt",
    code,
    size: row.size,
    gripMin: code === "GBB1690HDG" ? 16 : gripMin,
    gripMax,
    gripSourceConflict: code === "GBB1690HDG"
      ? "March 2026 technical-data PDF states 13 mm minimum; the current manufacturer product page states 16 mm. The lookup uses 16 mm for conservative filtering pending manufacturer confirmation."
      : null,
    head: "Drive-nut",
    drawing: { kind: "drive-nut", length, anchorClearance: row.clearance, depthClearance: row.depth },
    finish: row.finish,
    hole: row.hole,
    centres: `${row.centres} mm`,
    edge: "Confirm from connected-steel design",
    outerPly: "Not stated",
    torque: row.torqueConflict
      ? `Source conflict: ${row.torqueConflict[0]} Nm in the March 2026 PDF; ${row.torqueConflict[1]} Nm on the current product page. Confirm with the manufacturer.`
      : `${row.torque} Nm`,
    torqueSourceConflict: row.torqueConflict || null,
    tools: `${row.clearance} mm anchor clearance; ${row.depth} mm insertion depth`,
    tension: row.loads[0],
    shear: row.loads[1],
    tensionLabel: "BS EN 1993-1-8 design resistance - tension",
    shearLabel: "BS EN 1993-1-8 design resistance - shear over thread",
    valueLabel: "BS EN 1993-1-8 design resistance",
    valueBasis: "Eurocode design resistance; gamma M2 = 1.25 is already applied. Shear is for the shear plane crossing the thread.",
    sourceStatus: "Source_Online_Checked",
    sourceName: "Blind Bolt Company Metric Technical Data, March 2026",
    sourceUrl: "https://www.blindbolt.co.uk/wp-content/uploads/2023/01/Blind-Bolt-Tech-Data-Metric.pdf"
  }))),
  ...[
    [15.9, 22.2, "2NG2060", 60], [15.9, 34.9, "2NG2032", 75], [23.8, 36.5, "2NG2036", 95],
    [36.5, 47.6, "2NG2048", 95], [47.6, 54.0, "2NG2057", 95], [54.0, 68.3, "2NG2068", 135],
    [68.3, 95.3, "2NG2096", 135], [95.3, 131.8, "2NG2127", 175], [127.0, 211.1, "2NG2212", 250]
  ].map(([gripMin, gripMax, code, length]) => ({
    id: `allfasteners-${code.toLowerCase()}`,
    manufacturer: "Allfasteners",
    supplier: "Allfasteners",
    family: "NexGen2",
    code,
    size: "M20",
    gripMin,
    gripMax,
    head: "Tension-control",
    drawing: { kind: "tension-control", length },
    finish: "Magni 554 duplex",
    hole: 30,
    centres: "Per ESR-3975 and connection design",
    edge: "Per ESR-3975 and connected-steel design",
    outerPly: "Connected steel governs separately",
    torque: "Tension-control spline",
    tools: "Manufacturer installation equipment",
    tension: 189.5,
    shear: 224.6,
    tensionLabel: "TIA-222-G design strength - tension",
    shearLabel: "TIA-222-G design strength - shear, threads included",
    valueLabel: "TIA-222-G design strength",
    valueBasis: "M20 TIA-222-G design strength; resistance factors are already included. ICC-ES / AISC basis, not an AS 4100 design capacity.",
    sourceStatus: "Source_Online_Checked",
    sourceName: "Allfasteners NexGen2 Blind Bolt TDS, July 2019",
    sourceUrl: "https://www.allfasteners.com.au/pub/media/ResourceGallery/n/e/nexgen2_tds_allfasteners_.pdf"
  }))
];

const productSourceCheckedDates = {
  "Hilti": "11 Aug 2026",
  "EzyStrut": "11 Aug 2026",
  "Hobson Engineering": "11 Aug 2026",
  "Lindapter": "11 Aug 2026",
  "ICCONS": "11 Aug 2026",
  "Kee Safety": "11 Aug 2026",
  "Blind Bolt Company": "11 Aug 2026",
  "Allfasteners": "11 Aug 2026"
};

function productSourceCheckedDate(product) {
  if (!product || !["Source_Checked", "Source_Online_Checked"].includes(product.sourceStatus)) return null;
  return productSourceCheckedDates[product.manufacturer] || null;
}

function setProductFigureBasis(prefix, product) {
  const source = $(`${prefix}FigureSource`);
  const checked = $(`${prefix}FigureChecked`);
  const authority = $(`${prefix}FigureAuthority`);
  const status = $(`${prefix}FigureStatus`);
  const summary = $(`${prefix}FigureBasisSummary`);
  const diagram = $(`${prefix}ProductDiagram`);
  if (!source || !checked || !authority || !status || !summary) return;

  const sourceCheckedDate = productSourceCheckedDate(product);
  const sourceVerified = ["Source_Checked", "Source_Online_Checked"].includes(product?.sourceStatus);
  const hasVerifiedDrawing = sourceVerified && Boolean(product?.drawing);
  source.textContent = product?.sourceName || "Not stated";
  checked.textContent = sourceCheckedDate || "Not verified";
  authority.textContent = hasVerifiedDrawing ? "Manufacturer catalogue dimensions" : "No verified figure geometry";
  status.textContent = hasVerifiedDrawing ? "Product reference · Not for fabrication" : "Figure withheld";
  summary.textContent = sourceVerified ? "Source checked · product reference · NTS" : "Source not verified";
  if (diagram) {
    diagram.dataset.viewId = `${prefix.toUpperCase()}-PRODUCT-REFERENCE-01`;
    diagram.dataset.viewPurpose = "AS_SUPPLIED_PRODUCT_IDENTIFICATION";
    diagram.dataset.projection = "ORTHOGRAPHIC_SOURCE_VIEW";
    diagram.dataset.scale = "NTS";
    diagram.dataset.unitPolicy = "MILLIMETRES_UNLESS_NOTED";
    diagram.dataset.productionMode = "WEB_NATIVE";
    diagram.dataset.sourceReference = product?.sourceName || "NOT_STATED";
    diagram.dataset.sourceRevision = product?.sourceName || "NOT_STATED";
    diagram.dataset.sourceAccessDate = sourceRecord?.checked || "NOT_VERIFIED";
    diagram.dataset.geometryAuthority = hasVerifiedDrawing ? "MANUFACTURER_CATALOGUE" : "NONE";
    diagram.dataset.derivativeRevision = "SC-HANDBOOK-BOLT-FIGURES-R6";
    diagram.dataset.drawingStatus = "FOR_REVIEW";
  }
}

const weldSizes = [3, 4, 5, 6, 8, 10, 12, 16];
const parentMetalGrades = {
  "Grade 250 plate": { fup: 410, standard: "AS/NZS 3678" },
  "Grade 300 flat bar": { fup: 440, standard: "AS/NZS 3679.1" },
  "Grade 350 plate": { fup: 450, standard: "AS/NZS 3678" }
};
const weldTypeData = {
  fillet: {
    label: "Fillet",
    note: "AS 4100 weld-throat resistance calculation",
    throatNote: "equal-leg fillet: t_t = 0.707s",
    scope: "fillet-weld throat resistance"
  },
  cpbw: {
    label: "CPBW",
    note: "resistance governed by the weaker joined part",
    throatNote: "no automatic weld-metal throat calculation",
    scope: "complete-penetration butt-weld reference only"
  },
  ipbw: {
    label: "IPBW",
    note: "project-specified design throat required",
    throatNote: "incomplete penetration: use specified a_w",
    scope: "incomplete-penetration butt-weld throat resistance"
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
  "concreteDirection", "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc",
  "concreteReinforcementLayout",
  "concreteShearReo", "concreteShearBar", "concreteNsv", "concreteSv", "concreteFsyf",
  "layer1Active", "layer1Auto", "layer1Y", "layer1Bar", "layer1Spacing", "layer1Fsy", "layer1Es",
  "layer2Active", "layer2Auto", "layer2Y", "layer2Bar", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Active", "layer3Auto", "layer3Y", "layer3Bar", "layer3Spacing", "layer3Fsy", "layer3Es",
  "layer4Active", "layer4Auto", "layer4Y", "layer4Bar", "layer4Spacing", "layer4Fsy", "layer4Es"
];
const concreteNBarDiameters = [10, 12, 16, 20, 24, 28, 32, 36, 40];
const concreteLegacyYBarDiameters = [12, 16, 20, 24, 28, 32, 36];
const concreteBarAreas = {
  10: 78.5,
  12: 113,
  16: 201,
  20: 314,
  24: 452,
  28: 616,
  32: 804,
  36: 1020,
  40: 1260
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
const concreteNoBarProduct = Object.freeze({ designation: "None", diameter: 0, area: 0, fsy: 500, legacy: false });

const beamShearDimensions = {
  "610UB125": { d: 611.6, bf: 229.0, tf: 19.6, d1: 572.4, tw: 11.9 },
  "610UB113": { d: 607.0, bf: 228.0, tf: 17.3, d1: 572.4, tw: 11.2 },
  "610UB101": { d: 602.6, bf: 227.6, tf: 14.8, d1: 572.4, tw: 10.6 },
  "530UB92.4": { d: 533.0, bf: 209.0, tf: 15.6, d1: 501.8, tw: 10.2 },
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
  return { designation, mass, area, Sx, Zx, d, bf, d1, tw, tf, Aw: d * tw, grades, ...(hotRolledSectionProperties[designation] || {}) };
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

const eaSections = eaCatalogueSections.map(section => ({
  ...section,
  grades: Object.fromEntries(Object.entries(BeamHotRolledData.equalAngle[section.designation] || {}).map(([name, grade]) => [
    name,
    { ...grade, fu: SteelMaterials.hotRolledStrength(name, section.actualT)?.fu || 0 }
  ]))
}));

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
  grades: Object.fromEntries(Object.entries(
    BeamHotRolledData.pfc.find(section => section.designation === `${depth}PFC`)?.grades || {
      "300PLUS": { fy, kf: 1 }
    }
  ).map(([name, grade]) => [
    name,
    { ...grade, fu: SteelMaterials.hotRolledStrength(name, Math.max(tw, tf))?.fu || 0 }
  ]))
}));

function rodGrades(diameter) {
  const grade300 = SteelMaterials.roundBarStrength("300PLUS", diameter);
  const grade350 = SteelMaterials.roundBarStrength("Grade 350", diameter);
  return {
    "300PLUS": { ...grade300, kf: 1 },
    "Grade 350": { ...grade350, kf: 1 }
  };
}

const rodSections = [
  [10, 0.616], [12, 0.887], [13, 1.04], [14, 1.21], [15, 1.39], [16, 1.58],
  [17, 1.78], [18, 1.99], [19, 2.23], [20, 2.46], [22, 2.98], [24, 3.55],
  [27, 4.49], [30, 5.55], [33, 6.71], [36, 7.99], [39, 9.38], [42, 10.9],
  [45, 12.5], [48, 14.2], [50, 15.4], [56, 19.3], [60, 22.2], [65, 26.0],
  [75, 34.7], [90, 49.9]
].map(([diameter, mass]) => ({
  designation: `Ø${diameter} Round Bar`,
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

function sectionHollowCatalogueSections(family) {
  const grouped = new Map();
  BeamSectionData.filter(row => row.family === family).forEach(row => {
    if (!grouped.has(row.designation)) grouped.set(row.designation, []);
    grouped.get(row.designation).push(row);
  });
  return Array.from(grouped, ([designation, rows]) => {
    const first = rows[0];
    const circular = family === "chs";
    const square = family === "shs";
    const axes = circular
      ? { axis: { I: first.I * 1e6, Z: first.Z, S: first.S } }
      : square
        ? { xy: { I: first.I * 1e6, Z: first.Z, S: first.S } }
        : { x: { I: first.Ix * 1e6, Z: first.Zx, S: first.Sx }, y: { I: first.Iy * 1e6, Z: first.Zy, S: first.Sy } };
    const grades = Object.fromEntries(rows.map(row => {
      const directions = circular
        ? { axis: { Ze: row.Ze, compactness: row.compactness } }
        : square
          ? { xy: { Ze: row.Ze, compactness: row.compactness } }
          : { x: { Ze: row.Zex, compactness: row.compactnessX }, y: { Ze: row.Zey, compactness: row.compactnessY } };
      return [row.grade, {
        fy: row.fy,
        fyw: row.fy,
        kf: row.kf,
        directions,
        sourceRef: `Austube 2013 Table ${row.sourceTable} · PDF p. ${row.pdfPage}`
      }];
    }));
    return {
      designation,
      family,
      D: first.D,
      d: first.d,
      b: first.b,
      t: first.t,
      mass: first.mass,
      area: first.area,
      r: first.r,
      rx: first.rx || first.r,
      ry: first.ry || first.r,
      Aw: circular ? first.area : 0,
      I: circular || square ? first.I * 1e6 : first.Ix * 1e6,
      Zx: circular || square ? first.Z : first.Zx,
      Sx: circular || square ? first.S : first.Sx,
      drawing: circular ? { shape: "chs", D: first.D, t: first.t } : { shape: "rhs", b: first.b, h: first.d || first.b, t: first.t },
      axes,
      grades,
      capacityStatus: "checked",
      shearMethod: circular ? "chs-section" : "rhs-web",
      interactionMethod: circular ? null : "flat-web",
      sourceRef: grades[Object.keys(grades)[0]].sourceRef,
      sourceBasis: "Published design-capacity table"
    };
  });
}

function sortSectionCatalogueByPrimarySize(sections) {
  const primary = section => Number(section.D ?? section.d ?? section.b ?? section.diameter ?? 0);
  const secondary = section => Number(section.b ?? section.D ?? section.d ?? section.diameter ?? 0);
  return sections.slice().sort((left, right) =>
    primary(right) - primary(left)
    || secondary(right) - secondary(left)
    || Number(right.t || 0) - Number(left.t || 0)
  );
}

function sectionCatalogueChsSections() {
  const byGeometry = new Map();
  sectionHollowCatalogueSections("chs").forEach(section => {
    byGeometry.set(`${Number(section.D)}|${Number(section.t)}`, section);
  });
  chsSections.forEach(section => {
    const key = `${Number(section.D)}|${Number(section.t)}`;
    if (!byGeometry.has(key)) byGeometry.set(key, section);
  });
  return sortSectionCatalogueByPrimarySize(Array.from(byGeometry.values()));
}

function sectionCataloguePfcSections() {
  return pfcSections.map(section => ({
    ...section,
    ...(BeamHotRolledData.pfc.find(item => item.designation === section.designation) || {})
  }));
}

const sectionProductDirectory = Object.freeze({
  ub: Object.freeze(ubSections),
  uc: Object.freeze(ucSections),
  pfc: Object.freeze(sectionCataloguePfcSections()),
  chs: Object.freeze(sectionCatalogueChsSections()),
  rhs: Object.freeze(sortSectionCatalogueByPrimarySize(sectionHollowCatalogueSections("rhs"))),
  shs: Object.freeze(sortSectionCatalogueByPrimarySize(sectionHollowCatalogueSections("shs"))),
  ea: Object.freeze(eaSections),
  rod: Object.freeze(rodSections)
});

const sectionCatalogueFamilies = SectionCatalogue.create(sectionProductDirectory, SectionGeometry);
let sectionPropertiesMode = "catalogue";
let sectionMaterialThicknessManual = false;

const customSections = [{
  designation: "Custom / Built-up",
  grades: { "User input": { fy: 350, fu: 450, kf: 1 } }
}];

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
        installControl: "Example guide correlation: 4,000 N·m for 80 kN in stiff/dense soils",
        source: "Performance Guide Rev Z, 01/10/2024, pp. 8 and 12-13; CodeMark CM30096 Rev 6",
        defaultSource: "series",
        capacityBasis: "Rev Z compression SWL up to 80 kN in stiff clay/dense sand; CM30096 Rev6 separately includes the 80 kN series, current catalogue row pending.",
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
        capacityBasis: "Rev Z compression SWL up to 100 kN in stiff clay/dense sand; CM30096 Rev6 separately includes the 100 kN series, current catalogue row pending.",
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
        capacityBasis: "Rev Z compression SWL up to 150 kN in stiff clay/dense sand; CM30096 Rev6 separately includes the 150 kN series, current catalogue row pending.",
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
        capacityBasis: "Rev Z compression SWL up to 200 kN in stiff clay/dense sand; CM30096 Rev6 separately includes the 200 kN series, current catalogue row pending.",
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
        installControl: "Record installation pressure and torque for every pier",
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
        installControl: "Record installation pressure and torque for every pier",
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
        installControl: "Record installation pressure and torque for every pier",
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
        installControl: "Record installation pressure and torque for every pier",
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
  solidity: {
    label: "Solidity",
    sourceUrl: "https://www.solidity.com.au/wp-content/uploads/2022/05/Solidity-Pile-Specification-Drawings-.pdf",
    sourceReview: "Public source reviewed · 12 Aug 2026",
    defaultSeries: "solidity-s76002",
    series: {
      "solidity-s76002": {
        label: "Solidity S76002",
        productClass: "Published design-table row",
        productCode: "S76002",
        supplyBasis: "Engineered manufacture; supplier review required",
        system: "Conventional steel helical pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 3.5,
        rating: 70,
        capacityType: "published-ultimate-table",
        comparisonBasis: "none",
        shaft: "76.1 x 6.0 CHS",
        diameter: "76.1 mm OD",
        wall: "6.0 mm",
        steel: "C350L0 shaft; 350 MPa helix plate",
        helixCount: "1 helix",
        helix: "300 mm dia x 10 mm plate",
        length: "Lead length not stated in SP01",
        extension: "EXT76001 plain extension",
        foundingCriterion: "Helix at least 3Hd into competent soil, unless end-bearing on rock",
        soilRequirement: "Select helix from the published soil-strength table; verify the project ground model",
        installControl: "Project torque criterion and installation record required",
        torqueLimit: "8,719 N·m maximum table torque",
        durability: "75-year moderate-corrosivity basis; HDG600 at the soil-air interface or for more severe exposure",
        source: "Standard Specifications, SP01, 22/01/2020, pp. 1-2",
        defaultSource: "manufacturer",
        capacityBasis: "Published maximum load 70 kN; load data are ultimate U.N.O. Published lateral limit is 3.5 kN at 1.5 m above competent soil and requires static load testing.",
        note: "Supplier review is mandatory. Check serviceability, soil bearing, buckling, plate bending, eccentricity and installation torque."
      },
      "solidity-s89015": {
        label: "Solidity S89015",
        productClass: "Published design-table row",
        productCode: "S89015",
        supplyBasis: "Engineered manufacture; supplier review required",
        system: "Conventional steel helical pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 4.9,
        rating: 190,
        capacityType: "published-ultimate-table",
        comparisonBasis: "none",
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "C350L0 shaft; 350 MPa helix plate",
        helixCount: "2 helices",
        helix: "350 mm dia x 10 mm plate each",
        pitchSpacing: "Spacing per SP04; both helices in equivalent competent soil",
        length: "Lead length not stated in SP04",
        extension: "EXT89001 plain extension",
        foundingCriterion: "Helices at least 3Hd into competent soil, unless end-bearing on rock",
        soilRequirement: "Select helix from the published soil-strength table; verify both bearing horizons",
        installControl: "Project torque criterion and installation record required",
        torqueLimit: "12,319 N·m maximum table torque",
        durability: "75-year moderate-corrosivity basis; HDG600 at the soil-air interface or for more severe exposure",
        source: "Standard Specifications, SP04, 22/01/2020, pp. 4-5",
        defaultSource: "manufacturer",
        capacityBasis: "Published maximum load 190 kN; load data are ultimate U.N.O. Published lateral limit is 4.9 kN at 1.5 m above competent soil and requires static load testing.",
        note: "The table value is not an SWL. Supplier review and complete project ULS/SLS checks are required."
      },
      "solidity-s114018": {
        label: "Solidity S114018",
        productClass: "Published design-table row",
        productCode: "S114018",
        supplyBasis: "Engineered manufacture; supplier review required",
        system: "Conventional steel helical pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 9.2,
        rating: 195,
        capacityType: "published-ultimate-table",
        comparisonBasis: "none",
        shaft: "114.3 x 6.0 CHS",
        diameter: "114.3 mm OD",
        wall: "6.0 mm",
        steel: "C350L0 shaft; 350 MPa helix plate",
        helixCount: "1 helix",
        helix: "500 mm dia x 16 mm plate",
        length: "Lead length not stated in SP05",
        extension: "EXT114001 plain extension",
        foundingCriterion: "Helix at least 3Hd into competent soil, unless end-bearing on rock",
        soilRequirement: "Select helix from the published soil-strength table; verify the project ground model",
        installControl: "Project torque criterion and installation record required",
        torqueLimit: "21,317 N·m maximum table torque",
        durability: "75-year moderate-corrosivity basis; HDG600 at the soil-air interface or for more severe exposure",
        source: "Standard Specifications, SP05, 22/01/2020, pp. 5-6",
        defaultSource: "manufacturer",
        capacityBasis: "Published maximum load 195 kN; load data are ultimate U.N.O. Published lateral limit is 9.2 kN at 1.5 m above competent soil and requires static load testing.",
        note: "The published drawing requires serviceability checks and submission of the selection to Solidity for review."
      },
      "solidity-s168028": {
        label: "Solidity S168028",
        productClass: "Published design-table row",
        productCode: "S168028",
        supplyBasis: "Engineered manufacture; supplier review required",
        system: "Heavy steel helical pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 18.2,
        rating: 500,
        capacityType: "published-ultimate-table",
        comparisonBasis: "none",
        shaft: "168.3 x 6.4 CHS",
        diameter: "168.3 mm OD",
        wall: "6.4 mm",
        steel: "C350L0 shaft; 350 MPa helix plate",
        helixCount: "1 helix",
        helix: "800 mm dia x 20 mm plate",
        length: "Lead length not stated in SP09",
        extension: "EXT168001 plain extension",
        foundingCriterion: "Helix at least 3Hd into competent soil, unless end-bearing on rock",
        soilRequirement: "Select helix from the published soil-strength table; verify the project ground model",
        installControl: "Project torque criterion and installation record required",
        torqueLimit: "81,472 N·m maximum table torque",
        durability: "75-year moderate-corrosivity basis; HDG600 at the soil-air interface or for more severe exposure",
        source: "Standard Specifications, SP09, 22/01/2020, pp. 9-10",
        defaultSource: "manufacturer",
        capacityBasis: "Published maximum load 500 kN; load data are ultimate U.N.O. Published lateral limit is 18.2 kN at 1.5 m above competent soil and requires static load testing.",
        note: "Heavy published row. Confirm installation equipment, project resistance, movement and supplier acceptance."
      },
      "solidity-s219018": {
        label: "Solidity S219018",
        productClass: "Published design-table row",
        productCode: "S219018",
        supplyBasis: "Engineered manufacture; supplier review required",
        system: "Heavy steel helical pile",
        axialClass: 0,
        compression: 0,
        uplift: 0,
        lateral: 16.9,
        rating: 500,
        capacityType: "published-ultimate-table",
        comparisonBasis: "none",
        shaft: "219.1 x 6.4 CHS",
        diameter: "219.1 mm OD",
        wall: "6.4 mm",
        steel: "C350L0 shaft; 350 MPa helix plate",
        helixCount: "1 helix",
        helix: "800 mm dia x 20 mm plate",
        length: "Lead length not stated in SP11",
        extension: "EXT219001 plain extension",
        foundingCriterion: "Helix at least 3Hd into competent soil, unless end-bearing on rock",
        soilRequirement: "Select helix from the published soil-strength table; verify the project ground model",
        installControl: "Project torque criterion and installation record required",
        torqueLimit: "89,581 N·m maximum table torque",
        durability: "75-year moderate-corrosivity basis; HDG600 at the soil-air interface or for more severe exposure",
        source: "Standard Specifications, SP11, 22/01/2020, pp. 11-12",
        defaultSource: "manufacturer",
        capacityBasis: "Published maximum load 500 kN; load data are ultimate U.N.O. Published lateral limit is 16.9 kN at 1.5 m above competent soil and requires static load testing.",
        note: "Heavy published row. The table value is not an SWL and requires supplier review."
      }
    }
  },
  madewell: {
    label: "Madewell Products",
    sourceUrl: "https://cdn.shopify.com/s/files/1/0510/7066/4881/files/ScrewPiles-Pricelist-August.pdf?v=1754620599",
    sourceReview: "Public source reviewed · 12 Aug 2026",
    defaultSeries: "madewell-100-g",
    series: {
      "madewell-100-g": {
        label: "Madewell 76.1 mm galvanised series",
        productClass: "Published stocked series",
        productCode: "SP-SBH*-G",
        supplyBasis: "Stocked galvanised lengths; certification on request",
        system: "Conventional steel screw pile",
        axialClass: 100,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 100,
        capacityType: "supplier-rating-up-to",
        comparisonBasis: "none",
        shaft: "76.1 x 4.0 CHS",
        diameter: "76.1 mm OD",
        wall: "4.0 mm",
        steel: "450+ grade minimum stated on product page",
        helixCount: "1 helix",
        helix: "275 x 8 mm; 300 x 8 mm option at 2.5 m",
        length: "1.5-4.0 m stocked lengths",
        extension: "1.0-4.0 m galvanised extensions",
        soilRequirement: "No founding criterion published in the price list",
        installControl: "Installation torque and acceptance criteria not published",
        durability: "Galvanised finish published; design life and corrosion allowance not stated",
        source: "Galvanised Screw Piles price list, Aug 2025; product page",
        defaultSource: "manufacturer",
        capacityBasis: "Supplier label up to 100 kN; load direction, safety basis, ground conditions and settlement criterion are not stated.",
        note: "Shortlist geometry and stocked length only. Obtain certified compression, tension and lateral values before selection."
      },
      "madewell-150-g": {
        label: "Madewell 88.9 mm galvanised series",
        productClass: "Published stocked series",
        productCode: "SP-150KN-*-G",
        supplyBasis: "Stocked galvanised lengths; certification on request",
        system: "Conventional steel screw pile",
        axialClass: 150,
        compression: 0,
        uplift: 0,
        lateral: 0,
        rating: 150,
        capacityType: "supplier-rating-up-to",
        comparisonBasis: "none",
        shaft: "88.9 x 5.5 CHS",
        diameter: "88.9 mm OD",
        wall: "5.5 mm",
        steel: "Steel grade to be confirmed from certification",
        helixCount: "1 helix",
        helix: "350 mm dia x 10 mm plate",
        length: "2.0-4.0 m stocked lengths",
        extension: "1.0-4.0 m galvanised extensions",
        soilRequirement: "No founding criterion published in the price list",
        installControl: "Installation torque and acceptance criteria not published",
        durability: "Galvanised finish published; design life and corrosion allowance not stated",
        source: "Galvanised Screw Piles price list, Aug 2025",
        defaultSource: "manufacturer",
        capacityBasis: "Supplier label 150 kN; load direction, safety basis, ground conditions and settlement criterion are not stated.",
        note: "Shortlist geometry and stocked length only. Obtain certified compression, tension and lateral values before selection."
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
        productCode: "S150 4W",
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
        productCode: "T150",
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
        productCode: "S250 8P",
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
        productCode: "S400 12P",
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
        productCode: "S600 16P",
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
        productCode: "SGP 1200",
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
        productCode: "SGC 1600",
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
        productCode: "SGC 2500",
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
        productCode: "SGN 89 × 2500",
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

const reoBars = globalThis.reoLapping.bars;
const reoBarByDesignation = globalThis.reoLapping.barByDesignation;
const reoLapCalculation = globalThis.reoLapping.calculateLap;
const reoDevelopmentCalculation = globalThis.reoLapping.calculateDevelopment;
const reoAnchorageCalculation = globalThis.reoLapping.calculateAnchorageComparison;
const reoInputIds = [
  "reoRebarPath", "reoMemberRole", "reoMemberType", "reoLapType", "reoMethod", "reoBar", "reoConcreteStrength",
  "reoCastingPosition", "reoMaterialCondition", "reoCover", "reoClearSpacing", "reoBarGap",
  "reoDoubleArea", "reoHalfSpliced", "reoRefinedArrangement", "reoAtrMinBasis", "reoNf", "reoNbs",
  "reoAtrTotal", "reoPressure", "reoPressureReference", "reoPressureBasisConfirmed", "reoTransverseLocationConfirmed", "reoAtrCountConfirmed", "reoExistingBarOrigin", "reoAnchorageBasis", "reoSteelStress", "reoReducedLengthRefinedConfirmed", "reoCastInTermination", "reoCastInTerminationConfirmed",
  "reoExistingMemberType", "reoExistingConcreteStrength", "reoExistingCastingPosition", "reoExistingMaterialCondition", "reoExistingCover",
  "reoExistingClearSpacing", "reoExistingC1", "reoExistingMethod", "reoExistingRefinedArrangement", "reoExistingAtrMinBasis",
  "reoExistingNf", "reoExistingNbs", "reoExistingAtrTotal", "reoExistingPressure", "reoExistingPressureReference", "reoExistingPressureBasisConfirmed", "reoExistingTransverseLocationConfirmed", "reoExistingAtrCountConfirmed"
];

if (!globalThis.reoState?.confirmationResetsForInput) throw new Error("Reinforcement state contract is required.");

const $ = id => document.getElementById(id);
const boltInputIds = ["boltSize", "category", "boltCount", "threadPlanes", "shankPlanes", "kr", "boltPitch", "connectedPlyBasis", "plateThickness", "plateStrength", "edgeCondition", "edgeDistance", "effectiveEdgeInput", "plateThickness2", "plateStrength2", "edgeCondition2", "edgeDistance2", "effectiveEdgeInput2", "integrityMode", "integrityComponent", "integrityAreaMode", "integrityPlateWidth", "integrityHoleCount", "integrityHoleDiameter", "integrityFy", "integrityAg", "integrityAn", "integrityKt", "integrityAgv", "integrityAnv", "integrityAnt", "integrityKbs", "interfaces", "slipFactor", "holeFactor", "slipShearDemand", "slipTensionDemand"];
const beamDimensionInputIds = [
  "beamDimID", "beamDimIBf", "beamDimITw", "beamDimITf",
  "beamDimPfcD", "beamDimPfcBf", "beamDimPfcTw", "beamDimPfcTf",
  "beamDimChsD", "beamDimChsT", "beamDimRhsD", "beamDimRhsB", "beamDimRhsT",
  "beamDimShsB", "beamDimShsT", "beamDimEaB", "beamDimEaT", "beamDimRodD"
];
const sectionPropertyInputIds = ["sectionWidth", "sectionHeight", "sectionThickness", "sectionDiameter", "sectionDepth", "sectionFlangeWidth", "sectionWebThickness", "sectionFlangeThickness", "sectionLeg", "sectionAngleThickness"];
const toolNames = ["bolt", "member", "beam", "monopole", "properties", "weld", "concrete", "reo", "screw", "rock"];
const toolCategories = {
  "steel-connections": ["bolt", "weld"],
  "steel-members": ["properties", "member", "beam", "monopole"],
  foundations: ["concrete", "reo", "screw", "rock"]
};
const toolAliases = { pad: "concrete", axial: "member" };
const publicToolHashes = { concrete: "pad" };
const concreteLayerFieldSuffixes = ["Active", "Auto", "Y", "Bar", "Spacing", "Fsy", "Es"];
let concreteLayerState = null;
let boltMode = "standard";
let beamFamily = "ub";
let memberType = "chs";
let memberNetAreaTracksGross = true;
const MEMBER_TYPE_LABELS = Object.freeze({
  ub: "UB",
  uc: "UC",
  pfc: "PFC",
  chs: "CHS",
  rhs: "RHS",
  shs: "SHS",
  ea: "EA",
  rod: "Round Bar",
  custom: "Custom / Built-up"
});
let reoPreviousRouteKey = "";
let mobileLayoutActive = typeof window !== "undefined" && window.matchMedia("(max-width: 500px)").matches;
let integrityHoleDiameterTracksBolt = true;
const manualInputIds = [
  "boltCount", "threadPlanes", "shankPlanes", "boltPitch", "plateThickness", "plateStrength", "edgeDistance", "effectiveEdgeInput", "plateThickness2", "plateStrength2", "edgeDistance2", "effectiveEdgeInput2", "integrityPlateWidth", "integrityHoleCount", "integrityHoleDiameter", "integrityFy", "integrityAg", "integrityAn", "integrityKt", "integrityAgv", "integrityAnv", "integrityAnt", "integrityKbs", "interfaces", "slipFactor",
  "weldLength", "weldRuns", "weldEffectiveThroat", "weldParentThickness", "weldDemand",
  "concreteTopDepth", "concreteBottomDepth", "concreteCover", "concreteFc", "concreteNsv", "concreteSv", "concreteFsyf",
  "reoConcreteStrength", "reoCover", "reoClearSpacing", "reoBarGap", "reoNf", "reoNbs", "reoAtrTotal", "reoPressure", "reoPressureReference", "reoSteelStress",
  "reoExistingConcreteStrength", "reoExistingCover", "reoExistingClearSpacing", "reoExistingC1", "reoExistingNf", "reoExistingNbs", "reoExistingAtrTotal", "reoExistingPressure", "reoExistingPressureReference",
  "layer1Y", "layer1Spacing", "layer1Fsy", "layer1Es", "layer2Y", "layer2Spacing", "layer2Fsy", "layer2Es",
  "layer3Y", "layer3Spacing", "layer3Fsy", "layer3Es", "layer4Y", "layer4Spacing", "layer4Fsy", "layer4Es",
  "beamMomentDemand", "beamShearDemand", "beamFyInput", "beamFywInput", "beamFuInput", ...beamDimensionInputIds,
  ...sectionPropertyInputIds, "sectionMaterialThickness", "sectionMaterialFyInput", "sectionMaterialFuInput",
  "screwFilterCompression", "screwFilterTension", "screwCompressionCap", "screwUpliftCap", "screwLateralCap", "screwProjectCompression", "screwProjectTension", "screwProjectHorizontal", "screwDemandN", "screwDemandVx", "screwDemandVy", "screwDemandMx", "screwDemandMy", "screwDemandTz", "screwPileColumns", "screwPileRows", "screwGroupLengthX", "screwGroupLengthY",
  "memberLength", "memberCompressionDemand", "memberTensionDemand", "memberHoleCount", "memberHoleDiameter", "memberHoleThickness", "memberNetArea",
  "memberDimChsD", "memberDimChsT", "memberDimRodD",
  "memberCustomArea", "memberCustomRx", "memberCustomRy", "memberCustomKf", "memberCustomAlphaBx", "memberCustomAlphaBy", "memberCustomLex", "memberCustomLey"
];
const referenceInputIds = [
  "boltSize", "category", "shearPlane", "kr", "edgeCondition", "edgeCondition2", "holeFactor", "integrityThickness", "integrityFu",
  "uBoltRodSize", "uBoltMemberGeometry", "uBoltFinish", "uBoltManufacturer", "uBoltProduct",
  "blindBoltSize", "blindBoltGrip", "blindBoltHead", "blindBoltFinish", "blindBoltManufacturer", "blindBoltProduct",
  "weldType", "weldSize", "weldCategory", "weldStrength", "weldLapConnection", "weldParentGrade",
  "concreteDirection", "concreteReinforcementLayout", "concreteShearReo", "concreteShearBar",
  "reoRebarPath", "reoMemberRole", "reoMemberType", "reoLapType", "reoMethod", "reoBar", "reoCastingPosition", "reoMaterialCondition", "reoCd", "reoExistingCd", "reoDoubleArea", "reoHalfSpliced", "reoRefinedArrangement", "reoAtrMinBasis", "reoPressureBasisConfirmed", "reoExistingBarOrigin", "reoAnchorageBasis", "reoCastInTermination", "reoCastInTerminationConfirmed", "reoExistingMemberType", "reoExistingCastingPosition", "reoExistingMaterialCondition", "reoExistingMethod", "reoExistingRefinedArrangement", "reoExistingAtrMinBasis", "reoExistingKValue", "reoExistingCombinedFactor", "reoExistingPressureBasisConfirmed",
  "layer1Active", "layer1Auto", "layer1Bar", "layer2Active", "layer2Auto", "layer2Bar", "layer3Active", "layer3Auto", "layer3Bar", "layer4Active", "layer4Auto", "layer4Bar",
  "beamFamily", "beamSection", "beamCustomMaterialForm", "beamGrade", "beamDirection", "sectionCatalogueFamily", "sectionCatalogueDesignation", "sectionShape", "sectionMaterialForm", "sectionMaterialGrade",
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
function alphaBInput(id) { return signedValue(id, NaN); }
function displayFixed(number, digits = 0) { return EngineeringNumberFormat.decimalHalfUp(number, digits); }
function displaySignificant(number, digits = 3) { return EngineeringNumberFormat.decimalHalfUpSignificant(number, digits); }
function trimDisplayZeros(text) {
  return String(text).includes(".") ? String(text).replace(/0+$/, "").replace(/\.$/, "") : String(text);
}
function groupDisplayText(text) {
  const value = String(text);
  if (value === "—") return value;
  const [whole, fraction] = value.split(".");
  const groupedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction === undefined ? groupedWhole : `${groupedWhole}.${fraction}`;
}
function displayGroupedFixed(number, digits = 0, trimZeros = true) {
  const rounded = displayFixed(number, digits);
  return groupDisplayText(trimZeros ? trimDisplayZeros(rounded) : rounded);
}
function displayGroupedSignificant(number, digits = 3) {
  return groupDisplayText(displaySignificant(number, digits));
}
function fixed(number) { return displayFixed(number, 1); }
function fixed2(number) { return displayFixed(number, 2); }
function weldLapReduction(lengthMm) {
  return WeldCapacity.lapReduction(lengthMm);
}
function weldCapacityFactor(type, category) {
  return WeldCapacity.capacityFactor(type, category);
}
function formatArea(number) { return `${displayGroupedFixed(number, 0)} mm²`; }
function formatDimension(number, digits = 1) {
  const value = Number(number);
  return Number.isFinite(value) ? displayFixed(value, digits).replace(/\.0$/, "") : "—";
}
function formatInertia(number) {
  const value = Number(number);
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value >= 1e6) return `${displayFixed(value / 1e6, 2)} × 10<sup>6</sup> mm<sup>4</sup>`;
  if (value >= 1e3) return `${displayFixed(value / 1e3, 2)} × 10<sup>3</sup> mm<sup>4</sup>`;
  return `${displayFixed(value, 0)} mm<sup>4</sup>`;
}
function signedFixed(number, digits = 1) { return `${number >= 0 ? "+" : ""}${displayFixed(number, digits)}`; }
function safeText(text) {
  return String(text ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function calculationTraceLine(label, content, className = "") {
  if (!content) return "";
  return `<div class="calculation-trace-line${className ? ` ${className}` : ""}"><span>${label}</span><code>${content}</code></div>`;
}

function calculationTraceRow({
  title,
  reference = "",
  formula = "",
  substitution = "",
  result = "",
  applicability = "",
  lookup = "",
  selection = "",
  adopted = "",
  state = ""
}) {
  const lookupMode = Boolean(lookup || selection || adopted);
  const lines = lookupMode
    ? [
        calculationTraceLine("Lookup", lookup),
        calculationTraceLine("Selection", selection),
        calculationTraceLine("Adopted value", adopted, "is-result"),
        calculationTraceLine("Applicability", applicability, "is-applicability")
      ]
    : [
        calculationTraceLine("Formula", formula),
        calculationTraceLine("Substitution", substitution),
        calculationTraceLine("Result", result, "is-result"),
        calculationTraceLine("Applicability", applicability, "is-applicability")
      ];
  return `<div class="calculation-trace-row${state ? ` is-${state}` : ""}">
    <div class="calculation-trace-heading">
      <b>${title}</b>
      ${reference ? `<small>${reference}</small>` : ""}
    </div>
    <div class="calculation-trace-body">${lines.join("")}</div>
  </div>`;
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
  manualInputIds.forEach(id => $(id)?.closest("label, .detailing-input-control")?.classList.add("input-manual"));
  referenceInputIds.forEach(id => $(id)?.closest("label, .detailing-input-control")?.classList.add("input-reference"));
}

function calculateConnectedPly(config, bolt, count) {
  const actualEdge = numericValue($(config.edgeDistanceId).value);
  const effectiveEdge = numericValue($(config.effectiveEdgeInputId).value);
  const edgeRequirement = BoltCapacity.minimumEdgeDistance({
    diameter: bolt.d,
    edgeFactor: value(config.edgeConditionId)
  });
  const minimumEdge = edgeRequirement.minimum;
  const plateStrength = numericValue($(config.plateStrengthId).value);
  const plateThickness = numericValue($(config.plateThicknessId).value);
  const valid = Number.isFinite(actualEdge) && actualEdge >= 0
    && Number.isFinite(effectiveEdge) && effectiveEdge > 0
    && Number.isFinite(plateStrength) && plateStrength > 0
    && Number.isFinite(plateThickness) && plateThickness > 0;
  const edgeDistancePass = valid && actualEdge >= minimumEdge;
  const bearing = valid
    ? BoltCapacity.designPlyBearing({
        diameter: bolt.d,
        thickness: plateThickness,
        tensileStrength: plateStrength,
        effectiveEdge
      })
    : null;
  const bearingFull = bearing?.full ?? null;
  const bearingEdge = bearing?.edge ?? null;
  const localCapacity = bearing?.local ?? null;
  const groupCapacity = valid ? count * localCapacity : null;

  return {
    ...config,
    actualEdge,
    effectiveEdge,
    edgeFactor: edgeRequirement.factor,
    minimumEdge,
    edgeDistancePass,
    plateStrength,
    plateThickness,
    valid,
    bearingFull,
    bearingEdge,
    localCapacity,
    groupCapacity,
    controlLabel: bearingEdge <= bearingFull ? "Edge-distance limit" : "Full-bearing limit"
  };
}

function updateConnectedPlyOutputs(ply, suffix = "") {
  $(`edgeDistanceStatus${suffix}`).textContent = !ply.valid ? "INPUT" : ply.edgeDistancePass ? "PASS" : "FAIL";
  $(`edgeDistanceStatus${suffix}`).className = `input-check-status ${ply.valid && ply.edgeDistancePass ? "pass" : "fail"}`;
  const standardHole = value("holeFactor") === 1;
  const edgeExpression = `e<sub>min</sub> = ${displayFixed(ply.edgeFactor, 2)}d<sub>f</sub> = ${fixed(ply.minimumEdge)} mm`;
  $(`edgeDistanceRequirement${suffix}`).innerHTML = standardHole
    ? `${edgeExpression} &middot; standard hole: centre to edge`
    : `${edgeExpression} &middot; non-standard hole: nearer hole edge to ply edge + d<sub>f</sub>/2`;
}

function connectedPlyFormulaRows(ply, bolt, count) {
  if (!ply.valid) {
    return calculationTraceRow({
      title: `${ply.label} bearing and edge checks`,
      result: "Input required",
      applicability: "Enter positive ply thickness, tensile strength and effective edge distance, plus a non-negative detailing edge distance.",
      state: "warning"
    });
  }
  const effectiveEdgeBasis = `drawing value a<sub>e</sub> = ${fixed(ply.effectiveEdge)} mm`;
  return [
    calculationTraceRow({
      title: `${ply.label} full bearing`,
      reference: "AS 4100 Cl. 9.2.2.4(1)",
      formula: `&phi;V<sub>b</sub> = &phi;3.2d<sub>f</sub>t<sub>p</sub>f<sub>up</sub>`,
      substitution: `0.90 &times; 3.2 &times; ${fixed(bolt.d)} mm &times; ${fixed(ply.plateThickness)} mm &times; ${displayFixed(ply.plateStrength, 0)} MPa / 1000`,
      result: `Design capacity per bolt = ${fixed(ply.bearingFull)} kN`,
      applicability: "Full-bearing limit at the checked hole."
    }),
    calculationTraceRow({
      title: `${ply.label} edge-distance limit`,
      reference: "AS 4100 Cl. 9.2.2.4(2)",
      formula: `&phi;V<sub>b,e</sub> = &phi;a<sub>e</sub>t<sub>p</sub>f<sub>up</sub>`,
      substitution: `${effectiveEdgeBasis}; 0.90 &times; ${fixed(ply.effectiveEdge)} mm &times; ${fixed(ply.plateThickness)} mm &times; ${displayFixed(ply.plateStrength, 0)} MPa / 1000`,
      result: `Design capacity per bolt = ${fixed(ply.bearingEdge)} kN`,
      applicability: "Effective edge distance is a project drawing input."
    }),
    calculationTraceRow({
      title: `${ply.label} minimum edge`,
      reference: "AS 4100 Table 9.5.2",
      lookup: "Minimum edge-distance multiplier for the selected edge condition.",
      selection: `${displayFixed(ply.edgeFactor, 2)}d<sub>f</sub>; d<sub>f</sub> = ${fixed(bolt.d)} mm`,
      adopted: `e<sub>min</sub> = ${fixed(ply.minimumEdge)} mm; provided e = ${fixed(ply.actualEdge)} mm; ${ply.edgeDistancePass ? "PASS" : "FAIL"}`,
      applicability: value("holeFactor") === 1
        ? "Standard hole: e is measured from hole centre to ply edge."
        : "Non-standard hole: e is measured from the nearer hole edge to the ply edge plus half the bolt diameter."
    }),
    calculationTraceRow({
      title: `${ply.label} local hole-bearing capacity`,
      formula: `&phi;V<sub>b,local</sub> = min(&phi;V<sub>b</sub>, &phi;V<sub>b,e</sub>); &phi;V<sub>b,group</sub> = n&phi;V<sub>b,local</sub>`,
      substitution: `min(${fixed(ply.bearingFull)}, ${fixed(ply.bearingEdge)}) = ${fixed(ply.localCapacity)} kN; ${count} &times; ${fixed(ply.localCapacity)} kN`,
      result: `Equal-share group capacity = ${fixed(ply.groupCapacity)} kN`,
      applicability: "Identical bolts and equal shear sharing are assumed."
    })
  ].join("");
}

function calculateConnectedPlyIntegrity(primaryPly, secondPly, separatePlyCheck) {
  const mode = $("integrityMode").value;
  const componentSelect = $("integrityComponent");
  componentSelect.disabled = !separatePlyCheck;
  if (!separatePlyCheck && componentSelect.value !== "primary") componentSelect.value = "primary";
  const checkedPly = separatePlyCheck && componentSelect.value === "second" ? secondPly : primaryPly;
  const enabled = mode === "manual";
  const areaMode = $("integrityAreaMode").value;
  const automaticAreas = areaMode === "straight";
  $("integrityInputs").hidden = !enabled;
  $("integrityThickness").value = displayFixed(checkedPly.plateThickness, 1);
  $("integrityFu").value = displayFixed(checkedPly.plateStrength, 0);
  ["integrityPlateWidth", "integrityHoleCount", "integrityHoleDiameter"].forEach(id => {
    $(id).disabled = !automaticAreas;
  });
  $("integrityAg").readOnly = automaticAreas;
  $("integrityAn").readOnly = automaticAreas;
  $("integrityAg").placeholder = automaticAreas ? "Calculated" : "Required";
  $("integrityAn").placeholder = automaticAreas ? "Calculated" : "Required";
  $("integrityGeometryNote").innerHTML = value("holeFactor") === 1
    ? `Straight transverse section only &middot; n<sub>h</sub> is holes crossed, not total bolts &middot; d<sub>h</sub> defaults to d<sub>f</sub> + 2 mm and remains editable.`
    : `Non-standard hole selected &middot; enter the project deduction dimension d<sub>h</sub>; use Manual areas for slots, staggered holes or non-straight paths.`;

  const empty = {
    enabled: false,
    complete: false,
    checkedPly,
    areaMode,
    areas: null,
    net: null,
    block: null,
    error: ""
  };
  if (!enabled) {
    $("integritySummaryStatus").textContent = "Not evaluated";
    $("integrityNetCapacity").textContent = "Not evaluated";
    $("integrityNetBasis").textContent = "Enable the ply rupture assessment";
    $("integrityBlockCapacity").textContent = "Not evaluated";
    $("integrityBlockBasis").textContent = "Enable the ply rupture assessment";
    $("integrityCheckNote").hidden = true;
    return empty;
  }

  $("integrityCheckNote").hidden = false;

  let areas = null;
  let net = null;
  let block = null;
  const errors = [];
  if (automaticAreas) {
    try {
      areas = BoltIntegrity.straightLineNetArea({
        width: numericValue($("integrityPlateWidth").value),
        thickness: checkedPly.plateThickness,
        holeCount: numericValue($("integrityHoleCount").value),
        holeDiameter: numericValue($("integrityHoleDiameter").value)
      });
      $("integrityAg").value = displayFixed(areas.grossArea, 1);
      $("integrityAn").value = displayFixed(areas.netArea, 1);
      $("integrityNetAreaNote").innerHTML = `A<sub>g</sub> = bt<sub>p</sub> = ${displayFixed(areas.grossArea, 1)} mm&sup2; &middot; A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t<sub>p</sub> = ${displayFixed(areas.netArea, 1)} mm&sup2;.`;
    } catch (error) {
      $("integrityAg").value = "";
      $("integrityAn").value = "";
      $("integrityNetAreaNote").textContent = `Input required · ${error.message}`;
      errors.push(error.message);
    }
  } else {
    $("integrityNetAreaNote").textContent = "Enter project-verified gross and net areas for the governing critical section.";
  }

  try {
    net = BoltIntegrity.netSectionTension({
      Ag: value("integrityAg"),
      An: value("integrityAn"),
      fy: value("integrityFy"),
      fu: checkedPly.plateStrength,
      kt: value("integrityKt")
    });
    $("integrityNetCapacity").textContent = `${fixed(net.design)} kN`;
    $("integrityNetBasis").textContent = net.control;
  } catch (error) {
    errors.push(error.message);
    $("integrityNetCapacity").textContent = "Input required";
    $("integrityNetBasis").textContent = "Enter valid Ag, An, fyc and kt";
  }

  try {
    block = BoltIntegrity.blockShear({
      Agv: value("integrityAgv"),
      Anv: value("integrityAnv"),
      Ant: value("integrityAnt"),
      fy: value("integrityFy"),
      fu: checkedPly.plateStrength,
      kbs: value("integrityKbs")
    });
    $("integrityBlockCapacity").textContent = `${fixed(block.design)} kN`;
    $("integrityBlockBasis").textContent = block.control;
  } catch (error) {
    errors.push(error.message);
    $("integrityBlockCapacity").textContent = "Input required";
    $("integrityBlockBasis").textContent = "Enter valid Agv, Anv, Ant, fyc and kbs";
  }

  const complete = Boolean(net && block);
  $("integritySummaryStatus").textContent = complete
    ? "Complete"
    : "Input required";
  if (complete) {
    $("integrityCheckNote").textContent = "Review all plausible failure paths for the checked ply.";
  } else {
    $("integrityCheckNote").textContent = `Complete the required areas. ${[...new Set(errors)].join(" ")}`;
  }

  return {
    enabled,
    complete,
    checkedPly,
    areaMode,
    areas,
    net,
    block,
    error: [...new Set(errors)].join(" ")
  };
}

function calculateBolt() {
  const size = $("boltSize").value;
  const categoryKey = $("category").value;
  const plane = $("shearPlane").value;
  const bolt = boltData[size];
  const category = categories[categoryKey];
  const fuf = BoltCapacity.ultimateStrength({
    grade: category.grade,
    diameter: bolt.d,
    tableStrength: category.fuf
  });
  const strengthSourceNote = category.grade === "8.8" && bolt.d < 16
    ? "AS 4100 Table 9.2.1 Note 2: fuf = 800 MPa for property class 8.8 bolts below 16 mm."
    : `Selected property class ${category.grade}: fuf = ${fuf} MPa.`;
  const krInput = numericValue($("kr").value);
  const krValid = Number.isFinite(krInput) && krInput >= 0.75 && krInput <= 1;
  const kr = krValid ? krInput : null;
  $("kr").setAttribute("aria-invalid", String(!krValid));
  const tension = BoltCapacity.designTension({ As: bolt.As, fuf });
  const threadShearResult = krValid ? BoltCapacity.designShear({
    grade: category.grade,
    fuf,
    kr,
    threadPlanes: 1,
    shankPlanes: 0,
    Ac: bolt.Ac,
    Ao: bolt.Ao
  }) : null;
  const shankShearResult = krValid ? BoltCapacity.designShear({
    grade: category.grade,
    fuf,
    kr,
    threadPlanes: 0,
    shankPlanes: 1,
    Ac: bolt.Ac,
    Ao: bolt.Ao
  }) : null;
  const threadKrd = threadShearResult?.krd ?? null;
  const shankKrd = shankShearResult?.krd ?? null;
  const threadShear = threadShearResult?.design ?? null;
  const shankShear = shankShearResult?.design ?? null;
  const selectedShear = plane === "N" ? threadShear : shankShear;
  const countInput = numericValue($("boltCount").value);
  const countValid = Number.isInteger(countInput) && countInput >= 1 && countInput <= 100;
  $("boltCount").setAttribute("aria-invalid", String(!countValid));
  const count = countValid ? countInput : 1;
  const nThread = numericValue($("threadPlanes").value);
  const nShank = numericValue($("shankPlanes").value);
  const shearPlanesValid = Number.isInteger(nThread) && nThread >= 0 && nThread <= 10
    && Number.isInteger(nShank) && nShank >= 0 && nShank <= 10
    && nThread + nShank >= 1;
  const totalThreadPlanes = count * nThread;
  const totalShankPlanes = count * nShank;
  const groupShearInputsValid = countValid && shearPlanesValid && krValid;
  const groupShearResult = groupShearInputsValid
    ? BoltCapacity.designShear({
        grade: category.grade,
        fuf,
        kr,
        threadPlanes: totalThreadPlanes,
        shankPlanes: totalShankPlanes,
        Ac: bolt.Ac,
        Ao: bolt.Ao
      })
    : null;
  const groupKrd = groupShearResult?.krd ?? null;
  const groupShear = groupShearResult?.design ?? null;
  const boltPitch = Math.max(0, value("boltPitch"));
  const minimumPitch = 2.5 * bolt.d;
  const pitchApplicable = count > 1;
  const pitchPass = !pitchApplicable || boltPitch >= minimumPitch;
  $("boltPitch").disabled = !pitchApplicable;

  const primaryPly = calculateConnectedPly({
    label: "Primary ply",
    plateThicknessId: "plateThickness",
    plateStrengthId: "plateStrength",
    edgeConditionId: "edgeCondition",
    edgeDistanceId: "edgeDistance",
    effectiveEdgeInputId: "effectiveEdgeInput"
  }, bolt, count);
  const secondPly = calculateConnectedPly({
    label: "Second ply",
    plateThicknessId: "plateThickness2",
    plateStrengthId: "plateStrength2",
    edgeConditionId: "edgeCondition2",
    edgeDistanceId: "edgeDistance2",
    effectiveEdgeInputId: "effectiveEdgeInput2"
  }, bolt, count);
  const separatePlyCheck = $("connectedPlyBasis").value === "separate";
  $("secondPlyFields").hidden = !separatePlyCheck;
  $("boltPlyGrid").classList.toggle("has-second-ply", separatePlyCheck);
  $("plyComparison").hidden = !separatePlyCheck;
  $("connectedPlyBasisNote").textContent = separatePlyCheck
    ? "Each connected ply is assessed using its entered properties and edge geometry."
    : "Primary ply properties apply to both connected plies.";
  const connectedPlyInputsValid = primaryPly.valid && (!separatePlyCheck || secondPly.valid);
  const thinnerPlyThickness = separatePlyCheck
    ? Math.min(primaryPly.plateThickness, secondPly.plateThickness)
    : primaryPly.plateThickness;
  const maximumPitch = connectedPlyInputsValid ? Math.min(15 * thinnerPlyThickness, 200) : null;
  const maximumPitchPass = connectedPlyInputsValid && (!pitchApplicable || boltPitch <= maximumPitch);

  const capacitiesEqual = connectedPlyInputsValid && separatePlyCheck && Math.abs(primaryPly.groupCapacity - secondPly.groupCapacity) < 0.05;
  const governingPly = connectedPlyInputsValid && separatePlyCheck && secondPly.groupCapacity < primaryPly.groupCapacity ? secondPly : primaryPly;
  const fullCapacitiesEqual = connectedPlyInputsValid && separatePlyCheck && Math.abs(primaryPly.bearingFull - secondPly.bearingFull) < 0.05;
  const edgeCapacitiesEqual = connectedPlyInputsValid && separatePlyCheck && Math.abs(primaryPly.bearingEdge - secondPly.bearingEdge) < 0.05;
  const governingFullPly = connectedPlyInputsValid && separatePlyCheck && secondPly.bearingFull < primaryPly.bearingFull ? secondPly : primaryPly;
  const governingEdgePly = connectedPlyInputsValid && separatePlyCheck && secondPly.bearingEdge < primaryPly.bearingEdge ? secondPly : primaryPly;
  const governingFullPlyLabel = !separatePlyCheck ? "Both plies identical" : fullCapacitiesEqual ? "Both plies equal" : governingFullPly.label;
  const governingEdgePlyLabel = !separatePlyCheck ? "Both plies identical" : edgeCapacitiesEqual ? "Both plies equal" : governingEdgePly.label;
  const fullBearingGroupCapacity = connectedPlyInputsValid ? count * governingFullPly.bearingFull : null;
  const edgeTearoutGroupCapacity = connectedPlyInputsValid ? count * governingEdgePly.bearingEdge : null;
  const bearingLimitsEqual = connectedPlyInputsValid
    && Math.abs(fullBearingGroupCapacity - edgeTearoutGroupCapacity) < 0.05;
  const fullBearingGoverns = connectedPlyInputsValid
    && (bearingLimitsEqual || fullBearingGroupCapacity < edgeTearoutGroupCapacity);
  const edgeBearingGoverns = connectedPlyInputsValid
    && (bearingLimitsEqual || edgeTearoutGroupCapacity < fullBearingGroupCapacity);
  const governingBearingGroupCapacity = countValid && connectedPlyInputsValid ? governingPly.groupCapacity : null;
  const evaluatedConnectionShearValid = groupShearInputsValid && Number.isFinite(governingBearingGroupCapacity);
  const connectionShearControlsEqual = evaluatedConnectionShearValid
    && Math.abs(groupShear - governingBearingGroupCapacity) < 0.05;
  const groupShearGoverns = evaluatedConnectionShearValid
    && (connectionShearControlsEqual || groupShear < governingBearingGroupCapacity);
  const connectedPlyBearingGoverns = evaluatedConnectionShearValid
    && (connectionShearControlsEqual || governingBearingGroupCapacity < groupShear);
  const governingPlyLabel = !separatePlyCheck
    ? "Both plies identical"
    : capacitiesEqual
      ? "Both plies equal"
      : governingPly.label;
  const preload = category.preload ? bolt[category.preload] : 0;
  const slipInterfaces = numericValue($("interfaces").value);
  const holeFactor = value("holeFactor");
  const slipFactor = numericValue($("slipFactor").value);
  const slipInputsValid = Number.isInteger(slipInterfaces) && slipInterfaces >= 1 && slipInterfaces <= 10
    && Number.isFinite(slipFactor) && slipFactor > 0 && slipFactor <= 1;
  const slip = category.type === "friction" && slipInputsValid
    ? BoltCapacity.designSlipResistance({
        slipFactor,
        interfaces: slipInterfaces,
        preload,
        holeFactor
      })
    : null;
  const slipGroupCapacity = slip === null ? null : count * slip;
  const slipTensionCapacity = preload > 0 ? 0.7 * count * preload : null;
  const slipShearDemand = value("slipShearDemand");
  const slipTensionDemand = value("slipTensionDemand");
  const integrity = calculateConnectedPlyIntegrity(primaryPly, secondPly, separatePlyCheck);
  const slipRatio = slipGroupCapacity && slipTensionCapacity
    ? BoltCapacity.slipInteraction({
        shearAction: slipShearDemand,
        shearCapacity: slipGroupCapacity,
        tensionAction: slipTensionDemand,
        tensionCapacity: slipTensionCapacity
      })
    : Infinity;
  const hasSlipDemand = slipShearDemand > 0 || slipTensionDemand > 0;
  const detailingFailures = [];
  if (!krValid) detailingFailures.push("bolted-lap reduction factor");
  if (!shearPlanesValid) detailingFailures.push("shear-plane counts");
  if (pitchApplicable && !pitchPass) detailingFailures.push("minimum pitch");
  if (!connectedPlyInputsValid) detailingFailures.push("connected-ply inputs");
  if (connectedPlyInputsValid && pitchApplicable && !maximumPitchPass) detailingFailures.push("maximum pitch");
  if (primaryPly.valid && !primaryPly.edgeDistancePass) detailingFailures.push(separatePlyCheck ? "primary-ply edge distance" : "edge distance");
  if (separatePlyCheck && secondPly.valid && !secondPly.edgeDistancePass) detailingFailures.push("second-ply edge distance");
  const detailingCompliant = detailingFailures.length === 0;
  const detailingFailureNote = detailingCompliant
    ? ""
    : `Detailing non-compliant: ${detailingFailures.join(", ")}. Do not adopt the displayed capacities.`;
  const slipDisplayNote = category.type === "friction" && !slipInputsValid
    ? "Input required: enter a positive slip factor and a whole-number interface count from 1 to 10."
    : !detailingCompliant
    ? detailingFailureNote
    : !hasSlipDemand
      ? "Enter serviceability slip actions for the AS 4100 Cl. 9.2.3.3 check."
      : `AS 4100 Cl. 9.2.3.3: Vsf* / \u03c6Vsf + Ntf* / \u03c6Ntf = ${displayFixed(slipRatio, 2)}; limit \u2264 1.0.`;

  const connectionCategory = categoryKey.split("/")[1];
  const drawingCallout = BoltCapacity.formatDrawingCallout({
    size,
    grade: category.grade,
    connectionCategory,
    plane
  });
  $("selectionTitle").textContent = drawingCallout;
  $("drawingNote").textContent = "N: threads intercept shear plane · X: threads clear of shear plane";
  $("diameterValue").textContent = `${bolt.d} mm`;
  $("stressAreaValue").textContent = `${bolt.As} mm²`;
  $("coreAreaValue").textContent = `${bolt.Ac} mm²`;
  $("shankAreaValue").textContent = `${bolt.Ao} mm²`;
  $("strengthValue").textContent = `${fuf} MPa`;
  const hasInstalledTension = Boolean(category.preload && Number.isFinite(preload));
  $("installedTensionValue").textContent = hasInstalledTension ? `${displayFixed(preload, 0)} kN` : "Not required";
  $("boltPreloadLookup").hidden = !hasInstalledTension;
  if (!hasInstalledTension) $("boltPreloadLookup").open = false;
  $("tfSlipSection").hidden = category.type !== "friction";
  document.querySelectorAll(".bolt-preload-table tbody tr").forEach(row => {
    const selectedSize = row.dataset.boltSize === size;
    row.classList.toggle("is-selected", hasInstalledTension && selectedSize);
    row.querySelectorAll("[data-grade]").forEach(cell => {
      cell.classList.toggle("is-selected-grade", hasInstalledTension && selectedSize && cell.dataset.grade === category.grade);
    });
  });
  $("selectedShearLabel").innerHTML = `Design shear capacity, &phi;V<sub>f</sub> &middot; ${plane}-plane`;
  $("selectedShearCapacity").textContent = krValid ? fixed(selectedShear) : "Not evaluated";
  $("selectedShearNote").innerHTML = plane === "N"
    ? "Threads intercept shear plane &middot; AS 4100 Cl. 9.2.2.1"
    : "Threads clear of shear plane &middot; AS 4100 Cl. 9.2.2.1";
  $("tensionCapacity").textContent = fixed(tension);
  $("boltResultNote").innerHTML = krValid
    ? `Selected ${plane}-plane capacity &middot; k<sub>rd</sub> = ${displayFixed(plane === "N" ? threadKrd : shankKrd, 2)} &middot; k<sub>r</sub> = ${displayFixed(kr, 2)}.`
    : "Input required &middot; enter k<sub>r</sub> from 0.75 to 1.00.";
  $("boltDetailingStatus").hidden = countValid && detailingCompliant;
  $("boltDetailingStatus").textContent = countValid
    ? detailingFailureNote
    : "Invalid bolt-group input: enter a whole-number bolt count from 1 to 100.";
  $("groupShearCapacity").textContent = groupShearInputsValid ? `${fixed(groupShear)} kN` : "Not evaluated";
  $("groupShearBasis").textContent = groupShearInputsValid
    ? `${count} bolt${count === 1 ? "" : "s"} · ${nThread} N + ${nShank} X shear planes per bolt · equal shear per bolt assumed${groupShearGoverns ? connectionShearControlsEqual ? " · Governs jointly" : " · Governs" : ""}${detailingCompliant ? "" : " · detailing check failed"}`
    : countValid && krValid
      ? "Enter whole-number N/X shear-plane counts with at least one shear plane."
      : !countValid
        ? "Enter a whole-number bolt count from 1 to 100."
        : "Enter k_r from 0.75 to 1.00.";
  $("primaryPlyCapacity").textContent = countValid && primaryPly.valid ? `${fixed(primaryPly.groupCapacity)} kN` : "Not evaluated";
  $("primaryPlyControl").textContent = primaryPly.valid ? primaryPly.controlLabel : "Input required";
  $("secondPlyCapacity").textContent = countValid && secondPly.valid ? `${fixed(secondPly.groupCapacity)} kN` : "Not evaluated";
  $("secondPlyControl").textContent = secondPly.valid ? secondPly.controlLabel : "Input required";
  $("bearingGroupCapacity").textContent = countValid && connectedPlyInputsValid ? `${fixed(fullBearingGroupCapacity)} kN` : "Not evaluated";
  $("bearingGroupBasis").textContent = countValid && connectedPlyInputsValid
    ? `${governingFullPlyLabel} · ${fixed(governingFullPly.bearingFull)} kN per bolt × ${count} bolt${count === 1 ? "" : "s"}${fullBearingGoverns ? bearingLimitsEqual ? " · Controls bearing jointly" : " · Controls bearing" : ""}`
    : countValid ? "Complete the connected-ply inputs." : "Enter a valid bolt count.";
  $("tearoutGroupCapacity").textContent = countValid && connectedPlyInputsValid ? `${fixed(edgeTearoutGroupCapacity)} kN` : "Not evaluated";
  $("tearoutGroupBasis").textContent = countValid && connectedPlyInputsValid
    ? `${governingEdgePlyLabel} · ${fixed(governingEdgePly.bearingEdge)} kN per bolt × ${count} bolt${count === 1 ? "" : "s"}${edgeBearingGoverns ? bearingLimitsEqual ? " · Controls bearing jointly" : " · Controls bearing" : ""}`
    : countValid ? "Complete the connected-ply inputs." : "Enter a valid bolt count.";
  $("governingBearingCapacity").textContent = Number.isFinite(governingBearingGroupCapacity)
    ? `${fixed(governingBearingGroupCapacity)} kN`
    : "Not evaluated";
  $("governingBearingBasis").textContent = Number.isFinite(governingBearingGroupCapacity)
    ? `${governingPly.controlLabel} controls bearing · ${governingPlyLabel.toLowerCase()}${connectedPlyBearingGoverns ? connectionShearControlsEqual ? " · Governs jointly" : " · Governs" : ""}${detailingCompliant ? "" : " · detailing check failed"}`
    : countValid ? "Complete the connected-ply inputs" : "Enter a valid bolt count";
  $("groupShearResultRow").classList.toggle("governing", groupShearGoverns);
  $("bearingResultRow").classList.toggle("governing", connectedPlyBearingGoverns);
  updateConnectedPlyOutputs(primaryPly);
  updateConnectedPlyOutputs(secondPly, "2");
  const pitchCompliant = connectedPlyInputsValid && pitchPass && maximumPitchPass;
  $("pitchCheckValue").innerHTML = !countValid
    ? "Enter a whole-number bolt count from 1 to 100"
    : pitchApplicable
    ? connectedPlyInputsValid
      ? `<output id="minimumPitch">${fixed(minimumPitch)}</output>-<output id="maximumPitch">${fixed(maximumPitch)}</output> mm permitted &middot; AS 4100 Cl. 9.5.1; AS 4100 Cl. 9.5.3 general limit`
      : "Input required · enter valid connected-ply thickness"
    : "Not applicable to a single-bolt connection";
  $("pitchStatus").textContent = !countValid || !connectedPlyInputsValid ? "INPUT" : pitchApplicable ? (pitchCompliant ? "PASS" : "FAIL") : "N/A";
  $("pitchStatus").className = `input-check-status ${!countValid || !connectedPlyInputsValid ? "fail" : pitchApplicable ? (pitchCompliant ? "pass" : "fail") : "neutral"}`;
  $("slipCapacity").textContent = category.type !== "friction" ? "Not applicable" : !slipInputsValid ? "Input required" : `${fixed(slip)} kN`;
  $("slipCapacityBasis").innerHTML = !countValid
    ? "Per-bolt resistance shown; group resistance not evaluated until bolt count is valid"
    : category.type !== "friction"
    ? "TF categories only"
    : !slipInputsValid
    ? "Enter a positive slip factor and a whole-number interface count from 1 to 10"
    : `Per bolt &middot; k<sub>h</sub> = ${displayFixed(holeFactor, 2)} &middot; ${count}-bolt group = ${fixed(slipGroupCapacity)} kN`;
  $("slipGoverningRatio").textContent = Number.isFinite(slipRatio) && hasSlipDemand ? displayFixed(slipRatio, 2) : "—";
  $("slipGoverningStatus").textContent = !countValid
    ? "Invalid bolt count"
    : category.type === "friction" && !slipInputsValid
    ? "Input required"
    : !detailingCompliant
    ? "NON-COMPLIANT"
    : !hasSlipDemand
      ? "Enter slip actions"
      : slipRatio <= 1
        ? "TF slip PASS"
        : "TF slip FAIL";
  $("slipGoverningStatus").className = !countValid || !detailingCompliant || (category.type === "friction" && !slipInputsValid) ? "fail" : !hasSlipDemand ? "" : slipRatio <= 1 ? "pass" : "fail";
  $("slipGoverningNote").textContent = countValid
    ? slipDisplayNote
    : "Bolt-group slip interaction is not evaluated until a valid bolt count is entered.";

  const activePlyFormulaRows = countValid
    ? connectedPlyFormulaRows(primaryPly, bolt, count)
      + (separatePlyCheck ? connectedPlyFormulaRows(secondPly, bolt, count) : "")
    : calculationTraceRow({
        title: "Bolt-group and connected-ply checks",
        result: "Not evaluated",
        applicability: "Enter a whole-number bolt count from 1 to 100.",
        state: "warning"
      });
  const integrityFormulaRows = !integrity.enabled
    ? calculationTraceRow({
        title: "Ply rupture assessment",
        result: "Not evaluated",
        applicability: "Net-section tension uses a straight-section calculation or manual areas; block shear requires manual governing-path areas."
      })
    : !integrity.complete
      ? calculationTraceRow({
          title: "Ply rupture assessment",
          result: "Input required",
          applicability: integrity.error,
          state: "warning"
        })
      : [
          calculationTraceRow({
            title: `${integrity.checkedPly.label} section tension`,
            reference: "AS 4100 Cls 7.2, 9.1.9(b) and 9.1.10",
            formula: `&phi;N<sub>t</sub> = 0.90min(A<sub>g</sub>f<sub>yc</sub>, 0.85k<sub>t</sub>A<sub>n</sub>f<sub>uc</sub>)`,
            substitution: `0.90min(${fixed(integrity.net.grossYield)}, ${fixed(integrity.net.netFracture)}) kN`,
            result: `Design capacity = ${fixed(integrity.net.design)} kN`,
            applicability: integrity.areaMode === "straight"
              ? "Straight transverse section only; checked connected ply only."
              : "Manual project-verified gross and net areas; checked connected ply only."
          }),
          calculationTraceRow({
            title: `${integrity.checkedPly.label} block shear`,
            reference: "AS 4100 Cl. 9.1.9(e)",
            formula: `&phi;R<sub>bs</sub> = 0.75min(0.6f<sub>uc</sub>A<sub>nv</sub> + k<sub>bs</sub>f<sub>uc</sub>A<sub>nt</sub>, 0.6f<sub>yc</sub>A<sub>gv</sub> + k<sub>bs</sub>f<sub>uc</sub>A<sub>nt</sub>)`,
            substitution: `0.75min(${fixed(integrity.block.ruptureLimit)}, ${fixed(integrity.block.yieldLimit)}) kN`,
            result: `Design capacity = ${fixed(integrity.block.design)} kN`,
            applicability: "Manual critical block-shear areas; all plausible paths remain a project review."
          })
        ].join("");
  const boltTraceRows = [
    calculationTraceRow({
      title: "Bolt tension capacity",
      reference: "AS 4100 Cl. 9.2.2.2",
      formula: `&phi;N<sub>tf</sub> = &phi;A<sub>s</sub>f<sub>uf</sub>`,
      substitution: `0.80 &times; ${bolt.As} mm<sup>2</sup> &times; ${fuf} MPa / 1000`,
      result: `Design capacity per bolt = ${fixed(tension)} kN`,
      applicability: `${size}; tensile stress area A<sub>s</sub>. ${strengthSourceNote}`
    }),
    calculationTraceRow({
      title: "Minimum installed bolt tension",
      reference: "AS 4100 Table 15.2.2.2",
      lookup: "Minimum installed bolt tension by bolt size and property class.",
      selection: `${size}; property class ${category.grade}; category ${categoryKey}`,
      adopted: hasInstalledTension ? `N<sub>ti</sub> = ${displayFixed(preload, 0)} kN` : "Not required",
      applicability: hasInstalledTension ? "Installed preload; this is not the bolt tensile design capacity." : "Snug-tight category; no specified minimum installed bolt tension."
    }),
    calculationTraceRow({
      title: "Bolt shear capacity, N-plane",
      reference: "AS 4100 Cl. 9.2.2.1",
      formula: krValid ? `&phi;V<sub>f,N</sub> = &phi;0.62f<sub>uf</sub>k<sub>rd,N</sub>k<sub>r</sub>A<sub>c</sub>` : "",
      substitution: krValid ? `0.80 &times; 0.62 &times; ${fuf} MPa &times; ${displayFixed(threadKrd, 2)} &times; ${displayFixed(kr, 2)} &times; ${bolt.Ac} mm<sup>2</sup> / 1000` : "",
      result: krValid ? `Design capacity per shear plane = ${fixed(threadShear)} kN` : "Not evaluated",
      applicability: krValid ? "Threads intercept the shear plane." : "Enter k_r from 0.75 to 1.00.",
      state: krValid ? "" : "warning"
    }),
    calculationTraceRow({
      title: "Bolt shear capacity, X-plane",
      reference: "AS 4100 Cl. 9.2.2.1",
      formula: krValid ? `&phi;V<sub>f,X</sub> = &phi;0.62f<sub>uf</sub>k<sub>rd,X</sub>k<sub>r</sub>A<sub>o</sub>` : "",
      substitution: krValid ? `0.80 &times; 0.62 &times; ${fuf} MPa &times; ${displayFixed(shankKrd, 2)} &times; ${displayFixed(kr, 2)} &times; ${bolt.Ao} mm<sup>2</sup> / 1000` : "",
      result: krValid ? `Design capacity per shear plane = ${fixed(shankShear)} kN` : "Not evaluated",
      applicability: krValid ? "Threads do not intercept the shear plane; k<sub>rd,X</sub> = 1.00." : "Enter k_r from 0.75 to 1.00.",
      state: krValid ? "" : "warning"
    }),
    calculationTraceRow({
      title: "Bolt group shear capacity",
      reference: "AS 4100 Cl. 9.2.2.1",
      formula: groupShearInputsValid ? `&phi;V<sub>f</sub> = &phi;0.62f<sub>uf</sub>k<sub>rd</sub>k<sub>r</sub>(n<sub>N</sub>A<sub>c</sub> + n<sub>X</sub>A<sub>o</sub>)` : "",
      substitution: groupShearInputsValid ? `n<sub>N</sub> = ${count} &times; ${nThread} = ${totalThreadPlanes}; n<sub>X</sub> = ${count} &times; ${nShank} = ${totalShankPlanes}; k<sub>rd</sub> = ${displayFixed(groupKrd, 2)}; k<sub>r</sub> = ${displayFixed(kr, 2)}` : "",
      result: groupShearInputsValid ? `Design group capacity = ${fixed(groupShear)} kN` : "Not evaluated",
      applicability: groupShearInputsValid
        ? "Identical bolts with equal shear per bolt assumed; apply the bolted-lap reduction only where its stated conditions apply."
        : !countValid ? "Enter a whole-number bolt count from 1 to 100." : !krValid ? "Enter k_r from 0.75 to 1.00." : "Enter whole-number N/X shear-plane counts with at least one shear plane.",
      state: groupShearInputsValid ? "" : "warning"
    }),
    calculationTraceRow({
      title: "Minimum pitch",
      reference: "AS 4100 Cl. 9.5.1",
      formula: pitchApplicable ? `p<sub>min</sub> = 2.5d<sub>f</sub>` : "",
      substitution: pitchApplicable ? `2.5 &times; ${fixed(bolt.d)} mm = ${fixed(minimumPitch)} mm; provided p = ${fixed(boltPitch)} mm` : "",
      result: pitchApplicable ? `${pitchPass ? "PASS" : "FAIL"}; required ${fixed(minimumPitch)} mm` : "Not applicable",
      applicability: pitchApplicable ? "Applies where more than one bolt is present along the checked line." : "One-bolt connection."
    }),
    calculationTraceRow({
      title: "Maximum pitch",
      reference: "AS 4100 Cl. 9.5.3",
      formula: pitchApplicable && connectedPlyInputsValid ? `p<sub>max</sub> = min(15t<sub>p,min</sub>, 200 mm)` : "",
      substitution: pitchApplicable && connectedPlyInputsValid ? `min(15 &times; ${fixed(thinnerPlyThickness)} mm, 200 mm) = ${fixed(maximumPitch)} mm; provided p = ${fixed(boltPitch)} mm` : "",
      result: !connectedPlyInputsValid ? "Input required" : pitchApplicable ? `${maximumPitchPass ? "PASS" : "FAIL"}; permitted ${fixed(maximumPitch)} mm` : "Not applicable",
      applicability: !connectedPlyInputsValid ? "Enter valid connected-ply thickness." : pitchApplicable ? "General limit only; AS 4100 Cl. 9.5.3(a) and AS 4100 Cl. 9.5.3(b) are not applied." : "One-bolt connection."
    }),
    activePlyFormulaRows,
    integrityFormulaRows,
    calculationTraceRow({
      title: "Detailing compliance",
      result: !countValid ? "Invalid input" : detailingCompliant ? "Compliant for the displayed lightweight checks" : "NON-COMPLIANT",
      applicability: !countValid
        ? "Enter a whole-number bolt count from 1 to 100."
        : detailingCompliant
          ? "All applicable displayed detailing checks pass."
          : detailingFailureNote,
      state: countValid && detailingCompliant ? "" : "warning"
    }),
    calculationTraceRow({
      title: "TF slip resistance",
      reference: "AS 4100 Cl. 9.2.3.1",
      formula: slip === null ? "" : `&phi;V<sub>sf</sub> = 0.70&mu;n<sub>ei</sub>N<sub>ti</sub>k<sub>h</sub>`,
      substitution: slip === null ? "" : `0.70 &times; ${slipFactor} &times; ${slipInterfaces} &times; ${preload} kN &times; ${holeFactor}`,
      result: category.type !== "friction" ? "Not applicable" : !slipInputsValid ? "Input required" : `Design slip resistance per bolt = ${fixed(slip)} kN`,
      applicability: category.type !== "friction" ? "TF categories only." : !slipInputsValid ? "Enter a positive slip factor and a whole-number interface count from 1 to 10." : "Use mu = 0.35 only for clean as-rolled contact surfaces; other surfaces require test evidence.",
      state: category.type === "friction" && !slipInputsValid ? "warning" : ""
    }),
    calculationTraceRow({
      title: "TF combined slip",
      reference: "AS 4100 Cl. 9.2.3.3",
      formula: slip === null ? "" : `V<sub>sf</sub><sup>*</sup>/&phi;V<sub>sf</sub> + N<sub>tf</sub><sup>*</sup>/&phi;N<sub>tf</sub> &le; 1.0`,
      substitution: slip === null ? "" : `${fixed(slipShearDemand)}/${fixed(slipGroupCapacity)} + ${fixed(slipTensionDemand)}/${fixed(slipTensionCapacity)}`,
      result: category.type !== "friction" ? "Not applicable" : !slipInputsValid ? "Input required" : `Interaction = ${Number.isFinite(slipRatio) ? displayFixed(slipRatio, 2) : "-"}`,
      applicability: category.type !== "friction" ? "Friction-type categories where serviceability slip is limited." : !slipInputsValid ? "Complete the TF slip inputs before evaluating interaction." : "Entered actions are total bolt-group serviceability actions with equal action per identical bolt; N<sub>tf</sub> = N<sub>ti</sub> and &phi; = 0.70.",
      state: category.type === "friction" && !slipInputsValid ? "warning" : ""
    }),
    calculationTraceRow({
      title: "Capacity-only boundary",
      result: "Project strength actions and utilisation are not evaluated",
      applicability: `Bolt, connected-ply bearing and optional integrity results are design capacities only. Simultaneous strength shear and tension requires the squared interaction in AS 4100 Cl. 9.2.2.3.${category.type === "friction" ? " Complete the separate TF serviceability slip check shown above." : ""}`
    })
  ];
  $("formulaSteps").innerHTML = boltTraceRows.join("");
}

function uniqueSorted(list, key) {
  return [...new Set(list.map(item => item[key]))].sort((a, b) => String(a).localeCompare(String(b)));
}

function sortMetricSizes(values) {
  return [...values].sort((a, b) => {
    const aNumber = Number(String(a).match(/\d+(?:\.\d+)?/)?.[0]);
    const bNumber = Number(String(b).match(/\d+(?:\.\d+)?/)?.[0]);
    if (Number.isFinite(aNumber) && Number.isFinite(bNumber)) return aNumber - bNumber;
    if (Number.isFinite(aNumber)) return -1;
    if (Number.isFinite(bNumber)) return 1;
    return String(a).localeCompare(String(b));
  });
}

function setUBoltOptions(selectId, values, options = {}) {
  const select = $(selectId);
  const previous = select.value;
  const hadOptions = select.options.length > 0;
  const emptyLabel = options.placeholder || options.allLabel;
  const entries = emptyLabel
    ? [{ value: "", label: emptyLabel }, ...values.map(value => ({ value, label: value }))]
    : values.map(value => ({ value, label: value }));
  select.innerHTML = entries.map(entry => `<option value="${safeText(entry.value)}">${safeText(entry.label)}</option>`).join("");
  if (hadOptions && entries.some(entry => entry.value === previous)) select.value = previous;
  else if (options.preferred && entries.some(entry => entry.value === options.preferred)) select.value = options.preferred;
  else if (entries.length) select.value = entries[0].value;
}

function uBoltFitClass(product) {
  if (product.application === "Custom / project-manufactured") return "Custom / drawing-defined";
  if (/square|rectangular/i.test(`${product.fitKey} ${product.fit}`)) return "Square / rectangular";
  if (product.application === "Beam / channel clamp assembly" || /beam|channel/i.test(`${product.fitKey} ${product.fit}`)) {
    return "Beam / channel assembly";
  }
  return "Round / pipe";
}

function filteredUBoltProducts(includeManufacturer = true) {
  const rodSize = $("uBoltRodSize")?.value;
  const geometry = $("uBoltMemberGeometry")?.value;
  const finish = $("uBoltFinish")?.value;
  const manufacturer = $("uBoltManufacturer")?.value;
  return uBoltProducts.filter(product =>
    (!rodSize || product.thread === rodSize || product.thread === "Project-specific") &&
    (!geometry || uBoltFitClass(product) === geometry) &&
    (!finish || product.finish === finish) &&
    (!includeManufacturer || !manufacturer || product.manufacturer === manufacturer)
  );
}

function selectedUBoltProduct() {
  const selectedId = $("uBoltProduct")?.value;
  const products = filteredUBoltProducts();
  return products.find(product => product.id === selectedId) || null;
}

function populateUBoltFilters(initial = false) {
  setUBoltOptions("uBoltRodSize", sortMetricSizes(uniqueSorted(uBoltProducts, "thread")), {
    allLabel: "Any thread designation",
    preferred: initial ? "M12" : ""
  });
  const rodSize = $("uBoltRodSize").value;
  const rodProducts = uBoltProducts.filter(product => !rodSize || product.thread === rodSize || product.thread === "Project-specific");
  setUBoltOptions("uBoltMemberGeometry", uniqueSorted(rodProducts.map(product => ({ fitClass: uBoltFitClass(product) })), "fitClass"), {
    allLabel: "Any member geometry"
  });
  const geometry = $("uBoltMemberGeometry").value;
  const geometryProducts = rodProducts.filter(product => !geometry || uBoltFitClass(product) === geometry);
  setUBoltOptions("uBoltFinish", uniqueSorted(geometryProducts, "finish"), { allLabel: "Any finish" });
  const manufacturerProducts = filteredUBoltProducts(false);
  setUBoltOptions("uBoltManufacturer", uniqueSorted(manufacturerProducts, "manufacturer"), {
    allLabel: "All brands / manufacturers"
  });
  populateUBoltProducts();
}

function populateUBoltProducts() {
  const products = filteredUBoltProducts();
  const select = $("uBoltProduct");
  const previous = select.value;
  select.innerHTML = '<option value="">Select catalogue product / family</option>' + products.map(product => {
    const label = product.product.includes(product.thread)
      ? product.product
      : `${product.product} · ${product.thread}`;
    return `<option value="${safeText(product.id)}">${safeText(label)}</option>`;
  }).join("");
  select.disabled = !products.length;
  if (products.some(product => product.id === previous)) select.value = previous;
  else select.value = "";
  $("uBoltProductSelectionNote").textContent = products.length
    ? `${products.length} catalogue ${products.length === 1 ? "entry" : "entries"} available; select one to review.`
    : "No catalogue entry for the current filters.";
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

function productDiagramDefs(markerId) {
  return `<defs><marker id="${markerId}" viewBox="0 0 8 8" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M 0 0 L 8 4 L 0 8 z" fill="#59655f"></path></marker></defs>`;
}

function productDimensionLine(x1, y1, x2, y2, markerId, className = "") {
  return `<line class="product-dimension ${className}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-start="url(#${markerId})" marker-end="url(#${markerId})"></line>`;
}

function productThreadLines(x, y1, y2) {
  const lines = [];
  for (let y = y1 + 4; y < y2; y += 5) {
    lines.push(`<line class="product-thread" x1="${x - 6}" y1="${y}" x2="${x + 6}" y2="${y - 2}"></line>`);
  }
  return lines.join("");
}

function productHorizontalThreadLines(x1, x2, y) {
  const lines = [];
  for (let x = x1 + 4; x < x2; x += 5) {
    lines.push(`<line class="product-thread" x1="${x}" y1="${y - 6}" x2="${x - 2}" y2="${y + 6}"></line>`);
  }
  return lines.join("");
}

function productHexNut(cx, cy, width = 20, height = 10, id = "") {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const shoulder = Math.min(4, width * 0.2);
  const idAttribute = id ? ` id="${id}"` : "";
  return `<polygon${idAttribute} class="product-object-thin product-nut" data-layer-role="fastener" points="${cx - halfWidth + shoulder},${cy - halfHeight} ${cx + halfWidth - shoulder},${cy - halfHeight} ${cx + halfWidth},${cy} ${cx + halfWidth - shoulder},${cy + halfHeight} ${cx - halfWidth + shoulder},${cy + halfHeight} ${cx - halfWidth},${cy}"></polygon>`;
}

function renderUBoltProductFigure(product) {
  const figure = $("uBoltProductFigure");
  const svg = $("uBoltProductDiagram");
  if (!figure || !svg || !product) {
    if (figure) figure.hidden = true;
    if (svg) svg.replaceChildren();
    return;
  }

  const drawing = product.drawing || null;
  const verifiedRodDiameter = Number(drawing?.rodDiameter);
  const displayRodDiameter = Number.isFinite(verifiedRodDiameter) && verifiedRodDiameter > 0
    ? verifiedRodDiameter
    : Number(String(product.thread).replace(/\D/g, "")) || 12;
  const insideWidth = Number(drawing?.insideWidth || drawing?.fitDiameter);
  const overallLength = Number(drawing?.overallLength);
  const threadLength = Number(drawing?.threadLength);
  const valueDriven = drawing && [insideWidth, overallLength, threadLength].every(value => Number.isFinite(value) && value > 0);
  const markerId = "uBoltDimensionArrow";

  svg.dataset.productVariantId = product.id;
  svg.dataset.sourceStatus = product.sourceStatus || "Source_Not_Verified";

  if (!valueDriven || !["ezystrut", "hobson"].includes(drawing.convention)) {
    figure.hidden = true;
    svg.replaceChildren();
    return;
  }

  if (drawing.convention === "ezystrut") {
    if (!(Number.isFinite(verifiedRodDiameter) && verifiedRodDiameter > 0)) {
      figure.hidden = true;
      svg.replaceChildren();
      return;
    }
    const scale = Math.min(96 / (insideWidth + 2 * verifiedRodDiameter), 126 / overallLength);
    const rodWidth = Math.max(5, Math.min(10, verifiedRodDiameter * scale));
    const centreX = 168;
    const outerTop = 22;
    const outerBottom = outerTop + overallLength * scale;
    const yTop = outerTop + rodWidth / 2;
    const yBottom = outerBottom - rodWidth / 2;
    const centreSpan = (insideWidth + verifiedRodDiameter) * scale;
    const xLeft = centreX - centreSpan / 2;
    const xRight = centreX + centreSpan / 2;
    const bendRadius = centreSpan / 2;
    const yBend = yBottom - bendRadius;
    const threadEnd = Math.min(outerTop + threadLength * scale, yBend - 9);
    const nutY = outerTop + Math.min(22, threadLength * scale * 0.45);
    const referenceRadius = insideWidth * scale / 2;
    const diagonal = referenceRadius * 0.7;
    const dLabel = `ØD ${formatDimension(insideWidth, 0)} mm`;
    const dLabelWidth = Math.max(48, dLabel.length * 6.2);
    const objectPath = `M ${xLeft} ${yTop} L ${xLeft} ${yBend} A ${bendRadius} ${bendRadius} 0 0 0 ${xRight} ${yBend} L ${xRight} ${yTop}`;

    svg.innerHTML = `
      <title id="uBoltProductDiagramTitle">${safeText(product.product)} EzyStrut catalogue drawing</title>
      <desc id="uBoltProductDiagramDescription">Source-based redraw of the EzyStrut front elevation with A overall length, B thread length, C rod diameter and D supported-member diameter.</desc>
      ${productDiagramDefs(markerId)}
      <g id="ubolt-reference-geometry" data-layer-role="reference">
        <line id="ubolt-vertical-centreline" class="product-centre" x1="${centreX}" y1="${outerTop - 8}" x2="${centreX}" y2="${outerBottom + 7}"></line>
        <circle id="ubolt-reference-pipe-envelope" class="product-reference-envelope" cx="${centreX}" cy="${yBend}" r="${referenceRadius}"></circle>
      </g>
      <g id="ubolt-product" data-layer-role="product">
        <path id="ubolt-bent-rod" class="product-object" style="stroke-width:${rodWidth}" d="${objectPath}"></path>
        <path class="product-object-highlight" style="stroke-width:${Math.max(1.2, rodWidth * 0.24)}" d="${objectPath}"></path>
        <g id="ubolt-left-threaded-zone" data-layer-role="thread">${productThreadLines(xLeft, outerTop, threadEnd)}</g>
        <g id="ubolt-right-threaded-zone" data-layer-role="thread">${productThreadLines(xRight, outerTop, threadEnd)}</g>
        ${productHexNut(xLeft, nutY, 20, 10, "ubolt-left-nut")}
        ${productHexNut(xRight, nutY, 20, 10, "ubolt-right-nut")}
      </g>
      <g id="ubolt-catalogue-dimensions" data-layer-role="dimensions">
        <line class="product-extension" x1="${xLeft}" y1="${outerTop}" x2="42" y2="${outerTop}"></line>
        <line class="product-extension" x1="${centreX}" y1="${outerBottom}" x2="42" y2="${outerBottom}"></line>
        ${productDimensionLine(42, outerTop, 42, outerBottom, markerId)}
        <text class="product-label" x="31" y="${(outerTop + outerBottom) / 2}" text-anchor="middle" transform="rotate(-90 31 ${(outerTop + outerBottom) / 2})">A ${formatDimension(overallLength, 0)} mm</text>

        <line class="product-extension" x1="${xLeft}" y1="${outerTop}" x2="72" y2="${outerTop}"></line>
        <line class="product-extension" x1="${xLeft}" y1="${threadEnd}" x2="72" y2="${threadEnd}"></line>
        ${productDimensionLine(72, outerTop, 72, threadEnd, markerId)}
        <text class="product-label-secondary" x="62" y="${(outerTop + threadEnd) / 2}" text-anchor="middle" transform="rotate(-90 62 ${(outerTop + threadEnd) / 2})">B ${formatDimension(threadLength, 0)} mm</text>

        <line class="product-extension" x1="${xLeft - rodWidth / 2}" y1="${yTop}" x2="${xLeft - rodWidth / 2}" y2="12"></line>
        <line class="product-extension" x1="${xLeft + rodWidth / 2}" y1="${yTop}" x2="${xLeft + rodWidth / 2}" y2="12"></line>
        ${productDimensionLine(xLeft - rodWidth / 2, 12, xLeft + rodWidth / 2, 12, markerId)}
        <text class="product-label-secondary" x="${xLeft + 14}" y="16">ØC ${formatDimension(verifiedRodDiameter, 0)} mm</text>

        ${productDimensionLine(centreX - diagonal, yBend + diagonal, centreX + diagonal, yBend - diagonal, markerId)}
        <rect class="product-label-plate" x="${centreX - dLabelWidth / 2}" y="${yBend - 9}" width="${dLabelWidth}" height="16" rx="2"></rect>
        <text class="product-label-secondary" x="${centreX}" y="${yBend + 3}" text-anchor="middle">${dLabel}</text>
      </g>`;

    figure.hidden = false;
    $("uBoltProductFigureCaption").textContent = "A depth · B thread · ØC rod · ØD fit · 2 x hex nuts included.";
    return;
  }

  const scale = Math.min(154 / overallLength, 74 / (insideWidth + 2 * displayRodDiameter));
  const rodWidth = Math.max(5, Math.min(10, displayRodDiameter * scale));
  const outerLeft = 70;
  const outerRight = outerLeft + overallLength * scale;
  const centreY = 101;
  const outerHeight = (insideWidth + 2 * displayRodDiameter) * scale;
  const yTop = centreY - (insideWidth + displayRodDiameter) * scale / 2;
  const yBottom = centreY + (insideWidth + displayRodDiameter) * scale / 2;
  const bendRadius = (insideWidth + displayRodDiameter) * scale / 2;
  const xOpen = outerLeft + rodWidth / 2;
  const xBend = outerRight - rodWidth / 2 - bendRadius;
  const threadEnd = Math.min(outerLeft + threadLength * scale, xBend - 10);
  const nutX = outerLeft + Math.min(22, threadLength * scale * 0.45);
  const objectPath = `M ${xOpen} ${yTop} L ${xBend} ${yTop} A ${bendRadius} ${bendRadius} 0 0 1 ${xBend} ${yBottom} L ${xOpen} ${yBottom}`;

  svg.innerHTML = `
    <title id="uBoltProductDiagramTitle">${safeText(product.product)} Hobson catalogue drawing</title>
    <desc id="uBoltProductDiagramDescription">Source-based redraw of the Hobson side-view convention with the metric thread designation, W inside clear width, L overall length and T thread length.</desc>
    ${productDiagramDefs(markerId)}
    <line class="product-centre" x1="${outerLeft - 8}" y1="${centreY}" x2="${outerRight + 8}" y2="${centreY}"></line>
    <g id="ubolt-product" data-layer-role="product">
      <path id="ubolt-bent-rod" class="product-object" style="stroke-width:${rodWidth}" d="${objectPath}"></path>
      <path class="product-object-highlight" style="stroke-width:${Math.max(1.2, rodWidth * 0.24)}" d="${objectPath}"></path>
      <g id="ubolt-left-threaded-zone" data-layer-role="thread">${productHorizontalThreadLines(outerLeft, threadEnd, yTop)}</g>
      <g id="ubolt-right-threaded-zone" data-layer-role="thread">${productHorizontalThreadLines(outerLeft, threadEnd, yBottom)}</g>
      ${productHexNut(nutX, yTop, 10, 16, "ubolt-left-nut")}
      ${productHexNut(nutX, yBottom, 10, 16, "ubolt-right-nut")}
    </g>
    <g id="ubolt-catalogue-dimensions" data-layer-role="dimensions">
      <line class="product-extension" x1="${outerLeft}" y1="${yTop}" x2="${outerLeft}" y2="20"></line>
      <line class="product-extension" x1="${outerRight}" y1="${centreY}" x2="${outerRight}" y2="20"></line>
      ${productDimensionLine(outerLeft, 20, outerRight, 20, markerId)}
      <text class="product-label" x="${(outerLeft + outerRight) / 2}" y="15" text-anchor="middle">L ${formatDimension(overallLength, 0)} mm</text>

      <line class="product-extension" x1="${outerLeft}" y1="${yBottom}" x2="${outerLeft}" y2="167"></line>
      <line class="product-extension" x1="${threadEnd}" y1="${yBottom}" x2="${threadEnd}" y2="167"></line>
      ${productDimensionLine(outerLeft, 167, threadEnd, 167, markerId)}
      <rect class="product-label-plate" x="${(outerLeft + threadEnd) / 2 - 25}" y="171" width="50" height="15" rx="2"></rect>
      <text class="product-label-secondary" x="${(outerLeft + threadEnd) / 2}" y="183" text-anchor="middle">T ${formatDimension(threadLength, 0)} mm</text>

      ${productDimensionLine(xBend - 12, yTop + rodWidth / 2, xBend - 12, yBottom - rodWidth / 2, markerId)}
      <rect class="product-label-plate" x="${xBend - 5}" y="${centreY - 8}" width="52" height="16" rx="2"></rect>
      <text class="product-label-secondary" x="${xBend - 2}" y="${centreY + 4}">W ${formatDimension(insideWidth, 0)} mm</text>

      <path class="product-leader" d="M 58 145 L 64 145 L ${xOpen} ${yBottom + rodWidth / 2}" marker-end="url(#${markerId})"></path>
      <text class="product-label-secondary" x="54" y="149" text-anchor="end">${safeText(product.thread)}</text>
    </g>`;

  figure.hidden = false;
  $("uBoltProductFigureCaption").textContent = "M thread · W clear width · L length · T thread.";
}

function uBoltGeometrySummary(product) {
  const drawing = product?.drawing;
  if (!drawing) return product.fit || product.fitKey || "Not stated";
  const overallLength = Number(drawing.overallLength);
  const threadLength = Number(drawing.threadLength);
  const sourceGeometry = product.fit || product.fitKey || "Not stated";
  if (![overallLength, threadLength].every(value => Number.isFinite(value) && value > 0)) return sourceGeometry;
  if (drawing.convention === "ezystrut") {
    return `Round member · fit diameter ${formatDimension(Number(drawing.fitDiameter), 0)} mm · overall depth ${formatDimension(overallLength, 0)} mm · thread length ${formatDimension(threadLength, 0)} mm`;
  }
  if (drawing.convention === "hobson") {
    return `Round member · inside clear width ${formatDimension(Number(drawing.insideWidth), 0)} mm · overall length ${formatDimension(overallLength, 0)} mm · thread length ${formatDimension(threadLength, 0)} mm`;
  }
  return `${sourceGeometry} · thread length ${formatDimension(threadLength, 0)} mm`;
}

function renderBlindBoltProductFigure(product) {
  const figure = $("blindBoltProductFigure");
  const svg = $("blindBoltProductDiagram");
  if (!figure || !svg || !product) {
    if (figure) figure.hidden = true;
    if (svg) svg.replaceChildren();
    return;
  }

  const markerId = "blindBoltDimensionArrow";
  const drawing = product.drawing || {};
  const kind = drawing.kind;
  const lengthB = Number(product.drawing?.lengthB);
  const length = Number(drawing.length);
  const gripDimension = value => formatDimension(value, Number.isInteger(Number(value)) ? 0 : 1);
  const gripRangeText = `${gripDimension(product.gripMin)}-${gripDimension(product.gripMax)} mm`;
  const lengthText = Number.isFinite(length) && length > 0 ? `L ${formatDimension(length, 0)} mm` : "";

  svg.dataset.productVariantId = product.id;
  svg.dataset.sourceStatus = product.sourceStatus || "Source_Not_Verified";
  const showFigure = (content, caption) => {
    svg.innerHTML = content;
    figure.hidden = false;
    $("blindBoltProductFigureCaption").textContent = caption;
  };

  if (product.manufacturer === "Lindapter" && Number.isFinite(lengthB) && lengthB > 0) {
    showFigure(`
      <title id="blindBoltProductDiagramTitle">${safeText(product.family)} catalogue product geometry</title>
      <desc id="blindBoltProductDiagramDescription">Source-based redraw of the uninstalled Lindapter Hollo-Bolt catalogue product view with assembled product length B max.</desc>
      ${productDiagramDefs(markerId)}
      <g id="blindbolt-lindapter-catalogue-view" data-layer-role="product">
        <line class="product-centre" x1="155" y1="12" x2="155" y2="178"></line>
        <polygon class="product-object-thin" points="130,31 138,22 172,22 180,31 180,46 130,46"></polygon>
        <rect class="product-object-thin" x="118" y="46" width="74" height="18" rx="2"></rect>
        <rect class="product-object-thin" x="132" y="64" width="46" height="69" rx="2"></rect>
        <line class="product-object-thin" x1="155" y1="84" x2="155" y2="130"></line>
        <path class="product-hidden" d="M 140 68 V 128 M 170 68 V 128"></path>
        <polygon class="product-object-thin" points="132,133 178,133 171,147 139,147"></polygon>
        <rect class="product-object-thin" x="141" y="147" width="28" height="10"></rect>
        <polygon class="product-object-thin" points="145,157 165,157 162,166 148,166"></polygon>
      </g>
      <g id="blindbolt-lindapter-catalogue-dimensions" data-layer-role="dimensions">
        <line class="product-extension" x1="118" y1="22" x2="91" y2="22"></line>
        <line class="product-extension" x1="145" y1="166" x2="91" y2="166"></line>
        ${productDimensionLine(91, 22, 91, 166, markerId)}
        <text class="product-label" x="80" y="94" text-anchor="middle" transform="rotate(-90 80 94)">B max ${formatDimension(lengthB, 0)} mm</text>
      </g>`,
    "Lindapter Hollo-Bolt · B max length.");
    return;
  }

  if (kind === "hbs-expansion" && Number.isFinite(length)) {
    showFigure(`
      <title id="blindBoltProductDiagramTitle">${safeText(product.family)} catalogue geometry</title>
      <desc id="blindBoltProductDiagramDescription">Source-based redraw of the Hobson HBS-Bolt catalogue side view with fixed overall bolt length L. Grip range G is reported in the caption rather than drawn as a fixed product dimension.</desc>
      ${productDiagramDefs(markerId)}
      <g id="blindbolt-hobson-side-view" data-layer-role="product">
        <line class="product-centre" x1="34" y1="96" x2="272" y2="96"></line>
        <polygon class="product-object-thin" points="38,82 46,74 62,74 70,82 70,110 62,118 46,118 38,110"></polygon>
        <rect class="product-object-thin" x="70" y="81" width="17" height="30"></rect>
        <rect class="product-object-thin" x="87" y="84" width="142" height="24" rx="2"></rect>
        <line class="product-object" style="stroke-width:3" x1="54" y1="96" x2="253" y2="96"></line>
        <path class="product-object-thin" d="M 229 84 L 252 84 L 263 96 L 252 108 L 229 108 Z"></path>
        <path class="product-thread" d="M 232 87 l 16 18 M 238 85 l 17 19 M 245 86 l 14 16"></path>
      </g>
      <g id="blindbolt-hobson-dimensions" data-layer-role="dimensions">
        <line class="product-extension" x1="38" y1="74" x2="38" y2="25"></line>
        <line class="product-extension" x1="263" y1="84" x2="263" y2="25"></line>
        ${productDimensionLine(38, 25, 263, 25, markerId)}
        <text class="product-label" x="150" y="18" text-anchor="middle">${lengthText}</text>
      </g>`,
    `Hobson HBS-Bolt · L ${formatDimension(length, 0)} mm · G ${gripRangeText}.`);
    return;
  }

  if (kind === "uni-expansion" && Number.isFinite(length)) {
    showFigure(`
      <title id="blindBoltProductDiagramTitle">${safeText(product.family)} catalogue product geometry</title>
      <desc id="blindBoltProductDiagramDescription">Source-based redraw of the uninstalled ICCONS UNI-BOLT catalogue product view with bolt, sleeve collar, sleeve and cone.</desc>
      ${productDiagramDefs(markerId)}
      <g id="blindbolt-iccons-catalogue-view" data-layer-role="product">
        <line class="product-centre" x1="27" y1="98" x2="279" y2="98"></line>
        <polygon class="product-object-thin" points="33,83 42,74 61,74 70,83 70,113 61,122 42,122 33,113"></polygon>
        <rect class="product-object-thin" x="70" y="80" width="20" height="36"></rect>
        <rect class="product-object-thin" x="90" y="82" width="145" height="32" rx="3"></rect>
        <line class="product-object" style="stroke-width:3" x1="51" y1="98" x2="258" y2="98"></line>
      <path class="product-hidden" d="M 103 88 H 223 M 103 108 H 223"></path>
      <path class="product-object-thin" d="M 235 82 L 254 82 L 267 98 L 254 114 L 235 114 Z"></path>
      <path class="product-thread" d="M 238 84 l 17 26 M 245 83 l 16 24 M 252 86 l 11 17"></path>
      <g id="blindbolt-iccons-component-labels" data-layer-role="labels">
        <path class="product-leader" d="M 80 80 L 91 56"></path>
        <text class="product-label-secondary" x="64" y="48">Sleeve collar</text>
        <path class="product-leader" d="M 160 82 L 176 56"></path>
        <text class="product-label-secondary" x="170" y="48">Sleeve</text>
        <path class="product-leader" d="M 250 82 L 262 56"></path>
        <text class="product-label-secondary" x="274" y="48" text-anchor="end">Cone</text>
        <path class="product-leader" d="M 51 98 L 45 137"></path>
        <text class="product-label-secondary" x="30" y="154">Bolt</text>
      </g>
    </g>`,
    "ICCONS UNI-BOLT · bolt / collar / sleeve / cone.");
    return;
  }

  if (kind === "box-expansion" && Number.isFinite(length)) {
    showFigure(`
      <title id="blindBoltProductDiagramTitle">${safeText(product.family)} pre-installation geometry</title>
      <desc id="blindBoltProductDiagramDescription">Source-based redraw of the BoxBolt pre-installation assembly with bolt length L and clearance-hole diameter d1.</desc>
      ${productDiagramDefs(markerId)}
      <g id="blindbolt-boxbolt-preinstallation-view" data-layer-role="product">
        <line class="product-centre" x1="30" y1="98" x2="276" y2="98"></line>
        <polygon class="product-object-thin" points="36,84 44,76 61,76 69,84 69,112 61,120 44,120 36,112"></polygon>
        <rect class="product-object-thin" x="69" y="81" width="18" height="34"></rect>
        <path class="product-object-thin" d="M 87 84 H 228 L 254 98 L 228 112 H 87 Z"></path>
        <line class="product-object" style="stroke-width:3" x1="52" y1="98" x2="258" y2="98"></line>
        <path class="product-hidden" d="M 91 88 H 221 M 91 108 H 221"></path>
        <path class="product-thread" d="M 210 87 l 17 20 M 218 87 l 17 20 M 226 89 l 13 16"></path>
      </g>
      <g id="blindbolt-boxbolt-dimensions" data-layer-role="dimensions">
        <line class="product-extension" x1="36" y1="76" x2="36" y2="24"></line>
        <line class="product-extension" x1="263" y1="86" x2="263" y2="24"></line>
        ${productDimensionLine(36, 24, 263, 24, markerId)}
        <text class="product-label" x="150" y="17" text-anchor="middle">${lengthText}</text>
        <path class="product-leader" d="M 108 84 L 143 55"></path>
        <text class="product-label-secondary" x="147" y="53">Split sleeve</text>
        <path class="product-leader" d="M 240 89 L 258 59"></path>
        <text class="product-label-secondary" x="270" y="57" text-anchor="end">Cone</text>
      </g>`,
    "Kee Safety BoxBolt · L length.");
    return;
  }

  if (kind === "drive-nut" && Number.isFinite(length)) {
    const anchorClearance = Number(drawing.anchorClearance);
    const depthClearance = Number(drawing.depthClearance);
    showFigure(`
      <title id="blindBoltProductDiagramTitle">${safeText(product.family)} technical-data geometry</title>
      <desc id="blindBoltProductDiagramDescription">Source-based redraw of the Blind Bolt technical-data key. MAX and MIN are fixing thicknesses; AC is anchor clearance; DC is depth clearance; P is the non-load-bearing pivot axis. Dimensions are in millimetres.</desc>
      ${productDiagramDefs(markerId)}
      <g id="blindbolt-drive-nut-side-view" data-layer-role="product">
        <line class="product-centre" x1="34" y1="99" x2="278" y2="99"></line>
        <path class="product-object-thin" d="M 48 84 L 57 77 H 137 V 121 H 57 L 48 114 Z"></path>
        <path class="product-object-thin" d="M 82 77 V 68 H 111 V 77 M 82 121 V 130 H 111 V 121"></path>
        <circle class="product-object-thin" cx="101" cy="99" r="3.5"></circle>
        <rect class="product-object-thin" x="137" y="89" width="88" height="20"></rect>
        <path class="product-thread" d="M 139 90 l 16 18 M 148 90 l 16 18 M 157 90 l 16 18 M 166 90 l 16 18 M 175 90 l 16 18 M 184 90 l 16 18 M 193 90 l 16 18 M 202 90 l 16 18"></path>
        <rect class="product-object-thin" x="225" y="79" width="10" height="40"></rect>
        <polygon class="product-object-thin" points="235,84 243,77 260,77 268,84 268,114 260,121 243,121 235,114"></polygon>
      </g>
      <g id="blindbolt-drive-nut-labels" data-layer-role="labels">
        <path class="product-leader" d="M 101 99 L 145 140"></path>
        <text class="product-label-secondary" x="151" y="149">P</text>
      </g>
      <g id="blindbolt-drive-nut-dimensions" data-layer-role="dimensions">
        <line class="product-extension" x1="111" y1="68" x2="111" y2="20"></line>
        <line class="product-extension" x1="225" y1="79" x2="225" y2="20"></line>
        ${productDimensionLine(111, 20, 225, 20, markerId)}
        <text class="product-label-secondary" x="168" y="15" text-anchor="middle">MAX ${gripDimension(product.gripMax)}</text>

        <line class="product-extension" x1="111" y1="68" x2="111" y2="50"></line>
        <line class="product-extension" x1="137" y1="77" x2="137" y2="50"></line>
        ${productDimensionLine(111, 50, 137, 50, markerId)}
        <text class="product-label-secondary" x="170" y="44" text-anchor="middle">MIN ${gripDimension(product.gripMin)}</text>

        <line class="product-extension" x1="48" y1="121" x2="48" y2="176"></line>
        <line class="product-extension" x1="137" y1="121" x2="137" y2="176"></line>
        ${productDimensionLine(48, 176, 137, 176, markerId)}
        <text class="product-label-secondary" x="92" y="169" text-anchor="middle">DC ${formatDimension(depthClearance, 0)}</text>

        <line class="product-extension" x1="48" y1="68" x2="24" y2="68"></line>
        <line class="product-extension" x1="48" y1="130" x2="24" y2="130"></line>
        ${productDimensionLine(24, 68, 24, 130, markerId)}
        <text class="product-label-secondary" x="14" y="99" text-anchor="middle" transform="rotate(-90 14 99)">AC ${formatDimension(anchorClearance, 0)}</text>
      </g>`,
    "MAX/MIN grip · AC anchor · DC depth · P pivot.");
    return;
  }

  if (kind === "tension-control" && Number.isFinite(length)) {
    showFigure(`
      <title id="blindBoltProductDiagramTitle">${safeText(product.family)} component geometry</title>
      <desc id="blindBoltProductDiagramDescription">Source-based redraw of the NexGen2 catalogue parts view with M20 core bolt, tension-control spline, hex nut, face washer, collapsible washer and spring sleeve.</desc>
      ${productDiagramDefs(markerId)}
      <g id="blindbolt-nexgen2-component-view" data-layer-role="product">
        <line class="product-centre" x1="31" y1="51" x2="271" y2="51"></line>
        <polygon class="product-object-thin" points="31,40 39,32 55,32 63,40 63,62 55,70 39,70 31,62"></polygon>
        <rect class="product-object-thin" x="63" y="42" width="170" height="18" rx="2"></rect>
        <path class="product-thread" d="M 66 43 l 15 16 M 75 43 l 15 16 M 84 43 l 15 16 M 93 43 l 15 16 M 102 43 l 15 16 M 111 43 l 15 16 M 120 43 l 15 16 M 129 43 l 15 16 M 138 43 l 15 16 M 147 43 l 15 16 M 156 43 l 15 16 M 165 43 l 15 16"></path>
        <rect class="product-object-thin" x="233" y="45" width="34" height="12" rx="2"></rect>
        <path class="product-thread" d="M 237 46 l 10 10 M 244 46 l 10 10 M 251 46 l 10 10"></path>

        <polygon class="product-object-thin" points="34,111 42,103 59,103 67,111 59,119 42,119"></polygon>
        <circle class="product-object-thin" cx="101" cy="111" r="13"></circle>
        <circle class="product-hidden" cx="101" cy="111" r="6"></circle>
        <path class="product-object-thin" d="M 145 100 C 160 96 173 100 178 111 C 173 122 160 126 145 122 L 151 116 L 164 111 L 151 106 Z"></path>
        <rect class="product-object-thin" x="213" y="99" width="17" height="24" rx="2"></rect>
        <path class="product-object-thin" d="M 230 101 C 241 103 246 108 248 111 C 246 114 241 119 230 121"></path>
        <path class="product-object-thin" d="M 248 101 C 259 103 264 108 266 111 C 264 114 259 119 248 121"></path>
      </g>
      <g id="blindbolt-nexgen2-labels" data-layer-role="labels">
        <path class="product-leader" d="M 115 60 L 93 76"></path>
        <text class="product-label-secondary" x="93" y="86" text-anchor="middle">Core bolt</text>
        <path class="product-leader" d="M 250 57 L 270 76"></path>
        <text class="product-label-secondary" x="274" y="86" text-anchor="end">Tension-control spline</text>
        <text class="product-label-secondary" x="50" y="142" text-anchor="middle">Hex nut</text>
        <text class="product-label-secondary" x="101" y="166" text-anchor="middle">Face washer</text>
        <text class="product-label-secondary" x="160" y="142" text-anchor="middle">Collapsible washer</text>
        <text class="product-label-secondary" x="240" y="166" text-anchor="middle">Spring sleeve</text>
      </g>`,
    "Allfasteners NexGen2 · supplied component set.");
    return;
  }

  figure.hidden = true;
  svg.replaceChildren();
}

function calculateUBolt() {
  const product = selectedUBoltProduct();
  if (!product) {
    $("uBoltSelectionPrompt").hidden = true;
    $("uBoltSelectedSummary").hidden = true;
    $("uBoltPublishedSection").hidden = true;
    $("uBoltSelectionPromptTitle").textContent = $("uBoltProduct").disabled ? "No curated catalogue entry" : "Select a catalogue entry";
    $("uBoltSelectionPromptNote").textContent = $("uBoltProduct").disabled
      ? "Revise the browse filters."
      : `${filteredUBoltProducts().length} entries available; published product data appears after selection.`;
    $("uBoltSelectionTypeLabel").textContent = "Product selection";
    $("uBoltSelectionTitle").textContent = $("uBoltProduct").disabled ? "No curated catalogue entry" : "Select catalogue entry";
    $("uBoltSelectionNote").textContent = "Member geometry, finish and manufacturer remain optional browse filters.";
    ["uBoltCode", "uBoltThread", "uBoltPublishedGeometry", "uBoltPublishedMaterial"].forEach(id => {
      $(id).textContent = "-";
    });
    $("uBoltPublishedLoadLabel").textContent = "Manufacturer-published value";
    $("uBoltPublishedCapacity").textContent = "Not selected";
    $("uBoltCapacityBasis").textContent = "Select a catalogue entry to review its published data.";
    $("uBoltPublishedCard").classList.add("is-unpublished");
    $("uBoltSourceStatus").textContent = "Source not selected";
    $("uBoltSourceStatus").classList.remove("is-checked", "is-online");
    $("uBoltSourceStatus").removeAttribute("href");
    $("uBoltSourceLink").textContent = "Manufacturer product listing";
    $("uBoltSourceLink").removeAttribute("href");
    $("uBoltReferenceName").textContent = "Manufacturer product data";
    return;
  }
  $("uBoltSelectionPrompt").hidden = true;
  $("uBoltSelectedSummary").hidden = false;
  $("uBoltPublishedSection").hidden = false;
  const sourceLink = $("uBoltSourceLink");
  const customEntry = product.application === "Custom / project-manufactured";

  $("uBoltProductGroupTitle").textContent = customEntry ? "Manufacturing filters" : "Catalogue filters";
  $("uBoltProductGroupNote").textContent = customEntry
    ? "Proposed manufacturer and finish remain optional."
    : "Brand or manufacturer and finish remain optional.";
  $("uBoltProductSelectionTitle").textContent = customEntry ? "Manufacturing entry" : "Product selection";
  $("uBoltProductFieldLabel").textContent = customEntry ? "Manufacturing entry" : "Catalogue product / family";
  $("uBoltSelectionTypeLabel").textContent = customEntry
    ? "Selected manufacturing entry"
    : "Selected product";
  $("uBoltSelectionTitle").textContent = product.product;
  $("uBoltSelectionNote").textContent = `${product.manufacturer} · ${product.series}`;
  $("uBoltCode").textContent = product.code;
  $("uBoltThread").textContent = product.thread;
  $("uBoltPublishedGeometry").textContent = uBoltGeometrySummary(product);
  $("uBoltPublishedMaterial").textContent = product.material || "Not stated";
  $("uBoltPublishedLoadLabel").textContent = publishedLoadLabel(product);
  $("uBoltPublishedCapacity").textContent = publishedCapacityText(product);
  $("uBoltPublishedCard").classList.toggle("is-unpublished", !product.publishedCapacity || product.publishedCapacity === "Not published");
  const directionNote = product.capacityDirection && product.capacityDirection !== "Not published"
    ? `${product.capacityDirection}. `
    : "";
  $("uBoltCapacityBasis").textContent = `${directionNote}${product.capacityBasis}`;
  const sourceStatus = $("uBoltSourceStatus");
  const sourceChecked = product.sourceStatus === "Source_Checked";
  const sourceOnline = product.sourceStatus === "Source_Online_Checked";
  sourceStatus.textContent = sourceChecked ? "Local reference checked" : sourceOnline ? "Manufacturer source checked online" : "Source not verified";
  sourceStatus.classList.toggle("is-checked", sourceChecked);
  sourceStatus.classList.toggle("is-online", sourceOnline);
  const sourceCheckedDate = productSourceCheckedDate(product);
  sourceStatus.title = `${product.sourceName}${sourceCheckedDate ? `; checked ${sourceCheckedDate}` : ""}`;
  $("uBoltReferenceName").textContent = product.sourceName;
  sourceLink.innerHTML = `Open ${/\.pdf($|\?)/i.test(product.sourceUrl || "") ? "technical data" : "product page"} <span aria-hidden="true">↗</span>`;
  sourceLink.href = product.sourceUrl || "#";
}

function blindBoltRequirementProducts() {
  const size = $("blindBoltSize")?.value;
  const head = $("blindBoltHead")?.value;
  return blindBoltProducts.filter(product =>
    (!size || product.size === size) &&
    (!head || product.head === head)
  );
}

function blindBoltGripCompatible(product) {
  const grip = Number($("blindBoltGrip")?.value);
  return Number.isFinite(grip) && grip > 0 && grip >= product.gripMin && grip <= product.gripMax;
}

function filteredBlindBoltProducts(includeManufacturer = true) {
  const finish = $("blindBoltFinish")?.value;
  const manufacturer = $("blindBoltManufacturer")?.value;
  return blindBoltRequirementProducts().filter(product =>
    (!finish || product.finish === finish) &&
    (!includeManufacturer || !manufacturer || product.manufacturer === manufacturer)
  );
}

function selectedBlindBoltProduct() {
  const products = filteredBlindBoltProducts();
  const selectedId = $("blindBoltProduct")?.value;
  return products.find(product => product.id === selectedId) || null;
}

function populateBlindBoltFilters(initial = false) {
  const sizes = sortMetricSizes(uniqueSorted(blindBoltProducts, "size"));
  setUBoltOptions("blindBoltSize", sizes, { preferred: initial ? "M12" : "" });
  const sizeProducts = blindBoltProducts.filter(product => product.size === $("blindBoltSize").value);
  setUBoltOptions("blindBoltHead", uniqueSorted(sizeProducts, "head"), { allLabel: "Any head type" });
  const requirementProducts = blindBoltRequirementProducts();
  setUBoltOptions("blindBoltFinish", uniqueSorted(requirementProducts, "finish"), { allLabel: "Any finish" });
  const sourceProducts = filteredBlindBoltProducts(false);
  setUBoltOptions("blindBoltManufacturer", uniqueSorted(sourceProducts, "manufacturer"), {
    allLabel: "All manufacturers"
  });
  populateBlindBoltProducts();
}

function populateBlindBoltProducts() {
  const products = filteredBlindBoltProducts();
  const select = $("blindBoltProduct");
  const previous = select.value;
  const grip = Number($("blindBoltGrip").value);
  const hasGrip = Number.isFinite(grip) && grip > 0;
  const compatible = hasGrip ? products.filter(blindBoltGripCompatible) : products;
  const otherRanges = hasGrip ? products.filter(product => !blindBoltGripCompatible(product)) : [];
  const optionLabel = product => {
    const mechanism = product.mechanism ? ` · ${product.mechanism}` : "";
    const sourceConflict = product.gripSourceConflict || product.torqueSourceConflict ? " · source conflict" : "";
    return `${product.family} ${product.size} · ${product.code}${mechanism} · W ${product.gripMin}-${product.gripMax} mm${sourceConflict}${product.legacySource ? " · legacy source" : ""}`;
  };
  const compatibleLabel = hasGrip ? "Compatible grip range" : "Catalogue entries";
  const compatibleOptions = compatible.map(product => `<option value="${safeText(product.id)}">${safeText(optionLabel(product))}</option>`).join("");
  const otherOptions = otherRanges.map(product => `<option value="${safeText(product.id)}">${safeText(optionLabel(product))}</option>`).join("");
  select.innerHTML = '<option value="">Select catalogue entry</option>' +
    (compatibleOptions ? `<optgroup label="${compatibleLabel}">${compatibleOptions}</optgroup>` : "") +
    (otherOptions ? `<optgroup label="Other grip ranges">${otherOptions}</optgroup>` : "");
  select.disabled = !products.length;
  if (products.some(product => product.id === previous)) select.value = previous;
  else select.value = "";
  $("blindBoltProductSelectionNote").textContent = products.length
    ? hasGrip
      ? `${compatible.length} compatible of ${products.length} entries; other grip ranges remain available.`
      : `${products.length} catalogue ${products.length === 1 ? "entry" : "entries"} available.`
    : "No catalogue entry for the current filters.";
}

function setBlindBoltSourceStatus(product) {
  const status = $("blindBoltSourceStatus");
  const localChecked = product?.sourceStatus === "Source_Checked";
  const onlineChecked = product?.sourceStatus === "Source_Online_Checked";
  status.textContent = localChecked ? "Local reference checked" : onlineChecked ? "Manufacturer source checked online" : "Source not verified";
  status.classList.toggle("is-checked", localChecked);
  status.classList.toggle("is-online", onlineChecked);
  const sourceCheckedDate = productSourceCheckedDate(product);
  status.title = product
    ? `${product.sourceName}${sourceCheckedDate ? `; checked ${sourceCheckedDate}` : ""}`
    : "No source selected";
}

function calculateBlindBolt() {
  const product = selectedBlindBoltProduct();
  if (!product) {
    $("blindBoltSelectionPrompt").hidden = true;
    $("blindBoltSelectedSummary").hidden = true;
    $("blindBoltPublishedSection").hidden = true;
    $("blindBoltSelectionPromptTitle").textContent = $("blindBoltProduct").disabled ? "No curated catalogue entry" : "Select a catalogue entry";
    $("blindBoltSelectionPromptNote").textContent = $("blindBoltProduct").disabled
      ? "Revise the browse filters."
      : `${filteredBlindBoltProducts().length} entries available; published product data appears after selection.`;
    $("blindBoltSelectionTitle").textContent = $("blindBoltProduct").disabled ? "No curated catalogue entry" : "Select catalogue entry";
    $("blindBoltSelectionNote").textContent = "Clamping thickness ranks compatible entries without hiding other grip ranges.";
    ["blindBoltCode", "blindBoltSelectedSize", "blindBoltGripRange", "blindBoltHole", "blindBoltSelectedFinish", "blindBoltCentres", "blindBoltEdge", "blindBoltOuterPly", "blindBoltTorque", "blindBoltTools", "blindBoltSelectedHead"].forEach(id => {
      $(id).textContent = "-";
    });
    $("blindBoltPublishedValues").hidden = true;
    $("blindBoltNoPublishedValues").hidden = false;
    $("blindBoltUnavailableBasis").textContent = "No product is selected.";
    setBlindBoltSourceStatus(null);
    $("blindBoltSourceLink").textContent = "Manufacturer technical data";
    $("blindBoltSourceLink").removeAttribute("href");
    $("blindBoltReferenceName").textContent = "Manufacturer technical data";
    return;
  }
  $("blindBoltSelectionPrompt").hidden = true;
  $("blindBoltSelectedSummary").hidden = false;
  $("blindBoltPublishedSection").hidden = false;

  const variant = product.variant ? ` · ${product.variant}` : "";
  const mechanism = product.mechanism ? ` · ${product.mechanism}` : "";
  $("blindBoltSelectionTitle").textContent = `${product.family} ${product.size}${variant}${mechanism}`;
  const gripStatus = Number($("blindBoltGrip").value) > 0
    ? blindBoltGripCompatible(product) ? "Compatible grip range" : "Outside selected grip range"
    : "Grip compatibility not assessed";
  const sourceConflict = product.gripSourceConflict || product.torqueSourceConflict;
  $("blindBoltSelectionNote").textContent = `${product.manufacturer} \u00b7 ${gripStatus}${sourceConflict ? " · source confirmation required" : ""}`;
  $("blindBoltCode").textContent = product.code;
  $("blindBoltSelectedSize").textContent = product.catalogueLength
    ? `${product.size} · ${product.catalogueLength}`
    : product.size;
  $("blindBoltGripRange").textContent = product.gripSourceConflict
    ? `${product.gripMin}-${product.gripMax} mm · source conflict; confirm manufacturer`
    : `${product.gripMin}-${product.gripMax} mm`;
  $("blindBoltHole").textContent = `${product.hole} mm`;
  $("blindBoltSelectedFinish").textContent = product.finish;
  $("blindBoltCentres").textContent = product.centres;
  $("blindBoltEdge").textContent = product.edge;
  $("blindBoltOuterPly").textContent = product.outerPly;
  $("blindBoltTorque").textContent = product.torque;
  $("blindBoltTools").textContent = product.tools;
  $("blindBoltSelectedHead").textContent = product.head;

  const hasValues = Number.isFinite(product.tension) && Number.isFinite(product.shear);
  $("blindBoltPublishedValues").hidden = !hasValues;
  $("blindBoltNoPublishedValues").hidden = hasValues;
  $("blindBoltTensionLabel").textContent = product.tensionLabel || `${product.valueLabel} - tension`;
  $("blindBoltShearLabel").textContent = product.shearLabel || `${product.valueLabel} - shear`;
  $("blindBoltTension").textContent = hasValues ? Number(product.tension).toFixed(1) : "-";
  $("blindBoltShear").textContent = hasValues ? Number(product.shear).toFixed(1) : "-";
  $("blindBoltValueBasis").hidden = !hasValues;
  $("blindBoltValueBasis").textContent = product.valueBasis;
  $("blindBoltUnavailableBasis").textContent = product.valueBasis;
  setBlindBoltSourceStatus(product);
  $("blindBoltReferenceName").textContent = product.sourceName;
  $("blindBoltSourceLink").innerHTML = `Open ${/\.pdf($|\?)/i.test(product.sourceUrl || "") ? "technical data" : "product page"} <span aria-hidden="true">↗</span>`;
  $("blindBoltSourceLink").href = product.sourceUrl;
}

function setBoltMode(mode) {
  boltMode = ["standard", "ubolt", "blind"].includes(mode) ? mode : "standard";
  const uBoltActive = boltMode === "ubolt";
  const blindBoltActive = boltMode === "blind";
  $("boltToolKicker").textContent = uBoltActive
    ? "U-bolt products \u00b7 manufacturer data"
    : blindBoltActive
      ? "Structural blind bolts \u00b7 manufacturer data"
      : "Bolted connections \u00b7 AS 4100 Cl. 9.2";
  $("boltToolTitle").textContent = uBoltActive ? "U-bolt Product Lookup" : blindBoltActive ? "Structural Blind-bolt Lookup" : "Bolt Capacity";
  $("boltToolStatus").textContent = uBoltActive || blindBoltActive ? "Product lookup \u00b7 no project check" : "For Review \u00b7 AS 4100:2020";
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
  if (boltMode === "blind") calculateBlindBolt();
  if (boltMode === "standard") calculateBolt();
}

function initialBoltMode() {
  const params = new URLSearchParams(location.search);
  if (params.get("boltmode") === "blind" || params.has("blindbolt")) return "blind";
  return params.get("boltmode") === "ubolt" || params.has("ubolt") ? "ubolt" : "standard";
}

function calculateWeld() {
  const type = $("weldType").value;
  const typeData = weldTypeData[type] || weldTypeData.fillet;
  const size = value("weldSize");
  const category = $("weldCategory").value;
  const fuw = value("weldStrength");
  const length = numericValue($("weldLength").value);
  const runsValue = numericValue($("weldRuns").value);
  const runs = Number.isFinite(runsValue) ? Math.round(runsValue) : NaN;
  const effectiveThroat = numericValue($("weldEffectiveThroat").value);
  const lapReductionActive = $("weldLapConnection").value === "yes" && type === "fillet";
  const parentThickness = value("weldParentThickness");
  const parentGrade = parentMetalGrades[$("weldParentGrade").value] || parentMetalGrades["Grade 250 plate"];
  const parentPhi = 0.9;
  const weldMethodAvailable = type === "fillet" || type === "ipbw";
  const inputErrors = [];
  if (weldMethodAvailable && !(length > 0)) inputErrors.push("Effective weld length l_w must be greater than zero");
  if (type === "fillet" && length > 0 && length < 4 * size) inputErrors.push("Fillet-weld effective length l_w must be at least 4s");
  if (weldMethodAvailable && !(runsValue >= 1 && Number.isInteger(runsValue))) inputErrors.push("Effective weld lines must be a positive whole number");
  if (type === "ipbw" && !(effectiveThroat > 0)) inputErrors.push("IPBW design throat a_w must be greater than zero");
  [
    ["weldLength", length > 0 && (type !== "fillet" || length >= 4 * size)],
    ["weldRuns", runsValue >= 1 && Number.isInteger(runsValue)],
    ["weldEffectiveThroat", type !== "ipbw" || effectiveThroat > 0]
  ].forEach(([id, valid]) => {
    if (valid || !weldMethodAvailable) $(id).removeAttribute("aria-invalid");
    else $(id).setAttribute("aria-invalid", "true");
  });
  const weldResult = inputErrors.length === 0
    ? WeldCapacity.calculate({
      type,
      category,
      size,
      effectiveThroat,
      fuw,
      length,
      runs,
      weldedLap: lapReductionActive
    })
    : {
      calculationAvailable: false,
      throat: NaN,
      phi: weldCapacityFactor(type, category),
      kr: 1,
      capacityPerMm: NaN,
      capacity: NaN
    };
  const { calculationAvailable, throat, phi, kr, capacityPerMm, capacity } = weldResult;
  const parentCheckActive = parentThickness > 0;
  const parentPerMm = parentCheckActive
    ? WeldCapacity.parentMetalScreen({ fup: parentGrade.fup, thickness: parentThickness, phi: parentPhi })
    : NaN;
  const parentGoverns = calculationAvailable && parentCheckActive && parentPerMm < capacityPerMm;
  const demand = value("weldDemand");
  const utilisation = calculationAvailable && capacity > 0 ? demand / capacity : Infinity;
  const hasDemand = demand > 0;
  const callouts = {
    fillet: `${size} mm CFW, category ${category}, f<sub>uw</sub> ${fuw} MPa`,
    cpbw: `CPBW, category ${category}; resistance governed by the weaker joined part`,
    ipbw: `IPBW, a<sub>w</sub> ${displayFixed(effectiveThroat, 1)} mm, category ${category}, f<sub>uw</sub> ${fuw} MPa`,
    compound: `Compound weld; total design throat to be project-defined`
  };

  $("weldSizeField").hidden = type !== "fillet";
  $("weldThroatField").hidden = type !== "ipbw";

  $("weldCallout").innerHTML = callouts[type] || callouts.fillet;
  $("weldTypeValue").textContent = typeData.label;
  $("weldThroatValue").textContent = calculationAvailable ? `${fixed2(throat)} mm` : inputErrors.length ? "\u2014" : "Project-defined";
  $("weldLengthValue").textContent = length > 0 ? `${fixed(length)} mm` : "\u2014";
  $("weldRunsValue").textContent = runsValue >= 1 && Number.isInteger(runsValue) ? String(runs) : "\u2014";
  $("weldPhiValue").textContent = type === "compound" ? "-" : displayFixed(phi, 2);
  $("weldCapacityLabel").textContent = calculationAvailable
      ? "Design capacity per unit effective length"
    : type === "cpbw"
      ? "Resistance governed by the weaker joined part"
      : "Project-specific resistance required";
  $("weldCapacityBasis").innerHTML = calculationAvailable
    ? `${typeData.scope}; ${category}; &phi; = ${displayFixed(phi, 2)} from AS 4100 Table 3.4`
    : inputErrors.length
      ? "Not evaluated; valid weld geometry is required"
    : type === "cpbw"
      ? "AS 4100 Cl. 9.6.2.7; joined-part resistance is not defined by this weld-metal input set"
      : "AS 4100 Cl. 9.6.5.2; total design throat requires the actual compound-weld geometry";
  $("weldCapacity").textContent = calculationAvailable ? fixed(capacity) : "Not evaluated";
  $("weldCapacityPerMm").textContent = calculationAvailable ? displayFixed(capacityPerMm, 2) : "Not evaluated";
  $("weldCapacityUnit").hidden = !calculationAvailable;
  $("weldTotalCapacityUnit").hidden = !calculationAvailable;
  $("parentGoverningPerMm").textContent = parentCheckActive ? fixed2(parentPerMm) : "-";
  $("parentGoverningNote").textContent = !parentCheckActive
    ? "Positive ply thickness required"
    : !calculationAvailable
      ? "Advisory only; joined-part resistance not evaluated"
    : parentGoverns
      ? `Advisory screen lower; f_up ${parentGrade.fup} MPa`
      : "Advisory screen does not govern weld-throat resistance";
  $("parentGoverningNote").className = parentCheckActive ? "check" : "";
  $("weldUtilisation").textContent = !calculationAvailable || !hasDemand ? "\u2014" : displayFixed(utilisation, 2);
  $("weldStatus").textContent = !calculationAvailable ? "Not evaluated" : !hasDemand ? "No design action" : utilisation <= 1 ? "Weld throat PASS" : "Weld throat FAIL";
  $("weldStatus").className = !calculationAvailable || !hasDemand ? "check" : utilisation <= 1 ? "pass" : "fail";

  if (calculationAvailable) {
    $("weldFormulaSteps").innerHTML = [
      calculationTraceRow({
        title: "Weld classification",
        lookup: "Selected weld type and weld category.",
        selection: `${typeData.label}; category ${category}`,
        adopted: typeData.scope,
        applicability: callouts[type] || callouts.fillet
      }),
      calculationTraceRow({
        title: "Design throat thickness",
        reference: type === "fillet" ? "AS 4100 Cl. 9.6.3.4" : "AS 4100 Cl. 9.6.2.7",
        formula: type === "fillet" ? `t<sub>t</sub> = 0.707s` : `t<sub>t</sub> = a<sub>w</sub>`,
        substitution: type === "fillet" ? `0.707 &times; ${displayFixed(size, 0)} mm` : `${displayFixed(effectiveThroat, 1)} mm`,
        result: `Design throat thickness = ${fixed2(throat)} mm`,
        applicability: type === "fillet" ? "Equal-leg fillet weld; entered effective length satisfies AS 4100 Cl. 9.6.3.5 minimum 4s." : "Incomplete-penetration butt weld with project-specified design throat."
      }),
      calculationTraceRow({
        title: "Design capacity per unit effective length",
        reference: "AS 4100 Cl. 9.6.3.10 and AS 4100 Table 3.4",
        formula: `&phi;R/l<sub>w</sub> = &phi;0.6f<sub>uw</sub>t<sub>t</sub>k<sub>r</sub>`,
        substitution: `${displayFixed(phi, 2)} &times; 0.6 &times; ${displayFixed(fuw, 0)} MPa &times; ${fixed2(throat)} mm &times; ${displayFixed(kr, 2)} / 1000`,
        result: `Design weld capacity per unit effective length = ${displayFixed(capacityPerMm, 2)} kN/mm per effective weld line`,
        applicability: "Direct weld-throat resistance for the selected fillet-weld or IPBW calculation path."
      }),
      calculationTraceRow({
        title: "Welded-lap reduction",
        reference: "AS 4100 Table 9.6.3.10(B)",
        lookup: "Reduction factor by welded-lap connection status and weld length.",
        selection: lapReductionActive ? `l<sub>w</sub> = ${fixed(length)} mm = ${displayFixed(length / 1000, 2)} m` : "Welded-lap reduction not selected",
        adopted: `k<sub>r</sub> = ${displayFixed(kr, 2)}`,
        applicability: lapReductionActive ? "Applicable to the selected fillet welded-lap connection." : "Not applicable to the selected connection condition or weld type."
      }),
      calculationTraceRow({
        title: "Total design weld capacity",
        formula: `&phi;R<sub>total</sub> = (&phi;R/l<sub>w</sub>)l<sub>w</sub>n<sub>w</sub>`,
        substitution: `${displayFixed(phi, 2)} &times; 0.6 &times; ${displayFixed(fuw, 0)} MPa &times; ${type === "fillet" ? `(0.707 &times; ${displayFixed(size, 0)} mm)` : `${displayFixed(throat, 3)} mm`} &times; ${displayFixed(kr, 3)} &times; ${fixed(length)} mm &times; ${runs} / 1000`,
        result: `Total design weld capacity = ${fixed(capacity)} kN`,
        applicability: `${runs} identical effective weld line${runs === 1 ? "" : "s"}; effective weld lines are not welding passes.`
      }),
      calculationTraceRow({
        title: "Optional weld throat utilisation",
        formula: hasDemand ? `&eta;<sub>w</sub> = V<sub>w</sub><sup>*</sup>/&phi;R<sub>total</sub>` : "",
        substitution: hasDemand ? `${fixed(demand)} kN / ${fixed(capacity)} kN` : "",
        result: hasDemand ? `&eta;<sub>w</sub> = ${displayFixed(utilisation, 2)}; ${utilisation <= 1 ? "Weld throat PASS" : "Weld throat FAIL"}` : "No design action entered",
        applicability: "Direct action against the calculated throat resistance only; weld group effects, eccentricity and connected-part limit states remain excluded."
      }),
      calculationTraceRow({
        title: "Indicative parent-metal screen",
        formula: parentCheckActive ? `&phi;R<sub>p</sub>/l = 0.90(0.6f<sub>up</sub>t)` : "",
        substitution: parentCheckActive ? `0.90 &times; 0.6 &times; ${parentGrade.fup} MPa &times; ${fixed2(parentThickness)} mm / 1000` : "",
        result: parentCheckActive ? `Indicative resistance per unit length = ${fixed2(parentPerMm)} kN/mm` : "Not evaluated",
        applicability: parentCheckActive ? `Advisory screening result; ${parentGrade.standard}. This is not the weaker-joined-part CPBW resistance.` : "A positive ply thickness is required to display this optional screening result."
      }),
      calculationTraceRow({
        title: "Design boundary",
        result: "Scoped weld-throat resistance calculation",
        applicability: "Not a complete welded-joint design. Weld groups, connected-part rupture, heat-affected-zone requirements, joint preparation, welding procedure specifications, inspection, fatigue and effective-length provisions beyond the entered length are excluded."
      })
    ].join("");
  } else if (inputErrors.length) {
    $("weldFormulaSteps").innerHTML = calculationTraceRow({
      title: "Input validation",
      selection: inputErrors.join("; "),
      result: "Not evaluated",
      applicability: "Enter valid weld geometry before using the AS 4100 throat-capacity check.",
      state: "warning"
    });
  } else {
    const capacityRule = type === "cpbw"
      ? `AS 4100 Cl. 9.6.2.7 takes CPBW design capacity as the nominal capacity of the weaker joined part multiplied by the appropriate capacity factor. The resistance of that joined part is not defined by weld-metal strength and throat alone.`
      : `AS 4100 Cl. 9.6.5.2 defines compound-weld throat from the actual total weld cross-section. It is not a<sub>w</sub> + 0.707s; the present inputs cannot establish that geometry.`;
    $("weldFormulaSteps").innerHTML = calculationTraceRow({
      title: typeData.label,
      reference: type === "cpbw" ? "AS 4100 Cl. 9.6.2.7" : "AS 4100 Cl. 9.6.5.2",
      result: "Not evaluated",
      applicability: `${capacityRule} ${type === "cpbw" ? "Define the weaker joined part, applicable limit state, material strength, net/gross section and capacity factor." : "Define the prepared joint and total weld cross-section before determining the design throat."} The welding procedure specification, preparation, inspection, fatigue, heat-affected-zone requirements and connected-part limit states remain project-specific.`,
      state: "warning"
    });
  }
}

const beamFamilyDefinitions = Object.freeze({
  ub: { label: "UB", source: "InfraBuild 2019 Tables 9-10 · checked x-x and y-y rows", defaultSection: "310UB40.4", directions: [["x", "x-x"], ["y", "y-y"]] },
  uc: { label: "UC", source: "InfraBuild 2019 Tables 11-12 · checked x-x and y-y rows", defaultSection: "200UC46.2", directions: [["x", "x-x"], ["y", "y-y"]] },
  pfc: { label: "PFC", source: "InfraBuild 2019 Tables 15-16 · checked x-x, Load A and Load B rows", defaultSection: "150PFC", directions: [["x", "x-x"], ["y-a", "y-y · Load A"], ["y-b", "y-y · Load B"]] },
  chs: { label: "CHS", source: "Austube 2013 Tables 3.1-1 and 3.1-2 · 73 checked design rows", defaultSection: "114.3 x 4.5 CHS", directions: [["axis", "Axis-independent"]] },
  rhs: { label: "RHS", source: "Austube 2013 Tables 3.1-3 and 3.1-4 · checked x-x and y-y rows", defaultSection: "150 x 100 x 6 RHS", directions: [["x", "x-x"], ["y", "y-y"]] },
  shs: { label: "SHS", source: "Austube 2013 Tables 3.1-5 and 3.1-6 · checked axis-independent rows", defaultSection: "100 x 100 x 6 SHS", directions: [["xy", "x-x = y-y"]] },
  ea: { label: "EA", source: "InfraBuild 2019 Tables 19-20 · checked Load A/B/C/D rows · Grade 350 availability by enquiry", defaultSection: "100 x 100 x 10 EA", directions: [["a", "Load A"], ["b", "Load B"], ["c", "Load C"], ["d", "Load D"]] },
  rod: { label: "Round Bar", source: "InfraBuild 2019 Table 3 Rounds and InfraBuild 2019 Table 38 strengths · confirm grade and diameter availability", defaultSection: "Ø24 Round Bar", directions: [["axis", "Axis-independent"]] }
});

function beamUniversalWebYield(section, gradeName, grade) {
  if (gradeName === "300PLUS") return grade.fy === 280 ? 300 : 320;
  if (grade.fy === 360) return 360;
  const grade340Web = new Set(["610UB125", "610UB113", "310UC158", "310UC137", "310UC118"]);
  return grade340Web.has(section.designation) ? 340 : 360;
}

function beamRolledSection(section, family) {
  const supplementary = BeamHotRolledData.universal[section.designation];
  const table = family === "ub" ? "Tables 9-10" : "Tables 11-12";
  const grades = Object.fromEntries(Object.entries(section.grades).map(([name, grade]) => {
    const y = supplementary?.grades?.[name];
    return [name, {
      ...grade,
      fyw: beamUniversalWebYield(section, name, grade),
      directions: {
        x: { Ze: grade.Ze, compactness: grade.compactness },
        y: { Ze: y?.Ze || 0, compactness: y?.compactness || null }
      },
      sourceRef: `InfraBuild 2019 ${table} · PDF pp. ${family === "ub" ? "12-13" : "14-15"}`
    }];
  }));
  return {
    ...section,
    family,
    drawing: { shape: "i", d: section.d, bf: section.bf, tw: section.tw, tf: section.tf },
    I: supplementary?.x?.I || 0,
    axes: {
      x: { I: supplementary?.x?.I || 0, Z: section.Zx, S: section.Sx },
      y: supplementary?.y || { I: 0, Z: 0, S: 0 }
    },
    grades,
    capacityStatus: "checked",
    shearMethod: "rolled-web",
    interactionMethod: "flat-web",
    sourceRef: `InfraBuild 2019 ${table} · PDF pp. ${family === "ub" ? "12-13" : "14-15"}`,
    sourceBasis: "Published catalogue section and capacity tables"
  };
}

function beamPfcSection(section) {
  const record = {
    ...section,
    family: "pfc",
    drawing: { shape: "channel", d: section.d, bf: section.bf, tw: section.tw, tf: section.tf, xL: section.xL, xO: section.xO },
    geometryProperties: { cx: section.xL, cy: section.d / 2 },
    Aw: section.d * section.tw,
    I: section.axes.x.I,
    Zx: section.axes.x.Z,
    Sx: section.axes.x.S,
    capacityStatus: "checked",
    shearMethod: "rolled-web",
    interactionMethod: "flat-web",
    sourceRef: "InfraBuild 2019 Tables 15-16 · PDF p. 17",
    sourceBasis: "Published catalogue section and capacity tables"
  };
  const grades = Object.fromEntries(Object.entries(section.grades || {}).map(([name, grade]) => {
    const directions = Object.fromEntries(Object.entries(grade.directions || {}).map(([key, data]) => {
      const reconciliation = BeamSectionReconciliation.reconcile(record, grade, key);
      return [key, {
        ...data,
        compactness: reconciliation.status === "reconciled" ? reconciliation.publishedClass : data.compactness,
        compactnessBasis: reconciliation.status === "reconciled"
          ? reconciliation.classMethod === "published-ze-interval" ? "derived-ze-interval" : "derived-geometry"
          : null
      }];
    }));
    return [name, { ...grade, directions }];
  }));
  return { ...record, grades };
}

function beamHollowSections(family) {
  return SectionCatalogue.checkedDesignRows(family, sectionProductDirectory[family] || []);
}

function beamAngleSection(section) {
  const capacityGrades = BeamHotRolledData.equalAngle[section.designation] || {};
  const catalogue = BeamHotRolledData.equalAngleProperties[section.designation] || null;
  const record = {
    ...section,
    family: "ea",
    tNominal: section.t,
    t: catalogue?.t || section.t,
    r1: catalogue?.r1 || 0,
    r2: catalogue?.r2 || 0,
    pB: catalogue?.pB || 0,
    pT: catalogue?.pT || 0,
    area: catalogue?.area || section.area,
    drawing: { shape: "angle", b: section.b, t: catalogue?.t || section.t },
    geometryProperties: catalogue ? { cx: catalogue.pB, cy: catalogue.pB } : SectionGeometry.equalAngle(section.b, section.t),
    mass: catalogue?.mass || section.area * 0.00785,
    I: catalogue?.axes?.a?.I || 0,
    Zx: catalogue?.axes?.a?.Z || 0,
    Sx: catalogue?.axes?.a?.S || 0,
    axes: catalogue?.axes || null,
    sourceRef: "InfraBuild 2019 Tables 19-20 · PDF pp. 19-20",
    sourceBasis: "Published catalogue load-direction capacity table"
  };
  const grades = Object.fromEntries(Object.entries(capacityGrades).map(([name, grade]) => {
    const directions = Object.fromEntries(Object.entries(grade.directions || {}).map(([key, data]) => {
      const reconciliation = BeamSectionReconciliation.reconcile(record, grade, key);
      return [key, {
        ...data,
        compactness: reconciliation.status === "reconciled" ? reconciliation.publishedClass : null,
        compactnessBasis: reconciliation.status === "reconciled" ? "derived-ze-interval" : null
      }];
    }));
    return [name, {
      ...grade,
      directions,
      sourceRef: "InfraBuild 2019 Tables 19-20 · PDF pp. 19-20"
    }];
  }));
  return {
    ...record,
    grades,
    capacityStatus: Object.keys(grades).length ? "checked" : "unavailable"
  };
}

function beamRodSection(section) {
  const properties = SectionGeometry.circle(section.diameter);
  const solid = BeamSectionCapacity.solidCircle(section.diameter);
  const S = solid.S / 1000;
  const Z = solid.Z / 1000;
  const Ze = solid.Ze / 1000;
  return {
    ...section,
    family: "rod",
    D: section.diameter,
    drawing: { shape: "circle", D: section.diameter },
    I: properties.ix,
    Zx: Z,
    Sx: S,
    Aw: 0,
    grades: Object.fromEntries(Object.entries(section.grades).map(([name, grade]) => [name, { ...grade, directions: { axis: { Ze, compactness: "C" } }, sourceRef: "InfraBuild 2019 round bar table" }])),
    capacityStatus: "checked",
    sourceRef: "InfraBuild 2019 round bar table",
    sourceBasis: "Catalogue diameter and solid-circle geometry"
  };
}

function beamCatalogueSections() {
  if (beamFamily === "ub") return sectionProductDirectory.ub.map(section => beamRolledSection(section, "ub"));
  if (beamFamily === "uc") return sectionProductDirectory.uc.map(section => beamRolledSection(section, "uc"));
  if (beamFamily === "pfc") return sectionProductDirectory.pfc.map(beamPfcSection);
  if (["chs", "rhs", "shs"].includes(beamFamily)) return beamHollowSections(beamFamily);
  if (beamFamily === "ea") return sectionProductDirectory.ea.map(beamAngleSection);
  if (beamFamily === "rod") return sectionProductDirectory.rod.map(beamRodSection);
  return [];
}

function formatBeamNumber(number, digits = 1) {
  return Number.isFinite(Number(number)) ? displayGroupedFixed(number, digits) : "-";
}

function formatBeamOptional(number, unit, digits = 1) {
  return number > 0 ? `${formatBeamNumber(number, digits)} ${unit}` : "-";
}

function formatBeamModulus(number) {
  return number > 0 ? `${formatBeamNumber(number, 1)} &times; 10<sup>3</sup> mm<sup>3</sup>` : "-";
}

function formatBeamInertia(number) {
  return number > 0 ? `${formatBeamNumber(number / 1e6, 2)} &times; 10<sup>6</sup> mm<sup>4</sup>` : "-";
}

function formatBeamArea(number) {
  return number > 0 ? `${formatBeamNumber(number, 0)} mm<sup>2</sup>` : "-";
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
  setBeamSummaryCell("beamDimDiameter", formatBeamDimension(section.D), !(section.D > 0));
  setBeamSummaryCell("beamDimDepth", formatBeamDimension(section.d), !(section.d > 0));
  setBeamSummaryCell("beamDimWidth", formatBeamDimension(section.b), !(section.b > 0));
  setBeamSummaryCell("beamDimBf", formatBeamDimension(section.bf), !(section.bf > 0));
  setBeamSummaryCell("beamDimThickness", formatBeamDimension(section.t), !(section.t > 0));
  setBeamSummaryCell("beamDimTw", formatBeamDimension(section.tw), !(section.tw > 0));
  setBeamSummaryCell("beamDimTf", formatBeamDimension(section.tf), !(section.tf > 0));
  setBeamSummaryCell("beamDimD1", formatBeamDimension(section.d1), !(section.d1 > 0));
  setBeamSummaryCell("beamDimXL", formatBeamDimension(section.xL), !(section.xL > 0));
  setBeamSummaryCell("beamDimXO", formatBeamDimension(section.xO), !(section.xO > 0));
}

function compactnessText(compactness) {
  if (compactness === "C") return "Compact";
  if (compactness === "N") return "Non-compact";
  if (compactness === "E") return "Elastic basis";
  if (compactness === "S") return "Slender";
  return "Not published";
}

const sectionShapeNames = {
  rectangle: "Rectangle",
  rhs: "RHS / SHS",
  circle: "Solid circle",
  chs: "CHS",
  i: "Symmetric I-section",
  angle: "Equal angle",
  channel: "Channel",
  tee: "T-section"
};

const sectionCatalogueFamilyNames = {
  ub: "UB",
  uc: "UC",
  pfc: "PFC",
  chs: "CHS",
  rhs: "RHS",
  shs: "SHS",
  ea: "EA",
  rod: "Round Bar"
};

function sectionPowerValue(number) {
  const amount = Number(number);
  if (!Number.isFinite(amount) || amount < 0) return "—";
  const exponent = amount >= 1e9 ? 9 : amount >= 1e6 ? 6 : amount >= 1e3 ? 3 : 0;
  if (!exponent) return displayGroupedFixed(amount, 1);
  const coefficient = amount / 10 ** exponent;
  const maximumFractionDigits = coefficient >= 100 ? 1 : coefficient >= 10 ? 2 : 3;
  return `${displayGroupedFixed(coefficient, maximumFractionDigits)} × 10<sup>${exponent}</sup>`;
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
  if (shape === "tee") return SectionGeometry.tee(value("sectionDepth"), value("sectionFlangeWidth"), value("sectionWebThickness"), value("sectionFlangeThickness"));
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
  if (shape === "tee") return "One flange rectangle plus the centred clear web rectangle.";
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
  if (shape === "tee") return [
    { label: "(d−tf)/tw", value: (value("sectionDepth") - value("sectionFlangeThickness")) / value("sectionWebThickness") },
    { label: "(bf−tw)/2tf", value: (value("sectionFlangeWidth") - value("sectionWebThickness")) / (2 * value("sectionFlangeThickness")) }
  ];
  if (shape === "angle") return [{ label: "b/t", value: value("sectionLeg") / value("sectionAngleThickness") }];
  return [];
}

function renderSectionRatios(ratios) {
  const valid = (ratios || []).filter(item => Number.isFinite(item.value) && item.value > 0);
  const values = valid.length
    ? valid.map(item => `${safeText(item.label)} = ${displayGroupedFixed(item.value, 2)}`).join("; ")
    : "Not applicable to the selected geometry";
  $("sectionGeometricRatios").innerHTML = `<b>Geometric ratios</b> &mdash; ${values}. Geometric only; any section classification is reported separately from checked design-property data.`;
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
  if (drawing.shape === "tee") return SectionGeometry.tee(drawing.d, drawing.bf, drawing.tw, drawing.tf);
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
  svg.closest(".section-properties-figure").hidden = false;

  const scale = Math.min(108 / width, 112 / height);
  const drawnWidth = width * scale;
  const drawnHeight = height * scale;
  const x0 = 120 - drawnWidth / 2;
  const y0 = 82 - drawnHeight / 2;
  const limitThickness = number => {
    const maximum = Math.min(drawnWidth, drawnHeight) * 0.24;
    return Math.max(Math.min(4, maximum), Math.min(number * scale, maximum));
  };
  const line = number => displayFixed(number, 2);
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
  } else if (shape === "tee") {
    const tw = limitThickness(drawing.tw);
    const tf = limitThickness(drawing.tf);
    const webLeft = x0 + (drawnWidth - tw) / 2;
    const webRight = webLeft + tw;
    geometryMarkup = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + drawnWidth)} V ${line(y0 + tf)} H ${line(webRight)} V ${line(y0 + drawnHeight)} H ${line(webLeft)} V ${line(y0 + tf)} H ${line(x0)} Z" />`;
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
    ? `${catalogueMode ? "Selected" : "Entered"} dimensions · n-n / p-p centroidal · x-x / y-y principal${indicative ? " · C indicative" : ""}`
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

function sectionMaterialDefaultForm() {
  if (sectionPropertiesMode === "catalogue") {
    const family = selectedSectionCatalogueFamily()?.key;
    if (family === "chs" || family === "rhs" || family === "shs") return "hollow-section";
    if (family === "rod") return "round-bar";
    return "hot-rolled-section";
  }
  const shape = $("sectionShape").value;
  if (shape === "rhs" || shape === "chs") return "hollow-section";
  if (shape === "circle") return "round-bar";
  return "hot-rolled-section";
}

function sectionMaterialDefaultThickness() {
  if (sectionPropertiesMode === "catalogue") {
    const family = selectedSectionCatalogueFamily()?.key;
    const section = selectedSectionCatalogueRecord();
    if (!section) return null;
    if (family === "ea") return section.auxiliary?.actualT?.value || section.drawing?.t || null;
    if (family === "rod") return section.drawing?.D || section.diameter || null;
    if (family === "chs" || family === "rhs" || family === "shs") return section.drawing?.t || null;
    return Math.max(Number(section.drawing?.tf) || 0, Number(section.drawing?.tw) || 0) || null;
  }
  const shape = $("sectionShape").value;
  if (shape === "rectangle") return Math.min(value("sectionWidth"), value("sectionHeight"));
  if (shape === "rhs" || shape === "chs") return value("sectionThickness");
  if (shape === "circle") return value("sectionDiameter");
  if (shape === "i" || shape === "channel" || shape === "tee") return Math.max(value("sectionWebThickness"), value("sectionFlangeThickness"));
  if (shape === "angle") return value("sectionAngleThickness");
  return null;
}

function populateSectionMaterialGrades(preferredGrade) {
  const form = $("sectionMaterialForm").value;
  const definition = SteelMaterials.PRODUCT_FORMS[form];
  if (!definition) {
    $("sectionMaterialGrade").innerHTML = `<option value="">Select material basis first</option>`;
    $("sectionMaterialGrade").disabled = true;
    document.querySelectorAll(".section-material-project-field").forEach(field => { field.hidden = true; });
    $("sectionMaterialThicknessLabel").textContent = "Governing thickness";
    return;
  }
  const grades = SteelMaterials.gradeOptions(form);
  $("sectionMaterialGrade").innerHTML = grades.map(grade => `<option value="${safeText(grade)}">${safeText(SteelMaterials.gradeLabel(grade))}</option>`).join("");
  const defaultGrade = form === "hollow-section" ? "C350L0" : grades[0];
  $("sectionMaterialGrade").value = grades.includes(preferredGrade) ? preferredGrade : defaultGrade;
  const project = form === "project";
  document.querySelectorAll(".section-material-project-field").forEach(field => { field.hidden = !project; });
  $("sectionMaterialGrade").disabled = false;
  $("sectionMaterialThicknessLabel").textContent = definition.thicknessLabel;
}

function sectionMaterialThicknessBasis() {
  if (sectionPropertiesMode === "catalogue") return "catalogue";
  if ($("sectionMaterialForm").value === "project") return "project";
  return sectionMaterialThicknessManual ? "manual" : "geometry";
}

function syncSectionMaterialControls(reset = false, preserveForm = false) {
  const previousForm = $("sectionMaterialForm").value;
  const previousGrade = $("sectionMaterialGrade").value;
  const defaultForm = sectionMaterialDefaultForm();
  const catalogue = sectionPropertiesMode === "catalogue";
  if (reset) sectionMaterialThicknessManual = false;
  if (catalogue) {
    $("sectionMaterialForm").value = defaultForm;
  } else if (reset && !preserveForm) {
    $("sectionMaterialForm").value = "";
  } else if (previousForm && SteelMaterials.PRODUCT_FORMS[previousForm]) {
    $("sectionMaterialForm").value = previousForm;
  } else {
    $("sectionMaterialForm").value = "";
  }
  $("sectionMaterialForm").disabled = catalogue;
  populateSectionMaterialGrades(previousGrade);
  if (catalogue && reset) {
    const listedGrades = Object.keys(sectionCheckedDesignRecord()?.grades || {});
    if (listedGrades.length && !listedGrades.includes($("sectionMaterialGrade").value)) {
      $("sectionMaterialGrade").value = listedGrades[0];
    }
  }
  const selectedForm = $("sectionMaterialForm").value;
  const hasMaterialBasis = Boolean(SteelMaterials.PRODUCT_FORMS[selectedForm]);
  const project = selectedForm === "project";
  const geometryLinked = !catalogue && hasMaterialBasis && !project && !sectionMaterialThicknessManual;
  const thickness = sectionMaterialDefaultThickness();
  if (!hasMaterialBasis) $("sectionMaterialThickness").value = "";
  else if (catalogue || geometryLinked) $("sectionMaterialThickness").value = Number.isFinite(thickness) && thickness > 0 ? thickness : "";
  $("sectionMaterialThickness").disabled = !hasMaterialBasis || catalogue || geometryLinked;
  $("sectionMaterialThickness").dataset.basis = sectionMaterialThicknessBasis();
  $("sectionMaterialThicknessState").textContent = catalogue
    ? "Catalogue"
    : !hasMaterialBasis
      ? "Select material basis"
    : project
      ? "Project input"
      : sectionMaterialThicknessManual
        ? "Manual override"
        : "Geometry linked";
  $("sectionMaterialThicknessState").classList.toggle("is-manual", project || sectionMaterialThicknessManual);
  $("sectionMaterialThicknessOverride").hidden = !hasMaterialBasis || catalogue || project;
  $("sectionMaterialThicknessOverride").textContent = sectionMaterialThicknessManual ? "Use geometry" : "Override";
  $("sectionMaterialThicknessOverride").setAttribute("aria-pressed", String(sectionMaterialThicknessManual));
  $("sectionMaterialInputNote").textContent = catalogue
    ? "Product form and governing thickness follow the selected section."
    : !hasMaterialBasis
      ? "Select the product form or project-defined basis before using material strengths."
    : project
      ? "Project-defined fy, fu and governing thickness are explicit user inputs."
      : sectionMaterialThicknessManual
        ? "Standard strength uses the manual governing thickness shown below."
        : "Standard material follows the governing thickness or diameter of the entered geometry.";
}

function selectedSectionMaterial() {
  return SteelMaterials.resolve({
    productForm: $("sectionMaterialForm").value,
    grade: $("sectionMaterialGrade").value,
    thickness: value("sectionMaterialThickness"),
    thicknessBasis: sectionMaterialThicknessBasis(),
    fy: value("sectionMaterialFyInput"),
    fu: value("sectionMaterialFuInput")
  });
}

function sameSectionDimension(a, b) {
  return Number.isFinite(Number(a)) && Number.isFinite(Number(b))
    && Math.abs(Number(a) - Number(b)) < 1e-6;
}

function sectionCheckedDesignRecord() {
  if (sectionPropertiesMode !== "catalogue") return null;
  const family = selectedSectionCatalogueFamily()?.key;
  const selected = selectedSectionCatalogueRecord();
  const designation = selected?.designation;
  if (!designation) return null;
  if (family === "ub") {
    const section = sectionProductDirectory.ub.find(item => item.designation === designation);
    return section ? beamRolledSection(section, "ub") : null;
  }
  if (family === "uc") {
    const section = sectionProductDirectory.uc.find(item => item.designation === designation);
    return section ? beamRolledSection(section, "uc") : null;
  }
  if (family === "pfc") {
    const section = sectionProductDirectory.pfc.find(item => item.designation === designation);
    return section ? beamPfcSection(section) : null;
  }
  if (family === "chs") return beamHollowSections("chs").find(item =>
    sameSectionDimension(item.D, selected.drawing?.D) && sameSectionDimension(item.t, selected.drawing?.t)
  ) || null;
  if (family === "rhs" || family === "shs") return beamHollowSections(family).find(item =>
    item.designation === designation
  ) || null;
  if (family === "ea") {
    const section = sectionProductDirectory.ea.find(item => item.designation === designation);
    return section ? beamAngleSection(section) : null;
  }
  if (family === "rod") {
    const section = sectionProductDirectory.rod.find(item => item.designation === designation);
    return section ? beamRodSection(section) : null;
  }
  return null;
}

function setSectionMaterialValue(outputId, basisId, value, basis) {
  const output = $(outputId);
  const basisElement = $(basisId);
  const available = Number.isFinite(value);
  output.textContent = available ? displayGroupedFixed(value, 0) : "—";
  basisElement.textContent = available ? basis : "Not verified";
  basisElement.classList.toggle("unavailable", !available);
}

function renderSectionMaterial(material, designRecord) {
  const common = material.common;
  const exactGrade = designRecord?.grades?.[material.grade];
  const webYieldStrength = exactGrade?.fyw;
  const thicknessBasisLabel = {
    catalogue: "Catalogue",
    geometry: "Geometry linked",
    manual: "Manual override",
    project: "Project input"
  }[material.thicknessBasis] || "Entered";
  const thicknessText = Number.isFinite(material.thickness)
    ? `${material.thicknessLabel} = ${displayGroupedFixed(material.thickness, 1)} mm`
    : `${material.thicknessLabel} not resolved`;
  $("sectionMaterialStandard").textContent = `${material.standard} · ${SteelMaterials.gradeLabel(material.grade)}`;
  $("sectionMaterialStandardBasis").textContent = material.productForm
    ? `${material.table} · ${thicknessText} · ${thicknessBasisLabel}`
    : "Select product form";
  setSectionMaterialValue("sectionMaterialFy", "sectionMaterialFyBasis", material.fy, material.strengthBasis === "project" ? "Project input" : "Standard");
  $("sectionMaterialFyDetail").hidden = !Number.isFinite(webYieldStrength) || webYieldStrength === material.fy;
  $("sectionMaterialFyDetail").innerHTML = Number.isFinite(webYieldStrength) && webYieldStrength !== material.fy
    ? `Web yield stress f<sub>y,w</sub> = ${displayGroupedFixed(webYieldStrength, 0)} MPa · Catalogue · exact row`
    : "";
  setSectionMaterialValue("sectionMaterialFu", "sectionMaterialFuBasis", material.fu, material.strengthBasis === "project" ? "Project input" : "Standard");
  $("sectionMaterialE").textContent = `${displayGroupedFixed(common.E.value, 0)} MPa`;
  $("sectionMaterialG").textContent = `${displayGroupedFixed(common.G.value, 0)} MPa`;
  $("sectionMaterialNu").textContent = displayGroupedFixed(common.nu.value, 2, false);
  $("sectionMaterialAlpha").innerHTML = `${displayGroupedFixed(common.alphaT.value * 1e6, 1, false)} &times; 10<sup>&minus;6</sup> /&deg;C`;
  $("sectionMaterialDensity").textContent = displayGroupedFixed(common.density.value, 0);
  $("sectionMaterialValidation").textContent = material.validation;
  $("sectionMaterialValidation").hidden = material.status === "resolved";
  const invalidProjectStrength = material.productForm === "project" && material.status !== "resolved";
  $("sectionMaterialFyInput").setAttribute("aria-invalid", String(invalidProjectStrength));
  $("sectionMaterialFuInput").setAttribute("aria-invalid", String(invalidProjectStrength));
  $("sectionMaterialDescription").textContent = material.status === "resolved"
    ? "Strength and common steel constants for the selected material basis."
    : "Complete the material inputs to resolve strength values.";
}

function sectionDirectionLabel(record, key) {
  return beamFamilyDefinitions[record?.family]?.directions?.find(direction => direction[0] === key)?.[1] || key;
}

function sectionDesignUnavailableReason(record, grade) {
  if (sectionPropertiesMode !== "catalogue") return "Not evaluated · custom geometry";
  if (!record) return "No checked design row";
  if (!grade) return "Selected grade not listed for this section";
  return "Not published in checked row";
}

function formatSectionDesignValue(value) {
  return displayGroupedSignificant(value, 3);
}

function sectionDesignDirectionRows(record, directions, valueForDirection) {
  return directions.map(([key, data]) => {
    const value = valueForDirection(data);
    return value ? `<span class="section-design-direction"><span>${safeText(sectionDirectionLabel(record, key))}</span><b>${safeText(value)}</b></span>` : "";
  }).filter(Boolean).join("");
}

function renderSectionDesignAttributes(record, gradeName) {
  const showDesignValues = sectionPropertiesMode === "catalogue";
  $("sectionDesignAttributeHeading").hidden = !showDesignValues;
  $("sectionDesignAttributes").hidden = !showDesignValues;
  if (!showDesignValues) return;

  const grade = record?.grades?.[gradeName];
  const unavailable = !grade;
  const unavailableReason = sectionDesignUnavailableReason(record, grade);
  $("sectionDesignKf").textContent = Number.isFinite(grade?.kf) ? displayGroupedFixed(grade.kf, 3, false) : "—";
  $("sectionDesignKfBasis").textContent = Number.isFinite(grade?.kf) ? "Catalogue · exact row" : unavailableReason;
  $("sectionDesignKfBasis").classList.toggle("unavailable", !Number.isFinite(grade?.kf));

  const directions = Object.entries(grade?.directions || {});
  const compactnessRows = sectionDesignDirectionRows(record, directions, data =>
    data.compactness ? compactnessText(data.compactness) : ""
  );
  const compactnessBases = new Set(directions.map(([, data]) => data.compactnessBasis).filter(Boolean));
  const zeRows = sectionDesignDirectionRows(record, directions, data =>
    Number.isFinite(data.Ze) && data.Ze > 0 ? `${formatSectionDesignValue(data.Ze)} × 10³ mm³` : ""
  );

  $("sectionDesignCompactness").innerHTML = compactnessRows || "&mdash;";
  $("sectionDesignCompactnessBasis").textContent = compactnessRows
    ? compactnessBases.size === 1 && compactnessBases.has("derived-ze-interval")
      ? "Derived · catalogue Ze interval"
      : compactnessBases.size
        ? "Derived · checked AS 4100 reconciliation"
        : "Catalogue · exact row"
    : unavailableReason;
  $("sectionDesignCompactnessBasis").classList.toggle("unavailable", !compactnessRows);
  $("sectionDesignZe").innerHTML = zeRows || "&mdash;";
  $("sectionDesignZeBasis").textContent = zeRows ? "Catalogue · exact row" : unavailableReason;
  $("sectionDesignZeBasis").classList.toggle("unavailable", !zeRows);
  $("sectionDesignAttributes").dataset.state = unavailable ? "unavailable" : "checked";
}

function populateSectionCatalogueFamilies() {
  $("sectionCatalogueFamily").innerHTML = sectionCatalogueFamilies
    .map(family => `<option value="${family.key}">${safeText(family.label)}</option>`)
    .join("");
  $("sectionCatalogueFamilyTabs").innerHTML = sectionCatalogueFamilies
    .map(family => `<button class="section-catalogue-family-tab" type="button" data-section-catalogue-family="${family.key}" aria-pressed="false">${safeText(sectionCatalogueFamilyNames[family.key] || family.label)}</button>`)
    .join("") + '<button class="section-catalogue-family-tab" type="button" data-section-category-custom aria-pressed="false">Custom geometry</button>';
  $("sectionCatalogueDirectoryList").innerHTML = sectionCatalogueFamilies
    .map(family => `<div class="section-catalogue-directory-row"><b>${safeText(sectionCatalogueFamilyNames[family.key] || family.label)}</b><span>${safeText(sectionCatalogueCoverageText(family))}</span></div>`)
    .join("");
  $("sectionCatalogueFamily").value = "pfc";
  populateSectionCatalogueDesignations(false);
  syncSectionMaterialControls(true);
}

function syncSectionCatalogueFamilyTabs() {
  const selectedFamily = $("sectionCatalogueFamily").value;
  document.querySelectorAll(".section-catalogue-family-tab").forEach(button => {
    const active = sectionPropertiesMode === "custom"
      ? button.hasAttribute("data-section-category-custom")
      : button.dataset.sectionCatalogueFamily === selectedFamily;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function sectionCatalogueRange(values) {
  const finiteValues = values.map(Number).filter(Number.isFinite);
  if (!finiteValues.length) return "not stated";
  const minimum = Math.min(...finiteValues);
  const maximum = Math.max(...finiteValues);
  return minimum === maximum ? `${minimum}` : `${minimum}–${maximum}`;
}

function sectionCatalogueCoverageText(family) {
  const sections = family.sections;
  const count = sections.length;
  const drawings = sections.map(section => section.drawing || {});
  if (family.key === "chs") {
    return `${count} directory sizes · D ${sectionCatalogueRange(drawings.map(item => item.D))} mm · t ${sectionCatalogueRange(drawings.map(item => item.t))} mm · 73 Austube design-table rows + 1 Orrcon geometry row`;
  }
  if (family.key === "rhs") {
    return `${count} checked sizes · d ${sectionCatalogueRange(drawings.map(item => item.h))} mm · b ${sectionCatalogueRange(drawings.map(item => item.b))} mm · t ${sectionCatalogueRange(drawings.map(item => item.t))} mm`;
  }
  if (family.key === "shs") {
    return `${count} checked sizes · b = d ${sectionCatalogueRange(drawings.map(item => item.b))} mm · t ${sectionCatalogueRange(drawings.map(item => item.t))} mm`;
  }
  if (["ub", "uc", "pfc"].includes(family.key)) {
    return `${count} checked sizes · overall d ${sectionCatalogueRange(drawings.map(item => item.d))} mm`;
  }
  if (family.key === "ea") {
    return `${count} checked sizes · equal leg ${sectionCatalogueRange(drawings.map(item => item.b))} mm · nominal t ${sectionCatalogueRange(drawings.map(item => item.t))} mm`;
  }
  if (family.key === "rod") {
    return `${count} checked sizes · diameter ${sectionCatalogueRange(drawings.map(item => item.D))} mm`;
  }
  return `${count} checked sizes`;
}

function populateSectionCatalogueDesignations(recalculate = true) {
  const family = selectedSectionCatalogueFamily();
  syncSectionCatalogueFamilyTabs();
  $("sectionCatalogueCoverage").textContent = sectionCatalogueCoverageText(family);
  $("sectionCatalogueDesignation").innerHTML = family.sections
    .map(section => `<option value="${safeText(section.id)}">${safeText(section.designation)}</option>`)
    .join("");
  if (family.sections.length) $("sectionCatalogueDesignation").value = family.sections[0].id;
  syncSectionMaterialControls(true);
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
  syncSectionCatalogueFamilyTabs();
  syncSectionMaterialControls(true);
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
  if (kind === "area") output.textContent = displayGroupedFixed(property.value, 1);
  else if (kind === "decimal") output.textContent = displayGroupedFixed(property.value, 2);
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
    ? displayGroupedFixed(secondary.value, 2)
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
    ? displayGroupedFixed(alternate.value, 1)
    : "—";
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

function applySectionCircularZeroInterpretation(property, shape) {
  const raw = property && typeof property === "object" ? property.value : property;
  if ((shape === "circle" || shape === "chs") && Number.isFinite(Number(raw)) && Math.abs(Number(raw)) <= 1e-9) {
    $("sectionIwBasis").textContent = `${sectionBasisLabel(property)} · zero by rotational symmetry`;
  }
}

function setSectionDerivations(content, summary) {
  const card = $("sectionDerivationsCard");
  const hasContent = Boolean(String(content || "").trim());
  $("sectionFormulaSteps").innerHTML = hasContent ? content : "";
  $("sectionCalculationSummary").textContent = summary || "Calculated values only";
  card.hidden = !hasContent;
  if (!hasContent) card.open = false;
}

function catalogueDerivedPropertyLabels(properties, angleAxes) {
  const axisOne = angleAxes ? "n" : "x";
  const axisTwo = angleAxes ? "p" : "y";
  return [
    ["Centroid x̄", properties.cx],
    ["Centroid ȳ", properties.cy],
    ["Gross area Ag", properties.area],
    [`Second moment I${axisOne}`, properties.ix],
    [`Second moment I${axisTwo}`, properties.iy],
    [`Elastic modulus Z${axisOne}`, properties.zx],
    [`Elastic modulus Z${axisTwo}`, properties.zy],
    [`Plastic modulus S${axisOne}`, properties.sx],
    [`Plastic modulus S${axisTwo}`, properties.sy],
    [`Radius r${axisOne}`, properties.rx],
    [`Radius r${axisTwo}`, properties.ry],
    ["St Venant torsion J", properties.j],
    ["Warping constant Iw", properties.iw],
    ["Shear-centre offset XO", properties.xo],
    ["Shear reference area", properties.aw],
    [`Polar second moment I${axisOne} + I${axisTwo}`, properties.jp],
    [`Product of inertia I${angleAxes ? "np" : "xy"}`, properties.ixy],
    ["Principal second moments", properties.iu],
    ["Principal radii", properties.ru],
    ["Principal-axis angle", properties.thetaU]
  ]
    .filter(([, property]) => property?.value !== null && String(sectionBasisLabel(property)).startsWith("Derived"))
    .map(([label]) => label);
}

function sectionPropertyNumber(property) {
  const raw = property && typeof property === "object" ? property.value : property;
  return raw === null || raw === undefined || raw === "" ? NaN : Number(raw);
}

function catalogueDerivedTraceRows(section, properties, familyKey) {
  const drawing = section.drawing || {};
  const derived = property => String(sectionBasisLabel(property)).startsWith("Derived");
  const number = property => sectionPropertyNumber(property);
  const rows = [];

  if (familyKey === "chs") {
    const D = Number(drawing.D);
    const t = Number(drawing.t);
    const inner = D - 2 * t;
    rows.push(
      calculationTraceRow({
        title: "Circular hollow-section area",
        formula: `A<sub>g</sub> = &pi;[D<sup>2</sup> - (D - 2t)<sup>2</sup>]/4`,
        substitution: `&pi;[${displayGroupedFixed(D, 1, false)}<sup>2</sup> - ${displayGroupedFixed(inner, 1, false)}<sup>2</sup>]/4`,
        result: `A<sub>g</sub> = ${formatArea(number(properties.area))}`,
        applicability: "Ideal concentric circular geometry from catalogue nominal D and t."
      }),
      calculationTraceRow({
        title: "Circular hollow-section second moment",
        formula: `I = &pi;[D<sup>4</sup> - (D - 2t)<sup>4</sup>]/64`,
        substitution: `&pi;[${displayGroupedFixed(D, 1, false)}<sup>4</sup> - ${displayGroupedFixed(inner, 1, false)}<sup>4</sup>]/64`,
        result: `I<sub>x</sub> = I<sub>y</sub> = ${sectionPowerValue(number(properties.ix))} mm<sup>4</sup>`,
        applicability: "Any centroidal diameter is an equivalent principal axis."
      }),
      calculationTraceRow({
        title: "Circular hollow-section moduli and radius",
        formula: `Z = 2I/D; r = &radic;(I/A<sub>g</sub>); J = 2I`,
        substitution: `I = ${sectionPowerValue(number(properties.ix))} mm<sup>4</sup>; D = ${displayGroupedFixed(D, 1, false)} mm; A<sub>g</sub> = ${displayGroupedFixed(number(properties.area), 1, false)} mm<sup>2</sup>`,
        result: `Z = ${sectionPowerValue(number(properties.zx))} mm<sup>3</sup>; r = ${displayGroupedFixed(number(properties.rx), 2, false)} mm; J = ${sectionPowerValue(number(properties.j))} mm<sup>4</sup>`,
        applicability: "Geometric properties only; capacity and local slenderness are excluded."
      })
    );
  } else if (familyKey === "rod") {
    const D = Number(drawing.D);
    rows.push(
      calculationTraceRow({
        title: "Solid round geometry",
        formula: `A<sub>g</sub> = &pi;D<sup>2</sup>/4; I = &pi;D<sup>4</sup>/64`,
        substitution: `D = ${displayGroupedFixed(D, 1, false)} mm`,
        result: `A<sub>g</sub> = ${formatArea(number(properties.area))}; I<sub>x</sub> = I<sub>y</sub> = ${sectionPowerValue(number(properties.ix))} mm<sup>4</sup>`,
        applicability: "Ideal solid circular geometry from the selected catalogue diameter."
      }),
      calculationTraceRow({
        title: "Solid round moduli and radius",
        formula: `Z = 2I/D; S = D<sup>3</sup>/6; r = D/4; J = 2I`,
        substitution: `D = ${displayGroupedFixed(D, 1, false)} mm; I = ${sectionPowerValue(number(properties.ix))} mm<sup>4</sup>`,
        result: `Z = ${sectionPowerValue(number(properties.zx))} mm<sup>3</sup>; S = ${sectionPowerValue(number(properties.sx))} mm<sup>3</sup>; r = ${displayGroupedFixed(number(properties.rx), 2, false)} mm; J = ${sectionPowerValue(number(properties.j))} mm<sup>4</sup>`,
        applicability: "Geometric properties only; catalogue mass remains a published value."
      })
    );
  } else {
    if (derived(properties.cx) || derived(properties.cy)) {
      const centroidFormula = familyKey === "pfc" ? `y&#772; = d/2` : `x&#772; = b<sub>f</sub>/2; y&#772; = d/2`;
      const centroidResult = familyKey === "pfc"
        ? `y&#772; = ${displayGroupedFixed(number(properties.cy), 2, false)} mm`
        : `x&#772; = ${displayGroupedFixed(number(properties.cx), 2, false)} mm; y&#772; = ${displayGroupedFixed(number(properties.cy), 2, false)} mm`;
      rows.push(calculationTraceRow({
        title: "Symmetry-derived centroid",
        formula: centroidFormula,
        substitution: section.dimensions,
        result: centroidResult,
        applicability: familyKey === "pfc" ? "Horizontal symmetry only; catalogue X<sub>L</sub> controls the other coordinate." : "Doubly symmetric nominal section."
      }));
    }
    if (derived(properties.aw)) {
      rows.push(calculationTraceRow({
        title: "Clear web reference area",
        formula: `A<sub>w</sub> = t<sub>w</sub>(d - 2t<sub>f</sub>)`,
        substitution: `t<sub>w</sub> = ${displayGroupedFixed(drawing.tw, 1, false)} mm; d = ${displayGroupedFixed(drawing.d, 1, false)} mm; t<sub>f</sub> = ${displayGroupedFixed(drawing.tf, 1, false)} mm`,
        result: `A<sub>w</sub> = ${formatArea(number(properties.aw))}`,
        applicability: "Geometric clear web area; not a design-standard effective shear area."
      }));
    }
    if (derived(properties.jp)) {
      rows.push(calculationTraceRow({
        title: "Polar second moment",
        formula: `J<sub>p</sub> = I<sub>x</sub> + I<sub>y</sub>`,
        substitution: `${sectionPowerValue(number(properties.ix))} + ${sectionPowerValue(number(properties.iy))} mm<sup>4</sup>`,
        result: `J<sub>p</sub> = ${sectionPowerValue(number(properties.jp))} mm<sup>4</sup>`,
        applicability: "Geometric polar second moment; not the St Venant torsion constant J."
      }));
    }
    if (derived(properties.iu) && derived(properties.iv)) {
      rows.push(calculationTraceRow({
        title: "Principal second moments",
        formula: `I<sub>u,v</sub> = (I<sub>x</sub> + I<sub>y</sub>)/2 &plusmn; &radic;[((I<sub>x</sub> - I<sub>y</sub>)/2)<sup>2</sup> + I<sub>xy</sub><sup>2</sup>]`,
        substitution: `I<sub>xy</sub> = ${sectionSignedPowerValue(number(properties.ixy))} mm<sup>4</sup>`,
        result: `I<sub>u</sub> = ${sectionPowerValue(number(properties.iu))} mm<sup>4</sup>; I<sub>v</sub> = ${sectionPowerValue(number(properties.iv))} mm<sup>4</sup>`,
        applicability: "Derived geometric principal values; symmetric sections retain their centroidal directions."
      }));
    }
  }

  return rows.join("");
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
  if (hasSupplementary && !cardVisibility.sectionJCard && !cardVisibility.sectionIwCard && !cardVisibility.sectionXoCard) {
    const polarOnly = cardVisibility.sectionJpCard && !cardVisibility.sectionAwCard;
    $("sectionSupplementaryTitle").textContent = polarOnly ? "Supplementary geometric reference" : "Supplementary geometric references";
    $("sectionSupplementaryDescription").textContent = polarOnly
      ? "Polar second moment about the displayed centroidal axes."
      : "Applicable clear-wall or clear-web area and polar second-moment references.";
  }

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
  setSectionDerivations("", "Unavailable for invalid geometry");
  $("sectionPropertiesDiagram").closest(".section-properties-figure").hidden = true;
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
      : shape === "i" || shape === "channel" || shape === "tee"
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
    applySectionCircularZeroInterpretation(customValue(properties.iw), shape);
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
    $("sectionPropertiesWarning").textContent = "Ideal geometry only. Material-dependent design values, capacity and stability are not evaluated.";
    $("sectionSourceSummary").textContent = "Ideal geometry · no product-table values";
    $("sectionSourceDetails").innerHTML = `<p><b>Status</b> &mdash; Draft. Values are derived from the entered dimensions and do not represent a verified manufacturer section.</p><p><b>Geometry</b> &mdash; ideal sharp-corner rectangular components or ideal circular geometry. ${shearReferenceText}; it is not a design-standard effective shear area.</p>`;
    setSectionDerivations([
      calculationTraceRow({
        title: "Gross area and geometry model",
        formula: `A = &Sigma;s<sub>i</sub>A<sub>i</sub>`,
        substitution: `${sectionCompositionText(shape)} ${sectionDimensionText(shape)}`,
        result: `Gross area A = ${formatArea(properties.area)}`,
        applicability: "Ideal sharp-corner rectangular components or ideal circular geometry; subtract void components where applicable."
      }),
      calculationTraceRow({
        title: "Centroid",
        formula: `x&#772; = &Sigma;s<sub>i</sub>A<sub>i</sub>x<sub>i</sub>/A; y&#772; = &Sigma;s<sub>i</sub>A<sub>i</sub>y<sub>i</sub>/A`,
        substitution: `Entered component geometry; A = ${displayGroupedFixed(properties.area, 1, false)} mm<sup>2</sup>`,
        result: `x&#772; = ${displayGroupedFixed(properties.cx, 2, false)} mm; y&#772; = ${displayGroupedFixed(properties.cy, 2, false)} mm`,
        applicability: "Coordinates are measured from the displayed lower-left geometry datum."
      }),
      calculationTraceRow({
        title: "Second moments of area",
        formula: `I = &Sigma;s<sub>i</sub>(I<sub>c,i</sub> + A<sub>i</sub>d<sub>i</sub><sup>2</sup>)`,
        substitution: "Entered component dimensions and calculated centroid.",
        result: `I<sub>${axisOne}</sub> = ${formatInertia(properties.ix)}; I<sub>${axisTwo}</sub> = ${formatInertia(properties.iy)}`,
        applicability: "Centroidal axes shown in the section diagram."
      }),
      calculationTraceRow({
        title: "Elastic section moduli",
        formula: `Z = I/c`,
        substitution: `I<sub>${axisOne}</sub> and I<sub>${axisTwo}</sub> divided by each extreme-fibre distance`,
        result: `Z<sub>${axisOne},T</sub> = ${sectionPowerValue(properties.zxTop)} mm<sup>3</sup>; Z<sub>${axisOne},B</sub> = ${sectionPowerValue(properties.zxBottom)} mm<sup>3</sup>; Z<sub>${axisTwo},R</sub> = ${sectionPowerValue(properties.zyRight)} mm<sup>3</sup>; Z<sub>${axisTwo},L</sub> = ${sectionPowerValue(properties.zyLeft)} mm<sup>3</sup>`,
        applicability: "Geometric elastic moduli; no effective-section reduction is applied."
      }),
      calculationTraceRow({
        title: "Plastic section moduli",
        formula: `S = &Sigma;A<sub>i</sub>|d<sub>i,PNA</sub>|`,
        substitution: "Plastic neutral axis selected to divide the gross area equally.",
        result: `S<sub>${axisOne}</sub> = ${sectionPowerValue(properties.sx)} mm<sup>3</sup>; S<sub>${axisTwo}</sub> = ${sectionPowerValue(properties.sy)} mm<sup>3</sup>`,
        applicability: Number.isFinite(properties.plasticCx) && Number.isFinite(properties.plasticCy)
          ? `x<sub>PNA</sub> = ${displayGroupedFixed(properties.plasticCx, 2, false)} mm; y<sub>PNA</sub> = ${displayGroupedFixed(properties.plasticCy, 2, false)} mm from the lower-left datum.`
          : "Closed-form plastic modulus for the selected ideal symmetric geometry."
      }),
      calculationTraceRow({
        title: "Radii of gyration",
        formula: `r = &radic;(I/A)`,
        substitution: `r<sub>${axisOne}</sub> = &radic;(${sectionPowerValue(properties.ix)} / ${displayGroupedFixed(properties.area, 1, false)}); r<sub>${axisTwo}</sub> = &radic;(${sectionPowerValue(properties.iy)} / ${displayGroupedFixed(properties.area, 1, false)})`,
        result: `r<sub>${axisOne}</sub> = ${displayGroupedFixed(properties.rx, 2, false)} mm; r<sub>${axisTwo}</sub> = ${displayGroupedFixed(properties.ry, 2, false)} mm`,
        applicability: "Gross-section geometric radii."
      }),
      calculationTraceRow({
        title: "Principal properties",
        formula: `I<sub>u,v</sub> = (I<sub>x</sub> + I<sub>y</sub>)/2 &plusmn; &radic;[((I<sub>x</sub> - I<sub>y</sub>)/2)<sup>2</sup> + I<sub>xy</sub><sup>2</sup>]`,
        substitution: `I<sub>${angleAxes ? "np" : "xy"}</sub> = ${sectionSignedPowerValue(properties.ixy)} mm<sup>4</sup>`,
        result: `I<sub>${principalOne}</sub> = ${sectionPowerValue(properties.iu)} mm<sup>4</sup>; I<sub>${principalTwo}</sub> = ${sectionPowerValue(properties.iv)} mm<sup>4</sup>; &theta;<sub>${principalOne}</sub> = ${Number.isFinite(properties.thetaU) ? displayGroupedFixed(properties.thetaU, 2, false) + "&deg;" : "indeterminate"}`,
        applicability: `${angleAxes ? "Angle measured counter-clockwise from +n. " : ""}Principal properties are geometric only.`
      }),
      shape === "rhs" ? calculationTraceRow({
        title: "Wall reference areas",
        formula: `A<sub>wy</sub> = 2t(h - 2t); A<sub>wx</sub> = 2t(b - 2t)`,
        substitution: sectionDimensionText(shape),
        result: `A<sub>wy</sub> = ${sectionPowerValue(properties.awy)} mm<sup>2</sup>; A<sub>wx</sub> = ${sectionPowerValue(properties.awx)} mm<sup>2</sup>`,
        applicability: "Geometric wall reference areas; not design-standard effective shear areas."
      }) : "",
      calculationTraceRow({
        title: "Polar second moment",
        formula: `J<sub>p</sub> = I<sub>${axisOne}</sub> + I<sub>${axisTwo}</sub>`,
        substitution: `${sectionPowerValue(properties.ix)} + ${sectionPowerValue(properties.iy)} mm<sup>4</sup>`,
        result: `J<sub>p</sub> = ${sectionPowerValue(properties.jp)} mm<sup>4</sup>`,
        applicability: "This is not the St Venant torsion constant J except for circular sections."
      }),
      calculationTraceRow({
        title: "Torsion boundary",
        result: "J and Iw shown only where a reviewed closed-form relationship is implemented",
        applicability: "Effective properties, classification, design capacity, stability, actions and utilisation are excluded."
      })
    ].join(""), "Entered-geometry calculations");
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
  const catalogueDataBasis = family.key === "chs"
    ? properties.area?.basis === "catalogue"
      ? "Published catalogue properties + derived circular references"
      : "Catalogue mass + nominal D/t-derived properties"
    : family.key === "rod"
      ? "Catalogue mass/diameter + geometry-derived properties"
      : "Catalogue values + identified derived references";
  setSectionSummary("Selected catalogue section", section.designation, section.dimensions || "Dimensions not available in the current checked row", [
    { label: "Section family", value: sectionCatalogueFamilyNames[family.key] || family.label },
    { label: "Reference axes", value: axisDisplay },
    { label: "Data basis", value: catalogueDataBasis },
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
  applySectionCircularZeroInterpretation(properties.iw, section.drawing.shape);
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
        <div><dt>Actual t</dt><dd>${displayGroupedFixed(aux.actualT.value, 1, false)} <small>mm</small></dd></div>
        <div><dt>Root radius r<sub>1</sub></dt><dd>${displayGroupedFixed(aux.rootRadius.value, 1, false)} <small>mm</small></dd></div>
        <div><dt>Toe radius r<sub>2</sub></dt><dd>${displayGroupedFixed(aux.toeRadius.value, 1, false)} <small>mm</small></dd></div>
        <div><dt>Far-edge distance</dt><dd>n<sub>R</sub> = p<sub>T</sub> = ${displayGroupedFixed(aux.centroidFar.value, 1, false)} <small>mm</small></dd></div>
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

  $("sectionPropertiesWarning").textContent = "Catalogue gaps remain unavailable. Capacity and member checks are excluded.";
  $("sectionSourceSummary").textContent = `${source.publisher} · ${source.status}`;
  $("sectionSourceDetails").innerHTML = `<p><b>Source</b> &mdash; ${safeText(source.publisher)}, <i>${safeText(source.document)}</i>.</p><p><b>Verification</b> &mdash; ${safeText(source.status)}. This lookup remains Draft.</p>`;
  const derivedLabels = catalogueDerivedPropertyLabels(properties, angleAxes);
  const derivedTrace = catalogueDerivedTraceRows(section, properties, family.key);
  setSectionDerivations(
    derivedTrace,
    derivedLabels.length ? "Formula, substitution and result for derived values" : "No calculated values"
  );
}

function calculateSectionProperties() {
  if (sectionPropertiesMode === "custom") calculateCustomSectionProperties();
  else calculateCatalogueSectionProperties();

  const material = selectedSectionMaterial();
  const designRecord = sectionCheckedDesignRecord();
  renderSectionMaterial(material, designRecord);
  renderSectionDesignAttributes(designRecord, material.grade);
  const thicknessBasisLabel = {
    catalogue: "catalogue-linked",
    geometry: "linked to entered geometry",
    manual: "manual override",
    project: "project input"
  }[material.thicknessBasis] || "entered";
  $("sectionSourceDetails").insertAdjacentHTML("beforeend", `<p><b>Material basis</b> &mdash; ${safeText(material.source)}; ${safeText(material.thicknessLabel)} ${Number.isFinite(material.thickness) ? `= ${displayGroupedFixed(material.thickness, 1)} mm` : "not resolved"} (${safeText(thicknessBasisLabel)}). f<sub>y</sub> / f<sub>u</sub> are ${material.strengthBasis === "project" ? "project inputs" : "standard lookup values"}; confirm the supplied product test certificate before design issue.</p>`);
}

function beamWebShearReduction(section, grade) {
  const fyw = grade.fyw || grade.fy;
  if (!(section.d1 > 0) || !(section.tw > 0) || !(fyw > 0)) {
    return {
      alphaV: 1,
      slenderness: NaN,
      threshold: 82,
      basis: "Web slenderness is not available for this quick lookup."
    };
  }
  const reduction = BeamSectionCapacity.unstiffenedWebShearReduction(section.d1, section.tw, fyw);
  const { slenderness, threshold, alphaV } = reduction;
  return {
    alphaV,
    slenderness,
    threshold,
    basis: slenderness <= threshold
      ? `${section.customGeometry ? "Ideal custom" : "Catalogue"} web shear yield governs for this quick screen.`
      : `Unstiffened web shear-buckling reduction applied for this ${section.customGeometry ? "ideal custom" : "catalogue"} quick screen.`
  };
}

const beamDirectionMemory = Object.create(null);

function beamDimensionOverrideActive() {
  return Boolean($("beamDimensionOverride")?.checked);
}

function selectedBeamCatalogueSection() {
  const sections = beamCatalogueSections();
  return sections.find(section => section.designation === $("beamSection").value) || sections[0] || null;
}

function beamCustomDimensions() {
  if (beamFamily === "ub" || beamFamily === "uc") return { d: value("beamDimID"), bf: value("beamDimIBf"), tw: value("beamDimITw"), tf: value("beamDimITf") };
  if (beamFamily === "pfc") return { d: value("beamDimPfcD"), bf: value("beamDimPfcBf"), tw: value("beamDimPfcTw"), tf: value("beamDimPfcTf") };
  if (beamFamily === "chs") return { D: value("beamDimChsD"), t: value("beamDimChsT") };
  if (beamFamily === "rhs") return { d: value("beamDimRhsD"), b: value("beamDimRhsB"), t: value("beamDimRhsT") };
  if (beamFamily === "shs") return { b: value("beamDimShsB"), t: value("beamDimShsT") };
  if (beamFamily === "ea") return { b: value("beamDimEaB"), t: value("beamDimEaT") };
  return { D: value("beamDimRodD") };
}

function beamCustomMaterial() {
  return BeamCustomSection.resolveMaterial({
    family: beamFamily,
    productForm: $("beamCustomMaterialForm").value,
    grade: $("beamGrade").value,
    dimensions: beamCustomDimensions(),
    fy: value("beamFyInput"),
    fyw: value("beamFywInput"),
    fu: value("beamFuInput")
  });
}

function beamCustomGradeRecords() {
  const material = beamCustomMaterial();
  if (material.status !== "resolved") return {};
  const directionRecords = Object.fromEntries(BeamCustomSection.directions(beamFamily).map(key => [key, { Ze: 0, compactness: null }]));
  return {
    [material.grade]: {
      fy: material.fy,
      fyw: material.fyw,
      fu: material.fu,
      directions: directionRecords,
      sourceRef: material.source
    }
  };
}

function beamCustomSection() {
  return {
    ...BeamCustomSection.build(beamFamily, beamCustomDimensions()),
    grades: beamCustomGradeRecords()
  };
}

function selectedBeamSection() {
  return beamDimensionOverrideActive() ? beamCustomSection() : selectedBeamCatalogueSection();
}

function beamDirections() {
  const directions = beamFamilyDefinitions[beamFamily].directions;
  if (!beamDimensionOverrideActive()) return directions;
  const supported = BeamCustomSection.directions(beamFamily);
  return directions.filter(([key]) => supported.includes(key));
}

function populateBeamDirections() {
  const directions = beamDirections();
  if (!directions.length) {
    $("beamDirection").innerHTML = "";
    $("beamDirectionGroup").hidden = true;
    return;
  }
  const previous = beamDirectionMemory[beamFamily];
  const selected = directions.some(([key]) => key === previous) ? previous : directions[0][0];
  const catalogueCase = !beamDimensionOverrideActive() && (beamFamily === "pfc" || beamFamily === "ea");
  $("beamDirection").innerHTML = directions.map(([key, label]) => `<option value="${key}">${label}</option>`).join("");
  $("beamDirection").value = selected;
  $("beamDirectionGroup").hidden = directions.length === 1;
  $("beamDirectionHeading").textContent = catalogueCase ? "Catalogue bending case" : "Bending direction";
  $("beamDirectionFieldLabel").textContent = catalogueCase ? "Catalogue case" : "Direction";
  $("beamDirection").setAttribute("aria-label", catalogueCase ? "Catalogue bending case" : "Bending direction");
  $("beamDirectionHelp").textContent = beamDimensionOverrideActive()
    ? beamFamily === "pfc"
      ? "Custom x-x capacity is derived. Load A/B remains Not evaluated without a reviewed asymmetric effective-modulus path."
      : beamFamily === "ea"
        ? "Custom angle geometry is generated, but Load A/B/C/D capacity remains Not evaluated without a reviewed direction-specific effective modulus."
        : "Select the bending direction used for the derived ideal-section properties."
    : beamFamily === "pfc"
      ? "Load A is toward the web; Load B is toward the flange tips. The arrows define bending sign, not the load application point."
      : beamFamily === "ea"
        ? "Load A/B/C/D defines the catalogue principal-axis bending sign and compression side shown in the section figure."
        : "Select the catalogue load direction used for the effective section modulus.";
  beamDirectionMemory[beamFamily] = selected;
}

function setBeamDimensionDefaults(section) {
  if (!section) return;
  const set = (id, number) => {
    if ($(id) && Number(number) > 0) $(id).value = Number(number).toFixed(1);
  };
  if (beamFamily === "ub" || beamFamily === "uc") {
    set("beamDimID", section.d);
    set("beamDimIBf", section.bf);
    set("beamDimITw", section.tw);
    set("beamDimITf", section.tf);
  } else if (beamFamily === "pfc") {
    set("beamDimPfcD", section.d);
    set("beamDimPfcBf", section.bf);
    set("beamDimPfcTw", section.tw);
    set("beamDimPfcTf", section.tf);
  } else if (beamFamily === "chs") {
    set("beamDimChsD", section.D);
    set("beamDimChsT", section.t);
  } else if (beamFamily === "rhs") {
    set("beamDimRhsD", section.d);
    set("beamDimRhsB", section.b);
    set("beamDimRhsT", section.t);
  } else if (beamFamily === "shs") {
    set("beamDimShsB", section.b || section.d);
    set("beamDimShsT", section.t);
  } else if (beamFamily === "ea") {
    set("beamDimEaB", section.b);
    set("beamDimEaT", section.t);
  } else if (beamFamily === "rod") {
    set("beamDimRodD", section.diameter || section.D);
  }
}

function updateBeamDimensionUi() {
  const active = beamDimensionOverrideActive();
  const customSupported = BeamCustomSection.directions(beamFamily).length > 0;
  $("beamDimensionOverride").disabled = !customSupported;
  $("beamDimensionFields").hidden = !active;
  document.querySelectorAll("[data-beam-dim]").forEach(field => {
    field.hidden = !field.dataset.beamDim.split(/\s+/).includes(beamFamily);
  });
  beamDimensionInputIds.forEach(id => {
    const input = $(id);
    if (!input) return;
    const applicable = input.closest("[data-beam-dim]")?.dataset.beamDim.split(/\s+/).includes(beamFamily);
    input.disabled = !active || !applicable;
  });
  $("beamSectionField").hidden = active;
  $("beamCustomMaterialField").hidden = !active;
  const materialBasisResolved = !active || Boolean($("beamCustomMaterialForm").value);
  $("beamGradeField").hidden = !materialBasisResolved;
  $("beamFyField").hidden = !materialBasisResolved;
  $("beamFywField").hidden = !materialBasisResolved || !["ub", "uc", "pfc"].includes(beamFamily);
  $("beamFuField").hidden = !materialBasisResolved;
  $("beamMaterialFields").classList.toggle("is-custom", active);
  $("beamSection").setAttribute("aria-label", "Catalogue beam section");
  $("beamSectionSource").textContent = active
    ? "Entered ideal dimensions; select an explicit material basis before capacity is evaluated."
    : !customSupported
      ? `${beamFamilyDefinitions[beamFamily].source} Custom dimensions are unavailable here; use Section Properties for ideal angle geometry.`
    : beamFamilyDefinitions[beamFamily].source;
  $("beamDimensionStatus").hidden = !active;
}

function populateBeamCustomMaterialForms(reset = false) {
  const select = $("beamCustomMaterialForm");
  const previous = reset ? "" : select.value;
  const forms = BeamCustomSection.productForms(beamFamily);
  select.innerHTML = `<option value="">Select material basis</option>${forms.map(form => `<option value="${form}">${SteelMaterials.PRODUCT_FORMS[form].label}${form === "project" ? "" : " basis"}</option>`).join("")}`;
  select.value = forms.includes(previous) ? previous : "";
}

function populateBeamOptions() {
  const sections = beamCatalogueSections();
  const previous = $("beamSection").value;
  const fallback = beamFamilyDefinitions[beamFamily].defaultSection;
  if (!sections.length) {
    $("beamSection").innerHTML = `<option value="">No checked Beam rows</option>`;
    $("beamSection").disabled = true;
  } else {
    $("beamSection").disabled = false;
    $("beamSection").innerHTML = sections.map(section => `<option value="${section.designation}">${section.designation}</option>`).join("");
    $("beamSection").value = sections.some(section => section.designation === previous) ? previous : (sections.some(section => section.designation === fallback) ? fallback : sections[0].designation);
  }
  populateBeamCustomMaterialForms(true);
  populateBeamDirections();
  populateBeamGrades();
}

function beamMaterialDefaults() {
  if (beamDimensionOverrideActive()) {
    const material = BeamCustomSection.resolveMaterial({
      family: beamFamily,
      productForm: $("beamCustomMaterialForm").value,
      grade: $("beamGrade").value,
      dimensions: beamCustomDimensions()
    });
    return {
      fy: Number(material.fy) > 0 ? Number(material.fy) : 0,
      fyw: Number(material.fyw) > 0 ? Number(material.fyw) : 0,
      fu: Number(material.fu) > 0 ? Number(material.fu) : 0
    };
  }
  const section = selectedBeamCatalogueSection();
  const grade = section?.grades?.[$("beamGrade").value] || null;
  const fy = Number(grade?.fy);
  const fyw = Number(grade?.fyw || grade?.fy);
  const gradeName = $("beamGrade").value;
  let standardStrength = null;
  if (["ub", "uc", "pfc", "ea"].includes(beamFamily)) {
    standardStrength = SteelMaterials.hotRolledStrength(gradeName, section?.tf || section?.actualT || section?.t);
  } else if (["chs", "rhs", "shs"].includes(beamFamily)) {
    standardStrength = SteelMaterials.hollowStrength(gradeName);
  } else if (beamFamily === "rod") {
    standardStrength = SteelMaterials.roundBarStrength(gradeName, section?.diameter || section?.D);
  }
  const fu = Number(grade?.fu || standardStrength?.fu);
  return {
    fy: Number.isFinite(fy) && fy > 0 ? fy : 0,
    fyw: Number.isFinite(fyw) && fyw > 0 ? fyw : 0,
    fu: Number.isFinite(fu) && fu > 0 ? fu : 0
  };
}

function resetBeamMaterialStrengths() {
  const defaults = beamMaterialDefaults();
  $("beamFyInput").value = defaults.fy || "";
  $("beamFywInput").value = defaults.fyw || "";
  $("beamFuInput").value = defaults.fu || "";
  calculateBeam();
}

function populateBeamGrades() {
  const custom = beamDimensionOverrideActive();
  const section = selectedBeamCatalogueSection();
  const previous = $("beamGrade").value;
  const form = $("beamCustomMaterialForm").value;
  const grades = custom
    ? form ? SteelMaterials.gradeOptions(form) : []
    : section ? Object.keys(section.grades || {}) : [];
  if (!grades.length) {
    $("beamGrade").innerHTML = `<option value="">Not available</option>`;
    $("beamGrade").disabled = true;
  } else {
    $("beamGrade").disabled = false;
    $("beamGrade").innerHTML = grades.map(grade => `<option value="${grade}">${SteelMaterials.gradeLabel(grade)}</option>`).join("");
    $("beamGrade").value = grades.includes(previous) ? previous : grades[0];
  }
  if (!custom) setBeamDimensionDefaults(section);
  updateBeamDimensionUi();
  resetBeamMaterialStrengths();
}

function setBeamFamily(family) {
  if (!beamFamilyDefinitions[family]) return;
  beamFamily = family;
  $("beamDimensionOverride").checked = false;
  $("beamFamily").value = family;
  document.querySelectorAll(".beam-family").forEach(button => {
    const active = button.dataset.beamFamily === beamFamily;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  populateBeamOptions();
}

function beamAxisProperties(section, direction) {
  if (!section) return { I: 0, Z: 0, S: 0 };
  if (section.axes) return section.axes[direction] || { I: 0, Z: 0, S: 0 };
  if ((section.family === "ub" || section.family === "uc") && direction === "x") return { I: section.I, Z: section.Zx, S: section.Sx };
  if (section.family === "pfc" && direction === "x") return { I: section.I, Z: section.Zx, S: section.Sx };
  if ((section.family === "chs" || section.family === "rod") && direction === "axis") return { I: section.I, Z: section.Zx, S: section.Sx };
  return { I: 0, Z: 0, S: 0 };
}

function beamDirectionSubscript(direction) {
  if (direction === "x") return "x";
  if (direction === "y" || direction.startsWith("y-")) return "y";
  if (direction === "a" || direction === "c") return "x";
  if (direction === "b" || direction === "d") return "y";
  return "";
}

function beamDirectionLoadCase(direction) {
  if (direction === "y-a" || direction === "a") return "Load A";
  if (direction === "y-b" || direction === "b") return "Load B";
  if (direction === "c") return "Load C";
  if (direction === "d") return "Load D";
  return "";
}

function beamDiagramProperties(section) {
  if (!section?.drawing) return null;
  if (section.geometryProperties) return section.geometryProperties;
  try { return idealDrawingProperties(section.drawing); } catch (error) { return null; }
}

function renderBeamSectionDiagram(section) {
  const svg = $("beamSectionDiagram");
  if (!section?.drawing) {
    const custom = Boolean(section?.customGeometry);
    svg.innerHTML = `<title id="beamSectionDiagramTitle">No valid section geometry</title><desc id="beamSectionDiagramDescription">${custom ? "Entered dimensions do not define a valid ideal section." : "No section geometry is available for the selected catalogue family."}</desc>`;
    $("beamSectionDiagramCaption").textContent = custom ? "Enter valid family dimensions" : "No checked catalogue geometry";
    return;
  }
  const drawing = section.drawing;
  const properties = beamDiagramProperties(section);
  const shape = drawing.shape;
  const width = shape === "rhs" ? drawing.b : shape === "circle" || shape === "chs" ? drawing.D : shape === "angle" ? drawing.b : drawing.bf;
  const height = shape === "rhs" ? drawing.h : shape === "circle" || shape === "chs" ? drawing.D : shape === "angle" ? drawing.b : drawing.d;
  if (!(width > 0) || !(height > 0) || !properties) return;
  const scale = Math.min(108 / width, 112 / height);
  const w = width * scale;
  const h = height * scale;
  const x0 = 120 - w / 2;
  const y0 = 82 - h / 2;
  const line = number => Number(number).toFixed(2);
  const thickness = number => Math.max(3, Math.min(number * scale, Math.min(w, h) * 0.24));
  let geometry = "";
  if (shape === "circle" || shape === "chs") {
    geometry = `<circle class="section-properties-shape" cx="120" cy="82" r="${line(w / 2)}" />`;
    if (shape === "chs") geometry += `<circle class="section-properties-void" cx="120" cy="82" r="${line(Math.max(1, w / 2 - thickness(drawing.t)))}" />`;
  } else if (shape === "rhs") {
    const t = thickness(drawing.t);
    geometry = `<path class="section-properties-shape" fill-rule="evenodd" d="M ${line(x0)} ${line(y0)} H ${line(x0 + w)} V ${line(y0 + h)} H ${line(x0)} Z M ${line(x0 + t)} ${line(y0 + t)} V ${line(y0 + h - t)} H ${line(x0 + w - t)} V ${line(y0 + t)} Z" />`;
  } else if (shape === "i") {
    const tw = thickness(drawing.tw);
    const tf = thickness(drawing.tf);
    const wl = x0 + (w - tw) / 2;
    geometry = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + w)} V ${line(y0 + tf)} H ${line(wl + tw)} V ${line(y0 + h - tf)} H ${line(x0 + w)} V ${line(y0 + h)} H ${line(x0)} V ${line(y0 + h - tf)} H ${line(wl)} V ${line(y0 + tf)} H ${line(x0)} Z" />`;
  } else if (shape === "angle") {
    const t = thickness(drawing.t);
    geometry = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + t)} V ${line(y0 + h - t)} H ${line(x0 + w)} V ${line(y0 + h)} H ${line(x0)} Z" />`;
  } else {
    const tw = thickness(drawing.tw);
    const tf = thickness(drawing.tf);
    geometry = `<path class="section-properties-shape" d="M ${line(x0)} ${line(y0)} H ${line(x0 + w)} V ${line(y0 + tf)} H ${line(x0 + tw)} V ${line(y0 + h - tf)} H ${line(x0 + w)} V ${line(y0 + h)} H ${line(x0)} Z" />`;
  }
  const axisX = x0 + properties.cx * scale;
  const axisY = y0 + h - properties.cy * scale;
  const direction = $("beamDirection").value || beamDirections()[0][0];
  const xActive = ["x", "axis", "xy", "a", "c"].includes(direction);
  const yActive = ["y", "y-a", "y-b", "axis", "xy", "b", "d"].includes(direction);
  const xStart = Math.max(12, x0 - 18);
  const xEnd = Math.min(226, x0 + w + 21);
  const yStart = Math.min(154, y0 + h + 17);
  const yEnd = Math.max(10, y0 - 18);
  let loadMarkup = "";
  let axisMarkup = "";
  let auxiliaryMarkup = "";
  if (shape === "channel" && direction.startsWith("y-")) {
    const fromLeft = direction === "y-a";
    const startX = fromLeft ? 20 : 220;
    const endX = fromLeft ? Math.max(31, x0 - 5) : Math.min(209, x0 + w + 5);
    loadMarkup = `<line class="beam-load-arrow" x1="${line(startX)}" y1="154" x2="${line(endX)}" y2="154" marker-end="url(#beamLoadArrow)" /><text class="beam-load-label" x="${line(startX)}" y="166" text-anchor="${fromLeft ? "start" : "end"}">${direction === "y-a" ? "Load A" : "Load B"}</text>`;
  } else if (shape === "angle") {
    const axisLength = Math.min(54, Math.max(42, Math.min(w, h) * 0.48));
    axisMarkup = `<line class="section-properties-axis${xActive ? " is-active" : ""}" x1="${line(axisX - axisLength)}" y1="${line(axisY + axisLength)}" x2="${line(axisX + axisLength)}" y2="${line(axisY - axisLength)}" marker-end="url(#beamAxisArrow)" /><line class="section-properties-axis${yActive ? " is-active" : ""}" x1="${line(axisX - axisLength)}" y1="${line(axisY - axisLength)}" x2="${line(axisX + axisLength)}" y2="${line(axisY + axisLength)}" marker-end="url(#beamAxisArrow)" /><text class="section-properties-axis-label" x="${line(axisX + axisLength + 4)}" y="${line(axisY - axisLength + 2)}">x</text><text class="section-properties-axis-label" x="${line(axisX - axisLength - 4)}" y="${line(axisY - axisLength + 2)}" text-anchor="end">y</text>`;
    const loadOffset = Math.min(39, axisLength - 7);
    const loadEnd = 7;
    const load = {
      a: [axisX - loadOffset, axisY - loadOffset, axisX - loadEnd, axisY - loadEnd, -7, -5, "end"],
      b: [axisX + loadOffset, axisY - loadOffset, axisX + loadEnd, axisY - loadEnd, 7, -5, "start"],
      c: [axisX + loadOffset, axisY + loadOffset, axisX + loadEnd, axisY + loadEnd, 7, 11, "start"],
      d: [axisX - loadOffset, axisY + loadOffset, axisX - loadEnd, axisY + loadEnd, -7, 11, "end"]
    }[direction];
    if (load) loadMarkup = `<line class="beam-load-arrow" x1="${line(load[0])}" y1="${line(load[1])}" x2="${line(load[2])}" y2="${line(load[3])}" marker-end="url(#beamLoadArrow)" /><text class="beam-load-label" x="${line(load[0] + load[4])}" y="${line(load[1] + load[5])}" text-anchor="${load[6]}">Load ${direction.toUpperCase()}</text>`;
  }
  if (!axisMarkup) axisMarkup = `<line class="section-properties-axis${xActive ? " is-active" : ""}" x1="${line(xStart)}" y1="${line(axisY)}" x2="${line(xEnd)}" y2="${line(axisY)}" marker-end="url(#beamAxisArrow)" /><line class="section-properties-axis${yActive ? " is-active" : ""}" x1="${line(axisX)}" y1="${line(yStart)}" x2="${line(axisX)}" y2="${line(yEnd)}" marker-end="url(#beamAxisArrow)" /><text class="section-properties-axis-label" x="${line(xEnd - 1)}" y="${line(axisY - 7)}" text-anchor="end">x-x</text><text class="section-properties-axis-label" x="${line(axisX + 7)}" y="${line(yEnd + 9)}">y-y</text>`;
  if (shape === "channel" && drawing.xO > 0) {
    const shearCentreX = x0 - drawing.xO * scale;
    auxiliaryMarkup = `<line class="beam-shear-centre-guide" x1="${line(shearCentreX)}" y1="${line(axisY)}" x2="${line(x0)}" y2="${line(axisY)}" /><circle class="beam-shear-centre" cx="${line(shearCentreX)}" cy="${line(axisY)}" r="3.2" /><text class="beam-shear-centre-label" x="${line(shearCentreX)}" y="${line(axisY - 8)}" text-anchor="middle">SC</text>`;
  }
  const title = `${section.designation} section`;
  const custom = Boolean(section.customGeometry);
  const description = shape === "angle"
    ? `${custom ? "Ideal custom" : "Catalogue"} equal-angle schematic showing the x and y principal axes and selected Load A, B, C or D direction.`
    : shape === "channel"
      ? `${custom ? "Ideal custom" : "Catalogue"} channel schematic showing centroidal axes${custom ? "" : ", shear centre"} and selected bending direction.`
      : "Value-driven section schematic showing centroidal x-x and y-y axes and the selected bending direction.";
  svg.innerHTML = `<title id="beamSectionDiagramTitle">${safeText(title)} and selected bending direction</title><desc id="beamSectionDiagramDescription">${description}</desc><defs><marker id="beamAxisArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M 0 0 L 7 3.5 L 0 7 Z"></path></marker><marker id="beamLoadArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 Z"></path></marker></defs>${geometry}${axisMarkup}${auxiliaryMarkup}<circle class="section-properties-centroid" cx="${line(axisX)}" cy="${line(axisY)}" r="3.4" />${loadMarkup}`;
  $("beamSectionDiagramCaption").textContent = custom
    ? "Entered ideal dimensions · selected direction"
    : shape === "angle"
      ? "Catalogue principal axes · selected load direction"
      : shape === "channel"
        ? "Catalogue centroid and shear centre · selected direction"
        : "Catalogue geometry · selected direction";
}

function setBeamOutput(id, value, available) {
  const output = $(id);
  output.textContent = available ? fixed(value) : "Not evaluated";
  output.parentElement.classList.toggle("is-unavailable", !available);
  const unit = output.nextElementSibling;
  if (unit) unit.hidden = !available;
}

function formatBeamUtilisation(value) {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value - 1) < 1e-9) return "1.00";
  if (value > 1 && value < 1.005) return ">1.00";
  if (value < 1 && value > 0.995) return "<1.00";
  return displayFixed(value, 2);
}

function formatBeamInteractionRatio(value) {
  if (!Number.isFinite(value)) return "—";
  const nearBranch = Math.abs(value - 0.75) < 0.001 || Math.abs(value - 1) < 0.001;
  return displayFixed(value, nearBranch ? 6 : 2);
}

function formatBeamInteractionFactor(value) {
  if (!Number.isFinite(value)) return "—";
  return value < 1 && value > 0.995 ? displayFixed(value, 6) : displayFixed(value, 3);
}

function calculateBeam() {
  const section = selectedBeamSection();
  const customDimensions = beamDimensionOverrideActive();
  const direction = $("beamDirection").value || beamDirections()[0][0];
  beamDirectionMemory[beamFamily] = direction;
  const gradeName = $("beamGrade").value;
  const gradeBase = section?.grades?.[gradeName] || null;
  const customMaterial = customDimensions ? beamCustomMaterial() : null;
  const defaults = beamMaterialDefaults();
  const fyInput = value("beamFyInput");
  const separateWebStrength = ["ub", "uc", "pfc"].includes(beamFamily);
  const fywInput = separateWebStrength ? value("beamFywInput") : fyInput;
  const fuInput = value("beamFuInput");
  const customMaterialForm = customDimensions ? $("beamCustomMaterialForm").value : "";
  const customProjectMaterial = customMaterialForm === "project";
  const strengthClose = (actual, expected) => actual > 0 && expected > 0 && Math.abs(actual - expected) <= 0.01;
  const momentOverride = Boolean(gradeBase && !customProjectMaterial && !strengthClose(fyInput, defaults.fy));
  const webOverride = Boolean(gradeBase && !customProjectMaterial && separateWebStrength && !strengthClose(fywInput, defaults.fyw));
  const ultimateOverride = Boolean(gradeBase && !customProjectMaterial && !strengthClose(fuInput, defaults.fu));
  const materialOverride = momentOverride || webOverride || ultimateOverride;
  const maximumYield = Math.max(fyInput, separateWebStrength ? fywInput : fyInput);
  const materialValid = Boolean(fyInput > 0 && (!separateWebStrength || fywInput > 0) && fuInput > 0 && fuInput >= maximumYield);
  $("beamFywField").hidden = (customDimensions && !customMaterialForm) || !separateWebStrength;
  $("beamFyInput").setAttribute("aria-invalid", String(!(fyInput > 0) || (fuInput > 0 && fuInput < fyInput)));
  $("beamFywInput").setAttribute("aria-invalid", String(separateWebStrength && (!(fywInput > 0) || (fuInput > 0 && fuInput < fywInput))));
  $("beamFuInput").setAttribute("aria-invalid", String(!(fuInput > 0) || fuInput < maximumYield));
  $("beamMaterialStatus").textContent = customDimensions && !customMaterialForm
    ? "Select material basis"
    : !materialValid
      ? "Check fy / fu values"
      : customProjectMaterial
        ? "Project / legacy material"
    : materialOverride
      ? "User override"
      : customDimensions
        ? "Standard material lookup"
        : "Catalogue default";
  $("beamMaterialReset").disabled = !materialOverride || customProjectMaterial;
  const materialResetLabel = customDimensions ? "Restore standard material strengths" : "Restore catalogue material strengths";
  $("beamMaterialReset").title = materialResetLabel;
  $("beamMaterialReset").setAttribute("aria-label", materialResetLabel);
  const directionCapacity = gradeBase?.directions?.[direction] || null;
  const gradeForEvaluation = gradeBase && materialValid
    ? { ...gradeBase, fy: fyInput, fyw: separateWebStrength ? fywInput : fyInput, fu: fuInput }
    : null;
  const coordination = customDimensions || momentOverride
    ? BeamSectionReconciliation.deriveProject(section, gradeForEvaluation, direction)
    : BeamSectionReconciliation.reconcile(section, gradeForEvaluation, direction);
  const grade = gradeBase && directionCapacity
    ? {
        ...gradeBase,
        ...directionCapacity,
        fy: fyInput,
        fyw: separateWebStrength ? fywInput : fyInput,
        fu: fuInput,
        Ze: coordination.status === "derived" ? coordination.expectedZe : directionCapacity.Ze,
        kf: coordination.status === "derived" ? coordination.expectedKf : gradeBase.kf,
        compactness: coordination.status === "derived"
          ? coordination.expectedClass
          : directionCapacity.compactness || coordination.expectedClass || null
      }
    : null;
  const axis = beamAxisProperties(section, direction);
  const subscript = beamDirectionSubscript(direction);
  const symbol = subscript || "";
  const loadCase = beamDirectionLoadCase(direction);
  const loadCaseHtml = loadCase ? ` &middot; ${loadCase}` : "";
  const directionLabel = beamDirections().find(([key]) => key === direction)?.[1] || "—";
  const momentAvailable = Boolean(
    section?.capacityStatus === "checked"
    && ["reconciled", "derived"].includes(coordination.status)
    && materialValid
    && grade?.fy > 0
    && grade?.Ze > 0
  );
  const rolledWebShear = Boolean(grade?.fyw > 0 && section?.shearMethod === "rolled-web" && direction === "x" && section.Aw > 0);
  const chsSectionShear = Boolean(grade?.fy > 0 && section?.shearMethod === "chs-section" && direction === "axis" && section.area > 0);
  const rhsWebShear = Boolean(grade?.fy > 0 && section?.shearMethod === "rhs-web" && ["x", "y", "xy"].includes(direction));
  const hollowShearDirection = direction === "y" ? "y" : "x";
  const hollowWeb = rhsWebShear
    ? BeamSectionCapacity.rectangularHollowShear(grade.fyw || grade.fy, section.d, section.b, section.t, hollowShearDirection)
    : null;
  const shearAvailable = Boolean(grade && (rolledWebShear || chsSectionShear || hollowWeb));
  const interactionAvailable = Boolean(momentAvailable && (rolledWebShear || hollowWeb) && section?.interactionMethod === "flat-web");
  const phi = BeamSectionCapacity.PHI;
  const momentCapacity = momentAvailable ? BeamSectionCapacity.sectionMoment(grade.fy, grade.Ze * 1000, phi) : NaN;
  const webShear = rolledWebShear ? beamWebShearReduction(section, grade) : { alphaV: 1, slenderness: NaN, threshold: 82, basis: "Not applicable." };
  const shearCapacity = rolledWebShear
    ? BeamSectionCapacity.rolledWebShear(grade.fyw || grade.fy, section.Aw, webShear.alphaV, phi)
    : chsSectionShear
      ? BeamSectionCapacity.circularHollowShear(grade.fy, section.area, phi)
      : hollowWeb?.designCapacity ?? NaN;
  const momentDemand = value("beamMomentDemand");
  const shearDemand = value("beamShearDemand");
  const momentRatio = momentAvailable && momentCapacity > 0 ? momentDemand / momentCapacity : NaN;
  const interactionDemand = interactionAvailable
    ? BeamSectionCapacity.momentShearDemandCheck(momentDemand, momentCapacity, shearDemand, shearCapacity)
    : null;
  const interaction = interactionDemand?.interaction || null;
  const interactionShearCapacity = interactionAvailable ? interaction.designShearCapacity : shearAvailable ? shearCapacity : NaN;
  const shearRatio = interactionAvailable
    ? interactionDemand.shearRatio
    : shearAvailable && interactionShearCapacity > 0 ? shearDemand / interactionShearCapacity : NaN;
  const hasDemand = momentDemand > 0 || (shearAvailable && shearDemand > 0);
  const combinedDemand = momentDemand > 0 && shearAvailable && shearDemand > 0;
  const allDemandPathsAvailable = momentAvailable && (!combinedDemand || interactionAvailable);
  const utilisation = allDemandPathsAvailable
    ? interactionAvailable
      ? interactionDemand.utilisation
      : Math.max(momentDemand > 0 ? momentRatio : 0, shearAvailable && shearDemand > 0 ? shearRatio : 0)
    : NaN;

  const displayedGrade = customProjectMaterial ? "Project-defined steel" : SteelMaterials.gradeLabel(gradeName) || "material unresolved";
  $("beamDesignation").textContent = section ? `${section.designation} · ${displayedGrade}` : `${beamFamilyDefinitions[beamFamily].label} · no checked Beam row`;
  $("beamAssumption").textContent = momentAvailable
    ? `${directionLabel} section moment${rolledWebShear || hollowWeb ? " and web shear" : chsSectionShear ? " and CHS shear" : ""}${customDimensions ? "; ideal custom geometry" : materialOverride ? "; project strength override" : ""}; member checks excluded.`
    : customDimensions
      ? `${directionLabel}; custom geometry generated, capacity path not established.`
      : materialOverride
      ? `${directionLabel}; project strength path not evaluated.`
      : `${directionLabel}; reviewed capacity row unavailable.`;
  updateBeamSummaryDimensions(section || {});
  if (hollowWeb) setBeamSummaryCell("beamDimD1", formatBeamDimension(hollowWeb.clearWebDepth), false);
  setBeamSummaryCell("beamMass", formatBeamOptional(section?.mass, "kg/m", 1), !(section?.mass > 0));
  setBeamSummaryCell("beamArea", formatBeamArea(section?.area), !(section?.area > 0));
  const displayedShearArea = hollowWeb?.webArea || section?.Aw;
  setBeamSummaryCell("beamAw", formatBeamArea(displayedShearArea), !shearAvailable);
  $("beamSummaryAreaLabel").innerHTML = chsSectionShear ? "A<sub>e</sub>" : "A<sub>w</sub>";
  const summaryDirectionLabel = beamFamily === "ea" && !customDimensions
    ? `${directionLabel} · principal ${symbol}-${symbol}`
    : directionLabel;
  setBeamSummaryCell("beamSummaryDirection", summaryDirectionLabel, false);
  setBeamSummaryCell("beamSummaryI", formatBeamInertia(axis.I), !(axis.I > 0));
  setBeamSummaryCell("beamSummaryZx", formatBeamModulus(axis.Z), !(axis.Z > 0));
  setBeamSummaryCell("beamSummarySx", formatBeamModulus(axis.S), !(axis.S > 0));
  setBeamSummaryCell("beamZex", formatBeamModulus(momentAvailable ? grade.Ze : 0), !momentAvailable);
  setBeamSummaryCell("beamFy", grade?.fy > 0 ? `${formatBeamNumber(grade.fy, 0)} MPa` : "-", !(grade?.fy > 0));
  setBeamSummaryCell("beamFyw", rolledWebShear || hollowWeb ? `${formatBeamNumber(grade.fyw || grade.fy, 0)} MPa` : "-", !(rolledWebShear || hollowWeb));
  setBeamSummaryCell("beamSummaryKf", grade?.kf > 0 ? displayFixed(grade.kf, 3) : "-", !(grade?.kf > 0));
  setBeamSummaryCell("beamCompactness", compactnessText(grade?.compactness), !grade?.compactness);
  setBeamSummaryCell(
    "beamCoordination",
    coordination.status === "reconciled" ? "Reconciled" : coordination.status === "derived" ? "Derived" : "Unresolved",
    false
  );
  const summarySource = customDimensions
    ? `${section?.sourceRef || "Entered ideal geometry"}; ${customMaterial?.source || "material basis not selected"}`
    : gradeBase?.sourceRef || section?.sourceRef || section?.sourceBasis || "—";
  setBeamSummaryCell("beamSummarySource", `${summarySource}${materialOverride ? " · project strength override" : ""}`, !section);
  $("beamSummaryILabel").innerHTML = symbol ? `I<sub>${symbol}</sub>` : "I";
  $("beamSummaryZLabel").innerHTML = symbol ? `Z<sub>${symbol}</sub>` : "Z";
  $("beamSummarySLabel").innerHTML = symbol ? `S<sub>${symbol}</sub>` : "S";
  $("beamSummaryZeLabel").innerHTML = `${symbol ? `Z<sub>e${symbol}</sub>` : "Z<sub>e</sub>"}${loadCaseHtml}`;
  $("beamMomentResultLabel").innerHTML = `Design section moment capacity &phi;M<sub>s${symbol}</sub>${loadCaseHtml}`;
  $("beamMomentResultBasis").innerHTML = momentAvailable
    ? `${coordination.status === "derived" || beamFamily === "rod" ? "Derived" : "Catalogue"} Z<sub>e${symbol}</sub>${loadCaseHtml} · AS 4100 Cl. 5.2`
    : "Required f<sub>y,m</sub> / Z<sub>e</sub> / direction record unavailable";
  $("beamShearResultLabel").innerHTML = chsSectionShear
    ? "Design section shear capacity &phi;V<sub>v</sub>"
    : "Design web shear capacity &phi;V<sub>v</sub>";
  $("beamShearResultBasis").innerHTML = chsSectionShear
    ? "0.36 f<sub>y</sub>A<sub>e</sub> · AS 4100 Cl. 5.11.4"
    : "d<sub>p</sub> = d<sub>1</sub> for slenderness; A<sub>w</sub> = dt<sub>w</sub> · AS 4100 Cl. 5.11.4";
  if (hollowWeb) {
    $("beamShearResultBasis").innerHTML = "Two webs + non-uniform shear stress &middot; AS 4100 Cl. 5.11.3 to AS 4100 Cl. 5.11.5";
  }
  setBeamOutput("beamSectionCapacity", momentCapacity, momentAvailable);
  setBeamOutput("beamShearCapacity", shearCapacity, shearAvailable);
  $("beamShearCard").hidden = !shearAvailable;
  $("beamResultsGrid").classList.toggle("is-single", !shearAvailable);
  $("beamShearDemandField").hidden = !shearAvailable;
  $("beamDemandBasis").innerHTML = shearAvailable
      ? interactionAvailable
      ? `M* / &phi;M<sub>s${symbol}</sub>${loadCaseHtml} and AS 4100 Cl. 5.12.3 web-shear interaction.`
      : `Individual M* and V* ratios; combined moment/shear interaction is not evaluated.`
    : momentAvailable
      ? `M* / &phi;M<sub>s${symbol}</sub>${loadCaseHtml}; shear and combined action are not evaluated.`
      : "No utilisation is reported until the selected moment-capacity path is available.";
  $("beamUtilisation").textContent = !hasDemand ? "—" : formatBeamUtilisation(utilisation);
  $("beamStatus").textContent = !momentAvailable
    ? "Not evaluated"
    : !hasDemand
      ? "No design action"
      : !allDemandPathsAvailable
        ? "Combined action not evaluated"
        : utilisation > 1 ? "Section check FAIL" : "Section check PASS";
  $("beamStatus").className = !momentAvailable || !allDemandPathsAvailable || !hasDemand ? "check" : utilisation > 1 ? "fail" : "pass";
  const resultStatus = $("beamResultStatus");
  const shearOnlyAvailable = !momentAvailable && shearAvailable;
  resultStatus.textContent = !section || section.invalidReason
    ? customDimensions ? "Not evaluated · enter valid family dimensions" : "Not evaluated · checked catalogue row unavailable"
    : shearOnlyAvailable
      ? "Partial result · shear calculated; moment not evaluated"
    : momentAvailable
      ? `For Review · ${directionLabel}${shearAvailable ? " moment and shear calculated" : " moment calculated"}`
      : customDimensions
        ? "Geometry complete · design capacity not evaluated for this direction"
        : materialOverride
        ? "Not evaluated · project strength path unavailable"
        : "Not evaluated · reviewed capacity row unavailable";
  resultStatus.className = `beam-result-status${momentAvailable || shearOnlyAvailable ? " is-review" : " is-unavailable"}`;
  $("beamWarning").textContent = shearOnlyAvailable
    ? "Shear section resistance is calculated from the valid web-strength path. Moment and combined action remain not evaluated until the member-strength path is valid."
    : !momentAvailable
    ? (section?.invalidReason || coordination.reason || "The selected family, grade or direction does not have a reconciled effective section modulus. No capacity or PASS / FAIL is reported.")
    : shearAvailable
      ? "Section resistance only. Member capacity, lateral restraint, web bearing, concentrated loads and serviceability remain excluded."
      : "Moment section capacity only. Shear, combined action and member checks are not evaluated for this family.";
  $("beamDrawingNote").textContent = customDimensions
    ? "Diagram and gross properties follow entered ideal dimensions; product radii are omitted."
    : "Diagram follows selected catalogue dimensions; properties come from the cited table.";
  $("beamSectionDetailsLabel").textContent = customDimensions
    ? "Entered dimensions and automatically derived properties"
    : "Dimensions and supplementary catalogue properties";
  $("beamDimensionStatus").hidden = !customDimensions;
  if (customDimensions) {
    $("beamDimensionStatus").innerHTML = section?.invalidReason
      ? safeText(section.invalidReason)
      : `Derived ideal geometry: A<sub>g</sub> = ${formatBeamArea(section.area)}; mass = ${formatBeamOptional(section.mass, "kg/m", 1)}.`;
  }
  renderBeamSectionDiagram(section);

  const source = customDimensions
    ? `${section?.sourceRef || "Entered ideal geometry"}; ${customMaterial?.source || "material basis not selected"}`
    : gradeBase?.sourceRef || section?.sourceRef || beamFamilyDefinitions[beamFamily].source;
  const geometryStep = section
    ? `${section.designation}; A<sub>g</sub> = ${formatBeamArea(section.area)}; source = ${source}`
    : `${beamFamilyDefinitions[beamFamily].label}; no valid section geometry is available`;
  const propertySubscript = symbol ? `<sub>${symbol}</sub>` : "";
  const directionStep = `${directionLabel}; I${propertySubscript} = ${formatBeamInertia(axis.I)}; Z${propertySubscript} = ${formatBeamModulus(axis.Z)}; S${propertySubscript} = ${formatBeamModulus(axis.S)}`;
  const editionStep = customDimensions
    ? coordination.status === "derived"
      ? `Ideal sharp-corner section. Section class and Z<sub>e</sub> are independently generated from entered dimensions and the adopted strength. ${coordination.basis}.`
      : `Custom geometry only. ${coordination.reason || "A reviewed family-specific effective-modulus path is not available for this direction."}`
    : beamFamily !== "rod"
    ? coordination.status === "reconciled"
      ? `Reconciled against AS 4100 Cl. 5.2 and AS 4100 Cl. 6.2. ${coordination.basis}.`
      : coordination.status === "derived"
        ? `Project strength override. Section class and Z<sub>e</sub> are independently regenerated from the catalogue geometry. ${coordination.basis}.`
        : `Unresolved: ${coordination.reason || "the product row and AS 4100 calculation basis do not agree."}`
    : beamFamily === "rod"
      ? `Z<sub>e</sub> is generated from the compact solid-circle relation using the checked catalogue diameter and ${materialOverride ? "project" : "selected grade"} strength.`
      : "The selected catalogue row is not reconciled.";
  const classStep = ["reconciled", "derived"].includes(coordination.status)
    ? `${compactnessText(grade?.compactness)}; ${coordination.classMethod === "published-ze-interval" ? "class inferred from the published load-case Z<sub>e</sub> position between the AS 4100 elastic and compact bounds" : `governing plate element = ${coordination.governing?.name || "solid section"}`}.`
    : "Not reconciled.";
  const demandStep = !hasDemand ? "No design action entered."
    : interactionDemand?.failureMode === "moment"
      ? `M* / &phi;M<sub>s${symbol}</sub>${loadCaseHtml} = ${displayFixed(momentRatio, 2)} &gt; 1.00; section moment FAIL. Reduced shear capacity is not applicable because the design moment already exceeds &phi;M<sub>s${symbol}</sub>.`
    : Number.isFinite(utilisation) ? `Governing section utilisation = ${formatBeamUtilisation(utilisation)}; ${utilisation > 1 ? "section check FAIL" : "section check PASS"}.`
      : "Combined action not evaluated because one or more required capacity paths are unavailable.";
  const materialStep = `f<sub>y,m</sub> = ${fyInput > 0 ? `${formatBeamNumber(fyInput, 0)} MPa` : "invalid"}${separateWebStrength ? `; f<sub>y,w</sub> = ${fywInput > 0 ? `${formatBeamNumber(fywInput, 0)} MPa` : "invalid"}` : ""}; f<sub>u</sub> = ${fuInput > 0 ? `${formatBeamNumber(fuInput, 0)} MPa` : "invalid"}. ${customProjectMaterial ? "Project / legacy material values" : materialOverride ? `User override; standard defaults ${formatBeamNumber(defaults.fy, 0)}${separateWebStrength ? ` / ${formatBeamNumber(defaults.fyw, 0)}` : ""} / ${formatBeamNumber(defaults.fu, 0)} MPa` : customDimensions ? "Explicit standard material lookup for entered geometry" : "Catalogue default"}. f<sub>u</sub> confirms the material record and is not used in the current section moment or shear equations.`;
  const zeBasis = coordination.status === "derived"
    ? customDimensions ? "derived from entered geometry and adopted strength" : "independently regenerated from the entered project strength"
    : beamFamily === "rod"
      ? "compact solid-circle relation"
      : "reconciled catalogue capacity row";
  const shearFormula = rolledWebShear
    ? `&lambda;<sub>v</sub> = (d<sub>p</sub>/t<sub>w</sub>)&radic;(f<sub>y,w</sub>/250); &alpha;<sub>v</sub> = min[1, (82/&lambda;<sub>v</sub>)<sup>2</sup>]; &phi;V<sub>v</sub> = &phi;&alpha;<sub>v</sub>0.6f<sub>y,w</sub>A<sub>w</sub>`
    : chsSectionShear
      ? `&phi;V<sub>v</sub> = &phi;0.36f<sub>y</sub>A<sub>e</sub>`
      : hollowWeb
        ? `A<sub>w</sub> = 2td<sub>p</sub>; V<sub>u</sub> = &alpha;<sub>v</sub>0.6f<sub>y</sub>A<sub>w</sub>; &rho; = f<sub>vm</sub><sup>*</sup>/f<sub>va</sub><sup>*</sup>; V<sub>v</sub> = min[V<sub>u</sub>, 2V<sub>u</sub>/(0.9 + &rho;)]; &phi;V<sub>v</sub> = 0.90V<sub>v</sub>`
        : "";
  const shearSubstitution = !shearAvailable
    ? ""
    : rolledWebShear
      ? `&lambda;<sub>v</sub> = (${formatBeamNumber(section.d1, 1)}/${formatBeamNumber(section.tw, 1)})&radic;(${formatBeamNumber(grade.fyw || grade.fy, 0)}/250) = ${displayFixed(webShear.slenderness, 2)}; &alpha;<sub>v</sub> = min[1, (82/${displayFixed(webShear.slenderness, 2)})<sup>2</sup>] = ${displayFixed(webShear.alphaV, 3)}; A<sub>w</sub> = ${formatBeamNumber(section.d, 1)} &times; ${formatBeamNumber(section.tw, 1)} = ${formatBeamNumber(section.Aw, 0)} mm<sup>2</sup>; 0.90 &times; ${displayFixed(webShear.alphaV, 3)} &times; 0.6 &times; ${formatBeamNumber(grade.fyw || grade.fy, 0)} MPa &times; ${formatBeamNumber(section.Aw, 0)} mm<sup>2</sup> / 1000`
      : chsSectionShear
        ? `0.90 &times; 0.36 &times; ${formatBeamNumber(grade.fy, 0)} MPa &times; ${formatBeamNumber(section.area, 0)} mm<sup>2</sup> / 1000`
      : `d<sub>p</sub> = ${formatBeamNumber(hollowWeb.clearWebDepth, 1)} mm; A<sub>w</sub> = 2 &times; ${formatBeamNumber(section.t, 1)} &times; ${formatBeamNumber(hollowWeb.clearWebDepth, 1)} = ${formatBeamNumber(hollowWeb.webArea, 0)} mm<sup>2</sup>; &lambda;<sub>v</sub> = (${formatBeamNumber(hollowWeb.clearWebDepth, 1)}/${formatBeamNumber(section.t, 1)})&radic;(${formatBeamNumber(grade.fyw || grade.fy, 0)}/250) = ${displayFixed(hollowWeb.slenderness, 2)}; &alpha;<sub>v</sub> = min[1, (82/${displayFixed(hollowWeb.slenderness, 2)})<sup>2</sup>] = ${displayFixed(hollowWeb.alphaV, 3)}; &rho; = ${displayFixed(hollowWeb.stressRatio, 3)}; V<sub>v</sub> = min(${fixed(hollowWeb.shearYieldCapacity)}, ${fixed(hollowWeb.nonUniformCapacity)}) = ${fixed(hollowWeb.nominalCapacity)} kN; &phi;V<sub>v</sub> = 0.90 &times; ${fixed(hollowWeb.nominalCapacity)} = ${fixed(hollowWeb.designCapacity)} kN`;
  const utilisationFormula = interactionAvailable
    ? `m = M<sup>*</sup>/&phi;M<sub>s</sub>; &beta;<sub>v</sub> = 1.0 for m &le; 0.75, otherwise 2.2 - 1.6m; &eta; = max(m, V<sup>*</sup>/(&beta;<sub>v</sub>&phi;V<sub>v</sub>))`
    : `&eta; = max(M<sup>*</sup>/&phi;M<sub>s</sub>, V<sup>*</sup>/&phi;V<sub>v</sub>)`;
  const utilisationSubstitution = !hasDemand
    ? ""
    : interactionAvailable && interactionDemand?.failureMode !== "moment"
      ? `m = ${fixed(momentDemand)}/${fixed(momentCapacity)} = ${formatBeamInteractionRatio(momentRatio)}; &beta;<sub>v</sub> = ${formatBeamInteractionFactor(interaction.factor)}; V<sup>*</sup>/(&beta;<sub>v</sub>&phi;V<sub>v</sub>) = ${fixed(shearDemand)}/${fixed(interactionShearCapacity)} = ${formatBeamUtilisation(shearRatio)}`
      : interactionDemand?.failureMode === "moment"
        ? `m = ${fixed(momentDemand)}/${fixed(momentCapacity)} = ${formatBeamInteractionRatio(momentRatio)}`
        : `M<sup>*</sup> = ${fixed(momentDemand)} kN&middot;m${shearAvailable ? `; V<sup>*</sup> = ${fixed(shearDemand)} kN` : ""}`;
  $("beamFormulaSteps").innerHTML = [
    calculationTraceRow({
      title: "Section and source",
      lookup: source,
      selection: section ? `${section.designation}; ${directionLabel}` : beamFamilyDefinitions[beamFamily].label,
      adopted: section ? `A<sub>g</sub> = ${formatBeamArea(section.area)}` : "No checked Beam row",
      applicability: geometryStep
    }),
    calculationTraceRow({
      title: "Material strength",
      lookup: customProjectMaterial ? "Project / legacy material" : materialOverride ? "Project / legacy override" : customDimensions ? "Explicit standard material lookup" : "Catalogue default",
      selection: displayedGrade,
      adopted: `f<sub>y,m</sub> = ${fyInput > 0 ? `${formatBeamNumber(fyInput, 0)} MPa` : "invalid"}${separateWebStrength ? `; f<sub>y,w</sub> = ${fywInput > 0 ? `${formatBeamNumber(fywInput, 0)} MPa` : "invalid"}` : ""}; f<sub>u</sub> = ${fuInput > 0 ? `${formatBeamNumber(fuInput, 0)} MPa` : "invalid"}`,
      applicability: materialStep
    }),
    calculationTraceRow({
      title: "Bending direction and properties",
      lookup: customDimensions ? "Derived ideal section-property record." : "Selected catalogue section-property record.",
      selection: directionLabel,
      adopted: directionStep,
      applicability: "Properties correspond to the selected bending direction and load case."
    }),
    calculationTraceRow({
      title: "Section class",
      reference: "AS 4100 Cl. 5.2.2 to AS 4100 Cl. 5.2.5",
      lookup: "Section classification and effective-modulus branch.",
      selection: classStep,
      adopted: momentAvailable ? compactnessText(grade?.compactness) : "Not established",
      applicability: editionStep
    }),
    calculationTraceRow({
      title: "Effective section modulus",
      reference: "AS 4100 Cl. 5.2.1",
      lookup: zeBasis,
      selection: directionLabel,
      adopted: momentAvailable ? `Z<sub>e${symbol}</sub>${loadCaseHtml} = ${formatBeamModulus(grade.Ze)}` : "Not established",
      applicability: momentAvailable ? "Direction-specific value used in section moment capacity." : "A reviewed direction-specific classification and effective modulus are required."
    }),
    calculationTraceRow({
      title: "Section form factor",
      reference: "AS 4100 Cl. 6.2",
      lookup: "Axial-compression section form factor.",
      selection: grade?.kf > 0 ? `k<sub>f</sub> = ${displayFixed(grade.kf, 3)}` : "Not established",
      adopted: grade?.kf > 0 ? displayFixed(grade.kf, 3) : "Not established",
      applicability: "Recorded for section coordination only; k<sub>f</sub> is not multiplied into M<sub>s</sub>."
    }),
    calculationTraceRow({
      title: "Section moment capacity",
      reference: "AS 4100 Cl. 5.2.1",
      formula: momentAvailable ? `&phi;M<sub>s${symbol}</sub> = &phi;f<sub>y,m</sub>Z<sub>e${symbol}</sub>` : "",
      substitution: momentAvailable ? `0.90 &times; ${formatBeamNumber(grade.fy, 0)} MPa &times; ${formatBeamNumber(grade.Ze, 1)} &times; 10<sup>3</sup> mm<sup>3</sup> / 10<sup>6</sup>` : "",
      result: momentAvailable ? `Design section moment capacity = ${fixed(momentCapacity)} kN&middot;m` : "Not evaluated",
      applicability: momentAvailable ? "Cross-section resistance in the selected direction." : "A reviewed f<sub>y,m</sub>, section class and Z<sub>e</sub> record are required."
    }),
    calculationTraceRow({
      title: "Section shear capacity",
      reference: shearAvailable
        ? chsSectionShear
          ? "AS 4100 Cl. 5.11.4"
          : hollowWeb
            ? "AS 4100 Cl. 5.11.2 to AS 4100 Cl. 5.11.5"
            : "AS 4100 Cl. 5.11.2, AS 4100 Cl. 5.11.4 and AS 4100 Cl. 5.11.5.1"
        : "",
      formula: shearFormula,
      substitution: shearSubstitution,
      result: shearAvailable ? `Design section shear capacity = ${fixed(shearCapacity)} kN` : "Not evaluated",
      applicability: shearAvailable
        ? rolledWebShear
          ? `d<sub>p</sub> = d<sub>1</sub> = ${formatBeamNumber(section.d1, 1)} mm for web slenderness; gross web area A<sub>w</sub> = dt<sub>w</sub> = ${formatBeamNumber(section.Aw, 0)} mm<sup>2</sup>.`
          : chsSectionShear
            ? "Unperforated catalogue CHS with A<sub>e</sub> = A<sub>g</sub> for this quick check."
            : `Two resisting webs; non-uniform shear-stress ratio = ${displayFixed(hollowWeb.stressRatio, 3)}.`
        : "No reviewed shear-capacity path for the selected family / direction."
    }),
    calculationTraceRow({
      title: "Design-action utilisation",
      reference: interactionAvailable ? "AS 4100 Cl. 5.12.3" : "",
      formula: hasDemand ? utilisationFormula : "",
      substitution: utilisationSubstitution,
      result: !hasDemand ? "No design action entered" : Number.isFinite(utilisation) ? `Governing utilisation = ${formatBeamUtilisation(utilisation)}; ${utilisation > 1 ? "Section check FAIL" : "Section check PASS"}` : "Not evaluated",
      applicability: demandStep
    }),
    calculationTraceRow({
      title: "Design boundary",
      result: "Cross-section resistance only",
      applicability: "Member capacity M<sub>b</sub>, lateral-torsional buckling, restraint, web bearing, concentrated loads, torsion and serviceability are excluded."
    })
  ].join("");
}

function memberDimensionOverrideActive() {
  return memberType !== "custom" && Boolean($("memberDimensionOverride")?.checked);
}

function memberDimensionLabel(properties) {
  if (memberType === "ub" || memberType === "uc") return `d = ${formatDimension(properties.d)} mm; b<sub>f</sub> = ${formatDimension(properties.bf)} mm; t<sub>w</sub> = ${formatDimension(properties.tw)} mm; t<sub>f</sub> = ${formatDimension(properties.tf)} mm`;
  if (memberType === "chs") return `D = ${formatDimension(properties.D)} mm; t = ${formatDimension(properties.t)} mm`;
  if (memberType === "rhs") return `d = ${formatDimension(properties.d)} mm; b = ${formatDimension(properties.b)} mm; t = ${formatDimension(properties.t)} mm`;
  if (memberType === "shs") return `b = d = ${formatDimension(properties.b)} mm; t = ${formatDimension(properties.t)} mm`;
  if (memberType === "rod") return `d = ${formatDimension(properties.diameter)} mm`;
  if (memberType === "ea") return `b = ${formatDimension(properties.b, 0)} mm; actual t = ${formatDimension(properties.t)} mm${properties.nominalT && Math.abs(properties.nominalT - properties.t) > 0.01 ? `; nominal t = ${formatDimension(properties.nominalT)} mm` : ""}`;
  if (memberType === "pfc") return `d = ${formatDimension(properties.d, 0)} mm; b<sub>f</sub> = ${formatDimension(properties.bf, 0)} mm; t<sub>w</sub> = ${formatDimension(properties.tw)} mm; t<sub>f</sub> = ${formatDimension(properties.tf)} mm`;
  return "User-entered effective properties";
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
  return { designation: `${leg.toFixed(0)} x ${leg.toFixed(0)} x ${thickness.toFixed(1)} EA`, area: section.area, r: section.rv, rx: section.ru, ry: section.rv, ix: section.iu, iy: section.iv, b: leg, t: thickness, customGeometry: true, principalAxisBasis: true };
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
  if (memberType === "rod") return rodGeometry(value("memberDimRodD"));
  return null;
}

function memberHollowSections(family) {
  return beamHollowSections(family).map(section => {
    const xAxis = family === "chs" ? section.axes.axis : family === "shs" ? section.axes.xy : section.axes.x;
    const yAxis = family === "chs" ? section.axes.axis : family === "shs" ? section.axes.xy : section.axes.y;
    const rx = section.rx;
    const ry = section.ry;
    return {
      ...section,
      r: Math.min(rx, ry),
      rx,
      ry,
      ix: xAxis.I,
      iy: yAxis.I,
      grades: Object.fromEntries(Object.entries(section.grades).map(([name, grade]) => {
        const strength = SteelMaterials.hollowStrength(name);
        return [name, { ...grade, fu: strength?.fu || 0 }];
      }))
    };
  });
}

function memberSections() {
  if (memberType === "ub" || memberType === "uc") {
    const sections = sectionProductDirectory[memberType];
    return sections.map(section => ({
      ...section,
      grades: Object.fromEntries(Object.entries(section.grades).map(([name, grade]) => {
        const strength = SteelMaterials.hotRolledStrength(name, Math.max(section.tw, section.tf));
        return [name, { ...grade, fu: strength?.fu || 0 }];
      }))
    }));
  }
  if (["chs", "rhs", "shs"].includes(memberType)) return memberHollowSections(memberType);
  if (memberType === "ea") return sectionProductDirectory.ea;
  if (memberType === "pfc") return sectionProductDirectory.pfc;
  if (memberType === "custom") return customSections;
  return sectionProductDirectory.rod;
}

function memberProperties(section) {
  if (memberType === "custom") {
    const area = signedValue("memberCustomArea", NaN);
    const rx = signedValue("memberCustomRx", NaN);
    const ry = signedValue("memberCustomRy", NaN);
    return { area, r: Math.min(rx, ry), rx, ry, ix: area * rx ** 2, iy: area * ry ** 2 };
  }
  const override = memberDimensionProperties(section);
  if (override) return override;
  if (memberType === "ea" && section.principalRx > 0 && section.principalRy > 0) {
    return {
      area: section.area,
      r: Math.min(section.principalRx, section.principalRy),
      rx: section.principalRx,
      ry: section.principalRy,
      ix: section.principalIx,
      iy: section.principalIy,
      b: section.b,
      t: section.actualT || section.t,
      actualT: section.actualT || section.t,
      nominalT: section.t,
      principalAxisBasis: true
    };
  }
  const rx = section.rx || section.r;
  const ry = section.ry || section.r;
  return {
    area: section.area,
    r: Math.min(rx, ry),
    rx,
    ry,
    ix: section.ix,
    iy: section.iy,
    D: section.D,
    b: section.b,
    d: section.d,
    diameter: section.diameter,
    bf: section.bf,
    t: section.t,
    tw: section.tw,
    tf: section.tf
  };
}

function memberCompressionDefaults(grade, section) {
  if (memberType === "custom") {
    return { kf: signedValue("memberCustomKf", NaN), alphaB: alphaBInput("memberCustomAlphaBx") };
  }
  return MemberCapacity.catalogueCompressionDefaults({
    family: memberType,
    catalogueKf: grade.kf,
    flangeThickness: section?.tf,
    dimensionOverride: memberDimensionOverrideActive()
  });
}

function memberAlphaBBasis(kf, section) {
  if (memberType === "custom") {
    return "user-entered by axis";
  }
  if (memberType === "chs" || memberType === "rhs" || memberType === "shs") {
    return `AS 4100 Table 6.3.3(${kf < 1 ? "B" : "A"}), cold-formed non-stress-relieved RHS and CHS`;
  }
  if (memberType === "ub" || memberType === "uc") {
    return `AS 4100 Table 6.3.3(${kf < 1 ? "B" : "A"}), hot-rolled UB and UC sections${section?.tf > 40 ? ", flange thickness over 40 mm" : ", flange thickness up to 40 mm"}`;
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

function memberKfBasisText(kf) {
  if (memberType === "custom") return "custom member input";
  if (memberDimensionOverrideActive()) {
    if (memberType === "chs" || memberType === "rod") {
      return `ideal circular geometry override; k<sub>f</sub> = ${displayFixed(kf, 3)}`;
    }
  }
  return "selected section basis";
}

function memberRadiusBasis(defaultR) {
  if (memberType === "ub" || memberType === "uc") return `r = r<sub>y</sub> = ${displayFixed(defaultR, 1)} mm from the selected InfraBuild row`;
  if (memberType === "chs") return `r = ${displayFixed(defaultR, 1)} mm from the selected Austube row`;
  if (memberType === "rhs") return `r = r<sub>min</sub> = ${displayFixed(defaultR, 1)} mm from the selected Austube row`;
  if (memberType === "shs") return `r = ${displayFixed(defaultR, 1)} mm for symmetric centroidal axes`;
  if (memberType === "rod") return `r = d/4 = ${displayFixed(defaultR, 1)} mm`;
  if (memberType === "pfc") return `r = r<sub>min</sub> = ${displayFixed(defaultR, 1)} mm`;
  if (memberType === "ea") return `r = r<sub>v</sub> = ${displayFixed(defaultR, 1)} mm about the minor principal axis`;
  return `r = ${displayFixed(defaultR, 1)} mm`;
}

function memberAxisBasisText() {
  if (["chs", "shs", "rod"].includes(memberType)) return "symmetric axes";
  if (memberType === "ea") return "minor principal axis";
  return "minor y-y axis";
}

function memberCatalogueBasisText() {
  if (memberType === "ub" || memberType === "uc") return "hot-rolled universal section";
  if (memberType === "rhs" || memberType === "shs") return "cold-formed non-stress-relieved hollow section";
  if (memberType === "pfc") return "hot-rolled channel";
  if (memberType === "chs") return "cold-formed non-stress-relieved CHS";
  if (memberType === "ea") return "hot-rolled equal angle";
  return "solid round bar";
}

function setMemberDimensionDefaults(section) {
  if (memberType === "custom" || !section) return;
  if (memberType === "chs") {
    $("memberDimChsD").value = (section.D || 0).toFixed(1);
    $("memberDimChsT").value = (section.t || 0).toFixed(1);
  }
  if (memberType === "rod") {
    $("memberDimRodD").value = (section.diameter || 0).toFixed(1);
  }
}

function updateMemberDimensionUi(properties = null) {
  const active = memberDimensionOverrideActive();
  const dimensionOverrideSupported = ["chs", "rod"].includes(memberType);
  if ($("memberDimensionCard")) $("memberDimensionCard").hidden = memberType === "custom" || !dimensionOverrideSupported;
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
    const sourceText = `${MEMBER_TYPE_LABELS[memberType]} override defines A<sub>g</sub>, r<sub>x</sub> and r<sub>y</sub> by ideal circular geometry.`;
    $("memberDimensionStatus").innerHTML = props ? `${sourceText} A<sub>g</sub> = ${formatArea(props.area)}; r<sub>x</sub> = ${displayFixed(props.rx, 1)} mm; r<sub>y</sub> = ${displayFixed(props.ry, 1)} mm.` : sourceText;
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
  return signedValue("memberRadiusInput", NaN);
}

function formatMemberUtilisation(ratio) {
  if (!Number.isFinite(ratio)) return "\u2014";
  if (ratio === 1) return "1.00";
  if (ratio > 1 && ratio < 1.005) return ">1.00";
  if (ratio < 1 && ratio > 0.995) return "<1.00";
  return displayFixed(ratio, 2);
}

function setMemberInvalidState(message, designation) {
  const validationMessage = String(message || "invalid project inputs").trim().replace(/[.]+$/, "");
  $("memberDesignation").textContent = designation;
  $("memberAssumption").textContent = "Inputs are incomplete or outside the supported axial-member scope.";
  [
    "memberSummaryAxis", "memberSummarySlenderness", "memberSummaryNetArea",
    "memberSummaryStrength", "memberSummaryCompressionFactors", "memberSummaryKt",
    "memberGeometrySummary", "memberAreaSummary", "memberMaterialSummary",
    "memberCompressionSummary", "memberTensionSummary"
  ].forEach(id => { $(id).textContent = "\u2014"; });
  $("memberNetSectionSummary").textContent = "Input required";
  $("memberNetSectionBasis").textContent = "Connection basis not evaluated.";
  document.querySelectorAll("[data-member-summary='net'], [data-member-summary='kt']").forEach(cell => { cell.hidden = true; });
  ["memberCompression", "sectionCompression", "memberTension", "memberSlenderness", "memberLambdaN", "memberAlphaC", "memberUtilisation"]
    .forEach(id => { $(id).textContent = "\u2014"; });
  ["grossYieldCapacity", "netFractureCapacity"].forEach(id => { $(id).textContent = "\u2014 kN"; });
  $("tensionGoverning").textContent = "Not evaluated";
  $("memberTensionBasis").textContent = "Input required before AS 4100 capacity checks";
  $("memberGoverning").textContent = "Not evaluated";
  $("memberUtilisationStatus").textContent = "INPUT REQUIRED";
  $("memberUtilisationStatus").className = "check";
  $("memberWarning").innerHTML = `Input required: ${validationMessage}. No axial capacity has been evaluated.`;
  $("memberFormulaSteps").innerHTML = calculationTraceRow({
    title: "Input validation",
    selection: validationMessage,
    result: "Not evaluated",
    applicability: "Enter valid project inputs before using the AS 4100 axial-member checks."
  });
}

function setMemberFieldValidity(id, valid) {
  const field = $(id);
  if (!field) return;
  if (valid) field.removeAttribute("aria-invalid");
  else field.setAttribute("aria-invalid", "true");
}

function memberNetAreaInput(properties) {
  const autoAvailable = memberType === "ea" || memberType === "pfc";
  const mode = autoAvailable ? $("memberNetAreaMode").value : "manual";
  const grossArea = properties.area;
  const holeCount = signedValue("memberHoleCount", NaN);
  const holeDiameter = signedValue("memberHoleDiameter", NaN);
  const deductionThickness = memberType === "ea"
    ? properties.t || 0
    : memberType === "pfc"
      ? signedValue("memberHoleThickness", NaN)
      : 0;
  const manualNetArea = signedValue("memberNetArea", NaN);
  let automatic = null;
  let error = "";
  if (mode === "auto") {
    try {
      automatic = MemberCapacity.straightLineNetArea({
        grossArea,
        holeCount,
        holeDiameter,
        thickness: deductionThickness
      });
    } catch (calculationError) {
      error = calculationError instanceof Error ? calculationError.message : "Invalid straight-line net-area inputs.";
    }
  }
  const automaticNetArea = automatic?.netArea ?? NaN;
  if (mode === "auto") {
    $("memberNetArea").value = Number.isFinite(automaticNetArea) ? automaticNetArea.toFixed(0) : "";
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
  const validHoleCount = mode !== "auto" || (Number.isInteger(holeCount) && holeCount >= 0 && holeCount <= 20);
  const validHoleDiameter = mode !== "auto" || (Number.isFinite(holeDiameter) && holeDiameter >= 0 && (holeCount === 0 || holeDiameter > 0));
  const validThickness = mode !== "auto" || (Number.isFinite(deductionThickness) && deductionThickness > 0);
  setMemberFieldValidity("memberHoleCount", validHoleCount);
  setMemberFieldValidity("memberHoleDiameter", validHoleDiameter);
  if (memberType === "pfc") setMemberFieldValidity("memberHoleThickness", validThickness);
  return {
    mode,
    holeCount,
    holeDiameter,
    deductionThickness,
    holeDeduction: automatic?.holeDeduction ?? NaN,
    automaticNetArea,
    netArea: mode === "auto" ? automaticNetArea : manualNetArea,
    error
  };
}

function syncMemberManualNetAreaToGross(properties) {
  const automaticHolePath = memberType === "ea" || memberType === "pfc";
  if (memberType === "custom" || automaticHolePath || !memberNetAreaTracksGross) return;
  if (!Number.isFinite(properties.area) || properties.area <= 0) return;
  $("memberNetArea").value = String(Math.floor(properties.area * 1000) / 1000);
}

function populateMemberOptions() {
  const sections = memberSections();
  $("memberSection").innerHTML = sections.map((section, index) => `<option value="${index}">${section.designation}</option>`).join("");
  const defaultDesignation = {
    ub: "310UB40.4",
    uc: "200UC46.2",
    pfc: "150PFC",
    chs: "114.3 x 3.2 CHS",
    rhs: "150 x 100 x 6 RHS",
    shs: "100 x 100 x 6 SHS",
    ea: "100 x 100 x 10 EA",
    rod: "Ø24 Round Bar"
  }[memberType];
  const defaultIndex = sections.findIndex(section => section.designation === defaultDesignation);
  $("memberSection").value = String(defaultIndex >= 0 ? defaultIndex : 0);
  populateMemberGrades();
}

function updateMemberNetSectionPresentation(properties, netArea, kt, netInput) {
  const areaAdjusted = Math.abs(netArea - properties.area) > 0.5;
  const ktAdjusted = Math.abs(kt - 1) > 0.005;
  const connectionAdjusted = areaAdjusted || ktAdjusted || netInput.holeCount > 0;
  const summary = connectionAdjusted
    ? `Connection-adjusted tension basis &middot; A<sub>n</sub> = ${displayFixed(netArea, 0)} mm&sup2; &middot; k<sub>t</sub> = ${displayFixed(kt, 2)}`
    : "Unperforated section &middot; A<sub>n</sub> = A<sub>g</sub> &middot; k<sub>t</sub> = 1.00";
  $("memberNetSectionSummary").innerHTML = summary;
  $("memberNetSectionBasis").innerHTML = summary;
  $("memberNetSectionDetails").classList.toggle("is-modified", connectionAdjusted);
  document.querySelectorAll("[data-member-summary='net'], [data-member-summary='kt']").forEach(cell => {
    cell.hidden = !connectionAdjusted;
  });
}

function populateMemberGrades() {
  const section = memberSections()[Number($("memberSection").value) || 0];
  const grades = section.grades;
  const gradeNames = Object.keys(grades);
  $("memberGrade").innerHTML = gradeNames.map(grade => `<option value="${grade}">${SteelMaterials.gradeLabel(grade)}</option>`).join("");
  const preferredGrade = ["chs", "rhs", "shs"].includes(memberType)
    ? "C350L0"
    : memberType === "custom" ? "User input" : "300PLUS";
  $("memberGrade").value = gradeNames.includes(preferredGrade) ? preferredGrade : (gradeNames[0] || "");
  setMemberDimensionDefaults(section);
  const properties = memberProperties(section);
  setMemberStrengthDefaults();
  setMemberRadiusDefault(properties);
  $("memberNetAreaMode").value = memberType === "ea" || memberType === "pfc" ? "auto" : "manual";
  $("memberHoleCount").value = "0";
  $("memberHoleDiameter").value = "0";
  $("memberHoleThickness").value = memberType === "pfc" ? (properties.tw || section.tw || 0).toFixed(1) : "0";
  const validArea = Number.isFinite(properties.area) && properties.area > 0;
  memberNetAreaTracksGross = true;
  $("memberNetArea").value = validArea ? String(Math.floor(properties.area * 1000) / 1000) : "";
  if (validArea) $("memberNetArea").max = String(properties.area);
  else $("memberNetArea").removeAttribute("max");
  $("memberKt").value = memberType === "ea" || memberType === "pfc" ? "0.85" : "1";
  calculateMember();
}

function selectedMemberGrade() {
  const section = memberSections()[Number($("memberSection").value) || 0];
  if (!section) return null;
  const gradeName = $("memberGrade").value;
  const grade = section.grades[gradeName];
  return grade ? { section, gradeName, grade } : null;
}

function setMemberStrengthDefaults() {
  const selected = selectedMemberGrade();
  if (!selected) return;
  $("memberFyInput").value = selected.grade.fy;
  $("memberFuInput").value = selected.grade.fu;
}

function updateMemberMaterialStatus(fy, fu, grade) {
  const close = (actual, expected) => Number.isFinite(actual) && Number.isFinite(expected) && Math.abs(actual - expected) <= 0.01;
  const valid = fy > 0 && fu >= fy;
  const overridden = valid && (!close(fy, grade.fy) || !close(fu, grade.fu));
  $("memberMaterialStatus").textContent = !valid
    ? "Enter valid strengths"
    : memberType === "custom"
      ? overridden ? "Project input" : "Initial project values - verify"
      : overridden ? "User override" : "Catalogue default";
  $("memberMaterialReset").disabled = !overridden;
  $("memberMaterialReset").hidden = !overridden;
  return overridden;
}

function calculateMember() {
  const selected = selectedMemberGrade();
  if (!selected) {
    setMemberInvalidState("select a valid steel grade", "INPUT REQUIRED");
    return;
  }
  const { section, gradeName, grade } = selected;
  const gradeDisplayName = SteelMaterials.gradeLabel(gradeName);
  const properties = memberProperties(section);
  syncMemberManualNetAreaToGross(properties);
  updateMemberDimensionUi(properties);
  const compressionDefaults = memberCompressionDefaults(grade, section);
  const kf = compressionDefaults.kf;
  const kfBasis = memberKfBasisText(kf);
  const alphaB = compressionDefaults.alphaB;
  const alphaBBasis = memberAlphaBBasis(kf, section);
  if (memberType !== "custom") {
    $("memberAlphaB").value = String(alphaB);
  }
  const designR = memberDesignRadius(properties.r);
  const fy = signedValue("memberFyInput", NaN);
  const fu = signedValue("memberFuInput", NaN);
  const materialOverridden = updateMemberMaterialStatus(fy, fu, grade);
  const designation = memberType === "custom"
    ? section.designation
    : `${properties.customGeometry ? properties.designation : section.designation} - ${gradeDisplayName}`;
  const customLex = memberType === "custom" ? signedValue("memberCustomLex", NaN) : NaN;
  const customLey = memberType === "custom" ? signedValue("memberCustomLey", NaN) : NaN;
  const preliminaryErrors = [];
  if (!Number.isFinite(properties.area) || properties.area <= 0) preliminaryErrors.push("A_g must be greater than zero");
  if (!Number.isFinite(properties.rx) || properties.rx <= 0 || !Number.isFinite(properties.ry) || properties.ry <= 0) preliminaryErrors.push("r_x and r_y must be greater than zero");
  if (memberType !== "custom" && (!Number.isFinite(designR) || designR <= 0)) preliminaryErrors.push("the governing radius r must be greater than zero");
  if (memberType === "custom" && !(customLex > 0)) preliminaryErrors.push("L_ex must be greater than zero");
  if (memberType === "custom" && !(customLey > 0)) preliminaryErrors.push("L_ey must be greater than zero");
  if (!Number.isFinite(kf) || kf <= 0 || kf > 1) preliminaryErrors.push("k_f must satisfy 0 < k_f <= 1");
  if (!Number.isFinite(fy) || fy <= 0) preliminaryErrors.push("f_y must be greater than zero");
  if (!Number.isFinite(fu) || fu <= 0) preliminaryErrors.push("f_u must be greater than zero");
  if (Number.isFinite(fy) && Number.isFinite(fu) && fu < fy) preliminaryErrors.push("f_u must not be less than f_y");
  setMemberFieldValidity("memberRadiusInput", Number.isFinite(designR) && designR > 0);
  setMemberFieldValidity("memberFyInput", Number.isFinite(fy) && fy > 0);
  setMemberFieldValidity("memberFuInput", Number.isFinite(fu) && fu > 0 && (!Number.isFinite(fy) || fu >= fy));
  if (memberType === "custom") {
    setMemberFieldValidity("memberCustomArea", Number.isFinite(properties.area) && properties.area > 0);
    setMemberFieldValidity("memberCustomRx", Number.isFinite(properties.rx) && properties.rx > 0);
    setMemberFieldValidity("memberCustomRy", Number.isFinite(properties.ry) && properties.ry > 0);
    setMemberFieldValidity("memberCustomKf", Number.isFinite(kf) && kf > 0 && kf <= 1);
    setMemberFieldValidity("memberCustomLex", customLex > 0);
    setMemberFieldValidity("memberCustomLey", customLey > 0);
  }
  if (preliminaryErrors.length) {
    setMemberInvalidState(preliminaryErrors.join("; "), designation);
    return;
  }
  const radiusOverridden = memberType !== "custom" && Math.abs(designR - properties.r) > 0.05;
  const radiusBasis = memberType === "custom"
    ? "r entered by axis"
    : properties.customGeometry
      ? `r = ${displayFixed(properties.r, 1)} mm from ${MEMBER_TYPE_LABELS[memberType]} override`
    : radiusOverridden
      ? `r = ${displayFixed(designR, 1)} mm; default r = ${displayFixed(properties.r, 1)} mm`
      : memberRadiusBasis(properties.r);
  if (memberType !== "custom") {
    $("memberRadiusSource").textContent = properties.customGeometry ? "Non-catalogue section properties." : "Catalogue section and effective length.";
  } else {
    $("memberRadiusSource").textContent = "User-entered section properties · verification required.";
  }
  $("memberNetArea").max = String(properties.area);
  const netInput = memberNetAreaInput(properties);
  const netArea = netInput.netArea;
  const kt = signedValue("memberKt", NaN);
  const strengthBasis = memberType === "custom"
    ? `f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa; project input`
    : materialOverridden
      ? `f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa; user override; ${gradeDisplayName} default ${grade.fy}/${grade.fu} MPa`
      : `f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa; ${gradeDisplayName} catalogue default`;
  const ktGuidance = kt >= 0.999
    ? "AS 4100 Cl. 7.3.1; confirm uniform force distribution"
    : memberType === "ea" && Math.abs(kt - 0.85) <= 0.005
      ? "AS 4100 Table 7.3.2 Case (a); equal angle connected through one leg"
      : memberType === "pfc" && Math.abs(kt - 0.85) <= 0.005
        ? "AS 4100 Table 7.3.2 Case (c); channel connected through the web"
        : "AS 4100 Table 7.3.2; confirm the actual connection configuration";
  const compressionArea = netArea;
  const axes = memberType === "custom"
    ? [
        { label: "x", title: "x-axis", r: properties.rx, effectiveLength: value("memberCustomLex") * 1000, alphaB: alphaBInput("memberCustomAlphaBx") },
        { label: "y", title: "y-axis", r: properties.ry, effectiveLength: value("memberCustomLey") * 1000, alphaB: alphaBInput("memberCustomAlphaBy") }
      ]
    : [{ label: "", title: "selected axis", r: designR, effectiveLength: value("memberLength") * 1000, alphaB }];
  const compressionDemand = signedValue("memberCompressionDemand", NaN);
  const tensionDemand = signedValue("memberTensionDemand", NaN);
  const calculationErrors = [];
  if (netInput.error) calculationErrors.push(netInput.error);
  if (!netInput.error && (!Number.isFinite(netArea) || netArea <= 0 || netArea > properties.area)) calculationErrors.push("A_n must satisfy 0 < A_n <= A_g");
  if (!Number.isFinite(kt) || kt < 0.75 || kt > 1) calculationErrors.push("k_t must be within the AS 4100 Cl. 7.3 range 0.75 to 1.00");
  if (!Number.isFinite(compressionDemand) || compressionDemand < 0) calculationErrors.push("compression design action must be zero or greater");
  if (!Number.isFinite(tensionDemand) || tensionDemand < 0) calculationErrors.push("tension design action must be zero or greater");
  axes.forEach(axis => {
    if (!Number.isFinite(axis.effectiveLength) || axis.effectiveLength <= 0) calculationErrors.push(`${axis.title} effective length L_e must be greater than zero`);
    if (!Number.isFinite(axis.alphaB) || axis.alphaB < -1 || axis.alphaB > 1) calculationErrors.push(`${axis.title} alpha_b must be between -1.0 and 1.0`);
  });
  setMemberFieldValidity("memberNetArea", Number.isFinite(netArea) && netArea > 0 && netArea <= properties.area);
  setMemberFieldValidity("memberKt", Number.isFinite(kt) && kt >= 0.75 && kt <= 1);
  setMemberFieldValidity("memberCompressionDemand", Number.isFinite(compressionDemand) && compressionDemand >= 0);
  setMemberFieldValidity("memberTensionDemand", Number.isFinite(tensionDemand) && tensionDemand >= 0);
  if (memberType === "custom") {
    setMemberFieldValidity("memberCustomLex", Number.isFinite(axes[0].effectiveLength) && axes[0].effectiveLength > 0);
    setMemberFieldValidity("memberCustomLey", Number.isFinite(axes[1].effectiveLength) && axes[1].effectiveLength > 0);
    setMemberFieldValidity("memberCustomAlphaBx", Number.isFinite(axes[0].alphaB) && axes[0].alphaB >= -1 && axes[0].alphaB <= 1);
    setMemberFieldValidity("memberCustomAlphaBy", Number.isFinite(axes[1].alphaB) && axes[1].alphaB >= -1 && axes[1].alphaB <= 1);
  } else {
    setMemberFieldValidity("memberLength", Number.isFinite(axes[0].effectiveLength) && axes[0].effectiveLength > 0);
  }
  if (calculationErrors.length) {
    setMemberInvalidState(calculationErrors.join("; "), designation);
    return;
  }
  let memberResult;
  try {
    memberResult = MemberCapacity.calculate({
      grossArea: properties.area,
      netArea,
      fy,
      fu,
      kf,
      kt,
      axes,
      compressionDemand,
      tensionDemand
    });
  } catch (error) {
    setMemberInvalidState(error instanceof Error ? error.message : "the adopted compression basis is outside the supported range", designation);
    return;
  }
  const {
    sectionCompression,
    axisResults,
    governingAxis,
    memberCompression,
    grossYield,
    netFracture,
    tensionCapacity,
    tensionGoverning
  } = memberResult;
  const {
    hasCompression: hasCompressionDemand,
    hasTension: hasTensionDemand,
    hasAny: hasMemberDemand,
    compressionRatio: compressionDemandRatio,
    tensionRatio: tensionDemandRatio,
    governingRatio: governingDemandRatio
  } = memberResult.demand;
  const demandChecks = [];
  if (hasCompressionDemand) {
    demandChecks.push(Number.isFinite(compressionDemandRatio)
      ? `Compression action check: N<sub>c</sub><sup>*</sup> / &phi;N<sub>c</sub> = ${fixed(compressionDemand)} / ${fixed(memberCompression)} = ${formatMemberUtilisation(compressionDemandRatio)}`
      : "Compression design capacity is not positive");
  }
  if (hasTensionDemand) {
    demandChecks.push(Number.isFinite(tensionDemandRatio)
      ? `Tension action check: N<sub>t</sub><sup>*</sup> / &phi;N<sub>t</sub> = ${fixed(tensionDemand)} / ${fixed(tensionCapacity)} = ${formatMemberUtilisation(tensionDemandRatio)}`
      : "Tension design capacity is not positive");
  }
  const demandStep = hasMemberDemand
    ? `${demandChecks.join("; ")}; governing utilisation ratio = ${formatMemberUtilisation(governingDemandRatio)}`
    : "No compression or tension design action specified.";
  const netAreaBasisLabel = netInput.mode === "auto"
    ? netInput.holeCount > 0 && netInput.holeDiameter > 0
      ? "straight-line bolt-hole deduction"
      : "auto / no holes"
    : Math.abs(netArea - properties.area) <= 0.5
      ? "gross area / no deduction"
      : "manual net area";

  $("memberDesignation").textContent = designation;
  $("memberAssumption").innerHTML = memberType === "custom"
    ? "User-entered section properties; flexural buckling checked about both entered axes."
    : `${properties.customGeometry ? "Geometry override" : "Catalogue basis"}; ${radiusOverridden ? "user-entered governing radius" : radiusBasis}; ${memberCatalogueBasisText()}.`;
  $("memberSummaryAxis").innerHTML = memberType === "custom"
    ? `${governingAxis.label}-axis / ${displayFixed(governingAxis.r, 1)} mm`
    : `${["chs", "shs", "rod"].includes(memberType) ? "symmetric" : memberType === "ea" ? "minor principal" : "minor y-y"} / ${displayFixed(designR, 1)} mm`;
  $("memberSummarySlenderness").innerHTML = memberType === "custom"
    ? `${displayFixed(governingAxis.effectiveLength / 1000, 2)} m / ${displayFixed(governingAxis.leOverR, 1)}`
    : `${displayFixed(axisResults[0].effectiveLength / 1000, 2)} m / ${displayFixed(axisResults[0].leOverR, 1)}`;
  $("memberSummaryNetArea").innerHTML = `${formatArea(netArea)}`;
  $("memberSummaryStrength").innerHTML = `${fy} / ${fu} MPa`;
  $("memberSummaryCompressionFactors").innerHTML = memberType === "custom"
    ? `${displayFixed(kf, 3)} / ${displayFixed(governingAxis.alphaB, 1)}`
    : `${displayFixed(kf, 3)} / ${displayFixed(alphaB, 1)}`;
  $("memberSummaryKt").textContent = displayFixed(kt, 2);
  updateMemberNetSectionPresentation(properties, netArea, kt, netInput);
  $("memberGeometrySummary").innerHTML = memberType === "custom"
    ? "User-entered properties; no catalogue geometry adopted."
    : memberDimensionLabel(properties);
  $("memberAreaSummary").innerHTML = `A<sub>g</sub> = ${formatArea(properties.area)}; A<sub>n</sub> = ${formatArea(netArea)} (${netAreaBasisLabel})`;
  $("memberMaterialSummary").innerHTML = strengthBasis;
  $("memberCompressionSummary").innerHTML = memberType === "custom"
    ? `${axisResults.map(axis => `${axis.label}: L<sub>e${axis.label}</sub> = ${displayFixed(axis.effectiveLength / 1000, 2)} m; r<sub>${axis.label}</sub> = ${displayFixed(axis.r, 1)} mm; L<sub>e${axis.label}</sub>/r<sub>${axis.label}</sub> = ${displayFixed(axis.leOverR, 1)}; &alpha;<sub>b,${axis.label}</sub> = ${displayFixed(axis.alphaB, 1)}`).join("; ")}; k<sub>f</sub> = ${displayFixed(kf, 3)}; ${governingAxis.label}-axis governs`
    : `L<sub>e</sub> = ${displayFixed(axisResults[0].effectiveLength / 1000, 2)} m; r used = ${displayFixed(designR, 1)} mm${radiusOverridden ? ` (default ${displayFixed(properties.r, 1)} mm)` : ""}; ${memberAxisBasisText()}; k<sub>f</sub> = ${displayFixed(kf, 3)}; &alpha;<sub>b</sub> = ${displayFixed(alphaB, 1)}`;
  $("memberTensionSummary").innerHTML = `k<sub>t</sub> = ${displayFixed(kt, 2)}; A<sub>n</sub> basis = ${netAreaBasisLabel}; ${ktGuidance}`;
  $("memberCompression").textContent = fixed(memberCompression);
  $("sectionCompression").textContent = fixed(sectionCompression);
  $("memberTension").textContent = fixed(tensionCapacity);
  $("memberTensionBasis").textContent = `${tensionGoverning} governs · AS 4100 Cl. 7.2`;
  $("grossYieldCapacity").textContent = `${fixed(grossYield)} kN`;
  $("netFractureCapacity").textContent = `${fixed(netFracture)} kN`;
  $("tensionGoverning").textContent = tensionGoverning;
  $("memberSlenderness").textContent = memberType === "custom" ? axisResults.map(axis => `${axis.label} ${displayFixed(axis.leOverR, 1)}`).join(" / ") : displayFixed(axisResults[0].leOverR, 1);
  $("memberLambdaN").textContent = memberType === "custom" ? axisResults.map(axis => `${axis.label} ${displayFixed(axis.lambdaN, 1)}`).join(" / ") : displayFixed(axisResults[0].lambdaN, 1);
  $("memberAlphaC").textContent = memberType === "custom" ? axisResults.map(axis => `${axis.label} ${displayFixed(axis.alphaC, 3)}`).join(" / ") : displayFixed(axisResults[0].alphaC, 3);
  $("memberGoverning").textContent = governingAxis.alphaC < 0.999 ? (memberType === "custom" ? `${governingAxis.title} buckling controls` : "Member buckling controls") : "Section capacity controls";
  $("memberUtilisation").textContent = hasMemberDemand ? formatMemberUtilisation(governingDemandRatio) : "\u2014";
  const memberUtilisationStatus = $("memberUtilisationStatus");
  memberUtilisationStatus.textContent = hasMemberDemand ? (governingDemandRatio <= 1 ? "Axial check PASS" : "Axial check FAIL") : "No design action";
  memberUtilisationStatus.className = hasMemberDemand ? (governingDemandRatio <= 1 ? "pass" : "fail") : "check";
  const customGeometryKfWarning = properties.customGeometry && memberType === "ea"
    ? " Verify k<sub>f</sub> for slender custom angle geometry."
    : "";
  const autoNetAreaText = netInput.mode === "auto"
    ? `A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t = ${displayFixed(properties.area, 0)} - ${netInput.holeCount} &times; ${fixed(netInput.holeDiameter)} &times; ${fixed(netInput.deductionThickness)} = ${displayFixed(netArea, 0)} mm².`
    : memberType === "chs" || memberType === "rod"
      ? `A<sub>n</sub> = A<sub>g</sub> = ${displayFixed(netArea, 0)} mm².`
      : `Manual A<sub>n</sub> = ${displayFixed(netArea, 0)} mm².`;
  const manualReason = memberType === "pfc"
    ? ` PFC default t = t<sub>w</sub> = ${fixed(properties.tw || section.tw || 0)} mm; use verified t for the net path.`
    : memberType === "ea"
      ? ` EA deduction uses catalogue actual t = ${fixed(properties.t)} mm${properties.nominalT && Math.abs(properties.nominalT - properties.t) > 0.01 ? `, not nominal ${fixed(properties.nominalT)} mm` : ""}.`
    : "";
  $("memberNetAreaSource").innerHTML = `${autoNetAreaText}${manualReason} Use manual A<sub>n</sub> for non-straight net paths.`;
  $("memberWarning").innerHTML = memberType === "chs"
    ? `Scope: centroidal axial compression and axial tension only. CHS basis: assumed cold-formed non-stress-relieved; k<sub>f</sub> = ${displayFixed(kf, 3)}, &alpha;<sub>b</sub> = -0.5.`
    : memberType === "rhs" || memberType === "shs"
      ? `Scope: centroidal axial compression and axial tension only. ${memberType.toUpperCase()} basis: cold-formed non-stress-relieved; ${memberAxisBasisText()}, k<sub>f</sub> = ${displayFixed(kf, 3)}, &alpha;<sub>b</sub> = -0.5.`
    : memberType === "ub" || memberType === "uc"
      ? `Scope: centroidal axial compression and axial tension only. ${memberType.toUpperCase()} basis: hot-rolled section, ${memberAxisBasisText()}, k<sub>f</sub> = ${displayFixed(kf, 3)}, &alpha;<sub>b</sub> = ${displayFixed(alphaB, 1)}.`
    : memberType === "ea"
      ? `Scope: centroidal axial compression and axial tension only. EA basis: k<sub>f</sub> = ${displayFixed(kf, 3)}, &alpha;<sub>b</sub> = ${displayFixed(alphaB, 1)}.${gradeName === "Grade 350" ? " Grade 350 availability is by enquiry and depends on section and quantity." : ""}${customGeometryKfWarning}`
      : memberType === "pfc"
        ? `Scope: centroidal axial compression and axial tension only. PFC basis: hot-rolled channel, r = r<sub>min</sub>, k<sub>f</sub> = ${displayFixed(kf, 3)}, &alpha;<sub>b</sub> = ${displayFixed(alphaB, 1)}.`
        : memberType === "custom"
          ? `Flexural buckling about the entered axes only. Built-up action, local buckling, shear deformation and torsional buckling are not evaluated.`
          : `Scope: centroidal axial compression and axial tension only. Round Bar basis: k<sub>f</sub> = ${displayFixed(kf, 3)}, &alpha;<sub>b</sub> = ${displayFixed(alphaB, 1)}. Confirm grade and diameter availability.`;
  const sectionDataText = memberType === "custom"
    ? `A<sub>g</sub> = ${displayFixed(properties.area, 0)} mm²; A<sub>n</sub> = ${displayFixed(compressionArea, 0)} mm²; r<sub>x</sub> = ${displayFixed(properties.rx, 1)} mm; r<sub>y</sub> = ${displayFixed(properties.ry, 1)} mm; I<sub>x</sub> = ${formatInertia(properties.ix)}; I<sub>y</sub> = ${formatInertia(properties.iy)}; f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa`
    : `${properties.customGeometry ? "Geometry override" : "Catalogue basis"}; ${memberDimensionLabel(properties)}; A<sub>g</sub> = ${displayFixed(properties.area, 0)} mm²; A<sub>n</sub> = ${displayFixed(compressionArea, 0)} mm²; r<sub>x</sub> = ${displayFixed(properties.rx, 1)} mm; r<sub>y</sub> = ${displayFixed(properties.ry, 1)} mm; I<sub>x</sub> = ${formatInertia(properties.ix)}; I<sub>y</sub> = ${formatInertia(properties.iy)}; r = ${displayFixed(designR, 1)} mm${radiusOverridden ? `; default r = ${displayFixed(properties.r, 1)} mm` : ""}; f<sub>y</sub> = ${fy} MPa; f<sub>u</sub> = ${fu} MPa`;
  const compressionTraceRows = memberType === "custom"
    ? axisResults.map(axis => calculationTraceRow({
        title: `Compression about ${axis.title}`,
        reference: "AS 4100 Cl. 6.3.3",
        formula: `&lambda;<sub>n</sub> = (L<sub>e</sub>/r)&radic;k<sub>f</sub>&radic;(f<sub>y</sub>/250); &alpha;<sub>a</sub> = 2100(&lambda;<sub>n</sub> - 13.5)/(&lambda;<sub>n</sub><sup>2</sup> - 15.3&lambda;<sub>n</sub> + 2050); &lambda; = &lambda;<sub>n</sub> + &alpha;<sub>a</sub>&alpha;<sub>b</sub>; &eta; = max[0, 0.00326(&lambda; - 13.5)]; &xi; = [(&lambda;/90)<sup>2</sup> + 1 + &eta;]/[2(&lambda;/90)<sup>2</sup>]; &alpha;<sub>c</sub> = &xi;[1 - &radic;(1 - (90/(&xi;&lambda;))<sup>2</sup>)]; &phi;N<sub>c</sub> = &alpha;<sub>c</sub>&phi;N<sub>s</sub>`,
        substitution: `L<sub>e</sub>/r = ${displayFixed(axis.leOverR, 1)}; &lambda;<sub>n</sub> = ${displayFixed(axis.lambdaN, 1)}; &alpha;<sub>a</sub> = ${displayFixed(axis.alphaA, 2)}; &alpha;<sub>b</sub> = ${displayFixed(axis.alphaB, 1)}; &lambda; = ${displayFixed(axis.modifiedLambda, 1)}; &eta; = ${displayFixed(axis.eta, 3)}; &xi; = ${displayFixed(axis.xi, 3)}; &alpha;<sub>c</sub> = ${displayFixed(axis.alphaC, 3)}`,
        result: `Design member capacity &phi;N<sub>c,${axis.label}</sub> = ${fixed(axis.memberCompression)} kN`,
        applicability: axis === governingAxis ? "Governing custom axis." : "Non-governing custom axis."
      })).join("")
    : [
        calculationTraceRow({
          title: "Member slenderness",
          reference: "AS 4100 Cl. 6.3.3",
          formula: `&lambda;<sub>n</sub> = (L<sub>e</sub>/r)&radic;k<sub>f</sub>&radic;(f<sub>y</sub>/250)`,
          substitution: `L<sub>e</sub>/r = ${displayFixed(axisResults[0].effectiveLength / 1000, 3)} m / ${displayFixed(axisResults[0].r, 1)} mm = ${displayFixed(axisResults[0].leOverR, 1)}; k<sub>f</sub> = ${displayFixed(kf, 3)}; f<sub>y</sub> = ${fy} MPa`,
          result: `Modified section slenderness &lambda;<sub>n</sub> = ${displayFixed(axisResults[0].lambdaN, 1)}`,
          applicability: radiusBasis
        }),
        calculationTraceRow({
          title: "Modified slenderness",
          reference: "AS 4100 Cl. 6.3.3",
          formula: `&alpha;<sub>a</sub> = 2100(&lambda;<sub>n</sub> - 13.5)/(&lambda;<sub>n</sub><sup>2</sup> - 15.3&lambda;<sub>n</sub> + 2050); &lambda; = &lambda;<sub>n</sub> + &alpha;<sub>a</sub>&alpha;<sub>b</sub>`,
          substitution: `&alpha;<sub>a</sub> = 2100(${displayFixed(axisResults[0].lambdaN, 1)} - 13.5)/(${displayFixed(axisResults[0].lambdaN, 1)}<sup>2</sup> - 15.3 &times; ${displayFixed(axisResults[0].lambdaN, 1)} + 2050) = ${displayFixed(axisResults[0].alphaA, 2)}; &lambda; = ${displayFixed(axisResults[0].lambdaN, 1)} + ${displayFixed(axisResults[0].alphaA, 2)} &times; ${displayFixed(axisResults[0].alphaB, 1)} = ${displayFixed(axisResults[0].modifiedLambda, 1)}`,
          result: `&lambda; = ${displayFixed(axisResults[0].modifiedLambda, 1)}`,
          applicability: `${alphaBBasis}; &alpha;<sub>a</sub> is calculated from &lambda;<sub>n</sub>.`
        }),
        calculationTraceRow({
          title: "Compression reduction factor",
          reference: "AS 4100 Cl. 6.3.3",
          formula: `&eta; = max[0, 0.00326(&lambda; - 13.5)]; &xi; = [(&lambda;/90)<sup>2</sup> + 1 + &eta;]/[2(&lambda;/90)<sup>2</sup>]; &alpha;<sub>c</sub> = &xi;[1 - &radic;(1 - (90/(&xi;&lambda;))<sup>2</sup>)]`,
          substitution: `&lambda; = ${displayFixed(axisResults[0].modifiedLambda, 1)}; &eta; = ${displayFixed(axisResults[0].eta, 3)}; &xi; = ${displayFixed(axisResults[0].xi, 3)}`,
          result: `&alpha;<sub>c</sub> = ${displayFixed(axisResults[0].alphaC, 3)}`,
          applicability: "Active AS 4100 compression-member branch."
        })
      ].join("");
  const netAreaFormula = netInput.mode === "auto"
    ? `A<sub>n</sub> = A<sub>g</sub> - n<sub>h</sub>d<sub>h</sub>t`
    : memberType === "chs" || memberType === "rod"
      ? `A<sub>n</sub> = A<sub>g</sub>`
      : `A<sub>n</sub> = A<sub>n,project</sub>`;
  const netAreaSubstitution = netInput.mode === "auto"
    ? `${displayFixed(properties.area, 0)} - ${netInput.holeCount} &times; ${fixed(netInput.holeDiameter)} &times; ${fixed(netInput.deductionThickness)} mm<sup>2</sup>`
    : `${displayFixed(netArea, 0)} mm<sup>2</sup>`;
  const sectionCompressionTrace = calculationTraceRow({
    title: "Design section compression capacity",
    reference: "AS 4100 Cl. 6.2.1",
    formula: `&phi;N<sub>s</sub> = &phi;k<sub>f</sub>A<sub>n</sub>f<sub>y</sub>`,
    substitution: `0.90 &times; ${displayFixed(kf, 3)} &times; ${displayFixed(compressionArea, 0)} mm<sup>2</sup> &times; ${fy} MPa / 1000`,
    result: `Design section capacity = ${fixed(sectionCompression)} kN`,
    applicability: "Section compression capacity before member buckling reduction."
  });
  const memberCompressionTrace = calculationTraceRow({
    title: "Design member compression capacity",
    reference: "AS 4100 Cl. 6.3.3",
    formula: memberType === "custom" ? `&phi;N<sub>c</sub> = min(&phi;N<sub>c,x</sub>, &phi;N<sub>c,y</sub>)` : `&phi;N<sub>c</sub> = &alpha;<sub>c</sub>&phi;N<sub>s</sub>`,
    substitution: memberType === "custom" ? axisResults.map(axis => `${axis.label}: ${fixed(axis.memberCompression)} kN`).join("; ") : `${displayFixed(governingAxis.alphaC, 3)} &times; ${fixed(sectionCompression)} kN`,
    result: `Design member capacity = ${fixed(memberCompression)} kN`,
    applicability: memberType === "custom" ? `${governingAxis.title} governs.` : $("memberGoverning").textContent
  });
  $("memberFormulaSteps").innerHTML = [
    calculationTraceRow({
      title: "Design basis",
      lookup: memberType === "custom" ? "Project-entered effective properties" : properties.customGeometry ? "Geometry override" : "Catalogue section and selected grade",
      selection: strengthBasis,
      adopted: `k<sub>f</sub> = ${displayFixed(kf, 3)}; &alpha;<sub>b</sub> = ${memberType === "custom" ? axisResults.map(axis => `${axis.label}: ${displayFixed(axis.alphaB, 1)}`).join(" / ") : displayFixed(alphaB, 1)}; k<sub>t</sub> = ${displayFixed(kt, 2)}`,
      applicability: `${kfBasis}; ${alphaBBasis}; ${ktGuidance}.`
    }),
    calculationTraceRow({
      title: "Section properties",
      lookup: memberType === "custom" ? "Verified project section-property calculation required." : properties.customGeometry ? "Entered ideal geometry override." : "Selected catalogue row.",
      selection: section.designation,
      adopted: sectionDataText,
      applicability: radiusBasis
    }),
    calculationTraceRow({
      title: "Net area",
      reference: "AS 4100 Cl. 6.2.1, AS 4100 Cl. 7.2 and AS 4100 Cl. 9.1.10",
      formula: netAreaFormula,
      substitution: netAreaSubstitution,
      result: `A<sub>n</sub> = ${displayFixed(netArea, 0)} mm<sup>2</sup>`,
      applicability: netInput.mode === "auto" ? "Straight-line quick deduction only; use manual A<sub>n</sub> for staggered or non-straight critical paths." : "Project-entered or unperforated gross-area basis."
    }),
    sectionCompressionTrace,
    compressionTraceRows,
    memberCompressionTrace,
    calculationTraceRow({
      title: "Gross-section yielding",
      reference: "AS 4100 Cl. 7.2",
      formula: `&phi;N<sub>ty</sub> = &phi;A<sub>g</sub>f<sub>y</sub>`,
      substitution: `0.90 &times; ${displayFixed(properties.area, 0)} mm<sup>2</sup> &times; ${fy} MPa / 1000`,
      result: `Design capacity = ${fixed(grossYield)} kN`,
      applicability: "Gross-section yielding tension limit state."
    }),
    calculationTraceRow({
      title: "Net-section fracture",
      reference: "AS 4100 Cl. 7.2",
      formula: `&phi;N<sub>tf</sub> = &phi;0.85k<sub>t</sub>A<sub>n</sub>f<sub>u</sub>`,
      substitution: `0.90 &times; 0.85 &times; ${displayFixed(kt, 2)} &times; ${displayFixed(netArea, 0)} mm<sup>2</sup> &times; ${fu} MPa / 1000`,
      result: `Design capacity = ${fixed(netFracture)} kN`,
      applicability: `${ktGuidance}; critical net area must match the connection geometry.`
    }),
    calculationTraceRow({
      title: "Design tension capacity",
      reference: "AS 4100 Cl. 7.1",
      formula: `&phi;N<sub>t</sub> = min(&phi;N<sub>ty</sub>, &phi;N<sub>tf</sub>)`,
      substitution: `min(${fixed(grossYield)}, ${fixed(netFracture)}) kN`,
      result: `Design tension capacity = ${fixed(tensionCapacity)} kN`,
      applicability: `${tensionGoverning} governs.`
    }),
    calculationTraceRow({
      title: "Design action utilisation",
      formula: hasMemberDemand ? `&eta; = max(N<sub>c</sub><sup>*</sup>/&phi;N<sub>c</sub>, N<sub>t</sub><sup>*</sup>/&phi;N<sub>t</sub>)` : "",
      substitution: hasMemberDemand ? demandChecks.join("; ") : "",
      result: hasMemberDemand ? `Governing utilisation = ${formatMemberUtilisation(governingDemandRatio)}; ${governingDemandRatio <= 1 ? "Axial check PASS" : "Axial check FAIL"}` : "No design action specified",
      applicability: "Compression and tension entries represent separate governing axial load cases, not simultaneous combined actions. No combined bending or flexural-torsional buckling check."
    })
  ].join("");
}

function readConcreteLayerControls(index) {
  return Object.fromEntries(concreteLayerFieldSuffixes.map(suffix => {
    const control = $(`layer${index}${suffix}`);
    return [suffix, control.type === "checkbox" ? control.checked : control.value];
  }));
}

function writeConcreteLayerControls(index, state) {
  if (!state) return;
  concreteLayerFieldSuffixes.forEach(suffix => {
    const control = $(`layer${index}${suffix}`);
    if (control.type === "checkbox") control.checked = Boolean(state[suffix]);
    else control.value = state[suffix];
  });
}

function saveConcreteLayerState() {
  if (!concreteLayerState) return;
  [1, 2, 3, 4].forEach(index => {
    const row = $(`layer${index}Active`).closest(".layer-row");
    if (!row.classList.contains("is-unavailable")) {
      concreteLayerState[index] = readConcreteLayerControls(index);
    }
  });
}

function initializeConcreteLayerState() {
  concreteLayerState = Object.fromEntries([1, 2, 3, 4].map(index => [index, readConcreteLayerControls(index)]));
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
    name: index === 1 ? "Top pad - top face" : index === 2 ? "Top pad - bottom face" : index === 3 ? "Bottom pad - top face" : "Bottom pad - bottom face",
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
  return concreteBarProducts[$(`layer${index}Bar`).value] || concreteNoBarProduct;
}

function concreteShearBarProduct() {
  return concreteBarProducts[$("concreteShearBar").value] || concreteBarProducts.N12;
}

function setConcreteBarDefaults(index) {
  $(`layer${index}Fsy`).value = concreteBarProduct(index).fsy;
}

function updateConcreteLayerBarState(index, available = true) {
  const row = $(`layer${index}Bar`).closest(".layer-row");
  const hasReinforcement = $(`layer${index}Bar`).value !== "none";
  const yInput = $(`layer${index}Y`);
  if (hasReinforcement && !String(yInput.value).trim() && concreteLayerState?.[index]?.Y) {
    yInput.value = concreteLayerState[index].Y;
  }
  yInput.placeholder = available && hasReinforcement ? "" : "N/A";
  $(`layer${index}Active`).checked = hasReinforcement;
  row.classList.toggle("is-plain", !hasReinforcement);
  ["Y", "Spacing", "Fsy"].forEach(suffix => {
    $(`layer${index}${suffix}`).disabled = !available || !hasReinforcement;
  });
  updateConcreteDepthControlState(index);
}

function updateConcreteDepthControlState(index) {
  const row = $(`layer${index}Y`).closest(".layer-row");
  const automatic = $(`layer${index}Auto`).checked;
  const available = !row.classList.contains("is-unavailable") && $(`layer${index}Active`).checked;
  $(`layer${index}Y`).classList.toggle("is-auto-value", automatic);
  $(`layer${index}AutoReset`).hidden = automatic || !available;
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
    const label = prefix === "N" ? "N bars - AS/NZS 4671" : "Y bars - legacy drawings";
    const options = diameters.map(diameter => `<option value="${prefix}${diameter}">${prefix}${diameter}${prefix === "N" && diameter === 40 ? " - on request" : ""}</option>`).join("");
    return `<optgroup label="${label}">${options}</optgroup>`;
  }).join("");
  [1, 2, 3, 4].forEach(index => {
    const select = $(`layer${index}Bar`);
    const defaultBar = select.dataset.defaultBar || "N20";
    select.innerHTML = `<option value="none">None / plain concrete</option>${groups}`;
    select.value = defaultBar;
    setConcreteBarDefaults(index);
    updateConcreteLayerBarState(index);
  });
  const shearSelect = $("concreteShearBar");
  shearSelect.innerHTML = groups;
  shearSelect.value = shearSelect.dataset.defaultBar || "N12";
  setConcreteShearBarDefaults();
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
    const yInput = $(`layer${index}Y`);
    const row = activeInput.closest(".layer-row");
    const wasUnavailable = row.classList.contains("is-unavailable");
    row.classList.toggle("is-unavailable", !available);
    row.setAttribute("aria-disabled", String(!available));
    ["Active", "Auto", "Y", "Bar", "Spacing", "Fsy", "Es"].forEach(suffix => {
      $(`layer${index}${suffix}`).disabled = !available;
    });
    if (!available) {
      yInput.value = "";
      yInput.placeholder = "N/A";
    } else {
      if (wasUnavailable) {
        writeConcreteLayerControls(index, concreteLayerState?.[index]);
      }
      yInput.placeholder = "";
    }
    updateConcreteLayerBarState(index, available);
  });
}

function updateConcreteMatDepths(topDepth, bottomDepth, cover) {
  const twoWayReinforcement = $("concreteReinforcementLayout").value === "two-way";
  [1, 2, 3, 4].forEach(index => {
    const auto = $(`layer${index}Auto`).checked;
    const yInput = $(`layer${index}Y`);
    updateConcreteDepthControlState(index);
    if (!$(`layer${index}Active`).checked) {
      yInput.value = "";
      yInput.placeholder = "N/A";
      return;
    }
    if (!auto) return;
    const bar = concreteBarProduct(index).diameter;
    const crossingOffset = twoWayReinforcement ? bar : 0;
    const y = concreteAutoDepth(index, topDepth, bottomDepth, cover, bar, crossingOffset);
    yInput.value = Number.isFinite(y) ? fixed(Math.max(0, y)) : "";
  });
}

function setConcreteLayerDepthManual(index) {
  $(`layer${index}Auto`).checked = false;
  updateConcreteDepthControlState(index);
  calculateConcrete();
}

function restoreConcreteLayerAutoDepth(index) {
  $(`layer${index}Auto`).checked = true;
  updateConcreteDepthControlState(index);
  calculateConcrete();
}

function concreteStressBlockFactors(fc) {
  return ConcreteSectionCalculation.stressBlockFactors(fc);
}

function concreteForcesAtX(x, data) {
  return ConcreteSectionCalculation.forcesAtNeutralAxis(x, data);
}

function solveConcreteSection(data) {
  return ConcreteSectionCalculation.solveSection(data);
}

function concreteOneWayShear(data, result) {
  const shearReoMode = $("concreteShearReo").value;
  const shearProduct = concreteShearBarProduct();
  const fsyf = Math.max(1, Math.min(600, value("concreteFsyf")));
  const sv = Math.max(1, value("concreteSv"));
  const nsv = Math.max(0, value("concreteNsv"));
  const shearBarArea = shearProduct.area || Math.PI * shearProduct.diameter ** 2 / 4;
  const shear = ConcreteSectionCalculation.oneWayShear({
    depth: data.depth,
    width: data.width,
    fc: data.fc,
    layers: result.layers,
    d0: result.d0,
    shearReinforcement: {
      mode: shearReoMode,
      designation: shearProduct.designation,
      barArea: shearBarArea,
      legs: nsv,
      spacing: sv,
      yieldStress: fsyf
    }
  });
  const dBasis = shear.centroidArea > 0
    ? shear.tensionLayers.map(layer => `Layer ${layer.index}: A<sub>s</sub> = ${fixed(layer.area)} mm<sup>2</sup>, d = ${fixed(layer.d)} mm`).join("; ")
    : `No reinforcement layer in the tensile half-depth; fallback d = d_o = ${fixed(result.d0)} mm`;
  return {
    ...shear,
    dBasis,
    shearDesignation: shearProduct.designation
  };
}

function calculateConcrete() {
  saveConcreteLayerState();
  updateConcreteShearInputVisibility();
  const topDepth = value("concreteTopDepth");
  const bottomDepth = value("concreteBottomDepth");
  const hideInactiveBottomMats = bottomDepth <= 0;
  [$("layer3Row"), $("layer4Row")].forEach(row => { row.hidden = hideInactiveBottomMats; });
  $("bottomPadLayerNote").hidden = !hideInactiveBottomMats;
  const totalDepth = topDepth + bottomDepth;
  const direction = $("concreteDirection").value;
  const reinforcementLayout = $("concreteReinforcementLayout").value;
  const hasTopPad = topDepth > 0;
  const hasBottomPad = bottomDepth > 0;
  const compositeSection = hasTopPad && hasBottomPad;
  const sectionKind = compositeSection ? "composite" : hasTopPad ? "top" : hasBottomPad ? "bottom" : "none";
  const depth = totalDepth;
  const layerIndices = compositeSection ? [1, 2, 3, 4] : hasTopPad ? [1, 2] : hasBottomPad ? [3, 4] : [];
  const cover = value("concreteCover");
  const width = 1000;
  const fcInput = value("concreteFc");
  const fcValid = Number.isFinite(fcInput) && fcInput >= 20 && fcInput <= 120;
  $("concreteFc").setAttribute("aria-invalid", String(!fcValid));
  const fc = fcValid ? fcInput : NaN;
  const stressBlock = fcValid ? concreteStressBlockFactors(fc) : { alpha2: NaN, gamma: NaN };
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
    reinforcementLayout,
    compositeSection,
    sectionKind,
    layers: layerIndices.map(index => concreteLayer(index, depth, direction, width)).filter(layer => layer.active && layer.area > 0 && layer.yTop >= 0 && layer.yTop <= depth)
  };

  let result = {
    ok: false,
    message: !fcValid
      ? "Concrete strength must be between 20 MPa and 120 MPa"
      : depth <= 0
        ? "No concrete pad depth is defined"
        : "Plain concrete section: no RC ultimate flexural capacity is calculated without active reinforcement layers"
  };
  if (fcValid && data.width > 0 && data.depth > 0 && data.ecu > 0 && data.layers.length) {
    result = solveConcreteSection(data);
  }

  const compressionFaceLabel = direction === "top" ? "top face in compression" : "bottom face in compression";
  const checkedSectionLabel = sectionKind === "composite"
    ? "Combined top and bottom pads"
    : sectionKind === "bottom"
      ? "Bottom pad only"
      : sectionKind === "top"
        ? "Top pad only"
        : "No pad section defined";
  $("concreteSummaryTitle").textContent = `${checkedSectionLabel} · ${compressionFaceLabel} · 1 m strip`;
  $("concreteSummaryNote").textContent = compositeSection
    ? "The calculation uses the total depth of both pads. Verify interface transfer, anchorage and composite action."
    : sectionKind === "none"
      ? "Enter a positive top or bottom pad depth to define the checked section."
      : "";
  const legacyLayers = data.layers.filter(layer => layer.legacy);
  const fsyCappedLayers = data.layers.filter(layer => layer.fsyInput > 600);

  if (!result.ok) {
    ["concretePhiMuo", "concretePhiVu"].forEach(id => $(id).textContent = "-");
    $("concreteWarningText").textContent = fcValid
      ? "Section capacity is unavailable for the current depth and active reinforcement."
      : result.message;
    $("concreteSectionState").innerHTML = "";
    $("concreteLayerResults").innerHTML = "";
    $("concreteFormulaSteps").innerHTML = !fcValid
      ? calculationTraceRow({
          title: "Concrete strength input",
          result: "Not evaluated",
          applicability: `${result.message}. No flexural or shear capacity is reported.`,
          state: "warning"
        })
      : depth <= 0
        ? calculationTraceRow({
          title: "Section definition",
          result: "Not evaluated",
          applicability: `${result.message}. Enter D<sub>top</sub> or D<sub>bot</sub> greater than zero.`,
          state: "warning"
        })
      : [
          calculationTraceRow({
            title: "Reinforced-concrete section state",
            result: "Not evaluated",
            applicability: result.message,
            state: "warning"
          }),
          calculationTraceRow({
            title: "Plain concrete boundary",
            reference: "AS 3600 Section 20",
            result: "Use a separate plain-concrete footing check",
            applicability: "Do not report ductile reinforced-concrete &phi;M<sub>uo</sub>. The separate method uses a linear stress-strain bending model and a footing strength depth based on nominal depth minus 50 mm."
          })
        ].join("");
    return;
  }

  const residual = result.axial / 1000;
  const shear = concreteOneWayShear(data, result);
  const coverWarnings = result.layers.filter(layer => layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2);
  const reviewFlags = [];
  if (!shear.withinSimplifiedScope) reviewFlags.push(`one-way shear not evaluated outside AS 3600 Cl. 8.2.4 simplified-method scope (${shear.scopeFailures.join("; ")})`);
  if (shear.shearReoMode === "vertical" && !shear.hasShearReo) reviewFlags.push("selected shear reinforcement requires at least one fitment leg and positive spacing");
  if (shear.hasShearReo && !shear.minShearReoProvided) reviewFlags.push(`A<sub>sv</sub>/s below the AS 3600 Cl. 8.2.1.7 minimum (${displayFixed(shear.asvPerS, 3)} < ${displayFixed(shear.asvMinPerS, 3)} mm<sup>2</sup>/mm)`);
  if (shear.webCrushingLimited) reviewFlags.push(`V<sub>u</sub> limited by AS 3600 Cl. 8.2.3.3 web crushing`);
  if (coverWarnings.length) reviewFlags.push(`${coverWarnings.map(layer => `layer ${layer.index}`).join(", ")} cover check`);
  if (legacyLayers.length) reviewFlags.push(`legacy Y bar in ${legacyLayers.map(layer => `layer ${layer.index}`).join(", ")}`);
  if (fsyCappedLayers.length) reviewFlags.push(`f<sub>sy</sub> capped at 600 MPa for ${fsyCappedLayers.map(layer => `layer ${layer.index}`).join(", ")}`);
  if (result.kuo > 0.36) reviewFlags.push(`k<sub>uo</sub> = ${displayFixed(result.kuo, 3)} > 0.36; check AS 3600 Cl. 8.1.5`);
  const compositeBoundary = compositeSection
    ? " Verify interface transfer, anchorage and composite action."
    : "";
  const warningText = `Section capacities only; no design actions are checked.${compositeBoundary}${reviewFlags.length ? ` Review: ${reviewFlags.join("; ")}.` : ""}`;

  $("concretePhiMuo").textContent = fixed(result.phiMuo);
  $("concretePhiVu").textContent = shear.withinSimplifiedScope ? fixed(shear.phiVu) : "-";
  $("concreteWarningText").innerHTML = warningText;

  const shearState = shear.withinSimplifiedScope
    ? `<article><b>One-way shear capacity</b><span>&phi;V<sub>u</sub> = ${fixed(shear.phiVu)} kN; &phi; = ${displayFixed(shear.phi, 2)}</span><small>V<sub>u</sub> = min(V<sub>uc</sub> + V<sub>us</sub>, V<sub>u.max</sub>) = ${fixed(shear.vu)} kN${shear.webCrushingLimited ? "; web crushing governs" : ""}</small></article>`
    : `<article><b>One-way shear check</b><span>Shear capacity not calculated.</span><small>${shear.scopeFailures.join("; ")}. Use the applicable general shear method for the project.</small></article>`;
  $("concreteSectionState").innerHTML = `
    <article><b>Flexural capacity details</b><span>Neutral axis depth x = ${fixed(result.x)} mm from the selected compression face; d<sub>o</sub> = ${fixed(result.d0)} mm; k<sub>uo</sub> = ${displayFixed(result.kuo, 3)}; M<sub>uo</sub> = ${fixed(result.muo)} kNm</span><small>C<sub>c</sub> = ${fixed(result.cc / 1000)} kN; &phi; = ${displayFixed(result.phi, 2)}; &phi;M<sub>uo</sub> = ${fixed(result.phiMuo)} kNm</small></article>
    ${shearState}`;

  $("concreteLayerResults").innerHTML = result.layers.map(layer => {
    const status = Math.abs(layer.strain) < 0.00005 ? "near neutral axis" : layer.force > 0 ? "compression" : "tension";
    const coverStatus = layer.yTop < data.cover + layer.bar / 2 || data.depth - layer.yTop < data.cover + layer.bar / 2 ? "nominal cover review required" : "within nominal cover reference";
    const displacementNote = layer.displacedConcreteStress > 0 ? `; net stress = ${signedFixed(layer.netStress, 1)} MPa after displaced concrete` : "";
    return `<article><b>Layer ${layer.index} - ${layer.name}</b><span>${layer.designation} @ ${fixed(layer.spacing)} mm; ${status}; y<sub>${layer.index}</sub> = ${fixed(layer.yTop)} mm; A<sub>s${layer.index}</sub> = ${fixed(layer.areaPerMetre)} mm<sup>2</sup>/m; ${coverStatus}</span><small>&epsilon;<sub>s${layer.index}</sub> = ${signedFixed(layer.strain, 5)}; f<sub>s${layer.index}</sub> = ${signedFixed(layer.stress, 1)} MPa${displacementNote}; F<sub>s${layer.index}</sub> = ${signedFixed(layer.force / 1000, 1)} kN</small></article>`;
  }).join("");

  const shearFormulaSteps = shear.withinSimplifiedScope ? [
    calculationTraceRow({
      title: "Longitudinal effective depth",
      reference: "AS 3600 Cl. 8.2.1.9",
      formula: `d = &Sigma;(A<sub>s</sub>d<sub>i</sub>)/&Sigma;A<sub>s</sub>`,
      substitution: shear.centroidArea > 0 ? `${fixed(shear.dNumerator)} mm<sup>3</sup> / ${fixed(shear.centroidArea)} mm<sup>2</sup>` : `d = ${fixed(shear.d)} mm`,
      result: `d = ${fixed(shear.d)} mm`,
      applicability: `Centroid of longitudinal tension reinforcement in the tensile half-depth; ${shear.dBasis}.`
    }),
    calculationTraceRow({
      title: "Effective shear depth",
      reference: "AS 3600 Cl. 8.2.1.5 and AS 3600 Cl. 8.2.1.9",
      formula: `d<sub>v</sub> = max(0.72D, 0.9d)`,
      substitution: `max(0.72 &times; ${fixed(data.depth)}, 0.9 &times; ${fixed(shear.d)}) = max(${fixed(0.72 * data.depth)}, ${fixed(0.9 * shear.d)}) mm`,
      result: `b<sub>v</sub> = ${fixed(shear.bv)} mm; d<sub>v</sub> = ${fixed(shear.dv)} mm`,
      applicability: "Rectangular strip without ducts or voids."
    }),
    calculationTraceRow({
      title: "Simplified-method scope",
      reference: "AS 3600 Cl. 8.2.4.1",
      lookup: "Fixed quick-check applicability conditions.",
      selection: "Normal-weight, non-prestressed concrete; no axial tension or torsion; f'<sub>c</sub> &le; 65 MPa; f<sub>sy</sub> &le; 500 MPa; aggregate size &ge; 10 mm.",
      adopted: "Simplified one-way shear method",
      applicability: "Every fixed condition must match the project."
    }),
    calculationTraceRow({
      title: "Shear reinforcement area",
      formula: shear.hasShearReo ? `A<sub>sv</sub> = n<sub>sv</sub>A<sub>bar</sub>; A<sub>sv</sub>/s = A<sub>sv</sub>/s` : `A<sub>sv</sub>/s = 0`,
      substitution: shear.hasShearReo ? `${displayFixed(shear.nsv, 0)} &times; ${fixed(shear.shearBarArea)} mm<sup>2</sup> = ${fixed(shear.asv)} mm<sup>2</sup>; ${fixed(shear.asv)}/${fixed(shear.sv)}` : "",
      result: `A<sub>sv</sub>/s = ${displayFixed(shear.asvPerS, 3)} mm<sup>2</sup>/mm`,
      applicability: shear.hasShearReo ? `${shear.shearDesignation}; area from the reinforcement table.` : "No vertical shear reinforcement selected."
    }),
    calculationTraceRow({
      title: "Simplified shear factor",
      reference: "AS 3600 Cl. 8.2.4.3",
      formula: shear.minShearReoProvided ? `k<sub>v</sub> = 0.15` : `k<sub>v</sub> = min[200/(1000 + 1.3d<sub>v</sub>), 0.15]`,
      substitution: shear.minShearReoProvided ? `A<sub>sv</sub>/s = ${displayFixed(shear.asvPerS, 3)} &ge; ${displayFixed(shear.asvMinPerS, 3)} mm<sup>2</sup>/mm` : `min[200/(1000 + 1.3 &times; ${displayFixed(shear.dv, 3)}), 0.15]`,
      result: `k<sub>v</sub> = ${displayFixed(shear.kv, 3)}; &theta;<sub>v</sub> = ${displayFixed(shear.theta, 0)}&deg;`,
      applicability: `Minimum A<sub>sv</sub>/s = ${displayFixed(shear.asvMinPerS, 3)} mm<sup>2</sup>/mm.`
    }),
    calculationTraceRow({
      title: "Concrete shear contribution",
      reference: "AS 3600 Cl. 8.2.4.1",
      formula: `V<sub>uc</sub> = k<sub>v</sub>b<sub>v</sub>d<sub>v</sub>&radic;f'<sub>c</sub>`,
      substitution: `${displayFixed(shear.kv, 6)} &times; ${fixed(shear.bv)} mm &times; ${displayFixed(shear.dv, 3)} mm &times; ${displayFixed(shear.rootFc, 5)} MPa<sup>0.5</sup> / 1000`,
      result: `V<sub>uc</sub> = ${fixed(shear.vuc)} kN`,
      applicability: "&radic;f'<sub>c</sub> is limited to 8.0 MPa."
    }),
    calculationTraceRow({
      title: "Shear reinforcement contribution",
      reference: "AS 3600 Cl. 8.2.5.2",
      formula: shear.hasShearReo ? `V<sub>us</sub> = (A<sub>sv</sub>f<sub>sy.f</sub>d<sub>v</sub>/s)cot&theta;<sub>v</sub>` : `V<sub>us</sub> = 0`,
      substitution: shear.hasShearReo ? `(${fixed(shear.asv)} &times; ${fixed(shear.fsyf)} &times; ${displayFixed(shear.dv, 3)} / ${fixed(shear.sv)}) &times; ${displayFixed(shear.cotTheta, 6)} / 1000` : "",
      result: `V<sub>us</sub> = ${fixed(shear.vus)} kN`,
      applicability: shear.hasShearReo && !shear.minShearReoProvided ? "Provided A<sub>sv</sub>/s is below the AS 3600 Cl. 8.2.1.7 minimum; review required." : "Selected shear-reinforcement state."
    }),
    calculationTraceRow({
      title: "One-way shear design capacity",
      reference: "AS 3600 Cl. 8.2.3.1 and AS 3600 Table 2.2.2",
      formula: `V<sub>u</sub> = min(V<sub>uc</sub> + V<sub>us</sub>, V<sub>u,max</sub>); design capacity = &phi; &times; V<sub>u</sub>`,
      substitution: `min(${displayFixed(shear.vuc, 3)} + ${displayFixed(shear.vus, 3)}, ${displayFixed(shear.vuMax, 3)}) kN; &phi; = ${displayFixed(shear.phi, 2)}`,
      result: `Design one-way shear capacity = ${fixed(shear.phiVu)} kN`,
      applicability: shear.webCrushingLimited ? "Web crushing governs." : shear.minShearReoProvided ? "Verified minimum Class N fitments; no web-crushing limit governs." : "No verified minimum Class N fitments."
    })
  ].join("") : calculationTraceRow({
    title: "One-way shear scope",
    reference: "AS 3600 Cl. 8.2.4.1",
    result: "Not evaluated",
    applicability: `Outside simplified-method scope: ${shear.scopeFailures.join("; ")}. Use the applicable general shear method; this page is not a complete shear-design engine.`,
    state: "warning"
  });

  const layerAreaSubstitution = data.layers.map(layer => `${layer.designation}: ${fixed(layer.barArea)} &times; ${fixed(data.width)}/${fixed(layer.spacing)} = ${fixed(layer.area)} mm<sup>2</sup>`).join("; ");
  const layerDepthSubstitution = data.layers.map(layer => `d<sub>${layer.index}</sub> = ${fixed(direction === "top" ? layer.yTop : data.depth - layer.yTop)} mm`).join("; ");
  const manualDepthLayers = data.layers.filter(layer => !$(`layer${layer.index}Auto`).checked);
  const layerStateSubstitution = result.layers.map(layer =>
    `Layer ${layer.index}: &epsilon;<sub>s</sub> = ${signedFixed(layer.strain, 6)}, f<sub>s</sub> = ${signedFixed(layer.stress, 3)} MPa, F<sub>s</sub> = ${signedFixed(layer.force / 1000, 3)} kN`
  ).join("; ");
  const equilibriumTerms = result.layers.map(layer =>
    `${layer.force >= 0 ? "+" : "-"} ${displayFixed(Math.abs(layer.force) / 1000, 3)}`
  ).join(" ");
  const momentTerms = `${displayFixed(result.cc / 1000, 3)} &times; ${displayFixed(result.yCc, 3)} ${result.layers.map(layer =>
    `${layer.force >= 0 ? "+" : "-"} (${displayFixed(Math.abs(layer.force) / 1000, 3)} &times; ${displayFixed(layer.yTop, 3)})`
  ).join(" ")}`;
  $("concreteFormulaSteps").innerHTML = [
    calculationTraceRow({
      title: "Analysis basis",
      lookup: "One-metre reinforced-concrete strip",
      selection: `${direction === "top" ? "Top" : "Bottom"} compression face; ${sectionKind}`,
      adopted: compositeSection ? `D = ${fixed(data.topDepth)} + ${fixed(data.bottomDepth)} = ${fixed(data.depth)} mm` : `D = ${fixed(data.depth)} mm`,
      applicability: compositeSection ? "All active layers parallel to bending may participate; interface transfer, anchorage and composite action require separate verification." : "Only active layers parallel to bending in the selected pad section participate."
    }),
    calculationTraceRow({
      title: "Reinforcement depth",
      formula: reinforcementLayout === "two-way" ? `d<sub>i,face</sub> = c<sub>nom</sub> + 1.5d<sub>b</sub>` : `d<sub>i,face</sub> = c<sub>nom</sub> + 0.5d<sub>b</sub>`,
      substitution: layerDepthSubstitution,
      result: `${data.layers.length} active layer${data.layers.length === 1 ? "" : "s"}`,
      applicability: `${reinforcementLayout === "two-way" ? "Two-way reinforcement with the same bar size in both directions; checked bars are inside one contacting perpendicular layer." : "One-way reinforcement without a perpendicular layer."}${manualDepthLayers.length ? ` Manual depth override: layer${manualDepthLayers.length === 1 ? "" : "s"} ${manualDepthLayers.map(layer => layer.index).join(", ")}.` : ""}`
    }),
    calculationTraceRow({
      title: "Reinforcement area",
      formula: `A<sub>si</sub> = A<sub>bar,table</sub>b/s<sub>i</sub>`,
      substitution: layerAreaSubstitution,
      result: data.layers.map(layer => `Layer ${layer.index}: A<sub>s${layer.index}</sub> = ${fixed(layer.area)} mm<sup>2</sup>`).join("; "),
      applicability: "N-bar areas use the checked nominal reinforcement table. Legacy Y-bar strength remains a project-verification item; design-model f<sub>sy</sub> is capped at 600 MPa."
    }),
    calculationTraceRow({
      title: "Concrete stress-block factors",
      reference: "AS 3600 Cl. 8.1.3",
      formula: `&alpha;<sub>2</sub> = max(0.85 - 0.0015f'<sub>c</sub>, 0.67); &gamma; = max(0.97 - 0.0025f'<sub>c</sub>, 0.67)`,
      substitution: `f'<sub>c</sub> = ${fixed(data.fc)} MPa; max(0.85 - 0.0015 &times; ${fixed(data.fc)}, 0.67); max(0.97 - 0.0025 &times; ${fixed(data.fc)}, 0.67)`,
      result: `&alpha;<sub>2</sub> = ${displayFixed(data.alpha2, 3)}; &gamma; = ${displayFixed(data.gamma, 3)}`,
      applicability: "Rectangular equivalent concrete compression block."
    }),
    calculationTraceRow({
      title: "Equivalent concrete compression force",
      reference: "AS 3600 Cl. 8.1.3",
      formula: `a = min(D, &gamma;x); C<sub>c</sub> = &alpha;<sub>2</sub>f'<sub>c</sub>ba`,
      substitution: `a = min(${fixed(data.depth)}, ${displayFixed(data.gamma, 3)} &times; ${displayFixed(result.x, 4)}) = ${displayFixed(result.blockDepth, 4)} mm; C<sub>c</sub> = ${displayFixed(data.alpha2, 3)} &times; ${fixed(data.fc)} &times; ${fixed(data.width)} &times; ${displayFixed(result.blockDepth, 4)} / 1000`,
      result: `C<sub>c</sub> = ${fixed(result.cc / 1000)} kN`,
      applicability: "Compression force for the one-metre strip."
    }),
    calculationTraceRow({
      title: "Reinforcement strain and stress",
      reference: "AS 3600 Cl. 8.1.2",
      formula: `&epsilon;<sub>si</sub> = &epsilon;<sub>cu</sub>(x - d<sub>i</sub>)/x; f<sub>si</sub> = clamp(E<sub>s</sub>&epsilon;<sub>si</sub>, &plusmn;f<sub>sy</sub>)`,
      substitution: `x = ${displayFixed(result.x, 4)} mm; ${layerDepthSubstitution}; ${layerStateSubstitution}`,
      result: "Layer strains, stresses and forces are shown above and included in the neutral-axis and moment calculations below.",
      applicability: "Compression is positive and tension is negative. Displaced concrete stress is removed for bars inside the compression block."
    }),
    calculationTraceRow({
      title: "Neutral-axis equilibrium",
      reference: "AS 3600 Cl. 8.1.2",
      formula: `C<sub>c</sub> + &Sigma;F<sub>s</sub> = N<sup>*</sup>`,
      substitution: `${displayFixed(result.cc / 1000, 3)} ${equilibriumTerms} = 0 kN; solved x = ${displayFixed(result.x, 4)} mm`,
      result: `Equilibrium residual = ${displayFixed(residual, 3)} kN`,
      applicability: "Pure-bending section solution; no applied axial force."
    }),
    calculationTraceRow({
      title: "Nominal flexural capacity",
      reference: "AS 3600 Cl. 8.1.2 and AS 3600 Cl. 8.1.5",
      formula: `M<sub>uo</sub> = &Sigma;F<sub>i</sub>z<sub>i</sub>`,
      substitution: `|${momentTerms}| / 1000`,
      result: `Nominal section moment capacity M<sub>uo</sub> = ${fixed(result.muo)} kN&middot;m`,
      applicability: `Fixed strip width b = ${fixed(data.width)} mm.`
    }),
    calculationTraceRow({
      title: "Flexural capacity factor",
      reference: "AS 3600 Table 2.2.2",
      formula: legacyLayers.length ? `&phi; = 0.65` : `k<sub>uo</sub> = x/d<sub>o</sub>; &phi; = clamp(1.24 - 13k<sub>uo</sub>/12, 0.65, 0.85)`,
      substitution: legacyLayers.length ? "Legacy Y bar quick-screen basis." : `${displayFixed(result.x, 4)}/${displayFixed(result.d0, 3)} = ${displayFixed(result.kuo, 4)}`,
      result: `&phi; = ${displayFixed(result.phi, 3)}`,
      applicability: legacyLayers.length ? "Conservative pending actual bar grade and N-class equivalence." : "Pure bending with N-class reinforcement assumption."
    }),
    calculationTraceRow({
      title: "Ductility limit",
      reference: "AS 3600 Cl. 8.1.5",
      formula: `k<sub>uo</sub> = x/d<sub>o</sub> &le; 0.36`,
      substitution: `${displayFixed(result.x, 4)}/${displayFixed(result.d0, 3)} = ${displayFixed(result.kuo, 4)}`,
      result: result.kuo <= 0.36 ? "Within displayed limit" : "Review required",
      applicability: result.kuo > 0.36 ? "AS 3600 Cl. 8.1.5 conditions must be satisfied before using this as a design section." : "Displayed ductility boundary satisfied."
    }),
    calculationTraceRow({
      title: "Design flexural capacity",
      reference: "AS 3600 Table 2.2.2",
      formula: `Design &phi;M<sub>uo</sub> = &phi; &times; M<sub>uo</sub>`,
      substitution: `${displayFixed(result.phi, 4)} &times; ${displayFixed(result.muo, 3)} kN&middot;m`,
      result: `Design section moment capacity = ${fixed(result.phiMuo)} kN&middot;m`,
      applicability: "Verify capacity-factor and ductility assumptions before issue for design."
    }),
    shearFormulaSteps
  ].join("");
}

function setPrimaryPlane() {
  const isN = $("shearPlane").value === "N";
  $("threadPlanes").value = isN ? 1 : 0;
  $("shankPlanes").value = isN ? 0 : 1;
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
  if (integrityHoleDiameterTracksBolt) {
    $("integrityHoleDiameter").value = displayFixed(boltData[$("boltSize").value].d + 2, 1);
  }
  calculateBolt();
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

function screwProductClass(manufacturerKey, pile) {
  if (pile.productClass) return pile.productClass;
  const type = screwCapacityType(pile);
  if (manufacturerKey === "custom") return "Project-defined product";
  if (manufacturerKey === "surefoot") return "Alternative foundation system";
  if (manufacturerKey === "stopdigging") return "Published product";
  if (manufacturerKey === "driven") return "Published geometry row";
  if (["piletech", "hpa"].includes(manufacturerKey)) return "Engineered supplier range";
  if (manufacturerKey === "minmetals") return "Component family";
  if (type === "compression-swl-up-to") return "Published series";
  if (type === "system-swl-up-to") return "Published system row";
  if (type === "typical-benchmark") return "Technique benchmark";
  if (type === "directional-product") return "Published product";
  return "Published product family";
}

function screwProductCode(pile) {
  if (pile.productCode) return pile.productCode;
  if (pile.axialClass > 0) return `${screwCapacityText(pile.axialClass)} kN series`;
  return "No public model code";
}

function screwSupplyBasis(pile) {
  if (pile.supplyBasis) return pile.supplyBasis;
  const type = screwSystemType(pile);
  if (type === "Engineered pathway") return "Project-engineered; contact supplier";
  if (type === "Micro-pile footing") return "Supplier-designed complete system";
  return "Current availability to be confirmed";
}

function screwSourceConfidence(manufacturerKey, pile) {
  if (manufacturerKey === "custom") {
    return { level: "Project input", detail: "Source reference required", className: "source-user" };
  }
  if (manufacturerKey === "katana") {
    return { level: "Published guide + scope certificate", detail: "Rev Z row; CM30096 Rev6 scope checked separately; current 2025 catalogue row pending", className: "source-official" };
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
  if (manufacturerKey === "solidity") {
    return { level: "Published design table", detail: "2020 standard drawing; supplier review required", className: "source-official" };
  }
  if (manufacturerKey === "madewell") {
    return { level: "Manufacturer price list", detail: "Product codes and geometry checked; load basis not stated", className: "source-official" };
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
  if (type === "published-ultimate-table") {
    return { label: "Published ultimate table", detail: "Maximum load; supplier review and project checks required", className: "data-ultimate" };
  }
  if (type === "supplier-rating-up-to") {
    return { label: "Supplier rating up to", detail: "Direction and safety basis not stated", className: "data-supplier-rating" };
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
  if (type === "compression-swl-up-to") return { compression: "Compression SWL up to", uplift: "Published tension / uplift", lateral: "Published lateral" };
  if (type === "typical-benchmark") return { compression: "Typical compression SWL", uplift: "Typical tension SWL", lateral: "Typical lateral SWL" };
  if (type === "published-ultimate-table") return { compression: "Published compression", uplift: "Published tension / uplift", lateral: "Published lateral limit" };
  if (type === "project") return { compression: "Project compression", uplift: "Project tension", lateral: "Project lateral load" };
  return { compression: "Published compression", uplift: "Published tension / uplift", lateral: "Published lateral" };
}

function screwDisplayCapacities(pile, enteredValues) {
  return {
    compression: enteredValues.compression,
    uplift: enteredValues.uplift,
    lateral: enteredValues.lateral
  };
}

function screwReferenceLoad(pile) {
  const type = screwCapacityType(pile);
  if ((pile.rating || 0) <= 0) return null;
  const records = {
    "system-swl-up-to": { label: "System SWL up to", basis: "Complete-system value; not a direction-specific pile resistance." },
    "indicative-rating": { label: "Maximum recommended rating", basis: "Indicative system rating; not a pile resistance." },
    "typical-benchmark": { label: "Typical axial SWL up to", basis: "Technique benchmark; project resistance is required." },
    "published-ultimate-table": { label: "Published maximum load", basis: "Ultimate U.N.O.; not adopted as compression resistance." },
    "supplier-rating-up-to": { label: "Supplier rating up to", basis: "Load direction and safety basis are not stated." }
  };
  return records[type] ? { ...records[type], value: pile.rating } : null;
}

function screwDirectionalBasis(pile) {
  const type = screwCapacityType(pile);
  if (type === "compression-swl-up-to") {
    return { compression: "Guide SWL; stated conditions apply.", uplift: "", lateral: "" };
  }
  if (type === "typical-benchmark") {
    const basis = "Typical benchmark; project resistance is required.";
    return { compression: basis, uplift: basis, lateral: basis };
  }
  if (type === "published-ultimate-table") {
    return { compression: "", uplift: "", lateral: "At 1.5 m above competent soil; static testing required." };
  }
  if (type === "directional-product") {
    const basis = "Manufacturer product-sheet value; confirm project applicability.";
    return { compression: basis, uplift: basis, lateral: basis };
  }
  if (type === "project") {
    const basis = "Project source and design basis required.";
    return { compression: basis, uplift: basis, lateral: basis };
  }
  const basis = "Published direction-specific value; source conditions apply.";
  return { compression: basis, uplift: basis, lateral: basis };
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

function screwHasMultipleHelices(pile) {
  return /2 helices|multiple|multi[- ]helix|single or multi|project-selected helices/i.test(`${pile.helixCount || ""} ${pile.helix || ""}`);
}

function screwTorqueLimit(pile) {
  const type = screwSystemType(pile);
  if (type === "Micro-pile footing") return "Not applicable; driven installation.";
  return pile.torqueLimit || "";
}

function screwInstallationCriterion(pile) {
  return screwCompactFact(pile.installControl || "Supplier termination and refusal criteria required.", 92);
}

function screwPitchText(pile) {
  return pile.pitchSpacing ? screwCompactFact(pile.pitchSpacing, 92) : "";
}

function screwSourceReviewText(manufacturerKey) {
  if (manufacturerKey === "custom") return "Not reviewed";
  const catalogue = screwPileCatalogues[manufacturerKey];
  if (catalogue?.sourceReview) return catalogue.sourceReview;
  if (manufacturerKey === "katana") return "Local source reviewed · 10 Jul 2026";
  return "Public source accessed · 10 Jul 2026";
}

function screwHeadConnectionLimit(pile) {
  return pile.headConnection || "";
}

function screwDurabilityLimit(pile) {
  return pile.durability || "";
}

function screwIsUnpublishedText(text) {
  const value = String(text || "").trim();
  return !value || /not published|no [^.]*published/i.test(value);
}

function screwDataRequirementItems(pile) {
  const type = screwCapacityType(pile);
  const required = [];
  const missingDirections = [];
  if ((pile.compression || 0) <= 0 || ["system-swl-up-to", "indicative-rating", "published-ultimate-table", "supplier-rating-up-to", "typical-benchmark"].includes(type)) missingDirections.push("compression");
  if ((pile.uplift || 0) <= 0) missingDirections.push("tension");
  if ((pile.lateral || 0) <= 0) missingDirections.push("lateral");
  if (missingDirections.length === 3) required.push("certified directional resistances");
  else if (missingDirections.length) required.push(`project ${screwJoinTerms(missingDirections)} resistance${missingDirections.length > 1 ? "s" : ""}`);
  const foundingText = `${pile.foundingCriterion || ""} ${pile.soilRequirement || ""}`;
  if (screwIsUnpublishedText(foundingText)) required.push("founding criterion");
  if (screwSystemType(pile) !== "Micro-pile footing" && (!pile.torqueLimit || screwIsUnpublishedText(pile.installControl))) required.push("installation torque and acceptance criteria");
  if (!pile.headConnection) required.push("pile-head connection detail");
  if (!pile.durability) required.push("durability design basis");
  else if (/not stated/i.test(pile.durability)) required.push("design life / corrosion allowance");
  return required;
}

function screwJoinTerms(items) {
  if (items.length <= 1) return items[0] || "";
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

function screwDataRequiredText(pile) {
  const required = screwDataRequirementItems(pile);
  return required.length ? `${screwJoinTerms(required)}.` : "";
}

function screwAdoptionRequirementText(pile) {
  const type = screwCapacityType(pile);
  const system = screwSystemType(pile);
  const required = screwDataRequirementItems(pile);
  const sentences = [];
  if (required.length) sentences.push(`Obtain ${screwJoinTerms(required)}.`);
  if (type === "published-ultimate-table") sentences.push("Complete supplier review and project ULS/SLS checks.");
  else if (type === "supplier-rating-up-to") sentences.push("The supplier rating does not state load direction or safety basis.");
  else if (type === "system-swl-up-to") sentences.push("The system SWL is not a direction-specific pile resistance.");
  else if (type === "indicative-rating") sentences.push("Supplier footing design is required.");
  else if (type === "typical-benchmark") sentences.push("Treat the published values as benchmarks only.");
  else if (system === "Ground screw") sentences.push("Confirm project applicability and certification.");
  else if (system === "Micro-pile footing") sentences.push("Use the supplier-designed footing arrangement.");
  return sentences.join(" ") || "Confirm project ground, installation and acceptance criteria.";
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
  if (capacityType === "published-ultimate-table") {
    return "Ultimate table value only; supplier review and project ULS/SLS checks are required.";
  }
  if (capacityType === "supplier-rating-up-to") {
    return "Supplier rating basis is not stated; obtain certified direction-specific values.";
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
    const labels = {
      "indicative-rating": "Rating",
      "typical-benchmark": "Typical SWL",
      "published-ultimate-table": "Maximum load",
      "supplier-rating-up-to": "Supplier rating"
    };
    const label = labels[type] || "System SWL";
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
  if (["compression-swl-up-to", "system-swl-up-to", "partial-directional", "published-ultimate-table"].includes(type)) return "axial";
  if (["indicative-rating", "typical-benchmark", "supplier-rating-up-to"].includes(type)) return "rating";
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
  const rating = ["system-swl-up-to", "indicative-rating", "typical-benchmark", "published-ultimate-table", "supplier-rating-up-to"].includes(type) ? (pile.rating || 0) : 0;
  const primaryLabels = {
    "system-swl-up-to": "System SWL",
    "indicative-rating": "Rating",
    "typical-benchmark": "Typical SWL",
    "published-ultimate-table": "Maximum load",
    "supplier-rating-up-to": "Supplier rating"
  };
  const loadBases = {
    "compression-swl-up-to": "SWL / working reference",
    "system-swl-up-to": "SWL / working reference",
    "typical-benchmark": "SWL / working reference",
    "indicative-rating": "Indicative rating",
    "directional-product": "Published load; basis not verified",
    "published-ultimate-table": "Ultimate U.N.O.",
    "supplier-rating-up-to": "Basis not stated"
  };
  return {
    primaryLabel: primaryLabels[type] || "Compression",
    compression: rating || pile.compression || 0,
    publishedCompression: pile.compression || 0,
    tension: pile.uplift || 0,
    lateral: pile.lateral || 0,
    unitBasis: type === "published-ultimate-table" ? "Published pile row" : type === "supplier-rating-up-to" ? "Supplier product series" : ["system-swl-up-to", "indicative-rating"].includes(type) ? "Complete system" : type === "typical-benchmark" ? "Technique benchmark" : "Per pile / product",
    loadBasis: loadBases[type] || "Basis not stated"
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

function screwProductOptionLabel(item) {
  const diameter = String(item.diameter || "").trim();
  const diameterNumber = diameter.match(/[\d.]+/)?.[0] || "";
  return diameter && diameterNumber && !item.label.includes(diameterNumber) ? `${item.label} · ${diameter}` : item.label;
}

function populateScrewSeries() {
  const catalogue = selectedScrewCatalogue();
  const previous = $("screwSeries").value;
  const entries = Object.entries(catalogue.series);
  $("screwSeries").innerHTML = entries.map(([key, item]) => `<option value="${safeText(key)}">${safeText(screwProductOptionLabel(item))}</option>`).join("");
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

function setScrewFactRow(rowId, valueId, text) {
  const row = $(rowId);
  const value = String(text ?? "").trim();
  if (row) row.hidden = !value;
  if (value) setOptionalText(valueId, value);
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
    .replace(/Record installation pressure and torque for every pier/gi, "Record pressure/torque per pier")
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

function updateScrewReferenceLoad(pile) {
  const row = $("screwReferenceLoadRow");
  const reference = screwReferenceLoad(pile);
  if (!row) return;
  row.hidden = !reference;
  if (!reference) return;
  setOptionalText("screwReferenceLoadLabel", reference.label);
  setOptionalText("screwReferenceLoadValue", screwCapacityText(reference.value));
  setOptionalText("screwReferenceLoadBasis", reference.basis);
}

function updateScrewSketch(pile, compressionCap, upliftCap, lateralCap) {
  const sketch = $("screwPileSketch");
  const dims = screwSketchDimensions(pile);
  const manufacturerKey = $("screwManufacturer").value;
  const confidence = screwSourceConfidence(manufacturerKey, pile);
  const system = screwSelectedText(pile.system || "Screw pile");
  const shaftText = screwSelectedText(pile.shaft);
  const helixText = screwSelectedText(pile.helix || "Project-specific bearing element");
  const shaftFact = `${screwSelectedText(pile.diameter || shaftText)} / wall ${screwSelectedText(pile.wall)}`;
  setOptionalText("screwFactProductClass", screwProductClass(manufacturerKey, pile));
  setOptionalText("screwFactProductCode", screwProductCode(pile));
  setOptionalText("screwFactSystemType", screwSystemType(pile));
  setOptionalText("screwFactSystem", system);
  setOptionalText("screwFactShaft", shaftFact);
  setOptionalText("screwFactHelixCount", screwSelectedText(pile.helixCount));
  setOptionalText("screwFactHelix", helixText);
  setOptionalText("screwFactLength", screwCompactFact(pile.length || "Project-specific", 72));
  setOptionalText("screwFactExtension", screwCompactFact(pile.extension || "Project-specific connection", 80));
  setOptionalText("screwFactSteel", screwCompactFact(pile.steel || "Supplier/project specification", 92));
  const foundingCriterion = pile.foundingCriterion || pile.soilRequirement || "";
  const installationControl = pile.installControl || "";
  setScrewFactRow("screwFactFoundingRow", "screwFactFounding", screwIsUnpublishedText(foundingCriterion) ? "" : foundingCriterion);
  setScrewFactRow("screwFactPitchRow", "screwFactPitch", screwPitchText(pile));
  setScrewFactRow("screwFactInstallRow", "screwFactInstallCriterion", screwIsUnpublishedText(installationControl) ? "" : screwInstallationCriterion(pile));
  setScrewFactRow("screwFactTorqueRow", "screwFactTorqueLimit", screwTorqueLimit(pile));
  setScrewFactRow("screwFactHeadRow", "screwFactHeadConnection", screwHeadConnectionLimit(pile));
  setScrewFactRow("screwFactDurabilityRow", "screwFactDurability", screwDurabilityLimit(pile));
  setScrewSourceLink("screwFactSource", pile.source || "Project source", selectedScrewCatalogue().sourceUrl);
  setOptionalText("screwFactSourceStatus", confidence.level);
  setOptionalText("screwFactCapacityBasis", screwCompactFact(pile.capacityBasis || "Adopt certified resistance before action checks.", 160));
  setOptionalText("screwFactSourceReview", screwSourceReviewText(manufacturerKey));
  setOptionalText("screwFactAdoption", screwAdoptionRequirementText(pile));
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
  const layoutInputs = updateScrewLayoutControls();
  if (!layoutInputs.valid) throw new RangeError(layoutInputs.error);
  return ScrewDemand.rectangularCoordinates({ layout, ...layoutInputs });
}

function updateScrewLayoutControls() {
  const perimeter = $("screwLayout").value === "rect-perimeter";
  $("screwPileColumnsLabel").innerHTML = perimeter ? "Piles per X edge, n<sub>x</sub>" : "Pile columns, n<sub>x</sub>";
  $("screwPileRowsLabel").innerHTML = perimeter ? "Piles per Y edge, n<sub>y</sub>" : "Pile rows, n<sub>y</sub>";
  $("screwLayoutNote").innerHTML = perimeter
    ? "Counts include corner piles. L<sub>x</sub> and L<sub>y</sub> are centre-to-centre spans between outer piles."
    : "All grid intersections contain a pile. L<sub>x</sub> and L<sub>y</sub> are centre-to-centre spans between outer piles.";
  try {
    return {
      ...ScrewDemand.validateLayout({
        columns: numericValue($("screwPileColumns").value),
        rows: numericValue($("screwPileRows").value),
        lengthX: numericValue($("screwGroupLengthX").value),
        lengthY: numericValue($("screwGroupLengthY").value)
      }),
      valid: true,
      error: ""
    };
  } catch (error) {
    return { valid: false, error: error.message };
  }
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
  setStatusClass(status, "check");
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
  const actionInputs = {
    baseN: numericValue($("screwDemandN").value),
    vx: numericValue($("screwDemandVx").value),
    vy: numericValue($("screwDemandVy").value),
    mx: numericValue($("screwDemandMx").value),
    my: numericValue($("screwDemandMy").value),
    tz: numericValue($("screwDemandTz").value)
  };
  const layoutInputs = updateScrewLayoutControls();
  const actionsValid = Object.values(actionInputs).every(Number.isFinite);
  if (!layoutInputs.valid || !actionsValid) {
    $("screwDemandPileCount").textContent = "-";
    $("screwDemandCompression").textContent = "Not evaluated";
    $("screwDemandUplift").textContent = "Not evaluated";
    $("screwDemandLateral").textContent = "Not evaluated";
    $("screwDemandCompressionPile").textContent = "Pile -";
    $("screwDemandUpliftPile").textContent = "Pile -";
    $("screwDemandLateralPile").textContent = "Pile -";
    $("screwReactionRows").innerHTML = "";
    $("screwDemandRatio").textContent = "Not assessed";
    $("screwDemandStatus").textContent = "Input required";
    setStatusClass($("screwDemandStatus"), "check");
    const reason = layoutInputs.valid ? "Enter a finite value for every group action." : layoutInputs.error;
    $("screwDemandFormulaSteps").innerHTML = calculationTraceRow({
      title: "Pile-group action distribution",
      result: "Not evaluated",
      applicability: reason,
      state: "warning"
    });
    return;
  }
  const coords = screwLayoutCoordinates();
  const { baseN, vx, vy, mx, my, tz } = actionInputs;
  const distribution = ScrewDemand.distribute({
    coordinates: coords,
    axial: baseN,
    shearX: vx,
    shearY: vy,
    momentX: mx,
    momentY: my,
    torsion: tz
  });
  const {
    count: n,
    reactions,
    maxCompression,
    maxUplift,
    maxLateral,
    maxCompressionPile,
    maxUpliftPile,
    maxLateralPile
  } = distribution;
  const { sumX2, sumY2, sumXY, sumR2 } = distribution.sums;
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
  $("screwDemandRatio").innerHTML = !hasDemand || !comparisonEnabled ? "Not assessed" : missingCapacity ? `${ratioSymbol} = incomplete` : `${ratioSymbol} = ${displayFixed(utilisation, 2)}`;
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
    comparisonFormula = calculationTraceRow({
      title: "Project directional comparison",
      formula: `&eta;<sub>proj</sub> = max(N<sub>c,max</sub><sup>*</sup>/R<sub>c,proj</sub>, N<sub>t,max</sub><sup>*</sup>/R<sub>t,proj</sub>, V<sub>h,max</sub><sup>*</sup>/R<sub>h,proj</sub>)`,
      substitution: capacityComparisons,
      result: missingCapacity ? "Incomplete project comparison" : `Maximum directional ratio = ${displayFixed(utilisation, 2)}`,
      applicability: `Entered source: ${safeText(comparison.source)}. Action and value basis: ${actionBasisLabel}. Combined axial-horizontal interaction is not assessed.`
    });
  } else if (comparisonBasis === "project-source-missing") {
    comparisonFormula = calculationTraceRow({
      title: "Project directional comparison",
      result: "Not evaluated",
      applicability: "Enter a source reference for the project design values. No ratio is reported.",
      state: "warning"
    });
  } else if (comparisonBasis === "project-basis-mismatch") {
    comparisonFormula = calculationTraceRow({
      title: "Project directional comparison",
      result: "Not evaluated",
      applicability: `The project value basis does not match ${actionBasisLabel}. No ratio is reported.`,
      state: "warning"
    });
  } else {
    comparisonFormula = calculationTraceRow({
      title: "Action distribution only",
      result: "Pile action effects calculated",
      applicability: "No project design values are entered. Manufacturer values are not compared automatically."
    });
  }

  $("screwDemandFormulaSteps").innerHTML = [
    calculationTraceRow({
      title: "Action-distribution model",
      reference: "Derived rigid-cap equilibrium model",
      formula: `&Sigma;x<sub>j</sub>y<sub>j</sub> = 0 for the symmetric layout; actions are distributed by rigid-cap equilibrium`,
      substitution: `n = ${n}; &Sigma;x<sub>j</sub>y<sub>j</sub> = ${fixed2(sumXY)} m<sup>2</sup>; &Sigma;x<sub>j</sub><sup>2</sup> = ${fixed2(sumX2)} m<sup>2</sup>; &Sigma;y<sub>j</sub><sup>2</sup> = ${fixed2(sumY2)} m<sup>2</sup>; &Sigma;r<sub>j</sub><sup>2</sup> = ${fixed2(sumR2)} m<sup>2</sup>`,
      result: `${n}-pile symmetric rectangular group`,
      applicability: `Rigid pad; vertical identical piles; equal axial stiffness in compression and tension; equal horizontal stiffness; no pad-soil resistance. ${actionBasisLabel}.`
    }),
    calculationTraceRow({
      title: "Axial pile action",
      reference: "Derived rigid-cap equilibrium model",
      formula: `N<sub>i</sub><sup>*</sup> = N<sup>*</sup>/n + M<sub>x</sub><sup>*</sup>y<sub>i</sub>/&Sigma;y<sub>j</sub><sup>2</sup> + M<sub>y</sub><sup>*</sup>x<sub>i</sub>/&Sigma;x<sub>j</sub><sup>2</sup>`,
      substitution: `N<sup>*</sup> = ${fixed(baseN)} kN; M<sub>x</sub><sup>*</sup> = ${fixed(mx)} kN&middot;m; M<sub>y</sub><sup>*</sup> = ${fixed(my)} kN&middot;m; n = ${n}`,
      result: `Maximum compression = ${fixed(maxCompression)} kN; maximum tension = ${fixed(maxUplift)} kN`,
      applicability: "Positive N<sub>i</sub><sup>*</sup> denotes compression; pile coordinates are measured from the group centroid."
    }),
    calculationTraceRow({
      title: "Horizontal pile action",
      reference: "Derived rigid-cap equilibrium model",
      formula: `V<sub>x,i</sub><sup>*</sup> = V<sub>x</sub><sup>*</sup>/n - T<sub>z</sub><sup>*</sup>y<sub>i</sub>/&Sigma;r<sub>j</sub><sup>2</sup>; V<sub>y,i</sub><sup>*</sup> = V<sub>y</sub><sup>*</sup>/n + T<sub>z</sub><sup>*</sup>x<sub>i</sub>/&Sigma;r<sub>j</sub><sup>2</sup>; V<sub>i</sub><sup>*</sup> = &radic;[(V<sub>x,i</sub><sup>*</sup>)<sup>2</sup> + (V<sub>y,i</sub><sup>*</sup>)<sup>2</sup>]`,
      substitution: `V<sub>x</sub><sup>*</sup> = ${fixed(vx)} kN; V<sub>y</sub><sup>*</sup> = ${fixed(vy)} kN; T<sub>z</sub><sup>*</sup> = ${fixed(tz)} kN&middot;m; n = ${n}`,
      result: `Maximum horizontal pile action = ${fixed(maxLateral)} kN`,
      applicability: "Equal-stiffness distribution; pile-head fixity, soil-pile interaction and horizontal displacement are excluded."
    }),
    comparisonFormula
  ].join("");
}

function calculateScrew() {
  const pile = selectedScrewPile();
  const manufacturerKey = $("screwManufacturer").value;
  const confidence = screwSourceConfidence(manufacturerKey, pile);
  const dataStatus = screwDataStatus(manufacturerKey, pile);
  const capacityLabels = screwCapacityLabels(pile);
  const directionalBasis = screwDirectionalBasis(pile);
  const enteredValues = {
    compression: value("screwCompressionCap"),
    uplift: value("screwUpliftCap"),
    lateral: value("screwLateralCap")
  };
  const displayValues = screwDisplayCapacities(pile, enteredValues);
  const comparisonValues = screwComparisonCapacities(pile, displayValues);
  $("screwDesignation").textContent = pile.label;
  const supplyBasis = screwSupplyBasis(pile);
  const assumption = $("screwAssumption");
  const showSupplyBasis = supplyBasis && !/^Current availability to be confirmed$/i.test(supplyBasis);
  assumption.hidden = !showSupplyBasis;
  if (showSupplyBasis) assumption.textContent = supplyBasis;
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
  updateScrewReferenceLoad(pile);
  setScrewResistanceOutput(
    "screwCompressionResult",
    "screwCompressionUnit",
    "screwCompressionBasis",
    displayValues.compression,
    directionalBasis.compression,
    "Not published for this direction."
  );
  setScrewResistanceOutput(
    "screwUpliftResult",
    "screwUpliftUnit",
    "screwUpliftBasis",
    displayValues.uplift,
    directionalBasis.uplift,
    "Not published for this direction."
  );
  setScrewResistanceOutput(
    "screwLateralResult",
    "screwLateralUnit",
    "screwLateralBasis",
    displayValues.lateral,
    directionalBasis.lateral,
    "Not published for this direction."
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

function readReoOptions() {
  const doubleArea = $("reoDoubleArea").checked;
  const halfSpliced = $("reoHalfSpliced").checked;
  const rebarPath = $("reoRebarPath").value;
  return {
    memberRole: $("reoMemberRole").value,
    memberType: $("reoMemberType").value,
    lapType: $("reoLapType").value,
    method: $("reoMethod").value,
    rebarPath,
    fc: numericValue($("reoConcreteStrength").value),
    castingPosition: $("reoCastingPosition").value,
    materialCondition: $("reoMaterialCondition").value,
    cover: numericValue($("reoCover").value),
    clearSpacing: numericValue($("reoClearSpacing").value),
    barGap: numericValue($("reoBarGap").value),
    k7Basis: doubleArea && halfSpliced ? "qualified" : "default",
    doubleArea,
    halfSpliced,
    staggeredArrangement: false,
    refinedArrangement: $("reoRefinedArrangement").value,
    atrMinBasis: $("reoAtrMinBasis").value,
    nf: numericValue($("reoNf").value),
    nbs: numericValue($("reoNbs").value),
    atrTotal: numericValue($("reoAtrTotal").value),
    pressure: numericValue($("reoPressure").value),
    pressureReference: $("reoPressureReference").value,
    pressureBasisConfirmed: $("reoPressureBasisConfirmed").checked,
    transverseEffective: $("reoTransverseLocationConfirmed").checked,
    atrCountConfirmed: $("reoAtrCountConfirmed").checked
  };
}

function readReoDevelopmentOptions() {
  return {
    barOrigin: $("reoExistingBarOrigin").value,
    memberType: $("reoExistingMemberType").value,
    fc: numericValue($("reoExistingConcreteStrength").value),
    castingPosition: $("reoExistingCastingPosition").value,
    materialCondition: $("reoExistingMaterialCondition").value,
    cover: numericValue($("reoExistingCover").value),
    clearSpacing: numericValue($("reoExistingClearSpacing").value),
    c1: numericValue($("reoExistingC1").value),
    method: $("reoExistingMethod").value,
    refinedArrangement: $("reoExistingRefinedArrangement").value,
    atrMinBasis: $("reoExistingAtrMinBasis").value,
    nf: numericValue($("reoExistingNf").value),
    nbs: numericValue($("reoExistingNbs").value),
    atrTotal: numericValue($("reoExistingAtrTotal").value),
    pressure: numericValue($("reoExistingPressure").value),
    pressureReference: $("reoExistingPressureReference").value,
    pressureBasisConfirmed: $("reoExistingPressureBasisConfirmed").checked,
    transverseEffective: $("reoExistingTransverseLocationConfirmed").checked,
    atrCountConfirmed: $("reoExistingAtrCountConfirmed").checked,
    terminationType: $("reoCastInTermination").value,
    terminationDetailingConfirmed: $("reoCastInTerminationConfirmed").checked
  };
}

function reoPathState(options) {
  const rebarPath = options.rebarPath;
  return {
    rebarPath,
    requiresLap: rebarPath === "starter-lap",
    requiresDevelopment: rebarPath === "end-anchorage"
  };
}

function populateReoData() {
  $("reoBar").innerHTML = reoBars.filter(bar => bar.diameter <= 40).map(bar => `<option value="${bar.designation}">${bar.designation}</option>`).join("");
  $("reoBar").value = "N20";
  $("reoProductTableRows").innerHTML = reoBars.map(bar => `<tr class="${bar.diameter > 40 ? "is-excluded" : ""}"><td>${bar.designation}</td><td>${bar.diameter} mm</td><td>${bar.area.toLocaleString("en-AU")} mm&sup2;</td><td>${displayFixed(bar.standardMass, bar.standardMass < 1 ? 3 : 2)} kg/m</td><td>${displayFixed(bar.supplierMass, 2)} kg/m</td><td>${bar.metresPerTonne.toLocaleString("en-AU")} m/t</td><td>${bar.availability}</td><td>${bar.diameter > 40 ? "Reference only · outside calculator scope" : "Within calculator scope"}</td></tr>`).join("");
}

function updateReoConditionalFields(options) {
  const path = reoPathState(options);
  const origin = $("reoExistingBarOrigin").value;
  const pirOrigin = origin === "pir";
  const routeKey = `${path.rebarPath}|${origin}`;
  const routeChanged = routeKey !== reoPreviousRouteKey;

  $("reoRebarPathField").hidden = false;
  $("reoExistingBarOriginField").hidden = !path.requiresDevelopment;
  document.querySelector(".reo-context-fields").classList.toggle("has-origin", path.requiresDevelopment);
  $("reoExistingBarOriginLabel").textContent = "Bar installation";
  $("reoLapPathInputs").hidden = !path.requiresLap;
  $("reoAnchorageInputs").hidden = !path.requiresDevelopment;
  const projectStressSelected = $("reoAnchorageBasis").value === "actual";
  const originFields = document.querySelector(".reo-origin-fields");
  originFields.classList.toggle("is-pir", pirOrigin);
  originFields.classList.toggle("is-cast-in", !pirOrigin);
  originFields.classList.toggle("has-stress", projectStressSelected);
  $("reoSteelStressField").hidden = !projectStressSelected;
  $("reoReducedLengthRefinedConfirmedField").hidden = !projectStressSelected || $("reoExistingMethod").value !== "refined";
  $("reoCastInTerminationField").hidden = !path.requiresDevelopment || pirOrigin;
  const standardTerminationSelected = !pirOrigin && ["hook", "cog"].includes($("reoCastInTermination").value);
  $("reoCastInTerminationConfirmedField").hidden = !path.requiresDevelopment || !standardTerminationSelected;
  $("reoTerminationRequirements").hidden = !path.requiresDevelopment || !standardTerminationSelected;
  if (!standardTerminationSelected) $("reoCastInTerminationConfirmed").checked = false;
  const stressForHook = projectStressSelected ? numericValue($("reoSteelStress").value) : 500;
  const selectedBar = reoBarByDesignation($("reoBar").value);
  const db = selectedBar?.diameter || 0;
  const coatedBar = ["epoxy", "both"].includes($("reoExistingMaterialCondition").value);
  const bendFactor = coatedBar && db >= 20 ? 8 : 5;
  const bendDiameter = bendFactor * db;
  const hookExtension = Math.max(4 * db, 70);
  const restraintRequired = Number.isFinite(stressForHook) && stressForHook > 400;
  if (standardTerminationSelected) {
    const method = $("reoCastInTermination").value;
    const methodRequirement = method === "cog"
      ? `90&deg; cog; internal bend diameter ${displayFixed(bendDiameter, 0)} mm minimum and ${displayFixed(8 * db, 0)} mm maximum; total bar length as the corresponding 180&deg; hook.`
      : `180&deg; or 135&deg; hook; straight extension ${displayFixed(hookExtension, 0)} mm minimum.`;
    const restraintRequirement = restraintRequired
    ? `Transverse restraint required: bar diameter at least ${displayFixed(db, 0)} mm, in contact, extending ${displayFixed(4 * db, 0)} mm each side.`
      : "No >400 MPa transverse-restraint trigger from the selected stress basis.";
    $("reoTerminationRequirements").innerHTML = `<b>Standard ${method} requirements</b><span>${methodRequirement} Bend diameter follows AS 3600 Cl. 17.2.3.3 (${bendFactor}d<sub>b</sub> for the selected condition). ${restraintRequirement} Galvanized reinforcement is not represented by this selector; verify AS 3600 Cl. 17.2.3.3(d) separately.</span>`;
  }
  $("reoSteelStressLabel").innerHTML = standardTerminationSelected
    ? "Maximum design tensile stress in anchored bar, &sigma;<sub>st</sub>"
    : "Design tensile stress at assessed section, &sigma;<sub>st</sub>";
  $("reoSteelStressHelp").textContent = standardTerminationSelected
    ? "Use the maximum design tensile stress in the bar being anchored. Verify it against the project calculation before issue."
    : "Use the design tensile stress in the bar at the assessed section. Verify it against the project calculation before issue.";
  $("reoLapGeometryGroup").hidden = !path.requiresLap;
  $("reoLapFactorGroup").hidden = !path.requiresLap;
  $("reoFactorSummary").hidden = !path.requiresLap;
  $("reoLapResultSection").hidden = !path.requiresLap;
  $("reoScheduleDetails").hidden = !path.requiresLap || options.method !== "basic" || (options.doubleArea && options.halfSpliced);
  $("reoAnchorageResultSection").hidden = !path.requiresDevelopment;
  $("reoAssumptionsDetails").hidden = !path.requiresLap;
  const lapAssumptionFields = [
    "reoMemberRoleField", "reoMemberTypeField", "reoLapTypeField", "reoMethodField",
    "reoCastingPositionField", "reoMaterialConditionField"
  ];
  lapAssumptionFields.forEach(id => { $(id).hidden = !path.requiresLap; });
  $("reoAssumptionsTitle").textContent = "Common assumptions";

  const assumptionParts = path.requiresLap
    ? [
      options.memberRole === "tension-tie" ? "tension-tie" : "not a tension-tie",
      options.memberType === "narrow" ? "narrow member" : "wide member",
      options.lapType === "noncontact" ? "non-contact lap" : "contact lap",
      options.method === "refined" ? "Refined" : "Basic",
      options.castingPosition === "top" ? "top-cast bar" : "other casting position",
      options.materialCondition === "standard" ? "normal-weight, uncoated" : $("reoMaterialCondition").selectedOptions[0].textContent.trim()
    ]
    : [];
  $("reoAssumptionSummary").textContent = assumptionParts.join(" · ");
  if (pirOrigin && routeChanged) $("reoExistingMethod").value = "basic";
  $("reoAnchorageBasisField").hidden = false;
  $("reoExistingMethodField").hidden = pirOrigin;
  $("reoAnchorageStressNote").hidden = false;
  $("reoAnchorageStressNote").innerHTML = "Full yield is the default. A lower project stress retains the 12d<sub>b</sub> minimum.";
  $("reoReferenceBasisHeading").textContent = pirOrigin ? "AS 3600 reference basis" : "Cast-in development basis";
  $("reoReferenceBasisHelp").textContent = pirOrigin
    ? "Select the stress basis for the AS 3600 reference."
    : "Select the anchorage, stress and development basis.";
  $("reoExistingCastingPositionLabel").textContent = pirOrigin ? "AS 3600 casting-position assumption" : "Casting position";
  $("reoExistingMaterialConditionLabel").textContent = pirOrigin ? "AS 3600 material condition" : "Material condition";
  $("reoAnchoragePathTitle").textContent = pirOrigin ? "Post-installed bar termination" : "Development at bar termination";
  $("reoAnchoragePathNote").textContent = pirOrigin
    ? "Reference calculation only."
    : "Straight, hook or cog development.";
  $("reoCalculationDetailsSummary").textContent = path.requiresLap
    ? "Factors, clauses and Basic schedule."
    : "Factors and clauses.";
  $("reoAnchorageResultTitle").textContent = pirOrigin
    ? "AS 3600 reference depth"
    : standardTerminationSelected
      ? `Standard ${$("reoCastInTermination").value} anchorage reference`
      : "Development reference length";

  const showGap = path.requiresLap && options.memberType === "narrow" && options.lapType === "noncontact";
  $("reoBarGapField").hidden = !showGap;
  $("reoRefinedDetails").hidden = !path.requiresLap || options.method !== "refined";
  const lapConfinementEntered = options.refinedArrangement !== "none";
  $("reoRefinedInputGrid").classList.toggle("is-simple", !lapConfinementEntered);
  const lapAtrMin = options.atrMinBasis === "beam-column" ? 0.25 * (selectedBar?.area || 0) : 0;
  const lapConfinementPotential = lapConfinementEntered
    && Number.isFinite(options.atrTotal)
    && options.atrTotal > lapAtrMin;
  $("reoCountingGuide").hidden = !lapConfinementEntered;
  $("reoAtrMinBasisField").hidden = !lapConfinementEntered;
  $("reoNfField").hidden = !lapConfinementEntered;
  $("reoNbsField").hidden = !lapConfinementEntered;
  $("reoAtrTotalField").hidden = !lapConfinementEntered;
  $("reoTransverseLocationField").hidden = !lapConfinementPotential;
  $("reoNf").disabled = !lapConfinementEntered;
  $("reoNbs").disabled = !lapConfinementEntered;
  $("reoAtrCountConfirmedField").hidden = !lapConfinementPotential || !options.transverseEffective;
  $("reoAtrMinHelp").hidden = options.memberType !== "narrow";
  const lapPressureEvidenceRequired = Number.isFinite(options.pressure) && options.pressure > 0;
  $("reoPressureReferenceField").hidden = !lapPressureEvidenceRequired;
  $("reoPressureBasisConfirmedField").hidden = !lapPressureEvidenceRequired;
  const lapSlabWallOption = $("reoAtrMinBasis").querySelector('option[value="slab-wall"]');
  lapSlabWallOption.disabled = options.memberType === "narrow";
  if (lapConfinementEntered && options.memberType === "narrow") $("reoAtrMinBasis").value = "beam-column";

  const developmentOptions = readReoDevelopmentOptions();
  const hookedOrCoggedDevelopment = developmentOptions.barOrigin !== "pir"
    && ["hook", "cog"].includes(developmentOptions.terminationType);
  $("reoExistingGeometryHelp").innerHTML = hookedOrCoggedDevelopment
    ? developmentOptions.memberType === "narrow"
      ? "Hook / cog: c<sub>d</sub> = min(a/2, c<sub>1</sub>). Clear cover remains a detailing check."
      : "Hook / cog: c<sub>d</sub> = a/2. Clear cover remains a detailing check."
    : developmentOptions.memberType === "narrow"
      ? "Straight bar: c<sub>d</sub> = min(a/2, c<sub>1</sub>, c). Use the actual bar position."
      : "Straight bar: c<sub>d</sub> = min(a/2, c). Use the actual bar position.";
  $("reoExistingC1Field").hidden = developmentOptions.memberType !== "narrow";
  $("reoExistingGeometryFields").classList.toggle("is-narrow", developmentOptions.memberType === "narrow");
  $("reoExistingRefinedDetails").hidden = !path.requiresDevelopment || developmentOptions.method !== "refined";
  const existingConfinementEntered = developmentOptions.refinedArrangement !== "none";
  $("reoExistingRefinedInputGrid").classList.toggle("is-simple", !existingConfinementEntered);
  const existingAtrMin = developmentOptions.atrMinBasis === "beam-column" ? 0.25 * (selectedBar?.area || 0) : 0;
  const existingConfinementPotential = existingConfinementEntered
    && Number.isFinite(developmentOptions.atrTotal)
    && developmentOptions.atrTotal > existingAtrMin;
  $("reoExistingAtrMinBasisField").hidden = !existingConfinementEntered;
  $("reoExistingNfField").hidden = !existingConfinementEntered;
  $("reoExistingNbsField").hidden = !existingConfinementEntered;
  $("reoExistingAtrTotalField").hidden = !existingConfinementEntered;
  $("reoExistingTransverseLocationField").hidden = !existingConfinementPotential;
  $("reoExistingNf").disabled = !existingConfinementEntered;
  $("reoExistingNbs").disabled = !existingConfinementEntered;
  $("reoExistingAtrCountConfirmedField").hidden = !existingConfinementPotential || !developmentOptions.transverseEffective;
  $("reoExistingAtrMinHelp").hidden = developmentOptions.memberType !== "narrow";
  const existingPressureEvidenceRequired = Number.isFinite(developmentOptions.pressure) && developmentOptions.pressure > 0;
  $("reoExistingPressureReferenceField").hidden = !existingPressureEvidenceRequired;
  $("reoExistingPressureBasisConfirmedField").hidden = !existingPressureEvidenceRequired;
  const existingSlabWallOption = $("reoExistingAtrMinBasis").querySelector('option[value="slab-wall"]');
  existingSlabWallOption.disabled = developmentOptions.memberType === "narrow";
  if (existingConfinementEntered && developmentOptions.memberType === "narrow") $("reoExistingAtrMinBasis").value = "beam-column";
  reoPreviousRouteKey = routeKey;
}

function updateReoReductionAssessment(options, result, basicReference) {
  const fallbackToBasic = !result?.eligible && basicReference?.eligible;
  const assessmentResult = result?.eligible ? result : fallbackToBasic ? basicReference : null;
  const assessmentOptions = fallbackToBasic ? { ...options, method: "basic" } : options;
  if (!assessmentResult?.eligible || !assessmentResult.bar) {
    $("reoK7SummaryValue").innerHTML = "k<sub>7</sub> not applicable";
    $("reoK7ReductionNote").textContent = "No eligible lap case.";
    return;
  }

  const defaultResult = reoLapCalculation(assessmentResult.bar, { ...assessmentOptions, doubleArea: false, halfSpliced: false });
  const qualifiedResult = reoLapCalculation(assessmentResult.bar, { ...assessmentOptions, doubleArea: true, halfSpliced: true });
  if (!defaultResult.eligible || !qualifiedResult.eligible) {
    $("reoK7SummaryValue").innerHTML = "k<sub>7</sub> unavailable";
    $("reoK7ReductionNote").textContent = "Check the current inputs.";
    return;
  }

  const reduction = Math.max(0, defaultResult.adoptedLength - qualifiedResult.adoptedLength);
  const qualificationCount = Number(options.doubleArea) + Number(options.halfSpliced);

  if (qualificationCount === 2) {
    $("reoK7SummaryValue").innerHTML = `k<sub>7</sub> = 1.00 &middot; adopted reduction ${displayFixed(reduction, 0)} mm`;
  } else if (qualificationCount === 1) {
    $("reoK7SummaryValue").innerHTML = `k<sub>7</sub> = 1.25 &middot; one condition pending &middot; potential ${displayFixed(reduction, 0)} mm`;
  } else {
    $("reoK7SummaryValue").innerHTML = `k<sub>7</sub> = 1.25 &middot; potential reduction ${displayFixed(reduction, 0)} mm`;
  }

  $("reoK7ReductionNote").textContent = "Both conditions are required for k7 = 1.00.";
}
function updateReoSchedule(options, selectedDesignation) {
  const diameterSpecificBasis = options.method === "refined" || options.k7Basis === "qualified";
  if (diameterSpecificBasis) {
    $("reoLapTableRows").innerHTML = `<tr><td colspan="6">Schedule unavailable for Refined or reduced-k<sub>7</sub> cases. Use Basic with k<sub>7</sub> = 1.25.</td></tr>`;
    return;
  }
  $("reoLapTableRows").innerHTML = reoBars.filter(bar => bar.diameter <= 40).map(bar => {
    const result = reoLapCalculation(bar, options);
    if (!result.eligible) return `<tr class="${bar.designation === selectedDesignation ? "is-selected" : ""}"><td>${bar.designation}</td><td>${bar.area.toLocaleString("en-AU")} mm&sup2;</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td><td>Not eligible for current inputs</td></tr>`;
    return `<tr class="${bar.designation === selectedDesignation ? "is-selected" : ""}"><td>${bar.designation}</td><td>${bar.area.toLocaleString("en-AU")} mm&sup2;</td><td>${Math.ceil(result.developmentLength)} mm</td><td><b>${result.adoptedLength} mm</b></td><td>${displayFixed(result.ratio, 1)}d<sub>b</sub></td><td>${result.governing.label}</td></tr>`;
  }).join("");
}

function reoBasicFormulaSubstitution(result) {
  return `0.5 &times; ${displayFixed(result.k1, 2)} &times; ${displayFixed(result.k3, 4)} &times; ${displayFixed(result.fsy, 0)} &times; ${displayFixed(result.bar.diameter, 0)} / (${displayFixed(result.k2, 3)} &times; &radic;${displayFixed(result.fcUsed, 1)}) = ${displayFixed(result.basicFormula, 2)} mm`;
}

function reoRefinedFormulaHtml(result, options, label) {
  if (options.method !== "refined") {
    return calculationTraceRow({
      title: `${label} development-length basis`,
      result: "Basic method",
      applicability: "No transverse-reinforcement or pressure reduction is credited."
    });
  }
  const location = !result.transverseArrangementConfirmed
    ? "no verified confinement credit selected; K = 0"
    : result.lambda <= 0
      ? "Sigma Atr does not exceed Sigma Atr,min; lambda = 0"
      : result.transverseEffective
        ? "effective transverse-reinforcement location confirmed"
        : "location not confirmed; K = 0";
  const countStatus = result.confinementCreditRequested
    ? (result.atrCountConfirmed ? "candidate-length count confirmed" : `candidate k<sub>4</sub> = ${displayFixed(result.k4Candidate, 3)} not adopted until the candidate-length count is confirmed`)
    : "no k4 confinement credit requested";
  const pressureStatus = result.pressureCreditRequested
    ? (result.pressureCreditApplied ? `pressure reference ${safeText(result.pressureReference)} and applicability confirmed` : `candidate k<sub>5</sub> = ${displayFixed(result.k5Candidate, 3)} not adopted until a calculation/source reference and applicability confirmation are provided`)
    : "no k5 pressure credit requested";
  return [
    calculationTraceRow({
      title: `${label} refined factors`,
      reference: "AS 3600 Cl. 13.1.2.3",
      formula: `K = min[0.05(1 + n<sub>f</sub>/n<sub>bs</sub>), 0.10]; &lambda; = max[(&Sigma;A<sub>tr</sub> - &Sigma;A<sub>tr,min</sub>)/A<sub>s</sub>, 0]; k<sub>4</sub> = clamp(1 - K&lambda;, 0.7, 1.0); k<sub>5</sub> = clamp(1 - 0.04p, 0.7, 1.0)`,
      substitution: `K = ${displayFixed(result.K, 3)}; &Sigma;A<sub>tr,min</sub> = ${displayFixed(result.atrMin, 1)} mm<sup>2</sup>; &lambda; = ${displayFixed(result.lambda, 3)}; candidate k<sub>4</sub>/k<sub>5</sub> = ${displayFixed(result.candidateK4, 3)}/${displayFixed(result.candidateK5, 3)}`,
      result: `Adopted k<sub>4</sub>/k<sub>5</sub> = ${displayFixed(result.k4, 3)}/${displayFixed(result.k5, 3)}`,
      applicability: `${location}; ${countStatus}; ${pressureStatus}.`
    }),
    calculationTraceRow({
      title: `${label} refined-factor reconciliation`,
      reference: "AS 3600 Cl. 13.1.2.3",
      formula: `k<sub>ref</sub> = max(k<sub>4</sub>k<sub>5</sub>, 0.7/k<sub>3</sub>); L = L<sub>basic,modified</sub>k<sub>ref</sub>`,
      substitution: `Candidate factor = ${displayFixed(result.candidateRefinedFactor, 3)}; adopted factor = ${displayFixed(result.refinedFactor, 3)}`,
      result: `Candidate development = ${displayFixed(result.candidateDevelopmentLength, 1)} mm; adopted development = ${displayFixed(result.developmentLength, 1)} mm`,
      applicability: "k<sub>3</sub> multiplied by each adopted refined factor remains at least 0.700."
    })
  ].join("");
}

function reoLapFormulaHtml(result, options, referenceOnly) {
  if (!result?.eligible) {
    const issues = result?.issues?.length ? result.issues.map(safeText).join(" ") : "No lap calculation applies to this path.";
    return calculationTraceRow({
      title: "Lap eligibility",
      result: "Not evaluated",
      applicability: issues,
      state: "warning"
    });
  }
  const narrow = options.memberType === "narrow"
    ? calculationTraceRow({
        title: "Narrow-member lap candidate",
        reference: "AS 3600 Cl. 13.2.2",
        formula: `L<sub>lap,narrow</sub> = L<sub>sy.t</sub> + 1.5s<sub>b</sub>`,
        substitution: `${displayFixed(result.developmentLength, 1)} + 1.5 &times; ${displayFixed(result.gapUsed, 1)} mm`,
        result: `Candidate = ${displayFixed(result.narrowCandidate, 1)} mm`,
        applicability: result.gapEntered <= 3 * result.bar.diameter ? "Entered s<sub>b</sub> &le; 3d<sub>b</sub>; s<sub>b</sub> = 0 for this candidate." : "Entered non-contact bar gap used."
      })
    : "";
  const referenceWarning = referenceOnly
    ? calculationTraceRow({
        title: "PIR applicability boundary",
        result: "AS 3600 straight-lap length reference only",
        applicability: "Post-installed reinforcement design and transfer to the existing bar require the project PIR design."
      })
    : "";
  return [
    referenceWarning,
    calculationTraceRow({
      title: "Project-document condition",
      reference: "AS 3600 Cl. 13.2.1(a)",
      result: "Project confirmation required",
      applicability: "Use this reference only where the project drawings or specification require or permit the splice."
    }),
    calculationTraceRow({
      title: "New-work lap geometry",
      formula: `c<sub>d</sub> = min(a/2, c)`,
      substitution: `min(${displayFixed(options.clearSpacing, 1)}/2, ${displayFixed(options.cover, 1)}) mm`,
      result: `c<sub>d</sub> = ${displayFixed(result.cd, 1)} mm`,
      applicability: `d<sub>b</sub> = ${result.bar.diameter} mm; A<sub>s</sub> = ${displayFixed(result.bar.area, 1)} mm<sup>2</sup>; f'<sub>c</sub> used = ${displayFixed(result.fcUsed, 1)} MPa.`
    }),
    calculationTraceRow({
      title: "Lap development expression",
      reference: "AS 3600 Cl. 13.1.2.2 and AS 3600 Cl. 13.2.2",
      formula: `L<sub>sy.tb</sub> = 0.5k<sub>1</sub>k<sub>3</sub>f<sub>sy</sub>d<sub>b</sub>/(k<sub>2</sub>&radic;f'<sub>c</sub>); L<sub>sy.t</sub> = L<sub>sy.tb</sub>k<sub>material</sub>k<sub>ref</sub>`,
      substitution: `${reoBasicFormulaSubstitution(result)}; k<sub>material</sub> = ${displayFixed(result.conditionFactor, 2)}; k<sub>ref</sub> = ${displayFixed(result.refinedFactor, 3)}`,
      result: `L<sub>sy.t</sub> = ${displayFixed(result.developmentLength, 1)} mm`,
      applicability: "The AS 3600 Cl. 13.1.2.2 basic lower limit is not imposed before the AS 3600 Cl. 13.2.2 lap equation."
    }),
    reoRefinedFormulaHtml(result, options, "Lap"),
    calculationTraceRow({
      title: "Lap candidates",
      reference: "AS 3600 Cl. 13.2.2",
      formula: `L<sub>lap</sub> = max(k<sub>7</sub>L<sub>sy.t</sub>, L<sub>lap,min</sub>${options.memberType === "narrow" ? ", L<sub>sy.t</sub> + 1.5s<sub>b</sub>" : ""})`,
      substitution: `k<sub>7</sub>L<sub>sy.t</sub> = ${displayFixed(result.k7, 2)} &times; ${displayFixed(result.developmentLength, 2)} = ${displayFixed(result.k7Candidate, 2)} mm; L<sub>lap,min</sub> = 0.058 &times; ${displayFixed(result.fsy, 0)} &times; ${displayFixed(result.k1, 2)} &times; ${displayFixed(result.bar.diameter, 0)} = ${displayFixed(result.lapLowerLimit, 1)} mm`,
      result: `${safeText(result.governing.label)} governs at ${displayFixed(result.rawLength, 2)} mm`,
      applicability: "Candidate comparison uses unrounded values."
    }),
    narrow,
    calculationTraceRow({
      title: "Adopted lap reference",
      formula: `L<sub>lap,adopted</sub> = ceil(L<sub>lap</sub>/10)&times;10`,
      substitution: `ceil(${displayFixed(result.rawLength, 2)}/10)&times;10`,
      result: `${result.adoptedLength} mm = ${displayFixed(result.ratio, 1)}d<sub>b</sub>`,
      applicability: "Rounded upward to the next 10 mm."
    })
  ].join("");
}

function reoDevelopmentFormulaHtml(result, options, anchorage) {
  if (!result?.eligible) {
    const issues = result?.issues?.length ? result.issues.map(safeText).join(" ") : "No development reference applies to this path.";
    return calculationTraceRow({
      title: "Existing-concrete development eligibility",
      result: "Not evaluated",
      applicability: issues,
      state: "warning"
    });
  }
  const cdExpression = result.hookedOrCogged
    ? result.memberType === "narrow"
      ? `min(${displayFixed(options.clearSpacing, 1)}/2, ${displayFixed(options.c1, 1)})`
      : `${displayFixed(options.clearSpacing, 1)}/2`
    : result.memberType === "narrow"
      ? `min(${displayFixed(options.clearSpacing, 1)}/2, ${displayFixed(options.c1, 1)}, ${displayFixed(options.cover, 1)})`
      : `min(${displayFixed(options.clearSpacing, 1)}/2, ${displayFixed(options.cover, 1)})`;
  let stressStep = calculationTraceRow({
    title: "Selected development reference",
    result: `Full-yield adopted development reference = ${result.adoptedLength} mm`,
    applicability: "No reduced project-steel-stress benchmark is requested."
  });
  if (anchorage?.actualStressRequested) {
    stressStep = anchorage.stressOverYield
      ? calculationTraceRow({
          title: "Project steel stress",
          reference: "AS 3600 Cl. 13.1.2.4",
          result: "Reduced benchmark not evaluated",
          applicability: `&sigma;<sub>st</sub> = ${displayFixed(anchorage.actualStress, 1)} MPa exceeds f<sub>sy</sub> = ${displayFixed(anchorage.fsy, 0)} MPa; review the bar design.`,
          state: "warning"
        })
      : anchorage.refinedReducedLengthConfirmationMissing
        ? calculationTraceRow({
            title: "Combined reduction candidate",
            formula: `L<sub>st</sub> = max(L<sub>development</sub>&sigma;<sub>st</sub>/f<sub>sy</sub>, 12d<sub>b</sub>)`,
            substitution: `${displayFixed(anchorage.reducedDevelopmentCandidateRaw, 1)} mm raw`,
            result: `${displayFixed(anchorage.reducedDevelopmentCandidateAdopted, 0)} mm if confirmed`,
            applicability: "Verify Refined confinement and pressure evidence throughout this candidate length before adoption.",
            state: "warning"
          })
      : anchorage.actualStressApplied
        ? calculationTraceRow({
            title: "Project steel stress",
            reference: "AS 3600 Cl. 13.1.2.4",
            formula: `L<sub>st</sub> = max(L<sub>development</sub>&sigma;<sub>st</sub>/f<sub>sy</sub>, 12d<sub>b</sub>)`,
            substitution: `max(${displayFixed(result.rawLength, 2)} &times; ${displayFixed(anchorage.actualStress, 1)}/${displayFixed(anchorage.fsy, 0)}, 12 &times; ${result.bar.diameter}) mm`,
            result: `Reduced development benchmark = ${displayFixed(anchorage.reducedDevelopmentRaw, 1)} mm`,
            applicability: "Verify &sigma;<sub>st</sub> against the project calculation before issue."
          })
        : calculationTraceRow({
            title: "Project steel stress",
            result: "Input required",
            applicability: "Enter a positive &sigma;<sub>st</sub> not exceeding f<sub>sy</sub>; the full-yield reference remains displayed.",
            state: "warning"
          });
  }
  const terminationStep = anchorage?.terminationDetailingConfirmationMissing
    ? calculationTraceRow({
        title: `Cast-in ${safeText(anchorage.terminationType)} detailing`,
        reference: "AS 3600 Cl. 13.1.2.6 and AS 3600 Cl. 13.1.2.7",
        result: "Half-development reference withheld",
        applicability: `Minimum bend diameter = ${displayFixed(anchorage.minimumBendDiameter, 0)} mm (${anchorage.minimumBendDiameterFactor}d<sub>b</sub>); ${anchorage.terminationType === "hook" ? `straight extension = ${displayFixed(anchorage.hookStraightExtension, 0)} mm minimum` : `90-degree cog, bend diameter not exceeding ${displayFixed(anchorage.maximumCogBendDiameter, 0)} mm and total bar length equal to the corresponding 180-degree hook`}.${anchorage.transverseRestraintRequired ? ` Transverse bar diameter at least ${displayFixed(anchorage.transverseBarMinimumDiameter, 0)} mm, in contact and extending ${displayFixed(anchorage.transverseBarExtensionEachSide, 0)} mm each side.` : ""} Confirm detailing before adoption; no lap-splice reduction applies.`,
        state: "warning"
      })
    : anchorage?.terminationFactor === 0.5
      ? calculationTraceRow({
          title: `Cast-in ${safeText(anchorage.terminationType)} termination`,
          reference: "AS 3600 Cl. 13.1.2.6 and AS 3600 Cl. 13.1.2.7",
          formula: `L<sub>termination</sub> = 0.5L<sub>straight</sub>`,
          substitution: `0.5 &times; ${anchorage.actualStressApplied ? displayFixed(anchorage.reducedDevelopmentRaw, 2) : displayFixed(result.rawLength, 2)} mm`,
          result: `Raw = ${displayFixed(anchorage.asBenchmarkRaw, 2)} mm; adopted = ${anchorage.asBenchmarkAdopted} mm`,
          applicability: "Confirmed standard detailing; measured from the outside of the hook/cog. No lap-splice reduction applies."
        })
      : "";
  return [
    calculationTraceRow({
      title: "Existing-concrete development geometry",
      formula: `c<sub>d</sub> = ${cdExpression}`,
      substitution: `${cdExpression} = ${displayFixed(result.cd, 1)} mm`,
      result: `c<sub>d</sub> = ${displayFixed(result.cd, 1)} mm`,
      applicability: `f'<sub>c</sub> used = ${displayFixed(result.fcUsed, 1)} MPa; selected ${result.terminationType} termination.`
    }),
    calculationTraceRow({
      title: "Basic development length",
      reference: "AS 3600 Cl. 13.1.2.2",
      formula: `L<sub>sy.tb</sub> = 0.5k<sub>1</sub>k<sub>3</sub>f<sub>sy</sub>d<sub>b</sub>/(k<sub>2</sub>&radic;f'<sub>c</sub>); L<sub>min</sub> = 0.058f<sub>sy</sub>k<sub>1</sub>d<sub>b</sub>`,
      substitution: `${reoBasicFormulaSubstitution(result)}; L<sub>min</sub> = 0.058 &times; ${displayFixed(result.fsy, 0)} &times; ${displayFixed(result.k1, 2)} &times; ${displayFixed(result.bar.diameter, 0)} = ${displayFixed(result.basicLowerLimit, 1)} mm; k<sub>material</sub> = ${displayFixed(result.conditionFactor, 2)}`,
      result: `Modified basic development = ${displayFixed(result.basicModified, 1)} mm`,
      applicability: `Adopted before material multiplier = ${displayFixed(result.basicBeforeMaterial, 1)} mm; the lower limit is applied before the material and refined factors.`
    }),
    reoRefinedFormulaHtml(result, options, "Existing-concrete"),
    calculationTraceRow({
      title: "Full-yield development reference",
      formula: `L<sub>adopted</sub> = ceil(L<sub>raw</sub>/10)&times;10`,
      substitution: `ceil(${displayFixed(result.rawLength, 2)}/10)&times;10`,
      result: `Raw = ${displayFixed(result.rawLength, 2)} mm; adopted = ${result.adoptedLength} mm`,
      applicability: "Full-yield straight development reference before any qualified hook/cog or project-stress adjustment."
    }),
    stressStep,
    terminationStep
  ].join("");
}

function updateReoFormulaSteps(lapResult, lapOptions, developmentResult, developmentOptions, anchorage, path) {
  const steps = [];
  if (path.requiresLap) steps.push(reoLapFormulaHtml(lapResult, lapOptions, false));
  if (path.requiresDevelopment) {
    steps.push(reoDevelopmentFormulaHtml(developmentResult, developmentOptions, anchorage));
  }
  $("reoFormulaSteps").innerHTML = steps.join("");
}

function clearReoAnchorageOutputs(message = "A valid existing-concrete development reference is required.") {
  ["reoAsFullDevelopment", "reoAnchoragePrimaryResult"].forEach(id => {
    const element = $(id);
    if (element) element.textContent = "-";
  });
  $("reoAnchorageResultStatus").textContent = "INPUT REQUIRED";
  $("reoSaving").textContent = "AS 3600 reference unavailable.";
  $("reoAnchorageResultNote").textContent = message;
}

function updateReoDevelopmentDerived(result, options, basicReference) {
  if (!result?.eligible) {
    if (options.method === "refined" && basicReference?.eligible) {
    $("reoExistingCd").textContent = displayFixed(basicReference.cd, 1);
      $("reoExistingKValue").textContent = "-";
      $("reoExistingCombinedFactor").textContent = "-";
      $("reoExistingRefinedCandidateLength").textContent = "-";
      $("reoExistingRefinedNote").textContent = `Refined result unavailable. Basic reference retained. ${result?.issues?.join(" ") || "Complete the highlighted Refined input."}`;
      return;
    }
    $("reoExistingCd").textContent = "-";
    $("reoExistingKValue").textContent = "-";
    $("reoExistingCombinedFactor").textContent = "-";
    $("reoExistingRefinedCandidateLength").textContent = "-";
    $("reoExistingRefinedNote").textContent = result?.issues?.join(" ") || "Development reference unavailable.";
    return;
  }
  $("reoExistingCd").textContent = displayFixed(result.cd, 1);
  $("reoExistingKValue").textContent = displayFixed(result.K, 3);
  $("reoExistingCombinedFactor").textContent = `${displayFixed(result.lambda, 3)} / ${displayFixed(result.k4, 3)} / ${displayFixed(result.k5, 3)}`;
  $("reoExistingRefinedCandidateLength").textContent = options.method === "refined"
    ? displayFixed(result.refinedCandidateAdoptedLength, 0)
    : "-";
  $("reoExistingRefinedNote").textContent = options.method === "refined"
    ? result.refinedReconciliationRequired
      ? `Candidate ${displayFixed(result.refinedCandidateAdoptedLength, 0)} mm is not adopted. Confirm the qualifying reinforcement count and any pressure basis throughout that candidate length.`
      : result.refinedCreditRequested
        ? `Candidate evidence confirmed; ${displayFixed(result.adoptedLength, 0)} mm is adopted.`
        : "No Refined reduction applies for the entered arrangement."
    : "Basic development; no confinement reduction.";
}

function updateReoAnchorage(options, selectedBar, developmentResult, developmentOptions, basicReference) {
  const path = reoPathState(options);
  if (!path.requiresDevelopment) {
    clearReoAnchorageOutputs("No development reference applies to the selected path.");
    return null;
  }

  const refinedFallback = !developmentResult?.eligible && developmentOptions.method === "refined" && basicReference?.eligible;
  const adoptedDevelopmentResult = refinedFallback ? basicReference : developmentResult;
  updateReoDevelopmentDerived(developmentResult, developmentOptions, basicReference);
  const pirOrigin = developmentOptions.barOrigin === "pir";
  const anchorage = reoAnchorageCalculation(selectedBar, adoptedDevelopmentResult, {
    barOrigin: developmentOptions.barOrigin,
    basis: $("reoAnchorageBasis").value,
    actualStress: numericValue($("reoSteelStress").value),
    refinedReducedLengthConfirmed: $("reoReducedLengthRefinedConfirmed").checked,
    terminationType: $("reoCastInTermination").value,
    terminationDetailingConfirmed: $("reoCastInTerminationConfirmed").checked
  });

  if (!anchorage.available) {
    const unavailableIssues = [...(developmentResult?.issues || []), ...(anchorage.issues || [])];
    clearReoAnchorageOutputs([...new Set(unavailableIssues)].join(" "));
    return anchorage;
  }

  const formatLength = value => Number.isFinite(value) ? displayFixed(value, 0) : "-";
  $("reoAsFullDevelopment").textContent = formatLength(anchorage.fullDevelopmentAdopted);
  $("reoAnchoragePrimaryResult").textContent = anchorage.benchmarkAvailable ? formatLength(anchorage.asBenchmarkAdopted) : "-";

  const fullReferenceUseful = anchorage.actualStressRequested || anchorage.terminationFactor === 0.5;
  $("reoAnchorageFullReferenceCard").hidden = !fullReferenceUseful;
  $("reoAnchorageReferenceStrip").hidden = !fullReferenceUseful;
  $("reoFullReferenceContext").textContent = anchorage.terminationFactor === 0.5
    ? "Underlying full-yield development"
    : "Full-yield comparison";

  if (refinedFallback) {
    $("reoAnchorageResultStatus").textContent = "BASIC REFERENCE · REFINED INPUT REQUIRED";
    $("reoRequiredEmbedmentLabel").innerHTML = pirOrigin
      ? "Basic AS 3600 reference depth <b>L<sub>e,AS</sub></b>"
      : "Basic development reference <b>L<sub>sy.t</sub></b>";
  } else if (pirOrigin) {
    $("reoAnchorageResultStatus").textContent = !anchorage.benchmarkAvailable
      ? "INPUT REQUIRED"
      : anchorage.actualStressApplied
        ? "STRESS-BASED REFERENCE"
        : "FULL-YIELD REFERENCE";
    $("reoRequiredEmbedmentLabel").innerHTML = "AS 3600 reference depth <b>L<sub>e,AS</sub></b>";
  } else if (anchorage.terminationDetailingConfirmationMissing) {
    $("reoAnchorageResultStatus").textContent = `${anchorage.terminationType.toUpperCase()} DETAILING REQUIRED`;
    $("reoRequiredEmbedmentLabel").innerHTML = "Anchorage reference <b>L<sub>e,AS</sub></b>";
  } else if (anchorage.refinedReducedLengthConfirmationMissing) {
    $("reoAnchorageResultStatus").textContent = "REFINED RECONCILIATION REQUIRED";
    $("reoRequiredEmbedmentLabel").innerHTML = "Development reference <b>L<sub>st</sub></b>";
  } else if (!anchorage.benchmarkAvailable || anchorage.stressOverYield) {
    $("reoAnchorageResultStatus").textContent = "REVIEW REQUIRED";
    $("reoRequiredEmbedmentLabel").innerHTML = "Development reference <b>L<sub>sy.t</sub></b>";
  } else {
    $("reoAnchorageResultStatus").textContent = "AS 3600 REFERENCE";
    $("reoRequiredEmbedmentLabel").innerHTML = anchorage.terminationFactor === 0.5
      ? `Standard ${anchorage.terminationType} anchorage <b>L<sub>e,AS</sub></b>`
      : "Development reference length <b>L<sub>sy.t</sub></b>";
  }

  const basisNotes = [];
  if (anchorage.stressOverYield) {
    basisNotes.push(`Entered sigma_st = ${displayFixed(anchorage.actualStress, 0)} MPa exceeds fsy; review the bar design.`);
  } else if (anchorage.refinedReducedLengthConfirmationMissing) {
    basisNotes.push(`Candidate stress-based length ${formatLength(anchorage.reducedDevelopmentCandidateAdopted)} mm. Confirm the Refined evidence throughout that candidate before adoption.`);
  } else if (anchorage.actualStressApplied) {
    basisNotes.push(`Project sigma_st = ${displayFixed(anchorage.actualStress, 0)} MPa; the 12db minimum is retained.`);
  } else if (anchorage.actualStressRequested) {
    basisNotes.push("Enter a positive project design tensile stress not exceeding fsy.");
  }
  if (anchorage.terminationDetailingConfirmationMissing) {
    basisNotes.push(`Confirm the displayed standard ${anchorage.terminationType} requirements before the half-development reference is issued.`);
  } else if (anchorage.terminationFactor === 0.5) {
    basisNotes.push(`Standard ${anchorage.terminationType} anchorage confirmed; no lap-splice reduction applies.`);
  }
  $("reoSaving").textContent = pirOrigin
    ? (anchorage.actualStressApplied ? "Stress-based AS 3600 reference depth." : "Full-yield AS 3600 reference depth.")
    : anchorage.terminationFactor === 0.5
      ? `AS 3600 standard ${anchorage.terminationType} end anchorage.`
      : anchorage.actualStressApplied
        ? "Project-stress AS 3600 development reference."
        : "AS 3600 straight development reference.";
  if (refinedFallback) basisNotes.unshift(`Refined result unavailable; Basic reference retained. ${developmentResult?.issues?.join(" ") || "Complete the highlighted Refined input."}`);
  const notes = [...basisNotes, ...(adoptedDevelopmentResult?.notices || []), ...(anchorage.issues || [])];
  notes.push(pirOrigin
    ? "Not an installation depth · complete the product-specific design separately."
    : "Verify reinforcement continuity, cover, spacing, member detailing and load path.");
  $("reoAnchorageResultNote").textContent = [...new Set(notes)].join(" ");
  const warning = refinedFallback || !anchorage.benchmarkAvailable || anchorage.stressOverYield || anchorage.refinedReducedLengthConfirmationMissing || anchorage.terminationDetailingConfirmationMissing;
  $("reoAnchorageResultNote").className = warning ? "result-note is-warning" : "result-note";
  return anchorage;
}

function clearReoLapOutputs(message = "No lap result applies to the selected path.") {
  $("reoCd").textContent = "-";
  ["reoK1", "reoK2", "reoK3", "reoK7"].forEach(id => $(id).textContent = "-");
  $("reoKValue").textContent = "-";
  $("reoCombinedFactor").textContent = "-";
  $("reoRefinedCandidateLength").textContent = "-";
  $("reoPrimaryResultLabel").textContent = "Adopted lap length";
  $("reoRequiredLength").textContent = "-";
  $("reoLapRatio").textContent = "-";
  $("reoGoverning").textContent = "Governing expression unavailable.";
  $("reoDevelopmentLength").textContent = "Lsy.t = -";
  $("reoResultStatus").textContent = "NOT AVAILABLE";
  $("reoResultNote").textContent = message;
  $("reoResultNote").className = "result-note is-ineligible";
  $("reoRefinedNote").textContent = "Refined lap factors are unavailable.";
}

function updateReoLapFieldValidity(options, path, developmentOptions) {
  const setFieldValidity = (inputId, errorId, invalid) => {
    const input = $(inputId);
    const error = errorId ? $(errorId) : null;
    if (invalid) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    if (error) error.hidden = !invalid;
  };
  const lapActive = path.requiresLap;
  setFieldValidity("reoConcreteStrength", "reoConcreteStrengthError", lapActive && (!Number.isFinite(options.fc) || options.fc < 20));
  setFieldValidity("reoCover", "reoCoverError", lapActive && (!Number.isFinite(options.cover) || options.cover <= 0));
  setFieldValidity("reoClearSpacing", "reoClearSpacingError", lapActive && (!Number.isFinite(options.clearSpacing) || options.clearSpacing <= 0));
  setFieldValidity("reoBarGap", "reoBarGapError", lapActive && options.memberType === "narrow" && options.lapType === "noncontact" && (!Number.isFinite(options.barGap) || options.barGap < 0));

  const customRefined = lapActive && options.method === "refined" && options.refinedArrangement === "custom";
  const selectedBar = reoBarByDesignation($("reoBar").value);
  const lapAtrMin = options.atrMinBasis === "beam-column" ? 0.25 * (selectedBar?.area || 0) : 0;
  const lapConfinementPotential = customRefined && Number.isFinite(options.atrTotal) && options.atrTotal > lapAtrMin;
  setFieldValidity("reoNf", "reoNfError", customRefined && (!Number.isInteger(options.nf) || options.nf < 0));
  setFieldValidity("reoNbs", "reoNbsError", customRefined && (!Number.isInteger(options.nbs) || options.nbs < 1));
  setFieldValidity("reoAtrTotal", "reoAtrTotalError", customRefined && (!Number.isFinite(options.atrTotal) || options.atrTotal < 0));
  setFieldValidity("reoTransverseLocationConfirmed", "reoTransverseLocationError", lapConfinementPotential && !options.transverseEffective);
  setFieldValidity("reoAtrCountConfirmed", "reoAtrCountConfirmedError", lapConfinementPotential && options.transverseEffective && !options.atrCountConfirmed);

  const pressureInvalid = path.requiresLap && options.method === "refined" && (!Number.isFinite(options.pressure) || options.pressure < 0);
  const pressureConfirmationMissing = path.requiresLap && options.method === "refined" && Number.isFinite(options.pressure) && options.pressure > 0 && !options.pressureBasisConfirmed;
  const pressureReferenceMissing = path.requiresLap && options.method === "refined" && Number.isFinite(options.pressure) && options.pressure > 0 && !options.pressureReference.trim();
  if (pressureInvalid) $("reoPressure").setAttribute("aria-invalid", "true");
  else $("reoPressure").removeAttribute("aria-invalid");
  if (pressureConfirmationMissing) $("reoPressureBasisConfirmed").setAttribute("aria-invalid", "true");
  else $("reoPressureBasisConfirmed").removeAttribute("aria-invalid");
  if (pressureReferenceMissing) $("reoPressureReference").setAttribute("aria-invalid", "true");
  else $("reoPressureReference").removeAttribute("aria-invalid");
  $("reoPressureError").hidden = !pressureInvalid;

  const existingPressureActive = path.requiresDevelopment && developmentOptions?.method === "refined";
  const existingCustomRefined = existingPressureActive && developmentOptions.refinedArrangement === "custom";
  const existingAtrMin = developmentOptions?.atrMinBasis === "beam-column" ? 0.25 * (selectedBar?.area || 0) : 0;
  const existingConfinementPotential = existingCustomRefined && Number.isFinite(developmentOptions.atrTotal) && developmentOptions.atrTotal > existingAtrMin;
  setFieldValidity("reoExistingNf", "reoExistingNfError", existingCustomRefined && (!Number.isInteger(developmentOptions.nf) || developmentOptions.nf < 0));
  setFieldValidity("reoExistingNbs", "reoExistingNbsError", existingCustomRefined && (!Number.isInteger(developmentOptions.nbs) || developmentOptions.nbs < 1));
  setFieldValidity("reoExistingAtrTotal", "reoExistingAtrTotalError", existingCustomRefined && (!Number.isFinite(developmentOptions.atrTotal) || developmentOptions.atrTotal < 0));
  setFieldValidity("reoExistingTransverseLocationConfirmed", "reoExistingTransverseLocationError", existingConfinementPotential && !developmentOptions.transverseEffective);
  setFieldValidity("reoExistingAtrCountConfirmed", "reoExistingAtrCountConfirmedError", existingConfinementPotential && developmentOptions.transverseEffective && !developmentOptions.atrCountConfirmed);
  const existingPressureInvalid = existingPressureActive && (!Number.isFinite(developmentOptions.pressure) || developmentOptions.pressure < 0);
  const existingPressureConfirmationMissing = existingPressureActive && Number.isFinite(developmentOptions.pressure) && developmentOptions.pressure > 0 && !developmentOptions.pressureBasisConfirmed;
  const existingPressureReferenceMissing = existingPressureActive && Number.isFinite(developmentOptions.pressure) && developmentOptions.pressure > 0 && !developmentOptions.pressureReference.trim();
  if (existingPressureInvalid) $("reoExistingPressure").setAttribute("aria-invalid", "true");
  else $("reoExistingPressure").removeAttribute("aria-invalid");
  if (existingPressureConfirmationMissing) $("reoExistingPressureBasisConfirmed").setAttribute("aria-invalid", "true");
  else $("reoExistingPressureBasisConfirmed").removeAttribute("aria-invalid");
  if (existingPressureReferenceMissing) $("reoExistingPressureReference").setAttribute("aria-invalid", "true");
  else $("reoExistingPressureReference").removeAttribute("aria-invalid");
  $("reoExistingPressureError").hidden = !existingPressureInvalid;
}

function renderReoLapResult(options, result, path, basicReference) {
  if (!path.requiresLap) {
    clearReoLapOutputs("No bar-to-bar lap calculation applies to the selected path.");
    return;
  }
  if (!result?.eligible) {
    if (options.method === "refined" && basicReference?.eligible) {
      $("reoCd").textContent = displayFixed(basicReference.cd, 1);
      $("reoK1").textContent = displayFixed(basicReference.k1, 2);
      $("reoK2").textContent = displayFixed(basicReference.k2, 3);
      $("reoK3").textContent = displayFixed(basicReference.k3, 3);
      $("reoK7").textContent = displayFixed(basicReference.k7, 2);
      $("reoKValue").textContent = "-";
      $("reoCombinedFactor").textContent = "-";
      $("reoRefinedCandidateLength").textContent = "-";
      $("reoPrimaryResultLabel").textContent = "Basic-reference tensile lap";
      $("reoRequiredLength").textContent = displayFixed(basicReference.adoptedLength, 0);
      $("reoLapRatio").textContent = displayFixed(basicReference.ratio, 1);
      $("reoGoverning").textContent = `Basic reference: ${basicReference.governing.label}`;
      $("reoDevelopmentLength").textContent = `Basic Lsy.t = ${displayFixed(basicReference.developmentLength, 1)} mm`;
      $("reoResultStatus").textContent = "BASIC REFERENCE · REFINED INPUT REQUIRED";
      $("reoResultNote").textContent = `Refined result unavailable. Basic reference retained for context. ${result.issues.join(" ")}`;
      $("reoResultNote").className = "result-note is-warning";
      $("reoRefinedNote").textContent = "Complete the highlighted Refined input before any confinement or pressure credit is applied.";
      return;
    }
    clearReoLapOutputs(result?.issues?.join(" ") || "The selected lap case is not eligible.");
    const prohibited = result?.issues?.some(issue => /not permitted|must be welded or mechanical/i.test(issue));
    $("reoResultStatus").textContent = prohibited ? "LAP SPLICE NOT PERMITTED" : "INVALID INPUT";
    return;
  }
  $("reoCd").textContent = displayFixed(result.cd, 1);
  $("reoK1").textContent = displayFixed(result.k1, 2);
  $("reoK2").textContent = displayFixed(result.k2, 3);
  $("reoK3").textContent = displayFixed(result.k3, 3);
  $("reoK7").textContent = displayFixed(result.k7, 2);
  $("reoKValue").textContent = displayFixed(result.K, 3);
  $("reoCombinedFactor").textContent = `${displayFixed(result.lambda, 3)} / ${displayFixed(result.k4, 3)} / ${displayFixed(result.k5, 3)}`;
  $("reoRefinedCandidateLength").textContent = options.method === "refined"
    ? displayFixed(result.refinedCandidateAdoptedLength, 0)
    : "-";
  $("reoPrimaryResultLabel").textContent = "Adopted lap length";
  $("reoRequiredLength").textContent = displayFixed(result.adoptedLength, 0);
  $("reoLapRatio").textContent = displayFixed(result.ratio, 1);
  $("reoGoverning").textContent = result.governing.label;
  $("reoDevelopmentLength").textContent = `Lsy.t = ${displayFixed(result.developmentLength, 1)} mm`;
  const notices = result.notices.filter(note => ![
    "No verified custom transverse-reinforcement arrangement is being used.",
    "Sigma Atr is confirmed for the candidate lap length.",
    "The transverse-pressure basis is confirmed for the candidate lap length."
  ].includes(note));
  if (options.doubleArea !== options.halfSpliced) notices.push("One k7 condition remains outstanding; k7 = 1.25.");
  $("reoResultStatus").textContent = result.refinedReconciliationRequired
    ? "BASIC ADOPTED · REFINED CANDIDATE"
    : "AS 3600 REFERENCE";
  $("reoResultNote").textContent = [
    "Use only where the project drawings or specification permit the splice · AS 3600 Cl. 13.2.1(a). Same-size bars assumed.",
    ...notices
  ].join(" ");
  $("reoResultNote").className = notices.length ? "result-note is-warning" : "result-note";
  const refinedReduction = options.method === "refined" && basicReference?.eligible
    ? Math.max(0, basicReference.adoptedLength - result.adoptedLength)
    : 0;
  const refinedEvidencePending = result.refinedReconciliationRequired;
  $("reoRefinedNote").textContent = options.method === "refined"
    ? (refinedEvidencePending
      ? `Candidate ${displayFixed(result.refinedCandidateAdoptedLength, 0)} mm is not adopted. Confirm the qualifying reinforcement count and any pressure basis throughout that candidate length.`
      : refinedReduction > 0
        ? `Refined reduction applied: adopted lap is ${displayFixed(refinedReduction, 0)} mm below the Basic reference.`
        : "No Refined reduction applies.")
    : "Basic lap development; no confinement reduction.";
}

function calculateReo() {
  let options = readReoOptions();
  updateReoConditionalFields(options);
  options = readReoOptions();
  const path = reoPathState(options);
  const selectedBar = reoBarByDesignation($("reoBar").value);
  const developmentOptions = readReoDevelopmentOptions();
  const lapResult = path.requiresLap ? reoLapCalculation(selectedBar, options) : null;
  const basicLapReference = path.requiresLap && options.method === "refined"
    ? reoLapCalculation(selectedBar, { ...options, method: "basic" })
    : null;
  const developmentResult = path.requiresDevelopment ? reoDevelopmentCalculation(selectedBar, developmentOptions) : null;
  const basicDevelopmentReference = path.requiresDevelopment && developmentOptions.method === "refined"
    ? reoDevelopmentCalculation(selectedBar, { ...developmentOptions, method: "basic" })
    : null;
  const anchorage = updateReoAnchorage(options, selectedBar, developmentResult, developmentOptions, basicDevelopmentReference);
  const lapReferenceAvailable = lapResult?.eligible === true || basicLapReference?.eligible === true;
  $("reoLapFactorGroup").hidden = !path.requiresLap || !lapReferenceAvailable;
  $("reoRefinedDetails").hidden = !path.requiresLap || options.method !== "refined" || !lapReferenceAvailable;

  updateReoLapFieldValidity(options, path, developmentOptions);
  renderReoLapResult(options, lapResult, path, basicLapReference);
  updateReoReductionAssessment(options, lapResult, basicLapReference);
  if (path.requiresLap) {
    updateReoSchedule(options, selectedBar?.designation || $("reoBar").value);
  } else {
    $("reoLapTableRows").innerHTML = `<tr><td colspan="6">No bar-to-bar lap schedule applies to the selected path.</td></tr>`;
  }
  const lapFormulaFallback = !lapResult?.eligible && basicLapReference?.eligible;
  const developmentFormulaFallback = !developmentResult?.eligible && basicDevelopmentReference?.eligible;
  updateReoFormulaSteps(
    lapFormulaFallback ? basicLapReference : lapResult,
    lapFormulaFallback ? { ...options, method: "basic" } : options,
    developmentFormulaFallback ? basicDevelopmentReference : developmentResult,
    developmentFormulaFallback ? { ...developmentOptions, method: "basic" } : developmentOptions,
    anchorage,
    path
  );
}

function centreNavigationButton(button) {
  const strip = button?.parentElement;
  if (!strip || strip.scrollWidth <= strip.clientWidth) return;
  const left = button.offsetLeft - (strip.clientWidth - button.offsetWidth) / 2;
  strip.scrollTo({ left: Math.max(0, left), behavior: "auto" });
}

function centreActiveToolNavigation() {
  document.querySelectorAll(".tool-category.active, .tool-tab.active").forEach(centreNavigationButton);
}

function setMobileToolMenu(open) {
  const navigation = document.querySelector(".tool-navigation");
  const toggle = $("mobileToolsToggle");
  if (!navigation || !toggle) return;
  navigation.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  const icon = toggle.querySelector("[aria-hidden]");
  if (icon) icon.textContent = open ? "\u00d7" : "+";
  if (open) window.requestAnimationFrame(centreActiveToolNavigation);
}

function syncResponsiveDefaults(force = false) {
  const mobileView = window.matchMedia("(max-width: 500px)").matches;
  if (!force && mobileView === mobileLayoutActive) return;
  const memberActionGroup = $("memberActionGroup");
  if (memberActionGroup && mobileView) memberActionGroup.open = false;
  if (!mobileView) setMobileToolMenu(false);
  mobileLayoutActive = mobileView;
}

function setTool(tool, updateHash = true) {
  const resolvedTool = toolAliases[tool] || tool;
  const validTool = toolNames.includes(resolvedTool);
  const selectedTool = validTool ? resolvedTool : "bolt";
  const selectedCategory = Object.keys(toolCategories).find(category => toolCategories[category].includes(selectedTool)) || "steel-connections";
  const toolNavigation = document.querySelector(".tool-navigation");
  if (toolNavigation) toolNavigation.dataset.activeTool = selectedTool;
  let activeButton = null;
  let activeCategoryButton = null;
  document.querySelectorAll(".tool-category").forEach(button => {
    const active = button.dataset.category === selectedCategory;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    if (active) activeCategoryButton = button;
  });
  document.querySelectorAll(".tool-tab").forEach(button => {
    const active = button.dataset.tool === selectedTool;
    button.hidden = button.dataset.category !== selectedCategory;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    if (active) activeButton = button;
  });
  const activeToolTab = document.querySelector(`.tool-tab[data-tool="${selectedTool}"]`);
  const mobileView = window.matchMedia("(max-width: 500px)").matches;
  if (activeToolTab) {
    $("mobileToolCategory").textContent = activeCategoryButton?.textContent?.trim() || "";
    $("mobileToolName").textContent = activeToolTab.textContent.trim();
    if (mobileView) setMobileToolMenu(false);
  }
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
    [activeCategoryButton, activeButton].forEach(centreNavigationButton);
  });
  if (selectedTool === "concrete") calculateConcrete();
  if (selectedTool === "properties") calculateSectionProperties();
  if (selectedTool === "reo") calculateReo();
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
  $("memberRadiusSource").textContent = isCustom
    ? "User-entered section properties · verification required."
    : "Catalogue section and effective length.";
  document.querySelectorAll("[data-member-guide]").forEach(card => {
    card.hidden = card.dataset.memberGuide !== type;
  });
  $("memberSectionGroup").hidden = false;
  $("memberMaterialGroup").hidden = false;
  $("memberFactorGroup").hidden = !isCustom;
  $("memberActionGroup").hidden = false;
  $("memberCatalogueSectionFields").hidden = isCustom;
  $("memberCustomSectionFields").hidden = !isCustom;
  $("memberCatalogueFactorFields").hidden = true;
  $("memberCustomFactorFields").hidden = !isCustom;
  $("alphaBField").hidden = isCustom;
  $("memberSectionField").hidden = isCustom;
  $("memberGradeField").hidden = isCustom;
  $("memberLengthField").hidden = isCustom;
  $("memberRadiusField").hidden = isCustom;
  $("memberFactorHelp").innerHTML = type === "chs"
    ? "Catalogue k<sub>f</sub>, or k<sub>f</sub> = 1.000 for an ideal circular dimension override; &alpha;<sub>b</sub> from AS 4100 Table 6.3.3."
    : type === "ub" || type === "uc"
      ? "Catalogue k<sub>f</sub>; hot-rolled UB / UC &alpha;<sub>b</sub> from AS 4100 Table 6.3.3."
    : type === "rhs" || type === "shs"
      ? "Catalogue k<sub>f</sub>; cold-formed non-stress-relieved hollow-section &alpha;<sub>b</sub>."
    : type === "ea"
      ? "k<sub>f</sub> is catalogue-derived; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A/B) from the selected k<sub>f</sub>."
    : type === "pfc"
      ? "k<sub>f</sub> is catalogue-derived; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A/B) from the selected k<sub>f</sub>."
      : type === "custom"
        ? "Custom / Built-up: user-entered section properties; k<sub>f</sub> and &alpha;<sub>b</sub> require project verification."
        : "k<sub>f</sub> = 1.0 for solid round geometry; &alpha;<sub>b</sub> follows AS 4100 Table 6.3.3(A).";
  $("memberAlphaB").disabled = type !== "custom";
  if (type === "ub" || type === "uc") $("memberAlphaB").value = "0";
  if (type === "chs") $("memberAlphaB").value = "-0.5";
  if (type === "rhs" || type === "shs") $("memberAlphaB").value = "-0.5";
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
  initializeConcreteLayerState();
  populateReoData();
  $("integrityHoleDiameter").addEventListener("input", () => {
    integrityHoleDiameterTracksBolt = false;
  });
  $("holeFactor").addEventListener("change", () => {
    if (value("holeFactor") === 1) {
      integrityHoleDiameterTracksBolt = true;
      $("integrityHoleDiameter").value = displayFixed(boltData[$("boltSize").value].d + 2, 1);
    } else {
      integrityHoleDiameterTracksBolt = false;
      $("integrityHoleDiameter").value = "";
    }
    calculateBolt();
  });
  boltInputIds.forEach(id => {
    const element = $(id);
    element.addEventListener("input", calculateBolt);
    if (element.tagName === "SELECT") element.addEventListener("change", calculateBolt);
  });
  weldInputIds.forEach(id => $(id).addEventListener("input", calculateWeld));
  concreteInputIds.forEach(id => {
    const depthMatch = id.match(/^layer([1-4])Y$/);
    if (depthMatch) {
      $(id).addEventListener("input", () => setConcreteLayerDepthManual(Number(depthMatch[1])));
      return;
    }
    if (/^layer[1-4]Bar$/.test(id) || id === "concreteShearBar") return;
    $(id).addEventListener("input", calculateConcrete);
  });
  [1, 2, 3, 4].forEach(index => {
    $(`layer${index}AutoReset`).addEventListener("click", () => restoreConcreteLayerAutoDepth(index));
    $(`layer${index}Bar`).addEventListener("change", () => {
      updateConcreteLayerBarState(index, !$(`layer${index}Bar`).closest(".layer-row").classList.contains("is-unavailable"));
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
  $("boltModeBlindBolt").addEventListener("click", () => setBoltMode("blind"));
  ["uBoltRodSize", "uBoltMemberGeometry", "uBoltFinish"].forEach(id => $(id).addEventListener("change", () => {
    populateUBoltFilters();
    calculateUBolt();
  }));
  $("uBoltManufacturer").addEventListener("change", () => {
    populateUBoltProducts();
    calculateUBolt();
  });
  $("uBoltProduct").addEventListener("change", calculateUBolt);
  ["blindBoltSize", "blindBoltHead", "blindBoltFinish"].forEach(id => $(id).addEventListener("change", () => {
    populateBlindBoltFilters();
    calculateBlindBolt();
  }));
  $("blindBoltGrip").addEventListener("input", () => {
    populateBlindBoltFilters();
    calculateBlindBolt();
  });
  $("blindBoltManufacturer").addEventListener("change", () => {
    populateBlindBoltProducts();
    calculateBlindBolt();
  });
  $("blindBoltProduct").addEventListener("change", calculateBlindBolt);
  document.querySelectorAll(".tool-category").forEach(button => button.addEventListener("click", () => {
    const firstTool = toolCategories[button.dataset.category]?.[0];
    if (firstTool) {
      setTool(firstTool);
      if (window.matchMedia("(max-width: 500px)").matches) setMobileToolMenu(true);
    }
  }));
  document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => setTool(button.dataset.tool)));
  $("mobileToolsToggle").addEventListener("click", () => {
    const open = $("mobileToolsToggle").getAttribute("aria-expanded") !== "true";
    setMobileToolMenu(open);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMobileToolMenu(false);
  });
  window.addEventListener("hashchange", () => setTool(location.hash.slice(1), false));
  window.addEventListener("resize", () => {
    syncResponsiveDefaults();
    if (!$("concretePanel").hidden) calculateConcrete();
    if (!$("reoPanel").hidden) calculateReo();
    if (!$("screwPanel").hidden) calculateScrew();
  });
  document.querySelector(".concrete-layout-details").addEventListener("toggle", event => {
    if (event.target.open) calculateConcrete();
  });
  document.querySelectorAll(".beam-family").forEach(button => button.addEventListener("click", () => {
    setBeamFamily(button.dataset.beamFamily);
  }));
  $("beamFamily").addEventListener("change", () => setBeamFamily($("beamFamily").value));
  $("beamSection").addEventListener("change", populateBeamGrades);
  $("beamGrade").addEventListener("change", resetBeamMaterialStrengths);
  $("beamCustomMaterialForm").addEventListener("change", populateBeamGrades);
  $("beamDirection").addEventListener("change", calculateBeam);
  $("beamDimensionOverride").addEventListener("change", () => {
    populateBeamCustomMaterialForms(true);
    updateBeamDimensionUi();
    populateBeamGrades();
    populateBeamDirections();
    calculateBeam();
  });
  beamDimensionInputIds.forEach(id => $(id).addEventListener("input", calculateBeam));
  $("beamFyInput").addEventListener("input", calculateBeam);
  $("beamFywInput").addEventListener("input", calculateBeam);
  $("beamFuInput").addEventListener("input", calculateBeam);
  $("beamMaterialReset").addEventListener("click", resetBeamMaterialStrengths);
  $("beamMomentDemand").addEventListener("input", calculateBeam);
  $("beamShearDemand").addEventListener("input", calculateBeam);
  document.querySelectorAll(".section-properties-mode").forEach(button => button.addEventListener("click", () => setSectionPropertyMode(button.dataset.sectionPropertiesMode)));
  $("sectionCatalogueFamilyTabs").addEventListener("click", event => {
    const button = event.target.closest(".section-catalogue-family-tab");
    if (!button) return;
    if (button.hasAttribute("data-section-category-custom")) {
      setSectionPropertyMode("custom");
      return;
    }
    if (sectionPropertiesMode !== "catalogue") setSectionPropertyMode("catalogue");
    $("sectionCatalogueFamily").value = button.dataset.sectionCatalogueFamily;
    populateSectionCatalogueDesignations();
  });
  $("sectionCatalogueFamily").addEventListener("change", populateSectionCatalogueDesignations);
  $("sectionCatalogueDesignation").addEventListener("change", () => {
    syncSectionMaterialControls(true);
    calculateSectionProperties();
  });
  $("sectionShape").addEventListener("change", () => {
    syncSectionMaterialControls(true);
    calculateSectionProperties();
  });
  $("sectionMaterialForm").addEventListener("change", () => {
    syncSectionMaterialControls(true, true);
    calculateSectionProperties();
  });
  $("sectionMaterialGrade").addEventListener("change", calculateSectionProperties);
  $("sectionMaterialThicknessOverride").addEventListener("click", () => {
    sectionMaterialThicknessManual = !sectionMaterialThicknessManual;
    syncSectionMaterialControls(false, true);
    calculateSectionProperties();
  });
  ["sectionMaterialThickness", "sectionMaterialFyInput", "sectionMaterialFuInput"].forEach(id => $(id).addEventListener("input", calculateSectionProperties));
  sectionPropertyInputIds.forEach(id => $(id).addEventListener("input", () => {
    syncSectionMaterialControls(false, true);
    calculateSectionProperties();
  }));
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
  reoInputIds.forEach(id => {
    const element = $(id);
    const handleReoInput = () => {
      const resets = globalThis.reoState.confirmationResetsForInput(id);
      if (resets.lapCandidateCount) $("reoAtrCountConfirmed").checked = false;
      if (resets.developmentCandidateCount) $("reoExistingAtrCountConfirmed").checked = false;
      if (resets.reducedDevelopmentBasis) $("reoReducedLengthRefinedConfirmed").checked = false;
      if (resets.lapQualification) {
        $("reoDoubleArea").checked = false;
        $("reoHalfSpliced").checked = false;
      }
      if (resets.lapPressureBasis) $("reoPressureBasisConfirmed").checked = false;
      if (resets.developmentPressureBasis) $("reoExistingPressureBasisConfirmed").checked = false;
      if (resets.lapTransverseLocation) $("reoTransverseLocationConfirmed").checked = false;
      if (resets.developmentTransverseLocation) $("reoExistingTransverseLocationConfirmed").checked = false;
      if (resets.terminationDetailing) $("reoCastInTerminationConfirmed").checked = false;
      calculateReo();
    };
    element.addEventListener("input", handleReoInput);
    if (element.tagName === "SELECT") element.addEventListener("change", handleReoInput);
  });
  document.querySelectorAll(".member-type").forEach(button => button.addEventListener("click", () => setMemberType(button.dataset.memberType)));
  $("memberSection").addEventListener("change", populateMemberGrades);
  $("memberGrade").addEventListener("change", () => {
    setMemberStrengthDefaults();
    calculateMember();
  });
  $("memberMaterialReset").addEventListener("click", () => {
    setMemberStrengthDefaults();
    calculateMember();
  });
  $("memberFyInput").addEventListener("input", calculateMember);
  $("memberFuInput").addEventListener("input", calculateMember);
  $("memberRadiusInput").addEventListener("input", calculateMember);
  $("memberDimensionOverride").addEventListener("change", () => {
    memberNetAreaTracksGross = true;
    const selected = selectedMemberGrade();
    if (selected) {
      const properties = memberProperties(selected.section);
      $("memberNetArea").value = properties.area.toFixed(3);
    }
    calculateMember();
  });
  ["memberDimChsD", "memberDimChsT", "memberDimRodD"].forEach(id => $(id).addEventListener("input", calculateMember));
  ["memberCustomArea", "memberCustomRx", "memberCustomRy", "memberCustomKf", "memberCustomAlphaBx", "memberCustomAlphaBy", "memberCustomLex", "memberCustomLey"].forEach(id => {
    const field = $(id);
    field.addEventListener("input", calculateMember);
    if (field.tagName === "SELECT") field.addEventListener("change", calculateMember);
  });
  $("memberLength").addEventListener("input", calculateMember);
  $("memberAlphaB").addEventListener("change", calculateMember);
  $("memberCompressionDemand").addEventListener("input", calculateMember);
  $("memberTensionDemand").addEventListener("input", calculateMember);
  $("memberNetAreaMode").addEventListener("change", calculateMember);
  $("memberHoleCount").addEventListener("input", calculateMember);
  $("memberHoleDiameter").addEventListener("input", calculateMember);
  $("memberHoleThickness").addEventListener("input", calculateMember);
  $("memberNetArea").addEventListener("input", () => {
    memberNetAreaTracksGross = false;
    calculateMember();
  });
  $("memberKt").addEventListener("input", calculateMember);
  populateScrewSeries();
  populateSectionCatalogueFamilies();
  setBeamFamily(beamFamily);
  setMemberType(memberType);
  calculateBolt();
  calculateUBolt();
  populateBlindBoltFilters(true);
  calculateBlindBolt();
  calculateWeld();
  calculateConcrete();
  setSectionPropertyMode(sectionPropertiesMode);
  calculateReo();
  calculateScrew();
  setBoltMode(initialBoltMode());
  setTool(location.hash.slice(1) || "bolt", false);
  syncResponsiveDefaults(true);
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  initialise();
  window.addEventListener("pageshow", () => window.requestAnimationFrame(calculateBolt));
}
