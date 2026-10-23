"use strict";
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;root.BeamForceResponse=api;})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const types=Object.freeze({simple:"Simply supported", "cantilever-left":"Cantilever · fixed left", "cantilever-right":"Cantilever · fixed right", "overhang-left":"Left overhang", "overhang-right":"Right overhang", "overhang-both":"Both-end overhangs"});
  const defaults=Object.freeze({type:"simple",length:6,a:0,b:6,loads:[{id:"L1",type:"point",start:2,p:10},{id:"L2",type:"udl",start:0,end:6,q0:2,q1:2}]});
  const finite=Number.isFinite,clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  // Compare the declared canonical decimal values without a subtraction or an
  // epsilon band. HTML Number inputs are already parsed to these Number values.
  function spanAtLeast(start,end,length,power){
    const parts=value=>{const [mantissa,exponent="0"]=String(value).toLowerCase().split("e"),[whole,fraction=""]=mantissa.split(".");return {coefficient:BigInt(whole+fraction),exponent:Number(exponent)-fraction.length};};
    const a=parts(start),b=parts(end),limit=parts(length);limit.exponent+=power;
    const exponent=Math.min(a.exponent,b.exponent,limit.exponent),integer=v=>v.coefficient*10n**BigInt(v.exponent-exponent);
    return integer(b)-integer(a)>=integer(limit);
  }
  function supports(input){
    const L=input.length;
    if(input.type==="cantilever-left")return [{id:"A",x:0,fixed:true}];
    if(input.type==="cantilever-right")return [{id:"A",x:L,fixed:true}];
    return [{id:"A",x:input.type==="simple"||input.type==="overhang-right"?0:input.a,fixed:false},{id:"B",x:input.type==="simple"||input.type==="overhang-left"?L:input.b,fixed:false}];
  }
  function validate(input){
    const errors=[];
    if(!Object.hasOwn(types,input.type))errors.push({field:"type",message:"Select a supported beam arrangement."});
    if(!finite(input.length)||input.length<0.1||input.length>100)errors.push({field:"length",message:"Beam length must be 0.1–100 m."});
    if(errors.length)return errors;
    const s=supports(input),L=input.length;
    if(s.length===2){
      if(s.some(r=>!finite(r.x)||r.x<0||r.x>L)||!spanAtLeast(s[0].x,s[1].x,L,-3))errors.push({field:"supports",message:"Supports must lie on the beam, with spacing at least 0.1% of its length."});
      if(input.type.includes("overhang")&&((input.type!=="overhang-right"&&!(input.a>0))||(input.type!=="overhang-left"&&!(input.b<L))))errors.push({field:"supports",message:"The selected overhang must have a positive length."});
    }
    if(!Array.isArray(input.loads)||input.loads.length>24){errors.push({field:"loads",message:"Use at most 24 loads."});return errors;}
    const ids=new Set();
    input.loads.forEach((load,index)=>{
      const fail=message=>errors.push({field:"load:"+load.id,message:`Load ${index+1}: ${message}`});
      if(!load.id||ids.has(load.id))fail("load identifiers must be unique.");ids.add(load.id);
      if(!["point","moment","udl","linear"].includes(load.type)){fail("select a supported load type.");return;}
      if(!finite(load.start)||load.start<0||load.start>L)fail("position must lie between 0 and L.");
      if(["point","moment"].includes(load.type)){
        if(!finite(load.p)||Math.abs(load.p)>1e6)fail("enter a finite magnitude between −1,000,000 and +1,000,000.");
      }else{
        if(!finite(load.end)||load.end>L||!(load.end>load.start)||!spanAtLeast(load.start,load.end,L,-6))fail("distributed-load end must follow its start and lie on the beam, with length at least 0.0001% of L.");
        if(!finite(load.q0)||Math.abs(load.q0)>1e6||!finite(load.q1)||Math.abs(load.q1)>1e6)fail("enter finite intensities between −1,000,000 and +1,000,000 kN/m.");
        if(load.type==="udl"&&load.q0!==load.q1)fail("uniform-load end intensities must match.");
      }
    });
    if(!errors.length){
      // Below the normal IEEE754 range, force/moment arithmetic can discard
      // nonzero reactions or violate equilibrium while still remaining finite.
      // This is an explicit numerical support bound, not an engineering limit.
      const normalMinimum=2**-1022;
      const activeLoads=input.loads.filter(load=>["point","moment"].includes(load.type)?load.p!==0:load.q0!==0||load.q1!==0);
      const activePositions=[...new Set([0,L,...s.map(support=>support.x),...activeLoads.flatMap(load=>[load.start,...(["udl","linear"].includes(load.type)?[load.end]:[])])])];
      input.loads.forEach(load=>{
        let magnitude,components,forceMagnitude,origins;
        if(load.type==="point"){magnitude=Math.abs(load.p);components=[magnitude,magnitude*L];forceMagnitude=magnitude;origins=[load.start];}
        else if(load.type==="moment"){magnitude=Math.abs(load.p);components=[magnitude,magnitude/L];}
        else{magnitude=Math.max(Math.abs(load.q0),Math.abs(load.q1));const d=load.end-load.start;forceMagnitude=magnitude*d;components=[forceMagnitude,magnitude*d*d];origins=[load.start,load.end];}
        // Retain first moments at each entered event/support, including near-end
        // point actions. Whole-beam P*L alone does not bound a tiny nonzero P*x.
        if(forceMagnitude>0)for(const origin of origins)for(const position of activePositions){const lever=Math.abs(position-origin);if(lever>0)components.push(forceMagnitude*lever);}
        if(magnitude!==0&&components.some(value=>value===0||value<normalMinimum))errors.push({field:"load:"+load.id,message:"Action magnitudes are below the supported numerical range: nonzero characteristic force and moment components, including event/support lever-arm products, must be at least 2^-1022."});
      });
    }
    return errors;
  }
  // Exact force and first moment of a linear intensity, including sign changes.
  function resultant(load){
    if(load.type==="point")return {force:load.p,firstMoment:load.p*load.start,couple:0};
    if(load.type==="moment")return {force:0,firstMoment:0,couple:load.p};
    const d=load.end-load.start,W=d*(load.q0+load.q1)/2;
    return {force:W,firstMoment:load.start*W+d*d*(load.q0+2*load.q1)/6,couple:0};
  }
  function calculate(raw,prescribedReactions){
    const errors=validate(raw);if(errors.length)return {valid:false,errors};
    const input={...raw,loads:raw.loads.map(l=>({...l}))},L=input.length;
    const totals=input.loads.map(resultant).reduce((s,r)=>({force:s.force+r.force,firstMoment:s.firstMoment+r.firstMoment,couple:s.couple+r.couple}),{force:0,firstMoment:0,couple:0});
    const reactions=prescribedReactions?prescribedReactions.map(r=>({...r})):supports(input);
    if(!prescribedReactions&&reactions.length===1){const r=reactions[0];r.force=totals.force;r.couple=totals.firstMoment-totals.couple-totals.force*r.x;}
    else if(!prescribedReactions){const [a,b]=reactions;b.force=(totals.firstMoment-totals.couple-totals.force*a.x)/(b.x-a.x);a.force=totals.force-b.force;a.couple=b.couple=0;}
    const events=[...new Set([0,L,...reactions.map(r=>r.x),...input.loads.flatMap(l=>[l.start,...(["udl","linear"].includes(l.type)?[l.end]:[])])])].sort((a,b)=>a-b);
    // No epsilon-wide jump zone: a side applies only at the exact event coordinate.
    const included=(station,at,side)=>station>at||(station===at&&side==="right");
    function at(station,side="right"){
      let V=0,M=0;
      for(const r of reactions)if(included(station,r.x,side)){V+=r.force;M+=r.force*(station-r.x)-r.couple;}
      for(const l of input.loads){
        if(l.type==="point"){if(included(station,l.start,side)){V-=l.p;M-=l.p*(station-l.start);}}
        else if(l.type==="moment"){if(included(station,l.start,side))M-=l.p;}
        else{const u=clamp(station-l.start,0,l.end-l.start),k=(l.q1-l.q0)/(l.end-l.start),W=l.q0*u+k*u*u/2;
          V-=W;M-=(station-l.start)*W-l.q0*u*u/2-k*u*u*u/3;}
      }return {x:station,side,V,M};
    }
    function intensity(station){return input.loads.filter(l=>["udl","linear"].includes(l.type)&&station>=l.start&&station<=l.end).reduce((sum,l)=>sum+l.q0+(l.q1-l.q0)*(station-l.start)/(l.end-l.start),0);}
    function roots(A,B,C,span){
      const scale=Math.max(Math.abs(A)*span*span,Math.abs(B)*span,Math.abs(C));
      if(scale===0)return [];
      // Solve in dimensionless u/span and normalize before squaring. Otherwise
      // the discriminant underflows for valid small loads, losing real extrema.
      const a=A*span*span/scale,b=B*span/scale,c=C/scale;
      if(Math.abs(a)<1e-13)return Math.abs(b)<1e-13?[]:[-c/b*span];
      const D=b*b-4*a*c;if(D<0)return [];
      const q=-.5*(b+(b>=0?1:-1)*Math.sqrt(D));return (q===0?[-b/(2*a)]:[q/a,c/q]).map(v=>v*span);
    }
    const candidates=events.flatMap(e=>[at(e,"left"),at(e,"right")]).filter(r=>!(r.x===0&&r.side==="left")&&!(r.x===L&&r.side==="right"));
    const zeroShear=[];
    for(let i=0;i<events.length-1;i++){
      const start=events[i],end=events[i+1],span=end-start,mid=(start+end)/2;
      const active=input.loads.filter(l=>["udl","linear"].includes(l.type)&&mid>l.start&&mid<l.end);
      const k=active.reduce((s,l)=>s+(l.q1-l.q0)/(l.end-l.start),0),q=active.reduce((s,l)=>s+l.q0+(l.q1-l.q0)*(start-l.start)/(l.end-l.start),0);
      for(const u of roots(-k/2,-q,at(start,"right").V,span))if(u>0&&u<span){const station=start+u;if(station>start&&station<end){candidates.push(at(station));zeroShear.push(station);}}
      if(k!==0){const u=-q/k;if(u>0&&u<span)candidates.push(at(start+u));}
    }
    const extrema={};
    for(const key of ["V","M"]){extrema[key]={min:candidates.reduce((a,b)=>a[key]<b[key]?a:b),max:candidates.reduce((a,b)=>a[key]>b[key]?a:b)};}
    const samples=[];
    for(let i=0;i<events.length;i++){
      const e=events[i];if(i>0)samples.push(at(e,"left"));
      if(i<events.length-1){samples.push(at(e,"right"));for(let j=1;j<20;j++)samples.push(at(e+(events[i+1]-e)*j/20));}
    }
    const forceResidual=reactions.reduce((s,r)=>s+r.force,0)-totals.force,momentResidual=reactions.reduce((s,r)=>s+r.force*r.x+r.couple,0)-totals.firstMoment+totals.couple;
    const checks={forceResidual,momentResidual,endClosure:at(L,"right")};
    const all=[...samples,...candidates,...reactions.flatMap(r=>[r.force,r.couple])];
    if(all.some(v=>typeof v==="number"?!finite(v):!finite(v.V)||!finite(v.M)))return {valid:false,errors:[{field:"loads",message:"Input magnitudes exceed the numerical range."}]};
    return {valid:true,input,reactions,totals,events,extrema,zeroShear:[...new Set(zeroShear)],samples,checks,at,intensity};
  }
  return Object.freeze({types,defaults,supports,validate,resultant,calculate});
});
