"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");

const html = read("index.html");
const app = read("app.js");
const styles = read("styles.css");
const workflow = read(".github/workflows/pages.yml");
const publication = read("PUBLICATION_NOTICE.md");
const repositoryTerms = read("LICENSE.md");
const thirdParty = read("THIRD_PARTY_NOTICES.md");
const fontLicense = read("assets/fonts/OFL.txt");
const publicDocumentation = [
  read("README.md"),
  read("SC_HANDBOOK.md"),
  read("REFERENCE_TRACEABILITY.md"),
  read("research/rebar-lap/REBAR_LAP_RESEARCH.md")
].join("\n");

assert.match(html, /<b>Public beta<\/b>/, "The public-beta boundary must be visible before the calculators");
assert.match(html, /Not certified design software/, "The visible notice must state the software boundary");
assert.match(html, /github\.com\/Pikatiu27\/SC-handbook\/issues\/new/, "A public issue-reporting route is required");
assert.match(html, /Build 0\.7\.67/, "The visible public build must match this release");
assert.match(html, /styles\.css\?v=20260821beamrelease1/, "The current shared layout stylesheet must be cache-busted");
assert.match(html, /monopole-capacity\.js\?v=20260814polygonflat1/, "The corrected Monopole calculation module must be cache-busted");
assert.match(html, /monopole-app\.js\?v=20260820monopolelayout1/, "The corrected Monopole display module must be cache-busted");
assert.match(html, /section-catalogue\.js\?v=20260818sectiondirectory2/, "The checked-design-row catalogue helper must be cache-busted");
assert.match(html, /bolt-capacity\.js\?v=20260818boltedge1/, "The AS 4100 bolt edge-distance helper must be cache-busted");
assert.match(html, /bolt-integrity\.js\?v=20260819plyarea1/, "The straight-section net-area helper must be cache-busted");
assert.match(html, /reo-state\.js\?v=20260819reostate1/, "The Reinforcement state contract must be cache-busted");
assert.match(html, /app\.js\?v=20260821beamrelease1/, "The current shared display path must be cache-busted");
assert.match(app, /element\.tagName === "SELECT"[^\n]+addEventListener\("change", calculateBolt\)/, "Bolt selects must recalculate on change");
assert.match(app, /window\.addEventListener\("pageshow", \(\) => window\.requestAnimationFrame\(calculateBolt\)\)/, "Restored bolt inputs must recalculate on pageshow");
assert.match(app, /groupShearGoverns = evaluatedConnectionShearValid[\s\S]*groupShear < governingBearingGroupCapacity/, "The lower bolt-shear result must be identified as governing");
assert.match(app, /connectedPlyBearingGoverns = evaluatedConnectionShearValid[\s\S]*governingBearingGroupCapacity < groupShear/, "The lower ply-bearing result must be identified as governing");
assert.match(html, /id="integrityPlateWidth"/);
assert.match(html, /id="integrityHoleCount"/);
assert.match(html, /id="integrityHoleDiameter"/);
assert.match(html, /id="integrityAreaMode"[^>]*>[\s\S]*Straight section[\s\S]*Manual areas/);
assert.match(html, /class="form-grid four integrity-block-areas"[\s\S]*id="integrityKbs"[\s\S]*1\.0 · Uniform[\s\S]*0\.5 · Non-uniform/);
assert.ok(html.indexOf("Connection inputs") < html.indexOf("Ply rupture assessment"));
assert.ok(html.indexOf("Ply rupture assessment") < html.indexOf("Connection capacity summary"));
assert.ok(html.indexOf("Checked ply inputs") < html.indexOf("Net-section tension"));
assert.ok(html.indexOf("Net-section tension") < html.indexOf("Block shear path"));
assert.ok(html.indexOf("Block shear path") < html.indexOf("Connection capacity summary"));
assert.match(html, /class="ply-section-heading connection-group-heading"[\s\S]*<b>Bolt group<\/b>/);
assert.match(html, /connection-locator connection-locator-main">A<\/span><span>Connection inputs<\/span>/);
assert.match(html, /connection-locator connection-locator-sub">A1<\/span>[\s\S]*?<b>Bolt group<\/b>/);
assert.match(html, /connection-locator connection-locator-sub">A2<\/span>[\s\S]*?<b>Hole and spacing<\/b>/);
assert.match(html, /connection-locator connection-locator-sub">A3<\/span>[\s\S]*?<b>Connected plies<\/b>/);
assert.match(html, /connection-locator connection-locator-main">B<\/span><span>Ply rupture assessment<\/span>/);
assert.match(html, /connection-locator connection-locator-sub">B1<\/span>[\s\S]*?<b>Checked ply inputs<\/b>/);
assert.match(html, /connection-locator connection-locator-sub">B2<\/span>[\s\S]*?<b>Net-section tension<\/b>/);
assert.match(html, /connection-locator connection-locator-sub">B3<\/span>[\s\S]*?<b>Block shear path<\/b>/);
assert.match(html, /connection-locator connection-locator-main">C<\/span><span>Connection capacity summary<\/span>/);
assert.match(html, /connection-locator connection-locator-sub">C1<\/span><b>Ply rupture<\/b>/);
assert.doesNotMatch(html, /Block shear · governing path/);
assert.match(styles, /\.connection-section-title \{[^}]*align-items: baseline;[^}]*gap: 9px;/);
assert.match(styles, /\.connection-locator \{[^}]*flex: 0 0 24px;[^}]*width: 24px;/);
assert.match(styles, /\.connection-group-heading \{[^}]*align-items: baseline;[^}]*gap: 9px;/);
assert.match(styles, /\.connection-result-subheading \{[^}]*align-items: baseline;[^}]*gap: 9px;/);
assert.doesNotMatch(html, /Group size and shear planes per bolt|Hole type and pitch<\/small>|Material and edge geometry|Reported separately from the shear-capacity summary/);
assert.match(html, /id="governingBearingCapacity"/);
assert.match(html, /id="groupShearResultRow"/);
assert.match(html, /id="bearingResultRow"/);
assert.doesNotMatch(html, /id="governingConnectionShearCapacity"|Governing connection shear capacity/);
assert.ok(html.indexOf('id="governingBearingCapacity"') < html.indexOf('id="fullBearingLimitRow"'));
assert.ok(html.indexOf('id="fullBearingLimitRow"') < html.indexOf('id="edgeBearingLimitRow"'));
assert.doesNotMatch(html, /<details class="integrity-check"/);
assert.doesNotMatch(html, /class="connection-component-details"|Bearing limit details/);
assert.doesNotMatch(app, /(?:fullBearingLimitRow|edgeBearingLimitRow)[^\n]+classList\.toggle\("governing"/);
assert.doesNotMatch(html, /class="bearing-limit-row governing"/);
assert.match(app, /Controls bearing/);
assert.match(app, /groupShearResultRow[^\n]+classList\.toggle\("governing", groupShearGoverns\)/);
assert.match(app, /bearingResultRow[^\n]+classList\.toggle\("governing", connectedPlyBearingGoverns\)/);
assert.match(html, /resources\/application-guide\/design-capacity-tables-for-structural-steel-hollow\//, "The current Austube source route is required");
assert.doesNotMatch(html, /austubemills\.com\.au\/resources\/design-capacity-tables\//, "The retired Austube source route must not return");

assert.match(publication, /public beta engineering quick-reference handbook/i);
assert.match(publication, /does not intentionally collect, transmit or store calculator inputs/i);
assert.match(repositoryTerms, /All rights reserved/);
assert.match(thirdParty, /SIL Open Font License, Version 1\.1/);
assert.match(fontLicense, /SIL OPEN FONT LICENSE Version 1\.1/);
assert.doesNotMatch(publicDocumentation, /C:\\Users\\silin/i, "Public documentation must not expose a local username path");
assert.match(publicDocumentation, /%USERPROFILE%\\Documents\\Codex\\Reference/, "The governed reference location must remain portable and explicit");

assert.match(workflow, /for test_file in tests\/\*\.test\.js/);
assert.match(workflow, /node --check/);
assert.match(workflow, /git diff --check/);
assert.match(workflow, /deploy:\s+[\s\S]*needs: verify/, "Deployment must depend on the verification job");
assert.match(workflow, /actions\/deploy-pages@v4/);

console.log("Public release contract tests passed.");
