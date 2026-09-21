# Geo48c — professional applicability corrections

## 1. Scope and version
8 September 2026; codex/geo-parameters, baseline 853e863 with existing dirty changes. Cache 20260908geo48c. User authorised continuation after the publication-readiness review.

## 2. Verdict
GEO-PRO-01/02/03 corrected at author level. Local / Unreleased; no publication acceptance.

## 3. Must modify / resolved
Relative-density classification now requires penetration correlations or density testing and excludes visual/tactile assessment alone. Granular strength overview, selected guide and full basis include the source's fines-exceed-30% qualification. RQD table and inventory include the soil-mass exception as RQD approaches zero. No numerical cutoff or automatic strength adjustment was introduced.

## 4. Should modify / remaining acceptance
Independent engineering and publication review remain open. Complete native-200% visual/focus and screen-reader evidence remain open. These are not closed by this wording correction.

## 5. Added evidence
Five assertions added to the existing query regression cover dense sand with SC refinement, unchanged friction range, source applicability in guide/inventory, density evidence and RQD limits. Browser callback audit/geo48c-copy-review.js checks both main and standalone entries. Baseline hashes: audit/geo48c-baseline.json.

## 6. Deleted / simplified
Removed the ambiguous field-description-only phrase. No parameter rows, ranges, calculations or layout rules deleted or added.

## 7. Unclear / source gates
Standards Australia product endpoint was checked again on 8 September and returned no usable status content: https://store.standards.org.au/product/as-1726-2017. Edition/amendment currency remains unverified. NSW/WA report-source rechecks and source-specific publication review remain open. This run uses the original-page evidence in PROFESSIONAL_REVIEW_GEO48A.md; no new PDF audit is claimed.

## 8. Verified — unchanged
geo-parameters-data.js SHA256 matches the pre-edit baseline. Existing 0–25% RQD range remains. SC refinement continues to refine permeability only, not infer fines percentage or calibrate strength. Project design values remain unassigned.

## 9. Tests and browser evidence
50 test files passed, zero failures, including 608 controlled selector combinations. Ten final browser assertions passed across both entries at 1440 and 390 CSS pixels. Four selected-detail screenshots captured; the two 390 px images were inspected. Both show the fines condition next to the unchanged friction range. Main long-element capture includes the sticky site header across another row, so it is not complete unobstructed visual acceptance. RQD was checked as DOM text, not a new RQD visual acceptance. Initial preview connection failure was resolved by restarting the local server; callback state/accordion issues were corrected before the final passing run. Result: output/playwright/geo48c-result.txt. No full accessibility acceptance claimed.

## 10. Residual limits / release decision
Production corrections complete at author level. Preserve existing modifications. No commit, push, merge, public allowlist change or publication. Remaining gates require their own evidence and reviewer decisions.
