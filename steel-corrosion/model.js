(function(root,factory){const m=factory();if(typeof module==='object'&&module.exports)module.exports=m;else root.SCSteelCorrosionModel=m;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';const format=v=>Number.isFinite(v)?String(v):'Not tabulated';
 function columns(view,data){const source=r=>data.sources[r.source].label;
  if(view==='environment')return[
   {key:'category',label:'AS 4312 category',value:r=>r.id+' · '+r.severity},
   {key:'environment',label:'Common environments',value:r=>r.environment},
   {key:'steel',label:'Steel loss',unit:'µm/y · year 1',measured:true,value:r=>r.steel},
   {key:'zinc',label:'Zinc loss',unit:'µm/y · year 1',measured:true,value:r=>r.zinc},
   {key:'condition',label:'Key conditions',value:r=>r.condition},
   {key:'source',label:'Source',value:source}];
  if(view==='paint')return[
   {key:'system',label:'System',value:r=>r.system+' · '+r.family},
   {key:'substrate',label:'Substrate',value:r=>r.substrate},
   {key:'category',label:'AS 2312 exposure',value:r=>r.category},
   {key:'life',label:'First maintenance',unit:'years · basis',measured:true,value:r=>r.life+' · '+r.lifeBasis},
   {key:'prep',label:'Preparation',value:r=>r.prepLabel},
   {key:'coatings',label:'Coatings',value:r=>r.coatings},
   {key:'total',label:'Total NDFT',unit:'µm',numeric:true,value:r=>({value:r.total,basis:r.basis}),format},
   {key:'source',label:'Source',value:source}];
  if(view==='life')return[
   {key:'system',label:'System',value:r=>r.system},
   {key:'category',label:'AS 2312 exposure',value:r=>r.category},
   {key:'zinc',label:'Average zinc',unit:'µm · guide basis',numeric:true,value:r=>({value:r.zinc,basis:r.basis}),format},
   {key:'life',label:'First maintenance',unit:'years · estimate',measured:true,value:r=>r.life},
   {key:'durabilityClass',label:'Guide class',value:r=>r.durabilityClass},
   {key:'condition',label:'Key conditions',value:r=>r.condition},
   {key:'source',label:'Source',value:source}];
  if(view!=='coating')throw Error('Unknown table');
  return[
   {key:'article',label:'Article',value:r=>r.article},
   {key:'process',label:'Process',value:r=>r.process},
   {key:'condition',label:'Steel / condition',value:r=>r.condition},
   {key:'size',label:'Size band',unit:'mm',value:r=>r.size},
   ...['local','mean'].map(key=>({key,label:key==='local'?'Local min.':'Mean min.',unit:'µm',numeric:true,value:r=>({value:r[key],basis:data.sources[r.source].role}),format})),
   {key:'source',label:'Source',value:source}];
 }
 return{columns,format};
});
