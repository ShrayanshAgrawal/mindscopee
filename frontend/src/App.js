import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultsPage from './pages/ResultsPage';
import CurePage from './pages/CurePage';
import DietPage from './pages/DietPage';
import AboutPage from './pages/AboutPage';
import DisclaimerPage from './pages/DisclaimerPage';
import Layout from './components/Layout';

export const AuthContext = createContext(null);

export function useAuth() { return useContext(AuthContext); }

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mh_user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('mh_token') || null);
  const [lastResult, setLastResult] = useState(null);

  const login = (userData, tok) => {
    setUser(userData);
    setToken(tok);
    localStorage.setItem('mh_user', JSON.stringify(userData));
    localStorage.setItem('mh_token', tok);
  };

  const logout = () => {
    setUser(null); setToken(null);
    localStorage.removeItem('mh_user');
    localStorage.removeItem('mh_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, lastResult, setLastResult }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="questionnaire" element={<QuestionnairePage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="cure" element={<CurePage />} />
            <Route path="diet" element={<DietPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
