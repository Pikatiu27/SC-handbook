# Reinforcement Development & Lap Lengths - Page Outline and Engineering Contract

Status: vNext implementation contract. Module issue status remains `For Review` until every release gate in Part B is complete.

Last updated: 2026-07-24

The 2026-07-24 terminology and flow revision separates global navigation, design check, bar installation and anchorage method. The lightweight page review moves the reference result ahead of optional refinements, consolidates common assumptions and removes scenario selectors that do not change the calculation. These changes affect presentation and state routing only; they do not change the verified AS 3600 lap/development equations or their clause sequence.

The visible page must follow Part A in the stated order. Equations, state rules and release gates belong to Part B and must not interrupt the primary lookup workflow.

Default presentation is intentionally compact: show only the check, bar size and dimensions needed to obtain the common reference length. Present the result before optional reductions and refinements. Common assumptions, reduction conditions, schedules, source data and formula trails remain folded until requested. No lap schematic is included. For PIR, show only the AS 3600 reference depth and one external-design warning; never present that reference as an installation recommendation.

## Part A - Visible page order

The visible workflow is:

1. `Identity and scope`;
2. `Quick setup`;
3. `Required dimensions`;
4. `Primary reference result`;
5. `Optional engineering adjustments`; and
6. `Calculation details` and `References & limitations`.

Do not insert a schematic, design-record form, qualification checklist or product-manual content into the primary lookup workflow.

### 1. Identity and scope

Show:

- level 1 navigation category: `Foundations`;
- level 2 navigation tab: `Reinforcement`;
- page title: `Reinforcement Development & Lap Lengths`;
- subtitle: `AS 3600 reference for 500N reinforcing bars in tension`;
- issue status: `For Review`;
- concise scope: `N10 to N40 500N deformed bars in tension. Lap, development and anchorage reference checks; product capacity and foundation design excluded.`

The page is a lightweight reinforcement-length aid. It returns an AS 3600 lap where applicable, an AS 3600 cast-in development or standard hook/cog reference, or an expressly labelled AS 3600 reference depth for PIR. It does not collect a qualified product report or perform a site-fit check. The user takes the reference length to the separate product-specific design workflow. The page is not a reinforced-concrete member, AS 5216 product-capacity, interface, pad, pedestal or foundation design.

Do not put the full exclusion list or product-manual content in the header.

#### 1.1 Lightweight design language

Use one neutral page surface and one restrained accent for the primary result. Reserve warning colour for a condition requiring user action. Avoid nested tinted panels, repeated borders and multiple cards with equal emphasis.

Apply these presentation rules:

- one dominant numerical result per active calculation path;
- no more than two visible hierarchy levels before a result;
- one sentence of helper text per group, shown only where it changes a decision;
- compact assumption summaries instead of always-visible default selectors;
- plain read-only text for derived values, not disabled input styling;
- one consistent spacing rhythm between headings, fields and sections;
- no repeated scope statement, clause warning or product-design warning; and
- no decorative status card that repeats the selected check.

Use sentence case throughout. Prefer short engineering labels such as `Design check`, `Bar size`, `Concrete strength`, `Clear cover`, `Clear bar spacing`, `Required lap length` and `AS 3600 reference depth`. Keep formula symbols in the label only where they distinguish the engineering quantity.

### 2. Quick setup

Use one compact first row:

1. `Design check`: always shown; `Lap splice` or `Development at termination`.
2. `Bar size`: always shown.

Then reveal only the routing control required by that selection:

- `Bar installation` for `Development at termination`: `Cast-in reinforcement` or `Post-installed reinforcement (PIR)`;
- `Anchorage method` with the cast-in development inputs: `Straight development`, `Standard hook` or `Standard cog`.

Place all common lap defaults in one folded `Common assumptions` summary. For the default lap, the summary reads: `Not a tension-tie · wide member · contact lap · Basic · other casting position · normal-weight uncoated bar`. Expanding the summary reveals the corresponding selectors. Hide this disclosure for `Development at termination`; its development inputs provide their own independent geometry and material basis.

