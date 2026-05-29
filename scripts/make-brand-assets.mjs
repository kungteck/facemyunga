#!/usr/bin/env node
/**
 * Generate brand assets from code (NOT AI image generation):
 *   - public/og-image.png   1200x630  (KakaoTalk / OG share preview)
 *   - public/icon-master.png 512x512  (favicon master → src/app/icon.png)
 *
 * Pure vector (SVG) using brand tokens, rendered to PNG with sharp.
 * Korean text relies on a system font (Malgun Gothic on Windows) via fontconfig.
 *
 * Run:  node scripts/make-brand-assets.mjs
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const KR = "'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#FBF8F3"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1085" cy="115" r="230" fill="#E8F1EB" opacity="0.7"/>
  <circle cx="110" cy="565" r="190" fill="#F4ECDC" opacity="0.7"/>
  <rect x="0" y="0" width="12" height="630" fill="#4A8B61"/>
  <text x="96" y="150" font-family="${KR}" font-size="25" font-weight="700" fill="#A88B53" letter-spacing="5">SIGNATURE · 천안</text>
  <text x="94" y="288" font-family="${KR}" font-size="96" font-weight="700" fill="#1A1A1A" letter-spacing="-2">강남페이스명가</text>
  <rect x="98" y="320" width="124" height="9" rx="4" fill="#4A8B61"/>
  <text x="96" y="412" font-family="${KR}" font-size="40" font-weight="600" fill="#3F3F3F">30년 경력 강희석 원장의 회귀 관리</text>
  <text x="96" y="474" font-family="${KR}" font-size="29" font-weight="500" fill="#6A6A6A">얼굴 윤곽 · 비대칭 · 1:1 책임 관리</text>
  <rect x="96" y="522" width="290" height="58" rx="29" fill="#4A8B61"/>
  <text x="241" y="560" font-family="${KR}" font-size="29" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">041-567-0341</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="116" fill="#4A8B61"/>
  <text x="258" y="382" font-family="'Segoe UI','Helvetica Neue',Arial,${KR}" font-size="340" font-weight="700" fill="#FFFFFF" text-anchor="middle">F</text>
  <circle cx="398" cy="138" r="28" fill="#C9A96E"/>
</svg>`;

async function run() {
  await sharp(Buffer.from(og)).png().toFile(join(ROOT, "public/og-image.png"));
  await sharp(Buffer.from(icon))
    .png()
    .toFile(join(ROOT, "public/icon-master.png"));
  console.log("Wrote public/og-image.png (1200x630) and public/icon-master.png (512x512)");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
