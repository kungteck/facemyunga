# 홈페이지 제작 표준 인프라 (B2C 단일 페이지)

> 강남페이스명가 프로젝트에서 정립한 스택. 앞으로 일반 소비자 대상 홈페이지를
> 만들 때 이 문서가 기본 뼈대다. 새 프로젝트는 이 문서를 그대로 따라가면 된다.

**대상:** 한국 자영업/소상공인 (병원, 살롱, 학원, 카페, 공방 등)
**결과물:** 정적 단일 페이지 사이트 (one-pager), 모바일 우선
**운영비:** **월 0원** (도메인 사면 연 ~15,000원만 추가)

---

## 1. 비용 요약

| 항목 | 서비스 | 비용 |
|---|---|---|
| 코드 저장소 | GitHub | 무료 |
| 호스팅 | Cloudflare Pages | 무료 (대역폭/요청 무제한, 상업용 OK) |
| 자동 배포 | GitHub Actions | 무료 (월 2,000분, 정적 사이트는 분당 ~1분) |
| 이메일 폼 | Web3Forms | 무료 (월 1,000건) |
| 폰트 | @fontsource/pretendard | 무료 (npm 패키지) |
| 아이콘 | lucide-react | 무료 |
| 이메일 알림 | Gmail 푸시 | 무료 |
| 도메인 (선택) | Cloudflare Registrar | 연 ~$10~12 (`.com` 기준 원가) |
| **총 운영비** | | **₩0/월** |

> Vercel은 상업적 용도 제한이 있어 **사용 금지**. 항상 Cloudflare Pages.

---

## 2. 기술 스택

| 레이어 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **Next.js (App Router)** + Turbopack | 정적 export 가능, 한국에서 가장 흔함 |
| 언어 | **TypeScript** | 자동완성/타입 안전 |
| 스타일 | **Tailwind CSS v4** | `@theme inline` 토큰으로 디자인 시스템화 |
| UI 라이브러리 | 없음 | shadcn/ui 등 안 씀. Tailwind + 직접 작성 |
| 아이콘 | **lucide-react** | 가벼움, 의료/뷰티/리테일 다 커버 |
| 폰트 | **@fontsource/pretendard** | 한글 최적화, 가변 폰트, npm로 셀프 호스팅 |
| 빌드 출력 | **`output: "export"`** | 정적 HTML/CSS/JS 만 (`out/` 폴더) → 정적 호스트 어디든 |

### 핵심 next.config.ts

```ts
export default {
  output: "export",
  images: { unoptimized: true }, // export 모드에선 필수
  trailingSlash: true,             // Cloudflare Pages 호환
};
```

### package.json scripts (표준)

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "deploy": "next build && wrangler pages deploy out --project-name=<PROJECT> --branch=main --commit-dirty=true"
}
```

---

## 3. 인프라 / 배포 플로우

```
로컬 코드
  │ git push origin main
  ▼
GitHub repo (kungteck/<project>)
  │ webhook trigger
  ▼
GitHub Actions (.github/workflows/deploy.yml)
  │ 1. npm ci
  │ 2. next build → ./out
  │ 3. wrangler pages deploy out
  ▼
Cloudflare Pages
  │
  ▼
https://<project>.pages.dev/  (즉시 반영, 보통 1~2분)
```

### 필요한 GitHub Secrets (Settings → Secrets and variables → Actions)

| 시크릿 이름 | 어디서 받음 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare 대시보드 → My Profile → API Tokens → "Edit Cloudflare Workers" 템플릿 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 대시보드 우측 사이드바 (Account ID) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` *(폼 쓸 때)* | https://web3forms.com/ 에서 이메일 인증으로 발급 |

### 표준 deploy.yml

```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_WEB3FORMS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_KEY }}
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=<PROJECT> --branch=main --commit-dirty=true
```

### Cloudflare Pages 프로젝트 사전 생성

