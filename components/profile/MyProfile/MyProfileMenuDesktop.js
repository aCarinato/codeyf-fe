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

  useEffect(() => {
    setUnreadNotifications(
      notifications.filter((notification) => notification.isRead === false)
    );
  }, [notifications]);

  return (
    <ul>
      <li className={classes['list-item']}>
        <Link href="/my-profile/messages">
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
            messages{' '}
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
      <li className={classes['list-item']}>My Groups</li>
      <li className={classes['list-item']}>My Assignments</li>
      <li className={classes['list-item']}>My Groups</li>
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
