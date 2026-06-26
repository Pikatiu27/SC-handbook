# SC Handbook

Static, English-language engineering lookup handbook with traceable quick-reference calculators. Open `index.html` directly; no server, package installation or API is required.

## Tools

### Bolt Capacity

- bolt tension capacity;
- bolt shear capacity for N (threads intercept) and X (threads clear) shear planes;
- connected-ply bearing, edge tear-out limit and governing ply capacity;
- minimum edge distance check by edge condition;
- TF slip resistance;
- combined shear and tension interaction.

The primary basis is AS 4100:2020 Table 3.4 and Clauses 9.2.2.1, 9.2.2.2, 9.2.2.4, 9.2.3.1 and 9.5.2. The edge check distinguishes hole-centre edge distance `e` from the effective edge distance `a_e` used for edge-limited ply bearing. Australian drawing callouts use the category, for example `M24 8.8/S`, `M24 8.8/TB` or `M24 8.8/TF`. N and X are separate shear-plane conditions.

Bolt symbols follow AS 4100: `d_f` is nominal bolt diameter, `A_o` is nominal plain-shank area, `A_c` is minor diameter area, and `A_s` is tensile stress area. M10 and M12 are included for `/S` categories only because AS 4100 Table 15.2.2.2 does not provide minimum bolt tensions below M16.

### Member Capacity

The member tool contains four product families:

- CHS: common AS/NZS 1163 C250L0 and C350L0 sizes from the Orrcon National Product Catalogue 2024;
- Equal Angle: common 300PLUS and Grade 350 sizes, properties and form factors from the InfraBuild Hot Rolled Products Catalogue, 9th edition;
- PFC: common 300PLUS Parallel Flange Channel sizes from the InfraBuild Hot Rolled Products Catalogue, 9th edition, Tables 15-16, using catalogue gross area, minimum radius of gyration and form factor;
- Rod: common round bar diameters from the InfraBuild Hot Rolled Products Catalogue, 9th edition, Table 3 Rounds - Size Availability and Mass, using geometric area and radius. Confirm the actual Australian product grade and availability against the applicable manufacturer catalogue.

The axial compression calculation follows AS 4100 Sections 6.2 and 6.3 and the published Austube Mills / Australian Steel Institute *Design Capacity Tables for Structural Steel Hollow Sections*. The axial tension calculation follows AS 4100 Clauses 7.1 to 7.3 and takes the lesser of gross-section yielding and net-section fracture. It reports section compression capacity, member compression capacity, design tension capacity, the two tension limit states, slenderness and the member reduction factor.

For Equal Angles, PFCs and Rods, `alpha_b` is deliberately an explicit design input. Confirm it from AS 4100 Table 6.3.3 for the actual axis, member and fabrication condition. Enter connection-specific `A_n` and `k_t`; AS 4100 Table 7.3.2 gives `k_t = 0.85` for the applicable eccentrically connected equal-angle configuration. The tool uses the published minimum principal radius for Equal Angles, catalogue `r_min` for PFCs, and catalogue round-bar diameters with geometric properties for Rods. It does not check section/member bending, shear, combined actions, connection capacity, axis-specific PFC buckling, torsional buckling or flexural-torsional buckling.

### Beam Section

The beam tool covers x-axis section moment capacity for common hot-rolled Universal Beams:

- UB section selection from the InfraBuild Hot Rolled Products Catalogue, 9th edition;
- 300PLUS and Grade 350 section-capacity data where tabulated;
- gross area, mass, `Sx`, `Zx`, `Zex`, compactness and form factor `kf`;
- design section moment capacity `phi Ms`;
- elastic yield and plastic limit reference values;
- optional design moment `M*` and utilisation ratio.

The primary basis is AS 4100:2020 Section 5 for beam section capacity, using `phi Ms = phi fy Ze` with `phi = 0.90`. The effective section modulus `Zex`, compactness and `kf` are taken from the InfraBuild catalogue section-capacity table rather than recalculated from plate slenderness in the browser.

The tool is deliberately limited to section capacity. It does not check member moment capacity `Mb`, lateral-torsional buckling, restraint spacing, shear, combined bending and shear, web bearing, web buckling, concentrated loads, copes, holes, composite action, fire or deflection.

### Weld Capacity

The weld tool covers a compact weld-type guide plus a throat-capacity view for common structural welds:

- weld type: fillet weld, complete penetration butt weld, incomplete penetration butt weld, or compound weld;
- fillet weld size `s`;
- butt-weld effective throat `a_w` where relevant;
- weld category `SP` or `GP`;
- nominal weld metal tensile strength `f_uw`;
- effective weld length `l_w`;
- number of effective weld runs;
- optional parent-metal ply thickness `t` and parent metal grade for a per-mm screening check;
- optional reduction factor `k_r`;
- direct shear action `V*` and utilisation ratio.

The primary basis is AS 4100:2020 Clause 9.7 for welded connections, using `phi R = phi 0.6 f_uw t_t l_w` with `phi = 0.80`. For an equal-leg fillet weld, `t_t = 0.707s`; the calculated throat is displayed to two decimals while capacity uses the unrounded throat. For CPBW, IPBW and compound weld selections, the tool shows weld-metal throat capacity using the user-entered `a_w`; this is a capacity view, not a full joint-design check. Weld metal strengths of 430, 490 and 550 MPa follow AS 4100 Table 9.7.3.10(1), also summarised in ASI *Simple Connections* 2020 Table 2.14.

The weld symbol legend uses the Australian-focused Structural Drafter `Weld Symbols` public reference image rather than locally drawn symbol sketches. Use it only as a visual guide; AS 1101.3 governs formal welding-symbol placement, and ASI *Simple Connections* 2020 Figure 2.7 remains the reference for common AS 4100 weld-type terminology. Confirm exact weld symbols, preparations, weld category, WPS, inspection and acceptance criteria to AS/NZS 1554.1 on the project drawings.

The weld selection guide is a concise drafting aid for common cases such as shear cleats, gussets, base plates, full-strength splices, partial-strength butt joints, moment connections, tube cap/flange plates, fatigue-sensitive details and site welding. It is scenario-first: each item states the default weld choice, when to use it, when to avoid relying on it, and what still needs checking. ASI *Simple Connections* recommends specifying weld size, weld category and nominal weld metal strength while leaving the welding process selection to the fabricator.

The parent-metal row is a lightweight per-mm screen using `phi 0.6 f_up t`; it does not replace tear-out, block shear, net-section rupture, HAZ, edge-distance, eccentric weld group, end return, intermittent weld, fatigue, seismic, lamellar tearing or inspection acceptance checks. Online calculator-style sources are not used as the governing calculation basis unless their formulas can be traced back to AS 4100 or a recognised standard-based design guide.

## Reference files

The working reference folder is outside the published site at `C:\桌面\SC Handbook\reference` and contains:

- `Orrcon-National-Product-Catalogue-2024.pdf`;
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`;
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf`.

These manufacturer publications support product selection and independent table checks. A licensed current copy of AS 4100 remains the controlling design source.

## Verification boundary

This is engineering quick-reference software, not certified design software. Confirm section availability, effective length, restraint, connection effects, actions and all governing limit states for the project before design issue.
