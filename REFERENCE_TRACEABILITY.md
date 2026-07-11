# SC Handbook Reference Traceability

Generated: 2026-06-29
Last updated: 2026-07-10

This file is the project source-traceability register for the static web handbook. It is not a duplicate reference library. Source PDFs remain only in:

`C:\Users\silin\Documents\Codex\Reference`

Use `C:\Users\silin\Documents\Codex\Reference\AGENTS.md` and `REFERENCE_INDEX.md` before treating any source item as checked. Generated reference packs are search aids only; final equations, tables, and values must be visually checked against the source PDF page.

## Document Hygiene

- `SC_HANDBOOK.md` remains the only canonical outline and rule file.
- Source-reference files remain outside this workspace in `C:\Users\silin\Documents\Codex\Reference`.
- 2026-07-02 local text audit checked `SC_HANDBOOK.md`, `REFERENCE_TRACEABILITY.md`, `README.md`, `index.html`, `app.js` and `styles.css` for common mojibake markers; no active mojibake remains in tracked handbook files.
- `wind-region-workpack/` is not present in the current detached audit worktree and is not part of the checked source-traceability register unless explicitly promoted later.

## Reference Folder Snapshot

| Source | Local file | Pack status | Current use |
| --- | --- | --- | --- |
| AS 4100:2020 | `AS4100.pdf` | 233 pages, 227 text pages, 97% coverage | Bolt, weld, beam, axial member |
| AS 3600:2018 incorporating Amd 1 and Amd 2 | `AS3600.pdf` | 273 pages, 269 text pages, 99% coverage | Concrete pad section; Reo Lapping Check |
| AS/NZS 4671:2019 | External licensed Standard / supplier-aligned data table | Nominal bar data transcribed into `research/rebar-lap/rebar-data.csv` | Reo Lapping bar diameter and nominal area |
| AS/NZS 1170.2:2021 | `AS11702-2021.pdf` | 131 pages, 128 text pages, 98% coverage | Wind Site Draft exposure suggestions |
| AS 2159:2009 | `AS2159_2009.pdf` | 97 pages, 97 text pages, 100% coverage | Screw Piles Selector design, installation, serviceability, durability and testing boundary |
| AS 1726:2017 | `AS1726_2017.pdf` | 81 pages, 81 text pages, 100% coverage | Screw Piles Selector geotechnical investigation and ground-model context |
| AS 1101.3:2005 | `11013-2005-pdf.pdf` | 121 pages, 121 text pages, 100% coverage | Weld symbol legend |
| AS/NZS 1554.1:2014 | `4.1a+AS1554-1-2014.pdf` | 125 pages, 125 text pages, 100% coverage | Weld category / WPS / inspection context |
| AS/NZS 1554.3:2014 | `4.2+AS1554-3-2014.pdf` | 78 pages, 0 text pages, OCR needed | Do not use as searchable source until OCR/visual check |
| ASI Simple Connections 2020 | `5+SSC 2020.pdf` | 103 pages, 102 text pages, 99% coverage | Weld metal and parent metal summary tables |
| InfraBuild hot-rolled catalogue 2019 | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | 35 pages, 34 text pages, 97% coverage | UB/UC, PFC, equal angle, rods catalogue basis |
| OneSteel hot-rolled catalogue 8th edition | `Hot-rolled-and-structural-steel-products_8th-edn.pdf` | 35 pages, 34 text pages, 97% coverage | Secondary historical catalogue reference |
| Orrcon National Product Catalogue 2024 | `Orrcon-National-Product-Catalogue-2024.pdf` | 40 pages, 39 text pages, 98% coverage | CHS D/t and grade availability |
| Austube DCT Hollow Sections 2013 | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | 180 pages, 180 text pages, 100% coverage | CHS compression method basis |
| Steel Structures Design Manual to AS 4100 | `Steel Structures Design Manual to AS 4100.pdf` | 243 pages, 243 text pages, 100% coverage | Secondary explanatory reference only |

## Web Tab Source Matrix

