import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

const QUESTIONS = [
  { id: 'q_nervous', text: 'How often do you feel nervous, anxious, or on edge?', feature: 'feeling.nervous', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
  { id: 'q_panic', text: 'Do you experience sudden episodes of intense fear or panic attacks?', feature: 'panic', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
  { id: 'q_breathing', text: 'Do you have episodes of rapid or difficulty breathing not due to exercise?', feature: 'breathing.rapidly', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
  { id: 'q_sweating', text: 'Do you experience unexplained excessive sweating or trembling?', feature: 'sweating', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
  { id: 'q_concentration', text: 'How often do you have trouble concentrating or focusing on tasks?', feature: 'trouble.in.concentration', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_sleep', text: 'Do you have trouble falling or staying asleep?', feature: 'having.trouble.in.sleeping', options: ['Never', 'Rarely (1-2 nights/week)', 'Sometimes (3 nights/week)', 'Often (4-5 nights/week)', 'Almost every night'] },
  { id: 'q_work', text: 'How much does your emotional state affect your work or daily responsibilities?', feature: 'having.trouble.with.work', options: ['Not at all', 'Slightly', 'Moderately', 'A lot', 'Severely'] },
  { id: 'q_hopeless', text: 'Do you feel hopeless or like things will never get better?', feature: 'hopelessness', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_anger', text: 'Do you feel unusually irritable, angry, or have sudden outbursts?', feature: 'anger', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_overreact', text: 'Do you find yourself overreacting emotionally to small situations?', feature: 'over.react', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_eating', text: 'Have you noticed significant changes in your appetite or eating habits?', feature: 'change.in.eating', options: ['No change', 'Slight change', 'Moderate change', 'Significant change', 'Extreme change'] },
  { id: 'q_suicidal', text: 'Have you had thoughts of harming yourself or not wanting to be alive?', feature: 'suicidal.thought', options: ['Never', 'Rarely (passing thoughts)', 'Sometimes', 'Often', 'Very frequently'] },
  { id: 'q_tired', text: 'How often do you feel physically or emotionally exhausted without a clear cause?', feature: 'feeling.tired', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_social', text: 'Do you feel you lack close friends or meaningful relationships?', feature: 'close.friend', options: ['No, I have many', 'I have a few', 'I have 1-2 close friends', 'I rarely feel close to anyone', 'I feel completely isolated'] },
  { id: 'q_social_media', text: 'How many hours per day do you spend on social media?', feature: 'social.media.addiction', options: ['< 1 hour', '1-2 hours', '2-4 hours', '4-6 hours', '6+ hours'] },
  { id: 'q_weight', text: 'Have you experienced significant unexplained weight changes recently?', feature: 'weight.gain', options: ['None', 'Slight (1-2kg)', 'Moderate (3-5kg)', 'Significant (5-10kg)', 'Extreme (>10kg)'] },
  { id: 'q_introvert', text: 'Do you prefer to be alone and find social situations draining?', feature: 'introvert', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_memory', text: 'Do distressing memories from the past keep popping into your mind?', feature: 'popping.up.stressful.memory', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Constantly'] },
  { id: 'q_nightmares', text: 'How often do you have disturbing nightmares?', feature: 'having.nightmares', options: ['Never', 'Rarely (1-2/month)', 'Sometimes (weekly)', 'Often (several/week)', 'Almost every night'] },
  { id: 'q_avoids', text: 'Do you avoid people, places, or activities you used to enjoy?', feature: 'avoids.people.or.activities', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_negative', text: 'Do you have persistent negative thoughts about yourself or the world?', feature: 'feeling.negative', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_concentrate', text: 'Do you find it extremely difficult to concentrate even on simple tasks?', feature: 'trouble.concentrating', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_blame', text: 'Do you blame yourself for things that go wrong?', feature: 'blamming.yourself', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q_hallucinations', text: 'Do you ever see, hear, or sense things that others don\'t seem to notice?', feature: 'hallucinations', options: ['Never', 'Very rarely (once/year)', 'Occasionally', 'Sometimes', 'Frequently'] },
  { id: 'q_repetitive', text: 'Do you engage in repetitive behaviors or feel compelled to repeat rituals?', feature: 'repetitive.behaviour', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very frequently'] },
  { id: 'q_seasonal', text: 'Does your mood significantly worsen during certain seasons or times of year?', feature: 'seasonally', options: ['No pattern', 'Slight pattern', 'Moderate pattern', 'Strong seasonal pattern', 'Severely affects my life'] },
  { id: 'q_energy', text: 'Do you have periods of unusually high energy, reduced need for sleep, or racing thoughts?', feature: 'increased.energy', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'] },
];

export default function QuestionnairePage() {
  const { token, setLastResult } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const q = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;
  const isLast = current === QUESTIONS.length - 1;

  const selectAnswer = (val) => setAnswers(prev => ({ ...prev, [q.id]: val }));

  const next = () => {
    if (answers[q.id] === undefined) return;
    if (isLast) submit();
    else setCurrent(c => c + 1);
  };

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const res = await axios.post('/api/predict', { answers }, { headers: { Authorization: `Bearer ${token}` } });
      setLastResult(res.data);
      navigate('/app/results');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const riskNote = current === 11 ? (
    <div style={{ background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.82rem', color: '#E65100' }}>
      ⚠️ If you're experiencing thoughts of self-harm, please reach out immediately to iCall: <strong>9152987821</strong> or Vandrevala Foundation: <strong>1860-2662-345</strong>
    </div>
  ) : null;

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6C63FF' }}>Question {current + 1} of {QUESTIONS.length}</span>
          <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>{Math.round(progress)}% complete</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6C63FF, #8B85FF)' }} />
        </div>
      </div>

      <div className="card animate-fade" key={current} style={{ padding: '36px', minHeight: '360px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{ width: '32px', height: '32px', background: '#6C63FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
            {current + 1}
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.45 }}>{q.text}</h2>
        </div>

        {riskNote}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i;
            return (
              <button key={i} onClick={() => selectAnswer(i)}
                style={{
                  padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                  border: selected ? '2px solid #6C63FF' : '2px solid #E5E7EB',
                  background: selected ? '#EEF0FF' : '#fff',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  transition: 'all 0.15s', textAlign: 'left',
                  color: selected ? '#6C63FF' : '#374151',
                  fontWeight: selected ? 600 : 400, fontSize: '0.92rem',
                }}>
                <span style={{ width: '22px', height: '22px', border: selected ? '2px solid #6C63FF' : '2px solid #D1D5DB', borderRadius: '50%', background: selected ? '#6C63FF' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>
                  {selected ? '✓' : ''}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {error && <p style={{ color: '#C62828', fontSize: '0.85rem', marginTop: '12px' }}>⚠️ {error}</p>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
        <button className="btn btn-outline btn-sm" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
          ← Previous
        </button>
        <button className="btn btn-primary" onClick={next} disabled={answers[q.id] === undefined || loading}
          style={{ minWidth: '140px', justifyContent: 'center' }}>
          {loading ? '⏳ Analyzing...' : isLast ? '🧠 Get Results' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
