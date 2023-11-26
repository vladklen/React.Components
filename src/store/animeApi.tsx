/* eslint-disable consistent-return */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import baseAPI from '../constants/api';
import { IAnime, IDataResponse } from '../types/types';
import { setAnimeCardId, setAnimeCardList } from './animeData/animeData.slice';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseAPI}/anime` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCardList: builder.query<
      IDataResponse,
      { search: string; page: string; limit: string }
    >({
      query: ({ search, page, limit }) => {
        return {
          url: `?q=${search}&page=${page}&limit=${limit}`,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        dispatch(setAnimeCardList({ animeList: data.data }));
      },
    }),
    getCardById: builder.query<IAnime, string>({
      query: (id) => {
        return {
          url: `/${id}`,
        };
      },
      transformResponse: (response: { data: IAnime }) => response.data,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        dispatch(setAnimeCardId({ animeDetails: data }));
      },
    }),
  }),
});

export const {
  useGetCardListQuery,
  useGetCardByIdQuery,
  util: { getRunningQueriesThunk },
} = animeApi;

export const { getCardList, getCardById } = animeApi.endpoints;
