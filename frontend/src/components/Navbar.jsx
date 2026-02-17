import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Brand Logo  */}
      <div className={styles.logo}>SHARE</div>
      
      {/* Navigations*/}
      <ul className={styles.navList}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={({ isActive }) => isActive ? styles.active : styles.link}>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : styles.link}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" className={({ isActive }) => isActive ? styles.active : styles.link}>
            Upload
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;