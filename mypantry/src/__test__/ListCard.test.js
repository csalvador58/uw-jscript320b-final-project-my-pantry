import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('renders the ListCard component', () => {
//   render(<ListCard />);
  const listCard = screen.getByTestId('list-card');
  expect(listCard).toBeInTheDocument();
});
