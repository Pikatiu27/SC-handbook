# Rebar Lap Research Notes

Status: research baseline supporting the local `Reo Lapping Check` web tab.

Last reviewed: 2026-07-18

The 2026-07-18 professional audit retained the existing AS 3600 lap/development formula core. The changes below concern route separation, evidence gating and result status.

## 1. Intended first calculator scope

The most defensible first release is a quick check for the tensile lap length of straight, deformed reinforcing bars to AS 3600:2018, incorporating Amendments 1 and 2.

Keep the first release limited to:

- Australian deformed bar in tension;
- Grade 500N as the default material family;
- contact or non-contact lap splices;
- wide-member and narrow-member branches from AS 3600 Clause 13.2.2;
- the basic development-length method by default;
- an optional advanced refined-development method only when the transverse reinforcement inputs are available.

Keep these cases outside the first quick calculator:

- tension-tie members, where lapped splices are not permitted;
- bars larger than 40 mm, for which lapped splices are not permitted in tension or compression;
- welded and mechanical splices;
- welded mesh laps;
- bundled bars;
- compression laps;
- complete hook/cog geometry and detailing design, headed bars and proprietary anchorage-capacity calculations; a standard hook/cog may appear only as an independent cast-in end-anchorage reference;
- seismic plastic-hinge and project-specific ductile detailing requirements;
- bridge-specific requirements under AS 5100.5;
- legacy Y bars, plain round bars, stainless, galvanized, epoxy-coated or lightweight-concrete cases unless they are explicitly added and sourced.

## 2. Reference hierarchy

| Priority | Reference | Use in current implementation | Status and notes |
| --- | --- | --- | --- |
| 1 | AS 3600:2018, incorporating Amendments 1 and 2 | Development and lap-splice equations, geometry definitions, limitations | Local source visually checked at PDF pages 188-190 and 195-197. Standards Australia currently lists AS 3600:2018 as pending revision, so release checks must confirm that the edition has not changed. |
| 2 | AS/NZS 4671:2019 | Reinforcing-steel grades, nominal diameters, areas, masses and material conformity | Current material standard used for the machine-readable bar table. Table 7.5(A) is the primary source for Australian 500N nominal bar data. |
| 3 | AS 3600:2018 Supplement 1:2022 | Commentary and interpretation support | Standards Australia lists the supplement as current. It should support interpretation, not replace the normative clauses. |
| 4 | InfraBuild Reinforcing Product Guide, fourth edition; information current April 2022 | Product availability, design-information tables and supplier data | Useful product source. The hosted filename includes `2023`, but that is not the edition stated inside the guide. Supplier ordering masses and rounded helper tables are not substitutes for AS/NZS 4671 nominal design data. |
| 5 | InfraBuild Construction Solutions Product Guide, 2021 | Product codes, approximate mass, stock lengths and processing guidance | Useful for ordering and fabrication context. |
| 6 | OneSteel 500PLUS Reinforcing Guide, circa 2011-2012 | Historical comparison and legacy quick tables | Pages 18-24 use AS 3600:2009. Do not copy its lap values into a calculator based on AS 3600:2018. |
| 7 | AS/NZS 1554.3:2014 and Amendment 1:2017 | Welded reinforcing-steel splices | Separate workflow only. Do not treat a welded lap as an AS 3600 lapped splice. |
| 8 | AEFAC TN08 Volume 1 and Volume 2 | Conditional PIR moment-resisting connection route and minimum anchorage floor | Volume 2 is used only with Volume 1, for its stated moment-resisting and static/quasi-static scope, and with an applicable EAD 332402-prequalified system supported by the current EAD/ETA assessment. It is not a universal PIR lap or embedment rule. |
| 9 | Current project PROFIS report and product assessment | Project-specific required embedment, governing failure mode and design conclusion | Report-transcribed input only. Record the method, Standard edition, EAD/ETA or other assessment, software/report version, conclusion and reported length symbol/measurement basis. The handbook does not independently verify product resistance. |
| 10 | Project-nominated AS 5216 edition | PIR / fastening design boundary | The quick page does not implement an AS 5216 capacity model. Retain the actual edition stated in the project report. |

