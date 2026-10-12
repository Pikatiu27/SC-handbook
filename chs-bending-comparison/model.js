(function(root,factory){
 "use strict";
 if(typeof module==='object'&&module.exports)module.exports=Object.freeze({create:factory});
 else root.ChsBendingComparison=factory(root.SectionGeometry,root.BeamSectionReconciliation,root.BeamSectionCapacity,root.As4600ChsBending,root.MonopoleCapacity);
})(typeof globalThis!=='undefined'?globalThis:this,function(geometry,reconciliation,beam,cold,monopole){
 "use strict";
 const number=v=>typeof v==='boolean'||v===null||v===undefined||String(v).trim()===''?NaN:Number(v);
 const unavailable=issue=>({status:'Not evaluated',issues:[issue]});
 const invalid=issues=>({status:'Invalid input',issues,as4100:unavailable(issues[0]),as4600:unavailable(issues[0]),hotAs4100:unavailable(issues[0]),differencePercent:null,hotDifferencePercent:null});
 const labels={C:'Compact',N:'Non-compact',S:'Slender'},clauses={'Compact':'5.2.3','Non-compact':'5.2.4','Slender':'5.2.5'};
 const positive=v=>Number.isFinite(v)&&v>0;
 // Multiply before dividing so exact input relationships at 50/120 stay on their owning branch.
 const slenderness=(D,t,fy)=>(D*fy)/(250*t);
 function difference(a,b){if(a.status!=='Calculated'||b.status!=='Calculated')return null;const d=100*(b.designMomentKNm/a.designMomentKNm-1);return Number.isFinite(d)?(Math.abs(d)<1e-10?0:d):null;}
 function calculate(input){
  const D=number(input?.diameterMm),t=number(input?.thicknessMm),fy=number(input?.yieldStressMpa),hotFy=number(input?.hotYieldStressMpa),issues=[];
  if(!Number.isFinite(D)||D<=0)issues.push('Enter a positive outside diameter D.');
  if(!Number.isFinite(t)||t<=0)issues.push('Enter a positive base steel thickness t.');
  if(issues.length)return invalid(issues);if(D<=2*t)return invalid(['D must exceed 2t.']);
  try {
   const g=geometry.circularHollow(D,t),ratio=D/t;
   if(![g.ix,g.zx,g.sx,ratio].every(positive))return invalid(['Inputs exceed the supported numeric range.']);
   let as4100=unavailable('Enter a positive cold-formed fy.'),as4600=unavailable('Enter a positive cold-formed fy.'),hotAs4100=unavailable('Enter a positive hot-finished fy.');
   if(positive(fy)){
    try{const lambda=slenderness(D,t,fy),Ze=reconciliation.chsZe(g.zx,g.sx,lambda),phi=beam.PHI,design=beam.sectionMoment(fy,Ze),classification=labels[reconciliation.sectionClass(lambda,reconciliation.LIMITS.chsBendingCF)];
     if(![lambda,Ze,design,design/phi].every(positive))throw new RangeError('Numeric range');
     as4100={status:'Calculated',designMomentKNm:design,nominalMomentKNm:design/phi,phi,Ze,lambda,classification,clause:clauses[classification],fabricationCategory:'CF',yieldStressMpa:fy};
    }catch(error){as4100=unavailable('Cold-formed AS 4100 inputs exceed the supported numeric range.');}
    as4600=cold.calculate({diameterMm:D,thicknessMm:t,yieldStressMpa:fy});
   }
   if(positive(hotFy)){
    try{const h=monopole.circularMomentCapacity(D,t,hotFy,'HR'),lambda=slenderness(D,t,hotFy),classification=labels[reconciliation.sectionClass(lambda,reconciliation.LIMITS.chsBendingCF)];
     // CF and HR have the same Table5.2 CHS limits. Reconcile only an owner branch crossed by rounding.
     const Ze=classification===h.sectionClass?h.effectiveModulus:reconciliation.chsZe(g.zx,g.sx,lambda);
     const nominal=classification===h.sectionClass?h.nominalMomentCapacity:hotFy*Ze/1e6,design=classification===h.sectionClass?h.designMomentCapacity:monopole.PHI*nominal;
     if(![lambda,Ze,nominal,design].every(positive))throw new RangeError('Numeric range');
     hotAs4100={status:'Calculated',designMomentKNm:design,nominalMomentKNm:nominal,phi:monopole.PHI,Ze,lambda,classification,clause:clauses[classification],fabricationCategory:h.fabricationCategory,yieldStressMpa:hotFy};
    }catch(error){hotAs4100=unavailable('Hot-finished AS 4100 inputs exceed the supported numeric range.');}
   }
   const sides=[as4100,as4600,hotAs4100],count=sides.filter(s=>s.status==='Calculated').length;
   const issues=[...new Set(sides.flatMap(s=>s.status==='Calculated'?[]:s.issues))];
   return {status:count===3?'Calculated':count?'Partial comparison':'Invalid input',issues,diameterMm:D,thicknessMm:t,yieldStressMpa:fy,hotYieldStressMpa:hotFy,ratio,insideDiameterMm:D-2*t,I:g.ix,Z:g.zx,S:g.sx,as4100,as4600,hotAs4100,differencePercent:difference(as4100,as4600),hotDifferencePercent:difference(as4100,hotAs4100)};
  }catch(error){return invalid(['Geometry cannot be evaluated for these inputs.']);}
 }
 return Object.freeze({calculate});
});
