"use strict";
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.BeamDeflection=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const defaults=Object.freeze({E:200,I:80000000}); // GPa, mm^4; illustrative project inputs.
  const evaluate=(c,t)=>c.reduceRight((v,a)=>v*t+a,0);
  const derivative=c=>c.slice(1).map((a,i)=>a*(i+1));
  // Generated stations own exact event endpoints. Arithmetic such as start+h
  // may round one ULP beyond end; public/user coordinates remain strict.
  const station=(s,t)=>t<=0?s.start:t>=1?s.end:Math.max(s.start,Math.min(s.end,s.start+s.h*t));
  // Isolate every real root on a normalized segment using derivative roots.
  // Each subinterval is monotone; repeated roots are tested at stationary points.
  function roots01(coefficients){
    const scale=Math.max(...coefficients.map(Math.abs));if(!scale)return [];
    const c=coefficients.map(v=>v/scale);while(c.length>1&&Math.abs(c.at(-1))<1e-14)c.pop();
    if(c.length===1)return [];
    if(c.length===2){const t=-c[0]/c[1];return t>=0&&t<=1?[t]:[];}
    const partitions=[0,...roots01(derivative(c)).filter(t=>t>0&&t<1),1],roots=[];
    for(const t of partitions)if(Math.abs(evaluate(c,t))<2e-13)roots.push(t);
    for(let i=0;i<partitions.length-1;i++){
      let lo=partitions[i],hi=partitions[i+1],f=evaluate(c,lo),g=evaluate(c,hi);
      if(f===0||g===0||Math.sign(f)===Math.sign(g))continue;
      for(let j=0;j<64;j++){const mid=(lo+hi)/2,v=evaluate(c,mid);if(v===0){lo=hi=mid;break;}if(Math.sign(v)===Math.sign(f)){lo=mid;f=v;}else hi=mid;}
      roots.push((lo+hi)/2);
    }
    return roots.sort((a,b)=>a-b).filter((v,i,a)=>!i||v-a[i-1]>1e-10);
  }
  function calculate(forces,stiffness=defaults){
    const errors=[];
    if(!forces?.valid)return {valid:false,errors:[{field:'model',message:'Complete the beam and load inputs first.'}]};
    if(!Number.isFinite(stiffness.E)||stiffness.E<.001||stiffness.E>1000)errors.push({field:'E',message:'Enter E between 0.001 and 1,000 GPa.'});
    if(!Number.isFinite(stiffness.I)||stiffness.I<1||stiffness.I>1e15)errors.push({field:'I',message:'Enter I between 1 and 10¹⁵ mm⁴ for the bending axis.'});
    if(errors.length)return {valid:false,errors};
    const {E,I}=stiffness,EI=E*I*1e-6,L=forces.input.length,segments=[];
    let theta=0,delta=0;
    for(let i=0;i<forces.events.length-1;i++){
      const start=forces.events[i],end=forces.events[i+1],h=end-start,mid=(start+end)/2;
      const active=forces.input.loads.filter(l=>['udl','linear'].includes(l.type)&&mid>l.start&&mid<l.end);
      const q=active.reduce((s,l)=>s+l.q0+(l.q1-l.q0)*(start-l.start)/(l.end-l.start),0);
      const k=active.reduce((s,l)=>s+(l.q1-l.q0)/(l.end-l.start),0),r=forces.at(start,'right');
      const M=[r.M,r.V*h,-q*h*h/2,-k*h*h*h/6];
      const tc=[theta,...M.map((v,j)=>-h*v/EI/(j+1))];
      const dc=[delta,theta*h,...M.map((v,j)=>-h*h*v/EI/((j+1)*(j+2)))];
      segments.push({start,end,h,M,theta:tc,delta:dc});theta=evaluate(tc,1);delta=evaluate(dc,1);
    }
    const segmentAt=x=>segments.find(s=>x>=s.start&&x<s.end)||segments.at(-1);
    const raw=x=>{const s=segmentAt(x),t=(x-s.start)/s.h;return {theta:evaluate(s.theta,t),delta:evaluate(s.delta,t)};};
    const supports=forces.reactions,a=supports[0].x;
    const c1=supports.length===1?-raw(a).theta:-(raw(supports[1].x).delta-raw(a).delta)/(supports[1].x-a);
    const c2=-raw(a).delta-c1*a;
    for(const s of segments){s.theta[0]+=c1;s.delta[0]+=c1*s.start+c2;s.delta[1]+=c1*s.h;}
    function at(x){
      if(!Number.isFinite(x)||x<0||x>L)return null;
      const s=segmentAt(x),t=(x-s.start)/s.h;
      return {x,delta:evaluate(s.delta,t),theta:evaluate(s.theta,t)};
    }
    const candidates=forces.events.map(at),zeroRotation=[],zeroMoment=[];
    for(const s of segments){
      for(const t of roots01(s.theta)){const x=station(s,t);candidates.push(at(x));zeroRotation.push(x);}
      for(const t of roots01(s.M)){const x=station(s,t);candidates.push(at(x));zeroMoment.push(x);}
    }
    const extrema={};
    for(const key of ['delta','theta']){
      const min=candidates.reduce((a,b)=>a[key]<=b[key]?a:b),max=candidates.reduce((a,b)=>a[key]>=b[key]?a:b);
      extrema[key]={min,max,absolute:Math.abs(min[key])>=Math.abs(max[key])?min:max};
    }
    const samples=segments.flatMap(s=>Array.from({length:25},(_,i)=>at(station(s,i/24))));
    const boundary=supports.map(s=>({x:s.x,delta:at(s.x).delta,...(s.fixed?{theta:at(s.x).theta}:{})}));
    if([...samples,...candidates].some(s=>!Number.isFinite(s.delta)||!Number.isFinite(s.theta)))return {valid:false,errors:[{field:'stiffness',message:'Response exceeds the numerical range.'}]};
    const ratio=Math.abs(extrema.delta.absolute.delta)/L,rotation=Math.abs(extrema.theta.absolute.theta);
    const warnings=[];
    if(ratio>.01||rotation>.05)warnings.push('Review required: |δ|max / L > 1/100 or |θ|max > 0.05 rad. Linear response is shown; verify small-deformation applicability. These are demo review triggers, not code limits.');
    return {valid:true,input:{E,I},EI,length:L,segments,at,extrema,samples,zeroRotation,zeroMoment,boundary,constants:{c1,c2},warnings,ratio};
  }
  return Object.freeze({defaults,calculate,roots01});
});
