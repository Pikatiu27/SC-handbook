(function () {
  "use strict";
  function mount() {
    const M = globalThis.SCFoundationTables, R = globalThis.SCFoundationRock, Q = globalThis.SCFoundationReview;
    if (!M || !R || !Q) throw Error("Foundation table data unavailable");
    const S = { rows: screwCatalogueRows, catalogues: screwPileCatalogues, values: screwProductCapacityValues,
      system: screwSystemType, class: screwProductClass, confidence: screwSourceConfidence, review: screwSourceReviewText };
    const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    const note = v => v ? `<small class="fp-note">${esc(v)}</small>` : "";
    const cell = v => esc(!v || v === M.missing || v === "Product sheet not stated" ? "—" : v === "Source conflict" ? "Conflict" : v);
    const recordLabels = { model: "Model", series: "Series", family: "Family", pathway: "Project / supply", derived: "Derived tendon", benchmark: "Technique benchmark" };
    const link = (url, label, description = label) => url && /^https:\/\//.test(url) ? `<a href="${esc(url)}" aria-label="${esc(description)}" title="${esc(description)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>` : "";
    const field = (label, value, extra = "") => `<div><dt>${esc(label)}</dt><dd>${esc(value || M.missing)}${extra}</dd></div>`;
    const join = values => [...new Set(values.filter(Boolean))].join(" · ");
    const optionalField = (label, value) => value ? field(label, value) : "";
    const reviewed = (kind, row) => Q[kind][row.manufacturerKey];
    const dataLabel = v => ({ "Published product row": "Published", "Derived tendon row": "Derived", "Ground-anchor system family": "System family", "Provider pathway": "AU pathway", "Project-defined system": "Project entry", "Published series": "Published series", "Published system row": "System row", "Published design-table row": "Published row", "Published geometry row": "Geometry row", "Published product family": "Product family", "Published stocked series": "Stocked series" })[v] || v;
    const protection = v => ({
      "Temporary and permanent anchor systems": "Temporary / permanent",
      "Permanent sheathed systems available": "Permanent sheath available",
      "Project ground-anchor protection system required": "Project protection required",
      "Project-specific corrosion-protection system required": "Project protection required",
      "Prestress-and-grout system; project corrosion protection required": "Prestress / grout · project protection",
      "Protection Level 1, 2 or 3 kit; select the project configuration": "Levels 1 / 2 / 3 · project selection"
    })[v] || v || M.missing;
    function auField(kind, row) {
      const review = reviewed(kind, row);
      if (!review) return "";
      const scope = kind === "rock" && row.manufacturerKey === "sas" ? (row.id === "sas-18" ? "18 mm is outside the cited ACRS bar range. Confirm supply and assembly." : "ACRS 808011 v3: bar manufacture; valid to 31 Dec 2026. Certified supply traceability and anchor assembly require confirmation.") : review.scope;
      return field("Australian reference · " + Q.checked, scope, link(review.url, review.label));
    }
    function rockDetail(row) {
      const p = row.product, au = R.australiaRecord(p);
      return `<h4>${esc(p.name)}</h4><dl class="fp-detail-grid">` + [
        field("Product / assembly", [p.summary, p.type, p.configuration].filter(Boolean).join(" · ")),
        field("Tendon", p.tendon), field("Published geometry", p.publishedGeometry), field("Standard / system", p.standard),
        field("Corrosion protection", p.protection), field("Hardware", p.hardware),
        field(row.labels.yield, row.yield.value + row.yield.unit + " · " + row.yield.note),
        field(row.labels.ultimate, row.ultimate.value + row.ultimate.unit + " · " + row.ultimate.note),
        field("Source", [p.source, p.sourceNote, row.source.region, "Checked " + row.source.checked].filter(Boolean).join(" · "), link(row.source.url, "Open source")),
        reviewed("rock", row) ? auField("rock", row) : field("Australian pathway", [R.supplyMeta(p).label, R.australiaPathway(p)].join(" · "), link(au.url, au.label)),
        field("Before adoption", R.productConstraint(p))
      ].join("") + "</dl>";
    }
    function screwDetail(row) {
      const p = row.product;
      return `<h4>${esc(p.label)}</h4><dl class="fp-detail-grid">` + [
        field("Product / supply", [screwProductCode(p), recordLabels[row.recordType], screwSupplyBasis(p)].join(" · ")),
        field("Shaft / steel", join([p.shaft, p.diameter, p.wall, p.steel])),
        field("Helix / bearing", [p.helixCount, p.helix, p.pitchSpacing].filter(Boolean).join(" · ")),
        field("Lead / extension", [p.length, p.extension].filter(Boolean).join(" · ")),
        field("Founding / ground", [p.foundingCriterion, p.soilRequirement].filter(Boolean).join(" · ")),
        field("Installation", p.installControl), field("Maximum installation torque", screwTorqueLimit(p)),
        optionalField("Head connection", p.headConnection), optionalField("Finish / durability", p.durability),
        field("Published load basis", p.capacityBasis),
        field("Source", [p.source, p.sourceStatus || row.sourceStatus.level, row.source.checked].filter(Boolean).join(" · "), link(row.source.url, "Open source")),
        auField("screw", row),
        field("Project checks", row.manufacturerKey === "solidity" ? "Supplier review; obtain directional design resistance and head detail. Check ULS/SLS, bearing, buckling, plate bending, movement and installation." + (p.diameterConflict ? " Confirm shaft OD: callout and drawing title differ." : "") : join([screwAdoptionRequirementText(p), p.note]))
      ].join("") + `</dl><button type="button" class="fp-use" data-use="${esc(row.id)}">Use for action distribution</button><p class="fp-boundary">Changing product clears project resistance and source. Reselecting it keeps your inputs.</p>`;
    }
    function loadCell(row, kind) {
      const display = row[kind];
      const label = row.labels[kind].replace(/^Published /, "").replace(/^./, c => c.toUpperCase());
      return `<td class="fp-number"><span class="fp-load-value">${cell(display.value)}</span>${note(label)}</td>`;
    }
    function rockCells(row) {
      const p = row.product, tendon = M.tendonParts(p.tendon), review = reviewed("rock", row);
      return `<td>${cell(tendon.tendon)}</td><td class="fp-number">${cell(tendon.area)}</td>${loadCell(row, "yield")}${loadCell(row, "ultimate")}<td>${cell(protection(p.protection))}</td><td>${esc(M.sourceLabel(row.sourceStatus))}${note(row.manufacturerKey === "sas" ? row.id === "sas-18" ? "Outside ACRS range" : "ACRS bar manufacture" : review?.url ? review.label : review ? "AU route pending" : "Project entry")}</td>`;
    }
    function screwCells(row) {
      const p = row.product, v = row.values, review = reviewed("screw", row);
      const primary = M.primaryText(row), tension = M.directionText(row, "tension"), lateral = M.directionText(row, "lateral");
      const load = (n, label) => `<span class="fp-load-value">${cell(n)}</span>${n === M.missing ? "" : note(label)}`;
      const diameter = M.dimension(p.diameter, "mm OD"), wall = M.dimension(p.wall, "mm");
      const shaft = `<div class="${diameter.numeric ? "fp-number" : ""}"><span class="fp-inline-label">OD </span>${cell(diameter.text)}</div><div class="${wall.numeric ? "fp-number" : ""}"><span class="fp-inline-label">Wall </span>${cell(wall.text)}</div>`;
      const length = (p.length || M.missing).replace(/Lead length not stated in SP\d+/, "Not published").replace(/ series range noted$/, " range").replace(/ product row$/, "");
      const torque = (p.torqueLimit || "").match(/^([\d,]+) N·m maximum table torque$/);
      const torqueText = torque ? torque[1] : p.torqueApplicable === false ? "N/A" : M.missing;
      const sourceStatus = p.sourceStatus || review?.status || M.sourceLabel(row.sourceStatus.level);
      return `<td class="fp-number">${shaft}${note(p.diameterConflict)}</td><td>${cell(p.helix)}${note(p.helixCount)}</td><td>${cell(length)}</td>` +
        `<td class="fp-number">${load(primary, p.loadStatus ? "Current sheet required" : v.primaryLabel)}${primary === M.missing || p.loadStatus ? "" : note(v.loadBasis.replace("SWL / working reference", "SWL / working").replace("Published load; basis not verified", "Basis unverified") + " · " + v.unitBasis.replace("Per pile / product", "Per pile").replace("Published pile row", "Pile row"))}</td>` +
        `<td class="fp-number">${load(tension, "")}</td><td class="fp-number">${load(lateral, lateral !== M.missing && row.manufacturerKey === "solidity" ? "1.5 m · static test" : "")}</td>` +
        `<td class="fp-number">${cell(torqueText)}</td><td>${esc(sourceStatus)}${note(p.loadCondition)}</td>`;
    }
    function create(kind, rows) {
      const host = document.getElementById("fp-" + kind), isRock = kind === "rock", prefix = "fp-" + kind;
      const state = { manufacturer: "all", category: "all", recordType: "all", basis: "all", query: "", open: null };
      let returnPosition = null;
      const manufacturers = [...new Map(rows.map(r => [r.manufacturerKey, r.manufacturer]))];
      const types = isRock ? [["all", "All anchors"], ["bar", "Bar tendons"], ["strand", "Strand tendons"], ["project", "Project pathways"]] : [];
      const categories = isRock ? [["all", "All data"], ["bar", "Bar tendons"], ["strand", "Strand tendons"], ["project", "Project pathways"]] : [["all", "All systems"], ...[...new Set(rows.map(r => r.category))].map(v => [v, v])];
      const options = list => list.map(([v, label]) => `<option value="${esc(v)}">${esc(label)}</option>`).join("");
      const headers = isRock ? [["Product / manufacturer", 190], ["Tendon", 170], ["Area", 85, true, "mm²"], ["Yield / proof / elastic limit", 145, true, "kN · row basis"], ["Ultimate", 110, true, "kN · row basis"], ["Protection", 145], ["Source", 145], ["Documents", 115]] :
        [["Product / manufacturer", 185], ["Shaft / wall", 100, true, "mm"], ["Helix / bearing", 145], ["Lead / length", 110], ["Load reference", 150, true, "kN · row basis"], ["Tension / uplift", 90, true, "kN"], ["Lateral", 90, true, "kN"], ["Max. torque", 100, true, "N·m"], ["Source", 125], ["Documents", 115]];
      host.innerHTML =
        (isRock ? `<div class="fp-types" role="group" aria-label="Anchor type">${types.map(([v, label]) => `<button type="button" data-category="${v}" aria-pressed="${v === "all"}">${label}</button>`).join("")}</div>` : "") +
        `<div class="fp-filters"><label><span>Manufacturer</span><select id="${prefix}-manufacturer">${options([["all", "All manufacturers"], ...manufacturers])}</select></label>` +
        `<label><span>Record type</span><select id="${prefix}-recordType">${options([["all", "All records"], ...[...new Set(rows.map(r => r.recordType))].map(v => [v, recordLabels[v]])])}</select></label>` +
        (isRock ? "" : `<label><span>System</span><select id="${prefix}-category">${options(categories)}</select></label><label><span>Load basis</span><select id="${prefix}-basis">${options([["all", "All bases"], ...[...new Set(rows.map(r => r.basis))].map(v => [v, v])])}</select></label>`) +
        `<label class="fp-query"><span>Code / keyword</span><input id="${prefix}-query" type="search" placeholder="Product, size or source"></label><button type="button" class="fp-reset">Reset</button></div>` +
        `<div class="fp-table-heading"><h3>${isRock ? "Rock-anchor product data" : "Screw-pile product data"}</h3><span class="fp-count" id="${prefix}-count" role="status" aria-live="polite"></span></div>` +
        `<p class="fp-intro">${isRock ? "Tendon loads require anchor-system design." : "Compare matching load bases and system units."} Selected catalogue records.</p><p class="fp-overflow fp-hint" hidden>Scroll across for more columns.</p>` +
        `<div class="fp-scroll" id="${prefix}-scroll" role="region" aria-label="${isRock ? "Rock anchor" : "Screw pile"} comparison table" tabindex="0"><table class="fp-table" style="min-width:${headers.reduce((n, h) => n + h[1], 0)}px"><caption class="fp-sr-only">${isRock ? "Rock anchor" : "Screw pile"} manufacturer data; Compact comparison</caption><colgroup>${headers.map(h => `<col style="width:${h[1]}px">`).join("")}</colgroup><thead><tr>${headers.map(h => `<th scope="col" class="${h[2] ? "fp-number" : ""}">${h[0]}${note(h[3])}</th>`).join("")}</tr></thead><tbody id="${prefix}-rows"></tbody></table></div>` +
        `<p class="fp-hint">— not published · Pending requires confirmation · Conflict withheld · N/A not applicable. ≤ is a source upper limit.</p>` +
        `<p class="fp-hint">Source: data · AU: Australian reference · Details: conditions.</p>` +
        `<details class="fp-review"><summary>Sources & coverage · ${esc(Q.checked)}</summary><p>Selected models and families. Confirm exact assembly, Australian supply and project acceptance.</p><dl>${manufacturers.filter(([key]) => Q[kind][key]).map(([key, name]) => `<div><dt>${esc(name)}</dt><dd>${esc(Q[kind][key].scope)} ${link(Q[kind][key].url, Q[kind][key].label)}</dd></div>`).join("")}</dl></details>`;
      const tbody = host.querySelector("tbody"), scroll = host.querySelector(".fp-scroll");
      function render() {
        let visible = M.filter(rows, state);
        host.querySelector(".fp-count").textContent = `${visible.length} of ${rows.length} records`;
        tbody.innerHTML = visible.length ? visible.map((row, i) => {
          const detailId = prefix + "-detail-" + rows.indexOf(row), open = row.id === state.open;
          const selected = !isRock && document.getElementById("screwManufacturer").value + ":" + document.getElementById("screwSeries").value === row.id;
          const review = reviewed(kind, row), sourceUrl = row.source.url || (row.manufacturerKey === "minmetals" ? review?.url : "");
          return `<tr class="fp-row ${i % 2 ? "fp-stripe" : ""} ${selected ? "fp-selected" : ""}" data-record="${esc(row.id)}"><th scope="row">${esc(row.name)}${note(row.manufacturer + " · " + recordLabels[row.recordType])}</th>` +
            (isRock ? rockCells(row) : screwCells(row)) + `<td><div class="fp-doc"><div class="fp-doc-links">${link(sourceUrl, "Source", "Source: " + row.name) || note("Source required")}${review?.url && review.url !== sourceUrl ? link(review.url, "AU", review.label + ": " + row.name) : ""}</div><button type="button" class="fp-detail-button" data-details="${esc(row.id)}" aria-expanded="${open}" aria-controls="${detailId}" aria-label="Details: ${esc(row.name)}">${open ? "Close details" : "Details"}</button></div></td></tr>` +
            `<tr id="${detailId}" class="fp-detail-row" ${open ? "" : "hidden"}><td colspan="${headers.length}" class="fp-detail-cell"><div class="fp-detail-body">${open ? `<button type="button" class="fp-detail-button fp-detail-close" data-details="${esc(row.id)}" aria-label="Close details: ${esc(row.name)}">Close</button>` + (isRock ? rockDetail(row) : screwDetail(row)) : ""}</div></td></tr>`;
        }).join("") : `<tr><td colspan="${headers.length}" class="fp-empty">No matching records. Change the filters or select Reset.</td></tr>`;
      }
      function resetScroll() { scroll.scrollTop = 0; scroll.scrollLeft = 0; }
      host.addEventListener("input", e => { if (e.target.id === prefix + "-query") { state.query = e.target.value; state.open = null; render(); resetScroll(); } });
      host.addEventListener("change", e => {
        if (e.target.id === prefix + "-manufacturer") state.manufacturer = e.target.value;
        if (e.target.id === prefix + "-category") state.category = e.target.value;
        if (e.target.id === prefix + "-recordType") state.recordType = e.target.value;
        if (e.target.id === prefix + "-basis") state.basis = e.target.value;
        state.open = null; render(); resetScroll();
      });
      host.addEventListener("click", e => {
        const category = e.target.closest("[data-category]");
        if (category) { state.category = category.dataset.category; state.open = null; host.querySelectorAll("[data-category]").forEach(b => b.setAttribute("aria-pressed", b === category)); render(); resetScroll(); }
        if (e.target.closest(".fp-reset")) {
          state.manufacturer = "all"; state.category = "all"; state.recordType = "all"; state.basis = "all"; state.query = ""; state.open = null;
          host.querySelectorAll("select").forEach(s => s.value = "all"); host.querySelector("input").value = "";
          host.querySelectorAll("[data-category]").forEach(b => b.setAttribute("aria-pressed", b.dataset.category === "all")); render(); resetScroll();
        }
        const details = e.target.closest("[data-details]");
        if (details) {
          const id = details.dataset.details;
          const closing = state.open === id;
          if (!closing && !state.open) returnPosition = { left: scroll.scrollLeft, top: scroll.scrollTop };
          state.open = state.open === id ? null : id; render();
          const row = [...tbody.querySelectorAll("[data-record]")].find(r => r.dataset.record === id);
          if (state.open) { scroll.scrollLeft = 0; const next = row.nextElementSibling; next.scrollIntoView({ block: "nearest", inline: "start" }); }
          else if (returnPosition) { scroll.scrollLeft = returnPosition.left; scroll.scrollTop = returnPosition.top; returnPosition = null; }
          // Restore keyboard focus without scrolling the document or hiding the inline detail.
          (state.open ? row.nextElementSibling.querySelector(".fp-detail-close") : row.querySelector("button")).focus({ preventScroll: true });
        }
        const use = e.target.closest("[data-use]");
        if (use) {
          const row = rows.find(r => r.id === use.dataset.use);
          const currentId = document.getElementById("screwManufacturer").value + ":" + document.getElementById("screwSeries").value;
          M.selectProduct(currentId, row, selectScrewCatalogueRow);
          updateSelection(); render();
          const demand = document.getElementById("screwDemandDetails"); demand.open = true;
          demand.scrollIntoView({ block: "start" }); demand.querySelector("summary").focus({ preventScroll: true });
        }
      });
      render();
      const overflow = host.querySelector(".fp-overflow");
      const updateOverflow = () => overflow.hidden = scroll.scrollWidth <= scroll.clientWidth + 1;
      new ResizeObserver(updateOverflow).observe(scroll); updateOverflow();
    }
    function updateSelection() {
      const p = selectedScrewPile(), provider = selectedScrewCatalogue();
      const notice = document.getElementById("fp-screw-selection");
      notice.innerHTML = `<b>Selected:</b> ${esc(p.label)} · ${esc(provider.label)}<small>Comparison uses your project resistance, source and matching load basis.</small>`;
    }
    const demand = document.getElementById("screwDemandDetails"), notice = document.createElement("p");
    notice.id = "fp-screw-selection"; notice.className = "fp-selected-notice"; notice.setAttribute("aria-live", "polite");
    demand.querySelector(".detail-body").prepend(notice);
    const order = { model: 0, series: 1, benchmark: 2, family: 3, pathway: 4 };
    create("rock", M.rockRows(R));
    // Exact model records first; never rank incompatible numerical load bases.
    create("screw", M.screwRows(S).sort((a, b) => order[a.recordType] - order[b.recordType])); updateSelection();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true }); else mount();
})();
