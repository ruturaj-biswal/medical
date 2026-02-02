// src/Mycomponents/DietFitnessPlans.js
import React, { useEffect, useState, useRef } from "react";

/*
DietFitnessPlans.js
Features:
- Simple diet plan generator (rules-based estimate)
- Steps tracker with daily goal & weekly history (localStorage)
- Hydration reminders (Notification API + sound + on-screen toast)
- All styles included below (glass UI)
Notes:
- Notifications require HTTPS / localhost to work.
- This is a client-side demo; replace AI logic with server model if needed.
*/

const LS_PROFILE = "dfp_profile_v1";
const LS_STEPS = "dfp_steps_v1";
const LS_HYDRATION = "dfp_hydration_v1";

export default function DietFitnessPlans() {
  // Profile for diet generator
  const [profile, setProfile] = useState({
    name: "",
    age: 25,
    sex: "male",
    weight: 70, // kg
    height: 170, // cm
    activity: "moderate", // sedentary, light, moderate, active
    goal: "maintain", // lose, maintain, gain
  });
  const [dietPlan, setDietPlan] = useState(null);

  // Steps tracker
  const [stepsState, setStepsState] = useState({
    date: todayKey(),
    count: 0,
    goal: 8000,
    weekly: {}, // { "2025-12-01": 3500, ... }
  });

  // Hydration
  const [hydration, setHydration] = useState({
    glassSize: 250, // ml
    goalMl: 2000,
    consumedToday: 0,
    reminderMinutes: 60,
    running: false,
    lastToast: "",
  });

  const reminderTimerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // load from localStorage
    const p = localStorage.getItem(LS_PROFILE);
    if (p) setProfile(JSON.parse(p));

    const s = localStorage.getItem(LS_STEPS);
    if (s) setStepsState(JSON.parse(s));
    else {
      // initialize today key
      const init = { date: todayKey(), count: 0, goal: 8000, weekly: {} };
      setStepsState(init);
      localStorage.setItem(LS_STEPS, JSON.stringify(init));
    }

    const h = localStorage.getItem(LS_HYDRATION);
    if (h) setHydration(JSON.parse(h));
    else {
      const initH = { glassSize: 250, goalMl: 2000, consumedToday: 0, reminderMinutes: 60, running: false, lastToast: "" };
      setHydration(initH);
      localStorage.setItem(LS_HYDRATION, JSON.stringify(initH));
    }

    // check notification permission
    if ("Notification" in window && Notification.permission === "default") {
      // ask on first visit quietly
      Notification.requestPermission().catch(() => {});
    }
    // cleanup on unmount
    return () => stopReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist profile changes
  useEffect(() => {
    localStorage.setItem(LS_PROFILE, JSON.stringify(profile));
  }, [profile]);

  // Persist steps
  useEffect(() => {
    localStorage.setItem(LS_STEPS, JSON.stringify(stepsState));
  }, [stepsState]);

  // Persist hydration
  useEffect(() => {
    localStorage.setItem(LS_HYDRATION, JSON.stringify(hydration));
  }, [hydration]);

  // Helper: today's date key YYYY-MM-DD
  function todayKey(d = new Date()) {
    return d.toISOString().slice(0, 10);
  }

  // --------- Diet plan logic (simple estimator) ----------
  function estimateCalories({ sex, age, weight, height, activity, goal }) {
    // Mifflin-St Jeor
    let bmr;
    if (sex === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityFactor = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }[activity] || 1.55;
    let calories = Math.round(bmr * activityFactor);
    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 400;
    return Math.max(1200, calories);
  }

  function generateDiet() {
    const cals = estimateCalories(profile);
    // simple macro split
    const protein = Math.round((profile.weight * 1.6)); // grams
    const fats = Math.round((cals * 0.25) / 9);
    const carbs = Math.round((cals - (protein * 4 + fats * 9)) / 4);

    // Simple day meal plan (not professional medical advice)
    const plan = {
      calories: cals,
      macros: { protein: `${protein}g`, fats: `${fats}g`, carbs: `${carbs}g` },
      meals: [
        {
          name: "Breakfast",
          items: ["Oats or Poha/Upma (1 bowl)", "1 boiled egg / paneer", "Fruit (banana/apple)"],
          cals: Math.round(cals * 0.25),
        },
        {
          name: "Mid-morning",
          items: ["Nuts (10-12)", "Green tea or buttermilk"],
          cals: Math.round(cals * 0.1),
        },
        {
          name: "Lunch",
          items: ["Rice/Chapati (2)", "Dal/Paneer/Chicken", "Large salad", "Curd"],
          cals: Math.round(cals * 0.3),
        },
        {
          name: "Evening",
          items: ["Sprouts or roasted chana", "Green tea"],
          cals: Math.round(cals * 0.08),
        },
        {
          name: "Dinner",
          items: ["Light Chapati + Veg sabzi or Soup", "Salad"],
          cals: Math.round(cals * 0.22),
        },
      ],
      note:
        "This is a suggested plan. For medical conditions (diabetes, hypertension, pregnancy) consult a registered dietitian.",
    };

    setDietPlan(plan);
  }

  // --------- Steps tracker functions ----------
  function addSteps(n) {
    const today = todayKey();
    let { date, count, goal, weekly } = stepsState;
    if (date !== today) {
      // rotate previous day into weekly
      weekly = { ...weekly };
      weekly[date] = count;
      // keep only last 14 days
      const keys = Object.keys(weekly).slice(-14);
      weekly = keys.reduce((acc, k) => ({ ...acc, [k]: weekly[k] }), {});
      date = today;
      count = 0;
    }
    count = count + n;
    setStepsState({ date, count, goal, weekly });
  }

  function setStepsGoal(g) {
    setStepsState((s) => ({ ...s, goal: Number(g) }));
  }

  function resetStepsToday() {
    setStepsState((s) => ({ ...s, count: 0 }));
  }

  // --------- Hydration functions ----------
  function startReminders() {
    // request permission
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    setHydration((h) => ({ ...h, running: true }));
    scheduleReminder(hydration.reminderMinutes);
  }

  function stopReminders() {
    setHydration((h) => ({ ...h, running: false }));
    if (reminderTimerRef.current) {
      clearInterval(reminderTimerRef.current);
      reminderTimerRef.current = null;
    }
  }

  function scheduleReminder(mins) {
    if (reminderTimerRef.current) clearInterval(reminderTimerRef.current);
    reminderTimerRef.current = setInterval(() => {
      notifyHydration();
    }, Math.max(1, mins) * 60 * 1000);
  }

  function notifyHydration() {
    // play sound if present
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Time to drink water 💧", {
        body: `Drink ${hydration.glassSize} ml. Tap to open app.`,
      });
    } else {
      // fallback toast
      setHydration((h) => ({ ...h, lastToast: new Date().toLocaleTimeString() }));
      alert(`Time to drink water — ${hydration.glassSize} ml`);
    }
  }

  function logGlass() {
    const today = todayKey();
    // reset daily if needed
    let h = { ...hydration };
    if (localStorage.getItem(LS_HYDRATION)) {
      const raw = JSON.parse(localStorage.getItem(LS_HYDRATION));
      if (raw.lastDate && raw.lastDate !== today) {
        // reset consumed
        h.consumedToday = 0;
      }
    }
    h.consumedToday = (h.consumedToday || 0) + Number(h.glassSize || 250);
    h.lastDate = today;
    setHydration(h);
  }

  function setHydrationSetting(key, val) {
    setHydration((h) => ({ ...h, [key]: val }));
    if (key === "reminderMinutes") {
      const mins = Number(val) || 60;
      if (hydration.running) scheduleReminder(mins);
    }
  }

  // optional helpful function: reset weekly steps
  function clearWeeklySteps() {
    setStepsState((s) => ({ ...s, weekly: {} }));
  }

  // small helper to format ml progress
  function hydrationPercent() {
    return Math.min(100, Math.round((hydration.consumedToday / hydration.goalMl) * 100));
  }

  // UI rendering
  return (
    <>
      <style>{`
        .dfp-page {
          min-height: 100vh;
          padding: 36px 18px;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f6fbff 0%, #e8f6ff 100%);
          color: #0b3550;
        }

        .dfp-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .glass-card {
          background: rgba(255,255,255,0.65);
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 8px 30px rgba(15, 64, 110, 0.08);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 18px;
        }

        .section-title {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          margin-bottom:12px;
        }

        h1.dfp-title { font-size: 1.9rem; margin:0; color:#00335a; }
        p.lead { margin:6px 0 12px; color:#1a5a85; }

        label { display:block; font-size:0.9rem; color:#0b3550; margin-bottom:6px; }
        input[type="number"], input[type="text"], select {
          width:100%;
          padding:10px 12px;
          border-radius:10px;
          border:1px solid rgba(10,60,100,0.08);
          margin-bottom:10px;
          background:white;
        }

        .btn {
          padding:10px 14px;
          border-radius:10px;
          border:none;
          cursor:pointer;
          font-weight:700;
        }

        .btn-primary { background: linear-gradient(90deg,#007bff,#00a6ff); color:white; }
        .btn-ghost { background:transparent; border:1px solid rgba(10,60,100,0.08); color:#00335a; }

        .diet-summary { display:flex; gap:14px; flex-wrap:wrap; align-items:center; }
        .macros { background: rgba(0,120,200,0.06); padding:8px 10px; border-radius:8px; font-weight:700; }

        .meals { margin-top:12px; display:grid; gap:10px; }
        .meal { background:white; padding:12px; border-radius:10px; box-shadow: 0 6px 18px rgba(0,80,160,0.04); }
        .meal h4 { margin:0 0 6px; color:#00335a; }

        /* Steps */
        .steps-box { text-align:center; }
        .steps-count { font-size:2.4rem; font-weight:800; color:#0066cc; }
        .steps-goal { margin-top:6px; color:#2b5f88; }

        .steps-controls { display:flex; gap:8px; margin-top:12px; justify-content:center; }
        .steps-controls button { min-width:110px; }

        .weekly-list { margin-top:12px; display:flex; gap:8px; overflow:auto; }
        .day { background:white; padding:8px 10px; border-radius:8px; min-width:90px; text-align:center; box-shadow:0 6px 16px rgba(0,0,0,0.03); }

        /* Hydration */
        .hydration-progress { display:flex; align-items:center; gap:12px; }
        .hydration-circle {
          width:86px; height:86px; border-radius:50%; background:linear-gradient(135deg,#e6fbff,#d9f6ff);
          display:flex; align-items:center; justify-content:center; font-weight:800; color:#0077b3;
          box-shadow: inset 0 -8px 20px rgba(0,123,255,0.05);
        }
        .hydro-actions { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }

        .toast {
          margin-top:8px; padding:8px 10px; background:#fff9e6; border-radius:8px; color:#8a6d00;
        }

        @media (max-width: 980px) {
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dfp-page">
        <div className="dfp-container">
          <div className="glass-card">
            <div className="section-title">
              <h1 className="dfp-title">Diet & Fitness Plans</h1>
              <div>
                <small style={{ color: "#0b3550", fontWeight: 700 }}>Your personal health toolkit</small>
              </div>
            </div>
            <p className="lead">Generate quick diet suggestions, track daily steps, and keep hydrated — all in one place.</p>

            <div className="grid-2">
              {/* Left: Diet generator */}
              <div>
                <div style={{ marginBottom: 12 }}>
                  <h3 style={{ margin: 0, color: "#00335a" }}>Profile</h3>
                  <p style={{ margin: "6px 0 12px", color: "#2b5f88" }}>Fill basic info — it's used to estimate calories.</p>

                  <label>Name</label>
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label>Age</label>
                      <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })} />
                    </div>
                    <div>
                      <label>Sex</label>
                      <select value={profile.sex} onChange={(e) => setProfile({ ...profile, sex: e.target.value })}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label>Weight (kg)</label>
                      <input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })} />
                    </div>
                    <div>
                      <label>Height (cm)</label>
                      <input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label>Activity</label>
                      <select value={profile.activity} onChange={(e) => setProfile({ ...profile, activity: e.target.value })}>
                        <option value="sedentary">Sedentary</option>
                        <option value="light">Light</option>
                        <option value="moderate">Moderate</option>
                        <option value="active">Active</option>
                      </select>
                    </div>
                    <div>
                      <label>Goal</label>
                      <select value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })}>
                        <option value="maintain">Maintain</option>
                        <option value="lose">Lose weight</option>
                        <option value="gain">Gain muscle</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button className="btn btn-primary" onClick={generateDiet}>Generate Plan</button>
                    <button className="btn btn-ghost" onClick={() => { setDietPlan(null); }}>Clear</button>
                  </div>
                </div>

                {/* Diet result */}
                {dietPlan && (
                  <div className="diet-result glass-card" style={{ marginTop: 8 }}>
                    <div className="diet-summary">
                      <div>
                        <h4 style={{ margin: 0 }}>{profile.name || "Your Plan"}</h4>
                        <div style={{ fontSize: 14, color: "#2b5f88" }}>{dietPlan.note}</div>
                      </div>
                      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                        <div className="macros">Calories: {dietPlan.calories}</div>
                        <div className="macros">P: {dietPlan.macros.protein}</div>
                        <div className="macros">F: {dietPlan.macros.fats}</div>
                        <div className="macros">C: {dietPlan.macros.carbs}</div>
                      </div>
                    </div>

                    <div className="meals">
                      {dietPlan.meals.map((m, i) => (
                        <div className="meal" key={i}>
                          <h4>{m.name} — {m.cals} kcal</h4>
                          <div>{m.items.join(" • ")}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Steps & Hydration */}
              <div>
                {/* Steps */}
                <div className="glass-card steps-box">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ margin: 0 }}>Steps</h3>
                      <div className="steps-goal">Daily goal: {stepsState.goal} steps</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#2b5f88" }}>{stepsState.date}</div>
                      <div style={{ fontSize: 12 }}>{Object.keys(stepsState.weekly || {}).length} days logged</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div className="steps-count">{stepsState.count}</div>
                    <div style={{ marginTop: 6 }}>
                      <input type="number" placeholder="Set daily goal" value={stepsState.goal}
                        onChange={(e) => setStepsGoal(Number(e.target.value))} />
                    </div>

                    <div className="steps-controls">
                      <button className="btn btn-primary" onClick={() => addSteps(500)}>+500 steps</button>
                      <button className="btn btn-ghost" onClick={() => addSteps(1000)}>+1000</button>
                      <button className="btn btn-ghost" onClick={resetStepsToday}>Reset Today</button>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <strong>Weekly</strong>
                      <div className="weekly-list">
                        {Object.entries(stepsState.weekly).length === 0 && <div style={{ color: "#2b5f88" }}>No weekly data</div>}
                        {Object.entries(stepsState.weekly).slice(-7).map(([d, v]) => (
                          <div className="day" key={d}>
                            <div style={{ fontWeight: 700 }}>{d.slice(5)}</div>
                            <div style={{ color: "#2b5f88", marginTop: 6 }}>{v} steps</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <button className="btn btn-ghost" onClick={clearWeeklySteps}>Clear history</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hydration */}
                <div className="glass-card" style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0 }}>Hydration</h3>
                    <div style={{ fontSize: 12, color: "#2b5f88" }}>{hydration.consumedToday || 0} / {hydration.goalMl} ml</div>
                  </div>

                  <div style={{ marginTop: 12 }} className="hydration-progress">
                    <div className="hydration-circle">{hydrationPercent()}%</div>
                    <div style={{ flex: 1 }}>
                      <label>Glass size (ml)</label>
                      <input type="number" value={hydration.glassSize} onChange={(e) => setHydrationSetting("glassSize", Number(e.target.value))} />

                      <label>Daily goal (ml)</label>
                      <input type="number" value={hydration.goalMl} onChange={(e) => setHydrationSetting("goalMl", Number(e.target.value))} />

                      <label>Remind every (minutes)</label>
                      <input type="number" value={hydration.reminderMinutes} onChange={(e) => setHydrationSetting("reminderMinutes", Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="hydro-actions">
                    <button className="btn btn-primary" onClick={logGlass}>I drank a glass</button>
                    {!hydration.running ? (
                      <button className="btn btn-ghost" onClick={startReminders}>Start reminders</button>
                    ) : (
                      <button className="btn btn-ghost" onClick={stopReminders}>Stop reminders</button>
                    )}
                    <button className="btn btn-ghost" onClick={() => setHydration((h) => ({ ...h, consumedToday: 0 }))}>Reset Today</button>
                  </div>

                  {hydration.lastToast && <div className="toast">Last reminder: {hydration.lastToast}</div>}

                  {/* hidden audio element for sound */}
                  <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" preload="auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Small tips card */}
          <div className="glass-card">
            <h3 style={{ marginTop: 0 }}>Tips & Tools</h3>
            <ul style={{ color: "#2b5f88", lineHeight: 1.6 }}>
              <li>For personalised medical advice, consult a healthcare professional.</li>
              <li>Combine steps with strength training for best results.</li>
              <li>Hydration helps energy & focus — sip regularly.</li>
              <li>Use this as a lightweight local tracker; consider server sync for backups.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
