# SC Handbook

Static, English-language engineering lookup handbook with traceable quick-reference calculators. Open `index.html` directly; no server or package installation is required.

## Tools

### Bolt Capacity

- bolt tension capacity;
- bolt shear capacity for N (threads intercept) and X (threads clear) shear planes;
- local hole-bearing capacity for two connected plies treated as identical or checked separately;
- minimum pitch, general maximum pitch and minimum edge distance checks;
- detailing non-compliance gating for the visible result status;
- TF-only slip resistance with separate serviceability slip actions;
- combined shear and tension strength interaction;
- TF slip combined shear and tension serviceability interaction.

The primary basis is AS 4100 Table 3.4, AS 4100 Cl. 9.1.8, AS 4100 Cl. 9.2.2.1, AS 4100 Cl. 9.2.2.2, AS 4100 Cl. 9.2.2.3, AS 4100 Cl. 9.2.2.4, AS 4100 Cl. 9.2.3.1, AS 4100 Cl. 9.2.3.3, AS 4100 Cl. 9.5.1, AS 4100 Cl. 9.5.2 and AS 4100 Cl. 9.5.3. The edge check distinguishes hole-centre edge distance `e` from the effective edge distance `a_e` used for edge-limited local hole bearing. Bolt-group shear, tension and local hole-bearing capacities assume identical bolts in a concentric connection with equal action per bolt; for total group shear `V*`, `Vi* = V*/n` and the group local hole-bearing limit is `n` times the governing per-bolt value. The two connected plies are explicitly treated as identical or checked separately; in separate mode the lower ply value governs. This is not a complete connected-plate resistance check. Eccentric and non-uniform bolt-force distributions, net-section rupture, block shear and actual tear-out paths are excluded. Australian drawing callouts use the category and shear-plane condition, for example `M24 8.8/S - N plane`, `M24 8.8/TB - X plane` or `M24 8.8/TF - N plane`. TB is a fully tensioned bearing category, not a fixed N or X plane. For grade 10.9 bolts, `k_rd = 0.83` applies where threads intercept the shear plane and `k_rd = 1.00` applies where threads do not intercept the shear plane. The strength combined check uses AS 4100 Cl. 9.2.2.3. The TF serviceability slip combined check uses separately entered slip actions under AS 4100 Cl. 9.2.3.3. Any applicable pitch or minimum edge-distance FAIL changes the visible result status to `NON-COMPLIANT`.

For bolt shear, `k_r` is the bolted-lap reduction factor in AS 4100 Table 9.2.2.1, referenced by AS 4100 Cl. 9.2.2.1. It defaults to 1.0 unless the actual lap connection length `l_j` requires a lower value. It is separate from the welded-lap table.

Bolt symbols follow AS 4100: `d_f` is nominal bolt diameter, `A_o` is nominal plain-shank area, `A_c` is minor diameter area, and `A_s` is tensile stress area. The selected bolt basis reports `Nti` for `/TB` and `/TF` and provides a collapsed M16-M36 lookup; `Nti` is installation preload, not `phi Ntf`. The main page keeps symbol and category definitions in the collapsed calculation basis, and TF slip inputs are shown only for `/TF`. M10 and M12 are included for `/S` categories only because AS 4100 Table 15.2.2.2 does not provide minimum bolt tensions below M16.

### Axial Member Capacity

The member tool contains four product families:

- CHS: common AS/NZS 1163 C250L0 and C350L0 nominal sizes from the Orrcon National Product Catalogue 2024 context, with `Ag` and `r` derived from nominal `D` and `t` geometry rather than embedded manufacturer capacity-table values;
- Equal Angle: common 300PLUS and Grade 350 sizes, properties and form factors from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition, OneSteel / InfraBuild Tables 19-21;
- PFC: common 300PLUS Parallel Flange Channel sizes from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition, OneSteel / InfraBuild Tables 15 and 16, using catalogue gross area, minimum radius of gyration and form factor;
- Rod: common round bar diameters from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition, OneSteel / InfraBuild Table 3 Rounds - Size Availability and Mass and OneSteel / InfraBuild Table 38 round-bar yield-stress ranges, using geometric area and radius. Confirm the actual Australian product grade and availability against the applicable manufacturer catalogue.

