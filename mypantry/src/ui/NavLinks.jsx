import React, { useEffect } from 'react';
import classes from '../css/NavLinks.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, signInAccount } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function NavLinks() {
  // const [user, loading, error] = useAuthState(auth);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Box
      sx={{ backgroundColor: 'primary.main' }}
      className={classes['nav-link-container']}
    >
      {user && (
        <ul data-testid='nav-links' className={classes.links}>
          <li>
            <NavLink
              to='/main'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/pantry'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Pantry
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/recipes'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Recipes
            </NavLink>
          </li>
          {/* Add conditional render */}
          {true && (
            <li>
              <NavLink
                to='/edit'
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Edit
              </NavLink>
            </li>
          )}
        </ul>
      )}

      {!user && (
        <div className={classes['nav-link-login']}>
          <Paper sx={{ backgroundColor: '#9c27b0' }}>
            <IconButton
              size='large'
              aria-label='show number of rentals in cart'
              color='inherit'
              onClick={signInAccount}
            >
              <Typography className={classes['nav-link-login-text']}>
                Login with{' '}
              </Typography>
              <GoogleIcon
                className={classes['nav-link-login-text']}
                sx={{ paddingX: 0.5 }}
                fontSize='small'
                aria-hidden='false'
                aria-label='Google Icon'
                role='img'
                title='Google Sign In'
              />
            </IconButton>
          </Paper>
        </div>
      )}
    </Box>
  );
}

export default NavLinks;
