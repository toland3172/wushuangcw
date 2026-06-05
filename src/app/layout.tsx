import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '株洲若水财税服务公司',
    template: '%s | 株洲若水财税服务公司',
  },
  description:
    '专业的财税服务公司，提供代理记账、税务筹划、公司注册、财务咨询等服务',
  keywords: [
    '财税服务',
    '代理记账',
    '税务筹划',
    '公司注册',
    '财务咨询',
    '株洲',
    '石峰区',
  ],
  authors: [{ name: '株洲若水财税服务公司' }],
  generator: 'Coze Code',
  openGraph: {
    title: '株洲若水财税服务公司',
    description: '专业的财税服务公司',
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        <Script
          src="https://173fa8f8-fa55-4277-9605-7b4a51030d8c.dev.coze.site/chat-widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
