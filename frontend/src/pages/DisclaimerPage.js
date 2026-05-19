import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisclaimerPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FF', padding: '40px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#6C63FF', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>⚠️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A2E', marginBottom: '8px' }}>Medical Disclaimer</h1>
          <p style={{ color: '#6B7280' }}>Please read carefully before using MindScope</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            {
              title: '🚫 Not a Medical Diagnosis',
              content: 'MindScope is an educational and informational tool powered by artificial intelligence. The results, predictions, and assessments provided by MindScope are NOT a clinical diagnosis, psychiatric evaluation, or medical opinion. They should never be treated as such.',
              bg: '#FFEBEE', border: '#FFCDD2', titleColor: '#C62828'
            },
            {
              title: '👨‍⚕️ Professional Consultation Required',
              content: 'If you are experiencing mental health symptoms, distress, or any condition suggested by MindScope\'s results, we strongly urge you to consult a licensed psychiatrist, clinical psychologist, or other qualified mental health professional. Only a professional can diagnose and treat mental health conditions.',
              bg: '#E3F2FD', border: '#BBDEFB', titleColor: '#1565C0'
            },
            {
              title: '🆘 Crisis & Emergency',
              content: 'If you are experiencing thoughts of suicide, self-harm, or are in a mental health crisis, please do NOT rely on this application. Contact emergency services or a crisis helpline immediately:\n\n• iCall (India): 9152987821\n• Vandrevala Foundation: 1860-2662-345\n• AASRA: 022-27546669\n• NIMHANS: 080-46110007\n• National Emergency: 112',
              bg: '#FFEBEE', border: '#FFCDD2', titleColor: '#B71C1C', pre: true
            },
            {
              title: '🤖 AI Limitations',
              content: 'MindScope uses a machine learning model trained on a limited dataset. The model has inherent limitations and may not accurately reflect the full complexity of mental health. Factors such as cultural background, medical history, medication, and individual circumstances are not fully captured by questionnaire responses.',
              bg: '#FFF8E1', border: '#FFE082', titleColor: '#E65100'
            },
            {
              title: '🔒 Data Privacy',
              content: 'Your questionnaire responses and assessment data are stored securely and are used only to provide you with results within the application. We do not share your personal health information with third parties. However, this application is not HIPAA-compliant and should not be used for storing medical records.',
              bg: '#E8F5E9', border: '#C8E6C9', titleColor: '#1B5E20'
            },
            {
              title: '📚 Educational Purpose',
              content: 'MindScope is developed as an academic/educational project to raise awareness about mental health conditions. It is intended to encourage conversations about mental health and guide individuals toward seeking professional help — not to replace it.',
              bg: '#EEF0FF', border: '#C7C4FF', titleColor: '#4C1D95'
            },
          ].map(s => (
            <div key={s.title} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '14px', padding: '20px 24px' }}>
              <h3 style={{ fontWeight: 700, color: s.titleColor, marginBottom: '10px', fontSize: '0.95rem' }}>{s.title}</h3>
              {s.pre
                ? <pre style={{ fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap', color: '#374151', fontSize: '0.85rem', lineHeight: 1.7 }}>{s.content}</pre>
                : <p style={{ color: '#374151', fontSize: '0.85rem', lineHeight: 1.7 }}>{s.content}</p>
              }
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px', padding: '28px', background: '#6C63FF', borderRadius: '16px', color: '#fff' }}>
          <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>By using MindScope, you acknowledge that you have read and understood this disclaimer.</p>
          <p style={{ opacity: 0.85, fontSize: '0.88rem', marginBottom: '20px' }}>MindScope is for educational purposes only and does not replace professional mental health care.</p>
          <button className="btn" style={{ background: '#fff', color: '#6C63FF', fontWeight: 700 }} onClick={() => navigate('/')}>
            I Understand — Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
