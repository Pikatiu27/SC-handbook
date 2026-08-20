const $ = id => document.getElementById(id);

function makeRows(providerKey, provider, rows, common) {
  return rows.map(row => ({ providerKey, provider, ...common, ...row }));
}

const freyssinetBars = makeRows("freyssinet", "Freyssinet", [
  [26.5, 552, 461, 568], [32, 804, 672, 828], [36, 1018, 850, 1048],
  [40, 1257, 1049, 1295], [50, 1964, 1640, 2022]
].map(([diameter, area, yieldLoad, ultimateLoad]) => ({
  id: `frey-bar-${String(diameter).replace(".", "-")}`,
  name: `Freyssibar ${diameter} mm`,
  tendon: `${diameter} mm threaded bar; ${area.toLocaleString("en-AU")} mm²`,
  yieldLoad,
  ultimateLoad
})), {
  formGroup: "bar",
  type: "Prestressed bar",
  loadLabels: { yield: "Published yield load", ultimate: "Published ultimate load" },
  configuration: "Temporary, semi-permanent or permanent Freyssibar ground-anchor assembly",
  standard: "Freyssibar system · ETA-09/0169 referenced by the current manufacturer page",
  protection: "Temporary and permanent anchor systems",
  hardware: "Nut, plate, coupler, protective cap and trumpet",
  sourceKind: "archived-global-row",
  source: "Freyssinet anchoring systems brochure, C IX 0 - 01/14, p.10",
  sourceNote: "Official 2014 global tendon table; confirm current Australian supply.",
  summary: "Prestressed bar tendon for active foundation anchoring."
});

const freyssinetStrands = makeRows("freyssinet", "Freyssinet", [
  [2, 300, 492, 558], [3, 450, 738, 837], [4, 600, 984, 1116],
  [5, 750, 1230, 1395], [6, 900, 1476, 1674], [7, 1050, 1722, 1953],
  [8, 1200, 1968, 2232], [9, 1350, 2214, 2511], [10, 1500, 2460, 2790],
  [11, 1650, 2706, 3069], [12, 1800, 2952, 3348], [13, 1950, 3198, 3627]
].map(([count, area, yieldLoad, ultimateLoad]) => ({
  id: `frey-strand-${count}`,
  name: `${count}T15.7 strand anchor`,
  tendon: `${count} × 15.7 mm strands; ${area.toLocaleString("en-AU")} mm²`,
  yieldLoad,
  ultimateLoad
})), {
  formGroup: "strand",
  type: "Multi-strand anchor",
  loadLabels: { yield: "Characteristic 0.1% proof force · Fp0.1k", ultimate: "Characteristic maximum force · Fpk" },
  configuration: "A0/A1/A2 or B0/B1/B2 strand ground-anchor system",
  standard: "EN 1537 protection classes · manufacturer tendon table C IX 0 - 01/14",
  protection: "Permanent sheathed systems available",
  hardware: "Multi-hole head, bearing plate and corrosion-protection assembly",
  sourceKind: "archived-global-row",
  source: "Freyssinet anchoring systems brochure, C IX 0 - 01/14, p.8",
  sourceNote: "Official 2014 global tendon table; service limits depend on the adopted project standard.",
  summary: "Multi-strand tendon for active foundation anchoring."
});

const freyssinetFamilyRows = [
  {
    providerKey: "freyssinet", provider: "Freyssinet", id: "frey-permanent-bar", name: "Permanent Freyssibar anchor",
    formGroup: "bar", type: "Permanent prestressed bar anchor", tendon: "Freyssibar tendon; select the certified project bar size",
    configuration: "Permanent bar anchor with protected head, free length and bonded length",
    standard: "Freyssibar system · ETA-09/0169 · project execution standard to confirm",
    protection: "Permanent corrosion-protection assembly with protected head and sheathed free length",
    hardware: "Bar, nut, bearing plate, trumpet, sheath, spacers and protective cap",
    sourceKind: "global-family", source: "Freyssinet Permanent Freyssibar Anchor technical-data pathway",
    sourceUrl: "https://www.freyssinet.com/solution/build/anchoring-systems-for-geotechnics/geotechnics-solutions/",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Current manufacturer system family; obtain the project tendon, assembly and load schedule.",
    summary: "Permanent Freyssibar ground-anchor system family."
  },
  {
    providerKey: "freyssinet", provider: "Freyssinet", id: "frey-strand-a2", name: "Permanent strand anchor · Type A2",
    formGroup: "strand", type: "Permanent multi-strand anchor", tendon: "2 to 13 × 15.7 mm strands in the published range; larger systems on request",
    configuration: "A2 permanent strand anchor with gravity or global reinjection pathway",
    standard: "EN 1537 protection class · manufacturer technical-data pathway",
    publishedGeometry: "Individually greased and sheathed free length within a corrugated plastic sheath",
    protection: "A2 permanent protection with corrugated plastic sheath",
    hardware: "Multi-hole head, bearing plate, wedges, sheath, spacers and grout tubes",
    sourceKind: "global-family", source: "Freyssinet Permanent strand anchor Type A2 technical-data pathway",
    sourceUrl: "https://www.freyssinet.com/solution/build/anchoring-systems-for-geotechnics/geotechnics-solutions/",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Current manufacturer system family; obtain the selected tendon and project schedule.",
    summary: "Permanent A2 strand ground-anchor system family."
  },
  {
    providerKey: "freyssinet", provider: "Freyssinet", id: "frey-strand-b2", name: "Permanent strand anchor · Type B2",
    formGroup: "strand", type: "Permanent multi-strand anchor", tendon: "2 to 13 × 15.7 mm strands in the published range; larger systems on request",
    configuration: "B2 permanent strand anchor with selective reinjection pathway",
    standard: "EN 1537 protection class · manufacturer technical-data pathway",
    publishedGeometry: "Individually greased and sheathed free length; protected tendon within a metal tube",
    protection: "B2 permanent protection with metal tube",
    hardware: "Multi-hole head, bearing plate, wedges, metal tube, spacers and reinjection tubes",
    sourceKind: "global-family", source: "Freyssinet Permanent strand anchor Type B2 technical-data pathway",
    sourceUrl: "https://www.freyssinet.com/solution/build/anchoring-systems-for-geotechnics/geotechnics-solutions/",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Current manufacturer system family; obtain the selected tendon and project schedule.",
    summary: "Permanent B2 strand ground-anchor system family."
  }
];

