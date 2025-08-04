import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Fetch user details from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Handle scroll effect
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage and state
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to login page
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Animated Background Elements */}
        <div className="header-bg-animation">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <div className="logo-pulse"></div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="health-icon">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <div className="health-cross">
                <div className="cross-horizontal"></div>
                <div className="cross-vertical"></div>
              </div>
            </div>
            <div className="logo-text">
              <span className="brand-name">
                <span className="letter-animate">H</span>
                <span className="letter-animate">e</span>
                <span className="letter-animate">a</span>
                <span className="letter-animate">l</span>
                <span className="letter-animate">t</span>
                <span className="letter-animate">h</span>
                <span className="brand-highlight">Care</span>
              </span>
              <span className="brand-tagline">
                <span className="tagline-icon">⚡</span>
                Gaming Platform
                <span className="tagline-icon">🎮</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className={`nav ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          <div className="nav-links">
            <Link to="/home" className="nav-link nav-home">
              <div className="nav-icon-wrapper">
                <span className="nav-icon">🏠</span>
                <div className="nav-glow"></div>
              </div>
              <span className="nav-text">Home</span>
              <div className="nav-underline"></div>
            </Link>
            <Link to="/game" className="nav-link nav-game">
              <div className="nav-icon-wrapper">
                <span className="nav-icon">🎮</span>
                <div className="nav-glow"></div>
              </div>
              <span className="nav-text">Game</span>
              <div className="nav-underline"></div>
            </Link>
            <Link to="/about" className="nav-link nav-about">
              <div className="nav-icon-wrapper">
                <span className="nav-icon">ℹ️</span>
                <div className="nav-glow"></div>
              </div>
              <span className="nav-text">About Us</span>
              <div className="nav-underline"></div>
            </Link>
            {user ? (
              <Link to="/profile" className="nav-link nav-profile">
                <div className="nav-icon-wrapper">
                  <span className="nav-icon">👤</span>
                  <div className="nav-glow"></div>
                </div>
                <span className="nav-text">My Profile</span>
                <div className="nav-underline"></div>
              </Link>
            ) : (
              <Link to="/" className="nav-link login-link nav-login">
                <div className="nav-icon-wrapper">
                  <span className="nav-icon">🔐</span>
                  <div className="nav-glow"></div>
                </div>
                <span className="nav-text">Login</span>
                <div className="nav-underline"></div>
              </Link>
            )}
          </div>
        </nav>

        {/* User Section */}
        <div className="user-section">
          {user?.name ? (
            <div className="user-info">
              <div className="user-avatar">
                <span className="avatar-text">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="user-details">
                <span className="user-welcome">Welcome back!</span>
                <span className="user-name">{user.name}</span>
              </div>
              <button className="logout-button" onClick={handleLogout} title="Logout">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;