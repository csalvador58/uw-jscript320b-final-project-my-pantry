/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase';
import classes from '../css/LoginPage.module.css';

function Login() {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register email
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/main');
  }, [user, loading]);

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className={classes['login-page-container']} data-testid='login-page'>
      <div className='login'>
        <div className='login__container'>
          <input
            type='text'
            className='login__textBox'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail Address'
          />
          <input
            type='password'
            className='login__textBox'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button
            className='login__btn'
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button
            className='login__btn login__google'
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
          <div>
            <div className='register'>
              <div className='register__container'>
                <input
                  type='text'
                  className='register__textBox'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Full Name'
                />
                <input
                  type='text'
                  className='register__textBox'
                  value={emailReg}
                  onChange={(e) => setEmailReg(e.target.value)}
                  placeholder='E-mail Address'
                />
                <input
                  type='password'
                  className='register__textBox'
                  value={passwordReg}
                  onChange={(e) => setPasswordReg(e.target.value)}
                  placeholder='Password'
                />
                <button className='register__btn' onClick={register}>
                  Register
                </button>
                <button
                  className='register__btn register__google'
                  onClick={signInWithGoogle}
                >
                  Register with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
