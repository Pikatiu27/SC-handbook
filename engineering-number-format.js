"use strict";

(function exposeEngineeringNumberFormat(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.EngineeringNumberFormat = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createEngineeringNumberFormat() {
  function decimalHalfUp(value, digits = 0) {
    const number = Number(value);
    const places = Number(digits);
    if (!Number.isFinite(number) || !Number.isInteger(places) || places < 0 || places > 20) return "—";

    const negative = number < 0;
    const [coefficient, exponentText = "0"] = Math.abs(number).toString().toLowerCase().split("e");
    const [integerPart, fractionalPart = ""] = coefficient.split(".");
    const exponent = Number(exponentText);
    let decimalIndex = integerPart.length + exponent;
    let decimalDigits = `${integerPart}${fractionalPart}`;

    if (decimalIndex < 0) {
      decimalDigits = `${"0".repeat(-decimalIndex)}${decimalDigits}`;
      decimalIndex = 0;
    }
    if (decimalIndex > decimalDigits.length) decimalDigits = decimalDigits.padEnd(decimalIndex, "0");

    const retainedLength = decimalIndex + places;
    decimalDigits = decimalDigits.padEnd(retainedLength + 1, "0");
    const retained = decimalDigits.slice(0, retainedLength) || "0";
    const increment = Number(decimalDigits.charAt(retainedLength)) >= 5 ? 1n : 0n;
    const rounded = BigInt(retained) + increment;
    let roundedText = rounded.toString().padStart(Math.max(1, retainedLength), "0");

    if (places > 0) {
      roundedText = roundedText.padStart(places + 1, "0");
      roundedText = `${roundedText.slice(0, -places)}.${roundedText.slice(-places)}`;
    }

    return `${negative && rounded !== 0n ? "-" : ""}${roundedText}`;
  }

  function decimalHalfUpSignificant(value, significantDigits = 3) {
    const number = Number(value);
    const digits = Number(significantDigits);
    if (!Number.isFinite(number) || !Number.isInteger(digits) || digits < 1 || digits > 20) return "—";
    if (number === 0) return "0";

    const [coefficient, exponentText] = Math.abs(number).toExponential().split("e");
    let exponent = Number(exponentText);
    const raw = coefficient.replace(".", "").padEnd(digits + 1, "0");
    let retained = (BigInt(raw.slice(0, digits)) + (raw[digits] >= "5" ? 1n : 0n)).toString();
    if (retained.length > digits) { exponent += 1; retained = retained.slice(0, digits); }
    const sign = number < 0 ? "-" : "";
    const places = digits - exponent - 1;
    if (places > 20 || exponent > 20) {
      const mantissa = (retained[0] + (retained.length > 1 ? "." + retained.slice(1) : "")).replace(/\.?0+$/, "");
      return `${sign}${mantissa}e${exponent >= 0 ? "+" : ""}${exponent}`;
    }
    const point = exponent + 1;
    let text = point <= 0 ? "0." + "0".repeat(-point) + retained
      : point >= retained.length ? retained.padEnd(point, "0")
      : retained.slice(0, point) + "." + retained.slice(point);
    if (text.includes(".")) text = text.replace(/0+$/, "").replace(/\.$/, "");
    return sign + text;
  }

  return Object.freeze({ decimalHalfUp, decimalHalfUpSignificant });
});
