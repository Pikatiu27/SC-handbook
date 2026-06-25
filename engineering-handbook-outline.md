# Engineering Lookup Handbook Outline

## 1. Project Objective

Create an Excel-based engineering lookup handbook for quick access to common engineering parameters, material properties, section properties, and basic calculation results.

The handbook should prioritize:

- Fast lookup
- Transparent calculations
- Clear source traceability
- Offline sharing
- Future extension to web pages or small tools

## 2. Reference Sources

Primary reference locations:

- `C:\Users\silin\Documents\Codex\Reference`
- `C:\桌面\SC Handbook\reference`
- `C:\桌面\SC Handbook\Tech sheet`

Local reference files identified so far:

- `Austube-Design-Capacity-Tables-Hollow-Sections-2013.pdf`
- `InfraBuild-Hot-Rolled-Products-Catalogue-2019.pdf`
- `Orrcon-National-Product-Catalogue-2024.pdf`
- `AS4100_Bolt_Lookup.xlsx`

Each parameter or formula should record, where practical:

- Source document
- Table number, page number, or clause number
- Applicable standard or version
- Unit
- Notes and limitations

## 3. Proposed Excel Workbook Structure

Suggested main workbook:

`SC_Engineering_Handbook.xlsx`

Suggested worksheets:

| Worksheet | Purpose |
| --- | --- |
| `Cover` | Handbook title, version, scope, and disclaimer |
| `Revision` | Version history, change date, and change summary |
| `References` | Source documents, standards, file paths, and web links |
| `Units` | Common units, unit conversions, and symbol definitions |
| `Materials` | Steel grades, strengths, elastic modulus, density, and related properties |
| `Sections_CHS` | Circular hollow section properties |
| `Sections_SHS_RHS` | Square and rectangular hollow section properties |
| `Bolts` | Bolt grades, diameters, areas, and basic capacities |
| `Welds` | Weld sizes, effective throat thickness, and basic capacities |
| `Loads` | Common loads, wind-load reference parameters, or lookup entry points |
| `Calculators` | Entry points for common simplified calculations |
| `Notes` | Scope, assumptions, and engineering judgement notes |

## 4. Stage 1 Scope

Stage 1 should focus on common structural steel lookup items. It does not need to cover every topic at once.

Priority modules:

1. Unit conversions
2. Material parameters
3. CHS, SHS, and RHS section properties
4. Basic bolt parameters and capacity lookup
5. Simple member-check entry points
6. Reference source summary

Deferred modules:

1. Full automated wind-load calculations
2. Complete steel member design
3. Multiple-standard switching
4. Graphical report output
5. Web-based interactive interface

## 5. Lookup and Calculation Sheet Principles

Each lookup or calculation sheet should follow a consistent structure:

1. Input area
2. Automatic parameter lookup area
3. Calculation process area
4. Result area
5. Source reference area
6. Scope and warning area

Recommended rules:

- Use a light fill color for user input cells
- Lock and protect automatic calculation cells
- Use conditional formatting for key results
- Show units in headers or adjacent columns
- Keep formula sources traceable
- Do not hide important engineering judgement inside complex formulas

## 6. Suggested Data Fields

### 6.1 Section Properties

Suggested fields:

- Section type
- Section name
- Outside diameter / depth
- Width
- Thickness
- Area
- Mass
- Ix
- Iy
- Zx
- Zy
- rx
- ry
- Source
- Page / table
- Notes

### 6.2 Bolt Parameters

Suggested fields:

- Bolt diameter
- Bolt grade
- Thread condition
- Tensile stress area
- Shank area
- Hole diameter
- Shear capacity
- Tension capacity
- Bearing check reference
- Source
- Clause / table
- Notes

### 6.3 Material Parameters

Suggested fields:

- Material type
- Grade
- Thickness range
- fy
- fu
- E
- G
- Density
- Standard
- Source
- Notes

## 7. Source and Review Rules

Engineering parameters should be classified into three categories:

| Type | Description | Directly usable in calculations |
| --- | --- | --- |
| Source value | Taken directly from a standard, handbook, or manufacturer document | Yes |
| Derived value | Derived from source values | Yes, but the formula must be shown |
| Assumption | Engineering assumption or default value | Requires a clear warning |

The Excel workbook should include a `References` sheet to manage source records:

- `Ref ID`
- `Document`
- `Version`
- `Page`
- `Clause / Table`
- `Description`
- `File path / URL`
- `Checked by`
- `Checked date`

## 8. Future Extensions

After the Excel version becomes stable, consider:

- Exporting a PDF lookup handbook
- Generating web lookup pages
- Creating a lightweight mobile lookup page
- Splitting the parameter database into CSV / JSON
- Adding version comparison and update records
- Adding project-specific templates

