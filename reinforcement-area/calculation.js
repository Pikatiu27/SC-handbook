(function initialiseReinforcementArea(scope) {
  "use strict";
  if (!scope.reoLapping && typeof module !== "undefined" && module.exports) require("../reo-calculation.js");
  const data = scope.reoLapping;
  if (!data?.bars) throw new Error("Shared reinforcement bar data is required.");
  const bars = Object.freeze(data.bars.filter(bar => bar.diameter <= 40));
  const spacings = Object.freeze([75, 100, 125, 150, 175, 200, 225, 250, 275, 300]);
  const positive = value => typeof value === "number" && Number.isFinite(value) && value > 0;

  function calculate(options) {
    const bar = bars.find(item => item.designation === options.bar);
    const errors = {};
    if (!bar) errors.bar = "Select an N10–N40 bar.";
    if (!["spacing", "count"].includes(options.mode)) errors.mode = "Select an arrangement.";
    if (options.mode === "spacing" && (!positive(options.spacing) || (bar && options.spacing <= bar.diameter))) {
      errors.spacing = "Enter a centre spacing greater than the nominal bar diameter.";
    }
    if (options.mode === "count") {
      if (!Number.isSafeInteger(options.count) || options.count < 1) errors.count = "Enter a positive whole number of bars.";
      if (!positive(options.length)) errors.length = "Enter a positive straight length in metres.";
    }
    if (Object.keys(errors).length) return { valid: false, bar: bar || null, errors, area: null, mass: null, clearGap: null };
    const area = options.mode === "spacing" ? bar.area * 1000 / options.spacing : bar.area * options.count;
    const mass = options.mode === "spacing" ? bar.standardMass * 1000 / options.spacing : bar.standardMass * options.count * options.length;
    const clearGap = options.mode === "spacing" ? options.spacing - bar.diameter : null;
    if (!positive(area) || !positive(mass)) return { valid: false, bar, errors: { range: "Values exceed the supported numerical range." }, area: null, mass: null, clearGap: null };
    return { valid: true, bar, errors, area, mass, clearGap };
  }

  function find(options) {
    if (!positive(options.target)) return { valid: false, error: "Enter a positive target area.", candidates: [] };
    if (!["spacing", "count"].includes(options.mode)) return { valid: false, error: "Select an arrangement.", candidates: [] };
    const selection = options.bar === "all" ? bars : bars.filter(bar => bar.designation === options.bar);
    if (!selection.length) return { valid: false, error: "Select a recognised bar size.", candidates: [] };
    const candidates = [];
    let rangeError = false;
    for (const bar of selection) {
      const arrangements = options.mode === "spacing" ? spacings : [Math.max(1, Math.ceil(options.target / bar.area))];
      for (let amount of arrangements) {
        if (options.mode === "count" && !Number.isSafeInteger(amount)) { rangeError = true; continue; }
        // Correct any last-bit division/multiplication discrepancy before accepting a count.
        if (options.mode === "count" && bar.area * amount < options.target) amount += 1;
        const area = options.mode === "spacing" ? bar.area * 1000 / amount : bar.area * amount;
        if (Number.isFinite(area) && area >= options.target && Number.isSafeInteger(amount)) {
          const excessPercent = (area / options.target - 1) * 100;
          if (Number.isFinite(excessPercent)) candidates.push({ bar: bar.designation, amount, area, excessPercent });
          else rangeError = true;
        }
        else if (!Number.isFinite(area) || !Number.isSafeInteger(amount)) rangeError = true;
      }
    }
    if (rangeError) return { valid: false, error: "Target exceeds the supported numerical range. Enter a practical area target.", candidates: [] };
    candidates.sort((a, b) => a.area - b.area || a.amount - b.amount || a.bar.localeCompare(b.bar, "en", { numeric: true }));
    return { valid: true, error: null, candidates };
  }

  const api = Object.freeze({ bars, spacings, calculate, find });
  scope.ReinforcementArea = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(globalThis);
