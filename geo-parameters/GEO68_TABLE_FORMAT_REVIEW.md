# Geo68 — table formatting review

Local / Unreleased. Formatting-only change; numerical values and calculation logic unchanged.

Findings: long headings combined parameter/unit/condition text; paired cell labels wrapped unevenly; the six-column table remained compressed at tablet width.

Corrections: split heading metadata into canonical12 px secondary lines; retain13 px headings/values; stack paired labels above values without redundant colons; consistent12 px desktop cell padding, top alignment and tabular numbers; use existing accessible card reflow through960 px with8 px cell padding. Sand benchmark updates preserve the split header and mobile-label structure.

Browser: desktop1280, tablet768 and phone390 screenshots inspected. Clay/Sand/Gravel/Rock checked at320/768/960/1024/1280 px without page horizontal overflow. The stress selector remains functional. Full native zoom/screen-reader and existing engineering/publication gates remain open. No publication or commit.
