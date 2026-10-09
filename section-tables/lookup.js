(function () {
  'use strict';
  const bridge = globalThis.SCSectionTableBridge, model = globalThis.SCSectionTables;
  if (!bridge || !model) throw Error('Section table dependencies unavailable.');
  const panel = document.getElementById('propertiesPanel'), card = panel.querySelector('.lookup-card'), cluster = card.querySelector('.input-cluster');
  const tabs = document.getElementById('sectionCatalogueFamilyTabs'), catalogue = document.getElementById('sectionCatalogueGroup');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const workspace = document.createElement('section'); workspace.className = 'st-workspace'; workspace.hidden = true;
  workspace.innerHTML = '<div class="st-detail-heading"><h3 id="stDetailTitle">Section details</h3><button type="button" id="stBack">Back to table</button></div><div class="st-detail-body"></div>';
  const body = workspace.querySelector('.st-detail-body');
  body.append(document.getElementById('sectionCustomGroup'), card.querySelector('.section-material-input-group'));
  for (const child of [...card.children]) if (child !== cluster && !child.classList.contains('section-properties-mode-switch')) body.append(child);
  for (const child of [...panel.children]) if (child.matches('details.detail-card, details.source-card')) body.append(child);
  const materialDetails = document.createElement('details'); materialDetails.className = 'detail-card st-material-details';
  materialDetails.innerHTML = '<summary><span><b>Material &amp; reference values</b><small>Grade, strength and checked section attributes</small></span><i>+</i></summary><div class="detail-body"></div>';
  const materialBody = materialDetails.querySelector('.detail-body');
  // The workspace is detached here: resolve every material node within it.
  const materialNodes = ['.section-material-input-group', '.section-material-category-heading', '#sectionMaterialProperties', '#sectionDesignAttributeHeading', '#sectionDesignAttributes'].map(selector => {
    const node = body.querySelector(selector);
    if (!node) throw Error(`Missing section material node: ${selector}`);
    return node;
  });
  materialBody.append(...materialNodes);
  body.querySelector('#sectionPropertyResults').after(materialDetails);
  catalogue.classList.add('st-legacy-selector'); catalogue.setAttribute('aria-hidden', 'true');
  card.append(workspace);
  const tableArea = document.createElement('section'); tableArea.className = 'st-catalogue';
  tableArea.innerHTML = '<div class="st-table-heading"><h3 id="stTitle">Catalogue sections</h3><div class="st-heading-actions"><span id="stCount" role="status" aria-live="polite"></span><button type="button" id="stReset">Reset</button></div></div><p class="st-axis-note" id="stAxes"></p><div class="st-filter-bar" id="stFilterBar" aria-label="Active column filters"></div><div class="st-scroll" id="stScroll" role="region" aria-labelledby="stTitle" tabindex="0"><table class="st-table"><caption class="st-sr-only" id="stCaption"></caption><thead id="stHead"></thead><tbody id="stRows"></tbody></table></div><p class="st-scroll-cue" id="stScrollCue" hidden>Scroll across for all columns.</p><p class="st-legend">Catalogue values unless marked Derived. Not available means the accepted row has no value.</p><details class="source-card st-coverage"><summary><span><b>Catalogue scope</b><small>Sources, coverage and value basis</small></span><i>+</i></summary><div class="source-body"><p id="stSource"></p><p>Accepted catalogue rows; current stock is not confirmed. Material-dependent attributes are in section details. Capacity and member checks are excluded.</p><div id="stDirectory"></div></div></details>';
  cluster.append(tableArea);
  document.getElementById('stDirectory').append(document.getElementById('sectionCatalogueDirectoryList'));
  function $(id) { return document.getElementById(id); }
  function catalogueLink(row) {
    const document = model.documentLink(row.source);
    return document ? `<a class="st-document-link" href="${esc(document.url)}" target="_blank" rel="noopener noreferrer" aria-label="Catalogue PDF for ${esc(row.designation)}: ${esc(document.title)} (opens in new tab)" title="${esc(document.title)}">Catalogue <span aria-hidden="true">↗</span></a>` : '';
  }
  const states = new Map();
  let activeFamily = '', selected = '', origin = null;
  const state = () => { if (!states.has(activeFamily)) states.set(activeFamily, { engine: model.engine(activeFamily), top: 0, left: 0 }); return states.get(activeFamily); };
  const setOverflow = () => { $('stScrollCue').hidden = $('stScroll').scrollWidth <= $('stScroll').clientWidth + 1; };
  function updateDetailsButtons() {
    panel.querySelectorAll('[data-st-details]').forEach(b => { const open = selected === b.dataset.stDetails && !workspace.hidden; b.setAttribute('aria-expanded', String(open)); b.closest('tr').classList.toggle('st-selected', open); });
  }
  function closeDetails(restore = false) {
    const currentOrigin = [...panel.querySelectorAll('[data-st-details]')].find(b => b.dataset.stDetails === selected) || origin;
    workspace.hidden = true; selected = ''; updateDetailsButtons();
    if (restore && currentOrigin?.isConnected) { currentOrigin.focus({ preventScroll: true }); currentOrigin.scrollIntoView({ block: 'nearest' }); }
  }
  function drawRows() {
    const family = bridge.family(), cols = model.columns(family.key), rows = state().engine.apply(family.sections);
    $('stCount').textContent = `${rows.length} / ${family.sections.length} sections`;
    $('stCaption').textContent = `${bridge.names[family.key]} catalogue dimensions, mass and section properties. ${$('stAxes').textContent}`;
    const control = (key, label, unit = '') => `<button type="button" class="st-header-control" data-st-column="${key}" aria-haspopup="dialog" aria-controls="stColumnFilter" aria-expanded="false"><span class="st-header-name"><span>${label}</span><span class="st-filter-icon" aria-hidden="true">▾</span></span>${unit ? `<small>${unit}</small>` : '<small aria-hidden="true">&nbsp;</small>'}</button>`;
    $('stHead').innerHTML = '<tr><th scope="col" class="st-identity">' + control('section', 'Section') + '</th>' + cols.map(c => `<th scope="col" class="st-num">${control(c.key, c.label, c.unit)}</th>`).join('') + '<th scope="col" class="st-source-col">' + control('source', 'Source') + '</th><th scope="col" class="st-action-col">Details</th></tr>';
    $('stRows').innerHTML = rows.length ? rows.map(row => `<tr><th scope="row" class="st-identity">${esc(row.designation)}</th>${cols.map(c => {
      const item = c.value(row), derived = item?.basis === 'derived';
      return `<td class="st-num${item?.value == null ? ' st-unavailable' : ''}"><span>${esc(model.format(item, c.scale))}</span>${derived ? '<small>Derived</small>' : ''}</td>`;
    }).join('')}<td class="st-source-col"><span>${esc(row.source.publisher)}</span><small>${esc(row.source.document.match(/\b\d{4}\b/)?.[0] || 'Catalogue')} · ${catalogueLink(row)}</small></td><td class="st-action-col"><button type="button" data-st-details="${esc(row.id)}" aria-controls="stWorkspace" aria-expanded="false" aria-label="Details for ${esc(row.designation)}">Details</button></td></tr>`).join('') : `<tr><td colspan="${cols.length + 3}" class="st-empty">No matching sections. <button type="button" data-st-clear>Clear filters</button></td></tr>`;
    if (selected && !rows.some(r => r.id === selected)) closeDetails();
    updateDetailsButtons(); headerMenus.decorate(); setOverflow();
  }
  function render() {
    headerMenus.close(false);
    const custom = bridge.mode() === 'custom';
    tableArea.hidden = custom; workspace.hidden = !custom; selected = ''; origin = null;
    if (custom) { $('stDetailTitle').textContent = 'Custom geometry'; $('stBack').hidden = true; return; }
    $('stBack').hidden = false;
    const family = bridge.family(); activeFamily = family.key; const s = state();
    $('stTitle').textContent = `${bridge.names[family.key]} sections`;
    $('stAxes').innerHTML = family.key === 'ea' ? 'Principal x-x / y-y axes. Z<sub>y,3</sub> and Z<sub>y,5</sub> retain catalogue edge labels; n-n / p-p values are in Details.' : family.key === 'pfc' ? 'Centroidal x-x / y-y axes. Z<sub>y,R</sub> and Z<sub>y,L</sub> refer to the catalogue right and left edges.' : ['chs', 'shs', 'rod'].includes(family.key) ? 'Equal properties about both centroidal axes.' : 'Centroidal x-x / y-y axes.';
    const sources = [...new Map(family.sections.map(row => [row.source.document, row.source])).values()];
    $('stSource').textContent = sources.map(source => `${source.publisher} — ${source.document}. ${source.status}.`).join(' ');
    drawRows(); $('stScroll').scrollTop = s.top; $('stScroll').scrollLeft = s.left;
  }
  const headerMenus = globalThis.SCSectionHeaderFilters.mount({ panel, head: $('stHead'), bar: $('stFilterBar'), getEngine: () => state().engine, rows: () => bridge.family().sections,
    onChange: () => { $('stScroll').scrollTop = 0; drawRows(); }, onReset: () => reset() });
  workspace.id = 'stWorkspace';
  tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-section-catalogue-family]');
    if (bridge.mode() === 'catalogue' && button?.dataset.sectionCatalogueFamily === bridge.family().key) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
  tabs.addEventListener('click', event => { const button = event.target.closest('.section-catalogue-family-tab'); if (button) { render(); button.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } });
  const reset = () => { const s = state(); s.engine.reset(); s.top = 0; s.left = 0; closeDetails(); render(); };
  $('stReset').addEventListener('click', reset);
  $('stRows').addEventListener('click', event => {
    if (event.target.closest('[data-st-clear]')) { reset(); $('stReset').focus({ preventScroll: true }); return; }
    const button = event.target.closest('[data-st-details]'); if (!button) return;
    if (selected === button.dataset.stDetails && !workspace.hidden) { closeDetails(true); return; }
    origin = button; selected = button.dataset.stDetails;
    if (bridge.record()?.id !== selected) { $('sectionCatalogueDesignation').value = selected; $('sectionCatalogueDesignation').dispatchEvent(new Event('change', { bubbles: true })); }
    $('stDetailTitle').textContent = `${bridge.record().designation} · Details`; workspace.hidden = false; updateDetailsButtons();
    workspace.scrollIntoView({ block: 'start' }); $('stBack').focus({ preventScroll: true });
  });
  $('stBack').addEventListener('click', () => closeDetails(true));
  $('stScroll').addEventListener('scroll', () => { const s = state(); s.top = $('stScroll').scrollTop; s.left = $('stScroll').scrollLeft; }, { passive: true });
  new ResizeObserver(setOverflow).observe($('stScroll'));
  // Start in directory order at the first family; downstream member selectors are untouched.
  $('sectionCatalogueFamily').value = 'ub'; $('sectionCatalogueFamily').dispatchEvent(new Event('change', { bubbles: true })); render();
})();
