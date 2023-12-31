import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login component', () => {
  render(<App />);
  const loginButton = screen.getByText(/login/i); // Update this to match text in your Login component
  expect(loginButton).toBeInTheDocument();
});
