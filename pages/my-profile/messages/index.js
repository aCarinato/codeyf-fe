import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
// context
import { useMainContext } from '../../../context/Context';
// own components
import UserRoute from '../../../components/routes/UserRoute';
import MsgInput from '../../../components/message/chat/MsgInput';
import ChatName from '../../../components/message/chat/ChatName';
import ChatMsg from '../../../components/message/chat/ChatMsg';

// import axios from 'axios';
const scrollDivToBottom = (divRef) =>
  divRef &&
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behaviour: 'smooth' });

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
  const divRef = useRef();

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

  // LOAD MESSAGES useEffect
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: authState.userId,
        messagesWith: router.query.message,
      });

      socket.current.on('messagesLoaded', async ({ chat }) => {
        setMessages(chat.messages);
        openChatId.current = chat.messagesWith._id;
        // divRef && divRef.current && scrollDivToBottom(divRef);
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

  useEffect(() => {
    divRef.current !== undefined &&
      messages.length > 0 &&
      scrollDivToBottom(divRef);
  }, [messages]);

  return (
    <UserRoute>
      <div>
        <h1>Messages</h1>
        <br></br>

        {chats.length > 0 ? (
          <>
            {/* <div>CIAO ALE IL GENIO</div> */}
            <div className="grid grid---2cols-20-80 border-top-primary">
              <div className="chat-conversation-list-div">
                {chats.map((chat) => (
                  <ChatName
                    key={chat.messagesWith}
                    chat={chat}
                    connectedUsers={connectedUsers}
                    notifications={notifications}
                    readNotification={readNotification}
                  />
                ))}
              </div>
              <div>
                {router.query.message && (
                  <div className="chat-conversation-div">
                    <div className="chat-conversation-msgs-div">
                      {messages.map((msg) => (
                        <ChatMsg
                          key={msg._id}
                          divRef={divRef}
                          msg={msg}
                          userId={authState.userId}
                        />
                      ))}
                    </div>
                    <MsgInput
                      msgToSend={msgToSend}
                      setMsgToSend={setMsgToSend}
                      sendMsg={sendMsg}
                    />
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