const dywidagRows = makeRows("dywidag", "DYWIDAG", [
  [26, 548, 567], [32, 806, 834], [36, 1019, 1054], [46, 1665, 1721],
  [57, 2632, 2722], [65, 3329, 3443], [75, 4419, 4571]
].map(([diameter, area, ultimateLoad]) => ({
  id: `dywidag-${diameter}`,
  name: `Grade 150 Threadbar ${diameter} mm`,
  tendon: `${diameter} mm Grade 150 bar; ${area.toLocaleString("en-AU")} mm²`,
  yieldLoad: null,
  ultimateLoad
})), {
  formGroup: "bar",
  type: "Prestressing threadbar",
  loadLabels: { yield: "Published yield / proof load", ultimate: "Minimum ultimate tensile load" },
  configuration: "Grade 150 threadbar tendon; complete ground-anchor assembly required",
  standard: "ASTM A722 Grade 150 · United States product row",
  protection: "Project ground-anchor protection system required",
  hardware: "Anchor nut, washer, coupler and wedge washer",
  sourceKind: "us-row",
  source: "DYWIDAG PT Threadbar Technical Specification, October 2024, ASTM A722",
  sourceNote: "Official US tendon row; confirm Australian grade, assembly and availability.",
  summary: "Prestressing threadbar requiring a project ground-anchor assembly."
});

const dywidagFamilyRows = [
  {
    providerKey: "dywidag", provider: "DYWIDAG", id: "dywidag-threadbar-system", name: "DYWIDAG Threadbar Anchor System",
    formGroup: "bar", type: "Prestressed bar anchor system", tendon: "Europe/Asia 950/1050 MPa threadbar; North American Grade 150 pathway",
    configuration: "Coupled bar system with debonded free length and configurable anchor head",
    standard: "Regional steel grade and project execution standard to confirm",
    publishedGeometry: "Typical bar sections 6 to 12 m; longer tendons assembled with couplers",
    protection: "Factory pre-grouted double corrosion protection available for permanent works",
    hardware: "Threadbar, nut, bearing plate, couplers, spacers and grouting tubes",
    sourceKind: "global-family", source: "DYWIDAG Threadbar Anchor System product page",
    sourceUrl: "https://dywidag.com/products/ground-anchors/threadbar-anchor-system",
    sourceRegion: "Global manufacturer",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Current system family; obtain the regional product, tendon and load schedule.",
    summary: "Configurable prestressed threadbar ground-anchor system."
  },
  {
    providerKey: "dywidag", provider: "DYWIDAG", id: "dywidag-strand-system", name: "DYWIDAG Strand Anchor System",
    formGroup: "strand", type: "Multi-strand anchor", tendon: "15.2 or 15.7 mm strand; 1 to 22+ strands for Europe/Asia/Latin America",
    configuration: "Single-section coiled strand tendon with configurable permanent head",
    standard: "Regional strand and execution standard to confirm",
    publishedGeometry: "Published system length up to 90 m+",
    protection: "Double corrosion protection available for permanent systems",
    hardware: "Multi-strand head, bearing plate, spacers, tremie and post-grouting tubes",
    sourceKind: "global-family", source: "DYWIDAG Strand Anchor System product page",
    sourceUrl: "https://dywidag.com/products/ground-anchors/strand-anchor-system",
    sourceRegion: "Global manufacturer",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Current system family; obtain the regional strand, head and load schedule.",
    summary: "Flexible multi-strand ground-anchor system for higher loads or restricted access."
  },
  {
    providerKey: "dywidag", provider: "DYWIDAG", id: "dywidag-twin-corr", name: "DYWIDAG Twin-Corr Strand Anchor",
    formGroup: "strand", type: "Permanent multi-strand anchor", tendon: "15.2 or 15.7 mm strand; regional strand count to confirm",
    configuration: "Twin concentric sheathing in the bonded length with individually protected free-length strands",
    standard: "Regional permanent-anchor corrosion-protection requirements to confirm",
    publishedGeometry: "1 to 22+ strands for Europe/Asia/Latin America",
    protection: "Full DCP; Twin-Core designation in Europe",
    hardware: "Permanent strand head, bearing plate, twin sheaths, spacers and grouting tubes",
    sourceKind: "global-family", source: "DYWIDAG Twin-Corr Strand Anchor product page",
    sourceUrl: "https://dywidag.com/products/ground-anchors/twin-corr-strand-anchor",
    sourceRegion: "Global manufacturer",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Current system family; confirm the project protection class and tendon schedule.",
    summary: "Double-corrosion-protected strand anchor for demanding permanent environments."
  },
  {
    providerKey: "dywidag", provider: "DYWIDAG", id: "dywidag-multi-stage", name: "DYWIDAG Multi-Stage Strand Anchor",
    formGroup: "strand", type: "Multi-stage strand anchor", tendon: "15.2 or 15.7 mm strand; regional strand count to confirm",
    configuration: "Multiple bonded lengths at different borehole levels with synchronized stressing",
    standard: "Project ground model, stressing procedure and regional execution standard required",
    publishedGeometry: "Individual bonded zones typically 3 to 5 m; collective fixed length is project-defined",
    protection: "Temporary, semi-permanent and permanent configurations available",
    hardware: "Staged tendons, multi-head stressing arrangement, spacers and grouting tubes",
    sourceKind: "global-family", source: "DYWIDAG Multi-Stage Strand Anchor System product page",
    sourceUrl: "https://dywidag.com/products/ground-anchors/multi-stage-strand-anchor-system",
    sourceRegion: "Global manufacturer",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Specialist system family; obtain a project-specific bonded-zone and stressing schedule.",
    summary: "Multi-stage system for improved load distribution in weak ground."
  },
  {
    providerKey: "dywidag", provider: "DYWIDAG", id: "dywidag-el-iso", name: "DYWIDAG El-Iso Strand Anchor",
    formGroup: "strand", type: "Electrically isolated permanent strand anchor", tendon: "15.2 or 15.7 mm strand; regional strand count to confirm",
    configuration: "Permanent strand anchor with isolation components at the anchor head",
    standard: "Project electrical-integrity verification method and regional execution standard required",
    publishedGeometry: "1 to 22+ strands for Europe/Asia/Latin America",
    protection: "Double corrosion protection with electrically isolated head components",
    hardware: "Permanent strand head, isolation sleeves and washers, bearing plate and protected tendon",
    sourceKind: "global-family", source: "DYWIDAG El-Iso Strand Anchor product page",
    sourceUrl: "https://dywidag.com/products/ground-anchors/el-iso-strand-anchor",
    sourceRegion: "Global manufacturer",
    sourceChecked: "12 Aug 2026",
    sourceNote: "Specialist system family; electrical-resistance readings require a project-defined acceptance method.",
    summary: "Permanent strand anchor with an electrically testable corrosion-protection pathway."
  }
];

