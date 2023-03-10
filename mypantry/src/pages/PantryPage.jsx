import React from 'react';
import SearchBar from '../components/SearchBar';

function PantryPage() {
  return (
    <>
      <div data-testid='pantry-page'>Pantry Page</div>
      <SearchBar search='Pantry' />
    </>
  );
}

export default PantryPage;
