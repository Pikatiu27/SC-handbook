# Visual Page Audit

## Audit basis

- **Release reviewed:** public Build 0.7.77 baseline at commit `54f33b6`, 23 August 2026; finding `V-01` corrected and released in Build 0.7.78 at commit `42aefe4`.
- **Pages reviewed:** Bolt Capacity, Weld Capacity, Section Properties, Axial Member Capacity, Beam Section Capacity, Steel Monopole Section Capacity, Concrete Pad Section, Reinforcement, Screw Piles Selector and Rock Anchor Selector.
- **Viewports:** desktop `1440 x 1000`; phone `390 x 844`.
- **Evidence rule:** every visible engineering figure and every bounded or functionally independent card has its own audit ID and row. Range-only statements such as “all figures” or “cards 1-8 pass” are not acceptable.
- **Audit-only IDs:** `FIG-*`, `CARD-*` and `SHOT-*` belong to this evidence register. They must not be rendered as locator badges in the public interface.
- **Checks applied:** hierarchy, label clarity, alignment, padding, clipping/overflow, visual duplication, contrast, state legibility and responsive stacking.
- **Reviewer/date:** Codex visual review, 23 August 2026.
- **Evidence limitation:** full-page capture can repeat sticky navigation or the final page segment while stitching. The repeated capture tail is not treated as a product defect; findings below are based on the primary rendered page segment and current viewport inspection.

## Findings

| Finding | Severity | Page | Observation | Recommended action |
|---|---:|---|---|---|
| `V-01` | Resolved | Steel Monopole Section Capacity | On phone, the segment schedule requires horizontal scrolling, but the first view did not clearly indicate that columns continue to the right. | Build 0.7.78 adds a restrained phone-only “Scroll table horizontally” cue inside the schedule card without changing the page structure. |

No other blocking hierarchy, clipping, contrast or visible-card duplication issue was identified in the reviewed default states.

## 1. Bolt Capacity

Evidence: `SHOT-BOLT-DESKTOP-01`, `SHOT-BOLT-PHONE-01`.

No engineering figure is visible in the reviewed default state.

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-BOLT-01` | Section / fastener selection | Desktop + phone | Verified — clear first input stage; controls stack correctly. |
| `CARD-BOLT-02` | Selected bolt basis | Desktop + phone | Verified — selected identity and source values remain visually distinct. |
| `CARD-BOLT-03` | Design shear capacity | Desktop + phone | Verified — result label, value and basis are readable. |
| `CARD-BOLT-04` | Design tensile capacity | Desktop + phone | Verified — paired consistently with shear capacity. |
| `CARD-BOLT-05` | Combined strength actions limitation | Desktop + phone | Verified — warning is prominent without dominating the page. |
| `CARD-BOLT-06` | Detailed connection checks | Desktop + phone | Verified — collapsed state is clear and correctly subordinate. |
| `CARD-BOLT-07` | Calculation basis and limitations | Desktop + phone | Verified — final reference block remains visually separate. |

## 2. Weld Capacity

Evidence: `SHOT-WELD-DESKTOP-01`, `SHOT-WELD-PHONE-01`; expanded figure state `SHOT-WELD-DESKTOP-02`.

| Audit ID | Figure / stable label | Evidence | Result |
|---|---|---|---|
| `FIG-WELD-01` | Arrow-side weld | `SHOT-WELD-DESKTOP-02` | Verified — reference line, arrow and below-line symbol are clear. |
| `FIG-WELD-02` | Other-side weld | `SHOT-WELD-DESKTOP-02` | Verified — above-line symbol is distinguishable from arrow-side convention. |
| `FIG-WELD-03` | Both-side welds | `SHOT-WELD-DESKTOP-02` | Verified — paired symbols read as a single convention. |
| `FIG-WELD-04` | Fillet weld dimensions | `SHOT-WELD-DESKTOP-02` | Verified — size and length locations remain legible. |
| `FIG-WELD-05` | Square butt weld | `SHOT-WELD-DESKTOP-02` | Verified — symbol and arrow line are not clipped. |
| `FIG-WELD-06` | Single-V butt weld | `SHOT-WELD-DESKTOP-02` | Verified — V symbol remains visually distinct. |
| `FIG-WELD-07` | Single-bevel butt weld | `SHOT-WELD-DESKTOP-02` | Verified — bevel orientation is clear. |
| `FIG-WELD-08` | Double-V butt weld | `SHOT-WELD-DESKTOP-02` | Verified — double-sided form is legible. |
| `FIG-WELD-09` | Weld all around and site weld | `SHOT-WELD-DESKTOP-02` | Verified — circle and flag symbols remain separate. |
| `FIG-WELD-10` | Specification or process reference | `SHOT-WELD-DESKTOP-02` | Verified — tail reference location is clear. |
| `FIG-WELD-11` | Complete penetration from one side | `SHOT-WELD-DESKTOP-02` | Verified — supplementary symbol is visible and labelled. |
| `FIG-WELD-12` | Backing run or backing weld | `SHOT-WELD-DESKTOP-02` | Verified — backing symbol remains clear at card scale. |

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-WELD-01` | Weld geometry | Desktop + phone | Verified — first-stage inputs are grouped and stack correctly. |
| `CARD-WELD-02` | Material properties | Desktop + phone | Verified — visually subordinate to geometry but still easy to locate. |
| `CARD-WELD-03` | Other AS 4100 weld types | Desktop + phone | Verified — compact disclosure is clearly interactive. |
| `CARD-WELD-04` | Weld designation | Desktop + phone | Verified — designation and derived values have a clear reading order. |
| `CARD-WELD-05` | Weld symbol legend | Desktop + phone + expanded | Verified — collapsed and expanded states are unambiguous. |
| `CARD-WELD-06` | Weld application notes | Desktop + phone | Verified — secondary guidance remains visually quiet. |
| `CARD-WELD-07` | Design capacity per unit effective length | Desktop + phone | Verified — primary numerical result has appropriate emphasis. |
| `CARD-WELD-08` | Indicative parent-metal screen | Desktop + phone | Verified — “Not enabled” cannot be mistaken for a calculated pass. |
| `CARD-WELD-09` | Optional design checks | Desktop + phone | Verified — disclosure remains subordinate to main result. |
| `CARD-WELD-10` | Calculation details | Desktop + phone | Verified — final calculation disclosure is consistently placed. |
| `CARD-WELD-11` | Calculation basis and limitations | Desktop + phone | Verified — boundary text is easy to find at page end. |

