import React, { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState("light");
  function handleDarkMode() {
    if (localStorage.getItem("data-theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "");
      localStorage.removeItem("data-theme");
      setDarkMode("light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("data-theme", "dark");
      setDarkMode("dark");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("data-theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkMode("dark");
    }
  }, []);

  return {
    darkMode,
    handleDarkMode,
  };
}
