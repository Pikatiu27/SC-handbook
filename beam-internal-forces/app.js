"use strict";
(() => {
  const C=BeamInternalForces,D=BeamForcesDrawing,panel=document.getElementById("beamforcesPanel");if(!panel)return;
  const $=id=>document.getElementById("bif"+id),esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let loads=C.defaults.loads.map(l=>({...l})),nextId=3,selected="L1",result=null,x=3,pinned=false,drag=null,coordinateValid=true;
  const fmt=D.formatResult,pos=v=>{if(!Number.isFinite(v))return "—";const rounded=Number(v.toFixed(2));if(v!==0&&rounded===0){const [coefficient,exponent]=v.toExponential(2).split('e');return Number(coefficient)+'e'+Number(exponent);}return String(rounded);},number=e=>e.value.trim()===""?NaN:Number(e.value);
  const coordinateText=pos;
  const forceFmt=(value,key)=>fmt(value,Math.max(Math.abs(result.extrema[key].min[key]),Math.abs(result.extrema[key].max[key])));
  const loadChoices={point:'Point force',moment:'Applied couple',udl:'Uniform load',triangle:'Triangular load',trapezoid:'Trapezoidal load',linear:'Linear distribution'};
  // General linear is an explicit editor choice and may include special shapes.
  // Named shape presets otherwise follow the actual editable end intensities.
  const loadKind=l=>l.type!=='linear'?l.type:l.profile==='linear'||![l.q0,l.q1].every(Number.isFinite)?'linear':l.q0===0&&l.q1===0&&['triangle','trapezoid'].includes(l.profile)?l.profile:l.q0!==l.q1&&(l.q0===0||l.q1===0)?'triangle':l.q0!==l.q1&&l.q0*l.q1>0?'trapezoid':'linear';
  const loadTitle=l=>loadChoices[loadKind(l)];
  function choiceButton(kind,name,attribute){
    const symbol=attribute==='data-beam-type'&&Object.hasOwn(BeamMoreLayouts.types,kind)?D.renderReferenceLayout(kind):D.renderChoice(kind,{id:attribute+'-'+kind});
    return `<button type="button" ${attribute}="${kind}" aria-label="${esc(name)}"${attribute==='data-beam-type'?` aria-pressed="${kind===$("Type").value}"`:''}><span class="engineering-figure bif-choice-symbol" aria-hidden="true"><span class="engineering-figure__plot bif-choice-plot">${symbol}</span></span><span>${esc(name)}</span></button>`;
  }
  $("Type").insertAdjacentHTML("beforeend",Object.entries(BeamMoreLayouts.types).map(([kind,name])=>`<option value="${kind}">${name}</option>`).join(""));
  $("TypeOptions").innerHTML=Object.entries(C.types).map(([kind,name])=>choiceButton(kind,name,'data-beam-type')).join('');
  $("LoadOptions").innerHTML=['point','moment','udl','triangle','trapezoid','linear'].map(kind=>choiceButton(kind,loadChoices[kind],'data-add-type')).join('');
  function closeLoadPicker(focus=false){$("LoadPicker").hidden=true;$("Add").setAttribute('aria-expanded','false');if(focus)$("Add").focus();}
  function updateTypeChoice(){const type=$("Type").value;$("TypeName").textContent=C.types[type];panel.querySelectorAll('[data-beam-type]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.beamType===type)));}
  function input(){return {type:$("Type").value,length:number($("Length")),a:number($("A")),b:number($("B")),c:number(document.getElementById("bmlC")),E:number(document.getElementById("bdE")),I:number(document.getElementById("bdI")),loads};}
  function field(load,key,label,unit,value){return `<label><span>${label}</span><span class="unit"><input type="number" step="any" data-load-field="${key}" data-id="${esc(load.id)}" data-model-value="${value}" value="${Number.isFinite(value)?(['start','end'].includes(key)?coordinateText(value):value):""}" aria-label="${esc(load.id+' '+label)}"><em>${unit}</em></span></label>`;}
  function loadSummary(l){
    const numbers=[l.start,...(['point','moment'].includes(l.type)?[l.p]:[l.end,l.q0,l.q1])];
    if(numbers.some(v=>!Number.isFinite(v)))return 'Input required';
    if(l.type==='point'||l.type==='moment')return `${fmt(l.p)} ${l.type==='point'?'kN':'kN·m'} · x = ${pos(l.start)} m`;
    return `${l.type==='udl'?fmt(l.q0):fmt(l.q0)+' → '+fmt(l.q1)} kN/m · ${pos(l.start)}–${pos(l.end)} m`;
  }
  function syncLoadSelection(closeOthers=false){
    panel.querySelectorAll('[data-load-row]').forEach(row=>{const active=row.dataset.loadRow===selected;row.setAttribute('aria-current',String(active));if(closeOthers&&!active)row.open=false;});
  }
  function updateLoadSummaries(){for(const l of loads){const summary=panel.querySelector(`[data-load-summary="${l.id}"]`),name=panel.querySelector(`[data-load-name="${l.id}"]`);if(summary)summary.textContent=loadSummary(l);if(name)name.textContent=l.id+' · '+loadTitle(l);panel.querySelectorAll(`[data-id="${l.id}"][data-load-field]`).forEach(f=>{const v=l[f.dataset.loadField];f.dataset.modelValue=String(v);if(['start','end'].includes(f.dataset.loadField)&&Number.isFinite(v))f.title=`Position x = ${v} m`;});}}
  function revealFirstLoadError(errors){const field=errors[0]?.field;if(!field?.startsWith('load:'))return;selected=field.slice(5);const row=panel.querySelector(`[data-load-row="${selected}"]`);if(row)row.open=true;syncLoadSelection(true);}
  function renderLoads(){
    $("Loads").innerHTML=loads.map(l=>{
      const point=['point','moment'].includes(l.type);
      const fields=field(l,'start',point?'Position, x':'Start, x₀','m',l.start)+(point?field(l,'p',l.type==='point'?'Force, P':'Couple, C',l.type==='point'?'kN':'kN·m',l.p):field(l,'end','End, x₁','m',l.end)+field(l,'q0',l.type==='udl'?'Intensity, q':'Start intensity, q₀','kN/m',l.q0)+(l.type==='linear'?field(l,'q1','End intensity, q₁','kN/m',l.q1):''));
      return `<details class="bif-load" data-load-row="${esc(l.id)}" aria-current="${l.id===selected}" ${l.id===selected?'open':''}><summary><span class="bif-load-copy"><span class="bif-load-name" data-load-name="${esc(l.id)}">${esc(l.id)} · ${esc(loadTitle(l))}</span><span class="bif-load-value" data-load-summary="${esc(l.id)}">${esc(loadSummary(l))}</span></span><i aria-hidden="true">+</i></summary><div class="bif-load-body"><div class="bif-fields input-group-fields">${fields}</div><div class="bif-load-actions"><button type="button" data-remove="${esc(l.id)}" aria-label="Remove ${esc(l.id)}">Remove load</button></div></div></details>`;
    }).join('');
    if(!loads.length)$("Loads").innerHTML='<p class="bif-help">No loads · zero-force case. Add a load to continue.</p>';
    $("Add").disabled=loads.length>=24;
  }
  function arrangement(resetSupports=false){
    const t=$("Type").value,L=number($("Length")),more=Object.hasOwn(BeamMoreLayouts.types,t),c=document.getElementById('bmlC');updateTypeChoice();
    const labels={'continuous-two':['Support B position'],'continuous-three':['Support B position','Support C position'],'continuous-overhang':['Support A position','Support B position','Support C position'],'continuous-fixed':['Support B position'],gerber:['Support B position','Internal hinge position']},names=labels[t]||[];
    $("AField").hidden=more?!names[0]:!['overhang-left','overhang-both'].includes(t);$("BField").hidden=more?!names[1]:!['overhang-right','overhang-both'].includes(t);document.getElementById('bmlCField').hidden=!names[2];
    $("AField").querySelector('span').textContent=names[0]||'Support A position';$("BField").querySelector('span').textContent=names[1]||'Support B position';
    if(resetSupports&&Number.isFinite(L)){const defaults=t==='continuous-three'?[L/3,2*L/3,.85*L]:t==='continuous-overhang'?[.15*L,.5*L,.85*L]:t==='gerber'?[.4*L,.6*L,.85*L]:more?[.5*L,.8*L,.85*L]:[.2*L,.8*L,.85*L];[$("A"),$("B"),c].forEach((e,i)=>e.value=String(Number(defaults[i].toPrecision(12))));}
    $("SupportSummary").textContent=Number.isFinite(L)?C.supports(input()).map(r=>r.id+' · '+(r.fixed?'Fixed':r.id==='A'?'Pin':'Roller')+' · '+pos(r.x)+' m').join(' / ')+(t==='gerber'?' / Hinge · '+pos(number($("B")))+' m · read θ− / θ+ separately':''):'Enter a beam length to locate supports.';
  }

  function side(){return x===0?"right":x===result?.input.length?"left":$("Side").value;}
  function read(){
    if(!result?.valid)return;
    const r=result.at(x,side()),minus=result.at(x,"left"),plus=result.at(x,"right"),jump=minus.V!==plus.V||minus.M!==plus.M||result.hinges?.includes(x);
    // Format the field without rounding the calculation coordinate. Merely
    // focusing/blurring this display must never move an exact event or peak.
    $("X").value=coordinateText(x);
    $("X").dataset.coordinate=String(x);$("X").title=`Section x = ${x} m`;$("X").max=result.input.length;
    $("Side").disabled=x===0||x===result.input.length;
    $("Readout").innerHTML=['V','M'].map(key=>`<span data-reading-value="${key}"><small><i>${key}</i> / ${key==='V'?'kN':'kN·m'}</small><b>${forceFmt(r[key],key)}</b></span>`).join('');
    $("Pin").disabled=false;$("Pin").setAttribute('aria-pressed',String(pinned));$("Pin").textContent=pinned?'Follow pointer':'Hold reading';$("Pin").title=pinned?'Resume reading as the pointer moves':'Hold the current reading';$("Mode").textContent=pinned?'Held':'Following pointer';
    $("Announce").textContent=pinned?`x = ${pos(x)} m (${side()==='left'?'left':'right'}) · `+$("Readout").innerText:'';
    $("Snap").value='';
    panel.classList.toggle("bml-hinge-cut",!!result.hinges?.includes(x));$("SideField").hidden=!(jump&&x>0&&x<result.input.length);
    $("QuickExtrema").querySelectorAll('[data-extreme]').forEach(b=>{const [at,s]=b.dataset.extreme.split('|');b.setAttribute('aria-pressed',String(coordinateValid&&pinned&&Math.abs(Number(at)-x)<1e-8&&s===side()));});
    $("Jump").textContent=jump&&x>0&&x<result.input.length?`V− / V+ = ${forceFmt(minus.V,'V')} / ${forceFmt(plus.V,'V')} kN; M− / M+ = ${forceFmt(minus.M,'M')} / ${forceFmt(plus.M,'M')} kN·m.`:"";
    trace();
  }
  function snapOptions(){
    const options=[{x:0,side:"right",name:"Left end"},{x:result.input.length,side:"left",name:"Right end"},...result.reactions.map(r=>({x:r.x,side:r.x===result.input.length?"left":"right",name:`Support ${r.id}`})),...loads.flatMap(l=>[{x:l.start,side:l.start===result.input.length?"left":"right",name:`${l.id} ${["udl","linear"].includes(l.type)?"start":"position"}`},...(["udl","linear"].includes(l.type)?[{x:l.end,side:l.end===result.input.length?"left":"right",name:l.id+" end"}]:[])]),...(result.hinges||[]).flatMap(x=>[{x,side:'left',name:'Internal hinge · left slope'},{x,side:'right',name:'Internal hinge · right slope'}]),...result.zeroShear.map(v=>({x:v,side:"right",name:"V = 0"}))];
    const sections=new Map();
    for(const o of options){const key=`${o.x}|${o.side}`;if(!sections.has(key))sections.set(key,o);}
    const extrema=["M","V"].flatMap(key=>["max","min"].map(kind=>{const e=result.extrema[key][kind];return `<option value="${e.x}|${e.side}|${key}${kind}">${key} ${kind} · ${pos(e.x)} m · ${e.side} side</option>`;})).join('');
    $("Snap").innerHTML='<option value="">Choose a key section…</option><optgroup label="Key sections">'+Array.from(sections.values()).sort((a,b)=>a.x-b.x).map(o=>`<option value="${o.x}|${o.side}">${esc(o.name)} · ${pos(o.x)} m</option>`).join("")+'</optgroup><optgroup label="Force extrema (M/V)">'+extrema+'</optgroup>';
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
    const presentation=typeof BeamForceTracePresentation==='undefined'?null:BeamForceTracePresentation;
    const options=presentation?{format:presentation.formatter(result,x)}:{};
    let rows=HandbookNumericalTraces.bif(result,x,s,coordinateValid,C,options);
    if(result?.moreLayouts){rows=rows.filter(r=>!['bif-reaction-a','bif-reaction-b','bif-fixed-force','bif-fixed-couple'].includes(r.id));rows.unshift(...BeamMoreLayoutTrace.rows(result,x,s,coordinateValid,fmt));}
    const note=presentation?'<p class="bif-help">Operands use 10 significant figures, with extra digits retained for close coordinates or cancellation. Calculations use unrounded inputs; diagram readouts are rounded. x⁻ / x⁺ denote the left / right limits at the exact cut stated below.</p>':'';
    $("Calculation").innerHTML=note+HandbookNumericalTraces.html(rows,r=>calculationTraceRow(presentation?r.id.startsWith('bml-')?r:presentation.present(r,{x,side:s}):r));
  }
  function reactionRow(r,symbol,value,unit){
    const moment=symbol==='C',direction=value===0?'Zero':moment?(value>0?'CCW':'CW'):(value>0?'Upward':'Downward');
    const arrow=value===0?'':moment?(value>0?'↺':'↻'):(value>0?'↑':'↓');
    const name=moment?'Support reaction couple':'Vertical support reaction',exact=`${symbol}_${r.id} = ${value} ${unit}`;
    return `<div class="bif-reaction-row" data-reaction-quantity="${symbol}" data-reaction-value="${value}"><span class="bif-reaction-symbol" title="${name} at support ${esc(r.id)}"><i>${symbol}</i><sub>${esc(r.id)}</sub></span><b class="bif-reaction-number" title="${esc(exact)}">${fmt(value)}</b><span class="bif-reaction-unit">${unit}</span><span class="bif-reaction-direction"><span aria-hidden="true">${arrow}</span>${direction}</span></div>`;
  }
  function renderReactions(){
    $("Reactions").setAttribute('role','list');
    $("Reactions").innerHTML=result.reactions.map(r=>`<div class="bif-reaction-support${r.force<0?' bif-uplift':''}" role="listitem" aria-label="Support ${esc(r.id)}">${reactionRow(r,'R',r.force,'kN')}${r.fixed?reactionRow(r,'C',r.couple,'kN·m'):''}${r.force<0?'<small class="bif-reaction-note">Uplift restraint required</small>':''}</div>`).join('');
  }
  function layoutErrorMessage(error){
    if($("Type").value!=='gerber'&&error.message.startsWith('Enter ordered supports;'))return 'Enter ordered supports and keep interior supports strictly inside the beam.';
    return error.message;
  }
  function recalculate(){
    updateLoadSummaries();
    result=C.calculate(input());$("Errors").hidden=result.valid;$("Valid").hidden=!result.valid;
    $("DetailResults").hidden=!result.valid;
    $("Warnings").hidden=true;$("Warnings").replaceChildren();
    panel.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));
    if(!result.valid){$("Errors").innerHTML='<b>Not evaluated</b><ul>'+result.errors.map(e=>`<li>${esc(layoutErrorMessage(e))}</li>`).join("")+'</ul>';for(const name of ["Structure","Shear","Moment","Reactions","Readout","Announce","Jump","QuickExtrema"])$(name).replaceChildren();delete $("X").dataset.coordinate;$("X").removeAttribute('title');trace();$("Mode").textContent="Not evaluated";$("Pin").disabled=true;revealFirstLoadError(result.errors);for(const e of result.errors){if(e.field==="supports")for(const id of ["A","B"])$(id).setAttribute("aria-invalid","true");if(e.field==="E"||e.field==="I")document.getElementById("bd"+e.field).setAttribute("aria-invalid","true");if(e.field==="length")$("Length").setAttribute("aria-invalid","true");if(e.field.startsWith("load:"))panel.querySelectorAll(`[data-id="${e.field.slice(5)}"]`).forEach(f=>f.setAttribute("aria-invalid","true"));}window.BeamDeflectionUI.update(result,{x,coordinateValid:false,pinned});for(const e of result.errors){if(e.field==="E"||e.field==="I")document.getElementById("bd"+e.field).setAttribute("aria-invalid","true");if(e.field==="supports")document.getElementById("bmlC").setAttribute("aria-invalid","true");}return;}
    const retryCoordinate=!coordinateValid;coordinateValid=true;x=Math.max(0,Math.min(result.input.length,x));$("X").max=result.input.length;
    renderReactions();
    const uplift=result.reactions.filter(r=>r.force<0);if(uplift.length){$("Warnings").hidden=false;$("Warnings").textContent=uplift.map(r=>`Support ${r.id}: ${fmt(r.force)} kN · uplift restraint required.`).join(' ');}
    snapOptions();if(retryCoordinate){editCoordinate();return;}read();draw();
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
    $("Structure").parentElement.querySelector('figcaption').textContent='x / m · entered positions; schematic symbols'+(result.hinges?.length?' · open circle: internal hinge':'');
    window.BeamDeflectionUI.update(result,{x,side:side(),coordinateValid,pinned});
  }
  function coordinate(event,svg){return D.xFromSvg(svg,event.clientX,event.clientY,result.input.length,window.matchMedia('(max-width:500px)').matches);}
  function changeCoordinate(v,isPinned=true){if(!result?.valid||!Number.isFinite(v))return;coordinateValid=true;$("X").removeAttribute('aria-invalid');x=Math.max(0,Math.min(result.input.length,v));pinned=isPinned;read();draw();}
  function pick(value){if(!value)return;const [v,s]=value.split('|');$("Side").value=s;changeCoordinate(Number(v));}
  function translate(start){const l=loads.find(v=>v.id===selected);if(!l||!result?.valid||!Number.isFinite(start))return;const L=result.input.length,span=["udl","linear"].includes(l.type)?l.end-l.start:0,limit=L-span;l.start=Math.max(0,Math.min(limit,start));if(span)l.end=l.start===limit?L:l.start+span;const row=panel.querySelector(`[data-load-row="${l.id}"]`);for(const key of ['start','end']){const f=row?.querySelector(`[data-load-field="${key}"]`);if(f)f.value=coordinateText(l[key]);}recalculate();}
  $("Loads").addEventListener('toggle',e=>{const row=e.target;if(!row.matches('[data-load-row]')||!row.open)return;selected=row.dataset.loadRow;syncLoadSelection(true);draw();},true);
  $("Loads").addEventListener('input',e=>{const t=e.target;if(!t.dataset.loadField)return;const l=loads.find(l=>l.id===t.dataset.id);l[t.dataset.loadField]=number(t);if(l.type==='udl'&&t.dataset.loadField==='q0')l.q1=l.q0;selected=l.id;syncLoadSelection();recalculate();});
  $("Loads").addEventListener('focusout',e=>{const t=e.target;if(!['start','end'].includes(t.dataset.loadField))return;const l=loads.find(l=>l.id===t.dataset.id),v=l?.[t.dataset.loadField];if(Number.isFinite(v))t.value=coordinateText(v);});
  $("Loads").addEventListener('click',e=>{const id=e.target.closest('[data-remove]')?.dataset.remove;if(!id)return;loads=loads.filter(l=>l.id!==id);if(selected===id)selected=loads[0]?.id||null;renderLoads();recalculate();(panel.querySelector(`[data-load-row="${selected}"]>summary`)||$("Add")).focus();});
  $("Add").addEventListener('click',()=>{if(loads.length>=24)return;const open=$("LoadPicker").hidden;$("LoadPicker").hidden=!open;$("Add").setAttribute('aria-expanded',String(open));$("TypeChooser").open=false;if(open)$("LoadOptions").querySelector('button').focus();});
  $("LoadOptions").addEventListener('click',e=>{const choice=e.target.closest('[data-add-type]')?.dataset.addType;if(!choice||loads.length>=24)return;const L=number($("Length")),length=Number.isFinite(L)&&L>=.1&&L<=100?L:6,type=['triangle','trapezoid'].includes(choice)?'linear':choice;const intensities={udl:[2,2],triangle:[0,4],trapezoid:[2,4],linear:[3,-3]};const l=['point','moment'].includes(type)?{id:'L'+nextId++,type,start:length/2,p:10}:{id:'L'+nextId++,type,profile:choice,start:0,end:length,q0:intensities[choice][0],q1:intensities[choice][1]};loads.push(l);selected=l.id;closeLoadPicker();renderLoads();recalculate();panel.querySelector(`[data-id="${l.id}"][data-load-field="start"]`).focus();});
  $("TypeChooser").addEventListener('click',e=>{const type=e.target.closest('[data-beam-type]')?.dataset.beamType;if(!type)return;$("Type").value=type;$("TypeChooser").open=false;arrangement(true);recalculate();$("TypeChooser").querySelector('summary').focus();});
  $("TypeChooser").addEventListener('toggle',()=>{if($("TypeChooser").open){closeLoadPicker();}});
  document.addEventListener('click',e=>{if(!e.target.closest('#bifTypeChooser'))$("TypeChooser").open=false;if(!e.target.closest('#bifLoadPicker,#bifAdd'))closeLoadPicker();});
  panel.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(!$("LoadPicker").hidden){closeLoadPicker(true);e.preventDefault();}if($("TypeChooser").open){$("TypeChooser").open=false;$("TypeChooser").querySelector('summary').focus();e.preventDefault();}});
  $("Type").addEventListener('change',()=>{arrangement(true);recalculate();});
  for(const id of ['Length','A','B'])$(id).addEventListener('input',()=>{arrangement();recalculate();});
  document.getElementById('bmlC').addEventListener('input',()=>{arrangement();recalculate();});
  for(const id of ['bdE','bdI'])document.getElementById(id).addEventListener('input',()=>{if(Object.hasOwn(BeamMoreLayouts.types,$("Type").value))recalculate();});
  function editCoordinate(){const v=number($("X"));if(!result?.valid)return;pinned=true;if(!Number.isFinite(v)||v<0||v>result.input.length){coordinateValid=false;$("Mode").textContent="Enter a valid x";$("X").setAttribute('aria-invalid','true');delete $("X").dataset.coordinate;$("X").removeAttribute('title');$("Readout").textContent=`Enter a section coordinate between 0 and ${fmt(result.input.length)} m.`;$("Jump").textContent='';$("Announce").textContent='';$("Snap").value='';$("SideField").hidden=true;$("Pin").disabled=true;$("QuickExtrema").querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));trace();draw();}else{const old=$("X").value;changeCoordinate(v);$("X").value=old;}}
  $("X").addEventListener('input',editCoordinate);
  $("X").addEventListener('blur',()=>{if(coordinateValid)$("X").value=coordinateText(x);});
  $("X").addEventListener('keydown',e=>{if(e.key==='Enter')$("X").blur();});
  $("Side").addEventListener('change',()=>{pinned=true;read();draw();});
  $("Pin").addEventListener('click',()=>{if(!result?.valid||!coordinateValid)return;pinned=!pinned;read();draw();});
  $("Snap").addEventListener('change',()=>pick($("Snap").value));
  $("QuickExtrema").addEventListener('click',e=>pick(e.target.closest('[data-extreme]')?.dataset.extreme));
  function orderCalculationActions(){
    const parent=$("Readout").parentElement;
    const actions=Array.from(parent.querySelectorAll(':scope>.wf-result-actions'));
    actions.sort((a,b)=>Number(!a.querySelector('[data-wf-result="bif-forces"]'))-Number(!b.querySelector('[data-wf-result="bif-forces"]')));
    let previous=$("DetailResults");
    for(const action of actions){if(action.previousElementSibling!==previous)previous.after(action);previous=action;}
  }
  new MutationObserver(orderCalculationActions).observe($("Readout").parentElement,{childList:true});
  $("Reset").addEventListener('click',()=>{$("Type").value='simple';$("Length").value=6;arrangement(true);loads=C.defaults.loads.map(l=>({...l}));nextId=3;selected='L1';x=3;pinned=false;coordinateValid=true;$("Side").value='right';$("X").removeAttribute('aria-invalid');closeLoadPicker();$("TypeChooser").open=false;renderLoads();recalculate();});
  // Delegation survives re-rendering and keeps the input source of truth in loads[].
  for(const host of [$("Structure"),$("Shear"),$("Moment")]){
    host.addEventListener('pointermove',e=>{if(!result?.valid||drag||pinned||document.activeElement===$("X")||e.pointerType==='touch')return;const svg=e.target.closest('svg');if(svg)changeCoordinate(coordinate(e,svg),false);});
    host.addEventListener('pointerdown',e=>{if(!result?.valid)return;const svg=e.target.closest('svg');if(!svg)return;const hit=e.target.closest('[data-load-id]');if(hit){selected=hit.dataset.loadId;const l=loads.find(l=>l.id===selected);drag={host,offset:coordinate(e,svg)-l.start,pointerId:e.pointerId};host.setPointerCapture(e.pointerId);renderLoads();draw();e.preventDefault();}else changeCoordinate(coordinate(e,svg),true);});
    host.addEventListener('pointerup',()=>{drag=null;});host.addEventListener('pointercancel',()=>{drag=null;});
  }
  window.addEventListener('pointermove',e=>{if(!drag||!result?.valid)return;const svg=drag.host.querySelector('svg');if(svg)translate(coordinate(e,svg)-drag.offset);});
  window.addEventListener('pointerup',()=>{drag=null;});
  new ResizeObserver(()=>draw()).observe($("Structure"));
  new MutationObserver(()=>draw()).observe(panel,{attributes:true,attributeFilter:['hidden']});
  panel.addEventListener('beam-deflection-section',e=>{if(e.detail.side)$("Side").value=e.detail.side;changeCoordinate(e.detail.x,e.detail.pinned);});
  panel.addEventListener('beam-deflection-redraw',draw);
  arrangement(true);renderLoads();recalculate();
})();
