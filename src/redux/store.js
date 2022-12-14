import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import categoryReducer from './features/category/categorySlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    category: categoryReducer
  }
});