const sasRows = makeRows("sas", "SAS Stressteel", [
  [18, 241, 230, 255], [26.5, 551, 525, 580], [32, 804, 760, 845],
  [36, 1020, 960, 1070], [40, 1257, 1190, 1320], [47, 1735, 1650, 1820],
  [57, 2581, 2155, 2671], [65, 3331, 2780, 3447], [75, 4418, 3690, 4572]
].map(([diameter, area, yieldLoad, ultimateLoad]) => ({
  id: `sas-${String(diameter).replace(".", "-")}`,
  name: `SAS ${diameter <= 47 ? "950/1050" : "835/1035"} ${diameter} mm`,
  tendon: `${diameter} mm threadbar; ${area.toLocaleString("en-AU")} mm²`,
  yieldLoad: diameter === 65 ? null : yieldLoad,
  yieldConflict: diameter === 65 ? [2780, 2790] : null,
  ultimateLoad,
  sourceNote: diameter === 65
    ? "The product table gives 2,780 kN yield load while a design-forces table gives 2,790 kN; confirm the adopted value with SAS."
    : "Current manufacturer tendon row; confirm Australian ground-anchor applicability and supply."
})), {
  formGroup: "bar",
  type: "Prestressing threadbar",
  loadLabels: { yield: "Characteristic 0.1% proof force · Fp0.1k", ultimate: "Characteristic maximum force · Fpk" },
  configuration: "Post-tensioning bar tendon; complete ground-anchor assembly required",
  standard: "ETA-05/0122 system reference · manufacturer Eurocode 2 / Eurocode 7 guide",
  protection: "Project-specific corrosion-protection system required",
  hardware: "Dome or anchor nut, plate, coupler and stressing anchorage",
  sourceKind: "current-external-row",
  source: "SAS post-tensioning system design guide, January 2026",
  sourceNote: "Current manufacturer tendon row; confirm Australian ground-anchor applicability and supply.",
  summary: "Prestressing threadbar requiring project ground-anchor detailing."
});

const williamsRows = makeRows("williams", "Williams Form Engineering", [
  [25, 324, 404, 51, "B16", "R7S08B16"],
  [32, 517, 647, 64, "B20", "R7S10B20"],
  [38, 750, 937, 76, "B24", "R7S12B24"],
  [48, 1286, 1608, 89, "C28", "R7S15C28"]
].map(([diameter, yieldLoad, ultimateLoad, drillHole, head, productCode]) => ({
  id: `williams-spinlock-${diameter}`,
  name: `R7S Spin-Lock ${diameter} mm`,
  tendon: `${diameter} mm Grade 150 KSI Spin-Lock bar`,
  yieldLoad,
  ultimateLoad,
  publishedGeometry: `${drillHole} mm drill hole · ${head} head · ${productCode}`
})), {
  formGroup: "bar",
  type: "Mechanical prestressed rock anchor",
  loadLabels: { yield: "Published yield force · fy", ultimate: "Published ultimate force · fu" },
  configuration: "Mechanical expansion shell; prestress and subsequently grout",
  standard: "ASTM A722 · Williams R7S 150 KSI system",
  protection: "Prestress-and-grout system; project corrosion protection required",
  hardware: "Expansion shell, hollow bar, bearing plate and anchor nut",
  sourceKind: "current-williams-row",
  source: "Williams Ground Engineering Systems, R7S Spin-Lock Rock Anchor table, 2025",
  sourceUrl: "https://www.williamsform.com/rock/spin-lock-anchors/r7s-spin-lock-rock-bolt/",
  sourceRegion: "United States",
  sourceChecked: "11 Aug 2026",
  sourceNote: "Official manufacturer row; confirm Australian acceptance, supply and project corrosion protection.",
  summary: "Mechanical rock-anchor system that can be prestressed and subsequently grouted."
});

