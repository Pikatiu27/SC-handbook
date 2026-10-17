'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.PadInputDrawing=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const f=n=>Number(n.toFixed(6));
 function geometry(state){
  const d=state?.data,r=state?.result;if(!r?.ok||!d||![d.width,d.depth,d.topDepth,d.bottomDepth].every(Number.isFinite)||d.width<=0||d.depth<=0)return null;
  if(!Number.isFinite(d.cover)||d.cover<0||!d.layers.every(l=>Number.isFinite(l.yTop)&&Number.isFinite(l.bar)&&l.bar>0&&Number.isFinite(l.spacing)&&l.spacing>=50&&l.yTop>=l.bar/2&&l.yTop<=d.depth-l.bar/2))return null;
  const twoWay=d.reinforcementLayout==='two-way';
  const layers=d.layers.map(l=>{
   const start=l.index<=2?0:d.topDepth,end=l.index<=2?d.topDepth:d.depth,top=l.index%2===1;
   const automaticY=top?start+d.cover+(twoWay?1.5:.5)*l.bar:end-d.cover-(twoWay?1.5:.5)*l.bar;
   const automatic=Math.abs(l.yTop-automaticY)<1e-6,crossY=l.yTop+(top?-l.bar:l.bar);
   const crossing=twoWay&&automatic&&crossY-l.bar/2>=start&&crossY+l.bar/2<=end;
   // A centred pitch phase illustrates an indefinitely continuing mat. It is
   // not the finite bar count or the area basis used by the capacity solver.
   const count=Math.floor((d.width-l.bar)/l.spacing)+1;
   const phase=(d.width-(count-1)*l.spacing)/2;
   return {index:l.index,y:l.yTop,diameter:l.bar,spacing:l.spacing,automatic,crossY:crossing?crossY:null,faceY:top?start:end,top,bars:Array.from({length:count},(_,i)=>phase+i*l.spacing)};
  });
  return {width:d.width,depth:d.depth,topDepth:d.topDepth,bottomDepth:d.bottomDepth,cover:d.cover,twoWay,compression:d.direction,layers,selected:state.selected||'section'};
 }
 function render(model,{width=320,height=190,compact=false}={}){
  if(!model||width<120||height<90)return '';
  const sel=model.selected,singlePadFocus=(sel==='top'&&model.bottomDepth===0)||(sel==='bottom'&&model.topDepth===0);
  // Reserve only the annotation lanes needed by this state. In particular a
  // phone's default b/D view must not lose most of its width to unused labels.
  const left=singlePadFocus?58:38,right=!singlePadFocus&&(sel==='top'||sel==='bottom'||sel==='cover')?56:sel.startsWith('layer')?42:10;
  const scale=Math.min((width-left-right)/model.width,(height-44)/model.depth);if(scale<=0)return '';
  const w=model.width*scale,h=model.depth*scale,x=left+(width-left-right-w)/2,y=8+(height-44-h)/2;
  const sx=mm=>f(x+mm*scale),sy=mm=>f(y+mm*scale),out=[`<svg class="engineering-figure__svg" data-figure-profile="SC-WEB-FIGURE-001" data-standard-adoption-id="SC-HANDBOOK-UWEDS-001" data-pre-drawing-case-review-id="SC-PAD-INPUT-20261017" data-representation-class="SECTION_INPUT_GUIDE" data-drawing-status="FOR_REVIEW" data-source-ref="CONCRETE-FLEXURE-01 PAD-DRAWING-CONVENTION-01" data-unit="mm" data-scale="NTS" data-production-mode="WEB_NATIVE_PARAMETRIC" data-rendered-variant="${compact?'phone':'desktop'}" data-screen-scale="${scale}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="padGuideTitle padGuideDesc"><title id="padGuideTitle">Reinforced concrete pad: one metre strip section; ${model.compression} face in compression</title><desc id="padGuideDesc">Section cut normal to the bending bars, shown as filled circles at entered diameter, pitch and depth. Centred pitch phase is illustrative; strip sides are not footing edges or side-cover datums. Automatic two-way mats show contacting equal-diameter perpendicular bars in elevation; omitted at manual depths. No fitments, hooks or anchorage are detailed. Not for fabrication.</desc>`];
  out.push(`<g data-geometry-role="pad-section"><rect class="engineering-drawing__outline" x="${sx(0)}" y="${sy(0)}" width="${f(w)}" height="${f(h)}"/></g>`);
  if(model.topDepth>0&&model.bottomDepth>0)out.push(`<line data-role="pad-interface" class="engineering-drawing__secondary" x1="${sx(0)}" x2="${sx(model.width)}" y1="${sy(model.topDepth)}" y2="${sy(model.topDepth)}"/>`);
  for(const l of model.layers){const active=sel==='layer'+l.index;
   out.push(`<g data-layer="${l.index}" data-y-mm="${l.y}" data-pitch-mm="${l.spacing}" data-state="${active?'SELECTED':'DEFAULT'}">`);
   if(l.crossY!==null)out.push(`<rect data-role="crossing-bar" data-centre-y-mm="${l.crossY}" x="${sx(0)}" y="${sy(l.crossY-l.diameter/2)}" width="${f(w)}" height="${f(l.diameter*scale)}" class="engineering-drawing__bar"/>`);
   for(const bx of l.bars)out.push(`<circle data-role="cut-bar" data-x-mm="${bx}" data-y-mm="${l.y}" data-diameter-mm="${l.diameter}" class="engineering-drawing__bar${active?' pp-active-bar':''}" cx="${sx(bx)}" cy="${sy(l.y)}" r="${f(l.diameter*scale/2)}"/>`);
   out.push('</g>');
  }
  const cy=model.compression==='top'?y:y+h;out.push(`<line data-role="compression-face" class="engineering-drawing__active" x1="${sx(0)}" x2="${sx(model.width)}" y1="${f(cy)}" y2="${f(cy)}"/>`);
  const arrow=(name,tx,ty,dx,dy)=>`<path class="engineering-drawing__arrow" data-dimension-end="${name}" data-tip-x="${f(tx)}" data-tip-y="${f(ty)}" d="M ${f(tx+dx*4-dy*1.2)} ${f(ty+dy*4+dx*1.2)} L ${f(tx)} ${f(ty)} L ${f(tx+dx*4+dy*1.2)} ${f(ty+dy*4-dx*1.2)} Z"/>`;
  function vertical(id,from,to,px,label){const a=sy(from),b=sy(to),outside=b-a<12;
   out.push(`<g class="engineering-drawing__dimensions" data-geometry-role="${id}" data-vertical-arrows="${outside?'outside':'inside'}"><path d="M ${sx(0)} ${a} H ${f(px-4)} M ${sx(0)} ${b} H ${f(px-4)} M ${px} ${f(a-(outside?6:0))} V ${f(b+(outside?6:0))}"/>${arrow(id+'-start',px,a,0,outside?-1:1)}${arrow(id+'-end',px,b,0,outside?1:-1)}</g><text class="engineering-drawing__text engineering-drawing__symbol" x="${f(px-8)}" y="${f((a+b)/2+4)}" text-anchor="end">${label}</text>`);
  }
  // Overall left dimension and one optional focused right dimension; fixed screen text.
  vertical('D',0,model.depth,f(x-17),singlePadFocus?(sel==='top'?'Dtop':'Dbot'):'D');
  const l=model.layers.find(l=>sel==='layer'+l.index);
  if(singlePadFocus){/* Overall and selected depth coincide: one dimension only. */}
  else if(l||sel==='top'||sel==='bottom'||sel==='cover'){
   const coverMat=model.layers.find(m=>m.automatic),coverFrom=coverMat?.top?coverMat.faceY:coverMat?.faceY-model.cover;
   const from=sel==='cover'?coverFrom:sel==='bottom'?model.topDepth:0,to=sel==='cover'?coverFrom+model.cover:l?l.y:sel==='top'?model.topDepth:model.depth,label=sel==='cover'?'cnom':l?'y'+l.index:sel==='top'?'Dtop':'Dbot';
   if(to>from){const px=f(x+w+17),a=sy(from),b=sy(to),outside=b-a<12;out.push(`<g class="engineering-drawing__dimensions" data-vertical-arrows="${outside?'outside':'inside'}"><path d="M ${sx(model.width)} ${a} H ${f(px+4)} M ${sx(model.width)} ${b} H ${f(px+4)} M ${px} ${f(a-(outside?6:0))} V ${f(b+(outside?6:0))}"/>${arrow('focus-start',px,a,0,outside?-1:1)}${arrow('focus-end',px,b,0,outside?1:-1)}</g><text class="engineering-drawing__text engineering-drawing__symbol" x="${f(px+5)}" y="${f((a+b)/2+4)}">${label}</text>`);}
  }else{const py=f(y+h+15),outside=w<12;out.push(`<g class="engineering-drawing__dimensions" data-horizontal-arrows="${outside?'outside':'inside'}"><path d="M ${f(x)} ${f(y+h+3)} V ${f(py+4)} M ${f(x+w)} ${f(y+h+3)} V ${f(py+4)} M ${f(x-(outside?6:0))} ${py} H ${f(x+w+(outside?6:0))}"/>${arrow('b-start',x,py,outside?-1:1,0)}${arrow('b-end',x+w,py,outside?1:-1,0)}</g><text class="engineering-drawing__text engineering-drawing__symbol" x="${f(x+w/2)}" y="${f(py+15)}" text-anchor="middle">b</text>`);}
  out.push('</svg>');return out.join('').replace(/<text class="([^"]+)" x="([^"]+)" y="([^"]+)"/g,'<text x="$2" y="$3" class="$1"').replace(/<rect class="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g,'<rect x="$2" y="$3" width="$4" height="$5" class="$1"').replace(/>D(top|bot)<\/text>/g,'>D<tspan baseline-shift="sub" font-style="normal">$1</tspan></text>').replace(/>y([1-4])<\/text>/g,'>y<tspan baseline-shift="sub" font-style="normal">$1</tspan></text>').replace(/>cnom<\/text>/g,'>c<tspan baseline-shift="sub" font-style="normal">nom</tspan></text>');
 }
 return Object.freeze({geometry,render});
});
