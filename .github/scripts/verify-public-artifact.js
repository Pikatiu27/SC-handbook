"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "PUBLIC_BUILD_MANIFEST.json"), "utf8"));
if (manifest.schemaVersion !== 1 || manifest.publicationClass !== "Public" || !Array.isArray(manifest.files)) {
  throw new Error("Invalid public build manifest.");
}

const expected = new Set(["PUBLIC_BUILD_MANIFEST.json"]);
const deploymentFiles = [".github/scripts/verify-public-artifact.js", ".github/workflows/pages.yml"];
if (fs.existsSync(path.join(root, ".github"))) {
  for (const relative of deploymentFiles) {
    if (!fs.statSync(path.join(root, relative)).isFile()) throw new Error(`Missing deployment file: ${relative}`);
    expected.add(relative);
  }
}
for (const entry of manifest.files) {
  if (
    typeof entry.path !== "string" ||
    entry.path.startsWith("/") ||
    entry.path.includes("..") ||
    path.isAbsolute(entry.path) ||
    expected.has(entry.path)
  ) {
    throw new Error("Invalid or duplicate public path.");
  }
  const file = path.resolve(root, entry.path);
  if (!file.startsWith(root + path.sep) || !fs.statSync(file).isFile()) {
    throw new Error(`Missing public file: ${entry.path}`);
  }
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  if (hash !== entry.sha256) throw new Error(`Public hash mismatch: ${entry.path}`);
  expected.add(entry.path.replaceAll("\\", "/"));
}

function walk(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    if (directory === root && item.name === ".git") continue;
    if (item.isSymbolicLink()) throw new Error(`Public artifact contains a symbolic link: ${item.name}`);
    const file = path.join(directory, item.name);
    if (item.isDirectory()) walk(file);
    else {
      const relative = path.relative(root, file).replaceAll("\\", "/");
      if (!expected.has(relative)) throw new Error(`Unexpected public file: ${relative}`);
    }
  }
}

walk(root);
console.log(`Verified ${manifest.files.length} public artifact files and no extras.`);
