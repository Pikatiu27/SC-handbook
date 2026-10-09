(function () {
  "use strict";
  const data = globalThis.ConcreteAnchorData, lookup = globalThis.ConcreteAnchorLookup;
  const mount = document.getElementById("concreteAnchorMount");
  if (!data || !lookup || !mount) return;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  mount.innerHTML = `
    <section class="lookup-card ca-card">
      <nav class="branch-tabs ca-types" aria-label="Anchor type">
        <button class="branch-tab active" type="button" data-ca-type="mechanical" aria-pressed="true">Mechanical anchors</button>
        <button class="branch-tab" type="button" data-ca-type="chemical" aria-pressed="false">Chemical anchors</button>
      </nav>
      <p class="ca-intro">Selected AU profiles. Compare installation parameters; open Details for conditions.</p>
      <div class="input-group ca-filter-group"><div class="input-group-fields ca-filters">
        <label><span>Manufacturer</span><select id="caManufacturer"><option value="">All manufacturers</option></select></label>
        <label><span>Nominal size</span><select id="caSize"><option value="">All sizes</option></select></label>
        <label><span>Keyword</span><input id="caKeyword" type="search" placeholder="Product, finish or profile" autocomplete="off"></label>
        <button id="caReset" class="ca-reset" type="button">Reset</button>
      </div></div>
      <div class="ca-table-heading"><h3 id="caTableTitle">Mechanical installation profiles</h3><span id="caCount" role="status" aria-live="polite" aria-atomic="true"></span></div>
      <p id="caTableHelp" class="ca-help">Dimensions in mm; torque in Nm. Each edge / spacing minimum retains its own condition.</p>
      <div id="caScroll" class="ca-table-wrap" role="region" tabindex="0" aria-labelledby="caTableTitle" aria-describedby="caTableHelp caScrollHint">
        <table id="caTable">
          <caption class="visually-hidden">Manufacturer installation profiles. Geometry only; minimum layout is not a resistance check.</caption>
          <thead><tr>
            <th scope="col" class="ca-product">Product / profile</th><th scope="col">Size</th><th scope="col">Finish / rod</th>
            <th scope="col" class="ca-number">Drill Ø<small>mm · d₀</small></th>
            <th scope="col" class="ca-number">Embedment<small>mm · hₑf</small></th>
            <th scope="col" class="ca-number">Hole depth<small>mm</small></th>
            <th scope="col" class="ca-number">Torque<small>Nm · basis below</small></th>
            <th scope="col" class="ca-number">Min. edge<small>mm · c</small></th>
            <th scope="col" class="ca-number">Min. spacing<small>mm · s</small></th>
            <th scope="col" class="ca-number">Min. concrete<small>mm · thickness</small></th>
            <th scope="col" class="ca-documents">Documents</th>
          </tr></thead><tbody id="caBody"></tbody>
        </table>
      </div>
      <p id="caScrollHint" class="ca-scroll-hint"></p>
      <p class="ca-boundary">Installation parameters only. Verify the supplied variant and current instructions; anchor resistance and project suitability are not evaluated.</p>
    </section>
    <details class="source-card ca-coverage"><summary><span><b>Coverage &amp; sources</b></span><i>+</i></summary><div class="ca-coverage-body">
      <p>Six families from two manufacturers, checked ${esc(data.checkedDate)}. Selected configurations only; not a complete Australian catalogue. AU product-page presence does not establish usage frequency or stock.</p>
      <p>hₑf is effective embedment; d₀ is drill diameter. Size denotes thread size or nominal screw diameter. Minimum edge and spacing retain separate prerequisites. Torque basis is shown per row; screw connection-thread torque and impact-tool limits are different quantities.</p>
      <p>Some substrate requirements are retained as source expressions. Chemical cure time depends on resin and substrate temperature and hole condition; use the linked assessment and supplied instructions. “See ETA” means the torque depends on the supplied screw variant.</p>
      <p>AS 5216 is manufacturer-cited design context. This lookup does not verify Standard compliance or fire/seismic acceptance. Product pages and dated parameter sources are kept separate.</p>
      <ul id="caSources"></ul>
      <h4>AU coverage gaps</h4>
      <p>Official AU ranges checked on ${esc(data.checkedDate)}; parameters for these ranges are not yet included:</p>
      <ul id="caCoverageGaps"></ul>
    </div></details>`;
  const $ = id => document.getElementById(id);
  let type = "mechanical";
  let expandedId = null;
  const link = (url, label, title) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer"${title ? ` title="${esc(title)}"` : ""}>${esc(label)}</a>`;
  const note = text => text ? `<small class="ca-cell-note">${esc(text)}</small>` : "";
  function cell(value, annotation = "") {
    return `<td class="ca-number">${value === null || value === undefined ? '<span class="ca-missing">Not stated</span>' : esc(value)}${note(annotation)}</td>`;
  }
  function details(row) {
    const source = data.sources[row.source];
    return `<tr id="ca-detail-${esc(row.id)}" class="ca-detail-row"${expandedId === row.id ? "" : " hidden"}><td colspan="11"><div class="ca-detail-grid">
      <section><h4>Application &amp; installation</h4><p><b>${esc(row.manufacturer)} · ${esc(row.product)} · ${esc(row.sizeLabel)} · h = ${esc(row.depth)} mm</b></p><p>${esc(row.mechanism)} · ${esc(row.concrete)} concrete · ${esc(row.finish)}</p><p>${esc(row.conditions)}</p><button type="button" class="ca-detail-toggle" data-ca-close="${esc(row.id)}">Close details</button></section>
      <section><h4>Source basis</h4><p>${esc(source.title)}<br>${esc(source.revision)}<br>${esc(source.pages)}</p><p>${esc(source.assessment)}</p><p>Catalogue · author checked ${esc(data.checkedDate)}. Independent engineering acceptance remains open.</p><p>${link(source.product, "AU product & documents", `${row.product} manufacturer product page`)}</p></section>
    </div></td></tr>`;
  }
  function render() {
    const all = data.rows.filter(row => row.type === type);
    const rows = lookup.filterRows(data.rows, {type, manufacturer: $("caManufacturer").value, size: $("caSize").value, keyword: $("caKeyword").value});
    if (!rows.some(row => row.id === expandedId)) expandedId = null;
    $("caTableTitle").textContent = `${type === "mechanical" ? "Mechanical" : "Chemical"} installation profiles`;
    const familyCount = new Set(rows.map(row => row.product)).size;
    $("caCount").textContent = `${rows.length} of ${all.length} profiles · ${familyCount} ${familyCount === 1 ? "family" : "families"}`;
    $("caBody").innerHTML = rows.length ? rows.map((row, i) => {
      const source = data.sources[row.source];
      const torque = row.torque === null ? row.torqueText : row.torque;
      const groupStart = i > 0 && rows[i - 1].product !== row.product;
      const profileLabel = row.profile === "Minimum-depth profile" ? "Min. depth" : row.profile;
      return `<tr class="ca-data-row${i % 2 ? " ca-stripe" : ""}${groupStart ? " ca-group-start" : ""}" data-ca-id="${esc(row.id)}">
        <th scope="row" class="ca-product">${esc(row.product)}${note(`${row.manufacturer} · ${row.mechanism.replace(" + threaded rod", "")}`)}${note(profileLabel ? `${row.concrete} · ${profileLabel}` : row.concrete)}${row.source === "hst3" ? note("FTM 2023") : ""}</th>
        <td class="ca-size">${esc(row.sizeLabel)}</td><td class="ca-finish">${esc(row.finish)}</td>
        ${cell(row.hole)}${cell(row.depth, row.depthBasis === "Effective" ? "" : row.depthBasis)}${cell(row.drillDepth, row.drillNote === "Published depth" ? "Published" : row.drillNote)}${cell(torque, row.torqueBasis)}
        ${cell(row.edge, /^(?:SARB |ETA )?minimum$/i.test(row.edgeNote) ? "" : row.edgeNote)}${cell(row.spacing, /^(?:SARB |ETA )?minimum$/i.test(row.spacingNote) ? "" : row.spacingNote)}${cell(row.substrate, row.substrateNote)}
        <td class="ca-documents"><div class="ca-document-links">${link(source.url + `#page=${source.page}`, source.url === source.eta ? "ETA" : "Sheet", `${source.title} · ${source.pages}`)}${source.eta && source.eta !== source.url ? link(source.eta, "ETA", source.assessment) : link(source.product, "Product", `${row.product} AU product page`)}</div><button type="button" class="ca-detail-toggle" data-ca-detail="${esc(row.id)}" aria-expanded="${expandedId === row.id}" aria-controls="ca-detail-${esc(row.id)}" aria-label="${esc(`Details: ${row.product}, ${row.sizeLabel}, embedment ${row.depth} mm, ${row.finish}`)}">${expandedId === row.id ? "Close details" : "Details"}</button></td>
      </tr>${details(row)}`;
    }).join("") : '<tr><td colspan="11" class="ca-empty">No matching profiles. <button type="button" data-ca-clear>Clear filters</button></td></tr>';
    updateScroll();
  }
  function populateFilters() {
    const rows = data.rows.filter(row => row.type === type);
    const maker = $("caManufacturer").value, size = $("caSize").value;
    $("caManufacturer").innerHTML = '<option value="">All manufacturers</option>' + [...new Set(rows.map(row => row.manufacturer))].sort().map(value => `<option>${esc(value)}</option>`).join("");
    $("caSize").innerHTML = '<option value="">All sizes</option>' + [...new Set(rows.map(row => row.size))].sort((a,b) => a-b).map(value => `<option value="${value}">${value} mm</option>`).join("");
    $("caManufacturer").value = [...$("caManufacturer").options].some(o => o.value === maker) ? maker : "";
    $("caSize").value = [...$("caSize").options].some(o => o.value === size) ? size : "";
  }
  function reset() {
    $("caManufacturer").value = ""; $("caSize").value = ""; $("caKeyword").value = "";
    expandedId = null; render(); $("caScroll").scrollLeft = 0;
  }
  function updateScroll() {
    const wrap = $("caScroll");
    $("caScrollHint").textContent = wrap.scrollWidth > wrap.clientWidth + 1 ? "Scroll across for all parameters and documents." : "";
  }
  mount.querySelectorAll("[data-ca-type]").forEach(button => button.addEventListener("click", () => {
    type = button.dataset.caType; expandedId = null;
    mount.querySelectorAll("[data-ca-type]").forEach(b => { const active = b === button; b.classList.toggle("active", active); b.setAttribute("aria-pressed", String(active)); });
    populateFilters(); render(); $("caScroll").scrollLeft = 0;
  }));
  ["caManufacturer", "caSize"].forEach(id => $(id).addEventListener("change", render));
  $("caKeyword").addEventListener("input", render); $("caReset").addEventListener("click", reset);
  $("caBody").addEventListener("click", event => {
    if (event.target.closest("[data-ca-clear]")) { reset(); $("caKeyword").focus(); return; }
    const button = event.target.closest("[data-ca-detail], [data-ca-close]");
    if (!button) return;
    const id = button.dataset.caDetail || button.dataset.caClose;
    const mainButton = [...mount.querySelectorAll("[data-ca-detail]")].find(b => b.dataset.caDetail === id);
    if (expandedId && expandedId !== id) {
      $("ca-detail-" + expandedId).hidden = true;
      const previous = [...mount.querySelectorAll("[data-ca-detail]")].find(b => b.dataset.caDetail === expandedId);
      previous.setAttribute("aria-expanded", "false"); previous.textContent = "Details";
    }
    expandedId = expandedId === id ? null : id;
    $("ca-detail-" + id).hidden = expandedId !== id;
    mainButton.setAttribute("aria-expanded", String(expandedId === id)); mainButton.textContent = expandedId === id ? "Close details" : "Details";
    if (expandedId === id) {
      $("caScroll").scrollLeft = 0;
      $("ca-detail-" + id).querySelector("[data-ca-close]").focus({preventScroll:true});
    } else if (button.dataset.caClose) mainButton.focus();
  });
  $("caSources").innerHTML = Object.values(data.sources).map(source => `<li>${link(source.url + `#page=${source.page}`, source.title)} — ${esc(source.revision)}; ${esc(source.pages)}.</li>`).join("");
  $("caCoverageGaps").innerHTML = data.coverageGaps.map(item => `<li>${link(item.url, item.label)} — ${esc(item.scope)}</li>`).join("");
  new ResizeObserver(updateScroll).observe($("caScroll"));
  populateFilters(); render();
})();
