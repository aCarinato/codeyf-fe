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
  const {
    mobileView,
    notifications,
    groupNotifications,
    groupNotificationsFrom,
  } = useMainContext();

  const { showMobileProfileMenu, setShowMobileProfileMenu } = props;

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const [nUnreadNotifications, setNUnreadNotifications] = useState('');

  useEffect(() => {
    const nGroupNotifications = groupNotifications.filter(
      (notification) => notification.isRead === false
    ).length;

    const nNotifications = notifications.filter(
      (notification) => notification.isRead === false
    ).length;

    setNUnreadNotifications(
      Number(nGroupNotifications) + Number(nNotifications)
    );

    setUnreadNotifications(
      notifications.filter((notification) => notification.isRead === false)
    );
  }, [notifications, groupNotifications]);
  // console.log(nUnreadNotifications);
  return (
    <div
      className={
        nUnreadNotifications > 0
          ? classes['container-item-notified']
          : classes['container-item']
      }
    >
      {mobileView ? (
        <div onClick={() => setShowMobileProfileMenu(!showMobileProfileMenu)}>
          <Icon icon="carbon:user-avatar-filled-alt" />
          {nUnreadNotifications > 0 && (
            <sup>
              {/* <Icon icon="ci:notification" /> */}
              <Icon icon="eva:message-circle-fill" />
            </sup>
          )}
        </div>
      ) : (
        <Link href="/my-profile">
          <div>
            <Icon icon="carbon:user-avatar-filled-alt" />
            {nUnreadNotifications > 0 && (
              <sup>
                {/* <Icon icon="ci:notification" /> */}
                <Icon icon="eva:message-circle-fill" />
              </sup>
            )}
          </div>
        </Link>
      )}
    </div>
  );
}

export default LoggedUserIcon;
