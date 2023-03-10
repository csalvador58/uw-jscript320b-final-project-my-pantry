import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import UserProvider from '../store/UserProvider';

afterEach(() => {
  cleanup();
});

describe('HomePage component', () => {
  it('renders the login form if not logged in', () => {
    render(
      <UserProvider>
        <HomePage />
      </UserProvider>
    );

    const component = screen.getByTestId('homepage');
    const login = screen.getByTestId('login-form');
    expect(component).toBeInTheDocument();
    expect(component).toContainElement(login);
  });

  it('renders the home page if user is logged in', () => {
    render(
      <UserProvider>
        <HomePage />
      </UserProvider>
    );
    // toggle login status
    const toggleLogin = screen.getByRole('button');
    fireEvent.click(toggleLogin);

    const component = screen.getByTestId('homepage');
    const home = screen.getByTestId('home-page');
    expect(component).toBeInTheDocument();
    expect(component).toContainElement(home);
  });
});
