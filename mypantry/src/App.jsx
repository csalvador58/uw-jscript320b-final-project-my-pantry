import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import RootLayout from './components/RootLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#28C7C3',
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
]);

function App() {
  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
  );
}

export default App;
