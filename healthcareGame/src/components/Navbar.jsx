import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Health Care</div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
       
        {/* <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Signup">Signup</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;