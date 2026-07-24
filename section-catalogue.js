(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.SectionCatalogue = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const BASIS = Object.freeze({
    catalogue: "Catalogue",
    derived: "Derived · catalogue data",
    custom: "Derived · entered geometry",
    unavailable: "Not available"
  });

  const SOURCES = Object.freeze({
    hotRolled: Object.freeze({
      publisher: "InfraBuild",
      document: "Hot Rolled Steel Products Catalogue 2019",
      status: "EA Tables 19 and 21 checked 2026-07-22; complete 46-row directory"
    }),
    chs: Object.freeze({
      publisher: "Orrcon Steel",
      document: "National Product Catalogue 2024, CHS tables pp. 10–12",
      status: "Nominal D/t and linear mass rows visually checked 2026-07-22"
    })
  });

  const available = (value, basis) => Object.freeze({ value: Number(value), basis });
  const unavailable = () => Object.freeze({ value: null, basis: "unavailable" });
  const finite = value => Number.isFinite(Number(value)) && Number(value) > 0;
  const numeric = value => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
  const property = (value, basis) => numeric(value) ? available(value, basis) : unavailable();
  const propertySet = values => Object.freeze({
    area: values.area || unavailable(),
    cx: values.cx || unavailable(),
    cy: values.cy || unavailable(),
    ix: values.ix || unavailable(),
    iy: values.iy || unavailable(),
    zx: values.zx || unavailable(),
    zxAlt: values.zxAlt || unavailable(),
    zy: values.zy || unavailable(),
    zyAlt: values.zyAlt || unavailable(),
    sx: values.sx || unavailable(),
    sy: values.sy || unavailable(),
    rx: values.rx || unavailable(),
    ry: values.ry || unavailable(),
    j: values.j || unavailable(),
    iw: values.iw || unavailable(),
    xo: values.xo || unavailable(),
    aw: values.aw || unavailable(),
    awx: values.awx || unavailable(),
    awy: values.awy || unavailable(),
    jp: values.jp || unavailable(),
    ixy: values.ixy || unavailable(),
    iu: values.iu || unavailable(),
    iv: values.iv || unavailable(),
    ru: values.ru || unavailable(),
    rv: values.rv || unavailable(),
    thetaU: values.thetaU || unavailable()
  });
  const dimension = (symbol, value) => finite(value) ? `${symbol} = ${Number(value).toLocaleString("en-AU", { maximumFractionDigits: 1 })} mm` : null;
  const joinDimensions = values => values.filter(Boolean).join("; ");
  const ratio = (label, value) => Object.freeze({ label, value: Number(value) });
  const ratioSet = values => Object.freeze(values.filter(item => Number.isFinite(item.value) && item.value > 0));

  function derivedPrincipal(ix, iy, area, ixy = 0) {
    if (![ix, iy, area, ixy].every(numeric) || !(ix > 0) || !(iy > 0) || !(area > 0)) return {};
    const average = (ix + iy) / 2;
    const radius = Math.hypot((ix - iy) / 2, ixy);
    const iu = average + radius;
    const iv = average - radius;
    const isotropic = radius <= Math.max(ix, iy) * 1e-12;
    let thetaU = isotropic ? null : Math.atan2(-2 * ixy, ix - iy) * 90 / Math.PI;
    if (thetaU !== null && thetaU <= -90) thetaU += 180;
    if (thetaU !== null && thetaU > 90) thetaU -= 180;
    if (thetaU !== null && Math.abs(thetaU) < 1e-12) thetaU = 0;
    return {
      jp: available(ix + iy, "derived"),
      ixy: available(ixy, "derived"),
      iu: available(iu, "derived"),
      iv: available(iv, "derived"),
      ru: available(Math.sqrt(iu / area), "derived"),
      rv: available(Math.sqrt(iv / area), "derived"),
      thetaU: property(thetaU, "derived")
    };
  }

  function symmetricHotRolledRecord(section, family) {
    const zx = finite(section.Zx) ? section.Zx * 1e3 : null;
    const principal = derivedPrincipal(section.ix, section.iy, section.area);
    return Object.freeze({
      id: `${family}-${section.designation}`,
      family,
      designation: section.designation,
      mass: section.mass,
      drawing: Object.freeze({ shape: "i", d: section.d, bf: section.bf, tw: section.tw, tf: section.tf }),
      dimensions: joinDimensions([
        dimension("d", section.d), dimension("bf", section.bf), dimension("tw", section.tw),
        dimension("tf", section.tf), dimension("d1", section.d1)
      ]),
      source: SOURCES.hotRolled,
      ratios: ratioSet([
        ratio("d₁/tw", section.d1 / section.tw),
        ratio("(bf−tw)/2tf", (section.bf - section.tw) / (2 * section.tf))
      ]),
      properties: propertySet({
        area: available(section.area, "catalogue"),
        cx: finite(section.bf) ? available(section.bf / 2, "derived") : unavailable(),
        cy: finite(section.d) ? available(section.d / 2, "derived") : unavailable(),
        ix: property(section.ix, "catalogue"),
        iy: property(section.iy, "catalogue"),
        zx: property(zx, "catalogue"),
        zy: property(section.zy, "catalogue"),
        sx: property(finite(section.Sx) ? section.Sx * 1e3 : null, "catalogue"),
        sy: property(section.sy, "catalogue"),
        rx: property(section.rx, "catalogue"),
        ry: property(section.ry, "catalogue"),
        j: property(section.j, "catalogue"),
        iw: property(section.iw, "catalogue"),
        aw: property(section.Aw, "derived"),
        ...principal
      }),
      derivation: "Ag, I, Z, S, r, J and Iw are published catalogue properties. Centroid coordinates, Aw, the polar second moment Ix + Iy and principal transforms follow nominal dimensions and double symmetry."
    });
  }

  function pfcRecord(section) {
    const principal = derivedPrincipal(section.ix, section.iy, section.area);
    return Object.freeze({
      id: `pfc-${section.designation}`,
      family: "pfc",
      designation: section.designation,
      mass: section.mass,
      drawing: Object.freeze({ shape: "channel", d: section.d, bf: section.bf, tw: section.tw, tf: section.tf }),
      dimensions: joinDimensions([
        dimension("d", section.d), dimension("bf", section.bf), dimension("tw", section.tw), dimension("tf", section.tf)
      ]),
      source: SOURCES.hotRolled,
      ratios: ratioSet([
        ratio("(d−2tf)/tw", (section.d - 2 * section.tf) / section.tw),
        ratio("(bf−tw)/tf", (section.bf - section.tw) / section.tf)
      ]),
      properties: propertySet({
        area: available(section.area, "catalogue"),
        cx: property(section.xl, "catalogue"),
        cy: finite(section.d) ? available(section.d / 2, "derived") : unavailable(),
        ix: available(section.ix, "catalogue"),
        iy: available(section.iy, "catalogue"),
        zx: property(section.zx, "catalogue"),
        zy: property(section.zyR, "catalogue"),
        zyAlt: property(section.zyL, "catalogue"),
        sx: property(section.sx, "catalogue"),
        sy: property(section.sy, "catalogue"),
        rx: available(section.rx, "catalogue"),
        ry: available(section.ry, "catalogue"),
        j: property(section.j, "catalogue"),
        iw: property(section.iw, "catalogue"),
        xo: property(section.xo, "catalogue"),
        aw: property(section.tw * (section.d - 2 * section.tf), "derived"),
        ...principal
      }),
      derivation: "Ag, XL, I, Z, S, r, J, Iw and XO are published catalogue properties. Aw, the polar second moment Ix + Iy and principal transforms follow nominal dimensions and horizontal symmetry; Zy,R and Zy,L retain the catalogue's directional values."
    });
  }

  function chsRecord(section, geometry) {
    const properties = geometry.circularHollow(section.D, section.t);
    return Object.freeze({
      id: `chs-${section.designation}`,
      family: "chs",
      designation: section.designation,
      mass: section.mass,
      drawing: Object.freeze({ shape: "chs", D: section.D, t: section.t }),
      dimensions: joinDimensions([dimension("D", section.D), dimension("t", section.t)]),
      source: SOURCES.chs,
      ratios: ratioSet([ratio("D/t", section.D / section.t)]),
      properties: propertySet({
        area: available(properties.area, "derived"),
        cx: available(properties.cx, "derived"),
        cy: available(properties.cy, "derived"),
        ix: available(properties.ix, "derived"),
        iy: available(properties.iy, "derived"),
        zx: available(properties.zx, "derived"),
        zy: available(properties.zy, "derived"),
        sx: property(properties.sx, "derived"),
        sy: property(properties.sy, "derived"),
        rx: available(properties.rx, "derived"),
        ry: available(properties.ry, "derived"),
        j: property(properties.j, "derived"),
        iw: property(properties.iw, "derived"),
        jp: property(properties.jp, "derived"),
        ixy: property(properties.ixy, "derived"),
        iu: property(properties.iu, "derived"),
        iv: property(properties.iv, "derived"),
        ru: property(properties.ru, "derived"),
        rv: property(properties.rv, "derived"),
        thetaU: property(properties.thetaU, "derived")
      }),
      derivation: "Mass is published in the Orrcon catalogue. Centroid, Ag, I, Z, S, r, J, Iw, the polar second moment Ix + Iy and principal values are calculated from catalogue nominal D/t using ideal circular geometry. Principal orientation is indeterminate because the section is isotropic."
    });
  }

  function angleRecord(section) {
    return Object.freeze({
      id: `ea-${section.designation}`,
      family: "ea",
      designation: section.designation,
      mass: section.mass,
      drawing: Object.freeze({ shape: "angle", b: section.b, t: section.t }),
      dimensions: `b1 = ${Number(section.b).toLocaleString("en-AU")} mm; nominal t = ${Number(section.t).toLocaleString("en-AU")} mm; actual t = ${Number(section.actualT).toLocaleString("en-AU", { maximumFractionDigits: 1 })} mm`,
      source: SOURCES.hotRolled,
      ratios: ratioSet([ratio("(b1-t)/t", section.legRatio)]),
      properties: propertySet({
        area: available(section.area, "catalogue"),
        cx: property(section.centroidNear, "catalogue"),
        cy: property(section.centroidNear, "catalogue"),
        ix: property(section.in, "catalogue"),
        iy: property(section.ip, "catalogue"),
        zx: property(section.znT, "catalogue"),
        zxAlt: property(section.znB, "catalogue"),
        zy: property(section.zpR, "catalogue"),
        zyAlt: property(section.zpL, "catalogue"),
        sx: property(section.sn, "catalogue"),
        sy: property(section.sp, "catalogue"),
        rx: property(section.rn, "catalogue"),
        ry: property(section.rp, "catalogue"),
        j: property(section.j, "catalogue"),
        jp: property(section.in + section.ip, "derived"),
        ixy: property(section.inp, "catalogue"),
        iu: property(section.principalIx, "catalogue"),
        iv: property(section.principalIy, "catalogue"),
        ru: property(section.principalRx, "catalogue"),
        rv: property(section.principalRy, "catalogue"),
        thetaU: property(45, "catalogue")
      }),
      auxiliary: Object.freeze({
        actualT: property(section.actualT, "catalogue"),
        rootRadius: property(section.rootRadius, "catalogue"),
        toeRadius: property(section.toeRadius, "catalogue"),
        centroidFar: property(section.centroidFar, "catalogue"),
        principalZx: property(section.principalZx, "catalogue"),
        principalZy3: property(section.principalZy3, "catalogue"),
        principalZy5: property(section.principalZy5, "catalogue"),
        principalSx: property(section.principalSx, "catalogue"),
        principalSy: property(section.principalSy, "catalogue")
      }),
      derivation: "Mass, actual thickness, radii, Ag, centroid distances, n-p and principal x-y properties are published in InfraBuild Tables 19 and 21. Directional Zn,T / Zn,B and Zp,R / Zp,L values retain the catalogue convention; In + Ip is the only derived result."
    });
  }

  function rodRecord(section) {
    const zx = finite(section.ix) && finite(section.diameter) ? section.ix / (section.diameter / 2) : null;
    return Object.freeze({
      id: `rod-${section.designation}`,
      family: "rod",
      designation: section.designation,
      mass: section.mass,
      drawing: Object.freeze({ shape: "circle", D: section.diameter }),
      dimensions: dimension("D", section.diameter),
      source: SOURCES.hotRolled,
      ratios: ratioSet([]),
      properties: propertySet({
        area: available(section.area, "derived"),
        cx: available(section.diameter / 2, "derived"),
        cy: available(section.diameter / 2, "derived"),
        ix: available(section.ix, "derived"),
        iy: available(section.iy, "derived"),
        zx: available(zx, "derived"),
        zy: available(zx, "derived"),
        sx: available(section.diameter ** 3 / 6, "derived"),
        sy: available(section.diameter ** 3 / 6, "derived"),
        rx: available(section.rx, "derived"),
        ry: available(section.ry, "derived"),
        j: available(2 * section.ix, "derived"),
        iw: available(0, "derived"),
        ...derivedPrincipal(section.ix, section.iy, section.area)
      }),
      derivation: "Mass and diameter are catalogue values. Centroid, Ag, I, Z, S, r, J, Iw, the polar second moment Ix + Iy and principal values are calculated from the nominal solid-circle diameter. Principal orientation is indeterminate."
    });
  }

  function family(key, label, sections) {
    return Object.freeze({ key, label, sections: Object.freeze(sections) });
  }

  function create(sources, geometry) {
    if (!sources || !geometry || typeof geometry.circularHollow !== "function") {
      throw new TypeError("Catalogue sources and the shared section geometry API are required.");
    }
    return Object.freeze([
      family("pfc", "Parallel Flange Channel (PFC)", sources.pfc.map(pfcRecord)),
      family("ub", "Universal Beam (UB)", sources.ub.map(section => symmetricHotRolledRecord(section, "ub"))),
      family("uc", "Universal Column (UC)", sources.uc.map(section => symmetricHotRolledRecord(section, "uc"))),
      family("chs", "Circular Hollow Section (CHS)", sources.chs.map(section => chsRecord(section, geometry))),
      family("ea", "Equal Angle (EA)", sources.ea.map(angleRecord)),
      family("rod", "Round Bar / Rod", sources.rod.map(rodRecord))
    ]);
  }

  return Object.freeze({ BASIS, SOURCES, create });
});
