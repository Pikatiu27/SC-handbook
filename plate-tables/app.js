(function () {
  'use strict';
  const model = globalThis.SCPlateTables, directory = globalThis.SCPlateCatalogue;
  const sectionModel = globalThis.SCSectionTables, bridge = globalThis.SCSectionTableBridge;
  if (!model || !directory || !sectionModel || !bridge) throw Error('Plate lookup dependencies unavailable.');
  const panel = document.getElementById('propertiesPanel'), tabs = document.getElementById('sectionCatalogueFamilyTabs');
  const cluster = panel.querySelector('.input-cluster');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const area = document.createElement('section'); area.id = 'plateCatalogue'; area.className = 'st-catalogue plate-catalogue'; area.hidden = true;
  area.innerHTML = '<div class="st-table-heading"><div class="st-heading-copy"><h3 id="plateTitle">Plain steel plates</h3><p class="st-axis-note">Listed sizes · theoretical mass · confirm supply</p></div><div class="st-heading-actions"><span id="plateCount" role="status" aria-live="polite"></span><button type="button" id="plateReset">Reset</button></div></div><div class="st-filter-bar" id="plateFilterBar" aria-label="Active plate filters"></div><div class="st-scroll" id="plateScroll" role="region" aria-labelledby="plateTitle" tabindex="0"><table class="st-table plate-table" data-family="plate"><caption class="st-sr-only">Australian catalogue plain-plate dimensions and theoretical mass. Grade labels identify products, not design yield stresses.</caption><thead id="plateHead"></thead><tbody id="plateRows"></tbody></table></div><p class="st-scroll-cue" id="plateScrollCue" hidden>Scroll across for all columns.</p><p class="st-legend">Nominal mass at 7,850 kg/m³; excludes tolerances and coatings. Grade sheet links are BlueScope references.</p><section class="plate-details" id="plateDetails" aria-labelledby="plateDetailTitle" hidden><div class="st-detail-heading"><h3 id="plateDetailTitle"></h3><button type="button" id="plateCloseDetails">Close details</button></div><div id="plateDetailBody"></div></section><details class="source-card st-coverage"><summary><span><b>Catalogue scope</b><small>Standards, coverage and mass basis</small></span><i>+</i></summary><div class="source-body"><p>BlueScope sheets cite AS/NZS 3678:2016 for Flat 250/350 and AS/NZS 1594:2002 (R2016) for HA250/HA350. <a class="st-document-link" href="https://store.standards.org.au/product/as-nzs-1594-2025" target="_blank" rel="noopener noreferrer">AS/NZS 1594:2025</a> supersedes the 2002 edition; confirm the supplied product’s certification. Grade labels are not design yield stresses.</p><p>Listed sizes from InfraBuild (March 2025, pp. 48–50, 52–53) and Southern Steel (October 2025, printed p. 33). Flat 250: 5–150 mm; Flat 350: 5–100 mm; TRU-SPEC HA250: 3–12 mm; HA350: 5–8 mm. This table is not a complete Australian stock list.</p><p>Theoretical mass uses nominal thickness × width × length × 7,850 kg/m³. No rolling allowance is applied. Details retain original published entries and source issues. Catalogue dimensions do not confirm current stock, the supplied brand, batch certification or design suitability.</p><p><a class="st-document-link" href="https://orrcon-static-assets.s3.ap-southeast-2.amazonaws.com/s3fs-public/2024-10/Orrcon-DIST-National-Product-Catalogue.pdf#page=48" target="_blank" rel="noopener noreferrer">Orrcon 2024</a> · plain-plate area-mass cross-check, Section 2.8.1.</p><p>Other supplier thicknesses, such as 22, 65 and 75 mm, are listed by Orrcon without sheet lengths. No size combinations are inferred. Floorplate, coated sheet, stainless, aluminium and specialist plate are outside this table.</p><p><a class="st-document-link" href="https://www.bluescopesteel.com.au/products/xlerplate-steel-structural-products" target="_blank" rel="noopener noreferrer">XLERPLATE range</a> · <a class="st-document-link" href="https://www.bluescopesteel.com.au/products/tru-spec-steel" target="_blank" rel="noopener noreferrer">TRU-SPEC range</a> · <a class="st-document-link" href="https://www.bluescopesteel.com.au/xlerplate-app" target="_blank" rel="noopener noreferrer">Mill size schedule</a></p><p>BlueScope lists HA250 at 3–16 mm and HA350 at 3–12.7 mm; not every size combination is available. Flat ranges exceed the listed stock combinations: Flat 250 above 115 mm and Flat 350 above 80 mm by enquiry. Check stock and exact thickness/width/length combinations with the supplier.</p><p>Sources rechecked 11 October 2026. Public beta · For Review.</p></div></details>';
  cluster.append(area);
  const button = document.createElement('button'); button.type = 'button'; button.className = 'section-catalogue-family-tab';
  button.dataset.plateFamily = 'plate'; button.textContent = 'Plate'; button.title = 'Plain steel plates'; button.setAttribute('aria-label', 'Plate — Plain steel plates'); button.setAttribute('aria-pressed', 'false');
  tabs.querySelector('[data-section-category-custom]')?.before(button);
  if (!button.isConnected) tabs.append(button);
  const $ = id => document.getElementById(id), rows = directory.rows;
  const engine = sectionModel.engine('plate', model.definitions);
  let active = false, selected = '', savedTop = 0, savedLeft = 0;
  const originalStatus = panel.querySelector('.tool-status').innerHTML;
  const link = (url, label, title) => `<a class="st-document-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" title="${esc(title)}" aria-label="${esc(title)} (opens in new tab)">${esc(label)}</a>`;
  const locator = row => row.sourcePrintedPage ? `PDF p. ${row.sourcePage} · printed p. ${row.sourcePrintedPage}` : `p. ${row.sourcePage}`;
  const catalogueLink = row => { const source = model.source(row); return link(`${source.url}#page=${row.sourcePage}`, source.label, `${source.title}, ${locator(row)}; dimensions`); };
  function closeDetails(restore = false) {
    const origin = [...area.querySelectorAll('[data-plate-details]')].find(b => b.dataset.plateDetails === selected);
    selected = ''; $('plateDetails').hidden = true;
    area.querySelectorAll('[data-plate-details]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    area.querySelectorAll('tr.st-selected').forEach(row => row.classList.remove('st-selected'));
    if (restore && origin) { origin.focus({ preventScroll: true }); origin.scrollIntoView({ block: 'nearest' }); }
  }
  function overflow() { $('plateScrollCue').hidden = $('plateScroll').scrollWidth <= $('plateScroll').clientWidth + 1; }
  function render() {
    const shown = engine.apply(rows);
    $('plateCount').textContent = `${shown.length} / ${rows.length} sizes`;
    const header = col => `<button type="button" class="st-header-control" data-st-column="${esc(col.key)}" aria-haspopup="dialog" aria-controls="plateColumnFilter" aria-expanded="false"><span class="st-header-name"><span>${col.label}</span><span class="st-filter-icon" aria-hidden="true">▾</span></span><small${col.unit ? '' : ' aria-hidden="true"'}>${col.unit || '&nbsp;'}</small></button>`;
    $('plateHead').innerHTML = '<tr>' + model.definitions.map(col => `<th scope="col" class="${col.key === 'product' ? 'st-identity' : col.numeric ? 'st-num' : col.key === 'source' || col.key === 'datasheet' ? 'st-source-col' : 'plate-grade'}">${header(col)}</th>`).join('') + '<th scope="col" class="st-action-col">Details</th></tr>';
    $('plateRows').innerHTML = shown.length ? shown.map(row => {
      const masses = model.mass(row), sheet = model.datasheets[row.datasheetKey];
      const content = col => col.key === 'source' ? catalogueLink(row) : col.key === 'datasheet' ? sheet ? link(sheet.url, sheet.label, sheet.title) : 'Not available' : col.key === 'areaMass' ? model.formatMass(masses?.areaMass, 2) : col.key === 'plateMass' ? model.formatMass(masses?.plateMass, 1) : esc(engine.text(row, col.key));
      return `<tr data-plate-row="${esc(row.id)}">${model.definitions.map(col => `<${col.key === 'product' ? 'th scope="row"' : 'td'} class="${col.key === 'product' ? 'st-identity' : col.numeric ? 'st-num' : col.key === 'source' || col.key === 'datasheet' ? 'st-source-col' : 'plate-grade'}">${content(col)}</${col.key === 'product' ? 'th' : 'td'}>`).join('')}<td class="st-action-col"><button type="button" data-plate-details="${esc(row.id)}" aria-controls="plateDetails" aria-expanded="false" aria-label="Details for ${esc(row.product)} ${esc(row.grade)}, ${row.t} × ${row.width} × ${row.length} mm">Details</button></td></tr>`;
    }).join('') : `<tr><td colspan="10" class="st-empty">No matching plates. <button type="button" data-plate-clear>Clear filters</button></td></tr>`;
    if (selected && !shown.some(row => row.id === selected)) closeDetails();
    if (selected) { const origin = area.querySelector(`[data-plate-details="${selected}"]`); origin.setAttribute('aria-expanded', 'true'); origin.closest('tr').classList.add('st-selected'); }
    menus.decorate(); overflow();
  }
  function reset() { engine.reset(); closeDetails(); savedTop = 0; savedLeft = 0; render(); $('plateScroll').scrollTop = 0; $('plateScroll').scrollLeft = 0; }
  const menus = globalThis.SCSectionHeaderFilters.mount({ panel, head: $('plateHead'), bar: $('plateFilterBar'), getEngine: () => engine, rows: () => rows,
    onChange: () => { $('plateScroll').scrollTop = 0; render(); }, onReset: reset, idPrefix: 'plate', resetButton: $('plateReset') });
  function enter() {
    if (bridge.mode() === 'custom') panel.querySelector('[data-section-properties-mode="catalogue"]').click();
    if (active) return;
    panel.querySelector('.st-column-filter[open]')?.close();
    panel.querySelector('#stBack:not([hidden])')?.click();
    active = true; panel.classList.add('plate-active'); area.hidden = false;
    tabs.querySelectorAll('button').forEach(b => { const chosen = b === button; b.classList.toggle('active', chosen); b.setAttribute('aria-pressed', String(chosen)); });
    panel.querySelector('.tool-status').textContent = 'For Review · Public beta';
    render(); $('plateScroll').scrollTop = savedTop; $('plateScroll').scrollLeft = savedLeft;
  }
  function leave() {
    if (!active) return;
    menus.close(false); active = false; area.hidden = true; panel.classList.remove('plate-active'); button.classList.remove('active'); button.setAttribute('aria-pressed', 'false');
    panel.querySelector('.tool-status').innerHTML = originalStatus;
  }
  tabs.addEventListener('click', event => {
    if (event.target.closest('[data-plate-family]')) { event.preventDefault(); event.stopImmediatePropagation(); enter(); button.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    else if (event.target.closest('button')) leave();
  }, true);
  panel.querySelectorAll('[data-section-properties-mode]').forEach(b => b.addEventListener('click', leave, true));
  $('plateReset').addEventListener('click', reset);
  $('plateCloseDetails').addEventListener('click', () => closeDetails(true));
  $('plateRows').addEventListener('click', event => {
    if (event.target.closest('[data-plate-clear]')) { reset(); $('plateReset').focus(); return; }
    const origin = event.target.closest('[data-plate-details]'); if (!origin) return;
    if (origin.dataset.plateDetails === selected && !$('plateDetails').hidden) { closeDetails(true); return; }
    closeDetails(); selected = origin.dataset.plateDetails; const row = rows.find(r => r.id === selected), masses = model.mass(row);
    $('plateDetailTitle').textContent = `${model.productType(row)}${row.product === 'TRU-SPEC' ? ' · TRU-SPEC' : ''} ${row.grade} · ${row.t} × ${row.width} × ${row.length} mm`;
    const original = row.publishedMassStatus === 'Source unit conflict' ? `<p class="plate-source-issue"><b>Source unit conflict</b> — published entry ${esc(row.publishedMassText)} is under a kg/m heading on p. ${row.sourcePage}. Its unit is not adopted. Theoretical mass above is derived independently.</p>` : `<p>Published area mass: <b>${esc(row.publishedMassText)} kg/m²</b>. This is a catalogue value, not measured batch mass.</p>`;
    const enquiry = row.product === 'Flat plate' && (row.grade === '250' && row.t > 115 || row.grade === '350' && row.t > 80) ? '<p>BlueScope lists this thickness by enquiry. Confirm the supplied product and availability with the supplier.</p>' : '';
    const standardNote = row.product === 'TRU-SPEC' ? `<p>The 2024 grade sheet cites the 2002 edition. ${link(model.coilStandardURL, 'AS/NZS 1594:2025', 'Current standard edition')} supersedes it; confirm the supplied product’s certification.</p>` : '';
    $('plateDetailBody').innerHTML = `<p>Source standard: <b>${esc(row.standard)}</b> · dimensions in mm.</p>${standardNote}<p>Theoretical mass: ${model.formatMass(masses?.areaMass, 2)} kg/m² · ${model.formatMass(masses?.plateMass, 1)} kg/plate.</p>${original}${enquiry}<p>${catalogueLink(row)} · ${locator(row)}. Confirm current supply and batch certificate with the supplier.</p>`;
    $('plateDetails').hidden = false; origin.setAttribute('aria-expanded', 'true'); origin.closest('tr').classList.add('st-selected');
    $('plateDetails').scrollIntoView({ block: 'nearest' }); $('plateCloseDetails').focus({ preventScroll: true });
  });
  $('plateScroll').addEventListener('scroll', () => { savedTop = $('plateScroll').scrollTop; savedLeft = $('plateScroll').scrollLeft; }, { passive: true });
  new ResizeObserver(overflow).observe($('plateScroll'));
  render();
  if (new URLSearchParams(location.search).get('plate') === '1') enter();
})();
