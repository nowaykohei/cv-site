"use client";
import { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  if (theme === null) return null;

  return (
    <button
      onClick={toggle}
      className={`${styles.toggle} ${theme === "light" ? styles.on : ""}`}
      aria-label="Toggle theme"
    >
      <span className={styles.labelI}>
        <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="0" width="2" height="9" rx="1" fill="currentColor"/>
        </svg>
      </span>
      <span className={styles.thumb} />
      <span className={styles.labelO}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </span>
    </button>
  );
}
