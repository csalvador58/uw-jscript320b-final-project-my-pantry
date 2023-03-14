import React, { useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';
import { updatePantryHandler } from './myFunctions';

function UserProvider({ children }) {
  const [userState, setUserState] = useState(false);
  const [pantryArray, setPantryArray] = useState([]);
  const [recipeArray, setRecipeArray] = useState([]);

  const updateLoginState = () => {
    setUserState((previousState) => !previousState);
  };

  // const updatePantryState = (action) => {
  //   updatePantryHandler(action, pantryArray, setPantryArray);
  // };
  const updatePantryState = (action) => {
    updatePantryHandler(action, setPantryArray);
  };
  const updateRecipeState = (action) => {
    updatePantryHandler(action, setRecipeArray);
  };

  const storedUserContext = {
    isLoggedIn: userState,
    updateLogin: updateLoginState,
    pantry: pantryArray,
    updatePantry: updatePantryState,
    recipes: recipeArray,
    updateRecipe: updateRecipeState,
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
