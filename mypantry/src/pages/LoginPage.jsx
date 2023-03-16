/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from '../css/LoginPage.module.css';

function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/main');
  }, [user, loading]);

  return (
    <div className={classes['login-page-container']} data-testid='login-page'>
      Login Page
    </div>
  );
}
export default Login;
