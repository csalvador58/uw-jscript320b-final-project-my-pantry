import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('ListCard component', () => {
  it.skip('renders the ListCard component', () => {
    //   render(<ListCard />);
    const listCard = screen.getByTestId('list-card');
    expect(listCard).toBeInTheDocument();
  });
});
