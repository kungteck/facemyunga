import type { MetadataRoute } from "next";

// output: "export" 에서 라우트 핸들러(sitemap/robots)는 정적 생성을 명시해야 빌드된다.
export const dynamic = "force-static";

/**
 * robots.txt — `output: "export"` 빌드 시 정적 `/robots.txt` 로 생성된다.
 * 모든 크롤러(네이버 Yeti, 구글봇 등) 전체 허용 + 사이트맵 위치 안내.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.facemyunga.com/sitemap.xml",
  };
}
