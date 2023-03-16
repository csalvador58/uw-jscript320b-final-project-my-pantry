import React, { useContext, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import UserContext from '../store/UserContext';

function RecipesPage() {
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser.loginInfo]);

  return (
    <>
      <div data-testid='recipes-page'>Recipes Page</div>
      <SearchBar search='Recipes' />
    </>
  );
}

export default RecipesPage;
