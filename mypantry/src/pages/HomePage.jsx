import React, { useContext } from 'react';
import UserContext from '../store/UserContext';

function HomePage() {
  const user = useContext(UserContext);

  const loginHandler = () => {
    user.updateLogin();
  };
  return (
    <div data-testid='homepage'>
      {!user.isLoggedIn && (
        <>
          <h1>My Pantry</h1>
          <h2 data-testid='login-form'>Login Screen</h2>
        </>
      )}
      {user.isLoggedIn && <div data-testid='home-page'>Some content</div>}
      <button onClick={loginHandler}>Toggle Login</button>
    </div>
  );
}

export default HomePage;
