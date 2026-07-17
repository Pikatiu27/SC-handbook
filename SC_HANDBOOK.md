# SC Handbook

`SC_HANDBOOK.md` is the only canonical project outline and rule file for this project. When the user refers to the project outline, total outline, handbook rules, or "总纲", use this file only.

## 1. Purpose

`SC Handbook` is a lightweight engineering lookup and calculation handbook. The current primary deliverable is the static web handbook. Workbook generation remains an optional output path when explicitly requested.

The handbook is intended for:

- Quick engineering lookup
- Basic design calculation and screening
- Transparent formula checking
- Clear source traceability
- Practical engineering warnings and limitations
- Offline-friendly sharing where practical

The current default deliverable is:

`index.html` with `app.js` and `styles.css`

Optional workbook deliverables, when requested, should remain consistent with the same rules and source traceability.

All project files, worksheet names, headings, field names, notes, and formulas must be written in English.

## 2. Core Rule

Every new lookup or calculation module must follow this sequence:

1. Define the engineering task
2. Identify the governing standard or reference
3. Extract source values into locked data or clearly documented constants
4. Write formulas with visible calculation steps
5. Build a clear user-facing lookup interface
6. Record all references in `REFERENCE_TRACEABILITY.md` or the workbook `References` sheet
7. Verify sample cases before adding the module to the handbook

No formula should be added only because it is convenient. Each formula must be traceable to a standard clause, table, source document, or clearly stated derived relationship.

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

- `C:\Users\silin\Documents\Codex\Reference`

All source references for this project must be stored in that folder. Do not keep duplicate reference PDFs, standards, catalogues, converted Markdown references, or technical sheets in the project workspace. If a source document is found in another project folder, move it into `C:\Users\silin\Documents\Codex\Reference` before treating it as a project reference.

The handbook is based primarily on Australian engineering standards, Australian design handbooks, and Australian manufacturer data.

Source priority:

1. Australian standards and official standard-based design requirements
2. Local reference files stored in `C:\Users\silin\Documents\Codex\Reference`
3. Manufacturer catalogues and design capacity tables stored in `C:\Users\silin\Documents\Codex\Reference`
4. Credible online sources from official bodies, industry organisations, manufacturers, or recognised technical publishers

Online sources must only be used when the local reference set does not contain the required information, or when an online source is needed to verify currency, errata, or publication status.

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
- `Clause`
- `Table`
- `Page`
- `Description`
- `File_Path`
- `URL`
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

## 8. Display Standard

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

Each module must include validation before it is treated as usable.

Minimum validation:

1. Check source references
2. Check units
3. Check at least one common example
4. Check edge cases
5. Scan for formula errors
6. Confirm locked cells and input cells
7. Confirm the sheet is readable without developer explanation

Formula error scan must check for:

- `#REF!`
- `#DIV/0!`
- `#VALUE!`
- `#NAME?`
- `#N/A`

## 10. Professional Handbook Rules

These rules apply to every user-facing lookup or calculation module.

### 10.1 Quick Start

Each user-facing tab must include a compact quick-start block near the top-left of the sheet.

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

Each module must include at least one example check before it is treated as usable.

Required fields:

- `Example_ID`
- `Input set`
- `Expected result`
- `Calculated result`
- `Difference`
- `Status`
- `Reference`

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

The workbook should remain readable in normal desktop Excel and mobile Excel.

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
2. Australian standard or source basis is identified
3. Source values are stored in a data sheet
4. User-facing sheet is readable without explanation
5. Inputs are validated where practical
6. Units are consistent
7. Assumptions are visible
8. Formulas are visible and auditable
9. Source references are recorded
10. At least one example check is included
11. Formula error scan is clean
12. Module status is set correctly

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

- `C:\Users\silin\Documents\Codex\Reference`

The project workspace should not contain active source reference files. If `reference/` or `Tech sheet/` exists, treat it as non-canonical and keep it empty unless the user explicitly asks for a temporary staging area.

Generated outputs, temporary extraction folders, and builder scripts may be updated as part of workbook generation.

## 13. First Module: Bolt Capacity

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
- `d_h` is the actual hole diameter.
- `d_f` is the nominal bolt diameter.
- `e - d_h/2` is the clear distance from the hole edge to the ply edge.
- `a_e` is the edge-distance parameter used for the edge-limited ply bearing expression in AS 4100 Cl. 9.2.2.4(2). In this handbook, calculate it as `a_e = e - d_h/2 + d_f/2` unless a project-specific standard interpretation requires otherwise.
- Do not substitute the minimum edge distance `e` from AS 4100 Table 9.5.2 directly into the edge-limited bearing formula without identifying the symbol conversion.
- Do not substitute the clear hole-edge distance `e - d_h/2` directly for `a_e`.

These formulas must be checked against the source references before issue-for-design use.

## 14. Future Modules

Candidate future modules:

- `Unit_Conversion`
- `Material_Properties`
- `Section_CHS`
- `Section_SHS_RHS`
- `Weld_Capacity`
- `Plate_Bearing`
- `Member_Check`

Each future module must follow this file before workbook implementation starts.

## 15. Static Web Handbook Rules

These rules apply when a handbook module is implemented as a static web tab.

The web page is still part of `SC Handbook`. It must follow the same source hierarchy, engineering language, formula traceability, and validation standard as the workbook. The web version should be a fast engineering lookup interface, not a full design report generator.

Web outline map:

- `15.0` is the working checklist for any web edit, review, commit, or push.
- `15.1` to `15.3` define product logic, tab structure, and result hierarchy.
- `15.4` to `15.6` define visual format: typography, responsive layout, mobile behaviour, and colour system.
- `15.7` defines symbols, formulas, source references, and project-file responsibilities.
- `15.8` defines input layout, editable-field behaviour, figure/chart rules, CAD-style drawing rules, and page annotation rules.
- `15.9` defines warning and limitation style.
- `15.10` onward defines tab-specific engineering scope, formula boundaries, display rules, and exclusions.
- `15.17` defines local update, commit, push, and GitHub Pages verification workflow.

When editing the web app, use the global web rules first, then the affected tab-specific section. If a layout, notation, drawing, warning, or input rule is intended to survive beyond one edit, record it here rather than only in CSS, JavaScript, or a chat note.

### 15.0 Current Web Implementation Checklist

