import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSortFilter: 'asc',
  chosenSortOption: {
    title: 'популярности',
    sortProperty: 'rating'
  }
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setChosenSortOption(state, { payload }) {
      state.chosenSortOption = payload;
    },
    setActiveSortFilter(state, { payload }) {
      state.activeSortFilter = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setActiveSortFilter, setChosenSortOption } = sortSlice.actions;

export default sortSlice.reducer;
