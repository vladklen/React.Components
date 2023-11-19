import { describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../../src/pages/Home';
import { data, pagination } from '../../mocks/AnimeRespone';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/pages/NotFound';
import { useGetCardByIdQuery } from '../../../src/store/animeApi';

const mockState = {
  value: {
    search: 'test',
    page: '1',
    limit: '10',
  },
};

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: vi.fn(() => mockState),
}));

vi.mock('../../../src/store/animeApi', () => ({
  useGetCardListQuery: vi.fn(() => ({
    isLoading: false,
    data: { data, pagination },
  })),
  useGetCardByIdQuery: vi.fn(() => ({ isLoading: false, data: data[0] })),
}));

describe('Test Card component', () => {
  test('Test Home component render', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const items = await wrapper.findAllByRole('link');

    expect(items.length).toBe(3);
  });

  test('Ensure that the card component renders the relevant card data;', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const items = await wrapper.findAllByRole('link');

    expect(items[0]).toMatchSnapshot();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const wrapper = render(
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

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const wrapper = render(
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

    expect(useGetCardByIdQuery).toBeCalled();
  });
});
