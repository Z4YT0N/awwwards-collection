import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "口袋AI - 智能对话助手 | 基于中文模型优化的AI应用",
  description: "口袋AI是一款基于中文大语言模型优化的智能对话助手，为中文用户提供极致的AI对话体验。支持智能问答、知识探索、创意写作等多种功能，随时随地解答您的疑惑。",
  keywords: "口袋AI, AI助手, 智能对话, 中文AI, ChatGPT替代品, AI应用, 人工智能, 智能问答, AI对话",
  authors: [{ name: "云中江树" }],
  creator: "云中江树",
  publisher: "LangGPT社区",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://pocketai.com",
    siteName: "口袋AI",
    title: "口袋AI - 您的智能对话伙伴",
    description: "随时随地，智能对话，尽在口袋",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "口袋AI - 智能对话助手",
    description: "基于中文模型优化的AI对话助手，为中文用户提供极致的对话体验。",
    images: ["/twitter-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="!scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
          sizes="180x180"
        />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}