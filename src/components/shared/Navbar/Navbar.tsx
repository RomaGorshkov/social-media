import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaCreativeCommons } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaCoins } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';

import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <header className={styles.navbar__header}>
        <FaCreativeCommons className={styles.navbar__headerLogo} />
        <div className={styles.navbar__headerTitle}>Crypto Club</div>
      </header>
      <div className={styles.navbar__menu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navbar__link} ${styles['navbar__link--active']}` : styles.navbar__link
          }
        >
          <FaHome className={styles.navbar__linkIcon} />
          Home
        </NavLink>
        <NavLink
          to="/coins"
          className={({ isActive }) =>
            isActive ? `${styles.navbar__link} ${styles['navbar__link--active']}` : styles.navbar__link
          }
        >
          <FaCoins className={styles.navbar__linkIcon} />
          Coins
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? `${styles.navbar__link} ${styles['navbar__link--active']}` : styles.navbar__link
          }
        >
          <FaHashtag className={styles.navbar__linkIcon} />
          Explore
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.navbar__link} ${styles['navbar__link--active']}` : styles.navbar__link
          }
        >
          <CgProfile className={styles.navbar__linkIcon} />
          Profile
        </NavLink>
      </div>
      <footer className={styles.navbar__footer}>
        <div className={styles.navbar__accountInfo}>
          <MdAccountCircle className={styles.navbar__accountInfoIcon} />
          <span className={styles.navbar__accountInfoText}>Account</span>
        </div>
      </footer>
    </nav>
  );
};

export default Navbar;
