import './index.scss';
import Link from 'next/link';
import { getNavBarData } from '@/utils/assets';
import config from '@/config.json';
import NavTabs from './NavTabs';
import { IBars, IRSS } from '@/icons';

const NavBar = async () => {
  const navBarData = await getNavBarData();

  return (
    <header className='header'>
      <nav className='navbar container'>
        <div className='navbar__brand'>
          <Link className='navbar__item' href='/'>
            <h1>{config.siteName}</h1>
          </Link>
        </div>
        <div className='navbar__menu'>
          <NavTabs tabs={navBarData} />
          <div className='navbar__end'>
            <a
              className='navbar__item'
              href='/index.xml'
              title='RSS'
              target='_blank'
            >
              <IRSS />
            </a>
            <div className='navbar__item navbar__toc' id='toc-btn' title='目录'>
              <IBars />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
