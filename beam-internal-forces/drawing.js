"use strict";
(function(root,factory){const api=factory(()=>typeof module==="object"&&module.exports?require('../engineering-number-format.js'):root.EngineeringNumberFormat);if(typeof module==="object"&&module.exports)module.exports=api;root.BeamForcesDrawing=api;})(typeof globalThis!=="undefined"?globalThis:this,function(formatter){
  const n=v=>Number(v.toFixed(6)),escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt=v=>!Number.isFinite(v)?"—":v===0?"0":Math.abs(v)<.01||Math.abs(v)>=1e6?formatter().decimalHalfUpSignificant(v,6):formatter().decimalHalfUp(v,2).replace(/\.?0+$/,'');
  const interactive=(object,quantity,state)=>`data-interactive-id="BIF-${escape(object)}-${quantity}" data-annotation-id="BIF-${escape(object)}-${quantity}" data-object-id="${escape(object)}" data-quantity-id="${quantity}" data-source-id="BIF-STATICS-01" data-state="${state}"`;
  function viewport(width,height,compact){const left=compact?16:64,right=16;return {width,height,left,right,X:(x,L)=>left+x/L*(width-left-right)};}
  function header(kind,w,h,compact){return `<svg class="engineering-figure__svg" data-figure-profile="SC-WEB-FIGURE-001" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="bif-${kind}-title bif-${kind}-desc" data-standard-adoption-id="SC-HANDBOOK-UWEDS-001" data-pre-drawing-case-review-id="SC-CALC-BIF-20261016" data-representation-class="OTHER_CONTROLLED" data-drawing-status="FOR_REVIEW" data-view-id="BIF-${kind}" data-purpose="Static internal-force and input-position inspection" data-projection="ORTHOGRAPHIC" data-scale="NTS" data-unit="m,kN,kN.m" data-production-mode="WEB_NATIVE_PARAMETRIC" data-source-ref="BIF-STATICS-01" data-source-access-date="2026-10-14" data-derivative-revision="20261016calcaudit1" data-rendered-variant="${compact?"compact":"desktop"}" data-source-status="DERIVED_FROM_VALIDATED_INPUTS"><title id="bif-${kind}-title">${escape(kind==="structure"?"Beam arrangement and applied loads":kind==="V"?"Shear force diagram":"Bending moment diagram")}</title><desc id="bif-${kind}-desc">Positions and results calculated from entered loads. Support/load symbols are schematic; separate ordinate scales. Left and right values preserve force/couple jumps. Screen review only, not for fabrication.</desc>`;}
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
    const qscale=Math.max(Number.MIN_VALUE,...result.input.loads.filter(l=>["udl","linear"].includes(l.type)).flatMap(l=>[Math.abs(l.q0),Math.abs(l.q1)]));
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
  function scale(result,key){const e=result.extrema[key],max=Math.max(Math.abs(e.min[key]),Math.abs(e.max[key]));return {min:Math.min(0,e.min[key]),max:Math.max(0,e.max[key]),bound:max>0?max*1.15:1};}
  function renderChart(result,key,{width=500,height=132,compact=false,x=0,side="right"}={}){
    if(!result?.valid||width<90||height<80)return "";
    const v=viewport(width,height,compact),L=result.input.length,X=t=>v.X(t,L),top=14,bottom=height-27,sc=scale(result,key),Y=value=>(top+bottom)/2-value/sc.bound*(bottom-top)/2;
    const out=[header(key,width,height,compact),'<g data-geometry-role="plot">',line(X(0),Y(0),X(L),Y(0),"engineering-drawing__outline"),line(X(0),top,X(0),bottom,"engineering-drawing__dimensions")];
    const d=result.samples.map((p,i)=>`${i?"L":"M"} ${n(X(p.x))} ${n(Y(p[key]))}`).join(" ");
    out.push(`<path class="bif-fill" d="${d} L ${n(X(L))} ${n(Y(0))} L ${n(X(0))} ${n(Y(0))} Z"/><path class="engineering-drawing__active bif-chart-path" data-force-curve="${key}" d="${d}"/>`);
    out.push(text(X(0),height-6,"0"),text(X(L),height-6,fmt(L),"end"));
    if(!compact){const axis=v=>v!==0&&(Math.abs(v)>=1e4||Math.abs(v)<.01)?Number(formatter().decimalHalfUpSignificant(v,1)).toExponential(0):fmt(v);out.push(text(X(0)-7,Y(sc.max)+4,axis(sc.max),"end"));if(sc.min!==sc.max)out.push(text(X(0)-7,Y(sc.min)+4,axis(sc.min),"end"));}
    const read=result.at(x,side);out.push(line(X(x),top,X(x),bottom,"engineering-drawing__symbolic bif-guide",'data-layer="INTERACTION_HIGHLIGHT" data-reading-guide="true" '+interactive('section-'+key,'x','SELECTED')),`<circle class="bif-point" data-layer="INTERACTION_HIGHLIGHT" ${interactive('section',key,'SELECTED')} data-reading-point="${key}" cx="${n(X(x))}" cy="${n(Y(read[key]))}" r="3.5"/>`);
    out.push(`<rect class="bif-hit" data-layer="INTERACTION_HIT_AREA" ${interactive('plot-'+key,'x','DEFAULT')} data-section-hit="true" x="${v.left}" y="${top}" width="${width-v.left-v.right}" height="${bottom-top}"/>`,'</g></svg>');return out.join("");
  }
  function xFromSvg(svg,clientX,clientY,L,compact){const pt=svg.createSVGPoint();pt.x=clientX;pt.y=clientY;const matrix=svg.getScreenCTM();if(!matrix)return null;const p=pt.matrixTransform(matrix.inverse()),width=svg.viewBox.baseVal.width,left=compact?16:64;return Math.max(0,Math.min(L,(p.x-left)/(width-left-16)*L));}
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
  return Object.freeze({renderStructure,renderChart,renderChoice,scale,xFromSvg,format:fmt});
});
