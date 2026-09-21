# Geo49 — integrated parameter lookup

## 1. Scope / version
16 September 2026. User requested completion of the parameter-first layout after reviewing Geo48c. Worktree 5bee, branch codex/geo-parameters, uncommitted baseline 853e863; cache 20260916geo49. Local / Unreleased.

## 2. Verdict
Requested reorganisation implemented in main and standalone entries. Foundation questions is no longer a separate heading or navigation destination. The selected result has three columns: Parameter, Reference range, Conditions and source. Uses sit beneath names.

## 3. Must modify / completed
Bearing source conditions and applicable tables now immediately follow the bearing value. Deformation references follow modulus. Interface friction and pile/anchor parameters have supplemental rows with matching-condition prompts and expandable numerical source tables. No contact or installation value is silently selected from the ground class. The same live disclosures move with the selected result; no duplicate IDs are created.

## 4. Should modify / limits
This is author implementation acceptance, not independent professional or publication acceptance. The full inventory remains folded for traceability. Full native-200% visual and screen-reader acceptance remain open.

## 5. Added / content mapping
| Previous location | Current location |
| --- | --- |
| Bearing question | Disclosure immediately below selected bearing row; clay ultimate table shown for clay, RQD table for non-soil-like rock |
| Settlement question | Disclosure following modulus; retains consolidation and differential-movement criteria |
| Sliding question | Concrete-ground interface parameter row; all source contact rows remain available |
| Piles and anchors question | Pile-factor / anchor-bond parameter row; installation and rock-type comparisons retained |
| Used for column | Compact use label under parameter name |

Initial 17-state comparisons remain available without input. General supplementary tables now require opening a ground-state result; this deliberately replaces the earlier no-selection question-section workflow at user request. Full source table comparisons remain accessible; they are not automatically narrowed to an assumed contact or construction method.

## 6. Deleted / simplified
Removed the Foundation questions heading/link and obsolete four-column styling. Removed the overview rock button pointing to a detached question section. Updated SC_HANDBOOK.md and CONTENT_PLAN.md to the new workflow. No numeric source row deleted.

## 7. Unclear / release gates
Outstanding standards currency, NSW/WA report-source checks, source-specific publication review, independent engineering acceptance and complete manual accessibility gates remain unchanged. This layout work makes no new source or publication claim.

## 8. Verified — unchanged
Numeric data SHA256 matches audit/geo49-baseline.json. Material strength remains distinct from allowable and illustrative ultimate bearing. RQD near-zero and fines limitations remain. Extreme-weathering selection does not display RQD rock-bearing or a clay ultimate example. No design values are adopted.

## 9. Tests and visual evidence
50 test files passed after the final code changes. Public build: 43 allowlisted files; Geo excluded. Browser: 73 layout/applicability checks and 108 keyboard/state checks passed across both entries, including all 17 states and XW handling; no page error in layout run. Layout checked at 1440, 390 and 320 CSS pixels. Scripts: audit/geo49-layout-review.js and audit/geo49-state-review.js; results: output/playwright/geo49-layout-result.txt and geo49-state-result.txt.

Six saved viewport screenshots inspected: geo49-main-desktop, geo49-standalone-desktop, geo49-main-rock-mobile, geo49-standalone-rock-mobile, geo49-main-interface-mobile, geo49-standalone-interface-mobile (output/playwright/*.png). These cover desktop integration and mobile RQD/interface readability. They are scoped viewport evidence, not all-state screenshot acceptance. Main sticky header occupies the viewport top; content is scrollable. A final CSS rule removes unintended inherited bold text in reference cells.

## 10. Residual limits / delivery
Current local preview: http://127.0.0.1:4174/?preview=geo49#geo. Existing modifications preserved. No commit, push, merge, deployment or public allowlist admission. Previous source and accessibility gates are not closed by this layout change.
