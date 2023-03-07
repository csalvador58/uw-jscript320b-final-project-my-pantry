import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test.skip('render the FormInputPage', () => {
//   render(<FormInputPage />);
  const component = screen.getByTestId('form-input');
  expect(component).toBeInTheDocument();
});
