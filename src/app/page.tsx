import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Calendar,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Check,
  PlayCircle,
} from "lucide-react";
import {
  BeforeAfterSlider,
  type ImageAdjust,
} from "@/components/BeforeAfterSlider";
import { BackToTop } from "@/components/BackToTop";
import { MobileMenu } from "@/components/MobileMenu";

const NAV_LINKS = [
  { label: "홈", href: "#home" },
  { label: "소개", href: "#about" },
  { label: "시술", href: "#treatments" },
  { label: "결과", href: "#results" },
  { label: "리뷰", href: "#reviews" },
  { label: "연락", href: "#contact" },
];

const TREATMENTS = [
  {
    name: "얼굴 윤곽 축소 관리",
    desc: "노폐물 분해로 슬림하고 선명한 얼굴 라인을 만들어 드립니다.",
    duration: "40분",
    priceFrom: 50000,
    pkg: { count: 11, price: 500000 },
    img: "/images/custom/treatment-1-contour.png",
  },
  {
    name: "얼굴 비대칭 관리",
    desc: "본연의 좌우 균형을 되찾는 1:1 맞춤 케어입니다.",
    duration: "50분",
    priceFrom: 80000,
    pkg: { count: 11, price: 800000 },
    img: "/images/custom/treatment-2-symmetry.png",
  },
];

type BAPair = {
  caseLabel: string;
  before: string;
  after: string;
  /** Calibration to make faces align between before and after */
  beforeAdjust?: ImageAdjust;
  afterAdjust?: ImageAdjust;
};

// Each image specifies where the face is located in the original photo
// (face center Y in % of image height, face height = forehead-to-chin in
// % of image height). The component auto-computes scale + translate so
// every face lands at the same spot in the container with the same size.
// Face anchor measurements: y = vertical center of face in % of image height
// (between forehead and chin tip), h = face height (forehead-to-chin) in %.
// Measured by viewing each raw image and identifying forehead start + chin tip.
const BEFORE_AFTER_PAIRS: BAPair[] = [
  {
    caseLabel: "CASE 01",
    before: "/images/wix/before-after-1.jpg",
    after: "/images/wix/before-after-2.jpg",
    // BEFORE: face fills frame, forehead ~22% → chin ~75%
    // AFTER: small face top-third, forehead ~15% → chin ~40%
    // zoom 0.75 makes both faces 25% smaller (less overwhelming) while
    // keeping them perfectly aligned to each other
    beforeAdjust: { face: { y: 48, h: 53, zoom: 0.75 } },
    afterAdjust: { face: { y: 27, h: 25, zoom: 0.68 } },
  },
  {
    caseLabel: "CASE 02",
    before: "/images/wix/before-after-3.jpg",
    after: "/images/wix/before-after-4.jpg",
    // BEFORE: forehead ~18% → chin ~73%
    beforeAdjust: { face: { y: 45, h: 55 } },
    // AFTER: forehead ~22% → chin ~72%
    afterAdjust: { face: { y: 47, h: 50 } },
  },
  {
    caseLabel: "CASE 03",
    before: "/images/wix/before-after-5.jpg",
    after: "/images/wix/before-after-6.jpg",
    // BEFORE male: forehead ~15% → chin ~58%
    beforeAdjust: { face: { y: 36, h: 43 } },
    // AFTER male: forehead ~17% → chin ~63%
    afterAdjust: { face: { y: 40, h: 46 } },
  },
  {
    caseLabel: "CASE 04",
    before: "/images/wix/before-after-7.jpg",
    after: "/images/wix/before-after-8.jpg",
    // BEFORE: forehead ~20% → chin ~58% (dress visible below)
    beforeAdjust: { face: { y: 39, h: 38 } },
    // AFTER: very close-up, forehead ~10% → chin ~75%
    afterAdjust: { face: { y: 42, h: 65 } },
  },
];

const SELF_CHECK_ITEMS = [
  "턱이 한쪽으로 틀어져 보이는 경우",
  "양쪽 광대의 높이와 돌출이 다른 경우",
  "코가 휘어져 보이고 눈의 크기와 높이가 다른 경우",
  "턱에서 통증·소리가 나고 주걱턱이 있는 경우",
  "위 아래 입술과 치아 배열이 안 맞는 경우",
  "얼굴이 너무 길거나 짧고, 사각지거나 둥글어 보이는 경우",
  "셀카를 찍으면 좌우 비대칭으로 보이는 경우",
];

