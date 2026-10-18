"use strict";
(function(root,factory){
  const W=typeof module==='object'&&module.exports?require('./weld-capacity.js'):root.WeldCapacity;
  const F=typeof module==='object'&&module.exports?require('./engineering-number-format.js'):root.EngineeringNumberFormat;
  const api=factory(W,F);if(typeof module==='object'&&module.exports)module.exports=api;root.FilletTable=api;
  if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',()=>api.init(document));
})(typeof globalThis!=='undefined'?globalThis:this,function(W,F){
  const sizes=Object.freeze([3,4,5,6,8,10,12,16]);
  const numeric=v=>(typeof v==='number'||typeof v==='string'&&v.trim()!=='')?Number(v):NaN;
  function evaluate(input){
    const category=input.category,fuw=numeric(input.fuw),length=numeric(input.length),runs=numeric(input.runs),connection=input.connection;
    const errors={};
    if(!['SP','GP'].includes(category))errors.category='Select SP or GP.';
    if(![430,490,550].includes(fuw))errors.fuw='Select a listed weld-metal strength.';
    if(!(Number.isFinite(length)&&length>0))errors.length='Enter a positive effective length per line.';
    if(!(Number.isSafeInteger(runs)&&runs>0))errors.runs='Enter a positive whole number of identical lines.';
    if(!['ordinary','lap'].includes(connection))errors.connection='This joint condition is outside the table scope.';
    const basisValid=Object.keys(errors).length===0;
    const result={errors,basisValid,category,fuw,length,runs,connection,rows:[]};
    if(!basisValid)return result;
    for(const size of sizes){
      const minimum=4*size,base=W.calculate({size,category,fuw,length:Math.max(length,minimum),runs:1,weldedLap:false});
      let capacity=null,perMm=null,kr=null;
      if(length>=minimum){const forward=W.calculate({size,category,fuw,length,runs,weldedLap:connection==='lap'});if(Number.isFinite(forward.capacity)){capacity=forward.capacity;perMm=forward.capacityPerMm;kr=forward.kr;}}
      result.rows.push({size,throat:base.throat,phi:base.phi,minimum,capacity,perMm,kr});
    }
    return result;
  }
  // Expanded substitutions retain the shortest decimal input precision through
  // the shared half-up/scientific formatter. Primary table precision is unchanged.
  const precise=n=>Number.isFinite(n)?(F&&typeof F.decimalHalfUpSignificant==='function'?F.decimalHalfUpSignificant(n,17):String(n)):'Not evaluated';
  function init(doc){
    const el=id=>doc.getElementById(id);if(!el('filletTablePane'))return;
    const fmt=(n,d=1)=>Number.isFinite(n)?n.toLocaleString('en-AU',{minimumFractionDigits:d,maximumFractionDigits:d}):'Not evaluated';
    const inputFmt=n=>Number.isFinite(n)?n.toLocaleString('en-AU',{maximumSignificantDigits:15}):'Not evaluated';
    const scroll=el('filletTablePane').querySelector('.fillet-scroll');
    function updateScrollCue(){el('filletScrollHint').hidden=scroll.scrollWidth<=scroll.clientWidth+1;}
    if(doc.defaultView&&doc.defaultView.ResizeObserver)new doc.defaultView.ResizeObserver(updateScrollCue).observe(scroll);
    else if(doc.defaultView)doc.defaultView.addEventListener('resize',updateScrollCue);
    const sizeControl=el('filletTraceSize');
    let selected=Number(sizeControl.value),current=null;
    function markCalculationSize(){for(const row of el('filletRows').children)row.classList.toggle('fillet-selected',Number(row.dataset.size)===selected);}
    function showTrace(){
      const r=current&&current.rows.find(r=>r.size===selected),container=el('filletTrace');container.replaceChildren();
      if(!r){block('Fillet calculation','tt = 0.707s; q = φ × 0.6 × fuw × tt × kr / 1000; φR = n × q × L','Valid table inputs required.','Not evaluated.',current?Object.values(current.errors).join(' '):'Select the table basis.');return;}
      function notation(parent,value){
        const symbols={tt:['t','t'],fuw:['f','uw'],q0:['q','0'],kr:['k','r'],Lraw:['L','raw'],Lreq:['L','req']};
        for(const token of value.split(/\b(tt|fuw|q0|kr|Lraw|Lreq)\b/g)){if(symbols[token]){const sub=doc.createElement('sub');sub.textContent=symbols[token][1];parent.append(doc.createTextNode(symbols[token][0]),sub);}else parent.append(doc.createTextNode(token));}
      }
      function block(title,formula,substitution,result,scope){
        const part=doc.createElement('div');part.className='calculation-trace-row fillet-trace-block';
        const h=doc.createElement('div');h.className='calculation-trace-heading';const b=doc.createElement('b'),source=doc.createElement('small');b.textContent=title;source.textContent='AS 4100 Cl. 9.6.3.10; Cl. 9.6.3.5; Tables 3.4 / 9.6.3.10(B)';h.append(b,source);part.append(h);
        const body=doc.createElement('div');body.className='calculation-trace-body';
        for(const [label,value]of [['Formula',formula],['Substitution',substitution],['Result',result],['Applicability',scope]]){const p=doc.createElement('div'),key=doc.createElement('span'),content=doc.createElement('code');p.className='calculation-trace-line is-'+label.toLowerCase();key.textContent=label;notation(content,value);p.append(key,content);body.append(p);}part.append(body);container.append(part);
      }
      const c=current;
      const krWorking=c.connection!=='lap'?'ordinary joint':c.length<=1700?'L/1000 ≤ 1.7 m':c.length<=8000?`1.10 − 0.06 × (${precise(c.length)}/1000)`:'L/1000 > 8 m; table value';
      block(`${selected} mm fillet · entered length`,'tt = 0.707s; q = φ × 0.6 × fuw × tt × kr / 1000; φR = n × q × L',r.capacity===null?`L = ${precise(c.length)} mm; minimum 4s = ${r.minimum} mm.`:`tt = 0.707 × ${selected} = ${fmt(r.throat,3)} mm; φ = ${r.phi}; fuw = ${c.fuw} MPa; kr = ${precise(r.kr)} (${krWorking}); n = ${c.runs}; L = ${precise(c.length)} mm.`,r.capacity===null?(c.length<r.minimum?'Not evaluated: entered length is below 4s.':'Not evaluated: numerical range exceeded; revise inputs.'):`${fmt(r.perMm,4)} kN/mm per line; ${fmt(r.capacity,2)} kN total.`,'Full-size route: L ≥ 4s. Weld-size limits and connected parts are separate.');
    }
    function update(){
      current=evaluate({category:el('filletCategory').value,fuw:el('filletStrength').value,length:el('filletLength').value,runs:el('filletLines').value,connection:el('filletConnection').value});
      const keys={category:'filletCategory',fuw:'filletStrength',length:'filletLength',runs:'filletLines',connection:'filletConnection'};
      for(const [key,id]of Object.entries(keys)){if(current.errors[key])el(id).setAttribute('aria-invalid','true');else el(id).removeAttribute('aria-invalid');}
      el('filletMessage').textContent=Object.values(current.errors).join(' ');
      el('filletMessage').className=Object.keys(current.errors).length?'fillet-message fillet-error':'fillet-message';
      el('filletCurrentBasis').textContent=current.basisValid?`${current.category} · φ ${current.category==='SP'?'0.80':'0.60'} · ${current.fuw} MPa · ${inputFmt(current.length)} mm/line × ${current.runs}${current.connection==='lap'?` · entered kᵣ ${fmt(W.lapReduction(current.length),4)}`:' · kᵣ 1'}`:'Table results not evaluated.';
      const tbody=el('filletRows');tbody.replaceChildren();
      for(const size of sizes){
        const r=current.rows.find(x=>x.size===size),tr=doc.createElement('tr');tr.dataset.size=String(size);if(size===selected)tr.className='fillet-selected';
        const th=doc.createElement('th');th.scope='row';th.textContent=String(size);tr.append(th);
        function cell(value,note){const td=doc.createElement('td');td.textContent=value;if(note){const small=doc.createElement('small');small.textContent=note;td.append(small);}tr.append(td);}
        cell(r?fmt(r.throat,3):'Not evaluated');cell(r?fmt(r.minimum,0):'Not evaluated');
        cell(r&&r.perMm!==null?fmt(r.perMm,3):'Not evaluated',r&&current.length<r.minimum?'L < 4s':null);
        cell(r&&r.capacity!==null?fmt(r.capacity,1):'Not evaluated');
        tbody.append(tr);
      }
      showTrace();updateScrollCue();
    }
    for(const id of ['filletCategory','filletStrength','filletLength','filletLines','filletConnection'])el(id).addEventListener('input',update);
    sizeControl.addEventListener('change',()=>{selected=Number(sizeControl.value);markCalculationSize();showTrace();});
    for(const name of ['Calculator','Table'])el('weldMode'+name).addEventListener('click',()=>{
      const table=name==='Table';el('weldCalculatorPane').hidden=table;el('filletTablePane').hidden=!table;el('weldModeTable').setAttribute('aria-pressed',String(table));el('weldModeCalculator').setAttribute('aria-pressed',String(!table));
    });
    update();
  }
  return Object.freeze({sizes,evaluate,init});
});
