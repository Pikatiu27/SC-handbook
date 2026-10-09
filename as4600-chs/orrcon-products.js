"use strict";

// A short, checked lookup, not a reproduction of the manufacturer's full range.
// Orrcon Steel, Pipe & Tube Product Catalogue, July 2024, section 1.1.4,
// printed pp. 10–11. Grades mark catalogue rows, not current stock.
// Grade minimum fy is from AS/NZS 1163:2016 Table 7, not an Orrcon capacity.
(function (root, factory) {
  const catalogue = factory();
  if (typeof module === "object" && module.exports) module.exports = catalogue;
  else root.As4600ChsProducts = catalogue;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const grades = Object.freeze({ C250L0: 250, C350L0: 350 });
  const rows = [
    ["76.1x4.5", 76.1, 4.5, 7.95, 10],
    ["88.9x4.0", 88.9, 4.0, 8.38, 10],
    ["101.6x4.0", 101.6, 4.0, 9.63, 10],
    ["114.3x4.5", 114.3, 4.5, 12.19, 10],
    ["139.7x5.0", 139.7, 5.0, 16.61, 11],
    ["165.1x5.0", 165.1, 5.0, 19.74, 11]
  ].map(([id, outsideDiameterMm, nominalThicknessMm, nominalMassKgM, printedPage]) =>
    Object.freeze({ id, outsideDiameterMm, nominalThicknessMm, nominalMassKgM, printedPage, grades: Object.freeze(["C250L0", "C350L0"]) })
  );
  return Object.freeze({ rows: Object.freeze(rows), grades });
});
