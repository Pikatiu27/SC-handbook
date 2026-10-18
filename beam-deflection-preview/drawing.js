"use strict";
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./bif-snapshot/drawing'):root.BeamForcesDrawing);if(typeof module==='object'&&module.exports)module.exports=api;root.BeamDeflectionDrawing=api;})(typeof globalThis!=='undefined'?globalThis:this,function(D){
  const n=v=>Number(v.toFixed(6)),line=(x1,y1,x2,y2,role,extra='')=>`<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" class="engineering-drawing__${role}" ${extra}/>`;
  function axes(result,key,options){
    if(!result?.valid||!['delta','theta'].includes(key))return null;
    const ex=result.extrema[key],proxy={valid:true,input:{length:result.length},extrema:{M:{min:{M:ex.min[key]*1000},max:{M:ex.max[key]*1000}}}};
    const a=D.chartAxes(proxy,'M',options);if(!a)return null;
    if(key==='delta'){const Y=a.Y;a.Y=v=>a.top+a.bottom-Y(v);a.yTicks=a.yTicks.map(t=>({...t,y:a.Y(t.value)}));}
    return a;
  }
  function render(result,key,options={}){
    const a=axes(result,key,options);if(!a)return '';
    const {width,height,X,Y,top,bottom}=a,x=options.x??0,L=result.length,unit=key==='delta'?'mm':'mrad',name=key==='delta'?'Deflection':'Rotation';
    const out=[`<svg class="engineering-figure__svg" data-figure-profile="SC-WEB-FIGURE-001" data-standard-adoption-id="SC-HANDBOOK-UWEDS-001" data-pre-drawing-case-review-id="SC-BD-FIGURES-20261016" data-representation-class="OTHER_CONTROLLED" data-drawing-status="FOR_REVIEW" data-view-id="BD-${key}" data-purpose="Elastic beam displacement inspection" data-projection="ORTHOGRAPHIC" data-scale="NTS" data-unit="m,${unit}" data-production-mode="WEB_NATIVE_PARAMETRIC" data-source-ref="BD-ELASTIC-01" data-source-access-date="2026-10-16" data-derivative-revision="20261016bd1" data-rendered-variant="${options.compact?'compact':'desktop'}" data-source-status="DERIVED_FROM_VALIDATED_INPUTS" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="bd-${key}-title bd-${key}-desc"><title id="bd-${key}-title">${name} diagram</title><desc id="bd-${key}-desc">Constant EI elastic response. x from 0 to ${L} m; ordinate from ${a.domain[0]} to ${a.domain[1]} ${unit}. ${key==='delta'?'Downward displacement is positive and plotted below zero.':'Clockwise slope is positive and plotted above zero.'} Independent ordinate scale; not a true-scale deformed shape. Screen review only; not for fabrication.</desc><g data-geometry-role="plot" data-axis-power="${a.exponent}">`];
    for(const t of a.yTicks)if(t.value!==0)out.push(line(X(0),t.y,X(L),t.y,'dimensions','class-ignore="grid" opacity="0.18"'));
    for(const t of a.xTicks.slice(1,-1))out.push(line(t.x,top,t.x,bottom,'dimensions','opacity="0.18"'));
    out.push(line(X(0),Y(0),X(L),Y(0),'outline','data-zero-baseline="true"'),line(X(0),bottom,X(L)+6,bottom,'secondary'),line(X(0),top-7,X(0),bottom,'secondary'));
    for(const t of a.yTicks)out.push(line(X(0)-4,t.y,X(0),t.y,'dimensions'));
    for(const t of a.xTicks)out.push(line(t.x,bottom,t.x,bottom+4,'dimensions'));
    out.push(`<path class="engineering-drawing__secondary" d="M ${n(X(L)+2)} ${bottom-3} l 4 3 l -4 3"/>`);
    const samples=[...result.samples,result.extrema[key].min,result.extrema[key].max].sort((p,q)=>p.x-q.x),d=samples.map((p,i)=>`${i?'L':'M'} ${n(X(p.x))} ${n(Y(p[key]*1000))}`).join(' ');
    out.push(`<path class="bif-fill" d="${d} L ${n(X(L))} ${n(Y(0))} L ${n(X(0))} ${n(Y(0))} Z"/><path class="engineering-drawing__active bif-chart-path" data-response-curve="${key}" d="${d}"/>`);
    if(options.coordinateValid!==false){const p=result.at(x);if(p)out.push(line(X(x),top,X(x),bottom,'symbolic','data-reading-guide="true"'),`<circle class="bif-point" data-reading-point="${key}" cx="${n(X(x))}" cy="${n(Y(p[key]*1000))}" r="3.5"/>`);}
    out.push(`<rect class="bif-hit" data-section-hit="true" data-interactive-id="BD-${key}-x" data-annotation-id="BD-${key}-x" data-object-id="beam" data-quantity-id="x" data-source-id="BD-ELASTIC-01" data-state="DEFAULT" x="${a.left}" y="${top}" width="${width-a.left-a.right}" height="${bottom-top}"/>`,'</g></svg>');
    return out.join('');
  }
  function labels(result,key,options={}){
    const a=axes(result,key,options);if(!a)return '';
    return '<div class="bif-axis-labels" aria-hidden="true">'+a.yTicks.map(t=>`<span class="bif-axis-y" data-axis="y" style="left:${a.left-9}px;top:${n(t.y)}px">${t.label}</span>`).join('')+a.xTicks.map((t,i)=>`<span class="bif-axis-x${i===0?' bif-axis-start':i===a.xTicks.length-1?' bif-axis-end':''}" data-axis="x" style="left:${n(t.x)}px;top:${a.bottom+7}px">${t.label}</span>`).join('')+'</div>';
  }
  return Object.freeze({render,labels,axes});
});
