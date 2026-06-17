"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";

/**
 * 첫 방문 50% 할인 이벤트 팝업 (정사각형, 이미지 없음).
 * - 진입 직후(첫 페인트 뒤) 자동 노출.
 * - "오늘 하루 보지 않기" 체크 후 닫으면 localStorage 에 오늘 자정까지의
 *   만료시각(ms)을 저장, 그 시각 전이면 다시 뜨지 않는다(날짜가 바뀌면 재노출).
 * - X / 배경 / ESC 로 닫힘. createPortal 로 body 에 렌더해 헤더 스택을 회피한다.
 * - CTA "지금 예약 상담받기" → #contact(예약/연락 섹션)로 이동하며 팝업을 닫는다.
 * - 본문은 flex-1 + justify-center 라 내용 합 < 카드 높이일 때 위아래 여백이
 *   자동 균등 분배된다. 카드는 정사각(aspect-square)이라 화면이 좁은 모바일에서는
 *   카드도 작아지므로, 폰트·여백을 모바일에서 줄이고 sm(≥640px)에서 키워
 *   모바일·데스크톱 양쪽 모두 상하 여백이 남도록 한다.
 */
const STORAGE_KEY = "facemyunga.promo.hideUntil";

export function PromoModal() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    let hidden = false;
    try {
      const until = localStorage.getItem(STORAGE_KEY);
      hidden = !!until && Date.now() < Number(until);
    } catch {}
    if (hidden) return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    if (dontShow) {
      try {
        const end = new Date();
        end.setHours(23, 59, 59, 999); // 오늘 자정까지 숨김
        localStorage.setItem(STORAGE_KEY, String(end.getTime()));
      } catch {}
    }
    setOpen(false);
  }, [dontShow]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="첫 방문 50% 할인 이벤트"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="닫기"
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px] animate-promo-fade"
      />

      {/* 정사각형 카드 */}
      <div className="relative flex aspect-square w-full max-w-[400px] flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-primary-soft via-surface-warm to-canvas shadow-[var(--shadow-card-float)] animate-promo-pop">
        {/* Close */}
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={close}
          className="absolute right-3.5 top-3.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 본문 (flex-1 + justify-center 로 위아래 여백 자동 확보) */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-8">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-accent shadow sm:text-[11px]">
            <Sparkles className="h-3.5 w-3.5" /> First Visit
          </span>

          <p className="mt-2.5 text-[13px] font-semibold tracking-wide text-muted sm:mt-3 sm:text-[14px]">
            강남페이스명가 첫 방문 고객님께
          </p>

          <p className="mt-1.5 text-[19px] font-bold leading-none tracking-tight text-ink sm:mt-2.5 sm:text-[23px]">
            첫 방문
          </p>
          <p className="mt-0.5 text-[56px] font-extrabold leading-[0.9] tracking-tighter text-primary sm:mt-1 sm:text-[72px]">
            50<span className="align-top text-[33px] font-bold sm:text-[42px]">%</span>
          </p>
          <p className="mt-0.5 text-[17px] font-bold tracking-tight text-accent-gold-active sm:mt-1 sm:text-[21px]">
            할인 이벤트
          </p>

          <p className="mt-2.5 text-[12.5px] leading-relaxed text-body sm:mt-3.5 sm:text-[13.5px]">
            30년 경력 강희석 원장의 1:1 회귀 관리,
            <br />
            지금 예약하시면 <b className="text-accent-gold-active">반값</b>{" "}
            혜택을 드립니다.
          </p>

          <a
            href="#contact"
            onClick={close}
            className="btn-primary mt-3.5 h-[46px] w-full max-w-[260px] sm:mt-5 sm:h-[52px]"
          >
            지금 예약 상담받기
          </a>
        </div>

        {/* 푸터: 오늘 하루 보지 않기 / 닫기 */}
        <div className="flex items-center justify-between border-t border-hairline/70 px-6 py-2.5 sm:py-3">
          <label className="flex cursor-pointer select-none items-center gap-2 text-[13px] text-muted">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="h-4 w-4 rounded border-border-strong accent-primary"
            />
            오늘 하루 보지 않기
          </label>
          <button
            type="button"
            onClick={close}
            className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
