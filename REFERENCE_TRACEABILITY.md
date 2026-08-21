# SC Handbook Reference Traceability

Generated: 2026-06-29
Last updated: 2026-08-21

This file is the project source-traceability register for the static web handbook. It is not a duplicate reference library. Source PDFs remain only in:

`%USERPROFILE%\Documents\Codex\Reference`

Use `%USERPROFILE%\Documents\Codex\Reference\AGENTS.md` and `REFERENCE_INDEX.md` before treating any source item as checked. Generated reference packs are search aids only; final equations, tables, and values must be visually checked against the source PDF page.

## Build 0.7.69 - Axial catalogue and material-flow completion - 2026-08-21

- Expanded Axial Member to the accepted shared UB, UC, PFC, CHS, RHS, SHS, Equal Angle and Round Bar catalogue directory while retaining `Custom / Built-up` as a verified-property path.
- Made catalogue `fy` and `fu` editable. An `fy` override recalculates `Ae`, `kf = Ae/Ag` and the applicable `alpha_b` branch; an `fu`-only override leaves compression factors unchanged.
- Reconciled published catalogue form factors against AS 4100 Cl. 6.2.2 to AS 4100 Cl. 6.2.4 and added the form-factor derivation to the visible calculation trace.
- Compact selected-member layout and corrected UB/UC drawing bounds were checked at desktop and 390 px widths with no horizontal overflow.
- Full regression, JavaScript syntax and public-release contract checks passed before release.

## Build 0.7.68 - Weld symbol and calculation-flow correction - 2026-08-21

- Updated the Weld tab and canonical outline to AS 1101.3:2026 source-based symbol conventions, including the two-line square butt-weld symbol and the backing-run arch opposite the butt-weld symbol.
- Kept the legend to 12 common examples and labelled all SVGs as schematic, not-to-scale redraws rather than exact reproductions of the Standard figures.
- Standardised the IPBW input to specified design throat `t_t`, removed the project abbreviation `CFW` from the default designation and removed the unsourced maximum on effective weld lines.
- Negative direct design action now reports `Invalid design action`, clears utilisation and cannot produce PASS / FAIL.
- The result boundary now states that AS 4100 Cls. 9.6.3.2 and 9.6.3.3 minimum and maximum fillet-weld size requirements are not evaluated by the current input set.
- Full local regression, JavaScript syntax, desktop rendering and 390 px / 320 px responsive checks passed before release.

## Document Hygiene

- `SC_HANDBOOK.md` remains the only canonical outline and rule file.
- Source-reference files remain outside this workspace in `%USERPROFILE%\Documents\Codex\Reference`.
- 2026-07-02 local text audit checked `SC_HANDBOOK.md`, `REFERENCE_TRACEABILITY.md`, `README.md`, `index.html`, `app.js` and `styles.css` for common mojibake markers; no active mojibake remains in tracked handbook files.
- `wind-region-workpack/` is not present in the current detached audit worktree and is not part of the checked source-traceability register unless explicitly promoted later.

## Calculation Contract Register

`SC_HANDBOOK.md` Section 6.2 defines the canonical calculation contract. Every new or materially changed governing calculation must receive a stable `Calculation_ID` before it is described as checked. Existing evidence sections in this file remain valid; assign and consolidate stable IDs when each legacy calculation is next audited or changed rather than inventing IDs without rechecking the source and implementation.

Use one record per governing capacity, interaction, utilisation, action-distribution or screening equation. Do not combine materially different limit states or branches under one record merely because they appear on the same result card.

Required calculation record:

| Field | Required content |
| --- | --- |
| `Calculation_ID` | Stable topic-result identifier, for example `BOLT-SHEAR-01` |
| Tab / output | Visible tool and governing result label |
| Engineering question | Exact question answered by the result |
| Result type | Nominal, design, utilisation, distribution, published value, selector or screen |
| Limit state / value basis | ULS, SLS, manufacturer-published basis or project-defined comparison basis |
| Governing source | Document title, edition, amendment status, clause/table/figure and PDF page |
| Evidence class | `Normative`, `Catalogue`, `Interpretive`, `Worked example`, `Derived`, `Project input`, or `Source_Not_Verified` |
| Applicability | Material, grade, product form, geometry, fabrication, action and method conditions |
| Equation / branch | Governing expression plus table selection, threshold, `min`, `max` or interaction logic |
| Symbol / unit map | Source symbol, implementation variable, visible notation, internal unit and display unit |
| Defaults / overrides | Source of defaults, override permission and post-override status |
| Exclusions | Limit states, actions, detailing or project checks not evaluated |
| Implementation owner | File and function/module responsible for the calculation |
| Verification evidence | Test IDs, independent method, result difference, tolerance and browser/build checked |
| Status | `Draft`, `For Review`, `Checked`, `Superseded`, `Do_Not_Use`, or `Source_Not_Verified` |
| Checked record | Checked date, reviewer status and unresolved source or interpretation gap |

Required verification-case record:

| Field | Required content |
| --- | --- |
| `Test_ID` | Stable case identifier linked to one or more `Calculation_ID` values |
| Case type | Common, independent, branch, boundary, invalid, out-of-scope, invariant or regression |
| Input set | Unrounded values and units sufficient to reproduce the case |
| Expected result | Independently calculated value or required status |
| Browser / workbook result | Value or status produced by the implementation |
| Difference | Absolute and/or relative difference as appropriate |
| Tolerance | Reasoned acceptance tolerance based on lookup precision, arithmetic or iterative method |
| Evidence method | Hand calculation, separate script, source example or independent reconstruction |
| Build / commit | Exact implementation version checked |
| Checked date / status | Date and `Pass`, `Fail`, `Blocked`, or `Source_Not_Verified` |

Calculation-record rules:

- The independent evidence method must not call or copy the production calculation function.
- Exact catalogue lookups require exact row agreement after stated unit conversion; do not hide a wrong row behind a percentage tolerance.
- Governing comparisons use unrounded values. Display rounding is checked separately and must not change the selected branch or result status.
- Record every active formula branch and the relevant threshold cases, not only the default page state.
- A source edition, formula, factor, default or branch change triggers reverification of every affected `Calculation_ID`.
- Detailed evidence stays in this file. The visible page retains only the concise basis, critical assumption, status and limitation required for quick engineering use.

## Verification and Worked-Example Reproduction Procedure

This section is the working implementation record for `SC_HANDBOOK.md` Section 6.2.11. It converts the calculation contract into repeatable evidence without expanding the visible handbook into a report or full design engine.

### Current Migration Status

The active calculation register below now assigns stable IDs to every governing calculation or selector result. Existing sections retain useful source-page checks, catalogue-row checks, default-output checks and historical audit notes. A result remains `For Review` or `Draft` until its linked records complete the applicable source, independent, branch, boundary, state and browser evidence matrix.

Therefore:

- preserve the existing evidence;
- assign stable IDs only when the affected formula and implementation are actively rechecked;
- do not mark a legacy calculation `Checked` under the new contract merely by renaming old notes;
- migrate one calculation family at a time and link every accepted claim to positive numerical evidence;
- keep failed, blocked and source-unverified cases visible until resolved.

### Active Calculation Contract Register

This register is the authoritative ID map. It identifies the claim and evidence owner without expanding the visible page. `For Review` means the source/formula has useful evidence but the complete Section 6.2.11 matrix is not yet closed. `Draft` means product or project-source verification remains incomplete.

| Calculation_ID / Selector_ID | Tab / governing result | Governing basis | Implementation owner | Current evidence / status |
| --- | --- | --- | --- | --- |
| `BOLT-SHEAR-01` | Bolt / N-plane, X-plane and group design shear capacity | AS 4100 Cl. 9.2.2.1; AS 4100 Table 9.2.2.1; AS 4100 Table 3.4 | `bolt-capacity.js`; `app.js` `calculateBolt()` | Independent regression and source-page checks; For Review |
| `BOLT-TENSION-01` | Bolt / design tensile capacity | AS 4100 Cl. 9.2.2.2; AS 4100 Table 3.4 | `bolt-capacity.js`; `app.js` `calculateBolt()` | Independent regression and source-page checks; For Review |
| `BOLT-SLIP-01` | Bolt / TF serviceability slip resistance | AS 4100 Cl. 9.2.3.1; AS 4100 Table 15.2.2.2 | `bolt-capacity.js`; `app.js` `calculateBolt()` | Branch regression and source-page checks; For Review |
| `BOLT-SLIP-INTERACTION-01` | Bolt / TF serviceability shear-tension interaction | AS 4100 Cl. 9.2.3.3 | `app.js` `calculateBolt()` | Formula trace and browser default; For Review |
| `BOLT-BEARING-01` | Bolt / connected-ply full-bearing and entered-edge-distance limits | AS 4100 Cl. 9.2.2.4 | `app.js` `calculateConnectedPlyIntegrity()` | Two-ply branch checks; governing geometry remains user-confirmed; For Review |
| `BOLT-DETAILING-01` | Bolt / pitch and edge-distance warning state | AS 4100 Cl. 9.5.1 to Cl. 9.5.3; AS 4100 Table 9.5.2 | `app.js` `calculateBolt()` | Warning-state regression; For Review |
| `BOLT-PLY-TENSION-01` | Bolt / connected-ply design section tension capacity | AS 4100 Cl. 9.1.9(b); AS 4100 Cl. 7.2 | `bolt-integrity.js`; `app.js` | Formal record below; For Review |
| `BOLT-BLOCK-SHEAR-01` | Bolt / connected-ply block shear capacity | AS 4100 Cl. 9.1.9(e) | `bolt-integrity.js`; `app.js` | Formal record and worked example below; For Review |
| `WELD-FILLET-01` | Weld / fillet and IPBW throat capacity | AS 4100 Cl. 9.6.2.7; AS 4100 Cl. 9.6.3.5; AS 4100 Cl. 9.6.3.10; AS 4100 Table 3.4 | `weld-capacity.js`; `app.js` `calculateWeld()` | `AUD-WELD-DEFAULT-01`; `AUD-WELD-IPBW-01`; `AUD-WELD-INPUT-02`; `PUB-WELD-9413-01`; For Review |
| `WELD-LAP-KR-01` | Weld / welded-lap reduction | AS 4100 Table 9.6.3.10(B) | `weld-capacity.js` `lapReduction()`; `app.js` | `AUD-WELD-KR-BOUNDARY-01`; For Review |
| `WELD-PARENT-SCREEN-01` | Weld / warning-only parent-metal per-mm screen | Derived warning aid from AS 4100 member resistance context | `weld-capacity.js` `parentMetalScreen()`; `app.js` `calculateWeld()` | `AUD-WELD-PARENT-01`; explicitly non-governing; For Review |
| `SECTION-CATALOGUE-01` | Section Properties / published catalogue lookup | Exact cited manufacturer row | `section-catalogue.js`; source data modules | `AUD-SECTION-SOURCE-01`, row and DOM regression; Draft only where a row is not traced |
| `SECTION-GEOMETRY-01` | Section Properties / entered or catalogue-linked ideal geometry | Closed-form geometric identities | `section-geometry.js`; `app.js` | `AUD-SECTION-CHS-01`; source and geometry regression; For Review |
| `SECTION-MATERIAL-01` | Section Properties / material strength and constants lookup | AS/NZS 3679.1 Tables 14 and 15; AS/NZS 1163; AS 4100 Cl. 2.2.4 | `steel-materials.js`; `app.js` | Boundary, material and DOM regression; For Review |
| `AXIAL-SECTION-COMP-01` | Axial / design section compression capacity | AS 4100 Cl. 6.2 | `app.js` `calculateMember()` | Formula trace and regression; For Review |
| `AXIAL-FORM-FACTOR-01` | Axial / effective-area form factor for catalogue sections and strength overrides | AS 4100 Cl. 6.2.2 to Cl. 6.2.4; AS 4100 Table 6.2.4 | `member-form-factor.js`; `app.js` `memberCompressionDefaults()` | `AUD-AXIAL-KF-01`; catalogue reconciliation and override regression; For Review |
| `AXIAL-MEMBER-COMP-01` | Axial / design member compression capacity | AS 4100 Cl. 6.3.3; AS 4100 Table 6.3.3 | `app.js` `calculateMember()` | `AUD-AXIAL-CHS-01` plus EA regression; For Review |
| `AXIAL-TENSION-01` | Axial / gross yielding, straight-line net area and net fracture | AS 4100 Cl. 7.2, Cl. 7.3 and Cl. 9.1.10 | `member-capacity.js`; `app.js` `calculateMember()` | `AUD-AXIAL-TENSION-02`; `AUD-AXIAL-NET-01`; formula trace and governing-state regression; For Review |
| `BEAM-MOMENT-01` | Beam / design section moment capacity | AS 4100 Cl. 5.2; AS 4100 Table 3.4 | `beam-section-capacity.js`; `app.js` | `AUD-BEAM-DEFAULT-01` plus 981-row reconciliation; For Review |
| `BEAM-SHEAR-01` | Beam / design section shear capacity | AS 4100 Cl. 5.11 | `beam-section-capacity.js`; `app.js` | `AUD-BEAM-DEFAULT-01` plus family regression; For Review |
| `BEAM-SHEAR-MOMENT-01` | Beam / section shear-bending interaction | AS 4100 Cl. 5.12 | `beam-section-capacity.js`; `app.js` | Branch and trace regression; For Review |
| `MONO-ASSEMBLY-01` | Steel Monopole / profile regions and calculation stations | Overall global taper with entered thickness bands, or entered fabricated lengths, local tapers and overlaps | `monopole-capacity.js` `overallProfileSections()`, `assembleSections()` and `buildStations()` | `MONO-OVERALL-BANDS-01`; `MONO-ASSEMBLY-STATIONS-01`; For Review |
| `MONO-CHS-MOMENT-01` | Steel Monopole / circular section design moment capacity | AS 4100 Cl. 5.2; AS 4100 Table 5.2 | `monopole-capacity.js` `circularMomentCapacity()` | Exact branches plus three Austube reproductions; For Review |
| `MONO-CHS-NM-01` | Steel Monopole / circular compression and bending section-capacity profile | AS 4100 Cl. 5.2, Cl. 6.2 and Cl. 8.3.2 | `monopole-capacity.js` `circularCompressionSectionCapacity()`, `buildStations()` and `sectionStatesAtElevation()`; `monopole-app.js` | Austube capacity-intercept reproduction, 0.5 m profile and boundary-state tests; For Review |
| `MONO-PLATE-FY-01` | Steel Monopole / fabricated-plate minimum yield stress | AS/NZS 3678:2016 Table 8 | `monopole-capacity.js` `plateYieldStress()` | Exact table boundaries and unsupported states; For Review |
| `MONO-POLYGON-MOMENT-01` | Steel Monopole / regular-polygon permitted pure-bending moment | ASCE/SEI 48-19 Cl. 5.2.3.2.1, Table 5-1, Cl. 5.2.5 and Appendix B excerpts | `monopole-capacity.js` `polygonMomentCapacity()` | Geometry, branch, range and independent reconstruction tests; foreign-standard For Review path |
| `MONO-SLIP-OVERLAP-01` | Steel Monopole / prescribed geometric slip-joint overlap screen | AS/NZS 7000 Appendix K, Cl. K9 | `monopole-capacity.js` `slipOverlapScreen()` | Design and constructed overlap boundaries; joint resistance not evaluated; For Review |
| `MONO-MASS-01` | Steel Monopole / theoretical mass, self-weight and centre of gravity | Entered physical shell geometry and steel density | `monopole-capacity.js` `sectionMassProperties()` and `assemblyMassProperties()` | Constant, tapered, thickness-band and overlap-shell reproductions; For Review |
| `CONCRETE-FLEXURE-01` | Concrete Pad / pure-bending strip design moment capacity | AS 3600 Cl. 8.1; AS 3600 Table 2.2.2 | `concrete-section-calculation.js`; `app.js` `solveConcreteSection()` | `AUD-CONCRETE-DEFAULT-01`; `AUD-CONCRETE-FLEXURE-BRANCH-01`; `PUB-CONCRETE-LOO-01`; For Review |
| `CONCRETE-SHEAR-SIMPLIFIED-01` | Concrete Pad / simplified one-way shear section capacity | AS 3600 Cl. 8.2.4 and related Cl. 8.2 provisions | `concrete-section-calculation.js` `oneWayShear()`; `app.js` `concreteOneWayShear()` | `AUD-CONCRETE-DEFAULT-01`; `AUD-CONCRETE-SHEAR-BOUNDARY-01`; out-of-scope states fail closed; For Review |
| `REO-LAP-01` | Reinforcement / tension lap length | AS 3600 Cl. 13.2.1 and Cl. 13.2.2 | `reo-calculation.js` `calculateLap()` | `AUD-REO-LAP-01` plus branch suite; For Review |
| `REO-DEVELOPMENT-01` | Reinforcement / straight tension development | AS 3600 Cl. 13.1.2 | `reo-calculation.js` `calculateDevelopment()` | `PUB-REO-N28-01` plus branch and ordering regression; For Review |
| `REO-ANCHORAGE-01` | Reinforcement / qualified hook, cog and reduced-stress reference | AS 3600 Cl. 13.1.2.4, Cl. 13.1.2.6 and Cl. 13.1.2.7 | `reo-calculation.js` `calculateAnchorageComparison()` | `REC-REO-HOOK-N28-01` plus qualification and fail-closed regression; For Review |
| `SCREW-GROUP-ACTIONS-01` | Screw Piles / symmetric rigid-cap pile action distribution | Derived rigid-cap equilibrium model | `app.js` `calculateScrewDemand()` | `AUD-SCREW-GROUP-01`; not an AS 2159 resistance calculation; For Review |
| `SCREW-PROJECT-COMPARE-01` | Screw Piles / directional comparison with entered project values | Derived ratio using user-sourced project design values | `app.js` `calculateScrewDemand()` | Source/basis gating regression required; For Review |
| `SCREW-PRODUCT-LOOKUP-01` | Screw Piles / published product selection | Exact manufacturer document row | `app.js` product data | Selector only; Draft where source is pending |
| `ROCK-PRODUCT-LOOKUP-01` | Rock Anchor / published product selection | Exact manufacturer document row | `rock-anchor-selector/app.js`; `tests/rock-anchor-dom-contract.test.js`; local browser supplier/product/custom-state reproduction | Selector only; For Review and no inferred resistance |

### Standard Execution Sequence

Use this sequence for every governing capacity, interaction, utilisation, distribution, lookup or screening calculation:

1. **Freeze scope**
   - Record tab, workflow type, visible result, active mode/branch, worktree, commit/build and implementation owner.
   - State whether the review covers source, formula, numerical result, page state, layout or all of them.
2. **Define the claim**
   - Write the exact engineering question.
   - Classify the result as nominal/design capacity, utilisation, published value, selector output, derived aid or warning-only screen.
   - State limit state/value basis, axis, plane, direction, component and permitted decision.
3. **Build the source packet**
   - Locate the governing edition, clause/table/figure and PDF page.
   - Read headings, definitions, prerequisites, footnotes, adjacent clauses, exceptions, interpolation rules and errata.
   - Record applicable material, grade, product form, geometry, fabrication, action and method limits.
4. **Select an example**
   - Prefer an Australian example using the same Standard edition and method.
   - Confirm that inputs, assumptions, intermediate values and final result are sufficient for reconstruction.
   - Classify the example as `Worked example` or `External comparison`; never promote it to normative evidence.
5. **Capture source values**
   - Record unmodified source inputs, units, stated assumptions, implied/missing assumptions, formula branch, table row, intermediate values, published result and published precision.
6. **Reconstruct independently**
   - Use a hand calculation or separate script that does not import, call or copy the production calculation function.
   - Record unit conversions, lookup decisions and unrounded intermediate values.
7. **Reproduce in the browser**
   - Enter the same values and activate the same mode/branch.
   - Record adopted-basis summary, active overrides, intermediate values, final result, status, warning and displayed references.
8. **Compare**
   - Compare independent and browser results using unrounded values.
   - Compare display rounding separately.
   - Explain every difference; do not tune inputs or tolerance to force agreement.
9. **Exercise branches and boundaries**
   - Test every table path and conditional branch.
   - Test immediately below, at and above each threshold.
   - Test valid extrema, blank/partial/zero/negative/impossible inputs and one out-of-scope case.
10. **Exercise page state**
    - Test controlling selectors, auto/manual override, reset, hidden/disabled values, stale-result suppression, keyboard entry and phone/desktop parity.
11. **Record disposition**
    - Assign `Test_ID`, evidence method, expected/browser result, difference, tolerance, checked build/date and `Pass`, `Fail`, `Blocked` or `Source_Not_Verified`.
12. **Release regression**
    - Rerun every affected accepted test on the intended release build.
    - Confirm visible wording and limitations match the verified scope.

### Source and Example Selection Record

Use this template before numerical work:

| Field | Record |
| --- | --- |
| `Example_ID` | Stable identifier, for example `BEAM-EX-01` |
| Linked `Calculation_ID` | Governing result(s) tested |
| Source role | `Worked example` or `External comparison` |
| Source | Title, publisher/author, edition/version and public/local reference |
| Location | Clause/table/figure, chapter/example number and PDF/page |
| Governing code basis | Standard and edition used by the example |
| Problem statement | Component, geometry, material, restraints and actions |
| Source inputs | Unrounded values and original units |
| Stated assumptions | Assumptions explicitly given by the source |
| Inferred/missing assumptions | Items that must be reconstructed or prevent direct comparison |
| Active branch | Formula/table path and controlling condition |
| Published intermediates | Values supplied by the example |
| Published result | Value, unit and stated precision |
| Applicability to SC Handbook | Direct reproduction, partial comparison, mechanics-only comparison or not suitable |
| Copyright handling | Values/page references recorded; no unlicensed table or long passage reproduced |
| Selection status | `Accepted`, `Partial`, `Rejected` or `Source_Not_Verified` with reason |

Reject or downgrade an example when:

- it uses a different code method, factor system, material grade or action basis without a documented mapping;
- the result cannot be reconstructed from the published inputs;
- a software screenshot provides a number without sufficient modelling assumptions;
- the example omits a branch-controlling value;
- comparison would require changing the webpage inputs away from the source problem;
- the source is informal, unattributed, edition-uncertain or inaccessible for review.

### Independent Reconstruction Record

Use one record per accepted example or independently constructed case:

| Field | Record |
| --- | --- |
| `Reproduction_ID` | Stable identifier, for example `BEAM-REP-01` |
| Linked `Example_ID` / `Calculation_ID` | Evidence relationship |
| Independent method | Hand calculation, standalone Python, spreadsheet or separate solver |
| Independence statement | Confirmation that production functions/data paths were not called or copied |
| Internal units | Adopted calculation unit system |
| Conversion steps | Every source-to-internal conversion |
| Formula sequence | Equations and table selections in execution order |
| Intermediate values | Unrounded values needed to audit the result |
| Expected result | Unrounded and displayed values with units |
| Expected branch/status | Governing branch and required page state |
| Tolerance basis | Exact lookup, closed-form arithmetic, iterative convergence or source precision |
| Reviewer notes | Ambiguity, inferred assumption or unresolved difference |

Independent scripts should be small and calculation-specific. They may use shared neutral utilities for units or table parsing, but must not import `app.js`, browser output or copied production formula functions.

### Browser Reproduction Record

| Field | Record |
| --- | --- |
| `Test_ID` | Stable test identifier |
| Build / commit / URL | Exact browser implementation checked |
| Viewport | Desktop, tablet or phone width |
| Starting state | Default, direct hash, selected mode and reset status |
| Input sequence | User actions and unrounded entered values |
| Adopted basis | Section/product, material, factors, axis/plane/direction and active overrides |
| Browser intermediates | Visible/trace values required for comparison |
| Browser result | Unrounded value where accessible, displayed value, unit and status |
| Warning / limitation | Visible controlling warning and residual check |
| Expected result/state | Independent expected value and page state |
| Difference | Absolute and relative difference where meaningful |
| Disposition | `Pass`, `Fail`, `Blocked` or `Source_Not_Verified` |
| Evidence | Screenshot, DOM capture, console/test output or reviewer note |

### Minimum Test Matrix Template

Complete the applicable rows for every `Calculation_ID`:

| Test class | Minimum case | Required assertion |
| --- | --- | --- |
| Common | One normal project-like input set | Correct branch, intermediates, result, unit and visible basis |
| Independent | One hand/script calculation | Browser agrees with independently calculated unrounded result |
| Worked example | One accepted published or reconstructed example | Assumptions align and difference is explained |
| Branch | One case for every active conditional/table path | Correct formula, row, factor and status selected |
| Boundary | Immediately below, at and above each threshold | Branch changes at the correct value without stale output |
| Valid extrema | Minimum and maximum values within the stated method | Finite, physically coherent result or documented boundary state |
| Invalid | Blank, partial, zero, negative, impossible and incompatible values | Field remains editable; dependent result fails closed |
| Out of scope | One known excluded condition | `Not evaluated` or `Review required`; no misleading normal result |
| Invariant | Monotonicity, dimensional, sign and nominal/design relationships as applicable | Engineering relationship remains true |
| State transition | Selector, override, auto, reset, hidden and disabled changes | Full dependency chain updates; inactive values do not govern |
| Responsive | Same case at desktop and phone widths | Same numeric result, source, warning and status |
| Regression | Documented default case | Accepted output and wording remain stable unless intentionally revised |

### Difference and Tolerance Rules

- **Exact lookup:** source row, category, factor and unit-converted value must agree exactly.
- **Closed-form calculation:** use unrounded comparison and a reasoned numerical tolerance based on arithmetic precision; record the tolerance before seeing the production difference.
- **Published rounded example:** reconstruct the unrounded method where possible. Record source-rounding drift separately from implementation drift.
- **Iterative method:** record convergence criterion, maximum iterations, failure status and accepted result tolerance.
- **Branch/status:** require exact agreement. The wrong branch, table row, factor, governing case or status is a failure regardless of numerical closeness.
- **Display:** verify the displayed precision and unit separately and confirm display rounding cannot change utilisation or `PASS` / `FAIL`.
- **Commercial software comparison:** compare only compatible mechanics, modelling assumptions, actions and result definitions. Do not use it to approve Australian code factors or unimplemented checks.

Do not use one universal percentage tolerance for every calculation.

### Disposition Rules

| Outcome | Meaning | Required action |
| --- | --- | --- |
| `Pass` | Source, independent result, implementation, branch and page state agree within the recorded basis | Link evidence and retain as regression |
| `Pass - explained source rounding` | Browser agrees with the unrounded reconstruction; published example differs only through demonstrated source rounding | Record both values and explanation |
| `Fail` | Formula, lookup, unit, branch, value, state or warning is wrong | Correct implementation or source interpretation; rerun affected matrix |
| `Blocked` | Required source, assumptions, example inputs or implementation access is missing | Do not describe affected calculation as checked |
| `Source_Not_Verified` | Governing evidence remains unresolved | Keep out of verified release claim or show explicit draft/warning status |
| `Not applicable` | Test class genuinely does not apply | Record why; do not leave the matrix cell silently blank |

### Verification Priority Queue

Work one calculation family at a time. The queue is a planning order, not evidence that any item has passed.

| Priority | Tab / family | First reproduction targets | Preferred evidence |
| ---: | --- | --- | --- |
| `1` | Beam Section Capacity | Section moment capacity, web shear capacity, shear-bending interaction and compactness/effective-section branches | AS 4100 source pages, Steel Structures Design Manual to AS 4100, InfraBuild catalogue rows and SPACE GASS only as a secondary workflow comparison |
| `2` | Axial Member Capacity | Section compression, member buckling reduction, tension gross yielding/net fracture and section-family factor branches | AS 4100, Steel Structures Design Manual, InfraBuild/Orrcon/Austube data and independently reconstructed cases |
| `3` | Bolt Capacity | Shear N/X plane, tension, slip resistance, full-bearing and edge-distance limits, optional ply rupture, detailing and bolted-lap reduction | AS 4100, Australian design examples/connection guidance and independent arithmetic |
| `4` | Weld Capacity | Fillet-weld throat capacity, weld-metal strength selection and welded-lap `k_r` branch | AS 4100, AS/NZS 1554 context, ASI connection guidance and independent arithmetic |
| `5` | Concrete Pad Section | Strain-compatibility flexure, reinforcement table area, capacity factor branch and simplified one-way shear | AS 3600, Australian worked/reconstructed examples and independent section solver |
| `6` | Steel Monopole Section Capacity | Circular AS 4100 moment and compression/bending section-capacity intercepts, ASCE regular-polygon pure bending, station assembly, mass and geometric slip-joint overlap screen | AS 4100, AS/NZS 3678, AS/NZS 7000 Appendix K, supplied ASCE/SEI 48-19 excerpts, Austube data and independent geometry |
| `7` | Reinforcement | Basic and Refined tension development, lap `k7`, lower-limit ordering, hook/cog qualification and fail-closed evidence states | AS 3600, AS/NZS 4671 bar data, independently reconstructed default and threshold cases |
| `8` | Section Properties | UB/UC and hollow-section catalogue rows; custom geometry `A`, `I`, `Z` and `r` identities | Exact manufacturer rows plus independent geometry identities |
| `9` | Screw Piles / Rock Anchor selectors | Product-row reproduction, source-status mapping, filter compatibility and invalid/unpublished states | Manufacturer documents and exact selector-state tests; no inferred resistance |

