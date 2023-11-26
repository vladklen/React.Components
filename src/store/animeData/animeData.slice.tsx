import { createSlice } from '@reduxjs/toolkit';
import { IDataState } from '../../types/types';

const initialState: IDataState = {
  list: {
    data: [],
    pagination: {
      items: {
        count: 1,
        per_page: 1,
        total: 1,
      },
    },
  },
  details: {
    mal_id: 1,
    title: '',
    episodes: 1,
    score: 1,
    rating: '',
    status: '',
    title_japanese: '',
    images: { jpg: { image_url: '' } },
  },
};

const animeDataSlice = createSlice({
  name: 'postPerPage',
  initialState,
  reducers: {
    setAnimeCardList: (state, action) => {
      state.list = action.payload.animeList;
    },
    setAnimeCardId: (state, action) => {
      state.details = action.payload.animeDetails;
    },
  },
});

export const { setAnimeCardList, setAnimeCardId } = animeDataSlice.actions;
export default animeDataSlice.reducer;
