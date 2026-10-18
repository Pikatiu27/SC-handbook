"use strict";
(() => {
  const C=BeamInternalForces,D=BeamForcesDrawing,panel=document.getElementById("beamforcesPanel");if(!panel)return;
  const $=id=>document.getElementById("bif"+id),esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let loads=C.defaults.loads.map(l=>({...l})),nextId=3,selected="L1",result=null,x=3,pinned=false,drag=null,coordinateValid=true;
  const fmt=D.formatResult,pos=v=>Number.isFinite(v)?v.toString():"—",number=e=>e.value.trim()===""?NaN:Number(e.value);
  const forceFmt=(value,key)=>fmt(value,Math.max(Math.abs(result.extrema[key].min[key]),Math.abs(result.extrema[key].max[key])));
  const loadChoices={point:'Point force',moment:'Applied couple',udl:'Uniform load',triangle:'Triangular load',trapezoid:'Trapezoidal load',linear:'Linear distribution'},loadTools=$("LoadTools");
  // General linear is an explicit editor choice and may include special shapes.
  // Named shape presets otherwise follow the actual editable end intensities.
  const loadKind=l=>l.type!=='linear'?l.type:l.profile==='linear'||![l.q0,l.q1].every(Number.isFinite)?'linear':l.q0===0&&l.q1===0&&['triangle','trapezoid'].includes(l.profile)?l.profile:l.q0!==l.q1&&(l.q0===0||l.q1===0)?'triangle':l.q0!==l.q1&&l.q0*l.q1>0?'trapezoid':'linear';
  const loadTitle=l=>loadChoices[loadKind(l)];
  function choiceButton(kind,name,attribute){return `<button type="button" ${attribute}="${kind}" aria-label="${esc(name)}"${attribute==='data-beam-type'?` aria-pressed="${kind===$("Type").value}"`:''}><span class="engineering-figure bif-choice-symbol" aria-hidden="true"><span class="engineering-figure__plot bif-choice-plot">${D.renderChoice(kind,{id:attribute+'-'+kind})}</span></span><span>${esc(name)}</span></button>`;}
  $("TypeOptions").innerHTML=Object.entries(C.types).map(([kind,name])=>choiceButton(kind,name,'data-beam-type')).join('');
  $("ReferenceOptions").innerHTML=Object.entries(D.referenceLayouts).map(([kind,l])=>`<button type="button" disabled aria-label="${esc(l.name)}; not calculated"><span class="engineering-figure bif-choice-symbol" aria-hidden="true"><span class="engineering-figure__plot bif-choice-plot">${D.renderReferenceLayout(kind)}</span></span><span>${esc(l.name)}</span><small class="bif-reference-status">Not calculated</small></button>`).join('');
  function showReferenceLayouts(reference){$("TypeOptions").hidden=reference;$("ReferenceOptions").hidden=!reference;$("AvailableLayouts").setAttribute('aria-pressed',String(!reference));$("ReferenceLayouts").setAttribute('aria-pressed',String(reference));$("LayoutCaption").textContent=reference?'Reference only · not calculated. These schematics are not the active beam model.':'6 calculated layouts · schematic only, not to scale';}
  $("AvailableLayouts").addEventListener('click',()=>showReferenceLayouts(false));
  $("ReferenceLayouts").addEventListener('click',()=>showReferenceLayouts(true));
  $("LoadOptions").innerHTML=['point','moment','udl','triangle','trapezoid','linear'].map(kind=>choiceButton(kind,loadChoices[kind],'data-add-type')).join('');
  function closeLoadPicker(focus=false){$("LoadPicker").hidden=true;$("Add").setAttribute('aria-expanded','false');if(focus)$("Add").focus();}
  function updateTypeChoice(){const type=$("Type").value;$("TypeName").textContent=C.types[type];panel.querySelectorAll('[data-beam-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.beamType===type)));}
  function input(){return {type:$("Type").value,length:number($("Length")),a:number($("A")),b:number($("B")),loads};}
  function field(load,key,label,unit,value){return `<label><span>${label}</span><span class="unit"><input type="number" step="any" data-load-field="${key}" data-id="${esc(load.id)}" value="${Number.isFinite(value)?value:""}" aria-label="${esc(load.id+' '+label)}"><em>${unit}</em></span></label>`;}
  function loadSummary(l){
    const numbers=[l.start,...(['point','moment'].includes(l.type)?[l.p]:[l.end,l.q0,l.q1])];
    if(numbers.some(v=>!Number.isFinite(v)))return 'Input required';
    if(l.type==='point'||l.type==='moment')return `${fmt(l.p)} ${l.type==='point'?'kN':'kN·m'} · x = ${pos(l.start)} m`;
    return `${l.type==='udl'?fmt(l.q0):fmt(l.q0)+' → '+fmt(l.q1)} kN/m · ${pos(l.start)}–${pos(l.end)} m`;
  }
  function syncLoadSelection(closeOthers=false){
    panel.querySelectorAll('[data-load-row]').forEach(row=>{const active=row.dataset.loadRow===selected;row.setAttribute('aria-current',String(active));if(closeOthers&&!active)row.open=false;});
  }
  function updateLoadSummaries(){for(const l of loads){const summary=panel.querySelector(`[data-load-summary="${l.id}"]`),name=panel.querySelector(`[data-load-name="${l.id}"]`);if(summary)summary.textContent=loadSummary(l);if(name)name.textContent=l.id+' · '+loadTitle(l);}}
  function revealFirstLoadError(errors){const field=errors[0]?.field;if(!field?.startsWith('load:'))return;selected=field.slice(5);const row=panel.querySelector(`[data-load-row="${selected}"]`);if(row)row.open=true;syncLoadSelection(true);}
  function renderLoads(){
    $("Loads").innerHTML=loads.map(l=>{
      const point=['point','moment'].includes(l.type);
      const fields=field(l,'start',point?'Position, x':'Start, x₀','m',l.start)+(point?field(l,'p',l.type==='point'?'Force, P':'Couple, C',l.type==='point'?'kN':'kN·m',l.p):field(l,'end','End, x₁','m',l.end)+field(l,'q0',l.type==='udl'?'Intensity, q':'Start intensity, q₀','kN/m',l.q0)+(l.type==='linear'?field(l,'q1','End intensity, q₁','kN/m',l.q1):''));
      return `<details class="bif-load" data-load-row="${esc(l.id)}" aria-current="${l.id===selected}" ${l.id===selected?'open':''}><summary><span class="bif-load-copy"><span class="bif-load-name" data-load-name="${esc(l.id)}">${esc(l.id)} · ${esc(loadTitle(l))}</span><span class="bif-load-value" data-load-summary="${esc(l.id)}">${esc(loadSummary(l))}</span></span><i aria-hidden="true">+</i></summary><div class="bif-load-body"><div class="bif-fields input-group-fields">${fields}</div><div class="bif-load-actions"><button type="button" data-remove="${esc(l.id)}" aria-label="Remove ${esc(l.id)}">Remove load</button></div></div></details>`;
    }).join('');
    if(!loads.length)$("Loads").innerHTML='<p class="bif-help">No loads · zero-force case. Add a load to continue.</p>';
    $("Add").disabled=loads.length>=24;moveControl();
  }
  function arrangement(resetSupports=false){const t=$("Type").value,L=number($("Length"));updateTypeChoice();$("AField").hidden=!['overhang-left','overhang-both'].includes(t);$("BField").hidden=!['overhang-right','overhang-both'].includes(t);if(resetSupports&&Number.isFinite(L)){$("A").value=Number((.2*L).toFixed(6));$("B").value=Number((.8*L).toFixed(6));}$("SupportSummary").textContent=Number.isFinite(L)?C.supports(input()).map(r=>`${r.id} · ${r.fixed?'Fixed':r.id==='A'?'Pin':'Roller'} · ${pos(r.x)} m`).join('  /  '):'Enter a beam length to locate supports.';}
  function moveControl(){const l=loads.find(l=>l.id===selected),L=number($("Length")),body=panel.querySelector(`[data-load-row="${selected}"] .bif-load-body`);if(body&&loadTools.parentElement!==body){if(loadTools.dataset.loadId!==selected)loadTools.open=false;body.append(loadTools);}else if(!body)$("Loads").after(loadTools);loadTools.dataset.loadId=selected||'';loadTools.hidden=!l;const range=$("Move"),span=l&&["udl","linear"].includes(l.type)?l.end-l.start:0;range.max=Math.max(0,L-span)||0;range.disabled=!l||!Number.isFinite(L)||!result?.valid||Number(range.max)===0;range.step=Number(range.max)>0?Number(range.max)/1000:.001;range.value=l?.start||0;$("MoveLabel").textContent=l?`Move ${l.id} · start ${pos(l.start)} m`:"Move selected load";$("MoveHint").textContent=!result?.valid?'Complete the beam and load inputs to move this load.':Number(range.max)===0?'Full-span load · shorten its loaded interval to move it.':'Drag the action on the beam, or move it here.';}
  function side(){return x===0?"right":x===result?.input.length?"left":$("Side").value;}
  function read(){
    if(!result?.valid)return;
    const r=result.at(x,side()),minus=result.at(x,"left"),plus=result.at(x,"right"),jump=minus.V!==plus.V||minus.M!==plus.M;
    $("X").value=x;$("X").max=result.input.length;$("SectionRange").max=result.input.length;$("SectionRange").step=result.input.length/1000;$("SectionRange").value=x;
    $("Side").disabled=x===0||x===result.input.length;
    $("Readout").innerHTML=['V','M'].map(key=>`<span data-reading-value="${key}"><small><i>${key}</i> / ${key==='V'?'kN':'kN·m'}</small><b>${forceFmt(r[key],key)}</b></span>`).join('');
    $("Pin").disabled=false;$("Pin").setAttribute('aria-pressed',String(pinned));$("Pin").textContent=pinned?'Pinned':'Pin';$("Pin").title=pinned?'Click to follow the pointer':'Pin this section';
    $("Announce").textContent=pinned?`x = ${pos(x)} m (${side()==='left'?'left':'right'}) · `+$("Readout").innerText:'';
    $("Snap").value='';
    $("SideField").hidden=!(jump&&x>0&&x<result.input.length);
    $("QuickExtrema").querySelectorAll('[data-extreme]').forEach(b=>{const [at,s]=b.dataset.extreme.split('|');b.setAttribute('aria-pressed',String(coordinateValid&&pinned&&Math.abs(Number(at)-x)<1e-8&&s===side()));});
    $("Jump").textContent=jump&&x>0&&x<result.input.length?`V− / V+ = ${forceFmt(minus.V,'V')} / ${forceFmt(plus.V,'V')} kN; M− / M+ = ${forceFmt(minus.M,'M')} / ${forceFmt(plus.M,'M')} kN·m.`:"";
  }
  function snapOptions(){
    const options=[{x:0,side:"right",name:"Left end"},{x:result.input.length,side:"left",name:"Right end"},...result.reactions.map(r=>({x:r.x,side:r.x===result.input.length?"left":"right",name:`Support ${r.id}`})),...loads.flatMap(l=>[{x:l.start,side:l.start===result.input.length?"left":"right",name:`${l.id} ${["udl","linear"].includes(l.type)?"start":"position"}`},...(["udl","linear"].includes(l.type)?[{x:l.end,side:l.end===result.input.length?"left":"right",name:l.id+" end"}]:[])]),...result.zeroShear.map(v=>({x:v,side:"right",name:"V = 0"}))];
    $("Snap").innerHTML='<option value="">Select a section…</option>'+options.map(o=>`<option value="${o.x}|${o.side}">${esc(o.name)} · ${pos(o.x)} m</option>`).join("");
    $("Extrema").innerHTML=["M","V"].flatMap(key=>["max","min"].map(kind=>{const e=result.extrema[key][kind];return `<button type="button" data-extreme="${e.x}|${e.side}">${key}${kind} = ${forceFmt(e[key],key)} ${key==="M"?"kN·m":"kN"}<br>at x = ${pos(e.x)} m (${e.side==="left"?"−":"+"})</button>`;})).join("");
    const m=result.extrema.M,v=result.extrema.V,vPeak=Math.abs(v.max.V)>=Math.abs(v.min.V)?v.max:v.min,mNoise=Math.max(Math.abs(m.max.M),Math.abs(m.min.M))*1e-12;
    // Keep roundoff at an unloaded/free end from becoming a phantom signed peak.
    // The tolerance scales with this case, so small nonzero load cases still locate.
    const peaks=[{label:'M max +',name:'Maximum positive moment',e:m.max,key:'M',show:m.max.M>mNoise},{label:'M min −',name:'Minimum negative moment',e:m.min,key:'M',show:m.min.M<-mNoise},{label:'|V| max',name:'Maximum absolute shear',e:vPeak,key:'V',show:Math.abs(vPeak.V)>0}].filter(p=>p.show);
    $("QuickExtrema").innerHTML=peaks.map(p=>{const value=p.key==='V'?Math.abs(p.e.V):p.e.M,unit=p.key==='M'?'kN·m':'kN';return `<button type="button" data-extreme="${p.e.x}|${p.e.side}" aria-pressed="false" aria-label="${p.name}: ${forceFmt(value,p.key)} ${unit}${p.key==='V'?`, signed V = ${forceFmt(p.e.V,'V')} kN`:''}, x = ${pos(p.e.x)} m, ${p.e.side} side"><span>${p.label}</span><b>${forceFmt(value,p.key)} <small>${unit}</small></b></button>`;}).join('')||'<span class="bif-help">Zero-force case · no nonzero extrema</span>';
  }
  $("Calculation").classList.add('formula-list');
  let lastTrace=null;
  function trace(){
    const s=result?.valid?side():'right';if(lastTrace&&lastTrace.result===result&&lastTrace.x===x&&lastTrace.side===s&&lastTrace.valid===coordinateValid)return;
    lastTrace={result,x,side:s,valid:coordinateValid};
    $("Calculation").innerHTML=HandbookNumericalTraces.html(HandbookNumericalTraces.bif(result,x,s,coordinateValid,C),calculationTraceRow);
  }
  function recalculate(){
    updateLoadSummaries();
    result=C.calculate(input());$("Errors").hidden=result.valid;$("Valid").hidden=!result.valid;
    $("DetailResults").hidden=!result.valid;
    $("Warnings").hidden=true;$("Warnings").replaceChildren();
    panel.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));
    if(!result.valid){$("Errors").innerHTML='<b>Not evaluated</b><ul>'+result.errors.map(e=>`<li>${esc(e.message)}</li>`).join("")+'</ul>';for(const name of ["Structure","Shear","Moment","Reactions","Readout","Announce","Jump","Extrema","QuickExtrema","Calculation"])$(name).replaceChildren();revealFirstLoadError(result.errors);for(const e of result.errors){if(e.field==="length")$("Length").setAttribute("aria-invalid","true");if(e.field.startsWith("load:"))panel.querySelectorAll(`[data-id="${e.field.slice(5)}"]`).forEach(f=>f.setAttribute("aria-invalid","true"));}moveControl();window.BeamDeflectionUI.update(null,{x,coordinateValid:false,pinned});return;}
    coordinateValid=true;x=Math.max(0,Math.min(result.input.length,x));
    $("Reactions").innerHTML=result.reactions.map(r=>`<span class="${r.force<0?"bif-uplift":""}"><b>R${r.id} ${fmt(r.force)} kN</b> ${r.force<0?"↓ · uplift restraint required":"↑"}${r.fixed?` · C${r.id} ${fmt(r.couple)} kN·m`:""}</span>`).join("");
    const uplift=result.reactions.filter(r=>r.force<0);if(uplift.length){$("Warnings").hidden=false;$("Warnings").textContent=uplift.map(r=>`Support ${r.id}: ${fmt(r.force)} kN · uplift restraint required.`).join(' ');}
    const v=D.scale(result,"V"),m=D.scale(result,"M");$("VScale").textContent=`Range ${forceFmt(v.min,"V")} to ${forceFmt(v.max,"V")}`;$("MScale").textContent=`Range ${forceFmt(m.min,"M")} to ${forceFmt(m.max,"M")}`;
    moveControl();snapOptions();trace();read();draw();
  }
  function draw(){
    trace();
    if(!result?.valid||panel.hidden)return;
    const compact=window.matchMedia('(max-width:500px)').matches;
    for(const [name,key]of [["Structure",null],["Shear","V"],["Moment","M"]]){
      const host=$(name),box=host.getBoundingClientRect();if(box.width<90)continue;
      const options={width:box.width,height:box.height,compact,x,side:side(),selectedId:selected};host.innerHTML=key?D.renderChart(result,key,options)+D.renderChartLabels(result,key,options):D.renderStructure(result,options);
      if(key){const axis=D.chartAxes(result,key,options);$(key+'AxisMultiplier').textContent=axis?.exponent?'Axis ticks × 10'+String(axis.exponent).replace(/[-\d]/g,c=>({'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'}[c])):'';}
      if(!coordinateValid)host.querySelectorAll('[data-reading-guide],[data-reading-point]').forEach(e=>e.remove());
    }
    window.BeamDeflectionUI.update(result,{x,coordinateValid,pinned});
  }
  function coordinate(event,svg){return D.xFromSvg(svg,event.clientX,event.clientY,result.input.length,window.matchMedia('(max-width:500px)').matches);}
  function changeCoordinate(v,isPinned=true){if(!result?.valid||!Number.isFinite(v))return;coordinateValid=true;$("X").removeAttribute('aria-invalid');x=Math.max(0,Math.min(result.input.length,v));pinned=isPinned;read();draw();}
  function pick(value){if(!value)return;const [v,s]=value.split('|');$("Side").value=s;changeCoordinate(Number(v));}
  function translate(start){const l=loads.find(v=>v.id===selected);if(!l||!result?.valid||!Number.isFinite(start))return;const L=result.input.length,span=["udl","linear"].includes(l.type)?l.end-l.start:0,limit=L-span;l.start=Math.max(0,Math.min(limit,start));if(span)l.end=l.start===limit?L:l.start+span;const row=panel.querySelector(`[data-load-row="${l.id}"]`);for(const key of ['start','end']){const f=row?.querySelector(`[data-load-field="${key}"]`);if(f)f.value=l[key];}recalculate();}
  $("Loads").addEventListener('toggle',e=>{const row=e.target;if(!row.matches('[data-load-row]')||!row.open)return;selected=row.dataset.loadRow;syncLoadSelection(true);moveControl();draw();},true);
  $("Loads").addEventListener('input',e=>{const t=e.target;if(!t.dataset.loadField)return;const l=loads.find(l=>l.id===t.dataset.id);l[t.dataset.loadField]=number(t);if(l.type==='udl'&&t.dataset.loadField==='q0')l.q1=l.q0;selected=l.id;syncLoadSelection();recalculate();});
  $("Loads").addEventListener('click',e=>{const id=e.target.closest('[data-remove]')?.dataset.remove;if(!id)return;loads=loads.filter(l=>l.id!==id);if(selected===id)selected=loads[0]?.id||null;renderLoads();recalculate();(panel.querySelector(`[data-load-row="${selected}"]>summary`)||$("Add")).focus();});
  $("Add").addEventListener('click',()=>{if(loads.length>=24)return;const open=$("LoadPicker").hidden;$("LoadPicker").hidden=!open;$("Add").setAttribute('aria-expanded',String(open));$("TypeChooser").open=false;if(open)$("LoadOptions").querySelector('button').focus();});
  $("LoadOptions").addEventListener('click',e=>{const choice=e.target.closest('[data-add-type]')?.dataset.addType;if(!choice||loads.length>=24)return;const L=number($("Length")),length=Number.isFinite(L)&&L>=.1&&L<=100?L:6,type=['triangle','trapezoid'].includes(choice)?'linear':choice;const intensities={udl:[2,2],triangle:[0,4],trapezoid:[2,4],linear:[3,-3]};const l=['point','moment'].includes(type)?{id:'L'+nextId++,type,start:length/2,p:10}:{id:'L'+nextId++,type,profile:choice,start:0,end:length,q0:intensities[choice][0],q1:intensities[choice][1]};loads.push(l);selected=l.id;closeLoadPicker();renderLoads();recalculate();panel.querySelector(`[data-id="${l.id}"][data-load-field="start"]`).focus();});
  $("TypeOptions").addEventListener('click',e=>{const type=e.target.closest('[data-beam-type]')?.dataset.beamType;if(!type)return;$("Type").value=type;$("TypeChooser").open=false;arrangement(true);recalculate();$("TypeChooser").querySelector('summary').focus();});
  $("TypeChooser").addEventListener('toggle',()=>{if($("TypeChooser").open){closeLoadPicker();showReferenceLayouts(false);}});
  document.addEventListener('click',e=>{if(!e.target.closest('#bifTypeChooser'))$("TypeChooser").open=false;if(!e.target.closest('#bifLoadPicker,#bifAdd'))closeLoadPicker();});
  panel.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(!$("LoadPicker").hidden){closeLoadPicker(true);e.preventDefault();}if($("TypeChooser").open){$("TypeChooser").open=false;$("TypeChooser").querySelector('summary').focus();e.preventDefault();}});
  $("Type").addEventListener('change',()=>{arrangement(true);recalculate();});
  for(const id of ['Length','A','B'])$(id).addEventListener('input',()=>{arrangement();recalculate();});
  $("Move").addEventListener('input',()=>translate(Number($("Move").value)));
  function editCoordinate(){const v=number($("X"));if(!result?.valid)return;pinned=true;if(!Number.isFinite(v)||v<0||v>result.input.length){coordinateValid=false;$("X").setAttribute('aria-invalid','true');$("Readout").textContent=`Enter a section coordinate between 0 and ${fmt(result.input.length)} m.`;$("Jump").textContent='';$("Announce").textContent='';$("Snap").value='';$("SideField").hidden=true;$("Pin").disabled=true;$("QuickExtrema").querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));draw();}else{const old=$("X").value;changeCoordinate(v);$("X").value=old;}}
  $("X").addEventListener('input',editCoordinate);
  $("X").addEventListener('change',editCoordinate);
  $("SectionRange").addEventListener('input',()=>changeCoordinate(Number($("SectionRange").value)));
  $("Side").addEventListener('change',()=>{read();draw();});
  $("Pin").addEventListener('click',()=>{if(!result?.valid||!coordinateValid)return;pinned=!pinned;read();draw();});
  $("Snap").addEventListener('change',()=>pick($("Snap").value));
  $("Extrema").addEventListener('click',e=>pick(e.target.closest('[data-extreme]')?.dataset.extreme));
  $("QuickExtrema").addEventListener('click',e=>pick(e.target.closest('[data-extreme]')?.dataset.extreme));
  $("Reset").addEventListener('click',()=>{$("Type").value='simple';$("Length").value=6;arrangement(true);loads=C.defaults.loads.map(l=>({...l}));nextId=3;selected='L1';x=3;pinned=false;coordinateValid=true;$("Side").value='right';$("X").removeAttribute('aria-invalid');closeLoadPicker();$("TypeChooser").open=false;$("ReadingTools").open=false;$("ReactionDetails").open=false;loadTools.open=false;renderLoads();recalculate();});
  // Delegation survives re-rendering and keeps the input source of truth in loads[].
  for(const host of [$("Structure"),$("Shear"),$("Moment")]){
    host.addEventListener('pointermove',e=>{if(!result?.valid||drag||pinned||e.pointerType==='touch')return;const svg=e.target.closest('svg');if(svg)changeCoordinate(coordinate(e,svg),false);});
    host.addEventListener('pointerdown',e=>{if(!result?.valid)return;const svg=e.target.closest('svg');if(!svg)return;const hit=e.target.closest('[data-load-id]');if(hit){selected=hit.dataset.loadId;const l=loads.find(l=>l.id===selected);drag={host,offset:coordinate(e,svg)-l.start,pointerId:e.pointerId};host.setPointerCapture(e.pointerId);renderLoads();draw();e.preventDefault();}else changeCoordinate(coordinate(e,svg),coordinateValid?!pinned:true);});
    host.addEventListener('pointerup',()=>{drag=null;});host.addEventListener('pointercancel',()=>{drag=null;});
  }
  window.addEventListener('pointermove',e=>{if(!drag||!result?.valid)return;const svg=drag.host.querySelector('svg');if(svg)translate(coordinate(e,svg)-drag.offset);});
  window.addEventListener('pointerup',()=>{drag=null;});
  new ResizeObserver(()=>draw()).observe($("Structure"));
  new MutationObserver(()=>draw()).observe(panel,{attributes:true,attributeFilter:['hidden']});
  panel.addEventListener('beam-deflection-section',e=>changeCoordinate(e.detail.x,e.detail.pinned));
  panel.addEventListener('beam-deflection-redraw',draw);
  arrangement(true);renderLoads();recalculate();
})();
