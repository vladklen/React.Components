import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseAPI from '../constants/api';
import { IDataIDResponse, IDataResponse } from '../api/StartSearch';
import { IDataListApi } from '../types/types';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseAPI }),
  endpoints: (builder) => ({
    getCardList: builder.query<IDataResponse, IDataListApi>({
      query: ({ searchQuery, pageQuery, perPageQuery }) => {
        return {
          url: `/anime?q=${searchQuery}&page=${pageQuery}&limit=${perPageQuery}`,
        };
      },
    }),
    getCardById: builder.query<IDataIDResponse, string>({
      query: (id) => {
        return {
          url: `/anime/${id}`,
        };
      },
    }),
  }),
});

export const { useGetCardListQuery, useGetCardByIdQuery } = animeApi;
