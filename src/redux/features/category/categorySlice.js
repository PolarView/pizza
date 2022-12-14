import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  showFilters: true
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {}
});

// Action creators are generated for each case reducer function
export const {} = categorySlice.actions;

export default categorySlice.reducer;
