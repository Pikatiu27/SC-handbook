(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.SCPlateTables = api;
})(globalThis, function () {
  'use strict';
  const density = 7850;
  const sourceURL = 'https://www.infrabuild.com/wp-content/uploads/sites/8/2020/01/IBSC_Know-Your-Steel_V11_April2025_PRINT_A5_NOCROPS.pdf';
  const sources = {
    'infrabuild-2025': { label: 'InfraBuild 2025', title: 'InfraBuild Know Your Steel — March 2025, Edition 11', url: sourceURL },
    'southern-2025': { label: 'Southern Steel 2025', title: 'Southern Steel Supplies — October 2025, Revision 7', url: 'https://www.southernsteel.com.au/wp-content/uploads/2025/07/Southern-Steel-Supplies-Plate-Products-Reference-Guide-Mild-Steel-Plate-250-Grade.pdf' }
  };
  const source = row => sources[row.sourceKey || 'infrabuild-2025'];
  const productType = row => row.product === 'TRU-SPEC' ? 'Coil plate' : row.product;
  const datasheets = {
    'xlerplate-250': { label: 'BlueScope 2019', title: 'XLERPLATE 250 — October 2019; grade reference, supplied brand not confirmed', url: 'https://cdn.dcs.bluescope.com.au/download/250-xlerplate-steel-datasheet' },
    'xlerplate-350': { label: 'BlueScope 2023', title: 'XLERPLATE 350 — November 2023; grade reference, supplied brand not confirmed', url: 'https://cdn.dcs.bluescope.com.au/download/350-xlerplate-steel-datasheet' },
    'tru-spec-ha250': { label: 'BlueScope 2024', title: 'TRU-SPEC coil plate HA250 — September 2024; cites AS/NZS 1594:2002, superseded by 2025', url: 'https://cdn.dcs.bluescope.com.au/download/ha250-tru-spec-coil-plate-steel-datasheet' },
    'tru-spec-ha350': { label: 'BlueScope 2024', title: 'TRU-SPEC coil plate HA350 — September 2024; cites AS/NZS 1594:2002, superseded by 2025', url: 'https://cdn.dcs.bluescope.com.au/download/ha350-tru-spec-coil-plate-steel-datasheet' }
  };
  function mass(row) {
    if (![row.t, row.width, row.length].every(value => typeof value === 'number' && Number.isFinite(value) && value > 0)) return null;
    const areaMass = density * row.t / 1000, plateMass = density * row.t * row.width * row.length / 1e9;
    return Number.isFinite(areaMass) && Number.isFinite(plateMass) ? { areaMass, plateMass } : null;
  }
  const numeric = (key, label, unit, derived = false) => ({ key, label, unit, numeric: true,
    ...(derived ? { format: value => formatMass(value, key === 'areaMass' ? 2 : 1) } : {}),
    value: row => ({ value: derived ? mass(row)?.[key] : row[key], basis: derived ? 'derived' : 'catalogue' }) });
  const definitions = [
    { key: 'product', label: 'Product', unit: '', value: productType },
    { key: 'grade', label: 'Grade', unit: '', value: row => row.grade },
    numeric('t', 't', 'mm'), numeric('width', 'Width', 'mm'), numeric('length', 'Length', 'mm'),
    numeric('areaMass', 'Theo. mass', 'kg/m²', true), numeric('plateMass', 'Theo. mass', 'kg/plate', true),
    { key: 'source', label: 'Source', unit: '', value: row => source(row).label },
    { key: 'datasheet', label: 'Grade sheet', unit: '', value: row => datasheets[row.datasheetKey]?.label || 'Not available' }
  ];
  const formatMass = (value, digits) => Number.isFinite(value) ? value.toLocaleString('en-AU', { minimumFractionDigits: digits, maximumFractionDigits: digits }) : 'Not available';
  const coilStandardURL = 'https://store.standards.org.au/product/as-nzs-1594-2025';
  return { density, sourceURL, sources, source, productType, datasheets, coilStandardURL, mass, definitions, formatMass };
});
