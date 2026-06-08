"use client";

import { useEffect, useRef } from "react";

/**
 * 카카오맵 지도퍼가기(roughmap) — API 키 불필요, 카카오 무료 임베드.
 * 카카오맵 "지도 퍼가기 > 소스 생성하기"로 받은 timestamp/key 를 사용한다.
 *
 * SPA(React) 대응:
 *   카카오 로더(roughmapLoader.js)는 실제 지도 코드(roughmapLander.js)를
 *   `document.write` 로 주입한다. 그런데 useEffect 는 문서 로드가 끝난 뒤
 *   실행되므로 이때의 document.write 는 브라우저가 무시한다 → Lander 가
 *   영영 정의되지 않아 지도가 빈 채로 남는다.
 *   그래서 로더는 "메타 세팅용"으로만 쓰고(window.daum.roughmap 의 cdn/phase),
 *   실제 roughmapLander.js 는 우리가 직접 <script> 로 주입한다.
 *   (roughmapLander.js 자체는 document.write 를 쓰지 않아 SPA 에서 정상 동작.)
 *
 * 새 위치로 바꾸려면 카카오맵에서 코드를 다시 받아 timestamp/key 만 교체.
 */
const TIMESTAMP = "1780057399836";
const KEY = "2csg4tgguu49";
const LOADER_SRC = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";
const CONTAINER_ID = `daumRoughmapContainer${TIMESTAMP}`;

type Lander = { render: () => void };
type Roughmap = {
  Lander?: new (o: Record<string, string>) => Lander;
  cdn?: string;
  phase?: string;
};
type DaumNS = { roughmap?: Roughmap };

export function KakaoMap() {
  const done = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let landerRequested = false;
    const w = window as unknown as { daum?: DaumNS };

    // Lander 가 준비됐으면 지도를 그린다.
    const render = () => {
      if (done.current || cancelled) return true;
      const LanderCtor = w.daum?.roughmap?.Lander;
      if (!LanderCtor) return false;
      // StrictMode 이중 실행/재마운트 시 중복 렌더 방지
      const el = document.getElementById(CONTAINER_ID);
      if (el) el.innerHTML = "";
      new LanderCtor({
        timestamp: TIMESTAMP,
        key: KEY,
        mapWidth: "640",
        mapHeight: "360",
      }).render();
      done.current = true;
      return true;
    };

    // 로더가 세팅한 메타(cdn/phase)로 실제 Lander 스크립트를 직접 주입한다.
    const requestLander = () => {
      const rm = w.daum?.roughmap;
      if (!rm?.cdn) return; // 로더 메타가 아직 준비되지 않음
      landerRequested = true;
      const proto = location.protocol === "https:" ? "https:" : "http:";
      const phase = rm.phase || "prod";
      const src = `${proto}//t1.kakaocdn.net/kakaomapweb/roughmap/place/${phase}/${rm.cdn}/roughmapLander.js`;
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.charset = "UTF-8";
      s.onload = render;
      document.body.appendChild(s);
    };

    if (render()) return;

    // 메타 세팅용 로더 주입 (이미 있으면 재사용)
    if (!document.querySelector(`script[src="${LOADER_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = LOADER_SRC;
      s.charset = "UTF-8";
      document.body.appendChild(s);
    }

    // 로더 메타 준비 → Lander 스크립트 주입 → render 까지 폴링.
    // (onload 가 누락돼도 폴링이 render 를 재시도하는 안전망)
    const iv = setInterval(() => {
      if (render()) {
        clearInterval(iv);
        return;
      }
      if (!landerRequested) requestLander();
    }, 200);
    const to = setTimeout(() => clearInterval(iv), 10000);

    return () => {
      cancelled = true;
      clearInterval(iv);
      clearTimeout(to);
    };
  }, []);

  return (
    <div
      id={CONTAINER_ID}
      className="root_daum_roughmap root_daum_roughmap_landing w-full overflow-hidden rounded-[14px] border border-hairline"
    />
  );
}