| Tab | Item | Source document | Located evidence | Status |
| --- | --- | --- | --- | --- |
| Bolt | Capacity factor `phi` for bolts and ply bearing | `AS4100.pdf` | AS 4100 Table 3.4 visually checked on PDF page 47 | Visual checked |
| Bolt | Bolt shear capacity, N/X planes, `k_rd` and bolted-lap `k_r` | `AS4100.pdf` | AS 4100 Cl. 9.2.2.1 visually checked on PDF pages 131-132 | Visual checked; do not cite bolt `k_r` as a table, unlike welded-lap `k_r` from AS 4100 Table 9.6.3.10(B) |
| Bolt | Bolt tension capacity | `AS4100.pdf` | AS 4100 Cl. 9.2.2.2 visually checked on PDF page 132 | Visual checked |
| Bolt | Combined shear and tension strength check | `AS4100.pdf` | AS 4100 Cl. 9.2.2.3 visually checked on PDF page 132; user screenshot also matched formula form | Visual checked |
| Bolt | TF slip resistance | `AS4100.pdf` | AS 4100 Cl. 9.2.3.1 visually checked on PDF page 134 | Visual checked |
| Bolt | TF combined slip interaction | `AS4100.pdf` | AS 4100 Cl. 9.2.3.3 visually checked on PDF page 135; includes `Ntf = Nti` context | Visual checked |
| Bolt | Minimum bolt tension `Nti` | `AS4100.pdf` | AS 4100 Table 15.2.2.2 visually checked on PDF page 192 for M16/M20/M24/M30/M36: 8.8 = 95/145/210/335/490 kN, 10.9 = 130/205/295/465/680 kN | Visual checked |
| Bolt | Minimum edge distance | `AS4100.pdf` | AS 4100 Table 9.5.2 visually checked on PDF page 138 | Visual checked |
| Weld | Weld capacity factor and direct weld capacity | `AS4100.pdf` | AS 4100 Table 3.4 visually checked on PDF page 47; AS 4100 Cl. 9.6.3.10 visually checked on PDF page 147 | Visual checked |
| Weld | Welded lap reduction `k_r` | `AS4100.pdf` | AS 4100 Table 9.6.3.10(B) visually checked on PDF page 148; table length `l_w` is in metres | Visual checked |
| Weld | Weld metal strengths `f_uw` | `AS4100.pdf`; `5+SSC 2020.pdf` | AS 4100 Table 9.6.3.10(A) visually checked on PDF pages 147-148; ASI Simple Connections 2020 Table 2.14 visually checked on PDF page 19 | Visual checked |
| Weld | Parent metal screen values | `5+SSC 2020.pdf` | ASI Simple Connections 2020 Tables 2.15 and 2.16 visually checked on PDF pages 20-21; Grade 300 flat bar / sections use `f_up = 440 MPa` | Visual checked |
| Weld | Weld symbols arrow side / other side / both sides | `11013-2005-pdf.pdf` | AS 1101.3 Fig. 2.1 visually checked on PDF page 9; AS 1101.3 Cl. 2.3.2.1 to AS 1101.3 Cl. 2.3.2.3 and AS 1101.3 Figs. 2.8 to 2.10 visually checked on PDF pages 14-15 | Visual checked |
| Beam | Section moment capacity `phi Ms` | `AS4100.pdf` | AS 4100 Section 5 / AS 4100 Cl. 5.2 visually checked on PDF page 66 | Visual checked |
| Beam | Web shear capacity `phi Vv` | `AS4100.pdf` | AS 4100 Cl. 5.11.4 and AS 4100 Cl. 5.11.5 visually checked on PDF pages 86-88 | Visual checked |
| Beam | Shear-bending interaction | `AS4100.pdf` | AS 4100 Cl. 5.12 visually checked on PDF page 89, including AS 4100 Cl. 5.12.1, AS 4100 Cl. 5.12.2 and `Vvm = Vv` for the proportioning method | Visual checked |
| Beam | UB/UC catalogue values | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | Universal Beams and Universal Columns visually located on PDF pages 12-15; embedded UB/UC rows checked on 2026-07-02 against OneSteel / InfraBuild Tables 9-12 | Embedded UB/UC rows checked |
| Axial Member | Section compression capacity | `AS4100.pdf` | AS 4100 Cl. 6.2 visually checked on PDF page 100; `Ns = kf Ag fy` confirmed | Visual checked |
| Axial Member | Member buckling reduction | `AS4100.pdf` | AS 4100 Cl. 6.3.3 and AS 4100 Tables 6.3.3(A/B/C) visually checked on PDF pages 103-106 | Visual checked |
| Axial Member | Tension gross yielding / net fracture | `AS4100.pdf` | AS 4100 Cl. 7.2 visually checked on PDF page 112 | Visual checked |
| Axial Member | `k_t` values | `AS4100.pdf` | AS 4100 Table 7.3.2 visually checked on PDF page 113 | Visual checked |
| Axial Member | CHS D/t and grade | `Orrcon-National-Product-Catalogue-2024.pdf` | CHS tables visually checked on PDF pages 10-12; includes 114.3 CHS and C250L0/C350L0 context | Visual checked for source location; current app uses nominal D/t plus formula-derived geometry, not CHS capacity table values |
| Axial Member | CHS compression method | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | Part 6 compression method and CHS capacity table context visually checked on PDF pages 112-117 | Visual checked for method context; table capacities are not embedded in the current quick screen |
| Axial Member | PFC / Equal Angle / Rod catalogue values | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | OneSteel / InfraBuild Tables 15 and 16 for PFC, OneSteel / InfraBuild Tables 19-21 for Equal Angle, OneSteel / InfraBuild Table 3 for Rounds and OneSteel / InfraBuild Table 38 for round-bar strength checked on 2026-07-02 | Embedded PFC / Equal Angle / Rod rows checked |
| Concrete | Stress block and bending section theory | `AS3600.pdf` | AS 3600 Cl. 8.1.3 and AS 3600 Cl. 8.1.5 visually checked on PDF pages 113-114 | Visual checked |
| Concrete | Capacity factor | `AS3600.pdf` | AS 3600 Table 2.2.2 visually checked on PDF pages 38-39 | Visual checked |
| Concrete | One-way shear screen | `AS3600.pdf` | AS 3600 Cl. 8.2.1.9, AS 3600 Cl. 8.2.3 and AS 3600 Cl. 8.2.4 visually checked on PDF pages 118 and 120-122 | Visual checked for quick-screen context; detailed `kv` design remains a visible user assumption |
| Concrete | Reinforcement bar areas | Standard Australian reo table values | N/Y12=110, N/Y16=200, N/Y20=310, N/Y24=450, N/Y28=620, N/Y32=800, N/Y36=1020 mm2; use table areas rather than `pi d^2 / 4` | Checked against common Australian reo table convention; source register should be upgraded to AS/NZS 4671 or manufacturer reo table when added |
| Reo Lapping | Basic tension development length | `AS3600.pdf` | AS 3600 Cl. 13.1.2.2 visually checked on PDF pages 190-191; equation, `k1`, `k2`, `k3`, 65 MPa concrete-strength cap and epoxy/lightweight multipliers confirmed | Visual checked |
| Reo Lapping | Refined tension development length | `AS3600.pdf` | AS 3600 Cl. 13.1.2.3 visually checked on PDF pages 191-192; `K`, `lambda`, `k4`, `k5`, minimum transverse reinforcement and `k3 k4 k5 >= 0.7` confirmed | Visual checked |
| Reo Lapping | Tension lap eligibility and length | `AS3600.pdf` | AS 3600 Cl. 13.2.1 and Cl. 13.2.2 visually checked on PDF pages 196-197; `k7`, wide/narrow equations, `sb <= 3db` treatment, tension-tie restriction and bar-size limit confirmed | Visual checked |
| Reo Lapping | Nominal 500N bar diameter and area | AS/NZS 4671:2019 Table 7.5(A); `research/rebar-lap/rebar-data.csv` | N10 to N50 nominal diameter and area rows recorded; calculation is limited to N10 to N40 | Data register checked; licensed Standard remains governing |
| Reo Lapping | Supplier mass, metres per tonne and product context | InfraBuild *Reinforcing Product Guide* 2023; InfraBuild *Construction Solutions Product Guide* 2021; current InfraBuild Class N product page | Supplier mass and ordering values are stored separately from nominal design area. Live check on 2026-07-10 found N10-N40 on the current page, with N40 on request; N50 remains in the 2021 guide only. | Product reference only; not used in lap calculation. Current supplier page cites an older AS/NZS 4671 edition, so AS/NZS 4671:2019 and project certification remain the material-data control. |
| Reo Lapping | Staggered splice layout guide | `AS3600.pdf` | AS 3600 Figure 13.2.2 visually checked on PDF page 196; 50% staggered splice arrangement shows adjacent splice ends separated by at least `0.3 Lsy.t.lap` | Visual checked; displayed as a detailing guide, not proof of the percentage spliced at every section |
| Reo Lapping | Historical lap table context | OneSteel *Reinforcing Products* / AS 3600:2009-era data table | Historical tabulated lap lengths retained as research context only | Historical only; not embedded as current calculation data |
| Wind Site Draft | Wind region screen | `AS11702-2021.pdf` | AS/NZS 1170.2 Section 3 and Fig. 3.1(A) visually checked on PDF page 37; Tables 3.1(A) and 3.2(A) visually checked on PDF pages 34 and 36 for regional speed / `Md` context | Visual checked for draft coordinate screen only; adopted wind region still requires project review |
| Wind Site Draft | Terrain category definitions and averaging | `AS11702-2021.pdf` | AS/NZS 1170.2 Cl. 4.2 visually checked on PDF page 39; terrain averaging distance `xa` and lag distance `xi` visually checked on PDF page 40 | Visual checked for radial-band draft screen basis only |
| Wind Site Draft | Terrain-height multiplier `Mz,cat` and Region A0 note | `AS11702-2021.pdf` | AS/NZS 1170.2 Table 4.1 and Note 1 visually checked on PDF page 40, including distance-weighted `Mz,cat` averaging context, Region A0 use of `Mz,cat,2` for `z <= 100 m` and `Mz,cat = 1.24` for `100 m < z <= 200 m` | Visual checked for draft screen basis only |
| Wind Site Draft | Topographic multiplier `Mt` and hill-shape multiplier `Mh` | `AS11702-2021.pdf` | AS/NZS 1170.2 Cl. 4.4 visually checked on PDF pages 42-45, including Equations 4.4(1) to 4.4(4), Figs. 4.3 to 4.5 and Table 4.3 | Visual checked for draft suggestion basis only |
| Wind Site Draft | Public terrain evidence resources | OpenStreetMap Overpass API; Overture Maps Buildings; Microsoft Global ML Building Footprints; DEA Land Cover; ABARES CLUM | Resource links are displayed in the Wind Site Draft page as live or future cross-check evidence aids | Draft evidence only; not source verification for adopted `TC` |
| Wind Site Draft | Public elevation evidence resources | Open-Meteo Elevation API; ELVIS / state LiDAR DEM; GA SRTM 1 second DEM; Copernicus DEM | Resource links are displayed in the Wind Site Draft page as live or future cross-check evidence aids | Draft evidence only; not source verification for adopted `Mt` |
| Screw Piles Selector | AS 2159 design, durability and installation boundary | `AS2159_2009.pdf` | Local pack locates definitions and requirements for design action effect, design geotechnical strength, design structural strength, ULS/SLS action effects, pile groups, serviceability movements, steel-pile exposure classification in Cl. 6.5.2 and Tables 6.5.2(A) to 6.5.2(C), durability design in Cl. 6.5.3, installation by screwing, load testing and the dynamic-testing caution for screw piles | Reference context checked for page wording; selector does not calculate AS 2159 geotechnical resistance, structural resistance or durability |
| Screw Piles Selector | AS 1726 ground-model inputs | `AS1726_2017.pdf` | Local pack locates requirements for geotechnical site investigation, geotechnical model development, soil/rock description, groundwater observations and problematic soils including non-engineered fill, organic peat, sensitive clay, expansive soils, liquefiable soils and acid sulfate conditions | Reference context checked for warning parameters; project geotechnical values remain user/supplier inputs |
| Screw Piles Selector | Katana series classes and certificate limitations | `Katana_Australian_CodeMark_Certificate_30096_Rev6_2026.pdf` | CodeMark certificate pack identifies Katana 80 kN, 100 kN, 150 kN and 200 kN screw pile series, AS 2159 / AS 4100 design context, site-testing trigger, very-severe exposure exclusion and non-public Product Statement / Capacity Calculation Worksheet references | Draft preview; series class only, not a row-checked direction-specific resistance table |
| Screw Piles Selector | Katana local lateral and torsion parameters | `Katana_Screw_Lateral_Capacity_Graphs_2025.pdf`; `Katana_Torsional_Capacity_of_Screw_Pile_Paper.pdf`; `Katana_Typical_Pile_Details_Rev_D_2025.pdf`; `University_of_Melbourne_Katana_Pile_Ground_Beam_Report_2022.pdf` | Local packs identify lateral graph context for Katana 80 kN / 150 kN clay and sand cases, lateral dependence on connection rigidity and shaft properties, CHS 76.1 / 88.9 torsional-capacity context and typical pile detail sources | Draft preview; lateral graph values are not embedded and torsion data is warning context only |
| Screw Piles Selector | Katana geometry and expanded series | Katana Screw Pile Performance Guide Rev Z, 01/10/2024, online PDF; not present in local Reference index | Official guide pp. 8 and 12-13 checked for the 40, 80, 100, 150, 200, 250 and 300 kN compression SWL-up-to rows, shaft and helix geometry. The current local CodeMark certificate scope is separately limited to 80, 100, 150 and 200 kN series | Official online guide checked; local Reference pack pending. Values remain reference-only and the guide's stated ground/installation conditions apply |
| Screw Piles Selector | Ideal Foundations screw pier system selection | Ideal Foundations Specifiers Technical Guide v1.2, November 2021, online PDF; not present in local Reference index | Official selection table p. 8 checked for 85, 120, 200, 300 and separate 500 kN rows: 168 x 6.4, 219 x 6.4 and 219 x 8.2 shafts with their corresponding helix/plate options and maximum depths | Official online guide checked; local Reference pack pending. Values are system SWL-up-to ratings, not direction-specific pile resistances |
| Screw Piles Selector | Surefoot micro-pile footing range | Surefoot Indicative Capacity Table V8.5, online PDF; not present in local Reference index | Official indicative table checked for S150 4W, T150, S250 8P, S400 12P and S600 16P maximum recommended ratings and the soil/embedment dependency of gravity and uplift capacity | Official online table checked; local Reference pack pending. Listed as an alternative driven micro-pile footing and excluded from the resistance ratio |
| Screw Piles Selector | StopDigging ground screw sheets | StopDigging AU official product-sheet PDFs; not present in local Reference index | Official product sheets checked for length, outer diameter and separate compression/tensile/lateral values for selected SGP, SGC and SGN ground screw models | Official online sheets checked; local Reference pack pending. Light-duty product values require project applicability review |
| Screw Piles Selector | Ground Screws Australia product families | Ground Screws Australia official product range page; not present in local Reference index | Product family page previously identified OS-Series for poles/signage, FCA-Series for solar and C350 steel / Australian engineering certification context | Source_Not_Verified for resistance; product-family prompt only until supplier resistance table is supplied |
| Screw Piles Selector | Helical Piles Australia / HAI engineered pathway | Helical Piles Australia technical page and HAI Engineering Manual online PDF; not present in local Reference index | Manual context previously captured shaft families, helical plate families, torque correlation and project-design method context | Source_Not_Verified for direct Australian resistance selection; use only as project-designed option |
| Screw Piles Selector | Blade Pile public screw-pile range | Blade Pile official screw-piles web page; not present in local Reference index | Official page checked for round/twin-blade and multi-helix product ranges, 76.1 / 88.9 / 114 mm technical specification rows, larger 141 / 168 / 219 / 273 mm project-based sizes and the typical 76.1 mm residential SWL-up-to benchmark | Official online page checked; local Reference pack pending. The 100 kN figure is reference-only and other rows are geometry prompts |
| Screw Piles Selector | Piletech screw-piling range | Piletech official screw-piling web page; not present in local Reference index | Public page identifies shaft range, helix range, multiple helical flights, installation equipment capacity, single-length installation and deeper project capability | Source_Not_Verified in local Reference folder; no row-specific compression, tension or horizontal resistance embedded |
| Screw Piles Selector | Driven Engineering screw-pile product dimensions | Driven Engineering screw-pile product category and screw/helical pile service pages; not present in local Reference index | Public product rows identify 76.1, 88.9, 114, 168 and 219 mm screw-pile geometries with selected helix diameters/thicknesses and lengths | Source_Not_Verified in local Reference folder; dimensions only, not a resistance table |
| Screw Piles Selector | Keller helical/screw pile technique benchmark | Keller official helical/screw piles technique page; not present in local Reference index | Technique page identifies helical flights selected for ground conditions, final torque over the last metre, typical SWL limits for axial/uplift/lateral actions and load-testing confirmation | Source_Not_Verified in local Reference folder; typical benchmark only, project design controls |
| Screw Piles Selector | Minmetals Helicast source prompt | Minmetals Helicast supplier note referenced by user; not present in local Reference index | Prompt captures cast-helix product-family concept and high-torque enquiry pathway | Source_Not_Verified in local Reference folder; supplier data required before resistance use |
| Screw Piles Selector | Soil and pile-group warning basis | `Pile design and construction practice.pdf`; `pile-foundation-analysis-and-design.pdf`; `Craig's Soil Mechanics.pdf`; `Fifteen years of geotechnical limit state design in Australia.pdf` | Reference packs include pile groups, uplift/lateral loading, installation control, load testing, durability, soil classification, groundwater, settlement, ground movement, cyclic loading and liquefaction topics | Explanatory warning context only |
| Screw Piles Selector | Reference-derived calculation driver display | `AS2159_2009.pdf`; `AS1726_2017.pdf`; `Pile design and construction practice.pdf`; `Craig's Soil Mechanics.pdf`; `Katana_Australian_CodeMark_Certificate_30096_Rev6_2026.pdf`; `Katana_Screw_Lateral_Capacity_Graphs_2025.pdf`; `Katana_Torsional_Capacity_of_Screw_Pile_Paper.pdf` | Local reference audit identifies design action effects and SLS limits, axial shaft/base/helix resistance, uplift below active movement zone, lateral head fixity/displacement, soil strength and groundwater, installation torque/testing, durability exposure, pile groups and SLS movement as the main parameters controlling catalogue acceptance | Explanatory parameter display only; not an AS 2159 design engine or row-checked resistance calculation |
| Screw Piles Selector | Optional rectangular pile-group action distribution | `AS2159_2009.pdf`; `Fifteen years of geotechnical limit state design in Australia.pdf`; `Pile design and construction practice.pdf`; `Craig's Soil Mechanics.pdf`; `Katana_Screw_Lateral_Capacity_Graphs_2025.pdf` | AS 2159 Cl. 3.2.2 requires pile and pile-group design action effects, including applicable eccentricities; Cl. 4.4.3.1 requires group/block geotechnical review; Cl. 4.5 requires movement control; Cl. 5.2.2 requires pile bending and tolerance effects. The displayed equations are a derived rigid-pad equilibrium model, not an AS 2159 resistance method | Symmetric rectangular perimeter/full-grid distribution only: vertical identical piles, equal axial stiffness in compression and tension, equal lateral stiffness, centroidal actions and no pad-soil resistance. The action basis and moment/torsion sign convention are stated. Direct horizontal action and torsional components are combined vectorially at each pile. The page reports maximum compression, tension and resultant horizontal pile actions. Manufacturer values may produce a reference ratio only, using `Q_c,ref`, `Q_t,ref` and `Q_h,ref`; this is not a design acceptance statement. Project comparison values may be compared only when their source is entered and their basis matches the action basis. Combined axial-horizontal interaction is not assessed. No AS 2159 compliance check, group/block resistance, soil-pile lateral analysis, movement analysis, pile bending/tolerance, cap/head connection, durability, installation or test acceptance |

