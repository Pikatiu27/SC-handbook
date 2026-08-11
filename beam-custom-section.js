(function (root, factory) {
  "use strict";

  const geometry = typeof module === "object" && module.exports
    ? require("./section-geometry.js")
    : root.SectionGeometry;
  const materials = typeof module === "object" && module.exports
    ? require("./steel-materials.js")
    : root.SteelMaterials;
  const api = factory(geometry, materials);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BeamCustomSection = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (SectionGeometry, SteelMaterials) {
  "use strict";

  const FAMILY_DEFINITIONS = Object.freeze({
    ub: Object.freeze({ label: "Ideal symmetric I-section", productForms: ["hot-rolled-section", "project"], directions: ["x", "y"] }),
    uc: Object.freeze({ label: "Ideal symmetric I-section", productForms: ["hot-rolled-section", "project"], directions: ["x", "y"] }),
    pfc: Object.freeze({ label: "Ideal channel section", productForms: ["hot-rolled-section", "project"], directions: ["x"] }),
    chs: Object.freeze({ label: "Ideal circular hollow section", productForms: ["hollow-section", "project"], directions: ["axis"] }),
    rhs: Object.freeze({ label: "Ideal rectangular hollow section", productForms: ["hollow-section", "project"], directions: ["x", "y"] }),
    shs: Object.freeze({ label: "Ideal square hollow section", productForms: ["hollow-section", "project"], directions: ["xy"] }),
    ea: Object.freeze({ label: "Ideal equal angle", productForms: [], directions: [] }),
    rod: Object.freeze({ label: "Solid circular section", productForms: ["round-bar", "project"], directions: ["axis"] })
  });

  function definition(family) {
    return FAMILY_DEFINITIONS[family] || null;
  }

  function productForms(family) {
    return definition(family)?.productForms || [];
  }

  function directions(family) {
    return definition(family)?.directions || [];
  }

  function build(family, dimensions = {}) {
    const common = {
      family,
      designation: definition(family)?.label || "Entered ideal section",
      customGeometry: true,
      capacityStatus: "checked",
      sourceRef: "Entered dimensions; ideal sharp-corner geometry",
      sourceBasis: "Entered dimensions; ideal sharp-corner geometry"
    };

    try {
      if (family === "ub" || family === "uc") {
        const { d, bf, tw, tf } = dimensions;
        const properties = SectionGeometry.symmetricI(d, bf, tw, tf);
        const d1 = d - 2 * tf;
        return {
          ...common, d, bf, tw, tf, d1,
          area: properties.area,
          mass: properties.area * 0.00785,
          Aw: properties.aw,
          I: properties.ix,
          Zx: properties.zx / 1000,
          Sx: properties.sx / 1000,
          drawing: { shape: "i", d, bf, tw, tf },
          geometryProperties: properties,
          axes: {
            x: { I: properties.ix, Z: properties.zx / 1000, S: properties.sx / 1000 },
            y: { I: properties.iy, Z: properties.zy / 1000, S: properties.sy / 1000 }
          },
          shearMethod: "rolled-web",
          interactionMethod: "flat-web"
        };
      }

      if (family === "pfc") {
        const { d, bf, tw, tf } = dimensions;
        const properties = SectionGeometry.channel(d, bf, tw, tf);
        const d1 = d - 2 * tf;
        return {
          ...common, d, bf, tw, tf, d1,
          xL: properties.cx,
          area: properties.area,
          mass: properties.area * 0.00785,
          Aw: properties.aw,
          I: properties.ix,
          Zx: properties.zx / 1000,
          Sx: properties.sx / 1000,
          drawing: { shape: "channel", d, bf, tw, tf, xL: properties.cx },
          geometryProperties: properties,
          axes: { x: { I: properties.ix, Z: properties.zx / 1000, S: properties.sx / 1000 } },
          shearMethod: "rolled-web",
          interactionMethod: "flat-web"
        };
      }

      if (family === "chs") {
        const { D, t } = dimensions;
        const properties = SectionGeometry.circularHollow(D, t);
        return {
          ...common, D, t,
          area: properties.area,
          mass: properties.area * 0.00785,
          Aw: properties.area,
          I: properties.ix,
          Zx: properties.zx / 1000,
          Sx: properties.sx / 1000,
          drawing: { shape: "chs", D, t },
          geometryProperties: properties,
          axes: { axis: { I: properties.ix, Z: properties.zx / 1000, S: properties.sx / 1000 } },
          shearMethod: "chs-section",
          interactionMethod: null
        };
      }

      if (family === "rhs" || family === "shs") {
        const square = family === "shs";
        const b = dimensions.b;
        const d = square ? b : dimensions.d;
        const t = dimensions.t;
        const properties = SectionGeometry.rectangularHollow(b, d, t);
        const axes = square
          ? { xy: { I: properties.ix, Z: properties.zx / 1000, S: properties.sx / 1000 } }
          : {
              x: { I: properties.ix, Z: properties.zx / 1000, S: properties.sx / 1000 },
              y: { I: properties.iy, Z: properties.zy / 1000, S: properties.sy / 1000 }
            };
        return {
          ...common, d, b, t,
          area: properties.area,
          mass: properties.area * 0.00785,
          I: properties.ix,
          Zx: properties.zx / 1000,
          Sx: properties.sx / 1000,
          drawing: { shape: "rhs", b, h: d, t },
          geometryProperties: properties,
          axes,
          shearMethod: "rhs-web",
          interactionMethod: "flat-web"
        };
      }

      if (family === "ea") {
        const { b, t } = dimensions;
        const properties = SectionGeometry.equalAngle(b, t);
        return {
          ...common,
          capacityStatus: "unavailable",
          invalidReason: "Custom equal-angle capacity is not evaluated in Beam Section Capacity; use Section Properties for ideal geometry.",
          b, t,
          area: properties.area,
          mass: properties.area * 0.00785,
          I: properties.iu,
          drawing: { shape: "angle", b, t },
          geometryProperties: properties,
          axes: {}
        };
      }

      const D = dimensions.D;
      const properties = SectionGeometry.circle(D);
      return {
        ...common, D, diameter: D,
        area: properties.area,
        mass: properties.area * 0.00785,
        I: properties.ix,
        Zx: properties.zx / 1000,
        Sx: properties.sx / 1000,
        drawing: { shape: "circle", D },
        geometryProperties: properties,
        axes: { axis: { I: properties.ix, Z: properties.zx / 1000, S: properties.sx / 1000 } }
      };
    } catch (error) {
      return {
        ...common,
        capacityStatus: "unavailable",
        invalidReason: error.message,
        drawing: null,
        axes: {}
      };
    }
  }

  function resolveMaterial({ family, productForm, grade, dimensions = {}, fy, fyw, fu } = {}) {
    if (!productForms(family).includes(productForm)) {
      return Object.freeze({ status: "not-verified", grade: "", fy: null, fyw: null, fu: null, source: "Material basis not selected" });
    }

    const separateWebStrength = ["ub", "uc", "pfc"].includes(family);
    if (productForm === "project") {
      const momentStrength = Number(fy);
      const webStrength = separateWebStrength ? Number(fyw) : momentStrength;
      const tensileStrength = Number(fu);
      const valid = momentStrength > 0 && webStrength > 0 && tensileStrength >= Math.max(momentStrength, webStrength);
      return Object.freeze({
        status: valid ? "resolved" : "not-verified",
        grade: "User input",
        fy: valid ? momentStrength : null,
        fyw: valid ? webStrength : null,
        fu: valid ? tensileStrength : null,
        source: "Project / legacy material values"
      });
    }

    let moment = null;
    let web = null;
    if (productForm === "hot-rolled-section") {
      moment = SteelMaterials.hotRolledStrength(grade, dimensions.tf);
      web = SteelMaterials.hotRolledStrength(grade, dimensions.tw);
    } else if (productForm === "hollow-section") {
      moment = Number(dimensions.t) > 0 ? SteelMaterials.hollowStrength(grade) : null;
      web = moment;
    } else if (productForm === "round-bar") {
      moment = SteelMaterials.roundBarStrength(grade, dimensions.D);
      web = moment;
    }
    return Object.freeze({
      status: moment && web ? "resolved" : "not-verified",
      grade,
      fy: moment?.fy ?? null,
      fyw: web?.fy ?? null,
      fu: moment?.fu ?? null,
      source: moment && web ? SteelMaterials.PRODUCT_FORMS[productForm].standard : "Material strength not resolved"
    });
  }

  return Object.freeze({ FAMILY_DEFINITIONS, definition, productForms, directions, build, resolveMaterial });
});
