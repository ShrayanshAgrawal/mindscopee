import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const navItems = [
  { path: '/app/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/app/questionnaire', icon: '📝', label: 'Assessment' },
  { path: '/app/results', icon: '📊', label: 'Results' },
  { path: '/app/cure', icon: '💊', label: 'Therapy & Activities' },
  { path: '/app/diet', icon: '🥗', label: 'Diet & Nutrition' },
  { path: '/app/about', icon: 'ℹ️', label: 'About' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">Mind<span>Scope</span></div>
        <div className="nav-links">
          <span style={{ color: '#6B7280', fontSize: '0.9rem', marginRight: '8px' }}>
            👤 {user?.name}
          </span>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
        </div>
      </nav>

      <div className="sidebar">
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: '12px', paddingLeft: '16px', textTransform: 'uppercase' }}>
          Navigation
        </p>
        {navItems.map(item => (
          <button
            key={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="main-content">
        <div className="page-content animate-fade">
          <Outlet />
        </div>
      </div>
    </>
  );
}
