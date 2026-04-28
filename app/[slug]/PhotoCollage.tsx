'use client';
import { useState, useMemo, useEffect } from 'react';
import Lightbox from '../Lightbox';
import styles from './PhotoCollage.module.css';

const PhotoCollage: React.FC<{ photos: any[] }> = ({ photos }) => {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sorted = useMemo(() =>
    [...photos].sort((a, b) => {
      const n = (url: string) => parseInt(url.match(/(\d+)(?=\.[^.]+$)/)?.[0] || '0');
      return n(a.url) - n(b.url);
    }), [photos]
  );

  // Fixed per-photo style: alternating tilt direction, slightly varied size
  const photoStyles = useMemo(() =>
    sorted.map((_, i) => {
      const sign = i % 2 === 0 ? 1 : -1;
      const rotation = sign * (2 + Math.random() * 4); // ±2–6deg, alternating
      const width = 45 + Math.random() * 10;           // 45–55%
      return { rotation, width };
    }), []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) return;
      if (e.key === 'ArrowLeft')  setIndex(i => (i - 1 + sorted.length) % sorted.length);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % sorted.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, sorted.length]);

  const attachments = sorted.map(p => ({ type: 'image', ...p }));

  return (
    <>
      <div className={styles.collage}>
        <img
          src={sorted[index].url}
          alt=""
          className={styles.card}
          style={{
            width: `${photoStyles[index].width}%`,
            transform: `rotate(${photoStyles[index].rotation}deg)`,
          }}
          onClick={() => setLightboxIndex(index)}
        />
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          attachments={attachments}
          startingIndex={lightboxIndex}
          close={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
};

export default PhotoCollage;
