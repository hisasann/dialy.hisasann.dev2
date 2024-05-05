import { Inter } from 'next/font/google';

import './globals.css';
import BLOG from '@/blog.config';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: BLOG.title,
  description: BLOG.description,
  authors: BLOG.authors,
  keywords: BLOG.seo.keywords.join(', '),
  openGraph: {
    type: 'website',
    url: BLOG.link,
    title: BLOG.title,
    description: BLOG.description,
    siteName: BLOG.title,
    images: [
      {
        url: `${BLOG.ogImageGenerateURL}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: `@${BLOG.author}`,
    title: BLOG.title,
    description: BLOG.description,
    images: `${BLOG.ogImageGenerateURL}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
