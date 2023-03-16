import React, { useEffect } from 'react';
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material/';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import classes from '../css/MyPantryBar.module.css';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { logout } from '../firebase';

// Array for avatar dropdown options
// const settings = ['Logout'];
const setting = 'Logout';

function MyPantryBar() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  return (
    <AppBar position='static' data-testid='main-app-bar'>
      <div style={{ visibility: true ? 'visible' : 'hidden' }}>
        <Grid
          className={classes['main-app-bar-container']}
          container
          columns={12}
        >
          <Grid item xs={2} sm={2} md={3}>
            <div className={classes['align-left']}>
              <Link to='/' className={classes.link}>
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
            <div className={classes['align-right']}>
              <IconButton
                onClick={user ? handleOpenUserMenu : null}
                sx={{ p: 0 }}
              >
                <Avatar
                  data-testid='avatar'
                  aria-label='user avatar'
                  src={user ? user.photoURL.toString() : ' '}
                />
              </IconButton>

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
                {/* {settings.map((setting) => ( */}
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </div>
          </Grid>
        </Grid>
        <NavLinks />
      </div>
    </AppBar>
  );
}
export default MyPantryBar;