## Remaining Source Gaps / Row-Level Checks

The primary standard formula pages above have been visually checked. These items remain controlled limitations for the handbook:

- Future InfraBuild / OneSteel rows added after 2026-07-02 require row-level numeric checks before being described as checked catalogue data.
- Future PFC / equal angle / rod rows added after 2026-07-02 require row-level numeric checks before being described as checked catalogue data.
- CHS remains a nominal D/t geometry-derived quick screen. Do not describe it as an Austube / Orrcon table-capacity lookup unless the app is changed to embed and row-check table values.
- AS 4100 Table 6.3.3 `alpha_b` values have been visually checked, but non-default option mapping remains project/member-axis dependent.
- AS 3600 one-way shear is kept as a lightweight screen with visible assumptions. It is not a full shear design engine unless `kv`, reinforcement layout and detailing checks are expanded later.
- Wind Site Draft uses public OSM, land-cover, building-footprint and DEM data as draft evidence only. Coordinate-derived wind region, `TC` / `Mz,cat` and `Mt` suggestions are not checked or adopted design values until a project-specific site review confirms the wind region, terrain category, topographic cross-section and data currency.
- Screw Piles Selector currently embeds a geometry-first selector using local Katana references plus Ideal Foundations, Blade Pile, Piletech, Driven Engineering, Keller, Minmetals Helicast, Surefoot, StopDigging, Ground Screws Australia and Helical Piles Australia source prompts. It is not a complete AS 2159 design engine. The UI distinguishes published directional values, compression/system SWL-up-to references, indicative system ratings, typical benchmarks and geometry-only rows. All manufacturer values are reference-only; indicative ratings and typical benchmarks are excluded from the ratio. A project-value comparison requires entered project resistance values, a source reference and a value basis matching the action basis. The Katana Product Statement and Capacity Calculation Worksheet referenced in the CodeMark certificate are not present in the current Reference index. Non-local supplier documents remain pending for local-pack traceability until added and rebuilt.
- AS/NZS 1554.3 currently has 0% text extraction in the generated pack. Treat it as visual-check-only or OCR-needed.

