import { Link } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/how-it-works.css";

export default function HowItWorks() {
  useAmbientParallax();

  return (
    <div className="how-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>
      <div className="grid-bg" />

      <SiteNav />

      <main className="how-main">
        <section className="how-hero">
          <span className="how-section-label">Operational Framework</span>
          <h1 className="how-serif how-hero-title">
            The <em>Process.</em>
          </h1>
          <p className="how-hero-copy">
            Stillpoint is a secure platform for collecting lived-experience stories and
            preparing them for responsible publication.
          </p>
        </section>

        <section className="how-steps">
          <div className="how-step">
            <div className="how-step-number">01</div>
            <div className="how-step-content">
              <h2 className="how-step-title">Share Your Story</h2>
              <div className="how-step-details">
                Write at your own pace.
                <ul className="how-step-list">
                  <li>You control depth</li>
                  <li>No required format</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="how-step">
            <div className="how-step-number">02</div>
            <div className="how-step-content">
              <h2 className="how-step-title">Review Before Submitting</h2>
              <div className="how-step-details">Reflect and refine.</div>
            </div>
          </div>

          <div className="how-step">
            <div className="how-step-number">03</div>
            <div className="how-step-content">
              <h2 className="how-step-title">Consent &amp; Permissions</h2>
              <div className="how-step-details">You retain authority.</div>
            </div>
          </div>

          <div className="how-step">
            <div className="how-step-number">04</div>
            <div className="how-step-content">
              <h2 className="how-step-title">Review &amp; Curation</h2>
              <div className="how-step-details">Handled with care.</div>
            </div>
          </div>

          <div className="how-step">
            <div className="how-step-number">05</div>
            <div className="how-step-content">
              <h2 className="how-step-title">Responsible Publication</h2>
              <div className="how-step-details">Intentional placement.</div>
            </div>
          </div>
        </section>

        <section className="how-definition">
          <div>
            <span className="how-status">The Identity</span>
            <h3 className="how-definition-title">Stillpoint is:</h3>
            <ul className="how-step-list">
              <li>A story collection and publication platform</li>
              <li>A secure space for intentional sharing</li>
              <li>A system designed for ethical narrative use</li>
            </ul>
          </div>
          <div>
            <span className="how-status">The Boundaries</span>
            <h3 className="how-definition-title">Stillpoint is not:</h3>
            <ul className="how-step-list">
              <li>A treatment program</li>
              <li>A crisis service</li>
              <li>A discussion forum or social network</li>
            </ul>
          </div>
        </section>

        <section className="how-cta">
          <h2 className="how-serif how-cta-title">Your voice matters.</h2>
          <Link className="how-cta-link" to="/share">
            Begin Your Story
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
