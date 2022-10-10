import Link from 'next/link';
// pack
import { Icon } from '@iconify/react';
// styles
import classes from './LoggedUserIcon.module.css';
// context
import { useMainContext } from '../../context/Context';

function LoggedUserIcon(props) {
  const { mobileView, ctxHasNotifications, setCtxHasNotifications } =
    useMainContext();

  const { hasNotifications, showMobileProfileMenu, setShowMobileProfileMenu } =
    props;

  console.log(ctxHasNotifications);

  return (
    <div
      className={
        ctxHasNotifications
          ? classes['container-item-notified']
          : classes['container-item']
      }
    >
      {mobileView ? (
        <div onClick={() => setShowMobileProfileMenu(!showMobileProfileMenu)}>
          <Icon icon="carbon:user-avatar-filled-alt" />
          {ctxHasNotifications && (
            <sup>
              <Icon icon="ci:notification" />
            </sup>
          )}
        </div>
      ) : (
        <Link href="/my-profile">
          <div>
            <Icon icon="carbon:user-avatar-filled-alt" />
            {ctxHasNotifications && (
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
