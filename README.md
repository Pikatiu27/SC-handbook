# SC Handbook

Static, English-language engineering lookup handbook with traceable quick-reference calculators. Open `index.html` directly; no server, package installation or API is required.

## Tools

### Bolt Capacity

- bolt tension capacity;
- bolt shear capacity for N (threads intercept) and X (threads clear) shear planes;
- connected-ply bearing, edge tear-out limit and governing ply capacity;
- minimum edge distance check by edge condition;
- TF slip resistance;
- combined shear and tension strength interaction;
- TF slip combined shear and tension serviceability interaction.

The primary basis is AS 4100:2020 Table 3.4 and Clauses 9.1.8, 9.2.2.1, 9.2.2.2, 9.2.2.3, 9.2.2.4, 9.2.3.1, 9.2.3.3 and 9.5.2. The edge check distinguishes hole-centre edge distance `e` from the effective edge distance `a_e` used for edge-limited ply bearing. Australian drawing callouts use the category and shear-plane condition, for example `M24 8.8/S - N plane`, `M24 8.8/TB - X plane` or `M24 8.8/TF - N plane`. TB is a fully tensioned bearing category, not a fixed N or X plane. For grade 10.9 bolts, `k_rd = 0.83` applies where threads intercept the shear plane and `k_rd = 1.00` applies where threads do not intercept the shear plane. The strength combined check uses AS 4100 Clause 9.2.2.3. The TF serviceability slip combined check uses AS 4100 Clause 9.2.3.3 and is a separate check for friction-type connections where slip is limited.

Bolt symbols follow AS 4100: `d_f` is nominal bolt diameter, `A_o` is nominal plain-shank area, `A_c` is minor diameter area, and `A_s` is tensile stress area. M10 and M12 are included for `/S` categories only because AS 4100 Table 15.2.2.2 does not provide minimum bolt tensions below M16.

### Axial Member Capacity

The member tool contains four product families:

- CHS: common AS/NZS 1163 C250L0 and C350L0 sizes from the Orrcon National Product Catalogue 2024;
- Equal Angle: common 300PLUS and Grade 350 sizes, properties and form factors from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition;
- PFC: common 300PLUS Parallel Flange Channel sizes from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition, Tables 15-16, using catalogue gross area, minimum radius of gyration and form factor;
- Rod: common round bar diameters from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition, Table 3 Rounds - Size Availability and Mass, using geometric area and radius. Confirm the actual Australian product grade and availability against the applicable manufacturer catalogue.

The axial compression calculation follows AS 4100 Sections 6.2 and 6.3 and the published Austube Mills / Australian Steel Institute *Design Capacity Tables for Structural Steel Hollow Sections*. The axial tension calculation follows AS 4100 Clauses 7.1 to 7.3 and takes the lesser of gross-section yielding and net-section fracture. It reports section compression capacity, member compression capacity, design tension capacity, the two tension limit states, slenderness and the member reduction factor.

For Equal Angles, PFCs and Rods, `alpha_b` is deliberately an explicit design input. Confirm it from AS 4100 Table 6.3.3 for the actual axis, member and fabrication condition. CHS defaults to `alpha_b = -0.5`, which assumes cold-formed non-stress-relieved CHS; confirm hot-formed or stress-relieved sections separately. PFC defaults to `alpha_b = 0.5` for hot-rolled channels. Enter connection-specific `A_n` and `k_t`; the Equal Angle default is `k_t = 0.85` for the applicable eccentrically connected equal-angle configuration, unequal angles connected by the short leg may require `k_t = 0.75`, and `k_t = 1.0` should be used where force distribution is uniform or otherwise justified. The compression section capacity screen assumes no penetrations or unfilled holes, so `A_n = A_g`. The tool uses the published minimum principal radius for Equal Angles, catalogue `r_min` for PFCs, and catalogue round-bar diameters with geometric properties for Rods. It does not check section/member bending, shear, combined actions, connection capacity, axis-specific PFC buckling, torsional buckling or flexural-torsional buckling.

### Beam Section

The beam tool covers major-axis section moment and web shear capacity for catalogue hot-rolled Universal Beams / Universal Columns and user-entered custom sections:

- selected UB and UC section entries from the OneSteel / InfraBuild Hot Rolled Products Catalogue, 9th edition;
- 300PLUS and Grade 350 section-capacity data where tabulated for UB/UC sections;
- catalogue `d1` and `tw` values used to calculate web shear area `Aw = d1 tw`;
- Custom section mode using user-entered `fy`, `Zex`, `Sx`, `Zx`, `Aw`, compactness, area and mass values;
- gross area, mass, `Sx`, `Zx`, `Zex`, `Aw`, compactness and form factor `kf`;
- design section moment capacity `phi Ms`;
- design section shear capacity `phi Vv`;
- optional design actions `M*` and `V*` and governing section utilisation ratio.

