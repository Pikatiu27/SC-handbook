/* Approved Bolt Capacity presentation. All original calculator controls and result IDs are retained. */
(function(){
 'use strict';
 const $=id=>document.getElementById(id),detail=$('connectionDetails');if(!detail)return;
 const body=detail.querySelector('.detail-body'),input=body.querySelector('.connection-inputs'),plies=body.querySelector('.connected-ply-inputs'),rupture=$('connectedPlyIntegrity'),capacity=body.querySelector('.connection-capacity-section'),tf=$('tfSlipSection');
 const node=(tag,cls,html='')=>{const e=document.createElement(tag);e.className=cls;e.innerHTML=html;return e;};
 detail.classList.add('bd-details');
 detail.querySelectorAll('.connection-locator').forEach(e=>e.remove());
 const grid=node('div','bd-grid'),left=node('section','bd-input-frame','<h3>Connection inputs</h3>'),right=node('section','bd-result-frame'),sticky=node('div','bd-result-content','<h3>Connection capacities</h3><p id="bdContext" class="bd-context"></p>');
 input.querySelector('h3').remove();capacity.querySelector('.connection-results-heading').remove();left.append(input,plies);right.append(sticky);grid.append(left,right);body.prepend(grid);
 const summary=capacity.querySelector('.connection-summary-list'),support=node('details','bd-support','<summary><b>Bearing limits &amp; plies</b><i aria-hidden="true">+</i></summary><div class="bd-support-body connection-summary-list"></div>');
 support.querySelector('.bd-support-body').append($('fullBearingLimitRow'),$('edgeBearingLimitRow'),$('plyComparison'));
 $('groupShearResultRow').querySelector('span').innerHTML='Shear φV<sub>f</sub>';$('bearingResultRow').querySelector('span').innerHTML='Bearing φV<sub>b</sub>';
 sticky.append(summary,capacity.querySelector('.local-bearing-scope'),support);
 const ruptureSummary=node('section','bd-rupture-summary','<h4>Ply rupture capacities</h4>');ruptureSummary.append($('integrityResults'),$('integrityCheckNote'));sticky.append(ruptureSummary);
 capacity.querySelector('.connection-result-subheading').remove();capacity.remove();
 const ruptureFold=node('details','bd-optional','<summary><b>Ply rupture assessment</b><i aria-hidden="true">+</i></summary>');
 const ruptureStatus=$('integritySummaryStatus');ruptureFold.querySelector('summary').insertBefore(ruptureStatus,ruptureFold.querySelector('i'));ruptureStatus.hidden=true;const checkProgress=node('span','bd-check-progress');checkProgress.setAttribute('aria-live','polite');ruptureFold.querySelector('summary').insertBefore(checkProgress,ruptureFold.querySelector('i'));rupture.querySelector('.assessment-heading').remove();ruptureFold.append(rupture);left.append(ruptureFold);
 const slipSummary=node('section','bd-slip-summary','<h4>TF slip</h4>');tf.querySelector('.compact-result>span').textContent='Design slip resistance · per bolt';tf.querySelector('.interaction-result>span').textContent='Bolt-group slip utilisation';slipSummary.append(tf.querySelector('.compact-result'),tf.querySelector('.interaction-result'),$('slipGoverningNote'));sticky.append(slipSummary);
 const actions=node('details','bd-optional bd-slip-actions','<summary><b>Serviceability slip actions</b><i aria-hidden="true">+</i></summary>');
 const actionHeading=tf.querySelector('.slip-action-heading'),actionFields=actionHeading.nextElementSibling;actions.append(actionFields);actionHeading.remove();tf.append(actions);left.append(tf);
 const guide=node('section','bd-guide','<div class="bd-guide-heading"><b>Connection guide</b><div role="group" aria-label="Geometry guide view"><button type="button" data-bd-view="edge" aria-pressed="true">e / a<sub>e</sub></button><button type="button" data-bd-view="plane" aria-pressed="false">N / X</button></div></div><div class="bd-edge-view"><div id="bdEdgeDrawing"></div><div class="bd-edge-key"><p id="bdNonstandardNote" hidden>Non-standard hole: use the actual hole/slot drawing for e and a<sub>e</sub>.</p><p id="bdStandardEdgeNote"><b>e</b> · hole centre to ply edge</p><p><b>a<sub>e</sub> = min(c) + d<sub>f</sub>/2</b><br>Include adjacent holes; use the project drawing.</p><p class="bd-guide-note">d<sub>f</sub>: nominal bolt diameter</p></div></div><div class="bd-plane-view" hidden><div class="bd-plane-pair"><div><div id="bdNGuide"></div><p class="bd-plane-caption"><b>N</b> · threads intercept</p></div><div><div id="bdXGuide"></div><p class="bd-plane-caption"><b>X</b> · threads clear</p></div></div><p class="bd-guide-note">Dashed line: shear plane between plies.</p></div><small class="bd-nts">Schematic only · not to scale</small>');
 input.append(guide);
 const label=(id,html)=>{const control=$(id),l=control.closest('label');if(l)l.querySelector('span').innerHTML=html;};
 // Keep calculator controls intact; organise by their role in the selected-ply checks.
 const checkControls=rupture.querySelector('.integrity-body>.form-grid');checkControls.classList.add('bd-check-controls');
 const checkedLabel=$('integrityComponent').closest('label');label('integrityComponent','Selected ply');
 const identicalPly=node('div','bd-identical-ply','<span>Selected ply</span><b>Primary ply</b>');checkedLabel.after(identicalPly);
 const material=rupture.querySelector('.integrity-ply-section'),net=$('integrityAreaMode').closest('.integrity-input-section'),block=$('integrityAgv').closest('.integrity-input-section');
 material.querySelector('.connection-group-heading b').textContent='Material basis';
 const adopted=node('div','bd-ply-adopted form-grid','<div><span>Thickness t<sub>p</sub></span><b id="bdAdoptedTp"></b></div><div><span>Tensile f<sub>uc</sub></span><b id="bdAdoptedFu"></b></div>');
 adopted.append($('integrityFy').closest('label'));
 const retained=node('div','bd-retained-controls');retained.hidden=true;retained.append($('integrityThickness').closest('label'),$('integrityFu').closest('label'));
 material.querySelector('.integrity-ply-material').remove();material.append(adopted,retained,node('p','bd-flow-help','t<sub>p</sub> and f<sub>uc</sub> follow the selected ply; enter its f<sub>yc</sub>.'));
 net.querySelector('.connection-group-heading b').textContent='Section tension';
 net.querySelector('.integrity-net-controls').after($('integrityStraightGeometry'));$('integrityStraightGeometry').after($('integrityGeometryNote'));
 const netAreas=net.querySelector('.integrity-net-areas'),computed=node('dl','bd-computed-areas','<div><dt>Gross A<sub>g</sub></dt><dd id="bdComputedAg"></dd></div><div><dt>Net A<sub>n</sub></dt><dd id="bdComputedAn"></dd></div>');computed.setAttribute('aria-label','Calculated section areas');computed.setAttribute('aria-live','polite');netAreas.after(computed);
 const areaHelp=node('p','bd-flow-help','A<sub>g</sub> = bt<sub>p</sub> · A<sub>n</sub> = (b − n<sub>h</sub>d<sub>h</sub>)t<sub>p</sub>');computed.after(areaHelp);
 block.querySelector('.connection-group-heading b').textContent='Block shear';
 label('integrityPlateWidth','Width b');label('integrityHoleCount','Holes n<sub>h</sub>');label('integrityHoleDiameter','Deduction d<sub>h</sub>');label('integrityFy','Yield f<sub>yc</sub>');label('integrityKt','Distribution k<sub>t</sub>');label('integrityAg','Gross A<sub>g</sub>');label('integrityAn','Net A<sub>n</sub>');label('integrityAgv','Gross shear A<sub>gv</sub>');label('integrityAnv','Net shear A<sub>nv</sub>');label('integrityAnt','Net tension A<sub>nt</sub>');label('integrityKbs','Distribution k<sub>bs</sub>');
 plies.querySelector('.connected-ply-heading b').textContent='Connected plies · bearing';
 const plyFlowNote=node('p','bd-flow-help','Bearing: the lower ply capacity controls. Use separate plies for different properties or rupture paths.');$('connectedPlyBasisNote').after(plyFlowNote);
 const resultPly=node('p','bd-rupture-context');ruptureSummary.querySelector('h4').after(resultPly);
 ruptureSummary.append(node('p','bd-flow-help','Selected ply and supplied paths only; repeat for other relevant plies and paths.'));
 label('boltCount','Bolts');label('threadPlanes','N planes');label('shankPlanes','X planes');label('kr','Lap factor k<sub>r</sub>');
 for(const suffix of ['', '2']){label('plateThickness'+suffix,'Thickness t<sub>p</sub>');label('plateStrength'+suffix,'Strength f<sub>up</sub>');label('effectiveEdgeInput'+suffix,'Effective edge a<sub>e</sub>');}
 const pitchNote=$('pitchCheckValue');plies.querySelector('.shared-ply-geometry').after(pitchNote);$('boltPitch').closest('.detailing-input-control').querySelector('label').innerHTML='Pitch p <i>centre-to-centre</i>';
 const note=node('p','bd-plane-note','Planes per bolt · N: threads intercept · X: threads clear');input.querySelector('.form-grid').after(note);
 plies.querySelectorAll('.effective-edge-definition').forEach(e=>{e.innerHTML='a<sub>e</sub>: directional hole-edge clearance + d<sub>f</sub>/2. Include adjacent holes; AS 4100 Cl.9.2.2.4.';});
 plies.querySelectorAll('.bolt-ply-card').forEach(card=>{const basic=card.querySelector('.form-grid.two'),edge=card.querySelector('.detailing-input-field'),entry=card.querySelector('.edge-ae-entry'),edgeNote=edge.querySelector('.detailing-input-note'),definition=entry.querySelector('.effective-edge-definition');basic.classList.add('bd-ply-basic');entry.classList.add('bd-ply-edges');entry.prepend(edge);const notes=node('div','bd-ply-notes');notes.append(edgeNote,definition);entry.after(notes);});
 const detailingNote=node('p','checklist-warning bd-detailing-note');sticky.insertBefore(detailingNote,support);
 let view='edge';
 function showView(v){view=v;guide.querySelector('.bd-edge-view').hidden=v!=='edge';guide.querySelector('.bd-plane-view').hidden=v!=='plane';guide.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.bdView===v)));}
 guide.addEventListener('click',e=>{const b=e.target.closest('button[data-bd-view]');if(b)showView(b.dataset.bdView);});
 detail.addEventListener('focusin',e=>{if(['threadPlanes','shankPlanes'].includes(e.target.id)){showView('plane');guide.dataset.active=e.target.id==='threadPlanes'?'N':'X';}else if(['edgeDistance','edgeDistance2','effectiveEdgeInput','effectiveEdgeInput2'].includes(e.target.id)){showView('edge');guide.dataset.active=e.target.id.startsWith('effective')?'ae':'e';}});
 let narrow;
 function draw(){const n=guide.clientWidth<300;if(n===narrow)return;narrow=n;$('bdEdgeDrawing').innerHTML=window.BoltDetailDiagram.edge(n);$('bdNGuide').innerHTML=window.BoltDetailDiagram.plane('N',n);$('bdXGuide').innerHTML=window.BoltDetailDiagram.plane('X',n);}
 const textIfChanged=(element,text)=>{if(element.textContent!==text)element.textContent=text;};
 function sync(){const category=$('category').value,count=$('boltCount').value;const context=$('boltSize').value+' · '+category+' · '+count+' bolts';textIfChanged($('bdContext'),context);ruptureSummary.hidden=$('integrityMode').value==='none';slipSummary.hidden=tf.hidden;
  const separate=$('connectedPlyBasis').value==='separate',selected=$('integrityComponent').value==='second'?'Second ply':'Primary ply';checkedLabel.hidden=!separate;identicalPly.hidden=separate;textIfChanged(resultPly,selected+' · section tension and block shear');
  const calculated=[$('integrityNetCapacity'),$('integrityBlockCapacity')].filter(e=>e.textContent.trim().endsWith(' kN')).length;textIfChanged(checkProgress,ruptureSummary.hidden?'Not evaluated':calculated+'/2 calculated');
  textIfChanged($('bdAdoptedTp'),($('integrityThickness').value||'—')+' mm');textIfChanged($('bdAdoptedFu'),($('integrityFu').value||'—')+' MPa');
  const straight=$('integrityAreaMode').value==='straight',validAreas=$('integrityAg').value!==''&&$('integrityAn').value!=='';$('integrityStraightGeometry').hidden=!straight;$('integrityGeometryNote').hidden=!straight;netAreas.hidden=straight;computed.hidden=!straight||!validAreas;areaHelp.hidden=!straight||!validAreas;$('integrityNetAreaNote').hidden=straight&&validAreas;
  textIfChanged($('bdComputedAg'),$('integrityAg').value+' mm²');textIfChanged($('bdComputedAn'),$('integrityAn').value+' mm²');
  const standard=$('holeFactor').value==='1';$('bdEdgeDrawing').hidden=!standard;$('bdNonstandardNote').hidden=standard;$('bdStandardEdgeNote').hidden=!standard;guide.classList.toggle('bd-is-nonstandard',!standard);const warning=$('boltDetailingStatus');detailingNote.hidden=warning.hidden;textIfChanged(detailingNote,warning.textContent);draw();}
 let queued=false;function update(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync();});}
 $('boltPanel').addEventListener('input',update);$('boltPanel').addEventListener('change',update);$('boltPanel').addEventListener('click',update);
 const observer=new MutationObserver(update);for(const id of ['groupShearCapacity','governingBearingCapacity','integritySummaryStatus','slipCapacity'])observer.observe($(id),{childList:true,characterData:true,subtree:true});observer.observe(tf,{attributes:true,attributeFilter:['hidden']});
 new ResizeObserver(()=>{narrow=undefined;draw();}).observe(guide);sync();
})();
