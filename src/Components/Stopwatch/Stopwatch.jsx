import { useState, useRef, useCallback, useEffect } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const handleStart = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    const startTime = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
  }, [elapsedTime]);

  const handlePause = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setElapsedTime(0);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatStopwatch = (ms) => {
    const minutes = String(Math.floor((ms / 60000) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}.${centiseconds}`;
  };

  return (
    <div className="tool-card">
      <h3>⏱️ Stopwatch</h3>
      <div className="stopwatch-screen">{formatStopwatch(elapsedTime)}</div>

      <div className="btn-group">
        {!isRunning ? (
          <button className="btn start" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className="btn pause" onClick={handlePause}>
            Pause
          </button>
        )}
        <button className="btn reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;