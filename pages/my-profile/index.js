// react / next
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import BtnCTA from '../../components/UI/BtnCTA';
import CompleteProfileForm from '../../components/profile/CompleteProfileForm';
// packages
import { Icon } from '@iconify/react';
import axios from 'axios';
// context
import { useMainContext } from '../../context/Context';

function MyProfile() {
  const { authState, currentUser, userLogout } = useMainContext();

  const readNotifications = async () => {
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

  return (
    <UserRoute>
      <div>
        <div className="flex flex-justify-space-between">
          <h2>MyProfile - {currentUser && currentUser.username}</h2>
          <div>
            <Link href="/my-profile/settings">
              <div className="main-link">
                <Icon icon="bytesize:settings" /> settings
              </div>
            </Link>
            {currentUser && currentUser.isAdmin && (
              <Link href="/admin">
                <div className="main-link">admin dashboard</div>
              </Link>
            )}
          </div>
        </div>

        <br></br>
        {currentUser && currentUser.registrationCompleted ? (
          <div>
            <h4>YOUR PROFILE PAGE</h4>
            <br></br>
            {currentUser && currentUser.mentorPendingApproval && (
              <Fragment>
                <br></br>
                <p>Your mentor application is being processed</p>
              </Fragment>
            )}
            <Link href="/my-profile/notifications">
              <div
                onClick={readNotifications}
                className={
                  currentUser.hasNotifications
                    ? 'notification-link'
                    : 'main-link'
                }
              >
                notifications{' '}
                <span>
                  {currentUser.hasNotifications && (
                    <sup>
                      <Icon icon="ci:notification" />
                    </sup>
                  )}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <CompleteProfileForm />
          </div>
        )}
      </div>
    </UserRoute>
  );
}

export default MyProfile;
