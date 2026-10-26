/* Local preview integration. Existing routes, catalogue owners and figure renderers stay in place. */
(function () {
  'use strict';
  const $id=id=>document.getElementById(id), S=SCUnifiedSection;
  const f2=n=>Number.isFinite(n)?n.toLocaleString('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2}):'Not evaluated';
  const inputs=(scope)=>[...document.querySelectorAll(scope+' input, '+scope+' select')];
  const read=(scope)=>Object.fromEntries(inputs(scope).map(e=>[e.id,e.type==='checkbox'?e.checked:e.value]));
  const write=values=>Object.entries(values).forEach(([id,v])=>{const e=$id(id);if(e){if(e.type==='checkbox')e.checked=v;else e.value=v;}});
  const memberStates={},beamStates={},memberDrafts={},beamDrafts={};
  let memberHoleTracksDimensions=true;
  const saveMemberDraft=()=>({dimensions:read('#memberDimensionFields'),material:read('#memberMaterialGroup'),basis:$id('memberDimensionBasis').value,holeThickness:$id('memberHoleThickness').value,holeTracks:memberHoleTracksDimensions});
  const oldCalcMember=calculateMember;
  calculateMember=function(){
    if(memberType==='pfc'&&memberDimensionOverrideActive()&&memberHoleTracksDimensions)$id('memberHoleThickness').value=$id('memberDimPfcTw').value;
    oldCalcMember();
  };
  $id('memberHoleThickness').addEventListener('input',()=>{memberHoleTracksDimensions=false;},true);
  const baseUpdateMember=updateMemberDimensionUi;
  updateMemberDimensionUi=function(properties){
    baseUpdateMember(properties);
    const active=memberDimensionOverrideActive();
    $id('memberSectionField').hidden=active||memberType==='custom';
    $id('memberDimensionBasisField').hidden=!active;
    const model=['chs','rhs','shs'].includes(memberType)?'Cold-formed, non-stress-relieved hollow section':memberType==='rod'?'Hot-rolled solid round bar':'Hot-rolled section';
    $id('memberDimensionBasisHelp').textContent=model+'. Confirm entered strengths for the actual thickness. Other fabrication or product forms: use overall Custom with verified factors. '+(memberType==='ea'?'Compression uses principal u–u / v–v axes.':'');
    $id('memberDimensionBasis').options[1].textContent=model+' · verified strengths';
    if (active) {
      // Family guides are symbolic; their original catalogue caption must not imply provenance for entered dimensions.
      const caption=document.querySelector('.axial-section-caption [data-member-guide="'+memberType+'"] small');
      if(caption){if(!caption.dataset.catalogueCaption)caption.dataset.catalogueCaption=caption.innerHTML;caption.textContent='Symbolic section guide · entered dimensions';}
    } else document.querySelectorAll('.axial-section-caption small[data-catalogue-caption]').forEach(e=>e.innerHTML=e.dataset.catalogueCaption);
  };
  const oldMemberMaterialStatus=updateMemberMaterialStatus;
  updateMemberMaterialStatus=function(fy,fu,grade){const changed=oldMemberMaterialStatus(fy,fu,grade);if(memberDimensionOverrideActive())$id('memberMaterialStatus').textContent='Entered strengths · verify thickness';return changed;};
  const oldMemberType=setMemberType;
  setMemberType=function(type){
    memberStates[memberType]={values:read('#memberPanel'),tracks:memberNetAreaTracksGross,holeTracks:memberHoleTracksDimensions};
    if(memberDimensionOverrideActive()) memberDrafts[memberType]=saveMemberDraft();
    $id('memberDimensionOverride').checked=false;
    $id('memberDimensionBasis').value='';
    memberHoleTracksDimensions=true;
    oldMemberType(type);
    const state=memberStates[type];
    if(state){
      $id('memberSection').value=state.values.memberSection;
      populateMemberGrades();
      write(state.values);memberNetAreaTracksGross=state.tracks;memberHoleTracksDimensions=state.holeTracks;
    }
    document.querySelectorAll('.member-type').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.memberType===type)));
    calculateMember();
  };
  $id('memberDimensionOverride').addEventListener('change',()=>{
    if($id('memberDimensionOverride').checked) {const d=memberDrafts[memberType];if(d){write(d.dimensions);write(d.material);$id('memberDimensionBasis').value=d.basis;$id('memberHoleThickness').value=d.holeThickness;memberHoleTracksDimensions=d.holeTracks;}else memberHoleTracksDimensions=true;}
    else {memberDrafts[memberType]=saveMemberDraft();populateMemberGrades();}
    calculateMember();
  });
  $id('memberDimensionBasis').addEventListener('change',calculateMember);
  // Existing circular listeners remain intact; new family inputs use the same calculation owner.
  inputs('#memberDimensionFields').forEach(e=>{e.setAttribute('inputmode','decimal');if(!['memberDimChsD','memberDimChsT','memberDimRodD'].includes(e.id))e.addEventListener('input',calculateMember);});
  const oldBeamFamily=setBeamFamily;
  function overallMode(on){
    $id('beamOverallCustom').hidden=!on;
    $id('beamPanel').classList.toggle('section-custom-active',on);
    document.querySelector('#beamPanel .beam-workspace').hidden=on;
    $id('beamOverallCustomButton').classList.toggle('active',on);
    $id('beamOverallCustomButton').setAttribute('aria-pressed',String(on));
    document.querySelectorAll('[data-beam-family]').forEach(b=>{b.classList.toggle('active',!on&&b.dataset.beamFamily===beamFamily);b.setAttribute('aria-pressed',String(!on&&b.dataset.beamFamily===beamFamily));});
    if(on)renderOverall();
  }
  setBeamFamily=function(family){
    beamStates[beamFamily]={values:read('#beamPanel .beam-workspace')};
    if(beamDimensionOverrideActive())beamDrafts[beamFamily]={values:read('#beamDimensionFields'),form:$id('beamCustomMaterialForm').value,grade:$id('beamGrade').value,material:read('#beamMaterialFields')};
    overallMode(false);oldBeamFamily(family);
    const state=beamStates[family];
    if(state){
      $id('beamSection').value=state.values.beamSection;
      $id('beamDimensionOverride').checked=state.values.beamDimensionOverride;
      populateBeamCustomMaterialForms(true);
      $id('beamCustomMaterialForm').value=state.values.beamCustomMaterialForm;
      populateBeamGrades();populateBeamDirections();write(state.values);
    }
    updateBeamDimensionUi();calculateBeam();
  };
  const baseUpdateBeam=updateBeamDimensionUi;
  updateBeamDimensionUi=function(){
    baseUpdateBeam();
    const ea=beamFamily==='ea'&&beamDimensionOverrideActive();
    document.querySelector('#beamPanel .beam-section-figure').hidden=ea;
    $id('beamCustomMaterialField').hidden=ea||!beamDimensionOverrideActive();
    if(ea)$id('beamSectionSource').textContent='Ideal equal-angle geometry only. Principal properties are shown below; Beam capacity remains Not evaluated.';
  };
  const oldCalcBeam=calculateBeam;
  calculateBeam=function(){
    oldCalcBeam();
    if(beamFamily==='ea'&&beamDimensionOverrideActive()){
      const p=selectedBeamSection();
      $id('beamDimensionStatus').textContent=p?.geometryProperties?`Ideal sharp-corner geometry · A_g = ${f2(p.area)} mm²; r_u = ${f2(p.geometryProperties.ru)} mm; r_v = ${f2(p.geometryProperties.rv)} mm. Beam capacity: Not evaluated.`:p?.invalidReason||'Enter valid equal-angle dimensions.';
    }
  };
  $id('beamDimensionOverride').addEventListener('change',()=>{
    if($id('beamDimensionOverride').checked){
      const d=beamDrafts[beamFamily];
      if(d){write(d.values);$id('beamCustomMaterialForm').value=d.form;populateBeamGrades();write(d.material);$id('beamGrade').value=d.grade;populateBeamDirections();}
      else if(beamFamily==='ea'){
        // Existing accepted angle catalogue is a starting geometry, not a Beam capacity source.
        const p=sectionProductDirectory.ea[0];
        if(p){$id('beamDimEaB').value=p.b;$id('beamDimEaT').value=p.actualT||p.t;}
      }
    }
    updateBeamDimensionUi();populateBeamDirections();calculateBeam();
  });
  // Capture the custom basis before the existing off-toggle handler restores catalogue material.
  $id('beamDimensionOverride').addEventListener('change',()=>{
    if(!$id('beamDimensionOverride').checked)beamDrafts[beamFamily]={values:read('#beamDimensionFields'),form:$id('beamCustomMaterialForm').value,grade:$id('beamGrade').value,material:read('#beamMaterialFields')};
  },true);
  // The original app attached its family handler to .beam-family. The new button has no family value.
  // Stop only that handler on this button; the independent Custom controller never reaches geometry fallbacks.
  $id('beamOverallCustomButton').addEventListener('click',event=>{event.stopImmediatePropagation();overallMode(true);},true);
  inputs('#beamDimensionFields').forEach(e=>e.addEventListener('input',calculateBeam));
  function overallValues(){
    const n=id=>{const raw=$id('beamOverall'+id).value;return raw.trim()===''?NaN:Number(raw);};
    return {area:n('Area'),ix:n('Ix'),iy:n('Iy'),zex:n('Zex'),zey:n('Zey'),axis:$id('beamOverallAxis').value,fy:n('Fy'),fu:n('Fu'),confirmed:$id('beamOverallConfirmed').checked,
      shearModel:$id('beamOverallShearModel').value,aw:n('Aw'),fyw:n('Fyw'),alphaV:n('AlphaV'),ae:n('Ae')};
  }
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math=s=>'<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">'+s+'</math>';
  const sub=(s,i)=>'<msub><mi>'+s+'</mi><mi>'+i+'</mi></msub>',num=n=>'<mn>'+n+'</mn>',phi='<mi>φ</mi>',mul='<mo>×</mo>',eq='<mo>=</mo>';
  const formula=(web,chs)=>'<mrow>'+phi+sub(web||chs?'V':'M',web||chs?'v':'s')+eq+'<mfrac><mrow>'+phi+(web?sub('α','v')+mul+num('0.6')+mul+sub('f','y,w')+mul+sub('A','w'):chs?num('0.36')+mul+sub('f','y')+mul+sub('A','e'):sub('f','y')+mul+sub('Z','e'))+'</mrow><msup>'+num('10')+num(web||chs?'3':'6')+'</msup></mfrac></mrow>';
  function trace(title,formulaHtml,substitution,result,basis){return '<section class="section-custom-trace"><h3>'+title+'</h3>'+math(formulaHtml)+math('<mtext>'+esc(substitution)+'</mtext>')+'<p><b>'+result+'</b></p><small>'+basis+'</small></section>';}
  function renderOverall(){
    const v=overallValues(),r=S.genericBeam(v),web=v.shearModel==='flat-web',chs=v.shearModel==='chs';
    $id('beamOverallWebFields').hidden=!web;$id('beamOverallChsFields').hidden=!chs;
    $id('beamOverallWebFields').querySelectorAll('input').forEach(e=>e.disabled=!web);$id('beamOverallAe').disabled=!chs;
    $id('beamOverallShearHelp').textContent=web?'A_w is the gross web area. Enter a verified α_v ≤ 1 for approximately uniform shear, including buckling. Non-uniform shear: Not evaluated.':chs?'A_e must satisfy AS 4100 Cl. 5.11.4 hole and net-area conditions. CHS only.':'Shear remains Not evaluated until its model and inputs are verified.';
    for(const key of ['Area','Ix','Iy','Fy','Fu','Zex','Zey','Aw','Fyw','AlphaV','Ae']){
      const e=$id('beamOverall'+key),n=Number(e.value);
      let bad=!e.disabled&&e.value!==''&&(!Number.isFinite(n)||n<=0);
      if(key==='Fu'&&e.value!==''&&v.fy>0&&n<v.fy)bad=true;
      if(key==='AlphaV'&&web&&n>1)bad=true;
      if((key==='Aw'&&web||key==='Ae'&&chs)&&n>v.area)bad=true;
      e.setAttribute('aria-invalid',String(bad));
    }
    const result=(label,n,unit,reason)=>'<div class="section-custom-result"><b>'+label+'</b><strong>'+f2(n)+(n===null?'':' '+unit)+'</strong><small>'+esc(reason)+'</small></div>';
    $id('beamOverallResults').innerHTML=result('Moment · '+v.axis+'–'+v.axis,r.moment,'kN·m',r.momentReason)+result('Shear',r.shear,'kN',r.shearReason)+'<p class="result-note">Derived radii: r<sub>x</sub> = '+(r.rx===null?'—':f2(r.rx))+' mm; r<sub>y</sub> = '+(r.ry===null?'—':f2(r.ry))+' mm. For Review · section capacity only.</p>';
    let calc='';
    if(r.moment!==null)calc+=trace('Moment capacity',formula(false,false),`= 0.90 × ${f2(v.fy)} × ${f2(r.ze)} / 10⁶`,`φMₛ = ${f2(r.moment)} kN·m`,r.momentReason);
    else calc+='<p>Moment: Not evaluated. '+esc(r.momentReason)+'</p>';
    if(r.shear!==null)calc+=web?trace('Shear capacity',formula(true,false),`= 0.90 × ${f2(v.alphaV)} × 0.6 × ${f2(v.fyw)} × ${f2(v.aw)} / 10³`,`φVᵥ = ${f2(r.shear)} kN`,r.shearReason):trace('Shear capacity',formula(false,true),`= 0.90 × 0.36 × ${f2(v.fy)} × ${f2(v.ae)} / 10³`,`φVᵥ = ${f2(r.shear)} kN`,r.shearReason);
    else calc+='<p>Shear: Not evaluated. '+esc(r.shearReason)+'</p>';
    $id('beamOverallCalculation').innerHTML=calc;
  }
  inputs('#beamOverallCustom').forEach(e=>e.addEventListener(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',renderOverall));
  document.querySelectorAll('#beamOverallCustom details').forEach(d=>d.addEventListener('toggle',()=>{d.querySelector('summary i').textContent=d.open?'×':'+';}));
  document.querySelectorAll('.member-type').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.memberType===memberType)));
  updateMemberDimensionUi();updateBeamDimensionUi();renderOverall();
})();
