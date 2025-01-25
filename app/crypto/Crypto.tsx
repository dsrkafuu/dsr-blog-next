'use client';

import styles from './Crypto.module.scss';
import type { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import ClipboardJS from 'clipboard';
import { QRCodeSVG } from 'qrcode.react';
import { ICopy } from '@/icons';

export interface CryptoData {
  chain: Record<string, { name: string; icon: StaticImageData }>;
  currency: Record<
    string,
    { name: string; icon: StaticImageData; chains: string[]; address: string }
  >;
}

interface ChainProps {
  icon: StaticImageData;
  name: string;
}

const Chain = ({ icon, name }: ChainProps) => {
  return (
    <div className={styles.chainName}>
      <Image src={icon} alt='' priority width={18} height={18} />
      <span className={styles.chainText}>{name}</span>
    </div>
  );
};

interface AddressProps {
  address: string;
}

const Address = ({ address }: AddressProps) => {
  const clipboardInited = useRef(false);
  const clipboardRef = useRef<HTMLAnchorElement | null>(null);

  const [modalType, setModalType] = useState('none');

  useEffect(() => {
    if (clipboardRef.current && !clipboardInited.current) {
      const clipboard = new ClipboardJS(clipboardRef.current);
      clipboard.on('success', () => {
        setModalType('copy');
      });
      clipboardInited.current = true;
    }
  }, []);

  return (
    <div className={styles.address}>
      {modalType === 'copy' && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            <div className={styles.modalTitle}>Copied</div>
            <div className={styles.modalContent}>{address}</div>
            <div className={styles.modalControl}>
              <div
                className={styles.modalBtn}
                onClick={() => setModalType('none')}
              >
                OK
              </div>
            </div>
          </div>
        </div>
      )}
      <span>{address}</span>
      <a
        className={styles.btn}
        ref={clipboardRef}
        data-clipboard-text={address}
      >
        <ICopy className={styles.icon} />
      </a>
    </div>
  );
};

interface CryptoProps {
  data: CryptoData;
}

const Crypto = ({ data }: CryptoProps) => {
  const [activeTab, setActiveTab] = useState('usdc');
  const curCurrency = data.currency[activeTab];

  return (
    <div className={styles.page} lang='zh'>
      <div className={styles.card}>
        <div className={styles.tabs}>
          {Object.keys(data.currency).map((key) => {
            const item = data.currency[key];
            return (
              <div
                key={key}
                className={clsx({
                  [styles.tab]: true,
                  [styles.tabActive]: activeTab === key,
                })}
                onClick={() => setActiveTab(key)}
              >
                <Image src={item.icon} alt='' priority width={22} height={22} />
                <span className={styles.tabName}>{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.tabsBorder} />
        {!!curCurrency && (
          <div className={styles.content}>
            <div className={styles.chains}>
              <div className={styles.chainTitle}>Network Supported</div>
              {curCurrency.chains.map((chainName) => {
                const chainData = data.chain[chainName];
                if (!chainData) {
                  return null;
                }
                return (
                  <Chain
                    key={chainName}
                    icon={chainData.icon}
                    name={chainData.name}
                  />
                );
              })}
            </div>
            <div className={styles.detail}>
              <div className={styles.addressTitle}>Wallet Address</div>
              <Address address={curCurrency.address} />
              <div className={styles.addressQR}>
                <QRCodeSVG
                  value={curCurrency.address}
                  size={200}
                  level='H'
                  imageSettings={{
                    src: curCurrency.icon.src,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crypto;
