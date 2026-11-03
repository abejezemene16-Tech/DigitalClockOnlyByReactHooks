import { ThemeProvider } from "./Components/ThemeContext/ThemeContext";
import Header from "./Components/Header/Header";
import Clock from "./Components/Clock/Clock";
import Stopwatch from "./Components/Stopwatch/Stopwatch";
import Alarm from "./Components/Alarm/Alarm";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <main className="dashboard-container">
        <Header
          title="TimeHub Pro"
          subtitle="Built with React Hooks (useState, useEffect, useRef, useCallback, useContext)"
        />

        <Clock label="LIVE DIGITAL CLOCK" />

        <section className="tools-grid">
          <Stopwatch />
          <Alarm />
        </section>
      </main>
    </ThemeProvider>
  );
};

export default App;