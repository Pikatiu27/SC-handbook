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
  function options(el, values, preferred) {
    el.replaceChildren(...values.map(v => new Option(v.label ?? v, v.value ?? v)));
    if (values.some(v => (v.value ?? v) === preferred)) el.value = preferred;
  }
  function clearAdoption() { $("ExportStatus").textContent=""; }
  function filter(level) {
    relatedBack=null;
    clearAdoption();
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
    const omitted=`${near.omitted} records without a verified comparable diameter excluded.`;
    $("NearbyNote").textContent=near.invalid?"Enter a positive diameter in mm, for example 12 or 12.5.":near.unavailable?`No verified comparable diameters in the filtered results. ${omitted}`:near.outOfRange?`Outside the filtered catalogue range (${fmt(near.range[0],3)}–${fmt(near.range[1],3)} mm). No nearby sizes shown. Clear the diameter or change the filters. ${omitted}`:near.active?`Closest recorded sizes: ${near.sizes.map(n=>fmt(n,3)).join(", ")} mm. ${omitted} Dimensional comparison only; not suitability or interchangeability.`:"";

    options($("Product"),matching.map(p=>({value:p.id,label:p.code})), $("Product").value);
    const reviewCount=matching.filter(p=>p.sourceStatus!=="Checked").length;
    $("Count").textContent=`${matching.length} matching / ${products.length} catalogue rows · 12 unresolved records excluded${reviewCount?` · ${reviewCount} require source review`:""}`;
    $("Selection").open=false;$("Selection").hidden=true;
    choose();
  }
  const labels = { MBL:"Minimum breaking load (MBL)", MBF:"Minimum breaking force (MBF)", WLL:"Working load limit (WLL)", MFL:"Catalogue MFL (original label)","Tension rating":"Catalogue tension rating",RHS:"Rated holding strength (RHS)" };
  function choose() {
    clearAdoption();
    selected = matching.find(p => p.id === $("Product").value) || null;
    renderProduct();
  }
  function renderProduct() {
    const p = selected;
    $("AllParameters").open=false;$("DetailNotes").open=false;
    $("SelectionTitle").textContent=p?`Product record · ${p.code}`:"Product record";
    $("Export").disabled = !p;
    renderTable();
    if (!p) {
      $("Selected").textContent = "No matching product. Clear the search or change the filters.";
      $("RatingHeading").textContent = "Published rating"; $("Rating").textContent = "—"; $("RatingUnit").textContent = "";
      ["Original","RatingSource","Warning","Properties","Source","Related","UseNotes","MarketEvidence","FieldIssues","KeyProperties","EvidenceSummary","ConflictDetails"].forEach(id => $(id).replaceChildren());
      return;
    }
    const s = sources[p.source], kn = calc.ratingKN(p);
    $("Selected").textContent = `${p.manufacturer} · ${p.series} · ${p.size}`;
    $("RatingHeading").textContent = labels[p.rating?.type] || "Dimensional product data";
    $("Rating").textContent = kn === null ? "Not published" : fmt(kn,2);
    $("RatingUnit").textContent = kn === null ? "No standalone force rating" : "kN";
    $("Original").textContent = p.rating ? `Original catalogue: ${p.rating.value} ${p.rating.unit} ${p.rating.type}${p.rating.unit === "t" ? " (tonne-force equivalent)" : ""}` : "Select by the source size and fitting requirements.";
    $("RatingSource").textContent = `${s.title} · ${s.edition} · ${referenceLocator(p.source,p.page)} · ${p.sourceStatus === "Checked" ? "Source table checked; project adoption required" : p.sourceStatus}`;
    $("Warning").textContent = p.sourceStatus!=="Checked" ? `${p.sourceStatus}: ${p.note}` : ["Guy strand","Guy wire rope"].includes(p.family) ? "MBF / MBL is not a design resistance. Confirm the construction designation and supplied strand certificate; unpublished properties need a separate datasheet." : p.family==="Dead-end" ? p.rating ? "RHS applies only to the stated strand and lay. Confirm the exact grip and fitting combination; this is not assembly design capacity." : "No holding force is published in this matching table. Verify construction, grade, lay, coating and the manufacturer installation procedure; diameter alone does not establish compatibility." : p.family==="Thimble" ? p.rating ? "Original manufacturer rating basis retained. MFL / tension rating is not WLL or design resistance; confirm exact grip, bearing and pin geometry." : "Dimensional or identity data only. No standalone force rating or automatic termination compatibility is established." : p.family==="Wire rope grip" ? "Temporary use only. These grips are not a permanent dynamically loaded mast termination; no force capacity is published." : p.rating?.type==="Tension rating" || p.family==="Accessories" ? "Catalogue facts only. Tension rating, termination efficiency and dimensional fit are separate claims; none establishes mast or assembly design resistance." : "Published WLL is not a ULS design resistance. Confirm current rating, axial loading, engagement / pin retention and fitting compatibility.";
    const props = {"Source standard statement":p.standard,"Grade":p.grade,...p.properties};


    $("Properties").innerHTML = Object.entries(props).map(([k,v])=>`<dt>${escape(k)}</dt><dd>${escape(v)}</dd>`).join("");
    $("UseNotes").innerHTML=(p.useNotes||[]).map(n=>'<p>'+escape(n)+'</p>').join('');
    renderRelated(p);
    renderMarketEvidence(p);
    renderKeyProperties(p);
    $("RatingSource").textContent=(s.shortLabel||s.edition)+" · "+referenceLocator(p.source,p.page);
    $("PrimarySource").href=sourceLink(p);
    const pageLink = sourceLink(p);
    $("Source").innerHTML = `<p><a href="${escape(pageLink)}" target="_blank" rel="noopener noreferrer">${escape(s.title)} · ${referenceLocator(p.source,p.page)}</a></p><p>${escape(s.edition)}<br>Table: ${escape(p.table)} · Row: ${escape(p.code)} ${escape(p.size)}<br>Checked: ${escape(p.reviewedDate||s.checkedDate)} · Catalogue evidence · ${escape(p.sourceStatus)}</p><p>${escape(s.currency)}</p>${s.currentLanding?`<p>${escape(s.linkNote||"Current official catalogue index.")} <a href="${escape(s.currentLanding)}" target="_blank" rel="noopener noreferrer">${s.linkNote?"Manufacturer product page":"Official catalogue index"}</a></p>`:""}<p>${escape(p.note)}</p>${(p.additionalSources||[]).map(ref=>`<p><a href="${escape(referenceLink(ref.source||p.source,ref.page))}" target="_blank" rel="noopener noreferrer">${escape(ref.table)} · ${escape(referenceLocator(ref.source||p.source,ref.page,ref.printedPage))} · ${escape(ref.row)}</a></p>`).join("")}<p>${p.publicationClass==="Unreleased"?"Public beta · For Review. ":""}Catalogue source checked; named carrier / owner adoption not verified.</p>`;
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
    $("FieldIssues").innerHTML=p.fieldIssues?.length?'<p><strong>Source conflict · '+escape([...new Set(p.fieldIssues.map(v=>v.field))].join(', '))+'</strong><br>Affected values are withheld. See source notes for the conflicting values.</p>':'';
    $("ConflictDetails").hidden=!p.fieldIssues?.length;
    $("ConflictDetails").innerHTML=(p.fieldIssues||[]).map(v=>'<p><strong>'+escape(v.state)+' · '+escape(v.field)+'</strong><br>'+escape(v.note)+'</p>').join('');
    if(p.fieldIssues?.some(v=>v.field==="WLL")){
      $("RatingHeading").textContent="WLL source conflict";$("Rating").textContent="Not verified";$("RatingUnit").textContent="Excluded from force comparison";$("Original").textContent="Conflicting published values are recorded below; no WLL selected.";
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
    const label=k=>k.replace('Source dimension ','Drawing ').replace('Linear mass','Mass');
    $("KeyProperties").innerHTML=pairs.slice(0,6).map(([k,v])=>'<dt>'+escape(label(k))+'</dt><dd>'+escape(v)+'</dd>').join('');
    $("EvidenceSummary").textContent=evidenceSummary(p)+" · Owner: "+(p.marketEvidence?.owner?.status||"Not verified");
  }
  function backToTable(){
    $("Selection").open=false;renderTable();
    const target=[...$("Rows").querySelectorAll('button[data-product]')].find(b=>b.dataset.product===selected?.id)||$("Search");
    const wrap=$("Table").closest('.guy-table-wrap'),left=wrap.scrollLeft;
    target.focus({preventScroll:true});target.scrollIntoView({block:"center",inline:"nearest"});wrap.scrollLeft=left;
  }
  $("Selection").addEventListener("click",e=>{if(e.target.closest('[data-back-table]'))backToTable();});
  function sourceLink(p) {const s=sources[p.source];return p.source==="bullivants4"?`https://app.nexuspublications.com.au/a10/publications/bullivants-product-catalogue-edition-4-1/${p.page}`:referenceLink(p.source,p.page);}
  function renderTable() {
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
    $("TableNote").textContent=force?`Published ratings are not design resistance. Compare only identical rating bases. — = not recorded. All recorded parameters; key values first. Scroll right for dimensions and source data. Drawing letters refer to each manufacturer’s source diagram.`:"Dimensional comparison only. — = not recorded. All recorded parameters; key values first. Scroll right for dimensions and source data. Drawing letters refer to each manufacturer’s source diagram.";

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
    const widths=[124,...columns.map(([h])=>columnWidth(h)),176,96];
    const cg=document.createElement('colgroup');cg.innerHTML=widths.map(w=>`<col style="width:${w}px">`).join('');$("Table").prepend(cg);$("Table").style.width=widths.reduce((a,b)=>a+b,0)+'px';
    $("Head").innerHTML=`<tr><th scope="col">${header("Size")}</th>${columns.map(([h],i)=>`<th scope="col" class="${numeric(h)?"guy-number":""} ${i===keyColumnCount?"guy-secondary-start":""}">${header(h)}</th>`).join("")}<th scope="col">${header("Product / supplier")}</th><th scope="col">${header("Source / page")}</th></tr>`;
    $("Rows").innerHTML=matching.map((r,i)=>`<tr class="${i>0&&r.size!==matching[i-1].size?"guy-size-start":""}" data-selected="${!$("Selection").hidden&&r.id===selected?.id}"><th scope="row"><button type="button" data-product="${escape(r.id)}" aria-label="View ${escape(r.manufacturer)} ${escape(r.code)} ${escape(r.size)} ${escape(r.grade)} ${escape(r.series)}"><span class="guy-size-label">${escape(r.size)}</span><small class="guy-row-identity" title="${escape(r.code+' · '+r.series)}">${escape(['Accessories','Thimble'].includes(r.family)&&r.grade==='Not stated'?'':r.grade.startsWith('Match ')?r.properties['Strand construction']||'See record':r.grade.replace(' (wire tensile grade)',''))}${['Turnbuckle','Rigging screw'].includes(r.family)?` · ${escape(r.series.split(' - ')[0].replaceAll('Jaw','J').replaceAll('Eye','E').replaceAll(' & ','/'))}`:r.family==='Shackle'?` · ${escape(r.series)}`:''}</small><small class="guy-row-supplier">${escape(r.manufacturer.split(' / ')[0])}</small></button>${r.sourceStatus!=="Checked"?`<span class="guy-review-badge" title="${escape(r.note)}">${r.sourceStatus==="Source conflict"?'Source conflict':'Rating unverified'}</span>`:''}</th>${columns.map(([h,v],i)=>`<td class="${numeric(h)?"guy-number":""} ${h==="Grade"?"guy-grade":""} ${i===keyColumnCount?"guy-secondary-start":""}">${cell(h,v(r))}</td>`).join("")}<td class="guy-product-cell"><span class="guy-token">${escape(r.code)}</span><small>${escape(r.manufacturer)}</small></td><td class="guy-source-cell"><a href="${escape(sourceLink(r))}" target="_blank" rel="noopener noreferrer"><span class="guy-token">${escape(sources[r.source].shortLabel||(r.source==="bullivants4"?"Edition 4":r.source==="nobles2018"?"2018":r.source==="bekaertCA"?"Canada · 2022":r.source==="noblesStrand2018"?"2018":r.source==="plpAU2025"?"AU · 2025 file":"2016"))}</span><span class="guy-source-page">${sources[r.source].kind==="web"?"Specification":`p. ${r.page}`}</span></a>${r.sourceStatus!=="Checked"?`<small class="guy-conflict">${escape(r.sourceStatus)}</small>`:""}${r.fieldIssues?.length?`<small class="guy-conflict">Source conflict</small>`:""}</td></tr>`).join("");
    $("Empty").hidden=matching.length>0;
    $("Table").closest('.guy-table-wrap').hidden=matching.length===0;
    $("Selection").hidden=!selected || $("Selection").hidden;
  }

  function showRecord(id,back=null){
    const p=products.find(r=>r.id===id);if(!p)return;
    $("Family").value=p.family;$("Search").value="";filter("family");
    if(p.family==="Accessories"){$("Series").value=p.series;filter("search");}
    $("Product").value=id;relatedBack=back;choose();$("Selection").hidden=false;$("Selection").open=true;renderTable();$("SelectionTitle").focus();$("Selection").scrollIntoView({block:"start"});
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
  $("Rows").addEventListener("click",e=>{const b=e.target.closest("button[data-product]");if(b){$("Product").value=b.dataset.product;choose();$("Selection").hidden=false;$("Selection").hidden=false;$("Selection").open=true;renderTable();$("SelectionTitle").focus();$("Selection").scrollIntoView({block:"start"});}});
  $("Reset").addEventListener("click",()=>{$("Family").value="Guy strand";$("Sort").value="size";$("Search").value="";filter("family");});
  $("Export").addEventListener("click",()=>{
    if(!selected)return;
    const payload={module:"Guy & Fittings",publicationClass:"Public beta",status:"Catalogue lookup only",product:selected,source:sources[selected.source],exportedAt:new Date().toISOString(),limitations:"Historical catalogue facts, not current supply confirmation or design resistance. No capacity assessment or assembly compatibility claim."};
    const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));
    const a=document.createElement("a");a.href=url;a.download=`guy-${selected.code}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    $("ExportStatus").textContent="Selected record exported.";
  });
  options($("Family"),families,"Guy strand");filter("family");
})();
