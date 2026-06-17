"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Sparkles, MessageCircle } from "lucide-react";

/**
 * 첫 방문 50% 할인 이벤트 팝업.
 * - 진입 직후(첫 페인트 뒤) 자동 노출.
 * - "오늘 하루 보지 않기" 체크 후 닫으면 localStorage 에 오늘 자정까지의
 *   만료시각(ms)을 저장, 그 시각 전이면 다시 뜨지 않는다(날짜가 바뀌면 재노출).
 * - X / 배경 / ESC 로 닫힘. createPortal 로 body 에 렌더해 헤더 스택을 회피한다.
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

      {/* Card */}
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-[22px] bg-canvas shadow-[var(--shadow-card-float)] animate-promo-pop">
        {/* Close */}
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={close}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/45"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 모델 이미지 + 그라데이션 배경 */}
        <div className="relative h-[218px] w-full bg-gradient-to-b from-primary-soft via-surface-warm to-canvas">
          <Image
            src="/images/wix/hero-slide1-model.png"
            alt="강남페이스명가 회귀 관리 모델"
            fill
            sizes="400px"
            priority
            className="object-contain object-bottom"
          />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-accent-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-accent shadow">
            <Sparkles className="h-3.5 w-3.5" /> First Visit
          </span>
        </div>

        {/* 카피 */}
        <div className="px-7 pb-2 pt-4 text-center">
          <p className="text-[13px] font-semibold tracking-wide text-muted">
            강남페이스명가 첫 방문 고객님께
          </p>
          <h2 className="mt-1.5 text-[30px] font-bold leading-tight tracking-tight text-ink">
            첫 관리 <span className="text-primary">50% 할인</span>
          </h2>
          <p className="mt-2.5 text-[14px] leading-relaxed text-body">
            30년 경력 강희석 원장의 1:1 회귀 관리,
            <br />
            지금 예약하시면 첫 방문{" "}
            <b className="text-accent-gold-active">반값</b> 혜택을 드립니다.
          </p>

          <a href="#contact" onClick={close} className="btn-primary mt-5 w-full">
            지금 예약 상담받기
          </a>
          <a
            href="https://open.kakao.com/o/sPLmnEyi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="btn-kakao mt-2.5 w-full"
          >
            <MessageCircle className="h-4 w-4" /> 카카오톡으로 문의
          </a>
        </div>

        {/* 푸터: 오늘 하루 보지 않기 / 닫기 */}
        <div className="mt-3 flex items-center justify-between border-t border-hairline px-6 py-3">
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
