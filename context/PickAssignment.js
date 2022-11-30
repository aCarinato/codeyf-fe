import React, { useContext, useState } from 'react';

const assignmentContext = React.createContext();

export function useAssignmentContext() {
  return useContext(assignmentContext);
}

export function AssignmentContextProvider({ children }) {
  const [pickedAssignment, setPickedAssignment] = useState('');
  console.log(`pickedAssignment: ${pickedAssignment}`);
  const value = {
    pickedAssignment,
    setPickedAssignment,
  };

  return (
    <assignmentContext.Provider value={value}>
      {children}
    </assignmentContext.Provider>
  );
}