const williamsFamilyRows = [
  {
    providerKey: "williams", provider: "Williams Form Engineering", id: "williams-mcp-i", name: "Williams MCP I",
    formGroup: "bar", type: "Grout-bonded prestressed bar anchor", tendon: "Grade 150 KSI All-Thread Bar; 26 to 75 mm system range",
    configuration: "MCP I grout-bonded bar system with protected free-stressing zone",
    standard: "ASTM A722 tendon · PTI Class II manufacturer configuration",
    protection: "PTI Class II; two barriers in free-stressing zone", hardware: "Bar, sleeves, centralizers, plate, nut and protective cap",
    sourceKind: "global-family", source: "Williams Multiple Corrosion Protection Anchors product page",
    sourceUrl: "https://www.williamsform.com/rock/grout-bonded-anchors/",
    sourceNote: "Official system family; obtain the project tendon, load and drill-hole schedule.",
    summary: "MCP I grout-bonded bar anchor with Class II corrosion protection."
  },
  {
    providerKey: "williams", provider: "Williams Form Engineering", id: "williams-mcp-ii", name: "Williams MCP II",
    formGroup: "bar", type: "Grout-bonded prestressed bar anchor", tendon: "Grade 150 KSI All-Thread Bar; 26 to 75 mm system range",
    configuration: "MCP II pre-grouted corrugated-tube bar system",
    standard: "ASTM A722 tendon · PTI Class I manufacturer configuration",
    protection: "PTI Class I; two barriers around the bar full length", hardware: "Pre-grouted corrugated tube, sleeve, centralizers, plate and nut",
    sourceKind: "global-family", source: "Williams Multiple Corrosion Protection Anchors product page",
    sourceUrl: "https://www.williamsform.com/rock/grout-bonded-anchors/",
    sourceNote: "Official system family; obtain the project tendon, load and drill-hole schedule.",
    summary: "MCP II grout-bonded bar anchor with Class I corrosion protection."
  },
  {
    providerKey: "williams", provider: "Williams Form Engineering", id: "williams-mcp-iii", name: "Williams MCP III",
    formGroup: "bar", type: "Grout-bonded prestressed bar anchor", tendon: "Grade 150 KSI All-Thread Bar; 26 to 75 mm system range",
    configuration: "MCP III enhanced pre-grouted corrugated-tube bar system",
    standard: "ASTM A722 tendon · PTI Class I manufacturer configuration",
    protection: "PTI Class I; three free-zone barriers and two bond-zone barriers", hardware: "Pre-grouted corrugated tube, sleeve, trumpet, plate, nut and cap",
    sourceKind: "global-family", source: "Williams Multiple Corrosion Protection Anchors product page",
    sourceUrl: "https://www.williamsform.com/rock/grout-bonded-anchors/",
    sourceNote: "Official system family; obtain the project tendon, load and drill-hole schedule.",
    summary: "MCP III grout-bonded bar anchor with enhanced Class I corrosion protection."
  },
  {
    providerKey: "williams", provider: "Williams Form Engineering", id: "williams-strand", name: "Williams multi-strand ground anchor",
    formGroup: "strand", type: "Multi-strand anchor", tendon: "270 KSI low-relaxation strand; project strand count",
    configuration: "Project-configured multi-strand free and bonded tendon zones",
    standard: "ASTM A416 strand pathway · PTI Class I or II project configuration",
    protection: "PTI Class I or Class II project configuration", hardware: "Multi-strand head, bearing plate, free zone and bonded tendon zone",
    sourceKind: "global-family", source: "Williams Tieback & Tiedown Anchors product page",
    sourceUrl: "https://www.williamsform.com/rock/strand-anchors/",
    sourceNote: "Official prestressed ground-anchor family; obtain the current project strand and load schedule.",
    summary: "Project-configured multi-strand prestressed ground-anchor system."
  }
];

