# Ground Parameters - Geo48b evidence follow-up

## 1. Audit scope and version

6 September 2026; Codex author review. Branch codex/geo-parameters, baseline 853e863 with existing uncommitted changes. This is an evidence-only follow-up to GEO48A_CORRECTIONS.md. Production remains cache 20260906geo48a. Scope: real native Chrome 200% execution checks, then missing 390 px main-page visual states at 100%. No source/PDF recalculation or release audit.

## 2. Executive verdict

Native 200% activation is now established, replacing the earlier "did not activate" result for this recorded environment only. Complete native-zoom visual acceptance remains open because zoomed automated crops are unreliable. Normal-zoom mobile evidence is extended by 11 individually inspected screenshots and the item register below. Local / Unreleased; no independent approval.

## 3. Must modify

No new production P0/P1 defect established. Do not mark the entire native-zoom gate passed from the 13 runtime checks. Screen-reader speech, complete focus visibility and independent engineering/publication acceptance remain open.

## 4. Should modify / evidence limitation

GEO48B-E01 (stage F; evidence gap): under native 200%, locator screenshots captured mismatched page regions and blank backgrounds. Specifically inspected zoom-geo-clay, zoom-soft and zoom-bearingReference crops do not frame their requested targets; zoom-refinement and zoom-focus-viewport are blank. The zoom-setting image does not frame the dropdown. These captures cannot establish clipping or visual readability of their intended targets. No production defect is inferred from this tool capture behaviour.

All targeted zoom-panel PNGs are diagnostic only and excluded from the accepted card register. A trustworthy viewport capture/manual observation must still confirm normal-height scrolling, focused-heading visibility, all expanded sections and navigation reachability. The initial zoom-entry screenshot is a limited entry view, not full-page acceptance.

## 5. Add

Added replayable scripts audit/geo48b-zoom-start.js, audit/geo48b-zoom-review.js and audit/geo48b-mobile-review.js. A separate temporary Chrome profile under tmp/geo48-zoom-profile was used, not the personal browsing profile. Native setting was restored in finally; runtime evidence confirms DPR and viewport restoration. Temporary sessions may close between tool calls; setup and review were successfully run consecutively.

## 6. Delete or simplify

No production code, parameter, input, source table or layout was changed. No extra UI warning added for a capture-tool limitation. Invalid zoom captures are retained as diagnostics, not silently replaced by normal-zoom mobile screenshots.

## 7. Unclear / source gap

Screen-reader speech and all-state native-zoom visual/focus acceptance remain open. No NSW/WA original-page or AS publisher/currency refresh in this pass. Independent engineering review and source-specific publication decision are unchanged. Full expanded soft-clay inventory is not claimed: its two previously missing source-condition rows were inspected, alongside the full selected guide.

## 8. Verified - no change

Native settings path chrome://settings/appearance, Page zoom 100% to 200%, in a dedicated persistent review profile. Before: innerWidth 1440, innerHeight 1000, DPR approximately 1. After: 720, 500, DPR approximately 2. No CSS zoom, pinch-scale or device-scale emulation was substituted. After restoration: 1440 x 1000, DPR approximately 1.

Thirteen native runtime assertions passed: actual zoom, 17 states, soft-row Enter open/close, expanded-section/document overflow, heading activeElement and restoration, with no page errors. Heading receives DOM focus; visible focus is not certified by the blank capture.

Nine mobile assertions passed at 390 CSS px / 100%: asset identity, two non-organic source rows, expanded question overflow and seven source cards. Eleven mobile PNGs were inspected at original resolution; no clipping, value/label collision or new misleading status was found in those pictured states.

## 9. Test matrix and evidence

- output/playwright/geo48b-zoom-start.txt: before/after native metrics.
- output/playwright/geo48b-zoom-result.txt: 13 passing runtime checks, restoration and capture inventory. Panel screenshots are diagnostic only.
- output/playwright/geo48b-mobile-result.txt: nine passing checks and 11 screenshot dimensions.
- Three new audit callbacks passed node --check. No production edit; the earlier 50-file Geo48a regression and public-build evidence was not unnecessarily rerun.
- Tall mobile panel captures increase viewport height at the same 390 px width. They verify content layout, not ordinary-height sticky-header behaviour.
- All card rows below: main Ground Parameters, Codex, 6 September 2026, 100% normal zoom. FIG: N/A.

