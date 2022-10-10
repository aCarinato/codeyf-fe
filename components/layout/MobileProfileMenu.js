// react / next
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
    currentUser,
    authState,
    ctxHasNotifications,
    setCtxHasNotifications,
  } = useMainContext();
  const { setShowMobileProfileMenu } = props;

  const readNotifications = async () => {
    setCtxHasNotifications(false);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/user/read-notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      }
    );
  };

  // const fetchUser = async () => {
  //   if (authState && authState.email.length > 0) {
  //     const email = authState.email;
  //     try {
  //       const res = await axios.post(
  //         `${process.env.NEXT_PUBLIC_API}/user/`,
  //         {
  //           email,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authState.token}`,
  //           },
  //         }
  //       );
  //       // console.log(res);
  //       if (res.data.success) {
  //         setCurrentUser(res.data.user);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

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
              <Link href="/my-profile/notifications">
                <a
                  className={
                    ctxHasNotifications
                      ? classes['main-nav-mob-link-notification']
                      : classes['main-nav-mob-link']
                  }
                  onClick={() => {
                    setShowMobileProfileMenu(false);
                    if (ctxHasNotifications) {
                      readNotifications();
                      // fetchUser();
                    }
                  }}
                >
                  NOTIFICATIONS{' '}
                  <span>
                    {ctxHasNotifications && (
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
            {currentUser && currentUser.isAdmin && (
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