const bbrRows = makeRows("bbr", "BBR", [
  [2, 492, 558], [3, 738, 837], [4, 984, 1116], [5, 1230, 1395],
  [6, 1476, 1674], [7, 1722, 1953], [8, 1968, 2232], [9, 2214, 2511],
  [12, 2952, 3348], [13, 3198, 3627], [15, 3690, 4185], [16, 3936, 4464],
  [19, 4674, 5301], [22, 5412, 6138]
].map(([count, proofLoad, maximumLoad]) => {
  const productCode = `${String(count).padStart(2, "0")}06`;
  return {
    id: `bbr-cona-${productCode}`,
    name: `BBR CONA CMG ${productCode} · ${count} × 15.7 mm`,
    selectorLabel: `CONA CMG ${productCode} · ${count}T15.7`,
    tendon: `${count} × 15.7 mm Y1860S7 strands; ${(count * 150).toLocaleString("en-AU")} mm²`,
    yieldLoad: proofLoad,
    ultimateLoad: maximumLoad,
    publishedGeometry: `System size ${productCode} · ${count} strand positions`
  };
}), {
  formGroup: "strand",
  type: "ETA-assessed multi-strand ground anchor",
  loadLabels: { yield: "Characteristic 0.1% proof force · Fp0.1k", ultimate: "Characteristic maximum force · Fpk" },
  configuration: "BBR VT CONA CMG strand ground-anchor kit",
  standard: "ETA-21/1053 · EAD 160071-00-0102 · Y1860S7-15.7 strand",
  protection: "Protection Level 1, 2 or 3 kit; select the project configuration",
  hardware: "CONA CMG stressing head, bearing plate, protected free length and bonded tendon zone",
  sourceKind: "eta-row",
  source: "BBR VT CONA CMG technical brochure, Rev 3 · 06/2021",
  sourceUrl: "https://www.bbrnetwork.com/fileadmin/userdaten/Broschueren/GT/BBR_VT_CONA_CMG_EN_Rev3_0621.pdf",
  sourceRegion: "European ETA / global manufacturer",
  sourceChecked: "12 Aug 2026",
  sourceNote: "Official 15.7 mm Y1860S7 tendon row; confirm the current kit, Australian specialist certification and supply.",
  summary: "ETA-assessed BBR strand ground-anchor product row."
});

const familyRows = [
  {
    providerKey: "vsl", provider: "VSL", id: "vsl-strand", name: "VSL strand ground anchor",
    formGroup: "strand", type: "Multi-strand anchor", tendon: "1 to 12 strands; larger systems on request",
    configuration: "Single-section strand tendon with static or retensionable permanent-head options",
    standard: "EN 1537, PTI and applicable local standards",
    publishedGeometry: "Published installation length up to 100 m",
    protection: "SCP or DCP; permanent systems available", hardware: "Static or retensionable head; custom configurations",
    sourceKind: "global-family", source: "VSL Ground Anchors public system page",
    sourceNote: "System family verified; obtain the current product and load schedule.",
    summary: "Configurable strand ground-anchor family."
  },
  {
    providerKey: "vsl", provider: "VSL", id: "vsl-bar", name: "VSL bar ground anchor",
    formGroup: "bar", type: "Prestressed bar", tendon: "Threaded bars up to 75 mm",
    configuration: "Coupled threaded-bar anchor with protected free and bonded lengths",
    standard: "EN 1537, PTI and applicable local standards",
    publishedGeometry: "Threaded bars up to 75 mm; unlimited tendon length with couplers",
    protection: "DCP standard for permanent applications", hardware: "Bearing plate and configurable permanent head",
    sourceKind: "global-family", source: "VSL Ground Anchors public system page",
    sourceNote: "System family verified; obtain a row-level product and load schedule.",
    summary: "Configurable bar ground-anchor family."
  },
  {
    providerKey: "bbr", provider: "BBR", id: "bbr-cona", name: "BBR VT CONA CMG",
    formGroup: "strand", type: "Multi-strand anchor", tendon: "2 to 22 prestressing strands",
    configuration: "CONA CMG family; select a published product row and protection kit",
    standard: "ETA-21/1053 · EAD 160071-00-0102",
    publishedGeometry: "2 to 22 strands in the ETA family",
    protection: "Temporary or permanent configurations", hardware: "ETA-assessed strand ground-anchor assembly",
    sourceKind: "global-family", source: "BBR VT CONA CMG; ETA 21/1053",
    sourceNote: "ETA scope verified; confirm Australian acceptance and the current load schedule.",
    summary: "ETA-assessed strand ground-anchor family."
  },
  {
    providerKey: "keller", provider: "Keller Australia", id: "keller-bar", name: "Keller bar ground anchor",
    formGroup: "project", type: "Australian project pathway", tendon: "High-strength threaded bar; project schedule",
    configuration: "Project-designed bar anchor with defined free and bond lengths",
    standard: "Project specification and certified product schedule",
    protection: "Temporary or permanent project configuration", hardware: "Anchor head, free length, bond length and grout system",
    sourceKind: "au-pathway", source: "Keller Australia Anchors technique page",
    sourceNote: "Australian delivery pathway; obtain the certified project product schedule.",
    summary: "Australian bar-anchor delivery pathway."
  },
  {
    providerKey: "keller", provider: "Keller Australia", id: "keller-strand", name: "Keller strand / SBMA anchor",
    formGroup: "project", type: "Australian project pathway", tendon: "Strand tendon or multiple bond zones; project schedule",
    configuration: "Project-designed single or multiple bond-zone strand anchor",
    standard: "Project specification and certified product schedule",
    protection: "Temporary or permanent project configuration", hardware: "Stressed head, free length and single or multiple bond zones",
    sourceKind: "au-pathway", source: "Keller Australia Anchors technique page",
    sourceNote: "Australian delivery pathway; obtain the certified project product schedule.",
    summary: "Australian high-capacity strand or SBMA delivery pathway."
  },
  {
    providerKey: "srg", provider: "SRG Global", id: "srg-strand", name: "SRG high-capacity strand anchor",
    formGroup: "project", type: "Australian project pathway", tendon: "Project-fabricated multi-strand tendon",
    configuration: "Project-designed high-capacity permanent strand anchor",
    standard: "Project specification and certified BBR / SRG system schedule",
    protection: "Permanent corrosion protection and monitoring options", hardware: "Project head, load cell and stressing assembly",
    sourceKind: "au-pathway", source: "SRG Global Dam Anchoring and Monitoring capability",
    sourceNote: "Australian project-delivery capability; use the certified project schedule.",
    summary: "Project-designed high-capacity permanent anchor pathway."
  },
  {
    providerKey: "srg", provider: "SRG Global", id: "srg-bar", name: "SRG stress-bar / ground-anchor pathway",
    formGroup: "project", type: "Australian project pathway", tendon: "Stress bar system; project schedule",
    configuration: "Project-defined stress-bar ground-anchor system",
    standard: "Project specification and certified combined system schedule",
    protection: "Project corrosion-protection configuration", hardware: "Project nut, plate, coupler and stressing assembly",
    sourceKind: "au-pathway", source: "SRG Global Engineered Products capability",
    sourceNote: "Stress-bar and ground-anchor capabilities are listed separately; obtain a certified combined system schedule.",
    summary: "Project-engineered bar pathway requiring a defined ground-anchor system."
  },
  {
    providerKey: "srg", provider: "SRG Global", id: "srg-bbr-h-bar", name: "BBR H Bar ground-anchor pathway",
    formGroup: "project", type: "Australian provider pathway", tendon: "16 to 75 mm hot-rolled threaded bar; grade selected by project schedule",
    configuration: "BBR H Bar temporary or permanent ground-anchor assembly",
    standard: "BBR H Bar system; current Australian specialist certification to confirm",
    publishedGeometry: "16 to 75 mm bar range; standard factory lengths with couplers",
    protection: "Project-selected temporary, permanent or H DCP configuration",
    hardware: "H Bar, nut, bearing plate, coupler and project corrosion-protection assembly",
    sourceKind: "au-pathway", source: "BBR H Bar system and SRG Global Australian specialist pathway",
    sourceUrl: "https://www.bbrnetwork.com/technologies/threaded-bars/h-bar/",
    australiaUrl: "https://www.srgglobal.com.au/wp-content/uploads/2020/07/srgg_products_capability_2020-07_e.pdf",
    australiaLinkLabel: "Open Australian capability",
    sourceChecked: "12 Aug 2026",
    sourceNote: "SRG Global is the identified Australian pathway; obtain current BBR specialist certification and the certified product schedule.",
    summary: "Australian pathway for the BBR H Bar ground-anchor system."
  }
];

