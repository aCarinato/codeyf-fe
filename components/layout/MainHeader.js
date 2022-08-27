import classes from './MainHeader.module.css';
import Link from 'next/link';

function MainHeader() {
  return (
    <header className={classes.header}>
      <nav className={classes.logo}>
        {' '}
        <Link href="/">
          <a className={classes['main-nav-link']}>CODEYFUL</a>
        </Link>
      </nav>
      <nav className={classes.nav}>
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
            <Link href="/coding-groups">
              <a className={classes['main-nav-link']}>groups</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a className={classes['main-nav-link']}>login</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/people/groups">
              <a className={classes['main-nav-link']}>projects</a>
            </Link>
          </li>
          <li>
            <Link href="/people/groups">
              <a className={classes['main-nav-link']}>blog</a>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
