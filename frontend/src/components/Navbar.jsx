import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <nav className={styles.navbar}>
   <div 
  className={styles.logo} 
  onClick={() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  SHARE
</div>


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