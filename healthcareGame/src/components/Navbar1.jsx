import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar1 = () => {
  return (
    <nav className="navbar">
      <div className="logo">Health Care</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/Signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;