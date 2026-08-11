"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "app.js"), "utf8");
const memberCapacityScript = fs.readFileSync(path.join(root, "member-capacity.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const outline = fs.readFileSync(path.join(root, "SC_HANDBOOK.md"), "utf8");
const traceability = fs.readFileSync(path.join(root, "REFERENCE_TRACEABILITY.md"), "utf8");
const hollowRows = require(path.join(root, "beam-section-data.js"));
const hotRolledRows = require(path.join(root, "beam-hot-rolled-data.js"));

[
  "memberSummaryAxis",
  "memberSummarySlenderness",
  "memberSummaryNetArea",
  "memberSummaryStrength",
  "memberSummaryCompressionFactors",
  "memberSummaryKt"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing selected-member primary metric: ${id}`));

[
  "memberGeometrySummary",
  "memberAreaSummary",
  "memberMaterialSummary",
  "memberCompressionSummary",
  "memberTensionSummary"
].forEach(id => assert.match(html, new RegExp(`id="${id}"`), `Missing selected-member basis row: ${id}`));

assert.match(html, /<details class="member-section-details" id="memberSectionDetails">/);
assert.match(script, /User-entered section properties · verification required\./);
assert.match(script, /L_ex must be greater than zero/);
assert.match(script, /L_ey must be greater than zero/);
assert.doesNotMatch(html, /id="memberCustomName"/);
assert.doesNotMatch(html, /id="memberAlphaBAssumption"/);
assert.match(html, /class="input-group-fields three member-definition-fields"/);
assert.match(html, /id="memberRadiusField"/);
assert.doesNotMatch(html, /id="memberOverridesDetails"|id="memberRadiusOverrideDetails"/);
assert.match(html, /<details class="member-net-section-details" id="memberNetSectionDetails">/);
assert.doesNotMatch(html, /id="memberNetSectionDetails"[^>]*\sopen(?:\s|>)/);
assert.doesNotMatch(html, /id="memberMaterialOverrideDetails"/);
assert.match(html, /id="memberMaterialStatus" class="input-source-status"/);
assert.match(html, /id="memberMaterialReset"/);
assert.deepEqual(
  [...html.matchAll(/class="member-type(?: active)?"[^>]+data-member-type="([^"]+)"/g)].map(match => match[1]),
  ["ub", "uc", "pfc", "chs", "rhs", "shs", "ea", "rod", "custom"]
);
["ub", "uc", "rhs", "shs"].forEach(family => assert.match(html, new RegExp(`data-member-guide="${family}"`)));
assert.match(html, /id="memberFactorHelp"/);
assert.match(script, /MemberCapacity\.catalogueCompressionDefaults\(\{/);
assert.match(script, /dimensionOverride: memberDimensionOverrideActive\(\)/);
assert.doesNotMatch(script, /CHS basis: k<sub>f<\/sub> = 1\.000/);
assert.match(script, /Catalogue k<sub>f<\/sub>, or k<sub>f<\/sub> = 1\.000 for an ideal circular dimension override/);
[
  "memberCustomArea",
  "memberCustomRx",
  "memberCustomRy",
  "memberCustomLex",
  "memberCustomLey"
].forEach(id => {
  const input = html.match(new RegExp(`<input id="${id}"[^>]*>`))?.[0] || "";
  assert.ok(input, `Missing Custom / Built-up input: ${id}`);
  assert.doesNotMatch(input, /\svalue="[^"]*"/, `${id} must start blank.`);
});
assert.match(html, /<select id="memberCustomAlphaBx">/);
assert.match(html, /<select id="memberCustomAlphaBy">/);
assert.match(html, /User-entered section properties<\/b><small>Verification required/);
assert.match(html, /id="memberTensionBasis"/);
assert.match(html, /<details class="member-demand-check" id="memberActionGroup">/);
assert.match(html, /class="member-check-grid member-check-grid-compression"/);
assert.match(html, /class="member-check-grid member-check-grid-tension"/);
assert.match(styles, /\.member-check-grid-compression \{ grid-template-columns: repeat\(4/);
assert.match(styles, /\.member-check-grid-tension \{ grid-template-columns: repeat\(3/);
assert.doesNotMatch(html, /id="memberActionGroup"[^>]*\sopen(?:\s|>)/);
assert.match(styles, /\.member-summary-primary \{[^}]*grid-template-columns: minmax\(170px, 1\.25fr\)/);
assert.match(styles, /\.member-section-details \{[^}]*grid-column: 1 \/ -1/);
assert.match(outline, /same hierarchy and visual structure as Beam `Selected section`/);
assert.match(outline, /four always-visible primary metrics/);
assert.match(outline, /Keep `Connection \/ net section` folded by default/);
assert.match(html, /<b>Design basis and limitations<\/b>/);
assert.doesNotMatch(html.slice(html.indexOf('id="memberPanel"'), html.indexOf('id="reoPanel"')), /<b>Reference values<\/b>|<b>Basis and limitations<\/b>/);
assert.match(script, /function updateMemberNetSectionPresentation\(/);
assert.match(script, /cell\.hidden = !connectionAdjusted/);
assert.match(script, /\$\("memberNetArea"\)\.value = properties\.area\.toFixed\(3\)/);
assert.match(script, /MemberCapacity\.straightLineNetArea\(\{/);
assert.doesNotMatch(script, /Math\.round\(value\("memberHoleCount"\)\)/);
assert.match(script, /t: section\.actualT \|\| section\.t/);
assert.match(script, /actual t = \$\{formatDimension\(properties\.t\)\} mm/);
assert.match(script, /AS 4100 Cl\. 6\.2\.1, AS 4100 Cl\. 7\.2 and AS 4100 Cl\. 9\.1\.10/);
assert.match(script, /AS 4100 Table 7\.3\.2 Case \(a\); equal angle connected through one leg/);
assert.match(script, /replace\(\/\[\.\]\+\$\/, ""\)/);

[
  "memberDimD",
  "memberDimDepth",
  "memberDimB",
  "memberDimBf",
  "memberDimT",
  "memberDimTw",
  "memberDimTf",
  "memberRx",
  "memberRy",
  "memberIx",
  "memberIy"
].forEach(id => assert.doesNotMatch(html, new RegExp(`id="${id}"`), `Repeated section property remains in selected-member summary: ${id}`));

assert.match(script, /r: Math\.min\(section\.principalRx, section\.principalRy\)/);
assert.match(script, /r = r<sub>v<\/sub> = .*minor principal axis/);
assert.match(script, /A<sub>n<\/sub> = .*netArea/);
assert.match(script, /governingAxis\.label}-axis governs/);
assert.match(script, /governingAxis\.effectiveLength \/ 1000/);
assert.match(script, /governingAxis\.leOverR\.toFixed\(1\)/);
assert.match(script, /governingAxis\.alphaB\.toFixed\(1\)/);
assert.match(script, /L<sub>e\$\{axis\.label\}<\/sub>\/r<sub>\$\{axis\.label\}<\/sub> = \$\{axis\.leOverR\.toFixed\(1\)\}/);
assert.doesNotMatch(script, /memberSummarySlenderness"\)\.innerHTML = memberType === "custom"\s*\?\s*axisResults\.map/);
assert.match(script, /\$\("memberTensionBasis"\)\.textContent = `\$\{tensionGoverning\} governs · AS 4100 Cl\. 7\.2`/);
assert.match(script, /if \(memberActionGroup && mobileView\) memberActionGroup\.open = false/);
assert.match(memberCapacityScript, /eta = Math\.max\(0, 0\.00326 \* \(modifiedLambda - 13\.5\)\)/);
assert.doesNotMatch(memberCapacityScript, /modifiedLambda = Math\.max/);
assert.match(memberCapacityScript, /if \(modifiedLambda <= 0\)/);
assert.match(script, /function setMemberInvalidState\(message, designation\)/);
assert.match(script, /function formatMemberUtilisation\(ratio\)/);
assert.match(script, /f_y must be greater than zero/);
assert.match(script, /memberType === "ub" \|\| memberType === "uc"/);
assert.match(script, /memberType === "rhs" \|\| memberType === "shs"/);
assert.match(script, /\["chs", "rhs", "shs"\]\.includes\(memberType\)\) return memberHollowSections\(memberType\)/);
assert.match(script, /r: first\.r/);
assert.match(script, /const dimensionOverrideSupported = \["chs", "rod"\]/);
assert.doesNotMatch(html, /id="memberDimEa|id="memberDimPfc/);
assert.match(script, /setMemberFieldValidity\("memberRadiusInput"/);
assert.match(script, /setMemberFieldValidity\("memberLength"/);
assert.match(script, /const validArea = Number\.isFinite\(properties\.area\) && properties\.area > 0/);
assert.match(script, /Flexural buckling about the entered axes only\. Built-up action, local buckling, shear deformation and torsional buckling are not evaluated\./);
assert.match(script, /BeamHotRolledData\.equalAngle\[section\.designation\]/);
assert.match(script, /BeamHotRolledData\.pfc\.find\(section => section\.designation === `\$\{depth\}PFC`\)/);
assert.doesNotMatch(script, /const eaAxialGrades/);
assert.doesNotMatch(script, /const chsGrades/);
assert.match(memberCapacityScript, /alphaB = tf > 40 \? 1 : 0/);
assert.match(memberCapacityScript, /alphaB = -0\.5/);
assert.match(script, /"User override" : "Catalogue default"/);
assert.match(script, /effective length L_e must be greater than zero/);
assert.match(script, /k_t must be within the AS 4100 Cl\. 7\.3 range 0\.75 to 1\.00/);
assert.doesNotMatch(script, /const fy = value\("memberFyInput"\) \|\| grade\.fy/);
assert.doesNotMatch(script, /const fu = value\("memberFuInput"\) \|\| grade\.fu/);
assert.match(html, /id="memberLength" type="number" min="0\.1"/);
assert.match(html, /id="memberFyInput" type="number" min="1"/);
assert.match(html, /id="memberKt" type="number" min="0\.75"/);
assert.match(script, /formula: `&eta; = max\[0, 0\.00326\(&lambda; - 13\.5\)\]/);
assert.match(script, /&alpha;<sub>a<\/sub> = 2100\(&lambda;<sub>n<\/sub> - 13\.5\)/);
assert.match(script, /&alpha;<sub>a<\/sub> = \$\{axis\.alphaA\.toFixed\(2\)\}; &alpha;<sub>b<\/sub> = \$\{axis\.alphaB\.toFixed\(1\)\}; &lambda; = \$\{axis\.modifiedLambda\.toFixed\(1\)\}; &eta; = \$\{axis\.eta\.toFixed\(3\)\}; &xi; = \$\{axis\.xi\.toFixed\(3\)\}/);
assert.ok(
  script.indexOf('title: "Design section compression capacity"') < script.indexOf("compressionTraceRows,"),
  "Section compression must precede member slenderness and reduction in the calculation trace."
);
assert.ok(
  script.indexOf("compressionTraceRows,") < script.indexOf("memberCompressionTrace,"),
  "Member reduction must precede governing member compression in the calculation trace."
);
assert.match(outline, /It is not a second Section Properties report/);
assert.match(outline, /EA catalogue checks must use and identify the minor principal-axis radius/);
assert.match(outline, /result note must name the active governing limit state/);
assert.match(outline, /Keep the optional `Design action check` folded by default/);
assert.match(outline, /Do not place `x: \.\.\.; y: \.\.\.` strings in an always-visible primary metric/);
assert.match(outline, /eta = max\[0, 0\.00326\(lambda - 13\.5\)\]/);
assert.match(outline, /Axial inputs must fail closed/);
assert.match(outline, /Start project geometry and restraint inputs .* blank and fail closed/);
assert.doesNotMatch(traceability, /Ns = kf Ag fy/);
assert.match(traceability, /Ns = kf An fy/);
assert.match(traceability, /minor principal `r = 19\.6 mm`/);
assert.equal(hollowRows.filter(row => row.family === "chs").length, 73);
assert.equal(new Set(hollowRows.filter(row => row.family === "rhs").map(row => row.designation)).size, 89);
assert.equal(new Set(hollowRows.filter(row => row.family === "shs").map(row => row.designation)).size, 88);
assert.equal(Object.keys(hotRolledRows.equalAngle).length, 46);
assert.equal(hotRolledRows.pfc.length, 10);
assert.ok(hotRolledRows.pfc.every(section => Object.keys(section.grades).length === 2));
assert.match(outline, /all 73 Austube CHS grade-specific rows/);
assert.match(outline, /must not inherit `k_f` from the catalogue row used to initialise its dimensions/);
assert.match(traceability, /all 46 InfraBuild EA geometry\/design rows/);

const defaultAngleRow = script.match(/\[100,10,14\.2,9\.5,8,5,9\.53,1810,[^\]]+\]/);
assert.ok(defaultAngleRow, "Default 100 x 100 x 10 EA catalogue row not found.");
const angleValues = defaultAngleRow[0].slice(1, -1).split(",").map(Number);
const angleNominalThickness = angleValues[1];
const angleActualThickness = angleValues[3];
const angleArea = angleValues[7];
const angleMinorPrincipalRadius = angleValues[24];
assert.equal(angleNominalThickness, 10);
assert.equal(angleActualThickness, 9.5);
assert.equal(angleArea, 1810);
assert.equal(angleArea - 26 * angleActualThickness, 1563);
assert.notEqual(angleArea - 26 * angleNominalThickness, 1563);
assert.equal(angleMinorPrincipalRadius, 19.6);

const effectiveLength = 3000;
const fy = 320;
const kf = 1;
const alphaB = 0.5;
const lambdaN = effectiveLength / angleMinorPrincipalRadius * Math.sqrt(kf) * Math.sqrt(fy / 250);
const alphaA = 2100 * (lambdaN - 13.5) / (lambdaN ** 2 - 15.3 * lambdaN + 2050);
const modifiedLambda = lambdaN + alphaA * alphaB;
const eta = 0.00326 * (modifiedLambda - 13.5);
const xi = ((modifiedLambda / 90) ** 2 + 1 + eta) / (2 * (modifiedLambda / 90) ** 2);
const alphaC = xi * (1 - Math.sqrt(1 - (90 / (xi * modifiedLambda)) ** 2));
const designCompression = alphaC * 0.9 * kf * angleArea * fy / 1000;
assert.ok(Math.abs(designCompression - 112.4069516) < 1e-6, `Unexpected EA design compression capacity: ${designCompression}`);

console.log("Member selected-summary contract tests passed.");
