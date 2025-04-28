import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../store/storeHooks';

import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) return <Navigate to="/" replace />;

  return (
    <div>
      <div className={styles.authLayout}>
        <div className={styles.authLayout__content}>
          <h1 className={styles.authLayout__title}>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
