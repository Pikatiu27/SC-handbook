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
  protection: "Permanent sheathed systems available",
  hardware: "Multi-hole head, bearing plate and corrosion-protection assembly",
  sourceKind: "archived-global-row",
  source: "Freyssinet anchoring systems brochure, C IX 0 - 01/14, p.8",
  sourceNote: "Official 2014 global tendon table; service limits depend on the adopted project standard.",
  summary: "Multi-strand tendon for active foundation anchoring."
});

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
  protection: "Project ground-anchor protection system required",
  hardware: "Anchor nut, washer, coupler and wedge washer",
  sourceKind: "us-row",
  source: "DYWIDAG PT Threadbar Technical Specification, October 2024, ASTM A722",
  sourceNote: "Official US tendon row; confirm Australian grade, assembly and availability.",
  summary: "Prestressing threadbar requiring a project ground-anchor assembly."
});

const sasRows = makeRows("sas", "SAS Stressteel", [
  [18, 241, 230, 255], [26.5, 551, 525, 580], [32, 804, 760, 845],
  [36, 1020, 960, 1070], [40, 1257, 1190, 1320], [47, 1735, 1650, 1820],
  [57, 2581, 2155, 2671], [65, 3331, 2780, 3447], [75, 4418, 3690, 4572]
].map(([diameter, area, yieldLoad, ultimateLoad]) => ({
  id: `sas-${String(diameter).replace(".", "-")}`,
  name: `SAS ${diameter <= 47 ? "950/1050" : "835/1035"} ${diameter} mm`,
  tendon: `${diameter} mm threadbar; ${area.toLocaleString("en-AU")} mm²`,
  yieldLoad,
  ultimateLoad,
  sourceNote: diameter === 65
    ? "The product table gives 2,780 kN yield load while a design-forces table gives 2,790 kN; confirm the adopted value with SAS."
    : "Current manufacturer tendon row; confirm Australian ground-anchor applicability and supply."
})), {
  formGroup: "bar",
  type: "Prestressing threadbar",
  protection: "Project-specific corrosion-protection system required",
  hardware: "Dome or anchor nut, plate, coupler and stressing anchorage",
  sourceKind: "current-external-row",
  source: "SAS post-tensioning system design guide, January 2026",
  sourceNote: "Current manufacturer tendon row; confirm Australian ground-anchor applicability and supply.",
  summary: "Prestressing threadbar requiring project ground-anchor detailing."
});

