"use client";

import { useState } from "react";
import site from "@/content/site.json";

/**
 * /admin — 콘텐츠 관리 화면.
 * - 로그인: POST /api/login (CF Function 이 ID/PW 검증 후 세션 쿠키 발급).
 * - 편집: site.json 사본을 폼으로 수정 → POST /api/save (GitHub 커밋 → 자동 배포).
 * - 이미지: 파일 선택 → POST /api/upload (GitHub 에 업로드, 경로 반환) → 해당 필드에 채움.
 *
 * 모든 섹션(연락처·히어로·스토리·자가진단·영상·시술·시그니처·전후·갤러리·리뷰·이벤트)을
 * 편집할 수 있다. 상태는 structuredClone 후 mutate 하는 update() 헬퍼로 갱신한다.
 */
type Site = typeof site;

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("read error"));
    reader.readAsDataURL(file);
  });
}

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

  // 불변 업데이트: 사본을 만들고 mutate 한 뒤 교체
  const update = (fn: (d: Site) => void) =>
    setData((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });

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
      setErr("로그인 중 오류가 발생했습니다.");
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
  const {
    contact,
    hero,
    brandStory,
    selfCheck,
    videos,
    treatments,
    signature,
    beforeAfter,
    gallery,
    reviews,
    promo,
  } = data;

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
          사이트에 반영됩니다. 이미지는 파일을 고르면 자동 업로드된 뒤 경로가
          채워집니다.
        </p>

        {/* 연락처 */}
        <Section title="연락처">
          <Field label="전화 1" value={contact.phone1} onChange={(v) => update((d) => { d.contact.phone1 = v; })} />
          <Field label="전화 2" value={contact.phone2} onChange={(v) => update((d) => { d.contact.phone2 = v; })} />
          <Field label="주소 (1줄)" value={contact.addressLine1} onChange={(v) => update((d) => { d.contact.addressLine1 = v; })} />
          <Field label="주소 (2줄)" value={contact.addressLine2} onChange={(v) => update((d) => { d.contact.addressLine2 = v; })} />
          <Field label="주소 (전체/푸터)" value={contact.addressFull} onChange={(v) => update((d) => { d.contact.addressFull = v; })} />
          <Field label="운영시간" value={contact.hours} onChange={(v) => update((d) => { d.contact.hours = v; })} />
          <Field label="사업자등록번호" value={contact.bizNo} onChange={(v) => update((d) => { d.contact.bizNo = v; })} />
          <Field label="카카오 오픈채팅 URL" value={contact.kakaoUrl} onChange={(v) => update((d) => { d.contact.kakaoUrl = v; })} />
        </Section>

        {/* 히어로 */}
        <Section title="메인 상단 (히어로)">
          <ImageField label="히어로 배경 이미지" value={hero.image} onChange={(v) => update((d) => { d.hero.image = v; })} />
          <Field label="헤드라인 1줄" value={hero.headline[0]} onChange={(v) => update((d) => { d.hero.headline[0] = v; })} />
          <Field label="헤드라인 2줄" value={hero.headline[1]} onChange={(v) => update((d) => { d.hero.headline[1] = v; })} />
          <Field label="헤드라인 3줄 (강조)" value={hero.headline[2]} onChange={(v) => update((d) => { d.hero.headline[2] = v; })} />
          <Field label="서브 문구" multiline value={hero.subtitle} onChange={(v) => update((d) => { d.hero.subtitle = v; })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="시그니처 카드 제목" value={hero.signatureCardTitle} onChange={(v) => update((d) => { d.hero.signatureCardTitle = v; })} />
            <Field label="시그니처 카드 설명" value={hero.signatureCardDesc} onChange={(v) => update((d) => { d.hero.signatureCardDesc = v; })} />
          </div>
          <ArrayField
            label="상단 배지"
            items={hero.badges}
            onItem={(i, v) => update((d) => { d.hero.badges[i] = v; })}
            onAdd={() => update((d) => { d.hero.badges.push(""); })}
            onDel={(i) => update((d) => { d.hero.badges.splice(i, 1); })}
          />
          <div>
            <span className="block text-sm font-medium mb-1.5">통계 (라벨 · 값 · 단위)</span>
            <div className="space-y-2">
              {hero.stats.map((s, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <input value={s.label} onChange={(e) => update((d) => { d.hero.stats[i].label = e.target.value; })} placeholder="라벨" className={inputCls} />
                  <input value={s.value} onChange={(e) => update((d) => { d.hero.stats[i].value = e.target.value; })} placeholder="값" className={inputCls} />
                  <input value={s.unit} onChange={(e) => update((d) => { d.hero.stats[i].unit = e.target.value; })} placeholder="단위" className={inputCls} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 브랜드 스토리 */}
        <Section title="브랜드 스토리">
          <ImageField label="원장님 사진" value={brandStory.image} onChange={(v) => update((d) => { d.brandStory.image = v; })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="사진 카드 이름" value={brandStory.doctorCardName} onChange={(v) => update((d) => { d.brandStory.doctorCardName = v; })} />
            <Field label="사진 카드 설명" value={brandStory.doctorCardDesc} onChange={(v) => update((d) => { d.brandStory.doctorCardDesc = v; })} />
          </div>
          <Field label="제목" multiline value={brandStory.title} onChange={(v) => update((d) => { d.brandStory.title = v; })} />
          {brandStory.paragraphs.map((p, i) => (
            <Field key={i} label={`문단 ${i + 1}`} multiline value={p} onChange={(v) => update((d) => { d.brandStory.paragraphs[i] = v; })} />
          ))}
          <Field label="서명" value={brandStory.signature} onChange={(v) => update((d) => { d.brandStory.signature = v; })} />
        </Section>

        {/* 자가진단 */}
        <Section title="자가진단 (이런 고민, 있으세요?)">
          <Field label="제목" value={selfCheck.title} onChange={(v) => update((d) => { d.selfCheck.title = v; })} />
          <Field label="설명" multiline value={selfCheck.desc} onChange={(v) => update((d) => { d.selfCheck.desc = v; })} />
          <ArrayField
            label="진단 항목"
            items={selfCheck.items}
            onItem={(i, v) => update((d) => { d.selfCheck.items[i] = v; })}
            onAdd={() => update((d) => { d.selfCheck.items.push(""); })}
            onDel={(i) => update((d) => { d.selfCheck.items.splice(i, 1); })}
          />
        </Section>

        {/* 영상 */}
        <Section title="유튜브 영상">
          {videos.map((vd, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">영상 {i + 1}</span>
                <button type="button" onClick={() => update((d) => { d.videos.splice(i, 1); })} className="text-xs text-error hover:underline">삭제</button>
              </div>
              <Field label="유튜브 ID (youtu.be/ 또는 watch?v= 뒤의 코드)" value={vd.id} onChange={(v) => update((d) => { d.videos[i].id = v; })} />
              <Field label="제목" value={vd.title} onChange={(v) => update((d) => { d.videos[i].title = v; })} />
              <Field label="채널" value={vd.channel} onChange={(v) => update((d) => { d.videos[i].channel = v; })} />
            </div>
          ))}
          <button type="button" onClick={() => update((d) => { d.videos.push({ id: "", title: "", channel: "" }); })} className="btn-secondary h-10 text-sm w-full">+ 영상 추가</button>
        </Section>

        {/* 시술 */}
        <Section title="시술 (이미지 · 가격)">
          <Field label="섹션 제목" value={treatments.title} onChange={(v) => update((d) => { d.treatments.title = v; })} />
          <Field label="섹션 설명" value={treatments.desc} onChange={(v) => update((d) => { d.treatments.desc = v; })} />
          {treatments.items.map((t, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <ImageField label="시술 사진" value={t.img} onChange={(v) => update((d) => { d.treatments.items[i].img = v; })} />
              <Field label="시술명" value={t.name} onChange={(v) => update((d) => { d.treatments.items[i].name = v; })} />
              <Field label="설명" value={t.desc} onChange={(v) => update((d) => { d.treatments.items[i].desc = v; })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="소요시간" value={t.duration} onChange={(v) => update((d) => { d.treatments.items[i].duration = v; })} />
                <NumField label="패키지 횟수" value={t.pkgCount} onChange={(v) => update((d) => { d.treatments.items[i].pkgCount = v; })} />
                <NumField label="1회 가격(원)" value={t.priceFrom} onChange={(v) => update((d) => { d.treatments.items[i].priceFrom = v; })} />
                <NumField label="패키지 가격(원)" value={t.pkgPrice} onChange={(v) => update((d) => { d.treatments.items[i].pkgPrice = v; })} />
              </div>
            </div>
          ))}
        </Section>

        {/* 시그니처 */}
        <Section title="시그니처 회귀 관리">
          <Field label="제목" multiline value={signature.title} onChange={(v) => update((d) => { d.signature.title = v; })} />
          <Field label="설명" multiline value={signature.desc} onChange={(v) => update((d) => { d.signature.desc = v; })} />
          {signature.steps.map((s, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="단계" value={s.step} onChange={(v) => update((d) => { d.signature.steps[i].step = v; })} />
                <Field label="제목" value={s.title} onChange={(v) => update((d) => { d.signature.steps[i].title = v; })} />
              </div>
              <Field label="설명" value={s.desc} onChange={(v) => update((d) => { d.signature.steps[i].desc = v; })} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <NumField label="패키지 가격(원)" value={signature.packagePrice} onChange={(v) => update((d) => { d.signature.packagePrice = v; })} />
            <Field label="패키지 횟수" value={signature.packageCount} onChange={(v) => update((d) => { d.signature.packageCount = v; })} />
          </div>
          <ArrayField
            label="포함 항목"
            items={signature.includes}
            onItem={(i, v) => update((d) => { d.signature.includes[i] = v; })}
            onAdd={() => update((d) => { d.signature.includes.push(""); })}
            onDel={(i) => update((d) => { d.signature.includes.splice(i, 1); })}
          />
        </Section>

        {/* 전후 */}
        <Section title="전후 비교 사진">
          <Field label="섹션 제목" value={beforeAfter.title} onChange={(v) => update((d) => { d.beforeAfter.title = v; })} />
          <Field label="섹션 설명" value={beforeAfter.desc} onChange={(v) => update((d) => { d.beforeAfter.desc = v; })} />
          {beforeAfter.pairs.map((p, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <Field label="케이스 라벨" value={p.caseLabel} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].caseLabel = v; })} />
              <div className="grid grid-cols-2 gap-3">
                <ImageField label="Before (왼쪽)" value={p.before} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].before = v; })} />
                <ImageField label="After (오른쪽)" value={p.after} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].after = v; })} />
              </div>
              <details className="text-sm">
                <summary className="cursor-pointer text-muted">고급: 얼굴 정렬값 (사진 교체 후 미세조정)</summary>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <NumField label="Before 세로위치(y)" value={p.beforeAdjust.face.y} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].beforeAdjust.face.y = v; })} />
                  <NumField label="Before 얼굴크기(h)" value={p.beforeAdjust.face.h} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].beforeAdjust.face.h = v; })} />
                  <NumField label="After 세로위치(y)" value={p.afterAdjust.face.y} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].afterAdjust.face.y = v; })} />
                  <NumField label="After 얼굴크기(h)" value={p.afterAdjust.face.h} onChange={(v) => update((d) => { d.beforeAfter.pairs[i].afterAdjust.face.h = v; })} />
                </div>
              </details>
            </div>
          ))}
        </Section>

        {/* 갤러리 */}
        <Section title="갤러리">
          <Field label="섹션 제목" value={gallery.title} onChange={(v) => update((d) => { d.gallery.title = v; })} />
          <Field label="섹션 설명" multiline value={gallery.desc} onChange={(v) => update((d) => { d.gallery.desc = v; })} />
          <div className="space-y-3">
            {gallery.images.map((img, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <ImageField label={`사진 ${i + 1}`} value={img} onChange={(v) => update((d) => { d.gallery.images[i] = v; })} />
                </div>
                <button type="button" onClick={() => update((d) => { d.gallery.images.splice(i, 1); })} className="h-12 px-3 text-xs text-error hover:underline shrink-0">삭제</button>
              </div>
            ))}
            <button type="button" onClick={() => update((d) => { d.gallery.images.push(""); })} className="btn-secondary h-10 text-sm w-full">+ 사진 추가</button>
          </div>
        </Section>

        {/* 리뷰 */}
        <Section title="고객 후기">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-[12px] border border-hairline p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">후기 {i + 1}</span>
                <button type="button" onClick={() => update((d) => { d.reviews.splice(i, 1); })} className="text-xs text-error hover:underline">삭제</button>
              </div>
              <Field label="내용" multiline value={r.text} onChange={(v) => update((d) => { d.reviews[i].text = v; })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="작성자" value={r.author} onChange={(v) => update((d) => { d.reviews[i].author = v; })} />
                <Field label="날짜" value={r.date} onChange={(v) => update((d) => { d.reviews[i].date = v; })} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => update((d) => { d.reviews.push({ rating: 5, text: "", author: "", date: "" }); })} className="btn-secondary h-10 text-sm w-full">+ 후기 추가</button>
        </Section>

        {/* 이벤트 */}
        <Section title="첫 방문 이벤트 팝업">
          <label className="flex items-center gap-2.5 text-sm">
            <input type="checkbox" checked={promo.enabled} onChange={(e) => update((d) => { d.promo.enabled = e.target.checked; })} className="h-4 w-4 accent-primary" />
            팝업 켜기
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Field label="할인율 (숫자만)" value={promo.discount} onChange={(v) => update((d) => { d.promo.discount = v; })} />
            <Field label="배지 (영문)" value={promo.badge} onChange={(v) => update((d) => { d.promo.badge = v; })} />
          </div>
          <Field label="상단 안내" value={promo.lead} onChange={(v) => update((d) => { d.promo.lead = v; })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="제목 (위)" value={promo.headlineTop} onChange={(v) => update((d) => { d.promo.headlineTop = v; })} />
            <Field label="제목 (아래)" value={promo.headlineBottom} onChange={(v) => update((d) => { d.promo.headlineBottom = v; })} />
          </div>
          <Field label="안내 문구" multiline value={promo.body} onChange={(v) => update((d) => { d.promo.body = v; })} />
          <Field label="버튼 문구" value={promo.cta} onChange={(v) => update((d) => { d.promo.cta = v; })} />
        </Section>
      </div>
    </main>
  );
}

