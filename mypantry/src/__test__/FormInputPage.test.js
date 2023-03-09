import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('FormInputPage component', () => {
  it.skip('renders edit page when pantry item edit is enabled', () => {
    //   render(<FormInputPage />);
    const component = screen.getByTestId('form-input');
    expect(component).toBeInTheDocument();
  });
});
