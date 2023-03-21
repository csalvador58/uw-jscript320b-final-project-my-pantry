import React, { useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';
import { updatePantryHandler } from './myFunctions';

function UserProvider({ children }) {

  const [userState, setUserState] = useState('');
  const [pantryArray, setPantryArray] = useState([]);
  const [editData, setEditData] = useState({});
  const [recipeArray, setRecipeArray] = useState([]);

  const updateLoginState = (user) => {
    setUserState(user);
  };

  // useEffect(() => {
  //   console.log(pantryArray);
  // }, [pantryArray, setPantryArray])

  // const updatePantryState = (action) => {
  //   updatePantryHandler(action, pantryArray, setPantryArray);
  // };
  const updatePantryState = (action) => {
    updatePantryHandler(action, setPantryArray);
  };
  const updateFavorites = (action) => {
    updatePantryHandler(action, setRecipeArray);
  };

  const updateEditState = (obj) => {
    setEditData(obj)
  }


  const storedUserContext = {
    loginInfo: userState,
    updateLogin: updateLoginState,
    pantry: pantryArray,
    updatePantry: updatePantryState,
    editData: editData,
    updateEditData: updateEditState,
    favorite: recipeArray,
    toggleFav: updateFavorites,
    
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
