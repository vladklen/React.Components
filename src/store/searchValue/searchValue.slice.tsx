import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IValue {
  value: {
    search: string;
    page: string;
    limit: string;
  };
}

const initialState: IValue = {
  value: {
    search: window.localStorage.getItem('test') || '',
    page: '1',
    limit: '10',
  },
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    changeSearchValue: (
      state,
      action: PayloadAction<{
        search: string;
        page: string;
        limit: string;
      }>
    ) => {
      let limit: number = Number(action.payload.limit);
      if (limit > 5) {
        limit = 10;
      } else if (limit > 1) {
        limit = 5;
      } else {
        limit = 1;
      }

      state.value = { ...action.payload, limit: `${limit}` };
    },
  },
});

export const { changeSearchValue } = searchValueSlice.actions;
export default searchValueSlice.reducer;
