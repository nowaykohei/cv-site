'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Lightbox from '../Lightbox';
import styles from './PhotoCollage.module.css';

const PhotoCollage: React.FC<{ photos: any[] }> = ({ photos }) => {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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
      return { rotation, width: 55 };
    }), []
  );

  useEffect(() => {
    sorted.forEach(photo => { new Image().src = photo.url; });
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

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = touchStart.current.x - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStart.current.y - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      setIndex(i => dx > 0
        ? (i + 1) % sorted.length
        : (i - 1 + sorted.length) % sorted.length
      );
    } else if (Math.abs(dx) < 10 && dy < 10) {
      setLightboxIndex(index);
    }
    touchStart.current = null;
  };

  const attachments = sorted.map(p => ({ type: 'image', ...p }));
  const n = sorted.length;
  const grayCount = Math.min(Math.max(n - 1, 0), 2);

  return (
    <>
      <div className={styles.collage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {Array.from({ length: grayCount }, (_, i) => {
          const depth = grayCount - i;
          const si = (index + 1 + i) % n;
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
        })}
        <img
          src={sorted[index].url}
          alt=""
          className={styles.card}
          style={{
            width: `${photoStyles[index].width}%`,
            transform: `translate(-50%, -50%) rotate(${photoStyles[index].rotation}deg)`,
            zIndex: grayCount + 1,
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
