import { useState } from 'react';
import Link from 'next/link';
import Modal from '../UI/Modal';

import classes from './MobileMenu.module.css';

function MobileMenu(props) {
  const { setShowMobileMenu } = props;

  const [expandedPeople, setExpandedPeople] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(false);

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
              <Link href="/">
                <a className={classes['main-nav-mob-link']}>HOME</a>
              </Link>
            </li>
            <li
              className={classes['menu-li']}
              onClick={() => setShowMobileMenu(false)}
            >
              <Link href="/login">
                <a className={classes['main-nav-mob-link']}>LOGIN</a>
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

            <li className={classes['menu-li']}>LEARNING</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default MobileMenu;