`wrangler pages deploy`는 프로젝트가 존재해야 작동. 한 번만:

```bash
npx wrangler login           # 브라우저 인증 1회
npx wrangler pages project create <PROJECT> --production-branch=main
```

---

## 4. 디자인 시스템

### DESIGN.md (각 프로젝트 루트에 위치)

색/타이포/스페이싱/그림자 토큰을 정의. Tailwind v4의 `@theme inline`로
`globals.css`에 매핑해 `bg-primary` 같은 유틸로 바로 사용.

### 강남페이스명가 기준 톤 (Airbnb 영감)

- 메인 색: 채도 낮은 톤 1개 (예: Sage Green `#4A8B61`)
- 액센트: 따뜻한 골드 1개 (예: `#C9A96E`) — "Signature" 강조용
- 텍스트: `#1A1A1A` / `#3F3F3F` / `#6A6A6A` 3단계
- 배경: 흰색 + `#FAFAF8` warm 톤
- 그림자: 1단계만 (`--shadow-card-float`) — 과한 그림자 금지
- 라운드: `8 / 14 / 20 / 32px`
- 폰트: Pretendard (한글 가독성 최고)

### 컴포넌트 클래스 패턴 (globals.css `@layer components`)

```css
.btn-primary, .btn-secondary, .btn-gold, .btn-kakao,
.btn-pill-primary, .card-base, .trust-badge, .signature-badge
```

→ 페이지 코드는 `<button className="btn-primary">` 식으로 간결하게.

---

## 5. 표준 페이지 구조 (One-pager)

이 순서가 한국 자영업 대상 가장 잘 먹힘:

1. **TOP NAV** (sticky) — 로고 / 메뉴 / 전화·CTA / 햄버거(모바일)
2. **HERO** — 헤드라인 + 부제 + CTA 2개 + 메인 이미지 + 신뢰 뱃지
3. **BRAND STORY** — 원장/대표 1인칭 내러티브, 포트레이트 이미지
4. **SELF-CHECK / 자가진단** *(의료·건강 분야 한정)* — YouTube 임베드 + 체크리스트
5. **TREATMENTS / 서비스 그리드** — 카드 2~4개, 가격·소요시간 명시
6. **SIGNATURE** — 시그니처 상품 1개 + 5단계 프로세스 + 풀패키지 가격
7. **BEFORE & AFTER** *(시술/뷰티 한정)* — 드래그 비교 슬라이더
8. **REVIEWS** — 별점 + 3~6개 후기 카드
9. **CONTACT** — 주소/시간/전화 + 폼 + 지도
10. **FOOTER** — 로고, 시술 링크, 연락처, 사업자등록번호
11. **FIXED OVERLAYS** — 모바일 하단 sticky CTA(전화/카톡/예약), 플로팅 카톡 버튼, BackToTop

---

## 6. 표준 재사용 컴포넌트 (`src/components/`)

| 컴포넌트 | 용도 | 비고 |
|---|---|---|
| `BeforeAfterSlider.tsx` | 시술 전/후 드래그 비교 | **face-anchor 시스템** — 사진별 얼굴 위치 `y/h/zoom` 입력하면 자동 정렬 |
| `MobileMenu.tsx` | 모바일 햄버거 드로어 | 슬라이드 인 + 백드롭 + ESC + 스크롤 잠금 |
| `BackToTop.tsx` | 스크롤 후 상단 이동 버튼 | 400px 스크롤 후 페이드인 |
| `ContactForm.tsx` | 간편 문의 폼 | Web3Forms 연동, honeypot 스팸 방지, 성공/실패 상태 UI |

새 프로젝트 시작 시 이 4개는 **복붙해서 시작**한다.

---

## 7. 한국 시장 특화 패턴

### 통화 표기
```ts
const KRW = (n: number) => `${n.toLocaleString("ko-KR")}원`;
// 50000 → "50,000원"
```
숫자에 항상 `tabular-nums` 클래스 (자릿수 흔들림 방지).

