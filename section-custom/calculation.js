(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = { create: factory };
  else root.SCUnifiedSection = factory(root.SectionGeometry, root.BeamSectionCapacity);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (G, C) {
  'use strict';
  const fields = {
    ub: [['d','ID','d','overall depth'],['bf','IBf','b<sub>f</sub>','flange width'],['tw','ITw','t<sub>w</sub>','web thickness'],['tf','ITf','t<sub>f</sub>','flange thickness']],
    pfc: [['d','PfcD','d','overall depth'],['bf','PfcBf','b<sub>f</sub>','flange width'],['tw','PfcTw','t<sub>w</sub>','web thickness'],['tf','PfcTf','t<sub>f</sub>','flange thickness']],
    chs: [['D','ChsD','D','outside diameter'],['t','ChsT','t','wall thickness']],
    rhs: [['d','RhsD','d','outside depth'],['b','RhsB','b','outside width'],['t','RhsT','t','wall thickness']],
    shs: [['b','ShsB','b = d','outside size'],['t','ShsT','t','wall thickness']],
    ea: [['b','EaB','b','equal leg length'],['t','EaT','t','leg thickness']],
    rod: [['D','RodD','d','diameter']]
  };
  fields.uc = fields.ub;
  Object.values(fields).forEach(a => { a.forEach(Object.freeze); Object.freeze(a); });
  Object.freeze(fields);
  const positive = x => Number.isFinite(x) && x > 0;
  function memberGeometry(family, dimensions) {
    if (!fields[family]) throw new RangeError('Select a supported section family.');
    const v = Object.fromEntries(fields[family].map(([k]) => [k, Number(dimensions[k])]));
    if (!Object.values(v).every(positive)) throw new RangeError('Enter positive, finite dimensions in mm.');
    let p;
    if (family === 'ub' || family === 'uc') p = G.symmetricI(v.d,v.bf,v.tw,v.tf);
    if (family === 'pfc') p = G.channel(v.d,v.bf,v.tw,v.tf);
    if (family === 'chs') p = G.circularHollow(v.D,v.t);
    if (family === 'rhs' || family === 'shs') p = G.rectangularHollow(v.b,family === 'shs' ? v.b : v.d,v.t);
    if (family === 'ea') p = G.equalAngle(v.b,v.t);
    if (family === 'rod') p = G.circle(v.D);
    const principal = family === 'ea';
    const rx = principal ? p.ru : p.rx, ry = principal ? p.rv : p.ry;
    const ix = principal ? p.iu : p.ix, iy = principal ? p.iv : p.iy;
    if (![p.area,rx,ry,ix,iy].every(positive)) throw new RangeError('Dimensions do not give finite positive section properties.');
    return { ...v, ...(family === 'shs' ? { d:v.b } : {}), ...(family === 'rod' ? { diameter:v.D } : {}),
      area:p.area,rx,ry,r:Math.min(rx,ry),ix,iy,geometryProperties:p,
      principalAxisBasis:principal,customGeometry:true,designation:family.toUpperCase()+' custom dimensions' };
  }
  function genericBeam(v) {
    const positiveKeys = ['area','ix','iy'];
    const coreValid = positiveKeys.every(k => positive(v[k])) && positive(v.ix/v.area) && positive(v.iy/v.area);
    const materialValid = positive(v.fy) && positive(v.fu) && v.fu >= v.fy;
    const axisValid = ['x','y'].includes(v.axis);
    const ze = v.axis === 'x' ? v.zex : v.zey;
    const basisValid = v.confirmed === true;
    const result = { status:'For Review', rx:coreValid?Math.sqrt(v.ix/v.area):null, ry:coreValid?Math.sqrt(v.iy/v.area):null,
      moment:null,shear:null,momentReason:'Not evaluated',shearReason:'Not evaluated',axis:v.axis,ze };
    const commonReason = !coreValid ? 'Enter A_g, I_x and I_y > 0.' : !basisValid ? 'Confirm the property and material basis.' : '';
    if (commonReason) result.momentReason = result.shearReason = commonReason;
    else {
      if (!axisValid) result.momentReason = 'Select the verified bending axis.';
      else if (!materialValid) result.momentReason = 'Enter f_y > 0 and f_u ≥ f_y.';
      else if (!positive(ze)) result.momentReason = 'Enter the verified effective section modulus for the selected axis.';
      else { result.moment=C.sectionMoment(v.fy,ze); result.momentReason='AS 4100 Cl. 5.2.1; verified effective modulus.'; }
      if (v.shearModel === 'flat-web') {
        if (!positive(v.aw) || v.aw > v.area || !positive(v.fyw) || !positive(v.fu) || v.fu < v.fyw || !positive(v.alphaV) || v.alphaV > 1)
          result.shearReason='Enter 0 < A_w ≤ A_g, f_y,w > 0, f_u ≥ f_y,w and 0 < α_v ≤ 1.';
        else { result.shear=C.rolledWebShear(v.fyw,v.aw,v.alphaV); result.shearReason='AS 4100 Cl. 5.11.2, 5.11.4–5; verified uniform flat-web model.'; }
      } else if (v.shearModel === 'chs') {
        if (!materialValid || !positive(v.ae) || v.ae > v.area) result.shearReason='Enter f_y > 0, f_u ≥ f_y and 0 < A_e ≤ A_g.';
        else { result.shear=C.circularHollowShear(v.fy,v.ae); result.shearReason='AS 4100 Cl. 5.11.3–4; verified CHS effective shear area.'; }
      } else result.shearReason='Select a verified shear model, or leave shear not evaluated.';
    }
    for (const k of ['moment','shear']) if (result[k] !== null && !positive(result[k])) {result[k]=null;result[k+'Reason']='The entered values exceed the finite calculation range.';}
    return Object.freeze(result);
  }
  return Object.freeze({fields,memberGeometry,genericBeam});
});
