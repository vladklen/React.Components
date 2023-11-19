import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IValue {
  value: string;
}

const initialState: IValue = {
  value: window.localStorage.getItem('test') ?? '',
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeSearchValue } = searchValueSlice.actions;
export default searchValueSlice.reducer;
