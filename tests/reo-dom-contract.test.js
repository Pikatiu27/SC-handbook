"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const completeApp = fs.readFileSync(path.join(root, "app.js"), "utf8");
const stateContract = fs.readFileSync(path.join(root, "reo-state.js"), "utf8");
const app = completeApp.slice(
  completeApp.indexOf("function readReoOptions("),
  completeApp.indexOf("function setMemberType(")
);

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
assert.deepEqual(duplicateIds, [], "HTML ids must be unique");

const referencedIds = [...new Set([...app.matchAll(/\$\("([^"]+)"\)/g)].map(match => match[1]))];
const missingIds = referencedIds.filter(id => !ids.includes(id));
assert.deepEqual(missingIds, [], "Every live $(id) reference must exist in index.html");

assert.match(html, /id="reoRefinedCandidateLength"/);
assert.match(html, /id="reoExistingRefinedCandidateLength"/);
assert.match(html, /id="reoPressureReference"[^>]*value="Structural analysis · governing ULS load combination"/);
assert.match(html, /id="reoExistingPressureReference"[^>]*value="Structural analysis · governing ULS load combination"/);
assert.match(html, /id="reoTerminationRequirements"/);
assert.match(html, /Galvanized reinforcement bend geometry is not represented; verify AS 3600 Cl\. 17\.2\.3\.3\(d\) separately\./);
assert.match(html, /galvanized reinforcement bend geometry, complete hook\/cog geometry and detailing design/);
assert.doesNotMatch(html, /id="reoApplicationField"|id="reoApplicationNote"|Connection context/);
assert.doesNotMatch(html, /id="reoProfisDetails"/);
assert.doesNotMatch(html, /id="reoAvailableDepth"/);
assert.doesNotMatch(html, /id="reoExtensionRecord"|Extension design paths|REFERENCE SUMMARY/);
assert.doesNotMatch(app, /Project context|updateReoConnectionStatus/);
assert.match(html, /<script src="reo-state\.js\?v=[^"]+"><\/script>/);
assert.match(html, /id="reoExistingMethodField"><span>Calculation method<\/span>/);
assert.match(html, /id="reoAnchorageResultTitle">Development reference length<\/h2>/);
assert.doesNotMatch(html, /Required development length/);
assert.match(html, /<b>Check selection<\/b>/);
assert.equal((html.match(/class="[^"]*reo-group-heading[^"]*"/g) || []).length, 6, "Primary Reinforcement input groups must share one restrained heading treatment");
assert.doesNotMatch(html, /class="reo-calculated-basis[^"]*reo-group-heading/, "Calculated bases must remain visually distinct from input-group headings");
assert.match(html, /id="reoAssumptionsTitle">Additional conditions<\/b>/);
assert.match(html, /id="reoLapKeyConditions"[\s\S]*Design conditions[\s\S]*id="reoMemberTypeField"[\s\S]*id="reoCastingPositionField"/);
assert.ok(html.indexOf('id="reoLapKeyConditions"') < html.indexOf('id="reoAssumptionsDetails"'));
assert.match(html, /Tension-tie classification/);
assert.match(html, /Member geometry/);
assert.match(html, /Calculated c<sub>d<\/sub>/);
assert.match(html, /Refined development method/);
assert.match(html, /Fitments crossed by splitting plane, n<sub>f<\/sub>/);
assert.match(html, /id="reoConcreteConditionsHeading">Concrete and reinforcement<\/b>/);
assert.match(html, /class="input-group-fields reo-development-condition-fields"[\s\S]*id="reoExistingMemberType"[\s\S]*id="reoExistingCastingPosition"[\s\S]*id="reoExistingConcreteStrength"[\s\S]*id="reoExistingMaterialCondition"/);
assert.match(styles, /#reoExistingGeometryFields,[\s\S]*#reoExistingGeometryFields\.is-narrow \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/);
assert.match(html, /class="reo-calculated-basis"[^>]*aria-label="Calculated lap geometry basis"[\s\S]*id="reoCd"/);
assert.match(html, /class="reo-calculated-basis"[^>]*aria-label="Calculated development geometry basis"[\s\S]*id="reoExistingCd"/);
assert.doesNotMatch(html, /class="reo-derived-value"|class="unit reo-derived-line"/);
assert.match(styles, /\.reo-calculated-basis \{[\s\S]*border-left: 3px solid var\(--reo-accent\)/);
assert.match(styles, /\.reo-group-heading::before \{[^}]*width: 3px;[^}]*background: var\(--reo-accent\);/);
assert.match(styles, /#reoPanel \.reo-group-heading b \{[^}]*font-size: 14px;[^}]*font-weight: 850;/);
assert.doesNotMatch(html, /id="reoMemberRoleField"><span>Tension-tie status|id="reoMemberTypeField"><span>Member classification|Verified development refinement|Fitment bars crossed/);
assert.match(completeApp, /"Additional conditions"/);
assert.match(completeApp, /"Existing concrete"/);
assert.doesNotMatch(html, /Choose the required check|These selections change the AS 3600 calculation|Enter the concrete strength|reoReferenceBasisHelp|reoConcreteConditionsHelp|reoAnchoragePathNote|reoExistingGeometryHelp/);
assert.match(completeApp, /globalThis\.reoState\.confirmationResetsForInput\(id\)/);
assert.doesNotMatch(completeApp, /const reoLapQualificationResetIds|const reoTransverseLocationResetIds/);
assert.match(stateContract, /function confirmationResetsForInput\(id\)/);

console.log("Reo DOM contract tests passed.");
