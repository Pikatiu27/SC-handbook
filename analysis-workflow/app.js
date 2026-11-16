'use strict';
(() => {
  // Presentation only: existing model, calculation and drawing controllers retain ownership.
  const $=id=>document.getElementById(id);
  function jump(target){
    const sticky=[...document.querySelectorAll('.topbar,.tool-navigation')].filter(e=>e.getClientRects().length&&['sticky','fixed'].includes(getComputedStyle(e).position));
    const bottom=sticky.reduce((y,e)=>Math.max(y,e.getBoundingClientRect().bottom),0);
    window.scrollTo({top:window.scrollY+target.getBoundingClientRect().top-bottom-16,behavior:'instant'});
    target.focus({preventScroll:true});
  }
  for(const button of document.querySelectorAll('[data-analysis-jump]'))button.addEventListener('click',()=>jump($('aw-'+button.dataset.analysisJump)));
  const beam=$('beamforcesPanel'),state=$('aw-beam-state');
  function beamState(){
    const invalid=!$('bifErrors').hidden||(beam.classList.contains('bd-deformation')&&!$('bdErrors').hidden);
    const text=invalid?'Not evaluated · review input errors':'Live results · For Review';
    if(state.textContent!==text)state.textContent=text;
    state.dataset.state=invalid?'invalid':'calculated';
  }
  const observer=new MutationObserver(beamState);
  for(const id of ['bifErrors','bdErrors'])observer.observe($(id),{attributes:true,attributeFilter:['hidden']});
  observer.observe(beam,{attributes:true,attributeFilter:['class']});beamState();
  function positionOrigin(){
    const option=$('faMember').selectedOptions[0],member=option?.value;
    $('aw-frame-position-label').textContent=member?`Inspection x from ${member[0]} / m`:'Inspection position x / m';
  }
  $('faMember').addEventListener('change',positionOrigin);
  // Member selection also occurs by picking the figure or a peak.
  const readingObserver=new MutationObserver(positionOrigin);readingObserver.observe($('faLocalAxes'),{childList:true});positionOrigin();
})();
