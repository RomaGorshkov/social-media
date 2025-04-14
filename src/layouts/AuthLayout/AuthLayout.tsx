import React from 'react';

import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayout__content}>
        <h1 className={styles.authLayout__title}>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
