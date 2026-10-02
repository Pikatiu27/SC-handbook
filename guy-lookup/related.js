"use strict";
(function(root){
 const keys=['Closed thimble code','Open thimble code','Clevis thimble code','Socket thimble code','Thimble eye nut code','Cast iron sheave code','Guy insulator code'];
 const codes=p=>keys.flatMap(key=>String(p.properties[key]||'').split(' / ').filter(Boolean).map(code=>({label:key.replace(' code',''),code})));
 const chart=p=>p.source==='plpAU2025'&&p.family==='Dead-end'&&(p.additionalSources||[]).some(ref=>ref.page===78);
 function related(p,products){
  if(!p)return [];
  if(chart(p))return codes(p).map(ref=>({...ref,target:products.find(r=>r.manufacturer===p.manufacturer&&r.code===ref.code&&r.family!=='Dead-end')||null}));
  return products.filter(r=>r.manufacturer===p.manufacturer&&chart(r)&&codes(r).some(ref=>ref.code===p.code)).map(target=>({label:target.properties['Strand construction'],code:target.code,target}));
 }
 const api={keys,related};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.GuyFittingsRelated=api;
})(globalThis);
