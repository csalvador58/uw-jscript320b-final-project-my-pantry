import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders the SearchBar component', () => {
  // render(<SearchBar/>);
  const searchBar = screen.getByTestId('search-bar');
  expect(searchBar).toBeInDocument();
});
