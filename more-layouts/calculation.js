'use strict';
(function(root,factory){const node=typeof module==='object'&&module.exports;
 const api=factory(node?require('./site/beam-internal-forces/calculation'):root.BeamInternalForces,node?require('./site/beam-deflection-preview/calculation'):root.BeamDeflection,node?require('./site/more-layouts/force-response'):root.BeamForceResponse);
 if(node)module.exports=api;else{root.BeamMoreLayouts=api;root.BeamInternalForces=api.forces;root.BeamDeflection=api.deflection;}
})(typeof globalThis!=='undefined'?globalThis:this,function(C,B,F){
 const types=Object.freeze({'propped-left':'Propped cantilever · fixed left','propped-right':'Propped cantilever · fixed right','fixed-fixed':'Fixed at both ends','continuous-two':'Continuous · 2 spans','continuous-three':'Continuous · 3 spans','continuous-overhang':'Continuous · with overhangs','continuous-fixed':'Continuous · fixed ends',gerber:'Gerber · internal hinge'});
 const isMore=type=>Object.hasOwn(types,type),ramp=(x,a,p)=>Math.max(0,x-a)**p;
 // Same declared-decimal minimum-spacing policy as the accepted six-layout owner.
 function spanAtLeast(start,end,length){const parts=value=>{const [m,e='0']=String(value).toLowerCase().split('e'),[w,f='']=m.split('.');return {c:BigInt(w+f),e:Number(e)-f.length};},a=parts(start),b=parts(end),limit=parts(length);limit.e-=3;const exponent=Math.min(a.e,b.e,limit.e),integer=v=>v.c*10n**BigInt(v.e-exponent);return integer(b)-integer(a)>=integer(limit);}
 function geometry(raw){const L=raw.length,a=raw.a,b=raw.b,c=raw.c;
  const layouts={'propped-left':[[0,true],[L,false]],'propped-right':[[0,false],[L,true]],'fixed-fixed':[[0,true],[L,true]],'continuous-two':[[0,false],[a,false],[L,false]],'continuous-three':[[0,false],[a,false],[b,false],[L,false]],'continuous-overhang':[[a,false],[b,false],[c,false]],'continuous-fixed':[[0,true],[a,false],[L,true]],gerber:[[0,false],[a,false],[L,false]]};
  return {supports:(layouts[raw.type]||[]).map(([x,fixed],i)=>({id:String.fromCharCode(65+i),x,fixed})),hinges:raw.type==='gerber'?[b]:[]};
 }
 function validate(raw){
  const errors=C.validate({...raw,type:'simple'});if(errors.length)return errors;
  if(!isMore(raw.type))return [{field:'type',message:'Select a supported More layout.'}];
  const {supports,hinges}=geometry(raw),L=raw.length,points=[0,...supports.map(s=>s.x),...hinges,L].sort((a,b)=>a-b),unique=[...new Set(points)];
  if(points.some(x=>!Number.isFinite(x)||x<0||x>L)||unique.some((x,i)=>i&&!spanAtLeast(unique[i-1],x,L)))errors.push({field:'supports',message:'Support, hinge and beam-end positions must be on the beam and separated by at least 0.1% of L.'});
  if(supports.some((s,i)=>i&&s.x<=supports[i-1].x)||['continuous-two','continuous-fixed','continuous-three'].includes(raw.type)&&!(raw.a>0&&raw.a<L)||raw.type==='continuous-overhang'&&!(raw.a>0&&raw.c<L)||raw.type==='gerber'&&!(0<raw.a&&raw.a<raw.b&&raw.b<L))errors.push({field:'supports',message:'Enter ordered supports; keep interior supports and the Gerber hinge strictly inside the beam. Gerber requires 0 < B < hinge < L.'});
  if(raw.type==='continuous-three'&&!(raw.a<raw.b&&raw.b<L))errors.push({field:'supports',message:'Interior supports must satisfy 0 < B < C < L.'});
  if(hinges.some(h=>supports.some(s=>s.x===h)))errors.push({field:'supports',message:'This template does not permit a hinge coincident with a support.'});
  if(raw.loads.some(l=>l.type==='moment'&&l.p!==0&&hinges.includes(l.start)))errors.push({field:'loads',message:'An applied couple exactly at the internal hinge needs a member-side assignment. Move it off the hinge; this demo does not assign hinge couples.'});
  const stiffness=B.calculate(C.calculate({...raw,type:'simple'}),{E:raw.E??200,I:raw.I??8e7});if(!stiffness.valid)errors.push(...stiffness.errors);
  return errors;
 }
 // Exact scaled partial-pivot elimination; residual checked in the original system.
 function solve(A,b){const n=b.length,col=Array.from({length:n},(_,j)=>Math.max(...A.map(row=>Math.abs(row[j]))));if(col.some(v=>!v))throw Error('Mechanism or redundant constraint.');
  const m=A.map((row,i)=>{const a=row.map((v,j)=>v/col[j]),s=Math.max(...a.map(Math.abs));if(!s)throw Error('Empty compatibility equation.');return [...a.map(v=>v/s),b[i]/s];});
  for(let k=0;k<n;k++){let pivot=k;for(let i=k+1;i<n;i++)if(Math.abs(m[i][k])>Math.abs(m[pivot][k]))pivot=i;if(Math.abs(m[pivot][k])<1e-11)throw Error('Support geometry is too ill-conditioned for this demo.');[m[k],m[pivot]]=[m[pivot],m[k]];for(let i=k+1;i<n;i++){const f=m[i][k]/m[k][k];m[i][k]=0;for(let j=k+1;j<=n;j++)m[i][j]-=f*m[k][j];}}
  const u=Array(n).fill(0);for(let i=n-1;i>=0;i--){let v=m[i][n];for(let j=i+1;j<n;j++)v-=m[i][j]*u[j];u[i]=v/m[i][i];}const x=u.map((v,i)=>v/col[i]);
  const residual=Math.max(...A.map((row,i)=>Math.abs(row.reduce((s,v,j)=>s+v*x[j],0)-b[i])/(1+Math.abs(b[i])+row.reduce((s,v,j)=>s+Math.abs(v*x[j]),0))));
  if(!x.every(Number.isFinite)||residual>1e-10)throw Error('Compatibility residual exceeds the supported numerical accuracy.');return {x,residual};
 }
 function calculate(raw){if(!isMore(raw.type))return C.calculate(raw);const errors=validate(raw);if(errors.length)return {valid:false,errors};
  try{const input={...raw,loads:raw.loads.map(l=>({...l}))},L=raw.length,{supports,hinges}=geometry(raw);
   // An action on a restrained DOF is balanced locally by its support and
   // produces no curvature. Solve only the remaining bending actions, then add
   // these exact reactions. This is algebraic superposition, not rounding small
   // reactions away: even a tiny real off-support action remains in the solve.
   const directLoads=[],bendingLoads=raw.loads.filter(l=>{const s=supports.find(s=>s.x===l.start&&(l.type==='point'||l.type==='moment'&&s.fixed));if(!s)return true;directLoads.push({id:l.id,support:s.id,force:l.type==='point'?l.p:0,couple:l.type==='moment'?-l.p:0});return false;});
   // Locally balanced actions must not determine the scale of the remaining
   // bending system: a large direct support action can otherwise push a small
   // real flexural load into subnormal normalized arithmetic.
   const mags=bendingLoads.flatMap(l=>['point','moment'].includes(l.type)?[Math.abs(l.p)/(l.type==='moment'?L:1)]:[Math.abs(l.q0)*L,Math.abs(l.q1)*L]),scale=Math.max(0,...mags)||1;
   const terms=[],distributed=[];for(const l of bendingLoads){const a=l.start/L;if(l.type==='point')terms.push({a,p:1,v:-l.p/scale});else if(l.type==='moment')terms.push({a,p:0,v:-l.p/(scale*L)});else distributed.push({a,end:l.end/L,q0:l.q0*L/scale,q1:l.q1*L/scale});}
   const unknowns=supports.flatMap(s=>[{kind:'R',a:s.x/L,s},...(s.fixed?[{kind:'C',a:s.x/L,s}]:[])]);unknowns.push({kind:'w0'},{kind:'s0'},...hinges.map(h=>({kind:'jump',a:h/L})));
   const contribution=(term,t,key,side='right')=>{const u=t-term.a,included=u>0||u===0&&side==='right';if(!included)return 0;const {p,v}=term;if(key==='M')return v*(p?u**p:1);if(key==='theta')return -v*u**(p+1)/(p+1);return -v*u**(p+2)/((p+1)*(p+2));};
   const coefficient=(u,t,key,side)=>u.kind==='R'?contribution({a:u.a,p:1,v:1},t,key,side):u.kind==='C'?contribution({a:u.a,p:0,v:-1},t,key,side):key==='M'?0:u.kind==='w0'?(key==='delta'?1:0):u.kind==='s0'?(key==='delta'?t:1):key==='delta'?ramp(t,u.a,1):(t>u.a||t===u.a&&side!=='left'?1:0);
   // Integrate the clipped local load interval, avoiding cancellation of large
   // start/end singularity powers for a very short partial linear load. Three
   // Gauss points integrate these degree <=4 kernels exactly (not plot samples).
   const loadAt=(t,key,side)=>terms.reduce((s,v)=>s+contribution(v,t,key,side),0)+distributed.reduce((sum,l)=>{const u=Math.max(0,Math.min(t-l.a,l.end-l.a));if(!u)return sum;let v=0;for(const [g,w]of [[-Math.sqrt(3/5),5/9],[0,8/9],[Math.sqrt(3/5),5/9]]){const z=u*(1+g)/2,d=t-l.a-z,q=l.q0+(l.q1-l.q0)*(z/(l.end-l.a));v+=w*q*(key==='M'?-d:key==='theta'?d*d/2:d*d*d/6);}return sum+u*v/2;},0),A=[],rhs=[],equations=[];
   function add(name,row,value){A.push(row);rhs.push(value);equations.push(name);}
   const totals=bendingLoads.map(C.resultant).reduce((s,r)=>({force:s.force+r.force,firstMoment:s.firstMoment+r.firstMoment,couple:s.couple+r.couple}),{force:0,firstMoment:0,couple:0});
   add('Vertical equilibrium'+(directLoads.length?' · remaining actions':''),unknowns.map(u=>u.kind==='R'?1:0),totals.force/scale);add('Moment equilibrium'+(directLoads.length?' · remaining actions':''),unknowns.map(u=>u.kind==='R'?u.a:u.kind==='C'?1:0),(totals.firstMoment-totals.couple)/(scale*L));
   for(const s of supports)for(const key of s.fixed?['delta','theta']:['delta'])add(`${key}(${s.id}) = 0`,unknowns.map(u=>coefficient(u,s.x/L,key,'right')),-loadAt(s.x/L,key,'right'));
   for(const h of hinges)add('M(hinge) = 0',unknowns.map(u=>coefficient(u,h/L,'M','left')),-loadAt(h/L,'M','left'));
   const solved=solve(A,rhs);unknowns.forEach((u,i)=>{if(u.kind==='R')u.s.force=solved.x[i]*scale;if(u.kind==='C')u.s.couple=solved.x[i]*scale*L;});supports.forEach(s=>s.couple??=0);
   // Recover net internal forces from bending actions before adding directly
   // balanced support actions. Avoid subtracting a large locally balanced pair
   // to discover a small, real flexural action on the rest of the beam.
   const response=F.calculate({...raw,type:'simple',loads:bendingLoads},supports);if(!response.valid)return response;
   for(const l of directLoads){const s=supports.find(s=>s.id===l.support);s.force+=l.force;s.couple+=l.couple;}
   response.input=input;response.hinges=hinges;response.reactions=supports;
   response.totals=raw.loads.map(C.resultant).reduce((s,r)=>({force:s.force+r.force,firstMoment:s.firstMoment+r.firstMoment,couple:s.couple+r.couple}),{force:0,firstMoment:0,couple:0});
   response.checks={forceResidual:supports.reduce((s,r)=>s+r.force,0)-response.totals.force,momentResidual:supports.reduce((s,r)=>s+r.force*r.x+r.couple,0)-response.totals.firstMoment+response.totals.couple,endClosure:response.at(L,'right')};
   response.events=[...new Set([...response.events,...hinges])].sort((a,b)=>a-b);
   // Include hinge in curve events even though V/M remain continuous there.
   const atNormalized=(t,key,side='right')=>loadAt(t,key,side)+unknowns.reduce((s,u,i)=>s+solved.x[i]*coefficient(u,t,key,side),0);
   response.moreLayouts={scale,directLoads,unknowns:unknowns.map((u,i)=>({kind:u.kind,a:u.a,value:solved.x[i]})),matrix:A,rhs,solution:solved.x,equations,residual:solved.residual,atNormalized};
   return response;
  }catch(e){return {valid:false,errors:[{field:'supports',message:e.message}]};}
 }
 const evaluate=(c,t)=>c.reduceRight((v,a)=>v*t+a,0);
 function deformation(forces,stiffness=B.defaults){if(!forces?.moreLayouts)return B.calculate(forces,stiffness);
  const check=B.calculate(C.calculate({...forces.input,type:'simple'}),stiffness);if(!check.valid)return check;
  const L=forces.input.length,EI=stiffness.E*stiffness.I*1e-6,owner=forces.moreLayouts,kD=owner.scale*L**3/EI,kT=owner.scale*L**2/EI,segments=[];
  for(let i=0;i<forces.events.length-1;i++){const start=forces.events[i],end=forces.events[i+1],h=end-start,mid=(start+end)/2,loads=forces.input.loads.filter(l=>['udl','linear'].includes(l.type)&&mid>l.start&&mid<l.end),q=loads.reduce((s,l)=>s+l.q0+(l.q1-l.q0)*(start-l.start)/(l.end-l.start),0),k=loads.reduce((s,l)=>s+(l.q1-l.q0)/(l.end-l.start),0),p=forces.at(start,'right'),M=[p.M,p.V*h,-q*h*h/2,-k*h**3/6],theta0=owner.atNormalized(start/L,'theta','right')*kT,delta0=owner.atNormalized(start/L,'delta','right')*kD;
   segments.push({start,end,h,M,theta:[theta0,...M.map((v,j)=>-h*v/EI/(j+1))],delta:[delta0,theta0*h,...M.map((v,j)=>-h*h*v/EI/((j+1)*(j+2)))]});}
  function at(x,side='right'){if(!Number.isFinite(x)||x<0||x>L)return null;const s=segments.find(s=>(x>s.start||x===s.start&&side==='right')&&(x<s.end||x===s.end&&side==='left'))||(x===0?segments[0]:segments.at(-1)),t=(x-s.start)/s.h;return {x,side,theta:evaluate(s.theta,t),delta:evaluate(s.delta,t)};}
  const candidates=forces.events.flatMap(x=>[at(x,'left'),at(x,'right')]),zeroRotation=[],zeroMoment=[];
  for(const s of segments)for(const [poly,list]of [[s.theta,zeroRotation],[s.M,zeroMoment]])for(const t of B.roots01(poly)){const x=t<=0?s.start:t>=1?s.end:Math.max(s.start,Math.min(s.end,s.start+t*s.h));candidates.push(at(x,x===s.end?'left':'right'));list.push(x);}
  const extrema={};for(const key of ['delta','theta']){const min=candidates.reduce((a,b)=>a[key]<=b[key]?a:b),max=candidates.reduce((a,b)=>a[key]>=b[key]?a:b);extrema[key]={min,max,absolute:Math.abs(min[key])>=Math.abs(max[key])?min:max};}
  const samples=segments.flatMap(s=>Array.from({length:25},(_,i)=>at(i===24?s.end:i===0?s.start:s.start+s.h*i/24,i===24?'left':'right'))),boundary=forces.reactions.map(s=>({x:s.x,delta:at(s.x).delta,...s.fixed?{theta:at(s.x).theta}:{}})),hingeChecks=forces.hinges.map(x=>({x,M:forces.at(x).M,deltaJump:at(x).delta-at(x,'left').delta,thetaLeft:at(x,'left').theta,thetaRight:at(x).theta})),ratio=Math.abs(extrema.delta.absolute.delta)/L,warnings=[];
  if([...samples,...candidates].some(p=>!Number.isFinite(p.delta)||!Number.isFinite(p.theta)))return {valid:false,errors:[{field:'stiffness',message:'Response exceeds the supported numerical range.'}]};
  if(ratio>.01||Math.abs(extrema.theta.absolute.theta)>.05)warnings.push('Review required: |δ|max / L > 1/100 or |θ|max > 0.05 rad. Linear extrapolation; verify small-deformation applicability. These are demo review triggers, not code limits.');
  return {valid:true,input:{...stiffness},EI,length:L,segments,at,extrema,samples,zeroRotation,zeroMoment,boundary,hingeChecks,constants:{c1:owner.atNormalized(0,'theta')*kT,c2:owner.atNormalized(0,'delta')*kD},warnings,ratio,moreLayouts:true};
 }
 return Object.freeze({types,geometry,validate,calculate,deformation,solve,forces:Object.freeze({...C,types:Object.freeze({...C.types,...types}),supports:raw=>isMore(raw.type)?geometry(raw).supports:C.supports(raw),validate:raw=>isMore(raw.type)?validate(raw):C.validate(raw),calculate}),deflection:Object.freeze({...B,calculate:deformation})});
});
