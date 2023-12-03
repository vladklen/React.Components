import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './Slices/formData.slice';
import countryDataReducer from './Slices/countryData.slice';

const store = configureStore({
  reducer: {
    form: formDataReducer,
    countries: countryDataReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