## 9. Recommended Next Steps

Suggested next steps:

1. Confirm which modules are included in the first version
2. Compile the reference source register
3. Confirm the Excel worksheet names
4. Build the `References`, `Units`, and `Bolts` base sheets first
5. Add section-property and calculation modules progressively

## 10. Bolt Capacity Tab Draft

### 10.1 Worksheet Set

Use one workbook with separate tabs by function:

| Worksheet | Purpose |
| --- | --- |
| `Bolt_Capacity` | User-facing bolt capacity lookup and optional project checks |
| `Bolt_Data` | Locked bolt size, area, grade, and category source data |
| `References` | Source register for standards, clauses, tables, and file paths |

### 10.2 `Bolt_Capacity` Layout

Keep the lookup page readable and compact:

| Area | Content |
| --- | --- |
| Input | Bolt size, bolt category, thread condition, number of shear planes, plate thickness, plate tensile strength, edge distance, slip factor, hole factor |
| Basic properties | `df`, `Ao`, `As`, `Ac`, `fuf`, `Nti` |
| Design capacities | `phiVf`, `phiNtf`, `phiVsf`, `phiVb` |
| Spacing checks | Minimum pitch, minimum edge distance, maximum pitch, maximum edge distance |
| Source notes | AS 4100 clause/table reference and source file |

### 10.3 Core Inputs

Suggested user inputs:

- `Bolt size`: `M16`, `M20`, `M24`, `M30`, `M36`
- `Bolt category`: `4.6/S`, `8.8/S`, `8.8/TB`, `8.8/TF`, `10.9/S`, `10.9/TB`, `10.9/TF`
- `Thread condition`: `Thread in shear plane` / `Shank in shear plane`
- `Shear planes`: `nn` for threaded planes, `nx` for shank planes
- `Plate thickness`: `tp`
- `Plate tensile strength`: `fup`
- `Edge distance for bearing`: `ae`
- `Effective interfaces`: `nei`
- `Slip factor`: `mu`
- `Hole factor`: `kh`

### 10.4 Source Data Fields

`Bolt_Data` should include:

- `Size`
- `df_mm`
- `Ao_mm2`
- `As_mm2`
- `Ac_mm2`
- `Nti_8_8_kN`
- `Nti_10_9_kN`
- `Category`
- `Standard`
- `Grade`
- `Tensioning`
- `fuf_MPa`
- `Preload_grade`
- `Connection_type`
- `Source_ref`

### 10.5 Formula Basis

Use visible helper rows. Do not hide these in one long formula.

| Result | Formula basis |
| --- | --- |
| Thread in shear, `phiVf` | `phi * 0.62 * fuf * kr * Ac / 1000` |
| Shank in shear, `phiVf` | `phi * 0.62 * fuf * Ao / 1000` |
| Tension, `phiNtf` | `phi * As * fuf / 1000` |
| Slip, `phiVsf` | `phi * mu * nei * Nti * kh` |
| Bearing, no edge limit, `phiVb` | `phi * 3.2 * df * tp * fup / 1000` |
| Bearing, edge limit, `phiVb` | `phi * ae * tp * fup / 1000` |
| Governing bearing capacity | `MIN(bearing_no_edge_limit, bearing_edge_limit)` |

Use these factors unless the source review changes them:

- `phi = 0.8` for bolt shear and bolt tension
- `phi = 0.7` for slip resistance
- `phi = 0.9` for ply bearing
- `kr = 0.83` for property class `10.9` threaded shear; otherwise `kr = 1.0`

### 10.6 Spacing Rules

Initial lookup values:

- Minimum pitch: `2.5 * df`
- Minimum edge distance, sheared or hand flame cut edge: `1.75 * df`
- Minimum edge distance, machine flame cut, sawn, or planed edge: `1.5 * df`
- Minimum edge distance, rolled edge: `1.25 * df`
- Maximum pitch, normal load-carrying fasteners: `MIN(15 * tp, 200 mm)`
- Maximum edge distance: `MIN(12 * tp, 150 mm)`

### 10.7 Display Rules

- Input cells: light fill, unlocked
- Formula cells: locked
- Units: shown in column headers, not mixed into numeric cells
- Results: kN, one decimal place
- Warnings: show if required project inputs are blank
- Source: show clause/table reference next to each result group

### 10.8 First Build Target

First usable version:

1. Select bolt size and category
2. Show `df`, `Ao`, `As`, `Ac`, `fuf`, `Nti`
3. Show design shear capacity for thread and shank cases
4. Show design tension capacity
5. Show optional slip capacity for `TF`
6. Show optional ply bearing capacity
7. Show minimum pitch and edge distances
