import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('renders the NavFooter component', () => {
    // render(<NavLinks />);
    const component = screen.getTestById('nav-footer');
    const links = screen.getByTestId('nav-links')
    expect(component).toBeInTheDocument();
    expect(links).getByText(/Home/i);
    expect(links).getByText(/Pantry/i);
    expect(links).getByText(/Recipe/i);
})
