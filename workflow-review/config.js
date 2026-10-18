'use strict';
window.HandbookWorkflowLinks=[
 {key:'bolt-selected',panel:'bolt',appendAfter:'#boltResultNote',label:'Calculation',valid:'#selectedShearCapacity',visibility:'#boltResultNote',trace:'#formulaSteps',rows:'Bolt tension capacity|Minimum installed bolt tension|Bolt shear capacity|TF slip resistance|Capacity-only boundary',title:'Selected bolt capacities'},
 {key:'member-compression',panel:'member',label:'#memberCompression',valid:'#memberCompression',trace:'#memberFormulaSteps',rows:'Design basis|Section properties|Section form factor|Design section compression|Member slenderness|Modified slenderness|Compression reduction|Design member compression'},
 {key:'member-tension',panel:'member',label:'#memberTension',valid:'#memberTension',trace:'#memberFormulaSteps',rows:'Design basis|Section properties|Net area|Gross-section yielding|Net-section fracture|Design tension'},
 {key:'beam-moment',panel:'beam',label:'#beamSectionCapacity',valid:'#beamSectionCapacity',trace:'#beamFormulaSteps',rows:'Section and source|Material strength|Bending direction|Section class|Effective section modulus|Section moment capacity|Design boundary'},
 {key:'beam-shear',panel:'beam',label:'#beamShearCapacity',valid:'#beamShearCapacity',trace:'#beamFormulaSteps',rows:'Section and source|Material strength|Bending direction|Section shear capacity|Design boundary'},
 {key:'weld-resistance',panel:'weld',label:'#weldCapacityPerMm',valid:'#weldCapacityPerMm',trace:'#weldFormulaSteps',rows:'Weld classification|Design throat thickness|Design capacity per unit|Welded-lap reduction|Design boundary'},
 {key:'weld-parent',panel:'weld',label:'#parentGoverningPerMm',valid:'#parentGoverningPerMm',trace:'#weldFormulaSteps',rows:'Indicative parent-metal screen|Design boundary'},
 {key:'pad-moment',panel:'concrete',label:'#concretePhiMuo',valid:'#concretePhiMuo',trace:'#concreteFormulaSteps',rows:'Analysis basis|Non-flexural region|Reinforcement depth|Reinforcement area|Concrete stress-block|Equivalent concrete|Reinforcement strain|Neutral-axis|Nominal flexural|Flexural capacity factor|Ductility limit|Design flexural'},
 {key:'pad-shear',panel:'concrete',label:'#concretePhiVu',valid:'#concretePhiVu',trace:'#concreteFormulaSteps',rows:'Analysis basis|Reinforcement area|Longitudinal effective|Effective shear|Simplified-method|Shear reinforcement area|Simplified shear factor|Concrete shear contribution|Shear reinforcement contribution|One-way shear design'},
 {key:'chs-cf4100',panel:'chs4600',wrap:'#chsCompare4100Design',valid:'#chsCompare4100Design',trace:'#chsCompare4100Trace',section:true,title:'Cold-formed CHS · AS 4100'},
 {key:'chs-cf4600',panel:'chs4600',wrap:'#chsCompare4600Design',valid:'#chsCompare4600Design',trace:'#chsCompare4600Trace',section:true,title:'Cold-formed CHS · AS/NZS 4600'},
 {key:'chs-hr4100',panel:'chs4600',wrap:'#chsCompareHotDesign',valid:'#chsCompareHotDesign',trace:'#chsCompareHotTrace',section:true,title:'Hot-finished CHS · AS 4100'},
 {key:'monopole-moment',panel:'monopole',wrap:'#monopoleMomentSummary',valid:'#monopoleMomentSummary',trace:'#monopoleFormulaSteps',groups:'.nt-monopole-common,.nt-monopole-moment',title:'Monopole moment capacity'},
 {key:'monopole-mass',panel:'monopole',wrap:'#monopoleMass',valid:'#monopoleMass',trace:'#monopoleFormulaSteps',groups:'.nt-monopole-common,.nt-monopole-mass',title:'Monopole mass'},
 {key:'reo-length',panel:'reo',label:'#reoRequiredLength',valid:'#reoRequiredLength',trace:'#reoFormulaSteps'},
 {key:'reo-anchorage',panel:'reo',label:'#reoAnchoragePrimaryResult',valid:'#reoAnchoragePrimaryResult',trace:'#reoFormulaSteps'},
 {key:'reo-area',panel:'reo',label:'#reoAreaResult',valid:'#reoAreaResult',trace:'#wfAreaFormula',title:'Reinforcement area'},
 {key:'reo-mass',panel:'reo',label:'#reoAreaMass',valid:'#reoAreaMass',trace:'#wfAreaFormula',title:'Nominal bar mass'},
 {key:'bd-deformation',panel:'beamforces',appendAfter:'#bdReadout',label:'Calculation',valid:'#bdReadout',invalidIf:'#bifX[aria-invalid="true"], #bdE[aria-invalid="true"], #bdI[aria-invalid="true"]',trace:'#bdCalculation',title:'Beam deflection and rotation'},
 {key:'bif-forces',panel:'beamforces',appendAfter:'#bifReadout',label:'Calculation',valid:'#bifReadout',invalidIf:'#bifX[aria-invalid="true"]',trace:'#bifCalculation',title:'Beam reactions and section forces'},
 {key:'screw-actions',panel:'screw',label:'#screwDemandCompression',valid:'#screwDemandCompression',trace:'#screwDemandFormulaSteps',title:'Pile-group action distribution'}
];
