import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { act, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';
import Home from '../../../src/pages';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/components/NotFound/NotFound';
import { renderWithProviders } from '../../utils/test-utils';
import { handlerWithData } from '../../mocks/node';

const server = setupServer(...handlerWithData);

describe('Test Search component', () => {
  beforeAll(async () => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const wrapper = renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<PersonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
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
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<PersonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const input = (await wrapper.findByRole('textbox')) as HTMLInputElement;

    expect(input.value).toBe('test');
  });
});
