// react / next
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import BtnCTA from '../../components/UI/BtnCTA';
import CompleteProfileForm from '../../components/profile/CompleteProfileForm';
import MyProfileMenuDesktop from '../../components/profile/MyProfile/MyProfileMenuDesktop';
// packages
import { Icon } from '@iconify/react';
import axios from 'axios';
// context
import { useMainContext } from '../../context/Context';
import { useRouter } from 'next/router';

function MyProfile() {
  const { authState, currentUser, mobileView } = useMainContext();

  const router = useRouter();

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

  // if (currentUser && currentUser.registrationCompleted === false)
  //   router.push('my-profile/complete-profile');

  return (
    <UserRoute>
      <div>
        <h2>MyProfile - {currentUser && currentUser.username}</h2>

        <br></br>

        <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
          {!mobileView && (
            <div>
              <MyProfileMenuDesktop
                currentUser={currentUser}
                readNotifications={readNotifications}
              />
            </div>
          )}
          <div>
            {currentUser && !currentUser.registrationCompleted && (
              <Fragment>
                <br></br>
                <Link href="/my-profile/complete-profile">
                  <p className="link-text">
                    <Icon icon="akar-icons:arrow-back" /> please complete your
                    profile
                  </p>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </UserRoute>
  );
}

export default MyProfile;
