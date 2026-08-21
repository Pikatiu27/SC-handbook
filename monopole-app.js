(function () {
  "use strict";

  const capacity = window.MonopoleCapacity;
  const numberFormat = window.EngineeringNumberFormat;
  if (!capacity || !numberFormat?.decimalHalfUp) return;

  const $ = id => document.getElementById(id);
  const sectionColours = ["#2f7b57", "#a95344", "#356f9f", "#8063a6", "#8a6a2c", "#4f7771"];
  let schedule = [
    { id: "S1", length: 12, bottomDimension: 508, topDimension: 508, nominalThickness: 6.4, designThickness: 6.4, yieldStress: 350, overlap: 0 }
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
    const rounded = numberFormat.decimalHalfUp(value, digits);
    const [whole, fraction] = rounded.split(".");
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fraction === undefined ? grouped : `${grouped}.${fraction}`;
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
    const method = polygonActive()
      ? "ASCE/SEI 48-19 &middot; P = 0 &middot; M = F<sub>a</sub>I/c &middot; no AS 4100 &phi;"
      : "AS 4100:2020 &middot; &phi; = 0.90";
    return separateDesignThickness() ? `${method} &middot; User override: t<sub>d</sub>` : method;
  }

  function syncMethodPresentation() {
    const polygon = polygonActive();
    $("monopoleCombinedCapacityContent").hidden = polygon;
    $("monopoleCombinedUnavailable").hidden = !polygon;
    $("monopoleMomentBasis").innerHTML = `${resistanceBasisHtml()} &middot; 0.5 m stations`;
    $("monopoleCombinedCapacityTitle").textContent = polygon ? "Combined polygon stress" : "Compression and bending capacities";
    $("monopoleCombinedCapacityBasis").innerHTML = polygon
      ? "ASCE/SEI 48-19 &middot; combined polygon stress not evaluated"
      : "AS 4100:2020 &middot; 0.5 m stations &middot; capacity intercepts";
    if (polygon) $("monopoleCombinedCapacitySummary").textContent = "Not evaluated";
    $("monopoleStationResistanceHeading").innerHTML = polygon ? "M" : "&phi;M<sub>s</sub>";
    $("monopoleChart").setAttribute(
      "aria-label",
      polygon
        ? "Permitted bending moment plotted against pole elevation"
        : "Design section moment capacity plotted against pole elevation"
    );
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
      const designThicknessInput = row.querySelector('[data-field="designThickness"]');
      if (!separate) designThicknessInput.value = String(nominalThickness);
      return {
        id: row.querySelector('[data-field="id"]').value.trim() || `S${index + 1}`,
        length: number(row.querySelector('[data-field="length"]').value),
        bottomDimension: number(row.querySelector('[data-field="bottomDimension"]').value),
        topDimension: number(row.querySelector('[data-field="topDimension"]').value),
        nominalThickness,
        designThickness: separate
          ? number(designThicknessInput.value)
          : nominalThickness,
        yieldStress: number(row.querySelector('[data-field="yieldStress"]').value),
        overlap: index === 0 ? 0 : number(row.querySelector('[data-field="overlap"]').value)
      };
    });
    return schedule.map(sectionFormOptions);
  }

  function polygonBendRadiusRows(sections) {
    return sections.map(section => ({
      id: section.id,
      nominalThickness: section.nominalThickness,
      designThickness: section.thickness,
      insideBendRadius: section.insideBendRadius,
      effectiveBendRadius: Math.min(section.insideBendRadius, 4 * section.thickness)
    }));
  }

  function polygonBendRadiusSummary(sections) {
    const rows = polygonBendRadiusRows(sections);
    if (rows.length === 1) {
      return `Derived for ${escapeHtml(rows[0].id)}: r<sub>i</sub> = ${fixed(rows[0].insideBendRadius, 1)} mm; BR = ${fixed(rows[0].effectiveBendRadius, 1)} mm.`;
    }
    const radii = rows.map(row => row.insideBendRadius);
    const effectiveRadii = rows.map(row => row.effectiveBendRadius);
    return `Derived by section: r<sub>i</sub> = ${fixed(Math.min(...radii), 1)}&ndash;${fixed(Math.max(...radii), 1)} mm; BR = ${fixed(Math.min(...effectiveRadii), 1)}&ndash;${fixed(Math.max(...effectiveRadii), 1)} mm.`;
  }

  function renderSchedule() {
    const lookup = plateLookupActive();
    const separate = separateDesignThickness();
    $("monopoleScheduleBody").innerHTML = schedule.map((section, index) => `
      <tr>
        <td data-label="Segment"><input data-field="id" type="text" value="${escapeHtml(section.id)}" aria-label="Segment ${index + 1} identifier"></td>
        <td data-label="Segment length, Li"><input data-field="length" type="number" min="0.1" step="0.1" value="${section.length}" aria-label="${escapeHtml(section.id)} segment length"></td>
        <td data-label="Bottom outside dimension"><input data-field="bottomDimension" type="number" min="1" step="10" value="${section.bottomDimension}" aria-label="${escapeHtml(section.id)} bottom outside dimension"></td>
        <td data-label="Top outside dimension"><input data-field="topDimension" type="number" min="1" step="10" value="${section.topDimension}" aria-label="${escapeHtml(section.id)} top outside dimension"></td>
        <td data-label="Nominal wall thickness"><input data-field="nominalThickness" type="number" min="0.1" step="0.1" value="${section.nominalThickness}" aria-label="${escapeHtml(section.id)} nominal wall thickness"></td>
        <td class="monopole-design-thickness-column" data-label="Design thickness override"${separate ? "" : " hidden"}><input data-field="designThickness" type="number" min="0.1" step="0.1" value="${section.designThickness}" aria-label="${escapeHtml(section.id)} design thickness override"></td>
        <td data-label="Yield stress"><input data-field="yieldStress" type="number" min="1" step="1" value="${section.yieldStress}" aria-label="${escapeHtml(section.id)} yield stress"${lookup ? " readonly aria-readonly=\"true\"" : ""}></td>
        <td data-label="Upper overlap">${index === 0
          ? '<span class="monopole-not-applicable">N/A</span>'
          : `<input data-field="overlap" type="number" min="0" step="0.1" value="${section.overlap}" aria-label="${escapeHtml(section.id)} downward overlap outside segment below">`
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
    const fabricationCategory = $("monopoleFabrication").value;
    $("monopolePlateGradeField").hidden = !lookup;
    const grade = $("monopolePlateGrade").value;
    const materialNote = lookup
      ? `AS/NZS 3678:2016 Grade ${escapeHtml(grade)}; f<sub>y</sub> uses t<sub>nom</sub>. Confirm the AS 4100 category; CF is not inferred from plate cold-forming.`
      : selection.form === "circular"
        ? fabricationCategory === "CF"
          ? "Initial example: Austube AS/NZS 1163 C350L0 CHS; CF category; adopted f<sub>y</sub> = 350 MPa. Verify product data."
          : `Manual f<sub>y</sub>; ${escapeHtml(fabricationCategory)} is a user-selected AS 4100 category. Verify fabrication data.`
        : "Enter the verified product or project f<sub>y</sub>.";
    const sectionNote = selection.form === "polygon"
      ? `ASCE/SEI 48-19 regular ${selection.sideCount}-sided method. Fabrication estimate r<sub>i</sub>/t<sub>nom</sub> = 1.5; replace with verified project or manufacturer data. ${polygonBendRadiusSummary(sections)}`
      : "AS 4100 circular section; bend radius not required.";
    $("monopoleMaterialNote").innerHTML = materialNote;
    $("monopoleSectionNote").innerHTML = sectionNote;
    const inputs = [...$("monopoleScheduleBody").querySelectorAll('[data-field="yieldStress"]')];
    inputs.forEach((input, index) => {
      input.readOnly = lookup;
      input.setAttribute("aria-readonly", String(lookup));
      if (lookup && sections[index]) input.value = String(sections[index].yieldStress);
    });
  }

  function updateMaterialState() {
    const lookup = plateLookupActive();
    $("monopolePlateGradeField").hidden = !lookup;
    document.querySelectorAll('#monopolePanel [data-field="yieldStress"]').forEach(input => {
      input.readOnly = lookup;
      input.setAttribute("aria-readonly", String(lookup));
    });
    calculate();
  }

  function updateDesignThicknessState() {
    const separate = separateDesignThickness();
    readSchedule();
    if (!separate) {
      schedule = schedule.map(section => ({ ...section, designThickness: section.nominalThickness }));
    }
    renderSchedule();
    $("monopoleDesignThicknessState").innerHTML = separate
      ? "User override &middot; Resistance uses t<sub>d</sub>; material and mass use t<sub>nom</sub>."
      : "Default t<sub>d</sub> = t<sub>nom</sub>.";
    calculate();
  }

  function updateSectionFormState() {
    const selection = sectionSelection();
    const polygon = selection.form === "polygon";
    $("monopoleBendRadiusField").hidden = !polygon;
    $("monopoleFabricationField").hidden = polygon;
    $("monopoleScheduleBasis").textContent = polygon
      ? "Segments run base to top. Enter verified project or manufacturer geometry."
      : "Base to top. Default: Austube 508.0 × 6.4 CHS C350L0.";
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

  function clearResults(message) {
    $("monopoleInputStatus").textContent = message;
    $("monopoleInputStatus").className = "result-note is-warning";
    $("monopoleInputStatus").hidden = false;
    ["monopoleMass", "monopoleSelfWeight", "monopoleCentreOfGravity"].forEach(id => {
      $(id).textContent = "-";
    });
    $("monopoleMomentSummary").textContent = "Not evaluated";
    $("monopoleMomentMinimum").textContent = "5 m guides";
    $("monopoleAssembledHeight").textContent = "-";
    $("monopoleSectionCount").textContent = "-";
    $("monopoleChart").classList.add("is-unavailable");
    $("monopoleChart").innerHTML = "";
    $("monopoleChartLegend").innerHTML = "";
    $("monopoleStationBody").innerHTML = "";
    $("monopoleStationCount").textContent = "0 rows";
    $("monopoleCombinedCapacityBody").innerHTML = "";
    $("monopoleCombinedCapacityCount").textContent = "0 rows · top to base";
    $("monopoleCombinedCapacitySummary").textContent = "Not evaluated";
    $("monopoleCombinedCapacityStatus").textContent = message;
    $("monopoleCombinedCapacityStatus").className = "result-note is-warning";
    $("monopoleCombinedCapacityStatus").hidden = false;
    $("monopoleOverlapBody").innerHTML = "";
    $("monopoleOverlapSection").hidden = true;
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
            <td>${Number.isFinite(resistance) ? `${fixed(resistance, 1)} kN&middot;m` : "Not evaluated"}</td>
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
          <td>${escapeHtml(upper.section.id)} over ${escapeHtml(lower.section.id)}</td>
          <td>${fixed(result.designOverlap, 2)} m</td>
          <td>${fixed(result.requiredDesignOverlap, 2)} m</td>
          <td><span class="monopole-overlap-state ${stateClass}">${escapeHtml(result.designState)}</span><small>D<sub>ins,max</sub> = ${fixed(result.inscribedDiameter, 0)} mm &middot; outside profile</small></td>
        </tr>`;
      });
    $("monopoleOverlapBody").innerHTML = rows.join("");
    $("monopoleOverlapSection").hidden = rows.length === 0;
  }

  function pathForPoints(points, xScale, yScale) {
    return points.map((point, index) => `${index === 0 ? "M" : "L"} ${xScale(point.resistance).toFixed(2)} ${yScale(point.elevation).toFixed(2)}`).join(" ");
  }

  function renderChart(assembly, stations) {
    const compact = window.matchMedia("(max-width: 760px)").matches;
    const width = compact ? 360 : 840;
    const height = compact ? 270 : 440;
    const margin = compact
      ? { top: 18, right: 24, bottom: 45, left: 50 }
      : { top: 24, right: 112, bottom: 46, left: 62 };
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
    const xTickCount = compact ? 3 : 5;
    const xTicks = Array.from({ length: xTickCount }, (_, index) => maximum * index / (xTickCount - 1));
    const hasOverlap = assembly.sections.slice(1).some(item => item.section.overlap > 0);
    const hasBoundary = assembly.sections.slice(1).some(item => item.section.overlap === 0);
    const horizontalAxisTitle = polygonActive()
      ? compact ? "M (kN&middot;m)" : "Permitted bending moment, M (kN&middot;m)"
      : compact ? "&phi;M&#x209B; (kN&middot;m)" : "Design section moment capacity, &phi;M&#x209B; (kN&middot;m)";
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
    const boundarySteps = assembly.sections.slice(1).map((upper, index) => {
      if (upper.section.overlap > 0) return "";
      const elevation = upper.start;
      const lowerPoint = series[index].points.find(point => Math.abs(point.elevation - elevation) < 1e-7);
      const upperPoint = series[index + 1].points.find(point => Math.abs(point.elevation - elevation) < 1e-7);
      if (!lowerPoint || !upperPoint) return "";
      const lowerColour = sectionColours[index % sectionColours.length];
      const upperColour = sectionColours[(index + 1) % sectionColours.length];
      return `
        <line x1="${xScale(lowerPoint.resistance)}" y1="${yScale(elevation)}" x2="${xScale(upperPoint.resistance)}" y2="${yScale(elevation)}" class="monopole-chart-boundary"><title>Segment boundary at z = ${fixed(elevation, 1)} m: ${escapeHtml(series[index].item.section.id)} to ${escapeHtml(series[index + 1].item.section.id)}</title></line>
        <circle cx="${xScale(lowerPoint.resistance)}" cy="${yScale(elevation)}" r="3.5" class="monopole-chart-boundary-point" style="--section-colour:${lowerColour}"/>
        <circle cx="${xScale(upperPoint.resistance)}" cy="${yScale(elevation)}" r="3.5" class="monopole-chart-boundary-point" style="--section-colour:${upperColour}"/>`;
    }).join("");
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
        ${boundarySteps}
        ${stationLabels}
        <text x="${margin.left + plotWidth / 2}" y="${height - 8}" class="monopole-chart-axis-title">${horizontalAxisTitle}</text>
        <text x="17" y="${margin.top + plotHeight / 2}" transform="rotate(-90 17 ${margin.top + plotHeight / 2})" class="monopole-chart-axis-title">Elevation, z (m)</text>
      </svg>`;
    $("monopoleChartLegend").innerHTML = series.map(item => `
      <span><i style="--section-colour:${sectionColours[item.sectionIndex % sectionColours.length]}"></i>${escapeHtml(item.item.section.id)}</span>`).join("")
      + (hasOverlap ? '<span><i class="overlap"></i>Overlap zone</span>' : "")
      + (hasBoundary ? '<span><i class="boundary"></i>Segment boundary</span>' : "");
  }

  function renderCombinedCapacityStations(stations) {
    if (polygonActive()) return;
    try {
      const rows = [];
      stations.forEach(station => {
        const isOverlap = station.active.length > 1 && station.active.some(active =>
          active.localElevation > 1e-7 && active.localElevation < active.sectionLength - 1e-7
        );
        station.active.forEach((active, activeIndex) => {
          const compression = capacity.circularCompressionSectionCapacity(
            active.outsideDimension,
            active.thickness,
            active.yieldStress
          );
          rows.push({ station, active, activeIndex, isOverlap, compression });
        });
      });
      const baseRows = rows.filter(row => Math.abs(row.station.elevation) < 1e-7);
      const baseCompression = baseRows.map(row => row.compression.designSectionCapacity).sort((a, b) => a - b)[0];
      const baseMoment = baseRows.map(row => row.active.designResistance).filter(Number.isFinite).sort((a, b) => a - b)[0];
      if (!Number.isFinite(baseCompression) || !Number.isFinite(baseMoment)) {
        throw new RangeError("Base compression and bending section capacities are unavailable.");
      }
      $("monopoleCombinedCapacitySummary").innerHTML = `Base &phi;N<sub>s</sub> = ${fixed(baseCompression, 1)} kN &middot; &phi;M<sub>s</sub> = ${fixed(baseMoment, 1)} kN&middot;m`;
      $("monopoleCombinedCapacityBody").innerHTML = rows.map(row => `
        <tr>
          <td>${row.activeIndex === 0 ? `${fixed(row.station.elevation, 1)} m` : '<span class="monopole-repeat-elevation">same station</span>'}</td>
          <td><span class="monopole-section-key" style="--section-colour:${sectionColours[row.active.sectionIndex % sectionColours.length]}"></span>${escapeHtml(row.active.id)}${row.isOverlap ? " &middot; overlap" : row.station.active.length > 1 ? " &middot; boundary" : ""}</td>
          <td>${fixed(row.active.outsideDimension, 1)} mm</td>
          <td>${fixed(row.active.thickness, 1)} mm</td>
          <td>${fixed(row.compression.formFactor, 3)}</td>
          <td>${fixed(row.compression.designSectionCapacity, 1)} kN</td>
          <td>${fixed(row.active.designResistance, 1)} kN&middot;m</td>
        </tr>`).join("");
      $("monopoleCombinedCapacityCount").textContent = `${rows.length} rows · top to base`;
      $("monopoleCombinedCapacityStatus").hidden = true;
    } catch (error) {
      $("monopoleCombinedCapacitySummary").textContent = "Not evaluated";
      $("monopoleCombinedCapacityBody").innerHTML = "";
      $("monopoleCombinedCapacityCount").textContent = "0 rows · top to base";
      $("monopoleCombinedCapacityStatus").textContent = error instanceof Error ? error.message : "Compression and bending section capacities are unavailable.";
      $("monopoleCombinedCapacityStatus").className = "result-note is-warning";
      $("monopoleCombinedCapacityStatus").hidden = false;
    }
  }

  function renderFormulaSteps(assembly, mass) {
    const assemblyExpression = assembly.sections.length === 1
      ? `H = L<sub>1</sub> = ${fixed(assembly.height, 2)} m`
      : `H = &Sigma;L<sub>i</sub> - &Sigma;L<sub>o,i</sub> = ${fixed(assembly.height, 2)} m; for i &ge; 2, S<sub>i</sub> extends downward outside S<sub>i-1</sub>.`;
    const materialExpression = plateLookupActive()
      ? `AS/NZS 3678:2016 Table 8, Grade ${escapeHtml($("monopolePlateGrade").value)}; f<sub>y</sub> selected from each t<sub>nom</sub>.`
      : "Manual project f<sub>y</sub> for each profile segment.";
    const thicknessExpression = separateDesignThickness()
      ? "Capacity uses t<sub>d</sub>; material lookup and theoretical mass use t<sub>nom</sub>."
      : "t<sub>d</sub> = t<sub>nom</sub>; one entered thickness is used for capacity, material lookup and theoretical mass.";
    const selection = sectionSelection();
    const polygon = selection.form === "polygon";
    const propertyExpression = polygon
      ? `Exact concentric sharp-corner ${selection.sideCount}-sided polygon; Z<sub>min</sub> = I/c<sub>max</sub>.`
      : "D<sub>i</sub> = D - 2t<sub>d</sub>; A = &pi;(D<sup>2</sup> - D<sub>i</sub><sup>2</sup>)/4; I = &pi;(D<sup>4</sup> - D<sub>i</sub><sup>4</sup>)/64.";
    const bendRadiusExpression = polygon
      ? polygonBendRadiusRows(assembly.sections.map(item => item.section)).map(row =>
          `${escapeHtml(row.id)}: r<sub>i</sub> = ${fixed(number($("monopoleBendRadiusRatio").value), 2)} &times; ${fixed(row.nominalThickness, 2)} = ${fixed(row.insideBendRadius, 2)} mm; BR = min(${fixed(row.insideBendRadius, 2)}, 4 &times; ${fixed(row.designThickness, 2)}) = ${fixed(row.effectiveBendRadius, 2)} mm.`
        ).join(" ")
      : "";
    const resistanceExpression = polygon
      ? `P = 0; w = tan(&pi;/${selection.sideCount})(D<sub>o</sub> - 2t<sub>d</sub> - 2BR); &lambda; = (w/t<sub>d</sub>)&radic;(f<sub>y</sub>/E); M = F<sub>a</sub>I/c<sub>max</sub> = F<sub>a</sub>Z<sub>min</sub>; AS 4100 &phi; is not applied. ASCE/SEI 48-19 Cl. 5.2.3.2.1; ASCE/SEI 48-19 Cl. 5.2.5.`
      : "&lambda;<sub>s</sub> = (D/t<sub>d</sub>)(f<sub>y</sub>/250); &phi;M<sub>s</sub> = 0.90f<sub>y</sub>Z<sub>e</sub>; AS 4100 Cl. 5.2 and AS 4100 Table 5.2.";
    $("monopoleFormulaSteps").innerHTML = `
      <div><b>Assembly geometry</b><code>${assemblyExpression}; each taper uses its local segment coordinate.</code></div>
      <div><b>Stations</b><code>0.5 m spacing plus exact base, top, segment and overlap boundaries; the summary reports the governing base-station value and the table retains all evaluated states.</code></div>
      <div><b>Material</b><code>${materialExpression}</code></div>
      <div><b>Thickness basis</b><code>${thicknessExpression}</code></div>
      ${polygon ? `<div><b>Bend radius</b><code>${bendRadiusExpression}</code></div>` : ""}
      <div><b>Section properties</b><code>${propertyExpression}</code></div>
      <div><b>Section resistance</b><code>${resistanceExpression}</code></div>
      <div><b>Mass</b><code>m = &rho;&int;A(t<sub>nom</sub>, s)ds = ${fixed(mass.mass, 1)} kg; both shells are included in each overlap.</code></div>`;
  }

  function calculate() {
    syncMethodPresentation();
    try {
      const sections = readSchedule();
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
      const minimum = available.slice().sort((a, b) => a.value - b.value)[0];
      const base = available
        .filter(result => Math.abs(result.elevation) < 1e-7)
        .sort((a, b) => a.value - b.value)[0];
      const polygon = polygonActive();
      const rangeFailure = polygon ? polygonRangeFailure(stations) : null;
      const rangeMessage = polygonRangeMessage(rangeFailure);

      $("monopoleMomentSummary").innerHTML = unavailable || !base
        ? "Moment profile not evaluated"
        : polygon
          ? `Base M = ${fixed(base.value, 1)} kN&middot;m`
          : `Base &phi;M<sub>s</sub> = ${fixed(base.value, 1)} kN&middot;m`;
      $("monopoleMomentMinimum").innerHTML = unavailable || !minimum
        ? "5 m guides"
        : polygon
          ? `Minimum evaluated station: M = ${fixed(minimum.value, 1)} kN&middot;m at z = ${fixed(minimum.elevation, 1)} m &middot; 5 m guides`
          : `Minimum evaluated station: &phi;M<sub>s</sub> = ${fixed(minimum.value, 1)} kN&middot;m at z = ${fixed(minimum.elevation, 1)} m &middot; 5 m guides`;
      $("monopoleMass").textContent = fixed(mass.mass, 0);
      $("monopoleSelfWeight").textContent = fixed(mass.selfWeight, 1);
      $("monopoleCentreOfGravity").textContent = fixed(mass.centreOfGravity, 2);
      $("monopoleAssembledHeight").textContent = `${fixed(assembly.height, 2)} m`;
      $("monopoleSectionCount").textContent = String(assembly.sections.length);
      $("monopoleCountLabel").textContent = assembly.sections.length === 1 ? "segment" : "segments";
      $("monopoleMassBasis").textContent = assembly.sections.slice(1).some(item => item.section.overlap > 0)
        ? "includes overlap shells"
        : "physical shell geometry";
      $("monopoleInputStatus").textContent = unavailable && polygon
        ? `${rangeMessage}. Outside ASCE/SEI 48-19 Eqs. (5.2-6) to (5.2-11); M is not reported.`
        : "";
      $("monopoleInputStatus").className = unavailable && polygon
        ? "result-note is-warning"
        : "result-note";
      $("monopoleInputStatus").hidden = !(unavailable && polygon);

      renderStations(stations);
      renderCombinedCapacityStations(stations);
      renderOverlaps(assembly);
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

  $("monopoleAddSection").addEventListener("click", addSection);
  $("monopoleSectionForm").addEventListener("change", updateSectionFormState);
  $("monopoleBendRadiusRatio").addEventListener("input", calculate);
  $("monopoleMaterialMode").addEventListener("change", updateMaterialState);
  $("monopoleSeparateDesignThickness").addEventListener("change", updateDesignThicknessState);
  $("monopolePlateGrade").addEventListener("change", calculate);
  $("monopoleFabrication").addEventListener("change", calculate);
  window.addEventListener("resize", () => {
    if (!$("monopolePanel").hidden) calculate();
  });

  renderSchedule();
  updateDesignThicknessState();
  updateSectionFormState();
  calculate();
})();
