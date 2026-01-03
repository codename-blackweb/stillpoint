import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/story-detail.css";

export default function StoryDetail() {
  useAmbientParallax();

  return (
    <div className="story-detail-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <nav className="top-nav">
        <a href="/" className="nav-brand">
          Stillpoint
        </a>
        <a href="/stories" className="nav-link">
          Back to Stories
        </a>
      </nav>

      <main>
        <div className="content-notice">
          Content Notice: This story contains references to addiction, loss, or emotional
          distress.
        </div>

        <header className="story-header">
          <div className="meta-group">
            <span>Submitted 2024</span>
            <span>•</span>
            <span>Recovery &amp; Advocacy</span>
            <span>•</span>
            <span>Anonymous</span>
          </div>
          <h1 className="serif story-title">
            The weight of a <span className="italic">name.</span>
          </h1>
        </header>

        <article className="story-body">
          <p>
            In the quiet moments of early recovery, the hardest thing to carry wasn’t the
            cravings, but the expectations of the person I used to be. Every time someone
            called my name, it felt like an invitation to a house I no longer lived in.
          </p>
          <p>
            I spent years performing a version of myself that was designed for others'
            comfort. In the sterile rooms of clinical settings, I was a patient. In the eyes
            of my family, I was a tragedy in progress. But here, in the stillness of the
            pen and the page, I began to realize that I was the architect of the narrative.
          </p>
          <p>
            Advocacy became my way of building a new foundation, brick by brick, word by
            word. It wasn’t about shouting from the rooftops; it was about the radical act
            of refusing to let my complexity be simplified into a diagnostic code or a
            cautionary tale.
          </p>
          <p>
            To share this is to reclaim the space between who I was and who I am becoming.
            It is a reminder that the stillpoint isn't the end of the journey—it's the
            center of the movement.
          </p>
        </article>

        <section className="support-routing">
          <h3 className="serif support-title">Reflecting with Care</h3>
          <p className="support-text">
            If this story has brought up difficult feelings or if you are seeking
            support, resources are available. You do not have to navigate these
            experiences alone.
          </p>
          <div className="support-links">
            <a href="/support">View Support Resources</a>
            <a href="tel:988">Contact 988 (US)</a>
          </div>
        </section>

        <div className="exit-nav">
          <a href="/stories" className="btn-back">
            Read another story
          </a>
        </div>

        <footer className="footer-utility">
          <p>
            This story is shared with permission and may be used for education,
            awareness, or advocacy.
          </p>
          <div className="utility-links">
            <a href="mailto:support@stillpoint.org?subject=Concern: The weight of a name">
              Report a concern
            </a>
            <a href="mailto:support@stillpoint.org?subject=Correction: The weight of a name">
              Request correction or removal
            </a>
          </div>
          <p className="footer-meta">Stillpoint / © 2025</p>
        </footer>
      </main>
    </div>
  );
}
