import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SRC = path.join(root, 'public', 'logo-light.png');
const DEST = path.join(root, 'public', 'og.png');

/** Open Graph recommended size */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Max box for the logo inside the canvas (padding implied) */
const MAX_LOGO_WIDTH = Math.round(OG_WIDTH * 0.52);
const MAX_LOGO_HEIGHT = Math.round(OG_HEIGHT * 0.45);

/** Background behind the logo */
const BG = { r: 255, g: 255, b: 255, alpha: 1 };

async function main() {
  await fs.access(SRC);

  const logoPng = await sharp(SRC)
    .resize(MAX_LOGO_WIDTH, MAX_LOGO_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: logoPng, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toFile(DEST);

  console.log(
    'wrote',
    path.relative(root, DEST),
    `(${OG_WIDTH}x${OG_HEIGHT}) from logo-light.png`
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