## 2026-06-30 Default Row / Calculation Audit

### InfraBuild UB/UC Default Rows

The current Beam tab defaults were visually checked against `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`.

| App default | Source pages | Checked app values | Status |
| --- | --- | --- | --- |
| 310UB40.4, 300PLUS | OneSteel / InfraBuild Table 9 PDF page 12; OneSteel / InfraBuild Table 10 PDF page 13 | mass 40.4 kg/m; `Ag` 5210 mm2; `d1` 283.6 mm; `tw` 6.1 mm; `Sx` 633 x 10^3 mm3; `Zx` 569 x 10^3 mm3; `fy` 320 MPa; `Zex` 633 x 10^3 mm3; compact; `kf` 0.952 | Row checked |
| 200UC46.2, 300PLUS | OneSteel / InfraBuild Table 11 PDF page 14; OneSteel / InfraBuild Table 12 PDF page 15 | mass 46.2 kg/m; `Ag` 5900 mm2; `d1` 181.4 mm; `tw` 7.3 mm; `Sx` 500 x 10^3 mm3; `Zx` 451 x 10^3 mm3; `fy` 300 MPa; `Zex` 494 x 10^3 mm3; non-compact; `kf` 1.000 | Row checked |

### Default Web Output Check

Default outputs were checked on the local static page at `http://127.0.0.1:8765/?audit=20260630#bolt` and independently recalculated from the app formulas.

