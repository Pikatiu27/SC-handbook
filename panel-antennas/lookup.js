(function(root) {
  'use strict';
  const normalise = value => String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  function filter(records, options = {}) {
    const terms = String(options.query || '').trim().split(/\s+/).filter(Boolean).map(normalise);
    const frequency = options.frequency === '' || options.frequency == null ? null : Number(options.frequency);
    if (frequency !== null && (!Number.isFinite(frequency) || frequency <= 0)) return [];
    return records.filter(row => {
      const evidence = row.deployments || [];
      const searchable = normalise([row.model, row.brand, ...row.aliases, row.bandSummary, ...row.frequenciesMHz.flat(), ...evidence.map(e => [e.operator,e.site,e.technology].join(' '))].join(' '));
      return terms.every(term => searchable.includes(term)) &&
        (!options.brand || row.brand === options.brand || row.aliases.includes(options.brand)) &&
        (!options.kind || row.kind === options.kind) &&
        (!options.status || (options.status === 'conflict'
          ? row.status === 'conflict' || Object.values(row.fieldIssues || {}).some(Boolean)
          : row.status === options.status)) &&
        (!(options.operator || options.evidence || options.generation) || evidence.some(e =>
          (!options.operator || e.operator === options.operator) &&
          (!options.evidence || options.evidence === 'any' || e.type === options.evidence) &&
          (!options.generation || (e.generations || []).includes(options.generation)))) &&
        (frequency === null || row.frequenciesMHz.some(([lo, hi]) => lo <= frequency && frequency <= hi));
    });
  }
  function sort(records, key = 'model') {
    const value = row => key === 'height' ? row.dimensionsMm?.[0] : key === 'mass' ? row.massKg : row.model;
    return [...records].sort((a,b) => {
      if (key === 'documents' && Boolean(a.specUrl) !== Boolean(b.specUrl)) return a.specUrl ? -1 : 1;
      const av = value(a), bv = value(b);
      if (av == null && bv != null) return 1;
      if (av != null && bv == null) return -1;
      return (typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''))) || a.model.localeCompare(b.model);
    });
  }
  const bands = row => row.frequenciesMHz.length ? row.frequenciesMHz.map(([a,b]) => `${a}-${b} MHz`).join(' / ') : row.bandSummary;
  const positive = value => typeof value === 'number' && Number.isFinite(value) && value > 0;
  const windDirections = ['front','side','rear'];
  function windCoefficients(row) {
    const result = {published:[],derived:[],equivalent:[],unavailable:{},status:'Unavailable',assumptions:null};
    const issues = row.fieldIssues || {};
    const windConflict = issues.wind || issues.windN || issues.windSpeed || issues.windSpeedKmh;
    const dimensionConflict = issues.dimensions || issues.dimensionsMm;
    const exactSheet = row.status === 'datasheet' && row.specUrl && row.checked;
    const sourceKnown = evidence => evidence?.verified === true && evidence.sourceUrl && evidence.checked
      && evidence.locators?.area && evidence.locators?.coefficient;
    for (const direction of windDirections) {
      const published = row.windCoefficientEvidence?.published?.[direction];
      if (exactSheet && !issues.cd && !issues[`cd.${direction}`] && !issues.referenceArea && !issues[`referenceArea.${direction}`] && sourceKnown(published)
        && positive(published.value) && positive(published.referenceAreaM2) && published.areaDescription) {
        result.published.push({direction,value:published.value,referenceAreaM2:published.referenceAreaM2,
          areaDescription:published.areaDescription,sourceUrl:published.sourceUrl,checked:published.checked,locators:published.locators});
      }
      const basis = row.windCoefficientEvidence?.drag?.[direction];
      const force = row.windN?.[direction];
      const directionalConflict = windConflict || issues[`wind.${direction}`] || issues[`windN.${direction}`];
      // A checked product PDF alone does not establish drag/density/reference-area definitions.
      if (exactSheet && !directionalConflict && !dimensionConflict && !issues.cd && !issues[`cd.${direction}`]
        && !issues.airDensity && !issues.referenceArea && !issues[`referenceArea.${direction}`]
        && basis?.verified === true && basis.forceType === 'drag' && basis.sourceUrl && basis.checked
        && basis.locators?.force && basis.locators?.density && basis.locators?.area && basis.areaDescription
        && positive(force) && positive(row.windSpeedKmh) && positive(basis.airDensityKgM3) && positive(basis.referenceAreaM2)) {
        const q = 0.5*basis.airDensityKgM3*(row.windSpeedKmh/3.6)**2;
        const value = force/(q*basis.referenceAreaM2);
        if (positive(value)) result.derived.push({direction,value,forceN:force,referenceSpeedKmh:row.windSpeedKmh,
          airDensityKgM3:basis.airDensityKgM3,referenceAreaM2:basis.referenceAreaM2,areaDescription:basis.areaDescription,
          sourceUrl:basis.sourceUrl,checked:basis.checked,locators:basis.locators});
      }
      if (result.published.some(entry=>entry.direction===direction) || result.derived.some(entry=>entry.direction===direction)) continue;
      let reason;
      if (!exactSheet || !row.locators?.wind || !row.locators?.dimensions) reason = 'Exact wind and dimension source pages are not verified.';
      else if (directionalConflict || dimensionConflict) reason = 'The required wind or dimension field has a source conflict.';
      else if (row.lengthMm != null || row.diameterMm != null || ![null,undefined,'Panel','Multi-port panel','Beam-through panel'].includes(row.formFactor)) reason = 'Reference geometry is not a supported nominal panel envelope.';
      else if (!positive(force)) reason = `No positive published ${direction} wind force.`;
      else if (!positive(row.windSpeedKmh)) reason = 'Published wind-force reference speed is unavailable.';
      const [h,w,d] = row.dimensionsMm || [];
      const width = direction === 'side' ? d : w;
      if (!reason && (!positive(h) || !positive(width))) reason = 'Required nominal dimensions are unavailable.';
      if (!reason) {
        const area = h*width/1e6, density = 1.225;
        const q = 0.5*density*(row.windSpeedKmh/3.6)**2;
        const value = force/(q*area);
        if (positive(area) && positive(q) && positive(value)) {
          result.equivalent.push({direction,value,forceN:force,referenceSpeedKmh:row.windSpeedKmh,
            airDensityKgM3:density,referenceAreaM2:area,areaDescription:direction==='side'?'Nominal H × D envelope':'Nominal H × W envelope'});
        } else reason = 'Inputs do not produce a finite positive coefficient.';
      }
      if (reason) result.unavailable[direction] = reason;
    }
    result.unavailable.max = 'Maximum-force direction and matching reference area are not established; no maximum coefficient is inferred.';
    result.status = result.published.length || result.derived.length ? 'Documented Cd basis' : result.equivalent.length ? 'Equivalent estimate only' : 'Unavailable';
    if (result.equivalent.length) result.assumptions = 'Assumed ρ = 1.225 kg/m³; nominal envelope H × W for front/rear and H × D for side. Manufacturer test density, drag versus resultant force, pole/bracket contribution and true projected area are not confirmed. C = F / (0.5 × ρ × V² × A), V in m/s. This is not manufacturer Cd, EPA/EFPA or a site-design coefficient.';
    return result;
  }
  function csv(records) {
    const headings = ['Ref_ID','Brand','Model','Type','Document_status','H_mm','W_mm','D_mm','Antenna_mass_kg','Mass_basis','Kit_mass_kg','Kit_mass_basis','Mounting_kit','Mounting_pipe_min_mm','Mounting_pipe_max_mm','EPA_front_m2','EPA_side_m2','RF_ports','Connector_basis','Frequency','Wind_front_N','Wind_side_N','Wind_rear_N','Wind_max_N','Wind_reference_kmh','Survival_speed_kmh','Revision','Checked','Spec_PDF_URL','Unreviewed_public_PDF_URL','Mechanical_PDF_page','Wind_PDF_page','Source_URL','Source_SHA256','Field_locators','Notes','Australian_operator_evidence','Length_mm','Diameter_mm','Size_description','Published_survival_speed','Field_issues','Form_factor','Product_page_URL','Published_EFPA_m2'];
    headings.push('Published_Cd','Published_Cd_basis','Derived_Cd','Derived_Cd_basis','Equivalent_force_coefficient_front','Equivalent_force_coefficient_side','Equivalent_force_coefficient_rear','Coefficient_assumed_density_kg_m3','Coefficient_reference_front_m2','Coefficient_reference_side_m2','Coefficient_reference_rear_m2','Coefficient_reference_speed_kmh','Coefficient_status','Coefficient_assumptions','Coefficient_unavailable_reasons');
    const quote = value => '"' + String(value ?? '').replace(/^[=+@]/, "'$&").replaceAll('"', '""') + '"';
    const values = records.map(r => [r.id,r.brand,r.model,r.kind,r.status,...(r.dimensionsMm || [null,null,null]),r.massKg,r.massBasis,r.kitMassKg,r.kitMassBasis,r.mountingKit,...(r.mountingPipeMm || [null,null]),r.epaM2?.front,r.epaM2?.side,r.ports,r.connector,bands(r),r.windN?.front,r.windN?.side,r.windN?.rear,r.windN?.max,r.windSpeedKmh,r.survivalSpeedKmh,r.revision,r.checked,r.specUrl,r.publicSpecUrl,r.mechanicalPage,r.windPage,r.sourceUrl,r.sourceHash,Object.entries(r.locators).map(([k,v])=>`${k}: ${v}`).join('; '),r.notes,(r.deployments||[]).map(e=>`${e.operator} | ${e.type} | ${e.date} | ${e.site} | ${e.technology} | ${e.locator} | ${e.url}`).join('; '),r.lengthMm,r.diameterMm,r.sizeDescription,r.survivalSpeedText,Object.entries(r.fieldIssues||{}).map(([k,v])=>k+': '+v).join('; '),r.formFactor,r.productUrl,r.equivalentFlatPlateAreaM2]);
    records.forEach((record,index)=>{
      const c = windCoefficients(record);
      const equivalents = Object.fromEntries(c.equivalent.map(entry=>[entry.direction,entry]));
      const json = entries => entries.length ? JSON.stringify(entries) : '';
      values[index].push(json(c.published.map(({direction,value})=>({direction,value}))),json(c.published),json(c.derived.map(({direction,value})=>({direction,value}))),json(c.derived),
        ...windDirections.map(direction=>equivalents[direction]?.value),c.equivalent.length?1.225:null,
        ...windDirections.map(direction=>equivalents[direction]?.referenceAreaM2),c.equivalent.length?record.windSpeedKmh:null,c.status,c.assumptions,JSON.stringify(c.unavailable));
    });
    return '\uFEFF' + [headings,...values].map(row => row.map(quote).join(',')).join('\r\n') + '\r\n';
  }
  const api = {normalise,filter,sort,bands,csv,windCoefficients};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.panelAntennaLookup = api;
})(globalThis);
