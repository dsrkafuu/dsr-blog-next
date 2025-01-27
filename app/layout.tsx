/* eslint-disable @next/next/no-page-custom-font */

import '@/styles/globals.scss';
import './layout.scss';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import config from '@/config.json';
import NavBar from '@/components/NavBar';
import Search from '@/components/Search';
import SideInfo from '@/components/SideInfo';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  authors: [{ url: '/', name: config.name }],
  description: config.desc,
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    siteName: config.siteName,
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
    <html lang='zh'>
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
        <NavBar />
        <main className='main'>
          <div className='container'>
            <div className='content'>
              <div className='content__inner'>{children}</div>
            </div>
            <aside className='sidebar'>
              <div className='sidebar__inner'>
                <Search />
                <div className='sticky'>
                  <SideInfo />
                </div>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
        {typeof process.env.NEXT_PUBLIC_GA_ID === 'string' && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
};

export default RootLayout;
