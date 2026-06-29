# SC Handbook Reference Traceability

Generated: 2026-06-29

This file is the project source-traceability register for the static web handbook. It is not a duplicate reference library. Source PDFs remain only in:

`C:\Users\silin\Documents\Codex\Reference`

Use `C:\Users\silin\Documents\Codex\Reference\AGENTS.md` and `REFERENCE_INDEX.md` before treating any source item as checked. Generated reference packs are search aids only; final equations, tables, and values must be visually checked against the source PDF page.

## Reference Folder Snapshot

| Source | Local file | Pack status | Current use |
| --- | --- | --- | --- |
| AS 4100:2020 | `AS4100.pdf` | 233 pages, 227 text pages, 97% coverage | Bolt, weld, beam, axial member |
| AS 3600:2018 | `AS3600.pdf` | 273 pages, 269 text pages, 99% coverage | Concrete pad section |
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
| Bolt | Capacity factor `phi` for bolts and ply bearing | `AS4100.pdf` | Table 3.4 text is partly noisy; page with bolt capacity factors located around PDF page 47 by search for bolt factors | Text located; visual PDF check required before `Checked` |
| Bolt | Bolt shear capacity, N/X planes, `k_rd` | `AS4100.pdf` | Clause 9.2.2.1 area; exact clause-number search is noisy in generated text | Source present; visual PDF check required |
| Bolt | Bolt tension capacity | `AS4100.pdf` | Clause 9.2.2.2 area; generated text locates nominal tensile capacity of the bolt around PDF page 135 | Source present; visual PDF check required |
| Bolt | Combined shear and tension strength check | `AS4100.pdf` | Clause 9.2.2.3 area; user-provided screenshot already used for formula form | Source present; visual PDF check required before final issue |
| Bolt | TF slip resistance | `AS4100.pdf` | Clause 9.2.3.1 area; generated text around PDF page 135 identifies `Vsf`, `Ntf`, `Nti` context | Source present; visual PDF check required |
| Bolt | TF combined slip interaction | `AS4100.pdf` | Clause 9.2.3.3 area; user-provided screenshot confirms `Ntf = Nti` and interaction form | Source present; visual PDF check required before final issue |
| Bolt | Minimum bolt tension `Nti` | `AS4100.pdf` | Table 15.2.2.2 located around PDF page 179 | Text located; visual table check required for M16/M20/M24/M30/M36 values |
| Bolt | Minimum edge distance | `AS4100.pdf` | Table 9.5.2 located around PDF page 138 | Text located; visual table check required |
| Weld | Weld capacity factor and direct weld capacity | `AS4100.pdf` | Clause 9.6 / Table 3.4 / Table 9.6.3.10 area; generated text locates weld metal and welded lap context around PDF page 147 | Text located; visual PDF check required |
| Weld | Welded lap reduction `k_r` | `AS4100.pdf` | Table 9.6.3.10(B) area expected around weld clause pages; exact search is noisy | Source present; visual PDF check required |
| Weld | Weld metal strengths `f_uw` | `AS4100.pdf`; `5+SSC 2020.pdf` | ASI Simple Connections Table 2.14 located around PDF pages 18-19 | Text located; visual table check required |
| Weld | Parent metal screen values | `5+SSC 2020.pdf` | Tables 2.15 and 2.16 located around PDF pages 19-21 | Text located; visual table check required |
| Weld | Weld symbols arrow side / other side / both sides | `11013-2005-pdf.pdf` | Clauses 2.3.2.1 to 2.3.2.3 and Figures 2.1, 2.8, 2.9, 2.10 located around PDF pages 8-15 | Text located; visual figure check required |
| Beam | Section moment capacity `phi Ms` | `AS4100.pdf` | Section 5 starts around PDF page 66; Clause 5.2 needs direct visual check | Source present; visual PDF check required |
| Beam | Web shear capacity `phi Vv` | `AS4100.pdf` | Web shear capacity text located around PDF pages 33 and 89; use Clause 5.11 for base web shear and Clause 5.12 for shear-bending interaction | Text located; visual PDF check required |
| Beam | Shear-bending interaction | `AS4100.pdf` | User screenshot confirms Clause 5.12, 5.12.1, 5.12.2 and `Vvm = Vv` relationship | Source present; visual PDF check required before final issue |
| Beam | UB/UC catalogue values | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | Universal Beams and Universal Columns located around PDF pages 10-15; 310UB40.4 and 200UC46.2 text appears in catalogue/tolerance pages | Text located; row-by-row table check required |
| Axial Member | Section compression capacity | `AS4100.pdf` | Section 6 starts around PDF page 100 | Source present; visual PDF check required |
| Axial Member | Member buckling reduction | `AS4100.pdf` | Clause 6.3.3 / Table 6.3.3 extraction is noisy; section present around PDF pages 100-106 | Source present; visual PDF check required |
| Axial Member | Tension gross yielding / net fracture | `AS4100.pdf` | Section 7 starts around PDF page 112 | Source present; visual PDF check required |
| Axial Member | `k_t` values | `AS4100.pdf` | Table 7.3.2 extraction is noisy; Section 7 present around PDF page 112 | Source present; visual PDF check required |
| Axial Member | CHS D/t and grade | `Orrcon-National-Product-Catalogue-2024.pdf` | CHS and C350L0 located around PDF pages 10-12; 114.3 CHS located on PDF page 10/12 text | Text located; row-by-row visual table check required |
| Axial Member | CHS compression method | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | CHS, C350 and compression method context located; Part 6 compression listed | Text located; method pages need visual check |
| Axial Member | PFC / Equal Angle / Rod catalogue values | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | Parallel Flange Channels, Equal Angles and Rounds located in catalogue index and pages | Text located; embedded table values need visual row check |
| Concrete | Stress block and bending section theory | `AS3600.pdf` | Rectangular stress block located around PDF page 113; Clause 8.1.5 located around PDF page 114 | Text located; visual PDF check required |
| Concrete | Capacity factor | `AS3600.pdf` | Table 2.2.2 located around PDF pages 38-39 | Text located; visual table check required |
| Concrete | One-way shear screen | `AS3600.pdf` | Clause 8.2 strength of beams in shear located around PDF page 116; `Vuc` notation located around PDF page 117 | Text located; visual PDF check required |

