/* Presentation only: separate an authored trailing unit in selected legacy headers. */
(() => {
  'use strict';
  const selector = '.monopole-schedule-table thead th, .monopole-result-table thead th, .reo-area-table thead th';
  function update() {
    document.querySelectorAll(selector).forEach(th => {
      if (th.querySelector('small, button, input, select')) return;
      const match = th.innerHTML.match(/^(.*?)(\s*)(\((?:m|mm|MPa|kN|kN·m|mm²|mm²\/m)\))\s*$/s);
      if (!match) return;
      const name = document.createElement('span');
      name.className = 'tp-header-name';
      name.innerHTML = match[1];
      const unit = document.createElement('small');
      unit.className = 'tp-header-unit';
      unit.textContent = match[3];
      // Keep the original text, notation, units and column order exactly.
      th.replaceChildren(name, document.createTextNode(match[2]), unit);
    });
  }
  update();
  new MutationObserver(update).observe(document.body, {childList: true, subtree: true});
})();
