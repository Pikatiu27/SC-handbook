# Geo74 — local release closeout

21 September 2026. Local / Unreleased. No publication or professional sign-off.

## Completed changes

- Removed the unverified WA ARMS numerical example from integrated and standalone source cards. Historical evidence is retained in Geo63/72; the release issue is closed by omission, not verification. Other verified project examples remain.
- Clarified that Look's anchor safety factor is method-specific and requires project anchor testing. All numerical ranges and calculation methods remain unchanged.
- Corrected current cache/version in CONTENT_PLAN and the historical Geo71 sentence in PREPUBLICATION_REVIEW. Runtime/cache: 20260921geo74.
- Preserved compact tables, source disclosures, material boundaries and all pre-existing uncommitted work.

## New external evidence

### Ground anchors: successful original retrieval

[FHWA-IF-99-015, June 1999, official USDOT archive](https://rosap.ntl.bts.gov/view/dot/712/dot_712_DS1.pdf), Table 7 PDF94/printed73 and adjacent PDF95/printed74 visually inspected. Sandstone bond 0.8–1.7 MPa broadly matches Look's 825–1725 kPa; granite/basalt 1.7–3.1 MPa broadly matches 1725–3000 kPa. These are not exact endpoint matches. Soft limestone upper bounds also differ; dolomitic limestone is not automatically equivalent to all hard limestone. FHWA cites PTI1996, so independent source lineage cannot be assumed. Adjacent guidance uses safety factors 3.0 for competent-rock transfer and 2.0 for weak-rock transfer, not a universal 2.0–2.5. Keep methods separate. Verdict: magnitude corroborated for named comparable rows, not universal range validation; source-access gap closed.

### Clay shafts and rock bearing: method dependence

[FHWA NHI-06-089, December 2006, Volume II](https://rosap.ntl.bts.gov/view/dot/53656/dot_53656_DS2.pdf): PDF239/printed9-129, equations9-37/38, visually inspected. Alpha0.55 applies within its stated normalised undrained-strength limit, unlike Look's fissured/non-fissured0.30/0.45. This supports the alpha-method framework, not interchangeable coefficients. The paragraph's bottom exclusion and figure differ; do not import that dimension.

PDF77/printed8-43 Tables8-9/10 visually inspected; PDF75/printed8-41 context read. Sound sedimentary rock has a 1.4–2.4MPa presumptive range under its conditions. RQD guidance is described as an upper-bound estimate, limited by intact strength/concrete and poorer layers. This does not validate a universal strength-class-to-bearing mapping. Retain Geo's conditional, not-UCS-derived label; do not replace source ranges with unrelated rock-class values.

### Remaining source limits

High-density sand/gravel friction endpoints remain source-specific: external indexed IowaDOT correlations provide qualitative corroboration of high angles, but not matched material/classification/test validation. No endpoint changed. AS1726 official store still yielded no usable currency/amendment status; third-party current listings are supplementary only. These historical US references do not establish current Australian design requirements.

## Validation

- Public artifact built locally: 43 allowlisted files, Geo excluded.
- All 51 test files passed after edits, including six Geo files and 608 controlled selector combinations.
- Integrated page: all four material overviews at1280/768/390/320px had no document horizontal overflow. At320px very-dense Sand detail opened, focus moved to its heading, and the visible table was inspected without clipping.
- Keyboard ArrowRight moved Clay to Sand; End moved Sand to Rock, with focus following selection.
- Standalone entry: all four material overviews at1280/390px had no document horizontal overflow; removed WA wording absent and method-specific anchor note present.
- These are scoped browser/geometry observations. Native200% zoom and screen-reader speech acceptance are not established by viewport resizing or accessibility-tree inspection.

## Release decision and remaining owners

Keep local. No new broad layout rewrite is justified. External evidence now supports more of the method context, but does not constitute independent engineering acceptance.

| Gate | Current disposition | Required completion |
| --- | --- | --- |
| WA unverified example | Closed by removal from both pages | None for omitted example |
| Anchor source retrieval | Closed through official archive | Engineering review of intended use remains |
| Automated regression/build boundary | Passed | Recheck if implementation changes |
| Numerical professional acceptance | Open | Named independent geotechnical reviewer: source-conditioned ranges, high-angle correlations, clay factors, rock-bearing mapping and anchor method |
| Standard currency | Open | Official adopted edition/amendment confirmation |
| Publication expression | Open | Item-level decision on AS classification selections, Look compiled tables, FHWA-derived presentation and project-report examples; citations alone are not sign-off |
| Manual accessibility | Open | Native200% zoom, complete keyboard/focus and screen-reader speech acceptance |

## Evidence preservation

Original PDFs and page renders remain local in the temporary geo-independent-review folder, outside the public artifact. SHA256:

- fhwa-anchors-rosap.pdf: 2501e171a90a1d169d1f3eba581551ebbe5279775a915bb9fd05fa3b95a1a5f2
- fhwa-soils.pdf: 181a02c8c1ba7310d4c299f8bfb4f154d441d77f136f93879a0fd53ae2d64ccb

Audit baseline audit/geo74-data-before.json preserves the pre-edit data-file text; only the anchor explanatory note changed. No commit, merge, push, deployment or allowlist admission.
