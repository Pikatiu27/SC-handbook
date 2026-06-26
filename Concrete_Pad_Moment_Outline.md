# Concrete Pad Moment Capacity Web Tab Outline

## 1. Module Purpose

Build a web-based reinforced concrete section capacity calculator for a concrete pad or footing strip.

The module calculates the flexural section capacity of a rectangular concrete strip with multiple reinforcement layers. It also draws a live section force diagram showing:

- Compression face
- Tension face
- Concrete compression block
- Neutral axis
- Reinforcement layers
- Steel force state for each layer
- Linear strain distribution

The module is intended for quick engineering checking and concept validation. It is not a full footing design report.

## 2. Module Name

Suggested tab name:

`Concrete Moment`

Suggested internal module ID:

`concrete-pad-moment`

## 3. Engineering Question

What is the design flexural capacity of a reinforced concrete pad section for the selected bending direction?

Primary output:

`phiMuo`

Secondary outputs:

- `Muo`
- Neutral axis depth
- Concrete compression force
- Steel force in each reinforcement layer
- Compression or tension status of each reinforcement layer
- Governing warnings and limitations

## 4. Governing Basis

Primary design standard:

- `AS 3600`, Concrete structures

Supporting calculation theory:

- Plane sections remain plane
- Linear strain distribution through the section depth
- Concrete tension is ignored at ultimate strength
- Concrete compression is represented by the AS 3600 stress block
- Reinforcement stress is calculated from strain and limited by yield strength
- Internal axial force equilibrium is used to solve the neutral axis depth
- Moment capacity is calculated from the resultant internal force couple

All AS 3600 parameters, capacity factors, stress block factors, strain limits, and ductility checks must be traceable to the applicable clause before issue-for-design use.

## 5. Scope

Included:

- Rectangular concrete pad strip
- One metre strip or user-defined section width
- Top compression or bottom compression bending direction
- Two or more reinforcement layers
- Different reinforcement at top and bottom faces
- Additional reinforcement layers for pad-on-pad strengthening
- Automatic tension/compression classification for each steel layer
- Neutral axis iteration
- SVG section diagram
- SVG strain diagram
- Basic warnings for out-of-scope conditions

Excluded from primary calculation:

- One-way shear capacity
- Punching shear capacity
- Bearing under base plate, column, or pedestal
- Development length and anchorage
- Bar spacing and cover compliance
- Crack control and service stress
- Deflection
- Interface shear design for pad-on-pad composite action
- Soil bearing pressure calculation
- Load combination generation

These excluded checks must be shown as limitations or linked follow-up checks.

## 6. User Inputs

### 6.1 Section Geometry

| Input | Symbol | Unit | Notes |
| --- | --- | --- | --- |
| Section width | `b` | mm | Default `1000 mm` for one metre strip |
| Total section depth | `D` | mm | Full concrete depth used for the selected section |
| Moment direction | - | - | `Top compression` or `Bottom compression` |
| Concrete strength | `fc` | MPa | Characteristic compressive strength |
| Concrete elastic modulus | `Ec` | MPa | Optional, mainly for service/cracked extension |

### 6.2 Reinforcement Layers

The reinforcement input must support a variable number of layers.

| Input | Symbol | Unit | Notes |
| --- | --- | --- | --- |
| Layer ID | - | - | Stable row identifier |
| Distance from top face | `y_i` | mm | Actual layer centroid from top surface |
| Bar diameter | `db_i` | mm | Used for display and optional area calculation |
| Bar spacing | `s_i` | mm | Used to calculate area per metre |
| Area per metre | `As_i` | mm2/m | May be calculated or manually entered |
| Steel yield strength | `fsy_i` | MPa | May vary by layer |
| Steel modulus | `Es_i` | MPa | Default `200000 MPa` unless overridden |
| Active | - | - | Include or exclude layer from calculation |
| Notes | - | - | Existing pad, new overlay, top mat, bottom mat, etc. |

### 6.3 Pad-on-Pad Inputs

Optional inputs for strengthened sections:

| Input | Unit | Notes |
| --- | --- | --- |
| Existing pad depth | mm | Used for diagram reference |
| Overlay depth | mm | Used for diagram reference |
| Interface elevation | mm from top | Drawn on section diagram |
| Composite action assumed | Yes/No | Required before using full combined depth |
| Interface shear check completed | Yes/No | Warning if not completed |

If composite action is not confirmed, the calculator must not silently treat the full depth as one monolithic section.

## 7. Moment Direction Logic

The calculator must not assume bottom reinforcement is always in tension.

Moment direction options:

- `Top compression`: compression face is the top surface, tension side is bottom.
- `Bottom compression`: compression face is the bottom surface, tension side is top.

For calculation, convert each layer to a distance from the selected compression face:

```text
if momentDirection = Top compression:
    d_i = y_i

if momentDirection = Bottom compression:
    d_i = D - y_i
```

Where:

- `d_i` is the distance from the compression face to layer `i`
- `D` is the total section depth
- `y_i` is the distance from the top face to layer `i`

Layer force status is determined by strain, not by the layer name.

## 8. Section Analysis Method

### 8.1 Neutral Axis

Solve for neutral axis depth:

`x`

measured from the selected compression face.

The solution must satisfy internal axial force equilibrium:

```text
Cc + sum(Fs_i) = N*
```

For pure flexural section capacity:

```text
N* = 0
```

