import { promises as fs } from 'fs';
import OOOPage from './OOOPage';
import pageStyles from '../page.module.css';

export default async function OooRoute() {
  const file = await fs.readFile(process.cwd() + '/content/ooo.md', 'utf8');
  return (
    <div className={pageStyles.page}>
      <OOOPage markdownText={file} />
    </div>
  );
}
