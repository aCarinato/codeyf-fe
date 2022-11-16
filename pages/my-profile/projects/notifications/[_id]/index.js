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

  console.log(notification);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <>
          {notification.type === 'groupJoinedAsBuddy' && (
            <div>
              <h3>You joined a new team as a buddy!</h3>
              <br></br>
              <GroupCard
                id={notification.groupId._id}
                group={notification.groupId}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProjectNotificationPage;
