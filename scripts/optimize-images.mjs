#!/usr/bin/env node
/**
 * Optimize page images: resize to display size + convert to WebP.
 *
 * next/image runs in `unoptimized` mode (required by static `output: "export"`),
 * so it serves source files as-is — there is no build-time resizing. The source
 * files themselves must therefore be pre-sized. This script keeps the originals
 * (custom photos are owner-provided and worth preserving) and writes a `.webp`
 * sibling next to each, which page.tsx then references.
 *
 * maxW values are ~2× the largest on-screen render width (retina), with extra
 * headroom for the before/after slider which scales small-face photos up.
 *
 * Run:  node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const JOBS = [
  // Hero card renders at ~540px on desktop → 1080 for retina
  { src: "public/images/custom/hero-model.png", maxW: 1080 },
  // Brand-story portrait renders at ~460px → 1000
  { src: "public/images/custom/doctor-portrait.png", maxW: 1000 },
  // Treatment circle thumbs render at ~220px → 560 (headroom for hover scale)
  { src: "public/images/custom/treatment-1-contour.png", maxW: 560 },
  { src: "public/images/custom/treatment-2-symmetry.png", maxW: 560 },
  // Before/after slider renders at ~280px but scales faces up to ~1.8× → 1100
  { src: "public/images/wix/before-after-1.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-2.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-3.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-4.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-5.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-6.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-7.jpg", maxW: 1100 },
  { src: "public/images/wix/before-after-8.jpg", maxW: 1100 },
];

const QUALITY = 80;
const kb = (n) => Math.round(n / 1024);

async function run() {
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const { src, maxW } of JOBS) {
    const inPath = join(ROOT, src);
    const outPath = inPath.replace(/\.(png|jpe?g)$/i, ".webp");
    const meta = await sharp(inPath).metadata();

    await sharp(inPath)
      .resize({ width: Math.min(maxW, meta.width), withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const inSize = (await stat(inPath)).size;
    const outSize = (await stat(outPath)).size;
    const outMeta = await sharp(outPath).metadata();
    beforeTotal += inSize;
    afterTotal += outSize;

    console.log(
      `${relative(ROOT, outPath)}\n` +
        `   ${meta.width}x${meta.height} ${kb(inSize)}KB  ->  ` +
        `${outMeta.width}x${outMeta.height} ${kb(outSize)}KB`,
    );
  }

  const pct = (100 * (1 - afterTotal / beforeTotal)).toFixed(1);
  console.log(
    `\nTOTAL  ${kb(beforeTotal)}KB -> ${kb(afterTotal)}KB  (${pct}% smaller)`,
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
