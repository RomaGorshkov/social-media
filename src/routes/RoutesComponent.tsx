import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateLayout from '../layouts/PrivateLayout/PrivateLayout';
import { CoinsPage, HomePage, LoginPage, ProfilePage, RegisterPage } from '../pages';

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<CoinsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
