import styles from './page.module.scss';
import type { Metadata } from 'next';
import type { CryptoData } from './Crypto';
import config from '@/config.json';
import * as crypto from '@/assets/crypto';
import Crypto from './Crypto';

export const metadata: Metadata = {
  title: `Crypto | ${config.name}`,
  description: 'Crypto addresses of DSRKafuU.',
  openGraph: {
    siteName: config.name,
    title: `Crypto | ${config.name}`,
    description: 'Crypto addresses of DSRKafuU.',
    url: '/crypto',
    images: '/og.png',
  },
};

const getCryptoData = (): CryptoData => {
  return {
    chain: {
      eth: { name: 'Ethereum', icon: crypto.eth },
      base: { name: 'Base', icon: crypto.base },
      arb: { name: 'Arbitrum One', icon: crypto.arb },
      bnb: { name: 'BNB Smart Chain', icon: crypto.bsc },
      taproot: { name: 'Taproot', icon: crypto.btc },
    },
    currency: {
      usdc: {
        name: 'USDC',
        icon: crypto.usdc,
        chains: ['eth', 'base', 'arb', 'bnb'],
        address: '0xa1a569134cfca2e59a25860db41989211054f853',
      },
      usdt: {
        name: 'USDT',
        icon: crypto.usdt,
        chains: ['eth', 'arb', 'bnb'],
        address: '0xa1a569134cfca2e59a25860db41989211054f853',
      },
      btc: {
        name: 'BTC',
        icon: crypto.btc,
        chains: ['taproot'],
        address:
          'bc1p9lj0etwqcetnf6cthyzp599hukdk6w0vc3s5s0tc9t7ws05kvthskm55uz',
      },
    },
  };
};

const CryptoPage = async () => {
  const data = getCryptoData();

  return (
    <main className={styles.main}>
      <Crypto data={data} />
    </main>
  );
};

export default CryptoPage;
