"use strict";
(function(root){
  const primary={
    "Guy strand":["Construction","Nominal strand diameter (mm)","Metallic area (mm²)","Linear mass (kg/m)"],
    "Guy wire rope":["Construction","Nominal rope diameter (mm)","Core","Lay","Linear mass (kg/m)"],
    "Turnbuckle":["Closed length (mm)","Open length (mm)","Length range (derived mm)","Mass (kg)"],
    "Rigging screw":["Closed length (mm)","Open length (mm)","Length range (derived mm)","Mass (kg)"],
    "Shackle":["Source dimension d (mm)","Source dimension D (mm)","Source dimension W (mm)","Mass (kg)"],
    "Dead-end":["Matching diameter (mm)","Strand construction","Colour code","Closed thimble code","Open thimble code","Actual strand diameter (in)","Holding strength (% of RBS)","Lay"],
    "Thimble":["Component type","Suits rope diameter (mm)","Bend radius (mm)","Seat width (mm)","Opened width (mm)","Finish"],
    "Wire rope grip":["Suits rope diameter (mm)","Grips per termination","Finish"],
    "Accessories":["Component type","Rope diameter min (mm)","Rope diameter max (mm)","Catalogue efficiency (% of rope catalogue strength)","Thread size (source)","Bolt size (source)","Bend radius (mm)","Overall length (mm)","Thread length (mm)"]
  };
  const aliases={"Nominal strand diameter (mm)":"Strand diameter (mm)","Linear mass (kg/m)":"Mass (kg/m)","Suits rope diameter (mm)":"Suits rope (mm)","Actual strand diameter (in)":"Strand diameter (in)","Holding strength (% of RBS)":"Holding (% RBS)","Approx. mass (kg/1000 m)":"Source mass (kg/1000 m)","Source construction designation":"Source designation","Source nominal rope size (in)":"Source rope size (in)","Catalogue efficiency (% of rope catalogue strength)":"Efficiency (%)","Published proof load multiplier (x WLL)":"Proof load (× WLL)","Published ultimate load multiplier (x WLL)":"Ultimate load (× WLL)"};
  const label=k=>aliases[k]||k.replace("Source dimension ","Drawing ").replace("Min. zinc coating Class ","Zinc min. Class ");
  const numeric=k=>/\((?:kN|mm|kg|in|g\/)|Difference|Holding|Grips|factor|multiplier|efficiency/i.test(k);
  function columns(family,rows,products,accessoryType){
    const force=family!=="Wire rope grip"&&(!["Thimble","Accessories"].includes(family)||rows.some(p=>p.rating||p.fieldIssues?.some(i=>i.field==="WLL")));
    const reference=family==="Accessories"?rows:products.filter(p=>p.family===family);
    const keys=[...new Set(reference.flatMap(p=>Object.keys(p.properties)))].filter(k=>k!=="Record identity");
    const omitted=keys.filter(k=>numeric(k)&&rows.length&&rows.every(p=>p.properties[k]===undefined||p.properties[k]===null||p.properties[k]==="—"));
    const present=keys.filter(k=>!omitted.includes(k));
    const key=(primary[family]||[]).filter(k=>present.includes(k));
    const column=k=>({key:k,label:label(k),numeric:numeric(k),secondary:!key.includes(k)});
    let result=[];
    if(force)result.push({key:"$rating",label:"Published rating (kN)",secondary:false});
    if(!["Thimble","Accessories","Wire rope grip"].includes(family))result.push({key:"$grade",label:family==="Dead-end"?"Matching requirement":"Grade",secondary:false});
    if(["Turnbuckle","Rigging screw","Shackle"].includes(family))result.push({key:"$form",label:"Form / connection",secondary:false});
    result.push(...key.map(column));
    if(family==="Accessories"&&accessoryType!=="All constructions / end forms")result=result.filter(c=>c.key!=="Component type");
    if(family==="Dead-end"){
      const order=["Matching diameter (mm)","Strand construction","Colour code","$rating","$grade","Closed thimble code","Open thimble code"];
      result.sort((a,b)=>(order.indexOf(a.key)<0?order.length:order.indexOf(a.key))-(order.indexOf(b.key)<0?order.length:order.indexOf(b.key)));
    }
    result.push(...present.filter(k=>!key.includes(k)).map(column));
    result.push({key:"$evidence",label:"AU / mast evidence",secondary:true});
    return {columns:result,omitted,force};
  }
  function grade(p){
    if(p.family==="Dead-end")return {"Match specified SC/GZ":"Specified SC/GZ","Match specified wire rope":"Specified wire rope","Match specific strand rating; no grade equivalence assumed":"Exact strand rating"}[p.grade]||p.grade;
    return p.grade.replace(/^Grade ([LPS])$/,"$1").replace(" (wire tensile grade)","");
  }
  function rating(p,kn,fmt){
    if(p.fieldIssues?.some(i=>i.field==="WLL"))return {basis:"WLL",value:"Not verified",original:"",unavailable:true};
    if(kn===null||!p.rating)return {basis:p.rating?.type||"",value:"Not published",original:"",unavailable:true};
    const value=fmt(kn,2),same=p.rating.unit==="kN"&&Number(value)===Number(p.rating.value);
    return {basis:p.rating.type,value,original:same?"":`${p.rating.value} ${p.rating.unit}`,unavailable:false};
  }
  function width(c){
    const special={"$rating":124,"$grade":76,"$form":152,"$evidence":132,"Matching requirement":146,"Construction":88,"Strand construction":108,"Finish":142,"Material / finish":152,"Component type":142,"Data completeness":174,"Source exclusions":174,"Source rope construction":144,"Supplied assembly":142,"Source designation":110,"Grips per termination":108,"Lay":84,"Pin retention":140,"Fitting evidence":160};
    if(c.label==="Matching requirement")return 146;
    if(special[c.key])return special[c.key];
    if(/^Drawing /.test(c.label))return 70;
    if(/^Mass /.test(c.label))return 76;
    if(/^Zinc min\./.test(c.label))return 100;
    if(/thimble|sheave|insulator/.test(c.label)&&c.label.endsWith("code"))return 126;
    if(/Nominal wire/.test(c.label))return 110;
    if(c.numeric)return 94;
    return 128;
  }
  const api={columns,grade,rating,width,label};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  root.GuyCompactTable=api;
})(globalThis);
