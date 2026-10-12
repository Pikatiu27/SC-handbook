"use strict";
(() => {
  // These labels describe the existing tables; they add no design acceptance.
  const groups = [
    ["#memberPanel .compact-lookup-table", ["Compression parameter alpha-b reference", "Section form factor k-f reference", "Tension connection coefficient k-t reference"]],
    ["#monopolePanel .monopole-schedule-table", ["Pole segment schedule"]],
    ["#monopolePanel .monopole-station-table", ["Pole station bending section resistance"]],
    ["#monopolePanel .monopole-combined-capacity-table", ["Pole station axial and bending section resistance"]],
    ["#reoPanel .reo-lap-table", ["Tension development and lap length comparison"]],
    ["#reoPanel .reo-product-table", ["Reinforcement nominal properties and supplier data"]],
    ["#screwPanel .screw-reaction-table", ["Pile group action distribution; not pile resistance"]],
    ["#geoPanel .range-table", ["Selected ground parameter comparison"]],
  ];
  function repair() {
    for (const [selector, names] of groups) {
      document.querySelectorAll(selector).forEach((table, index) => {
        if (!table.caption && !table.hasAttribute("aria-label") && !table.hasAttribute("aria-labelledby") && names[index]) table.setAttribute("aria-label", names[index]);
      });
    }
    document.querySelectorAll("#geoPanel .interface-reference table").forEach(table => {
      const heading = table.closest(".interface-reference")?.querySelector("h3,h4");
      if (heading && !table.caption && !table.hasAttribute("aria-label") && !table.hasAttribute("aria-labelledby")) table.setAttribute("aria-label", heading.textContent.trim());
    });
    document.querySelectorAll(".tool-panel table thead th:not([scope])").forEach(th => th.setAttribute("scope", "col"));
    document.querySelectorAll(".tool-panel summary i").forEach(icon => {
      if (/^[+×−–-]$/.test(icon.textContent.trim()) && icon.getAttribute("aria-hidden") !== "true") icon.setAttribute("aria-hidden", "true");
    });
  }
  let pending = false;
  // Keep keyboard navigation inside the modal's controls at both boundaries.
  document.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const dialog = event.target.closest?.("dialog[open]");
    if (!dialog) return;
    const controls = [...dialog.querySelectorAll("button,input,select,textarea,a[href],[tabindex]")].filter(control => !control.disabled && control.tabIndex >= 0 && control.getClientRects().length && getComputedStyle(control).visibility !== "hidden");
    if (!controls.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first || !event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus({ preventScroll: true });
    }
  });
  repair();
  new MutationObserver(() => {
    if (pending) return;
    pending = true;
    queueMicrotask(() => { pending = false; repair(); });
  }).observe(document.querySelector("main"), { childList: true, subtree: true });
})();
