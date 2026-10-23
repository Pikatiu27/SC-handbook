/* Shared disclosure symbols. Native details and existing button controllers own state. */
(() => {
  'use strict';
  const glyph = /^[+−–—×xX▸▾▴▿▶▼▲△▽⌄⌃›»∨∧-]+$/;
  function update(control) {
    if (!control.classList.contains('sc-disclosure')) control.classList.add('sc-disclosure');
    for (const child of control.querySelectorAll('i,span,b,svg')) {
      if (child.classList.contains('sc-disclosure-symbol') || child.classList.contains('sc-old-disclosure-symbol')) continue;
      if (child.closest('summary,button') !== control) continue;
      if ((child.parentElement === control && glyph.test(child.textContent.trim())) || /(?:chevron|caret|disclosure-icon|toggle-icon)/i.test(child.getAttribute('class') || '')) child.classList.add('sc-old-disclosure-symbol');
    }
  }
  function sync() { document.querySelectorAll('details > summary,button[aria-expanded]').forEach(update); }
  sync();
  document.addEventListener('toggle', event => {
    if (event.target.tagName === 'DETAILS') { const summary = event.target.querySelector(':scope > summary'); if (summary) update(summary); }
  }, true);
  let pending = false;
  new MutationObserver(() => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { sync(); pending = false; });
  }).observe(document.body, {childList:true,subtree:true,attributes:true,attributeFilter:['open','aria-expanded']});
})();
