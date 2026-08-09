(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ScrewDemand = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function finite(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number)) throw new RangeError(`${name} must be finite.`);
    return number;
  }

  function validateLayout({ columns, rows, lengthX, lengthY }) {
    const checked = {
      columns: finite(columns, "Pile columns"),
      rows: finite(rows, "Pile rows"),
      lengthX: finite(lengthX, "Group X span"),
      lengthY: finite(lengthY, "Group Y span")
    };
    if (!Number.isInteger(checked.columns) || checked.columns < 2 || checked.columns > 8) {
      throw new RangeError("Pile columns must be a whole number from 2 to 8.");
    }
    if (!Number.isInteger(checked.rows) || checked.rows < 2 || checked.rows > 8) {
      throw new RangeError("Pile rows must be a whole number from 2 to 8.");
    }
    if (checked.lengthX < 0.1 || checked.lengthY < 0.1) {
      throw new RangeError("Group spans must each be at least 0.1 m.");
    }
    return Object.freeze(checked);
  }

  function rectangularCoordinates({ layout = "rect-perimeter", columns, rows, lengthX, lengthY }) {
    const checked = validateLayout({ columns, rows, lengthX, lengthY });
    if (!["rect-perimeter", "rect-grid"].includes(layout)) {
      throw new RangeError("Rectangular layout must be perimeter rows or a full grid.");
    }
    const xValues = Array.from(
      { length: checked.columns },
      (_, index) => -checked.lengthX / 2 + index * checked.lengthX / (checked.columns - 1)
    );
    const yValues = Array.from(
      { length: checked.rows },
      (_, index) => -checked.lengthY / 2 + index * checked.lengthY / (checked.rows - 1)
    );
    const coordinates = layout === "rect-grid"
      ? yValues.slice().reverse().flatMap(y => xValues.map(x => ({ x, y })))
      : [
          ...xValues.map(x => ({ x, y: checked.lengthY / 2 })),
          ...yValues.slice(1, -1).reverse().map(y => ({ x: checked.lengthX / 2, y })),
          ...xValues.slice().reverse().map(x => ({ x, y: -checked.lengthY / 2 })),
          ...yValues.slice(1, -1).map(y => ({ x: -checked.lengthX / 2, y }))
        ];
    return Object.freeze(coordinates.map((point, index) => Object.freeze({ id: index + 1, ...point })));
  }

  function distribute({ coordinates, axial = 0, shearX = 0, shearY = 0, momentX = 0, momentY = 0, torsion = 0 }) {
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      throw new RangeError("At least one pile coordinate is required.");
    }
    const points = coordinates.map((point, index) => Object.freeze({
      ...point,
      id: point.id ?? index + 1,
      x: finite(point.x, `Pile ${index + 1} x coordinate`),
      y: finite(point.y, `Pile ${index + 1} y coordinate`)
    }));
    const actions = {
      axial: finite(axial, "Axial action"),
      shearX: finite(shearX, "X shear action"),
      shearY: finite(shearY, "Y shear action"),
      momentX: finite(momentX, "X moment action"),
      momentY: finite(momentY, "Y moment action"),
      torsion: finite(torsion, "Torsional action")
    };
    const tolerance = 1e-9;
    const sumX = points.reduce((sum, point) => sum + point.x, 0);
    const sumY = points.reduce((sum, point) => sum + point.y, 0);
    if (Math.abs(sumX) > tolerance || Math.abs(sumY) > tolerance) {
      throw new RangeError("Pile coordinates must be measured from the group centroid.");
    }

    const sumX2 = points.reduce((sum, point) => sum + point.x ** 2, 0);
    const sumY2 = points.reduce((sum, point) => sum + point.y ** 2, 0);
    const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumR2 = sumX2 + sumY2;
    if (Math.abs(sumXY) > tolerance) throw new RangeError("Pile coordinate axes must be uncoupled for the simplified distribution.");
    if (Math.abs(actions.momentX) > tolerance && sumY2 <= tolerance) throw new RangeError("The pile layout cannot resist the entered X moment.");
    if (Math.abs(actions.momentY) > tolerance && sumX2 <= tolerance) throw new RangeError("The pile layout cannot resist the entered Y moment.");
    if (Math.abs(actions.torsion) > tolerance && sumR2 <= tolerance) throw new RangeError("The pile layout cannot resist the entered torsion.");

    const count = points.length;
    const directShearX = actions.shearX / count;
    const directShearY = actions.shearY / count;
    const reactions = points.map(point => {
      const pileAxial = actions.axial / count
        + (sumY2 > tolerance ? actions.momentX * point.y / sumY2 : 0)
        + (sumX2 > tolerance ? actions.momentY * point.x / sumX2 : 0);
      const lateralX = directShearX + (sumR2 > tolerance ? -actions.torsion * point.y / sumR2 : 0);
      const lateralY = directShearY + (sumR2 > tolerance ? actions.torsion * point.x / sumR2 : 0);
      return Object.freeze({ ...point, axial: pileAxial, lateralX, lateralY, lateral: Math.hypot(lateralX, lateralY) });
    });

    const maxCompression = Math.max(0, ...reactions.map(item => item.axial));
    const maxUplift = Math.max(0, ...reactions.map(item => -item.axial));
    const maxLateral = Math.max(0, ...reactions.map(item => item.lateral));
    const maxCompressionPile = maxCompression > 0
      ? reactions.reduce((current, item) => item.axial > current.axial ? item : current)
      : null;
    const maxUpliftPile = maxUplift > 0
      ? reactions.reduce((current, item) => -item.axial > -current.axial ? item : current)
      : null;
    const maxLateralPile = maxLateral > 0
      ? reactions.reduce((current, item) => item.lateral > current.lateral ? item : current)
      : null;

    return Object.freeze({
      count,
      sums: Object.freeze({ sumX, sumY, sumX2, sumY2, sumXY, sumR2 }),
      reactions: Object.freeze(reactions),
      maxCompression,
      maxUplift,
      maxLateral,
      maxCompressionPile,
      maxUpliftPile,
      maxLateralPile
    });
  }

  return Object.freeze({ distribute, validateLayout, rectangularCoordinates });
});
