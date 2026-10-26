'use strict';
(function(root){
  const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function isStore(url){try{const u=new URL(url);return u.hostname==='store.standards.org.au'||u.hostname==='www.standards.govt.nz'&&u.pathname.startsWith('/shop/');}catch{return false;}}
  function reference(label,title=''){return `<span class="sc-standard-reference"${title?` title="${escape(title)}"`:''}>${escape(label)}</span>`;}
  function detail(label,attribute,id,controls,title){return `<button type="button" class="sc-name-detail" ${attribute}="${escape(id)}" aria-controls="${escape(controls)}" aria-expanded="false" aria-label="${escape(title)}">${escape(label)}</button>`;}
  const api={isStore,reference,detail};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.SCReferenceActions=api;
})(globalThis);