### Accepted mobile card register

| Audit ID | Selector / heading | State | Screenshot | Specific visual result |
| --- | --- | --- | --- | --- |
| CARD-GEO48B-01 | #geo-clay comparison | default; six states | [geo-clay](../output/playwright/geo48b-mobile-geo-clay.png) | Two-column mobile rows preserve weight, strength and modulus labels; soft condition visible. Verified - no change within pictured scope. |
| CARD-GEO48B-02 | #geo-sand comparison | default; five states | [geo-sand](../output/playwright/geo48b-mobile-geo-sand.png) | Grain-size scope and groundwater caveat readable. Verified - no change within pictured scope. |
| CARD-GEO48B-03 | #geo-rock comparison | default; six states | [geo-rock](../output/playwright/geo48b-mobile-geo-rock.png) | Intact strength and bearing distinguished; RQD navigation visible. Verified - no change within pictured scope. |
| CARD-GEO48B-04 | #selectedGround > table | soft clay selected | [soft-guide](../output/playwright/geo48b-mobile-soft-guide.png) | Seven parameter rows retain Reference range / Used for / Key condition. Verified - no change within pictured scope. |
| CARD-GEO48B-05 | #parameterRows / weight | inventory expanded; weight row | [soft-inventory-0](../output/playwright/geo48b-mobile-soft-inventory-0.png) | Dry/saturated values and non-organic source condition legible. Verified - no change within pictured scope. |
| CARD-GEO48B-06 | #parameterRows / effective strength | inventory expanded; strength row | [soft-inventory-1](../output/playwright/geo48b-mobile-soft-inventory-1.png) | Peak strength and non-organic source condition legible. Verified - no change within pictured scope. |
| CARD-GEO48B-07 | #bearingReference | question expanded | [bearingReference](../output/playwright/geo48b-mobile-bearingReference.png) | Allowable/ultimate definitions readable; no universal conversion claimed. Verified - no change within pictured scope. |
| CARD-GEO48B-08 | .geo-bearing-basis | disclosure collapsed | [bearingReference](../output/playwright/geo48b-mobile-bearingReference.png) | Source-modifier control readable; expanded mobile body not checked here. Verified - no change within pictured scope. |
| CARD-GEO48B-09 | #ultimateBearingTable | six rows visible | [bearingReference](../output/playwright/geo48b-mobile-bearingReference.png) | Approximate kPa limits and undrained assumptions readable. Verified - no change within pictured scope. |
| CARD-GEO48B-10 | #rockBearingTable | five rows visible | [bearingReference](../output/playwright/geo48b-mobile-bearingReference.png) | RQD units and lesser-applicable-limit condition readable. Verified - no change within pictured scope. |
| CARD-GEO48B-11 | #settlementReference | question expanded | [settlementReference](../output/playwright/geo48b-mobile-settlementReference.png) | Inputs distinguished from settlement limits. Verified - no change within pictured scope. |
| CARD-GEO48B-12 | Additional settlement inputs | three rows visible | [settlementReference](../output/playwright/geo48b-mobile-settlementReference.png) | Compressibility/time/subgrade reaction project basis preserved. Verified - no change within pictured scope. |
| CARD-GEO48B-13 | .geo-movement | disclosure collapsed | [settlementReference](../output/playwright/geo48b-mobile-settlementReference.png) | Heading readable; earlier expanded capture remains separate evidence. Verified - no change within pictured scope. |
| CARD-GEO48B-14 | #baseInterfaceReference | question expanded | [baseInterfaceReference](../output/playwright/geo48b-mobile-baseInterfaceReference.png) | Internal soil friction distinguished from base interface. Verified - no change within pictured scope. |
| CARD-GEO48B-15 | #baseInterfaceTable | seven rows visible | [baseInterfaceReference](../output/playwright/geo48b-mobile-baseInterfaceReference.png) | Contact terms, coefficients, angles and ultimate basis retained. Verified - no change within pictured scope. |
| CARD-GEO48B-16 | #interfaceReferences | question expanded | [interfaceReferences](../output/playwright/geo48b-mobile-interfaceReferences.png) | Shaft/base/bond transfer roles and stress-versus-factor distinction readable. Verified - no change within pictured scope. |
| CARD-GEO48B-17 | Clay piles adhesion factor | five rows visible | [interfaceReferences](../output/playwright/geo48b-mobile-interfaceReferences.png) | Installation type, cap and overlapping-state limitation preserved. Verified - no change within pictured scope. |
| CARD-GEO48B-18 | Sand piles interface factor | four rows visible | [interfaceReferences](../output/playwright/geo48b-mobile-interfaceReferences.png) | K_s/delta explanation and installation qualifiers readable. Verified - no change within pictured scope. |
| CARD-GEO48B-19 | Rock anchor bond table | six rows visible | [interfaceReferences](../output/playwright/geo48b-mobile-interfaceReferences.png) | Ultimate stress, units and project reduction/testing boundary readable. Verified - no change within pictured scope. |
| CARD-GEO48B-20 | .geo-sources | expanded; seven cards | [sources](../output/playwright/geo48b-mobile-sources.png) | Stacked source cards and before-use note fit mobile width. Verified - no change within pictured scope. |
| CARD-GEO48B-21 | FHWA source card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | Historical-US scope visible. Verified - no change within pictured scope. |
| CARD-GEO48B-22 | AS 1726 source card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | Classification scope visible; no fresh currency acceptance. Verified - no change within pictured scope. |
| CARD-GEO48B-23 | Look source card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | For Review retained. Verified - no change within pictured scope. |
| CARD-GEO48B-24 | Application standards card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | Route only retained. Verified - no change within pictured scope. |
| CARD-GEO48B-25 | Internal borehole-log card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | Non-authority for numerical output stated. Verified - no change within pictured scope. |
| CARD-GEO48B-26 | Government portal card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | Context scope readable; destinations not re-fetched. Verified - no change within pictured scope. |
| CARD-GEO48B-27 | Public-report spot-check card | source card | [sources](../output/playwright/geo48b-mobile-sources.png) | Site-specific and NSW/WA pending status readable. Verified - no change within pictured scope. |
| CARD-GEO48B-28 | Before-use note | warning | [sources](../output/playwright/geo48b-mobile-sources.png) | Project verification requirements readable. Verified - no change within pictured scope. |

