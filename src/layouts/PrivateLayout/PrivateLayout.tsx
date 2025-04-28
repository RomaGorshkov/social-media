import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '../../components/shared/Navbar/Navbar';
import { useAppSelector } from '../../store/storeHooks';

import styles from './PrivateLayout.module.scss';

const PrivateLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <div className={styles.privateLayout}>
        <Navbar />
        <div className={styles.privateLayout__mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
