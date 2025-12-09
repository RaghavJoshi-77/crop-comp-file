import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
 // Ensure this path is correct

// 1. Setup Fonts correctly
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. The NEW way to do SEO (Metadata API)
export const metadata: Metadata = {
  title: {
    default: "CropComp - AI Video & Image Tools",
    template: "%s | CropComp"
  },
  description: "Free online tool to compress videos, crop images, remove backgrounds, and add logos. Fast, secure, and powered by AI.",
  keywords: ["video compression", "background remover", "image cropper", "Next.js", "Cloudinary", "AI tools", "online editor"],
  authors: [{ name: "Raghav Joshi" }],
  openGraph: {
    title: "CropComp - AI Video & Image Tools",
    description: "Compress videos and edit images instantly in your browser.",
    url: "https://your-domain.com", // Replace with actual URL when deployed
    siteName: "CropComp",
    images: [
      {
        url: "/og-image.png", // Add an image to your public folder for social sharing
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CropComp - AI Video & Image Tools",
    description: "Compress videos and edit images instantly.",
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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* 3. Wrap children in AppShell so your Sidebar/Navbar works */}

            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}