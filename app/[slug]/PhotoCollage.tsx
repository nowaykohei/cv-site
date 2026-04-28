import styles from './PhotoCollage.module.css';

type PhotoCollageProps = {
  photos: string[];
};

const PhotoCollage: React.FC<PhotoCollageProps> = ({ photos }) => {
  return (
    <div className={styles.collage}>
      {photos.map((src, i) => (
        <img key={src} src={src} alt="" className={styles.photo} data-index={i} />
      ))}
    </div>
  );
};

export default PhotoCollage;
