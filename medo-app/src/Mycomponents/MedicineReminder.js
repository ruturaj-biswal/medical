import React, { useState, useEffect } from "react";

/* ---------------------------------------------
   🔔 SOUND FILE FOR ALERTS
--------------------------------------------- */
const beepSound =
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg";

export default function MedicineReminder() {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [reminders, setReminders] = useState(() => {
    return JSON.parse(localStorage.getItem("reminders")) || [];
  });

  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  /* ---------------------------------------------
     🔄 SAVE TO LOCAL STORAGE
  --------------------------------------------- */
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  /* ---------------------------------------------
     🔔 CHECK REMINDER EVERY 30 SECONDS
  --------------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      reminders.forEach((rem) => {
        if (rem.time === currentTime) {
          if (notificationsAllowed)
            new Notification(`⏰ ${rem.name} Reminder`, {
              body: "It's time to take your medicine!",
            });

          if (soundEnabled) new Audio(beepSound).play();
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [reminders, notificationsAllowed, soundEnabled]);

  /* ---------------------------------------------
     ➕ ADD REMINDER
  --------------------------------------------- */
  const addReminder = () => {
    if (!medicine || !time) return alert("Enter medicine name & time!");

    setReminders([
      ...reminders,
      {
        id: Date.now(),
        name: medicine,
        time,
        history: [],
        created: new Date().toLocaleDateString(),
      },
    ]);

    setMedicine("");
    setTime("");
  };

  /* ---------------------------------------------
     📝 EDIT REMINDER
  --------------------------------------------- */
  const editReminder = (id) => {
    const newName = prompt("Edit medicine name:");
    if (!newName) return;

    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, name: newName } : r
      )
    );
  };

  /* ---------------------------------------------
     ❌ DELETE REMINDER
  --------------------------------------------- */
  const deleteReminder = (id) =>
    setReminders(reminders.filter((r) => r.id !== id));

  /* ---------------------------------------------
     ✔ TAKEN / ❌ MISSED
  --------------------------------------------- */
  const markStatus = (id, status) => {
    setReminders(
      reminders.map((r) =>
        r.id === id
          ? {
              ...r,
              history: [
                ...r.history,
                { date: new Date().toLocaleDateString(), status },
              ],
            }
          : r
      )
    );
  };

  /* ---------------------------------------------
     📊 DAILY PROGRESS
  --------------------------------------------- */
  const totalTaken = reminders.reduce(
    (sum, r) => sum + r.history.filter((h) => h.status === "Taken").length,
    0
  );

  const totalMissed = reminders.reduce(
    (sum, r) => sum + r.history.filter((h) => h.status === "Missed").length,
    0
  );

  /* ---------------------------------------------
     🔔 ASK FOR NOTIFICATION PERMISSION
  --------------------------------------------- */
  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("Browser does not support notifications");
      return;
    }
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        setNotificationsAllowed(true);
        alert("Notifications Enabled!");
      }
    });
  };

  /* ---------------------------------------------
     📄 EXPORT DATA AS JSON
  --------------------------------------------- */
  const exportData = () => {
    const file = new Blob([JSON.stringify(reminders, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medicine-reminders.json";
    a.click();
  };

  /* ---------------------------------------------
     🧾 COPY RAW JSON
  --------------------------------------------- */
  const copyRawData = () => {
    navigator.clipboard.writeText(JSON.stringify(reminders, null, 2));
    alert("Copied to clipboard!");
  };

  return (
    <>
      {/* ----------------------------------------
          INTERNAL CSS (FULL PAGE LAYOUT FIXED)
      ----------------------------------------- */}
      <style>{`
        .wrapper {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 20px;
          padding: 20px;
          background: linear-gradient(to bottom right,#e8f9ff,#d8f2ff,#c7ecff);
          min-height: 100vh;
          font-family: Poppins;
        }

        .left-panel, .right-panel {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #0077b6;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .input-row {
          display: flex;
          gap: 10px;
          margin: 15px 0;
        }

        .input-row input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 2px solid #66b2ff;
        }

        button {
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: #0077ff;
          padding: 10px 16px;
          color: white;
          border-radius: 8px;
          font-weight: 600;
        }

        .btn-taken {
          background: #20bf55;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .btn-missed {
          background: #ff4d4d;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .btn-edit {
          background: #4b7bec;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .btn-delete {
          background: black;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .reminder-box {
          margin-top: 10px;
          border: 1px solid #cce6ff;
          padding: 15px;
          border-radius: 10px;
          background: #f8fcff;
        }

        .history-item {
          font-size: 14px;
          margin-left: 10px;
        }
      `}</style>

      {/* ----------------------------------------
          PAGE UI
      ----------------------------------------- */}

      <div className="wrapper">
        {/* LEFT SIDE */}
        <div className="left-panel">
          <h2 className="title">💊 Medicine Reminder & Pill Tracker</h2>

          {/* INPUTS */}
          <div className="input-row">
            <input
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Medicine Name"
            />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button className="btn-primary" onClick={addReminder}>
              Add
            </button>
          </div>

          {/* NOTIFICATION & SOUND */}
          <div>
            <button onClick={requestNotificationPermission} className="btn-primary">
              Grant Notifications
            </button>
            <label style={{ marginLeft: "15px" }}>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
              />{" "}
              Enable Sound 🔔
            </label>
          </div>

          {/* REMINDERS LIST */}
          <h3 style={{ marginTop: "20px" }}>📌 Your Reminders</h3>

          {reminders.map((rem) => (
            <div className="reminder-box" key={rem.id}>
              <h3>{rem.name}</h3>

              <p>⏰ Time: {rem.time}</p>

              <button className="btn-taken" onClick={() => markStatus(rem.id, "Taken")}>
                ✔ Taken
              </button>
              <button className="btn-missed" onClick={() => markStatus(rem.id, "Missed")}>
                ❌ Missed
              </button>

              <button className="btn-edit" onClick={() => editReminder(rem.id)}>
                Edit
              </button>

              <button className="btn-delete" onClick={() => deleteReminder(rem.id)}>
                Delete
              </button>

              {/* HISTORY */}
              <div style={{ marginTop: "10px" }}>
                <strong>History:</strong>
                {rem.history.length === 0 && <p>No activity yet</p>}

                {rem.history.map((h, i) => (
                  <p className="history-item" key={i}>
                    {h.date} — {h.status}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <h2>📊 Daily Progress</h2>
          <p>✔ Taken: {totalTaken}</p>
          <p>❌ Missed: {totalMissed}</p>

          <h3>🛠 Extra Tools</h3>

          <button className="btn-primary" onClick={exportData}>
            Export Data
          </button>

          <button
            className="btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={copyRawData}
          >
            Copy Raw Data
          </button>

          <h3 style={{ marginTop: "20px" }}>ℹ How it works</h3>
          <p>
            Add your medicine and reminder time. When you take it, mark ✔ Taken or ❌
            Missed. Notifications alert you when it’s time.
          </p>
        </div>
      </div>
    </>
  );
}
