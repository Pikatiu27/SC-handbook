'use strict';
// Presentation only. The reviewed calculation and display owners are unchanged.
(function(root){
 const n=v=>Number.isFinite(v)?String(v===0?0:v):'—';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const P=()=>root.BeamForceTracePresentation,D=()=>root.FrameDrawing;
 const math=html=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow>${html}</mrow></math>`;
 // A full double-precision scientific literal can exceed a phone line once
 // nested inside sums. Keep every digit and wrap its multiplication by 10^n.
 function wrapScientific(html){return html.replace(/<mrow><mn>(\d+\.\d{12,})<\/mn><mo>×<\/mo>(<msup><mn>10<\/mn><mrow>(?:<mo>−<\/mo>)?<mn>\d+<\/mn><\/mrow><\/msup>)<\/mrow>/g,(_,mantissa,exponent)=>`<mtable columnalign="left" rowspacing="0.15em"><mtr><mtd><mn>${mantissa}</mn></mtd></mtr><mtr><mtd><mo>×</mo>${exponent}</mtd></mtr></mtable>`);}
 const notation=s=>wrapScientific(P().notation(s)),space='<mspace width="0.22em"/>';
 function eq(s){let html=wrapScientific(P().equations(s));for(const unit of ['GPa','mrad','rad'])html=html.replaceAll([...unit].map(c=>`<mi mathvariant="normal">${c}</mi>`).join(''),space+`<mtext>${unit}</mtext>`);return html;}
 const operand=v=>`(${n(v)})`,power=(v,k)=>operand(v)+(k===1?'':k===2?'²':k===3?'³':'⁴');
 function product(factors){const text=factors.join(' × '),inline=factors.length<2||(text.length<24&&!factors.some(v=>/[eE][+-]?\d/.test(v)));return inline?notation(text):`<mtable columnalign="left" rowspacing="0.15em">${factors.map((v,i)=>`<mtr><mtd>${notation((i?'× ':'')+v)}</mtd></mtr>`).join('')}</mtable>`;}
 const fraction=(a,b)=>`<mfrac><mrow>${product(a)}</mrow><mrow>${product(b)}</mrow></mfrac>`;
 function numeric(label,rhs,unit){const u=['rad','mrad','GPa'].includes(unit)?`<mtext>${unit}</mtext>`:notation(unit);return `<span class="bif-math-line">${math(notation(label+' ='))}${math(rhs)}${math(u)}</span>`;}
 function sum(label,terms,unit){const html=terms.length===1?terms[0]:`<mo>(</mo><mtable columnalign="left" rowspacing="0.2em">${terms.map((v,i)=>`<mtr><mtd>${i?'<mo>+</mo>':''}${v}</mtd></mtr>`).join('')}</mtable><mo>)</mo>`;return numeric(label,html,unit);}
 const row=(id,title,reference,formula,substitution,result,applicability)=>({id,title,reference,formula,substitution,result,applicability});
 function shownNumber(text){const negative=text.startsWith('−'),sign=negative?'<mo>−</mo>':'';if(negative)text=text.slice(1);const parts=text.split('e');if(parts.length===1)return sign+`<mn>${esc(text)}</mn>`;return sign+`<mn>${esc(parts[0])}</mn><mo>×</mo><msup><mn>10</mn><mrow>${notation(parts[1])}</mrow></msup>`;}
 const finalValue=(label,value,unit)=>numeric(label,shownNumber(D().fmt(value)),unit);
 const result=(model,key,value,label,unit)=>finalValue(label,D().resolved(model,key,value),unit);
 function unavailable(reason){return root.calculationTraceRow(row('fa-unavailable','Frame response','Derived · elastic portal model',eq('K d = F'),'Input required','Not evaluated',esc(reason)));}
 function rows(model,e,pos){
  const prop=model.input[e.id==='AB'?'left':e.id==='BC'?'beam':'right'],E=model.input.E,all=[];
  const stiffnessFormula=math(notation('EA = E A'))+math(notation('EI = E I × ')+`<msup><mn>10</mn><mrow><mo>−</mo><mn>6</mn></mrow></msup>`);
  all.push(row('fa-stiffness','Member stiffness','Derived · axial/bending elasticity; SI conversion',stiffnessFormula,
   eq(`E = ${n(E)} GPa; A = ${n(prop.A)} mm²; I = ${n(prop.I)} mm⁴`)+numeric('EA',product([n(E),n(prop.A)]),'kN')+numeric('EI',fraction([n(E),n(prop.I)],['1000000']),'kN·m²'),
   finalValue('EA',e.EA,'kN')+finalValue('EI',e.EI,'kN·m²'),'Prismatic member. E in GPa, A in mm² and I in mm⁴; no effective-stiffness or section-resistance check.'));
  if(!pos.valid){all.push(row('fa-cut-unavailable','Selected section','Derived · member equilibrium and elastic recovery',eq('N = −F_x; V = F_y + q_y x; M = −C_i + F_y x + q_y x²/2'),'Enter a position along the selected member.','Not evaluated',`Enter x from 0 to ${n(e.L)} m. Whole-model reactions and nodal displacements remain available.`));return all;}
  const x=pos.x,p=e.at(x),Fx=e.p[0],Fy=e.p[1],Ci=e.p[2],q=e.q,ui=e.dl[0],vi=e.dl[1],ti=e.dl[2];
  all.push(row('fa-N','Section axial force','Derived · member equilibrium',eq('N = −F_x'),numeric('N',notation('−'+operand(Fx)),'kN'),result(model,'N',p.N,'N','kN'),'Fₓ is the local +x end action at i; section N is tension-positive.'));
  all.push(row('fa-V','Section shear','Derived · member equilibrium',eq('V = F_y + q_y x'),eq(`x = ${n(x)} m; q_y = ${n(q)} kN/m`)+sum('V',[notation(operand(Fy)),product([operand(q),n(x)])],'kN'),result(model,'V',p.V,'V','kN'),e.id==='BC'?'Fᵧ is the local +y end action at i. Beam load qᵧ is the negative of downward-positive q.':'Fᵧ is the local +y end action at i. This column has no distributed load, so qᵧ = 0.'));
  all.push(row('fa-M','Section moment','Derived · member equilibrium',eq('M = −C_i + F_y x + q_y x²/2'),eq(`x = ${n(x)} m`)+sum('M',[notation('−'+operand(Ci)),product([operand(Fy),n(x)]),fraction([operand(q),power(x,2)],['2'])],'kN·m'),result(model,'M',p.M,'M','kN·m'),'Cᵢ is the counterclockwise end couple on the member at i. Section moment satisfies M(0) = −Cᵢ.'));
  const axialProduct=fraction([operand(p.N),n(x)],[n(e.EA)]);
  all.push(row('fa-u','Local axial displacement','Derived · axial elasticity',eq('u = u_i + Nx/EA'),eq(`u_i = ${n(ui)} m; x = ${n(x)} m; EA = ${n(e.EA)} kN`)+sum('u',[notation(operand(ui)),axialProduct],'m')+numeric('u',product([operand(p.u),'1000']),'mm'),result(model,e.id==='BC'?'ux':'uy',p.u*1000,'u','mm'),'Includes displacement of end i. Local u follows the member axis; m converts to mm by ×1000.'));
  const vc=-Ci*x*x/(2*e.EI),vf=Fy*x**3/(6*e.EI),vq=q*x**4/(24*e.EI);
  all.push(row('fa-v','Local transverse displacement','Derived · Euler–Bernoulli integration',eq('v = v_i + θ_i x + v_C + v_F + v_q; v_C = −C_i x²/(2EI); v_F = F_y x³/(6EI); v_q = q_y x⁴/(24EI)'),
   eq(`v_i = ${n(vi)} m; θ_i = ${n(ti)} rad; x = ${n(x)} m; EI = ${n(e.EI)} kN·m²`)+numeric('v_C',fraction(['−'+operand(Ci),power(x,2)],['2',n(e.EI)]),'m')+numeric('v_F',fraction([operand(Fy),power(x,3)],['6',n(e.EI)]),'m')+numeric('v_q',fraction([operand(q),power(x,4)],['24',n(e.EI)]),'m')+sum('v',[notation(operand(vi)),product([operand(ti),n(x)]),notation(operand(vc)),notation(operand(vf)),notation(operand(vq))],'m')+numeric('v',product([operand(p.v),'1000']),'mm'),
   result(model,'v',p.v*1000,'v','mm'),'The moment, shear and distributed-load terms include the exact quartic response. Local v includes end translation; no code deflection limit is evaluated.'));
  const tc=-Ci*x/e.EI,tf=Fy*x*x/(2*e.EI),tq=q*x**3/(6*e.EI);
  all.push(row('fa-theta','Section rotation','Derived · Euler–Bernoulli integration',eq('θ = θ_i + θ_C + θ_F + θ_q; θ_C = −C_i x/EI; θ_F = F_y x²/(2EI); θ_q = q_y x³/(6EI)'),
   eq(`θ_i = ${n(ti)} rad; x = ${n(x)} m; EI = ${n(e.EI)} kN·m²`)+numeric('θ_C',fraction(['−'+operand(Ci),n(x)],[n(e.EI)]),'rad')+numeric('θ_F',fraction([operand(Fy),power(x,2)],['2',n(e.EI)]),'rad')+numeric('θ_q',fraction([operand(q),power(x,3)],['6',n(e.EI)]),'rad')+sum('θ',[notation(operand(ti)),notation(operand(tc)),notation(operand(tf)),notation(operand(tq))],'rad')+numeric('θ',product([operand(p.theta),'1000']),'mrad'),
   result(model,'theta',p.theta*1000,'θ','mrad'),'θ = dv/dx, counterclockwise-positive. Internal rad converts to mrad by ×1000.'));
  all.push(row('fa-global','Global displacement','Derived · local-to-global transformation',eq('u_X = cu − sv; u_Y = su + cv'),eq(`c = ${n(e.c)}; s = ${n(e.s)}`)+sum('u_X',[product([n(e.c),operand(p.u*1000)]),product([n(-e.s),operand(p.v*1000)])],'mm')+sum('u_Y',[product([n(e.s),operand(p.u*1000)]),product([n(e.c),operand(p.v*1000)])],'mm'),
   result(model,'ux',p.ux*1000,'u_X','mm')+result(model,'uy',p.uy*1000,'u_Y','mm'),'c and s are the member direction cosines. Global X is right and Y is up; both substituted local displacements are in mm.'));
  return all;
 }
 function render(model,e,pos){
  if(!model?.valid||!e)return unavailable(model?.errors?.map(e=>e.message).join(' ')||'Complete valid frame inputs.');
  const intro=`<p class="fa-trace-note">Selected member <b>${esc(e.id)}</b> · local x from ${esc(e.id[0])} to ${esc(e.id[1])}. F<sub>x</sub>, F<sub>y</sub> and C<sub>i</sub> are local end actions at i. Operands retain calculation precision; final values follow the result readout format.</p>`;
  const body=root.HandbookNumericalTraces.html(rows(model,e,pos),root.calculationTraceRow);
  const display=(key,v)=>D().fmt(D().resolved(model,key,v));
  const nodes=`<section class="fa-node-schedule"><h4>Global nodal displacement schedule</h4><table class="fa-trace-table"><thead><tr><th>Node</th><th>uₓ / mm</th><th>uᵧ / mm</th><th>θ / mrad</th></tr></thead><tbody>${model.nodes.map(v=>`<tr><th>${esc(v.id)}</th><td>${display('ux',v.ux*1000)}</td><td>${display('uy',v.uy*1000)}</td><td>${display('theta',v.theta*1000)}</td></tr>`).join('')}</tbody></table></section>`;
  const verification=`<details class="fa-trace-verification"><summary>Numerical verification</summary><p>Scaled condition estimate ${esc(n(model.scaledCondition))} (limit 10⁸); minimum scaled pivot ${esc(n(model.minPivot))} (must exceed 10⁻⁸); normalized free-DOF residual ${esc(n(model.normalizedResidual))} (limit 10⁻⁷). These are software admission checks, not stability, resistance or code acceptance.</p></details>`;
  return intro+body+nodes+verification;
 }
 root.FrameCalculationTrace=Object.freeze({render,rows});
})(typeof globalThis!=='undefined'?globalThis:this);