The primary basis is AS 4100:2020 Section 5 for beam section capacity. Moment capacity uses Clause 5.2 with `Ms = fy Ze` and `phi = 0.90`. Web shear capacity is reported as `phi Vv` using the relevant AS 4100 Clause 5.11 web shear provisions with `Aw = d1 tw` for catalogue UB/UC sections; Clause 5.12 is treated as the shear-bending interaction review where bending is present. For catalogue sections, the effective section modulus `Zex`, compactness and `kf` are taken from the OneSteel / InfraBuild catalogue section-capacity table rather than recalculated from plate slenderness in the browser. For custom sections, the user is responsible for the entered section properties, shear area and material/product basis.

The tool is deliberately limited to section capacity. It does not check member moment capacity `Mb`, lateral-torsional buckling, restraint spacing, minor-axis bending, biaxial bending, axial interaction, web bearing, web buckling under concentrated forces, stiffeners, copes, holes, composite action, fire, deflection or vibration. If `V* > 0.60 phi Vv`, the tool flags high shear and requires AS 4100 Clause 5.12 bending-shear interaction review rather than silently treating the unreduced moment capacity as a pass.

### Concrete Pad Moment

The concrete pad tool is a compact AS 3600-style reinforced-concrete flexural section check for a rectangular pad strip:

- section width, top pad depth, optional bottom pad depth and bending direction;
- N-class and legacy Y-bar reinforcement mats with spacing, depth, yield strength and modulus inputs;
- neutral-axis solution, concrete compression force, nominal moment capacity `Muo`, design moment capacity `phi Muo` and `k_uo` warning status;
- pad-on-pad composite-action warning where combined depth is used;
- a small collapsed section-analysis schematic for strain, stress block and resultants.

This is a moment section-capacity view with a one-way shear screen only, not a full footing or slab design check. It does not check punching shear, soil bearing, base-plate or column bearing, development length, anchorage, crack control, deflection, load combinations, interface shear or plain-concrete footing capacity. For an unreinforced pad footing, use a separate AS 3600 Section 20 plain-concrete footing check.

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

The primary basis is AS 4100:2020 Clause 9.6 for welded connections, using `phi R = phi 0.6 f_uw t_t l_w k_r`. AS 4100 Table 3.4 is used for the weld capacity factor: `phi = 0.90` for SP complete penetration butt weld, `phi = 0.80` for SP other fillet weld / incomplete penetration butt weld, and `phi = 0.60` for GP. For an equal-leg fillet weld, `t_t = 0.707s`; the calculated throat is displayed to two decimals while capacity uses the unrounded throat. For CPBW, IPBW and compound weld selections, the tool shows weld-metal throat capacity using the user-entered `a_w`; this is a capacity view only, not a full joint-design check. Weld metal strengths of 430, 490 and 550 MPa follow AS 4100 Table 9.6.3.10, also summarised in ASI *Simple Connections* 2020 Table 2.14. The `k_r` reduction is from AS 4100 Table 9.6.3.10(B) for a welded lap connection and is applied only when that option is selected: `k_r = 1.00` for `l_w <= 1.7 m`, `k_r = 1.10 - 0.06l_w` for `1.7 < l_w <= 8.0 m`, and `k_r = 0.62` for `l_w > 8.0 m`.

The weld symbol legend uses inline SVG examples redrawn from the authorized AS 1101.3:2005 reference, mainly Figures 2.1 and 2.8 to 2.10. It covers common structural-steel fillet and butt/groove symbols for quick recognition, plus CPBW and IPBW callout examples. Use these SVGs only as visual guides; AS 1101.3 governs formal welding-symbol placement, and ASI *Simple Connections* 2020 Figure 2.7 remains the reference for common AS 4100 weld-type terminology. Confirm exact weld symbols, preparations, weld category, WPS and inspection acceptance criteria to AS/NZS 1554.1 on the project drawings.

The weld selection guide is a concise drafting aid for common cases such as shear cleats, gussets, base plates, full-strength splices, partial-strength butt joints, moment connections, tube cap/flange plates, fatigue-sensitive details and site welding. It is scenario-first: each item states the default weld choice, when to use it, when to avoid relying on it, and what still needs checking. ASI *Simple Connections* recommends specifying weld size, weld category and nominal weld metal strength while leaving the welding process selection to the fabricator.

The parent-metal row is a lightweight warning-only per-mm screen using `phi 0.6 f_up t`; it does not change the weld PASS/FAIL status and does not replace tear-out, block shear, net-section rupture, HAZ, edge-distance, eccentric weld group, end return, intermittent weld, fatigue, seismic, lamellar tearing or inspection acceptance checks. Online calculator-style sources are not used as the governing calculation basis unless their formulas can be traced back to AS 4100 or a recognised standard-based design guide.

## Reference files

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
