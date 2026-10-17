"use strict";
(function(root,factory){const F=typeof module==='object'&&module.exports?require('./engineering-number-format.js'):root.EngineeringNumberFormat; const api=factory(F); if(typeof module==='object'&&module.exports)module.exports=api; root.WeldDetailing=api;})(typeof globalThis!=='undefined'?globalThis:this,function(F){
  const thickness=value=>typeof value==='number'||typeof value==='string'&&value.trim()!==''?Number(value):NaN;
  function evaluate({type='fillet',enabled=false,size,t1,t2,joint='unknown',edge='unknown'}){
    const unavailable=(state,note)=>({state,note,minimum:null,maximum:null,tableMinimum:null,within:false});
    if(!enabled)return unavailable('Not enabled','Selected size limits only.');
    if(type!=='fillet')return unavailable('Not applicable','Size limits apply to fillet welds only.');
    const a=thickness(t1),b=thickness(t2),s=thickness(size);
    if(![a,b,s].every(x=>Number.isFinite(x)&&x>0))return unavailable('Enter thicknesses','Enter both thicknesses and a positive weld size.');
    if(joint!=='ordinary')return unavailable('Review joint condition','Equal-leg, 90° and no root gap only; butt reinforcement, deep penetration and special joints excluded.');
    if(!['none','standard','built'].includes(edge))return unavailable('Confirm edge condition','Confirm the thinner-part edge condition.');
    const thicker=Math.max(a,b),thinner=Math.min(a,b);
    const tableMinimum=thicker<=7?3:thicker<=10?4:thicker<=15?5:6;
    const minimum=Math.min(tableMinimum,thinner);
    const maximum=edge==='none'?null:edge==='built'||thinner<6?thinner:thinner-1;
    const within=s>=minimum&&(maximum===null||s<=maximum);
    return {state:within?'Within size limits':'Outside size limits',within,minimum,maximum,tableMinimum,thicker,thinner,note:maximum!==null&&minimum>maximum?'No compatible size for this edge; review the detail.':edge==='built'?'Specify the built-out edge on the drawing to achieve the design throat.':edge==='none'?'No edge maximum; verify other detailing.':'Ordinary edge limit; no built-out concession.'};
  }
  function update(doc){
    const el=id=>doc.getElementById(id), enabled=el('weldSizeCheckEnabled').checked, type=el('weldType').value;
    const result=evaluate({type,enabled,size:el('weldSize').value,t1:el('weldPart1').value,t2:el('weldPart2').value,joint:el('weldJointCondition').value,edge:el('weldEdgeCondition').value});
    const active=enabled&&type==='fillet';
    el('weldSizeFields').hidden=!active;
    el('weldSizeOutputs').hidden=!active;
    for(const id of ['weldPart1','weldPart2','weldJointCondition','weldEdgeCondition'])el(id).disabled=!active;
    for(const id of ['weldPart1','weldPart2']){
      const n=thickness(el(id).value);
      if(active&&!(Number.isFinite(n)&&n>0))el(id).setAttribute('aria-invalid','true');else el(id).removeAttribute('aria-invalid');
    }
    // Preserve source-band operands and thinner-part limits. Rounding a value
    // just above 7/10/15 or 6 mm would hide the branch shown in the same trace.
    const number=n=>F&&typeof F.decimalHalfUpSignificant==='function'?F.decimalHalfUpSignificant(n,17):String(n);
    el('weldSizeMinimum').textContent=result.minimum===null?'Not evaluated':number(result.minimum)+' mm';
    el('weldSizeMaximum').textContent=result.minimum===null?'Not evaluated':result.maximum===null?'Not applicable':number(result.maximum)+' mm';
    el('weldSizeState').textContent=result.state;
    el('weldSizeState').className='check';
    el('weldSizeNote').textContent=result.note;
    el('weldSizeTrace').textContent=result.minimum===null?'Select a confirmed joint and enter both thicknesses.':`Thicker part ${number(result.thicker)} mm: table minimum ${number(result.tableMinimum)} mm; thinner-part cap ${number(result.thinner)} mm; adopted minimum ${number(result.minimum)} mm. ${result.maximum===null?'Edge maximum not applicable.':`Edge maximum ${number(result.maximum)} mm.`} Selected size ${el('weldSize').value} mm. Limits checked only.`;
    el('weldParentResult').hidden=!el('weldParentCheckEnabled').checked;
    if(active&&!result.within&&/Weld throat (PASS|FAIL)/.test(el('weldStatus').textContent)){
      el('weldStatus').textContent='Review size limits';el('weldStatus').className='check';
    }
    el('weldMainTotal').textContent=el('weldCapacity').textContent;
    el('weldMainTotalUnit').hidden=el('weldTotalCapacityUnit').hidden;
    el('weldMainTotalNote').textContent=el('weldMainTotalUnit').hidden?'Method or geometry not evaluated.':`${el('weldLength').value} mm × ${el('weldRuns').value} identical effective line${el('weldRuns').value==='1'?'':'s'}.`;
    if(!el('weldCapacityUnit').hidden)el('weldCapacityLabel').textContent='Design capacity per mm';
    return result;
  }
  return Object.freeze({evaluate,update});
});
