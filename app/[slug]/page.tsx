import { promises as fs } from 'fs';
import CaseStudy from './CaseStudy';
import styles from '../page.module.css';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const file = await fs.readFile(process.cwd() + `/public/content/${slug}.md`, 'utf8');

  return (
    <div className={styles.page}>
      <CaseStudy markdownText={file} />
    </div>
  );
}
