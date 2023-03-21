import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import FormInputPage from './pages/FormInputPage';
import LoginPage from './pages/LoginPage';
import RootLayout from './components/RootLayout';
import PantryPage from './pages/PantryPage';
import RecipesPage from './pages/ReceipesPage';
import UserProvider from './store/UserProvider';
import ColorModeContext from './store/ColorModeContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LoginPage /> },
      {
        path: '/home',
        element: <PantryPage />,
      },
      {
        path: '/err',
        element: <ErrorPage />,
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
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#28C7C3',
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
