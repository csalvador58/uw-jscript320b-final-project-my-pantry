import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders the NavHeader component', () => {
  //   render(<RootLayout />);
  const component = screen.getByTestId('root-layout');
  const title = screen.getByTestId('root-layout-title');
  const avatar = screen.getByTestId('root-layout-avatar');
  const links = screen.getByTestId('root-nav-links');

  expect(component).toBeInTheDocument();
  expect(title).toHaveTextContent(/My Pantry/i);
  expect(avatar).getByAltText(/user profile avatar/i);

  expect(component).toContainElement(links);
});
