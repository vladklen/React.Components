import { createSlice } from '@reduxjs/toolkit';
import COUNTRIES from '../../data/countries';
import { RootState } from '../store';

export interface ICountryData {
  countries: string[];
}

const initialState: ICountryData = {
  countries: COUNTRIES,
};

const countriesDataSlice = createSlice({
  name: 'countryData',
  initialState,
  reducers: {},
});

export const selectCountriesData = (state: RootState) => state.countries;
export default countriesDataSlice.reducer;
