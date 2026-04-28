'use client';
import { useState, useMemo } from 'react';
import Lightbox from '../Lightbox';
import styles from './PhotoCollage.module.css';

type PhotoCollageProps = {
  photos: any[];
};

const BASE_POSITIONS = [
  { left: 4,  top: 3  },
  { left: 52, top: 2  },
  { left: 7,  top: 44 },
  { left: 50, top: 43 },
];

const PhotoCollage: React.FC<PhotoCollageProps> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sorted = useMemo(() =>
    [...photos].sort((a, b) => {
      const n = (url: string) => parseInt(url.match(/(\d+)(?=\.[^.]+$)/)?.[0] || '0');
      return n(a.url) - n(b.url);
    }), [photos]
  );

  const photoData = useMemo(() =>
    sorted.map((photo, i) => {
      const base = BASE_POSITIONS[i % BASE_POSITIONS.length];
      const rotate = (Math.random() - 0.5) * 16;
      return {
        ...photo,
        rotate,
        style: {
          left:    `${base.left + (Math.random() - 0.5) * 6}%`,
          top:     `${base.top  + (Math.random() - 0.5) * 8}%`,
          width:   `${40 + Math.random() * 8}%`,
          zIndex:  Math.floor(Math.random() * 10) + 1,
          '--rotate': `${rotate}deg`,
        } as React.CSSProperties,
      };
    }), []
  );

  const attachments = sorted.map(photo => ({ type: 'image', ...photo }));

  return (
    <>
      <div className={styles.collage}>
        {photoData.map((photo, i) => (
          <img
            key={photo.url}
            src={photo.url}
            alt=""
            className={styles.photo}
            style={photo.style}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
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
