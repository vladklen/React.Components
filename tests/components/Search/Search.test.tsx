import { describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../../src/pages/Home';
import { data, pagination } from '../../mocks/AnimeRespone';
import AnimeContextProvider from '../../../src/context/Context';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/pages/NotFound';

vi.mock('../../../src/api/StartSearch', () => {
  return {
    getAnime: vi.fn(() => Promise.resolve({ data, pagination })),
    getAnimeById: vi.fn(() => Promise.resolve({ data: data[0] })),
  };
});

const localStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Test Search component', () => {
  test('Validate that clicking on a card opens a detailed card component', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AnimeContextProvider>
                <Home />
              </AnimeContextProvider>
            }
          >
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

  test('Validate that clicking on a card opens a detailed card component', async () => {
    localStorage.setItem('test', 'test value');
    const wrapper = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AnimeContextProvider>
                <Home />
              </AnimeContextProvider>
            }
          >
            <Route path="details/:id" element={<PersonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const input = await wrapper.findByRole('textbox');

    expect(input).toHaveTextContent('test value');
  });
});
