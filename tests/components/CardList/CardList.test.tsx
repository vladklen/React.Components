import { SpyInstance, beforeEach, describe, expect, test, vi } from 'vitest';
import { RenderResult, render } from '@testing-library/react';
import CardList from '../../../src/components/CardList/CardList';
import React, { useContext } from 'react';

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

const TestContext = React.createContext({});

describe('Test CardList component', () => {
  // let context: SpyInstance<[context: React.Context<unknown>], unknown>;
  // let wrapper: RenderResult;

  // beforeEach(() => {
  //   context = vi.spyOn(React, 'useContext');
  //   context.mockReturnValue({ data });
  //   wrapper = render(<CardList />);
  // });
  test('Verify that the component renders the specified number of cards', async () => {
    const wrapper = render(
      <TestContext.Provider value={data}>
        <CardList />
      </TestContext.Provider>
    );
    const items = await wrapper.findAllByRole('link');
    expect(items.length).toBe(data.length);
  });
});
