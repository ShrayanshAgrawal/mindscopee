import React, { useState } from 'react';

const DIET_DATA = {
  'Depression (MDD/PDD)': {
    icon: '💜', color: '#7C3AED',
    summary: 'Depression is linked to low serotonin, dopamine, and inflammation. The gut-brain axis plays a key role — about 90% of serotonin is produced in the gut.',
    eat: [
      { food: 'Fatty Fish (Salmon, Mackerel)', reason: 'High in Omega-3 (EPA/DHA) which reduces neuroinflammation and supports serotonin production', emoji: '🐟' },
      { food: 'Fermented Foods (Curd, Idli, Dosa)', reason: 'Probiotics improve gut microbiome diversity, which directly affects mood via the gut-brain axis', emoji: '🍶' },
      { food: 'Dark Leafy Greens (Spinach, Methi)', reason: 'Rich in folate which supports serotonin and dopamine synthesis. Folate deficiency is common in depression', emoji: '🥬' },
      { food: 'Walnuts & Almonds', reason: 'Omega-3, magnesium, and tryptophan — all precursors to serotonin and mood stabilization', emoji: '🥜' },
      { food: 'Berries & Citrus Fruits', reason: 'Antioxidants reduce oxidative stress linked to depression. Vitamin C supports cortisol regulation', emoji: '🍊' },
      { food: 'Turmeric (with black pepper)', reason: 'Curcumin has proven antidepressant effects, crossing the blood-brain barrier to reduce inflammation', emoji: '🫚' },
      { food: 'Whole Grains (Brown Rice, Oats)', reason: 'Complex carbs promote steady serotonin levels and avoid blood sugar crashes that worsen mood', emoji: '🌾' },
    ],
    avoid: [
      { food: 'Refined Sugar & Processed Sweets', reason: 'Causes blood sugar spikes and crashes, worsening mood instability and energy fluctuations' },
      { food: 'Alcohol', reason: 'A depressant that disrupts serotonin, sleep architecture, and dehydrates the brain' },
      { food: 'Ultra-processed Junk Food', reason: 'Pro-inflammatory, nutrient-poor foods are significantly associated with increased depression risk' },
      { food: 'Excessive Caffeine', reason: 'Can worsen anxiety, disrupt sleep, and increase cortisol — all worsening depression' },
    ],
    supplements: 'Omega-3 (2g EPA/DHA daily) · Vitamin D3 (if deficient) · Magnesium Glycinate · Folate (B9) · Probiotics',
    meal_plan: [
      { time: 'Breakfast', meal: 'Overnight oats with walnuts, berries, and a teaspoon of flaxseeds + green tea' },
      { time: 'Lunch', meal: 'Brown rice with dal, sautéed spinach, curd, and a slice of lemon' },
      { time: 'Snack', meal: 'A handful of almonds + 1 banana (tryptophan boost)' },
      { time: 'Dinner', meal: 'Grilled salmon or tofu curry with turmeric, steamed broccoli, and whole wheat chapati' },
    ]
  },
  'Anxiety': {
    icon: '💙', color: '#2563EB',
    summary: 'Anxiety is driven by overactivation of the sympathetic nervous system. Certain nutrients calm the nervous system and balance stress hormones.',
    eat: [
      { food: 'Magnesium-rich Foods (Banana, Dark Chocolate, Pumpkin Seeds)', reason: 'Magnesium is called "nature\'s relaxant" — deficiency significantly increases anxiety', emoji: '🍫' },
      { food: 'Chamomile Tea', reason: 'Contains apigenin which binds to GABA receptors, producing a calming effect', emoji: '🍵' },
      { food: 'Ashwagandha (as supplement or in milk)', reason: 'Adaptogen proven to reduce cortisol by 30% in clinical trials', emoji: '🥛' },
      { food: 'Eggs', reason: 'Contain tryptophan and choline which support serotonin and brain health', emoji: '🥚' },
      { food: 'Green Tea (L-theanine)', reason: 'L-theanine promotes alpha brain wave activity associated with calm focus without drowsiness', emoji: '🍵' },
      { food: 'Blueberries', reason: 'Antioxidants and flavonoids protect against oxidative stress triggered by chronic anxiety', emoji: '🫐' },
    ],
    avoid: [
      { food: 'Caffeine (Coffee, Energy Drinks)', reason: 'Directly mimics anxiety symptoms — increases heart rate, cortisol, and adrenaline' },
      { food: 'Alcohol', reason: 'Temporarily reduces anxiety but causes rebound anxiety — net worsening effect' },
      { food: 'High-Sugar Foods', reason: 'Blood sugar crashes trigger the release of adrenaline which mimics panic attacks' },
      { food: 'Excessive Salt', reason: 'High sodium disrupts electrolyte balance and can elevate blood pressure, worsening anxiety' },
    ],
    supplements: 'Magnesium Glycinate (300-400mg) · L-theanine (200mg) · Ashwagandha (KSM-66) · Omega-3',
    meal_plan: [
      { time: 'Breakfast', meal: 'Scrambled eggs with spinach + chamomile tea + 1 banana' },
      { time: 'Lunch', meal: 'Chickpea curry with brown rice, cucumber raita, and lime' },
      { time: 'Snack', meal: 'Pumpkin seeds + blueberries + green tea' },
      { time: 'Dinner', meal: 'Lentil soup, steamed broccoli, whole grain chapati + turmeric milk before bed' },
    ]
  },
  'ADHD': {
    icon: '💚', color: '#059669',
    summary: 'ADHD is associated with dopamine and norepinephrine dysregulation. Nutrition can support focus, reduce impulsivity, and improve executive function.',
    eat: [
      { food: 'Protein at Every Meal', reason: 'Protein provides tyrosine — the amino acid precursor to dopamine. Prevents attention crashes', emoji: '🍳' },
      { food: 'Fatty Fish', reason: 'Omega-3 DHA is essential for frontal lobe function and dopamine receptor sensitivity', emoji: '🐟' },
      { food: 'Iron-rich Foods (Lentils, Spinach, Red Meat)', reason: 'Iron deficiency strongly correlated with ADHD severity. Iron is required for dopamine synthesis', emoji: '🫘' },
      { food: 'Zinc-rich Foods (Chickpeas, Pumpkin Seeds, Cashews)', reason: 'Zinc regulates dopamine and its deficiency worsens ADHD symptoms', emoji: '🥜' },
      { food: 'Complex Carbs (Oats, Sweet Potato)', reason: 'Sustained energy prevents the focus crashes that come with blood sugar swings', emoji: '🍠' },
    ],
    avoid: [
      { food: 'Artificial Food Dyes & Additives', reason: 'Research links tartrazine (yellow #5) and other dyes to increased hyperactivity in children and adults' },
      { food: 'Sugar Spikes (Candy, Soda)', reason: 'Rapid glucose spikes followed by crashes significantly worsen attention and impulsivity' },
      { food: 'Gluten (for sensitive individuals)', reason: 'Some ADHD individuals show improvement on gluten-free diets — worth trialing for 4-6 weeks' },
    ],
    supplements: 'Omega-3 (high DHA) · Iron (if deficient) · Zinc (25mg) · Magnesium · Vitamin D',
    meal_plan: [
      { time: 'Breakfast', meal: 'Eggs + whole grain toast + handful of cashews + water (no sugary juice)' },
      { time: 'Lunch', meal: 'Lentil dal with brown rice, spinach sabzi, and cucumber salad' },
      { time: 'Snack', meal: 'Apple with peanut butter or a handful of mixed nuts' },
      { time: 'Dinner', meal: 'Grilled chicken/paneer, sweet potato, steamed vegetables — high protein, low carb' },
    ]
  },
  'Sleep Disorders': {
    icon: '🌙', color: '#4F46E5',
    summary: 'Sleep is regulated by melatonin, serotonin, GABA, and cortisol. Diet significantly impacts sleep onset, duration, and quality.',
    eat: [
      { food: 'Tart Cherry Juice', reason: 'One of the highest natural sources of melatonin. 240ml 1-2 hours before bed improves sleep quality', emoji: '🍒' },
      { food: 'Kiwi Fruit', reason: 'Studies show eating 2 kiwis 1 hour before bed improves sleep onset by 35%', emoji: '🥝' },
      { food: 'Milk & Dairy', reason: 'Contains tryptophan and calcium. Warm milk before bed is scientifically supported for sleep', emoji: '🥛' },
      { food: 'Almonds & Walnuts', reason: 'Magnesium + melatonin combination supports deep sleep stages', emoji: '🥜' },
      { food: 'Chamomile / Ashwagandha Tea', reason: 'Apigenin in chamomile and adaptogens in ashwagandha reduce pre-sleep cortisol', emoji: '🍵' },
    ],
    avoid: [
      { food: 'Caffeine after 2pm', reason: 'Half-life of caffeine is 5-7 hours. A 4pm coffee can still be active at 9pm sleep time' },
      { food: 'Alcohol', reason: 'Disrupts REM sleep and causes fragmented sleep in the second half of the night' },
      { food: 'Heavy/Fatty Meals within 3hrs of bedtime', reason: 'Digestion raises core body temperature, which opposes the temperature drop needed for sleep' },
      { food: 'Spicy Foods at Night', reason: 'Can cause heartburn and raise body temperature, delaying sleep onset' },
    ],
    supplements: 'Melatonin (0.5-3mg) · Magnesium Glycinate · L-theanine · Glycine (3g)',
    meal_plan: [
      { time: 'Breakfast', meal: 'Oats with banana and milk + no caffeine (or green tea before noon only)' },
      { time: 'Lunch', meal: 'Light, balanced meal — dal, rice, and vegetables. Avoid heavy oily food' },
      { time: 'Snack (4pm)', meal: 'Kiwi or a handful of almonds + herbal tea (no caffeine)' },
      { time: 'Pre-sleep (1hr before bed)', meal: 'Warm turmeric milk + 2 kiwis OR tart cherry juice' },
    ]
  },
  'Eating Disorders': {
    icon: '🩷', color: '#EC4899',
    summary: 'Eating disorders require careful nutritional rehabilitation. Focus is on rebuilding a healthy relationship with food and correcting nutritional deficiencies.',
    eat: [
      { food: 'Regular Balanced Meals (3 meals + 2-3 snacks)', reason: 'Establishing consistent meal timing stabilizes hunger hormones (ghrelin, leptin) and reduces binge-restrict cycles', emoji: '🍽️' },
      { food: 'Zinc-rich Foods', reason: 'Zinc deficiency is extremely common in eating disorders and worsens taste perception, appetite, and mood', emoji: '🫘' },
      { food: 'Phosphorus & Calcium Foods', reason: 'Critical for bone density which is severely impacted in restrictive eating disorders', emoji: '🥛' },
      { food: 'Plant-based Proteins (Legumes, Tofu)', reason: 'Gentle on digestion while providing essential amino acids for tissue repair', emoji: '🫘' },
    ],
    avoid: [
      { food: 'Diet Culture Foods', reason: 'Foods marketed as "guilt-free," "zero-calorie," or "clean" reinforce disordered thinking patterns' },
      { food: 'Skipping Meals', reason: 'Creates starvation cycles that reinforce binge-purge behaviors' },
    ],
    supplements: 'Work with a dietitian · Multivitamin · Zinc · Calcium + Vitamin D · B-complex',
    meal_plan: [
      { time: 'Breakfast', meal: 'Balanced — include carb, protein, and fat. E.g., toast + egg + avocado + juice' },
      { time: 'Mid-morning snack', meal: 'Fruit + nuts or yogurt' },
      { time: 'Lunch', meal: 'Varied — rice/roti + protein + vegetables + curd' },
      { time: 'Dinner', meal: 'Similar structure to lunch. Avoid restricting food groups' },
    ]
  },
};

