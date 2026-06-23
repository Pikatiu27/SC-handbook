# SC Handbook

Static, English-language Australian structural steel quick-reference tools. Open `index.html` directly; no server, package installation or API is required.

## Tools

### Bolt Capacity

- bolt tension capacity;
- bolt shear capacity for N (threads intercept) and X (threads clear) shear planes;
- connected-ply bearing capacity;
- TF slip resistance;
- combined shear and tension interaction.

The primary basis is AS 4100:2020 Table 3.4 and Clauses 9.2.2.1, 9.2.2.2, 9.2.2.4 and 9.2.3.1. Australian drawing callouts use the category, for example `M24 8.8/S`, `M24 8.8/TB` or `M24 8.8/TF`. N and X are separate shear-plane conditions.

### Member Capacity

The member tool contains two product families:

- CHS: common AS/NZS 1163 C250L0 and C350L0 sizes from the Orrcon National Product Catalogue 2024;
- Equal Angle: common 300PLUS and Grade 350 sizes, properties and form factors from the InfraBuild Hot Rolled Products Catalogue, 9th edition.

The axial compression calculation follows AS 4100 Sections 6.2 and 6.3 and the published Austube Mills / Australian Steel Institute *Design Capacity Tables for Structural Steel Hollow Sections*. It reports section compression capacity, member compression capacity, gross-section yielding, slenderness and the member reduction factor.

For Equal Angles, `alpha_b` is deliberately an explicit design input. Confirm it from AS 4100 Table 6.3.3 for the actual axis, member and fabrication condition. The tool uses the published minimum principal radius and does not check connection eccentricity, flexural-torsional buckling, net-section rupture or combined actions.

## Reference files

The working reference folder is outside the published site at `C:\桌面\SC Handbook\reference` and contains:

- `Orrcon-National-Product-Catalogue-2024.pdf`;
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`;
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf`.

These manufacturer publications support product selection and independent table checks. A licensed current copy of AS 4100 remains the controlling design source.

## Verification boundary

This is engineering quick-reference software, not certified design software. Confirm section availability, effective length, restraint, connection effects, actions and all governing limit states for the project before design issue.
