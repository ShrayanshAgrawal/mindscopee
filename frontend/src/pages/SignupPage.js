import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup', { name: form.name, email: form.email, password: form.password });
      login(res.data.user, res.data.token);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #EEF0FF 0%, #F7F8FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6C63FF', marginBottom: '8px' }}>Mind<span style={{ color: '#FF6584' }}>Scope</span></div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1A1A2E' }}>Create Your Account</h2>
          <p style={{ color: '#6B7280', marginTop: '6px' }}>Start your mental wellness journey today</p>
        </div>

        <div className="card" style={{ padding: '36px' }}>
          {error && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#C62828', fontSize: '0.88rem' }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
              { key: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px', color: '#374151' }}>{f.label}</label>
                <input className="input" type={f.type} placeholder={f.placeholder} value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })} required />
              </div>
            ))}
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              {loading ? '⏳ Creating account...' : '✨ Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6B7280', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#6C63FF', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
