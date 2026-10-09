(function(root){
  "use strict";
  const data = typeof module !== "undefined" && module.exports ? require("./data.js") : root.BoltDimensionsData;
  const holeTypes = {standard:"Standard round",oversized:"Oversized round",short:"Short slot",long:"Long slot"};
  function hole(d,type="standard") {
    if(!data.structural.some(r=>r.d===d)||!Object.hasOwn(holeTypes,type)) return null;
    const ordinary=d<=24?d+2:d+3;
    if(type==="standard")return {type,width:ordinary,length:null,limit:d>24,label:d>24?"Standard hole · diameter limit":"Standard hole · nominal diameter",rule:d>24?"d + 3 maximum":"d + 2"};
    if(type==="oversized")return {type,width:Math.max(1.25*d,d+8),length:null,limit:true,label:"Oversized hole · diameter limit",rule:"max(1.25d, d + 8)"};
    return {type,width:ordinary,length:type==="short"?Math.max(1.33*d,d+10):2.5*d,limit:true,label:holeTypes[type]+" · width × total length limits",rule:type==="short"?"Width: ordinary hole limit; length: max(1.33d, d + 10)":"Width: ordinary hole limit; total length: 2.5d"};
  }
  // Keep the existing catalogue records by reference. Dimensional verification
  // belongs to the admitted dimension sheet, not to an inferred family match.
  function mergeCatalogue(catalogue={}) {
    const result={...data,other:{ubolts:[],blind:[]}};
    for(const type of ["ubolts","blind"]){
      const old=catalogue[type]||[],used=new Set();
      result[type]=data[type].map(row=>{
        const matches=old.filter(p=>p.manufacturer===row.manufacturer&&p.code===row.code&&(p.size||p.thread)===row.size);
        if(matches.length!==1)return {...row};
        used.add(matches[0]);return {...row,catalogue:matches[0]};
      });
      result.other[type]=old.filter(p=>!used.has(p)).map(p=>({
        id:p.id,code:p.code,manufacturer:p.manufacturer,family:p.family||p.series,
        size:p.size||p.thread,d:Number((p.size||p.thread||"").slice(1)),finish:p.finish,
        catalogue:p,dimensionStatus:"Existing catalogue · dimensions not rechecked"
      }));
    }
    return result;
  }
  const api={data,hole,holeTypes,mergeCatalogue};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;else root.BoltDimensions=api;
})(typeof globalThis!=="undefined"?globalThis:this);
