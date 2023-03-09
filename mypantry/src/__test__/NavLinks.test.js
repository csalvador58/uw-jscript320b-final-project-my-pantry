import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavLinks from '../ui/NavLinks';

afterEach(() => {
  cleanup();
});

describe('NavLinks component', () => {
  test(`renders the app's main navigation links`, () => {
    render(
      <BrowserRouter basename='/'>
        <NavLinks />
      </BrowserRouter>
    );
    const component = screen.getByTestId('nav-links');
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(/Home/i);
    expect(component).toHaveTextContent(/Pantry/i);
    expect(component).toHaveTextContent(/Recipes/i);
  });
});
