import { useState } from "react";
import { Link } from "react-router-dom";
import hamburgerIcon from "../assets/Hamburger-icon.png";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="mobile-nav">
      <menu className="hamburger-menu">
        <button
          className="hamburger-icon"
          id="hamburger-icon"
          onClick={handleNavClick}
        >
          <img
            id="hamburger-icon-img"
            className="hamburger-icon-img"
            src={hamburgerIcon}
            alt="Open navigation Menu"
          />
        </button>
        <ul className={`mobile-nav-links ${menuOpen ? "open" : ""}`}>
          <li className="navLinkItem">
            <Link className="navButtons" to="/">
              News Feed
            </Link>
          </li>
        </ul>
      </menu>
    </nav>
  );
}
