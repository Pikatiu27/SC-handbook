"use strict";
(function(root){
 function status(p,diameter){
  const v=p.properties||{},missing=[];
  const chartOnly=/matching chart only/i.test(v['Data completeness']||'');
  const conflict=Boolean(p.fieldIssues?.length);
  if(p.family!=='Accessories'&&!Number.isFinite(diameter(p)))missing.push(['Guy strand','Guy wire rope'].includes(p.family)?'overall diameter':'comparable size');
  if(['Guy strand','Guy wire rope','Turnbuckle','Rigging screw','Shackle','Dead-end'].includes(p.family)&&!p.rating&&!p.fieldIssues?.some(i=>i.field==='WLL'))missing.push('published rating');
  const comparison=[...missing];
  if(['Guy strand','Guy wire rope'].includes(p.family)){
   if(v['Metallic area (mm²)']===undefined)missing.push('metallic area');
   if(v['Linear mass (kg/m)']===undefined)missing.push('linear mass');
   if(v['Axial stiffness EA (kN)']===undefined)missing.push('E/EA');
   if(v['Prestretch']===undefined)missing.push('prestretch');
  }
  return {label:conflict?'Source conflict':chartOnly?'Chart only':comparison.includes('overall diameter')||comparison.includes('comparable size')?'Size gap':comparison.includes('published rating')?'Rating gap':'',missing,chartOnly,conflict};
 }
 const api={status};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.GuyCatalogueStatus=api;
})(globalThis);

