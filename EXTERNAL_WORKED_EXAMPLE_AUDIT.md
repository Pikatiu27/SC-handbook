# External Worked-Example Audit

Audit date: 14 August 2026  
Published target: `SC Handbook - Public beta - Build 0.7.50`  
Published URL: <https://pikatiu27.github.io/SC-handbook/>

## Acceptance rule

A calculation is complete in this register only when a reliable external source states the inputs and result, the same engineering case is reproduced through the applicable webpage controls, the result is compared at stated precision, and the source, assumptions and scope boundary are recorded. Internal unit tests or a restatement of the governing formula are not external worked-example reproductions.

## Completed reproductions

| Page and branch | External case | Published result | Webpage result | Status |
| --- | --- | ---: | ---: | --- |
| Beam Section Capacity - section moment | ASI Sample Worked Problem 1, 460UB82.1, Grade 300PLUS, x-x | `phi Ms = 497 kN.m` | `496.8 kN.m` | Complete; source/display rounding |
| Beam Section Capacity - rolled-web shear and interaction | Design Manual 360UB50.7, `M* = 232 kN.m`, `V* = 72 kN` | `phi Vv = 449 kN`; `phi Vvm = 299.1 kN` | `448.6 kN`; `299.3 kN` | Complete; catalogue precision retained |
| Axial Member Capacity - tension | ASI Sample Worked Problem 6, 100 x 100 x 10 EA, one 18 mm hole, `kt = 0.85` | `phi Nt = 469 kN` | `468.9 kN` | Complete |
| Axial Member Capacity - compression | ASI Sample Worked Problem 4, 250UC72.9, `Le = 4.0 m`, minor axis | `phi Nc = 1915 kN` | `1915.9 kN` | Complete |
| Bolt Capacity - standard shear and tension | ASI TN001, M20 8.8/S, N-plane | `phi Vf = 92.6 kN`; `phi Ntf = 163 kN` | `92.6 kN`; `162.7 kN` | Complete |
| Weld Capacity - SP fillet weld | ASI TN008, 6 mm fillet, `fuw = 490 MPa`, `kr = 1.0` | `0.998 kN/mm` | `1.00 kN/mm` | Complete |
| Concrete Pad Section - pure flexure | Loo and Chowdhury AS 3600:2018 example | `Muo = 346.0 kN.m`; `phi Muo = 294.1 kN.m` | `346.0 kN.m`; `294.1 kN.m` | Complete for pure flexure |
| Reinforcement - straight development | Public AS 3600 worked example | basic `1178 mm`; refined `1120 mm` | basic `1180 mm`; refined `1120 mm` | Complete at adopted precision |
| Section Properties - UB lookup | InfraBuild 460UB82.1 catalogue row | mass `82.1 kg/m`; `Ag = 10500 mm2` | same | Complete as lookup QA |
| Steel Monopole - constant CHS | Austube 508 x 6.4 CHS C350L0 row | mass `79.2 kg/m`; `phi Ms = 408 kN.m` | `79.17 kg/m`; `407.9 kN.m` | Complete for section capacity |

For the Beam shear example, the source rounds the section depth to 356 mm and design moment capacity to 242 kN.m. The page retains catalogue values `d = 355.6 mm` and `phi Ms = 242.19 kN.m`; the small result difference is therefore expected and recorded, not treated as disagreement.

## Remaining gaps

| Public page | Remaining external-example gap |
| --- | --- |
| Bolt Capacity | Combined shear/tension, TF slip, ply bearing, edge distance, net section and block shear |
| Weld Capacity | GP, incomplete-penetration butt weld and `kr < 1.0` branch |
| Axial Member Capacity | Additional section families; flexural-torsional buckling remains excluded |
| Beam Section Capacity | y-y and non-compact/slender section-moment branches; hollow-section shear branches |
| Concrete Pad Section | Non-zero axial load and section boundary cases; not complete member or shear design |
| Reinforcement | Lap, hook/cog and reduced steel-stress branches |
| Steel Monopole | Current-edition tapered/polygonal external benchmark; member analysis remains excluded |
| Screw Piles / Rock Anchor | Product lookup only; no design resistance calculation to reproduce |

Wind Site Draft and local-only experimental tabs are excluded by project instruction.

## Sources

1. Australian Steel Institute, *Steel Structures: Sample Worked Problems to AS 4100*: <https://www.steel.org.au/getattachment/a604184d-0d35-4055-9acd-612dcf0c80b5/Steel-Structures-Sample-Worked-problems-to-AS-4100.pdf>
2. *Steel Structures Design Manual to AS 4100*, 360UB50.7 shear and combined moment-shear example.
3. Australian Steel Institute, TN001 bolt capacity tables: <https://www.steel.org.au/getattachment/a1825eac-9244-4405-b68b-9f9616fdd2f6/Tech-Note-TN001-v5_web.pdf>
4. Australian Steel Institute, TN008 weld capacity tables: <https://www.steel.org.au/Membership/media/Australian-Steel-Institute/Tech%20Notes/TN008-Welding.pdf>
5. InfraBuild, *Hot Rolled Structural Steel Products Catalogue*, 2019: <https://www.infrabuild.com/wp-content/uploads/sites/8/2022/02/Hot20Rolled20Cat_Edition9_2019.pdf>
6. Austube Mills, *Design Capacity Tables for Structural Steel Hollow Sections*: <https://www.austubemills.com.au/resources/application-guide/design-capacity-tables-for-structural-steel-hollow/>
7. Griffith University repository, Loo and Chowdhury, *The New Australian Concrete Structures Standard AS 3600:2018*: <https://research-repository.griffith.edu.au/bitstreams/23852b70-2023-431d-a040-887784b9c790/download>
8. Calcs.com, *Development Length of Reinforced Concrete Bars to AS 3600:2018*: <https://calcs.com/blog/concrete-development-length-as-3600>

## Release boundary

The completed rows support those named branches only. They do not establish that every page or conditional branch has an independent published worked-example reproduction. Missing branches remain listed above and must not be described as verified by external examples.
