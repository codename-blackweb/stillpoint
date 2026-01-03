import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/site-nav.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/how-it-works", label: "How it Works" },
  { to: "/privacy-consent", label: "Privacy & Consent" },
  { to: "/share", label: "Share" },
  { to: "/stories", label: "Stories" },
  { to: "/support", label: "Support" },
];

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusable || focusable.length === 0) {
        return;
      }

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && active === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      (lastFocusRef.current ?? menuButtonRef.current)?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="site-nav" aria-label="Primary">
        <NavLink className="site-nav__brand" to="/">
          Stillpoint
        </NavLink>
        <div className="site-nav__actions">
          <div className="site-nav__links">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  `site-nav__link${isActive ? " site-nav__link--active" : ""}`
                }
                to={link.to}
                end={link.end}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <button
            className="site-nav__menu-trigger"
            type="button"
            ref={menuButtonRef}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-nav-overlay"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="nav-overlay"
          id="site-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="nav-overlay__menu" ref={overlayRef}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                className="nav-overlay__item"
                to={link.to}
                end={link.end}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
            <button className="nav-overlay__close" type="button" onClick={closeMenu}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
