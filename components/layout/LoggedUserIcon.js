import Link from 'next/link';
// pack
// next / react
import { useEffect, useState } from 'react';
// packages
import { Icon } from '@iconify/react';
// styles
import classes from './LoggedUserIcon.module.css';
// context
import { useMainContext } from '../../context/Context';

function LoggedUserIcon(props) {
  const { mobileView, notifications } = useMainContext();

  const { showMobileProfileMenu, setShowMobileProfileMenu } = props;

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    setUnreadNotifications(
      notifications.filter((notification) => notification.isRead === false)
    );
  }, [notifications]);

  return (
    <div
      className={
        unreadNotifications.length > 0
          ? classes['container-item-notified']
          : classes['container-item']
      }
    >
      {mobileView ? (
        <div onClick={() => setShowMobileProfileMenu(!showMobileProfileMenu)}>
          <Icon icon="carbon:user-avatar-filled-alt" />
          {unreadNotifications.length > 0 && (
            <sup>
              <Icon icon="ci:notification" />
            </sup>
          )}
        </div>
      ) : (
        <Link href="/my-profile">
          <div>
            <Icon icon="carbon:user-avatar-filled-alt" />
            {unreadNotifications.length > 0 && (
              <sup>
                <Icon icon="ci:notification" />
              </sup>
            )}
          </div>
        </Link>
      )}
    </div>
  );
}

export default LoggedUserIcon;
