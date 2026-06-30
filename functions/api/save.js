// Cloudflare Pages Function — POST /api/save
// 세션 쿠키를 검증한 뒤, 받은 content 를 GitHub 의 src/content/site.json 으로
// 커밋한다. 그 push 가 CF Pages 자동 배포를 트리거 → 1~2분 뒤 사이트에 반영.
// GitHub 토큰은 코드에 없고 CF 환경변수(GITHUB_TOKEN)에서만 읽는다.

const OWNER = "kungteck";
const REPO = "facemyunga";
const PATH = "src/content/site.json";

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function checkToken(token, secret) {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  if ((await hmac(secret, payload)) !== sig) return false;
  const ts = Number(payload.split(".")[1]);
  return !!ts && Date.now() - ts < 43200000; // 12시간
}

function toBase64Utf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.SESSION_SECRET || !env.GITHUB_TOKEN) {
    return json({ ok: false, error: "server not configured" }, 500);
  }

  // 1) 인증
  const cookie = request.headers.get("Cookie") || "";
  const token = (cookie.match(/admin_session=([^;]+)/) || [])[1];
  if (!(await checkToken(token, env.SESSION_SECRET))) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  // 2) 본문
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }
  const content = body && body.content;
  if (!content || typeof content !== "object") {
    return json({ ok: false, error: "no content" }, 400);
  }

  const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
  const gh = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    "User-Agent": "facemyunga-admin",
    Accept: "application/vnd.github+json",
  };

  // 3) 기존 파일 sha
  const getRes = await fetch(`${api}?ref=main`, { headers: gh });
  if (!getRes.ok) {
    return json(
      { ok: false, error: "github get failed", status: getRes.status },
      502,
    );
  }
  const existing = await getRes.json();

  // 4) 커밋(PUT)
  const putRes = await fetch(api, {
    method: "PUT",
    headers: gh,
    body: JSON.stringify({
      message: "admin: 콘텐츠 수정",
      content: toBase64Utf8(JSON.stringify(content, null, 2) + "\n"),
      sha: existing.sha,
      branch: "main",
    }),
  });
  if (putRes.ok) return json({ ok: true });

  const detail = (await putRes.text()).slice(0, 300);
  return json({ ok: false, error: "github put failed", detail }, 502);
}
