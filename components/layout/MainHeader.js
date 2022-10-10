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
  const { mobileView, authState, currentUser } = useMainContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false);

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
          {
            currentUser && isLoggedIn && (
              <LoggedUserIcon
                hasNotifications={currentUser.hasNotifications}
                showMobileProfileMenu={showMobileProfileMenu}
                setShowMobileProfileMenu={setShowMobileProfileMenu}
              />
            )
            // <div
            //   className={
            //     currentUser && currentUser.hasNotifications
            //       ? classes['container-item-notified']
            //       : classes['container-item']
            //   }
            //   onClick={() => setShowMobileProfileMenu(!showMobileProfileMenu)}
            // >
            //   <div>
            //     <Icon icon="carbon:user-avatar-filled-alt" />
            //     {currentUser && currentUser.hasNotifications && (
            //       <sup>
            //         <Icon icon="ci:notification" />
            //       </sup>
            //     )}
            //   </div>
            // </div>
          }
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
          {currentUser && isLoggedIn ? (
            <LoggedUserIcon
              hasNotifications={currentUser.hasNotifications}
              showMobileProfileMenu={showMobileProfileMenu}
              setShowMobileProfileMenu={setShowMobileProfileMenu}
            />
          ) : (
            // <div
            //   className={
            //     currentUser && currentUser.hasNotifications
            //       ? classes['container-item-notified']
            //       : classes['container-item']
            //   }
            // >
            //   <Link href="/my-profile">
            //     <div>
            //       <Icon icon="carbon:user-avatar-filled-alt" />
            //       {currentUser && currentUser.hasNotifications && (
            //         <sup>
            //           <Icon icon="ci:notification" />
            //         </sup>
            //       )}
            //     </div>
            //   </Link>
            // </div>
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
