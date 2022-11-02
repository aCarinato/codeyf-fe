// react / next
import { useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import Modal from '../UI/Modal';
// style
import classes from './MobileProfileMenu.module.css';
// packages
import { Icon } from '@iconify/react';
import axios from 'axios';
// context
import { useMainContext } from '../../context/Context';

function MobileProfileMenu(props) {
  const { authState, notifications } = useMainContext();
  const { setShowMobileProfileMenu } = props;

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    setUnreadNotifications(
      notifications.filter((notification) => notification.isRead === false)
    );
  }, [notifications]);

  return (
    <Modal>
      <div className="mobile-filter-body">
        <div className="mobile-filter-header">
          <div></div>
          <div
            className="mobile-filter-close"
            onClick={() => setShowMobileProfileMenu(false)}
          >
            X
          </div>
        </div>
        <div className={classes['menu-items']}>
          <ul className={classes['menu-ul']}>
            <li className={classes['menu-li']}>
              <Link href="/my-profile">
                <a
                  className={classes['main-nav-mob-link']}
                  onClick={() => setShowMobileProfileMenu(false)}
                >
                  MY PROFILE
                </a>
              </Link>
            </li>
            <li className={classes['menu-li']}>
              <Link href="/my-profile/messages">
                <a
                  className={
                    unreadNotifications.length > 0
                      ? classes['main-nav-mob-link-notification']
                      : classes['main-nav-mob-link']
                  }
                  onClick={() => {
                    setShowMobileProfileMenu(false);
                    // if (currentUserNotifications > 0) {
                    //   readNotifications();
                    // }
                  }}
                >
                  {unreadNotifications.length > 0 && (
                    <span>{unreadNotifications.length} NEW</span>
                  )}{' '}
                  MESSAGES{' '}
                  <span>
                    {unreadNotifications.length > 0 && (
                      <sup>
                        <Icon icon="ci:notification" />
                      </sup>
                    )}
                  </span>
                </a>
              </Link>
            </li>
            <li className={classes['menu-li']}>
              <Link href="/my-profile/settings">
                <a
                  className={classes['main-nav-mob-link']}
                  onClick={() => setShowMobileProfileMenu(false)}
                >
                  <Icon icon="bytesize:settings" /> SETTINGS
                </a>
              </Link>
            </li>
            {authState.userId.length > 0 && authState.isAdmin && (
              <li className={classes['menu-li']}>
                <Link href="/admin">
                  <a
                    className={classes['main-nav-mob-link']}
                    onClick={() => setShowMobileProfileMenu(false)}
                  >
                    ADMIN DASHBOARD
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default MobileProfileMenu;
