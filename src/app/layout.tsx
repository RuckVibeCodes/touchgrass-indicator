import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TouchGrass — The All-in-One TradingView Indicator",
  description:
    "Momentum MA, BULLISH/BEARISH signals, PD/ORB levels, VWAP bands, and ChartPrime-style divergence detection. One clean indicator. $19/mo or $349 lifetime.",
  keywords: "TradingView indicator, crypto trading, momentum indicator, divergence detection, VWAP, ORB, trading signals",
  openGraph: {
    title: "TouchGrass — The All-in-One TradingView Indicator",
    description:
      "Replace 5 indicators with one. Momentum MA, signals, PD/ORB zones, VWAP + divergences. Start at $19/mo.",
    url: "https://touchgrass.trade",
    siteName: "TouchGrass",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TouchGrass — The All-in-One TradingView Indicator",
    description: "Replace 5 indicators with one. Momentum MA, signals, PD/ORB zones, VWAP + divergences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
