"use client";
import { useState, useEffect } from "react";

const GLOBES = ["🌎", "🌍", "🌏"];

export default function GlobeSpinner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % GLOBES.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return <span aria-hidden="true">{GLOBES[index]}</span>;
}
