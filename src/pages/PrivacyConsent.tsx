import { useEffect, useRef } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/privacy-consent.css";

export default function PrivacyConsent() {
  const policyRefs = useRef<HTMLDivElement[]>([]);

  useAmbientParallax();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      policyRefs.current.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    policyRefs.current.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="privacy-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>

      <SiteNav />

      <main className="privacy-main">
        <section className="privacy-hero">
          <span className="privacy-label">Trust &amp; Agency</span>
          <h1 className="privacy-serif privacy-title">
            Privacy &amp; <em>Consent.</em>
          </h1>
          <p className="privacy-lede">
            Stillpoint exists to collect lived-experience stories with care, restraint,
            and respect. This framework explains how your words are handled and where
            control remains firmly in your hands.
          </p>
        </section>

        <section className="privacy-grid">
          <div
            className="privacy-policy"
            ref={(node) => {
              if (node) policyRefs.current[0] = node;
            }}
          >
            <h2>Your Privacy Matters</h2>
            <p>
              We recognize that stories shared here are deeply personal. Our system is
              built to minimize data collection and prioritize responsibility.
            </p>
            <ul>
              <li>We collect only what is required to review your story.</li>
              <li>We do not sell personal data or use submissions for targeting.</li>
              <li>Anonymous submissions are fully supported.</li>
            </ul>
          </div>

          <div
            className="privacy-policy"
            ref={(node) => {
              if (node) policyRefs.current[1] = node;
            }}
          >
            <h2>What Happens When You Share</h2>
            <p>Submission is the first step in a curated editorial process.</p>
            <ul>
              <li>Submissions are securely stored and reviewed internally.</li>
              <li>Suitability for publication is assessed by a human team.</li>
              <li>Submission does not guarantee publication.</li>
            </ul>
          </div>

          <div
            className="privacy-policy full"
            ref={(node) => {
              if (node) policyRefs.current[2] = node;
            }}
          >
            <h2>Consent to Review and Publish</h2>
            <p>
              By submitting a story, you grant Stillpoint permission to read, review, and
              potentially publish your narrative across platforms including websites,
              educational materials, and advocacy campaigns.
            </p>
            <ul>
              <li>Editing for length and grammar (preserving core meaning)</li>
              <li>Use in aggregated or excerpted form</li>
              <li>Digital and social media distribution</li>
              <li>Print and educational reports</li>
              <li>Attribution based on your selection (Full, Initial, or Anonymous)</li>
            </ul>
          </div>

          <div
            className="privacy-policy"
            ref={(node) => {
              if (node) policyRefs.current[3] = node;
            }}
          >
            <h2>Your Control &amp; Withdrawal</h2>
            <p>
              You retain ownership of your story. You may request corrections or
              withdrawal of consent prior to publication.
            </p>
            <ul>
              <li>Correction of factual errors</li>
              <li>Removal of identifying details</li>
              <li>Reasonable efforts to honor removal from digital platforms</li>
            </ul>
          </div>

          <div
            className="privacy-policy"
            ref={(node) => {
              if (node) policyRefs.current[4] = node;
            }}
          >
            <h2>Sensitive Content Disclaimer</h2>
            <p>Stillpoint is not a crisis service or clinical platform.</p>
            <ul>
              <li>References to imminent risk may trigger additional safeguards.</li>
              <li>Immediate danger should be referred to emergency services.</li>
            </ul>
          </div>

          <div
            className="privacy-policy"
            ref={(node) => {
              if (node) policyRefs.current[5] = node;
            }}
          >
            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect content from unauthorized access,
              though no digital system is entirely without risk.
            </p>
          </div>

          <div
            className="privacy-policy"
            ref={(node) => {
              if (node) policyRefs.current[6] = node;
            }}
          >
            <h2>Questions or Concerns</h2>
            <p>
              If you have questions about how your story may be used, you should not
              submit until you are comfortable doing so.
            </p>
          </div>
        </section>

        <section className="privacy-ack">
          <h2 className="privacy-serif">Final Acknowledgment</h2>
          <p>
            By submitting your story, you confirm that you have read and understood this
            Privacy &amp; Consent notice, you are submitting voluntarily, and you grant
            permission for review and potential publication.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
