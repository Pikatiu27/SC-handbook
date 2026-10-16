"use strict";
(function(root, factory) {
  if (!root.reoLapping && typeof module === "object") require("../reo-calculation.js");
  const api = factory(root.ConcreteSectionCalculation || (typeof module === "object" ? require("../concrete-section-calculation.js") : null),
    root.reoLapping);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ConcreteBeamCalculation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function(core, reo) {
  const bars = Object.freeze(reo.bars.filter(bar => bar.diameter <= 40));
  const defaults = Object.freeze({width:300,depth:600,cover:40,fc:32,direction:"top",topBar:"N16",topCount:2,bottomBar:"N24",bottomCount:3,
    fitments:"vertical",fitmentBar:"N10",legs:2,spacing:200,aggregate:20,applicable:true,moment:null,shear:null});
  const barByName = name => bars.find(bar => bar.designation === name);
  function calculate(input) {
    const errors = {}, notes = [], positive = value => typeof value === "number" && Number.isFinite(value) && value > 0;
    for (const key of ["width","depth"]) if (!positive(input[key]) || input[key] > 5000) errors[key] = "Enter a dimension greater than zero and no more than 5000 mm.";
    if (!positive(input.cover) || input.cover > 5000) errors.cover = "Enter positive cover in mm.";
    if (!positive(input.fc) || input.fc < 20 || input.fc > 65) errors.fc = "This first version requires f'c from 20 to 65 MPa.";
    if (!["top","bottom"].includes(input.direction)) errors.direction = "Select the compression face.";
    if (!["vertical","none"].includes(input.fitments)) errors.fitments = "Select vertical fitments or none.";
    if (!positive(input.aggregate) || input.aggregate > 100) errors.aggregate = "Enter maximum aggregate size greater than zero and no more than 100 mm.";
    for (const face of ["top","bottom"]) {
      if (!Number.isInteger(input[face+"Count"]) || input[face+"Count"] < 0 || input[face+"Count"] > 30) errors[face+"Count"] = "Enter a whole-number bar count from 0 to 30.";
      if (input[face+"Count"] > 0 && !barByName(input[face+"Bar"])) errors[face+"Bar"] = "Choose a supported Class N bar.";
    }
    if (input.topCount === 0 && input.bottomCount === 0) errors.bottomCount = "At least one longitudinal row is required.";
    const stirrup = input.fitments === "vertical" ? barByName(input.fitmentBar) : null;
    if (input.fitments === "vertical") {
      if (!stirrup) errors.fitmentBar = "Choose a supported Class N fitment bar.";
      if (!Number.isInteger(input.legs) || input.legs < 2 || input.legs > 10) errors.legs = "Enter 2 to 10 effective vertical legs.";
      if (!positive(input.spacing) || input.spacing > 5000) errors.spacing = "Enter positive centre spacing no more than 5000 mm.";
      else if (stirrup && input.spacing <= stirrup.diameter) errors.spacing = "Fitment spacing must exceed its bar diameter to avoid physical overlap.";
    }
    const actionErrors = {};
    for (const key of ["moment","shear"]) if (input[key] != null && (typeof input[key] !== "number" || !Number.isFinite(input[key]) || input[key] < 0)) actionErrors[key] = "Enter a non-negative ULS magnitude or leave blank.";
    if (Object.keys(errors).length) return {valid:false,errors,actionErrors,notes};
    const fitmentDiameter = stirrup?.diameter || 0, rows = [];
    for (const face of ["top","bottom"]) {
      const count = input[face+"Count"], bar = barByName(input[face+"Bar"]);
      if (!count) continue;
      const offset = input.cover + fitmentDiameter + bar.diameter/2;
      const yTop = face === "top" ? offset : input.depth-offset;
      const centreSpan = input.width-2*offset;
      const clearGap = count > 1 ? centreSpan/(count-1)-bar.diameter : null;
      if (centreSpan < 0 || (clearGap != null && clearGap <= 0)) errors[face+"Count"] = "Bars overlap or do not fit inside the entered width and cover.";
      if (offset + bar.diameter/2 >= input.depth) errors.depth = "A longitudinal row extends outside the section.";
      if (input.depth < 2*(input.cover+fitmentDiameter)+bar.diameter) errors.depth = "Depth cannot contain the row within the entered cover and fitments.";
      rows.push({face,count,bar,clearGap,yTop,index:face === "top" ? 1 : 2,area:count*bar.area,d:input.direction === "top" ? yTop : input.depth-yTop,fsy:500,es:200000,legacy:false});
    }
    if (rows.length === 2 && rows[0].yTop + rows[0].bar.diameter/2 >= rows[1].yTop-rows[1].bar.diameter/2) errors.depth = "Top and bottom reinforcement rows overlap.";
    if (Object.keys(errors).length) return {valid:false,errors,actionErrors,notes};
    const factors = core.stressBlockFactors(input.fc), section = core.solveSection({width:input.width,depth:input.depth,fc:input.fc,...factors,ecu:0.003,direction:input.direction,layers:rows});
    if (!section.ok || !Number.isFinite(section.phiMuo)) return {valid:false,errors:{section:"Section equilibrium could not be solved."},actionErrors,notes};
    const tensileRows = section.layers.filter(row=>row.strain < -0.00005 && row.d >= input.depth/2);
    const ast = tensileRows.reduce((sum,row)=>sum+row.area,0), d = ast ? tensileRows.reduce((sum,row)=>sum+row.area*row.d,0)/ast : 0;
    const fctf = 0.6*Math.sqrt(input.fc), astMin = d ? 0.20*(input.depth/d)**2*fctf/500*input.width*d : Infinity;
    const minimumFlexure = ast >= astMin;
    const flexureReasons = [];
    if (input.applicable !== true) flexureReasons.push("Confirm the stated section applicability before using capacities.");
    if (!tensileRows.length || section.kuo > 0.36) flexureReasons.push("k_uo > 0.36 or no tension row: conditional high-neutral-axis design is outside this first version.");
    if (!minimumFlexure) notes.push("Minimum flexural reinforcement screen not satisfied; review Cl. 8.1.6.1 before adopting this section.");
    const fitmentMaxSpacing = Math.min(0.5*input.depth,300);
    const transverseMax = Math.min(input.depth,600), legSpan = input.width - 2*(input.cover+fitmentDiameter/2);
    const transverseSpacing = stirrup ? legSpan/(input.legs-1) : null;
    const shear = core.oneWayShear({depth:input.depth,width:input.width,fc:input.fc,d0:section.d0,layers:section.layers,
      shearReinforcement:{mode:input.fitments,barArea:stirrup?.area || 0,legs:input.legs,spacing:input.spacing,yieldStress:500,designation:stirrup?.designation || "None"}});
    const shearReasons = [];
    if (input.applicable !== true) shearReasons.push("Confirm the stated section applicability before using capacities.");
    if (input.aggregate < 10) shearReasons.push("Simplified shear requires maximum aggregate size at least 10 mm.");
    if (!tensileRows.length) shearReasons.push("No longitudinal tension row in the flexural tension half of the section.");
    if (input.fitments === "vertical") {
      if (!shear.minShearReoProvided) shearReasons.push("Provided fitments are below the minimum transverse reinforcement ratio.");
      if (input.spacing > fitmentMaxSpacing) shearReasons.push("Fitment longitudinal spacing exceeds the conservative ordinary limit min(0.5D, 300 mm).");
      if (transverseSpacing <= fitmentDiameter || transverseSpacing > transverseMax) shearReasons.push("Assumed equally spaced fitment legs overlap or exceed the selected transverse-spacing limit.");
    } else if (input.depth >= 750) shearReasons.push("D >= 750 mm requires transverse reinforcement (Cl. 8.2.1.6).");
    const ks = input.depth <= 300 ? 1 : input.depth >= 650 ? 0.5 : (1000-input.depth)/700;
    const noFitmentThreshold = ks*0.70*shear.vuc;
    const flexureCapacity = flexureReasons.length ? null : section.phiMuo;
    const shearCapacity = shearReasons.length ? null : shear.phiVu;
    function compare(key, capacity) {
      if (actionErrors[key]) return {status:"Invalid action",ratio:null};
      if (input[key] == null) return {status:"No action entered",ratio:null};
      if (capacity == null) return {status:"Not evaluated",ratio:null};
      if (key === "moment" && !minimumFlexure) return {status:"Review minimum reinforcement",ratio:null};
      if (key === "shear" && input.fitments === "none" && input.shear > noFitmentThreshold) return {status:"Fitments required",ratio:null};
      return {status:input[key] <= capacity ? "Within section capacity" : "Exceeds section capacity",ratio:input[key]/capacity};
    }
    if (shear.webCrushingLimited) notes.push("Web crushing governs shear; phi = 0.70.");
    if (input.fitments === "none") notes.push("No-fitment shear capacity is conditional: separately check the transverse-reinforcement trigger shown below.");
    return {valid:true,errors,actionErrors,notes,rows,section,factors,ast,d,fctf,astMin,minimumFlexure,flexureCapacity,flexureReasons,
      shear,shearCapacity,shearReasons,fitmentMaxSpacing,transverseSpacing,transverseMax,ks,noFitmentThreshold,
      momentCheck:compare("moment",flexureCapacity),shearCheck:compare("shear",shearCapacity)};
  }
  return Object.freeze({bars,defaults,calculate});
});
