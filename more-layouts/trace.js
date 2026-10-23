'use strict';
// Presentation only: values are supplied by the reviewed response owners.
(function(root){
 const n=v=>Number.isFinite(v)?String(v):'—';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const P=()=>root.BeamForceTracePresentation;
 const prose=s=>`<span class="bif-trace-note">${esc(s)}</span>`;
 function eq(s){
  let html=P().equations(s);
  for(const unit of ['GPa','mrad','rad']){
   const tokens=[...unit].map(c=>`<mi mathvariant="normal">${c}</mi>`).join('');
   html=html.replaceAll(tokens,`<mspace width="0.22em"/><mtext>${unit}</mtext>`);
  }
  return html;
 }
 const math=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${s}</mrow></math>`;
 const notation=s=>P().notation(s);
 const integral=(weighted=false)=>math(`${notation(weighted?'B(x) =':'A(x) =')}<msubsup><mo>∫</mo><mn>0</mn><mi>x</mi></msubsup>${weighted?notation('(x − s)'):''}<mfrac><mrow>${notation('M(s)')}</mrow><mrow>${notation('EI')}</mrow></mfrac><mtext>d</mtext><mi>s</mi>`);
 const row=(id,title,reference,formula,substitution,result,applicability)=>({id,title,reference,formula,substitution,result,applicability});
 const ref='Derived · Udoeyo Section 7.3; Udoeyo Section 10.3';
 function rows(f){
  const supports=f.reactions.map(r=>`x_${r.id} = ${n(r.x)} m`).join('; ');
  const conditions=f.reactions.map(r=>`δ(${n(r.x)}) = 0 mm${r.fixed?`; θ(${n(r.x)}) = 0 mrad`:''}`).join('; ');
  const values=f.reactions.map(r=>`R_${r.id} = ${n(r.force)} kN${r.fixed?`; C_${r.id} = ${n(r.couple)} kN·m`:''}`).join('; ');
  return [row('bml-compatibility','Support reactions',ref,
   eq('ΣR = W; Σ(Rx + C_R) = J − C; EIδ″ = −M; θ = δ′'),
   eq(`W = ${n(f.totals.force)} kN; J = ${n(f.totals.firstMoment)} kN·m; C = ${n(f.totals.couple)} kN·m; ${supports}; ${conditions}`)+(f.hinges?.length?eq(`h = ${n(f.hinges[0])} m; M(h) = 0 kN·m`):''),
   eq(values),
   'Action effects from equilibrium and zero support displacement; fixed supports also prevent rotation. Uniform EI, no settlement. Upward R and counterclockwise C are positive.'+(f.hinges?.length?' Internal hinge: common displacement, independent left/right rotation.':''))];
 }
 function unavailable(message){return root.calculationTraceRow(row('bd-unavailable','Bending deformation',ref,eq('EIδ″ = −M; θ = δ′'),'Input required','Not evaluated',esc(message)));}
 function deformation(f,r,state){
  if(!r?.valid)return unavailable(r?.errors?.map(e=>e.message).join(' ')||'Complete valid geometry, actions and positive E/I.');
  const {E,I}=r.input,c=r.constants,h=r.hingeChecks||[],valid=state.coordinateValid&&Number.isFinite(state.x),x=state.x,side=state.side||'right',p=valid?r.at(x,side):null;
  const active=h.filter(v=>x>v.x||(x===v.x&&side==='right'));
  const jump=active.reduce((s,v)=>s+v.thetaRight-v.thetaLeft,0),lever=active.reduce((s,v)=>s+(v.thetaRight-v.thetaLeft)*(x-v.x),0);
  const A=p?c.c1+jump-p.theta:NaN,B=p?c.c2+c.c1*x+lever-p.delta:NaN;
  const hinge=h.length?'; Δθ_h = θ(h⁺) − θ(h⁻)':'';
  const boundary=f.reactions.map(v=>`δ(${n(v.x)}) = 0 mm${v.fixed?`; θ(${n(v.x)}) = 0 mrad`:''}`).join('; ');
  const base='Constant EI, linear elastic Euler–Bernoulli bending; downward δ and clockwise θ are positive.';
  const rs=[row('bd-stiffness','Bending stiffness','Derived · SI unit conversion',
   math(notation('EI = E I × ')+`<msup><mn>10</mn><mrow><mo>−</mo><mn>6</mn></mrow></msup>`),
   eq(`E = ${n(E)} GPa; I = ${n(I)} mm⁴; EI = (${n(E)} × ${n(I)})/1000000 kN·m²`),
   eq(`EI = ${n(r.EI)} kN·m²`),'E in GPa and bending-axis I in mm⁴; one uniform positive stiffness along the beam.'),
   row('bd-rotation','Section rotation',ref,
    eq('θ(x) = C₁ − A(x)'+(h.length?' + ΣΔθ_h H(x − h)':'')+hinge)+integral(),
    p?eq(`x = ${n(x)} m; C₁ = ${n(c.c1)} rad; A = ${n(A)} rad`)+(h.length?eq(`ΣΔθ_h H = ${n(jump)} rad`):'')+eq(`θ = ${n(c.c1)} − (${n(A)})${h.length?' + ('+n(jump)+')':''} rad`):prose('Input required: enter a section coordinate within the beam.'),
    p?eq(`θ = ${n(p.theta*1000)} mrad`):'Not evaluated',base+' Cut uses the '+esc(side)+'-hand limit.'+(h.length?' H is 0 before the hinge and 1 after it; the selected side applies at the hinge.':'')),
   row('bd-deflection','Section deflection',ref,
    eq('δ(x) = C₂ + C₁x − B(x)'+(h.length?' + ΣΔθ_h max(0, x − h)':''))+integral(true),
    p?eq(`C₂ = ${n(c.c2)} m; C₁ = ${n(c.c1)} rad; x = ${n(x)} m; B = ${n(B)} m`)+(h.length?eq(`ΣΔθ_h max(0, x − h) = ${n(lever)} m`):'')+eq(`δ = ${n(c.c2)} + (${n(c.c1)}) × ${n(x)} − (${n(B)})${h.length?' + ('+n(lever)+')':''} m`):prose('Input required: enter a section coordinate within the beam.'),
    p?eq(`δ = ${n(p.delta*1000)} mm`):'Not evaluated',base+' Integration constants satisfy '+boundary+'.')];
  for(const v of h)rs.push(row('bd-hinge','Internal hinge',ref,
   eq('M(h) = 0; δ(h⁻) = δ(h⁺); Δθ_h = θ(h⁺) − θ(h⁻)'),
   eq(`h = ${n(v.x)} m; θ(h⁻) = ${n(v.thetaLeft*1000)} mrad; θ(h⁺) = ${n(v.thetaRight*1000)} mrad`),
   eq(`Δθ_h = ${n((v.thetaRight-v.thetaLeft)*1000)} mrad; M(h) = ${n(v.M)} kN·m`),
   'The two hinge rotations are independent. Displacement is continuous; select the left or right side to inspect its section rotation.'));
  for(const [key,symbol,unit,rootCondition]of [['delta','δ','mm','θ = 0'],['theta','θ','mrad','M = 0']]){
   const e=r.extrema[key],peak=e.absolute;
   rs.push(row('bd-extreme-'+key,key==='delta'?'Maximum absolute deflection':'Maximum absolute rotation','Derived · Udoeyo Section 7.3',
    eq(`|${symbol}|_max = max(|${symbol}_min|, |${symbol}_max|)`),
    eq(`${symbol}_min = ${n(e.min[key]*1000)} ${unit}; ${symbol}_max = ${n(e.max[key]*1000)} ${unit}`),
    eq(`|${symbol}|_max = ${n(Math.abs(peak[key])*1000)} ${unit}; x = ${n(peak.x)} m`),
    `Analytical candidates: beam ends, interval boundaries and ${rootCondition} roots; ${esc(peak.side||'right')}-hand value at the governing section.`+(h.length?' Both hinge sides are evaluated.':'')+(r.warnings.length?' Review required: linear-applicability trigger exceeded.':' No code serviceability limit evaluated.')));
  }
  return root.HandbookNumericalTraces.html(rs,root.calculationTraceRow);
 }
 root.BeamMoreLayoutTrace=Object.freeze({rows,deformation,unavailable});
})(typeof globalThis!=='undefined'?globalThis:this);
