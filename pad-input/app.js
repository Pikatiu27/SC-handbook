'use strict';
(function(){
 const $=id=>document.getElementById(id),panel=$('concretePanel');if(!panel)return;
 panel.classList.add('pp-panel');
 // Pad capacity titles are summaries; the full trace stays in Calculation.
 // Mutate the shared link array so its later refreshes cannot recreate buttons.
 const workflowLinks=window.HandbookWorkflowLinks;
 if(Array.isArray(workflowLinks))for(let i=workflowLinks.length-1;i>=0;i--)if(workflowLinks[i].panel==='concrete')workflowLinks.splice(i,1);
 for(const button of panel.querySelectorAll('button[data-wf-result="pad-moment"],button[data-wf-result="pad-shear"]'))button.replaceWith(...button.childNodes);
 const card=panel.querySelector('.concrete-card'),stack=card.querySelector('.concrete-input-stack'),band=document.createElement('div');band.className='pp-input-band';stack.before(band);band.append(stack,$('padInputFigure'));
 const projection=$('concreteFootingProjection').closest('label'),projectionFold=document.createElement('details');projection.classList.add('pp-field');projection.querySelector(':scope>span').innerHTML='Projection, l<sub>v</sub>';projectionFold.className='pp-projection';projectionFold.innerHTML='<summary><span>Footing projection</span></summary>';projectionFold.append(projection);projectionFold.insertAdjacentHTML('beforeend','<p class="pp-control-note" id="ppProjectionBasis">Loaded face to pad edge; region screen only.</p>');projection.querySelector('input').setAttribute('aria-describedby','concreteFootingProjectionError ppProjectionBasis');card.querySelector('.concrete-layer-table').after(projectionFold);
 const shearGroup=card.querySelector('.concrete-shear-group'),shearFold=document.createElement('details');shearFold.className='pp-shear';shearFold.innerHTML='<summary><span>Shear reinforcement <span id="ppShearSummary"></span></span></summary>';shearGroup.before(shearFold);shearFold.append(shearGroup);
 const shearLabels=['Type','Bar','Legs, n<sub>sv</sub>','Spacing, s<sub>v</sub>','Yield, f<sub>sy.f</sub>'];
 [...$('concreteShearInputs').children].forEach((label,i)=>{label.classList.add('pp-field');label.querySelector('span').innerHTML=shearLabels[i];});
 for(const option of $('concreteShearReo').options)option.textContent=option.value==='none'?'None':'Vertical fitments';
 const shearBar=$('concreteShearBar'),n40=shearBar.querySelector('option[value="N40"]'),barNote=document.createElement('small');
 if(n40)n40.textContent='N40';barNote.id='ppShearBarNote';barNote.className='pp-option-note';barNote.textContent='N40 · availability on request.';barNote.hidden=true;shearBar.after(barNote);shearBar.setAttribute('aria-describedby',[shearBar.getAttribute('aria-describedby'),barNote.id].filter(Boolean).join(' '));
 const controls=document.createElement('div');controls.className='pp-controls';
 for(const id of ['concreteDirection','concreteFc','concreteTopDepth','concreteBottomDepth','concreteCover','concreteReinforcementLayout']){const label=$(id).closest('label');label.classList.add('pp-field');if(id==='concreteReinforcementLayout')label.classList.add('pp-arrangement');controls.append(label);}
 controls.querySelector('#concreteDirection').closest('label').querySelector(':scope>span').textContent='Compression face';
 controls.querySelector('#concreteReinforcementLayout').closest('label').querySelector(':scope>span').textContent='Reinforcement';
 for(const option of controls.querySelector('#concreteReinforcementLayout').options)option.textContent=option.value==='two-way'?'Two-way':'One-way';
 const heading=document.createElement('b');heading.className='pp-input-title';heading.textContent='Section inputs';const help=document.createElement('p');help.className='pp-input-help';help.innerHTML='0 = absent pad. Cover to outermost steel.<br>Two-way: equal bar sizes in both directions.';stack.replaceChildren(heading,controls,help);
 const table=card.querySelector('.concrete-layer-table');table.id='padMatTable';table.querySelector('.layer-header').innerHTML='<span>Mat / position</span><span>Centre depth y<sub>i</sub></span><span>Bar</span><span>Spacing</span><span>f<sub>sy</sub></span>';
 for(let i=1;i<=4;i++){
  const row=$('layer'+i+'Y').closest('.layer-row');row.id='layer'+i+'Row';row.querySelector('strong').textContent=(i<=2?'Top pad':'Bottom pad')+' · '+(i%2?'top mat':'bottom mat');
  const captions={Y:'Depth y<sub>i</sub>',Bar:'Bar',Spacing:'Spacing',Fsy:'Yield f<sub>sy</sub>'};
  for(const [suffix,text] of Object.entries(captions)){
   const input=$('layer'+i+suffix),holder=input.closest('label'),caption=document.createElement('span'),control=document.createElement('span');
   caption.className='pp-cell-label';caption.innerHTML=text;control.className='pp-cell-control';
   const unit=holder.querySelector('em');holder.prepend(caption);holder.append(control);control.append(input);if(unit)control.append(unit);
   if(suffix==='Y'){
    holder.classList.add('pp-depth-cell');const mode=document.createElement('span'),status=document.createElement('span'),reset=$('layer'+i+'AutoReset');
    mode.className='pp-depth-mode';status.id='ppDepthState'+i;status.className='pp-depth-state';reset.textContent='Reset';reset.title='Restore automatic depth';
    mode.append(status,reset);holder.append(mode);input.setAttribute('aria-describedby',status.id);
   }
  }
 }
 const note=document.createElement('p');note.className='pp-table-note';note.innerHTML='y<sub>i</sub>: bar centre from overall top. Edit depth to override; Reset restores auto.';table.before(note);
 $('bottomPadLayerNote').innerHTML='Bottom pad absent (D<sub>bot</sub> = 0).';
 const symbols=card.querySelector('.concrete-symbol-details');symbols.querySelector('summary small')?.remove();symbols.querySelector('.symbol-key').insertAdjacentHTML('afterbegin','<span><b>D</b> = D<sub>top</sub> + D<sub>bot</sub></span>');panel.querySelector('.concrete-detail-card>.detail-body').prepend(symbols);
 const results=card.querySelector('.capacity-section'),summary=card.querySelector('.concrete-summary');results.prepend(summary);results.id='padCapacityResults';
 results.querySelector('h2').textContent='Section capacity';
 $('concretePhiMuo').parentElement.querySelector('small').textContent=' kN·m';
 $('concretePhiMuo').closest('article').querySelector('.capacity-label').firstChild.textContent='Flexural capacity ';
 $('concretePhiVu').closest('article').querySelector('.capacity-label').firstChild.textContent='One-way shear capacity ';
 panel.querySelector('.concrete-detail-card>summary small').textContent='Forces, strains and equations';
 panel.querySelector('.source-card>summary small').textContent='AS 3600:2018 · assumptions & exclusions';
 const basis=document.createElement('p');basis.id='ppCapacityBasis';basis.className='pp-result-basis';results.append(basis);
 // Use the same right-aligned +/minus disclosure treatment throughout this page.
 for(const summary of panel.querySelectorAll('details>summary')){
  const details=summary.parentElement;let icon=summary.querySelector(':scope>i');
  if(!icon){icon=document.createElement('i');summary.append(icon);}
  icon.classList.add('pp-disclosure-icon');icon.setAttribute('aria-hidden','true');
  const sync=()=>{const sign=details.open?'−':'+';if(icon.textContent!==sign)icon.textContent=sign;};
  details.addEventListener('toggle',sync);sync();
 }
 let last=null,selected='section';
 const layerName=i=>$('layer'+i+'Row').querySelector('strong').textContent.trim().replace(/\s+/g,' ');
 function draw(){if(!last)return;const model=PadInputDrawing.geometry({...last,selected}),plot=$('padInputPlot'),bounds=plot.getBoundingClientRect(),width=Math.max(120,Math.floor(bounds.width||300)),compact=innerWidth<=580;
  plot.innerHTML=PadInputDrawing.render(model,{width,height:compact?116:190,compact});
  $('padFigureKey').innerHTML=model?'<span><i class="engineering-figure__swatch engineering-figure__swatch--active"></i>Compression: '+(model.compression==='top'?'Top':'Bottom')+'</span><span><i class="engineering-figure__swatch engineering-figure__swatch--bar"></i>Bending bars · cut</span>':'';
  if(model?.layers.some(l=>l.crossY!==null))$('padFigureKey').insertAdjacentHTML('beforeend','<span><i class="engineering-figure__swatch"></i>Cross bars · auto mats</span>');
  if(model?.topDepth>0&&model?.bottomDepth>0)$('padFigureKey').insertAdjacentHTML('beforeend','<span><i class="engineering-figure__swatch"></i>Pad boundary · model only</span>');
  let focus='1 m section strip · illustrative pitch phase.';
  if(!model)focus='Guide unavailable · correct the highlighted inputs.';
  else if(selected.startsWith('layer')){const i=Number(selected.slice(5)),l=model.layers.find(l=>l.index===i);focus=l?layerName(i)+' · y'+i+' = '+l.y.toFixed(1)+' mm from the overall top face.':'This mat is not active.';}
  else if(selected==='cover')focus=model.layers.some(l=>l.automatic)?'Nominal cover to outermost steel at an automatic mat.':'Manual mat depths: nominal cover is not the drawn steel offset.';
  else if(selected==='top'||selected==='bottom')focus=(selected==='top'?'Top pad':'Bottom pad')+' depth · '+(selected==='top'?model.topDepth:model.bottomDepth).toFixed(1)+' mm.';
  $('padFigureFocus').textContent=focus;
 }
 window.PadInputGuide={update(state){last=state;for(let i=1;i<=4;i++){$('ppDepthState'+i).textContent=$('layer'+i+'Y').disabled?'':$('layer'+i+'Auto').checked?'Auto':'Manual';$('layer'+i+'Row').classList.toggle('pp-selected',selected==='layer'+i);}
  $('ppShearSummary').textContent=$('concreteShearReo').value==='none'?'None':'Vertical fitments';
  barNote.hidden=shearBar.value!=='N40'||$('concreteShearReo').value==='none';
  basis.hidden=last.result.ok;basis.textContent=last.result.ok?'':'Capacity unavailable · correct the input noted above.';
  draw();}};
 panel.addEventListener('focusin',e=>{const id=e.target.id;if(!id)return;const layer=id.match(/^layer([1-4])/);selected=layer?'layer'+layer[1]:id==='concreteTopDepth'?'top':id==='concreteBottomDepth'?'bottom':id==='concreteCover'?'cover':'section';if(last)window.PadInputGuide.update(last);});
 panel.addEventListener('click',e=>{const row=e.target.closest('.layer-row');if(!row||e.target.closest('input,select,button'))return;const field=row.querySelector('input[id$="Y"]');if(!field.disabled)field.focus();});
 new ResizeObserver(draw).observe($('padInputPlot'));
 new MutationObserver(()=>{if(!panel.hidden)draw();}).observe(panel,{attributes:true,attributeFilter:['hidden']});
 calculateConcrete();
})();
