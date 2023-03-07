import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('renders the HomePage', () => {
  // render(<HomePage />);

  const component = screen.getByTestId('homepage');
  const searchBar = screen.getByTestId('search-bar');
  expect(component).toBeInTheDocument();
  expect(component).toContainElement(searchBar);

});
