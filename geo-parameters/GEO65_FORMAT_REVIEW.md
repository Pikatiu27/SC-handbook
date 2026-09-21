# Geo65 — handbook format alignment

Local / Unreleased. Formatting scope only; no engineering values changed.

## Corrections

- Aligned refinement selects at 46 px desktop / 44 px phone; helper text no longer stretches adjacent controls. Phone select text remains 16 px.
- Applied canonical 13 px table headers and 15 px disclosure headings; inline source summaries have 32 px desktop / 44 px phone targets.
- Separated 12 px range-type labels from numerical values and enabled tabular numerals.
- Aligned the standalone title to 22 px desktop / 15 px phone, the 1040 px content width, compact spacing, sentence-case introductory text and 12 px source notes.
- Updated both entry-point cache markers to 20260921geo65.

## Browser evidence

1. Main lookup: desktop sand refinement controls share their top position and 46 px height; inspected range-type/value separation and opened pile-reference rows.
2. Main lookup: 320, 390, 768 and 1280 px viewport checks found no page-level horizontal overflow. At phone widths, select text is 16 px and source targets are 44 px. Clay selected-detail screenshot checked at 390 px.
3. Standalone: inspected gravel at 390 px, expanded sources at 390 px, and rock overview at 1280 px. After correction, mobile title is 15 px and source status text is 12 px; no page overflow at 390 px.
4. Compared the established Reinforcement tab at desktop and phone widths for shared typography, control scale and spacing. Restored normal viewport and main Geo65 preview.

Screenshots were inspected in the browser tool output; no screenshot files are attached to this report. These checks do not establish full screen-reader or native 200% zoom acceptance.

## Verification and limits

All 50 test files passed. Public build produced 43 allowlisted files with Geo excluded; diff whitespace check passed. Existing independent engineering, standards-currency, WA-source, source-specific publication and accessibility gates remain open. No commit, push or publication.
