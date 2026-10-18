"use strict";
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;root.BeamForcesDrawing=api;})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const n=v=>Number(v.toFixed(6)),escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt=v=>Math.abs(v)<1e-7?"0":Number(v.toFixed(2)).toLocaleString("en-AU",{maximumFractionDigits:2});
  // Preserve small physical results while suppressing case-relative roundoff.
  function formatResult(value,reference=Math.abs(value)){
    if(!Number.isFinite(value))return '—';
    const magnitude=Math.abs(value);
    if(!magnitude||magnitude<=Math.abs(reference)*1e-12)return '0';
    if(magnitude<.01||magnitude>=1e7){const [coefficient,power]=value.toExponential(5).split('e');return (Number(coefficient)+'e'+Number(power)).replace(/-/g,'−');}
    return fmt(value).replace('-','−');
  }
  const interactive=(object,quantity,state)=>`data-interactive-id="BIF-${escape(object)}-${quantity}" data-annotation-id="BIF-${escape(object)}-${quantity}" data-object-id="${escape(object)}" data-quantity-id="${quantity}" data-source-id="BIF-STATICS-01" data-state="${state}"`;
  function viewport(width,height,compact){const left=48,right=16;return {width,height,left,right,X:(x,L)=>left+x/L*(width-left-right)};}
  function header(kind,w,h,compact){return `<svg class="engineering-figure__svg" data-figure-profile="SC-WEB-FIGURE-001" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="bif-${kind}-title bif-${kind}-desc" data-standard-adoption-id="SC-HANDBOOK-UWEDS-001" data-pre-drawing-case-review-id="SC-BIF-FIGURES-20261014" data-representation-class="OTHER_CONTROLLED" data-drawing-status="FOR_REVIEW" data-view-id="BIF-${kind}" data-purpose="Static internal-force and input-position inspection" data-projection="ORTHOGRAPHIC" data-scale="NTS" data-unit="m,kN,kN.m" data-production-mode="WEB_NATIVE_PARAMETRIC" data-source-ref="BIF-STATICS-01" data-source-access-date="2026-10-14" data-derivative-revision="20261014bif1" data-rendered-variant="${compact?"compact":"desktop"}" data-source-status="DERIVED_FROM_VALIDATED_INPUTS"><title id="bif-${kind}-title">${escape(kind==="structure"?"Beam arrangement and applied loads":kind==="V"?"Shear force diagram":"Bending moment diagram")}</title><desc id="bif-${kind}-desc">Positions and results calculated from entered loads. Support/load symbols are schematic; separate ordinate scales. Left and right values preserve force/couple jumps. Screen review only, not for fabrication.</desc>`;}
  const line=(x1,y1,x2,y2,cls,extra="")=>`<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" class="${cls}" ${extra}/>`;
  const text=(x,y,t,anchor="start")=>`<text x="${n(x)}" y="${n(y)}" text-anchor="${anchor}" class="engineering-drawing__text">${escape(t)}</text>`;
  function arrow(x1,y1,x2,y2,active=false){const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);if(len<.01)return "";const ux=dx/len,uy=dy/len,bx=x2-ux*6,by=y2-uy*6;return line(x1,y1,x2,y2,active?"engineering-drawing__active":"engineering-drawing__secondary")+`<path class="engineering-drawing__arrow" d="M ${n(bx-uy*2.3)} ${n(by+ux*2.3)} L ${n(x2)} ${n(y2)} L ${n(bx+uy*2.3)} ${n(by-ux*2.3)} Z"/>`;}
  function renderStructure(result,{width=500,height=164,compact=false,x=0,selectedId=null}={}){
    if(!result?.valid||width<90||height<100)return "";
    const v=viewport(width,height,compact),L=result.input.length,X=t=>v.X(t,L),y=98;
    const out=[header("structure",width,height,compact),'<g data-geometry-role="beam">',line(X(0),y,X(L),y,"engineering-drawing__outline")];
    const closeSupports=result.reactions.length===2&&Math.abs(X(result.reactions[1].x)-X(result.reactions[0].x))<24;
    for(const r of result.reactions){const sx=X(r.x),sy=closeSupports&&r.id==="B"?y+22:y;if(r.fixed){out.push(line(sx,y-16,sx,y+18,"engineering-drawing__outline"));const dir=r.x===0?-1:1;for(let k=-12;k<=16;k+=7)out.push(line(sx,y+k,sx+dir*7,y+k+5,"engineering-drawing__secondary"));}else{if(sy!==y)out.push(line(sx,y,sx,sy,"engineering-drawing__secondary"));out.push(`<path class="engineering-drawing__outline" d="M ${n(sx)} ${sy} l -7 12 h 14 Z"/>`);if(r.id==="B")out.push(`<circle cx="${n(sx-4)}" cy="${sy+16}" r="2" class="engineering-drawing__secondary"/><circle cx="${n(sx+4)}" cy="${sy+16}" r="2" class="engineering-drawing__secondary"/>`);}out.push(text(Math.max(10,Math.min(width-10,sx+(closeSupports?(r.id==="A"?-10:10):0))),height-9,r.id,closeSupports?(r.id==="A"?"end":"start"):"middle"));}
    out.push('</g><g data-geometry-role="distributed-loads">');
    const qscale=Math.max(1,...result.input.loads.filter(l=>["udl","linear"].includes(l.type)).flatMap(l=>[Math.abs(l.q0),Math.abs(l.q1)]));
    for(const l of result.input.loads.filter(l=>["udl","linear"].includes(l.type))){const active=l.id===selectedId,ybase=38,lane=active?0:3,Q=t=>l.q0+(l.q1-l.q0)*(t-l.start)/(l.end-l.start),head=t=>ybase-20*Q(t)/qscale+lane;
      if(active)out.push(`<rect class="bif-fill" x="${n(X(l.start))}" y="8" width="${n(X(l.end)-X(l.start))}" height="48"/>`);
      out.push(line(X(l.start),head(l.start),X(l.end),head(l.end),active?"engineering-drawing__active":"engineering-drawing__secondary"));
      const count=Math.max(1,Math.min(12,Math.floor((X(l.end)-X(l.start))/24)));
      for(let i=0;i<=count;i++){const t=l.start+(l.end-l.start)*i/count,q=Q(t);if(q!==0)out.push(arrow(X(t),head(t),X(t),ybase+lane,active));}
      out.push(`<rect class="bif-load-hit" data-layer="INTERACTION_HIT_AREA" ${interactive(l.id,'start',active?'SELECTED':'DEFAULT')} data-load-id="${escape(l.id)}" x="${n(X(l.start)-4)}" y="8" width="${n(Math.max(8,X(l.end)-X(l.start)+8))}" height="48"/>`);
    }
    out.push('</g><g data-geometry-role="concentrated-loads">');
    for(const l of result.input.loads.filter(l=>["point","moment"].includes(l.type))){const sx=X(l.start),active=l.id===selectedId;
      if(l.type==="point"&&l.p!==0)out.push(l.p>0?arrow(sx,62,sx,y-4,active):arrow(sx,y-4,sx,62,active));
      if(l.type==="moment"&&l.p!==0){const cy=78,r=11,sign=l.p>0?0:1,tipY=cy+(l.p>0?r:-r);out.push(`<path data-couple-sign="${l.p>0?"counterclockwise":"clockwise"}" class="${active?"engineering-drawing__active":"engineering-drawing__secondary"}" fill="none" d="M ${n(sx+r)} ${cy} A ${r} ${r} 0 1 ${sign} ${n(sx)} ${tipY}"/>`);out.push(arrow(sx-6,tipY,sx,tipY,active));}
      out.push(`<rect class="bif-load-hit" data-layer="INTERACTION_HIT_AREA" ${interactive(l.id,'start',active?'SELECTED':'DEFAULT')} data-load-id="${escape(l.id)}" x="${n(sx-16)}" y="57" width="32" height="41"/>`);
    }
    out.push('</g>',line(X(x),8,X(x),height-23,"engineering-drawing__symbolic bif-guide",'data-layer="INTERACTION_HIGHLIGHT" data-reading-guide="true" '+interactive('section','x','SELECTED')),'</svg>');return out.join("");
  }
  function scale(result,key){const e=result.extrema[key],max=Math.max(Math.abs(e.min[key]),Math.abs(e.max[key]),1e-12);return {min:Math.min(0,e.min[key]),max:Math.max(0,e.max[key]),bound:max*1.15};}
  const tickText=value=>String(Number(value.toPrecision(10))).replace('-','−');
  function niceStep(value){const base=10**Math.floor(Math.log10(value));return [1,2,2.5,5,10].find(v=>v*base>=value*(1-1e-12))*base;}
  function chartAxes(result,key,{width=500,height=160,compact=false}={}){
    if(!result?.valid||!['V','M'].includes(key)||!Number.isFinite(width)||!Number.isFinite(height)||width<90||height<80)return null;
    const v=viewport(width,height,compact),L=result.input.length,top=14,bottom=height-28;
    const e=result.extrema[key],magnitude=Math.max(Math.abs(e.min[key]),Math.abs(e.max[key]));
    const exponent=magnitude&&(magnitude>=1e3||magnitude<.1)?Math.max(-323,3*Math.floor(Math.log10(magnitude)/3)):0,factor=10**exponent;
    const noise=magnitude*1e-12,low=Math.min(0,Math.abs(e.min[key])<=noise?0:e.min[key])/factor,high=Math.max(0,Math.abs(e.max[key])<=noise?0:e.max[key])/factor;
    const step=niceStep((high-low||2)/5),lo=magnitude?Math.floor(low/step+1e-12)*step:-1,hi=magnitude?Math.ceil(high/step-1e-12)*step:1;
    const Y=value=>top+(hi-value/factor)/(hi-lo)*(bottom-top),X=value=>v.X(value,L);
    const yTicks=Array.from({length:Math.round((hi-lo)/step)+1},(_,i)=>{const value=Number((lo+i*step).toPrecision(12));return {value:value*factor,label:tickText(value),y:Y(value*factor)};});
    const xStep=niceStep(L/Math.max(3,Math.min(6,Math.floor((width-v.left-v.right)/60)))),xs=[0];
    for(let i=1;i*xStep<L*(1-1e-12);i++){const value=Number((i*xStep).toPrecision(12));if((L-value)/L*(width-v.left-v.right)>=40)xs.push(value);}
    xs.push(L);const xTicks=xs.map(value=>({value,label:tickText(value),x:X(value)}));
    return {...v,top,bottom,X,Y,exponent,factor,domain:[lo*factor,hi*factor],xTicks,yTicks};
  }
  function renderChartLabels(result,key,options={}){
    const a=chartAxes(result,key,options);if(!a)return '';
    return '<div class="bif-axis-labels" aria-hidden="true">'+a.yTicks.map(t=>`<span class="bif-axis-y" data-axis="y" data-axis-value="${t.value}" style="left:${a.left-9}px;top:${n(t.y)}px">${t.label}</span>`).join('')+a.xTicks.map((t,i)=>`<span class="bif-axis-x${i===0?' bif-axis-start':i===a.xTicks.length-1?' bif-axis-end':''}" data-axis="x" data-axis-value="${t.value}" style="left:${n(t.x)}px;top:${a.bottom+7}px">${t.label}</span>`).join('')+'</div>';
  }
  function renderChart(result,key,{width=500,height=160,compact=false,x=0,side="right"}={}){
    if(!result?.valid||width<90||height<80)return "";
    const a=chartAxes(result,key,{width,height,compact});if(!a)return '';const {X,Y,top,bottom}=a,L=result.input.length;
    const out=[header(key,width,height,compact).replace('data-derivative-revision="20261014bif1"','data-derivative-revision="20261016bifaxes1"').replace('</desc>',` Horizontal axis: x from 0 to ${L} m. Vertical axis: ${key} from ${a.domain[0]} to ${a.domain[1]} ${key==='V'?'kN':'kN·m'}.</desc>`),`<g data-geometry-role="plot" data-axis-power="${a.exponent}">`];
    for(const t of a.yTicks)if(t.value!==0)out.push(line(X(0),t.y,X(L),t.y,'engineering-drawing__dimensions bif-grid'));
    for(const t of a.xTicks.slice(1,-1))out.push(line(t.x,top,t.x,bottom,'engineering-drawing__dimensions bif-grid'));
    out.push(line(X(0),Y(0),X(L),Y(0),'engineering-drawing__outline','data-zero-baseline="true"'));
    out.push(line(X(0),bottom,X(L)+6,bottom,'engineering-drawing__secondary','data-axis-line="x"'),line(X(0),bottom,X(0),top-7,'engineering-drawing__secondary','data-axis-line="y"'));
    out.push(`<path class="engineering-drawing__secondary" data-axis-arrow="x" d="M ${n(X(L)+2)} ${bottom-3} l 4 3 l -4 3"/><path class="engineering-drawing__secondary" data-axis-arrow="y" d="M ${X(0)-3} ${top-3} l 3 -4 l 3 4"/>`);
    for(const t of a.yTicks)out.push(line(X(0)-4,t.y,X(0),t.y,'engineering-drawing__dimensions','data-axis-tick="y"'));
    for(const t of a.xTicks)out.push(line(t.x,bottom,t.x,bottom+4,'engineering-drawing__dimensions','data-axis-tick="x"'));
    const d=result.samples.map((p,i)=>`${i?"L":"M"} ${n(X(p.x))} ${n(Y(p[key]))}`).join(" ");
    out.push(`<path class="bif-fill" d="${d} L ${n(X(L))} ${n(Y(0))} L ${n(X(0))} ${n(Y(0))} Z"/><path class="engineering-drawing__active bif-chart-path" data-force-curve="${key}" d="${d}"/>`);
    const read=result.at(x,side);out.push(line(X(x),top,X(x),bottom,"engineering-drawing__symbolic bif-guide",'data-layer="INTERACTION_HIGHLIGHT" data-reading-guide="true" '+interactive('section-'+key,'x','SELECTED')),`<circle class="bif-point" data-layer="INTERACTION_HIGHLIGHT" ${interactive('section',key,'SELECTED')} data-reading-point="${key}" cx="${n(X(x))}" cy="${n(Y(read[key]))}" r="3.5"/>`);
    out.push(`<rect class="bif-hit" data-layer="INTERACTION_HIT_AREA" ${interactive('plot-'+key,'x','DEFAULT')} data-section-hit="true" x="${a.left}" y="${top}" width="${width-a.left-a.right}" height="${bottom-top}"/>`,'</g></svg>');return out.join("");
  }
  function xFromSvg(svg,clientX,clientY,L,compact){const pt=svg.createSVGPoint();pt.x=clientX;pt.y=clientY;const matrix=svg.getScreenCTM();if(!matrix)return null;const p=pt.matrixTransform(matrix.inverse()),width=svg.viewBox.baseVal.width,left=48;return Math.max(0,Math.min(L,(p.x-left)/(width-left-16)*L));}
  // Type-selection cues share the model's ideal support/action symbols. Positions
  // here are normalized, schematic choices; the main model owns actual geometry.
  function renderChoice(kind,{id=kind,width=96}={}){
    const layouts={simple:[0,1],"cantilever-left":[0],"cantilever-right":[1],"overhang-left":[.2,1],"overhang-right":[0,.8],"overhang-both":[.2,.8]};
    if(!Object.hasOwn(layouts,kind)&&!["point","moment","udl","triangle","trapezoid","linear"].includes(kind))return "";
    if(!Number.isFinite(width)||width<80)return "";
    const height=48,y=22,X=t=>12+t*(width-24),safeId=String(id).replace(/[^a-zA-Z0-9_-]/g,'-');
    let svg=header('choice-'+safeId,width,height,true)
      .replace('Static internal-force and input-position inspection','Schematic beam or load type selection')
      .replace('DERIVED_FROM_VALIDATED_INPUTS','SCHEMATIC_TYPE_SYMBOL')
      .replace('data-derivative-revision="20261014bif1"','data-derivative-revision="20261016biflogic1"')
      .replace(/<title([^>]*)>.*?<\/title>/,`<title$1>${escape(kind)} type symbol</title>`)
      .replace(/<desc([^>]*)>.*?<\/desc>/,'<desc$1>Schematic selection symbol only, not to scale. Actual positions and values are shown in the linked beam model. Not for fabrication.</desc>');
    const out=[svg,`<g data-choice-type="${escape(kind)}">`];
    if(Object.hasOwn(layouts,kind)){
      out.push(line(X(0),y,X(1),y,'engineering-drawing__outline'));
      layouts[kind].forEach((p,i)=>{
        const sx=X(p),fixed=kind.startsWith('cantilever');
        out.push(`<g data-support="${i?'B':'A'}" data-normalized-x="${p}" data-fixed="${fixed}">`);
        if(fixed){const dir=p===0?-1:1;out.push(line(sx,6,sx,40,'engineering-drawing__outline'));for(let k=-12;k<=16;k+=7)out.push(line(sx,y+k,sx+dir*7,y+k+5,'engineering-drawing__secondary'));}
        else{out.push(`<path class="engineering-drawing__outline" d="M ${n(sx)} ${y} l -7 12 h 14 Z"/>`);if(i)out.push(`<circle cx="${n(sx-4)}" cy="38" r="2" class="engineering-drawing__secondary"/><circle cx="${n(sx+4)}" cy="38" r="2" class="engineering-drawing__secondary"/>`);}
        out.push('</g>');
      });
    }else{
      out.push(line(X(0),39,X(1),39,'engineering-drawing__outline'));
      const mid=width/2;
      if(kind==='point')out.push(arrow(mid,7,mid,35));
      if(kind==='moment'){out.push(`<path class="engineering-drawing__secondary" fill="none" d="M ${n(mid+11)} 23 A 11 11 0 1 0 ${n(mid)} 34"/>`,arrow(mid-6,34,mid,34));}
      if(['udl','triangle','trapezoid','linear'].includes(kind)){
        const [q0,q1]={udl:[1,1],triangle:[0,1],trapezoid:[.5,1],linear:[1,-1]}[kind],base=kind==='linear'?20:35,amplitude=kind==='linear'?12:24;
        const top=t=>base-amplitude*(q0+(q1-q0)*t);
        out.push(`<g data-load-profile="${kind}" data-normalized-q0="${q0}" data-normalized-q1="${q1}">`);
        if(kind==='linear')out.push(line(X(0),base,X(1),base,'engineering-drawing__dimensions'));
        out.push(line(X(0),top(0),X(1),top(1),'engineering-drawing__secondary'));
        for(let i=0;i<=4;i++){const t=i/4;out.push(arrow(X(t),top(t),X(t),base));}
        out.push('</g>');
      }
    }
    out.push('</g></svg>');return out.join('');
  }
  // Catalogue topology only. None of these IDs is admitted by the statics solver.
  const referenceLayouts=Object.freeze({
    'propped-left':{name:'Propped cantilever · fixed left',supports:[[0,'fixed'],[1,'roller']]},
    'propped-right':{name:'Propped cantilever · fixed right',supports:[[0,'roller'],[1,'fixed']]},
    'fixed-fixed':{name:'Fixed at both ends',supports:[[0,'fixed'],[1,'fixed']]},
    'continuous-two':{name:'Continuous · 2 spans',supports:[[0,'pin'],[.5,'roller'],[1,'roller']]},
    'continuous-three':{name:'Continuous · 3 spans',supports:[[0,'pin'],[1/3,'roller'],[2/3,'roller'],[1,'roller']]},
    'continuous-overhang':{name:'Continuous · with overhangs',supports:[[.15,'pin'],[.5,'roller'],[.85,'roller']]},
    'continuous-fixed':{name:'Continuous · fixed ends',supports:[[0,'fixed'],[.5,'roller'],[1,'fixed']]},
    'gerber':{name:'Gerber · internal hinge',supports:[[0,'pin'],[.4,'roller'],[1,'roller']],hinges:[.6]}
  });
  function renderReferenceLayout(kind,{id=kind,width=96}={}){
    const layout=referenceLayouts[kind];if(!layout||!Number.isFinite(width)||width<80)return '';
    const X=p=>12+p*(width-24),y=22,safeId=String(id).replace(/[^a-zA-Z0-9_-]/g,'-');
    let svg=header('reference-'+safeId,width,48,true)
      .replace('Static internal-force and input-position inspection','Reference beam topology only; not calculated')
      .replace('DERIVED_FROM_VALIDATED_INPUTS','REFERENCE_ONLY_NOT_CALCULATED')
      .replace('data-source-ref="BIF-STATICS-01"','data-source-ref="BIF-LAYOUT-TAXONOMY-20261016"')
      .replace('data-source-access-date="2026-10-14"','data-source-access-date="2026-10-16"')
      .replace('data-derivative-revision="20261014bif1"','data-derivative-revision="20261016biflayouts1"')
      .replace(/<title([^>]*)>.*?<\/title>/,`<title$1>${escape(layout.name)} · not calculated</title>`)
      .replace(/<desc([^>]*)>.*?<\/desc>/,'<desc$1>Reference layout only, schematic and not to scale. This layout cannot be selected for calculation. Supports and internal hinges indicate topology only, not current inputs. Not for fabrication.</desc>');
    const out=[svg,`<g data-reference-layout="${escape(kind)}" data-calculation-available="false">`,line(X(0),y,X(1),y,'engineering-drawing__outline')];
    layout.supports.forEach(([p,type],i)=>{
      const x=X(p);out.push(`<g data-support="${String.fromCharCode(65+i)}" data-support-type="${type}" data-normalized-x="${n(p)}">`);
      if(type==='fixed'){const dir=p===0?-1:1;out.push(line(x,6,x,40,'engineering-drawing__outline'));for(let k=-12;k<=16;k+=7)out.push(line(x,y+k,x+dir*7,y+k+5,'engineering-drawing__secondary'));}
      else{out.push(`<path class="engineering-drawing__outline" d="M ${n(x)} ${y} l -7 12 h 14 Z"/>`);if(type==='roller')out.push(`<circle cx="${n(x-4)}" cy="38" r="2" class="engineering-drawing__secondary"/><circle cx="${n(x+4)}" cy="38" r="2" class="engineering-drawing__secondary"/>`);}
      out.push('</g>');
    });
    for(const p of layout.hinges||[])out.push(`<circle data-internal-hinge="true" data-normalized-x="${p}" cx="${n(X(p))}" cy="${y}" r="3.5" class="engineering-drawing__outline"/>`);
    out.push('</g></svg>');return out.join('');
  }
  return Object.freeze({renderStructure,renderChart,renderChartLabels,chartAxes,renderChoice,renderReferenceLayout,referenceLayouts,scale,xFromSvg,format:fmt,formatResult});
});
