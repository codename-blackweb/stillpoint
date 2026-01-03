import { useEffect, useRef } from "react";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/review.css";

export default function Review() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useAmbientParallax();

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      if (gridRef.current) {
        gridRef.current.style.setProperty("--grid-x", `${x * 20}px`);
        gridRef.current.style.setProperty("--grid-y", `${y * 20}px`);
      }

      if (glowRef.current) {
        glowRef.current.style.setProperty("--glow-x", `${x * 10}px`);
        glowRef.current.style.setProperty("--glow-y", `${y * 10}px`);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="review-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>
      <div className="grid-bg" ref={gridRef} />
      <div className="ambient-glow" ref={glowRef} />

      <nav className="top-nav">
        <a href="/" className="nav-brand">
          Stillpoint
        </a>
      </nav>

      <main>
        <header className="mb-20">
          <h1 className="serif text-5xl md:text-7xl font-extralight tracking-tight mb-8">
            Review Your Story.
          </h1>
          <div className="text-secondary font-light text-lg leading-relaxed space-y-2">
            <p>Take a moment to read what you’ve written.</p>
            <p>Nothing has been submitted yet.</p>
            <p>
              This is your opportunity to reflect, revise, or step away before deciding
              what happens next.
            </p>
          </div>
        </header>

        <section className="mb-24">
          <span className="section-label">Your Narrative</span>
          <div className="narrative-preview">
            <h2 className="serif text-3xl mb-6 italic opacity-90">[Untitled Story]</h2>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] mb-10 opacity-50">
              Author: [Anonymous / Alias]
            </p>

            <div className="text-secondary font-light leading-relaxed text-lg">
              [This is a read-only preview of the story body. The text written in the
              previous step will appear here for the writer to review in a calm,
              non-editable environment.]
            </div>
          </div>
          <p className="text-xs tracking-wide text-white/40 italic">
            If you’d like to make changes, you can return to editing before moving
            forward.
          </p>
        </section>

        <section className="mb-24 max-w-lg">
          <span className="section-label">What Happens Next</span>
          <div className="text-secondary font-light space-y-6">
            <p>If you choose to continue, your story will move into a review and consent step.</p>
            <p>At that point, you’ll be asked whether and how your story may be shared.</p>
            <p>Nothing is published automatically. You remain in control throughout the process.</p>
          </div>
        </section>

        <section className="mb-24 pt-12 border-t border-white/5">
          <div className="text-secondary font-light italic mb-12">
            <p>You are not required to continue right now.</p>
            <p>You may pause, close this page, or return later without losing your work.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <a href="/consent" className="btn-primary">
              Continue to Consent
            </a>
            <a href="/share/write" className="btn-secondary">
              Return to Editing
            </a>
            <a href="/" className="save-exit">
              Save and Exit
            </a>
          </div>
        </section>

        <footer className="footer-safety">
          <p className="mb-2">Stillpoint is not a crisis or emergency service.</p>
          <p>
            If reading your story brings up distress, please visit the{" "}
            <a href="/support" className="support-link">
              Support page
            </a>{" "}
            before continuing.
          </p>
          <div className="mt-20 opacity-30 tracking-[0.2em] uppercase text-[0.6rem]">
            Stillpoint / © 2025
          </div>
        </footer>
      </main>
    </div>
  );
}
