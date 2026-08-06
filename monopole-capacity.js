(function (root, factory) {
  "use strict";

  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MonopoleCapacity = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const PHI = 0.9;
  const STEEL_DENSITY = 7850;
  const GRAVITY = 9.80665;
  const ELASTIC_MODULUS = 200000;
  const EPSILON = 1e-9;
  const PLATE_THICKNESS_LIMITS = Object.freeze([8, 12, 20, 32, 50, 80, 150, 200]);
  const PLATE_YIELD_STRESS = Object.freeze({
    "200": Object.freeze([200, 200, null, null, null, null, null, null]),
    "250": Object.freeze([280, 260, 250, 250, 250, 240, 230, 220]),
    "300": Object.freeze([320, 310, 300, 280, 280, 270, 260, 250]),
    "350": Object.freeze([360, 360, 350, 340, 340, 340, 330, 320]),
    "400": Object.freeze([400, 400, 380, 360, 360, 360, null, null]),
    "450": Object.freeze([450, 450, 450, 420, 400, null, null, null]),
    WR350: Object.freeze([340, 340, 340, 340, 340, 340, null, null])
  });

  function positive(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) {
      throw new RangeError(`${name} must be greater than zero.`);
    }
    return number;
  }

  function nonNegative(value, name) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) {
      throw new RangeError(`${name} must be zero or greater.`);
    }
    return number;
  }

  function integer(value, name, minimum, maximum) {
    const number = Number(value);
    if (!Number.isInteger(number) || number < minimum || (maximum !== undefined && number > maximum)) {
      const upper = maximum === undefined ? "" : ` and no greater than ${maximum}`;
      throw new RangeError(`${name} must be a whole number of at least ${minimum}${upper}.`);
    }
    return number;
  }

  function plateYieldStress(grade, nominalThickness) {
    const gradeKey = String(grade).toUpperCase();
    const values = PLATE_YIELD_STRESS[gradeKey];
    if (!values) throw new RangeError("Plate grade is outside AS/NZS 3678:2016 Table 8.");
    const thickness = positive(nominalThickness, "Plate thickness");
    if (thickness < 4.5 || thickness > 200) {
      throw new RangeError("AS/NZS 3678 plate lookup requires 4.5 mm <= t <= 200 mm.");
    }
    const index = PLATE_THICKNESS_LIMITS.findIndex(limit => thickness <= limit + EPSILON);
    const yieldStress = values[index];
    if (!Number.isFinite(yieldStress)) {
      throw new RangeError(`AS/NZS 3678:2016 Table 8 does not specify Grade ${gradeKey} at t = ${thickness} mm.`);
    }
    return yieldStress;
  }

  function circularProperties(diameter, thickness) {
    const D = positive(diameter, "Outside diameter");
    const t = positive(thickness, "Design wall thickness");
    if (2 * t >= D) throw new RangeError("Design wall thickness must be less than half the outside diameter.");
    const Di = D - 2 * t;
    const area = Math.PI * (D ** 2 - Di ** 2) / 4;
    const inertia = Math.PI * (D ** 4 - Di ** 4) / 64;
    const elasticModulus = inertia / (D / 2);
    const plasticModulus = (D ** 3 - Di ** 3) / 6;
    return Object.freeze({
      form: "circular",
      outsideDimension: D,
      insideAcrossFlats: Di,
      area,
      inertia,
      elasticModulus,
      plasticModulus,
      extremeDistance: D / 2
    });
  }

  function polygonDimensions(sideCount, outsideDimension, dimensionBasis = "across-flats") {
    const n = integer(sideCount, "Side count", 4);
    const dimension = positive(outsideDimension, "Outside dimension");
    if (dimensionBasis !== "across-flats" && dimensionBasis !== "across-corners") {
      throw new RangeError("Polygon dimension basis must be across-flats or across-corners.");
    }
    const halfAngle = Math.PI / n;
    const outsideCircumradius = dimensionBasis === "across-flats"
      ? dimension / (2 * Math.cos(halfAngle))
      : dimension / 2;
    const outsideApothem = outsideCircumradius * Math.cos(halfAngle);
    return Object.freeze({
      sideCount: n,
      outsideAcrossFlats: 2 * outsideApothem,
      outsideAcrossCorners: 2 * outsideCircumradius,
      outsideApothem,
      outsideCircumradius
    });
  }

  function regularPolygonSolidProperties(sideCount, circumradius) {
    const n = integer(sideCount, "Side count", 4);
    const radius = positive(circumradius, "Polygon circumradius");
    const vertices = Array.from({ length: n }, (_, index) => {
      const angle = Math.PI / 2 + index * 2 * Math.PI / n;
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    });
    let twiceArea = 0;
    let ixNumerator = 0;
    let iyNumerator = 0;
    for (let index = 0; index < n; index += 1) {
      const current = vertices[index];
      const next = vertices[(index + 1) % n];
      const cross = current.x * next.y - next.x * current.y;
      twiceArea += cross;
      ixNumerator += cross * (current.y ** 2 + current.y * next.y + next.y ** 2);
      iyNumerator += cross * (current.x ** 2 + current.x * next.x + next.x ** 2);
    }
    const sign = Math.sign(twiceArea) || 1;
    return {
      area: Math.abs(twiceArea) / 2,
      ix: Math.abs(ixNumerator / 12),
      iy: Math.abs(iyNumerator / 12),
      orientation: sign
    };
  }

  function polygonProperties(sideCount, outsideDimension, thickness, dimensionBasis = "across-flats") {
    const dimensions = polygonDimensions(sideCount, outsideDimension, dimensionBasis);
    const t = positive(thickness, "Design wall thickness");
    if (t >= dimensions.outsideApothem) {
      throw new RangeError("Design wall thickness must be less than the outside apothem.");
    }
    const halfAngle = Math.PI / dimensions.sideCount;
    const insideApothem = dimensions.outsideApothem - t;
    const insideCircumradius = insideApothem / Math.cos(halfAngle);
    const outer = regularPolygonSolidProperties(dimensions.sideCount, dimensions.outsideCircumradius);
    const inner = regularPolygonSolidProperties(dimensions.sideCount, insideCircumradius);
    const area = outer.area - inner.area;
    const ix = outer.ix - inner.ix;
    const iy = outer.iy - inner.iy;
    const inertia = Math.min(ix, iy);
    const elasticModulus = inertia / dimensions.outsideCircumradius;
    return Object.freeze({
      form: "polygon",
      ...dimensions,
      insideAcrossFlats: 2 * insideApothem,
      insideAcrossCorners: 2 * insideCircumradius,
      area,
      ix,
      iy,
      inertia,
      elasticModulus,
      extremeDistance: dimensions.outsideCircumradius
    });
  }

  function circularMomentCapacity(diameter, thickness, yieldStress, fabricationCategory = "CF") {
    const properties = circularProperties(diameter, thickness);
    const fy = positive(yieldStress, "Yield stress");
    const category = String(fabricationCategory).toUpperCase();
    const compactLimit = ["LW", "HW"].includes(category) ? 42 : ["SR", "HR", "CF"].includes(category) ? 50 : NaN;
    if (!Number.isFinite(compactLimit)) {
      throw new RangeError("Fabrication category must be SR, HR, CF, LW or HW.");
    }
    const yieldLimit = 120;
    const slenderness = properties.outsideDimension / positive(thickness, "Design wall thickness") * fy / 250;
    const compactModulus = Math.min(properties.plasticModulus, 1.5 * properties.elasticModulus);
    let sectionClass;
    let effectiveModulus;
    let modulusBasis;
    if (slenderness <= compactLimit) {
      sectionClass = "Compact";
      effectiveModulus = compactModulus;
      modulusBasis = "compact";
    } else if (slenderness <= yieldLimit) {
      sectionClass = "Non-compact";
      effectiveModulus = properties.elasticModulus
        + (yieldLimit - slenderness) / (yieldLimit - compactLimit)
        * (compactModulus - properties.elasticModulus);
      modulusBasis = "linear interpolation";
    } else {
      sectionClass = "Slender";
      effectiveModulus = Math.min(
        properties.elasticModulus * Math.sqrt(yieldLimit / slenderness),
        properties.elasticModulus * (2 * yieldLimit / slenderness) ** 2
      );
      modulusBasis = "slender CHS";
    }
    return Object.freeze({
      method: "AS 4100:2020 Cl. 5.2",
      sourceStatus: "For Review",
      fabricationCategory: category,
      compactLimit,
      yieldLimit,
      slenderness,
      sectionClass,
      modulusBasis,
      effectiveModulus,
      firstYieldMoment: fy * properties.elasticModulus / 1e6,
      idealPlasticMoment: fy * properties.plasticModulus / 1e6,
      nominalMomentCapacity: fy * effectiveModulus / 1e6,
      designMomentCapacity: PHI * fy * effectiveModulus / 1e6,
      properties
    });
  }

  function circularCompressionSectionCapacity(diameter, thickness, yieldStress) {
    const properties = circularProperties(diameter, thickness);
    const D = properties.outsideDimension;
    const t = positive(thickness, "Design wall thickness");
    const fy = positive(yieldStress, "Yield stress");
    const yieldSlendernessLimit = 82;
    const slenderness = D / t * fy / 250;
    const effectiveDiameter = slenderness <= yieldSlendernessLimit
      ? D
      : Math.min(
        D,
        D * Math.sqrt(yieldSlendernessLimit / slenderness),
        D * (3 * yieldSlendernessLimit / slenderness) ** 2
      );
    const effectiveArea = properties.area - Math.PI * (D - effectiveDiameter) * t;
    if (!Number.isFinite(effectiveArea) || effectiveArea <= 0) {
      throw new RangeError("Circular effective area is outside the AS 4100 section method.");
    }
    const formFactor = Math.min(1, effectiveArea / properties.area);
    const nominalSectionCapacity = formFactor * properties.area * fy / 1000;
    return Object.freeze({
      method: "AS 4100:2020 Cl. 6.2",
      sourceStatus: "For Review",
      yieldSlendernessLimit,
      slenderness,
      effectiveDiameter,
      effectiveArea,
      formFactor,
      nominalSectionCapacity,
      designSectionCapacity: PHI * nominalSectionCapacity,
      properties
    });
  }

  function polygonStressLimit(sideCount, slenderness, yieldStress) {
    const n = integer(sideCount, "Side count", 4, 16);
    const lambda = positive(slenderness, "Polygon slenderness");
    const fy = positive(yieldStress, "Yield stress");
    const beta = 360 / n;
    let compactLimit;
    let upperLimit;
    let coefficient;
    let slope;
    if (beta >= 45) {
      compactLimit = 1.53;
      upperLimit = 2.06;
      coefficient = 1.42;
      slope = 0.194;
    } else if (beta >= 30) {
      compactLimit = 1.41;
      upperLimit = 2.20;
      coefficient = 1.45;
      slope = 0.220;
    } else if (beta >= 22.5) {
      compactLimit = 1.26;
      upperLimit = 2.42;
      coefficient = 1.42;
      slope = 0.233;
    } else {
      return Object.freeze({ checked: false, beta, reason: "Side count is outside the isolated polygon method." });
    }
    if (lambda > upperLimit) {
      return Object.freeze({
        checked: false,
        beta,
        compactLimit,
        upperLimit,
        reason: "Outside the prescribed local-buckling range."
      });
    }
    const permittedStress = lambda <= compactLimit ? fy : coefficient * fy * (1 - slope * lambda);
    return Object.freeze({
      checked: true,
      beta,
      compactLimit,
      upperLimit,
      coefficient,
      slope,
      localBucklingState: lambda <= compactLimit ? "Full yield stress" : "Reduced stress",
      permittedStress
    });
  }

  function polygonFlatWidth(sideCount, outsideDimension, thickness, insideBendRadius, dimensionBasis = "across-flats") {
    const properties = polygonProperties(sideCount, outsideDimension, thickness, dimensionBasis);
    const t = positive(thickness, "Design wall thickness");
    const actualRadius = positive(insideBendRadius, "Actual inside bend radius");
    const effectiveRadius = Math.min(actualRadius, 4 * t);
    const meanAcrossFlats = properties.outsideAcrossFlats - t;
    const clearFlatWidth = Math.tan(Math.PI / properties.sideCount) * (meanAcrossFlats - 2 * effectiveRadius);
    if (clearFlatWidth <= 0) {
      throw new RangeError("Inside bend radius leaves no positive polygon flat width.");
    }
    return Object.freeze({
      actualRadius,
      effectiveRadius,
      radiusCappedAtFourThicknesses: actualRadius > 4 * t,
      meanAcrossFlats,
      clearFlatWidth
    });
  }

  function polygonMomentCapacity(options) {
    const {
      sideCount,
      outsideDimension,
      thickness,
      yieldStress,
      dimensionBasis = "across-flats",
      insideBendRadius
    } = options || {};
    const properties = polygonProperties(sideCount, outsideDimension, thickness, dimensionBasis);
    const fy = positive(yieldStress, "Yield stress");
    const flat = polygonFlatWidth(sideCount, outsideDimension, thickness, insideBendRadius, dimensionBasis);
    const slenderness = flat.clearFlatWidth / positive(thickness, "Design wall thickness") * Math.sqrt(fy / ELASTIC_MODULUS);
    const stress = polygonStressLimit(properties.sideCount, slenderness, fy);
    const permittedMoment = stress.checked ? stress.permittedStress * properties.elasticModulus / 1e6 : null;
    return Object.freeze({
      method: "ASCE/SEI 48-19 Cl. 5.2.3.2.1 and 5.2.5",
      sourceStatus: "For Review",
      slenderness,
      clearFlatWidth: flat.clearFlatWidth,
      flatWidthBasis: "ASCE/SEI 48-19 Appendix B, Fig. B-7",
      actualInsideBendRadius: flat.actualRadius,
      effectiveBendRadius: flat.effectiveRadius,
      radiusCappedAtFourThicknesses: flat.radiusCappedAtFourThicknesses,
      stress,
      permittedMomentCapacity: permittedMoment,
      nominalMomentResistance: permittedMoment,
      properties
    });
  }

  function normaliseSection(section, index) {
    if (!section || typeof section !== "object") {
      throw new RangeError(`Section ${index + 1} data are required.`);
    }
    const form = section.form === undefined ? "circular" : String(section.form);
    if (!["circular", "polygon"].includes(form)) {
      throw new RangeError(`Section ${index + 1} form must be circular or polygon.`);
    }
    const length = positive(section.length, `Section ${index + 1} fabricated length`);
    const overlap = index === 0 ? 0 : nonNegative(section.overlap, `Section ${index + 1} overlap`);
    const bottomDimension = positive(section.bottomDimension, `Section ${index + 1} bottom dimension`);
    const topDimension = positive(section.topDimension, `Section ${index + 1} top dimension`);
    if (topDimension > bottomDimension) {
      throw new RangeError(`Section ${index + 1} top dimension must not exceed its bottom dimension.`);
    }
    const nominalThickness = positive(
      section.nominalThickness === undefined ? section.thickness : section.nominalThickness,
      `Section ${index + 1} nominal wall thickness`
    );
    const thickness = positive(section.thickness, `Section ${index + 1} design wall thickness`);
    if (thickness > nominalThickness + EPSILON) {
      throw new RangeError(`Section ${index + 1} design wall thickness must not exceed its nominal wall thickness.`);
    }
    const yieldStress = positive(section.yieldStress, `Section ${index + 1} yield stress`);
    const common = {
      id: String(section.id || `S${index + 1}`),
      form,
      length,
      overlap,
      bottomDimension,
      topDimension,
      nominalThickness,
      thickness,
      yieldStress,
      actualOverlap: section.actualOverlap === undefined || section.actualOverlap === null || section.actualOverlap === ""
        ? null
        : nonNegative(section.actualOverlap, `Section ${index + 1} actual installed overlap`),
      fabricationCategory: section.fabricationCategory || "LW",
      dimensionBasis: section.dimensionBasis || "across-flats"
    };
    if (form === "polygon") {
      common.sideCount = integer(section.sideCount, `Section ${index + 1} side count`, 4, 16);
      common.insideBendRadius = positive(section.insideBendRadius, `Section ${index + 1} actual inside bend radius`);
    }
    sectionPropertiesAt(common, 0);
    sectionPropertiesAt(common, length);
    return Object.freeze(common);
  }

  function assembleSections(sections) {
    if (!Array.isArray(sections) || sections.length === 0) throw new RangeError("At least one physical section is required.");
    const normalised = sections.map(normaliseSection);
    if (new Set(normalised.map(section => section.id)).size !== normalised.length) {
      throw new RangeError("Physical section identifiers must be unique.");
    }
    const assembled = [];
    normalised.forEach((section, index) => {
      if (index > 0) {
        const lower = assembled[index - 1];
        if (section.overlap >= section.length || section.overlap >= lower.section.length) {
          throw new RangeError(`Section ${index + 1} overlap must be shorter than both connected sections.`);
        }
      }
      const start = index === 0 ? 0 : assembled[index - 1].end - section.overlap;
      const end = start + section.length;
      assembled.push(Object.freeze({ section, index, start, end }));
    });
    return Object.freeze({
      height: assembled[assembled.length - 1].end,
      sections: Object.freeze(assembled)
    });
  }

  function overallProfileSections(profile, thicknessBands) {
    const height = positive(profile && profile.height, "Overall height");
    const bottomDimension = positive(profile && profile.bottomDimension, "Bottom outside dimension");
    const topDimension = positive(profile && profile.topDimension, "Top outside dimension");
    if (topDimension > bottomDimension + EPSILON) {
      throw new RangeError("Top outside dimension must not exceed bottom outside dimension.");
    }
    if (!Array.isArray(thicknessBands) || thicknessBands.length === 0) {
      throw new RangeError("At least one wall-thickness band is required.");
    }

    const dimensionAt = elevation => bottomDimension
      + (topDimension - bottomDimension) * elevation / height;
    let previousTop = 0;
    const sections = thicknessBands.map((band, index) => {
      const topElevation = positive(band.topElevation, `Thickness band ${index + 1} top elevation`);
      if (topElevation <= previousTop + EPSILON) {
        throw new RangeError("Wall-thickness band top elevations must increase from base to top.");
      }
      if (topElevation > height + EPSILON) {
        throw new RangeError("A wall-thickness band top elevation must not exceed the overall height.");
      }
      const section = Object.freeze({
        ...band,
        id: String(band.id || `T${index + 1}`),
        length: topElevation - previousTop,
        bottomDimension: dimensionAt(previousTop),
        topDimension: dimensionAt(topElevation),
        overlap: 0
      });
      previousTop = topElevation;
      return section;
    });
    if (Math.abs(previousTop - height) > EPSILON) {
      throw new RangeError("The final wall-thickness band must terminate at the overall height.");
    }
    return Object.freeze(sections);
  }

  function localDimension(section, localElevation) {
    const local = Number(localElevation);
    if (!Number.isFinite(local) || local < -EPSILON || local > section.length + EPSILON) {
      throw new RangeError("Local elevation must lie within the fabricated section.");
    }
    const ratio = Math.max(0, Math.min(1, local / section.length));
    return section.bottomDimension + ratio * (section.topDimension - section.bottomDimension);
  }

  function sectionPropertiesAtThickness(section, localElevation, thickness) {
    const dimension = localDimension(section, localElevation);
    return section.form === "polygon"
      ? polygonProperties(section.sideCount, dimension, thickness, section.dimensionBasis)
      : circularProperties(dimension, thickness);
  }

  function sectionPropertiesAt(section, localElevation) {
    return sectionPropertiesAtThickness(section, localElevation, section.thickness);
  }

  function sectionCapacityAt(section, localElevation) {
    const dimension = localDimension(section, localElevation);
    return section.form === "polygon"
      ? polygonMomentCapacity({
        sideCount: section.sideCount,
        outsideDimension: dimension,
        thickness: section.thickness,
        yieldStress: section.yieldStress,
        dimensionBasis: section.dimensionBasis,
        insideBendRadius: section.insideBendRadius
      })
      : circularMomentCapacity(
        dimension,
        section.thickness,
        section.yieldStress,
        section.fabricationCategory
      );
  }

  function sectionStatesAtElevation(assembly, elevation) {
    if (!assembly || !Array.isArray(assembly.sections)) throw new RangeError("Assembled sections are required.");
    const z = nonNegative(elevation, "Check elevation");
    if (z > assembly.height + EPSILON) throw new RangeError("Check elevation must not exceed the assembled height.");
    return Object.freeze(assembly.sections
      .filter(item => z >= item.start - EPSILON && z <= item.end + EPSILON)
      .map(item => {
        const localElevation = Math.max(0, Math.min(item.section.length, z - item.start));
        const sectionCapacity = sectionCapacityAt(item.section, localElevation);
        return Object.freeze({
          id: item.section.id,
          sectionIndex: item.index,
          sectionLength: item.section.length,
          localElevation,
          outsideDimension: localDimension(item.section, localElevation),
          nominalThickness: item.section.nominalThickness,
          thickness: item.section.thickness,
          yieldStress: item.section.yieldStress,
          designResistance: item.section.form === "polygon"
            ? sectionCapacity.permittedMomentCapacity
            : sectionCapacity.designMomentCapacity,
          capacity: sectionCapacity,
          section: item.section
        });
      }));
  }

  function buildStations(assembly, interval = 0.5) {
    const step = positive(interval, "Station interval");
    const elevations = new Set();
    const addElevation = elevation => elevations.add(Number(elevation.toFixed(9)));
    addElevation(0);
    addElevation(assembly.height);
    for (let elevation = 0; elevation <= assembly.height + EPSILON; elevation += step) {
      addElevation(Math.min(assembly.height, elevation));
    }
    assembly.sections.forEach(item => {
      addElevation(item.start);
      addElevation(item.end);
    });
    return Object.freeze([...elevations]
      .filter(elevation => elevation >= -EPSILON && elevation <= assembly.height + EPSILON)
      .sort((a, b) => b - a)
      .map(elevation => {
        const active = sectionStatesAtElevation(assembly, elevation);
        return Object.freeze({ elevation, active: Object.freeze(active) });
      }));
  }

  function sectionMassProperties(item, density = STEEL_DENSITY) {
    const rho = positive(density, "Steel density");
    const startProperties = sectionPropertiesAtThickness(item.section, 0, item.section.nominalThickness);
    const endProperties = sectionPropertiesAtThickness(item.section, item.section.length, item.section.nominalThickness);
    const areaStart = startProperties.area;
    const areaEnd = endProperties.area;
    const volume = item.section.length * 1000 * (areaStart + areaEnd) / 2 / 1e9;
    const mass = rho * volume;
    const localCentroid = item.section.length * (areaStart + 2 * areaEnd) / (3 * (areaStart + areaEnd));
    return Object.freeze({
      id: item.section.id,
      areaStart,
      areaEnd,
      volume,
      mass,
      localCentroid,
      installedCentroid: item.start + localCentroid
    });
  }

  function assemblyMassProperties(assembly, density = STEEL_DENSITY, gravity = GRAVITY) {
    const parts = assembly.sections.map(item => sectionMassProperties(item, density));
    const mass = parts.reduce((sum, part) => sum + part.mass, 0);
    const centreOfGravity = parts.reduce((sum, part) => sum + part.mass * part.installedCentroid, 0) / mass;
    return Object.freeze({
      mass,
      selfWeight: mass * positive(gravity, "Gravity") / 1000,
      centreOfGravity,
      sections: Object.freeze(parts)
    });
  }

  function slipOverlapScreen(lowerItem, upperItem, actualInstalledOverlap) {
    if (!lowerItem || !upperItem) throw new RangeError("Lower and upper sections are required.");
    const overlapLength = positive(upperItem.section.overlap, "Design overlap");
    const lowerOverlapStart = lowerItem.section.length - overlapLength;
    if (lowerOverlapStart < -EPSILON) {
      throw new RangeError("Design overlap must not exceed the lower section length.");
    }
    const lowerProperties = sectionPropertiesAt(lowerItem.section, Math.max(0, lowerOverlapStart));
    const upperProperties = sectionPropertiesAt(upperItem.section, 0);
    const lowerInscribedDiameter = lowerProperties.form === "polygon"
      ? lowerProperties.outsideAcrossFlats
      : lowerProperties.outsideDimension;
    const upperInscribedDiameter = upperProperties.form === "polygon"
      ? upperProperties.outsideAcrossFlats
      : upperProperties.outsideDimension;
    const inscribedDiameter = Math.max(lowerInscribedDiameter, upperInscribedDiameter);
    const designOverlap = overlapLength;
    const requiredDesignOverlap = 1.5 * inscribedDiameter / 1000;
    const minimumConstructedOverlap = 1.35 * inscribedDiameter / 1000;
    const actualInput = actualInstalledOverlap === undefined
      ? upperItem.section.actualOverlap
      : actualInstalledOverlap;
    const actual = actualInput === undefined || actualInput === null || actualInput === ""
      ? null
      : nonNegative(actualInput, "Actual installed overlap");
    return Object.freeze({
      inscribedDiameter,
      lowerOverlapStartInscribedDiameter: lowerInscribedDiameter,
      upperOverlapStartInscribedDiameter: upperInscribedDiameter,
      designOverlap,
      requiredDesignOverlap,
      minimumConstructedOverlap,
      designRatio: designOverlap / requiredDesignOverlap,
      designState: designOverlap + EPSILON >= requiredDesignOverlap
        ? "Meets prescribed design overlap"
        : "Below prescribed design overlap",
      actualInstalledOverlap: actual,
      constructedState: actual === null
        ? "Drawing value - installation not verified"
        : actual + EPSILON >= minimumConstructedOverlap
          ? "Meets minimum constructed overlap"
          : "Below minimum constructed overlap",
      jointCapacityState: "Not evaluated"
    });
  }

  return Object.freeze({
    PHI,
    STEEL_DENSITY,
    GRAVITY,
    ELASTIC_MODULUS,
    plateYieldStress,
    circularProperties,
    polygonDimensions,
    polygonProperties,
    polygonFlatWidth,
    circularMomentCapacity,
    circularCompressionSectionCapacity,
    polygonStressLimit,
    polygonMomentCapacity,
    overallProfileSections,
    assembleSections,
    localDimension,
    sectionPropertiesAt,
    sectionCapacityAt,
    sectionStatesAtElevation,
    buildStations,
    sectionMassProperties,
    assemblyMassProperties,
    slipOverlapScreen
  });
});
