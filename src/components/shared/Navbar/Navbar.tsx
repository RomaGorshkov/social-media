import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaCoins, FaHashtag, FaHome, FaCreativeCommons } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdAccountCircle } from 'react-icons/md';

import { setLogoutUser } from '../../../store/reducers/auth';
import { logoutUser } from '../../../firebase/authUser';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

import styles from './Navbar.module.scss';

const navLinks = [
  { to: '/', icon: <FaHome />, label: 'Home' },
  { to: '/coins', icon: <FaCoins />, label: 'Coins' },
  { to: '/explore', icon: <FaHashtag />, label: 'Explore' },
  { to: '/profile', icon: <CgProfile />, label: 'Profile' },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(setLogoutUser());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div
        className={`${styles.navbar__burger} ${isMenuOpen ? styles['navbar__burger--active'] : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isMenuOpen && <div className={styles.navbar__overlay} onClick={() => setIsMenuOpen(false)}></div>}
      <div className={`${styles.navbar} ${isMenuOpen ? styles['navbar--open'] : ''}`}>
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
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={styles.navbar__linkIcon}>{icon}</div>
              <span>{label}</span>
            </NavLink>
          ))}
          {isAuthenticated && (
            <div className={styles.navbar__authAccount}>
              <div className={styles.navbar__userName}>
                <MdAccountCircle className={styles.navbar__accountInfoIcon} />
                {user?.displayName}
              </div>
              <button onClick={handleLogout} className={styles.navbar__logoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
