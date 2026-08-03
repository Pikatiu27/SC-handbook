(function (root, factory) {
  "use strict";

  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.SteelMaterials = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const COMMON = Object.freeze({
    E: Object.freeze({ value: 200000, unit: "MPa", basis: "standard" }),
    G: Object.freeze({ value: 80000, unit: "MPa", basis: "standard" }),
    nu: Object.freeze({ value: 0.25, unit: "", basis: "standard" }),
    alphaT: Object.freeze({ value: 11.7e-6, unit: "/°C", basis: "standard" }),
    density: Object.freeze({ value: 7850, unit: "kg/m³", basis: "engineering" }),
    source: "AS 4100:2020 Cl. 2.2.4; density is the stated handbook steel-mass basis"
  });

  const PRODUCT_FORMS = Object.freeze({
    "hot-rolled-section": Object.freeze({
      label: "Hot-rolled section",
      standard: "AS/NZS 3679.1:2016",
      table: "Table 14",
      thicknessLabel: "Governing part thickness",
      grades: Object.freeze(["300PLUS", "Grade 350"])
    }),
    "round-bar": Object.freeze({
      label: "Round bar",
      standard: "AS/NZS 3679.1:2016",
      table: "Table 15",
      thicknessLabel: "Nominal diameter",
      grades: Object.freeze(["300PLUS", "Grade 350"])
    }),
    "hollow-section": Object.freeze({
      label: "Cold-formed hollow section",
      standard: "AS/NZS 1163:2016",
      table: "AS/NZS 1163 grade basis",
      thicknessLabel: "Nominal wall thickness",
      grades: Object.freeze(["C250L0", "C350L0"])
    }),
    project: Object.freeze({
      label: "Project-defined steel",
      standard: "Project documents",
      table: "User-confirmed values",
      thicknessLabel: "Governing thickness",
      grades: Object.freeze(["User input"])
    })
  });

  const positive = value => Number.isFinite(Number(value)) && Number(value) > 0;

  function hotRolledStrength(grade, thickness) {
    if (!positive(thickness)) return null;
    const t = Number(thickness);
    if (grade === "300PLUS") {
      return { fy: t < 11 ? 320 : t <= 17 ? 300 : 280, fu: 440 };
    }
    if (grade === "Grade 350") {
      return { fy: t < 11 ? 360 : t < 40 ? 340 : 330, fu: 480 };
    }
    return null;
  }

  function roundBarStrength(grade, diameter) {
    if (!positive(diameter)) return null;
    const d = Number(diameter);
    if (grade === "300PLUS") {
      return { fy: d <= 50 ? 300 : d < 100 ? 290 : 280, fu: 440 };
    }
    if (grade === "Grade 350") {
      return { fy: d <= 50 ? 340 : d < 100 ? 330 : 320, fu: 480 };
    }
    return null;
  }

  function hollowStrength(grade) {
    if (grade === "C250L0") return { fy: 250, fu: 320 };
    if (grade === "C350L0") return { fy: 350, fu: 430 };
    return null;
  }

  function gradeOptions(productForm) {
    return PRODUCT_FORMS[productForm]?.grades || PRODUCT_FORMS.project.grades;
  }

  function resolve(input = {}) {
    const productForm = PRODUCT_FORMS[input.productForm] ? input.productForm : "";
    if (!productForm) {
      return Object.freeze({
        productForm: "",
        productFormLabel: "Material basis not selected",
        standard: "Material basis not selected",
        table: "Select product form",
        source: "Material basis not selected",
        grade: "",
        thickness: null,
        thicknessLabel: "Governing thickness",
        thicknessBasis: "unresolved",
        fy: null,
        fu: null,
        strengthBasis: "not-verified",
        common: COMMON,
        status: "not-verified",
        validation: "Select a product form or project-defined steel basis."
      });
    }
    const definition = PRODUCT_FORMS[productForm];
    const grade = gradeOptions(productForm).includes(input.grade) ? input.grade : gradeOptions(productForm)[0];
    const thickness = positive(input.thickness) ? Number(input.thickness) : null;
    const thicknessBasis = ["catalogue", "geometry", "manual", "project"].includes(input.thicknessBasis)
      ? input.thicknessBasis
      : "manual";
    let strengths = null;
    let strengthBasis = "standard";
    let validation = "";

    if (productForm === "hot-rolled-section") strengths = hotRolledStrength(grade, thickness);
    if (productForm === "round-bar") strengths = roundBarStrength(grade, thickness);
    if (productForm === "hollow-section" && thickness) strengths = hollowStrength(grade);
    if (productForm === "project") {
      const fy = Number(input.fy);
      const fu = Number(input.fu);
      strengths = thickness && positive(fy) && positive(fu) && fu >= fy
        ? { fy: Number(input.fy), fu: Number(input.fu) }
        : null;
      strengthBasis = "project";
      if (!thickness) validation = "Enter a positive controlling thickness.";
      else if (!positive(fy) || !positive(fu)) validation = "Enter positive project yield and tensile strengths.";
      else if (fu < fy) validation = "Tensile strength fu must be greater than or equal to yield strength fy.";
    }
    if (!strengths && !validation) validation = "Enter a positive controlling thickness for the selected product form.";

    return Object.freeze({
      productForm,
      productFormLabel: definition.label,
      standard: definition.standard,
      table: definition.table,
      source: `${definition.standard} ${definition.table}`,
      grade,
      thickness,
      thicknessLabel: definition.thicknessLabel,
      thicknessBasis,
      fy: strengths?.fy ?? null,
      fu: strengths?.fu ?? null,
      strengthBasis,
      common: COMMON,
      status: strengths ? "resolved" : "not-verified",
      validation
    });
  }

  return Object.freeze({
    COMMON,
    PRODUCT_FORMS,
    gradeOptions,
    resolve,
    hotRolledStrength,
    roundBarStrength,
    hollowStrength
  });
});