### Mobile capture dimensions

| Screenshot ID | Filename suffix | Viewport |
| --- | --- | --- |
| SHOT-GEO48B-390-01 | geo48b-mobile-geo-clay.png | 390 x 1983 |
| SHOT-GEO48B-390-02 | geo48b-mobile-geo-sand.png | 390 x 1520 |
| SHOT-GEO48B-390-03 | geo48b-mobile-geo-rock.png | 390 x 1768 |
| SHOT-GEO48B-390-04 | geo48b-mobile-soft-guide.png | 390 x 2043 |
| SHOT-GEO48B-390-05 | geo48b-mobile-soft-inventory-0.png | 390 x 1000 |
| SHOT-GEO48B-390-06 | geo48b-mobile-soft-inventory-1.png | 390 x 1000 |
| SHOT-GEO48B-390-07 | geo48b-mobile-bearingReference.png | 390 x 2918 |
| SHOT-GEO48B-390-08 | geo48b-mobile-settlementReference.png | 390 x 1341 |
| SHOT-GEO48B-390-09 | geo48b-mobile-baseInterfaceReference.png | 390 x 2034 |
| SHOT-GEO48B-390-10 | geo48b-mobile-interfaceReferences.png | 390 x 3411 |
| SHOT-GEO48B-390-11 | geo48b-mobile-sources.png | 390 x 1439 |

## 10. Residual limitations

Keep local / Unreleased. Next acceptance work: trustworthy native-zoom visual/focus capture or manual review, screen-reader speech, original-source/currency follow-up, and independent engineering acceptance. This evidence update does not imply full accessibility compliance or publication approval. Existing uncommitted production work preserved; no commit, merge, push or deployment.
