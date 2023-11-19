import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IPosts {
  value: number;
}

const initialState: IPosts = {
  value: 10,
};

const postPerPageSlice = createSlice({
  name: 'postPerPage',
  initialState,
  reducers: {
    changePostsAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { changePostsAmount } = postPerPageSlice.actions;
export default postPerPageSlice.reducer;
