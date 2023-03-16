import React, { useContext, useEffect } from 'react';
import UserContext from '../store/UserContext';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser.loginInfo]);

  return <div data-testid='error-page'>Error Page</div>;
}

export default ErrorPage;
