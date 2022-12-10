import classes from './MainHeader.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
// own components
import DropdownMenu from './DropdownMenu';
import MobileMenu from './MobileMenu';
import MobileProfileMenu from './MobileProfileMenu';
import LoggedUserIcon from './LoggedUserIcon';
// context
import { useMainContext } from '../../context/Context';

function MainHeader() {
  const { mobileView, authState } = useMainContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false);

  const [expandedPeople, setExpandedPeople] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(false);

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
      name: 'teams',
      link: '/projects/coding-groups',
    },
    {
      id: '1',
      name: 'individual projects',
      link: '/projects/individual',
    },
    {
      id: '2',
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
      {showMobileProfileMenu && (
        <MobileProfileMenu
          setShowMobileProfileMenu={setShowMobileProfileMenu}
        />
      )}
      {mobileView ? (
        <div className="flex">
          <div
            className={classes['mobile-icon']}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Icon icon="charm:menu-hamburger" />
          </div>
          {authState.userId.length > 0 && (
            <LoggedUserIcon
              showMobileProfileMenu={showMobileProfileMenu}
              setShowMobileProfileMenu={setShowMobileProfileMenu}
            />
          )}
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
          {authState.userId.length > 0 ? (
            <LoggedUserIcon
              // hasNotifications={currentUser.hasNotifications}
              showMobileProfileMenu={showMobileProfileMenu}
              setShowMobileProfileMenu={setShowMobileProfileMenu}
            />
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
