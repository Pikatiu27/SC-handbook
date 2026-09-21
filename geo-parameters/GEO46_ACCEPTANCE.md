# Ground Parameters — Geo46 author acceptance record

## 1. Scope and version

5 September 2026. Local dirty worktree based on 853e863; cache `20260905geo46`. Reviewer: Codex author review. Independent engineering reviewer: not assigned. Governing gates: SC_HANDBOOK sections 2.3, 15.16A and 15.19. Scope: reference parameter applicability, existing interaction and archived browser evidence. No deployment, commit, push or public allowlist admission.

Current entry: `http://127.0.0.1:4174/?audit=geo46#geo`. This record supersedes earlier Geo evidence only for the checks explicitly rerun below.

## 2. Verdict

Local quick-reference review can continue. **Publication acceptance remains incomplete.** Source transcription and applicability have been checked at author level; this is not independent engineering approval. Numerical ranges remain interpretive references, not adopted design parameters or a normative soil-to-capacity mapping.

| Gate | Current evidence | Remaining |
| --- | --- | --- |
| Scope | Input-free comparison; optional details; no design resistance output | No new scope approval required for these fixes |
| Source | 22 original pages visually inspected; fixtures and applicability reviewed | Independent acceptance; edition/amendment currency; public-report spot-check refresh |
| Calculation | Existing conditional bearing evidence retained; 50 test files pass | Independent method acceptance, not replaced by tests |
| Interface | 127 local browser assertions; saved screenshots; six viewport widths | Native 200% zoom, screen-reader speech and complete focus-state review |
| Release | Geo remains Unreleased and excluded from public output | Source-specific expression/arrangement review and explicit release decision |

## 3. Must modify — resolved at author level

| ID | Severity | Finding | Correction |
| --- | --- | --- | --- |
| GEO46-01 | P1 | Sand DCP density bands were inherited by gravel | Gravel now requires project evidence; all five gravel states tested |
| GEO46-02 | P1 | Sand modulus lacked grain-size scope | Medium-to-coarse sand condition shown in overview and detail |
| GEO46-03 | P2 | Permeability could be read as an unrestricted in-situ range | Well-compacted source basis stated; structure and stratification excluded |
| GEO46-04 | P2 | Rock unit weight did not identify the dry condition | Dry gamma-d label and basis, including RS/XW material-weight handling |
| GEO46-05 | P2 | Soft-clay source conditions and PI classification could be overgeneralised | Non-organic source condition in selected guidance; PI labelled as Look source bands, not AS plasticity classes |
| GEO46-06 | P2 | Corrected SPT notation implied an unverified universal normalisation | Display says Corrected N (source); no unsupported N1 alias |

## 4. Should modify / further acceptance checks

Native zoom key presses did not change viewport width or device-pixel ratio. The attempted check is **not a pass**. Repeat manually at actual 200% browser zoom. Complete screen-reader speech and all keyboard/focus/hover checks separately; recorded 16-step ground-control traversal is narrower evidence.

## 5. Added evidence — original sources

PDF pages below are one-based. Source images are local review artifacts in `tmp/pdfs/geo46/`, not public assets. Each listed page was rendered and visually inspected. The supplied internal borehole-log reference is not numerical authority.