### 전화 링크
```tsx
<a href="tel:041-567-0341" className="tabular-nums">041-567-0341</a>
```
모바일에서 탭하면 통화앱 바로 열림.

### 카카오톡 채널 연동
- **현재 상태:** placeholder `#kakao` 로 둠
- **실제 연동:**
  1. https://business.kakao.com/ 에서 채널 생성 (사업자등록증 필요)
  2. 채널 URL 받음 (`https://pf.kakao.com/_XXXXX`)
  3. 페이지의 모든 `href="#kakao"` 를 그 URL로 교체
- **카카오 알림톡 발송**(폼 → 카톡 자동 전송)은 별도 — 솔라피/NHN Toast 등 유료 서비스 필요

### 네이버 지도 임베드
- 현재 placeholder 박스만 있음
- 실제 연동: 네이버 지도 → 해당 위치 → 공유 → "URL 복사" 또는 "임베드용 코드" → iframe 삽입
- API 키 불필요한 단순 임베드면 charge 없음

### 의료/뷰티 — 의료법 준수 어휘
경락/지압/안마 → **관리/케어**로 치환 (의료기사법 위반 회피).
"치료"는 의료기관만 가능 — 일반 살롱은 "관리/케어/프로그램"으로.

### 모바일 우선 패턴 — Hero 섹션 순서 뒤집기
데스크탑은 좌측 텍스트 / 우측 이미지가 일반적이지만, 모바일에선 이미지가
먼저 보여야 임팩트 있음. CSS `display: contents` + `order-*` 유틸로 같은 컴포넌트가
두 레이아웃을 동시에 지원:

```tsx
<div className="contents lg:block lg:order-1">
  <div className="order-4 lg:order-none">{/* badges */}</div>
  <h1 className="order-2 lg:order-none">{/* headline */}</h1>
  <p className="order-3 lg:order-none">{/* subtitle */}</p>
  ...
</div>
```

### sticky 헤더 + 해시 네비
앵커 링크(`#about`)가 sticky 헤더 밑으로 가려지는 문제 — `globals.css`에:
```css
section[id] { scroll-margin-top: 80px; }
```

---

## 8. 외부 연동

### YouTube 임베드 (privacy-enhanced)
```tsx
<iframe
  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  className="w-full h-full"
/>
```
- `youtube-nocookie.com` 도메인 = 쿠키 없이 임베드 (GDPR/한국 개인정보보호 친화)
- `rel=0` = 다른 채널 추천영상 안 뜸
- `modestbranding=1` = YouTube 로고 최소화

### 폼 → 이메일 (Web3Forms)
- 키 발급: https://web3forms.com/ (이메일 인증 1회)
- 무료 1,000건/월
- `ContactForm.tsx` 가 이미 연동 코드 포함 — 환경변수만 채우면 됨
- 받는 곳: Gmail (`fynestainc@gmail.com` 또는 클라이언트 이메일)
- 모바일에서 Gmail 앱 푸시 켜두면 = SMS와 체감 동일

### 폼 → SMS (※ 한국은 무료 불가)
- 발신번호 사전등록제(KISA) 때문에 무료 SMS는 사실상 불가능
- 필요시 **솔라피(Solapi)** — 사업자등록 + 발신번호 등록 후 건당 9원
- 또는 **카카오 알림톡** (비즈니스 채널 + 사업자등록)
- **Default 권장:** Gmail 푸시로 갈음

### 이미지 호스팅
- 모두 `/public/images/` 로컬 호스팅 (CDN은 Cloudflare가 자동 처리)
- 외부 CDN(Cloudinary 등) 안 씀 — 정적 export + Cloudflare로 충분
- AI 생성 이미지(Pollinations 등) **사용 금지** — 클라이언트가 거부할 확률 매우 높음
- 클라이언트가 제공한 사진 사용. 없으면 Unsplash(상업적 사용 OK) 또는 유료 스톡