## 3. Section Properties

Evidence: `SHOT-PROPERTIES-DESKTOP-01`, `SHOT-PROPERTIES-PHONE-01`.

| Audit ID | Figure / stable label | Evidence | Result |
|---|---|---|---|
| `FIG-PROPERTIES-01` | Selected PFC section and centroidal axes | Desktop + phone | Verified — section, dimensions and axis convention remain recognisable. |

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-PROPERTIES-01` | Catalogue section selection | Desktop + phone | Verified — family and designation controls are easy to locate. |
| `CARD-PROPERTIES-02` | Material definition | Desktop + phone | Verified — product form, grade and thickness read as one stage. |
| `CARD-PROPERTIES-03` | Selected catalogue section summary | Desktop + phone | Verified — identity, figure, family, axes, basis and source form a coherent summary. |
| `CARD-PROPERTIES-04` | Mass per metre | Desktop + phone | Verified — unit and catalogue basis remain legible. |
| `CARD-PROPERTIES-05` | Gross area | Desktop + phone | Verified — aligned with the other core metrics. |
| `CARD-PROPERTIES-06` | Centroid X | Desktop + phone | Verified — label and unit are unambiguous. |
| `CARD-PROPERTIES-07` | Centroid y | Desktop + phone | Verified — derived status remains visible. |
| `CARD-PROPERTIES-08` | Centroidal axis properties table | Desktop + phone | Verified — rows retain clear hierarchy without horizontal page overflow. |
| `CARD-PROPERTIES-09` | St Venant torsion J | Desktop + phone | Verified — value and basis remain distinguishable. |
| `CARD-PROPERTIES-10` | Warping constant Iw | Desktop + phone | Verified — scientific notation is readable. |
| `CARD-PROPERTIES-11` | Shear-centre offset Xo | Desktop + phone | Verified — offset remains clearly labelled. |
| `CARD-PROPERTIES-12` | Clear web area Aw | Desktop + phone | Verified — derived geometric status is retained. |
| `CARD-PROPERTIES-13` | Polar second moment | Desktop + phone | Verified — grouped consistently with supplementary properties. |
| `CARD-PROPERTIES-14` | Product of inertia | Desktop + phone | Verified — interpretation text prevents ambiguity. |
| `CARD-PROPERTIES-15` | Principal second moments | Desktop + phone | Verified — paired values keep their axis labels. |
| `CARD-PROPERTIES-16` | Principal radii | Desktop + phone | Verified — paired units and values remain clear. |
| `CARD-PROPERTIES-17` | Principal-axis angle | Desktop + phone | Verified — angle unit and derived basis are visible. |
| `CARD-PROPERTIES-18` | Form factor kf | Desktop + phone | Verified — checked reference status remains visible. |
| `CARD-PROPERTIES-19` | Section classification | Desktop + phone | Verified — classification is clearly a reference attribute. |
| `CARD-PROPERTIES-20` | Effective section modulus Ze | Desktop + phone | Verified — directional values remain readable. |
| `CARD-PROPERTIES-21` | Material standard and grade | Desktop + phone | Verified — standard identity remains prominent. |
| `CARD-PROPERTIES-22` | Yield stress | Desktop + phone | Verified — value, unit and source state are clear. |
| `CARD-PROPERTIES-23` | Tensile strength | Desktop + phone | Verified — aligned with yield stress. |
| `CARD-PROPERTIES-24` | Elastic / shear modulus | Desktop + phone | Verified — paired constants remain readable. |
| `CARD-PROPERTIES-25` | Poisson ratio / thermal expansion | Desktop + phone | Verified — paired constants retain labels and units. |
| `CARD-PROPERTIES-26` | Density | Desktop + phone | Verified — basis is visible. |
| `CARD-PROPERTIES-27` | Derivations | Desktop + phone | Verified — collapsed technical trace does not compete with lookup results. |
| `CARD-PROPERTIES-28` | Source and limitations | Desktop + phone | Verified — final source boundary remains easy to locate. |

## 4. Axial Member Capacity

Evidence: `SHOT-MEMBER-DESKTOP-01`, `SHOT-MEMBER-PHONE-01`.

| Audit ID | Figure / stable label | Evidence | Result |
|---|---|---|---|
| `FIG-MEMBER-01` | Selected CHS section guide | Desktop + phone | Verified — diameter and thickness convention remain legible. |

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-MEMBER-01` | Member definition | Desktop + phone | Verified — section, length and governing radius read as one stage. |
| `CARD-MEMBER-02` | Material properties | Desktop + phone | Verified — selected grade and strengths stack correctly. |
| `CARD-MEMBER-03` | Connection / net section | Desktop + phone | Verified — compact disclosure is clearly subordinate. |
| `CARD-MEMBER-04` | Selected member summary | Desktop + phone | Verified — identity, assumptions, key ratios and figure form one coherent card. |
| `CARD-MEMBER-05` | Design compression capacity | Desktop + phone | Verified — result and buckling boundary are clear. |
| `CARD-MEMBER-06` | Design tension capacity | Desktop + phone | Verified — paired consistently with compression. |
| `CARD-MEMBER-07` | Design action check | Desktop + phone | Verified — optional utilisation is not confused with reported capacity. |
| `CARD-MEMBER-08` | Detailed calculation | Desktop + phone | Verified — calculation trace is consistently placed. |
| `CARD-MEMBER-09` | Design basis and limitations | Desktop + phone | Verified — page boundary is visible at the end. |

