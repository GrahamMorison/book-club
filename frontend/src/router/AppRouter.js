import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from '../components/AdminPage';
import Main from '../components/Main';
import VotingPage from '../components/VotingPageOld';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/voting" element={<VotingPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;