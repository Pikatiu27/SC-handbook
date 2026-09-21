"use strict";

(function initialiseGeoPage() {
  const data = window.GeoParametersData;
  const query = window.GeoParameters;
  const $ = (id) => document.getElementById(id);

  const symbolMap = {
    "q_ult,screen": "q<sub>ult,screen</sub>", "C_a": "C<sub>a</sub>", "γ_w": "γ<sub>w</sub>",
    "(N_1)_60": "(N<sub>1</sub>)<sub>60</sub>", "N_corr": "(N<sub>1</sub>)<sub>60</sub>", "I_s(50)": "I<sub>s(50)</sub>", "γ_bulk": "γ<sub>bulk</sub>", "γ_sat": "γ<sub>sat</sub>", "γ_d": "γ<sub>d</sub>",
    "f_m,s": "f<sub>m,s</sub>", "R_d,ug": "R<sub>d,ug</sub>", "E_rm": "E<sub>rm</sub>", "G_max": "G<sub>max</sub>", "σ′_p": "σ′<sub>p</sub>", "σ′_v": "σ′<sub>v</sub>",
    "N_60": "N<sub>60</sub>", "N_c": "N<sub>c</sub>", "I_ss": "I<sub>ss</sub>", "I_D": "I<sub>D</sub>", "G_s": "G<sub>s</sub>", "S_t": "S<sub>t</sub>", "E_s": "E<sub>s</sub>", "V_s": "V<sub>s</sub>", "G_0": "G<sub>0</sub>",
    "m_v": "m<sub>v</sub>", "C_c": "C<sub>c</sub>", "C_r": "C<sub>r</sub>", "c_v": "c<sub>v</sub>", "C_α": "C<sub>α</sub>", "K_a": "K<sub>a</sub>", "K_0": "K<sub>0</sub>", "K_p": "K<sub>p</sub>",
    "q_ult": "q<sub>ult</sub>", "q_a": "q<sub>a</sub>", "k_v": "k<sub>v</sub>", "k_h": "k<sub>h</sub>", "q_s": "q<sub>s</sub>", "q_b": "q<sub>b</sub>", "q_c": "q<sub>c</sub>", "q_t": "q<sub>t</sub>", "f_s": "f<sub>s</sub>", "f_b": "f<sub>b</sub>",
    "R_f": "R<sub>f</sub>", "u_2": "u<sub>2</sub>", "s_u": "s<sub>u</sub>", "c_a": "c<sub>a</sub>", "c_u": "c<sub>u</sub>", "C_u": "C<sub>u</sub>", "K_s": "K<sub>s</sub>", "y_s": "y<sub>s</sub>", "c′_j": "c′<sub>j</sub>", "φ′_j": "φ′<sub>j</sub>"
  };
  const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  function symbols(text) {
    let html = escapeHtml(text);
    Object.entries(symbolMap).sort((a, b) => b[0].length - a[0].length).forEach(([plain, formatted]) => { html = html.split(plain).join(formatted); });
    return html;
  }

  function spokenText(text) {
    const spokenSymbols = {
      "q_ult,screen": "q ultimate screen", "q_ult": "q ultimate", "q_a": "q a",
      "(N_1)_60": "corrected S P T N", "N_corr": "corrected S P T N", "N_60": "N sixty",
      "I_s(50)": "point load index I s fifty", "γ_bulk": "gamma bulk", "γ_sat": "gamma saturated", "γ_d": "gamma dry",
      "f_m,s": "f m s", "R_d,ug": "R d u g", "E_rm": "E r m", "G_max": "G max",
      "σ′_p": "sigma prime p", "σ′_v": "sigma prime v", "I_ss": "I s s", "I_D": "density index I D",
      "G_s": "G s", "S_t": "sensitivity S t", "E_s": "E s", "V_s": "V s", "G_0": "G zero",
      "m_v": "m v", "C_c": "C c", "C_r": "C r", "c_v": "c v", "C_α": "C alpha",
      "K_a": "K a", "K_0": "K zero", "K_p": "K p", "k_v": "k v", "k_h": "k h",
      "q_s": "q s", "q_b": "q b", "q_c": "q c", "q_t": "q t", "f_s": "f s", "f_b": "f b",
      "R_f": "R f", "u_2": "u two", "s_u": "s u", "c_a": "c a", "c_u": "c u", "C_u": "C u",
      "K_s": "K s", "y_s": "y s", "c′_j": "c prime j", "φ′_j": "phi prime j"
    };
    let spoken = String(text);
    Object.entries(spokenSymbols).sort((a, b) => b[0].length - a[0].length).forEach(([plain, replacement]) => { spoken = spoken.split(plain).join(replacement); });
    return spoken.replaceAll("φ′", "phi prime").replaceAll("c′", "c prime").replaceAll("γ′", "gamma buoyant").replaceAll("≤", "less than or equal to").replaceAll("≥", "greater than or equal to");
  }


  let hasSelection = false;
  let activeMaterial = "clay";
  const materialOptions = {
    cohesive: [["clay", "Clay · subtype not specified"], ["silty-clay", "Silty clay"], ["sandy-clay", "Sandy clay"]],
    granular: [["sand", "Sand"], ["gravel", "Gravel"]],
    rock: [["rock", "Rock · type not specified"], ["sandstone", "Sandstone"], ["shale", "Shale"], ["limestone", "Limestone"], ["granite", "Granite"], ["basalt", "Basalt"]]
  };
  const selection = $("selectedGround");
  function options(select, rows, selected) {
    select.innerHTML = rows.map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>`).join("");
  }
  function syncUsCs() {
    const family = $("family").value, material = $("material").value, previous = $("uscs").value;
    const allowed = family === "cohesive" ? ["unknown", "CL", "CH"] : material === "gravel" ? ["unknown", "GW", "GP", "GM", "GC"] : ["unknown", "SW", "SP", "SM", "SC"];
    options($("uscs"), Object.entries(data.permeability).filter(([id]) => allowed.includes(id)).map(([id, row]) => [id, row.label]), allowed.includes(previous) ? previous : "unknown");
  }
  function syncGroundControls() {
    const family = $("family").value;
    $("grading").value = "unknown";
    $("plasticity").value = "unknown";
    $("uscs").value = "unknown";
    options($("material"), materialOptions[family]);
    $("conditionLabel").textContent = {cohesive:"Consistency", granular:"Relative density", rock:"Intact rock strength"}[family];
    const rows = {cohesive:data.cohesive, granular:data.granular, rock:data.rockStrength}[family];
    options($("condition"), rows.map(row => [row.id,row.term]), {cohesive:"stiff",granular:"medium-dense",rock:"medium"}[family]);
    $("weatheringField").hidden = family !== "rock";
    options($("weathering"), [["unknown", "Not selected"], ...data.weathering.map(row => [row.id, `${row.term} (${row.symbol})`])], "unknown");
    $("materialField").hidden = family === "granular";
    $("materialLabel").textContent = family === "rock" ? "Lithology" : "Clay subtype";
    $("plasticityField").hidden = family !== "cohesive";
    $("uscsField").hidden = family === "rock";
    $("optionalRefinement").hidden = family === "rock";
    $("optionalRefinement").open = false;
    syncUsCs();
  }
  function input() {
    return Object.fromEntries(["family","material","condition","weathering","plasticity","uscs","grading"].map(id => [id,$(id).value]));
  }
  function partsHtml(parts) {
    return parts.map(part => `<span class="geo-value-line">${part.label ? `<span class="geo-value-label">${symbols(part.label)}</span>` : ""}${symbols(/No exact|Exact row not/.test(part.value) ? "No verified range for this selection" : part.value)}</span>`).join("");
  }
  function overviewHeading(label) {
    const match=label.match(/^(.*) \(([^()]*)\)$/);
    return match ? `${symbols(match[1])}<small class="geo-heading-unit">${symbols(match[2])}</small>` : symbols(label);
  }
  function labelledValue(label, value) {
    if (/unit weight/i.test(label)) return partsHtml(query.labelledPair(value, "Dry", "Saturated", "kN/m³"));
    if (/modulus|Poisson/i.test(label)) return partsHtml(query.labelledPair(value,"Short term (source)","Long term (source)"));
    if (/SPT N indication/.test(label)) return partsHtml(query.labelledPair(value,"Field N","Corrected N (source)","blows/300 mm"));
    return symbols(value);
  }
  function referenceTable(group) {
    return `<section class="interface-reference"><h4>${symbols(group.title)}</h4><p>${symbols(group.source)}</p><table><thead><tr>${group.headings.map(heading => `<th scope="col">${symbols(heading)}</th>`).join("")}</tr></thead><tbody>${group.rows.map(row => `<tr>${row.map((value,index) => `<td><span class="foundation-mobile-label">${symbols(group.headings[index])}</span>${index === 1 ? labelledValue(row[0], value) : symbols(value)}</td>`).join("")}</tr>`).join("")}</tbody></table><p>${symbols(group.note)}</p></section>`;
  }
  function render() {
    const canGrade=$("family").value==="granular" && $("material").value==="sand" && ["loose","dense"].includes($("condition").value);
    $("gradingField").hidden=!canGrade;
    if(!canGrade) $("grading").value="unknown";
    const state=input(), result=query.evaluate(state);
    if (!result.ground) return;
    const ground=result.ground;
    $("conditionField").hidden=Boolean(ground.soilLike);
    const guide=query.unifiedRows(state,ground);
    selection.hidden=false;
    $("resultHeading").textContent=ground.heading;
    $("selectionStatus").textContent=`Details shown for ${ground.heading}. No value is adopted by default.`;
    const referenceIds=["bearingReference","settlementReference","baseInterfaceReference","interfaceReferences","anchorReference"];
    referenceIds.forEach(id=>$("parameterReferenceParking").append($(id)));
    const detailRow=id=>`<tr class="geo-reference-row"><td colspan="3" data-reference-slot="${id}"></td></tr>`;
    let previousGroup = "";
    $("selectedRangeRows").innerHTML=guide.map((row,index) => {
      const heading=row.group!==previousGroup ? `<tr class="parameter-group"><th colspan="3">${escapeHtml(row.group)}</th></tr>` : "";
      previousGroup=row.group;
      const evidence = row.basis && row.basis !== row.condition ? `<details class="geo-row-source"><summary>Source and basis</summary><p>${symbols(row.basis)}</p></details>` : "";
      const value = row.inventory ? labelledValue(row.name,row.value) : partsHtml(row.parts);
      const kind = row.role==="project" ? "" : row.role==="standard" ? "Classification band" : /bearing/i.test(row.name) ? (state.family==="rock" ? "Broad source reference" : "Conditional reference") : /modulus/.test(row.name) ? "Stiffness reference" : /Pile shaft/.test(row.name) ? "Estimation factors" : "Typical reference";
      return `${heading}<tr><th scope="row">${symbols(row.name)}</th><td class="${row.role==="project"?"geo-pending":"geo-numeric"}"><span class="foundation-mobile-label">Reference value / range</span>${kind?`<span class="geo-reference-kind">${kind}</span>`:""}${value}</td><td><span class="foundation-mobile-label">Conditions</span>${symbols(row.condition)}${evidence}</td></tr>${index===0?detailRow("bearingReference"): index<12 && /modulus/.test(row.name)?detailRow("settlementReference"):row.name==="Pile shaft resistance, f_s"?detailRow("interfaceReferences"):""}`;
    }).join("")+
      `<tr><th scope="row">Concrete–ground interface, μ / δ</th><td class="geo-pending">Match contact materials</td><td>Match the actual interface; soil φ′ alone is insufficient.</td></tr>${detailRow("baseInterfaceReference")}`+
      `<tr><th scope="row">Anchor bond stress</th><td class="geo-pending">Match rock type and condition</td><td>Ultimate grout–rock bond references only; not soil-anchor bond or allowable design stress.</td></tr>${detailRow("anchorReference")}`;
    referenceIds.forEach(id=>$("selectedRangeRows").querySelector(`[data-reference-slot="${id}"]`).append($(id)));
    $("ultimateBearingTable").hidden=state.family!=="cohesive";
    $("rockBearingTable").hidden=state.family!=="rock" || Boolean(ground.soilLike);
    document.querySelector(".geo-bearing-basis").hidden=state.family==="rock" && !ground.soilLike;

    $("settlementReferenceTable").innerHTML=referenceTable(query.settlementReference(ground));
    $("selectedBearing").innerHTML="<p>Check the source conditions below.</p>";
    $("rangeOverview").querySelectorAll("button[data-condition]").forEach(button=>{
      const active=hasSelection && !ground.soilLike && button.dataset.family===state.family && button.dataset.condition===state.condition && (state.family!=="granular" || state.material===button.dataset.material);
      button.setAttribute("aria-pressed",String(active));
      button.setAttribute("aria-expanded",String(active));
      button.querySelector("span").textContent=active ? " −" : " +";
      button.setAttribute("aria-label",`${button.dataset.material} · ${button.firstChild.textContent}: ${active ? "hide" : "show"} parameter details`);
      button.classList.toggle("active",active);
      button.closest("tr").classList.toggle("active",active);
    });

  }
  function renderUnselected() {
    ["bearingReference","settlementReference","baseInterfaceReference","interfaceReferences","anchorReference"].forEach(id=>$("parameterReferenceParking").append($(id)));
    selection.hidden=true;
    $("selectedRangeRows").innerHTML="";
    $("rangeOverview").querySelectorAll("button[data-condition]").forEach(button=>{
      button.setAttribute("aria-pressed","false");
      button.setAttribute("aria-expanded","false");
      button.querySelector("span").textContent=" +";
      button.setAttribute("aria-label",`${button.dataset.material} · ${button.firstChild.textContent}: show parameter details`);
      button.classList.remove("active");
      button.closest("tr").classList.remove("active");
    });
    $("settlementReferenceTable").innerHTML=referenceTable(query.settlementReference());
    $("selectedBearing").innerHTML="<p>Select a ground state to view its source conditions.</p>";
    $("selectionStatus").textContent="Select a material and reported state. No value is adopted by default.";
  }
  function clayShaftBasis() {
    const reference=query.foundationQuickReferences("clay")[0];
    return `<details class="foundation-topic"><summary><span>Bored pile shaft basis</span><span aria-hidden="true">+</span></summary><div class="geo-shaft-body"><p>${symbols(reference.source)}</p><p>${symbols(reference.note)}</p></div></details>`;
  }
  function renderOverview() {
    const groups=[
      {material:"clay",family:"cohesive",title:"Clay",note:"Cohesive soils · consistency",rows:data.cohesive},
      {material:"sand",family:"granular",title:"Sand",note:"Granular soils · relative density",rows:data.granular},
      {material:"gravel",family:"granular",title:"Gravel",note:"Granular soils · relative density",rows:data.granular},
      {material:"rock",family:"rock",title:"Rock",note:"Intact rock strength",rows:data.rockStrength}
    ];
    $("geoMaterialTabs").innerHTML=groups.map(group=>`<button type="button" role="tab" id="geo-tab-${group.material}" data-material="${group.material}" aria-controls="geo-${group.material}" aria-selected="${group.material===activeMaterial}" tabindex="${group.material===activeMaterial?0:-1}">${group.title}</button>`).join("");
    $("rangeOverview").innerHTML=groups.map(group=>{
      const rock=group.family==="rock", clay=group.family==="cohesive";
      const strength=rock?"Intact strength, UCS (MPa)":clay?"Undrained shear strength, s_u (kPa)":"Effective friction angle, φ′ (°)";
      const modulus=rock?"Rock-mass modulus, E_rm (MPa)":group.material==="sand"?"Modulus, E_s (MPa · medium–coarse sand)":"Modulus, E_s (MPa)";
      const note=rock?"Intact-rock indices are not socket or anchor resistance. Bearing: broad source reference; assess defects, weathering and footing conditions.":clay?"Shaft: uniform bored clay; α = 0.30 fissured / 0.45 non-fissured; cap 100 kPa. Estimates are not allowable; uplift requires separate assessment. Bearing: natural ground, B > 1 m, 25 mm settlement. Modulus time labels are source terms, not durations.":group.material==="sand"?"Scope: do not transfer to residual, clayey/silty, cemented or crushable sands without material-specific evidence. Shaft: uniform sand; rounded estimate, not allowable; uplift requires separate assessment. Bearing: natural sand, B > 1 m, 25 mm settlement; groundwater more than B below base.":"No presumed gravel bearing range or sand-factor substitution. Missing modulus classes need project data. Strength: check grading, fines and plasticity; the source correlation is fines-governed above 30%.";
      const columns=rock?["strength","bearing","pointLoad"]:clay?["strength","bearing","modulus","shaft","weight"]:group.material==="sand"?["strength","modulus","bearing","shaft","weight"]:["strength","modulus","weight","densityIndex"];
      const labels={strength,modulus,shaft:clay?"Bored pile shaft, f_s (kPa · estimate)":"Pile shaft estimate, f_s (kPa · at σ′_v = 100 kPa)",pointLoad:"Point-load index, I_s(50) (MPa)",densityIndex:"Relative density index, I_D (%)",bearing:rock?"Preliminary bearing reference, q_a (MPa · conditional; not UCS-derived)":"Allowable bearing, q_a (kPa · presumed)",weight:"Unit weight, γ (kN/m³ · dry / saturated)"};
      const rows=group.rows.map(row=>{
        const state={family:group.family,material:group.material,condition:row.id,weathering:"unknown",plasticity:"unknown",uscs:"unknown"};
        const parameters=query.guideRows(state,query.evaluate(state).ground);
        const bearing=parameters.find(p=>p.name.startsWith("Allowable bearing"));
        const strengthRow=parameters.find(p=>/Undrained shear strength|Effective friction angle|Uniaxial compressive/.test(p.name));
        const modulusRow=parameters.find(p=>/modulus/.test(p.name));
        const weight=parameters.find(p=>/unit weight/i.test(p.name));
        const shaft=query.overviewShaft(group.material,row.id);
        const pointLoad={role:"standard",parts:[{label:"",value:row.is50}]};
        const densityIndex={role:"standard",parts:[{label:"",value:row.densityIndex}]};
        const cell=(parameter,label)=>`<td class="${parameter.role==="project"?"geo-overview-pending":"geo-overview-value"}"><span class="range-mobile-label">${overviewHeading(label)}</span>${parameter.role==="project"?(rock && parameter===weight?"Refine lithology / weathering":"Project value required"):partsHtml(parameter.parts)}${clay && row.id==="soft" && parameter===weight?'<small class="geo-value-scope">Non-organic clay only.</small>':""}</td>`;
        return `<tr><td><button type="button" data-family="${group.family}" data-material="${group.material}" data-condition="${row.id}" aria-label="${group.title} · ${row.term}: show parameter details" aria-controls="selectedGround" aria-pressed="false" aria-expanded="false">${escapeHtml(row.term)}<span aria-hidden="true"> +</span></button></td>${columns.map(key=>{const html=cell({bearing,strength:strengthRow,modulus:modulusRow,weight,shaft,pointLoad,densityIndex}[key],labels[key]);return key==="shaft" && group.material==="sand"?html.replace("<td ",`<td data-sand-shaft="${row.id}" `):html;}).join("")}</tr>`;
      }).join("");
      return `<section id="geo-${group.material}" class="range-group" role="tabpanel" aria-labelledby="geo-tab-${group.material}"${group.material===activeMaterial?"":" hidden"}><header class="geo-sr-only"><h4>${group.title}</h4><span>${group.note}</span></header><div class="range-table-wrap"><table class="range-table"><thead><tr><th scope="col">${clay?"Consistency":rock?"Intact rock strength":"Relative density"}</th>${columns.map(key=>`<th scope="col"${key==="shaft" && group.material==="sand"?' id="sandShaftHeading"':""}>${overviewHeading(labels[key])}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div><p class="geo-group-note">Separate source references; not an adopted design set.</p><p class="geo-group-note">${symbols(note)}</p><div class="geo-quick-foundation">${group.material==="sand"?'<details class="foundation-topic geo-shaft-details"><summary><span>Pile shaft details</span><span aria-hidden="true">+</span></summary><div class="geo-shaft-body"><p class="geo-group-note">Overview estimates stay at σ′<sub>v</sub> = 100 kPa. Change the assumed stress below to compare pile shaft estimates only.</p><div class="geo-fields geo-benchmark"><label><span>Assumed vertical effective stress, σ′<sub>v</sub></span><select id="sandShaftStress" aria-label="Assumed vertical effective stress for sand piles"><option value="50">50 kPa</option><option value="100" selected>100 kPa</option><option value="200">200 kPa</option></select></label></div>':""}<div id="quick-foundation-${group.material}"${group.material==="sand"?' aria-live="polite"':""}>${group.material==="clay"?clayShaftBasis():query.foundationQuickReferences(group.material).map(referenceTable).join("")}</div>${group.material==="sand"?"</div></details>":""}</div></section>`;
    }).join("");
  }

  function activateMaterial(material, focus=false) {
    const changed=material!==activeMaterial;
    activeMaterial=material;
    if(changed) {
      hasSelection=false;
      $("family").value=material==="clay"?"cohesive":material==="rock"?"rock":"granular";
      syncGroundControls();
      if(material==="sand" || material==="gravel") $("material").value=material;
      syncUsCs();
      renderUnselected();
      $("groundRefinement").open=false;
    }
    $("geoMaterialTabs").querySelectorAll('[role="tab"]').forEach(tab=>{
      const active=tab.dataset.material===material;
      tab.setAttribute("aria-selected",String(active));
      tab.tabIndex=active?0:-1;
      $(tab.getAttribute("aria-controls")).hidden=!active;
    });
    $("geo-"+material).append(selection);
    $("geo-"+material).append($("geo-"+material).querySelector(".geo-quick-foundation"));
    if(focus) $("geo-tab-"+material).focus();
    if(changed) $("selectionStatus").textContent=`${material} selected. Select a reported state to view details. No value is adopted by default.`;
  }
  $("geoMaterialTabs").addEventListener("click",event=>{
    const tab=event.target.closest('[role="tab"]');
    if(tab) activateMaterial(tab.dataset.material);
  });
  $("geoMaterialTabs").addEventListener("keydown",event=>{
    const tabs=[...$("geoMaterialTabs").querySelectorAll('[role="tab"]')];
    const index=tabs.indexOf(event.target);
    if(index<0 || !["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
    event.preventDefault();
    const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:(index+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
    activateMaterial(tabs[next].dataset.material,true);
  });
  function bearingTables() {
    const ultimate={title:"Clay ultimate bearing · idealised surface strip footing",source:"q_ult ≈ 5.14 s_u · FHWA GEC 6 (2002), Eq. (5-4), Table 5-1; strength bands: AS 1726 Table 11",headings:["Clay consistency","Undrained strength, s_u (kPa)","Ultimate bearing screen, q_ult (kPa)"],rows:data.cohesive.map(row=>[row.term,row.su,`Approx. ${row.undrainedUltimate}`]),note:"Undrained, homogeneous ground; level surface and centred vertical load. Gross = net at zero surcharge. Limits rounded to 1 kPa; no embedment, shape, layering or settlement allowance. Not a conversion of the allowable ranges above."};
    const rqd={title:"Rock quality (RQD) and allowable bearing",source:"Look (2014), Table 22.1 · first approximation only",headings:["Rock quality designation, RQD (%)","Rock-mass quality","Allowable bearing reference, q_a (MPa)"],rows:data.rockBearingRqd.map(row=>[row.rqd,row.description,row.allowableBearing]),note:"Use the lesser of the applicable table value, UCS and allowable concrete stress. Check defects, weathering and geometry. As RQD approaches zero, treat the material as a soil mass; this rock-bearing reference does not apply. The source excludes detailed design; do not use RQD alone."};
    $("ultimateBearingTable").innerHTML=referenceTable(ultimate);
    $("rockBearingTable").innerHTML=referenceTable(rqd);
  }
  options($("plasticity"),Object.entries(data.plasticity).map(([id,row])=>[id,row.label]),"unknown");
  syncGroundControls();
  renderOverview();
  $("sandShaftStress").addEventListener("change",()=>{
    const stress=Number($("sandShaftStress").value);
    $("quick-foundation-sand").innerHTML=query.foundationQuickReferences("sand",stress).map(referenceTable).join("");
  });
  renderUnselected();
  activateMaterial("clay");
  bearingTables();
  $("baseInterfaceTable").innerHTML=referenceTable(data.baseInterfaceReference);
  $("interfaceReferenceTables").innerHTML=data.interfaceReferences.filter(group=>!group.title.startsWith("Rock anchors")).map(referenceTable).join("");
  $("anchorReferenceTables").innerHTML=data.interfaceReferences.filter(group=>group.title.startsWith("Rock anchors")).map(referenceTable).join("");
  $("material").addEventListener("change",()=>{if($("family").value==="granular" && $("material").value!==activeMaterial){activateMaterial($("material").value,true);return;}hasSelection=true;syncUsCs();render();});
  ["condition","weathering","plasticity","uscs","grading"].forEach(id=>$(id).addEventListener("change",()=>{hasSelection=true;render();}));
  $("rangeOverview").addEventListener("click",event=>{
    const button=event.target.closest("button[data-condition]");
    if(!button)return;
    if(button.getAttribute("aria-expanded")==="true"){
      hasSelection=false;
      renderUnselected();
      button.focus();
      return;
    }
    if($("family").value!==button.dataset.family){
      $("family").value=button.dataset.family;
      syncGroundControls();
    }
    if(button.dataset.family==="granular")$("material").value=button.dataset.material;
    if(["residual-soil","extremely-weathered"].includes($("weathering").value))$("weathering").value="unknown";
    $("condition").value=button.dataset.condition;
    syncUsCs();
    hasSelection=true;
    render();
    $("resultHeading").focus({preventScroll:true});
    $("resultHeading").scrollIntoView({block:"start",behavior:"instant"});
  });
  document.querySelectorAll("[data-topic]").forEach(button=>button.addEventListener("click",()=>{
    const topic=$(button.dataset.topic);
    topic.open=true;
    topic.querySelector("summary").focus();
    topic.scrollIntoView({block:"start",behavior:"instant"});
  }));
  document.querySelectorAll(".geo-jump a").forEach(link=>link.addEventListener("click",event=>{
    event.preventDefault(); // Keep the shared app's #geo route; these are in-page section links.
    const target=$(link.getAttribute("href").slice(1));
    const heading=target.querySelector("h3,h4");
    heading.tabIndex=-1;
    heading.focus({preventScroll:true});
    target.scrollIntoView({block:"start",behavior:"instant"});
  }));
})();