"use strict";
(function () {
  const panel = document.getElementById("guyPanel");
  if (!panel) return;
  const $ = id => document.getElementById("guy" + id);
  const { products, sources } = GuyFittingsData;
  const calc = GuyCatalogueUnits;
  const fmt = EngineeringNumberFormat.decimalHalfUp;
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const families = ["Guy strand", "Guy wire rope", "Turnbuckle", "Rigging screw", "Shackle", "Dead-end", "Thimble", "Wire rope grip", "Accessories"];
  let matching = [], selected = null, relatedBack = null;
  const drawer=$("Drawer"), phoneDrawer=window.matchMedia("(max-width:899px)");
  let drawerOrigin=null;
  function viewPosition(){const wrap=$("Table").closest('.guy-table-wrap');return {left:wrap.scrollLeft,top:wrap.scrollTop,x:window.scrollX,y:window.scrollY};}
  function restorePosition(view){const wrap=$("Table").closest('.guy-table-wrap');wrap.scrollLeft=view.left;wrap.scrollTop=view.top;window.scrollTo({left:view.x,top:view.y,behavior:"instant"});}
  function closeDrawer(restore=true) {
    const view=viewPosition();
    if(drawer.open) drawer.close();
    $("Selection").open=false;$("Selection").hidden=true;
    renderTable();
    if(restore) {
      const button=[...$("Rows").querySelectorAll('button[data-product]')].find(b=>b.dataset.product===(drawerOrigin||selected?.id));
      (button||$("Search")).focus({preventScroll:true});
    }
    restorePosition(view);
  }
  function openDrawer() {
    if(!selected)return;
    $("DrawerTitle").textContent=selected.code;
    $("Selection").hidden=false;$("Selection").open=true;
    if(!drawer.open) phoneDrawer.matches?drawer.showModal():drawer.show();
    drawer.setAttribute("aria-modal",String(phoneDrawer.matches));
    renderTable();$("DrawerTitle").focus({preventScroll:true});
    drawer.querySelector('.guy-drawer-scroll').scrollTop=0;
  }
  $("DrawerClose").addEventListener("click",()=>closeDrawer());
  drawer.addEventListener("cancel",e=>{e.preventDefault();closeDrawer();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&drawer.open){e.preventDefault();closeDrawer();}});
  new MutationObserver(()=>{if(panel.hidden&&drawer.open)closeDrawer(false);}).observe(panel,{attributes:true,attributeFilter:["hidden"]});
  phoneDrawer.addEventListener("change",()=>{
    if(!drawer.open){renderTable();return;}
    drawer.close();phoneDrawer.matches?drawer.showModal():drawer.show();
    drawer.setAttribute("aria-modal",String(phoneDrawer.matches));
    renderTable();
    $("DrawerTitle").focus({preventScroll:true});
  });
  function options(el, values, preferred) {
    el.replaceChildren(...values.map(v => new Option(v.label ?? v, v.value ?? v)));
    if (values.some(v => (v.value ?? v) === preferred)) el.value = preferred;
  }
  function filter(level) {
    if(drawer.open)closeDrawer(false);
    relatedBack=null;
    if(level==="family"){$("Diameter").value="";$("Minimum").value="";}
    $("DiameterLabel").textContent=GuyFittingsLookup.labels[$("Family").value];$("Diameter").closest("label").hidden=$("Family").value==="Accessories";if($("Family").value==="Accessories")$("Diameter").value="";
    let rows = products.filter(p => p.family === $("Family").value);
    if (level === "family") options($("Maker"), ["All suppliers", ...new Set(rows.map(p => p.manufacturer))], "All suppliers");
    if ($("Maker").value !== "All suppliers") rows = rows.filter(p => p.manufacturer === $("Maker").value);
    if (["family","maker"].includes(level)) options($("Series"), ["All constructions / end forms", ...new Set(rows.map(p => p.series))], "All constructions / end forms");
    if ($("Series").value !== "All constructions / end forms") rows = rows.filter(p => p.series === $("Series").value);
    const terms = $("Search").value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    matching = rows.filter(p => terms.every(t => [p.code,p.size,p.grade,p.manufacturer,p.series,...Object.values(p.properties)].join(" ").toLowerCase().includes(t)));
    options($("Product"), matching.length ? matching.map(p => ({ value:p.id, label:`${p.code} · ${p.size} · ${p.grade}` })) : [{value:"",label:"No matching products"}], $("Product").value);
    $("Product").disabled = matching.length === 0;
    $("Count").textContent = `${matching.length} matching / ${products.length} catalogue rows`;
    const previousGrade = $("Grade").value;
    if(level !== "grade") options($("Grade"), ["All grades", ...new Set(rows.map(p=>p.grade))], level === "family" ? "All grades" : previousGrade);
    if($("Grade").value!=="All grades") matching=matching.filter(p=>p.grade===$("Grade").value);
    const ratingTypes=[...new Set(matching.filter(p=>p.rating).map(p=>p.rating.type))];
    const mixedRatings=ratingTypes.length>1;
    $("Sort").querySelector('option[value="rating"]').disabled=mixedRatings;
    if(mixedRatings&&$("Sort").value==="rating")$("Sort").value="size";
    matching.sort((a,b)=>$("Sort").value==="rating" ? (calc.ratingKN(a)??Infinity)-(calc.ratingKN(b)??Infinity) || GuyFittingsLookup.compareSize(a,b) : $("Sort").value==="maker" ? (a.manufacturer+a.code).localeCompare(b.manufacturer+b.code,undefined,{numeric:true}) : GuyFittingsLookup.compareSize(a,b));
    const ratingType=ratingTypes[0]||"published force";
    const rated=ratingTypes.length===1;
    $("MinimumField").hidden=!rated;$("MinimumLabel").textContent=`Minimum ${ratingType} (kN)`;
    const minimumText=$("Minimum").value.trim(),minimum=calc.number(minimumText),invalidMin=minimumText!==""&&(minimum===null||minimum<0);
    $("Minimum").setAttribute("aria-invalid",String(invalidMin));
    $("MinimumNote").hidden=!rated||!minimumText;
    $("MinimumNote").textContent=invalidMin?"Enter a finite, non-negative published rating in kN.":`Filtered by published ${ratingType}, not design resistance or product suitability.`;
    if(rated&&minimumText)matching=invalidMin?[]:matching.filter(p=>calc.ratingKN(p)!==null&&calc.ratingKN(p)>=minimum);
    const near=GuyFittingsLookup.nearby(matching,$("Diameter").value);
    matching=near.rows;
    $("NearbyNote").hidden=!near.active;
    $("Diameter").setAttribute("aria-invalid",String(near.invalid));
    const omitted=`${near.omitted} records without a verified comparable diameter excluded.${near.omitted?" Clear diameter to include them; search by part number or construction.":""}`;
    $("NearbyNote").textContent=near.invalid?"Enter a positive diameter in mm, for example 12 or 12.5.":near.unavailable?`No verified comparable diameters in the filtered results. ${omitted}`:near.outOfRange?`Outside the filtered catalogue range (${fmt(near.range[0],3)}–${fmt(near.range[1],3)} mm). No nearby sizes shown. Clear the diameter or change the filters. ${omitted}`:near.active?`Closest recorded sizes: ${near.sizes.map(n=>fmt(n,3)).join(", ")} mm. ${omitted} Dimensional comparison only; not suitability or interchangeability.`:"";

    options($("Product"),matching.map(p=>({value:p.id,label:p.code})), $("Product").value);
    const reviewCount=matching.filter(p=>p.sourceStatus!=="Checked").length;
    $("Count").textContent=`${matching.length} matching / ${products.length} catalogue rows · 12 unresolved records excluded${reviewCount?` · ${reviewCount} require source review`:""}`;
    $("Selection").open=false;$("Selection").hidden=true;
    choose();
  }
  const labels = { MBL:"Minimum breaking load (MBL)", MBF:"Minimum breaking force (MBF)", WLL:"Working load limit (WLL)", MFL:"Catalogue MFL (original label)","Tension rating":"Catalogue tension rating",RHS:"Rated holding strength (RHS)" };
  function choose() {
    selected = matching.find(p => p.id === $("Product").value) || null;
    renderProduct();
  }
  function renderProduct() {
    const p = selected;
    $("AllParameters").open=false;$("DetailNotes").open=false;
    $("SelectionTitle").textContent=p?`Product record · ${p.code}`:"Product record";
    renderTable();
    if (!p) {
      $("Selected").textContent = "No matching product. Clear the search or change the filters.";
      $("RatingHeading").textContent = "Published rating"; $("Rating").textContent = "—"; $("RatingUnit").textContent = "";
      ["Original","RatingSource","Warning","Properties","Source","Related","UseNotes","MarketEvidence","FieldIssues","KeyProperties","EvidenceSummary","ConflictDetails","DataGaps","InstallationLinks"].forEach(id => $(id).replaceChildren());
      return;
    }
    const s = sources[p.source], kn = calc.ratingKN(p);
    const code=p.code.toLowerCase().replace(/\s+/g,""),size=p.size.toLowerCase().replace(/\s+/g,"");
    $("Selected").textContent = p.manufacturer+(code===size||code.startsWith(size+"/")||code.startsWith(size+"(")?"":` · ${p.size}`);
    $("RatingHeading").textContent = labels[p.rating?.type] || "Dimensional product data";
    $("Rating").textContent = kn === null ? "Not published" : fmt(kn,2);
    $("RatingUnit").textContent = kn === null ? "" : "kN";
    $("Original").hidden=!p.rating||p.rating.unit==="kN";
    $("Original").textContent = p.rating ? `Source: ${p.rating.value} ${p.rating.unit} ${p.rating.type}${p.rating.unit === "t" ? " (tonne-force)" : ""}` : "";
    $("RatingSource").textContent = `${s.title} · ${s.edition} · ${referenceLocator(p.source,p.page)} · ${p.sourceStatus === "Checked" ? "Source table checked; project adoption required" : p.sourceStatus}`;
    $("Warning").textContent = p.sourceStatus!=="Checked" ? `${p.sourceStatus}: ${p.note}` : ["Guy strand","Guy wire rope"].includes(p.family) ? "MBF / MBL is not a design resistance. Confirm the construction designation and supplied strand certificate; unpublished properties need a separate datasheet." : p.family==="Dead-end" ? p.rating ? "RHS applies only to the stated strand and lay. Confirm the exact grip and fitting combination; this is not assembly design capacity." : "No holding force is published in this matching table. Verify construction, grade, lay, coating and the manufacturer installation procedure; diameter alone does not establish compatibility." : p.family==="Thimble" ? p.rating ? "Original manufacturer rating basis retained. MFL / tension rating is not WLL or design resistance; confirm exact grip, bearing and pin geometry." : "Dimensional or identity data only. No standalone force rating or automatic termination compatibility is established." : p.family==="Wire rope grip" ? "Temporary use only. These grips are not a permanent dynamically loaded mast termination; no force capacity is published." : p.rating?.type==="Tension rating" || p.family==="Accessories" ? "Catalogue facts only. Tension rating, termination efficiency and dimensional fit are separate claims; none establishes mast or assembly design resistance." : "Published WLL is not a ULS design resistance. Confirm current rating, axial loading, engagement / pin retention and fitting compatibility.";
    const fullWarning=$("Warning").textContent;
    $("Warning").textContent=compactWarning(p);
    const props = {"Construction / form":p.series,"Source standard statement":p.standard,"Grade":p.grade,...p.properties};


    $("Properties").innerHTML = Object.entries(props).map(([k,v])=>`<dt>${escape(k)}</dt><dd>${escape(v)}</dd>`).join("");
    $("UseNotes").innerHTML=[fullWarning,...p.useNotes||[]].map(n=>'<p>'+escape(n)+'</p>').join('');
    renderRelated(p);
    renderMarketEvidence(p);
    renderKeyProperties(p);renderReadiness(p);
    const sourceLabel=s.shortLabel||({bullivants4:"Edition 4",nobles2018:"2018",bekaertCA:"Canada · 2022",noblesStrand2018:"2018",plpAU2025:"AU · 2025 file",plp2016:"2016"}[p.source])||"Catalogue";
    $("RatingSource").textContent=sourceLabel+" · "+referenceLocator(p.source,p.page).replace("PDF page ","p. ");
    $("PrimarySource").href=sourceLink(p);
    const pageLink = sourceLink(p);
    $("Source").innerHTML = `<p><a href="${escape(pageLink)}" target="_blank" rel="noopener noreferrer">${escape(s.title)} · ${referenceLocator(p.source,p.page)}</a></p><p>${escape(s.edition)}<br>Table: ${escape(p.table)} · Row: ${escape(p.code)} ${escape(p.size)}<br>Checked: ${escape(p.reviewedDate||s.checkedDate)} · Catalogue evidence · ${escape(p.sourceStatus)}</p><p>${escape(s.currency)}</p>${s.currentLanding?`<p>${escape(s.linkNote||"Current official catalogue index.")} <a href="${escape(s.currentLanding)}" target="_blank" rel="noopener noreferrer">${s.linkNote?"Manufacturer product page":"Official catalogue index"}</a></p>`:""}<p>${escape(p.note)}</p>${(p.additionalSources||[]).map(ref=>`<p><a href="${escape(referenceLink(ref.source||p.source,ref.page))}" target="_blank" rel="noopener noreferrer">${escape(ref.table)} · ${escape(referenceLocator(ref.source||p.source,ref.page,ref.printedPage))} · ${escape(ref.row)}</a></p>`).join("")}<p>${p.publicationClass==="Unreleased"?"Public beta · For Review. ":""}Catalogue source checked; named carrier / owner adoption not verified.</p>`;
  }

  function compactWarning(p){
    if(p.sourceStatus!=="Checked")return `${p.sourceStatus}. See Sources & notes.`;
    if(["Guy strand","Guy wire rope"].includes(p.family))return "Not design resistance. Check construction and supplied certificate.";
    if(p.family==="Dead-end")return p.rating?"RHS: stated strand and lay only; verify grip / fitting match. Not assembly capacity.":"No holding rating. Verify construction, grade, lay, coating and installation; diameter alone is insufficient.";
    if(p.family==="Thimble")return p.rating?"MFL / tension rating is not WLL or design resistance. Check grip, bearing and pin fit.":"Dimensions / identity only; no force rating or verified termination compatibility.";
    if(p.family==="Wire rope grip")return "Temporary use only; not a permanent dynamically loaded mast termination. No force rating.";
    if(p.rating?.type==="Tension rating"||p.family==="Accessories")return "Catalogue data only; force, efficiency and fit do not establish assembly design resistance.";
    return "WLL is not ULS resistance. Verify current rating, axial load, engagement / pin retention and fit.";
  }

  function referenceLink(source,page){const s=sources[source];return s.kind==="web"||!page?s.url:s.url+"#page="+page;}
  function referenceLocator(source,page,printed){return sources[source].kind==="web"||!page?"Web specification": "PDF page "+page+(printed?" · printed "+printed:"");}
  function evidenceSummary(p){
    const e=p.marketEvidence;if(!e)return "Not verified";
    const au=e.supply.status.startsWith("Australian")?(e.supply.status.includes("family")?"AU family only":"AU catalogue"):"AU not verified";
    const mast=e.mast.status.includes("family")?"Mast family":e.mast.status.includes("Stay-wire")?"Stay use":e.mast.status.includes("guidance")?"Guy guidance":"Mast unverified";
    return au+" · "+mast;
  }
  function renderMarketEvidence(p){
    const e=p.marketEvidence;
    $("MarketEvidence").innerHTML=e?'<h3>Australian application evidence</h3><dl class="guy-market-list">'+Object.entries(e).map(([k,v])=>{
      const title={supply:"Australian supply",mast:"Guy / mast application",owner:"Named owner adoption"}[k];
      const url=v.url||(v.source?referenceLink(v.source,v.page):null);
      return '<dt>'+title+'</dt><dd><strong>'+escape(v.status)+'</strong> · '+escape(v.note)+(url?' <a target="_blank" rel="noopener noreferrer" href="'+escape(url)+'">Source</a>':'')+'</dd>';
    }).join('')+'</dl>':'';
    $("FieldIssues").hidden=!p.fieldIssues?.length;
    $("FieldIssues").innerHTML=p.fieldIssues?.length?'<p><strong>Source conflict · '+escape([...new Set(p.fieldIssues.map(v=>v.field))].join(', '))+'</strong><br>Values withheld; see Sources & notes.</p>':'';
    $("ConflictDetails").hidden=!p.fieldIssues?.length;
    $("ConflictDetails").innerHTML=(p.fieldIssues||[]).map(v=>'<p><strong>'+escape(v.state)+' · '+escape(v.field)+'</strong><br>'+escape(v.note)+'</p>').join('');
    if(p.fieldIssues?.some(v=>v.field==="WLL")){
      $("RatingHeading").textContent="WLL source conflict";$("Rating").textContent="Not verified";$("RatingUnit").textContent="Excluded from force comparison";$("Original").hidden=true;
    }
  }

  function renderKeyProperties(p){
    const keys={
      "Guy strand":["Construction","Nominal overall diameter (mm)","Nominal strand diameter (mm)","Metallic area (mm²)","Linear mass (kg/m)","Lay","Finish"],
      "Guy wire rope":["Construction","Nominal rope diameter (mm)","Core","Lay","Linear mass (kg/m)","Finish"],
      "Turnbuckle":["Closed length (mm)","Open length (mm)","Length range (derived mm)","Mass (kg)","Finish"],
      "Rigging screw":["Closed length (mm)","Open length (mm)","Length range (derived mm)","Mass (kg)","Finish"],
      "Shackle":["Source dimension d (mm)","Source dimension D (mm)","Source dimension W (mm)","Mass (kg)","Finish"],
      "Dead-end":["Matching diameter (mm)","Strand construction","Colour code","Actual strand diameter (in)","Lay"],
      "Thimble":["Suits rope diameter (mm)","Bend radius (mm)","Seat width (mm)","Opened width (mm)","Finish"],
      "Wire rope grip":["Suits rope diameter (mm)","Grips per termination","Finish"],
      "Accessories":["Component type","Rope diameter min (mm)","Rope diameter max (mm)","Catalogue efficiency (% of rope catalogue strength)","Thread size (source)","Bolt size (source)","Overall length (mm)","Thread length (mm)","Mass (kg)"]
    };
    const pairs=[];
    if(p.grade!=="Not stated"&&!p.grade.startsWith("Match "))pairs.push(["Grade",p.grade]);
    const candidates=keys[p.family]||[];
    for(const k of candidates)if(p.properties[k]!==undefined)pairs.push([k,p.properties[k]]);
    if(pairs.length<3)for(const [k,v]of Object.entries(p.properties)){
      if(!pairs.some(([key])=>key===k)&&!['Data completeness','Fitting evidence','Source material statement'].includes(k))pairs.push([k,v]);
      if(pairs.length>=3)break;
    }
    const aliases={"Nominal overall diameter (mm)":"Nominal diameter (mm)","Nominal strand diameter (mm)":"Nominal strand Ø (mm)","Nominal rope diameter (mm)":"Nominal rope Ø (mm)","Suits rope diameter (mm)":"Rope size (mm)","Matching diameter (mm)":"Matching Ø (mm)","Actual strand diameter (in)":"Strand Ø (in)","Length range (derived mm)":"Length range (derived mm)","Catalogue efficiency (% of rope catalogue strength)":"Efficiency (% of rope catalogue strength)"};
    const label=k=>aliases[k]||k.replace('Source dimension ','Drawing ').replace('Linear mass','Mass');
    $("KeyProperties").innerHTML=pairs.slice(0,6).map(([k,v])=>'<dt>'+escape(label(k))+'</dt><dd>'+escape(v)+'</dd>').join('');
    $("EvidenceSummary").textContent=evidenceSummary(p)+" · Owner: "+(p.marketEvidence?.owner?.status||"Not verified");
  }
  function backToTable(){
    closeDrawer();
  }
  $("Selection").addEventListener("click",e=>{if(e.target.closest('[data-back-table]'))backToTable();});

  function renderReadiness(p){
    const s=GuyCatalogueStatus.status(p,GuyFittingsLookup.diameter);
    const gaps=s.missing.filter(k=>k!=="published rating");
    $("DataGaps").hidden=!(gaps.length||s.chartOnly);
    $("DataGaps").textContent=s.chartOnly?"Chart identity only; dimensions and force unverified.":"Missing: "+gaps.join(", ")+".";
    $("InstallationLinks").innerHTML=(p.installationReferences||[]).map(r=>'<a target="_blank" rel="noopener noreferrer" href="'+escape(referenceLink(r.source,r.page))+'" title="'+escape(r.scope)+'">'+escape(r.label)+' ↗</a>').join(' · ');
    $("InstallationLinks").hidden=!p.installationReferences?.length;
    if(p.source==="plpAU2025"&&p.family==="Dead-end")$("Warning").textContent+=" Single use; max. 2 retensioning reapplications within 90 days.";
  }
  function sourceLink(p) {const s=sources[p.source];return p.source==="bullivants4"?`https://app.nexuspublications.com.au/a10/publications/bullivants-product-catalogue-edition-4-1/${p.page}`:referenceLink(p.source,p.page);}
  function renderTable() {
    const view=viewPosition(),family=$("Family").value;
    const layout=GuyCompactTable.columns(family,matching,products,$("Series").value),columns=layout.columns;
    if($("Diameter").value.trim())columns.push({key:"$diameter",label:"Compared diameter (mm)",numeric:true,secondary:true},{key:"$difference",label:"Difference (mm)",numeric:true,secondary:true});
    const secondary=columns.findIndex(c=>c.secondary);
    const header=c=>{
      const full=c.label,m=full.match(/^(.*) (\([^()]+\))$/),name=m?m[1]:full,unit=m?m[2]:"";
      const breaks={"Published rating":["Published","rating"],"Form / connection":["Form /","connection"],"Matching requirement":["Matching","requirement"],"Strand diameter":["Strand","diameter"],"Nominal rope diameter":["Nominal rope","diameter"],"Matching diameter":["Matching","diameter"],"Strand construction":["Strand","construction"],"Metallic area":["Metallic","area"],"Closed length":["Closed","length"],"Open length":["Open","length"],"Length range":["Length range"],"Grips per termination":["Grips per","termination"],"AU / mast evidence":["AU / mast","evidence"],"Source / page":["Source /","page"],"Model / size":["Model / size"],"Nominal wire diameter":["Nominal wire","diameter"]};
      const lines=breaks[name]||(name.startsWith("Zinc min. ")?["Zinc minimum",name.slice(10)]:[name]);
      const title=c.key==="Catalogue efficiency (% of rope catalogue strength)"?"Efficiency (% of catalogue rope strength)":full;
      return `<span class="guy-th-label" title="${escape(title)}">${lines.map(l=>`<span>${escape(l)}</span>`).join("")}</span><span class="guy-th-unit">${escape(unit)||"&nbsp;"}</span>`;
    };
    const cell=(c,p)=>{
      if(c.key==="$rating"){
        const r=GuyCompactTable.rating(p,calc.ratingKN(p),fmt);
        return `<span class="guy-rating-value ${r.unavailable?"guy-unavailable":""}"><b>${escape(r.value)}</b>${r.basis?`<span class="guy-rating-basis">${escape(r.basis)}</span>`:""}</span>${r.original?`<small class="guy-rating-original">Source: ${escape(r.original)}</small>`:""}`;
      }
      let value=c.key==="$grade"?GuyCompactTable.grade(p):c.key==="$form"?p.series:c.key==="$evidence"?evidenceSummary(p):c.key==="$diameter"?(()=>{const d=GuyFittingsLookup.diameter(p);return d===null?"—":fmt(d,3);})():c.key==="$difference"?(()=>{const d=GuyFittingsLookup.diameter(p);if(d===null)return "—";const delta=d-Number($("Diameter").value);return `${delta>0?"+":""}${fmt(delta,3)}`;})():p.properties[c.key]??"—";
      const text=String(value);
      if(c.key==="$grade"){
        const match=text.match(/^(.*?) \((.*)\)$/);
        return match?`<span>${escape(match[1])}</span><small>${escape(match[2])}</small>`:escape(text);
      }
      if(c.numeric)return escape(text);
      if(c.key==="$evidence")return text.split(" · ").map(t=>`<span class="guy-evidence-line">${escape(t)}</span>`).join("");
      if(["Source exclusions","Data completeness","Fitting evidence","Pin retention"].includes(c.key))return escape(text);
      // Short summary; the exact full text is available by keyboard, hover and record details.
      return `<span class="guy-cell-text" title="${escape(c.key==="$grade"?p.grade:text)}">${escape(text)}</span>`;
    };
    $("CatalogueTitle").textContent=family;
    $("Count").textContent=`${matching.length} matching / ${products.length} catalogue rows · 12 unresolved records excluded${matching.some(p=>p.sourceStatus!=="Checked")?` · ${matching.filter(p=>p.sourceStatus!=="Checked").length} require source review`:""}`;
    $("FilterCount").textContent=[$("Maker").value!=="All suppliers",$("Series").value!=="All constructions / end forms",$("Grade").value!=="All grades"].some(Boolean)?"· active":"";
    $("Families").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.family===family)));
    $("AccessoryField").hidden=family!=="Accessories";
    if(family==="Accessories")options($("AccessoryType"),["All accessory types",...new Set(products.filter(p=>p.family===family).map(p=>p.series))],$("Series").value==="All constructions / end forms"?"All accessory types":$("Series").value);
    $("Caption").textContent=`${family} · ${matching.length} products`;
    const notes=[layout.force?"Published ratings ≠ design resistance; compare the same basis.":"Dimensions only; no design capacity.","— = not recorded. Drawing letters follow each supplier's diagram."];
    if(family==="Dead-end")notes.push("Match exact strand / lay; no grade equivalence.");
    if(family==="Wire rope grip")notes.push("Temporary use only; not permanent dynamically loaded mast terminations.");
    if(columns.some(c=>c.key==="Catalogue efficiency (% of rope catalogue strength)"))notes.push("Efficiency is % of catalogue rope strength.");
    if(matching.some(p=>p.rating?.unit==="t"))notes.push("Source t = tonne-force.");
    if(layout.omitted.length)notes.push(`${layout.omitted.length} unrecorded dimension columns omitted; full records remain in details.`);
    $("TableNote").textContent=notes.join(" ");
    $("Table").querySelector("colgroup")?.remove();
    const widths=[...columns.map(GuyCompactTable.width),94];
    const group=document.createElement("colgroup");group.innerHTML='<col style="width:var(--guy-identity-width)">'+widths.map(w=>`<col style="width:${w}px">`).join("");$("Table").prepend(group);$("Table").style.width=`calc(var(--guy-identity-width) + ${widths.reduce((a,b)=>a+b,0)}px)`;
    $("Head").innerHTML=`<tr><th scope="col">${header({label:"Model / size"})}</th>${columns.map((c,i)=>`<th scope="col" class="${c.numeric?"guy-number":""} ${i===secondary?"guy-secondary-start":""}">${header(c)}</th>`).join("")}<th scope="col">${header({label:"Source / page"})}</th></tr>`;
    $("Rows").innerHTML=matching.map((p,i)=>{
      const code=p.code.toLowerCase().replace(/\s+/g,""),size=p.size.toLowerCase().replace(/\s+/g,""),inCode=code===size||code.startsWith(size+"/")||code.startsWith(size+"(");
      const status=GuyCatalogueStatus.status(p,GuyFittingsLookup.diameter),active=drawer.open&&(drawerOrigin||selected?.id)===p.id,s=sources[p.source];
      const source=s.shortLabel||({bullivants4:"Edition 4",nobles2018:"2018",bekaertCA:"Canada · 2022",noblesStrand2018:"2018",plpAU2025:"AU · 2025 file"}[p.source])||"2016";
      const tag=status.label||(p.sourceStatus!=="Checked"?p.sourceStatus:"");
      return `<tr class="${i&&p.size!==matching[i-1].size?"guy-size-start":""}" data-selected="${active}"><th scope="row"><button type="button" data-product="${escape(p.id)}" aria-label="View ${escape(p.manufacturer)} ${escape(p.code)} ${escape(p.size)} ${escape(p.grade)} ${escape(p.series)}" aria-haspopup="dialog" aria-controls="guyDrawer" aria-expanded="${active}"><span class="guy-model-code">${escape(p.code).replaceAll("-","-<wbr>")} <span class="guy-model-brand">(${escape(p.manufacturer)})</span></span>${inCode?"":`<span class="guy-model-size">${escape(p.size)}</span>`}${tag?`<small class="guy-data-tag">${escape(tag)}</small>`:""}</button></th>${columns.map((c,j)=>`<td class="${c.numeric?"guy-number":""} ${c.key==="$rating"?"guy-rating-cell":""} ${c.key==="$grade"?"guy-grade":""} ${j===secondary?"guy-secondary-start":""}"${c.key==="$grade"?` title="${escape(p.grade)}"`:""}>${cell(c,p)}</td>`).join("")}<td class="guy-source-cell"><a href="${escape(sourceLink(p))}" target="_blank" rel="noopener noreferrer"><span>${escape(source)}</span><span class="guy-source-page">${s.kind==="web"?"Specification":`p. ${p.page}`}</span></a></td></tr>`;
    }).join("");
    $("Empty").hidden=matching.length>0;$("Table").closest(".guy-table-wrap").hidden=matching.length===0;
    restorePosition(view);
  }
  function showRecord(id,back=null){
    const p=products.find(r=>r.id===id);if(!p)return;
    const view=viewPosition();
    selected=p;relatedBack=back;renderProduct();openDrawer();restorePosition(view);
  }
  function renderRelated(p){
    const refs=GuyFittingsRelated.related(p,products);
    $("RelatedDetails").hidden=!(refs.length||relatedBack);$("RelatedDetails").open=Boolean(relatedBack);
    $("RelatedLabel").textContent="Related parts"+(refs.length?" ("+refs.length+")":"");
    $("Related").innerHTML=(relatedBack?'<p><button type="button" data-back="'+escape(relatedBack)+'">Back to previous record</button></p>':'')+(refs.length?'<h3>'+(p.family==="Dead-end"?'Manufacturer-listed fittings':'Manufacturer-listed dead-ends')+'</h3><p class="result-note">PLP selection chart, printed p.155. Listed alternatives are not one complete assembly. Confirm the selected combination and supplied variant.</p><dl class="guy-related-list">'+refs.map(r=>'<dt>'+escape(r.label)+'</dt><dd>'+(r.target?'<button type="button" data-related="'+escape(r.target.id)+'">'+escape(r.code)+'</button>':'<span>'+escape(r.code)+' · detailed record not verified</span>')+'</dd>').join('')+'</dl>':'');
  }
  $("Related").addEventListener("click",e=>{const b=e.target.closest("button");if(b?.dataset.related)showRecord(b.dataset.related,selected.id);else if(b?.dataset.back)showRecord(b.dataset.back);});
  $("AccessoryType").addEventListener("change",()=>{$("Series").value=$("AccessoryType").value==="All accessory types"?"All constructions / end forms":$("AccessoryType").value;filter("search");});
  $("Family").addEventListener("change",()=>{$("Search").value="";filter("family");});
  $("Maker").addEventListener("change",()=>filter("maker"));
  $("Series").addEventListener("change",()=>filter("search"));
  $("Search").addEventListener("input",()=>filter("search"));
  $("Minimum").addEventListener("input",()=>filter("search"));
  $("Diameter").addEventListener("input",()=>filter("search"));
  $("BrowseAll").addEventListener("click",()=>{$("Diameter").value="";filter("search");});
  $("Families").innerHTML=families.map(f=>`<button type="button" data-family="${escape(f)}" aria-pressed="false">${escape(f)}</button>`).join("");
  $("Families").addEventListener("click",e=>{const b=e.target.closest("button[data-family]");if(b){$("Family").value=b.dataset.family;$("Search").value="";filter("family");}});
  $("Grade").addEventListener("change",()=>filter("grade"));
  $("Sort").addEventListener("change",()=>filter("grade"));
  $("Selection").addEventListener("toggle",()=>{
    const id=document.activeElement?.dataset.product;renderTable();
    if(id)[...$("Rows").querySelectorAll('button[data-product]')].find(b=>b.dataset.product===id)?.focus({preventScroll:true});
  });
  $("Product").addEventListener("change",choose);
  $("Rows").addEventListener("click",e=>{const b=e.target.closest("button[data-product]");if(b){const view=viewPosition();drawerOrigin=b.dataset.product;$("Product").value=b.dataset.product;choose();openDrawer();restorePosition(view);}});
  $("Reset").addEventListener("click",()=>{$("Family").value="Guy strand";$("Sort").value="size";$("Search").value="";filter("family");});
  options($("Family"),families,"Guy strand");filter("family");
})();
