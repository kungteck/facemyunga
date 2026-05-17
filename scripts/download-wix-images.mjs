#!/usr/bin/env node
/**
 * Download all unique Wix images crawled from https://www.facemyunga.com
 * Saves to /public/images/wix/<id>.<ext>
 *
 * URLs are stored as original (un-transformed) Wix CDN URLs — adding
 * `/v1/fill/w_1600,h_1600,al_c,q_90/<id>.<ext>` requests a high-quality
 * rendition that Wix will resize on the fly.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images", "wix");

/**
 * Unique images collected across all 6 pages of the live site.
 * Each entry: { id, ext, name (logical/human-readable), src }
 */
const IMAGES = [
  // ===== Logo & Brand =====
  { id: "d784db_5643f3a029464f1fad54b4c12c8861ca", ext: "png", name: "logo" },

  // ===== Hero Slideshow =====
  { id: "d784db_b0b2767556dc41ea9aa5ff855ffbef59", ext: "png", name: "hero-slide1-model" },
  { id: "d784db_7ab64438a5a7449cb870763c6f59bd40", ext: "png", name: "hero-slide2-doctor" },
  { id: "d784db_55f33b2ebd8645f58777413a88e3b589", ext: "png", name: "hero-event-banner" },

  // ===== Service / Treatment =====
  { id: "d784db_10dc290cc23548af9d6ba9fb132decfc", ext: "jpg", name: "treatment-face-contour" },
  { id: "d784db_8c2508987f8847b28bb0816cf3a69128", ext: "jpg", name: "treatment-asymmetry" },
  { id: "d784db_05a053e241424501b069fc4cba82b6d8", ext: "png", name: "service-hero-model" },
  { id: "d784db_694d104d8deb4cdfb08eef6e8678390e", ext: "png", name: "treatment-icon-1" },
  { id: "d784db_52205e7ee00d48bdb831c6f0e3eb647d", ext: "png", name: "treatment-icon-2" },

  // ===== About / Doctor =====
  { id: "d784db_b427f4a5fb0e471e9f4e78eca8cb824e", ext: "png", name: "about-1" },
  { id: "d784db_56dfb727701c47abbc6b4deda7093520", ext: "png", name: "about-2" },
  { id: "d784db_9a07cdcc7a234cf9a8728a995a2762e8", ext: "png", name: "about-3-sbs" },
  { id: "d784db_c2e834b6b0774a5ca9686f2b7bee361e", ext: "png", name: "about-4" },

  // ===== 회귀경락 / Process =====
  { id: "d784db_b7be529e064e4da2bbbc3dc65271fec2", ext: "png", name: "regression-process" },
  { id: "d784db_b8e738060beb4715a7e5bb7164b5ce0a", ext: "png", name: "regression-detail-1" },
  { id: "d784db_e16e671e55bc4c7286636b5a128d17b2", ext: "png", name: "regression-detail-2" },
  { id: "d784db_a405215e0cc8446abd0c6649ac6be6e4", ext: "png", name: "process-step-1" },
  { id: "d784db_82724f88baf24efda1a65a5d2fc9d002", ext: "png", name: "process-step-2" },
  { id: "d784db_dc1911e28db44a27ae3e6e50418b02af", ext: "png", name: "process-step-3" },
  { id: "d784db_ffd412f513df45ca90dda42977ccd000", ext: "png", name: "process-step-4" },
  { id: "d784db_26042bb16b1845da9c4afe3a0ef23d6d", ext: "png", name: "process-step-5" },

  // ===== Page Hero Backgrounds =====
  { id: "11062b_e6d34c816aa7425bbe8c6be8f73e50b1", ext: "jpg", name: "page-hero-bg" },
  { id: "11062b_d0150a0b6f944293a4d00dca7edb364a", ext: "jpg", name: "service-page-bg" },

  // ===== Before / After Gallery =====
  { id: "d784db_6da7c92a1e534b299d286338c61b4df9", ext: "jpg", name: "before-after-1" },
  { id: "d784db_a0515215e40c49b3bc62a8bee28f8102", ext: "jpg", name: "before-after-2" },
  { id: "d784db_316262fd272f4bbfb162cd1d4b9aa18e", ext: "jpg", name: "before-after-3" },
  { id: "d784db_a8703959c2e14abeb82cd49ebd6bfaca", ext: "jpg", name: "before-after-4" },
  { id: "d784db_992948ecae6b43f2b77eb8ee485847d8", ext: "jpg", name: "before-after-5" },
  { id: "d784db_bcbb66ab2c7a4d4e9bb46a070039058f", ext: "jpg", name: "before-after-6" },
  { id: "d784db_352c35caeebf41238a1f136fb613f4f2", ext: "jpg", name: "before-after-7" },
  { id: "d784db_d964ec9450f64232adb800f2574d9519", ext: "jpg", name: "before-after-8" },
  { id: "d784db_1ad23b6fe5604cec88142450b86b174d", ext: "jpg", name: "before-after-9" },
  { id: "d784db_46ab69686d114d8b863cd55638b2552a", ext: "jpg", name: "before-after-10" },
  { id: "d784db_615f619c1da7456dba79812a63323c76", ext: "png", name: "before-after-cover" },

  // ===== Community / Reviews =====
  { id: "d784db_f18299512f0140b2a7a72fc1509cd1f5", ext: "png", name: "review-cover" },
  { id: "d784db_2b7af711ccec4badbc528dad17accaf6", ext: "jpg", name: "review-1" },
  { id: "d784db_851b65503908436a804da054666db3a8", ext: "jpg", name: "review-2" },
  { id: "d784db_e6db9346cc124509ad656e3bd0830ecd", ext: "jpg", name: "review-3" },
  { id: "d784db_d15cb8d696b74aa6b42d25a5b5b29253", ext: "jpg", name: "review-4" },
  { id: "d784db_521fb8aec03849d3a9b98477100cf15e", ext: "jpg", name: "review-5" },
  { id: "d784db_51f881e7d4904d1b9c42461203c2b5ae", ext: "jpg", name: "review-6" },
];

