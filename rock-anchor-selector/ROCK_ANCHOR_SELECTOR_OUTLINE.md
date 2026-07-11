# Rock Anchor Selector Outline

## Purpose

The page is a lightweight product selector for active post-tensioned foundation anchors.

It helps users:

1. Find a manufacturer tendon or system.
2. View the important published parameters for the selected product or system.
3. Understand the source status and data boundary.
4. Identify what is still required before project adoption.

It is not an anchor-force calculator or a complete ground-anchor design tool.

## Tab Structure

Follow the SC Handbook web-tab order:

1. Tool heading and review status.
2. Product-selection input group.
3. Selected-product summary and published tendon values.
4. Product specification and adoption limitation.
5. Folded calculation basis, limitations and source notes.

### 1. Product Selection

- Select a supplier.
- Select one product or system from that supplier's list.

Do not show separate search, sort or product-results controls.

### 2. Selected Product

Show:

- Product and provider.
- Anchor form and tendon description.
- Published tendon yield and ultimate loads where a row-level manufacturer table is captured.
- Corrosion-protection pathway.
- Typical anchorage components.
- Source document and source status.
- Direct source link, source region and checked date.
- Australian supply status.
- One always-visible `Before adoption` requirement.

Published tendon loads are reference product values. They are not complete anchor design resistance.

### 3. Basis / Limits

State clearly that the selector does not calculate:

- Anchor-group force distribution
- Tendon design resistance
- Tendon-grout or grout-ground bond resistance
- Rock cone, wedge, block or group failure
- Anchor-head or concrete anchorage resistance
- Durability design
- Stressing, proof, suitability or acceptance-test compliance

## Website Integration

- Implement as the `Rock Anchor` tool tab in the main SC Handbook `index.html`.
- Use the shared page header, horizontal tab navigation, `tool-panel`, `tool-heading`, `lookup-card`, input-group and source-card patterns.
- Use a dedicated pastel colour layer through the shared CSS variables.
- Do not publish or link a separate Rock Anchor page.
- Keep the Rock Anchor data/interaction module static and local-first.

## Source Status Model

Use separate data and source labels.

### Data Status

- `Published tendon row`
- `Ground-anchor system family`
- `Provider pathway`
- `Project-defined system`

### Source Status

- `Manufacturer row · Jan 2014 · archived`
- `Manufacturer row · Jan 2026 · external`
- `Manufacturer row · 2025 · external`
- `Manufacturer row · Oct 2024 · US`
- `System family page · external`
- `Australian provider pathway`
- `Project entry`

Source status confirms the evidence type only. It does not confirm project suitability.

### Australian Supply Status

- `Confirmed Australian provider pathway`
- `Australian supply confirmation required`
- `Australian acceptance and supply confirmation required`
- `Project procurement route`

Manufacturer load terminology must be retained. Do not silently convert yield, proof, characteristic or minimum ultimate values into one generic load type.

## Current Catalogue Boundary

- Freyssinet: archived global row-level bar and T15.7 strand tendon loads.
- DYWIDAG: current US ASTM A722 minimum ultimate-load rows; Australian grade and assembly require confirmation.
- SAS: current external manufacturer bar rows; Australian ground-anchor applicability requires confirmation.
- Williams Form Engineering: R7S Spin-Lock manufacturer rows plus MCP I, MCP II, MCP III and multi-strand system families; Australian acceptance and supply require confirmation.
- VSL and BBR: system-family entries without embedded row-level loads.
- Keller Australia and SRG Global: Australian provider pathways requiring a certified project schedule.
- Custom / project: project-defined entry without embedded manufacturer values.

## Release Gate

- English-only user interface.
- Product selection remains the only workflow.
- No action distribution, bond calculation, governing resistance or utilisation.
- No manufacturer tendon value is presented as anchor design resistance.
- Source and data status remain visible.
- Supplier selection updates the available product/system list.
- Product/system selection updates the selected-product parameters directly.
- No product-results or comparison table is shown.
- Main-site tab navigation and `rockPanel` are present.
- The tab follows the shared desktop and mobile layout rules.
- Run syntax, DOM, filter, selection and responsive checks before publication.
