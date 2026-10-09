"use strict";
(function(root){
  const missing=v=>v===undefined||v===null||v===""||v==="—";
  const number=v=>!missing(v)&&/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(String(v).trim())&&Number.isFinite(Number(v))?Number(v):null;
  const text=v=>missing(v)?"—":String(v);
  function engine(value,numeric,basis){
    const filters=new Map();let sort=null;
    const accepts=(p,key,f)=>{
      if(f.basis&&basis(p)!==f.basis)return false;
      if(f.values&&!f.values.includes(text(value(p,key))))return false;
      const n=numeric(p,key);
      if(f.min!==undefined&&(n===null||n<f.min))return false;
      if(f.max!==undefined&&(n===null||n>f.max))return false;
      return true;
    };
    const active=f=>f&&(f.values!==null&&f.values!==undefined||f.min!==undefined||f.max!==undefined||Boolean(f.basis));
    function apply(rows,except){
      const result=rows.filter(p=>[...filters].every(([key,f])=>key===except||accepts(p,key,f)));
      if(sort&&(sort.key!=="$rating"||new Set(result.filter(p=>numeric(p,"$rating")!==null).map(basis)).size<=1)){
        const dir=sort.direction==="asc"?1:-1,key=sort.key;
        result.sort((a,b)=>{
          const x=numeric(a,key),y=numeric(b,key);
          if(x!==null||y!==null){if(x===null)return 1;if(y===null)return -1;return dir*(x-y);}
          return dir*text(value(a,key)).localeCompare(text(value(b,key)),undefined,{numeric:true});
        });
      }
      return result;
    }
    return {filters,apply,active,get sort(){return sort;},set(key,f){active(f)?filters.set(key,f):filters.delete(key);},order(key,direction){sort=direction?{key,direction}:null;},clear(key){filters.delete(key);if(sort?.key===key)sort=null;},reset(){filters.clear();sort=null;}};
  }
  function mount({panel,head,bar,rows,columns,value,numeric,basis,onChange}){
    const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    const state=engine(value,numeric,basis),dialog=document.createElement("dialog");
    dialog.id="guyColumnFilter";dialog.className="guy-column-filter";dialog.setAttribute("aria-labelledby","guyColumnFilterTitle");panel.append(dialog);
    let originKey=null,currentKey=null,draft={},checked=new Set(),domain=[],search="",anchor=null;
    const keysFor=k=>k==="$model"?["$model","$supplier","$series"]:[k];
    const label=k=>({$model:"Model / size",$supplier:"Supplier",$series:"Construction / end form"}[k]||columns().find(c=>c.key===k)?.label||k);
    const sourceButton=()=>[...head.querySelectorAll("[data-column]")].find(b=>b.dataset.column===originKey);
    function close(){if(dialog.open)dialog.close();sourceButton()?.setAttribute("aria-expanded","false");sourceButton()?.focus({preventScroll:true});}
    function update(){onChange();}
    function updateList(){
      const list=dialog.querySelector("[data-values]"),shown=domain.filter(v=>v.toLowerCase().includes(search.toLowerCase()));
      list.innerHTML=shown.map((v,i)=>`<label><input type="checkbox" data-value-index="${domain.indexOf(v)}" ${checked.has(v)?"checked":""}><span>${esc(v==="—"?"— (not recorded)":v)}</span></label>`).join("")||'<p class="guy-filter-note">No values match this search.</p>';
      dialog.querySelector("[data-select-all]").textContent=search?"Select search results":"Select all";
      dialog.querySelector("[data-selection]").textContent=`${checked.size} of ${domain.length} values selected`;
    }
    function load(key){
      currentKey=key;draft={...(state.filters.get(key)||{})};search="";
      domain=[...new Set(rows().map(p=>text(value(p,key))))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
      for(const v of draft.values||[])if(!domain.includes(v))domain.push(v);
      checked=new Set(draft.values??domain);
      const numericColumn=rows().some(p=>numeric(p,key)!==null),bases=[...new Set(rows().filter(p=>numeric(p,"$rating")!==null).map(basis))];
      const basisFilter=key==="$rating"?`<label class="guy-filter-field">Rating basis<select data-basis><option value="">All published bases</option>${bases.map(b=>`<option ${draft.basis===b?"selected":""}>${esc(b)}</option>`).join("")}</select></label><p class="guy-filter-note">Compare one rating basis at a time. kN is a unit conversion.</p>`:"";
      const canCompare=key!=="$rating"||Boolean(draft.basis)||bases.length<=1;
      dialog.innerHTML=`<header><div><p class="guy-filter-eyebrow">Column filter</p><h3 id="guyColumnFilterTitle">${esc(label(originKey))}</h3></div><button type="button" data-close aria-label="Close column filter">×</button></header>${originKey==="$model"?`<label class="guy-filter-field">Filter by<select data-field>${keysFor(originKey).map(k=>`<option value="${k}" ${key===k?"selected":""}>${esc(label(k))}</option>`).join("")}</select></label>`:""}${basisFilter}<div class="guy-filter-sort"><button type="button" data-sort="asc" ${canCompare?"":"disabled"} aria-pressed="${state.sort?.key===key&&state.sort.direction==="asc"}">${numericColumn?"↑ Smallest first":"↑ A to Z"}</button><button type="button" data-sort="desc" ${canCompare?"":"disabled"} aria-pressed="${state.sort?.key===key&&state.sort.direction==="desc"}">${numericColumn?"↓ Largest first":"↓ Z to A"}</button></div>${numericColumn?`<fieldset class="guy-filter-range" ${canCompare?"":"disabled"}><legend>${key==="$rating"?"Published rating (kN)":esc(label(key))} · range</legend><label>Minimum<input data-min inputmode="decimal" value="${esc(draft.min)}" placeholder="No minimum"></label><label>Maximum<input data-max inputmode="decimal" value="${esc(draft.max)}" placeholder="No maximum"></label></fieldset>`:""}${!canCompare?'<p class="guy-filter-note">Choose a rating basis to enable numeric range and sorting.</p>':""}<label class="guy-filter-field"><span class="sr-only">Search filter values</span><input type="search" data-search placeholder="Search values" autocomplete="off"></label><div class="guy-filter-select"><button type="button" data-select-all>Select all</button><button type="button" data-select-none>Select none</button></div><div data-values class="guy-filter-values" role="group" aria-label="Select column values"></div><p data-selection class="guy-filter-note"></p><p data-error class="guy-filter-error" role="alert" hidden></p><footer><button type="button" data-clear>Clear column</button><button type="button" data-apply>Apply</button></footer>`;
      dialog.querySelectorAll(".guy-filter-note").forEach(n=>{if(n.textContent.startsWith("Choose a rating basis"))n.dataset.mixedNote="";});
      updateList();
      const height=dialog.getBoundingClientRect().height;
      dialog.style.top=Math.max(12,anchor.bottom+6+height<=window.innerHeight-12?anchor.bottom+6:anchor.top-height-6)+"px";
      dialog.querySelector("[data-search]").focus({preventScroll:true});
    }
    function open(button){
      originKey=button.dataset.column;
      const bounds=button.getBoundingClientRect(),width=Math.min(320,window.innerWidth-24);anchor=bounds;
      dialog.style.width=width+"px";dialog.style.left=Math.max(12,Math.min(bounds.left,window.innerWidth-width-12))+"px";
      dialog.style.top=Math.max(12,Math.min(bounds.bottom+6,window.innerHeight-580))+"px";
      button.setAttribute("aria-expanded","true");dialog.showModal();load(originKey);
    }
    head.addEventListener("click",e=>{const b=e.target.closest("[data-column]");if(b)open(b);});
    dialog.addEventListener("cancel",e=>{e.preventDefault();close();});
    dialog.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation();close();}},true);
    dialog.addEventListener("click",e=>{
      if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();return;}
      const b=e.target.closest("button");if(!b)return;
      if(b.hasAttribute("data-close")){close();return;}
      if(b.hasAttribute("data-select-all")){domain.filter(v=>v.toLowerCase().includes(search.toLowerCase())).forEach(v=>checked.add(v));updateList();return;}
      if(b.hasAttribute("data-select-none")){domain.filter(v=>v.toLowerCase().includes(search.toLowerCase())).forEach(v=>checked.delete(v));updateList();return;}
      if(b.hasAttribute("data-clear")){state.clear(currentKey);close();update();sourceButton()?.focus({preventScroll:true});return;}
      if(b.hasAttribute("data-sort")||b.hasAttribute("data-apply")){
        const min=dialog.querySelector("[data-min]"),max=dialog.querySelector("[data-max]"),basisChoice=dialog.querySelector("[data-basis]")?.value||"";
        const numericEnabled=!min?.closest("fieldset").disabled;
        const low=numericEnabled&&min?.value.trim()?number(min.value.trim()):undefined,high=numericEnabled&&max?.value.trim()?number(max.value.trim()):undefined;
        if(low===null||high===null||low!==undefined&&high!==undefined&&low>high||currentKey==="$rating"&&(low<0||high<0)){
          const error=dialog.querySelector("[data-error]");error.hidden=false;error.textContent="Enter valid numbers with minimum ≤ maximum. Ratings must be non-negative.";return;
        }
        state.set(currentKey,{values:checked.size===domain.length?null:[...checked],min:low,max:high,basis:basisChoice});
        // Numeric ordering may never span different original rating bases.
        if(b.hasAttribute("data-sort"))state.order(currentKey,b.dataset.sort);
        if(currentKey==="$rating"&&state.sort?.key==="$rating"&&!basisChoice&&new Set(rows().filter(p=>numeric(p,"$rating")!==null).map(basis)).size>1)state.order(null,null);
        close();update();sourceButton()?.focus({preventScroll:true});
      }
    });
    dialog.addEventListener("input",e=>{if(e.target.hasAttribute("data-search")){search=e.target.value;updateList();}});
    dialog.addEventListener("change",e=>{
      if(e.target.hasAttribute("data-value-index")){const v=domain[Number(e.target.dataset.valueIndex)];e.target.checked?checked.add(v):checked.delete(v);dialog.querySelector("[data-selection]").textContent=`${checked.size} of ${domain.length} values selected`;}
      if(e.target.hasAttribute("data-field"))load(e.target.value);
      if(e.target.hasAttribute("data-basis")){
        draft.basis=e.target.value;const enabled=Boolean(draft.basis)||new Set(rows().filter(p=>numeric(p,"$rating")!==null).map(basis)).size<=1;
        const range=dialog.querySelector("fieldset");if(range)range.disabled=!enabled;dialog.querySelectorAll("[data-sort]").forEach(b=>b.disabled=!enabled);
        dialog.querySelectorAll("[data-mixed-note]").forEach(n=>n.hidden=enabled);
      }
    });
    bar.addEventListener("click",e=>{
      const b=e.target.closest("button");if(!b)return;
      if(b.hasAttribute("data-clear-filters"))state.reset();
      else if(b.dataset.removeFilter)state.clear(b.dataset.removeFilter);
      else if(b.hasAttribute("data-clear-sort"))state.order(null,null);
      update();bar.querySelector("button")?.focus({preventScroll:true});
    });
    function decorate(){
      head.querySelectorAll("[data-column]").forEach(b=>{
        const keys=keysFor(b.dataset.column),active=keys.some(k=>state.filters.has(k)),sorted=keys.includes(state.sort?.key);
        b.dataset.active=String(active);b.dataset.sorted=String(sorted);b.querySelector(".guy-filter-icon").innerHTML=active?'<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path fill="currentColor" d="M1 2h14l-5.5 6v5l-3 1V8z"/></svg>':sorted?(state.sort.direction==="asc"?"↑":"↓"):'&#9662;';
        b.setAttribute("aria-label",`${label(b.dataset.column)}: filter and sort${active?"; filter active":""}${sorted?"; sorted "+state.sort.direction:""}`);
        b.closest("th").setAttribute("aria-sort",sorted?(state.sort.direction==="asc"?"ascending":"descending"):"none");
      });
      const items=[...state.filters].map(([key,f])=>{
        const parts=[f.basis,f.values?f.values.length===1?f.values[0]:`${f.values.length} selected`:"",f.min!==undefined?`≥ ${f.min}`:"",f.max!==undefined?`≤ ${f.max}`:""].filter(Boolean);
        return `<button type="button" data-remove-filter="${esc(key)}" aria-label="Clear ${esc(label(key))} filter">${esc(label(key))}: ${esc(parts.join(" · "))} <span aria-hidden="true">×</span></button>`;
      });
      if(state.sort)items.push(`<button type="button" data-clear-sort aria-label="Clear column sort">${esc(label(state.sort.key))} ${state.sort.direction==="asc"?"↑":"↓"} <span aria-hidden="true">×</span></button>`);
      bar.innerHTML=items.length?items.join("")+'<button type="button" data-clear-filters class="guy-clear-filters">Clear all</button>':'<span>Use column headers to filter or sort. Supplier is under Model / size.</span>';
    }
    new MutationObserver(()=>{if(panel.hidden&&dialog.open)close();}).observe(panel,{attributes:true,attributeFilter:["hidden"]});
    return {state,decorate,reset(){if(dialog.open)close();state.reset();}};
  }
  const api={engine,mount,number,text};if(typeof module!=="undefined"&&module.exports)module.exports=api;root.GuyHeaderFilters=api;
})(globalThis);
