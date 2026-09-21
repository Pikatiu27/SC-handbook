# Ground Parameters — Geo47 scoped acceptance follow-up

## 1. Scope / version

5 September 2026; base 853e863, dirty local worktree, assets `20260905geo47`. Local source-card clarification and keyboard acceptance follow-up to GEO46_ACCEPTANCE.md. Author: Codex. No independent reviewer or release authority. No empirical lookup change, commit, push or publication.

## 2. Verdict

The recorded keyboard checks pass. The page remains a local reference under review. Publication is not accepted. Geo46 source/visual evidence remains historical evidence for unchanged elements, not a newly rerun full audit.

## 3. Must modify / resolved

Stage C, GEO47-S01: the QLD spot-check wording did not distinguish project drawing requirements from a geological dataset. The Sources card now identifies PDF page 24, footing note F3, and 150 kPa safe working pressure with project founding conditions. This is not an ultimate pressure or a generic stiff-clay range.

Stage C, GEO47-S02: NSW and WA numerical examples remain site-specific historical checks; both now explicitly say `source recheck pending`. No new general range is inferred from them. No existing main comparison value was removed or replaced by those cases.

## 4. Should modify / external acceptance

Actual native 200% zoom and screen-reader speech still require manual verification. Two programmatic shortcut forms have now failed to change the native scale. Do not repeat responsive-width or CSS/pinch-scale checks as purported native-zoom evidence. Independent engineering acceptance and source-specific publication decisions remain separate requirements.

## 5. Added source evidence

The [QLD planning-report PDF](https://www.statedevelopment.qld.gov.au/__data/assets/pdf_file/0031/99814/planning-report.pdf), PDF page 24, Foundations/Slabs on Ground F3, explicitly describes 150 kPa as a safe working bearing pressure for natural stiff clay. It also gives project founding-depth and material-approval conditions. Page 20 contains the raft drawing and its minimum bearing requirement. These are project drawings within a planning submission, not a government generic parameter recommendation. Do not merge their differing footing details into a universal rule.

Evidence limit: current text retrieval succeeded, but the PDF screenshot endpoint failed and direct download encountered a challenge page. Therefore this follow-up is a text/locator check, not a new visual acceptance of the drawing. The prior 22-page Look/AS/FHWA inspection is unaffected. NSW retrieval returned an internal fetch error; WA retrieval failed. No challenge was bypassed and no alternate unofficial copy was admitted.

The [Standards Australia product endpoint](https://store.standards.org.au/product/as-1726-2017) again yielded no readable status. Third-party catalogue search results are not used to close the publisher/amendment verification gate. Local AS 1726:2017 transcription remains version-specific, not proof of project adoption or amendment currency.

## 6. Simplification / unchanged

Only the Sources card wording and cache identifiers changed in production. Five-column comparison, optional inputs, numerical dataset and foundation questions remain unchanged. No redesign or additional parameter-entry burden.

## 7. Unclear

NSW/WA original-page acceptance, source currency and actual zoom/speech acceptance remain open. General automated keyboard tests cannot establish screen-reader pronunciation, all assistive technologies, or focus contrast against every state/background.

## 8. Verified / no change

CARD-GEO47-01: all 17 ground buttons activate with Enter and close with Space. CARD-GEO47-02: 12 reachable disclosures open with Enter in the selected-clay branch. CARD-GEO47-03: 49 expanded Geo tab stops can be traversed and exited without a keyboard trap; all recorded focused elements have a non-none computed outline. This is not a complete contrast or visibility certification.

CARD-GEO47-04: `output/playwright/geo47-keyboard-desktop.png` inspected; navigation-link focus is visible. CARD-GEO47-05: `output/playwright/geo47-keyboard-phone.png` inspected at 390 px; focused link remains visible and document does not overflow. FIG: N/A.

## 9. Tests / evidence

`audit/geo-keyboard-review.js` is the replayable local-browser callback. `output/playwright/geo47-keyboard-result.txt` stores all 48 passing assertions and the 49-stop path. Native-zoom attempt: before/after innerWidth 1440, devicePixelRatio approximately 1.0; `nativeZoomChanged: false`. No CSS zoom or browser settings are persisted. Browser returned to the initial Geo47 page at 1440 x 1000.

Final regression: 50 test files passed, including source-wording/cache contracts; public build produced 43 allowlisted files with Geo excluded. Diff-integrity and callback syntax checks passed. Browser confirmed the Geo47 asset marker and final source wording. These checks do not close the remaining external acceptance gates.

## 10. Next step / residual risk

Manual acceptance should record reviewer, date, browser/assistive technology, actual zoom percentage, screenshot and result. Check initial comparisons, selected details/refinement, all four foundation questions and Sources at actual 200% zoom; use a screen reader to verify table headers, symbols, state announcements and disclosure operation. Then complete source-page/currency and independent engineering review before considering an explicit publication decision.
