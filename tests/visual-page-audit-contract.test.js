const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const auditPath = path.join(root, "VISUAL_PAGE_AUDIT.md");
const audit = fs.readFileSync(auditPath, "utf8");

for (const heading of [
  "## 1. Bolt Capacity",
  "## 2. Weld Capacity",
  "## 3. Section Properties",
  "## 4. Axial Member Capacity",
  "## 5. Beam Section Capacity",
  "## 6. Steel Monopole Section Capacity",
  "## 7. Concrete Pad Section",
  "## 8. Reinforcement",
  "## 9. Screw Piles Selector",
  "## 10. Rock Anchor Selector",
]) {
  assert.ok(audit.includes(heading), `Missing visual-audit section: ${heading}`);
}

const rows = [...audit.matchAll(/^\| `(FIG|CARD)-([A-Z]+)-(\d{2})` \|[^\n]+$/gm)];
assert.ok(rows.length > 0, "Expected per-item figure and card audit rows");

const ids = rows.map((match) => `${match[1]}-${match[2]}-${match[3]}`);
assert.strictEqual(new Set(ids).size, ids.length, "Visual-audit IDs must be unique");

for (const code of ["BOLT", "WELD", "PROPERTIES", "MEMBER", "BEAM", "MONOPOLE", "PAD", "REO", "SCREW", "ROCK"]) {
  assert.ok(ids.some((id) => id.startsWith(`CARD-${code}-`)), `Missing card rows for ${code}`);
}

for (const code of ["WELD", "PROPERTIES", "MEMBER", "BEAM", "MONOPOLE", "PAD"]) {
  assert.ok(ids.some((id) => id.startsWith(`FIG-${code}-`)), `Missing figure rows for ${code}`);
}

assert.strictEqual(ids.filter((id) => id.startsWith("FIG-WELD-")).length, 12, "Weld figures must be audited individually");
assert.doesNotMatch(audit, /FIG-[A-Z]+-\d{2}\s+(?:to|through|-)\s+FIG-[A-Z]+-\d{2}/i);
assert.doesNotMatch(audit, /CARD-[A-Z]+-\d{2}\s+(?:to|through|-)\s+CARD-[A-Z]+-\d{2}/i);

for (const match of rows) {
  assert.match(match[0], /(Verified|Finding `V-\d{2}`)/, `Audit row lacks an item-specific result: ${match[0]}`);
}

console.log(`Visual page audit contract tests passed (${rows.length} item rows).`);
