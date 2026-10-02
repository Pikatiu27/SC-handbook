"use strict";
(function(root){
 const labels={"Guy wire rope":"Overall rope diameter (mm)","Accessories":"Use accessory type or part number","Guy strand":"Overall strand diameter (mm)","Turnbuckle":"Thread diameter (mm)","Rigging screw":"Thread diameter (mm)","Shackle":"Catalogue nominal size (mm)","Dead-end":"Matching strand diameter (mm)","Thimble":"Matching rope diameter (mm)","Wire rope grip":"Matching rope diameter (mm)"};
 function diameter(p){
  const v=p.properties||{};
  if(p.family==='Guy wire rope')return v['Nominal rope diameter (mm)']??null;
  if(p.family==='Guy strand')return v['Nominal strand diameter (mm)']??null;
  if(p.family==='Dead-end'&&typeof v['Matching diameter (mm)']==='number')return v['Matching diameter (mm)'];
  if(p.family==='Dead-end')return typeof v['Actual strand diameter (in)']==='number'?v['Actual strand diameter (in)']*25.4:null;
  if(['Thimble','Wire rope grip'].includes(p.family))return v['Suits rope diameter (mm)']??null;
  const m=p.family==='Shackle'?p.size.match(/^(\d+(?:\.\d+)?) mm$/):p.size.match(/^M(\d+(?:\.\d+)?)$/);
  return m?Number(m[1]):null;
 }
 // Only explicit product diameter fields participate in physical-size sorting.
 function compareSize(a,b){
  const da=diameter(a),db=diameter(b),ak=Number.isFinite(da),bk=Number.isFinite(db);
  if(ak&&bk&&da!==db)return da-db;
  if(ak!==bk)return ak?-1:1;
  return a.size.localeCompare(b.size,undefined,{numeric:true})||a.series.localeCompare(b.series)||a.grade.localeCompare(b.grade,undefined,{numeric:true})||a.code.localeCompare(b.code,undefined,{numeric:true});
 }
 function nearby(rows,raw){
  if(!String(raw).trim())return {rows,active:false,invalid:false,omitted:0,sizes:[]};
  if(!/^\d+(?:\.\d+)?$/.test(String(raw).trim())||!Number.isFinite(Number(raw))||Number(raw)<=0)return {rows:[],active:true,invalid:true,omitted:0,sizes:[]};
  const target=Number(raw), known=rows.filter(p=>Number.isFinite(diameter(p))&&diameter(p)>0);
  const available=[...new Set(known.map(diameter))].sort((a,b)=>a-b),range=available.length?[available[0],available.at(-1)]:null;
  if(!range)return {rows:[],active:true,invalid:false,unavailable:true,omitted:rows.length,sizes:[],target,range:null};
  if(target<range[0]||target>range[1])return {rows:[],active:true,invalid:false,outOfRange:true,omitted:rows.length-known.length,sizes:[],target,range};
  const sizes=available.sort((a,b)=>Math.abs(a-target)-Math.abs(b-target)||a-b).slice(0,3);
  return {rows:known.filter(p=>sizes.includes(diameter(p))).sort((a,b)=>Math.abs(diameter(a)-target)-Math.abs(diameter(b)-target)||diameter(a)-diameter(b)),active:true,invalid:false,omitted:rows.length-known.length,sizes,target,range};
 }
 const api={diameter,compareSize,nearby,labels};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.GuyFittingsLookup=api;
})(globalThis);
