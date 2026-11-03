import { useState, useRef, useCallback, useEffect } from "react";
import "./Alarm.css";

const Alarm = () => {
  // ብዙ Alarms በ Array ለመያዝ
  const [alarms, setAlarms] = useState([]);
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmLabel, setAlarmLabel] = useState("");

  // useRef: የ ሰዓት Input field-ን በቀጥታ focus ለማድረግ
  const inputRef = useRef(null);

  // useCallback: አዲስ Alarm ወደ ዝርዝሩ (Array) ለመጨመር
  const handleAddAlarm = useCallback(
    (e) => {
      e.preventDefault();
      if (!alarmTime) {
        inputRef.current.focus();
        return;
      }

      const newAlarm = {
        id: Date.now(),
        time: alarmTime,
        label: alarmLabel.trim() || "Alarm",
        isActive: true,
        isRinging: false,
        lastTriggered: null,
      };

      setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
      setAlarmTime("");
      setAlarmLabel("");
      inputRef.current.focus();
    },
    [alarmTime, alarmLabel]
  );

  // useCallback: የተመረጠውን Alarm ለማብራት / ለማጥፋት (ON / OFF)
  const handleToggleAlarm = useCallback((id) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) =>
        alarm.id === id
          ? {
              ...alarm,
              isActive: !alarm.isActive,
              isRinging: false,
              lastTriggered: null,
            }
          : alarm
      )
    );
  }, []);

  // useCallback: እየጮኸ ያለን Alarm ድምፅ ለማስቆም
  const handleStopRinging = useCallback((id) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) =>
        alarm.id === id ? { ...alarm, isRinging: false } : alarm
      )
    );
  }, []);

  // useCallback: የተመረጠውን Alarm ከዝርዝር ውስጥ ለማጥፋት (Delete)
  const handleDeleteAlarm = useCallback((id) => {
    setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id));
  }, []);

  // useEffect: በየሰከንዱ ሁሉንም Active የሆኑ Alarms ከአሁኑ ሰዓት ጋር ያነፃፅራል
  useEffect(() => {
    if (alarms.length === 0) return;

    const checkInterval = setInterval(() => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTimeString = `${currentHours}:${currentMinutes}`;

      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) => {
          if (
            alarm.isActive &&
            alarm.time === currentTimeString &&
            alarm.lastTriggered !== currentTimeString
          ) {
            return {
              ...alarm,
              isRinging: true,
              lastTriggered: currentTimeString,
            };
          }
          return alarm;
        })
      );
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [alarms.length]);

  // ቢያንስ አንድ Alarm እየጮኸ መሆኑን ማረጋገጫ
  const anyAlarmRinging = alarms.some((alarm) => alarm.isRinging);

  return (
    <div className={`tool-card ${anyAlarmRinging ? "ringing" : ""}`}>
      <div className="alarm-header">
        <h3>⏰ Smart Alarms</h3>
        <span className="alarm-count">{alarms.length} Set</span>
      </div>

      {/* አዲስ Alarm መሙያ Form */}
      <form className="alarm-form" onSubmit={handleAddAlarm}>
        <div className="alarm-inputs">
          <input
            ref={inputRef}
            type="time"
            className="alarm-input time-picker"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
          />
          <input
            type="text"
            className="alarm-input label-input"
            placeholder="Label (e.g. Study)"
            value={alarmLabel}
            onChange={(e) => setAlarmLabel(e.target.value)}
            maxLength={20}
          />
        </div>
        <button type="submit" className="btn add-alarm-btn">
          + Add Alarm
        </button>
      </form>

      {/* የተሞሉ Alarms ዝርዝር (List) */}
      <div className="alarm-list">
        {alarms.length === 0 ? (
          <p className="empty-alarm">No alarms set yet. Add one above!</p>
        ) : (
          alarms.map((alarm) => (
            <div
              key={alarm.id}
              className={`alarm-item ${!alarm.isActive ? "inactive" : ""} ${
                alarm.isRinging ? "item-ringing" : ""
              }`}
            >
              <div className="alarm-item-info">
                <span className="alarm-item-time">{alarm.time}</span>
                <span className="alarm-item-label">{alarm.label}</span>
              </div>

              <div className="alarm-item-actions">
                {alarm.isRinging ? (
                  <button
                    className="alarm-action-btn stop-btn"
                    onClick={() => handleStopRinging(alarm.id)}
                  >
                    🔔 Stop
                  </button>
                ) : (
                  <button
                    className={`alarm-action-btn toggle-btn ${
                      alarm.isActive ? "on" : "off"
                    }`}
                    onClick={() => handleToggleAlarm(alarm.id)}
                  >
                    {alarm.isActive ? "ON" : "OFF"}
                  </button>
                )}

                <button
                  className="alarm-action-btn delete-btn"
                  onClick={() => handleDeleteAlarm(alarm.id)}
                  title="Delete Alarm"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alarm;