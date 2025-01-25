/* eslint-disable @next/next/no-page-custom-font */

import './globals.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import config from '@/config.json';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  authors: [{ url: '/' }],
  description: config.desc,
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    siteName: config.name,
    title: config.name,
    description: config.desc,
    url: '/',
    images: '/og.png',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <head>
        {/* prettier-ignore */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        {/* prettier-ignore */}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        {/* prettier-ignore */}
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?display=swap&family=Inter:wght@400;500' />
        {/* prettier-ignore */}
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans+SC:wght@400;500' />
        {/* prettier-ignore */}
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans+JP:wght@400;500' />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
        {typeof process.env.NEXT_PUBLIC_GA_ID === 'string' && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
};

export default RootLayout;