const familyRows = [
  {
    providerKey: "vsl", provider: "VSL", id: "vsl-strand", name: "VSL strand ground anchor",
    formGroup: "strand", type: "Multi-strand anchor", tendon: "1 to 12 strands; larger systems on request",
    protection: "SCP or DCP; permanent systems available", hardware: "Static or retensionable head; custom configurations",
    sourceKind: "global-family", source: "VSL Ground Anchors public system page",
    sourceNote: "System family verified; obtain the current product and load schedule.",
    summary: "Configurable strand ground-anchor family."
  },
  {
    providerKey: "vsl", provider: "VSL", id: "vsl-bar", name: "VSL bar ground anchor",
    formGroup: "bar", type: "Prestressed bar", tendon: "Threaded bars up to 75 mm",
    protection: "DCP standard for permanent applications", hardware: "Bearing plate and configurable permanent head",
    sourceKind: "global-family", source: "VSL Ground Anchors public system page",
    sourceNote: "System family verified; obtain a row-level product and load schedule.",
    summary: "Configurable bar ground-anchor family."
  },
  {
    providerKey: "bbr", provider: "BBR", id: "bbr-cona", name: "BBR VT CONA CMG",
    formGroup: "strand", type: "Multi-strand anchor", tendon: "2 to 22 prestressing strands",
    protection: "Temporary or permanent configurations", hardware: "ETA-assessed strand ground-anchor assembly",
    sourceKind: "global-family", source: "BBR VT CONA CMG; ETA 21/1053",
    sourceNote: "ETA scope verified; confirm Australian acceptance and the current load schedule.",
    summary: "ETA-assessed strand ground-anchor family."
  },
  {
    providerKey: "keller", provider: "Keller Australia", id: "keller-bar", name: "Keller bar ground anchor",
    formGroup: "project", type: "Australian project pathway", tendon: "High-strength threaded bar; project schedule",
    protection: "Temporary or permanent project configuration", hardware: "Anchor head, free length, bond length and grout system",
    sourceKind: "au-pathway", source: "Keller Australia Anchors technique page",
    sourceNote: "Australian delivery pathway; obtain the certified project product schedule.",
    summary: "Australian bar-anchor delivery pathway."
  },
  {
    providerKey: "keller", provider: "Keller Australia", id: "keller-strand", name: "Keller strand / SBMA anchor",
    formGroup: "project", type: "Australian project pathway", tendon: "Strand tendon or multiple bond zones; project schedule",
    protection: "Temporary or permanent project configuration", hardware: "Stressed head, free length and single or multiple bond zones",
    sourceKind: "au-pathway", source: "Keller Australia Anchors technique page",
    sourceNote: "Australian delivery pathway; obtain the certified project product schedule.",
    summary: "Australian high-capacity strand or SBMA delivery pathway."
  },
  {
    providerKey: "srg", provider: "SRG Global", id: "srg-strand", name: "SRG high-capacity strand anchor",
    formGroup: "project", type: "Australian project pathway", tendon: "Project-fabricated multi-strand tendon",
    protection: "Permanent corrosion protection and monitoring options", hardware: "Project head, load cell and stressing assembly",
    sourceKind: "au-pathway", source: "SRG Global Dam Anchoring and Monitoring capability",
    sourceNote: "Australian project-delivery capability; use the certified project schedule.",
    summary: "Project-designed high-capacity permanent anchor pathway."
  },
  {
    providerKey: "srg", provider: "SRG Global", id: "srg-bar", name: "SRG stress-bar / ground-anchor pathway",
    formGroup: "project", type: "Australian project pathway", tendon: "Stress bar system; project schedule",
    protection: "Project corrosion-protection configuration", hardware: "Project nut, plate, coupler and stressing assembly",
    sourceKind: "au-pathway", source: "SRG Global Engineered Products capability",
    sourceNote: "Stress-bar and ground-anchor capabilities are listed separately; obtain a certified combined system schedule.",
    summary: "Project-engineered bar pathway requiring a defined ground-anchor system."
  }
];

const projectRow = {
  providerKey: "custom", provider: "Custom / project", id: "custom", name: "Project-specific anchor",
  formGroup: "project", type: "Project-defined", tendon: "Defined by the project product schedule",
  yieldLoad: null, ultimateLoad: null, protection: "Project specification", hardware: "Project detail",
  sourceKind: "project", source: "Project product schedule and certificate",
  sourceNote: "No manufacturer value is embedded.",
  summary: "Use for a certified project product not listed in the selector."
};

const products = [...freyssinetBars, ...freyssinetStrands, ...dywidagRows, ...sasRows, ...familyRows, projectRow];
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
    "us-row": { label: "Manufacturer row · Oct 2024 · US", className: "status-us" },
    "global-family": { label: "System family page · external", className: "status-family" },
    "au-pathway": { label: "Australian provider pathway", className: "status-au" },
    project: { label: "Project entry", className: "status-project" }
  };
  return map[product.sourceKind] || map.project;
}

function dataMeta(product) {
  if (product.ultimateLoad) return { label: "Tendon property row", className: "status-row" };
  if (product.sourceKind === "project") return { label: "Project-defined system", className: "status-project" };
  if (product.sourceKind === "au-pathway") return { label: "Provider pathway", className: "status-au" };
  return { label: "Ground-anchor system family", className: "status-family" };
}

function supplyMeta(product) {
  if (product.sourceKind === "project") return { label: "Project procurement route", className: "status-project" };
  if (product.sourceKind === "au-pathway") return { label: "Confirmed Australian provider pathway", className: "status-au" };
  if (product.providerKey === "bbr") return { label: "Australian acceptance and supply confirmation required", className: "status-us" };
  return { label: "Australian supply confirmation required", className: "status-us" };
}

