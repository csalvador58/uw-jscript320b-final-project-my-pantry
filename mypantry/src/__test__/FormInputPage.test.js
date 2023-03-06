import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('render the FormInputPage', () => {
//   render(<FormInputPage />);
  const component = screen.getByTestId('form-input');
  expect(component).toBeInTheDocument();
});
