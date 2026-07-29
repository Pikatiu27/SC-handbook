(function () {
  "use strict";

  const capacity = window.MonopoleCapacity;
  if (!capacity) return;

  const $ = id => document.getElementById(id);
  const sectionColours = ["#2f7b57", "#a95344", "#356f9f", "#8063a6", "#8a6a2c", "#4f7771"];
  let mode = "schedule";
  let schedule = [
    { id: "S1", length: 12, bottomDimension: 1200, topDimension: 900, nominalThickness: 12, designThickness: 12, yieldStress: 350, overlap: 0 },
    { id: "S2", length: 10.5, bottomDimension: 950, topDimension: 650, nominalThickness: 10, designThickness: 10, yieldStress: 350, overlap: 1.5 },
    { id: "S3", length: 10.5, bottomDimension: 700, topDimension: 350, nominalThickness: 8, designThickness: 8, yieldStress: 350, overlap: 1.5 }
  ];

  function number(value) {
    return Number.parseFloat(value);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function fixed(value, digits = 1) {
    return Number(value).toLocaleString("en-AU", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
  }

  function plateLookupActive() {
    return $("monopoleMaterialMode").value === "plate";
  }

  function separateDesignThickness() {
    return $("monopoleSeparateDesignThickness").checked;
  }

  function sectionSelection() {
    const value = $("monopoleSectionForm").value;
    if (value === "circular") return { form: "circular", sideCount: null };
    return { form: "polygon", sideCount: Number(value.replace("polygon-", "")) };
  }

  function polygonActive() {
    return sectionSelection().form === "polygon";
  }

  function resistanceBasisHtml() {
    return polygonActive()
      ? "ASCE/SEI 48-19 &middot; P = 0 &middot; M = F<sub>a</sub>I/c &middot; no AS 4100 &phi;"
      : "AS 4100:2020 &middot; &phi; = 0.90";
  }

  function syncMethodPresentation() {
    const polygon = polygonActive();
    $("monopoleMethodLabel").textContent = polygon
      ? "ASCE/SEI 48-19 Cl. 5.2.5"
      : "AS 4100:2020 Cl. 5.2";
    $("monopoleResistanceLabel").innerHTML = polygon
      ? "Minimum permitted bending moment, M"
      : "Minimum design moment capacity, &phi;M<sub>s</sub>";
    $("monopoleResistanceBasis").innerHTML = resistanceBasisHtml();
    $("monopoleStationResistanceHeading").innerHTML = polygon ? "M" : "&phi;M<sub>s</sub>";
  }

  function resolvedYieldStress(section) {
    return plateLookupActive()
      ? capacity.plateYieldStress($("monopolePlateGrade").value, section.nominalThickness)
      : section.yieldStress;
  }

  function sectionFormOptions(section) {
    const selection = sectionSelection();
    const bendRadiusRatio = number($("monopoleBendRadiusRatio").value);
    if (selection.form === "polygon" && (!Number.isFinite(bendRadiusRatio) || bendRadiusRatio <= 0)) {
      throw new RangeError("Inside bend-radius ratio, r_i/t_nom, must be greater than zero.");
    }
    const designThickness = separateDesignThickness() ? section.designThickness : section.nominalThickness;
    return {
      ...section,
      form: selection.form,
      sideCount: selection.sideCount,
      dimensionBasis: selection.form === "polygon" ? "across-flats" : undefined,
      thickness: designThickness,
      insideBendRadius: selection.form === "polygon" ? bendRadiusRatio * section.nominalThickness : undefined,
      yieldStress: resolvedYieldStress(section),
      fabricationCategory: $("monopoleFabrication").value
    };
  }

  function readSchedule() {
    const separate = separateDesignThickness();
    schedule = [...$("monopoleScheduleBody").querySelectorAll("tr")].map((row, index) => {
      const nominalThickness = number(row.querySelector('[data-field="nominalThickness"]').value);
      return {
        id: row.querySelector('[data-field="id"]').value.trim() || `S${index + 1}`,
        length: number(row.querySelector('[data-field="length"]').value),
        bottomDimension: number(row.querySelector('[data-field="bottomDimension"]').value),
        topDimension: number(row.querySelector('[data-field="topDimension"]').value),
        nominalThickness,
        designThickness: separate
          ? number(row.querySelector('[data-field="designThickness"]').value)
          : nominalThickness,
        yieldStress: number(row.querySelector('[data-field="yieldStress"]').value),
        overlap: index === 0 ? 0 : number(row.querySelector('[data-field="overlap"]').value)
      };
    });
    return schedule.map(sectionFormOptions);
  }

  function overallSection() {
    const nominalThickness = number($("monopoleThickness").value);
    const designThickness = separateDesignThickness()
      ? number($("monopoleDesignThickness").value)
      : nominalThickness;
    if (!separateDesignThickness()) $("monopoleDesignThickness").value = String(nominalThickness);
    return [sectionFormOptions({
      id: "Overall",
      length: number($("monopoleHeight").value),
      bottomDimension: number($("monopoleBottomDimension").value),
      topDimension: number($("monopoleTopDimension").value),
      nominalThickness,
      designThickness,
      yieldStress: number($("monopoleYieldStress").value),
      overlap: 0
    })];
  }

  function renderSchedule() {
    const lookup = plateLookupActive();
    const separate = separateDesignThickness();
    $("monopoleScheduleBody").innerHTML = schedule.map((section, index) => `
      <tr>
        <td data-label="Section"><input data-field="id" type="text" value="${escapeHtml(section.id)}" aria-label="Section ${index + 1} identifier"></td>
        <td data-label="Fabricated length, Li"><input data-field="length" type="number" min="0.1" step="0.1" value="${section.length}" aria-label="${escapeHtml(section.id)} fabricated length"></td>
        <td data-label="Bottom outside dimension"><input data-field="bottomDimension" type="number" min="1" step="10" value="${section.bottomDimension}" aria-label="${escapeHtml(section.id)} bottom outside dimension"></td>
        <td data-label="Top outside dimension"><input data-field="topDimension" type="number" min="1" step="10" value="${section.topDimension}" aria-label="${escapeHtml(section.id)} top outside dimension"></td>
        <td data-label="Nominal wall thickness"><input data-field="nominalThickness" type="number" min="0.1" step="0.1" value="${section.nominalThickness}" aria-label="${escapeHtml(section.id)} nominal wall thickness"></td>
        <td class="monopole-design-thickness-column" data-label="Design wall thickness"${separate ? "" : " hidden"}><input data-field="designThickness" type="number" min="0.1" step="0.1" value="${section.designThickness}" aria-label="${escapeHtml(section.id)} design wall thickness"></td>
        <td data-label="Yield stress"><input data-field="yieldStress" type="number" min="1" step="1" value="${section.yieldStress}" aria-label="${escapeHtml(section.id)} yield stress"${lookup ? " readonly aria-readonly=\"true\"" : ""}></td>
        <td data-label="Overlap with section below">${index === 0
          ? '<span class="monopole-not-applicable">N/A</span>'
          : `<input data-field="overlap" type="number" min="0" step="0.1" value="${section.overlap}" aria-label="${escapeHtml(section.id)} overlap with section below">`
        }</td>
        <td data-label="Remove"><button class="monopole-remove-section" type="button" data-index="${index}" title="Remove ${escapeHtml(section.id)}" aria-label="Remove ${escapeHtml(section.id)}">&times;</button></td>
      </tr>`).join("");

    $("monopoleScheduleBody").querySelectorAll("input").forEach(input => input.addEventListener("input", calculate));
    $("monopoleScheduleBody").querySelectorAll(".monopole-remove-section").forEach(button => {
      button.disabled = schedule.length === 1;
      button.addEventListener("click", () => {
        readSchedule();
        schedule.splice(Number(button.dataset.index), 1);
        schedule = schedule.map((section, index) => ({ ...section, id: section.id || `S${index + 1}`, overlap: index === 0 ? 0 : section.overlap }));
        renderSchedule();
        calculate();
      });
    });
  }

  function syncYieldStressInputs(sections) {
    const lookup = plateLookupActive();
    const selection = sectionSelection();
    $("monopolePlateGradeField").hidden = !lookup;
    const grade = $("monopolePlateGrade").value;
    const materialNote = lookup
      ? `Grade ${escapeHtml(grade)} f<sub>y</sub> from AS/NZS 3678:2016 Table 8, based on t<sub>nom</sub>.`
      : "Enter project f<sub>y</sub> for each section.";
    const sectionNote = selection.form === "polygon"
      ? ` ASCE/SEI 48-19 regular ${selection.sideCount}-sided method; r<sub>i</sub>/t<sub>nom</sub> applies to all sections.`
      : "";
    $("monopoleMaterialNote").innerHTML = materialNote + sectionNote;
    const inputs = mode === "schedule"
      ? [...$("monopoleScheduleBody").querySelectorAll('[data-field="yieldStress"]')]
      : [$("monopoleYieldStress")];
    inputs.forEach((input, index) => {
      input.readOnly = lookup;
      input.setAttribute("aria-readonly", String(lookup));
      if (lookup && sections[index]) input.value = String(sections[index].yieldStress);
    });
  }

  function updateMaterialState() {
    const lookup = plateLookupActive();
    $("monopolePlateGradeField").hidden = !lookup;
    document.querySelectorAll('#monopolePanel [data-field="yieldStress"], #monopoleYieldStress').forEach(input => {
      input.readOnly = lookup;
      input.setAttribute("aria-readonly", String(lookup));
    });
    calculate();
  }

  function updateDesignThicknessState() {
    const separate = separateDesignThickness();
    if (!separate) {
      readSchedule();
      $("monopoleDesignThickness").value = $("monopoleThickness").value;
      renderSchedule();
    } else if (mode === "schedule") {
      renderSchedule();
    }
    $("monopoleOverallDesignThicknessField").hidden = !separate;
    document.querySelectorAll(".monopole-design-thickness-column").forEach(cell => {
      cell.hidden = !separate;
    });
    calculate();
  }

  function updateSectionFormState() {
    const selection = sectionSelection();
    const polygon = selection.form === "polygon";
    $("monopoleBendRadiusField").hidden = !polygon;
    $("monopoleFabricationField").hidden = polygon;
    document.querySelector(".monopole-dimension-bottom").innerHTML = polygon
      ? "Bottom outside across-flats, D<sub>o,b</sub>"
      : "Bottom outside diameter, D<sub>b</sub>";
    document.querySelector(".monopole-dimension-top").innerHTML = polygon
      ? "Top outside across-flats, D<sub>o,t</sub>"
      : "Top outside diameter, D<sub>t</sub>";
    document.querySelector(".monopole-bottom-dimension-heading").innerHTML = polygon
      ? "D<sub>o,b</sub> (mm)"
      : "D<sub>b</sub> (mm)";
    document.querySelector(".monopole-top-dimension-heading").innerHTML = polygon
      ? "D<sub>o,t</sub> (mm)"
      : "D<sub>t</sub> (mm)";
    $("monopoleStationDimensionHeading").innerHTML = polygon ? "D<sub>o</sub>" : "D";
    calculate();
  }

  function addSection() {
    readSchedule();
    const previous = schedule.at(-1);
    const nextIndex = schedule.length + 1;
    schedule.push({
      id: `S${nextIndex}`,
      length: 10,
      bottomDimension: Math.max(100, Math.round((previous.topDimension + 50) / 10) * 10),
      topDimension: Math.max(80, Math.round(previous.topDimension * 0.62 / 10) * 10),
      nominalThickness: Math.max(plateLookupActive() ? 4.5 : 0.1, previous.nominalThickness - 2),
      designThickness: Math.max(0.1, previous.designThickness - 2),
      yieldStress: previous.yieldStress,
      overlap: Math.min(1.5, previous.length / 4)
    });
    renderSchedule();
    calculate();
  }

  function setMode(nextMode) {
    mode = nextMode;
    document.querySelectorAll(".monopole-mode").forEach(button => {
      const active = button.dataset.monopoleMode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $("monopoleOverallInputs").hidden = mode !== "overall";
    $("monopoleScheduleInputs").hidden = mode !== "schedule";
    $("monopoleOverlapSection").hidden = mode !== "schedule";
    calculate();
  }

  function clearResults(message) {
    $("monopoleInputStatus").textContent = message;
    $("monopoleInputStatus").className = "result-note is-warning";
    $("monopoleInputStatus").hidden = false;
    ["monopoleMinimumResistance", "monopoleMass", "monopoleSelfWeight", "monopoleCentreOfGravity"].forEach(id => {
      $(id).textContent = "-";
    });
    $("monopoleMinimumLocation").textContent = "Invalid input.";
    $("monopoleMinimumResistance").nextElementSibling.hidden = true;
    $("monopoleAssembledHeight").textContent = "-";
    $("monopoleSectionCount").textContent = "-";
    $("monopoleChart").classList.add("is-unavailable");
    $("monopoleChart").innerHTML = "";
    $("monopoleChartLegend").innerHTML = "";
    $("monopoleStationBody").innerHTML = "";
    $("monopoleStationCount").textContent = "0 rows";
    $("monopoleOverlapBody").innerHTML = "";
    $("monopoleFormulaSteps").innerHTML = "";
  }

  function capacityValue(active) {
    return active.designResistance;
  }

  function capacityState(active) {
    return active.capacity.properties.form === "polygon"
      ? active.capacity.stress.checked
        ? active.capacity.stress.localBucklingState
        : `\u03bb ${fixed(active.capacity.slenderness, 2)} > ${fixed(active.capacity.stress.upperLimit, 2)}`
      : active.capacity.sectionClass;
  }

  function polygonRangeFailure(stations) {
    const failures = stations.flatMap(station => station.active
      .filter(active => active.capacity.properties.form === "polygon" && !active.capacity.stress.checked)
      .map(active => ({
        elevation: station.elevation,
        id: active.id,
        slenderness: active.capacity.slenderness,
        upperLimit: active.capacity.stress.upperLimit,
        outsideDimension: active.outsideDimension,
        thickness: active.thickness
      })));
    return failures.sort((a, b) => (b.slenderness / b.upperLimit) - (a.slenderness / a.upperLimit))[0] || null;
  }

  function polygonRangeMessage(failure) {
    if (!failure) return "Station outside the prescribed ASCE local-buckling range.";
    return `\u03bb = ${fixed(failure.slenderness, 2)} > ${fixed(failure.upperLimit, 2)} at z = ${fixed(failure.elevation, 1)} m \u00b7 ${failure.id} \u00b7 D_o = ${fixed(failure.outsideDimension, 0)} mm \u00b7 t_d = ${fixed(failure.thickness, 1)} mm`;
  }

  function renderStations(stations) {
    const rows = [];
    stations.forEach(station => {
      const isOverlap = station.active.length > 1 && station.active.some(active =>
        active.localElevation > 1e-7 && active.localElevation < active.sectionLength - 1e-7
      );
      station.active.forEach((active, activeIndex) => {
        const resistance = capacityValue(active);
        rows.push(`
          <tr class="${isOverlap ? "is-overlap" : ""}">
            <td>${activeIndex === 0 ? `${fixed(station.elevation, 1)} m` : '<span class="monopole-repeat-elevation">same station</span>'}</td>
            <td><span class="monopole-section-key" style="--section-colour:${sectionColours[active.sectionIndex % sectionColours.length]}"></span>${escapeHtml(active.id)}${isOverlap ? " &middot; overlap" : station.active.length > 1 ? " &middot; boundary" : ""}</td>
            <td>${fixed(active.outsideDimension, 1)} mm</td>
            <td>${fixed(active.thickness, 1)} mm</td>
            <td>${fixed(active.yieldStress, 0)} MPa</td>
            <td>${escapeHtml(capacityState(active))}</td>
            <td>${Number.isFinite(resistance) ? `${fixed(resistance, 1)} kN&middot;m` : "Not checked"}</td>
          </tr>`);
      });
    });
    $("monopoleStationBody").innerHTML = rows.join("");
    $("monopoleStationCount").textContent = `${rows.length} rows`;
  }

  function renderOverlaps(assembly) {
    const rows = assembly.sections.slice(1)
      .map((upper, index) => ({ upper, lower: assembly.sections[index] }))
      .filter(connection => connection.upper.section.overlap > 0)
      .map(({ upper, lower }) => {
      const result = capacity.slipOverlapScreen(lower, upper);
      const stateClass = result.designRatio >= 1 ? "meets" : "below";
      return `
        <tr>
          <td>${escapeHtml(lower.section.id)} / ${escapeHtml(upper.section.id)}</td>
          <td>${fixed(result.designOverlap, 2)} m</td>
          <td>${fixed(result.requiredDesignOverlap, 2)} m</td>
          <td><span class="monopole-overlap-state ${stateClass}">${escapeHtml(result.designState)}</span><small>D<sub>ins,max</sub> = ${fixed(result.inscribedDiameter, 0)} mm &middot; outside profile</small></td>
        </tr>`;
      });
    $("monopoleOverlapBody").innerHTML = rows.length
      ? rows.join("")
      : '<tr><td colspan="4">No prescribed overlap is entered.</td></tr>';
  }

  function pathForPoints(points, xScale, yScale) {
    return points.map((point, index) => `${index === 0 ? "M" : "L"} ${xScale(point.resistance).toFixed(2)} ${yScale(point.elevation).toFixed(2)}`).join(" ");
  }

  function renderChart(assembly, stations) {
    const width = 840;
    const height = 440;
    const margin = { top: 24, right: 112, bottom: 46, left: 62 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const series = assembly.sections.map((item, sectionIndex) => ({
      item,
      sectionIndex,
      points: stations
        .flatMap(station => station.active
          .filter(active => active.sectionIndex === sectionIndex)
          .map(active => ({ elevation: station.elevation, resistance: capacityValue(active) })))
        .filter(point => Number.isFinite(point.resistance))
        .sort((a, b) => a.elevation - b.elevation)
    }));
    const finiteValues = series.flatMap(item => item.points.map(point => point.resistance));
    if (!finiteValues.length) {
      $("monopoleChart").classList.add("is-unavailable");
      $("monopoleChart").innerHTML = '<p class="monopole-chart-empty">No checked resistance range is available for the entered geometry.</p>';
      $("monopoleChartLegend").innerHTML = "";
      return;
    }
    $("monopoleChart").classList.remove("is-unavailable");
    const maximum = Math.max(...finiteValues) * 1.12;
    const xScale = value => margin.left + value / maximum * plotWidth;
    const yScale = elevation => margin.top + (assembly.height - elevation) / assembly.height * plotHeight;
    const xTicks = Array.from({ length: 5 }, (_, index) => maximum * index / 4);
    const guideElevations = [];
    for (let elevation = 0; elevation <= assembly.height + 1e-9; elevation += 5) guideElevations.push(elevation);
    if (Math.abs(guideElevations.at(-1) - assembly.height) > 1e-9) guideElevations.push(assembly.height);

    const overlapZones = assembly.sections.slice(1).filter(item => item.section.overlap > 0).map(item => {
      const top = yScale(item.start + item.section.overlap);
      const bottom = yScale(item.start);
      return `<rect x="${margin.left}" y="${top}" width="${plotWidth}" height="${Math.max(1, bottom - top)}" class="monopole-chart-overlap"><title>${escapeHtml(item.section.id)} overlap zone</title></rect>`;
    }).join("");

    const horizontalGuides = guideElevations.map(elevation => `
      <line x1="${margin.left}" y1="${yScale(elevation)}" x2="${margin.left + plotWidth}" y2="${yScale(elevation)}" class="monopole-chart-guide"/>
      <text x="${margin.left - 10}" y="${yScale(elevation) + 4}" class="monopole-chart-y-label">${fixed(elevation, elevation === assembly.height && elevation % 5 !== 0 ? 1 : 0)}</text>`).join("");
    const verticalGuides = xTicks.map(value => `
      <line x1="${xScale(value)}" y1="${margin.top}" x2="${xScale(value)}" y2="${margin.top + plotHeight}" class="monopole-chart-x-guide"/>
      <text x="${xScale(value)}" y="${margin.top + plotHeight + 23}" class="monopole-chart-x-label">${fixed(value, 0)}</text>`).join("");
    const paths = series.map(item => item.points.length
      ? `<path d="${pathForPoints(item.points, xScale, yScale)}" class="monopole-chart-line" style="--section-colour:${sectionColours[item.sectionIndex % sectionColours.length]}"><title>${escapeHtml(item.item.section.id)}</title></path>`
      : "").join("");
    const stationLabels = series.flatMap(item => item.points
      .filter(point => Math.abs(point.elevation / 5 - Math.round(point.elevation / 5)) < 1e-7)
      .map(point => {
        const x = xScale(point.resistance);
        const y = yScale(point.elevation);
        const anchorRight = x > margin.left + plotWidth * 0.72;
        return `
          <circle cx="${x}" cy="${y}" r="3.5" class="monopole-chart-point" style="--section-colour:${sectionColours[item.sectionIndex % sectionColours.length]}"/>
          <text x="${x + (anchorRight ? -7 : 7)}" y="${y - 7}" text-anchor="${anchorRight ? "end" : "start"}" class="monopole-chart-value" style="--section-colour:${sectionColours[item.sectionIndex % sectionColours.length]}">${fixed(point.resistance, 0)}</text>`;
      })).join("");

    $("monopoleChart").innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
        <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" class="monopole-chart-plot"/>
        ${overlapZones}
        ${horizontalGuides}
        ${verticalGuides}
        <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="monopole-chart-axis"/>
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="monopole-chart-axis"/>
        ${paths}
        ${stationLabels}
        <text x="${margin.left + plotWidth / 2}" y="${height - 8}" class="monopole-chart-axis-title">Bending resistance (kN&middot;m)</text>
        <text x="17" y="${margin.top + plotHeight / 2}" transform="rotate(-90 17 ${margin.top + plotHeight / 2})" class="monopole-chart-axis-title">Elevation, z (m)</text>
      </svg>`;
    $("monopoleChartLegend").innerHTML = series.map(item => `
      <span><i style="--section-colour:${sectionColours[item.sectionIndex % sectionColours.length]}"></i>${escapeHtml(item.item.section.id)}</span>`).join("")
      + '<span><i class="overlap"></i>Overlap zone</span>';
  }

  function renderFormulaSteps(assembly, mass) {
    const assemblyExpression = assembly.sections.length === 1
      ? `H = L<sub>1</sub> = ${fixed(assembly.height, 2)} m`
      : `H = &Sigma;L<sub>i</sub> - &Sigma;L<sub>o,i</sub> = ${fixed(assembly.height, 2)} m`;
    const materialExpression = plateLookupActive()
      ? `AS/NZS 3678:2016 Table 8, Grade ${escapeHtml($("monopolePlateGrade").value)}; f<sub>y</sub> selected from each t<sub>nom</sub>.`
      : "Manual project f<sub>y</sub> for each physical section.";
    const thicknessExpression = separateDesignThickness()
      ? "Capacity uses t<sub>d</sub>; material lookup and theoretical mass use t<sub>nom</sub>."
      : "t<sub>d</sub> = t<sub>nom</sub>; one entered thickness is used for capacity, material lookup and theoretical mass.";
    const selection = sectionSelection();
    const polygon = selection.form === "polygon";
    const propertyExpression = polygon
      ? `Exact concentric sharp-corner ${selection.sideCount}-sided polygon; Z<sub>min</sub> = I/c<sub>max</sub>.`
      : "D<sub>i</sub> = D - 2t<sub>d</sub>; A = &pi;(D<sup>2</sup> - D<sub>i</sub><sup>2</sup>)/4; I = &pi;(D<sup>4</sup> - D<sub>i</sub><sup>4</sup>)/64.";
    const resistanceExpression = polygon
      ? `P = 0; r<sub>i</sub>/t<sub>nom</sub> = ${fixed(number($("monopoleBendRadiusRatio").value), 2)}; BR = min(r<sub>i</sub>, 4t<sub>d</sub>); w = tan(&pi;/${selection.sideCount})(D<sub>o</sub> - t<sub>d</sub> - 2BR); &lambda; = (w/t<sub>d</sub>)&radic;(f<sub>y</sub>/E); M = F<sub>a</sub>I/c<sub>max</sub> = F<sub>a</sub>Z<sub>min</sub>; AS 4100 &phi; is not applied. ASCE/SEI 48-19 Cl. 5.2.3.2.1 and 5.2.5.`
      : "&lambda;<sub>s</sub> = (D/t<sub>d</sub>)(f<sub>y</sub>/250); &phi;M<sub>s</sub> = 0.90f<sub>y</sub>Z<sub>e</sub>; AS 4100:2020 Cl. 5.2 and Table 5.2.";
    $("monopoleFormulaSteps").innerHTML = `
      <div><b>Assembly geometry</b><code>${assemblyExpression}; each taper uses its local section coordinate.</code></div>
      <div><b>Stations</b><code>0.5 m spacing plus exact base, top and section boundaries; the primary result is the minimum evaluated value.</code></div>
      <div><b>Material</b><code>${materialExpression}</code></div>
      <div><b>Thickness basis</b><code>${thicknessExpression}</code></div>
      <div><b>Section properties</b><code>${propertyExpression}</code></div>
      <div><b>Section resistance</b><code>${resistanceExpression}</code></div>
      <div><b>Mass</b><code>m = &rho;&int;A(t<sub>nom</sub>, s)ds = ${fixed(mass.mass, 1)} kg; both shells are included in each overlap.</code></div>`;
  }

  function calculate() {
    syncMethodPresentation();
    try {
      const sections = mode === "schedule" ? readSchedule() : overallSection();
      syncYieldStressInputs(sections);
      const assembly = capacity.assembleSections(sections);
      const stations = capacity.buildStations(assembly, 0.5);
      const mass = capacity.assemblyMassProperties(assembly);
      const activeResults = stations.flatMap(station => station.active.map(active => ({
        elevation: station.elevation,
        id: active.id,
        value: capacityValue(active)
      })));
      const unavailable = activeResults.some(result => !Number.isFinite(result.value));
      const available = activeResults.filter(result => Number.isFinite(result.value));
      const minimum = available.sort((a, b) => a.value - b.value)[0];
      const polygon = polygonActive();
      const rangeFailure = polygon ? polygonRangeFailure(stations) : null;
      const rangeMessage = polygonRangeMessage(rangeFailure);

      $("monopoleMinimumResistance").textContent = unavailable || !minimum ? "Not checked" : fixed(minimum.value, 1);
      $("monopoleMinimumResistance").nextElementSibling.hidden = unavailable || !minimum;
      $("monopoleMinimumLocation").textContent = unavailable
        ? polygon
          ? rangeMessage
          : "No resistance result is available."
        : minimum
          ? `z = ${fixed(minimum.elevation, 1)} m \u00b7 ${minimum.id}`
          : "No resistance result.";
      $("monopoleMass").textContent = fixed(mass.mass, 0);
      $("monopoleSelfWeight").textContent = fixed(mass.selfWeight, 1);
      $("monopoleCentreOfGravity").textContent = fixed(mass.centreOfGravity, 2);
      $("monopoleAssembledHeight").textContent = `${fixed(assembly.height, 2)} m`;
      $("monopoleSectionCount").textContent = String(assembly.sections.length);
      $("monopoleInputStatus").textContent = unavailable && polygon
        ? `${rangeMessage}. Outside ASCE/SEI 48-19 Eqs. (5.2-6) to (5.2-11); M is not reported.`
        : "";
      $("monopoleInputStatus").className = unavailable && polygon
        ? "result-note is-warning"
        : "result-note";
      $("monopoleInputStatus").hidden = !(unavailable && polygon);

      renderStations(stations);
      if (mode === "schedule") renderOverlaps(assembly);
      if (unavailable && polygon) {
        $("monopoleChart").classList.add("is-unavailable");
        $("monopoleChart").innerHTML = '<p class="monopole-chart-empty"><b>Profile not checked.</b><span>No bending-resistance profile is reported outside the prescribed method range.</span></p>';
        $("monopoleChartLegend").innerHTML = "";
      } else {
        renderChart(assembly, stations);
      }
      renderFormulaSteps(assembly, mass);
    } catch (error) {
      clearResults(error instanceof Error ? error.message : "Invalid monopole input.");
    }
  }

  document.querySelectorAll(".monopole-mode").forEach(button => {
    button.addEventListener("click", () => setMode(button.dataset.monopoleMode));
  });
  $("monopoleAddSection").addEventListener("click", addSection);
  $("monopoleSectionForm").addEventListener("change", updateSectionFormState);
  $("monopoleBendRadiusRatio").addEventListener("input", calculate);
  $("monopoleMaterialMode").addEventListener("change", updateMaterialState);
  $("monopoleSeparateDesignThickness").addEventListener("change", updateDesignThicknessState);
  $("monopolePlateGrade").addEventListener("change", calculate);
  $("monopoleFabrication").addEventListener("change", calculate);
  ["monopoleHeight", "monopoleBottomDimension", "monopoleTopDimension", "monopoleThickness", "monopoleDesignThickness", "monopoleYieldStress"]
    .forEach(id => $(id).addEventListener("input", calculate));
  window.addEventListener("resize", () => {
    if (!$("monopolePanel").hidden) calculate();
  });

  renderSchedule();
  updateDesignThicknessState();
  updateSectionFormState();
  setMode("schedule");
})();
