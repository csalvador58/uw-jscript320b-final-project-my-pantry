import { render, screen, cleanup } from '@testing-library/react';
import RecipesPage from '../pages/ReceipesPage';

afterEach(() => {
  cleanup();
});

describe('ReceipesPage component', () => {
  it('renders the Recipes page', () => {
    render(<RecipesPage />);
    const component = screen.getByTestId('recipes-page');
    // const searchBar = screen.getByTestId('search-bar');
    // const addButton = screen.getByTestId('create-recipe-button');

    expect(component).toBeInTheDocument();
    // expect(component).toContainElement(searchBar);
    // expect(component).toContainElement(addButton);
  });
});
