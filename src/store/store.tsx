import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchValue/searchValue.slice';
import postsReducer from './postsPerPage/postsPerPage.slice';
import { animeApi } from './animeApi';

const store = configureStore({
  reducer: {
    value: searchReducer,
    postsPerPage: postsReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