Use this checklist before editing, reviewing, committing, or pushing any web-tab work:

1. Confirm the active app root is the current `SC Handbook` checkout and the affected files are `index.html`, `app.js`, `styles.css`, any scoped tab module such as `rock-anchor-selector/app.js`, and, where durable rules changed, `SC_HANDBOOK.md`.
2. Keep the UI English-only and use Australian engineering language.
3. Check the local reference folder first: `C:\Users\silin\Documents\Codex\Reference`.
4. If the governing source cannot be found or read, tell the user and mark the item `Source_Not_Verified`; do not present it as checked.
5. Keep the web page a quick-reference handbook, not a full design engine. Add clear limitations instead of forcing complex topology into the page.
6. Use the standard web order: inputs, selected-item summary, main capacity result, detailed checks, calculation basis and limitations.
7. Main capacity titles may use the `RESULTS` tag; detailed-check headings should not repeat it when it makes the hierarchy noisy.
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

Each tab should answer:

- What standard item or design option should I start with?
- What is the quick design capacity or governing check?
- Which project-specific checks remain outside this quick-reference tool?

Do not turn a web tab into a full textbook, long tutorial, report writer, or complete design engine.

### 15.2 Web Tab Structure

Use one static app with multiple short tabs.

Current core tabs:

- `Bolt Capacity`
- `Axial Member`
- `Beam Section`
- `Weld Capacity`
- `Pad Section`
- `Screw Piles`
- `Rock Anchor`

Current tab register:

| Tab | Short nav label | Role | Source status | Publish posture |
| --- | --- | --- | --- | --- |
| `Bolt Capacity` | `Bolt` | AS 4100 bolt / ply quick capacity and demand screen | For Review with checked core clauses | Active quick-reference tab |
| `Axial Member` | `Axial` | AS 4100 axial member compression / tension quick screen | For Review with checked core clauses and catalogue rows | Active quick-reference tab |
| `Beam Section` | `Beam` | AS 4100 UB/UC and symmetric custom I-section section-capacity lookup | For Review with checked core clauses and catalogue rows | Active quick-reference tab |
| `Weld Capacity` | `Weld` | AS 4100 weld throat-capacity lookup and drafting aid | For Review with checked core clauses | Active quick-reference tab |
| `Pad Section` | `Pad` | AS 3600 rectangular strip flexure and one-way shear quick screen | For Review with checked core clauses | Active quick-reference tab |
| `Screw Piles` | `Screw` | Product selector and quick pile action-distribution aid | For Review with product-source basis and stated exclusions | Active quick-reference tab |
| `Rock Anchor` | `Rock` | Product selector and quick rock-anchor lookup aid | For Review with product-source basis and stated exclusions | Active quick-reference tab |

Future tabs may include:

- `Plate Capacity`
- `Base Plate`
- `Section Properties`
- `Connection Checks`

Tab rules:

- One tab = one engineering topic.
- One topic can contain closely related calculators.
- Do not mix unrelated checks in the same visual block.
- Keep tab names short and direct.
- Page title and UI labels must be English.
- Navigation labels may be shorter than full tab names when the tab count makes the top navigation crowded. Use short labels such as `Bolt`, `Axial`, `Beam`, `Weld`, `Pad`, `Screw`, and `Rock` in the tab bar, then show the full tool name in the tool heading.
- The active tab must be visually stronger than inactive tabs: filled pill background, tab theme colour, heavier font weight, clear border or shadow, and `aria-selected="true"`. Do not rely on font weight alone.
- Inactive tabs should remain readable but visually quieter. Avoid making every tab bold, large, and high-contrast at the same time.
- Desktop tab navigation should stay one compact toolbar where practical. If more than about seven or eight active tabs are added, introduce domain grouping or a tool selector rather than letting the toolbar become a dense multi-row block.
- Phone tab navigation should use horizontal scroll with direct access to every tool. Do not force all tabs into a tall wrapped block above the calculator.

Page-level layout order:

1. Compact header with brand only.
2. Short page intro only where useful; do not use a marketing hero.
3. Horizontal tab navigation.
4. Active tool panel.

Per-tab layout order:

1. Tool heading: discipline / standard note, tab title, review status.
2. Input area: engineering row bands grouped by purpose.
3. Summary strip: selected item, current assumptions and key intermediate values.
4. Main results: governing capacity, utilisation, PASS / FAIL / CHECK status.
5. Secondary aids: compact tables, symbols, figures or warnings that support quick lookup.
6. Folded details: calculation steps, evidence notes and source limitations.

Do not place decorative cards, large hero blocks or explanatory feature text above the active calculator. The engineer should reach the first meaningful input quickly on desktop and phone.

### 15.3 Web Result Layout

Every web calculator should use the same result structure:

1. `RESULTS <Main capacity>`
2. `<Detailed checks>`
3. `Calculation basis and limitations`

Use title hierarchy, spacing and panel weight to show importance. Keep `RESULTS` on the main capacity title when it helps identify the output block, but do not repeat the badge in front of every detailed-check title when it makes the calculator hierarchy noisy. A detailed-check block may be collapsible, but it should still read as the same importance level as the main capacity block when it contains core connection or member checks.

For bolt capacity:

- `RESULTS Bolt capacity`
- `Detailed connection checks`
- `Calculation basis and limitations`

For member capacity:

- `RESULTS Member capacity`
- `Detailed member checks`
- `Calculation basis and limitations`

The first block shows the governing answer. The second block shows secondary checks and intermediate capacities. The third block gives source clauses, assumptions, exclusions, and limitations.

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

- The primary web target is a normal desktop browser. Phone and tablet layouts must adapt cleanly, but desktop web should not be compromised by mobile-only density decisions.
- Use shared CSS font variables across every tab.
- Keep member-page typography aligned with bolt-page typography.
- Input controls such as `Bolt Size M24` and `Bolt Category` should use the same size and weight.
- Do not create a new font scale for every tab.
- Avoid all-caps except for small tags such as `RESULTS`.
- If helper text is important enough to show, it must be readable on phone.
- Summary strips such as `Selected member` should use clear stacked rows when the label/value block and metric block would otherwise stretch to opposite sides of a wide web card.
- Cards should represent real workflow groups or repeated results, not general page decoration. Do not put cards inside cards unless the inner item is a collapsed details panel, repeated result card, or compact table row that has a distinct purpose.
- Desktop layouts may use horizontal field rows inside one engineering group, but different engineering groups should stack vertically in a predictable order.