For PIR, the first visible group is `Design check`, `Bar size` and the secondary `Bar installation` route; show `Stress basis` with the development inputs, not as a separate review workflow. Result status appears only with the result.

`Design check` is the primary calculation switch. `Bar installation` is the secondary route and selects the cast-in or PIR evidence boundary. Project scenarios such as pad extensions or pedestal modifications do not change an AS 3600 expression and must not appear as calculation selectors. Do not mix calculation type, installation method and project scenario in one selector.

Do not combine these as an unexplained `Starter / PIR` calculation basis. A cast-in starter may use an AS 3600 straight-development calculation when its original detailing basis is known, or a separately qualified standard hook/cog route. For PIR, label the numerical output `AS 3600 reference depth - not an installation depth`; it is not an AS 5216 or adhesive capacity result. Direct the user to the separate current product design or manufacturer software without reproducing that report workflow on this page.

The visible decision outcomes are:

| Design check | Bar installation / anchorage method | Primary result |
| --- | --- | --- |
| Lap splice | Not applicable | `LAP` |
| Development at termination | Cast-in / straight | `DEVELOPMENT REFERENCE` |
| Development at termination | Cast-in / standard hook or cog | `HOOK / COG ANCHORAGE REFERENCE` |
| Development at termination | PIR | `AS 3600 REFERENCE` |

Do not show an extension load-path summary, interface-design record or global design status. A single concise note may state that interface transfer and foundation design remain separate project checks.

The selected check must control visible inputs, active calculations, result cards, the formula trail and warnings. Changing design check, bar installation, anchorage method, bar size, calculation basis or any geometry/material input must clear every dependent output and reset confirmations whose evidence may no longer describe the selected case. This includes `k7` qualifications, final-length transverse-reinforcement count, pressure basis and project stress. The only retained invalid-state value is a clearly labelled Basic lap or development reference when a deliberately selected Refined method is incomplete; never present that fallback as the Refined result.

### 3. Required dimensions

Show only inputs required to calculate the selected reference. Interface design remains outside the page.

#### 3.1 New-work lap basis

For the common Basic lap, keep only these inputs visible before the result:

- new-concrete `f'c`;
- actual clear cover `c`; and
- actual adjacent clear spacing `a`.

Show calculated `cd` as one compact read-only line beneath the two geometry fields. It must not look editable.

The folded `Common assumptions` contains:

- the not-a-tension-tie assumption and lap eligibility;
- wide or narrow member classification;
- contact or non-contact arrangement;
- new-work casting position;
- bar-coating / concrete-density condition; and
- Basic or Refined development basis.

Reveal `sb` only for a supported narrow non-contact lap. Do not keep a permanently visible classification panel when all common assumptions remain unchanged.

There is no separate editable `k7 basis` selector. Derive `k7` automatically:

- `k7 = 1.00` only when both reduced-factor confirmations are true;
- `k7 = 1.25` in every other supported case.

Basic is the default. Place `Lap reduction` after the primary result. Keep only the two `k7` qualification conditions in this collapsed panel; its summary must expose the active `k7` and the current potential/adopted reduction in millimetres. The panel must:

- identify `As,provided >= 2As,required` as a member-design confirmation, not an inference from bar count alone;
- identify `No more than 50% spliced at the section` as a separate mandatory condition;
- state only that both conditions are required for `k7 = 1.00`; and
- leave the reduction magnitude in the summary rather than repeating it below the conditions.

Do not include a physical-stagger control or lap drawing. Keep the partial-utilisation and cog/hook boundaries in `References & limitations`, not in the `k7` decision panel.

