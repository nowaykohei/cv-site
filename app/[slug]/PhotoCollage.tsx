'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '../Lightbox';
import styles from './PhotoCollage.module.css';

const STACK_DEPTH = 3;
const OPACITIES = [1, 0.45, 0.18];
const SCALES    = [1, 0.96, 0.92];
const Y_OFFSETS = [0, 10, 20];

const PhotoCollage: React.FC<{ photos: any[] }> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [topIdx, setTopIdx]   = useState(0);
  const [exitDir, setExitDir] = useState<'left' | 'right'>('right');
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Fixed filename order for lightbox
  const sorted = useMemo(() =>
    [...photos].sort((a, b) => {
      const n = (url: string) => parseInt(url.match(/(\d+)(?=\.[^.]+$)/)?.[0] || '0');
      return n(a.url) - n(b.url);
    }), [photos]
  );

  // Shuffled display order with random angles, fixed on mount
  const deck = useMemo(() => {
    const arr = sorted.map(photo => ({
      ...photo,
      rotation: (Math.random() - 0.5) * 14,
    }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  // Keyboard nav — arrow keys cycle the deck
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) return;
      if (e.key === 'ArrowLeft')  { setExitDir('left');  setTopIdx(i => (i + 1) % deck.length); }
      if (e.key === 'ArrowRight') { setExitDir('right'); setTopIdx(i => (i + 1) % deck.length); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, deck.length]);

  // Touch: swipe to navigate, tap to open lightbox
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = touchStart.current.x - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStart.current.y - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      setExitDir(dx > 0 ? 'right' : 'left');
      setTopIdx(i => (i + 1) % deck.length);
    } else if (Math.abs(dx) < 10 && dy < 10) {
      setLightboxIndex(sorted.findIndex(p => p.url === deck[topIdx].url));
    }
    touchStart.current = null;
  };

  const visibleCards = Array.from(
    { length: Math.min(STACK_DEPTH, deck.length) },
    (_, depth) => ({ photo: deck[(topIdx + depth) % deck.length], depth })
  );

  const attachments = sorted.map(p => ({ type: 'image', ...p }));

  return (
    <>
      <div className={styles.collage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence custom={exitDir} initial={false}>
          {visibleCards.map(({ photo, depth }) => {
            const isTop = depth === 0;
            return (
              <motion.img
                key={photo.url}
                src={photo.url}
                className={styles.card}
                custom={exitDir}
                animate={{
                  opacity: OPACITIES[depth],
                  rotate:  photo.rotation,
                  y:       Y_OFFSETS[depth],
                  scale:   SCALES[depth],
                  zIndex:  STACK_DEPTH - depth,
                }}
                exit={(dir: 'left' | 'right') => ({
                  x:       isTop ? (dir === 'left' ? '-130%' : '130%') : 0,
                  opacity: 0,
                  rotate:  isTop
                    ? photo.rotation + (dir === 'left' ? -10 : 10)
                    : photo.rotation,
                  transition: { type: 'spring', stiffness: 300, damping: 30 },
                })}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                style={{ cursor: isTop ? 'pointer' : 'default' }}
                onClick={isTop ? () => setLightboxIndex(sorted.findIndex(p => p.url === photo.url)) : undefined}
              />
            );
          })}
        </AnimatePresence>
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
