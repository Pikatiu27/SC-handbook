"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const monopoleApp = fs.readFileSync(path.join(root, "monopole-app.js"), "utf8");
const monopoleCapacity = fs.readFileSync(path.join(root, "monopole-capacity.js"), "utf8");
const panel = html.slice(
  html.indexOf('<section id="monopolePanel"'),
  html.indexOf('<section id="memberPanel"')
);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const referencedIds = [...new Set([...monopoleApp.matchAll(/\$\("([^"]+)"\)/g)].map(match => match[1]))];
const missingIds = referencedIds.filter(id => !ids.includes(id));
assert.deepEqual(missingIds, [], "Every monopole $(id) reference must exist in index.html");

assert.match(app, /const toolNames = \[[^\]]*"monopole"/);
assert.match(app, /"steel-members": \[[^\]]*"monopole"/);
assert.match(app, /function centreActiveToolNavigation\(\)/);
assert.match(app, /if \(open\) window\.requestAnimationFrame\(centreActiveToolNavigation\)/);
assert.match(html, /data-tool="monopole"[^>]*>Monopole Section Capacity</);
assert.match(html, /id="monopoleStationBody"/);
assert.match(html, /id="monopoleChart"/);
assert.match(panel, /class="monopole-stations-section monopole-station-details"/);
assert.match(panel, /joint resistance not evaluated/i);
assert.doesNotMatch(panel, /Actual L<sub>o<\/sub>/);
assert.doesNotMatch(panel, /monopole-summary-strip/);
assert.doesNotMatch(panel, /id="monopoleForm"/);
assert.match(panel, /id="monopoleMaterialMode"/);
assert.match(panel, /id="monopoleSeparateDesignThickness"/);
assert.match(panel, /Design thickness override, t<sub>d<\/sub>/);
assert.match(panel, /id="monopoleDesignThicknessState"/);
assert.match(panel, /Optional project input\./);
assert.match(panel, /Shaft steel mass/);
assert.match(panel, /includes overlap shells/);
assert.match(panel, /capacity only/);
assert.match(panel, /id="monopoleDesignThickness"/);
assert.match(panel, /t<sub>nom<\/sub>/);
assert.match(panel, /t<sub>d<\/sub>/);
assert.match(monopoleApp, /D<sub>i<\/sub> = D - 2t<sub>d<\/sub>/);
assert.match(monopoleApp, /r<sub>i<\/sub>\/t<sub>nom<\/sub>/);
assert.match(monopoleApp, /Inside bend-radius ratio, r_i\/t_nom, must be greater than zero\./);
assert.match(panel, />Manual yield stress</);
assert.match(panel, /id="monopolePlateGrade"/);
assert.match(panel, /id="monopoleSectionForm"/);
assert.match(panel, /id="monopoleBendRadiusRatio"[^>]*value="3\.0"/);
assert.match(panel, /Default 3\.0; use project or product data\./);
assert.match(panel, /BR = min\(r<sub>i<\/sub>, 4t<sub>d<\/sub>\)/);
assert.match(panel, /id="monopoleResistanceBasis"/);
assert.match(panel, /4-sided regular polygon/);
assert.match(panel, /6-sided regular polygon/);
assert.match(panel, /8-sided regular polygon/);
assert.match(panel, /12-sided regular polygon/);
assert.match(panel, /16-sided regular polygon/);
assert.match(panel, /AS\/NZS 3678:2016 Table 8/);
assert.match(panel, /ASCE\/SEI 48-19 Cls 5\.2\.3\.2\.1 and 5\.2\.5/);
assert.match(monopoleApp, /buildStations\(assembly, 0\.5\)/);
assert.doesNotMatch(monopoleApp, /Source_Not_Verified/);
assert.match(monopoleCapacity, /permittedMomentCapacity/);
assert.match(monopoleApp, /M = F<sub>a<\/sub>I\/c/);
assert.match(monopoleApp, /P = 0/);
assert.match(monopoleApp, /AS 4100 &phi; is not applied/);
assert.match(monopoleApp, /&phi; = 0\.90/);
assert.match(monopoleApp, /function syncMethodPresentation\(\)/);
assert.match(monopoleApp, /function polygonRangeFailure\(stations\)/);
assert.match(monopoleApp, /function polygonRangeMessage\(failure\)/);
assert.match(monopoleApp, /classList\.add\("is-unavailable"\)/);
assert.match(monopoleApp, /\\u03bb =/);
assert.match(monopoleApp, /Minimum evaluated station capacity/);
assert.match(monopoleApp, /Minimum evaluated station resistance/);
assert.match(monopoleApp, /User override &middot; Resistance uses t<sub>d<\/sub>; material and mass use t<sub>nom<\/sub>\./);
assert.match(monopoleApp, /User override: t<sub>d<\/sub>/);
assert.match(panel, /not a continuous numerical optimisation/i);
assert.match(monopoleApp, /function calculate\(\) \{\s*syncMethodPresentation\(\);/);
assert.match(monopoleApp, /\$\("monopoleFormulaSteps"\)\.innerHTML = "";/);
assert.match(monopoleApp, /outside ASCE\/SEI 48-19 Eqs\./i);
assert.doesNotMatch(monopoleCapacity, /Derived conservatively from the full nominal side/);
assert.match(panel, /top to base/i);
assert.match(monopoleCapacity, /\.sort\(\(a, b\) => b - a\)/);
assert.doesNotMatch(panel, /geometry sketch/i);
assert.doesNotMatch(panel, />\s*(PASS|FAIL)\s*</);
assert.doesNotMatch(panel, /<input[^>]+id="[^"]*(Demand|Action|Utilisation)/i);
assert.match(panel, /Lightly welded longitudinally \(LW\)/);
assert.match(panel, /Heavily welded longitudinally \(HW\)/);
assert.doesNotMatch(panel, /Helically welded \(HW\)/);
assert.match(panel, /1\.5D<sub>ins,max<\/sub>/);
assert.match(panel, /largest circle inscribed within the outside profiles/i);
assert.doesNotMatch(panel, /D<sub>i,max<\/sub>/);

const sectionFormPosition = panel.indexOf("<b>Section form</b>");
const overallPosition = panel.indexOf('id="monopoleOverallInputs"');
const schedulePosition = panel.indexOf('id="monopoleScheduleInputs"');
const materialPosition = panel.indexOf("<b>Material</b>");
const resultsPosition = panel.indexOf("monopole-results");
assert.ok(
  sectionFormPosition >= 0
    && sectionFormPosition < overallPosition
    && overallPosition < schedulePosition
    && schedulePosition < materialPosition
    && materialPosition < resultsPosition,
  "Visible monopole order must be section form, geometry, material, then results."
);

const capacityScript = html.indexOf('src="monopole-capacity.js');
const sharedAppScript = html.indexOf('src="app.js');
const monopoleAppScript = html.indexOf('src="monopole-app.js');
assert.ok(capacityScript >= 0 && capacityScript < sharedAppScript && sharedAppScript < monopoleAppScript);

console.log("monopole DOM contract tests passed");
