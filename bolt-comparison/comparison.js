"use strict";
(function(root){
 function allowed(bolt,cat){return !cat.preload || Number.isFinite(bolt[cat.preload])&&bolt[cat.preload]>0;}
 function rows({data,categories,size,category,mode,kr,api}){
  const validKr=Number.isFinite(kr)&&kr>=0.75&&kr<=1;
  const entries=mode==="category"?Object.keys(categories).filter(c=>allowed(data[size],categories[c])).map(c=>[size,c]):Object.keys(data).filter(s=>allowed(data[s],categories[category])).map(s=>[s,category]);
  return entries.map(([s,c])=>{const bolt=data[s],cat=categories[c],fuf=api.ultimateStrength({grade:cat.grade,diameter:bolt.d,tableStrength:cat.fuf});
   const shear=(n,x)=>validKr?api.designShear({grade:cat.grade,fuf,kr,threadPlanes:n,shankPlanes:x,Ac:bolt.Ac,Ao:bolt.Ao}).design:null;
   return {size:s,category:c,label:mode==="category"?c:s,description:cat.description,n:shear(1,0),x:shear(0,1),tension:api.designTension({As:bolt.As,fuf}),preload:cat.preload?bolt[cat.preload]??null:"Not required",preloadBasis:cat.preload?bolt[`${cat.preload}Basis`]??"as4100":null,areaBasis:bolt.areaBasis??null};
  });
 }
 const api={rows,allowed};if(typeof module!=="undefined"&&module.exports)module.exports=api;root.BoltCapacityComparison=api;
})(globalThis);