const inputCls =
  "w-full h-11 rounded-[10px] border border-hairline px-3 text-sm focus:border-primary outline-none transition-colors";

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

function ArrayField({
  label,
  items,
  onItem,
  onAdd,
  onDel,
}: {
  label: string;
  items: string[];
  onItem: (i: number, v: string) => void;
  onAdd: () => void;
  onDel: (i: number) => void;
}) {
  return (
    <div>
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input value={it} onChange={(e) => onItem(i, e.target.value)} className={inputCls} />
            <button type="button" onClick={() => onDel(i)} className="h-11 px-3 text-sm text-error hover:underline shrink-0" aria-label="삭제">✕</button>
          </div>
        ))}
        <button type="button" onClick={onAdd} className="btn-secondary h-10 text-sm w-full">+ 추가</button>
      </div>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, dataUrl }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok && j.path) onChange(j.path);
      else setError("업로드 실패 (로그인/배포 상태 확인)");
    } catch {
      setError("업로드 오류");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 shrink-0 rounded-[10px] border border-hairline bg-surface-soft overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[10px] text-muted">없음</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="file"
            accept="image/*"
            onChange={onPick}
            className="block w-full text-sm text-muted file:mr-3 file:rounded-[8px] file:border-0 file:bg-surface-soft file:px-3 file:py-2 file:text-sm file:font-medium file:text-ink hover:file:bg-hairline/50"
          />
          <p className="mt-1 text-[11px] truncate">
            {busy ? (
              <span className="text-primary">업로드 중…</span>
            ) : error ? (
              <span className="text-error">{error}</span>
            ) : (
              <span className="text-muted">{value || "이미지를 선택하세요"}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
