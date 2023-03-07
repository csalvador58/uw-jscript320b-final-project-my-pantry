import React from 'react';
import MainAppBar from '../ui/MainAppBar';

function RootLayout() {
  return (
    <div data-testid='root-layout'>
      <MainAppBar title='My Pantry'/>
    </div>
  );
}

export default RootLayout;
