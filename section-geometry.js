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
    const cRight = xMax - cx;
    const cLeft = cx - xMin;
    const cTop = yMax - cy;
    const cBottom = cy - yMin;
    const xExtreme = Math.max(cRight, cLeft);
    const yExtreme = Math.max(cTop, cBottom);
    const ixy = Number.isFinite(properties.ixy) ? properties.ixy : 0;
    const average = (ix + iy) / 2;
    const principalRadius = Math.hypot((ix - iy) / 2, ixy);
    const iu = average + principalRadius;
    const iv = average - principalRadius;
    const isotropic = principalRadius <= Math.max(ix, iy) * 1e-12;
    let thetaU = isotropic ? null : Math.atan2(-2 * ixy, ix - iy) * 90 / Math.PI;
    if (thetaU !== null && thetaU <= -90) thetaU += 180;
    if (thetaU !== null && thetaU > 90) thetaU -= 180;
    if (thetaU !== null && Math.abs(thetaU) < 1e-12) thetaU = 0;
    return Object.freeze({
      ...properties,
      ixy,
      cTop,
      cBottom,
      cRight,
      cLeft,
      zxTop: ix / cTop,
      zxBottom: ix / cBottom,
      zyRight: iy / cRight,
      zyLeft: iy / cLeft,
      zx: ix / yExtreme,
      zy: iy / xExtreme,
      rx: Math.sqrt(ix / area),
      ry: Math.sqrt(iy / area),
      jp: ix + iy,
      iu,
      iv,
      ru: Math.sqrt(iu / area),
      rv: Math.sqrt(iv / area),
      thetaU
    });
  }

  function supplement(properties, values) {
    return Object.freeze({ ...properties, ...values });
  }

  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

  function plasticAxis(rectangles, coordinate) {
    const isX = coordinate === "x";
    const start = rectangle => isX ? rectangle.x : rectangle.y;
    const length = rectangle => isX ? rectangle.width : rectangle.height;
    const transverse = rectangle => isX ? rectangle.height : rectangle.width;
    const totalArea = rectangles.reduce((sum, rectangle) => sum + rectangle.width * rectangle.height, 0);
    const targetArea = totalArea / 2;
    let lower = Math.min(...rectangles.map(start));
    let upper = Math.max(...rectangles.map(rectangle => start(rectangle) + length(rectangle)));

    for (let iteration = 0; iteration < 80; iteration += 1) {
      const trial = (lower + upper) / 2;
      const areaBelow = rectangles.reduce((sum, rectangle) => {
        const coveredLength = clamp(trial - start(rectangle), 0, length(rectangle));
        return sum + coveredLength * transverse(rectangle);
      }, 0);
      if (areaBelow < targetArea) lower = trial;
      else upper = trial;
    }
    return (lower + upper) / 2;
  }

  function absoluteFirstMoment(rectangle, coordinate, axisLocation) {
    const isX = coordinate === "x";
    const start = isX ? rectangle.x : rectangle.y;
    const length = isX ? rectangle.width : rectangle.height;
    const transverse = isX ? rectangle.height : rectangle.width;
    const end = start + length;
    if (axisLocation <= start || axisLocation >= end) {
      return transverse * length * Math.abs((start + end) / 2 - axisLocation);
    }
    return transverse * ((axisLocation - start) ** 2 + (end - axisLocation) ** 2) / 2;
  }

  function plasticProperties(rectangles) {
    const parts = rectangles.map((rectangle, index) => ({
      x: Number(rectangle.x),
      y: Number(rectangle.y),
      width: positive(rectangle.width, `Plastic rectangle ${index + 1} width`),
      height: positive(rectangle.height, `Plastic rectangle ${index + 1} height`)
    }));
    if (parts.some(part => !Number.isFinite(part.x) || !Number.isFinite(part.y))) {
      throw new RangeError("Plastic rectangle origins must be finite numbers.");
    }
    const plasticCx = plasticAxis(parts, "x");
    const plasticCy = plasticAxis(parts, "y");
    return {
      plasticCx,
      plasticCy,
      sx: parts.reduce((sum, part) => sum + absoluteFirstMoment(part, "y", plasticCy), 0),
      sy: parts.reduce((sum, part) => sum + absoluteFirstMoment(part, "x", plasticCx), 0)
    };
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
    const ixy = parts.reduce((sum, part) => {
      const partArea = part.width * part.height;
      return sum + part.sign * partArea * (part.cx - cx) * (part.cy - cy);
    }, 0);
    const positiveParts = parts.filter(part => part.sign > 0);
    return finish({
      area,
      cx,
      cy,
      ix,
      iy,
      ixy,
      xMin: Math.min(...positiveParts.map(part => part.cx - part.width / 2)),
      xMax: Math.max(...positiveParts.map(part => part.cx + part.width / 2)),
      yMin: Math.min(...positiveParts.map(part => part.cy - part.height / 2)),
      yMax: Math.max(...positiveParts.map(part => part.cy + part.height / 2))
    });
  }

  function rectangle(width, height) {
    const b = positive(width, "Width");
    const h = positive(height, "Height");
    return supplement(finish({
      area: b * h,
      cx: b / 2,
      cy: h / 2,
      ix: b * h ** 3 / 12,
      iy: h * b ** 3 / 12,
      xMin: 0,
      xMax: b,
      yMin: 0,
      yMax: h
    }), {
      sx: b * h ** 2 / 4,
      sy: h * b ** 2 / 4
    });
  }

  function rectangularHollow(width, height, thickness) {
    const b = positive(width, "Outside width");
    const h = positive(height, "Outside height");
    const t = positive(thickness, "Wall thickness");
    if (2 * t >= Math.min(b, h)) throw new RangeError("Wall thickness must be less than half the smaller outside dimension.");
    const properties = compositeRectangles([
      { width: b, height: h, cx: b / 2, cy: h / 2 },
      { width: b - 2 * t, height: h - 2 * t, cx: b / 2, cy: h / 2, sign: -1 }
    ]);
    const bi = b - 2 * t;
    const hi = h - 2 * t;
    return supplement(properties, {
      sx: (b * h ** 2 - bi * hi ** 2) / 4,
      sy: (h * b ** 2 - hi * bi ** 2) / 4,
      awx: 2 * t * bi,
      awy: 2 * t * hi,
      aw: 2 * t * hi
    });
  }

  function circle(diameter) {
    const d = positive(diameter, "Diameter");
    const inertia = Math.PI * d ** 4 / 64;
    return supplement(finish({
      area: Math.PI * d ** 2 / 4,
      cx: d / 2,
      cy: d / 2,
      ix: inertia,
      iy: inertia,
      xMin: 0,
      xMax: d,
      yMin: 0,
      yMax: d
    }), {
      sx: d ** 3 / 6,
      sy: d ** 3 / 6,
      j: 2 * inertia,
      iw: 0
    });
  }

  function circularHollow(outsideDiameter, thickness) {
    const D = positive(outsideDiameter, "Outside diameter");
    const t = positive(thickness, "Wall thickness");
    if (2 * t >= D) throw new RangeError("Wall thickness must be less than half the outside diameter.");
    const inner = D - 2 * t;
    const inertia = Math.PI * (D ** 4 - inner ** 4) / 64;
    return supplement(finish({
      area: Math.PI * (D ** 2 - inner ** 2) / 4,
      cx: D / 2,
      cy: D / 2,
      ix: inertia,
      iy: inertia,
      xMin: 0,
      xMax: D,
      yMin: 0,
      yMax: D
    }), {
      sx: (D ** 3 - inner ** 3) / 6,
      sy: (D ** 3 - inner ** 3) / 6,
      j: 2 * inertia,
      iw: 0
    });
  }

  function symmetricI(depth, flangeWidth, webThickness, flangeThickness) {
    const d = positive(depth, "Overall depth");
    const bf = positive(flangeWidth, "Flange width");
    const tw = positive(webThickness, "Web thickness");
    const tf = positive(flangeThickness, "Flange thickness");
    if (2 * tf >= d) throw new RangeError("Twice the flange thickness must be less than the overall depth.");
    if (tw > bf) throw new RangeError("Web thickness must not exceed flange width.");
    const properties = compositeRectangles([
      { width: bf, height: tf, cx: bf / 2, cy: tf / 2 },
      { width: tw, height: d - 2 * tf, cx: bf / 2, cy: d / 2 },
      { width: bf, height: tf, cx: bf / 2, cy: d - tf / 2 }
    ]);
    return supplement(properties, {
      sx: bf * tf * (d - tf) + tw * (d - 2 * tf) ** 2 / 4,
      sy: tf * bf ** 2 / 2 + (d - 2 * tf) * tw ** 2 / 4,
      aw: tw * (d - 2 * tf)
    });
  }

  function equalAngle(leg, thickness) {
    const b = positive(leg, "Leg length");
    const t = positive(thickness, "Thickness");
    if (t >= b) throw new RangeError("Thickness must be less than the leg length.");
    const rectangles = [
      { x: 0, y: 0, width: b, height: t },
      { x: 0, y: t, width: t, height: b - t }
    ];
    const properties = compositeRectangles(rectangles.map(rectangle => ({
      width: rectangle.width,
      height: rectangle.height,
      cx: rectangle.x + rectangle.width / 2,
      cy: rectangle.y + rectangle.height / 2
    })));
    return supplement(properties, plasticProperties(rectangles));
  }

  function channel(depth, flangeWidth, webThickness, flangeThickness) {
    const d = positive(depth, "Overall depth");
    const bf = positive(flangeWidth, "Flange width");
    const tw = positive(webThickness, "Web thickness");
    const tf = positive(flangeThickness, "Flange thickness");
    if (2 * tf >= d) throw new RangeError("Twice the flange thickness must be less than the overall depth.");
    if (tw > bf) throw new RangeError("Web thickness must not exceed flange width.");
    const rectangles = [
      { x: 0, y: tf, width: tw, height: d - 2 * tf },
      { x: 0, y: 0, width: bf, height: tf },
      { x: 0, y: d - tf, width: bf, height: tf }
    ];
    const properties = compositeRectangles(rectangles.map(rectangle => ({
      width: rectangle.width,
      height: rectangle.height,
      cx: rectangle.x + rectangle.width / 2,
      cy: rectangle.y + rectangle.height / 2
    })));
    return supplement(properties, {
      ...plasticProperties(rectangles),
      aw: tw * (d - 2 * tf)
    });
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
