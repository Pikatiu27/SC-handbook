"use strict";
(() => {
  const C=BeamInternalForces,D=BeamForcesDrawing,panel=document.getElementById("beamforcesPanel");if(!panel)return;
  const $=id=>document.getElementById("bif"+id),esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let loads=C.defaults.loads.map(l=>({...l})),nextId=3,selected="L1",result=null,x=3,pinned=false,drag=null,coordinateValid=true;
  const fmt=D.format,pos=v=>Number.isFinite(v)?Number(v.toFixed(6)).toString():"—",number=e=>e.value.trim()===""?NaN:Number(e.value);
  const typeNames={point:"Point force",moment:"Applied couple",udl:"Uniform load",linear:"Linear · triangle / trapezoid"};
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
  function updateLoadSummaries(){for(const l of loads){const summary=panel.querySelector(`[data-load-summary="${l.id}"]`);if(summary)summary.textContent=loadSummary(l);}}
  function revealFirstLoadError(errors){const field=errors[0]?.field;if(!field?.startsWith('load:'))return;selected=field.slice(5);const row=panel.querySelector(`[data-load-row="${selected}"]`);if(row)row.open=true;syncLoadSelection(true);}
  function renderLoads(){
    $("Loads").innerHTML=loads.map(l=>`<details class="bif-load" data-load-row="${esc(l.id)}" aria-current="${l.id===selected}" ${l.id===selected?'open':''}><summary><span class="bif-load-copy"><span class="bif-load-name">${esc(l.id)} · ${esc(typeNames[l.type])}</span><span class="bif-load-value" data-load-summary="${esc(l.id)}">${esc(loadSummary(l))}</span></span><i aria-hidden="true">+</i></summary><div class="bif-load-body"><div class="bif-fields input-group-fields"><label class="bif-full"><span>Load type</span><select data-load-type="${esc(l.id)}" aria-label="${esc(l.id)} load type">${Object.entries(typeNames).map(([k,t])=>`<option value="${k}" ${l.type===k?"selected":""}>${t}</option>`).join("")}</select></label>${field(l,"start",["point","moment"].includes(l.type)?"Position, x":"Start, x₀","m",l.start)}${["point","moment"].includes(l.type)?field(l,"p",l.type==="point"?"Force, P":"Couple, C",l.type==="point"?"kN":"kN·m",l.p):field(l,"end","End, x₁","m",l.end)+field(l,"q0",l.type==="udl"?"Intensity, q":"Start intensity, q₀","kN/m",l.q0)+(l.type==="linear"?field(l,"q1","End intensity, q₁","kN/m",l.q1):"")}</div><button type="button" data-remove="${esc(l.id)}" aria-label="Remove ${esc(l.id)}">Remove load</button></div></details>`).join("");
    if(!loads.length)$("Loads").innerHTML='<p class="bif-help">No loads · zero-force case. Add a load to continue.</p>';
    $("Add").disabled=loads.length>=24;moveControl();
  }
  function arrangement(resetSupports=false){const t=$("Type").value,L=number($("Length"));$("AField").hidden=!['overhang-left','overhang-both'].includes(t);$("BField").hidden=!['overhang-right','overhang-both'].includes(t);if(resetSupports&&Number.isFinite(L)){$("A").value=Number((.2*L).toFixed(6));$("B").value=Number((.8*L).toFixed(6));}}
  function moveControl(){const l=loads.find(l=>l.id===selected),L=number($("Length")),range=$("Move");range.disabled=!l||!Number.isFinite(L)||!result?.valid;const span=l&&["udl","linear"].includes(l.type)?l.end-l.start:0;range.max=Math.max(0,L-span)||0;range.step=Number.isFinite(L)?L/1000:.001;range.value=l?.start||0;$("MoveLabel").textContent=l?`Move ${l.id} · start ${pos(l.start)} m`:"Move selected load";}
  function side(){return x===0?"right":x===result?.input.length?"left":$("Side").value;}
  function read(){
    if(!result?.valid)return;
    const r=result.at(x,side()),minus=result.at(x,"left"),plus=result.at(x,"right"),jump=Math.abs(minus.V-plus.V)>1e-8||Math.abs(minus.M-plus.M)>1e-8;
    $("X").value=Number(x.toFixed(6));$("X").max=result.input.length;$("SectionRange").max=result.input.length;$("SectionRange").step=result.input.length/1000;$("SectionRange").value=x;
    $("Side").disabled=x===0||x===result.input.length;
    $("Readout").textContent=`x = ${pos(x)} m${jump&&x>0&&x<result.input.length?` (${side()==='left'?'left −':'right +'})`:''} · V = ${fmt(r.V)} kN · M = ${fmt(r.M)} kN·m${pinned?" · Pinned":""}`;
    if(pinned)$("Announce").textContent=$("Readout").textContent;
    $("SideField").hidden=!(jump&&x>0&&x<result.input.length);
    $("Jump").textContent=jump&&x>0&&x<result.input.length?`V− / V+ = ${fmt(minus.V)} / ${fmt(plus.V)} kN; M− / M+ = ${fmt(minus.M)} / ${fmt(plus.M)} kN·m.`:"";
  }
  function snapOptions(){
    const options=[{x:0,side:"right",name:"Left end"},{x:result.input.length,side:"left",name:"Right end"},...result.reactions.map(r=>({x:r.x,side:r.x===result.input.length?"left":"right",name:`Support ${r.id}`})),...loads.flatMap(l=>[{x:l.start,side:l.start===result.input.length?"left":"right",name:`${l.id} ${["udl","linear"].includes(l.type)?"start":"position"}`},...(["udl","linear"].includes(l.type)?[{x:l.end,side:l.end===result.input.length?"left":"right",name:l.id+" end"}]:[])]),...result.zeroShear.map(v=>({x:v,side:"right",name:"V = 0"}))];
    $("Snap").innerHTML='<option value="">Select a section…</option>'+options.map(o=>`<option value="${o.x}|${o.side}">${esc(o.name)} · ${pos(o.x)} m</option>`).join("");
    $("Extrema").innerHTML=["M","V"].flatMap(key=>["max","min"].map(kind=>{const e=result.extrema[key][kind];return `<button type="button" data-extreme="${e.x}|${e.side}">${key}${kind} = ${fmt(e[key])} ${key==="M"?"kN·m":"kN"}<br>at x = ${pos(e.x)} m (${e.side==="left"?"−":"+"})</button>`;})).join("");
  }
  function trace(){
    const t=result.totals,r=result.reactions,L=result.input.length;
    $("Calculation").innerHTML=`<p>ΣFᵧ = 0: ΣR = W = ${fmt(t.force)} kN. ΣM₀ = 0: Σ(Rx) + ΣCᵣ − J + ΣC = 0; J = ${fmt(t.firstMoment)} kN·m; ΣC = ${fmt(t.couple)} kN·m.</p><p>${r.length===2?`Rᵦ = (J − ΣC − W xₐ)/(xᵦ − xₐ) = ${fmt(r[1].force)} kN; Rₐ = W − Rᵦ = ${fmt(r[0].force)} kN.`:`Rₐ = W = ${fmt(r[0].force)} kN; Cₐ = J − ΣC − W xₐ = ${fmt(r[0].couple)} kN·m (counterclockwise positive).`}</p><p>For q(t) = q₀ + k(t − x₀), u = clamp(x − x₀, 0, x₁ − x₀): W(x) = q₀u + ku²/2; J(x) = x₀W(x) + q₀u²/2 + ku³/3. Each load contributes −W(x) to V and −[xW(x) − J(x)] to M. A positive applied couple contributes a −C jump to M. Point forces and reactions use their actual lever arms.</p><table class="bif-trace-table"><thead><tr><th>Load</th><th>W / kN</th><th>J / kN·m</th><th>C / kN·m</th></tr></thead><tbody>${loads.map(l=>{const v=C.resultant(l);return `<tr><td>${esc(l.id)}</td><td>${fmt(v.force)}</td><td>${fmt(v.firstMoment)}</td><td>${fmt(v.couple)}</td></tr>`;}).join("")}</tbody></table><p>Force residual ${result.checks.forceResidual.toExponential(2)} kN; moment residual ${result.checks.momentResidual.toExponential(2)} kN·m. Equilibrium checks do not establish member design acceptance.</p><p>Reference BIF-STATICS-01; exact segment evaluation and extrema BIF-SECTION-01. L = ${fmt(L)} m; no stiffness inputs or prescribed load factors.</p>`;
  }
  function recalculate(){
    updateLoadSummaries();
    result=C.calculate(input());$("Errors").hidden=result.valid;$("Valid").hidden=!result.valid;
    $("DetailResults").hidden=!result.valid;
    $("Warnings").hidden=true;$("Warnings").replaceChildren();
    panel.querySelectorAll('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));
    if(!result.valid){$("Errors").innerHTML='<b>Not evaluated</b><ul>'+result.errors.map(e=>`<li>${esc(e.message)}</li>`).join("")+'</ul>';for(const name of ["Structure","Shear","Moment","Reactions","Readout","Announce","Jump","Extrema","Calculation"])$(name).replaceChildren();revealFirstLoadError(result.errors);for(const e of result.errors){if(e.field==="length")$("Length").setAttribute("aria-invalid","true");if(e.field.startsWith("load:"))panel.querySelectorAll(`[data-id="${e.field.slice(5)}"]`).forEach(f=>f.setAttribute("aria-invalid","true"));}moveControl();return;}
    coordinateValid=true;x=Math.max(0,Math.min(result.input.length,x));
    $("Reactions").innerHTML=result.reactions.map(r=>`<span class="${r.force<0?"bif-uplift":""}"><b>R${r.id} ${fmt(r.force)} kN</b> ${r.force<0?"↓ · uplift restraint required":"↑"}${r.fixed?` · C${r.id} ${fmt(r.couple)} kN·m`:""}</span>`).join("");
    const uplift=result.reactions.filter(r=>r.force<0);if(uplift.length){$("Warnings").hidden=false;$("Warnings").textContent=uplift.map(r=>`Support ${r.id}: ${fmt(r.force)} kN · uplift restraint required.`).join(' ');}
    const v=D.scale(result,"V"),m=D.scale(result,"M");$("VScale").textContent=`Range ${fmt(v.min)} to ${fmt(v.max)}`;$("MScale").textContent=`Range ${fmt(m.min)} to ${fmt(m.max)}`;
    moveControl();snapOptions();trace();read();draw();
  }
  function draw(){
    if(!result?.valid||panel.hidden)return;
    const compact=window.matchMedia('(max-width:500px)').matches;
    for(const [name,key]of [["Structure",null],["Shear","V"],["Moment","M"]]){
      const host=$(name),box=host.getBoundingClientRect();if(box.width<90)continue;
      const options={width:box.width,height:box.height,compact,x,side:side(),selectedId:selected};host.innerHTML=key?D.renderChart(result,key,options):D.renderStructure(result,options);
      if(!coordinateValid)host.querySelectorAll('[data-reading-guide],[data-reading-point]').forEach(e=>e.remove());
    }
  }
  function coordinate(event,svg){return D.xFromSvg(svg,event.clientX,event.clientY,result.input.length,window.matchMedia('(max-width:500px)').matches);}
  function changeCoordinate(v,isPinned=true){if(!result?.valid||!Number.isFinite(v))return;coordinateValid=true;$("X").removeAttribute('aria-invalid');x=Math.max(0,Math.min(result.input.length,v));pinned=isPinned;read();draw();}
  function pick(value){if(!value)return;const [v,s]=value.split('|');$("Side").value=s;changeCoordinate(Number(v));}
  function translate(start){const l=loads.find(v=>v.id===selected);if(!l||!result?.valid)return;const span=["udl","linear"].includes(l.type)?l.end-l.start:0;l.start=Number(Math.max(0,Math.min(result.input.length-span,start)).toFixed(6));if(span)l.end=Number((l.start+span).toFixed(6));const row=panel.querySelector(`[data-load-row="${l.id}"]`);for(const key of ['start','end']){const f=row?.querySelector(`[data-load-field="${key}"]`);if(f)f.value=l[key];}recalculate();}
  $("Loads").addEventListener('change',e=>{
    const t=e.target;
    if(t.dataset.loadType){const l=loads.find(l=>l.id===t.dataset.loadType),start=l.start,L=number($("Length"));Object.assign(l,{type:t.value,p:10,end:Math.max(start+.1,Math.min(L,start+L/3)),q0:t.value==='linear'?0:2,q1:t.value==='linear'?4:2});selected=l.id;renderLoads();recalculate();}
  });
  $("Loads").addEventListener('toggle',e=>{const row=e.target;if(!row.matches('[data-load-row]')||!row.open)return;selected=row.dataset.loadRow;syncLoadSelection(true);moveControl();draw();},true);
  $("Loads").addEventListener('input',e=>{const t=e.target;if(!t.dataset.loadField)return;const l=loads.find(l=>l.id===t.dataset.id);l[t.dataset.loadField]=number(t);if(l.type==='udl'&&t.dataset.loadField==='q0')l.q1=l.q0;selected=l.id;syncLoadSelection();recalculate();});
  $("Loads").addEventListener('click',e=>{const id=e.target.closest('[data-remove]')?.dataset.remove;if(!id)return;loads=loads.filter(l=>l.id!==id);if(selected===id)selected=loads[0]?.id||null;renderLoads();recalculate();});
  $("Add").addEventListener('click',()=>{if(loads.length>=24)return;const L=number($("Length"));const l={id:'L'+nextId++,type:'point',start:Number.isFinite(L)?L/2:0,p:10};loads.push(l);selected=l.id;renderLoads();recalculate();panel.querySelector(`[data-load-type="${l.id}"]`).focus();});
  $("Type").addEventListener('change',()=>{arrangement(true);recalculate();});
  for(const id of ['Length','A','B'])$(id).addEventListener('input',()=>{arrangement();recalculate();});
  $("Move").addEventListener('input',()=>translate(Number($("Move").value)));
  function editCoordinate(){const v=number($("X"));if(!result?.valid)return;if(!Number.isFinite(v)||v<0||v>result.input.length){coordinateValid=false;$("X").setAttribute('aria-invalid','true');$("Readout").textContent=`Enter a section coordinate between 0 and ${fmt(result.input.length)} m.`;$("Jump").textContent='';draw();}else{const old=$("X").value;changeCoordinate(v);$("X").value=old;}}
  $("X").addEventListener('input',editCoordinate);
  $("X").addEventListener('change',editCoordinate);
  $("SectionRange").addEventListener('input',()=>changeCoordinate(Number($("SectionRange").value)));
  $("Side").addEventListener('change',()=>{read();draw();});
  $("Snap").addEventListener('change',()=>pick($("Snap").value));
  $("Extrema").addEventListener('click',e=>pick(e.target.closest('[data-extreme]')?.dataset.extreme));
  $("Reset").addEventListener('click',()=>{$("Type").value='simple';$("Length").value=6;arrangement(true);loads=C.defaults.loads.map(l=>({...l}));nextId=3;selected='L1';x=3;pinned=false;coordinateValid=true;$("Side").value='right';$("X").removeAttribute('aria-invalid');renderLoads();recalculate();});
  // Delegation survives re-rendering and keeps the input source of truth in loads[].
  for(const host of [$("Structure"),$("Shear"),$("Moment")]){
    host.addEventListener('pointermove',e=>{if(!result?.valid||drag||pinned||e.pointerType==='touch')return;const svg=e.target.closest('svg');if(svg)changeCoordinate(coordinate(e,svg),false);});
    host.addEventListener('pointerdown',e=>{if(!result?.valid)return;const svg=e.target.closest('svg');if(!svg)return;const hit=e.target.closest('[data-load-id]');if(hit){selected=hit.dataset.loadId;const l=loads.find(l=>l.id===selected);drag={host,offset:coordinate(e,svg)-l.start,pointerId:e.pointerId};host.setPointerCapture(e.pointerId);renderLoads();draw();e.preventDefault();}else{const v=coordinate(e,svg);pinned=!pinned;x=v;read();draw();}});
    host.addEventListener('pointerup',()=>{drag=null;});host.addEventListener('pointercancel',()=>{drag=null;});
  }
  window.addEventListener('pointermove',e=>{if(!drag||!result?.valid)return;const svg=drag.host.querySelector('svg');if(svg)translate(coordinate(e,svg)-drag.offset);});
  window.addEventListener('pointerup',()=>{drag=null;});
  new ResizeObserver(()=>draw()).observe($("Structure"));
  new MutationObserver(()=>draw()).observe(panel,{attributes:true,attributeFilter:['hidden']});
  arrangement(true);renderLoads();recalculate();
})();
