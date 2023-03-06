import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders the PantryPage', () => {
    render(<PantryPage />)
    const component = screen.getByTextId('pantry-page');
    
    expect(component).toBeInDocument();
})