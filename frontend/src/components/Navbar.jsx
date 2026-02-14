// Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
          Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/signup" 
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
