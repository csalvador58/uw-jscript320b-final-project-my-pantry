import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('renders the ReceipesPage', () => {
  //   render(<RecipesPage />);
  const component = screen.getByTestId('recipes-page');
  const searchBar = screen.getByTestId('search-bar');
  const addButton = screen.getByTestId('create-recipe-button');

  expect(component).toBeInDocument();
  expect(component).toContainElement(searchBar);
  expect(component).toContainElement(addButton);
});
