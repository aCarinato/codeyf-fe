import React, { useContext, useState } from 'react';

const assignmentContext = React.createContext();

export function useAssignmentContext() {
  return useContext(assignmentContext);
}

export function AssignmentContextProvider({ children }) {
  const [pickedAssignmentId, setPickedAssignmentId] = useState('');
  // console.log(`pickedAssignment: ${pickedAssignment}`);
  const value = {
    pickedAssignmentId,
    setPickedAssignmentId,
  };

  return (
    <assignmentContext.Provider value={value}>
      {children}
    </assignmentContext.Provider>
  );
}
