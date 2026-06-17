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
      <div className="relative flex aspect-square w-full max-w-[380px] flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-primary-soft via-surface-warm to-canvas shadow-[var(--shadow-card-float)] animate-promo-pop">
        {/* Close */}
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={close}
          className="absolute right-3.5 top-3.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 본문 */}
        <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-accent shadow">
            <Sparkles className="h-3.5 w-3.5" /> First Visit
          </span>

          <p className="mt-4 text-[14px] font-semibold tracking-wide text-muted">
            강남페이스명가 첫 방문 고객님께
          </p>

          <p className="mt-3 text-[25px] font-bold leading-none tracking-tight text-ink">
            첫 방문
          </p>
          <p className="mt-1 text-[80px] font-extrabold leading-[0.9] tracking-tighter text-primary">
            50<span className="align-top text-[46px] font-bold">%</span>
          </p>
          <p className="mt-1.5 text-[23px] font-bold tracking-tight text-accent-gold-active">
            할인 이벤트
          </p>

          <p className="mt-4 text-[13.5px] leading-relaxed text-body">
            30년 경력 강희석 원장의 1:1 회귀 관리,
            <br />
            지금 예약하시면 <b className="text-accent-gold-active">반값</b>{" "}
            혜택을 드립니다.
          </p>

          <a
            href="#contact"
            onClick={close}
            className="btn-primary mt-5 w-full max-w-[260px]"
          >
            지금 예약 상담받기
          </a>
        </div>

        {/* 푸터: 오늘 하루 보지 않기 / 닫기 */}
        <div className="flex items-center justify-between border-t border-hairline/70 px-6 py-2.5">
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
