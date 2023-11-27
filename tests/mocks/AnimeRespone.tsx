import { IAnime, IDataResponse } from '../../src/types/types';

export const data: IAnime[] = [
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

export const pagination = {
  items: {
    count: 10,
    per_page: 10,
    total: 100,
  },
};

export const response: IDataResponse = {
  data,
  pagination: {
    items: {
      count: 3,
      per_page: 3,
      total: 3,
    },
  },
};

export const failResponse: IDataResponse = {
  data: [],
  pagination: {
    items: {
      count: 3,
      per_page: 3,
      total: 30,
    },
  },
};

export const paginationProps = {
  postsPerPage: 10,
  totalPosts: 100,
  loading: false,
};

export const mockState = {
  value: {
    search: 'test',
    page: '1',
    limit: '10',
  },
};
