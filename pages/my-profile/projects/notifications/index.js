// next react
import { useEffect, useState } from 'react';
// own components
import UserRoute from '../../../../components/routes/UserRoute';
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import TeamNotification from '../../../../components/message/teams/TeamNotification';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../../context/Context';

function ProjectNotificationsPage() {
  const { authState, groupNotifications, setGroupNotifications } =
    useMainContext();

  const [loading, setLoading] = useState(false);

  const [localNotifications, setLocalNotifications] = useState([]);

  // Fetch the notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const userId = authState.userId;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/groups/notifications/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        setGroupNotifications(res.data.notifications);
        setLocalNotifications(res.data.notifications);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    if (authState !== undefined && authState.token.length > 0)
      fetchNotifications();
  }, [authState]);

  // FILTER OUT NOTIFICATION FROM MYSELF!!!
  console.log(localNotifications);
  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <UserRoute>
          {localNotifications.map((notification) => (
            <TeamNotification
              key={notification._id}
              notification={notification}
            />
          ))}
        </UserRoute>
      )}
    </>
  );
}

export default ProjectNotificationsPage;
