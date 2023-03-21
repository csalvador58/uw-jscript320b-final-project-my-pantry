import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  loginInfo: '',
  updateLogin: () => {},
  pantry: [],
  updatePantry: () => {},
  editData: {},
  updateEditData: () => {},
  recipes: [],
  updateRecipe: () => {},
  favorite: [],
  toggleFav: () => {},
});

export default UserContext;

UserContext.PropTypes = {
  loginInfo: PropTypes.string.isRequired,
  updateLogin: PropTypes.func.isRequired,
  pantry: PropTypes.array.isRequired,
  updatePantry: PropTypes.func.isRequired,
  editData: PropTypes.object.isRequired,
  updateEditData: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  favorite: PropTypes.array.isRequired,
  toggleFav: PropTypes.func.isRequired,
};
