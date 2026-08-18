# SC Handbook

`SC_HANDBOOK.md` is the only canonical project outline and rule file for this project. When the project outline, master outline or handbook rules are requested, use this file only.

## 0. Authority and Reading Order

This file governs product scope, engineering content, page behaviour, presentation and release checks. Chat notes, prototype files, CSS conventions and implementation comments may explain a decision, but they do not replace this file.

Use the outline in this order:

1. Sections 1 and 2 decide whether a function belongs in the handbook and define the required professional assurance.
2. Sections 4, 6, 7, 9, 10 and 11 govern sources, calculations, language, validation and acceptance.
3. Section 15 governs the current static web handbook. Apply Sections 15.0 to 15.9 first, then the affected tab-specific rules, then the audit protocol in Section 15.19.
4. Sections 3 and 12 apply only when an Excel workbook is explicitly requested. Workbook-specific rules do not override the current web product contract.
5. `REFERENCE_TRACEABILITY.md` stores detailed calculation records, source evidence, verification cases and unresolved gaps. This outline stores durable policy and accepted scope, not duplicate evidence logs.

Global rules take precedence over tab-specific convenience. A tab-specific rule may narrow the global scope but must not weaken source, calculation, validation, accessibility or fail-closed requirements.

## 1. Product Positioning

### 1.1 Product Role

`SC Handbook` is a lightweight, source-backed engineering quick-reference handbook. It is designed for rapid office and field lookup, transparent scoped calculations, preliminary screening and practical engineering review. The current primary deliverable is the static web handbook.

The handbook may provide five clearly distinguished result types:

| Module role | Permitted output |
| --- | --- |
| `Lookup` | A cited Standard, catalogue or project-data value |
| `Capacity` | A narrowly scoped nominal or design capacity |
| `Screen` | A compatible demand-capacity comparison, threshold or review warning |
| `Selector` | A filtered product or design-option shortlist using published criteria |
| `Derived aid` | A transparent geometry, equilibrium or action-distribution result |

Do not combine different result types under one undifferentiated answer. The page must state what the result is, what basis it uses and what engineering decision it may support.

### 1.2 Lightweight Scope Boundary

The handbook is not a complete design engine, structural-analysis model, compliance certificate, issued design report or substitute for engineering judgement. It must not imply that unimplemented limit states, project actions, topology-dependent detailing, stability, durability, construction, geotechnical or inspection checks have been completed.

Keep the primary workflow deliberately small:

- show only inputs that change the governing result, applicability, selected source value or an actionable warning;
- calculate only deterministic relationships that can be stated, sourced, verified and explained concisely;
- use a selector, warning or `Not evaluated` state where a reliable result requires a materially larger project model;
- keep advanced values and secondary evidence available through progressive disclosure rather than expanding the first screen;
- prefer one checked answer and one clear boundary over many partially implemented checks.

### 1.3 Professional Position

Professional quality means that each displayed result is traceable and dependable within its explicitly stated scope. It does not mean that the whole component, connection, member or structure complies with every applicable requirement.

- `Calculated` confirms completion of the stated method only.
- `PASS` or `FAIL` is permitted only when compatible demand and capacity bases are compared and every check claimed by that status has been evaluated.
- A warning must identify the unresolved engineering decision or next review action, not merely state that more checks may exist.
- A source gap, invalid state or method-applicability failure must stop the affected result from appearing normal or verified.
- The final engineer remains responsible for project adoption, load paths, design actions, detailing, constructability and issue approval.

### 1.4 Deliverables and Language

The default deliverable is the static application:

`index.html` with `app.js` and `styles.css`

Optional workbook deliverables remain available when explicitly requested and must follow the same source and calculation contracts. The application should remain offline-friendly where practical, with no server-side calculation required for normal use.

All project files, worksheet names, headings, field names, notes and formulas must be written in English.

## 2. Core Operating Rule

### 2.1 Module Admission Gate

A new function belongs in the handbook only when all of the following are true:

1. It answers one recurring engineering question or supports one clear decision.
2. Its required input set is compact enough for a quick-reference workflow.
3. Its governing source, applicability conditions and exclusions can be identified.
4. Its formula, lookup or selection logic can be independently verified.
5. Its result and principal limitation can be understood without a long tutorial.
6. It can fail closed when inputs, source data or method conditions are not satisfied.

If one of these conditions fails, simplify the function, make it a source-aware selector or warning-only aid, move it to a separate specialist workflow, or do not add it.

### 2.2 Required Build Sequence

Every new or materially changed lookup or calculation module must follow this sequence:

1. Define the engineering question, result type and intended decision.
2. State the method boundary, prerequisites and excluded checks.
3. Identify the governing Standard, catalogue or accepted reference.
4. Classify every value as manual input, cited lookup, editable override, assumption or read-only derived value.
5. Record the governing formulas, symbols, units, branches and result states.
6. Build the page in the canonical task order: orient, define, confirm, evaluate, review and trace.
7. Record detailed evidence in `REFERENCE_TRACEABILITY.md` or the workbook `References` sheet.
8. Verify independent numerical cases, branches, boundaries and invalid states.
9. Complete the applicable professional page and calculation audit.
10. Release only the reviewed scope and verify local and published states separately.

No formula or input should be added only because it is convenient or technically possible. Each one must have a traceable source or a clearly stated derived basis and must affect a visible engineering decision.

### 2.3 Professional Assurance Gates

Every released function must pass all five gates:

| Gate | Required evidence |
| --- | --- |
| `Scope` | One defined question, result type, applicability conditions and explicit exclusions |
| `Source` | Australian-first authority under Section 4, governing edition, clause/table/figure or catalogue row, plus source status |
| `Calculation` | Correct transcription, symbol and unit mapping, branch logic, independent numerical verification and boundary tests |
| `Interface` | Correct input classes, dependency updates, override states, invalid handling, concise warnings and no stale normal-looking result |
| `Release` | Accepted findings, regression checks, traceability update and separate local/published verification where deployed |

Passing one gate does not compensate for another. A numerically correct formula with an unverified source, inapplicable condition or misleading interface is not a checked handbook result.

### 2.4 Engineering Design and Quick-Check Logic Chain

Every capacity, screening or design-aid function must preserve the complete engineering decision chain below. The visible page may keep the chain compact, but the implementation and traceability record must not skip a step.

| Step | Required engineering content | Required outcome |
| --- | --- | --- |
| `1. Question` | Component, connection, section or product; axis, plane or direction; result type; intended decision | One unambiguous engineering question |
| `2. Design basis` | Governing Standard/catalogue, edition, limit state, action basis, units and source status | Adopted basis is identifiable |
| `3. Input basis` | Geometry/section, material, factors/assumptions, detailing and optional design actions | Each value has a class, source and dependency |
| `4. Applicability` | Clause prerequisites, geometry/material limits, fixed assumptions and detectable exclusions | Method is either applicable or stopped |
| `5. Resistance or value` | Nominal resistance or published value, then every applicable capacity/reduction/modification factor | Design resistance or source value is reconstructable |
| `6. Design action` | Compatible ULS/SLS action, distribution assumption, sign, axis, plane and units where a check is requested | Demand basis matches the resistance basis |
| `7. Comparison` | Demand/capacity ratio, interaction equation, threshold or selection criterion | Comparison is mathematically and dimensionally valid |
| `8. Governing decision` | Governing limit state, axis, case, product or threshold | The controlling result is named, not inferred |
| `9. Result status` | `Calculated`, scoped `PASS` / `FAIL`, `Review required`, `Not evaluated`, `Invalid input` or source status | Status matches what was actually completed |
| `10. Residual checks` | Excluded limit states, project confirmations, detailing/construction and next action | The user knows what remains outside the result |
| `11. Traceability` | Formula steps, clause/table/figure, catalogue row, assumptions and verification evidence | Result can be independently reviewed |

The chain must remain directionally correct. Inputs feed applicability and resistance; design actions feed only compatible comparisons; comparisons feed the governing decision; the decision feeds the status and warning. A display shortcut must not reverse or bypass this logic.

### 2.5 Workflow-Specific Claim Rules

Use the correct minimum chain and claim for the active workflow:

| Workflow | Minimum calculation chain | Permitted primary claim |
| --- | --- | --- |
| `Capacity only` | Basis + inputs + applicability + nominal resistance + factors + design resistance | `Calculated design capacity` for the named limit state; no `PASS` / `FAIL` |
| `Demand-capacity quick check` | Capacity-only chain + compatible design action + distribution + ratio/interaction + governing check | Scoped `PASS` / `FAIL` only for the checks explicitly evaluated |
| `Preliminary selection or sizing` | Design requirement + accepted criteria + candidate search + complete in-scope recheck | `Preliminary candidate` or `Review required`; never issue-ready design |
| `Published product selector` | Selection criteria + cited product data + source/adoption limitations | `Selected product data`; no design resistance unless the published basis and action comparison are compatible |
| `Derived engineering aid` | Stated assumptions + geometry/equilibrium model + derived result + limitations | `Calculated derived result`; no Standard-compliance claim unless separately checked |

Where one tab supports both capacity and quick-check use, keep the capacity result independent of optional design actions. Blank actions must suppress utilisation and `PASS` / `FAIL`, not convert demand to zero. A scoped pass must name the check, for example `Bolt shear PASS`; it must not imply `Connection PASS` when connected-ply, block shear, prying, fatigue or other relevant checks remain outside scope.

Reserve green/red pass-fail styling for a valid numerical comparison against a compatible entered design action. `For Review`, source availability, published product data, warning-only screens, calculated capacities without actions and project-confirmation states must remain neutral or review-coloured. A summary status must name its scope, such as `Weld throat PASS`, `Section check PASS`, `Axial check PASS` or `TF slip PASS`; a bare page-level `PASS` or `FAIL` is not permitted.

## 3. Optional Workbook Structure

When an Excel workbook is requested, use one workbook with multiple function-specific tabs.

Required common worksheets:

| Worksheet | Purpose |
| --- | --- |
| `Cover` | Handbook title, version, scope, disclaimer |
| `Revision` | Change log |
| `References` | Source register |
| `Units` | Unit definitions and conversions |
| `Index` | Module list and navigation |

Module worksheets should use this pattern:

| Worksheet type | Naming pattern | Example |
| --- | --- | --- |
| User-facing calculation or lookup | `<Topic>_<Function>` | `Bolt_Capacity` |
| Locked source data | `<Topic>_Data` | `Bolt_Data` |
| Optional detailed notes | `<Topic>_Notes` | `Bolt_Notes` |

Keep worksheet names short, stable, and script-friendly.

## 4. Reference Sources

Primary source location:

- `%USERPROFILE%\Documents\Codex\Reference`

All downloaded technical source files for this project must be stored in that folder. Do not keep duplicate reference PDFs, standards, catalogues, converted Markdown references or technical sheets in the project workspace. If a source document is found in another project folder, move it into `%USERPROFILE%\Documents\Codex\Reference` before treating it as a project reference. A web-only authoritative source may remain a URL record when licensing, access terms or continuous data prevent local copying; record its publisher, page title, version/date, URL, checked date and any retained evidence capture in `REFERENCE_TRACEABILITY.md`.

Storage location does not establish engineering authority. Classify and apply every source under the hierarchy below.

### 4.1 Australian-First Engineering Authority

The default engineering basis for SC Handbook is Australian. Use this order of authority:

1. Applicable Australian legislation, jurisdictional requirements, the NCC and the project design basis determine which engineering Standards and editions are adopted. They do not replace the detailed engineering clauses unless they contain a direct requirement.
2. The adopted Australian Standard or joint AS/NZS Standard, including applicable amendments and corrigenda, governs equations, factors, definitions, limit states, detailing limits and applicability conditions.
3. Referenced Australian material, product, fabrication, testing and installation Standards govern the supplied product and associated properties.
4. Australian industry design aids, commentary and handbooks from bodies such as the Australian Steel Institute, Concrete Institute of Australia, Austroads and recognised professional organisations may explain application and provide design tables or examples. Treat them as `Interpretive` unless the project basis gives them another formal role.
5. Australian manufacturer catalogues, technical data sheets, certificates and evaluation reports govern published product geometry, availability and manufacturer-stated values. They do not create a general code design capacity unless the published basis supports that claim.
6. Recognised worked examples may verify interpretation and arithmetic but do not override the adopted Standard.
7. International Standards, manuals and tools are non-governing by default. Use them only for interface patterns, background interpretation, independent comparison or a project basis that explicitly adopts them.

For a manufacturer-product selector, the current manufacturer document is the primary source for that product's published data, while the Australian Standard remains the primary source for any separate code calculation. Show these as distinct evidence paths.

### 4.2 Australian-First Adoption Rules

- Use Australian limit-state terminology, SI units, symbols and capacity-factor conventions in the default UI and calculation path.
- Do not mix `phi` factors, partial factors, material grades, section series, action combinations or detailing rules from different national systems in one calculation.
- A foreign source that agrees numerically with an Australian result is corroborating evidence only; it cannot repair a missing Australian clause or table.
- If a project explicitly requires a non-Australian Standard, create a clearly labelled and isolated calculation mode or separate module. Record the adopted jurisdiction/edition and prevent its defaults, formulas and statuses from leaking into the Australian mode.
- ASI and other Australian design aids may provide an accepted table or interpretation only when its edition, Standard basis, product range and assumptions are applicable. Preserve the governing Standard reference and the design-aid reference separately.
- Manufacturer values must retain their published basis, such as nominal, characteristic, design, allowable, working load, WLL or test result. Do not compare unlike action and resistance bases.
- Project certificates, drawings and specifications may override a generic catalogue default, but the page must identify the value as `Project input` or `User override` rather than continuing to display it as catalogue-derived.

### 4.3 Public Reference Models for Handbook Structure

The following public resources may guide handbook organisation and assurance. Only the Australian sources may contribute to the default Australian engineering basis, and only within their documented authority and licence.

| Public reference model | Permitted lesson for SC Handbook | Boundary |
| --- | --- | --- |
| [ASI structural steel design resources](https://www.steel.org.au/what-we-do/focus-areas/steel-and-design/resources-for-structural-steelwork-design/) | Australian hierarchy of Standards, capacity tables, connection guides, worked examples, fabrication guidance and detailing references | Confirm the exact publication edition and licensed content before using technical values |
| [ASI rigid connection tables public preview](https://www.steel.org.au/resources/elibrary/resources/design-capacity-tables-for-structural-steel%2C-vol-4/?view=download) | Engineering sequence of connection description, typical detailing, design actions, numbered design checks and capacity tables; separation of theory/guides from lookup tables | Use the workflow pattern only unless the required licensed technical content is available; do not reproduce copyrighted tables |
| [SCI Interactive Blue Book](https://www.steelforlifebluebook.co.uk/) and [data basis](https://www.steelforlifebluebook.co.uk/about/) | Fast hierarchy of section family -> design task -> grade -> result; explicit Standard/National Annex, factors, product coverage, availability and explanatory notes | UK sections and Eurocode/BS values are not an Australian calculation source |
| [ASCE Hazard Tool](https://www.asce.org/publications-and-news/asce-hazard-tool/about/) | Minimum controlling inputs first, including location, Standard edition, risk category, units and requested hazard; summary result followed by details and source data | Do not import US hazard values or expand SC Handbook into a report generator |
| [AISC Shapes Database](https://www.aisc.org/aisc/publications/steel-construction-manual/aisc-shapes-database-v160/), [Manual Companion](https://www.aisc.org/aisc/publications/steel-construction-manual/manual-companion-for-16th-edition/) and [errata register](https://www.aisc.org/aisc/publications/revisions-and-errata/) | Separate versioned source data, worked examples, design tables and corrections; provide variable definitions and independent verification examples | US shapes, specifications and capacities remain non-governing for Australian modules |
| [NASA bidirectional traceability guidance](https://swehb.nasa.gov/spaces/7150/pages/16450285/SWE-052%2B-%2BBidirectional%2BTraceability%2BBetween%2BHigher%2BLevel%2BRequirements%2Band%2BSoftware%2BRequirements) | Link requirement/source -> calculation contract -> code/data -> test -> visible result; identify missing and unjustified extra functionality; permit lightweight text/spreadsheet traceability for small projects | Adopt the traceability principle, not aerospace-scale documentation |
| [Simpson Strong-Tie code-reference approach](https://www.strongtie.com/products/connectors/wood-construction-connectors/technical-notes/code-reference-column) | Keep product data, code/evaluation report status and installation conditions visible as separate evidence | A code report or published load does not establish Australian adoption or project suitability |

These models support the current product direction: ASI-style engineering hierarchy, Blue Book/ASCE-style fast querying, AISC-style separation of data/examples/errata and NASA-style lightweight traceability. They do not expand the handbook's calculation entitlement.

#### 4.3.1 Open-source Calculation and Verification Patterns

Open-source projects may inform calculation structure, verification practice and reporting clarity. They are implementation references only: they do not establish Australian engineering authority, replace the adopted Standard or justify a formula that has not been checked against the project Reference library.

| Project | Permitted lesson for SC Handbook | Do not adopt by default |
| --- | --- | --- |
| [efficalc](https://github.com/youandvern/efficalc) | Typed input/calculation objects, reusable calculation templates, testable calculation functions and selectable report detail | Python report runtime, server dependency or a report-first interface |
| [handcalcs](https://github.com/connorferster/handcalcs) | Human-checkable `Formula -> Substitution -> Result` presentation and consistent numerical precision | Jupyter or LaTeX as a browser runtime dependency |
| [StructuralCodes](https://github.com/fib-international/structuralcodes) | Separate calculation modules by Standard, material and edition; explicit versioning and tests | Foreign-code formulas, factors or defaults in an Australian calculation mode |
| [section-properties](https://github.com/robbievanleeuwen/section-properties) | Independent section-property verification, documented theory, geometry test cases and explicit user-responsibility boundaries | General finite-element section analysis in the quick-reference interface |
| [forallpeople](https://github.com/connorferster/forallpeople) | SI-normalised internal values, dimensional consistency and separation of stored values from display units | A new units framework where the existing static implementation can enforce the same contract simply |
| [PyNite](https://github.com/JWock82/Pynite) | Continuous regression against textbook problems with known solutions, small learning examples and visible capability limits | Frame, plate, nonlinear or other structural-analysis solver functions |
| [anaStruct](https://github.com/anastruct/anaStruct) | Compact structural diagrams, result-plot hierarchy and small deterministic examples | Expansion of the handbook into a general two-dimensional analysis application |

Use the smallest applicable lesson. A reference project must not trigger a framework migration, wholesale page redesign or new user input unless the change independently passes the module admission gate. Record a new external dependency only when it removes material verified complexity that cannot be handled reliably by the current static architecture.

### 4.4 Online Evidence, Currency and Copyright

Online sources may be used to locate governing material, verify currency/errata/publication status, inspect an official web-only dataset or learn a non-normative interaction/assurance pattern. Apply these rules:

- Prefer the official publisher, Standards body, industry body, regulator or manufacturer page over an aggregator or copied calculator.
- Record the checked date and edition/version. A current webpage must not silently update a calculation tied to an older adopted Standard.
- Public accessibility does not grant permission to reproduce copyrighted tables, figures, equations compilations or paid ebooks. Store and display only material permitted by the licence and necessary for traceability.
- A public preview may establish publication structure, scope or metadata but not unreadable technical values.
- Do not use search-result snippets, AI summaries, forum answers or secondary calculators as the governing source.
- When an online dataset changes, preserve the version or evidence needed to reproduce the checked result.

Public release does not change the source entitlement. Before a public-beta or normal public release:

- maintain `PUBLICATION_NOTICE.md` as the concise public engineering, copyright and privacy boundary;
- identify every Standards-derived formula, table value, figure and close paraphrase, then confirm whether citation alone is sufficient or reproduction permission is required;
- do not treat a repository licence as permission to redistribute Standards, catalogues, trademarks or other third-party material;
- retain the applicable third-party notices and licence text for every redistributed font, library or asset;
- provide one visible issue-reporting path and tell users not to submit confidential project information;
- keep unresolved copyright or source-entitlement items recorded as public-release blockers rather than implying that technical verification grants publication rights.

Source gaps must be reported, not hidden:

- If the governing standard clause, table, figure, manufacturer table, or design handbook passage cannot be found or read, stop treating that formula or value as checked.
- Tell the user exactly what could not be verified, which reference locations were checked, and what engineering decision is blocked.
- Mark the item as `Source_Not_Verified` until the missing source is supplied or a credible replacement source is accepted.
- Do not describe an item as `Checked`, issue-ready, standards-verified, or safe to push as a verified calculator when its source basis is unresolved.
- A source-unverified item may remain in the page only as a clearly labelled draft, placeholder, warning, or out-of-scope note.

Each source record should include:

- `Ref_ID`
- `Document`
- `Version`
- `Publisher`
- `Evidence_Class`
- `Jurisdiction`
- `Adoption_Basis`
- `Clause`
- `Table`
- `Page`
- `Description`
- `File_Path`
- `URL`
- `Licence_or_Access_Note`
- `Checked_By`
- `Checked_Date`
- `Status`

Use `Status` values:

- `Draft`
- `Checked`
- `Source_Not_Verified`
- `Superseded`
- `Do_Not_Use`

## 5. Module Template

Each new module should be documented before building the web tab or optional workbook tab.

### 5.1 Module Definition

Required fields:

- `Module name`
- `Engineering question`
- `User inputs`
- `Outputs`
- `Governing standard`
- `Source documents`
- `Assumptions`
- `Limitations`
- `Required sample checks`

### 5.2 User-Facing Sheet Layout

Use this layout unless there is a strong reason to change it:

| Area | Content |
| --- | --- |
| Header | Module title, version, scope note |
| Inputs | User selections and project-specific values |
| Lookup properties | Source values retrieved from data sheets |
| Calculation steps | Visible helper rows and intermediate values |
| Results | Final design values or lookup output |
| Warnings | Missing inputs, out-of-scope conditions, invalid selections |
| References | Clause, table, page, and source file |

### 5.3 Data Sheet Layout

Source data sheets must be table-like and auditable.

Required fields:

- Stable ID
- Engineering parameter
- Value
- Unit
- Source reference ID
- Clause / table / page
- Notes
- Status

Do not mix units inside numeric cells. Put units in headers or dedicated unit columns.

## 6. Formula Standard

Formulas must be:

- Visible
- Short
- Auditable
- Built from source values or named helper cells
- Consistent across repeated rows
- Free from hardcoded engineering constants unless the constant is separately referenced

Preferred pattern:

1. Input value
2. Source lookup value
3. Intermediate factor
4. Nominal value
5. Capacity factor
6. Design value
7. Governing value

For the web handbook, do not compress a governing equation, substituted values, final result and limitation into one continuous sentence. Apply the calculation presentation contract in Section 15.7.1. The calculation engine must continue to use unrounded values even when the visible substitution and result use controlled display precision.

Use standard engineering symbols where applicable, for example:

- `phi`
- `df`
- `tp`
- `fup`
- `fuf`
- `Ao`
- `As`
- `Ac`
- `Nti`

If a relationship is derived rather than directly quoted, label it as `Derived`.

### 6.1 Material and Product Standard Traceability

Every calculator must state the material or product standard behind tabulated strengths, section properties and fastener class data. Strength values such as `f_y`, `f_u`, `f_up` and `f_uf` must not appear as orphan numbers.

Minimum web and workbook notes should identify the applicable source family:

- Steel hollow sections: `AS/NZS 1163`.
- Hot-rolled plates and sections: `AS/NZS 3678` / `AS/NZS 3679.1` where applicable.
- Structural fasteners and bolt assemblies: `AS 1110` / `AS/NZS 1252` where applicable.
- Manufacturer catalogues or design capacity tables used for section dimensions, availability or tabulated properties.

Where strength depends on product thickness, wall thickness, grade range, supply condition or test certificate, state that the value must be verified for the actual supplied product before issue for design.

### 6.2 Calculation Definition and Verification Contract

Every calculation module must have one documented calculation contract before it is implemented or described as checked. The contract defines the engineering meaning, source basis, calculation branches, verification evidence and release boundary. It is the canonical technical definition; Section 15.19 defines how that definition is audited.

Keep the visible page concise. Store the detailed contract and evidence in `REFERENCE_TRACEABILITY.md`, then show only the governing basis, critical assumptions, result status and practical limitations in the calculator.

#### 6.2.1 Engineering Question and Result Type

Define each calculation in one sentence before listing equations. State:

- the engineering question being answered;
- whether the output is a `nominal capacity`, `design capacity`, `utilisation`, `action distribution`, `published product value`, `selector output`, or `screening warning`;
- the governing limit state or value basis, including `ULS`, `SLS`, manufacturer-published value, or project-defined comparison basis;
- the component, axis, plane, direction, interface, strip, section or connection condition represented by the result;
- what project decision the result may support and what it must not be used to conclude.

Do not combine a selector, published product value, simplified capacity and complete design check under one undifferentiated result label.

Classify the active workflow using Section 2.5 before implementation. If a tab supports both `Capacity only` and `Demand-capacity quick check`, the capacity result must remain available without a demand, while utilisation and `PASS` / `FAIL` remain a separate conditional result that appears only after a compatible design action is provided.

#### 6.2.2 Applicability and Source Hierarchy

Record the governing document title, edition, amendments or corrigenda where known, project adoption status, clause/table/figure and source PDF page. Confirm:

- material, grade, product form, thickness range and supply condition;
- section or connection geometry and fabrication method;
- load case, action basis, design situation and limit state;
- clause prerequisites, linked definitions, adjacent controlling clauses, table headings, footnotes and exceptions;
- whether interpolation, extrapolation or a default value is permitted.

Use these evidence classes:

| Evidence class | Permitted use |
| --- | --- |
| `Adoption basis` | Australian legislation, NCC/jurisdictional requirement or project design basis used to identify the applicable engineering document and edition; not a substitute for its technical clauses |
| `Normative` | Governing Standard requirement, equation, table, definition or limit |
| `Catalogue` | Manufacturer geometry, availability, material or published product value |
| `Interpretive` | Recognised handbook, commentary, textbook or industry guidance used to explain application |
| `Worked example` | Independent interpretation and arithmetic check only |
| `External comparison` | Non-Australian Standard, manual, database or tool used only for comparison, interface precedent or assurance method unless explicitly adopted by the project basis |
| `Derived` | Transparent relationship derived from verified source values or equilibrium / geometry |
| `Project input` | Value to be confirmed from project documents or engineering judgement |
| `Source_Not_Verified` | Draft or warning-only use; not a checked calculation basis |

Normative sources control code requirements. Interpretive references and worked examples may support interpretation and numerical verification but do not replace the governing Standard. Where credible sources conflict, record the conflict and stop the affected result from being described as checked until the governing interpretation is resolved.

For catalogue and product lookup rows, map every displayed value to the exact source column named by the page label. A tension output must reproduce the manufacturer's tension column; a shear output must identify and reproduce the stated shear-plane column. Do not substitute another available column. Where current official manufacturer sources conflict on a product, selection or installation property, show `Source conflict`, retain both published values in the supporting text and require manufacturer confirmation. For compatibility filtering, use only the conservative intersection of conflicting ranges; do not silently choose one source.

Apply the Australian-first hierarchy in Section 4. For a default Australian module, an international Standard/manual/tool remains `Interpretive`, `Worked example` or interface/assurance guidance unless the documented project basis explicitly adopts it. Do not use international agreement as a substitute for unreadable or missing Australian normative evidence.

#### 6.2.3 Governing Formula Record

Assign a stable `Calculation_ID` to every governing capacity, interaction, utilisation, distribution or screening equation. Use a concise pattern such as `BOLT-SHEAR-01` or `PAD-FLEXURE-01`.

Each governing formula record must contain:

| Field | Required record |
| --- | --- |
| `Calculation_ID` | Stable identifier used in the outline, traceability register and test evidence |
| `Engineering question` | Exact question answered by the calculation |
| `Result type` | Nominal, design, utilisation, distribution, published value, selector or screen |
| `Limit state / basis` | ULS, SLS, source-published basis or project-defined basis |
| `Governing source` | Document, edition, clause/table/figure and PDF page |
| `Preconditions` | All conditions required before the equation is applicable |
| `Equation` | Independently transcribed governing expression |
| `Symbol mapping` | Standard symbol, implementation variable, user-facing label and unit |
| `Branch logic` | Table selection, condition, minimum, maximum, interaction and governing rule |
| `Factors` | Capacity, reduction, modification and project factors, including where each applies |
| `Exclusions` | Limit states, actions, geometry or project checks not evaluated |
| `Verification evidence` | Independent result, browser result, difference, tolerance, date and status |

Implementation variable names may remain plain ASCII, but the calculation record and visible page must preserve correct engineering symbols and distinguish nominal from design quantities.

#### 6.2.4 Input and Data Contract

For every input, lookup value, override and derived value record:

- engineering group: geometry / section, material, factor / assumption, connection / detailing, design action, or derived value;
- data class: manual project input, cited lookup, editable override, conservative assumption, or read-only derived value;
- source and default basis;
- internal unit, display unit and conversion rule;
- valid physical range and separate method-applicability range;
- whether zero, negative, blank or not-applicable states are meaningful;
- precision and display rounding;
- dependencies and the fields/results that must update when it changes;
- override behaviour and the visible status shown after a cited default is replaced.

A user override must not continue to appear as a Standard-derived or catalogue-derived value. Required project inputs must not be silently replaced by convenient defaults.

#### 6.2.5 Algorithm and Branch Contract

Document the calculation sequence separately from the governing formula. Include:

- unit normalisation before calculation;
- lookup and table-selection logic;
- sign convention, axis, plane, direction and action-distribution assumptions;
- condition order and all active branches;
- iteration method, convergence tolerance and failure state where iteration is used;
- governing `min`, `max`, interaction or comparison logic;
- inactive, disabled and hidden-field treatment;
- reset, auto/manual and override state transitions.

The algorithm must fail closed. Missing, incompatible or out-of-scope inputs must not produce a normal-looking capacity through a silent fallback, stale value, default zero, `NaN` or infinity. Do not clamp an invalid engineering input to the nearest valid code limit before reporting a result; validate the stated range first, then calculate only from an accepted value.

#### 6.2.6 Units, Precision and Rounding

Define one internal unit convention for each calculation family. Convert at the input or source boundary and keep units explicit through intermediate quantities.

- Use unrounded values for intermediate calculations, governing comparisons, utilisation and status decisions.
- Round only for display unless the governing source explicitly requires a rounded table value.
- Use the shared decimal half-up display formatter for calculated values (`5` rounds away from zero). For example, display `0.575` to two decimal places as `0.58`. Do not use binary floating-point `toFixed()` directly for an engineering result, formula substitution, summary or repeated figure label.
- Do not feed displayed values back into later calculations.
- Record the comparison tolerance for each verification case. Use a tolerance appropriate to exact lookups, closed-form arithmetic, iterative solutions or source values published to limited precision; do not apply one arbitrary percentage to every calculation.
- Where a displayed value is repeated in a figure, summary and formula step, use the same source value and rounding rule.
- A visible substitution must retain enough intermediate precision to reproduce the displayed final result at its stated precision. If a compact summary value is too coarsely rounded for that purpose, show additional digits in `Calculation Steps` or substitute the governing primitive terms; do not change the unrounded calculation engine or inflate the primary result precision.

#### 6.2.7 Minimum Verification Matrix

One default example is not sufficient. Before a calculation is accepted, test as applicable:

1. One common engineering case using normal project inputs.
2. One independent hand calculation or separate script calculation that does not reuse the production calculation function.
3. One case for every active conditional branch or table-selection path.
4. One value at, immediately below and immediately above each governing threshold.
5. Minimum and maximum valid values within the stated method.
6. Blank, zero, negative, physically impossible and incompatible inputs.
7. One known out-of-scope case that must stop or return a clear review status.
8. One published worked example, recognised design example or independently reconstructed source example where available.

Also test applicable engineering invariants:

- design capacity does not exceed the corresponding nominal capacity when the applied capacity factor is not greater than one;
- capacity remains non-negative and changes in the expected direction when only area, strength or another monotonic parameter changes;
- ULS demand is not compared with an SLS capacity, or vice versa;
- inactive components do not add capacity;
- display precision does not change the governing branch or `PASS` / `FAIL` result.

#### 6.2.8 Result Status and Fail-Closed Behaviour

Use result states consistently:

- `Calculated`: the stated calculation completed within its method scope;
- `PASS` / `FAIL`: a compatible demand-capacity comparison completed and all checks claimed by that status were evaluated;
- `Review required`: a result is available but a stated engineering decision remains unresolved;
- `Not evaluated - outside simplified-method scope`: the selected condition is outside this handbook method;
- `Not applicable`: the check does not apply to the selected state;
- `Not published`: a source does not provide the requested product value;
- `Invalid input`: required or physically valid inputs are missing;
- `Source_Not_Verified`: source evidence is unresolved.

Suppress or clearly invalidate stale numeric results when the current state is invalid, incompatible or outside scope. Do not show `PASS`, `OK`, a utilisation ratio or a normal green capacity when the comparison basis is incomplete.

#### 6.2.9 Limitation and Predictable-Misuse Record

For each calculation record concise limitations under these headings where applicable:

- `Method limitations`;
- `Geometry / material limitations`;
- `Excluded limit states`;
- `Project inputs to confirm`;
- `Detailing / construction checks`;
- `Source / product-data limitations`.

Identify predictable misuse, not every theoretical check. The visible page should normally show only the critical warning and immediate next action; the complete limitation record remains in the calculation-basis panel and `REFERENCE_TRACEABILITY.md`.

#### 6.2.10 Change and Reverification Control

When a Standard edition, amendment, catalogue row, formula, factor, default, unit conversion or branch condition changes:

1. Identify every affected `Calculation_ID` and tab.
2. Update the source and applicability record.
3. Re-run the affected verification matrix and relevant default regressions.
4. Confirm visible formula steps, warnings, figures and references still match the implementation.
5. Record the checked date, reviewer status and unresolved gaps.

An edition-uncertain or partially reverified calculation cannot retain `Checked` status merely because its previous numerical outputs are unchanged.

#### 6.2.11 Verification and Worked-Example Reproduction Workflow

Verification must establish a defensible chain from governing source to independent result to implemented browser result. A worked example is supporting evidence, not proof that every branch is correct and not a substitute for the governing Standard.

Use three independent evidence lines:

1. `Source evidence`: governing Standard, catalogue or project basis establishes the permitted method, formula, factors, table values and applicability.
2. `Independent numerical evidence`: hand calculation, separate script or independently reconstructed example calculates the expected result without calling or copying the production function.
3. `Implementation evidence`: the released browser build reproduces the required inputs, active branch, intermediate values, result, status, warning and limitation.

Example-source priority:

1. Australian worked example published by a Standard-related body, recognised Australian industry body, university, manufacturer or authoritative design manual using the same Standard edition and method.
2. Recognised Australian textbook or software worked example with enough inputs and intermediate values to reconstruct the calculation.
3. Independently reconstructed example built directly from the governing Australian clauses and tables.
4. International or commercial-software example used only for mechanics, modelling, trend, sign convention or secondary comparison. It must not validate Australian capacity factors, material strengths, code branches or detailing requirements.

Do not select an example merely because its final number is convenient or close to the webpage result. The example must expose enough inputs, assumptions and intermediate values to identify whether the same engineering problem and branch are being compared.

Required workflow:

| Step | Action | Required evidence | Stop condition |
| ---: | --- | --- | --- |
| `0` | Freeze the audit target | Tab, workflow type, visible result, active branch, files, build/commit and governing `Calculation_ID` | Target or build identity is unclear |
| `1` | Define the engineering claim | Question, result type, limit state/value basis, axis/plane/direction, permitted use and exclusions | The page claims more than the implemented method |
| `2` | Assemble the source packet | Governing edition, clause/table/figure, PDF page, definitions, prerequisites, footnotes, adjacent clauses, catalogue row and correction/errata status | Governing source is unreadable, missing or inapplicable |
| `3` | Capture the worked example | Source identity, page, stated inputs, units, assumptions, branch, intermediate values, published result and published precision | Inputs or assumptions are insufficient to reconstruct the example |
| `4` | Reconstruct independently | Separate formulas, lookup decisions, unit conversions, unrounded intermediate values and expected result | Reconstruction relies on the production function or silently changes the source assumptions |
| `5` | Reproduce in the browser | Same inputs and mode, adopted-basis summary, active overrides, visible intermediate values, final result, status, warning and references | Browser cannot represent the example without an undocumented assumption |
| `6` | Compare and explain | Absolute/relative difference where meaningful, display difference, source rounding, adopted tolerance and branch agreement | Difference is unexplained or the governing branch differs |
| `7` | Test branches and boundaries | Every active branch, table path, threshold below/at/above, valid extrema, invalid values and one out-of-scope case | A branch lacks source or independent expected evidence |
| `8` | Test page state and dependency | Selector changes, auto/override/reset, hidden/disabled fields, stale-result suppression, phone/desktop parity and direct numeric entry | Invalid or inactive data still influences a normal-looking result |
| `9` | Record disposition | `Test_ID`, result, difference, tolerance, evidence method, checked build/date, finding and status | Required evidence is absent or failed |
| `10` | Release and preserve regression | Accepted tests rerun against the release build; unresolved items visible in status/limitations; evidence linked in `REFERENCE_TRACEABILITY.md` | Failed or blocked governing test remains represented as checked |

Worked-example capture rules:

- Reproduce the engineering calculation, not the source document's visual layout.
- Preserve the source's units and stated precision in the source record, then show every conversion into the handbook's internal unit system.
- Record assumptions that are stated, inferred or missing separately. An inferred assumption must not be presented as source fact.
- Record all source intermediate values that control a branch, table row, factor, minimum, maximum or interaction.
- Use the source's final rounded result only as a published comparison. The independent reconstruction must retain unrounded intermediate values.
- If an older Standard edition or foreign code is used, list every material difference that prevents direct code-capacity comparison.
- Do not copy copyrighted tables or long source passages into the repository. Record only the values, page locations and concise evidence needed to reproduce the case lawfully.

Tolerance rules:

- Exact catalogue and Standard table lookups require exact source-row agreement after explicit unit conversion.
- Closed-form arithmetic should agree with the independent unrounded calculation within a stated numerical tolerance appropriate to the implementation precision.
- A published example rounded at intermediate stages may be accepted only when the independent reconstruction explains the resulting difference and the webpage agrees with the unrounded method.
- Iterative solutions require a documented convergence tolerance, iteration failure state and comparison basis.
- Branch, applicability and status outcomes must agree exactly. A percentage tolerance cannot excuse selection of the wrong table row, formula branch, capacity factor, governing case or `PASS` / `FAIL` state.
- Display rounding is checked separately. It must not feed back into the calculation or change the governing comparison.

Minimum evidence set per governing `Calculation_ID`:

- one normal engineering case;
- one independent hand/script case;
- one recognised or reconstructed worked example where available;
- one case for each active branch or table path;
- threshold cases immediately below, at and above each governing boundary;
- minimum and maximum valid values within the stated simplified method;
- blank, partial, zero, negative, impossible and incompatible input states;
- one known out-of-scope case;
- applicable monotonicity, sign, dimensional and nominal-versus-design invariants;
- one browser regression case using the documented default.

Published worked-example evidence is currently required and regression-locked for the principal Bolt shear/tension, Weld fillet, Concrete Pad flexure and Reinforcement straight-development paths. Keep these cases in `tests/published-worked-examples.test.js` and their source locations, assumptions, expected values and limitations in `REFERENCE_TRACEABILITY.md`. A clause-derived hook/cog comparison may supplement the Reinforcement evidence, but must be labelled as a reconstruction unless a complete published terminal example has been independently verified.

Where a governing browser calculation is still embedded in the page controller, extract a small pure calculation module before claiming independent production-path reproduction. The test may call that production module only for the implementation comparison; its expected result must come from separately stated arithmetic or a captured published result. Current examples are `bolt-capacity.js`, `weld-capacity.js`, `concrete-section-calculation.js` and `reo-calculation.js`.

For Concrete Pad simplified one-way shear, keep section analysis in `concrete-section-calculation.js` and DOM collection plus concise explanatory text in `app.js`. Independent cases must cover the `k_v = 0.15` cap, no-minimum-reinforcement expression, minimum vertical reinforcement, web-crushing cap, fallback effective depth and fail-closed material limits. This evidence does not expand the page into complete shear design.

For Concrete Pad flexure, the independent matrix must include top- and bottom-face compression, asymmetric reinforcement, at least one four-layer composite strip, the modern-bar capacity-factor upper and lower bounds, and the conservative legacy-bar factor. Verify axial-force equilibrium, neutral-axis depth, `d_o`, `k_uo`, `M_uo` and `phi M_uo`; include a mirrored top/bottom invariant. A composite-strip numerical match verifies only the entered full-depth section model and does not verify interface shear transfer, anchorage or composite action.

Keep the handbook lightweight:

- Verification scripts, detailed arithmetic, screenshots and comparison tables are engineering QA evidence; they do not become new visible calculator controls.
- Add a visible input only when it changes the governing result, applicability, adopted source value or actionable warning.
- Add a visible result only when it answers the primary question or changes an engineering decision.
- Use one concise visible warning for the controlling limitation. Keep full example evidence and residual exclusions in `REFERENCE_TRACEABILITY.md`.
- Commercial software may provide an external comparison, but the handbook must remain understandable and verifiable without requiring that software.

#### 6.2.12 Lightweight Calculation Implementation Boundary

The released handbook remains a static, offline-friendly browser application. Open-source calculation projects are design and QA references, not required runtime dependencies.

- Preserve the existing `index.html` + JavaScript + CSS architecture unless a separately approved product requirement proves that it is insufficient.
- Keep normal calculations deterministic and local to the browser. Do not require Python, Jupyter, a database, a server-side calculation service or a finite-element solver for the public quick-reference workflow.
- Use small pure calculation modules where logic is shared, branch-dependent or independently tested. Do not restructure a stable tab solely to imitate an external project.
- Model each governing result internally with the minimum traceable fields needed to produce `Formula`, `Substitution`, `Result`, `Applicability`, source reference, warning and status. This internal consistency does not require visible new panels or controls.
- Keep internal values in one declared unit basis and convert only at explicit input/output boundaries. Add dimensional and unit-conversion assertions to tests where a unit error is credible; do not add a user-facing unit system without a stated recurring need.
- Python and specialist open-source tools may be used offline to reconstruct published examples, generate golden expected values, check section properties or produce committed static assets. Their output must be pinned, independently reviewable and regression-tested against the browser production path.
- New framework or library adoption requires a documented problem, licence review, version pin, dependency risk, comparison with the current implementation and proof that the addition preserves load time, offline use, mobile essentials and fail-closed behaviour.
- Prefer incremental changes: first improve calculation records and tests, then extract only the affected pure function, and change the visible page only where the engineering decision or clarity materially improves.

The target is not to reproduce the feature set of the reference projects. The target is to retain the handbook's compact interface while adopting their strongest assurance practices: structured calculations, readable arithmetic, code separation, dimensional discipline and reproducible known-answer tests.

Current production application of this rule includes dedicated pure modules for axial-member capacity (`member-capacity.js`) and symmetric rigid-cap screw-pile action distribution (`screw-demand.js`), alongside the existing bolt, weld, concrete, reinforcement and section modules. Their extraction does not add visible inputs, expand design scope or change the governing formula; it makes the released calculation path directly testable. Each extracted module must retain a separate independent arithmetic reproduction or equilibrium check so that a test cannot pass merely by repeating the production implementation.

## 7. Engineering Language

Use precise engineering terms.

Preferred terms:

- `design capacity`
- `nominal capacity`
- `capacity factor`
- `bolt category`
- `threaded portion`
- `plain shank`
- `slip resistance`
- `bearing capacity`
- `edge distance`
- `pitch`
- `source value`
- `derived value`
- `assumption`

Avoid vague labels such as:

- `strength number`
- `safe load`
- `good / bad`
- `OK value`
- `magic factor`

Use `Pass / Fail` only for an explicit check against a defined demand.

## 8. Workbook Display Standard

These rules apply to optional workbook deliverables. Web presentation is governed by Section 15 so workbook dimensions, cell styling and sheet structure do not leak into the responsive interface.

User-facing sheets should be clear and compact.

Required display rules:

- Input cells: light fill and unlocked
- Formula cells: locked
- Source data cells: locked
- Units: visible near every value
- Results: visually distinct from intermediate values
- Warnings: visible without opening comments
- References: visible on the same sheet
- Frozen panes: use where helpful
- No hidden critical calculations

Recommended numeric display:

| Value type | Format |
| --- | --- |
| Capacity | `0.0 kN` |
| Stress | `0 MPa` |
| Length | `0 mm` |
| Area | `0 mm2` |
| Ratio | `0.00` |
| Utilisation | `0.0%` |

### 8.1 Typography

Use common English fonts that are available on most Windows and Microsoft 365 environments.

Preferred fonts:

| Use | Font |
| --- | --- |
| Primary workbook font | `Aptos` |
| Fallback workbook font | `Calibri` |
| Technical notes or code-like labels | `Consolas` |
| Web fallback stack | `Aptos, Calibri, Arial, sans-serif` |

Do not mix many fonts in one sheet. Use font size, weight, fill color, border, and spacing to create hierarchy.

### 8.2 Three-Level Visual Hierarchy

Use only three main visual levels.

| Level | Purpose | Typical style |
| --- | --- | --- |
| Level 1 | Module title and primary result blocks | 16-18 pt, bold, strong fill or border |
| Level 2 | Section headers such as Inputs, Results, References | 11-12 pt, bold, light fill |
| Level 3 | Labels, helper rows, notes, source lines | 9-10 pt, regular |

Avoid extra decorative levels. The sheet should read like an engineering tool, not a presentation slide.

### 8.3 Desktop-First Layout

The primary layout target is desktop Excel.

Desktop rules:

- Keep the main working area within columns `A:L` where practical
- Place inputs on the left and results on the right or below
- Keep the most important result visible without horizontal scrolling
- Use frozen panes for long lookup tables
- Avoid merged cells in data tables
- Use merged cells only for clear title bands where needed
- Keep row heights compact and consistent

### 8.4 Mobile-Friendly Adaptation

Although desktop is primary, the workbook should remain usable on mobile Excel where practical.

Mobile rules:

- Put key inputs near the top-left of each user-facing sheet
- Put the main result summary before detailed calculation rows
- Avoid very wide tables on user-facing sheets
- Use short labels and clear units
- Do not rely on comments or hover-only information for critical notes
- Keep reference notes visible as normal cells
- Prefer vertical result blocks over wide result grids for important outputs

### 8.5 Colour System

Use a simple pastel colour system. Each functional tab should have one consistent accent colour. Different tabs may use different bright but soft pastel colours.

Colour rules:

- One accent colour per user-facing module tab
- Use lighter tints of the same accent colour within the same tab
- Do not mix multiple strong accent colours in one tab
- Keep source-data tabs more neutral than user-facing tabs
- Use colour to support structure, not decoration
- Maintain clear contrast for text, borders, and key results
- Do not rely on colour alone to communicate pass/fail status

Recommended workbook palette:

| Module type | Accent | Light fill | Use |
| --- | --- | --- | --- |
| Index / navigation | `#BFD7EA` | `#EAF4FB` | Workbook navigation and overview |
| References | `#D7EAD1` | `#F0F8ED` | Source register and audit notes |
| Units | `#F7D9C4` | `#FFF1E8` | Unit conversion |
| Materials | `#D8D2F0` | `#F1EEFB` | Material properties |
| Sections | `#CFE8E0` | `#ECF8F5` | Section properties |
| Bolts | `#F6C6C6` | `#FFF0F0` | Bolt capacity and bolt data |
| Welds | `#F4E1A6` | `#FFF8DD` | Weld capacity |
| Loads | `#C9E4F6` | `#EDF8FE` | Load and wind reference |
| Calculators | `#D9E4C3` | `#F3F8E8` | General calculation modules |

Standard cell colour roles:

| Role | Fill |
| --- | --- |
| User input | Light accent fill |
| Section header | Accent fill |
| Main result | Stronger accent fill with bold text |
| Helper calculation | White or very light neutral fill |
| Source note | Light grey fill |
| Warning | Pale yellow fill |
| Error / invalid input | Pale red fill |

Keep pastel fills light enough for black text. Avoid dark saturated colours for normal worksheet areas.

## 9. Validation Standard

Each module must satisfy the calculation contract in Section 6.2 before it is treated as usable. Validation must cover source applicability, formula transcription, implementation branches, numerical evidence, invalid states and visible engineering meaning.

Minimum validation:

1. Complete the source and applicability record for every governing formula, factor, default and lookup row.
2. Complete the governing formula and symbol-mapping record for every `Calculation_ID`.
3. Check internal units, conversions, precision and display rounding.
4. Complete the applicable minimum verification matrix in Section 6.2.7, including an independent numerical calculation.
5. Exercise every active formula branch, boundary and invalid / out-of-scope state.
6. Confirm result status, governing logic and limitations match what the module actually evaluates.
7. Scan for implementation and formula errors.
8. Confirm locked, editable, overrideable and derived fields use the intended behaviour.
9. Confirm the module is readable and reviewable without developer explanation.
10. For every checked embedded numeric catalogue or product row, run an executable source-reproduction test covering product code, applicable range, displayed value and safety basis. DOM text and regular-expression assertions alone do not establish numerical traceability.

Formula error scan must check for:

- `#REF!`
- `#DIV/0!`
- `#VALUE!`
- `#NAME?`
- `#N/A`

## 10. Professional Handbook Rules

These rules apply to every user-facing lookup or calculation module.

### 10.1 Workbook Quick Start

Each user-facing workbook sheet must include a compact quick-start block near the top-left. Web tabs follow the direct decision flow in Section 15.2.1 and must not add a separate explanatory quick-start block above the calculator.

Use this pattern:

1. Select inputs
2. Read governing results
3. Check scope, assumptions, and references

The quick-start block must be short enough to read without scrolling.

### 10.2 Scope and Limitation Box

Each calculation tab must include a visible scope and limitation area.

Required labels:

- `Scope`
- `Assumptions`
- `Not covered`
- `Use with engineering judgement`

Do not present a calculation as generally valid if it only applies to a specific connection type, material grade, load case, standard clause, or detailing condition.

### 10.3 Source Traceability

Every key source value, factor, formula, and table lookup must be traceable.

Minimum traceability path:

`Value -> Ref_ID -> Document -> Clause/Table -> Page -> Checked_Date`

If a value is derived, record both:

- Source values used
- Derived formula

### 10.4 Unit Discipline

Use metric and SI-based units unless a source document requires otherwise.

Rules:

- Numeric cells must contain numbers only
- Units must be placed in headers or dedicated unit columns
- Do not mix unit text into formula cells
- Do not combine incompatible units in one column
- Show conversion factors in `Units` or in a visible helper row
- Use `mm`, `mm2`, `mm3`, `mm4`, `MPa`, `GPa`, `kN`, `kNm`, and `kg/m` consistently for internal plain-text unit tokens, data keys and spreadsheet unit fields. User-facing web labels and calculation text must use formal engineering typography such as `mm²`, `mm³`, `mm⁴`, or HTML superscripts, not visible `mm2`, `mm3`, `mm^3`, or `mm4`.

### 10.5 Example Check

Each module must maintain the applicable verification matrix required by Section 6.2.7. A default example is useful evidence but cannot by itself establish that a conditional calculation is correct.

Required fields:

- `Example_ID`
- `Calculation_ID`
- `Case type`
- `Input set`
- `Expected result`
- `Calculated result`
- `Difference`
- `Tolerance`
- `Status`
- `Reference`
- `Checked_Date`

Use `Pass / Fail` only when there is a defined comparison basis.

### 10.6 Result Hierarchy

Results must distinguish between:

- `Nominal value`
- `Design value`
- `Governing value`

Do not show a single final number without enough intermediate values for review.

### 10.7 Assumption Register

All assumptions and default values must be visible.

Examples:

- Capacity factor
- Slip factor
- Hole factor
- Material grade
- Edge condition
- Thread condition
- Load path simplification

Assumptions must not be hidden inside long formulas.

### 10.8 Input Validation

User inputs should use validation wherever practical.

Preferred controls:

- Dropdown list for category selection
- Numeric range check for dimensions
- Warning text for missing project inputs
- Explicit `Invalid input` status for invalid combinations

Do not allow invalid inputs to silently produce a normal-looking result.

### 10.9 Accessibility and Readability

Every user-facing module must remain readable in its intended desktop and mobile environment. Workbooks must remain usable in normal desktop and mobile Excel; web tabs must also satisfy Sections 15.4, 15.5 and 15.19.13.

Rules:

- Do not rely on colour alone to communicate status
- Use text labels for `Pass`, `Fail`, `Warning`, and `Invalid input`
- Keep critical notes visible in cells, not only in comments
- Avoid tiny text in user-facing areas
- Keep input and result labels short and unambiguous

### 10.10 Issue Status

Each module must show its issue status.

Allowed status values:

- `Draft`
- `For Review`
- `Checked`
- `Superseded`
- `Do_Not_Use`

Only `Checked` modules should be treated as ready for normal engineering use.

## 11. Module Acceptance Criteria

A module can be added to the main handbook only when all criteria are satisfied:

1. Engineering task is clearly defined
2. Result type, limit state / value basis and applicable method scope are explicit
3. Australian Standard, catalogue or other governing source basis is identified with edition and located evidence
4. Every governing equation has a stable `Calculation_ID` and completed Section 6.2 record
5. Source values remain separate from formulas and are recorded in the appropriate source-data or traceability register
6. Inputs, defaults, overrides, derived values and invalid states follow their documented contracts
7. Units, precision and rounding are consistent and do not alter governing logic
8. Assumptions and predictable limitations are visible
9. Formulas, branches and governing logic are visible and auditable
10. The applicable Section 6.2.7 verification matrix is complete, including independent numerical evidence
11. Source references, test evidence, tolerances, checked date and unresolved gaps are recorded
12. Formula, runtime and stale-state error scans are clean
13. User-facing sheet or page is readable without developer explanation
14. Module status is set correctly and no `Source_Not_Verified` item supports a result described as checked

## 12. Workbook Generation Rules

These rules apply when generating or updating the Excel workbook.

### 12.1 Generation Priority

Preferred authoring method:

1. Use the approved spreadsheet runtime when available
2. If the approved spreadsheet runtime is unavailable, use a local workbook-generation script only when the user explicitly asks to generate Excel
3. Do not overwrite original source reference files

The generated workbook must be treated as an output artifact, not as a replacement for source references.

### 12.2 Output Location

Generated workbook files should be saved under:

`outputs/`

Use clear output names:

- `SC_Engineering_Handbook.xlsx`
- `SC_Engineering_Handbook_<Module>.xlsx`
- `SC_Engineering_Handbook_<Module>_Draft.xlsx`

Do not save generated workbooks into the `reference` folder.

### 12.3 Builder Scripts

Workbook builder scripts should be stored under:

`tools/`

Script names should describe the output:

- `build_bolt_capacity_check.py`
- `build_section_properties.py`
- `build_material_properties.py`

Builder scripts must:

- Read project rules from `SC_HANDBOOK.md`
- Keep source values separate from formulas
- Write formulas into Excel cells where practical
- Keep constants visible as helper rows or assumption rows
- Avoid hidden critical calculations
- Preserve English worksheet names, labels, fields, and notes

### 12.4 Formula and Source Requirements

Generated workbooks must keep formulas auditable.

Rules:

- Derived values should be formula cells, not hardcoded output values
- Source data should be on locked data sheets
- User-facing sheets should reference source data sheets
- Formula constants must have visible labels and source references
- Each major formula group must show a `Ref_ID`
- Draft formulas must be clearly marked as `Draft`

### 12.5 Styling Requirements

Generated workbooks must follow the display rules in this file.

Minimum styling:

- `Aptos` primary font, `Calibri` fallback
- Three-level hierarchy
- One pastel accent colour per functional tab
- Input cells use light accent fill
- Main results are visually distinct
- Source notes and warnings are visible
- Desktop-first layout, with key inputs and results near the top-left for mobile use

### 12.6 Verification Requirements

Before delivery, generated workbooks must be reopened and checked.

Minimum checks:

1. Required sheets exist
2. Key formulas exist
3. No formula text contains obvious error tokens
4. Source references are present
5. Inputs and outputs are visible on the user-facing sheet
6. Workbook can be opened by the generation library after saving

Check for these formula error tokens:

- `#REF!`
- `#DIV/0!`
- `#VALUE!`
- `#NAME?`
- `#N/A`

### 12.7 Source File Protection

Never modify source reference files unless the user explicitly asks.

Protected source locations include:

- `%USERPROFILE%\Documents\Codex\Reference`

The project workspace should not contain active source reference files. If `reference/` or `Tech sheet/` exists, treat it as non-canonical and keep it empty unless the user explicitly asks for a temporary staging area.

Generated outputs, temporary extraction folders, and builder scripts may be updated as part of workbook generation.

## 13. First Workbook Module: Bolt Capacity

This section preserves the functional schema of the first workbook module. Current source status, accepted interpretation and verification evidence remain governed by Sections 6.2 and 15.10 and `REFERENCE_TRACEABILITY.md`; do not maintain a conflicting workbook-only formula basis.

The first calculation module is:

`Bolt_Capacity`

Related data sheet:

`Bolt_Data`

The module should answer:

What are the basic AS 4100 bolt design capacities and spacing limits for a selected bolt size and bolt category?

Required inputs:

- `Bolt size`
- `Bolt category`
- `Thread condition`
- `Shear planes`
- `Plate thickness`
- `Plate tensile strength`
- `Edge distance`
- `Effective interfaces`
- `Slip factor`
- `Hole factor`

Required outputs:

- `df`
- `Ao`
- `As`
- `Ac`
- `fuf`
- `Nti`
- `phiVf`
- `phiNtf`
- `phiVsf`
- `phiVb`
- `Minimum pitch`
- `Minimum edge distance`
- `Maximum pitch`
- `Maximum edge distance`

Formula basis:

| Result | Formula basis |
| --- | --- |
| Bolt in shear, `phiVf` | `phi * 0.62 * fuf * krd * kr * (nn * Ac + nx * Ao) / 1000` |
| Single N shear plane, `phiVf` | `phi * 0.62 * fuf * krd * kr * Ac / 1000` |
| Single X shear plane, `phiVf` | `phi * 0.62 * fuf * 1.0 * kr * Ao / 1000` |
| Tension, `phiNtf` | `phi * As * fuf / 1000` |
| Slip, `phiVsf` | `phi * mu * nei * Nti * kh` |
| Bearing, no edge limit, `phiVb` | `phi * 3.2 * df * tp * fup / 1000` |
| Bearing, edge limit, `phiVb` | `phi * ae * tp * fup / 1000` |
| Governing bearing capacity | `MIN(bearing_no_edge_limit, bearing_edge_limit)` |

Equal-load bolt-group model:

- The quick group calculation assumes identical bolts in a concentric connection with equal action per bolt.
- For total group shear `V*` and `n` bolts, use `Vi* = V* / n`.
- Calculate the group connected-ply limit as `phiVb,group = n * MIN(phiVb,full, phiVb,edge)`, where the entered edge condition is the critical per-bolt edge condition.
- Do not multiply the edge capacity only by a separate edge-line bolt count. Under equal action, any bolt with the critical edge condition limits its own `V* / n` share and therefore limits the total group action to `n` times that per-bolt capacity.
- State that eccentric actions, non-uniform bolt stiffness, unequal bolt forces and redistribution after a bolt reaches its limit are outside this quick model.

Bolt shear reduction notation must be explicit:

- `k_rd = 1.0` for grade 4.6 and grade 8.8 bolts.
- `k_rd = 1.0` for grade 10.9 bolts where threads do not intercept the shear plane.
- `k_rd = 0.83` for grade 10.9 bolts where threads intercept the shear plane.
- For a bolt-group expression with both `nn` and `nx` entered, apply `k_rd` to the AS 4100 parenthesised shear expression shown above, not independently to only one displayed term.
- Treat bolt `k_r` as the bolted-lap reduction factor in AS 4100 Table 9.2.2.1, referenced by AS 4100 Cl. 9.2.2.1. Keep `k_r = 1.0` unless the actual bolted lap detail and connection length `l_j` justify a reduction, and state that the quick page does not auto-derive it from connection geometry.

Edge-distance notation must be explicit:

- `e` is the hole-centre edge distance used for the AS 4100 minimum edge-distance table check.
- `d_f` is the nominal bolt diameter.
- `a_e` is the edge-distance parameter used for the edge-limited ply bearing expression in AS 4100 Cl. 9.2.2.4(2). Enter it from the connection drawing as the minimum distance from the edge of a hole to the edge of the ply, measured in the direction of the force component, plus half the bolt diameter. The edge of the ply includes an adjacent bolt-hole edge.
- Do not substitute the minimum edge distance `e` from AS 4100 Table 9.5.2 directly into the edge-limited bearing formula.
- The web tool does not derive or geometrically verify `a_e`.

These formulas must be checked against the source references before issue-for-design use.

## 14. Optional Future Workbook Modules

There is no standing workbook feature backlog. Create or extend a workbook only when it is explicitly requested and the proposed function passes the Section 2.1 admission gate. Do not duplicate a web calculation in a separately maintained workbook formula path; both outputs must use the same calculation contract, source records and verification evidence.

## 15. Static Web Handbook Rules

These rules apply when a handbook module is implemented as a static web tab.

The web page is still part of `SC Handbook`. It must follow the same source hierarchy, engineering language, formula traceability, and validation standard as the workbook. The web version should be a fast engineering lookup interface, not a full design report generator.

Web outline map:

- `15.0` is the working checklist for any web edit, review, commit, or push.
- `15.1` to `15.3` define product logic, tab structure, page states, dependency flow, disclosure rules, and result hierarchy.
- `15.4` to `15.6` define visual format: typography, spacing, grids, responsive breakpoints, mobile behaviour, theme colours, input-state colours, semantic colours, and contrast.
- `15.7` defines symbols, formulas, source references, and project-file responsibilities.
- `15.8` defines input layout and the project drawing contract. Section `15.8.1` governs the pinned UWEDS adoption and future drawing workflow; the remaining subsections retain SC Handbook-specific figure, annotation and responsive rules.
- `15.9` defines warning and limitation style.
- `15.10` onward defines tab-specific engineering scope, formula boundaries, display rules, and exclusions.
- `15.17A` defines the Steel Monopole Section Capacity tab.
- `15.18` defines local update, commit, push, and GitHub Pages verification workflow.
- `15.19` is the mandatory professional audit protocol whenever a tab, calculation, figure, source or the full handbook is requested to be checked, audited, reviewed or verified.

When editing the web app, use the global web rules first, then the affected tab-specific section. If a layout, notation, drawing, warning, or input rule is intended to survive beyond one edit, record it here rather than only in CSS, JavaScript, or a chat note.

### 15.0 Current Web Implementation Checklist

Use this checklist before editing, reviewing, committing, or pushing any web-tab work:

For a formal page or calculation audit, this short implementation checklist is only the entry check. Complete the full protocol in Section 15.19.

1. Confirm the active app root is the current `SC Handbook` checkout and the affected files are `index.html`, `app.js`, `styles.css`, any scoped tab module such as `rock-anchor-selector/app.js`, and, where durable rules changed, `SC_HANDBOOK.md`.
2. Keep the UI English-only and use Australian engineering language.
3. Check the local reference folder first: `%USERPROFILE%\Documents\Codex\Reference`.
4. If the governing source cannot be found or read, tell the user and mark the item `Source_Not_Verified`; do not present it as checked.
5. Keep the web page a quick-reference handbook, not a full design engine. Add clear limitations instead of forcing complex topology into the page.
6. Use the standard web order: primary inputs, adopted-basis summary, workflow-specific primary answer, supporting checks/data, then calculation/source basis and limitations.
7. Primary calculation or quick-check titles may use the `RESULTS` tag. Published product lookups use `PRODUCT DATA`. Supporting headings should not repeat the tag when it makes the hierarchy noisy.
8. Keep phone layout readable: wrap rows, avoid horizontal overflow, and collapse secondary material where practical.
9. Run basic checks before commit: `git status --short`, `git diff --stat`, JavaScript syntax check, and a DOM id reference check where JavaScript ids changed.
10. Push only reviewed, accepted tab changes and accepted global framework changes.

### 15.1 Web Product Logic

The web app is a local-first, static engineering calculation handbook.

Core rules:

- No server-side calculation.
- No token consumption when visitors use the published page.
- Fast inputs and fast governing results.
- Clear Australian-standard language.
- Compact assumptions, warnings, and references.
- Phone, tablet, and desktop responsive layout.
- Calculation basis available, but not forced into the main view.
- Top-level branding should stay compact. Do not repeat `SC Handbook` as a large hero title when the header already shows it, and do not add decorative header badges such as `LOOKUP` unless they carry operational status.

Each tab must have one primary engineering question and one primary answer. Related secondary checks may support that answer, but they must not compete with it or imply a broader design scope. A tab that cannot express its question, answer and principal limitation in one concise sentence should be simplified before more controls are added.

Each tab should answer:

- What standard item or design option should I start with?
- What is the quick design capacity or governing check?
- Which project-specific checks remain outside this quick-reference tool?

Do not turn a web tab into a full textbook, long tutorial, report writer, or complete design engine.

### 15.2 Web Tab Structure

Use one static app with multiple engineering tools organised through a shared grouped navigation.

Current core tabs:

- `Bolt Capacity`
- `Axial Member Capacity`
- `Beam Section Capacity`
- `Steel Monopole Section Capacity`
- `Section Properties`
- `Weld Capacity`
- `Concrete Pad Section`
- `Reinforcement`
- `Screw Piles Selector`
- `Rock Anchor Selector`

Current tab register:

| Tab | Navigation category | Role | Source status | Publish posture |
| --- | --- | --- | --- | --- |
| `Bolt Capacity` | `Steel Connections` | AS 4100 bolt / ply quick capacity and demand screen | For Review with checked core clauses | Active quick-reference tab |
| `Axial Member Capacity` | `Steel Members` | AS 4100 axial member compression / tension quick screen | For Review with checked core clauses and catalogue rows | Active quick-reference tab |
| `Beam Section Capacity` | `Steel Members` | AS 4100 section-capacity lookup for catalogue and entered ideal UB, UC, PFC, CHS, RHS, SHS, EA and Round Bar geometry | For Review with checked core clauses, family-specific capacity paths and stated custom-direction exclusions | Active quick-reference tab |
| `Steel Monopole Section Capacity` | `Steel Members` | Capacity-only profile for tapered circular and regular polygonal steel pole sections, including segmented geometry, mass and prescribed slip-joint overlap screening | AS 4100 circular path checked; ASCE/SEI 48-19 polygon formula excerpts visually checked and retained as a foreign-standard `For Review` path | Active quick-reference tab |
| `Section Properties` | `Steel Members` | Catalogue lookup and ideal-geometry section properties used by member workflows | Draft; catalogue, derived and unavailable values identified separately | Active quick-reference tab |
| `Weld Capacity` | `Steel Connections` | AS 4100 weld throat-capacity lookup and drafting aid | For Review with checked core clauses | Active quick-reference tab |
| `Concrete Pad Section` | `Foundations` | AS 3600 rectangular strip flexure and one-way shear quick screen | For Review with checked core clauses | Active quick-reference tab |
| `Reinforcement` | `Foundations` | AS 3600 reinforcement development, anchorage and lap-length reference | For Review with checked Section 13 calculation paths and stated PIR boundary | Active quick-reference tab |
| `Screw Piles Selector` | `Foundations` | Product selector and quick pile action-distribution aid | For Review with product-source basis and stated exclusions | Active quick-reference tab |
| `Rock Anchor Selector` | `Foundations` | Product selector and quick rock-anchor lookup aid | For Review with product-source basis and stated exclusions | Active quick-reference tab |

Navigation categories:

- `Steel Connections`: `Bolt Capacity`, `Weld Capacity`, and future `Base Plate` when accepted and integrated.
- `Steel Members`: `Section Properties`, `Axial Member Capacity`, `Beam Section Capacity`, and `Steel Monopole Section Capacity`.
- `Foundations`: `Concrete Pad Section`, `Reinforcement`, `Screw Piles Selector`, and `Rock Anchor Selector`.

Do not create a permanent top-level category for one accepted tool. A future `Reference Tools` category may be introduced only when multiple independent material lookups or compact design tables have been accepted; until then, place each lookup with its primary engineering workflow.

Future tabs may include:

- `Plate Capacity`
- `Base Plate`
- `Connection Checks`

Tab rules:

- One tab = one engineering topic.
- One topic can contain closely related calculators.
- Do not mix unrelated checks in the same visual block.
- Keep tool names direct, complete and unambiguous.
- Page title and UI labels must be English.
- Visible navigation labels must use the full accepted tool names. Do not abbreviate them to `Bolt`, `Axial`, `Beam`, `Weld`, `Pad`, `Screw` or `Rock`; do not truncate them with ellipses or rely on tooltips to restore engineering meaning.
- The active tool button must be visually stronger than inactive buttons: filled background, tab theme colour, heavier font weight, clear border or shadow, and `aria-pressed="true"`. Do not rely on font weight alone.
- Inactive tabs should remain readable but visually quieter. Avoid making every tab bold, large, and high-contrast at the same time.
- Use two visible levels: an engineering category row and one tool row containing only tools in the active category. Category controls and tool controls must use distinct visual treatments; tab-internal mode controls must be quieter again.
- Keep the primary navigation taxonomy task-based. Existing tools use only `Steel Connections`, `Steel Members`, and `Foundations`; do not display empty, speculative, or single-tool top-level categories.
- Selecting a different category activates its first accepted tool so the visible category, tool row and active panel can never disagree. A direct tool hash must activate the correct category and tool automatically.
- Desktop category and tool rows should remain compact single rows. Phone category and tool rows use horizontal scrolling and automatically bring both active controls fully into view.
- Keep all existing public tool hashes stable. Grouping changes navigation presentation, not calculator routes.

Page-level layout order:

1. Compact header with brand only.
2. Grouped engineering navigation: category row, then full-name tool row.
3. Active tool panel.

Do not place a generic `Engineering quick reference` title or descriptive subtitle between the brand and navigation. The active tool heading provides the page title and scope; a visually hidden document heading may preserve semantic structure.

Per-tab layout order:

1. Tool heading: discipline / standard note, tab title, review status.
2. Input area: engineering row bands grouped by purpose.
3. Summary strip: selected item, current assumptions and key intermediate values.
4. Main results: governing capacity, utilisation, `PASS` / `FAIL` or `Review required` status where applicable.
5. Secondary aids: compact tables, symbols, figures or warnings that support quick lookup.
6. Folded details: calculation steps, evidence notes and source limitations.

Do not place decorative cards, large hero blocks or explanatory feature text above the active calculator. The engineer should reach the first meaningful input quickly on desktop and phone.

#### 15.2.1 Canonical Page and Interaction Flow

Every tab must follow the same engineering decision flow even when its detailed controls differ:

| Stage | Page content | Interaction rule |
| --- | --- | --- |
| `Orient` | Full tool name, Standard/source family, short scope and review status | Confirm immediately what is being checked; do not use a hero or feature explanation |
| `Define` | Primary inputs grouped by engineering purpose | Show only controls needed for the current method or selection; reveal conditional inputs when their branch is active |
| `Confirm` | Selected section/product, material, axis/plane, assumptions and active overrides | Make the adopted basis visible before the result; do not duplicate every entered value |
| `Evaluate` | Governing capacity, published value, selection or compatible utilisation/status | Use one dominant answer with unit, basis and honest result state |
| `Review` | Secondary checks, threshold flags and the immediate next engineering action | Keep warnings short and consequence-based; do not present unevaluated checks as passed |
| `Trace` | Formula steps, references, source status, exclusions and detailed limitations | Keep available in folded panels without dominating the primary workflow |

Interaction contract:

- Use immediate recalculation for valid lightweight inputs; do not add a generic `Calculate` or `Apply` button when it adds no state or validation value.
- A controlling selection may reveal, disable or reset dependent fields. Preserve compatible user values, but do not retain hidden incompatible values in the active calculation.
- Defaults must be useful, cited where applicable and visibly classified. A default must not disguise a required project decision.
- Manual inputs, cited lookup/override values and read-only derived values must remain visually and semantically distinct. Colour supports the distinction but never replaces a label or state note.
- Auto/manual and override controls must have one obvious state. Returning to auto mode must restore the current source-derived value rather than a stale historical value.
- Do not overwrite a focused editable value during recalculation. Accept temporary typing states and validate or clamp only at the defined commit point.
- Invalid, incomplete, incompatible or out-of-scope states must suppress or clearly invalidate dependent results. Never leave a stale capacity, utilisation or green status visible as if it were current.
- Every visible input must change a result, source selection, applicability state, summary or actionable warning. Otherwise remove it from the primary page or move it into a justified advanced panel.
- Preserve the same calculation state, result meaning and source basis at desktop and phone widths. Responsive layout may reorder presentation within the same engineering sequence, but it must not fork calculation logic.
- Make the active workflow evident from the result language: `Capacity only`, `Quick check`, `Preliminary selection`, `Published product data` or `Derived aid`. Do not require the user to infer the claim from which inputs happen to be populated.
- The summary and result areas together must expose the adopted section/product, material, axis/plane or direction, limit-state/action basis, active overrides and governing result needed to understand the Section 2.4 chain. Keep full arithmetic and evidence in the folded trace layer.

Section 15.8 defines the detailed input grouping, numeric-entry and responsive-control rules. Section 6.2 defines the calculation and state contract behind this flow.

#### 15.2.2 Query-Handbook Page Patterns

Treat the page as an engineering query surface, not a general form or a report. The engineer should be able to identify the question, enter or select the minimum basis, read the answer and understand its boundary without opening the evidence layer.

Use three information layers:

| Layer | Required content | Visibility rule |
| --- | --- | --- |
| `Primary query` | Active question, minimum required inputs, primary answer and one critical warning where needed | Always visible and first in the workflow |
| `Engineering review` | Selected basis, governing case, active overrides, secondary in-scope checks and one useful compact figure/table | Visible but subordinate; collapse only material not needed to interpret the answer |
| `Evidence and limits` | Formula steps, references, source status, applicability conditions, exclusions, verification notes and detailed limitations | Available in folded panels; never omitted |

Apply the page pattern that matches the active Section 2.5 workflow:

| Workflow | Primary input sequence | Primary answer | Prohibited implication |
| --- | --- | --- | --- |
| `Capacity only` | Section/geometry -> material -> factors -> applicable detailing | Named nominal/design capacity and governing limit state | No utilisation or `PASS` / `FAIL` without a design action |
| `Demand-capacity quick check` | Capacity basis -> design action and distribution -> comparison | Governing utilisation/interaction and scoped status; show the governing capacity as its denominator | No whole-member/connection/structure pass beyond the checks evaluated |
| `Lookup` | Source/category -> lookup key -> selected row | Cited value, unit, edition/row and source status | No calculated resistance or compliance claim |
| `Published product selector` | Project requirement -> compatible filters -> selected product | Published product data, availability/adoption status and principal constraint | No project suitability or design capacity unless separately verified |
| `Preliminary selection or sizing` | Design requirement -> accepted constraints -> candidates -> in-scope recheck | Selected preliminary candidate and governing in-scope check | No issue-ready selection or silent omission of unimplemented checks |
| `Derived engineering aid` | Model assumptions -> geometry/equilibrium inputs | Derived value and assumption basis | No clause compliance or design acceptance claim by inference |

Page construction rules:

- Standard/catalogue selection comes before custom entry. Put `Custom` last and request only the geometry or source values that cannot be derived reliably.
- Collect project actions only when the active workflow performs a compatible quick check or preliminary selection. Do not make action inputs look mandatory for a capacity-only lookup.
- Put the selected/adopted basis immediately before the result when a wrong section, grade, axis, plane, direction, limit state or override would materially change interpretation.
- Keep one primary answer per active workflow. Supporting capacities and intermediate values must explain the answer, not compete with it.
- Do not create empty summary cards, placeholder metrics or inputs with no downstream effect. Absence of a source value must be shown as `Not published` or `Source_Not_Verified`, not as an empty component.
- A tab may switch between page patterns only when the mode label, input set, result heading, status semantics and limitations all change together. Hidden controls and stale results from the previous mode must not remain active.
- Prefer a continuous single-page workflow with progressive disclosure. Use a multi-step wizard or modal only when the user must complete a real ordered decision that cannot be understood safely on one page.

#### 15.2.3 Canonical Page State, Dependency and Disclosure Contract

Every tab must implement one deterministic engineering state model. Layout changes, responsive rules and folded panels may change presentation, but they must not create a second calculation path or a different engineering meaning.

Use this dependency order unless the documented calculation contract requires a narrower sequence:

`Source / method -> section or geometry -> material -> factors and assumptions -> connection or detailing -> optional design actions -> derived values -> governing result -> status, warning and trace`

Dependency rules:

- A controlling selection must update every downstream value that depends on it. Changing section family, product, grade, bolt category, weld type, checked axis, plane, direction or calculation mode must not leave an incompatible downstream value active.
- Upstream source or applicability failure blocks the affected downstream result. A missing clause, table row, catalogue value or required project input must produce `Source_Not_Verified`, `Not evaluated` or `Invalid input` as applicable, not a plausible fallback result.
- A derived value may be editable only through an explicit override state. Entering override mode must identify the value as `User override`; leaving override mode must restore the current source-derived value and current dependency chain.
- Optional design actions sit after capacity construction. Adding or removing an action may activate or suppress utilisation and scoped `PASS` / `FAIL`, but it must not change the independently calculated capacity unless the governing method explicitly makes resistance action-dependent.
- When no compatible design action is entered, show `No design action` and an em dash for utilisation. Do not show `0.00`, `PASS`, `FAIL` or any other value that interprets absence of demand as a completed comparison.
- Hidden or disabled controls must not continue to influence the active calculation. If a branch becomes inactive, remove its value from the active data model or mark it inactive explicitly.
- Required controls must remain visible whenever their branch governs. Do not hide a governing project input in a collapsed evidence panel.
- A recalculation must update the adopted-basis summary, result, status, warning and formula/source trace as one transaction. Do not update the result while leaving a stale basis label, warning or source reference.
- Preserve compatible user-entered values when switching branches, but never silently apply a preserved value to a branch with different units, meaning, source or applicability.

Canonical visible states:

| State | Trigger | Required visible behaviour | Prohibited behaviour |
| --- | --- | --- | --- |
| `Ready` | Required inputs and source basis are valid; no optional demand is entered | Show adopted basis and capacity / lookup / selector result | Do not show utilisation or `PASS` / `FAIL` |
| `Quick check active` | Compatible design action is valid | Show demand, capacity, utilisation/interaction and narrowly scoped status together | Do not imply whole-member, whole-connection or project compliance |
| `Review required` | Result is calculable but an applicability condition, project confirmation or separate check remains material | Keep the numerical result only when still technically valid; show the controlling review action beside it | Do not use green success styling or hide the review item in details |
| `Invalid input` | Required input is blank, non-numeric, physically invalid or mutually incompatible | Identify the first controlling invalid field, retain user text where practical and suppress dependent normal-looking results | Do not coerce blank or temporary typing to zero |
| `Not evaluated` | Method or branch is outside implemented scope | State the unevaluated item and immediate next action; suppress capacity/status for that item | Do not display zero capacity, stale capacity or a neutral-looking pass |
| `Source_Not_Verified` | Governing source value or condition cannot be confirmed | Identify the missing source evidence and block the affected engineering claim | Do not substitute a foreign or secondary source silently |

Progressive-disclosure rules:

- The always-visible layer contains the active question, minimum inputs, adopted basis, primary answer and one critical warning where required.
- The engineering-review layer contains active overrides, governing branch, secondary in-scope checks and compact visual aids needed to interpret the answer.
- The evidence layer contains formula steps, source status, clause/table/figure references, verification notes and detailed exclusions.
- Collapsing the evidence layer must not hide the result basis needed to distinguish nominal/design capacity, axis, plane, direction, material, selected product or active override.
- Opening a folded panel must not resize controls, reset inputs, trigger a different calculation branch or change a result.
- Do not repeat the same scope sentence, selected basis or warning in all three layers. Each statement belongs at the highest layer where it is needed for a safe decision.

Page-logic acceptance test:

1. Start from the documented default and record the visible basis and result.
2. Change each controlling selector once and confirm every dependent input, summary, result, warning and reference updates.
3. Enter, clear and restore each optional demand or override and confirm the state changes exactly as defined above.
4. Enter blank, partial, zero, negative, incompatible and extreme-but-valid values and confirm fail-closed behaviour.
5. Repeat the same transitions at desktop and phone widths and confirm the engineering state and numeric output remain identical.

### 15.3 Web Result Layout

Every web tab should use the same result hierarchy while adapting the primary label to its workflow:

1. `RESULTS <Primary answer>` for calculations/checks, or `PRODUCT DATA <Selected item>` for published product lookup.
2. `<Supporting capacities / detailed checks / selected data>`.
3. `Calculation basis and limitations` for calculations/checks, or `Source basis and limitations` for pure lookup/product data.

The primary answer must show, where applicable:

- exact quantity or decision name and formal engineering symbol;
- value and unit;
- nominal, design, published or derived basis;
- limit state, axis/plane/direction and governing case needed to interpret it;
- honest result status from Section 6.2.8;
- one short scope or next-action note when the answer remains partial.

Use title hierarchy, spacing and panel weight to show importance. Keep `RESULTS` on the primary calculation/check title when it helps identify the output block, but do not repeat the badge in front of every detailed-check title. A detailed-check block may be collapsible, but a check needed to interpret the primary answer must remain easy to reach and must not be visually presented as optional evidence.

For bolt capacity:

- `RESULTS Bolt capacities`
- `Detailed connection checks`
- `Calculation basis and limitations`

For member capacity:

- `RESULTS Member capacity`
- `Detailed member checks`
- `Calculation basis and limitations`

For capacity-only use, the first block shows the governing design capacity. When a compatible design action activates quick-check use, the first block may instead show the governing utilisation/status while retaining the capacity and demand visibly as its basis. The second block shows supporting checks or selected data. The third block gives source clauses, assumptions, applicability conditions, exclusions and limitations.

Web component standard:

| Component | Purpose | Main rule |
| --- | --- | --- |
| Tab navigation | Switch between tools | Keep labels short, make the active tab obvious, and preserve direct access on phone. |
| Tool heading | Confirm current tool and scope | Show full tool name, standard family and issue status; do not repeat marketing copy. |
| Input row band | Collect project or lookup inputs | Group by engineering purpose before visual layout: geometry, material, factors, detailing and actions. |
| Selected summary | Show current lookup basis | Show selected section/category/material and key intermediate values only; do not duplicate formula notes. |
| Main result card | Show governing quick answer | Use the strongest result hierarchy for the capacity or status the engineer needs first. |
| Detailed check row | Show secondary capacities or warnings | Keep clause notes concise and stack cleanly on phone. |
| Warning note | Mark review boundary | Use short action language; move long exclusions to details. |
| Calculation basis panel | Provide traceability | Include formulas, references, assumptions, source status and excluded checks. |
| Compact lookup table | Keep small repeated references on-page | Use only for compact, frequently needed, source-checked values inside the tab scope. |
| Engineering figure | Clarify one input, geometry or assumption | Keep small, source-aware and labelled according to the drawing rules below. |

Do not create one-off component styles unless a tab has a real engineering workflow need. Shared components should carry the same spacing, typography, control height, border radius, focus state and responsive behaviour across all tabs.

### 15.4 Web Layout and Typography

Use a clean single-page app layout:

1. Header
2. Tab navigation
3. Input card
4. Main result card
5. Detailed checks
6. Calculation basis and limitations

Use only three main visual font levels:

| Level | Use |
| --- | --- |
| Large | page title and major result value |
| Medium | section title, field value, important result label |
| Small | helper notes, metadata, limitations, source notes |

Practical rules:

- The normal desktop browser is the primary and complete presentation target. Phone and tablet layouts provide an essential quick-check view, but desktop web must not be compromised by mobile-only density decisions.
- Use shared CSS font variables across every tab.
- Keep member-page typography aligned with bolt-page typography.
- Input controls such as `Bolt Size M24` and `Bolt Category` should use the same size and weight.
- Do not create a new font scale for every tab.
- Avoid all-caps except for small tags such as `RESULTS`.
- If helper text is important enough to show, it must be readable on phone.
- Summary strips such as `Selected member` should use clear stacked rows when the label/value block and metric block would otherwise stretch to opposite sides of a wide web card.
- Cards should represent real workflow groups or repeated results, not general page decoration. Do not put cards inside cards unless the inner item is a collapsed details panel, repeated result card, or compact table row that has a distinct purpose.
- Desktop layouts may use horizontal field rows inside one engineering group, but different engineering groups should stack vertically in a predictable order.

#### 15.4.1 Canonical Web Typography Tokens

All tabs must use the shared font stack and CSS size tokens. Do not introduce a tab-specific font family, fluid viewport-based font scaling, or a second type scale.

Use this implementation contract:

| Token | Current size | Required use |
| --- | ---: | --- |
| `--font` | `Aptos, Calibri, Arial, sans-serif` | All interface text, controls, results and notes |
| `--fs-xs` | `12px` | Source notes, units, metadata, captions, limitations and short helper text |
| `--fs-sm` | `13px` | Tab labels, field labels, input values, group headings and result labels |
| `--fs-md` | `15px` | Section headings, folded-panel headings and compact phone tool titles |
| `--fs-lg` | `22px` | Desktop page or active-tool title only |
| `--fs-xl` | `34px` | Reserved exceptional display value; do not use for ordinary headings |
| `--fs-result` | `28px` | Governing numeric result values |

Typography mapping:

- Brand name, active tab and principal group labels may use `800-900` weight; ordinary labels and values use `700`; helper and source text use `400-700` according to importance.
- Tool title uses `--fs-lg` on desktop and `--fs-md` on phone. Section and folded-panel titles use `--fs-md`. Input-group headings, field labels, control values and result labels use `--fs-sm`. Units, captions, helper notes, source notes and limitations use `--fs-xs`.
- Main result numbers use `--fs-result`, tabular numerals and a compact line height. Units remain `--fs-xs` or `--fs-sm`; they must not visually compete with the value.
- Main calculator controls use the shared `46px` minimum height. Phone controls and tool tabs must remain at least `44px` high, and editable phone inputs must render at `16px` to support reliable touch typing and prevent browser auto-zoom.
- Use letter spacing `0`. Do not use condensed type, negative letter spacing, forced uppercase headings, or viewport-width font scaling.
- Do not reduce text below `--fs-xs` to solve overflow. Change the grid, wrap the label, shorten duplicated wording, or move secondary text into a folded panel.
- A new tab may add a component-specific weight or line-height adjustment only when needed for legibility. It must continue to use the shared size tokens unless a durable global exception is recorded here.

#### 15.4.2 Canonical New-Tab Page Contract

Build every new tab from the shared app structure and component classes. A new tab must not create a standalone visual system inside the handbook.

Required page skeleton:

1. Add one full-name `.tool-tab` control with `data-category`, `data-tool`, a stable public hash and `aria-pressed` support. Register it under the correct existing category; add a new category only when a distinct engineering domain has multiple accepted tools or an approved near-term group that cannot fit an existing workflow.
2. Add one matching `.tool-panel` with a compact `.tool-heading`: kicker / standard family, full English tool name, and one short scope phrase.
3. Put the main workflow in one `.lookup-card`. Inside it, stack `.input-group` row bands in engineering order and use `.input-group-fields` or the equivalent shared responsive grid for controls.
4. Place one selected-item or checked-basis summary after the inputs when the user needs to confirm the current section, product, material, assumptions or intermediate basis.
5. Place the governing answer in the shared `.capacity-section` and `.capacity-card` hierarchy. Show secondary capacities only when they change an engineering decision.
6. Put formula trace and secondary checks in `.detail-card`; put standards, source status, assumptions, exclusions and limitations in `.source-card`.
7. Keep compact figures, symbol keys and lookup tables below the main result or inside a folded panel unless they are essential to selecting an input.

Shared implementation requirements:

- Register the tab in the existing `toolNames`, `toolCategories` and route logic and provide a stable short public hash. Do not create a second navigation system or separate mobile page.
- Add one tab theme using the existing four-variable pattern: accent, dark, soft and panel colours. Map the panel to shared `--green`, `--green-dark`, `--green-soft`, `--panel-bg`, `--line`, `--input-manual-bg`, `--input-auto-bg` and `--input-auto-border` variables.
- Reuse `.tool-navigation`, `.tool-categories`, `.tool-category`, `.tool-tabs`, `.tool-tab`, `.tool-heading`, `.lookup-card`, `.input-group`, `.input-group-heading`, `.input-group-fields`, `.capacity-section`, `.capacity-card`, `.detail-card`, `.source-card`, `.result-note` and shared form-control styles wherever their engineering purpose matches.
- Do not copy an existing tab's one-off selectors as the foundation for a new layout. Promote genuinely reusable behaviour to a shared class first.
- Keep input group labels and order consistent with Section 15.8. A visual row is an engineering category, not merely a convenient number of equal-width fields.
- Use the same DOM and calculation outputs at every viewport. The compact phone tool bar is a responsive shell for the existing category and tool controls, not a second navigation or calculator system. Mobile adaptation is CSS-driven and may collapse secondary material, but it must not fork formulas, values, warnings or references.
- Before acceptance, compare the new tab beside at least one established tab at desktop and phone widths. Check title hierarchy, field-label size, control height, focus state, manual/override/read-only fills, result hierarchy, warning density, horizontal overflow and active-tab visibility.

#### 15.4.3 Canonical Web Spacing, Grid and Density Contract

Use one shared spatial system. New tabs must not introduce arbitrary page widths, padding scales, card radii or dense one-off grids.

Canonical layout dimensions:

| Item | Desktop contract | Phone contract |
| --- | --- | --- |
| Main content width | `1040px` maximum, centred | Fluid width with `12px` side gutters at `500px` and below |
| Intermediate gutters | `18px` side gutters below `1020px` | Continue until the `500px` narrow-phone rule |
| Header | Compact `58px` bar | Compact `54px` bar |
| Tool panel | About `18px` padding; maximum `18px` radius | `12px` padding; maximum `14px` radius |
| Main lookup card | About `20px` padding | About `14px` padding |
| Engineering input group | About `12px` padding and `12px` internal gap | About `10px` padding; single-column fields |
| Main controls | `46px` minimum height | `44px` minimum touch height and `16px` editable text |
| Result card | About `14px` padding | About `13px` padding |
| Folded-panel summary | `13-16px` vertical/horizontal padding | At least `14px 16px` for a reliable touch target |

Use the shared spacing steps `4`, `6`, `8`, `12`, `16`, `20` and `24px`. A component may use an intermediate value already established in shared CSS, but a new tab must not create a separate spacing scale. Apply the steps consistently:

- `4-8px`: icon/label, badge and tightly related inline gaps;
- `8-12px`: fields within one engineering group and compact result rows;
- `12-16px`: separation between related cards or subsections;
- `16-24px`: separation between major workflow stages.

Grid rules:

- A grid column represents one readable field or metric, not a target count. Choose the column count from label length, unit length, control type and minimum usable width.
- Two to four equal columns are the normal desktop range for full input fields. Five or six columns are allowed only for compact, stable fields that remain at least about `128px` wide and pass the label-wrap check. A seven-column row requires explicit review at the `1040px` content width.
- Do not place different engineering groups in adjacent columns. Horizontal packing is allowed only inside one labelled group.
- Use `minmax(0, 1fr)` or an equivalent bounded track so long text cannot force horizontal overflow.
- Align field controls by their control box, not by forcing all labels to one fixed height. Labels may wrap to two lines; the control row must remain visually coherent.
- Units belong inside a stable unit area or adjacent to the value. Do not let changing units resize the field grid or shift neighbouring controls.
- Result cards may use equal columns only when the results have equal engineering importance. The governing result must receive the first position and strongest hierarchy, not merely the widest available cell.
- A summary strip must remain compact. Show only values needed to confirm the adopted basis; move process values and repeated inputs to the trace layer.

Card and border rules:

- Outer tool panels, input groups, result cards and folded evidence panels may be framed. Ordinary page sections must not be turned into decorative floating cards.
- Do not nest cards inside cards except for a repeated result item, a compact table row or a folded panel with a distinct interaction.
- Use one subtle border and, where needed, one restrained shared shadow. Do not combine heavy borders, strong shadows and saturated fills on the same component.
- Keep control radius, input-group radius, result-card radius and outer-panel radius in a restrained progression. Do not use pill shapes for ordinary inputs, cards or headings.
- Stable components must reserve enough width and height for focus, status, unit and two-line labels so interaction does not cause layout shift.

Text-density rules:

- One input group may have one short helper sentence. Do not place a paragraph below every field.
- A main result note should normally be one source/basis sentence plus one limitation or next-action sentence.
- Keep visible warnings to the controlling consequence and action. Put supporting explanation in the evidence layer.
- Prefer deleting duplicated wording over reducing font size, line height or spacing.
- No text may be clipped, overlapped, faded below legibility or reduced below `--fs-xs` to preserve a desktop row.

### 15.5 Mobile Layout Rules

Desktop web is the primary design target. Mobile is an essential quick-check view: it must let an engineer select the tool, enter the required data, confirm the adopted condition, read the governing output and see the controlling warning without reproducing the full desktop evidence layout by default.

Mobile-default content:

- Show the active category, full tool name and issue / review status.
- Show section, product or method selection and every input required to produce the current result.
- Show units, Auto / Manual / Override state and any adopted axis, plane, grade, formula branch or other condition that materially changes the result.
- Show the governing output, compatible status and one concise controlling warning.
- Keep Reset, selection and calculation actions directly operable.

Mobile-progressive content:

- Keep advanced or optional inputs in the existing folded input groups unless they are required by the active calculation branch.
- Keep secondary results, derived-value lists, formula traces, reference tables, source-register notes, detailed limitations and detailed drawings folded by default.
- Keep `Calculation details`, `More inputs` and `References and limitations` available as short full-width disclosure controls where the corresponding content exists.
- A phone layout may omit selected-section metric grids and support diagrams from the default view when the same adopted section, grade, direction and source basis remain identifiable from the selection controls, selected-basis label, result note or folded trace.

Mobile interaction and layout:

- Use the compact active-tool bar by default. Its `Tools` control reveals the existing full-name category and tool navigation; do not keep two horizontal navigation rows permanently open on a narrow phone.
- Keep complete category and tool names inside the opened tool menu. Do not introduce abbreviations, ellipses or smaller-than-standard labels.
- If one row cannot display cleanly, wrap to two rows or one column.
- Never force small controls, result chips, formula tags or tab buttons into one crowded row.
- Use single-column input grids unless two fields are clearly short and readable.
- Stack result cards when they cannot retain clear labels, values and units.
- Avoid horizontal scrolling except for unavoidable tables with preserved headers or labelled records.
- Keep minimum touch-target height around `40-46px` for controls and disclosure buttons.
- Keep public hash routes stable. User-facing aliases such as `#pad` may map to an internal panel name, but existing shared links must not silently fall back to another tool.
- The published footer must show a neutral build identifier, version, date, or commit reference. Do not label the public page as a `local` build.

Detailed-check rows must not remain as rigid desktop grids on phone. For cards with a label, value, status chip, and note, use a phone layout such as:

- row 1: label across the full width;
- row 2: value on the left and status chip on the right;
- row 3: clause note or derived-value note across the full width.

Do not allow important labels such as `Minimum edge distance - AS 4100 Table 9.5.2` to collapse into one word per line. If this happens, change the mobile grid rather than reducing the font below the standard small-text level.

Keep repeated notation compact. If the selected callout already explains a symbol distinction, do not repeat the same explanation as several full-width phone chips.

Do not keep a visible `Device Preview` option in the final page. Responsiveness should be built into the CSS.

#### 15.5.1 Canonical Responsive Breakpoints and Content Priority

Use the existing shared breakpoints as a layout contract:

| Range | Intended behaviour |
| --- | --- |
| Above `1020px` | Full centred desktop view within the `1040px` content container |
| `761-1020px` | Compact desktop/tablet view with `18px` outer gutters; reduce columns where labels or controls become cramped |
| `501-760px` | Mobile/tablet single-column input groups; convert rigid result and table grids to readable stacks |
| `500px` and below | Narrow-phone essential view with `12px` gutters, `54px` header, compact active-tool bar, folded full-name tool menu and compact inputs/results |

Responsive priority order must remain:

1. Active tool identity and issue status.
2. Primary required inputs in engineering dependency order.
3. Adopted condition needed to interpret the result.
4. Governing result, compatible utilisation/status and controlling warning.
5. Optional inputs and secondary in-scope checks.
6. Figures, formulas, source notes, reference tables and detailed limitations.

Responsive acceptance rules:

- Changing viewport width may change column count, stacking, wrapping and folded default state only. It must not change defaults, active values, formulas, rounding, warnings, references or result status.
- At `760px` and below, full input-field grids normally become one column. Preserve two columns only for genuinely short paired controls, switches or metrics that remain readable at `320px`.
- At `500px` and below, the compact tool bar must show the active category and full tool name. Opening `Tools` must expose the same category and tool controls used by desktop.
- Do not hide required inputs, the adopted basis, the governing result, the controlling warning or the result status on phone.
- Do not interpret “mobile essential” as permission to remove units, source/override state, invalid-input feedback or a condition that changes the formula branch.
- Secondary helper text may be suppressed only when the same meaning remains available in a nearby label, summary or folded panel.
- A compact table must either transform into labelled records or use deliberate horizontal scrolling with a visible scroll affordance and preserved row/column identity. Do not simply clip columns.
- Phone field order must follow DOM and keyboard order. Visual CSS reordering must not create a different reading or tab sequence.
- Sticky header/navigation must not cover a focused field, result heading or anchor target.
- Long Standard references, formulas, product names and status labels must wrap without horizontal page overflow.
- Test at minimum `1040px`, `768px`, `500px`, `390px` and `320px`, including browser zoom and a long-label case.

### 15.6 Web Colour System

Use a restrained pastel technical palette. Colour identifies the active tool and data responsibility; it must not decorate every surface or imply engineering acceptance.

#### 15.6.1 Base and Tab Theme Tokens

Base neutral tokens:

| Role | Canonical value | Use |
| --- | --- | --- |
| `--ink` | `#2f3b36` | Primary text and strong neutral controls |
| `--muted` | `#5d6b64` | Helper, metadata and secondary text |
| `--paper` | `#fbf7f0` | Page background |
| `--card` | `#ffffff` | Main cards and control surfaces |
| Base `--line` | `#dfe8e1` | Neutral separators and unthemed borders |

Each tab theme has four required roles:

- `accent`: active marker, result-card top rule, focus border and restrained highlight;
- `dark`: readable theme text, active label and link colour;
- `soft`: active tab, selected mode and light emphasis fill;
- `panel`: very light page-panel wash behind the tab workflow.

Current canonical themes:

| Tool | Accent | Dark | Soft | Panel |
| --- | --- | --- | --- | --- |
| Bolt Capacity | `#5fb98a` | `#2f7b57` | `#e7f7ed` | `#f4fbf6` |
| Axial Member Capacity | `#76a9dc` | `#416f9e` | `#e7f2fc` | `#f4f9fe` |
| Beam Section Capacity | `#b39ad8` | `#6f5798` | `#f0eafb` | `#faf7ff` |
| Section Properties | `#6faea4` | `#356f68` | `#e4f5f2` | `#f4fbfa` |
| Weld Capacity | `#e3a05f` | `#9c5d22` | `#fff0df` | `#fff8ef` |
| Concrete Pad Section | `#6fb7b0` | `#2f746f` | `#e2f6f4` | `#f3fbfa` |
| Screw Piles Selector | `#8fa96a` | `#587235` | `#edf5e4` | `#f8fcf1` |
| Rock Anchor Selector | `#8299aa` | `#4d6576` | `#eaf0f4` | `#f7fafc` |
| Wind Site Draft | `#6aa7c8` | `#31667f` | `#e5f4fb` | `#f4fbfe` |

Theme rules:

- A new tab must define all four roles plus a compatible border and input fills. Do not assign isolated colours directly throughout a tab.
- Use `dark`, not the lighter `accent`, for ordinary text when contrast matters.
- Keep major content cards white or near-white. The theme panel and soft fill should remain background layers, not a one-colour page.
- Use one tab accent at a time. Do not mix another tab's accent into controls, results or figures.
- Category navigation remains neutral because it groups disciplines; the tool-level active state uses the current tab theme.
- Do not use decorative gradients, colour blobs or saturated full-card fills. A subtle existing panel wash may remain, but the hierarchy must still work with flat fills.

#### 15.6.2 Input Responsibility and Interaction Colours

Input colour communicates responsibility, not validity:

| Data class | Fill and border | Required non-colour cue |
| --- | --- | --- |
| Manual project input | Light tint of the active tab theme around a white control | Clear engineering-group heading and project/manual wording where ambiguity remains |
| Cited lookup / auto value with override | Grey-tinted theme fill and restrained theme border | `Auto`, `Catalogue`, `Table`, `Default` or equivalent source-basis text; explicit override state |
| Read-only derived value | Neutral pale grey, normal readable text and no editable focus treatment | `Derived`, formula symbol or read-only semantic state |
| Disabled / not applicable | Neutral muted fill and border; reduced emphasis without illegible opacity | `Not applicable`, inactive branch note or disabled semantic state |
| Invalid editable value | Semantic error border/fill takes priority over the tab theme | Field-level error text plus overall `Invalid input` state |

Interaction rules:

- Hover may strengthen a border or surface slightly but must not move or resize the control.
- Keyboard focus uses one clear outline/ring with at least `3:1` contrast against adjacent colours; focus must not rely on the field fill alone.
- Selected, focused, overridden, invalid and disabled are separate states. Their styles must remain distinguishable when two states coexist.
- Returning an override to auto must restore the auto/lookup style and source-basis text immediately.
- Do not colour every field individually. Apply responsibility colour to the smallest coherent field wrapper or engineering group that preserves quick scanning.

#### 15.6.3 Semantic Status Colours and Priority

Semantic states override the tab theme:

| State | Colour direction | Required visible text |
| --- | --- | --- |
| Informational / derived | Neutral or restrained blue | Quantity/source label |
| `PASS` within stated scope | Restrained green | `PASS` plus named check |
| Warning / `Review required` | Pale amber/yellow with dark text | Consequence and next action |
| `FAIL` | Pale red with dark red text/border | `FAIL` plus named check |
| `Invalid input` | Pale red with field/error association | `Invalid input` and corrective action |
| `Not evaluated` / `Source_Not_Verified` | Neutral or amber according to consequence | Exact status phrase and missing check/source |

Status priority is:

`Invalid input / Source_Not_Verified -> FAIL -> Review required -> scoped PASS -> informational theme state`

A higher-priority status must not be visually weakened by the active tab colour. For example, a blue member tab must still use the shared fail treatment for a failed member check.

#### 15.6.4 Contrast, Accessibility and Colour Acceptance

- Normal text and control labels must meet WCAG AA contrast of at least `4.5:1`; large text may use at least `3:1`.
- Control boundaries, focus indicators, chart lines and essential non-text indicators must maintain at least `3:1` contrast against adjacent surfaces.
- Never place white text on a pastel accent unless the tested contrast passes. Prefer dark text on soft fills.
- `PASS`, `FAIL`, `Review required`, `Invalid input`, `Governing`, `Not applicable`, override and source states must always have words or symbols in addition to colour.
- Figures and charts must add labels, line style, marker, hatching or pattern where colour distinguishes engineering meaning.
- Check active/inactive tabs, manual/auto/derived fields and every semantic status in normal colour, grayscale and a colour-vision-deficiency simulation before accepting a new theme.
- Test contrast in default, hover, focus, disabled, invalid and selected states. A compliant resting state does not excuse an unreadable interaction state.
- Do not reduce opacity below readable contrast to make secondary content quieter. Use neutral colour, spacing and typography hierarchy instead.

Colour acceptance checklist:

1. The active category and active tool are distinguishable without relying on colour alone.
2. Manual, auto/override and read-only values can be identified from both styling and text/state.
3. Semantic warnings and failures override the tab theme consistently.
4. Long labels and wrapped helper text remain readable on the lightest theme fills.
5. No tab reads as a saturated one-colour surface; white, neutral and theme layers remain balanced.
6. Desktop and phone use the same colour meaning, contrast and state priority.

### 15.7 Web Symbols, Formulas, and References

Use standard engineering notation consistently.

Formula notation:

- Use `&phi;` in HTML source for design capacity expressions where the capacity factor is included.
- If a formula is shown as a design capacity, include the rendered `&phi;` symbol in the displayed expression.
- Prefer bracketed expressions when the capacity factor applies to the whole term.
- Do not mix nominal-capacity notation and design-capacity notation without explaining the difference.

Examples:

- `&phi;(3.2d_f t_p f_up)`
- `&phi;(a_e t_p f_up)`
- `&phi;(0.85k_t A_n f_u)`
- `0.90 &times; 3.2 &times; d_f &times; t_p &times; f_up`

#### 15.7.1 Web Calculation Presentation Contract

Every visible engineering calculation trace must separate the governing relationship from the current numerical evaluation. Use the same four-part order in every calculation tab:

1. `Formula` - the symbolic governing equation or deterministic relationship.
2. `Substitution` - the current values inserted into that equation, with compatible units.
3. `Result` - the evaluated nominal value, design value, utilisation, threshold or action effect, including its unit and result type.
4. `Applicability` - the active formula branch, prerequisite, assumption, warning or principal excluded check needed to interpret that result.

The calculation title and source reference sit above these four lines. Use the complete project citation pattern, for example `AS 4100 Cl. 9.2.2.2`. Do not bury the reference inside the numerical substitution.

Required behaviour:

- Keep the governing result card concise. Put formula traces in the existing folded `Calculation details`, `Calculation steps` or equivalent `.detail-card`.
- Show one trace block per engineering relationship. Do not combine unrelated capacities, lookups, checks or warnings in one paragraph.
- Keep `Formula` symbolic. Do not place current project numbers in the formula line.
- Keep `Substitution` numerical. Show the values that materially determine the displayed result and retain units where they establish dimensional consistency.
- Calculate from unrounded internal values. Round only the displayed substitution and final result under the tab's precision rule.
- Label the result basis explicitly where ambiguity is possible, such as `Nominal capacity`, `Design capacity`, `Utilisation`, `Required value`, `Selected lookup value` or `Action effect`.
- For a piecewise or conditional method, show only the active formula branch in the primary trace and state the branch condition under `Applicability`. Keep the other branches in the source/limitations panel or a secondary reference table.
- For a governing minimum or maximum, show the candidate values in `Substitution`, identify the selected candidate in `Result`, and state the governing reason in `Applicability`.
- If a value comes from a Standard table, catalogue row or project document, do not invent a formula. Use `Lookup` in place of `Formula`, then show `Selection`, `Adopted value` and `Applicability`.
- For pure geometry or equilibrium derivations, show the compact governing relationship and current substitution. Do not expose implementation-only coordinates, loops, solver state or every arithmetic intermediate.
- For iterative calculations, show the governing method, converged key values and convergence/result status. Do not print every iteration.
- When a calculation is unavailable, retain the trace block with `Result: Not evaluated` or `Input required`, and state the missing prerequisite. Do not show zero as a substitute for an unavailable result.

Monopole profile exception:

- The Steel Monopole page may retain its compact grouped trace (`Assembly geometry`, `Stations`, `Material`, `Thickness basis`, `Section properties`, `Section resistance`, and `Mass`) instead of repeating the four-part trace at every 0.5 m station.
- The grouped trace is acceptable only while the page also reports the active method and complete Standard references, the governing base summary, all evaluated station inputs and results, overlap states, and a fail-closed status for unavailable branches.
- This exception recognises that the station table is the numerical profile record. It does not permit ordinary single-result calculators to omit `Formula`, `Substitution`, `Result`, or `Applicability`, and it does not expand Monopole beyond section-capacity, mass, and geometric overlap screening.
- `PASS` or `FAIL` belongs in `Result` only where compatible demand and capacity bases are compared. Formula visibility does not imply complete compliance.
- Keep detailed exclusions and source discussion in `Calculation basis and limitations`; repeat only the principal interpretation boundary in the trace.

Lookup and selector tools use an equivalent four-part structure:

1. `Lookup` - source table, catalogue or project-data field.
2. `Selection` - selected row, category, grade, product or condition.
3. `Adopted value` - the value used by the page.
4. `Applicability` - source status, edition, condition and principal limitation.

Presentation rules:

- Use a shared semantic trace component and shared typography across tabs.
- Use short fixed labels (`Formula`, `Substitution`, `Result`, `Applicability`, or the lookup equivalents), not tab-specific synonyms.
- Formula and substitution lines may wrap but must never require horizontal page scrolling.
- On desktop, the trace heading and trace content may use two columns. On phone, stack them into one column while preserving the same DOM, values and order.
- Mobile may keep the containing detail panel closed by default, but opening it must reveal the same formula, substitution, result, applicability and source reference as desktop.
- Do not use colour as the only distinction between formula, substitution and result.
- Mathematical symbols use the notation rules below; explanatory prose remains normal interface text rather than code-styled text.

Subscript and superscript rules:

- Use HTML subscript and superscript where symbols require it:
  - `d<sub>f</sub>`
  - `t<sub>p</sub>`
  - `f<sub>up</sub>`
  - `A<sub>n</sub>`
  - `k<sub>t</sub>`
  - `V<sup>*</sup>`
  - `N<sup>*</sup>`
- Do not display plain-text engineering notation such as `A_n`, `k_t`, `alpha_b`, `V*`, or `N*` in the final UI when proper subscript, superscript, or Greek notation is intended.
- This rule applies to static HTML and JavaScript-generated text. If a generated result note or warning contains fixed trusted engineering notation, render it with `innerHTML` so the notation displays correctly, for example `A<sub>n</sub>`, `k<sub>t</sub>`, `&alpha;<sub>b</sub>`, `V<sup>*</sup>`, and `N<sup>*</sup>`.

Standard, clause, table, figure and section references:

- Use compact reference labels with the source document repeated clearly:
  - `AS 4100 Cl. 9.2.2.1`
  - `AS 4100 Table 9.5.2`
  - `AS 3600 Cl. 8.1.5`
  - `AS 1101.3 Fig. 2.1`
  - `OneSteel / InfraBuild Table 15`
  - `Austube / ASI Part 6`
  - `AS/NZS 1554.1`
- For any standard or catalogue reference, write the full pattern every time: `[source] [reference type] [number]`. Do not mix `Clause x.x.x`, bare `Cl. x.x.x`, bare `Table x`, bare `Figure x`, or `[source] x.x.x` in user-facing web text or generated calculation steps.
- Preferred reference types are `Cl.`, `Table`, `Fig.`, `Section`, `Part`, and `Appendix`. Use one spelling consistently for a given reference type.
- For multiple references, either repeat the source name or use a clearly scoped plural phrase, for example `AS 4100 Cl. 7.1 and AS 4100 Cl. 7.2`, or `OneSteel / InfraBuild Tables 15 and 16`.
- Keep the edition or year in source metadata and the limitations panel, not inside every clause citation. Use `AS 4100 Cl. 5.2.1` in visible calculation references; record `AS 4100:2020` separately as the governing edition.
- Do not write long standard titles in every result card.
- Put detailed source explanation in `Calculation basis and limitations`.
- Use clause references near warnings only when they help the engineer know what to check next.

Related project files:

- `SC_HANDBOOK.md` is the only project outline and rulebook. Update it for durable scope, UI, terminology, calculation-boundary and formatting rules.
- `README.md` is the public project summary. Keep it short and user-facing; do not duplicate detailed audit tables there.
- `REFERENCE_TRACEABILITY.md` is the source evidence register. Put visual-check status, PDF page evidence, row-level checks and remaining source gaps there.
- Source PDFs, converted Markdown packs and technical sheets live only in `%USERPROFILE%\Documents\Codex\Reference`. Do not create a second reference folder inside this repo.

### 15.8 Web Input Layout Logic

The input area is the main workflow surface. Build it from engineering logic first and CSS convenience second.

Input zone order:

1. `Section / geometry` or selected item.
2. `Material properties`.
3. `Relevant factors / assumptions`.
4. `Connection / detailing inputs` where applicable.
5. `Design actions` where the tab reports utilisation.
6. `Derived values` only where the values are useful for the main workflow; otherwise put calculated process values in calculation steps or a folded details panel.
7. Warning-only or advanced screens in a lower-priority row or collapsed details panel.

Input grouping:

- Input sections must be grouped by engineering purpose before visual layout is considered. Use these group names where applicable: `Section properties`, `Material properties`, `Relevant factors`, `Design actions`, and `Connection / detailing inputs`.
- Desktop input layout should use engineering row bands: one labelled horizontal row/card per engineering group, in the order `Section / geometry`, `Material properties`, `Relevant factors`, `Connection / detailing`, `Design actions`, then warning-only or advanced inputs where applicable. Inputs inside a row may be arranged horizontally and wrap, but different engineering groups should not be placed side-by-side simply to save vertical height.
- Phone layout must preserve the same engineering order and collapse each row/card to a single-column readable stack. Do not create a separate mobile-only input order that could diverge from the desktop engineering logic.
- Do not mix section properties, material properties, factors and demand/actions in one undifferentiated row. If a compact desktop row is needed, keep each group visually labelled and preserve the same order on mobile.
- Do not force all input cards into one desktop row. Use multiple engineering rows when equal-width cards make labels, units or controls cramped.
- Effective length, checked radius, gross area and similar member geometry/restraint values belong with `Section properties` or geometry inputs, not `Relevant factors`.
- `Relevant factors` should be reserved for coefficients, reduction factors, category modifiers and code factors such as `alpha_b`, `k_t`, `k_r`, `k_h`, `phi`, `M_t` or similar.
- For `Custom / Built-up` inputs, keep the same engineering card sequence and switch fields inside each card. User-entered section properties and effective lengths belong in `Member definition`; custom `k_f` and `alpha_b` values belong in `Compression reduction factors`. Do not add separate custom-only cards unless the value group has a different engineering purpose.
- Keep fully manual project inputs visually distinct from values selected from a lookup table, derived by the app, or defaulted from a cited source but still editable.
- Fully manual inputs include design actions, actual dimensions, effective length, net area, material strengths entered from project documents, and connection-specific values.
- Lookup / derived / overrideable inputs include catalogue section selection, standard category selection, table-based factors, default correction factors, and editable factors such as `alpha_b`, `k_t`, `k_r`, or `k_h` when the page provides a cited default or lookup basis.
- Overrideable section and material values must stay inside their engineering groups. For example, an editable radius of gyration `r` belongs with `Section properties`, while editable `fy` and `fu` belong with `Material properties`; do not create a separate override strip unless the override is cross-cutting and cannot be grouped cleanly.
- Keep the primary selector and required project values visible. Put infrequently used catalogue or grade overrides in a compact folded row inside the same engineering group. The selected-item summary must still show the adopted value so a closed override row cannot hide the calculation basis.
- Source state such as `Catalogue default`, `Selected grade default` or `User override` is metadata, not an engineering input. Show it inline in the group heading or selected summary; do not give it a standalone input-sized card.
- A free-text display name is not a calculation parameter. Do not include it in a capacity input group unless the page exports or stores a named project record.
- Beam custom dimensions must remain inside the selected section family, following the Axial Member dimension-override pattern. Users enter family dimensions only; the page derives gross geometry and enables capacity only where a checked family-specific AS 4100 section-class and effective-modulus path exists. Unsupported custom directions fail closed.
- Read-only calculated design factors must not be presented as editable project inputs. Put them in a `Derived values` row only when they are genuinely useful in the main workflow; otherwise show them in calculation steps or a folded details panel.
- Connection-specific net-section inputs should use their own `Connection / net section` or `Connection / detailing inputs` row. Do not mix `A_n`, `k_t`, bolt-hole counts, hole diameter or net-path thickness into section, material or compression-factor rows.
- Optional design-action inputs are allowed when they only report utilisation against an already displayed capacity. They must not expand the tab into a full design workflow or imply that excluded checks have been completed.
- Warning-only inputs and screens, such as parent-metal checks or connected-part prompts, must be visually lower priority than governing capacity inputs and results. Prefer collapsed `details` panels when the values are not needed for the main quick lookup.
- Derived read-only factors should be shown as derived values only when they help the main workflow, or placed in calculation steps / an advanced details panel. Do not present calculated values such as stress-block factors as primary project inputs.
- Main visible warnings should stay concise: one base sentence plus short review flags where needed. Long exclusions, source uncertainty and derivation notes belong in the folded calculation-basis / limitations panels.
- Use different subtle background fills for these two groups. Do not rely on colour alone; labels and warnings must still state which values remain project-confirmed.
- Input controls must use a consistent control height, border radius, font size, label size and focus treatment across all tabs unless a dense table genuinely requires smaller controls. Main calculator inputs should use the shared form-control style rather than one-off sizing.
- On phone browsers, numeric fields must allow direct typing. Do not leave editable numeric inputs in a state where the user can only use increment / decrement controls.
- If JavaScript changes numeric inputs from `type="number"` to text inputs for mobile typing, CSS selectors must target a stable class such as `.numeric-input`, not only `input[type="number"]`.
- Editable numeric fields must allow intermediate typing states such as blank, decimal point, comma decimal, plus sign or minus sign until blur. Do not coerce these states to `0` on input, Enter, or calculation refresh.
- Clamp numeric limits on blur only, and only when the field contains a valid number. Calculation functions may use an internal fallback for incomplete inputs, but they must not write that fallback back into an editable input.
- Calculation refreshes may update read-only derived fields, selected lookup defaults, and inactive auto fields. They must not overwrite the currently focused editable project input except where the user has explicitly changed a controlling selector or reset mode.
- Dense editable tables should become clear field groups on phone: show the row title first, then short binary controls, then full-width numeric/select fields with visible field labels and units. Do not leave a table in a form where the header disappears and the user cannot tell what each input means.

Phone and responsive input behaviour:

- Desktop is the full engineering quick-reference view: complete inputs, result cards, formula steps, source notes, limitations and compact figures remain available.
- Phone mode is a field quick-check view. Keep the same calculation logic, but prioritise primary inputs, governing result cards, utilisation / PASS-FAIL status and critical warnings in the first screen sequence.
- Do not fork the calculator into separate mobile formulas or separate mobile HTML pages. Use responsive CSS and the same DOM outputs so desktop and phone cannot diverge numerically.
- On phone, collapse or visually de-emphasise detailed formula steps, source-register notes, secondary metrics, secondary result cards and long explanatory text. Keep them available through existing `details` panels where practical.
- Phone category and tool rows use horizontal scroll controls. Preserve direct access to every complete tool name, but avoid a tall wrapped tab block at the top of the page.
- Phone images and diagrams must remain small reference cues only, approximately three to four lines of body text high. Captions must use the same caption typography as desktop and may be shortened by layout, not rewritten into informal text.

Reduction-factor inputs:

- If a web calculator includes a factor that is not directly selected from a cited Standard clause, table, manufacturer table, or handbook design model, label it as a project or user-entered factor.
- State the default value and make clear that the factor must remain at the default unless the project design model, WPS review, fatigue/detailing requirement, or engineer's calculation justifies another value.
- Do not imply that a project factor is an automatic AS 4100, AS/NZS 1554.1, or manufacturer-table value.
- For weld checks, `k_r` must not be treated as a free project factor when it is being used for AS 4100 welded lap connections. If included, calculate and label it from AS 4100 Table 9.6.3.10(B), and only apply it when the user confirms the weld is a welded lap connection.

#### 15.8.1 Drawing Package Adoption and Reference Rule

SC Handbook adopts the shared `Unified Web Engineering Drawing Standard` (`UWEDS`) package in `C:/Users/silin/Documents/Codex/Drawing` as the common implementation baseline for engineering figures, annotations, CAD-to-web assets and drawing QA. The project-owned adoption record is `engineering/drawing-standard-adoption.json`. Read that record before starting or materially revising a figure; it fixes the package version, selected modules, project profile, validation route and release boundary.

The authority order is:

```text
law and regulation
-> approved client, asset-owner and project requirements
-> applicable Australian design and drawing Standards
-> current certified manufacturer documentation
-> pinned UWEDS package
-> SC Handbook Section 15.8 project rules and approved overrides
-> examples and visual references
```

UWEDS controls reusable drawing mechanics. This handbook controls the narrower product boundary: lightweight engineering lookup, compact web placement, English terminology, current calculator state, mobile simplification and explicit calculation exclusions. A handbook rule may narrow UWEDS for this interface but must not weaken geometry authority, semantic identity, notation, dimension meaning, collision avoidance, accessibility, traceability or release QA. Record a genuine conflict as an approved project override; do not silently choose whichever rule is easier.

Do not copy the Drawing package Markdown into this repository or restate it clause by clause. Reference the pinned package and retain only SC Handbook-specific decisions here. A moving folder path alone is not an issue-time pin. When the shared package changes, compare `PACKAGE_MANIFEST.md`, assess affected figures, update the adoption record and rerun the applicable checks before accepting the new version.

Use this minimum loading matrix for future work:

| SC Handbook drawing task | UWEDS modules to load in addition to the master outline, adoption guide, package manifest and AU web profiles |
| --- | --- |
| New or revised deterministic web SVG | Annotation layout, dimension/annotation, written notation, graphical annotation, structural annotation recipe and applicable golden/negative cases |
| Interactive SVG or linked values | Interactive notation module, symbol dictionary, interactive annotation schema/rules and interaction checklist |
| CAD-derived vector, screenshot or model view | CAD-to-web module, CAD web asset schema, conversion recipe/rules, web release rules and integration checklist |
| Bolt, weld, anchor, clamp or other physical connection | Physical connection atlas, common-component atlas, physical-interface schema, connection rules and the object-specific recipe |
| Manufacturer product drawing | Product technical drawing atlas, product evidence/rules and current certified manufacturer source |
| Historical drawing reproduction | Historical-source reproduction module, profile, recipe, schema, rules and checklist |

For every new controlled drawing family or materially changed physical representation:

1. Define the engineering question, audience, figure level and accuracy class before choosing a view.
2. Confirm geometry authority and source revision; do not infer dimensions from image scale.
3. Create or update a pre-drawing case review under `engineering/pre-drawing-case-reviews/`.
4. Select only the UWEDS modules, recipes and rule registries needed for that figure.
5. Generate geometry from the same validated data used by the calculator, with stable semantic SVG groups and source identifiers where applicable.
6. Apply the local annotation budget, responsive sizing and calculation-boundary rules below.
7. Run the Drawing package validator and the SC Handbook project tests, then inspect desktop and phone rendering.
8. Record the adopted package version, case-review ID, source basis and validation result in `REFERENCE_TRACEABILITY.md` before publication.

Existing figures are inherited assets, not automatically UWEDS-compliant. A figure may remain in service when its current scope is clear, but any material geometry, annotation, interaction or source change triggers the adoption workflow above. Do not label a figure `Checked`, `value-driven`, `CAD-derived` or manufacturer-verified until the corresponding evidence and checks are complete.

#### 15.8.2 SC Handbook Web Engineering Drawing Contract

Engineering drawings in SC Handbook are compact calculation aids. They may identify an input dimension, explain a section or connection, show the geometry used by a calculation, clarify an axis/plane/restraint/load direction, or support visual checking of entered and catalogue-derived values.

They are not construction drawings, fabrication drawings, shop drawings, certified design drawings or substitutes for project details. Calculator inputs and verified source data remain authoritative; a drawing must never become an independent source of numerical values.

Every figure must declare or clearly satisfy one accuracy class:

| Accuracy class | Permitted use | Required description |
| --- | --- | --- |
| `Schematic only` | Symbol, direction or one simple calculation concept | `Schematic only, not to scale` |
| `Proportional schematic` | Section proportions, reinforcement layers or relative geometry | `Proportional schematic` |
| `Value-driven drawing` | Geometry generated from current inputs or a verified catalogue row | `Drawn from entered values` or `Drawn from selected catalogue data` |

Do not describe a manually positioned SVG as value-driven.

Use three placement levels:

| Figure level | Normal location | Content limit |
| --- | --- | --- |
| `Level 1 - Input aid` | Beside the relevant input group | One immediate dimension, direction, symbol or selection cue |
| `Level 2 - Calculation schematic` | Below results or inside calculation details | Formula geometry, stress/resultant relationship, load path or restraint basis |
| `Level 3 - Reference figure` | Collapsed source/reference panel | A more complete source-based convention or visual guide |

The main page should normally contain only Level 1 figures. A Level 2 figure may remain visible only when it is necessary to interpret the primary result.

Project-specific figure scope:

| Tab | Main figure may show | Keep out of the main figure |
| --- | --- | --- |
| `Bolt Capacity` | `e`, `d_h` or `d_f`, N/X plane and governing action direction | Block shear, prying and full connection topology |
| `Axial Member Capacity` | Section family, `L_e`, checked axis and radius `r` | Full buckling theory and excluded flexural-torsional checks |
| `Beam Section Capacity` | Section orientation, rolled-web `A_w = dt_w`, `M*` or `V*` direction | Full compactness tables, `M_b` and complete member stability |
| `Section Properties` | Selected section shape and dimensions used by the geometry model | Capacity, availability or properties not supplied by the selected source |
| `Weld Capacity` | `t_t`, `l_w`, weld side, arrow and reference line | WPS, inspection scope and a full weld-symbol catalogue |
| `Concrete Pad Section` | `d`, compression face, selected strip and active reinforcement layers | Full strain equations, anchorage and excluded footing checks |
| `Screw Piles Selector` | Published shaft, helix and length geometry | Inferred resistance, soil profile and unverified installation detail |
| `Rock Anchor Selector` | Published anchor geometry and selected product arrangement | Bond resistance, rock cone and unimplemented anchorage checks |

Project drawing contract:

- SC Handbook adopts the approved governed UWEDS V1.10.0 subset recorded in `engineering/drawing-standard-adoption.json`. Product figures remain `PRODUCT_REFERENCE_DRAWING` output within the `FOR_REVIEW` boundary and are explicitly marked `Not for fabrication`.
- Every controlled product SVG must carry the applicable `data-standard-adoption-id`, `data-pre-drawing-case-review-id`, `data-representation-class` and `data-drawing-status`. View ID, purpose, projection, NTS status, unit policy, production mode, source reference/access date, derivative revision, rendered variant and source status must also remain machine-readable.
- The current product-figure case review is `engineering/pre-drawing-case-reviews/product-reference-figures.json`. A materially different drawing family, representation class or installation-state view requires a new review record.
- The lightweight product lookup intentionally excludes installation, expanded/locked and connection-engineering views. This project boundary does not relax manufacturer-source traceability or annotation clarity.
- The visible view contract is `Orthographic product view · NTS · mm`. Supplier aliases may remain only where the caption or selected-product data defines their controlled engineering meaning.
- A thread designation such as `M12` must not be displayed as a rod-diameter dimension or prefixed by an undefined supplier variable. Unverified physical rod diameter must not be inferred from the thread designation.
- Source product views must not contain decorative section hatching. Hatching requires a declared section/cut plane and verified cut-part ownership.

1. Use only the geometry, symbols and actions needed by the current calculator state.
2. Use the same symbol, source value, unit and rounding as the input, formula and result.
3. Generate value-driven geometry from the same validated data used by the calculation.
4. Use deterministic SVG with shared CAD classes wherever practical.
5. Keep dimensions outside object geometry and point leaders to the exact referenced feature.
6. Keep ordinary geometry neutral; use one tab accent only for the selected or governing item.
7. Keep the main-view annotation budget to two to four labels on desktop and one to two on phone.
8. Move equations, source discussion, detailed exclusions and secondary labels to the caption or folded evidence layer.
9. Keep phone figures compact and simplify annotations instead of shrinking text.
10. Confirm the figure at normal and extreme-but-valid values before release.

#### 15.8.3 Detailed Figure, Symbol and CAD Requirements

- Figures, diagrams, sketches and charts must support fast engineering lookup. They should read as restrained engineering schematics, not marketing graphics, decorative illustrations or publication-layout figures.
- The target is SC Handbook screen reading on phone, tablet and desktop. Print-publication dimensions, DPI targets and EPS/PDF-first export rules do not govern these web figures.
- Prefer static HTML, SVG, or Canvas for interactive web figures. Use Python / Matplotlib / SciencePlots only for exported reports, static publication figures, or generated assets that are committed as normal web files.
- Every technical figure must have a clear engineering purpose: geometry identification, symbol convention, load path, stress/resultant relationship, section layout, or source-table lookup support.
- Use three figure levels:
  - `Level 1 - Inline schematic`: default web figure beside an input or result group. It explains one immediate input or assumption, such as bolt edge distance, weld throat, beam web area, effective depth, or wind direction sector.
  - `Level 2 - Calculation schematic`: placed in a collapsed calculation/source panel when the figure explains a formula relationship, such as concrete compression block, shear-bending review, section stress resultants, or buckling length convention.
  - `Level 3 - Reference figure`: used only when a recognised standard, handbook, catalogue, or drafting convention needs a more complete visual guide. Keep it collapsed or expandable unless it is essential to first-pass use.
- Use three drawing-accuracy classes:
  - `Schematic only`: concept diagram only, not drawn to scale. Use for quick symbol explanation and simple load/path convention figures.
  - `Proportional schematic`: geometry is drawn with a clear scale relationship or realistic proportions, but is still not a construction drawing. Use for section shapes, pad depth, reinforcement layers, web/flange proportions, and similar visual checks.
  - `Value-driven drawing`: geometry is generated from the entered values or selected catalogue row. Use only when the plotted positions, dimensions, or proportions are actually calculated from the same data used by the calculator. Label it as `drawn from entered values` or `drawn from selected catalogue data`.
- Scientific and engineering rigor comes before visual polish. Every symbol in a figure must match the calculator input label, formula step, and source note exactly; do not mix equivalent-looking symbols such as `Aw`, `A_w`, `d1`, and `d_1` within the same tab.
- Do not draw parameters, checks, boundary conditions, or load cases that the page does not calculate or explicitly warn about. A figure must not imply that the handbook has completed a design check that is outside the tab scope.
- Technical figures should normally state `schematic only, not to scale` in the caption or source note unless the drawing is intentionally a scaled catalogue or CAD-style reference.
- Value-driven figures must not be described as construction drawings or issued design drawings. They are visual checks of the entered values and must still carry the handbook's calculation limitations.
- Figures that represent a standard clause, table, catalogue geometry, or textbook convention must be traceable in the tab source notes or project reference traceability record.
- Keep figures compact. A figure should clarify the calculation faster than text; if it needs long explanation, move the explanation to `Calculation basis and limitations`.
- Default web figures should be small inline engineering aids, not large feature images. Simple section-shape guide images should normally display at about 190 to 360 px wide on desktop, and no more than about 70% of the phone content width on mobile.
- Ordinary calculator diagrams should usually fit within a 180 to 260 px display height. Larger figures must have a specific engineering reason, such as showing a strain/stress relationship or source-table interpretation that cannot be read at smaller size.
- A larger detailed figure must be placed in a collapsed `details` panel or shown as a compact preview with an expandable view. A typical expanded web display target is about 320 to 360 px maximum height on desktop and about 220 to 260 px maximum height on phone.
- Do not let a generated image dominate the first screen or push the main inputs and results away from the engineer. Key inputs and governing results must remain easier to reach than the supporting figure.
- Generated bitmap and SVG assets must have explicit responsive constraints such as `width`, `max-width`, `max-height`, `aspect-ratio`, or container sizing. Do not rely on raw pixel dimensions, SVG `viewBox`, or Matplotlib export size to control the web display size.
- If an image is generated at high resolution for clarity, control the displayed size in CSS separately from the exported file size. Commit the smallest practical web asset that remains readable at the intended display size.
- For phone layouts, ordinary supporting images should be compact enough to occupy only about three to four lines of body text unless a larger view is clearly needed. Section guide figures should normally target about 80 to 130 px display height on phone; compact concrete or calculation schematics should normally target about 80 to 100 px display height on phone. Desktop figures can be larger, but must not dominate the first screen.
- Mobile figure containers must reset inherited desktop `height` and `min-height` rules. The actual engineering linework should occupy the intended compact slot; do not leave a large blank card around an unreadably small drawing.
- Labels must be readable at mobile width. Do not shrink labels below the small-text level to force a dense drawing to fit; simplify the drawing or stack the labels.
- Figure text must be visually consistent. Inline SVG labels, SVG captions, figure captions, and short explanatory `small` text should normally use the same small-text level, currently `--fs-xs` / about 12 px in the static web app. Do not mix noticeably different caption sizes such as 10 px, 12 px, and 14 px within one figure group unless there is a specific hierarchy that improves lookup speed.
- Figure captions and explanatory notes should use normal sentence case. Avoid all-caps labels, forced uppercase, negative letter spacing, and decorative tracking in mobile-visible text. Use bold weight, colour, spacing, or compact badges for emphasis instead.
- Long figure labels, source notes, formula strings, and status text must wrap cleanly on phone width. Use `overflow-wrap`, stacked labels, or simplified wording rather than allowing horizontal overflow or one-word-per-line labels.
- When changing CSS that affects published mobile formatting, update the static stylesheet query version in `index.html` so GitHub Pages and phone browsers load the new rules instead of a cached stylesheet.
- Use standard engineering notation with HTML subscript/superscript in visible labels where practical. Units must be visible and upright; variables may use standard mathematical notation where useful.
- Do not rely on colour alone. If a diagram uses colour to distinguish actions, parts, checks, or statuses, also use labels, line style, marker shape, hatching, or text.
- Use colour-blind-safe, low-saturation colours consistent with the web colour system. Avoid pure red, pure green, strong neon colours, dark low-contrast fills, and one-hue decorative palettes.
- Use line weight intentionally: structural outlines and axes should be lighter than the highlighted force, dimension, or governing result. Avoid heavy borders around every object.
- Gridlines, backgrounds, shadows, gradients, and decorative fills should be removed unless they directly help interpretation.
- Aesthetic quality should come from clear hierarchy, spacing, alignment, restrained colour, and consistent typography. Do not use visual effects to make a figure look polished if they reduce engineering clarity.
- Legends must not cover important geometry or data. If a legend is needed, keep it short or place it outside the main drawing area.
- For charts, show enough tick marks to read the engineering trend or threshold, but do not overload the chart with dense minor ticks. Axis labels must include units.
- For `PASS`, `FAIL`, `Review required` or governing result graphics, show the text status visibly. Colour is secondary.
- For generated bitmap assets, keep the source script or generation method traceable where practical, and export at a resolution suitable for the displayed web size. Do not use large bitmap files when a compact SVG or Canvas drawing is sufficient.
- Figures copied or redrawn from standards, handbooks, catalogues, or online sources must follow the source hierarchy and copyright rules below. A drawing used as a visual guide must not become the source of numeric properties unless the source explicitly provides those values.
- If a figure cannot be verified against a standard, handbook, manufacturer document, or accepted project convention, label it as a draft visual guide or leave it out.
- Existing or inherited page figures are not automatically compliant with this drawing standard. Before describing any figure as CAD-style, proportional, value-driven, or source-checked, review it against the drawing-accuracy class, annotation rules, source basis, and desktop/phone layout checks in this section.

##### Source-Based Technical Symbols

- Do not invent, freehand, or approximate engineering symbols in HTML/CSS/SVG when the symbol has a recognised standard or drawing convention.
- For weld symbols, connection details, section diagrams, bolt callouts, and similar technical figures, first look for the governing Australian standard, Australian handbook, manufacturer manual, recognised textbook, or project drawing convention.
- Prefer Australian sources before international or generic sources: AS / AS/NZS standards, ASI guidance, Australian manufacturer manuals, and Australian drafting references.
- Source-based SVG redraws are acceptable when they follow a documented standard or drawing convention and include a visible source-basis note.
- For section-shape guide figures, use deterministic Python-generated SVG assets in a product-catalogue style: simple cross-section geometry, symbolic dimension labels, and a short source-basis note. Do not copy catalogue artwork or use the sketch as the source of numeric properties.
- For tab-dependent section guide figures, show only the currently selected section family. Do not display all guide figures at once. CSS rules must respect the HTML `hidden` attribute, and generated section-guide images must be constrained by explicit web display sizing rather than the raw SVG viewBox. Avoid duplicate labels inside the image when the card title already identifies the section.
- Weld-symbol diagrams must explicitly show and label the reference line, arrow line, and the symbol position relative to the reference line. State the AS 1101.3 convention in the legend: arrow-side welds are shown by placing the weld symbol on the side of the reference line towards the reader; other-side welds are shown on the side away from the reader; both-side welds use symbols on both sides of the reference line.
- Weld-symbol diagrams must keep the basic symbol geometry consistent with AS 1101.3 Fig. 2.1 and the application convention in AS 1101.3 Figs. 2.8 to 2.10. Do not redraw a fillet, butt/groove, plug/slot, spot/projection, seam, surfacing or supplementary symbol from memory.
- Butt/groove, plug/slot, spot/projection, seam, surfacing and supplementary symbols must be explained with a short use note and a source-basis note. Do not rely on the SVG shape alone to communicate preparation, penetration, contour, finish, weld category, WPS or inspection requirements.
- If a standard figure cannot be reproduced because of copyright or licensing, use a clearly attributed public reference image from a credible technical source, and state that the formal symbol or detail remains governed by the standard and project drawings.
- If an online image is used, include the source page link, image source where practical, publisher/author where available, and a short note explaining whether it is a visual guide or a governing reference.
- Avoid using screenshots from standards, textbooks, or paid manuals unless the user provides an approved copy and explicitly asks to use it.
- Diagrams must be simple enough for a quick engineering handbook: show the convention or detail clearly, avoid decorative illustration, and keep the source note visible.

##### CAD Geometry and Dimensioning

- Handbook diagrams are not construction drawings, but they should still follow normal CAD drafting discipline where applicable.
- Use Australian drawing conventions first. Common reference families include `AS 1100` technical drawing, `AS 1101` graphical symbols, and project/client drafting standards. International references such as `ISO 128` for presentation, `ISO 129` for dimensioning, `ISO 5455` for scales, `ISO 5457` for sheet layout, and `ISO 7200` for title-block data may be used as background when Australian or project rules do not give enough detail.
- Prefer deterministic SVG for CAD-style handbook figures. Use HTML/CSS only for simple legends or labels; use bitmap images only when the source is a verified external visual reference or when a raster export is explicitly required.
- Draw value-driven SVG figures from an internal engineering coordinate model, then map the model to the SVG `viewBox`. Do not position important geometry by visual trial and error.
- Keep drawing helpers reusable. Standard helpers should cover object lines, dimension lines, extension lines, leaders, arrowheads, centre lines, hidden lines, hatching, load/action arrows, labels, and captions.
- Use CSS variables or shared classes for CAD drawing styles so all tabs share the same line weights, arrowheads, text size, caption style, fill opacity, hatching, and highlight colours.
- Keep object geometry, dimensions, centre lines, hidden lines, section hatching, leaders, reference lines, and annotations visually distinct. Do not use the same line weight and style for every element.
- Use a small, consistent line-weight hierarchy: heavier for visible object outlines and governing load paths, lighter for dimensions, leaders, centre lines, construction lines, and hatching. Hidden or secondary geometry should never compete with the governing result.
- Use standard CAD line types consistently: continuous visible lines, dashed hidden lines, chain centre lines, thin dimension and leader lines, and consistent hatch patterns for cut material. Do not encode engineering meaning with colour alone.
- Dimensions must be unambiguous. Show units where the context is not obvious, keep arrowheads/ticks consistent, avoid duplicate dimensions, and avoid dimensions that cross through important geometry. Prefer one clear labelled dimension over several crowded labels.
- Dimension-arrow tips must terminate on the measured extension line, feature or reference envelope. For a two-ended dimension, the start and end arrowheads must face opposite outward directions with their tips fixed at the two measured endpoints; do not centre the marker reference point within the arrowhead or allow both arrows to face the same direction.
- Dimension text must describe exactly what is being measured. Use formula symbols where the calculator uses formula symbols, for example `d_f`, `d_h`, `e`, `A_w`, `d_1`, `t_w`, `L_e`, `r`, `M*`, and `V*`; use plain engineering names only where the formula does not have a symbol.
- Show numeric values only when they come from the current input or selected catalogue row. Otherwise show symbol-only labels to avoid false precision.
- Use the same rounding and unit convention in the figure label, input group, result card, and formula step. A drawing must not show a different rounded value from the calculator output unless the label states it is approximate.
- Leaders and dimension lines must point to the measured object or action, not merely to nearby space. Avoid crossing leaders, labels over geometry, text on top of hatch, and arrowheads that touch unrelated objects.
- Text, dimensions, and symbols must remain readable at the intended display size. For web handbook figures, simplify or split the figure before reducing text below the standard small-text level.
- Use consistent terminology and notation between the diagram, calculator labels, formulas, and source notes. The drawing label should not introduce a different symbol for the same variable.
- CAD-style figures should be drawn to a clear scale relationship where scale helps understanding, but web handbook sketches may be schematic when exact scale would reduce readability. Label schematic figures as visual guides where necessary.
- Keep layers or SVG groups logically separated by purpose when generating assets: geometry, dimensions, loads/actions, labels, hatching, reference/source notes, and interactive states. This makes later review and updates traceable.
- Title blocks, revision blocks, north points, grid bubbles, material callouts, weld symbols, section marks, detail bubbles, and other formal drawing elements should only be included when they serve the quick-reference purpose. Do not add full drawing-sheet decoration to calculator figures.
- Before publishing a CAD-style figure, check it at desktop and phone width for clipping, overlapping labels, unreadable text, incorrect line hierarchy, and horizontal overflow.
- Before publishing a value-driven figure, test at least one normal case and one extreme-but-valid input case. The geometry must stay inside the viewBox, labels must remain readable, and the displayed dimensions must still match the calculator values.
- After every product-figure edit, capture and visually inspect the rendered figure at desktop and mobile widths before release. Automated bounds checks do not replace the screenshot review.
- The screenshot review must check text against object lines, dimension lines, extension lines, leaders and arrowheads, not only text-to-text overlap. Reposition or remove an annotation whenever any line passes through its text.
- CAD-style drawings should be reviewed against this acceptance checklist:
  - The figure purpose is clear and limited to one calculation idea.
  - The accuracy class is stated or obvious from context.
  - Symbols match inputs, formulas, and source notes.
  - Numeric labels come from the same data as the calculation.
  - Line types and line weights follow the shared CAD style.
  - Units and rounding are consistent with the calculator.
  - Labels do not overlap geometry or each other on desktop or phone.
  - The caption/source note states the limitation and source basis.

##### Main-Page Annotation

- Use minimal annotation in the main calculator view. The drawing should help the user locate an input or understand one calculation assumption, not repeat the full formula, source note, and limitation text.
- A main-view drawing should normally have no more than two to four visible annotations on desktop and one to two visible annotations on phone. If more labels are needed, move the extra information to a collapsed calculation/source panel.
- Use a two-level annotation hierarchy:
  - `Primary annotations`: short symbols or dimensions that directly support the current input or governing result, such as `e`, `d_h`, `A_w`, `d_1`, `t_w`, `t_t`, `l_w`, `d`, `cover`, `M*`, or `V*`.
  - `Secondary notes`: short explanatory text, accuracy class, source basis, and limitations. Put these in the caption, source note, warning, formula step, or collapsed details panel rather than inside the figure whenever possible.
- Do not place full sentences inside the drawing area unless the sentence is essential to avoid a dangerous misunderstanding. Prefer compact labels such as `edge distance e`, `web area A_w`, `compression face`, or `schematic only`.
- Do not label every visible part of a section or connection. Label only the parts used by the current calculator state or required to understand a warning.
- Do not repeat a value in both the figure and a nearby result card unless the figure is value-driven and the repeated value helps visual checking. When repeated, the value, units, and rounding must match the calculator exactly.
- Place labels outside the object geometry where possible. Use leaders or dimension lines to connect the label to the exact measured point, face, hole, weld throat, reinforcement layer, load arrow, or section component.
- Reserve dimension lines for actual measured dimensions. Use leaders for explanatory callouts. Do not use a leader when the user expects a dimension line, and do not use a dimension line for a general note.
- Label placement should follow a stable order: dimensions outside the object first, primary symbols nearest the related geometry second, secondary notes in the caption or details third.
- Avoid label clutter. If labels cross, overlap, touch hatch, sit on object lines, or require very small text, reduce the number of visible labels or split the figure.
- Phone layout must simplify annotation rather than shrink it. Hide secondary labels, stack a short legend below the SVG, or show the detailed drawing only in `details`; do not force a dense desktop drawing into a phone viewport.
- Use one restrained accent colour only for the active or governing item. All other labels should remain neutral. Colour must reinforce the label, not replace it.
- Do not label out-of-scope checks in the drawing. If the page excludes lateral-torsional buckling, prying, block shear, web bearing, stiffeners, anchorage, or detailed wind adoption, show that in the warning/source note rather than drawing detailed geometry for it.
- Use tab-specific main-view label budgets:
  - Bolt: show `e`, `d_h` or `d_f`, and the governing action direction only. Put edge convention, N/X plane notes, bearing definitions, and topology warnings in details.
  - Weld: show `t_t`, `l_w`, weld side convention, or arrow/reference line only. Put WPS, inspection, category, parent metal, and full symbol explanation in details.
  - Axial member: show section family, `L_e` and the relevant radius/axis only when it supports the current check. Put flexural-torsional exclusions and alpha-factor context in details.
  - Beam: show `A_w = d_1 t_w`, `M*`, or `V*` only as needed. Put compactness, shear-bending interaction, lateral restraint, and `M_b` exclusions in details.
  - Concrete pad: show `d`, reinforcement layer, compression face, and selected strip only. Put stress-block equations, shear-screen assumptions, reinforcement table context, and excluded detailing checks in details.
  - Wind Site Draft: show site point, wind direction sector, terrain band, or topographic section only. Put data-source uncertainty, region adoption, terrain averaging, and topographic review notes in details.
- For value-driven drawings, labels may show numeric dimensions only when they are calculated from current inputs or selected catalogue data. For schematic-only drawings, prefer symbol-only labels and the caption `schematic only, not to scale`.
- If a product catalogue or handbook figure is used as a visual convention, keep the web drawing sparse and symbolic. Do not copy the catalogue's dense callout style unless the app reproduces the same level of verified data.
- Annotation QA before publish:
  - The user can identify the relevant input in under a few seconds.
  - The drawing does not contain labels unrelated to the current calculation.
  - Every symbol appears in the input, formula, result, or source note.
  - Captions and notes carry the limitation instead of crowding the drawing.
  - Desktop and phone layouts remain readable without overlapping labels.

##### Drawing Implementation

- No external CAD package is required for the web handbook standard. The preferred implementation stack is deterministic SVG generated by JavaScript or small repository scripts, shared CSS drawing classes, and browser viewport checks.
- Use Python scripts only for repeatable generated SVG assets where a script is clearer than hand-editing SVG. Keep the script in the repository when the generated asset is committed.
- Use a browser screenshot or DOM inspection check before publishing any new or revised drawing. A drawing change is not complete until desktop and phone widths have been visually checked.
- Use full CAD software only when importing or comparing against project drawings, not for routine handbook schematic generation.

##### Project Drawing Acceptance Gate

Before publishing a new or revised SC Handbook figure, confirm:

1. The figure supports one clear engineering purpose and uses the correct placement level.
2. Its accuracy class is stated or unambiguous.
3. Geometry orientation, checked axis/plane and load/action direction are correct.
4. Every symbol matches the calculator input, formula, result and source note.
5. Numeric labels come from current inputs or verified catalogue data.
6. Units and rounding match the webpage and do not imply false precision.
7. Dimensions and leaders point to the exact measured or referenced feature.
8. Object lines, dimensions, centre/hidden lines, hatching and governing highlights use the shared hierarchy.
9. Labels, leaders, dimensions and arrowheads do not overlap or cross incoherently.
10. A normal case and an extreme-but-valid case remain inside the `viewBox`.
11. Desktop and phone displays remain legible without horizontal page overflow.
12. The figure does not imply that an excluded calculation has been completed.
13. The caption or source note states the source basis and necessary limitation.
14. The figure remains subordinate to primary inputs and governing results.
15. Browser inspection shows no clipping, missing SVG elements, console errors or stale values.

### 15.9 Web Warning and Limitation Style

Warnings should be concise and professional.

Use action language:

- `Verify block shear where applicable.`
- `Include prying force in N<sup>*</sup> where applicable.`
- `Apply k<sub>j</sub> reduction where required.`

Avoid long paragraphs in the main result area. If the warning needs explanation, put the explanation in the collapsed basis panel.

### 15.10 Bolt Web Tab Rules

The bolt tab should follow Australian steel drawing and AS 4100 language.

Drawing callout examples:

- `M24 8.8/S`
- `M24 8.8 X/S`
- `M24 8.8/TB`
- `M24 8.8/TF`

Use:

- `/S` for snug-tight.
- `/TB` for fully tensioned, bearing-type.
- `/TF` for fully tensioned, friction-type.
- `N` when threads intercept the shear plane.
- `X` when threads are clear of the shear plane.

Display logic:

- If threads intercept the shear plane, show normal callout such as `M24 8.8/S`.
- If threads are clear of the shear plane and X shear capacity is used, show `M24 8.8 X/S`.
- Under the callout, keep the explanation short: `N: threads intercept shear plane · X: threads clear of shear plane`.

- Include `Nti` in the selected-bolt basis. For `/TB` and `/TF`, show the minimum installed bolt tension from AS 4100 Table 15.2.2.2. For `/S`, show `Not required`.
- Place one collapsed `Minimum installed bolt tension, Nti` lookup directly below the selected-bolt basis. Show M16 to M36 in rows and property classes 8.8 and 10.9 in columns.
- Do not repeat the selected `Nti` in the lookup summary. Use the summary support line for the table source and size range.
- In the lookup, state the installation categories in one concise note: `Nti` is not applicable to `/S`; `/TB` and `/TF` are fully tensioned and use the same tabulated `Nti`.
- Do not list M10 or M12 `Nti` values because AS 4100 Table 15.2.2.2 does not tabulate them. These sizes remain available for `/S` only.
- State explicitly that `Nti` is an installation preload, not the design tensile capacity `phi Ntf`. Do not subtract `Nti` from `phi Ntf` and do not present it as a competing capacity result.
- Keep the primary page sequence as `Inputs -> Selected bolt -> optional Nti lookup -> Results`. Place symbol definitions and `/S`, `/TB`, `/TF` explanations in `Calculation basis and limitations`; do not add separate legend bands before Results.
- In `RESULTS Bolt capacities`, show the design shear capacity for the selected N/X shear-plane condition and the design tensile capacity. Keep the unselected N/X shear-plane capacity in `Calculation steps`; it must not compete as another primary result card.
- Use formal visible labels `Design shear capacity, phi Vf` and `Design tensile capacity, phi Ntf`. Keep the selected N/X condition in the shear-capacity label.
- Show the `TF slip check` only for `/TF` categories. Keep its slip parameters, serviceability slip actions and utilisation status together. For `/S` and `/TB`, hide the complete section.
- Do not show a persistent `/TF` reminder in `/S` or `/TB` states. The separate serviceability slip reminder appears only with the active `/TF` workflow.
- Keep the Standard bolt strength branch capacity-only. Do not collect project strength actions or report strength utilisation, governing ratios or connection PASS/FAIL.
- For `/TF`, retain separate `V_sf*` and `N_tf*` inputs only within the serviceability slip check. Do not present these serviceability actions as standard bolt strength actions.
- For property class 8.8 bolts below 16 mm, use `f_uf = 800 MPa` in accordance with AS 4100 Table 9.2.1 Note 2. Do not inherit the M16-M36 value of 830 MPa for M10 or M12.
- For property class 10.9 bolt shear, apply `k_rd = 0.83` to the complete parenthesised N/X shear-area term whenever any thread-intercepted shear plane is present. Use `k_rd = 1.00` only for an X-only shear condition.

Bolt result checks should include:

- Bolt shear capacity.
- Bolt tension capacity where relevant.
- Full-bearing branch of the design bearing capacity in each connected ply.
- Edge tear-out branch of the design bearing capacity using the AS 4100 Cl. 9.2.2.4(2) `a_e` limit.
- Minimum edge distance check.
- Governing full-bearing / edge-distance condition.
- Do not compare these standard strength capacities with project actions. The page is a quick-reference capacity lookup, not a complete connection design check.
- For `/TF`, show one `TF slip utilisation ratio` within the separate serviceability workflow.
- Detailing compliance is not a utilisation ratio. Keep each pitch or edge-distance status with its input; any applicable FAIL means the displayed capacity must not be adopted until the detailing is corrected. For `/TF`, also gate the visible slip result as `NON-COMPLIANT`.
- The default connected-ply tensile strength should not be an orphan number. Use f<sub>up</sub> = 410 MPa only as the AS/NZS 3678 Grade 250 plate default; use 440 MPa only for verified AS/NZS 3679.1 Grade 300 flat bar/section or another stated source.

Manufacturer product lookup branches:

- Keep three peer branches inside the Bolt tab: `Standard bolt capacity`, `U-bolt product lookup` and `Structural blind-bolt lookup`.
- Treat U-bolts and structural blind bolts as manufacturer product lookups, not as AS 4100 ordinary bolt-capacity calculation paths.
- State that each branch is a curated manufacturer reference set, not an exhaustive product catalogue.
- Use the same lightweight sequence for both product branches: `Project requirement`, `Catalogue filters`, `Product selection`, `Selected product`, manufacturer-published data and collapsed basis-and-limitations.
- Keep only selectors that materially assist product browsing. Optional geometry, head, finish and manufacturer fields must remain unrestricted by default.
- `Catalogue filters` contains only optional manufacturer or brand and finish filters. Keep all options unrestricted by default.
- `Catalogue product / family` or `Catalogue entry` belongs to a separate `Product selection` group and is the final confirmation control. Matching-entry counts belong to this group, not to `Catalogue filters`.
- The `Selected product` strip confirms product identity and concise ordering information; do not repeat the same values in a second descriptive panel.
- Show the minimum selection parameters once within `Selected product`. Put secondary installation, spacing, edge and ply requirements in one collapsed disclosure where required; do not repeat them elsewhere.
- Use `PRODUCT DATA`, not `RESULTS`, for manufacturer values. Do not label a value as `Design capacity` unless the source itself publishes that basis and the governing jurisdiction is stated.
- Keep catalogue brands separate from supply channels in the underlying data. Do not show an unverified supplier as a primary selection parameter.
- Retain manufacturer, supplier, product family, product code, nominal size, fit or grip range, material/finish, published value and basis, source document, revision/date, URL and source status in the underlying record.
- Preserve the manufacturer's published terminology and basis, including `Working load`, `Safe working load`, `Characteristic resistance`, `ASD allowable load` or `LRFD design strength`. Do not silently convert or compare unlike bases.
- Apply the catalogue-row mapping, source-conflict and executable reproduction requirements in Sections 6.2.2 and 9 to every checked manufacturer record.
- Use three source states only: `Local reference checked`, `Manufacturer source checked online` and `Source not verified`. `Not published` describes a missing manufacturer value and does not make an otherwise checked source unverified.
  - Show source status once in the manufacturer-data heading.
  - Put a direct `Manufacturer reference` link in `Selected product`. Use `Open technical data` for a manufacturer PDF and `Open product page` for a web catalogue page. The link must follow the currently selected record.
  - Identify the source document by its concise manufacturer title beside the link. Retain checked date, revision and source state in the underlying record and reference register.
- A matching catalogue product may be reported as `Matching product found`; an unresolved filter combination may be reported as `No matching product`. These are selection states, not structural PASS/FAIL.
- Do not show generic N*, V* or M* inputs, action ratios, governing structural checks or connection PASS/FAIL in a product-lookup branch.
- If a published value is absent, use one compact `Published load | Not published` row rather than a visually dominant capacity card.
- Before a catalogue entry is selected, use the `Product selection` heading and matching-entry count as the only prompt. Hide the empty selected-product fields, published-data cards, source-status badge and any duplicate prompt row until a product is confirmed.
- Keep catalogue-option labels short enough for mobile selection. Use the market-recognisable product name for U-bolts. For structural blind bolts, use product family, nominal size, official product code and grip range because the code distinguishes otherwise similar length variants.
- Do not redraw or embed manufacturer product figures in the lightweight lookup. Product appearance, component details and manufacturer dimension diagrams belong to the linked current product page or technical data sheet.
- Do not show generic installation or post-expansion diagrams in `Selected product`. The handbook reports structured selection data and links to the primary manufacturer source; it is not a substitute catalogue drawing.
- Where tension and shear values share one published basis, show that basis once below the two value cards rather than repeating it in each card.
- State the shared boundary as `Manufacturer-published data; not an AS 4100 design capacity.` Connected steelwork, local section effects and project suitability remain separate engineering checks.

U-bolt product lookup branch:

- Do not use `Application` as a filter; it overlaps member geometry and can exclude otherwise relevant products.
- Use `Project requirement` for thread designation and broad `Member geometry`; use `Catalogue filters` for optional brand or manufacturer and finish; use `Product selection` for the catalogue product or family.
- Derive `Member geometry` from catalogue geometry: `Round / pipe`, `Square / rectangular`, `Beam / channel assembly` and `Custom / drawing-defined`. Keep `Any member geometry` as the default.
- Default thread designation to M12. Do not require an exact catalogue diameter, and do not represent discrete manufacturer diameters as a continuous fit range.
- Place manufacturer, family and series in the title/supporting line.
- Keep U-bolt `Selected product` to product code, thread designation, member fit and material / finish. Do not add a separate dimensions or supplier panel for the same record.
- Lead each U-bolt option with the market-recognisable product description and applicable member size. Do not lead with an internal series name where the product description is more useful for purchasing.
- Preserve manufacturer dimension meanings in the structured member-fit text. Do not reinterpret supplier symbols or infer continuous fit from discrete catalogue sizes.
- Where one published product load is reported, use one full-width horizontal result. Label it using the exact manufacturer basis. Where no value is published, use the compact missing-value row.
- In U-bolt mode, use `U-bolt Product Lookup`, `U-bolt products · manufacturer data` and `Manufacturer data · no design capacity`.
- Keep mounting-pipe / round-member products separate from beam or channel clamp assemblies. Main headframe-to-monopole clamps are OEM or project-engineered assemblies and are outside the standard-product lookup.
- Keep `Custom / project-manufactured` as a traceable made-to-order entry, not as a stocked product or published capacity.
- Keep the priority project checks concise within the collapsed basis panel: U-bolt and thread strength, leg-force distribution and bend effects; clamp slip, contact and local bearing/crushing; attachment details and prying; fatigue, corrosion, installation and inspection.
- Do not derive U-bolt product capacity from AS 4100 ordinary bolt shear or tension equations.

Structural blind-bolt product lookup branch:

- Use `Structural blind-bolt lookup` as the generic branch name. Retain proprietary family names such as `Hollo-Bolt`, `HBS-Bolt`, `UNI-BOLT`, `Blind Bolt` and `BoxBolt` only for their verified manufacturer records.
- Split the selectors into `Project requirement` for bolt size, total clamping thickness W and head type; `Catalogue filters` for optional manufacturer and finish; and `Product selection` for the catalogue entry.
- Use nominal size as the primary blind-bolt filter. Leave head type, finish and manufacturer unrestricted by default.
- Define total grip `W` as the total thickness of all connected plies. Keep it optional and blank by default. Use an entered positive value only to rank entries as `Compatible grip range` or `Other grip ranges`; do not remove the latter from the catalogue list. Where `W` is blank, show all entries for the selected primary filters without a compatibility claim.
- Do not auto-present the first product as a recommendation. Require the user to confirm a catalogue entry before showing its published values.
- Place manufacturer and product family in the title/supporting line.
- Keep primary blind-bolt selection data visible: product code, nominal size or length variant, grip range, hole diameter, head type and finish.
- Put minimum centres, edge or internal-clearance requirement, outer-ply condition or thickness basis, installation torque and tools in one collapsed `Installation requirements` disclosure.
- Keep manufacturer product code, size/length variant and grip range distinct. Do not replace an official code such as `HB20-1` with an inferred label such as `M20 #1`.
- For Hollo-Bolt, display the manufacturer's assembled product length `B max` separately from nominal size and grip range. Retail descriptions such as `M20 x 90` may refer to bolt length rather than the manufacturer's assembled `B max`; do not treat the dimensions as interchangeable without a cited product mapping.
- Keep product mechanism and proprietary component descriptions in the underlying record only where they assist identification or establish a limitation. Direct users to the linked manufacturer technical data for product views and detailed dimension diagrams.
- Show published tension and shear values only where the same manufacturer source states their basis. Use separate cards when both values are published; otherwise use a compact missing-value row.
- Do not rank products from different manufacturers by load where their published bases differ. Display the basis adjacent to every value.
- Treat ICC-ES / AISC, ETA / Eurocode and manufacturer safe-working-load data as jurisdiction-specific product evidence. Do not relabel any of them as an Australian Standard design capacity.
- For Hollo-Bolt, use the current ICC-ES ESR-3330 static/wind LRFD available strength and state that the LRFD resistance factor is already included. Do not multiply the published value by another factor.
- For UNI-BOLT, identify the TDS 1053.1 AS 4100 design capacity and state that `phi = 0.8` is already included.
- For HBS-Bolt, retain the manufacturer's working load rather than presenting the separate characteristic resistance as a design capacity.
- For BoxBolt, report ETA 20/1174 `Ft,Rk` and `Fv,Rk` as characteristic resistance with no design partial factor applied.
- For Blind Bolt Company products, use the current March 2026 BS EN 1993-1-8 design resistance, identify `gamma M2 = 1.25` as already applied and state whether the shear plane crosses the thread or slot.
- For Blind Bolt Company products, map `Ft,Rd` to tension and `Fv,Rd,thread` to shear over thread. Do not substitute `Fv,Rd,slot`. The March 2026 PDF remains the displayed resistance source. The current official product page conflicts with that PDF for the M14 tightening torque and the GBB1690HDG minimum fixing thickness; show both values, require confirmation and use 16 mm as the conservative GBB1690HDG filtering minimum pending confirmation.
- Keep NexGen2 as an M20 tower-oriented ICC-ES / TIA product record. Identify the displayed TIA-222-G strength and shear-plane condition; do not relabel it as AS 4100 capacity.
- State that the displayed fastener value does not evaluate connected plate or HSS wall bearing, tear-out, net section, block shear, local deformation, punching/pull-through, prying or combined actions.
- Thin-wall or curved monopole-shell applications remain project-specific and are not qualified by a generic structural blind-bolt product match.

Minimum edge distance, minimum pitch and connected-ply checks should reference AS 4100 terminology and clause/table language, not generic web-calculator labels.

For the web bolt tab, separate the edge-distance terms visibly:

- Input label: `e` = bolt-centre-to-edge distance for a standard hole. For an oversize or slotted hole, enter the distance from the nearer hole edge to the ply edge plus `d_f/2`.
- Input label: `p` = centre-to-centre bolt pitch used for detailing checks.
- Input label: `a_e` = drawing-derived effective edge distance used for the edge-limited bearing expression.
- Result label: `Minimum edge distance, e - AS 4100 Table 9.5.2`.
- Require `a_e` as a direct input for every active ply. Do not provide an Automatic / Manual mode or infer it from `e`, hole diameter, pitch or bolt arrangement.
- Explain that `a_e` is the minimum distance from the hole edge to the ply edge, measured in the direction of the force component, plus `d_f/2`; an adjacent bolt-hole edge is treated as a ply edge. The value must come from the connection drawing.
- Keep the lightweight connected-ply capacity on a critical-hole basis. Assume concentric action and equal shear per bolt, and derive the group capacity from the critical-hole capacity.
- Under that equal-action premise, use `phi Vb,group = n * MIN(phi Vb,full, phi Vb,edge)` for the critical bolt hole. Do not add a separate `Bolts on edge line` input.
- Present `n` times the critical-hole capacity as the equal-share connected-ply group capacity; keep the single-hole values in Calculation steps.
- Do not infer net-section or block-shear paths from the lightweight bolt geometry. These checks may be added only as a separate, optional manual-area assessment with explicit AS 4100 equations and limitations.

#### 15.10.1 Detailed Connection Input Structure

Keep the detailed connection input in this order:

1. `Bolt group` - bolt count, shear-plane condition and k<sub>r</sub>.
2. `Connected plies and detailing` - shared hole geometry and an explicit connected-ply basis.
3. `Optional ply rupture checks` - optional manual critical areas for net-section tension and block shear.
4. `TF slip check` - TF only, including separate serviceability slip actions.

The connected-ply section should use one shared detailing row:

- Use the heading `Hole geometry and spacing` with the support line `Hole type and pitch detailing`.
- `p` = centre-to-centre bolt pitch.
- Disable `p` only for a one-bolt connection.
- Label `k_r` as `bolted-lap reduction`; do not use `default 1.0` as its visible definition.
- On desktop, let the shared pitch / hole-type row use the full available width and align both input cards at the top. Keep the permitted pitch range and the Cl. 9.5.1 / Cl. 9.5.3 general-limit references on one concise support line where the viewport permits; allow normal wrapping on narrow screens.
- Align paired ply input cards at the top so a support note under `e` does not stretch the adjacent edge-condition card. Between 761 px and 1100 px, stack the pitch and hole-type cards in one restrained-width column rather than compressing their notes.

Use one explicit `Connected-ply basis` control:

- `Both plies identical` - default. Use the primary-ply properties for both connected parts and state this assumption in the result basis.
- `Check plies separately` - show the second-ply fields and assess both connected parts independently.

Do not use an unchecked optional-ply control that can be read as permission to omit the second connected part.

Each active ply requires:

- `t_p` - connected-ply thickness.
- `f_up` - connected-ply ultimate tensile strength.
- `Edge condition` - selected AS 4100 Table 9.5.2 edge category.
- `e` - critical bolt centre to the selected physical edge.
- `a_e` - directly entered effective edge distance from the connection drawing.

Lay out each ply as two paired rows for `t_p / f_up` and `Edge condition / e`, followed by one full-width `a_e` row with its definition directly below. Keep the status-bearing `p` and `e` control background around the label and control only; keep the clause/range note immediately below that control.

Do not duplicate `p` for the second ply. Each ply may have different thickness, material strength, edge condition, edge distance and effective edge distance.

#### 15.10.2 Connected-Ply Capacity Logic

For every active ply, use the entered drawing-derived `a_e` directly. Do not calculate `a_e` from the simplified web inputs. The user must identify the minimum applicable edge or adjacent-hole path in the direction of the force component in accordance with AS 4100 Cl. 9.2.2.4.

Keep the lightweight capacity check on a critical-hole basis. Assume concentric action and equal shear per bolt, and multiply the critical-hole capacity by the number of identical bolts.

For each active ply use:

- `phi V_b,full = phi 3.2 d_f t_p f_up`.
- `phi V_b,edge = phi a_e t_p f_up`.
- `phi V_b,local = MIN(phi V_b,full, phi V_b,edge)`.
- `phi V_b,group = n phi V_b,local`.

Do not add a separate `Bolts on edge line` input. Under the stated equal-action premise, every bolt is assessed using the entered critical-hole condition.

For `Both plies identical`, use the primary-ply values and label the basis `Both plies identical`. For `Check plies separately`, determine the lower full-bearing group capacity and the lower edge-distance group capacity independently; the same ply need not govern both values.

Display `Design bearing capacity - full-bearing limit` and `Design bearing capacity - edge-distance limit` as two rows in one compact result block, followed by one concise governing line. Use `edge-distance limit`, not `edge tear-out limit`, as the visible result term because the implemented expression is the AS 4100 Cl. 9.2.2.4(2) bearing limit using `a_e`; it is not an automatically generated tear-out or block-shear path. Match the typography, spacing and neutral result treatment used by the bolt-group shear result. Identify `Bolt group` in each supporting basis line because the displayed value is the derived equal-share group capacity. Keep the single-hole basis in `kN per bolt` and direct the user to the optional ply rupture checks for net-section tension and block shear.

Show that concise local-bearing scope note once in the detailed-check workflow. Keep the complete assumptions and exclusions in `Calculation basis and limitations`; do not add a separate repeated `Checklists / warnings` block.

#### 15.10.3 Optional Connected-Ply Integrity

Keep this workflow collapsed by default and place it after local hole bearing and detailing. Use the title `Optional ply rupture checks`; use `Not evaluated - manual areas required` as the default summary status. Default the assessment basis to `Not evaluated`.

When `Manual critical areas` is selected:

- Check one identified critical connection component at a time. Use the selected active ply value as `f_uc` and require a user-entered `f_yc`.
- `BOLT-PLY-TENSION-01` - For section tension use AS 4100 Cl. 9.1.9(b) and Cl. 7.2: `phi Nt = 0.90 MIN(Ag fyc, 0.85 kt An fuc)`.
- `BOLT-BLOCK-SHEAR-01` - For block shear use AS 4100 Cl. 9.1.9(e): `phi Rbs = 0.75 MIN(0.6 fuc Anv + kbs fuc Ant, 0.6 fyc Agv + kbs fuc Ant)`.
- Allow `kbs = 1.0` for uniform tension stress or `kbs = 0.5` for non-uniform tension stress.
- Require manual `Ag`, `An`, `Agv`, `Anv` and `Ant`. Do not derive these areas from bolt count, pitch, edge distance or a schematic.
- Treat the entered block-shear areas as the governing path only after the user has reviewed every plausible failure path. State that the check must be repeated for any other critical component.
- When the manual assessment is complete, display `phi Nt` and `phi Rbs` as capacities only. Do not compare them with project actions or include them in an overall governing ratio.
- If the manual assessment is selected but incomplete, show `Incomplete` within the collapsed integrity workflow. Do not issue a connection status.
- State that the assessment covers only the selected component and entered path; it must not imply that every connected component or plausible path has been checked.

Keep plate bending, connection-component compression or buckling, welds, supporting-member local effects, eccentric reactions and geometry-derived failure paths outside this optional check.

#### 15.10.4 Detailing Checks

Keep each detailing status with the input it evaluates; do not repeat the entered value in a separate detailing table:

- Show one combined status beside `p`, with the permitted minimum-to-maximum range immediately below the input.
- Show the minimum permitted `e` and its status directly below/beside each active ply edge-distance input.
- Keep the clause/table reference in the compact supporting note below the relevant input.

For minimum pitch use:

- `p_min = 2.5 d_f`.
- Apply the check only where `n > 1`.
- For one bolt, report `Not applicable`; do not display PASS or FAIL.

For maximum pitch use the AS 4100 Cl. 9.5.3 general limit:

- `p_max = min(15 t_p,min, 200 mm)`.
- `t_p,min` is the thinner active connected ply.
- Apply the check only where `n > 1`.
- For one bolt, report `Not applicable`; do not display PASS or FAIL.
- Do not auto-apply the special cases in Cl. 9.5.3(a) or (b); state that they require separate assessment.

Pitch and edge-distance checks are detailing-compliance checks, not design capacities. Keep their individual statuses beside the relevant inputs. Any applicable FAIL means the displayed capacity is not suitable for adoption until the detailing is corrected; repeat that consequence once as a concise warning immediately below the primary bolt-capacity result. For `/TF`, also show `NON-COMPLIANT` on the slip result. Maximum edge distance and connection-specific detailing remain outside this lightweight check.

#### 15.10.5 Result Hierarchy

Keep the connected-ply result hierarchy concise:

1. Show `Design shear capacity - bolt group` as one compact result row.
2. Show one matching compact connected-ply result block with two rows: `Design bearing capacity - full-bearing limit` and `Design bearing capacity - edge-distance limit`. Put `Bolt group` in each supporting basis line.
3. Give each bearing card its own controlling-ply basis. Follow the two capacities with one concise line identifying the overall governing condition and ply.
4. Inline detailing statuses at the `p` and active-ply `e` inputs; do not repeat them as a result table.
5. One collapsed `Optional ply rupture checks` section with two compact result rows when the manual assessment is active.
6. Single-hole capacities, the entered `a_e` value and equations remain in `Calculation steps`.
7. Do not show project strength actions or strength utilisation. Show `TF slip utilisation ratio` only for `/TF`.

The governing line should identify the governing ply and local condition, for example `Design bearing capacity governed by edge-distance limit - second ply`. If both plies are identical or equal, state that basis. Use `kN per bolt` consistently for both branches; describe the second branch as the AS 4100 Cl. 9.2.2.4 edge-distance bearing limit so that it is not confused with block shear.

#### 15.10.6 Scope Boundary

This remains a lightweight straight-line bolt-group check. State these assumptions and exclusions clearly:

- Included by default: concentric action, equal shear per bolt, straight aligned holes, local hole bearing, minimum pitch, general maximum pitch, minimum edge distance and two connected plies treated as identical or checked separately.
- Optional manual-area scope: section tension and one governing block-shear path for one selected critical component.
- Result boundary: standard bolt, local bearing and optional integrity results are capacities only; they do not constitute a complete connection compliance check.
- Entered `a_e`: required from the connection drawing for each active ply and not geometrically verified by the tool.
- The displayed edge-distance value is the Cl. 9.2.2.4(2) `a_e` capacity under the stated critical-hole, equal-share model. Automatic failure-path generation, overlapping tear-out paths, section tension, block shear and eccentric bolt-group reactions remain excluded.
- Excluded from the optional integrity check: automatic failure-path generation, plate bending, connection-component compression or buckling, welds, supporting-member local effects, eccentric bolt-group reactions, overlapping failure paths, special maximum-pitch cases under AS 4100 Cl. 9.5.3(a) and (b), maximum edge distance, prying action and coped-beam tearing.
- Additional connected plies require a separate check; do not infer their properties from either displayed ply.
- Connected-ply bearing is limited to a single-shear, two-ply connection. Multi-ply bearing-force distribution is not evaluated.
- AS 4100 Cl. 9.2.2.5 filler-plate reduction is not evaluated. Where a filler plate exceeds 6 mm, do not adopt the displayed bolt shear capacity without the separate required check.
- In the `/TF` branch, treat entered `V_sf*` and `N_tf*` as total bolt-group serviceability actions under the stated equal-share assumption. Use `mu = 0.35` only for clean as-rolled contact surfaces; other surfaces require test evidence.

### 15.11 Member Web Tab Rules

The member tab should use AS 4100 member-design language.

Current member calculators:

- `UB`
- `UC`
- `PFC`
- `CHS`
- `RHS`
- `SHS`
- `EA`
- `Round Bar`
- `Custom / Built-up`

Keep the catalogue-family switch aligned with Beam: `UB`, `UC`, `PFC`, `CHS`, `RHS`, `SHS`, `EA`, `Round Bar`, followed by `Custom / Built-up`. Axial Member may reuse only checked catalogue rows already accepted by Section Properties or Beam. For catalogue members, adopt the checked minimum centroidal or principal radius as the visible default and retain the radius override for a verified project axis.

#### 15.11.0 Steel Member and Grade Nomenclature

Use one visible vocabulary across Section Properties, Beam and Axial Member:

- family selectors: `UB`, `UC`, `PFC`, `CHS`, `RHS`, `SHS`, `EA`, `Round Bar`, `Custom / Built-up`;
- first-use or accessibility expansion: `EA` means `Equal Angle`; do not show the full name as a competing selector label;
- use `Round Bar`, not `Rod` or `ROD`, for the adopted InfraBuild Table 3 Rounds data. InfraBuild Table 7 `Rods and Light Billets` is a different product family and is not the source for this calculator;
- catalogue designations: for example `100 x 100 x 10 EA` and `Ø24 Round Bar`;
- visible grade labels: `Grade 300 (300PLUS)` and `Grade 350` for adopted AS/NZS 3679.1 hot-rolled sections and round bar; retain `300PLUS` only as a stable internal data key or where the source product name itself is being quoted;
- hollow-section grades remain `C250L0`, `C350L0` and `C450L0`; do not shorten them to generic Grade 250 / 350 / 450;
- custom material is labelled `Project input` or `Project-defined steel`, not as a catalogue grade.

Do not offer `Grade 250` for the adopted AS/NZS 3679.1 EA or Round Bar families. EA supports the checked Grade 300 (300PLUS) and Grade 350 rows; current catalogue availability notes state Grade 350 is by enquiry and depends on section and quantity. Round Bar supports the checked diameter-dependent Grade 300 (300PLUS) and Grade 350 strength rows, but actual grade and diameter availability must be confirmed. A strength row is not a stock guarantee.

Member checks should include, where applicable:

- Axial compression section capacity.
- Axial compression member capacity.
- Axial tension capacity.
- Gross-section yielding.
- Net-section fracture.
- Governing limit state.

Use standard language:

- `Section capacity`
- `Member capacity`
- `Design capacity`
- `Gross-section yielding`
- `Net-section fracture`
- `Slenderness`
- `Effective length`
- `Buckling curve`
- `Capacity factor`

For product dimensions and section properties, use Australian manufacturer data where possible, such as OneSteel / InfraBuild / Austube / Orrcon catalogues. Manufacturer data can define product availability and section properties, but design equations still need to trace back to AS 4100 or another governing standard.

For catalogue CHS, use the accepted grade-specific Austube design-property row for `A_g`, `r` and `k_f`, then apply the AS 4100 member-capacity method. These are source section properties, not imported member-capacity values. Keep Orrcon current-product geometry and availability as a separate source context. The optional CHS dimension override remains ideal circular geometry and must be labelled non-catalogue.

#### 15.11.1 Member Calculation Basis

Connection- and axis-dependent terms must stay explicit:

- Use table-derived default `alpha_b` values where the selected section family and embedded `k_f` condition match AS 4100 Table 6.3.3. Apply Table 6.3.3(A) when `k_f = 1.0` and Table 6.3.3(B) when `k_f < 1.0`. For the current member tab, this means cold-formed non-stress-relieved CHS = -0.5, PFC with `k_f = 1.0` = 0.5, EA with `k_f = 1.0` = 0.5, EA with `k_f < 1.0` = 1.0 as `other sections not listed` in Table 6.3.3(B), and Round Bar with `k_f = 1.0` = 0.5 as `other sections not listed` in Table 6.3.3(A). State the table row in the lookup panel and calculation steps. Do not ask the user to manually choose `alpha_b` unless the page provides an explicit advanced override for a different table row, axis, fabrication condition, or `k_f` case.
- For checked hot-rolled UB and UC catalogue rows with flange thickness not exceeding 40 mm, use `alpha_b = 0` from AS 4100 Table 6.3.3(A) or (B), according to the selected row `k_f`. Use the catalogue minor-axis radius for the default one-axis quick check. A section outside that flange-thickness condition requires a different table branch and must not inherit the default silently.
- For checked cold-formed non-stress-relieved RHS and SHS catalogue rows, use `alpha_b = -0.5` from AS 4100 Table 6.3.3(A) or (B), according to the selected row `k_f`. RHS defaults to its minimum centroidal radius; SHS reports symmetric centroidal axes.
- The Axial catalogue must consume the accepted shared design-property rows rather than maintain a smaller copied subset. Use all 73 Austube CHS grade-specific rows, all 89 RHS and 88 SHS designations with their exact listed grades, all 46 InfraBuild EA designations and both checked PFC grades. Do not offer a grade that is absent from the selected checked row.
- Sort CHS by outside diameter then wall thickness, and RHS/SHS by outside depth, width and wall thickness. This is a query order only; it must not alter source identity, grade availability or the default selected designation.
- AS 4100 Cl. 6.2 compression section capacity must be written as `N_s = k_f A_n f_y`, with design capacity `phi N_s = 0.90 k_f A_n f_y`. Do not replace `A_n` with `A_g` in the displayed formula. Catalogue examples and unholed member tables may calculate the same value using `A_g` only because `A_n = A_g` for an unperforated section. The calculation steps must state this assumption when no holes or penetrations are entered.
- Calculation examples should make the area basis explicit: `no holes: A_n = A_g`; `straight-line hole deduction only: A_n = A_g - n_h d_h t`; `manual net area: A_n` is user/project verified. Keep these examples short and use them to explain the limitation, not to expand the tab into a full connection-design tool.
- Treat radius of gyration `r` as an axis-dependent compression input. AS 4100 slenderness uses `L_e/r` about the checked buckling axis; therefore a one-axis quick check may default to the governing catalogue value such as `r_min`, but the default must be visible and editable. Catalogue CHS uses the published Austube radius; Round Bar and the CHS / Round Bar dimension overrides may use ideal circular geometry because the radius is the same about any centroidal axis. EA/PFC defaults should state the catalogue/quick-check basis. Custom / Built-up input should keep separate `r_x`, `r_y`, `L_ex` and `L_ey` and report the governing axis.
- Do not combine simplified non-catalogue EA/PFC geometry with catalogue `k_f` or `alpha_b`. Route those members through Custom / Built-up and require verified section properties and compression factors.

#### 15.11.2 Selected Member Summary

The `Selected member` strip confirms the adopted calculation basis. It is not a second Section Properties report. Use the same hierarchy and visual structure as Beam `Selected section`: compact heading and scope text on the left, four primary compression/material metrics below it, the selected family diagram on the right, one concise net-section basis line, and one full-width folded `Section details` row below both columns.

##### Summary Content Contract

The always-visible summary has four layers only:

1. selected member identity;
2. one short scope / provenance sentence;
3. four primary governing metrics, with two conditional connection metrics only when required;
4. one concise net-section basis line;
5. one folded `Section details` row.

Each primary metric must contain one decision-relevant value, not a list of alternatives, axes or load cases. A primary metric must not contain semicolon-separated values, multiple axis records, formula derivations, source notes or applicability prose. Put those items in `Section details`, calculation steps or limitations.

Keep each primary metric value and its unit together on one line at normal desktop width. Do not leave a unit such as `mm`, `MPa` or `mm2` on a separate line. Do not solve an overlong value by reducing font size, reducing letter spacing, allowing text to overlap, clipping the value or hiding engineering content.

The four always-visible primary metrics are:

- checked or governing axis with the actual governing `r used`;
- governing effective length `L_e` and governing `L_e/r`;
- adopted `f_y / f_u`;
- `k_f / governing alpha_b`;

Show adopted net area `A_n` and `k_t` as additional primary metrics only when holes, a manual net area or `k_t != 1.00` modifies the connection basis. For an unperforated section, use one line: `Unperforated section · A_n = A_g · k_t = 1.00`; do not repeat default `A_n` and `k_t` in separate metric cells.

For Custom / Built-up members, the primary strip must still show one governing record only:

- `Checked axis / r`: for example `y-axis / 20.0 mm`;
- `L_e / L_e/r`: for example `3.00 m / 150.0`;
- `k_f / alpha_b`: for example `1.000 / 0.5`.

State `both axes checked` in the scope sentence. Put the complete x-axis and y-axis `L_e`, `r`, `L_e/r` and `alpha_b` records in the folded `Section details` and detailed calculation. Do not place `x: ...; y: ...` strings in an always-visible primary metric.

##### Summary Layout Contract

Content rules govern layout; column-width tuning is not a substitute for reducing the primary summary to governing values.

- Wide desktop: use four columns for the default record. Conditional `A_n` and `k_t` metrics may flow into the responsive grid when the connection basis is modified.
- Give `Checked axis / r` the widest track and `L_e / L_e/r` the next widest track.
- Intermediate desktop / tablet: use three columns by two rows before any value approaches the adjacent metric.
- Phone: show the identity and short scope sentence only; omit the metric grid because the primary capacity outputs follow immediately below. Keep complete basis data in the folded details.
- Metric labels align at the top and values align on a common baseline within each responsive row.
- A metric and its unit move together to the next responsive row. They must never intrude into the adjacent metric.

The folded `Section details` must retain the complete basis without crowding the primary strip:

- `Geometry`: selected family dimensions in one parameter line with equals signs and units, for example `d = 150 mm; b_f = 75 mm; t_w = 6.0 mm; t_f = 9.5 mm`.
- `Areas`: `A_g`, adopted `A_n` and whether `A_n` is unchanged, a straight-line deduction or a manual value.
- `Material`: adopted `f_y` and `f_u`, including current overrides.
- `Compression basis`: effective length, actual `r used`, checked or governing axis, `k_f` and `alpha_b`.
- `Tension basis`: `k_t` and the adopted net-area method.

Keep `Connection / net section` folded by default. Its summary must state the adopted `A_n` and `k_t` basis. When opened, lay out the inputs as a three-column, two-row desktop sequence: `A_n method`, `n_h`, `d_h`, then net-path `t`, `A_n` and `k_t`. Do not force these six controls into one row. Keep the field label for `t` short; place the PFC `t_w` default and flange-path `t_f` qualification in the group explanation rather than repeating it inside the control label.

Do not keep `r_x`, `r_y`, `I_x` and `I_y` as separate always-visible summary metrics when the calculation directly adopts `r used`. Put complete axis properties in Section Properties or the folded calculation/source layer. CHS and Round Bar should state symmetric axes once. PFC should identify the adopted minor axis. EA catalogue checks must use and identify the minor principal-axis radius from the checked table rather than substituting the equal leg-parallel radius. Custom / Built-up members must retain the complete x-axis and y-axis `L_e`, `r`, `L_e/r` and `alpha_b` records in `Section details`, name the governing axis in the primary strip and state that both axes were checked in the scope sentence.

##### Summary Regression Check

Before accepting a Selected member layout change, render and inspect at least:

- CHS with normal short values;
- EA with `minor principal` axis wording;
- PFC with catalogue basis;
- Custom / Built-up with different x-axis and y-axis slenderness values;
- desktop at the normal wide viewport;
- the intermediate three-column breakpoint;
- phone width.

The check fails if any value crosses its metric cell, a unit separates from its value, a label collides with a value, the diagram compresses the metric grid below its minimum track widths, or Custom / Built-up exposes both axis records in the primary strip.

The two primary tension limit states may share one result card, but the result note must name the active governing limit state: `Gross-section yielding governs` or `Net-section fracture governs`, followed by the governing Standard reference. Do not leave the main result at the generic expression `min(gross-section yielding, net-section fracture)` after the calculation is available.

Keep the optional `Design action check` folded by default on desktop and phone. Capacity remains the primary answer; opening the optional check must not change the independently calculated capacities.

Within `Detailed calculation`, group capacity components by limit-state family. Show four compression records (`phi Ns`, `Le/r`, `alpha_c`, governing compression limit) and three tension records (gross yielding, net fracture, governing tension limit) in separate labelled rows. Do not allow the governing tension record to wrap onto an orphan row after the compression records.

#### 15.11.3 Member Inputs and Overrides

- `f_y` and `f_u` may default from the selected material grade, manufacturer table or product standard, but keep them editable where project certificates, thickness ranges or product-specific values may govern. If the user overrides them, calculation steps must show the current values and state that `k_f`, `alpha_b` and catalogue geometry remain tied to the selected section / lookup basis unless separately changed.
- Show `Steel grade`, `f_y` and `f_u` together in the always-visible Material properties row. Mark unchanged values as `Catalogue default`, changed catalogue values as `User override`, and Custom / Built-up values as `Project input`. Provide one reset control that restores the current selected-grade values. A section or grade change resets both strengths to the new applicable defaults.
- Keep catalogue `Section`, `L_e` and the governing `r` together under `Member definition`. Populate `r` from the selected catalogue row and keep it directly editable. Show supported family dimensions as a separate low-frequency `Custom dimensions` toggle; when enabled, geometry-derived properties replace the editable catalogue-radius input.
- Enable family-dimension overrides only for CHS and Round Bar, where ideal circular geometry gives an axis-independent gross-property path and `k_f = 1.0` is explicitly adopted. An active CHS or Round Bar dimension override must not inherit `k_f` from the catalogue row used to initialise its dimensions. UB, UC, PFC, RHS, SHS and EA remain catalogue-only; Custom / Built-up is the verified-property route for non-catalogue members.
- Do not imply `A_n` is known from the catalogue section alone; it must come from the actual connection net section.
- For CHS and Round Bar, the initial unperforated quick-check state may adopt `A_n = A_g`. While that default remains unedited, a family dimension override must update `A_n` with the current geometry-derived `A_g`; do not retain the gross area from an earlier diameter. Direct user entry of `A_n` changes the path to a manual project net area and stops this linkage until the section or dimension-override basis is reset.
- For EA/PFC net-section checks, provide a lightweight AS 4100 Cl. 9.1.10 straight-line bolt-hole deduction option (`A_n = A_g - n_h d_h t`). For catalogue EA, use the manufacturer's actual thickness `t`, not the nominal designation thickness, and show both values where they differ. For PFCs, show catalogue `t_w` / `t_f`, default the net-path thickness to `t_w`, and allow manual override where the critical path passes through the flange or another connected element. Label the automatic path as a straight-line deduction only.
- Validate the automatic deduction before calculating: `n_h` must be a whole number from `0` to `20`; `d_h` must be zero only when `n_h = 0` and otherwise positive; the adopted net-path `t` must be positive; and the resulting `A_n` must remain positive. Blank, negative, fractional or out-of-range values must show `INPUT REQUIRED` and suppress all dependent capacities. Do not round, clamp or convert invalid hole inputs to a no-hole case.
- Keep a manual `A_n` override for staggered holes, slots, cope cuts, multiple net-section paths, or any topology-dependent connection geometry.
- Display net-section values in a folded `Connection / net section` row, separate from section properties, material strengths and compression reduction factors.
- Combine factor lookup tables, source status and exclusions under one folded `Design basis and limitations` section. Do not repeat separate `Reference values` and `Basis and limitations` sections on the Axial Member page.
- Use `k_t = 1.00` only where the end connection satisfies AS 4100 Cl. 7.3.1 uniform force distribution.
- For eccentric tension connections, use AS 4100 Table 7.3.2. Current quick defaults: EA one-leg connection `k_t = 0.85` under Case (a); PFC connected through the web `k_t = 0.85` under Case (c); other channel arrangements require the applicable Case (b), (d), (f) or (g) value; unequal angle connected by the short leg uses `k_t = 0.75` when Case (a) applies. Keep `k_t` editable and project-confirmed, and name the default connection case in the folded basis and calculation trace.
- Where the member tab reports utilisation, keep compression and tension design actions as separate optional project inputs (`N_c*` and `N_t*`). Do not use a single action-type selector; report `N_c* / phi N_c`, `N_t* / phi N_t` and the governing utilisation ratio without implying the actions act simultaneously.
- Axial inputs must fail closed. Require positive `A_g`, `A_n`, governing radii, effective lengths, `f_y` and `f_u`; require `A_n <= A_g`, `f_u >= f_y`, `0 < k_f <= 1`, `-1 <= alpha_b <= 1`, and `0.75 <= k_t <= 1.00`. A blank, zero or out-of-range editable value must show `INPUT REQUIRED`, clear every capacity and utilisation result, and must not silently restore a catalogue default.
- Use unrounded values for governing comparisons and PASS / FAIL. When a ratio immediately above or below `1.00` would otherwise round to a contradictory `1.00`, display `>1.00` or `<1.00` while retaining the unrounded decision.

#### 15.11.4 Custom Member Geometry

- `Custom / Built-up` member input may use user-entered properties directly: `A_g`, `r_x`, `r_y`, `k_f`, `alpha_bx`, `alpha_by`, `L_ex`, `L_ey`, `f_y`, `f_u`, `A_n` and `k_t`.
- Start project geometry and restraint inputs (`A_g`, `r_x`, `r_y`, `L_ex`, `L_ey`) blank and fail closed. Material strengths and `k_f = 1.0`, `alpha_bx = alpha_by = 0.5` may remain clearly labelled initial values requiring verification.
- Treat this mode as a user-entered section-property quick check; the browser must not claim that the values are verified. If the source report gives `I_x` and `I_y`, the user should enter `r_x = sqrt(I_x / A_g)` and `r_y = sqrt(I_y / A_g)`.
- Hide catalogue section-guide imagery in this mode because no standard section geometry is being selected.
- Calculate compression about both entered axes and report the governing `phi N_c`.
- Keep a visible result-level limitation: flexural buckling is checked about the entered axes only. The source section calculation, connector spacing, individual component slenderness, built-up shear deformation, torsional/flexural-torsional buckling, local buckling derivation and connection eccentricity are not verified by the web tab.
- CHS and Round Bar may include a family-specific dimension override inside the Section properties card.
- Keep family-specific dimension override collapsed by default: show only one concise `Custom dimensions` checkbox without a repeated heading or explanatory subtitle, and expand the dimension inputs and geometry note only after it is selected.
- The family override must feed the same member-capacity workflow (`A_g`, `A_n`, `r_x`, `r_y`, `r used`, `k_f`, `alpha_b`, `L_e`, material strengths and `k_t`) instead of creating a separate calculation path.
- CHS and Round Bar geometry derive `A_g`, `r_x = r_y` and `I_x = I_y` from circular geometry.
- Non-catalogue EA and PFC members require verified `A_g`, `r_x`, `r_y`, `k_f` and `alpha_b` values in Custom / Built-up; do not reconstruct them from simplified rectangular geometry in the Axial tab.

#### 15.11.5 Factor Lookup Tables

For a quick-reference web tab, do not make the user leave the page for small repeated standard lookups. If a clause table is commonly needed, compact, and within the tool scope, embed a collapsed lookup table in the page with:

- the value or factor;
- the exact condition where it applies;
- the source clause/table or design handbook basis;
- the source status, such as `Checked`, `For Review`, or `Source_Not_Verified`.

Keep genuinely project-specific inputs outside these lookup tables. For member design this includes actual net area `A_n`, effective length `L_e`, end restraint, connection eccentricity, hole layout, stagger, cope cuts, and flexural-torsional buckling assumptions.

#### 15.11.6 Member Calculation Boundary

Do not imply the member tab is a full steel design engine unless all required limit states are implemented. State exclusions clearly, for example:

- Bending not included.
- Shear not included.
- Combined actions not included.
- Connection design not included.
- Flexural-torsional buckling not included unless specifically implemented.

The folded calculation trace must follow the engineering dependency order:

1. selected section, source and adopted material;
2. `A_g`, adopted `A_n` and the net-area method;
3. section compression capacity `phi N_s`;
4. axis-specific `L_e/r`, `lambda_n`, `alpha_a`, adopted `alpha_b`, `lambda`, `eta`, `xi` and `alpha_c`;
5. governing member compression capacity `phi N_c`;
6. gross-section yielding, net-section fracture and governing tension capacity `phi N_t`;
7. optional design-action utilisation.

For axial-member verification, reproduce at least one AS 4100 Table 6.3.3 `alpha_c` point, one published compression-member worked example, one published tension-member worked example, and one published straight-line hole-deduction example. The current net-section golden case is Design Manual Example 5.3.4: 75 x 75 x 6 EA, `A_g = 867 mm2`, one 22 mm hole, actual `t = 6 mm`, `A_n = 735 mm2`, `k_t = 0.85` and `phi N_tf = 195.95 kN`. Exercise the supported `alpha_b` range, positive/zero effective length, positive/zero material strength, `A_n` limits, `k_t` limits, whole/blank/fractional/negative hole inputs, actual-versus-nominal thickness, and a utilisation immediately above and below `1.00`. Published examples support verification but do not replace the governing AS 4100 clause.

For custom properties, repeat the Cl. 6.3.3 reduction calculation for both entered axes before selecting the lower `phi N_c`. The formula and substitution rows must expose every intermediate variable used by a later expression, including `alpha_a` and `xi`. Do not hide `eta >= 0`; display it as `eta = max[0, 0.00326(lambda - 13.5)]`.

#### 15.11.7 Shared Section Geometry and Section Properties Tab

Purpose and modes:

- Use one shared geometry layer for dimension-derived section properties. Beam, Axial Member and future tabs must call this layer rather than reimplementing ideal-shape formulas.
- Open the Section Properties tab in `Catalogue sections` mode and provide a separate `Custom geometry` mode.
- Reuse only checked manufacturer rows already accepted elsewhere in the handbook. Catalogue mode includes `UB`, `UC`, `PFC`, `CHS`, `RHS`, `SHS`, `EA` and `Round Bar`; keep this order aligned with Beam and Axial Member, followed by `Custom geometry`. Custom geometry may cover ideal rectangles, RHS/SHS, solid circles, CHS, symmetric I-sections, equal angles, simplified channels and T-sections.
- Show a compact directory-coverage line below the selected designation. State the accepted row count and governing dimension range for the active family, and order hollow-section designations by descending primary size so large common products are immediately discoverable.
- Treat Section Properties as the shared section, product and material attribute lookup for downstream steel-member workflows. It may report verified geometry, product identity, material strengths, common steel constants and checked standard-dependent attributes, but it must not calculate design capacity, member stability, actions or utilisation.

Controlled product-directory contract:

- `sectionProductDirectory` is the canonical in-app product directory. Section Properties renders it directly; Beam, Axial Member and future calculation tabs must filter or map the same family arrays rather than recreate manufacturer size lists.
- A downstream workflow may expose only the subset for which its calculation method is implemented, but it must state that limitation and must not silently maintain a conflicting local catalogue. Product additions, corrections and deletions enter Section Properties first, then flow to dependent selectors through the shared directory.
- Preserve one stable identity per accepted row using family plus published designation, with numeric dimension matching where manufacturer formatting differs. Keep geometry, mass, section properties, grade rows and source references attached to that identity; do not join by dropdown position or rounded display text.
- Treat `complete` as complete within the adopted, row-checked source tables below. It does not mean every product that may be commercially available in Australia. Availability guides, distributor stock lists and uncited web ranges may identify candidates for review but cannot create an engineering-property row.
- Keep the directory coverage summary folded by default. It may show all accepted families, counts and ranges, while the active-family line remains visible for quick lookup.

| Family | Accepted directory coverage | Adopted source basis |
|---|---|---|
| UB | 28 sizes; overall `d = 150–611.6 mm` | InfraBuild 2019 Tables 9-10 |
| UC | 13 sizes; overall `d = 97–327.2 mm` | InfraBuild 2019 Tables 11-12 |
| PFC | 10 sizes; overall `d = 75–380 mm` | InfraBuild 2019 Tables 15-16 |
| CHS | 74 visible sizes; `D = 26.9–508 mm`, `t = 2.0–12.7 mm` | 73 Austube Tables 3.1-1/2 engineering rows plus the Orrcon `60.3 x 3.5 CHS` geometry-only row |
| RHS | 89 sizes; `d = 50–400 mm`, `b = 20–300 mm`, `t = 1.6–16 mm` | Austube Tables 3.1-3/4 |
| SHS | 88 sizes; `b = d = 20–400 mm`, `t = 1.6–16 mm` | Austube Tables 3.1-5/6 |
| EA | 46 sizes; equal leg `b = 25–200 mm`, nominal `t = 3–26 mm` | InfraBuild 2019 Tables 19-21 |
| Round Bar | 26 sizes; `D = 10–90 mm` | InfraBuild 2019 Table 3 diameter and linear-mass rows |

- The table above is the release baseline, not a hard-coded permanent ceiling. When a newer adopted manufacturer table is checked, update the shared directory, coverage summary, traceability record, source reproduction and dependent-selector tests together.
- New families such as welded beams/columns, unequal angles, flats, squares or tapered-flange sections require their own complete row-level geometry/property source and family-specific axis rules before admission. Do not mix incomplete placeholder families into the accepted directory.

Shared calculation contract:

- gross area `Ag` for catalogue sections and `A` for entered ideal geometry;
- centroid coordinates `cx`, `cy` from the geometry origin;
- centroidal second moments `Ix`, `Iy` about axes parallel to the entered overall dimensions;
- elastic section moduli `Zx`, `Zy` to the furthest idealised edge;
- plastic section moduli `Sx`, `Sy` where they are published by the checked catalogue or implemented by a reviewed ideal-geometry formula;
- for unsymmetric custom geometry, locate the plastic neutral axis for each direction independently from the equal-area condition, then calculate `S` as the first absolute area moment about that axis; do not substitute the elastic centroid for the plastic neutral axis;
- radii of gyration `rx`, `ry` from `sqrt(I/A)`;
- product of inertia `Ixy`, polar second moment `Ix + Iy`, principal second moments `Iu` / `Iv`, principal radii `ru` / `rv`, and principal-axis angle `thetaU` for entered ideal geometry or catalogue shapes whose symmetry establishes the transformation;
- geometric clear-web area `Aw` for I-sections and channels, and horizontal-wall `Awx` plus vertical-wall `Awy` for ideal RHS/SHS. None is a design-standard effective shear area `Av`.

Shared material contract:

- identify product form, material/product standard, steel grade, controlling thickness or diameter and supply-condition basis before reporting `fy` or `fu`;
- resolve hot-rolled section `fy` / `fu` from AS/NZS 3679.1 Table 14 using the nominal thickness of the governing part, and resolve round-bar values from Table 15 using nominal diameter;
- resolve hollow-section `fy` / `fu` only from a checked AS/NZS 1163 grade or product-table row applicable to the selected product;
- report the AS 4100:2020 Cl. 2.2.4 design constants `E`, `G`, Poisson's ratio and coefficient of thermal expansion as standard values common to all steel grades;
- report density only with its stated engineering mass basis; the current steel mass conversion uses `7850 kg/m3`;
- keep material data in one shared lookup layer used by Section Properties, Beam and Axial Member rather than maintaining conflicting grade constants in separate UI functions;
- label each material value as `Standard`, `Catalogue`, `Derived`, `Project input` or `Not verified`;
- when the selected catalogue geometry has no checked material/capacity row, continue showing verified geometric properties but show standard-dependent attributes as unavailable rather than copying values from a different section.

Page and evidence requirements:

- Keep the visible query classification to two primary result groups only: `Section properties` and `Material properties`. Section basis, axis properties, section-specific values, principal-axis relationships, material-dependent section values and geometric ratios are subsections within `Section properties`, not peer page categories.
- Use this visible page sequence: section selection; material definition; selected-section summary and axis figure; `Section properties`; `Material properties`; conditional folded `Derivations`; folded `Source and limitations`.
- Within `Section properties`, use the engineering sequence: gross section basis; displayed-axis properties; applicable family-specific properties; principal-axis relationship where relevant; material-dependent section values; geometric ratios.
- Within `Material properties`, show the selected standard and grade, governing thickness or diameter, `fy`, applicable exact-row `fy,w`, `fu`, `E`, `G`, Poisson's ratio, thermal expansion coefficient and density. Do not repeat the same material identity or thickness statement in both the group description and value cards.
- Present mass per metre where available, gross area, centroid coordinates, `Ix`, `Iy`, elastic `Zx` / `Zy`, plastic `Sx` / `Sy`, and `rx` / `ry`. The accepted CHS directory contains all 73 distinct Austube Tables 3.1-1 and 3.1-2 rows from `D = 26.9–508 mm` and `t = 2.0–12.7 mm`; retain their published mass, `Ag`, `I`, `Z`, `S` and `r`. Add the separately checked Orrcon `60.3 x 3.5 CHS` product as one geometry-only row: its mass is a catalogue value and its remaining properties are geometry-derived from published nominal `D` / `t`. For custom geometry, a steel mass may be derived from `0.00785A kg/m` only when the assumed density `7850 kg/m3` is stated.
- The selected-section summary must state the active value basis rather than use a generic phrase such as `Stated by property`. For Orrcon CHS, show `Catalogue mass + nominal D/t-derived properties`; for round bar, distinguish the published mass/diameter from ideal solid-circle properties; for mixed rolled-section rows, state that catalogue values and identified derived references are both present.
- Keep EA axis notation source-specific and explicit. Section Properties uses centroidal `n-n / p-p` and catalogue principal `x-x / y-y`; Beam catalogue Load A/C acts about principal `x-x` and Load B/D about principal `y-y`. The selected Beam direction must include the word `principal` so its `Ix/Iy` values cannot be mistaken for the angle's centroidal `In/Ip` values.
- For catalogue RHS and SHS, use the accepted Austube Tables 3.1-3 to 3.1-6 product rows for mass, `Ag`, `I`, `Z`, `S` and `r`; retain each checked grade row for `fy`, `kf`, compactness and `Ze`. Do not replace rounded-product properties with sharp-corner hollow-section formulas. Centroid coordinates, symmetry relationships and nominal clear-wall `Awx` / `Awy` may be derived from stated overall dimensions and thickness only when labelled `Derived · catalogue data`.
- Place a compact material-definition row after section selection. In catalogue mode, infer product form and controlling thickness from the selected product and default to a grade listed for that exact design-property row where one exists. A different standard grade may remain selectable for material lookup, but grade-dependent section attributes must then state `Selected grade not listed for this section`. In custom mode, require an explicit product-form / material basis and allow project-entered `fy` / `fu` where no standard lookup applies.
- Present the accepted catalogue product families and `Custom geometry` in one compact horizontal category switch, consistent with the Axial Member family control. Do not add a second visible catalogue/custom mode row. Keep only `Section designation` in the catalogue selection row; retain the underlying family and source-mode values as application state without repeating visible dropdowns. Wrap catalogue families into two balanced columns on narrow screens and allow the longer custom label to span the final row.
- Custom mode must start with the material basis unresolved. Do not infer a hot-rolled, round-bar or hollow-section product standard solely from the selected ideal shape. Resolve `fy` / `fu` only after the user explicitly selects a product form or project-defined steel basis.
- Changing the custom shape must reset the material basis to unresolved so that a product form selected for one ideal shape is not carried into an incompatible shape.
- For custom standard materials, keep controlling thickness or diameter linked to the governing entered geometry by default. A manual override must be an explicit reversible state, visually labelled beside the input and carried into the result basis and calculation trace.
- Fail closed on incomplete or internally inconsistent project material inputs. Do not report project strengths unless controlling thickness, `fy` and `fu` are positive and `fu >= fy`.
- Present one compact `Material properties` result group after the complete `Section properties` group. Show material/product standard, grade, controlling thickness or diameter, `fy`, `fu`, `E`, `G`, Poisson's ratio, thermal expansion coefficient and density with visible basis labels.
- Present checked standard-dependent section attributes such as `kf`, compactness and `Ze` only when the selected section, grade and direction exist in accepted shared design-property data. Show all applicable directions compactly; do not silently choose one direction for an unsymmetric section. Reuse the accepted AS 4100 reconciliation result for PFC directions rather than leaving a supported classification blank. For EA, use every checked Table 20 row and preserve Load A / B / C / D; where compactness is identified from the published `Ze` interval rather than printed as a class, label it `Derived · catalogue Ze interval`.
- Render direction-dependent classification and `Ze` as short labelled rows rather than one long sentence. Hide the complete material-dependent `Section design values` subsection for custom geometry because no checked catalogue design row applies.
- Present common catalogue supplementary properties when the checked row publishes them: torsion constant `J`, warping constant `Iw`, PFC centroid coordinate `XL`, PFC shear-centre coordinate `XO`, directional elastic moduli, and principal-axis properties for angles. For entered ideal geometry calculate `Zx,T`, `Zx,B`, `Zy,R` and `Zy,L` from the matching extreme-fibre distances; do not collapse an unsymmetric section to a single unexplained `Z` value.
- Label the polar second moment as `Ix + Iy`, without introducing `Jp`; state that it is equal to the St Venant torsion constant `J` only for circular sections.
- Present dimensionless geometric ratios such as `D/t`, `b/t`, `d1/tw`, `(bf-tw)/(2tf)` for symmetric UB/UC or I-sections, and `(bf-tw)/tf` for channels without assigning a section classification.
- Label every result as catalogue, derived from catalogue data, derived from entered geometry or unavailable.
- Keep published catalogue values out of `Derivations`; their result-level `Catalogue` label is sufficient. Show `Derivations` only when the active state contains calculated values. Catalogue mode should summarise the calculated-property basis without repeating every displayed value, while custom geometry should retain the governing formulas and substitutions.
- Keep provenance roles distinct: result labels identify the value class, `Derivations` explains calculations only, and `Source and limitations` records documents, verification status, applicability and exclusions. Do not repeat the same material lookup, catalogue row or derivation narrative across these layers.
- Label a separate web yield strength `fy,w` as an exact catalogue-row value when it is reused from a checked UB, UC or PFC section/grade record; do not present it as the generic controlling-thickness lookup.
- Do not show a bare zero for product of inertia. State whether `Ixy = 0` follows from symmetry, whether rotational symmetry makes every centroidal axis principal, or whether a non-zero value requires the reported principal axes. Keep unavailable catalogue data visually distinct from a calculated zero.
- For circular sections, retain a mathematically valid zero warping constant only with the visible interpretation `Zero by rotational symmetry`; do not present an unexplained `Iw = 0`.
- Use a compact scalar summary plus an x/y property table rather than repeating a large card for each axis value.
- Keep the two primary result groups visually stronger than their internal subsection headings. Do not present axis properties, torsion, principal axes, checked design references or geometric ratios as additional page-level categories.
- For rotationally symmetric CHS, solid circles and round bars, show one equivalent centroidal-axis column and state that every centroidal diameter has the same properties. Do not repeat identical x/y values as separate decision information.
- Coordinate Orrcon CHS geometry rows with Austube design-property rows by numeric outside diameter `D` and thickness `t`, not by designation-string formatting. Preserve the Austube grade-specific product range: do not copy a C250L0 row into C350L0 or vice versa, and state `No checked design row` for a geometry not present in the adopted design tables. Current wider commercial-availability literature must not add 610 or 660 mm CHS to the engineering-property directory until row-level mass and section properties are independently verified from an adopted source.
- For equal angles, place actual thickness, root/toe radii and centroid distances with the gross product geometry; keep n-n / p-p centroidal properties in the main axis table; then present the principal x-x / y-y inertia, radii, angle and moduli as a separate structured group.
- Hide family-inapplicable supplementary cards instead of filling the main result hierarchy with unavailable J, Iw, XO or shear-reference placeholders. Retain unavailable status in the detailed basis where it is useful for completeness.
- Title the section-specific subsection from the values actually shown. Where the polar second moment is the only applicable item, use `Supplementary geometric reference` rather than implying that torsion, warping or shear properties are present.
- Include one compact deterministic SVG for the current section only. Use catalogue-style chain centre lines, without positive-direction arrowheads, and mark the centroid `C`. Use selected nominal dimensions in catalogue mode and entered dimensions in custom mode.
- Keep the axis figure available as a compact phone aid because the axis convention determines how the directional properties are read. At narrow widths, reduce the figure and hide secondary summary metrics rather than removing the x/y or n/p convention.
- Mark the axis location as indicative when a checked catalogue row lacks the centroid coordinates required to place both centroidal axes. The SVG is a convention guide, not a numeric source.
- For PFC catalogue rows, use published `XL` to place the centroidal `y-y` axis and show published `XO` separately; do not replace either value with ideal sharp-corner geometry.
- Use positive horizontal coordinates to the right, positive vertical coordinates upward and positive principal-axis rotation counter-clockwise.
- For equal angles, follow the InfraBuild catalogue convention: centroidal `n-n` is horizontal, centroidal `p-p` is vertical, and `x-x` / `y-y` are principal axes at 45 degrees. Keep the complete 46-row Table 19 / Table 21 geometry directory and the matching 46-row Table 20 design-property directory, including mass, actual thickness, radii, centroid distances, directional `Z`, plastic moduli, `I_np`, principal properties, `J`, grade-specific `fy`, `kf` and Load A / B / C / D `Ze`. Do not substitute sharp-corner ideal geometry for a published rolled-angle value. Axial Member must reuse the same 46 checked grade and `kf` records for its minor-principal-axis compression check.
- Use the full axis notation consistently in headings, captions and descriptions: `n-n / p-p centroidal` and `x-x / y-y principal`. Do not shorten these to `p/n` or unqualified `x/y`.
- Show the publisher, catalogue edition or year and checked-row status. Describe nominal dimensions combined with geometric formulas as a mixed basis, not a manufacturer table-property lookup.
- Treat section compactness, element slenderness classification, `kf` and effective properties as grade-, direction- and standard-dependent attributes. Section Properties may display them only through its explicit material-grade branch and only for checked section/grade/direction rows already accepted by Beam or Axial Member. Design capacity remains in those downstream workflows.
- Before accepting a Section Properties release, reproduce production rows for at least one UB, UC, PFC, CHS, EA and Round Bar directly against the cited catalogue pages. The regression must compare the live production data path, not only a fixture, and must independently recalculate geometry-derived CHS / Round Bar properties and material-table boundary cases.
- Keep `Source and limitations` content in a compact single reading column; do not force unequal notes into balanced columns that create large empty areas.
- Keep section-family category controls at least 44 px high on narrow screens. Use button-state semantics (`aria-pressed`) for the top tool navigation so the active tool is exposed without implying a keyboard-managed tablist.

Scope boundaries:

- State that no material standard governs the pure geometric relationships.
- Treat custom shapes as sharp-corner ideal geometry. Show the formulas and identify composite addition or subtraction where used.
- Treat the custom T-section as one centred web rectangle plus one flange rectangle. Report `A`, `cx`, `cy`, `Ix`, `Iy`, directional elastic moduli, reviewed equal-area plastic moduli, radii and geometric clear-web area `Aw`; do not infer rolled-tee corner radii, `J`, `Iw`, shear centre, compactness or capacity.
- Keep x/y axes explicit; do not describe unsymmetric x/y values as principal-axis properties.
- Do not replace unavailable rolled-section properties with sharp-corner geometry. Use verified manufacturer values when available.
- Report plastic modulus, torsion constant and warping constant only where the selected catalogue row publishes them or a reviewed ideal-geometry formula is implemented. Otherwise show `Not available`; never infer rolled-section values from simplified sharp-corner geometry.
- Report `Ixy` and principal-axis transformation only from reviewed ideal geometry or symmetry. Do not infer them for an incomplete rolled-section catalogue row.
- Do not report effective properties, local buckling classification or material strength unless the selected product form, grade, thickness and source row are explicitly resolved and reviewed.
- Keep root radii, corner radii, tapers, welds, holes, copes and manufacturing tolerances outside the ideal geometry model.
- Keep product availability, design capacity, member stability, actions and utilisation outside this lookup. Material strength and checked design attributes are reference outputs only and must pass to Beam/Axial without becoming a second capacity calculation path.

### 15.12 Beam Section Capacity Web Tab Rules

The Beam tab is a lightweight AS 4100 section-capacity tool. Keep its public name as `Beam Section Capacity`. It reports cross-section resistance only and must not imply that beam-member stability, restraint or serviceability has been checked.

#### 15.12.1 Purpose, Question and Acceptance Boundary

The first-screen engineering question is:

`For this selected catalogue section or entered ideal family geometry, what is the AS 4100 design section moment capacity about the selected principal bending direction, and what section shear capacity is available for the matching direction?`

The accepted calculation scope is:

- design section moment capacity `phi Ms` about one selected principal axis or one manufacturer-defined load direction;
- design section shear capacity `phi Vv` only where a reviewed family-specific AS 4100 shear method exists;
- optional `M*` and `V*` demand review below the capacity results;
- AS 4100 moment-shear interaction only where the selected family, axis and shear path satisfy the reviewed clause conditions.

The tab must distinguish these terms:

- `Section moment capacity, phi Ms`: local cross-section yielding / local-buckling resistance from AS 4100 Cl. 5.2.
- `Member moment capacity, phi Mb`: member resistance including lateral stability and restraint, excluded from this tab.
- `Section shear capacity, phi Vv`: cross-section or web shear resistance from the applicable AS 4100 Section 5.11 path.

Do not reuse the Axial Member calculation result. Reuse its compact family-selection pattern, the family-local `Custom dimensions` override, family-dependent fields, selected-item summary and folded calculation details. Axial fields such as `Ag` and `r` do not establish bending capacity.

#### 15.12.2 Governing Sources and Evidence Hierarchy

Use the following source roles:

| Source role | Required source | Use in the Beam tab |
| --- | --- | --- |
| Governing design rule | `AS4100.pdf` | `phi`, principal-axis requirement, section slenderness, compact / non-compact / slender `Ze`, shear and interaction |
| Hot-rolled product data | `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf` | UB, UC, PFC, EA and Round Bar dimensions, mass, section properties, yield stresses and published `Ze` |
| Hollow-section design data | `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf` | CHS, RHS and SHS dimensions, properties, `kf`, compactness and `Ze` by grade |
| Current product context | Current official InfraBuild / Austube / Orrcon product pages or e-catalogue | Confirm designation and grade availability; do not silently describe an older table as current stock |
| Secondary explanation | `Steel Structures Design Manual to AS 4100.pdf` | Worked-example and interpretation check only; AS 4100 remains governing |

Minimum checked citations for implementation:

- `AS4100.pdf | Cl. 5.1 and Cl. 5.2.1 to 5.2.6 | PDF pages 66-69 | printed pages 53-56`.
- `AS4100.pdf | Table 5.2 | PDF pages 67-68 | printed pages 54-55`.
- `AS4100.pdf | Table 3.4, capacity factor for bending | PDF page 47 | printed page 34`.
- `AS4100.pdf | Cl. 5.11.2 to 5.11.5 | PDF pages 86-87 | printed pages 73-74`.
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf | Tables 15 and 16, PFC | PDF page 17 | printed page 15`.
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf | Tables 19 to 21, EA | PDF pages 19-21 | printed pages 17-19`.
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf | Table 3 and Table 38, Round Bar | PDF pages 9 and 31 | printed pages 7 and 29`.
- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf | Part 3, Section 3.2.2 and Tables 3.1-1 to 3.1-6 | PDF pages 24-40`.

Catalogue `Ze` may be used directly only when its family, designation, grade, axis / load direction and table edition are all recorded. Product-table values do not override AS 4100. The local catalogue reconciliation layer must check each supported family / grade / direction against AS 4100 Cl. 5.2 and keep `kf` traceable to AS 4100 Cl. 6.2. Slender Austube flat-element rows may retain the Standard's permitted effective-cross-section result. Where an asymmetric InfraBuild table publishes direction-specific `Ze` without class, infer class only from the published `Ze` position relative to `Z` and `min(S, 1.5Z)` and label that method explicitly.

#### 15.12.3 Target Section Families and Supported Results

Broaden the selector beyond UB / UC while keeping the page section-capacity focused:

| Family | Catalogue source | Section moment directions | Shear result | Current local status |
| --- | --- | --- | --- | --- |
| `UB` | InfraBuild Tables 9-12 | `x-x` and `y-y` principal axes | Web shear for `x-x` | Moment enabled for both axes; reviewed major-axis shear and interaction enabled |
| `UC` | InfraBuild Tables 9-12 | `x-x` and `y-y` principal axes | Web shear for `x-x` | Moment enabled for both axes; reviewed major-axis shear and interaction enabled |
| `PFC` | InfraBuild Tables 15 and 16 | `x-x`; `y-y Load A`; `y-y Load B` | Web shear for `x-x` beam action | All 10 catalogue rows enabled for moment; reviewed `x-x` shear and interaction enabled |
| `CHS` | Austube Tables 3.1-1 and 3.1-2 | Axis-independent | AS 4100 Cl. 5.11.4 CHS shear | 73 grade-specific rows enabled for moment and section shear |
| `RHS` | Austube Tables 3.1-3 and 3.1-4 | `x-x` and `y-y` | Direction-specific two-web shear | 101 grade-specific rows enabled for moment, shear and interaction |
| `SHS` | Austube Tables 3.1-5 and 3.1-6 | `x-x = y-y` for the symmetric section | Two-web shear | 114 grade-specific rows enabled for moment, shear and interaction |
| `EA` | InfraBuild Tables 19 and 20 | Manufacturer load directions `A`, `B`, `C`, `D` | `Not evaluated` | 13 checked catalogue designations enabled for direction-specific moment only |
| `Round Bar` | InfraBuild Table 3 plus Table 38 | Axis-independent | `Not evaluated` | 26 round-bar sizes enabled for moment only using generated solid-circle properties |
| Family-local `Custom dimensions` | Entered ideal geometry plus explicit material basis | Only the reviewed custom directions listed in 15.12.4.3 | Family-dependent | UB / UC, PFC x-x, CHS, RHS / SHS and Round Bar capacity paths are enabled; EA custom capacity remains unavailable |

Do not call an embedded Axial subset a complete catalogue. Each Beam family must use every checked designation in the adopted product table, or identify the selector visibly as a limited checked subset. PFC and EA require new Beam-specific property imports even though their Axial designations already exist.

Use the same visible family-selection pattern as Axial Member. Present `UB`, `UC`, `PFC`, `CHS`, `RHS`, `SHS`, `EA` and `Round Bar` as one horizontal segmented row on the desktop Beam page, with one clear active state. Give `EA` the accessible expansion `Equal Angle`; do not use the ambiguous `ROD` abbreviation. Do not make section family a normal dropdown. On narrow mobile viewports, the same controls may wrap into a compact two-column grid; this responsive change must not alter the selected family or calculation state.

Only principal-axis or manufacturer-defined load directions are in scope. Arbitrary non-principal bending belongs to AS 4100 Cl. 5.7 and is excluded from this lightweight page.

#### 15.12.4 Section Moment Capacity Calculation Contract

##### 15.12.4.1 Common Design Equation

For every supported family and direction:

1. Resolve the selected principal axis or catalogue load direction.
2. Resolve the design yield stress used for bending, `fy,m`.
3. Resolve the direction-specific elastic modulus `Z`, plastic modulus `S` and effective section modulus `Ze`.
4. Calculate nominal section moment capacity: `Ms = fy,m Ze`.
5. Calculate design section moment capacity: `phi Ms = 0.90 fy,m Ze` using AS 4100 Table 3.4.
6. Convert to `kN·m` only after the base calculation: `phi Ms [kN·m] = 0.90 fy,m [MPa] Ze [mm³] / 10⁶`.

Use direction-specific subscripts in the UI and calculation steps: `Msx`, `Msy`, `Zex`, `Zey`, or the catalogue load-direction equivalent. PFC Load A/B and EA Load A/B/C/D must remain visible beside `phi Ms`, `Ze`, the demand basis and the calculation steps; do not collapse different manufacturer cases into the same unqualified `x` or `y` result. Do not show a generic `Ze` when an unsymmetric section has different compression-edge values.

For hot-rolled UB / UC / PFC sections, use the reviewed flange / section design yield stress for the default `fy,m`. Keep the web design yield stress separate as the default `fy,w` for shear; PFC flange and web values can differ in the product table. For CHS, RHS, SHS and Round Bar, resolve the default grade- and thickness-dependent material value from the applicable product standard or checked product table.

The resolved strength is an editable project input because existing or legacy members may have a verified material record that differs from the current selected grade default. Keep catalogue dimensions and section identity locked. Show the catalogue default, current value and an explicit `Catalogue default` or `Project / legacy override` state, with one action to restore defaults.

When `fy,m` is overridden:

- automatically repeat plate-element slenderness, section class, `Ze`, `kf` coordination and `phi Ms` for UB / UC, PFC `x-x`, CHS, RHS, SHS and Round Bar;
- for slender RHS / SHS, use and identify the AS 4100 simplified slender-section `Ze` rule rather than silently retaining the product-table effective-cross-section value for another strength;
- fail closed for PFC `Load A / Load B` and EA `Load A / B / C / D` until a verified direction-specific effective-section calculation is available.

When `fy,w` alone is overridden, retain the valid catalogue moment path and update only web slenderness, shear capacity and moment-shear interaction. Reject blank, zero or negative strengths and do not report PASS / FAIL through an unavailable capacity path.

##### 15.12.4.2 Catalogue Section Path

For a catalogue section:

- use the published `Ze` for the selected grade and direction where the adopted product design table supplies it;
- keep published `Z`, `S`, compactness and `kf` as supporting properties rather than recalculating a rolled section with sharp-corner geometry;
- reconcile the selected product row with AS 4100:2020 before enabling capacity; show an unresolved status and fail closed if the reconciliation fails;
- treat `kf = Ae / Ag` as an AS 4100 Cl. 6.2 axial-compression property only; never multiply it into `Ms = fy,m Ze`;
- calculate `phi Ms` from the checked `fy,m` and `Ze` so the AS 4100 equation remains transparent;
- label the result `Catalogue Ze + AS 4100 capacity equation`;
- fail closed if `Ze`, `fy,m`, direction mapping or source status is missing.

For UB / UC / PFC, do not replace missing rolled root radii, tapered surfaces or product-table section moduli with the ideal custom geometry routine. For EA, use the published Load A / B / C / D diagram and its matching `Ze`; do not infer the governing compression edge from a generic `x` / `y` label.

##### 15.12.4.3 Family-Local Custom Dimensions

Keep `Custom dimensions` inside each selected family, matching the Axial Member override pattern. Do not add a separate Custom family or a standalone Custom Round Bar tab state.

For section geometry, the user enters dimensions only. Material identity is a separate required basis and must not be inferred from a previously selected catalogue section:

- UB / UC: `d`, `bf`, `tw`, `tf`;
- PFC: `d`, `bf`, `tw`, `tf`;
- CHS: `D`, `t`;
- RHS: `d`, `b`, `t`;
- SHS: `b = d`, `t`;
- EA: `b`, `t`;
- Round Bar: `d`.

Generate `Ag`, mass, centroid, `I`, `Z`, `S`, clear web depth, shear reference area, section class and `Ze` automatically where the family method supports them. Never ask the user to enter a calculated section property.

Use ideal sharp-corner geometry and state that rolled fillets, root radii and hollow-section corner radii are omitted. Once Custom dimensions is active, do not call the entered geometry a catalogue UB, UC or PFC product. Use `Ideal symmetric I-section`, `Ideal channel section`, `Ideal circular hollow section`, `Ideal rectangular hollow section`, `Ideal square hollow section` or `Solid circular section` as applicable.

Custom material rules are:

- hide the catalogue designation control and remove it from the active calculation state;
- require an explicit compatible product-form / material basis before capacity is evaluated;
- hot-rolled-section basis may be selected for ideal UB / UC / PFC geometry, with `fy,m` resolved from entered `tf` and `fy,w` independently resolved from entered `tw`;
- cold-formed hollow-section basis may be selected for CHS / RHS / SHS, with grade strength resolved from the entered wall thickness;
- round-bar basis may be selected for Round Bar, with strength resolved from the entered diameter;
- project / legacy material requires positive user-confirmed `fy,m` and, for UB / UC / PFC, positive `fy,w`;
- a missing or incompatible material basis leaves geometry visible but returns `Not evaluated` for capacity and utilisation;
- changing family or re-entering Custom dimensions resets the material basis to unresolved; no material selection may carry silently between incompatible families.

The current reviewed capacity boundary is:

- UB / UC: x-x and y-y moment; x-x web shear and reviewed moment-shear interaction;
- PFC: x-x moment, web shear and reviewed interaction; custom Load A / B remains `Not evaluated`;
- CHS: axis-independent moment and section shear;
- RHS / SHS: supported direction moment, two-web shear and reviewed interaction;
- Round Bar: axis-independent moment only;
- EA: Custom dimensions is disabled in the Beam tab; ideal angle geometry remains available in Section Properties until a reviewed Load A / B / C / D effective-modulus path is released.

Invalid or physically impossible dimensions must clear the result. Unsupported custom directions must not fall back to catalogue `Ze`, another direction, or `Ze = Z`.

##### 15.12.4.4 Holes and Net Section

The default catalogue and entered-geometry calculation is an unperforated gross-section check under AS 4100 Cl. 5.2.6. Holes, copes, penetrations and flange-area deductions are excluded. Do not add hole inputs to the first-screen workflow. If future net-section bending is added, it must be a separate advanced path with the Cl. 5.2.6 threshold and Cl. 9.1.10 deductions implemented explicitly.

#### 15.12.5 Shear and Moment-Shear Contract

Shear remains secondary to section moment and is family-dependent:

- UB / UC / PFC web shear: `Vw = 0.6 fy,w Aw`, using the checked web yield stress `fy,w` and gross web area `Aw = d tw` under AS 4100 Cl. 5.11.4. Apply the reviewed AS 4100 Cl. 5.11.2 to 5.11.5 web slenderness and unstiffened-web reduction.
- Current rolled open-section quick basis: use `dp = d1` with `tw` for web slenderness, and use the overall section depth `d` with `tw` for gross web area. Keep both substitutions visible; do not use `d1 tw` as `Aw`.
- CHS: use AS 4100 Cl. 5.11.4, `Vw = 0.36 fy Ae`; use gross area for `Ae` only under the clause hole / net-area condition. For the unperforated catalogue path, state `Ae = Ag`.
- RHS / SHS: use the reviewed Austube Section 5.2.2.4 direction-specific path. Take the two-web area as `Aw = 2t(d - 2t)` for x-axis bending or `Aw = 2t(b - 2t)` for y-axis bending, apply the AS 4100 web-slenderness reduction where required, and take the lesser of the uniform-shear and Cl. 5.11.3 non-uniform-shear capacities. For y-axis bending, interchange `b` and `d` in the maximum-to-average shear-stress ratio.
- EA and Round Bar: report no numeric shear capacity in the initial expanded tab.

Apply AS 4100 Cl. 5.12.3 moment-shear interaction only where the family and selected direction have both reviewed `Ms` and `Vv` paths and the clause applies. The reviewed reduced method applies to UB / UC / PFC major-axis web shear and to catalogue RHS / SHS through Austube Section 5.2.4. CHS, EA and Round Bar remain `Not evaluated` for interaction.

If a family has a valid moment result but no reviewed shear or interaction result:

- show the moment capacity normally;
- omit the peer shear card rather than presenting a zero capacity;
- show one short `Shear not evaluated for this section family / direction` note;
- do not calculate an overall PASS / FAIL or governing utilisation when entered actions require an unavailable combined check.

#### 15.12.6 Beam Catalogue Data Contract

Keep shared product identity separate from Beam-specific capacity data. `section-catalogue.js` may provide shared designation and geometry, but the Beam calculation requires a reviewed direction-specific record such as:

```text
section identity: family, designation, grade, sourceRef, checkedStatus
geometry: dimensions, mass, Ag
moment direction: axis, loadDirection, Z, S, Ze, compactness, fyMoment
shear direction: method, Aw or Ae, clearDepth, tw, fyShear
provenance: valueBasis, catalogueEdition, table, PDF page, checkedDate
```

Data rules:

- import complete adopted product-table ranges, not only the current Axial sample rows;
- keep each grade as a distinct reviewed capacity record where `fy`, `kf`, class or `Ze` changes;
- store the manufacturer load-direction key for PFC and EA rather than flattening unsymmetric values into one generic modulus;
- keep `fyMoment` and `fyShear` separate for hot-rolled sections;
- preserve published units in the source mapping and convert once at the calculation boundary;
- label values `Catalogue`, `Derived from catalogue data`, `Derived from entered geometry`, or `Unavailable`;
- a missing required field produces `Not evaluated`, never a fallback to another axis, grade or ideal section.

Product availability and calculation suitability are separate. A row may be retained as a checked historical design-property row while its current stock status is `Confirm with supplier`. The page must show the catalogue edition and must not claim branch stock availability.

#### 15.12.7 Input Logic and State Model

Use one family-selection row on the desktop Beam page. The section families are the primary segmented control; do not add a separate Custom family or source mode.

Catalogue inputs:

- `Catalogue section`;
- `Bending direction`, shown only where more than one valid direction exists.
- `Custom dimensions`, a family-local checkbox below the selected section;
- family dimensions only when the checkbox is active.

Keep one always-visible `Material properties` group immediately after Section selection. Do not hide the adopted strengths inside an override disclosure:

- place `Steel grade`, editable `fy,m` and editable `fu` together in this group;
- show editable `fy,w` between `fy,m` and `fu` for UB, UC and PFC because web shear may use a different thickness-dependent yield strength;
- for Custom dimensions, place the required family-compatible `Material basis` first in the same group and show Grade and strengths only after that basis is selected;
- changing section, grade or material basis resets the strengths to the applicable checked catalogue or shared material-standard defaults;
- editing a default strength marks the group `User override`; provide one reset control that restores all current defaults;
- require positive `fy,m`, positive applicable `fy,w`, positive `fu`, and `fu >= max(fy,m, fy,w)` before reporting capacity;
- `fu` is retained to confirm a coherent material record and must be identified as not used in the current section moment and shear equations; the calculation trace must still show its adopted value and basis.

Family-specific direction logic:

- UB / UC / RHS: `x-x` or `y-y`.
- PFC: `x-x`, `y-y - Load A`, `y-y - Load B`. Describe A/B as catalogue bending cases; the arrows define bending sign and compression side, not the force application point.
- CHS / SHS / Round Bar: hide the direction control when the supported capacity is axis-independent.
- EA: use `Load A`, `Load B`, `Load C`, `Load D` with the principal-axis guide; describe them as catalogue bending cases and do not reduce them to an ambiguous major / minor or unqualified x/y label.

State requirements:

- changing family repopulates only compatible sections, grades and directions;
- Custom dimensions stays inside the selected family and shows only that family's dimensions;
- Custom dimensions hides the catalogue designation and starts with material basis unresolved; a previous catalogue row is not a geometry, grade or strength source for the custom calculation;
- the material selector shows only family-compatible product forms, and the grade selector appears only after a material basis is chosen;
- PFC Custom dimensions exposes x-x only; catalogue Load A / B is not offered in the custom state;
- EA does not offer Custom dimensions in the Beam tab;
- derived properties are read-only outputs, not disabled-looking input fields;
- preserve the last valid choice separately for each family where practical;
- invalid dimensions or an unsupported custom direction clears capacity to `Not evaluated` without reusing a stale result;
- invalid or incomplete custom geometry hides the previous valid section figure so that stale geometry cannot remain beside unavailable results;
- design actions remain in a folded panel below the main capacities and must never overwrite section-selection state.

#### 15.12.8 Page Logic and Layout

Use this workflow order inside the existing shared tab structure:

```text
Tool heading
  Beam Section Capacity
  AS 4100:2020 Section 5 - section resistance only

Section selection
  UB | UC | PFC | CHS | RHS | SHS | EA | Round Bar
  Selected family: Section | Grade
  Custom dimensions [optional family-local override]
  Applicable family dimensions only | explicit material basis

Material strength
  Adopted source state | restore default
  Material overrides [collapsed]

Bending direction
  Conditional axis / load-direction control only when required

Selected section
  Designation + grade + active direction
  Capacity-basis summary + compact value-driven section guide
  Section details [collapsed]

RESULTS Section capacity
  Primary: design section moment capacity, phi Ms
  Secondary: design section shear capacity, phi Vv, only when evaluated

Design actions and utilisation [collapsed]
Calculation steps [collapsed]
Calculation basis and limitations [collapsed]
```

Desktop layout:

- use one top-level section-family row matching the compact Axial Member selection pattern; do not add a separate `Catalogue` or `Custom` source mode;
- selecting a family directly loads that family and shows Section plus Grade;
- place the `Custom dimensions` checkbox and conditional family fields inside the Section selection group, matching Axial Member;
- keep Section selection in one engineering row with the explanation in the left label column and the applicable two controls in the right content column;
- do not allow the two controls to fall below the left explanation column or leave an unused blank field row; collapse the whole group in engineering order only at the responsive breakpoint;
- place a short conditional direction row below selection rather than mixing direction with material values;
- use a two-part selected-section summary: compact properties on the left and the section guide on the right;
- use one full-width moment result when shear is unavailable; do not leave an empty second card.

Phone layout:

- stack selection, custom dimensions and direction in the same engineering order;
- keep the main `phi Ms` result above any shear result and before folded details;
- keep the section guide approximately 80 to 130 px high and hide secondary labels before reducing text size;
- prevent family names, formal symbols and units from wrapping one word per line.

#### 15.12.9 Selected Section Summary and Figure

The summary confirms the adopted capacity basis; it is not a section-property report or a second calculation-basis panel.

Keep the always-visible summary to the minimum needed to understand the reported capacities:

- all families: designation, grade, active direction, `fy,m`, `Ze` and section class where available;
- shear-evaluated paths: active shear area (`Aw` or `Ae`) and `fy,w` where it differs from the member strength basis;
- active dimension or material overrides: identify them in the selection/material state rather than repeating long source text in the summary.

Move supporting data to a collapsed `Section details` row directly below the summary:

- family dimensions, mass and `Ag`;
- direction-specific `I`, `Z` and `S`;
- `kf`, catalogue/derived coordination status and the full source basis;
- PFC catalogue centroid coordinate `xL` and shear-centre coordinate `xO`.

Do not show the capacity equation, web-screen ratio or interaction result in this strip. Those belong in calculation steps.

Use one deterministic value-driven SVG for the selected family. It must:

- show only the active family;
- show `x-x` / `y-y` axes or the manufacturer principal axes and load-direction arrows used by the calculation;
- place the PFC centroid from catalogue `xL` and identify the shear centre using catalogue `xO`; for custom geometry, show the ideal centroid and omit the uncalculated shear centre;
- use the EA 45-degree principal-axis convention: Load A / C about x and Load B / D about y;
- use the selected dimensions for proportions without copying catalogue artwork;
- avoid crossing labels and dimension lines;
- state `Drawn from selected catalogue data` or `Drawn from entered ideal dimensions`;
- remain a visual check, not a source of numeric properties.

#### 15.12.10 Results, Utilisation and Calculation Steps

Primary result hierarchy:

1. `Design section moment capacity, phi Ms` with selected axis / load direction.
2. `Design section shear capacity, phi Vv` only when evaluated.
3. One concise status line: `Calculated`, `Review required`, or `Not evaluated`.

Do not show PASS / FAIL until a compatible design action has been entered and every required interaction path is available.

The folded `Design actions and utilisation` panel contains:

- `M*` for the selected direction;
- `V*` only when a compatible shear result is available;
- `M* / phi Ms`;
- `V* / phi Vv` or `V* / phi Vvm` where applicable;
- one governing section ratio only when all required checks are evaluated;
- an explicit `Combined action not evaluated` state when the interaction method is unavailable.

The folded `Calculation steps` panel follows one consistent sequence:

1. Product geometry and source basis.
2. Selected principal axis or load direction.
3. Material basis: `fy,m` and, where applicable, `fy,w`.
4. `Z`, `S`, section slenderness, class and `Ze` basis.
5. Product-data edition and AS 4100:2020 compatibility status.
6. `Ms = fy,m Ze` and `phi Ms`.
7. Family-specific shear calculation where available; for the reviewed rolled-web path state `dp = d1` for slenderness, `Aw = d tw` for gross web area, web slenderness and `alpha_v` explicitly.
8. Moment-shear interaction and utilisation where actions are entered.

For every evaluated shear path, the trace must show the governing formula before substitution:

- rolled web: `lambda_v = (dp/tw)sqrt(fy,w/250)`, `alpha_v = min[1, (82/lambda_v)^2]`, then `phi Vv = phi alpha_v 0.6 fy,w Aw`;
- CHS: `phi Vv = phi 0.36 fy Ae`, with the `Ae = Ag` unperforated assumption stated;
- RHS / SHS: `Aw = 2t dp`, `Vu = alpha_v 0.6 fy Aw`, `rho = fvm*/fva*`, `Vv = min[Vu, 2Vu/(0.9 + rho)]`, then `phi Vv = 0.90 Vv`;
- compatible moment-shear interaction: state both branches of AS 4100 Cl. 5.12.3 before substituting `M*` and `V*`.

The substitution row must calculate `lambda_v` and `alpha_v` from the displayed dimensions and material strength, then show the nominal and design shear capacities separately. Do not skip from geometry directly to the final `phi Vv`.

Use formal visible notation with HTML subscripts and superscripts. Display section modulus in `10³ mm³`, second moment of area in `10⁶ mm⁴`, area in `mm²`, stress in `MPa`, moment in `kN·m` and shear in `kN`. Do not display programming notation such as `mm^3` in the page.

#### 15.12.11 Validation and Release Gates

Do not publish an expanded family until all applicable gates pass:

- every embedded catalogue row is checked against its source table for designation order, dimensions, mass, grade, `fy`, `Z`, `S`, `Ze`, class and `kf` where published;
- direction mapping is visually checked against the manufacturer diagram for PFC and EA;
- published catalogue `Ze`, compactness and form-factor values are reconciled with AS 4100:2020 before changing the tab from `For Review`;
- CHS catalogue examples match the AS 4100 CHS slenderness and shear equations;
- representative UB, UC, PFC, CHS, RHS / SHS, EA and Round Bar moment capacities match independent calculations;
- representative custom UB, UC, PFC x-x, CHS, RHS, SHS and Round Bar cases each match an independent ideal-geometry, material-resolution and AS 4100 capacity calculation;
- independent custom tests must exercise the production custom-section builder rather than only repeat helper formulas or inspect DOM text;
- Custom PFC offers x-x only, and Beam EA does not offer Custom dimensions; no hidden fallback may calculate catalogue Load A/B or Load A/B/C/D from entered geometry;
- missing-data and unsupported-direction tests return `Not evaluated` and never a zero or stale prior result;
- unit conversion tests cover `mm³` to `kN·m` and catalogue `10³ mm³` values;
- UI state tests confirm that Custom dimensions hides catalogue designation, starts material basis unresolved, shows only compatible material forms and active-family dimensions, and hides irrelevant direction and shear controls;
- desktop and phone checks confirm no overlapping axis labels, clipped values or horizontal overflow;
- `REFERENCE_TRACEABILITY.md` records the exact source table, PDF page, checked date and sample result before release.

#### 15.12.12 Implementation Sequence

Implement in auditable increments:

1. Correct the common `Ze` / material / direction calculation contract.
2. Refactor the selector to one section-family row with an Axial-style family-local dimensions override without changing current UB / UC catalogue results.
3. Complete UB / UC direction data and add full PFC Table 15 / 16 rows.
4. Add CHS from checked Austube design-property rows, including the AS 4100 CHS shear path.
5. Add RHS / SHS from the checked hollow-section tables.
6. Add EA moment by the published Load A / B / C / D directions.
7. Add Round Bar moment from complete round-bar sizes, diameter-dependent strength and generated `Z`, `S`, `Ze`.
8. Add family-local custom dimensions, enabling only reviewed direction-specific capacity paths.
9. Add or extend shear and interaction only after the corresponding family method is separately reviewed.

Current local implementation follows that order:

| Step | Local state | Release boundary |
| --- | --- | --- |
| 1-2 Common contract and selector | Complete, including editable catalogue-default `fy,m`, conditional `fy,w` project / legacy override and family-local Custom dimensions | Catalogue and custom states fail closed on missing capacity data; PFC Load A/B and EA Load A/B/C/D fail closed when no reviewed direction-specific `Ze` path exists |
| 3 UB / UC / PFC | Complete for the adopted InfraBuild rows; PFC selected-section data includes catalogue `xL` and `xO`; AS 4100:2020 row coordination passes | PFC `Load A` / `Load B` remains tied to the catalogue direction diagram |
| 4 CHS | Complete for adopted catalogue and entered ideal moment plus AS 4100 Cl. 5.11.4 shear | `Ae = Ag` is limited to unperforated sections |
| 5 RHS / SHS | Catalogue and entered ideal moment, direction-specific two-web shear and reviewed Cl. 5.12.3 interaction complete; catalogue rows also pass AS 4100:2020 coordination | Ideal geometry omits corner radii |
| 6 EA | Complete for the 13 checked designations, including Table 19 principal-axis `I`, `Z`, `S`, Table 20 Load A / B / C / D `Ze` and direction-specific AS 4100 interval coordination | Selector remains visibly a checked subset, not a complete product range |
| 7 Round Bar | Complete | Section moment only; no numeric shear |
| 8 Custom dimensions | UB / UC, PFC x-x, CHS, RHS / SHS and Round Bar reviewed paths are enabled from entered ideal geometry and an explicit compatible material basis | Catalogue designation is removed from active custom state; PFC Load A/B is hidden and EA Custom dimensions is unavailable |
| 9 Shear / interaction expansion | UB / UC / PFC `x-x`, CHS shear and RHS / SHS direction-specific shear are complete; Cl. 5.12.3 interaction is enabled for the reviewed flat-web paths | CHS has no flat-web interaction; EA and Round Bar shear / interaction remain excluded |

#### 15.12.13 Required Exclusions

- Member moment capacity `Mb`.
- Lateral-torsional buckling.
- Restraint spacing and restraint adequacy.
- Arbitrary non-principal-axis bending.
- Custom PFC Load A/B and EA Load A/B/C/D capacity.
- Biaxial bending and axial load interaction.
- Net-section bending, holes, copes and penetrations.
- Web bearing, web buckling under concentrated forces and stiffener design.
- Non-uniform web shear caused by unequal flanges, varying web thickness or holes unless separately implemented.
- Torsion and shear-centre effects.
- Composite action.
- Fire.
- Fatigue and brittle-fracture assessment.
- Deflection, vibration and other serviceability checks.

### 15.13 Weld Capacity Web Tab Rules

The weld tab is a lightweight throat-capacity lookup and drafting aid. It is not a full welded-joint design engine.

Use this scope:

- Ordinary equal-leg fillet weld throat capacity.
- IPBW capacity using a project-specified design throat and the fillet-weld method required by AS 4100 Cl. 9.6.2.7.
- CPBW and compound weld selections as reference-only terminology / detailing views with no capacity or PASS/FAIL output.
- Weld category `SP` / `GP`.
- Nominal weld metal tensile strength `f_uw`.
- Effective length `l_w`.
- Number of identical effective weld lines acting together.
- Optional direct design action for utilisation.
- Optional warning-only parent-metal per-mm screen.
- Optional AS 4100 welded lap reduction `k_r` when the user confirms that condition.

Required AS 4100 and reference basis:

- Fillet weld capacity must follow AS 4100 Cl. 9.6.3.10: `v_w = 0.6 f_uw t_t k_r`, reported as `phi R / l_w = phi 0.6 f_uw t_t k_r`.
- Use `t_t = 0.707s` for an ordinary equal-leg fillet weld.
- Require the entered fillet-weld effective length to satisfy `l_w >= 4s` in accordance with AS 4100 Cl. 9.6.3.5. Keep the quick calculator lightweight by failing closed below this limit rather than automatically applying the reduced design-size alternative.
- For IPBW, use the project-specified design throat and calculate capacity by the fillet-weld method in accordance with AS 4100 Cl. 9.6.2.7.
- For CPBW, do not calculate weld-metal throat capacity. AS 4100 Cl. 9.6.2.7 takes design capacity as the nominal capacity of the weaker joined part multiplied by the appropriate capacity factor; report `Not evaluated` until that joined-part limit state is defined.
- For compound welds, do not use `a_w + 0.707s`. AS 4100 Cl. 9.6.5.2 requires the design throat to be determined from the actual total weld cross-section; report `Not evaluated` when that geometry is not defined.
- Use AS 4100 Table 3.4 for weld capacity factors: `phi = 0.90` for SP CPBW, `phi = 0.80` for SP other fillet weld / IPBW, and `phi = 0.60` for GP welds in the current web scope.
- Do not silently use `phi = 0.80` for the AS 4100 Table 3.4 special case of longitudinal fillet welds in RHS where `t < 3 mm`; this case is out of scope unless a specific input and warning are added.
- Use AS 4100 Table 9.6.3.10(A) and ASI Simple Connections 2020 Table 2.14 for the displayed weld-metal strength options.
- Use AS 4100 Table 9.6.3.10(B) for `k_r`; the table length `l_w` is in metres. Convert the user-entered millimetre length before applying the table formula.
- For all non-welded-lap connection types, keep `k_r = 1.0`.
- Use ASI Simple Connections 2020 Tables 2.15 and 2.16 only for the warning-only parent-metal screen. Do not let the parent screen change PASS / FAIL unless a full connected-part check is added.

Display and limitation rules:

- For fillet weld and IPBW, the main quick result should remain `kN/mm per effective weld line`; total capacity is secondary.
- Use formal resistance terminology throughout the page. Prefer `Design capacity per unit effective length`, `Total design weld capacity`, `Indicative parent-metal screen`, `No design action`, and `Not evaluated`. Do not use conversational or software-internal wording such as `usual detail`, `warning only`, `fails closed`, or `capacity view only` in visible copy.
- Separate three claim levels explicitly: calculated weld-throat resistance, advisory screening information, and project-specific detailing or fabrication requirements. Application notes may identify a potential or typical configuration, but must not present a generic weld detail as a design selection.
- Use `Applicable`, `Not applicable`, `Required`, `Not evaluated`, and `Verify separately` for conditions and boundaries. Expand specialist abbreviations such as heat-affected zone on first visible use; retain standard weld abbreviations such as CPBW and IPBW only where the full weld type is also available in the selector or nearby text.
- State that effective weld lines are not welding passes.
- Accept only positive whole numbers of identical effective weld lines. Never round, clamp or infer a line count inside the calculation module.
- CPBW, IPBW and compound welds require project-confirmed joint preparation, WPS, inspection and acceptance criteria. IPBW additionally requires a specified design throat. CPBW and compound selections must not display a numeric capacity from the limited weld-metal inputs.
- Keep plug / slot welds, weld groups, longitudinal RHS fillet welds where `t < 3 mm`, parent-metal rupture, HAZ, block shear, net-section rupture, eccentric weld groups, intermittent weld rules, fatigue, seismic detailing, lamellar tearing, fabrication access and inspection acceptance outside the quick calculator unless they are deliberately added as separate sourced checks.
- Weld symbols are visual guides only and must continue to follow AS 1101.3 Fig. 2.1 and AS 1101.3 Figs. 2.8 to 2.10 conventions.

### 15.14 Concrete Pad Section Web Tab Rules

The concrete pad tab is a compact reinforced-concrete section-capacity view for rectangular pad strips. It is not a full footing, slab, or concrete design engine.

Use this scope:

- Rectangular strip section only.
- Pure flexural section analysis with `N* = 0`.
- User-selected compression face.
- Current N-class and legacy Y-bar reinforcement mats.
- Neutral-axis solution, stress-block force, reinforcement force states, `Muo`, `phi Muo`, and `k_uo` warning status.
- One-way shear capacity screen using AS 3600 Cl. 8.2.1.5, AS 3600 Cl. 8.2.1.9, AS 3600 Cl. 8.2.3.1, AS 3600 Cl. 8.2.4.1, AS 3600 Cl. 8.2.4.3 and AS 3600 Cl. 8.2.5.2. Evaluate it only for normal-weight, non-prestressed concrete without axial tension or torsion, with `f'c <= 65 MPa`, reinforcement `fsy <= 500 MPa` and maximum aggregate size at least 10 mm. Where detectable inputs are outside this scope, report `Not evaluated - outside simplified-method scope` and do not show a shear capacity. The remaining conditions are fixed project assumptions stated beside the result.
- Current N-bar calculation areas must use AS/NZS 4671:2019 Table 7.5(A) nominal values: N10/N12/N16/N20/N24/N28/N32/N36/N40 = 78.5/113/201/314/452/616/804/1020/1260 mm2 per bar. Supplier tables control ordering mass and availability only. Treat N40 as an on-request product where applicable. Retain legacy Y-bar designations only for old drawings, use the matching nominal diameter area, default to the documented conservative legacy-grade assumption, and require project verification of the actual bar grade and condition.
- Keep two-way reinforcement handling directional and lightweight. Calculate one strip direction at a time using only reinforcement parallel to the checked direction; provide `X` / `Y` as a scope label rather than combining orthogonal reinforcement in one section solution. Repeat the check for the other direction. Do not describe the lower directional capacity as governing unless compatible design actions are also compared.
- Auto depth may place the checked-direction bars either closest to the concrete face or immediately inside one orthogonal crossing-bar layer. For the inside option, assume the orthogonal bars are in contact and offset the checked bar centre by the crossing-bar diameter; retain manual `y_i` override for actual layer gaps, unusual stacking or drawing-derived depths. Default to the inside option as a conservative critical-depth screen, but show the selected basis in the checked-section summary and calculation steps.
- For one-way shear, derive `d` and `dv` from the checked-direction longitudinal tension reinforcement only. Do not use orthogonal distribution bars in `Ast`, `d` or `dv`. Punching shear remains excluded; a future punching check must use the AS 3600 Section 9.3 `dom` basis rather than reusing the minimum directional `d` or `dv`.
- Use `N20` for the default flexural mats and orthogonal crossing bar, `c_nom = 75 mm`, and `No shear reinforcement` for the initial quick-screen state. When no shear reinforcement is selected, keep fitment bar, leg count, spacing and `fsy.f` hidden and inactive; reveal them only for the vertical-fitment branch.
- Determine the concrete section automatically from the entered pad depths; do not ask the user to choose `Separate` or `Combined`. Where only `D_top` is positive, calculate the top pad with Mats 1 and 2. Where only `D_bot` is positive, calculate the bottom pad with Mats 3 and 4. Where both depths are positive, calculate one composite pad-on-pad strip with `D = D_top + D_bot` and all active mats. Where both depths are zero, do not calculate. For a composite pad-on-pad strip, state visibly that interface shear transfer, anchorage and composite action require separate verification.
- Use one adopted `f'c` for the full checked strip. Where pad-on-pad pours have different concrete strengths, use an appropriately conservative adopted strength in this lightweight model or perform a separate piecewise concrete-section analysis.
- Keep concrete pad inputs lightweight and in dependency order: analysis basis; geometry; material; longitudinal reinforcement mats; optional shear reinforcement; checked-section summary; main capacities. Put `Compression face`, checked reinforcement direction, bar-stacking basis and orthogonal bar size in the first row. Keep per-mat `E_s` fixed at 200,000 MPa and out of the main table; retain `f_sy` only as the compact material override needed for legacy bars. Place the checked-section summary after every input. Do not place derived process values such as stress-block factors, calculated `phi`, `kv`, `theta_v`, `bv` or `dv` in editable-looking inputs on the main page; show them in the calculation steps and final result notes instead. Reinforcement table inputs must use the shared form-control height, typography, rounded border and focus style even though the table is compact. On phone browsers, reinforcement-table numeric cells should use text inputs with numeric keyboard hints rather than native number controls, so they do not expose square number-input chrome or hard black inner outlines.
- When a pad depth is zero, disable that pad's two reinforcement rows, clear their displayed `y_i` to `N/A`, and exclude them from the section solution. If both bottom-pad mats are inactive while `D_bot = 0`, replace their rows with one concise not-applicable note; otherwise keep unavailable rows visible and visually muted. Preserve the previous active/material/manual-depth state and restore it if the pad depth becomes positive again. A defined pad may remain plain concrete by leaving its mats inactive; an RC capacity is still calculated when another active mat participates in the composite section.

Required exclusions:

- Punching shear.
- Soil bearing.
- Base-plate, column, or pedestal bearing.
- Development length and anchorage.
- Minimum flexural reinforcement.
- Bar spacing and cover compliance beyond warning-level screens.
- Crack control, service stress, and deflection.
- Load combinations and design actions.
- Interface shear design for pad-on-pad strengthening.
- Plain-concrete footing capacity.

Concrete tab warnings must stay visible and concise. Use `Calculated` or `Review required` as calculation status, never `OK`, because the page does not compare design actions. The main warning should be a short section-capacity boundary plus brief review flags; keep detailed exclusions and derivations in folded panels. If no reinforcement mat is active, do not report a ductile reinforced-concrete `phi Muo` or reinforced-concrete `phi Vuc`; direct the user to a separate AS 3600 Section 20 plain-concrete footing check where applicable.

Concrete `phi` must cite AS 3600 Table 2.2.2 when using the pure-bending `k_uo` expression for N-class reinforcement. If legacy Y bars are selected, describe `phi = 0.65` as a conservative quick-screen review value pending actual bar-grade and ductility verification, not as a universal Y-bar code rule.

Concrete shear `kv` should be auto-calculated from AS 3600 Cl. 8.2.4.3 simplified non-prestressed rules because the quick page does not collect the design actions needed for the AS 3600 Cl. 8.2.4.2 general strain method. Use `theta_v = 36 deg`; use `kv = min(200/(1000 + 1.3dv), 0.15)` where minimum transverse shear reinforcement is not verified, and `kv = 0.15` where the provided vertical fitments satisfy `Asv.min/s = 0.08 sqrt(f'c) bv / fsy.f`. Shear reinforcement area must be calculated from the Australian bar table, `Asv = nsv Abar`, with user inputs for fitment bar size, number of legs and spacing; do not require the user to manually type `Asv` except in a deliberate future override mode. If `Asv/s` is below the minimum, show a warning and do not switch to the minimum-reinforcement `kv` or `phi = 0.75` basis. Under AS 3600 Table 2.2.2, use `phi = 0.75` only where compliant Class N fitments are verified and strength is not limited by web crushing; otherwise use `phi = 0.70`. Always show the formula steps so changes to fitment bar size, `nsv`, `s`, `fsy.f`, `bv`, `dv` and `kv` are visible.

The optional vertical-fitment input row should be titled `Shear reinforcement`, not a generic relevant-factors row, because it controls `Asv`, `Vus`, `kv` branch selection and shear capacity rather than a broad assumption factor.

The section-analysis schematic should stay small, collapsed by default and below the main capacity results. It is a visual guide only and must not interrupt the input-to-result workflow.

Concrete section-analysis figure rules:

- Treat the figure as a Level 2 calculation schematic. Keep the cross-section, linear strain distribution and equivalent rectangular stress block as three restrained panels with one consistent annotation size.
- Measure neutral-axis depth `x` from the selected compression face. Define the equivalent stress-block depth as `a = gamma x`, stress intensity as `alpha_2 f'_c`, and locate `C_c` at `a/2 = gamma x/2` from the compression face. Never place a `gamma x/2` label between the stress-block base and the neutral axis, because that implies the wrong reference distance.
- Where a representative single tension layer is shown, write `T = A_s f_s`; use `f_sy` only when yielding is explicitly assumed. State in the caption that the calculator uses every active reinforcement mat.
- Keep long equilibrium and capacity equations out of the image. Show only the symbols needed to identify geometry, strain and resultant location; leave full formulas in `Calculation steps`.
- Keep the figure default-collapsed. On desktop, keep the expanded schematic compact at approximately `190 px` high and centred; on mobile, use the dedicated vertical asset at its natural responsive width. Use semibold notation at a source size that remains clear after responsive scaling, and preserve the source aspect ratio without crowding.
- Keep `(a)`, `(b)` and `(c)` on one common caption baseline in the horizontal asset and at one consistent offset below each panel in the mobile asset. Dimension symbols such as `b` must have clear space from both the dimension arrow and the subfigure caption.

Concrete page copy and spacing rules:

- Use one short helper sentence per input group. Do not repeat the same section type, direction, `b`, `D`, compression face or source statement in adjacent headings, summaries and result scopes.
- The checked-section title should contain only section type, checked direction and compression face. Show `b`, `D`, depth basis and calculation status once in the summary metrics.
- Keep the symbol key collapsed by default. Keep the visible reinforcement-source note to one line and move full manufacturer values and limitations to the folded basis panel.
- Keep main result notes to one short standard/source statement plus the governing section-capacity limitation. Detailed derivations and solver evidence belong only in folded panels.

### 15.15 Screw Piles Selector Web Tab Rules

The Screw Piles Selector is a product-selection aid with an optional pile-group action-distribution model. It is not an AS 2159 pile design engine.

Use this primary workflow:

1. Select a supplier and one published product, series or engineered system.
2. Show the selected item's identity, essential published values, geometry, source status and principal limitation.
3. Keep the `Preliminary Pile-Group Action Distribution` collapsed and secondary to product selection.

Use `Not published` rather than zero or an inferred value. The selected-product summary must prioritise:

- direction-specific compression, tension and lateral values, where published;
- non-directional system SWL, maximum load, supplier rating or typical benchmark in one separate `Published reference load` row, never in a compression/tension/lateral field;
- shaft diameter and wall thickness;
- helix or bearing-element count, diameter and thickness;
- length, extension or splice basis;
- model or series code, system type and data level; show supply basis only when the source gives specific availability or procurement information;
- founding criterion, installation criterion, maximum allowable installation torque, pile-head connection and durability information where directly published;
- per-pile, complete-system or benchmark basis, together with the source load terminology (`SWL`, indicative rating or basis not stated);
- direct source link and data status: `Published directional values`, `Compression SWL up to`, `System SWL up to`, `Published ultimate table`, `Supplier rating up to`, `Indicative system rating`, `Typical SWL benchmark`, `Geometry only` or `Project input`;
- concise visible source labels such as `Published guide + scope certificate`, `Manufacturer published`, `Supplier range`, `Manufacturer dimensions`, `Published benchmark` or `Project input`; detailed local-pack status remains in traceability documentation rather than the main selector.

Classify each entry as a published product, stocked series, design-table row, published system row, engineered supplier range, geometry row, component family, technique benchmark, alternative foundation system or project-defined product. Do not imply that a series or supplier range is one certified product.

Hide optional specification rows when the selected source does not publish a product-specific value. Consolidate missing data and the governing product limitation into one `Required before adoption` row. Prioritise direction-specific compression, tension and lateral resistance, founding criterion, installation torque/acceptance, pile-head connection and durability basis without repeating the source or result cards.

Use a separate basis note for each published direction. A lateral limit must state its own load-height, fixity, movement or testing condition where the source provides one; it must not inherit an axial maximum-load or SWL note.

Do not infer uplift or lateral resistance from a compression series class. Manufacturer dimensions, system ratings and typical benchmarks must not be presented as project design strengths.

Do not relabel a published ultimate maximum load as `SWL` or compression resistance. Do not assign a load direction or safety basis to an `up to` supplier rating when the source does not state one.

Do not combine an older public product-table row with a newer certificate scope into one apparently current verified row. Show the product-table revision and certificate revision separately. If the current certificate cites a newer non-local catalogue or technical statement, label current row verification as pending until that cited source is available and checked.

The optional Preliminary Pile-Group Action Distribution may use a perimeter-row or full-grid rectangular layout. It is a derived rigid-pad equilibrium model, not a clause-prescribed AS 2159 resistance calculation. For the generated symmetric layouts, `sum(x_i) = sum(y_i) = sum(x_i y_i) = 0`, and:

- `N_i* = N*/n + M_x* y_i / sum(y_j^2) + M_y* x_i / sum(x_j^2)`;
- `V_x,i* = V_x*/n - T_z* y_i / sum(r_j^2)`;
- `V_y,i* = V_y*/n + T_z* x_i / sum(r_j^2)`;
- `V_i* = sqrt[(V_x,i*)^2 + (V_y,i*)^2]`.

State these assumptions with the result:

- rigid pad and symmetric rectangular layout;
- vertical identical piles;
- equal axial stiffness in compression and tension;
- equal lateral stiffness;
- actions applied at the pile-group centroid on one consistent ULS or SLS basis;
- action basis identified as ULS design action effects, SLS design action effects or unfactored/service reference actions;
- positive `M_x*` increases compression at `+y`, positive `M_y*` increases compression at `+x`, and positive `T_z*` acts counter-clockwise in the x-y plane;
- project eccentricities included in the supplied actions;
- no pad-soil bearing or lateral-resistance contribution.

Report maximum compression action, tension action and resultant horizontal action with the relevant pile number. Apply these comparison rules:

- manufacturer values, including direction-specific product values and published `up to` values, must not be compared automatically in the Quick Check;
- without entered project values, report pile action effects only and do not report a utilisation ratio;
- project values may produce a project-value comparison only when a source reference is entered and the project value basis matches the action basis;
- place optional `R_c,proj`, `R_t,proj` and `R_h,proj` inputs inside the Optional Check, not in the selected-product summary;
- indicative system ratings and typical technique benchmarks must not be used in the ratio;
- where a demanded direction has no qualifying value, report the missing direction rather than a complete ratio.

The page does not calculate AS 2159 design geotechnical or structural strength. A project-value comparison relies entirely on the entered project source and basis, and does not assess combined axial-horizontal interaction.

Use the `PRODUCT DATA` tag above the selected product name. `Selected product` describes the adopted item in helper text or accessible labels; it is not a calculation result-state tag.

Required AS 2159 boundaries:

- Cl. 3.2.2: action effects, structural strength and geotechnical strength remain distinct checks;
- Cl. 4.4.3.1: pile-group interaction and group/block geotechnical resistance remain project checks;
- Cl. 4.5: settlement, lateral deflection and rotation remain project serviceability checks;
- Cl. 5.2.2: pile bending, positional tolerance and pile-cap force transfer remain project structural checks;
- Cl. 7.3.5.3: installation torque, shaft overstress, calibrated monitoring and installation acceptance remain project controls.

Durability remains a selected-product limitation; this selector does not perform the AS 2159 exposure classification or corrosion design. If a future exposure input is added, use `Non-aggressive`, `Mild`, `Moderate`, `Severe` and `Very severe`, plus `Not assessed`, rather than informal labels. Also exclude pile-head and splice design, cyclic/dynamic response, liquefaction, pile-position tolerance analysis, installation refusal and load-test acceptance. Ground/application filters may change the selection guidance, but must not alter published product values.

Validation must include supplier/product selection states; equilibrium checks for axial force, biaxial moment, direct horizontal action and torsion; perimeter and full-grid pile counts; compression/tension sign convention; manufacturer-value exclusion; missing project direction values; project source missing; project/action basis mismatch; and a valid same-basis project comparison.

### 15.16 Rock Anchor Selector Web Tab Rules

The Rock Anchor Selector is a product-selection aid for active post-tensioned foundation anchor products and systems. It is not a rock-anchor design calculator and must not report anchor resistance, project demand, utilisation or pass/fail status unless a future project-specific verified check is deliberately added.

Use this primary workflow:

1. Select a supplier.
2. Select one published product row, system family or provider pathway from the grouped product list.
3. Show the selected product's published tendon values, source status, Australian supply/adoption status and principal adoption constraint.

Keep this as a two-level selector. Within the product list, use only the broad groups `Published products`, `System families`, `Australian pathways` and `Project schedule` where applicable. Do not subdivide again by bar/strand type, add a third classification selector or add a product-results table. Product-option labels should be short because the supplier is already selected; retain the full product name in the selected-product heading.

The main selected-product card must prioritise:

- supplier and product/system name;
- anchor form: prestressed bar, multi-strand anchor, mechanical rock anchor, provider pathway or project-defined system;
- tendon description, including diameter, strand count, bar grade or area where published;
- published yield/proof load and ultimate load where a row-level source provides them;
- the exact manufacturer load terminology, including characteristic proof and maximum force notation where applicable;
- system configuration and standard/product approval;
- published geometry or product code where captured from the specific source;
- protection and typical hardware only as product/system information, not as project detailing approval;
- source/data basis, including document name, page or product-family basis where available;
- source status: archived global row, current external row, US row, global family, Australian provider pathway or project-defined system;
- visible supply/adoption status, especially where Australian supply, grade, ETA acceptance or provider confirmation is still required;
- a concise Australian pathway statement that distinguishes an identifiable local provider from confirmed product availability, acceptance or certification;
- a direct Australian reference or contact link only where an official route has been verified;
- a concise `Before adoption` constraint.

Use `Not published` rather than zero or an inferred value. Manufacturer tendon values are not anchor design resistance. Do not convert tendon yield or ultimate load into allowable resistance, working load, ULS capacity or utilisation without a verified project design basis.

Where two rows in the same governing manufacturer source publish conflicting values for one product property, fail closed for that property. Show `Source conflict`, state both published values in the supporting note and require manufacturer confirmation; do not silently select either value. Other non-conflicting properties for that product may remain visible.

Use the `PRODUCT DATA` tag above the selected product name. `Selected product` describes the adopted item in helper text or accessible labels; it is not a calculation result-state tag.

Keep the selector scope narrow:

- It may show product rows, family-level systems and Australian provider pathways.
- It may include `Custom / project schedule` for a certified project product not listed in the selector.
- It must not infer bond length, free length, fixed length, drill-hole diameter, grout strength, rock cone failure, concrete breakout, tendon relaxation, lock-off load or acceptance load.
- It must not compare products automatically unless the compared field is a like-for-like published tendon property and the comparison is labelled as product data only.

Required visible limitations:

- Published loads are manufacturer tendon reference values, not anchor resistance.
- Confirm current product revision, Australian supply, anchor assembly, corrosion protection, project resistance and testing requirements before adoption.
- Load distribution, anchor design resistance, rock-mass failure, concrete anchorage, durability design, stressing sequence, proof testing and acceptance remain project checks.

Implementation rule:

- The tab is part of the shared `index.html` tool-panel system, belongs to `Foundations`, and uses the full visible navigation label `Rock Anchor Selector`.
- The current data/update logic may live in the scoped module `rock-anchor-selector/app.js`; do not treat this as a separate standalone page when editing the main handbook.
- Keep the product-card layout consistent with other tabs: input row, selected summary, compact published values, specification grid and folded limitations/source panel.
- Use `Product basis and limitations`, not `Calculation basis and limitations`, for lookup-only tabs that contain no calculation.
- Link a selected product or system to the most specific official product page available. Use a supplier-family page only when no product/system page is available.
- Keep all visible text English-only and concise.

Validation must include supplier/product selection, broad grouped product options, concise selector labels, default row rendering, project-defined/custom row rendering, exact manufacturer load labels, configuration/standard/geometry/Australian-pathway fields, verified Australian-link routing, `Not published` and `Source conflict` load display, source/status pill updates, source link updates and confirmation that no utilisation or design resistance is reported from manufacturer tendon values. Apply the Section 9 executable source-reproduction requirement to every checked numeric product row.

### 15.17 Reinforcement Development & Lap Lengths Web Tab Rules

The Reinforcement Development & Lap Lengths page is a lightweight task-and-length aid for N10 to N40 500N reinforcing bars in tension. State the tension scope once at page level; do not repeat `tension` in every task and result label. The two design checks are `Lap splice` and `Development at termination`. The page calculates AS 3600 lap and cast-in development/anchorage references. For PIR it returns an expressly labelled AS 3600 reference depth and hands the user off to the separate manufacturer or qualified project design. Do not show a qualified-report form, product selector, site-fit comparison, extension load-path summary or TN08 report floor on this page. The page does not calculate AS 5216 or proprietary adhesive capacity, nor does it design the concrete interface, pad, pedestal or foundation. AS 4100 bolt, weld and structural-steel provisions must not be mixed into this tab.

The module issue status is `For Review` until every release gate below is complete. A calculated lap length or development reference must not be presented as complete design compliance. Product-specific PIR design and acceptance remain outside the handbook.

The 2026-07-24 terminology and flow revision places the page under the level 1 `Foundations` category and level 2 `Reinforcement` tab, then separates design check, bar installation and anchorage method within the page. It changes route, evidence and display gates only; it does not change the verified AS 3600 lap/development equations or their clause sequence.

The visible page order is mandatory:

1. identity and concise scope;
2. check definition: design check, bar size and, for development only, bar installation;
3. applicable AS 3600 inputs, including stress basis where relevant;
4. path-specific primary results;
5. optional engineering adjustments;
6. secondary lookup; and
7. calculation details and references / limitations.

On desktop, applicable inputs and primary results may share a two-column work area, but the DOM must preserve that engineering order. On phone, use the same order as a single-column stack. Keep optional comparisons, schedules, product data and formula trails collapsed where practical.

Use `Design check` as the primary classification: `Lap splice` or `Development at termination`. Where a development check is active, show `Bar installation` as the secondary route: `Cast-in reinforcement` or `Post-installed reinforcement (PIR)`. Show `Bar size` for every length-producing check. Do not show a project-scenario selector: general members, foundation extensions and tower/monopole pedestal modifications do not change the AS 3600 expression and remain project context rather than a calculation branch. For cast-in development at termination, separately select the `Anchorage method`: `Straight development`, `Standard hook`, or `Standard cog`; a hook or cog is an anchorage method and never a lap reduction. For PIR, the selected full-yield or qualified project steel-stress basis calculates an `AS 3600 reference depth`, not a preliminary recommendation or installation depth. Product selection and the current qualified project report remain external to this quick-reference page.

Apply this path contract:

| Design check | Bar installation / anchorage method | Required result label |
| --- | --- | --- |
| Lap splice | Not applicable | `LAP` |
| Development at termination | Cast-in / straight | `DEVELOPMENT REFERENCE` |
| Development at termination | Cast-in / standard hook/cog | `HOOK / COG ANCHORAGE REFERENCE` |
| Development at termination | PIR | `AS 3600 REFERENCE` |

Do not show a three-line extension summary, interface-design record or global design status. A concise note may state that interface transfer and foundation design remain separate project checks.

The selected case must control eligibility, visible inputs, active calculations, result blocks, formula trail and warnings. Do not merely hide fields while retaining an unrelated result. Clear every path-dependent output when an input becomes invalid or the selected case changes. Reset dependent engineering confirmations, including `k7`, effective transverse-reinforcement location, final-length transverse-reinforcement count and pressure basis, whenever their case, bar, method, material, candidate length or geometry basis changes. Apply the same invalidation rule independently to lap and development paths; returning to Refined must never reuse a confirmation made for an earlier candidate length or hidden mode. The only permitted invalid-state retention is an independently calculated, explicitly labelled `BASIC REFERENCE - REFINED INPUT REQUIRED` while a Refined-only input is incomplete; never present that fallback as the selected Refined result. A lap-specific restriction, including the tension-tie restriction, must not block an otherwise valid development-reference-only path.

Keep the new-work lap basis and existing-concrete basis independent. Each needs its own concrete strength, AS 3600 casting-position basis, bar-coating / concrete-density condition, cover, clear spacing, member geometry and Refined data. Do not require a project-document checkbox. Place one concise note beneath the lap result: `Use only where the project drawings or specification permit the splice · AS 3600 Cl. 13.2.1(a).` The note does not change the calculation state. Do not describe adhesive mortar as an epoxy-coated bar. For PIR, identify the casting-position input as an AS 3600 cast-in reference assumption, not a product-design parameter. Do not silently copy new-concrete properties to existing concrete.

Basic is the default. Label it as recommended and label Refined as requiring verified confinement. Keep Refined inputs collapsed until deliberately selected. A verified custom transverse-reinforcement arrangement requires a non-negative whole-number `nf`, a positive whole-number `nbs`, non-negative qualifying transverse-reinforcement area and the applicable minimum-area basis. `Sigma Atr = 0` is valid and gives `lambda = 0`, therefore no `k4` reduction; it must not invalidate the Basic lap or development reference. Require confirmation of the effective transverse-reinforcement location only where `Sigma Atr > Sigma Atr,min` could produce confinement credit. Define `nf` as the number of fitment bars within one longitudinal spacing or pitch that the governing potential splitting crack crosses; `nf = 0` is a valid AS 3600 arrangement and must not be rejected. It is not the total fitment-leg count. Define `nbs` as the number of longitudinal bars being developed or spliced at which that crack can develop, and include only qualifying area within the displayed candidate Refined length in `Sigma Atr`. Select `No verified confinement credit` to use `K = 0` without custom confinement inputs. Do not provide default confinement credit or an unexplained arrangement shortcut. Show derived factors as outputs, not disabled editable-looking controls. Use a two-stage result: calculate and display the `Candidate refined length` without adopting the reduction, then require confirmation that the transverse-reinforcement count and any pressure evidence apply throughout that candidate length. Only then may the candidate become the `Adopted length`. A narrow-member Refined case must use the beam/column `Sigma Atr,min = 0.25As` basis. Apply the Cl. 13.1.2.3 limits to `k4`, `k5` and `k3 k4 k5`. Pressure is an independent optional credit and must use the AS 3600 symbol `rho_p`: keep its source and confirmation hidden while `rho_p = 0`; when `rho_p > 0`, prefill `Pressure source / reference` with `Structural analysis · governing ULS load combination`, allow replacement with the project reference, and apply `k5 < 1.0` only after explicit applicability confirmation for the candidate length and governing splitting plane. The prefilled source is not confirmation. Clear confirmations whenever an input changes the candidate length or evidence. Identify every missing Refined value at the field and expose its invalid state programmatically while retaining the separately labelled Basic adopted reference. `k7` eligibility remains independent of Refined-input completeness. Use one full-width Refined layout: a three-column desktop input grid, a full-width calculated-factor strip, and only applicable confirmations; do not retain unequal columns or empty review-panel space.

For AS 3600 Cl. 13.1.2.2, calculate `Lsy.tb,formula = 0.5 k1 k3 fsy db / (k2 sqrt(f'c))`, with `k1`, `k2`, `k3`, the concrete-strength cap, applicable lower limit and selected epoxy-coated-bar / lightweight-concrete multipliers in the correct clause sequence. For lap geometry use `cd = min(a/2, c)`. For straight development use `cd = min(a/2, c)` in wide members and `cd = min(a/2, c1, c)` in narrow members. For standard hooked or cogged bars use the separate Figure 13.1.2.2 geometry: `cd = a/2` in wide members and `cd = min(a/2, c1)` in narrow members. Do not calculate a straight-bar development result and then apply the hook/cog factor to that mismatched geometry.

The standalone full-yield development reference must be calculated independently from the lap branch. Apply the Cl. 13.1.2.2 lower limit at the basic-development stage, then the selected material multiplier, then valid Cl. 13.1.2.3 Refined factors. When `Lsy.t` is used in the Cl. 13.2.2 lap calculation, do not first force it to the Cl. 13.1.2.2 lower limit; the lap equation applies its separate lower-limit candidate.

For Cl. 13.2.2, use `Llap = max(k7 Lsy.t, 0.058 fsy k1 db)` for wide elements. For narrow elements also compare `Lsy.t + 1.5sb`; where `sb <= 3db`, the supported branch may take `sb = 0` in that candidate and must state that treatment. Do not use a separate editable `k7 basis` selector. Derive `k7 = 1.00` only when the user confirms both `As,provided >= 2As,required` from the member design and no more than 50% spliced at the section; otherwise use `k7 = 1.25`. Keep the `Lap reduction` panel to those two conditions and show the potential/adopted reduction once in its summary. Do not include a physical-stagger control or lap drawing. Keep the partial-utilisation and cog/hook boundaries in `References & limitations`, not in the `k7` panel. Do not scale the lap continuously by bar utilisation or `sigma_st/fsy`: Cl. 13.2.2 explicitly calls up `Lsy.t` from Cl. 13.1.2.1, while Cl. 13.1.2.4 is a separate less-than-yield development-length provision.

A standard cog or hook is an independent cast-in anchorage method at bar termination, not an additional AS 3600 Cl. 13.2.2 lap reduction. The InfraBuild *Reinforcing Product Guide*, pp. 36-37, states that a standard cog/hook provides half the tensile development length for that end of the bar, measured from its outside, under AS 3600 Cl. 13.1.2.6 to AS 3600 Cl. 13.1.2.7. Before requesting one concise detailing confirmation, calculate and display the qualification requirements: straight extension `max(4db, 70 mm)`; bend diameter to AS 3600 Cl. 17.2.3.3; for a cog, 90-degree geometry, bend diameter not exceeding `8db`, and the same total bar length as a 180-degree hook; and, where `sigma_st > 400 MPa`, a transverse bar at least equal to the anchored-bar diameter placed in contact and extending at least `4db` each side. Show the supporting half-development reference only after these requirements are confirmed; otherwise use `HOOK / COG DETAILING REQUIRED`. Do not subtract the value from `Llap`, multiply a straight lap by 0.5, or treat the cog/hook as a `k7` qualification.

For Cl. 13.1.2.4, require only a positive `sigma_st <= fsy` before showing the stress-based reference. The page does not collect a stress-source classification, calculation/drawing reference or separate applicability confirmation. For straight development, instruct the user to enter the design tensile stress in the bar at the assessed section; for a standard hook or cog, use the maximum design tensile stress in the bar being anchored. Require verification against the project calculation before issue. Calculate `Lst = Lsy.t sigma_st/fsy` and conservatively retain the `12db` minimum for every supported case, while stating that any clause-specific slab alternative is not implemented. Missing or zero `sigma_st` makes the selected stress-based reference unavailable; retain the separately labelled full-yield reference as context only. If `sigma_st > fsy`, stop the reduction and require project-action/bar-stress review. Where actual-stress and Refined reductions are combined, display the reduced-length candidate first and require separate confirmation that the Refined confinement and pressure evidence remains valid throughout that candidate `Lst` length before adoption. Do not derive stress from a fixed `phi` or use a universal `phi = 0.8`.

Place primary results immediately after applicable inputs. Keep lap and development at termination as independent blocks. The lap block shows `Adopted lap length` and its governing basis. The PIR block gives primary emphasis to `AS 3600 reference depth` and states `Not an installation depth - product design required`. Use `FULL-YIELD REFERENCE`, `STRESS-BASED REFERENCE` or `INPUT REQUIRED`. Do not show available embedment, a product selector, a report form or a site-fit comparison. For a cast-in starter, show the selected straight-development or hook/cog reference as the primary result.

Do not include a lap drawing or application schematic. Define `db`, `c`, `a`, `sb` and `cd` through professional field labels, calculated outputs and the folded formula trail.

Do not include a provided-lap comparison. The module returns the required lap length and its qualified reduction assessment. A cast-in development path returns the applicable straight or standard hook/cog reference. A PIR path stops at the expressly labelled AS 3600 reference depth and external-design warning. Product selection, AS 5216 checks, manufacturer-software calculations, report review, available-depth verification and site-fit acceptance remain separate project workflows.

Keep the Reo layout compact and check-ordered. Group headings sit above their controls so route selectors and four-field engineering rows use the full card width. Do not add extension summary cards. Place the primary reference immediately after applicable inputs; secondary schedules, formula trails and source material remain collapsed.

Keep the same-condition N10 to N40 schedule, formula trail, Reo data and product manuals secondary and collapsed. The schedule is available only for the Basic method with default `k7 = 1.25`; do not propagate Refined confinement data or a qualified `k7 = 1.00` across bar sizes. N10 to N40 are the only calculator selections. N50 may appear only in the reference table as an April 2022 Product Guide on-request item that is omitted from the current product page and remains outside the calculator scope. Use AS/NZS 4671:2019 nominal diameter and area for calculation and keep supplier mass, metres per tonne and availability as product references only. Describe the local InfraBuild guide as fourth edition with information current April 2022. Historical OneSteel AS 3600:2009 lap tables remain research context only.

Use this source hierarchy: AS 3600:2018 incorporating Amendments 1 and 2 for cast-in development, hook/cog anchorage and lap; AS/NZS 4671:2019 for nominal reinforcement data; and manufacturer/supplier manuals as supporting product and detailing references only. Product-specific PIR design must use the project-nominated AS 5216 edition, current product assessment and manufacturer software or qualified report outside this page. No proprietary product-capacity equation is implemented or labelled checked. Record source locations as AS 3600 Cl. 13.1.2.2 on PDF page 188; AS 3600 Fig. 13.1.2.2 on PDF page 189; AS 3600 Cl. 13.1.2.3 on PDF pages 190 to 192; AS 3600 Cl. 13.1.2.4 on PDF page 192; AS 3600 Cl. 13.2.1 on PDF pages 195 to 196; and AS 3600 Cl. 13.2.2 plus AS 3600 Fig. 13.2.2 on PDF page 196.

Keep these exclusions explicit: bars larger than 40 mm; tension-tie lap splices; compression laps; mesh and bundled bars; galvanized reinforcement bend geometry; complete hook/cog geometry and detailing design; headed bars, welded and mechanical splices; mixed bar sizes; proprietary high-strength systems; seismic plastic-hinge and bridge-specific detailing; complete cover, spacing, crack-control and member-capacity review; AS 5216 PIR capacity design; adhesive resistance, edge/spacing, splitting, breakout, installation and approval calculations; interface transfer; pad and pedestal reinforcement; anchor-cage coordination; soil, bearing and foundation capacity.

Release requires: source-page checks; the Cl. 13.2.1(a) project-use note; independent lap and development regression cases; correct lower-limit and material-multiplier ordering; automatic `k7` selection from the two confirmations; default-versus-qualified reduction reporting where the `k7`, lower-limit or narrow-gap candidate governs; wide/narrow and contact/non-contact cases; Refined-data eligibility, explicit candidate-to-adopt reconciliation, pressure-evidence gating, field-level invalid state and independently labelled Basic fallback; independent straight and standard hook/cog cast-in routes with displayed detailing prerequisites and no lap reduction; cast-in/PIR origin labels; missing/zero, valid and over-yield `sigma_st` cases; N40 permitted and N50 absent from calculator selection; same-condition schedule enabled only for Basic/default `k7`; invalid-input, stale-result clearing and dependent-confirmation resets; raw/candidate/adopted comparison boundaries; every design-check and installation branch; PIR stopping at the AS 3600 reference depth plus one external-design warning; no project-scenario selector, extension summary, hidden product-report or site-fit workflow; active mobile tool visibility; and desktop/phone verification of the lightweight no-drawing layout. Keep pure length logic in `reo-calculation.js`, run `node tests/reo-lapping.test.js`, and retain module status `For Review` until all gates pass.

### 15.17A Steel Monopole Section Capacity Web Tab Rules

The public module name is `Steel Monopole Section Capacity`. It is a capacity-only tool for a tapered steel pole shaft. It reports design section moment capacity at each station and, for circular sections, the compression and bending section-capacity intercepts, together with physical mass, self-weight and centre of gravity. It is not a general member-capacity, pole-design or connection-design tool.

The module answers one engineering question:

> What section capacities are available for the entered steel pole shaft at each evaluated elevation?

Do not show design actions, demand, utilisation, `PASS`, `FAIL`, a governing load case or a whole-pole compliance statement. Capacity profiles are independent of demand; do not infer or interpolate a demand profile.

The ASCE/SEI 48-19 polygon path is a separate foreign-standard `For Review` method. User-provided readable excerpts cover Chapter 5 pp. 9-11, Appendix A p. 59, Appendix B pp. 61-62 and Commentary C5 pp. 33-37. These excerpts support the displayed pure-bending formula path, but they do not establish complete ASCE 48 compliance, Australian adoption, load basis, fabrication acceptance or whole-member design.

#### 15.17A.1 Supported Geometry and Input Modes

Support two explicit geometry modes:

| Mode | Intended use | Required geometry | Connection scope |
| --- | --- | --- | --- |
| `Continuous Taper` | Preliminary continuous-shaft capacity and weight profile | Overall height, bottom outside dimension, top outside dimension, one or more wall-thickness bands, section form and material | No physical joint or slip joint; do not infer fabricated section lengths or overlaps |
| `Fabricated Sections` | Manufacturer or project product geometry | Physical sections entered from bottom to top with fabricated length, bottom and top outside dimensions, nominal wall thickness, optional design wall thickness, material and overlap with the section below | Prescribed overlap screening and separate parent-section capacities only |

Open `Fabricated Sections` by default. Keep `Continuous Taper` for one continuous global taper defined by overall height, bottom dimension and top dimension. Its wall thickness may vary by elevation. Do not silently generate fabricated section lengths, overlaps or joint capacities from the continuous taper.

The release surface supports `Circular tubular`, plus the explicitly displayed ASCE regular polygon forms with 4, 6, 8, 12 or 16 sides. Circular sections use `Outside diameter, D`. Polygonal sections use:

- `Outside across-flats, D_o`;
- project or fabricator inside bend-radius ratio `r_i/t_nom`, from which the page derives `r_i = (r_i/t_nom)t_nom` separately for each thickness band or physical section; and
- `BR = min(r_i, 4t_d)` for the ASCE flat-width calculation.

Do not use an undifferentiated `Diameter` label for a polygon. Irregular polygons, unequal flats, non-concentric walls and locally varying thickness remain outside the method.

The initial schedule is the Austube 508.0 x 6.4 CHS C350L0 capacity-table example: one circular section with `D = 508.0 mm`, `t_nom = 6.4 mm`, manual `f_y = 350 MPa` and the AS 4100 cold-formed fabrication category. Use an editable 12 m profile length only to expose the elevation workflow; do not describe that length as a manufacturer-published product length. When the initial circular row is changed to a polygon form, replace the product-specific `508 CHS` identifier with the neutral `S1` identifier without changing entered geometry, and replace the Austube schedule caption with a neutral project/manufacturer geometry instruction. Keep KISMAT KOP-1230 only as a regular-polygon product-geometry reference: one 12 m, 8-sided E355BR section with 240 mm bottom and 90 mm top outside across-flats dimensions and 3 mm nominal thickness. Its source does not separately publish numerical yield stress, inside bend radius or capacity. Adopt `f_y = 355 MPa` from the designation and `r_i/t_nom = 1.5` as an editable fabrication estimate, not as manufacturer product data.

Use `Nominal wall thickness, t_nom` as the primary thickness input. By default, `t_d = t_nom`. The optional `Design thickness override, t_d` workflow permits a smaller positive project input, with `0 < t_d <= t_nom`. When active, identify it as `User override`. The AS/NZS 3678 Table 8 lookup and theoretical mass use `t_nom`; section properties and bending resistance use `t_d`. A `t_d` override does not require manual `f_y`. Corrosion allowance and measured remaining thickness are not otherwise calculated by the page.

For `Continuous Taper`, enter wall-thickness bands from base to top by their top elevation `z_top`. The final `z_top` equals `H`; intermediate values must be strictly increasing. Within each band, `t_nom`, optional `t_d` and `f_y` are constant. The outside dimension remains the one global linear taper:

```text
D(z) = D_b + (D_t - D_b) z / H
```

Add exact calculation stations at every thickness-band boundary and evaluate both adjacent thickness states at the boundary. These bands are calculation regions, not physical sections; they do not add joint or overlap mass.

In the resistance chart, retain separate line colours for the thickness bands and show the resistance step between adjacent band values as a horizontal dashed connector at the exact boundary elevation. Label the connector `Band boundary`; do not imply that bending resistance varies continuously through a discrete thickness or material change.

#### 15.17A.2 Fabricated Section Schedule and Assembly Geometry

Each physical section row, ordered bottom to top, contains:

| Field | Symbol / status | Rule |
| --- | --- | --- |
| Section identifier | `Section ID` | Stable user-visible identifier |
| Fabricated length | `L_i` | Positive physical steel length |
| Bottom outside dimension | `D_b`, `D_AF,b` or `D_AC,b` | Label follows section form and dimension basis |
| Top outside dimension | `D_t`, `D_AF,t` or `D_AC,t` | Label follows section form and dimension basis |
| Nominal wall thickness | `t_nom,i` | Positive manual input used for the AS/NZS 3678 Table 8 lookup and theoretical mass |
| Design thickness override | `t_d,i` | Optional positive `User override` used for section properties and bending resistance; default `t_d,i = t_nom,i` and require `t_d,i <= t_nom,i` |
| Material basis and grade | source selection | `AS/NZS 3678:2016 plate` or `Manual f_y`; the initial Austube CHS example adopts editable `f_y = 350 MPa`; the KOP-1230 polygon verification case adopts editable `f_y = 355 MPa` from its E355BR designation |
| Yield stress | `f_y` | Auto by AS/NZS 3678 Table 8 grade and thickness, or editable per section in Manual mode |
| Overlap with section below | `L_o,i` | Starts at Section 2; enter the prescribed product or drawing overlap |

Derive installed elevations from the physical schedule:

```text
z_start,1 = 0
z_start,i = z_end,i-1 - L_o,i
z_end,i = z_start,i + L_i
H = sum(L_i) - sum(L_o,i)
```

Within each physical section, interpolate its outside dimension using that section's own fabricated local coordinate. Do not interpolate one global pole taper through an overlap. At a slip joint, the upper and lower shells retain their own dimensions, thicknesses, materials, section properties and capacities.

Reject non-positive lengths or thicknesses, negative overlaps, overlaps not shorter than both connected sections, non-taper-compatible dimensions and schedules that cannot form a continuous installed height. Clear stale capacity and mass results after an invalid edit.

#### 15.17A.3 Calculation Stations and Elevation Convention

Use installed elevation `z` measured upward from the pole base, with `z = 0` at the base and `z = H` at the top.

Generate regular stations at `0.5 m` intervals and always add exact stations at the base, top, every physical section start and end, every overlap start and end, and every material or thickness-band transition. Merge coincident stations within a documented numerical tolerance. Calculate with unrounded values and round only for display.

The station table is ordered from pole top to pole base so `z = 0` is the final row. The chart uses normal engineering elevation with the base at the bottom. Show labelled horizontal guides at every `5 m` and at the top where the height is not a multiple of `5 m`.

Use a compact `Moment capacity` disclosure as the primary result. Its summary reports the governing evaluated base-station value: `Base phi Ms` for the AS 4100 circular path or `Base M` for the ASCE polygon path. At an exact base boundary, evaluate every active section state and report the lower available value. If any station is outside the implemented method range, report `Moment profile not checked` rather than presenting an isolated base value. Retain every regular and exact boundary result in the top-to-base station table; the station set is not a continuous numerical optimisation.

For circular sections, add a separate `Section capacity intercepts` disclosure using the same station set and top-to-base order. At every active shell state report `phi Ns`, `phi Ms` and `kf`; these are the design section capacity intercepts used in the AS 4100 Cl. 8.3.2 interaction expression, not a scalar combined-capacity result. The summary reports the lower evaluated base `phi Ns` and base `phi Ms`. Preserve both adjacent states at an exact thickness or section boundary. Do not provide action inputs or calculate an interaction ratio.

#### 15.17A.4 Source and Method Isolation

Apply this source hierarchy:

| Path | Governing calculation basis | Permitted role |
| --- | --- | --- |
| Circular section | AS 4100:2020 Section 5, including Table 5.2 and Cl. 5.2.3 effective section modulus | Australian design section moment-capacity path |
| Regular polygonal section | ASCE/SEI 48-19 Cl. 5.2.3.2.1, Table 5-1, Cl. 5.2.5 and Appendix B | Foreign-standard pure-bending section-capacity path; `For Review`, not a complete ASCE 48 or Australian compliance check |
| Steel material | Normally AS/NZS 3678 for fabricated plate shells, AS/NZS 1163 for a supplied structural CHS product, or a verified product specification for a sourced example | `f_y` and material provenance |
| Pole and slip-joint guidance | AS/NZS 7000:2016 Appendix K | Australian context, accepted steel-pole reference routes and prescribed overlap guidance |

AS/NZS 7000 Appendix K does not provide a complete polygonal section-resistance equation. It refers steel-pole design to accepted steel and pole Standards, including ASCE 48. Keep the AS 4100 and ASCE paths isolated:

- do not apply the AS 4100 capacity factor to an ASCE design stress;
- do not apply ASCE local-buckling limits to an AS 4100 CHS result;
- do not combine notation, compactness limits or material defaults from the two systems;
- show the active method and edition in the `Moment capacity` summary and in the calculation details.

#### 15.17A.5 Circular Section Calculation Contract

For an unperforated circular section with outside diameter `D` and design wall thickness `t_d`:

```text
D_i = D - 2t_d
A = pi / 4 (D^2 - D_i^2)
I = pi / 64 (D^4 - D_i^4)
Z = I / (D / 2)
S = (D^3 - D_i^3) / 6
M_y = f_y Z
M_p = f_y S
M_s = f_y Z_e
phi M_s = 0.90 f_y Z_e
lambda_s = (D / t_d)(f_y / 250)
```

Use these checked AS 4100 Table 5.2 CHS limits:

| Fabrication category | `lambda_sp` | `lambda_sy` |
| --- | ---: | ---: |
| `SR / HR / CF` | 50 | 120 |
| `LW / HW` | 42 | 120 |

Here `LW` means lightly welded longitudinally and `HW` means heavily welded longitudinally. Do not describe `HW` as helically welded.

Use `Z_e = min(S, 1.5Z)` for compact sections, the AS 4100 interpolation for non-compact sections, and the lesser applicable AS 4100 CHS expression for slender sections.

Distinguish nominal wall thickness `t_nom` from design wall thickness `t_d`. Default `t_d = t_nom`; when a project deduction applies, allow a separate `t_d` and require `0 < t_d <= t_nom`. Use `t_nom` for the AS/NZS 3678 thickness-dependent `f_y` lookup and theoretical steel mass. Use `t_d` for section properties, slenderness and resistance.

Distinguish an AS/NZS 1163 structural CHS product from a fabricated plate shell. The initial Austube CHS example uses manual `f_y = 350 MPa` and the cold-formed category. A circular fabricated-plate path can instead use AS/NZS 3678:2016 plate and derive `f_y` separately for each physical section from Table 8 using `t_nom`; table ranges without a specified yield stress must fail closed. Manual `f_y` remains available for certified product values and alternate materials. AS/NZS 1163 Table 7 has no thickness-dependent minimum yield-strength branches, and that product basis must not be silently applied to a tapered fabricated plate shell.

A welded fabrication category may be preselected for a preliminary fabricated longitudinally welded shell only as a visible editable assumption. Do not infer `SR`, `HR`, `CF`, `LW` or `HW` solely from material grade.

Report `Design section moment capacity, phi M_s`, `First-yield reference, M_y`, `Ideal plastic reference, M_p`, the section class / `Z_e` basis, and active material and fabrication provenance.

#### 15.17A.6 Compression and Bending Capacity Profile

The primary elevation profile remains the pure-bending section-capacity result. For circular sections, a separate capacity workflow reports the compression and bending section-capacity intercepts at every 0.5 m and exact-boundary station. It does not accept design actions or make a member-design or whole-pole compliance claim.

**Circular section-capacity boundary**

The supported profile covers an unperforated circular section:

| Item | Required contract |
| --- | --- |
| Stations | The same regular 0.5 m and exact-boundary stations used by the moment-capacity profile, ordered top to base |
| Capacity output | `phi Ns`, retained pure-bending `phi Ms` and `kf` for every active section state; together `phi Ns` and `phi Ms` define the linear uniaxial section-capacity boundary |
| Geometry | Resolve every active physical section or both adjacent thickness-band states at each evaluated elevation |
| Circular path | AS 4100:2020 Cl. 6.2 nominal compression section capacity and Cl. 8.3.2 uniaxial combined section capacity; circular symmetry removes major/minor-axis ambiguity |
| Boundary | Section capacity only; no action point, utilisation, `Nc`, member buckling, effective length, second-order analysis or whole-member compliance claim |

Use the following capacity quantities:

```text
Ns = kf An fy
phi Ns = 0.90 Ns
phi Ms = 0.90 fy Ze
N / (phi Ns) + M / (phi Ms) = 1
```

Use `phi = 0.90` for the AS 4100 section capacities. Determine `kf = Ae/Ag` in accordance with Cl. 6.2.2 to Cl. 6.2.4; do not assume `kf = 1.0` for a slender circular shell. The initial scope is unperforated shell only, so openings, penetrations and fastener-hole deductions are unavailable states rather than zero deductions. The displayed equation identifies the boundary represented by the two reported intercepts; do not expose `N`, `M`, reduced capacity or a utilisation ratio as page inputs or results.

**Deferred polygon combined-stress check**

The available ASCE/SEI 48-19 excerpts include axial-plus-bending normal stress in Cl. 5.2.6 Eqs. (5.2-20) and (5.2-21). This is a point-stress check, not a generic capacity-ratio equation. A polygon implementation therefore requires signed `Mx*` and `My*`, a visible section-axis and polygon-orientation convention, and evaluation at every critical perimeter point. With shear and torsion excluded, evaluate the signed normal stress from `P/A + Mx cy/Ix + My cx/Iy`; compare tensile points with the applicable tensile limit and compressive points with the applicable `Fa` branch. Do not reduce this to one scalar `M*` or use `M = Fa Zmin` once axial force is present.

For polygon forms, change the third disclosure title from `Section capacity intercepts` to `Combined polygon stress` and show `Not evaluated`. Keep that state until the axis convention, pointwise geometry routine, ASCE material acceptance and independent sign/rotation tests are complete. Retain its foreign-standard `For Review` status; the supplied excerpts do not establish Australian adoption or complete ASCE 48 compliance.

Retain traceability and independent tests for the `kf` branches, the two capacity intercepts, station order and thickness transitions. Polygon combined stress remains unavailable.

#### 15.17A.7 Regular Polygonal Section Calculation Contract

Require one supported side count `n`, outside across-flats `D_o`, design wall thickness `t_d`, yield stress `f_y`, and actual inside bend radius `r_i`. Collect a common project or fabricator ratio `r_i/t_nom` and derive `r_i = (r_i/t_nom)t_nom` separately for each thickness band or physical section. Display the derived `r_i` and `BR = min(r_i, 4t_d)` values in the calculation trace. The ratio cannot be inferred uniquely from outside dimensions, side count and wall thickness; do not calculate a polygon result while this input is missing. Use `E = 200 GPa`.

Calculate gross area, centroidal second moment of area and elastic section modulus from a deterministic closed-section geometry routine. Because no load direction is entered, use:

```text
Z_min = I / c_max
```

where `c_max` is the maximum outside vertex distance. Validate the geometry routine against independent polygon calculations and the applicable ASCE section-property reference.

For local buckling define:

```text
lambda = (w / t_d) sqrt(f_y / E)
beta = 360 degrees / n
BR = min(r_i, 4t_d)
w = tan(pi / n) (D_o - 2t_d - 2BR)
```

For pure bending with no axial action, use these ASCE/SEI 48-19 branches:

| Bend-angle class | Prescriptive range | Permitted compressive stress `F_a` |
| --- | --- | --- |
| `beta >= 45 degrees` | `lambda <= 1.53` | `F_a = f_y` |
| typically 4-, 6- and 8-sided | `1.53 < lambda <= 2.06` | `F_a = 1.42 f_y (1 - 0.194 lambda)` |
| `30 degrees <= beta < 45 degrees` | `lambda <= 1.41` | `F_a = f_y` |
| typically 9- to 12-sided | `1.41 < lambda <= 2.20` | `F_a = 1.45 f_y (1 - 0.220 lambda)` |
| `22.5 degrees <= beta < 30 degrees` | `lambda <= 1.26` | `F_a = f_y` |
| typically 13- to 16-sided | `1.26 < lambda <= 2.42` | `F_a = 1.42 f_y (1 - 0.233 lambda)` |

Do not extend these equations beyond their upper slenderness limits. Return `Not checked - outside the prescribed method`. For `n > 16`, use the ASCE round-member treatment only after its current-edition equations, limits and `D_o` definition pass the same source and numerical gates; until then return `Not checked`.

The derived permitted bending moment is:

```text
M = F_a I / c_max = F_a Z_min
```

Use `Permitted bending moment, M`. Do not label the ASCE result `phi M_s` and do not apply an additional `phi = 0.90`.

Use the actual inside bend radius derived from the entered `r_i/t_nom` and cap its contribution to the flat-width equation at `4t_d`, as required by Cl. 5.2.3.2.1 and Appendix B Fig. B-7. For outside across-flats input `D_o`, use the Appendix B definitions `D = D_o - t_d` and `w = tan(pi/n)(D - t_d - 2BR) = tan(pi/n)(D_o - 2t_d - 2BR)`. Do not substitute the full nominal side length when bend information is unavailable.

AS/NZS 3678 plate strength may be used as a project material input, but the page does not establish material equivalence with the steel specifications referenced by ASCE/SEI 48-19. State this limitation and require project acceptance before using the polygon result for design.

#### 15.17A.8 Slip-Joint Screening Contract

Slip joints belong in the segmented data model, but the module does not calculate a slip-joint moment capacity.

For each overlap calculate `Upper parent section resistance` and `Lower parent section resistance` independently. An optional `Parent-section screening resistance` is the lesser value. Never add shell areas, section moduli or bending resistances to create a combined overlap capacity. Always display `Slip-joint local capacity: Not evaluated`.

Use the AS/NZS 7000 Appendix K prescribed geometric screen:

```text
L_o,design >= 1.5 D_ins,max
L_o,constructed >= 1.35 D_ins,max
```

`D_ins,max` is the maximum diameter of the largest circle inscribed within the outside profiles of the components being joined over the overlap region. For a circular section use the outside diameter. For a regular polygon use the outside across-flats dimension. Do not subtract wall thickness.

The quick page shows `Entered overlap`, `Required design overlap`, the prescribed-overlap screen and a visible statement that joint resistance is not calculated. Actual installed overlap and the `1.35 D_ins,max` construction-tolerance check remain available to the calculation layer and project verification record but are not first-page inputs. This screen is not evidence of fit-up, dimensional tolerance, jacking force, local contact, friction, ovalisation, seam, fatigue or joint moment capacity.

#### 15.17A.9 Mass, Self-Weight and Centre of Gravity

Calculate physical steel volume and mass from `t_nom` for every fabricated section, including both shells in an overlap. Do not subtract overlap length from either physical section's steel mass.

```text
rho_steel = 7850 kg/m^3
g = 9.80665 m/s^2
mass = integral(rho_steel A(s) ds)
self-weight = mass g
z_cg = sum(m_i z_cg,i) / sum(m_i)
```

Report `Total steel mass`, `Self-weight`, `Assembled centre of gravity`, and optional per-section mass in calculation details. Shaft steel only is included. Base plates, flange plates, anchor bolts, ladders, doors, stiffeners, brackets, platforms, weld metal, coatings, internal cables and attachments remain excluded.

#### 15.17A.10 Page Structure and Figure Rules

Use the shared static-app tab system, not a standalone page or framework rewrite. Use three aligned primary headings without numeric stage badges:

- `Section definition`: geometry mode, section form and either the continuous-taper definition or fabricated-section schedule;
- `Material and fabrication`: yield-strength basis, fabrication category, design-thickness option and source-status note;
- `Section capacity`: two adjacent disclosures for `Moment capacity` and the circular `Section capacity intercepts` or polygon `Combined polygon stress` state.

Place the compact `Shaft properties` summary between material inputs and section capacity. It reports mass, self-weight, assembled centre of gravity and installed height; it is not a capacity result. Place prescribed slip-overlap screening after section capacity, followed by calculation details, sources and limitations. Do not use a generic `Results` heading or a result-card grid.
Keep both capacity disclosures collapsed by default so their base summaries can be compared directly. Each disclosure uses the common 0.5 m station basis. Hide the prescribed slip-overlap section when no positive overlap is entered.

Initial values are visible, editable examples rather than hidden design assumptions. The initial fabricated circular row uses the cited Austube 508.0 x 6.4 CHS C350L0 geometry and `f_y = 350 MPa`; `CF` is the editable initial fabrication category. Plate grade 350 is the initial value when the plate lookup is selected. Design thickness defaults to `t_d = t_nom` and may be enabled as a section-by-section project input. For regular polygons, `r_i/t_nom = 1.5` is an editable fabrication estimate, not a Standard or product value. New section identifiers and zero overlap remain editable.

Do not expose method constants as routine user inputs. The 0.5 m station interval, `E = 200 GPa`, steel density `7850 kg/m3`, `g = 9.80665 m/s2`, resistance factors and prescribed Standard limits remain fixed in the calculation implementation and are disclosed in calculation details or sources as applicable.
For the chart, use `Design section moment capacity, phi Ms` on the AS 4100 circular path and `Permitted bending moment, M` on the ASCE polygon path. On phone layouts, the axis may use the concise symbols `phi Ms` or `M` while the accessible label retains the full term. Show the overlap-zone legend only when a positive overlap exists. Use `physical shell geometry` as the default mass basis and change it to `includes overlap shells` only when overlapping physical sections are present. Apply singular and plural section-count labels correctly.

Do not include a decorative geometry sketch. The primary figure is a deterministic chart of design bending resistance against installed elevation. It must show section boundaries, overlap zones, separate upper and lower parent-section lines through an overlap, labelled `5 m` guides, stable axes and no fictitious summed overlap line.

The station table is collapsed by default and shows its row count in the summary. When opened, it shows top elevation first and `z = 0` last. Identify the active physical section or overlapping parent sections and show outside dimension, thickness, `f_y`, concise section class or local-buckling state, and design resistance. Place the compression-and-bending capacity-intercept scope note before its station table.

Keep the chart wider than it is tall so the profile remains an engineering plot rather than a dominant page illustration. On phone layouts, place the method or scope note below the section heading, keep the physical-section identifier visible while the schedule scrolls horizontally, and render a compact chart viewBox that fits the content width without horizontal chart scrolling. Technical tables may scroll within their own contained regions; no technical region may create page-level horizontal overflow.

Limit common material and overall-profile input groups to three columns on wide desktop, two columns on narrow desktop and one column on phone layouts. Keep both groups inside the same bordered input-group treatment. Do not use automatic column expansion that compresses long engineering labels or selected material and fabrication values.

Use one spacing layer between monopole workflow sections; do not combine lookup-card grid gaps with child margins. Keep `Section form`, the active geometry definition and `Material properties` as visually equivalent engineering input bands beneath their parent headings. On desktop, use bounded control tracks that stop expanding once labels and selected values are comfortably readable. Place the polygon method note with `Section form`, the material provenance note with `Material properties`, and keep the design-thickness override in the active material-control grid instead of forcing an otherwise empty row. At every viewport, constrain schedule, station and overlap tables to their own paint-contained horizontal-scroll regions so a table cannot create page-level overflow. On phone, stack the same controls and notes in the same engineering order.

#### 15.17A.11 Result States and Exclusions

Permitted states are `Calculated`, `Assumption`, `Source_Not_Verified`, `Not checked`, `Not evaluated` and `Invalid input`. Use `Not checked` where entered geometry lies outside an implemented method range; use `Not evaluated` where a calculation path is intentionally unavailable, including polygon combined stress and slip-joint local capacity. Do not use `PASS` or `FAIL`. A prescribed overlap comparison may state `Meets prescribed design overlap` or `Below prescribed design overlap`, but this is not a connection-capacity result.

Keep these exclusions explicit:

- action derivation, load combinations and interpolated demand profiles;
- member compression capacity and whole-member axial-force/bending interaction;
- polygon axial-force and bending interaction;
- biaxial bending and arbitrary bending direction;
- global member buckling, second-order effects and nonlinear pole analysis;
- base plates, flange plates, anchor bolts and foundations;
- slip-joint local strength, contact, friction, ovalisation, fit-up and installation force;
- openings, doors, penetrations, local reinforcement and attachments;
- longitudinal and circumferential seam design;
- shear, torsion and combined stress;
- fatigue, vortex shedding, fracture and brittle-fracture assessment;
- corrosion-loss prediction and durability design;
- serviceability, deflection and vibration;
- erection, transport and temporary conditions;
- fire and seismic system design.

#### 15.17A.12 Validation and Release Gates

Before a checked release, complete:

1. Licensed-source checks for every implemented AS 4100 and ASCE clause, limit, symbol and branch.
2. Checked AS/NZS 3678 Table 8 plate `f_y` lookup with exact thickness boundaries and fail-closed unsupported ranges. AS/NZS 1163 Table 7 remains reference-only because the tapered-shell page does not claim a supplied CHS product.
3. Independent circular-section `A`, `I`, `Z`, `S`, `Z_e` and `phi M_s` cases.
4. Independent 4-, 6-, 8-, 12- and 16-sided polygon geometry plus 8-, 12- and 16-sided `w`, `Z_min`, `lambda`, `F_a` and `M` cases. Reproduce the ASCE Appendix B coefficients and at least one external calculation record, while distinguishing a legacy or partial subcheck from a complete current-edition worked example.
5. Exact transition and upper-bound tests for every polygon branch, plus fail-closed tests immediately outside each range.
6. Across-flats/across-corners geometry conversion, actual-radius input, `4t_d` bend-radius cap and fail-closed missing-radius tests.
7. One-section and multi-section assembly-height tests.
8. Local-coordinate taper tests through an overlap.
9. Design and actual overlap tests using `1.5D_ins,max` and `1.35D_ins,max`.
10. Mass, self-weight and centre-of-gravity tests, including double steel in an overlap.
11. Station tests for `0.5 m`, section ends, overlap boundaries, transitions and non-multiple top heights.
12. Invalid-input and stale-result clearing tests.
13. Desktop and phone chart/table checks for order, labels, `5 m` guides, overlap lines, clipping and horizontal overflow.
14. Confirmation that no demand, utilisation, `PASS` / `FAIL`, combined overlap capacity or excluded design claim appears.
15. Traceability linking source -> calculation contract -> implementation -> tests -> visible result.

The current `For Review` release has independent exact-geometry and ASCE/SEI 48-19 Appendix B comparisons. It also reproduces the common `A_g`, `I`, `w` and `F_a` quantities from one public ASCE 48-11 octagonal worksheet. This is a legacy external subcheck, not a complete ASCE/SEI 48-19 pure-bending worked-example reproduction; do not promote the polygon path beyond `For Review` on that evidence alone.

#### 15.17A.13 Implementation Sequence

Implement in this order:

1. Physical-section, assembly-elevation and station-generation functions.
2. Shared circular and regular-polygon section-property functions.
3. Material provenance and thickness-dependent yield-stress lookup.
4. AS 4100 circular section resistance with boundary tests.
5. ASCE regular-polygon resistance as a separate foreign-standard `For Review` path, using the visually checked excerpts and explicit applicability limits.
6. Slip-joint prescribed overlap screening and separate parent-section results.
7. Mass, self-weight and centre-of-gravity calculations.
8. Shared-tab UI, capacity chart and station table.
9. Browser, responsive, regression and traceability audit.

Do not port the old monopole prototype wholesale. Start from the current main application and selectively reuse only calculations or presentation code that satisfies this contract.

**Priority 2: Low-scope reporting improvements**

- Add a folded mass breakdown by wall-thickness band or fabricated section, reconciling exactly to the current total mass and centre of gravity.
- Add a compact printable or downloadable calculation record containing inputs, governing station, method, source IDs, exclusions and unrounded calculation values. Do not add project approval, certification or issue-status fields.

**Separate future modules, not additions to this tab**

- global member buckling, effective length and second-order `P-Delta` analysis;
- lateral deflection, rotation, vibration and serviceability;
- shear, torsion and combined shear stress;
- fatigue, vortex shedding and dynamic response;
- doors, openings, local reinforcement, seam welds and attachments;
- slip-joint resistance and nonlinear fit-up/contact behaviour;
- base plate, anchors, pedestal and foundation design.

These modules require additional actions, boundary conditions, analysis assumptions or component geometry. Do not expose placeholder controls for them in the section-capacity page.

### 15.18 Web Local Update and Deployment Workflow

Preferred workflow:

1. Capture the affected layout before editing at representative wide and narrow widths.
2. Modify files locally.
3. Test the static page locally.
4. Recheck the same wide and narrow layouts, including relevant control states.
5. Check one or two representative calculations.
6. Check the exact git diff.
7. Commit only the intended files.
8. Push to GitHub only when deployment is requested.
9. Verify GitHub Pages after deployment.

Current GitHub Pages repo:

- Local repo: current `SC Handbook` checkout.
- Remote: `https://github.com/Pikatiu27/SC-handbook.git`
- Branch: `main`
- Published page: `https://pikatiu27.github.io/SC-handbook/`

Standard push sequence:

```powershell
cd "<SC Handbook checkout>"
git status --short
git diff --stat
git diff
git add <intended files only>
git commit -m "<short clear commit message>"
git push origin main
git status --short
git rev-parse --short HEAD
```

Rules before committing:

- Always run `git status --short`.
- Always inspect `git diff --stat`.
- If the diff contains unrelated or unfinished work, do not commit it.
- Only `git add` the files that belong to the accepted change.
- Do not push experimental tabs, draft calculators, or unverified standard formulas.
- If any formula, factor, table value, symbol convention, or product property is `Source_Not_Verified`, report the gap to the user before commit/push and keep it out of any verified calculator release unless the user explicitly accepts it as draft or placeholder content.
- Deploy only reviewed, accepted tab changes and accepted global framework changes.

Rules after pushing:

- Confirm the push completed to `origin/main`.
- Confirm local `HEAD` short hash.
- Confirm whether the working tree is clean.
- The GitHub Pages page may take 1-2 minutes to update.
- If the page still looks old, use hard refresh, private window, or a cache-busting URL.

Token and browser notes:

- Visitors using the static GitHub Pages calculator do not consume Codex or OpenAI tokens.
- Local browser use, clicking the page, or sharing the page link does not consume model tokens.
- Token usage only occurs when asking Codex to inspect, edit, convert references, reason, or generate code/content.

### 15.19 Professional Web Audit Protocol

This is the single mandatory audit workflow for SC Handbook. Section 6.2 defines the required calculation contract; this section verifies that the source evidence, implementation, interface and test record satisfy that contract. Whenever a page or calculation is requested to be checked, audited, reviewed or verified, or the user asks whether problems remain, use this protocol unless the scope is explicitly narrowed.

#### 15.19.0 Audit Control Flow

Audit the engineering claim before judging visual polish. Use the workflow type in Section 2.5 and the matching page pattern in Section 15.2.2 to select the evidence required; do not apply calculator tests to a pure lookup or accept a quick-check `PASS` after testing capacity alone.

Complete the audit in this order:

| Stage | Mandatory question | Minimum evidence | Required response when failed |
| --- | --- | --- | --- |
| `A. Inventory` | What exact revision, tab, mode, inputs, outputs and source records are being audited? | Worktree/commit/build identity and surface inventory | Mark the audit scope unclear; do not claim local/public equivalence |
| `B. Claim and scope` | What engineering question, workflow type and decision does the primary result claim to answer? | Section 2.4 chain, result type, limit state, applicability and exclusions | Simplify/relabel the claim or block the result before formula approval |
| `C. Source and applicability` | Does the cited source govern the selected material, geometry, action basis and condition? | Readable governing clause/table/figure/catalogue row, edition and linked conditions | Set `Source_Not_Verified` or `Not evaluated`; do not infer missing requirements |
| `D. Calculation` | Are transcription, units, factors, branches, numerical results and governing logic correct? | `Calculation_ID`, independent calculation, branch/boundary cases and invariants | Suppress the affected result and classify the numerical defect by severity |
| `E. State and dependency` | Do all input, lookup, override, hidden, invalid and mode transitions update the full result chain correctly? | Transition matrix, invalid/out-of-scope tests and stale-result checks | Fail closed; keep the controlling input and next action visible |
| `F. Page and explanation` | Does the page expose the minimum basis, primary answer, status and residual checks with the correct query pattern? | Desktop/phone review, hierarchy, terminology, accessibility and warning review | Modify, delete/simplify or mark unclear; do not hide a technical defect with styling |
| `G. Regression and release` | Did accepted changes preserve unaffected calculations and reach the intended local/remote/public state? | Automated/manual regressions, clean diff, commit identity and deployment fetch where applicable | Keep the change local/unreleased and report the failed verification boundary |

An upstream failure blocks downstream approval of the engineering claim, but it does not prevent recording independent interface or presentation findings. For example, an unreadable source blocks `Checked` status even if arithmetic appears correct; the audit may still report a mobile overflow defect separately.

Every finding must identify its audit stage, affected workflow/result, `Calculation_ID` where applicable, evidence and required disposition. `Verified - no change` is permitted only when the relevant stage has positive evidence, not because no obvious defect was seen.

#### 15.19.1 Audit Mode and Change Control

Default audit behaviour:

1. Start read-only. Do not change files during the first audit pass unless the user explicitly asks for immediate correction.
2. State the audit scope: full handbook, selected tab, selected calculation, page logic, visual layout, source evidence, or deployment state.
3. Identify the exact local checkout, branch, commit, build identifier and files reviewed. Do not assume the open browser is showing the same revision as the worktree.
4. Read this handbook first, then the tab-specific rules, then the implementation and traceability record.
5. Use `%USERPROFILE%\Documents\Codex\Reference` as the only default reference library. Follow its routing and source-register files before opening individual source documents.
6. Report findings before editing using the standard audit report in Section 15.19.16.
7. After the user accepts a finding, modify only the accepted scope, run the applicable regression matrix, and show the resulting local state.
8. Commit, merge, push or deploy only when the user requests it. Verify local, remote and published states separately.

Do not silently combine these phases:

- source verification;
- engineering judgement;
- implementation correction;
- visual redesign;
- git merge or deployment.

#### 15.19.2 Audit Scope Inventory

Before checking individual formulas, inventory the audited surface:

- visible tab name, public hash, internal panel id and script ownership;
- input groups and every editable, overrideable, derived, locked or hidden field;
- selectors, modes, optional branches and dependent controls;
- outputs, governing results, utilisation ratios, status labels and warnings;
- formulas, lookup tables, embedded product data and generated assets;
- source cards, clause/table references, limitations and issue status;
- desktop, tablet and phone layouts;
- local and published asset versions where deployment is in scope.

Confirm that the current tab register in Section 15.2 matches the actual navigation and route logic. Record missing, orphaned or duplicated panels before deeper review.

#### 15.19.3 Source and Evidence Audit

For every formula, factor, default, table value, material strength and product property:

1. Identify its Section 6.2.2 evidence class and input/data class, including whether it is `Normative`, `Catalogue`, `Interpretive`, `Worked example`, `Derived`, `Project input`, `User override`, `Conservative assumption`, or `Source_Not_Verified`.
2. Locate the governing document, edition, clause/table/figure, PDF page or catalogue row.
3. Confirm the source is applicable to the selected material, product, geometry, fabrication method, limit state and design situation.
4. Check that the page has not copied explanatory context from one clause while calculating with another clause's equation or capacity factor.
5. Confirm table headings, footnotes, units, interpolation rules, exceptions and adjacent clauses that control application.
6. Compare embedded rows with the source, including designation, dimensions, strengths, factors, units and availability status.
7. Record page-level or row-level evidence in `REFERENCE_TRACEABILITY.md`; do not overload visible web text with audit detail.
8. Mark unreadable, missing or edition-uncertain evidence `Source_Not_Verified`. Do not describe it as verified because a secondary website repeats the same value.

For the default Australian handbook path, confirm the Section 4 authority chain explicitly: project/NCC adoption context -> adopted Australian or AS/NZS Standard -> applicable Australian product/material Standard -> Australian interpretive aid or manufacturer evidence. Record any international source and its permitted non-governing role. Use primary standards and manufacturer documents where available. Reference books and worked examples may confirm interpretation and arithmetic, but they do not replace the governing Standard.

#### 15.19.4 Formula and Numerical Audit

Audit every active calculation branch, not only the default example:

- transcribe the governing equation independently from the source;
- map every code symbol to the page variable and displayed notation;
- confirm nominal capacity versus design capacity and the placement of `phi`;
- confirm characteristic, nominal, design, ultimate and service quantities are not mixed;
- verify unit conversion at input, intermediate and output stages;
- verify exponent, square-root, bracket, minimum/maximum and interaction expressions;
- verify sign convention, axis, plane, compression/tension direction and interface count;
- verify gross, net, effective and shear areas are selected for the correct limit state;
- verify capacity factors, reduction factors and table branches change under the correct conditions;
- verify rounding occurs only for display and does not feed back into governing calculations;
- verify the governing result uses the correct `min`, `max`, interaction or comparison logic;
- verify a hidden or inactive branch cannot continue contributing to a result;
- verify no `NaN`, infinity, stale result, silent zero or plausible-looking fallback is presented as calculated.

Reconstruct the complete Section 2.4 engineering chain for every governing result and classify it under Section 2.5. Confirm that a capacity-only result shows the nominal-to-design resistance path without implying a check; a quick check introduces a compatible design action and names the exact checked limit state; and preliminary selection or sizing reruns every claimed in-scope check for the selected candidate. Missing actions must suppress utilisation and `PASS` / `FAIL`, not be interpreted as zero demand.

For each governing formula, confirm its `Calculation_ID` and complete the applicable Section 6.2.7 matrix. Follow the source selection, worked-example capture, independent reconstruction, browser reproduction, comparison and disposition sequence in Section 6.2.11 and record it using the templates in `REFERENCE_TRACEABILITY.md`. The independent hand calculation or separate script calculation must not call or copy the production calculation function. For conditional formulas, test each branch and one value immediately either side of the branch boundary. Compare the independent result with the browser output using unrounded intermediate values and record the reasoned numerical tolerance.

#### 15.19.5 Input Classification and Engineering Order

Check every field against the engineering grouping rules in Section 15.8:

- `Section / geometry`;
- `Material properties`;
- `Relevant factors / assumptions`;
- `Connection / detailing`;
- `Design actions`;
- useful `Derived values`;
- advanced or warning-only checks.

Confirm:

- geometry, radius, area, thickness and effective length are not mislabelled as factors;
- `f_y`, `f_u`, concrete strength and weld strength remain material properties;
- code coefficients and reduction factors are not mixed with project dimensions;
- connection-specific holes, net paths, edge distances and weld details have their own group;
- fully manual project values, lookup/override values and read-only derived values use the correct fill and label treatment;
- optional advanced inputs do not interrupt the main quick-reference workflow;
- no input is collected if it does not affect a visible result, warning, summary or calculation step;
- no required input is hidden inside a details panel after its branch becomes governing.

#### 15.19.6 Dependency and State-Transition Audit

Treat the page as an engineering state machine. For every selector, checkbox, auto/manual toggle and optional mode, verify:

1. Initial default state is valid, common and clearly sourced or labelled as an assumption.
2. Changing a controlling field updates every dependent value, summary, figure, formula step, warning and result.
3. Auto-derived values update when their source changes and stop updating when a deliberate manual override is active.
4. Returning to auto mode restores the current derived value, not a stale historical value.
5. Disabled or not-applicable fields are excluded from calculations and cannot submit stale values.
6. Hidden fields are used only when the user does not need them to resolve the current warning. Keep an invalid controlling field visible and actionable.
7. Changing section/product/type does not retain incompatible material, factor, geometry or demand values without a visible warning.
8. Reset/default behaviour is deterministic and returns the complete tab to one documented state.
9. URL hash navigation opens the requested tab, updates active styling and brings the active mobile tab into view.
10. Browser refresh and direct links reproduce the same selected tab and valid initial calculation.

Use a transition matrix for non-trivial tabs: `start state -> user action -> expected input state -> expected result state -> expected warning/state text`.

#### 15.19.7 Editable Numeric Input Audit

Check every editable numeric field with keyboard entry, not only increment/decrement controls:

- blank temporary state;
- integer and decimal entry;
- leading decimal point;
- comma decimal where supported by the parser;
- negative sign where negative values are meaningful;
- zero;
- minimum and maximum valid values;
- just below and just above each limit;
- pasted value with surrounding spaces;
- Enter, Tab, blur and refocus;
- replacement of the complete existing value;
- phone numeric keyboard behaviour.

An incomplete editing state must not be written back as `0`. Clamp only a valid completed value on blur. Invalid, missing and out-of-range values must produce an explicit state and must not leave the previous capacity looking current.

#### 15.19.8 Boundary, Invalid and Out-of-Scope Matrix

For each calculation branch, test:

- common default case;
- smallest valid input;
- largest valid input within the stated method;
- zero and blank inputs;
- negative or physically impossible inputs;
- equal values at governing intersections;
- each side of table or formula thresholds;
- missing material/product/source data;
- inactive optional reinforcement, holes, interfaces or components;
- incompatible selections;
- known out-of-scope geometry, grade, slenderness, action or design condition.

Expected statuses must distinguish:

- `Calculated`;
- `PASS` / `FAIL` only when a compatible design action and every stated governing check are evaluated;
- `Review required`;
- `Not evaluated - outside simplified-method scope`;
- `Not applicable`;
- `Not published`;
- `Invalid input`;
- `Source_Not_Verified` in audit records or deliberate draft surfaces.

Do not show `OK`, `PASS`, a utilisation ratio, or a numeric capacity when the required comparison basis or applicable method is incomplete.

#### 15.19.9 Result Hierarchy and Explanation Audit

Check the result sequence against Section 15.3:

1. The first result answers the tab's main engineering question.
2. Nominal and design capacities are labelled distinctly.
3. Governing limit state, axis, plane, direction, section/product and action basis are visible where needed to interpret the value.
4. Units appear once, use formal engineering typography and remain consistent through inputs, formulas and results.
5. Secondary results do not compete visually with the governing answer.
6. A utilisation ratio identifies both numerator and denominator and uses compatible ULS/SLS or project-value bases.
7. Calculation steps reproduce the actual active branch and current values; they are not static textbook text.
8. Visible result notes remain short. Detailed derivation, evidence and exclusions stay in folded panels.
9. Warnings tell the engineer what remains to be checked rather than merely saying the result may be inaccurate.

#### 15.19.10 Scope, Limitation and Safety Audit

Confirm the visible page and source panel state:

- what the page calculates;
- what assumptions are fixed;
- what the user must confirm;
- what limit states and project checks are excluded;
- whether the result is a capacity, action distribution, product value, selector output or warning-only screen;
- whether product/catalogue data is current, archived, indicative, `up to`, SWL, geometry-only or project-defined;
- whether combined actions, stability, fatigue, serviceability, durability, anchorage, connection transfer, geotechnical resistance or inspection remain outside scope.

Limitations must be specific enough to prevent predictable misuse but concise enough to preserve the handbook workflow. Do not compensate for an unclear scope by adding every possible design check.

#### 15.19.11 English, Terminology, Symbols and Reference Audit

Review all visible text and generated text:

- English-only UI using concise Australian engineering language;
- consistent component, material and limit-state terminology;
- correct `phi`, Greek symbols, subscripts, superscripts, primes and multiplication signs;
- formal units such as `mm²`, `mm³`, `mm⁴`, `MPa`, `kN` and `kNm`;
- no raw variable names such as `alpha_b`, `A_n` or `V*` in final visible text where formatted notation is intended;
- standard references use the complete pattern `[source] [reference type] [number]`, for example `AS 4100 Cl. 9.2.2.1`;
- clause, table, figure, section, catalogue and handbook references are not mixed or abbreviated inconsistently;
- headings, labels, warnings and captions use sentence case except deliberate tags such as `RESULTS`;
- helper text is reduced where it repeats the heading, selected summary or result note.

#### 15.19.12 Page Logic, Layout and Typography Audit

Review the page against Sections 15.2 to 15.6, including the state/dependency contract in Section 15.2.3, typography and layout contracts in Sections 15.4.1 to 15.4.3, responsive contract in Section 15.5.1 and colour contracts in Sections 15.6.1 to 15.6.4:

- compact brand header, grouped full-name navigation and immediate access to the active calculator;
- one clear tool title, not a repeated hero heading;
- engineering input row bands in dependency order;
- one selected-basis summary where useful;
- governing result before secondary aids and folded details;
- deterministic `Ready`, `Quick check active`, `Review required`, `Invalid input`, `Not evaluated` and `Source_Not_Verified` transitions where applicable;
- no decorative card nesting or empty custom cards;
- shared typography tokens and no tab-specific font scale;
- shared content width, spacing steps, card padding/radius and grid-density rules rather than tab-specific dimensions;
- consistent field labels, control height, radius, focus state and unit alignment;
- manual, lookup/override and read-only fields visually distinct without relying only on colour;
- all theme colours map through accent/dark/soft/panel roles; semantic status colours override the tab theme;
- adequate text and non-text contrast for default, hover, focus, selected, override, warning, fail and disabled states;
- no clipped labels, overlapping controls, unstable card heights or excessive empty space;
- figures remain compact, proportional and subordinate to the engineering workflow;
- source and limitation panels remain available without dominating the first screen.

Judge density by engineering scanning efficiency, not by fitting the maximum number of controls in one row.

#### 15.19.13 Responsive and Accessibility Audit

Test at minimum:

- wide desktop around `1440 px`;
- normal desktop around `1024-1040 px`;
- tablet around `768 px`;
- the narrow-layout boundary at `500 px`;
- phone around `390 px`;
- narrow phone around `320 px`.

At each relevant width confirm:

- no incoherent horizontal page overflow;
- active navigation remains visible and every tab remains directly reachable;
- input group order is unchanged;
- controls meet the shared height and phone font requirements;
- important labels do not collapse into one word per line;
- results stack without label/value/status overlap;
- tables have a deliberate scroll or mobile-field treatment;
- captions, symbols and dimensions remain readable and do not overlap geometry;
- collapsed details can be opened, read and closed;
- focus indication, keyboard navigation, labels, `aria-pressed` or valid tab-specific `aria-selected` states, `aria-live`, disabled states and contrast remain meaningful;
- phone mode hides or folds only secondary content and never changes calculation logic.

#### 15.19.14 Figure and Engineering Drawing Audit

Apply the figure rules and CAD-style acceptance checklist in Section 15.8. For each displayed asset confirm:

- stated drawing-accuracy class and purpose;
- source geometry or declared schematic status;
- proportional framing and stable viewBox/aspect ratio;
- correct section orientation, axis, load direction and dimension extension lines;
- minimum necessary dimensions and symbols only;
- consistent annotation font, size, line weight, arrowheads and caption style;
- no floating, crossed, duplicated or ambiguous labels;
- no use of the illustration as a numeric source unless it is explicitly value-driven and verified;
- separate mobile asset only where responsive scaling cannot preserve legibility;
- deterministic regeneration when a generator script owns the asset.

#### 15.19.15 Technical, Regression and Deployment Audit

Run the checks appropriate to the change:

- inspect `git status`, exact diff and changed-file ownership;
- check unresolved merge markers, duplicate HTML ids and missing DOM references;
- run JavaScript syntax checks with the available trusted runtime;
- parse generated SVG/XML and verify deterministic generator output;
- check UTF-8 text and replacement characters; distinguish terminal mojibake from file corruption;
- open every affected tab locally and inspect browser console warnings/errors;
- exercise representative interactions and the boundary/state matrix;
- verify no unrelated tab's default results or layout changed;
- confirm cache-busting asset versions where HTML, JavaScript, CSS or generated assets changed;
- after push, confirm remote `main`, published HTML, script/style asset versions, public hash routes and browser-rendered behaviour;
- confirm the local worktree is clean or explicitly list remaining unrelated files.

For the public GitHub Pages release:

- use the governed `.github/workflows/pages.yml` workflow as the Pages source;
- require the complete `tests/*.test.js` suite, production JavaScript syntax checks and `git diff --check` to pass before artifact upload;
- deploy the exact artifact produced after verification; do not rebuild or edit it between verification and deployment;
- do not use the legacy direct-from-branch Pages build for a normal public release because it can publish an unverified `main` commit;
- keep the visible `Public beta` state until Standards-content publication rights, repository terms, third-party notices, public limitations and feedback routing are all reviewed;
- record the workflow run, release commit, public Build label, cache keys and public-route verification in `REFERENCE_TRACEABILITY.md`.

No audit is complete because `git status` is clean, a formula looks familiar, or the default page renders. Evidence must cover the changed engineering branch and the changed interface state.

#### 15.19.16 Standard Audit Report Format

Report findings first, ordered by severity and tied to the affected tab, field, formula, source or file location.

Use these severities:

| Severity | Meaning | Typical action |
| --- | --- | --- |
| `P0 Critical` | Wrong or unsafe governing result, unit/sign/factor error, or false PASS | Remove or block the result until corrected |
| `P1 Major` | Material calculation, source, branch, stale-state or scope error that can mislead design use | Must correct before normal release |
| `P2 Moderate` | Page logic, traceability, terminology, warning or responsive defect with limited engineering impact | Correct in the next accepted update |
| `P3 Minor` | Consistency, density, typography or polish issue that does not change interpretation | Improve when touching the area |

The audit response must contain these sections, even when a section has no findings:

1. `Audit scope and version` - tab(s), files, branch/commit/build, standards and sources reviewed.
2. `Executive verdict` - suitable for quick-reference use, suitable with stated limitations, or not ready.
3. `Must modify` - P0/P1 items and release blockers.
4. `Should modify` - P2 items that improve page logic, traceability or professional use.
5. `Add` - missing warning, evidence, state, test or lightweight function genuinely required by scope.
6. `Delete or simplify` - duplicated text, unused input/output, misleading result, excess card or unnecessary calculation.
7. `Unclear / source gap` - questions and `Source_Not_Verified` items that cannot be resolved from available evidence.
8. `Verified - no change` - formulas, branches and layout areas independently checked and retained.
9. `Test matrix and evidence` - cases run, independent calculations, browser widths and source pages checked.
10. `Residual limitations` - remaining project checks and risks after accepted corrections.

Each actionable finding should state:

`ID | Severity | Tab/location | Current behaviour | Evidence/requirement | Engineering or user impact | Recommended action`

Keep recommendations proportional to the handbook. Prefer one clear warning or one verified lookup over expanding a tab into a full design engine.

#### 15.19.17 Audit Completion Gate

An audit may be described as complete only when:

- each audited tab/mode has a Section 2.5 workflow classification and follows the matching Section 15.2.2 page pattern;
- the full Section 2.4 logic chain has been reconstructed for each governing result, with non-applicable steps explicitly identified;
- every in-scope governing result has a current Section 6.2 calculation contract and stable `Calculation_ID`;
- every in-scope formula branch has a verified source status;
- governing formulas have independent numerical evidence;
- input dependencies and invalid states have been exercised;
- result/status semantics and limitations match the implemented scope;
- desktop and phone workflows have been checked;
- findings are classified into modify, add, delete/simplify, unclear and verified-no-change;
- unresolved source gaps and residual limitations are stated explicitly;
- no modification or deployment is claimed unless its separate verification has succeeded.