The axial compression calculation follows AS 4100 Cl. 6.2 and AS 4100 Cl. 6.3 and the published Austube Mills / Australian Steel Institute *Design Capacity Tables for Structural Steel Hollow Sections*. The axial tension calculation follows AS 4100 Cl. 7.1, AS 4100 Cl. 7.2 and AS 4100 Cl. 7.3 and takes the lesser of gross-section yielding and net-section fracture. It reports section compression capacity, member compression capacity, design tension capacity, the two tension limit states, slenderness and the member reduction factor.

For Equal Angles, PFCs and Rods, `alpha_b` is deliberately an explicit design input. Confirm it from AS 4100 Table 6.3.3 for the actual axis, member and fabrication condition. CHS defaults to `alpha_b = -0.5`, which assumes cold-formed non-stress-relieved CHS; confirm hot-formed or stress-relieved sections separately. PFC defaults to `alpha_b = 0.5` for hot-rolled channels. Enter connection-specific `A_n` and `k_t`; the Equal Angle default is `k_t = 0.85` for the applicable eccentrically connected equal-angle configuration, unequal angles connected by the short leg may require `k_t = 0.75`, and `k_t = 1.0` should be used where force distribution is uniform or otherwise justified. The compression section capacity screen assumes no penetrations or unfilled holes, so `A_n = A_g`. The tool uses the published minimum principal radius for Equal Angles, catalogue `r_min` for PFCs, and catalogue round-bar diameters with geometric properties for Rods. It does not check section/member bending, shear, combined actions, connection capacity, axis-specific PFC buckling, torsional buckling or flexural-torsional buckling.

### Beam Section Capacity

The beam tool covers major-axis section moment and web shear capacity for catalogue hot-rolled Universal Beams / Universal Columns and dimension-generated custom I-sections:

- selected UB and UC section entries from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition;
- 300PLUS and Grade 350 section-capacity data where tabulated for UB/UC sections;
- catalogue `d`, `bf`, `tw`, `tf` and `d1` values used for selected-section display and to calculate web shear area `Aw = d1 tw`;
- Custom section mode using user-entered symmetric I-section dimensions `d`, `bf`, `tw` and `tf`;
- gross area, mass, `Sx`, `Zx`, `Zex`, `Aw`, web slenderness, compactness basis and form factor / modulus basis;
- design section moment capacity `phi Ms`;
- design section shear capacity `phi Vv`;
- folded optional design actions `M*` and `V*` and governing section utilisation ratio.

The primary basis is AS 4100 Section 5 for beam section capacity. Moment capacity uses AS 4100 Cl. 5.2 with `Ms = fy Ze` and `phi = 0.90`. Web shear starts from AS 4100 Cl. 5.11.4, `Vw = 0.6 fy Aw`; catalogue UB/UC sections use `Aw = d1 tw` and a lightweight AS 4100 Cl. 5.11.5 unstiffened-web screen from catalogue `d1/tw`. Concurrent major-axis moment and web shear use AS 4100 Cl. 5.12.3: `Vvm = Vv` where `M* <= 0.75 phi Ms`, otherwise `Vvm = Vv[2.2 - 1.6M*/(phi Ms)]` for `M* <= phi Ms`, followed by `V* <= phi Vvm`. For catalogue sections, the selected-section summary shows section properties only: `d`, `bf`, `tw`, `tf`, `d1`, mass, `Ag`, `Aw`, `Sx`, `Zx`, `Zex`, `fy`, `kf` and compactness after section and grade selection. The effective section modulus `Zex`, compactness and `kf` are taken from the OneSteel / InfraBuild catalogue section-capacity table rather than recalculated from plate slenderness in the browser. For custom symmetric I-sections, `Ag`, `Aw`, mass, `Sx`, `Zx`, web slenderness and shear capacity are generated from dimensions, with `Zex = Zx` used as a conservative elastic moment basis.

The tool is deliberately limited to section capacity. It does not check member moment capacity `Mb`, lateral-torsional buckling, restraint spacing, minor-axis bending, biaxial bending, axial interaction, web bearing, web buckling under concentrated forces, stiffeners, copes, holes, composite action, fire, deflection or vibration.

