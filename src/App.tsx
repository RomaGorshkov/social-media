import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import CoinsPage from './pages/CoinsPage/CoinsPage';

import AuthenticatedLayout from './layouts/AuthenticatedLayout/AuthenticatedLayout';
import LoginPage from './pages/LoginPage/LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins" element={<CoinsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
