import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from '../layouts/AuthenticatedLayout/AuthenticatedLayout';
import { CoinsPage, HomePage, LoginPage } from '../pages';

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AuthenticatedLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<CoinsPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
