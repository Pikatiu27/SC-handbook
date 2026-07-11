# Reo Lapping Check - Web Tab Outline

Status: implemented local web-tab contract. Issue status remains `For Review` until the release gates in this document are complete.

Last updated: 2026-07-10

## 1. Name

- Navigation tab: `Reo Lapping`
- Page title: `Reo Lapping Check`
- Subtitle: `AS 3600 tension lap length quick check`

## 2. Purpose

Convert project-confirmed reinforcement, concrete and bar-arrangement inputs into the required tensile lap length for a straight deformed reinforcing bar.

The tab should answer four questions quickly:

1. Is a lapped splice permitted for the selected case?
2. What tensile lap length is required in millimetres?
3. What is the required length as a multiple of bar diameter?
4. Which input or formula branch governs the result?

The tab is a detailing quick check, not a complete reinforced-concrete member design.

## 3. First-release scope

Include:

- AS 3600:2018, incorporating Amendments 1 and 2;
- straight deformed 500N reinforcing bars;
- N10 to N40;
- tensile lap splices;
- contact and non-contact laps;
- wide elements or members;
- narrow elements or members;
- basic tensile development length;
- optional refined tensile development length using `k4` and `k5`;
- top-bar casting-position factor;
- epoxy-coated and lightweight-concrete modifiers;
- default and qualified reduced `k7` branches;
- raw and rounded-up lap length;
- optional comparison with a provided lap length;
- a same-condition lap table for N10 to N40;
- a Figure 13.2.2 stagger guide for 50% staggered splice arrangements;
- a separate collapsed reo data table.

Exclude from the first release:

- bars larger than 40 mm;
- tension-tie members;
- compression laps;
- welded mesh laps;
- bundled bars;
- hooks, cogs and headed bars;
- welded and mechanical splices;
- SENSE 600 and other higher-strength proprietary bar systems;
- seismic plastic-hinge detailing;
- bridge-specific requirements;
- full cover, spacing, crack-control or member-capacity design.

## 4. Intended user workflow

1. Select the bar and concrete strength.
2. Select wide or narrow member geometry.
3. Confirm the casting position.
4. Enter actual cover and clear bar spacing.
5. Select the splice arrangement.
6. Read the required rounded-up lap length.
7. Review the governing formula branch and warnings.
8. Review the stagger guide where no more than 50% of the reinforcement is spliced.
9. Optionally compare a provided lap length.
10. Optionally inspect the same-condition table or reo data.

## 5. Page information architecture

### 5.1 Header

Show:

- page title and subtitle;
- issue status: `For Review` until all validation gates are complete;
- one concise scope statement: `Straight 500N bars in tension only`.

Do not place long exclusions in the header.

### 5.2 Analysis basis

Visible controls:

- `Element / member type`
  - `Wide - slab, wall, flange, band beam or blade column`
  - `Narrow - beam web or column`
- `Lap arrangement`
  - `Contact lap`
  - `Non-contact lap`
- `Development method`
  - `Basic - Clause 13.1.2.2`
  - `Refined - Clause 13.1.2.3`.

Show the refined transverse-reinforcement and pressure inputs only when the refined method is selected. Keep `K`, `lambda`, `k4`, `k5` and the combined reduction limit as derived values.

### 5.3 Bar and concrete

Visible controls:

- `Bar` - N10, N12, N16, N20, N24, N28, N32, N36 or N40;
- `Concrete strength, f'c` - project-confirmed value, limited to the supported AS 3600 range;
- `Casting position`
  - `More than 300 mm concrete cast below bar`
  - `Other position`;
- `Material condition`
  - `Standard-weight, uncoated`
  - `Epoxy-coated bar`
  - `Lightweight concrete`
  - `Epoxy-coated bar in lightweight concrete`.

Derived display values:

- nominal diameter `db`;
- nominal area from AS/NZS 4671;
- reinforcement grade `500N`;
- yield strength `fsy = 500 MPa`;
- `k1` and `k2`.

Do not present derived factors as editable inputs.

### 5.4 Geometry

Visible controls:

- `Clear cover, c`;
- `Clear distance to next parallel bar, a`;
- `Clear distance between lapped bars, sb` for the narrow-member non-contact branch.

Derived display values:

- `cd`;
- `k3`;
- whether `sb` is taken as zero because `sb <= 3db`.

Provide a compact deterministic SVG schematic that changes between:

- wide and narrow geometry;
- contact and non-contact laps.

For this lap-splice page, use Figure 13.2.2 geometry and label only `c`, `a`, `sb` and `db` where applicable. Do not introduce the general-development `c1` dimension into the lap-splice input contract. The schematic is a symbol guide, not a construction drawing.

A future spacing helper may convert a confirmed centre-to-centre bar layout into clear distances. It should not be included until each arrangement has been verified against the AS 3600 figures.

### 5.5 Splice arrangement

Do not ask the user to type `k7` directly.

Provide these choices:

- `Default splice arrangement`
  - use `k7 = 1.25`;
- `Qualified reduced k7 arrangement`
  - require confirmation that reinforcement provided is at least twice reinforcement required;
  - require confirmation that no more than half of the reinforcement is spliced at the section;
  - use `k7 = 1.0` only when both confirmations are true.

Show the derived `k7` value and the reason for it in the calculation steps.

### 5.6 Main result

Primary result:

- `Required tensile lap length`
- display the practical rounded-up value in millimetres.

Secondary result line:

- raw calculated length;
- lap length divided by `db`;
- governing branch;
- wide or narrow member basis;
- applied `k7`.

Result status vocabulary:

- `Calculation available`;
- `Additional detailing review required`;
- `Lap splice not permitted`;
- `Input geometry invalid`.

Do not use a general `PASS` status merely because a lap length was calculated.

### 5.7 Optional provided-lap comparison

Keep this section collapsed by default.

Input:

- `Provided lap length` in millimetres.

Outputs:

- provided / required ratio;
- `Length meets calculated requirement` or `Length is short by X mm`;
- warning that the comparison does not confirm full reinforcement detailing compliance.

### 5.8 Same-condition lap table

Keep the table below the selected-bar result.

Calculate N10 to N40 using the same entered:

- `f'c`;
- casting position;
- member type;
- clear cover and clear distances;
- splice arrangement.

Suggested columns:

- bar designation;
- nominal area;
- development length `Lsy.t`;
- rounded-up lap length;
- lap / `db`;
- governing branch.

Label the table:

`Calculated from the current inputs - not a fixed supplier lap table.`

Highlight the selected bar without changing the calculation order.

### 5.9 Reo data

Keep this section collapsed and visually separate from the lap calculation.

Suggested columns:

- designation;
- nominal diameter;
- AS/NZS 4671 nominal area;
- AS/NZS 4671 nominal mass;
- InfraBuild approximate ordering mass;
- approximate metres per tonne;
- current supplier availability status;
- lap eligibility note.

Clearly separate standard design data from supplier ordering data.

N50 may appear in this reference table with the status:

`Not eligible for a lapped splice under AS 3600 Clause 13.2.1(e).`

### 5.10 Calculation details

Keep this section collapsed by default.

Show, in order:

1. eligibility gate;
2. `k1` from casting position;
3. `k2` from bar diameter;
4. `cd` from entered geometry;
5. `k3`, including its limits;
6. basic tensile development length;
7. AS 3600 lower limit;
8. `k7` branch;
9. wide- or narrow-member lap equation;
10. raw result;
11. practical rounding;
12. Figure 13.2.2 stagger guide.

Every displayed symbol must match the input label and schematic.

### 5.11 Basis and limitations

Keep detailed scope, exclusions and source status in a final collapsed panel.

Include:

- exact AS 3600 edition and amendment status;
- AS 3600 Clause 13.1.2 and Clause 13.2.2 basis;
- AS/NZS 4671 material-data basis;
- confirmation that OneSteel AS 3600:2009 lap tables are historical references only;
- exclusions listed in Section 3 of this outline;
- requirement to verify project drawings, actual reinforcement layout and applicable detailing provisions.

