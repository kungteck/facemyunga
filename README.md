# 강남페이스명가 — Next.js One-Pager

30년 경력 강희석 원장의 회귀 관리 브랜드 단일 페이지 사이트.

> 제작 표준 인프라는 [`PLAYBOOK.md`](./PLAYBOOK.md) 참고. 이 저장소가 그 표준의 레퍼런스 구현이다.

## Stack

- **Framework**: Next.js 16 (App Router) — 정적 export (`output: "export"` → `out/`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@theme inline` 토큰 → `src/app/globals.css`)
- **Font**: Pretendard (`@fontsource/pretendard`, 400/500/600/700 셀프 호스팅)
- **Icons**: lucide-react
- **Hosting**: **Cloudflare Pages** (Vercel은 상업적 용도 제한으로 사용하지 않음)
- **CI/CD**: GitHub Actions → Cloudflare Pages (`main` 브랜치 push 시 자동 배포)

## Key Features

- **BeforeAfterSlider** — face-anchor 자동 정렬. 사진별 얼굴 중심 `y` / 높이 `h` / `zoom` 을 입력하면 컴포넌트가 `scale` + `translate` 를 계산해 전·후 얼굴을 같은 위치·크기로 맞춘다.
- 모바일 우선 **Hero 순서 재배치** — CSS `contents` + `order-*` 로 같은 마크업이 모바일/데스크탑 두 레이아웃을 동시 지원
- 모바일 **sticky 하단 CTA 바** (전화 / 카카오톡 / 예약) + 플로팅 카카오 버튼 + BackToTop
- **MobileMenu** 햄버거 드로어 (backdrop · ESC · 스크롤 잠금)
- 단일 그림자 티어(`--shadow-card-float`), Sage Green + Warm Gold 팔레트

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 빌드 → ./out
```

> ⚠️ 이 Next.js 16은 학습 데이터의 관례와 다를 수 있다. 코드 작성 전
> `node_modules/next/dist/docs/` 의 해당 가이드를 먼저 확인할 것 (`AGENTS.md`).

## Project Structure

```
src/
  app/
    layout.tsx     # metadata, html lang="ko"
    page.tsx       # 단일 페이지 (모든 섹션)
    globals.css    # Tailwind v4 import + @theme 토큰 + @layer components
  components/
    BeforeAfterSlider.tsx   # 'use client' — face-anchor 전/후 비교 슬라이더
    MobileMenu.tsx          # 'use client' — 햄버거 드로어
    BackToTop.tsx           # 'use client' — 상단 이동 버튼
public/
  images/
    wix/       # 기존 wix.com 사이트에서 마이그레이션한 이미지
    custom/    # 클라이언트(사장님) 제공 이미지 (hero / doctor / treatment)
scripts/
  download-wix-images.mjs   # wix CDN 이미지 일괄 다운로드 스크립트
AGENTS.md / CLAUDE.md       # AI 어시스턴트 작업 가이드
PLAYBOOK.md                 # 홈페이지 제작 표준 인프라 문서
```

## Deploy

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드 후 자동 배포한다.

```bash
git push origin main   # → GitHub Actions → Cloudflare Pages
```

- 배포 URL: `https://facemyunga.pages.dev` (커스텀 도메인 연결 시 해당 도메인)
- 로컬 수동 배포: `npm run deploy` (wrangler, `npx wrangler login` 1회 필요)
- 필요한 GitHub Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## 문의 창구 (2026-09 기준)

간편 문의 폼(Web3Forms)은 **제거**했고, 예약 상담 카드의 버튼 3개로 대체했다.

- 전화 (`tel:`) · 카카오톡 오픈채팅 · 네이버 톡톡
- 톡톡 URL 은 `src/content/site.json` 의 `contact.naverTalkUrl` — `/admin` 에서 수정 가능
- 폼 컴포넌트가 다시 필요하면 git 이력의 `src/components/ContactForm.tsx` 에서 복구

> 참고: 네이버 톡톡은 고객이 네이버 로그인을 해야 대화가 시작된다. 로그인을 꺼리는
> 고객을 위해 전화·카카오톡 버튼을 함께 남겨둔 구성이다.

---

Built with [Claude Code](https://claude.com/claude-code).
