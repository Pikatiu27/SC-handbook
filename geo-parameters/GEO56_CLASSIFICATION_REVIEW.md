# Geo56 — classification and ambiguity review

## 1. Scope
17 September 2026; cache 20260917geo56. User authorised classification cleanup and review of similar ambiguities. Both HTML entries and shared renderer updated. Local / Unreleased.

## 2. Verdict
Three navigation families, four material comparisons: Cohesive soils (clay references), Granular soils (separate sand and gravel tables), Rock. This is reference coverage, not a complete soil classification system.

## 3. Must-fix items completed
Gravel is directly visible; clay coverage no longer implies all cohesive soil; Non-cohesive soil wording replaced; state headings specify consistency, relative density or intact-rock strength; accessible button names distinguish sand from gravel. Selection placement/highlighting now follows the granular material.

## 4. Should-fix items completed
Silt has an explicit no-generic-range boundary. Fill, organic, sensitive/expansive ground and weak layers retain separate-assessment guidance. Both entry points use matching copy.

## 5. Added
Existing gravel friction-angle, modulus and labelled dry/saturated weight references displayed in the initial comparison. No new numeric dataset or correlations introduced. Missing gravel bearing and modulus classes remain unavailable.

## 6. Simplified
Family names describe available navigation; first-column labels identify what the user matches. No extra classification inputs or new design workflow.

## 7. Unclear or bounded items
Gross/net bearing basis remains explicitly unstated. Source short/long-term labels do not establish durations or automatic drainage equivalence. Intact-rock strength is distinct from rock-mass modulus and bearing; soil friction angle is distinct from interface angle. Permeability remains a labelled family envelope unless classification is selected. These limits are retained, not resolved by rewording.

## 8. Unchanged
Canonical typography, numeric data and query equations. Data SHA256 compared with audit/geo56-data-baseline.json. Independent engineering, source/currency, rights/publication and full manual accessibility gates remain open. No fresh source-PDF certification claimed.

## 9. Evidence
Live main-page browser checks: four tables, 22 buttons; dense gravel 39–44 degrees and 100–200 MPa, no bearing range; very-loose gravel missing modulus; refinement from gravel to sand updates result, inventory and unique selected button. Desktop and 390px viewport screenshots inspected in-app; no horizontal overflow at 390px. Standalone loads four tables. Screenshots were live observations, not saved artifacts. Viewport restored. Final automated verification: all 50 test files passed, including existing controlled-selector cases and new classification/accessibility-name contracts. Public build contains 43 allowlisted files; Geo remains excluded. Numeric dataset SHA256 unchanged.

## 10. Delivery
http://127.0.0.1:4174/?preview=geo56#geo. Existing dirty work preserved. No commit, push or publication.
