import { render, screen, cleanup } from '@testing-library/react';
import MainAppBar from '../ui/MainAppBar';

afterEach(() => {
  cleanup();
});

test('renders the MainAppBar component', () => {
  render(<MainAppBar title='My Pantry' />);
  const component = screen.getByTestId('main-app-bar');
  const title = screen.getByTestId('title-display');
  const avatar = screen.getByTestId('avatar');

  expect(component).toBeInTheDocument();
  expect(title).toHaveTextContent(/My Pantry/i);
  expect(avatar).toHaveAccessibleName(/user avatar/i);

  // expect(component).toContainElement(links);
});
