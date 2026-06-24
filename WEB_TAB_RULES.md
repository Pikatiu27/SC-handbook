# SC Handbook Web Tab Rules

This note records the working rules from the current SC Handbook web build.
Use it as the starting checklist when adding future tabs such as bolts, CHS, equal angle, welds, plates, base plates, or other Australian structural design calculators.

The web page itself should remain fully English. This planning note is written in Chinese for internal use, with required UI wording shown in English.

## 1. Overall product logic

`SC Handbook` is a local-first, static engineering calculation handbook.

Core goals:

- Fast input.
- Fast result lookup.
- Transparent formula basis.
- Clear Australian-standard language.
- Clear engineering judgement cues for when a default option should be selected.
- Responsive layout for phone, tablet, and desktop.
- No server-side calculation.
- No token consumption when the published page is used by visitors.

The page should behave like a practical design-aid, not like a report generator. The user enters the few governing parameters, reads the governing capacity, then expands or checks the calculation basis only when needed.

Most important product rule:

`SC Handbook` is an engineering quick-reference handbook. Each tab should help a practising engineer answer the immediate design-aid question:

- What standard item or design option should I start with?
- In what common scenarios is that option normally used?
- What is the quick design capacity or governing check?
- What project-specific checks are still outside this quick-reference tool?

Do not turn a tab into a full textbook, long tutorial, report writer, or complete design engine. Keep the first screen clear, compact and decision-oriented. Put only the essential assumptions, standard references, warnings and limitations in the UI.

## 2. Tab structure

Use one main app with multiple tabs.

Current structure:

- `Bolt Capacity`
- `Member Capacity`

Future tabs should follow the same pattern:

- One tab = one engineering topic.
- One topic can contain closely related calculators.
- Do not mix unrelated design checks in the same visual block.
- Keep tab names short and direct.
- Page title and all UI labels must be English.

Suggested future tab names:

- `Weld Capacity`
- `Plate Capacity`
- `Base Plate`
- `Section Properties`
- `Connection Checks`
- `Wind Actions`

## 3. Standard and reference workflow

Before adding a new tab, do this sequence:

1. Define the engineering task.
2. Identify the governing Australian Standard clause, table, or equation.
3. Check the local reference folder first:
   - `C:\Users\silin\Documents\Codex\Reference`
   - project `reference` folder if needed
   - project `Tech sheet` folder if needed
4. Use readable `.md` copies for fast text search where available.
5. If a PDF is protected, image-only, or unreadable, mark it as unusable and use a verified readable copy instead.
6. Extract only the needed clause/table values.
7. Record the source in the calculator notes.
8. Verify the formula with at least one worked example, manufacturer table, or design capacity table where possible.

Reference priority:

1. Local standards and reference files in `C:\Users\silin\Documents\Codex\Reference`.
2. Local project reference files in the project `reference` folder.
3. Local project technical sheets in the project `Tech sheet` folder.
4. Australian Standards and official standard-based design requirements.
5. Australian industry design guides based on the standards.
6. Australian manufacturer catalogues and design capacity tables, such as OneSteel / InfraBuild / Austube / Orrcon.
7. Other credible open-source or publicly available technical references, only when they are consistent with the governing standard and the local reference set is incomplete.
8. Public calculation websites, only for interaction ideas, rough comparison, or usability benchmarking, not as the governing calculation source.

Important rule:

The first check should always be the local `Reference` folder. Do not add a formula only because it appears on a public website. Every formula must trace back to a standard, local reference document, trusted manufacturer source, or clearly labelled derived relationship.

When using open-source or public sources:

- Prefer official standards bodies, universities, recognised industry organisations, government publications, and established Australian manufacturers.
- Record the source name, link or file path, access date if web-based, and the exact clause/table/page used where available.
- Treat public calculators as secondary checks only. Their formulas must still be verified against the governing standard before being used.
- If different sources conflict, the local standard/reference file governs unless there is a clear amendment, erratum, or newer official standard.

## 4. Calculation design logic

Each calculator should be split into four internal layers.

| Layer | Purpose |
| --- | --- |
| Inputs | User-selectable values and required dimensions |
| Data | Standard tables, section properties, material strengths |
| Calculation | Clause-based equations and derived helper values |
| Results | Governing capacity, detailed checks, basis and limitations |

For every symbol used on the page:

- Use the standard symbol if available.
- Use the same notation as the Australian Standard where practical.
- Define the symbol near the input or in the result notes.
- Avoid vague labels such as `df` unless the standard notation is also shown clearly.

