import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '我的博客 | 个人技术博客',
    template: '%s | 我的博客',
  },
  description:
    '分享技术见解、生活感悟和读书笔记的个人博客',
  keywords: [
    '博客',
    '技术',
    'React',
    'TypeScript',
    'Next.js',
  ],
  authors: [{ name: '博主' }],
  generator: 'Coze Code',
  openGraph: {
    title: '我的博客',
    description: '分享技术见解、生活感悟和读书笔记',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
