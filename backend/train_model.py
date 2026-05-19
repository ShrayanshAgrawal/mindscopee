import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.multiclass import OneVsRestClassifier
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from imblearn.over_sampling import SMOTE
import pickle
import json
import os

def train():
    df = pd.read_excel('Mental_disorder_symptoms.xlsx')
    df.rename(columns={'ag+1:629e': 'age'}, inplace=True)
    df['Disorder'] = df['Disorder'].str.strip().str.lower()

    disorder_map = {
        'mdd': 'MDD',
        'asd': 'ASD',
        'loneliness': 'Loneliness',
        'bipolar': 'Bipolar',
        'anexiety': 'Anxiety',
        'ptsd': 'PTSD',
        'sleeping disorder': 'Sleep Disorder',
        'psychotic deprission': 'Psychotic Depression',
        'eating disorder': 'Eating Disorder',
        'adhd': 'ADHD',
        'pdd': 'PDD',
        'ocd': 'OCD'
    }
    df['Disorder'] = df['Disorder'].map(disorder_map)
    df.dropna(subset=['Disorder'], inplace=True)

    features = [
        'feeling.nervous', 'panic', 'breathing.rapidly', 'sweating',
        'trouble.in.concentration', 'having.trouble.in.sleeping',
        'having.trouble.with.work', 'hopelessness', 'anger', 'over.react',
        'change.in.eating', 'suicidal.thought', 'feeling.tired',
        'close.friend', 'social.media.addiction', 'weight.gain', 'introvert',
        'popping.up.stressful.memory', 'having.nightmares',
        'avoids.people.or.activities', 'feeling.negative',
        'trouble.concentrating', 'blamming.yourself', 'hallucinations',
        'repetitive.behaviour', 'seasonally', 'increased.energy'
    ]

    X = df[features].values
    y = df['Disorder'].values

    # Balance using SMOTE
    from collections import Counter
    print("Before SMOTE:", Counter(y))

    # Encode labels for SMOTE
    from sklearn.preprocessing import LabelEncoder
    le = LabelEncoder()
    y_enc = le.fit_transform(y)

    sm = SMOTE(random_state=42, k_neighbors=3)
    X_res, y_res = sm.fit_resample(X, y_enc)
    y_res_labels = le.inverse_transform(y_res)
    print("After SMOTE:", Counter(y_res_labels))

    X_train, X_test, y_train, y_test = train_test_split(
        X_res, y_res_labels, test_size=0.2, random_state=42, stratify=y_res_labels
    )

    clf = RandomForestClassifier(
        n_estimators=200, max_depth=None,
        random_state=42, class_weight='balanced'
    )
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    disorders = list(clf.classes_)
    print("Disorders:", disorders)

    os.makedirs('models', exist_ok=True)
    with open('models/model.pkl', 'wb') as f:
        pickle.dump(clf, f)

    meta = {
        'features': features,
        'disorders': disorders
    }
    with open('models/meta.json', 'w') as f:
        json.dump(meta, f)

    print("Model saved to models/model.pkl")

if __name__ == '__main__':
    train()
