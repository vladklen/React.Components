import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { act, fireEvent } from '@testing-library/react';

import { setupServer } from 'msw/node';
import Home from '../../../src/pages';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/components/NotFound/NotFound';
import { renderWithProviders } from '../../utils/test-utils';
import { handlerWithData } from '../../mocks/node';
import { data, response } from '../../mocks/AnimeRespone';

const server = setupServer(...handlerWithData);

describe('Test Search component', () => {
  beforeAll(async () => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const wrapper = renderWithProviders(
      <Home list={response} details={data[0]} />
    );

    const input = await wrapper.findByRole('textbox');

    act(() => {
      fireEvent.change(input, { target: { value: 'test value' } });
    });

    const localStorageData = localStorage.getItem('test');

    expect(localStorageData).toBe('test value');
  });

  test('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('test', 'test value');

    const wrapper = renderWithProviders(
      <Home list={response} details={data[0]} />
    );

    const input = (await wrapper.findByRole('textbox')) as HTMLInputElement;

    expect(input.value).toBe('test');
  });
});
