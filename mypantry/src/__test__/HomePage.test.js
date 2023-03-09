import { render, screen, cleanup } from '@testing-library/react';
import HomePage from '../pages/HomePage';

afterEach(() => {
  cleanup();
});

describe('HomePage component', () => {
  it('renders the home page', () => {
    render(<HomePage />);

    const component = screen.getByTestId('homepage');
    // const searchBar = screen.getByTestId('search-bar');
    expect(component).toBeInTheDocument();
    // expect(component).toContainElement(searchBar);
  });
});
