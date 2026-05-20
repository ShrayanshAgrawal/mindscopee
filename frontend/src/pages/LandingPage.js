import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const features = [
  { icon: '🧠', title: 'AI-Powered Analysis', desc: 'Our ML model trained on clinical data identifies 12 mental health conditions with accuracy.' },
  { icon: '📊', title: 'Disorder Percentages', desc: 'Get precise likelihood percentages for each disorder with risk level classification.' },
  { icon: '💊', title: 'Personalized Suggestions', desc: 'Evidence-based therapy activities and dietary recommendations tailored to your profile.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your data is encrypted and never shared. Full control over your health information.' },
];

const disorders = ['MDD','ASD','Anxiety','PTSD','Bipolar','ADHD','OCD','Loneliness','Eating Disorder','Sleep Disorder','PDD','Psychotic Depression'];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F7F8FF', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px', height: '68px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6C63FF', letterSpacing: '-0.5px' }}>Mind<span style={{ color: '#FF6584' }}>Scope</span></div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => navigate('/disclaimer')} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}>Disclaimer</button>
          {user
            ? <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/dashboard')}>Dashboard →</button>
            : <>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/signup')}>Sign Up</button>
              </>
          }
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', background: 'linear-gradient(160deg, #EEF0FF 0%, #F7F8FF 60%, #FFF0F5 100%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EEF0FF', border: '1px solid #C7C4FF', borderRadius: '50px', padding: '6px 16px', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6C63FF' }}>🤖 AI-Powered Mental Health Assessment</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px' }}>
          Understand Your<br />
          <span style={{ color: '#6C63FF' }}>Mental Health</span> Better
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#6B7280', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Take a 27-question evidence-based assessment and get personalized insights on 12 mental health disorders — with risk levels, therapy activities, and dietary guidance.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate(user ? '/app/questionnaire' : '/signup')}>
            🚀 Get Started — It's Free
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/disclaimer')}>
            📋 Read Disclaimer
          </button>
        </div>
        <p style={{ marginTop: '16px', fontSize: '0.82rem', color: '#9CA3AF' }}>⚠️ For informational purposes only. Not a medical diagnosis.</p>
      </section>

      {/* Disorders */}
      <section style={{ padding: '60px', background: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '8px' }}>12 Mental Health Conditions Analyzed</h2>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>Our AI model detects likelihood across a wide range of disorders</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {disorders.map(d => (
            <span key={d} style={{ background: '#EEF0FF', color: '#6C63FF', padding: '8px 18px', borderRadius: '50px', fontSize: '0.88rem', fontWeight: 600 }}>{d}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 60px', background: '#F7F8FF' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: '48px', color: '#1A1A2E' }}>Why MindScope?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
          {features.map(f => (
            <div key={f.title} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px', color: '#1A1A2E' }}>{f.title}</h3>
              <p style={{ color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 60px', background: 'linear-gradient(135deg, #6C63FF, #8B85FF)', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to take the first step?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', fontSize: '1.05rem' }}>Free • Private • Takes ~5 minutes</p>
        <button className="btn btn-lg" style={{ background: '#fff', color: '#6C63FF', fontWeight: 700 }} onClick={() => navigate(user ? '/app/questionnaire' : '/signup')}>
          Start Your Assessment →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1A1A2E', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '28px', fontSize: '0.85rem' }}>
        <p>© 2024 MindScope by Shrayansh Agrawal & Priyanka Yadav</p>
        <p style={{ marginTop: '6px' }}>For educational purposes only — not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
}
