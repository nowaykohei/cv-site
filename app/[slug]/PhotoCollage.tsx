'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Lightbox from '../Lightbox';
import styles from './PhotoCollage.module.css';

// Fan: each depth level rotates more, shifts slightly right
const FAN = [
  { rotation: 3,  x: 0  },
  { rotation: 8,  x: 8  },
  { rotation: 13, x: 16 },
];

const PhotoCollage: React.FC<{ photos: any[] }> = ({ photos }) => {
  const [index, setIndex]         = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sliding, setSliding]     = useState<'left' | 'right' | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const busy = useRef(false);

  const sorted = useMemo(() =>
    [...photos].sort((a, b) => {
      const n = (url: string) => parseInt(url.match(/(\d+)(?=\.[^.]+$)/)?.[0] || '0');
      return n(a.url) - n(b.url);
    }), [photos]
  );

  const imageCache = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    imageCache.current = sorted.map(photo => {
      const img = new Image();
      img.src = photo.url;
      return img;
    });
  }, []);

  const navigate = (dir: 'left' | 'right') => {
    if (busy.current) return;
    busy.current = true;
    setSliding(dir);
    setTimeout(() => {
      setIndex(i => dir === 'right'
        ? (i + 1) % sorted.length
        : (i - 1 + sorted.length) % sorted.length
      );
      setSliding(null);
      busy.current = false;
    }, 180);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) return;
      if (e.key === 'ArrowLeft')  navigate('left');
      if (e.key === 'ArrowRight') navigate('right');
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
      navigate(dx > 0 ? 'left' : 'right');
    } else if (Math.abs(dx) < 10 && dy < 10) {
      setLightboxIndex(index);
    }
    touchStart.current = null;
  };

  const n = sorted.length;
  const grayCount = Math.min(Math.max(n - 1, 0), 2);
  const attachments = sorted.map(p => ({ type: 'image', ...p }));

  const slideX = sliding === 'left' ? '-150vw' : sliding === 'right' ? '150vw' : '0px';

  return (
    <>
      <div className={styles.collage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

        {/* Gray fan cards behind */}
        {Array.from({ length: grayCount }, (_, i) => {
          const depth = grayCount - i;
          const fan = FAN[depth] ?? FAN[FAN.length - 1];
          return (
            <div
              key={`gray-${(index + depth) % n}`}
              className={styles.grayCard}
              style={{
                transform: `translate(calc(-50% + ${fan.x}px), -50%) rotate(${fan.rotation}deg)`,
                zIndex: i + 1,
              }}
            />
          );
        })}

        {/* Current photo */}
        <img
          key={index}
          src={sorted[index].url}
          alt=""
          className={styles.card}
          style={{
            transform: `translate(calc(-50% + ${slideX}), -50%) rotate(${FAN[0].rotation}deg)`,
            transition: sliding ? 'transform 0.18s ease-in' : 'none',
            zIndex: grayCount + 1,
          }}
          onClick={() => { if (!sliding) setLightboxIndex(index); }}
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