| Tab | Default case | Checked output | Status |
| --- | --- | --- | --- |
| Bolt | M24 8.8/S, N plane | shear N 133.4 kN; shear X 186.1 kN; tension 234.4 kN; group shear 133.4 kN; ply bearing 304.1 kN; edge limit 162.4 kN; minimum edge distance 42.0 mm | DOM output matched independent calculation |
| Weld | 6 mm fillet, SP, `fuw` 490 MPa, 100 mm, 2 lines | throat 4.24 mm; weld capacity 199.5 kN; capacity per mm 1.00 kN/mm; parent screen 2.21 kN/mm for Grade 250 plate, 10 mm | DOM output matched independent calculation |
| Beam | 310UB40.4 300PLUS | `Ag` 5210 mm2; `Aw` 1730 mm2; `fy` 320 MPa; `Zex` 633 x 10^3 mm3; `kf` 0.952; `phi Ms` 182.3 kNm; `phi Vv` 298.9 kN | DOM output matched independent calculation |
| Beam | 200UC46.2 300PLUS | `Ag` 5900 mm2; `Aw` 1324 mm2; `fy` 300 MPa; `Zex` 494 x 10^3 mm3; `kf` 1.000; `phi Ms` 133.4 kNm; `phi Vv` 214.5 kN | DOM output matched independent calculation |
| Axial Member | 114.3 x 3.2 CHS, C350L0, `Le` 3.0 m | computed `Ag` 1117 mm2; `r` 39.3 mm; `Le/r` 76.3; `lambda_n` 90.3; `alpha_c` 0.672; section compression 351.8 kN; member compression 236.5 kN; tension 351.8 kN | DOM output matched independent calculation; CHS geometry is formula-derived from `D` and `t`, not a catalogue row value |
| Concrete | 1000 mm strip, 500 mm top pad, top face compression, N16/N20 active mats using table bar areas | `x` 39.5 mm; `Cc` 903.3 kN; `Muo` 339.0 kNm; `phi Muo` 288.2 kNm; `phi` 0.85; `Vuc` 229.1 kN; `dv` 405.0 mm; `phi Vuc` 160.4 kN; residual 0.000 kN | Independent calculation matched app formula; shear remains a visible quick-screen assumption |

