import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseAPI from '../constants/api';
import { IAnime, IDataListApi, IDataResponse } from '../types/types';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseAPI}/anime` }),
  endpoints: (builder) => ({
    getCardList: builder.query<IDataResponse, IDataListApi>({
      query: ({ searchQuery, pageQuery, perPageQuery }) => {
        return {
          url: `?q=${searchQuery}&page=${pageQuery}&limit=${perPageQuery}`,
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
