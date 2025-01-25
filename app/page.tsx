import styles from './page.module.scss';
import type { Metadata } from 'next';
import Image from 'next/image';
import { IBitcoin, IBlog, IGitHub, ISteam, ITVRetro, ITwitter } from '@/icons';
import config from '@/config.json';
import irasutoya from '@/assets/irasutoya.jpg';
import MainJumpBtn from '@/components/MainJumpBtn';

export const metadata: Metadata = {
  title: config.name,
};

const HomeIcons = {
  blog: IBlog,
  github: IGitHub,
  steam: ISteam,
  'tv-retro': ITVRetro,
  twitter: ITwitter,
  bitcoin: IBitcoin,
};

const HomePage = () => {
  const { name, bio, links } = config;

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          <Image
            className={styles.image}
            src={irasutoya}
            alt='Avatar'
            width={128}
            height={128}
            priority
          />
        </div>
        <div className={styles.meta}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.bio}>{bio}</p>
          {!!links && !!links.length && (
            <div className={styles.links}>
              {links.map((link) => {
                const Icon = HomeIcons[link.icon as keyof typeof HomeIcons];
                return (
                  <MainJumpBtn
                    key={link.key}
                    href={link.href}
                    title={link.name}
                  >
                    <Icon />
                  </MainJumpBtn>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
