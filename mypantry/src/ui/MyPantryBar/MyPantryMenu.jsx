import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material/';
import PropTypes from 'prop-types';

function MyPantryMenu({
  anchorElUser,
  avatarMenu,
  handleCloseUserMenu,
  handleLoginLogout,
}) {
  return (
    <Menu
      sx={{ mt: '45px' }}
      id='menu-appbar'
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {avatarMenu.isLoggedIn && (
        <MenuItem key={avatarMenu.name} onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>
            Current User: {avatarMenu.name}
          </Typography>
        </MenuItem>
      )}
      <MenuItem key={'login-logout'} onClick={handleLoginLogout}>
        <Typography textAlign='center'>
          {avatarMenu.isLoggedIn ? 'Logout' : 'Login'}
        </Typography>
      </MenuItem>
    </Menu>
  );
}

export default MyPantryMenu;

MyPantryMenu.propTypes = {
  anchorElUser: PropTypes.object,
  avatarMenu: PropTypes.shape({
    name: PropTypes.string,
    isLoggedIn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
  handleCloseUserMenu: PropTypes.func.isRequired,
  handleLoginLogout: PropTypes.func.isRequired,
};
