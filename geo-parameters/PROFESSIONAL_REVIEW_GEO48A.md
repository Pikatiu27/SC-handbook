# Geo48a professional source and applicability review

Date: 6 September 2026. Status: LOCAL / UNRELEASED. Findings open; production unchanged.

## 1. Scope and version

Workspace: C:/Users/silin/.codex/worktrees/5bee/SC Handbook. Branch: codex/geo-parameters; committed baseline 853e863; current uncommitted Geo48a assets, cache 20260906geo48a. Read under SC_HANDBOOK.md sections 15.16A and 15.19, CONTENT_PLAN.md and PREPUBLICATION_REVIEW.md. This review concerns a concise parameter-range reference, not a project design calculation or independent engineering acceptance. Existing modifications were preserved.

## 2. Executive verdict

No new P0/P1 numerical transcription or calculation defect was identified in the source pages checked. The classification, interpretation and design-value boundaries are generally sound. Three P2 applicability/copy findings remain: relative-density evidence, fines-controlled granular strength, and rock bearing as RQD approaches zero. These deserve short, local corrections without changing source ranges or adding a design engine. Passing tests does not resolve these wording findings or authorise release.

## 3. Must modify / release blockers

No new P0/P1 production defect established in this scope. Existing independent technical acceptance, standards currency, pending report-source rechecks, source-specific publication review and publication authorisation remain open. Native 200% was activated in Geo48b, but reliable complete visual/focus evidence and screen-reader speech remain incomplete. Do not reinterpret this author review as closing those gates.

## 4. Should modify — P2 findings

### GEO-PRO-01 — Relative density is not a visual/tactile field description

Location: geo-parameters/geo-parameters.js:84, Classification / AS 1726 relative density basis. Current wording ends with `field description only`. AS 1726:2017, printed page 30 immediately before Table 12 (PDF page 33), expressly excludes visual/tactile assessment of relative density; it requires appropriate penetration correlations or density-based evidence. The existing wording can suggest that observation alone establishes the density class, despite the main overview saying to match reported relative density.

Proposed narrow correction: identify this as a reported classification, supported by penetration-test correlations or density testing, and explicitly exclude visual/tactile assessment alone. Keep Table 12 limits and no-input comparison unchanged. Closure: inspect both entry points' granular inventory and ensure the misleading phrase is absent.

### GEO-PRO-02 — The granular friction-angle note loses the fines-governed boundary

Locations: geo-parameters/geo-parameters.js:87 and :198; initial Sand overview at geo-parameters/app.js:135. Look Table 7.8, printed page 90 / PDF 115, states that fines govern strength when fines exceed 30%. The present instruction to check grading/fines/stress is useful but does not convey that material boundary. Optional SC/SM/GC/GM classification affects the permeability lookup; it does not establish that the generic friction-angle row is applicable. USCS alone also does not establish whether fines exceed 30%.

Proposed narrow correction: carry the source's greater-than-30% fines qualification beside the granular strength reference and in its full basis; require material-specific strength evidence where fines govern. Do not infer a fines percentage from USCS, silently adjust phi, or remove useful general ranges. Look Table 21.4 and Table 5.5 separately discuss clayey/gravelly sand adjustments to their own friction-angle correlations; these must not be automatically applied to the different Table 7.8 ranges. Closure: review a dense sand selection with SC refinement, and confirm it cannot imply a fines-calibrated strength estimate.

### GEO-PRO-03 — Near-zero RQD is outside the rock-bearing concept

Locations: geo-parameters/app.js:146 and geo-parameters/geo-parameters.js:113. The RQD table correctly includes its source 0–25% band and lesser-of-table/UCS/concrete limit. However, Look printed page 332 / PDF 357 explains that material approaching zero RQD should be treated as a soil mass, outside these rock-bearing concepts. The displayed conditions omit this explicit exception, leaving the lower band easy to extend to zero-RQD material.

Proposed narrow correction: add a short near-zero-RQD soil-mass exception beside the table and full inventory basis. Retain the published 0–25% range; do not invent a numerical cutoff or convert it into soil bearing capacity. Existing RS/XW weathering safeguards are useful but do not cover every low-RQD rock mass. Closure: inspect both RQD presentations and confirm the exception remains adjacent to their values.

## 5. Add — source evidence ledger

Original local PDFs were rendered and visually checked, with extracted text used only as a navigation aid. Page numbers below are one-based. The 22-page review does not imply every page or source in the module was rechecked.