### 15.5 Mobile Layout Rules

The web layout must work on phone, tablet, and desktop.

Mobile rules:

- If one row cannot display cleanly, wrap to two rows or one column.
- Never force small controls, result chips, formula tags, or tab buttons into one crowded row.
- On phone width, use single-column input grids unless two fields are clearly short and readable.
- Tab buttons may wrap to two rows.
- Result cards should stack vertically if three cards cannot fit comfortably.
- Avoid horizontal scrolling except for unavoidable tables.
- Keep minimum touch target height around 40-46 px for selects, inputs, and tab buttons.
- When the phone tool navigation overflows horizontally, automatically bring the active tool tab fully into view. A direct hash link must never leave the selected tool off-screen.
- Keep public hash routes stable. User-facing aliases such as `#pad` may map to an internal panel name, but existing shared links must not silently fall back to another tool.
- The published footer must show a neutral build identifier, version, date, or commit reference. Do not label the public page as a `local` build.

Detailed-check rows must not remain as rigid desktop grids on phone. For cards with a label, value, status chip, and note, use a phone layout such as:

- row 1: label across the full width;
- row 2: value on the left and status chip on the right;
- row 3: clause note or derived-value note across the full width.

Do not allow important labels such as `Minimum edge distance - AS 4100 Table 9.5.2` to collapse into one word per line. If this happens, change the mobile grid rather than reducing the font below the standard small-text level.

Keep repeated notation compact. If the selected callout already explains a symbol distinction, do not repeat the same explanation as several full-width phone chips.

Do not keep a visible `Device Preview` option in the final page. Responsiveness should be built into the CSS.

### 15.6 Web Colour System

Use a macaron / pastel colour system. The page should feel light and active, but still technical and readable.

Current direction:

- Bolt tab: pastel green.
- Member tab: pastel blue.
- Reference/source notes: pale warm yellow.
- Background: warm off-white.
- Text: dark neutral, not pure black.

Each tab should have its own colour layer:

- active tab colour;
- tab panel background;
- primary accent colour;
- soft result-card background;
- border colour.

Input colour must communicate editing responsibility consistently across all tabs:

- Fully manual / project-required inputs use the tab's light accent fill so the user can see what normally needs project confirmation.
- Auto-filled but editable lookup / override values use a grey-tinted version of the tab accent. The field must look available for editing, but less demanding than a manual project input. Examples include table-selected `f_y`, `f_u`, `r`, `k_f`, `alpha_b`, `k_t`, `k_r`, `k_h` and other cited defaults that can be overridden.
- Read-only derived values use a neutral pale grey and should not look like normal required inputs. Examples include calculated stress-block factors, auto net area while locked, calculated capacity factors and disabled controls.
- Warning, invalid and fail states keep the standard yellow/red status colours rather than adopting the tab theme.

Do not rely only on colour to communicate engineering meaning. Status text such as `PASS`, `FAIL`, `Governing`, or `Not applicable` must be visible in words.

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
- Do not write long standard titles in every result card.
- Put detailed source explanation in `Calculation basis and limitations`.
- Use clause references near warnings only when they help the engineer know what to check next.

Related project files:

- `SC_HANDBOOK.md` is the only project outline and rulebook. Update it for durable scope, UI, terminology, calculation-boundary and formatting rules.
- `README.md` is the public project summary. Keep it short and user-facing; do not duplicate detailed audit tables there.
- `REFERENCE_TRACEABILITY.md` is the source evidence register. Put visual-check status, PDF page evidence, row-level checks and remaining source gaps there.
- Source PDFs, converted Markdown packs and technical sheets live only in `C:\Users\silin\Documents\Codex\Reference`. Do not create a second reference folder inside this repo.

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
- For `Custom / Built-up properties` inputs, keep the same engineering card sequence and switch fields inside each card. User-defined effective section properties and effective lengths belong in `Section properties`; custom `k_f` and `alpha_b` values belong in `Relevant factors`. Do not add separate custom-only cards unless the value group has a different engineering purpose.
- Keep fully manual project inputs visually distinct from values selected from a lookup table, derived by the app, or defaulted from a cited source but still editable.
- Fully manual inputs include design actions, actual dimensions, effective length, net area, material strengths entered from project documents, and connection-specific values.
- Lookup / derived / overrideable inputs include catalogue section selection, standard category selection, table-based factors, default correction factors, and editable factors such as `alpha_b`, `k_t`, `k_r`, or `k_h` when the page provides a cited default or lookup basis.
- Overrideable section and material values must stay inside their engineering groups. For example, an editable radius of gyration `r` belongs with `Section properties`, while editable `fy` and `fu` belong with `Material properties`; do not create a separate override strip unless the override is cross-cutting and cannot be grouped cleanly.
- Read-only calculated design factors must not be presented as editable project inputs. Put them in a `Derived values` row only when they are genuinely useful in the main workflow; otherwise show them in calculation steps or a folded details panel.
- Connection-specific net-section inputs should use their own `Connection / net-section inputs` or `Connection / detailing inputs` row. Do not mix `A_n`, `k_t`, bolt-hole counts, hole diameter or net-path thickness into section, material or compression-factor rows.
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
- Phone tabs may become a horizontal scroll control. Preserve direct access to every tool, but avoid a tall two-column tab block at the top of the page.
- Phone images and diagrams must remain small reference cues only, approximately three to four lines of body text high. Captions must use the same caption typography as desktop and may be shortened by layout, not rewritten into informal text.

Reduction-factor inputs:

- If a web calculator includes a factor that is not directly selected from a cited Standard clause, table, manufacturer table, or handbook design model, label it as a project or user-entered factor.
- State the default value and make clear that the factor must remain at the default unless the project design model, WPS review, fatigue/detailing requirement, or engineer's calculation justifies another value.
- Do not imply that a project factor is an automatic AS 4100, AS/NZS 1554.1, or manufacturer-table value.
- For weld checks, `k_r` must not be treated as a free project factor when it is being used for AS 4100 welded lap connections. If included, calculate and label it from AS 4100 Table 9.6.3.10(B), and only apply it when the user confirms the weld is a welded lap connection.