Good input label style:

- `Bolt diameter, d_f`
- `Hole diameter, d_h`
- `Connected ply thickness, t_p`
- `Ultimate tensile strength of ply, f_up`
- `Edge distance, e`
- `Net area, A_n`
- `Section capacity, N_s`
- `Member capacity, N_c`

Avoid:

- `df`
- `thickness`
- `strength`
- `capacity factor`
- `condition`

## 5. Results layout

Every calculator should use the same result structure.

Recommended result blocks:

1. `RESULTS <Main capacity>`
2. `RESULTS <Detailed checks>`
3. `Calculation basis and limitations`

For the bolt tab, the current result blocks are:

- `RESULTS Bolt capacity`
- `RESULTS Detailed connection checks`
- `Calculation basis and limitations`

For member capacity, use the same tone:

- `RESULTS Member capacity`
- `RESULTS Detailed member checks`
- `Calculation basis and limitations`

The first result block should show the governing answer clearly.
The second block should show secondary checks and intermediate capacities.
The third block should explain source clauses, assumptions, exclusions, and limitations.

## 6. Bolt tab rules

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
- Under the callout, keep the explanation short:
  - `N: threads intercept shear plane · X: threads clear of shear plane`

Do not use a large warning line for this unless the design state genuinely needs warning. The current preference is compact explanatory text.

Bolt result checks should include:

- Bolt shear capacity.
- Bolt tension capacity where relevant.
- Bolt bearing on connected ply.
- Edge tear-out / ply tearing.
- Minimum edge distance check.
- Governing connected-ply capacity.

Minimum edge distance and ply checks should reference AS 4100 terminology and clause/table language, not generic web-calculator labels.

Current bolt size rule:

- Include common sizes such as `M10`, `M12`, `M16`, `M20`, `M24`, `M30`, `M36`.
- If a standard table only covers some sizes, do not invent missing table values. Either calculate from formula where allowed or mark the limitation clearly.

## 7. Member tab rules

The member tab should use AS 4100 member-design language.

Current member calculators:

- `CHS`
- `Equal Angle`

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

Do not imply the member tab is a full steel design engine unless all required limit states are implemented. State exclusions clearly, for example:

- Bending not included.
- Shear not included.
- Combined actions not included.
- Connection design not included.
- Flexural-torsional buckling not included unless specifically implemented.

## 8. UI language

The final web page should be all English.

Use Australian design language, not generic software language.

Preferred wording:

- `Bolt Capacity`
- `Member Capacity`
- `Connected ply`
- `Edge distance`
- `Threads intercept shear plane`
- `Threads clear of shear plane`
- `Design capacity`
- `Governing limit state`
- `Calculation basis and limitations`

Avoid:

- Chinese UI text.
- Casual wording.
- Over-explaining in the result card.
- Ambiguous abbreviations without symbol definitions.

## 9. Page layout rules

Use a clean single-page app layout.

Recommended visual order:

1. Header:
   - `SC Handbook`
   - short English description
2. Tab navigation:
   - `Bolt Capacity`
   - `Member Capacity`
   - future tabs
3. Input card:
   - grouped fields
   - compact standard notes
4. Results cards:
   - main capacity first
   - detailed checks second
   - calculation basis last

The layout should work on:

- phone
- tablet
- desktop

Do not keep a visible `Device Preview` option in the final page. Responsiveness should be built into the CSS.

## 10. Font hierarchy

Use three visual font-size levels across the page.

Recommended hierarchy:

| Level | Use |
| --- | --- |
| Large | page title, major result value |
| Medium | section title, field value, important result label |
| Small | helper notes, metadata, limitations, source notes |

Keep member-page fonts aligned with bolt-page fonts.
Avoid creating a new font scale for every tab.

Input controls such as `Bolt Size M24` and `Bolt Category` should use the same size and weight.

## 11. Colour rules

Use a macaron / pastel colour system. The page should feel light and active, but still technical and readable.

Current direction:

- Bolt tab: pastel green.
- Member tab: pastel blue.
- Reference / source notes: pale warm yellow.
- Background: warm off-white.
- Text: dark neutral, not pure black.

Colour should help the user identify the active module. It should not reduce contrast or make engineering values harder to read.

Future tabs can use related pastel accents:

- Weld: pastel orange.
- Plate: pastel purple.
- Wind: pastel teal.
- Concrete: pastel sand.

## 12. Interaction rules

The calculator should feel fast.

Use:

