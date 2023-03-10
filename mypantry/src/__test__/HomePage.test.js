import { render, screen, cleanup } from '@testing-library/react';
import HomePage from '../pages/HomePage';

afterEach(() => {
  cleanup();
});

describe('HomePage component', () => {
  it('renders the login form if not logged in', () => {
    render(<HomePage />);
    const component = screen.getByTestId('homepage');
    const login = screen.getByTestId('login-form');
    expect(component).toBeInTheDocument();
    expect(component).toContainElement(login);
  });

  it('renders the home page if user is logged in', () => {})
});
