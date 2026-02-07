import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TouchGrass - Trade with Structure, Not Emotion",
  description: "The all-in-one TradingView indicator combining PD levels, ORB, VWAP, divergences, and smart signals.",
  keywords: ["TradingView", "indicator", "trading", "crypto", "forex", "VWAP", "divergence"],
  openGraph: {
    title: "TouchGrass Trading Indicator",
    description: "Trade with Structure, Not Emotion. PD Levels, ORB, VWAP, Divergences & Signals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
