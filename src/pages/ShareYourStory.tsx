import { useEffect, useRef, useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/share-your-story.css";

export default function ShareYourStory() {
  const [storyValue, setStoryValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "error">("idle");
  const [aiResponse, setAiResponse] = useState("");
  const storyInputRef = useRef<HTMLTextAreaElement | null>(null);
  const wordCountRef = useRef<HTMLSpanElement | null>(null);
  useAmbientParallax();

  useEffect(() => {
    const storyInput = storyInputRef.current;
    const wordCountVal = wordCountRef.current;

    if (!storyInput || !wordCountVal) {
      return undefined;
    }

    const words = storyValue.trim().split(/\s+/).filter((word) => word.length > 0);
    wordCountVal.innerText = String(words.length);
    storyInput.style.height = "auto";
    storyInput.style.height = `${storyInput.scrollHeight}px`;

    return undefined;
  }, [storyValue]);

  const isStoryReady = storyValue.trim().length > 0;
  const isLoading = aiStatus === "loading";

  const callGemini = async (mode: "title" | "prompt" | "refine") => {
    if (!isStoryReady || isLoading) {
      return;
    }

    setAiStatus("loading");
    setAiResponse("");

    try {
      const response = await fetch("/.netlify/functions/gemini-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, content: storyValue }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Request failed.");
      }

      const output = typeof data?.output === "string" ? data.output.trim() : "";
      if (!output) {
        throw new Error("No response received.");
      }

      if (mode === "title") {
        const suggestion = output
          .split("\n")
          .map((line: string) => line.replace(/^[\s*\-–—\d.)]+/, "").trim())
          .find((line: string) => line.length > 0);
        if (suggestion) {
          setTitleValue(suggestion);
        }
      }

      if (mode === "refine") {
        setStoryValue(output);
      }

      setAiResponse(output);
      setAiStatus("idle");
    } catch (error) {
      setAiStatus("error");
      setAiResponse(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <div className="write-story-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <SiteNav />

      <main>
        <header>
          <span className="section-label">Submission Portal</span>
          <h1 className="serif">
            Write Your <span className="italic">Story.</span>
          </h1>
          <p className="header-text">
            This space is for you to share a personal experience in your own words.{" "}
            There is no expectation of polish. What matters is honesty, not completeness.
          </p>
        </header>

        <section>
          <div className="input-group">
            <label className="field-label">Name / Alias</label>
            <input
              type="text"
              id="author-name"
              placeholder="How should we refer to you? (Optional)"
            />
          </div>

          <div className="input-group">
            <label className="field-label">Narrative Title</label>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
              <input
                type="text"
                id="story-title"
                placeholder="Give your experience a name"
                style={{ flex: 1 }}
                value={titleValue}
                onChange={(event) => setTitleValue(event.target.value)}
              />
              <button
                id="ai-title-btn"
                className="ai-btn"
                type="button"
                disabled={!isStoryReady || isLoading}
                onClick={() => callGemini("title")}
              >
                ✨ Suggest Title
              </button>
            </div>
          </div>
        </section>

        <section className="writing-guidance">
          <span className="section-label" style={{ opacity: 0.4 }}>
            Optional Guidance
          </span>
          <ul className="guidance-list">
            <li>A moment that changed something for you</li>
            <li>An experience you’ve carried quietly</li>
            <li>Where you’ve been, where you are, or what you’re still sorting through</li>
          </ul>
        </section>

        <section>
          <label className="field-label">The Narrative</label>
          <textarea
            id="story-input"
            placeholder="Begin here..."
            ref={storyInputRef}
            value={storyValue}
            onChange={(event) => setStoryValue(event.target.value)}
          />
          <div className="word-count">
            <span id="word-count-val" ref={wordCountRef}>
              0
            </span>{" "}
            words
          </div>

          <div className="ai-toolbar">
            <button
              id="ai-prompt-btn"
              className="ai-btn"
              type="button"
              disabled={!isStoryReady || isLoading}
              onClick={() => callGemini("prompt")}
            >
              ✨ Reflection Prompt
            </button>
            <button
              id="ai-refine-btn"
              className="ai-btn"
              type="button"
              disabled={!isStoryReady || isLoading}
              onClick={() => callGemini("refine")}
            >
              ✨ Refine Narrative
            </button>
          </div>

          <div
            id="ai-response"
            className={`ai-response-box${aiStatus === "loading" ? " loading-pulse" : ""}`}
            style={{ display: aiStatus !== "idle" || aiResponse ? "block" : "none" }}
            aria-live="polite"
          >
            {aiStatus === "loading" ? "Working..." : aiResponse}
          </div>
        </section>

        <div className="actions-bar">
          <p className="reassurance italic">
            You can pause, revise, or return before submitting. Nothing is shared
            publicly without your explicit review and consent.
          </p>
          <button
            className="btn-continue"
            onClick={() => {
              window.location.href = "/review";
            }}
          >
            Continue to review
          </button>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
