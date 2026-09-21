# Geo66 — material-specific numerical quick references

Local / Unreleased. User requested useful numerical ranges for preliminary foundation checks, with different first-look priorities by material.

## Source and calculation basis

Look (2014), Table 21.17, PDF page 345 / printed page 320 was freshly read and visually checked in the local licensed reference. Bored clay: α = 0.30 fissured / 0.45 non-fissured, with shaft adhesion capped at 100 kPa. Existing AS 1726 consistency-band bounds are multiplied by each factor; displayed whole-kPa approximate intervals are rounded illustrations, not exact classification limits or measured ranges. Hard clay remains capped and is not assigned an invented upper s_u bound.

Sand source factors: loose bored not recommended / driven displacement0.30; medium dense0.10/0.50; dense0.20/0.80; very dense0.30/1.20. Low-displacement driven factors are half the displacement factors. The table calculates f_s = (K_s tan δ)σ′_v at explicit 50/100/200 kPa stress scenarios, rounded to 1 kPa. Default100 is a labelled benchmark, not a site input. Very loose and gravel are not extrapolated. These are uniform-soil estimates; layering and installation qualifications remain visible. The source is estimating guidance, not a current design standard.

Gravel sliding coefficients reuse the two existing FHWA GEC6 Table5-15 rows mentioning gravel, keeping the complete material descriptions and ultimate-factor basis. Rock anchors reuse all six Look Table20.22 lithology rows; intact-rock, reduction, ultimate basis and no pile-socket equivalence are explicit. No other numerical source ranges changed.

## Presentation

Clay leads with s_u, q_a and E_s; Sand with φ′, E_s and q_a; Gravel with φ′, E_s and γ; Rock with UCS and q_a. Material-specific foundation tables are visible without selecting a state. Selected detail remains between the primary overview and quick foundation table. All other parameter rows remain available in detail. The source-backed dataset is unchanged.

## Verification

51 test files pass, including independent shaft arithmetic, invalid stress rejection, clay cap/band checks, no sand-to-gravel transfer and retained rock-bond values. Desktop sand benchmark switch and mobile390 reflow inspected. All four material views checked at 320/768/1280 px with no page horizontal overflow. Selected detail placement and material switching checked; standalone sand benchmark parity checked at 50 kPa. Public build retained 43 allowlisted files with Geo excluded; diff whitespace check passed. Numerical dataset SHA256 remains f988be25b6996a366c82a079dc4ac3761a3718f76054abb43c07058787a37ba4.

## Limits

Conditional estimates are neither allowable resistances nor final-design adopted values. Narrower unsupported material ranges were not invented. Existing engineering acceptance, source currency, WA-source recheck, source-specific publication review and full accessibility gates remain open. No commit or publication.
