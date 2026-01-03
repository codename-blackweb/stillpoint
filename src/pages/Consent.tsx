import { useEffect, useRef } from "react";
import { useAmbientParallax } from "../hooks/useAmbientParallax";
import "../styles/consent.css";

export default function Consent() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const consentCheckbox = document.getElementById("consentCheckbox") as HTMLInputElement | null;
    const verifierName = document.getElementById("verifierName") as HTMLInputElement | null;
    const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement | null;
    const timestampDisplay = document.getElementById("timestampDisplay") as HTMLDivElement | null;

    if (!consentCheckbox || !verifierName || !submitBtn || !timestampDisplay) {
      return undefined;
    }

    const updateTimestamp = () => {
      const now = new Date();
      timestampDisplay.textContent = `Awaiting Submission — ${now.toLocaleString()} — V1.0`;
    };

    const validate = () => {
      if (consentCheckbox.checked && verifierName.value.trim().length > 2) {
        submitBtn.classList.remove("btn-disabled");
        submitBtn.classList.add("btn-enabled");
      } else {
        submitBtn.classList.add("btn-disabled");
        submitBtn.classList.remove("btn-enabled");
      }
      updateTimestamp();
    };

    const handleSubmit = () => {
      if (!submitBtn.classList.contains("btn-enabled")) {
        return;
      }
      if (mainRef.current) {
        mainRef.current.style.opacity = "0";
      }
      window.setTimeout(() => {
        if (mainRef.current) {
          mainRef.current.style.display = "none";
        }
        if (successRef.current) {
          successRef.current.classList.remove("hidden");
          successRef.current.classList.add("flex");
        }
        window.scrollTo(0, 0);
      }, 1000);
    };

    consentCheckbox.addEventListener("change", validate);
    verifierName.addEventListener("input", validate);
    submitBtn.addEventListener("click", handleSubmit);
    updateTimestamp();

    return () => {
      consentCheckbox.removeEventListener("change", validate);
      verifierName.removeEventListener("input", validate);
      submitBtn.removeEventListener("click", handleSubmit);
    };
  }, []);

  return (
    <div className="consent-root">
      <div className="texture-overlay" />
      <div className="stars-container">
        <div className="star-layer stars-micro" />
        <div className="star-layer stars-small" />
        <div className="star-layer stars-medium" /></div>
      <div className="grid-bg" ref={gridRef} />
      <div className="ambient-glow" ref={glowRef} />

      <nav className="top-nav">
        <a href="#" className="nav-brand">
          Stillpoint
        </a>
      </nav>

      <main ref={mainRef}>
        <header className="mb-16">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-50 block mb-6">
            Final Step
          </span>
          <h1 className="serif text-5xl md:text-6xl font-extralight tracking-tight mb-8">
            Consent &amp; <span className="italic">Permissions.</span>
          </h1>
          <div className="text-white/60 font-light text-lg leading-relaxed space-y-2">
            <p>Before submitting your story, please review the information below carefully.</p>
            <p>
              By submitting a story through Stillpoint, you are confirming that you
              understand and agree to how your submission may be reviewed, used, and
              published.
            </p>
          </div>
        </header>

        <section className="mb-16">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-40 block mb-4">
            Legal Backbone
          </span>
          <div className="legal-box text-white/60 font-light leading-relaxed space-y-6">
            <p>
              You are submitting a personal narrative to Stillpoint, a platform designed to
              collect and curate lived experience stories related to addiction, recovery,
              grief, advocacy, and the moments that shape us.
            </p>
            <p>
              By submitting your story, you grant Stillpoint and its affiliated initiative
              permission to review your submission for potential inclusion in curated
              publications, educational materials, and awareness efforts.
            </p>
            <p>
              You retain ownership of your story. You may request corrections or removal at
              any time prior to publication.
            </p>
            <p>
              Stillpoint may lightly edit your submission for clarity, formatting, or length
              while preserving the intent and meaning of your writing. No substantial changes
              will be made without your consent.
            </p>
            <p>
              Nothing is published automatically. Publication is always conditional on review
              and your permissions below.
            </p>
            <p>
              Stillpoint is not a crisis or emergency service. If you are currently in
              distress or need urgent support, please visit the Support page before proceeding.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-40 block mb-4">
            Permission Level
          </span>

          <div className="space-y-4 text-white/70 font-light">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="permission" value="public" className="mt-1" />
              <span>
                <span className="block font-normal text-white mb-1">
                  Yes — I consent to publication.
                </span>
                <span className="block text-white/50 text-sm">
                  My story may be shared publicly through Stillpoint and related awareness
                  efforts.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="permission" value="limited" className="mt-1" />
              <span>
                <span className="block font-normal text-white mb-1">
                  Limited — I consent to internal review only.
                </span>
                <span className="block text-white/50 text-sm">
                  My story may be reviewed, but should not be published publicly at this time.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="permission" value="no" className="mt-1" />
              <span>
                <span className="block font-normal text-white mb-1">
                  No — I do not consent to publication.
                </span>
                <span className="block text-white/50 text-sm">
                  My story may be stored privately for personal reflection, but not shared.
                </span>
              </span>
            </label>
          </div>
        </section>

        <section className="mb-16">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-40 block mb-4">
            Attribution
          </span>
          <p className="text-white/60 font-light mb-6">
            If your story is published, how should your name appear?
          </p>

          <div className="space-y-4 text-white/70 font-light">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="attribution" value="anonymous" className="mt-1" />
              <span>
                <span className="block font-normal text-white mb-1">Anonymous</span>
                <span className="block text-white/50 text-sm">
                  No name will be attached to the story.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="attribution" value="alias" className="mt-1" />
              <span className="w-full">
                <span className="block font-normal text-white mb-1">Use an alias</span>
                <span className="block text-white/50 text-sm mb-3">
                  A chosen name or initials.
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white/80 outline-none"
                  placeholder="Enter alias (optional)"
                />
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="attribution" value="real" className="mt-1" />
              <span>
                <span className="block font-normal text-white mb-1">Use my name</span>
                <span className="block text-white/50 text-sm">Your real name may appear.</span>
              </span>
            </label>
          </div>
        </section>

        <section className="mb-16 pt-10 border-t border-white/5">
          <div className="flex items-start gap-3 text-white/70 font-light mb-10">
            <input id="consentCheckbox" type="checkbox" className="mt-1" />
            <label htmlFor="consentCheckbox">
              I confirm that this story is my own lived experience, and I understand the
              permissions selected above.
            </label>
          </div>

          <div className="mb-10">
            <label className="text-[0.6rem] tracking-[0.5em] uppercase opacity-40 block mb-3">
              Typed verification
            </label>
            <input
              id="verifierName"
              type="text"
              className="w-full bg-transparent border-b border-white/10 py-2 text-white/80 outline-none"
              placeholder="Type your name to verify"
            />
          </div>

          <div className="text-[0.7rem] tracking-[0.2em] uppercase opacity-40 mb-10" id="timestampDisplay">
            Awaiting Submission — --/--/---- --:-- — V1.0
          </div>

          <button
            id="submitBtn"
            className="btn-disabled text-[0.75rem] tracking-[0.4em] uppercase border border-white/10 px-14 py-5 text-white"
          >
            Submit Story
          </button>
        </section>
      </main>

      <div
        id="successScreen"
        className="fixed inset-0 bg-[#4a4c52] hidden items-center justify-center text-center px-6 z-[200]"
        ref={successRef}
      >
        <div>
          <span className="text-[0.6rem] tracking-[0.5em] uppercase opacity-50 block mb-6">
            Submission Complete
          </span>
          <h2 className="serif text-5xl font-extralight mb-6">Thank you.</h2>
          <div className="text-white/60 font-light space-y-2">
            <p>Your story has been securely received.</p>
            <p>It will be reviewed according to the permissions you selected.</p>
            <p>Nothing is published automatically.</p>
            <p className="italic">Thank you for sharing with care and intention.</p>
          </div>
          <a
            href="#"
            className="inline-block mt-10 text-[0.65rem] tracking-[0.4em] uppercase border border-white/10 px-10 py-4 text-white/70 hover:text-white hover:border-white/30 transition"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