The hypothetical reduced value is not an approved alternative until both mandatory conditions are confirmed. Keep Refined inputs collapsed until the user deliberately selects Refined. A verified custom transverse-reinforcement arrangement requires a non-negative whole-number `nf`, a positive whole-number `nbs`, non-negative qualifying transverse-reinforcement area and the applicable minimum-area basis. `Sigma Atr = 0` is valid and returns `lambda = 0`, so the Basic result remains available with no `k4` credit. Require the effective-location and final-length confirmations only where the entered data could produce confinement credit. Pressure remains an independent optional credit and may be zero.

The Refined panel is progressively disclosed:

- always show `Confinement basis` and `Verified transverse compressive pressure, rho_p`;
- when `No verified confinement credit` is selected, set `K = 0` and hide the `Sigma Atr,min` basis, `Sigma Atr`, `nf`, `nbs`, effective-location confirmation and final-count confirmation;
- reveal the counting guide and all confinement inputs only for a verified `nf / nbs` arrangement;
- reveal the pressure reference and confirmation only when `p > 0`; and
- present the calculated factors as one compact read-only line: `K · lambda · k4 · k5`.

Do not mix editable project inputs and derived factors in one undifferentiated row. Do not provide a default confinement credit or unexplained arrangement shortcut.

Place one compact, folded counting guide above the custom Refined arrangement only. It must state that `nf` is the number of fitment bars within one longitudinal spacing or pitch that the governing potential splitting crack crosses, not the total fitment-leg count; `nf = 0` is permitted. `nbs` is the number of longitudinal bars being developed or spliced at which that crack can develop, and `Sigma Atr` sums only qualifying transverse-bar area within the displayed candidate Refined length. Use a two-stage result: calculate and display the `Candidate refined length` from the entered arrangement without adopting the credit, then require the user to confirm that the transverse-reinforcement count and any pressure basis apply throughout that candidate length. Only after those confirmations may the candidate become the `Adopted length`. Do not apply `k4 < 1.0` or `k5 < 1.0` to the adopted result before this reconciliation, and clear the relevant confirmation whenever an input can change the candidate length or qualifying evidence. A narrow member must use the beam/column `Sigma Atr,min = 0.25As` basis; the slab/wall zero basis is invalid for that selection.

Pressure credit is evidence-gated. Keep its source and confirmation hidden while `p = 0`. When `p > 0`, show `Pressure source / reference` prefilled with the common basis `Structural analysis · governing ULS load combination`; the user may replace it with the project calculation or model identifier before issue. Require an explicit confirmation that the pressure applies throughout the candidate length and governing splitting plane. A positive pressure value and prefilled source do not activate the credit without that confirmation. Where no verified pressure credit is taken, use `p = 0` and `k5 = 1.0`. Reset the confirmation whenever pressure, candidate length, geometry, bar arrangement or calculation basis changes.

Lay out each Refined panel as one full-width sequence rather than unequal input/result columns: `Confinement inputs` in a three-column desktop grid, then one full-width `Calculated factors` strip, then only the confirmations applicable to the selected confinement and pressure credits. Collapse to one column on phone widths. Avoid empty right-hand panels and keep labels and explanatory text on separate lines.

If a Refined-only input is missing or invalid, identify that field in place with programmatic invalid state and an associated message. Keep the Refined result unavailable, but retain the independently calculated Basic length as `BASIC REFERENCE - REFINED INPUT REQUIRED`. Do not clear the user-facing reference to a dash and do not imply that the Basic value includes Refined credit.

#### 3.2 Existing-concrete reference basis

Show only when the selected task uses reinforcement developed into existing concrete. Keep these inputs independent from the new-work lap inputs:

- existing-side bar origin: cast-in starter or PIR;
- existing-concrete `f'c`;
- casting-position assumption, explicitly labelled as an AS 3600 cast-in reference assumption where the origin is PIR;
- AS 3600 bar-coating / concrete-density condition; do not describe adhesive mortar as an epoxy-coated bar;
- wide or narrow straight-development geometry;
- existing-concrete cover `c`, adjacent clear spacing `a` and end/side distance `c1` where applicable;
- Basic or Refined basis with its own verified confinement inputs;
- full-yield or project steel-stress method;
- design steel stress `sigma_st` when the project-stress method is selected.