`Wind Site Draft` remains outside this verification queue unless explicitly scheduled. A future `Base Plate` or other calculation tab must complete this procedure before acceptance as a checked calculator.

### Independent Audit Reproductions - 2026-07-30

Formula cases below are implemented in `tests/independent-reproductions.test.js`, which imports no production calculation module and uses only independently stated source inputs and equations. `AUD-SECTION-SOURCE-01` separately compares the live production data path with literal catalogue values in `tests/section-source-reproduction.test.js`. Browser results were checked on local Build 0.7.7 or the later build stated in the relevant record; display comparisons use the page precision, while standalone arithmetic retains unrounded values.

| Test_ID | Linked Calculation_ID | Independent case | Expected / browser result | Branch or invariant | Status |
| --- | --- | --- | --- | --- | --- |
| `AUD-WELD-DEFAULT-01` | `WELD-FILLET-01` | 6 mm equal-leg fillet, `fuw = 490 MPa`, `phi = 0.80`, `lw = 200 mm`, one weld line | `t_t = 4.242 mm`; `phi R/l_w = 0.9977184 kN/mm`; total `199.54368 kN`; displayed `199.5 kN` | Direct fillet-throat path; corrected the earlier evidence-record arithmetic without changing the displayed result | Pass, 2026-08-09 |
| `AUD-WELD-KR-BOUNDARY-01` | `WELD-LAP-KR-01` | `lw = 1.699 / 1.700 / 1.701 / 8.000 / 8.001 m` | `kr = 1.000 / 1.000 / 0.99794 / 0.620 / 0.620` | Below, at and above both table branch thresholds | Pass |
| `AUD-WELD-TRACE-01` | `WELD-FILLET-01`; `WELD-LAP-KR-01` | 6 mm SP fillet, `fuw = 490 MPa`, `lw = 2.000 m`, two effective weld lines, welded-lap `kr = 0.980` | Visible primitive-term substitution reproduces `3911.1 kN`; no rounded per-mm value is fed into the displayed total | Browser trace and DOM regression; calculation engine remains unrounded | Pass, 2026-08-10 |
| `AUD-WELD-IPBW-01` | `WELD-FILLET-01` | IPBW, project-specified `t_t = 7.5 mm`, `f_uw = 490 MPa`, `l_w = 320 mm`, two effective weld lines; compare SP and GP | SP: `1.764 kN/mm`, total `1128.96 kN`; GP: `1.323 kN/mm`, total `846.72 kN` | Independent AS 4100 Cl. 9.6.2.7 / Cl. 9.6.3.10 substitution; Table 3.4 SP/GP branches | Pass, 2026-08-09 |
| `AUD-WELD-INPUT-02` | `WELD-FILLET-01` | 6 mm fillet with `l_w = 23.99 mm`; non-integer `1.5` effective weld lines; IPBW with zero design throat | Production module throws and page reports `Not evaluated`; no rounded line count or normal capacity remains | AS 4100 Cl. 9.6.3.5 minimum `4s`, positive whole-number line count and required IPBW throat | Pass after local correction, 2026-08-09 |
| `AUD-WELD-PARENT-01` | `WELD-PARENT-SCREEN-01` | Grade 250 plate warning input: `f_up = 410 MPa`, `t = 10 mm`, `phi = 0.90` | Indicative screen `2.214 kN/mm`; does not alter weld PASS/FAIL and is not a joined-part capacity | Separate pure production helper and independent arithmetic; warning-only scope retained | Pass, 2026-08-09 |
| `AUD-SECTION-CHS-01` | `SECTION-GEOMETRY-01` | Ideal CHS `D = 114.3 mm`, `t = 4.5 mm` | `Ag = 1552.26 mm2`; `I = 2.343194E6 mm4`; `Z = 4.100077E4 mm3`; `r = 38.853 mm` | Closed-form area, second moment, modulus and radius identities | Pass |
| `AUD-SECTION-SOURCE-01` | `SECTION-CATALOGUE-01`; `SECTION-GEOMETRY-01` | Production rows: 310UB40.4, 200UC46.2, 150PFC, 114.3 x 4.5 CHS, 100 x 100 x 10 EA and 24 mm rod; plus 530UB92.4 dimensional correction | Exact source values for mass, area, dimensions and directional properties; CHS and rod geometry independently reproduced | InfraBuild 2019 Tables 9, 11, 15, 19 and 21; Orrcon 2024 CHS table; implemented in `tests/section-source-reproduction.test.js` | Pass after correcting 530UB92.4 `tf` from 16.5 mm to 15.6 mm |
| `AUD-AXIAL-CHS-01` | `AXIAL-MEMBER-COMP-01` | Austube Table 3.1-2 CHS default `Ag = 1120 mm2`, `r = 39.3 mm`, `Le = 3000 mm`, `fy = 350 MPa`, `kf = 1`, `alpha_b = -0.5` | Design member compression `237.2 kN` | Full lambda / alpha_a / eta / xi / alpha_c sequence | Pass |
| `AUD-AXIAL-KF-01` | `AXIAL-FORM-FACTOR-01`; `AXIAL-SECTION-COMP-01`; `AXIAL-MEMBER-COMP-01` | All accepted UB, UC, PFC, EA, CHS, RHS and SHS catalogue rows; Round Bar; changed `fy`; CHS geometry override | Published catalogue `kf` reconciles within `0.002`; unchanged grades retain the published value; `fy` or CHS geometry overrides adopt calculated `Ae/Ag`; Round Bar remains `1.0` | Independent flat-element and circular-effective-diameter branches in `tests/member-form-factor.test.js`; invalid geometry fails closed | Pass, 2026-08-21 |
| `AUD-AXIAL-TENSION-BRANCH-01` | `AXIAL-TENSION-01` | Equal Angle `Ag = An = 1810 mm2`, `fy = 320 MPa`, `fu = 440 MPa`; compare `kt = 1.00` and `0.85` | Gross yielding governs at `521.3 kN`; net fracture governs at `517.9 kN` | Both governing tension branches | Pass |
| `AUD-AXIAL-COMP-02` | `AXIAL-MEMBER-COMP-01` | AS 4100 Table 6.3.3(C) point `lambda_n = 150`, `alpha_b = -0.5`; Design Manual Example 6.4.2 rounded inputs | `alpha_c = 0.316`; independent `phi Nc = 159.9 kN` versus published `160.7 kN` | Table point and published CHS compression example | Pass; published difference is within `1.0 kN` and attributable to rounded printed properties / table interpolation |
| `AUD-AXIAL-TENSION-02` | `AXIAL-TENSION-01` | Design Manual Example 5.3.1, 50 x 50 x 5 EA: `Ag = An = 443 mm2`, `fy = 260 MPa`, `fu = 410 MPa`, `kt = 0.85` | Gross yielding `103.7 kN`; net fracture `118.1 kN`; gross yielding governs | Published tension-member example | Pass |
| `AUD-AXIAL-NET-01` | `AXIAL-TENSION-01` | Design Manual Example 5.3.4, 75 x 75 x 6 EA: `Ag = 867 mm2`, one 22 mm hole, actual `t = 6 mm`, `An = 735 mm2`, `fy = 260 MPa`, `fu = 410 MPa`, `kt = 0.85` | Gross yielding `202.9 kN`; net fracture `195.95 kN`; net fracture governs | Independent straight-line deduction and production helper; invalid whole-number, range, diameter, thickness and positive-area boundaries | Pass after local correction, 2026-08-11 |
| `AUD-AXIAL-INPUT-01` | `AXIAL-SECTION-COMP-01`; `AXIAL-MEMBER-COMP-01`; `AXIAL-TENSION-01` | Browser entries `fy = 0` and `Le = 0`, plus invalid range cases | `INPUT REQUIRED`; capacities and utilisation cleared; no catalogue fallback | Invalid-input and stale-result suppression | Pass after local correction |
| `AUD-AXIAL-DISPLAY-01` | `AXIAL-MEMBER-COMP-01`; `AXIAL-TENSION-01` | Enter an axial action giving an unrounded utilisation immediately above `1.00` | `>1.00`; `FAIL` remains based on the unrounded ratio | Display rounding must not contradict status | Pass after local correction |
| `AUD-BEAM-DEFAULT-01` | `BEAM-MOMENT-01`; `BEAM-SHEAR-01` | 310UB40.4 visible default source values | `phi Ms = 182.3 kN.m`; `phi Vv = 320.4 kN` | Independent moment and gross-web shear arithmetic | Pass after Build 0.7.50 correction |
| `AUD-BEAM-INTERACTION-01` | `BEAM-SHEAR-MOMENT-01` | Design-manual case: `M* = 232 kN.m`, `phi Ms = 242 kN.m`, nominal `Vv = 498.97 kN`, `V* = 72 kN` | `beta_v = 0.666116`; `phi Vvm = 299.135 kN`; published/displayed `299.1 kN`; PASS | AS 4100 Cl. 5.12.3 reduced branch plus `0.75` and `1.00` boundaries | Pass |
| `AUD-BEAM-INTERACTION-DISPLAY-01` | `BEAM-SHEAR-MOMENT-01` | Browser default 310UB40.4, `M*/phi Ms` immediately above `0.75`, `V* = phi Vv` | Exact utilisation above `1.0` displays `>1.00`; trace retains sufficient branch precision; FAIL remains based on unrounded values | Display rounding must not contradict the governing status | Pass after local correction |
| `AUD-CONCRETE-DEFAULT-01` | `CONCRETE-FLEXURE-01`; `CONCRETE-SHEAR-SIMPLIFIED-01` | 1000 mm strip, 500 mm depth, 32 MPa concrete, two N20@200 mats at 105/395 mm, no shear reinforcement | `x = 62.5 mm`; `phi Muo = 287.1 kN.m`; `phi Vu = 194.2 kN`; axial residual below `0.001 kN` | Independent strain compatibility, bisection equilibrium and simplified-shear reconstruction | Pass |
| `AUD-CONCRETE-FLEXURE-BRANCH-01` | `CONCRETE-FLEXURE-01` | Independent top/bottom compression, asymmetric two-layer, four-layer 700 mm composite strip, modern-bar `phi = 0.65 / 0.85` limits and legacy-bar conservative `phi = 0.65` cases | Bottom compression `x = 49.239 mm`, `phi Muo = 163.906 kN.m`; composite `x = 68.529 mm`, `phi Muo = 696.548 kN.m`; lower-bound case `phi Muo = 627.518 kN.m`; mirrored top/bottom models agree | Separate equilibrium solver in `tests/concrete-flexure.test.js`; production agreement within `0.0005 kN.m`; browser displays `163.9 / 696.5 kN.m`; composite interface transfer remains excluded | Pass, 2026-08-09 |
| `AUD-BOLT-DETAILED-01` | `BOLT-SHEAR-01`; `BOLT-BEARING-01`; `BOLT-SLIP-01`; `BOLT-DETAILING-01` | Four M24 property class 10.9 bolts, N-plane; two connected plies; TF slip with two interfaces and combined actions | Group shear `499.3909 kN`; governing full bearing `973.2096 kN`; edge bearing `443.52 kN`; pitch `60-120 mm`; slip `491.47 kN`; interaction `0.871874` | Standalone arithmetic in `tests/independent-reproductions.test.js` compared with pure production functions in `tests/bolt-capacity.test.js` | Pass, 2026-08-09 |
| `AUD-MONO-NM-INDEPENDENT-02` | `MONO-CHS-NM-01` | Austube 508 x 6.4 CHS C350L0 published intercept basis; audit actions `N* = 1000 kN`, `M* = 100 kN.m` | `phi Ns = 2726.5455 kN`; reduced boundary `phi Mr = 258.3601 kN.m`; linear interaction `0.611863` | Independent substitution in `tests/monopole-worked-examples.test.js`; confirms intercept relationship only and does not restore an action-check UI | Pass, 2026-08-09 |
| `AUD-CONCRETE-SHEAR-BOUNDARY-01` | `CONCRETE-SHEAR-SIMPLIFIED-01` | Independent 1000 mm strip cases for shallow `kv = 0.15`, default no-reinforcement branch, minimum vertical reinforcement, web-crushing cap, fallback `d` and out-of-scope strengths | Default `dv = 360 mm`, `kv = 0.136240`, `phi Vu = 194.2135 kN`; every branch and fail-closed state agrees with the pure production function | Separate arithmetic in `tests/concrete-shear.test.js`; this remains a simplified section-capacity screen, not complete shear design | Pass, 2026-08-09 |
| `AUD-REO-LAP-01` | `REO-LAP-01` | Basic N20 contact lap, `fc = 32 MPa`, cover 40 mm, clear spacing 100 mm, default `k7 = 1.25` | Raw `838.5 mm`; adopted `840 mm` | Independent lower-limit and `k7 Lsy.t` comparison | Pass |
| `AUD-SCREW-GROUP-01` | `SCREW-GROUP-ACTIONS-01` | Eight-pile 3 m x 3 m perimeter group; `N* = 800 kN`, `Mx* = 90 kN.m`, `My* = -45 kN.m`, `Vx* = 80 kN`, `Vy* = 40 kN`, `Tz* = 30 kN.m` | Maximum compression `115.0 kN`; tension `0.0 kN`; horizontal `13.4 kN` | Sum of axial and horizontal reactions and recovered moments equal entered actions | Pass |

### Axial Member Evidence

#### `AXIAL-EX-COMP-01`

| Field | Record |
| --- | --- |
| Linked `Calculation_ID` | `AXIAL-MEMBER-COMP-01` |
| Source role | Worked example |
| Governing source | `AS4100.pdf` \| AS 4100 Cl. 6.2.1, Cl. 6.3.2 and Cl. 6.3.3; AS 4100 Table 6.3.3(A) and Table 6.3.3(C) \| PDF pages 100, 103-105 \| printed pages 87, 90-92 |
| Worked-example source | `Steel Structures Design Manual to AS 4100.pdf` \| Example 6.4.2 \| PDF page 113 \| printed page 99 |
| Problem statement | 139.7 x 5.4 CHS compression member, Grade 250, effective length `7.2 m` |
| Source inputs | `Ag = 2283 mm2`; `r = 47.6 mm`; `fy = 250 MPa`; `kf = 1.0`; `alpha_b = -0.5`; `phi = 0.90` |
| Published result | `lambda_n` approximately `151`; tabulated/interpolated `alpha_c = 0.313`; design `phi Nc = 160.7 kN` |
| Applicability to SC Handbook | Direct AS 4100 Cl. 6.3.3 sequence and cold-formed non-stress-relieved CHS `alpha_b` branch |
| Selection status | Accepted; printed geometry and table interpolation are rounded, so the reconstruction tolerance is `1.0 kN` |

#### `AXIAL-REP-COMP-01`

| Field | Record |
| --- | --- |
| Linked evidence | `AXIAL-EX-COMP-01`; `AXIAL-MEMBER-COMP-01` |
| Independent method | Standalone arithmetic in `tests/independent-reproductions.test.js`; no production module or browser function imported |
| Formula sequence | AS 4100 Cl. 6.3.3 `lambda_n`, `alpha_a`, modified `lambda`, non-negative `eta`, `xi`, `alpha_c`; then `phi Nc = alpha_c phi kf An fy` |
| Table check | At `lambda_n = 150` and `alpha_b = -0.5`, closed-form `alpha_c` rounds to `0.316`, matching AS 4100 Table 6.3.3(C) |
| Reconstructed result | Using the example's rounded printed values, `phi Nc = 159.9 kN`; published result `160.7 kN` |
| Tolerance basis | Exact three-decimal table-point agreement; `1.0 kN` for the worked example because its printed geometry and tabulated factor are rounded |
| Status | Pass |

#### `AXIAL-EX-TENSION-01`

| Field | Record |
| --- | --- |
| Linked `Calculation_ID` | `AXIAL-TENSION-01` |
| Source role | Worked example |
| Governing source | `AS4100.pdf` \| AS 4100 Cl. 7.2, Cl. 7.3.1 and AS 4100 Table 7.3.2 \| PDF pages 112-113 \| printed pages 99-100 |
| Worked-example source | `Steel Structures Design Manual to AS 4100.pdf` \| Example 5.3.1 \| PDF page 96 \| printed page 82 |
| Problem statement | 50 x 50 x 5 EA tension member connected through one leg |
| Source inputs | `Ag = An = 443 mm2`; `fy = 260 MPa`; `fu = 410 MPa`; `kt = 0.85`; `phi = 0.90` |
| Published result | Gross yielding approximately `103.6 kN`; net fracture approximately `118 kN`; gross yielding governs |
| Applicability to SC Handbook | Direct reproduction of both AS 4100 Cl. 7.2 tension limits and the eccentric angle `kt` branch |
| Selection status | Accepted |

#### `AXIAL-REP-TENSION-01`

| Field | Record |
| --- | --- |
| Linked evidence | `AXIAL-EX-TENSION-01`; `AXIAL-TENSION-01` |
| Independent method | Standalone arithmetic in `tests/independent-reproductions.test.js`; no production module or browser function imported |
| Formula sequence | `phi Nty = phi Ag fy`; `phi Ntf = phi 0.85 kt An fu`; `phi Nt = min(phi Nty, phi Ntf)` |
| Reconstructed result | Gross yielding `103.7 kN`; net fracture `118.1 kN`; gross yielding governs |
| Difference / tolerance | Agreement to the source's stated one-decimal / whole-kN precision |
| Status | Pass |

#### `AXIAL-EX-NET-01`

| Field | Record |
| --- | --- |
| Linked `Calculation_ID` | `AXIAL-TENSION-01` |
| Source role | Worked example with fastener-hole deduction |
| Governing source | `AS4100.pdf` \| AS 4100 Cl. 7.2, AS 4100 Table 7.3.2 and AS 4100 Cl. 9.1.10 \| PDF pages 112-113 and 129-130 \| printed pages 99-100 and 116-117 |
| Worked-example source | `Steel Structures Design Manual to AS 4100.pdf` \| Example 5.3.4 \| PDF pages 98-99 \| printed pages 84-85 |
| Problem statement | 75 x 75 x 6 EA tension brace connected through one leg by one line of M20 bolts |
| Source inputs | `Ag = 867 mm2`; actual `t = 6 mm`; standard hole `dh = 20 + 2 = 22 mm`; `nh = 1`; `An = 735 mm2`; `fy = 260 MPa`; `fu = 410 MPa`; `kt = 0.85`; `phi = 0.90` |
| Published result | `phi Ntf = 195.95 kN`; net-section fracture governs over gross yielding `202.9 kN` |
| Applicability to SC Handbook | Direct test of the supported straight-line `An = Ag - nh dh t` path; staggered and non-straight critical paths remain manual |
| Selection status | Accepted |

#### `AXIAL-REP-NET-01`

| Field | Record |
| --- | --- |
| Linked evidence | `AXIAL-EX-NET-01`; `AXIAL-TENSION-01` |
| Independent method | Standalone arithmetic in `tests/independent-reproductions.test.js`; production helper separately exercised in `tests/member-capacity.test.js` |
| Formula sequence | `An = Ag - nh dh t`; `phi Nty = phi Ag fy`; `phi Ntf = phi 0.85 kt An fu`; `phi Nt = min(phi Nty, phi Ntf)` |
| Reconstructed result | `An = 735 mm2`; gross yielding `202.878 kN`; net fracture `195.9528 kN`; displayed `196.0 kN`; net fracture governs |
| Input boundaries | Blank/non-finite, negative, fractional and over-limit `nh`; non-positive applicable `dh`; non-positive `t`; and non-positive resulting `An` fail closed |
| Catalogue-thickness regression | Equal Angle automatic deduction consumes manufacturer actual `t`; nominal designation thickness remains visible only as context where it differs |
| Status | Pass after local correction, 2026-08-11 |

### Beam Shear-Bending Interaction Evidence

#### `BEAM-EX-SHEAR-01`

| Field | Record |
| --- | --- |
| Linked `Calculation_ID` | `BEAM-SHEAR-01`; `BEAM-SHEAR-MOMENT-01` |
| Source role | Published worked example |
| Governing source | `AS4100.pdf` \| AS 4100 Cl. 5.11.4 and Cl. 5.12.3 \| PDF pages 86 and 89-90 \| printed pages 73 and 76-77 |
| Worked-example source | `Steel Structures Design Manual to AS 4100.pdf` \| 360UB50.7 web shear and combined moment-shear check \| PDF pages 148-149 \| printed pages 134-135 |
| Source inputs | 360UB50.7; `d = 356 mm`; `tw = 7.3 mm`; `fy,w = 320 MPa`; `phi = 0.90`; `M* = 232 kN.m`; `phi Ms = 242 kN.m`; `V* = 72 kN` |
| Published sequence | `Aw = d tw = 356 x 7.3`; `Vv = 0.6 fy,w Aw = 498.97 kN`; `phi Vv = 449 kN`; reduced `phi Vvm = 299.1 kN` |
| Applicability to SC Handbook | Direct confirmation that rolled UB gross web area uses overall depth `d`, while `dp = d1` remains the web-slenderness depth |
| Selection status | Accepted |

#### `BEAM-REP-SHEAR-01`

| Field | Record |
| --- | --- |
| Linked evidence | `BEAM-EX-SHEAR-01`; `BEAM-SHEAR-01`; `BEAM-SHEAR-MOMENT-01` |
| Independent method | Standalone arithmetic in `tests/independent-reproductions.test.js`; production capacity functions are not imported |
| Source-rounded reconstruction | `Aw = 2598.8 mm2`; `phi Vv = 449.1 kN`; source reports `449 kN`; reduced `phi Vvm = 299.1 kN` |
| Catalogue-precision browser expectation | With `d = 355.6 mm`, `Aw = 2595.88 mm2`, `phi Vv = 448.6 kN`; with unrounded `phi Ms = 242.19 kN.m`, `phi Vvm = 299.3 kN` |
| Difference / tolerance | Differences are caused only by the source's rounded section depth and moment capacity; compare at the stated precision |
| Status | Pass after Build 0.7.50 correction |

#### `BEAM-EX-INT-01`

| Field | Record |
| --- | --- |
| Linked `Calculation_ID` | `BEAM-SHEAR-MOMENT-01` |
| Source role | Worked example |
| Governing source | `AS4100.pdf` \| AS 4100 Cl. 5.12.3 \| PDF pages 89-90 \| printed pages 76-77 |
| Worked-example source | `Steel Structures Design Manual to AS 4100.pdf` \| Check capacity to resist combined moment and shear \| PDF page 149 \| printed page 135 |
| Problem statement | Whole-section shear-bending interaction method for a flat-web section |
| Source inputs | `M* = 232 kN.m`; `phi Ms = 242 kN.m`; nominal `Vv = 498.97 kN`; `phi = 0.90`; `V* = 72 kN` |
| Active branch | `0.75 phi Ms < M* <= phi Ms`; `Vvm = Vv[2.2 - 1.6M*/(phi Ms)]` |
| Published result | Nominal `Vvm = 332.4 kN`; design `phi Vvm = 299.1 kN`; `V* = 72 kN` passes |
| Applicability to SC Handbook | Direct formula and branch reproduction; the browser reproduction uses the page's checked 310UB40.4 default capacities because the worked example does not define a matching selectable catalogue row |
| Selection status | Accepted for the AS 4100 Cl. 5.12.3 interaction equation and branch logic; not used as product-row evidence |

#### `BEAM-REP-INT-01`

| Field | Record |
| --- | --- |
| Linked evidence | `BEAM-EX-INT-01`; `BEAM-SHEAR-MOMENT-01` |
| Independent method | Standalone arithmetic in `tests/independent-reproductions.test.js`; no production module or browser function imported |
| Formula sequence | `m = M*/(phi Ms)`; `beta_v = 1` for `m <= 0.75`, otherwise `2.2 - 1.6m` for `m <= 1`; `phi Vvm = phi Vv beta_v` |
| Unrounded result | `m = 0.95867768595`; `beta_v = 0.66611570248`; `phi Vvm = 299.1345768595 kN` |
| Display comparison | Independent `299.1 kN`; published `299.1 kN` |
| Boundary cases | Immediately below, at and above `m = 0.75`; at and above `m = 1.00` |
| Tolerance basis | `1e-12` for dimensionless closed-form factors; `0.1 kN` for comparison with the published one-decimal result |
| Status | Pass |

#### `AUD-BEAM-INTERACTION-DISPLAY-01`

- **Browser case:** Build 0.7.6 default 310UB40.4 values with `M* = 136.7282 kN.m` and `V* = 298.937088 kN`, placing `M*/phi Ms` immediately above `0.75`.
- **Finding:** The unrounded calculation correctly failed, but the former two-decimal display showed `1.00` and the three-decimal interaction factor showed `1.000`, contradicting the displayed `FAIL`.
- **Disposition:** Preserve unrounded branch and status logic. Display numerical equality within `1e-9` as `1.00`, a near-boundary failed utilisation as `>1.00`, a near-boundary passing utilisation as `<1.00`, and retain six decimals for `M*/phi Ms` or `beta_v` only when required to distinguish the `0.75` or `1.00` branch.
- **Scope:** Presentation precision only; no governing equation, capacity, factor or PASS/FAIL threshold changed.

### Lightweight Page Rule After Verification

Verification evidence remains in this register and optional independent QA scripts. The visible page should normally change only when verification identifies:

- a required input or source-basis distinction;
- a wrong formula, branch, factor, table value, unit or result;
- a critical applicability condition;
- an invalid/out-of-scope state that must fail closed;
- a concise warning or limitation needed to prevent predictable misuse.

Do not add every source intermediate, test case or software comparison to the user interface. The page remains a quick engineering handbook.

### Bolt Connected-Ply Integrity Records

#### `BOLT-PLY-TENSION-01`

- **Tab / output:** Bolt Capacity / `Design section tension capacity, phi Nt`.
- **Engineering question:** What is the design tension capacity of the selected critical connection component using user-entered gross and net areas?
- **Result type / limit state:** ULS design capacity.
- **Governing source:** AS 4100 Cl. 9.1.9(b), AS 4100 Cl. 7.2 and AS 4100 Table 3.4; governing edition AS 4100:2020; local PDF pages 128, 112 and 47.
- **Evidence class:** Normative formula with project inputs.
- **Applicability:** Steel connection component subject to transferred axial tension; `Ag`, `An`, `fyc`, `fuc` and `kt` must describe the same component and critical section.
- **Equation:** `phi Nt = 0.90 min(Ag fyc, 0.85 kt An fuc)`.
- **Units / defaults:** Areas in `mm2`, strengths in `MPa`, result in `kN`; `kt = 1.0` is an editable starting value, not an inferred entitlement.
- **Exclusions:** Automatic net-section geometry, staggered-hole deduction, force distribution classification, plate bending, compression, buckling, welds and supporting-member effects.
- **Implementation owner:** `bolt-integrity.js` `netSectionTension()`; `app.js` `calculateConnectedPlyIntegrity()` and `calculateBolt()`.
- **Verification evidence:** `BOLT-INTEGRITY-TENSION-01`; unit test and browser output agree with the independent arithmetic result `558.756 kN`.
- **Status:** For Review; source formula visually checked, project input selection remains the user's responsibility.

#### `BOLT-BLOCK-SHEAR-01`

- **Tab / output:** Bolt Capacity / `Design block shear capacity, phi Rbs`.
- **Engineering question:** What is the design block-shear capacity of the governing user-identified failure path?
- **Result type / limit state:** ULS design capacity.
- **Governing source:** AS 4100 Cl. 9.1.9(e), governing edition AS 4100:2020, local PDF page 129; ASI TN013 `Block Shear` worked example.
- **Evidence class:** Normative formula plus worked example and project inputs.
- **Applicability:** One critical connection component and one reviewed failure path; all plausible paths must be assessed before the governing path is entered.
- **Equation:** `phi Rbs = 0.75 min(0.6 fuc Anv + kbs fuc Ant, 0.6 fyc Agv + kbs fuc Ant)`.
- **Units / defaults:** Areas in `mm2`, strengths in `MPa`, result in `kN`; `kbs` is restricted to 1.0 for uniform or 0.5 for non-uniform tension stress.
- **Exclusions:** Automatic path generation, corner geometry, overlapping paths, eccentric bolt-group reactions, plate bending, compression, buckling, welds and supporting-member effects.
- **Implementation owner:** `bolt-integrity.js` `blockShear()`; `app.js` `calculateConnectedPlyIntegrity()` and `calculateBolt()`.
- **Verification evidence:** `BOLT-BLOCK-TN013-01`; the implemented design capacity is `538.56 kN`, matching the published rounded `539 kN`.
- **Status:** For Review; source formula and reference example checked, governing-path selection remains manual.

#### `BOLT-GOVERNING-01` - Retired

- **Change:** Removed from the Standard bolt branch on 2026-07-28 when project strength actions and utilisation were removed.
- **Current boundary:** The branch reports capacities only. `/TF` serviceability slip remains a separate optional check.

Verification cases:

| Test_ID | Calculation_ID | Case / input | Expected and checked result | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| `BOLT-INTEGRITY-TENSION-01` | `BOLT-PLY-TENSION-01` | `Ag = 2100 mm2`, `An = 1660 mm2`, `fyc = 320 MPa`, `fuc = 440 MPa`, `kt = 1.0` | Gross yielding `672.0 kN`; net fracture `620.84 kN`; `phi Nt = 558.756 kN`; browser `558.8 kN` | Independent arithmetic plus `tests/bolt-integrity.test.js` | Pass, 2026-07-24 |
| `BOLT-BLOCK-TN013-01` | `BOLT-BLOCK-SHEAR-01` | ASI TN013 governing Mode B path: `Agv = 1050 mm2`, `Anv = 720 mm2`, `Ant = 1200 mm2`, `fyc = 320 MPa`, `fuc = 440 MPa`, `kbs = 1.0` | Limits `718.08 / 729.60 kN`; `phi Rbs = 538.56 kN`; browser `538.6 kN` | Published worked example, independent arithmetic, unit test and local browser | Pass, 2026-07-24 |

### Steel Monopole Section Capacity Records

#### `MONO-ASSEMBLY-01`

- **Tab / output:** Steel Monopole Section Capacity / continuous overall-profile regions or installed physical-section extents, calculation stations and overlap zones.
- **Engineering question:** How are wall-thickness regions located on a continuous global taper, or physical pole sections located after prescribed slip overlaps are assembled?
- **Result type / basis:** Derived geometry; no resistance or compliance result.
- **Governing source:** User-entered continuous-taper geometry and thickness-band elevations, or user-entered fabricated lengths and overlaps. AS/NZS 7000:2016 Appendix K provides the separate overlap-length screen.
- **Equation:** Overall mode: `D(z) = D_b + (D_t - D_b)z/H`, with strictly increasing band `z_top` and final `z_top = H`. Schedule mode: `z_start,1 = 0`; `z_start,i = z_end,i-1 - L_o,i`; `z_end,i = z_start,i + L_i`; `H = sum(L_i) - sum(L_o,i)`.
- **Applicability:** Overall-mode thickness bands are calculation regions on one continuous linear taper and have no joint or overlap. Physical sections are entered bottom-to-top and retain their own local tapers.
- **Exclusions:** Inference of physical joints or overlaps from thickness changes, erection sequence, fit-up force, ovalisation and manufacturing tolerances other than the separate overlap screen.
- **Implementation owner:** `monopole-capacity.js` `overallProfileSections()`, `assembleSections()` and `buildStations()`.
- **Verification evidence:** `MONO-OVERALL-BANDS-01` and `MONO-ASSEMBLY-STATIONS-01`; automated cases check global-taper interpolation, thickness boundaries, assembled height, local section taper, overlap-active sections, top-down 0.5 m stations and invalid geometry.
- **Status:** For Review; local implementation and verification cases are complete, independent technical review remains pending.

#### `MONO-CHS-MOMENT-01`

- **Tab / output:** Steel Monopole Section Capacity / circular section design moment capacity, `phi Ms`.
- **Engineering question:** What is the AS 4100 design section moment capacity of the unperforated circular hollow section at a stated elevation?
- **Result type / limit state:** ULS design section capacity; capacity only.
- **Governing source:** AS 4100:2020 Cl. 5.2 and Table 5.2; local `AS4100.pdf`, Section 5 visually checked on PDF pages 67-69.
- **Evidence class:** Normative formula with user-entered geometry and yield strength.
- **Applicability:** Circular steel tube, design wall thickness `t_d`, linear taper between entered end diameters, and stated section fabrication category. `LW` means lightly welded longitudinally and `HW` means heavily welded longitudinally.
- **Equation / branch:** `Di = D - 2t_d`; exact hollow-circle `A`, `I`, `Z` and `S`; `Ms = fy Ze`; `phi Ms = 0.90 fy Ze`; circular slenderness `lambda_s = (D/t_d)(fy/250)` with AS 4100 Table 5.2 limits selected by fabrication category.
- **Defaults / overrides:** The default fabricated-shell material is AS/NZS 3678:2016 Grade 350 plate, with `fy` derived for each entered nominal thickness `t_nom` from Table 8. Capacity uses `t_d`; default `t_d = t_nom`, with an optional separate project design thickness.
- **Exclusions:** Member buckling, second-order effects, openings, attachments, welds, corrosion beyond entered design thickness, fatigue and local slip-joint resistance. Axial-force interaction is excluded from this pure-bending result and is handled only by the separate `MONO-CHS-NM-01` section check.
- **Implementation owner:** `monopole-capacity.js` `circularProperties()` and `circularMomentCapacity()`.
- **Verification evidence:** `MONO-CHS-BRANCHES-01`; independent exact hollow-circle equations and compact/non-compact/slender branch values match `tests/monopole-capacity.test.js`; default browser result and invalid-input clearing checked 2026-07-27.
- **Status:** For Review; governing AS 4100 source and local implementation are checked, independent technical review remains pending.

#### `MONO-CHS-NM-01`

- **Tab / output:** Steel Monopole Section Capacity / circular compression and bending section-capacity profile.
- **Engineering question:** What `phi Ns` and `phi Ms` intercepts define the AS 4100 uniaxial section-capacity boundary at each evaluated station?
- **Result type / limit state:** ULS section capacity at 0.5 m and exact-boundary stations; no design-action or member-capacity result.
- **Source audit:** AS 4100:2020 Cl. 6.1, Cl. 6.2.1 to Cl. 6.2.4 and Cl. 8.1 to Cl. 8.3.2 were visually checked on local `AS4100.pdf` PDF pages 100-102 and 116-117 / printed pages 87-89 and 103-104.
- **Equation / branch:** `Ns = kf An fy`; `phi Ns = 0.90 Ns`; `phi Ms = 0.90 fy Ze`. The reported values are the two intercepts of `N/(phi Ns) + M/(phi Ms) = 1`; no action point is evaluated. For a slender CHS, `kf = Ae/Ag` follows Cl. 6.2.2 to Cl. 6.2.4 using the prescribed effective-diameter limits; `An = Ag` for the supported unperforated shell.
- **Elevation rule:** Use the common top-to-base 0.5 m station set and retain every physical shell or adjacent thickness-band state active at an exact boundary.
- **Defaults / provenance:** Geometry, `t_d`, `fy` and `phi Ms` are inherited from each active circular section state. No action defaults are present.
- **Exclusions:** No member compression capacity `Nc`, effective length, member buckling, global stability, second-order analysis, openings, penetrations, action derivation, load combinations, shear, torsion or whole-member compliance result. Polygon combined stress is unavailable.
- **Implementation owner:** `monopole-capacity.js` `circularCompressionSectionCapacity()`, `buildStations()` and `sectionStatesAtElevation()`; `monopole-app.js` `renderCombinedCapacityStations()`.
- **Verification evidence:** `MONO-CHS-NM-AUSTUBE-01` and automated 0.5 m profile, top-to-base order and exact-boundary-state cases in `tests/monopole-capacity.test.js` and `tests/monopole-worked-examples.test.js`.
- **Status:** For Review; source, implementation and local verification are complete, independent technical review remains pending.

#### `MONO-PLATE-FY-01`

- **Tab / output:** Steel Monopole Section Capacity / physical-section yield stress, `fy`.
- **Engineering question:** What minimum plate yield stress applies to the selected AS/NZS 3678 grade and entered nominal thickness?
- **Result type / basis:** Normative material lookup feeding the AS 4100 section-resistance calculation.
- **Governing source:** AS/NZS 3678:2016 Table 8, local `AS3678.pdf`, visually checked on PDF page 24 / printed page 21.
- **Evidence class:** Normative table lookup.
- **Applicability:** Fabricated circular pole shells made from AS/NZS 3678 plate, nominal thickness `4.5 mm <= t_nom <= 200 mm`, within a table cell that specifies a minimum yield stress.
- **Lookup rule:** Exact upper-bound bins `8 / 12 / 20 / 32 / 50 / 80 / 150 / 200 mm`; grades `200 / 250 / 300 / 350 / 400 / 450 / WR350`; unsupported grade-thickness cells return invalid input.
- **Defaults / overrides:** Grade 350 plate is the default. The lookup always uses entered nominal thickness `t_nom`; separate design thickness does not change the material-table bin. Manual `fy` is available for certified values or another material standard.
- **Exclusions:** Product availability, mill certificate acceptance, impact designation, through-thickness properties, tensile strength, cold-forming qualification and AS/NZS 1163 supplied-CHS product selection.
- **Implementation owner:** `monopole-capacity.js` `plateYieldStress()` and `monopole-app.js` material-state handling.
- **Verification evidence:** `MONO-PLATE-FY-BOUNDARIES-01`; exact table boundaries, immediately-above transitions, unsupported cells and out-of-range thicknesses are automated.
- **Status:** For Review; table transcription and local boundary tests are checked, independent technical review remains pending.

#### `MONO-POLYGON-MOMENT-01`

- **Tab / output:** Steel Monopole Section Capacity / regular polygonal section permitted bending moment, `M`.
- **Engineering question:** What pure-bending moment corresponds to the ASCE/SEI 48-19 permitted local-buckling stress for the entered regular polygonal hollow section?
- **Result type / basis:** Permitted bending moment derived from the ultimate-strength design-stress format; capacity only; no AS 4100 capacity factor.
- **Governing source:** ASCE/SEI 48-19 Cl. 5.2.3.2.1, Eqs. (5.2-6) to (5.2-11), Table 5-1, Cl. 5.2.5 Eq. (5.2-19a), Appendix B Figs. B-1 to B-7; user-provided screenshots of printed pp. 9-11, 59, 61-62 and Commentary pp. 33-37.
- **Evidence class:** Normative formula excerpts plus derived exact geometry; foreign-standard comparison path.
- **Applicability:** Formed regular 4-, 6-, 8-, 12- or 16-sided polygon, outside across-flats `D_o`, design thickness `t_d`, actual inside bend radius derived for each thickness band or physical section as `r_i = (r_i/t_nom)t_nom`, and pure bending with zero axial stress. The ratio is a project or fabricator input and cannot be inferred uniquely from the other section dimensions. The page starts with `r_i/t_nom = 1.5` as an editable fabrication estimate; it is not a Standard or manufacturer value and must be replaced by verified project or product geometry.
- **Equation / branch:** Exact concentric sharp-corner regular-polygon `A`, `I` and `Z_min = I/c_max`; `BR = min(r_i, 4t_d)`; `w = tan(pi/n)(D_o - t_d - 2BR)`; `lambda = (w/t_d)sqrt(f_y/E)`; ASCE piecewise `F_a`; `M = F_a I/c_max = F_a Z_min`; no AS 4100 capacity factor.
- **Exclusions:** Irregular polygons, non-uniform flats, unstiffened openings, `n > 16` round-member provisions, bend-property enhancement, member stability, local slip-joint resistance, and confirmation that AS/NZS 3678 material is accepted as equivalent for the ASCE method.
- **Implementation owner:** `monopole-capacity.js` `polygonProperties()` and `polygonMomentCapacity()`.
- **Verification evidence:** `MONO-POLYGON-GEOMETRY-01`, `MONO-POLYGON-FLAT-WIDTH-01`, `MONO-POLYGON-BOUNDARIES-01`, `MONO-POLYGON-EXACT-08` and `MONO-POLYGON-EXACT-16`; independent square-annulus inertia, AF/AC invariance, Appendix B flat-width equation, `4t_d` radius cap, each branch limit, immediate out-of-range state and exact 8-/16-sided `w`, `Z_min`, `lambda`, `F_a`, `M` reconstructions pass automated tests.
- **Status:** For Review; governing formula excerpts are visually checked and exposed, but complete ASCE 48 compliance, Australian adoption and independent technical review remain outside this record.

#### Planned polygon combined-stress check - not implemented

- **Source audit:** ASCE/SEI 48-19 Cl. 5.2.2 to Cl. 5.2.6, including Eqs. (5.2-20) and (5.2-21), and Commentary C5.2.6 were visually checked in the supplied printed pp. 9-11 and Commentary p. 35 excerpts.
- **Verified equation boundary:** Axial and biaxial bending stresses are combined at the same cross-section point as `P/A + Mx cy/Ix + My cx/Iy`; shear and torsion enter the separate distortion-energy term. The commentary prohibits adding unrelated maximum normal and shear stresses from different points.
- **Implementation gate:** Define signed action axes and polygon orientation, evaluate every critical perimeter point, separate tensile and compressive limits, and add rotation/sign tests. Do not substitute a scalar moment or generic linear capacity interaction.
- **Status:** Formula scope checked from partial excerpts; calculation and page not implemented; foreign-standard `For Review` limitation retained.

#### `MONO-SLIP-OVERLAP-01`

- **Tab / output:** Steel Monopole Section Capacity / prescribed slip-overlap length screen.
- **Engineering question:** Does the entered overlap meet the Appendix K minimum geometric overlap for design and constructed conditions?
- **Result type / basis:** Geometric screen only; not joint resistance.
- **Governing source:** AS/NZS 7000:2016 Appendix K, K9; local `AS7000.pdf`, printed pages 170-171 visually checked.
- **Evidence class:** Normative geometric requirement.
- **Equation / branch:** Design overlap `L_o >= 1.5 D_ins,max`; constructed minimum `L_o >= 1.35 D_ins,max`, where `D_ins,max` is the largest circle inscribed within the outside profiles of the components being joined at the connection. For circular sections this is outside diameter; for regular polygons it is outside across-flats.
- **Applicability:** Prescribed slip-joint overlap entered for adjacent pole sections.
- **Exclusions:** Slip-joint moment, shear or axial resistance; contact pressure; friction; jacking force; welds; fatigue; ovalisation; tolerance analysis; erection acceptance.
- **Implementation owner:** `monopole-capacity.js` `slipOverlapScreen()`.
- **Verification evidence:** `MONO-SLIP-SCREEN-01`; circular and polygon inscribed-diameter cases, tapered lower-shell overlap-region maximum, required design overlap, actual-installed boundary, minimum constructed overlap and `Not evaluated` joint-capacity state pass automated tests.
- **Status:** For Review; source requirement and local implementation are checked, independent technical review remains pending.

#### `MONO-MASS-01`

- **Tab / output:** Steel Monopole Section Capacity / steel mass, self-weight and centre of gravity.
- **Engineering question:** What is the theoretical shell mass and installed vertical centre of gravity of the entered fabricated sections?
- **Result type / basis:** Derived geometry using `rho = 7850 kg/m3` and `g = 9.80665 m/s2`.
- **Equation:** Integrate each physical section using nominal thickness `t_nom` over its fabricated length. Both physical shells are counted through an overlap because both are present. Sum section masses and first moments about the base.
- **Exclusions:** Base plate, flanges, weld metal, galvanizing, doors, stiffeners, ladders, platforms, appurtenances, bolts, internal cables and fabrication allowances.
- **Implementation owner:** `monopole-capacity.js` `sectionMassProperties()` and `assemblyMassProperties()`.
- **Verification evidence:** `MONO-MASS-01`; constant-section mass and centroid, self-weight, overlap double-shell mass, and separate `t_nom / t_d` invariant pass automated tests.
- **Status:** For Review; derived calculation and local verification are complete, independent technical review remains pending.

Verification cases:

| Test_ID | Calculation_ID | Case / input | Expected and checked result | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| `MONO-OVERALL-BANDS-01` | `MONO-ASSEMBLY-01` | `H = 30 m`, `D_b = 1200 mm`, `D_t = 300 mm`; thickness bands terminate at `10 / 20 / 30 m` | Three 10 m regions; boundary dimensions `1200 / 900 / 600 / 300 mm`; both adjacent thickness states evaluated at 10 m and 20 m; non-increasing or incomplete band schedules rejected | Independent linear interpolation plus automated calculation test and local browser two-band check | Pass, 2026-08-01 |
| `MONO-ASSEMBLY-STATIONS-01` | `MONO-ASSEMBLY-01` | Three physical sections `12.0 / 10.5 / 10.5 m` with `1.5 / 1.5 m` overlaps; `0.5 m` stations | `H = 30.0 m`; top station first, `z = 0` last; two parent sections active through each overlap; summary reports the governing base-station value and the table retains every evaluated state | Independent assembly arithmetic plus automated test and local browser | Pass, updated 2026-08-03 |
| `MONO-CHS-BRANCHES-01` | `MONO-CHS-MOMENT-01` | Exact 1000 x 10 CHS properties; `lambda_s = 50`, `100` and `130` branch cases | Exact `A`, `I`, `Z`, `S`; Compact, Non-compact and Slender branches; invalid `D <= 2t` rejected | Independent equations plus automated test | Pass, 2026-07-27 |
| `MONO-CHS-AUSTUBE-01` | `MONO-CHS-MOMENT-01` | Austube Table 8-2(2): 165.1 x 3.5 CHS, C350L0, CF; published mass 13.9 kg/m and `phi Ms = 27.3 kN.m` | Calculated 13.94 kg/m and 27.2715 kN.m; browser displays 14 kg and 27.3 kN.m | Published catalogue value plus independent automated comparison | Pass, 2026-07-29 |
| `MONO-CHS-AUSTUBE-02` | `MONO-CHS-MOMENT-01` | Austube Table 8-2(1): 406.4 x 12.7 CHS, C350L0, CF; Compact; published mass 123 kg/m and `phi Ms = 620 kN.m` | Calculated 123.43 kg/m and 620.3 kN.m; Compact branch | Published catalogue value plus independent automated comparison | Pass, 2026-07-29 |
| `MONO-CHS-AUSTUBE-03` | `MONO-CHS-MOMENT-01` | Austube Table 8-2(1): 508.0 x 6.4 CHS, C350L0, CF; Non-compact; published mass 79.2 kg/m and `phi Ms = 408 kN.m` | Calculated 79.18 kg/m and 407.8559 kN.m; browser displays 79 kg and 407.9 kN.m | Published catalogue value plus independent automated comparison | Pass, 2026-07-29 |
| `MONO-CHS-NM-AUSTUBE-01` | `MONO-CHS-NM-01` | Austube 508.0 x 6.4 CHS, C350L0: published `Ag = 10100 mm2`, `kf = 0.857` and `phi Ms = 408 kN.m` | Published inputs give `phi Ns = 2726.55 kN`; production `kf`, `phi Ns` and `phi Ms` agree within 0.5% | Austube Tables 3.1-2(1) and 8-2(1), independent substitution and automated comparison | Pass, 2026-08-03 |
| `MONO-POLYGON-ASCE-DERIVED-01` | `MONO-POLYGON-MOMENT-01` | Standard-derived 12-sided case: `Do = 1000 mm`, `t = 10 mm`, `ri = 30 mm`, `fy = 350 MPa`; Appendix B approximate equations give `lambda = 1.031`, `Fa = 350 MPa`, `M = 2694.5 kN.m` | Exact sharp-corner model gives `lambda = 1.031`, `M = 2700.3 kN.m`; 0.21% above the Appendix B approximation | ASCE/SEI 48-19 Eqs. (5.2-8), (5.2-19a), Figs. B-3 and B-7; independent automated comparison | Pass, 2026-08-14 |
| `MONO-POLYGON-ASCE-DERIVED-02` | `MONO-POLYGON-MOMENT-01` | Standard-derived 12-sided case: `Do = 1600 mm`, `t = 10 mm`, `ri = 30 mm`, `fy = 350 MPa`; Appendix B gives `lambda = 1.704`, `Fa = 317.24 MPa`, `M = 6323.6 kN.m` | Exact sharp-corner model gives `lambda = 1.704`, `Fa = 317.27 MPa`, `M = 6337.4 kN.m`; no AS 4100 `phi` | ASCE/SEI 48-19 Eq. (5.2-9), Eq. (5.2-19a), Figs. B-3 and B-7; independent automated comparison | Pass, 2026-08-14 |
| `MONO-POLYGON-ASCE-DERIVED-03` | `MONO-POLYGON-MOMENT-01` | Standard-derived range case: 12-sided, `Do = 2100 mm`, `t = 10 mm`, `ri = 30 mm`, `fy = 350 MPa`; Appendix B gives `lambda = 2.265 > 2.20` | Page reports `Not checked`, identifies the exceeded limit and suppresses the resistance profile | ASCE/SEI 48-19 Eq. (5.2-9) upper applicability limit; independent automated comparison | Pass, 2026-08-14 |
| `MONO-POLYGON-EXTERNAL-LEGACY-01` | `MONO-POLYGON-MOMENT-01` | Public ASCE 48-11 octagonal worksheet: `D = 20 in` mean A/F, `t = 0.5 in`, `BR = 2 in`, `Fy = 50 ksi`; published `Ag = 33.2 in2`, `I = 1752 in4`, `w = 6.417 in` | After mapping to page input `Do = D + t = 20.5 in`, the exact model gives `Ag = 33.137 in2`, `I = 1752.706 in4`, `w = 6.420 in`, and `Fa = Fy`; all common quantities agree within 0.25%. Final `M` is not compared because the worksheet is combined-stress, direction-specific and ASCE 48-11 | User-uploaded `PolygonCapacity.xlsx`, https://www.scribd.com/document/438722543/PolygonCapacity-xlsx; Appendix coefficients cross-checked against ASCE/SEI 48-19 Fig. B-4 | Pass for common subcalculations only, 2026-08-14; not a complete ASCE 48-19 worked-example reproduction |
| `MONO-POLYGON-EXACT-08` | `MONO-POLYGON-MOMENT-01` | 8-sided, `Do = 900 mm`, `t_d = 8 mm`, `ri = 24 mm`, `fy = 350 MPa` | Independent closed form gives `w = 346.283 mm`, `Z_min = 5.105051 x 10^6 mm3`, `lambda = 1.810755`, `Fa = 322.4106 MPa`, `M = 1645.9227 kN.m`; Reduced stress branch | Closed-form regular-polygon inertia independent of production vertex integration plus automated comparison | Pass, 2026-08-14 |
| `MONO-POLYGON-EXACT-16` | `MONO-POLYGON-MOMENT-01` | 16-sided, `Do = 1200 mm`, `t_d = 10 mm`, `ri = 30 mm`, `fy = 350 MPa` | Independent closed form gives `w = 222.782 mm`, `Z_min = 11.103921 x 10^6 mm3`, `lambda = 0.931963`, `Fa = 350 MPa`, `M = 3886.3724 kN.m`; Full yield stress branch | Closed-form regular-polygon inertia independent of production vertex integration plus automated comparison | Pass, 2026-08-14 |
| `MONO-PLATE-FY-BOUNDARIES-01` | `MONO-PLATE-FY-01` | AS/NZS 3678 grades at exact `8 / 12 / 20 / 50 / 80 / 150 / 200 mm` limits, immediately-above cases, `t < 4.5 mm`, `t > 200 mm`, unsupported Grade 450 thickness and unknown grade | Table 8 values selected at exact inclusive upper bounds; next bin selected immediately above; unsupported cases rejected | Visual table transcription plus automated test | Pass, 2026-07-27 |
| `MONO-THICKNESS-BASIS-01` | `MONO-CHS-MOMENT-01`; `MONO-PLATE-FY-01`; `MONO-MASS-01` | `t_nom = 10 mm`, `t_d = 8 mm` | Material lookup and theoretical mass use `t_nom`; section properties and resistance use `t_d`; `t_d > t_nom` is rejected | Automated calculation and browser state tests | Pass, 2026-07-28 |
| `MONO-POLYGON-GEOMETRY-01` | `MONO-POLYGON-MOMENT-01` | 4-sided 1000 mm across-flats, 10 mm wall; 8-sided AF/AC equivalent pair; Appendix B inertia coefficients for 4/6/8/12/16 sides | Square annulus matches exact area and inertia; AF/AC properties agree; exact inertia remains within 0.2% of each Appendix B approximation | Independent closed-form and Appendix B checks plus automated test | Pass for geometry, 2026-07-27 |
| `MONO-POLYGON-FLAT-WIDTH-01` | `MONO-POLYGON-MOMENT-01` | 8-sided `Do = 1000 mm`, `t = 10 mm`, actual `ri = 30 / 60 mm` | Appendix B uses `D = Do - t` and `w = tan(pi/8)(D - t - 2BR) = tan(pi/8)(Do - 2t - 2BR)`; `BR = 30 mm` and capped `BR = 40 mm`; missing radius rejected | Independent Appendix B arithmetic plus automated test | Pass, 2026-08-14 |
| `MONO-POLYGON-BOUNDARIES-01` | `MONO-POLYGON-MOMENT-01` | 4-, 6-, 8-, 12- and 16-sided prescribed branch limits and immediate out-of-range cases | Exact limits return the prescribed `F_a`; immediately above each upper limit returns `Not checked`; `M = F_a I/c_max = F_a Z_min` | Visual formula transcription plus automated branch test | Pass, 2026-07-27 |
| `MONO-RESISTANCE-MONOTONIC-01` | `MONO-CHS-MOMENT-01`; `MONO-POLYGON-MOMENT-01` | Circular categories `LW/HW/CF/HR/SR` and regular polygons `4/6/8/12/16`; `fy = 250/350/450 MPa`; fixed `t = 10 mm`; sampled outside dimensions | Resistance is non-decreasing with outside dimension throughout each implemented valid calculation range | Automated dense parameter sweep | Pass, 2026-07-28 |
| `MONO-POLYGON-PAGE-01` | `MONO-POLYGON-MOMENT-01` | Start from the editable 508 x 6.4 mm circular example; select 8-sided regular polygon with `r_i/t_nom = 1.5` and `fy = 350 MPa` | Browser base `M = 450.4 kN.m`; independent exact regular-polygon reconstruction agrees with production; polygon combined stress remains `Not evaluated`; missing radius and out-of-range stations fail closed | Independent arithmetic, automated reproduction and desktop/phone browser-state checks | Pass, 2026-08-07 |
| `MONO-MASS-CONSTANT-01` | `MONO-MASS-01` | Constant and linearly tapered CHS shells; two 10 m shells with 2 m installed overlap | Constant `m = rho A L`; tapered exact linear-area mass and centroid; overlap does not subtract physical steel | Independent equations plus automated test | Pass, 2026-07-27 |
| `MONO-SLIP-SCREEN-01` | `MONO-SLIP-OVERLAP-01` | Constant CHS, tapered lower-shell overlap and polygon cases; actual-installed boundary | `D_ins,max` is the maximum outer-profile inscribed-circle diameter over both shells in the overlap region; `L_o,design = 1.5D_ins,max`; `L_o,constructed = 1.35D_ins,max`; local joint capacity `Not evaluated` | Independent arithmetic plus automated test | Pass, 2026-07-27 |

## Reference Folder Snapshot

| Source | Local file | Pack status | Current use |
| --- | --- | --- | --- |
| AS 4100:2020 | `AS4100.pdf` | 233 pages, 227 text pages, 97% coverage; monopole Cl. 5.2, 6.1-6.2 and 8.1-8.3.2 visually checked | Bolt, weld, beam, axial member; circular monopole moment and compression/bending section-capacity intercepts |
| AS/NZS 3678:2016 | `AS3678.pdf` | 45 pages, 45 text pages, 100% coverage; Table 8 visually checked on PDF page 24 / printed page 21 | Default steel monopole fabricated-plate `fy` lookup |
| AS/NZS 1163:2016 incorporating Amd 1:2017 | `AS1163.pdf` | 57 pages, 48 text pages, 84% coverage; Table 7 visually checked on PDF page 24 / printed page 21 | Reference-only supplied CHS grades; not applied to tapered fabricated shells |
| AS/NZS 7000:2016 | `AS7000.pdf` | 305 scanned pages, no searchable text; Appendix K printed pages 170-171 visually checked | Steel monopole source routing and slip-overlap geometric screen |
| ASCE/SEI 48-19 | `ASCE_SEI_48-19_User_Provided_Excerpts/` | Readable screenshots: Chapter 5 pp. 9-11, Appendix A p. 59, Appendix B pp. 61-62, Commentary C5 pp. 33-37; pure-bending and Cl. 5.2.6 combined-stress pages visually checked | Foreign-standard `For Review` polygon pure bending; combined stress source-audited but not implemented; not complete ASCE 48 compliance |
| AS 3600:2018 incorporating Amd 1 and Amd 2 | `AS3600.pdf` | 273 pages, 269 text pages, 99% coverage | Concrete pad section; Rebar Connection Check |
| AS/NZS 4671:2019 | External licensed Standard / supplier-aligned data table | Nominal bar data transcribed into `research/rebar-lap/rebar-data.csv` | Reo Lapping bar diameter and nominal area |
| AS 5216:2026 | External licensed Standard / Standards Australia publication record | Current Australian PIR / fastening design boundary; published 10 April 2026. Licensed full text is not present in the local verified source set | Reo extension/PIR scope boundary only; no AS 5216:2026 product-capacity equation is implemented or labelled checked |
| AS/NZS 1170.2:2021 | `AS11702-2021.pdf` | 131 pages, 128 text pages, 98% coverage | Wind Site Draft exposure suggestions |
| AS 2159:2009 | `AS2159_2009.pdf` | 97 pages, 97 text pages, 100% coverage | Screw Piles Selector design, installation, serviceability, durability and testing boundary |
| AS 1726:2017 | `AS1726_2017.pdf` | 81 pages, 81 text pages, 100% coverage | Screw Piles Selector geotechnical investigation and ground-model context |
| AS 1101.3:2026 | `AS 11013-2026.pdf` | 101 image pages; visually accessible licensed copy | Current weld symbol legend; source-redrawn schematic geometry checked against Figs. 5.1, 5.2, 5.8-5.14, 6.1-6.3, 7.5 and 7.27 |
| AS/NZS 1554.1:2014 | `4.1a+AS1554-1-2014.pdf` | 125 pages, 125 text pages, 100% coverage | Weld category / WPS / inspection context |
| AS/NZS 1554.3:2014 | `4.2+AS1554-3-2014.pdf` | 78 pages, 0 text pages, OCR needed | Do not use as searchable source until OCR/visual check |
| ASI Simple Connections 2020 | `5+SSC 2020.pdf` | 103 pages, 102 text pages, 99% coverage | Weld metal and parent metal summary tables |
| InfraBuild hot-rolled catalogue 2019 | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | 35 pages, 34 text pages, 97% coverage | UB/UC, PFC, equal angle, rods catalogue basis |
| OneSteel hot-rolled catalogue 8th edition | `Hot-rolled-and-structural-steel-products_8th-edn.pdf` | 35 pages, 34 text pages, 97% coverage | Secondary historical catalogue reference |
| Orrcon National Product Catalogue 2024 | `Orrcon-National-Product-Catalogue-2024.pdf` | 40 pages, 39 text pages, 98% coverage | CHS D/t and grade availability |
| Austube DCT Hollow Sections 2013 | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | 180 pages, 180 text pages, 100% coverage | CHS moment and compression section-capacity reproductions |
| Steel Structures Design Manual to AS 4100 | `Steel Structures Design Manual to AS 4100.pdf` | 243 pages, 243 text pages, 100% coverage | Secondary explanatory reference only |

