import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('LoginPage component', () => {
  it.skip('renders the LoginPage', () => {
    // render(<LoginPage />);
    const component = screen.getByTestId('login-page');
    expect(component).toBeInTheDocument();
  });
});
