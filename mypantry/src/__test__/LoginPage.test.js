import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/LoginPage';

afterEach(() => {
  cleanup();
});

describe('LoginPage component', () => {
  it('renders the LoginPage', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const component = screen.getByTestId('login-page');
    expect(component).toBeInTheDocument();
  });
});
