// /* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Clock.css";

const Clock = ({ label }) => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    if (!is24Hour) {
      hours = hours % 12 || 12;
    }
    const formattedHours = String(hours).padStart(2, "0");

    return { formattedHours, minutes, seconds, amPm };
  };

  const { formattedHours, minutes, seconds, amPm } = formatTime();

  return (
    <section className="clock-card">
      <div className="clock-top">
        <span className="badge">{label}</span>
        <button
          className="format-toggle"
          onClick={() => setIs24Hour((prev) => !prev)}
        >
          {is24Hour ? "Switch to 12H" : "Switch to 24H"}
        </button>
      </div>

      <div className="clock-display">
        <span className="digits">{formattedHours}</span>
        <span className="colon">:</span>
        <span className="digits">{minutes}</span>
        <span className="colon">:</span>
        <span className="digits seconds">{seconds}</span>
        {!is24Hour && <span className="ampm">{amPm}</span>}
      </div>

      <p className="date-display">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </section>
  );
};

export default Clock;