const projectRow = {
  providerKey: "custom", provider: "Custom / project", id: "custom", name: "Project-specific anchor",
  formGroup: "project", type: "Project-defined", tendon: "Defined by the project product schedule",
  configuration: "Defined by the project product schedule", standard: "Project design basis and product certification",
  yieldLoad: null, ultimateLoad: null, protection: "Project specification", hardware: "Project detail",
  sourceKind: "project", source: "Project product schedule and certificate",
  sourceNote: "No manufacturer value is embedded.",
  summary: "Use for a certified project product not listed in the selector."
};

const products = [
  ...freyssinetBars, ...freyssinetStrands, ...freyssinetFamilyRows,
  ...dywidagRows, ...dywidagFamilyRows,
  ...sasRows, ...williamsRows, ...williamsFamilyRows,
  ...bbrRows, ...familyRows, projectRow
];
let selectedProductId = "frey-bar-32";

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sourceMeta(product) {
  const map = {
    "archived-global-row": { label: "Manufacturer row · Jan 2014 · archived", className: "status-external" },
    "current-external-row": { label: "Manufacturer row · Jan 2026 · external", className: "status-external" },
    "current-williams-row": { label: "Manufacturer row · 2025 · external", className: "status-external" },
    "us-row": { label: "Manufacturer row · Oct 2024 · US", className: "status-us" },
    "eta-row": { label: "Manufacturer row · Jun 2021 · ETA system", className: "status-external" },
    "global-family": { label: "System family page · external", className: "status-family" },
    "au-pathway": { label: "Australian provider pathway", className: "status-au" },
    project: { label: "Project entry", className: "status-project" }
  };
  return map[product.sourceKind] || map.project;
}

function dataMeta(product) {
  if (Number.isFinite(product.ultimateLoad) || Number.isFinite(product.yieldLoad) || product.yieldConflict || product.ultimateConflict) {
    return { label: "Published product row", className: "status-row" };
  }
  if (product.sourceKind === "project") return { label: "Project-defined system", className: "status-project" };
  if (product.sourceKind === "au-pathway") return { label: "Provider pathway", className: "status-au" };
  return { label: "Ground-anchor system family", className: "status-family" };
}

function supplyMeta(product) {
  if (product.sourceKind === "project") return { label: "Project procurement route", className: "status-project" };
  if (product.sourceKind === "au-pathway") return { label: "Australian provider pathway", className: "status-au" };
  if (["freyssinet", "dywidag", "vsl"].includes(product.providerKey)) {
    return { label: "Australian provider identified · product confirmation required", className: "status-au" };
  }
  if (product.providerKey === "bbr") {
    return { label: "Australian route identified · current certification required", className: "status-us" };
  }
  return { label: "Australian supply confirmation required", className: "status-us" };
}

