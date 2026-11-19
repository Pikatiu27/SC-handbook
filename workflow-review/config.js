'use strict';
window.HandbookWorkflowLinks=[
 {key:'bd-deformation',panel:'beamforces',appendAfter:'#bdReadout',label:'Deformation calculation',valid:'#bdReadout',invalidIf:'#bifX[aria-invalid="true"], #bdE[aria-invalid="true"], #bdI[aria-invalid="true"]',trace:'#bdCalculation',calculationId:'wfDeformationCalculation',title:'deformation calculation'},
 {key:'bif-forces',panel:'beamforces',appendAfter:'#bifReadout',label:'Internal-force calculation',valid:'#bifReadout',invalidIf:'#bifX[aria-invalid="true"]',trace:'#bifCalculation',calculationId:'wfBifCalculation',title:'internal-force calculation'}
];
