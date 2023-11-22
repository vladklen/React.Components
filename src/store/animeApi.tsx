import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseAPI from '../constants/api';
import { IAnime, IDataResponse } from '../types/types';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseAPI}/anime` }),
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

export const { useGetCardListQuery, useGetCardByIdQuery } = animeApi;
