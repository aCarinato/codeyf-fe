// next / react
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// libs
import axios from 'axios';
// component
import SpinningLoader from '../../../../../components/UI/SpinningLoader';
// import BuddyCard from '../../../../../components/people/BuddyCard';
import GroupCard from '../../../../../components/groups/GroupCard';
// context
import { useMainContext } from '../../../../../context/Context';
// import BtnCTA from '../../../../../components/UI/BtnCTA';

function ProjectNotificationPage() {
  const { authState, socket } = useMainContext();

  const router = useRouter();
  const { query } = router;
  const notificationId = query._id;

  const userId = authState.userId;

  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  const fetchNotification = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/groups/notification-from/${userId}/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log('res.data.notification');
      // console.log(res.data.notification);
      setNotification(res.data.notification);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      notificationId !== undefined &&
      notificationId.length > 0 &&
      userId !== undefined &&
      userId.length > 0
    )
      fetchNotification();
  }, [notificationId, userId]);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          {notification.type === 'groupJoined' && (
            <div>
              <h3>You joined a new team!</h3>
              {/* <br></br>
              <h4>Request from</h4>
              <br></br>
              <BuddyCard
                userId={notification.from._id}
                username={notification.from.username}
                handle={notification.from.handle}
                description={notification.from.shortDescription}
                country={notification.from.country}
                learning={notification.from.learning}
                profilePic={notification.from.profilePic}
              /> */}

              <br></br>
              <GroupCard
                id={notification.groupId._id}
                name={notification.groupId.name}
                description={notification.groupId.description}
                techStack={notification.groupId.learning}
                nBuddies={notification.groupId.nBuddies}
                buddies={notification.groupId.buddies}
              />
              {/* <br></br>
              <p>Would you like to participate in the group?</p>
              <div className="flex">
                <div>
                  <BtnCTA
                    label="Yes"
                    onCLickAction={() => sendJoinRes('yes')}
                  />
                </div>
                <div>
                  <BtnCTA label="No" onCLickAction={() => sendJoinRes('no')} />
                </div>
              </div> */}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProjectNotificationPage;
