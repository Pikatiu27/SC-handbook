(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GeoDetailPresentation = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const groups = [
    ['Classification', 'Classification'], ['Strength', 'Strength & field tests'],
    ['Physical / state', 'Physical properties & ground state'],
    ['Deformation / compressibility', 'Deformation & compressibility'],
    ['Hydraulic / durability', 'Groundwater & durability'],
    ['Foundation / interface', 'Foundation & interface'], ['Ground model', 'Ground model']
  ];
  const shorter = new Map([
    ['Natural weight needs project data. Submerged, hydrostatic: γ′ = γ_sat − γ_w; γ_w ≈ 9.81 kN/m³. Relation only; no value adopted.', 'Natural weight: project input. Hydrostatic γ′ = γ_sat − γ_w (γ_w ≈ 9.81 kN/m³); no value adopted.'],
    ['Retain raw results, equipment/procedure, energy and overburden corrections, depth and local correlation basis. Do not mix CPT sleeve friction f_s with pile shaft resistance.', 'Retain test method, depth, corrections and local correlation. CPT sleeve friction is not pile shaft resistance.'],
    ['Required where sensitive, fissured, slickensided or strain-softening cohesive soils may govern.', 'Check sensitive, fissured, slickensided or strain-softening soils.'],
    ['Laboratory or field values; do not infer natural density, moisture or index properties from the description.', 'Use laboratory or field data; do not infer from the ground description.'],
    ['Confirm the applicable test method, suction/moisture regime, profile and project classification standard.', 'Confirm test method, moisture/suction, profile and project classification.'],
    ['Assess only where relevant to the material, earthworks, wetting regime and proposed construction.', 'Assess where relevant to the ground, earthworks, wetting and construction.'],
    ['Include only where cyclic, vibration or earthquake response is relevant; strain level and confining stress govern.', 'For cyclic, vibration or seismic response; match strain and confining stress.'],
    ['Confirm observation dates, piezometric conditions and the adopted design level.', 'Confirm observation dates, piezometric conditions and design level.'],
    ['Use project testing where layering or drainage direction matters; not subgrade reaction.', 'Use project testing for layering and drainage direction; not subgrade reaction.'],
    ['Exposure, aggressivity and environmental testing depend on material and project requirements.', 'Select exposure and environmental tests for the material and project.'],
    ['Wall movement, drainage, groundwater, geometry, OCR and interface conditions are required.', 'Confirm wall movement, drainage, groundwater, geometry, OCR and interface.'],
    ['Assess only where required using the project ground model, groundwater, seismic demand and applicable standard.', 'Where required: use the ground model, groundwater, seismic demand and adopted standard.'],
    ['Confirm geometry, founding stratum, groundwater, bearing and settlement criteria; not the presumed reference above.', 'Confirm geometry, founding stratum, groundwater and settlement; not the presumed reference.'],
    ['Confirm structural tolerance, loading, geometry, compressibility and stress history.', 'Match structural tolerance, loads, geometry, compressibility and stress history.'],
    ['Depends on footing/slab size, stiffness, pressure and depth; not permeability or a soil constant.', 'Match footing/slab size, stiffness, pressure and depth; not permeability or a soil constant.'],
    ['Installation method, design basis, toe/socket condition and compression/uplift cases are required.', 'Confirm installation, design basis, toe/socket and compression/uplift.'],
    ['Ground profile, drilling and grouting method, bond stratum, design basis and verification testing are required.', 'Confirm profile, drilling/grouting, bond stratum, design basis and testing.'],
    ['Record the interpreted profile, investigation coverage, lenses, fill and uncertainty for the design element.', 'Record profile, investigation coverage, lenses, fill and uncertainty.'],
    ['State the parameter-selection basis, design situation, drainage condition and applicable project standard; do not adopt a handbook midpoint.', 'State selection basis, design situation, drainage and adopted standard; no handbook midpoint.']
  ]);
  function partition(rows) {
    const common = rows.filter(row => row.group === 'Main parameters');
    const supplements = groups.map(([key, title]) => ({ key, title, rows: rows.filter(row => row.group === key) })).filter(group => group.rows.length);
    const known = new Set(['Main parameters', ...groups.map(([key]) => key)]);
    for (const row of rows) {
      if (known.has(row.group)) continue;
      let group = supplements.find(group => group.key === row.group);
      if (!group) supplements.push(group = { key: row.group, title: row.group, rows: [] });
      group.rows.push(row);
    }
    return { common, supplements };
  }
  // Presentation only: the original condition and evidence remain in each row's disclosure.
  function condition(row, state = {}) {
    if (row.name === 'Allowable bearing pressure, q_a' && row.role !== 'project') {
      if (state.family === 'cohesive') return 'Natural ground · B > 1 m · 25 mm settlement basis. Check groundwater and footing geometry; not ultimate.';
      if (state.family === 'granular' && state.material === 'sand') return 'Natural sand · B > 1 m · 25 mm settlement · groundwater > B below base. Saturated/submerged: halve the source value (not applied). Not ultimate.';
    }
    return shorter.get(row.condition) || row.condition;
  }
  const anchorNote = 'Ultimate grout–rock bond only; not soil-anchor bond or pile socket resistance. Intact rock reference; reduce fractured/weathered values using project evidence. Match lithology separately from UCS class. Source factor of safety 2.0–2.5 is method-specific, not universal. Verify by project anchor testing. No allowable/design bond stress or anchor capacity is calculated.';
  return { partition, condition, anchorNote };
});