If the project-stress method is selected, require only a positive `sigma_st <= fsy`. For straight development, describe this as the design tensile stress in the bar at the assessed section. For a standard hook or cog, describe it as the maximum design tensile stress in the bar being anchored. In both cases require verification against the project calculation before issue. Do not collect a stress-source classification, document reference or separate applicability confirmation on this quick-reference page. Missing or zero stress makes the selected reduced reference unavailable; do not silently substitute the full-yield value as the selected result. The full-yield reference may remain visible separately for context. If `sigma_st > fsy`, stop the reduced reference and issue a project-action/bar-stress review warning. Where actual-stress and Refined reductions are combined, display the reduced-length candidate first and require separate confirmation that the Refined confinement and pressure evidence remains valid throughout that candidate `Lst` length before adoption.

For PIR, the AS 3600 fields establish a reference depth only. They do not represent adhesive or AS 5216 product-design parameters and must not be labelled an installation recommendation. The user selects full-yield stress or enters the project design steel stress; the actual-stress route retains the AS 3600 minimum. Product selection and proprietary reduction remain outside the page.

For cast-in development at termination, keep `Straight development`, `Standard hook` and `Standard cog` as independent anchorage methods. Calculate the underlying development basis using Figure 13.1.2.2: hooked/cogged wide `cd = a/2`; hooked/cogged narrow `cd = min(a/2, c1)`. Before requesting one concise detailing confirmation, calculate and display the applicable qualification requirements: straight extension `max(4db, 70 mm)`; bend diameter to AS 3600 Cl. 17.2.3.3; for a cog, 90-degree geometry, bend diameter not exceeding `8db`, and the same total bar length as a 180-degree hook; and, where `sigma_st > 400 MPa`, a transverse bar at least equal to the anchored-bar diameter placed in contact and extending at least `4db` each side. A standard hook/cog may show the supporting half-development reference only after these requirements are confirmed. Measure that reference from the outside of the hook/cog. Never subtract it from `Llap`, apply 0.5 to a straight-bar geometry result or treat it as a `k7` qualification. If detailing eligibility is not confirmed, show `HOOK / COG DETAILING REQUIRED` rather than a normal calculated status.

#### 3.3 External PIR design handoff

Do not show a `Qualified design report and site fit` form, product selector, report transcription checklist or available-depth comparison on this page. These items do not change the AS 3600 reference length and make the quick-reference workflow appear to be a product-design engine.

For a PIR route, return the clearly labelled `AS 3600 reference depth`, state `Not an installation depth - product design required`, and direct the user to the current manufacturer software or qualified project report. Product selection, AS 5216/product assessment, concrete failure modes, edge/spacing, installation controls and verified available geometry remain external design checks.

Within every Reo input group, place the group heading above the controls. Do not reserve a permanent left description column that compresses the route selectors or four-field engineering rows.

### 4. Primary reference result

Place primary results immediately after the applicable inputs. Do not put a product table or report form between inputs and results.

Use one primary result card for a valid lap result. Do not give intermediate values equal visual weight with the adopted output.

The primary card shows:

- `Adopted lap length`;
- adopted length rounded up to the next 10 mm; and
- one compact metadata line containing the adopted length-to-bar-diameter ratio, governing formula candidate and rounding convention.

Keep `k1`, `k2`, `k3`, raw calculated length, Basic or Refined basis, source clause and full candidate comparison in the collapsed calculation details. Preserve `k7`, governing basis, status and concise assumptions in the result metadata. The raw value remains auditable but must not appear as a second result card or compete with the adopted length.

Do not require a project-document checkbox. Immediately below the lap result, show one concise clause note: `Use only where the project drawings or specification permit the splice · AS 3600 Cl. 13.2.1(a).` The note does not change the numerical result and must not create a second workflow state. Use `AS 3600 REFERENCE` as the result status; do not present the quick reference as project acceptance or an issue-ready design.

