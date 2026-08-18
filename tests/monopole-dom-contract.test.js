"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
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
assert.match(html, /data-tool="monopole"[^>]*>Steel Monopole Section Capacity</);
assert.match(panel, /data-monopole-mode="overall"[^>]*>Continuous taper<\/button>/);
assert.match(panel, /data-monopole-mode="schedule"[^>]*>Fabricated sections<\/button>/);
assert.match(panel, /<b>Continuous taper geometry<\/b>/);
assert.match(panel, /<b>Fabricated section schedule<\/b>/);
assert.doesNotMatch(panel, />Overall profile<\/button>/i);
assert.doesNotMatch(panel, />Section schedule<\/button>/i);
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
assert.match(panel, /class="monopole-design-thickness-field"/);
assert.match(panel, /aria-label="Use a separate design thickness"/);
assert.match(panel, /id="monopoleDesignThicknessState"/);
assert.match(panel, /Default t<sub>d<\/sub> = t<sub>nom<\/sub>\./);
assert.match(panel, /Yield-strength basis/);
assert.match(panel, /AS 4100 fabrication category/);
assert.match(panel, /Circular only; selects AS 4100 Table 5\.2 limits\./);
assert.match(panel, /Fabrication estimate r<sub>i<\/sub>\/t<sub>nom<\/sub> = 1\.5/);
assert.doesNotMatch(panel, /<span>Fabrication category<\/span>/);
assert.doesNotMatch(panel, /<span>Material basis<\/span>/);
assert.match(styles, /\.monopole-material-fields\s*\{[^}]*align-items:\s*start;/);
assert.match(styles, /\.monopole-design-thickness-toggle\s*\{[^}]*width:\s*100%;/);
assert.match(styles, /#monopolePanel \.input-group\s*\{\s*display:\s*block;/);
assert.match(styles, /\.monopole-field-label\s*\{[^}]*margin-bottom:\s*6px;/);
assert.match(styles, /\.monopole-card > \.input-cluster\s*\{[^}]*margin:\s*0;/);
assert.match(styles, /\.monopole-moment-section, \.monopole-moment-body, \.monopole-chart-section\s*\{[^}]*min-width:\s*0;[^}]*max-width:\s*100%;/);
assert.match(styles, /\.monopole-schedule-panel\s*\{[^}]*padding:\s*12px;[^}]*border:/);
assert.match(styles, /#monopoleOverallInputs:not\(\[hidden\]\)\s*\{[^}]*display:\s*grid;[^}]*gap:\s*14px;/);
assert.match(styles, /\.monopole-thickness-table\s*\{[^}]*min-width:\s*590px;/);
assert.match(styles, /\.monopole-card \.table-scroll\s*\{[^}]*max-width:\s*100%;[^}]*overflow-x:\s*auto;[^}]*contain:\s*inline-size paint;/);
assert.match(panel, /Shaft properties/);
assert.match(panel, /physical shell geometry/);
assert.match(panel, /section only/);
assert.match(panel, /id="monopoleSectionDefinitionHeading" class="monopole-stage-heading">[\s\S]*?<b>Section definition<\/b>/);
assert.match(panel, /id="monopoleMaterialHeading" class="monopole-stage-heading">[\s\S]*?<b>Material and fabrication<\/b>/);
assert.match(panel, /id="monopoleCapacityHeading" class="monopole-stage-heading">[\s\S]*?<b>Section capacity<\/b>/);
assert.doesNotMatch(panel, /<b>Input data<\/b>/);
assert.match(panel, /id="monopoleMomentSection"[\s\S]*?<b>Moment capacity<\/b>/);
assert.match(panel, /id="monopoleCombinedSection"[\s\S]*?<b id="monopoleCombinedCapacityTitle">Section capacity intercepts<\/b>/);
assert.doesNotMatch(panel, /monopole-stage-index|>01<|>02<|>03</);
assert.match(panel, /0\.5 m stations/);
assert.match(panel, /id="monopoleCombinedSection"/);
assert.match(panel, /Compression and bending/);
assert.match(panel, /AS 4100 Cl\. 5\.2; AS 4100 Cl\. 6\.2; AS 4100 Cl\. 8\.3\.2/);
assert.match(panel, /id="monopoleCombinedCapacitySummary"/);
assert.match(panel, /id="monopoleCombinedCapacityTitle"/);
assert.match(panel, /id="monopoleCombinedCapacityBasis"/);
assert.match(panel, /id="monopoleCombinedCapacityBody"/);
assert.match(panel, /id="monopoleCombinedCapacityCount"/);
assert.match(panel, /Section capacity intercepts/);
assert.match(panel, /design section capacity intercepts used in the AS 4100 Cl\. 8\.3\.2 interaction expression/);
assert.match(panel, /id="monopoleCombinedCapacityCount">0 rows &middot; top to base/);
assert.match(panel, /Combined polygon stress is not evaluated/);
assert.doesNotMatch(panel, /Action check at elevation/);
assert.doesNotMatch(panel, /id="monopoleCombinedActionCheck"/);
assert.doesNotMatch(panel, /id="monopoleCombinedAxial"/);
assert.doesNotMatch(panel, /id="monopoleCombinedMoment"/);
assert.doesNotMatch(panel, /interaction ratio|utilisation|N\*|M\*/i);
assert.match(panel, /Design actions and member capacity are not evaluated/);
assert.match(monopoleCapacity, /function circularCompressionSectionCapacity\(diameter, thickness, yieldStress\)/);
assert.doesNotMatch(monopoleCapacity, /function circularCombinedSectionCheck\(options\)/);
assert.match(monopoleCapacity, /function sectionStatesAtElevation\(assembly, elevation\)/);
assert.match(monopoleApp, /function renderCombinedCapacityStations\(stations\)/);
assert.match(monopoleApp, /renderCombinedCapacityStations\(stations\)/);
assert.doesNotMatch(monopoleApp, /renderCombinedSectionCheck\(assembly\)/);
assert.match(panel, /id="monopoleOverallThicknessBody"/);
assert.match(panel, /id="monopoleAddThicknessBand"/);
assert.match(panel, /Wall thickness schedule/);
assert.match(panel, /Top elevation, z<sub>top<\/sub>/);
assert.doesNotMatch(panel, /id="monopoleThickness"/);
assert.doesNotMatch(panel, /id="monopoleDesignThickness"/);
assert.doesNotMatch(panel, /id="monopoleYieldStress"/);
assert.match(panel, /t<sub>nom<\/sub>/);
assert.match(panel, /t<sub>d<\/sub>/);
assert.match(monopoleApp, /D<sub>i<\/sub> = D - 2t<sub>d<\/sub>/);
assert.match(monopoleApp, /r<sub>i<\/sub>\/t<sub>nom<\/sub>/);
assert.match(monopoleApp, /Inside bend-radius ratio, r_i\/t_nom, must be greater than zero\./);
assert.match(monopoleApp, /function polygonBendRadiusRows\(sections\)/);
assert.match(monopoleApp, /insideBendRadius: section\.insideBendRadius/);
assert.match(monopoleApp, /effectiveBendRadius: Math\.min\(section\.insideBendRadius, 4 \* section\.thickness\)/);
assert.match(monopoleApp, /r<sub>i<\/sub> = .* &times; .* = .* mm; BR = min/);
assert.match(panel, /Actual r<sub>i<\/sub> is derived by section/);
assert.match(panel, /Combined polygon stress is not evaluated/);
assert.match(monopoleApp, /monopoleCombinedCapacityTitle"\)\.textContent = polygon \? "Combined polygon stress" : "Section capacity intercepts"/);
assert.match(monopoleApp, /monopoleCombinedCapacitySummary"\)\.textContent = "Not evaluated"/);
assert.doesNotMatch(monopoleApp, /Not checked/);
assert.match(monopoleApp, /ASCE\/SEI 48-19 &middot; combined polygon stress not evaluated/);
assert.match(panel, />Manual yield stress</);
assert.match(panel, /id="monopolePlateGrade"/);
assert.match(panel, /id="monopoleSectionForm"/);
assert.match(panel, /option value="circular" selected>Circular tubular/);
assert.match(panel, /option value="manual" selected>Manual yield stress/);
assert.match(panel, /Default: Austube 508\.0 &times; 6\.4 CHS C350L0/);
assert.match(panel, /id="monopoleScheduleBasis"/);
assert.match(monopoleApp, /Physical sections, base to top\. Enter project or manufacturer geometry\./);
assert.match(panel, /Initial capacity example/);
assert.match(panel, /The 12 m profile length is an editable calculation input, not a published product length/);
assert.match(panel, /Product geometry reference/);
assert.match(panel, /fabrication estimate r<sub>i<\/sub>\/t<sub>nom<\/sub> = 1\.5 are not published product values/);
assert.match(monopoleApp, /\{ id: "508 CHS", length: 12, bottomDimension: 508, topDimension: 508, nominalThickness: 6\.4, designThickness: 6\.4, yieldStress: 350, overlap: 0 \}/);
assert.match(monopoleApp, /id: section\.id === "508 CHS" \? `S\$\{index \+ 1\}` : section\.id/);
assert.match(monopoleApp, /function isInitialCircularExample\(section\)/);
assert.match(monopoleApp, /id: isInitialCircularExample\(section\) \? "508 CHS" : section\.id/);
assert.match(monopoleApp, /\{ id: "T1", topElevation: 12, nominalThickness: 6\.4, designThickness: 6\.4, yieldStress: 350 \}/);
assert.match(monopoleApp, /capacity\.overallProfileSections/);
assert.match(monopoleCapacity, /function overallProfileSections\(profile, thicknessBands\)/);
assert.match(monopoleApp, /class="monopole-chart-boundary"/);
assert.match(monopoleApp, />Band boundary<\/span>/);
assert.match(styles, /\.monopole-chart-boundary\s*\{[^}]*stroke-dasharray:/);
assert.doesNotMatch(monopoleApp, /\{ id: "S2", length: 10\.5/);
assert.match(panel, /id="monopoleBendRadiusRatio"[^>]*value="1\.5"/);
assert.match(panel, /replace with verified project or manufacturer data/);
assert.match(panel, /BR = min\(r<sub>i<\/sub>, 4t<sub>d<\/sub>\)/);
assert.match(panel, /id="monopoleSectionNote"/);
assert.match(panel, /id="monopoleMomentBasis"/);
assert.match(panel, /4-sided regular polygon/);
assert.match(panel, /6-sided regular polygon/);
assert.match(panel, /8-sided regular polygon/);
assert.match(panel, /12-sided regular polygon/);
assert.match(panel, /16-sided regular polygon/);
assert.match(panel, /AS\/NZS 3678:2016 Table 8/);
assert.match(panel, /ASCE\/SEI 48-19 Cl\. 5\.2\.3\.2\.1; ASCE\/SEI 48-19 Cl\. 5\.2\.5/);
assert.match(monopoleApp, /buildStations\(assembly, 0\.5\)/);
assert.doesNotMatch(monopoleApp, /Source_Not_Verified/);
assert.match(monopoleCapacity, /permittedMomentCapacity/);
assert.match(monopoleApp, /M = F<sub>a<\/sub>I\/c/);
assert.match(monopoleApp, /P = 0/);
assert.match(monopoleApp, /D<sub>o<\/sub> - 2t<sub>d<\/sub> - 2BR/);
assert.doesNotMatch(monopoleApp, /D<sub>o<\/sub> - t<sub>d<\/sub> - 2BR/);
assert.match(monopoleApp, /AS 4100 &phi; is not applied/);
assert.match(monopoleApp, /&phi; = 0\.90/);
assert.match(monopoleApp, /function syncMethodPresentation\(\)/);
assert.match(monopoleApp, /function polygonRangeFailure\(stations\)/);
assert.match(monopoleApp, /function polygonRangeMessage\(failure\)/);
assert.match(monopoleApp, /classList\.add\("is-unavailable"\)/);
assert.match(monopoleApp, /\\u03bb =/);
assert.match(monopoleApp, /Base &phi;M<sub>s<\/sub> =/);
assert.match(monopoleApp, /Base M =/);
assert.match(monopoleApp, /Base &phi;N<sub>s<\/sub> =/);
assert.match(monopoleApp, /Moment profile not evaluated/);
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

const sectionDefinitionPosition = panel.indexOf('id="monopoleSectionDefinitionHeading"');
const sectionFormPosition = panel.indexOf("<b>Section form</b>");
const overallPosition = panel.indexOf('id="monopoleOverallInputs"');
const schedulePosition = panel.indexOf('id="monopoleScheduleInputs"');
const materialHeadingPosition = panel.indexOf('id="monopoleMaterialHeading"');
const materialPosition = panel.indexOf("<b>Material properties</b>");
const shaftPosition = panel.indexOf("monopole-shaft-summary");
const capacityHeadingPosition = panel.indexOf('id="monopoleCapacityHeading"');
const momentPosition = panel.indexOf('id="monopoleMomentSection"');
const combinedPosition = panel.indexOf('id="monopoleCombinedSection"');
assert.ok(
  sectionDefinitionPosition >= 0
    && sectionDefinitionPosition < sectionFormPosition
    && sectionFormPosition < overallPosition
    && overallPosition < schedulePosition
    && schedulePosition < materialHeadingPosition
    && materialHeadingPosition < materialPosition
    && materialPosition < shaftPosition
    && shaftPosition < capacityHeadingPosition
    && capacityHeadingPosition < momentPosition
    && momentPosition < combinedPosition,
  "Visible monopole order must be section definition, material and fabrication, shaft properties, then section capacity."
);

const capacityScript = html.indexOf('src="monopole-capacity.js');
const sharedAppScript = html.indexOf('src="app.js');
const monopoleAppScript = html.indexOf('src="monopole-app.js');
assert.ok(capacityScript >= 0 && capacityScript < sharedAppScript && sharedAppScript < monopoleAppScript);
assert.match(html, /src="monopole-capacity\.js\?v=20260814polygonflat1"/);
assert.match(html, /src="monopole-app\.js\?v=20260814polygonflat1"/);
assert.match(html, /href="styles\.css\?v=20260818sectiondirectory1"/);
assert.match(html, /SC Handbook &middot; Public beta &middot; Build 0\.7\.51/);
assert.doesNotMatch(panel, /id="monopoleMomentSection"[^>]*open/);
assert.doesNotMatch(panel, /id="monopoleCombinedSection"[^>]*open/);
assert.match(panel, /id="monopoleOverlapSection" class="monopole-overlap-section" hidden/);
assert.match(monopoleApp, /monopoleOverlapSection"\)\.hidden = mode !== "schedule" \|\| rows\.length === 0/);
assert.ok(
  panel.indexOf("monopole-capacity-boundary-note") < panel.indexOf("monopole-combined-capacity-scroll"),
  "The combined-capacity scope note must precede the technical table."
);
assert.match(monopoleApp, /window\.matchMedia\("\(max-width: 760px\)"\)\.matches/);
assert.match(monopoleApp, /const width = compact \? 360 : 840/);
assert.doesNotMatch(styles, /\.monopole-chart svg\s*\{[^}]*width:\s*640px/);
assert.doesNotMatch(panel, /class="monopole-check-metrics"/);
assert.match(styles, /\.monopole-stage-heading\s*\{/);
assert.match(styles, /\.monopole-stage-heading b\s*\{[^}]*font-size:\s*18px;/);
assert.match(styles, /#monopolePanel \.monopole-moment-section > summary b, #monopolePanel \.monopole-combined-section > summary b\s*\{[^}]*font-size:\s*18px;/);
assert.match(styles, /#monopolePanel \.monopole-moment-section > summary > strong, #monopolePanel \.monopole-combined-section > summary > strong\s*\{[^}]*font-size:\s*15px;/);
assert.match(styles, /#monopolePanel \.input-group-heading b,[^}]*font-size:\s*14px;/);
assert.match(styles, /\.monopole-combined-capacity-table\s*\{[^}]*min-width:\s*780px;/);
assert.match(styles, /\.monopole-moment-section > summary, \.monopole-combined-section > summary\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*minmax\(0, 1fr\) 24px;/);
assert.match(monopoleApp, /Design section moment capacity, &phi;M&#x209B; \(kN&middot;m\)/);
assert.match(monopoleApp, /Permitted bending moment, M \(kN&middot;m\)/);
assert.match(monopoleApp, /compact \? "&phi;M&#x209B; \(kN&middot;m\)"/);
assert.match(monopoleApp, /assembly\.sections\.length === 1 \? "section" : "sections"/);
assert.doesNotMatch(monopoleApp, />Bending resistance \(kN&middot;m\)<\/text>/);
assert.match(monopoleApp, /const hasOverlap = mode === "schedule"/);
assert.match(monopoleApp, /\+ \(hasOverlap\s*\? '<span><i class="overlap"><\/i>Overlap zone<\/span>'/);
assert.match(monopoleApp, /\? "includes overlap shells"\s*:\s*"physical shell geometry"/);
assert.doesNotMatch(panel, /class="capacity-card/);
assert.doesNotMatch(panel, /Section resistance and shaft mass/);

console.log("monopole DOM contract tests passed");