| Source / locator | PDF page / printed page | Checked scope and limits |
| --- | --- | --- |
| Look 2014, 2nd ed., Table 5.3 | 85 / 60 | Six clay SPT bands; approximate correlation |
| Look Table 5.5 | 86 / 61 | Five sand SPT bands; clean medium sand, source correction convention |
| Look Table 5.11 | 89 / 64 | Clay/sand DCP; no transfer of sand state bands to gravel; no interpolation at source gaps |
| Look Table 7.3 | 112 / 87 | Soil dry/saturated weights; soft non-organic row; submerged-weight relation |
| Look Tables 7.8–7.9 | 115 / 90 | Sand/gravel friction and selected clay strength pairs; peak, not residual/critical state |
| Look Table 8.5 | 128 / 103 | Fifteen stored USCS permeability rows; well-compacted condition |
| Look Table 9.2 | 140 / 115 | Twenty stored lithology/weathering dry-weight pairs; no unsupported weathering interpolation |
| Look Table 11.7 | 174 / 149 | Clay and granular modulus bands; medium-to-coarse sand, exact gravel states |
| Look Table 11.17 | 179 / 154 | Poisson ratios; source PI bands, not AS classification; unresolved endpoints not invented |
| Look Table 20.22 | 331 / 306 | Six ultimate rock-anchor bond ranges; intact/weathering and verification limitations |
| Look Table 21.4 | 337 / 312 | Eleven presumed allowable bearing bands; geometry, settlement and groundwater basis; gross/net unstated |
| Look Table 21.17 | 345 / 320 | Five clay and four sand pile-factor rows; installation and limiting conditions; factors are not stresses |
| Look Tables 22.1–22.2 and continuation | 356–357 / 331–332 | RQD and intact-strength-based preliminary rock pressures; defects and non-durable rock limitations |
| AS 1726:2017 Table 11 | 33 / 30 | Six numerical undrained-strength classes and endpoint inclusivity; friable has no numerical band here |
| AS 1726:2017 Table 12 | 34 / 31 | Five density-index classes and endpoints |
| AS 1726:2017 Table 19 | 46 / 43 | Six UCS/point-load classes; lower-strength material handled as soil |
| AS 1726:2017 Table 20 | 47 / 44 | Weathering terms; RS/XW do not retain intact-rock strength/bearing output |
| FHWA GEC 6 (2002), Eq. 5-4/5-5/5-7 and Table 5-1 | 58–60 / 52–54 | Conditional surface-strip undrained ultimate example; Nc = 2 + pi, zero surcharge and explicit assumptions |
| FHWA GEC 6 Table 5-15 | 105 / 99 | Seven ultimate mass-concrete base-interface friction rows; historical US guidance |

No empirical range was added to the numerical source data file. New independent literal fixtures cover the previously partial weight/modulus/friction/DCP/permeability/Poisson/point-load checks. The query cross-product covers 270 cohesive + 50 granular + 288 rock selections = 608 controlled combinations; it does not prove empirical validity.

## 6. Deleted / simplified

Removed the misleading sand-to-gravel DCP output and unsupported corrected-SPT display alias. Retained Geo45 deduplication: Foundation questions do not repeat selected bearing/E/nu. No ranges were replaced with generic warnings where the checked source provides an applicable value. No extra default inputs, side-by-side main panels or new design modes were introduced.

## 7. Unclear / source gaps

- Current AS edition/amendment status is not established merely by inspecting the local 2017 PDF; the official product endpoint did not supply readable status in this check.
- QLD/NSW/WA public-report example values in the Sources panel are historical, site-specific spot checks, not the generic lookup authority. Their complete original-page verification was not repeated in Geo46. QLD PDF retrieval succeeded; WA retrieval returned HTTP 403. Do not count these examples as newly accepted numerical evidence.
- Generic adopted pile shaft/base stress, rock-mass stiffness, settlement limits and foundation spring values still need project conditions. Existing pile factors and anchor ultimate bond references are not a complete foundation design set.
- Common parameter names and conventional symbols are not treated as automatically prohibited. Any publication review concerns source-specific wording, table selection/arrangement and applicable permissions; this record makes no legal determination.

## 8. Verified / unchanged — interface inventory

Screenshot paths below are relative to `output/playwright/` and begin `geo46-`. Saved files are local, not uploaded. Table/card observations are scoped to the captured states; semantic/overflow tests also cover the states named in section 9. FIG: N/A, no engineering illustration added.

