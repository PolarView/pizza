import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  totalPizzasAmount: 0,
  totalPrice: 0,
  sizes: [26, 30, 40],
  types: ["тонкое", "традиционное"],
  addToCartValidation: {
    passed: true,
    modalWarningMessage: null
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      if (state.addToCartValidation.passed) {
        let alredyInCart = false;
        let currentPizza = null;
        if (state.pizzas.length > 0) {
          state.pizzas.forEach((pizza) => {
            if (
              pizza.title === payload.title &&
              pizza.activeType === state.types[payload.activeType] &&
              pizza.activeSize === state.sizes[payload.activeSize]
            ) {
              alredyInCart = true;
              currentPizza = pizza;
            }
          });
        }

        if (!alredyInCart) {
          const pizzaObj = {
            ...payload,
            activeSize: state.sizes[payload.activeSize],
            activeType: state.types[payload.activeType],
            totalCurrentPizzaAmount: 1,
            totalCurrentPizzaPrice: payload.price
          };
          state.pizzas.push(pizzaObj);
          state.totalPrice += payload.price;
        } else {
          currentPizza.totalCurrentPizzaAmount += 1;
          currentPizza.totalCurrentPizzaPrice += currentPizza.price;
          state.totalPrice += currentPizza.price;
        }
        state.totalPizzasAmount += 1;
      }
    },

    setAddToCartValidation(state, { payload }) {
      state.addToCartValidation = payload;
    },

    increasePizza(state, { payload }) {
      state.pizzas.forEach((pizza) => {
        if (pizza.id === payload) {
          pizza.totalCurrentPizzaAmount += 1;
          pizza.totalCurrentPizzaPrice += pizza.price;
          state.totalPizzasAmount += 1;
          state.totalPrice += pizza.price;
        }
      });
    },

    decreasePizza(state, { payload }) {
      state.pizzas.forEach((pizza) => {
        if (pizza.id === payload) {
          pizza.totalCurrentPizzaAmount -= 1;
          pizza.totalCurrentPizzaPrice -= pizza.price;
          state.totalPizzasAmount -= 1;
          state.totalPrice -= pizza.price;
          if (pizza.totalCurrentPizzaAmount < 1) {
            state.pizzas.splice(state.pizzas.indexOf(pizza), 1);
          }
        }
      });
    },

    removePizzas(state, { payload }) {
      let currentPizzaGroup;
      state.pizzas.forEach((pizza) => {
        if (pizza.id === payload) {
          currentPizzaGroup = pizza;
        }
      });
      if (currentPizzaGroup) {
        state.pizzas.splice(state.pizzas.indexOf(currentPizzaGroup), 1);
        state.totalPizzasAmount -= currentPizzaGroup.totalCurrentPizzaAmount;
        state.totalPrice -= currentPizzaGroup.price * currentPizzaGroup.totalCurrentPizzaAmount;
      }
    },

    clearCart(state) {
      state.pizzas = [];
      state.totalPrice = 0;
      state.totalPizzasAmount = 0;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  setAddToCartValidation,
  increasePizza,
  decreasePizza,
  removePizzas,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
