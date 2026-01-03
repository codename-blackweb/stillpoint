import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/support.css";

export default function Support() {
  useAmbientParallax();

  return (
    <div className="support-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <SiteNav />

      <main className="support-main">
        <section className="hero-section">
          <span className="section-label">Resources &amp; Response</span>
          <h1 className="serif hero-title">
            Support <span className="italic">&amp; Safety.</span>
          </h1>
          <p className="hero-text">
            You are not alone here. Stillpoint exists to make space for lived
            experience—not to diagnose or replace professional care. If something feels
            heavy or urgent, reaching out is a strength.
          </p>
        </section>

        <span className="section-label">Immediate Support (24/7)</span>

        <div className="crisis-grid">
          <div className="resource-card">
            <span className="resource-title">Lifeline</span>
            <div className="resource-main">988</div>
            <div className="resource-sub">
              Call or text 988 (US). Confidential support for distress or crisis.
            </div>
          </div>

          <div className="resource-card">
            <span className="resource-title">Crisis Text</span>
            <div className="resource-main">741741</div>
            <div className="resource-sub">
              Text HOME to 741741 to connect with a crisis counselor.
            </div>
          </div>

          <div className="resource-card">
            <span className="resource-title">SAMHSA</span>
            <div className="resource-main">1-800-662-HELP</div>
            <div className="resource-sub">
              Referrals for mental health and substance use support.
            </div>
          </div>
        </div>

        <div className="info-matrix">
          <div>
            <h2 className="matrix-title">Ongoing Support</h2>
            <p className="matrix-text">
              For longer-term or non-emergency support, consider connecting with
              established networks of care.
            </p>
            <ul className="bullet-list">
              <li>Licensed therapists or healthcare providers</li>
              <li>Peer support or recovery communities</li>
              <li>Trusted mentors, friends, or family</li>
            </ul>
          </div>

          <div>
            <h2 className="matrix-title">Global Services</h2>
            <p className="matrix-text">
              If you are outside the United States, your local health authority can
              direct you to crisis services in your country.
            </p>
          </div>

          <div className="scope-box">
            <span className="section-label">Operational Scope</span>
            <h2 className="matrix-title">Stillpoint’s Role</h2>
            <p className="matrix-text">
              We are a story-collection platform designed for reflection and
              understanding. We are not equipped for immediate clinical intervention.
            </p>

            <div className="scope-grid">
              <div>
                <span className="section-label">What we do</span>
                <ul className="bullet-list">
                  <li>Collect personal narratives</li>
                  <li>Human review for curated publication</li>
                  <li>Foster connection through shared voice</li>
                </ul>
              </div>

              <div>
                <span className="section-label">What we do not do</span>
                <ul className="bullet-list">
                  <li>Provide medical or legal advice</li>
                  <li>Offer real-time crisis monitoring</li>
                  <li>Replace professional psychiatric care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="contact-box">
          <span className="section-label">Inquiries &amp; Corrections</span>
          <h2 className="serif">Questions regarding submission or privacy?</h2>
          <a href="mailto:eblackwood@shatterproof.org" className="email-link italic">
            eblackwood@shatterproof.org
          </a>
          <p className="matrix-text">We take privacy, dignity, and consent seriously.</p>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
