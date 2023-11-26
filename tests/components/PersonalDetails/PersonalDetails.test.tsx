import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { act, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';
import Home from '../../../src/pages';
import { data } from '../../mocks/AnimeRespone';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/components/NotFound/NotFound';
import { renderWithProviders } from '../../utils/test-utils';
import { handlerWithData } from '../../mocks/node';

const server = setupServer(...handlerWithData);

describe('Test PersonalCard component', () => {
  beforeAll(async () => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Ensure that clicking the close button hides the component', async () => {
    const wrapper = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<PersonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const card = await wrapper.findByTestId(`test${data[0].mal_id}`);

    act(() => {
      fireEvent.click(card);
    });

    const closeButton = await wrapper.findByTestId(`test-CloseButton`);

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(wrapper.queryByTestId(`cardDetails${data[0].mal_id}`)).toBeFalsy();
  });

  test('Check that a loading indicator is displayed while fetching data;', async () => {
    const wrapper = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />}>
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
    const wrapper = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />}>
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
});
