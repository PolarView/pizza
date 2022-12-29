import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import categoryReducer from './features/category/categorySlice';
import sortReducer from './features/sort/sortSlice';
import cartReducer from './features/cart/cartSlice';
import paginationReducer from './features/pagination/paginationSlice';
import pizzasReducer from './features/bussnesLogic/pizzasSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    category: categoryReducer,
    sort: sortReducer,
    cart: cartReducer,
    pagination: paginationReducer,
    pizzas: pizzasReducer
  }
});
