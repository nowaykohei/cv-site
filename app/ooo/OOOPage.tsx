'use client';

import { useCallback } from 'react';
import Markdown from 'react-markdown';
import Footer from '../Footer';
import caseStyles from '../[slug]/CaseStudy.module.css';
import styles from './OOOPage.module.css';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractH2s(markdown: string): string[] {
  return markdown
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => line.replace(/^## /, '').trim());
}

const ExternalLink: React.FC<React.JSX.IntrinsicElements['a']> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const H2: React.FC<React.JSX.IntrinsicElements['h2']> = ({ children, ...props }) => {
  const text = Array.isArray(children) ? children.join('') : String(children ?? '');
  return <h2 id={slugify(text)} {...props}>{children}</h2>;
};

type OOOPageProps = { markdownText: string };

export default function OOOPage({ markdownText }: OOOPageProps) {
  const dividerIndex = markdownText.indexOf('\n---\n');
  const intro = dividerIndex !== -1 ? markdownText.slice(0, dividerIndex) : '';
  const body = dividerIndex !== -1 ? markdownText.slice(dividerIndex + 5) : markdownText;

  const sections = extractH2s(body);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.remove(styles.highlighted);
    void el.offsetWidth;
    el.classList.add(styles.highlighted);
    setTimeout(() => el.classList.remove(styles.highlighted), 4000);
  }, []);

  const components = {
    a: ExternalLink as any,
    h2: H2 as any,
  };

  return (
    <div className={caseStyles.content}>
      <div className={caseStyles.pageTitleRow}>
        <h1 className={caseStyles.pageTitle}>Kohei Foss– OOO Coverage plan</h1>
        <a href="/" className={caseStyles.backButton} />
      </div>

      {intro && (
        <div className={caseStyles.markdown}>
          <Markdown components={components}>{intro}</Markdown>
        </div>
      )}

      {sections.length > 0 && (
        <nav className={styles.toc}>
          <div className={styles.tocLabel}>On this page</div>
          {sections.map(section => (
            <button
              key={section}
              className={styles.tocItem}
              onClick={() => scrollToSection(slugify(section))}
            >
              {section}
            </button>
          ))}
        </nav>
      )}

      <div className={caseStyles.markdown}>
        <Markdown components={components}>{body}</Markdown>
      </div>
      <Footer />
    </div>
  );
}
