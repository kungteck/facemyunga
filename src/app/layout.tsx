import type { Metadata } from "next";
import Script from "next/script";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import "./globals.css";

// GA4·Meta Pixel 부트스트랩.
// /admin(CMS) 사용 기록이 통계에 섞이지 않도록, 런타임에 pathname 을 확인해
// /admin 이 아닐 때만 외부 스크립트를 주입하고 init/PageView 를 실행한다.
const ANALYTICS_BOOTSTRAP = `
(function () {
  if (location.pathname.indexOf('/admin') === 0) return;

  // ---- Google Analytics 4 (gtag.js) ----
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-P8T1VFPEF7');
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-P8T1VFPEF7';
  document.head.appendChild(ga);

  // ---- Meta Pixel (fbevents.js) ----
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '363904750985008');
  fbq('track', 'PageView');

  // 유입 매체 태깅(메타 전용, 페이지 로드당 1회).
  // 메타 픽셀은 도메인 뒤 URL 을 전송하지 않고 utm 값도 'other' 로 정규화하므로
  // (2026-09-11 실측), UTM 기반 맞춤 타겟을 만들려면 전용 이벤트가 필요하다.
  // GA4 는 utm_source 를 자체 수집하므로 여기서 보내지 않는다.
  try {
    var utmSource = new URLSearchParams(location.search).get('utm_source');
    utmSource = utmSource ? utmSource.toLowerCase() : '';
    if (utmSource === 'karrot' || utmSource === 'daangn' || utmSource === 'danggeun') {
      fbq('trackCustom', 'from_karrot');
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  // canonical 도메인(www). OG·sitemap 등 절대 URL 의 기준이 된다.
  metadataBase: new URL("https://www.facemyunga.com"),
  alternates: { canonical: "/" },
  title: "강남페이스명가 | 30년 경력 강희석 원장의 회귀 관리",
  description:
    "강남페이스명가는 30년 경력 강희석 원장이 직접 진행하는 1:1 책임 관리 브랜드입니다. 회귀 관리 시그니처 기법으로 본연의 얼굴형을 되찾아 드립니다.",
  keywords: [
    "강남페이스명가",
    "회귀 관리",
    "얼굴 윤곽 관리",
    "얼굴 비대칭",
    "천안 페이스 케어",
    "강희석 원장",
  ],
  openGraph: {
    title: "강남페이스명가",
    description: "30년 경력 강희석 원장의 회귀 관리",
    url: "/",
    siteName: "강남페이스명가",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "강남페이스명가 · 30년 경력 강희석 원장의 회귀 관리",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "강남페이스명가",
    description: "30년 경력 강희석 원장의 회귀 관리",
    images: ["/og-image.png"],
  },
  // 네이버 서치어드바이저 소유확인 (HTML 태그 방식)
  verification: {
    other: {
      "naver-site-verification":
        "8a8d1c67104d7c0a343cb8cf10b68aa6f9f1b291",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
        <Script
          id="analytics-bootstrap"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: ANALYTICS_BOOTSTRAP }}
        />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
