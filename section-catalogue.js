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
      status: "Embedded rows checked 2026-07-02"
    }),
    chs: Object.freeze({
      publisher: "Orrcon Steel",
      document: "National Product Catalogue 2024, CHS tables pp. 10–12",
      status: "Nominal D/t source location visually checked"
    })
  });

  const available = (value, basis) => Object.freeze({ value: Number(value), basis });
  const unavailable = () => Object.freeze({ value: null, basis: "unavailable" });
  const finite = value => Number.isFinite(Number(value)) && Number(value) > 0;
  const dimension = (symbol, value) => finite(value) ? `${symbol} = ${Number(value).toLocaleString("en-AU", { maximumFractionDigits: 1 })} mm` : null;
  const joinDimensions = values => values.filter(Boolean).join("; ");

  function symmetricHotRolledRecord(section, family) {
    const zx = finite(section.Zx) ? section.Zx * 1e3 : null;
    const ix = zx && finite(section.d) ? zx * section.d / 2 : null;
    const rx = ix && finite(section.area) ? Math.sqrt(ix / section.area) : null;
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
      properties: Object.freeze({
        area: available(section.area, "catalogue"),
        cx: finite(section.bf) ? available(section.bf / 2, "derived") : unavailable(),
        cy: finite(section.d) ? available(section.d / 2, "derived") : unavailable(),
        ix: ix ? available(ix, "derived") : unavailable(),
        iy: unavailable(),
        zx: zx ? available(zx, "catalogue") : unavailable(),
        zy: unavailable(),
        rx: rx ? available(rx, "derived") : unavailable(),
        ry: unavailable()
      }),
      derivation: "The centroid follows section symmetry. Ix = Zx(d/2) and rx = sqrt(Ix/A). Minor-axis values are not embedded in the current checked row."
    });
  }

  function pfcRecord(section) {
    const zx = finite(section.ix) && finite(section.d) ? section.ix / (section.d / 2) : null;
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
      properties: Object.freeze({
        area: available(section.area, "catalogue"),
        cx: unavailable(),
        cy: finite(section.d) ? available(section.d / 2, "derived") : unavailable(),
        ix: available(section.ix, "catalogue"),
        iy: available(section.iy, "catalogue"),
        zx: zx ? available(zx, "derived") : unavailable(),
        zy: unavailable(),
        rx: available(section.rx, "catalogue"),
        ry: available(section.ry, "catalogue")
      }),
      derivation: "The vertical centroid follows section symmetry. Zx = Ix/(d/2). The horizontal centroid and Zy are not embedded in the current checked row."
    });
  }

  function chsRecord(section, geometry) {
    const properties = geometry.circularHollow(section.D, section.t);
    return Object.freeze({
      id: `chs-${section.designation}`,
      family: "chs",
      designation: section.designation,
      mass: null,
      drawing: Object.freeze({ shape: "chs", D: section.D, t: section.t }),
      dimensions: joinDimensions([dimension("D", section.D), dimension("t", section.t)]),
      source: SOURCES.chs,
      properties: Object.freeze({
        area: available(properties.area, "derived"),
        cx: available(properties.cx, "derived"),
        cy: available(properties.cy, "derived"),
        ix: available(properties.ix, "derived"),
        iy: available(properties.iy, "derived"),
        zx: available(properties.zx, "derived"),
        zy: available(properties.zy, "derived"),
        rx: available(properties.rx, "derived"),
        ry: available(properties.ry, "derived")
      }),
      derivation: "Centroid, A, I, Z and r are calculated from the catalogue nominal outside diameter and thickness using ideal circular geometry."
    });
  }

  function angleRecord(section) {
    return Object.freeze({
      id: `ea-${section.designation}`,
      family: "ea",
      designation: section.designation,
      mass: null,
      drawing: Object.freeze({ shape: "angle", b: section.b, t: section.t }),
      dimensions: joinDimensions([dimension("b", section.b), dimension("t", section.t)]),
      source: SOURCES.hotRolled,
      properties: Object.freeze({
        area: available(section.area, "catalogue"),
        cx: unavailable(), cy: unavailable(), ix: unavailable(), iy: unavailable(), zx: unavailable(), zy: unavailable(), rx: unavailable(), ry: unavailable()
      }),
      auxiliary: Object.freeze({ rMin: available(section.r, "catalogue") }),
      derivation: "The checked row contains gross area and a principal-axis minimum radius only. Centroidal x/y properties are not inferred from that value."
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
      properties: Object.freeze({
        area: available(section.area, "derived"),
        cx: available(section.diameter / 2, "derived"),
        cy: available(section.diameter / 2, "derived"),
        ix: available(section.ix, "derived"),
        iy: available(section.iy, "derived"),
        zx: available(zx, "derived"),
        zy: available(zx, "derived"),
        rx: available(section.rx, "derived"),
        ry: available(section.ry, "derived")
      }),
      derivation: "Mass and diameter are catalogue values. Centroid, A, I, Z and r are calculated from the nominal solid-circle diameter."
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
