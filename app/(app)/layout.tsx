import type { Metadata } from "next";
// 1. Change from 'next/font/local' to 'next/font/google'
import { Inter } from "next/font/google"; 

import { ClerkProvider } from "@clerk/nextjs";
import AppLayout from "./AppShell";

// 2. Configure the font (no local files needed)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CropComp - Free Online Video Compressor & Cropper",
  description: "Compress and crop your video files instantly in the browser. Secure, fast, and no file limits.",
  keywords: ["video compressor", "online video cropper", "reduce video size", "mp4 compress", "nextjs file tool"],
  openGraph: {
    title: "CropComp",
    description: "Compress and crop your video files instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="retro"> 
      {/* 3. Added data-theme="retro" to force the theme immediately (optional but good for preventing flash) */}
        <body className={`${inter.className} antialiased`}>
          <AppLayout>
            {children}
          </AppLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}