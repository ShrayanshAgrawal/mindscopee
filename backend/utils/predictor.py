import pickle
import json
import numpy as np
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_model():
    model_path = os.path.join(BASE, 'models', 'model.pkl')
    meta_path = os.path.join(BASE, 'models', 'meta.json')
    with open(model_path, 'rb') as f:
        clf = pickle.load(f)
    with open(meta_path, 'r') as f:
        meta = json.load(f)
    return clf, meta

_clf, _meta = None, None

def get_model():
    global _clf, _meta
    if _clf is None:
        _clf, _meta = load_model()
    return _clf, _meta

RISK_LEVELS = {
    (0, 20): ('Low', '#4CAF50'),
    (20, 45): ('Moderate', '#FF9800'),
    (45, 101): ('High', '#F44336'),
}

DISORDER_DESCRIPTIONS = {
    'MDD': 'Major Depressive Disorder - characterized by persistent sadness, loss of interest, and emotional emptiness.',
    'ASD': 'Autism Spectrum Disorder - affects social communication and may involve repetitive behaviors.',
    'Loneliness': 'Chronic loneliness affecting mental and physical health through social isolation.',
    'Bipolar': 'Bipolar Disorder - episodes of mania and depression alternating in mood.',
    'Anxiety': 'Anxiety Disorder - excessive worry, nervousness, and fear affecting daily functioning.',
    'PTSD': 'Post-Traumatic Stress Disorder - triggered by traumatic events causing flashbacks and hypervigilance.',
    'Sleep Disorder': 'Sleep Disorder - difficulty falling/staying asleep affecting overall health.',
    'Psychotic Depression': 'Severe depression combined with psychotic symptoms like hallucinations.',
    'Eating Disorder': 'Eating Disorder - unhealthy relationship with food and body image.',
    'ADHD': 'Attention Deficit Hyperactivity Disorder - difficulty focusing, hyperactivity, and impulsiveness.',
    'PDD': 'Persistent Depressive Disorder - chronic low-grade depression lasting years.',
    'OCD': 'Obsessive-Compulsive Disorder - unwanted repetitive thoughts and behaviors.',
}

# Mapping questionnaire keys to model features
QUESTION_FEATURE_MAP = {
    'q_nervous': 'feeling.nervous',
    'q_panic': 'panic',
    'q_breathing': 'breathing.rapidly',
    'q_sweating': 'sweating',
    'q_concentration': 'trouble.in.concentration',
    'q_sleep': 'having.trouble.in.sleeping',
    'q_work': 'having.trouble.with.work',
    'q_hopeless': 'hopelessness',
    'q_anger': 'anger',
    'q_overreact': 'over.react',
    'q_eating': 'change.in.eating',
    'q_suicidal': 'suicidal.thought',
    'q_tired': 'feeling.tired',
    'q_social': 'close.friend',
    'q_social_media': 'social.media.addiction',
    'q_weight': 'weight.gain',
    'q_introvert': 'introvert',
    'q_memory': 'popping.up.stressful.memory',
    'q_nightmares': 'having.nightmares',
    'q_avoids': 'avoids.people.or.activities',
    'q_negative': 'feeling.negative',
    'q_concentrate': 'trouble.concentrating',
    'q_blame': 'blamming.yourself',
    'q_hallucinations': 'hallucinations',
    'q_repetitive': 'repetitive.behaviour',
    'q_seasonal': 'seasonally',
    'q_energy': 'increased.energy',
}

def predict_disorders(answers: dict) -> dict:
    clf, meta = get_model()
    features = meta['features']
    disorders = meta['disorders']

    # Build feature vector
    feature_vec = []
    for feat in features:
        # find questionnaire key that maps to this feature
        val = 0
        for qkey, fname in QUESTION_FEATURE_MAP.items():
            if fname == feat:
                raw = answers.get(qkey, 0)
                # normalize to 0/1 if score-based (0-4 scale → 0/1 threshold at 2)
                val = 1 if int(raw) >= 2 else 0
                break
        feature_vec.append(val)

    X = np.array([feature_vec])

    # Get probabilities for each class
    proba = clf.predict_proba(X)[0]
    classes = clf.classes_

    # Build result with percentages
    disorder_scores = {}
    for cls, prob in zip(classes, proba):
        disorder_scores[cls] = round(prob * 100, 1)

    # Sort by score descending
    sorted_disorders = sorted(disorder_scores.items(), key=lambda x: x[1], reverse=True)

    results = []
    for disorder, pct in sorted_disorders:
        risk = 'Low'
        risk_color = '#4CAF50'
        for (lo, hi), (level, color) in RISK_LEVELS.items():
            if lo <= pct < hi:
                risk = level
                risk_color = color
                break

        results.append({
            'disorder': disorder,
            'percentage': pct,
            'risk': risk,
            'risk_color': risk_color,
            'description': DISORDER_DESCRIPTIONS.get(disorder, ''),
        })

    top = results[0] if results else None

    return {
        'predictions': results,
        'top_disorder': top['disorder'] if top else None,
        'summary': f"Based on your responses, the primary concern is {top['disorder']} ({top['percentage']}% likelihood)." if top else ''
    }
