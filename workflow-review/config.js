'use strict';
window.HandbookWorkflowLinks=[
 {key:'bolt-selected',panel:'bolt',appendAfter:'#boltResultNote',label:'Calculation',valid:'#selectedShearCapacity',visibility:'#boltResultNote',trace:'#formulaSteps',calculationId:'wfBoltCalculation',title:'Bolt calculation'},
 {key:'bd-deformation',panel:'beamforces',appendAfter:'#bdReadout',label:'Calculation',valid:'#bdReadout',invalidIf:'#bifX[aria-invalid="true"], #bdE[aria-invalid="true"], #bdI[aria-invalid="true"]',trace:'#bdCalculation',calculationId:'wfDeformationCalculation',title:'Beam deflection and rotation'},
 {key:'bif-forces',panel:'beamforces',appendAfter:'#bifReadout',label:'Calculation',valid:'#bifReadout',invalidIf:'#bifX[aria-invalid="true"]',trace:'#bifCalculation',calculationId:'wfBifCalculation',title:'Beam reactions and section forces'}
];
