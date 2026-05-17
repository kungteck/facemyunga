---
version: alpha
name: gangnam-face-design
description: A clean, premium face-care presentation site anchored on a pure white canvas and a single Sage Green voltage (#4A8B61) that carries every primary CTA and brand moment, with a warm gold (#C9A96E) reserved for premium pricing and "Signature" surfaces. Type runs Pretendard Variable at modest weights — display sits at 22–32px in weight 500/600 rather than the heavy 700+ that medical or clinical sites use; the brand trusts photography (before/after, treatment process, clinic interior) and generous whitespace over typographic muscle. Five top-nav entries (홈/소개/시술/결과/연락) with no badges or icons — restrained navigation that signals trust and clarity over feature density. Pill-shaped CTAs (`{rounded.full}`), softly rounded treatment cards (`{rounded.lg}` ~14px), and 32px section radii read as warm and human — there is no hard corner anywhere except the body grid. Mobile-first: a sticky bottom "전화 / 카카오톡 / 예약" tri-CTA bar and a floating KakaoTalk channel button are the two persistent conversion surfaces.

colors:
  primary: "#4A8B61"
  primary-hover: "#3D7350"
  primary-active: "#2F5A3F"
  primary-soft: "#E8F1EB"
  primary-disabled: "#C5DACD"
  accent-gold: "#C9A96E"
  accent-gold-soft: "#F4ECDC"
  accent-gold-active: "#A88B53"
  ink: "#1A1A1A"
  body: "#3F3F3F"
  muted: "#6A6A6A"
  muted-soft: "#929292"
  hairline: "#E5E5E5"
  hairline-soft: "#F0F0F0"
  border-strong: "#C1C1C1"
  canvas: "#FFFFFF"
  surface-soft: "#FAFAF8"
  surface-card: "#FFFFFF"
  surface-strong: "#F4F2EE"
  surface-warm: "#FBF8F3"
  on-primary: "#FFFFFF"
  on-accent: "#FFFFFF"
  on-dark: "#FFFFFF"
  star-rating: "#C9A96E"
  error: "#C13515"
  error-hover: "#B32505"
  success: "#2F7A4F"
  kakao-yellow: "#FEE500"
  kakao-ink: "#191919"
  scrim: "#000000"

typography:
  display-xl:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: -0.5px
  display-lg:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: -0.4px
  display-md:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.3px
  display-sm:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: -0.2px
  title-md:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.1px
  title-sm:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0
  rating-display:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1.5px
  price-display:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.20
    letterSpacing: -0.5px
  body-md:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0
  caption-sm:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  badge:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0.2px
  micro-label:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0
  uppercase-tag:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.30
    letterSpacing: 0.8px
    textTransform: uppercase
  button-md:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0
  button-sm:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0
  link:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.50
    letterSpacing: 0
  nav-link:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0
  numeric-tabular:
    fontFamily: "'Pretendard Variable', Pretendard, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.30
    letterSpacing: 0
    fontVariantNumeric: tabular-nums

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 14px
  lg: 20px
  xl: 32px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
    height: 52px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-gold:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
    height: 52px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 13px 27px
    height: 52px
    border: "1px solid {colors.ink}"
  button-tertiary-text:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
  button-pill-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: 12px 24px
  button-kakao:
    backgroundColor: "{colors.kakao-yellow}"
    textColor: "{colors.kakao-ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 14px 24px
    height: 52px
  icon-button-circle:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 40px
  icon-button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: 44px
    border: "1px solid {colors.hairline}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
  nav-link-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
  nav-link-inactive:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
  treatment-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 24px
  treatment-card-photo:
    rounded: "{rounded.md}"
  pricing-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 32px
    border: "1px solid {colors.hairline}"
  pricing-card-signature:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 32px
    border: "1px solid {colors.accent-gold}"
  before-after-slider:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.md}"
    handleColor: "{colors.canvas}"
    handleBorderColor: "{colors.primary}"
  review-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 28px
  review-rating-star:
    color: "{colors.accent-gold}"
  signature-badge:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.accent-gold-active}"
    typography: "{typography.uppercase-tag}"
    rounded: "{rounded.full}"
    padding: 4px 10px
    border: "1px solid {colors.accent-gold}"
  trust-badge:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-active}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  treatment-row:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: 16px 0
  process-step-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 32px
  booking-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 28px
    border: "1px solid {colors.hairline}"
  contact-info-block:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 28px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
    height: 56px
    border: "1px solid {colors.hairline}"
  text-input-focus:
    border: "2px solid {colors.primary}"
  textarea:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
    minHeight: 120px
    border: "1px solid {colors.hairline}"
  sticky-bottom-cta-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-sm}"
    height: 64px
    border: "1px solid {colors.hairline}"
  floating-kakao-button:
    backgroundColor: "{colors.kakao-yellow}"
    textColor: "{colors.kakao-ink}"
    rounded: "{rounded.full}"
    height: 56px
    width: 56px
  hero-overlay-dark:
    backgroundColor: "{colors.scrim}"
    opacity: 0.35
  footer-light:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 64px 80px 32px
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
  legal-band:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.caption-sm}"
