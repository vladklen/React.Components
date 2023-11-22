import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchValue/searchValue.slice';
import postsReducer from './postsPerPage/postsPerPage.slice';
import { animeApi } from './animeApi';

export const rootReducer = combineReducers({
  value: searchReducer,
  postsPerPage: postsReducer,
  [animeApi.reducerPath]: animeApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
