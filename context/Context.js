import React, { useContext, useState, useEffect } from 'react';

const mainContext = React.createContext({ people: [], groups: [] });

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  const [peoples, setPeople] = useState([]);
  const [groups, setGroups] = useState([]);

  // Mobile
  const [mobileView, setMobileView] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 820) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
      console.log(mobileView);
      // setAuthState(JSON.parse(localStorage.getItem('gq-user-auth')));
    }
  }, []);

  const value = {
    mobileView,
    setMobileView,
    peoples,
    setPeople,
    groups,
    setGroups,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