## 5. Beam Section Capacity

Evidence: `SHOT-BEAM-DESKTOP-01`, `SHOT-BEAM-PHONE-01`.

| Audit ID | Figure / stable label | Evidence | Result |
|---|---|---|---|
| `FIG-BEAM-01` | Selected UB section and active bending direction | Desktop + phone | Verified — section and active axis remain recognisable. |

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-BEAM-01` | Section selection | Desktop + phone | Verified — family and catalogue section are easy to locate. |
| `CARD-BEAM-02` | Material properties | Desktop + phone | Verified — strength inputs remain grouped and source state is visible. |
| `CARD-BEAM-03` | Bending direction | Desktop + phone | Verified — direction control is isolated from material inputs. |
| `CARD-BEAM-04` | Selected section summary | Desktop + phone | Verified — identity, properties and figure read as one summary. |
| `CARD-BEAM-05` | Design section moment capacity | Desktop + phone | Verified — primary moment result is prominent. |
| `CARD-BEAM-06` | Design web shear capacity | Desktop + phone | Verified — paired result remains distinct from moment capacity. |
| `CARD-BEAM-07` | Design actions and utilisation | Desktop + phone | Verified — optional demand review is clearly not a completed check. |
| `CARD-BEAM-08` | Calculation steps | Desktop + phone | Verified — collapsed state remains easy to identify. |
| `CARD-BEAM-09` | Calculation basis and limitations | Desktop + phone | Verified — technical boundary remains visible at page end. |

## 6. Steel Monopole Section Capacity

Evidence: `SHOT-MONOPOLE-DESKTOP-01`, `SHOT-MONOPOLE-PHONE-01`; expanded chart state `SHOT-MONOPOLE-DESKTOP-02`; resolved mobile scroll-cue state `SHOT-MONOPOLE-PHONE-02`.

| Audit ID | Figure / stable label | Evidence | Result |
|---|---|---|---|
| `FIG-MONOPOLE-01` | Design section moment capacity by elevation | `SHOT-MONOPOLE-DESKTOP-02` | Verified — axes, stations and constant-capacity line remain readable. |

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-MONOPOLE-01` | Cross-section geometry | Desktop + phone | Verified — first-stage control is clear. |
| `CARD-MONOPOLE-02` | Profile segment schedule | Desktop + phone + resolved phone state | Finding `V-01` resolved — the phone-only cue identifies the horizontally scrollable table without adding page-level overflow. |
| `CARD-MONOPOLE-03` | Material and resistance basis | Desktop + phone | Verified — stress source and category remain grouped. |
| `CARD-MONOPOLE-04` | Design thickness override | Desktop + phone | Verified — optional override is visually distinct. |
| `CARD-MONOPOLE-05` | Derived properties | Desktop + phone | Verified — compact summary strip reads clearly. |
| `CARD-MONOPOLE-06` | Moment capacity | Desktop + phone + expanded | Verified — collapsed summary and expanded chart states are coherent. |
| `CARD-MONOPOLE-07` | Compression and bending capacities | Desktop + phone | Verified — second result stage is clearly separate. |
| `CARD-MONOPOLE-08` | Calculation details | Desktop + phone | Verified — calculation trace is subordinate to results. |
| `CARD-MONOPOLE-09` | Sources and limitations | Desktop + phone | Verified — final basis card is consistent with other tools. |

