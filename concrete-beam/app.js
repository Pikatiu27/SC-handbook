"use strict";
(() => {
  const calc = window.ConcreteBeamCalculation, panel = document.getElementById("concretebeamPanel");
  if (!panel || !calc) return;
  const fields = {width:"Width",depth:"Depth",cover:"Cover",fc:"Fc",direction:"Direction",aggregate:"Aggregate",topBar:"TopBar",topCount:"TopCount",bottomBar:"BottomBar",bottomCount:"BottomCount",fitments:"Fitments",fitmentBar:"FitmentBar",legs:"Legs",spacing:"Spacing",applicable:"Applicable"};
  const $ = key => document.getElementById("cb"+fields[key]);
  const el = suffix => document.getElementById("cb"+suffix);
  const fmt = (n,digits=1) => Number.isFinite(n) ? window.EngineeringNumberFormat.decimalHalfUp(n,digits) : "—";
  const escape = value => String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const kv = pairs => '<dl class="cb-kv">'+pairs.map(([name,value])=>`<dt>${name}</dt><dd>${value}</dd>`).join("")+"</dl>";
  const presentation=window.ConcreteBeamPresentation;
  const renderTraces=(input,result)=>presentation.traces(input,result).filter(row=>!selectedTrace||row.id===selectedTrace).map(row=>window.calculationTraceRow(row).replace('class="calculation-trace-row',`id="cbTrace-${row.id}" role="group" tabindex="-1" aria-label="${escape(row.title)} calculation" data-cb-trace="${row.id}" class="calculation-trace-row${row.id===selectedTrace?" cb-trace-selected":""}`)).join("");
  let drawingInput=null,drawingResult=null,selectedTrace=null;
  function draw(){
    const holder=el("Drawing"), model=window.ConcreteBeamDrawing.geometry(drawingInput,drawingResult);
    if(!model){holder.textContent="Enter valid section inputs";el("DrawingSummary").textContent="";return;}
    const compact=window.matchMedia("(max-width:600px)").matches,box=holder.getBoundingClientRect(),width=Math.round(box.width)||160,height=Math.round(box.height)||180;
    holder.innerHTML=window.ConcreteBeamDrawing.render(model,{width,height,compact});
    const key=(role,text)=>`<span><i class="engineering-figure__swatch ${role}" aria-hidden="true"></i>${escape(text)}</span>`;
    el("DrawingSummary").innerHTML=key("engineering-figure__swatch--active",`Compression face: ${model.compression === "top" ? "Top" : "Bottom"}`)
      +(model.fitment?key("","Fitment · schematic")+(model.fitment.legs.some(leg=>leg.symbolic)?key("engineering-figure__swatch--symbolic","Internal legs · symbolic"):""):"");
  }
  for(const key of Object.keys(fields)){
    const field=$(key);
    if(field.type==="number"){field.type="text";field.inputMode=["topCount","bottomCount","legs"].includes(key)?"numeric":"decimal";field.classList.add("numeric-input","input-manual");}
    else if(field.tagName==="SELECT")field.classList.add("input-reference");
  }
  for (const key of ["topBar","bottomBar","fitmentBar"]) $(key).innerHTML=calc.bars.map(bar=>`<option value="${bar.designation}">${bar.designation}</option>`).join("");
  function collect() {
    const input={moment:null,shear:null};
    for (const [key,suffix] of Object.entries(fields)) {
      const field=$(key);
      input[key]=field.type === "checkbox" ? field.checked : field.tagName === "SELECT" ? field.value : field.value.trim() === "" ? NaN : Number(field.value.trim().replace(",","."));
    }
    return input;
  }
  function clear() {
    el("Issues").removeAttribute("data-state");
    for (const suffix of ["MomentCapacity","ShearCapacity"]) {el(suffix).textContent="Not evaluated";el(suffix).classList.add("cb-unavailable");}
    for (const suffix of ["MomentUnit","ShearUnit","MomentNote","ShearNote","Geometry","Screens","Details","Summary"]) el(suffix).textContent="";
  }
  function update() {
    const input=collect(), result=calc.calculate(input); panel.querySelectorAll("[data-cb-fitment]").forEach(label=>label.hidden=input.fitments === "none");
    window.ConcreteBeamLastResult=result;
    drawingInput=input;drawingResult=result;draw();
    for (const key of Object.keys(fields)) {
      const field=$(key), error=result.errors[key] || result.actionErrors[key], errorId=field.id+"Error";
      document.getElementById(errorId)?.remove(); field.removeAttribute("aria-invalid"); field.removeAttribute("aria-describedby");
      if(error){const note=document.createElement("small");note.id=errorId;note.className="cb-field-error";note.textContent=error;field.closest("label").append(note);field.setAttribute("aria-invalid","true");field.setAttribute("aria-describedby",errorId);}
      if(field.tagName === "SELECT" && key.endsWith("Bar") && key !== "fitmentBar") field.disabled=input[key.replace("Bar","Count")] === 0;
    }
    clear();
    el("Screens").innerHTML=presentation.renderScreens(input,result,true);
    // A changed reinforcement branch must not replace a selected check with all steps.
    if(selectedTrace&&!presentation.screens(input,result).some(row=>row.id===selectedTrace)){
      selectedTrace=null;
      el("Calculation").open=false;
    }
    el("Details").innerHTML=renderTraces(input,result);
    if(!result.valid){el("Issues").dataset.state="invalid";el("Issues").textContent=result.errors.section?`Invalid input · ${result.errors.section}`:"Invalid input · correct the highlighted fields.";return;}
    const r=result, s=r.section, v=r.shear;
    el("Summary").textContent=`${fmt(input.width,1)} × ${fmt(input.depth,1)} mm · f′c ${fmt(input.fc,1)} MPa · 500N · ${input.direction} compression`;
    if(r.flexureCapacity != null){el("MomentCapacity").textContent=fmt(r.flexureCapacity);el("MomentCapacity").classList.remove("cb-unavailable");el("MomentUnit").textContent=" kN·m";}
    if(r.shearCapacity != null){el("ShearCapacity").textContent=fmt(r.shearCapacity);el("ShearCapacity").classList.remove("cb-unavailable");el("ShearUnit").textContent=" kN";}
    el("MomentNote").innerHTML=r.flexureReasons.some(reason=>reason!=="Confirm the stated section applicability before using capacities.") ? "Outside section method." : !input.applicable ? "" : !r.minimumFlexure ? "Review minimum flexural steel." : "";
    el("ShearNote").textContent=r.shearReasons.length ? "" : v.webCrushingLimited ? "Web crushing governs." : input.fitments === "none" ? "Conditional · fitment review required." : "";
    const issues=presentation.primaryIssues(r);
    el("Issues").innerHTML=issues.length ? '<ul>'+[...new Set(issues)].map(note=>`<li>${presentation.note(note)}</li>`).join("")+"</ul>" : "";
    el("Geometry").innerHTML=kv(presentation.geometry(r));
    window.ConcreteBeamLastResult=r;
  }
  el("Screens").addEventListener("click",event=>{
    const link=event.target.closest("a[data-check]");
    if(!link)return;
    event.preventDefault();
    selectedTrace=link.dataset.check;
    el("Details").innerHTML=renderTraces(drawingInput,drawingResult);
    const target=document.getElementById("cbTrace-"+link.dataset.check);
    if(!target)return;
    el("Calculation").open=true;
    target.focus({preventScroll:true});
    el("Calculation").scrollIntoView({block:"start",behavior:"instant"});
  });
  el("Calculation").querySelector("summary").addEventListener("click",()=>{
    if(!el("Calculation").open){selectedTrace=null;el("Details").innerHTML=renderTraces(drawingInput,drawingResult);}
  });
  el("BackResults").addEventListener("click",()=>{
    const origin=el("Screens").querySelector(`a[data-check="${selectedTrace}"]`)||el("Screens").querySelector("a");
    selectedTrace=null;
    el("Calculation").open=false;
    el("Details").innerHTML=renderTraces(drawingInput,drawingResult);
    origin?.focus({preventScroll:true});
    origin?.scrollIntoView({block:"center",behavior:"instant"});
  });
  el("ViewConditions").addEventListener("click",event=>{
    event.preventDefault();
    el("Sources").open=true;
    el("Applicability").focus({preventScroll:true});
    el("Applicability").scrollIntoView({block:"start",behavior:"instant"});
  });
  el("BackInputs").addEventListener("click",()=>{
    el("Sources").open=false;
    el("ViewConditions").focus({preventScroll:true});
    el("ViewConditions").scrollIntoView({block:"center",behavior:"instant"});
  });
  // Default applicability is explicitly user-adopted for this local example.
  function reset(){if(selectedTrace)el("Calculation").open=false;selectedTrace=null;for(const key of Object.keys(fields)){const value=calc.defaults[key];if($(key).type === "checkbox")$(key).checked=value;else $(key).value=value == null ? "" : value;}update();}
  panel.addEventListener("input",update);panel.addEventListener("change",update);el("Reset").addEventListener("click",reset);
  const resizeObserver=new ResizeObserver(draw);resizeObserver.observe(el("Drawing"));reset();
})();