The lap and existing-concrete outputs are independent result blocks. If both apply, show them as two clearly labelled blocks.

Use these labels after the page-level tension scope has been established:

- `Required lap length` for the new-work lap;
- `AS 3600 development reference` for an existing cast-in starter;
- `AS 3600 reference depth` for PIR.

For PIR, use one primary result card only:

- `AS 3600 reference depth Le,AS`.

The reference depth uses the selected AS 3600 full-yield or qualified project-stress development basis and is rounded up to the next 10 mm. Use `FULL-YIELD REFERENCE`, `STRESS-BASED REFERENCE` or `INPUT REQUIRED`. State directly once: `Not an installation depth - product design required`. When a project-stress basis is used, show the full-yield reference as a small metadata line within the same card, not as a second card. Do not show a product-status card, TN08 floor, available depth or `PASS`.

Do not add a project-scenario selector, connection summary, interface-design record or additional result card.

Rounding is a presentation convention, not an additional AS 3600 equation. All later length comparisons must use the displayed adopted value.

### 5. Optional engineering adjustments

Place optional adjustments after the primary result in this order:

1. `Lap reduction` - collapsed summary with active `k7` and potential/adopted reduction; and
2. `Refined lap development` - shown only after the user selects Refined in `Common assumptions`.

An optional adjustment may update the primary result, but must not insert a second competing result. Preserve the last valid Basic value as a clearly labelled reference while newly revealed Refined inputs are incomplete.

### 6. External design handoff

After displaying the AS 3600 reference length, stop the page workflow. There is no provided-length comparison, available-depth check, product selector, report transcription form, TN08 calculation or proprietary capacity result.

For cast-in reinforcement, the user completes detailing and verifies the available geometry outside this lookup. For PIR, the user takes the reference depth to the current manufacturer software or qualified project design. The external design must establish the actual product, required embedment, failure modes, edge/spacing and concrete limits, installation controls, project actions and available geometry.

Keep one concise warning beside the PIR result: `AS 3600 reference only - not an installation depth. Complete the product-specific design separately.`

### 7. Calculation details and reference material

Keep secondary material collapsed below all results and optional adjustments. Use no more than two disclosure rows:

1. `Calculation details` - formula trail, candidates, factors and any applicable same-condition lap schedule.
2. `References & limitations` - nominal bar data, product-manual references, source status, assumptions and exclusions.

Do not show four separate full-width accordion cards for schedule, calculation details, manuals and limitations.

#### 7.1 Lap schedule - current input conditions

Show only for a lap path using the Basic method and default `k7 = 1.25`. Calculate N10 to N40 from the active new-work geometry and material inputs. Label the section `Lap schedule - current input conditions` with the qualifier `N10-N40 - Same-size bars - Basic method - k7 = 1.25`.

Every row assumes the same designation on both sides of that lap, such as N20 to N20. All active input conditions remain unchanged between rows except the bar designation. State that this is a calculated comparison from current inputs, not a fixed supplier lap table and not a mixed-size-bar schedule.

Do not propagate Refined confinement data or a qualified `k7 = 1.00` across bar sizes. Hide or mark the schedule unavailable whenever Refined or qualified-reduction conditions are active, because those project confirmations are bar-size and reinforcement-arrangement dependent.

#### 7.2 Reo data and product manuals

Keep nominal design data separate from supplier ordering data:

- AS/NZS 4671:2019 nominal designation, diameter and area are calculation data;
- supplier mass, metres per tonne and availability are product references only;
- N10 to N40 are the only calculator selections;
- N50 may appear only in the reference table as an April 2022 Product Guide on-request item omitted from the current product page and outside the calculator scope.

Describe the local InfraBuild reinforcing guide as `Reinforcing Product Guide, fourth edition; information current April 2022`. Label the 2021 Construction Solutions guide as an older availability reference. Historical OneSteel AS 3600:2009 lap tables are research context only and must not become current calculation inputs.

