(function () {
  "use strict";

  const result = document.getElementById("result");
  const close = (actual, expected, label, tolerance = 1e-8) => {
    if (Math.abs(actual - expected) > tolerance * Math.max(1, Math.abs(expected))) {
      throw new Error(`${label}: ${actual} != ${expected}`);
    }
  };
  const equal = (actual, expected, label) => {
    if (actual !== expected) throw new Error(`${label}: ${actual} != ${expected}`);
  };
  const compactZe = (Z, S) => Math.min(S, 1.5 * Z);
  const designMoment = (fy, Ze) => 0.9 * fy * Ze / 1e6;

  const iSection = ({ d, bf, tw, tf }) => {
    const clear = d - 2 * tf;
    const ix = 2 * (bf * tf ** 3 / 12 + bf * tf * (d / 2 - tf / 2) ** 2) + tw * clear ** 3 / 12;
    const iy = 2 * tf * bf ** 3 / 12 + clear * tw ** 3 / 12;
    return {
      area: 2 * bf * tf + tw * clear,
      zx: ix / (d / 2),
      zy: iy / (bf / 2),
      sx: bf * tf * (d - tf) + tw * clear ** 2 / 4,
      sy: tf * bf ** 2 / 2 + clear * tw ** 2 / 4,
      clear
    };
  };

  const hollow = ({ d, b, t }) => {
    const di = d - 2 * t;
    const bi = b - 2 * t;
    const ix = (b * d ** 3 - bi * di ** 3) / 12;
    const iy = (d * b ** 3 - di * bi ** 3) / 12;
    return {
      area: b * d - bi * di,
      zx: ix / (d / 2),
      zy: iy / (b / 2),
      sx: (b * d ** 2 - bi * di ** 2) / 4,
      sy: (d * b ** 2 - di * bi ** 2) / 4
    };
  };

  try {
    const ubDims = { d: 300, bf: 150, tw: 10, tf: 15 };
    const ubIndependent = iSection(ubDims);
    const ub = BeamCustomSection.build("ub", ubDims);
    const ubMaterial = BeamCustomSection.resolveMaterial({ family: "ub", productForm: "hot-rolled-section", grade: "300PLUS", dimensions: ubDims });
    const ubCapacity = BeamSectionReconciliation.deriveProject(ub, ubMaterial, "x");
    equal(ubMaterial.fy, 300, "UB flange fy");
    equal(ubMaterial.fyw, 320, "UB web fy");
    close(ub.area, ubIndependent.area, "UB area");
    close(BeamSectionCapacity.sectionMoment(ubMaterial.fy, ubCapacity.expectedZe * 1000), designMoment(300, compactZe(ubIndependent.zx, ubIndependent.sx)), "UB moment");

    const ucDims = { d: 250, bf: 250, tw: 12, tf: 18 };
    const ucIndependent = iSection(ucDims);
    const uc = BeamCustomSection.build("uc", ucDims);
    const ucMaterial = BeamCustomSection.resolveMaterial({ family: "uc", productForm: "hot-rolled-section", grade: "Grade 350", dimensions: ucDims });
    const ucCapacity = BeamSectionReconciliation.deriveProject(uc, ucMaterial, "y");
    close(BeamSectionCapacity.sectionMoment(ucMaterial.fy, ucCapacity.expectedZe * 1000), designMoment(340, compactZe(ucIndependent.zy, ucIndependent.sy)), "UC y moment");

    const pfcDims = { d: 200, bf: 75, tw: 8, tf: 12 };
    const pfcIndependent = iSection(pfcDims);
    const pfc = BeamCustomSection.build("pfc", pfcDims);
    const pfcMaterial = BeamCustomSection.resolveMaterial({ family: "pfc", productForm: "hot-rolled-section", grade: "300PLUS", dimensions: pfcDims });
    const pfcCapacity = BeamSectionReconciliation.deriveProject(pfc, pfcMaterial, "x");
    equal(BeamCustomSection.directions("pfc").join(","), "x", "PFC directions");
    close(BeamSectionCapacity.sectionMoment(pfcMaterial.fy, pfcCapacity.expectedZe * 1000), designMoment(300, compactZe(pfcIndependent.zx, pfcIndependent.sx)), "PFC x moment");

    const chsDims = { D: 114.3, t: 6 };
    const chs = BeamCustomSection.build("chs", chsDims);
    const chsInner = chsDims.D - 2 * chsDims.t;
    const chsArea = Math.PI * (chsDims.D ** 2 - chsInner ** 2) / 4;
    const chsI = Math.PI * (chsDims.D ** 4 - chsInner ** 4) / 64;
    const chsS = (chsDims.D ** 3 - chsInner ** 3) / 6;
    const chsMaterial = BeamCustomSection.resolveMaterial({ family: "chs", productForm: "hollow-section", grade: "C350L0", dimensions: chsDims });
    const chsCapacity = BeamSectionReconciliation.deriveProject(chs, chsMaterial, "axis");
    close(chsCapacity.expectedZe * 1000, compactZe(chsI / (chsDims.D / 2), chsS), "CHS Ze");
    close(BeamSectionCapacity.circularHollowShear(350, chs.area), 0.9 * 0.36 * 350 * chsArea / 1000, "CHS shear");

    const rhsDims = { d: 150, b: 100, t: 8 };
    const rhsIndependent = hollow(rhsDims);
    const rhs = BeamCustomSection.build("rhs", rhsDims);
    const rhsMaterial = BeamCustomSection.resolveMaterial({ family: "rhs", productForm: "hollow-section", grade: "C350L0", dimensions: rhsDims });
    const rhsCapacity = BeamSectionReconciliation.deriveProject(rhs, rhsMaterial, "x");
    close(rhsCapacity.expectedZe * 1000, compactZe(rhsIndependent.zx, rhsIndependent.sx), "RHS Ze");
    const rhsClear = rhsDims.d - 2 * rhsDims.t;
    const rhsArea = 2 * rhsDims.t * rhsClear;
    const rhsUniform = 0.6 * 350 * rhsArea / 1000;
    const rhsRho = 3 * (2 * rhsDims.b + rhsDims.d) / (2 * (3 * rhsDims.b + rhsDims.d));
    const rhsShear = 0.9 * Math.min(rhsUniform, 2 * rhsUniform / (0.9 + rhsRho));
    close(BeamSectionCapacity.rectangularHollowShear(350, rhsDims.d, rhsDims.b, rhsDims.t, "x").designCapacity, rhsShear, "RHS shear");

    const shsDims = { b: 100, t: 8 };
    const shsIndependent = hollow({ d: 100, b: 100, t: 8 });
    const shs = BeamCustomSection.build("shs", shsDims);
    const shsMaterial = BeamCustomSection.resolveMaterial({ family: "shs", productForm: "hollow-section", grade: "C450L0", dimensions: shsDims });
    const shsCapacity = BeamSectionReconciliation.deriveProject(shs, shsMaterial, "xy");
    close(shsCapacity.expectedZe * 1000, compactZe(shsIndependent.zx, shsIndependent.sx), "SHS Ze");

    const rodDims = { D: 24 };
    const rod = BeamCustomSection.build("rod", rodDims);
    const rodMaterial = BeamCustomSection.resolveMaterial({ family: "rod", productForm: "round-bar", grade: "300PLUS", dimensions: rodDims });
    const rodCapacity = BeamSectionReconciliation.deriveProject(rod, rodMaterial, "axis");
    const rodZ = Math.PI * rodDims.D ** 3 / 32;
    const rodS = rodDims.D ** 3 / 6;
    close(rodCapacity.expectedZe * 1000, compactZe(rodZ, rodS), "Rod Ze");

    equal(BeamCustomSection.directions("ea").length, 0, "Equal Angle directions");
    equal(BeamCustomSection.build("ea", { b: 75, t: 6 }).capacityStatus, "unavailable", "Equal Angle status");
    equal(BeamCustomSection.resolveMaterial({ family: "rhs", productForm: "hot-rolled-section", grade: "300PLUS", dimensions: rhsDims }).status, "not-verified", "Incompatible material form");

    result.dataset.status = "passed";
    result.textContent = "PASS - 7 custom capacity families independently checked; unsupported paths fail closed.";
  } catch (error) {
    result.dataset.status = "failed";
    result.textContent = `FAIL - ${error.message}`;
    throw error;
  }
})();
