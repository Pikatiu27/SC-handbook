const assert = require("assert");
const materials = require("../steel-materials.js");

assert.deepStrictEqual(materials.hotRolledStrength("300PLUS", 10.9), { fy: 320, fu: 440 });
assert.deepStrictEqual(materials.hotRolledStrength("300PLUS", 11), { fy: 300, fu: 440 });
assert.deepStrictEqual(materials.hotRolledStrength("300PLUS", 17), { fy: 300, fu: 440 });
assert.deepStrictEqual(materials.hotRolledStrength("300PLUS", 17.1), { fy: 280, fu: 440 });
assert.deepStrictEqual(materials.hotRolledStrength("Grade 350", 39.9), { fy: 340, fu: 480 });
assert.deepStrictEqual(materials.hotRolledStrength("Grade 350", 40), { fy: 330, fu: 480 });

assert.deepStrictEqual(materials.roundBarStrength("300PLUS", 50), { fy: 300, fu: 440 });
assert.deepStrictEqual(materials.roundBarStrength("300PLUS", 50.1), { fy: 290, fu: 440 });
assert.deepStrictEqual(materials.roundBarStrength("Grade 350", 100), { fy: 320, fu: 480 });

assert.deepStrictEqual(materials.hollowStrength("C250L0"), { fy: 250, fu: 320 });
assert.deepStrictEqual(materials.hollowStrength("C350L0"), { fy: 350, fu: 430 });
assert.deepStrictEqual(materials.hollowStrength("C450L0"), { fy: 450, fu: 500 });
assert.deepStrictEqual(materials.gradeOptions("hollow-section"), ["C250L0", "C350L0", "C450L0"]);
assert.strictEqual(materials.gradeLabel("300PLUS"), "Grade 300 (300PLUS)");
assert.strictEqual(materials.gradeLabel("Grade 350"), "Grade 350");
assert.strictEqual(materials.gradeLabel("C350L0"), "C350L0");
assert.strictEqual(materials.gradeLabel("User input"), "Project input");

const project = materials.resolve({
  productForm: "project",
  grade: "User input",
  thickness: 12,
  thicknessBasis: "project",
  fy: 345,
  fu: 455
});
assert.strictEqual(project.fy, 345);
assert.strictEqual(project.fu, 455);
assert.strictEqual(project.strengthBasis, "project");
assert.strictEqual(project.thicknessBasis, "project");

const unresolved = materials.resolve({ productForm: "project", grade: "User input" });
assert.strictEqual(unresolved.status, "not-verified");
assert.strictEqual(unresolved.fy, null);

const noMaterialBasis = materials.resolve({ productForm: "", thickness: 20 });
assert.strictEqual(noMaterialBasis.productForm, "");
assert.strictEqual(noMaterialBasis.status, "not-verified");
assert.strictEqual(noMaterialBasis.fy, null);
assert.strictEqual(noMaterialBasis.fu, null);
assert.ok(noMaterialBasis.validation.includes("Select a product form"));

const invertedProjectStrengths = materials.resolve({
  productForm: "project",
  grade: "User input",
  thickness: 12,
  fy: 500,
  fu: 300
});
assert.strictEqual(invertedProjectStrengths.status, "not-verified");
assert.strictEqual(invertedProjectStrengths.fy, null);
assert.ok(invertedProjectStrengths.validation.includes("greater than or equal"));

const hollowWithoutThickness = materials.resolve({
  productForm: "hollow-section",
  grade: "C350L0"
});
assert.strictEqual(hollowWithoutThickness.status, "not-verified");

assert.strictEqual(materials.COMMON.E.value, 200000);
assert.strictEqual(materials.COMMON.G.value, 80000);
assert.strictEqual(materials.COMMON.nu.value, 0.25);
assert.strictEqual(materials.COMMON.alphaT.value, 11.7e-6);
