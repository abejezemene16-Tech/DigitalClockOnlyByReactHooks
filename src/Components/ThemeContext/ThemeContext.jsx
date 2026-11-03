/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-wrapper ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};