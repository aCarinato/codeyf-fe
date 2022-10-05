// context
import { useEffect, useState } from 'react';
import { useMainContext } from '../../../context/Context';

function NotificationPage() {
  const { authState, currentUser, userLogout } = useMainContext();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (currentUser) setNotifications(currentUser.notifications);
  }, [currentUser]);

  // console.log(currentUser);

  return (
    <div>
      <h3>Notifications</h3>
      <br></br>
      {currentUser && currentUser.hasNotifications && (
        <p>there are notification</p>
      )}
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationPage;
