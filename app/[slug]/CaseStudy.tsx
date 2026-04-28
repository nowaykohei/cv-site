import RichText from "../RichText";
import Arrow12 from "../Arrow12";
import PhotoCollage from "./PhotoCollage";
import GlobeSpinner from "./GlobeSpinner";
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
        <span>koheifoss.com/{slug}</span>
        {slug === "now" && <GlobeSpinner />}
      </h1>
      {photos.length > 0 && <PhotoCollage photos={photos} />}
      <div className={styles.markdown}><RichText text={markdownText} /></div>
      <a href="/" className={styles.backLink}>kohei foss<span className={styles.backArrow}>&#xfeff;<Arrow12 fill="var(--grey3)"/></span></a>
    </div>
  );
}

export default CaseStudy;
