"use strict";
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;root.ConcreteBeamDrawing=api;})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fixed=value=>Number(value.toFixed(6));
  function geometry(input,result){
    if(!result?.valid||![input.width,input.depth,input.cover].every(Number.isFinite))return null;
    const fitmentDiameter=input.fitments==="vertical"?Number(input.fitmentBar.slice(1)):0;
    const inside=input.cover+fitmentDiameter;
    if(!Number.isFinite(inside)||inside<=0||input.width<=2*inside||input.depth<=2*inside)return null;
    const bars=[];
    for(const row of result.rows){
      const offset=row.face==="top"?row.yTop:input.depth-row.yTop;
      for(let index=0;index<row.count;index++)bars.push({id:`${row.face}-bar-${index+1}`,face:row.face,x:row.count===1?input.width/2:offset+(input.width-2*offset)*index/(row.count-1),y:row.yTop,radius:row.bar.diameter/2,diameter:row.bar.diameter});
    }
    if(bars.some(bar=>![bar.x,bar.y,bar.radius].every(Number.isFinite)||bar.radius<=0||bar.x-bar.radius<inside-1e-8||bar.x+bar.radius>input.width-inside+1e-8||bar.y-bar.radius<inside-1e-8||bar.y+bar.radius>input.depth-inside+1e-8))return null;
    const diameter=fitmentDiameter;
    const fitment=diameter?{id:"fitment-envelope",diameter,inset:input.cover+diameter/2,width:input.width-2*input.cover-diameter,height:input.depth-2*input.cover-diameter,
      legs:Array.from({length:input.legs},(_,index)=>({id:`effective-leg-${index+1}`,x:input.cover+diameter/2+(input.width-2*input.cover-diameter)*index/(input.legs-1),symbolic:index>0&&index<input.legs-1}))}:null;
    return {width:input.width,depth:input.depth,cover:input.cover,compression:input.direction,bars,fitment,top:input.topCount?`${input.topCount}${input.topBar}`:"None",bottom:input.bottomCount?`${input.bottomCount}${input.bottomBar}`:"None",fitmentLabel:diameter?`${input.legs} legs · ${input.fitmentBar} @ ${input.spacing} mm`:"No fitments"};
  }
  function render(model,{width=220,height=220,compact=false}={}){
    if(!model||!Number.isFinite(width)||!Number.isFinite(height)||width<90||height<80)return "";
    // Model centres and bar radii remain in mm and scale uniformly. Fitments use
    // a schematic fixed screen stroke; annotation/font roles come from the shared profile.
    const left=10,right=32,top=8,bottom=34;
    const availableW=width-left-right,availableH=height-top-bottom,scale=Math.min(availableW/model.width,availableH/model.depth);
    const w=model.width*scale,h=model.depth*scale,x=left+(availableW-w)/2,y=top+(availableH-h)/2;
    const sx=mm=>fixed(x+mm*scale),sy=mm=>fixed(y+mm*scale),fmt=n=>Number(n.toFixed(1)).toString();
    const title=`Rectangular beam ${fmt(model.width)} by ${fmt(model.depth)} mm. Top ${model.top}; bottom ${model.bottom}. ${model.fitmentLabel}. ${model.compression} face in compression.`;
    const out=[`<svg class="engineering-figure__svg" data-figure-profile="SC-WEB-FIGURE-001" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="cbSectionTitle cbSectionDesc" data-standard-adoption-id="SC-HANDBOOK-UWEDS-001" data-pre-drawing-case-review-id="SC-CB-SECTION-20261014" data-representation-class="MEMBER_DETAIL" data-drawing-status="FOR_REVIEW" data-view-id="CB-SECTION" data-purpose="Input geometry and bar row check" data-projection="ORTHOGRAPHIC" data-scale="NTS" data-unit="mm" data-production-mode="WEB_NATIVE_PARAMETRIC" data-source-ref="CB-SOURCE-20261014" data-source-access-date="2026-10-14" data-derivative-revision="20261014figure6" data-rendered-variant="${compact?"compact":"desktop"}" data-source-status="DERIVED_FROM_VALIDATED_INPUTS" data-screen-scale="${scale}"><title id="cbSectionTitle">${escape(title)}</title><desc id="cbSectionDesc">Section geometry from entered values. Fitment envelope and effective legs are schematic; hooks and bends are not detailed. Not for fabrication.</desc>`];
    out.push(`<g data-geometry-role="concrete-section"><rect x="${sx(0)}" y="${sy(0)}" width="${fixed(w)}" height="${fixed(h)}" class="cb-concrete-outline engineering-drawing__outline"/></g>`);
    if(model.fitment){const f=model.fitment;
      out.push(`<g data-geometry-role="fitment-envelope"><rect x="${sx(f.inset)}" y="${sy(f.inset)}" width="${fixed(f.width*scale)}" height="${fixed(f.height*scale)}" class="cb-fitment-envelope engineering-drawing__secondary"/>`);
      for(const leg of f.legs.filter(leg=>leg.symbolic))out.push(`<line data-effective-leg="${leg.id}" data-symbolic="true" x1="${sx(leg.x)}" x2="${sx(leg.x)}" y1="${sy(f.inset)}" y2="${sy(model.depth-f.inset)}" class="cb-effective-leg engineering-drawing__symbolic"/>`);
      out.push("</g>");
    }
    out.push('<g data-geometry-role="longitudinal-bars">');
    for(const bar of model.bars)out.push(`<circle data-bar-id="${bar.id}" data-face="${bar.face}" data-x-mm="${bar.x}" data-y-mm="${bar.y}" data-diameter-mm="${bar.diameter}" cx="${sx(bar.x)}" cy="${sy(bar.y)}" r="${fixed(bar.radius*scale)}" class="cb-longitudinal-bar engineering-drawing__bar"/>`);
    out.push('</g>');
    const cy=model.compression==="top"?y:y+h;
    out.push(`<g data-geometry-role="compression-face"><line x1="${fixed(x)}" y1="${fixed(cy)}" x2="${fixed(x+w)}" y2="${fixed(cy)}" class="cb-compression-edge engineering-drawing__active"/></g>`);
    const dimY=y+h+15,dimX=x+w+15;
    const arrow=(name,tipX,tipY,dx,dy)=>`<path class="engineering-drawing__arrow" data-dimension-end="${name}" data-tip-x="${fixed(tipX)}" data-tip-y="${fixed(tipY)}" d="M ${fixed(tipX+dx*4-dy*1.2)} ${fixed(tipY+dy*4+dx*1.2)} L ${fixed(tipX)} ${fixed(tipY)} L ${fixed(tipX+dx*4+dy*1.2)} ${fixed(tipY+dy*4-dx*1.2)} Z"/>`;
    const horizontalOutside=w<12,verticalOutside=h<12;
    out.push(`<g data-geometry-role="dimensions" data-horizontal-arrows="${horizontalOutside?"outside":"inside"}" data-vertical-arrows="${verticalOutside?"outside":"inside"}" class="cb-dimension-lines engineering-drawing__dimensions"><path d="M ${fixed(x)} ${fixed(y+h+4)} V ${fixed(dimY+4)} M ${fixed(x+w)} ${fixed(y+h+4)} V ${fixed(dimY+4)} M ${fixed(x-(horizontalOutside?6:0))} ${fixed(dimY)} H ${fixed(x+w+(horizontalOutside?6:0))} M ${fixed(x+w+4)} ${fixed(y)} H ${fixed(dimX+4)} M ${fixed(x+w+4)} ${fixed(y+h)} H ${fixed(dimX+4)} M ${fixed(dimX)} ${fixed(y-(verticalOutside?6:0))} V ${fixed(y+h+(verticalOutside?6:0))}"/>${arrow("b-start",x,dimY,horizontalOutside?-1:1,0)}${arrow("b-end",x+w,dimY,horizontalOutside?1:-1,0)}${arrow("D-start",dimX,y,0,verticalOutside?-1:1)}${arrow("D-end",dimX,y+h,0,verticalOutside?1:-1)}</g>`);
    out.push(`<g data-geometry-role="annotations" class="cb-dimension-text engineering-drawing__text engineering-drawing__symbol"><text x="${fixed(x+w/2)}" y="${fixed(dimY+15)}" text-anchor="middle">b</text><text x="${fixed(dimX+5)}" y="${fixed(y+h/2+4)}">D</text>`);
    out.push("</g></svg>");return out.join("");
  }
  return Object.freeze({geometry,render});
});
