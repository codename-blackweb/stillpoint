import { useEffect, useRef, useState } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/stories.css";

const stories = [
  {
    title: "The weight of a name",
    excerpt:
      "In the quiet moments of early recovery, the hardest thing to carry wasn't the cravings, but the expectations of the person I used to be. Every time someone called my name, it felt like an invitation to a house I no longer lived in. Advocacy became my way of building a new foundation, brick by brick, word by word.",
    body:
      "In the quiet moments of early recovery, the hardest thing to carry wasn't the cravings, but the expectations of the person I used to be. Every time someone called my name, it felt like an invitation to a house I no longer lived in. Advocacy became my way of building a new foundation, brick by brick, word by word.",
    tag: "Recovery",
    author: "Contributed by M.R.",
  },
  {
    title: "Silence is not a solution",
    excerpt:
      "We lost my brother on a Tuesday. The neighborhood remained perfectly still, as if nothing had changed, but our entire world had fractured. Sharing this isn't about grief anymore; it's about ensuring the next family doesn't have to learn how to live in the cracks.",
    body:
      "We lost my brother on a Tuesday. The neighborhood remained perfectly still, as if nothing had changed, but our entire world had fractured. Sharing this isn't about grief anymore; it's about ensuring the next family doesn't have to learn how to live in the cracks.",
    tag: "Loss",
    author: "Contributed by Anonymous",
  },
  {
    title: "The Architecture of Change",
    excerpt:
      "Advocacy isn't always a protest in the street. Sometimes, it's a quiet conversation in a sterile room where you refuse to let a person be reduced to a statistic. It's about building systems that actually see people.",
    body:
      "Advocacy isn't always a protest in the street. Sometimes, it's a quiet conversation in a sterile room where you refuse to let a person be reduced to a statistic. It's about building systems that actually see people.",
    tag: "Advocacy",
    author: "Contributed by E. Chen",
  },
  {
    title: "Returning to the Stillpoint",
    excerpt:
      "After years of movement, I found that the only way forward was to sit still. This platform gave me the structure I needed to finally put the pen to the paper without feeling the need to perform.",
    body:
      "After years of movement, I found that the only way forward was to sit still. This platform gave me the structure I needed to finally put the pen to the paper without feeling the need to perform.",
    tag: "Reflection",
    author: "Contributed by J.S.L.",
  },
];

export default function Stories() {
  const [gridVisible, setGridVisible] = useState(false);
  const [activeStory, setActiveStory] = useState<(typeof stories)[number] | null>(
    null
  );
  const bodyOverflowRef = useRef<string>("");

  useAmbientParallax();

  useEffect(() => {
    bodyOverflowRef.current = document.body.style.overflow;
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setGridVisible(true), 300);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (activeStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflowRef.current;
    }

    return () => {
      document.body.style.overflow = bodyOverflowRef.current;
    };
  }, [activeStory]);

  return (
    <div className="stories-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <SiteNav />

      <main className="stories-main">
        <section className="stories-hero">
          <span className="stories-label">Archive of Lived Experience</span>
          <h1 className="stories-serif stories-title">
            Published <em>Narratives.</em>
          </h1>
          <p className="stories-lede">
            A curated selection of stories submitted through Stillpoint and prepared with
            care. These voices inform, educate, and deepen understanding &mdash;
            honoring the complexity of personal history.
          </p>
        </section>

        <div className={`story-grid${gridVisible ? " is-visible" : ""}`}>
          {stories.map((story) => (
            <article
              key={story.title}
              className="story-card"
              onClick={() => setActiveStory(story)}
            >
              <span className="story-tag">{story.tag}</span>
              <h2 className="stories-serif story-title">{story.title}</h2>
              <p className="story-excerpt">{story.excerpt}</p>
              <div className="story-attr">{story.author}</div>
            </article>
          ))}
        </div>

        <section className="stories-notice">
          <span className="stories-label">Reading with Care</span>
          <p className="stories-notice-text">
            These stories address difficult or sensitive experiences. We encourage you to
            engage thoughtfully and take breaks as needed. If you require immediate
            support, please refer to local or national resources.
          </p>
        </section>

        <div className="stories-disclaimer">
          Stories are shared with explicit permission and may be edited for clarity or
          length. &copy; STILLPOINT
        </div>
      </main>

      <SiteFooter />

      <div
        className={`stories-reader${activeStory ? " is-visible" : ""}`}
        aria-hidden={!activeStory}
        role="dialog"
        aria-modal="true"
      >
        <button className="stories-close" type="button" onClick={() => setActiveStory(null)}>
          [ Close ]
        </button>
        <div className="reader-inner">
          <span className="stories-label">{activeStory?.tag ?? ""}</span>
          <h1 className="stories-serif reader-title">{activeStory?.title ?? ""}</h1>
          <p className="reader-body">{activeStory?.body ?? ""}</p>
          <div className="story-attr">{activeStory?.author ?? ""}</div>
        </div>
      </div>
    </div>
  );
}
