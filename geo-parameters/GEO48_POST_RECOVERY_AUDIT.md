# Ground Parameters - Geo48 post-recovery audit

## 1. Audit scope and version

6 September 2026. Author reviewer: Codex; no independent reviewer. Workspace: C:/Users/silin/.codex/worktrees/5bee/SC Handbook; branch codex/geo-parameters; baseline 853e863; uncommitted recovered Geo48, cache 20260905geo48. Authority: SC_HANDBOOK.md sections 15.16A and 15.19; RECOVERY_HANDOFF.md; CONTENT_PLAN.md; PREPUBLICATION_REVIEW.md.

Scoped continuation: inspect the 24 existing recovery PNGs individually, reconcile their actual content with current HTML/query code, rerun regression and check recovery integrity. This is a fresh inspection of recovery captures, not a fresh browser capture or original-PDF audit. Lookup/reference workflow only; project resistance, adoption and PASS/FAIL are out of scope.

Before this report was added, all 191 entries in the external recovery ZIP's SHA256 manifest matched current workspace files, including the captured evidence. This establishes consistency with that recovery archive, not byte-for-byte recovery of the lost historical workspace. No replay tool was executed.

## 2. Executive verdict

Suitable for continued local review with the recorded limitations. Two P2 presentation/traceability gaps remain; publication acceptance is incomplete. The 24 captured images have now been individually inspected. Their visible panels are itemised below; unshown states and full accessibility acceptance remain open.

## 3. Must modify

No new P0/P1 defect established in this scoped review. Existing release gates remain blocking: independent engineering acceptance, actual native 200% zoom, screen-reader speech/full manual accessibility, source currency and pending public-report original-page review, source-specific publication decision. Automated tests and image inspection do not close these gates.

## 4. Should modify

| ID / stage / severity | Location | Current behaviour and evidence | Impact | Recommended disposition |
| --- | --- | --- | --- | --- |
| GEO48-A01 / C,F / P2 | geo-parameters/app.js:134, clay overview Soft row | SHOT-GEO48-1440-02 shows dry 12 and saturated 16 kN/m3 without the non-organic limitation. Query selected guidance and full inventory already carry that condition, protected by geo-source-completeness.test.js. | A reader using the initial no-input comparison can miss the row's material scope. | Retain the values and add a brief non-organic soft-clay condition at the overview row; cover initial rendering as well as selected/inventory models. No new range or input. |
| GEO48-A02 / C,F / P2 | index.html .geo-source-grid; standalone geo-parameters/index.html:88 | SHOT-GEO48-1440-23 contains six cards and no FHWA summary. The standalone harness has the FHWA card. Historical CARD-GEO46-31 claimed that card was inspected. Current bearing/sliding/settlement sections still cite FHWA. | Main and standalone source summaries disagree; historical card acceptance cannot be applied to the recovered main page. | Add the concise existing historical-US FHWA summary to main Sources and check both entry points. Treat the old card row as historical evidence, not current acceptance. |

These are findings for the next accepted correction scope. No production HTML, CSS, JavaScript or numerical data was edited in this audit.

## 5. Add

Added this itemised evidence register and explicit residual checklist. Before any full-page visual-completion claim, capture and inspect the unshown expanded soft-clay inventory, phone comparison tables and phone Bearing/Sliding/Piles/Sources states, plus normal-height scrolling/focus with the sticky header. The recovery callback's no-overflow assertions are narrower than those visual checks.

## 6. Delete or simplify

No numerical range, selector or useful reference table should be removed on this evidence. Existing folded full inventory is intentionally secondary. Do not duplicate selected E or Poisson values in Settlement. No deletion performed.

## 7. Unclear / source gap

NSW and WA source rechecks and AS 1726 publisher/amendment status remain open under the prior records; this screenshot/regression pass did not re-fetch them. Source PDFs were not reopened. Fresh-rock point-load, weathering and bearing displays were inspected for expression, not independently retranscribed. The reason for the historical/main-source-card discrepancy is not established; recovery is not certified historical byte identity.

Native zoom remains unverified: the recovery result records unchanged DPR/width and nativeZoom200=false. No further ineffective shortcut attempt was made. No screen-reader speech or all-state focus/hover contrast certification.

