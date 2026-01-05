import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const [overlayVisible, setOverlayVisible] = useState(true);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

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
    <div className="home-root">
      {overlayVisible && (
        <div id="overlay" className="overlay" onClick={closeOverlay}>
          <div className="arrive-text">BEGIN</div>
        </div>
      )}

      <div className="texture-overlay" />

      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <div className="grid-bg" ref={gridRef} />
      <div className="ambient-glow" ref={glowRef} />

      <SiteNav />

      <main>
        <div className="title-lockup">
          <h1 className="serif main-title">Stillpoint</h1>
          <span className="title-byline">by SHATTERPROOF</span>
        </div>

        <p className="sub-text">
          A quiet digital space designed for intentional reflection, without pressure or
          performance.
        </p>

        <button className="cta-button" type="button" onClick={() => navigate("/share")}>
          Begin Reflection
        </button>
      </main>

      <SiteFooter />
    </div>
  );
}
