"use strict";

(function exposeGeoData(root, factory) {
  const data = factory();
  if (typeof module === "object" && module.exports) module.exports = data;
  root.GeoParametersData = data;
})(typeof globalThis !== "undefined" ? globalThis : this, function buildGeoData() {
  const sources = {
    as1726: { short: "AS 1726:2017", title: "Geotechnical site investigations", role: "Standard classification", status: "Checked", note: "Classification terminology only; a field class is not automatically a design parameter." },
    look: { short: "Look (2014)", title: "Handbook of Geotechnical Investigation and Design Tables, 2nd ed.", role: "Interpretive reference", status: "For Review", note: "Typical correlations and estimates; replace with project geotechnical values for design." },
    internal: { short: "Internal borehole-log table", title: "Reference parameters for interpretation of borehole logs 1", role: "Internal practical reference", status: "Reference only", note: "Not a standard or formal design document; its unverified rows do not control outputs." }
  };
  const cohesive = [
    { id: "very-soft", term: "Very soft", symbol: "VS", su: "≤ 12 kPa", spt: "≤ 2 blows/300 mm", dcp: "0–1 blows/100 mm", eShort: "< 3 MPa", eLong: "< 2 MPa", presumedBearing: "< 25 kPa", undrainedUltimate: "≤ 62 kPa" },
    { id: "soft", term: "Soft", symbol: "S", su: "> 12 to ≤ 25 kPa", spt: "2–5 blows/300 mm", dcp: "0–1 blows/100 mm", eShort: "2–7 MPa", eLong: "1–5 MPa", unitWeight: "12 / 16 kN/m³", effectiveStrength: "c′ 10–20 kPa; φ′ 15–25°", presumedBearing: "25–50 kPa", undrainedUltimate: "> 62 to ≤ 129 kPa" },
    { id: "firm", term: "Firm", symbol: "F", su: "> 25 to ≤ 50 kPa", spt: "5–10 blows/300 mm", dcp: "1–2 blows/100 mm", eShort: "5–12 MPa", eLong: "4–8 MPa", presumedBearing: "50–100 kPa", undrainedUltimate: "> 129 to ≤ 257 kPa" },
    { id: "stiff", term: "Stiff", symbol: "St", su: "> 50 to ≤ 100 kPa", spt: "10–20 blows/300 mm", dcp: "2–5 blows/100 mm", eShort: "10–25 MPa", eLong: "7–20 MPa", unitWeight: "16 / 18 kN/m³", effectiveStrength: "c′ 20–50 kPa; φ′ 20–30°", presumedBearing: "100–200 kPa", undrainedUltimate: "> 257 to ≤ 514 kPa" },
    { id: "very-stiff", term: "Very stiff", symbol: "VSt", su: "> 100 to ≤ 200 kPa", spt: "20–40 blows/300 mm", dcp: "6–9 blows/100 mm", eShort: "20–50 MPa", eLong: "15–35 MPa", presumedBearing: "200–400 kPa", undrainedUltimate: "> 514 to ≤ 1028 kPa" },
    { id: "hard", term: "Hard", symbol: "H", su: "> 200 kPa", spt: "> 40 blows/300 mm", dcp: "> 10 blows/100 mm", eShort: "40–80 MPa", eLong: "30–60 MPa", unitWeight: "18 / 20 kN/m³", effectiveStrength: "c′ 50–100 kPa; φ′ 25–30°", presumedBearing: "> 400 kPa", undrainedUltimate: "> 1028 kPa" }
  ];
  const granular = [
    { id: "very-loose", term: "Very loose", densityIndex: "≤ 15%", sandPhi: "27–32°", gravelPhi: "30–34°", sptField: "≤ 4", sptCorrected: "≤ 3", dcp: "0–1 blows/100 mm", sandE: "< 5 MPa", unitWeight: "14 / 17 kN/m³", presumedBearing: "< 40 kPa" },
    { id: "loose", term: "Loose", densityIndex: "> 15 to ≤ 35%", sandPhi: "27–32°", gravelPhi: "30–34°", sptField: "4–10", sptCorrected: "3–8", dcp: "1–3 blows/100 mm", sandE: "3–10 MPa", gravelE: "25–50 MPa", unitWeight: "15 / 18 kN/m³", presumedBearing: "40–100 kPa" },
    { id: "medium-dense", term: "Medium dense", densityIndex: "> 35 to ≤ 65%", sandPhi: "32–37°", gravelPhi: "34–39°", sptField: "10–30", sptCorrected: "8–25", dcp: "3–8 blows/100 mm", sandE: "8–30 MPa", gravelE: "50–100 MPa", unitWeight: "17 / 20 kN/m³", presumedBearing: "100–275 kPa" },
    { id: "dense", term: "Dense", densityIndex: "> 65 to ≤ 85%", sandPhi: "37–42°", gravelPhi: "39–44°", sptField: "30–50", sptCorrected: "25–43", dcp: "8–15 blows/100 mm", sandE: "25–50 MPa", gravelE: "100–200 MPa", unitWeight: "19 / 21 kN/m³", presumedBearing: "275–450 kPa" },
    { id: "very-dense", term: "Very dense", densityIndex: "> 85%", sandPhi: "42–47°", gravelPhi: "44–49°", sptField: "> 50", sptCorrected: "> 43", dcp: "> 15 blows/100 mm", sandE: "40–100 MPa", unitWeight: "21 / 22 kN/m³", presumedBearing: "> 450 kPa" }
  ];
  const plasticity = {
    unknown: { label: "Not selected", poisson: "Project report value required" }, low: { label: "Low, PI < 12", poisson: "0.35 / 0.25" },
    medium: { label: "Medium, 12 < PI < 22", poisson: "0.40 / 0.30" }, high: { label: "High, 22 < PI < 32", poisson: "0.45 / 0.35" }, extreme: { label: "Extremely high, PI > 32", poisson: "0.45 / 0.40" }
  };
  const permeability = {
    unknown: { label: "Not selected", value: "Project test value required" },
    GW: { label: "GW · well-graded gravel", value: "10⁻³–10⁻¹ m/s" }, GP: { label: "GP · poorly graded gravel", value: "10⁻²–10 m/s" }, GM: { label: "GM · silty gravel", value: "10⁻⁷–10⁻⁵ m/s" }, GC: { label: "GC · clayey gravel", value: "10⁻⁸–10⁻⁶ m/s" },
    SW: { label: "SW · well-graded sand", value: "10⁻⁵–10⁻³ m/s" }, SP: { label: "SP · poorly graded sand", value: "10⁻⁴–10⁻² m/s" }, SM: { label: "SM · silty sand", value: "10⁻⁷–10⁻⁵ m/s" }, SC: { label: "SC · clayey sand", value: "10⁻⁸–10⁻⁶ m/s" },
    ML: { label: "ML · low-plasticity silt", value: "10⁻⁹–10⁻⁷ m/s" }, MH: { label: "MH · high-plasticity silt", value: "10⁻⁹–10⁻⁷ m/s" }, CL: { label: "CL · low-plasticity clay", value: "10⁻⁹–10⁻⁷ m/s" }, CH: { label: "CH · high-plasticity clay", value: "10⁻¹⁰–10⁻⁸ m/s" }, OL: { label: "OL · low-plasticity organic soil", value: "10⁻⁸–10⁻⁶ m/s" }, OH: { label: "OH · high-plasticity organic soil", value: "10⁻⁷–10⁻⁵ m/s" }, Pt: { label: "Pt · peat", value: "10⁻⁶–10⁻⁴ m/s" }
  };
  const rockStrength = [
    { id: "very-low", term: "Very low", ucs: "0.6–2 MPa", is50: "0.03–0.1 MPa", allowableBearing: "0.5–2.5 MPa" }, { id: "low", term: "Low", ucs: "2–6 MPa", is50: "0.1–0.3 MPa", allowableBearing: "0.5–2.5 MPa" }, { id: "medium", term: "Medium", ucs: "6–20 MPa", is50: "0.3–1 MPa", allowableBearing: "2–12 MPa" },
    { id: "high", term: "High", ucs: "20–60 MPa", is50: "1–3 MPa", allowableBearing: "2–12 MPa" }, { id: "very-high", term: "Very high", ucs: "60–200 MPa", is50: "3–10 MPa", allowableBearing: "> 10 MPa" }, { id: "extremely-high", term: "Extremely high", ucs: "> 200 MPa", is50: "> 10 MPa", allowableBearing: "> 10 MPa" }
  ];
  const rockBearingRqd = [
    { rqd: "0–25%", description: "Very poor", allowableBearing: "1–3 MPa" }, { rqd: "25–50%", description: "Poor", allowableBearing: "3–6 MPa" }, { rqd: "50–75%", description: "Fair", allowableBearing: "6–12 MPa" },
    { rqd: "75–90%", description: "Good", allowableBearing: "12–20 MPa" }, { rqd: "> 90%", description: "Excellent", allowableBearing: "20–30 MPa" }
  ];
  const weathering = [
    { id: "residual-soil", term: "Residual soil", symbol: "RS", note: "Material has soil properties; original rock structure and fabric are no longer visible, and the soil has not been significantly transported." },
    { id: "extremely-weathered", term: "Extremely weathered", symbol: "XW", note: "Material has soil properties, but the original rock structure and fabric remain visible. Describe it using soil terminology." },
    { id: "highly-weathered", term: "Highly weathered", symbol: "HW", note: "The whole rock material is discoloured and its strength is significantly changed by weathering; porosity may increase or decrease." },
    { id: "moderately-weathered", term: "Moderately weathered", symbol: "MW", note: "The whole rock material is discoloured but shows little or no change of strength from fresh rock." },
    { id: "distinctly-weathered", term: "Distinctly weathered", symbol: "DW", note: "Use only where highly and moderately weathered rock cannot practicably be distinguished; strength and porosity may be changed." },
    { id: "slightly-weathered", term: "Slightly weathered", symbol: "SW", note: "Rock is partly discoloured, commonly along joints, but shows little or no change of strength from fresh rock." },
    { id: "fresh", term: "Fresh", symbol: "FR", note: "Rock shows no sign of mineral decomposition or colour change." }
  ];
  const rockUnitWeight = {
    shale: { XW: "20–22", DW: "21–23", SW: "22–24", FR: "23–25" }, sandstone: { XW: "18–21", DW: "20–23", SW: "22–25", FR: "24–26" }, limestone: { XW: "19–21", DW: "21–23", SW: "23–25", FR: "25–27" },
    granite: { XW: "25–27", DW: "26–27", SW: "27–28", FR: "28–29" }, basalt: { XW: "20–23", DW: "23–26", SW: "25–28", FR: "27–30" }
  };
  const baseInterfaceReference = {
    title: "Base interface · mass concrete",
    source: "FHWA GEC 6 (2002), Table 5-15 · US historical estimating reference",
    note: "Ultimate friction factors, not allowable resistance. Source material descriptions are retained; they do not map automatically to the selected AS 1726 class. Surface preparation, roughness and drainage require project confirmation. Coefficient and angle are separately rounded source values.",
    headings: ["Supporting material", "Friction coefficient, tan δ", "Interface angle, δ (°)"],
    rows: [
      ["Clean sound rock", "0.70", "35"],
      ["Clean gravel, gravel–sand mixtures, coarse sand", "0.55–0.60", "29–31"],
      ["Clean fine–medium sand; silty medium–coarse sand; silty or clayey gravel", "0.45–0.55", "24–29"],
      ["Clean fine sand; silty or clayey fine–medium sand", "0.35–0.45", "19–24"],
      ["Fine sandy silt; nonplastic silt", "0.30–0.35", "17–19"],
      ["Very stiff / hard residual or preconsolidated clay", "0.40–0.50", "22–26"],
      ["Medium stiff / stiff clay and silty clay (source terms)", "0.30–0.35", "17–19"]
    ]
  };
  const interfaceReferences = [
    { title: "Clay piles · adhesion factor α", source: "Look (2014) Table 21.17 · dimensionless", note: "c_a = αs_u (source: C_a = αC_u). Bored-pile c_a cap: 100 kPa. Driven very-stiff source bands overlap; no factor is selected automatically.", headings: ["Installation", "Clay condition", "α"], rows: [
      ["Bored", "Non-fissured", "0.45"], ["Bored", "Fissured", "0.30"],
      ["Driven", "Soft to firm", "1.00"], ["Driven", "Stiff to very stiff", "0.75"], ["Driven", "Very stiff to hard", "0.25"]
    ] },
    { title: "Sand piles · interface factor K_s tan δ", source: "Look (2014) Table 21.17 · dimensionless", note: "K_s is the pile-interface lateral earth-pressure coefficient, not subgrade reaction modulus; δ is the pile–soil interface friction angle. Shaft friction depends on K_s tan δ × vertical effective stress. Driven values apply to displacement piles; the source reduces them by 50% for low-displacement piles. Uniform-soil estimates only; layering and installation matter.", headings: ["Relative density", "Bored", "Driven displacement"], rows: [
      ["Loose", "Not recommended", "0.30"], ["Medium dense", "0.10", "0.50"], ["Dense", "0.20", "0.80"], ["Very dense", "0.30", "1.20"]
    ] },
    { title: "Rock anchors · ultimate grout–rock bond stress", source: "Look (2014) Table 20.22 · kPa", note: "Intact rock reference; fractured or weathered rock requires a reduction justified for the project. Source factor of safety: 2.0–2.5, method-specific; not a universal design factor. Verify by project anchor testing. No design bond stress or anchor capacity is calculated.", headings: ["Rock type", "Ultimate bond stress (kPa)"], rows: [
      ["Sandstone", "825–1725"], ["Soft shale", "200–825"], ["Slate / hard shale", "825–1375"], ["Soft limestone", "1000–1500"], ["Hard limestone", "1375–2000"], ["Granite / basalt", "1725–3000"]
    ] }
  ];
  return { sources, cohesive, granular, plasticity, permeability, rockStrength, rockBearingRqd, weathering, rockUnitWeight, baseInterfaceReference, interfaceReferences };
});
