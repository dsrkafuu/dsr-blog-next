'use client';

import styles from './index.module.scss';
import type { ReactNode, AnchorHTMLAttributes } from 'react';
import { sendLinkClick } from '@/utils/analytics';

interface MainJumpBtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  key: string;
  children: ReactNode;
}

const MainJumpBtn = (props: MainJumpBtnProps) => {
  return (
    <a
      key={props.key}
      className={styles.link}
      href={props.href}
      title={props.title}
      onClick={(e) => sendLinkClick(`goto_${props.key}`, e)}
      target='_blank'
      rel='noreferrer'
    >
      {props.children}
    </a>
  );
};

export default MainJumpBtn;
