import Image from "next/image";
import RichText from "./RichText";
import Arrow12 from "./Arrow12";
import styles from "./Profile.module.css";
import Attachments from "./Attachments";
import SpeechBubble from "./SpeechBubble";

type ProfileProps = {
  cv: any,
  splashes?: string[],
  initialIndex?: number,
};
const Profile: React.FC<ProfileProps> = ({
  cv,
  splashes,
  initialIndex = 0,
}) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePhoto}>
          <Image src={cv.general.profilePhoto} alt="" width={92} height={92} />
        </div>
        <div className={styles.profileInfo}>
          <h1>{cv.general.displayName}</h1>
          <div className={styles.byline}>{cv.general.byline}</div>
          {cv.general.website ?
            <a className={styles.website}>{cv.general.website}</a>
          : null}
        </div>
      </div>
      {splashes && splashes.length > 0 ?
        <SpeechBubble splashes={splashes} initialIndex={initialIndex} />
      : null}

      {cv.general.about ?
        <section className={`${styles.profileSection} ${styles.about}`}>
          <h3>About</h3>
          <div className={styles.description}>
            <RichText text={cv.general.about}/>
            <div><em><a href="/now">Here's what I'm up to now</a>.<span className={styles.linkArrow}>&#xfeff;<Arrow12 fill="var(--grey1)"/></span></em></div>
          </div>
        </section>
      : null}

      {cv.allCollections.map((collection: any, index: number) => {
        return (
          <section className={styles.profileSection}>
            <h3>{collection.name}</h3>
            <div className={collection.name === "Contact" ? styles.contacts : styles.experiences}>
              {collection.items.map((experience: any, index: number) => {

                if (collection.name === "Contact") {
                  return <ContactItem key={experience.url} experience={experience}/>
                }

                return (
                  <ProfileItem key={experience.heading} experience={experience}/>
                )
              })}
            </div>
          </section>
        )
      })}

      <footer className={styles.footer}>
        <hr className={styles.footerRule} />
        <img src="/kohei-cursive.png" alt="Kohei" className={styles.footerSignature} />
        <p className={styles.footerYear}>Published 2026</p>
      </footer>
    </div>
  );
};

type ProfileItemProps = {
  experience: any,
};
const ProfileItem: React.FC<ProfileItemProps> = ({
  experience
}) => {

  let title;
  if (experience.url) {
    title = <>
      <a href={experience.url} target="_blank">{experience.heading}</a><span className={styles.linkArrow}>&#xfeff;<Arrow12 fill="var(--grey1)"/></span>
    </>
  } else {
    title = experience.heading
  }
  return (
    <div className={styles.experience}>
      <div className={styles.year}>
        <span>{experience.year}</span>
      </div>
      <div className={styles.experienceContent}>
        <div className={styles.title}>
          {title}
        </div>
        {experience.location ?
        <div className={styles.location}>{experience.location}</div>
        : null}
        {experience.description ?
        <div className={styles.description}>
          <RichText text={experience.description}/>
        </div>
        : null}
        {experience.attachments && experience.attachments.length > 0 ?
          <Attachments attachments={experience.attachments}/>
        : null}
      </div>
    </div>
  )
}

const EmailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2.5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1"/>
    <path d="M1 4L6 7L11 4" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="10" height="10" rx="2" fill="currentColor"/>
    <rect x="2.5" y="4.5" width="1.5" height="5" fill="white"/>
    <circle cx="3.25" cy="3.25" r="0.75" fill="white"/>
    <path d="M5.5 4.5H7V5.2C7.3 4.7 7.9 4.4 8.5 4.4C9.6 4.4 10 5.1 10 6.2V9.5H8.5V6.5C8.5 6 8.3 5.7 7.8 5.7C7.3 5.7 7 6 7 6.6V9.5H5.5V4.5Z" fill="white"/>
  </svg>
);

const platformIcons: Record<string, React.ReactNode> = {
  Email: <EmailIcon />,
  LinkedIn: <LinkedInIcon />,
};

type ContactItemProps = {
  experience: any,
};
const ContactItem: React.FC<ContactItemProps> = ({
  experience
}) => {
  const icon = platformIcons[experience.platform];
  return (
    <div className={styles.experience}>
      <div className={styles.year}>
        <span>{experience.platform}</span>
      </div>
      <div className={styles.experienceContent}>
        <div className={styles.title}>
          <span className={styles.contactLink} data-platform={experience.platform}>
            <a href={experience.url} target="_blank">{experience.handle}</a><span className={styles.linkArrow}>&#xfeff;{icon}<Arrow12 fill="currentColor"/></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Profile;
