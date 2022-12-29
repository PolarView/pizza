import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzaStatus',
  async ({ currentPage, sort, order, search, categoryId }) => {
    const pizzasUrl = `https://63640a2d7b209ece0f3f12de.mockapi.io/pizzaItems?${categoryId}page=${currentPage}&limit=4&${sort}${order}${search}`;
    const { data } = await axios.get(pizzasUrl);
    console.log(pizzasUrl);
    return data;
  }
);

const initialState = {
  pizzasData: [],
  status: 'loading'
};

export const pizzas = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzasData(state, { payload }) {
      state.pizzasData = payload;
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.pizzasData = [];
    },
    [fetchPizzas.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.pizzasData = payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.pizzasData = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const {} = pizzas.actions;

export default pizzas.reducer;
