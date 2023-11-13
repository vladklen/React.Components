import { describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../../src/pages/Home';
import { data, pagination } from '../../mocks/AnimeRespone';
import AnimeContextProvider from '../../../src/context/Context';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/pages/NotFound';
import { getAnimeById } from '../../../src/api/StartSearch';

vi.mock('../../../src/api/StartSearch', () => {
  return {
    getAnime: vi.fn(() => Promise.resolve({ data, pagination })),
    getAnimeById: vi.fn(() => Promise.resolve({ data: data[0] })),
  };
});

describe('Test Card component', () => {
  test('Test Home component render', async () => {
    const wrapper = render(
      <AnimeContextProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AnimeContextProvider>
    );

    const items = await wrapper.findAllByRole('link');

    expect(items.length).toBe(3);
  });

  test('Ensure that the card component renders the relevant card data;', async () => {
    const wrapper = render(
      <AnimeContextProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AnimeContextProvider>
    );

    const items = await wrapper.findAllByRole('link');

    expect(items[0]).toMatchSnapshot();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
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
    const linkElement = await wrapper.findByTestId(`test${data[0].mal_id}`);

    act(() => {
      fireEvent.click(linkElement);
    });

    expect(
      await wrapper.findByTestId(`cardDetails${data[0].mal_id}`)
    ).toBeTruthy();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
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
    const linkElement = await wrapper.findByTestId(`test${data[0].mal_id}`);

    act(() => {
      fireEvent.click(linkElement);
    });

    expect(getAnimeById).toBeCalled();
  });
});