## 2026-06-30 Axial Member PFC / EA / Rod Audit

### InfraBuild Default Rows

The current Axial Member non-CHS defaults were visually checked against `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`.

| App default | Source pages | Checked app values | Status |
| --- | --- | --- | --- |
| 150PFC, 300PLUS | OneSteel / InfraBuild Tables 15 and 16 PDF page 17 | mass 17.7 kg/m; `Ag` 2250 mm2; `rmin` 23.9 mm; `fy` 320 MPa; `kf` 1.000 | Row checked |
| 100 x 100 x 10 EA, 300PLUS | OneSteel / InfraBuild Tables 19-21 PDF pages 19-21 | `Ag` 1810 mm2; principal-axis radius `rn = rp = 30.6 mm`; `fy` 320 MPa; `kf` 1.000 | Row checked; this is a principal-axis screen, not a weak-axis or flexural-torsional design |
| Ø24 Rod, 300PLUS | OneSteel / InfraBuild Table 3 PDF page 9; OneSteel / InfraBuild Table 38 PDF page 31 | mass 3.55 kg/m; `Ag = pi d^2 / 4 = 452 mm2`; `r = d / 4 = 6.0 mm`; `fy` 300 MPa for d <= 50 mm; `fu` 440 MPa | Row checked |

### Calculation Compliance Check