### 8. References and limitations

Keep the exact Standard editions, source status, assumptions and exclusions in the folded `References & limitations` group. Keep the formula trail in `Calculation details`.

Use separate formula trails for:

- new-work lap development and Cl. 13.2.2 lap;
- standalone full-yield development;
- Cl. 13.1.2.4 project-confirmed stress reduction.

Keep these exclusions explicit: bars larger than 40 mm; tension-tie lap splices; compression laps; mesh and bundled bars; complete hook/cog geometry and detailing design; headed bars, welded and mechanical splices; mixed bar sizes; proprietary high-strength systems; seismic plastic-hinge and bridge-specific detailing; complete cover, spacing, crack-control and member-capacity review; AS 5216 PIR design; adhesive capacity, edge/spacing, splitting, breakout, installation and approval checks; interface transfer; pad and pedestal reinforcement; anchor-cage coordination; soil, bearing and foundation capacity.

For hooks and cogs, explain the boundary rather than merely listing an exclusion: the InfraBuild guide states that a standard hook/cog provides half the tensile development length for that bar end, measured from its outside. The page reports the standard detailing prerequisites and supporting reference; complete member detailing and load-path verification remain external. This is an anchorage rule and must not be presented as permission to subtract length from `Llap`.

For `Existing-to-new concrete`, issue no ordinary Cl. 13.2.2 cast-in lap acceptance conclusion.

## Part B - Engineering contract

### 9. Source hierarchy and calculation scope

Apply this hierarchy:

1. `AS 3600:2018 incorporating Amendments 1 and 2`, Section 13, for cast-in tensile development and lap calculations.
2. `AS/NZS 4671:2019` for nominal reinforcement designation, diameter, area and material basis.
3. `AS 5216:2026` as the external Australian PIR / fastening design boundary. Its licensed full text is not present in the local verified reference set as at 2026-07-19, so this page implements no AS 5216:2026 product-capacity equation.
4. Manufacturer software, qualified project reports and product manuals as external design references only; their inputs and results are not reproduced on this page.

Local `AS3600.pdf` source locations are:

- Cl. 13.1.2.2: PDF page 188;
- Figure 13.1.2.2: PDF page 189;
- Cl. 13.1.2.3: PDF pages 190 to 192;
- Cl. 13.1.2.4: PDF page 192;
- Cl. 13.2.1: PDF pages 195 to 196;
- Cl. 13.2.2 and Figure 13.2.2: PDF page 196.

Supported new-work lap scope is N10 to N40 straight deformed 500N bars in tension; same bar designation on both sides; wide and narrow members; contact and non-contact laps; Basic and deliberately selected Refined bases; selected epoxy-coated and lightweight-concrete multipliers; default and fully qualified reduced `k7`; explicit default-versus-qualified reduction comparison; raw and adopted results; and a Basic/default-`k7` same-condition schedule.

AS 3600 Cl. 13.2.1(a) requires the splice to be required or permitted by the project drawings or specification. Treat this as a concise project-use note, not a numerical length factor or a checkbox workflow. The page returns an `AS 3600 REFERENCE` and must not imply that the splice is project-accepted or issue-ready.

The existing-concrete output is a standalone AS 3600 development or separately qualified standard hook/cog reference. When the origin is PIR, the AS 3600 value is a reference depth, not an installation recommendation, AS 5216 result, adhesive-anchor capacity or acceptance conclusion. The product-design and site-fit states remain entirely external to this page.

### 10. Calculation equations

#### 10.1 Common development factors

For each applicable basis:

