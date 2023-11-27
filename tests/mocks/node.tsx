import { http, HttpResponse } from 'msw';
import { response } from './AnimeRespone';
import baseAPI from '../../src/constants/api';

export const handlerWithData = [
  http.get(`${baseAPI}/anime?q=test&page=5&limit=10`, () => {
    return HttpResponse.json(response);
  }),
];

export const handlerNoData = [
  http.get(`${baseAPI}/anime?q=test&page=5&limit=10`, () => {
    return HttpResponse.json({});
  }),
];
