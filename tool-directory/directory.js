"use strict";
(() => {
  const tools=window.HandbookDirectoryRegistry;
  const categories={'steel-connections':'Steel Connections','steel-members':'Steel Members',foundations:'Foundations','product-lookup':'Product Lookup'};
  const byId=new Map(tools.map(t=>[t.id,t]));
  const oldNames=new Map([...document.querySelectorAll('.tool-tab')].map(b=>[b.dataset.tool,b.textContent.trim()]));
  const home=document.getElementById('toolDirectory'),homeLink=document.getElementById('directoryHomeLink'),search=document.getElementById('directorySearch');
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let scheduled=false,focusNextTool=false,toolOpened=false,descriptions=false;
  const helpText=new Map(tools.map(t=>[t.id,t.description]));
  for(const [id,text] of Object.entries({home:'Browse all tools by category or search by name and purpose.','steel-connections':'Open bolt and weld capacity tools and fastener reference tables.','steel-members':'Open steel properties, corrosion references and member capacity tools.',foundations:'Open ground and concrete references, reinforcement tools and foundation product data.','product-lookup':'Open manufacturer data for guy assemblies and panel antennas.',rod:'Round bar: a solid circular steel section.'}))helpText.set(id,text);
  document.getElementById('directoryDescriptions').innerHTML=[...helpText].map(([id,text])=>`<div id="directory-help-${id}" class="directory-tooltip" role="tooltip" hidden>${escape(text)}</div>`).join('');
  let currentTrigger=null,currentTip=null,openTimer=null,closeTimer=null,pointerTrigger=null,focusTrigger=null,pointerTip=false,dismissedTrigger=null;
  function cancelTimers(){clearTimeout(openTimer);clearTimeout(closeTimer);}
  function closeTip(){cancelTimers();if(currentTip)currentTip.hidden=true;currentTip=null;currentTrigger=null;pointerTip=false;}
  function positionTip(){
    if(!currentTip||!currentTrigger?.isConnected)return;
    const r=currentTrigger.getBoundingClientRect();if(!r.width||!r.height){closeTip();return;}
    const edge=10,width=document.documentElement.clientWidth;
    currentTip.style.maxWidth=Math.min(280,width-2*edge)+'px';
    const tip=currentTip.getBoundingClientRect();
    currentTip.style.left=Math.max(edge,Math.min(r.left,width-tip.width-edge))+'px';
    const below=r.bottom+4,above=r.top-tip.height-4;
    currentTip.style.top=Math.max(edge,below+tip.height<=window.innerHeight-edge?below:above)+'px';
  }
  function openTip(trigger,delay){
    cancelTimers();if(trigger===dismissedTrigger)return;
    if(currentTrigger===trigger){positionTip();return;}
    closeTip();openTimer=setTimeout(()=>{
      if(!trigger.isConnected||trigger!==pointerTrigger&&trigger!==focusTrigger)return;
      currentTrigger=trigger;currentTip=document.getElementById('directory-help-'+trigger.dataset.directoryHelp);
      if(!currentTip)return;currentTip.hidden=false;positionTip();
    },delay);
  }
  function scheduleClose(){clearTimeout(closeTimer);closeTimer=setTimeout(()=>{if(!pointerTip&&currentTrigger!==pointerTrigger&&currentTrigger!==focusTrigger)closeTip();},160);}
  function helpTarget(node){return node instanceof Element?node.closest('[data-directory-help]'):null;}
  function describe(element,id){if(!element)return;element.dataset.directoryHelp=id;element.setAttribute('aria-describedby','directory-help-'+id);element.removeAttribute('title');}
  document.addEventListener('pointerover',event=>{
    if(event.pointerType==='touch')return;
    const trigger=helpTarget(event.target);if(!trigger||trigger.contains(event.relatedTarget))return;
    pointerTrigger=trigger;
    // Keep keyboard help tied to the visible focus, even when closing a popup
    // exposes a different label under a stationary pointer.
    if(focusTrigger&&focusTrigger!==trigger&&focusTrigger.matches(':focus-visible'))return;
    dismissedTrigger=null;openTip(trigger,350);
  });
  document.addEventListener('pointerout',event=>{
    const trigger=helpTarget(event.target);if(!trigger||trigger.contains(event.relatedTarget))return;
    if(pointerTrigger===trigger)pointerTrigger=null;scheduleClose();
  });
  document.addEventListener('focusin',event=>{const trigger=helpTarget(event.target);focusTrigger=trigger;if(trigger){dismissedTrigger=null;openTip(trigger,0);}else scheduleClose();});
  document.addEventListener('focusout',event=>{if(focusTrigger===helpTarget(event.target))focusTrigger=null;scheduleClose();});
  document.getElementById('directoryDescriptions').addEventListener('pointerover',event=>{if(event.target.closest('.directory-tooltip')){pointerTip=true;clearTimeout(closeTimer);}});
  document.getElementById('directoryDescriptions').addEventListener('pointerout',event=>{if(event.target.closest('.directory-tooltip')&&!event.target.contains(event.relatedTarget)){pointerTip=false;scheduleClose();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&(currentTip||openTimer)){dismissedTrigger=currentTrigger||pointerTrigger||focusTrigger;closeTip();}});
  document.addEventListener('click',()=>{dismissedTrigger=currentTrigger||focusTrigger;closeTip();});
  window.addEventListener('resize',positionTip);
  window.addEventListener('scroll',positionTip,true);
  window.addEventListener('hashchange',closeTip);
  const route=t=>t.route||t.id;
  function render(){
    closeTip();
    const query=search.value.trim().toLowerCase(),terms=query.split(/\s+/).filter(Boolean);
    let count=0;const output=[];
    for(const [key,label] of Object.entries(categories)){
      const matches=tools.filter(t=>t.category===key&&terms.every(q=>(t.name+' '+(oldNames.get(t.id)||'')+' '+(t.title||'')+' '+t.description+' '+t.keywords).toLowerCase().includes(q)));
      if(!matches.length)continue;count+=matches.length;
      output.push(`<section class="directory-group" aria-labelledby="directory-${key}"><h2 id="directory-${key}">${escape(label)}</h2><ul class="directory-list">${matches.map(t=>`<li><a class="directory-link" href="#${route(t)}" data-directory-tool="${t.id}" data-directory-help="${t.id}" aria-describedby="directory-help-${t.id}">${escape(t.name)}</a><p class="directory-inline-description" aria-hidden="true" ${descriptions?'':'hidden'}>${escape(t.description)}</p></li>`).join('')}</ul></section>`);
    }
    document.getElementById('directoryGroups').innerHTML=output.join('');
    document.getElementById('directoryEmpty').hidden=count>0;
    document.getElementById('directoryResultCount').textContent=`${count} of ${tools.length} tools${query?' matching your search':''}`;
    document.getElementById('directoryClear').hidden=!search.value;
  }
  function labels(){
    tools.forEach(t=>{
      const tab=document.querySelector(`.tool-tab[data-tool="${t.id}"]`);if(tab&&tab.textContent!==t.name)tab.textContent=t.name;
      describe(tab,t.id);
      if(t.title){const heading=document.querySelector(`#${t.id}Panel .tool-heading h2`);if(heading&&heading.textContent!==t.title)heading.textContent=t.title;}
    });
    document.querySelectorAll('[data-section-catalogue-family="rod"],[data-member-type="rod"],[data-beam-family="rod"]').forEach(b=>{
      if(b.textContent!=='Rod')b.textContent='Rod';
      describe(b,'rod');
      if(b.getAttribute('aria-label')!=='Rod — Round bar (solid circular section)')b.setAttribute('aria-label','Rod — Round bar (solid circular section)');
    });
    describe(homeLink,'home');
    document.querySelectorAll('.tool-category[data-category]').forEach(b=>describe(b,b.dataset.category));
  }
  function title(){
    if(document.body.classList.contains('directory-home')){document.title='Tool directory · SC Handbook';return;}
    const selected=document.querySelector('.tool-tab.active')?.dataset.tool,t=byId.get(selected);
    if(t){const heading=document.querySelector(`#${selected}Panel .tool-heading h2`);document.title=(heading?.textContent.trim()||t.title||t.name)+' · SC Handbook';}
  }
  function showHome(updateHash){
    closeTip();
    document.body.classList.add('directory-home');home.hidden=false;
    tools.forEach(t=>{const p=document.getElementById(t.id+'Panel');if(p){p.hidden=true;p.classList.remove('active');}});
    document.querySelectorAll('.tool-tab,.tool-category').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});
    homeLink.classList.add('active');homeLink.setAttribute('aria-current','page');homeLink.removeAttribute('aria-pressed');
    if(updateHash&&location.hash!=='#home')history.replaceState(null,'','#home');
    labels();title();
    if(updateHash||toolOpened){document.getElementById('directoryTitle').focus({preventScroll:true});window.scrollTo(0,0);}
  }
  function showTool(id){
    closeTip();
    toolOpened=true;
    document.body.classList.remove('directory-home');home.hidden=true;homeLink.classList.remove('active');homeLink.removeAttribute('aria-current');homeLink.removeAttribute('aria-pressed');labels();title();
    if(focusNextTool){focusNextTool=false;requestAnimationFrame(()=>{const h=document.querySelector(`#${id}Panel .tool-heading h2`);if(h){h.tabIndex=-1;h.focus({preventScroll:true});}window.scrollTo(0,0);});}
  }
  function initialRoute(){const hash=location.hash.slice(1);if(hash)return hash;const p=new URLSearchParams(location.search);return ['boltmode','ubolt','blindbolt','fastener','plate','reinforcement'].some(key=>p.has(key))?'bolt':'home';}
  window.ToolDirectory={isHome:id=>id==='home'||id==='directory',showHome,showTool,initialRoute};
  search.addEventListener('input',render);
  function reset(){search.value='';render();search.focus();}
  document.getElementById('directoryClear').addEventListener('click',reset);
  document.getElementById('directoryDescriptionsToggle').addEventListener('click',event=>{descriptions=!descriptions;event.currentTarget.setAttribute('aria-expanded',String(descriptions));render();});
  document.getElementById('directoryGroups').addEventListener('click',event=>{const a=event.target.closest('[data-directory-tool]');if(a&&event.button===0&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey)focusNextTool=true;});
  document.addEventListener('DOMContentLoaded',()=>{
    labels();title();
    const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;labels();title();});});
    observer.observe(document.querySelector('main'),{subtree:true,childList:true});
  });
  render();
})();
