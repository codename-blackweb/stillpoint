import { NavLink } from "react-router-dom";
import "../styles/site-nav.css";

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <NavLink className="site-nav__brand" to="/">
        Stillpoint
      </NavLink>
      <div className="site-nav__links">
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/"
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/how-it-works"
        >
          How it Works
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/privacy-consent"
        >
          Privacy &amp; Consent
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/share"
        >
          Share
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/stories"
        >
          Stories
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link${isActive ? " site-nav__link--active" : ""}`
          }
          to="/support"
        >
          Support
        </NavLink>
      </div>
    </nav>
  );
}
