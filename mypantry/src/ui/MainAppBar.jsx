import * as React from 'react';
import { AppBar, Avatar, Grid, IconButton, Tooltip } from '@mui/material/';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import classes from '../css/MainAppBar.module.css';
import PropTypes from 'prop-types';

function MainAppBar({ title }) {
  return (
    <>
      <AppBar position='static' data-testid='main-app-bar'>
        <Grid
          className={classes['main-app-bar-container']}
          container
          columns={12}
        >
          <Grid item xs={2} sm={2} md={3}>
            <div className={classes['align-center']}>
              <IconButton
                size='large'
                aria-label='Return to home page'
                color='inherit'
                // onClick={}
              >
                <FreeBreakfastIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={8} sm={8} md={6}>
            <h1
              className={classes['main-app-bar-title']}
              data-testid='title-display'
            >
              {title}
            </h1>
          </Grid>
          <Grid item xs={2} sm={2} md={3}>
            <div className={classes['align-center']}>
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
export default MainAppBar;

MainAppBar.propTypes = {
  title: PropTypes.string.isRequired,
};
