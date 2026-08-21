(function (root, factory) {
  "use strict";

  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MemberFormFactor = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const LIMITS = Object.freeze({
    hotRolledOutstand: 16,
    hotRolledSupported: 45,
    coldFormedSupported: 40,
    circularHollow: 82
  });

  function positive(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new RangeError(`${name} must be greater than zero.`);
    return number;
  }

  function flatElement({ label, width, thickness, yieldStress, yieldSlendernessLimit, count = 1 }) {
    const b = positive(width, `${label} clear width`);
    const t = positive(thickness, `${label} thickness`);
    const fy = positive(yieldStress, "Yield stress");
    const lambdaEy = positive(yieldSlendernessLimit, `${label} yield slenderness limit`);
    const elementCount = positive(count, `${label} element count`);
    const slenderness = b / t * Math.sqrt(fy / 250);
    const effectiveWidth = Math.min(b, b * lambdaEy / slenderness);
    return Object.freeze({
      label,
      count: elementCount,
      width: b,
      thickness: t,
      yieldSlendernessLimit: lambdaEy,
      slenderness,
      effectiveWidth,
      ineffectiveArea: elementCount * (b - effectiveWidth) * t
    });
  }

  function flatSection(family, area, elements) {
    const grossArea = positive(area, "Gross area");
    const ineffectiveArea = elements.reduce((sum, element) => sum + element.ineffectiveArea, 0);
    const effectiveArea = grossArea - ineffectiveArea;
    if (!Number.isFinite(effectiveArea) || effectiveArea <= 0) {
      throw new RangeError("Effective area is outside the AS 4100 section method.");
    }
    return Object.freeze({
      family,
      method: "flat-elements",
      source: "AS 4100:2020 Cl. 6.2.2 to AS 4100:2020 Cl. 6.2.4 and AS 4100:2020 Table 6.2.4",
      grossArea,
      effectiveArea,
      formFactor: Math.min(1, effectiveArea / grossArea),
      elements: Object.freeze(elements)
    });
  }

  function circularSection(section, yieldStress) {
    const grossArea = positive(section.area, "Gross area");
    const diameter = positive(section.D, "Outside diameter");
    const thickness = positive(section.t, "Wall thickness");
    const fy = positive(yieldStress, "Yield stress");
    const yieldSlendernessLimit = LIMITS.circularHollow;
    const slenderness = diameter / thickness * fy / 250;
    const effectiveDiameter = slenderness <= yieldSlendernessLimit
      ? diameter
      : Math.min(
        diameter,
        diameter * Math.sqrt(yieldSlendernessLimit / slenderness),
        diameter * (3 * yieldSlendernessLimit / slenderness) ** 2
      );
    const effectiveArea = grossArea - Math.PI * (diameter - effectiveDiameter) * thickness;
    if (!Number.isFinite(effectiveArea) || effectiveArea <= 0) {
      throw new RangeError("Circular effective area is outside the AS 4100 section method.");
    }
    return Object.freeze({
      family: "chs",
      method: "circular-hollow",
      source: "AS 4100:2020 Cl. 6.2.2 to AS 4100:2020 Cl. 6.2.4 and AS 4100:2020 Table 6.2.4",
      grossArea,
      effectiveArea,
      formFactor: Math.min(1, effectiveArea / grossArea),
      diameter,
      thickness,
      yieldSlendernessLimit,
      slenderness,
      effectiveDiameter,
      elements: Object.freeze([])
    });
  }

  function calculate({ family, section, yieldStress }) {
    const type = String(family || "").toLowerCase();
    const fy = positive(yieldStress, "Yield stress");
    if (!section || typeof section !== "object") throw new TypeError("Section geometry is required.");
    if (type === "rod") {
      const grossArea = positive(section.area, "Gross area");
      return Object.freeze({
        family: type,
        method: "solid-section",
        source: "AS 4100:2020 Cl. 6.2.2",
        grossArea,
        effectiveArea: grossArea,
        formFactor: 1,
        elements: Object.freeze([])
      });
    }
    if (type === "chs") return circularSection(section, fy);
    if (type === "ub" || type === "uc") {
      return flatSection(type, section.area, [
        flatElement({
          label: "Flange outstand",
          width: (positive(section.bf, "Flange width") - positive(section.tw, "Web thickness")) / 2,
          thickness: section.tf,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.hotRolledOutstand,
          count: 4
        }),
        flatElement({
          label: "Web",
          width: positive(section.d, "Section depth") - 2 * positive(section.tf, "Flange thickness"),
          thickness: section.tw,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.hotRolledSupported
        })
      ]);
    }
    if (type === "pfc") {
      return flatSection(type, section.area, [
        flatElement({
          label: "Flange outstand",
          width: positive(section.bf, "Flange width") - positive(section.tw, "Web thickness"),
          thickness: section.tf,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.hotRolledOutstand,
          count: 2
        }),
        flatElement({
          label: "Web",
          width: positive(section.d, "Section depth") - 2 * positive(section.tf, "Flange thickness"),
          thickness: section.tw,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.hotRolledSupported
        })
      ]);
    }
    if (type === "ea") {
      const thickness = positive(section.actualT || section.t, "Angle thickness");
      return flatSection(type, section.area, [
        flatElement({
          label: "Leg outstand",
          width: positive(section.b, "Angle leg width") - thickness,
          thickness,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.hotRolledOutstand,
          count: 2
        })
      ]);
    }
    if (type === "rhs" || type === "shs") {
      const thickness = positive(section.t, "Wall thickness");
      const width = positive(section.b, "Section width");
      const depth = type === "shs" ? width : positive(section.d, "Section depth");
      return flatSection(type, section.area, [
        flatElement({
          label: "Horizontal wall",
          width: width - 2 * thickness,
          thickness,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.coldFormedSupported,
          count: 2
        }),
        flatElement({
          label: "Vertical wall",
          width: depth - 2 * thickness,
          thickness,
          yieldStress: fy,
          yieldSlendernessLimit: LIMITS.coldFormedSupported,
          count: 2
        })
      ]);
    }
    throw new RangeError("A supported catalogue member family is required for automatic form-factor calculation.");
  }

  return Object.freeze({ LIMITS, flatElement, calculate });
});
