import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaCreativeCommons } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaCoins } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';

import styles from './Navbar.module.scss';

const navLinks = [
  { to: '/', icon: <FaHome />, label: 'Home' },
  { to: '/coins', icon: <FaCoins />, label: 'Coins' },
  { to: '/explore', icon: <FaHashtag />, label: 'Explore' },
  { to: '/profile', icon: <CgProfile />, label: 'Profile' },
];

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <header className={styles.navbar__header}>
        <FaCreativeCommons className={styles.navbar__headerLogo} />
        <div className={styles.navbar__headerTitle}>Crypto Club</div>
      </header>
      <div className={styles.navbar__menu}>
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? `${styles.navbar__link} ${styles['navbar__link--active']}` : styles.navbar__link
            }
          >
            <div className={styles.navbar__linkIcon}>{icon}</div>
            <span className={styles.navbar__menuItemText}>{label}</span>
          </NavLink>
        ))}
      </div>
      <div className={styles.navbar__footer}>
        <div className={styles.navbar__accountInfo}>
          <MdAccountCircle className={styles.navbar__accountInfoIcon} />
          <span className={styles.navbar__accountInfoText}>Account</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
