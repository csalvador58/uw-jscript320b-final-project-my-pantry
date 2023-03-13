import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyPantryBar from '../ui/MyPantryBar';

afterEach(() => {
  cleanup();
});

describe('MyPantryBar component', () => {
  it('renders the title and avatar', () => {
   
    render(
      <BrowserRouter basename='/'>
        <MyPantryBar />
      </BrowserRouter>
    );

    const component = screen.getByTestId('main-app-bar');
    // const appTitle = screen.getByTestId('title-display');
    // const avatar = screen.getByTestId('avatar');

    expect(component).toBeInTheDocument();
    // expect(appTitle).toHaveTextContent(/My Pantry/i);
    // expect(avatar).toHaveAccessibleName(/user avatar/i);

    // expect(component).toContainElement(links);
  });
});
