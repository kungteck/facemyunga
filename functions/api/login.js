// Cloudflare Pages Function — POST /api/login
// ID/PW 를 CF 환경변수(ADMIN_ID, ADMIN_PW)와 대조하고, 통과 시 HMAC 서명된
// 세션 쿠키를 발급한다. 비밀번호는 코드에 없고 환경변수에서만 읽는다.

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

export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_ID || !env.ADMIN_PW || !env.SESSION_SECRET) {
    return new Response(
      JSON.stringify({ ok: false, error: "server not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const { id, pw } = body || {};

  if (id && pw && id === env.ADMIN_ID && pw === env.ADMIN_PW) {
    const payload = `admin.${Date.now()}`;
    const token = `${payload}.${await hmac(env.SESSION_SECRET, payload)}`;
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200`,
      },
    });
  }

  return new Response(JSON.stringify({ ok: false }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
