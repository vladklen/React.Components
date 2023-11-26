/* eslint-disable consistent-return */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import baseAPI from '../constants/api';
import { IAnime, IDataResponse } from '../types/types';

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
    }),
    getCardById: builder.query<IAnime, string>({
      query: (id) => {
        return {
          url: `/${id}`,
        };
      },
      transformResponse: (response: { data: IAnime }) => response.data,
    }),
  }),
});

export const {
  useGetCardListQuery,
  useGetCardByIdQuery,
  util: { getRunningQueriesThunk },
} = animeApi;

export const { getCardList, getCardById } = animeApi.endpoints;
