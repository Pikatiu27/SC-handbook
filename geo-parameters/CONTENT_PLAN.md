# Ground Parameters — current implementation plan

Current scope incorporates Geo73 findings: medium–coarse sand scope in the modulus header; concise exclusions for residual/fines-bearing/cemented/crushable sand; separate uplift assessment for shaft estimates; shorter material notes. Numerical ranges, equations, typography and responsive layout unchanged. Local / Unreleased.

Current: Geo75 / 20260921geo75. Local / Unreleased.

Geo65 aligns typography, controls, disclosures and the standalone entry with the handbook. See [GEO65_FORMAT_REVIEW.md](GEO65_FORMAT_REVIEW.md).

Geo75 verifies the official AS1726:2017 Current listing and updates source status only. Publication-expression inventory: GEO75_SOURCE_PUBLICATION_REVIEW.md. Manual engineering/accessibility acceptance is deferred at user request, not passed.

## Current workflow

Geo71 refines table spacing and column widths; adds subtle alternate-row shading; phone cards use tinted state headings, compact unit labels and side-by-side dry/saturated values. Numerical content and conditions unchanged.

Geo70 completes the scoped first-look cleanup: conditional preliminary rock-bearing heading, sticky desktop overview headers, one Clay shaft table with folded basis only, and plain-language approximate upper bounds. Numerical source data and calculation methods unchanged. See [GEO70_RELEASE_CLEANUP.md](GEO70_RELEASE_CLEANUP.md).

Geo68 table formatting separates parameter headings from units/conditions, stacks paired labels above values, top-aligns cells and reflows reference tables at 960 px. Numerical content is unchanged. See [GEO68_TABLE_FORMAT_REVIEW.md](GEO68_TABLE_FORMAT_REVIEW.md).

Geo67 adds more first-look numbers: Clay and Sand now include shaft estimates and dry/saturated unit weights; Gravel adds relative-density index bands; Rock adds point-load strength bands. Geo69 keeps Sand overview shaft estimates fixed at labelled σ′_v = 100 kPa. The 50/100/200 kPa assumed-stress selector is in folded Pile shaft details and changes that table only. All numbers reuse existing source data or Geo66 conditional calculations. See [GEO67_OVERVIEW_REVIEW.md](GEO67_OVERVIEW_REVIEW.md).

Geo66 prioritises numerical references by material. Clay: s_u / q_a / E_s plus calculated bored-pile shaft ranges; Sand: φ′ / E_s / q_a plus shaft-stress scenarios at stated σ′_v; Gravel: φ′ / E_s / γ plus source-matched concrete-interface factors; Rock: UCS / q_a plus lithology-specific ultimate grout–rock bond. Full detail retains the remaining parameters. Quick references remain visible, following the selected detail when open. No mandatory application selector.

See [GEO66_NUMERICAL_QUICK_REFERENCE.md](GEO66_NUMERICAL_QUICK_REFERENCE.md). Original numerical dataset unchanged; new shaft estimates are explicitly derived, rounded and conditioned. Never treat stress benchmarks as density-only ranges or transfer sand factors to gravel.

Geo64 adds exact Look Table 7.8 grading-specific friction ranges for loose/dense sand only. Grading resets when unavailable or material changes; other classes retain their source ranges. Overview remains grading-unspecified. Detailed values distinguish classification bands, typical references, conditional bearing and estimation factors. Broad rock-bearing and very-dense sand stiffness references remain explicitly qualified; no midpoint or artificial bounds adopted.

Clay, Sand, Gravel and Rock are material lookup tabs, not a complete classification. Show one key-range overview, followed by one shared detailed table for the selected state. Tabs are the only material navigation; compatible subtype, lithology, weathering and classification refinements remain within each tab. Switching tabs clears previous results.

Use Parameter / Reference value / range / Conditions as the three-column detail structure. Keep the independent-range note visible. Place soil gross/net bearing qualifications with the soil-bearing reference. State source-check scope and unresolved currency separately. Preserve numerical data and all source conditions.

## Reader and workflow

Structural engineer seeking a basic range comparison, not an adopted design set. No input is needed to view the active material overview. Click state -> nearby three-column parameter table -> parameter-specific source disclosure or optional refinement. Bearing and deformation references follow their parameters; interface and pile/anchor references occupy supplemental parameter rows. No separate Foundation questions section.

## Parameter and source placement

