// /* eslint-disable react/prop-types */
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import "./Header.css";

const Header = ({ title, subtitle }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header-card">
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
};

export default Header;