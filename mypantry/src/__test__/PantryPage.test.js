import { render, screen, cleanup } from '@testing-library/react';
import PantryPage from '../pages/PantryPage';

afterEach(() => {
  cleanup();
});

describe('PantryPage component', () => {
  it('renders the Pantry page', () => {
    render(<PantryPage />);
    const component = screen.getByTestId('pantry-page');
    // const searchBar = screen.getByTestId('search-bar');
    // const addButton = screen.getByTestId('pantry-add-button');

    expect(component).toBeInTheDocument();
    // expect(component).toContainElement(searchBar);
    // expect(component).toContainElement(addButton);
  });
});
