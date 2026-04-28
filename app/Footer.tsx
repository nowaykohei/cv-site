import styles from "./Footer.module.css";

const Footer = () => {
  const updated = new Date(process.env.BUILD_DATE ?? Date.now()).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  return (
    <footer className={styles.footer}>
      <hr className={styles.footerRule} />
      <img src="/kohei-cursive.png" alt="Kohei" className={`${styles.footerSignature} ${styles.footerSignatureLight}`} />
      <img src="/kohei-cursive-dark.png" alt="Kohei" className={`${styles.footerSignature} ${styles.footerSignatureDark}`} />
      <p className={styles.footerYear}>Published 2021. Updated {updated}.</p>
    </footer>
  );
};

export default Footer;
