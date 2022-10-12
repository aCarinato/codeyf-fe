import Link from 'next/link';
// pack
import { Icon } from '@iconify/react';
// styles
import classes from './LoggedUserIcon.module.css';
// context
import { useMainContext } from '../../context/Context';

function LoggedUserIcon(props) {
  const { mobileView, currentUserNotifications } = useMainContext();

  const { showMobileProfileMenu, setShowMobileProfileMenu } = props;

  console.log('currentUserNotifications: ' + currentUserNotifications);

  return (
    <div
      // className={
      //   ctxHasNotifications
      //     ? classes['container-item-notified']
      //     : classes['container-item']
      // }
      className={
        currentUserNotifications > 0
          ? classes['container-item-notified']
          : classes['container-item']
      }
    >
      {mobileView ? (
        <div onClick={() => setShowMobileProfileMenu(!showMobileProfileMenu)}>
          <Icon icon="carbon:user-avatar-filled-alt" />
          {currentUserNotifications > 0 && (
            <sup>
              <Icon icon="ci:notification" />
            </sup>
          )}
          {/* {ctxHasNotifications && (
            <sup>
              <Icon icon="ci:notification" />
            </sup>
          )} */}
        </div>
      ) : (
        <Link href="/my-profile">
          <div>
            <Icon icon="carbon:user-avatar-filled-alt" />
            {currentUserNotifications > 0 && (
              <sup>
                <Icon icon="ci:notification" />
              </sup>
            )}
            {/* {ctxHasNotifications && (
              <sup>
                <Icon icon="ci:notification" />
              </sup>
            )} */}
          </div>
        </Link>
      )}
    </div>
  );
}

export default LoggedUserIcon;
