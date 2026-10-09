(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.SCSectionTables = api;
})(globalThis, function () {
  'use strict';
  const dimension = (key, label) => ({ key, label, unit: 'mm', value: s => ({ value: s.drawing[key], basis: 'catalogue' }) });
  const property = (key, label, unit, scale = 1, auxiliary = false) => ({ key, label, unit, scale, value: s => (auxiliary ? s.auxiliary : s.properties)?.[key] });
  function columns(family) {
    let dims;
    if (['ub', 'uc', 'pfc'].includes(family)) dims = [dimension('d', 'd'), dimension('bf', 'b<sub>f</sub>'), dimension('tw', 't<sub>w</sub>'), dimension('tf', 't<sub>f</sub>')];
    else if (family === 'rhs') dims = [dimension('h', 'd'), dimension('b', 'b'), dimension('t', 't')];
    else if (family === 'shs') dims = [dimension('b', 'b = d'), dimension('t', 't')];
    else if (family === 'ea') dims = [dimension('b', 'b'), dimension('t', 't nominal'), property('actualT', 't actual', 'mm', 1, true)];
    else dims = [dimension('D', 'D'), ...(family === 'chs' ? [dimension('t', 't')] : [])];
    const base = [...dims, { key: 'mass', label: 'Mass', unit: 'kg/m', value: s => ({ value: s.mass, basis: 'catalogue' }) }, property('area', 'A<sub>g</sub>', 'mm²')];
    if (family === 'ea') return [...base,
      property('iu', 'I<sub>x</sub>', '10⁶ mm⁴', 1e6), property('iv', 'I<sub>y</sub>', '10⁶ mm⁴', 1e6),
      property('principalZx', 'Z<sub>x</sub>', '10³ mm³', 1e3, true), property('principalZy3', 'Z<sub>y,3</sub>', '10³ mm³', 1e3, true), property('principalZy5', 'Z<sub>y,5</sub>', '10³ mm³', 1e3, true)];
    if (['chs', 'shs', 'rod'].includes(family)) return [...base, property('ix', 'I<sub>x</sub> = I<sub>y</sub>', '10⁶ mm⁴', 1e6), property('zx', 'Z<sub>x</sub> = Z<sub>y</sub>', '10³ mm³', 1e3)];
    return [...base, property('ix', 'I<sub>x</sub>', '10⁶ mm⁴', 1e6), property('iy', 'I<sub>y</sub>', '10⁶ mm⁴', 1e6), property('zx', 'Z<sub>x</sub>', '10³ mm³', 1e3),
      property('zy', family === 'pfc' ? 'Z<sub>y,R</sub>' : 'Z<sub>y</sub>', '10³ mm³', 1e3), ...(family === 'pfc' ? [property('zyAlt', 'Z<sub>y,L</sub>', '10³ mm³', 1e3)] : [])];
  }
  function format(item, scale = 1) {
    if (!item || !Number.isFinite(item.value)) return 'Not available';
    const options = item.basis === 'derived' ? { maximumSignificantDigits: 4 } : { maximumFractionDigits: 9 };
    return (item.value / scale).toLocaleString('en-AU', options);
  }
  function rows(family, query, sort) {
    let result = family.sections.filter(s => keywordMatch(s.designation, query));
    if (sort && sort !== 'directory') {
      const [key, direction] = sort.split(':');
      const col = columns(family.key).find(c => c.key === key);
      if (col) result = result.map((s, index) => ({ s, index })).sort((a, b) => {
        const av = col.value(a.s)?.value, bv = col.value(b.s)?.value;
        if (!Number.isFinite(av)) return Number.isFinite(bv) ? 1 : a.index - b.index;
        if (!Number.isFinite(bv)) return -1;
        return (av - bv) * (direction === 'desc' ? -1 : 1) || a.index - b.index;
      }).map(r => r.s);
    }
    return result;
  }
  function keywordMatch(text, query) {
    const words = String(query).toLowerCase().match(/[a-z]+|\d+(?:\.\d+)?/g) || [];
    const tokens = String(text).toLowerCase().match(/[a-z]+|\d+(?:\.\d+)?/g) || [];
    return words.filter(w => w !== 'x').every(w => tokens.some(token => /^\d/.test(w) ? token.startsWith(w) : token.includes(w)));
  }
  function specs(family) {
    return [{ key: 'section', label: 'Section', unit: '', value: s => s.designation },
      ...columns(family).map(c => ({ ...c, numeric: true })),
      { key: 'source', label: 'Source', unit: '', value: s => `${s.source.publisher} · ${s.source.document.match(/\b\d{4}\b/)?.[0] || 'Catalogue'}` }];
  }
  function engine(family) {
    const filters = new Map(), definitions = specs(family);
    let sort = null;
    const spec = key => definitions.find(c => c.key === key);
    const number = (row, key) => { const col = spec(key), p = col?.value(row); return col?.numeric && Number.isFinite(p?.value) ? p.value / (col.scale || 1) : null; };
    const text = (row, key) => { const col = spec(key); return col?.numeric ? format(col.value(row), col.scale) : String(col?.value(row) ?? 'Not available'); };
    function apply(sourceRows, except) {
      const result = sourceRows.filter(row => [...filters].every(([key, filter]) => {
        if (key === except) return true;
        if (filter.query && !keywordMatch(text(row, key), filter.query)) return false;
        if (filter.values && !filter.values.includes(text(row, key))) return false;
        const n = number(row, key);
        if (filter.min !== undefined && (n === null || n < filter.min)) return false;
        if (filter.max !== undefined && (n === null || n > filter.max)) return false;
        return true;
      }));
      if (sort) result.sort((a, b) => {
        let difference;
        if (spec(sort.key)?.numeric) {
          const av = number(a, sort.key), bv = number(b, sort.key);
          if (av === null || bv === null) return av === bv ? 0 : av === null ? 1 : -1;
          difference = av - bv;
        } else difference = text(a, sort.key).localeCompare(text(b, sort.key), 'en-AU', { numeric: true });
        return difference * (sort.direction === 'desc' ? -1 : 1);
      });
      return result;
    }
    function set(key, f) {
      if (!spec(key)) throw Error('Unknown column');
      if ([f.min, f.max].some(n => n !== undefined && (!Number.isFinite(n) || n < 0)) || f.min !== undefined && f.max !== undefined && f.min > f.max) throw Error('Invalid range');
      const filter = { ...f, query: String(f.query || '').trim(), values: f.values == null ? null : [...f.values] };
      if (filter.query || filter.values !== null || filter.min !== undefined || filter.max !== undefined) filters.set(key, filter); else filters.delete(key);
    }
    return { filters, definitions, apply, number, text, set, get sort() { return sort; },
      order(key, direction) { if (direction && (!spec(key) || !['asc', 'desc'].includes(direction))) throw Error('Invalid sort'); sort = direction ? { key, direction } : null; },
      clear(key) { filters.delete(key); if (sort?.key === key) sort = null; }, reset() { filters.clear(); sort = null; } };
  }
  return { columns, format, rows, keywordMatch, specs, engine };
});
