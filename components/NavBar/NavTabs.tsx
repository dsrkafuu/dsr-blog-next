'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavTabsProps {
  tabs: Array<{
    title: string;
    link: string;
  }>;
}

const NavTabs = ({ tabs }: NavTabsProps) => {
  const pathname = usePathname();

  return (
    <div className='navbar__start'>
      {tabs.map((tab) => (
        <Link
          key={tab.link}
          className={clsx({
            navbar__item: true,
            'navbar__item--active': pathname.indexOf(tab.link) > -1,
          })}
          href={tab.link}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
};

export default NavTabs;