### Section Properties

The Section Properties tool opens as a catalogue lookup for the checked UB, UC, PFC, CHS, equal-angle and round-bar rows already used by the handbook, with a separate Custom Geometry mode for rectangles, RHS/SHS, solid circles, CHS, symmetric I-sections, equal angles and simplified channels. The result set reports catalogue gross area `Ag` or custom area `A`, mass per metre where available, centroid coordinates, second moments, directional elastic section moduli, plastic section moduli, radii of gyration, and available `J`, `Iw` and `XO`. It also reports `Ix + Iy`, product of inertia, principal properties and unclassified geometric width/thickness ratios where the source or ideal geometry supports them. Orrcon CHS mass is published catalogue data; CHS section properties remain geometry-derived from nominal `D` / `t`. Custom steel mass uses the stated `7850 kg/m³` density. Clear web area `Aw` is used for I-sections and channels, while ideal RHS/SHS reports both horizontal-wall `Awx` and vertical-wall `Awy`; none is an effective shear area. Equal-angle lookup reproduces all 46 Table 19 / Table 21 catalogue rows from `200 x 200 x 26 EA` through `25 x 25 x 3 EA`, using horizontal `n-n`, vertical `p-p`, and principal `x-x` / `y-y` axes at 45 degrees. Each numeric value states its catalogue, derived or unavailable basis. The lookup does not replace missing rolled-section properties with sharp-corner geometry, and section classification, effective properties and design capacity remain outside this tool.

For custom equal angles and channels, each directional plastic modulus uses its own equal-area plastic neutral axis and the first absolute area moment about that axis; the elastic centroid is not substituted for the plastic neutral axis.

The result hierarchy follows the selected section family: gross geometry first, then the applicable reference-axis properties, family-specific constants and principal-axis relationships. Rotationally symmetric sections use one equivalent centroidal-axis column, while equal angles separate centroidal n/p properties from principal x/y catalogue properties.

### Concrete Pad Section

The concrete pad tool is a compact AS 3600:2018 reinforced-concrete flexural and one-way shear section-capacity check for a rectangular pad strip:

- section width, top and bottom pad depths, compression face and reinforcement direction;
- automatic single-pad or composite pad-on-pad section detection from the entered depths;
- N-class reinforcement using current InfraBuild nominal bar areas from N10 to N40, plus legacy Y-bar options for existing drawings;
- automatic directional mat depths from cover, bar stacking and orthogonal bar size, with manual depth override;
- neutral-axis solution, concrete compression force, nominal moment capacity `Muo`, design moment capacity `phi Muo` and `k_uo` warning status;
- optional vertical fitments in the one-way shear capacity calculation;
- a concise pad-on-pad interface warning when both pad depths form the checked section;
- a small collapsed section-analysis schematic for strain, stress block and resultants.

This is a section-capacity view, not a full footing or slab design check. It does not check minimum flexural reinforcement, punching shear, soil bearing, base-plate or column bearing, development length, anchorage, crack control, deflection, load combinations, interface shear or plain-concrete footing capacity. For an unreinforced pad footing, use a separate AS 3600 Section 20 plain-concrete footing check.

Concrete pad capacity factor `phi` is shown for the current pure-bending quick-screen assumption using AS 3600 Table 2.2.2 `k_uo` notation for N-class reinforcement. Legacy Y bars use a conservative review value until the actual bar grade and ductility equivalence are verified. One-way shear uses the AS 3600 Cl. 8.2.4 simplified method only for normal-weight, non-prestressed concrete without axial tension or torsion, with `f'c <= 65 MPa`, reinforcement `fsy <= 500 MPa` and maximum aggregate size at least 10 mm. Detectable out-of-scope inputs return `Not evaluated`. Under AS 3600 Table 2.2.2, shear uses `phi = 0.75` only with verified minimum Class N fitments and no web-crushing limit; otherwise `phi = 0.70`. This remains a one-way shear screen, not a complete concrete shear design.

### Weld Capacity

The weld tool covers a compact weld-type guide plus a throat-capacity view for common structural welds:

