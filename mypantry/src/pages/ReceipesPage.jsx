import React, {useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function RecipesPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return <>
  <div data-testid='recipes-page'>Recipes Page</div>
  <SearchBar search='Recipes' />
  </>
}

export default RecipesPage;
