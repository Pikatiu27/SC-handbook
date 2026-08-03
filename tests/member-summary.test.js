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

assert.match(html, /<details class="member-section-details">/);
assert.doesNotMatch(html, /id="memberCustomName"/);
assert.doesNotMatch(html, /id="memberAlphaBAssumption"/);
assert.match(html, /id="memberRadiusOverrideDetails"/);
assert.match(html, /id="memberMaterialOverrideDetails"/);
assert.match(html, /id="memberFactorHelp"/);
assert.match(html, /id="memberTensionBasis"/);
assert.match(html, /<details class="member-demand-check" id="memberActionGroup">/);
assert.doesNotMatch(html, /id="memberActionGroup"[^>]*\sopen(?:\s|>)/);
assert.match(styles, /\.member-summary-primary \{[^}]*grid-template-columns: minmax\(190px, 1\.35fr\)/);
assert.match(styles, /\.member-section-details \{[^}]*grid-column: 1 \/ -1/);
assert.match(outline, /same hierarchy and visual structure as Beam `Selected section`/);

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
assert.match(script, /function setMemberInvalidState\(message, designation\)/);
assert.match(script, /function formatMemberUtilisation\(ratio\)/);
assert.match(script, /f_y must be greater than zero/);
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
assert.match(outline, /Equal Angle catalogue checks must use and identify the minor principal-axis radius/);
assert.match(outline, /result note must name the active governing limit state/);
assert.match(outline, /Keep the optional `Design action check` folded by default/);
assert.match(outline, /Do not place `x: \.\.\.; y: \.\.\.` strings in an always-visible primary metric/);
assert.match(outline, /eta = max\[0, 0\.00326\(lambda - 13\.5\)\]/);
assert.match(outline, /Axial inputs must fail closed/);
assert.doesNotMatch(traceability, /Ns = kf Ag fy/);
assert.match(traceability, /Ns = kf An fy/);
assert.match(traceability, /minor principal `r = 19\.6 mm`/);

const defaultAngleRow = script.match(/\[100,10,14\.2,9\.5,8,5,9\.53,1810,[^\]]+\]/);
assert.ok(defaultAngleRow, "Default 100 x 100 x 10 EA catalogue row not found.");
const angleValues = defaultAngleRow[0].slice(1, -1).split(",").map(Number);
const angleArea = angleValues[7];
const angleMinorPrincipalRadius = angleValues[24];
assert.equal(angleArea, 1810);
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
