import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hamburgerIcon from "../assets/Hamburger-icon.png";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function handleNavClick() {
    setMenuOpen(!menuOpen);
  }

  function handleSignOutClick() {
    setUserLoggedIn("");
    navigate("/login");
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
          <li className="navLinkItem" onClick={handleSignOutClick}>
            Sign Out
          </li>
        </ul>
      </menu>
    </nav>
  );
}
