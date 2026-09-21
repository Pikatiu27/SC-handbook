# Geo64 — condition-specific quick ranges

## Scope and verdict
User-approved range refinement; Local / Unreleased. Geo64 adds exact Look Table 7.8 grading-specific friction ranges for loose/dense sand only. Grading resets when unavailable or material changes; other classes retain their source ranges. Overview remains grading-unspecified. Detailed values distinguish classification bands, typical references, conditional bearing and estimation factors. Broad rock-bearing and very-dense sand stiffness references remain explicitly qualified; no midpoint or artificial bounds adopted.

## Source and implementation
Look (2014) Table7.8 PDF115/printed90, reviewed during Geo63: loose uniform27–30 / well30–32 degrees; dense uniform37–40 / well40–42 degrees. Exact source rows added to query logic; original dataset unchanged. No additional ranges inferred. Grading does not modify bearing, modulus, weight or pile factors; no USCS equivalence is inferred.

## Checks
50 test files pass, including four source row fixtures, unsupported medium/very-dense fallback and no transfer to gravel. Main browser confirms dense well-graded40–42 degrees; switching to very dense resets grading to unknown, hides the unavailable refinement and displays42–47 degrees. No independent source or publication approval is claimed by these tests.

## Residual limits
Broad source ranges remain broad where the source does not support narrowing. Existing Geo63 engineering/currency/WA/publication/accessibility gates remain open. No commit or publication.