export default function DietPage() {
  const [selected, setSelected] = useState('Depression (MDD/PDD)');
  const data = DIET_DATA[selected];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A2E' }}>🥗 Diet & Nutrition Guide</h1>
        <p style={{ color: '#6B7280', marginTop: '4px' }}>Evidence-based nutritional recommendations for mental health conditions</p>
      </div>

      <div className="disclaimer-banner">
        <span>⚠️</span>
        <p style={{ fontSize: '0.82rem', color: '#BF360C' }}>Nutritional guidance is general and educational. Consult a registered dietitian before making significant dietary changes, especially if you have other health conditions or are on medication.</p>
      </div>

      {/* Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
        {Object.keys(DIET_DATA).map(d => (
          <button key={d} onClick={() => setSelected(d)}
            style={{ padding: '8px 18px', borderRadius: '50px', border: selected === d ? `2px solid ${DIET_DATA[d].color}` : '2px solid #E5E7EB', background: selected === d ? DIET_DATA[d].color : '#fff', color: selected === d ? '#fff' : '#374151', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
            {DIET_DATA[d].icon} {d}
          </button>
        ))}
      </div>

      <div className="animate-fade" key={selected}>
        {/* Summary */}
        <div style={{ background: data.color, borderRadius: '16px', padding: '24px', color: '#fff', marginBottom: '24px' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '8px' }}>{data.icon} {selected}</h2>
          <p style={{ opacity: 0.9, lineHeight: 1.6 }}>{data.summary}</p>
        </div>

        <div className="grid-2" style={{ marginBottom: '24px' }}>
          {/* Eat */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#2E7D32', marginBottom: '16px' }}>✅ Foods to Eat</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.eat.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1A1A2E', marginBottom: '2px' }}>{item.food}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6B7280', lineHeight: 1.5 }}>{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avoid */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#C62828', marginBottom: '16px' }}>❌ Foods to Avoid</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.avoid.map((item, i) => (
                <div key={i} style={{ padding: '12px', background: '#FFEBEE', borderRadius: '10px' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.88rem', color: '#C62828', marginBottom: '4px' }}>🚫 {item.food}</p>
                  <p style={{ fontSize: '0.78rem', color: '#B71C1C', lineHeight: 1.5 }}>{item.reason}</p>
                </div>
              ))}
            </div>

            {/* Supplements */}
            <div style={{ marginTop: '20px', padding: '14px', background: '#EEF0FF', borderRadius: '10px' }}>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#6C63FF', marginBottom: '6px' }}>💊 Key Supplements</p>
              <p style={{ fontSize: '0.8rem', color: '#5A52D5', lineHeight: 1.6 }}>{data.supplements}</p>
            </div>
          </div>
        </div>

        {/* Meal Plan */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E', marginBottom: '20px' }}>🍽️ Sample Daily Meal Plan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.meal_plan.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '14px', background: '#F9FAFB', borderRadius: '10px' }}>
                <span style={{ background: data.color, color: '#fff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>{m.time}</span>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.6 }}>{m.meal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