| Audit ID | Element | Screenshot suffix | Result |
| --- | --- | --- | --- |
| CARD-GEO46-01 | Initial entry and reference boundary | 01-entry.png | Captured; initial state has no adopted selection |
| CARD-GEO46-02 | Reading help | 02-reading.png | Inspected; bearing/strength and weight/density distinguished |
| CARD-GEO46-03 | Clay comparison | overview-geo-clay.png | Inspected; six rows, five columns, source time-label caveat |
| CARD-GEO46-04 | Sand comparison | overview-geo-sand.png | Inspected; five rows, grain-size scope visible |
| CARD-GEO46-05 | Rock comparison | overview-geo-rock.png | Inspected; six rows, UCS and bearing separate |
| CARD-GEO46-06 | Selected clay | 03-clay.png | Inspected; range/use/condition hierarchy |
| CARD-GEO46-07 | Ground refinement | 04-refinement.png | Inspected; full-width controls |
| CARD-GEO46-08 | Optional PI/USCS | 04-refinement.png | Inspected; source PI label, report-only classification |
| CARD-GEO46-09 | Selected sand | 05-sand.png | Inspected; medium/coarse modulus condition |
| CARD-GEO46-10 | Gravel full inventory | 06-gravel.png | Captured; no sand DCP transfer asserted by browser and unit tests |
| CARD-GEO46-11 | Extremely weathered material | 07-extremely-weathered.png | Inspected; rock strength/bearing suppressed |
| CARD-GEO46-12 | Residual soil | 07-residual-soil.png | Inspected; soil-like handling |
| CARD-GEO46-13 | Fresh sandstone detail | 08-rock.png | Inspected; dry weight, separate rock-mass stiffness and Poisson ratio |
| CARD-GEO46-14 | Narrow selected detail and controls | 09-rock-320.png | Inspected; labels and units remain readable, no overlap |
| CARD-GEO46-15 | Bearing question | 10-bearingReference.png | Inspected; ultimate is separate from allowable |
| CARD-GEO46-16 | Conditional ultimate table | 10-bearingReference.png | Inspected; six rows and assumptions |
| CARD-GEO46-17 | RQD table | 10-bearingReference.png | Inspected; five rows and source limits |
| CARD-GEO46-18 | Bearing conditions | 11-bearing-conditions.png | Inspected; settlement basis not a differential-movement limit |
| CARD-GEO46-19 | Settlement question | 10-settlementReference.png | Inspected; no repeated selected ranges |
| CARD-GEO46-20 | Additional settlement inputs | 10-settlementReference.png | Inspected; three project-basis rows |
| CARD-GEO46-21 | Differential movement | 12-differential.png | Inspected; time, support distance and project tolerance |
| CARD-GEO46-22 | Phone settlement | 14-settlement-phone.png | Inspected; stacked headers and units |
| CARD-GEO46-23 | Sliding question | 10-baseInterfaceReference.png | Inspected; ultimate interface reference |
| CARD-GEO46-24 | Base-interface table | 10-baseInterfaceReference.png | Inspected; seven material rows |
| CARD-GEO46-25 | Piles/anchors question | 10-interfaceReferences.png | Inspected; factors distinguished from stresses |
| CARD-GEO46-26 | Clay pile factors | 10-interfaceReferences.png | Inspected; five rows, installation basis |
| CARD-GEO46-27 | Sand pile factors | 10-interfaceReferences.png | Inspected; four rows, installation basis |
| CARD-GEO46-28 | Anchor bond table | 10-interfaceReferences.png | Inspected; six ultimate reference rows |
| CARD-GEO46-29 | Before-design checklist | 10-projectRequirements.png | Inspected; five project requirements |
| CARD-GEO46-30 | Sources container | 13-sources.png | Inspected; collapsed by default |
| CARD-GEO46-31 | FHWA source card | 13-sources.png | Inspected; historical US scope |
| CARD-GEO46-32 | AS source card | 13-sources.png | Inspected; Checked concerns displayed classifications, not whole-page release |
| CARD-GEO46-33 | Look source card | 13-sources.png | Inspected; interpretive, non-normative |
| CARD-GEO46-34 | Application standards card | 13-sources.png | Inspected; routing only |
| CARD-GEO46-35 | Internal reference card | 13-sources.png | Inspected; not numerical authority |
| CARD-GEO46-36 | Government portal card | 13-sources.png | Inspected; context not site design values |
| CARD-GEO46-37 | Public-report examples card | 13-sources.png | Visually inspected; source refresh remains open |
| CARD-GEO46-38 | Before-use boundary | 13-sources.png | Inspected; project confirmation required |

## 9. Tests and reproducible evidence

- All 50 `tests/*.test.js` files passed on the final Geo46 code. `tests/geo-source-completeness.test.js` includes the 608-combination check.
- `audit/geo-release-review.js`: 127 checks passed, no failed assertions or page errors. JSON and executed callback saved in `output/playwright/geo46-browser-result.txt`.
- Real browser: all 17 overview states open/close, refinement changes, gravel exception, RS/XW suppression and fresh-rock restoration, foundation disclosures and expected row counts.
- Main and standalone harness widths: 1440, 1040, 768, 500, 390 and 320 px. Selected details and expanded questions: no document overflow; table headers retained in the accessibility tree; no raw underscore notation in selected text.
- Long-panel screenshots temporarily increase viewport height at the same width to avoid clipping/sticky-header overlap. This is **not** native zoom evidence. Actual capture dimensions are stored in the JSON.
- Screenshots show the sequence: compare all states → select/refine → inspect special material cases → open engineering questions → inspect sources/project needs. No external service receives screenshots or local references.

## 10. Residual risk and next acceptance step

Keep this module Unreleased. Obtain independent engineering acceptance of the source-to-range mapping; refresh public-report locators and standards currency; complete actual native zoom and assistive-technology checks; then record source-specific publication decisions and request explicit release authority. Passing author tests does not clear those gates.
