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

  const photoStyles = useMemo(() =>
    sorted.map((_, i) => {
      const sign = i % 2 === 0 ? 1 : -1;
      const rotation = sign * (2 + Math.random() * 4);
      const width = 45 + Math.random() * 10;
      return { rotation, width };
    }), []
  );

  useEffect(() => {
    sorted.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
    });
  }, []);

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
  const n = sorted.length;

  // Build stack from bottom to top: gray cards → next photo → current photo
  const grayCount = Math.min(Math.max(n - 2, 0), 2);
  const grayCards = Array.from({ length: grayCount }, (_, i) => {
    const depth = grayCount - i; // deeper = rendered first (lower z)
    const si = (index + 2 + i) % n;
    const { width, rotation } = photoStyles[si];
    return (
      <div
        key={`gray-${si}`}
        className={styles.grayCard}
        style={{
          width: `${width}%`,
          transform: `translate(-50%, calc(-50% + ${depth * 7}px)) rotate(${rotation}deg)`,
          zIndex: i + 1,
        }}
      />
    );
  });

  const nextIdx = (index + 1) % n;
  const { width: nw, rotation: nr } = photoStyles[nextIdx];
  const { width: cw, rotation: cr } = photoStyles[index];

  return (
    <>
      <div className={styles.collage}>
        {grayCards}

        {/* Next photo at 80% opacity */}
        <img
          key={`next-${nextIdx}`}
          src={sorted[nextIdx].url}
          alt=""
          className={styles.card}
          style={{
            width: `${nw}%`,
            transform: `translate(-50%, calc(-50% + 7px)) rotate(${nr}deg)`,
            opacity: 0.8,
            zIndex: grayCount + 1,
          }}
        />

        {/* Current photo */}
        <img
          key={`current-${index}`}
          src={sorted[index].url}
          alt=""
          className={styles.card}
          style={{
            width: `${cw}%`,
            transform: `translate(-50%, -50%) rotate(${cr}deg)`,
            zIndex: grayCount + 2,
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
