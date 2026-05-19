import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { useAuth } from '../App';

const RISK_COLORS = { Low: '#4CAF50', Moderate: '#FF9800', High: '#F44336' };

export default function ResultsPage() {
  const { lastResult } = useAuth();
  const navigate = useNavigate();

  if (!lastResult) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
        <h2 style={{ fontWeight: 700, color: '#1A1A2E', marginBottom: '8px' }}>No Results Yet</h2>
        <p style={{ color: '#6B7280', marginBottom: '24px' }}>Complete an assessment to see your results here.</p>
        <button className="btn btn-primary" onClick={() => navigate('/app/questionnaire')}>Take Assessment</button>
      </div>
    );
  }

  const { predictions, top_disorder, summary } = lastResult;
  const top5 = predictions.slice(0, 5);
  const radarData = top5.map(p => ({ disorder: p.disorder.length > 10 ? p.disorder.split(' ')[0] : p.disorder, value: p.percentage }));

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A2E' }}>Your Mental Health Report</h1>
        <p style={{ color: '#6B7280', marginTop: '4px' }}>Based on your assessment responses — for informational purposes only</p>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-banner">
        <span style={{ fontSize: '1.3rem' }}>⚠️</span>
        <p style={{ fontSize: '0.82rem', color: '#BF360C' }}>
          <strong>Important:</strong> These results are AI-generated estimates and are NOT a clinical diagnosis. Please consult a licensed mental health professional for proper evaluation and treatment.
        </p>
      </div>

      {/* Summary Card */}
      <div style={{ background: 'linear-gradient(135deg, #6C63FF, #8B85FF)', borderRadius: '16px', padding: '28px', color: '#fff', marginBottom: '28px' }}>
        <p style={{ opacity: 0.8, fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🧠 Primary Finding</p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{top_disorder}</h2>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>{summary}</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/app/cure')} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: '50px', padding: '8px 18px', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
            💊 View Therapy Activities
          </button>
          <button onClick={() => navigate('/app/diet')} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: '50px', padding: '8px 18px', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
            🥗 Diet Recommendations
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: '28px' }}>
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '20px' }}>📊 Disorder Likelihood (Top 5)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={top5} layout="vertical">
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="disorder" tick={{ fontSize: 10 }} width={110} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                {top5.map((p, i) => <Cell key={i} fill={RISK_COLORS[p.risk] || '#6C63FF'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '20px' }}>🕸 Symptom Pattern (Radar)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="disorder" tick={{ fontSize: 10 }} />
              <Radar name="You" dataKey="value" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All Disorders Detail */}
      <div className="card">
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '20px' }}>📋 Full Analysis — All Conditions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {predictions.map((p, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A2E' }}>#{i + 1} {p.disorder}</span>
                  <span className={`badge badge-${p.risk?.toLowerCase()}`} style={{ marginLeft: '10px' }}>{p.risk} Risk</span>
                </div>
                <span style={{ fontWeight: 700, color: RISK_COLORS[p.risk] || '#6C63FF', fontSize: '1rem' }}>{p.percentage}%</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: '6px' }}>
                <div className="progress-fill" style={{ width: `${p.percentage}%`, background: RISK_COLORS[p.risk] || '#6C63FF' }} />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button className="btn btn-outline" onClick={() => navigate('/app/questionnaire')}>🔄 Retake Assessment</button>
      </div>
    </div>
  );
}