Web engineering figure and chart rules:

- Figures, diagrams, sketches, and charts must support fast engineering lookup. They should read like journal-quality engineering schematics, not marketing graphics, decorative illustrations, or oversized publication figures.
- The web target is screen reading on phone, tablet, and desktop. Do not apply IEEE, Nature, Elsevier, or other print-publication sizing rules such as single-column inch widths, DPI targets, or EPS/PDF-first export unless the task is explicitly to produce a publication or report figure.
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
- Publication-style or research-style figures may use a larger display size, but should usually be placed in a collapsed `details` panel or shown as a compact preview with an expandable view. A typical expanded web display target is about 320 to 360 px maximum height on desktop and about 220 to 260 px maximum height on phone.
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
- For PASS / FAIL / CHECK or governing result graphics, show the text status visibly. Colour is secondary.
- For generated bitmap assets, keep the source script or generation method traceable where practical, and export at a resolution suitable for the displayed web size. Do not use large bitmap files when a compact SVG or Canvas drawing is sufficient.
- Figures copied or redrawn from standards, handbooks, catalogues, or online sources must follow the source hierarchy and copyright rules below. A drawing used as a visual guide must not become the source of numeric properties unless the source explicitly provides those values.
- If a figure cannot be verified against a standard, handbook, manufacturer document, or accepted project convention, label it as a draft visual guide or leave it out.
- Existing or inherited page figures are not automatically compliant with this drawing standard. Before describing any figure as CAD-style, proportional, value-driven, or source-checked, review it against the drawing-accuracy class, annotation rules, source basis, and desktop/phone layout checks in this section.

Technical diagram and symbol rules:

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

CAD technical drawing rules:

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
- CAD-style drawings should be reviewed against this acceptance checklist:
  - The figure purpose is clear and limited to one calculation idea.
  - The accuracy class is stated or obvious from context.
  - Symbols match inputs, formulas, and source notes.
  - Numeric labels come from the same data as the calculation.
  - Line types and line weights follow the shared CAD style.
  - Units and rounding are consistent with the calculator.
  - Labels do not overlap geometry or each other on desktop or phone.
  - The caption/source note states the limitation and source basis.

Page annotation rules:

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

Drawing implementation tools:

- No external CAD package is required for the web handbook standard. The preferred implementation stack is deterministic SVG generated by JavaScript or small repository scripts, shared CSS drawing classes, and browser viewport checks.
- Use Python scripts only for repeatable generated SVG assets where a script is clearer than hand-editing SVG. Keep the script in the repository when the generated asset is committed.
- Use a browser screenshot or DOM inspection check before publishing any new or revised drawing. A drawing change is not complete until desktop and phone widths have been visually checked.
- Use full CAD software only when importing or comparing against project drawings, not for routine handbook schematic generation.

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

Bolt result checks should include:

- Bolt shear capacity.
- Bolt tension capacity where relevant.
- Bolt bearing on connected ply.
- Edge tear-out / ply tearing.
- Minimum edge distance check.
- Governing connected-ply capacity.
- Demand-ratio reporting must separate the limit states: shear-only demand checks bolt shear under AS 4100 Cl. 9.2.2.1 and connected-ply bearing / edge tear-out under AS 4100 Cl. 9.2.2.4; tension-only demand checks bolt tension under AS 4100 Cl. 9.2.2.2; combined shear and tension checks bolt interaction under AS 4100 Cl. 9.2.2.3 while still checking connected-ply bearing separately. The UI must state whether bolt shear, bolt tension, bolt interaction, or connected ply governs.
- The main result should show one final `Governing capacity check` ratio only. Put supporting ratios, including the AS 4100 Cl. 9.2.2.3 combined bolt interaction ratio, in calculation steps rather than as competing primary result cards.
- The default connected-ply tensile strength should not be an orphan number. Use f<sub>up</sub> = 410 MPa only as the AS/NZS 3678 Grade 250 plate default; use 440 MPa only for verified AS/NZS 3679.1 Grade 300 flat bar/section or another stated source.

U-bolt product lookup branch:

- Treat U-bolt lookup as a manufacturer product branch inside the Bolt tab, not as an AS 4100 ordinary bolt-capacity calculation path.
- For telecom headframe use, filter in this order: application, rod size, fit diameter or member range, finish/environment, brand or manufacturer, then product. Default the common screen to M12 and outdoor HDG products.
- Follow the Standard bolt branch layout: grouped inputs, one selected-product confirmation strip, one primary published-product result, then one collapsed basis-and-limitations panel.
- Split the six U-bolt selectors into two three-field groups: `Project requirement` for application, rod size and fit; `Product source` for finish, brand or manufacturer, and catalogue entry. For custom manufacture, change the latter labels to `Manufacturing source` and `Manufacturing entry`.
- Keep the selected-entry strip compact. Show `Product reference`, `Rod size`, `Member fit`, `Finish` and `Supplier`; place brand or manufacturer and series in the supporting line. Put additional manufacturer-stated geometry and material/coating in one collapsed `Published dimensions and material` row without repeating the confirmation values.
- Where only one published product load is reported, use one full-width horizontal result rather than a single narrow card in a three-column result grid.
- Show source status once in the result heading. Do not repeat lookup/status tags below the primary result.
- In U-bolt mode, replace the AS 4100 bolt-capacity page identity with `U-bolt Product Lookup`, `U-bolt products · manufacturer data` and `Manufacturer data · no design capacity`. Use `PRODUCT DATA`, not `RESULTS`, for the primary manufacturer-data section.
- Keep mounting-pipe / round-member products separate from beam or channel clamp assemblies. Main headframe-to-monopole clamps are OEM or project-engineered assemblies and are outside the standard-product lookup.
- Required row fields are brand or manufacturer, supplier, product family, product code, thread or rod size, pipe/tube fit, material/finish, published capacity, capacity direction and source status.
- Keep catalogue brands separate from supply channels. Use `Brand / manufacturer` for the filter and show `Supplier` independently in the selected-entry confirmation strip. Where no supply channel is explicitly supported by the source record, display `Not specified`; do not substitute the manufacturer name.
- Use a separate `Custom / project-manufactured` application for traceable made-to-order U-bolts. Do not present custom manufacturing capability as a stocked product or published capacity.
- Show published capacity only where the manufacturer source states a rated load, working load, WLL, SWL, recommended load or equivalent basis.
- Label each value using its published basis, such as `Manufacturer working load` or `Manufacturer-rated load`. Where no value is published, show `No rated load published`; do not use a generic capacity label that implies design resistance.
- Where a manufacturer publishes a working load but its direction or assembly applicability has not been verified, display the published value and basis but do not calculate an action ratio.
- Do not show generic N*, V* or M* inputs, or a utilisation ratio, in the product-lookup branch. Project actions cannot be compared until the manufacturer load condition and action basis are both verified.
- If a future manufacturer record provides a directional allowable load, any comparison must use a compatible project action basis and the matching published load condition. Do not compare ultimate design actions directly with Working Load or ASD Allowable Load.
- Keep the priority project checks concise within the collapsed basis-and-limitations panel: U-bolt and thread strength, leg-force distribution and bend effects; clamp slip, contact and local bearing/crushing; attachment details and prying; fatigue, corrosion, installation and inspection.
- If no published capacity is available, show `No published rated capacity` or `Not published`, mark the item `Source_Not_Verified`, and do not report an action ratio.
- Do not derive U-bolt product capacity from AS 4100 ordinary bolt shear or tension equations. Those checks belong to the connected steelwork or fastener components where applicable.

