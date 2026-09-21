"use strict";

(function exposeGeoQuery(root, factory) {
  const api = factory(root.GeoParametersData || (typeof require === "function" ? require("./geo-parameters-data.js") : null));
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GeoParameters = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function buildGeoQuery(data) {
  const project = "Project report value required";
  // Look (2014), Table 7.8, PDF115/printed90: exact grading-specific rows only.
  const sandGradingPhi = {loose:{uniform:"27–30°",well:"30–32°"},dense:{uniform:"37–40°",well:"40–42°"}};
  const byId = (rows, id) => rows.find((row) => row.id === id) || null;
  const p = (group, label, value, role, basis) => ({ group, label, value, role, basis });
  const groundModelRows = () => [
    p("Ground model", "Stratum levels / thicknesses; origin; variability; adopted ground model", project, "project", "Record the interpreted profile, investigation coverage, lenses, fill and uncertainty for the design element."),
    p("Ground model", "Characteristic / moderately conservative / design parameter set", project, "project", "State the parameter-selection basis, design situation, drainage condition and applicable project standard; do not adopt a handbook midpoint."),
  ];
  const commonProjectRows = () => [
    ...groundModelRows(),
    p("Physical / state", "Bulk / natural unit weight, γ_bulk; w; G_s; e / n; LL / PL / PI", project, "project", "Laboratory or field values; do not infer natural density, moisture or index properties from the description."),
    p("Physical / state", "Volume change / reactivity, I_ss; shrink–swell; y_s where applicable", project, "project", "Confirm the applicable test method, suction/moisture regime, profile and project classification standard."),
    p("Physical / state", "Fill control; collapsibility; dispersivity; slaking / erosion susceptibility", project, "project", "Assess only where relevant to the material, earthworks, wetting regime and proposed construction."),
    p("Strength", "Measured field tests: SPT N / N_60 / (N_1)_60; CPT q_c / q_t / f_s / R_f / u_2; vane / PP; DCP", project, "project", "Retain raw results, equipment/procedure, energy and overburden corrections, depth and local correlation basis. Do not mix CPT sleeve friction f_s with pile shaft resistance."),
    p("Strength", "Sensitivity S_t; remoulded and residual shear strength", project, "project", "Required where sensitive, fissured, slickensided or strain-softening cohesive soils may govern."),
    p("Hydraulic / durability", "Groundwater level and design variation", project, "project", "Confirm observation dates, piezometric conditions and the adopted design level."),
      p("Hydraulic / durability", "Horizontal / vertical permeability, k_h / k_v (m/s)", project, "project", "Use project testing where layering or drainage direction matters; not subgrade reaction."),
    p("Hydraulic / durability", "pH; sulfate; chloride; electrical resistivity; acid sulfate / contamination where relevant", project, "project", "Exposure, aggressivity and environmental testing depend on material and project requirements."),
    p("Deformation / compressibility", "m_v; C_c; C_r; c_v; C_α; OCR; preconsolidation stress σ′_p", project, "project", "Use project consolidation testing and the applicable stress range."),
    p("Deformation / compressibility", "Dynamic stiffness and damping, V_s; G_0 / G_max; damping ratio", project, "project", "Include only where cyclic, vibration or earthquake response is relevant; strain level and confining stress govern."),
    p("Foundation / interface", "Earth pressure coefficients, K_a / K_0 / K_p", project, "project", "Wall movement, drainage, groundwater, geometry, OCR and interface conditions are required."),
    p("Foundation / interface", "Liquefaction / cyclic softening and seismic site inputs", project, "project", "Assess only where required using the project ground model, groundwater, seismic demand and applicable standard.")
  ];
  function permeabilityRow(input) {
    const row = data.permeability[input.uscs || "unknown"] || data.permeability.unknown;
    const missing = row.value.includes("required");
      if (!missing) return p("Hydraulic / durability", "Coefficient of permeability, k", row.value, "interpretive", `Look (2014) Table 8.5 first-check range for ${row.label}; source assumes well-compacted material and excludes structure/stratification.`);
    const envelope = input.family === "cohesive"
      ? "10⁻¹⁰–10⁻⁷ m/s"
      : input.material === "gravel" ? "10⁻⁸–10 m/s" : "10⁻⁸–10⁻² m/s";
      return p("Hydraulic / durability", "Coefficient of permeability, k", envelope, "interpretive", "Broad Look (2014) Table 8.5 material-family envelope; source assumes well-compacted material and excludes structure/stratification. Select a matching USCS group; use project testing for design.");
  }
  const q = (label, value, note, role = "interpretive", use = "First check") => ({ label, value, note, role, use });
  function soilQuickRanges(input, row) {
    const permeability = permeabilityRow(input);
    if (input.family === "cohesive") return [
      q("Bearing range", `q_a ${row.presumedBearing}`, "Preliminary estimate for natural material; settlement, groundwater and geometry limits apply.", "interpretive", "Preliminary · 25 mm"),
      q("Undrained strength", `s_u ${row.su}`, "AS 1726 consistency band; typically used for an undrained condition, not a prescribed duration.", "standard", "Classification range"),
      q("Effective strength", row.effectiveStrength || "Project c′ / φ′ required", row.effectiveStrength ? "Typical peak effective-stress range; project selection required." : "No exact consistency row", row.effectiveStrength ? "interpretive" : "project", "Drained · typical range"),
      q("Foundation modulus", `E_s ${row.eShort} / ${row.eLong}`, "Source short / long-term indication; stress, strain and drainage dependent.", "interpretive", "Immediate / long-term"),
      q("Unit weight", row.unitWeight ? `γ_d / γ_sat ${row.unitWeight}` : "Exact row not available", row.unitWeight ? "Below groundwater: γ′ = γ_sat − 9.81 kN/m³" : "Use project unit weight", row.unitWeight ? "interpretive" : "project", "Typical range"),
      q("Groundwater flow", `k ${permeability.value}`, input.uscs && input.uscs !== "unknown" ? "Selected USCS first check" : "Broad cohesive-family envelope", "interpretive", "Typical range")
    ];
    const modulus = input.material === "sand" ? row.sandE : row.gravelE;
    return [
      q("Bearing range", input.material === "sand" ? `q_a ${row.presumedBearing}` : "No exact source row", input.material === "sand" ? "Preliminary estimate; groundwater, width and footing shape modifiers apply." : "Sand table is not transferred to gravel", input.material === "sand" ? "interpretive" : "project", "Preliminary · 25 mm"),
      q("Effective strength", `φ′ ${input.material === "gravel" ? row.gravelPhi : (sandGradingPhi[input.condition]?.[input.grading] || row.sandPhi)}`, "Effective-stress first check", "interpretive", "Drained · typical range"),
      q("Foundation modulus", modulus ? `E_s ${modulus}` : "Exact row not available", modulus ? "Foundation secant-modulus first check" : "Use project stiffness", modulus ? "interpretive" : "project", "Settlement first check"),
      q("Unit weight", `γ_d / γ_sat ${row.unitWeight}`, "Below groundwater: γ′ = γ_sat − 9.81 kN/m³", "interpretive", "Typical range"),
      q("Density index", `I_D ${row.densityIndex}`, "Relative-density classification band", "standard", "Classification range"),
      q("Groundwater flow", `k ${permeability.value}`, input.uscs && input.uscs !== "unknown" ? "Selected USCS first check" : "Broad material-family envelope", "interpretive", "Typical range")
    ];
  }
  function groundDescription(input) {
    if (input.family === "cohesive") {
      const row = byId(data.cohesive, input.condition); if (!row) return null;
      const material = input.material === "silty-clay" ? "Silty CLAY" : input.material === "sandy-clay" ? "Sandy CLAY" : "CLAY";
      const pi = data.plasticity[input.plasticity || "unknown"] || data.plasticity.unknown;
      return { heading: `${material} · ${row.term.toLowerCase()}`, logic: "Undrained: s_u classification band · Drained: typical peak c′ / φ′ · E_s: settlement first check.", quickRanges: soilQuickRanges(input, row), parameters: [
        p("Classification", "AS 1726 consistency", `${row.term} (${row.symbol})`, "standard", "AS 1726:2017 Table 11; classification only."),
        p("Strength", "Consistency classification band (s_u basis)", row.su, "standard", "AS 1726 classification band; not a project characteristic or design s_u."),
        p("Physical / state", "Representative dry / saturated unit weight, γ_d / γ_sat", row.unitWeight || "No exact source row for this consistency", row.unitWeight ? "interpretive" : "project", row.unitWeight ? `${row.id === "soft" ? "Non-organic soft clay source row. " : ""}Look (2014) Table 7.3. Use γ_sat below groundwater and within the capillary fringe; derive buoyant unit weight separately.` : "Use measured or project-adopted unit weight."),
        p("Strength", "Typical peak effective strength, c′ / φ′", row.effectiveStrength || project, row.effectiveStrength ? "interpretive" : "project", row.effectiveStrength ? `${row.id === "soft" ? "Non-organic soft clay source row. " : ""}Look (2014) Table 7.9 peak-strength row. Critical-state, softened, remoulded and residual strengths are lower; long-term effective cohesion may be lost.` : "No exact handbook row for this consistency; use project effective-stress parameters."),
        p("Strength", "SPT N indication", row.spt, "interpretive", "Look (2014) Table 5.3 first approximation for clay. Sensitivity and plasticity affect the correlation; use local correlations and project test records."),
        p("Strength", "DCP indication", row.dcp, "interpretive", "Look (2014) Table 5.11. Confirm hammer mass, drop, cone and procedure; correlation is indicative only."),
        p("Foundation / interface", "Presumed shallow bearing pressure, q_a", row.presumedBearing, "interpretive", "Look (2014) Table 21.4 preliminary estimate for natural material, B > 1 m and 25 mm settlement. Source geometry notes: divide by 1.2 for strip footings and reduce in ratio B for B < 1 m. The starred groundwater adjustment belongs to the sand rows; no clay reduction is inferred. Gross/net basis is not stated in this table."),
        p("Foundation / interface", "Surface-strip undrained ultimate screen, q_ult", `Approx. ${row.undrainedUltimate}`, "interpretive", "FHWA GEC 6 (2002), Eq. (5-4) and Table 5-1: N_c = 5.14 for φ = 0; q_ult ≈ 5.14 s_u. AS 1726 Table 11 supplies classification-band limits, not a bearing method. Homogeneous ground, level surface, centred vertical load, surface strip footing; gross = net at zero surcharge. Limits rounded to 1 kPa; no settlement allowance or design adoption."),
        p("Deformation / compressibility", "Foundation secant modulus E_s, source short / long-term indication", `${row.eShort} / ${row.eLong}`, "interpretive", "Look (2014) Table 11.7; the terms do not prescribe a duration. Select the project modulus for the applicable stress, strain and drainage condition."),
        p("Deformation / compressibility", "Poisson ratio ν, source short / long-term indication", pi.poisson.includes("required") ? "0.35–0.45 / 0.25–0.40" : pi.poisson, "interpretive", pi.poisson.includes("required") ? "Broad Look (2014) Table 11.17 clay-plasticity envelope. Select a verified plasticity class to narrow the row." : `Look (2014) Table 11.17 for ${pi.label}.`),
        permeabilityRow(input), ...commonProjectRows()
      ] };
    }
    if (input.family === "granular") {
      const row = byId(data.granular, input.condition); if (!row) return null;
      const material = input.material === "gravel" ? "GRAVEL" : "SAND";
      const modulus = input.material === "sand" ? row.sandE : row.gravelE;
      return { heading: `${material} · ${row.term.toLowerCase()}`, logic: "Drained: project φ′ · Below groundwater: γ_sat / γ′ · E_s and k: first checks.", quickRanges: soilQuickRanges(input, row), parameters: [
        p("Classification", "AS 1726 relative density", row.term, "standard", "AS 1726:2017 Table 12; reported classification supported by penetration-test correlations or density testing, not visual/tactile assessment alone."),
        p("Physical / state", "Density index, I_D", row.densityIndex, "standard", "AS 1726 classification band; determine by the applicable field or laboratory procedure."),
        p("Physical / state", "Representative dry / saturated unit weight, γ_d / γ_sat", row.unitWeight, "interpretive", "Look (2014) Table 7.3. Use γ_sat below groundwater and within the capillary fringe; derive buoyant unit weight separately."),
        p("Strength", "Effective friction angle, φ′", input.material === "gravel" ? row.gravelPhi : (sandGradingPhi[input.condition]?.[input.grading] || row.sandPhi), "interpretive", "Look (2014) Table 7.8; the correlation identifies fines-governed strength above 30%, not a soil-classification boundary. Use material-specific strength evidence where fines govern; verify grading, stress level and drainage."),
        p("Strength", "Effective cohesion, c′", project, "project", "Do not assume zero or apparent cohesion without the project material model."),
        p("Strength", "SPT N indication (field / corrected)", input.material === "sand" ? `${row.sptField} / ${row.sptCorrected} blows/300 mm` : project, input.material === "sand" ? "interpretive" : "project", input.material === "sand" ? "Look (2014) Table 5.5 for clean medium sand. Confirm equipment, energy and overburden corrections, grading, fines and deposit age." : "The cited sand SPT row is not transferred to gravel; use project test data and the applicable correlation."),
        p("Strength", "DCP indication", input.material === "sand" ? row.dcp : project, input.material === "sand" ? "interpretive" : "project", input.material === "sand" ? "Look (2014) Table 5.11 sand row. Confirm hammer mass, drop, cone and procedure; correlation is indicative only." : "Look (2014) Table 5.11 does not give density-based gravel bands; coarse particles cause erratic results. Do not transfer sand DCP bands."),
        p("Foundation / interface", "Presumed shallow bearing pressure, q_a", input.material === "sand" ? row.presumedBearing : "No exact source row for gravel", input.material === "sand" ? "interpretive" : "project", input.material === "sand" ? "Look (2014) Table 21.4 preliminary estimate for natural sand, B > 1 m and 25 mm settlement. Water level is assumed more than B below the base. Source modifiers: halve for saturated/submerged sand, divide by 1.2 for strip footings, and reduce in ratio B for B < 1 m. Gross/net basis is not stated in this table." : "The cited presumed-bearing table is for sands; do not transfer it to gravel."),
        p("Deformation / compressibility", "Foundation secant modulus E_s", modulus || project, modulus ? "interpretive" : "project", modulus ? `Look (2014) Table 11.7 ${input.material === "sand" ? "medium to coarse sand" : "gravel"} state row; foundation-use estimate.${input.material === "gravel" && row.id === "medium-dense" ? " The source term Medium is aligned here to the AS 1726 Medium dense class for comparison only." : ""}` : "No matching gravel modulus row for this descriptive state."),
        p("Deformation / compressibility", "Poisson ratio ν, source short / long-term indication", "0.30 / 0.30", "interpretive", "Look (2014) Table 11.17 for sands and gravels; the terms do not prescribe a duration."),
        permeabilityRow(input), ...commonProjectRows()
      ] };
    }
    const strength = byId(data.rockStrength, input.condition); const weather = byId(data.weathering, input.weathering); if (!strength) return null;
    const material = ({ sandstone: "SANDSTONE", shale: "SHALE", limestone: "LIMESTONE", granite: "GRANITE", basalt: "BASALT" })[input.material] || "ROCK";
    const gamma = weather ? data.rockUnitWeight[input.material]?.[weather.symbol] : null;
    return { heading: `${material} · ${strength.term.toLowerCase()} strength · ${weather ? weather.term.toLowerCase() : "weathering not selected"}`, logic: "Bearing range is a first approximation · RQD, defects, weathering and footing geometry control adoption.", quickRanges: [
      q("Bearing range", `q_a ${strength.allowableBearing}`, "Look Table 22.2 strength-class first approximation; RQD and defects may govern.", "interpretive", "Preliminary only"),
      q("Intact strength", `UCS ${strength.ucs}`, "Rock-material classification band", "standard", "Classification"),
      q("Weathering", weather ? `${weather.term} (${weather.symbol})` : "Not selected", weather ? "Keep separate from strength" : "Select the reported weathering class", weather ? "standard" : "project", "Material state"),
      q("Intact weight", gamma ? `γ ${gamma} kN/m³` : "Exact row not available", gamma ? "Exact lithology / weathering row" : "Use project value", gamma ? "interpretive" : "project", "Self-weight"),
      q("Rock mass", "RQD + defects required", "Table 22.1 spans q_a 1–30 MPa by RQD; use the lesser applicable limit.", "project", "Bearing control")
    ], parameters: [
      p("Classification", "AS 1726 weathering", weather ? `${weather.term} (${weather.symbol})` : "Not selected", weather ? "standard" : "project", weather ? "AS 1726:2017 Table 20." : "Select the weathering class stated in the project log or report."),
      ...(weather ? [p("Classification", "Weathering description", weather.note, "standard", "Rock-mass discontinuities remain separate.")] : []),
      p("Classification", "AS 1726 rock material strength", strength.term, "standard", "AS 1726:2017 Table 19."),
      p("Strength", "Rock-material strength classification band (UCS basis)", strength.ucs, "standard", "AS 1726 rock-material classification band; not a project UCS or rock-mass strength."),
      p("Strength", "Rock-material classification indication, I_s(50)", strength.is50, "standard", "Classification indication only; confirm the applicable test relationship for the project rock."),
      p("Foundation / interface", "Preliminary allowable rock bearing pressure, q_a", strength.allowableBearing, "interpretive", "Look (2014) Table 22.2 first approximation by rock-material strength group. SPT has limited use in rock; this range does not replace core logging, RQD, defect assessment or project bearing analysis."),
      p("Foundation / interface", "RQD-based allowable bearing-pressure reference", data.rockBearingRqd.map((row) => `${row.rqd} ${row.description}: ${row.allowableBearing}`).join("; "), "interpretive", "Look (2014) Table 22.1. Use the lesser of the applicable table value, UCS and allowable concrete stress. As RQD approaches zero, treat the material as a soil mass; this rock-bearing reference does not apply. The source states this method is not appropriate for detailed design."),
      ...groundModelRows(),
      p("Physical / state", "Intact-rock unit weight, γ_d (dry)", gamma ? `${gamma} kN/m³` : project, gamma ? "interpretive" : "project", gamma ? "Look (2014) Table 9.2 dry unit weight; exact rock type/weathering row, intact material only. Not saturated or bulk unit weight." : "No exact table row for the selected weathering class."),
      p("Strength", "Measured intact-rock strength, UCS / I_s(50), and project correlation", project, "project", "Use project test results and a rock-type-specific correlation where UCS is inferred from point-load testing."),
      p("Strength", "Rock quality and defects: TCR / RQD; fracture frequency; spacing / orientation / persistence / roughness / aperture / infill", project, "project", "Describe and assess the rock mass and controlling defect sets; intact-rock strength alone is insufficient."),
      p("Strength", "Controlling defect / joint shear strength, c′_j / φ′_j", project, "project", "Confirm defect roughness, infill, persistence, normal stress, weathering and the adopted joint-strength model."),
      p("Strength", "Rock-mass classification / strength model: GSI, RMR, Q or project method where required", project, "project", "Use the nominated project method and parameters; do not infer a rock-mass model from AS 1726 strength and weathering classes."),
        p("Deformation / compressibility", "Rock-mass deformation modulus E_rm", project, "project", "Do not infer rock-mass stiffness from UCS class alone."),
        p("Deformation / compressibility", "Poisson ratio ν", project, "project", "Use the applicable ground model; no rock-mass value is inferred from UCS."),
      p("Hydraulic / durability", "Rock-mass permeability / inflow", project, "project", "Discontinuities and groundwater regime govern; use project testing or observations."),
      p("Hydraulic / durability", "pH; sulfate; chloride; electrical resistivity", project, "project", "Use project exposure and aggressivity test results.")
    ] };
  }
  function foundationDesignRows() {
    return [
        p("Foundation / interface", "Project-adopted allowable bearing pressure, q_a", project, "project", "Confirm geometry, founding stratum, groundwater, bearing and settlement criteria; not the presumed reference above."),
      p("Foundation / interface", "Design bearing resistance", project, "project", "Do not infer from consistency, relative density or UCS class alone."),
      p("Foundation / interface", "Total / differential settlement", "Project analysis required", "project", "Confirm structural tolerance, loading, geometry, compressibility and stress history."),
        p("Foundation / interface", "Vertical subgrade reaction modulus, k_v (kN/m³)", project, "project", "Depends on footing/slab size, stiffness, pressure and depth; not permeability or a soil constant."),
      p("Foundation / interface", "Pile shaft / base resistance, f_m,s / f_b", project, "project", "Installation method, design basis, toe/socket condition and compression/uplift cases are required."),
      p("Foundation / interface", "Anchor grout–ground bond / fixed length", project, "project", "Ground profile, drilling and grouting method, bond stratum, design basis and verification testing are required.")
    ];
  }
  function evaluate(input) {
    if (!input || !["cohesive", "granular", "rock"].includes(input.family)) return { status: "Input required", reason: "Select a supported ground family." };
    if (input.mode && input.mode !== "description") return { status: "Input required", reason: "Application modes are outside this ground-description lookup." };
    const ground = groundDescription(input);
    if (!ground) return { status: "Input required", reason: "Complete the controlled ground description." };
    if (input.family === "rock" && ["residual-soil", "extremely-weathered"].includes(input.weathering)) {
      const reason = "Soil-like material: select a soil description; rock bearing ranges do not apply.";
      ground.soilLike = true;
      const weather = byId(data.weathering, input.weathering);
      ground.heading = `${ground.heading.split(" · ")[0]} · ${weather.term.toLowerCase()} (${weather.symbol}) · soil-like material`;
      ground.logic = reason;
      ground.parameters = ground.parameters.filter(row => !/AS 1726 rock material strength|Rock-material strength classification|Rock-material classification indication|Measured intact-rock strength|Rock quality and defects|Controlling defect|Rock-mass classification/.test(row.label));
      ground.parameters.push(p("Strength", "Soil strength, s_u or c′ / φ′", project, "project", "Use soil description and tests for the applicable drainage condition."));
      ground.parameters.forEach(row => {
          if (row.label.startsWith("Rock-mass deformation")) { row.label = "Foundation secant modulus E_s"; row.basis = "Use project soil stiffness; the previous rock-strength selection does not apply."; }
          if (row.label === "Poisson ratio ν") row.basis = "Use project soil deformation parameters and the applicable drainage condition.";
        if (row.label.startsWith("Rock-mass permeability")) { row.label = "Soil permeability / groundwater inflow"; row.basis = "Use project tests, layering and groundwater observations."; }
          if (row.label.startsWith("Intact-rock unit weight")) { row.label = "Material unit weight, γ_d (dry)"; row.basis = row.role === "interpretive" ? "Look (2014) Table 9.2 dry unit weight; selected lithology/weathering row, not a soil-strength classification." : "No verified unit-weight range for this selection."; }
      });
      ground.quickRanges = ground.quickRanges.filter(row => !["Intact strength", "Rock mass"].includes(row.label));
      ground.quickRanges.forEach(row => { if (row.label === "Intact weight") row.label = "Material weight"; });
      ground.parameters.filter(row => /bearing/i.test(row.label)).forEach(row => { row.value = "Not applicable to this weathering class"; row.basis = reason; row.role = "project"; });
      ground.quickRanges.filter(row => row.label === "Bearing range").forEach(row => { row.value = "Not applicable to this weathering class"; row.note = reason; row.role = "project"; });
    }
    const projectInputs = foundationDesignRows();
    ground.parameters = [...ground.parameters, ...projectInputs];
    return { status: "Reference only", ground, projectInputs: projectInputs.filter((row) => row.role === "project") };
  }
  function settlementReference(ground) {
      return {
        title: "Additional settlement inputs",
        source: "FHWA GEC 6 (2002), Section 5.3; NHI-05-037, Section 5.4.6 (subgrade reaction)",
        headings: ["Parameter", "Used for", "Project basis"],
        rows: [
          ["Compressibility, m_v; C_c / C_r", "Consolidation settlement", "Laboratory testing, initial void ratio, stress range, OCR and preconsolidation stress"],
          ["Time effects, c_v / C_α", "Consolidation rate / secondary compression", "Drainage path, layer thickness and loading history"],
          ["Vertical subgrade reaction modulus, k_v (kN/m³)", "Foundation spring model", "Foundation size, stiffness and pressure; not permeability or interchangeable with E_s"]
        ],
        note: "E and ν references are in the selected ground details. The additional inputs above require project evidence. Compare support movements at the same time under the relevant service loads; include layers and groundwater."
    };
  }
  // Presentation rows retain source values; labels clarify pairs without deriving new parameters.
  function labelledPair(value, first, second, unit = "") {
    const parts = String(value).split(" / ");
    if (parts.length !== 2) return [{ label: "", value }];
    return [{ label: first, value: parts[0] + (unit && !parts[0].includes(unit) ? ` ${unit}` : "") }, { label: second, value: parts[1] }];
  }
  function guideRows(input, ground) {
    if (!ground) return [];
    const find = text => ground.parameters.find(row => row.label.includes(text));
    const rows = [];
    const add = (name, source, use, condition, parts) => {
      if (!source) return;
      rows.push({ name, value: source.value, parts: parts || [{ label: "", value: source.value }], use, condition, basis: source.basis, sourceLabels: source.label ? [source.label] : [], role: source.role });
    };
    const bearing = find(input.family === "rock" ? "Preliminary allowable rock" : "Presumed shallow bearing");
    add("Allowable bearing pressure, q_a", bearing, "Foundation pressure reference", input.family === "rock" ? (bearing.role === "project" ? bearing.basis : "Broad source reference only; strength class cannot select a bearing pressure. Assess rock quality, defects, weathering and footing conditions.") : input.material === "gravel" ? "No gravel range; sand values do not apply." : "Natural ground; check width, groundwater and settlement. Not ultimate.");
    if (input.family === "cohesive") {
      add("Undrained shear strength, s_u", find("s_u basis"), "Undrained strength analysis", "Classification range, not design strength.");
      const effective = find("Typical peak effective strength");
      add("Effective cohesion, c′; friction angle, φ′", effective, "Effective-stress strength analysis", "Peak strengths; softened/residual values may be lower. Effective cohesion may be lost over time.", effective?.role === "interpretive" ? effective.value.split("; ").map(value => ({ label: "", value })) : undefined);
    } else if (input.family === "granular") {
      add("Effective friction angle, φ′", find("Effective friction angle"), "Effective-stress strength analysis", "Look Table 7.8: fines govern above 30%; this is a correlation limit, not a classification rule. Use material-specific strength evidence; check fines, plasticity, grading and stress level; φ′ is not the base-interface angle δ.");
      add("Effective cohesion, c′", find("Effective cohesion"), "Effective-stress strength analysis", "Project model required; no assumed zero or apparent cohesion.");
    } else if (!ground.soilLike) {
      add("Uniaxial compressive strength, UCS", find("UCS basis"), "Intact-rock strength classification", "Intact specimen strength, not rock-mass bearing pressure.");
    } else {
      add("Soil strength, s_u or c′ / φ′", find("Soil strength"), "Strength analysis", "Use soil type and state, not the rock-strength class.");
    }
    const modulus = find("Foundation secant modulus") || find("Rock-mass deformation modulus");
    add(input.family === "rock" && !ground.soilLike ? "Rock-mass deformation modulus, E_rm" : "Deformation modulus, E_s", modulus, "Settlement analysis", input.family === "rock" ? (ground.soilLike ? "Use project soil stiffness." : "Depends on defects and stress; UCS alone is insufficient.") : "Stress, strain and drainage dependent; source time labels are not durations.", modulus && labelledPair(modulus.value, "Short term (source)", "Long term (source)"));
    const weight = find("unit weight");
      add(input.family === "rock" ? (ground.soilLike ? "Material unit weight, γ_d (dry)" : "Intact-rock unit weight, γ_d (dry)") : "Unit weight, γ_d; γ_sat", weight, "Self-weight and ground stress", input.family === "rock" ? "Dry weight only; match lithology and weathering." : "Dry and saturated values are separate states. Natural unit weight requires project data.", weight && labelledPair(weight.value, "Dry, γ_d", "Saturated, γ_sat", "kN/m³"));
      if (input.family !== "rock" && weight) rows[rows.length - 1].condition = "Natural weight needs project data. Submerged, hydrostatic: γ′ = γ_sat − γ_w; γ_w ≈ 9.81 kN/m³. Relation only; no value adopted.";
      const poisson = find("Poisson ratio");
      add("Poisson ratio, ν", poisson, "Deformation analysis", input.family === "rock" ? "Dimensionless; use project deformation parameters." : input.family === "cohesive" ? "Dimensionless; clay envelope unless plasticity is selected." : "Dimensionless; source values for sands and gravels.", poisson && labelledPair(poisson.value, "Short term (source)", "Long term (source)"));
      add("Permeability, k", find("Coefficient of permeability"), "Groundwater-flow assessment", "Well-compacted source basis; structure/layering excluded. Family envelope unless USCS is selected.");
      if (input.family === "granular" && input.material === "sand") rows.find(row => /modulus/.test(row.name)).condition = "Medium to coarse sand; stress/strain dependent. Not transferable to fine or residual clayey/silty sand.";
      if (input.family === "cohesive" && input.condition === "soft") {
        rows.filter(row => /Unit weight|Effective cohesion/.test(row.name)).forEach(row => { row.condition = "Non-organic soft clay source row. " + row.condition; });
      }
    if (input.family !== "rock") {
      const permeability = rows.find(row => row.name === "Permeability, k");
      if (permeability && (!input.uscs || input.uscs === "unknown")) {
        permeability.parts = [{ label: "", value: "Select USCS for a range" }];
        permeability.value = "Select USCS for a range";
        permeability.role = "project";
        permeability.condition = "Select a matching USCS group. Well-compacted source basis; broad envelope in this row’s source note. Project testing for design.";
      }
      if (input.family === "granular" && input.material === "gravel") {
        rows.find(row => /modulus/.test(row.name)).condition = modulus?.role === "project"
          ? "No verified modulus range for this relative-density class; use project testing."
          : "Gravel source range; stress, strain and drainage dependent.";
      }
    }
    const shaft = { value: "Project assessment required", role: "project", basis: "Look (2014), Table 21.17; installation-specific references only." };
    let shaftCondition = "No verified shaft-friction range for this material. Do not transfer sand or clay factors.";
    let shaftParts;
    if (input.family === "granular" && input.material === "sand") {
      const density = data.granular.find(row => row.id === input.condition);
      const sourceRow = data.interfaceReferences.find(group => group.title.startsWith("Sand piles")).rows.find(row => row[0] === density?.term);
      shaftCondition = "Factors are dimensionless. f_s = (K_s tan δ) σ′_v (kPa); σ′_v is vertical effective stress at depth. Look Table 21.17; uniform-soil estimate. Low-displacement piles: 50% of driven factor. Not allowable stress or total pile capacity.";
      if (sourceRow) {
        shaft.value = "K_s tan δ (dimensionless)";
        shaft.role = "interpretive";
        shaftParts = [{label:"K_s tan δ · bored (dimensionless)",value:sourceRow[1]},{label:"K_s tan δ · driven displacement (dimensionless)",value:sourceRow[2]}];
      } else shaftCondition = "No verified factor for this relative-density class. Use project assessment; do not extrapolate from loose sand.";
    } else if (input.family === "cohesive") {
      shaft.value = "Match installation and clay condition";
      shaftCondition = "f_s = αs_u (kPa). Look Table 21.17; α is dimensionless. Expand for bored/driven and fissuring conditions; no factor selected automatically.";
    }
    add("Pile shaft resistance, f_s", shaft, "Unit shaft resistance", shaftCondition, shaftParts);
    if(input.family === "granular" && input.material === "sand") {
      const phi=rows.find(row=>row.name==="Effective friction angle, φ′");
      if(sandGradingPhi[input.condition]?.[input.grading]) {
        const grading=input.grading==="well"?"Well-graded":"Uniformly graded";
        phi.condition=grading+" sand · "+input.condition+". "+phi.condition;
        phi.basis += " Selected exact grading-specific row: "+grading.toLowerCase()+" sand, "+input.condition+"; no interpolation.";
      }
      if(input.condition === "very-dense") rows.find(row=>/modulus/.test(row.name)).condition = "Medium to coarse sand: broad 40–100 MPa source range. Refine using project stress/strain and test evidence; no midpoint adopted.";
    }
    return rows;
  }
  function unifiedRows(input, ground) {
    if (!ground) return [];
    const rows = guideRows(input, ground).map(row => ({...row, group:"Main parameters"}));
    const covered = new Set(rows.flatMap(row => row.sourceLabels));
    // Preserve the broad envelope as contextual evidence, not the selected permeability.
    const permeability = rows.find(row => row.name === "Permeability, k");
    if (permeability && (!input.uscs || input.uscs === "unknown")) {
      const original = ground.parameters.find(row => row.label === "Coefficient of permeability, k");
      permeability.basis = `${original.basis} Family envelope: ${original.value}. Not a density-specific range.`;
    }
    const order=["Classification","Strength","Physical / state","Deformation / compressibility","Hydraulic / durability","Foundation / interface","Ground model"];
    for (const source of [...ground.parameters].sort((a,b)=>order.indexOf(a.group)-order.indexOf(b.group))) {
      if (covered.has(source.label)) continue;
      rows.push({name:source.label, value:source.value, parts:[{label:"",value:source.value}],
        use:"", condition:source.role === "project" ? source.basis : "Source-qualified reference; expand for basis.",
        basis:source.basis, role:source.role, group:source.group, sourceLabels:[source.label], inventory:true});
    }
    return rows;
  }
  // Conditional estimating references: Look Table 21.17, PDF345 / printed320.
  function sandShaftBenchmarks(stress = 100) {
    if (![50,100,200].includes(stress)) throw new RangeError("Select a stated effective-stress benchmark");
    const source = data.interfaceReferences.find(group => group.title.startsWith("Sand piles"));
    const stressValue = (factor, multiplier = 1) => Number.isFinite(Number(factor))
      ? `${Math.round(Number(factor) * multiplier * stress)} kPa` : factor;
    return {title:"Sand pile shaft resistance, f_s",source:`Calculated estimate at assumed σ′_v = ${stress} kPa · Look (2014), Table 21.17, PDF p. 345 / printed p. 320`,
      headings:["Relative density","Bored · f_s","Driven low-displacement · f_s","Driven displacement · f_s"],
      rows:source.rows.map(row => [row[0],stressValue(row[1]),stressValue(row[2],0.5),stressValue(row[2])]),
      note:"Approximate unit shaft stress, rounded to 1 kPa; not allowable stress or total capacity. f_s = (K_s tan δ) σ′_v. These are assumed stress scenarios, not a density-only range; effective stress depends on depth and groundwater. Uniform-soil estimate; installation and layering matter. Uplift requires separate assessment. No very-loose or gravel extrapolation."};
  }
  function boredClayShaftBand(row, factor) {
    const bounds = row.su.match(/\d+(?:\.\d+)?/g).map(Number);
    const value = strength => Math.round(Math.min(factor * strength,100));
    if (bounds.length === 2) return `≈ ${value(bounds[0])}–${value(bounds[1])} kPa`;
    return row.su.startsWith("≤") ? `Up to about ${value(bounds[0])} kPa` : `≈ ${value(bounds[0])}–100 kPa (cap)`;
  }
  function overviewShaft(material, condition, stress = 100) {
    const pending={role:"project",parts:[{label:"",value:"No source estimate"}]};
    if (material === "clay") {
      const row=data.cohesive.find(row=>row.id===condition);
      if (!row) return pending;
      return {role:"interpretive",parts:[{label:"Bored · fissured",value:boredClayShaftBand(row,0.30)},{label:"Bored · non-fissured",value:boredClayShaftBand(row,0.45)}]};
    }
    if (material === "sand") {
      const state=data.granular.find(row=>row.id===condition);
      const row=sandShaftBenchmarks(stress).rows.find(row=>row[0]===state?.term);
      if (!row) return pending;
      return {role:"interpretive",parts:[{label:"Bored",value:row[1]},{label:"Driven displacement",value:row[3]}]};
    }
    return pending;
  }
  function foundationQuickReferences(material, stress = 100) {
    if (material === "sand") return [sandShaftBenchmarks(stress)];
    if (material === "clay") return [{title:"Bored clay pile shaft resistance, f_s",source:"Calculated from consistency bands · Look (2014), Table 21.17; AS 1726 Table 11",
      headings:["Consistency","Fissured · α = 0.30","Non-fissured · α = 0.45"],
      rows:data.cohesive.map(row => [row.term,boredClayShaftBand(row,0.30),boredClayShaftBand(row,0.45)]),
      note:"Approximate unit shaft stress from f_s = αs_u; rounded to 1 kPa, capped at 100 kPa. These are conditional estimates from classification bands, not measured or allowable resistance. Bored piles in uniform clay only; confirm fissuring, installation and layering. Uplift requires separate assessment. Driven-pile factors remain in the selected details."}];
    if (material === "gravel") return [{...data.baseInterfaceReference,title:"Gravel footing sliding · mass-concrete interface",rows:data.baseInterfaceReference.rows.filter(row => /gravel/i.test(row[0]))}];
    if (material === "rock") return [{...data.interfaceReferences.find(group => group.title.startsWith("Rock anchors")),note:"Ultimate grout–rock bond, not pile socket resistance. Intact rock only; reduce for fractured/weathered rock using project evidence. Source factor of safety 2.0–2.5; no allowable value calculated. Match lithology separately from the UCS class above."}];
    return [];
  }
  return { evaluate, groundDescription, settlementReference, guideRows, unifiedRows, labelledPair, sandShaftBenchmarks, foundationQuickReferences, overviewShaft };

});

