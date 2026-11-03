# ⏱️ TimeHub Pro — Digital Clock, Stopwatch & Smart Alarms

A clean, modular, and responsive time-management dashboard built with **React** and **Vite**. This project demonstrates modern **Component-Based Architecture** and practical implementation of core **React Hooks** (`useState`, `useEffect`, `useRef`, `useCallback`, and `useContext`) alongside **Props** and custom CSS variables for seamless **Dark/Light Theme** switching.

---

## ✨ Features

* **🕒 Live Digital Clock:** Real-time clock display with full date formatting and an instant toggle between **12-Hour (AM/PM)** and **24-Hour** formats.
* **⏱️ Precision Stopwatch:** Millisecond-accurate stopwatch featuring **Start**, **Pause**, and **Reset** controls without causing unnecessary component re-renders.
* **⏰ Multiple Smart Alarms:**
  * Add unlimited custom alarms with personalized labels (e.g., *Study, Coding, Gym*).
  * Toggle individual alarms **ON / OFF**.
  * Visual pulsing alert when an alarm triggers, with a **Stop** control that prevents duplicate triggers within the same minute.
  * Delete alarms from the active list at any time.
* **🌓 Dynamic Theme Switching:** Global **Dark Mode** and **Light Mode** powered by the React Context API and CSS custom properties.
* **🧱 Clean Modular Architecture:** Each component is isolated in its own directory with dedicated `.jsx` and `.css` files, keeping `App.jsx` strictly for imports and layout rendering.

---

## 🛠️ Tech Stack

* **Frontend Library:** React 18+ (Functional Components & Hooks)
* **Build Tool:** Vite
* **Styling:** Custom CSS3 (CSS Variables, Flexbox, CSS Grid, Keyframe Animations)
* **Linting:** ESLint

---

## 🧠 React Hooks & Concepts Used

| Hook / Concept | Component | Implementation Purpose |
| :--- | :--- | :--- |
| **`useState`** | All Components | Manages real-time clock state, 12H/24H format toggles, stopwatch elapsed time, multiple alarm arrays, and active theme state. |
| **`useEffect`** | `Clock`, `Stopwatch`, `Alarm` | Handles `setInterval` timers for the live clock and alarm checker, and performs cleanup (`clearInterval`) on component unmount to prevent memory leaks. |
| **`useRef`** | `Stopwatch`, `Alarm` | Stores the mutable `intervalId` in the stopwatch without triggering re-renders, and manages direct DOM focus on the alarm time input field. |
| **`useCallback`** | `Stopwatch`, `Alarm` | Memoizes handler functions (`Start`, `Pause`, `Reset`, `Add/Toggle/Delete Alarm`) for optimal rendering performance. |
| **`useContext`** | `ThemeContext`, `Header` | Provides and consumes global `dark` and `light` theme states across the application without prop drilling. |
| **`Props`** | `Header`, `Clock` | Passes dynamic titles, subtitles, and badge labels cleanly from `App.jsx` to child components. |

---

## 📂 Project Folder Structure

```text
digital-clock/
├── public/
├── src/
│   ├── Components/
│   │   ├── ThemeContext/
│   │   │   └── ThemeContext.jsx      # Global Dark/Light theme context & provider
│   │   ├── Header/
│   │   │   ├── Header.jsx            # App title display & theme toggle button
│   │   │   └── Header.css
│   │   ├── Clock/
│   │   │   ├── Clock.jsx             # Live digital clock & 12H/24H switcher
│   │   │   └── Clock.css
│   │   ├── Stopwatch/
│   │   │   ├── Stopwatch.jsx         # High-precision stopwatch with useRef
│   │   │   └── Stopwatch.css
│   │   └── Alarm/
│   │       ├── Alarm.jsx             # Multi-alarm manager (Add, Toggle, Stop, Delete)
│   │       └── Alarm.css
│   ├── App.jsx                       # Clean root component (imports & layout only)
│   ├── App.css                       # Global theme variables & responsive grid layout
│   └── main.jsx                      # React DOM entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md