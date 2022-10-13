// next react
import { useEffect, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';
// own components
import DMCard from '../../../components/message/direct-message/DMCard';
import AdminNotificationCard from '../../../components/message/admin-notification/AdminNotificationCard';
// packages
import axios from 'axios';

function NotificationPage() {
  const { authState, currentUser, setCurrentUserNotifications } =
    useMainContext();

  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);

  const fecthNotifications = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/message/render-notifications`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res.data);
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConversations = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/message/render-conversations`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log(res.data.conversations);
      if (res.data.success) {
        setConversations(res.data.conversations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fecthNotifications();
      // setNotifications(currentUser.notifications);
      fetchConversations();
    }
  }, [currentUser]);

  // console.log(currentUser);

  const readLastMsg = async (_id, messages, lastMessageIsRead) => {
    if (
      messages[messages.length - 1].from._id !== currentUser._id &&
      !lastMessageIsRead
    ) {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/message/read-last-msg`,
        {
          _id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // console.log('nNotificcations:' + res.data.nNotifications);
      setCurrentUserNotifications(res.data.nNotifications);
    }
  };

  const readAdminNotification = async (notificationId, isRead) => {
    if (!isRead) {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/message/read-notification`,
          {
            notificationId,
          },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        setCurrentUserNotifications(res.data.nNotifications);
        // console.log(res);
        // fecthNotifications();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h3>Notifications</h3>
      <br></br>
      <h4>Admin</h4>
      {currentUser && currentUser.hasNotifications && (
        <p>there are notification</p>
      )}
      <ul>
        {notifications.map((notification) => (
          <AdminNotificationCard
            key={notification._id}
            notificationId={notification._id}
            createdAt={notification.createdAt}
            isRead={notification.isRead}
            message={notification.message}
            readAdminNotification={readAdminNotification}
          />
        ))}
      </ul>
      <br></br>
      <h4>Direct messages</h4>
      {currentUser &&
        conversations &&
        conversations.length > 0 &&
        conversations.map((conversation) => (
          <DMCard
            key={conversation._id}
            _id={conversation._id}
            conversationUser={
              conversation.firstUser._id === currentUser._id
                ? conversation.secondUser.username
                : conversation.firstUser.username
            }
            messages={conversation.messages}
            lastMsgSender={conversation.messages[0].from.username}
            lastMsgText={conversation.messages[0].content}
            lastMessageIsRead={conversation.lastMessageIsRead}
            readLastMsg={readLastMsg}
            toHighlight={
              conversation.messages[conversation.messages.length - 1].from
                ._id !== currentUser._id && !conversation.lastMessageIsRead
                ? true
                : false
            }
          />
        ))}
    </div>
  );
}

export default NotificationPage;
