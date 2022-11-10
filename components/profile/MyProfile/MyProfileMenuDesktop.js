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
  const { authState, notifications } = useMainContext();
  // const { readNotifications } = props;
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const [openProjectMenu, setOpenProjectMenu] = useState(false);

  useEffect(() => {
    setUnreadNotifications(
      notifications.filter(
        (notification) =>
          notification.type === 'newChatMsg' && notification.isRead === false
      )
    );
  }, [notifications]);

  return (
    <ul>
      <li className={classes['list-item']}>
        <Link href="/my-profile/chats">
          <div
            // onClick={readNotifications}
            className={
              authState.userId.length > 0 && unreadNotifications.length > 0
                ? 'notification-link'
                : 'main-link'
            }
          >
            {/* {unreadNotifications.length > 0 && (
              <span>{unreadNotifications.length} new</span>
            )}{' '} */}
            chats{' '}
            <span>
              {authState.userId.length > 0 && unreadNotifications.length > 0 && (
                <sup>
                  {unreadNotifications.length}{' '}
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
        projects
      </li>
      {openProjectMenu && (
        <>
          <li className={classes['list-subitem']}>
            <Link href="/my-profile/projects/notifications">notifications</Link>
          </li>
          <li className={classes['list-subitem']}>groups</li>
          <li className={classes['list-subitem']}>individual</li>
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
