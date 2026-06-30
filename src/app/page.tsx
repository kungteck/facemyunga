import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Calendar,
  Star,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Check,
} from "lucide-react";
import {
  BeforeAfterSlider,
  type ImageAdjust,
} from "@/components/BeforeAfterSlider";
import { BackToTop } from "@/components/BackToTop";
import { MobileMenu } from "@/components/MobileMenu";
import { ContactForm } from "@/components/ContactForm";
import { NaverMap } from "@/components/NaverMap";
import { PromoModal } from "@/components/PromoModal";
import { VideoCarousel } from "@/components/VideoCarousel";
import site from "@/content/site.json";

// 네비게이션은 섹션 id 매핑이라 콘텐츠가 아닌 코드에 고정.
const NAV_LINKS = [
  { label: "홈", href: "#home" },
  { label: "소개", href: "#about" },
  { label: "시술", href: "#treatments" },
  { label: "결과", href: "#results" },
  { label: "리뷰", href: "#reviews" },
  { label: "연락", href: "#contact" },
];

const KRW = (n: number) => `${n.toLocaleString("ko-KR")}원`;

// site.json 의 "\n" 줄바꿈을 <br/> 로 렌더(반응형 br 대신 일반 br).
function nl2br(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

// 브랜드 스토리 본문의 핵심 용어를 굵게 강조(원문 디자인 유지).
function highlightStory(text: string) {
  return text.split(/(얼굴의 귀소본능|회귀 관리)/g).map((part, i) =>
    part === "얼굴의 귀소본능" || part === "회귀 관리" ? (
      <span key={i} className="font-semibold text-ink">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const { contact, hero, brandStory, selfCheck, videos, treatments, signature, beforeAfter, gallery, reviews } = site;

export default function Home() {
  return (
    <>
      <PromoModal />

      {/* ============ TOP NAV ============ */}
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur border-b border-hairline">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10 h-[72px] flex items-center justify-between">
          <Link href="#home" className="flex items-center">
            <Image
              src="/images/wix/logo.png"
              alt="강남페이스명가"
              width={262}
              height={58}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-muted hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${contact.phone1}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              <Phone className="h-4 w-4" /> {contact.phone1}
            </a>
            <a href="#contact" className="btn-pill-primary hidden sm:inline-flex">
              예약 상담
            </a>
            <MobileMenu links={NAV_LINKS} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section
          id="home"
          className="relative bg-gradient-to-br from-surface-warm via-canvas to-primary-soft/50 overflow-hidden"
        >
          {/* Decorative orbs */}
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-soft/60 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent-gold-soft/60 blur-3xl pointer-events-none"
            aria-hidden
          />

          <div className="relative mx-auto max-w-[1200px] px-5 lg:px-10 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-16 lg:items-center">
            {/* Image — mobile order 1 (top) / desktop order 2 (right column) */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-surface-warm shadow-[var(--shadow-card-float)]">
                <Image
                  src={hero.image}
                  alt="페이스 케어 모델"
                  fill
                  priority
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 80vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 bg-canvas/95 backdrop-blur text-accent-gold-active text-[10px] font-bold rounded-full px-3 py-1.5 tracking-[0.08em] uppercase border border-accent-gold">
                    <Sparkles className="h-3 w-3" /> Signature
                  </span>
                </div>
              </div>

              {/* Floating mini info card — desktop only */}
              <div className="hidden lg:flex absolute -bottom-6 -left-6 bg-canvas rounded-[16px] px-5 py-4 shadow-[var(--shadow-card-float)] items-center gap-3 border border-hairline">
                <div className="h-12 w-12 rounded-full bg-accent-gold-soft flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-accent-gold-active" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-tight">{hero.signatureCardTitle}</p>
                  <p className="text-xs text-muted mt-0.5">{hero.signatureCardDesc}</p>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="contents lg:block lg:order-1">
              {/* Badges */}
              <div className="order-4 lg:order-none flex flex-wrap gap-2 lg:mb-6">
                {hero.badges.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-canvas/90 backdrop-blur text-primary-active text-[11px] font-semibold rounded-full px-3 py-1.5 tracking-wide shadow-sm"
                  >
                    {i === 0 && <Award className="h-3 w-3" />}
                    {b}
                  </span>
                ))}
              </div>

              {/* Headline */}
              <h1 className="order-2 lg:order-none text-[28px] sm:text-[34px] lg:text-[44px] font-semibold tracking-tight leading-[1.2] text-ink">
                {hero.headline.map((line, i) => {
                  const last = i === hero.headline.length - 1;
                  return last ? (
                    <span key={i} className="text-primary">
                      {line}
                    </span>
                  ) : (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </h1>

              {/* Subtitle */}
              <p className="order-3 lg:order-none lg:mt-6 text-base lg:text-lg text-body leading-relaxed max-w-[480px]">
                {nl2br(hero.subtitle)}
              </p>

              {/* CTAs */}
              <div className="order-6 lg:order-none lg:mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">
                  <Calendar className="h-4 w-4 mr-2" /> 예약 상담
                </a>
                <a href="#treatments" className="btn-secondary">
                  시술 소개 보기
                </a>
              </div>

              {/* Stats */}
              <dl className="order-5 lg:order-none lg:mt-10 grid grid-cols-3 gap-6 max-w-[420px] pt-6 border-t border-hairline">
                {hero.stats.map((s, i) => (
                  <div key={i}>
                    <dt className="text-xs text-muted">{s.label}</dt>
                    <dd className="mt-1 text-[22px] font-semibold text-ink tabular-nums">
                      {s.value}
                      {s.unit && (
                        <span className="text-sm text-muted ml-0.5">{s.unit}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ============ BRAND STORY BRIEF ============ */}
        <section id="about" className="py-20 lg:py-[80px] bg-canvas">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-b from-surface-warm to-primary-soft/30 rounded-[20px] relative overflow-hidden shadow-[var(--shadow-card-float)]">
                <Image
                  src={brandStory.image}
                  alt="강희석 원장 포트레이트"
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-5 left-5 right-5 bg-canvas/95 backdrop-blur rounded-[14px] p-4 flex items-center gap-3 shadow-sm">
                  <div className="h-11 w-11 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold">{brandStory.doctorCardName}</p>
                    <p className="text-xs text-muted">{brandStory.doctorCardDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                BRAND STORY
              </p>
              <h2 className="text-[22px] lg:text-[28px] font-semibold tracking-tight leading-snug">
                {nl2br(brandStory.title)}
              </h2>
              <div className="mt-6 space-y-4 text-body leading-relaxed">
                {brandStory.paragraphs.map((p, i) => (
                  <p key={i}>{i === 3 ? highlightStory(p) : p}</p>
                ))}
                <p className="pt-2 text-sm text-muted">{brandStory.signature}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SELF-DIAGNOSIS + YOUTUBE ============ */}
        <section id="self-check" className="py-20 lg:py-[80px] bg-surface-warm">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div className="text-center max-w-[680px] mx-auto mb-12 lg:mb-16">
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                SELF-DIAGNOSIS
              </p>
              <h2 className="text-[22px] lg:text-[28px] font-semibold tracking-tight">
                {selfCheck.title}
              </h2>
              <p className="mt-4 text-body leading-relaxed">{nl2br(selfCheck.desc)}</p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start">
              {/* Symptom checklist */}
              <ul className="space-y-2.5">
                {selfCheck.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 px-5 py-4 bg-canvas rounded-[14px] border border-hairline transition-colors hover:border-primary"
                  >
                    <span className="h-6 w-6 rounded-full bg-primary-soft flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* YouTube video carousel */}
              <VideoCarousel videos={videos} />
            </div>
          </div>
        </section>

        {/* ============ TREATMENT GRID ============ */}
        <section id="treatments" className="py-20 lg:py-[80px] bg-surface-soft">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div className="text-center max-w-[640px] mx-auto mb-12 lg:mb-16">
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                OUR TREATMENTS
              </p>
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">
                {treatments.title}
              </h2>
              <p className="mt-3 text-muted leading-relaxed">{treatments.desc}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-[840px] mx-auto">
              {treatments.items.map((t) => (
                <article key={t.name} className="card-base p-8 lg:p-10 group flex flex-col items-center text-center">
                  <div className="aspect-square w-[200px] lg:w-[220px] relative overflow-hidden rounded-full bg-gradient-to-br from-surface-warm to-primary-soft/30 mb-6 transition-transform duration-500 group-hover:scale-[1.04]">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[19px] lg:text-[20px] font-semibold tracking-tight">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed max-w-[280px]">
                    {t.desc}
                  </p>
                  <div className="mt-6 w-full max-w-[280px] flex items-center justify-between pt-5 border-t border-hairline-soft">
                    <span className="text-xs text-muted">소요 {t.duration}</span>
                    <div className="text-right">
                      <span className="text-base font-semibold tabular-nums">
                        {KRW(t.priceFrom)}
                      </span>
                      <span className="text-xs text-muted block">
                        {t.pkgCount}회 {KRW(t.pkgPrice)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SIGNATURE 회귀 관리 ============ */}
        <section className="py-20 lg:py-[80px] bg-surface-warm relative overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent-gold/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1200px] px-5 lg:px-10">
            <div className="text-center max-w-[720px] mx-auto mb-14">
              <span className="signature-badge mb-4 inline-flex">
                <Sparkles className="h-3 w-3 mr-1" /> SIGNATURE
              </span>
              <h2 className="text-[24px] lg:text-[28px] font-semibold tracking-tight leading-snug">
                {nl2br(signature.title)}
              </h2>
              <p className="mt-4 text-body leading-relaxed">{signature.desc}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-14">
              {signature.steps.map((s) => (
                <div
                  key={s.step}
                  className="bg-canvas rounded-[14px] p-6 border border-accent-gold-soft"
                >
                  <p className="text-[12px] font-semibold text-accent-gold-active tracking-wide">
                    {s.step}
                  </p>
                  <h3 className="mt-2 text-[16px] font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-[480px] mx-auto bg-canvas rounded-[20px] p-8 border border-accent-gold relative">
              <span className="signature-badge absolute top-5 right-5">
                원장 직접 진행
              </span>
              <p className="text-xs text-muted">회귀 관리 풀패키지</p>
              <p className="mt-2 text-[28px] font-bold tabular-nums tracking-tight">
                {KRW(signature.packagePrice)}
                <span className="text-sm text-muted font-normal ml-2">
                  / {signature.packageCount}
                </span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-body">
                {signature.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent-gold">✓</span>
                    {inc}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-gold mt-7 w-full">
                회귀 관리 예약하기
              </a>
            </div>
          </div>
        </section>

        {/* ============ BEFORE & AFTER PREVIEW ============ */}
        <section id="results" className="py-20 lg:py-[80px] bg-canvas">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div className="mb-10">
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                BEFORE & AFTER
              </p>
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">
                {beforeAfter.title}
              </h2>
            </div>
            <p className="text-sm text-muted mb-8 -mt-4">{beforeAfter.desc}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {beforeAfter.pairs.map((p) => (
                <BeforeAfterSlider
                  key={p.caseLabel}
                  beforeSrc={p.before}
                  afterSrc={p.after}
                  caseLabel={p.caseLabel}
                  beforeAdjust={p.beforeAdjust as ImageAdjust}
                  afterAdjust={p.afterAdjust as ImageAdjust}
                  beforeAlt={`${p.caseLabel} 시술 전`}
                  afterAlt={`${p.caseLabel} 시술 후`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section id="gallery" className="py-20 lg:py-[80px] bg-surface-warm">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div className="mb-8 lg:mb-10">
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                GALLERY
              </p>
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">
                {gallery.title}
              </h2>
              <p className="text-sm text-muted mt-3">{gallery.desc}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
              {gallery.images.map((src, i) => (
                <div
                  key={src}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-[14px] border border-hairline bg-surface-card shadow-[var(--shadow-card-float)] ${
                    i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                  } ${i === 4 ? "col-span-2 lg:col-span-3" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`강남페이스명가 현장 ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ REVIEWS ============ */}
        <section id="reviews" className="py-20 lg:py-[80px] bg-surface-soft">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
            <div className="text-center max-w-[640px] mx-auto mb-12 lg:mb-16">
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                CUSTOMER REVIEWS
              </p>
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">
                고객 후기
              </h2>
              <div className="mt-4 flex items-center justify-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent-gold text-accent-gold"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <article
                  key={i}
                  className="bg-canvas rounded-[14px] p-7 border border-hairline"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          s <= r.rating
                            ? "fill-accent-gold text-accent-gold"
                            : "text-accent-gold/20 fill-accent-gold/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-body leading-relaxed">{r.text}</p>
                  <div className="mt-5 pt-4 border-t border-hairline-soft flex items-center justify-between">
                    <span className="text-sm font-medium">{r.author}</span>
                    <span className="text-xs text-muted">{r.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="py-20 lg:py-[80px] bg-canvas">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10 grid lg:grid-cols-[1fr_440px] gap-10 items-start">
            <div>
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                VISIT US
              </p>
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">
                오시는 길
              </h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="bg-surface-soft rounded-[14px] p-6">
                  <p className="text-xs font-medium text-muted">주소</p>
                  <p className="mt-1.5 text-base flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <span>
                      {contact.addressLine1}
                      <br />
                      {contact.addressLine2}
                    </span>
                  </p>
                </div>
                <div className="bg-surface-soft rounded-[14px] p-6">
                  <p className="text-xs font-medium text-muted">운영시간</p>
                  <p className="mt-1.5 text-base flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    {contact.hours}
                  </p>
                </div>
                <div className="bg-surface-soft rounded-[14px] p-6 sm:col-span-2">
                  <p className="text-xs font-medium text-muted">전화</p>
                  <div className="mt-1.5 flex flex-wrap gap-4 text-base tabular-nums">
                    <a
                      href={`tel:${contact.phone1}`}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" /> {contact.phone1}
                    </a>
                    <a
                      href={`tel:${contact.phone2}`}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" /> {contact.phone2}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <NaverMap />
              </div>
            </div>

            <aside className="bg-surface-card rounded-[20px] p-7 border border-hairline lg:sticky lg:top-[88px]">
              <h3 className="text-[20px] font-semibold tracking-tight">예약 상담</h3>
              <p className="mt-1 text-sm text-muted">
                전화 또는 카카오톡으로 빠른 상담이 가능합니다.
              </p>
              <div className="mt-6 space-y-3">
                <a href={`tel:${contact.phone1}`} className="btn-primary w-full">
                  <Phone className="h-4 w-4 mr-2" /> 전화로 예약하기
                </a>
                <a
                  href={contact.kakaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-kakao w-full"
                >
                  <MessageCircle className="h-4 w-4" /> 카카오톡 상담
                </a>
              </div>
              <div className="mt-7 pt-6 border-t border-hairline">
                <p className="text-xs text-muted">간편 문의 폼</p>
                <ContactForm />
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-surface-soft">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10 pt-16 pb-8 grid sm:grid-cols-3 gap-10">
          <div>
            <Image
              src="/images/wix/logo.png"
              alt="강남페이스명가"
              width={262}
              height={58}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-body leading-relaxed">
              30년 경력 강희석 원장의
              <br />
              1:1 책임 관리 브랜드
            </p>
          </div>
          <div>
            <p className="text-base font-medium mb-4">시술</p>
            <ul className="space-y-2 text-sm text-body">
              <li>
                <a href="#treatments" className="hover:text-ink">
                  얼굴 윤곽 축소
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-ink">
                  얼굴 비대칭 관리
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-ink">
                  회귀 관리 시그니처
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-base font-medium mb-4">연락</p>
            <ul className="space-y-2 text-sm text-body">
              <li className="tabular-nums">{contact.phone1}</li>
              <li className="tabular-nums">{contact.phone2}</li>
              <li>{contact.hours}</li>
              <li>{contact.addressFull}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-hairline">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10 py-5 text-xs text-muted flex flex-wrap items-center justify-between gap-2">
            <span>© 2026 강남페이스명가. All rights reserved.</span>
            <span>사업자등록번호 {contact.bizNo}</span>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE STICKY BOTTOM CTA ============ */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-canvas border-t border-hairline grid grid-cols-3 h-16 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <a
          href={`tel:${contact.phone1}`}
          className="flex flex-col items-center justify-center text-ink text-xs gap-0.5"
        >
          <Phone className="h-5 w-5" />
          전화
        </a>
        <a
          href={contact.kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-kakao-yellow text-kakao-ink text-xs gap-0.5 font-medium"
        >
          <MessageCircle className="h-5 w-5" />
          카카오톡
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center justify-center bg-primary text-on-primary text-xs gap-0.5 font-medium"
        >
          <Calendar className="h-5 w-5" />
          예약
        </a>
      </div>

      {/* ============ FLOATING KAKAO BUTTON ============ */}
      <a
        href={contact.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        className="fixed bottom-20 md:bottom-6 right-5 z-40 h-14 w-14 rounded-full bg-kakao-yellow text-kakao-ink shadow-[var(--shadow-card-float)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-7 w-7 fill-current" />
      </a>

      {/* ============ BACK TO TOP BUTTON ============ */}
      <BackToTop />
    </>
  );
}
