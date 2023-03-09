import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPantryBar from '../ui/MyPantryBar';
import NavLinks from '../ui/NavLinks';

function RootLayout() {
  return (
    <div data-testid='root-layout'>
      <MyPantryBar />
      <main>
        <Outlet />
      </main>
      <NavLinks />
    </div>
  );
}

export default RootLayout;
