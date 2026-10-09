(function (root) {
  "use strict";
  const cdn = "https://cdn.ramset.com.au/wp-content/uploads/2023/07/";
  const sources = {
    trubolt: { id: "CA-RAM-TRUBOLT", title: "SARB ANZ Edition 3 · TruBolt Xtrem", revision: "Edition 3 · official 2023/07 URL", url: cdn + "Ramset-SARB-ANZ-Ed.3-TruBolt-Xtrem-STUD-ANCHORS.pdf", pages: "Printed 274–275 · PDF 2–3", page: 2, product: "https://ramset.com.au/product/trubolt-xtrem/", eta: cdn + "TRUBOLT-XTREM_ZnSS.ETA_21_0973_UK.pdf", assessment: "ETA-21/0973 · check the supplied variant" },
    screw: { id: "CA-RAM-SCREW", title: "SARB ANZ Edition 3 · AnkaScrew Xtrem", revision: "Edition 3 · official 2023/07 URL", url: cdn + "Ramset-SARB-ANZ-Ed.3-AnkaScrew-Xtrem-SCREW-IN-ANCHORS.pdf", pages: "Printed 290–291 · PDF 2–3", page: 2, product: "https://ramset.com.au/product/ankascrew-xtrem/", eta: cdn + "Ramset_ETA_Ramset-AnkaScrew-Xtrem-ETA-20-0731-en.pdf", assessment: "ETA-20/0731 · Annex B3; verify head / connection-thread variant" },
    hst3: { id: "CA-HIL-HST3", title: "Hilti Australia · Anchor Fastening Technology Manual", revision: "FTM 2023 · dated reference", url: "https://www.hilti.com.au/content/dam/documents/a2/au/miscellaneous/FTM%202023_0423_g_en%202.pdf", pages: "PDF 502–504 · HST3 setting information", page: 502, product: "https://www.hilti.com.au/c/CLS_FASTENER_7135/CLS_MECHANICAL_ANCHORS_7135/r3987939", eta: null, assessment: "Manual cites ETA-98/0001, issue 2021-05-04; current documents on AU product page" },
    chem101: { id: "CA-RAM-101-ETA", title: "ChemSet 101 PLUS / UltraFix PLUS · ETA-13/0681", revision: "3 April 2024", url: cdn + "ramset_C101J-C101C_ETA_UltraFix%E2%84%A2-PLUS-ChemSet%E2%84%A2-101-PLUS-2.pdf", pages: "PDF 10 · Annex B4", page: 10, product: "https://ramset.com.au/product/chemset-101-plus/", eta: cdn + "ramset_C101J-C101C_ETA_UltraFix%E2%84%A2-PLUS-ChemSet%E2%84%A2-101-PLUS-2.pdf", assessment: "ETA-13/0681 · 2024-04-03; minimum-depth profiles from Annex B4" },
    chem801: { id: "CA-RAM-801", title: "SARB ANZ Edition 3 · ChemSet 801 Xtrem XC2", revision: "Edition 3 · official 2023/07 URL", url: cdn + "Ramset-SARB-ANZ-Ed.3-Chemset-801-Xtrem-XC2-Injection-with-Anchor-Studs.pdf", pages: "Printed 166–168 · PDF 1–3; ETA Annex B3 for drill-depth equality", page: 2, product: "https://ramset.com.au/product/chemset-801-xtrem-xc%C2%B2/", eta: cdn + "Ramset_ETA_Chemset_801_ETA-180045.pdf", assessment: "ETA-18/0045 · 22 February 2018, Annex B3; dated linked assessment" },
    chem502: { id: "CA-RAM-502", title: "SARB ANZ 2026 · Reo 502 Xtrem", revision: "Official 2026/06 bundle; ETA 18 August 2026", url: "https://cdn.ramset.com.au/wp-content/uploads/2026/06/cb3704-ramset-sarb-excerpt-booklets-next-gen-reo502.pdf", pages: "PDF 11–12 · installation / Table 1b; ETA Annex B3", page: 11, product: "https://ramset.com.au/product/chemset-reo-502-xtrem/", eta: "https://cdn.ramset.com.au/wp-content/uploads/2026/09/ETA-25.0648-Ramset-ChemSet-Reo502Xtrem-Epcon-G5-Xtrem-Studs-08-2026.pdf", assessment: "ETA-25/0648 · 18 August 2026, Annex B3; Reo 502 Xtrem, not Reo 502 PLUS" }
  };
  const rows = [];
  function add(row) {
    rows.push(Object.freeze({ evidence: "Catalogue", sourceStatus: "Author checked", depthBasis: "Effective", ...row }));
  }
  // Fixed cracked-concrete profiles; minima carry their independent paired conditions.
  for (const [size, depth, drill, torque, base, edge, edgeSpacing, spacing, spacingEdge] of [
    [10,60,75,45,120,55,90,55,70], [12,70,90,60,140,60,145,60,100],
    [16,85,110,110,170,80,110,90,100], [20,100,130,160,200,100,130,100,120]
  ]) {
    for (const finish of size === 20 ? ["Zinc plated"] : ["Zinc plated", "A4 stainless"]) {
      const ss = finish === "A4 stainless";
      add({ id: `trubolt-${size}-${ss ? "a4" : "zn"}`, type: "mechanical", manufacturer: "Ramset", product: "TruBolt Xtrem", mechanism: "Expansion", size, sizeLabel: `M${size}`, finish, hole: size, depth, drillDepth: drill, drillNote: "Published depth", torque: size === 12 && ss ? 75 : torque, torqueBasis: "Setting", substrate: base, edge, edgeNote: `s ≥ ${edgeSpacing}`, spacing, spacingNote: `c ≥ ${size === 10 && ss ? 65 : spacingEdge}`, source: "trubolt", concrete: "Cracked", conditions: "Cracked-concrete Table 1b-1 profile. Each minimum has its own paired layout condition; the two minima are not automatically usable together. Check the exact length / fixture thickness and the supplied ETA designation. These are effective depths, not catalogue effective lengths Le." });
    }
  }
  // Selected depth-specific handbook profiles, not a blanket SKU installation schedule.
  for (const [size, depth, drill, base, minimum, reportedTorque, impact] of [
    [6,31,45,80,40,10,160], [6,44,60,90,40,10,160],
    [8,35,55,80,40,20,300], [8,52,75,105,50,20,300],
    [10,43,65,90,50,40,400], [10,68,95,136,50,40,400],
    [12,50,75,100,50,60,650], [12,80,110,160,70,60,650]
  ]) {
    add({ id: `screw-${size}-${depth}`, type: "mechanical", manufacturer: "Ramset", product: "AnkaScrew Xtrem", mechanism: "Screw", size, sizeLabel: `${size} mm`, finish: "Zinc plated", hole: size, depth, drillDepth: drill, drillNote: "Minimum", torque: null, torqueText: "See ETA", torqueBasis: "Variant dependent", substrate: base, edge: minimum, edgeNote: "SARB minimum", spacing: minimum, spacingNote: "SARB minimum", source: "screw", concrete: "Cracked / non-cracked", conditions: `SARB depth-specific installation profile. Install the correct head variant flush without over-tightening. SARB lists ${reportedTorque} Nm; ETA Annex B3 assigns that torque to versions with a connection thread, and separately lists a maximum impact-driver torque of ${impact} Nm. These are different quantities: select the tool and setting from the supplied installation instructions. Handbook substrate thickness is retained, rather than substituted from another ETA layout.` });
  }
  for (const [size, depth, drillExpr, torque, base, edge, edgeSpacing, spacing, spacingEdge] of [
    [8,47,"hₑf + 12",20,100,40,35,35,40],
    [10,60,"hₑf + 13",45,120,45,65,40,55],
    [12,70,"hₑf + 18",60,140,55,75,50,65],
    [16,85,"hₑf + 21",110,160,65,85,65,75]
  ]) {
    add({ id: `hst3-${size}-${depth}`, type: "mechanical", manufacturer: "Hilti", product: "HST3", mechanism: "Expansion", size, sizeLabel: `M${size}`, finish: "Zinc plated", hole: size, depth, drillDepth: drillExpr, drillNote: "Minimum · cleaned hole", torque, torqueBasis: "Setting", substrate: base, edge, edgeNote: `s ≥ ${edgeSpacing}`, spacing, spacingNote: `c ≥ ${spacingEdge}`, source: "hst3", concrete: "Cracked", conditions: "FTM 2023 static setting profile for EN concrete classes C20/25–C50/60 and the listed substrate thickness. Cleaned hammer-drilling expression shown; non-cleaned hammer holes and diamond drilling require the source's extra depth. Paired minima depend on this layout and thickness. Current assessment, exact supplied length and installation instructions must be checked on the AU product page; these are not Australian concrete-strength conversions." });
  }
  // Adopt newer ETA minimum-depth profiles for 101 rather than an incompatible old nominal row.
  for (const [size,hole,depth,torque,edge] of [[10,12,80,20,40],[12,14,96,40,50],[16,18,128,80,65],[20,22,160,150,80]]) {
    add({ id: `chem101-${size}-${depth}`, type: "chemical", manufacturer: "Ramset", product: "ChemSet 101 PLUS", mechanism: "Polyester + threaded rod", size, sizeLabel: `M${size}`, finish: "Rod-specific", hole, depth, drillDepth: depth, drillNote: "h₀ = hₑf", torque, torqueBasis: "Maximum", substrate: size <= 12 ? "hₑf + 30" : "hₑf + 2d₀", substrateNote: size <= 12 ? "At least 100" : "ETA expression", edge, edgeNote: "ETA minimum", spacing: edge, spacingNote: "ETA minimum", source: "chem101", concrete: "Non-cracked", profile: "Minimum-depth profile", conditions: "2024 ETA Annex B4 minimum-depth profile. The older SARB M16 125 mm row is below this ETA's 128 mm minimum and is not adopted. Torque is a maximum fixture torque after curing. Resin and base-material temperatures govern the ETA's curing schedule; use Annex B4, not the older handbook's nominal 20°C cure time. Check the exact rod grade and corrosion protection." });
  }
  for (const key of ["chem502", "chem801"]) {
    for (const [size,hole,depth,torque,base] of [[10,12,90,20,120],[12,14,110,30,140],[16,18,125,60,160],[20,25,150,120,190],[20,25,170,120,220]]) {
      const is502 = key === "chem502";
      const layout = is502 ? {10:[40,40],12:[40,50],16:[45,70],20:[55,85]} : {10:[45,50],12:[45,60],16:[50,75],20:[55,90]};
      add({ id: `${key}-${size}-${depth}`, type: "chemical", manufacturer: "Ramset", product: is502 ? "Reo 502 Xtrem" : "ChemSet 801 Xtrem XC2", mechanism: is502 ? "Epoxy + threaded rod" : "Vinylester + threaded rod", size, sizeLabel: `M${size}`, finish: "Rod-specific", hole, depth, drillDepth: depth, drillNote: "h₀ = hₑf · ETA", torque, torqueBasis: is502 ? "Maximum" : "Published", substrate: size <= 12 ? "hₑf + 30" : "hₑf + 2d₀", substrateNote: size <= 12 ? "At least 100" : "ETA expression", edge: layout[size][0], edgeNote: "Minimum", spacing: layout[size][1], spacingNote: "Minimum", source: key, concrete: "Cracked / non-cracked", conditions: is502 ? "SARB 2026 fixed anchor-stud profile; ETA-25/0648 Annex B3 confirms drill-depth equality, hole, torque and minimum layout. The ETA substrate expression is retained: the SARB 160 mm M16 and 190 mm shallow-M20 substrate values are not substituted for it. Fixture torque is applied after full cure. Cure depends on substrate temperature and dry/wet/flooded conditions; see the current ETA. This is Reo 502 Xtrem, not Reo 502 PLUS. Source optimum geometry and load reductions are not reproduced as minima." : "SARB anchor-stud profile with ETA-18/0045 Annex B3 drill-depth equality. The ETA substrate expression is retained: the SARB 160 mm M16 and 190 mm shallow-M20 values are not substituted for it. Cure depends on substrate temperature and dry/wet conditions. Flooded-hole maximum embedment is limited to 12d in the linked source; no flooded-hole resistance is evaluated here. Verify rod grade, exact product/assessment revision and installation instructions. Optimum load-table layouts are not minimum spacing." });
    }
  }
  // AU listing evidence only: these families do not inherit another product's parameters.
  const coverageGaps = Object.freeze([
    {label:"Ramset · TruBolt Xtrem M8 / ordering variants", url:"https://ramset.com.au/product/trubolt-xtrem/", scope:"AU page lists M8; the selected installation profiles omit it and do not map ordering codes"},
    {label:"Ramset · DynaBolt Plus / additional mechanical ranges", url:"https://ramset.com.au/product/dynabolt-plus-sleeve-anchor/", scope:"Sleeve anchors; no installation profiles yet"},
    {label:"Hilti · HST4", url:"https://www.hilti.com.au/c/CLS_FASTENER_7135/CLS_MECHANICAL_ANCHORS_7135/r18476739", scope:"Current AU wedge-anchor family; HST3 values do not apply"},
    {label:"Hilti · HUS4-H", url:"https://www.hilti.com.au/c/CLS_FASTENER_7135/CLS_MECHANICAL_ANCHORS_7135/r12910874", scope:"Concrete screws; head / finish variants require separate records"},
    {label:"Hilti · HIT-HY 200-R V3 / HIT-RE 500 V4", url:"https://www.hilti.com.au/c/CLS_FASTENER_7135/CLS_CHEMICAL_ANCHORS_7135", scope:"Chemical systems; resin, rod and installation configuration required"},
    {label:"ICCONS · Thunderbolt PRO", url:"https://www.iccons.com.au/products/thunderbolt-pro-hex-head", scope:"AU screw-anchor range; installation parameters not yet included"},
    {label:"Sika · AnchorFix 3001 / 3030", url:"https://aus.sika.com/en/construction/grouts-anchoring/chemical-anchoring.html", scope:"AU chemical range; exact rod / assessment profile required"}
  ]);
  const api = Object.freeze({ publicationClass: "Public", checkedDate: "2026-10-09", sources: Object.freeze(sources), rows: Object.freeze(rows), coverageGaps });
  root.ConcreteAnchorData = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
