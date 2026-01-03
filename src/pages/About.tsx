import { useEffect, useRef } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/about.css";

export default function About() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const motionRef = useRef({ sx: 0, sy: 0, scroll: 0 });

  useAmbientParallax();

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      motionRef.current.sx = (event.clientX / window.innerWidth - 0.5) * 40;
      motionRef.current.sy = (event.clientY / window.innerHeight - 0.5) * 40;
    };

    const handleScroll = () => {
      motionRef.current.scroll = window.scrollY;
    };

    const tick = () => {
      const { sx, sy, scroll } = motionRef.current;

      if (gridRef.current) {
        gridRef.current.style.setProperty("--grid-x", `${sx}px`);
        gridRef.current.style.setProperty("--grid-y", `${sy - scroll * 0.15}px`);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="about-root">
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>
      <div className="about-layer about-grid" ref={gridRef} />

      <SiteNav />

      <main className="about-main">
        <section className="about-hero">
          <span className="about-kicker">A Shatterproof Initiative</span>
          <h1 className="about-serif about-hero-title">
            Silence into
            <br />
            <em>Structure.</em>
          </h1>
        </section>

        <section className="about-grid-layout">
          <div className="about-block">
            <span className="about-label">01 / The Concept</span>
            <div className="about-callout">A secure platform for lived-experience stories.</div>
            <div className="about-body">Thoughtful expression without performance pressure.</div>
          </div>

          <div className="about-block">
            <span className="about-label">02 / Purpose</span>
            <div className="about-callout">Stories change understanding.</div>
            <div className="about-body">Dignity and agency preserved.</div>
          </div>

          <div className="about-block">
            <span className="about-label">03 / The Process</span>
            <div className="about-callout">Deliberate guidance.</div>
            <div className="about-body">Structure without prescription.</div>
          </div>

          <div className="about-block">
            <span className="about-label">04 / Foundations</span>
            <div className="about-callout">Privacy is foundational.</div>
            <div className="about-body">Consent governs publication.</div>
          </div>

          <div className="about-not-box">
            <span className="about-label">Critical Distinction</span>
            <div className="about-not-grid">
              <h2 className="about-serif about-not-title">
                What Stillpoint <em>is not.</em>
              </h2>
              <ul className="about-list">
                <li>Not therapy</li>
                <li>No medical advice</li>
                <li>No crisis intervention</li>
              </ul>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
