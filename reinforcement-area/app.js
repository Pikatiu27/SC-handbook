(function initialiseReinforcementAreaView() {
  "use strict";
  const api = globalThis.ReinforcementArea;
  const panel = document.getElementById("reoPanel");
  if (!api || !panel) return;
  const heading = panel.querySelector(".tool-heading");
  const title = heading.querySelector("h2"), kicker = heading.querySelector(".kicker"), status = heading.querySelector(".tool-status");
  const original = { title: title.textContent, kicker: kicker.textContent, status: status.textContent };
  const lengths = document.createElement("div");
  lengths.id = "reoLengthsView";
  for (const child of [...panel.children]) if (child !== heading) lengths.append(child);
  panel.append(lengths);
  const nav = document.createElement("div");
  nav.id = "reoAreaNav";
  nav.className = "branch-tabs";
  nav.setAttribute("aria-label", "Reinforcement tool");
  nav.innerHTML = `<button type="button" class="branch-tab" id="reoAreaShow" aria-controls="reoAreaView" aria-pressed="false">Area &amp; spacing</button><button type="button" class="branch-tab active" id="reoLengthsShow" aria-controls="reoLengthsView" aria-pressed="true">Development &amp; laps</button>`;
  heading.after(nav);
  const view = document.createElement("div");
  view.id = "reoAreaView";
  view.className = "reo-area-view";
  view.hidden = true;
  const barOptions = api.bars.map(bar => `<option value="${bar.designation}">${bar.designation}</option>`).join("");
  view.innerHTML = `
    <section class="lookup-card reo-area-card">
      <div class="branch-tabs" aria-label="Area arrangement">
        <button class="branch-tab active" type="button" id="reoAreaSpacingMode" aria-pressed="true">Bars at spacing</button>
        <button class="branch-tab" type="button" id="reoAreaCountMode" aria-pressed="false">Number of bars</button>
      </div>
      <div class="input-group-fields reo-area-inputs reo-area-arrangement-fields" id="reoAreaArrangementFields">
        <label><span>Bar size</span><select id="reoAreaBar">${barOptions}</select></label>
        <label id="reoAreaSpacingField"><span>Centre spacing, s</span><span class="unit"><input id="reoAreaSpacing" type="text" inputmode="decimal" data-preserve-invalid="true" value="200" aria-describedby="reoAreaInputError"><em>mm</em></span></label>
        <label id="reoAreaCountField" hidden><span>Number of bars, n</span><input id="reoAreaCount" type="text" inputmode="numeric" data-preserve-invalid="true" value="4" aria-describedby="reoAreaInputError"></label>
        <label id="reoAreaLengthField" hidden><span>Straight length per bar, L</span><span class="unit"><input id="reoAreaLength" type="text" inputmode="decimal" data-preserve-invalid="true" value="6" aria-describedby="reoAreaInputError"><em>m</em></span></label>
      </div>
      <p id="reoAreaInputError" class="field-error" role="status" hidden></p>
      <div class="reo-area-results" aria-live="polite" aria-atomic="true">
        <article class="capacity-card"><span id="reoAreaResultLabel">Steel area per metre</span><strong><output id="reoAreaResult">—</output><small id="reoAreaResultUnit"> mm²/m</small></strong><p id="reoAreaArrangement" class="reo-area-caption"></p></article>
        <article class="capacity-card"><span id="reoAreaMassLabel">Nominal mass · one direction</span><strong><output id="reoAreaMass">—</output><small id="reoAreaMassUnit"> kg/m²</small></strong><p id="reoAreaMassNote" class="reo-area-caption">One layer. Standard nominal mass, excluding laps and wastage.</p></article>
      </div>
      <div class="reo-area-basis-strip"><span>Single bar <b id="reoAreaSingleArea"></b> mm²</span><span>Nominal mass <b id="reoAreaSingleMass"></b> kg/m</span><span id="reoAreaGapWrap">Clear gap <b id="reoAreaClearGap"></b> mm</span></div>
      <p class="reo-area-caption" id="reoAreaScope">Equivalent continuous one-metre strip, one layer and one direction. Clear gap is geometry only; detailing limits are not checked.</p>
    </section>
    <section class="lookup-card reo-area-card">
      <div class="section-heading"><div><h3 id="reoAreaTableTitle">Area at common spacings</h3></div><span class="reo-area-status" id="reoAreaTableUnit">mm²/m</span></div>
      <div class="reo-area-scroll" tabindex="0" role="region" aria-label="Reinforcement area reference table"><table class="reo-area-table"><thead id="reoAreaTableHead"></thead><tbody id="reoAreaTableBody"></tbody></table></div>
      <p class="reo-area-caption" id="reoAreaTableNote">Centre spacings in mm. These reference spacings are not detailing recommendations.</p>
    </section>
    <section class="lookup-card reo-area-card">
      <div class="section-heading"><div><h3>Find an arrangement</h3></div><span class="reo-area-status" id="reoAreaFindStatus" role="status">TARGET OPTIONAL</span></div>
      <div class="input-group-fields reo-area-inputs reo-area-find-fields">
        <label><span id="reoAreaTargetLabel">Target area per metre</span><span class="unit"><input id="reoAreaTarget" type="text" inputmode="decimal" data-preserve-invalid="true" placeholder="e.g. 1500" aria-describedby="reoAreaFindNote"><em id="reoAreaTargetUnit">mm²/m</em></span></label>
        <label><span>Bar sizes to include</span><select id="reoAreaFilter"><option value="all">All N10–N40 sizes</option>${barOptions}</select></label>
      </div>
      <p class="reo-area-caption" id="reoAreaFindNote">Area comparison only. Enter the target established by your design.</p>
      <div class="reo-area-scroll" id="reoAreaCandidatesWrap" tabindex="0" role="region" aria-label="Arrangements meeting the numerical area target" hidden><table class="reo-area-table reo-area-candidates-table"><thead><tr><th scope="col">Arrangement</th><th scope="col" id="reoAreaCandidateUnit">Area · mm²/m</th><th scope="col">Excess</th><th scope="col">Use</th></tr></thead><tbody id="reoAreaCandidates"></tbody></table></div>
    </section>
    <details class="detail-card"><summary><span><b>Basis &amp; limitations</b><small>Nominal bar data, formulas and scope</small></span><i aria-hidden="true">+</i></summary><div class="detail-body">
      <p><b>Bar data:</b> AS/NZS 4671:2019 Table 7.5(A), printed p.12. Australian 500N N10–N40 nominal areas and masses, shared with the existing reinforcement tool. Supplier ordering masses are a separate basis.</p>
      <p><b>At spacing:</b> A<sub>s</sub> = A<sub>bar</sub> × 1000 / s; nominal mass = m<sub>bar</sub> × 1000 / s. This is an equivalent continuous strip, not the number of bars in a finite-width slab.</p>
      <p><b>Number of bars:</b> A<sub>s</sub> = n × A<sub>bar</sub>; nominal straight-bar mass = n × L × m<sub>bar</sub>, with L in metres. Mass uses the Standard table, whose basis is nominal diameter and density 7850 kg/m³; it is not calculated from rounded nominal area.</p>
      <p><b>Target search:</b> at spacing, enumerate 75, 100, 125, 150, 175, 200, 225, 250, 275 and 300 mm; by count, round the required number up to a whole bar. Compare unrounded areas. Show up to 12 matches sorted by smallest area excess. Meeting the target confirms numerical area only.</p>
      <p><b>Excluded:</b> strength, minimum/maximum reinforcement, permitted spacing, cover, aggregate, crack control, finite-width fit, mesh, mixed sizes, bundles, laps, hooks, bends and wastage. Candidate arrangements require project detailing checks.</p>
      <p><a href="https://www.infrabuild.com/reinforcing/products/reinforcing-bar/deformed-reinforcing-bar-rebar-class-n/" target="_blank" rel="noreferrer">Supplier product and ordering reference</a> · data basis checked 8 October 2026. Public beta / For Review. Numerical area only; project detailing remains required.</p>
    </div></details>`;
  nav.after(view);
  const $ = id => document.getElementById(id);
  const fmt = (value, digits = 1) => {
    const [whole, decimal] = globalThis.EngineeringNumberFormat.decimalHalfUp(value, digits).split(".");
    return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (decimal === undefined ? "" : `.${decimal}`);
  };
  const read = id => {
    const raw = $(id).value.trim();
    return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(raw) ? Number(raw) : NaN;
  };
  let mode = "spacing", candidates = [];
  $("reoAreaBar").value = "N20";

  function renderTable(result) {
    const amounts = mode === "spacing" ? [100, 125, 150, 175, 200, 250, 300] : [2, 3, 4, 5, 6, 8, 10];
    $("reoAreaTableTitle").textContent = mode === "spacing" ? "Area at common spacings" : "Area for common bar counts";
    $("reoAreaTableUnit").textContent = mode === "spacing" ? "mm²/m" : "mm²";
    $("reoAreaTableNote").textContent = mode === "spacing" ? "Centre spacings in mm. These reference spacings are not detailing recommendations." : "One bar size. Counts are area references; fit and spacing are not checked.";
    $("reoAreaTableHead").innerHTML = `<tr><th scope="col">Bar</th>${amounts.map(amount => `<th scope="col">${amount}${mode === "spacing" ? "" : " bars"}</th>`).join("")}</tr>`;
    $("reoAreaTableBody").innerHTML = api.bars.map(bar => `<tr class="${result.valid && bar.designation === result.bar.designation ? "is-selected" : ""}"><th scope="row">${bar.designation}</th>${amounts.map(amount => `<td class="${result.valid && bar.designation === result.bar.designation && amount === read(mode === "spacing" ? "reoAreaSpacing" : "reoAreaCount") ? "is-chosen" : ""}">${fmt(mode === "spacing" ? bar.area * 1000 / amount : bar.area * amount)}</td>`).join("")}</tr>`).join("");
  }

  function renderCandidates() {
    const raw = $("reoAreaTarget").value.trim();
    const found = api.find({ mode, target: read("reoAreaTarget"), bar: $("reoAreaFilter").value });
    candidates = raw && found.valid ? found.candidates.slice(0, 12) : [];
    $("reoAreaCandidates").innerHTML = candidates.map((item, index) => `<tr><th scope="row">${mode === "spacing" ? `${item.bar} @ ${item.amount}` : `${item.amount} × ${item.bar}`}</th><td>${fmt(item.area)}<span class="reo-area-mobile-unit"> ${mode === "spacing" ? "mm²/m" : "mm²"}</span></td><td>${fmt(item.excessPercent)}%</td><td><button type="button" data-reo-candidate="${index}" aria-label="Select ${mode === "spacing" ? `${item.bar} at ${item.amount} mm centres` : `${item.amount} ${item.bar} bars`}">Use</button></td></tr>`).join("");
    $("reoAreaCandidatesWrap").hidden = candidates.length === 0;
    $("reoAreaFindStatus").classList.toggle("is-invalid", Boolean(raw && !found.valid));
    $("reoAreaTarget").setAttribute("aria-invalid", String(Boolean(raw && !found.valid)));
    $("reoAreaFindStatus").textContent = !raw ? "TARGET OPTIONAL" : !found.valid ? "INVALID TARGET" : found.candidates.length ? `${found.candidates.length} AREA MATCHES` : "NO AREA MATCHES";
    $("reoAreaFindNote").textContent = !raw ? "Area comparison only. Enter the target established by your design." : !found.valid ? found.error : !found.candidates.length ? "No arrangement in the enumerated sizes and spacings meets this target. Review the target or selection." : `Showing ${candidates.length} of ${found.candidates.length} matches, sorted by smallest area excess. ${mode === "spacing" ? "Spacings 75–300 mm. " : ""}Detailing and capacity are not checked.`;
  }

  function render() {
    const result = api.calculate({ mode, bar: $("reoAreaBar").value, spacing: read("reoAreaSpacing"), count: read("reoAreaCount"), length: read("reoAreaLength") });
    for (const [field, key] of [["reoAreaBar", "bar"], ["reoAreaSpacing", "spacing"], ["reoAreaCount", "count"], ["reoAreaLength", "length"]]) $(field).setAttribute("aria-invalid", String(Boolean(result.errors[key])));
    $("reoAreaInputError").hidden = result.valid;
    $("reoAreaInputError").textContent = Object.values(result.errors).join(" ");
    $("reoAreaResult").textContent = result.valid ? fmt(result.area) : "—";
    $("reoAreaMass").textContent = result.valid ? fmt(result.mass, 2) : "—";
    $("reoAreaResultLabel").textContent = mode === "spacing" ? "Steel area per metre" : "Total steel area";
    $("reoAreaResultUnit").textContent = mode === "spacing" ? " mm²/m" : " mm²";
    $("reoAreaMassLabel").textContent = mode === "spacing" ? "Nominal mass · one direction" : "Nominal straight-bar mass";
    $("reoAreaMassUnit").textContent = mode === "spacing" ? " kg/m²" : " kg";
    $("reoAreaArrangement").textContent = result.valid ? mode === "spacing" ? `${result.bar.designation} @ ${read("reoAreaSpacing")} mm centres` : `${read("reoAreaCount")} × ${result.bar.designation} · ${read("reoAreaLength")} m each` : "Input required · dependent results cleared";
    $("reoAreaMassNote").textContent = mode === "spacing" ? "One layer. Standard nominal mass, excluding laps and wastage." : "Equal straight lengths. Excludes laps, hooks, bends and wastage.";
    $("reoAreaSingleArea").textContent = result.bar ? fmt(result.bar.area) : "—";
    $("reoAreaSingleMass").textContent = result.bar ? fmt(result.bar.standardMass, 3) : "—";
    $("reoAreaClearGap").textContent = result.valid && mode === "spacing" ? fmt(result.clearGap) : "—";
    $("reoAreaGapWrap").hidden = mode !== "spacing";
    $("reoAreaScope").textContent = mode === "spacing" ? "Equivalent continuous one-metre strip, one layer and one direction. Clear gap is geometry only; detailing limits are not checked." : "Nominal area and straight-bar mass only. Bar arrangement, fit and detailing are not checked.";
    renderTable(result);
    renderCandidates();
  }

  function setMode(next) {
    if (mode !== next) $("reoAreaTarget").value = ""; // Units change; an earlier target cannot be silently reused.
    mode = next;
    const spaced = mode === "spacing";
    $("reoAreaSpacingField").hidden = !spaced;
    $("reoAreaCountField").hidden = spaced;
    $("reoAreaLengthField").hidden = spaced;
    $("reoAreaArrangementFields").classList.toggle("is-count", !spaced);
    for (const [id, active] of [["reoAreaSpacingMode", spaced], ["reoAreaCountMode", !spaced]]) { $(id).classList.toggle("active", active); $(id).setAttribute("aria-pressed", String(active)); }
    $("reoAreaTargetLabel").textContent = spaced ? "Target area per metre" : "Target total area";
    $("reoAreaTargetUnit").textContent = spaced ? "mm²/m" : "mm²";
    $("reoAreaCandidateUnit").textContent = spaced ? "Area · mm²/m" : "Area · mm²";
    render();
  }

  function show(area, updateUrl = true) {
    view.hidden = !area;
    lengths.hidden = area;
    title.textContent = area ? "Reinforcement Area & Spacing" : original.title;
    kicker.textContent = area ? "Nominal area and mass · Australian 500N N10–N40" : original.kicker;
    status.textContent = area ? "For Review · Public beta" : original.status;
    for (const [id, active] of [["reoAreaShow", area], ["reoLengthsShow", !area]]) { $(id).classList.toggle("active", active); $(id).setAttribute("aria-pressed", String(active)); }
    if (updateUrl) { const url = new URL(location.href); url.searchParams.set("reinforcement", area ? "area" : "lengths"); history.replaceState(null, "", url); }
  }
  $("reoAreaShow").addEventListener("click", () => show(true));
  $("reoLengthsShow").addEventListener("click", () => show(false));
  $("reoAreaSpacingMode").addEventListener("click", () => setMode("spacing"));
  $("reoAreaCountMode").addEventListener("click", () => setMode("count"));
  for (const id of ["reoAreaBar", "reoAreaSpacing", "reoAreaCount", "reoAreaLength", "reoAreaTarget", "reoAreaFilter"]) $(id).addEventListener($(id).tagName === "SELECT" ? "change" : "input", render);
  $("reoAreaCandidates").addEventListener("click", event => {
    const button = event.target.closest("button[data-reo-candidate]");
    if (!button) return;
    const candidate = candidates[Number(button.dataset.reoCandidate)];
    if (!candidate) return;
    $("reoAreaBar").value = candidate.bar;
    $(mode === "spacing" ? "reoAreaSpacing" : "reoAreaCount").value = String(candidate.amount);
    render();
  });
  render();
  show(new URLSearchParams(location.search).get("reinforcement") === "area", false);
})();
