import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { promises as fs } from 'fs';
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export async function generateMetadata(): Promise<Metadata> {
  const file = await fs.readFile(process.cwd() + '/content/profileData.json', 'utf8');
  const cv = JSON.parse(file);
  return {
    title: cv.general.displayName,
    description: cv.general.byline || '',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t){document.documentElement.dataset.theme=t;}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.dataset.theme='dark';}else{document.documentElement.dataset.theme='light';}})();` }} />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