The Axial Member formulas remain aligned with the visually checked AS 4100 basis:

- Compression section capacity: `phi Ns = 0.90 kf Ag fy`.
- Member compression capacity: `phi Nc = alpha_c phi Ns`, using AS 4100 Cl. 6.3.3 `lambda_n`, `alpha_a`, `eta`, `xi` and `alpha_c`.
- Tension capacity: `phi Nt = min(phi Ag fy, phi 0.85 kt An fu)`.
- `An`, `kt`, `Le` and non-CHS `alpha_b` remain project inputs; the app warnings correctly keep these out of the checked product-table scope.
- Equal Angle uses the catalogue principal-axis radius `rn = rp` for a quick principal-axis screen. The webpage now states that weak-axis, flexural-torsional buckling, load eccentricity and connection eccentricity are not checked.
- Rod `fy` is now diameter-dependent to match AS/NZS 3679.1 round-bar Table 38: for d <= 50 mm, 300PLUS uses 300 MPa and Grade 350 uses 340 MPa; for 50 < d < 100 mm, 300PLUS uses 290 MPa and Grade 350 uses 330 MPa.

### DOM Output Check

Outputs were checked on the local static page at `http://127.0.0.1:8765/?audit=20260630b#member` and independently recalculated from the app formulas.

| Tab case | Checked output | Status |
| --- | --- | --- |
| 150PFC, 300PLUS, `Le` 3.0 m, `alpha_b` 0.5 | `Le/r` 125.5; `lambda_n` 142.0; `alpha_c` 0.298; section compression 648.0 kN; member compression 192.9 kN; tension 648.0 kN | DOM output matched independent calculation |
| 100 x 100 x 10 EA, 300PLUS, `Le` 3.0 m, `alpha_b` 0.5, `kt` 0.85 | `Le/r` 98.0; `lambda_n` 110.9; `alpha_c` 0.426; section compression 521.3 kN; member compression 222.1 kN; tension 517.9 kN | DOM output matched independent calculation |
| Ø24 Rod, 300PLUS, `Le` 3.0 m, `alpha_b` 0.0 | `Le/r` 500.0; `lambda_n` 547.7; `alpha_c` 0.026; section compression 122.1 kN; member compression 3.1 kN; tension 122.1 kN | DOM output matched independent calculation |
| Ø24 Rod, Grade 350, `Le` 3.0 m, `alpha_b` 0.0 | `fy` 340 MPa; `Le/r` 500.0; `lambda_n` 583.1; `alpha_c` 0.023; section compression 138.4 kN; member compression 3.2 kN; tension 138.4 kN | DOM output matched independent calculation after diameter-dependent `fy` correction |

