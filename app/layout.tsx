import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { RocknRoll_One } from "next/font/google";

const rock = RocknRoll_One({
  subsets: ["latin"],
  weight: ["400"],
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL("https://gallo-gacha.vercel.app"),
  title: "ギャロガチャ",
  description: "ギャロの楽曲をランダムで引ける音楽ガチャ（非公式ファン制作）",
  openGraph: {
    title: "ギャロガチャ",
    description: "ギャロの楽曲をランダムで引ける音楽ガチャ（非公式ファン制作）",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "ギャロガチャ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ギャロガチャ",
    description: "ギャロの楽曲をランダムで引ける音楽ガチャ（非公式ファン制作）",
    images: ["/ogp.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={rock.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
