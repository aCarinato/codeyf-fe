import classes from './MyProfileMenuDesktop.module.css';
// react / next
import Link from 'next/link';
// packages
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../../context/Context';

function MyProfileMenuDesktop(props) {
  const { ctxHasNotifications, setCtxHasNotifications } = useMainContext();
  const { currentUser, readNotifications } = props;

  return (
    <ul>
      <li className={classes['list-item']}>
        <Link href="/my-profile/notifications">
          <div
            onClick={readNotifications}
            className={
              currentUser && ctxHasNotifications
                ? 'notification-link'
                : 'main-link'
            }
          >
            notifications{' '}
            <span>
              {currentUser && ctxHasNotifications && (
                <sup>
                  <Icon icon="ci:notification" />
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
      {currentUser && currentUser.isAdmin && (
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
