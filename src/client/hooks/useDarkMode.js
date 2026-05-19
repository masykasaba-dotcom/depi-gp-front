import { useEffect, useState } from "react";

const STORAGE_KEY = "dermacare-theme";

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
}

// Read theme ONCE before React renders (avoids flash on load)
const savedTheme = localStorage.getItem(STORAGE_KEY) || "light";
applyTheme(savedTheme);

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(savedTheme);

  function handleDarkMode() {
    const next = darkMode === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    setDarkMode(next);
  }

  // Keep in sync if localStorage changes in another tab
  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY) {
        const theme = e.newValue || "light";
        applyTheme(theme);
        setDarkMode(theme);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { darkMode, handleDarkMode };
}
