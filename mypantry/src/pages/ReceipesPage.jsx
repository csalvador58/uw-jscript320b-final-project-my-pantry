import React from 'react';
import SearchBar from '../components/SearchBar';

function RecipesPage() {
  return <>
  <div data-testid='recipes-page'>Recipes Page</div>
  <SearchBar search='Recipes' />
  </>
}

export default RecipesPage;