function sourceRecord(product) {
  const records = {
    freyssinet: {
      url: "https://www.freyssinet.com/wp-content/uploads/sites/1/2021/08/Brochure-Freyssinet-anchoring-systems-for-geotechnical-engineering-1.pdf",
      region: "Global",
      checked: "11 Aug 2026"
    },
    dywidag: {
      url: "https://assets.ctfassets.net/wz1xpzqb46pe/4i3VUcbjerya1EklUSmpwM/8e603f793e164b15063c8326529010c9/DYWIDAG_PT_Threadbar_Technical_Specification_Oct24_EN_Web.pdf",
      region: "United States",
      checked: "11 Aug 2026"
    },
    sas: {
      url: "https://www.annahuette.com/wp-content/uploads/jet-form-builder/d48dacaabeb4eeb673b4828b7de2b0d5/2026/02/SAS-pt-system_en_01-2026-_SAS-950-1050_SAS-835-1035-Vorspannsystem.pdf",
      region: "External manufacturer",
      checked: "11 Aug 2026"
    },
    williams: {
      url: "https://www.williamsform.com/rock/tieback-tiedown-anchors/",
      region: "United States",
      checked: "11 Aug 2026"
    },
    vsl: { url: "https://vsl.com/technology/ground-anchors/", region: "Global", checked: "11 Aug 2026" },
    bbr: { url: "https://www.bbrnetwork.com/fileadmin/userdaten/Zulassungen%20EU/CONA_CMG_ground/BBR_ETA-21-1053_CMG_EN_Rev1_1023-short.pdf", region: "European ETA", checked: "11 Aug 2026" },
    keller: { url: "https://www.keller.com.au/expertise/techniques/anchors", region: "Australia", checked: "11 Aug 2026" },
    srg: { url: "https://srgglobal.com.au/what-we-do/technology/dam-anchoring-and-monitoring/", region: "Australia", checked: "11 Aug 2026" },
    custom: { url: "", region: "Project-defined", checked: "Not applicable" }
  };
  const providerRecord = records[product.providerKey] || records.custom;
  return {
    url: product.sourceUrl ?? providerRecord.url,
    region: product.sourceRegion ?? providerRecord.region,
    checked: product.sourceChecked ?? providerRecord.checked
  };
}

function loadLabels(product) {
  if (product.loadLabels) return product.loadLabels;
  if (product.sourceKind === "us-row") {
    return { yield: "Published yield / proof load", ultimate: "Minimum ultimate tensile load" };
  }
  return { yield: "Published yield load", ultimate: "Published ultimate load" };
}

function productField(product, field, fallback = "Not published") {
  return product[field] || fallback;
}

function selectorName(product) {
  if (product.selectorLabel) return product.selectorLabel;
  const prefixes = {
    dywidag: "DYWIDAG ",
    williams: "Williams ",
    bbr: "BBR "
  };
  const prefix = prefixes[product.providerKey];
  return prefix && product.name.startsWith(prefix) ? product.name.slice(prefix.length) : product.name;
}

function australiaPathway(product) {
  if (product.sourceKind === "project") return "Project procurement route; certified product schedule required.";
  if (product.sourceKind === "au-pathway") {
    if (product.id === "srg-bbr-h-bar") {
      return "SRG Global pathway identified; current BBR specialist certification and product scope must be confirmed.";
    }
    return "Australian provider pathway identified; certified product schedule required.";
  }
  const pathways = {
    freyssinet: "Freyssinet Australia identified; exact product and current supply must be confirmed.",
    dywidag: "Australian contact and project-delivery pathway identified; exact product must be confirmed.",
    vsl: "VSL Australia identified; exact product and current supply must be confirmed.",
    bbr: "SRG Global pathway identified; current BBR specialist certification and product scope must be confirmed."
  };
  return pathways[product.providerKey] || "No verified Australian product route captured.";
}

function australiaRecord(product) {
  const records = {
    freyssinet: {
      url: "https://www.freyssinet.com/wp-content/uploads/2022/01/AUSTRALIA-Kangaroo-Creek-Dam-Upgrade-Anchoring-systems-for-geotechnics-Refsheet-Freyssinet.pdf",
      label: "Open Australian reference"
    },
    dywidag: { url: "https://dywidag.com/contact", label: "Open Australian contact" },
    vsl: { url: "https://vsl.com/australia", label: "Open VSL Australia" },
    bbr: {
      url: "https://www.srgglobal.com.au/wp-content/uploads/2020/07/srgg_products_capability_2020-07_e.pdf",
      label: "Open Australian capability"
    }
  };
  const providerRecord = records[product.providerKey] || { url: "", label: "" };
  return {
    url: product.australiaUrl ?? providerRecord.url,
    label: product.australiaLinkLabel ?? providerRecord.label
  };
}

function productGroup(product) {
  if (product.sourceKind === "project") return { key: "project", label: "Project schedule", order: 3 };
  if (product.sourceKind === "au-pathway") return { key: "provider", label: "Australian pathways", order: 2 };
  if (Number.isFinite(product.ultimateLoad) || Number.isFinite(product.yieldLoad) || product.yieldConflict || product.ultimateConflict) {
    return { key: "row", label: "Published products", order: 0 };
  }
  return { key: "family", label: "System families", order: 1 };
}

function loadDisplay(product, kind) {
  const value = product[`${kind}Load`];
  const conflict = product[`${kind}Conflict`];
  if (Array.isArray(conflict) && conflict.length > 1) {
    return {
      value: "Source conflict",
      unit: "",
      note: `Published values conflict (${conflict.map(item => item.toLocaleString("en-AU")).join(" / ")} kN); manufacturer confirmation required.`
    };
  }
  if (Number.isFinite(value)) {
    return {
      value: value.toLocaleString("en-AU"),
      unit: " kN",
      note: "Manufacturer tendon value; not anchor resistance."
    };
  }
  return {
    value: "Not published",
    unit: "",
    note: `No row-level ${kind} load is available in the captured source.`
  };
}