## Current Source Gaps

These items should stay `For Review` until the visual checks are completed:

- AS 4100 Table 3.4 capacity factors used across bolt, weld, beam and axial member.
- AS 4100 Clause 9.2 bolt shear, tension, bearing and TF slip formulas.
- AS 4100 Table 15.2.2.2 preload values row-by-row.
- AS 4100 Table 9.5.2 edge-distance values row-by-row.
- AS 4100 Table 9.6.3.10 and 9.6.3.10(B) weld metal / lap reduction values.
- AS 4100 Clause 5.11 web shear and Clause 5.12 shear-bending interaction.
- AS 4100 Table 6.3.3 `alpha_b` values and Table 7.3.2 `k_t` values.
- InfraBuild / OneSteel UB/UC embedded section values, especially 310UB40.4 and 200UC46.2.
- Orrcon CHS row values used by the app, especially the default CHS.
- AS 3600 stress block, capacity factor and one-way shear assumptions.

## Duplicate / Secondary Reference Notes

- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` should be the primary hot-rolled catalogue for current web-table values unless a specific OneSteel 8th edition table is intentionally retained for historical consistency.
- `Hot-rolled-and-structural-steel-products_8th-edn.pdf` and `005-application_attachment-a-2.9.2-onesteel_manufacturing_pty_ltd_0.pdf` are secondary/historical hot-rolled references. Do not mix rows from these with InfraBuild 2019 unless the source is labelled.
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` and `design-capacity-tables-for-structural-steel-hollow-sections.pdf` appear to cover the same hollow-section design-capacity table family. Use one as the cited method source and keep the duplicate as backup unless the content differs.
- `AS/NZS 1554.3` currently has 0% text extraction in the generated pack. Treat it as visual-check-only or OCR-needed.

## Next Verification Order

1. AS 4100 bolt pages: Table 3.4, 9.2.2.1 to 9.2.2.4, 9.2.3.1, 9.2.3.3, Table 15.2.2.2, Table 9.5.2.
2. AS 4100 weld pages: 9.6, Table 9.6.3.10 and 9.6.3.10(B), plus ASI Simple Connections Tables 2.14 to 2.16.
3. AS 4100 beam pages: 5.2, 5.11, 5.12.
4. AS 4100 axial pages: 6.2, 6.3.3, Table 6.3.3, 7.2, 7.3 and Table 7.3.2.
5. Catalogue values: InfraBuild UB/UC default rows, PFC/EA/Rod rows, and Orrcon CHS default rows.
6. AS 3600 concrete pages: Table 2.2.2, 8.1.3, 8.1.5, 8.2.
