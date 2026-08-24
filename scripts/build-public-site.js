"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outputRoot = path.join(root, "dist");
const manifestPath = path.join(root, "public-build-manifest.json");

function normaliseRelativePath(value) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error("Every public-build entry must be a non-empty string.");
  }

  const normalised = value.replaceAll("\\", "/");
  if (
    normalised.startsWith("/") ||
    normalised.includes("../") ||
    normalised === ".." ||
    path.isAbsolute(value)
  ) {
    throw new Error(`Public-build entry escapes the repository root: ${value}`);
  }
  return normalised;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (manifest.schemaVersion !== 1 || manifest.publicationClass !== "Public") {
  throw new Error("Unsupported or non-public build manifest.");
}
if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
  throw new Error("The public-build manifest has no files.");
}

const files = manifest.files.map(normaliseRelativePath);
if (new Set(files).size !== files.length) {
  throw new Error("The public-build manifest contains duplicate entries.");
}

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

for (const relativePath of files) {
  const sourcePath = path.join(root, relativePath);
  const destinationPath = path.join(outputRoot, relativePath);
  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    throw new Error(`Missing allowlisted public file: ${relativePath}`);
  }
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

fs.writeFileSync(path.join(outputRoot, ".nojekyll"), "", "utf8");

const artifactFiles = [...files, ".nojekyll"].sort();
const artifactManifest = {
  schemaVersion: 1,
  publicationClass: "Public",
  files: artifactFiles.map((relativePath) => ({
    path: relativePath,
    sha256: sha256(path.join(outputRoot, relativePath))
  }))
};

fs.writeFileSync(
  path.join(outputRoot, "PUBLIC_BUILD_MANIFEST.json"),
  `${JSON.stringify(artifactManifest, null, 2)}\n`,
  "utf8"
);

console.log(`Built public site with ${files.length} allowlisted files.`);
