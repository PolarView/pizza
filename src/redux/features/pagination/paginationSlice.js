import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  itemsPerPage: 4,
  totalItemsAmount: 10
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    navigateToNextPage(state) {
      state.currentPage += 1;
    },
    navigateToPrevPage(state) {
      state.currentPage -= 1;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCurrentPage, navigateToPrevPage, navigateToNextPage } = paginationSlice.actions;

export default paginationSlice.reducer;
