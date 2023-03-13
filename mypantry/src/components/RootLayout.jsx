import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPantryBar from '../ui/MyPantryBar';
import NavLinks from '../ui/NavLinks';
import { Box } from '@mui/material';
import classes from '../css/RootLayout.module.css'

function RootLayout() {
  return (
    <div className={classes['root-layout-container']} data-testid='root-layout'>
      <MyPantryBar />
      <main>
        <Outlet />
      </main>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <NavLinks />
      </Box>
    </div>
  );
}

export default RootLayout;
