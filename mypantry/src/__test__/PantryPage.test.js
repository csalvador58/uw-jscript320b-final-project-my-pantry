import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('renders the PantryPage', () => {
//   render(<PantryPage />);
  const component = screen.getByTestId('pantry-page');
  const searchBar = screen.getByTestId('search-bar');
  const addButton = screen.getByTestId('pantry-add-button');

  expect(component).toBeInDocument();
  expect(component).toContainElement(searchBar);
  expect(component).toContainElement(addButton);
});
