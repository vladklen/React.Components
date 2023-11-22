import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from '../../../src/App';

describe('App tests', () => {
  test('renders app', () => {
    render(<App />);
  });
});
