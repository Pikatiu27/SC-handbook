"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const adoption = JSON.parse(fs.readFileSync(path.join(root, "engineering", "drawing-standard-adoption.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(path.join(root, "engineering", "pre-drawing-case-reviews", "product-reference-figures.json"), "utf8"));
const symbols = JSON.parse(fs.readFileSync(path.join(root, "engineering", "product-figure-symbol-register.json"), "utf8"));

const requiredAdoptionKeys = [
  "adoption_id", "project_id", "project_name", "adoption_status", "package",
  "governing_project_source_refs", "project_profile_ref", "adopted_modules",
  "object_classes", "output_types", "overrides", "pre_drawing_case_review",
  "validation", "release_boundary", "known_exclusions", "adoption_owner"
];
requiredAdoptionKeys.forEach(key => assert.ok(Object.hasOwn(adoption, key), `Missing adoption field: ${key}`));
assert.equal(adoption.package.document_id, "UWEDS-001");
assert.equal(adoption.package.version, "1.10.0");
assert.match(adoption.package.pin_value, /^UWEDS-001:1\.10\.0:manifest-sha256:[A-F0-9]{64}$/);
assert.ok(adoption.adopted_modules.includes("00_UNIFIED_WEB_ENGINEERING_DRAWING_STANDARD_V1.md"));
assert.ok(adoption.adopted_modules.includes("PROJECT_ADOPTION_GUIDE.md"));
assert.ok(adoption.adopted_modules.includes("PACKAGE_MANIFEST.md"));
assert.ok(adoption.adopted_modules.includes("atlas/COMMON_ENGINEERING_COMPONENT_AND_CONNECTION_DRAWING_OUTLINE.md"));
assert.ok(adoption.adopted_modules.includes("rules/common_component_drawing_rules.yaml"));
assert.ok(adoption.adopted_modules.includes("tests/COMMON_COMPONENT_AND_CONNECTION_DRAWING_CHECKLIST.md"));
assert.ok(adoption.adopted_modules.includes("09_ENGINEERING_VIEW_AND_SECTION_GENERATION_STANDARD_V1.md"));
assert.ok(adoption.adopted_modules.includes("11_CAD_GEOMETRY_QA_AND_PREFLIGHT_STANDARD_V1.md"));
assert.ok(adoption.adopted_modules.includes("12_MODEL_DRAWING_WEB_REVISION_SYNCHRONISATION_STANDARD_V1.md"));
assert.equal(new Set(adoption.adopted_modules).size, adoption.adopted_modules.length);
assert.equal(adoption.adoption_status, "APPROVED");
assert.equal(adoption.release_boundary, "FOR_REVIEW");
assert.ok(adoption.approved_by);
assert.ok(adoption.approved_at);
assert.ok(adoption.governing_project_source_refs.includes("engineering/product-figure-symbol-register.json"));
adoption.overrides.forEach(override => {
  ["requirement_id", "original_value", "replacement_value", "authority_source", "approved_by", "approval_date", "affected_outputs"]
    .forEach(key => assert.ok(Object.hasOwn(override, key), `Missing override field: ${key}`));
});

const requiredReviewKeys = [
  "review_id", "drawing_work_id", "representation_class", "product_involved",
  "installation_or_inspection_state_important", "case_refs", "reviewed_at",
  "reviewer", "comparability", "physical_relationships_learned", "adopted_patterns",
  "important_differences", "not_copied", "governing_project_source_refs", "outcome"
];
requiredReviewKeys.forEach(key => assert.ok(Object.hasOwn(review, key), `Missing review field: ${key}`));
assert.ok(review.case_refs.some(reference => reference.source_role === "MANUFACTURER"));
[
  "CASE-MFR-EZYSTRUT-UBOLT", "CASE-MFR-HOBSON-ROUND-UBOLT", "CASE-MFR-LINDAPTER-HOLLOBOLT",
  "CASE-MFR-HOBSON-HBS", "CASE-MFR-ICCONS-UNIBOLT", "CASE-MFR-KEE-BOXBOLT",
  "CASE-MFR-BLIND-BOLT-COMPANY", "CASE-MFR-ALLFASTENERS-NEXGEN2"
].forEach(caseId => assert.ok(review.case_refs.some(reference => reference.case_id === caseId), `Missing product figure case: ${caseId}`));
assert.equal(review.outcome, "PROCEED_WITH_RECORDED_ASSUMPTIONS");
assert.equal(review.drawing_package_version, "1.10.0");
assert.equal(review.view_contract.production_mode, "WEB_NATIVE");
assert.equal(review.view_contract.scale, "NTS");
assert.equal(symbols.status, "APPROVED");
assert.equal(symbols.revision, "R2");
assert.equal(symbols.parent_dictionary, "C:/Users/silin/Documents/Codex/Drawing/profiles/ENGINEERING_SYMBOL_DICTIONARY.yaml");
["MAX", "MIN", "AC", "DC", "P"].forEach(display => {
  const entry = symbols.entries.find(symbol => symbol.display === display);
  assert.ok(entry, `Missing controlled product symbol: ${display}`);
  ["symbol_id", "accessible_name", "ascii_fallback", "meaning", "source_type"].forEach(key => assert.ok(entry[key], `Missing ${key} for ${display}`));
});

console.log("Drawing adoption contract tests passed.");
