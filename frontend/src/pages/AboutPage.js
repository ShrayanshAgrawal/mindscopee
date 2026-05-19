import React from 'react';

const team = [
  {
    name: 'Shrayansh Agrawal',
    role: 'ML Engineer & Backend Developer',
    emoji: '🧠',
    color: '#6C63FF',
    desc: 'Led the development of the machine learning model, data preprocessing pipeline, and Flask backend. Passionate about applying AI to solve real-world mental health challenges.',
  },
  {
    name: 'Priyanka Yadav',
    role: 'Frontend Developer & UX Designer',
    emoji: '🎨',
    color: '#EC4899',
    desc: 'Designed and built the user interface with a focus on accessibility and user experience. Ensures the platform is intuitive, welcoming, and easy to navigate for all users.',
  },
  {
    name: 'Taher Nawab',
    role: 'Research & Content Specialist',
    emoji: '📚',
    color: '#059669',
    desc: 'Curated evidence-based therapy activities, dietary recommendations, and crisis resources. Ensured all content is clinically grounded, accurate, and actionable.',
  },
];

const techStack = [
  { name: 'Python & Flask', desc: 'Backend API', icon: '🐍' },
  { name: 'React.js', desc: 'Frontend UI', icon: '⚛️' },
  { name: 'scikit-learn', desc: 'ML Model', icon: '🤖' },
  { name: 'SMOTE', desc: 'Data Balancing', icon: '⚖️' },
  { name: 'Random Forest', desc: 'Classification', icon: '🌲' },
  { name: 'SQLite', desc: 'Database', icon: '🗄️' },
  { name: 'JWT Auth', desc: 'Security', icon: '🔐' },
  { name: 'Recharts', desc: 'Visualization', icon: '📊' },
];

export default function AboutPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A2E' }}>ℹ️ About MindScope</h1>
        <p style={{ color: '#6B7280', marginTop: '4px' }}>Learn about our mission and the team behind this project</p>
      </div>

      {/* Mission */}
      <div style={{ background: 'linear-gradient(135deg, #6C63FF, #8B85FF)', borderRadius: '16px', padding: '36px', color: '#fff', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>🎯 Our Mission</h2>
        <p style={{ lineHeight: 1.75, fontSize: '1rem', opacity: 0.95 }}>
          MindScope was created to bridge the massive gap between mental health awareness and accessibility in India. 
          With over 197 million people affected by mental disorders in India and a severe shortage of mental health professionals, 
          millions go undiagnosed and untreated — often because they don't even know what they're experiencing.
        </p>
        <p style={{ lineHeight: 1.75, fontSize: '1rem', opacity: 0.95, marginTop: '12px' }}>
          MindScope empowers individuals to understand their mental health through AI-driven analysis, 
          guiding them toward appropriate professional help with clear, stigma-free, and accessible language. 
          We believe that awareness is the first step toward healing.
        </p>
      </div>

      {/* Team */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '20px' }}>👥 The Team</h2>
      <div className="grid-3" style={{ marginBottom: '32px' }}>
        {team.map(m => (
          <div key={m.name} className="card" style={{ textAlign: 'center', borderTop: `4px solid ${m.color}` }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 16px' }}>{m.emoji}</div>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '4px' }}>{m.name}</h3>
            <p style={{ fontSize: '0.8rem', color: m.color, fontWeight: 600, marginBottom: '10px' }}>{m.role}</p>
            <p style={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.6 }}>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '20px' }}>🛠️ Technology Stack</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {techStack.map(t => (
            <div key={t.name} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{t.icon}</div>
              <p style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1A1A2E' }}>{t.name}</p>
              <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '20px' }}>🔬 How the AI Works</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { step: '1', title: 'Data Collection & Cleaning', desc: 'A clinical dataset of 637 patient records across 12 mental health conditions was cleaned, normalized, and balanced using SMOTE (Synthetic Minority Over-sampling Technique) to address class imbalance.' },
            { step: '2', title: 'Feature Engineering', desc: '27 behavioral and psychological features were extracted from the questionnaire responses, each mapped to a validated clinical symptom indicator.' },
            { step: '3', title: 'Model Training', desc: 'A Random Forest Classifier with 200 estimators was trained on the balanced dataset. The model predicts the probability of each of the 12 disorders from questionnaire responses.' },
            { step: '4', title: 'Multilabel Output', desc: 'Using probability calibration, the model outputs a percentage likelihood for all 12 conditions simultaneously — not just the top prediction — giving a complete mental health profile.' },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', background: '#6C63FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{s.step}</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1A1A2E', marginBottom: '4px' }}>{s.title}</p>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations */}
      <div style={{ background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: '16px', padding: '24px' }}>
        <h3 style={{ fontWeight: 700, color: '#E65100', marginBottom: '12px' }}>⚠️ Important Limitations</h3>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'MindScope is NOT a clinical diagnostic tool. Results are probabilistic estimates, not diagnoses.',
            'The model was trained on a limited dataset of 637 records and may not generalize to all populations.',
            'Mental health is complex — a questionnaire cannot capture all nuances of a person\'s experience.',
            'Always consult a licensed psychiatrist or clinical psychologist for proper diagnosis and treatment.',
            'In case of crisis or suicidal thoughts, please call emergency services or a crisis helpline immediately.',
          ].map((l, i) => <li key={i} style={{ fontSize: '0.85rem', color: '#BF360C', lineHeight: 1.6 }}>{l}</li>)}
        </ul>
      </div>
    </div>
  );
}
