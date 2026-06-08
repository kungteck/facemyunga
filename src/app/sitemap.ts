import type { MetadataRoute } from "next";

// output: "export" 에서 라우트 핸들러(sitemap/robots)는 정적 생성을 명시해야 빌드된다.
export const dynamic = "force-static";

/**
 * 사이트맵 — `output: "export"` 빌드 시 정적 `/sitemap.xml` 로 생성된다.
 * 단일 페이지(one-pager)라 홈 URL 하나. 도메인은 canonical(www) 기준.
 * trailingSlash: true 설정에 맞춰 URL 끝에 / 를 둔다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.facemyunga.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
