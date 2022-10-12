// next react
import { useEffect, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';
// own components
import DMCard from '../../../components/message/direct-message/DMCard';
// packages
import axios from 'axios';

function NotificationPage() {
  const { authState, currentUser, setCurrentUserNotifications } =
    useMainContext();

  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);

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
      setNotifications(currentUser.notifications);
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
      console.log('nNotificcations:' + res.data.nNotifications);
      setCurrentUserNotifications(res.data.nNotifications);
    }
    // else {
    //   console.log('NO TE ME INCUIII');
    // }

    // fetchConversations();
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
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
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
