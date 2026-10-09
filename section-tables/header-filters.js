(function (root) {
  'use strict';
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const numericInput = text => {
    if (!text.trim()) return undefined;
    if (!/^(?:\d+(?:\.\d*)?|\.\d+|\d{1,3}(?:,\d{3})+(?:\.\d*)?)$/.test(text.trim())) return null;
    const value = Number(text.replaceAll(',', '')); return Number.isFinite(value) ? value : null;
  };
  function mount({ panel, head, bar, getEngine, rows, onChange, onReset }) {
    const dialog = document.createElement('dialog'); dialog.id = 'stColumnFilter'; dialog.className = 'st-column-filter';
    dialog.setAttribute('aria-labelledby', 'stFilterTitle'); panel.append(dialog);
    let key = '', domain = [], checked = new Set(), search = '', anchor;
    const engine = () => getEngine(), definition = () => engine().definitions.find(c => c.key === key);
    const button = () => [...head.querySelectorAll('[data-st-column]')].find(b => b.dataset.stColumn === key);
    const plainLabel = col => col.label.replace(/<[^>]+>/g, '');
    function close(restore = true) {
      if (dialog.open) dialog.close(); button()?.setAttribute('aria-expanded', 'false'); if (restore) button()?.focus({ preventScroll: true });
    }
    function update() { onChange(); button()?.focus({ preventScroll: true }); }
    function updateList() {
      const shown = domain.filter(value => key === 'section' ? root.SCSectionTables.keywordMatch(value, search) : value.toLowerCase().includes(search.toLowerCase()));
      dialog.querySelector('[data-values]').innerHTML = shown.map(value => `<label><input type="checkbox" data-value-index="${domain.indexOf(value)}" ${checked.has(value) ? 'checked' : ''}><span>${esc(value)}</span></label>`).join('') || '<p>No values match.</p>';
      dialog.querySelector('[data-selection]').textContent = `${checked.size} / ${domain.length} values selected`;
      dialog.querySelector('[data-select-all]').textContent = search ? 'Select matches' : 'Select all';
    }
    function position() {
      const width = Math.min(320, window.innerWidth - 24); dialog.style.width = width + 'px';
      dialog.style.left = Math.max(12, Math.min(anchor.left, window.innerWidth - width - 12)) + 'px';
      const height = dialog.getBoundingClientRect().height;
      const preferred = anchor.bottom + 6 + height <= window.innerHeight - 12 ? anchor.bottom + 6 : anchor.top - height - 6;
      dialog.style.top = Math.max(12, Math.min(preferred, window.innerHeight - height - 12)) + 'px';
    }
    function open(origin) {
      key = origin.dataset.stColumn; const col = definition(), draft = engine().filters.get(key) || {};
      domain = [...new Set(rows().map(row => engine().text(row, key)))].sort((a, b) => a.localeCompare(b, 'en-AU', { numeric: true }));
      checked = new Set(draft.values ?? domain); search = key === 'section' ? draft.query || '' : '';
      const title = plainLabel(col);
      dialog.innerHTML = `<div class="st-filter-heading"><div><h3 id="stFilterTitle">${esc(title)}</h3>${col.unit ? `<p>${esc(col.unit)}</p>` : ''}</div><button type="button" data-close aria-label="Close column filter">×</button></div><div class="st-filter-sort"><button type="button" data-sort="asc" aria-pressed="${engine().sort?.key === key && engine().sort.direction === 'asc'}">${col.numeric ? '↑ Smallest first' : '↑ A to Z'}</button><button type="button" data-sort="desc" aria-pressed="${engine().sort?.key === key && engine().sort.direction === 'desc'}">${col.numeric ? '↓ Largest first' : '↓ Z to A'}</button></div>${col.numeric ? `<fieldset class="st-filter-range"><legend>Range · ${esc(col.unit)}</legend><label>Minimum<input data-min inputmode="decimal" placeholder="No minimum" value="${esc(draft.min)}"></label><label>Maximum<input data-max inputmode="decimal" placeholder="No maximum" value="${esc(draft.max)}"></label></fieldset>` : ''}<label class="st-filter-field">${key === 'section' ? 'Keywords' : 'Search values'}<input type="search" data-search autocomplete="off" value="${esc(search)}" placeholder="${key === 'section' ? 'e.g. UB310, 60 CHS, 150 × 100' : 'Search values'}"></label>${key === 'section' ? '<p class="st-filter-note">Match model fragments. Dimension columns use actual tabulated dimensions.</p>' : ''}<div class="st-filter-select"><button type="button" data-select-all>Select all</button><button type="button" data-select-none>Select none</button></div><div class="st-filter-values" data-values role="group" aria-label="Column values"></div><p class="st-filter-note" data-selection></p><p class="st-filter-error" data-error role="alert" hidden></p><div class="st-filter-footer"><button type="button" data-clear>Clear column</button><button type="button" data-apply>Apply</button></div>`;
      anchor = origin.getBoundingClientRect(); origin.setAttribute('aria-expanded', 'true');
      dialog.style.top = '12px'; dialog.style.left = '12px'; dialog.showModal(); updateList(); position();
      dialog.querySelector(col.numeric ? '[data-min]' : '[data-search]').focus({ preventScroll: true });
    }
    head.addEventListener('click', event => { const target = event.target.closest('[data-st-column]'); if (target) open(target); });
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(); } });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); return; }
      const target = event.target.closest('button'); if (!target) return;
      if (target.hasAttribute('data-close')) { close(); return; }
      if (target.hasAttribute('data-select-all') || target.hasAttribute('data-select-none')) {
        domain.filter(value => key === 'section' ? root.SCSectionTables.keywordMatch(value, search) : value.toLowerCase().includes(search.toLowerCase())).forEach(value => target.hasAttribute('data-select-all') ? checked.add(value) : checked.delete(value)); updateList(); return;
      }
      if (target.hasAttribute('data-clear')) { engine().clear(key); close(false); update(); return; }
      if (target.hasAttribute('data-apply') || target.hasAttribute('data-sort')) {
        const min = numericInput(dialog.querySelector('[data-min]')?.value || ''), max = numericInput(dialog.querySelector('[data-max]')?.value || '');
        if (min === null || max === null || min !== undefined && max !== undefined && min > max) {
          const error = dialog.querySelector('[data-error]'); error.hidden = false; error.textContent = 'Enter non-negative numbers with minimum ≤ maximum.'; return;
        }
        engine().set(key, { query: key === 'section' ? search : '', values: checked.size === domain.length ? null : [...checked], min, max });
        if (target.hasAttribute('data-sort')) engine().order(key, target.dataset.sort);
        close(false); update();
      }
    });
    dialog.addEventListener('input', event => { if (event.target.hasAttribute('data-search')) { search = event.target.value; updateList(); } });
    dialog.addEventListener('change', event => {
      if (event.target.hasAttribute('data-value-index')) { const value = domain[Number(event.target.dataset.valueIndex)]; event.target.checked ? checked.add(value) : checked.delete(value); dialog.querySelector('[data-selection]').textContent = `${checked.size} / ${domain.length} values selected`; }
    });
    bar.addEventListener('click', event => {
      const target = event.target.closest('button'); if (!target) return;
      if (target.hasAttribute('data-clear-all')) { onReset(); document.getElementById('stReset').focus({ preventScroll: true }); return; }
      if (target.hasAttribute('data-remove-filter')) engine().clear(target.dataset.removeFilter);
      if (target.hasAttribute('data-clear-sort')) engine().order(null, null);
      onChange(); const recovery = bar.querySelector('button') || document.getElementById('stReset'); recovery.focus({ preventScroll: true });
    });
    function decorate() {
      const state = engine();
      head.querySelectorAll('[data-st-column]').forEach(control => {
        const col = state.definitions.find(c => c.key === control.dataset.stColumn), active = state.filters.has(col.key), sorted = state.sort?.key === col.key;
        control.dataset.active = String(active); control.dataset.sorted = String(sorted);
        control.querySelector('.st-filter-icon').textContent = sorted ? state.sort.direction === 'asc' ? '↑' : '↓' : '▾';
        control.setAttribute('aria-label', `${plainLabel(col)}: filter and sort${active ? '; filter active' : ''}${sorted ? '; sorted ' + state.sort.direction : ''}`);
        control.closest('th').setAttribute('aria-sort', sorted ? state.sort.direction === 'asc' ? 'ascending' : 'descending' : 'none');
      });
      const items = [...state.filters].map(([filterKey, f]) => {
        const col = state.definitions.find(c => c.key === filterKey);
        const parts = [f.query, f.values ? f.values.length === 1 ? f.values[0] : `${f.values.length} selected` : '', f.min !== undefined && f.max !== undefined ? `${f.min}–${f.max}` : f.min !== undefined ? `≥ ${f.min}` : f.max !== undefined ? `≤ ${f.max}` : '', f.min !== undefined || f.max !== undefined ? col.unit : ''].filter(Boolean);
        return `<button type="button" data-remove-filter="${esc(filterKey)}" aria-label="Clear ${esc(plainLabel(col))} filter">${col.label}: ${esc(parts.join(' · '))} <span aria-hidden="true">×</span></button>`;
      });
      if (state.sort) { const col = state.definitions.find(c => c.key === state.sort.key); items.push(`<button type="button" data-clear-sort aria-label="Clear column sort">${col.label} ${state.sort.direction === 'asc' ? '↑' : '↓'} <span aria-hidden="true">×</span></button>`); }
      bar.innerHTML = items.length ? items.join('') + '<button type="button" data-clear-all>Clear all</button>' : '<span>Use column headers to filter or sort.</span>';
    }
    new MutationObserver(() => { if (panel.hidden && dialog.open) close(false); }).observe(panel, { attributes: true, attributeFilter: ['hidden'] });
    window.addEventListener('resize', () => { if (dialog.open) position(); });
    return { decorate, close };
  }
  root.SCSectionHeaderFilters = { mount };
})(globalThis);
