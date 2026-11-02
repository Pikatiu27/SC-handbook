/* HB-ANALYSIS-01. The accepted compatibility kernels keep their original
 * downward/clockwise internal variables. This single API boundary converts
 * every returned deformation representation into upward/CCW analysis signs. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else{
 const native=root.BeamDeflection,more=root.BeamMoreLayouts;
 const deflection=Object.freeze({...native,calculate:(...args)=>api.response(native.calculate(...args))});
 root.BeamDeflection=deflection;
 root.BeamMoreLayouts=Object.freeze({...more,deflection,deformation:(...args)=>api.response(more.deformation(...args))});
 root.HandbookAnalysisSigns=api;
}})(typeof globalThis==='object'?globalThis:this,function(){
 'use strict';const cache=new WeakMap(),neg=v=>v===0?0:-v;
 const point=p=>p?{...p,...Object.hasOwn(p,'delta')?{delta:neg(p.delta)}:{},...Object.hasOwn(p,'theta')?{theta:neg(p.theta)}:{}}:p;
 function response(r){
  if(!r?.valid||r.signConvention==='HB-ANALYSIS-01')return r;
  if(cache.has(r))return cache.get(r);
  const converted={...r,signConvention:'HB-ANALYSIS-01',
   at:(x,side)=>point(r.at(x,side)),samples:r.samples.map(point),
   segments:r.segments.map(s=>({...s,delta:s.delta.map(neg),theta:s.theta.map(neg)})),
   constants:{...r.constants,c1:neg(r.constants.c1),c2:neg(r.constants.c2)},
   boundary:r.boundary.map(point),
   extrema:Object.fromEntries(['delta','theta'].map(key=>[key,{min:point(r.extrema[key].max),max:point(r.extrema[key].min),absolute:point(r.extrema[key].absolute)}]))
  };
  if(r.hingeChecks)converted.hingeChecks=r.hingeChecks.map(h=>({...h,deltaJump:neg(h.deltaJump),thetaLeft:neg(h.thetaLeft),thetaRight:neg(h.thetaRight)}));
  cache.set(r,converted);return converted;
 }
 return Object.freeze({response,convention:'HB-ANALYSIS-01'});
});
