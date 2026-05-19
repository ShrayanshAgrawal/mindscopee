import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

const tips = [
  '🌿 Even 10 minutes of walking daily can reduce anxiety by up to 40%.',
  '💧 Staying hydrated directly impacts mood and cognitive function.',
  '🧘 Deep breathing for 5 minutes can lower cortisol levels significantly.',
  '😴 7-9 hours of sleep is essential for emotional regulation.',
  '🤝 Social connection is one of the strongest predictors of mental well-being.',
  '📵 Limiting screen time before bed improves sleep quality and mood.',
];

export default function Dashboard() {
  const { user, token, setLastResult } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [tipIdx] = useState(Math.floor(Math.random() * tips.length));

  useEffect(() => {
    axios.get('/api/history', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setHistory(r.data))
      .catch(() => {});
  }, [token]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A2E' }}>{greeting}, {user?.name?.split(' ')[0]} 👋</h1>
        <p style={{ color: '#6B7280', marginTop: '4px' }}>Here's your mental wellness overview</p>
      </div>

      {/* Disclaimer Banner */}
      <div className="disclaimer-banner">
        <span style={{ fontSize: '1.3rem' }}>⚠️</span>
        <div>
          <strong style={{ color: '#E65100', fontSize: '0.88rem' }}>Medical Disclaimer</strong>
          <p style={{ fontSize: '0.82rem', color: '#BF360C', marginTop: '2px' }}>MindScope is for educational and informational purposes only. Results are NOT a clinical diagnosis. Please consult a licensed mental health professional for medical advice.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {[
          { icon: '📝', title: 'Start Assessment', desc: 'Answer 27 questions to analyze your mental health', action: () => navigate('/app/questionnaire'), color: '#6C63FF', bg: '#EEF0FF' },
          { icon: '💊', title: 'Therapy Activities', desc: 'Evidence-based activities for mental wellness', action: () => navigate('/app/cure'), color: '#00BCD4', bg: '#E0F7FA' },
          { icon: '🥗', title: 'Diet Guide', desc: 'Nutrition recommendations for mental health', action: () => navigate('/app/diet'), color: '#4CAF50', bg: '#E8F5E9' },
        ].map(c => (
          <div key={c.title} className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: `1px solid ${c.bg}` }}
            onClick={c.action}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(108,99,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '14px' }}>{c.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '6px' }}>{c.title}</h3>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Wellness Tip */}
      <div style={{ background: 'linear-gradient(135deg, #6C63FF, #8B85FF)', borderRadius: '16px', padding: '24px 28px', color: '#fff', marginBottom: '28px' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>💡 Daily Wellness Tip</p>
        <p style={{ fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.6 }}>{tips[tipIdx]}</p>
      </div>

      {/* Recent History */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1A1A2E' }}>Recent Assessments</h2>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/questionnaire')}>New Assessment</button>
        </div>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📊</div>
            <p style={{ fontWeight: 600, marginBottom: '6px' }}>No assessments yet</p>
            <p style={{ fontSize: '0.88rem' }}>Take your first assessment to see results here</p>
          </div>
        ) : (
          history.map((h, i) => {
            const top = h.result?.predictions?.[0];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < history.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A2E' }}>{top?.disorder || 'Assessment'}</p>
                  <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{new Date(h.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge badge-${top?.risk?.toLowerCase() || 'low'}`}>{top?.risk || 'Low'} Risk</span>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '4px' }}>{top?.percentage}% likelihood</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
