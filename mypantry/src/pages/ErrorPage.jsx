import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase';

function ErrorPage() {
  // const [user, loading] = useAuthState(auth);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate('/');

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, loading]);

  return <div data-testid='error-page'>Error Page</div>;
}

export default ErrorPage;