If future axial load support is added, `N*` may be non-zero.

### 8.2 Concrete Compression

Concrete tension is ignored at ultimate.

Concrete compression is calculated using the selected AS 3600 stress block parameters:

```text
Cc = alpha2 * fc * b * gamma * x
```

The resultant compression force location is taken from the selected stress block model and must be visibly documented.

### 8.3 Steel Strain

Assume a linear strain distribution.

For each reinforcement layer:

```text
epsilon_si = epsilon_cu * (x - d_i) / x
```

Suggested sign convention:

- `epsilon_si > 0`: compression
- `epsilon_si = 0`: at neutral axis
- `epsilon_si < 0`: tension

### 8.4 Steel Stress

For each reinforcement layer:

```text
fs_i = Es_i * epsilon_si
```

Limit stress to yield:

```text
fs_i <= fsy_i
fs_i >= -fsy_i
```

Steel force:

```text
Fs_i = As_i * fs_i
```

Compression steel inside the concrete compression block should be treated consistently with the selected design method. The preferred detailed method is to account for the concrete displaced by compression reinforcement, if required by the final AS 3600 implementation notes.

### 8.5 Moment Capacity

Calculate nominal section moment capacity from the internal force resultants:

```text
Muo = sum(F_i * lever_arm_i)
```

Then apply the AS 3600 capacity factor:

```text
phiMuo = phi * Muo
```

The capacity factor `phi` must not be hardcoded without checking AS 3600 ductility and neutral-axis requirements.

## 9. SVG Section Diagram

The diagram must be generated with deterministic SVG, not AI images or static screenshots.

### 9.1 Required Diagram Elements

- Concrete rectangle
- Top and bottom face labels
- Compression face label
- Tension face label
- Concrete compression block shading
- Neutral axis dashed line
- Reinforcement layers as bar circles
- Layer labels
- Steel force arrows
- Concrete compression resultant arrow
- Optional interface line for pad-on-pad strengthening
- Warning marker if composite action is not confirmed

### 9.2 Reinforcement Colour Convention

Suggested colours:

- Tension reinforcement: red
- Compression reinforcement: blue
- Near-neutral-axis reinforcement: grey
- Concrete compression block: light blue or pale grey
- Neutral axis: black dashed line
- Pad-on-pad interface: amber dashed line

### 9.3 Diagram Scaling

SVG coordinates must scale from actual dimensions:

```text
screen_y = margin + y_actual / D * drawing_height
```

This ensures:

- Neutral axis is drawn at the calculated depth
- Reinforcement layers are drawn at actual input positions
- Compression block depth updates automatically
- Moment direction changes redraw the compression and tension sides correctly

## 10. SVG Strain Diagram

A strain diagram should be shown beside the section.

Required elements:

- Compression strain at the compression face
- Zero strain at the neutral axis
- Tension strain at the tension face
- Straight strain line
- Markers for each reinforcement layer strain

Labels:

- `epsilon_cu`
- `neutral axis`
- `epsilon_si` for each layer where space allows

## 11. Results Layout

Follow the SC Handbook web calculator layout.

### 11.1 RESULTS Moment Capacity

Show:

- `phiMuo`
- `Muo`
- Moment direction
- Neutral axis depth `x`
- Governing status

### 11.2 RESULTS Detailed Checks

Show:

- Concrete compression force `Cc`
- Stress block depth
- Each reinforcement layer:
  - Position
  - Area
  - Strain
  - Stress
  - Force
  - Compression/tension status
- Force equilibrium residual
- Capacity factor used
- Ductility or neutral-axis warning status

### 11.3 Calculation Basis and Limitations

Show:

- Governing standard
- Stress block assumptions
- Concrete tension ignored at ultimate
- Pure flexural section capacity only unless axial load is added later
- One-way shear and punching shear excluded
- Development length excluded
- Pad-on-pad composite action warning
- Source and clause placeholders pending final AS 3600 clause mapping

## 12. Validation Cases

Required sample checks before release:

1. Single bottom reinforcement layer, top compression
2. Top and bottom reinforcement layers, top compression
3. Top and bottom reinforcement layers, bottom compression
4. Three-layer section with middle layer near neutral axis
5. Four-layer pad-on-pad strengthened section with composite action enabled
6. Pad-on-pad section with composite action disabled, warning triggered
7. Invalid input case where no neutral axis solution is found
8. Over-reinforced or low-ductility warning case

## 13. Warnings and Error Handling

Warnings:

- No active reinforcement layers
- Reinforcement layer outside section depth
- Neutral axis solution not found
- Force equilibrium tolerance not met
- Reinforcement strain exceeds expected range
- Capacity factor cannot be assigned without AS 3600 ductility check
- Pad-on-pad composite action not confirmed
- Interface shear check not included
- Punching shear check not included
- One-way shear check not included
- Development length not checked

Errors:

- `D <= 0`
- `b <= 0`
- `fc <= 0`
- `As_i < 0`
- `fsy_i <= 0`
- `Es_i <= 0`
- Layer position outside `0` to `D`

## 14. Future Extensions

Possible later extensions:

- Excel audit workbook version
- Axial load plus moment interaction
- Biaxial bending
- Service stress and crack control
- One-way shear module
- Punching shear module
- Development length module
- Interface shear module for pad-on-pad strengthening
- Exportable calculation summary
- Comparison against `concreteproperties` or another trusted reference implementation

