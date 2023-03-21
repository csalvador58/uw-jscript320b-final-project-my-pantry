import React, { useContext, useEffect } from 'react';
import UserContext from '../store/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../css/ErrorPage.module.css';

function ErrorPage() {
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      alert(`An error has occurred. You'll be redirected to the login page.`);
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser.loginInfo]);

  return (
    <div data-testid='error-page' className={classes['error-page-container']}>
      <p className={classes['error-info']}>
        An error has occurred. Click{' '}
        <Link to='/'>
          <span style={{ color: 'blue' }}> here</span>{' '}
        </Link>{' '}
        or refresh page to return to the login.
      </p>
    </div>
  );
}

export default ErrorPage;
