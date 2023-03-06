import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders the NavHeader component', () => {
  //   render(<RootLayout />);
  const component = screen.getByTestId('root-header');
  const title = screen.getByTestId('root-header-title');
  const avatar = screen.getByTestId('root-header-avatar');
  expect(component).toBeInTheDocument();
  expect(title).toHaveTextContent(/My Pantry/i);
  expect(avatar).getByAltText(/user profile avatar/i)
});