const YT_VIDEO_ID = "qyhy9OWHEug";

const PROCESS_STEPS = [
  {
    step: "STEP 01",
    title: "분석 및 상담",
    desc: "원장님이 직접 얼굴 변형의 원인을 분석합니다.",
  },
  {
    step: "STEP 02",
    title: "척추 밸런스 관리",
    desc: "근본 원인인 척추 정렬을 먼저 잡습니다.",
  },
  {
    step: "STEP 03",
    title: "얼굴 축소 관리",
    desc: "노폐물 분해로 슬림한 얼굴 라인을 만듭니다.",
  },
  {
    step: "STEP 04",
    title: "비대칭 관리",
    desc: "귀소본능 기법으로 본연의 균형을 되찾습니다.",
  },
  {
    step: "STEP 05",
    title: "피부 관리",
    desc: "아로마오일 케어와 마스크팩으로 마무리.",
  },
];

const REVIEWS = [
  {
    rating: 5,
    text: "통증 없이 비대칭이 개선됐어요. 셀카 찍을 때 자신감이 생겼어요.",
    author: "김○○",
    date: "2025.04",
  },
  {
    rating: 5,
    text: "마법의 손이라는 별명이 진짜네요. 한 번에 변화가 보입니다.",
    author: "이○○",
    date: "2025.03",
  },
  {
    rating: 5,
    text: "원장님이 직접 1:1로 봐주셔서 안심돼요. 30년 경력 진짜입니다.",
    author: "박○○",
    date: "2025.03",
  },
];

