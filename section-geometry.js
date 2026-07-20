(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.SectionGeometry = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const positive = (value, name) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new RangeError(`${name} must be greater than zero.`);
    return number;
  };

  function finish(properties) {
    const { area, cx, cy, ix, iy, xMin, xMax, yMin, yMax } = properties;
    if (![area, cx, cy, ix, iy, xMin, xMax, yMin, yMax].every(Number.isFinite) || area <= 0 || ix <= 0 || iy <= 0) {
      throw new RangeError("Section geometry must produce positive finite properties.");
    }
    const xExtreme = Math.max(Math.abs(xMax - cx), Math.abs(cx - xMin));
    const yExtreme = Math.max(Math.abs(yMax - cy), Math.abs(cy - yMin));
    return Object.freeze({
      ...properties,
      zx: ix / yExtreme,
      zy: iy / xExtreme,
      rx: Math.sqrt(ix / area),
      ry: Math.sqrt(iy / area)
    });
  }

  function compositeRectangles(rectangles) {
    if (!Array.isArray(rectangles) || rectangles.length === 0) throw new RangeError("At least one rectangle is required.");
    const parts = rectangles.map((part, index) => ({
      width: positive(part.width, `Rectangle ${index + 1} width`),
      height: positive(part.height, `Rectangle ${index + 1} height`),
      cx: Number(part.cx),
      cy: Number(part.cy),
      sign: part.sign === -1 ? -1 : 1
    }));
    if (parts.some(part => !Number.isFinite(part.cx) || !Number.isFinite(part.cy))) {
      throw new RangeError("Rectangle centroids must be finite numbers.");
    }
    const area = parts.reduce((sum, part) => sum + part.sign * part.width * part.height, 0);
    if (!(area > 0)) throw new RangeError("Composite section area must be greater than zero.");
    const cx = parts.reduce((sum, part) => sum + part.sign * part.width * part.height * part.cx, 0) / area;
    const cy = parts.reduce((sum, part) => sum + part.sign * part.width * part.height * part.cy, 0) / area;
    const ix = parts.reduce((sum, part) => {
      const partArea = part.width * part.height;
      return sum + part.sign * (part.width * part.height ** 3 / 12 + partArea * (part.cy - cy) ** 2);
    }, 0);
    const iy = parts.reduce((sum, part) => {
      const partArea = part.width * part.height;
      return sum + part.sign * (part.height * part.width ** 3 / 12 + partArea * (part.cx - cx) ** 2);
    }, 0);
    const positiveParts = parts.filter(part => part.sign > 0);
    return finish({
      area,
      cx,
      cy,
      ix,
      iy,
      xMin: Math.min(...positiveParts.map(part => part.cx - part.width / 2)),
      xMax: Math.max(...positiveParts.map(part => part.cx + part.width / 2)),
      yMin: Math.min(...positiveParts.map(part => part.cy - part.height / 2)),
      yMax: Math.max(...positiveParts.map(part => part.cy + part.height / 2))
    });
  }

  function rectangle(width, height) {
    const b = positive(width, "Width");
    const h = positive(height, "Height");
    return finish({
      area: b * h,
      cx: b / 2,
      cy: h / 2,
      ix: b * h ** 3 / 12,
      iy: h * b ** 3 / 12,
      xMin: 0,
      xMax: b,
      yMin: 0,
      yMax: h
    });
  }

  function rectangularHollow(width, height, thickness) {
    const b = positive(width, "Outside width");
    const h = positive(height, "Outside height");
    const t = positive(thickness, "Wall thickness");
    if (2 * t >= Math.min(b, h)) throw new RangeError("Wall thickness must be less than half the smaller outside dimension.");
    return compositeRectangles([
      { width: b, height: h, cx: b / 2, cy: h / 2 },
      { width: b - 2 * t, height: h - 2 * t, cx: b / 2, cy: h / 2, sign: -1 }
    ]);
  }

  function circle(diameter) {
    const d = positive(diameter, "Diameter");
    const inertia = Math.PI * d ** 4 / 64;
    return finish({
      area: Math.PI * d ** 2 / 4,
      cx: d / 2,
      cy: d / 2,
      ix: inertia,
      iy: inertia,
      xMin: 0,
      xMax: d,
      yMin: 0,
      yMax: d
    });
  }

  function circularHollow(outsideDiameter, thickness) {
    const D = positive(outsideDiameter, "Outside diameter");
    const t = positive(thickness, "Wall thickness");
    if (2 * t >= D) throw new RangeError("Wall thickness must be less than half the outside diameter.");
    const inner = D - 2 * t;
    const inertia = Math.PI * (D ** 4 - inner ** 4) / 64;
    return finish({
      area: Math.PI * (D ** 2 - inner ** 2) / 4,
      cx: D / 2,
      cy: D / 2,
      ix: inertia,
      iy: inertia,
      xMin: 0,
      xMax: D,
      yMin: 0,
      yMax: D
    });
  }

  function symmetricI(depth, flangeWidth, webThickness, flangeThickness) {
    const d = positive(depth, "Overall depth");
    const bf = positive(flangeWidth, "Flange width");
    const tw = positive(webThickness, "Web thickness");
    const tf = positive(flangeThickness, "Flange thickness");
    if (2 * tf >= d) throw new RangeError("Twice the flange thickness must be less than the overall depth.");
    if (tw > bf) throw new RangeError("Web thickness must not exceed flange width.");
    return compositeRectangles([
      { width: bf, height: tf, cx: bf / 2, cy: tf / 2 },
      { width: tw, height: d - 2 * tf, cx: bf / 2, cy: d / 2 },
      { width: bf, height: tf, cx: bf / 2, cy: d - tf / 2 }
    ]);
  }

  function equalAngle(leg, thickness) {
    const b = positive(leg, "Leg length");
    const t = positive(thickness, "Thickness");
    if (t >= b) throw new RangeError("Thickness must be less than the leg length.");
    return compositeRectangles([
      { width: b, height: t, cx: b / 2, cy: t / 2 },
      { width: t, height: b, cx: t / 2, cy: b / 2 },
      { width: t, height: t, cx: t / 2, cy: t / 2, sign: -1 }
    ]);
  }

  function channel(depth, flangeWidth, webThickness, flangeThickness) {
    const d = positive(depth, "Overall depth");
    const bf = positive(flangeWidth, "Flange width");
    const tw = positive(webThickness, "Web thickness");
    const tf = positive(flangeThickness, "Flange thickness");
    if (2 * tf >= d) throw new RangeError("Twice the flange thickness must be less than the overall depth.");
    if (tw > bf) throw new RangeError("Web thickness must not exceed flange width.");
    return compositeRectangles([
      { width: tw, height: d - 2 * tf, cx: tw / 2, cy: d / 2 },
      { width: bf, height: tf, cx: bf / 2, cy: tf / 2 },
      { width: bf, height: tf, cx: bf / 2, cy: d - tf / 2 }
    ]);
  }

  return Object.freeze({
    rectangle,
    rectangularHollow,
    circle,
    circularHollow,
    symmetricI,
    equalAngle,
    channel,
    compositeRectangles
  });
});
