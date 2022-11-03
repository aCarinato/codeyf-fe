import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';
// own components
import UserRoute from '../../../components/routes/UserRoute';

import axios from 'axios';

function MessagesPage() {
  const {
    authState,
    socket,
    openChatId,
    messages,
    setMessages,
    connectedUsers,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = useMainContext();

  const router = useRouter();
  // This ref is for persisting the state of query string in url throughout re-renders. This ref is the value of query string inside url
  // const openChatId = useRef(); // CONTEXT

  // const [messages, setMessages] = useState([]); // CONTEXT
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? 'with' : 'without'
      //   } shallow routing`
      // );

      if (!url.includes('messages?message=')) openChatId.current = '';
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // if (currentUser && currentUser._id.length > 0) {
        // const userId = authState.userId;

        // // SHOULD BE A PRIVATE ROUTE !!!
        // const res = await axios.get(
        //   `${process.env.NEXT_PUBLIC_API}/chats/${userId}`
        // );
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/chats`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        setChats(res.data);
      } catch (err) {
        console.log(err);
        // return { props: { errorLoading: true } };
      }
    };

    fetchChats();
  }, []);

  console.log(chats);

  // LOAD MESSAGES useEffect
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: authState.userId,
        messagesWith: router.query.message,
      });

      socket.current.on('messagesLoaded', async ({ chat }) => {
        setMessages(chat.messages);
        // setBannerData({
        //   name: chat.messagesWith.name,
        //   profilePicUrl: chat.messagesWith.profilePicUrl,
        // });

        openChatId.current = chat.messagesWith._id;
        // divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on('noChatFound', async () => {
        //   const { name, profilePicUrl } = await getUserInfo(router.query.message);

        //   setBannerData({ name, profilePicUrl });
        setMessages([]);

        openChatId.current = router.query.message;
      });
    };

    if (socket.current && router.query.message) loadMessages();
  }, [router.query.message]);

  //   SENDING A MESSAGE
  const [msgToSend, setMsgToSend] = useState('');
  const sendMsg = () => {
    if (socket.current) {
      if (authState && authState.email.length > 0) {
        socket.current.emit('sendNewMsg', {
          userId: authState.userId,
          receiverId: openChatId.current,
          msg: msgToSend,
        });
      }
      setMsgToSend('');
    }
  };

  // READ A NOTIFICATION
  const readNotification = (msgFrom) => {
    router.push(`/my-profile/messages?message=${msgFrom}`, undefined, {
      // shallow: true,
    });

    // remove notifications from frontend
    // setNotifications find the index of the current notification
    const index = notifications.map((item) => item.from).indexOf(msgFrom);

    if (index !== -1) {
      // REMOVE NOTIFICATION (intial approach, then opted to read it)
      // setNotifications((prev) => prev.splice(index, 1)); // DOES NOT WORK
      //   setNotifications((prev) =>
      //     prev.map((item) => item.from).filter((itm) => itm !== msgFrom)
      //   );

      // READ NOTIFICATION
      setNotifications((prev) => {
        const previousNotification = prev.find(
          (notification) => notification.from === msgFrom
        );
        previousNotification.isRead = true;

        return [...prev];
      });
    }

    // emit event to remove notification from backend
    const notificationTo = authState.userId;
    socket.current.emit('readNotification', {
      notificationTo,
      msgFrom,
    });
  };

  return (
    <UserRoute>
      <div>
        <h1>MessagesPage</h1>

        <>
          {notifications && notifications.length > 0 && (
            <>
              <p>Notifications</p>
              {notifications.map((notification) => (
                <div
                  className={
                    notification.isRead
                      ? 'notification-card'
                      : 'notification-card notification-unread'
                  }
                  key={notification._id}
                  onClick={() => readNotification(notification.from)}
                >
                  {notification.text}
                </div>
              ))}
              <br></br>
            </>
          )}
        </>

        {chats.length > 0 ? (
          <>
            <div>CIAO ALE IL GENIO</div>
            <div className="grid grid---2cols-15-85">
              <div>
                {chats.map((chat) => (
                  <div
                    className="chat-card"
                    key={chat.messagesWith}
                    onClick={() =>
                      router.push(
                        `/my-profile/messages?message=${chat.messagesWith}`,
                        undefined
                        // {
                        //   shallow: true,
                        // }
                      )
                    }
                  >
                    <p>Chat with: {chat.username}</p>
                    {connectedUsers
                      .map((item) => item.userId)
                      .includes(chat.messagesWith) ? (
                      <p className="user-online">online</p>
                    ) : (
                      <p className="user-offline">offline</p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                {router.query.message && (
                  <div>
                    MESSAGGI
                    {messages.map((msg) => (
                      <div
                        className={
                          msg.sender === authState.userId ? 'own-msg' : 'msg'
                        }
                        key={msg._id}
                      >
                        {/* {JSON.stringify(msg)} */}
                        <p className="p-msg">
                          {msg.msg} <span onClick={() => {}}>X</span>
                        </p>
                      </div>
                    ))}
                    <div>
                      <input
                        type="text"
                        value={msgToSend}
                        onChange={(e) => setMsgToSend(e.target.value)}
                      />
                      <button onClick={sendMsg}>send</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>No chats</p>
        )}
      </div>
    </UserRoute>
  );
}

export default MessagesPage;