---

## Overview

강남페이스명가 is a 30-year owner-led face-care brand. The design system must read as **trustworthy, premium, and calm** without slipping into clinical/medical territory (Korean medical-law compliance) or generic wellness. The base canvas is **pure white** (`{colors.canvas}` — #FFFFFF) with near-black ink (`{colors.ink}` — #1A1A1A) for headlines and body, and a single voltage of **Sage Green** (`{colors.primary}` — #4A8B61) carrying every primary CTA, brand wordmark moments, and the active nav-link underline. A second restrained accent — **Warm Gold** (`{colors.accent-gold}` — #C9A96E) — is reserved for **Signature** moments only: the signature treatment ("회귀 관리") pricing card, star ratings, and gold-bordered premium surfaces. Gold should never carry a primary CTA — that is reserved for green.

Type runs **Pretendard Variable** (the de-facto modern Korean web font), with system stacks underneath. Pretendard sits at modest weights — display headlines render at 22–32px in weight 500–600, not the heavy 700+ weights that clinical or financial sites lean on. The hero h1 on the homepage is just 32px / 600 (Korean text appears optically smaller than Latin at the same size, so 32px is the equivalent of ~28px Cereal), which works because the layout leans on photography (clinic interior, treatment process, before/after) for visual weight rather than typographic muscle.

The shape language is **soft**. Buttons are 8px radius (`{rounded.sm}`), treatment cards are ~14px (`{rounded.md}`), pricing and booking cards are 20px (`{rounded.lg}`), the KakaoTalk floating button and pill CTAs are fully circular (`{rounded.full}`). There is essentially no hard corner anywhere except the body grid itself — every interactive element is rounded. The radius hierarchy widens (8 → 14 → 20 → full) as elements get larger; small chips stay tight, big cards breathe.

**Key Characteristics:**
- **Single primary color**: `{colors.primary}` (#4A8B61 — "Sage Green") carries every primary CTA, the brand wordmark, the active nav underline, and the focus ring. Used scarcely — most pages are 90% white + ink with one or two Sage moments per fold.
- **Sub-accent for premium**: `{colors.accent-gold}` (#C9A96E — "Warm Gold") reserved for Signature treatment surfaces, star ratings, and "프리미엄" labels. Never carries primary CTA.
- **Modern Korean typography**: `Pretendard Variable`. Display weights sit at 500–600, body at 400. Modest weight is intentional — the system trusts photography for visual heft.
- **Restrained top nav**: five labels (홈 / 소개 / 시술 / 결과 / 연락), no icons, no badges. The brand wordmark sits flush left, account/utility area is minimal; the eye should land on the hero image and the primary CTA.
- **Persistent mobile conversion**: a 64px sticky bottom CTA bar (전화 / 카카오톡 / 예약) on mobile, plus a floating KakaoTalk channel orb above it. Desktop drops the bottom bar; the floating Kakao orb stays.
- **Photo-first cards**: treatment cards, before/after entries, and reviews all lead with a 4:5 or 1:1 photo plate at `{rounded.md}` corner clipping, followed by a short meta block beneath.
- **Editorial pricing**: prices are not screaming. Standard treatments use `{component.pricing-card}` (white, 1px hairline). Only the Signature treatment uses `{component.pricing-card-signature}` (warm-cream fill, gold 1px border) — this is the single typographically loud commercial moment.
- **One shadow tier**: `box-shadow: rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0` — used on hover-floated cards, dropdowns, and the booking card. No multi-tier elevation; depth comes from photography and white-on-cream surface separation.
- **4px / 8px spacing system**, with major sections at `{spacing.section}` (80px) — a touch more breathing room than marketplace sites (64px) because we want the page to read as editorial-magazine premium rather than dense commerce.

## Colors

### Brand & Accent
- **Sage Green** (`{colors.primary}` — #4A8B61): The single primary brand color. Used for primary CTA backgrounds (예약, 상담 신청, 더보기), the brand wordmark, the active nav-link underline, focus rings, and the before/after slider handle border. The recognizable color of 강남페이스명가.
- **Sage Green Hover** (`{colors.primary-hover}` — #3D7350): The hover state — slightly darker. Used on `{component.button-primary-hover}`.
- **Sage Green Active** (`{colors.primary-active}` — #2F5A3F): The pressed / pointer-down variant — deeper still. Also used for trust-badge text (#trust-badge).
- **Sage Soft** (`{colors.primary-soft}` — #E8F1EB): A pale tint used as the trust-badge background ("30년 경력", "1:1 책임관리") and as a subtle fill on hover-able tertiary surfaces.
- **Sage Disabled** (`{colors.primary-disabled}` — #C5DACD): Pale tint for disabled CTAs.
- **Warm Gold** (`{colors.accent-gold}` — #C9A96E): Sub-accent reserved for premium/signature surfaces. Used as the border on `{component.pricing-card-signature}`, the fill on review star ratings (`{component.review-rating-star}`), and the text color on `{component.signature-badge}`. **Never used as a primary CTA fill.**
- **Gold Soft** (`{colors.accent-gold-soft}` — #F4ECDC): Background tint for signature pricing cards and gold-toned editorial bands.
- **Gold Active** (`{colors.accent-gold-active}` — #A88B53): Used for high-contrast text inside gold pills (the signature-badge text).

### Surface
- **Canvas** (`{colors.canvas}` — #FFFFFF): The default page floor for every page. There is no dark mode on the public site.
- **Surface Soft** (`{colors.surface-soft}` — #FAFAF8): The lightest off-white fill — barely off-pure. Used on the footer, on disabled fields, on the contact info block, and as the page floor on About / Contact pages (where the page wants to feel slightly warmer than the home page).
- **Surface Strong** (`{colors.surface-strong}` — #F4F2EE): A warmer cream fill used as the icon-button surface and as a section-divider band.
- **Surface Warm** (`{colors.surface-warm}` — #FBF8F3): The cream tint used inside the Signature pricing card — distinguishes it from the standard white cards without shouting.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #E5E5E5): The default 1px border tone — card borders, input outlines, footer column splitters, treatment-row separators.
- **Hairline Soft** (`{colors.hairline-soft}` — #F0F0F0): A lighter divider used on long-scrolling editorial body separators and tab strips.
- **Border Strong** (`{colors.border-strong}` — #C1C1C1): A heavier stroke used on disabled outline buttons.

### Text
- **Ink** (`{colors.ink}` — #1A1A1A): The dominant text color on light surfaces. Display headlines, body paragraphs, primary nav links, prices. Never pure black — slight warmth keeps it from feeling clinical.
- **Body** (`{colors.body}` — #3F3F3F): A secondary running-text color used inside long-form treatment descriptions, About copy, and footer link labels.
- **Muted** (`{colors.muted}` — #6A6A6A): Sub-titles on treatment cards ("소요 시간 50분"), inactive nav labels, "자세히 보기" tertiary links, footer category sub-labels.
- **Muted Soft** (`{colors.muted-soft}` — #929292): Disabled link text and very low-emphasis metadata (legal microcopy). Used very sparingly.
- **Star Rating** (`{colors.star-rating}` — #C9A96E): Star icons inside review cards render in Warm Gold — not yellow (cheap), not gray (cold). Gold reinforces the premium tone.
- **On Primary** (`{colors.on-primary}` — #FFFFFF): White text on Sage Green CTAs.
- **On Accent** (`{colors.on-accent}` — #FFFFFF): White text on Warm Gold surfaces (rare — gold rarely carries a button).

### Semantic
- **Error** (`{colors.error}` — #C13515): Inline error text for form validation.
- **Error Hover** (`{colors.error-hover}` — #B32505): Darkens on link hover.
- **Success** (`{colors.success}` — #2F7A4F): Form-submit success state ("예약 신청이 접수되었습니다"). A deeper, less saturated green than primary — distinct enough to read as feedback rather than brand.

### Platform / Channel
- **Kakao Yellow** (`{colors.kakao-yellow}` — #FEE500): The official KakaoTalk brand yellow. Used on `{component.button-kakao}` and `{component.floating-kakao-button}`. Do not tweak — match Kakao's brand guideline exactly so users recognize it instantly.
- **Kakao Ink** (`{colors.kakao-ink}` — #191919): The contrast text on Kakao yellow. Slightly different from main ink to match Kakao's tone.

### Scrim
- **Scrim** (`{colors.scrim}` — #000000 at 35% opacity): The modal backdrop and hero-image dark overlay. Stored as base hex; opacity applied at render time. 35% is lighter than the typical 50% — keeps hero photos legible behind text overlays without going too murky.

## Typography

### Font Family
The system runs **Pretendard Variable** for everything — display, body, navigation, captions, microcopy, prices. Fallback walks `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif`. Pretendard is a variable font — load a single woff2 (`Pretendard-Variable.woff2`) and use weight `400–700` interchangeably without extra weight files.

There is no separate display family. The variable font carries the entire scale, including the rating display and price display.

### Why Pretendard
- Modern Korean font with consistent stroke weight (matches Latin sans-serif optical sizing).
- Variable — single file covers 400–700, smaller download than separate weights.
- Open license (SIL Open Font), no licensing concerns.
- Renders cleanly on both Windows (cleartype) and macOS — historic problem area for Korean fonts.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.rating-display}` | 56px | 700 | 1.1 | -1.5px | Listing-level overall rating display ("4.8") |
| `{typography.price-display}` | 28px | 700 | 1.20 | -0.5px | Treatment price headline ("80,000원") |
| `{typography.display-xl}` | 32px | 600 | 1.30 | -0.5px | Homepage hero h1 ("당신의 본연을 되찾는 시간") |
| `{typography.display-lg}` | 26px | 600 | 1.30 | -0.4px | Page-level h1 inside About/Service ("강희석 원장의 30년") |
| `{typography.display-md}` | 22px | 600 | 1.35 | -0.3px | Section heads ("페이스명가만의 회귀 관리") |
| `{typography.display-sm}` | 20px | 600 | 1.40 | -0.2px | Sub-section titles ("관리 프로세스") |
| `{typography.title-md}` | 17px | 600 | 1.45 | -0.1px | Treatment card titles ("얼굴 윤곽 축소") |
| `{typography.title-sm}` | 16px | 500 | 1.45 | 0 | Footer column heads, review author name |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default running text — About, Service descriptions |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Card meta lines, treatment durations, dates |
| `{typography.caption}` | 13px | 500 | 1.45 | 0 | Form-field labels ("이름", "전화번호"), uppercase-adjacent labels |
| `{typography.caption-sm}` | 12px | 400 | 1.40 | 0 | Legal microcopy, footer copyright |
| `{typography.badge}` | 11px | 600 | 1.30 | 0.2px | Trust badges ("30년 경력"), filter chips |
| `{typography.micro-label}` | 12px | 600 | 1.30 | 0 | Step numbers ("STEP 01"), tiny labels |
| `{typography.uppercase-tag}` | 10px | 700 | 1.30 | 0.8px (uppercase) | "SIGNATURE", "NEW" tags |
| `{typography.button-md}` | 16px | 600 | 1.30 | 0 | Primary CTA button labels |
| `{typography.button-sm}` | 14px | 600 | 1.30 | 0 | Secondary / pill button labels |
| `{typography.link}` | 14px | 500 | 1.50 | 0 | Inline body links, "자세히 보기" |
| `{typography.nav-link}` | 15px | 500 | 1.30 | 0 | Top nav labels (홈, 소개, 시술, 결과, 연락) |
| `{typography.numeric-tabular}` | 14px | 500 | 1.30 | 0 | Tabular numerics — phone numbers, prices in tables, business hours |

### Principles
Display weights stay modest. The hero h1 at 32px / 600 is deliberately just-large-enough — it sits beneath the hero photograph so the image carries primary visual hierarchy. The section heads at 22px / 600 are even quieter; the white-space and treatment-card grid do the structural work.

The two typographically loud moments in the entire system are:
1. **Rating display** (`{typography.rating-display}` — 56px / 700) on the reviews summary surface.
2. **Price display** (`{typography.price-display}` — 28px / 700) on treatment pricing cards.

Both are peak trust signals — credibility (rating) and commerce clarity (price) — so they earn the loudest treatment. Everywhere else, type stays restrained and photography leads.

Korean numerals use `font-variant-numeric: tabular-nums` (via `{typography.numeric-tabular}`) wherever numbers stack vertically — pricing tables, phone numbers, business hours — so digits align cleanly.

### Note on Font Substitutes
If Pretendard Variable fails to load, the fallback stack hits `Apple SD Gothic Neo` (macOS/iOS), `Noto Sans KR` (Android web), then generic `sans-serif`. All three carry the full Korean glyph set; weight 600 will visibly differ across them (Pretendard is sharper, Noto is softer), but proportions stay readable.

## Layout

### Spacing System
- **Base unit:** 4px (with 2px micro-step).
- **Tokens:** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Section padding (vertical):** `{spacing.section}` (80px) for major page bands; larger than marketplace sites (64px) because this is a presentation site, not a dense commerce surface.
- **Card internal padding:** `{spacing.xl}` (32px) for `{component.pricing-card}`, `{component.process-step-card}`; `{spacing.lg}` (24px) for `{component.treatment-card}`; `{spacing.base}` (16px) for treatment-row spacing.
- **Gutters:** `{spacing.lg}` (24px) between treatment cards in the homepage service grid; `{spacing.xl}` (32px) inside footer column gutters; `{spacing.sm}` (8px) on review-card photo strips.

### Grid & Container
- **Max content width:** 1200px centered on the homepage and editorial pages. Service / Pricing pages cap closer to 1080px to keep paragraphs comfortable to read.
- **Hero section:** full-bleed photograph (no horizontal padding), text and CTA overlay constrained to 1200px max-width and left-aligned at ~80px from the left edge.
- **Treatment grid (homepage):** 3-column grid at desktop, 2-column at tablet, 1-column at mobile. Cells are `{component.treatment-card}` at 4:5 photo ratio.
- **Pricing grid:** 2 or 3 columns at desktop depending on plan count. Signature plan uses `{component.pricing-card-signature}` and may span 1.2× width for emphasis.
- **Footer:** 3-column link list (소개 / 시술 / 연락) at desktop, collapsing to 1-column accordion on mobile.

### Whitespace Philosophy
The system gives editorial bands a generous 80px of vertical breathing room and compresses card grids to 24px gutters. The contrast is intentional: each section reads as its own moment ("hero", then "treatments", then "before/after", then "reviews"), separated by air rather than rules.

## Elevation

The system has essentially **one shadow tier** plus the flat baseline.

- **Flat (no shadow):** Body, hero, footer, all editorial bands — 95% of surfaces.
- **Card hover float:** `box-shadow: rgba(0, 0, 0, 0.02) 0 0 0 1px, rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.1) 0 4px 8px 0` — applied to treatment cards and review cards on pointer hover, the booking card at rest, the floating KakaoTalk orb, and dropdown menus. This is the single shadow definition in the entire system.
- **Sticky-bar separation:** `{component.sticky-bottom-cta-bar}` on mobile uses a single 1px hairline top border + the system shadow to lift it visually off the page above.
- **Modal scrim:** `{colors.scrim}` rendered at 50% opacity — the global modal backdrop. Used on lightbox image viewer, booking form dialog, mobile menu drawer.

There are no progressive elevation tiers — the system either has the one shadow or none. Depth comes from photography, the white-on-cream surface separation, and rounded-corner clipping rather than from layered shadows.

## Components

### Buttons

**`button-primary`** — Sage Green fill, white text, 8px radius, 14×28px padding, 52px height, weight 600. The most common CTA: "예약 상담", "더 보기", "전송", account-flow primaries.

**`button-primary-hover`** — Background darkens to `{colors.primary-hover}`. No transform, no shadow change.

**`button-primary-disabled`** — Pale Sage tint at #C5DACD with white text. Cursor not-allowed.

**`button-gold`** — Warm Gold fill, white text, 8px radius. Used sparingly — only on the Signature pricing CTA ("회귀 관리 예약"). Should not appear more than once per page.

**`button-secondary`** — White fill with ink text and a 1px ink outline. 8px radius. Used for "취소", "이전", and inverse CTAs over Sage surfaces.

**`button-tertiary-text`** — Plain ink text, no surface, no border. Underlined on hover. Used for "자세히 보기" type links.

**`button-pill-primary`** — A pill-shaped Sage CTA used on featured cells (homepage "전체 시술 보기" CTA) — 9999px radius, 12×24px padding, 14px / 600 label.

**`button-kakao`** — KakaoTalk yellow fill (#FEE500), Kakao ink text. Always carries a KakaoTalk speech-bubble icon left-aligned. Used for "카카오톡 상담" CTA. Yellow color is fixed per Kakao brand guideline — do not tint.

### Top Navigation

**`top-nav`** — White surface, 72px height, 1px bottom hairline. Brand wordmark sits flush left, five nav labels sit center-right, primary CTA ("예약 상담") sits flush right.

**`nav-link-active`** — Ink label in `{typography.nav-link}`, with a 2px Sage underline rule beneath the label and a 4px gap. The underline is centered horizontally on the label, not full-width.

**`nav-link-inactive`** — Muted label, no underline. Becomes ink on hover, fully active on click.

### Treatment Cards

**`treatment-card`** — A photo-first card for the service grid. 4:5 aspect-ratio image with `{rounded.md}` corner clipping. Beneath the image: a treatment title (`{typography.title-md}`), a 1-line description (`{typography.body-sm}` muted), and a duration/price row (`{typography.body-sm}` ink). 24px internal padding. On hover, applies the system shadow tier and lifts the photo 2px.

**`treatment-card-photo`** — The photo plate, separated as a token because Before/After surfaces reuse just the photo without the meta block.

### Pricing Cards

**`pricing-card`** — Standard treatment pricing card. White fill, 1px hairline border, 14px radius (`{rounded.md}`), 32px internal padding. Contains: treatment name (`{typography.title-md}`), duration row (`{typography.body-sm}` muted), price (`{typography.price-display}`), "포함 사항" bullet list (`{typography.body-sm}`), then a `{component.button-primary}` full-width at the bottom.

**`pricing-card-signature`** — The Signature plan card ("회귀 관리"). Same structure as `{component.pricing-card}` but with warm-cream fill (`{colors.surface-warm}`), gold 1px border (`{colors.accent-gold}`), and a small `{component.signature-badge}` ("SIGNATURE" or "원장님 직접 진행") positioned top-right of the card. The CTA at the bottom is `{component.button-gold}` instead of `{component.button-primary}`. This is the only place gold carries a CTA.

### Before & After

**`before-after-slider`** — A 4:3 aspect container with a horizontal split. Left half shows the "Before" image, right half shows "After". A vertical handle (`{component.before-after-slider.handleColor}` white, `{component.before-after-slider.handleBorderColor}` 2px Sage) sits at the split point and drags horizontally to reveal more of either side. "BEFORE" and "AFTER" `{typography.uppercase-tag}` labels sit in the top-left and top-right corners with `{colors.scrim}` 50% backgrounds for legibility.

### Reviews

**`review-card`** — White card, 14px radius (`{rounded.md}`), 28px padding. Contains: a 5-star row (`{component.review-rating-star}` gold), the review text (`{typography.body-md}`, max 4 lines with ellipsis), then the author meta row at the bottom (avatar circle + author name in `{typography.title-sm}` + visit date in `{typography.body-sm}` muted). On hover, applies the system shadow tier.

**`review-rating-star`** — A 16×16px gold star SVG. Five stars sit in a row with 2px gap. Empty stars use the same gold tone at 20% opacity so the rating remains readable at a glance.

### Trust & Signature Badges

**`signature-badge`** — A tiny rounded-pill (`{rounded.full}`) with white fill, 1px gold border, and gold text in `{typography.uppercase-tag}` (10px / 700 with 0.8px tracking, uppercase). Anchored top-right of the Signature pricing card. Labels: "SIGNATURE", "PREMIUM", "원장 진행".

**`trust-badge`** — A Sage-soft fill (`{colors.primary-soft}`) pill with Sage-active text in `{typography.badge}`. Used inline next to credibility statements: "30년 경력", "1:1 책임 관리", "100% 책임 관리". Multiple trust badges sit in a row with 8px gap.

### Process Steps

**`process-step-card`** — A white card explaining one step in the management process. 32px padding, 14px radius. Top-left holds a step number in `{typography.micro-label}` ("STEP 01"). Below: step title (`{typography.title-md}`) and 1–2 line body (`{typography.body-md}`). Used in 5-step grids on the Service page.

### Booking

**`booking-card`** — A larger, slightly more elevated card for booking forms or contact CTAs. 20px radius (`{rounded.lg}`), 28px padding, 1px hairline border, system shadow tier. Contains: form heading, input stack, primary CTA full-width, secondary KakaoTalk CTA full-width beneath. Sits as a right-rail on About/Contact desktop pages, or stacks below content on mobile.

### Contact Block

**`contact-info-block`** — A surface-soft block for static contact info (주소, 전화, 운영시간). 14px radius, 28px padding. Each line uses `{typography.body-md}` ink with the label in `{typography.caption}` muted above it.

### Forms

**`text-input`** — White surface, 1px hairline outline, `{rounded.sm}` 8px radius, 56px height, 14×16px padding. Stacked label above (in `{typography.caption}` muted), placeholder text in `{typography.body-md}` muted. On focus, border thickens to 2px Sage (`{component.text-input-focus}`) — no glow, no ring.

**`textarea`** — Same as text-input but with `min-height: 120px` and auto-grow on content. Used in "문의 사항" fields on the Contact form.

### Persistent Mobile CTAs

**`sticky-bottom-cta-bar`** — Mobile-only, sticks to the bottom of the viewport. 64px height, white fill, 1px hairline top border, system shadow. Contains three equal-width cells: "📞 전화" (ink, no fill), "💬 카카오톡" (Kakao yellow fill), "📅 예약" (Sage Green fill). Tapping each fires the respective action: tel:link, Kakao channel deep-link, scroll-to booking section.

**`floating-kakao-button`** — A 56×56px circular Kakao Yellow button with the KakaoTalk speech-bubble icon centered. Floats 24px above the sticky bottom bar on mobile (or 24px from the viewport bottom on desktop) and 24px in from the right edge. Always-on conversion surface. Wraps in the system shadow tier for elevation.

### Hero Overlay

**`hero-overlay-dark`** — A 35% scrim overlay applied over hero images to ensure white text legibility. Sits beneath the hero text and CTA. 35% is light enough to keep the photograph dominant but dense enough to support 32px white text.

### Footer

**`footer-light`** — Surface-soft fill (`{colors.surface-soft}` — a touch warmer than canvas), 64×80px padding top, 32px padding bottom. Three columns of link blocks (소개 / 시술 / 연락처), separated by 32px gutters. Each column heads with a `{typography.title-sm}` ink label and stacks `{component.footer-link}` rows in `{typography.body-sm}` body color.

**`legal-band`** — A bottom strip beneath the footer columns carrying the copyright line, business registration number, and address. All text in muted `{colors.muted}` at `{typography.caption-sm}`. No links here — pure microcopy.

## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 744px | Top nav collapses to logo + hamburger; nav links hide behind a slide-in drawer; treatment cards stack 1-up; pricing cards stack 1-up; review cards stack 1-up; booking card stacks below content; sticky bottom CTA bar appears; floating Kakao orb sits above the bar. |
| Tablet | 744–1128px | Top nav keeps labels but condensed; treatment cards 2-up; pricing cards 2-up; reviews 2-up; booking card stays right-rail at narrower width; sticky bottom CTA hidden; floating Kakao orb stays. |
| Desktop | 1128–1440px | Full top nav, primary CTA right-aligned; treatment cards 3-up; pricing cards 2 or 3-up; reviews 2 or 3-up; booking card sticky right-rail; floating Kakao orb bottom-right. |
| Wide | > 1440px | Content width caps at 1200px on most pages and 1080px on text-heavy pages; gutters absorb the rest. |

### Touch Targets
- Primary CTAs at minimum 52×52px (above WCAG AAA).
- Floating Kakao orb is 56×56px circular — comfortably above AAA.
- Sticky bottom CTA bar cells are 64px tall — easy thumb reach.
- Form inputs are 56px tall — comfortable for Korean mobile keyboards which take ~270px height.

### Collapsing Strategy
- Top nav labels collapse into a hamburger drawer below 744px. The drawer slides in from the right, covers 80% of viewport width, lists labels stacked at 24px gap.
- Treatment / pricing / review grids drop column counts cleanly at each breakpoint — never reflow rows; always reduce columns.
- Booking card switches from sticky right-rail to inline-below-content on mobile; sticky bottom CTA bar takes its persistent-conversion role.
- Hero h1 drops from 32px (desktop) to 26px (tablet) to 22px (mobile) — proportional to viewport, never breaks two lines on mobile.

## Known Gaps

- **Loading states / skeleton screens:** not yet defined. Use a 1px hairline border + `{colors.surface-soft}` fill placeholder shape at the card's final dimensions until content loads.
- **Map view styling:** Naver Map embed for the clinic location — not styled here. Use a minimal pin in `{colors.primary}` to match brand.
- **Form input error states:** error text color (`{colors.error}` — #C13515) is documented, but the full input outline + helper-text combination on validation failure should mirror the `text-input-focus` style with `{colors.error}` substituted for `{colors.primary}`.
- **Lightbox / image viewer:** for Before/After gallery full-screen view, not yet defined. Should use `{colors.scrim}` at 90% opacity behind a centered image with white close-button.
- **Reviews carousel / pagination:** the homepage reviews module's pagination dots and arrow controls are not yet defined; mirror the system's pill / icon-button patterns.
- **Dark mode:** intentionally not designed. The site is a daytime presentation surface; dark mode would not serve the photography-led aesthetic.
