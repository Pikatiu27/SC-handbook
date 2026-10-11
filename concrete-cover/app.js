(function () {
  'use strict';
  const data = globalThis.SCConcreteCoverData, model = globalThis.SCConcreteCoverModel, shared = globalThis.SCSectionTables;
  const panel = document.getElementById('coverPanel');
  if (!data || !model || !shared || !panel) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = (url, label, title = '') => `<a class="st-document-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer"${title ? ` title="${esc(title)}"` : ''}>${esc(label)}</a>`;
  const cols = model.columns(data), engine = shared.engine({ sections: data.rows }, cols), $ = id => document.getElementById(id);
  const exposureCols = model.exposureColumns(), exposureEngine = shared.engine({ sections: data.exposures }, exposureCols);
  panel.innerHTML = `<div class="tool-heading"><div><p class="kicker">AS 3600:2018 · Amendments 1 &amp; 2</p><h2>Concrete Cover &amp; Durability</h2></div><span class="tool-status">Public beta · For Review</span></div>
    <div class="section-catalogue-family-switch cover-view-tabs" role="tablist" aria-label="Concrete durability tables"><button type="button" class="section-catalogue-family-tab active" id="coverExposureTab" role="tab" data-cover-view="exposure" aria-selected="true" aria-controls="coverExposureView">Exposure classifications</button><button type="button" class="section-catalogue-family-tab" id="coverReferenceTab" role="tab" data-cover-view="cover" aria-selected="false" aria-controls="coverReferenceView" tabindex="-1">Concrete cover</button></div>
    <section id="coverExposureView" role="tabpanel" aria-labelledby="coverExposureTab"><section class="lookup-card st-catalogue cover-exposure-catalogue"><div class="st-table-heading"><div class="st-heading-copy"><h3 id="coverExposureTitle">Exposure classifications</h3><p class="st-axis-note">Selected examples; confirm each surface under Table 4.3 and Figure 4.3.</p></div><div class="st-heading-actions"><span id="coverExposureCount" role="status" aria-live="polite" aria-atomic="true"></span><button id="coverExposureReset" type="button">Reset</button></div></div>
    <p class="cover-boundary">Concrete exposure classes. Steel-coating corrosion categories use a separate system.</p><div id="coverExposureFilterBar" class="st-filter-bar" aria-label="Active exposure filters"></div><div class="st-scroll" id="coverExposureScroll" role="region" tabindex="0" aria-labelledby="coverExposureTitle" aria-describedby="coverExposureScrollCue"><table class="st-table cover-exposure-table"><caption class="st-sr-only">Selected AS 3600 environment examples and conditions. Not the complete Standard classification table or an automatic site classification.</caption><thead id="coverExposureHead"></thead><tbody id="coverExposureRows"></tbody></table></div><p class="st-scroll-cue" id="coverExposureScrollCue" hidden>Scroll across for all columns.</p><p class="st-legend">View cover opens references for the chosen class. Aggressive soils need Cl. 4.8 assessment; U requires project-specific requirements.</p></section></section>
    <section id="coverReferenceView" role="tabpanel" aria-labelledby="coverReferenceTab" hidden>
    <section class="lookup-card st-catalogue cover-catalogue"><div class="st-table-heading"><div class="st-heading-copy"><h3 id="coverTitle">Cover references</h3><p class="st-axis-note">Cover by surface; strength and curing by the member’s most severe exposure.</p></div><div class="st-heading-actions"><span id="coverCount" role="status" aria-live="polite" aria-atomic="true"></span><button id="coverReset" type="button">Reset</button></div></div>
    <p class="cover-boundary">Corrosion cover only. Residential footings: check ${link('https://store.standards.org.au/product/as-2870-2011', 'AS 2870')}. Placement, soil and fire requirements may govern.</p>
    <div id="coverFilterBar" class="st-filter-bar" aria-label="Active cover filters"></div><div class="st-scroll" id="coverScroll" role="region" tabindex="0" aria-labelledby="coverTitle" aria-describedby="coverScrollCue"><table class="st-table cover-table"><caption class="st-sr-only">Selected ordinary AS 3600 corrosion-cover references, initial curing and construction conditions. Not a final project cover specification.</caption><thead id="coverHead"></thead><tbody id="coverRows"></tbody></table></div><p class="st-scroll-cue" id="coverScrollCue" hidden>Scroll across for all columns.</p>
    <p class="st-legend">Ground rows include +10 mm (membrane) / +20 mm (direct). Curing: minimum days or strength route in Details. ≥50: strength band within Cl. 1.1.2. U: project assessment.</p>
    <section id="coverDetails" class="cover-details" aria-labelledby="coverDetailTitle" hidden><div class="st-detail-heading"><h3 id="coverDetailTitle"></h3><button id="coverClose" type="button">Close details</button></div><div id="coverDetailBody"></div></section></section></section>
    <details class="source-card cover-disclosure"><summary><span><b>Scope &amp; sources</b><small>Coverage, casting conditions and source links</small></span><i>+</i></summary><div class="cover-source-body">
    <p><b>Basis:</b> ${link(data.source.url, 'AS 3600:2018')} + ${link('https://store.standards.org.au/product/as-3600-2018-amd-1-2018', 'Amd 1:2018')} + ${link('https://store.standards.org.au/product/as-3600-2018-amd-2-2021', 'Amd 2:2021')}. Tables 4.3–4.4, 4.10.3.2–3; Cl. 4.3, 4.10.3.4–5. Publisher: Pending Revision, checked 12 Oct 2026.</p>
    <p><b>Applicability:</b> reinforced / prestressed building concrete within Cl. 1.1.2: f′c 20–120 MPa, SSD density 1,800–2,800 kg/m³ and the specified reinforcement classes. Reference design life: 50 years ±20% (Cl. 4.1).</p>
    <div class="cover-guide-scroll"><table class="cover-guide-table cover-coverage-table"><caption class="st-sr-only">Common situations covered by this lookup and conditions requiring separate checks.</caption><thead><tr><th scope="col">Situation</th><th scope="col">Coverage / condition</th></tr></thead><tbody>
    <tr><th scope="row">Formed surfaces</th><td>Use standard rows for standard forms and compaction. Controlled rigid forms need repetitive procedures, demonstrated process control and supervision.</td></tr>
    <tr><th scope="row">Unformed / screeded</th><td>Use standard rows for unformed rigid-route and screeded SCC surfaces.</td></tr>
    <tr><th scope="row">Ground contact</th><td>Non-aggressive ground: standard rows +10 mm with a damp-proof membrane, +20 mm otherwise. Blinding alone does not establish the membrane condition.</td></tr>
    <tr><th scope="row">Saline / aggressive soil</th><td>Assess soil chemistry and groundwater under Cl. 4.8; those requirements are not included here.</td></tr>
    <tr><th scope="row">Residential footings</th><td>Apply ${link('https://store.standards.org.au/product/as-2870-2011', 'AS 2870:2011')} where relevant; it takes precedence over AS 3600 in conflicts (Cl. 1.2). Specific cover rules are not tabulated here.</td></tr>
    <tr><th scope="row">Piles / specialist structures</th><td>Check the governing project Standard and durability specification separately.</td></tr>
    <tr><th scope="row">Final project cover</th><td>Also check placement / compaction (Cl. 4.10.2), fire (Section 5), tolerances and detailing. Fire axis distance is not clear cover.</td></tr>
    </tbody></table></div>
    <p><b>Curing:</b> Table 4.4 permits the listed duration or its average stripping / demoulding strength route; Cl. 17.1.5.1 still applies. B2, C1 and C2 require special-class concrete including exposure and concrete-quality limits in the specification (Cl. 4.4).</p>
    <p><b>Excluded:</b> Cl. 4.3.2 single-face concessions, interpolation, coating reductions, other design lives, abrasion, freeze–thaw, chemical content / AAR, crack control, anchorage and spun products. U requires a project durability assessment.</p>
    <p><b>Adoption:</b> ${link('https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/2-referenced-documents/referenced-documents', 'NCC 2022 references')} list this amended edition. Confirm the applicable NCC and state / territory adoption for the project.</p>
    <p>Practical guidance: ${link('https://ccaa.com.au/resources/guide-to-concrete-construction/', 'CCAA 2020 guide')} · ${link('https://ccaa.com.au/wp-content/uploads/2026/08/PART_V_-_15_-_CURING_GTCC_2020.pdf', 'Curing guide')}. Supporting guidance; the Standard and its amendments govern.</p></div></details>`;
  let selected = null, savedScroll = { top: 0, left: 0 }, activeView = 'exposure';
  const viewScroll = { exposure: { top: 0, left: 0 }, cover: { top: 0, left: 0 } };
  const procedure = row => data.procedures.find(p => p.key === row.procedure);
  function heading() {
    $('coverHead').innerHTML = '<tr>' + cols.map((c, i) => `<th scope="col" class="${i === 0 ? 'st-identity' : c.numeric ? 'st-num' : c.key === 'source' ? 'st-source-col' : ''}"><button type="button" class="st-header-control" data-st-column="${c.key}" aria-haspopup="dialog" aria-expanded="false" aria-label="${esc(c.label.replace(/<[^>]+>/g, ''))}${c.unit ? ' (' + esc(c.unit) + ')' : ''}: filter or sort"><span class="st-header-name"><span>${c.label}</span><span class="st-filter-icon" aria-hidden="true">▾</span></span><small>${c.unit || '&nbsp;'}</small></button></th>`).join('') + '<th scope="col" class="st-action-col">Details</th></tr>';
  }
  function overflow() {
    for (const prefix of ['cover', 'coverExposure']) $(prefix + 'ScrollCue').hidden = $(prefix + 'Scroll').scrollWidth <= $(prefix + 'Scroll').clientWidth + 1;
  }
  function render() {
    const rows = engine.apply(data.rows);
    $('coverCount').textContent = `${rows.length} / ${data.rows.length} rows`;
    $('coverRows').innerHTML = rows.length ? rows.map(row => `<tr data-cover-row="${esc(row.id)}"${selected === row.id ? ' class="st-selected"' : ''}>` + cols.map((c, i) => {
      const value = engine.text(row, c.key), tag = i === 0 ? 'th' : 'td';
      let content = c.key === 'source' ? link(data.source.url, value, `AS 3600:2018 + Amd 1 & 2; ${row.cover === null ? 'Cl. 4.5' : 'Table ' + procedure(row).table}${row.adjustment ? '; Cl. 4.10.3.5; derived +' + row.adjustment + ' mm' : ''}`) : esc(value);
      if (c.key === 'exposure' && row.cover === null) content += '<small>Review</small>';
      const title = c.key === 'concreteClass' ? row.concreteClass : c.key === 'cover' && row.adjustment ? `${row.baseCover} + ${row.adjustment} = ${row.cover} mm; Cl. 4.10.3.5` : '';
      return `<${tag}${i === 0 ? ' scope="row"' : ''}${title ? ` title="${esc(title)}"` : ''} class="${i === 0 ? 'st-identity' : c.numeric ? 'st-num' : c.key === 'source' ? 'st-source-col' : ''}${c.numeric && row[c.key] === null ? ' st-unavailable' : ''}">${content}</${tag}>`;
    }).join('') + `<td class="st-action-col"><button type="button" data-cover-detail="${esc(row.id)}" aria-expanded="${selected === row.id}" aria-controls="coverDetails" aria-label="Details: ${esc(row.exposure + ', ' + procedure(row).label + ', ' + row.strengthBand + (row.strength === null ? '' : ' MPa'))}">Details</button></td></tr>`).join('') : `<tr><td colspan="${cols.length + 1}" class="st-empty">No matching references. Clear a column filter or Reset.</td></tr>`;
    filters.decorate(); overflow();
  }
  function closeDetails(restore = false) {
    const id = selected; selected = null; $('coverDetails').hidden = true;
    if (restore) { render(); $('coverScroll').scrollTop = savedScroll.top; $('coverScroll').scrollLeft = savedScroll.left; panel.querySelector(`[data-cover-detail="${id}"]`)?.focus({ preventScroll: true }); }
  }
  const filters = globalThis.SCSectionHeaderFilters.mount({ panel, head: $('coverHead'), bar: $('coverFilterBar'), getEngine: () => engine, rows: () => data.rows, idPrefix: 'cover', resetButton: $('coverReset'), onChange: () => { closeDetails(); $('coverScroll').scrollTop = 0; render(); }, onReset: () => { closeDetails(); engine.reset(); render(); $('coverScroll').scrollTop = 0; $('coverScroll').scrollLeft = 0; } });
  function resetExposures() { exposureEngine.reset(); renderExposures(); $('coverExposureScroll').scrollTop = 0; $('coverExposureScroll').scrollLeft = 0; }
  const exposureFilters = globalThis.SCSectionHeaderFilters.mount({ panel, head: $('coverExposureHead'), bar: $('coverExposureFilterBar'), getEngine: () => exposureEngine, rows: () => data.exposures, idPrefix: 'coverExposure', resetButton: $('coverExposureReset'), onChange: () => { $('coverExposureScroll').scrollTop = 0; renderExposures(); }, onReset: resetExposures });
  $('coverExposureHead').innerHTML = '<tr>' + exposureCols.map((c, i) => `<th scope="col" class="${i === 0 ? 'st-identity' : c.key === 'source' ? 'st-source-col' : ''}"><button type="button" class="st-header-control" data-st-column="${c.key}" aria-haspopup="dialog" aria-expanded="false"><span class="st-header-name"><span>${c.label}</span><span class="st-filter-icon" aria-hidden="true">▾</span></span></button></th>`).join('') + '<th scope="col" class="st-action-col">Cover</th></tr>';
  function renderExposures() {
    const rows = exposureEngine.apply(data.exposures);
    $('coverExposureCount').textContent = `${rows.length} / ${data.exposures.length} classes`;
    $('coverExposureRows').innerHTML = rows.length ? rows.map(row => '<tr data-cover-exposure-row="' + row.exposure + '">' + exposureCols.map((col, i) => {
      const tag = i === 0 ? 'th' : 'td', content = col.key === 'source' ? link(data.source.url, exposureEngine.text(row, col.key), 'AS 3600:2018 + Amd 1 & 2; Table 4.3, notes and Figure 4.3; PDF pp. 62–64 / printed pp. 59–61' + (row.exposure === 'U' ? '; Cl. 4.5' : '')) : esc(exposureEngine.text(row, col.key));
      return `<${tag}${i === 0 ? ' scope="row"' : ''} class="${i === 0 ? 'st-identity' : col.key === 'source' ? 'st-source-col' : ''}">${content}${i === 0 && row.exposure === 'U' ? '<small>Review</small>' : ''}</${tag}>`;
    }).join('') + `<td class="st-action-col"><button type="button" data-cover-for-exposure="${row.exposure}" aria-label="View cover references for AS 3600 exposure ${row.exposure}" title="Show ${row.exposure} references; replace cover filters">View cover</button></td></tr>`).join('') : '<tr><td colspan="5" class="st-empty">No matching classes. Clear a column filter or Reset.</td></tr>';
    exposureFilters.decorate(); overflow();
  }
  function setView(view, focus = false) {
    if (!['exposure', 'cover'].includes(view)) return;
    const previousScroll = $(activeView === 'exposure' ? 'coverExposureScroll' : 'coverScroll');
    viewScroll[activeView] = { top: previousScroll.scrollTop, left: previousScroll.scrollLeft };
    filters.close(false); exposureFilters.close(false); closeDetails();
    $('coverExposureView').hidden = view !== 'exposure'; $('coverReferenceView').hidden = view !== 'cover';
    panel.querySelectorAll('[data-cover-view]').forEach(tab => { const active = tab.dataset.coverView === view; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; tab.classList.toggle('active', active); if (active && focus) tab.focus({ preventScroll: true }); });
    render(); renderExposures(); activeView = view;
    const nextScroll = $(view === 'exposure' ? 'coverExposureScroll' : 'coverScroll');
    nextScroll.scrollTop = viewScroll[view].top; nextScroll.scrollLeft = viewScroll[view].left; overflow();
  }
  panel.querySelector('.cover-view-tabs').addEventListener('click', event => { const tab = event.target.closest('[data-cover-view]'); if (tab) setView(tab.dataset.coverView); });
  panel.querySelector('.cover-view-tabs').addEventListener('keydown', event => {
    const tab = event.target.closest('[data-cover-view]'); if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault(); setView(event.key === 'Home' ? 'exposure' : event.key === 'End' ? 'cover' : tab.dataset.coverView === 'exposure' ? 'cover' : 'exposure', true);
  });
  $('coverExposureReset').addEventListener('click', () => { exposureFilters.close(false); resetExposures(); });
  $('coverExposureRows').addEventListener('click', event => {
    const button = event.target.closest('[data-cover-for-exposure]'); if (!button) return;
    engine.reset(); engine.set('exposure', { values: [button.dataset.coverForExposure] });
    viewScroll.cover = { top: 0, left: 0 };
    $('coverScroll').scrollTop = 0; $('coverScroll').scrollLeft = 0; setView('cover'); $('coverReferenceTab').focus({ preventScroll: true });
  });
  $('coverReset').addEventListener('click', () => { filters.close(false); closeDetails(); engine.reset(); render(); $('coverScroll').scrollTop = 0; $('coverScroll').scrollLeft = 0; });
  $('coverRows').addEventListener('click', e => {
    const button = e.target.closest('[data-cover-detail]'); if (!button) return;
    const row = data.rows.find(r => r.id === button.dataset.coverDetail), p = procedure(row);
    savedScroll = { top: $('coverScroll').scrollTop, left: $('coverScroll').scrollLeft }; selected = row.id;
    $('coverDetailTitle').textContent = `${row.exposure} · ${p.label} · ${row.strengthBand}${row.strength === null ? '' : ' MPa'}`;
    const body = row.cover === null ? '<p><b>Review required.</b> Class U has no generic strength, cover or curing value. Specify durability requirements for the actual environment under Cl. 4.5; no numeric result is adopted.</p>' : `<dl><div><dt>Corrosion-cover reference</dt><dd>${row.cover} mm · ${esc(row.status)}</dd></div><div><dt>Construction condition</dt><dd>${esc(p.condition)}</dd></div><div><dt>Value basis</dt><dd>${esc(p.basis)}${row.adjustment ? `: ${row.baseCover} + ${row.adjustment} = ${row.cover} mm` : `; Table ${p.table}, ${row.baseCover} mm`}</dd></div><div><dt>Concrete quality</dt><dd>Listed exposure: f′c ≥ ${row.minStrength} MPa${row.concreteClass === 'Special required' ? '; special-class concrete under AS 1379' : ''}. The member’s most severe surface may require a higher class.</dd></div><div><dt>Curing route</dt><dd>Continuous initial curing ≥ ${row.curing} days, subject to Cl. 17.1.5.1; alternatively, average strength at stripping / demoulding ≥ ${row.stripping} MPa under Table 4.4.</dd></div><div><dt>Exact locator</dt><dd>AS 3600:2018 + Amd 1 &amp; 2, Table ${p.table} · PDF p. ${p.page} / printed p. ${p.page - 3}${row.adjustment ? '; Cl. 4.10.3.5 · PDF p. 70 / printed p. 67' : ''}; Table 4.4 · PDF p. 65 / printed p. 62.</dd></div></dl>`;
    $('coverDetailBody').innerHTML = body + '<p class="cover-detail-boundary">This reference is not final nominal cover. Confirm placement, aggressive-ground, fire, tolerance and project detailing requirements.</p>';
    $('coverDetails').hidden = false; render(); $('coverScroll').scrollTop = savedScroll.top; $('coverScroll').scrollLeft = savedScroll.left; $('coverDetails').scrollIntoView({ block: 'nearest' }); $('coverClose').focus({ preventScroll: true });
  });
  $('coverClose').addEventListener('click', () => closeDetails(true));
  new ResizeObserver(overflow).observe($('coverScroll'));
  new ResizeObserver(overflow).observe($('coverExposureScroll'));
  heading(); render(); renderExposures(); setView('exposure');
})();
