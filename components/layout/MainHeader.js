import classes from './MainHeader.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
// own components
import DropdownMenu from './DropdownMenu';
import MobileMenu from './MobileMenu';
// context
import { useMainContext } from '../../context/Context';

function MainHeader() {
  const { mobileView, authState } = useMainContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [expandedPeople, setExpandedPeople] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    if (authState !== null && authState.username.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

  const peopleMenuItems = [
    {
      id: '0',
      name: 'buddies',
      link: '/people/coding-buddies',
    },
    {
      id: '1',
      name: 'mentors',
      link: '/people/coding-mentors',
    },
  ];

  const projectsMenuItems = [
    {
      id: '0',
      name: 'groups',
      link: '/projects/coding-groups',
    },
    {
      id: '1',
      name: 'assignments',
      link: '/projects/coding-assignments',
    },
  ];

  return (
    <header className={classes.container}>
      <div className={classes['container-item']}>
        <div
          className={classes['container-item-label']}
          //   onClick={() => router.push('/')}
        >
          <Link href="/">
            <a className={classes['main-nav-link']}>CODEYFUL</a>
          </Link>
        </div>
      </div>
      {showMobileMenu && <MobileMenu setShowMobileMenu={setShowMobileMenu} />}
      {mobileView ? (
        <div
          className={classes['mobile-icon']}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Icon icon="charm:menu-hamburger" />
        </div>
      ) : (
        <div className={classes['container-item']}>
          <div
            className={classes['container-item-dropdown']}
            onMouseEnter={() => setExpandedPeople(true)}
            onMouseLeave={() => setExpandedPeople(false)}
          >
            <div
              className={
                expandedPeople
                  ? classes['container-item-label-border']
                  : classes['container-item-label']
              }
            >
              PEOPLE
            </div>
            {expandedPeople && <DropdownMenu menuItems={peopleMenuItems} />}
          </div>
          <div
            //   className={classes['container-item-dropdown']}
            onMouseEnter={() => setExpandedProjects(true)}
            onMouseLeave={() => setExpandedProjects(false)}
          >
            <div
              className={
                expandedProjects
                  ? classes['container-item-label-border']
                  : classes['container-item-label']
              }
            >
              PROJECTS
            </div>
            {expandedProjects && <DropdownMenu menuItems={projectsMenuItems} />}
          </div>
          {isLoggedIn ? (
            <div className={classes['container-item']}>
              <Link href="/my-profile">
                <Icon icon="carbon:user-avatar-filled-alt" />
              </Link>
            </div>
          ) : (
            <div className={classes['container-item-label']}>
              <Link href="/login">
                <a className={classes['main-nav-link']}>LOGIN</a>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default MainHeader;
