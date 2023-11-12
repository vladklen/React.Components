import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from '../../../src/components/Card/Сard';
import Home from '../../../src/pages/Home';
import { MemoryRouter } from 'react-router-dom';
import { data, pagination } from '../../mocks/AnimeRespone';

const CardData = {
  title: 'Test title',
  image: 'https://cdn.myanimelist.net/images/anime/1969/112604.jpg',
  id: 1231231,
};

vi.mock('react', async () => {
  const actual = await vi.importActual<any>('react');
  return {
    ...actual,
    useContext: vi.fn(() => ({ data })),
  };
});

vi.mock('../api/StartSearch', () => {
  return { getAnime: () => Promise.resolve({ data, pagination }) };
});

describe('Test CardList component', () => {
  test('Ensure that the card component renders the relevant card data;', () => {
    const wrapper = render(
      <MemoryRouter>
        <Card {...CardData} />
      </MemoryRouter>
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  test('Validate that clicking on a card opens a detailed card component', () => {
    const wrapper = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(wrapper.container).toMatchSnapshot();
  });
});
