import classes from './MainHeader.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/Context';
import { Fragment, useState } from 'react';
// external
// import { Icon } from '@iconify/react';
import MobileMenu from './MobileMenu';

function MainHeader() {
  const { mobileView } = useMainContext();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [expandedPeople, setExpandedPeople] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState(false);

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
            <li
              className={expandedPeople ? classes['li-people-expanded'] : ''}
              // onClick={() => setExpandedPeople(!expandedPeople)}
              onMouseEnter={() => setExpandedPeople(true)}
              onMouseLeave={() => setExpandedPeople(false)}
            >
              <ul>
                <li className={classes['li-item']}>PEOPLE</li>
                {expandedPeople && (
                  <Fragment>
                    <li className={classes['li-item']}>
                      <Link href="/people/coding-buddies">
                        <a className={classes['main-nav-link']}>buddies</a>
                      </Link>
                    </li>
                    <li className={classes['li-item']}>
                      <Link href="/people/coding-mentors">
                        <a className={classes['main-nav-link']}>mentors</a>
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </li>
            <li
              className={
                expandedProjects ? classes['li-projects-expanded'] : ''
              }
              onMouseEnter={() => setExpandedProjects(true)}
              onMouseLeave={() => setExpandedProjects(false)}
            >
              <ul>
                <li className={classes['li-item']}>PROJECTS</li>
                {expandedProjects && (
                  <Fragment>
                    <li className={classes['li-item']}>
                      <Link href="/projects/coding-groups">
                        <a className={classes['main-nav-link']}>groups</a>
                      </Link>
                    </li>
                    <li className={classes['li-item']}>
                      <Link href="/projects/coding-groups">
                        <a className={classes['main-nav-link']}>assignements</a>
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
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
