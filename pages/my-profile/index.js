// react / next
import { Fragment } from 'react';
import Link from 'next/link';
// own components
import UserRoute from '../../components/routes/UserRoute';
import MyProfileMenuDesktop from '../../components/profile/MyProfile/MyProfileMenuDesktop';
import MyProfileDetails from '../../components/profile/MyProfile/MyProfileDetails';
// packages
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/Context';
// import { useRouter } from 'next/router';

function MyProfile() {
  const { authState, currentUser, mobileView } = useMainContext();

  // const router = useRouter();

  // if (currentUser)
  //   console.log('currentUser.nNotifications: ' + currentUser.nNotifications);

  return (
    <UserRoute>
      <div>
        <h2>MyProfile - {currentUser && currentUser.username}</h2>

        <br></br>

        <div className={mobileView ? 'grid' : `grid grid---2cols-15-85`}>
          {!mobileView && (
            <div>
              <MyProfileMenuDesktop />
            </div>
          )}
          <div>
            {currentUser && !currentUser.registrationCompleted ? (
              <Fragment>
                <br></br>
                <Link href="/my-profile/complete-profile">
                  <p className="link-text">
                    <Icon icon="akar-icons:arrow-back" /> please complete your
                    profile
                  </p>
                </Link>
                <br></br>
                <p>Once you complete your profile you will be able to:</p>
                <br></br>
                <ul>
                  <li>Pick individual assignments</li>
                  <li>Create and manage team projects</li>
                  <li>Participate to team projects</li>
                  <li>
                    Appear on the list of buddies and beign found by others
                  </li>
                </ul>
              </Fragment>
            ) : (
              <Fragment>
                {currentUser && (
                  <MyProfileDetails
                    username={currentUser.username}
                    shortDescription={currentUser.shortDescription}
                    longDescription={currentUser.longDescription}
                    country={currentUser.country}
                    languages={currentUser.languages}
                    profilePic={currentUser.profilePic}
                    github={currentUser.github}
                    isBuddy={currentUser.isBuddy}
                    currentlyAvailableAsBuddy={
                      currentUser.currentlyAvailableAsBuddy
                    }
                    mentorPendingApproval={currentUser.mentorPendingApproval}
                    isMentor={currentUser.isMentor}
                    currentlyAvailableAsMentor={
                      currentUser.currentlyAvailableAsMentor
                    }
                    topics={currentUser.topics}
                    learning={currentUser.learning}
                    skillsLevel={currentUser.skillsLevel}
                    companyJob={currentUser.companyJob}
                    linkedin={currentUser.linkedin}
                    yearsExperience={currentUser.yearsExperience}
                    teaching={currentUser.teaching}
                  />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </UserRoute>
  );
}

export default MyProfile;
