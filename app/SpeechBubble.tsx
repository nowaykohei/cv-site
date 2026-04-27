"use client"

import { useState, useRef, useEffect } from "react";
import styles from "./Profile.module.css";

const ShuffleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 2H11V4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 2L11 11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M8.5 11H11V8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11L5.5 7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M7.5 4.5L11 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M6.5 5.5V9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <circle cx="6.5" cy="3.5" r="0.6" fill="currentColor"/>
  </svg>
);

type SpeechBubbleProps = {
  splashes: string[];
  initialIndex: number;
};

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ splashes, initialIndex }) => {
  const [index, setIndex] = useState(initialIndex);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!tooltipOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [tooltipOpen]);

  const shuffle = () => {
    let next;
    do { next = Math.floor(Math.random() * splashes.length); } while (next === index && splashes.length > 1);
    setIndex(next);
  };

  return (
    <div className={styles.speechBubble}>
      <div className={styles.speechBubbleText}>{splashes[index]}</div>
      <div className={styles.speechBubbleActions}>
        <button className={styles.bubbleBtn} onClick={shuffle}>
          <ShuffleIcon />
        </button>
        <span
          ref={tooltipRef}
          className={styles.tooltipWrapper}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          onClick={(e) => { e.stopPropagation(); setTooltipOpen(o => !o); }}
        >
          <span className={`${styles.bubbleBtn} ${tooltipOpen ? styles.bubbleBtnActive : ''}`}>
            <InfoIcon />
          </span>
          <span className={`${styles.tooltip} ${tooltipOpen ? styles.tooltipVisible : ''}`}>
            These are all things I've posted to the internet at some point. Random snippets and whatnot.
          </span>
        </span>
      </div>
    </div>
  );
};

export default SpeechBubble;