| Content | Initial comparison | Selected detail / question | Value type / unit | Source / qualification |
| --- | --- | --- | --- | --- |
| Soil allowable bearing q_a | All existing clay/sand states | Selected details: source conditions; Bearing: general conditions | Presumed pressure, kPa | Look 21.4; natural ground, width and 25 mm settlement basis; sand groundwater/shape modifiers; gross/net unstated; no transfer to gravel |
| Rock allowable bearing q_a | All six strength states | Bearing: complete RQD table | Preliminary pressure, MPa | Look 22.2/22.1; not UCS or rock-mass design resistance; defects/weathering; selected bearing suppressed for RS/XW soil-like classes |
| Clay ultimate bearing q_ult | Not mixed into allowable column | Bearing: all six screens without selection | Derived approximate pressure, kPa | Existing 5.14s_u homogeneous undrained surface-strip model, AS 1726 band bounds; no universal allowable/ultimate conversion |
| Undrained shear strength s_u | All clay states | Purpose and classification caveat | Classification band, kPa | AS 1726 Table 11; not adopted characteristic strength |
| Effective cohesion c′ / friction φ′ | Sand φ′ | Clay peak pairs, sand/gravel φ′ and project c′ | Typical peak range, kPa / degrees | Look 7.8/7.9; drainage/stress/softening conditions; no invented missing rows |
| Intact rock strength UCS | All rock states | Full name and test meaning | Classification band, MPa | AS 1726 Table 19; distinct from rock-mass/bearing strength |
| Deformation modulus E_s / E_rm | Soil values; rock project requirement | Selected; Settlement refers back | Source ranges, MPa | Look 11.7; source short/long-term labels individually attached; no calendar duration; gravel matching rows only |
| Dry/saturated unit weight | Existing exact rows | Separate labelled states; rock refinement | Representative values/source intervals, kN/m³ | Look 7.3/9.2; dry is not natural; no density conversion |
| Poisson ratio ν | Secondary | Separate selected row; Settlement refers back | Dimensionless source pair/envelope | Look 11.17; optional plasticity narrowing; no inferred rock-mass value |
| Permeability k | Secondary | Unified detail table | Range, m/s | Look 8.5; compatible classification or explicit family envelope |
| SPT / DCP / point-load index | Secondary | Unified detail table | Indication / source units | Look 5.3/5.5/5.11; AS 1726 rock indication; equipment/corrections; not adopted parameters |
| Consolidation / subgrade reaction | Secondary | Settlement and project list | Project inputs | No general numerical source admitted; E is not k_v; no universal movement allowance |
| Base friction coefficient / angle | Secondary | Sliding: seven rows | Ultimate factor / degrees | FHWA GEC 6 Table 5-15, PDF105/printed99; historical US reference; contact descriptions retained, no automatic AS mapping |
| Pile shaft factors | Secondary | Piles and anchors: five clay + four sand rows | Dimensionless factors | Look 21.17; installation classes, overlapping clay bands and displacement caveats retained |
| Pile shaft/base stresses | Geo66: conditional clay shaft ranges and sand shaft benchmarks | Selected detail retains source factors; base resistance remains project-specific | Approximate shaft stress, kPa | Look 21.17; explicit uniform-soil/installation/stress conditions; no allowable stress or total capacity |
| Ultimate grout–rock bond | Secondary | Piles and anchors: six rock rows | Ultimate stress, kPa | Look 20.22; intact-rock assumption, fractured/weathered reduction and testing qualifications |

## Interaction contracts

- Geo43: same-row activation toggles details; reopening retains compatible subtype, plasticity and USCS selections. Rock headings include weathering. RS/XW suppress inherited rock strength/point-load bands as well as rock bearing; use soil-strength and stiffness project inputs, not a guessed soil class. Exact unit-weight rows remain source-qualified material values.
- Geo43 copy: separate clay and granular Poisson-ratio notes; rock stiffness notes do not inherit soil time labels. Point-load notation renders the full s(50) index as a subscript.
- One selected panel is moved, not cloned; ids and handlers stay unique.
- Row activation focuses its nearby heading; an aria-live status announces the state.
- Table selection uses generic clay/rock, not assumed silty clay/sandstone.
- No sand state remains highlighted when gravel is selected.
- USCS options are compatible with clay/sand/gravel; material-tab changes clear classifications and weathering.
- Parameter source disclosures follow the selected rows; shaft and anchor references remain separate.
- Local section links preserve the shared #geo route.
- Small screens retain all values and explanatory labels. Keyboard, focus, zoom/reflow and duplicate-id checks are part of acceptance.

## Source and release boundary

The numerical data file remains unchanged through Geo63. Tests compare presentation back to that source-backed data and retain independent original fixtures. This is not a new source-transcription audit. Independent engineering acceptance, source currency and publication-rights approval remain separate gates. Public build excludes the entire module including guide.css.








## Historical snapshots — not current requirements

Historical: Geo61 / 20260921geo61 (21 September 2026): material lookup scope beside tabs; family navigation removed from refinements; clay subtype and rock lithology retained; independent-range note visible below each overview; consistent Intact rock strength; source-qualified fines wording; Pile shaft resistance with explicitly dimensionless factors. Numeric dataset unchanged; Local / Unreleased.

