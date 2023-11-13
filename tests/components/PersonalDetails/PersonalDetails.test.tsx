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
    getAnimeById: vi.fn(async () => {
      await new Promise((res) => {
        setTimeout(() => {
          res('');
        }, 500);
      });
      return Promise.resolve({ data: data[0] });
    }),
  };
});

describe('Test PersonalCard component', () => {
  test('Check that a loading indicator is displayed while fetching data;', async () => {
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

    fireEvent.click(linkElement);

    const loader = await wrapper.findByTestId(`test-loader`);

    expect(loader).toBeInTheDocument();
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

  test('Ensure that clicking the close button hides the component', async () => {
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

    const closeButton = await wrapper.findByTestId(`test-CloseButton`);

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(wrapper.queryByTestId(`cardDetails${data[0].mal_id}`)).toBeFalsy();
  });
});
