import RichText from "../RichText";
import PhotoCollage from "./PhotoCollage";
import GlobeSpinner from "./GlobeSpinner";
import Footer from "../Footer";
import styles from "./CaseStudy.module.css";

type CaseStudyProps = {
  slug: string;
  markdownText: string;
  photos: string[];
};
const CaseStudy: React.FC<CaseStudyProps> = ({
  slug,
  markdownText,
  photos,
}) => {
  return (
    <div className={styles.content}>
      <h1 className={styles.pageTitle}>
        {slug === "now" && <span className={styles.pageTitleGlobe}><GlobeSpinner /></span>}
        koheifoss.com/{slug}
      </h1>
      {photos.length > 0 && <PhotoCollage photos={photos} />}
      <a href="/" className={styles.backButton}>{'<'}</a>
      <div className={styles.markdown}><RichText text={markdownText} /></div>
      <Footer />
    </div>
  );
}

export default CaseStudy;
