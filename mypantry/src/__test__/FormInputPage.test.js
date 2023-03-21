import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FormInputPage from '../pages/FormInputPage';

afterEach(() => {
  cleanup();
});

describe('FormInputPage component', () => {
  it('renders the form edit page', () => {
    render(
      <Router>
        <FormInputPage />
      </Router>
    );
    const component = screen.getByTestId('form-input');
    expect(component).toBeInTheDocument();

  });
});
