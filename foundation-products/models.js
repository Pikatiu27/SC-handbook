(function (root) {
  "use strict";
  const missing = "Not published";
  function rockRows(api) {
    return api.products.map(p => ({
      id: p.id, manufacturerKey: p.providerKey, manufacturer: p.provider, name: p.name,
      category: p.formGroup, data: api.dataMeta(p).label, sourceStatus: api.sourceMeta(p).label,
      source: api.sourceRecord(p), yield: api.loadDisplay(p, "yield"), ultimate: api.loadDisplay(p, "ultimate"),
      labels: api.loadLabels(p), product: p,
      recordType: p.derivedRow ? "derived" : api.productGroup(p).key === "row" ? "model" : p.formGroup === "project" ? "pathway" : "family",
      search: Object.values(p).filter(v => typeof v === "string").join(" ").toLowerCase()
    }));
  }
  function screwRows(api) {
    return api.rows().map(row => {
      const p = row.pile, catalogue = api.catalogues[row.manufacturerKey], values = api.values(p);
      return {
        id: row.manufacturerKey + ":" + row.seriesKey, manufacturerKey: row.manufacturerKey,
        manufacturer: row.manufacturer, name: p.label, category: api.system(p), data: api.class(row.manufacturerKey, p),
        sourceStatus: api.confidence(row.manufacturerKey, p), source: { url: p.sourceUrl || catalogue.sourceUrl || "", checked: catalogue.sourceReview || api.review(row.manufacturerKey) },
        recordType: p.recordType || (api.class(row.manufacturerKey, p) === "Technique benchmark" ? "benchmark" : row.manufacturerKey === "custom" || ["hpa", "piletech"].includes(row.manufacturerKey) ? "pathway" : /family|Component|Alternative/.test(api.class(row.manufacturerKey, p)) ? "family" : /series|system row|Certificate/.test(api.class(row.manufacturerKey, p)) ? "series" : "model"),
        basis: p.loadBasis || (values.compression || values.tension || values.lateral ? values.loadBasis : missing),
        values, product: p, seriesKey: row.seriesKey,
        search: [row.manufacturer, ...Object.values(p).filter(v => typeof v === "string")].join(" ").toLowerCase()
      };
    });
  }
  function filter(rows, state) {
    const words = (state.query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
    return rows.filter(r => (state.manufacturer === "all" || state.manufacturer === r.manufacturerKey)
      && (state.category === "all" || state.category === r.category)
      && (!state.recordType || state.recordType === "all" || state.recordType === r.recordType)
      && (!state.basis || state.basis === "all" || state.basis === r.basis)
      && words.every(w => (r.manufacturer.toLowerCase() + " " + r.search).includes(w)));
  }
  function loadText(v) { return Number.isFinite(v) && v > 0 ? v.toLocaleString("en-AU") : missing; }
  function primaryText(row) {
    if (row.product.loadStatus) return row.product.loadStatus;
    const text = loadText(row.values.compression);
    return text !== missing && (/-up-to$/.test(row.product.capacityType || "") || row.product.upperLimits?.includes("compression")) ? "≤ " + text : text;
  }
  function directionText(row, direction) {
    const text = loadText(row.values[direction]);
    return text !== missing && row.product.upperLimits?.includes(direction) ? "≤ " + text : text;
  }
  function selectProduct(currentId, row, select) {
    if (currentId === row.id) return false;
    select(row.manufacturerKey, row.seriesKey);
    return true;
  }
  // Split only a literal existing area already present in the source display.
  // No area is inferred from diameter or strand count.
  function tendonParts(value) {
    const text = String(value || ""), m = text.match(/;\s*([\d,]+(?:\.\d+)?)\s*mm²$/);
    return { tendon: m ? text.slice(0, m.index) : text || missing, area: m ? m[1] : missing };
  }
  function dimension(value, suffix) {
    const text = String(value || "");
    const match = text.match(new RegExp("^([\\d.,]+(?:(?:\\s*/\\s*|[-–])[\\d.,]+)*)(?:\\s*" + suffix + ")$"));
    return { text: match ? match[1] : text || missing, numeric: Boolean(match) };
  }
  function sourceLabel(value) {
    return String(value || missing).replace(/^Manufacturer row · /, "").replace(/^System family page/, "System page").replace(/^Australian provider pathway$/, "AU pathway");
  }
  const api = { rockRows, screwRows, filter, loadText, primaryText, directionText, selectProduct, tendonParts, dimension, sourceLabel, missing };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SCFoundationTables = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