- weld type: fillet weld, complete penetration butt weld, incomplete penetration butt weld, or compound weld;
- fillet weld size `s`;
- butt-weld effective throat `a_w` where relevant;
- weld category `SP` or `GP`;
- nominal weld metal tensile strength `f_uw`;
- effective weld length `l_w`;
- number of identical effective weld lines acting together;
- optional parent-metal ply thickness `t` and parent metal grade for a per-mm screening check;
- welded lap connection flag for the AS 4100 `k_r` reduction;
- direct shear action `V*` and utilisation ratio.

The primary basis is AS 4100 Cl. 9.6 for welded connections. Fillet welds use `phi R = phi 0.6 f_uw t_t l_w k_r`, with `t_t = 0.707s`. IPBW uses the same method with the entered project-specified design throat under AS 4100 Cl. 9.6.2.7. CPBW does not use that weld-metal throat equation: AS 4100 Cl. 9.6.2.7 bases capacity on the weaker joined part, so the page reports `Not evaluated`. Compound welds also report `Not evaluated` because AS 4100 Cl. 9.6.5.2 requires the throat from the actual total weld cross-section rather than `a_w + 0.707s`. Weld metal strengths of 430, 490 and 550 MPa follow AS 4100 Table 9.6.3.10(A). The welded-lap `k_r` reduction follows AS 4100 Table 9.6.3.10(B).

For fillet weld and IPBW, the web tab shows `kN/mm per weld line` as the main quick-reference result and total weld capacity as a secondary result. CPBW and compound selections remain reference-only and return no capacity or PASS/FAIL.

The weld symbol legend uses inline SVG examples redrawn from the authorized AS 1101.3:2005 reference, mainly AS 1101.3 Fig. 2.1 and AS 1101.3 Figs. 2.8 to 2.10. It covers common structural-steel fillet and butt/groove symbols for quick recognition, plus CPBW and IPBW callout examples. Use these SVGs only as visual guides; AS 1101.3 governs formal welding-symbol placement, and ASI *Simple Connections* 2020 Fig. 2.7 remains the reference for common AS 4100 weld-type terminology. Confirm exact weld symbols, preparations, weld category, WPS and inspection acceptance criteria to AS/NZS 1554.1 on the project drawings.

The weld selection guide is a concise drafting aid for common cases such as shear cleats, gussets, base plates, full-strength splices, partial-strength butt joints, moment connections, tube cap/flange plates, fatigue-sensitive details and site welding. It is scenario-first: each item states the default weld choice, when to use it, when to avoid relying on it, and what still needs checking. ASI *Simple Connections* recommends specifying weld size, weld category and nominal weld metal strength while leaving the welding process selection to the fabricator.

The parent-metal row is a lightweight warning-only per-mm screen using `phi 0.6 f_up t`; it does not change the weld PASS/FAIL status and does not replace tear-out, block shear, net-section rupture, HAZ, edge-distance, eccentric weld group, end return, intermittent weld, fatigue, seismic, lamellar tearing or inspection acceptance checks. Online calculator-style sources are not used as the governing calculation basis unless their formulas can be traced back to AS 4100 or a recognised standard-based design guide.

## Reference files

The project documentation is split deliberately:

- `SC_HANDBOOK.md` is the only project outline and rulebook.
- `README.md` is this short public summary.
- `REFERENCE_TRACEABILITY.md` is the calculation/source evidence register.

The only working reference folder for this project is:

`C:\Users\silin\Documents\Codex\Reference`

Do not keep duplicate source references in this repository. Relevant standards, manufacturer catalogues, ASI guides, converted Markdown references and technical sheets should all live in the Codex Reference folder.

Relevant source files include:

- `Orrcon-National-Product-Catalogue-2024.pdf`;
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`;
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf`.

These manufacturer publications support product selection and independent table checks. A licensed current copy of AS 4100 remains the controlling design source.

See `REFERENCE_TRACEABILITY.md` for the current source matrix, readable-pack status, duplicate-reference notes and visual-check gaps.

## Verification boundary

This is engineering quick-reference software, not certified design software. Confirm section availability, effective length, restraint, connection effects, actions and all governing limit states for the project before design issue.
