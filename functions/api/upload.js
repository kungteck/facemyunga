// Cloudflare Pages Function — POST /api/upload
// 세션 검증 후, 받은 이미지(dataUrl)를 GitHub public/images/admin/ 에 커밋하고
// 사이트에서 쓸 경로(/images/admin/...)를 돌려준다. 어드민은 이 경로를
// site.json 의 이미지 필드에 넣고 /api/save 로 저장한다.

const OWNER = "kungteck";
const REPO = "facemyunga";

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
  return !!ts && Date.now() - ts < 43200000;
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

  const cookie = request.headers.get("Cookie") || "";
  const token = (cookie.match(/admin_session=([^;]+)/) || [])[1];
  if (!(await checkToken(token, env.SESSION_SECRET))) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad json" }, 400);
  }
  const { name, dataUrl } = body || {};
  if (!name || !dataUrl) return json({ ok: false, error: "no file" }, 400);

  const m = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl);
  if (!m) return json({ ok: false, error: "bad dataUrl" }, 400);
  const b64 = m[2];

  // 안전한 파일명 + 타임스탬프로 유니크(덮어쓰기/충돌 방지)
  const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-60) || "image";
  const repoPath = `public/images/admin/${Date.now()}-${safe}`;

  const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`;
  const gh = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    "User-Agent": "facemyunga-admin",
    Accept: "application/vnd.github+json",
  };
  const putRes = await fetch(api, {
    method: "PUT",
    headers: gh,
    body: JSON.stringify({
      message: "admin: 이미지 업로드",
      content: b64,
      branch: "main",
    }),
  });

  if (putRes.ok) {
    // public/ 를 떼고 사이트 경로(/images/admin/...)로 돌려준다
    return json({ ok: true, path: "/" + repoPath.slice("public/".length) });
  }
  const detail = (await putRes.text()).slice(0, 300);
  return json({ ok: false, error: "github put failed", detail }, 502);
}
