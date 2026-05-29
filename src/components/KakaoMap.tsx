"use client";

import { useEffect, useRef } from "react";

/**
 * 카카오맵 지도퍼가기(roughmap) — API 키 불필요, 카카오 무료 임베드.
 * 카카오맵 "지도 퍼가기 > 소스 생성하기"로 받은 HTML 임베드 코드를
 * React 클라이언트 컴포넌트로 래핑한 것.
 *
 * 원본은 <div> + loader <script> + 실행 <script>(Lander.render()) 구조인데,
 * SPA(React)에는 실행 스크립트를 직접 넣을 수 없어 useEffect에서 로더를
 * 주입하고 daum.roughmap.Lander 가 준비되면 render() 를 호출한다.
 *
 * 새 위치로 바꾸려면 카카오맵에서 코드를 다시 받아 timestamp/key 만 교체.
 */
const TIMESTAMP = "1780057399836";
const KEY = "2csg4tgguu49";
const LOADER_SRC = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";
const CONTAINER_ID = `daumRoughmapContainer${TIMESTAMP}`;

type Lander = { render: () => void };
type DaumRoughmap = {
  roughmap?: { Lander?: new (o: Record<string, string>) => Lander };
};

export function KakaoMap() {
  const done = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (done.current || cancelled) return false;
      const w = window as unknown as { daum?: DaumRoughmap };
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

    if (tryRender()) return;

    if (!document.querySelector(`script[src="${LOADER_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = LOADER_SRC;
      s.charset = "UTF-8";
      document.body.appendChild(s);
    }

    // 로더 로드 후 daum.roughmap 가 준비될 때까지 폴링
    const iv = setInterval(() => {
      if (tryRender()) clearInterval(iv);
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
