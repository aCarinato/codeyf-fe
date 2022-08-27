import React, { useContext, useState, useEffect } from 'react';

const mainContext = React.createContext({ people: [], groups: [] });

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  const [peoples, setPeople] = useState([]);
  const [groups, setGroups] = useState([]);

  const value = {
    peoples,
    setPeople,
    groups,
    setGroups,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
