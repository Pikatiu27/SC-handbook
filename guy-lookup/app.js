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
    const view=viewPosition();
    const family=$("Family").value, prop=k=>p=>p.properties[k] ?? "—";
    const basis=["Guy strand","Guy wire rope"].includes(family)?"MBF / MBL":family==="Dead-end"?"RHS":"WLL";
    const force=family!=="Wire rope grip"&&(!["Thimble","Accessories"].includes(family)||matching.some(p=>p.rating));
    const primaryKeys={
      "Guy wire rope":["Construction","Nominal rope diameter (mm)","Core","Lay","Linear mass (kg/m)"],"Guy strand":["Construction","Nominal strand diameter (mm)","Metallic area (mm²)","Linear mass (kg/m)"],
      "Turnbuckle":["Closed length (mm)","Open length (mm)","Length range (derived mm)","Mass (kg)"],
      "Rigging screw":["Closed length (mm)","Open length (mm)","Length range (derived mm)","Mass (kg)"],
      "Shackle":["Source dimension d (mm)","Source dimension D (mm)","Source dimension W (mm)","Mass (kg)"],
      "Dead-end":["Matching diameter (mm)","Strand construction","Colour code","Closed thimble code","Open thimble code","Actual strand diameter (in)","Holding strength (% of RBS)","Lay"],
      "Thimble":["Component type","Suits rope diameter (mm)","Bend radius (mm)","Seat width (mm)","Opened width (mm)","Finish"],
      "Accessories":["Component type","Rope diameter min (mm)","Rope diameter max (mm)","Catalogue efficiency (% of rope catalogue strength)","Thread size (source)","Bolt size (source)","Bend radius (mm)","Overall length (mm)","Thread length (mm)"],"Wire rope grip":["Suits rope diameter (mm)","Grips per termination","Finish"]
    }[family];
    const aliases={"Nominal strand diameter (mm)":"Strand diameter (mm)","Linear mass (kg/m)":"Mass (kg/m)","Suits rope diameter (mm)":"Rope diameter (mm)","Actual strand diameter (in)":"Strand diameter (in)","Holding strength (% of RBS)":"Holding (% RBS)","Approx. mass (kg/1000 m)":"Source mass (kg/1000 m)","Source construction designation":"Source designation","Source nominal rope size (in)":"Source rope size (in)"};
    const heading=k=>aliases[k]||k.replace('Source dimension ','Drawing ').replace('Min. zinc coating Class ','Zinc min. Class ');
    const keys=[...new Set((family==="Accessories"?matching:products.filter(p=>p.family===family)).flatMap(p=>Object.keys(p.properties)))].filter(k=>k!=="Record identity");
    const primary=primaryKeys.filter(k=>keys.includes(k)),secondary=keys.filter(k=>!primary.includes(k));
    let columns=[["Grade",p=>p.grade.replace(" (wire tensile grade)","")],...(force?[["Rating basis",p=>p.rating?.type||"—"],[`${["Guy strand","Guy wire rope"].includes(family)?basis:family==="Dead-end"?"RHS":"Published force"} (kN)`,p=>calc.ratingKN(p)===null?"—":fmt(calc.ratingKN(p),2)]]:[]),...(["Turnbuckle","Rigging screw","Shackle"].includes(family)?[["Form / connection",p=>p.series]]:[]),...primary.map(k=>[heading(k),prop(k)])];
    if(family==="Dead-end"){const order=["Matching diameter (mm)","Strand construction","Colour code","Closed thimble code","Open thimble code","RHS (kN)","Grade"];const rank=h=>order.includes(h)?order.indexOf(h):order.length;columns.sort((a,b)=>rank(a[0])-rank(b[0]));}
    if(["Thimble","Accessories"].includes(family)){
      columns=columns.filter(([h])=>h!=="Grade"&&(h!=="Component type"||family!=="Accessories"||$("Series").value==="All constructions / end forms"));
      const preferred=["Component type","Rope diameter min (mm)","Rope diameter max (mm)","Catalogue efficiency (% of rope catalogue strength)","Rope diameter (mm)","Bend radius (mm)","Seat width (mm)","Opened width (mm)","Thread size (source)","Bolt size (source)","Overall length (mm)","Thread length (mm)"];
      const rank=h=>preferred.includes(h)?preferred.indexOf(h):preferred.length;columns.sort((a,b)=>rank(a[0])-rank(b[0]));
    }
    const keyColumnCount=columns.length;
    columns.push(...secondary.map(k=>[heading(k),prop(k)]));
    columns.push(["AU / mast evidence",p=>evidenceSummary(p)]);
    if(force)columns.push(["Original rating",p=>p.rating?`${p.rating.value} ${p.rating.unit} ${p.rating.type}`:"—"]);
    if($("Diameter").value.trim())columns.push(["Compared diameter (mm)",p=>{const n=GuyFittingsLookup.diameter(p);return n===null?"—":fmt(n,3);}],["Difference (mm)",p=>{const n=GuyFittingsLookup.diameter(p),d=n-Number($("Diameter").value);return n===null?"—":`${d>0?"+":""}${fmt(d,3)}`;}]);
    $("CatalogueTitle").textContent=family;
    $("FilterCount").textContent=[$("Maker").value!=="All suppliers",$("Series").value!=="All constructions / end forms",$("Grade").value!=="All grades"].filter(Boolean).length?"· active":"";
    $("Families").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.family===family)));
    $("AccessoryField").hidden=family!=="Accessories";
    if(family==="Accessories")options($("AccessoryType"),["All accessory types",...new Set(products.filter(p=>p.family===family).map(p=>p.series))],$("Series").value==="All constructions / end forms"?"All accessory types":$("Series").value);
    $("Caption").textContent=`${family} · ${matching.length} products`;
    $("TableNote").textContent=force?`Published ratings are not design resistance. Compare only identical rating bases. — = not recorded. All recorded parameters; key values first. Scroll right for dimensions and source data. Drawing letters refer to each manufacturer’s source diagram. Badges name data gaps, not product approval.`:"Dimensional comparison only. — = not recorded. All recorded parameters; key values first. Scroll right for dimensions and source data. Drawing letters refer to each manufacturer’s source diagram. Badges name data gaps, not product approval.";

    const numeric=h=>/\(kN\)|\(mm|\(kg|\(in\)|\(g\/|Difference|Holding|Grips|factor/.test(h);
    const header=h=>{
      const m=h.match(/^(.*) (\([^()]+\))$/), name=m?m[1]:h,unit=m?m[2]:"";
      const breaks={"Size":["Size /","identity"],"Grade":["Grade"],"Strand diameter":["Strand","diameter"],"Metallic area":["Metallic","area"],"Approximate length":["Approximate","length"],"Closed length":["Closed","length"],"Open length":["Open","length"],"Nominal wire diameter":["Nominal wire","diameter"],"Designated size":["Designated","size"],"Source designation":["Source","designation"],"Source rope size":["Source rope","size"],"Strand construction":["Strand","construction"],"Published safety factor":["Published","safety factor"],"Grips per termination":["Grips per","termination"],"Form / connection":["Form /","connection"],"AU / mast evidence":["AU / mast","evidence"],"Published force":["Published","force"],"Published proof load multiplier":["Proof load","multiplier"],"Published ultimate load multiplier":["Ultimate load","multiplier"],"Length range":["Length range"],"Catalogue efficiency":["Catalogue","efficiency"],"Original rating":["Original","rating"],"MBF / MBL":["MBF / MBL"],"Matching diameter":["Matching","diameter"],"Colour code":["Colour","code"],"Closed thimble code":["Closed thimble","code"],"Open thimble code":["Open thimble","code"],"Cast iron sheave code":["Cast iron sheave","code"],"Clevis thimble code":["Clevis thimble","code"],"Socket thimble code":["Socket thimble","code"],"Thimble eye nut code":["Thimble eye nut","code"],"Guy insulator code":["Guy insulator","code"],"Source finish notation":["Source finish","notation"],"Fitting evidence":["Fitting","evidence"],"Compared diameter":["Compared","diameter"],"Product / supplier":["Product /","supplier"],"Source / page":["Source /","page"]};
      const lines=name.startsWith("Zinc min. Class ")?["Zinc minimum",name.replace("Zinc min. ","")]:breaks[name]||[name];
      return `<span class="guy-th-label" title="${escape(h)}">${lines.map(t=>`<span>${escape(t)}</span>`).join("")}</span><span class="guy-th-unit">${escape(unit)||'&nbsp;'}</span>`;
    };
    const cell=(h,value)=>{const t=String(value);if(h==="Grade"){const m=t.match(/^(.*?) \((.*)\)$/);if(m)return `<span class="guy-token">${escape(m[1])}</span><small class="guy-token">${escape(m[2])}</small>`;}if(h==="Finish"&&t.includes('; '))return t.split('; ').map(escape).join('<br>');return escape(t);};
    $("Table").querySelector("colgroup")?.remove();
    // Stable widths by parameter, independent of the current filtered rows.
    const columnWidth=h=>{
      const named={"Grade":92,"Construction":86,"Strand construction":100,"Form / connection":158,"Finish":154,"Lay":84,"Original rating":120,"Rating basis":100,"Published force (kN)":80,"Component type":140,"Data completeness":180,"AU / mast evidence":170,"Source designation":104,"Source rope size (in)":94,"Published safety factor":106,"Grips per termination":100};
      if(named[h])return named[h];
      if(/^Drawing /.test(h))return 76;
      if(/^(MBF|WLL|RHS) /.test(h))return 80;
      if(/^Mass /.test(h))return 76;
      if(/^Zinc min\./.test(h))return 108;
      if(/^Nominal wire diameter/.test(h))return 104;
      if(numeric(h))return 92;
      return 128;
    };
    const widths=[phoneDrawer.matches?150:190,...columns.map(([h])=>columnWidth(h)),176,96];
    const cg=document.createElement('colgroup');cg.innerHTML=widths.map(w=>`<col style="width:${w}px">`).join('');$("Table").prepend(cg);$("Table").style.width=widths.reduce((a,b)=>a+b,0)+'px';
    $("Head").innerHTML=`<tr><th scope="col">${header("Size")}</th>${columns.map(([h],i)=>`<th scope="col" class="${numeric(h)?"guy-number":""} ${i===keyColumnCount?"guy-secondary-start":""}">${header(h)}</th>`).join("")}<th scope="col">${header("Product / supplier")}</th><th scope="col">${header("Source / page")}</th></tr>`;
    $("Rows").innerHTML=matching.map((r,i)=>`<tr class="${i>0&&r.size!==matching[i-1].size?"guy-size-start":""}" data-selected="${!$("Selection").hidden&&r.id===selected?.id}"><th scope="row"><button type="button" data-product="${escape(r.id)}" aria-label="View ${escape(r.manufacturer)} ${escape(r.code)} ${escape(r.size)} ${escape(r.grade)} ${escape(r.series)}"><span class="guy-size-label">${escape(r.size)}</span><small class="guy-row-identity" title="${escape(r.code+' · '+r.series)}">${escape(['Accessories','Thimble'].includes(r.family)&&r.grade==='Not stated'?'':r.grade.startsWith('Match ')?r.properties['Strand construction']||'See record':r.grade.replace(' (wire tensile grade)',''))}${['Turnbuckle','Rigging screw'].includes(r.family)?` · ${escape(r.series.split(' - ')[0].replaceAll('Jaw','J').replaceAll('Eye','E').replaceAll(' & ','/'))}`:r.family==='Shackle'?` · ${escape(r.series)}`:''}</small><small class="guy-row-supplier">${escape(r.manufacturer.split(' / ')[0])}</small>${GuyCatalogueStatus.status(r,GuyFittingsLookup.diameter).label?`<small class="guy-data-tag">${escape(GuyCatalogueStatus.status(r,GuyFittingsLookup.diameter).label)}</small>`:""}</button>${r.sourceStatus!=="Checked"?`<span class="guy-review-badge" title="${escape(r.note)}">${r.sourceStatus==="Source conflict"?'Source conflict':'Rating unverified'}</span>`:''}</th>${columns.map(([h,v],i)=>`<td class="${numeric(h)?"guy-number":""} ${h==="Grade"?"guy-grade":""} ${i===keyColumnCount?"guy-secondary-start":""}">${cell(h,v(r))}</td>`).join("")}<td class="guy-product-cell"><span class="guy-token">${escape(r.code)}</span><small>${escape(r.manufacturer)}</small></td><td class="guy-source-cell"><a href="${escape(sourceLink(r))}" target="_blank" rel="noopener noreferrer"><span class="guy-token">${escape(sources[r.source].shortLabel||(r.source==="bullivants4"?"Edition 4":r.source==="nobles2018"?"2018":r.source==="bekaertCA"?"Canada · 2022":r.source==="noblesStrand2018"?"2018":r.source==="plpAU2025"?"AU · 2025 file":"2016"))}</span><span class="guy-source-page">${sources[r.source].kind==="web"?"Specification":`p. ${r.page}`}</span></a>${r.sourceStatus!=="Checked"?`<small class="guy-conflict">${escape(r.sourceStatus)}</small>`:""}</td></tr>`).join("");
    $("Empty").hidden=matching.length>0;
    $("Table").closest('.guy-table-wrap').hidden=matching.length===0;
    $("Selection").hidden=!selected || $("Selection").hidden;
    $("Head").querySelector('th').innerHTML=header("Model / size");
    $("Rows").querySelectorAll('button[data-product]').forEach(button=>{
      const p=matching.find(p=>p.id===button.dataset.product),status=GuyCatalogueStatus.status(p,GuyFittingsLookup.diameter);
      const code=p.code.toLowerCase().replace(/\s+/g,""),size=p.size.toLowerCase().replace(/\s+/g,"");
      const sizeInCode=code===size||code.startsWith(size+"/")||code.startsWith(size+"(");
      button.innerHTML=`<span class="guy-model-code">${escape(p.code)} <span class="guy-model-brand">(${escape(p.manufacturer)})</span></span>${sizeInCode?"":`<span class="guy-model-size">${escape(p.size)}</span>`}${status.label?`<small class="guy-data-tag">${escape(status.label)}</small>`:""}`;
      const active=drawer.open&&(drawerOrigin||selected?.id)===p.id;
      button.closest('tr').dataset.selected=String(active);
      button.setAttribute("aria-haspopup","dialog");button.setAttribute("aria-controls","guyDrawer");button.setAttribute("aria-expanded",String(active));
    });
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
