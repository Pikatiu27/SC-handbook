"use strict";
const GuyCatalogueUnits = (() => {
  const factors = Object.freeze({ kN: 1, lbf: 0.0044482216152605, t: 9.80665 });
  function number(value) {
    if (value === null || value === undefined || typeof value === "boolean") return null;
    const text = String(value).trim();
    if (!/^[+\-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+\-]?\d+)?$/i.test(text)) return null;
    const n = Number(text.replace(",", "."));
    return Number.isFinite(n) ? n : null;
  }
  function ratingKN(product) {
    const rating = product?.rating;
    if (!rating || !Object.hasOwn(factors, rating.unit) || !Number.isFinite(rating.value) || rating.value <= 0) return null;
    // Source values and unit factors are finite decimal literals. Multiply their
    // integer coefficients before the final Number conversion to avoid a false
    // FAIL at an exactly entered converted threshold (e.g. 2.5 t = 24.516625 kN).
    const parts = [rating.value, factors[rating.unit]].map(v => {
      const [a,b=""] = String(v).split(".");
      return {n:BigInt(a+b), places:b.length};
    });
    return Number(parts[0].n * parts[1].n) / 10 ** (parts[0].places + parts[1].places);
  }

return Object.freeze({factors,number,ratingKN});
})();
