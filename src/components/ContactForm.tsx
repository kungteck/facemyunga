"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

/**
 * 간편 문의 폼 — Web3Forms 연동 (정적 사이트용, 서버 불필요).
 * 클라이언트에서 https://api.web3forms.com/submit 로 직접 POST.
 *
 * 키 주입: `NEXT_PUBLIC_WEB3FORMS_KEY` 환경변수.
 *   - 로컬: 프로젝트 루트 `.env.local` 에 `NEXT_PUBLIC_WEB3FORMS_KEY=...`
 *   - 배포: GitHub Secret + deploy.yml build step env (이미 주입 설정됨)
 * 키가 없으면 제출 시 전화 안내로 graceful fallback.
 *
 * 스팸 방지: Web3Forms 의 `botcheck` 허니팟 체크박스(숨김) 사용.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full h-[52px] px-4 rounded-[8px] border border-hairline focus:outline-none focus:border-primary focus:border-2";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setMessage("문의 폼이 아직 설정 중입니다. 위의 전화로 예약해 주세요.");
      return;
    }

    setStatus("submitting");
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "[강남페이스명가] 홈페이지 간편 문의");
    formData.append("from_name", "강남페이스명가 홈페이지");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setMessage(data.message || "전송에 실패했습니다. 전화로 문의해 주세요.");
      }
    } catch {
      setStatus("error");
      setMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-3 rounded-[14px] bg-primary-soft p-5 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
        <p className="mt-2 text-[15px] font-semibold text-ink">
          예약 신청이 접수되었습니다
        </p>
        <p className="mt-1 text-sm text-muted">확인 후 빠르게 연락드리겠습니다.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3">
      <input
        type="text"
        name="name"
        required
        placeholder="이름"
        autoComplete="name"
        aria-label="이름"
        className={inputCls}
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="전화번호"
        autoComplete="tel"
        inputMode="tel"
        aria-label="전화번호"
        className={`${inputCls} tabular-nums`}
      />
      <textarea
        name="message"
        placeholder="문의 사항 (선택)"
        rows={3}
        aria-label="문의 사항"
        className="w-full px-4 py-3 rounded-[8px] border border-hairline focus:outline-none focus:border-primary focus:border-2"
      />
      {/* 허니팟 — 봇이 채우면 Web3Forms 가 스팸으로 처리 */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {status === "error" && (
        <p className="text-sm text-error" role="alert">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 전송 중...
          </>
        ) : (
          "예약 신청"
        )}
      </button>
      <p className="text-[11px] text-muted text-center">
        남겨주시면 확인 후 빠르게 연락드립니다.
      </p>
    </form>
  );
}