function sourceRecord(product) {
  const records = {
    freyssinet: {
      url: "https://www.freyssinet.com/wp-content/uploads/sites/1/2021/08/Brochure-Freyssinet-anchoring-systems-for-geotechnical-engineering-1.pdf",
      region: "Global",
      checked: "10 Jul 2026"
    },
    dywidag: {
      url: "https://assets.ctfassets.net/wz1xpzqb46pe/4i3VUcbjerya1EklUSmpwM/8e603f793e164b15063c8326529010c9/DYWIDAG_PT_Threadbar_Technical_Specification_Oct24_EN_Web.pdf",
      region: "United States",
      checked: "10 Jul 2026"
    },
    sas: {
      url: "https://www.annahuette.com/wp-content/uploads/jet-form-builder/d48dacaabeb4eeb673b4828b7de2b0d5/2026/02/SAS-pt-system_en_01-2026-_SAS-950-1050_SAS-835-1035-Vorspannsystem.pdf",
      region: "External manufacturer",
      checked: "10 Jul 2026"
    },
    vsl: { url: "https://vsl.com/technology/ground-anchors/", region: "Global", checked: "10 Jul 2026" },
    bbr: { url: "https://www.bbrnetwork.com/fileadmin/userdaten/Zulassungen%20EU/CONA_CMG_ground/BBR_ETA-21-1053_CMG_EN_Rev1_1023-short.pdf", region: "European ETA", checked: "10 Jul 2026" },
    keller: { url: "https://www.keller.com.au/expertise/techniques/anchors", region: "Australia", checked: "10 Jul 2026" },
    srg: { url: "https://srgglobal.com.au/what-we-do/technology/dam-anchoring-and-monitoring/", region: "Australia", checked: "10 Jul 2026" },
    custom: { url: "", region: "Project-defined", checked: "Not applicable" }
  };
  return records[product.providerKey] || records.custom;
}

function loadLabels(product) {
  if (product.sourceKind === "us-row") {
    return { yield: "Published yield / proof load", ultimate: "Minimum ultimate tensile load" };
  }
  return { yield: "Published yield load", ultimate: "Published ultimate load" };
}

function productConstraint(product) {
  if (product.sourceKind === "project") return "Provide the certified product, resistance and execution schedule.";
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
  const labels = loadLabels(product);
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
  $("factYieldLoad").textContent = product.yieldLoad ? product.yieldLoad.toLocaleString("en-AU") : "Not published";
  $("factYieldUnit").textContent = product.yieldLoad ? " kN" : "";
  $("factUltimateLoad").textContent = product.ultimateLoad ? product.ultimateLoad.toLocaleString("en-AU") : "Not published";
  $("factUltimateUnit").textContent = product.ultimateLoad ? " kN" : "";
  $("factYieldNote").textContent = product.yieldLoad
    ? "Manufacturer tendon value; not anchor resistance."
    : "No row-level yield load is available in the captured source.";
  $("factUltimateNote").textContent = product.ultimateLoad
    ? "Manufacturer tendon value; not anchor resistance."
    : "No row-level ultimate load is available in the captured source.";
  $("factProvider").textContent = product.provider;
  $("factType").textContent = product.type;
  $("factTendon").textContent = product.tendon;
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

function populateProductFilter() {
  const models = [...products].sort((a, b) => `${a.provider} ${a.name}`.localeCompare(`${b.provider} ${b.name}`, "en-AU", { numeric: true }));
  $("productFilter").innerHTML = models
    .map(product => `<option value="${safeText(product.id)}">${safeText(product.provider)} — ${safeText(product.name)}</option>`)
    .join("");
  $("productFilter").value = selectedProductId;
}

function selectProduct(id) {
  if (!products.some(product => product.id === id)) return;
  selectedProductId = id;
  renderSelected();
}

function initialise() {
  $("productFilter").addEventListener("change", event => selectProduct(event.target.value));
  populateProductFilter();
  renderSelected();
}

initialise();