---

## 9. 새 프로젝트 시작 체크리스트

### Day 0 — 셋업 (30분)
- [ ] `npx create-next-app@latest <project> --typescript --tailwind --app --turbopack`
- [ ] `package.json` 의존성 추가: `lucide-react`, `@fontsource/pretendard`
- [ ] `next.config.ts` 에 `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`
- [ ] `globals.css` — 강남페이스명가 토큰 복붙 후 브랜드 색만 교체
- [ ] `DESIGN.md` 작성 (브랜드 색 가이드)
- [ ] `src/components/` 에 BeforeAfterSlider, MobileMenu, BackToTop, ContactForm 복붙
- [ ] GitHub repo 생성 (`gh repo create kungteck/<project> --private`)
- [ ] Cloudflare Pages 프로젝트 생성 (`npx wrangler pages project create <project> --production-branch=main`)
- [ ] `.github/workflows/deploy.yml` 작성 (위 표준 yml 복붙, 프로젝트명만 교체)
- [ ] GitHub Secrets 등록: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

### Day 1 — 컨텐츠 (이미지/카피 받기)
- [ ] 클라이언트 미팅: 로고, 사진, 후기, 시술/메뉴 목록, 전화·주소·운영시간 수집
- [ ] **사진 퀄리티 확인** — 흐릿하거나 잘린 사진은 미리 재요청. AI 생성으로 채우지 말 것
- [ ] 의료/건강 분야면 카피에 의료법 위반 단어 없는지 검수

### Day 2~3 — 페이지 빌드
- [ ] `src/app/page.tsx` 표준 구조대로 섹션 채우기
- [ ] BeforeAfterSlider 면 각 사진의 face-anchor `y/h/zoom` 수동 측정
- [ ] 모바일 / 데스크탑 둘 다 실기기에서 확인 (특히 hero 순서, sticky CTA 겹침)
- [ ] `npm run build` 통과 확인

### Day 4 — 폼/연동
- [ ] Web3Forms 키 발급 → GitHub Secret 등록
- [ ] 카카오톡 채널 URL 받아서 모든 `#kakao` 교체
- [ ] 네이버 지도 임베드 코드 삽입
- [ ] 폼 직접 한 번 제출해서 메일 수신 확인

### Day 5 — 배포·도메인
- [ ] `git push origin main` → 자동 배포
- [ ] `<project>.pages.dev` 에서 동작 확인
- [ ] 도메인 사면 Cloudflare Pages → Custom Domains 에서 연결 (DNS는 Cloudflare가 자동)
- [ ] 클라이언트에게 URL 공유

---

## 10. SEO / 메타 (기본만, 과하지 않게)

`src/app/layout.tsx` 의 `metadata` 객체:

```ts
export const metadata: Metadata = {
  title: "강남페이스명가 | 30년 경력 강희석 원장의 1:1 책임 관리",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    images: ["/images/og-image.jpg"], // 1200x630
    locale: "ko_KR",
    type: "website",
  },
  // (선택) robots, alternates, etc.
};
```

- OG 이미지(1200x630) 만들어 두면 카톡 공유 시 미리보기 나옴 — 한국에서 매우 중요
- 네이버 서치어드바이저 / 구글 서치 콘솔 등록은 도메인 붙인 후

---

## 11. 자주 만나는 함정 (Gotchas)

