import React, { useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';

function UserProvider({ children }) {
  const [userState, setUserState] = useState(false);
  // const [pantry, setPantry] = useState([]);
  // const [recipe, setRecipe] = useState([]);

  const updateLoginState = () => {
    setUserState((previousState) => !previousState);
  };

  const storedUserContext = {
    isLoggedIn: userState,
    updateLogin: updateLoginState,
  };

  return (
    <UserContext.Provider value={storedUserContext}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
