import baseAPI from '../constants/api';

export interface IAnime {
  mal_id: number;
  title: string;
  episodes: number;
  score: number;
  images: { jpg: { image_url: string } };
}

export interface IPaginations {
  items: {
    count: number;
    per_page: number;
    total: number;
  };
}

export interface IDataResponse {
  data: IAnime[];
  pagination: IPaginations;
}

const getDataFromApi = async (
  search: URLSearchParams
): Promise<IDataResponse> => {
  const response = await fetch(
    `${baseAPI}/anime?q=${search.get('search')}&page=${search.get(
      'page'
    )}&limit=${search.get('limit')}`
  );
  const data: IDataResponse = await response.json();

  return data;
};

export default getDataFromApi;
