import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLinks from '../NavLinks';
import UserContext from '../../store/UserContext';
import { AppBar, Avatar, Grid, IconButton } from '@mui/material/';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import classes from '../../css/MyPantryBar.module.css';
import MyPantryMenu from './MyPantryMenu';

function MyPantryBar() {
  const [avatarMenu, setAvatarMenu] = useState({ name: '', isLoggedIn: '' });
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (appUser.loginInfo) {
      setAvatarMenu(() => {
        const state = appUser.loginInfo ? true : false;
        return { name: appUser.loginInfo, isLoggedIn: state };
      });
    }
  }, [appUser.loginInfo]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginLogout = () => {
    if (avatarMenu.isLoggedIn) {
      // logout user
      appUser.updateLogin('');
    }
    // Navigate to login screen to login
    navigate('/');
    handleCloseUserMenu();
  };

  return (
    <AppBar position='static' data-testid='main-app-bar'>
      {/* Hide links if user not logged in */}
      <div style={{ visibility: true ? 'visible' : 'hidden' }}>
        <Grid
          className={classes['main-app-bar-container']}
          container
          columns={12}
        >
          <Grid item xs={2} sm={2} md={3}>
            {/* Left Side icon */}
            <div className={classes['align-left']}>
              <Link to='/home' className={classes.link}>
                <IconButton
                  size='large'
                  aria-label='Return to home page'
                  color='inherit'
                >
                  <FreeBreakfastIcon fontSize='large' />
                </IconButton>
              </Link>
            </div>
          </Grid>
          <Grid item xs={8} sm={8} md={6}>
            <h1
              className={classes['main-app-bar-title']}
              data-testid='title-display'
            >
              My Pantry
            </h1>
          </Grid>
          <Grid item xs={2} sm={2} md={3}>
            {/* Right side avatar */}
            <div className={classes['align-right']}>
              <IconButton
                onClick={
                  appUser.loginInfo
                    ? handleOpenUserMenu
                    : () => alert('Please log into your account.')
                }
                sx={{ p: 0 }}
              >
                <Avatar
                  sx={{ bgcolor: '#9c27b0' }}
                  data-testid='avatar'
                  aria-label='user avatar'
                  src={''}
                >
                  {appUser.loginInfo.slice(0, 1).toUpperCase()}
                </Avatar>
              </IconButton>

              <MyPantryMenu
                anchorElUser={anchorElUser}
                avatarMenu={avatarMenu}
                handleCloseUserMenu={handleCloseUserMenu}
                handleLoginLogout={handleLoginLogout}
              />
            </div>
          </Grid>
        </Grid>
        <NavLinks />
      </div>
    </AppBar>
  );
}
export default MyPantryBar;
