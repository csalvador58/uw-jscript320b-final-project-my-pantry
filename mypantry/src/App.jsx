import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import PantryPage from './pages/PantryPage';
import RecipesPage from './pages/ReceipesPage';
import FormInputPage from './pages/FormInputPage';
import UserProvider from './store/UserProvider';

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
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/pantry',
        element: <PantryPage />,
      },
      {
        path: '/recipes',
        element: <RecipesPage />,
      },
      {
        path: '/edit',
        element: <FormInputPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
