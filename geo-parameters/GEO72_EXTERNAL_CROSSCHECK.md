# Geo72 — external source cross-check of Geo71

21 September 2026. Local / Unreleased. Desktop audit of independent published sources; not independent professional sign-off. No runtime, numerical dataset or publication changes.

## Conclusion

The source-backed lookup remains useful for preliminary comparison, but this external check does not validate its bands as universal design ranges. The highest-priority issue is applicability: residual/fines-bearing sand, stress-dependent pile resistance, and resistance/settlement bases cannot be reduced to material density alone. Do not narrow numerical bands by averaging unrelated project values. Retain numbers with concise conditions beside them.

Current code already qualifies assumed shaft stress, distinguishes installation, separates gravel, and warns about fines and source conditions. These are appropriate safeguards, not newly missing features. Remaining recommendations below concern first-look emphasis and evidence gaps rather than a finding that all source values are wrong.

## Method and evidence quality

Compared current geo-parameters-data.js, geo-parameters.js and Geo64/66/71 review context against independently hosted sources. Four original PDFs downloaded; four relevant pages rendered and visually inspected for headers, columns, footnotes and deletion marks. Two further sources could only be inspected through indexed text and are leads, not accepted numerical evidence. Government hosting establishes provenance/access, not endorsement of a consultant's project-specific recommendations. Published adopted parameters are not independent load-test validation.

## Verified external comparisons

### A. Queensland: residual sand and stiffness — applicability finding

