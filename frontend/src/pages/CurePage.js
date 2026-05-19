import React, { useState } from 'react';

const CURE_DATA = {
  'MDD': {
    color: '#7C3AED', icon: '💜',
    title: 'Major Depressive Disorder',
    therapies: [
      { type: 'CBT', name: 'Cognitive Behavioral Therapy', desc: 'CBT helps identify and restructure negative thought patterns. Work with a therapist or use guided CBT workbooks daily for 30-45 minutes.', frequency: 'Daily', difficulty: 'Moderate' },
      { type: 'Exercise', name: 'Aerobic Exercise', desc: 'A 30-minute walk or jog 5 days/week has been shown to be as effective as antidepressants for mild-moderate depression.', frequency: '5x/week', difficulty: 'Low' },
      { type: 'Mindfulness', name: 'Mindfulness-Based Cognitive Therapy (MBCT)', desc: 'Body scan meditation, mindful breathing for 20 min/day. Apps like Headspace or Calm can guide you.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Social', name: 'Behavioral Activation', desc: 'Schedule one enjoyable activity per day — even if motivation is low. Start small: a 10-min walk, calling a friend, or making tea.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Sleep', name: 'Sleep Hygiene Protocol', desc: 'Consistent wake times, no screens 1 hour before bed, cool dark room. Depression severely disrupts sleep rhythms.', frequency: 'Daily', difficulty: 'Low' },
    ],
    emergency: 'iCall: 9152987821 | Vandrevala Foundation: 1860-2662-345 | NIMHANS: 080-46110007'
  },
  'Anxiety': {
    color: '#2563EB', icon: '💙',
    title: 'Anxiety Disorder',
    therapies: [
      { type: 'Breathing', name: '4-7-8 Breathing Technique', desc: 'Inhale for 4 seconds, hold for 7, exhale for 8. Activates the parasympathetic nervous system and reduces acute anxiety within minutes.', frequency: '3x daily', difficulty: 'Low' },
      { type: 'CBT', name: 'Exposure Therapy', desc: 'Gradually face feared situations in a controlled way. Start with the least anxiety-provoking scenario and work up. Best done with a therapist.', frequency: 'Weekly', difficulty: 'High' },
      { type: 'Mindfulness', name: 'Progressive Muscle Relaxation (PMR)', desc: 'Tense and release each muscle group for 5 seconds. Lie down and work from feet to head. Takes 15-20 minutes.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Journaling', name: 'Worry Journal', desc: 'Write worries for 15 min at a set time daily — this "contains" anxiety. Outside that time, remind yourself "I\'ll address this at worry time."', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Exercise', name: 'Yoga & Stretching', desc: 'Yoga reduces cortisol levels significantly. Even 15 minutes of gentle yoga in the morning can reduce daily anxiety levels.', frequency: 'Daily', difficulty: 'Low' },
    ],
    emergency: null
  },
  'PTSD': {
    color: '#DC2626', icon: '❤️',
    title: 'Post-Traumatic Stress Disorder',
    therapies: [
      { type: 'Therapy', name: 'EMDR (Eye Movement Desensitization)', desc: 'A specialized trauma therapy where you recall disturbing images while doing bilateral stimulation. Requires a trained therapist. Highly effective for PTSD.', frequency: 'Weekly (with therapist)', difficulty: 'High' },
      { type: 'Grounding', name: '5-4-3-2-1 Grounding Technique', desc: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This interrupts flashbacks and brings you to the present.', frequency: 'As needed', difficulty: 'Low' },
      { type: 'Safety', name: 'Safety Planning', desc: 'Create a written plan with safe people, safe places, coping statements, and crisis numbers. Review it regularly.', frequency: 'Once (update periodically)', difficulty: 'Low' },
      { type: 'Exercise', name: 'Trauma-Sensitive Yoga', desc: 'Yoga specifically designed for trauma survivors that emphasizes choice and body awareness. Look for certified TF-CBT providers.', frequency: '3x/week', difficulty: 'Moderate' },
    ],
    emergency: 'iCall: 9152987821 | Vandrevala Foundation: 1860-2662-345'
  },
  'Bipolar': {
    color: '#D97706', icon: '🧡',
    title: 'Bipolar Disorder',
    therapies: [
      { type: 'Routine', name: 'Social Rhythm Therapy (SRT)', desc: 'Maintain strict daily routines: wake/sleep times, meal times, exercise. Disrupted rhythms trigger mood episodes.', frequency: 'Daily', difficulty: 'Moderate' },
      { type: 'Monitoring', name: 'Mood Tracking', desc: 'Use an app (like Daylio) or chart to track mood, sleep, and energy daily. This helps identify early warning signs of episodes.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Therapy', name: 'Interpersonal Therapy (IPT)', desc: 'Focuses on improving interpersonal relationships and communication skills that are affected during mood episodes.', frequency: 'Weekly (with therapist)', difficulty: 'Moderate' },
      { type: 'Sleep', name: 'Strict Sleep Schedule', desc: 'Sleep deprivation can trigger mania. Maintain consistent 7-9 hour sleep schedule even on weekends. No all-nighters.', frequency: 'Daily', difficulty: 'Moderate' },
    ],
    emergency: 'Vandrevala Foundation: 1860-2662-345 | AASRA: 022-27546669'
  },
  'ADHD': {
    color: '#059669', icon: '💚',
    title: 'ADHD',
    therapies: [
      { type: 'Structure', name: 'Time Blocking & Pomodoro Technique', desc: 'Work in 25-minute focused sessions with 5-minute breaks. Use a visual timer. ADHD brains work well with defined time windows.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Organization', name: 'External Organization Systems', desc: 'Use whiteboards, sticky notes, phone reminders. Externalize your brain — don\'t rely on memory. Keep a consistent "home" for all important items.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Exercise', name: 'High-Intensity Exercise', desc: '20-30 minutes of vigorous exercise (running, jumping jacks) before tasks requiring focus. Exercise boosts dopamine and norepinephrine — same neurotransmitters targeted by ADHD medications.', frequency: 'Daily', difficulty: 'Moderate' },
      { type: 'Therapy', name: 'Behavioral Coaching', desc: 'Work with an ADHD coach to build personalized systems for work, relationships, and daily tasks.', frequency: 'Weekly', difficulty: 'Moderate' },
    ],
    emergency: null
  },
  'OCD': {
    color: '#7C3AED', icon: '🟣',
    title: 'OCD',
    therapies: [
      { type: 'Therapy', name: 'ERP (Exposure & Response Prevention)', desc: 'The gold standard for OCD. Deliberately expose yourself to triggers without performing compulsions. Requires a trained therapist for proper guidance.', frequency: 'Daily exercises + weekly therapy', difficulty: 'High' },
      { type: 'Mindfulness', name: 'Mindfulness-Based Stress Reduction', desc: 'Observe obsessive thoughts without judging or acting on them. Practice letting thoughts pass like clouds. 20 min daily meditation.', frequency: 'Daily', difficulty: 'Moderate' },
      { type: 'Journaling', name: 'Obsession Journal', desc: 'Write obsessive thoughts and rate anxiety (0-10). Over time, this reduces their power through habituation.', frequency: 'As needed', difficulty: 'Low' },
    ],
    emergency: null
  },
  'ASD': {
    color: '#0891B2', icon: '🔵',
    title: 'Autism Spectrum Disorder',
    therapies: [
      { type: 'Structure', name: 'Predictable Routines', desc: 'Create detailed visual schedules for daily activities. Use visual timers for transitions. Predictability reduces anxiety significantly.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Social', name: 'Social Skills Training', desc: 'Work with a therapist on social scripts, reading nonverbal cues, and conversation skills in structured settings before applying socially.', frequency: 'Weekly', difficulty: 'Moderate' },
      { type: 'Sensory', name: 'Sensory Regulation Tools', desc: 'Identify sensory triggers and create a sensory toolkit: noise-canceling headphones, fidget tools, weighted blankets, calm spaces.', frequency: 'As needed', difficulty: 'Low' },
    ],
    emergency: null
  },
  'Loneliness': {
    color: '#64748B', icon: '🤍',
    title: 'Loneliness & Social Isolation',
    therapies: [
      { type: 'Social', name: 'Structured Social Activities', desc: 'Join clubs, classes, or volunteer groups centered on interests (not just "meeting people"). Shared activities reduce the pressure of socializing.', frequency: 'Weekly', difficulty: 'Moderate' },
      { type: 'Digital', name: 'Online Communities', desc: 'Join Reddit communities, Discord servers, or forums around your interests. Online friendships can be real and meaningful.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Self-compassion', name: 'Self-Compassion Practice', desc: 'Treat yourself as you would a good friend. Daily self-compassion journaling reduces loneliness by improving the relationship with yourself.', frequency: 'Daily', difficulty: 'Low' },
    ],
    emergency: null
  },
  'Sleep Disorder': {
    color: '#4F46E5', icon: '🌙',
    title: 'Sleep Disorder',
    therapies: [
      { type: 'CBT', name: 'CBT for Insomnia (CBT-I)', desc: 'The most effective treatment for insomnia. Includes sleep restriction, stimulus control, and cognitive restructuring. More effective than sleeping pills long-term.', frequency: 'Daily (6-8 week program)', difficulty: 'Moderate' },
      { type: 'Hygiene', name: 'Sleep Hygiene Overhaul', desc: 'Fixed wake time, no screens 1hr before bed, cool (18-20°C) dark room, no caffeine after 2pm, no alcohol, no heavy meals within 3hrs of sleep.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Relaxation', name: 'Progressive Muscle Relaxation at Bedtime', desc: 'Tense and release each muscle group, then deep breathing as you lie in bed. Reduces physiological arousal that prevents sleep.', frequency: 'Nightly', difficulty: 'Low' },
    ],
    emergency: null
  },
  'Eating Disorder': {
    color: '#EC4899', icon: '🩷',
    title: 'Eating Disorder',
    therapies: [
      { type: 'Therapy', name: 'CBT for Eating Disorders', desc: 'Addresses distorted thoughts about food and body image. Includes meal planning, challenging food rules, and body image exposure. Requires a therapist.', frequency: 'Weekly', difficulty: 'High' },
      { type: 'Nutrition', name: 'Structured Meal Planning', desc: 'Work with a registered dietitian to create a balanced meal plan. Eating at regular intervals stabilizes hunger hormones and reduces binge-restrict cycles.', frequency: 'Daily', difficulty: 'Moderate' },
      { type: 'Mindful Eating', name: 'Mindful Eating Practice', desc: 'Eat without distractions, slowly, noticing flavors and hunger cues. Rebuilds healthy relationship with food and body signals.', frequency: 'Every meal', difficulty: 'Moderate' },
    ],
    emergency: 'ANAD Helpline: 1-888-375-7767 | iCall: 9152987821'
  },
  'PDD': {
    color: '#6B7280', icon: '🩶',
    title: 'Persistent Depressive Disorder (Dysthymia)',
    therapies: [
      { type: 'Therapy', name: 'Interpersonal & Social Rhythm Therapy', desc: 'Addresses the chronic, low-grade nature of PDD by improving relationships and daily rhythms that sustain mood.', frequency: 'Weekly', difficulty: 'Moderate' },
      { type: 'Activation', name: 'Pleasant Event Scheduling', desc: 'Schedule 3 small pleasurable activities daily. PDD often causes "nothing feels worth doing" — behavior activation re-engages reward systems.', frequency: 'Daily', difficulty: 'Low' },
      { type: 'Mindfulness', name: 'Loving-Kindness Meditation', desc: 'Direct positive wishes to yourself and others. Particularly helpful for chronic low self-esteem associated with PDD. 10-15 min daily.', frequency: 'Daily', difficulty: 'Low' },
    ],
    emergency: 'iCall: 9152987821'
  },
  'Psychotic Depression': {
    color: '#B91C1C', icon: '🔴',
    title: 'Psychotic Depression',
    therapies: [
      { type: 'Medical', name: 'Psychiatric Evaluation (URGENT)', desc: 'Psychotic depression requires immediate professional evaluation. It typically responds to a combination of antidepressants and antipsychotics. Do not delay seeking help.', frequency: 'Immediate', difficulty: 'N/A' },
      { type: 'Safety', name: 'Safety Planning with Support System', desc: 'Create a plan with trusted family/friends and your mental health team. Include warning signs, safe contacts, and crisis resources.', frequency: 'Ongoing', difficulty: 'Moderate' },
    ],
    emergency: 'NIMHANS: 080-46110007 | Vandrevala Foundation: 1860-2662-345 | AASRA: 022-27546669'
  },
};

const TYPE_COLORS = { CBT: '#EEF0FF', Exercise: '#E8F5E9', Mindfulness: '#F3E8FF', Social: '#FFF3E0', Sleep: '#E0F7FA', Therapy: '#FFEBEE', Grounding: '#E8F5E9', Safety: '#FFF8E1', Routine: '#FFF3E0', Monitoring: '#E0F7FA', Structure: '#EEF0FF', Organization: '#E8F5E9', Journaling: '#FEF3C7', Sensory: '#E0F7FA', Digital: '#EEF0FF', 'Self-compassion': '#FCE4EC', Hygiene: '#E0F7FA', Relaxation: '#F3E8FF', Nutrition: '#E8F5E9', 'Mindful Eating': '#E8F5E9', Activation: '#FFF3E0', Medical: '#FFEBEE', Breathing: '#E0F7FA' };

export default function CurePage() {
  const [selected, setSelected] = useState('MDD');
  const data = CURE_DATA[selected];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A2E' }}>💊 Therapy & Activities</h1>
        <p style={{ color: '#6B7280', marginTop: '4px' }}>Evidence-based activities and therapeutic approaches for each condition</p>
      </div>

      <div className="disclaimer-banner">
        <span>⚠️</span>
        <p style={{ fontSize: '0.82rem', color: '#BF360C' }}>These suggestions are informational only and do not replace professional treatment. Always consult a licensed mental health professional before starting any therapeutic program.</p>
      </div>

      {/* Disorder Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
        {Object.keys(CURE_DATA).map(d => (
          <button key={d} onClick={() => setSelected(d)}
            style={{ padding: '8px 18px', borderRadius: '50px', border: selected === d ? `2px solid ${CURE_DATA[d].color}` : '2px solid #E5E7EB', background: selected === d ? CURE_DATA[d].color : '#fff', color: selected === d ? '#fff' : '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s' }}>
            {CURE_DATA[d].icon} {d}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade" key={selected}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '2rem' }}>{data.icon}</span>
          <h2 style={{ fontWeight: 700, fontSize: '1.3rem', color: '#1A1A2E' }}>{data.title}</h2>
        </div>

        {data.emergency && (
          <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
            <p style={{ fontWeight: 700, color: '#C62828', fontSize: '0.88rem', marginBottom: '4px' }}>🆘 Crisis Resources</p>
            <p style={{ color: '#B71C1C', fontSize: '0.85rem' }}>{data.emergency}</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.therapies.map((t, i) => (
            <div key={i} className="card" style={{ padding: '24px', borderLeft: `4px solid ${data.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: TYPE_COLORS[t.type] || '#EEF0FF', padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>{t.type}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E' }}>{t.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', background: '#F3F4F6', padding: '3px 10px', borderRadius: '50px' }}>📅 {t.frequency}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', background: '#F3F4F6', padding: '3px 10px', borderRadius: '50px' }}>⚡ {t.difficulty}</span>
                </div>
              </div>
              <p style={{ color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.65 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
