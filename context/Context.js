import React, { useContext, useState, useEffect, useRef } from 'react';
// packages
import axios from 'axios';
import io from 'socket.io-client';
// OWN FUNCTS
import getUserInfo from '../lib/helper/chats/getUserInfo';

const mainContext = React.createContext({ people: [], groups: [] });

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  //   SOCKET
  const socket = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const openChatId = useRef();

  // SOCIAL
  const [peoples, setPeople] = useState([]);
  const [groups, setGroups] = useState([]);

  const [ctxHasNotifications, setCtxHasNotifications] = useState(false);

  const [currentUserNotifications, setCurrentUserNotifications] = useState(0);

  // current logged in user
  const [currentUser, setCurrentUser] = useState(null);

  // Mobile
  const [mobileView, setMobileView] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 820) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    }
  }, []);

  // USER AUTHENTICATION
  const [authState, setAuthState] = useState({
    userId: '',
    username: '',
    email: '',
    token: '',
    isAdmin: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('codeyful-user-auth') !== null) {
        setAuthState(JSON.parse(localStorage.getItem('codeyful-user-auth')));
        // setAdminState(JSON.parse(localStorage.getItem('nappi-admin-auth')));
      }
    }
  }, []);

  const fetchUser = async () => {
    if (authState && authState.email.length > 0) {
      const email = authState.email;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/user/`,
          {
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (res.data.success) {
          setCurrentUser(res.data.user);
          setCurrentUserNotifications(res.data.user.nNotifications);
          // if (res.data.user.hasNotifications) {
          //   setCtxHasNotifications(true);
          // } else {
          //   setCtxHasNotifications(false);
          // }
          if (res.data.user.nNotifications > 0) {
            setCtxHasNotifications(true);
          } else {
            setCtxHasNotifications(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // current user
    fetchUser();
  }, [authState && authState.email]);

  // SOCKET
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // if (currentUser && currentUser._id.length > 0) {
        const userId = authState.userId;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/chats/${userId}`
        );
        setChats(res.data);
        // }

        // return { props: { chatsData: res.data } };
      } catch (err) {
        console.log(err);
        // return { props: { errorLoading: true } };
      }
    };

    const fetchNotifications = async () => {
      try {
        const userId = authState.userId;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/chats/notifications/${userId}`
        );
        // console.log(res);
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (authState !== undefined && authState.userId.length > 0) {
      fetchChats();
      fetchNotifications();
    }
  }, [authState]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
    }

    if (socket.current) {
      if (currentUser && currentUser._id.length > 0) {
        socket.current.emit('join', { userId: currentUser._id });

        socket.current.on('connectedUsers', ({ users }) => {
          // users.length > 0 && setConnectedUsers(users);
          setConnectedUsers(users);
        });
      }
    }
  }, [currentUser]);
  // console.log(connectedUsers);
  // console.log(currentUser);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msgSent', ({ newMsg }) => {
        if (newMsg.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);

          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.receiver
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;

            return [...prev];
          });
        }
      });

      socket.current.on('newMsgReceived', async ({ newMsg }) => {
        //     let senderName;

        // WHEN CHAT WITH SENDER IS CURRENTLY OPENED INSIDE YOUR BROWSER
        if (newMsg.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.sender
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;
            // senderName = previousChat.name;
            return [...prev];
          });
        }
        //  THE USER IS NOT CURRENTLY ON THE CHAT ONLINE
        else {
          const { username } = await getUserInfo(newMsg.sender);
          const newChat = {
            messagesWith: newMsg.sender,
            username,
            lastMessage: newMsg.msg,
            date: newMsg.date,
          };

          //   THIS IS NOT setting chats in the backend!! setChats is only on the frontend.
          //   The chats in the db are updated in app.js
          setChats((prev) => {
            const previousChat = Boolean(
              prev.find((chat) => chat.messagesWith === newMsg.sender)
            );

            if (previousChat) {
              return [
                newChat,
                ...prev.filter((chat) => chat.messagesWith !== newMsg.sender),
              ];
            } else {
              return [newChat, ...prev];
            }
          });

          //   (maybe) here I need to set the notifications
          const newNotification = {
            type: 'newChatMsg',
            from: newMsg.sender,
            text: `You have a new message in the conversation with: ${username}`,
            isRead: false,
            date: Date.now(),
          };
          setNotifications((prev) => {
            // find out if there are already notifications from that user
            const previousNotifications = Boolean(
              prev.find((notification) => notification.from === newMsg.sender)
            );

            if (previousNotifications) {
              return [
                newNotification,
                ...prev.filter(
                  (notification) => notification.from !== newMsg.sender
                ),
              ];
            } else {
              return [newNotification, ...prev];
            }
          });

          //   and then emit an event to the backend to tell to add a new notification
          //   console.log(newMsg.receiver);
          socket.current.emit('sendNotification', {
            senderId: newMsg.sender,
            receiverId: newMsg.receiver,
          });
        }
      });
    }
  }, []);

  // AUTH

  const loginHandler = (userId, username, email, token, isAdmin) => {
    //  saves the credentials in local storage and in the state
    // localStorage.setItem('token', token);

    // console.log(username, email, token, isAdmin);

    localStorage.setItem(
      'codeyful-user-auth',
      JSON.stringify({
        userId,
        username,
        email,
        token,
        isAdmin,
      })
    );

    setAuthState({
      userId,
      username,
      email,
      token,
      isAdmin,
    });
  };

  const logoutHandler = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('codeyful-user-auth');
    setAuthState({
      userId: '',
      username: '',
      email: '',
      token: '',
      isAdmin: '',
    });
  };

  const value = {
    mobileView,
    setMobileView,
    peoples,
    setPeople,
    groups,
    setGroups,
    authState,
    // SOCKET
    socket,
    openChatId,
    connectedUsers,
    chats,
    setChats,
    messages,
    setMessages,
    notifications,
    setNotifications,
    // LOGIN
    userLogin: loginHandler,
    userLogout: logoutHandler,
    currentUser,
    setCurrentUser,
    ctxHasNotifications,
    setCtxHasNotifications,
    currentUserNotifications,
    setCurrentUserNotifications,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
