import React, { useState } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [userState, setUserState] = useState(false);

  const updateLoginState = () => {
    setUserState((previousState) => !previousState);
  };

  const userContext = {
    isLoggedIn: userState,
    updateLogin: updateLoginState,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
