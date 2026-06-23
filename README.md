# Bolt Capacity — AS 4100

Static English-language prototype for AS 4100 bolt-capacity lookups. Open `index.html` directly. The primary flow is deliberately bolt-first: select a size and category to see tension and both canonical single-plane shear capacities immediately. Checks that require connection geometry remain collapsed under **Detailed connection checks**.

The interface uses locally bundled Lato font files to match the typography used by SkyCiv's public calculator while remaining fully self-contained.

## Included checks

- bolt tension capacity;
- bolt shear capacity for N (thread-intercepted) and X (plain-shank) shear planes;
- connected-ply bearing capacity, including the effective edge-distance limit;
- TF slip resistance;
- combined shear and tension interaction;
- an explicit compression load-path warning.

## Source basis and limitations

The prototype maps formulas and data from `Tech sheet/AS4100_Bolt_Lookup.xlsx`, which records checks against AS 4100:2020 Table 3.4, Clauses 9.2.2.1, 9.2.2.2, 9.2.2.4, 9.2.3.1–9.2.3.2, and Table 15.2.2.2.

This is not certified design software. Stress areas and minor-diameter areas must be checked against the applicable fastener/thread standard, and all calculations must be independently verified against a licensed copy of the current Standards before design use.

## Public calculator review (22 Jun 2026)

- SkyCiv was used to cross-check the AS 4100:2020 shear equation and the input grouping used by a current public bolt calculator.
- Calcs.com was used to review its bolt-first input/output hierarchy and limit-state grouping.
- Public sites are interaction and secondary cross-check references only. They do not replace the licensed Standard.

During this review, the grade 10.9 ductility factor `k_rd` was applied to the full shear expression in the web app, consistent with the publicly displayed AS 4100:2020 equation. The earlier workbook formulas apply it only to the threaded-plane lookup column; resolve that workbook discrepancy against the licensed Standard before relying on grade 10.9 lookup values.

## Drawing notation

Use the bolt category in the callout, for example `M24 8.8/S`, `M24 8.8/TB` or `M24 8.8/TF`. Do not use `M24 Gr. 8.8 X/S`.

`N` and `X` describe the shear-plane condition, not the bolt category:

- `N`: threads included in the shear plane;
- `X`: threads excluded from the shear plane.

Where the X condition is required by design, state it separately, for example: `M24 8.8/S BOLTS — THREADS EXCLUDED FROM SHEAR PLANE`.