Minimum edge distance and ply checks should reference AS 4100 terminology and clause/table language, not generic web-calculator labels.

For the web bolt tab, separate the edge-distance terms visibly:

- Input label: `e` = critical bolt centre to the selected physical edge.
- Input label: `d_h` = actual hole diameter.
- Input control: `a_e basis` = `Automatic · end edge / pitch` or `Manual · connection drawing`.
- Result label: `Minimum edge distance, e - AS 4100 Table 9.5.2`.
- For equal holes aligned with the force, calculate `a_e,end = e - d_h/2 + d_f/2` and `a_e,pitch = p - d_h + d_f/2`, then use the lesser value.
- For angled edges, corners, non-collinear holes or other drawing-derived geometry, require a manual `a_e`.
- Explain that `e - d_h/2` is the clear distance from hole edge to ply edge, but it is not the same displayed symbol as `a_e` in the bearing expression.
- Keep the lightweight connected-ply check on a critical-hole basis. Assume concentric shear and equal bolt sharing, calculate `V_b,bolt* = V*/n`, and compare it with the lesser of the full-bearing and edge-limited capacities at the critical bolt hole.
- Under that equal-action premise, use `phi Vb,group = n * MIN(phi Vb,full, phi Vb,edge)` for the critical bolt hole. Do not add a separate `Bolts on edge line` input.
- Present `n` times the critical-hole capacity as the equal-share connected-ply group capacity; keep the single-hole values in Calculation steps.
- Do not calculate net-section rupture, actual tear-out paths, block shear, eccentric bolt-group reactions, overlapping failure paths or minimum bolt spacing.

### 15.11 Member Web Tab Rules

The member tab should use AS 4100 member-design language.

Current member calculators:

- `CHS`
- `Equal Angle`
- `PFC`
- `Rod`
- `Custom / Built-up properties`

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

For the current CHS quick screen, keep the lightweight strategy: use nominal CHS `D` and `t` from the Australian product catalogue context, derive `A_g` and `r` by transparent circular hollow-section geometry, and apply the AS 4100 member-capacity method. Do not replace this with Austube / Orrcon table capacity values unless the scope changes to a row-checked hollow-section capacity-table lookup. The page must state that CHS values are formula-derived from nominal size and are not a certified table-capacity extraction.

#### 15.11.1 Member Calculation Basis

Connection- and axis-dependent terms must stay explicit:

- Use table-derived default `alpha_b` values where the selected section family and embedded `k_f` condition match AS 4100 Table 6.3.3. Apply Table 6.3.3(A) when `k_f = 1.0` and Table 6.3.3(B) when `k_f < 1.0`. For the current member tab, this means cold-formed non-stress-relieved CHS = -0.5, PFC with `k_f = 1.0` = 0.5, Equal Angle with `k_f = 1.0` = 0.5, Equal Angle with `k_f < 1.0` = 1.0 as `other sections not listed` in Table 6.3.3(B), and Rod / solid round bar with `k_f = 1.0` = 0.5 as `other sections not listed` in Table 6.3.3(A). State the table row in the lookup panel and calculation steps. Do not ask the user to manually choose `alpha_b` unless the page provides an explicit advanced override for a different table row, axis, fabrication condition, or `k_f` case.
- AS 4100 Cl. 6.2 compression section capacity must be written as `N_s = k_f A_n f_y`, with design capacity `phi N_s = 0.90 k_f A_n f_y`. Do not replace `A_n` with `A_g` in the displayed formula. Catalogue examples and unholed member tables may calculate the same value using `A_g` only because `A_n = A_g` for an unperforated section. The calculation steps must state this assumption when no holes or penetrations are entered.
- Calculation examples should make the area basis explicit: `no holes: A_n = A_g`; `straight-line hole deduction only: A_n = A_g - n_h d_h t`; `manual net area: A_n` is user/project verified. Keep these examples short and use them to explain the limitation, not to expand the tab into a full connection-design tool.
- Treat radius of gyration `r` as an axis-dependent compression input. AS 4100 slenderness uses `L_e/r` about the checked buckling axis; therefore a one-axis quick check may default to the governing catalogue/geometry value such as `r_min`, but the default must be visible and editable. CHS and Rod defaults may be geometry-derived because the radius is the same about any centroidal axis. EA/PFC defaults should state the catalogue/quick-check basis. Custom / Built-up properties input should keep separate `r_x`, `r_y`, `L_ex` and `L_ey` and report the governing axis.
- Do not imply `k_f` is automatically derived from simplified custom family geometry unless the AS 4100 form-factor calculation is explicitly implemented. If custom Equal Angle dimensions are entered, state the current `k_f` source and require verification for slender angle geometry.

#### 15.11.2 Selected Member Summary

The `Selected member` strip is a quick geometry and assumption lookup. It should stay compact and use one consistent display pattern.

