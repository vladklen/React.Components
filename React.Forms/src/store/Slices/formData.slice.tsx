import { createSlice } from '@reduxjs/toolkit';

export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
  accept: boolean;
}

export const initialState: IFormData[] = [];

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = formDataSlice.actions;
export default formDataSlice.reducer;
