// rext /next
import { useEffect, useState } from 'react';
// styles
import classes from './MyProfileMenuDesktop.module.css';
// react / next
import Link from 'next/link';
// packages
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../../context/Context';

function MyProfileMenuDesktop(props) {
  const {
    authState,
    notifications,
    groupNotifications,
    groupNotificationsFrom,
  } = useMainContext();
  // const { readNotifications } = props;
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
    <ul>
      <li className={classes['list-item']}>
        <Link href="/my-profile/chats">
          <div
            // onClick={readNotifications}
            className={
              authState.userId.length > 0 && unreadChatNotifications.length > 0
                ? 'notification-link'
                : 'main-link'
            }
          >
            {/* {unreadNotifications.length > 0 && (
              <span>{unreadNotifications.length} new</span>
            )}{' '} */}
            chats{' '}
            <span>
              {authState.userId.length > 0 &&
                unreadChatNotifications.length > 0 && (
                  <sup>
                    {unreadChatNotifications.length}{' '}
                    <Icon icon="eva:message-circle-fill" />
                  </sup>
                )}
            </span>
          </div>
        </Link>
      </li>
      <li
        className={classes['list-item']}
        onClick={() => setOpenProjectMenu((prev) => !prev)}
      >
        <div
          className={
            authState.userId.length > 0 && unreadGroupNotifications.length > 0
              ? 'notification-link'
              : 'main-link'
          }
        >
          projects{' '}
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
      <li className={classes['list-item']}>
        <Link href="/my-profile/settings">
          <div className="main-link">
            <Icon icon="bytesize:settings" /> settings
          </div>
        </Link>
      </li>
      {authState.userId.length > 0 && authState.isAdmin && (
        <li className={classes['list-item']}>
          <Link href="/admin">
            <div className="main-link">admin dashboard</div>
          </Link>
        </li>
      )}
    </ul>
  );
}

export default MyProfileMenuDesktop;
