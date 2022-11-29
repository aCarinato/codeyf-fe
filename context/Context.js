import React, { useContext, useState, useEffect, useRef } from 'react';
// packages
import axios from 'axios';
import io from 'socket.io-client';
import { isJwtExpired } from 'jwt-check-expiration';
import jwt from 'jsonwebtoken';
// OWN FUNCTS
import getUserInfo from '../lib/helper/chats/getUserInfo';
// import { useRouter } from 'next/router';

const mainContext = React.createContext();

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  // const router = useRouter();
  //   SOCKET
  const socket = useRef();
  const openChatId = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [groupNotifications, setGroupNotifications] = useState([]);
  // const [groupNotificationsFrom, setGroupNotificationsFrom] = useState([]);

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

  // a and b are javascript Date objects
  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  // DECODE TOKEN
  useEffect(() => {
    if (authState.token !== '' && authState.token.length > 0) {
      const decodedToken = jwt.verify(
        authState.token,
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      // console.log(`decodedToken.exp: ${decodedToken.iat * 1000}`);
      const exp = new Date(decodedToken.exp * 1000);
      // const currTimeStamp = new Date().getTime();
      // test it
      const a = new Date(decodedToken.exp * 1000),
        b = new Date(),
        difference = dateDiffInDays(a, b);

      // console.log(difference + ' days');
      // console.log(difference > -4);
    }
  }, []);

  useEffect(() => {
    if (authState.token.length > 0) {
      if (isJwtExpired(authState.token)) {
        // console.log('isExpired is:', isJwtExpired(authState.token));
        localStorage.removeItem('codeyful-user-auth');
        setAuthState({
          userId: '',
          username: '',
          email: '',
          token: '',
          isAdmin: '',
        });
      }
    }
  }, []);

  // SOCKET
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // if (currentUser && currentUser._id.length > 0) {
        // const userId = authState.userId;

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

    const fetchChatNotifications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/chats/notifications/`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        // console.log(res);
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchGroupNotifications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/groups/notifications/${authState.userId}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        // console.log(res.data);
        // here I need to filter out notifications sent to myself (maybe)
        setGroupNotifications(res.data.notifications);
        // setGroupNotificationsFrom(res.data.notificationsFrom);
        // setGroupNotificationsTo(res.data.notificationsTo);
        // console.log(res.data);
        // setGroupNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (authState !== undefined && authState.token.length > 0) {
      fetchChats();
      fetchChatNotifications();
      fetchGroupNotifications();
    }
  }, [mobileView, authState && authState.token]);

  // console.log('groupNotifications from Context.js');
  // console.log(groupNotifications);

  useEffect(() => {
    // if (authState !== undefined && authState.userId.length > 0) {
    if (!socket.current) {
      socket.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
      // console.log(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
      // console.log(`socket.id: ${socket.id}`);
    }

    if (socket.current) {
      // console.log(`socket.id: ${socket.id}`);
      `${process.env.NEXT_PUBLIC_SOCKET_URL}`;
      // if (currentUser && currentUser._id.length > 0) {
      if (authState !== undefined && authState.userId.length > 0) {
        socket.current.emit('join', { userId: authState.userId });

        socket.current.on('connectedUsers', ({ users }) => {
          // users.length > 0 && setConnectedUsers(users);
          setConnectedUsers(users);
        });
      }
    }
  }, [authState]);
  // }, [authState && authState.userId]);

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
          // THIS TYPICALLY DOESN'T WORK!! o maybe yess..
          const { username } = await getUserInfo(
            newMsg.sender
            // `Bearer ${authState.token}`
          );
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
          socket.current.emit('sendChatNotification', {
            senderId: newMsg.sender,
            receiverId: newMsg.receiver,
          });
        }
      });
    }
  }, []);

  // GROUP NOTIFICATIONS
  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        'joinedGroupNotification',
        async ({ organiserId, userToAddId, groupId, type }) => {
          // console.log(
          //   `4) from Context.js - 'joinedGroupNotification' - organiserId: ${organiserId}, userToAddId: $, groupId, type: ${type}`
          // );

          if (type === 'buddy') {
            const newNotification = {
              _id: Math.floor(Math.random() * 10),
              type: 'groupJoinedAsBuddy',
              from: organiserId,
              text: `You have been added to a new team as a buddy`,
              groupId: groupId,
              isRead: false,
              date: Date.now(),
            };
            setGroupNotifications((prev) => [newNotification, ...prev]);
          } else if (type === 'mentor') {
            const newNotification = {
              _id: Math.floor(Math.random() * 10),
              type: 'groupJoinedAsMentor',
              from: organiserId,
              text: `You have been added to a new team as a mentor`,
              groupId: groupId,
              isRead: false,
              date: Date.now(),
            };
            setGroupNotifications((prev) => [newNotification, ...prev]);
          }

          socket.current.emit('saveGroupJoinedNotification', {
            organiserId,
            userToAddId,
            groupId,
            type,
          });
        }
      );
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

    if (socket.current) {
      // if (authState && authState.username !== '') {

      socket.current.emit('leave', { userId: authState.userId });
    }
  };

  const value = {
    mobileView,
    setMobileView,
    // SOCKET
    socket,
    openChatId,
    connectedUsers,
    chats,
    setChats,
    // addChat,
    messages,
    setMessages,
    notifications,
    setNotifications,
    // groups
    groupNotifications,
    setGroupNotifications,
    // groupNotificationsFrom,
    // setGroupNotificationsFrom,
    // AUTH
    authState,
    userLogin: loginHandler,
    userLogout: logoutHandler,
    currentUser,
    setCurrentUser,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
