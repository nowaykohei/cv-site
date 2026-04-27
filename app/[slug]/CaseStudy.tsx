import RichText from "../RichText";
import Arrow12 from "../Arrow12";
import styles from "./CaseStudy.module.css";

type CaseStudyProps = {
  markdownText: string,
};
const CaseStudy: React.FC<CaseStudyProps> = ({
  markdownText,
}) => {
  return (
    <div className={styles.content}>
      <RichText text={markdownText} />
      <a href="/" className={styles.backLink}>kohei foss<span className={styles.backArrow}>&#xfeff;<Arrow12 fill="var(--grey3)"/></span></a>
    </div>
  );
}

export default CaseStudy;
