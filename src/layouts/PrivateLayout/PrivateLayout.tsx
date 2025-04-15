import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '../../components/shared/Navbar/Navbar';

import styles from './PrivateLayout.module.scss';
import { useAppSelector } from '../../store/storeHooks';

const PrivateLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      {user ? (
        <div className={styles.privateLayout}>
          <Navbar />
          <div className={styles.privateLayout__mainContent}>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="login" replace />
      )}
    </div>
  );
};

export default PrivateLayout;
