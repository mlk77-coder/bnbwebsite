import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const toIco = require("to-ico");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "logo-light.png");
const outDir = path.join(root, "public", "favicon");

const outputs = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["mstile-150x150.png", 150],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

async function toSquarePng(size) {
  return sharp(src)
    .resize(size, size, {
      fit: "contain",
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function main() {
  await fs.access(src);

  for (const [filename, size] of outputs) {
    const buf = await toSquarePng(size);
    await fs.writeFile(path.join(outDir, filename), buf);
    console.log("wrote", path.join("public/favicon", filename), `${size}x${size}`);
  }

  const png512 = await toSquarePng(512);
  const b64 = png512.toString("base64");
  const svgPath = path.join(outDir, "favicon111.svg");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,${b64}" />
</svg>
`;
  await fs.writeFile(svgPath, svg, "utf8");
  console.log("wrote", "public/favicon/favicon111.svg", "(embedded 512 PNG)");

  const faviconSvgPath = path.join(outDir, "favicon.svg");
  const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Site icon">
  <image width="512" height="512" href="data:image/png;base64,${b64}" />
</svg>
`;
  await fs.writeFile(faviconSvgPath, faviconSvg, "utf8");
  console.log("wrote", "public/favicon/favicon.svg", "(square 1:1, viewBox 512)");

  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(icoSizes.map((s) => toSquarePng(s)));
  const icoBuf = await toIco(icoBuffers);
  await fs.writeFile(path.join(outDir, "favicon.ico"), icoBuf);
  console.log("wrote", "public/favicon/favicon.ico", `(${icoSizes.join(", ")} px)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
