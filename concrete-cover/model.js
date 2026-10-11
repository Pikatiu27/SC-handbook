(function (root, factory) {
  const model = factory(); if (typeof module === 'object' && module.exports) module.exports = model; else root.SCConcreteCoverModel = model;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const number = key => row => ({ value: row[key], basis: 'normative' });
  const format = value => Number.isFinite(value) ? String(value) : 'Not tabulated';
  const concreteClassLabel = value => ({ 'Project specification': 'Project spec.', 'Special required': 'Special', 'Project assessment': 'Assessment' }[value] || value);
  function columns(data) {
    const procedure = key => data.procedures.find(p => p.key === key);
    return [
      { key: 'exposure', label: 'AS 3600 exposure', value: r => r.exposure },
      { key: 'procedure', label: 'Surface / procedure', value: r => procedure(r.procedure).label },
      { key: 'strength', label: "f′<sub>c</sub>", unit: 'MPa', numeric: true, value: number('strength'), format: n => n === 50 ? '≥50' : format(n) },
      { key: 'cover', label: 'Corrosion cover', unit: 'mm', numeric: true, value: number('cover'), format },
      { key: 'curing', label: 'Initial curing', unit: 'days', numeric: true, value: number('curing'), format },
      { key: 'concreteClass', label: 'Concrete class', value: r => concreteClassLabel(r.concreteClass) },
      { key: 'source', label: 'Source', value: () => 'AS 3600:2018' }
    ];
  }
  function exposureColumns() {
    return [
      { key: 'exposure', label: 'AS 3600 exposure', value: r => r.exposure },
      { key: 'environment', label: 'Common environments', value: r => r.environment },
      { key: 'condition', label: 'Key conditions', value: r => r.condition },
      { key: 'source', label: 'Source', value: () => 'AS 3600:2018' }
    ];
  }
  return { columns, exposureColumns, format, concreteClassLabel };
});
