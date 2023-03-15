import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = auth.currentUser;
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [navigate]);

  return <div data-testid='login-page'>Login Page</div>;
}
export default Login;
