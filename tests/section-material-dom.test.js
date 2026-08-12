const assert = require("assert");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

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
assert.ok(app.includes("sameSectionDimension(item.D, selected.drawing?.D)"), "CHS design rows must match numeric diameter rather than formatted designation text");
assert.ok(app.includes("Selected grade not listed for this section"), "Unavailable grade-specific design rows must explain the source-table gap");
assert.ok(app.includes("Derived · catalogue Ze interval"), "Equal Angle compactness must identify its derived catalogue-Ze basis");
assert.ok(app.includes('function beamPfcSection(section)'), "Section Properties must retain the shared PFC record builder");
assert.ok(app.includes('BeamSectionReconciliation.reconcile(record, grade, key)'), "PFC and Equal Angle classifications must reuse the checked reconciliation layer");
assert.ok(app.includes("displayGroupedSignificant(value, 3)"), "Catalogue Ze values must retain three decimal half-up significant digits");
assert.ok(app.includes("sectionMaterialThicknessManual"), "Custom material thickness must expose a manual override state");
assert.ok(app.includes("syncSectionMaterialControls(false, true)"), "Custom geometry edits must refresh linked material thickness");
assert.ok(html.includes('<option value="">Select material basis</option>'), "Custom material selection must expose an unresolved initial basis");
assert.ok(html.includes('<option value="round-bar">Round Bar</option>'), "Section Properties must use the canonical Round Bar family label");
assert.ok(app.includes('"Select material basis"'), "Custom material controls must explain the unresolved basis");
assert.ok(/sectionShape"\)\.addEventListener\("change", \(\) => \{\s+syncSectionMaterialControls\(true\);/.test(app), "Changing custom shape must reset the material basis");
assert.ok(app.includes('closest(".section-properties-figure").hidden = true'), "Invalid geometry must hide the stale section figure");
assert.ok(app.includes("zero by rotational symmetry"), "Circular zero warping must be interpreted");
assert.ok(app.includes("n-n / p-p centroidal · x-x / y-y principal"), "Equal Angle captions must use full axis notation");
assert.ok(app.includes("Catalogue mass + nominal D/t-derived properties"), "CHS summary must distinguish catalogue mass from D/t-derived properties");
assert.ok(app.includes("Catalogue mass/diameter + geometry-derived properties"), "Round-bar summary must distinguish published inputs from derived properties");
assert.ok(app.includes('`${directionLabel} · principal ${symbol}-${symbol}`'), "Beam Equal Angle summary must identify the selected principal axis");
assert.ok(!styles.includes(".section-properties-figure { display: none; }"), "The Section Properties axis figure must remain available on phone");
assert.ok(styles.includes("#propertiesPanel .section-properties-table .section-directional-value { display: block; }"), "Directional values must stack within narrow phone table cells");
assert.ok(styles.includes(".input-group-fields.section-material-inputs { grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: start; }"), "Material controls must align by their top label rather than the lower status row");
assert.ok(styles.includes(".section-material-input-group > .input-group-heading { align-self: start; }"), "Material definition heading must share the control-row top baseline");
assert.ok(html.includes('id="sectionCatalogueFamilyTabs"'), "Section Properties must expose catalogue families as a visible category switch");
assert.ok(html.includes('<label class="size-field" hidden><span>Product family</span><select id="sectionCatalogueFamily"></select></label>'), "The family select must remain as the calculation state control without duplicating the visible category UI");
assert.ok(app.includes('class="section-catalogue-family-tab"'), "Catalogue family tabs must be generated from the accepted family directory");
assert.ok(app.includes('rhs: sectionHollowCatalogueSections("rhs")'), "Section Properties must include the checked RHS catalogue directory");
assert.ok(app.includes('shs: sectionHollowCatalogueSections("shs")'), "Section Properties must include the checked SHS catalogue directory");
assert.ok(html.includes('<option value="tee">T-section</option>'), "Custom geometry must include the reviewed ideal T-section");
assert.ok(html.includes('data-section-shapes="i channel tee"'), "T-section must expose d, bf, tw and tf inputs");
assert.ok(app.includes("data-section-category-custom"), "Custom geometry must remain available in the same visible category switch");
assert.ok(app.includes('button.setAttribute("aria-pressed", String(active))'), "Catalogue family tabs must expose their selected state");
assert.ok(html.includes('class="section-properties-mode-switch" role="group" aria-label="Section property source" hidden'), "The legacy source-mode control must not create a second visible tab row");
assert.ok(html.includes('id="sectionDesignAttributeHeading"'), "The material-dependent design heading must be addressable as one conditional group");
assert.ok(app.includes('$("sectionDesignAttributeHeading").hidden = !showDesignValues'), "Custom geometry must hide the complete unsupported design-value group");
assert.ok(app.includes('class="section-design-direction"'), "Direction-dependent design values must render as compact labelled rows");
assert.ok(app.includes('"Supplementary geometric reference"'), "A lone polar second moment must use an accurate supplementary heading");
assert.ok(styles.includes(".section-catalogue-family-tab { min-height: 44px;"), "Section category controls must retain a 44 px touch target");
assert.ok(styles.includes("#propertiesPanel .source-body { grid-template-columns: 1fr;"), "Section source notes must use a compact single reading column");
assert.ok(!html.match(/class="tool-tab[^"]*"[^>]*aria-selected=/), "Top tool buttons must not expose incomplete tab semantics");
assert.ok(html.match(/class="tool-tab active"[^>]*aria-pressed="true"/), "Top tool buttons must expose pressed state");