| 문제 | 원인 / 해결 |
|---|---|
| `next/image` 로컬 외부 도메인 에러 | export 모드는 `images: { unoptimized: true }` 필수 |
| `wrangler pages deploy` "project not found" | Pages 프로젝트를 먼저 `pages project create` 로 생성 |
| Vercel 무심코 연결됨 | 상업적 용도 위배. Cloudflare로 즉시 이전 |
| Wix CDN 이미지 다운로드 시 400 에러 | URL에 `fit/w_2000,h_2000` 둘 다 명시. `fill` 모드는 정사각 크롭됨 — 비율 보존하려면 `fit` |
| 한글 폰트 깨짐 | Pretendard 4 단계(400/500/600/700) 다 import 했는지 확인 |
| BeforeAfter 슬라이더에서 이미지가 드래그됨 | `draggable={false}`, `onDragStart={e=>e.preventDefault()}`, `pointer-events-none` 모두 적용 |
| 모바일 hero 이미지가 너무 큼 | Hero를 split layout(텍스트+이미지)로 짜되 모바일에선 이미지 `aspect-[4/5]` 정도로 제한 |
| PowerShell로 한글 파일 다룰 때 깨짐 | `[System.Text.Encoding]::UTF8` 명시 사용 |
| 햄버거 메뉴가 안 닫힘 | `MobileMenu` 의 backdrop / ESC / 링크 탭 핸들러 모두 살아있는지 확인 |
| 폼 제출이 "no access key" 에러 | GitHub Secret 이름이 정확히 `NEXT_PUBLIC_WEB3FORMS_KEY` 인지 (NEXT_PUBLIC_ 접두사 필수) |

---

## 12. 디렉토리 구조 (표준)

```
<project>/
├── .github/workflows/deploy.yml
├── public/
│   └── images/
│       ├── wix/              # 기존 사이트에서 마이그레이션한 원본
│       └── custom/           # 새로 만들거나 클라이언트가 준 이미지
├── src/
│   ├── app/
│   │   ├── layout.tsx        # metadata, font, html lang="ko"
│   │   ├── page.tsx          # 단일 페이지 (모든 섹션)
│   │   └── globals.css       # Tailwind import + @theme + components
│   └── components/
│       ├── BeforeAfterSlider.tsx
│       ├── MobileMenu.tsx
│       ├── BackToTop.tsx
│       └── ContactForm.tsx
├── AGENTS.md                 # AI 어시스턴트 작업 가이드
├── CLAUDE.md                 # AGENTS.md 임포트
├── DESIGN.md                 # 브랜드 디자인 토큰
├── PLAYBOOK.md               # ← 이 문서
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 13. 미구현 / 향후 개선 (강남페이스명가 기준)

배포된 사이트에서 아직 placeholder인 것들 — 각 클라이언트별로 매번 채워야 함:

- [ ] Web3Forms 키 + GitHub Secret + deploy.yml 의 env 주입
- [ ] 카카오톡 채널 URL (모든 `#kakao` 교체)
- [ ] 네이버 지도 임베드
- [ ] 사업자등록번호 (footer)
- [ ] OG 이미지 (1200x630)
- [ ] favicon (`src/app/icon.png` 또는 `favicon.ico`)
- [ ] 도메인 연결 + Cloudflare DNS
- [ ] (선택) Google Analytics / 네이버 애널리틱스 / Hotjar

---

## 14. 빠른 결정 트리

> 새 클라이언트 미팅에서 즉답해야 할 때

- **"홈페이지 얼마인가요?"** → 운영비 0원. 제작비는 별도 견적 (정해진 만큼만)
- **"수정 자주 가능한가요?"** → 코드 수정 → 자동 배포. 분 단위로 반영
- **"도메인 살까요?"** → 권장. Cloudflare Registrar 가 가장 싸고 안정 (연 ~₩15,000)
- **"카드결제 / 회원가입 / 예약달력 필요해요"** → 이 인프라로는 부족. 별도 상의 (NextJS + DB + 결제 PG 필요, 비용 ↑↑)
- **"AI 이미지로 채워주세요"** → 거절 권장. 위화감 + 신뢰도 하락. 클라이언트 사진 우선
- **"문의가 SMS로 오면 좋겠어요"** → 한국은 무료 불가. Gmail 푸시 알림이 사실상 동일 (디폴트)

---

**Last updated:** 2026-05-17 (강남페이스명가 프로젝트 완료 시점)
