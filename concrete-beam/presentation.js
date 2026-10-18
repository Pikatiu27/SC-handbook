"use strict";
(function(root,factory){
  const api=factory(root.EngineeringNumberFormat||(typeof module==="object"?require("../engineering-number-format.js"):null));
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.ConcreteBeamPresentation=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(numbers){
  const fmt=(n,d=1)=>Number.isFinite(n)?numbers.decimalHalfUp(n,d):"—";
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const conciseNotes={
    "Confirm the stated section applicability before using capacities.":"Confirm method applicability to view capacities.",
    "k_uo > 0.36 or no tension row: conditional high-neutral-axis design is outside this first version.":"k_uo > 0.36 or no tension row: outside the flexural method.",
    "Minimum flexural reinforcement screen not satisfied; review Cl. 8.1.6.1 before adopting this section.":"Minimum flexural steel requires review · Cl. 8.1.6.1.",
    "Provided fitments are below the minimum transverse reinforcement ratio.":"Minimum shear steel not satisfied.",
    "Fitment longitudinal spacing exceeds the conservative ordinary limit min(0.5D, 300 mm).":"Longitudinal spacing exceeds min(0.5D, 300 mm).",
    "Assumed equally spaced fitment legs overlap or exceed the selected transverse-spacing limit.":"Effective legs overlap or exceed the spacing limit.",
    "No-fitment shear capacity is conditional: separately check the transverse-reinforcement trigger shown below.":"No-fitment shear capacity is conditional; check the trigger below."
  };
  const note=value=>escape(conciseNotes[value]||value).replace(/k_uo/g,"k<sub>uo</sub>").replace(/\bCl\./g,"AS 3600 Cl.").replace(/phi =/g,"φ =").replace(/D &gt;=/g,"D ≥");
  const labels={satisfied:"Satisfied",review:"Review required",unavailable:"Not evaluated"};
  function screens(input,r){
    const row=(id,title,value,status)=>({id,title,value,status,label:labels[status]});
    const valid=r.valid&&input.applicable===true;
    const flex=valid&&r.d>0&&r.section.kuo<=.36;
    const shear=valid&&input.aggregate>=10&&r.d>0;
    const condition=(ready,passes)=>!ready?"unavailable":passes?"satisfied":"review";
    const rows=[row("minimum-flexure","Minimum flexural steel",r.valid?`${fmt(r.ast,1)} / ${fmt(r.astMin,1)} mm² · provided / min.`:"Input required",condition(flex,r.minimumFlexure))];
    if(valid&&!flex)rows[0].value="Outside flexural method";
    if(input.fitments==="none"){
      rows.push(row("no-fitment-trigger","Fitment requirement",r.valid?(input.depth>=750?"Required: D ≥ 750 mm":`Compare design shear with ${fmt(r.noFitmentThreshold)} kN`):"Input required",shear?"review":"unavailable"));
    }else{
      const v=r.shear;
      rows.push(row("minimum-fitments","Minimum shear steel",r.valid?`${fmt(v.asvPerS,3)} / ${fmt(v.asvMinPerS,3)} mm²/mm · provided / min.`:"Input required",condition(shear,v?.minShearReoProvided)),
        row("longitudinal-spacing","Longitudinal spacing",r.valid?`${fmt(input.spacing)} ${input.spacing<=r.fitmentMaxSpacing?"≤":">"} ${fmt(r.fitmentMaxSpacing,0)} mm`:"Input required",condition(shear,input.spacing<=r.fitmentMaxSpacing)),
        row("transverse-spacing","Transverse leg spacing",r.valid?`${fmt(r.transverseSpacing)} ${r.transverseSpacing<=r.transverseMax?"≤":">"} ${fmt(r.transverseMax,0)} mm`:"Input required",condition(shear,r.valid&&r.transverseSpacing>Number(input.fitmentBar.slice(1))&&r.transverseSpacing<=r.transverseMax)));
      if(r.valid&&r.transverseSpacing<=Number(input.fitmentBar.slice(1)))rows[3].value="Effective legs overlap";
    }
    if(!valid&&r.valid)for(const item of rows)item.value="Confirm method applicability";
    else if(!shear&&r.valid&&input.aggregate<10)for(const item of rows.slice(1))item.value="Aggregate ≥ 10 mm required";
    return rows;
  }
  function renderScreens(input,r,compact=false){
    return screens(input,r).map(item=>`<div class="cb-screen-line" data-state="${item.status}"><span class="cb-screen-name">${item.title}</span><strong class="cb-screen-status">${item.label}</strong>${!compact||item.status==="review"?`<span class="cb-screen-value">${escape(item.value)}</span>`:""}</div>`).join("");
  }
  function primaryIssues(r){
    if(!r.valid)return [];
    // These causes already have an explicit card qualification or review row.
    const covered=new Set([
      "Minimum flexural reinforcement screen not satisfied; review Cl. 8.1.6.1 before adopting this section.",
      "Provided fitments are below the minimum transverse reinforcement ratio.",
      "Fitment longitudinal spacing exceeds the conservative ordinary limit min(0.5D, 300 mm).",
      "Assumed equally spaced fitment legs overlap or exceed the selected transverse-spacing limit.",
      "D >= 750 mm requires transverse reinforcement (Cl. 8.2.1.6).",
      "Web crushing governs shear; phi = 0.70.",
      "No-fitment shear capacity is conditional: separately check the transverse-reinforcement trigger shown below."
    ]);
    return [...new Set([...r.flexureReasons,...r.shearReasons,...r.notes])].filter(value=>!covered.has(value));
  }
  function geometry(r){
    if(!r.valid)return [];
    const depths=Math.abs(r.d-r.section.d0)<=1e-7*Math.max(1,Math.abs(r.d),Math.abs(r.section.d0))
      ? [["Effective depth, d = d<sub>o</sub>",`${fmt(r.d)} mm`]]
      : [["Tension centroid, d",`${fmt(r.d)} mm`],["Extreme tension, d<sub>o</sub>",`${fmt(r.section.d0)} mm`]];
    return r.rows.map(row=>[`${row.face === "top" ? "Top" : "Bottom"} · ${row.count}${row.bar.designation}`,`${fmt(row.area,1)} mm² · y = ${fmt(row.yTop)} mm`]).concat(depths,
      [["Shear depth, d<sub>v</sub>",`${fmt(r.shear.dv)} mm`]],
      r.rows.filter(row=>row.clearGap != null).map(row=>[`${row.face === "top" ? "Top" : "Bottom"} clear gap · not checked`,`${fmt(row.clearGap)} mm`]));
  }
  function traces(input,r){
    const rows=[],ok=r.valid,s=r.section,v=r.shear,checks=screens(input,r);
    const check=id=>checks.find(item=>item.id===id);
    const checked=(id,value)=>check(id).status==="unavailable"?"Not evaluated":`${value} · ${check(id).label}`;
    const checkScope=(id,fallback)=>check(id).status==="unavailable"?escape(check(id).value):fallback;
    const checkState=id=>check(id).status==="satisfied"?"":"warning";
    const add=(id,title,reference,formula,evaluate)=>{
      const values=ok?evaluate():{substitution:"Input required",result:"Not evaluated",applicability:"Correct the highlighted inputs.",state:"warning"};
      rows.push({id,title,reference,formula,...values});
    };
    const denied=reasons=>reasons.length?reasons.map(note).join(" "):"";
    add("stress-block","Stress block factors","AS 3600 Cl. 8.1.3",
      "α<sub>2</sub> = max(0.67, 0.85 − 0.0015f′<sub>c</sub>); γ = max(0.67, 0.97 − 0.0025f′<sub>c</sub>)",()=>({
        substitution:`α<sub>2</sub> = max(0.67, 0.85 − 0.0015 × ${fmt(input.fc)}); γ = max(0.67, 0.97 − 0.0025 × ${fmt(input.fc)})`,
        result:`α<sub>2</sub> = ${fmt(r.factors.alpha2,4)}; γ = ${fmt(r.factors.gamma,4)}`,applicability:"Rectangular compression block."}));
    add("equilibrium","Flexural equilibrium","AS 3600 Cl. 8.1.2; AS 3600 Cl. 8.1.3",
      "a = γx; C<sub>c</sub> = α<sub>2</sub>f′<sub>c</sub>ba; C<sub>c</sub> + ΣF<sub>i</sub> = 0",()=>({
        substitution:`a = ${fmt(r.factors.gamma,4)} × ${fmt(s.x,3)} = ${fmt(s.blockDepth,3)} mm; C<sub>c</sub> = ${fmt(r.factors.alpha2,4)} × ${fmt(input.fc)} × ${fmt(input.width)} × ${fmt(s.blockDepth,3)} / 1000 = ${fmt(s.cc/1000,3)} kN; ΣF<sub>i</sub> = ${fmt(s.layers.reduce((n,l)=>n+l.force,0)/1000,3)} kN`,
        result:`Neutral axis x = ${fmt(s.x,3)} mm; force residual = ${fmt(s.axial,3)} N`,applicability:"Pure bending; net steel forces include displaced concrete."}));
    add("steel-forces","Steel layer forces","AS 3600 Cl. 8.1.2; AS 3600 Cl. 8.1.3",
      "ε<sub>i</sub> = ε<sub>cu</sub>(x − d<sub>i</sub>)/x; f<sub>i</sub> = clamp(E<sub>s</sub>ε<sub>i</sub>, −f<sub>sy</sub>, f<sub>sy</sub>); F<sub>i</sub> = A<sub>i</sub>(f<sub>i</sub> − f<sub>c,disp,i</sub>)",()=>({
        substitution:`ε<sub>cu</sub> = 0.003; E<sub>s</sub> = 200,000 MPa; f<sub>sy</sub> = 500 MPa; `+s.layers.map(l=>`${l.face}: ε = 0.003(${fmt(s.x,3)} − ${fmt(l.d)})/${fmt(s.x,3)}; F = ${fmt(l.area)} × (${fmt(l.stress,2)} − ${fmt(l.displacedConcreteStress,2)}) / 1000`).join("; "),
        result:s.layers.map(l=>`${l.face}: ε = ${fmt(l.strain,6)}; f = ${fmt(l.stress,2)} MPa; F<sub>i</sub> = ${fmt(l.force/1000,3)} kN`).join("<br>"),applicability:"Compression positive; concrete correction only inside the block."}));
    add("nominal-moment","Nominal moment","AS 3600 Cl. 8.1.3",
      "M<sub>uo</sub> = |C<sub>c</sub>y<sub>Cc</sub> + ΣF<sub>i</sub>y<sub>i</sub>| / 10<sup>6</sup>",()=>({
        substitution:`|${fmt(s.cc,1)} × ${fmt(s.yCc,3)} + (${s.layers.map(l=>`${fmt(l.force,1)} × ${fmt(l.yTop,1)}`).join(" + ")})| / 10<sup>6</sup>`,
        result:`Nominal M<sub>uo</sub> = ${fmt(s.muo,3)} kN·m`,applicability:"Forces in N; lever arms in mm from the section top."}));
    add("design-moment","Design moment","AS 3600 Table 2.2.2; AS 3600 Cl. 8.1.5",
      "k<sub>uo</sub> = x/d<sub>o</sub>; φ = clamp(1.24 − 13k<sub>uo</sub>/12, 0.65, 0.85); φM<sub>uo</sub> = φ × M<sub>uo</sub>",()=>({
        substitution:`k<sub>uo</sub> = ${fmt(s.x,3)} / ${fmt(s.d0,1)} = ${fmt(s.kuo,4)}; φ = clamp(1.24 − 13 × ${fmt(s.kuo,4)}/12, 0.65, 0.85) = ${fmt(s.phi,4)}; ${fmt(s.phi,4)} × ${fmt(s.muo,3)}`,
        result:r.flexureCapacity==null?"Not evaluated":`Design φM<sub>uo</sub> = ${fmt(r.flexureCapacity)} kN·m`,
        applicability:denied(r.flexureReasons)||(!r.minimumFlexure?"Review required · minimum flexural steel.":"Class N; k<sub>uo</sub> ≤ 0.36; section resistance only."),state:r.flexureCapacity==null||!r.minimumFlexure?"warning":""}));
    add("minimum-flexure","Minimum flexural steel","AS 3600 Cl. 3.1.1.3; AS 3600 Cl. 8.1.6.1",
      "f′<sub>ct.f</sub> = 0.6√f′<sub>c</sub>; A<sub>st,min</sub> = 0.20(D/d)²(f′<sub>ct.f</sub>/f<sub>sy</sub>)bd",()=>({
        substitution:`0.20 × (${fmt(input.depth)}/${fmt(r.d)})² × (${fmt(r.fctf,4)}/500) × ${fmt(input.width)} × ${fmt(r.d)}`,
        result:checked("minimum-flexure",`Minimum A<sub>st,min</sub> = ${fmt(r.astMin)} mm²; provided ${fmt(r.ast)} mm²`),
        applicability:checkScope("minimum-flexure","Selected flexural-area screen; complete detailing excluded."),state:checkState("minimum-flexure")}));
    add("shear-depth","Effective shear depth","AS 3600 Cl. 8.2.1.9",
      "d<sub>v</sub> = max(0.72D, 0.9d)",()=>({substitution:`max(0.72 × ${fmt(input.depth)}, 0.9 × ${fmt(v.d)})`,
        result:`Derived d<sub>v</sub> = ${fmt(v.dv)} mm`,applicability:"d measured from the selected compression face."}));
    add("concrete-shear","Concrete shear component","AS 3600 Cl. 8.2.4.1; AS 3600 Cl. 8.2.4.3",
      "V<sub>uc</sub> = k<sub>v</sub>b<sub>v</sub>d<sub>v</sub>min(√f′<sub>c</sub>, 8) / 1000"+(ok&&v.minShearReoProvided?"; k<sub>v</sub> = 0.15":"; k<sub>v</sub> = min[0.15, 200/(1000 + 1.3d<sub>v</sub>)]"),()=>({
        substitution:`${fmt(v.kv,5)} × ${fmt(v.bv)} × ${fmt(v.dv)} × ${fmt(v.rootFc,4)} / 1000`,
        result:`Nominal V<sub>uc</sub> = ${fmt(v.vuc,3)} kN`,applicability:v.minShearReoProvided?"Minimum Class N fitments provided; method limits still apply.":"No minimum fitments; depth-dependent k<sub>v</sub>."}));
    if(input.fitments==="vertical")add("fitment-shear","Fitment shear component","AS 3600 Cl. 8.2.5.2",
      "V<sub>us</sub> = (A<sub>sv</sub>/s<sub>v</sub>)f<sub>sy.f</sub>d<sub>v</sub>cot θ<sub>v</sub> / 1000",()=>({
        substitution:`${fmt(v.asvPerS,5)} × 500 × ${fmt(v.dv)} × ${fmt(v.cotTheta,5)} / 1000`,
        result:`Nominal V<sub>us</sub> = ${fmt(v.vus,3)} kN`,applicability:"Vertical fitments; θ<sub>v</sub> = 36°. See detailing screens."}));
    add("web-crushing","Web crushing limit","AS 3600 Cl. 8.2.3.3",
      "V<sub>u,max</sub> = 0.55 × 0.9f′<sub>c</sub>b<sub>v</sub>d<sub>v</sub>cot θ<sub>v</sub> / [(1 + cot²θ<sub>v</sub>)1000]",()=>({
        substitution:`0.55 × 0.9 × ${fmt(input.fc)} × ${fmt(v.bv)} × ${fmt(v.dv)} × ${fmt(v.cotTheta,5)} / [(1 + ${fmt(v.cotTheta,5)}²) × 1000]`,
        result:`Nominal V<sub>u,max</sub> = ${fmt(v.vuMax,3)} kN`,applicability:v.webCrushingLimited?"Design limit governs; φ = 0.70.":"Independent design limit: 0.70V<sub>u,max</sub>."}));
    add("design-shear","Design shear","AS 3600 Table 2.2.2(e); AS 3600 Cl. 8.2.3.1; AS 3600 Cl. 8.2.3.3",
      "Design φV<sub>u</sub> = min[φ<sub>s</sub>(V<sub>uc</sub> + V<sub>us</sub>), 0.70V<sub>u,max</sub>]",()=>({
        substitution:`min[${fmt(v.sectionPhi,2)} × (${fmt(v.vuc,3)} + ${fmt(v.vus,3)}), 0.70 × ${fmt(v.vuMax,3)}] = min[${fmt(v.sectionDesignLimit,3)}, ${fmt(v.crushingDesignLimit,3)}] kN`,
        result:r.shearCapacity==null?"Not evaluated":`Design φV<sub>u</sub> = ${fmt(r.shearCapacity)} kN`,
        applicability:denied(r.shearReasons)||(input.fitments==="none"?"Conditional · separately check the fitment trigger.":v.webCrushingLimited?"Web crushing governs; φ = 0.70.":"Minimum Class N fitments; φ = 0.75."),state:r.shearCapacity==null||input.fitments==="none"?"warning":""}));
    if(input.fitments==="vertical"){
      add("minimum-fitments","Minimum shear steel","AS 3600 Cl. 8.2.1.7",
        "(A<sub>sv</sub>/s<sub>v</sub>)<sub>min</sub> = 0.08√f′<sub>c</sub>b<sub>v</sub>/f<sub>sy.f</sub>",()=>({
          substitution:`0.08 × √${fmt(input.fc)} × ${fmt(v.bv)} / 500`,result:checked("minimum-fitments",`Minimum ${fmt(v.asvMinPerS,3)} mm²/mm; provided ${fmt(v.asvPerS,3)} mm²/mm`),applicability:checkScope("minimum-fitments","Minimum Class N fitment-area screen."),state:checkState("minimum-fitments")}));
      add("longitudinal-spacing","Longitudinal spacing","AS 3600 Cl. 8.3.2.2",
        "s<sub>v,max</sub> = min(0.5D, 300 mm)",()=>({substitution:`min(0.5 × ${fmt(input.depth)}, 300)`,result:checked("longitudinal-spacing",`Limit ${fmt(r.fitmentMaxSpacing)} mm; entered ${fmt(input.spacing)} mm`),applicability:checkScope("longitudinal-spacing","Ordinary spacing limit; no low-demand relaxation."),state:checkState("longitudinal-spacing")}));
      add("transverse-spacing","Transverse leg spacing","AS 3600 Cl. 8.3.2.2",
        "s<sub>t</sub> = [b − 2(c<sub>nom</sub> + d<sub>fit</sub>/2)]/(n<sub>sv</sub> − 1); s<sub>t,max</sub> = min(D, 600 mm)",()=>({
          substitution:`[${fmt(input.width)} − 2(${fmt(input.cover)} + ${fmt(Number(input.fitmentBar.slice(1)),0)}/2)] / (${input.legs} − 1); min(${fmt(input.depth)}, 600)`,
          result:checked("transverse-spacing",`Derived ${fmt(r.transverseSpacing)} mm; limit ${fmt(r.transverseMax)} mm`),applicability:checkScope("transverse-spacing","Equally spaced effective legs; physical overlap is rejected."),state:checkState("transverse-spacing")}));
    }else add("no-fitment-trigger","Fitment requirement","AS 3600 Cl. 8.2.1.6",
      "V<sub>trigger</sub> = k<sub>s</sub> × 0.70V<sub>uc</sub>; k<sub>s</sub> = "+(input.depth<=300?"1":input.depth>=650?"0.5":"(1000 − D)/700"),()=>({substitution:(input.depth>300&&input.depth<650?`k<sub>s</sub> = (1000 − ${fmt(input.depth)}) / 700 = ${fmt(r.ks,5)}; `:"")+`${fmt(r.ks,5)} × 0.70 × ${fmt(v.vuc,3)}`,
        result:checked("no-fitment-trigger",`Trigger = ${fmt(r.noFitmentThreshold)} kN`),applicability:checkScope("no-fitment-trigger",input.depth>=750?"Fitments required: D ≥ 750 mm.":"Compare project |V<sup>*</sup>| separately; no action is entered here."),state:"warning"}));
    return rows;
  }
  return Object.freeze({screens,renderScreens,geometry,primaryIssues,traces,note});
});
