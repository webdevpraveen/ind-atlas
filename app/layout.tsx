import type { Metadata } from "next";
import { Inter, Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "IND Atlas | Tactical OSINT Command Center by WEBDEVPRAVEEN",
  description: "Advanced Open Source Intelligence (OSINT) and situational awareness dashboard for India. Features real-time visual telemetry, AI analysis, weather tracking, and tactical live streams. Developed by Praveenksingh.",
  keywords: [
    "WEBDEVPRAVEEN",
    "Praveenksingh",
    "webdevpraveen",
    "IND Atlas",
    "India OSINT",
    "Situational Awareness",
    "Tactical Dashboard",
    "Live Cameras India",
    "News Aggregator"
  ],
  authors: [{ name: "Praveen K Singh (WEBDEVPRAVEEN)", url: "https://github.com/webdevpraveen" }],
  creator: "webdevpraveen",
  publisher: "WEBDEVPRAVEEN",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ind-atlas.vercel.app/",
    title: "IND Atlas | Tactical OSINT Command Center",
    description: "Advanced Open Source Intelligence (OSINT) dashboard for India by webdevpraveen.",
    siteName: "IND Atlas"
  },
  twitter: {
    card: "summary_large_image",
    title: "IND Atlas | Command Center",
    description: "Real-time situational awareness dashboard by WEBDEVPRAVEEN.",
    creator: "@webdevpraveen"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
