import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // if (auth.currentUser) {
    //   navigate('/main');
    // }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/main');
      }
    });
    return unsubscribe;
  }, [navigate]);

  return <div data-testid='login-page'>Login Page</div>;
}
export default Login;
