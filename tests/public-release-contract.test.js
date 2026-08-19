"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");

const html = read("index.html");
const app = read("app.js");
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
assert.match(html, /Build 0\.7\.56/, "The visible public build must match this release");
assert.match(html, /styles\.css\?v=20260819plylayout1/, "The current ply-input layout stylesheet must be cache-busted");
assert.match(html, /monopole-capacity\.js\?v=20260814polygonflat1/, "The corrected Monopole calculation module must be cache-busted");
assert.match(html, /monopole-app\.js\?v=20260814polygonflat1/, "The corrected Monopole display module must be cache-busted");
assert.match(html, /section-catalogue\.js\?v=20260818sectiondirectory2/, "The checked-design-row catalogue helper must be cache-busted");
assert.match(html, /bolt-capacity\.js\?v=20260818boltedge1/, "The AS 4100 bolt edge-distance helper must be cache-busted");
assert.match(html, /bolt-integrity\.js\?v=20260819plyarea1/, "The straight-section net-area helper must be cache-busted");
assert.match(html, /reo-state\.js\?v=20260819reostate1/, "The Reinforcement state contract must be cache-busted");
assert.match(html, /app\.js\?v=20260819reostate1/, "The current shared display path must be cache-busted");
assert.match(app, /element\.tagName === "SELECT"[^\n]+addEventListener\("change", calculateBolt\)/, "Bolt selects must recalculate on change");
assert.match(app, /window\.addEventListener\("pageshow", \(\) => window\.requestAnimationFrame\(calculateBolt\)\)/, "Restored bolt inputs must recalculate on pageshow");
assert.match(html, /id="integrityPlateWidth"/);
assert.match(html, /id="integrityHoleCount"/);
assert.match(html, /id="integrityHoleDiameter"/);
assert.match(html, /id="integrityAreaMode"[^>]*>[\s\S]*Straight section[\s\S]*Manual areas/);
assert.match(html, /class="integrity-kbs-control"[\s\S]*id="integrityKbs"[\s\S]*1\.0 · Uniform[\s\S]*0\.5 · Non-uniform/);
assert.ok(html.indexOf("Selected ply inputs") < html.indexOf("Net-section tension"));
assert.ok(html.indexOf("Net-section tension") < html.indexOf("Block shear · governing path"));
assert.ok(html.indexOf("Block shear · governing path") < html.indexOf("integrity-results"));
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