- Always identify the actual `r used` for `L_e/r`, even when `r_x` and `r_y` are also shown.
- If embedded catalogue data only has a quick governing radius rather than verified `r_x/r_y`, show `r_x/r_y` as the current quick basis or user-entered values, not as certified manufacturer table values.
- CHS should show `D`, `t`, `A_g`, `r_x = r_y`, `I_x = I_y`.
- Rod should show `d`, `A_g`, `r_x = r_y`, `I_x = I_y`.
- Equal Angle should show `b`, `t`, `A_g`, `r_x`, `r_y`, `I_x`, `I_y`, `r used`.
- PFC should show `d`, `b_f`, `t_w`, `t_f`, `A_g`, `r_x`, `r_y`, `I_x`, `I_y`, `r used`.
- Write dimensions as one clear parameter line with equals signs and units, for example `d = 150 mm; b_f = 75 mm; t_w = 6.0 mm; t_f = 9.5 mm`, rather than using dot-separated shorthand.
- Where only `A_g` and `r` are embedded for Equal Angle catalogue rows, display `I = A_g r²`.
- Where PFC catalogue inertia is embedded in `×10^6 mm^4`, convert it before display.

#### 15.11.3 Member Inputs and Overrides

- `f_y` and `f_u` may default from the selected material grade, manufacturer table or product standard, but keep them editable where project certificates, thickness ranges or product-specific values may govern. If the user overrides them, calculation steps must show the current values and state that `k_f`, `alpha_b` and catalogue geometry remain tied to the selected section / lookup basis unless separately changed.
- Do not imply `A_n` is known from the catalogue section alone; it must come from the actual connection net section.
- For EA/PFC net-section checks, provide a lightweight straight-line bolt-hole deduction option (`A_n = A_g - n_h d_h t`) using the selected angle thickness for EA. Label this as a straight-line deduction only. For PFCs, show catalogue `t_w` / `t_f` from the manufacturer table, default the net-area deduction thickness to `t_w`, and allow manual override where the net path passes through the flange or a connected element.
- Keep a manual `A_n` override for staggered holes, slots, cope cuts, multiple net-section paths, or any topology-dependent connection geometry.
- Display net-section values in a `Connection / net-section inputs` row, separate from section properties, material strengths and compression reduction factors.
- Use `k_t = 1.00` only where the end connection satisfies AS 4100 Cl. 7.3.1 uniform force distribution.
- For eccentric tension connections, use AS 4100 Table 7.3.2. Current quick defaults: Equal Angle one-leg connection `k_t = 0.85`; PFC/channel eccentric quick default `k_t = 0.85` unless the actual Table 7.3.2 case supports `0.90` or `1.00`; unequal angle connected by the short leg `k_t = 0.75` when that case applies. Keep `k_t` editable and project-confirmed.
- Where the member tab reports utilisation, keep compression and tension design actions as separate optional project inputs (`N_c*` and `N_t*`). Do not use a single action-type selector; report `N_c* / phi N_c`, `N_t* / phi N_t` and the governing utilisation ratio without implying the actions act simultaneously.

#### 15.11.4 Custom Member Geometry

- `Custom / Built-up properties` member input may use user-entered effective properties directly: `A_g`, `r_x`, `r_y`, `k_f`, `alpha_bx`, `alpha_by`, `L_ex`, `L_ey`, `f_y`, `f_u`, `A_n` and `k_t`.
- Treat this mode as a verified section-property-calculation quick check. If the source report gives `I_x` and `I_y`, the user should enter `r_x = sqrt(I_x / A_g)` and `r_y = sqrt(I_y / A_g)`.
- Hide catalogue section-guide imagery in this mode because no standard section geometry is being selected.
- Calculate compression about both entered axes and report the governing `phi N_c`.
- State clearly that the source section calculation, connector spacing, individual component slenderness, shear deformation, torsional/flexural-torsional buckling, local buckling derivation and connection eccentricity are not verified by the web tab.
- CHS / Equal Angle / PFC / Rod may include a family-specific dimension override inside the Section properties card.
- Keep family-specific dimension override collapsed by default: show only one concise `Custom dimensions` checkbox without a repeated heading or explanatory subtitle, and expand the dimension inputs and geometry note only after it is selected.
- The family override must feed the same member-capacity workflow (`A_g`, `A_n`, `r_x`, `r_y`, `r used`, `k_f`, `alpha_b`, `L_e`, material strengths and `k_t`) instead of creating a separate calculation path.
- CHS and Rod geometry derive `A_g`, `r_x = r_y` and `I_x = I_y` from circular geometry.
- Equal Angle and PFC custom dimensions derive `A_g`, `r_x` and `r_y` automatically from simplified rectangular component geometry; do not ask the user to manually enter `r_x/r_y` for these family overrides.
- State that fillets/root radii and full manufacturer table properties are not reconstructed by the browser.

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

### 15.12 Beam Section Web Tab Rules

The beam tab is a lightweight AS 4100 section-capacity check. It is not a full beam or member design engine.

Use this scope:

- Hot-rolled Universal Beam and Universal Column catalogue sections.
- Custom symmetric I-section input when catalogue data is not available.
- Major-axis section moment capacity only.
- Major-axis web shear capacity only.
- Optional design actions `M*` and `V*`, folded below the main capacity result.
- Section utilisation based on the governing of `M* / phi Ms` and `V* / phi Vv`, reported only inside the folded design-action review.

Use Australian product data first. For UB/UC sections, section properties and dimensions should come from OneSteel / InfraBuild hot-rolled product tables wherever possible. Catalogue data may define availability, `d`, `bf`, `tw`, `tf`, `d1`, `Ag`, mass, `Sx`, `Zx`, `Zex`, compactness and `kf`; design equations still need to trace back to AS 4100.

Required AS 4100 basis:

