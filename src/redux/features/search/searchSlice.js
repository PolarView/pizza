import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInputValue: (state, { payload }) => (state = payload),
    watchInputValue: (state, action) => (state = action.payload)
  }
});

// Action creators are generated for each case reducer function
export const { setInputValue, watchInputValue } = searchSlice.actions;

export default searchSlice.reducer;
