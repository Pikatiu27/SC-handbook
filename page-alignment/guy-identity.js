'use strict';
(function(root){
  const normal=v=>String(v??'').toLowerCase().replace(/[–−]/g,'-').replace(/\s+/g,'').trim();
  function identity(p,columns){
    const keys=new Set(columns.map(c=>c.key)),v=p.properties||{};let code=p.code,size=p.size;
    // These records explicitly have no manufacturer SKU. Keep their nominal size;
    // the independently visible Grade column carries the repeated grade.
    if(keys.has('$grade')&&/manufacturer SKU not provided/.test(v['Record identity']||''))code=code.replace(/ \/ Grade \d+$/,'');
    const inCode=normal(code)===normal(size)||normal(code).startsWith(normal(size)+'/')||normal(code).startsWith(normal(size)+'(');
    if(inCode)return {code,size:''};
    if(keys.has('$size'))return {code,size:''};
    const displayed=k=>keys.has(k)&&v[k]!==undefined&&v[k]!==null&&v[k]!=='';
    const candidates=[];
    if(displayed('Source construction designation'))candidates.push(v['Source construction designation']);
    for(const k of ['Nominal rope diameter (mm)','Nominal strand diameter (mm)','Matching diameter (mm)','Suits rope diameter (mm)','Source dimension d (mm)'])if(displayed(k))candidates.push(v[k]+' mm',v[k]+' mm rope');
    if(displayed('Thread size (source)'))candidates.push(v['Thread size (source)']);
    if(displayed('Rope diameter min (mm)')&&displayed('Rope diameter max (mm)')){
      const low=v['Rope diameter min (mm)'],high=v['Rope diameter max (mm)'];
      candidates.push(low+'–'+high+' mm rope');if(low===high)candidates.push(low+' mm rope');
    }
    if(candidates.some(value=>normal(value)===normal(size)))size='';
    if(size&&displayed('Strand construction')){
      const suffix=' / '+v['Strand construction'];if(size.endsWith(suffix))size=size.slice(0,-suffix.length);
    }
    return {code,size};
  }
  function columns(layout,family){
    if(!['Turnbuckle','Rigging screw'].includes(family))return layout;
    // Move the exact existing catalogue size to its own searchable comparison column.
    // Never infer a thread from a supplier's lettered drawing dimension.
    return {...layout,columns:[{key:'$size',label:'Nominal size',secondary:false},...layout.columns]};
  }
  function header(c){
    const m=c.label.match(/^(.*) (\([^()]+\))$/);
    let name=m?m[1]:c.label,unit=m?m[2]:'';
    const short={
      '$size':'Size','$rating':'Rating','$form':'Connection','$evidence':'AU / mast','$source':'Source',
      'Nominal strand diameter (mm)':'Nominal Ø','Nominal rope diameter (mm)':'Rope Ø',
      'Actual strand diameter (in)':'Actual Ø','Nominal wire diameter (mm)':'Wire Ø',
      'Metallic area (mm²)':'Metal area','Source construction designation':'Designation',
      'Designated size (mm)':'Size','Approx. mass (kg/1000 m)':'Mass',
      'Source finish notation':'Finish note','Closed length (mm)':'Closed','Open length (mm)':'Open',
      'Length range (derived mm)':'Range','Published safety factor':'Safety',
      'Published ultimate load multiplier (x WLL)':'Ultimate',
      'Component type':'Component','Suits rope diameter (mm)':'Rope Ø',
      'Bend radius (mm)':'Bend R','Opened width (mm)':'Open width',
      'Source nominal rope size (in)':'Rope size','Source threaded length (mm)':'Thread L',
      'Maximum grip size (source)':'Max. grip','Grips per termination':'Grips',
      'Matching diameter (mm)':'Matching Ø','Strand construction':'Construction',
      'Approximate length (in)':'Approx. L','Rope diameter min (mm)':'Min. rope Ø',
      'Rope diameter max (mm)':'Max. rope Ø','Overall length (mm)':'Overall L',
      'Thread length (mm)':'Thread L','Hole diameter (mm)':'Hole Ø','Sheave diameter (mm)':'Sheave Ø',
      'Source rope construction':'Rope construction','Supplied assembly':'Assembly'
    };
    name=short[c.key]||name;
    if(c.key==='Length range (derived mm)')unit='(mm, derived)';
    if(c.key==='Grips per termination')unit='/ termination';
    if(c.key==='Published safety factor')unit='factor';
    if(c.key.startsWith('Source dimension '))name=c.key.slice('Source dimension '.length).replace(/ \(mm\)$/,'');
    const zinc=c.key.match(/^Min\. zinc coating Class ([ABC]) \(g\/m²\)$/);
    if(zinc)name='Zinc '+zinc[1]+' min.';
    if(c.label.endsWith(' code')){name=c.label.slice(0,-5);unit='code';}
    return {name,unit};
  }
  const api={identity,columns,header};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.GuyTableIdentity=api;
})(globalThis);