## 6. Calculation branch outline

### 6.1 Eligibility

Stop the calculation and show `Lap splice not permitted` when:

- `db > 40 mm`;
- the member is identified as a tension-tie member;
- the selected product is outside the supported 500N deformed-bar scope.

### 6.2 Basic development length

Calculate the applicable `Lsy.t` from AS 3600 Clause 13.1.2.2. When this value is used in the Clause 13.2.2 lap calculation, do not first force it to the Clause 13.1.2.2 lower limit; the lap equation applies its own lower-limit comparison.

Where the refined method is selected, apply Clause 13.1.2.3 `k4` and `k5` and enforce `k3 k4 k5 >= 0.7`. Keep every refined factor and its supporting inputs visible in the calculation trail.

### 6.3 Wide-member lap

Calculate the tensile lap length from the larger of:

- `k7 Lsy.t`;
- the AS 3600 lap lower limit.

### 6.4 Narrow-member lap

Calculate the tensile lap length from the largest of:

- the AS 3600 lap lower limit;
- `k7 Lsy.t`;
- `Lsy.t + 1.5sb`.

Take `sb = 0` for this branch where AS 3600 permits it because `sb <= 3db`.

### 6.5 Practical rounding

Show both:

- raw calculated result;
- rounded-up result to the next 10 mm.

State that rounding is a calculator presentation convention and not a separate AS 3600 equation.

## 7. Main warnings

Keep visible warnings short and conditional.

Examples:

- `Straight 500N bars in tension only.`
- `Lap splices are not permitted for bars larger than 40 mm.`
- `Tension-tie splices require welded or mechanical means.`
- `Confirm the actual clear spacing and cover at the splice.`
- `Qualified k7 = 1.0 conditions are not confirmed; k7 = 1.25 applied.`
- `Provided length comparison does not confirm full detailing compliance.`

## 8. Data and source rules

- Use AS/NZS 4671 nominal diameter and area for calculations.
- Keep supplier mass and metres-per-tonne values out of the lap formula.
- Do not embed the historical OneSteel AS 3600:2009 lap table as calculation data.
- Store machine-readable bar data in `rebar-data.csv`.
- Keep all project UI and source notes in English.

## 9. Responsive behaviour

Desktop:

- preserve engineering row order;
- show the geometry schematic beside or directly below the geometry inputs;
- keep one primary result card;
- show the same-condition table below the result.

Phone:

- keep the same input order;
- stack each engineering input group;
- keep the required lap result immediately after the inputs;
- collapse calculation details, provided-lap comparison and reo data;
- transform the same-condition table into readable bar cards or a controlled horizontal table;
- keep the schematic compact and labels legible.

## 10. Validation outline

Minimum calculation cases:

1. Wide member, contact lap, `k7 = 1.25`.
2. Wide member, qualified `k7 = 1.0`.
3. Narrow member with `sb <= 3db`.
4. Narrow member with `sb > 3db`.
5. Top-bar casting position with `k1 = 1.3`.
6. `k3` upper-limit case.
7. `k3` lower-limit case.
8. AS 3600 lower-limit governing case.
9. N40 permitted case.
10. N50 blocked case.
11. Invalid cover or spacing case.
12. Provided lap shorter than required.
13. Refined-method `K`, `k4` and `k5` case.
14. Combined `k3 k4 k5 >= 0.7` limiting case.
15. Epoxy, lightweight and combined material multipliers.
16. Figure 13.2.2 stagger guide hidden unless the 50% condition is confirmed.

Minimum interface checks:

- desktop and phone input order;
- conditional `sb` field and reduced-`k7` confirmations;
- no editable-looking derived factors;
- correct selected-bar highlight in the same-condition table;
- calculation details match the primary result;
- source/version text is visible;
- no horizontal overflow at phone width.

## 11. Future extensions

Only consider after the first release is validated:

- compression laps;
- mesh laps;
- bundled bars;
- SENSE 600 and other verified higher-strength bars;
- centre-to-centre spacing helper;
- welded and mechanical splice reference routing;
- project export or print summary.
