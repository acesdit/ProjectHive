import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | StartHub',
    default: 'StartHub - Connect, Innovate, Launch',
  },
  description: "Join our community of entrepreneurs, showcase your startup, and connect with innovators around the world.",
  keywords: ['startup', 'entrepreneurs', 'innovation', 'business', 'startups', 'networking', 'pitching'],
  authors: [{ name: 'StartHub Team' }],
  creator: 'StartHub',
  publisher: 'StartHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://starthub.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'StartHub',
    title: 'StartHub - Connect, Innovate, Launch',
    description: 'Join our community of entrepreneurs, showcase your startup, and connect with innovators around the world.',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'StartHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StartHub - Connect, Innovate, Launch',
    description: 'Join our community of entrepreneurs, showcase your startup, and connect with innovators around the world.',
    creator: '@StartHub',
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://starthub.com'}/rss.xml`,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased dark:bg-black`}
      >
        {children}
      </body>
    </html>
  );
}