Supplier cross-check: the current InfraBuild Class N product page lists N10 to N40, with N40 available only on request. The fourth-edition *Reinforcing Product Guide*, information current April 2022, also lists N50 on request; the current product page omits N50. Retain N50 only as a guide-based product reference and block it from a lapped-splice result. The current supplier page still cites an older AS/NZS 4671 edition, so calculation data and project acceptance must remain controlled by AS/NZS 4671:2019 and the applicable project certification.

### Local source locations

- `C:\Users\silin\Documents\Codex\Reference\01_Standards\AS3600.pdf`
- `C:\Users\silin\Documents\Codex\Reference\_codex_reference_packs\01-standards-as3600\sections.md`
- `C:\Users\silin\Documents\Codex\Reference\02_Catalogues\005-application_attachment-a-2.9.2-onesteel_manufacturing_pty_ltd_0.pdf`
- `C:\Users\silin\Documents\Codex\Reference\_codex_reference_packs\02-catalogues-005-application-attachment-a-2-9-2-onesteel-manufacturing-pty-ltd-0\sections.md`

### Online primary sources

- [Standards Australia - AS 3600:2018 status](https://store.standards.org.au/explore-standards/construction?page=8)
- [Standards Australia - AS 3600:2018 Amendment 2:2021](https://store.standards.org.au/explore-standards/construction?page=9)
- [Standards Australia - AS 3600:2018 Supplement 1:2022](https://store.standards.org.au/explore-standards/popular-standards?page=88)
- [Australian Government public record - AS/NZS 4671:2019](https://www.industry.gov.au/sites/default/files/adc/public-record/2025-01/attachment_col-c-1.1_-_as_nzs_4671_2019_-_public_record.pdf)
- [InfraBuild Reinforcing Product Guide, 2023](https://www.infrabuild.com/wp-content/uploads/sites/8/2021/04/InfraBuild-Reinforcing-Product-Guide_2023.pdf)
- [InfraBuild Construction Solutions Product Guide, 2021](https://www.infrabuild.com/wp-content/uploads/sites/8/2021/04/InfraBuild-Construction-Solutions-Product-Guide_MAR2021.pdf)
- [InfraBuild Class N deformed bar product page](https://www.infrabuild.com/reinforcing/products/reinforcing-bar/deformed-reinforcing-bar-rebar-class-n/)
- [InfraBuild SENSE 600 product information](https://www.infrabuild.com/sense-solutions/sense600/)
- [ACRS product certification search](https://steelcertification.com/search-results-general?prop_Company=&prop_KeyWords=&prop_ModuleId=2010&prop_Name=&prop_Property_Country=)

## 3. Cleaned 500N bar data

The machine-readable source is [rebar-data.csv](rebar-data.csv).

| Bar | Nominal diameter (mm) | Nominal area (mm2) | AS/NZS 4671 nominal mass (kg/m) | InfraBuild published mass (kg/m) | InfraBuild length (m/t) |
| --- | ---: | ---: | ---: | ---: | ---: |
| N10 | 10 | 78.5 | 0.617 | 0.64 | 1552 |
| N12 | 12 | 113 | 0.888 | 0.93 | 1077 |
| N16 | 16 | 201 | 1.58 | 1.65 | 605 |
| N20 | 20 | 314 | 2.47 | 2.58 | 387 |
| N24 | 24 | 452 | 3.55 | 3.71 | 269 |
| N28 | 28 | 616 | 4.83 | 5.05 | 198 |
| N32 | 32 | 804 | 6.31 | 6.59 | 151 |
| N36 | 36 | 1020 | 7.99 | 8.35 | 119 |
| N40 | 40 | 1260 | 9.86 | 10.3 | 97 |
| N50 | 50 | 1960 | 15.4 | 16.02 | 64 |

Important data rule:

- Use the AS/NZS 4671 nominal diameter and area in engineering calculations.
- Use the AS/NZS 4671 nominal mass for theoretical design quantities.
- Keep InfraBuild published mass and metres per tonne as supplier/ordering data only.
- Do not use the InfraBuild sales mass to back-calculate design area.
- Treat InfraBuild metres per tonne as approximate. The published values are not consistently the exact reciprocal of the rounded published mass, particularly for N50.
- N50 may remain in the general material table, but it must be blocked from a lapped-splice result because AS 3600 does not permit lapped splices for bars larger than 40 mm.

AS/NZS 4671 Table 7.5(A) gives the Australian nominal values and states that nominal mass is calculated using a density of 7850 kg/m3. InfraBuild's published mass values are higher and are suitable for supplier quantity estimates. The two data series should remain visibly separate.

## 4. AS 3600 calculation model to preserve

### 4.1 Basic development length in tension

For a deformed bar in tension, AS 3600 Clause 13.1.2.2 gives:

`Lsy.tb = 0.5 k1 k3 fsy db / (k2 sqrt(f'c))`

subject to:

`Lsy.tb >= 0.058 fsy k1 db`

where:

- `k1 = 1.3` for a horizontal bar with more than 300 mm of concrete cast below it, otherwise `k1 = 1.0`;
- `k2 = (132 - db) / 100`;
- `k3 = 1.0 - 0.15(cd - db) / db`, limited to `0.7 <= k3 <= 1.0`;
- `cd` is taken from Figure 13.1.2.2 and depends on member type, cover and clear spacing;
- `f'c` is not taken greater than 65 MPa in this equation;
- `db` is in millimetres.

The calculated value is multiplied by 1.5 for epoxy-coated bars and by 1.3 for lightweight concrete. These cases should be disabled or shown as explicit non-default options, never silently assumed.

### 4.2 Refined development length

AS 3600 Clause 13.1.2.3 gives:

`Lsy.t = k4 k5 Lsy.tb`

The method needs transverse-reinforcement and/or transverse-pressure inputs. The product `k3 k4 k5` must not be less than 0.7. Because these inputs are easy to misstate, the basic method should be the first-release default and the refined method should be an advanced option with full formula steps.

In `K = 0.05(1 + nf/nbs) <= 0.10`, `nf` is the number of fitment bars within one longitudinal spacing or pitch that the potential splitting crack has to cross. It is not a generic effective-leg count, and the Figure 13.1.2.3 arrangement with `nf = 0`, `nbs = 1` and `K = 0.05` is valid. `nbs` is the number of longitudinal bars being developed or spliced at which that crack can develop.

### 4.3 Tensile lap in wide elements or members

For bars lapped in the plane of wide elements or members such as flanges, band beams, slabs, walls and blade columns, Clause 13.2.2 gives:

`Lsy.t.lap = max(k7 Lsy.t, 0.058 fsy k1 db)`

Use `k7 = 1.25` by default. `k7 = 1.0` is allowed only when both conditions are confirmed:

- reinforcement area provided is at least twice the area required; and
- no more than half of the reinforcement at the section is spliced.

Partial bar utilisation does not create a continuous stress-ratio reduction for this lap equation. Clause 13.2.2 explicitly requires `Lsy.t` calculated in accordance with Clause 13.1.2.1. The separate `Lst = Lsy.t sigma_st/fsy` provision in Clause 13.1.2.4 applies to development length where less than yield stress is required; it is not substituted into the Clause 13.2.2 lap formula. For the supported lap path, retain `k7 = 1.25` unless both discrete qualifications above are demonstrated; do not interpolate `k7` or multiply `Llap` by a utilisation ratio.

### 4.4 Tensile lap in narrow elements or members

For narrow elements or members such as beam webs and columns:

`Lsy.t.lap = max(0.058 fsy k1 db, k7 Lsy.t, Lsy.t + 1.5 sb)`

where `sb` is the clear distance between the bars of the lapped splice. If `sb <= 3db`, AS 3600 permits `sb` to be taken as zero for this calculation.

### 4.5 Geometry that must not be hidden

For straight bars in the relevant AS 3600 figures:

- wide element: `cd = min(a/2, c)`;
- narrow element: `cd = min(a/2, c1, c)` for the basic development geometry;
- lapped bars: `cd = min(a/2, c)` in the Clause 13.2.2 lap figure;
- `a` is the clear distance between adjacent parallel bars developing stress;
- For the lap-splice workflow, `c`, `a` and `sb` must be labelled against Figure 13.2.2. Do not carry the general-development `c1` dimension into this lap-specific input contract.

For standard hooked or cogged bars in Figure 13.1.2.2, use the separate geometry branch: `cd = a/2` in wide elements and `cd = min(a/2, c1)` in narrow elements. Clear cover remains a separate detailing requirement but is not an additional `cd` candidate for this hook/cog branch.

Do not replace these geometry inputs with exposure classification alone. Exposure classification can inform cover design, but the lap equation needs the actual bar arrangement and actual cover geometry.

### 4.6 Standard hooks and cogs are anchorage, not a lap-factor reduction

The current InfraBuild *Reinforcing Product Guide*, pp. 36-37, states that a standard hook or cog provides half of the tensile development length for that end of the bar, measured from the outside of the hook/cog, under AS 3600 Cl. 13.1.2.6 and Cl. 13.1.2.7. This affects the end anchorage of that bar.

It does not create another multiplier for the Cl. 13.2.2 straight-bar lap equation and does not combine automatically with the `k7` reduction. If a cogged or hooked bar participates in a connection, identify the load path explicitly:

- use the straight-bar lap calculation only where the required common straight overlap is provided;
- assess the cog or hook separately as end anchorage, including the standard geometry, bend diameter, cover, splitting and confinement requirements; and
- do not subtract `0.5Lsy.t` from `Llap` or assume that a cog at one end halves the lap.

This separation is also visible in the historical OneSteel *REODATA 4.0*: pp. 18-24 are titled `Stress Development & Lap Splicing of Straight Deformed Bars in Tension`, while p. 30 separately addresses `Standard Hooks and Cogs`. Page 30 repeats the half-development statement but is based on AS 3600:2009, so it is historical confirmation of the distinction rather than a current design table.

### 4.7 Refined pressure credit needs an evidence gate

The refined method may reduce `k5` when qualifying transverse pressure is present, but a typed pressure value is not evidence that the pressure acts across the governing potential splitting plane for the adopted anchorage or lap length. The page must require a pressure calculation/source reference and explicit confirmation of that basis before applying `k5 < 1.0`. Without that evidence use `p = 0` and `k5 = 1.0`. Reset the confirmation whenever the case, bar arrangement, geometry, adopted length, pressure or calculation basis changes.

### 4.8 PIR report geometry is separate from AS 3600 context

For PIR, the current project report provides the required embedment. Available depth is compared with that report value only after report metadata, favourable conclusion, transcription, same-case and verified-depth-basis gates are complete. The AS 3600 development result is cast-in context and must not become the PIR acceptance target. Failure or incompleteness of that contextual calculation must not hide an otherwise complete report geometry record.

Where the report expressly uses AEFAC TN08 Volume 2, first confirm that it is a moment-resisting PIR connection, Volume 2 is used with Volume 1, the system is prequalified for the applicable EAD 332402 route with a current EAD/ETA assessment, and the action scope is static or quasi-static. Only then calculate:

`lb,min = max(0.30 Lsy.tb, 10db, 100 mm)`

The project-report embedment must not be less than this applicable floor. A smaller value requires report/design review and must not be repaired by silently substituting the floor. If TN08 applicability is not established, do not present the floor as a universal PIR requirement.

### 4.9 Foundation extensions have parallel design paths

A side extension, top extension or tower / monopole pedestal extension normally needs three parallel records:

1. existing-side bar anchorage;
2. new-side bar connection, such as a lap; and
3. existing-to-new concrete interface transfer.

The quick page may calculate or record the first two. It does not design the interface, so that line records only the external project design reference/confirmation. The overall connection record remains incomplete until all applicable lines have their required evidence; this is a completeness status, not a design `PASS`.

## 5. Product-source findings

### InfraBuild / former OneSteel 500PLUS

- The current InfraBuild guides publish Class N deformed bar product codes, approximate mass and metres per tonne.
- The fourth-edition guide includes helper tables for bar area by number of bars, area per metre by spacing and approximate bars per tonne.
- The current product guide rounds some areas for convenience. The AS/NZS 4671 values remain the calculation source.
- The current InfraBuild Class N product page still mentions AS/NZS 4671:2001 in its descriptive text. Use AS/NZS 4671:2019 as the material-data source and treat supplier-page standard references as information that may lag the current edition.
- The historical OneSteel 500PLUS guide includes an AS 3600:2009 quick-reference lap table and worked examples. Its assumptions are useful when checking calculator input requirements, but its tabulated outputs are not a valid 2018 lookup table.
- The historical guide treats straight-bar lap splicing and hook/cog anchorage in separate chapters. Do not combine its half-development hook/cog statement with its straight-lap table.
- The historical guide also explains why supplier invoice mass includes a rolling margin. That reinforces the need for separate design and ordering columns.

### SENSE 600

InfraBuild now supplies a 600N normal-ductility range with product-specific S designations and non-standard diameters. It is not a simple label change from N500 bar. A future calculator must use the actual SENSE 600 diameter, area, yield strength, certification scope and product guidance. Do not map an N-bar lap result onto SENSE 600 by equivalent tensile capacity alone.

### Other suppliers

Other suppliers can be used to confirm stock lengths and commercial availability, but supplier pages sometimes retain old references to AS/NZS 4671:2001. Product availability pages should not control the normative calculation. Current ACRS certificates and the project steel certificate remain the conformity check.

## 6. Implemented input and data contract

Minimum visible inputs:

1. Bar designation or diameter.
2. Reinforcement grade, initially fixed to 500N.
3. Concrete strength `f'c`.
4. Wide or narrow element/member.
5. Bar casting position for `k1`.
6. Actual clear cover and clear bar spacing needed to derive `cd`.
7. Default or reduced `k7`, with both reduction conditions explicitly confirmed.
8. `sb` for narrow-member non-contact laps.

Advanced inputs:

- transverse reinforcement for `k4`;
- transverse pressure for `k5`, together with its calculation/source reference and explicit applicability confirmation;
- epoxy coating;
- lightweight concrete.

Recommended outputs:

- governing tensile lap length in millimetres;
- the same length expressed as a multiple of `db`;
- raw calculated length and a separately labelled practical rounded-up length;
- governing branch and formula;
- `k1`, `k2`, `k3`, `k7` and `cd`;
- a short eligibility/result warning.
- Figure 13.2.2 stagger guide `>= 0.3Lsy.t.lap`, clearly separated from the lap-length requirement and percentage-spliced confirmation.

Rounding up to the next 10 mm is a practical presentation convention used by historical supplier tables. It should be labelled as calculator rounding, not quoted as an AS 3600 equation requirement.

## 7. Release verification gates

- Confirm the current AS 3600 edition and amendment status on the release date.
- Visually re-check Clauses 13.1.2.2, 13.1.2.3 and 13.2.2 and their figures against the licensed source.
- Implementation decision: basic method is the default; the refined method is available as an advanced branch with visible supporting inputs and formula steps.
- Verify at least one wide-member and one narrow-member hand calculation.
- Verify top-bar, `k7 = 1.25`, `k7 = 1.0`, `sb <= 3db`, `sb > 3db` and `db > 40 mm` branches.
- Verify that a positive pressure value does not activate `k5 < 1.0` until its evidence basis is confirmed, and that the confirmation resets when its case changes.
- Verify independent straight and standard hook/cog cast-in anchorage routes; no hook/cog selection may alter a Cl. 13.2.2 lap.
- Verify TN08 Volume 2 applicability gating, each floor candidate, rounding and a report embedment below the applicable floor.
- Verify that PIR report geometry remains independent from the AS 3600 contextual reference.
- Verify that every extension shows existing-side anchorage, new-side bar connection and interface-design records and remains incomplete while any line is outstanding.
- Verify method/edition/EAD-ETA compatibility, report conclusion, length symbol/basis and required descriptions for every `Other` report choice.
- Keep supplier ordering mass out of the lap-length formula.
- Maintain the source/version block in the UI rather than embedding an unexplained supplier lap table.