## Web Tab Source Matrix

| Tab | Item | Source document | Located evidence | Status |
| --- | --- | --- | --- | --- |
| Bolt | Capacity factor `phi` for bolts and ply bearing | `AS4100.pdf` | AS 4100 Table 3.4 visually checked on PDF page 47 | Visual checked |
| Bolt | Bolt ultimate tensile strength by diameter | `AS4100.pdf` | AS 4100 Table 9.2.1 and Note 2 visually checked on PDF page 131; property class 8.8 bolts below 16 mm use `fuf = 800 MPa` | Visual checked; M10 and M12 8.8/S use 800 MPa |
| Bolt | Bolt shear capacity, N/X planes, `k_rd` and bolted-lap `k_r` | `AS4100.pdf` | AS 4100 Cl. 9.2.2.1 and AS 4100 Table 9.2.2.1 visually checked on PDF pages 131-132; for 10.9 mixed N/X planes, `k_rd = 0.83` multiplies the complete parenthesised area term | Visual checked; bolted-lap `k_r` is tabulated in AS 4100 Table 9.2.2.1 and is separate from welded-lap `k_r` in AS 4100 Table 9.6.3.10(B) |
| Bolt | Bolt tension capacity | `AS4100.pdf` | AS 4100 Cl. 9.2.2.2 visually checked on PDF page 132 | Visual checked |
| Bolt | TF slip resistance | `AS4100.pdf` | AS 4100 Cl. 9.2.3.1 visually checked on PDF page 134 | Visual checked |
| Bolt | TF combined slip interaction | `AS4100.pdf` | AS 4100 Cl. 9.2.3.3 visually checked on PDF page 135; includes `Ntf = Nti` context; the web check uses separately entered serviceability slip actions rather than reusing strength actions | Visual checked; action separation is a UI safety boundary |
| Bolt | Minimum bolt tension `Nti` | `AS4100.pdf` | AS 4100 Table 15.2.2.2 visually checked on PDF page 192 for M16/M20/M24/M30/M36: 8.8 = 95/145/210/335/490 kN, 10.9 = 130/205/295/465/680 kN | Visual checked |
| Bolt | Minimum pitch | `AS4100.pdf` | AS 4100 Cl. 9.5.1 visually checked on PDF page 137; centre-to-centre pitch shall be at least `2.5 d_f` | Visual checked |
| Bolt | Maximum pitch | `AS4100.pdf` | AS 4100 Cl. 9.5.3 visually checked on PDF page 138; general centre-to-centre limit is the lesser of `15 t_p` and 200 mm, where `t_p` is the thinner connected ply; special cases (a) and (b) are not auto-applied | Visual checked |
| Bolt | Minimum edge distance | `AS4100.pdf` | AS 4100 Cl. 9.5.2 and Table 9.5.2 visually checked on PDF page 138; multipliers are `1.75df` for sheared or hand flame-cut edges, `1.50df` for rolled plate/flat bar/section with machine-cut, sawn or planed edges, and `1.25df` for a rolled edge of rolled flat bar/section. Standard-hole `e` is bolt-centre to ply edge; non-standard-hole `e` is the nearer hole-edge distance to ply edge plus `df/2` | Visual checked; production helper and M16/M24 regression tests lock the three table categories |
| Bolt | Effective edge distance `a_e` | `AS4100.pdf` | AS 4100 Cl. 9.2.2.4 defines `a_e` as the minimum distance from the hole edge to the ply edge, measured in the force direction, plus half the bolt diameter; the ply edge includes an adjacent bolt-hole edge | Visual checked on PDF page 133; direct project drawing input, not geometrically derived or verified by the web tool |
| Bolt | Optional straight-section net area | `AS4100.pdf`; `bolt-integrity.js`; `tests/bolt-integrity.test.js` | AS 4100 Cl. 7.2, Cl. 9.1.9(b) and Cl. 9.1.10; the supported automatic path is limited to `Ag = b tp` and `An = Ag - nh dh tp`, where `nh` is holes crossed by the identified critical section | Straight transverse section only; staggered holes, slots, multiple candidate sections and other topology-dependent paths remain manual |
| Bolt | Equal-load connected-ply group aggregation | `AS4100.pdf` | Per-bolt bearing and edge limits are from AS 4100 Cl. 9.2.2.4; group relation uses the stated derived assumption `V_i* = V*/n`, giving `phi Vb,group = n min(phi Vb,full, phi Vb,edge)` | Derived equal-action model; eccentric and non-uniform bolt-force distributions excluded |
| Bolt | Two-ply full-bearing and edge-distance selection | `AS4100.pdf` | The user explicitly adopts identical connected plies or checks each ply independently to AS 4100 Cl. 9.2.2.4; the page reports the full-bearing and user-entered `a_e` edge-distance branches of design bearing capacity separately, each using the lower active-ply group value | Derived governing selection; no load redistribution between plies; entered `a_e` is not geometrically verified and does not generate or verify overlapping tear-out or block-shear paths |
| Bolt | Optional connection-component section tension | `AS4100.pdf` | AS 4100 Cl. 9.1.9(b) visually checked on PDF page 128 and Cl. 7.2 visually checked on PDF page 112; `phi Nt = 0.90 min(Ag fyc, 0.85 kt An fuc)` | Visual checked; `Ag`, `An`, `fyc` and `kt` are manual critical-component inputs |
| Bolt | Optional connection-component block shear | `AS4100.pdf`; [ASI TN013 Block Shear](https://www.steel.org.au/Membership/media/Australian-Steel-Institute/Tech%20Notes/TN013-BlockShear.pdf) | AS 4100 Cl. 9.1.9(e) visually checked on PDF page 129; ASI TN013 example reproduced using the governing Mode B path (`Agv = 1050 mm2`, `Anv = 720 mm2`, `Ant = 1200 mm2`, `fyc = 320 MPa`, `fuc = 440 MPa`, `kbs = 1.0`) to obtain `phi Rbs = 538.56 kN`, matching the published rounded 539 kN | Formula and reference example checked; areas are manual and all plausible paths must be reviewed outside the tool |
| Bolt | Detailing adoption warning | `AS4100.pdf` | Applicable minimum pitch, general maximum pitch and active-ply minimum edge-distance statuses are evaluated from the cited detailing clauses/table | Derived UI safety rule: any FAIL gives an inline input status and a visible warning below the primary capacity result; `/TF` slip also reports `NON-COMPLIANT` |
| Bolt | Connected-ply and filler-plate boundary | `AS4100.pdf` | The lightweight bearing workflow is limited to a single-shear, two-ply connection; AS 4100 Cl. 9.2.2.5 filler-plate reduction remains outside the implemented formula | Explicit exclusion; multi-ply bearing distribution and filler-plate reduction require separate assessment |
| Weld | Weld capacity factor and direct weld capacity | `AS4100.pdf` | AS 4100 Table 3.4 visually checked on PDF page 47; AS 4100 Cl. 9.6.3.10 visually checked on PDF page 147 | Visual checked |
| Weld | CPBW, IPBW and compound-weld capacity boundaries | `AS4100.pdf` | AS 4100 Cl. 9.6.2.7 visually checked on printed page 129; AS 4100 Cl. 9.6.5.2 visually checked on printed page 136 | IPBW uses the fillet-weld method with specified design throat; CPBW follows weaker joined-part capacity; compound throat requires actual total weld cross-section. CPBW and compound therefore return Not evaluated in the quick page |
| Weld | Welded lap reduction `k_r` | `AS4100.pdf` | AS 4100 Table 9.6.3.10(B) visually checked on PDF page 148; table length `l_w` is in metres | Visual checked |
| Weld | Weld metal strengths `f_uw` | `AS4100.pdf`; `5+SSC 2020.pdf` | AS 4100 Table 9.6.3.10(A) visually checked on PDF pages 147-148; ASI Simple Connections 2020 Table 2.14 visually checked on PDF page 19 | Visual checked |
| Weld | Parent metal screen values | `5+SSC 2020.pdf` | ASI Simple Connections 2020 Tables 2.15 and 2.16 visually checked on PDF pages 20-21; Grade 300 flat bar / sections use `f_up = 440 MPa` | Visual checked |
| Weld | Common weld and supplementary symbols | `AS 11013-2026.pdf` | AS 1101.3:2026 Figs. 5.1-5.2 visually checked on PDF page 14; arrow / other / both-side placement, tail, site weld and complete-penetration symbols checked on PDF pages 18-21; backing-weld application checked on PDF page 56 | Visual checked against current edition |
| Steel Monopole | Circular section moment capacity, `phi Ms` | `AS4100.pdf` | AS 4100:2020 Cl. 5.2 and Table 5.2 visually checked on PDF pages 67-69; exact hollow-circle geometry is derived from entered `D` and design thickness `t_d` | For Review; pure calculations, branch boundaries, invalid input and default browser result checked 2026-07-27 |
| Steel Monopole | Circular compression and bending capacity intercepts | `AS4100.pdf`; Austube DCT Hollow Sections 2013 | AS 4100:2020 Cl. 5.2, Cl. 6.2 and Cl. 8.3.2 visually checked; Austube 508.0 x 6.4 CHS published `Ag`, `kf` and `phi Ms` reproduced | For Review; section-capacity intercepts only; no actions, utilisation, `Nc`, second-order or load-combination calculation |
| Steel Monopole | Regular polygonal permitted bending moment, `M` | ASCE/SEI 48-19 excerpts | Cl. 5.2.3.2.1, Table 5-1, Cl. 5.2.5 and Appendix B screenshots visually checked; exact sharp-corner geometry and project `r_i/t_nom` input used | For Review foreign-standard path; isolated from the AS 4100 circular result |
| Steel Monopole | Prescribed slip-overlap length | `AS7000.pdf` | AS/NZS 7000:2016 Appendix K9, printed page 171 visually checked: design minimum `1.5` times the largest circle inscribed within the outside profiles being joined; constructed minimum `1.35` times that diameter | Visual checked as a geometric screen only; fit-up, tolerances, jacking force and joint resistance are not evaluated |
| Steel Monopole | Theoretical steel mass and centre of gravity | Entered geometry | Exact section area integrated over each shell region using `rho = 7850 kg/m3`; no joint mass is added at an overall-profile thickness boundary, while both shells are counted through a physical overlap | Derived; excludes fittings, coatings and appurtenances |
| Beam | Section moment capacity `phi Ms` | `AS4100.pdf` | AS 4100 Cl. 5.2.1 and AS 4100 Cl. 5.2.2 to Cl. 5.2.6 visually checked on PDF pages 67-69 | Visual checked |
| Beam | Web shear capacity `phi Vv` | `AS4100.pdf` | AS 4100 Cl. 5.11.4 and AS 4100 Cl. 5.11.5 visually checked on PDF pages 86-88 | Visual checked |
| Beam | Shear-bending interaction | `AS4100.pdf` | AS 4100 Cl. 5.12.3 visually checked on printed pages 76-77: `Vvm = Vv` for `M* <= 0.75 phi Ms`; otherwise `Vvm = Vv[2.2 - 1.6M*/(phi Ms)]` for `M* <= phi Ms`, with `V* <= phi Vvm`. The demand check fails immediately when `M* > phi Ms`; it does not pass through an unavailable reduced shear capacity | Visual checked; exact reduced-method equation and over-moment regression test implemented |
| Beam | UB/UC catalogue values | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | Universal Beams and Universal Columns visually located on PDF pages 12-15; embedded UB/UC rows checked against OneSteel / InfraBuild Tables 9-12. The Beam dataset includes direction-specific minor-axis `I`, `Z`, `S`, `Ze` and class values for 28 UB and 13 UC designations | Embedded UB/UC major- and minor-axis rows checked |
| Beam | Expanded family workflow with family-local custom dimensions | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`; `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf`; `AS4100.pdf` Section 5 | Catalogue family and direction states are implemented for UB, UC, PFC, CHS, RHS, SHS, EA and Round Bar. An Axial-style dimensions override remains inside each family and automatically derives ideal gross geometry. Custom UB/UC, PFC x-x, CHS, RHS/SHS and Round Bar use reviewed family-specific section-class and effective-modulus paths. Custom PFC Load A/B and EA Load A/B/C/D fail closed as `Not evaluated` | Local expanded workflow implemented; publication remains subject to the Beam release gates |
| Beam | PFC and EA direction capacity | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | Tables 15-16, PDF page 17, provide all 10 PFC property, centroid `xL`, shear-centre `xO`, strength, `Zex`, Load A `Zey` and Load B `Zey` rows. Tables 19-20, PDF pages 19-20, provide all 46 accepted EA rows, 45-degree principal-axis `I`, `Z`, `S`, and Load A/B/C/D `Ze` values. Load A/C is mapped to x; Load B/D is mapped to y. The UI preserves the manufacturer Load key beside `Ze`, `phi Ms`, demand basis and calculation steps | Checked product-table direction rows and diagrams; complete accepted EA directory enabled |
| Beam | CHS/RHS/SHS section moment data | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | Tables 3.1-1 to 3.1-6, PDF pages 28-38, were extracted into 288 unique family/designation/grade rows: CHS 73, RHS 101 and SHS 114. Representative CHS, RHS and SHS property/capacity rows are asserted in `tests/beam-section-data.test.js` | Checked grade-specific design-property rows; product availability requires supplier confirmation |
| Beam | Section shear | `AS4100.pdf`; `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`; `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | UB/UC/PFC `x-x` uses separate `fy,w`, explicitly adopts `dp = d1`, calculates `Aw = dp tw`, reports web slenderness and `alpha_v`, and applies AS 4100 Cl. 5.12.3. CHS uses AS 4100 Cl. 5.11.4 with `Ae = Ag` for the unperforated catalogue path. Catalogue RHS/SHS follows Austube Section 5.2.2.4 on PDF page 63: two-web `Aw`, direction-specific clear depth, web-slenderness reduction and the lesser of uniform and Cl. 5.11.3 non-uniform shear; Austube Section 5.2.4 on PDF page 66 supports Cl. 5.12.3 interaction | Reviewed family-specific shear scope; unsupported paths fail closed |
| Beam | Project / legacy yield-strength override | `AS4100.pdf`; `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`; `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | The checked catalogue grade supplies editable defaults. UB/UC/PFC keep separate `fy,m` and `fy,w`; InfraBuild Table 16 explicitly provides different flange/member and web strengths for some PFC sizes and grades. A `fy,m` override regenerates AS 4100 plate slenderness, class, `Ze`, compression-only `kf` coordination and moment capacity for UB/UC, PFC `x-x`, CHS, RHS, SHS and Round Bar. A `fy,w`-only override updates web shear without invalidating the catalogue moment row. PFC asymmetric Load A/B and EA Load A/B/C/D moment fail closed after `fy,m` override because the required direction-specific effective-section derivation is not implemented | Regression and browser checks completed 2026-07-24: 380PFC 300PLUS defaults `fy,m/fy,w = 280/320 MPa`; `fy,m = 300 MPa` changed `phi Ms` from 238.4 to 255.4 kNm without changing shear; `fy,w = 360 MPa` changed `phi Vv` from 596.2 to 670.7 kN without changing moment; Load A returned `Not evaluated`; reset restored catalogue values |
| Beam | AS 4100:2020 catalogue compatibility | `AS4100.pdf`; `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`; `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | AS 4100:2020 Cl. 5.2, Table 5.2, Cl. 6.2.2-6.2.4 and Table 6.2.4 were visually checked. Austube Part 3 Sections 3.2.2.1-3.2.2.3 confirm the CF residual-stress basis, `Ze` method and `kf = Ae/Ag`; InfraBuild capacity tables provide the adopted hot-rolled product rows. `beam-section-reconciliation.js` checks 981 family / grade / direction rows: independent geometry for UB/UC class and `Ze`, PFC major-axis class and `Ze`, CHS and non-slender RHS/SHS; the AS 4100 permitted effective-cross-section result is retained for slender flat hollow rows; asymmetric PFC and all 46 EA rows are identified from the published direction-specific `Ze` interval; `kf` remains a Cl. 6.2 compression property and is not used in `Ms` | Catalogue compatibility gate closed locally; all 981 rows pass `tests/beam-section-reconciliation.test.js`; Beam remains `For Review` for its quick-reference scope and exclusions |
| Beam | Round Bar section moment | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`; `AS4100.pdf` | Checked round-bar diameter / mass and diameter-dependent strength rows are combined with solid-circle geometry, `Ze = min(S, 1.5Z)` and AS 4100 Cl. 5.2 | Geometry-derived capacity from checked product identity / strength rows |
| Section Properties | Canonical catalogue/custom geometry plus product, material and checked standard-dependent attributes | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`; `Orrcon-National-Product-Catalogue-2024.pdf`; `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf`; `AS4100.pdf` Cl. 2.2.4; `AS36791.pdf` Tables 14-15; AS/NZS 1163:2016 checked product-grade data; shared `sectionProductDirectory`, `section-geometry.js` and `steel-materials.js` | The canonical directory contains 28 UB, 13 UC, 10 PFC, 74 CHS, 89 RHS, 88 SHS, 46 EA and 26 Round Bar sizes. Section Properties renders these arrays directly; Beam and Axial Member reuse the same arrays and may filter only by implemented calculation scope. The CHS directory contains all 73 distinct Austube Tables 3.1-1/2 rows (`D = 26.9–508 mm`, `t = 2.0–12.7 mm`) plus the separately checked Orrcon `60.3 x 3.5 CHS` geometry-only row; wider availability-only sizes remain excluded until row-level properties are verified. Austube CHS/RHS/SHS mass, area, axis properties and grade-dependent design attributes remain exact product-table values; centroid, symmetry and nominal clear-wall references are separately labelled derived. EA geometry values were checked against Table 19 (principal x/y dimensions and properties) and Table 21 (horizontal n / vertical p properties); Table 20 supplies all 46 rows of grade-specific `fy`, `kf` and Load A/B/C/D `Ze`. Equal Angle compactness is explicitly labelled as derived from the published `Ze` interval, and PFC classification reuses the checked direction-specific AS 4100 reconciliation. CHS rows coordinate by numeric `D` and `t`; grade-specific table availability is preserved and the unmatched 60.3 x 3.5 CHS geometry states that no checked design row exists. Entered ideal geometry supplies directional elastic moduli, product-of-inertia, principal transforms and plastic moduli from equal-area plastic neutral axes. Material references retain the checked AS 4100, AS/NZS 3679.1 and AS/NZS 1163 bases. Custom material inputs fail closed, Aw/Awx/Awy remain geometric rather than effective shear areas, circular zero properties are interpreted, and every result states its basis | Mixed catalogue/standard/derived/project-input basis; Draft combined workflow |
| Axial Member | Section compression capacity | `AS4100.pdf` | AS 4100 Cl. 6.2.1 visually checked on PDF page 100; `Ns = kf An fy` confirmed. `Ag` is numerically equivalent only where the clause permits gross area or the section is unperforated so `An = Ag` | Visual checked and corrected 2026-07-29 |
| Axial Member | Effective area and section form factor | `AS4100.pdf` | AS 4100 Cl. 6.2.2 to Cl. 6.2.4 and Table 6.2.4 visually checked on PDF pages 100-102; flat-element effective widths and CHS effective diameter are recalculated for the active `fy` and geometry | Catalogue values are retained only for an unchanged checked grade after a `0.002` reconciliation; override paths use the calculated unrounded value |
| Axial Member | Member buckling reduction | `AS4100.pdf` | AS 4100 Cl. 6.3.3 and AS 4100 Tables 6.3.3(A/B/C) visually checked on PDF pages 103-106 | Visual checked |
| Axial Member | Tension gross yielding / net fracture | `AS4100.pdf` | AS 4100 Cl. 7.2 visually checked on PDF page 112 | Visual checked |
| Axial Member | `k_t` values | `AS4100.pdf` | AS 4100 Table 7.3.2 visually checked on PDF page 113 | Visual checked |
| Axial Member | CHS current-product context | `Orrcon-National-Product-Catalogue-2024.pdf` | CHS tables visually checked on PDF pages 10-12; includes 114.3 CHS and C250L0/C350L0 context | Current-product geometry and availability context only; Axial design properties use the accepted Austube row |
| Axial Member | CHS compression method | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | Part 6 compression method and CHS capacity table context visually checked on PDF pages 112-117 | Visual checked for method context; table capacities are not embedded in the current quick screen |
| Axial Member | PFC / EA / Round Bar catalogue values | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | OneSteel / InfraBuild Tables 15 and 16 for PFC, OneSteel / InfraBuild Tables 19-21 for EA, OneSteel / InfraBuild Table 3 for Rounds and OneSteel / InfraBuild Table 38 for round-bar strength checked on 2026-07-02 | Embedded PFC / EA / Round Bar rows checked |
| Concrete | Stress block and bending section theory | `AS3600.pdf` | AS 3600 Cl. 8.1.3 and AS 3600 Cl. 8.1.5 visually checked on PDF pages 113-114; the section schematic identifies `a = gamma x`, locates `C_c` at `a/2` from the compression face and uses `T = A_s f_s` for its representative layer | Visual checked; figure generated by `asset_generators/generate_concrete_pad_figure.py` |
| Concrete | Capacity factor | `AS3600.pdf` | AS 3600 Table 2.2.2 visually checked on PDF pages 38-39 | Visual checked |
| Concrete | One-way shear screen | `AS3600.pdf` | AS 3600 Cl. 8.2.1.9, AS 3600 Cl. 8.2.3 and AS 3600 Cl. 8.2.4 visually checked on printed pages 117-119; AS 3600 Table 2.2.2 checked on printed page 36 | Simplified method limited to stated Cl. 8.2.4 scope; detectable out-of-scope inputs return Not evaluated; `phi = 0.70` where web crushing limits strength |
| Concrete | Reinforcement bar areas | AS/NZS 4671:2019 Table 7.5(A); [InfraBuild Reinforcing Product Guide](https://www.infrabuild.com/resources/product-guides-resources/infrabuild-reinforcing-product-guide/) and [current Class N product page](https://www.infrabuild.com/reinforcing/products/reinforcing-bar/deformed-reinforcing-bar-rebar-class-n/) | N10/N12/N16/N20/N24/N28/N32/N36/N40 nominal areas = 78.5/113/201/314/452/616/804/1020/1260 mm2 per bar; current Class N range is 500 MPa and N40 is listed on request | AS/NZS 4671 nominal areas are calculation data; supplier product data controls mass and availability only. Legacy Y designations require project verification |
| Reo Lapping | Basic tension development length | `AS3600.pdf` | AS 3600 Cl. 13.1.2.2 visually checked on PDF page 188 and Figure 13.1.2.2 on PDF page 189; equation, lower limit, `k1`, `k2`, `k3`, 65 MPa concrete-strength cap, epoxy/lightweight multipliers and separate straight versus hook/cog `cd` geometry confirmed | Visual checked; standalone development and lap-mode development must remain separate calculation branches. Hook/cog development uses `cd = a/2` for wide members and `cd = min(a/2, c1)` for narrow members before the Cl. 13.1.2.6 factor |
| Reo Lapping | Refined tension development length | `AS3600.pdf` | AS 3600 Cl. 13.1.2.3 visually checked on PDF pages 190-192; `K`, `lambda`, `k4`, `k5`, minimum transverse reinforcement, `k3 k4 k5 >= 0.7` and the Figure 13.1.2.3 `nf = 0`, `nbs = 1`, `K = 0.05` arrangement confirmed | Visual checked; `nf` is the number of fitment bars within one longitudinal spacing or pitch that the splitting crack crosses, not a total or generic leg count. Confinement credit requires project-verified bar position and reinforcement within the adopted length |
| Reo Lapping | Less-than-yield development length | `AS3600.pdf` | AS 3600 Cl. 13.1.2.4 visually checked on PDF page 192; `Lst = Lsy.t sigma_st/fsy` and `12db` minimum confirmed | Visual checked; a positive project-confirmed `sigma_st <= fsy` is required. Missing or zero stress leaves the selected reduced reference unavailable; the page does not derive stress from a fixed `phi` |
| Reo Lapping | Tension lap eligibility and length | `AS3600.pdf` | AS 3600 Cl. 13.2.1 visually checked on PDF pages 195-196; Cl. 13.2.2 and Figure 13.2.2 visually checked on PDF page 196. Eligibility includes the Cl. 13.2.1(a) requirement that the splice be required or permitted by project drawings/specification; `k7`, wide/narrow equations, `sb <= 3db`, tension-tie restriction and bar-size limit were checked | Visual checked; `k7` is derived automatically as 1.00 only when both project qualifications are confirmed, otherwise 1.25. Cl. 13.2.2 explicitly uses `Lsy.t` from Cl. 13.1.2.1, so the lap is not continuously scaled by partial utilisation or the Cl. 13.1.2.4 stress ratio. Same-condition schedules are limited to Basic/default `k7` and do not propagate Refined or qualified-reduction data across sizes |
| Reo Lapping | Nominal 500N bar diameter and area | AS/NZS 4671:2019 Table 7.5(A); `research/rebar-lap/rebar-data.csv` | N10 to N50 nominal diameter and area rows recorded; calculation is limited to N10 to N40 | Data register checked; N10 to N40 are calculator selections. N50 may remain only in the reference table as an older-guide item outside calculator scope; licensed Standard remains governing |
| Reo Lapping | Supplier mass, metres per tonne and product context | InfraBuild *Reinforcing Product Guide*, fourth edition, information current April 2022; InfraBuild *Construction Solutions Product Guide* 2021; current InfraBuild Class N product page | Supplier mass and ordering values are stored separately from nominal design area. The current page lists N10-N40, with N40 on request; the April 2022 Product Guide also lists N50 on request, while the current page omits it. | Product reference only; not used in lap calculation. N50 remains outside calculator scope. AS/NZS 4671:2019 and project certification remain the material-data control. |
| Reo Lapping | Staggered splice source context | `AS3600.pdf` | AS 3600 Figure 13.2.2 visually checked on PDF page 196; 50% staggered splice arrangement shows adjacent splice ends separated by at least `0.3 Lsy.t.lap` | Visual checked; retained as source context only. No stagger control or drawing is shown in the lightweight page, and physical stagger does not qualify `k7` |
| Reo Lapping | Standard hook / cog boundary | InfraBuild *Reinforcing Product Guide*, fourth edition, pp. 36-37; historical OneSteel *REODATA 4.0*, pp. 18-24 and 30 | Current InfraBuild guide states that a standard hook/cog provides half the tensile development length for that bar end, measured from the outside, under AS 3600 Cl. 13.1.2.6-13.1.2.7. Historical OneSteel material separates straight-bar lap splicing from hook/cog anchorage. | Supporting interpretation checked; treat hook/cog as an independent cast-in end-anchorage route subject to standard geometry/detailing confirmation, never as a Cl. 13.2.2 lap reduction or `k7` modifier |
| Reo Lapping | Historical lap table context | OneSteel *Reinforcing Products* / AS 3600:2009-era data table | Historical tabulated lap lengths retained as research context only | Historical only; not embedded as current calculation data |
| Rebar Connection | Post-installed reinforcing-bar design boundary | AS 5216:2026; AS 3600:2018; qualified product assessment and actual project report | The applicable external PIR model must be identified: anchor design to the project-nominated AS 5216 edition, or rebar stress development to AS 3600 with a qualified product assessment. The page does not collect or calculate product resistance, edge/spacing, splitting, breakout, installation, approval or interface-transfer design. | Boundary checked; AS 5216/product capacity calculation intentionally excluded. Pad, pedestal and foundation design remain outside scope |
| Rebar Connection | AEFAC TN08 Volume 2 source context | AEFAC TN08 Volume 1; AEFAC TN08 Volume 2, scope and Section 5.5, PDF page 13 | Volume 2 is conditional: moment-resisting PIR connection; used with Volume 1; applicable product prequalification to EAD 332402 supported by the current EAD/ETA assessment; static or quasi-static action scope. Section 5.1 requires steel, concrete-cone and bond-splitting modes to be considered and the lowest resistance to govern. | Visually checked 2026-07-17 and scope decision reviewed 2026-07-18. TN08 applicability, minimum floors and product resistance remain in the external qualified design; no TN08 value or status is calculated by the lightweight page |
| Rebar Connection | PIR reference-depth handoff | AS 3600:2018 Amd 1 and 2, Cl. 13.1.2; current project report; manufacturer software and applicable EAD/ETA | The page returns an expressly labelled AS 3600 full-yield or project-stress reference depth. It collects no product, report or available-depth data and applies no proprietary reduction. | Reference depth only, not a preliminary installation recommendation. Final product, embedment, failure modes, installation controls and available geometry require the current qualified external design |
| Wind Site Draft | Wind region screen | `AS11702-2021.pdf` | AS/NZS 1170.2 Section 3 and Fig. 3.1(A) visually checked on PDF page 37; Tables 3.1(A) and 3.2(A) visually checked on PDF pages 34 and 36 for regional speed / `Md` context | Visual checked for draft coordinate screen only; adopted wind region still requires project review |
| Wind Site Draft | Terrain category definitions and averaging | `AS11702-2021.pdf` | AS/NZS 1170.2 Cl. 4.2 visually checked on PDF page 39; terrain averaging distance `xa` and lag distance `xi` visually checked on PDF page 40 | Visual checked for radial-band draft screen basis only |
| Wind Site Draft | Terrain-height multiplier `Mz,cat` and Region A0 note | `AS11702-2021.pdf` | AS/NZS 1170.2 Table 4.1 and Note 1 visually checked on PDF page 40, including distance-weighted `Mz,cat` averaging context, Region A0 use of `Mz,cat,2` for `z <= 100 m` and `Mz,cat = 1.24` for `100 m < z <= 200 m` | Visual checked for draft screen basis only |
| Wind Site Draft | Topographic multiplier `Mt` and hill-shape multiplier `Mh` | `AS11702-2021.pdf` | AS/NZS 1170.2 Cl. 4.4 visually checked on PDF pages 42-45, including Equations 4.4(1) to 4.4(4), Figs. 4.3 to 4.5 and Table 4.3 | Visual checked for draft suggestion basis only |
| Wind Site Draft | Public terrain evidence resources | OpenStreetMap Overpass API; Overture Maps Buildings; Microsoft Global ML Building Footprints; DEA Land Cover; ABARES CLUM | Resource links are displayed in the Wind Site Draft page as live or future cross-check evidence aids | Draft evidence only; not source verification for adopted `TC` |
| Wind Site Draft | Public elevation evidence resources | Open-Meteo Elevation API; ELVIS / state LiDAR DEM; GA SRTM 1 second DEM; Copernicus DEM | Resource links are displayed in the Wind Site Draft page as live or future cross-check evidence aids | Draft evidence only; not source verification for adopted `Mt` |
| Screw Piles Selector | AS 2159 design, durability and installation boundary | `AS2159_2009.pdf` | Local pack locates definitions and requirements for design action effect, design geotechnical strength, design structural strength, ULS/SLS action effects, pile groups, serviceability movements, steel-pile exposure classification in Cl. 6.5.2 and Tables 6.5.2(A) to 6.5.2(C), durability design in Cl. 6.5.3, installation by screwing, load testing and the dynamic-testing caution for screw piles | Reference context checked for page wording; selector does not calculate AS 2159 geotechnical resistance, structural resistance or durability |
| Screw Piles Selector | AS 1726 ground-model inputs | `AS1726_2017.pdf` | Local pack locates requirements for geotechnical site investigation, geotechnical model development, soil/rock description, groundwater observations and problematic soils including non-engineered fill, organic peat, sensitive clay, expansive soils, liquefiable soils and acid sulfate conditions | Reference context checked for warning parameters; project geotechnical values remain user/supplier inputs |
| Screw Piles Selector | Katana series classes and certificate limitations | `Katana_Australian_CodeMark_Certificate_30096_Rev6_2026.pdf` | CodeMark certificate pack identifies Katana 80 kN, 100 kN, 150 kN and 200 kN screw pile series, AS 2159 / AS 4100 design context, site-testing trigger, very-severe exposure exclusion and non-public Product Statement / Capacity Calculation Worksheet references | Draft preview; series class only, not a row-checked direction-specific resistance table |
| Screw Piles Selector | Katana local lateral and torsion parameters | `Katana_Screw_Lateral_Capacity_Graphs_2025.pdf`; `Katana_Torsional_Capacity_of_Screw_Pile_Paper.pdf`; `Katana_Typical_Pile_Details_Rev_D_2025.pdf`; `University_of_Melbourne_Katana_Pile_Ground_Beam_Report_2022.pdf` | Local packs identify lateral graph context for Katana 80 kN / 150 kN clay and sand cases, lateral dependence on connection rigidity and shaft properties, CHS 76.1 / 88.9 torsional-capacity context and typical pile detail sources | Draft preview; lateral graph values are not embedded and torsion data is warning context only |
| Screw Piles Selector | Katana geometry and expanded series | Katana Screw Pile Performance Guide Rev Z, 01/10/2024, online PDF; not present in local Reference index | Official guide pp. 8 and 12-13 checked for the 40, 80, 100, 150, 200, 250 and 300 kN compression SWL-up-to rows, shaft and helix geometry. CM30096 Rev6 separately confirms current 80, 100, 150 and 200 kN series scope but cites Performance Guide Rev AC and Product Catalogue v4 dated 2025 | Keep the Rev Z rows and current certificate scope separate. The current 2025 product rows remain pending because the certificate-referenced technical documents are not in the local Reference pack |
| Screw Piles Selector | Ideal Foundations screw pier system selection | Ideal Foundations Specifiers Technical Guide v1.2, November 2021, online PDF; not present in local Reference index | Official selection table p. 8 checked for 85, 120, 200, 300 and separate 500 kN rows: 168 x 6.4, 219 x 6.4 and 219 x 8.2 shafts with their corresponding helix/plate options and maximum depths | Official online guide checked; local Reference pack pending. Values are system SWL-up-to ratings, not direction-specific pile resistances |
| Screw Piles Selector | Solidity published pile design-table rows | Solidity *Standard Specifications*, 22 January 2020, online PDF; not present in local Reference index | Official SP01, SP04, SP05, SP09 and SP11 rows checked for S76002, S89015, S114018, S168028 and S219018 shaft/helix geometry, maximum load, maximum table torque, lateral limit, extension code, founding note and durability notes | Official online drawing set checked; local Reference pack pending. Load data are ultimate U.N.O., not SWL or direction-specific compression resistance. Published lateral limits are stated at 1.5 m above competent soil and require static lateral testing. Supplier review remains mandatory |
| Screw Piles Selector | Madewell stocked galvanised screw-pile series | Madewell *Galvanised Screw Piles* price list, August 2025, online PDF; official product pages | Official price list checked for SP-SBH*-G and SP-150KN-*-G product-code families, shaft/helix geometry, stocked lead lengths, extension lengths and galvanised finish | Official online data checked; local Reference pack pending. The supplier 100 kN / 150 kN labels do not state load direction, safety basis, ground conditions or settlement criterion and are excluded from project comparison |
| Screw Piles Selector | Surefoot micro-pile footing range | Surefoot Indicative Capacity Table V8.5, online PDF; not present in local Reference index | Official indicative table checked for S150 4W, T150, S250 8P, S400 12P and S600 16P maximum recommended ratings and the soil/embedment dependency of gravity and uplift capacity | Official online table checked; local Reference pack pending. Listed as an alternative driven micro-pile footing and excluded from the resistance ratio |
| Screw Piles Selector | StopDigging ground screw sheets | StopDigging AU official product-sheet PDFs; not present in local Reference index | Official product sheets checked for length, outer diameter and separate compression/tensile/lateral values for selected SGP, SGC and SGN ground screw models | Official online sheets checked; local Reference pack pending. Light-duty product values require project applicability review |
| Screw Piles Selector | Ground Screws Australia product families | Ground Screws Australia official product range page; not present in local Reference index | Product family page previously identified OS-Series for poles/signage, FCA-Series for solar and C350 steel / Australian engineering certification context | Source_Not_Verified for resistance; product-family prompt only until supplier resistance table is supplied |
| Screw Piles Selector | Helical Piles Australia / HAI engineered pathway | Helical Piles Australia technical page and HAI Engineering Manual online PDF; not present in local Reference index | Manual context previously captured shaft families, helical plate families, torque correlation and project-design method context | Source_Not_Verified for direct Australian resistance selection; use only as project-designed option |
| Screw Piles Selector | Blade Pile public screw-pile range | Blade Pile official screw-piles web page; not present in local Reference index | Official page checked for round/twin-blade and multi-helix product ranges, 76.1 / 88.9 / 114 mm technical specification rows, larger 141 / 168 / 219 / 273 mm project-based sizes and the typical 76.1 mm residential SWL-up-to benchmark | Official online page checked; local Reference pack pending. The 100 kN figure is reference-only and other rows are geometry prompts |
| Screw Piles Selector | Piletech screw-piling range | Piletech official screw-piling web page; not present in local Reference index | Public page identifies shaft range, helix range, multiple helical flights, installation equipment capacity, single-length installation and deeper project capability | Source_Not_Verified in local Reference folder; no row-specific compression, tension or horizontal resistance embedded |
| Screw Piles Selector | Driven Engineering screw-pile product dimensions | Driven Engineering screw-pile product category and screw/helical pile service pages; not present in local Reference index | Public product rows identify 76.1, 88.9, 114, 168 and 219 mm screw-pile geometries with selected helix diameters/thicknesses and lengths | Source_Not_Verified in local Reference folder; dimensions only, not a resistance table |
| Screw Piles Selector | Keller helical/screw pile technique benchmark | Keller official helical/screw piles technique page; not present in local Reference index | Technique page identifies helical flights selected for ground conditions, final torque over the last metre, typical SWL limits for axial/uplift/lateral actions and load-testing confirmation | Source_Not_Verified in local Reference folder; typical benchmark only, project design controls |
| Screw Piles Selector | Minmetals Helicast source prompt | Minmetals Helicast supplier note referenced by user; not present in local Reference index | Prompt captures cast-helix product-family concept and high-torque enquiry pathway | Source_Not_Verified in local Reference folder; supplier data required before resistance use |
| Screw Piles Selector | Soil and pile-group warning basis | `Pile design and construction practice.pdf`; `pile-foundation-analysis-and-design.pdf`; `Craig's Soil Mechanics.pdf`; `Fifteen years of geotechnical limit state design in Australia.pdf` | Reference packs include pile groups, uplift/lateral loading, installation control, load testing, durability, soil classification, groundwater, settlement, ground movement, cyclic loading and liquefaction topics | Explanatory warning context only |
| Screw Piles Selector | Reference-derived calculation driver display | `AS2159_2009.pdf`; `AS1726_2017.pdf`; `Pile design and construction practice.pdf`; `Craig's Soil Mechanics.pdf`; `Katana_Australian_CodeMark_Certificate_30096_Rev6_2026.pdf`; `Katana_Screw_Lateral_Capacity_Graphs_2025.pdf`; `Katana_Torsional_Capacity_of_Screw_Pile_Paper.pdf` | Local reference audit identifies design action effects and SLS limits, axial shaft/base/helix resistance, uplift below active movement zone, lateral head fixity/displacement, soil strength and groundwater, installation torque/testing, durability exposure, pile groups and SLS movement as the main parameters controlling catalogue acceptance | Explanatory parameter display only; not an AS 2159 design engine or row-checked resistance calculation |
| Screw Piles Selector | Optional rectangular pile-group action distribution | `AS2159_2009.pdf`; `Fifteen years of geotechnical limit state design in Australia.pdf`; `Pile design and construction practice.pdf`; `Craig's Soil Mechanics.pdf`; `Katana_Screw_Lateral_Capacity_Graphs_2025.pdf` | AS 2159 Cl. 3.2.2 requires pile and pile-group design action effects, including applicable eccentricities; Cl. 4.4.3.1 requires group/block geotechnical review; Cl. 4.5 requires movement control; Cl. 5.2.2 requires pile bending and tolerance effects. The displayed equations are a derived rigid-pad equilibrium model, not an AS 2159 resistance method | Symmetric rectangular perimeter/full-grid distribution only: vertical identical piles, equal axial stiffness in compression and tension, equal lateral stiffness, centroidal actions and no pad-soil resistance. The action basis and moment/torsion sign convention are stated. Direct horizontal action and torsional components are combined vectorially at each pile. The page reports maximum compression, tension and resultant horizontal pile actions. Manufacturer values are not compared automatically. Project comparison values may be compared only when their source is entered and their basis matches the action basis. Combined axial-horizontal interaction is not assessed. No AS 2159 compliance check, group/block resistance, soil-pile lateral analysis, movement analysis, pile bending/tolerance, cap/head connection, durability, installation or test acceptance |

## Remaining Source Gaps / Row-Level Checks

The primary standard formula pages above have been visually checked. These items remain controlled limitations for the handbook:

- Future InfraBuild / OneSteel rows outside the adopted Beam datasets require row-level numeric checks before being described as checked catalogue data.
- Steel Monopole polygonal formula excerpts are checked and exposed as a foreign-standard `For Review` path. Complete ASCE 48 compliance, Australian adoption, whole-member stability, fabrication acceptance and an independent published worked example remain outside the page.
- Steel Monopole AS/NZS 3678 Table 8 plate defaults are checked and exposed with Manual `fy` as the override path. AS/NZS 1163 Table 7 is checked as reference-only and remains unexposed because the current page models tapered fabricated shells, not supplied standard CHS products.
- Steel Monopole slip joints have only the AS/NZS 7000 Appendix K overlap-length screen in scope. Local joint moment, shear and axial resistance remain `Not evaluated`; overlapping parent-shell section capacities are never added.
- Future PFC / equal angle / rod rows added after 2026-07-02 require row-level numeric checks before being described as checked catalogue data.
- The Axial Member CHS catalogue path reuses the accepted Austube Part 3 grade-specific section-property rows for `Ag`, `r` and `kf`; it calculates AS 4100 member compression independently and does not import Austube member-capacity values.
- AS 4100 Table 6.3.3 `alpha_b` values have been visually checked, but non-default option mapping remains project/member-axis dependent.
- AS 3600 one-way shear is kept as a lightweight screen with visible assumptions. It is not a full shear design engine unless `kv`, reinforcement layout and detailing checks are expanded later.
- Rebar Connection remains `For Review`. The visible workflow follows identity/scope, design check, path-specific inputs, primary reference, optional reduction/refinement and collapsed calculation basis/limitations. Regression checks cover Cl. 13.2.1(a), lower-limit/multiplier ordering, automatic `k7`, Refined candidate-to-adopt reconciliation, pressure-evidence gating, independent straight and standard hook/cog anchorage, displayed hook/cog qualification requirements, cast-in/PIR origin labels, missing/zero/over-yield `sigma_st`, raw/candidate/adopted boundaries, stale-result clearing and dependent-confirmation resets. Same-condition schedules remain unavailable for Refined or qualified-`k7` cases. No lap drawing, product-report form, available-depth comparison or site-fit status is included.
- The actual PIR design method, product assessment, project report and available-geometry verification remain external controls. The page returns only an expressly labelled AS 3600 reference depth and directs the user to the current manufacturer software or qualified project design. The external workflow must identify the project-nominated Standard edition, applicable EAD/ETA or other assessment, product, failure modes, required embedment, installation controls and available geometry. No PROFIS, AS 5216 or proprietary product-capacity result is calculated or verified by the handbook.
- Wind Site Draft uses public OSM, land-cover, building-footprint and DEM data as draft evidence only. Coordinate-derived wind region, `TC` / `Mz,cat` and `Mt` suggestions are not checked or adopted design values until a project-specific site review confirms the wind region, terrain category, topographic cross-section and data currency.
- Screw Piles Selector uses direct supplier and product/system selection for local Katana references plus Ideal Foundations, Solidity, Madewell, Blade Pile, Piletech, Driven Engineering, Keller, Minmetals Helicast, Surefoot, StopDigging, Ground Screws Australia and Helical Piles Australia source prompts. The selected-product view separates non-directional reference loads from published compression, tension and lateral values, then reports geometry, source/load basis and one `Required before adoption` statement. The selector is not a complete AS 2159 design engine. Manufacturer values are not compared automatically in the Optional Check. A project directional comparison requires entered project values, a source reference and a value basis matching the action basis. The Katana Product Statement and Capacity Calculation Worksheet referenced in the CodeMark certificate are not present in the current Reference index. Non-local supplier documents remain pending for local-pack traceability until added and rebuilt.
- AS/NZS 1554.3 currently has 0% text extraction in the generated pack. Treat it as visual-check-only or OCR-needed.

## 2026-06-30 Default Row / Calculation Audit

### InfraBuild UB/UC Default Rows

The current Beam tab defaults were visually checked against `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`.

| App default | Source pages | Checked app values | Status |
| --- | --- | --- | --- |
| 310UB40.4, 300PLUS | OneSteel / InfraBuild Table 9 PDF page 12; OneSteel / InfraBuild Table 10 PDF page 13 | mass 40.4 kg/m; `Ag` 5210 mm2; `d1` 283.6 mm; `tw` 6.1 mm; `Sx` 633 x 10^3 mm3; `Zx` 569 x 10^3 mm3; `fy` 320 MPa; `Zex` 633 x 10^3 mm3; compact; `kf` 0.952 | Row checked |
| 200UC46.2, 300PLUS | OneSteel / InfraBuild Table 11 PDF page 14; OneSteel / InfraBuild Table 12 PDF page 15 | mass 46.2 kg/m; `Ag` 5900 mm2; `d1` 181.4 mm; `tw` 7.3 mm; `Sx` 500 x 10^3 mm3; `Zx` 451 x 10^3 mm3; `fy` 300 MPa; `Zex` 494 x 10^3 mm3; non-compact; `kf` 1.000 | Row checked |

### Default Web Output Check

Default outputs were checked on the local static page at `http://127.0.0.1:8765/?audit=20260630#bolt` and independently recalculated from the app formulas. The Bolt equal-share group row was recalculated and rechecked in the DOM on 2026-07-14 at `http://127.0.0.1:8000/?local=20260714merged#bolt`.

| Tab | Default case | Checked output | Status |
| --- | --- | --- | --- |
| Bolt | M24 8.8/S, N plane, `n = 2`; both plies identical; entered `a_e = 41.0 mm` | shear N 133.4 kN; shear X 186.1 kN; tension 234.4 kN; equal-share group shear 266.8 kN; full-bearing limit 283.4 kN per bolt / 566.8 kN group; edge-distance limit 151.3 kN per bolt / 302.6 kN group; edge-distance limit governs; minimum pitch 60.0 mm; general maximum pitch 150.0 mm; minimum edge distance 42.0 mm | DOM output matched independent calculation; identical bolts, concentric action and equal shear per bolt assumed; entered `a_e` is a drawing-derived project input and the edge-distance bearing limit is not a complete connected-plate resistance |
| Bolt detailing warning and TF slip | `p = 50 mm`; separate second ply `t = 6 mm`; second-ply `e = 30 mm`; M24 8.8/TF with `Vsf* = 100/110 kN` | minimum-pitch FAIL gives an inline FAIL and visible do-not-adopt warning; 6 mm second ply governs at 181.5 kN and `pmax = 90.0 mm`; second-ply edge FAIL gives the same warning; TF slip ratios 0.97 PASS and 1.07 FAIL | Representative DOM states checked locally on 2026-07-29; standard strength results remain capacity-only and TF uses separate bolt-group serviceability actions |
| Bolt strength regression | M10 and M12 8.8/S; one M24 10.9/S bolt with one N and one X shear plane; M24 8.8/S default two-bolt N-plane group | M10/M12 use `fuf = 800 MPa` and give `phi Ntf = 37.12/53.952 kN`; mixed 10.9 bolt gives `332.242 kN` with global `k_rd = 0.83`; default group gives `266.769 kN` | Independent arithmetic, `tests/bolt-capacity.test.js` and local DOM checks on 2026-07-29 |
| Bolt published example `PUB-BOLT-M20-01` | M20 8.8/S; one shear plane through threads; `A_c = 225 mm2`, `A_o = 314 mm2`, `A_s = 245 mm2`, `f_uf = 830 MPa` | `phi V_f = 92.6 kN`; `phi N_tf = 163 kN` | Steel Structures Design Manual to AS 4100, Table 9.2.3, source PDF page 182 / printed page 168; independently reproduced by `tests/published-worked-examples.test.js` |
| Bolt `Nti` lookup | `/S`; M16 8.8/TB and 8.8/TF; M16 10.9/TB; M20 8.8/TB | `/S`: Not required; M16 8.8/TB and 8.8/TF: 95 kN; M16 10.9/TB: 130 kN; M20 8.8/TB: 145 kN | Representative DOM outputs checked on 2026-07-23; the full M16-M36 lookup matches AS 4100 Table 15.2.2.2; lightweight display and TF-only conditional inputs checked locally |
| Weld | 6 mm fillet, SP, `fuw` 490 MPa, 100 mm, 2 lines | throat 4.24 mm; weld capacity 199.5 kN; capacity per mm 1.00 kN/mm; parent screen 2.21 kN/mm for Grade 250 plate, 10 mm | DOM output matched independent calculation |
| Weld published example `PUB-WELD-9413-01` | 8 mm E48XX SP fillet weld; `f_uw = 480 MPa`; `l_w = 280 mm`; applied resultant `0.84 kN/mm` | throat `5.66 mm`; design capacity `1.30 kN/mm`; applied resultant is below capacity | Steel Structures Design Manual to AS 4100, Example 9.4.1.3, source PDF page 198 / printed page 184; independently reproduced by `tests/published-worked-examples.test.js` |
| Beam | 310UB40.4 300PLUS | `Ag` 5210 mm2; `Aw` 1854.4 mm2; `fy` 320 MPa; `Zex` 633 x 10^3 mm3; `kf` 0.952; `phi Ms` 182.3 kNm; `phi Vv` 320.4 kN | DOM output matched corrected independent gross-web calculation |
| Beam | 200UC46.2 300PLUS | `Ag` 5900 mm2; `Aw` 1324 mm2; `fy` 300 MPa; `Zex` 494 x 10^3 mm3; `kf` 1.000; `phi Ms` 133.4 kNm; `phi Vv` 214.5 kN | DOM output matched independent calculation |
| Beam | 150PFC 300PLUS, x-x | `fy,m` 320 MPa; `fy,w` 320 MPa; `Zex` 129 x 10^3 mm3; `phi Ms` 37.2 kNm; `phi Vv` 135.8 kN | Independent equation and automated regression matched the app data path |
| Beam | 114.3 x 4.5 CHS C250L0 | `fy` 250 MPa; `Ze` 54.3 x 10^3 mm3; `phi Ms` 12.2 kNm; `phi Vv` 125.6 kN | Independent equation and automated regression matched the app data path |
| Beam | 75 x 25 x 2.5 RHS C350L0, x-x | `fy` 350 MPa; `Zex` 10.1 x 10^3 mm3; `phi Ms` 3.2 kNm | Independent equation and automated regression matched the app data path |
| Beam | 200 x 200 x 6 SHS C450L0 | `fy` 450 MPa; `Ze` 272 x 10^3 mm3; `phi Ms` 110.2 kNm | Independent equation and automated regression matched the app data path |
| Beam | 100 x 100 x 10 EA 300PLUS, Load B | `fy` 320 MPa; `Zey` 25.2 x 10^3 mm3; `phi Ms` 7.3 kNm | Independent equation and automated regression matched the app data path |
| Beam | Ø24 Round Bar, Grade 300 (300PLUS) | `fy` 300 MPa; generated `Ze` 2.036 x 10^3 mm3; `phi Ms` 0.55 kNm | Independent solid-circle equation and automated regression matched the app data path |
| Axial Member | 114.3 x 3.2 CHS, C350L0, `Le` 3.0 m | Austube Table 3.1-2 `Ag` 1120 mm2; `r` 39.3 mm; `Le/r` 76.3; `lambda_n` 90.3; `alpha_c` 0.672; section compression 352.8 kN; member compression 237.2 kN; tension 352.8 kN | Production-path calculation reproduced from the accepted grade-specific section-property row; member capacity is calculated by the local AS 4100 method |
| Concrete | 1000 mm strip, 500 mm top pad, 75 mm cover, top face compression, X direction, inside N20 orthogonal bars, two active N20@200 mats, no shear reinforcement | `x` 62.5 mm; `Cc` 1426.6 kN; `Muo` 337.8 kNm; `phi Muo` 287.1 kNm; `phi` 0.85; `Vuc` 277.4 kN; `dv` 360.0 mm; `phi Vu` 194.2 kN; equilibrium residual below 0.01 kN | Independent calculation matched app formula; one-way shear remains limited to the stated simplified-method assumptions |
| Concrete published example `PUB-CONCRETE-LOO-01` | Rectangular section case (a): `b = 250 mm`, `d = 500 mm`, overall depth `550 mm`, `f'c = 50 MPa`, `A_st = 1500 mm2`, `f_sy = 500 MPa` | `M_u = 346.0 kNm`; `phi = 0.85`; `phi M_u = 294.1 kNm`; force-equilibrium residual below `0.001 kN` | Loo and Chowdhury, reworked AS 3600:2018 Example 3.4.6, Table 1 on PDF page 7 / printed page 168; independently reproduced by `tests/published-worked-examples.test.js` |
| Reo development example `PUB-REO-N28-01` | N28, `f_sy = 500 MPa`, `f'c = 32 MPa`, cover `40 mm`, clear spacing `60 mm`, refined confinement `K = 0.05` | basic length about `1178 mm`; `k4` about `0.95`; adopted straight development length `1120 mm` | Current public AS 3600 hand example at `https://calcs.com/blog/concrete-development-length-as-3600`, accessed 2026-07-30; production regression in `tests/published-worked-examples.test.js` and separate formula-only oracle in `tests/independent-reproductions.test.js`. Commercial worked example is supporting evidence only; AS 3600:2018 remains governing |
| Reo hook reconstruction `REC-REO-HOOK-N28-01` | Same verified N28 straight-development inputs with qualified standard hook selected | benchmark raw length equals `0.5` times verified straight development; adopted comparison length `560 mm` | Direct clause reconstruction from AS 3600 Cl. 13.1.2.6; production regression and separate formula-only oracle are retained. This is not represented as a separately published terminal worked-example value |

## 2026-06-30 Axial Member PFC / EA / Round Bar Audit

### InfraBuild Default Rows

The current Axial Member non-CHS defaults were visually checked against `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`.

| App default | Source pages | Checked app values | Status |
| --- | --- | --- | --- |
| 150PFC, Grade 300 (300PLUS) | OneSteel / InfraBuild Tables 15 and 16 PDF page 17 | mass 17.7 kg/m; `Ag` 2250 mm2; `rmin` 23.9 mm; `fy` 320 MPa; `kf` 1.000 | Row checked |
| 100 x 100 x 10 EA, Grade 300 (300PLUS) | OneSteel / InfraBuild Tables 19-21 PDF pages 19-21 | `Ag` 1810 mm2; leg-parallel centroidal-axis radii `rn = rp = 30.6 mm`; principal radii `rx = 38.6 mm`, `ry = 19.6 mm`; `fy` 320 MPa; `kf` 1.000 | Row checked; the Axial Member flexural-buckling quick check adopts the minor principal radius `ry = 19.6 mm` |
| Ø24 Round Bar, Grade 300 (300PLUS) | OneSteel / InfraBuild Table 3 PDF page 9; OneSteel / InfraBuild Table 38 PDF page 31 | mass 3.55 kg/m; `Ag = pi d^2 / 4 = 452 mm2`; `r = d / 4 = 6.0 mm`; `fy` 300 MPa for d <= 50 mm; `fu` 440 MPa | Row checked |

The Axial Member catalogue also reuses the checked Beam rows for UB, UC, RHS and SHS. UB and UC adopt the minor `y-y` radius for the flexural-buckling quick check. RHS adopts the smaller centroidal radius and SHS is symmetric. Default `alpha_b` values follow AS 4100 Table 6.3.3(A/B): `0` for the listed hot-rolled UB/UC rows with flange thickness not exceeding 40 mm, and `-0.5` for cold-formed non-stress-relieved RHS/SHS. Austube Table T2.1 provides the C450L0 hollow-section basis `fy = 450 MPa`, `fu = 500 MPa`.

The Axial catalogue was reconciled with the shared product data on 2026-08-05. It now consumes 73 grade-specific CHS rows from Austube Tables 3.1-1 and 3.1-2, 89 RHS and 88 SHS designations from Tables 3.1-3 to 3.1-6, all 46 InfraBuild EA geometry/design rows and both checked grades for all 10 PFC designations. CHS, RHS and SHS expose only the grades present in the selected design-property row; Orrcon 2024 remains a separate current-product geometry and availability source.

The Axial `Custom / Built-up` path is not catalogue-backed. Project geometry and restraint inputs start blank and must fail closed; only the material and compression-factor initial values remain populated for user confirmation. The result is limited to flexural buckling about the entered axes and does not verify built-up shear deformation, connectors, local buckling or torsional/flexural-torsional buckling.

### Calculation Compliance Check

The Axial Member formulas remain aligned with the visually checked AS 4100 basis:

- Compression section capacity: `phi Ns = 0.90 kf An fy`. For an unperforated section, `An = Ag`.
- Member compression capacity: `phi Nc = alpha_c phi Ns`, using AS 4100 Cl. 6.3.3 `lambda_n`, `alpha_a`, `eta`, `xi` and `alpha_c`.
- Tension capacity: `phi Nt = min(phi Ag fy, phi 0.85 kt An fu)`.
- `An`, `kt` and `Le` remain project inputs. The default `alpha_b` is selected from AS 4100 Table 6.3.3(A/B) using the current family and `kf` branch; Custom retains project-entered values by axis.
- EA catalogue compression uses the checked minor principal radius, not `rn = rp` about the leg-parallel centroidal axes. This is a flexural-buckling quick check only; flexural-torsional buckling, load eccentricity and connection eccentricity remain excluded.
- Round Bar `fy` is diameter-dependent to match AS/NZS 3679.1 round-bar Table 38: for d <= 50 mm, Grade 300 (300PLUS) uses 300 MPa and Grade 350 uses 340 MPa; for 50 < d < 100 mm, Grade 300 (300PLUS) uses 290 MPa and Grade 350 uses 330 MPa.

### DOM Output Check

Outputs were checked on the local static page at `http://127.0.0.1:8765/?audit=20260630b#member` and independently recalculated from the app formulas.

| Tab case | Checked output | Status |
| --- | --- | --- |
| 150PFC, 300PLUS, `Le` 3.0 m, `alpha_b` 0.5 | `Le/r` 125.5; `lambda_n` 142.0; `alpha_c` 0.298; section compression 648.0 kN; member compression 192.9 kN; tension 648.0 kN | DOM output matched independent calculation |
| 100 x 100 x 10 EA, 300PLUS, `Le` 3.0 m, `alpha_b` 0.5, `kt` 0.85 | minor principal `r = 19.6 mm`; `Le/r` 153.1; `lambda_n` 173.2; `alpha_c` 0.216; section compression 521.3 kN; member compression 112.4 kN; tension 517.9 kN | Independent calculation and local regression updated 2026-07-29; replaces the earlier leg-parallel-radius result |
| Ø24 Round Bar, Grade 300 (300PLUS), `Le` 3.0 m, `alpha_b` 0.5 | `Le/r` 500.0; `lambda_n` 547.7; `alpha_c` 0.026; section compression 122.1 kN; member compression 3.1 kN; tension 122.1 kN | Independent calculation checked using AS 4100 Table 6.3.3(A), other sections not listed |
| Ø24 Round Bar, Grade 350, `Le` 3.0 m, `alpha_b` 0.5 | `fy` 340 MPa; `Le/r` 500.0; `lambda_n` 583.1; `alpha_c` 0.023; section compression 138.4 kN; member compression 3.2 kN; tension 138.4 kN | Diameter-dependent `fy` and current AS 4100 Table 6.3.3(A) default checked |

### 2026-07-29 Beam and Axial Formula-Trace Audit

- AS 4100 Table 3.4, AS 4100 Cl. 5.2.1 to Cl. 5.2.6, AS 4100 Cl. 5.11.1 to Cl. 5.11.5, AS 4100 Cl. 5.12.3, AS 4100 Cl. 6.2.1, AS 4100 Cl. 6.3.3, AS 4100 Table 6.3.3, AS 4100 Cl. 7.2 and AS 4100 Table 7.3.2 were visually rechecked against the local licensed PDF.
- Beam desktop DOM checks matched independent calculations after the rolled-web correction: 310UB40.4 / 300PLUS x-x gives `phi Ms = 182.3 kN.m` and `phi Vv = 320.4 kN`; 150 x 100 x 6 RHS / C450L0 x-x gives `phi Ms = 54.3 kN.m` and `phi Vv = 389.4 kN`.
- The Beam trace now shows the governing formula before substitution and separately resolves `lambda_v`, `alpha_v`, nominal `Vv` and design `phi Vv`; the RHS / SHS non-uniform shear branch no longer uses the ambiguous visual expression `phi Vv = phi Vv`.
- Axial desktop DOM checks matched the independent values above for the default EA and PFC. The Custom default checks both axes and reports `phi Nc,x = 245.8 kN`, `phi Nc,y = 130.3 kN`, with the y-axis governing.
- Axial formula traces now expose `alpha_a`, adopted `alpha_b`, modified `lambda`, `eta`, `xi` and `alpha_c` before `phi Nc`. The 100 x 100 x 10 EA source row was rechecked as principal radii `38.6 mm` and `19.6 mm`; `19.6 mm` remains the adopted flexural-buckling radius.
- Desktop and 390 x 844 responsive checks showed no horizontal overflow. The complete local regression suite passed, including the then-current Beam catalogue reconciliation and dedicated Beam / Axial trace-contract tests; the accepted directory was subsequently expanded to the current 981-row reconciliation baseline.

## 2026-07-02 Embedded Catalogue Row Audit

The embedded steel catalogue rows in `app.js` were checked by a local script against values extracted from `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` / OneSteel hot-rolled tables already located in the Codex reference pack. This was a local file audit, not a live browser rendering pass.

| Area | Rows checked | Source pages / tables | Fields checked | Result |
| --- | ---: | --- | --- | --- |
| Beam UB | 28 | OneSteel / InfraBuild Tables 9 and 10, PDF pages 12-13 | designation order, mass, `Ag`, `Sx`, `Zx`, `d1`, `tw`, 300PLUS and Grade 350 `fy`, `Zex`, compactness and `kf` | No mismatches |
| Beam UC | 13 | OneSteel / InfraBuild Tables 11 and 12, PDF pages 14-15 | designation order, mass, `Ag`, `Sx`, `Zx`, `d1`, `tw`, 300PLUS and Grade 350 `fy`, `Zex`, compactness and `kf` | No mismatches |
| Beam UB / UC minor axis | 41 | OneSteel / InfraBuild Tables 9-12, PDF pages 12-15 | `Iy`, `Zy`, `Sy`, grade-specific `Zey` and compactness class | No missing direction rows |
| Beam PFC | 10 | OneSteel / InfraBuild Tables 15 and 16, PDF page 17 | dimensions, mass, area, x/y properties, separate flange/web strength and x-x / Load A / Load B `Ze` | No missing capacity fields |
| Beam EA | 46 accepted rows | OneSteel / InfraBuild Tables 19 and 20, PDF pages 19-20 | designation, grade, `kf` and Load A/B/C/D `Ze` | No missing direction fields in the accepted directory |
| Beam CHS / RHS / SHS | 288 grade rows | Austube Tables 3.1-1 to 3.1-6, PDF pages 28-38 | unique family/designation/grade key, dimensions, mass, area, section properties, grade, `kf`, class and direction-specific `Ze` | No duplicate keys; representative rows asserted in unit tests |
| Axial PFC | 10 | OneSteel / InfraBuild Tables 15 and 16, PDF page 17 | designation, mass, `Ag`, `r_min`, `fy`, `tw`, `tf` | No mismatches |
| Axial EA | 46 accepted rows | OneSteel / InfraBuild Tables 19-21, PDF pages 19-21 | leg size, thickness, area, leg-parallel `rn = rp`, principal `rx` / `ry`, 300PLUS and Grade 350 `fy` and `kf` | Numeric rows match; Axial flexural-buckling radius corrected to the minor principal `ry` on 2026-07-29 |
| Axial Round Bar | 26 | OneSteel / InfraBuild Table 3, PDF page 9; Table 38 strength ranges, PDF page 31 | diameter, mass and diameter-dependent strength range basis | No mismatches |

Axial Member CHS uses checked Austube Part 3 section-property rows but remains a local AS 4100 member-capacity calculation, not an Austube compression-capacity lookup. The optional CHS dimension override is separately labelled ideal circular geometry. Beam Section Capacity uses the same accepted section-property source for its reviewed section checks.

## 2026-07-02 Mobile / Cleanup Sweep

- `styles.css` contains responsive breakpoints for desktop, tablet and phone widths, including narrow-width control sizing, collapsed input grids, compact result grids, and mobile table/card transforms.
- The stylesheet uses stable `.numeric-input` / shared form-control styling so mobile typing and compact reinforcement-table controls are not tied only to native `input[type="number"]` styling.
- A local `390 x 844` browser check at `http://127.0.0.1:8765/index.html?audit=20260702#member` reported no whole-page horizontal overflow (`documentElement.scrollWidth = 375` in the checked viewport). The loaded view exposed Wind Site Draft resource cards, and several long resource/link entries still overflow their card bounds; treat this as the next mobile formatting target if Wind Site Draft is kept in the public page.
- No `wind-region-workpack/` folder exists in the current detached audit worktree.

## Duplicate / Secondary Reference Notes

- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` should be the primary hot-rolled catalogue for current web-table values unless a specific OneSteel 8th edition table is intentionally retained for historical consistency.
- `Hot-rolled-and-structural-steel-products_8th-edn.pdf` and `005-application_attachment-a-2.9.2-onesteel_manufacturing_pty_ltd_0.pdf` are secondary/historical hot-rolled references. Do not mix rows from these with InfraBuild 2019 unless the source is labelled.
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` and `design-capacity-tables-for-structural-steel-hollow-sections.pdf` appear to cover the same hollow-section design-capacity table family. Use one as the cited method source and keep the duplicate as backup unless the content differs.
- `AS/NZS 1554.3` currently has 0% text extraction in the generated pack. Treat it as visual-check-only or OCR-needed.

## Next Row-Level Verification Order

1. Current Orrcon product availability where project procurement requires confirmation; it does not replace the accepted Austube design-property row without a new reconciliation.
2. Consider whether the EA quick screen should add an optional weak-axis conservative mode; keep current principal-axis mode clearly labelled unless that scope is expanded.
3. AS 4100 Table 6.3.3 `alpha_b` option mapping for non-default member axes and fabrication routes.
4. AS 3600 `kv` and shear model only if the concrete tab is expanded from warning screen to design check.
5. Wind Site Draft mobile resource-card wrapping, because the 2026-07-02 `390 x 844` local browser check still found long resource/link entries overflowing their cards.

## 2026-07-10 Rock Anchor Selector Source Status

The `Rock Anchor` tab is a product selector only. It does not calculate anchor actions, bond resistance, governing resistance or utilisation.

| Source area | Selector use | Status |
| --- | --- | --- |
| Freyssinet current geotechnics page and `Anchoring systems for geotechnical engineering`, C IX 0 - 01/14 | Current Permanent Freyssibar and A2/B2 strand families; archived Freyssibar 26.5-50 mm and 2-13 T15.7 strand tendon rows | Current families plus official archived numeric rows; exact Australian product and supply require confirmation |
| DYWIDAG current ground-anchor pages and `PT Threadbar Technical Specification`, October 2024, ASTM A722 | Threadbar, Strand, Twin-Corr, Multi-Stage and El-Iso system families; Grade 150 threadbar 26-75 mm published minimum ultimate-load rows | Current system families plus official US numeric rows; exact Australian product, grade and assembly require confirmation |
| SAS post-tensioning system design guide, January 2026 | SAS 950/1050 and 835/1035 published tendon rows | Current external manufacturer rows; confirm Australian ground-anchor applicability; resolve the 65 mm 2,780 / 2,790 kN yield-load discrepancy before adoption |
| Williams Form Engineering official rock-anchor product pages | R7S Spin-Lock 25/32/38/48 mm published yield / ultimate rows; MCP I-III and multi-strand prestressed ground-anchor families | R7S rows use the specific official product table; family entries remain system-level only; confirm Australian acceptance, supply and certified project schedule |
| VSL Ground Anchors and VSL Australia pages | Bar / strand family, corrosion-protection options and Australian provider pathway | System-family entry only; an Australian provider does not confirm exact product availability or acceptance |
| BBR VT CONA CMG technical brochure / ETA 21/1053 | Fourteen Y1860S7-15.7 product rows from 2 to 22 strands, plus family scope | Official manufacturer/ETA basis; current Australian specialist certification, exact kit, acceptance and supply require confirmation |
| Keller Australia Anchors | Australian bar, strand and SBMA delivery pathways | Provider pathway only; certified project schedule required |
| SRG Global anchoring capability and BBR H Bar product page | Australian high-capacity strand, stress-bar and BBR H Bar delivery pathways | Provider pathway only; the captured 2025/26 BBR specialist certificate expired 31 Mar 2026, so current certification and a certified project system schedule are required |
| Austroads ATS 5140-26, Edition 2.0 | Execution, corrosion protection, stressing, testing and monitoring boundary | Scope reference only; no numeric design criteria embedded in the selector |

Published tendon values are reference product data and must not be described as complete anchor design resistance.

## 2026-07-29 Structural Blind-bolt Lookup Source Status

The `Structural blind-bolt lookup` branch reports manufacturer-published product values without converting unlike safety formats. It does not calculate complete connection resistance or compare project actions.

| Product family | Governing source | Displayed value basis | Lookup status |
| --- | --- | --- | --- |
| Lindapter Hollo-Bolt | ICC-ES ESR-3330, reissued March 2026; Lindapter Type HB current product table and installation guide | Static / wind LRFD available tension and shear strength; LRFD resistance factor already included. Official `HBxx-1/2/3` code, grip range and assembled `B max` retained separately from retailer bolt-length descriptions | Manufacturer sources checked online |
| ICCONS UNI-BOLT | TDS 1053.1, 2025; ETA 25/0374 | AS 4100 design capacity; `phi = 0.8` already included | Manufacturer source checked online |
| Hobson HBS-Bolt | HBS-Bolt Product Data 200806DS | Manufacturer working load; characteristic resistance not substituted | Manufacturer source checked online |
| Kee Safety BoxBolt | ETA 20/1174, December 2020 | Characteristic resistance `Ft,Rk` and `Fv,Rk`; no design partial factor applied | Manufacturer source checked online |
| Blind Bolt Company Blind Bolt | Metric Technical Data, March 2026; current official product page | BS EN 1993-1-8 `Ft,Rd` tension and `Fv,Rd,thread` shear design resistance; `gamma M2 = 1.25` already applied. M14 torque and GBB1690HDG minimum grip conflicts are displayed and require manufacturer confirmation | Manufacturer sources checked online |
| Allfasteners NexGen2 | NexGen2 Blind Bolt TDS, July 2019 | M20 TIA-222-G design strength; displayed shear has threads included | Manufacturer source checked online; confirm current ICC-ES report and Australian adoption before specification |

Connected steel, local HSS or shell effects, bearing, tear-out, net section, block shear, punching or pull-through, prying, combined actions, fatigue and installation acceptance remain outside the lookup.

The lightweight U-bolt and structural blind-bolt lookups do not redraw or embed manufacturer product figures. `Selected product` retains only the parameters required for preliminary selection and links directly to the current record's manufacturer product page or technical data sheet. Product appearance, component details and dimension diagrams remain controlled by that primary source; the handbook does not establish fabrication geometry or complete connection capacity.

## 2026-08-09 Calculation and Selector Audit Continuation

Build 0.7.35 continues the independent audit without expanding the handbook into a complete design engine.

| Audit area | Evidence and disposition |
| --- | --- |
| Bolt Capacity | Invalid `k_r`, shear-plane counts, friction-interface inputs and connected-ply values now fail closed instead of being rounded, clamped or converted into normal-looking capacities. Production-path and boundary regressions pass. |
| Steel Monopole | AS 4100 and ASCE/SEI 48-19 citations use the canonical `Standard Cl. x.x` format. Existing independent circular/polygon, station and manufacturer-geometry reproductions remain unchanged and pass. |
| Reinforcement | Independent Basic/Refined development, partial-stress, `12d_b`, hook/cog, `k_7` and narrow-gap cases pass. Galvanized bend geometry remains explicitly outside the selector and requires AS 3600 Cl. 17.2.3.3(d) review. |
| Screw Piles | Rectangular perimeter/full-grid coordinates are production-module outputs with exhaustive 2-8 row/column centroid and uncoupled-axis tests. Non-integer layout values, spans below 0.1 m and non-finite actions now return `Not evaluated` without altering the entered values. The eight-pile independent action and equilibrium reproduction passes. |
| Rock Anchor Selector | Freyssinet, DYWIDAG, SAS and Williams row values were checked against their stated manufacturer sources. Williams R7S 25/32/38 mm rows now link directly to the matching official product table. VSL/BBR family, Australian provider and Custom states remain `Not published` where no row-level tendon value is captured. No anchor resistance or utilisation is inferred. |
| Supplemental independent cases | `AUD-BOLT-DETAILED-01` covers the detailed bolt connection branches; `AUD-MONO-NM-INDEPENDENT-02` verifies the circular section-capacity intercept relationship without restoring page actions; `AUD-CONCRETE-SHEAR-BOUNDARY-01` covers all current simplified-shear branches; `AUD-CONCRETE-FLEXURE-BRANCH-01` covers compression-face reversal, asymmetric and composite reinforcement, capacity-factor bounds and the legacy-bar rule. Concrete calculation remains section-capacity only. |

The complete local suite passes 28 test files, including independent arithmetic, published worked examples, catalogue reconciliation, source-row reproductions, invalid-state checks and page contracts. Concrete bottom-compression and four-layer composite flexure cases, plus the Rock Anchor default, Williams row, VSL family and Custom states, were reproduced in the local browser. Existing `For Review`, `Draft`, source-pending and project-verification states remain in force; this audit does not promote them to `Checked`.

### Local Result-Status Semantics Audit - 2026-08-09

| Test_ID | Scope | Required result | Evidence and disposition |
| --- | --- | --- | --- |
| `AUD-STATUS-SEMANTICS-01` | Bolt TF slip, Weld demand, Beam section demand, Axial demand, Weld parent-metal warning and Screw Piles product-data guidance | Numerical comparisons use scoped status names; blank actions retain `No design action`; source and warning states never use pass/fail styling | `tests/status-semantics.test.js` plus the existing invalid-input and page-contract suites; local correction passes |

This local continuation changes no resistance, action distribution or utilisation arithmetic. It scopes visible status text to `TF slip`, `Weld throat`, `Section check` and `Axial check`; retains the parent-metal screen as review-only; and displays screw-pile product-data availability as a review state rather than an engineering pass. The Weld trace now shows the optional demand equation, substituted values and scoped result. The complete local suite passes 30 test files; publication remains pending.

Desktop (1440 px) and phone (390 px) browser reproductions then exercised zero-action, passing-action and failing-action states for Bolt TF slip, Weld throat, Beam section and Axial member checks. The Weld geometry boundary also reproduced the fail-closed `l_w < 4s` state. All reviewed routes cleared stale statuses, had no document-level horizontal overflow and produced no console error after correction. This browser pass identified an outdated `weld-capacity.js` cache key that loaded the pre-helper module and stopped Weld recalculation; `index.html` now versions that module with `20260809weldrepro1`. No formula or displayed engineering value changed.

### Local Concrete Pad and Reinforcement Browser Reproduction - 2026-08-10

| Test_ID | Page / state | Reproduced result | Disposition |
| --- | --- | --- | --- |
| `AUD-CONCRETE-BROWSER-01` | Default 1000 mm strip, 500 mm top pad, top compression, N20 at 200 mm, no shear reinforcement | `phi Muo = 287.1 kNm`; `phi Vu = 194.2 kN` | Matches the recorded independent default case |
| `AUD-CONCRETE-BROWSER-02` | `f'c = 0`, `f'c = 66 MPa`, bottom compression, composite top-plus-bottom pad, and both pad depths zero | Invalid material input clears both capacities; the 66 MPa state retains flexure but reports simplified shear `Not evaluated`; bottom and composite branches calculate; zero total depth reports `No pad section defined` / `Review required` and clears capacities | Fail-closed and scope states reproduced without stale values |
| `AUD-REO-BROWSER-01` | Default N20 Basic contact lap | Adopted lap `840 mm`, `42.0db` | Matches the current production default |
| `AUD-REO-BROWSER-02` | Published N28 development reconstruction: `f'c = 32 MPa`, cover `40 mm`, clear spacing `60 mm`, Refined custom confinement, beam/column `Atr,min`, `nf = 0`, `nbs = 1`, `Sigma Atr = 770 mm2` | After effective-location and candidate-length confirmations: `K = 0.050`, `lambda = 1.000`, `k4 = 0.950`, `k5 = 1.000`, adopted `Lsy.t = 1120 mm` | Matches `PUB-REO-N28-01`; before confirmation the Basic `1180 mm` reference remains and the candidate is not adopted |
| `AUD-REO-BROWSER-03` | Refined development with `f'c = 0`, then restored to `32 MPa` | Invalid input clears the reference length; changing the dependent input resets the candidate-length confirmation and restores the conservative Basic `1180 mm` result until evidence is reconfirmed | Dependent confirmation and stale-result clearing reproduced |
| `AUD-CONCRETE-REO-RESPONSIVE-01` | 1440 px and 390 px Pad and Reinforcement routes | Required inputs and primary outputs remain available; no document-level horizontal overflow; browser console has no warning or error | Responsive contract reproduced |

This continuation changes no formula, source value, capacity factor, result status or page layout. It records direct browser evidence for the existing independent Concrete and Reinforcement cases. Publication remains pending.

### Concrete and Reinforcement Calculation-Trace Correction - 2026-08-11

| Test_ID | Page / correction | Verified outcome |
| --- | --- | --- |
| `AUD-CONCRETE-TRACE-02` | Concrete stress block, force equilibrium and nominal moment | The trace cites AS 3600 Cl. 8.1.2 and Cl. 8.1.3 as applicable, expands current concrete and reinforcement force terms, and numerically reproduces `Muo = 337.8 kN.m` and `phi Muo = 287.1 kN.m` |
| `AUD-CONCRETE-SHEAR-TRACE-02` | Concrete and fitment shear contributions | The visible substitution retains sufficient `kv`, square-root and `cot theta_v` precision to reproduce the displayed `Vuc`, `Vus` and `phi Vu` values |
| `AUD-REO-TRACE-02` | Basic lap and development references | The trace substitutes `k1`, `k2`, `k3`, `fsy`, `db` and `f'c` into the governing AS 3600 expression before candidate comparison and upward 10 mm adoption |
| `AUD-CONCRETE-REO-ROUND-01` | Concrete and Reinforcement visible engineering values | Direct `toFixed()` output was removed from both page calculation regions; visible values use the shared decimal half-up formatter while calculation engines retain unrounded values |

The production formulas, source data, capacity factors and primary results are unchanged. The full 32-file regression suite, default browser reproduction, invalid Reinforcement input state, 375 px phone-width overflow check and browser console check passed. The focused trace contract is retained in `tests/concrete-reo-trace.test.js`.

### Weld Engineering-Language Review - 2026-08-11

Build 0.7.36 standardises the Weld page as a formal engineering quick-reference without changing weld resistance, capacity factors, welded-lap reduction, parent-metal screening arithmetic or calculation branches.

| Test_ID | Page / review | Verified outcome |
| --- | --- | --- |
| `AUD-WELD-LANGUAGE-01` | Weld inputs, results, calculation trace and limitations | Visible terminology distinguishes calculated weld-throat resistance, the advisory parent-metal screen and project-specific fabrication or detailing requirements; conversational terms and the `SSHS` typo are removed |
| `AUD-WELD-STATE-02` | CPBW and invalid fillet-weld geometry | CPBW remains `Not evaluated` because the weaker joined-part resistance is not defined; `l_w < 4s` remains `Not evaluated` with `aria-invalid=true` and no stale capacity |
| `AUD-WELD-RESPONSIVE-02` | Desktop and 390 px browser states | Result labels wrap within their cards, the page has no document-level horizontal overflow and the browser console is clear |

The full 33-file regression suite passes, including the independent Weld arithmetic cases and the new visible-language contract in `tests/weld-language.test.js`. The page remains `For Review`; AS/NZS 1554.1 welding procedure, fabrication and inspection coordination remains project-specific.

## 2026-07-30 Full-page Regression Audit

Build 0.7.10 was checked against the current `SC_HANDBOOK.md` calculation, validation, traceability and responsive-layout contract. This pass did not expand any tab into a complete design engine.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-WELD-INPUT-01` | Weld Capacity invalid geometry | Enter `l_w = 0`, zero effective weld lines, or zero IPBW design throat | Capacity and utilisation are cleared; the trace reports `Not evaluated` and the invalid prerequisite |
| `AUD-CONCRETE-INPUT-01` | Concrete Pad invalid material input | Enter `f'c = 0` or a value outside 20-120 MPa | Flexural and shear capacities are cleared; status is `Invalid input`; no value is clamped to a code limit |
| `AUD-BOLT-GROUP-INPUT-01` | Bolt group invalid count | Enter bolt count `0`, a non-integer, or a value outside 1-100 | Bolt-group shear, bearing and tear-out are `Not evaluated`; per-bolt capacity remains available |
| `AUD-AXIAL-INPUT-02` | Axial Member invalid effective length | Enter selected-axis `Le = 0` | Compression, tension and utilisation outputs are cleared; status is `INPUT REQUIRED` |
| `AUD-BEAM-DEMAND-02` | Beam Section over-demand | Enter `M* = 9999 kN.m` for default 310UB40.4 / 300PLUS | Utilisation `54.85`; status `FAIL`; member stability and other exclusions remain visible |
| `AUD-REO-INPUT-01` | Reinforcement invalid concrete input | Enter `f'c = 0` | Required length is cleared; status is `INVALID INPUT` |
| `AUD-SCREW-BOUNDARY-01` | Screw Piles demand without project resistance | Enter `N* = 100 kN` with no project design-value source | Pile actions are distributed, but utilisation remains `Not assessed`; no manufacturer lookup is treated as project resistance |
| `AUD-SELECTOR-BOUNDARY-01` | U-bolt, blind-bolt and Rock Anchor selectors | Open each selector branch | Status remains product lookup / Draft; no project `PASS` or calculated anchor resistance is reported |
| `AUD-RESPONSIVE-02` | All nine public pages | Default desktop at 1440 px and phone at 390 x 844 px | No document or checked-control horizontal overflow |

The complete local regression suite passed 19 test files after these checks, including published worked examples, independent reproductions, catalogue reconciliation and DOM contracts. A fresh browser session reported no console warnings or errors. Remaining `For Review`, `Draft`, `Not evaluated` and selector-only states are intentional scope boundaries, not completed design checks.

## 2026-07-30 Steel Monopole Integration Audit

Build 0.7.11 integrates Steel Monopole Section Capacity with the Build 0.7.10 shared app, calculation contracts and audit suite. The Monopole status remains `For Review · capacity only`.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-MONO-INTEGRATION-01` | Default circular three-section schedule | Reload `#monopole` with the default physical sections | Minimum evaluated resistance `284.3 kN.m`; shaft mass `6,803 kg`; active top tool uses `aria-pressed="true"` |
| `AUD-MONO-INTEGRATION-02` | Regular 12-sided schedule | Select `12-sided regular polygon` | Minimum evaluated permitted moment `261.8 kN.m`; ASCE/SEI 48-19 pure-bending basis retained with no AS 4100 capacity factor |
| `AUD-MONO-INTEGRATION-03` | Out-of-range regular polygon | Select `4-sided regular polygon` with the default schedule | Result is `Not checked`; the governing station and local slenderness limit are shown; no resistance profile is reported |
| `AUD-MONO-INTEGRATION-04` | Invalid physical thickness | Enter `t_nom = 0` for S1 | Resistance, mass and profile are cleared; no stale result remains |
| `AUD-MONO-RESPONSIVE-01` | Desktop and phone | Check 1428 px desktop and 320, 390 and 500 px responsive widths | No document-level horizontal overflow; the physical-section table retains intentional internal horizontal scrolling |
| `AUD-MONO-A11Y-01` | Monopole active at phone width | Inspect the active accessibility snapshot with all other tool panels hidden | Inactive Concrete Pad mobile pseudo-labels are suppressed; only active Monopole content is exposed |

The complete integrated regression suite passed 22 test files, including professional audit contracts, independent reproductions, published worked examples, catalogue reconciliation, Monopole calculation/DOM/worked-example tests and shared page contracts. All production JavaScript passed syntax checks; the browser console reported no warnings or errors. No source or scope status was promoted to `Checked`.

## 2026-07-30 Steel Monopole Input Terminology Audit

Build 0.7.12 clarifies inputs without changing calculation logic:

- `AS 4100 fabrication category` states that it applies only to circular sections and selects the Table 5.2 compactness limits;
- `Yield-strength basis` replaces the broader `Material basis` label because the control selects the source of `f_y`;
- the inactive design-thickness note states `t_d = t_nom` by default and identifies the project-input purpose;
- the polygon bend-radius ratio identifies 1.5 as an editable fabrication estimate, not a Standard or manufacturer value.

The Monopole DOM contract asserts these labels and rejects the superseded ambiguous wording. Circular category branches, polygon calculations, material lookup, mass and overlap logic are unchanged.

## 2026-07-30 Steel Monopole Material Layout Correction

Build 0.7.13 aligns the three primary material controls at their top edge and presents the optional design-thickness override as an intentional secondary row. Supporting text is shortened without changing calculation logic. The local update workflow now requires matched before-and-after layout checks at representative wide and narrow widths.

## 2026-07-30 Steel Monopole Sourced Default and Independent Product Example

Build 0.7.14 replaces the illustrative 30 m schedule with one traceable manufacturer product-table row:

| Field | Adopted initial value | Source status |
| --- | ---: | --- |
| Product | KISMAT `KOP-1230` | Manufacturer product table, checked 2026-07-30 |
| Form | Regular 8-sided polygon | Published |
| Fabricated length | 12.0 m | Published |
| Bottom outside across-flats | 240 mm | Published |
| Top outside across-flats | 90 mm | Published |
| Nominal thickness | 3 mm | Published |
| Material designation | E355BR | Published |
| Yield stress | 355 MPa | Adopted editable calculation input; not separately published |
| Inside bend-radius ratio | `r_i/t_nom = 1.5` | Fabrication estimate; not published |

Source: `KISMAT ENGITECH LLP | Octagonal / Polygonal Poles | KOP-1230 manufacturing specifications | https://www.kismatengitech.com/octagonal-poles.html`.

The product source supplies geometry and material only. It does not publish ASCE/SEI 48-19 resistance, theoretical shaft mass, self-weight or centre of gravity. Those values are independently reconstructed in `tests/monopole-worked-examples.test.js` and compared with the production calculation.

## 2026-08-01 Steel Monopole Layout Logic Consolidation

Build 0.7.15 applies the Section 15 layout contract to the complete monopole workflow. It removes duplicate stage spacing, bounds desktop control widths, gives the physical schedule the same engineering-band treatment as section and material inputs, keeps the polygon method note with section form, and keeps material provenance with material inputs. The design-thickness override remains in the active material grid. Tablet and phone layouts preserve the same order, with horizontal scrolling confined to technical tables and the profile chart.

## 2026-08-03 Drawing-standard Adoption

SC Handbook now references the shared Unified Web Engineering Drawing Standard through the project-owned `engineering/drawing-standard-adoption.json` record rather than copying a second drafting standard into this repository.

- Adopted package: UWEDS 1.10.0, governed subset, manifest generated 2026-08-03.
- Pin: controlled revision plus `PACKAGE_MANIFEST.md` SHA-256 `7d71cfa493defd5504966d6e20cc271f34485a5fc8e6b80f7a1340bf8611c7f1`.
- Shared package location: `C:/Users/silin/Documents/Codex/Drawing`.
- Local project rules: `SC_HANDBOOK.md` Section 15.8, including lightweight placement, annotation budgets, mobile simplification and calculator-scope boundaries.
- Future case records: `engineering/pre-drawing-case-reviews/` before a new drawing family or material physical-representation change.
- Validation: UWEDS package validator passed with 25 JSON files, 261 rule IDs, 203 test IDs and 114 manifest entries; the adoption record passed its current JSON schema; all 19 SC Handbook regression test files passed.

The adoption remains `DRAFT`. It does not retrospectively certify inherited figures and does not convert web schematics into construction, fabrication, shop or certified design drawings. The product-reference links added to the U-bolt and structural blind-bolt lookups do not claim drawing adoption or geometry authority.

## 2026-08-03 Lightweight Calculation-core Extraction

Build 0.7.11 extracts two existing calculation paths into small browser-native modules without changing their formulas, visible inputs, displayed precision or engineering scope.

| Verification ID | Production path | Independent evidence | Acceptance result |
| --- | --- | --- | --- |
| `AUD-AXIAL-MODULE-01` | `member-capacity.js` called by the Axial Member tab | Default CHS known-answer arithmetic, explicit m-to-mm and MPa-mm2-to-kN assertions, area scaling, two-axis governing selection and invalid-input rejection in `tests/member-capacity.test.js` | Production result reproduces the existing AS 4100 compression and tension paths within stated numerical tolerances |
| `AUD-SCREW-MODULE-01` | `screw-demand.js` called by the Screw Piles tab | Independent symmetric eight-pile example plus axial force, two moments, two shears and torsional equilibrium checks in `tests/screw-demand.test.js` | Production result reproduces the existing rigid-cap distribution and closes all six group-equilibrium checks to `1e-9` |

The Axial Member module remains limited to the displayed AS 4100 section/member compression and tension checks; it does not add connection, combined-action, flexural-torsional or complete member-design checks. The Screw Piles module distributes entered actions only for centroid-referenced, symmetric uncoupled layouts under the existing rigid-cap and equal-stiffness assumptions. It does not calculate geotechnical resistance, structural pile resistance, pad-soil interaction or project utilisation without a compatible project design-value source.

The calculation modules remain plain JavaScript loaded before `app.js`; no package, framework, server, Python runtime or network calculation service was introduced. The page continues to expose the existing `Formula -> Substitution -> Result -> Applicability` record, while the production arithmetic can now be exercised directly by regression tests.

## 2026-08-01 Steel Monopole Circular Combined Section Check

Build 0.7.19 retains the pure-bending elevation profile and adds a separate optional circular-section compression and bending check at an entered elevation.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-MONO-NM-SOURCE-01` | Circular combined section calculation | Reproduce Austube 508.0 x 6.4 CHS C350L0 using published `Ag = 10100 mm2`, `kf = 0.857` and `phi Ms = 408 kN.m`, with independent example actions `N* = 1000 kN`, `M* = 100 kN.m` | `phi Ns = 2726.55 kN`, `phi Mr = 258.36 kN.m`, `eta = 0.61186`; production result within 0.5% |
| `AUD-MONO-NM-ZERO-01` | Circular combined section calculation | Set `N* = 0` | Reduced moment capacity equals the existing `phi Ms` exactly |
| `AUD-MONO-NM-BOUNDARY-01` | Thickness or physical-section boundary | Enter the exact boundary elevation | Both adjacent active shell states are retained and the maximum `eta` governs |
| `AUD-MONO-NM-SCOPE-01` | Polygon section form | Select any regular polygon | Combined section check is unavailable; the existing ASCE pure-bending path is unchanged |
| `AUD-MONO-NM-RESPONSIVE-01` | Desktop and phone | Expand the circular combined check at 1428 px and 390 px | No document-level horizontal overflow; the technical results table scrolls only within its own container |

The check uses AS 4100 Cl. 6.2 and Cl. 8.3.2 with `phi = 0.90`. It does not calculate load combinations, `Nc`, effective length, member buckling, global stability, second-order effects or polygon combined stress. Initial actions are editable examples, not product values. All 22 local regression files passed; the expanded check had no document-level overflow at 1428 px or 390 px and the browser console was clear. Status remains `For Review`.

## 2026-08-03 Steel Monopole Combined Check Layout Alignment

Build 0.7.20 aligns the optional circular combined-section check with the shared handbook component system. Its four inputs use the standard 46 px controls; the three primary outputs use the same capacity-card spacing, 11 px radius and result typography as the main Monopole results. The technical state table remains separately scrollable. Desktop and 390 px checks showed no document-level horizontal overflow and no browser console warnings or errors. Calculation logic and scope are unchanged.

## 2026-08-03 Steel Monopole Result Disclosure Simplification

Build 0.7.21 removes the generic Results heading and result-card grid. A compact always-visible shaft-properties line reports mass, self-weight, centre of gravity and assembled height. `Moment capacity` is open by default and summarises the governing base-station value; its elevation chart and top-to-base station table remain inside the disclosure. `Compression and bending` is closed by default and uses a compact `phi Ns / phi Mr / eta` strip rather than result cards. Polygon combined stress remains unavailable. The calculation methods, fail-closed range handling and station generation are unchanged. All 22 local regression files passed. Desktop and 390 px browser checks reported no console errors or document-level overflow; the chart and technical tables retain internal horizontal scrolling on narrow screens.

## 2026-08-03 Steel Monopole Capacity Workflow Hierarchy

Build 0.7.22 establishes three numbered workflow stages: `Input data`, `Moment capacity`, and `Compression and bending capacity`. Both capacity workflows identify the common 0.5 m station basis. For circular sections, the third stage now reports `phi Ns`, `phi Ms` and `kf` for every active station state in top-to-base order; `phi Ns` and `phi Ms` are identified as the intercepts of the AS 4100 Cl. 8.3.2 uniaxial section-capacity boundary. The existing entered-action check remains available as a nested, collapsed check at one elevation. Regular polygonal combined stress remains visibly `Not implemented`; its ASCE/SEI 48-19 pure-bending profile is unchanged. The page retains capacity-only and `For Review` scope.

## 2026-08-03 Steel Monopole Capacity-Only Hierarchy

Build 0.7.23 removes the monopole action check and its `N*`, `M*`, reduced-capacity and interaction-ratio implementation. The third stage now contains only the 0.5 m circular-section `phi Ns / phi Ms / kf` profile and a concise statement that these values are the intercepts of the AS 4100 Cl. 8.3.2 uniaxial section-capacity boundary. Stage titles, capacity summaries, subsection headings and supporting notes use four explicit typography levels. Desktop and phone layouts retain internal scrolling for technical tables and no document-level horizontal overflow.

## 2026-08-03 Steel Monopole Release Layout Correction

Build 0.7.24 makes the source-backed Austube 508.0 x 6.4 CHS C350L0 case the initial circular capacity example, with an explicitly illustrative 12 m profile length. KISMAT KOP-1230 remains the independently reproduced regular-polygon worked example. Both capacity stages are collapsed by default so their base summaries remain adjacent. The circular capacity-intercept scope note precedes its station table, the slip-joint screen is hidden when no positive overlap is entered, and the phone chart uses a compact responsive viewBox without horizontal chart scrolling. Technical tables retain contained horizontal scrolling. Calculation equations and capacity factors are unchanged.

## 2026-08-03 Steel Monopole Terminology and Hierarchy Correction

Build 0.7.25 removes the non-functional `01 / 02 / 03` stage badges and aligns the three primary section titles. The third section is named `Section capacity intercepts` so it cannot be mistaken for a completed action interaction check. The chart uses `Design section moment capacity, phi Ms` for circular AS 4100 results and `Permitted bending moment, M` for regular-polygon ASCE results. The overlap-zone legend and overlap-shell mass basis appear only when positive overlap geometry exists. The initial Austube row is identified as a circular-section example rather than a complete monopole product. No calculation equation or capacity factor changed.

## 2026-08-03 Steel Monopole Polygon Bend-Radius Trace

Build 0.7.26 identifies `r_i/t_nom` as a project or fabricator input and automatically derives the actual `r_i` for every thickness band or physical section. The input note reports the resulting `r_i` and effective `BR` range, while Calculation details records each numerical substitution for `r_i = (r_i/t_nom)t_nom` and `BR = min(r_i, 4t_d)`. The default ratio `3.0` remains an editable example rather than a Standard or manufacturer value. The polygon section-intercept state is labelled `Combined polygon stress not evaluated`; permitted pure-bending moment remains available. No capacity equation changed.

## 2026-08-03 Steel Monopole Polygon Fabrication Estimate

Build 0.7.27 changes the current polygon default to `r_i/t_nom = 1.5` and labels it as an editable fabrication estimate requiring verified project or manufacturer data. KISMAT KOP-1230 is a product-geometry reference rather than a manufacturer worked-capacity example; neither its bend radius nor capacity is published. Changing the initial circular example to a polygon replaces the product-specific `508 CHS` identifier with `S1` without overwriting entered geometry. The third disclosure dynamically becomes `Combined polygon stress` with summary `Not evaluated`. No resistance equation or capacity factor changed.

## 2026-08-06 Steel Monopole Information Hierarchy

Build 0.7.28 replaces the broad `Input data` label with three explicit page headings: `Section definition`, `Material and fabrication`, and `Section capacity`. The compact `Shaft properties` summary remains between inputs and capacity. `Moment capacity` and `Section capacity intercepts` remain adjacent collapsed disclosures on the common 0.5 m station basis; the polygon state remains `Combined polygon stress - Not evaluated`. The outline now distinguishes editable initial examples from fixed method constants. No geometry, resistance, mass, station, overlap or material calculation changed.

## 2026-08-07 Steel Monopole Release Reconciliation

Build 0.7.30 reconciles the Monopole branch with the current `origin/main` Section Properties and Beam workflow updates while retaining the section-only calculation boundary. The governing outline now places the circular compression/bending capacity-intercept profile directly after the circular moment-capacity contract, followed by polygon bending, slip-joint screening, shaft properties, page rules and release gates. Current browser evidence replaces the superseded three-section polygon page state.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-MONO-RELEASE-CHS-01` | Default circular fabricated section | Reload `#monopole` using the editable Austube 508.0 x 6.4 CHS C350L0 example | Base `phi Ms = 407.9 kN.m`; base `phi Ns = 2723.3 kN`; mass `950 kg`; self-weight `9.3 kN`; 25 moment rows and 25 compression/bending intercept rows |
| `AUD-MONO-RELEASE-POLYGON-01` | Current polygon browser state | Select 8-sided regular polygon and retain 508 mm A/F, 6.4 mm, `fy = 350 MPa`, `ri/tnom = 1.5` | Base `M = 450.4 kN.m`; independent exact regular-polygon reconstruction agrees; basis remains `P = 0`, `M = FaI/c`, no AS 4100 `phi`; combined polygon stress is `Not evaluated` |
| `AUD-MONO-RELEASE-INVALID-01` | Invalid nominal thickness | Set `tnom = 0` | Input error is shown; mass and both capacity summaries clear to `-` / `Not checked`; no stale result remains |
| `AUD-MONO-RELEASE-RESPONSIVE-01` | 1428 px and 390 px | Inspect the current circular and polygon states | No document-level horizontal overflow; schedule/table overflow remains inside its technical scroller; browser console has no warnings or errors |

All 25 local regression files and `git diff --check` passed after final main integration. This record is local release evidence; remote and public deployment evidence is verified separately at publication.

## 2026-08-10 Screw Piles and Rock Anchor Browser Reproduction

Build 0.7.35 was reproduced in the local browser at 1440 px and 390 px. This audit did not change formulas, product values or selector scope.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-SCREW-BROWSER-01` | Screw Piles / symmetric perimeter group | Enter `N* = 800 kN`, `Vx* = 80 kN`, `Vy* = 40 kN`, `Mx* = 90 kN.m`, `My* = -45 kN.m` and `Tz* = 30 kN.m` for the default eight-pile 3 m x 3 m perimeter layout | Maximum compression `115.0 kN`, maximum tension `0.0 kN` and maximum horizontal pile action `13.4 kN`; the displayed formula, substitution and result agree with `tests/screw-demand.test.js` |
| `AUD-SCREW-BROWSER-INVALID-01` | Screw Piles / invalid layout | Change the X-edge pile count to `2.5` | Status changes to `Input required`; pile count and all pile-action outputs become `Not evaluated`; no stale result remains |
| `AUD-SCREW-BROWSER-GATE-01` | Screw Piles / project comparison | Enter project directional values without a source, then add a source with a mismatched basis, then use matching ULS values | Missing source and basis mismatch both suppress the ratio. Matching values produce decimal half-up `eta_proj = 0.58` for 115/200 and `eta_proj = 1.15` for 115/100, with the correct non-exceedance/exceedance status. Manufacturer values are not substituted automatically |
| `AUD-ROCK-BROWSER-01` | Rock Anchor / exact product row | Select Williams R7S Spin-Lock 32 mm | Published tendon yield and ultimate loads reproduce as `517 kN` and `647 kN`; both remain labelled as manufacturer tendon values and not anchor resistance |
| `AUD-ROCK-BROWSER-BOUNDARY-01` | Rock Anchor / provider and Custom states | Select Keller bar ground anchor, then Custom / project | Both load fields remain `Not published`; the Custom state requires a project source and neither state infers anchor resistance or utilisation |
| `AUD-SCREW-ROCK-RESPONSIVE-01` | Screw Piles and Rock Anchor / phone | Inspect the primary selector, product values, source status and limitation at 390 x 844 px | No document-level horizontal overflow; essential selector information remains available through the compact Tools navigation; browser console is clear |
| `AUD-DISPLAY-HALF-UP-01` | Shared calculated-result display | Format the exact Screw project ratio `115/200 = 0.575` to two decimal places after loading `engineering-number-format.js` | Browser displays `eta_proj = 0.58`; the exact ratio still governs the comparison. Bolt, Weld, Beam and Axial default results load without console errors |

The former `0.57` display for the exact ratio `115/200 = 0.575` was a presentation-rounding boundary caused by binary floating-point formatting. Build 0.7.35 now routes this ratio and the shared primary result formatters through `engineering-number-format.js`, producing decimal half-up `0.58`. Governing comparisons continue to use the unrounded value. `tests/engineering-number-format.test.js` covers positive and negative ties, carry, small values, zero and invalid input.

## 2026-08-11 Axial Member Compression-default Audit

AS 4100 Table 6.3.3(A)/(B) was rechecked against the complete Axial Member family mapping. Cold-formed non-stress-relieved CHS/RHS/SHS use `alpha_b = -0.5`; hot-rolled UB/UC use `alpha_b = 0` up to 40 mm flange thickness and `1.0` over 40 mm; PFC, EA and Round Bar use the applicable listed or other-section row selected by `k_f`.

The CHS dimension override previously retained the selected catalogue row's `k_f`. This conflicted with the governed ideal-circular override basis of `k_f = 1.0` and could incorrectly retain `k_f = 0.857`, `0.904` or `0.960` from the three affected C350L0 CHS rows. The production path now resolves `k_f` and `alpha_b` together in `member-capacity.js`; active CHS and Round Bar dimension overrides adopt `k_f = 1.0` without inheriting the source row factor. A reproduced 114.3 x 3.2 CHS override initialised from the 508 x 6.4 CHS row returns `phi Nc = 236.5449 kN` for `Le = 3.0 m`, `fy = 350 MPa` and `alpha_b = -0.5`.

`tests/member-capacity.test.js` now covers every supported family branch, both AS 4100 Table 6.3.3(A)/(B) selection paths, the UB/UC 40 mm flange boundary and the CHS override regression. The contextual CHS help text distinguishes catalogue `k_f` from the ideal-circular override value.

## 2026-08-11 Axial Member Net-section Audit

AS 4100 Cl. 7.2, Cl. 7.3.1, Table 7.3.2 and Cl. 9.1.10 were visually rechecked together with Design Manual Examples 5.3.1 and 5.3.4. The gross-yielding and net-fracture equations remain unchanged. The straight-line automatic path is limited to `An = Ag - nh dh t`; staggered holes, slots, copes, multiple paths and other topology-dependent sections remain manual.

The former page path rounded `nh` and converted blank or negative hole values to zero before calculating. It also used the EA nominal designation thickness instead of the catalogue actual thickness. The corrected path validates the unmodified user values, fails closed for invalid hole geometry, uses catalogue actual `t`, names the applicable `kt` default case and cites AS 4100 Cl. 9.1.10 in the visible trace.

`tests/independent-reproductions.test.js` independently reconstructs Example 5.3.4 as `An = 867 - 1 x 22 x 6 = 735 mm2` and `phi Ntf = 195.9528 kN`. `tests/member-capacity.test.js` checks the production helper and its whole-number, range, diameter, thickness and positive-area boundaries. `tests/member-summary.test.js` locks the actual-thickness route, no-rounding contract, connection-case wording and visible clause reference.

## 2026-08-11 Steel Member and Grade Nomenclature Audit

The visible family and grade vocabulary was checked against `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` and `AS36791.pdf` before the Section Properties, Beam and Axial Member labels were aligned.

| Item | Primary evidence | Adopted conclusion |
| --- | --- | --- |
| EA family | InfraBuild Tables 19-21, PDF pages 19-21 | Use visible family label `EA`, expanded as `Equal Angle` through accessible text or first-use supporting copy. Adopted rows include Grade 300 (300PLUS) and Grade 350 data. Catalogue supply notes state Grade 350 is by enquiry and depends on section and quantity. |
| Round Bar family | InfraBuild Table 3 `Rounds`, PDF page 9; Table 38 strength rows, PDF page 31 | Use visible family label `Round Bar` and designation such as `Ø24 Round Bar`. Do not use `Rod` or `ROD` for this family. Both Grade 300 (300PLUS) and Grade 350 have diameter-dependent strength rows; confirm actual grade and diameter availability. |
| Excluded catalogue product | InfraBuild Table 7 `Rods and Light Billets`, PDF page 11 | This is a separate product family. The catalogue states that these products are not available in structural grades 300PLUS or 350, so Table 7 is not used by the calculator. |
| Grade basis | AS/NZS 3679.1:2016 Table 15; InfraBuild Tables 6, 20 and 38 | Show `Grade 300 (300PLUS)` for the internal `300PLUS` product key and show `Grade 350` unchanged. `300PLUS` is the branded product name and exceeds the AS/NZS 3679.1 Grade 300 minimums. Do not add Grade 250 to the adopted EA or Round Bar selectors. |
| Hollow-section grades | AS/NZS 1163 product-grade basis | Keep `C250L0`, `C350L0` and `C450L0`; generic Grade 250 / 350 / 450 labels would remove required product-form meaning. |

Internal family and grade keys remain `ea`, `rod`, `300PLUS` and `Grade 350` so that the nomenclature correction does not alter source data, formulas or saved selector logic. Visible labels are resolved through the shared `SteelMaterials.gradeLabel()` function and the canonical family-label maps. A nomenclature contract test verifies the shared labels, page selectors, outline rule and Table 7 exclusion.

## 2026-08-11 Rock Anchor Source-row and Fail-closed Audit

Freyssinet bar and strand rows, DYWIDAG Grade 150 threadbar rows, SAS threadbar rows and Williams R7S Spin-Lock rows were independently transcribed from the cited official manufacturer sources. All 36 embedded numeric product rows agree with those sources. The SAS 65 mm source remains internally inconsistent: its product table gives `2,780 kN` yield load while its design-forces table gives `2,790 kN`. Build 0.7.41 therefore reports `Source conflict` for that property, retains both published values in the note and does not adopt either value. The non-conflicting `3,447 kN` ultimate load remains visible.

Williams MCP I-III and multi-strand family entries now route to their specific official product pages. The folded product basis also identifies Austroads ATS 5140-26 as an Australian execution, stressing, testing and monitoring boundary without using it to infer anchor resistance.

`tests/rock-anchor-data.test.js` executes the 36-row source matrix, the SAS conflict state, all family/provider/custom unpublished states, source-link routing, source/supply metadata and the no-resistance/no-utilisation data boundary. This complements the DOM contract rather than treating source-code text matching as product-data reproduction.

## 2026-08-11 U-bolt and Structural Blind-bolt Source-reproduction Audit

Build 0.7.42 rechecks the two manufacturer-product branches without adding project actions, utilisation or complete connection design. The U-bolt lookup remains a curated, non-exhaustive selector. Its nine adopted EzyStrut E14 rows reproduce the manufacturer datasheet geometry and working loads with the stated 3:1 safety factor; the source link now opens that exact datasheet, whose zero-padded product codes match the embedded rows. Eleven Hobson round U-bolt rows reproduce the checked geometry table and remain `Not published` for rated structural load.

The structural blind-bolt source matrix contains 90 catalogue rows: 15 Lindapter Hollo-Bolt, 15 Hobson HBS-Bolt, 15 ICCONS UNI-BOLT, 15 Kee Safety BoxBolt, 21 Blind Bolt Company and 9 Allfasteners NexGen2 rows. Each family retains its manufacturer safety basis. The audit found that Blind Bolt Company values had been mapped from the two shear columns while the page labelled them as tension and shear over thread. The corrected rows now map the March 2026 PDF `Ft,Rd` column to tension and `Fv,Rd,thread` to shear over thread for M8-M30. No `Fv,Rd,slot` value is substituted.

Two current official Blind Bolt Company sources conflict. The March 2026 PDF states 34 Nm for M14 while the current product page states 40 Nm. For GBB1690HDG, the PDF states a 13 mm minimum fixing thickness while the product page states 16 mm. Build 0.7.42 displays both torque values, requires manufacturer confirmation and uses 16 mm as the conservative compatibility-filter minimum while retaining both published grip values in the conflict note.

`tests/product-lookup-data.test.js` independently executes the adopted U-bolt source rows, all blind-bolt product codes and grip ranges, each family/size value table, source dates and safety-basis labels. `tests/product-lookup-dom.test.js` separately locks the lightweight lookup structure, product-basis heading, exact source routing and conflict-display contract.

## 2026-08-12 Section Properties Display and Issue-status Audit

Build 0.7.43 aligns the Section Properties display layer with the governed decimal half-up rule without changing geometry, material resolution, catalogue values, capacity methods or source classifications. Section-property summaries, material constants, design attributes, derived formula substitutions and derived results now use the shared formatter. Three-significant-digit catalogue `Ze` display is also rounded by the shared decimal method before grouping; engineering calculations continue to use unrounded values.

The Screw Piles Selector heading now shows `For Review · product data · limitations`, consistent with the module register and the allowed issue-status vocabulary. The status contract checks that every current tool exposes exactly one allowed issue-status prefix rather than only preventing an unsupported `Checked` claim.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-SECTION-DISPLAY-01` | Section Properties display block | Scan the complete Section Properties rendering path for direct `toFixed()` and `toLocaleString()` calls | No direct binary or `Intl` engineering rounding remains in the block; all values route through shared decimal half-up helpers |
| `AUD-SECTION-DISPLAY-02` | Shared significant-digit formatter | Check positive/negative ties, decimal values, small values, carry and invalid input | Decimal half-up significant-digit cases pass, including `569.5 -> 570` and `9995 -> 10000` at three significant digits |
| `AUD-ISSUE-STATUS-01` | All ten public tools | Extract every `.tool-status` value and check its prefix against the governed status vocabulary | Ten statuses found; all begin with `Draft`, `For Review`, `Checked`, `Superseded` or `Do_Not_Use` |
| `AUD-SECTION-RESPONSIVE-02` | Section Properties at 1440 x 900 and 390 x 844 px | Reload Build 0.7.43 and inspect the default 380PFC state | No document-level horizontal overflow; the phone figure remains available; grouped values and fixed catalogue precision remain readable |

All 36 local regression files and JavaScript syntax checks pass. The local browser console reports no warnings or errors. The continued cross-module display audit identified remaining direct user-facing binary-format calls outside Section Properties; those calls require a separate controlled migration because they span multiple calculation traces and standalone modules.

## 2026-08-12 Cross-module Calculation Display Audit

Build 0.7.44 completes the controlled display-only migration identified by the Section Properties audit. Bolt, Weld, Beam, Axial Member, Reinforcement and Steel Monopole visible engineering results, summaries, warnings and formula substitutions now use the shared decimal half-up formatter. Unrounded values still govern every calculation and comparison. Published product-table values, editable-input serialization, generated designation text and SVG path coordinates remain outside this display-rounding contract.

The public tool-navigation label is now `Steel Monopole Section Capacity`, matching the page heading, module register and `SC_HANDBOOK.md` public-name rule. No capacity method, input default, source row, design scope or issue status changed.

| Audit ID | Page / state | Reproducible check | Result |
| --- | --- | --- | --- |
| `AUD-CALC-DISPLAY-01` | Bolt, Weld, Beam and Axial Member visible calculation blocks | Scan the governed output, summary and formula-trace functions for direct `toFixed()` and `toLocaleString()` calls | No direct binary or `Intl` engineering rounding remains; output uses shared decimal half-up helpers |
| `AUD-CALC-DISPLAY-02` | Reinforcement calculation notices and candidate labels | Load `reo-calculation.js` through the browser and CommonJS test path, then scan for direct formatting calls | The module requires the shared formatter in both paths; no direct binary or `Intl` rounding remains |
| `AUD-CALC-DISPLAY-03` | Steel Monopole calculated display | Inspect the local fixed-precision grouping helper and all default calculated outputs | Fixed trailing zeros and grouped thousands are retained after shared decimal half-up rounding; chart coordinates remain an explicit SVG-only exception |
| `AUD-MODULE-NAME-01` | Steel Members navigation | Compare navigation label, page heading, module register and public-name rule | All use `Steel Monopole Section Capacity` |
| `AUD-REFERENCE-FORMAT-01` | Weld, Reinforcement and Steel Monopole visible references | Scan user-facing clause, table and figure references against the complete `[source] [reference type] [number]` rule | Bare Reinforcement and Monopole clause references now repeat `AS 3600` or `AS 4100`; the Weld supporting figure uses `Fig.` consistently |
| `AUD-CALC-RESPONSIVE-01` | Weld, Beam, Axial Member, Reinforcement and Steel Monopole at desktop and 390 x 844 px | Load every affected tab, inspect default outputs and trace-row counts, and measure document overflow | All panels load with non-empty result/trace content and zero document-level horizontal overflow; the Monopole schedule retains intentional internal table scrolling |

All 37 local regression files and JavaScript syntax checks pass. The local browser console reports no warnings or errors across the affected tabs.

## 2026-08-12 Cross-module Input-state and Stale-result Audit

Build 0.7.45 exercises the governed valid-to-invalid-to-valid transition on every page that performs an engineering calculation. The audit checks the complete displayed dependency chain: result value, scope/status wording, warning, formula content, table rows and recovery after the input is restored. Product-only Bolt and Rock Anchor lookup branches remain covered by their source-state tests rather than being represented as calculation pages.

| Audit ID | Page / transition | Browser result |
| --- | --- | --- |
| `AUD-BOLT-STATE-03` | Valid standard bolt to invalid `k_r`; valid bolt group to `n_b = 0`; restore both values | Per-bolt shear clears for invalid `k_r`; group shear, bearing and tear-out clear for invalid count; restored inputs recalculate without stale values |
| `AUD-WELD-STATE-03` | Valid fillet weld to `l_w = 0`; restore length | Capacity per unit length, total capacity and status become `Not evaluated`; restored geometry recalculates |
| `AUD-SECTION-STATE-03` | Valid custom RHS to wall thickness greater than half the smaller outside dimension; restore thickness | All section properties clear, the previous figure is hidden and the exact geometry error is shown; valid properties and figure return after restoration |
| `AUD-AXIAL-STATE-03` | Valid CHS member to `L_e = 0`; restore effective length | Compression, tension, utilisation and governing state clear; restored input reproduces the prior capacities |
| `AUD-BEAM-STATE-03` | Valid UB material to invalid member-strength path while the independent web-strength path remains valid; restore `f_y,m` | Moment becomes `Not evaluated`; shear remains calculated from `f_y,w`; status now states `Partial result · shear calculated; moment not evaluated`; restored material returns both capacities |
| `AUD-CONCRETE-STATE-03` | Valid pad strip to `f'_c = 10 MPa`; restore `32 MPa` | Flexural and one-way shear values clear and `Invalid input` is shown; restored concrete strength reproduces both section capacities |
| `AUD-REO-STATE-04` | Valid Basic lap case to `f'_c = 10 MPa`; restore `32 MPa` | Adopted length and ratio clear with `INVALID INPUT`; restored input reproduces `840 mm` and `42.0 d_b` |
| `AUD-SCREW-STATE-03` | Enter `N* = 100 kN` for the default eight-pile group; set `n_x = 1`; restore `n_x = 3` | All pile actions and reaction rows clear with `Input required`; restored layout reproduces eight rows and `12.5 kN` maximum compression |
| `AUD-MONO-STATE-03` | Valid 8-sided polygon to `r_i/t_nom = 0`; restore `1.5` | Mass, station rows and both capacity summaries clear; summaries use `Not evaluated`; restored radius reproduces 25 station rows and base `M = 450.4 kN.m` |

The Beam correction is status-only: it preserves a valid shear result when only the member-strength path is invalid, but no longer labels the whole result block as simply unavailable. The Steel Monopole correction replaces the ambiguous `Not checked` wording with the governed `Not evaluated` state. No formula, source value, input default or resistance result changed.

The corrected Beam and Steel Monopole invalid states were also rechecked at 390 x 844 px. Both controlling messages remain visible after layout stabilisation, and neither page has document-level horizontal overflow.

## 2026-08-12 Selector, Override and Reset Transition Audit

Build 0.7.47 extends the stale-result review from single invalid inputs to complete state transitions. Each case was exercised in the local browser by changing the governing selector or auto/manual state, editing the newly active input, returning to the original state and checking the displayed value, status and dependency basis. Formula methods, source values and capacity factors are unchanged.

| Audit ID | Page / transition | Browser result |
| --- | --- | --- |
| `AUD-BEAM-TRANSITION-01` | Catalogue material -> user `f_y` override -> reset; catalogue -> Custom dimensions -> catalogue | Override status and moment update together; reset restores current catalogue strengths; Custom clears the catalogue capacity until a material basis is selected; returning to catalogue reproduces the original result |
| `AUD-SECTION-TRANSITION-01` | Geometry-linked material thickness -> manual thickness override -> `Use geometry`; RHS -> circular form | Linked thickness follows geometry; manual thickness remains independent; reset restores linkage; changing form clears incompatible material selections and suppresses material-dependent output |
| `AUD-AXIAL-TRANSITION-01` | CHS dimension override with default `A_n = A_g`; direct manual `A_n`; override reset | Changing `D` from 114.3 mm to 200 mm updates both `A_g` and the unedited `A_n` to 1,978 mm2. Entering `A_n = 1,500 mm2` stops linkage while later geometry changes continue to update `A_g`. Resetting the dimension-override basis restores `A_n = A_g` |
| `AUD-AXIAL-TRANSITION-02` | EA automatic straight-hole deduction -> manual net area -> automatic deduction | Automatic `A_n = A_g - n_h d_h t` is read-only and updates tension capacity; Manual accepts the project net area; returning to Auto reproduces the straight-line deduction |
| `AUD-WELD-TRANSITION-01` | Fillet -> IPBW -> CPBW -> Compound -> Fillet | Fillet size does not affect IPBW and effective throat does not affect fillet. CPBW and Compound return `Not evaluated` without actual joined-part or compound geometry. Returning to Fillet reproduces the active fillet result |
| `AUD-BOLT-TRANSITION-01` | Standard bolt -> U-bolt lookup -> structural blind-bolt lookup -> Standard bolt | Product selections remain isolated from the AS 4100 standard-bolt calculation. The selected M20 X-plane result returns unchanged at 129.3 kN shear and 162.7 kN tension |
| `AUD-REO-TRANSITION-01` | Basic -> Refined confinement confirmations -> Basic; hook confirmation -> cog | Candidate-length, pressure and effective-location confirmations clear when their method, evidence or length basis changes. A confirmed hook returns 310 mm; selecting cog clears the result and returns `COG DETAILING REQUIRED` until separately confirmed |
| `AUD-CONCRETE-TRANSITION-01` | Top/bottom compression; automatic mat depth -> manual depth -> automatic; bottom pad 0 -> 300 -> 0 -> 300 mm | Mirrored default top/bottom cases agree. Manual Layer 1 depth changes `phi Muo` from 287.1 to 309.5 kN.m; restoring Auto returns `y = 105.0 mm` and 287.1 kN.m. Bottom mats disable and clear at zero depth, then recover their auto geometry when the bottom pad returns |
| `AUD-SCREW-TRANSITION-01` | 3 x 3 perimeter -> full grid -> perimeter; project value without source -> sourced matching basis -> mismatched basis | Perimeter and grid produce 8 and 9 reaction rows. Missing source or mismatched action/value bases suppress utilisation. A sourced matching ULS case gives `eta_proj = 0.56` for 11.25/20 |
| `AUD-MONO-TRANSITION-01` | Nominal/design thickness; circular/polygon; schedule/overall; plate/manual material | Design thickness changes capacity but not physical mass and resets to nominal when disabled. Circular and polygon methods remain isolated. Schedule and overall geometry preserve their own values. Plate `f_y` is read-only derived data and becomes editable only in Manual mode |

The audit identified and corrected two dependency defects. First, the CHS/Round Bar initial unperforated `A_n` retained an earlier gross area after a dimension override; it now follows current geometry until directly edited. Second, the Reinforcement effective transverse-location confirmation survived a Refined-to-Basic transition; both lap and development paths now clear that confirmation whenever a candidate-length or evidence input changes. Static state-contract tests lock both reset rules.

All 37 local regression files, JavaScript syntax checks and `git diff --check` pass. Axial Member, Reinforcement, Concrete Pad, Screw Piles and Steel Monopole were reloaded at 1440 x 900 px and 390 x 844 px with no document-level horizontal overflow. A missing favicon was the only initial console error; the empty data favicon removes that unrelated request, and the final phone-width route sweep reports zero browser warnings or errors.
## 2026-08-12 Rock Anchor Catalogue and Selection-flow Update

The selector remains a two-level `Supplier` to `Product / system` workflow. The product list uses only four broad evidence/procurement groups: `Published products`, `System families`, `Australian pathways` and `Project schedule`. These are not subdivided again by tendon form. No third selector, product-results table, design resistance or utilisation has been added.

The numeric source matrix now contains 51 published rows: the previous 36 rows, Williams R7S Spin-Lock 48 mm and 14 BBR CONA CMG Y1860S7-15.7 rows from system sizes 0206 to 2206. Selected-product output retains each manufacturer's terminology (`yield`, `ultimate`, `Fp0.1k` and `Fpk`) and now also exposes system configuration, standard/approval, published geometry or code, and the Australian pathway. Missing row-level values remain `Not published`.

Current DYWIDAG Threadbar, Strand, Twin-Corr, Multi-Stage and El-Iso families and current Freyssinet Permanent Freyssibar/A2/B2 families are source-bound system entries without inferred loads. VSL, Freyssinet and DYWIDAG Australian routes are identified separately from exact-product availability. BBR/SRG entries require current specialist certification; the previously located 2025/26 certificate is not treated as current after its 31 March 2026 expiry.

The concise-query pass removes repeated supplier prefixes from selector labels where practical, keeps full names in the selected-product heading, changes the section heading to `Key product data`, removes repeated component/protection prompts and links an Australian reference/contact only where an official route has been identified. The local-provider link is supporting evidence, not confirmation of current product availability or project acceptance.

`tests/rock-anchor-data.test.js` reproduces all 51 numeric rows and checks exact load labels, source routing, grouping, unpublished states and Australian-pathway wording. `tests/rock-anchor-dom-contract.test.js` locks the new selected-product fields, grouped selector contract, source links and no-resistance boundary.

All 35 local Node test files and `git diff --check` pass. Browser reproduction at 1280 px and 390 x 844 px confirms no document-level horizontal overflow, a three-column-to-single-column specification-grid transition, grouped BBR and DYWIDAG selections, correct SRG/Custom unpublished states and no console errors.

## 2026-08-13 Build 0.7.47 Step 10 Release Verification

The accepted Build 0.7.47 display, stale-state and selector-transition audits were integrated with the three newer local `main` commits for the Rock Anchor and Screw Piles selectors before release. Conflict resolution retained the complete calculation-audit history, the current Foundation selector data and styles, the audited Monopole state handling and a new shared `app.js` release cache key. No source row, formula, capacity factor or calculation scope was removed during integration.

| Release gate | Evidence | Result |
| --- | --- | --- |
| Source and regression preservation | Run every `tests/*.test.js` file after integration, including the 51-row Rock Anchor source matrix and Screw Piles product-data contract | 38/38 test files pass |
| JavaScript validity | Run `node --check` on the shared app, formatter, Reinforcement, Monopole and Rock Anchor modules | Pass |
| Repository integrity | Scan conflict markers and run `git diff --check` | No conflict markers or whitespace errors |
| Desktop release state | Reload all ten public tools at 1440 x 900 px | Correct active panel and status; no document-level horizontal overflow |
| Phone release state | Reload all ten public tools at 390 x 844 px | Essential inputs/results remain available; no document-level horizontal overflow |
| Runtime log | Traverse all released routes in the clean browser session | 0 errors; 0 warnings |

The verified release candidate was committed as `680bae0` and pushed to remote `main`. GitHub Pages run `31639342546` completed successfully. A cache-busted public fetch returned HTTP 200 with Build 0.7.47, the audited shared-app, stylesheet, formatter, Monopole and Rock Anchor resource keys, and all ten released tool panels. This closes audit protocol Step 10 for the public release.

## 2026-08-13 Build 0.7.48 Public-Beta Release Governance

Build 0.7.48 adds the public-release boundary without changing a formula, source value, capacity factor, result branch or calculation scope. The first viewport now identifies the site as `Public beta`, states that it is not certified design software and links directly to the public issue tracker. The footer records the public-beta Build and technical-review date and links to the publication, repository and third-party notices.

The retired Austube resource URL was replaced by the current official Design Capacity Tables application-guide page. Repository terms, a public engineering/copyright/privacy notice, Lato third-party attribution and the complete SIL Open Font License 1.1 text were added. The repository now contains a governed GitHub Pages workflow in which deployment depends on the complete Node test suite, production JavaScript syntax checks and `git diff --check`. GitHub Pages must be switched from the legacy branch build to GitHub Actions before this workflow is treated as the active public deployment gate.

`tests/public-release-contract.test.js` preserves the visible beta boundary, feedback route, Build/cache key, current Austube link, notices, font licence and verify-before-deploy dependency. The integrated suite passes 39/39 test files; five production JavaScript syntax checks and `git diff --check` pass. Local browser review at 1440 x 900 px and 390 x 844 px shows the compact notice without page-level horizontal overflow or calculator reordering; the console reports zero errors and zero warnings.

Standards-content publication entitlement remains a non-technical release decision. Technical verification does not grant permission to reproduce Standards content. Keep the public-beta status until the Standards-derived formula/table/figure inventory has been reviewed against the applicable licence or written permission.

## 2026-08-14 Build 0.7.49 Polygon Flat-width Correction

Build 0.7.49 corrects the regular-polygon flat-width substitution without changing the supported section forms, material inputs, station model or scope. ASCE/SEI 48-19 Appendix B defines the mean across-flats dimension as `D = Do - t` and the clear flat width as `w = tan(pi/n)(D - t - 2BR)`. For the page input `Do`, the implemented expression is therefore `w = tan(pi/n)(Do - 2t - 2BR)`. The previous implementation omitted the second thickness deduction.

The correction reduces `w` and local slenderness. It changes permitted moment only where the section is in a reduced-stress branch; full-yield examples remain unchanged. The default editable 508 x 6.4 mm 8-sided case remains `M = 450.4 kN.m`. The 900 x 8 mm reduced-stress audit case changes from `1637.4 kN.m` to `1645.9 kN.m`.

The public ASCE 48-11 `PolygonCapacity.xlsx` octagonal worksheet was independently reproduced as a secondary external subcheck. After mapping its mean dimension `D = 20 in` to page input `Do = 20.5 in`, the exact implementation agrees with its rounded `Ag`, `I`, `w` and full-yield `Fa` quantities within 0.25%. Its final combined-stress result is not treated as a verification of the page's direction-independent ASCE/SEI 48-19 pure-bending result. Regular-polygon capacity remains `For Review`; polygon combined axial-bending stress remains `Not evaluated`.

The complete local test suite, production JavaScript syntax checks and `git diff --check` pass. The corrected polygon state was reproduced at 1428 x 900 px and 390 x 844 px with no document-level horizontal overflow or browser console warning/error. The Monopole calculation and display resources use a new cache key for publication.

The release candidate was committed as `f2a03eb` and pushed by fast-forward to remote `main`. GitHub Pages workflow `31740072198` completed both verification and deployment successfully. A cache-busted public fetch returned HTTP 200 with Build 0.7.49, both `20260814polygonflat1` Monopole resources and the corrected flat-width expression. Direct public-browser reproduction returned `Base M = 450.4 kN.m`, `Combined polygon stress: Not evaluated`, the corrected visible formula and no console warning/error.

## 2026-08-14 Build 0.7.50 Rolled-web Shear Correction

Build 0.7.50 corrects the UB, UC and PFC catalogue shear area from `d1 tw` to the AS 4100 Cl. 5.11.4 gross web area `d tw`. The clear web depth remains `dp = d1` only for the Cl. 5.11 web-slenderness calculation. Custom ideal geometry retains its independently derived physical web area and is not changed by this catalogue correction.

The correction is reproduced against the published 360UB50.7 design-manual example. Using its rounded `d = 356 mm`, `tw = 7.3 mm` and `fy,w = 320 MPa` gives `phi Vv = 449.1 kN`, consistent with the published `449 kN`. Using the page's catalogue precision `d = 355.6 mm` gives `phi Vv = 448.6 kN`; with `M* = 232 kN.m` and unrounded `phi Ms = 242.19 kN.m`, the page gives reduced `phi Vvm = 299.3 kN`, compared with the source's rounded `299.1 kN`.

The default 310UB40.4 result changes from the superseded `298.9 kN` to `320.4 kN`. Tests lock representative UB, UC and PFC gross-web areas, the source-rounded independent reconstruction, interaction branches and the visible formula/source wording. The release remains a section-capacity quick check; member stability, bearing stiffeners, load introduction and complete beam design remain excluded.

The correction was committed as `4d769cf` and pushed to remote `main`. GitHub Pages workflow `31743855712` completed verification and deployment successfully. A cache-busted public fetch returned Build 0.7.50 and the corrected shared-app key. Direct public-browser reproduction of 360UB50.7 returned `Aw = 2,596 mm2`, `phi Vv = 448.6 kN`, the distinct `dp = d1` slenderness and `Aw = d tw` basis, zero document-level horizontal overflow and zero console warnings or errors.

## 2026-08-18 Build 0.7.51 Canonical Section Product Directory

Build 0.7.51 makes Section Properties the canonical source-backed product directory for the handbook. The accepted release baseline is 28 UB, 13 UC, 10 PFC, 74 CHS, 89 RHS, 88 SHS, 46 EA and 26 Round Bar sizes. Beam and Axial Member now consume the same frozen family arrays rather than rebuilding hollow-section lists or selecting separate rolled-section arrays. A downstream page may still expose only the families supported by its calculation method.

The Section Properties selector reports the active family count and dimension range and adds one folded all-family coverage summary. The CHS directory retains all 73 Austube Tables 3.1-1/2 rows through 508 mm outside diameter and the separately checked Orrcon 60.3 x 3.5 geometry-only row. Product availability is not inferred, and wider sizes remain excluded until row-level engineering properties are verified.

The production source-path regression checks the complete eight-family count baseline and reproduces the 508 x 6.4 CHS catalogue properties. All local regression files pass, JavaScript syntax checks pass and the locally served cache-busted page contains the canonical directory build. Rendered browser evidence remains a separate release check.

## 2026-08-18 Build 0.7.52 Dependent Selector Reconciliation

Build 0.7.52 closes the dependent-selector gap found after the canonical directory release. Section Properties continues to expose 74 CHS rows, including the Orrcon `60.3 x 3.5 CHS` geometry-only lookup. Beam and Axial Member now consume a shared checked-design-row view and expose only the 73 CHS rows that contain both the required Austube axis properties and at least one checked grade record. No blank grade or inferred capacity is created for the geometry-only row.

The same view preserves canonical directory order rather than applying an Axial-specific ascending sort. Browser checks confirm Beam and Axial Member each expose 73 CHS, 89 RHS, 88 SHS and 46 EA designations. CHS runs from `508 x 12.7 CHS` to `26.9 x 2 CHS`; RHS runs from `400 x 300 x 16 RHS` to `50 x 20 x 1.6 RHS`; SHS runs from `400 x 400 x 16 SHS` to `20 x 20 x 1.6 SHS`; EA runs from `200 x 200 x 26 EA` to `25 x 25 x 3 EA`.

All 39 local test files pass, including the 981-row Beam catalogue reconciliation, checked-design-row source reproduction and Beam/Axial contracts. Syntax checks pass for all 19 root JavaScript modules and `git diff --check` passes. Direct local routes for Section Properties, Beam and Axial Member initialise correctly at desktop and 390 x 844 px; no document-level horizontal overflow, browser warning or browser error was observed.

The implementation release was committed as `17c7c00` and pushed by fast-forward to remote `main`. GitHub Pages workflow `32101867964` completed verification and deployment successfully. A cache-busted public fetch returned HTTP 200 with Build 0.7.52 and the `20260818sectiondirectory2` catalogue/app keys. Direct public-browser checks reproduced 74 CHS rows in Section Properties and 73 CHS rows in both Beam and Axial Member, with `508 x 12.7 CHS` first and `26.9 x 2 CHS` last; all three direct routes initialised and the browser console reported zero warnings or errors.

## 2026-08-19 Build 0.7.56 Reinforcement State and Language Contract

Build 0.7.56 keeps the verified AS 3600 calculation equations and result values unchanged. The visible Basic / Refined selector is now `Calculation method`, cast-in straight development is consistently labelled `Development reference length`, and PIR remains `AS 3600 reference depth`. The page stays a lightweight `For Review` length aid; no product-capacity, available-depth, interface or foundation-design workflow has been added.

Reinforcement confirmation invalidation is now defined once in `reo-state.js` and consumed by the page event handler. A change to the lap method or any input that changes the Refined candidate clears stale `k7`, transverse-location, candidate-count and pressure evidence as applicable. Lap and development evidence remain independent. The final reduced-length Refined confirmation no longer clears the upstream location, count or pressure evidence that it confirms.

`tests/reo-state.test.js` executes the route, method, candidate-input and final-confirmation matrix. The DOM contract locks the state-module load order and revised professional labels. All 40 local test files, all root JavaScript syntax checks and `git diff --check` pass. Fresh rendered desktop and phone screenshots were not captured in this run because the local in-app browser connection was unavailable; no CSS or layout structure changed, and the module remains `For Review` until that visual release evidence is refreshed.

## 2026-08-20 Build 0.7.57 Concrete Pad Directional Reinforcement

Build 0.7.57 aligns the Concrete Pad Section page with the canonical outline without changing the verified AS 3600 flexure or one-way shear equations. X- and Y-direction reinforcement states are stored independently, the compact table shows one checked direction at a time, and the default `Inner layer` depth reads the matching perpendicular bar diameter at each reinforcement location. The page states that this is a conservative directional screen rather than a physically simultaneous stacking order; drawing-derived manual depths remain available.

Visible wording now uses plain engineering terms including `Two-way reinforcement`, `Direction to check`, `perpendicular bars`, `inner layer` and `outer layer`. N-bar calculation areas are aligned with AS/NZS 4671:2019 Table 7.5(A), including N10 = 78.5 mm2, N36 = 1020 mm2 and N40 = 1260 mm2. InfraBuild remains the supporting source for current product availability and the N40 on-request status; supplier mass and ordering tables do not replace the Standard calculation areas.

The full 40-file Node regression suite, JavaScript syntax check and `git diff --check` pass after integration with the latest `main`. Local browser verification reproduces the default `phi Muo = 287.1 kN.m` and `phi Vu = 194.2 kN`, with no console warnings or errors. A narrow-viewport footer nowrap rule was removed so the public build line wraps instead of creating document-level horizontal overflow.

## 2026-08-20 Build 0.7.58 Concrete Pad One-Metre Strip Simplification

The local Concrete Pad page fixes `b = 1000 mm` and removes the X/Y reinforcement selector and duplicated hidden direction state. The entered reinforcement is the longitudinal reinforcement parallel to bending for the one-metre strip. Where the other pad direction differs, the inputs are changed and the check is repeated; the page does not compare or declare a governing direction without compatible design actions.

The local follow-up defaults to `Two-way reinforcement` and assumes each mat uses one bar size in both directions. Automatic depth therefore uses `c_nom + 1.5d_b`; the one-way option uses `c_nom + 0.5d_b`. The perpendicular reinforcement area is not included in flexure, `Ast`, `d` or `dv`. Each displayed depth remains directly editable; a compact `Auto` action appears only after an override and restores the derived value.

The visible `Include` and `Auto depth` controls are removed. `None / plain concrete` in the mat bar selector excludes that mat, while `f_sy` is set from the selected N or legacy Y designation and remains editable. Source details, capacity-factor notes and shear-derived values are retained in the folded calculation evidence rather than repeated on the main page. The AS 3600 flexure and one-way shear calculation modules are unchanged by these interface simplifications.

All 40 local regression files and the JavaScript syntax check pass. Browser checks at desktop and 390 x 844 px reproduce the default `phi Muo = 287.1 kN.m` and `phi Vu = 194.2 kN`, show no document-level horizontal overflow or console warning/error, and confirm that a manual bottom-pad layer depth survives a `D_bot = 300 -> 0 -> 300 mm` transition.

## 2026-08-20 Build 0.7.59 Steel Monopole Page Hierarchy

Build 0.7.59 keeps the accepted circular AS 4100 and regular-polygon ASCE/SEI 48-19 calculation paths unchanged. The visible Monopole workflow is reduced to `Input data`, `Derived shaft properties` and `Capacity results`. Geometry, the active profile or physical-section schedule, and material/resistance inputs are peer groups under the single input stage. The result disclosures remain `Moment capacity` and the circular `Compression and bending capacities`; the latter reports section-capacity intercepts only and does not accept actions or calculate utilisation.

The AS 4100 circular fabrication selector is now explicitly labelled `AS 4100 CHS category`. `CF` is identified as the Table 5.2 category adopted for the verified AS/NZS 1163 cold-formed CHS example and is not inferred from ordinary cold-forming of a fabricated plate shell. The page states that AS/NZS 4600 is not evaluated. Polygon combined stress remains `Not evaluated`.

Monopole typography now uses the shared 15 px stage/disclosure, 13 px group/field and 12 px helper/source scale. Background colour is reserved for the geometry-mode selector, editable schedule header, derived shaft summary, expanded capacity disclosure and warning states. Ordinary stage headings and input groups are unfilled; the editable schedule retains its restrained frame.

All 40 local regression files, 20 root JavaScript syntax checks and `git diff --check` pass. Browser checks at 1440 x 1000 px and 390 x 844 px show no document-level horizontal overflow. Circular, polygon, continuous-taper and fabricated-section state changes recalculate correctly; the default circular fabricated-section example retains `Base phi Ms = 407.9 kN.m` and `Base phi Ns = 2,723.3 kN`.

The implementation release was committed as `fac0d34` and pushed by fast-forward to remote `main`. GitHub Pages workflow `32375114084` completed verification and deployment successfully. A cache-busted public browser check returned Build 0.7.59 with `styles.css?v=20260820monopolelayout1` and `monopole-app.js?v=20260820monopolelayout1`, reproduced the two default base capacities, and showed no document-level horizontal overflow at desktop or 390 x 844 px.

## 2026-08-21 Build 0.7.63 Reinforcement Query Hierarchy

Build 0.7.63 consolidates the Reinforcement query refinements into the current shared application without changing the verified AS 3600 equations, result values, qualification gates or confirmation-invalidation contract. The main order is `Check selection`, `Design conditions`, `Inputs`, calculated basis, primary result and optional adjustments. Common but editable lap conditions remain in one collapsed `Additional conditions` summary; development keeps its reference basis, concrete conditions and geometry in engineering order. Calculated `c_d` remains a derived output rather than an editable-looking field.

Visible text uses concise Australian engineering terms. The optional path remains `Refined development method` and retains `n_f`, `n_bs`, `Sigma A_tr`, `k_4`, `k_5` and `rho_p` for traceability. Development dynamically distinguishes the cast-in and PIR concrete context. PIR remains an `AS 3600 reference depth`, not a product installation depth, and the page adds no product-capacity, interface or foundation-design workflow.

The active path title is visually distinct from its compact tag. The six primary input-group headings share one restrained accent rule and stronger 14 px type, while field labels retain the shared form treatment. `Calculated c_d`, result cards and optional disclosures remain separate output or secondary-content patterns. The merged cache keys include the current remote Bolt and Monopole updates as well as the Reinforcement presentation change.

After integration with remote `main`, all 40 local test files, all 20 root JavaScript syntax checks and `git diff --check` pass. The locally served Build 0.7.63 page was rechecked at 1440 px and 390 px on both lap and PIR development routes: the specified heading levels rendered, the combined style/app cache keys loaded, there was no document-level horizontal overflow, and the browser console reported no warnings or errors. The module remains `For Review` pending the normal public deployment verification.

The integrated release was committed as `920e52e` and pushed to remote `main`. GitHub Pages workflow `32379820550` completed verification and deployment successfully. A cache-busted public browser check returned Build 0.7.63 with `styles.css?v=20260821reomerge1` and `app.js?v=20260821reomerge1`, opened the Reinforcement route directly, showed the accepted heading hierarchy, and reported no document-level horizontal overflow or console warning/error at desktop and 390 px. The public module remains `For Review` within the visible public-beta boundary.

## 2026-08-21 Build 0.7.73 Steel Monopole Segment Model

Build 0.7.73 integrates the latest Beam, Weld and Axial Member release updates and replaces the separate continuous-taper and fabricated-section inputs with one `Profile segment schedule`. One row represents a continuous constant or tapered shell. Additional rows with `L_o,i = 0` represent calculation boundaries for geometry, thickness or material changes without implying a joint. A positive `L_o,i` represents the length over which upper segment `S_i` extends downward outside lower segment `S_i-1`.

The Monopole page now uses one visible calculation sequence: `Input data`, compact `Derived properties`, then `Capacity results`. Redundant stage subtitles were removed because the Geometry, Profile segment schedule, and Material and resistance basis groups already identify the inputs. The shared 15 px, 13 px, and 12 px type levels distinguish stages and capacity disclosures, input groups and values, and supporting method or scope text respectively; control and table dimensions were not reduced. A restrained grey-green tint and 3 px left rule identify the two stage headings without shadows or letter locators; ordinary input groups remain unfilled.

The installed-coordinate equation remains `H = sum(L_i) - sum(L_o,i)`. Both parent shells remain active and contribute steel mass in an overlap. The prescribed AS/NZS 7000 Appendix K9 screen continues to use the maximum circle inscribed within the two outside profiles; the result is displayed as `S_i over S_i-1`. Nominal geometry does not verify fit-up, tolerance, clearance, seam geometry, ovalisation, jacking force or joint resistance, and those states remain explicitly outside scope.

Before the prescribed-overlap comparison, Build 0.7.73 now checks nominal nesting at both overlap endpoints using `upper nominal inside dimension >= lower nominal outside dimension`. An incompatible pair fails closed and cannot report `Meets prescribed design overlap`. This is a necessary geometric screen, not verification of clearance, tolerances or installed fit-up. The design-thickness override now follows current `t_nom` while disabled, common section/material controls are identified as applying to all segments, and the expanded moment profile reports its minimum evaluated station.

The material selector is labelled `Yield stress source` because it controls how `f_y` is obtained, not the steel product or fabrication method. The Austube product example remains `Manual yield stress` with editable `f_y = 350 MPa`; `AS/NZS 3678 plate lookup` derives segment yield stress from grade and `t_nom`. Both paths recalculate all dependent station properties and capacities when their active inputs change.

The dual-mode conversion routine and wall-thickness-band interface were removed. Zero-overlap boundaries retain both adjacent capacity states at the exact elevation and use the chart label `Segment boundary`. The full local regression suite, JavaScript syntax checks and `git diff --check` pass. Local browser checks at 1440 x 1000 px and 390 x 844 px show no document-level horizontal overflow; the default one-segment result remains `Base phi Ms = 407.9 kN.m`. Adding the initial generated `S2` gives `H = 20.50 m`, `includes overlap shells`, and the prescribed screen identifies `S2 over S1`.
