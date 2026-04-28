import RichText from "../RichText";
import PhotoCollage from "./PhotoCollage";
import GlobeSpinner from "./GlobeSpinner";
import Footer from "../Footer";
import styles from "./CaseStudy.module.css";

type CaseStudyProps = {
  slug: string;
  markdownText: string;
  photos: any[];
};
const CaseStudy: React.FC<CaseStudyProps> = ({
  slug,
  markdownText,
  photos,
}) => {
  return (
    <div className={styles.content}>
      <div className={styles.pageTitleRow}>
        <h1 className={styles.pageTitle}>
          {slug === "now" && <span className={styles.pageTitleGlobe}><GlobeSpinner /></span>}
          koheifoss.com/{slug}
        </h1>
        <a href="/" className={styles.backButton}></a>
      </div>
      {photos.length > 0 && <PhotoCollage photos={photos} />}
      <div className={styles.markdown}><RichText text={markdownText} /></div>
      <Footer />
    </div>
  );
}

export default CaseStudy;