## 7. Concrete Pad Section

Evidence: `SHOT-PAD-DESKTOP-01`, `SHOT-PAD-PHONE-01`; expanded figure state `SHOT-PAD-DESKTOP-02`.

| Audit ID | Figure / stable label | Evidence | Result |
|---|---|---|---|
| `FIG-PAD-01` | Cross-section, strain distribution and equivalent stress block | `SHOT-PAD-DESKTOP-02` | Verified — three-part sequence, notation and force location remain legible. |

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-PAD-01` | Analysis basis | Desktop + phone | Verified — compression face is the clear first decision. |
| `CARD-PAD-02` | Section geometry | Desktop + phone | Verified — top and bottom pad depths remain paired. |
| `CARD-PAD-03` | Reinforcement layout | Desktop + phone | Verified — cover and arrangement read as one stage. |
| `CARD-PAD-04` | Material properties | Desktop + phone | Verified — concrete strength remains clearly labelled. |
| `CARD-PAD-05` | Symbols | Desktop + phone | Verified — compact disclosure is visible without adding clutter. |
| `CARD-PAD-06` | Reinforcement mat | Desktop + phone | Verified — row labels and layer inputs remain clear. |
| `CARD-PAD-07` | Shear reinforcement | Desktop + phone | Verified — optional state is explicit. |
| `CARD-PAD-08` | Checked section | Desktop + phone | Verified — adopted face and strip are prominent. |
| `CARD-PAD-09` | Design flexural capacity | Desktop + phone | Verified — numerical result and unit are readable. |
| `CARD-PAD-10` | One-way shear section capacity | Desktop + phone | Verified — paired consistently with flexure. |
| `CARD-PAD-11` | Section analysis schematic | Desktop + phone + expanded | Verified — collapsed and expanded states are unambiguous. |
| `CARD-PAD-12` | Detailed section checks | Desktop + phone | Verified — technical detail remains subordinate. |
| `CARD-PAD-13` | Calculation basis and limitations | Desktop + phone | Verified — scope boundary is easy to locate. |

## 8. Reinforcement

Evidence: `SHOT-REO-DESKTOP-01`, `SHOT-REO-PHONE-01`.

No engineering figure is visible in the reviewed default state.

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-REO-01` | Check selection | Desktop + phone | Verified — check type and bar size are the clear first stage. |
| `CARD-REO-02` | Design conditions | Desktop + phone | Verified — geometry and casting position remain grouped. |
| `CARD-REO-03` | Additional conditions | Desktop + phone | Verified — optional conditions are clearly disclosed. |
| `CARD-REO-04` | Straight 500N bars | Desktop + phone | Verified — selected design basis is clear without an extra badge. |
| `CARD-REO-05` | Inputs | Desktop + phone | Verified — strength, cover and spacing stack cleanly. |
| `CARD-REO-06` | Calculated cd | Desktop + phone | Verified — derived value is visually separate from manual inputs. |
| `CARD-REO-07` | Required lap length | Desktop + phone | Verified — adopted result is the page focus. |
| `CARD-REO-08` | Lap reduction | Desktop + phone | Verified — optional reduction remains clearly secondary. |
| `CARD-REO-09` | Calculation details | Desktop + phone | Verified — calculation trace is consistently positioned. |
| `CARD-REO-10` | References and limitations | Desktop + phone | Verified — source boundary is clear at page end. |