const KRW = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export default function Home() {
  return (
    <>
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
              href="tel:041-567-0341"
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              <Phone className="h-4 w-4" /> 041-567-0341
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
                  src="/images/custom/hero-model.png"
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
                  <p className="text-[13px] font-semibold leading-tight">시그니처 회귀 관리</p>
                  <p className="text-xs text-muted mt-0.5">5단계 1:1 책임 케어</p>
                </div>
              </div>
            </div>

            {/* Text content — `contents` on mobile lets each child take its own
                order slot in the parent grid. On desktop it becomes a block
                column with the children stacking in DOM order. */}
            <div className="contents lg:block lg:order-1">
              {/* Badges — mobile order 4 / desktop order 1 (top of text column) */}
              <div className="order-4 lg:order-none flex flex-wrap gap-2 lg:mb-6">
                <span className="inline-flex items-center gap-1 bg-canvas/90 backdrop-blur text-primary-active text-[11px] font-semibold rounded-full px-3 py-1.5 tracking-wide shadow-sm">
                  <Award className="h-3 w-3" /> 30년 경력
                </span>
                <span className="inline-flex items-center bg-canvas/90 backdrop-blur text-primary-active text-[11px] font-semibold rounded-full px-3 py-1.5 tracking-wide shadow-sm">
                  1:1 책임 관리
                </span>
                <span className="inline-flex items-center bg-canvas/90 backdrop-blur text-primary-active text-[11px] font-semibold rounded-full px-3 py-1.5 tracking-wide shadow-sm">
                  SBS 방송 출연
                </span>
              </div>

              {/* Headline — mobile order 2 */}
              <h1 className="order-2 lg:order-none text-[28px] sm:text-[34px] lg:text-[44px] font-semibold tracking-tight leading-[1.2] text-ink">
                당신의 본연을
                <br />
                되찾는 시간,
                <br />
                <span className="text-primary">회귀 관리</span>
              </h1>

              {/* Subtitle — mobile order 3 */}
              <p className="order-3 lg:order-none lg:mt-6 text-base lg:text-lg text-body leading-relaxed max-w-[480px]">
                30년 경력 강희석 원장이 직접 진행하는 1:1 책임 관리.
                <br className="hidden sm:block" />
                얼굴의 귀소본능을 활용해 본연의 균형을 되찾아 드립니다.
              </p>

              {/* CTAs — mobile order 6 (bottom) / desktop after subtitle */}
              <div className="order-6 lg:order-none lg:mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">
                  <Calendar className="h-4 w-4 mr-2" /> 예약 상담
                </a>
                <a href="#treatments" className="btn-secondary">
                  시술 소개 보기
                </a>
              </div>

              {/* Stats — mobile order 5 / desktop after CTAs */}
              <dl className="order-5 lg:order-none lg:mt-10 grid grid-cols-3 gap-6 max-w-[420px] pt-6 border-t border-hairline">
                <div>
                  <dt className="text-xs text-muted">경력</dt>
                  <dd className="mt-1 text-[22px] font-semibold text-ink tabular-nums">
                    30<span className="text-sm text-muted ml-0.5">년</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">시술 회차</dt>
                  <dd className="mt-1 text-[22px] font-semibold text-ink tabular-nums">
                    10,000+
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">평점</dt>
                  <dd className="mt-1 text-[22px] font-semibold text-ink tabular-nums">
                    4.9<span className="text-sm text-muted ml-0.5">/5</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ============ BRAND STORY BRIEF ============ */}
        <section id="about" className="py-20 lg:py-[80px] bg-canvas">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              {/* Main portrait card */}
              <div className="aspect-[4/5] bg-gradient-to-b from-surface-warm to-primary-soft/30 rounded-[20px] relative overflow-hidden shadow-[var(--shadow-card-float)]">
                <Image
                  src="/images/custom/doctor-portrait.png"
                  alt="강희석 원장 포트레이트"
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover object-center"
                />
                {/* Floating bottom card */}
                <div className="absolute bottom-5 left-5 right-5 bg-canvas/95 backdrop-blur rounded-[14px] p-4 flex items-center gap-3 shadow-sm">
                  <div className="h-11 w-11 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold">마법의 손</p>
                    <p className="text-xs text-muted">30년 경력 · SBS 생방송 투데이 출연</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-3">
                BRAND STORY
              </p>
              <h2 className="text-[22px] lg:text-[28px] font-semibold tracking-tight leading-snug">
                제 손이 만들어지기까지,
                <br />
                30년이 걸렸습니다.
              </h2>
              <div className="mt-6 space-y-4 text-body leading-relaxed">
                <p>
                  서른 즈음, 한 번의 사고로 허리를 크게 다쳤습니다. 병원에서는
                  &ldquo;시간이 약&rdquo;이라고 했지만, 통증은 1년이 지나도
                  가시지 않았습니다. 앉는 것, 걷는 것, 잠드는 것까지 일상이
                  무너지던 시기였습니다.
                </p>
                <p>
                  지인의 소개로 전문 관리를 받기 시작했습니다. 한두 번에
                  나아질 일이 아니라는 건 저도 알았습니다. 그저 꾸준히
                  받았습니다. 몇 개월이 지나자, 통증이 조금씩 옅어졌고
                  반년이 지난 어느 날 문득 깨달았습니다. 일상이 돌아와 있다는
                  것을.
                </p>
                <p>
                  손이 몸을 바꿀 수 있다는 사실이 저를 사로잡았습니다.
                  병원도 약도 해내지 못한 일을 사람의 손이 해내고
                  있었습니다. 그 원리를 직접 익히고 싶어 그날부터 공부와
                  수련을 시작했습니다. 몇 년이 걸렸고, 그 뒤로 다시 몇 년이
                  걸렸습니다.
                </p>
                <p>
                  몸의 균형이 무너지면 얼굴의 좌우도 흔들립니다. 척추가 틀어진
                  분은 광대 높이가 다르고, 골반이 기운 분은 턱선이 한쪽으로
                  쏠립니다. 저는 몸에서 배운 원리를 얼굴에 옮겨 적용하기
                  시작했습니다. 본연의 얼굴형으로 돌아가려는 힘이 있다고
                  믿었고, 저는 그 힘을
                  <span className="font-semibold text-ink"> 얼굴의 귀소본능</span>
                  이라 부르고, 그것을 깨워 드리는 기법을
                  <span className="font-semibold text-ink"> 회귀 관리</span>로
                  정리했습니다.
                </p>
                <p>
                  그렇게 30년이 흘렀고, 1만 명이 넘는 분들이 제 손을
                  거쳐가셨습니다. &lsquo;마법의 손&rsquo;이라는 별명은
                  제가 붙인 것이 아니라, 변화를 직접 마주한 손님들이 건네주신
                  말입니다. 과분한 별명을 지키기 위해 저는 오늘도, 한 분을
                  마주할 때마다 처음처럼 손을 얹습니다.
                </p>
                <p className="pt-2 text-sm text-muted">강희석, 페이스명가 원장</p>
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
                이런 고민, 있으세요?
              </h2>
              <p className="mt-4 text-body leading-relaxed">
                강희석 원장이 직접 설명하는 얼굴 비대칭 자가 진단법.
                <br className="hidden sm:block" />
                아래 항목 중 하나라도 해당된다면 회귀 관리가 도움이 될 수 있습니다.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start">
              {/* Symptom checklist */}
              <ul className="space-y-2.5">
                {SELF_CHECK_ITEMS.map((item, i) => (
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

              {/* YouTube video */}
              <div className="lg:sticky lg:top-[88px]">
                <div className="aspect-video rounded-[14px] overflow-hidden bg-ink shadow-[var(--shadow-card-float)] border border-hairline">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?rel=0&modestbranding=1`}
                    title="얼굴 비대칭 자가 진단법 — 강남페이스명가"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-5 flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                    <PlayCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold leading-tight">
                      얼굴 비대칭 자가 진단법 (Self-diagnosis)
                    </p>
                    <p className="text-sm text-muted mt-1">
                      강남 마법의손 TV · 강희석 원장
                    </p>
                  </div>
                  <a
                    href={`https://youtu.be/${YT_VIDEO_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-primary shrink-0 mt-1"
                  >
                    YouTube에서 보기 <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
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
                페이스명가가 제공하는 관리
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                30년 노하우를 담은 1:1 맞춤 관리 프로그램입니다.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-[840px] mx-auto">
              {TREATMENTS.map((t) => (
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
                    <span className="text-xs text-muted">
                      소요 {t.duration}
                    </span>
                    <div className="text-right">
                      <span className="text-base font-semibold tabular-nums">
                        {KRW(t.priceFrom)}
                      </span>
                      <span className="text-xs text-muted block">
                        {t.pkg.count}회 {KRW(t.pkg.price)}
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
                페이스명가만의
                <br className="sm:hidden" /> 회귀 관리
              </h2>
              <p className="mt-4 text-body leading-relaxed">
                본연의 얼굴형으로 돌아가려는 &lsquo;얼굴의 귀소본능&rsquo;을
                활용한 관리법입니다. 강희석 원장만의 특수한 테크닉으로
                불필요한 노폐물을 분해해 슬림한 얼굴 윤곽과 윤기나는
                피부톤을 만들어 드립니다.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-14">
              {PROCESS_STEPS.map((s) => (
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
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-[480px] mx-auto bg-canvas rounded-[20px] p-8 border border-accent-gold relative">
              <span className="signature-badge absolute top-5 right-5">
                원장 직접 진행
              </span>
              <p className="text-xs text-muted">회귀 관리 풀패키지</p>
              <p className="mt-2 text-[28px] font-bold tabular-nums tracking-tight">
                {KRW(800000)}
                <span className="text-sm text-muted font-normal ml-2">/ 11회</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-body">
                <li className="flex items-start gap-2">
                  <span className="text-accent-gold">✓</span>
                  분석 · 척추 · 얼굴 축소 · 비대칭 · 피부 5단계 포함
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-gold">✓</span>
                  원장님 1:1 책임 관리
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-gold">✓</span>
                  아로마오일 케어 + 마스크팩 무료 제공
                </li>
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
                실제 고객 변화 사례
              </h2>
            </div>
            <p className="text-sm text-muted mb-8 -mt-4">
              가운데 손잡이를 좌우로 드래그하여 시술 전후를 비교해보세요.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {BEFORE_AFTER_PAIRS.map((p) => (
                <BeforeAfterSlider
                  key={p.caseLabel}
                  beforeSrc={p.before}
                  afterSrc={p.after}
                  caseLabel={p.caseLabel}
                  beforeAdjust={p.beforeAdjust}
                  afterAdjust={p.afterAdjust}
                  beforeAlt={`${p.caseLabel} 시술 전`}
                  afterAlt={`${p.caseLabel} 시술 후`}
                />
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
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent-gold text-accent-gold"
                    />
                  ))}
                </div>
                <span className="text-[15px] font-medium">
                  4.9 <span className="text-muted">/ 200+ 리뷰</span>
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.map((r, i) => (
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
                      충청남도 천안시 동남구
                      <br />
                      대흥동85 (은행길5~5)
                    </span>
                  </p>
                </div>
                <div className="bg-surface-soft rounded-[14px] p-6">
                  <p className="text-xs font-medium text-muted">운영시간</p>
                  <p className="mt-1.5 text-base flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    매일 10:00 – 20:00
                  </p>
                </div>
                <div className="bg-surface-soft rounded-[14px] p-6 sm:col-span-2">
                  <p className="text-xs font-medium text-muted">전화</p>
                  <div className="mt-1.5 flex flex-wrap gap-4 text-base tabular-nums">
                    <a
                      href="tel:041-567-0341"
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" /> 041-567-0341
                    </a>
                    <a
                      href="tel:010-2970-0341"
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" /> 010-2970-0341
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-6 aspect-[16/9] rounded-[14px] bg-surface-warm flex items-center justify-center text-sm text-muted">
                네이버 지도 임베드 영역
              </div>
            </div>

            <aside className="bg-surface-card rounded-[20px] p-7 border border-hairline lg:sticky lg:top-[88px]">
              <h3 className="text-[20px] font-semibold tracking-tight">
                예약 상담
              </h3>
              <p className="mt-1 text-sm text-muted">
                전화 또는 카카오톡으로 빠른 상담이 가능합니다.
              </p>
              <div className="mt-6 space-y-3">
                <a href="tel:041-567-0341" className="btn-primary w-full">
                  <Phone className="h-4 w-4 mr-2" /> 전화로 예약하기
                </a>
                <a href="#kakao" className="btn-kakao w-full">
                  <MessageCircle className="h-4 w-4" /> 카카오톡 상담
                </a>
              </div>
              <div className="mt-7 pt-6 border-t border-hairline">
                <p className="text-xs text-muted">간편 문의 폼</p>
                <form className="mt-3 space-y-3">
                  <input
                    placeholder="이름"
                    className="w-full h-[52px] px-4 rounded-[8px] border border-hairline focus:outline-none focus:border-primary focus:border-2"
                  />
                  <input
                    placeholder="전화번호"
                    className="w-full h-[52px] px-4 rounded-[8px] border border-hairline focus:outline-none focus:border-primary focus:border-2 tabular-nums"
                  />
                  <textarea
                    placeholder="문의 사항 (선택)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-[8px] border border-hairline focus:outline-none focus:border-primary focus:border-2"
                  />
                  <button type="button" className="btn-primary w-full">
                    예약 신청
                  </button>
                </form>
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
              <li>
                <a href="#treatments" className="hover:text-ink">
                  피부 관리
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-base font-medium mb-4">연락</p>
            <ul className="space-y-2 text-sm text-body">
              <li className="tabular-nums">041-567-0341</li>
              <li className="tabular-nums">010-2970-0341</li>
              <li>매일 10:00 – 20:00</li>
              <li>충청남도 천안시 동남구 대흥동85</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-hairline">
          <div className="mx-auto max-w-[1200px] px-5 lg:px-10 py-5 text-xs text-muted flex flex-wrap items-center justify-between gap-2">
            <span>© 2026 강남페이스명가. All rights reserved.</span>
            <span>사업자등록번호 000-00-00000</span>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE STICKY BOTTOM CTA ============ */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-canvas border-t border-hairline grid grid-cols-3 h-16 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <a
          href="tel:041-567-0341"
          className="flex flex-col items-center justify-center text-ink text-xs gap-0.5"
        >
          <Phone className="h-5 w-5" />
          전화
        </a>
        <a
          href="#kakao"
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
        href="#kakao"
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

