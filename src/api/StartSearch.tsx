import baseAPI from '../constants/api';

export interface IAnime {
  mal_id: number;
  title: string;
  episodes: number;
  score: number;
  rating?: string;
  status?: string;
  title_japanese?: string;
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

export interface IDataIDResponse {
  data: IAnime;
  pagination: IPaginations;
}

const getAnime = async (search: URLSearchParams): Promise<IDataResponse> => {
  const response = await fetch(
    `${baseAPI}/anime?q=${search.get('search')}&page=${search.get(
      'page'
    )}&limit=${search.get('limit')}`
  );
  const data: IDataResponse = await response.json();
  return data;
};

const getAnimeById = async (id: string): Promise<IDataIDResponse> => {
  const response = await fetch(`${baseAPI}/anime/${id}`);
  const data: IDataIDResponse = await response.json();
  return data;
};

export { getAnime, getAnimeById };
