import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #EEF0FF 0%, #F7F8FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6C63FF', marginBottom: '8px' }}>Mind<span style={{ color: '#FF6584' }}>Scope</span></div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1A1A2E' }}>Welcome Back</h2>
          <p style={{ color: '#6B7280', marginTop: '6px' }}>Sign in to access your mental health insights</p>
        </div>

        <div className="card" style={{ padding: '36px' }}>
          {error && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#C62828', fontSize: '0.88rem' }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px', color: '#374151' }}>Email Address</label>
              <input className="input" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px', color: '#374151' }}>Password</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? '⏳ Signing in...' : '🔐 Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6B7280', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#6C63FF', fontWeight: 600 }}>Sign up free</Link>
          </p>
        </div>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#9CA3AF', fontSize: '0.78rem' }}>
          By continuing you agree to our terms. This is not medical advice.
        </p>
      </div>
    </div>
  );
}