- dropdowns for common standard values
- numeric fields for dimensions
- clear default values
- immediate recalculation
- compact explanatory notes near the affected input
- scenario-first selection guides where engineers commonly need to choose between options
- default selections that show a capacity immediately, even when the full design requires further project checks

Avoid:

- long forms with no grouping
- unnecessary advanced options
- hidden assumptions
- result text that changes too dramatically between selections
- long educational paragraphs in the main UI
- making specialist or project-specific checks look like complete automated design

If an option changes the engineering meaning, make it visible in the drawing callout or result summary.

Example:

- Switching from `N` to `X` should visibly change the bolt callout from `M24 8.8/S` to `M24 8.8 X/S`.

## 13. Reference display rules

Each tab should include a concise calculation-basis section.

Include:

- Standard name and version where known.
- Clause/table/equation reference.
- What the calculator includes.
- What the calculator excludes.
- Any derived formula explanation.
- Any manufacturer source used for product dimensions.

Do not paste long standard text into the UI. Use short paraphrased notes and clause/table identifiers.

Internal development notes can be longer, but the public UI should stay concise.

For guide-style tabs or sections, use a compact engineering decision format:

- `Default` or `Select`: the usual starting option.
- `Use when`: common design scenarios.
- `Avoid` or `Limit`: when the option is likely unsuitable or incomplete.
- `Check`: project-specific design checks still required.

## 14. Local update and deployment workflow

Preferred workflow:

1. Modify files locally.
2. Test the static page locally.
3. Check layout at narrow and wide widths.
4. Check one or two representative calculations.
5. Check the exact git diff.
6. Commit only the intended files.
7. Push to GitHub.
8. Verify GitHub Pages after deployment.

Current GitHub Pages repo:

- Local repo: `C:\桌面\SC Handbook\bolt-capacity-au`
- Remote: `https://github.com/Pikatiu27/SC-handbook.git`
- Branch: `main`
- Published page: `https://pikatiu27.github.io/SC-handbook/`

Standard push sequence:

```powershell
cd "C:\桌面\SC Handbook\bolt-capacity-au"
git status --short
git diff --stat
git diff
git add README.md app.js index.html styles.css
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
- Use a clear commit message describing the engineering/UI change.
- Do not push experimental tabs, draft calculators, or unverified standard formulas.
- If a previous turn left unexpected local changes, stop and identify them before pushing.

Rules after pushing:

- Confirm the push completed to `origin/main`.
- Confirm local `HEAD` short hash.
- Confirm whether the working tree is clean.
- If `git status --short` still shows modified files after push, inspect them before claiming everything is deployed.
- The GitHub Pages page may take 1-2 minutes to update.
- If the page still looks old, use hard refresh, private window, or a cache-busting URL.

Authorization and token notes:

- GitHub push requires network permission in Codex.
- If Codex asks for approval to run `git push`, approve only when the diff has been checked.
- A GitHub token is not normally needed every time if git authentication is already configured on the machine.
- Visitors using the static GitHub Pages calculator do not consume Codex or OpenAI tokens.
- Local browser use, clicking the page, or sharing the page link does not consume model tokens.
- Token usage only occurs when asking Codex to inspect, edit, convert references, reason, or generate code/content.

## 15. Checklist for adding a new tab

Before implementation:

- [ ] Define the tab name.
- [ ] Define the exact engineering scope.
- [ ] Identify governing Australian Standard clauses/tables/equations.
- [ ] Search local reference `.md` files first.
- [ ] Confirm manufacturer data source if product dimensions are needed.
- [ ] Decide required inputs.
- [ ] Define all symbols.
- [ ] Decide result blocks.
- [ ] Decide limitations.
- [ ] Decide the default engineering choice or scenario guide, where selection judgement matters.

During implementation:

- [ ] Keep UI text English.
- [ ] Match existing font hierarchy.
- [ ] Match existing card layout.
- [ ] Use the tab accent colour only as an accent.
- [ ] Keep the page clear enough to work as an engineering quick-reference handbook.
- [ ] Keep the main result prominent.
- [ ] Keep detailed checks readable but secondary.
- [ ] Keep calculation basis concise.
- [ ] Make scenario guidance concise, actionable and tied to common engineering use cases.

After implementation:

- [ ] Verify formula against the reference.
- [ ] Verify at least one sample case.
- [ ] Check mobile layout.
- [ ] Check desktop layout.
- [ ] Check the page can be understood quickly without reading a long explanation.
- [ ] Check no unrelated tab is visually broken.
- [ ] Update README or reference notes if the scope changed.
- [ ] Deploy only when the local version is accepted.
