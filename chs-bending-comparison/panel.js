(function(){
 "use strict";
 const $=id=>document.getElementById(id),fields=['chs4600Diameter','chs4600Thickness','chs4600Fy','chsCompareHotFy'],products=As4600ChsProducts;
 const text=(id,value)=>{$(id).textContent=value;},format=(v,places=2)=>Number.isFinite(v)?EngineeringNumberFormat.decimalHalfUp(v,places):'—';
 const percent=v=>v===null?'—':(v>0?'+':'')+format(v,1)+'%';
 const designIds=['chsCompare4100Design','chsCompare4600Design','chsCompareHotDesign'];
 const outputIds=[...designIds,'chsCompare4100Nominal','chsCompare4600Nominal','chsCompareHotNominal','chsCompare4100Class','chsCompare4600Branch','chsCompareHotClass','chsCompare4100Fy','chsCompare4600Fy','chsCompareHotFyReadout','chsCompareRatio','chsCompareBaseline','chsCompareDifference','chsCompareHotDifference','chsCompareInside','chsCompareI','chsCompareZ','chsCompareS'];
 const traceIds=['chsCompare4100Trace','chsCompare4600Trace','chsCompareHotTrace'];
 function clear(message){
  outputIds.forEach(id=>text(id,'—'));designIds.forEach(id=>$(id).parentElement.classList.remove('is-unavailable'));
  text('chsCompareMessage',message);
  traceIds.forEach((id,i)=>$(id).innerHTML=HandbookNumericalTraces.html(HandbookNumericalTraces.chs({issues:[message]},['as4100','as4600','hotAs4100'][i]),calculationTraceRow));
 }
 function provenance(){text('chsCompareProvenance',$('chsCompareProduct').value?'Cold-formed: Orrcon nominal size/grade · HR fy: manual.':'Manual geometry and fy · confirm both material bases.');}
 function selectProduct(){
  const product=products.rows.find(p=>p.id===$('chsCompareProduct').value),grade=$('chsCompareGrade'),prior=grade.value;
  grade.replaceChildren();$('chsCompareGradeField').hidden=!product;
  if(product){
   grade.add(new Option('Select grade',''));product.grades.forEach(g=>grade.add(new Option(g,g)));grade.value=product.grades.includes(prior)?prior:'';
   $('chs4600Diameter').value=String(product.outsideDiameterMm);$('chs4600Thickness').value=String(product.nominalThicknessMm);$('chs4600Fy').value=grade.value?String(products.grades[grade.value]):'';
  }
  fields.slice(0,3).forEach(id=>{$(id).readOnly=Boolean(product);});$('chsCompareHotFy').readOnly=false;
  provenance();compare();
 }
 function write4100(side,prefix){
  const valid=side.status==='Calculated';text(prefix+'Design',valid?format(side.designMomentKNm):'Not evaluated');$(prefix+'Design').parentElement.classList.toggle('is-unavailable',!valid);
  text(prefix+'Nominal',format(side.nominalMomentKNm));text(prefix+'Class',valid?side.classification:'Unavailable');
  text(prefix+'Trace',valid?'fy = '+format(side.yieldStressMpa,1)+' MPa; λs = '+format(side.lambda,3)+'; '+side.fabricationCategory+' limits 50 / 120; '+side.classification+' (Cl. '+side.clause+'). Ze = '+format(side.Ze/1000,3)+' × 10³ mm³. Ms = '+format(side.nominalMomentKNm)+' kN·m.':side.issues.join(' '));
 }
 function compare(){
  const result=ChsBendingComparison.calculate({diameterMm:$('chs4600Diameter').value,thicknessMm:$('chs4600Thickness').value,yieldStressMpa:$('chs4600Fy').value,hotYieldStressMpa:$('chsCompareHotFy').value});
  fields.forEach(id=>{const raw=$(id).value,n=Number(raw);$(id).setAttribute('aria-invalid',String(String(raw).trim()===''||!Number.isFinite(n)||n<=0||(id==='chs4600Thickness'&&Number($('chs4600Diameter').value)<=2*n)));});
  $('chsCompareGrade').setAttribute('aria-invalid',String(Boolean($('chsCompareProduct').value&&!$('chsCompareGrade').value)));
  if(result.status==='Invalid input'){clear(result.issues.join(' '));return;}
  const a=result.as4100,b=result.as4600,h=result.hotAs4100;
  write4100(a,'chsCompare4100');write4100(h,'chsCompareHot');
  text('chsCompare4600Design',b.status==='Calculated'?format(b.designMomentKNm):'Not evaluated');$('chsCompare4600Design').parentElement.classList.toggle('is-unavailable',b.status!=='Calculated');text('chsCompare4600Nominal',format(b.nominalMomentKNm));text('chsCompare4600Branch',b.status==='Calculated'?'Cl. '+b.branch:'Unavailable');
  const coldFy=Number.isFinite(result.yieldStressMpa)&&result.yieldStressMpa>0?format(result.yieldStressMpa,1):'—',hotFy=Number.isFinite(result.hotYieldStressMpa)&&result.hotYieldStressMpa>0?format(result.hotYieldStressMpa,1):'—';
  text('chsCompare4100Fy',coldFy);text('chsCompare4600Fy',coldFy);text('chsCompareHotFyReadout',hotFy);
  text('chsCompareRatio',format(result.ratio,2));text('chsCompareBaseline',a.status==='Calculated'?'Baseline':'—');text('chsCompareDifference',percent(result.differencePercent));text('chsCompareHotDifference',percent(result.hotDifferencePercent));
  text('chsCompareInside',format(result.insideDiameterMm,2)+' mm');text('chsCompareI',format(result.I/1e6,3)+' × 10⁶ mm⁴');text('chsCompareZ',format(result.Z/1000,3)+' × 10³ mm³');text('chsCompareS',format(result.S/1000,3)+' × 10³ mm³');
  text('chsCompare4600Trace',b.status==='Calculated'?'fy = '+format(result.yieldStressMpa,1)+' MPa; D/t = '+format(b.ratio,3)+'; limits '+[b.limits.compact,b.limits.intermediate,b.limits.applicability].map(v=>format(v,3)).join(' / ')+'. Cl. '+b.branch+': effective stress = '+format(b.nominalStressMpa,3)+' MPa. Mb = '+format(b.nominalMomentKNm)+' kN·m.':b.issues.join(' '));
  ['as4100','as4600','hotAs4100'].forEach((key,i)=>$(traceIds[i]).innerHTML=HandbookNumericalTraces.html(HandbookNumericalTraces.chs(result,key),calculationTraceRow));
  text('chsCompareMessage',result.status!=='Calculated'?result.issues.join(' '):result.yieldStressMpa===result.hotYieldStressMpa?'Same fy · AS 4100 CF and HR match.':'Different fy · material strength also affects the comparison.');
 }
 products.rows.forEach(p=>$('chsCompareProduct').add(new Option(p.outsideDiameterMm+' × '+p.nominalThicknessMm+' CHS (Orrcon)',p.id)));
 $('chsCompareProduct').addEventListener('change',selectProduct);$('chsCompareGrade').addEventListener('change',selectProduct);
 fields.forEach(id=>$(id).addEventListener('input',()=>{provenance();compare();}));
 compare();
})();
