export interface IDataListApi {
  searchQuery: string;
  pageQuery: string;
  perPageQuery: string;
}

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

export interface IDataState {
  list: IDataResponse;
  details: IAnime;
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
