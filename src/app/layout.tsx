import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
