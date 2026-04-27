import styles from "./page.module.css";
import { promises as fs } from 'fs';
import Profile from "./Profile";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/public/content/profileData.json', 'utf8');
  const cv = JSON.parse(file);

  const splashFile = await fs.readFile(process.cwd() + '/public/content/splashes-elo1050.txt', 'utf8');
  const splashes = splashFile.split(/\n\n+/).map(l => l.trim()).filter(Boolean);
  const initialIndex = Math.floor(Math.random() * splashes.length);

  return (
    <div className={styles.page}>
      <Profile cv={cv} splashes={splashes} initialIndex={initialIndex} />
    </div>
  );
}