## 8. Verified - no change

All 24 PNGs were opened and inspected, with the tall gravel/fresh-rock inventories additionally opened at original resolution. Readable source conditions, field hierarchy, units, responsive selected-rock labels, soil-like rock suppression and Geo48 pile-symbol definitions are recorded per panel below. No new numerical/source acceptance is inferred from a readable image.

All 50 current test files passed; production Geo app/query syntax checks and git diff --check passed. Existing public-artifact exclusion tests passed against the recovery build. No fresh build, commit, push, merge, allowlist change or deployment was performed.

## 9. Test matrix and evidence

- Fresh: 50 tests/*.test.js files, including source fixtures and 608 controlled combinations; zero failed files.
- Fresh: node --check geo-parameters/app.js and geo-parameters/geo-parameters.js; git diff --check.
- Fresh: compare 191 recovery-manifest entries to current files; zero mismatches before audit-document additions.
- Retained recovery-run evidence: output/playwright/geo48-recovery-browser-result.txt reports 127 browser assertions, no failures/page errors, and nativeZoom200=false. These browser assertions were not rerun in this pass.
- Screenshot viewport dimensions below come from the recovery result; panel PNGs are element crops. Tall capture heights were increased by that callback, so these are not ordinary-screen-height or native-zoom proof.
- FIG: N/A; no engineering drawing in this scoped Geo surface.

### Screenshot register

Every row below was visually inspected by Codex on 6 September 2026. PNGs remain local review evidence.

| Screenshot ID | Recovery PNG | Capture viewport |
| --- | --- | --- |
| SHOT-GEO48-1440-01 | [geo48-01-entry.png](../output/playwright/geo48-01-entry.png) | 1440 x 1000 |
| SHOT-GEO48-1440-02 | [geo48-overview-geo-clay.png](../output/playwright/geo48-overview-geo-clay.png) | 1440 x 1000 |
| SHOT-GEO48-1440-03 | [geo48-overview-geo-sand.png](../output/playwright/geo48-overview-geo-sand.png) | 1440 x 1000 |
| SHOT-GEO48-1440-04 | [geo48-overview-geo-rock.png](../output/playwright/geo48-overview-geo-rock.png) | 1440 x 1000 |
| SHOT-GEO48-1440-05 | [geo48-02-reading.png](../output/playwright/geo48-02-reading.png) | 1440 x 1000 |
| SHOT-GEO48-1440-06 | [geo48-03-clay.png](../output/playwright/geo48-03-clay.png) | 1440 x 1000 |
| SHOT-GEO48-1440-07 | [geo48-04-refinement.png](../output/playwright/geo48-04-refinement.png) | 1440 x 1000 |
| SHOT-GEO48-1440-08 | [geo48-05-sand.png](../output/playwright/geo48-05-sand.png) | 1440 x 1227 |
| SHOT-GEO48-1440-09 | [geo48-06-gravel.png](../output/playwright/geo48-06-gravel.png) | 1440 x 3679 |
| SHOT-GEO48-1440-10 | [geo48-07-extremely-weathered.png](../output/playwright/geo48-07-extremely-weathered.png) | 1440 x 2496 |
| SHOT-GEO48-1440-11 | [geo48-07-residual-soil.png](../output/playwright/geo48-07-residual-soil.png) | 1440 x 2514 |
| SHOT-GEO48-1440-12 | [geo48-08-rock.png](../output/playwright/geo48-08-rock.png) | 1440 x 3002 |
| SHOT-GEO48-1440-13 | [geo48-09-rock-1440.png](../output/playwright/geo48-09-rock-1440.png) | 1440 x 1000 |
| SHOT-GEO48-390-14 | [geo48-09-rock-390.png](../output/playwright/geo48-09-rock-390.png) | 390 x 2030 |
| SHOT-GEO48-320-15 | [geo48-09-rock-320.png](../output/playwright/geo48-09-rock-320.png) | 320 x 2159 |
| SHOT-GEO48-1440-16 | [geo48-10-bearingReference.png](../output/playwright/geo48-10-bearingReference.png) | 1440 x 1377 |
| SHOT-GEO48-1440-17 | [geo48-10-settlementReference.png](../output/playwright/geo48-10-settlementReference.png) | 1440 x 1000 |
| SHOT-GEO48-1440-18 | [geo48-10-baseInterfaceReference.png](../output/playwright/geo48-10-baseInterfaceReference.png) | 1440 x 1000 |
| SHOT-GEO48-1440-19 | [geo48-10-interfaceReferences.png](../output/playwright/geo48-10-interfaceReferences.png) | 1440 x 1587 |
| SHOT-GEO48-1440-20 | [geo48-10-projectRequirements.png](../output/playwright/geo48-10-projectRequirements.png) | 1440 x 1000 |
| SHOT-GEO48-1440-21 | [geo48-11-bearing-conditions.png](../output/playwright/geo48-11-bearing-conditions.png) | 1440 x 1000 |
| SHOT-GEO48-1440-22 | [geo48-12-differential.png](../output/playwright/geo48-12-differential.png) | 1440 x 1000 |
| SHOT-GEO48-1440-23 | [geo48-13-sources.png](../output/playwright/geo48-13-sources.png) | 1440 x 1000 |
| SHOT-GEO48-390-24 | [geo48-14-settlement-phone.png](../output/playwright/geo48-14-settlement-phone.png) | 390 x 1562 |

### Card and panel register

All rows: Ground Parameters main page; reviewer Codex, 6 September 2026. States and limits apply only to the named captures. "Verified - no change" means visual expression in the pictured state, not independent engineering or accessibility approval. Shared shells outside Geo and unshown expanded global Design scope are not fully audited here.

| Audit ID | Stable selector / heading | Type and state | Screenshot | Checks / result |
| --- | --- | --- | --- | --- |
| CARD-GEO48-01 | Entry title / Unreleased badge | entry, default | SHOT-GEO48-1440-01 | Visible local-review status; no adopted parameter set. Verified - no change within pictured scope. |
| CARD-GEO48-02 | Page reference warning | warning, default | SHOT-GEO48-1440-01 | Compact project-confirmation boundary. Verified - no change within pictured scope. |
| CARD-GEO48-03 | Compare ground ranges / section links | navigation, default | SHOT-GEO48-1440-01 | Ground-first workflow and reading order visible. Verified - no change within pictured scope. |
| CARD-GEO48-04 | How to read the values | disclosure, expanded | SHOT-GEO48-1440-05 | Bearing versus strength and weight versus density explained. Verified - no change within pictured scope. |
| CARD-GEO48-05 | Clay comparison / #geo-clay | table, six states | SHOT-GEO48-1440-02 | Five columns readable; soft-row source condition absent. GEO48-A01. Open finding. |
| CARD-GEO48-06 | Sand comparison / #geo-sand | table, five states | SHOT-GEO48-1440-03 | Medium/coarse modulus scope and groundwater basis visible. Verified - no change within pictured scope. |
| CARD-GEO48-07 | Rock comparison / #geo-rock | table, six states | SHOT-GEO48-1440-04 | Intact strength separated from bearing; RQD link visible. Verified - no change within pictured scope. |
| CARD-GEO48-08 | #selectedGround / CLAY stiff | selected table | SHOT-GEO48-1440-06 | Range, use and condition columns aligned; source time labels separated. Verified - no change within pictured scope. |
| CARD-GEO48-09 | #groundRefinement / clay | disclosure, expanded | SHOT-GEO48-1440-07 | Family, material and consistency controls readable. Verified - no change within pictured scope. |
| CARD-GEO48-10 | #optionalRefinement / PI and USCS | disclosure, expanded | SHOT-GEO48-1440-07 | Source PI band and classification use distinguished. Verified - no change within pictured scope. |
| CARD-GEO48-11 | #parameterDetails / clay | disclosure, collapsed | SHOT-GEO48-1440-06 | Full inventory remains secondary; expanded clay inventory not shown. Verified - no change within pictured scope. |
| CARD-GEO48-12 | #selectedGround / SAND dense | selected table | SHOT-GEO48-1440-08 | Medium/coarse condition and interface-angle distinction readable. Verified - no change within pictured scope. |
| CARD-GEO48-13 | #selectedGround / GRAVEL dense | selected table | SHOT-GEO48-1440-09 | No inherited sand bearing result; stiffness/reference values retained. Verified - no change within pictured scope. |
| CARD-GEO48-14 | #groundRefinement / gravel | disclosure, expanded | SHOT-GEO48-1440-09 | Gravel selection and dense state visible; optional classification collapsed. Verified - no change within pictured scope. |
| CARD-GEO48-15 | #parameterDetails / gravel | inventory, expanded | SHOT-GEO48-1440-09 | Full table read at original resolution; sand DCP/SPT transfer excluded. Verified - no change within pictured scope. |
| CARD-GEO48-16 | #selectedGround / sandstone XW | selected table | SHOT-GEO48-1440-10 | Soil-like heading; bearing inapplicable; no inherited UCS; dry weight qualified. Verified - no change within pictured scope. |
| CARD-GEO48-17 | #groundRefinement / XW | disclosure, expanded | SHOT-GEO48-1440-10 | Weathering shown; rock-strength control absent. Verified - no change within pictured scope. |
| CARD-GEO48-18 | #parameterDetails / XW | inventory, expanded | SHOT-GEO48-1440-10 | Soil-strength project requirements and rock-bearing suppression visible. Verified - no change within pictured scope. |
| CARD-GEO48-19 | #selectedGround / sandstone RS | selected table | SHOT-GEO48-1440-11 | No invented residual-soil strength or weight range. Verified - no change within pictured scope. |
| CARD-GEO48-20 | #groundRefinement / RS | disclosure, expanded | SHOT-GEO48-1440-11 | Residual-soil selection readable; rock-strength control absent. Verified - no change within pictured scope. |
| CARD-GEO48-21 | #parameterDetails / RS | inventory, expanded | SHOT-GEO48-1440-11 | Soil-like qualifications and project data requirements retained. Verified - no change within pictured scope. |
| CARD-GEO48-22 | #selectedGround / fresh sandstone | selected table | SHOT-GEO48-1440-12 | UCS, dry weight, bearing and rock-mass modulus remain distinct. Verified - no change within pictured scope. |
| CARD-GEO48-23 | #groundRefinement / fresh sandstone | disclosure, expanded | SHOT-GEO48-1440-13 | Four labelled selectors fit desktop track. Verified - no change within pictured scope. |
| CARD-GEO48-24 | #parameterDetails / fresh sandstone | inventory, expanded | SHOT-GEO48-1440-12 | Read at original resolution; point-load index and rock-mass limitations visible. Verified - no change within pictured scope. |
| CARD-GEO48-25 | #selectedGround / fresh sandstone, 390 px | selected table | SHOT-GEO48-390-14 | Repeated mobile field labels and conditions readable; no crop collision. Verified - no change within pictured scope. |
| CARD-GEO48-26 | #groundRefinement / fresh sandstone, 390 px | disclosure, expanded | SHOT-GEO48-390-14 | Controls stack in engineering order. Verified - no change within pictured scope. |
| CARD-GEO48-27 | #selectedGround / fresh sandstone, 320 px | selected table | SHOT-GEO48-320-15 | Long labels wrap without overlapping values. Verified - no change within pictured scope. |
| CARD-GEO48-28 | #groundRefinement / fresh sandstone, 320 px | disclosure, expanded | SHOT-GEO48-320-15 | Controls readable; long disclosure headings wrap. Verified - no change within pictured scope. |
| CARD-GEO48-29 | #bearingReference | question, expanded | SHOT-GEO48-1440-16 | Allowable versus ultimate distinction and method limits visible. Verified - no change within pictured scope. |
| CARD-GEO48-30 | #ultimateBearingTable | table, six rows | SHOT-GEO48-1440-16 | Approximate kPa bounds and surface-strip assumptions readable; no fresh source audit. Verified - no change within pictured scope. |
| CARD-GEO48-31 | #rockBearingTable | table, five rows | SHOT-GEO48-1440-16 | RQD pressure units, lesser-limit rule and detailed-design exclusion visible. Verified - no change within pictured scope. |
| CARD-GEO48-32 | .geo-bearing-basis | disclosure, expanded | SHOT-GEO48-1440-21 | Groundwater/width modifiers described without claiming calculated adoption. Verified - no change within pictured scope. |
| CARD-GEO48-33 | #settlementReference | question, expanded | SHOT-GEO48-1440-17 | Selected modulus/Poisson values not repeated. Verified - no change within pictured scope. |
| CARD-GEO48-34 | Additional settlement inputs | table, three rows | SHOT-GEO48-1440-17 | Project basis for compressibility, time and subgrade reaction readable. Verified - no change within pictured scope. |
| CARD-GEO48-35 | .geo-movement | disclosure, expanded | SHOT-GEO48-1440-22 | Relative movement and project criteria distinguished from 25 mm bearing basis. Verified - no change within pictured scope. |
| CARD-GEO48-36 | #baseInterfaceReference | question, expanded | SHOT-GEO48-1440-18 | Interface properties distinguished from internal soil friction. Verified - no change within pictured scope. |
| CARD-GEO48-37 | #baseInterfaceTable | table, seven rows | SHOT-GEO48-1440-18 | Ultimate factors and angles separately labelled; source terms qualified. Verified - no change within pictured scope. |
| CARD-GEO48-38 | #interfaceReferences | question, expanded | SHOT-GEO48-1440-19 | Shaft/toe/bond roles and dimensionless-factor scope visible. Verified - no change within pictured scope. |
| CARD-GEO48-39 | Clay piles / adhesion factor | table, five rows | SHOT-GEO48-1440-19 | Installation, cap and overlapping clay bands retained. Verified - no change within pictured scope. |
| CARD-GEO48-40 | Sand piles / interface factor | table, four rows | SHOT-GEO48-1440-19 | Geo48 K_s and delta definitions visible; coefficient is not subgrade modulus. Verified - no change within pictured scope. |
| CARD-GEO48-41 | Rock anchors / ultimate grout-rock bond | table, six rows | SHOT-GEO48-1440-19 | Ultimate kPa ranges and reduction/testing boundary readable. Verified - no change within pictured scope. |
| CARD-GEO48-42 | #projectRequirements | disclosure, expanded | SHOT-GEO48-1440-20 | Five project requirement groups readable. Verified - no change within pictured scope. |
| CARD-GEO48-43 | .geo-sources | disclosure, expanded | SHOT-GEO48-1440-23 | Six source cards visible; FHWA summary missing. GEO48-A02. Open finding. |
| CARD-GEO48-44 | AS 1726 source card | source card | SHOT-GEO48-1440-23 | Classification-only scope readable; current edition status not established. Verified - no change within pictured scope. |
| CARD-GEO48-45 | Look source card | source card | SHOT-GEO48-1440-23 | For Review status retained. Verified - no change within pictured scope. |
| CARD-GEO48-46 | Application standards source card | source card | SHOT-GEO48-1440-23 | Route-only scope retained. Verified - no change within pictured scope. |
| CARD-GEO48-47 | Internal borehole-log reference card | source card | SHOT-GEO48-1440-23 | Does not control numerical outputs. Verified - no change within pictured scope. |
| CARD-GEO48-48 | Government borehole portal card | source card | SHOT-GEO48-1440-23 | Context-only scope; linked destinations not revalidated in this pass. Verified - no change within pictured scope. |
| CARD-GEO48-49 | Public report spot checks card | source card | SHOT-GEO48-1440-23 | NSW/WA source recheck pending visible; original-source gates remain open. Verified - no change within pictured scope. |
| CARD-GEO48-50 | Before use source boundary | warning | SHOT-GEO48-1440-23 | Project verification boundary readable. Verified - no change within pictured scope. |
| CARD-GEO48-51 | #settlementReference / 390 px | question, expanded | SHOT-GEO48-390-24 | Three mobile rows preserve parameter/use/project-basis labels. Verified - no change within pictured scope. |
| CARD-GEO48-52 | .geo-movement / 390 px | disclosure, expanded | SHOT-GEO48-390-24 | Equation and project-criteria prose wrap without collision. Verified - no change within pictured scope. |

## 10. Residual limitations

Keep LOCAL / UNRELEASED. Next code correction should be limited to GEO48-A01/A02 after acceptance. Next evidence work: missing visual states listed in section 5, genuine 200% browser zoom and screen-reader/manual focus acceptance, source-page/currency follow-up and independent engineering review. Source-specific publication review and an explicit publication instruction remain separate; this report grants neither. Existing uncommitted work was preserved.
