# 강남페이스명가 Next.js Prototype

30년 경력 강희석 원장의 회귀 관리 브랜드 — 프리미엄 페이스 케어 사이트.

🔗 **Live**: https://facemyunga.vercel.app

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 with DESIGN.md tokens
- **Font**: Pretendard Variable (Korean-optimized)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Vercel (auto-deploy from `main`)

## Key Features

- Custom **BeforeAfterSlider** with face-anchor auto-alignment
  - Specify each image's face center & height → component computes scale + translate
  - Per-pair zoom multiplier for fine-tuning
- Mobile-first hero reorder via CSS `contents` + `order-*`
- Sticky bottom CTA bar (전화 / 카카오톡 / 예약) on mobile
- Floating KakaoTalk channel button
- Single-shadow elevation system (DESIGN.md principle)
- Sage Green primary + Warm Gold signature accent

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project Structure

```
src/
  app/
    layout.tsx        # Pretendard + metadata
    page.tsx          # Home page (all sections)
    globals.css       # Tailwind v4 + design tokens
  components/
    BeforeAfterSlider.tsx   # Client component, face-anchor system
public/
  images/
    custom/           # Owner-provided photos (hero, doctor, treatments)
    wix/              # Crawled from existing wix.com site
DESIGN.md             # Airbnb-inspired design system, customized
```

## Deploy

```bash
git push  # auto-deploys to Vercel on main branch
```

---

Built with [Claude Code](https://claude.com/claude-code).
