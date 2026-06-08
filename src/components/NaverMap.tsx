"use client";

import { useEffect, useRef } from "react";

/**
 * 네이버 지도 (NAVER Maps API v3 / NCP Web Dynamic Map).
 *
 * 키: NCP Maps Application 의 Client ID(ncpKeyId). 이 값은 브라우저에 노출되는
 *   공개 값이고, NCP 에 등록한 "Web 서비스 URL"(도메인) 에서만 동작하도록 제한되어
 *   안전하므로 코드에 직접 둔다(Client Secret 은 사용하지 않음). 환경변수
 *   `NEXT_PUBLIC_NCP_MAP_KEY` 가 있으면 그 값을 우선 사용한다.
 *   - 등록된 Web 서비스 URL: https://facemyunga.com, http://localhost:3000
 *     (www 는 facemyunga.com 의 하위 도메인으로 함께 허용됨)
 *
 * 위치는 주소를 geocoder submodule 로 좌표 변환해 구한다(좌표 하드코딩 불필요).
 * 지오코딩 실패 시 fallback 좌표(천안 대흥동 근사값)로 표시.
 */
const NCP_KEY = process.env.NEXT_PUBLIC_NCP_MAP_KEY || "vskowkxd63";
const ADDRESS = "충청남도 천안시 동남구 대흥동 85";
const FALLBACK = { lat: 36.8093, lng: 127.1502 };
const SCRIPT_ID = "naver-maps-sdk";

type Naver = {
  maps: {
    Map: new (el: HTMLElement, opt: Record<string, unknown>) => unknown;
    Marker: new (opt: Record<string, unknown>) => unknown;
    LatLng: new (lat: number, lng: number) => unknown;
    Service?: {
      geocode: (
        opt: { query: string },
        cb: (
          status: string,
          res: { v2?: { addresses?: Array<{ x: string; y: string }> } }
        ) => void
      ) => void;
      Status: { OK: string };
    };
  };
};

export function NaverMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!NCP_KEY) return;
    let cancelled = false;

    const render = () => {
      if (cancelled || !ref.current) return;
      const naver = (window as unknown as { naver?: Naver }).naver;
      if (!naver?.maps) return;

      const draw = (lat: number, lng: number) => {
        if (cancelled || !ref.current) return;
        const center = new naver.maps.LatLng(lat, lng);
        const map = new naver.maps.Map(ref.current, { center, zoom: 16 });
        new naver.maps.Marker({ position: center, map });
      };

      const geo = naver.maps.Service;
      if (geo?.geocode) {
        geo.geocode({ query: ADDRESS }, (status, res) => {
          const a =
            status === geo.Status.OK ? res?.v2?.addresses?.[0] : undefined;
          if (a) draw(Number(a.y), Number(a.x));
          else draw(FALLBACK.lat, FALLBACK.lng);
        });
      } else {
        draw(FALLBACK.lat, FALLBACK.lng);
      }
    };

    if ((window as unknown as { naver?: Naver }).naver?.maps) {
      render();
      return;
    }

    let s = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!s) {
      s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NCP_KEY}&submodules=geocoder`;
      document.head.appendChild(s);
    }
    s.addEventListener("load", render);

    return () => {
      cancelled = true;
      s?.removeEventListener("load", render);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-[360px] rounded-[14px] border border-hairline overflow-hidden bg-surface-soft"
    />
  );
}
