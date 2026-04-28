"use client";
import { useState } from "react";
import styles from "./GlobeSpinner.module.css";

export default function GlobeSpinner() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <img src="/globe/day-globe.gif" alt="" className={`${styles.globe} ${styles.dayGlobe}`} />
      <img src="/globe/night-globe.gif" alt="" className={`${styles.globe} ${styles.nightGlobe}`} />
      <span className={`${styles.tooltip} ${tooltipOpen ? styles.tooltipVisible : ""}`}>
        world famous!
      </span>
    </span>
  );
}
