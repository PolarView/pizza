import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearInput: (state) => (state = ''),
    watchInputValue: (state, action) => (state = action.payload)
  }
});

// Action creators are generated for each case reducer function
export const { clearInput, watchInputValue } = searchSlice.actions;

export default searchSlice.reducer;
