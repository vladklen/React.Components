import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Home from '../../../src/pages/Home';
import { data, pagination } from '../../mocks/AnimeRespone';
import AnimeContextProvider from '../../../src/context/Context';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/pages/NotFound';

const history = createMemoryHistory();

vi.mock('../../../src/api/StartSearch', () => {
  return {
    getAnime: vi.fn(() => Promise.resolve({ data, pagination })),
    getAnimeById: vi.fn(() => Promise.resolve({ data: data[0] })),
  };
});

describe('Test Card component', () => {
  test('Validate that clicking on a card opens a detailed card component', async () => {
    const wrapper = render(
      <Router location={history.location} navigator={history}>
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
      </Router>
    );
    history.push('/32423423');

    expect(await wrapper.findByText(`Page not found!`)).toBeTruthy();
  });
});
