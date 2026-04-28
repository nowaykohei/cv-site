import { promises as fs } from 'fs';
import CaseStudy from './CaseStudy';
import styles from '../page.module.css';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const file = await fs.readFile(process.cwd() + `/content/${slug}.md`, 'utf8');

  let photos: string[] = [];
  try {
    const photosRaw = await fs.readFile(process.cwd() + `/content/${slug}.photos.json`, 'utf8');
    photos = JSON.parse(photosRaw);
  } catch {}

  return (
    <div className={styles.page}>
      <CaseStudy slug={slug} markdownText={file} photos={photos} />
    </div>
  );
}
