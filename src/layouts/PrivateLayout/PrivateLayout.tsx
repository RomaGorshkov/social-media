import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/shared/Navbar/Navbar';

import styles from './PrivateLayout.module.scss';

const PrivateLayout: React.FC = () => {
  return (
    <div className={styles.privateLayout}>
      <Navbar />
      <div className={styles.privateLayout__mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
