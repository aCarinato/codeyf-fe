import classes from './MainHeader.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/Context';
import { useState } from 'react';
// external
// import { Icon } from '@iconify/react';
import MobileMenu from './MobileMenu';

function MainHeader() {
  const { mobileView } = useMainContext();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // console.log(showMobileMenu);
  return (
    <header className={classes.header}>
      <nav className={classes.logo}>
        {' '}
        <Link href="/">
          <a className={classes['main-nav-link']}>CODEYFUL</a>
        </Link>
      </nav>
      <nav className={classes.nav}>
        {showMobileMenu && <MobileMenu setShowMobileMenu={setShowMobileMenu} />}
        {mobileView ? (
          <div onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Icon icon="charm:menu-hamburger" />
          </div>
        ) : (
          <ul className={classes['main-nav-list']}>
            <li>
              <Link href="/people/coding-buddies">
                <a className={classes['main-nav-link']}>buddies</a>
              </Link>
            </li>
            <li>
              <Link href="/people/coding-mentors">
                <a className={classes['main-nav-link']}>mentors</a>
              </Link>
            </li>
            <li>
              <Link href="/projects/coding-groups">
                <a className={classes['main-nav-link']}>groups</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className={classes['main-nav-link']}>login</a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
