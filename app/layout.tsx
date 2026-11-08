import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '黄威 Vince｜品牌运营 · AI 产品生态合作',
  description: '黄威 Vince 的个人作品与职业经历：品牌运营、AI 产品生态合作、内容 IP 与复杂项目统筹。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
