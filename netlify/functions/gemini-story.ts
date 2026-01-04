const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();

const PROMPTS: Record<string, Record<string, (content: string) => string>> = {
  v1: {
    title: (content) =>
      `Generate 5 short, evocative, emotionally restrained titles for the following personal narrative. Avoid clichés. Titles should be subtle and reflective.\n\n${content}`,
    prompt: (content) =>
      `Offer a single, gentle reflection prompt to help the writer continue or deepen their story. Do not give advice. Do not diagnose.\n\n${content}`,
    refine: (content) =>
      `Refine the following narrative for clarity and flow while preserving the author's voice and meaning. Do not add new facts or emotional interpretation.\n\n${content}`,
  },
};

function jsonResponse(statusCode: number, payload: Record<string, unknown>) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
}

function normalizeHeaders(headers: Record<string, string>) {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    normalized[key.toLowerCase()] = value;
  }
  return normalized;
}

function stripIpv6Prefix(ip: string) {
  return ip.startsWith("::ffff:") ? ip.slice(7) : ip;
}

function getClientIp(event: { headers?: Record<string, string> }) {
  const normalized = normalizeHeaders(event.headers ?? {});
  const forwarded = normalized["x-forwarded-for"]
    ?.split(",")
    .map((value) => value.trim())
    .find(Boolean);
  const rawIp = normalized["x-nf-client-connection-ip"] || forwarded || "unknown";
  return stripIpv6Prefix(rawIp);
}

function enforceRateLimit(ip: string) {
  const now = Date.now();
  const record = RATE_LIMIT_STORE.get(ip);
  if (!record || now >= record.resetAt) {
    RATE_LIMIT_STORE.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetAt: record.resetAt };
  }

  record.count += 1;
  return { allowed: true };
}

export async function handler(event: { httpMethod: string; body?: string | null; headers?: Record<string, string> }) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method Not Allowed" });
  }

  const ip = getClientIp(event);
  const rateLimit = enforceRateLimit(ip);
  if (!rateLimit.allowed) {
    return jsonResponse(429, {
      error: "Too many requests. Please wait and try again.",
      retryAfterMs: Math.max(rateLimit.resetAt - Date.now(), 0),
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return jsonResponse(500, { error: "Missing API key." });
  }

  let body: { mode?: string; content?: string; version?: string };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON payload." });
  }

  const mode = body.mode?.trim();
  const version = body.version?.trim() || "v1";
  const content = body.content?.trim();

  if (!PROMPTS[version]) {
    return jsonResponse(400, { error: "Invalid prompt version." });
  }

  if (!mode || !PROMPTS[version][mode]) {
    return jsonResponse(400, { error: "Invalid mode." });
  }

  if (!content) {
    return jsonResponse(400, { error: "Content is required." });
  }

  if (content.length > 8000) {
    return jsonResponse(413, { error: "Content is too long." });
  }

  const prompt = PROMPTS[version][mode](content);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      return jsonResponse(502, {
        error: "Gemini request failed.",
        details: errorBody.slice(0, 500),
      });
    }

    const data = await response.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return jsonResponse(502, { error: "Empty response from Gemini." });
    }

    return jsonResponse(200, { output });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      return jsonResponse(504, { error: "Gemini request timed out." });
    }
    return jsonResponse(500, {
      error: "Unexpected server error.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
