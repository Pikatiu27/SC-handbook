# Geo67 — expanded first-look values

Local / Unreleased. User requested a few more numerical ranges in the initial comparison tables.

- Clay: added bored-pile shaft estimates, separately labelled fissured/non-fissured, and dry/saturated unit weight.
- Sand: added bored/driven-displacement shaft stresses and dry/saturated unit weight. The visible effective-stress benchmark governs both overview and supplementary table; default100 kPa is explicitly a benchmark.
- Gravel: added relative-density index bands from existing data.
- Rock: added existing point-load index bands, explicitly distinct from socket/anchor resistance.

No new source range or engineering model was introduced. Geo66 rounded conditional shaft calculations and all source gaps are preserved. No sand values are transferred to gravel.

Checks: Geo tests include overview/query consistency, stress changes and unsupported states. Browser verified the sand very-dense row changes from30/120 kPa at100 kPa effective stress to60/240 kPa at200 kPa. Desktop and390 px phone layouts inspected; all four tabs at320/768/1280 px show no page-level horizontal overflow. Source/release limits from Geo66 remain open; no commit or publication.
