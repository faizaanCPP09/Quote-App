import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quote app', () => {
  render(<App />);
  const headingElement = screen.getByText(/Quote App/i);
  expect(headingElement).toBeInTheDocument();
});