import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { mode, content } = JSON.parse(event.body);

    let prompt = "";

    if (mode === "title") {
      prompt = `Generate 5 short, evocative, emotionally restrained titles for the following personal narrative. Avoid clichés. Titles should be subtle and reflective.\n\n${content}`;
    }

    if (mode === "prompt") {
      prompt = `Offer a single, gentle reflection prompt to help the writer continue or deepen their story. Do not give advice. Do not diagnose.\n\n${content}`;
    }

    if (mode === "refine") {
      prompt = `Refine the following narrative for clarity and flow while preserving the author's voice and meaning. Do not add new facts or emotional interpretation.\n\n${content}`;
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    const output =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

    return {
      statusCode: 200,
      body: JSON.stringify({ output }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}