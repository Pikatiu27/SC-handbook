# SC Handbook

## 1. Purpose

`SC Handbook` is a single Excel-based engineering lookup and calculation handbook.

The workbook is intended for:

- Quick engineering lookup
- Basic design calculation
- Transparent formula checking
- Clear source traceability
- Offline sharing
- Future conversion to web or app tools

The project default deliverable is:

`SC_Engineering_Handbook.xlsx`

All project files, worksheet names, headings, field names, notes, and formulas must be written in English.

## 2. Core Rule

Every new lookup or calculation module must follow this sequence:

1. Define the engineering task
2. Identify the governing standard or reference
3. Extract source values into a locked data sheet
4. Write formulas using visible helper rows
5. Build a clear user-facing lookup sheet
6. Record all references in the `References` sheet
7. Verify sample cases before adding the module to the handbook

No formula should be added only because it is convenient. Each formula must be traceable to a standard clause, table, source document, or clearly stated derived relationship.

## 3. Workbook Structure

Use one workbook with multiple function-specific tabs.

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

Primary source locations:

- `C:\Users\silin\Documents\Codex\Reference`
- `C:\桌面\SC Handbook\reference`
- `C:\桌面\SC Handbook\Tech sheet`

The handbook is based primarily on Australian engineering standards, Australian design handbooks, and Australian manufacturer data.

Source priority:

1. Australian standards and official standard-based design requirements
2. Local reference files stored in the project `reference` folder
3. Local reference files stored in `C:\Users\silin\Documents\Codex\Reference`
4. Manufacturer catalogues and design capacity tables
5. Credible online sources from official bodies, industry organisations, manufacturers, or recognised technical publishers

Online sources must only be used when the local reference set does not contain the required information, or when an online source is needed to verify currency, errata, or publication status.

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
- `Superseded`
- `Do_Not_Use`

## 5. Module Template

Each new module should be documented before building the Excel tab.

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
- Use `mm`, `mm2`, `mm3`, `mm4`, `MPa`, `GPa`, `kN`, `kNm`, and `kg/m` consistently

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

- `reference/`
- `Tech sheet/`
- `C:\Users\silin\Documents\Codex\Reference`

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
| Thread in shear, `phiVf` | `phi * 0.62 * fuf * kr * Ac / 1000` |
| Shank in shear, `phiVf` | `phi * 0.62 * fuf * Ao / 1000` |
| Tension, `phiNtf` | `phi * As * fuf / 1000` |
| Slip, `phiVsf` | `phi * mu * nei * Nti * kh` |
| Bearing, no edge limit, `phiVb` | `phi * 3.2 * df * tp * fup / 1000` |
| Bearing, edge limit, `phiVb` | `phi * ae * tp * fup / 1000` |
| Governing bearing capacity | `MIN(bearing_no_edge_limit, bearing_edge_limit)` |

These formulas must be checked against the source references before issue-for-design use.

## 14. Future Modules

Candidate future modules:

- `Unit_Conversion`
- `Material_Properties`
- `Section_CHS`
- `Section_SHS_RHS`
- `Weld_Capacity`
- `Plate_Bearing`
- `Wind_Reference`
- `Member_Check`

Each future module must follow this file before workbook implementation starts.
