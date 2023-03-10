import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  isLoggedIn: false,
  updateLogin: () => {},
});

export default UserContext;

UserContext.PropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateLogin: PropTypes.func.isRequired,
};
