import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage and state
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Health Care</Link>
      </div>
      <nav className="nav">
        <Link to="/home">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/about">About Us</Link>
        {user ? (
          <Link to="/profile">My Profile</Link>
        ) : (
          <Link to="/">Login</Link>
        )}
      </nav>
      {user?.name ? (
        <div className="user-section">
          <span className="user-welcome">Welcome, {user.name}!</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;