// Wix CDN URL with high-quality transformation.
// `fit` mode preserves the original aspect ratio and resizes the image
// to fit inside the given W×H box — no cropping. Both w_ and h_ are
// required (omitting h_ returns 400).
function buildUrl({ id, ext }) {
  return `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fit/w_2000,h_2000,q_90/file.${ext}`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download({ id, ext, name }) {
  const url = buildUrl({ id, ext });
  const filename = `${name}.${ext}`;
  const dest = join(OUT_DIR, filename);

  if (await exists(dest)) {
    return { name: filename, status: "skipped (exists)" };
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      Referer: "https://www.facemyunga.com/",
    },
  });
  if (!res.ok) {
    return { name: filename, status: `FAIL ${res.status}` };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return { name: filename, status: "ok", size: buf.length };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`→ ${OUT_DIR}`);
  console.log(`Downloading ${IMAGES.length} images...\n`);

  const results = [];
  // Run in parallel (cap concurrency at 8)
  const queue = [...IMAGES];
  const workers = Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        const r = await download(item);
        results.push(r);
        const tag =
          r.status === "ok"
            ? `OK ${(r.size / 1024).toFixed(0)}KB`
            : r.status;
        console.log(`  ${tag.padEnd(18)} ${r.name}`);
      } catch (e) {
        results.push({ name: item.name, status: `ERR ${e.message}` });
        console.log(`  ERR                ${item.name}.${item.ext} :: ${e.message}`);
      }
    }
  });
  await Promise.all(workers);

  const ok = results.filter((r) => r.status === "ok").length;
  const skip = results.filter((r) => r.status.includes("skipped")).length;
  const fail = results.length - ok - skip;
  console.log(`\n${ok} ok / ${skip} skipped / ${fail} failed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