## 2026-07-02 Embedded Catalogue Row Audit

The embedded steel catalogue rows in `app.js` were checked by a local script against values extracted from `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` / OneSteel hot-rolled tables already located in the Codex reference pack. This was a local file audit, not a live browser rendering pass.

| Area | Rows checked | Source pages / tables | Fields checked | Result |
| --- | ---: | --- | --- | --- |
| Beam UB | 28 | OneSteel / InfraBuild Tables 9 and 10, PDF pages 12-13 | designation order, mass, `Ag`, `Sx`, `Zx`, `d1`, `tw`, 300PLUS and Grade 350 `fy`, `Zex`, compactness and `kf` | No mismatches |
| Beam UC | 13 | OneSteel / InfraBuild Tables 11 and 12, PDF pages 14-15 | designation order, mass, `Ag`, `Sx`, `Zx`, `d1`, `tw`, 300PLUS and Grade 350 `fy`, `Zex`, compactness and `kf` | No mismatches |
| Axial PFC | 10 | OneSteel / InfraBuild Tables 15 and 16, PDF page 17 | designation, mass, `Ag`, `r_min`, `fy`, `tw`, `tf` | No mismatches |
| Axial Equal Angle | 13 selected embedded rows | OneSteel / InfraBuild Tables 19-21, PDF pages 19-21 | leg size, thickness, area, principal-axis radius, 300PLUS and Grade 350 `fy` and `kf` | No mismatches |
| Axial Rod | 26 | OneSteel / InfraBuild Table 3, PDF page 9; Table 38 strength ranges, PDF page 31 | diameter, mass and diameter-dependent strength range basis | No mismatches |

CHS was deliberately not converted to an Austube / Orrcon table-capacity lookup. The current quick-screen strategy is to keep CHS as nominal D/t plus formula-derived `Ag` and `r`, with AS 4100 / Austube method context and visible limitations.

## 2026-07-02 Mobile / Cleanup Sweep

- `styles.css` contains responsive breakpoints for desktop, tablet and phone widths, including narrow-width control sizing, collapsed input grids, compact result grids, and mobile table/card transforms.
- The stylesheet uses stable `.numeric-input` / shared form-control styling so mobile typing and compact reinforcement-table controls are not tied only to native `input[type="number"]` styling.
- A local `390 x 844` browser check at `http://127.0.0.1:8765/index.html?audit=20260702#member` reported no whole-page horizontal overflow (`documentElement.scrollWidth = 375` in the checked viewport). The loaded view exposed Wind Site Draft resource cards, and several long resource/link entries still overflow their card bounds; treat this as the next mobile formatting target if Wind Site Draft is kept in the public page.
- No `wind-region-workpack/` folder exists in the current detached audit worktree.

## Duplicate / Secondary Reference Notes

- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` should be the primary hot-rolled catalogue for current web-table values unless a specific OneSteel 8th edition table is intentionally retained for historical consistency.
- `Hot-rolled-and-structural-steel-products_8th-edn.pdf` and `005-application_attachment-a-2.9.2-onesteel_manufacturing_pty_ltd_0.pdf` are secondary/historical hot-rolled references. Do not mix rows from these with InfraBuild 2019 unless the source is labelled.
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` and `design-capacity-tables-for-structural-steel-hollow-sections.pdf` appear to cover the same hollow-section design-capacity table family. Use one as the cited method source and keep the duplicate as backup unless the content differs.
- `AS/NZS 1554.3` currently has 0% text extraction in the generated pack. Treat it as visual-check-only or OCR-needed.

## Next Row-Level Verification Order

1. Orrcon CHS D/t rows only if the app moves from formula-derived CHS geometry to embedded catalogue rows.
2. Consider whether the Equal Angle quick screen should add an optional weak-axis conservative mode; keep current principal-axis mode clearly labelled unless that scope is expanded.
3. AS 4100 Table 6.3.3 `alpha_b` option mapping for non-default member axes and fabrication routes.
4. AS 3600 `kv` and shear model only if the concrete tab is expanded from warning screen to design check.
5. Wind Site Draft mobile resource-card wrapping, because the 2026-07-02 `390 x 844` local browser check still found long resource/link entries overflowing their cards.
