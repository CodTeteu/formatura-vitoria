import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "fotos");
const outputDir = path.join(rootDir, "public", "images", "generated");

const manifest = [
  {
    input: "WhatsApp Image 2026-07-06 at 08.15.03.jpeg",
    output: "vitoria-hero",
    width: 1080,
    height: 1620,
    position: "centre",
    brightness: 1.05,
  },
  {
    input: "WhatsApp Image 2026-07-06 at 08.15.02.jpeg",
    output: "vitoria-portrait-1",
    width: 1047,
    height: 1570,
    position: "centre",
    brightness: 1.06,
  },
  {
    input: "WhatsApp Image 2026-07-06 at 08.15.02 (1).jpeg",
    output: "vitoria-portrait-2",
    width: 1047,
    height: 1570,
    position: "centre",
    brightness: 1,
    gain: 1.06,
    offset: 10,
    saturation: 1.12,
    warmth: true,
  },
  {
    input: "WhatsApp Image 2026-07-06 at 08.15.01.jpeg",
    output: "vitoria-family-1",
    width: 1105,
    height: 736,
    position: "centre",
    brightness: 1,
    gain: 1.12,
    offset: 18,
    saturation: 1.15,
    warmth: true,
  }
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function buildOgOverlay() {
  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="rgba(30, 4, 8, 0.86)" />
          <stop offset="1" stop-color="rgba(88, 15, 27, 0.42)" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#fade)" />
      <rect x="58" y="58" width="1084" height="514" rx="34" fill="none" stroke="rgba(195, 155, 91, 0.7)" stroke-width="2" />
      <text x="86" y="152" fill="#fff5f5" font-size="82" font-family="Georgia, serif" font-style="italic">Convite</text>
      <text x="90" y="214" fill="#d3bb88" font-size="30" letter-spacing="10" font-family="Georgia, serif">LUMA CONVITES</text>
      <text x="90" y="314" fill="#fff8f8" font-size="40" font-family="Georgia, serif">Direito - PUC Goiás</text>
      <text x="90" y="374" fill="#d4c7ae" font-size="26" font-family="Arial, sans-serif">Vitória Cézar</text>
    </svg>
  `);
}

async function createImageVariants(asset) {
  const inputPath = path.join(sourceDir, asset.input);

  if (!(await fileExists(inputPath))) {
    throw new Error(`Arquivo não encontrado: ${asset.input}`);
  }

  const source = sharp(inputPath).rotate();
  const resized = asset.extract
    ? source.extract(asset.extract).resize(asset.width, asset.height)
    : source.resize(asset.width, asset.height, {
        fit: "cover",
        position: asset.position,
        withoutEnlargement: true,
      });
  const colorCorrected = resized
    .linear(asset.gain ?? 1, asset.offset ?? 0)
    .modulate({
      brightness: asset.brightness ?? 1,
      saturation: asset.saturation ?? 1.025,
    });
  const pipeline = (asset.warmth
    ? colorCorrected.recomb([
        [1.035, 0, 0],
        [0, 1.005, 0],
        [0, 0, 0.97],
      ])
    : colorCorrected
  )
    .sharpen({ sigma: 0.35, m1: 0.35, m2: 0.8 });

  await Promise.all([
    pipeline.clone().avif({ quality: 64 }).toFile(path.join(outputDir, `${asset.output}.avif`)),
    pipeline.clone().webp({ quality: 88 }).toFile(path.join(outputDir, `${asset.output}.webp`)),
    pipeline.clone().jpeg({ quality: 91, mozjpeg: true }).toFile(path.join(outputDir, `${asset.output}.jpg`))
  ]);
}

async function createOgImage() {
  const heroPath = path.join(sourceDir, "WhatsApp Image 2026-07-06 at 08.15.03.jpeg");
  const overlay = buildOgOverlay();
  const ogBase = sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([{ input: overlay }]);

  await Promise.all([
    ogBase.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(rootDir, "public", "og-template.jpg")),
    ogBase.clone().webp({ quality: 82 }).toFile(path.join(rootDir, "public", "og-template.webp")),
    ogBase.clone().avif({ quality: 54 }).toFile(path.join(rootDir, "public", "og-template.avif"))
  ]);
}

async function createSitemap() {
  const siteUrl = process.env.VITE_SITE_URL ?? "https://cliente.lumaconvites.com.br";
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
  </url>
  <url>
    <loc>${siteUrl}/admin</loc>
  </url>
</urlset>`;

  await fs.writeFile(path.join(rootDir, "public", "sitemap.xml"), content, "utf8");
}

async function main() {
  await ensureDir(outputDir);
  await Promise.all(manifest.map(createImageVariants));
  await Promise.all([createOgImage(), createSitemap()]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
