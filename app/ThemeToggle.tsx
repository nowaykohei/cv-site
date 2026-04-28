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
      <span className={styles.labelI}>I</span>
      <span className={styles.thumb} />
      <span className={styles.labelO}>O</span>
    </button>
  );
}
