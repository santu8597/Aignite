import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider"
import { Navbar } from "@/components/utils/navbar"

import { Providers } from "@/components/utils/providers"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FraudGuard AI | Advanced Fraud Detection System",
  description: "Protect yourself from fraud with our cutting-edge AI-powered detection system. Real-time scanning for emails, URLs, and websites.",
  keywords: "fraud detection, AI, cybersecurity, phishing, scam detection, URL scanning, email security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <Providers>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* <Navbar /> */}
        <main>{children}</main>
        
      </ThemeProvider>
    </Providers>
        
      </body>
    </html>
  );
}
