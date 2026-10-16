'use strict';
(()=>{
 const links=window.HandbookWorkflowLinks,$=s=>document.querySelector(s),byKey=new Map(links.map(x=>[x.key,x]));let active=null,scheduled=false;
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
  const area=$('#reoAreaResult');if(area&&!$('#wfAreaCalculation')){const view=area.closest('.reo-area-view')||area.closest('[id]');const root=area.closest('#reoPanel');const old=[...root.querySelectorAll('details')].find(d=>/^Basis & limitations/.test(d.querySelector('summary')?.textContent.trim()||''));if(old){const d=disclosure('wfAreaCalculation','Calculation');d.classList.add('wf-area-calculation');d.querySelector('.detail-body').innerHTML='<div id="wfAreaFormula" class="formula-list"></div>';old.before(d);old.dataset.wfSource='true';}}
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
  const panel=$('#'+c.panel+'Panel');if(!panel)return null;
  let button=panel.querySelector('[data-wf-result="'+c.key+'"]');
  if(!button){
   let target;
   if(c.appendAfter){const after=$(c.appendAfter);if(!after)return null;const box=document.createElement('span');box.className='wf-result-actions';button=document.createElement('button');button.textContent=c.label;box.append(button);after.after(box);}
   else{const value=$(c.wrap||c.label);if(!value)return null;target=c.wrap?value:value.closest('.capacity-card')?.querySelector(':scope > span')||value.parentElement?.querySelector(':scope > span');if(!target)return null;
    if(target.closest('button.wf-result-link'))return target.closest('button.wf-result-link');
    button=document.createElement('button');target.before(button);button.append(target);
   }
   button.type='button';button.className='wf-result-link';button.dataset.wfResult=c.key;button.id='wf-result-'+c.key;
   button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(!button.disabled)open(c,button);});
  }
  const title=c.title||button.textContent.trim().replace(/\s+/g,' ');button.setAttribute('aria-label','View '+title+' calculation');
  const disabled=!valid(c);if(button.disabled!==disabled)button.disabled=disabled;
  return button;
 }
 function restoreFilter(d){for(const e of d.querySelectorAll('[data-wf-suppressed]'))e.removeAttribute('data-wf-suppressed');d.removeAttribute('data-wf-focused');}
 function clear({close=false,focus=false}={}){
  if(!active)return;const old=active;active=null;restoreFilter(old.details);
  for(const e of old.details.querySelectorAll(':scope > .wf-toolbar,:scope > .wf-footer'))e.hidden=true;
  if(close)old.details.open=false;
  if(focus)requestAnimationFrame(()=>{const origin=document.getElementById('wf-result-'+old.config.key)||old.origin;if(visible(origin)){origin.focus({preventScroll:true});window.scrollTo({top:old.scrollY,behavior:'instant'});}});
 }
 function rowsFor(c,root){
  if(c.groups)return [...root.querySelectorAll(c.groups)];
  if(c.section)return [root.closest('section')||root];
  if(c.rows){const re=new RegExp(c.rows,'i');return [...root.querySelectorAll('.calculation-trace-row')].filter(row=>re.test(row.querySelector('.calculation-trace-heading')?.textContent||''));}
  if(c.directRows){const re=new RegExp(c.directRows,'i');return [...root.children].filter(row=>re.test(row.querySelector('b')?.textContent||''));}
  return [root];
 }
 function suppress(body,keep){
  for(const child of body.children){if(keep.includes(child))continue;if(keep.some(node=>child.contains(node)))suppress(child,keep);else child.setAttribute('data-wf-suppressed','true');}
 }
 function toolbar(d){
  let bar=d.querySelector(':scope > .wf-toolbar');if(bar)return bar;
  bar=document.createElement('div');bar.className='wf-toolbar';bar.innerHTML='<strong class="wf-context"></strong><button type="button" class="wf-back">Back to results</button><button type="button" class="wf-all">All calculations</button>';
  bar.querySelector('.wf-back').addEventListener('click',()=>clear({close:true,focus:true}));
  bar.querySelector('.wf-all').addEventListener('click',()=>{if(!active)return;active.all=true;restoreFilter(active.details);text(bar.querySelector('.wf-context'),'All calculations');d.scrollIntoView({block:'start',behavior:'instant'});});
  d.querySelector('summary').after(bar);const footer=document.createElement('div');footer.className='wf-footer';footer.innerHTML='<button type="button" class="wf-back">Back to results</button>';footer.querySelector('button').addEventListener('click',()=>clear({close:true,focus:true}));d.append(footer);
  d.addEventListener('toggle',()=>{if(!d.open&&active?.details===d)clear();});return bar;
 }
 function apply(){
  if(!active)return;
  const c=active.config,root=$(c.trace);if(!root||!valid(c)||!active.origin.isConnected||$('#'+c.panel+'Panel')?.hidden){clear({close:true});return;}
  const d=root.closest('details'),body=d.querySelector(':scope > .detail-body,:scope > .source-body');if(!body){clear();return;}
  restoreFilter(d);const bar=toolbar(d);bar.hidden=false;d.querySelector(':scope > .wf-footer').hidden=false;
  if(active.all){text(bar.querySelector('.wf-context'),'All calculations');return;}
  const keep=rowsFor(c,root);if(!keep.length){clear({close:true});return;}
  if(!keep.includes(body))suppress(body,keep);d.dataset.wfFocused=c.key;text(bar.querySelector('.wf-context'),(c.title||active.origin.textContent.trim().replace(/\s+/g,' '))+' · Calculation');
 }
 function open(c,origin){
  clear();const root=$(c.trace),d=root?.closest('details');if(!d)return;
  const y=window.scrollY;
  active={config:c,origin,details:d,scrollY:y,all:false};d.classList.add('wf-calculation');if(!d.open)d.open=true;apply();
  if(!active)return;d.tabIndex=-1;d.focus({preventScroll:true});d.scrollIntoView({block:'start',behavior:'instant'});
 }
 function refresh(){scheduled=false;prepare();areaTrace();for(const c of links)trigger(c);apply();}
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(refresh);}}
 document.addEventListener('click',event=>{if(active&&event.target.closest('a[data-check],.tool-tab,.tool-category,#directoryHomeLink,#directoryProductsLink'))clear();},true);
 // Native lookup owners restore their row focus. Keep that focus below the sticky navigation.
 document.addEventListener('click',event=>{if(!event.target.closest('#stBack,#coverClose,#scEnvClose,#antennaBack,button[data-ca-close],.fp-detail-close'))return;requestAnimationFrame(()=>{const e=document.activeElement;if(!visible(e)||e===document.body)return;const top=e.getBoundingClientRect().top;if(top<130)window.scrollBy({top:top-130,behavior:'instant'});});});
 window.addEventListener('hashchange',()=>{clear();schedule();});
 const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','open']});
 refresh();
})();
