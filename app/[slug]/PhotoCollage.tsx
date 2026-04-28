'use client';
import { useState } from 'react';
import Lightbox from '../Lightbox';
import styles from './PhotoCollage.module.css';

type PhotoCollageProps = {
  photos: string[];
};

const PhotoCollage: React.FC<PhotoCollageProps> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const attachments = photos.map(photo => ({ type: 'image', ...photo }));

  return (
    <>
      <div className={styles.collage}>
        {photos.map((photo, i) => (
          <img
            key={photo.url}
            src={photo.url}
            alt=""
            className={styles.photo}
            data-index={i}
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
