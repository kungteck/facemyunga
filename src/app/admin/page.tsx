"use client";

import { useState } from "react";
import site from "@/content/site.json";

/**
 * /admin — 콘텐츠 관리 화면.
 * - 로그인: POST /api/login (서버에서 ID/PW 검증, 세션 쿠키 발급). 서버 기능은
 *   다음 단계에서 functions/api/login 으로 추가한다(비밀번호는 CF 환경변수).
 * - 편집: site.json 사본을 폼으로 수정 → POST /api/save (GitHub 커밋 → 자동 배포).
 *
 * 이 페이지 자체는 정적(빌드 시 site.json 초기값 포함)이고, 인증/저장만 서버
 * 기능을 호출한다.
 */
type Site = typeof site;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Site>(() =>
    JSON.parse(JSON.stringify(site)),
  );
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
      });
      if (res.ok) setAuthed(true);
      else setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
    } catch {
      setErr("로그인 중 오류가 발생했습니다. (서버 기능 연결 전일 수 있어요)");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      });
      if (res.ok)
        setSaveMsg("✅ 저장 완료! 1~2분 뒤 사이트에 자동 반영됩니다.");
      else setSaveMsg("❌ 저장 실패. 잠시 후 다시 시도해주세요.");
    } catch {
      setSaveMsg("❌ 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // ── 로그인 화면 ──────────────────────────────────────────────
  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface-soft px-5">
        <form
          onSubmit={login}
          className="w-full max-w-[380px] bg-canvas rounded-[20px] border border-hairline shadow-[var(--shadow-card-float)] p-8"
        >
          <div className="text-center mb-7">
            <p className="uppercase text-[10px] tracking-[0.08em] font-bold text-primary mb-2">
              ADMIN
            </p>
            <h1 className="text-[22px] font-semibold tracking-tight">
              강남페이스명가 관리자
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              홈페이지 콘텐츠를 수정합니다.
            </p>
          </div>

          <label className="block text-sm font-medium mb-1.5">아이디</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
            className="w-full h-12 rounded-[10px] border border-hairline px-4 mb-4 focus:border-primary outline-none transition-colors"
          />

          <label className="block text-sm font-medium mb-1.5">비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="current-password"
            className="w-full h-12 rounded-[10px] border border-hairline px-4 mb-5 focus:border-primary outline-none transition-colors"
          />

          {err && <p className="text-sm text-error mb-4">{err}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "확인 중…" : "로그인"}
          </button>
        </form>
      </main>
    );
  }

  // ── 편집 화면 ────────────────────────────────────────────────
  const { contact, hero, reviews, promo, treatments } = data;

  return (
    <main className="min-h-screen bg-surface-soft pb-32">
      {/* 상단 바 */}
      <header className="sticky top-0 z-10 bg-canvas/95 backdrop-blur border-b border-hairline">
        <div className="mx-auto max-w-[760px] px-5 h-16 flex items-center justify-between">
          <p className="font-semibold tracking-tight">콘텐츠 편집</p>
          <div className="flex items-center gap-3">
            {saveMsg && <span className="text-sm text-muted">{saveMsg}</span>}
            <button
              onClick={save}
              disabled={saving}
              className="btn-primary h-10 px-6 text-sm"
            >
              {saving ? "저장 중…" : "적용 (배포)"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[760px] px-5 py-8 space-y-8">
        <p className="text-sm text-muted">
          수정 후 우측 상단 <b>적용</b>을 누르면 GitHub에 저장되고 1~2분 뒤
          사이트에 반영됩니다. (이미지 업로드·나머지 섹션은 곧 추가됩니다)
        </p>

        {/* 연락처 */}
        <Section title="연락처">
          <Field label="전화 1" value={contact.phone1} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, phone1: v } }))} />
          <Field label="전화 2" value={contact.phone2} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, phone2: v } }))} />
          <Field label="주소 (1줄)" value={contact.addressLine1} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, addressLine1: v } }))} />
          <Field label="주소 (2줄)" value={contact.addressLine2} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, addressLine2: v } }))} />
          <Field label="주소 (전체/푸터)" value={contact.addressFull} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, addressFull: v } }))} />
          <Field label="운영시간" value={contact.hours} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, hours: v } }))} />
          <Field label="사업자등록번호" value={contact.bizNo} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, bizNo: v } }))} />
          <Field label="카카오 오픈채팅 URL" value={contact.kakaoUrl} onChange={(v) => setData((d) => ({ ...d, contact: { ...d.contact, kakaoUrl: v } }))} />
        </Section>

        {/* 히어로 문구 */}
        <Section title="메인 상단(히어로) 문구">
          <Field label="헤드라인 1줄" value={hero.headline[0]} onChange={(v) => setData((d) => { const h = [...d.hero.headline]; h[0] = v; return { ...d, hero: { ...d.hero, headline: h } }; })} />
          <Field label="헤드라인 2줄" value={hero.headline[1]} onChange={(v) => setData((d) => { const h = [...d.hero.headline]; h[1] = v; return { ...d, hero: { ...d.hero, headline: h } }; })} />
          <Field label="헤드라인 3줄 (강조)" value={hero.headline[2]} onChange={(v) => setData((d) => { const h = [...d.hero.headline]; h[2] = v; return { ...d, hero: { ...d.hero, headline: h } }; })} />
          <Field label="서브 문구" multiline value={hero.subtitle} onChange={(v) => setData((d) => ({ ...d, hero: { ...d.hero, subtitle: v } }))} />
        </Section>

        {/* 가격 */}
        <Section title="시술 가격">
          {treatments.items.map((t, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <Field label="시술명" value={t.name} onChange={(v) => setData((d) => { const items = [...d.treatments.items]; items[i] = { ...items[i], name: v }; return { ...d, treatments: { ...d.treatments, items } }; })} />
              <Field label="설명" value={t.desc} onChange={(v) => setData((d) => { const items = [...d.treatments.items]; items[i] = { ...items[i], desc: v }; return { ...d, treatments: { ...d.treatments, items } }; })} />
              <div className="grid grid-cols-2 gap-3">
                <NumField label="1회 가격(원)" value={t.priceFrom} onChange={(v) => setData((d) => { const items = [...d.treatments.items]; items[i] = { ...items[i], priceFrom: v }; return { ...d, treatments: { ...d.treatments, items } }; })} />
                <NumField label="패키지 가격(원)" value={t.pkgPrice} onChange={(v) => setData((d) => { const items = [...d.treatments.items]; items[i] = { ...items[i], pkgPrice: v }; return { ...d, treatments: { ...d.treatments, items } }; })} />
              </div>
            </div>
          ))}
        </Section>

        {/* 리뷰 */}
        <Section title="고객 후기">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">후기 {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setData((d) => ({ ...d, reviews: d.reviews.filter((_, j) => j !== i) }))}
                  className="text-xs text-error hover:underline"
                >
                  삭제
                </button>
              </div>
              <Field label="내용" multiline value={r.text} onChange={(v) => setData((d) => { const rv = [...d.reviews]; rv[i] = { ...rv[i], text: v }; return { ...d, reviews: rv }; })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="작성자" value={r.author} onChange={(v) => setData((d) => { const rv = [...d.reviews]; rv[i] = { ...rv[i], author: v }; return { ...d, reviews: rv }; })} />
                <Field label="날짜" value={r.date} onChange={(v) => setData((d) => { const rv = [...d.reviews]; rv[i] = { ...rv[i], date: v }; return { ...d, reviews: rv }; })} />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData((d) => ({ ...d, reviews: [...d.reviews, { rating: 5, text: "", author: "", date: "" }] }))}
            className="btn-secondary h-10 text-sm w-full"
          >
            + 후기 추가
          </button>
        </Section>

        {/* 이벤트 모달 */}
        <Section title="첫 방문 이벤트 팝업">
          <label className="flex items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={promo.enabled}
              onChange={(e) => setData((d) => ({ ...d, promo: { ...d.promo, enabled: e.target.checked } }))}
              className="h-4 w-4 accent-primary"
            />
            팝업 켜기
          </label>
          <Field label="할인율 (숫자만)" value={promo.discount} onChange={(v) => setData((d) => ({ ...d, promo: { ...d.promo, discount: v } }))} />
          <Field label="안내 문구" multiline value={promo.body} onChange={(v) => setData((d) => ({ ...d, promo: { ...d.promo, body: v } }))} />
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-canvas rounded-[16px] border border-hairline p-6">
      <h2 className="text-[17px] font-semibold tracking-tight mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-[10px] border border-hairline px-4 py-3 focus:border-primary outline-none transition-colors resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 rounded-[10px] border border-hairline px-4 focus:border-primary outline-none transition-colors"
        />
      )}
    </label>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-12 rounded-[10px] border border-hairline px-4 focus:border-primary outline-none transition-colors tabular-nums"
      />
    </label>
  );
}
