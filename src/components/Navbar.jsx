import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ favoris }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const numberOfFavoris = Array.isArray(favoris) ? favoris.length : 0;

  // Fonction pour basculer l'état du menu hamburger
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleScroll = () => {
    const isScrolled = window.scrollY > 50; // Ajustez la valeur selon votre besoin
    setScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MovieApp
        </Link>
        <div className={`navbar-menu ${isMenuActive ? "active" : ""}`}>
          <Link to="/" className="navbar-item navbar-link">
            Accueil
          </Link>
          <Link to="/recherche" className="navbar-item navbar-link">
            Recherche
          </Link>
          <Link to="/ajouter" className="navbar-item navbar-link">
            Ajouter un film
          </Link>

          {/* Icône de favoris */}
          <Link to="/favoris" className="navbar-item navbar-link">
            <div className="favoris-icon">
              {numberOfFavoris > 0 ? (
                <FaHeart size={24} color="red" />
              ) : (
                <FaRegHeart size={24} />
              )}
            </div>
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <button className={`hamburger ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  favoris: [],
};

export default Navbar;