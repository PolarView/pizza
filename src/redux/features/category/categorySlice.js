import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  showFilters: false
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    onClickActiveCategoryChange: (state, { payload }) => {
      state.activeCategory = payload;
      state.showFilters = false;
    },
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { onClickActiveCategoryChange, toggleFilters, setShowFilters } = categorySlice.actions;

export default categorySlice.reducer;
