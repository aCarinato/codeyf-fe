import { useState, useEffect } from 'react';
import Link from 'next/link';
// own components
import Modal from '../UI/Modal';
// style
import classes from './MobileMenu.module.css';
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/Context';

function MobileMenu(props) {
  const { mobileView, authState } = useMainContext();

  const { setShowMobileMenu } = props;

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

  return (
    <Modal>
      <div className="mobile-filter-body">
        <div className="mobile-filter-header">
          <div></div>
          <div
            className="mobile-filter-close"
            onClick={() => setShowMobileMenu(false)}
          >
            X
          </div>
        </div>
        <div className={classes['menu-items']}>
          <ul className={classes['menu-ul']}>
            <li
              className={classes['menu-li']}
              onClick={() => setShowMobileMenu(false)}
            >
              {isLoggedIn ? (
                <Link href="/my-profile">
                  {/* <a className={classes['main-nav-mob-link']}>LOGIN</a> */}
                  <a className={classes['main-nav-mob-link']}>
                    <Icon icon="carbon:user-avatar-filled-alt" /> MY PROFILE
                  </a>
                </Link>
              ) : (
                <Link href="/login">
                  <a className={classes['main-nav-mob-link']}>LOGIN</a>
                </Link>
              )}
            </li>
            <li
              className={classes['menu-li']}
              onClick={() => setShowMobileMenu(false)}
            >
              <Link href="/">
                <a className={classes['main-nav-mob-link']}>HOME</a>
              </Link>
            </li>

            <li
              className={classes['menu-li']}
              onClick={() => setExpandedPeople(!expandedPeople)}
            >
              PEOPLE
            </li>

            {expandedPeople && (
              <ul>
                <li
                  className={classes['menu-sub-li']}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/people/coding-buddies">
                    <a className={classes['main-nav-mob-link']}>buddies</a>
                  </Link>
                </li>
                <li
                  className={classes['menu-sub-li']}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/people/coding-mentors">
                    <a className={classes['main-nav-mob-link']}>mentors</a>
                  </Link>
                </li>
              </ul>
            )}

            <li
              className={classes['menu-li']}
              onClick={() => setExpandedProjects(!expandedProjects)}
            >
              PROJECTS
            </li>

            {expandedProjects && (
              <ul>
                <li
                  className={classes['menu-sub-li']}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/projects/coding-groups">
                    <a className={classes['main-nav-mob-link']}>groups</a>
                  </Link>
                </li>
                <li
                  className={classes['menu-sub-li']}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/projects/coding-assignements">
                    <a className={classes['main-nav-mob-link']}>assignements</a>
                  </Link>
                </li>
              </ul>
            )}

            {/* <li className={classes['menu-li']}>LEARNING</li> */}
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default MobileMenu;
