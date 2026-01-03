import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/share-landing.css";

export default function ShareLanding() {
  useAmbientParallax();

  return (
    <div className="share-landing-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <SiteNav />

      <main>
        <header>
          <span className="section-label">Orientation</span>
          <h1 className="serif">
            Share Your <span className="italic">Story.</span>
          </h1>

          <div className="content-block">
            <p>
              Stillpoint is a place for people to share lived experiences related to
              addiction, recovery, grief, advocacy, and the moments that shape us.
            </p>
            <p>
              Stories shared here help create understanding, reduce isolation, and give
              voice to experiences that are often carried quietly.
            </p>
            <p>
              There is no requirement to be finished, healed, or certain. This is about
              telling the truth of where you are, in your own words.
            </p>
          </div>
        </header>

        <section style={{ marginTop: "6rem" }}>
          <span className="section-label">What to expect</span>
          <p className="content-block">
            When you choose to share a story on Stillpoint, you’ll move through a simple,
            intentional process.
          </p>

          <div className="workflow-block">
            <div className="workflow-step">
              <h3>First, you’ll write your story privately.</h3>
              <p>A quiet space to put your experience into words without external pressure.</p>
            </div>
            <div className="workflow-step">
              <h3>
                Then, you’ll have the opportunity to review and reflect on what you’ve
                written.
              </h3>
              <p>A moment to see your narrative clearly before deciding on next steps.</p>
            </div>
            <div className="workflow-step">
              <h3>Only after that will you be asked to make decisions about consent.</h3>
              <p>Nothing is published automatically. You remain in control at every step.</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: "6rem" }}>
          <span className="section-label">What kinds of stories belong here</span>
          <p className="content-block">Stories shared on Stillpoint often explore:</p>
          <ul className="guidance-list">
            <li>Personal experiences with addiction or recovery</li>
            <li>Loving or losing someone impacted by substance use</li>
            <li>Moments of reckoning, change, or resilience</li>
            <li>Advocacy, reflection, or lived insight</li>
          </ul>
          <p className="content-block italic" style={{ marginTop: "2rem", maxWidth: "540px" }}>
            Your story does not need to follow a structure or reach a conclusion. It only
            needs to be honest.
          </p>
        </section>

        <section
          style={{
            marginTop: "6rem",
            padding: "2.5rem",
            border: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <span className="section-label">Before you begin</span>
          <ul className="guidance-list">
            <li>Writing begins privately and can be revised before anything moves forward</li>
            <li>You may choose to remain anonymous</li>
            <li>Submissions are reviewed and handled with care</li>
            <li>Stillpoint does not provide crisis or emergency support</li>
          </ul>
          <p
            style={{
              fontSize: ".7rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              marginTop: "2.5rem",
              opacity: 0.6,
            }}
          >
            If you need immediate help, please visit the{" "}
            <a href="/support" className="support-link">
              Support page
            </a>{" "}
            before continuing.
          </p>
        </section>

        <section
          style={{
            marginTop: "6rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: "540px" }}>
            <p className="content-block" style={{ marginBottom: "2.5rem" }}>
              When you’re ready, you’ll begin by writing your story in your own words. You
              can take your time, pause, or return before moving on.
            </p>
            <a href="/share/write" className="btn-begin">
              Begin Writing Your Story
            </a>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
