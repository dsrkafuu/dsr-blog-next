import type { Metadata } from 'next';
import config from '@/config.json';

export const metadata: Metadata = {
  title: config.siteName,
};

const HomePage = () => {
  return 'HOME';
};

export default HomePage;
