import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('renders the LoginPage', () => {
  // render(<LoginPage />);
  const component = screen.getByTestId('login-page');
  expect(component).toBeInTheDocument();
});