- Section moment capacity uses AS 4100 Cl. 5.2: `Ms = fy Ze`; report `phi Ms` with `phi = 0.90`.
- Catalogue `Zex`, compactness and `kf` may be taken from the section-capacity table instead of recalculating plate slenderness in the browser.
- The selected-section summary should automatically show catalogue or generated section-property values only: dimensions, mass, `Ag`, `Aw`, `Sx`, `Zx`, `Zex`, `fy`, `kf` and compactness. Do not repeat capacity basis or the web-slenderness screen in the selected-section strip; keep those in calculation steps and basis text.
- Keep the UB/UC/custom section guide inside the selected-section summary as a compact visual cue. Do not keep a separate first-screen section-guide card unless a future reference guide needs more detail.
- Keep the main result cards limited to design section moment capacity `phi Ms` and design section shear capacity `phi Vv`. Plastic-limit or elastic-yield references belong in calculation steps, not as peer result cards.
- Web shear area for catalogue UB/UC sections is `Aw = d1 tw`, using catalogue clear web depth between flanges and web thickness.
- Web shear yield starts from AS 4100 Cl. 5.11.4: `Vw = 0.6 fy Aw`; report the design value with `phi = 0.90`.
- For catalogue UB/UC rows, apply a lightweight unstiffened-web shear-buckling screen from AS 4100 Cl. 5.11.5 using `lambda_w = (d1/tw) sqrt(fy/250)` and `alpha_v = 1.0` where `lambda_w <= 82`, otherwise `alpha_v = (82/lambda_w)^2`. Report `phi Vv = phi alpha_v Vw`. This is a quick screen using catalogue `d1` and `tw`, not a substitute for stiffened-web, non-uniform shear, transverse-load or detailed web-panel design.
- Apply the AS 4100 Cl. 5.12.3 reduced-moment method when both major-axis moment and web shear are entered. Use `Vvm = Vv` where `M* <= 0.75 phi Ms`. For `0.75 phi Ms < M* <= phi Ms`, use `Vvm = Vv[2.2 - 1.6M*/(phi Ms)]`, then check `V* <= phi Vvm`. Report the governing of `M*/(phi Ms)` and `V*/(phi Vvm)`. Do not present `0.60 phi Vv` as a direct code threshold.

Custom section mode must stay explicit and conservative:

- Custom inputs should be dimensions only for the current lightweight page: `d`, `bf`, `tw`, and `tf` for a symmetric I-section, plus the shared steel-grade and design-action inputs.
- Generate `Ag`, `Aw`, mass, `Ix`, `Zx`, `Sx`, `Zex`, web slenderness, `alpha_v`, `phi Ms` and `phi Vv` from those dimensions.
- For custom symmetric I-sections, use `Zex = Zx` as a conservative elastic section basis unless the full AS 4100 plate compactness / effective-section calculation is implemented. Do not automatically claim compact plastic capacity from geometry alone.
- Custom web shear-buckling screening may use `d1 = d - 2tf` and `tw` for the current ideal unstiffened-web screen, but fillets, weld access holes, asymmetric geometry, stiffeners, reduced webs, holes, copes and non-uniform shear stress distribution remain project checks.
- Keep the custom labels tied to the selected-axis section capacity, not a whole-member design.

Required exclusions:

- Member moment capacity `Mb`.
- Lateral-torsional buckling.
- Restraint spacing.
- Minor-axis bending.
- Biaxial bending.
- Axial load interaction.
- Web bearing and web buckling under concentrated forces.
- Web stiffener design.
- Cope cuts, penetrations, large holes or reduced web areas.
- Torsion.
- Composite action.
- Fire.
- Deflection and vibration.

The Beam tab may include UB/UC section guide drawings inside the selected-section summary, but they are visual guides only and must not be treated as numeric data sources.

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

- For fillet weld and IPBW, the main quick result should remain `kN/mm per weld line`; total capacity is secondary.
- State that effective weld lines are not welding passes.
- CPBW, IPBW and compound welds require project-confirmed joint preparation, WPS, inspection and acceptance criteria. IPBW additionally requires a specified design throat. CPBW and compound selections must not display a numeric capacity from the limited weld-metal inputs.
- Keep plug / slot welds, weld groups, longitudinal RHS fillet welds where `t < 3 mm`, parent-metal rupture, HAZ, block shear, net-section rupture, eccentric weld groups, intermittent weld rules, fatigue, seismic detailing, lamellar tearing, fabrication access and inspection acceptance outside the quick calculator unless they are deliberately added as separate sourced checks.
- Weld symbols are visual guides only and must continue to follow AS 1101.3 Fig. 2.1 and AS 1101.3 Figs. 2.8 to 2.10 conventions.

### 15.14 Concrete Pad Section Web Tab Rules

The concrete pad tab is a compact reinforced-concrete section-capacity view for rectangular pad strips. It is not a full footing, slab, or concrete design engine.

Use this scope:

- Rectangular strip section only.
- Pure flexural section analysis with `N* = 0`.
- User-selected compression face.
- N-class and legacy Y-bar reinforcement mats.
- Neutral-axis solution, stress-block force, reinforcement force states, `Muo`, `phi Muo`, and `k_uo` warning status.
- One-way shear capacity screen using AS 3600 Cl. 8.2.1.5, AS 3600 Cl. 8.2.1.9, AS 3600 Cl. 8.2.3.1, AS 3600 Cl. 8.2.4.1, AS 3600 Cl. 8.2.4.3 and AS 3600 Cl. 8.2.5.2. Evaluate it only for normal-weight, non-prestressed concrete without axial tension or torsion, with `f'c <= 65 MPa`, reinforcement `fsy <= 500 MPa` and maximum aggregate size at least 10 mm. Where detectable inputs are outside this scope, report `Not evaluated - outside simplified-method scope` and do not show a shear capacity. The remaining conditions are fixed project assumptions stated beside the result.
- Reinforcement area must use standard nominal Australian bar table areas for N/Y bars, not raw `pi d^2 / 4` geometry, so outputs match normal reo tables and detailing practice.
- Pad-on-pad analysis must be an explicit mode choice. Default to `Separate pads`, which calculates only the selected top or bottom pad. Use `Combined section` only when the user intends D_top + D_bot and active mats from both pads to act as one section, with composite action and interface shear design checked outside the calculator.
- Keep concrete pad inputs in the standard row-band layout. `Pad analysis mode` belongs in the first visible `Analysis basis` row, before geometry, because it controls whether the page calculates a single pad or the combined pad-on-pad section. Do not place derived process values such as stress-block factors, calculated `phi`, `kv`, `theta_v`, `bv` or `dv` in editable-looking inputs on the main page; show them in the calculation steps and final result notes instead. Reinforcement table inputs must use the shared form-control height, typography, rounded border and focus style even though the table is compact. On phone browsers, reinforcement-table numeric cells should use text inputs with numeric keyboard hints rather than native number controls, so they do not expose square number-input chrome or hard black inner outlines.
- When `D_bot = 0` and both bottom-pad mats are inactive, replace their disabled input rows with one concise not-applicable note. If either bottom-pad mat is active, keep the rows visible so the existing invalid-state warning remains actionable.