## 9. Screw Piles Selector

Evidence: `SHOT-SCREW-DESKTOP-01`, `SHOT-SCREW-PHONE-01`.

No engineering figure is visible in the reviewed default state.

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-SCREW-01` | Product selection | Desktop + phone | Verified — supplier and product controls remain paired. |
| `CARD-SCREW-02` | Product identity | Desktop + phone | Verified — selected series is prominent. |
| `CARD-SCREW-03` | Model / series | Desktop + phone | Verified — metadata label and value remain clear. |
| `CARD-SCREW-04` | System | Desktop + phone | Verified — system type remains distinct. |
| `CARD-SCREW-05` | Data level | Desktop + phone | Verified — publication status is visible. |
| `CARD-SCREW-06` | Compression SWL | Desktop + phone | Verified — available capacity is prominent. |
| `CARD-SCREW-07` | Published tension / uplift | Desktop + phone | Verified — “Not published” cannot be read as zero capacity. |
| `CARD-SCREW-08` | Published lateral | Desktop + phone | Verified — unavailable direction is explicit. |
| `CARD-SCREW-09` | Product specification | Desktop + phone | Verified — technical rows remain readable and aligned. |
| `CARD-SCREW-10` | Required before adoption | Desktop + phone | Verified — adoption boundary is prominent. |
| `CARD-SCREW-11` | Preliminary Pile-Group Action Distribution | Desktop + phone | Verified — collapsed optional tool is clearly separate. |
| `CARD-SCREW-12` | Basis / limits | Desktop + phone | Verified — final source/status card remains easy to find. |

## 10. Rock Anchor Selector

Evidence: `SHOT-ROCK-DESKTOP-01`, `SHOT-ROCK-PHONE-01`.

No engineering figure is visible in the reviewed default state.

| Audit ID | Card / stable label | Evidence | Result |
|---|---|---|---|
| `CARD-ROCK-01` | Product selection | Desktop + phone | Verified — supplier and product/system controls remain paired. |
| `CARD-ROCK-02` | Product identity and source-status chips | Desktop + phone | Verified — identity and source cautions read before capacity. |
| `CARD-ROCK-03` | Published yield load | Desktop + phone | Verified — value and manufacturer-data boundary are clear. |
| `CARD-ROCK-04` | Published ultimate load | Desktop + phone | Verified — paired consistently with yield load. |
| `CARD-ROCK-05` | Supplier | Desktop + phone | Verified — key-data label and value remain legible. |
| `CARD-ROCK-06` | Anchor form | Desktop + phone | Verified — product form is clear. |
| `CARD-ROCK-07` | Tendon | Desktop + phone | Verified — diameter and area remain readable. |
| `CARD-ROCK-08` | System configuration | Desktop + phone | Verified — configuration text wraps without clipping. |
| `CARD-ROCK-09` | Standard / approval | Desktop + phone | Verified — approval wording remains visible. |
| `CARD-ROCK-10` | Published geometry / code | Desktop + phone | Verified — unavailable status is explicit. |
| `CARD-ROCK-11` | Available protection | Desktop + phone | Verified — product scope remains clear. |
| `CARD-ROCK-12` | Typical components | Desktop + phone | Verified — component list wraps cleanly. |
| `CARD-ROCK-13` | Australian pathway | Desktop + phone | Verified — confirmation boundary remains prominent. |
| `CARD-ROCK-14` | Source / data basis | Desktop + phone | Verified — source date and links remain readable. |
| `CARD-ROCK-15` | Before adoption | Desktop + phone | Verified — adoption warning is visually distinct. |
| `CARD-ROCK-16` | Product basis and limitations | Desktop + phone | Verified — final source/status disclosure is consistent. |

## Completion statement

- Every engineering figure visible in the reviewed default or deliberately expanded evidence states has its own `FIG-*` row.
- Every bounded or functionally independent card visible in those states has its own `CARD-*` row.
- No figure or card is accepted through a range-only statement.
- `V-01` was the only visual-location finding from this pass and is resolved in Build 0.7.78.
- Conditional input combinations, alternate section families and calculation-detail internals require separate state-specific evidence if they are included in a later expanded-state audit.
