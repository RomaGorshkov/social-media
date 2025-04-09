import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Login.module.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContainer__content}>
        <h1 className={styles.loginContainer__title}>Login</h1>
        <form className={styles.loginContainer__form}>
          <div className={styles.loginContainer__formGroup}>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              name="email"
              className={styles.loginContainer__input}
              required
            />
          </div>
          <div className={styles.loginContainer__formGroup}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className={styles.loginContainer__input}
              required
            />
          </div>
          <div className={styles.loginContainer__submitGroup}>
            <div className={styles.loginContainer__checkboxGroup}>
              <input type="checkbox" id="rememberMe" name="rememberMe" className={styles.loginContainer__checkbox} />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className={styles.loginContainer__submit}>
              Login
            </button>
          </div>
          <p className={styles.loginContainer__forgotPassword}>
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
