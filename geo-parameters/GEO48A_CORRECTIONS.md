# Ground Parameters - Geo48a scoped corrections

## 1. Audit scope and version

6 September 2026; Codex author review. Worktree C:/Users/silin/.codex/worktrees/5bee/SC Handbook, branch codex/geo-parameters, baseline 853e863 with existing uncommitted edits. Cache 20260906geo48a. User continuation accepted the two P2 corrections in GEO48_POST_RECOVERY_AUDIT.md. Scope: initial soft-clay unit-weight qualification and main/standalone FHWA source-summary consistency.

## 2. Executive verdict

GEO48-A01 and GEO48-A02 are resolved at author level within this scope. Local / Unreleased remains. No independent engineering or publication acceptance.

## 3. Must modify

No new P0/P1 finding in this scoped correction. Existing release blockers remain unchanged.

## 4. Should modify - resolved

- GEO48-A01: the initial soft-clay weight cell now says "Non-organic soft clay only." beside its unchanged dry/saturated values. The existing value-line styling preserves readable size. This condition is restricted to the Soft row; selected guidance and full inventory retain their existing conditions.
- GEO48-A02: main Sources now contains the same concise FHWA GEC 6 summary as the standalone harness, with the historical-US boundary. Each entry point has seven source cards and exactly one FHWA summary. Existing method-level citations remain.

## 5. Add

The DOM contract checks both documents for the FHWA identity and jurisdiction limitation. audit/geo48a-copy-review.js verifies actual rendered overview values and scope, unique state/summary counts and no overflow at 1440/390/320 px in both entry points. output/playwright/geo48a-browser-result.txt stores 33 passing assertions and 12 final screenshots.

## 6. Delete or simplify

No range, control or useful table removed. No extra user input, calculation or CSS rule. Reused the existing value-line component for the soft-clay condition.

## 7. Unclear / source gap

No new source-PDF audit or publisher status check. NSW/WA source rechecks, standards currency, independent engineering acceptance, actual native 200% zoom, screen-reader speech and outstanding full-state visual/manual checks remain open. Screenshots are element crops at normal zoom, not native-zoom or all-state acceptance.

## 8. Verified - no change

Numerical data file SHA256 unchanged from the pre-edit snapshot in output/playwright/geo48a-change-baseline.json. Initial 17-state comparison remains unselected. Soft dry/saturated values remain 12/16 kN/m3. No assumed project value, new range or design result. All existing unrelated edits preserved.

## 9. Test matrix and evidence

- Final production code: all 50 tests/*.test.js files passed, including existing 608 controlled selection combinations.
- Geo production app and browser callback syntax checks passed.
- Local public build: 43 allowlisted files; exclusion tests passed with Geo absent. No deployment.
- Browser: 33 checks passed, zero page errors; main and standalone at 1440, 390, 320 px, height 1000.
- Current Geo script/cache and actual value-line DOM verified after reload; screenshots below are final refreshed captures.
- Reviewer for every row: Codex, 6 September 2026. FIG: N/A. Scope limited to the soft row (default comparison) and FHWA card (expanded Sources).

| Audit item | Entry / state / selector | Viewport | Screenshot | Result |
| --- | --- | --- | --- | --- |
| CARD-GEO48A-01 | main; #geo-clay Soft row, default | 1440 x 1000 | [SHOT-GEO48A-1440-01](../output/playwright/geo48a-main-1440-soft.png) | Values and non-organic condition readable; no overlap. GEO48-A01 resolved. |
| CARD-GEO48A-02 | main; FHWA article, Sources expanded | 1440 x 1000 | [SHOT-GEO48A-1440-02](../output/playwright/geo48a-main-1440-fhwa.png) | Source scope and historical-US limitation readable; no clipping. GEO48-A02 resolved. |
| CARD-GEO48A-03 | main; #geo-clay Soft row, default | 390 x 1000 | [SHOT-GEO48A-390-03](../output/playwright/geo48a-main-390-soft.png) | Values and non-organic condition readable; no overlap. GEO48-A01 resolved. |
| CARD-GEO48A-04 | main; FHWA article, Sources expanded | 390 x 1000 | [SHOT-GEO48A-390-04](../output/playwright/geo48a-main-390-fhwa.png) | Source scope and historical-US limitation readable; no clipping. GEO48-A02 resolved. |
| CARD-GEO48A-05 | main; #geo-clay Soft row, default | 320 x 1000 | [SHOT-GEO48A-320-05](../output/playwright/geo48a-main-320-soft.png) | Values and non-organic condition readable; no overlap. GEO48-A01 resolved. |
| CARD-GEO48A-06 | main; FHWA article, Sources expanded | 320 x 1000 | [SHOT-GEO48A-320-06](../output/playwright/geo48a-main-320-fhwa.png) | Source scope and historical-US limitation readable; no clipping. GEO48-A02 resolved. |
| CARD-GEO48A-07 | standalone; #geo-clay Soft row, default | 1440 x 1000 | [SHOT-GEO48A-1440-07](../output/playwright/geo48a-standalone-1440-soft.png) | Values and non-organic condition readable; no overlap. GEO48-A01 resolved. |
| CARD-GEO48A-08 | standalone; FHWA article, Sources expanded | 1440 x 1000 | [SHOT-GEO48A-1440-08](../output/playwright/geo48a-standalone-1440-fhwa.png) | Source scope and historical-US limitation readable; no clipping. GEO48-A02 resolved. |
| CARD-GEO48A-09 | standalone; #geo-clay Soft row, default | 390 x 1000 | [SHOT-GEO48A-390-09](../output/playwright/geo48a-standalone-390-soft.png) | Values and non-organic condition readable; no overlap. GEO48-A01 resolved. |
| CARD-GEO48A-10 | standalone; FHWA article, Sources expanded | 390 x 1000 | [SHOT-GEO48A-390-10](../output/playwright/geo48a-standalone-390-fhwa.png) | Source scope and historical-US limitation readable; no clipping. GEO48-A02 resolved. |
| CARD-GEO48A-11 | standalone; #geo-clay Soft row, default | 320 x 1000 | [SHOT-GEO48A-320-11](../output/playwright/geo48a-standalone-320-soft.png) | Values and non-organic condition readable; no overlap. GEO48-A01 resolved. |
| CARD-GEO48A-12 | standalone; FHWA article, Sources expanded | 320 x 1000 | [SHOT-GEO48A-320-12](../output/playwright/geo48a-standalone-320-fhwa.png) | Source scope and historical-US limitation readable; no clipping. GEO48-A02 resolved. |

## 10. Residual limitations

Keep local and Unreleased. The earlier post-recovery audit is historical evidence for unchanged panels; its two named P2 findings are superseded by this correction record. The broader source, accessibility, independent review and publication gates are not closed. No commit, merge, push or publication.
