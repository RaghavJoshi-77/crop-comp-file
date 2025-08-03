import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Head from "next/head";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
            <Head>
              <title>Welcome to Crop-Comp-File</title>
              <meta name="description" content="This is website which lets you crop images, remove their background and compress the video with " />
              <meta name="keywords" content="Compression, nextjs , Crop, background remove , clerk, cloudinary"/>
              <meta property="og:title" content="Crop-Comp" />
              <meta property="og:description" content="This is website which lets you crop images, remove their background and compress the video with " />
            </Head>
      <body>
        {children}
      </body>
    </html>
    </ClerkProvider>
    
  );
}
