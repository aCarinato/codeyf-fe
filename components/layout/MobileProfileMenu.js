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
  const {
    authState,
    notifications,
    groupNotifications,
    groupNotificationsFrom,
  } = useMainContext();
  const { setShowMobileProfileMenu } = props;

  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [unreadChatNotifications, setUnreadChatNotifications] = useState([]);
  const [unreadGroupNotifications, setUnreadGroupNotifications] = useState([]);

  const [openProjectMenu, setOpenProjectMenu] = useState(false);

  useEffect(() => {
    setUnreadChatNotifications(
      notifications.filter(
        (notification) =>
          notification.type === 'newChatMsg' && notification.isRead === false
      )
    );

    setUnreadGroupNotifications(
      groupNotifications.filter((notification) => notification.isRead === false)
    );

    // setUnreadNotifications(
    //   notifications.filter(
    //     (notification) =>
    //       notification.type === 'newChatMsg' && notification.isRead === false
    //   )
    // );
  }, [notifications, groupNotifications]);

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
              <Link href="/my-profile/chats">
                <a
                  className={
                    unreadChatNotifications.length > 0
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
                  {unreadChatNotifications.length > 0 && (
                    <span>{unreadChatNotifications.length} NEW</span>
                  )}{' '}
                  MESSAGES{' '}
                  <span>
                    {unreadChatNotifications.length > 0 && (
                      <sup>
                        <Icon icon="ci:notification" />
                      </sup>
                    )}
                  </span>
                </a>
              </Link>
            </li>
            <li
              className={classes['menu-li']}
              onClick={() => setOpenProjectMenu((prev) => !prev)}
            >
              <div
                className={
                  authState.userId.length > 0 &&
                  unreadGroupNotifications.length > 0
                    ? 'notification-link'
                    : 'main-link'
                }
              >
                PROJECTS{' '}
                <span>
                  {authState.userId.length > 0 &&
                    unreadGroupNotifications.length > 0 && (
                      <sup>
                        {unreadGroupNotifications.length}{' '}
                        <Icon icon="eva:message-circle-fill" />
                      </sup>
                    )}
                </span>
              </div>
            </li>
            {openProjectMenu && (
              <>
                <li className={classes['list-subitem']}>
                  <Link href="/my-profile/projects/notifications">
                    <div
                      className={
                        authState.userId.length > 0 &&
                        unreadGroupNotifications.length > 0
                          ? 'notification-link'
                          : 'main-link'
                      }
                    >
                      notifications
                    </div>
                  </Link>
                </li>
                <li className={classes['list-subitem']}>
                  <Link href="/my-profile/projects/teams">teams</Link>
                </li>
                <li className={classes['list-subitem']}>
                  <Link href="/my-profile/projects/individual">individual</Link>
                </li>
              </>
            )}
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
