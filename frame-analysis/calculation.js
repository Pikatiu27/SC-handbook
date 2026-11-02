/* FA-STIFFNESS-01 / FA-RECOVERY-01. kN, m, rad internally. Local x: i to j;
 * local y: 90 degrees CCW from x. No geometric stiffness or shear deformation. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FrameAnalysis=api;})(typeof window==='object'?window:globalThis,function(){
  'use strict';
  const defaults={span:6,height:3,E:200,leftBase:'fixed',rightBase:'fixed',
    left:{A:6000,I:8e7},beam:{A:6000,I:12e7},right:{A:6000,I:8e7},
    HLeft:20,HRight:0,PLeft:0,PRight:0,CLeft:0,CRight:0,q:10};
  const clone=o=>JSON.parse(JSON.stringify(o));
  const dot=(a,b)=>a.reduce((sum,v,i)=>sum+v*b[i],0);
  const matvec=(a,x)=>a.map(row=>dot(row,x));
  const zero=n=>Array.from({length:n},()=>Array(n).fill(0));
  function roots(a,lo,hi){
    // Degree <= 3: derivative partitioning plus bisection retains double roots.
    a=a.slice();const scale=Math.max(...a.map(Math.abs));if(!scale)return [];
    a=a.map(v=>v/scale);while(a.length>1&&a.at(-1)===0)a.pop();
    const evalAt=x=>a.reduceRight((sum,v)=>sum*x+v,0);
    if(a.length===1)return [];
    if(a.length===2){const x=-a[0]/a[1];return x>lo&&x<hi?[x]:[];}
    const breaks=[lo,...roots(a.slice(1).map((v,i)=>v*(i+1)),lo,hi),hi],out=[];
    for(const x of breaks.slice(1,-1))if(Math.abs(evalAt(x))<1e-12)out.push(x);
    for(let i=1;i<breaks.length;i++){
      let l=breaks[i-1],r=breaks[i],fl=evalAt(l),fr=evalAt(r);
      if(fl*fr>=0)continue;
      for(let k=0;k<65;k++){const m=(l+r)/2,fm=evalAt(m);if(m===l||m===r)break;if(fl*fm<=0){r=m;fr=fm;}else{l=m;fl=fm;}}
      out.push((l+r)/2);
    }
    return out.filter((x,i)=>out.findIndex(y=>Math.abs(y-x)<1e-11)===i);
  }
  function solve(K,F){
    const n=F.length,S=K.map((r,i)=>1/Math.sqrt(r[i]));
    if(S.some(v=>!Number.isFinite(v)))throw Error('Unrestrained or zero-stiffness degree of freedom.');
    const B=K.map((r,i)=>r.map((v,j)=>v*S[i]*S[j])),L=zero(n);let minPivot=1;
    for(let i=0;i<n;i++)for(let j=0;j<=i;j++){
      let v=B[i][j];for(let k=0;k<j;k++)v-=L[i][k]*L[j][k];
      if(i===j){minPivot=Math.min(minPivot,v);if(!(v>1e-8))throw Error('Unstable or numerically ill-conditioned model. Review geometry and stiffness.');L[i][j]=Math.sqrt(v);}else L[i][j]=v/L[j][j];
    }
    // A pivot alone does not bound the sensitivity of a highly mismatched frame.
    // Estimate the full diagonally-scaled infinity-norm condition number.
    const inverseRows=Array(n).fill(0);
    for(let col=0;col<n;col++){
      const y=Array(n).fill(0),x=Array(n).fill(0);
      for(let i=0;i<n;i++){let v=i===col?1:0;for(let j=0;j<i;j++)v-=L[i][j]*y[j];y[i]=v/L[i][i];}
      for(let i=n-1;i>=0;i--){let v=y[i];for(let j=i+1;j<n;j++)v-=L[j][i]*x[j];x[i]=v/L[i][i];inverseRows[i]+=Math.abs(x[i]);}
    }
    const scaledCondition=Math.max(...B.map(row=>row.reduce((sum,v)=>sum+Math.abs(v),0)))*Math.max(...inverseRows);
    if(!Number.isFinite(scaledCondition)||scaledCondition>1e8)throw Error('Numerically ill-conditioned model: stiffness contrast exceeds this demo’s precision boundary. Review member properties.');
    const forceScale=Math.max(...F.map(Math.abs))||1,b=F.map((v,i)=>v/forceScale*S[i]),y=Array(n).fill(0),x=Array(n).fill(0);
    for(let i=0;i<n;i++){let v=b[i];for(let j=0;j<i;j++)v-=L[i][j]*y[j];y[i]=v/L[i][i];}
    for(let i=n-1;i>=0;i--){let v=y[i];for(let j=i+1;j<n;j++)v-=L[j][i]*x[j];x[i]=v/L[i][i];}
    return {d:x.map((v,i)=>v*S[i]*forceScale),minPivot,scaledCondition};
  }
  function element(n1,n2,property,q=0){
    const dx=n2.x-n1.x,dy=n2.y-n1.y,L=Math.hypot(dx,dy),c=dx/L,s=dy/L,
      EA=property.E*property.A,EI=property.E*property.I*1e-6,
      a=EA/L,b=12*EI/L**3,g=6*EI/L**2,h=4*EI/L,j=2*EI/L,
      k=[[a,0,0,-a,0,0],[0,b,g,0,-b,g],[0,g,h,0,-g,j],[-a,0,0,a,0,0],[0,-b,-g,0,b,-g],[0,g,j,0,-g,h]],
      T=[[c,s,0,0,0,0],[-s,c,0,0,0,0],[0,0,1,0,0,0],[0,0,0,c,s,0],[0,0,0,-s,c,0],[0,0,0,0,0,1]],
      fe=[0,q*L/2,q*L*L/12,0,q*L/2,-q*L*L/12],kg=zero(6),fg=Array(6).fill(0);
    for(let i=0;i<6;i++)for(let j=0;j<6;j++){fg[i]+=T[j][i]*fe[j];for(let a=0;a<6;a++)for(let b=0;b<6;b++)kg[i][j]+=T[a][i]*k[a][b]*T[b][j];}
    return {L,c,s,EA,EI,k,T,fe,kg,fg,q};
  }
  function recover(e,d){
    const dl=matvec(e.T,d),p=matvec(e.k,dl).map((v,i)=>v-e.fe[i]);
    const at=x=>{
      if(!Number.isFinite(x)||x<0||x>e.L)throw Error('Member position must lie between i and j.');
      const N=-p[0],V=p[1]+e.q*x,M=-p[2]+p[1]*x+e.q*x*x/2,
        u=dl[0]+N*x/e.EA,
        v=dl[1]+dl[2]*x+(-p[2]*x*x/2+p[1]*x**3/6+e.q*x**4/24)/e.EI,
        theta=dl[2]+(-p[2]*x+p[1]*x*x/2+e.q*x**3/6)/e.EI;
      return {x,N,V,M,u,v,theta,ux:e.c*u-e.s*v,uy:e.s*u+e.c*v};
    };
    const candidates={N:[0,e.L],V:[0,e.L],M:[0,e.L],v:[0,e.L],theta:[0,e.L]};
    if(e.q!==0){const x=-p[1]/e.q;if(x>0&&x<e.L)candidates.M.push(x);}
    // Normalized member coordinate t avoids geometry-dependent root tolerances.
    candidates.v.push(...roots([dl[2],-p[2]*e.L/e.EI,p[1]*e.L**2/(2*e.EI),e.q*e.L**3/(6*e.EI)],0,1).map(t=>t*e.L));
    candidates.theta.push(...roots([-p[2],p[1]*e.L,e.q*e.L**2/2],0,1).map(t=>t*e.L));
    const extrema={};for(const [key,xs]of Object.entries(candidates)){const ps=xs.map(at);extrema[key]={min:ps.reduce((a,b)=>a[key]<b[key]?a:b),max:ps.reduce((a,b)=>a[key]>b[key]?a:b)};}
    return {...e,dl,p,at,extrema,samples:Array.from({length:49},(_,i)=>at(e.L*i/48))};
  }
  function calculate(raw){
    const input={...raw,left:{...raw?.left},beam:{...raw?.beam},right:{...raw?.right}},errors=[];
    function number(field,v,min,max){if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)errors.push({field,message:`${field}: enter a finite value from ${min} to ${max}.`});}
    number('span',input.span,.25,50);number('height',input.height,.25,50);number('E',input.E,1,500);
    if(input.span/input.height<.1||input.span/input.height>10)errors.push({field:'span',message:'Span / height must be between 0.1 and 10 for this bounded portal demo.'});
    for(const key of ['left','beam','right']){number(key+'A',input[key].A,1,1e8);number(key+'I',input[key].I,1e3,1e12);}
    for(const key of ['leftBase','rightBase'])if(!['fixed','pin'].includes(input[key]))errors.push({field:key,message:'Choose a fixed or pinned column base.'});
    for(const key of ['HLeft','HRight','PLeft','PRight','CLeft','CRight','q'])number(key,input[key],-1e6,1e6);
    if(errors.length)return {valid:false,input,errors};
    const nodes=[{id:'A',x:0,y:0},{id:'B',x:0,y:input.height},{id:'C',x:input.span,y:input.height},{id:'D',x:input.span,y:0}],
      members=[{id:'AB',name:'Left column',i:0,j:1,key:'left'},{id:'BC',name:'Beam',i:1,j:2,key:'beam'},{id:'DC',name:'Right column',i:3,j:2,key:'right'}],
      K=zero(12),F=Array(12).fill(0),fixed=[0,1,9,10];
    if(input.leftBase==='fixed')fixed.push(2);if(input.rightBase==='fixed')fixed.push(11);
    F[3]=input.HLeft;F[4]=-input.PLeft;F[5]=input.CLeft;F[6]=input.HRight;F[7]=-input.PRight;F[8]=input.CRight;
    const elements=members.map(m=>{
      const e=element(nodes[m.i],nodes[m.j],{...input[m.key],E:input.E},m.id==='BC'?-input.q:0),dofs=[m.i*3,m.i*3+1,m.i*3+2,m.j*3,m.j*3+1,m.j*3+2];
      for(let i=0;i<6;i++){F[dofs[i]]+=e.fg[i];for(let j=0;j<6;j++)K[dofs[i]][dofs[j]]+=e.kg[i][j];}
      return {...m,...e,dofs};
    });
    const free=Array.from({length:12},(_,i)=>i).filter(i=>!fixed.includes(i)),d=Array(12).fill(0);let solved;
    try{solved=solve(free.map(i=>free.map(j=>K[i][j])),free.map(i=>F[i]));free.forEach((v,i)=>d[v]=solved.d[i]);}catch(e){return {valid:false,input,errors:[{field:'model',message:e.message}]};}
    const residual=matvec(K,d).map((v,i)=>v-F[i]);
    // Normwise backward error in the same diagonally scaled free system used
    // by the solve. A separate denominator at an exact-zero response DOF can
    // otherwise turn roundoff into an O(1) false rejection under symmetric load.
    const scaledResidual=Math.max(...free.map(i=>Math.abs(residual[i])/Math.sqrt(K[i][i]))),
      scaledReference=Math.max(...free.map(i=>(Math.abs(F[i])+K[i].reduce((s,v,j)=>s+Math.abs(v*d[j]),0))/Math.sqrt(K[i][i]))),
      normalizedResidual=scaledReference?scaledResidual/scaledReference:scaledResidual;
    const recovered=elements.map(e=>({...recover(e,e.dofs.map(i=>d[i])),dofs:e.dofs,id:e.id,name:e.name,i:e.i,j:e.j})),
      reactions=[0,3].map(i=>({id:nodes[i].id,node:i,Fx:residual[3*i],Fy:residual[3*i+1],C:fixed.includes(3*i+2)?residual[3*i+2]:0})),
      resultNodes=nodes.map((n,i)=>({...n,ux:d[3*i],uy:d[3*i+1],theta:d[3*i+2]}));
    const all=[...d,...residual,...recovered.flatMap(e=>e.samples.flatMap(p=>[p.N,p.V,p.M,p.u,p.v,p.theta,p.ux,p.uy]))];
    if(all.some(v=>!Number.isFinite(v))||normalizedResidual>1e-7)return {valid:false,input,errors:[{field:'model',message:'Numerical verification failed. Review stiffness ratios and load magnitudes.'}]};
    const warnings=[];
    if(reactions.some(r=>r.Fy<-(Math.max(...reactions.map(r=>Math.abs(r.Fy)))||1)*1e-10))warnings.push('Uplift reaction: verify a hold-down load path at the affected base.');
    if(recovered.some(e=>Math.max(Math.abs(e.extrema.v.min.v),Math.abs(e.extrema.v.max.v))/e.L>.01)||resultNodes.some(n=>Math.hypot(n.ux,n.uy)/input.height>.01||Math.abs(n.theta)>.05))warnings.push('Large first-order displacement or rotation: review small-deformation applicability. This is not a code limit.');
    return {valid:true,input,nodes:resultNodes,members:recovered,reactions,errors:[],warnings,K,F,d,free,minPivot:solved.minPivot,scaledCondition:solved.scaledCondition,normalizedResidual};
  }
  return {defaults:()=>clone(defaults),calculate,roots,_verification:{element,recover,solve}};
});
