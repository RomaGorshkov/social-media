import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/shared/Navbar/Navbar';

import styles from './AuthenticatedLayout.module.scss';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className={styles.authenticatedLayout}>
      <Navbar />
      <main className={styles.authenticatedLayout__mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
