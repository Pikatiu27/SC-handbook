const assert = require("assert");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

[
  "sectionMaterialForm",
  "sectionMaterialGrade",
  "sectionMaterialThickness",
  "sectionMaterialThicknessState",
  "sectionMaterialThicknessOverride",
  "sectionMaterialValidation",
  "sectionMaterialFy",
  "sectionMaterialFyDetail",
  "sectionMaterialFu",
  "sectionMaterialE",
  "sectionMaterialG",
  "sectionMaterialNu",
  "sectionMaterialAlpha",
  "sectionMaterialDensity",
  "sectionDesignKf",
  "sectionDesignCompactness",
  "sectionDesignZe"
].forEach(id => assert.ok(html.includes(`id="${id}"`), `Missing Section Properties material field ${id}`));

assert.ok(
  html.indexOf("steel-materials.js") < html.indexOf("app.js"),
  "steel-materials.js must load before app.js"
);
assert.ok(app.includes("SteelMaterials.resolve"), "Section Properties must use the shared material resolver");
assert.ok(app.includes("sectionCheckedDesignRecord"), "Section Properties must coordinate exact checked design rows");
assert.ok(app.includes("sectionMaterialThicknessManual"), "Custom material thickness must expose a manual override state");
assert.ok(app.includes("syncSectionMaterialControls(false, true)"), "Custom geometry edits must refresh linked material thickness");
