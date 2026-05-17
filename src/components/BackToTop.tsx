"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button. Hidden until the user has scrolled
 * past `threshold` pixels, then fades in. Stacks above the floating
 * KakaoTalk button on both mobile and desktop.
 */
export function BackToTop({ threshold = 400 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 z-40 h-12 w-12 rounded-full bg-canvas border border-hairline flex items-center justify-center text-muted hover:text-primary hover:border-primary hover:shadow-[var(--shadow-card-float)] transition-all bottom-[148px] md:bottom-[88px] ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