| Source | PDF pages / printed pages | Scope checked |
| --- | --- | --- |
| Look, 2nd ed., 2014 | 85, 86, 89 / 60, 61, 64 | Clay SPT, clean medium-sand SPT, DCP ranges and correlation limitations |
| Look | 112, 115 / 87, 90 | Dry/saturated weights, non-organic soft clay, granular friction and peak clay effective strength |
| Look | 128, 140 / 103, 115 | Well-compacted permeability; intact-rock dry unit weight and weathering columns |
| Look | 174, 179 / 149, 154 | Deformation modulus and short/long-term Poisson ratios |
| Look | 331 / 306 | Ultimate grout–rock anchor bond stress and reduction/safety-factor context |
| Look | 337, 345 / 312, 320 | Presumed soil bearing and geometry/water conditions; pile adhesion and interface factors |
| Look | 356, 357 / 331, 332 | RQD and strength/SPT rock-bearing first approximations; refusal, durability and soil-mass limitations |
| AS 1726:2017 | 33, 34 / 30, 31 | Consistency, relative-density bands and evidence limitations |
| AS 1726:2017 | 46, 47 / 43, 44 | Intact strength and weathering classifications |
| FHWA GEC 6, 2002 | 58, 59, 60 / 52, 53, 54 | Equations 5-4 to 5-7 and phi=0 bearing factors |
| FHWA GEC 6 | 105 / 99 | Table 5-15 concrete/ground ultimate friction factors and interface context |

Authorities: [Look source PDF](<C:/Users/silin/Documents/Codex/Reference/04_Foundations_Geotechnical/Handbook of Geotechnical Investigation and Design Tables.pdf>), [AS 1726 source PDF](<C:/Users/silin/Documents/Codex/Reference/01_Standards/AS 1726-2017.pdf>), [FHWA source PDF](<C:/Users/silin/Documents/Codex/Reference/04_Foundations_Geotechnical/Shallow Foundations.pdf>). Temporary source renders: ignored tmp/pdfs/geo-professional/. No source PDF was altered or uploaded.

## 6. Delete / simplify

Replace the ambiguous relative-density phrase rather than adding a general warning block. No verified numerical range, comparison row or parameter family should be deleted on the evidence of this audit. Keep source-specific exceptions next to the affected values. No layout expansion or additional design inputs proposed.

## 7. Unclear / source gaps

Table 21.4 does not establish a universal gross/net convention or safety factor; preserve the stated uncertainty. Table 7.8 friction angles and Table 21.4 presumed pressures are separate reference relationships, not a matched soil parameter set. Do not derive one from the other. The source's PI bands leave exact boundary interpretation unresolved; do not invent inclusivity. Native 200% evidence limitations are those documented in GEO48B_EVIDENCE.md.

The [publisher](https://www.routledge.com/Handbook-of-Geotechnical-Investigation-and-Design-Tables-Second-Edition/Look/p/book/9781138452756) confirms Look second-edition identity and 2014 copyright; that is not an errata or project-applicability check. FHWA GEC 6 is historical US guidance. Current adopted AS 1726 edition/amendments and the outstanding NSW/WA report checks remain unclosed. This review does not assess legal permission to publish source-specific compilation/arrangement.

## 8. Verified — no change

- AS consistency, density and intact-rock strength limits match the checked original tables; strength class is not bearing resistance.
- Presumed allowable, ultimate illustrative and material-strength quantities remain differentiated. The 5.14 su example retains its restricted homogeneous surface-strip basis, rather than an inferred factor converting the presumed pressures.
- Dry/saturated weights, effective clay strength, modulus, Poisson ratios and permeability values checked match the cited tables. GP permeability's unusually high printed upper value is present in the original; it is not evidence of a transcription error. Its well-compacted/structure-excluded condition must remain.
- Missing exact gravel modulus and rock weathering rows stay unassigned; RS/XW do not receive intact-rock bearing values. Natural bulk weight and project design parameters remain project-dependent.
- Pile K_s and interface delta are distinguished from subgrade reaction and soil friction angle. Ultimate anchor bond stress remains separate from design bond/capacity.
- The Geo48a non-organic soft-clay and FHWA source-card corrections remain present. No numerical correction is justified by this review.

## 9. Tests and evidence

Fresh command: `node --test tests/*.test.js`, 6 September 2026. Result: 50 test files passed, zero failures, including source fixtures, independent bearing rounding and 608 controlled selector combinations. The source-page review above is separate from these code tests. No new browser visual acceptance is claimed in this round; Geo48a/Geo48b records retain their stated scopes. Only this report and its review-index entry were written; production files and numerical data were not edited.

## 10. Residual limits and decision

Remain LOCAL / UNRELEASED. Three P2 findings are reported for scoped correction, not marked closed. This is an author-led source/applicability audit, not independent geotechnical design approval. No commit, push, merge, public allowlist change or deployment was performed.
