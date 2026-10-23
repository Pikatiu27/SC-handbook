/* Book notation for existing BIF trace rows. No calculation or input mutation. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.BeamForceTracePresentation=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const subdigits='₀₁₂₃₄₅₆₇₈₉',supdigits='⁰¹²³⁴⁵⁶⁷⁸⁹';
  // Keep ordinary variable characters in the shared UI font. CSS supplies their
  // italic style; MathML retains fractions/scripts without auto-converting mi
  // text to the separate mathematical-alphanumeric Unicode font repertoire.
  const row=s=>`<mrow>${s}</mrow>`,mi=s=>`<mi mathvariant="normal">${esc(s)}</mi>`,mo=s=>`<mo>${esc(s)}</mo>`,mn=s=>`<mn>${esc(s)}</mn>`,text=s=>`<mtext>${esc(s)}</mtext>`;
  const math=s=>`<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">${row(s)}</math>`;
  const fraction=(a,b)=>`<mfrac>${row(a)}${row(b)}</mfrac>`;
  // A notation tokenizer, not an evaluator. Groups are retained as indivisible
  // operands; / changes only their visual arrangement, never their grouping.
  function notation(source){
    let i=0;
    function group(end=''){
      const parts=[];
      while(i<source.length){
        const c=source[i];if(end&&c===end){i++;break;}
        if(/\s/.test(c)){i++;continue;}
        if('([{'.includes(c)){i++;const close={'(':')','[':']','{':'}'}[c],inner=group(close),base=parts.at(-1);if(c==='('&&['q','V','M'].includes(base?.symbol)){parts.pop();parts.push({html:row(base.html+mo(c)+inner+mo(close))});}else parts.push({html:row(mo(c)+inner+mo(close)),bare:inner});continue;}
        if(c==='/'){i++;parts.push({divide:true});continue;}
        if(c==='_'){
          i++;const match=source.slice(i).match(/^[A-Za-z0-9]+/),label=match?.[0]||'';i+=label.length;
          const base=parts.pop();if(base)parts.push({html:`<msub>${base.html}${label.length===1&&/[a-z]/.test(label)?mi(label):text(label)}</msub>`});continue;
        }
        if(c==='⁺'||c==='⁻'){i++;const base=parts.pop();if(base)parts.push({html:`<msup>${base.html}${mo(c==='⁺'?'+':'−')}</msup>`});continue;}
        if(subdigits.includes(c)||supdigits.includes(c)){
          const sub=subdigits.includes(c),digits=sub?subdigits:supdigits;let label='';while(i<source.length&&digits.includes(source[i]))label+=digits.indexOf(source[i++]);
          const base=parts.pop();if(base)parts.push({html:`<${sub?'msub':'msup'}>${base.html}${mn(label)}</${sub?'msub':'msup'}>`});continue;
        }
        const derivative=source.slice(i).match(/^d([VM])\/dx/);
        if(derivative){i+=derivative[0].length;parts.push({html:fraction(text('d')+mi(derivative[1]),text('d')+mi('x'))});continue;}
        const num=source.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+−-]?\d+)?/i);
        if(num){i+=num[0].length;const [a,b]=num[0].split(/e/i);parts.push({html:Number(num[0])===0?mn('0'):b===undefined?mn(a):row(mn(a)+mo('×')+`<msup>${mn('10')}${row((b.startsWith('-')||b.startsWith('−')?mo('−'):'')+mn(b.replace(/^[+−-]/,'')))}</msup>`)});continue;}
        const word=source.slice(i).match(/^(?:kN|mm|m|sin|cos|tan|min|max)(?![a-zA-Z])/);
        if(word){i+=word[0].length;parts.push({html:(['kN','mm','m'].includes(word[0])&&parts.length&&!parts.at(-1).divide?'<mspace width="0.22em"/>':'')+text(word[0])});continue;}
        i++;parts.push({symbol:c,html:/[a-zA-ZεφλπρΔℓ]/.test(c)?mi(c):mo(c==='-'?'−':c==='Σ'?'∑':c)});
      }
      for(let j=0;j<parts.length;j++)if(parts[j].divide){const a=parts[j-1],b=parts[j+1];if(!a||!b||a.divide||b.divide)throw Error('Invalid trace division');parts.splice(j-1,3,{html:fraction(a.bare??a.html,b.bare??b.html)});j-=1;}
      return parts.map(p=>p.html).join('');
    }
    return group();
  }
  function continuation(s,splitFirst=false){
    if(s.length<(splitFirst?24:32))return [s];
    const chunks=[];let depth=0,start=0,equalities=0;
    for(let i=0;i<s.length;i++){
      if('([{'.includes(s[i]))depth++;if(')]}'.includes(s[i]))depth--;
      if(depth!==0)continue;
      if(s[i]==='='){equalities++;if(equalities<2&&!splitFirst&&s.length<32)continue;}
      if((s[i]==='='||((s[i]==='+'||s[i]==='−')&&s[i-1]===' '&&s[i+1]===' '))&&i>start){chunks.push(s.slice(start,i).trim());start=i;}
    }
    chunks.push(s.slice(start).trim());return chunks.filter(Boolean);
  }
  function additiveTerms(s){const terms=[];let depth=0,start=0;for(let i=0;i<s.length;i++){if('([{'.includes(s[i]))depth++;if(')]}'.includes(s[i]))depth--;if(depth===0&&i>start&&(s[i]==='+'||s[i]==='−')&&s[i-1]===' '&&s[i+1]===' '){terms.push(s.slice(start,i).trim());start=i;}}terms.push(s.slice(start).trim());return terms;}
  function wrappedTerm(s){
    if(s.length<26)return notation(s);
    const factors=[];let depth=0,start=0;
    for(let i=0;i<s.length;i++){
      if('([{'.includes(s[i]))depth++;if(')]}'.includes(s[i]))depth--;
      if(depth===0&&s[i]==='×'&&i>start){factors.push(s.slice(start,i).trim());start=i;}
    }
    if(!factors.length)return notation(s);factors.push(s.slice(start).trim());
    return '<mtable columnalign="left" rowspacing="0.15em">'+factors.map(f=>'<mtr><mtd>'+notation(f)+'</mtd></mtr>').join('')+'</mtable>';
  }
  function equation(s,splitFirst){
    const unit=s.match(/\s+(kN(?:·m|\/m[²³]?)?|m)$/),body=unit?s.slice(0,unit.index):s,eq=body.lastIndexOf('='),lhs=eq<0?'':body.slice(0,eq+1);let rhs=body.slice(eq+1).trim();
    // A leading (a + b) followed by + or − can be flattened without changing
    // arithmetic, allowing the whole factored quantity to wrap by terms.
    if(rhs.startsWith('(')){let depth=0;for(let i=0;i<rhs.length;i++){if(rhs[i]==='(')depth++;if(rhs[i]===')')depth--;if(depth===0){if(/^[ +−]/.test(rhs.slice(i+1))&&/^[ ]*[+−]/.test(rhs.slice(i+1)))rhs=rhs.slice(1,i)+rhs.slice(i+1);break;}}}
    if(rhs.startsWith('[')&&rhs.endsWith(']')){let depth=0,outer=true;for(let i=0;i<rhs.length-1;i++){if(rhs[i]==='[')depth++;if(rhs[i]===']')depth--;if(depth===0){outer=false;break;}}if(outer)rhs=rhs.slice(1,-1);}
    if(rhs.startsWith('−[')&&rhs.endsWith(']')){
      const inner=rhs.slice(2,-1),terms=additiveTerms(inner);
      if(inner.length>24&&terms.length>1){
        const column='<mtable columnalign="left" rowspacing="0.2em">'+terms.map(t=>'<mtr><mtd>'+wrappedTerm(t)+'</mtd></mtr>').join('')+'</mtable>';
        return '<span class="bif-math-line">'+(lhs?math(notation(lhs)):'')+math(mo('−')+mo('[')+column+mo(']')+(unit?'<mspace width="0.22em"/>'+notation(unit[1]):''))+'</span>';
      }
    }
    const terms=additiveTerms(rhs);
    // Factor the unit outside the entire numerical sum, not its last term.
    if(unit&&terms.length>1&&!/[A-DF-Za-df-zεΔ₀-₉]/.test(rhs)){
      const middle=rhs.length<16&&terms.length<3?notation(rhs):`<mtable columnalign="left" rowspacing="0.2em">${terms.map(t=>`<mtr><mtd>${wrappedTerm(t)}</mtd></mtr>`).join('')}</mtable>`;
      return `<span class="bif-math-line">${lhs?math(notation(lhs)):''}${math(mo('(')+middle+mo(')')+'<mspace width="0.22em"/>'+notation(unit[1]))}</span>`;
    }
    return `<span class="bif-math-line">${continuation(s,splitFirst).map(c=>math(notation(c))).join('')}</span>`;
  }
  function equations(source,splitFirst=true){return `<span class="bif-math-stack">${source.split(';').map(s=>s.trim()).filter(Boolean).map(s=>equation(s,splitFirst)).join('')}</span>`;}
  function compactOperands(s){return s.replace(/\((\d+(?:\.\d+)?(?:e[+-]?\d+)?)\)/gi,'$1');}
  function formatter(model,x){
    const ordinary=v=>Number.isFinite(v)?Number(v.toPrecision(10)).toString():'—';
    if(!model?.valid)return ordinary;
    const physical=[x,model.input.length,...model.reactions.map(r=>r.x),...model.input.loads.flatMap(l=>[l.start,l.end,l.p,l.q0,l.q1]),...model.zeroShear,...['V','M'].flatMap(k=>[model.extrema[k].min.x,model.extrema[k].max.x])].filter(Number.isFinite);
    let precise=physical.some(v=>Number(ordinary(v))!==v);
    const values=[...physical,...model.reactions.flatMap(r=>[r.force,r.couple,model.totals.force*r.x]),...Object.values(model.totals)].filter(Number.isFinite).map(v=>({a:Math.abs(v),b:Math.abs(Number(ordinary(v)))}));
    for(let i=0;!precise&&i<values.length;i++)for(let j=0;j<i;j++){const d=values[i].a-values[j].a;if(d!==0&&Math.abs((values[i].b-values[j].b)-d)>Math.abs(d)*1e-5){precise=true;break;}}
    return precise?v=>Number.isFinite(v)?String(v):'—':ordinary;
  }
  const cases=math(mi('u')+mo('=')+mo('{')+`<mtable columnalign="left left" rowspacing="0.45em"><mtr><mtd>${mn('0')}</mtd><mtd>${mi('x')+mo('≤')+notation('x₀')}</mtd></mtr><mtr><mtd>${notation('x − x₀')}</mtd><mtd>${notation('x₀ < x < x₁')}</mtd></mtr><mtr><mtd>${mi('d')}</mtd><mtd>${notation('x ≥ x₁')}</mtd></mtr></mtable>`);
  function prose(s){return `<span class="bif-trace-note">${esc(s)}</span>`;}
  function present(r,context={}){
    if(r.result==='Not evaluated')return {...r};
    let formula=r.formula.replace('V(a+)','V(a⁺)'),substitution=r.substitution.replace(/ at x₀ = /g,'; x₀ = '),result=r.result.replace(/^Candidate /,''),applicability=r.applicability;
    let prefix='';
    if(r.id.startsWith('bif-cut-')){
      // Show the actual free-body branch, rather than implementation indicators.
      const included=/I_[RPC] = 1/.test(substitution),excluded=/I_[RPC] = 0/.test(substitution);
      if(included||excluded){
        if(excluded){formula='ΔV = 0; ΔM = 0';substitution='ΔV = 0 kN; ΔM = 0 kN·m';}
        else{
          formula=formula.replace(/I_[RPC]\s*/g,'').replace('M_R = [','M_R = [');
          substitution=substitution.replace(/^I_[RPC] = 1;\s*/,'').replace(/(?:−)?1 × /g,m=>m.startsWith('−')?'−':'');
        }
        applicability=applicability.replace(/^I_R = 1 when[^.]*\.\s*/, '')+(excluded?' This action is outside the selected left free body; its cut contribution is zero.':' This action is included in the selected left free body.');
      }
      if(formula.includes('clamp(')){
        prefix=`<span class="bif-math-line">${cases}</span>`;
        formula=formula.replace('u = clamp(x − x₀, 0, d); ','');
        const u=substitution.match(/^u = clamp\(.+?\) = ([^;]+); /);
        if(u)substitution=substitution.replace(u[0],'u = '+u[1]+'; ');
      }
    }
    if(r.id==='bif-v'||r.id==='bif-m'){
      const key=r.id==='bif-v'?'V':'M',side=context.side==='left'?'−':'+',at=Number.isFinite(context.x)?String(context.x):'x';
      result=`${key}(x${side==='−'?'⁻':'⁺'}) = ${r.result.split(' = ').at(-1)}`;
      applicability=`Cut x = ${at} m, ${context.side==='left'?'left-hand':'right-hand'} limit. `+applicability;
    }
    if(r.id==='bif-equilibrium')substitution=substitution.replace('ε_M = [','ε_M = ').replace('] − ', ' − ');
    let renderedFormula;
    if(r.id==='bif-extreme-V'||r.id==='bif-extreme-M'){
      const key=r.id.endsWith('V')?'V':'M';
      renderedFormula=`<span class="bif-math-stack">${['min','max'].map(kind=>`<span class="bif-math-line">${math(notation(key+'_'+kind+' = ')+`<munder>${text(kind)}${row(mi('s')+mo('∈')+`<msub>${mi('S')}${mi(key)}</msub>`)}</munder>`+notation(key+'(s)'))}</span>`).join('')}</span>`;
      substitution=prose(r.substitution);applicability=`S${key==='V'?'ᵥ':'ₘ'} is the set of analytical candidate sections, including the stated event sides. `+applicability;
    }else renderedFormula=equations(formula);
    // Strip the coordinate sentence from support substitutions; it is prose,
    // not another algebraic equation. The exact cut is stated above the results.
    substitution=typeof substitution==='string'&&substitution.startsWith('<span')?substitution:equations(compactOperands(substitution.replace(/x = [^;]+ m \((?:left|right)\);\s*/g,'')));
    return {...r,formula:prefix?`<span class="bif-math-stack">${prefix}${renderedFormula}</span>`:renderedFormula,substitution,result:equations(result,false),applicability};
  }
  return Object.freeze({present,notation,equations,formatter});
});
