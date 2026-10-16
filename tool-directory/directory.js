"use strict";
(() => {
  const tools=window.HandbookDirectoryRegistry;
  const categories={analysis:'Analysis',steel:'Steel',concrete:'Concrete',connections:'Connections',foundations:'Foundations',products:'Products'};
  const byId=new Map(tools.map(t=>[t.id,t]));
  const oldNames=new Map([...document.querySelectorAll('.tool-tab')].map(b=>[b.dataset.tool,b.dataset.legacyName||b.textContent.trim()]));
  const home=document.getElementById('toolDirectory'),homeLink=document.getElementById('directoryHomeLink'),search=document.getElementById('directorySearch'),productsLink=document.getElementById('directoryProductsLink');
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let scheduled=false,focusNextTool=false,toolOpened=false,descriptions=false,directoryMode='home';
  const productTools=tools.filter(t=>t.kind==='Product data');
  const helpText=new Map(tools.map(t=>[t.id,t.description]));
  for(const [id,text] of Object.entries({home:'Browse all tools by topic or search by name and purpose.',analysis:'Determinate beam reactions and shear/moment diagrams; no capacity or deflection check.',steel:'Steel section properties, capacity tools and corrosion references.',concrete:'Concrete cover, durability and reinforcement references.',connections:'Bolt and weld capacity tools; concrete-anchor and guy/fitting product data.',foundations:'Ground references, concrete pad capacity and pile or rock-anchor product data.',products:'Find manufacturer product data across all engineering topics.',rod:'Round bar: a solid circular steel section.'}))helpText.set(id,text);
  document.getElementById('directoryDescriptions').innerHTML=[...helpText].map(([id,text])=>`<div id="directory-help-${id}" class="directory-tooltip" role="tooltip" hidden>${escape(text)}</div>`).join('');
  let currentTrigger=null,currentTip=null,openTimer=null,closeTimer=null,pointerTrigger=null,focusTrigger=null,pointerTip=false,dismissedTrigger=null;
  let pointerPosition=null,dismissedPointerPosition=null;
  const pointerMoved=event=>!dismissedPointerPosition||event.clientX!==dismissedPointerPosition[0]||event.clientY!==dismissedPointerPosition[1];
  function pointerHelp(trigger){
    if(focusTrigger&&focusTrigger!==trigger&&focusTrigger.matches(':focus-visible'))return;
    dismissedTrigger=null;openTip(trigger,350);
  }
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
    pointerPosition=[event.clientX,event.clientY];
    const trigger=helpTarget(event.target);if(!trigger||trigger.contains(event.relatedTarget))return;
    pointerTrigger=trigger;
    // Escape can expose another label beneath the popup. A stationary pointer
    // must not reopen that label's hint; actual movement restores hover help.
    if(!pointerMoved(event))return;
    dismissedPointerPosition=null;pointerHelp(trigger);
  });
  document.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch')return;
    pointerPosition=[event.clientX,event.clientY];
    if(!dismissedPointerPosition||!pointerMoved(event))return;
    dismissedPointerPosition=null;
    const trigger=helpTarget(event.target);if(trigger){pointerTrigger=trigger;pointerHelp(trigger);}
  });
  document.addEventListener('pointerout',event=>{
    const trigger=helpTarget(event.target);if(!trigger||trigger.contains(event.relatedTarget))return;
    if(pointerTrigger===trigger)pointerTrigger=null;scheduleClose();
  });
  document.addEventListener('focusin',event=>{const trigger=helpTarget(event.target);focusTrigger=trigger;if(trigger){dismissedTrigger=null;openTip(trigger,0);}else scheduleClose();});
  document.addEventListener('focusout',event=>{if(focusTrigger===helpTarget(event.target))focusTrigger=null;scheduleClose();});
  document.getElementById('directoryDescriptions').addEventListener('pointerover',event=>{if(event.target.closest('.directory-tooltip')){pointerTip=true;clearTimeout(closeTimer);}});
  document.getElementById('directoryDescriptions').addEventListener('pointerout',event=>{if(event.target.closest('.directory-tooltip')&&!event.target.contains(event.relatedTarget)){pointerTip=false;scheduleClose();}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&(currentTip||openTimer)){dismissedTrigger=currentTrigger||pointerTrigger||focusTrigger;dismissedPointerPosition=pointerPosition?.slice()||null;closeTip();}});
  document.addEventListener('click',()=>{dismissedTrigger=currentTrigger||focusTrigger;closeTip();});
  window.addEventListener('resize',positionTip);
  window.addEventListener('scroll',positionTip,true);
  window.addEventListener('hashchange',closeTip);
  const route=t=>t.route||t.id;
  const phone=window.matchMedia('(max-width: 500px)');
  const phoneNames={corrosion:'Steel Corrosion',member:'Axial Member',beam:'Beam Section',chs4600:'CHS Bending',monopole:'Monopole Section',cover:'Concrete Cover',screw:'Screw Pile Data',rock:'Rock Anchor Data',anchors:'Concrete Anchor Data',antenna:'Antenna Specs'};
  const phoneCategories=categories;
  const displayName=t=>phone.matches?(phoneNames[t.id]||t.name):t.name;
  function render(){
    closeTip();
    const query=search.value.trim().toLowerCase(),terms=query.split(/\s+/).filter(Boolean);
    const candidates=directoryMode==='products'?productTools:tools;
    let count=0;const output=[];
    for(const [key,label] of Object.entries(categories)){
      const matches=candidates.filter(t=>t.category===key&&terms.every(q=>(t.name+' '+(oldNames.get(t.id)||'')+' '+(t.title||'')+' '+t.description+' '+t.keywords+' '+categories[t.category]).toLowerCase().includes(q)));
      if(!matches.length)continue;count+=matches.length;
      const groupLabel=key==='products'?'Equipment':label;
      output.push(`<section class="directory-group${key==='products'?' directory-equipment':''}" aria-labelledby="directory-${key}"><h2 id="directory-${key}">${escape(groupLabel)}</h2><ul class="directory-list">${matches.map(t=>`<li><a class="directory-link" href="#${route(t)}" data-directory-tool="${t.id}" data-directory-help="${t.id}" aria-label="${escape(t.name)}" aria-describedby="directory-help-${t.id}">${escape(displayName(t))}</a><p class="directory-inline-description" aria-hidden="true" ${descriptions?'':'hidden'}>${escape(t.description)}</p></li>`).join('')}</ul></section>`);
    }
    document.getElementById('directoryGroups').innerHTML=output.join('');
    document.getElementById('directoryEmpty').hidden=count>0;
    document.getElementById('directoryResultCount').textContent=`${count} of ${candidates.length} ${directoryMode==='products'?'product tools':'tools'}${query?' matching your search':''}`;
    document.getElementById('directoryClear').hidden=!search.value;
  }
  function labels(){
    const descriptionsButton=document.getElementById('directoryDescriptionsToggle'),descriptionLabel=phone.matches?'Details':'Descriptions';
    if(descriptionsButton.textContent!==descriptionLabel)descriptionsButton.textContent=descriptionLabel;
    descriptionsButton.setAttribute('aria-label','Descriptions');
    for(const option of document.querySelectorAll('#reoMemberType option')){
      if(!option.dataset.fullLabel)option.dataset.fullLabel=option.textContent;
      const short={wide:'Wide: slab/wall/flange',narrow:'Narrow: web/column core'}[option.value];
      const label=phone.matches&&short?short:option.dataset.fullLabel;
      if(option.textContent!==label)option.textContent=label;
      option.setAttribute('title',option.dataset.fullLabel);
    }
    tools.forEach(t=>{
      const tab=document.querySelector(`.tool-tab[data-tool="${t.id}"]`);if(tab&&tab.textContent!==displayName(t))tab.textContent=displayName(t);
      if(tab)tab.setAttribute('aria-label',t.name);
      describe(tab,t.id);
      if(t.title){const heading=document.querySelector(`#${t.id}Panel .tool-heading h2`);if(heading&&heading.textContent!==t.title)heading.textContent=t.title;}
    });
    document.querySelectorAll('[data-section-catalogue-family="rod"],[data-member-type="rod"],[data-beam-family="rod"]').forEach(b=>{
      if(b.textContent!=='Rod')b.textContent='Rod';
      describe(b,'rod');
      if(b.getAttribute('aria-label')!=='Rod — Round bar (solid circular section)')b.setAttribute('aria-label','Rod — Round bar (solid circular section)');
    });
    describe(homeLink,'home');
    describe(productsLink,'products');
    document.querySelectorAll('.tool-category[data-category]').forEach(b=>{const key=b.dataset.category,label=phone.matches?phoneCategories[key]:categories[key];if(label&&b.textContent!==label)b.textContent=label;b.setAttribute('aria-label',categories[key]);describe(b,key);});
    const selected=document.querySelector('.tool-tab.active')?.dataset.tool,t=byId.get(selected);
    const mobileName=document.getElementById('mobileToolName'),mobileCategory=document.getElementById('mobileToolCategory');
    if(t&&mobileName&&mobileName.textContent!==displayName(t))mobileName.textContent=displayName(t);
    const categoryText=t&&(phone.matches?phoneCategories[t.category]:categories[t.category]);
    if(categoryText&&mobileCategory&&mobileCategory.textContent!==categoryText)mobileCategory.textContent=categoryText;
  }
  function title(){
    if(document.body.classList.contains('directory-home')){document.title=(directoryMode==='products'?'Products':'Tool directory')+' · SC Handbook';return;}
    const selected=document.querySelector('.tool-tab.active')?.dataset.tool,t=byId.get(selected);
    if(t){const heading=document.querySelector(`#${selected}Panel .tool-heading h2`);document.title=(heading?.textContent.trim()||t.title||t.name)+' · SC Handbook';}
  }
  function showHome(updateHash,requestedRoute='home'){
    closeTip();
    const mode=requestedRoute==='products'?'products':'home';
    if(mode!==directoryMode)search.value='';
    directoryMode=mode;
    document.body.classList.add('directory-home');home.hidden=false;
    document.body.classList.toggle('directory-products',mode==='products');
    if(phone.matches)homeLink.parentElement.scrollLeft=0;
    tools.forEach(t=>{const p=document.getElementById(t.id+'Panel');if(p){p.hidden=true;p.classList.remove('active');}});
    document.querySelectorAll('.tool-tab,.tool-category').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});
    homeLink.classList.toggle('active',mode==='home');
    if(mode==='home')homeLink.setAttribute('aria-current','page');else homeLink.removeAttribute('aria-current');
    homeLink.removeAttribute('aria-pressed');
    productsLink.classList.toggle('active',mode==='products');
    if(mode==='products')productsLink.setAttribute('aria-current','page');else productsLink.removeAttribute('aria-current');
    document.getElementById('directoryTitle').textContent=mode==='products'?'Products':'Tools';
    if(updateHash&&location.hash!=='#'+mode)history.replaceState(null,'','#'+mode);
    render();labels();title();
    if(updateHash||toolOpened){document.getElementById('directoryTitle').focus({preventScroll:true});window.scrollTo(0,0);}
  }
  function showTool(id){
    closeTip();
    toolOpened=true;
    document.body.classList.remove('directory-home','directory-products');home.hidden=true;homeLink.classList.remove('active');homeLink.removeAttribute('aria-current');homeLink.removeAttribute('aria-pressed');
    productsLink.classList.toggle('active',byId.get(id)?.category==='products');
    productsLink.removeAttribute('aria-current');labels();title();
    if(focusNextTool){focusNextTool=false;requestAnimationFrame(()=>{const h=document.querySelector(`#${id}Panel .tool-heading h2`);if(h){h.tabIndex=-1;h.focus({preventScroll:true});}window.scrollTo(0,0);});}
  }
  function initialRoute(){const hash=location.hash.slice(1);if(hash)return hash;const p=new URLSearchParams(location.search);return ['boltmode','ubolt','blindbolt','fastener','plate','reinforcement'].some(key=>p.has(key))?'bolt':'home';}
  window.ToolDirectory={isHome:id=>id==='home'||id==='directory'||id==='products',showHome,showTool,initialRoute};
  search.addEventListener('input',render);
  phone.addEventListener('change',()=>{render();labels();title();});
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
