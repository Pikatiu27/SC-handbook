'use strict';
(()=>{
 const links=window.HandbookWorkflowLinks,$=s=>document.querySelector(s);let scheduled=false;
 const visible=e=>!!e&&!e.closest('[hidden]')&&e.getClientRects().length>0;
 const valid=c=>{const e=$(c.valid),v=e?.textContent.trim()||'';return !(c.invalidIf&&$(c.invalidIf))&&visible(c.visibility?$(c.visibility):e)&&/\d/.test(v)&&!/not evaluated|invalid|not enabled|input required|not published/i.test(v);};
 const text=(e,value)=>{if(e.textContent!==value)e.textContent=value;};
 function disclosure(id,title,bodyClass='detail-body'){
  const d=document.createElement('details');d.id=id;d.className='detail-card wf-disclosure';
  const summary=document.createElement('summary');summary.innerHTML='<span><b></b></span><i aria-hidden="true">+</i>';summary.querySelector('b').textContent=title;
  const body=document.createElement('div');body.className=bodyClass;d.append(summary,body);return d;
 }
 function prepare(){
  // Move existing owned trace nodes; all IDs, expressions and numerical controllers survive.
  const bolt=$('#formulaSteps');if(bolt&&!$('#wfBoltCalculation')){const old=bolt.closest('details'),d=disclosure('wfBoltCalculation','Calculation');old.before(d);d.querySelector('.detail-body').append(bolt);old.classList.add('wf-source-only');old.dataset.wfSource='true';}
  const screw=$('#screwDemandFormulaSteps');if(screw&&!$('#wfScrewCalculation')){const section=screw.closest('section'),d=disclosure('wfScrewCalculation','Calculation'),heading=section.querySelector('h3');section.before(d);for(const child of [...section.childNodes])if(child!==heading)d.querySelector('.detail-body').append(child);section.remove();}
  const area=$('#reoAreaResult');if(area&&!$('#wfAreaCalculation')){const root=area.closest('#reoPanel');const old=[...root.querySelectorAll('details')].find(d=>/^Basis & limitations/.test(d.querySelector('summary')?.textContent.trim()||''));if(old){const d=disclosure('wfAreaCalculation','Calculation');d.classList.add('wf-area-calculation');d.querySelector('.detail-body').innerHTML='<div id="wfAreaFormula" class="formula-list"></div>';old.before(d);old.dataset.wfSource='true';}}
  for(const d of document.querySelectorAll('.tool-panel details.detail-card,.tool-panel details.source-card')){
   const summary=d.querySelector(':scope > summary'),b=summary?.querySelector('b');if(!b)continue;
   const name=b.textContent.trim();d.classList.add('wf-disclosure');const indicator=summary.querySelector('i');if(indicator){if(indicator.getAttribute('aria-hidden')!=='true')indicator.setAttribute('aria-hidden','true');text(indicator,d.open?'−':'+');}
   if(d.dataset.wfSource==='true'||/^(?:Sources? (?:and limitations|and scope)|Scope & sources|Coverage & sources|Product basis and limitations|References & limitations|Basis \/ limits|Catalogue scope|Calculation basis and limitations)$/.test(name))text(b,'Sources & scope');
   else if(/^(?:Calculation details|Detailed section checks|Derivations)$/.test(name))text(b,'Calculation');
  }
 }
 function areaTrace(){
  const holder=$('#wfAreaFormula');if(!holder)return;
  const barArea=$('#reoAreaSingleArea')?.textContent||'',barMass=$('#reoAreaSingleMass')?.textContent||'',spacing=$('#reoAreaSpacing')?.value||'',count=$('#reoAreaCount')?.value||'',length=$('#reoAreaLength')?.value||'';
  const unit=$('#reoAreaResultUnit')?.textContent||'',atSpacing=unit.includes('/m'),mode=atSpacing?'At spacing':'Number of bars';
  const source=$('#wfAreaCalculation')?.nextElementSibling,paragraphs=[...source?.querySelectorAll('.detail-body > p')||[]],formula=paragraphs.find(p=>p.querySelector('b')?.textContent.startsWith(mode))?.innerHTML||'';
  if(!formula)return;
  const result=($('#reoAreaResult')?.textContent||'')+' '+unit+'; '+($('#reoAreaMass')?.textContent||'')+' '+($('#reoAreaMassUnit')?.textContent||'');
  const sig=[formula,barArea,barMass,spacing,count,length,result].join('|');if(holder.dataset.signature===sig)return;holder.dataset.signature=sig;
  const substitution='Abar = '+barArea+' mm²; mbar = '+barMass+' kg/m; '+(atSpacing?'s = '+spacing+' mm':'n = '+count+'; L = '+length+' m');
  holder.innerHTML=window.calculationTraceRow({title:'Area and nominal mass',reference:'AS/NZS 4671:2019 Table 7.5(A)',formula,substitution,result,applicability:$('#reoAreaScope')?.textContent||'Numerical area/mass only; project detailing remains required.'});
 }
 function trigger(c){
  const panel=$('#'+c.panel+'Panel'),after=$(c.appendAfter),d=$(c.trace)?.closest('details');if(!panel||!after||!d)return null;
  if(!d.id)d.id=c.calculationId;
  d.classList.add('wf-calculation');
  let button=panel.querySelector('[data-wf-result="'+c.key+'"]');
  if(!button){
   const box=document.createElement('span');box.className='wf-result-actions';button=document.createElement('button');button.textContent=c.label;box.append(button);after.after(box);
   button.type='button';button.className='wf-calculation-button';button.dataset.wfResult=c.key;button.id='wf-result-'+c.key;
   button.addEventListener('click',()=>{if(!valid(c))return;d.open=true;d.querySelector(':scope > summary')?.focus({preventScroll:true});d.scrollIntoView({block:'start',behavior:'instant'});});
  }
  button.setAttribute('aria-label','View '+c.title);button.setAttribute('aria-controls',d.id);button.setAttribute('aria-expanded',String(d.open));
  const disabled=!valid(c);if(button.disabled!==disabled)button.disabled=disabled;
  return button;
 }
 function refresh(){scheduled=false;prepare();areaTrace();for(const c of links)trigger(c);}
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(refresh);}}
 // Native lookup owners restore their row focus. Keep that focus below the sticky navigation.
 document.addEventListener('click',event=>{if(!event.target.closest('#stBack,#coverClose,#scEnvClose,#antennaBack,button[data-ca-close],.fp-detail-close'))return;requestAnimationFrame(()=>{const e=document.activeElement;if(!visible(e)||e===document.body)return;const top=e.getBoundingClientRect().top;if(top<130)window.scrollBy({top:top-130,behavior:'instant'});});});
 window.addEventListener('hashchange',schedule);
 const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','open']});
 refresh();
})();
