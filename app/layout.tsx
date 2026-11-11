import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '黄威 Vince｜品牌经理 · 市场运营',
  description: '黄威 Vince 的个人作品与职业经历：品牌规划、整合营销、内容 IP、区域市场经营与复杂项目统筹。',
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
