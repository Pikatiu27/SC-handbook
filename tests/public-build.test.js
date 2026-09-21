"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outputRoot = path.join(root, "dist");
const manifestPath = path.join(outputRoot, "PUBLIC_BUILD_MANIFEST.json");
const sourceManifestPath = path.join(root, "public-build-manifest.json");

assert.ok(fs.existsSync(manifestPath), "Run scripts/build-public-site.js before the public-build test.");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sourceManifest = JSON.parse(fs.readFileSync(sourceManifestPath, "utf8"));
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.publicationClass, "Public");
assert.ok(Array.isArray(manifest.files) && manifest.files.length > 0);
assert.deepEqual(
  manifest.files.map((entry) => entry.path),
  [...sourceManifest.files, ".nojekyll"].sort(),
  "The built artifact does not match the controlling public allowlist."
);

const blockedSegments = new Set([
  ".git",
  ".github",
  ".agents",
  ".codex",
  "archive",
  "asset_generators",
  "audit",
  "engineering",
  "research",
  "scripts",
  "tests"
]);
const blockedNames = new Set([
  "EXTERNAL_WORKED_EXAMPLE_AUDIT.md",
  "REFERENCE_TRACEABILITY.md",
  "SC_HANDBOOK.md",
  "VISUAL_PAGE_AUDIT.md",
  "public-build-manifest.json"
]);

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function sha256Text(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function publicSourceContent(filePath) {
  return fs.readFileSync(filePath, "utf8")
    .replace(/<!--\s*UNRELEASED:([a-z0-9-]+):START\s*-->[\s\S]*?<!--\s*UNRELEASED:\1:END\s*-->/gi, "")
    .replace(/\/\*\s*UNRELEASED:([a-z0-9-]+):START\s*\*\/[\s\S]*?\/\*\s*UNRELEASED:\1:END\s*\*\//gi, "");
}

for (const entry of manifest.files) {
  assert.equal(typeof entry.path, "string");
  assert.match(entry.sha256, /^[a-f0-9]{64}$/);
  const segments = entry.path.split("/");
  assert.ok(!segments.some((segment) => blockedSegments.has(segment)), `Blocked path published: ${entry.path}`);
  assert.ok(!blockedNames.has(path.basename(entry.path)), `Blocked file published: ${entry.path}`);
  const filePath = path.join(outputRoot, entry.path);
  assert.ok(fs.existsSync(filePath) && fs.statSync(filePath).isFile(), `Manifest file missing: ${entry.path}`);
  assert.equal(sha256(filePath), entry.sha256, `Hash mismatch: ${entry.path}`);
  if (entry.path !== ".nojekyll") {
    const sourcePath = path.join(root, entry.path);
    const expectedHash = [".html", ".css", ".js"].includes(path.extname(entry.path).toLowerCase()) ? sha256Text(publicSourceContent(sourcePath)) : sha256(sourcePath);
    assert.equal(expectedHash, entry.sha256, `Built file is stale: ${entry.path}`);
  }
}

function localReference(value) {
  const clean = value.trim().replace(/^['"]|['"]$/g, "").split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith("#") || clean.startsWith("data:") || /^[a-z]+:/i.test(clean)) {
    return null;
  }
  return clean;
}

const html = fs.readFileSync(path.join(outputRoot, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(outputRoot, "styles.css"), "utf8");
const app = fs.readFileSync(path.join(outputRoot, "app.js"), "utf8");
for (const publicText of [html, styles, app]) {
  assert.doesNotMatch(publicText, /UNRELEASED:geo|Ground Parameters|geo-parameters\//, "Unreleased Geo content entered the public artifact.");
}
const references = [];

for (const match of html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)) {
  const reference = localReference(match[1]);
  if (reference) references.push(reference);
}
for (const match of styles.matchAll(/url\(([^)]+)\)/g)) {
  const reference = localReference(match[1]);
  if (reference) references.push(reference);
}

for (const reference of references) {
  assert.ok(
    fs.existsSync(path.join(outputRoot, reference)),
    `Public HTML/CSS dependency is not allowlisted: ${reference}`
  );
}

console.log("Public build allowlist and dependency tests passed.");
