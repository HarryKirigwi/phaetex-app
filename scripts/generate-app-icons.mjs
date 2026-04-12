/**
 * Generates app/favicon.ico and app/apple-icon.png from app/icon.png.
 * Works whether your shell is the repo root or the Next.js `app/` folder:
 * project root is found by walking up from cwd (and from this script) until package.json.
 *
 * Run from repo root: npm run icons:generate
 * Run from app/:       node ../scripts/generate-app-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findPackageRoot(startDir) {
  let dir = path.resolve(startDir);
  const { root: vol } = path.parse(dir);
  while (true) {
    if (fs.existsSync(path.join(dir, "package.json"))) return dir;
    if (dir === vol) break;
    dir = path.dirname(dir);
  }
  return null;
}

const root =
  findPackageRoot(process.cwd()) ||
  findPackageRoot(path.join(__dirname, "..")) ||
  path.join(__dirname, "..");

const nextAppDir = path.join(root, "app");
const iconPath = path.join(nextAppDir, "icon.png");

if (!fs.existsSync(iconPath)) {
  console.error(`Missing ${path.relative(root, iconPath)} — add it first.`);
  console.error(`(Resolved project root: ${root})`);
  process.exit(1);
}

const pngBuf = fs.readFileSync(iconPath);

const icoBuf = await pngToIco([pngBuf]);
fs.writeFileSync(path.join(nextAppDir, "favicon.ico"), icoBuf);
console.log(`Wrote ${path.join("app", "favicon.ico")} (root: ${root})`);

await sharp(pngBuf)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(nextAppDir, "apple-icon.png"));
console.log(`Wrote ${path.join("app", "apple-icon.png")} (180×180)`);
