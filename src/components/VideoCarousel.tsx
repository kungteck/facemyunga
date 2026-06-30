"use client";

import { useState } from "react";
import { PlayCircle, ChevronRight, ChevronLeft } from "lucide-react";

export type YtVideo = { id: string; title: string; channel: string };

/**
 * 유튜브 영상 캐러셀 — 영상 좌우 끝의 오버레이 화살표와 하단 점(dot)으로
 * 여러 영상을 슬라이드한다. 영상이 1개면 화살표·점은 숨긴다.
 * iframe 의 key 를 영상 id 로 두어 슬라이드 전환 시 플레이어가 새로 로드된다.
 */
export function VideoCarousel({ videos }: { videos: YtVideo[] }) {
  const [idx, setIdx] = useState(0);
  const n = videos.length;
  const go = (d: number) => setIdx((idx + d + n) % n);

  if (!n) return null; // 영상이 0개면 렌더하지 않음(빈 배열 접근 크래시 방지)
  const v = videos[idx] ?? videos[0];

  return (
    <div className="lg:sticky lg:top-[88px]">
      <div className="relative aspect-video rounded-[14px] overflow-hidden bg-ink shadow-[var(--shadow-card-float)] border border-hairline">
        <iframe
          key={v.id}
          src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
          title={v.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />

        {/* 좌우 오버레이 화살표 (영상 2개 이상일 때만) */}
        {n > 1 && (
          <>
            <button
              type="button"
              aria-label="이전 영상"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="다음 영상"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* 점(dot) 인디케이터 */}
      {n > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {videos.map((vid, i) => (
            <button
              key={vid.id}
              type="button"
              aria-label={`${i + 1}번 영상으로 이동`}
              aria-current={i === idx}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === idx
                  ? "w-5 bg-primary"
                  : "w-2 bg-border-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {/* 영상 정보 */}
      <div className="mt-4 flex items-start gap-3.5">
        <div className="h-11 w-11 shrink-0 rounded-full bg-primary-soft flex items-center justify-center">
          <PlayCircle className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-tight">{v.title}</p>
          <p className="mt-1 text-sm text-muted">{v.channel}</p>
        </div>
        <a
          href={`https://youtu.be/${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 hidden shrink-0 items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary sm:inline-flex"
        >
          YouTube에서 보기 <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
