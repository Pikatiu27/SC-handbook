(function(root) {
  "use strict";
  function filterRows(rows, filters = {}) {
    const {type = "mechanical", manufacturer = "", size = "", keyword = ""} = filters;
    if (!["mechanical", "chemical"].includes(type)) return [];
    const q = String(keyword).trim().toLocaleLowerCase("en-AU");
    return rows.filter(row => row.type === type && (!manufacturer || row.manufacturer === manufacturer) && (!size || String(row.size) === String(size)) && (!q || [row.id, row.product, row.manufacturer, row.sizeLabel, row.finish, row.concrete, row.mechanism, row.profile].join(" ").toLocaleLowerCase("en-AU").includes(q)));
  }
  const api = Object.freeze({filterRows});
  root.ConcreteAnchorLookup = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
