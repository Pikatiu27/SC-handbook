# Geo60 — material sub-tabs

## 1. Scope
18 September 2026; cache 20260918geo60. User approved Clay/Sand/Gravel/Rock material sub-tabs and required master typography/layout compliance. Both entries updated; Local / Unreleased.

## 2. Verdict
Only the active material overview is displayed. One shared selected-parameter table follows that overview inside the active tabpanel. Material names are lookup entries, not a complete soil classification.

## 3. Must modify — completed
Material switching clears prior selected state, detail rows and incompatible refinements. Source disclosures survive clearing and are reused on the next selection. Family/material refinement switches keep tab state synchronized. No automatic state or adopted value selected.

## 4. Layout
Shared font stack and 13px tab labels; 46px desktop / 44px phone tab targets. Active tab uses existing pale/accent colours and underline. Repeated visual material headers removed; accessible headings retained. Overview and detail use existing tables and source disclosures.

## 5. Added
Labelled tablist/tab/tabpanel relationships, aria-selected, roving tabindex, ArrowLeft/ArrowRight/Home/End activation and focus handling. Stable main #geo route retained.

## 6. Simplified
Four stacked material comparisons become one active panel. No independent Full parameter reference restored. Unified detailed parameters and source conditions remain available.

## 7. Limits
Scoped browser and semantic checks are not full screen-reader or native-zoom acceptance. Independent engineering, currency, pending report-source, source-specific publication and existing manual-accessibility gates remain open.

## 8. Unchanged
Source dataset SHA256 matches Geo56 baseline. No numeric/query model changes. Existing dirty work preserved; no commit/push/publication.

## 9. Evidence
50 test files passed; public build contains 43 allowlisted files with Geo excluded. Live main: Sand very-dense result; switch to Gravel clears detail rows and pressed state; exactly one material panel visible. ArrowRight and Home activation verified. Desktop and 390px screenshots inspected. Phone tabs measured 13px and 44px height; no horizontal overflow. Standalone Rock selection and detail verified. Viewport restored. No full assistive acceptance claimed.

## 10. Delivery
http://127.0.0.1:4174/?preview=geo60#geo.
