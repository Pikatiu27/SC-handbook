"use strict";
(()=>{
  const B=BeamDeflection,D=BeamDeflectionDrawing,F=BeamForcesDrawing,panel=document.getElementById('beamforcesPanel');
  const $=id=>document.getElementById('bd'+id),fmt=F.formatResult;
  const position=x=>Number.isFinite(x)?(x!==0&&Number(x.toFixed(2))===0?x.toExponential(2).split('e').map(Number).join('e'):Number(x.toFixed(2)).toString()):'—';
  const exactPosition=x=>String(x);
  const number=e=>e.value.trim()===''?NaN:Number(e.value),superscript=n=>String(n).replace(/[-\d]/g,c=>({'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'}[c]));
  let forces=null,result=null,peakOwner=null,state={x:3,coordinateValid:true,pinned:false},signature='';
  function jump(x,pinned=true,side){panel.dispatchEvent(new CustomEvent('beam-deflection-section',{detail:{x,pinned,side}}));}
  $('Calculation').classList.add('formula-list');
  function trace(){
    $('Calculation').innerHTML=BeamMoreLayoutTrace.deformation(forces,result,state);
  }
  function render(){
    const valid=!!result?.valid;$('Errors').hidden=valid;$('Valid').hidden=!valid;$('Warning').hidden=!valid||!result.warnings.length;
    const stiffnessErrors=(result?.errors||[]).filter(e=>['E','I','stiffness'].includes(e.field));
    $('InputErrors').hidden=!stiffnessErrors.length;$('InputErrors').textContent=stiffnessErrors.length?'Deformation not evaluated · '+stiffnessErrors.map(e=>e.message).join(' '):'';
    for(const key of ['E','I'])$(key).setAttribute('aria-invalid',String(!valid&&!!result?.errors?.some(e=>e.field===key)));
    if(!valid){$('Errors').textContent='Not evaluated · '+(result?.errors?.map(e=>e.message).join(' ')||'Complete the beam and load inputs first.');for(const name of ['Delta','Theta','DeltaMultiplier','ThetaMultiplier','Peaks','Readout'])$(name).replaceChildren();if(panel.classList.contains('bd-deformation'))document.getElementById('bifAnnounce').textContent='';trace();peakOwner=null;return;}
    $('Warning').textContent=result.warnings.join(' ');
    const p=state.coordinateValid?result.at(state.x,state.side):null;
    $('Readout').innerHTML=p?['delta','theta'].map((key,i)=>`<span data-reading-value="${key}"><small><i>${i?'θ':'δ'}</i> / ${i?'mrad':'mm'}</small><b>${fmt(p[key]*1000,Math.abs(result.extrema[key].absolute[key])*1000)}</b></span>`).join(''):'Enter a valid section coordinate to read deformation.';
    if(peakOwner!==result){$('Peaks').innerHTML=['delta','theta'].map((key,i)=>{const e=result.extrema[key].absolute,unit=i?'mrad':'mm',symbol=i?'θ':'δ',value=fmt(Math.abs(e[key])*1000);return `<button type="button" data-bd-peak="${e.x}" data-bd-side="${e.side||'right'}" title="Exact x = ${exactPosition(e.x)} m" aria-pressed="false" aria-label="Locate maximum absolute ${i?'rotation':'deflection'}: ${value} ${unit}, x = ${position(e.x)} m"><span>|${symbol}| max · x = ${position(e.x)} m${forces.hinges?.includes(e.x)?' · '+e.side:''}</span><b>${value} <small>${unit}</small></b></button>`;}).join('');peakOwner=result;}
    $('Peaks').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(state.coordinateValid&&state.pinned&&Math.abs(Number(b.dataset.bdPeak)-state.x)<result.length*1e-10&&(!forces.hinges?.includes(state.x)||b.dataset.bdSide===state.side))));
    for(const [name,key]of [['Delta','delta'],['Theta','theta']]){
      const host=$(name),box=host.getBoundingClientRect();if(box.width<90)continue;
      const options={width:box.width,height:box.height,compact:innerWidth<=500,x:state.x,coordinateValid:state.coordinateValid,side:state.side},a=D.axes(result,key,options);
      host.innerHTML=D.render(result,key,options)+D.labels(result,key,options);$(name+'Multiplier').textContent=a.exponent?'Axis ticks × 10'+superscript(a.exponent):'';
    }
    trace();
    if(panel.classList.contains('bd-deformation')){
      const announce=document.getElementById('bifAnnounce');announce.textContent=state.pinned&&p?`x = ${position(state.x)} m · `+$('Readout').innerText:'';
    }
  }
  function update(next,stateValue){
    const E=number($('E')),I=number($('I')),nextSignature=String(E)+'|'+String(I);
    if(next!==forces||signature!==nextSignature){forces=next;signature=nextSignature;result=B.calculate(forces,{E,I});if(!forces?.valid&&forces?.errors)result={...result,errors:[...forces.errors,...(result.errors||[])]};}
    state={...state,...stateValue};render();
  }
  window.BeamDeflectionUI=Object.freeze({update});
  for(const id of ['E','I'])$(id).addEventListener('input',()=>update(forces,state));
  $('Peaks').addEventListener('click',e=>{const v=e.target.closest('[data-bd-peak]')?.dataset.bdPeak;if(v!==undefined)jump(Number(v),true,e.target.closest('[data-bd-peak]').dataset.bdSide);});
  function view(deformation){panel.classList.toggle('bd-deformation',deformation);$('ForcesView').setAttribute('aria-pressed',String(!deformation));$('DeformationView').setAttribute('aria-pressed',String(deformation));document.getElementById('bdResultHeading').textContent=deformation?'Deflection & rotation':'Internal forces';render();panel.dispatchEvent(new Event('beam-deflection-redraw'));}
  $('ForcesView').addEventListener('click',()=>view(false));$('DeformationView').addEventListener('click',()=>view(true));
  document.getElementById('bifReset').addEventListener('click',()=>{$('E').value=B.defaults.E;$('I').value=B.defaults.I;signature='';});
  for(const id of ['Delta','Theta']){
    const host=$(id),coordinate=e=>{const svg=e.target.closest('svg');return svg&&forces?.valid&&result?.valid?F.xFromSvg(svg,e.clientX,e.clientY,forces.input.length,innerWidth<=500):null;};
    host.addEventListener('pointermove',e=>{if(state.pinned||document.activeElement===document.getElementById('bifX')||e.pointerType==='touch')return;const x=coordinate(e);if(x!==null)jump(x,false);});
    host.addEventListener('pointerdown',e=>{const x=coordinate(e);if(x!==null)jump(x,true);});
  }
  new ResizeObserver(()=>render()).observe($('Delta'));
})();
