import React from 'react';
import App from './index';
import { render } from '@testing-library/react';

describe('App', () => {
  it('should render without error', () => {
    render(<App />);
  })
});

