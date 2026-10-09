(function(){
  "use strict";
  const api=globalThis.BoltDimensions;
  if(!api)return;
  const panel=document.getElementById("boltPanel"),standalone=document.getElementById("boltDimensionsMount");
  if(!panel&&!standalone)return;
  const view=document.createElement("div");view.id="boltDimensionsView";view.className="bd-view";
  view.dataset.boltModePanel="dimensions";
  view.innerHTML=`
    <section class="lookup-card bd-card">
      <div class="bd-types" aria-label="Fastener type">
        <button type="button" data-bd-type="structural" class="branch-tab active" aria-pressed="true">Structural bolts</button>
        <button type="button" data-bd-type="ubolts" class="branch-tab" aria-pressed="false">U-bolts</button>
        <button type="button" data-bd-type="blind" class="branch-tab" aria-pressed="false">Blind bolts</button>
      </div>
      <p class="bd-scope" id="bdScope"></p>
      <div class="input-group-fields three bd-inputs bd-filter-toolbar" id="bdFilters" aria-label="Table filters">
          <label><span>Manufacturer</span><select id="bdMaker"></select></label>
          <label><span>Thread size</span><select id="bdSize"></select></label>
          <label><span>Code / keyword</span><input id="bdSearch" type="search" placeholder="Code, family or finish" autocomplete="off"></label>
      </div>
      <div class="section-heading bd-table-heading"><h2 id="bdTableTitle">Bolt, nut &amp; washer dimensions</h2><span id="bdCount" role="status" aria-live="polite"></span><button type="button" id="bdReset" class="bd-reset" hidden>Reset</button></div>
      <p class="bd-table-hint" id="bdTableHint">Dimensions: mm.</p>
      <div class="bd-table-wrap" role="region" aria-label="Fastener dimensions table" aria-describedby="bdTableHint" tabindex="0"><table id="bdTable"></table></div>
      <p class="bd-note" id="bdNote"></p>
      <section id="bdStructuralDocs" class="bd-hole-section">
        <div class="section-heading"><h2>Manufacturer documents</h2><span>K0 · class 8.8</span></div>
        <p class="bd-table-hint">Manufacturer statements; verify the supplied batch.</p>
        <div class="bd-table-wrap" role="region" aria-label="Structural bolt manufacturer documents table" tabindex="0"><table id="bdDocumentTable"></table></div>
        <p class="bd-note">Selected suppliers. Use the adopted Standard for preload requirements.</p>
      </section>
      <section id="bdHoles" class="bd-hole-section">
        <div class="section-heading"><h2>Bolt holes</h2><span>AS 4100:2020 Cl.14.3.2</span></div>
        <div class="bd-table-wrap" role="region" aria-label="Bolt hole dimensions and limits table" tabindex="0"><table id="bdHoleTable"></table></div>
        <p class="bd-note">Ordinary: d + 2 at d ≤ 24; max d + 3 above 24. Slots: width × total length. Oversized / slots show maxima. Baseplates excluded.</p>
      </section>
    </section>
    <details class="source-card bd-disclosure" id="bdInstallation" hidden><summary><span><b>Installation details</b></span><i>+</i></summary><div class="bd-table-wrap" role="region" aria-label="Additional installation dimensions table" tabindex="0"><table id="bdInstallationTable"></table></div></details>
    <details class="source-card bd-disclosure" id="bdBasis"><summary><span><b>Sources &amp; notes</b></span><i>+</i></summary><div class="bd-basis" id="bdSource"></div></details>
    <p class="bd-footer">Reference only; verify project suitability.</p>`;
  const q=id=>view.querySelector("#"+id),data=api.mergeCatalogue({
    ubolts:typeof uBoltProducts!=="undefined"?uBoltProducts:[],
    blind:typeof blindBoltProducts!=="undefined"?blindBoltProducts:[]
  });
  const state={type:"structural",filters:{ubolts:{maker:"",size:"",search:""},blind:{maker:"",size:"",search:""}}};
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const num=n=>Number.isFinite(n)?Number(n.toFixed(5)).toString():"Not stated";
  const range=r=>r?`${num(r[0])}–${num(r[1])}`:"Source conflict";
  const options=(node,items,value)=>{node.innerHTML=items.map(([id,label])=>`<option value="${esc(id)}">${esc(label)}</option>`).join("");node.value=items.some(([id])=>id===value)?value:"";return node.value;};
  const note=(s,title="")=>`<small class="bd-cell-note"${title?` title="${esc(title)}"`:""}>${esc(s)}</small>`;
  const numberCell=(value,extra="")=>`<td class="bd-number">${value}${extra}</td>`;
  const unknown=()=>'<span class="bd-missing" title="Not stated in the checked source">—</span>';
  const pending=()=>'<span class="bd-missing" title="Catalogue dimensions await source review">—</span>';
  const conflict=()=>'<span class="bd-conflict">Source conflict</span>';
  const dimension=n=>Number.isFinite(n)?esc(num(n)):unknown();
  const header=(label,unit="mm")=>({label:label+(unit?`<small>${unit}</small>`:""),numeric:true});
  const stressHeader=header('A<sub>s</sub>',"mm²");
  const tableObserver=typeof ResizeObserver==="function"?new ResizeObserver(entries=>entries.forEach(e=>e.target.querySelectorAll("table").forEach(updateTableGeometry))):null;
  function table(id,caption,headers,rows,groups=[]){
    const node=q(id),groupAt=i=>groups.findIndex(g=>i>=g.start&&i<=g.end);
    const cell=(h,i,span="")=>`<th id="${id}-col-${i}" scope="col"${span}${h.numeric?' class="bd-number"':''}>${h.label||h}</th>`;
    let top="",bottom="",columns="";
    for(let i=0;i<headers.length;i++){
      const g=groupAt(i);
      if(g<0){top+=cell(headers[i],i,groups.length?' rowspan="2"':"");columns+='<colgroup span="1"></colgroup>';}
      else{
        if(i===groups[g].start){const span=groups[g].end-i+1;top+=`<th id="${id}-group-${g}" class="bd-column-group" scope="colgroup" colspan="${span}">${esc(groups[g].label)}</th>`;columns+=`<colgroup span="${span}"></colgroup>`;}
        bottom+=cell(headers[i],i);
      }
    }
    node.classList.toggle("bd-grouped",!!groups.length);
    node.innerHTML=`<caption class="visually-hidden">${esc(caption)}</caption>${columns}<thead><tr class="${groups.length?'bd-group-row':''}">${top}</tr>${groups.length?`<tr class="bd-column-row">${bottom}</tr>`:""}</thead><tbody>${rows.length?rows.join(""):`<tr><td class="bd-empty" colspan="${headers.length}">No matches. Reset filters.</td></tr>`}</tbody>`;
    [...node.tBodies[0].rows].forEach((row,n)=>{
      if(!row.querySelector('th[scope="row"]'))return;
      const rowId=`${id}-row-${n}`;row.cells[0].id=rowId;
      [...row.cells].forEach((c,i)=>{if(i===0)return;const g=groupAt(i);c.setAttribute("headers",`${rowId} ${id}-col-${i}${g<0?'':` ${id}-group-${g}`}`);if(g>=0&&i===groups[g].start)c.classList.add("bd-group-start");});
    });
    node.parentElement.scrollTop=0;node.parentElement.scrollLeft=0;
    if(tableObserver)tableObserver.observe(node.parentElement);
    updateTableGeometry(node);
  }
  function updateTableGeometry(node){
    if(!node.getClientRects().length)return;
    const wrap=node.parentElement,overflow=wrap.scrollWidth>wrap.clientWidth+1;
    wrap.dataset.overflow=String(overflow);
    if(node.classList.contains("bd-grouped"))node.style.setProperty("--bd-group-top",node.tHead.rows[0].getBoundingClientRect().height+"px");
    if(node.id==="bdTable")q("bdTableHint").textContent="Dimensions: mm."+(overflow?" Scroll for more columns.":"");
  }
  function sourceLink(key){const s=data.sources[key];return `<p><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a><br><span>${esc(s.locator)} · ${esc(s.kind)} · checked ${esc(s.checked)}</span></p>`;}
  const documentPages={hobsonU:2,hbs:3,uni:3,nexgen:5};
  function documentLink(key,code){
    const s=data.sources[key],pdf=/\.pdf(?:$|\?)/i.test(s.url);
    const label=s.kind.includes("installation")?"Installation":pdf?"Datasheet":"Product page";
    const url=s.url+(pdf?"#page="+(documentPages[key]||1):"");
    return `<a href="${esc(url)}" target="_blank" rel="noopener" title="${esc(s.name)}" aria-label="${esc(code+': '+label+' · '+s.name)}">${label} ↗</a>`;
  }
  function documents(r){return `<td class="bd-documents">${r.source?documentLink(r.source,r.code):catalogueLink(r.catalogue,"Catalogue")}${r.secondarySource?documentLink(r.secondarySource,r.code):""}${r.source&&r.catalogue&&r.catalogue.sourceUrl!==data.sources[r.source].url?catalogueLink(r.catalogue,"Loads"):""}</td>`;}
  function catalogueLink(p,label){return `<a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener" title="${esc(p.sourceName)}" aria-label="${esc(p.code+': '+p.sourceName)}">${label||(/\.pdf(?:$|\?)/i.test(p.sourceUrl)?"Technical data":"Product page")} ↗</a>`;}
  function catalogueStatus(p){return ({Source_Online_Checked:"Manufacturer source checked online",Source_Checked:"Local reference checked",Source_Not_Verified:"Source not verified"})[p.sourceStatus]||"Source not verified";}
  function referenceLink(key,label,page){
    const s=data.sources[key],url=s.url+(page?"#page="+page:"");
    return `<a href="${esc(url)}" target="_blank" rel="noopener" title="${esc(s.name)}" aria-label="${esc(s.name+': '+label)}">${esc(label)} ↗</a>`;
  }
  function identity(r){return `<th scope="row" class="bd-code">${esc(r.code)}</th><td class="bd-maker">${esc(r.manufacturer)}${note(r.family)}</td><td class="bd-size">${esc(r.size)}</td>`;}
  function holeValue(d,type){const h=api.hole(d,type);return `${h.limit?"≤ ":""}${num(h.width)}${h.length?" × ≤ "+num(h.length):""}`;}
  function structural(){
    q("bdTableTitle").textContent="Bolt, nut & washer dimensions";
    q("bdCount").textContent="8 structural sizes";
    table("bdTable","AS/NZS 1252.1 structural bolt, nut and washer dimensions",[
      "Size",header("Pitch P"),header("Head AF s"),header("Head k"),stressHeader,header("Nut AF s"),header("Nut m"),header("Washer bore d₁"),header("Washer OD d₂"),header("Washer h")
    ],data.structural.map(r=>`<tr data-bd-id="${esc(r.id)}"><th scope="row" class="bd-code">${esc(r.id)}${r.nonpreferred?"*":""}</th>${numberCell(num(r.pitch))}${numberCell(range(r.af))}${numberCell(range(r.head))}${numberCell(num(r.As))}${numberCell(range(r.af))}${numberCell(range(r.nut))}${numberCell(range(r.washerID))}${numberCell(range(r.washerOD))}${numberCell(range(r.washerT))}</tr>`),[{label:"Bolt",start:1,end:4},{label:"Nut",start:5,end:6},{label:"Washer",start:7,end:9}]);
    table("bdHoleTable","AS 4100 bolt hole dimensions and maximum limits",["Size",header("Ordinary round"),header("Oversized round · max"),header("Short slot · max"),header("Long slot · max")],data.structural.map(r=>`<tr><th scope="row" class="bd-code">${esc(r.id)}${r.nonpreferred?"*":""}</th>${Object.keys(api.holeTypes).map(t=>numberCell(holeValue(r.d,t))).join("")}</tr>`));
    q("bdNote").textContent="Class 8.8 / 8. Ranges: min–max; bolts before galvanizing. * Nonpreferred sizes. Washer bore ≠ bolt hole.";
    table("bdDocumentTable","Structural bolt manufacturer documents and batch-document sources",["Manufacturer / family","Stated product standard","Product documents","Batch documents"],data.structuralDocuments.map(r=>`<tr><th scope="row" class="bd-maker">${esc(r.manufacturer)}${note(r.family)}</th><td>${esc(r.basis)}</td><td class="bd-documents">${r.documents.map(d=>referenceLink(d.source,d.label,d.page)).join("")}</td><td>${r.certificates?referenceLink(r.certificates,"Batch certificates"):"Not linked"}${note(r.trace)}</td></tr>`));
    q("bdSource").innerHTML=sourceLink("structural")+sourceLink("holes")+`<p>These dimensions apply to the specified class 8.8 / class 8 assemblies. EN 14399 assemblies, generic hex bolts, class 4.6 bolts, thin/large washers and proprietary fasteners require their own dimensions and installation data.</p><p>Local licensed editions were inspected. Standards New Zealand lists AS/NZS 1252.1:2016 as current with A1:2018. The AS 4100 source incorporates Amd 1:2021; Australian publisher current-status text was unavailable. Confirm project adoption before use. Thread tensile stress area follows Table 3.2's threaded test mandrel; no resistance is calculated.</p><h3>Australian assembly basis</h3><div class="bd-table-wrap" role="region" aria-label="Australian structural bolt assembly types" tabindex="0"><table id="bdAssemblyTypes"></table></div><p>These are assembly-type provisions, not approval of every supplier or batch. AS/NZS 1252.2:2016 covers verification testing separately from Part 1 manufacture/testing. Check matched bolt, nut and washer, lot traceability, supplied documents and project installation requirements. EN 14399-4 HV and EN 14399-10 HRC / TC bolts are not the HR assembly types identified by Cl.1.5–1.6; separate adoption evidence is required.</p><h3>Catalogue coverage</h3><p>Eight standard sizes are tabulated; manufacturer SKU, length, thread-length and finish combinations are not loaded. A supplier catalogue listing M33 does not add an M33 standard-dimension row here. Ordinary class 4.6 bolts, generic high-tensile hex bolts, stainless bolts, tower bolts and special assemblies remain outside this table.</p><h3>Manufacturer documents · checked 9 Oct 2026</h3>`+[...new Set(data.structuralDocuments.flatMap(r=>[...r.documents.map(d=>d.source),r.certificates].filter(Boolean)))].map(sourceLink).join("")+`<p>Product guides and sample certificates are manufacturer evidence; no supplied batch has been verified. Hobson 210520TA Table 2 includes M12, M22, M27 and M33, absent from the inspected AS 4100:2020 Table 15.2.2.2. Those extra preload values are not adopted by this handbook.</p><h3>Hole use conditions</h3><p>Hole values follow AS 4100:2020 Cl.14.3.2; they are geometry references, not permission to use a selected hole. Oversized and short slots require hardened or plate washers over the hole under the head and nut where bearing against that ply. Plate washers must completely cover the hole with edge overlap at least half its diameter. Long slots are restricted to alternate plies and require a plate washer at least 8 mm thick with the same coverage requirement; see the clause's adjacent-ply note.</p><p>For bearing connections carrying shear, slots must be normal to the action, bear uniformly and have no eccentric loading. Friction connections have separate slip checks. Plate-washer material follows AS/NZS 3678. Baseplate holes, edge/pitch distances, bolt length and thread engagement are excluded. A standard washer shown above is not automatically adequate for a slot or oversized hole.</p>`;
    table("bdAssemblyTypes","Australian structural bolt assembly basis",["Assembly type","AS/NZS 1252.1:2016 basis","Linked manufacturer example","Dimension coverage"],[
      `<tr><th scope="row">8.8 / 8 · AS/NZS 1252.1</th><td>Sections 2–4</td><td>${referenceLink("hobsonStructural","K0 guide",2)}</td><td>8 standard sizes</td></tr>`,
      `<tr><th scope="row">8.8 / 8 · EN 14399-3 HR</th><td>Cl.1.5 · alternative type</td><td>${referenceLink("hobsonStructural","K2 HR guide",3)}</td><td>Reference link only</td></tr>`,
      `<tr><th scope="row">10.9 / 10 · EN 14399-3 HR</th><td>Cl.1.6 · additional type</td><td>${referenceLink("hobsonStructural","K2 HR guide",3)}</td><td>Reference link only</td></tr>`
    ]);
  }
  function filtered(records=[...data[state.type],...data.other[state.type]]){
    const f=state.filters[state.type],term=f.search.trim().toLowerCase();
    return records.filter(r=>(!f.maker||r.manufacturer===f.maker)&&(!f.size||r.size===f.size)&&(!term||[r.code,r.size,r.manufacturer,r.family,r.finish,r.shape,r.catalogue?.fit,r.catalogue?.application,r.catalogue?.head].filter(Boolean).join(" ").toLowerCase().includes(term)))
      .sort((a,b)=>(Number.isFinite(a.d)?a.d:Infinity)-(Number.isFinite(b.d)?b.d:Infinity)||a.manufacturer.localeCompare(b.manufacturer)||(state.type==="ubolts"?(a.width??Infinity)-(b.width??Infinity):(a.grip?.[0]??Infinity)-(b.grip?.[0]??Infinity))||(a.length??Infinity)-(b.length??Infinity)||a.code.localeCompare(b.code));
  }
  function productBasis(rows,other){
    const keys=[...new Set(rows.flatMap(r=>[r.source,r.secondarySource].filter(Boolean)))];
    const notes=new Map();
    for(const r of rows){
      const p=r.catalogue;
      const retained=!r.source&&p?(state.type==="ubolts"?`Retained catalogue; dimensions pending. ${p.product}; ${p.fit}; ${p.material}`:`Retained catalogue; dimensions pending. Grip ${num(p.gripMin)}–${num(p.gripMax)} mm; hole ${num(p.hole)} mm; length ${num(p.drawing?.length)} mm; tightening ${p.torque}; centres ${p.centres}; ${p.head} head.`):"";
      for(const item of [r.note,r.gripConflict,r.torqueConflict,p?.valueBasis,p?.tensionLabel,p?.shearLabel,p?.capacityBasis,retained].filter(Boolean)){
        if(!notes.has(item))notes.set(item,[]);notes.get(item).push(r.code);
      }
    }
    const legacy=[...new Map([...rows,...other].filter(r=>r.catalogue).map(r=>[r.catalogue.sourceUrl,r.catalogue])).values()];
    const coverage=state.type==="ubolts"?"Checked: EzyStrut E14 and Hobson round/square kits. Family, clamp and custom entries are included with dimensions pending. Stainless, insulated and other supplier ranges remain incomplete.":"Checked: Hollo-Bolt hex-head, HBS HDG, UNI-BOLT galvanised, Blind Bolt ZF/HDG and NexGen2 standard. BoxBolt dimensions are pending. Other heads/finishes, zinc-clear, Thin Wall / Heavy Duty and special orders remain incomplete.";
    q("bdSource").innerHTML=(keys.length?keys.map(sourceLink).join(""):rows.length?"":"<p>No matches. Clear filters to view sources.</p>")+`<p>Selected catalogue entries; no interchangeability or connection acceptance implied. Pending dimensions are withheld. Load bases, factors and conditions remain product-specific. Check connected material, combined actions and installation separately. — means unavailable, not zero.</p>`+(rows.some(r=>r.holeTolerance)?"<p>Hollo-Bolt HB_MAR24 p.1: hole tolerance +1.0 / −0.2 mm at M8–M12; +2.0 / −0.2 at M16–M20. Drill HDG holes to the top tolerance. ICC installation conditions are separate.</p>":"")+(notes.size?"<h3>Row notes</h3>":"")+[...notes].map(([text,codes])=>`<p><b>${codes.map(esc).join(", ")}</b><br>${esc(text)}</p>`).join("")+(legacy.length?"<h3>Catalogue / load sources</h3><p>Carried from the existing lookup; not freshly revalidated. Dimension and load sources may differ.</p>":"")+legacy.map(p=>`<p><b>${esc(p.sourceName)}</b><br>${catalogueLink(p)} · ${esc(catalogueStatus(p))}</p>`).join("");
    q("bdSource").insertAdjacentHTML("beforeend",`<h3>Catalogue coverage</h3><p>${esc(coverage)}</p>`+(rows.some(r=>r.source==="ezy")?"<p>E14's sheet states AS/NZS 1594:2002 material and AS/NZS 4680:2006 coating. These are manufacturer-stated editions, not AS/NZS 1252 structural-assembly conformity or a code design resistance.</p>":"")+(rows.some(r=>r.source==="uni")?"<p>UNI-BOLT TDS 1053.1 (2025), p.4 states AS 4100-based design capacities from EAD testing / ETA 25/0374 with φ = 0.8 already included. Combined actions and connected material still require separate checks. This is a product-specific manufacturer basis; other ETA, ICC, Eurocode or working-load evidence does not establish Australian adoption by itself.</p>":""));
  }
  function reviewCell(r){
    const label=!r.source?"Pending":r.gripConflict||r.torqueConflict?"Field conflict":"Checked";
    return `<td class="bd-review" title="Dimension source status">${esc(label)}</td>`;
  }
  function loadCells(r,isU){
    const p=r.catalogue;
    if(isU){
      const published=p&&!['Not published','Project-specific'].includes(p.publishedCapacity);
      return numberCell(published?esc(p.publishedCapacity):unknown())+`<td class="bd-load-basis">${published?'Working load'+note('SF 3:1; direction not stated'):p?.publishedCapacity==='Project-specific'?'Project-specific':unknown()}</td>`;
    }
    const basis={
      "LRFD design strength (static / wind)":["ICC-ES · LRFD","Static / wind"],
      "Manufacturer working load":["Working load","Manufacturer"],
      "Manufacturer design capacity":["AS 4100 · Design","φ 0.8 included"],
      "ETA characteristic resistance":["ETA · Characteristic","No partial factor"],
      "BS EN 1993-1-8 design resistance":["Eurocode · Design","γM2 1.25 included"],
      "TIA-222-G design strength":["TIA-222-G · Design","Factors included"]
    }[p?.valueLabel];
    return numberCell(dimension(p?.tension))+numberCell(dimension(p?.shear))+`<td class="bd-load-basis" title="${esc(p?.valueBasis||'No published load basis')}">${basis?esc(basis[0])+note(basis[1]):esc(p?.valueLabel||'—')}</td>`;
  }
  function products(){
    const rows=filtered(),isU=state.type==="ubolts",f=state.filters[state.type];
    const checked=rows.filter(r=>r.source).length;
    q("bdTableTitle").textContent=isU?"U-bolts":"Blind bolts";
    q("bdCount").textContent=`${rows.length} entries · ${rows.length-checked} dimensions pending`;
    q("bdReset").hidden=!(f.maker||f.size||f.search);
    if(isU){
      table("bdTable","U-bolt dimensions and published loads",["Code","Manufacturer / family","Thread","Dim. status","Type / fit",header("Inside D / W"),header("Overall A / L"),header("Thread B / T"),header("Nominal bore"),"Finish",header("Published load","Original units"),"Load basis","Documents"],rows.map(r=>{
        const geometry=r.source?`<td>${esc(r.shape)}</td>${numberCell(dimension(r.width),note(r.widthSymbol))}${numberCell(dimension(r.length),note(r.lengthSymbol))}${numberCell(dimension(r.threadLength),note(r.threadSymbol))}${numberCell(dimension(r.nominalBore))}`:`<td class="bd-fit">${esc(r.catalogue.application)}${note(r.catalogue.fit)}</td>${[0,1,2,3].map(()=>numberCell(pending())).join("")}`;
        return `<tr data-bd-id="${esc(r.id)}">${identity(r)}${reviewCell(r)}${geometry}<td class="bd-finish">${esc(r.finish)}</td>${loadCells(r,true)}${documents(r)}</tr>`;
      }),[{label:"Dimensions & finish",start:3,end:9},{label:"Published loads",start:10,end:11}]);
      q("bdNote").textContent="Pending = dimensions not checked. — = unavailable. Loads retain their original basis; compare like for like.";
    }else{
      table("bdTable","Blind-bolt dimensions and published loads",["Code","Manufacturer / family","Thread","Dim. status",header("Hole"),header("Grip"),header("Length"),header("Tightening","Nm unless stated"),"Finish",header("Tension","kN"),header("Shear","kN"),"Load basis","Documents"],rows.map(r=>{
        let geometry;
        if(r.source){
          const hole=r.holeRange?range(r.holeRange):num(r.hole);
          const tolerance=r.holeTolerance?note(`${num(r.holeTolerance[0])} / +${num(r.holeTolerance[1])}`):note(r.holeRange?"Range":"Nominal",r.holeRange?"Manufacturer-published hole range":"Manufacturer nominal hole");
          const grip=r.grip?esc(range(r.grip))+(r.gripInches?note(`${range(r.gripInches)} in × 25.4`,`Converted from ${range(r.gripInches)} in at 25.4 mm/in`):""):conflict();
          const torque=r.torqueText?esc(r.torqueText):r.torque===null?conflict():dimension(r.torque);
          const lengthLabel=({"Bolt length L":"Bolt L","Length B (max)":"B max","Set screw length":"Set screw"})[r.lengthLabel]||r.lengthLabel;
          geometry=numberCell(esc(hole),tolerance)+numberCell(grip)+numberCell(dimension(r.length),note(lengthLabel,r.lengthLabel))+numberCell(torque);
        }else geometry=[0,1,2,3].map(()=>numberCell(pending())).join("");
        return `<tr data-bd-id="${esc(r.id)}">${identity(r)}${reviewCell(r)}${geometry}<td class="bd-finish">${esc(r.finish)}</td>${loadCells(r,false)}${documents(r)}</tr>`;
      }),[{label:"Dimensions & finish",start:3,end:8},{label:"Published loads",start:9,end:11}]);
      q("bdNote").textContent="Pending = dimensions not checked. Source conflict = field withheld. Loads retain their original basis; compare like for like.";
      table("bdInstallationTable","Blind-bolt installation details",["Code","Thread",header("Min hole centres"),header("Min outer ply"),header("Collar AF"),header("Anchor clearance"),header("Insertion depth clearance"),"Edge / ply conditions","Tools","Review"],rows.map(r=>`<tr data-bd-id="${esc(r.id)}"><th scope="row" class="bd-code">${esc(r.code)}</th><td>${esc(r.size)}</td>${[r.centres,r.outerMin,r.collarAF,r.clearance,r.depth].map(n=>numberCell(r.source?dimension(n):pending())).join("")}<td class="bd-conditions">${esc(r.catalogue?.edge||'—')}${note(r.catalogue?.outerPly||'')}${r.catalogue?catalogueLink(r.catalogue):''}</td><td>${esc(r.catalogue?.tools||'—')}</td>${reviewCell(r)}</tr>`),[{label:"Dimensions · mm",start:2,end:6},{label:"Catalogue conditions",start:7,end:8}]);
    }
    q("bdInstallation").hidden=isU||!rows.length;
    productBasis(rows,[]);
  }
  function render(){
    const standard=state.type==="structural";
    q("bdFilters").hidden=standard;q("bdHoles").hidden=!standard;q("bdStructuralDocs").hidden=!standard;q("bdInstallation").hidden=state.type!=="blind";q("bdReset").hidden=true;
    q("bdScope").hidden=!standard;
    q("bdScope").textContent=standard?"AS/NZS 1252.1 structural assemblies · M12–M36":"";
    view.querySelectorAll("[data-bd-type]").forEach(b=>{const on=b.dataset.bdType===state.type;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});
    if(standard){structural();return;}
    const records=[...data[state.type],...data.other[state.type]],f=state.filters[state.type];
    const makers=[...new Set(records.map(r=>r.manufacturer))].sort();
    const sizes=[...new Set(records.map(r=>r.size))].sort((a,b)=>Number(a.slice(1))-Number(b.slice(1)));
    f.maker=options(q("bdMaker"),[["","All manufacturers"],...makers.map(m=>[m,m])],f.maker);
    f.size=options(q("bdSize"),[["","All thread sizes"],...sizes.map(s=>[s,s])],f.size);
    if(q("bdSearch").value!==f.search)q("bdSearch").value=f.search;
    products();
  }
  view.addEventListener("click",e=>{const type=e.target.closest("[data-bd-type]");if(type){state.type=type.dataset.bdType;for(const id of ["bdInstallation","bdBasis"])q(id).open=false;render();updateRoute();}if(e.target.closest("#bdReset")){state.filters[state.type]={maker:"",size:"",search:""};render();}});
  [["bdMaker","maker"],["bdSize","size"]].forEach(([id,key])=>q(id).addEventListener("change",()=>{state.filters[state.type][key]=q(id).value;render();}));
  q("bdSearch").addEventListener("input",()=>{state.filters[state.type].search=q("bdSearch").value;products();});
  if(panel){
    const nav=panel.querySelector(".bolt-mode-tabs"),button=document.createElement("button");
    button.type="button";button.id="boltModeDimensions";button.className="branch-tab";button.dataset.boltMode="dimensions";button.setAttribute("role","tab");button.setAttribute("aria-selected","false");button.setAttribute("aria-controls",view.id);button.textContent="Fastener tables";
    nav.append(button);nav.after(view);view.hidden=true;
    nav.querySelector('[data-bolt-mode="standard"]').textContent="Bolt capacity";
    for(const mode of ["ubolt","blind"]){const legacyButton=nav.querySelector(`[data-bolt-mode="${mode}"]`);legacyButton.hidden=true;legacyButton.addEventListener("click",e=>{e.stopImmediatePropagation();state.type=mode==="ubolt"?"ubolts":"blind";render();show();},true);}
    nav.querySelector('[data-bolt-mode="standard"]').addEventListener("click",()=>{const url=new URL(location.href);url.searchParams.set("boltmode","standard");url.searchParams.delete("fastener");url.searchParams.delete("ubolt");url.searchParams.delete("blindbolt");history.replaceState(null,"",url);});
    function show(){
      panel.querySelectorAll("[data-bolt-mode-panel]").forEach(p=>p.hidden=p!==view);
      const connection=document.getElementById("connectionDetails"),source=panel.querySelector(":scope > details.source-card:not([data-bolt-mode-panel])");if(connection)connection.hidden=true;if(source)source.hidden=true;
      nav.querySelectorAll("[data-bolt-mode]").forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-selected",String(b===button));});
      document.getElementById("boltToolKicker").textContent="Fastener reference";document.getElementById("boltToolTitle").textContent="Fastener Tables";document.getElementById("boltToolStatus").textContent="For Review · Public beta";
      if(typeof boltMode!=="undefined")boltMode="dimensions";
      view.querySelectorAll("table").forEach(updateTableGeometry);
      updateRoute();
    }
    button.addEventListener("click",show);
    const params=new URLSearchParams(location.search),mode=params.get("boltmode");
    if(mode==="ubolt"||params.has("ubolt"))state.type="ubolts";
    else if(mode==="blind"||params.has("blindbolt"))state.type="blind";
    else if(["ubolts","blind","structural"].includes(params.get("fastener")))state.type=params.get("fastener");
    if(["dimensions","tables","ubolt","blind"].includes(mode)||params.has("ubolt")||params.has("blindbolt"))show();
  }else standalone.append(view);
  render();
  function updateRoute(){if(!panel)return;const url=new URL(location.href);url.searchParams.set("boltmode","tables");url.searchParams.set("fastener",state.type);url.searchParams.delete("ubolt");url.searchParams.delete("blindbolt");history.replaceState(null,"",url);}
})();
