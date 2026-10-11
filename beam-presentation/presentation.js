/* Local display mirrors; no capacity or geometry calculations. */
"use strict";
(() => {
  const panel=document.getElementById('beamPanel');
  const refresh=()=>{
    for(const [target,source] of [['beam-preview-direction','beamSummaryDirection'],['beam-preview-class','beamCompactness']]) {
      const cell=document.getElementById(target),text=document.getElementById(source).textContent;
      if(cell.textContent!==text)cell.textContent=text;
    }
    for(const id of ['beamMomentResultLabel','beamShearResultLabel']) {
      const cell=document.getElementById(id),text=cell.innerHTML.replace('Design section moment capacity','Moment').replace('Design section shear capacity','Shear').replace('Design web shear capacity','Shear');
      if(cell.innerHTML!==text)cell.innerHTML=text;
    }
  };
  const observer=new MutationObserver(refresh);
  for(const id of ['beamSummaryDirection','beamCompactness','beamMomentResultLabel','beamShearResultLabel'])observer.observe(document.getElementById(id),{childList:true,subtree:true,characterData:true});
  refresh();
})();
