import { render, screen, cleanup } from '@testing-library/react';
import ErrorPage from '../pages/ErrorPage';

afterEach(() => {
  cleanup();
});

describe('ErrorPage component', () => {
  it('renders the Error page', () => {
    render(<ErrorPage />);
    const component = screen.getByTestId('error-page');

    expect(component).toBeInTheDocument();
  });
});
