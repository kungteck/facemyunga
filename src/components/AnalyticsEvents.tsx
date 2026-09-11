"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    fbq?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * 클릭 이벤트 위임 트래커.
 * data-track="이벤트명" 속성이 붙은 요소(또는 그 자식)를 클릭하면
 * GA4(gtag)와 Meta Pixel(fbq) 양쪽에 같은 이름의 이벤트를 전송한다.
 * /admin 에서는 layout 의 부트스트랩이 gtag/fbq 를 만들지 않으므로 아무 것도 전송되지 않는다.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const el = target.closest("[data-track]");
      if (!el) return;
      const name = el.getAttribute("data-track");
      if (!name) return;
      // 클릭 1회당 개별 이벤트 1건 + 합계 이벤트 book_action 1건을 보낸다.
      // 메타: 타겟 규칙이 타겟당 조건 5개 제한이라 6개 버튼을 하나로 묶어야 함.
      // GA4: 유입 매체별 "예약 행동 총합"을 단일 지표로 보기 위함. book_action 은
      //      주요 이벤트로 등록하지 않아야 전환 수가 이중 집계되지 않는다.
      if (typeof window.gtag === "function") {
        window.gtag("event", name);
        window.gtag("event", "book_action");
      }
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", name);
        window.fbq("trackCustom", "book_action");
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
