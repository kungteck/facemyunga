"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, Calendar, MessageCircle } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  links: NavLink[];
}

/**
 * Mobile hamburger menu — slides in from the right with a backdrop.
 * Closes on link tap, backdrop click, or ESC.
 *
 * 드로어/백드롭은 createPortal 로 document.body 에 직접 렌더한다.
 *   헤더에 backdrop-blur(backdrop-filter)가 걸려 있으면, 그 안의 fixed 자식은
 *   containing block 이 viewport 가 아니라 헤더 박스로 바뀌어 드로어가 헤더
 *   영역(72px)에 갇힌다. body 로 포털해 헤더 밖으로 빼면 fixed inset-0 이
 *   viewport 기준이 되어 정상 표시된다.
 *   래퍼의 overflow-hidden 은 닫힌 드로어(translate-x-full, 화면 밖)가 가로
 *   스크롤을 만들지 않도록 클립하는 용도.
 */
export function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);
  // 포털 대상(document.body)은 클라이언트에서만 존재 → 마운트 후 렌더
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC key closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overlay = (
    <div
      className={`md:hidden fixed inset-0 z-50 overflow-hidden ${
        open ? "" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
        className={`absolute top-0 right-0 bottom-0 w-[82%] max-w-[340px] bg-canvas shadow-[var(--shadow-card-float)] transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
          <span className="text-[15px] font-semibold tracking-tight">메뉴</span>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-surface-soft transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3.5 text-[16px] font-medium text-ink rounded-[10px] hover:bg-surface-soft active:bg-surface-strong transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-5 border-t border-hairline px-1 space-y-2.5">
            <a
              href="tel:041-567-0341"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[15px] text-body rounded-[10px] hover:bg-surface-soft transition-colors tabular-nums"
            >
              <Phone className="h-4 w-4 text-primary" />
              041-567-0341
            </a>
            <a
              href="https://open.kakao.com/o/sPLmnEyi"
                target="_blank"
                rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-kakao w-full"
            >
              <MessageCircle className="h-4 w-4" /> 카카오톡 상담
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              <Calendar className="h-4 w-4 mr-2" /> 예약 상담
            </a>
          </div>
        </nav>

        <div className="px-5 py-4 border-t border-hairline text-xs text-muted">
          매일 10:00 – 20:00
          <br />
          충청남도 천안시 동남구 대흥동85
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-surface-soft transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