Required exclusions:

- Punching shear.
- Soil bearing.
- Base-plate, column, or pedestal bearing.
- Development length and anchorage.
- Bar spacing and cover compliance beyond warning-level screens.
- Crack control, service stress, and deflection.
- Load combinations and design actions.
- Interface shear design for pad-on-pad strengthening.
- Plain-concrete footing capacity.

Concrete tab warnings must stay visible and concise. The main warning should be a short section-capacity boundary plus brief review flags; keep detailed exclusions and derivations in folded panels. If no reinforcement mat is active, do not report a ductile reinforced-concrete `phi Muo` or reinforced-concrete `phi Vuc`; direct the user to a separate AS 3600 Section 20 plain-concrete footing check where applicable.

Concrete `phi` must cite AS 3600 Table 2.2.2 when using the pure-bending `k_uo` expression for N-class reinforcement. If legacy Y bars are selected, describe `phi = 0.65` as a conservative quick-screen review value pending actual bar-grade and ductility verification, not as a universal Y-bar code rule.

Concrete shear `kv` should be auto-calculated from AS 3600 Cl. 8.2.4.3 simplified non-prestressed rules because the quick page does not collect the design actions needed for the AS 3600 Cl. 8.2.4.2 general strain method. Use `theta_v = 36 deg`; use `kv = min(200/(1000 + 1.3dv), 0.15)` where minimum transverse shear reinforcement is not verified, and `kv = 0.15` where the provided vertical fitments satisfy `Asv.min/s = 0.08 sqrt(f'c) bv / fsy.f`. Shear reinforcement area must be calculated from the Australian bar table, `Asv = nsv Abar`, with user inputs for fitment bar size, number of legs and spacing; do not require the user to manually type `Asv` except in a deliberate future override mode. If `Asv/s` is below the minimum, show a warning and do not switch to the minimum-reinforcement `kv` or `phi = 0.75` basis. Under AS 3600 Table 2.2.2, use `phi = 0.75` only where compliant Class N fitments are verified and strength is not limited by web crushing; otherwise use `phi = 0.70`. Always show the formula steps so changes to fitment bar size, `nsv`, `s`, `fsy.f`, `bv`, `dv` and `kv` are visible.

The optional vertical-fitment input row should be titled `Shear reinforcement`, not a generic relevant-factors row, because it controls `Asv`, `Vus`, `kv` branch selection and shear capacity rather than a broad assumption factor.

The section-analysis schematic should stay small and collapsed by default. It is a visual guide only. It must not push the main inputs, results, or warnings down the page.

### 15.15 Screw Piles Selector Web Tab Rules

The Screw Piles Selector is a product-selection aid with an optional pile-group action-distribution model. It is not an AS 2159 pile design engine.

Use this primary workflow:

1. Select a supplier and one published product.
2. Show the selected product's essential published values, geometry, source status and principal limitation.
3. Keep the `Preliminary Pile-Group Action Distribution` collapsed and secondary to product selection.

Use `Not published` rather than zero or an inferred value. The selected-product summary must prioritise:

- direction-specific compression, tension and lateral values, where published;
- system SWL, indicative rating or typical benchmark only when clearly labelled as such;
- shaft diameter and wall thickness;
- helix or bearing-element count, diameter and thickness;
- length, extension or splice basis;
- installation criterion, maximum allowable installation torque, pile-head connection and durability information as separate fields;
- per-pile, complete-system or benchmark basis, together with the source load terminology (`SWL`, indicative rating or basis not stated);
- direct source link and data status: `Published directional values`, `Compression SWL up to`, `System SWL up to`, `Indicative system rating`, `Typical SWL benchmark`, `Geometry only` or `Project input`;
- concise visible source labels such as `Published + local certificate`, `Manufacturer published`, `Supplier range`, `Manufacturer dimensions`, `Published benchmark` or `Project input`; detailed local-pack status remains in traceability documentation rather than the main selector.

Do not infer uplift or lateral resistance from a compression series class. Manufacturer dimensions, system ratings and typical benchmarks must not be presented as project design strengths.

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
2. Select one published product, tendon row or provider pathway.
3. Show the selected product's published tendon values, source status, Australian supply/adoption status and principal adoption constraint.

The main selected-product card must prioritise:

- supplier and product/system name;
- anchor form: prestressed bar, multi-strand anchor, mechanical rock anchor, provider pathway or project-defined system;
- tendon description, including diameter, strand count, bar grade or area where published;
- published yield/proof load and ultimate load where a row-level source provides them;
- protection and typical hardware only as product/system information, not as project detailing approval;
- source/data basis, including document name, page or product-family basis where available;
- source status: archived global row, current external row, US row, global family, Australian provider pathway or project-defined system;
- visible supply/adoption status, especially where Australian supply, grade, ETA acceptance or provider confirmation is still required;
- a concise `Before adoption` constraint.

Use `Not published` rather than zero or an inferred value. Manufacturer tendon values are not anchor design resistance. Do not convert tendon yield or ultimate load into allowable resistance, working load, ULS capacity or utilisation without a verified project design basis.

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

- The tab is part of the shared `index.html` tool-panel system and uses the short nav label `Rock`.
- The current data/update logic may live in the scoped module `rock-anchor-selector/app.js`; do not treat this as a separate standalone page when editing the main handbook.
- Keep the product-card layout consistent with other tabs: input row, selected summary, compact published values, specification grid and folded limitations/source panel.
- Keep all visible text English-only and concise.

Validation must include supplier/product selection, default row rendering, project-defined/custom row rendering, `Not published` load display, source/status pill updates, source link updates and confirmation that no utilisation or design resistance is reported from manufacturer tendon values.

### 15.17 Web Local Update and Deployment Workflow

Preferred workflow:

1. Modify files locally.
2. Test the static page locally.
3. Check layout at narrow and wide widths.
4. Check one or two representative calculations.
5. Check the exact git diff.
6. Commit only the intended files.
7. Push to GitHub only when deployment is requested.
8. Verify GitHub Pages after deployment.

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