[Approved Yarrabilba report](https://edqdad.dsdip.qld.gov.au/documents/1480/25050/DEV20231442GeotechReportApproved19December2024.PDF), Geotech Investigations, 1–7 Alder Circuit. Cover GI6735-A, 18 September 2023; body GI6735-b; approval stamp 19 December 2024. Preserve this identity discrepancy. Table 5, PDF13 / printed10: medium-dense-or-denser residual clayey sand E = 5–10 MPa; ultimate shaft adhesion 15 kPa non-displacement, 30 kPa displacement. Displacement assumptions and geotechnical reduction factors apply. These values are site recommendations.

Geo71 ordinary-sand E bands (medium dense 8–30, dense 25–50, very dense 40–100 MPa) must not be transferred to residual clayey sand. The difference supports a material-scope restriction, not replacing ordinary sand E with 5–10. The site's 15/30 kPa cannot validate or invalidate an assumed-effective-stress benchmark without a matching ground/stress/pile model.

### B. NSW: sand shaft resistance — scenario basis supported

[Hunter River High School report](https://www.schoolinfrastructure.nsw.gov.au/content/dam/infrastructure/projects/h/hunter-river-high-school/2024/june/REF17_Geotechnical_Report.pdf), Douglas Partners 216008.00.R.001.Rev0, August 2022, Table 5 PDF16 / printed12. Dense sand/silty sand uses ultimate compression shaft resistance 10H2 kPa, capped at 80 kPa. H2 is the shaft-layer centre depth with a diameter-related limit; reduce for CFA and uplift as separately specified. Ignore the upper metre/disturbed shaft; buoyant weight informs effective stress. The preceding prose inconsistently says allowable; the table, design section and factor-of-safety instruction establish an ultimate basis.

This supports retaining pile type, effective stress and load direction beside numeric estimates. It does not establish a universal 80 kPa cap. Geo71 very-dense values 30/60/120 kPa at assumed effective stress 100 kPa concern different conditions/classes. Do not call those values an observed range or compare them directly to this dense-sand cap. Do not carry the project's uplift/CFA reductions into the generic dataset.

### C. WA: bearing and interface friction — basis distinction supported

[Byford Rail Extension Appendix J](https://www.wa.gov.au/system/files/2023-04/Appendix-J-Geotechnical.pdf), report R30-CMW-RPT-GE-560-00006, PDF32 / printed31, sections 5.8.2.2–3. The preliminary 300 kPa is factored geotechnical strength for strip footings wider than 2 m, with stated groundwater, ground preparation, embedment and strength-factor assumptions; settlement remains separately assessed. Medium-dense sand/sandy gravel uses soil friction angle 35 degrees. Cast-in-situ versus precast interfaces and critical-state versus peak conditions receive different treatment.

The 300 kPa cannot be compared directly to Geo71 medium-dense sand presumed allowable pressure 100–275 kPa. Nor does soil friction angle directly define all foundation-interface friction. Keep q_a, ultimate and factored resistance visibly distinct; keep phi-prime and delta distinct. This is a different WA document and does not resolve the existing ARMS source recheck.

### D. WSDOT: rejected numerical evidence

[December 2013 revision package](https://www.wsdot.wa.gov/publications/manuals/fulltext/M46-03/M46-03.09Revision.pdf), PDF177 / printed8-B-35. Extracted text appears to provide a numerical beta method and limiting shaft stress. Visual inspection shows these expressions struck through in a revision appendix. Consequently, no numerical comparison or alternative beta recommendation is accepted from this page. Search snippets/text extraction alone would have produced a misleading validation. Historical publication is not current adopted guidance.

## Additional leads — not counted as verified comparisons

- [Melbourne Metro ground movement assessment](https://bigbuild.vic.gov.au/__data/assets/pdf_file/0007/51100/MT-Technical-Appendix-P-Ground-Movement-and-Land-Stability-Part-6.pdf): indexed table suggests lower project friction angles for clayey sand and reports E50 rather than an interchangeable generic E. Direct original retrieval returned HTTP403; full notes/page visual check unavailable. Do not change friction bands or label them peak on this evidence alone.
- [FHWA Ground Anchors, FHWA-IF-99-015](https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-IF-99-015.pdf): original download returned HTTP403. Anchor bond ranges not independently closed by this run. Even matching a historical table would require checking source lineage and grout/rock/test conditions.

## Prioritised disposition

| Priority | Parameter | Assessment and next action |
| --- | --- | --- |
| P1 | Sand E and friction angle | Keep ordinary sand correlations separate from residual, clayey/silty, cemented and crushable materials. Strength and stiffness applicability differ. Existing detailed warnings help; make the overview scope equally visible. Do not invent a new narrow band for these excluded materials. |
| P1 | Sand and clay shaft estimates | Existing scenario labels are correct. Add concise compression/uplift scope only after confirming the original method's load-direction basis. Until confirmed, explicitly prevent automatic uplift adoption. Do not infer allowable resistance or total pile capacity from displayed unit stress. |
| P1 | Bearing | Preserve source footing/settlement/water conditions adjacent to numerical values. Ultimate, factored and allowable quantities must remain distinct. External project pressures do not justify narrowing existing bands. |
| P2 | Interface friction | Retain separate soil phi-prime and interface delta/mu. Foundation construction and surface conditions matter; no generic substitution. |
| Open | Clay su, clay adhesion factors, rock UCS-to-bearing mapping, rock anchor bond | No new independent matched validation in this run. Existing primary-source transcription evidence remains; do not mark full numerical dataset independently validated. |
| Open | Friction-angle upper bands | Very-dense sand 42–47 degrees and gravel 44–49 degrees remain source-specific correlations, not externally confirmed adopted design bands. Seek matched grading/stress/test evidence before narrowing or changing labels. |

## File evidence and limits

Downloaded originals and rendered pages are temporary local evidence at C:/Users/silin/AppData/Local/Temp/geo-independent-review. They are not bundled into the handbook or public output.

| File | SHA256 |
| --- | --- |
| qld-gi6735.pdf | 2ef143f3ec3518d1ceeaee8b453806166a158639947a462a0ae59a75048e42df |
| hunter-river.pdf | 0b4055358acae2942c73b3e59f12c21628a1cb756429f8eacf24575570906704 |
| wa-appendix-j.pdf | 326e3e9eebd5be5bbbb5480056b1171380b5bb12303807036dac016f8e2c466a |
| wsdot-piles.pdf | 621ed7c51b417a7113796a13965fdae1f551e44feddc8b41fc39e3cc155e30e8 |

No new test/build claims: this is documentation-only research. Geo71 prior runtime evidence is not rerun or expanded. The external comparison is now recorded; independent professional acceptance, standards currency, existing ARMS source, publication-expression and manual accessibility gates remain open. No commit, push, deployment or public allowlist change.
