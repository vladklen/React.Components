import { render } from '@testing-library/react';
import App from 'next/app';
import { describe, test } from 'vitest';

describe('App tests', () => {
  test('renders app', () => {
    render(<App />);
  });
});
