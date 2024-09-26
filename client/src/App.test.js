import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import "@testing-library/react/cleanup-after-each";

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders Cooking Recipes', () => {
    const app = render(<App />)
    app.getAllByText(/Cooking Recipes/i);
  });
  
});
