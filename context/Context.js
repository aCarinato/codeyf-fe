import React, { useContext, useState, useEffect } from 'react';

import axios from 'axios';

const mainContext = React.createContext({ people: [], groups: [] });

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
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
    username: '',
    email: '',
    token: '',
    isAdmin: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthState(JSON.parse(localStorage.getItem('codeyful-user-auth')));
      // setAdminState(JSON.parse(localStorage.getItem('nappi-admin-auth')));
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
        // console.log(res);
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

  const loginHandler = (username, email, token, isAdmin) => {
    //  saves the credentials in local storage and in the state
    // localStorage.setItem('token', token);

    // console.log(username, email, token, isAdmin);

    localStorage.setItem(
      'codeyful-user-auth',
      JSON.stringify({
        username,
        email,
        token,
        isAdmin,
      })
    );

    setAuthState({
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
