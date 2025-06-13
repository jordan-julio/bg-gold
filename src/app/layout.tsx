// src/app/layout.tsx
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";

const garamond = Cormorant_Garamond({
  weight: ['600','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-garamond'
});

const inter = Inter({
  weight: ['400','500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "BG Gold",
  description: "BG Gold, Be Bold Be Gold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garamond.variable} ${inter.variable} antialiased select-none`}
      >
        <LanguageProvider>
          <CustomCursor />
          <Header />
          {children}
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}