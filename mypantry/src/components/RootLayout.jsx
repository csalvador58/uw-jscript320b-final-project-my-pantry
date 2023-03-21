import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPantryBar from '../ui/MyPantryBar/MyPantryBar';
import classes from '../css/RootLayout.module.css'

function RootLayout() {
  return (
    <div className={classes['root-layout-container']} data-testid='root-layout'>
      <MyPantryBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
