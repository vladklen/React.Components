import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import CardList from '../../../src/components/CardList/CardList';
import { MemoryRouter } from 'react-router-dom';
import React, { useContext } from 'react';
import { TEXT_CONTENT } from '../../../src/components/CardList/CardList';

const data = [
  {
    mal_id: 1,
    title: 'Test title #1',
    episodes: 1,
    score: 1,
    rating: '1',
    status: '1',
    title_japanese: 'Title in Japanese #1',
    images: { jpg: { image_url: 'url:page1' } },
  },
  {
    mal_id: 2,
    title: 'Test title #2',
    episodes: 2,
    score: 2,
    rating: '2',
    status: '2',
    title_japanese: 'Title in Japanese #2',
    images: { jpg: { image_url: 'url:page2' } },
  },
  {
    mal_id: 3,
    title: 'Test title #3',
    episodes: 3,
    score: 3,
    rating: '3',
    status: '3',
    title_japanese: 'Title in Japanese #3',
    images: { jpg: { image_url: 'url:page3' } },
  },
];

vi.mock('react', async () => {
  const actual = await vi.importActual<any>('react');
  return {
    ...actual,
    useContext: vi.fn(() => ({ data })),
  };
});

describe('Test CardList component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    vi.mocked(useContext).mockReturnValueOnce({ data });
    const wrapper = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const items = wrapper.queryAllByRole('link');
    expect(items.length).toBe(data.length);
  });

  test('Verify that the component renders the specified number of cards', () => {
    vi.mocked(useContext).mockReturnValueOnce({ data: [] });
    const wrapper = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const item = wrapper.queryByText(TEXT_CONTENT.ERROR);
    expect(item).not.toBeFalsy();
  });
});