- `Lsy.tb,formula = 0.5 k1 k3 fsy db / (k2 sqrt(f'c))`;
- `k1 = 1.3` where more than 300 mm of fresh concrete is cast below the cast-in bar, otherwise `k1 = 1.0`;
- `k2 = (132 - db) / 100`;
- `k3 = 1 - 0.15(cd - db)/db`, limited to `0.7 <= k3 <= 1.0`;
- use 65 MPa in the expression where entered `f'c > 65 MPa` and show a review notice;
- apply selected epoxy-coated-bar `1.5` and lightweight-concrete `1.3` multipliers in the applicable clause sequence.

For lap geometry use `cd = min(a/2, c)`. For narrow straight development include `c1` and use `cd = min(a/2, c1, c)`; use the applicable wide-member basis otherwise.

#### 10.2 New-work lap

For Cl. 13.2.2, calculate the applicable Basic or Refined `Lsy.t` without first forcing it to the Cl. 13.1.2.2 basic-development lower limit, then compare:

- wide: `Llap = max(k7 Lsy.t, 0.058 fsy k1 db)`;
- narrow: `Llap = max(k7 Lsy.t, 0.058 fsy k1 db, Lsy.t + 1.5sb)`.

Where `sb <= 3db`, the supported narrow branch may take `sb = 0` in the third candidate and must state that treatment. Derive `k7` automatically from the two project confirmations.

#### 10.3 Standalone full-yield development reference

Calculate independently from the lap branch:

1. calculate `Lsy.tb,formula`;
2. apply the Cl. 13.1.2.2 basic lower limit;
3. apply the selected material multiplier;
4. apply valid Cl. 13.1.2.3 Refined factors where deliberately selected;
5. retain the complete raw and adopted formula trail.

Do not create this result by applying a lower limit to a lap-mode result.

#### 10.4 Refined basis

Calculate `K`, `lambda`, candidate `k4`, candidate `k5` and the `k3 k4 k5` limit from project-verified inputs. Use `K = 0` if qualifying transverse-reinforcement position is not confirmed. Display the candidate Refined length before asking the user to reconcile the qualifying transverse reinforcement and pressure evidence within that candidate. Until reconciled, retain the Basic adopted length and label the Refined value `CANDIDATE - CONFIRM EVIDENCE`. Require a pressure calculation/source reference and explicit candidate-length confirmation before applying `k5 < 1.0`; a positive pressure number alone does not qualify the credit. Without that evidence use `p = 0` and adopted `k5 = 1.0`.

#### 10.5 Project steel stress

For AS 3600 Cl. 13.1.2.4:

- require a positive design `sigma_st <= fsy`;
- calculate `Lst = Lsy.t sigma_st/fsy`;
- conservatively enforce `12db` for every supported case and state that any clause-specific slab alternative is not implemented;
- do not derive `sigma_st` from `N*/(phi As)` or use a universal `phi = 0.8`;
- if `sigma_st` is missing, leave the selected reduced reference unavailable;
- if `sigma_st > fsy`, stop the reduction and require project-action/bar-stress review.

### 11. State and status contract

The state model is:

| Effective case | Active calculation | Secondary output |
| --- | --- | --- |
| Lap splice | AS 3600 lap | Schedule only for Basic/default `k7` |
| Development at termination - cast-in straight | AS 3600 development reference | None |
| Development at termination - cast-in hook/cog | Independent hook/cog reference and detailing gate | No lap reduction |
| Development at termination - PIR | AS 3600 reference depth | External product-design warning |

Use:

- `CALCULATION AVAILABLE`, `ADDITIONAL DESIGN REQUIRED`, `LAP SPLICE NOT PERMITTED` or `INVALID INPUT` for primary case status;
- `AS 3600 REFERENCE` for a valid lap lookup, accompanied by the Cl. 13.2.1(a) project-use note;
- `REFERENCE CALCULATED` for a valid AS 3600 development reference;
- `REFERENCE UNAVAILABLE - SIGMA REQUIRED` when the reduced-stress method lacks a valid `sigma_st`;
- `HOOK / COG DETAILING REQUIRED` where standard geometry eligibility is not confirmed.

