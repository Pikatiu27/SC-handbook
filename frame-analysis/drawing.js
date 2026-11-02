(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./calculation'):root.FrameAnalysis);if(typeof module==='object'&&module.exports)module.exports=api;else root.FrameDrawing=api;})(typeof window==='object'?window:globalThis,function(C){
  'use strict';
  const n=v=>Number(v.toFixed(6)),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function fmt(v){if(!Number.isFinite(v))return '—';if(v===0)return '0.00';if(Math.abs(v)<.005||Math.abs(v)>=1e6)return v.toExponential(2).replace('e+','e').replaceAll('-','−');return v.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2}).replace('-','−');}
  const units={N:'kN',V:'kN',M:'kN·m',v:'mm',theta:'mrad',ux:'mm',uy:'mm',U:'mm'},names={N:'Axial force N',V:'Shear force V',M:'Bending moment M',v:'Local displacement v',theta:'Rotation θ',ux:'Global displacement uₓ',uy:'Global displacement uᵧ',U:'Total displacement |u|'};
  const factor=key=>['v','theta','ux','uy','U'].includes(key)?1000:1;
  const precisionCache=new WeakMap();
  function resolved(r,key,value){
    if(!r?.valid)return value;let floors=precisionCache.get(r);if(!floors){const L=Math.max(r.input.span,r.input.height),force=Math.max(Math.abs(r.input.q)*r.input.span,...['HLeft','HRight','PLeft','PRight'].map(k=>Math.abs(r.input[k])),Math.abs(r.input.CLeft)/L,Math.abs(r.input.CRight)/L),bound=Math.max(...r.members.map(e=>Math.hypot(Math.max(Math.abs(e.dl[0]),Math.abs(e.dl[3])),Math.max(Math.abs(e.extrema.v.min.v),Math.abs(e.extrema.v.max.v))))),angle=Math.max(bound/L,...r.members.flatMap(e=>[Math.abs(e.extrema.theta.min.theta),Math.abs(e.extrema.theta.max.theta)]));floors={N:force*1e-12,V:force*1e-12,M:force*L*1e-12,v:bound*1e-9,ux:bound*1e-9,uy:bound*1e-9,U:bound*1e-9,theta:angle*1e-9};precisionCache.set(r,floors);}return Math.abs(value)<=floors[key]?0:value;
  }
  const line=(a,b,cls='secondary',extra='')=>`<line x1="${n(a.x)}" y1="${n(a.y)}" x2="${n(b.x)}" y2="${n(b.y)}" class="engineering-drawing__${cls}" ${extra}/>`;
  const text=(x,y,value)=>`<text x="${n(x)}" y="${n(y)}" class="engineering-drawing__text">${esc(value)}</text>`;
  function head(id,w,h,compact,title,desc){return `<svg xmlns="http://www.w3.org/2000/svg" class="engineering-figure__svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="fa-${id}-title fa-${id}-desc" data-figure-profile="SC-WEB-FIGURE-001" data-standard-adoption-id="SC-HANDBOOK-UWEDS-001" data-pre-drawing-case-review-id="SC-FA-OVERLAY-20261023" data-representation-class="OTHER_CONTROLLED" data-drawing-status="FOR_REVIEW" data-view-id="FA-${id}" data-purpose="Entered portal geometry and first-order response inspection" data-projection="ORTHOGRAPHIC" data-scale="NTS" data-unit="m,kN,kN.m,mm,mrad" data-production-mode="WEB_NATIVE_PARAMETRIC" data-source-ref="FA-STIFFNESS-01 FA-RECOVERY-01" data-source-access-date="2026-10-23" data-derivative-revision="20261026frameleaders1" data-rendered-variant="${compact?'phone':'desktop'}" data-source-status="DERIVED_FROM_VALIDATED_INPUTS"><title id="fa-${id}-title">${esc(title)}</title><desc id="fa-${id}-desc">${esc(desc)} Screen review only, not for fabrication.</desc>`;}
  function arrow(a,b){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy);if(L<1)return '';const ux=dx/L,uy=dy/L,bx=b.x-ux*6,by=b.y-uy*6;return line(a,b)+`<path class="engineering-drawing__arrow" data-load-arrow="true" data-tip-x="${n(b.x)}" data-tip-y="${n(b.y)}" d="M ${n(bx-uy*2)} ${n(by+ux*2)} L ${n(b.x)} ${n(b.y)} L ${n(bx+uy*2)} ${n(by-ux*2)} Z"/>`;}
  function layout(r,{width=520,height=280}={}){const scale=Math.min((width-100)/r.input.span,(height-110)/r.input.height),w=scale*r.input.span,h=scale*r.input.height;return {scale,X:x=>(width-w)/2+x*scale,Y:y=>height-44-y*scale};}
  // Position belongs to the original member station, never the result offset
  // or magnified displacement. Keep raw metres until the presentation boundary.
  function framePosition(r,member,x){
    if(!r?.valid||!Number.isFinite(x))return null;const e=r.members.find(e=>e.id===member);if(!e||x<0||x>e.L)return null;const ni=r.nodes[e.i];return {member,x,X:ni.x+e.c*x,Y:ni.y+e.s*x};
  }
  function positionTicks(max,pixels){
    const target=max/Math.max(1,Math.floor(pixels/55)),power=10**Math.floor(Math.log10(target)),step=[1,2,2.5,5,10].find(v=>v*power>=target)*power,ticks=[0];
    for(let v=step;v<max;v+=step)if((max-v)/max*pixels>=45)ticks.push(v);return [...ticks,max];
  }
  function frameAxes(r,{width=520,height=320,member='BC',x=null}={}){
    if(!r?.valid||width<160)return '';const g=layout(r,{width,height}),{span,height:h}=r.input,p=framePosition(r,member,x),bottom=height-14,top=g.Y(h),zero=g.Y(0),left=-8;
    const mark=(axis,value,position,i,last)=>`<span class="fa-frame-tick fa-frame-tick--${axis}" data-position-axis="${axis}" data-position-value="${value}" style="${axis==='X'?`left:${n(position)}px;top:${bottom}px`:`left:${left}px;top:${n(position)}px`}"><i></i><b style="${axis==='X'?`transform:translateX(${i===0?'calc(-100% - 3px)':i===last?'3px':'-50%'})`:`transform:translateY(${i===0?'3px':i===last?'calc(-100% - 3px)':'-50%'})`}">${fmt(value)}</b></span>`;
    const xt=positionTicks(span,g.scale*span),yt=positionTicks(h,g.scale*h);
    return `<div class="fa-frame-axes" aria-hidden="true"><span class="fa-frame-axis-title fa-frame-axis-title--y">Y / m</span><span class="fa-frame-axis-title fa-frame-axis-title--x">X / m</span><i class="fa-frame-axis-line fa-frame-axis-line--x" style="left:${n(g.X(0))}px;top:${bottom}px;width:${n(g.scale*span)}px"></i><i class="fa-frame-axis-line fa-frame-axis-line--y" style="left:${left}px;top:${n(top)}px;height:${n(zero-top)}px"></i>${xt.map((v,i)=>mark('X',v,g.X(v),i,xt.length-1)).join('')}${yt.map((v,i)=>mark('Y',v,g.Y(v),i,yt.length-1)).join('')}${p?`<i class="fa-position-indicator fa-position-indicator--x" data-position-indicator="X" style="left:${n(g.X(p.X))}px;top:${bottom}px"></i><i class="fa-position-indicator fa-position-indicator--y" data-position-indicator="Y" style="left:${left}px;top:${n(g.Y(p.Y))}px"></i>`:''}</div>`;
  }
  function stationMarker(r,member,x,g){const p=framePosition(r,member,x);return p?`<circle class="engineering-drawing__active fa-position-dot" fill="white" cx="${n(g.X(p.X))}" cy="${n(g.Y(p.Y))}" r="2.5" data-position-marker="${member}" data-global-x="${p.X}" data-global-y="${p.Y}"/>`:'';}
  function renderStructure(r,{width=520,height=280,compact=false,member='BC',deformed=false,showLoads=true,showLabels=true,highlight=true}={}){
    if(!r?.valid||width<160||height<180)return '';
    const g=layout(r,{width,height}),P=n=>({x:g.X(n.x),y:g.Y(n.y)}),gap=g.scale*r.input.span,actions=gap>=70&&g.scale*r.input.height>=45,out=[head('structure',width,height,compact,'Portal frame elevation','Entered span and height use uniform scaling. A and D are bases; B and C are roof nodes. AB and DC run base to roof; BC runs left to right. Supports and action arrow lengths are schematic. Crowded action symbols are omitted at extreme aspect ratios; the load input schedule remains authoritative. Select a member by tap or keyboard; numeric and range position controls provide alternatives.')];
    for(const e of r.members){const a=P(r.nodes[e.i]),b=P(r.nodes[e.j]);out.push(`<g data-geometry-role="member" data-member="${e.id}" data-interactive-id="FA-${e.id}" data-annotation-id="FA-member-${e.id}" data-object-id="${e.id}" data-quantity-id="MEMBER_LOCAL_POSITION" data-source-id="FA-RECOVERY-01" data-state="${e.id===member?'SELECTED':'DEFAULT'}" role="button" tabindex="0" aria-label="Inspect ${e.name}, ${e.id}, ${r.nodes[e.i].id} to ${r.nodes[e.j].id}" aria-pressed="${e.id===member}">`,line(a,b,'outline',e.id===member?'data-selected-axis="true"':''),e.id===member&&!deformed&&highlight?line(a,b,'active','data-selected-member="true"'):'',line(a,b,'secondary fa-hit','data-hit-member="'+e.id+'"'),'</g>');}
    out.push('<g data-geometry-role="supports">');
    for(const [index,type]of [[0,r.input.leftBase],[3,r.input.rightBase]]){const a=P(r.nodes[index]),half=Math.min(type==='fixed'?12:7,(gap-4)/2);if(type==='fixed'){out.push(line({x:a.x-half,y:a.y+2},{x:a.x+half,y:a.y+2},'outline'));for(let j=-half+2;j<=half;j+=5)out.push(line({x:a.x+j,y:a.y+3},{x:a.x+j-3,y:a.y+9}));}else out.push(`<path class="engineering-drawing__outline" d="M ${n(a.x)} ${n(a.y)} l ${-n(half)} 12 h ${n(2*half)} Z"/>`);}
    out.push('</g><g data-geometry-role="loads">');
    const byId={B:1,C:2};for(const id of actions&&showLoads?['B','C']:[]){const a=P(r.nodes[byId[id]]),suffix=id==='B'?'Left':'Right',H=r.input['H'+suffix],p=r.input['P'+suffix],C=r.input['C'+suffix];
      if(H)out.push(arrow({x:a.x-Math.sign(H)*30,y:a.y},a));if(p)out.push(arrow({x:a.x,y:a.y-Math.sign(p)*32},a));
      if(C){const ps=Array.from({length:25},(_,i)=>{const t=(30+Math.sign(C)*270*i/24)*Math.PI/180;return {x:a.x+15*Math.cos(t),y:a.y-15*Math.sin(t)};});out.push(`<path class="engineering-drawing__secondary" d="${ps.map((v,i)=>`${i?'L':'M'} ${n(v.x)} ${n(v.y)}`).join(' ')}"/>`,arrow(ps.at(-2),ps.at(-1)));}
    }
    if(actions&&showLoads&&r.input.q){const b=P(r.nodes[1]),c=P(r.nodes[2]),sign=Math.sign(r.input.q);for(let i=1;i<=5;i++){const x=b.x+(c.x-b.x)*i/6;out.push(arrow({x,y:b.y-24*sign},{x,y:b.y}));}}
    out.push('</g>');
    if(deformed){const mag=magnification(r,g.scale);out.push(`<g data-geometry-role="deformation" data-magnification="${mag}">`);for(const e of r.members){const ni=r.nodes[e.i];out.push(`<path class="engineering-drawing__active" fill="none" d="${e.samples.map((p,i)=>`${i?'L':'M'} ${n(g.X(ni.x+e.c*p.x+p.ux*mag))} ${n(g.Y(ni.y+e.s*p.x+p.uy*mag))}`).join(' ')}"/>`);}out.push('</g>');}
    out.push('<g data-geometry-role="labels">');for(const i of showLabels?(compact?[1,2]:[0,1,2,3]):[]){const a=P(r.nodes[i]),roof=i===1||i===2;out.push(text(a.x+(i<2?-28:22),a.y+(roof?-20:26),r.nodes[i].id));}out.push('</g></svg>');return out.join('');
  }
  function magnification(r,scale){const max=Math.max(...r.members.flatMap(e=>e.samples.map(p=>Math.hypot(p.ux,p.uy))))||0;return max?Math.min(1000,18/(scale*max)):1;}
  function axes(e,key,{width=520,height=155,result=null}={}){
    const f=factor(key),low=Math.min(0,resolved(result,key,e.extrema[key].min[key]*f)),high=Math.max(0,resolved(result,key,e.extrema[key].max[key]*f)),range=high-low||2,target=range/3,power=10**Math.floor(Math.log10(target)),step=[1,2,2.5,5,10].find(v=>v*power>=target)*power,
      min=low===high?-1:Math.floor(low/step)*step,max=low===high?1:Math.ceil(high/step)*step,left=66,right=14,top=16,bottom=height-28,amplitude=Math.max(Math.abs(min),Math.abs(max)),exponent=amplitude&&(amplitude<.01||amplitude>=1e3)?Math.floor(Math.log10(amplitude)/3)*3:0,Y=v=>bottom-(resolved(result,key,v)-min)/(max-min)*(bottom-top),yTicks=low===high?[-1,0,1]:Array.from({length:Math.round((max-min)/step)+1},(_,i)=>min+i*step).map(v=>Math.abs(v)<step*1e-10?0:v);
    return {left,right,top,bottom,min,max,exponent,X:x=>left+x/e.L*(width-left-right),Y,xTicks:[0,e.L/2,e.L],yTicks};
  }
  function renderChart(r,key,{width=520,height=155,compact=false,member='BC',x=null}={}){
    if(!r?.valid||width<160)return '';const e=r.members.find(e=>e.id===member);if(!e)return '';const a=axes(e,key,{width,height,result:r}),f=factor(key),points=[...e.samples,e.extrema[key].min,e.extrema[key].max].sort((p,q)=>p.x-q.x);
    const out=[head('chart-'+key,width,height,compact,names[key]+' along '+member,`Local x goes from i to j. ${names[key]} in ${units[key]}, positive above the zero baseline; scale independent of other response diagrams.`),'<g data-geometry-role="response">'];
    for(const value of a.yTicks)out.push(line({x:a.left,y:a.Y(value)},{x:width-a.right,y:a.Y(value)},'dimensions'));
    out.push(line({x:a.left,y:a.top},{x:a.left,y:a.bottom},'secondary'),line({x:a.left,y:a.Y(0)},{x:width-a.right,y:a.Y(0)},'outline','data-zero-baseline="true"'));
    out.push(`<path class="engineering-drawing__active" data-response-curve="${key}" fill="none" d="${points.map((p,i)=>`${i?'L':'M'} ${n(a.X(p.x))} ${n(a.Y(p[key]*f))}`).join(' ')}"/>`);
    if(Number.isFinite(x)&&x>=0&&x<=e.L){const p=e.at(x);out.push(line({x:a.X(x),y:a.top},{x:a.X(x),y:a.bottom},'symbolic','data-reading-marker="true"'),`<circle class="engineering-drawing__active" fill="white" cx="${n(a.X(x))}" cy="${n(a.Y(p[key]*f))}" r="3"/>`);}
    return out.join('')+'</g></svg>';
  }
  function axisLabels(e,key,viewport){const a=axes(e,key,viewport);return `<div class="fa-axis" data-axis-power="${a.exponent}" aria-hidden="true">${a.yTicks.map(v=>`<span data-axis="ordinate" style="left:0;top:${n(a.Y(v)-7)}px;width:58px;text-align:right">${fmt(v/10**a.exponent)}</span>`).join('')}${a.xTicks.map((v,i)=>`<span data-axis="position" style="left:${n(a.X(v))}px;top:${a.bottom+7}px;transform:translateX(${i===0?'0':i===2?'-100%':'-50%'})">${fmt(v)}</span>`).join('')}</div>`;}
  function renderCoordinate(r,{member='BC',system='global'}={}){
    if(!r?.valid)return '';const e=r.members.find(e=>e.id===member),local=system==='local',origin={x:42,y:48},vectors=local?[{x:e.c,y:e.s},{x:-e.s,y:e.c}]:[{x:1,y:0},{x:0,y:1}],out=[head('axes-'+system,100,70,true,local?member+' local axes':'Global axes',local?'Local x follows member i to j; local y is the left normal.':'Global X right and Y up; positive rotation is counterclockwise. Orientation reference, not the model origin.'),`<g data-geometry-role="coordinate-axes" data-coordinate-system="${system}" data-coordinate-member="${local?member:''}">`];
    vectors.forEach((v,i)=>{const end={x:origin.x+v.x*28,y:origin.y-v.y*28},dx=v.x,dy=-v.y,b={x:end.x-dx*4,y:end.y-dy*4};out.push(line(origin,end),`<path class="engineering-drawing__arrow" data-coordinate-arrow="${i===0?'x':'y'}" d="M ${n(b.x-dy*1.2)} ${n(b.y+dx*1.2)} L ${n(end.x)} ${n(end.y)} L ${n(b.x+dy*1.2)} ${n(b.y-dx*1.2)} Z"/>`,text(end.x+(dx>.5?7:dx<-.5?-12:-4),end.y+(dy<-.5?-7:4),local?['x','y'][i]:['X','Y'][i]));});
    return out.join('')+'</g></svg>';
  }
  const responseKeys=['N','V','M','theta'];
  function framePeak(r,key){
    if(!r?.valid||!responseKeys.includes(key))return null;
    return r.members.flatMap(e=>['min','max'].map(which=>({member:e.id,x:e.extrema[key][which].x,value:resolved(r,key,e.extrema[key][which][key]*factor(key))}))).reduce((a,b)=>Math.abs(a.value)>=Math.abs(b.value)?a:b);
  }
  function frameScale(r,mode,{width=520,height=320,compact=false,scale=100}={}){
    const geometry=layout(r,{width,height}),zoom=Math.max(.5,Math.min(2,scale/100)),amplitude=(compact?18:24)*zoom,peak=framePeak(r,mode),referenceValue=peak?Math.abs(peak.value):0;
    // Exact bounds from linear u endpoints and analytical v extrema. The bound
    // controls magnification, not a claimed location of total-displacement max.
    const bound=Math.max(...r.members.map(e=>Math.hypot(Math.max(Math.abs(e.dl[0]),Math.abs(e.dl[3])),Math.max(Math.abs(e.extrema.v.min.v),Math.abs(e.extrema.v.max.v)))));
    const mag=bound?Math.min(1000*zoom,amplitude/(geometry.scale*bound)):1;
    return {mode,geometry,zoom,amplitude,referenceValue,peak,mag};
  }
  function projectPoint(r,e,p,mode,state){
    const g=state.geometry,ni=r.nodes[e.i],base={x:g.X(ni.x+e.c*p.x),y:g.Y(ni.y+e.s*p.x)};
    if(mode==='displacement')return {x:base.x+g.scale*p.ux*state.mag,y:base.y-g.scale*p.uy*state.mag,base};
    const value=resolved(r,mode,p[mode]*factor(mode)),offset=state.referenceValue?value/state.referenceValue*state.amplitude:0,side=mode==='M'?-1:1;
    return {x:base.x-e.s*offset*side,y:base.y-e.c*offset*side,base};
  }
  function responseSamples(e,key,selectedX){
    let zeros=[];
    if(key==='V'&&e.q)zeros=[-e.p[1]/e.q];
    if(key==='M')zeros=C.roots([-e.p[2],e.p[1]*e.L,e.q*e.L**2/2],0,1).map(t=>t*e.L);
    if(key==='theta')zeros=C.roots([e.dl[2],-e.p[2]*e.L/e.EI,e.p[1]*e.L**2/(2*e.EI),e.q*e.L**3/(6*e.EI)],0,1).map(t=>t*e.L);
    const xs=[...e.samples.map(p=>p.x),...(responseKeys.includes(key)?[e.extrema[key].min.x,e.extrema[key].max.x]:[e.extrema.v.min.x,e.extrema.v.max.x]),...zeros,selectedX].filter(x=>Number.isFinite(x)&&x>=0&&x<=e.L);
    return [...new Set(xs)].sort((a,b)=>a-b).map(e.at);
  }
  function segmentHits(a,b,r){
    let t0=0,t1=1;for(const [v,d,low,high]of [[a.x,b.x-a.x,r.x,r.x+r.w],[a.y,b.y-a.y,r.y,r.y+r.h]]){if(Math.abs(d)<1e-12){if(v<low||v>high)return false;}else{const lo=Math.min((low-v)/d,(high-v)/d),hi=Math.max((low-v)/d,(high-v)/d);t0=Math.max(t0,lo);t1=Math.min(t1,hi);if(t0>t1)return false;}}return true;
  }
  function segmentDistance(a,b,c,d){
    const cross=(x,y)=>x.x*y.y-x.y*y.x,r={x:b.x-a.x,y:b.y-a.y},s={x:d.x-c.x,y:d.y-c.y},q={x:c.x-a.x,y:c.y-a.y},den=cross(r,s);
    if(Math.abs(den)>1e-10){const t=cross(q,s)/den,u=cross(q,r)/den;if(t>=0&&t<=1&&u>=0&&u<=1)return 0;}
    const pointDistance=(p,v,w)=>{const dx=w.x-v.x,dy=w.y-v.y,t=Math.max(0,Math.min(1,((p.x-v.x)*dx+(p.y-v.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-v.x-t*dx,p.y-v.y-t*dy);};
    return Math.min(pointDistance(a,c,d),pointDistance(b,c,d),pointDistance(c,a,b),pointDistance(d,a,b));
  }
  function nearbyLeader(p,rect,obstacles,placed,maxLength){
    const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),edge={x:clamp(p.x,rect.x,rect.x+rect.w),y:clamp(p.y,rect.y,rect.y+rect.h)},gap=Math.hypot(p.x-edge.x,p.y-edge.y)||1;
    const ports=[{x:edge.x+(p.x-edge.x)/gap*4,y:edge.y+(p.y-edge.y)/gap*4}];
    if(p.x>=rect.x+rect.w)ports.push({x:rect.x+rect.w+4,y:clamp(p.y,rect.y+3,rect.y+rect.h-3)});
    if(p.x<=rect.x)ports.push({x:rect.x-4,y:clamp(p.y,rect.y+3,rect.y+rect.h-3)});
    if(p.y>=rect.y+rect.h)ports.push({x:clamp(p.x,rect.x+3,rect.x+rect.w-3),y:rect.y+rect.h+4});
    if(p.y<=rect.y)ports.push({x:clamp(p.x,rect.x+3,rect.x+rect.w-3),y:rect.y-4});
    const routes=[];for(const end of ports){routes.push([p,end]);for(const offset of [10,-10,18,-18]){routes.push([p,{x:p.x+offset,y:end.y},end],[p,{x:end.x,y:p.y+offset},end]);}}
    const length=ps=>ps.slice(1).reduce((sum,b,i)=>sum+Math.hypot(b.x-ps[i].x,b.y-ps[i].y),0);
    const valid=ps=>{for(let i=1;i<ps.length;i++){let a=ps[i-1],b=ps[i];if(segmentHits(a,b,rect)||placed.some(r=>segmentHits(a,b,{x:r.x-2,y:r.y-2,w:r.w+4,h:r.h+4})))return false;
      if(i===1){const L=Math.hypot(b.x-a.x,b.y-a.y),trim=Math.min(8,Math.max(0,L-1));a=L?{x:a.x+(b.x-a.x)*trim/L,y:a.y+(b.y-a.y)*trim/L}:a;}
      for(const [c,d]of obstacles){if(Math.max(a.x,b.x)+1.2<Math.min(c.x,d.x)||Math.max(c.x,d.x)+1.2<Math.min(a.x,b.x)||Math.max(a.y,b.y)+1.2<Math.min(c.y,d.y)||Math.max(c.y,d.y)+1.2<Math.min(a.y,b.y))continue;if(segmentDistance(a,b,c,d)<1.2)return false;}
    }return true;};
    for(const candidate of routes.map(points=>({points,length:length(points)})).filter(r=>r.length<=maxLength).sort((a,b)=>a.length-b.length))if(valid(candidate.points))return candidate;
    return null;
  }
  function callouts(items,obstacles,width,height,budget,placed=[],compact=false){
    const out=[];
    for(const item of items.slice(0,budget)){
      const w=item.text.length*7.4+4,h=15,p=item.point,candidates=[];
      if(item.nodeId){const left=['A','B'].includes(item.nodeId),roof=['B','C'].includes(item.nodeId);candidates.push({x:p.x+(left?-w-12:12),y:p.y+(roof?-28:16),w,h});}
      for(const dy of [-24,28,-45,48,-65,68])for(const dx of [12,-w-12,-w/2])candidates.push({x:p.x+dx,y:p.y+dy-12,w,h});
      // Only structural identities retain a whole-view fallback. Numerical
      // readings must remain near their own plotted feature.
      if(item.nodeId)for(const y of [8,height-20])for(const x of [8,width-w-8,(width-w)/2])candidates.push({x,y,w,h});
      const link=b=>{const edge={x:Math.max(b.x,Math.min(b.x+b.w,p.x)),y:p.y<b.y?b.y:p.y>b.y+b.h?b.y+b.h:p.y},distance=Math.hypot(p.x-edge.x,p.y-edge.y)||1;return {x:edge.x+(p.x-edge.x)/distance*4,y:edge.y+(p.y-edge.y)/distance*4};};
      const fits=b=>b.x>=6&&b.y>=5&&b.x+b.w<=width-6&&b.y+b.h<=height-5&&!placed.some(a=>!(b.x>a.x+a.w+4||b.x+b.w<a.x-4||b.y>a.y+a.h+4||b.y+b.h<a.y-4))&&!obstacles.some(([a,c])=>segmentHits(a,c,{x:b.x-2,y:b.y-2,w:b.w+4,h:b.h+4}));
      let rect,route;
      if(item.nodeId)rect=candidates.find(b=>fits(b)&&!placed.some(a=>segmentHits(p,link(b),{x:a.x-2,y:a.y-2,w:a.w+4,h:a.h+4})));
      else{let best=Infinity;const distance=b=>Math.hypot(p.x-Math.max(b.x,Math.min(b.x+b.w,p.x)),p.y-Math.max(b.y,Math.min(b.y+b.h,p.y)));
        for(const b of candidates.filter(b=>distance(b)<=(compact?44:56)).sort((a,b)=>distance(a)-distance(b))){if(distance(b)>best||!fits(b))continue;const next=nearbyLeader(p,b,obstacles,placed,compact?64:80);if(next&&next.length<best){rect=b;route=next;best=next.length;}}
      }
      if(!rect)continue;placed.push(rect);const end=link(rect);
      // A leader is a screen link to a canonical result point, not a dimension.
      if(item.nodeId)out.push(`<g data-node-identity="${item.nodeId}" pointer-events="none">`,line(p,end,'dimensions',`data-node-leader="${item.nodeId}"`),text(rect.x,rect.y+12,item.text).replace('class=',`data-node-label="${item.nodeId}" class=`),'</g>');
      else{out.push(`<g data-result-label="${esc(item.member)}" data-member="${esc(item.member)}" data-result-selected="${!!item.selected}" data-result-value="${item.value}" data-result-x="${item.x}" data-label-bounds="${n(rect.x)} ${n(rect.y)} ${n(rect.w)} ${h}">`,`<path class="engineering-drawing__dimensions" data-result-leader="true" data-leader-length="${n(route.length)}" d="${route.points.map((q,i)=>`${i?'L':'M'} ${n(q.x)} ${n(q.y)}`).join(' ')}"/>`,text(rect.x,rect.y+12,item.text),'</g>');for(let i=1;i<route.points.length;i++)obstacles.push([route.points[i-1],route.points[i]]);}
      if(item.nodeId)obstacles.push([p,end]);
    }
    return out.join('');
  }
  function renderFrame(r,{width=520,height=320,compact=false,member='BC',mode='M',x=null,scale=100,labels=true,loads=false,isolate=false}={}){
    if(!r?.valid||width<160||height<180)return '';
    if(!['model',...responseKeys,'displacement'].includes(mode))return '';
    const model=mode==='model',state=frameScale(r,mode,{width,height,compact,scale}),base=renderStructure(r,{width,height,compact,member,showLoads:model||loads,showLabels:false,highlight:false}).replace('</svg>',''),out=[base.replace('data-view-id="FA-structure"',`data-view-id="FA-whole-${mode}" data-frame-result="${mode}" data-reference-value="${state.referenceValue}" data-reference-amplitude="${state.amplitude}" data-magnification="${state.mag}"`)],obstacles=[],labelItems=[];
    const visible=model?[]:r.members.filter(e=>!isolate||e.id===member),path=ps=>ps.map((p,i)=>`${i?'L':'M'} ${n(p.x)} ${n(p.y)}`).join(' ');
    // Include original members, support symbol envelopes and optional actions in
    // the callout exclusion geometry. Shape/path collision is rechecked in browser.
    for(const e of r.members){const ni=r.nodes[e.i],nj=r.nodes[e.j];obstacles.push([{x:state.geometry.X(ni.x),y:state.geometry.Y(ni.y)},{x:state.geometry.X(nj.x),y:state.geometry.Y(nj.y)}]);}
    for(const i of [0,3]){const a=r.nodes[i],p={x:state.geometry.X(a.x),y:state.geometry.Y(a.y)};for(const dy of [0,3,6,9,12])obstacles.push([{x:p.x-13,y:p.y+dy},{x:p.x+13,y:p.y+dy}]);}
    // The metre ruler is HTML layered over this SVG. Reserve its actual line,
    // ticks and label lanes too, so a bottom callout cannot straddle the X axis.
    const rulerY=height-14,xt=positionTicks(r.input.span,state.geometry.scale*r.input.span);
    obstacles.push([{x:state.geometry.X(0),y:rulerY},{x:state.geometry.X(r.input.span),y:rulerY}]);
    xt.forEach((v,i)=>{const at=state.geometry.X(v),w=fmt(v).length*7.4,left=at+(i===0?-w-3:i===xt.length-1?3:-w/2);obstacles.push([{x:at,y:rulerY},{x:at,y:rulerY+4}]);for(let y=rulerY+7;y<=height+7;y+=2)obstacles.push([{x:left,y},{x:left+w,y}]);});
    // Reserve the optional schematic action envelopes too. Dense horizontal
    // exclusion lanes conservatively cover the full symbol area, including arcs.
    if((model||loads)&&state.geometry.scale*r.input.span>=70&&state.geometry.scale*r.input.height>=45){
      const reserve=(x0,x1,y0,y1)=>{for(let y=y0;y<=y1;y+=2)obstacles.push([{x:x0,y},{x:x1,y}]);};
      for(const [i,suffix]of [[1,'Left'],[2,'Right']])if(['H','P','C'].some(k=>r.input[k+suffix])){const p=r.nodes[i];reserve(state.geometry.X(p.x)-36,state.geometry.X(p.x)+36,state.geometry.Y(p.y)-36,state.geometry.Y(p.y)+36);}
      if(r.input.q){const y=state.geometry.Y(r.input.height),other=y-26*Math.sign(r.input.q);reserve(state.geometry.X(0),state.geometry.X(r.input.span),Math.min(y,other)-2,Math.max(y,other)+2);}
    }
    for(const e of visible){
      const samples=responseSamples(e,mode,e.id===member?x:null),points=samples.map(p=>projectPoint(r,e,p,mode,state));
      for(let i=1;i<points.length;i++)obstacles.push([points[i-1],points[i]]);
      out.push(`<g data-frame-member="${e.id}" data-member="${e.id}" data-result-quantity="${mode}" data-source-id="FA-RECOVERY-01" data-reference-value="${state.referenceValue}">`);
      if(mode==='displacement')out.push(`<path class="engineering-drawing__active" fill="none" data-frame-curve="${e.id}" d="${path(points)}"/>`);
      else{
        // Break at true scalar zeros. Positive = continuous, negative = dashed;
        // both use one restrained accent and signed numerical values.
        let start=0;
        for(let i=1;i<samples.length;i++){
          const sign=Math.sign(e.at((samples[i-1].x+samples[i].x)/2)[mode]),next=i<samples.length-1?Math.sign(e.at((samples[i].x+samples[i+1].x)/2)[mode]):null;
          if(i!==samples.length-1&&sign===next)continue;
          const group=points.slice(start,i+1),b0=group[0].base,b1=group.at(-1).base;
          out.push(`<path class="fa-envelope" d="M ${n(b0.x)} ${n(b0.y)} L ${n(group[0].x)} ${n(group[0].y)} ${group.slice(1).map(p=>`L ${n(p.x)} ${n(p.y)}`).join(' ')} L ${n(b1.x)} ${n(b1.y)} Z"/>`,`<path class="engineering-drawing__active${sign<0?' fa-negative':''}" fill="none" data-frame-curve="${e.id}" data-sign="${sign}" d="${path(group)}"/>`);start=i;
        }
        for(const p of [points[0],points.at(-1)]){out.push(line(p.base,p,'dimensions'));obstacles.push([p.base,p]);}
      }
      out.push(`<path class="engineering-drawing__secondary fa-response-hit" fill="none" data-hit-member="${e.id}" d="${path(points)}"/>`,'</g>');
    }
    if(state.peak&&visible.some(e=>e.id===state.peak.member)){
      const e=r.members.find(e=>e.id===state.peak.member),p=e.at(state.peak.x),point=projectPoint(r,e,p,mode,state),value=state.peak.value;
      labelItems.push({member:e.id,x:p.x,value,point,text:`${e.id} ${value>0?'+':''}${fmt(value)}`});
    }
    const selected=r.members.find(e=>e.id===member);
    if(model)out.push(stationMarker(r,member,x,state.geometry));
    if(!model&&selected&&Number.isFinite(x)&&x>=0&&x<=selected.L){const p=selected.at(x),point=projectPoint(r,selected,p,mode,state),value=mode==='displacement'?Math.hypot(p.ux,p.uy)*1000:resolved(r,mode,p[mode]*factor(mode));
      out.push(stationMarker(r,member,x,state.geometry));for(const dy of [-3,0,3])obstacles.push([{x:point.base.x-3,y:point.base.y+dy},{x:point.base.x+3,y:point.base.y+dy}]);
      out.push(line(point.base,point,'symbolic','data-frame-reading="true"'),`<circle class="engineering-drawing__active fa-reading-dot" fill="white" cx="${n(point.x)}" cy="${n(point.y)}" r="3.5" data-reading-member="${member}" data-model-x="${x}" data-result-value="${value}"/>`);
      obstacles.push([point.base,point]);for(const dy of [-4,-2,0,2,4])obstacles.push([{x:point.x-4,y:point.y+dy},{x:point.x+4,y:point.y+dy}]);
      const duplicate=labelItems.findIndex(a=>Math.hypot(a.point.x-point.x,a.point.y-point.y)<12||(a.member===member&&Math.abs(a.value-value)<1e-12*Math.max(1,Math.abs(value))));
      if(duplicate>=0)labelItems.splice(duplicate,1);
      labelItems.unshift({member,x,value,point,selected:true,text:`${member} ${value>0?'+':''}${fmt(value)}`});
    }
    if(mode==='displacement')for(const ni of [1,2]){const node=r.nodes[ni],e=r.members.find(e=>e.j===ni),p=e.at(e.L),point=projectPoint(r,e,p,mode,state),value=Math.hypot(node.ux,node.uy)*1000;if(!labelItems.some(a=>Math.hypot(a.point.x-point.x,a.point.y-point.y)<15))labelItems.push({member:e.id,x:e.L,value,point,text:`${node.id} |u| ${fmt(value)}`});}
    const placed=[],identities=r.nodes.map(node=>({nodeId:node.id,text:node.id,point:{x:state.geometry.X(node.x),y:state.geometry.Y(node.y)}}));
    out.push('<g data-geometry-role="node-identities">',callouts(identities,obstacles,width,height,4,placed),'</g>');
    if(labels&&!model)out.push('<g data-geometry-role="result-labels">',callouts(labelItems,obstacles,width,height,compact?2:4,placed,compact),'</g>');
    out.push('</svg>');return out.join('');
  }
  return {fmt,units,names,factor,resolved,layout,framePosition,positionTicks,frameAxes,magnification,axes,renderStructure,renderChart,axisLabels,renderCoordinate,framePeak,frameScale,projectPoint,responseSamples,renderFrame};
});
