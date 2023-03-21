import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PantryPage from '../pages/PantryPage';
import UserProvider from '../store/UserProvider';

afterEach(() => {
  cleanup();
});

describe('Pantry page component', () => {
  it('renders the page', () => {
    render(
      <UserProvider>
        <Router>
          <PantryPage />
        </Router>
      </UserProvider>
    );

    const component = screen.getByTestId('pantry-page');
    expect(component).toBeInTheDocument();
  });
});