Do not use a general `PASS`, `PROFIS VERIFIED`, `Saving` or `Depth reduction`. Clear all inapplicable outputs and reset dependent confirmations on invalid input and every case change, except for the explicitly labelled Basic reference retained while Refined-only inputs are incomplete.

### 12. Responsive behaviour

Desktop must preserve the lightweight order: identity/scope; quick setup; required dimensions; primary result; optional engineering adjustments; calculation details; references and limitations. The primary result must be visible beside, or immediately below, the required dimensions without scrolling through optional assumptions or refinements. A two-column input/result work area is preferred where the available width supports it.

Phone must retain the same logical order as a single-column stack: quick setup, required dimensions, result, optional adjustments and references. The active handbook tool tab must be automatically scrolled into view. No selector or factor group may create horizontal overflow. Collapse common assumptions, reduction assessment, Refined inputs, schedules, source data and formula trails. Critical statuses and warnings must not rely on colour alone.

Accordion summaries and interactive targets must remain at least 44 px high, expose visible keyboard focus and use a meaningful text label rather than `+` or colour alone. Muted helper text must meet readable contrast at the smallest supported size. Announce changed result status and length programmatically without moving keyboard focus.

### 13. Validation and release gates

Before the module can move beyond `For Review`, verify:

1. AS 3600 source pages and formula sequence.
2. Wide and narrow lap branches.
3. Cl. 13.2.1(a) project-use note remains visible without creating a calculation state or checkbox gate.
4. Contact and non-contact geometry, including both `sb` branches.
5. Automatic `k7 = 1.25` and `k7 = 1.00` selection from the two confirmations.
6. Top-bar `k1`, `k3` limits, Refined candidate-to-adopt reconciliation, valid `K = 0` handling and pressure credit blocked until its candidate-length basis is confirmed.
7. Epoxy-coated-bar, lightweight-concrete and combined multipliers.
8. A lap-lower-limit governing case.
9. Standalone development lower-limit and multiplier ordering.
10. Separate new/existing inputs producing different results.
11. Cast-in-starter and PIR-origin labels and warnings; independent straight and standard hook/cog anchorage routes with no lap reduction.
12. Cl. 13.1.2.4 full-yield, valid reduced-stress, missing/zero `sigma_st`, `12db` floor and `sigma_st > fsy` rejection cases.
13. N40 permitted and N50 absent from calculator-selection cases; N50 remains reference-table-only.
14. Same-condition schedule available only for Basic/default `k7`, and unavailable for Refined or qualified `k7`.
15. Reduction comparison for cases where `k7` governs, the lap lower limit governs and the narrow-gap candidate governs.
16. Every design-check and installation branch, without an extension summary or interface-design workflow.
17. Invalid-input and path-switch stale-result clearing, including dependent confirmation resets and the Refined-only Basic reference exception.
18. PIR routes stop at an expressly labelled AS 3600 reference depth and external-design warning; no product, report, site-fit, available-depth or TN08 workflow is shown.
19. Formula trails match every visible primary result.
20. Default Basic lap shows only quick setup, `f'c`, `c`, `a`, derived `cd` and the primary result before optional adjustments.
21. Refined with `No verified confinement credit` hides non-applicable confinement fields and presents factors as one read-only line; verified custom arrangements reveal only evidence capable of changing the result.
22. PIR shows one reference-depth card, one product-design warning and any full-yield comparison as secondary metadata rather than a second card.
23. Secondary content uses no more than `Calculation details` and `References & limitations` disclosures.
24. No editable-looking derived value, active mobile tool visible, meaningful focus indication and no horizontal overflow at desktop or phone widths.

Keep pure length logic in `reo-calculation.js` and run `node tests/reo-lapping.test.js` before release.

### 14. Future extensions

Only consider after the contract is validated:

- compression laps;
- mesh and bundled-bar rules;
- verified mixed-size lap rules;
- verified higher-strength reinforcement;
- centre-to-centre spacing helper;
- welded/mechanical splice reference routing;
- project export or print summary.