function productConstraint(product) {
  if (product.sourceKind === "project") return "Provide the certified product, resistance and execution schedule.";
  if (product.providerKey === "bbr") return "Confirm current Australian BBR specialist certification, exact system kit, project resistance and testing.";
  if (product.sourceKind === "au-pathway") return "Obtain the certified tendon, anchorage, resistance and test schedule.";
  if (product.sourceKind === "global-family") return "Obtain a row-level tendon and complete anchor schedule.";
  if (product.sourceKind === "us-row") return "Confirm Australian grade, assembly, corrosion protection and supply.";
  return "Confirm Australian supply, anchor assembly, design resistance, corrosion protection and testing.";
}

function selectedProduct() {
  return products.find(product => product.id === selectedProductId) || products[0];
}

function renderSelected() {
  const product = selectedProduct();
  const source = sourceMeta(product);
  const data = dataMeta(product);
  const supply = supplyMeta(product);
  const record = sourceRecord(product);
  const australianRecord = australiaRecord(product);
  const labels = loadLabels(product);
  const yieldDisplay = loadDisplay(product, "yield");
  const ultimateDisplay = loadDisplay(product, "ultimate");
  $("selectedName").textContent = product.name;
  $("selectedSummary").textContent = product.summary;
  $("dataStatus").textContent = data.label;
  $("dataStatus").className = `status-pill ${data.className}`;
  $("sourceStatus").textContent = source.label;
  $("sourceStatus").className = `status-pill ${source.className}`;
  $("supplyStatus").textContent = supply.label;
  $("supplyStatus").className = `status-pill ${supply.className}`;
  $("factYieldLabel").textContent = labels.yield;
  $("factUltimateLabel").textContent = labels.ultimate;
  $("factYieldLoad").textContent = yieldDisplay.value;
  $("factYieldUnit").textContent = yieldDisplay.unit;
  $("factUltimateLoad").textContent = ultimateDisplay.value;
  $("factUltimateUnit").textContent = ultimateDisplay.unit;
  $("factYieldNote").textContent = yieldDisplay.note;
  $("factUltimateNote").textContent = ultimateDisplay.note;
  $("factProvider").textContent = product.provider;
  $("factType").textContent = product.type;
  $("factTendon").textContent = product.tendon;
  $("factConfiguration").textContent = productField(product, "configuration");
  $("factStandard").textContent = productField(product, "standard");
  $("factPublishedGeometry").textContent = productField(product, "publishedGeometry");
  $("factAustraliaPathway").textContent = australiaPathway(product);
  $("factAustraliaLink").textContent = australianRecord.label;
  $("factAustraliaLink").hidden = !australianRecord.url;
  if (australianRecord.url) {
    $("factAustraliaLink").href = australianRecord.url;
  } else {
    $("factAustraliaLink").removeAttribute("href");
  }
  $("factProtection").textContent = product.protection;
  $("factHardware").textContent = product.hardware;
  $("factSource").textContent = product.source;
  $("factSourceNote").textContent = product.sourceNote || "Confirm current project applicability.";
  $("factSourceMeta").textContent = `${record.region} · checked ${record.checked}`;
  $("factSourceLink").textContent = record.url ? "Open source" : "Project source required";
  if (record.url) {
    $("factSourceLink").href = record.url;
    $("factSourceLink").removeAttribute("aria-disabled");
  } else {
    $("factSourceLink").removeAttribute("href");
    $("factSourceLink").setAttribute("aria-disabled", "true");
  }
  $("selectionConstraint").textContent = productConstraint(product);
}

function populateSupplierFilter() {
  const suppliers = [...new Map(products.map(product => [product.providerKey, product.provider])).entries()];
  $("supplierFilter").innerHTML = suppliers
    .map(([key, label]) => `<option value="${safeText(key)}">${safeText(label)}</option>`)
    .join("");
  $("supplierFilter").value = selectedProduct().providerKey;
}

function populateProductFilter() {
  const supplier = $("supplierFilter").value;
  const models = products
    .filter(product => product.providerKey === supplier)
    .sort((a, b) => {
      const groupOrder = productGroup(a).order - productGroup(b).order;
      return groupOrder || a.name.localeCompare(b.name, "en-AU", { numeric: true });
    });
  const selected = models.find(product => product.id === selectedProductId) || models[0];
  const groups = new Map();
  models.forEach(product => {
    const group = productGroup(product);
    if (!groups.has(group.key)) groups.set(group.key, { ...group, products: [] });
    groups.get(group.key).products.push(product);
  });
  $("productFilter").innerHTML = [...groups.values()]
    .sort((a, b) => a.order - b.order)
    .map(group => `<optgroup label="${safeText(group.label)}">${group.products
      .map(product => `<option value="${safeText(product.id)}">${safeText(selectorName(product))}</option>`)
      .join("")}</optgroup>`)
    .join("");
  if (selected) {
    selectedProductId = selected.id;
    $("productFilter").value = selected.id;
  }
}

function selectProduct(id) {
  if (!products.some(product => product.id === id)) return;
  selectedProductId = id;
  renderSelected();
}

function initialise() {
  $("supplierFilter").addEventListener("change", () => {
    populateProductFilter();
    renderSelected();
  });
  $("productFilter").addEventListener("change", event => selectProduct(event.target.value));
  populateSupplierFilter();
  populateProductFilter();
  renderSelected();
}

if (typeof document !== "undefined" && document.getElementById("supplierFilter")) initialise();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    products, sourceMeta, dataMeta, supplyMeta, sourceRecord, loadLabels, loadDisplay,
    productConstraint, productGroup, selectorName, australiaPathway, australiaRecord
  };
}