Historical: Geo60 / 20260918geo60. Clay | Sand | Gravel | Rock material sub-tabs. Active overview and one shared detail table in the same panel; switching clears prior selection. Canonical typography and phone touch targets retained. See GEO60_MATERIAL_TABS_REVIEW.md.

Historical: Geo59 / 20260918geo59. User selected key-range overview plus a single detailed table below. Four material comparison tables share the guide-query values; no separate full inventory. See GEO59_OVERVIEW_REVIEW.md.

Historical: Geo58 / 20260918geo58. Material/state picker -> one fixed parameter table -> inline source evidence. Full parameter reference removed; its parameters merged without source-row loss. See GEO58_UNIFIED_QUERY_REVIEW.md. Earlier flows below are historical.

Historical: Geo57 / 20260918geo57. Direct Pile shaft friction result with source installation factors, separate anchor bond row, USCS-gated primary permeability, material-specific modulus notes. See GEO57_QUERY_REVIEW.md. Previous presentation summaries below are historical.

Historical classification: Geo56, cache 20260917geo56. Three navigation families; four explicit material tables and 22 state rows. Clay references are not generic cohesive/silt coverage. Gravel has no presumed bearing range and no modulus outside verified source classes. See GEO56_CLASSIFICATION_REVIEW.md. Local / Unreleased.

Historical presentation: Geo55, cache 20260916geo55. Repeated use lines are assistive-only; redundant visible heading/disclaimer removed. Canonical sizes and critical conditions retained. See GEO55_HIERARCHY_REVIEW.md.

Historical entry: Geo54, cache 20260916geo54. Ground ranges, Jump to section links and a folded Parameter guide. See GEO54_ENTRY_REVIEW.md. Numeric/query data unchanged.

Historical workflow: Geo53, cache 20260916geo53. One Full parameter reference below the comparisons; current state labelled and stale rows cleared. See GEO53_REFERENCE_REVIEW.md. Earlier inventory-placement descriptions are historical.

Historical presentation: Geo52, cache 20260916geo52. See GEO52_TYPOGRAPHY_REVIEW.md for canonical hierarchy, compact mobile results and project-prompt styling. Local / Unreleased.

Historical copy: Geo51, cache 20260916geo51. See GEO51_COPY_REVIEW.md; concise English with technical limits preserved. Geo50 layout retained.

Historical presentation: Geo50, cache 20260916geo50. See GEO50_LAYOUT_REVIEW.md. Geo49 query logic retained; spacing and hierarchy refined. Local / Unreleased.

Historical layout (16 September 2026): Geo49, cache 20260916geo49. User-requested parameter-first reorganisation; source disclosures are integrated into selected results. See GEO49_LAYOUT_REVIEW.md. All earlier layout entries below are historical. Local / Unreleased.

Historical follow-up (8 September 2026): Geo48c, cache 20260908geo48c. See GEO48C_CORRECTIONS.md for the three professional applicability corrections and residual release gates. Numeric data unchanged; Local / Unreleased. Earlier entries below are historical.

### Earlier implementation notes

Historical follow-up: Geo48a, cache 20260906geo48a. GEO48A_CORRECTIONS.md records the two accepted overview/source-summary corrections and scoped browser evidence. Numeric ranges and workflow remain unchanged; local and Unreleased. Earlier Geo48 entries below are retained as history.

Historical Geo48 scope: `PREPUBLICATION_REVIEW.md`. Defines sand-pile K_s and δ and keeps the soft-clay non-organic condition in both selected guidance and full inventory. No numeric range, parameter placement or interaction change. Cache `20260905geo48`; remains local and Unreleased. Geo47's source-card and keyboard evidence is retained in `GEO47_FOLLOWUP.md` as historical scoped evidence.

Geo46 applicability corrections: no sand DCP bands for gravel; sand modulus restricted to medium/coarse sand; permeability identifies well-compacted source conditions; rock weight identifies dry state; selected soft-clay guidance identifies the non-organic source row; PI and corrected SPT labels do not imply unverified AS/normalisation equivalence. No extra inputs or empirical ranges. Historical source/browser/release evidence: `GEO46_ACCEPTANCE.md`, indexed by `PREPUBLICATION_REVIEW.md`. Publication remains incomplete.

Historical release-gate evidence: `PREPUBLICATION_REVIEW.md`. Geo45 removes repeated selected bearing/E/ν values from Foundation questions, separates rock E_rm and ν, distinguishes the two k_v quantities by name/unit, and adds the hydrostatic submerged-weight relation. Existing source ranges, ultimate examples and release boundaries are unchanged. The folded full inventory remains intentionally complete for traceability.

Status: For Review / local only. Governing rules: SC_HANDBOOK.md Geo section and Section 15.19. This is an implementation record, not a second master outline.

