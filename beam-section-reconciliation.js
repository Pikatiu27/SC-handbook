(function (root, factory) {
  "use strict";

  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BeamSectionReconciliation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const LIMITS = Object.freeze({
    outstandUniformHR: Object.freeze({ plastic: 9, yield: 16 }),
    outstandGradientHR: Object.freeze({ plastic: 9, yield: 25 }),
    internalUniformHR: Object.freeze({ plastic: 30, yield: 45 }),
    internalUniformCF: Object.freeze({ plastic: 30, yield: 40 }),
    internalGradient: Object.freeze({ plastic: 82, yield: 115 }),
    chsBendingCF: Object.freeze({ plastic: 50, yield: 120 }),
    chsCompression: 82
  });

  const positive = value => Number.isFinite(Number(value)) && Number(value) > 0;
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const close = (actual, expected, relative = 0.01, absolute = 0.11) =>
    positive(actual) && positive(expected)
    && Math.abs(Number(actual) - Number(expected)) <= Math.max(absolute, Math.abs(Number(expected)) * relative);

  function compactZe(Z, S) {
    return Math.min(Number(S), 1.5 * Number(Z));
  }

  function flatSlenderness(width, thickness, yieldStress) {
    return Number(width) / Number(thickness) * Math.sqrt(Number(yieldStress) / 250);
  }

  function chsSlenderness(diameter, thickness, yieldStress) {
    return Number(diameter) / Number(thickness) * Number(yieldStress) / 250;
  }

  function governingElement(elements) {
    return elements
      .map(element => ({ ...element, ratio: element.lambda / element.limits.yield }))
      .sort((a, b) => b.ratio - a.ratio)[0];
  }

  function sectionClass(lambda, limits) {
    if (lambda <= limits.plastic) return "C";
    if (lambda <= limits.yield) return "N";
    return "S";
  }

  function flatZe(Z, S, element) {
    const elastic = Number(Z);
    const compact = compactZe(Z, S);
    const lambda = element.lambda;
    const limits = element.limits;
    const compactness = sectionClass(lambda, limits);
    if (compactness === "C") return compact;
    if (compactness === "N") {
      return elastic + (limits.yield - lambda) / (limits.yield - limits.plastic) * (compact - elastic);
    }
    const exponent = element.slenderExponent || 1;
    return elastic * (limits.yield / lambda) ** exponent;
  }

  function chsZe(Z, S, lambda) {
    const limits = LIMITS.chsBendingCF;
    const compactness = sectionClass(lambda, limits);
    if (compactness === "C") return compactZe(Z, S);
    if (compactness === "N") {
      return Number(Z) + (limits.yield - lambda) / (limits.yield - limits.plastic)
        * (compactZe(Z, S) - Number(Z));
    }
    return Math.min(
      Number(Z) * Math.sqrt(limits.yield / lambda),
      Number(Z) * (2 * limits.yield / lambda) ** 2
    );
  }

  function classFromPublishedZe(Z, S, Ze) {
    const elastic = Number(Z);
    const compact = compactZe(Z, S);
    if (close(Ze, compact)) return "C";
    if (Number(Ze) >= elastic - Math.max(0.11, elastic * 0.006)) return "N";
    return "S";
  }

  function flatCompressionKf(area, elements) {
    let effectiveArea = Number(area);
    elements.forEach(element => {
      const effectiveWidth = Math.min(element.width, element.width * element.yieldLimit / element.lambda);
      effectiveArea -= element.count * (element.width - effectiveWidth) * element.thickness;
    });
    return clamp(effectiveArea / Number(area), 0, 1);
  }

  function chsCompressionKf(lambda) {
    const limit = LIMITS.chsCompression;
    return clamp(Math.min(Math.sqrt(limit / lambda), (3 * limit / lambda) ** 2), 0, 1);
  }

  function result(details) {
    const classOk = details.classMethod === "published-ze-interval"
      ? ["C", "N", "S"].includes(details.expectedClass)
      : details.expectedClass === details.publishedClass;
    const zeOk = ["published-ze-interval", "published-effective-section"].includes(details.zeMethod)
      ? positive(details.publishedZe)
        && Number(details.publishedZe) <= compactZe(details.Z, details.S) + Math.max(0.11, compactZe(details.Z, details.S) * 0.01)
      : close(details.publishedZe, details.expectedZe);
    const kfOk = details.kfMethod === "published-effective-area"
      ? positive(details.publishedKf) && Number(details.publishedKf) <= 1
      : !positive(details.publishedKf)
        || Math.abs(Number(details.publishedKf) - Number(details.expectedKf)) <= 0.004;
    return Object.freeze({
      ...details,
      classOk,
      zeOk,
      kfOk,
      status: classOk && zeOk && kfOk ? "reconciled" : "unresolved"
    });
  }

  function reconcileISection(section, grade, direction) {
    const axis = section.axes?.[direction];
    const capacity = grade.directions?.[direction];
    if (!axis || !capacity || !positive(section.bf) || !positive(section.tw) || !positive(section.tf)) {
      return Object.freeze({ status: "unresolved", reason: "Required I-section geometry or direction data is missing." });
    }
    const fy = grade.fy;
    const flangeWidth = (section.bf - section.tw) / 2;
    const elements = direction === "x"
      ? [
          { name: "flange outstand", lambda: flatSlenderness(flangeWidth, section.tf, fy), limits: LIMITS.outstandUniformHR },
          { name: "web in bending", lambda: flatSlenderness(section.d1, section.tw, fy), limits: LIMITS.internalGradient }
        ]
      : [
          { name: "flange outstand", lambda: flatSlenderness(flangeWidth, section.tf, fy), limits: LIMITS.outstandGradientHR, slenderExponent: 2 }
        ];
    const governing = governingElement(elements);
    const geometryKf = flatCompressionKf(section.area, [
      { width: flangeWidth, thickness: section.tf, count: 4, lambda: flatSlenderness(flangeWidth, section.tf, fy), yieldLimit: 16 },
      { width: section.d1, thickness: section.tw, count: 1, lambda: flatSlenderness(section.d1, section.tw, fy), yieldLimit: 45 }
    ]);
    return result({
      family: section.family,
      direction,
      basis: "Independent HR plate-element check",
      classMethod: "independent-geometry",
      zeMethod: "independent-geometry",
      governing,
      Z: axis.Z,
      S: axis.S,
      expectedClass: sectionClass(governing.lambda, governing.limits),
      publishedClass: capacity.compactness,
      expectedZe: flatZe(axis.Z, axis.S, governing),
      publishedZe: capacity.Ze,
      kfMethod: "published-effective-area",
      expectedKf: grade.kf,
      geometryKf,
      publishedKf: grade.kf
    });
  }

  function reconcilePfc(section, grade, direction) {
    const axis = section.axes?.[direction];
    const capacity = grade.directions?.[direction];
    if (!axis || !capacity) return Object.freeze({ status: "unresolved", reason: "Required PFC direction data is missing." });
    const fy = grade.fy;
    let elements;
    if (direction === "x") {
      elements = [
        { name: "flange outstand", lambda: flatSlenderness(section.bf - section.tw, section.tf, fy), limits: LIMITS.outstandUniformHR },
        { name: "web in bending", lambda: flatSlenderness(section.d1, section.tw, fy), limits: LIMITS.internalGradient }
      ];
    } else {
      const inferredClass = classFromPublishedZe(axis.Z, axis.S, capacity.Ze);
      const expectedKf = flatCompressionKf(section.area, [
        { width: section.bf - section.tw, thickness: section.tf, count: 2, lambda: flatSlenderness(section.bf - section.tw, section.tf, fy), yieldLimit: 16 },
        { width: section.d1, thickness: section.tw, count: 1, lambda: flatSlenderness(section.d1, section.tw, fy), yieldLimit: 45 }
      ]);
      return result({
        family: "pfc",
        direction,
        basis: "Published asymmetric load-case Ze checked against AS 4100:2020 Ze interval",
        classMethod: "published-ze-interval",
        zeMethod: "published-ze-interval",
        governing: null,
        Z: axis.Z,
        S: axis.S,
        expectedClass: inferredClass,
        publishedClass: inferredClass,
        expectedZe: capacity.Ze,
        publishedZe: capacity.Ze,
        expectedKf,
        publishedKf: grade.kf
      });
    }
    const governing = governingElement(elements);
    const expectedKf = flatCompressionKf(section.area, [
      { width: section.bf - section.tw, thickness: section.tf, count: 2, lambda: flatSlenderness(section.bf - section.tw, section.tf, fy), yieldLimit: 16 },
      { width: section.d1, thickness: section.tw, count: 1, lambda: flatSlenderness(section.d1, section.tw, fy), yieldLimit: 45 }
    ]);
    return result({
      family: "pfc",
      direction,
      basis: "Independent HR plate-element check",
      classMethod: "independent-geometry",
      zeMethod: "independent-geometry",
      governing,
      Z: axis.Z,
      S: axis.S,
      expectedClass: sectionClass(governing.lambda, governing.limits),
      publishedClass: capacity.compactness || sectionClass(governing.lambda, governing.limits),
      expectedZe: flatZe(axis.Z, axis.S, governing),
      publishedZe: capacity.Ze,
      expectedKf,
      publishedKf: grade.kf
    });
  }

  function reconcileHollow(section, grade, direction) {
    const axis = section.axes?.[direction];
    const capacity = grade.directions?.[direction];
    if (!axis || !capacity) return Object.freeze({ status: "unresolved", reason: "Required hollow-section direction data is missing." });
    const fy = grade.fy;
    if (section.family === "chs") {
      const lambda = chsSlenderness(section.D, section.t, fy);
      return result({
        family: "chs",
        direction,
        basis: "Independent CF circular-element check",
        classMethod: "independent-geometry",
        zeMethod: "independent-geometry",
        governing: { name: "circular wall", lambda, limits: LIMITS.chsBendingCF },
        Z: axis.Z,
        S: axis.S,
        expectedClass: sectionClass(lambda, LIMITS.chsBendingCF),
        publishedClass: capacity.compactness,
        expectedZe: chsZe(axis.Z, axis.S, lambda),
        publishedZe: capacity.Ze,
        expectedKf: chsCompressionKf(lambda),
        publishedKf: grade.kf
      });
    }

    const xDirection = direction !== "y";
    const flangeWidth = (xDirection ? section.b : section.d) - 2 * section.t;
    const webWidth = (xDirection ? section.d : section.b) - 2 * section.t;
    const flangeLambda = flatSlenderness(flangeWidth, section.t, fy);
    const webLambda = flatSlenderness(webWidth, section.t, fy);
    const governing = governingElement([
      { name: "compression flange", lambda: flangeLambda, limits: LIMITS.internalUniformCF },
      { name: "web in bending", lambda: webLambda, limits: LIMITS.internalGradient }
    ]);
    const expectedKf = flatCompressionKf(section.area, [
      { width: section.b - 2 * section.t, thickness: section.t, count: 2, lambda: flatSlenderness(section.b - 2 * section.t, section.t, fy), yieldLimit: 40 },
      { width: section.d - 2 * section.t, thickness: section.t, count: 2, lambda: flatSlenderness(section.d - 2 * section.t, section.t, fy), yieldLimit: 40 }
    ]);
    const expectedClass = sectionClass(governing.lambda, governing.limits);
    const catalogueEffectiveSection = expectedClass === "S";
    return result({
      family: section.family,
      direction,
      basis: catalogueEffectiveSection
        ? "Independent CF class check; published AS 4100 effective-section Ze"
        : "Independent CF plate-element check",
      classMethod: "independent-geometry",
      zeMethod: catalogueEffectiveSection ? "published-effective-section" : "independent-geometry",
      governing,
      Z: axis.Z,
      S: axis.S,
      expectedClass,
      publishedClass: capacity.compactness,
      expectedZe: catalogueEffectiveSection ? capacity.Ze : flatZe(axis.Z, axis.S, governing),
      publishedZe: capacity.Ze,
      expectedKf,
      publishedKf: grade.kf
    });
  }

  function reconcileEqualAngle(section, grade, direction) {
    const axis = section.axes?.[direction];
    const capacity = grade.directions?.[direction];
    if (!axis || !capacity) return Object.freeze({ status: "unresolved", reason: "Required equal-angle load-case data is missing." });
    const width = section.b - section.t;
    const lambda = flatSlenderness(width, section.t, grade.fy);
    const expectedKf = flatCompressionKf(section.area, [
      { width, thickness: section.t, count: 2, lambda, yieldLimit: 16 }
    ]);
    const inferredClass = classFromPublishedZe(axis.Z, axis.S, capacity.Ze);
    return result({
      family: "ea",
      direction,
      basis: "Published load-case Ze checked against AS 4100:2020 Ze interval",
      classMethod: "published-ze-interval",
      zeMethod: "published-ze-interval",
      governing: null,
      Z: axis.Z,
      S: axis.S,
      expectedClass: inferredClass,
      publishedClass: inferredClass,
      expectedZe: capacity.Ze,
      publishedZe: capacity.Ze,
      expectedKf,
      publishedKf: grade.kf
    });
  }

  function derived(details) {
    return Object.freeze({
      ...details,
      status: "derived",
      publishedClass: null,
      publishedZe: null,
      publishedKf: null,
      classOk: true,
      zeOk: true,
      kfOk: true
    });
  }

  function deriveISection(section, grade, direction) {
    const axis = section.axes?.[direction];
    if (!axis || !positive(section.bf) || !positive(section.tw) || !positive(section.tf) || !positive(grade.fy)) {
      return Object.freeze({ status: "unresolved", reason: "Required I-section geometry or project yield strength is missing." });
    }
    const flangeWidth = (section.bf - section.tw) / 2;
    const elements = direction === "x"
      ? [
          { name: "flange outstand", lambda: flatSlenderness(flangeWidth, section.tf, grade.fy), limits: LIMITS.outstandUniformHR },
          { name: "web in bending", lambda: flatSlenderness(section.d1, section.tw, grade.fy), limits: LIMITS.internalGradient }
        ]
      : [
          { name: "flange outstand", lambda: flatSlenderness(flangeWidth, section.tf, grade.fy), limits: LIMITS.outstandGradientHR, slenderExponent: 2 }
        ];
    const governing = governingElement(elements);
    return derived({
      family: section.family,
      direction,
      basis: "Project yield strength; independent HR plate-element check",
      classMethod: "independent-geometry",
      zeMethod: "independent-geometry",
      governing,
      Z: axis.Z,
      S: axis.S,
      expectedClass: sectionClass(governing.lambda, governing.limits),
      expectedZe: flatZe(axis.Z, axis.S, governing),
      expectedKf: flatCompressionKf(section.area, [
        { width: flangeWidth, thickness: section.tf, count: 4, lambda: flatSlenderness(flangeWidth, section.tf, grade.fy), yieldLimit: 16 },
        { width: section.d1, thickness: section.tw, count: 1, lambda: flatSlenderness(section.d1, section.tw, grade.fy), yieldLimit: 45 }
      ])
    });
  }

  function derivePfc(section, grade, direction) {
    if (direction !== "x") {
      return Object.freeze({
        status: "unresolved",
        reason: "Project yield-strength overrides are not evaluated for asymmetric PFC Load A / Load B bending; use a verified direction-specific effective section modulus."
      });
    }
    const axis = section.axes?.x;
    if (!axis || !positive(section.bf) || !positive(section.tw) || !positive(section.tf) || !positive(grade.fy)) {
      return Object.freeze({ status: "unresolved", reason: "Required PFC geometry or project yield strength is missing." });
    }
    const flangeWidth = section.bf - section.tw;
    const elements = [
      { name: "flange outstand", lambda: flatSlenderness(flangeWidth, section.tf, grade.fy), limits: LIMITS.outstandUniformHR },
      { name: "web in bending", lambda: flatSlenderness(section.d1, section.tw, grade.fy), limits: LIMITS.internalGradient }
    ];
    const governing = governingElement(elements);
    return derived({
      family: "pfc",
      direction,
      basis: "Project yield strength; independent HR plate-element check",
      classMethod: "independent-geometry",
      zeMethod: "independent-geometry",
      governing,
      Z: axis.Z,
      S: axis.S,
      expectedClass: sectionClass(governing.lambda, governing.limits),
      expectedZe: flatZe(axis.Z, axis.S, governing),
      expectedKf: flatCompressionKf(section.area, [
        { width: flangeWidth, thickness: section.tf, count: 2, lambda: flatSlenderness(flangeWidth, section.tf, grade.fy), yieldLimit: 16 },
        { width: section.d1, thickness: section.tw, count: 1, lambda: flatSlenderness(section.d1, section.tw, grade.fy), yieldLimit: 45 }
      ])
    });
  }

  function deriveHollow(section, grade, direction) {
    const axis = section.axes?.[direction];
    if (!axis || !positive(grade.fy)) {
      return Object.freeze({ status: "unresolved", reason: "Required hollow-section geometry, direction or project yield strength is missing." });
    }
    if (section.family === "chs") {
      const lambda = chsSlenderness(section.D, section.t, grade.fy);
      return derived({
        family: "chs",
        direction,
        basis: "Project yield strength; independent CF circular-element check",
        classMethod: "independent-geometry",
        zeMethod: "independent-geometry",
        governing: { name: "circular wall", lambda, limits: LIMITS.chsBendingCF },
        Z: axis.Z,
        S: axis.S,
        expectedClass: sectionClass(lambda, LIMITS.chsBendingCF),
        expectedZe: chsZe(axis.Z, axis.S, lambda),
        expectedKf: chsCompressionKf(lambda)
      });
    }

    const xDirection = direction !== "y";
    const flangeWidth = (xDirection ? section.b : section.d) - 2 * section.t;
    const webWidth = (xDirection ? section.d : section.b) - 2 * section.t;
    const governing = governingElement([
      { name: "compression flange", lambda: flatSlenderness(flangeWidth, section.t, grade.fy), limits: LIMITS.internalUniformCF },
      { name: "web in bending", lambda: flatSlenderness(webWidth, section.t, grade.fy), limits: LIMITS.internalGradient }
    ]);
    const expectedClass = sectionClass(governing.lambda, governing.limits);
    return derived({
      family: section.family,
      direction,
      basis: expectedClass === "S"
        ? "Project yield strength; AS 4100 simplified slender-section effective modulus"
        : "Project yield strength; independent CF plate-element check",
      classMethod: "independent-geometry",
      zeMethod: expectedClass === "S" ? "independent-simplified-slender" : "independent-geometry",
      governing,
      Z: axis.Z,
      S: axis.S,
      expectedClass,
      expectedZe: flatZe(axis.Z, axis.S, governing),
      expectedKf: flatCompressionKf(section.area, [
        { width: section.b - 2 * section.t, thickness: section.t, count: 2, lambda: flatSlenderness(section.b - 2 * section.t, section.t, grade.fy), yieldLimit: 40 },
        { width: section.d - 2 * section.t, thickness: section.t, count: 2, lambda: flatSlenderness(section.d - 2 * section.t, section.t, grade.fy), yieldLimit: 40 }
      ])
    });
  }

  function deriveProject(section, grade, direction) {
    if (!section || !grade || !positive(grade.fy)) {
      return Object.freeze({ status: "unresolved", reason: "Section data and a positive project yield strength are required." });
    }
    if (section.family === "ub" || section.family === "uc") return deriveISection(section, grade, direction);
    if (section.family === "pfc") return derivePfc(section, grade, direction);
    if (["chs", "rhs", "shs"].includes(section.family)) return deriveHollow(section, grade, direction);
    if (section.family === "ea") {
      return Object.freeze({
        status: "unresolved",
        reason: "Project yield-strength overrides are not evaluated for equal-angle Load A / B / C / D bending; use a verified direction-specific effective section modulus."
      });
    }
    if (section.family === "rod") {
      const axis = section.axes?.[direction];
      if (!axis) return Object.freeze({ status: "unresolved", reason: "Required solid-circle direction data is missing." });
      return derived({
        family: "rod",
        direction,
        basis: "Project yield strength; compact solid-circle geometry",
        classMethod: "independent-geometry",
        zeMethod: "independent-geometry",
        governing: null,
        Z: axis.Z,
        S: axis.S,
        expectedClass: "C",
        expectedZe: compactZe(axis.Z, axis.S),
        expectedKf: 1
      });
    }
    return Object.freeze({ status: "unresolved", reason: "This section family has no project-strength derivation path." });
  }

  function reconcile(section, grade, direction) {
    if (!section || !grade) return Object.freeze({ status: "unresolved", reason: "Section or grade data is missing." });
    if (section.family === "ub" || section.family === "uc") return reconcileISection(section, grade, direction);
    if (section.family === "pfc") return reconcilePfc(section, grade, direction);
    if (["chs", "rhs", "shs"].includes(section.family)) return reconcileHollow(section, grade, direction);
    if (section.family === "ea") return reconcileEqualAngle(section, grade, direction);
    if (section.family === "rod") {
      return Object.freeze({
        status: "reconciled",
        family: "rod",
        direction,
        basis: "Compact solid-circle geometry",
        classMethod: "independent-geometry",
        zeMethod: "independent-geometry",
        expectedClass: "C",
        publishedClass: "C",
        expectedZe: grade.directions?.[direction]?.Ze,
        publishedZe: grade.directions?.[direction]?.Ze,
        expectedKf: 1,
        publishedKf: grade.kf,
        classOk: true,
        zeOk: true,
        kfOk: true
      });
    }
    return Object.freeze({ status: "unresolved", reason: "This section family has no AS 4100 reconciliation path." });
  }

  return Object.freeze({
    LIMITS,
    compactZe,
    flatSlenderness,
    chsSlenderness,
    sectionClass,
    flatZe,
    chsZe,
    classFromPublishedZe,
    flatCompressionKf,
    chsCompressionKf,
    deriveProject,
    reconcile
  });
});
