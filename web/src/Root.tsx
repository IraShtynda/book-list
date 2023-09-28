import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { UpsertBook } from './pages/UpsertBook/UpsertBook';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';


export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path='' element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="upsertbook" element={<UpsertBook />} />
        <Route path="upsertbook/:id" element={<UpsertBook />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
