import * as React from 'react';
import { AppBar, Avatar, Grid, IconButton, Tooltip } from '@mui/material/';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import classes from '../css/MainAppBar.module.css';
import { Link } from 'react-router-dom';

function MyAppBar() {
  return (
    <>
      <AppBar position='static' data-testid='main-app-bar'>
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
                  <FreeBreakfastIcon />
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
              <Tooltip title='Show menu'>
                <IconButton
                  size='large'
                  aria-label='show menu'
                  color='inherit'
                  // onClick={}
                >
                  <Avatar
                    data-testid='avatar'
                    aria-label='user avatar'
                    src=''
                  />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}
export default MyAppBar;
